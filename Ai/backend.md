# backend.md — Resume-to-Portfolio Backend Build Spec

Give this file to Antigravity as the working spec for the backend only. Repo:
https://github.com/kaushalsahu07/resume — reconcile this spec against whatever's already
scaffolded there before generating new files; don't duplicate existing structure.

Pairs with `frontend.md`. The API contract in that file (§6) is authoritative — every endpoint
below must match it exactly in path, method, and response shape so the frontend doesn't need
changes once this is live.

---

## 1. Tech Stack

- **Framework:** FastAPI (Python)
- **Server:** Uvicorn
- **Database:** PostgreSQL via **Supabase**
- **Auth:** **Supabase Auth** (email/password) — not custom JWT. FastAPI verifies the Supabase-issued JWT on protected routes rather than issuing its own.
- **ORM:** SQLAlchemy (models mirror Supabase tables) — or query via `supabase-py` directly if that's simpler given Supabase Auth is already handling identity. Pick one and stay consistent; don't mix raw SQL and ORM calls in the same resource.
- **Resume text extraction:** `pdfplumber` for PDF, `python-docx` for DOCX
- **AI structuring:** Groq and Gemini APIs (fallback mechanism)
- **File upload handling:** `python-multipart`
- **Deploy target:** Railway

---

## 2. Auth Flow (Supabase Auth)

Do not build custom register/login/password-hashing logic. Use Supabase Auth's built-in flows:

- **Register:** frontend (or this backend, as a thin proxy) calls Supabase Auth's sign-up
  endpoint via `supabase-py`. Supabase handles password hashing, email/password storage, and
  verification email if enabled.
- **Login:** same — proxy to Supabase Auth's sign-in, which returns an access token (JWT) and
  refresh token.
- **Protecting routes:** every authenticated FastAPI endpoint reads the `Authorization: Bearer
  <token>` header, verifies it against Supabase's JWT secret (or public key, depending on
  Supabase's signing method — check the current project's JWT settings in the Supabase
  dashboard), and extracts the `user_id` (`sub` claim) from it. Reject with 401 if invalid/expired.
- **users table:** Supabase Auth already maintains its own `auth.users` table — do not create a
  duplicate `users` table for credentials. If you need app-specific user fields (e.g. display
  name), create a `public.profiles` table keyed on the Supabase `auth.users.id`, populated via a
  trigger or on first login.

```python
# dependency for protected routes
from fastapi import Depends, HTTPException, Header

def get_current_user(authorization: str = Header(...)) -> str:
    token = authorization.replace("Bearer ", "")
    try:
        payload = verify_supabase_jwt(token)  # decode + verify against Supabase JWT secret
        return payload["sub"]  # this is the user_id
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
```

Endpoints exposed to match the frontend contract:

```
POST /auth/register   { email, password, name }  -> proxies Supabase sign-up, returns { token, user }
POST /auth/login       { email, password }         -> proxies Supabase sign-in, returns { token, user }
GET  /me               (auth)                       -> returns profile for the verified user
```

---

## 3. Database Schema (Supabase Postgres)

`auth.users` is managed by Supabase. Everything else lives in `public`:

```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  template_id TEXT DEFAULT 'fresh-minimal',
  headline TEXT,
  summary TEXT,
  is_published BOOLEAN DEFAULT false,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE,
  institution TEXT, degree TEXT, field TEXT,
  start_date TEXT, end_date TEXT, "order" INT DEFAULT 0
);

CREATE TABLE public.experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE,
  company TEXT, role TEXT, start_date TEXT, end_date TEXT,
  description TEXT, "order" INT DEFAULT 0
);

CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE,
  title TEXT, description TEXT, tech_stack TEXT[], link TEXT, "order" INT DEFAULT 0
);

CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE,
  name TEXT, category TEXT
);

CREATE TABLE public.achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE,
  title TEXT, description TEXT, date TEXT
);

CREATE TABLE public.links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID REFERENCES public.portfolios(id) ON DELETE CASCADE,
  label TEXT, url TEXT
);
```

Enable **Row Level Security** on every `public` table, with a policy so a user can only
read/write rows where `portfolios.user_id = auth.uid()` (join through `portfolio_id` for child
tables). The `GET /p/:slug` public endpoint should use the Supabase **service role key**
server-side (never exposed to the frontend) to bypass RLS for published-only reads.

---

## 4. Resume Upload & Parsing Pipeline

```
POST /resume/upload   (auth, multipart file)
```

Steps:

1. **Validate** file type (`.pdf` or `.docx`) and size (reject over ~10MB) before processing.
2. **Extract raw text:**
   ```python
   import pdfplumber
   from docx import Document

   def extract_pdf_text(file) -> str:
       text = []
       with pdfplumber.open(file) as pdf:
           for page in pdf.pages:
               page_text = page.extract_text()
               if page_text:
                   text.append(page_text)
       return "\n".join(text)

   def extract_docx_text(file) -> str:
       doc = Document(file)
       return "\n".join(p.text for p in doc.paragraphs if p.text.strip())
   ```
3. **Structure via AI API:** send the raw text with a prompt requesting strict JSON matching
   the `ExtractedPortfolio` schema (headline, summary, education[], experience[], projects[], skills[],
   achievements[], links[]). Uses Groq with a fallback to Gemini.
   response is guaranteed valid JSON rather than parsing free text.
4. **Validate** the returned JSON against a Pydantic model. If validation fails, retry once with
   a stricter prompt; if it fails again, fall back to an empty-but-valid draft portfolio so the
   user still lands in the editor rather than seeing an error.
5. **Persist:** create the `portfolios` row (unpublished draft, auto-generated `slug` e.g.
   `{name-slug}-{short-id}`) plus all child rows, in a single transaction.
