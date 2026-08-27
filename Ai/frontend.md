# frontend.md — Resume-to-Portfolio Frontend Build Spec

Give this file to Antigravity as the working spec for the frontend only. Backend (FastAPI on
Railway) is being built separately — treat its API contract below as fixed and mock it locally
until it's live.

---

## 1. Project Summary

A web app that turns an uploaded resume into an editable, publishable personal portfolio site.
Flow: **Upload → AI Magic → Share & Shine** (upload resume → AI extracts + structures the data →
user edits in a live-preview editor → publishes to a public shareable link).

## 2. Tech Stack

- **Build tool:** Vite
- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Forms:** react-hook-form
- **Reordering:** @dnd-kit/core (fallback: up/down buttons if time-constrained)
- **HTTP:** fetch wrapped in a small typed API client (see §6)
- **Deploy target:** Netlify

Do not introduce a component library (MUI, Chakra, shadcn) unless explicitly asked — build
custom components with Tailwind so the visual design can be distinctive (see §4).

## 3. Routes

| Path | Auth | Purpose |
|---|---|---|
| `/` | public | Landing page: hero, "Upload Your Resume" CTA, template gallery, 3-step "How it works" |
| `/login` | public | Login form |
| `/register` | public | Register form |
| `/dashboard` | private | List of user's portfolios, "New Portfolio" button |
| `/upload` | private | Resume file upload + parsing loading state |
| `/editor/:portfolioId` | private | Section editor with live preview pane |
| `/p/:slug` | public | Rendered published portfolio (chosen template) |
| `/demo` | public | Hardcoded example portfolio — safety net if live parsing fails during a demo |

Private routes redirect to `/login` if no valid auth token is present.

## 4. Visual Design Direction

Before writing any component code, do a short design pass:

- Define a 4–6 color token palette (named hex values) and two type roles (a characterful display
  face used with restraint, and a body/utility face) — commit to this up front rather than
  defaulting to Tailwind's stock palette and system fonts.
- **Avoid the generic AI-app look**: no warm-cream-background-with-terracotta-accent, no
  near-black-with-acid-green, no default indigo-on-white SaaS look. This product's subject is
  "turning a static document into something alive" — let that inform the direction (e.g. a
  visual motif of transformation/unfolding, structured-to-fluid, paper-to-screen).
  This does not apply to the **portfolio templates themselves** (§5) — those must stay neutral,
  legible, and print-CV-adjacent since they represent someone else's career, not this app's brand.
- Fully responsive, mobile-first. Visible keyboard focus states everywhere. Respect
  `prefers-reduced-motion`.
- One signature moment is enough (e.g. an upload-to-portfolio transform animation on the landing
  page or upload screen) — keep the rest disciplined and quiet.

## 5. Portfolio Templates

Build two presentational template components that both accept the exact same `Portfolio` data
shape as a prop — no template-specific data transformation:

```tsx
<FreshMinimalTemplate portfolio={portfolio} />
<ClassicProfessionalTemplate portfolio={portfolio} />
```

- **Fresh Minimal:** single column, generous whitespace, serif display headline, quiet accent color.
- **Classic Professional:** structured/sectioned layout, sans-serif, slightly denser, resembles a well-designed CV translated to web.

Both must render every section conditionally (skip empty sections gracefully — no "Projects: —"
placeholders) and be fully responsive. Switching templates in the editor only swaps which
component renders — never mutates or loses portfolio data.

## 6. API Contract (backend team is building this to spec — treat as fixed)

Base URL from `VITE_API_BASE_URL` env var.

```
POST   /auth/register              { email, password, name } -> { token, user }
POST   /auth/login                 { email, password }        -> { token, user }
GET    /me                         (auth)                     -> user

POST   /resume/upload              multipart file (auth)      -> Portfolio (draft, with all sections)

GET    /portfolios                 (auth)                     -> Portfolio[]
GET    /portfolios/:id             (auth)                     -> Portfolio
PUT    /portfolios/:id             (auth) { headline?, summary?, template_id? } -> Portfolio
POST   /portfolios/:id/publish     (auth)                     -> { slug }
DELETE /portfolios/:id             (auth)

POST   /portfolios/:id/education        (auth) body -> Education
PUT    /portfolios/:id/education/:itemId (auth) body -> Education
DELETE /portfolios/:id/education/:itemId (auth)
# same pattern for /experience, /projects, /skills, /achievements, /links

PUT    /portfolios/:id/reorder      (auth) { section, orderedIds: string[] }

GET    /p/:slug                     public -> Portfolio (published only; increments view_count)
```

