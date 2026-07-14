# Repository Inventory

## Folder Structure
- `api/`
- `client/`
  - `src/` (React app)
    - `components/`
    - `hooks/`
    - `layouts/`
    - `pages/`
    - `services/`
    - `types/`
    - `utils/`
- `docs/` (Master Documentation)
- `server/` (Express API)
  - `src/`
    - `config/`
    - `controllers/`
    - `knowledge/`
    - `middleware/`
    - `prompts/`
    - `routes/`
    - `services/`
    - `utils/`
- `shared/` (Shared Types)

## Routes
- `client/src/App.tsx`:
  - `/` (LandingPage)
  - `/submit` (SubmitIncidentPage)
  - `/decision/:id` (DecisionPage)
  - `/ledger` (LedgerPage)
- `server/src/routes/index.ts`:
  - `/health`
  - `/incident`
  - `/analyze`
  - `/decision`
  - `/ledger`

## Components
- `Button.tsx`
- `FormField.tsx`
- `ImageUpload.tsx`
- `IncidentForm.tsx`
- `Navbar.tsx`
- `PageHeader.tsx`
- UI Components: `Badge.tsx`, `Card.tsx`, `Input.tsx`, `PageContainer.tsx`, `PrimaryButton.tsx`, `SecondaryButton.tsx`, `SectionTitle.tsx`, `Spinner.tsx`, `Textarea.tsx`

## Services
- **Client**: `apiClient.ts`, `api.error.ts`, `incidentService.ts`
- **Server**: `aiService.ts`, `decisionEngineService.ts`, `decisionStoreService.ts`, `fallbackIncidentUnderstandingService.ts`, `incidentService.ts`, `ledgerService.ts`, `knowledgeService.ts`

## APIs
- `GET /health`
- `POST /incident`
- `POST /analyze`
- `GET /decision/:id`
- `GET /ledger`

## AI Modules
- `server/src/services/aiService.ts` (Gemini 2.5 Flash implementation for Incident Understanding)
- `server/src/prompts/incidentUnderstanding.ts`
- `server/src/services/fallbackIncidentUnderstandingService.ts`

## Shared Types
- `shared/src/decisionTypes.ts` (DecisionResult, DecisionPriority, DecisionReadiness, EvidenceFactor, etc.)

## Database Models
- Not explicitly defined via ORM/Database schema files (like Prisma, TypeORM, or Mongoose). 
- Currently using in-memory or stubbed implementations (e.g., `decisionStoreService.ts`) and JSON knowledge bases.

## Environment Variables
- `client/.env.example`
- `server/.env.example` (GEMINI_API_KEY, CORS_ORIGIN)

## Current Feature List
- Landing Page to establish vision and trust
- Incident Submission flow (Form, Image Upload, Details)
- AI-based Incident Understanding (via Gemini API)
- Deterministic Decision Engine (Rule-based evaluation mapping evidence to Priority and Recommendations)
- Decision Page (Displays priority, reasoning, timeline, and alternatives)
- Ledger Page (Displays past decisions/incidents)

## Missing Implementations
- Authentication & User Roles (Citizen, Authority, Admin)
- Real Database persistence (Firestore/PostgreSQL)
- Authority Dashboard & Analytics Pages
- Duplicate Detection AI Agent
- Location Intelligence AI Agent
- Priority Prediction AI Agent
- Learning / Feedback Loop Agent
- True AI Orchestrator (dynamically coordinating multiple independent agents instead of rule-based)
- Real-time Notifications
