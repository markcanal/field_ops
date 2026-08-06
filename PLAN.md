# FieldOps Initial Implementation Plan

## 1. Objective

Build a production-quality learning project that demonstrates practical skills in:

- React
- React Native
- Next.js
- TypeScript
- Full-stack architecture
- Authentication and authorization
- PostgreSQL and Drizzle ORM
- Server and client state management
- Testing
- Mobile offline workflows
- Deployment

The project should be portfolio-ready while remaining small enough to complete incrementally.

---

## 2. Product Scope

FieldOps will support three initial roles:

- Admin
- Dispatcher
- Technician

The first usable version will support this workflow:

1. A dispatcher creates a customer.
2. A dispatcher creates a job.
3. A dispatcher schedules and assigns the job.
4. A technician sees the assigned job on mobile.
5. The technician updates job progress.
6. The technician adds notes and photos.
7. The technician completes the job.
8. The dispatcher reviews the result.

---

## 3. Milestone 0 — Product and Architecture Foundation

### Goals

- Finalize the MVP scope
- Create the monorepo
- Establish coding standards
- Configure local development
- Define database entities
- Define authentication and role behavior

### Tasks

- Create pnpm workspace
- Add Turborepo
- Create `apps/web`
- Create `apps/mobile`
- Create shared packages
- Configure TypeScript
- Configure ESLint and Prettier
- Add environment examples
- Add CI workflow
- Add architecture documentation
- Create initial database schema
- Create initial ADRs

### Deliverables

- Repository builds successfully
- Web app runs
- Mobile app runs
- Shared package imports work
- CI runs lint, type checking, and tests
- Database migration can be executed

### Learning Focus

- Monorepo structure
- Shared TypeScript configuration
- Next.js and Expo coexistence
- Package boundaries

---

## 4. Milestone 1 — Authentication and Organization Access

### Goals

- Implement secure authentication
- Introduce organization-scoped access
- Add role-based authorization

### Features

#### Web

- Sign in
- Sign out
- Protected dashboard layout
- Unauthorized page
- Basic user profile display

#### Mobile

- Sign in
- Sign out
- Secure session storage
- Protected route group

#### Server

- Better Auth integration
- Session validation
- User role resolution
- Organization scope resolution
- Authorization helpers

### Core Tables

- organization
- user
- membership or organization_user
- session
- account

### Tests

- Valid login
- Invalid credentials
- Protected route access
- Technician denied dispatcher action
- Cross-organization access denied

### Learning Focus

- Next.js server authentication
- React Native session persistence
- Role-based permissions
- Multi-tenant security

---

## 5. Milestone 2 — Customer Management

### Goals

- Let dispatchers manage customer information
- Establish reusable CRUD patterns

### Features

- Customer list
- Search and pagination
- Create customer
- Edit customer
- View customer details
- Manage customer addresses
- Archive customer when safe

### Suggested Customer Fields

- Name
- Email
- Phone
- Primary address
- Notes
- Status

### Web Focus

- Server-rendered initial list
- Client-side search and pagination
- React Hook Form
- Zod validation
- Mutation feedback
- Empty and error states

### Tests

- Create valid customer
- Reject invalid contact data
- Update customer
- Prevent unauthorized access
- Ensure organization scoping

### Learning Focus

- Server and Client Components
- Forms
- Route Handlers
- TanStack Query
- Reusable table and form patterns

---

## 6. Milestone 3 — Job Management

### Goals

- Create the core business feature
- Centralize job status rules

### Features

- Create job
- Edit draft or scheduled job
- View job details
- Schedule job
- Select service type
- Add description and internal notes
- Cancel job
- View job status history

### Core Tables

- service_type
- job
- job_status_history
- job_note

### Domain Rules

- Draft jobs can be edited freely.
- Scheduled jobs require a date and customer.
- Assigned jobs require a technician.
- Completed jobs require completion notes.
- Cancelled jobs cannot be resumed without an explicit restore policy.

