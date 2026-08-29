import json
import re
from anthropic import Anthropic
from app.core.config import settings
from app.schemas.portfolio import ExtractedPortfolio

_client: Anthropic | None = None


def _get_client() -> Anthropic:
    """Lazy-initialize Anthropic client so missing key is caught at call-time, not import time."""
    global _client
    if _client is None:
        if not settings.ANTHROPIC_API_KEY:
            raise ValueError("ANTHROPIC_API_KEY is not configured.")
        _client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)
    return _client


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


def _clean_json(text: str) -> str:
    """Strip markdown code fences if the model wraps its output."""
    text = text.strip()
    text = re.sub(r"^```(?:json)?", "", text).strip()
    text = re.sub(r"```$", "", text).strip()
    return text


def structure_resume_text(raw_text: str) -> ExtractedPortfolio:
    """Use Claude to turn raw resume text into a structured ExtractedPortfolio.
    Falls back to an empty portfolio on any failure so the upload flow never crashes."""
    try:
        client = _get_client()
    except ValueError as e:
        print(f"Warning: {e}. Returning empty portfolio.")
        return ExtractedPortfolio()

    prompt = (
        f"Parse the following resume text and return JSON matching this schema exactly:\n"
        f"{_SCHEMA}\n\n"
        f"Resume text:\n{raw_text}"
    )

    try:
        response = client.messages.create(
            model="claude-3-haiku-20240307",
            max_tokens=4096,
            temperature=0,
            system=_SYSTEM,
            messages=[{"role": "user", "content": prompt}],
        )

        raw_json = _clean_json(response.content[0].text)
        data = json.loads(raw_json)
        return ExtractedPortfolio.model_validate(data)

    except json.JSONDecodeError as e:
        print(f"AI returned invalid JSON: {e}")
    except Exception as e:
        print(f"AI structuring failed: {e}")

    return ExtractedPortfolio()
