"""
AI Chat service for portfolio editing with multi-provider failover.

Accepts a user message + current portfolio, sends to AI (Groq → Gemini → Anthropic),
and returns the modified portfolio JSON + a human-readable reply.
"""

import json
import re
from typing import Callable, List, Tuple, Any, Dict

from app.core.config import settings


# ─── Shared prompt & helpers ────────────────────────────────────────────────

_SYSTEM = """You are PortfoliAI, an expert portfolio editing assistant.
You receive the user's current portfolio as JSON and their editing request.
You must return a JSON object with exactly two keys:
1. "reply" — a short, friendly message explaining what you changed (1-2 sentences)
2. "updatedPortfolio" — the FULL modified portfolio JSON with the user's requested changes applied

Rules:
- Only modify the fields the user asked about. Preserve everything else exactly.
- Keep all existing IDs, slugs, and metadata unchanged unless explicitly asked.
- For template changes, valid templateId values are: "fresh-minimal", "classic-professional", "dark-grid"
- For skills, each skill needs: {"id": "skill-<timestamp>", "name": "SkillName"}
- For text improvements, make them sound professional and impactful.
- Output ONLY valid JSON — no markdown fences, no explanation outside the JSON.
"""


def _build_prompt(message: str, portfolio: Dict[str, Any]) -> str:
    return (
        f"Current portfolio:\n"
        f"```json\n{json.dumps(portfolio, indent=2)}\n```\n\n"
        f"User request: {message}\n\n"
        f"Return the JSON with \"reply\" and \"updatedPortfolio\" keys."
    )


def _clean_json(text: str) -> str:
    """Extract JSON object from the AI response."""
    text = text.strip()
    start = text.find('{')
    end = text.rfind('}')
    if start != -1 and end != -1:
        return text[start:end+1]
    return text


# ─── Provider implementations ───────────────────────────────────────────────

def _call_groq(system: str, prompt: str) -> str:
    from groq import Groq

    client = Groq(api_key=settings.GROQ_API_KEY)
    response = client.chat.completions.create(
        model="qwen/qwen3.8-27b",
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": prompt},
        ],
        temperature=0.3,
        max_tokens=2048,
    )
    return response.choices[0].message.content


def _call_gemini(system: str, prompt: str) -> str:
    from google import genai

    client = genai.Client(api_key=settings.GEMINI_API_KEY)
    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=f"{system}\n\n{prompt}",
    )
    return response.text



# ─── Provider registry ──────────────────────────────────────────────────────

def _get_available_providers() -> List[Tuple[str, Callable]]:
    """Return providers with configured API keys. Order: Groq → Gemini."""
    providers = []
    if settings.GROQ_API_KEY:
        providers.append(("Groq", _call_groq))
    if settings.GEMINI_API_KEY:
        providers.append(("Gemini", _call_gemini))
    return providers


# ─── Main entry point ───────────────────────────────────────────────────────

def process_chat(message: str, current_portfolio: Dict[str, Any], preferred_provider: str | None = None) -> Dict[str, Any]:
    """Process a chat message to edit a portfolio using AI with automatic failover.

    Args:
        message: The user's editing request (e.g., "Make my summary more impactful")
        current_portfolio: The current portfolio data as a dict
        preferred_provider: Optional preferred provider name ("groq", "gemini", "anthropic").
                           If set and available, it's tried first. Others are tried on failure.

    Returns:
        Dict with keys: reply (str), updatedPortfolio (dict), provider (str)
    """
    all_providers = _get_available_providers()

    if not all_providers:
        return {
            "reply": "No AI providers are configured. Please add GROQ_API_KEY or GEMINI_API_KEY to your .env file.",
            "updatedPortfolio": current_portfolio,
            "provider": "none",
        }

    # Reorder providers if a preferred one is specified
    if preferred_provider:
        preferred_lower = preferred_provider.lower()
        preferred = [(n, fn) for n, fn in all_providers if n.lower() == preferred_lower]
        others = [(n, fn) for n, fn in all_providers if n.lower() != preferred_lower]
        providers = preferred + others
    else:
        providers = all_providers

    prompt = _build_prompt(message, current_portfolio)
    errors = []

    for provider_name, call_fn in providers:
        try:
            print(f"[Chat] Trying {provider_name}...")
            raw_response = call_fn(_SYSTEM, prompt)
            raw_json = _clean_json(raw_response)
            data = json.loads(raw_json)

            # Validate response structure
            if "reply" not in data or "updatedPortfolio" not in data:
                raise ValueError("AI response missing 'reply' or 'updatedPortfolio' keys")

            print(f"[Chat] {provider_name} succeeded!")
            return {
                "reply": data["reply"],
                "updatedPortfolio": data["updatedPortfolio"],
                "provider": provider_name.lower(),
            }

        except json.JSONDecodeError as e:
            error_msg = f"{provider_name} returned invalid JSON: {e}"
            print(f"[WARN] {error_msg}")
            errors.append(error_msg)

        except Exception as e:
            error_msg = f"{provider_name} failed: {type(e).__name__}: {e}"
            print(f"[WARN] {error_msg}")
            errors.append(error_msg)

        print(f"[Chat] Falling over to next provider...")

    print(f"[ERROR] All AI providers failed for chat. Errors: {errors}")
    return {
        "reply": "Sorry, all AI providers are currently unavailable. Please try again in a moment.",
        "updatedPortfolio": current_portfolio,
        "provider": "none",
    }
