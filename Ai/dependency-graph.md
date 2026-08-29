# Dependency Graph

This document illustrates the internal dependencies of the frontend application.

## Core Hierarchy
```
main.tsx
 └── App.tsx (Router Definition)
      ├── AuthProvider (src/hooks/useAuth.tsx)
      │    ├── apiClient (src/lib/apiClient.ts)
      │    └── authStorage (src/lib/authStorage.ts)
      │
      ├── Public Routes:
      │    ├── Landing.tsx
      │    ├── Login.tsx
      │    ├── Register.tsx
      │    ├── PublicPortfolio.tsx
      │    └── Demo.tsx
      │
      └── Protected Routes (AuthedLayout.tsx):
           ├── Dashboard.tsx
           ├── Upload.tsx
           └── Editor.tsx
                ├── SectionList/Forms (To be implemented)
                ├── LivePreviewPane (To be implemented)
                └── Templates:
                     ├── FreshMinimalTemplate.tsx
                     └── ClassicProfessionalTemplate.tsx
```

## Critical Files
- **`src/hooks/useAuth.tsx`**: Manages global authentication state. Highly dependent on `apiClient.ts` and `authStorage.ts`. Modifying this affects the entire application's security model.
- **`src/lib/apiClient.ts`**: The central nervous system for data fetching. It handles mock logic and auth token injection. Modifying this affects all data retrieval.
- **`src/App.tsx`**: Defines the application's routing map and layout wrapper structure.
- **`src/types/portfolio.ts`**: Defines the single source of truth for data structures.

## External Dependencies (package.json)
- `react`, `react-dom`: Core UI library.
- `react-router-dom`: Routing management.
- `@dnd-kit/core`, `@dnd-kit/sortable`: Complex logic for drag-and-drop section reordering.
- `react-hook-form`: Form management and validation for editor sections.
- `tailwindcss`, `tailwind-merge`, `clsx`: Styling ecosystem.
- `lucide-react`: Iconography.