### Tests

- Valid status transitions
- Invalid status transitions
- Required fields per status
- Role restrictions
- Organization scoping

### Learning Focus

- Domain-driven business rules
- Transactional mutations
- API error design
- Audit history

---

## 7. Milestone 4 — Technician Assignment and Scheduling

### Goals

- Let dispatchers assign technicians
- Add schedule-oriented views

### Features

- Technician directory
- Assign or reassign technician
- Daily and weekly job views
- Filter by technician
- Filter by job status
- Conflict warning for overlapping assignments
- Assignment history

### Core Tables

- technician_profile
- job_assignment

### Tests

- Assign technician
- Reassign technician
- Reject unauthorized assignment
- Detect schedule conflict
- Ensure technician only sees assigned jobs

### Learning Focus

- Complex queries
- Date handling
- Calendar UI
- Derived server data
- Optimistic updates where safe

---

## 8. Milestone 5 — Technician Mobile Workflow

### Goals

- Deliver the primary React Native experience
- Complete the core field workflow

### Screens

- Sign in
- Today's jobs
- Assigned jobs
- Job details
- Customer and address information
- Status update
- Add note
- Complete job
- Profile and sign out

### Technician Actions

- Mark en route
- Mark in progress
- Put on hold
- Add service note
- Mark completed

### Mobile Requirements

- Clear loading and empty states
- Pull to refresh
- Secure session storage
- Basic cached queries
- Retry failed mutations
- Accessible touch targets

### Tests

- Technician login
- Assigned jobs render
- Job status update
- Invalid transition message
- Job completion happy path

### Learning Focus

- Expo Router
- Mobile navigation
- TanStack Query on mobile
- Platform-specific UI
- Secure storage
- Mobile testing

---

## 9. Milestone 6 — Attachments and Proof of Work

### Goals

- Support service photos
- Build secure upload flows

### Features

- Select or capture image
- Compress image before upload
- Upload progress
- Retry failed upload
- Before and after categories
- Attachment gallery
- Remove attachment when allowed
- Dispatcher review on web

### Server Requirements

- Signed upload URL
- MIME and size validation
- Organization and job ownership validation
- Attachment metadata record
- Thumbnail strategy

### Tests

- Valid upload metadata
- Reject unsupported file
- Reject unauthorized job attachment
- Retry failed upload
- Attachment visible on web

### Learning Focus

- Native camera and media APIs
- Object storage
- Secure file handling
- Upload progress
- Cross-platform media presentation

---

## 10. Milestone 7 — Dashboard and Operational Visibility

### Goals

- Give dispatchers a useful overview
- Practice dashboard composition and data aggregation

### Metrics

- Jobs today
- Unassigned jobs
- Jobs by status
- Completed jobs
- Overdue jobs
- Technician workload

### Features

- Summary cards
- Status breakdown
- Recent activity
- Upcoming jobs
- Filter by date range

### Tests

- Correct aggregation
- Organization scoping
- Empty dashboard state
- Date filter behavior

### Learning Focus

- Aggregation queries
- Data visualization
- Server-side data loading
- Responsive dashboard UI

---

## 11. Milestone 8 — Offline Mobile Foundation

### Goals

- Improve technician reliability in poor connectivity
- Learn controlled synchronization patterns

### Initial Offline Features

- Cache assigned job list
- Cache job details
- Save draft notes
- Queue status updates
- Display synchronization state

### Constraints

- Do not support every mutation offline initially.
- Do not silently overwrite server changes.
- Every queued mutation needs a client-generated ID.
- The server must support safe retries.
- Failed synchronization must be visible and retryable.

### Tests

- Open cached jobs without network
- Queue status update
- Retry synchronization
- Prevent duplicate status history
- Show failed sync state

### Learning Focus

- Local persistence
- Mutation queues
- Idempotency
- Conflict handling
- Network status integration

