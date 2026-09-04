from pydantic import BaseModel, EmailStr

class AuthRegister(BaseModel):
    email: EmailStr
    password: str
    name: str

class AuthLogin(BaseModel):
    email: EmailStr
    password: str

class AuthResetPassword(BaseModel):
    email: EmailStr

class AuthUpdatePassword(BaseModel):
    password: str
