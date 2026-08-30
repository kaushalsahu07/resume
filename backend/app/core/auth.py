import jwt
from fastapi import Depends, HTTPException, Header, status
from app.core.config import settings
from app.core.supabase_client import supabase

def get_current_user(authorization: str = Header(...)) -> str:
    """
    Validates the Supabase JWT by querying Supabase.
    Raises 401 if invalid or missing.
    Returns the user ID (UUID string).
    """
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing Authorization header",
        )
    
    token = authorization.replace("Bearer ", "")
    
    try:
        user_resp = supabase.auth.get_user(token)
        if not user_resp or not user_resp.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token",
            )
        return user_resp.user.id
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid token: {str(e)}",
        )
