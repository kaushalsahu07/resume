# Routes Table

This document maps the React Router configuration located in `src/App.tsx`.

| Route | File Component | Purpose | Auth Required |
|---|---|---|---|
| `/` | `src/pages/Landing.tsx` | Landing page: hero, template gallery, how it works | No (Public) |
| `/login` | `src/pages/Login.tsx` | User login form | No (Public) |
| `/register` | `src/pages/Register.tsx` | User registration form | No (Public) |
| `/p/:slug` | `src/pages/PublicPortfolio.tsx` | Rendered published portfolio | No (Public) |
| `/demo` | `src/pages/Demo.tsx` | Hardcoded example portfolio | No (Public) |
| `/dashboard` | `src/pages/Dashboard.tsx` | List of user's portfolios | Yes (Private) |
| `/upload` | `src/pages/Upload.tsx` | Resume file upload and parsing state | Yes (Private) |
| `/editor/:portfolioId` | `src/pages/Editor.tsx` | Section editor with live preview pane | Yes (Private) |

## Layouts & Middleware
- **Auth Middleware**: Protected routes are nested under the `<AuthedLayout />` component (`src/components/layout/AuthedLayout.tsx`). If a user accesses these routes without a valid session, they are redirected to `/login`.
- **Auth Provider**: `<AuthProvider>` wraps the entire router to provide global access to the current `user` object and loading state.
