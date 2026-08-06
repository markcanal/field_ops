# FieldOps

FieldOps is a multi-platform service-job management system for small and medium service businesses.

It helps dispatchers create and assign jobs, while field technicians use a mobile app to receive assignments, update progress, add service notes, upload photos, and complete work from the field.

## Product Vision

FieldOps aims to replace fragmented workflows involving chat messages, spreadsheets, phone calls, and paper service reports with one reliable system.

The product has two main interfaces:

- **Web application:** for administrators and dispatchers
- **Mobile application:** for technicians working in the field

## Main Use Cases

### Dispatcher

- Create and manage customers
- Create service jobs
- Schedule appointments
- Assign technicians
- Monitor job progress
- Review service notes and attachments
- View basic operational metrics

### Technician

- View assigned jobs
- See customer and location information
- Update job status
- Add notes
- Upload before-and-after photos
- Record materials used
- Capture customer confirmation
- Work with limited connectivity

### Administrator

- Manage organization settings
- Manage users and roles
- Configure service types
- Review audit history
- Access organization-wide reports

## Initial Roles

```text
ADMIN
DISPATCHER
TECHNICIAN
```

## Initial Job Lifecycle

```text
DRAFT
  → SCHEDULED
  → ASSIGNED
  → EN_ROUTE
  → IN_PROGRESS
  → COMPLETED
```

Additional states:

```text
ON_HOLD
CANCELLED
```

Status transitions are validated by centralized domain rules.

## Technology Stack

### Monorepo

- pnpm workspaces
- Turborepo
- TypeScript

### Web

- Next.js
- React
- App Router
- Tailwind CSS
- TanStack Query
- React Hook Form
- Zod

### Mobile

- React Native
- Expo
- Expo Router
- TanStack Query
- Zustand
- React Hook Form
- Zod

### Backend

- Next.js Route Handlers
- PostgreSQL
- Drizzle ORM
- Better Auth
- Object storage for attachments

### Testing

- Vitest
- React Testing Library
- Playwright
- Maestro

## Repository Structure

```text
fieldops/
├── apps/
│   ├── web/
│   └── mobile/
├── packages/
│   ├── api-client/
│   ├── auth/
│   ├── config/
│   ├── database/
│   ├── domain/
│   ├── schemas/
│   ├── types/
│   └── utils/
├── docs/
├── AGENTS.md
├── PLAN.md
├── pnpm-workspace.yaml
└── turbo.json
```

## Architecture

FieldOps uses feature-based organization with clear presentation, application, domain, and infrastructure responsibilities.

Key rules:

- Domain logic must remain framework-independent.
- Server state is managed with TanStack Query.
- Shared client state is managed with Zustand only when necessary.
- Forms use React Hook Form and Zod.
- Server authorization is mandatory.
- All organization data is tenant-scoped.
- Shared packages contain contracts and business logic, not platform-specific UI.

See `AGENTS.md` for complete AI and contributor guidelines.

## Getting Started

### Prerequisites

Install:

- Node.js LTS
- pnpm
- PostgreSQL
- Expo-compatible Android or iOS environment

### Install dependencies

```bash
pnpm install
```

### Configure environment variables

Create environment files based on the provided examples.

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/mobile/.env.example apps/mobile/.env
```

Example server variables:

```env
DATABASE_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
APP_BASE_URL=
STORAGE_BUCKET=
STORAGE_REGION=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=
```

Do not expose server secrets through variables prefixed for client use.

### Run database migrations

```bash
pnpm db:generate
pnpm db:migrate
```

### Start the web application

```bash
pnpm dev:web
```

### Start the mobile application

```bash
pnpm dev:mobile
```

### Start all development applications

```bash
pnpm dev
```

## Common Commands

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm format
pnpm db:generate
pnpm db:migrate
pnpm db:studio
```

## Environment Strategy

Use separate environments for:

- Local development
- Preview or staging
- Production

Never use production credentials in local development.

## API Response Convention

Successful responses should expose the requested resource or result.

Errors should use a consistent structure:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "The request contains invalid data.",
    "details": {}
  }
}
```

## Testing Expectations

Every production feature should include:

- Domain or utility unit tests where applicable
- Integration tests for critical API behavior
- At least one happy-path test
- Failure-path coverage for important validation and authorization rules

Critical end-to-end flows:

1. Dispatcher creates and assigns a job.
2. Technician receives and starts the job.
3. Technician adds notes and attachments.
4. Technician completes the job.
5. Dispatcher reviews the completed work.

## Security

FieldOps uses organization-scoped multi-tenancy.

Every protected request must:

1. Verify the authenticated user.
2. Resolve the user's organization.
3. Verify the required permission.
4. Scope database access to the organization.

Client-provided roles and organization identifiers must never be trusted.

## Offline Support

Offline support will be introduced in phases.

The first version will support:

- Cached assigned jobs
- Cached job details
- Draft notes
- Queued status updates
- Retryable attachment uploads

Offline operations must be idempotent and clearly display synchronization status.

## Development Workflow

Before changing code:

1. Read `AGENTS.md`.
2. Read `README.md`.
3. Read `PLAN.md`.
4. Inspect the existing implementation.
5. Follow current conventions.
6. Add or update tests.
7. Run linting, type checking, tests, and builds.

## Commit Convention

Use Conventional Commits.

```text
feat(jobs): add technician assignment
fix(auth): prevent cross-organization access
test(api): cover invalid job transitions
docs: document offline synchronization
```

## Initial Scope

The first release focuses on:

- Authentication
- Role-based authorization
- Customer management
- Job management
- Technician assignment
- Job status tracking
- Notes
- Attachments
- Basic dashboard
- Mobile job workflow

The following are intentionally deferred:

- Payments
- Real-time chat
- Advanced inventory
- Route optimization
- Payroll
- Advanced analytics
- Customer-facing application

## Project Status

FieldOps is currently in the planning and foundation stage.

See `PLAN.md` for milestones and delivery phases.
