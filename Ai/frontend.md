# Frontend Architecture

This document describes the structure and implementation of the React frontend for the Resume-to-Portfolio application.

## 1. Tech Stack

- **Build tool:** Vite
- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router v6
- **Forms:** react-hook-form
- **Reordering:** @dnd-kit/core
- **Icons:** lucide-react

## 2. Routes

| Path | Auth | Purpose |
|---|---|---|
| `/` | public | Landing page: hero, "Upload Your Resume" CTA, template gallery, 3-step "How it works" |
| `/login` | public | Login form |
| `/register` | public | Register form |
| `/dashboard` | private | List of user's portfolios, "New Portfolio" button |
| `/upload` | private | Resume file upload + parsing loading state |
| `/editor` | private | Section editor with live preview pane |
| `/p/:slug` | public | Rendered published portfolio (chosen template) |
| `/demo` | public | Hardcoded example portfolio |

Private routes are protected by the `AuthedLayout` component, which redirects to `/login` if no valid auth token is present.

## 3. Portfolio Templates

The app features multiple presentational templates that render the exact same `Portfolio` data shape without data transformation:
- `FreshMinimalTemplate`
- `ClassicProfessionalTemplate`
- `CosmicVioletTemplate`
- `DarkGridTemplate`
- `DevfolioTemplate`
- `EmeraldEditorialTemplate`
- `MonoIllustrateTemplate`
- `AlexEditorialTemplate`

Switching templates in the editor only swaps which component renders, and does not mutate the portfolio data.

## 4. API Client (`src/lib/apiClient.ts`)

The frontend communicates with the FastAPI backend using a custom fetch wrapper (`apiClient.ts`) that automatically handles:
- Attaching the Supabase JWT token to the `Authorization` header.
- Proper JSON serialization and error handling.
- Environment variable configuration (`VITE_API_BASE_URL`).

## 5. Component Structure

```text
src/
  components/
    layout/           # AuthedLayout
    common/           # PreviewFrame
    templates/        # Portfolio templates (FreshMinimal, DarkGrid, etc.)
  pages/              # Landing, Login, Register, Dashboard, Upload, Editor, PublicPortfolio, Demo, LivePreview
  hooks/              # useAuth
  lib/                # apiClient.ts, authStorage.ts, portfolioUrl.ts
  types/              # portfolio.ts, auth.ts
```

## 6. Key UX Details

- **Upload screen:** Features a sequence showing the AI extraction progress (uploading → extracting → structuring).
- **Upload → Editor handoff:** Upon successful upload, the user is seamlessly redirected to the editor, populated with the AI-extracted data.
- **Editor Layout:** The editor uses an iframe (`PreviewFrame.tsx` / `LivePreview.tsx`) to show a real-time preview of the portfolio while editing sections. Changes are sent via `postMessage` to the iframe.
- **Empty states:** Sections without items gracefully invite the user to add content.