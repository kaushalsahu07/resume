# Resume-to-Portfolio Project Memory

## Project Overview
A web application that turns an uploaded resume into an editable, publishable personal portfolio site.
The user flow is: **Upload → AI Magic → Share & Shine**. The user uploads a resume, AI extracts and structures the data, the user edits it in a live-preview editor, and finally publishes it to a public shareable link.

## Business Purpose
1. **What business problem is solved?** It reduces the friction of creating a personal portfolio from scratch by instantly converting an existing resume into a structured web format.
2. **What users use this?** Job seekers, professionals, students, and freelancers who want a quick, well-designed online presence.
3. **What are the major features?** Resume upload/parsing, WYSIWYG live-preview portfolio editor, section reordering, template switching, AI chat editing, and public publishing.
4. **What is the user workflow?** Landing Page -> Register/Login -> Dashboard -> Upload Resume -> AI Parsing -> Editor -> Publish.
5. **What are the primary entities?** User, Portfolio, and Portfolio Sections (Education, Experience, Projects, Skills, Achievements, Links).

## Tech Stack
### Frontend Framework:
- **React 18** + **TypeScript**
- **Vite** (Build Tool)
- **Tailwind CSS** (v4.3.3)

### Backend Framework:
- **FastAPI** (Python)

### Database:
- **PostgreSQL** on **Supabase**

### Authentication:
- **Supabase Auth** (JWT Tokens stored via `authStorage.ts`).

### Infrastructure & Deployment:
- Frontend: **Netlify**
- Backend: **Railway**

## Repository Structure
```
resume/
├── backend/          # FastAPI Backend application
│   ├── app/          # Source code (routers, schemas, services, core)
│   ├── requirements.txt
│   └── ...
├── frontend/         # React Frontend application
│   ├── src/          # Source code
│   ├── package.json
│   └── ...
├── Ai/               # Documentation
│   ├── architecture.md
│   ├── frontend.md
│   ├── backend.md
│   └── codebase_memory.md
└── README.md
```

## System Architecture
- The repository is a monorepo containing both the Frontend and Backend.
- **Frontend Architecture**: SPA using React Router. Protected routes are wrapped by `AuthedLayout`. Communicates with backend via a custom API client.
- **Backend Architecture**: FastAPI serving REST endpoints, structured into routers, services, and schemas. Integrates with Supabase for Auth and DB.

## Authentication Flow
1. User submits credentials via `/login` or `/register`.
2. Frontend sends POST request to `/auth/login` or `/auth/register`.
3. Backend proxies to Supabase Auth and returns a `{ token, user }` object.
4. Token is saved in `authStorage.ts` (localStorage).
5. `AuthProvider` maintains user session state.
6. API client appends `Authorization: Bearer <token>` to all subsequent requests.

## Data Flow Diagrams
**Resume Upload & Parse Flow:**
User Action (Upload File) ↓ Frontend (`/upload` page) ↓ API (POST `/resume/upload`) ↓ Backend (AI Parsing Logic via pdfplumber/docx -> Groq/Gemini) ↓ Database (Save Draft Portfolio) ↓ Response (Portfolio Data) ↓ UI Update (Redirect to `/editor`).

**Editor Update Flow:**
User Action (Edit Text/Reorder) ↓ Frontend State (Optimistic UI) ↓ API (PUT `/portfolios/:id/...`) ↓ Backend (Update Logic) ↓ Database ↓ Response.

**AI Chat Update Flow:**
User Action (Sends Message) ↓ API (POST `/chat/...`) ↓ Backend (AI interprets intent & modifies state) ↓ Response (Updated Portfolio) ↓ UI Update (Chat history & Live preview).

## Third Party Integrations
- `@dnd-kit/core`: Used for drag-and-drop reordering of portfolio sections.
- `react-hook-form`: Used for form state management and validation.
- `pdfplumber` & `python-docx`: Used for parsing resume files.
- `Groq` & `Gemini`: Used for AI structuring and chat interactions.

## Technical Debt / Known Risks
- AI parsing relies entirely on the external AI providers (Groq/Gemini) and requires handling markdown-wrapped JSON gracefully. (Addressed with robust `_clean_json` payload extraction).
- Groq free tier imposes strict TPM limits (8000 tokens), which requires careful `max_tokens` configuration to prevent `413 Request Entity Too Large` errors. (Addressed by keeping `max_tokens=2048`).

## Recent Updates
- **AI Providers Switched**: Anthropic (Claude) has been completely removed from the project in favor of Groq (primary) with fallback to Gemini.
- **Robust JSON Extraction**: Improved the `_clean_json` method to safely extract JSON payloads even when AI models ignore system prompts.
- **API Connection**: The frontend `apiClient.ts` has been connected to the live backend; it is no longer mocking responses.
- **Monorepo structure**: The backend codebase is now integrated into this repository under the `backend` folder.
