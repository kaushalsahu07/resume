from typing import List
from fastapi import APIRouter, Depends, HTTPException, Header, status
from app.core.auth import get_current_user
from app.core.config import settings
from app.core.supabase_client import supabase_admin
from supabase import create_client, Client
from pydantic import BaseModel

router = APIRouter()


def get_user_supabase(authorization: str = Header(...)) -> Client:
    """Create a per-request Supabase client authenticated as the current user.
    This makes RLS policies apply correctly for every request."""
    token = authorization.replace("Bearer ", "")
    client = create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)
    client.postgrest.auth(token)
    return client


# ─── Portfolio CRUD ───────────────────────────────────────────────────────────

def _format_portfolio(data: dict) -> dict:
    if not data:
        return data
    if "template_id" in data:
        data["templateId"] = data["template_id"]
    if "is_published" in data:
        data["isPublished"] = data["is_published"]
    if "view_count" in data:
        data["viewCount"] = data["view_count"]
    return data


@router.get("", response_model=List[dict])
def get_portfolios(client: Client = Depends(get_user_supabase)):
    try:
        res = client.table("portfolios").select("*").order("created_at", desc=True).execute()
        return [_format_portfolio(p) for p in (res.data or [])]
    except Exception as e:
        print("get_portfolios error:", e)
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/{portfolio_id}", response_model=dict)
def get_portfolio(portfolio_id: str, client: Client = Depends(get_user_supabase)):
    try:
        res = client.table("portfolios").select(
            "*, education(*), experience(*), projects(*), skills(*), achievements(*), links(*)"
        ).eq("id", portfolio_id).single().execute()
    except Exception as e:
        raise HTTPException(status_code=404, detail="Portfolio not found")

    if not res.data:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return _format_portfolio(res.data)


@router.put("/{portfolio_id}", response_model=dict)
def update_portfolio(portfolio_id: str, data: dict, client: Client = Depends(get_user_supabase)):
    key_mapping = {
        "templateId": "template_id",
        "isPublished": "is_published",
        "viewCount": "view_count"
    }
    clean = {}
    for k, v in data.items():
        if v is not None and k not in ("id", "user_id", "created_at"):
            clean[key_mapping.get(k, k)] = v

    try:
        res = client.table("portfolios").update(clean).eq("id", portfolio_id).execute()
    except Exception as e:
        print("update_portfolio error:", e)
        raise HTTPException(status_code=500, detail=str(e))

    if not res.data:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return _format_portfolio(res.data[0])


@router.post("/{portfolio_id}/publish")
def publish_portfolio(portfolio_id: str, client: Client = Depends(get_user_supabase)):
    try:
        res = client.table("portfolios").update({"is_published": True}).eq("id", portfolio_id).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    if not res.data:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return {"slug": res.data[0]["slug"]}


@router.post("/{portfolio_id}/unpublish")
def unpublish_portfolio(portfolio_id: str, client: Client = Depends(get_user_supabase)):
    try:
        res = client.table("portfolios").update({"is_published": False}).eq("id", portfolio_id).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    if not res.data:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return {"status": "unpublished"}


@router.delete("/{portfolio_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_portfolio(portfolio_id: str, client: Client = Depends(get_user_supabase)):
    # 1. Verify ownership using the user's authenticated client (RLS enforced)
    res = client.table("portfolios").select("id").eq("id", portfolio_id).execute()
    if not res.data:
        raise HTTPException(status_code=404, detail="Portfolio not found or not owned by user")
    
    # 2. Delete using admin client to bypass any missing DELETE RLS policies
    try:
        # Delete children explicitly in case ON DELETE CASCADE is not configured
        for table in ALLOWED_SECTIONS:
            supabase_admin.table(table).delete().eq("portfolio_id", portfolio_id).execute()
        
        # Delete the main portfolio
        supabase_admin.table("portfolios").delete().eq("id", portfolio_id).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database deletion failed: {str(e)}")


# ─── Child Section CRUD ───────────────────────────────────────────────────────

ALLOWED_SECTIONS = {"education", "experience", "projects", "skills", "achievements", "links"}


def _validate_section(section: str):
    if section not in ALLOWED_SECTIONS:
        raise HTTPException(status_code=400, detail=f"Invalid section '{section}'")


def create_child_routes(section: str):
    @router.post(f"/{{portfolio_id}}/{section}", status_code=status.HTTP_201_CREATED)
    def add_item(portfolio_id: str, data: dict, client: Client = Depends(get_user_supabase)):
        data["portfolio_id"] = portfolio_id
        try:
            res = client.table(section).insert(data).execute()
            return res.data[0]
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @router.put(f"/{{portfolio_id}}/{section}/{{item_id}}")
    def update_item(portfolio_id: str, item_id: str, data: dict, client: Client = Depends(get_user_supabase)):
        clean = {k: v for k, v in data.items() if k not in ("id", "portfolio_id")}
        try:
            res = client.table(section).update(clean).eq("id", item_id).eq("portfolio_id", portfolio_id).execute()
            return res.data[0] if res.data else {}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    @router.delete(f"/{{portfolio_id}}/{section}/{{item_id}}", status_code=status.HTTP_204_NO_CONTENT)
    def delete_item(portfolio_id: str, item_id: str, client: Client = Depends(get_user_supabase)):
        try:
            client.table(section).delete().eq("id", item_id).eq("portfolio_id", portfolio_id).execute()
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))


for _section in ALLOWED_SECTIONS:
    create_child_routes(_section)


# ─── Reorder ─────────────────────────────────────────────────────────────────

class ReorderRequest(BaseModel):
    section: str
    orderedIds: List[str]


@router.put("/{portfolio_id}/reorder")
def reorder_section(portfolio_id: str, req: ReorderRequest, client: Client = Depends(get_user_supabase)):
    _validate_section(req.section)
    try:
        for index, item_id in enumerate(req.orderedIds):
            client.table(req.section).update({"order": index}).eq("id", item_id).eq("portfolio_id", portfolio_id).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    return {"status": "ok"}