---

## 12. Milestone 9 — Quality, Security, and Deployment

### Goals

- Make the project portfolio-ready
- Verify production behavior

### Tasks

- Add Playwright critical-path tests
- Add Maestro critical-path tests
- Review accessibility
- Review authorization coverage
- Add rate limiting
- Add request logging
- Add error monitoring
- Add database backups
- Add preview environment
- Deploy web and API
- Configure production database
- Configure object storage
- Prepare mobile preview build
- Document setup and architecture

### Deliverables

- Deployed web application
- Installable mobile preview
- CI pipeline
- Test reports
- Architecture diagram
- Demo credentials or seeded demo data
- Portfolio case study

---

## 13. Suggested First Database Model

```text
Organization
User
OrganizationMembership
Customer
CustomerAddress
TechnicianProfile
ServiceType
Job
JobAssignment
JobStatusHistory
JobNote
JobAttachment
AuditLog
```

Keep the first schema minimal. Add inventory, invoicing, and payments only after the primary workflow is complete.

---

## 14. Initial API Surface

```text
POST   /api/auth/sign-in
POST   /api/auth/sign-out
GET    /api/auth/session

GET    /api/customers
POST   /api/customers
GET    /api/customers/:customerId
PATCH  /api/customers/:customerId

GET    /api/technicians
GET    /api/service-types

GET    /api/jobs
POST   /api/jobs
GET    /api/jobs/:jobId
PATCH  /api/jobs/:jobId
POST   /api/jobs/:jobId/assign
POST   /api/jobs/:jobId/status
POST   /api/jobs/:jobId/notes
POST   /api/jobs/:jobId/attachments/upload-url

GET    /api/dashboard
```

---

## 15. Recommended First Sprint

### Sprint Goal

A dispatcher can sign in, create a customer, and create a draft job.

### Tasks

1. Initialize monorepo.
2. Create web and mobile applications.
3. Configure shared TypeScript and linting.
4. Configure PostgreSQL and Drizzle.
5. Implement organization, user, and membership tables.
6. Integrate authentication.
7. Create protected web layout.
8. Add customer schema and migration.
9. Implement customer list and create form.
10. Add job schema and migration.
11. Implement draft job creation.
12. Add unit and integration tests.
13. Configure CI.
14. Update documentation.

### Sprint Acceptance Criteria

- Authenticated dispatcher can access the dashboard.
- Unauthenticated user is redirected to sign in.
- Dispatcher can create a valid customer.
- Dispatcher can create a draft job for that customer.
- Invalid inputs display useful messages.
- Data is scoped to the authenticated organization.
- Lint, type checking, tests, and build pass.

---

## 16. Suggested Learning Sequence

Use this order to avoid learning too many concepts at once:

1. React fundamentals inside Next.js
2. Next.js App Router and Server Components
3. Forms and validation
4. Database and API design
5. TanStack Query
6. Authentication and authorization
7. React Native with Expo
8. Shared contracts and API client
9. Mobile persistence
10. Offline synchronization
11. End-to-end testing
12. Deployment and monitoring

---

## 17. Features Explicitly Deferred

Do not include these in the first release:

- Payments
- Invoicing
- Payroll
- Real-time chat
- Live GPS tracking
- Route optimization
- Advanced inventory
- Customer mobile app
- AI scheduling
- Advanced business intelligence
- Multi-region deployment

These can be considered after the core job lifecycle is stable.

---

## 18. Definition of MVP

The MVP is complete when:

- Admin or dispatcher can sign in.
- Dispatcher can manage customers.
- Dispatcher can create and assign jobs.
- Technician can sign in on mobile.
- Technician can view assigned jobs.
- Technician can update status.
- Technician can add notes and photos.
- Technician can complete a job.
- Dispatcher can review completed work.
- Authorization and organization scoping are tested.
- Critical web and mobile flows have automated coverage.
- The web app and mobile preview are deployable.
