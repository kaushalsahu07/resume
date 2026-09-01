from pydantic import BaseModel, EmailStr

class AuthRegister(BaseModel):
    email: EmailStr
    password: str
    name: str

class AuthLogin(BaseModel):
    email: EmailStr
    password: str