### Shared TypeScript types (`src/types/portfolio.ts`)

```ts
export interface Portfolio {
  id: string;
  slug: string;
  templateId: 'fresh-minimal' | 'classic-professional';
  headline: string | null;
  summary: string | null;
  isPublished: boolean;
  viewCount: number;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  achievements: Achievement[];
  links: Link[];
}

export interface Education { id: string; institution: string; degree: string; field?: string; startDate?: string; endDate?: string; order: number; }
export interface Experience { id: string; company: string; role: string; startDate?: string; endDate?: string; description?: string; order: number; }
export interface Project { id: string; title: string; description?: string; techStack: string[]; link?: string; order: number; }
export interface Skill { id: string; name: string; category?: string; }
export interface Achievement { id: string; title: string; description?: string; date?: string; }
export interface Link { id: string; label: string; url: string; }
```

## 7. Component Structure

```
src/
  components/
    layout/           # Navbar, Footer, AuthedLayout
    landing/           Hero, HowItWorks, TemplateGallery, StatsStrip
    editor/            SectionList, SectionItem, SectionForm, ReorderHandle, LivePreviewPane, TemplateSwitcher
    templates/         FreshMinimalTemplate, ClassicProfessionalTemplate
    ui/                Button, Input, TextArea, Modal, Spinner, EmptyState
  pages/                Landing, Login, Register, Dashboard, Upload, Editor, PublicPortfolio, Demo
  hooks/                useAuth, usePortfolio, useUploadResume
  lib/                  apiClient.ts, authStorage.ts
  types/                portfolio.ts, auth.ts
```

## 8. Key UX Details

- **Upload screen:** show a real progress/status sequence (uploading → extracting text →
  structuring with AI → done) rather than a single spinner — this is the "AI Magic" moment and
  is worth a bit of polish since it's the product's core differentiator.
- **Editor:** two-pane layout on desktop (form controls left, live preview right), tab-switch
  between edit/preview on mobile. Every add/edit/delete/reorder action should reflect in the
  preview pane instantly (optimistic UI), then persist to the backend.
- **Empty states:** each section with no items should invite action ("No projects yet — add
  your first one") rather than showing nothing.
- **Publish flow:** confirm before publishing, show the resulting public URL with a copy button
  immediately after.
- **Errors:** write them in the interface's voice, state what happened and what to do next (e.g.
  "Couldn't read that file — try a PDF or DOCX under 10MB" rather than a raw error code).

## 9. Environment Variables

```
VITE_API_BASE_URL=http://localhost:8000   # swap to Railway URL when backend deploys
```

## 10. Deployment

Netlify. Add a `netlify.toml` with an SPA redirect rule (`/*  /index.html  200`) so client-side
routes like `/p/:slug` resolve correctly on direct load/refresh.

## 11. Build Order for Antigravity

1. Vite + React + TS + Tailwind scaffold, router set up with all routes as empty placeholder pages, deployed to Netlify to confirm the pipeline works end-to-end before building features.
2. Design token pass (§4) — commit a `tailwind.config` with the chosen palette/type scale before building any real UI.
3. Auth pages + `useAuth` hook + protected route wrapper (mock the API client against the contract in §6 if backend isn't live yet).
4. Landing page (hero, how-it-works, template gallery, stats strip).
5. Upload flow with staged loading state.
6. Editor: section list/forms/reorder, live preview pane, template switcher, publish flow.
7. Public `/p/:slug` page rendering both templates.
8. `/demo` page with hardcoded sample data as a judging safety net.
9. Responsive + accessibility pass, especially on `/p/:slug` (this is what gets viewed on phones).

---

*Frontend-only spec. Pairs with the FastAPI backend spec (backend.md) built to the same API
contract in §6. Architecture: React+TS on Netlify, FastAPI on Railway, PostgreSQL on Supabase.*