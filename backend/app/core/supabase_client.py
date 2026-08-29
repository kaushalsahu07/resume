from supabase import create_client, Client
from app.core.config import settings

# Used for operations where we act on behalf of a specific user (by passing their token)
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_ANON_KEY)

# Used for admin operations (like bypassing RLS for public profile viewing)
# IMPORTANT: Never expose the service role key to the frontend or use it for standard user CRUD.
supabase_admin: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_SERVICE_ROLE_KEY)
