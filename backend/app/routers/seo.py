"""
SEO routes: Dynamic sitemap.xml and llms.txt served from the API.
These endpoints are designed to be crawled by search engines and AI bots.
"""
from datetime import datetime, timezone
from fastapi import APIRouter
from fastapi.responses import Response
from app.core.supabase_client import supabase_admin

router = APIRouter()

SITE_URL = "https://portfolyo.works"


@router.get("/sitemap.xml", response_class=Response)
def sitemap_xml():
    """Generate a dynamic sitemap.xml containing all published portfolio pages.
    This is critical for Google, Bing, and AI search engines to discover and index
    individual portfolio pages."""

    # Fetch all published portfolios (only need slug and updated_at for sitemap)
    try:
        res = supabase_admin.table("portfolios").select(
            "slug, updated_at"
        ).eq("is_published", True).execute()
        portfolios = res.data or []
    except Exception:
        portfolios = []

    now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%S+00:00")

    urls = []

    # Static pages
    static_pages = [
        {"loc": f"{SITE_URL}/", "priority": "1.0", "changefreq": "weekly"},
        {"loc": f"{SITE_URL}/demo", "priority": "0.7", "changefreq": "monthly"},
    ]

    for page in static_pages:
        urls.append(f"""  <url>
    <loc>{page['loc']}</loc>
    <lastmod>{now}</lastmod>
    <changefreq>{page['changefreq']}</changefreq>
    <priority>{page['priority']}</priority>
  </url>""")

    # Dynamic portfolio pages
    for p in portfolios:
        slug = p.get("slug", "")
        if not slug:
            continue

        updated = p.get("updated_at", now)
        if isinstance(updated, str) and len(updated) >= 10:
            lastmod = updated[:10]  # YYYY-MM-DD
        else:
            lastmod = now

        urls.append(f"""  <url>
    <loc>{SITE_URL}/p/{slug}</loc>
    <lastmod>{lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>""")

    xml = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
{chr(10).join(urls)}
</urlset>"""

    return Response(content=xml, media_type="application/xml")


@router.get("/seo/portfolio/{slug}")
def portfolio_seo_meta(slug: str):
    """Return minimal SEO-relevant metadata for a portfolio.
    This is used by the frontend to set <title>, meta description, and JSON-LD
    structured data before rendering."""
    try:
        res = supabase_admin.table("portfolios").select(
            "slug, headline, summary, template_id, is_published"
        ).eq("slug", slug).eq("is_published", True).single().execute()
    except Exception:
        return {"found": False}

    if not res.data:
        return {"found": False}

    data = res.data
    return {
        "found": True,
        "slug": data.get("slug", slug),
        "headline": data.get("headline", ""),
        "summary": data.get("summary", ""),
        "url": f"{SITE_URL}/p/{slug}",
    }
