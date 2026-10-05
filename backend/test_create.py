import sys
sys.path.append('.')
import asyncio
from app.core.config import settings
from supabase import create_client
import uuid

# get user client
client = create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)
email = f"test_{uuid.uuid4()}@example.com"
client.auth.sign_up({"email": email, "password": "password123"})
token = client.auth.get_session().access_token
client.postgrest.auth(token)

import httpx
res = httpx.post(
    "http://127.0.0.1:8000/portfolios",
    headers={"Authorization": f"Bearer {token}"},
    json={
        "headline": "Sample",
        "summary": "Sample summary",
        "templateId": "dark-grid",
        "education": [{"institution": "MIT", "degree": "BS", "order": 0}]
    }
)
print("Status:", res.status_code)
print("Response:", res.json())
