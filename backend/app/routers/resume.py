from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from app.core.auth import get_current_user
from app.core.supabase_client import supabase_admin
from app.services.resume_parser import extract_text
from app.services.ai_structurer import structure_resume_text
import uuid

router = APIRouter()

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB


@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    user_id: str = Depends(get_current_user)
):
    # 1. Validate file type
    if not file.filename or not file.filename.lower().endswith((".pdf", ".docx")):
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF and DOCX are supported.")

    # 2. Read and validate file size
    file_bytes = await file.read()
    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File is too large. Max size is 10MB.")

    # 3. Extract text from file
    try:
        raw_text = extract_text(file_bytes, file.filename)
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Failed to parse document: {str(e)}")

    if not raw_text.strip():
        raise HTTPException(status_code=422, detail="Could not extract any text from the document. Please ensure it is not a scanned image.")

    # 4. Structure via AI
    extracted_data = structure_resume_text(raw_text)

    # 5. Build portfolio record
    portfolio_id = str(uuid.uuid4())
    slug = f"portfolio-{portfolio_id[:8]}"

    portfolio_row = {
        "id": portfolio_id,
        "user_id": user_id,
        "slug": slug,
        "template_id": "fresh-minimal",
        "headline": extracted_data.headline,
        "summary": extracted_data.summary,
    }

    try:
        # Use admin client to bypass RLS on insert (server-side trusted operation)
        port_res = supabase_admin.table("portfolios").insert(portfolio_row).execute()
        if not port_res.data:
            raise HTTPException(status_code=500, detail="Failed to create portfolio record.")

        # Helper to batch-insert child rows
        def insert_children(table: str, items):
            if not items:
                return []
            rows = []
            for item in items:
                row = item.model_dump(exclude={"id"}, exclude_none=True)
                row["portfolio_id"] = portfolio_id
                rows.append(row)
            res = supabase_admin.table(table).insert(rows).execute()
            return res.data or []

        education    = insert_children("education",    extracted_data.education)
        experience   = insert_children("experience",   extracted_data.experience)
        projects     = insert_children("projects",     extracted_data.projects)
        skills       = insert_children("skills",       extracted_data.skills)
        achievements = insert_children("achievements", extracted_data.achievements)
        links        = insert_children("links",        extracted_data.links)

        # Return fully-hydrated portfolio so the frontend can go straight to the editor
        portfolio = port_res.data[0]
        portfolio.update({
            "education":    education,
            "experience":   experience,
            "projects":     projects,
            "skills":       skills,
            "achievements": achievements,
            "links":        links,
        })

        return portfolio

    except HTTPException:
        raise
    except Exception as e:
        print("upload_resume error:", e)
        raise HTTPException(status_code=500, detail="Failed to save extracted portfolio.")
