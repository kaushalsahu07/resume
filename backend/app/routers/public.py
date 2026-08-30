from fastapi import APIRouter, HTTPException
from app.core.supabase_client import supabase_admin

router = APIRouter()


@router.get("/{slug}")
def get_public_portfolio(slug: str):
    """Return a published portfolio by its slug. Also increments view count atomically."""
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
    if "view_count" in portfolio:
        portfolio["viewCount"] = portfolio["view_count"]

    # Increment view count (best-effort — don't fail the request if this errors)
    try:
        new_count = portfolio.get("view_count", 0) + 1
        supabase_admin.table("portfolios").update({"view_count": new_count}).eq("id", portfolio["id"]).execute()
        portfolio["view_count"] = new_count
        portfolio["viewCount"] = new_count
    except Exception as e:
        print("view_count increment failed:", e)

    return portfolio
