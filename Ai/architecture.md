# System Architecture

## Overview
The "Resume-to-Portfolio" application follows a decoupled client-server architecture. The frontend is a React Single Page Application (SPA) that communicates with a Python FastAPI backend (maintained separately) via REST APIs. Data is persisted in a PostgreSQL database hosted on Supabase.

## Architecture Map

```
Browser (User)
  │
  ▼
[ Frontend ]
  Netlify Hosting
  React 18 + Vite
  Tailwind CSS
  React Router
  │
  ├─ API Layer (src/lib/apiClient.ts)
  │    (Handles Auth Headers & JSON serialization)
  │
  ▼
[ Backend ] (External System)
  Railway Hosting
  FastAPI (Python)
  │
  ├─ AI Parsing Service (Resume extraction)
  ├─ Business Logic & Validation
  ├─ Auth Service (JWT Generation)
  │
  ▼
[ Database ] (External System)
  Supabase
  PostgreSQL
```

## Component Relationships

### Frontend
- **Routing**: `App.tsx` handles top-level routing, wrapping protected routes in `<AuthedLayout />`.
- **State Management**: `AuthProvider` (Context) holds the current user state globally. Page-level state is managed via local React state and `react-hook-form`.
- **API Client**: A custom fetch wrapper (`apiClient.ts`) intercepts requests to append the JWT token and manages mock vs. real network calls.

### Backend (Based on Contract)
- **Auth Routes**: Handles JWT issuance and validation.
- **Portfolio Routes**: CRUD operations for portfolios and individual resume sections.
- **AI Upload Route**: Accepts multipart form data, processes the resume, and returns structured portfolio data.

### External Services
- **AI/LLM Provider**: (Implicitly part of the backend) Used for parsing resume text into structured JSON.
- **Supabase**: Postgres Database hosting.
- **Netlify/Railway**: Deployment platforms for Frontend and Backend, respectively.
