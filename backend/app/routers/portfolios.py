from typing import List
from fastapi import APIRouter, Depends, HTTPException, Header, status
from app.core.auth import get_current_user
from app.core.config import settings
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

@router.get("", response_model=List[dict])
def get_portfolios(client: Client = Depends(get_user_supabase)):
    try:
        res = client.table("portfolios").select("*").order("created_at", desc=True).execute()
        return res.data
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
    return res.data


@router.put("/{portfolio_id}", response_model=dict)
def update_portfolio(portfolio_id: str, data: dict, client: Client = Depends(get_user_supabase)):
    # Strip unknown / None values before update
    clean = {k: v for k, v in data.items() if v is not None and k not in ("id", "user_id", "created_at")}
    try:
        res = client.table("portfolios").update(clean).eq("id", portfolio_id).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    if not res.data:
        raise HTTPException(status_code=404, detail="Portfolio not found")
    return res.data[0]


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
    try:
        client.table("portfolios").delete().eq("id", portfolio_id).execute()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


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
