from fastapi import APIRouter, HTTPException, Depends
from app.core.supabase_client import supabase_admin
from app.core.auth import get_optional_user
from typing import Optional

router = APIRouter()


@router.get("/{slug}")
def get_public_portfolio(slug: str, preview: bool = False, user_id: Optional[str] = Depends(get_optional_user)):
    """Return a published portfolio by its slug."""
    try:
        res = supabase_admin.table("portfolios").select(
            "*, education(*), experience(*), projects(*), skills(*), achievements(*), links(*)"
        ).eq("slug", slug).eq("is_published", True).single().execute()
    except Exception:
        raise HTTPException(status_code=404, detail="Portfolio not found or not published")

    if not res.data:
        raise HTTPException(status_code=404, detail="Portfolio not found or not published")

    portfolio = res.data

    # Map snake_case to camelCase for frontend compatibility
    if "template_id" in portfolio:
        portfolio["templateId"] = portfolio["template_id"]
    if "is_published" in portfolio:
        portfolio["isPublished"] = portfolio["is_published"]

    return portfolio
