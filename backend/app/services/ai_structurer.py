"""
Multi-provider AI resume structurer with automatic failover.

Tries providers in order: Groq → Gemini → Anthropic.
If one fails (rate limit, quota, network error), it automatically falls through to the next.
"""

import json
import re
from typing import Callable, List, Tuple

from groq import Groq
from google import genai

from app.core.config import settings
from app.schemas.portfolio import ExtractedPortfolio


# ─── Shared prompt & helpers ────────────────────────────────────────────────

_SCHEMA = """
{
  "headline": "string or null — a one-line professional title",
  "summary": "string or null — 2-4 sentence professional summary",
  "education": [{"institution": "str","degree": "str","field": "str|null","startDate": "str|null","endDate": "str|null","order": 0}],
  "experience": [{"company": "str","role": "str","startDate": "str|null","endDate": "str|null","description": "str|null","order": 0}],
  "projects": [{"title": "str","description": "str|null","techStack": ["str"],"link": "str|null","order": 0}],
  "skills": [{"name": "str","category": "str|null"}],
  "achievements": [{"title": "str","description": "str|null","date": "str|null"}],
  "links": [{"label": "str","url": "str"}]
}
"""

_SYSTEM = "You are an expert resume parser. Output ONLY valid JSON — no markdown, no explanation."


def _build_prompt(raw_text: str) -> str:
    return (
        f"Parse the following resume text and return JSON matching this schema exactly:\n"
        f"{_SCHEMA}\n\n"
        f"Resume text:\n{raw_text}"
    )


def _clean_json(text: str) -> str:
    """Extract JSON object from the AI response."""
    text = text.strip()
    start = text.find('{')
    end = text.rfind('}')
    if start != -1 and end != -1:
        return text[start:end+1]
    return text


def _parse_response(raw_text: str) -> ExtractedPortfolio:
    """Parse raw AI text response into a validated ExtractedPortfolio."""
    raw_json = _clean_json(raw_text)
    data = json.loads(raw_json)
    return ExtractedPortfolio.model_validate(data)


# ─── Provider implementations ───────────────────────────────────────────────

def _call_groq(prompt: str) -> str:
    """Call Groq (Llama 3) API."""
    client = Groq(api_key=settings.GROQ_API_KEY)
    response = client.chat.completions.create(
        model="qwen/qwen3.8-27b",
        messages=[
            {"role": "system", "content": _SYSTEM},
            {"role": "user", "content": prompt},
        ],
        temperature=0,
        max_tokens=2048,
    )
    return response.choices[0].message.content


def _call_gemini(prompt: str) -> str:
    """Call Google Gemini API."""
    client = genai.Client(api_key=settings.GEMINI_API_KEY)
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=f"{_SYSTEM}\n\n{prompt}",
    )
    return response.text



# ─── Provider registry with availability check ──────────────────────────────

def _get_available_providers() -> List[Tuple[str, Callable]]:
    """Return list of (name, callable) for providers that have API keys configured.
    Order: Groq (fastest) → Gemini (free tier)."""
    providers = []
    if settings.GROQ_API_KEY:
        providers.append(("Groq", _call_groq))
    if settings.GEMINI_API_KEY:
        providers.append(("Gemini", _call_gemini))
    return providers


# ─── Main entry point with automatic failover ───────────────────────────────

def structure_resume_text(raw_text: str) -> ExtractedPortfolio:
    """Parse resume text using AI with automatic failover across providers.

    Tries each configured provider in order (Groq → Gemini → Anthropic).
    If one fails for any reason (rate limit, quota, network error, invalid JSON),
    it automatically falls through to the next provider.
    Falls back to an empty portfolio if ALL providers fail.
    """
    providers = _get_available_providers()

    if not providers:
        print("Warning: No AI providers configured (GROQ_API_KEY, GEMINI_API_KEY are all empty). Returning empty portfolio.")
        return ExtractedPortfolio()

    prompt = _build_prompt(raw_text)
    errors = []

    for provider_name, call_fn in providers:
        try:
            print(f"[AI] Trying {provider_name} for resume extraction...")
            raw_response = call_fn(prompt)
            result = _parse_response(raw_response)
            print(f"[AI] {provider_name} succeeded!")
            return result

        except json.JSONDecodeError as e:
            error_msg = f"{provider_name} returned invalid JSON: {e}"
            print(f"[WARN] {error_msg}")
            errors.append(error_msg)

        except Exception as e:
            error_msg = f"{provider_name} failed: {type(e).__name__}: {e}"
            print(f"[WARN] {error_msg}")
            errors.append(error_msg)

        print(f"[AI] Falling over to next provider...")

    print(f"[ERROR] All AI providers failed. Errors: {errors}")
    return ExtractedPortfolio()
