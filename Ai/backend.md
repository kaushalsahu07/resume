# Backend Architecture

This document describes the structure and implementation of the Python FastAPI backend for the Resume-to-Portfolio application.

## 1. Tech Stack

- **Framework:** FastAPI (Python)
- **Server:** Uvicorn
- **Database:** PostgreSQL via **Supabase**
- **Auth:** **Supabase Auth** (email/password)
- **Resume text extraction:** `pdfplumber` (PDF) and `python-docx` (DOCX) via `services/resume_parser.py`
- **AI structuring:** Groq and Gemini APIs via `services/ai_structurer.py` and `services/ai_chat.py`
- **File upload handling:** `python-multipart`
- **Deploy target:** Railway

## 2. Auth Flow (Supabase Auth)

The application uses Supabase Auth's built-in flows:
- **Register/Login:** Proxies to Supabase via `supabase-py` (`routers/auth.py`). Supabase handles password hashing and email verification.
- **Protecting routes:** Authenticated FastAPI endpoints verify the `Authorization: Bearer <token>` header against Supabase (`core/auth.py` -> `get_current_user`).

## 3. Database Schema

Tables live in `public` schema in Supabase:
- `profiles`: user profiles linked to `auth.users`
- `portfolios`: the main portfolio container
- `education`, `experience`, `projects`, `skills`, `achievements`, `links`: child rows linked to a portfolio

**Row Level Security (RLS)** is enabled on all tables, ensuring users can only read/write their own data. The public `GET /p/:slug` endpoint uses the Supabase **service role key** server-side to bypass RLS for published-only reads.

## 4. Resume Upload & Parsing Pipeline

The `POST /resume/upload` endpoint performs the following:
1. **Extraction:** Extracts raw text using `pdfplumber` or `python-docx`.
2. **Structuring:** Sends the text to Groq (or Gemini fallback) to return structured JSON matching the `ExtractedPortfolio` schema.
3. **Validation:** Validates JSON via Pydantic.
4. **Persistence:** Creates the portfolio and all child rows in Supabase.

## 5. API Endpoints

- **Auth:** `/auth/register`, `/auth/login`, `/me`
- **Resume:** `/resume/upload`
- **Portfolios:** `/portfolios` (GET, GET by ID, PUT, DELETE), `/portfolios/{id}/publish`, `/portfolios/{id}/unpublish`
- **Sections:** CRUD endpoints for education, experience, projects, skills, achievements, links
- **Reordering:** `/portfolios/{id}/reorder`
- **Chat:** `/chat` for AI chat using portfolio context
- **Public:** `/p/{slug}` (public access)

All API responses use `camelCase` to seamlessly match frontend TypeScript types.

## 6. Project Structure

```text
app/
  main.py                 # FastAPI app, CORS config
  core/
    config.py             # Environment variables
    auth.py               # Supabase JWT verification
    supabase_client.py    # Supabase clients
  schemas/
    portfolio.py          # Pydantic request/response schemas
    auth.py
  services/
    resume_parser.py      # PDF/DOCX extraction
    ai_structurer.py      # AI structuring (Groq/Gemini)
    ai_chat.py            # AI Chat integration
  routers/
    auth.py
    chat.py
    portfolios.py
    resume.py
    public.py             # /p/{slug} route
```