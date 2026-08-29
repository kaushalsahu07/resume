# Resume-to-Portfolio Project Memory

## Project Overview
A web application that turns an uploaded resume into an editable, publishable personal portfolio site.
The user flow is: **Upload → AI Magic → Share & Shine**. The user uploads a resume, AI extracts and structures the data, the user edits it in a live-preview editor, and finally publishes it to a public shareable link.

## Business Purpose
1. **What business problem is solved?** It reduces the friction of creating a personal portfolio from scratch by instantly converting an existing resume into a structured web format.
2. **What users use this?** Job seekers, professionals, students, and freelancers who want a quick, well-designed online presence.
3. **What are the major features?** Resume upload/parsing, WYSIWYG live-preview portfolio editor, section reordering, template switching, and public publishing.
4. **What is the user workflow?** Landing Page -> Register/Login -> Dashboard -> Upload Resume -> AI Parsing -> Editor -> Publish.
5. **What are the primary entities?** User, Portfolio, and Portfolio Sections (Education, Experience, Projects, Skills, Achievements, Links).

## Tech Stack
### Frontend Framework:
- **React 18** + **TypeScript**
- **Vite** (Build Tool)

### Backend Framework:
- **FastAPI** (Note: Backend is maintained separately and documented in specs, not present in this repository).

### Database:
- **PostgreSQL** on **Supabase**

### Authentication:
- **Custom JWT Auth** (Tokens stored via `authStorage.ts`).

### State Management:
- **React Context** (used for Auth via `AuthProvider`). Local component state for UI.

### Styling:
- **Tailwind CSS** (v4.3.3)
- No component libraries (custom components required).

### Infrastructure & Deployment:
- Frontend: **Netlify**
- Backend: **Railway**

## Repository Structure
```
resume/
├── .gemini/          # IDE/Editor configuration
├── .git/             # Git repository
├── Ai/               # Documentation specs
│   └── frontend.md   # Detailed frontend specification and API contract
├── frontend/         # React Frontend application
│   ├── .oxlintrc.json
│   ├── index.html
│   ├── netlify.toml  # Netlify deployment configuration
│   ├── package.json
│   ├── src/          # Source code
│   │   ├── App.tsx       # Main router setup
│   │   ├── main.tsx      # React entry point
│   │   ├── components/   # UI and Layout components
│   │   ├── hooks/        # Custom hooks (e.g., useAuth)
│   │   ├── lib/          # Utilities and API client
│   │   ├── pages/        # Route page components
│   │   └── types/        # TypeScript interfaces
│   ├── tsconfig.*.json
│   └── vite.config.ts
├── README.md
└── LICENSE
```

## System Architecture
- The repository strictly contains the Frontend codebase.
- The Backend is external (FastAPI) and communicates via REST API.
- **Frontend Architecture**: SPA (Single Page Application) using React Router for navigation. Protected routes are wrapped by `AuthedLayout`. The API client currently intercepts requests and provides mock responses until the real backend is integrated.

## Authentication Flow
1. User submits credentials via `/login` or `/register`.
2. Frontend sends POST request to `/auth/login` or `/auth/register`.
3. Backend returns a `{ token, user }` object.
4. Token is saved in `authStorage.ts` (localStorage).
5. `AuthProvider` maintains user session state. On mount, it fetches `/me` with the stored token to validate session.
6. API client appends `Authorization: Bearer <token>` to all subsequent requests.

## Data Flow Diagrams
**Resume Upload & Parse Flow:**
User Action (Upload File) ↓ Frontend (`/upload` page) ↓ API (POST `/resume/upload`) ↓ Backend (AI Parsing Logic) ↓ Database (Save Draft Portfolio) ↓ Response (Portfolio Data) ↓ UI Update (Redirect to `/editor/:id`).

**Editor Update Flow:**
User Action (Edit Text/Reorder) ↓ Frontend State (Optimistic UI) ↓ API (PUT `/portfolios/:id/...`) ↓ Backend (Update Logic) ↓ Database ↓ Response.

**AI Chat Update Flow:**
User Action (Sends Message) ↓ API (POST `/portfolios/:id/chat`) ↓ Backend (AI interprets intent & modifies state) ↓ Response (Updated Portfolio + AI Reply + Remaining Requests) ↓ UI Update (Chat history & Live preview).


## Environment Variables
- `VITE_API_BASE_URL`: Base URL for the FastAPI backend (e.g., `http://localhost:8000` or production Railway URL).

## Third Party Integrations
- `@dnd-kit/core`: Used for drag-and-drop reordering of portfolio sections.
- `react-hook-form`: Used for form state management and validation.

## Feature Inventory
- **Authentication**: Login and Registration forms.
- **Dashboard**: View all portfolios.
- **Resume Upload**: File upload interface with simulated AI parsing states.
- **Portfolio Editor**: Two-pane layout with form controls and a live preview. Allows editing sections, reordering, and template switching. Includes a floating AI Chat widget for natural language portfolio modifications (limited to 1000 requests/day).
- **Public Portfolio Viewer**: Renders the chosen template for a published portfolio.

## Technical Debt / Known Risks
- API client is currently mocking responses (needs to be connected to the real backend).
- AI parsing logic relies entirely on the external backend.

## Development Workflow
1. Run `npm run dev` in the `frontend` directory.
2. Use Vite for hot module replacement.
3. Lint with `oxlint` (`npm run lint`).

## Deployment Process
- Deploys to Netlify.
- `netlify.toml` handles SPA redirects (`/* /index.html 200`).

## Future Recommendations
- Connect `apiClient.ts` to the live backend once deployed.
- Implement robust error handling for failed AI parsing.
