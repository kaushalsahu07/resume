# Database Map (Inferred)

Based on the TypeScript interfaces defined in `src/types/portfolio.ts` and the API contract, the expected PostgreSQL database schema (managed by the FastAPI backend) is mapped below.

## Entities

### User
- **Purpose**: Represents an authenticated user of the platform.
- **Fields**: `id` (UUID), `email` (String), `name` (String), `password_hash` (String).
- **Relationships**: Parent of `Portfolio`.

### Portfolio
- **Purpose**: Represents a single portfolio site generated from a resume.
- **Fields**: 
  - `id` (UUID)
  - `user_id` (FK to User)
  - `slug` (String, unique)
  - `templateId` (Enum: 'fresh-minimal', 'classic-professional')
  - `headline` (String, nullable)
  - `summary` (Text, nullable)
  - `isPublished` (Boolean)
  - `viewCount` (Integer)
- **Relationships**: Child of `User`. Parent of all section entities.

### Education
- **Fields**: `id`, `portfolio_id` (FK), `institution`, `degree`, `field`, `startDate`, `endDate`, `order` (Integer).

### Experience
- **Fields**: `id`, `portfolio_id` (FK), `company`, `role`, `startDate`, `endDate`, `description`, `order` (Integer).

### Project
- **Fields**: `id`, `portfolio_id` (FK), `title`, `description`, `techStack` (Array of Strings), `link`, `order` (Integer).

### Skill
- **Fields**: `id`, `portfolio_id` (FK), `name`, `category`.

### Achievement
- **Fields**: `id`, `portfolio_id` (FK), `title`, `description`, `date`.

### Link
- **Fields**: `id`, `portfolio_id` (FK), `label`, `url`.

## Entity Relationships
`User` (1) ─── (N) `Portfolio`
`Portfolio` (1) ─── (N) `Education`
`Portfolio` (1) ─── (N) `Experience`
`Portfolio` (1) ─── (N) `Project`
`Portfolio` (1) ─── (N) `Skill`
`Portfolio` (1) ─── (N) `Achievement`
`Portfolio` (1) ─── (N) `Link`
