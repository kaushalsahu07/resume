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

from typing import Optional

def get_optional_user(authorization: Optional[str] = Header(None)) -> Optional[str]:
    """
    Like get_current_user but returns None if token is missing or invalid.
    """
    if not authorization or not authorization.startswith("Bearer "):
        return None
    token = authorization.replace("Bearer ", "")
    try:
        user_resp = supabase.auth.get_user(token)
        if user_resp and user_resp.user:
            return user_resp.user.id
    except Exception as e:
        print(f"[DEBUG] get_optional_user failed: {e}")
        pass
    return None
