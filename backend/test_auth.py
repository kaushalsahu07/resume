import sys
sys.path.append('.')
from app.core.config import settings
from supabase import create_client
import uuid

client = create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)
email = f"test_{uuid.uuid4()}@example.com"
password = "password123"

# register
res = client.auth.sign_up({"email": email, "password": password})
token = res.session.access_token
user_id = res.user.id
print(f"Registered user {user_id}")

# insert using admin
from app.core.supabase_client import supabase_admin
portfolio_id = str(uuid.uuid4())
admin_res = supabase_admin.table("portfolios").insert({
    "id": portfolio_id,
    "user_id": user_id,
    "slug": f"test-{portfolio_id[:8]}",
    "template_id": "fresh-minimal"
}).execute()
print("Inserted portfolio:", admin_res.data)

# fetch using user client
user_client = create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)
user_client.postgrest.auth(token)
fetch_res = user_client.table("portfolios").select("*").eq("user_id", user_id).execute()
print("Fetched portfolios:", fetch_res.data)
