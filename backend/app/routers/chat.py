from typing import Optional, Any, Dict
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.core.auth import get_current_user
from app.services.ai_chat import process_chat

router = APIRouter()


class ChatRequest(BaseModel):
    message: str
    currentPortfolio: Dict[str, Any]
    provider: Optional[str] = None  # "groq", "gemini" — or None for auto


class ChatResponse(BaseModel):
    reply: str
    updatedPortfolio: Dict[str, Any]
    provider: str
    remainingRequests: int


# Simple in-memory rate limiter per user (resets on server restart)
_user_request_counts: Dict[str, int] = {}
MAX_REQUESTS = 1000


@router.post("/{portfolio_id}/chat", response_model=ChatResponse)
def chat_with_portfolio(
    portfolio_id: str,
    req: ChatRequest,
    user_id: str = Depends(get_current_user),
):
    # Rate limiting
    count = _user_request_counts.get(user_id, 0)
    if count >= MAX_REQUESTS:
        raise HTTPException(status_code=429, detail="AI request limit reached. Please try again later.")

    _user_request_counts[user_id] = count + 1
    remaining = MAX_REQUESTS - count - 1

    # Call AI
    result = process_chat(
        message=req.message,
        current_portfolio=req.currentPortfolio,
        preferred_provider=req.provider,
    )

    return ChatResponse(
        reply=result["reply"],
        updatedPortfolio=result["updatedPortfolio"],
        provider=result["provider"],
        remainingRequests=remaining,
    )
