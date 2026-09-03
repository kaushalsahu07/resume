# System Architecture

## Overview
The "Resume-to-Portfolio" application follows a decoupled client-server architecture within a monorepo-style structure. The frontend is a React Single Page Application (SPA) built with Vite, communicating with a Python FastAPI backend via REST APIs. Data is persisted in a PostgreSQL database hosted on Supabase.

## Architecture Map

```mermaid
graph TD
    User([Browser / User]) --> Frontend
    
    subgraph Frontend [Frontend (React + Vite)]
        Router[React Router]
        Templates[Portfolio Templates]
        APIClient[API Client]
    end
    
    subgraph Backend [Backend (FastAPI)]
        AuthService[Auth Service]
        PortfolioService[Portfolio CRUD]
        AIService[AI Chat & Resume Parsing]
    end
    
    subgraph External [External Services]
        Supabase[(Supabase PostgreSQL)]
        Groq[Groq AI]
        Gemini[Gemini AI]
    end
    
    Frontend -- REST API --> Backend
    Backend -- SQL / REST --> Supabase
    Backend -- API --> Groq
    Backend -- API --> Gemini
```

## Component Relationships

### Frontend
- **Routing**: `App.tsx` handles top-level routing, wrapping protected routes in `<AuthedLayout />`.
- **State Management**: `AuthProvider` (Context) holds the current user state globally. Page-level state is managed via local React state.
- **Templates**: Various portfolio templates (`ClassicProfessionalTemplate`, `DarkGridTemplate`, etc.) render portfolio data identically across Editor and Public view.
- **API Client**: A custom fetch wrapper (`apiClient.ts`) intercepts requests to append JWT tokens and handles network communication.

### Backend
- **Auth Routes (`routers/auth.py`)**: Handles JWT issuance, registration, and user retrieval using Supabase auth.
- **Portfolio Routes (`routers/portfolios.py`)**: CRUD operations for portfolios, including publishing, unpublishing, and reordering sections.
- **AI Services (`services/ai_structurer.py`, `services/ai_chat.py`)**: Parses uploaded resumes (PDF/DOCX) using `resume_parser.py`, then structures them using Groq/Gemini. The chat feature allows users to query portfolio data dynamically.
- **Resume Upload (`routers/resume.py`)**: Accepts multipart form data to initiate the extraction and structuring process.

### External Services
- **AI/LLM Providers**: Groq and Google Gemini are integrated for rapid AI parsing and chat interactions.
- **Supabase**: Postgres Database and Auth provider.
