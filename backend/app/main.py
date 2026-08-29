# pyrefly: ignore [missing-import]
from fastapi import FastAPI
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routers import auth, resume, portfolios, public, chat

app = FastAPI(title="Resume-to-Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.CORS_ALLOWED_ORIGIN, "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["Auth"])
app.include_router(resume.router, prefix="/resume", tags=["Resume"])
app.include_router(portfolios.router, prefix="/portfolios", tags=["Portfolios"])
app.include_router(public.router, prefix="/p", tags=["Public"])
app.include_router(chat.router, prefix="/portfolios", tags=["AI Chat"])

@app.get("/health")
def health_check():
    return {"status": "ok"}
