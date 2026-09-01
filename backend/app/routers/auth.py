from fastapi import APIRouter, HTTPException, Depends, status
from app.schemas.auth import AuthRegister, AuthLogin
from app.core.supabase_client import supabase, supabase_admin
from app.core.auth import get_current_user

router = APIRouter()


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(data: AuthRegister):
    try:
        response = supabase.auth.sign_up({
            "email": data.email,
            "password": data.password,
            "options": {
                "data": {"name": data.name}
            }
        })
    except Exception as e:
        print("Registration error:", e)
        raise HTTPException(status_code=400, detail=str(e))

    if not response.session:
        # Email confirmation is enabled — user was created but needs to confirm email
        return {"message": "Registration successful! Please check your email to confirm your account."}

    return {
        "token": response.session.access_token,
        "user": {"id": response.user.id, "name": data.name, "email": data.email}
    }


@router.post("/login")
def login(data: AuthLogin):
    try:
        response = supabase.auth.sign_in_with_password({
            "email": data.email,
            "password": data.password
        })
    except Exception as e:
        print("Login error:", e)
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not response.session:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    user = response.user
    name = (user.user_metadata or {}).get("name", user.email)

    return {
        "token": response.session.access_token,
        "user": {"id": user.id, "name": name, "email": user.email}
    }


@router.get("/me")
def get_me(user_id: str = Depends(get_current_user)):
    try:
        res = supabase_admin.table("profiles").select("*").eq("id", user_id).single().execute()
        if not res.data:
            raise HTTPException(status_code=404, detail="Profile not found")
        return res.data
    except HTTPException:
        raise
    except Exception as e:
        print("Get me error:", e)
        raise HTTPException(status_code=400, detail=str(e))