6. **Return** the full `Portfolio` object matching the frontend's TypeScript shape exactly
   (camelCase keys — see §6 note below). This single response is what the frontend uses to
   render the editor — there is no separate "confirm extraction" step. The moment
   `/resume/upload` resolves, the editor's form fields and live preview should already be
   populated with everything the AI extracted (headline, summary, and every education/
   experience/project/skill/achievement/link row), each carrying its real `id` so subsequent
   edits hit `PUT .../{item_id}` immediately rather than `POST` (which would create duplicates).
   The user's first action in the editor should be *correcting* pre-filled data, never filling
   a blank form.

```python
class ExtractedPortfolio(BaseModel):
    headline: str | None = None
    summary: str | None = None
    education: list[EducationItem] = []
    experience: list[ExperienceItem] = []
    projects: list[ProjectItem] = []
    skills: list[SkillItem] = []
    achievements: list[AchievementItem] = []
    links: list[LinkItem] = []
```

---

## 5. Full Endpoint List (must match frontend.md §6 exactly)

```
POST   /auth/register
POST   /auth/login
GET    /me

POST   /resume/upload

GET    /portfolios
GET    /portfolios/{id}
PUT    /portfolios/{id}
POST   /portfolios/{id}/publish
DELETE /portfolios/{id}

POST   /portfolios/{id}/education        PUT/DELETE .../{item_id}
POST   /portfolios/{id}/experience       PUT/DELETE .../{item_id}
POST   /portfolios/{id}/projects         PUT/DELETE .../{item_id}
POST   /portfolios/{id}/skills           PUT/DELETE .../{item_id}
POST   /portfolios/{id}/achievements     PUT/DELETE .../{item_id}
POST   /portfolios/{id}/links            PUT/DELETE .../{item_id}

PUT    /portfolios/{id}/reorder          { section, orderedIds: string[] }

GET    /p/{slug}      # PUBLIC — no auth, uses service role key, increments view_count
```

**Important:** FastAPI/Python naturally produces `snake_case`. The frontend's `Portfolio` type
uses `camelCase` (e.g. `isPublished`, `viewCount`, `templateId`). Convert at the API boundary —
either with Pydantic's `alias_generator=to_camel` + `populate_by_name=True` on response models,
or a serialization layer — so the frontend never has to special-case field names.

---

## 6. Project Structure

```
app/
  main.py                 # FastAPI app, CORS config, router includes
  core/
    config.py              # env vars (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, GROQ_API_KEY, GEMINI_API_KEY, etc.)
    auth.py                 # Supabase JWT verification, get_current_user dependency
    supabase_client.py      # supabase-py client instances (anon + service role)
  models/
    portfolio.py            # SQLAlchemy or Pydantic models per table
  schemas/
    portfolio.py            # Pydantic request/response schemas, camelCase aliasing
    auth.py
  services/
    resume_parser.py        # pdfplumber/python-docx extraction functions
    ai_structurer.py         # AI provider call + validation/retry logic (Groq -> Gemini)
  routers/
    auth.py
    portfolios.py
    resume.py
    public.py                # the /p/{slug} route, uses service role key
  db/
    session.py
migrations/                  # SQL migration files (schema in §3)
requirements.txt
railway.toml / Procfile
.env.example
```

---

## 7. Environment Variables

```
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=      # server-side only, never sent to frontend
SUPABASE_JWT_SECRET=            # for verifying incoming auth tokens
GROQ_API_KEY=
GEMINI_API_KEY=
CORS_ALLOWED_ORIGIN=             # Netlify frontend URL
```

---

## 8. CORS

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.CORS_ALLOWED_ORIGIN, "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 9. Build Order for Antigravity

1. Check the existing repo structure at kaushalsahu07/resume first — reuse/extend what's there rather than re-scaffolding from zero.
2. FastAPI skeleton + `/health` route, deployed to Railway to confirm the pipeline before building features.
3. Supabase project: run the schema in §3, enable RLS policies, grab keys into `.env`.
4. Auth: `/auth/register`, `/auth/login`, `/me`, and the `get_current_user` JWT-verification dependency. Test against the frontend's login/register forms.
5. Resume upload pipeline (§4) — test with 2–3 real resumes early, both PDF and DOCX, since extraction quality varies a lot by resume layout.
6. Full CRUD endpoints for all sections + reorder.
7. Publish flow + public `GET /p/{slug}` using the service role key.
8. camelCase serialization pass — verify every response matches frontend.md's TypeScript types exactly before calling this done.

---

## 10. Copy-Paste Kickoff Prompt

> "In the existing kaushalsahu07/resume repo, build a FastAPI backend using Supabase for both
> Postgres and Auth (verify Supabase-issued JWTs on protected routes, do not build custom
> password auth). Implement the schema in backend.md §3 with RLS. Build a `/resume/upload`
> endpoint that extracts text from PDF using pdfplumber and from DOCX using python-docx, sends
> the text to the AI API to return structured JSON matching the ExtractedPortfolio shape,
> validates it with Pydantic, and saves it as a new draft portfolio with child rows for
> education/experience/projects/skills/achievements/links. Add full CRUD + reorder endpoints for
> each section, a publish endpoint, and a public `/p/{slug}` endpoint using the Supabase service
> role key. Serialize all responses to camelCase to match the frontend's TypeScript types exactly.
> Configure CORS for the Netlify frontend origin. Deploy-ready for Railway."

---

*Backend-only spec. Pairs with frontend.md — the API contract in that file's §6 is authoritative
and this spec implements it exactly. Architecture: FastAPI on Railway, PostgreSQL + Auth on
Supabase, frontend on Netlify.*