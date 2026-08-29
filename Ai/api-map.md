# API Inventory

This document maps the REST API contract defined in the specification (`Ai/frontend.md`). The frontend consumes these APIs via `src/lib/apiClient.ts`.

## Authentication
| Method | Route | Purpose | Used By |
|---|---|---|---|
| POST | `/auth/register` | Register new user. Returns `{ token, user }` | `Register.tsx`, `useAuth` |
| POST | `/auth/login` | Login user. Returns `{ token, user }` | `Login.tsx`, `useAuth` |
| GET | `/me` | Get current authenticated user | `useAuth` (on mount) |

## Resumes & Portfolios
| Method | Route | Purpose | Used By |
|---|---|---|---|
| POST | `/resume/upload` | Upload resume file (multipart). Returns drafted Portfolio | `Upload.tsx` |
| GET | `/portfolios` | List user's portfolios | `Dashboard.tsx` |
| GET | `/portfolios/:id` | Get specific portfolio data | `Editor.tsx` |
| PUT | `/portfolios/:id` | Update portfolio metadata (headline, template) | `Editor.tsx` |
| POST | `/portfolios/:id/publish` | Publish portfolio. Returns `{ slug }` | `Editor.tsx` |
| DELETE | `/portfolios/:id` | Delete a portfolio | `Dashboard.tsx` |

## Portfolio Sections (CRUD)
*(All section endpoints require Auth and return the updated Section object)*

| Method | Route | Purpose |
|---|---|---|
| POST | `/portfolios/:id/<section>` | Create new item in section |
| PUT | `/portfolios/:id/<section>/:itemId` | Update existing item |
| DELETE | `/portfolios/:id/<section>/:itemId` | Delete existing item |

*`<section>` can be: `education`, `experience`, `projects`, `skills`, `achievements`, `links`.*

## Reordering
| Method | Route | Purpose | Used By |
|---|---|---|---|
| PUT | `/portfolios/:id/reorder` | Reorder items within a section. Body: `{ section, orderedIds }` | `Editor.tsx` |

## Public Access
| Method | Route | Purpose | Used By |
|---|---|---|---|
| GET | `/p/:slug` | Get published portfolio (increments view_count) | `PublicPortfolio.tsx` |
