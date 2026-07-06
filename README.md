Ran command: `find . -maxdepth 2 -type d -print`
Viewed implementation_plan.md:1-73

# CommUnity‑AI  

## Project Overview  
CommUnity‑AI is an open‑source web platform that enables citizens, organizations, and public agencies to submit, discuss, and resolve community incidents through an evidence‑based decision workflow. The application presents a public **Decision Ledger** that records incident reports, AI‑assisted analyses, and final resolutions in an immutable, searchable register.

## Problem & Solution  

| Problem | Solution |
|--------|----------|
| Fragmented incident reporting across disparate tools, leading to data silos and delayed decision making. | A unified web interface for reporting incidents, automatically enriching reports with AI‑generated insights, and publishing decisions to a public, auditable ledger. |
| Lack of transparency in how decisions are reached. | All# CommUnity‑AI  

## Project Overview  
CommUnity‑AI is an open‑source web platform that enables citizens, organizations, and public agencies to submit, discuss, and resolve community incidents through an evidence‑based decision workflow. The application presents a public **Decision Ledger** that records incident reports, AI‑assisted analyses, and final resolutions in an immutable, searchable register.

## Problem & Solution  

| Problem | Solution |
|--------|----------|
| Fragmented incident reporting across disparate tools, leading to data silos and delayed decision making. | A unified web interface for reporting incidents, automatically enriching reports with AI‑generated insights, and publishing decisions to a public, auditable ledger. |
| Lack of transparency in how decisions are reached. | All analysis steps, evidence sources, and AI reasoning are displayed in a step‑by‑step pipeline, with a fallback rule‑based path when the AI service is unavailable. |
| Inconsistent UI language that resembles generic SaaS dashboards rather than a civic trust platform. | A polished, civic‑oriented design system emphasizing hierarchy, readability, and accessibility (WCAG AA compliant). |

## Tech Stack  

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, Vite, TypeScript, Tailwind CSS (custom design tokens) |
| **Backend** | Node.js 18, Express 4, TypeScript |
| **AI Service** | Google Gemini SDK (`@google/genai`) |
| **Data** | In‑memory store (development) – replaceable with any persistent DB |
| **Build / Tooling** | npm scripts, eslint, prettier, tsc |

## Repository Structure  

```
CommUnity-AI/
├─ client/                     # React front‑end
│  ├─ src/
│  │  ├─ components/          # UI primitives (Badge, Card, Navbar, etc.)
│  │  ├─ pages/               # LandingPage, LedgerPage, DecisionPage, SubmitIncidentPage
│  │  ├─ services/            # API client wrappers
│  │  └─ index.css            # Global style & CSS variables
│  ├─ tailwind.config.js      # Design tokens & theme extensions
│  └─ package.json
├─ server/                     # Express API
│  ├─ src/
│  │  ├─ services/
│  │  │   ├─ aiService.ts      # Gemini integration
│  │  │   └─ fallbackIncidentUnderstandingService.ts
│  │  ├─ routes/               # REST endpoints
│  │  └─ index.ts
│  └─ package.json
├─ shared/                     # Shared TypeScript types/interfaces
│  └─ index.d.ts
├─ .eslintrcc.js
├─ .prettierrcc
└─ README.md
```

## Installation  

### Prerequisites  

- **Node.js** ≥ 18 (LTS)  
- **npm** ≥ 8  
- A Google Cloud project with the Gemini API enabled (for AI features)

### Steps  

1. **Clone the repository**  

   ```bash
   git clone https://github.com/your-org/CommUnity-AI.git
   cd CommUnity-AI
   ```

2. **Install dependencies**  

   ```bash
   # Front‑end
   cd client
   npm ci
   cd ..

   # Back‑end
   cd server
   npm ci
   cd ..
   ```

3. **Configure environment variables**  

   Copy the example file and fill in the required values:

   ```bash
   cp .env.example .env
   # Edit .env with your Google Gemini API key and any other secrets
   ```

4. **Run the application**  

   ```bash
   # In one terminal – start the API server
   cd server
   npm run dev   # runs `ts-node-dev src/index.ts`

   # In another terminal – start the front‑end dev server
   cd client
   npm run dev   # Vite dev server at http://localhost:5173
   ```

   The UI will proxy API calls to `http://localhost:4000` (default server port).

## Environment Variables  

| Variable | Description |
|----------|-------------|
| `PORT` (server) | HTTP port for Express (default `4000`). |
| `GOOGLE_API_KEY` | API key for the Gemini SDK. |
| `CORS_ORIGIN` | Allowed origins for API requests (defaults to `*` for development). |
| `NODE_ENV` | `development` | `production`. |

> **Note:** The exact list is defined in `server/src/config.ts`. See `.env.example` for a minimal set.

## Usage  

1. **Submit an incident** – Navigate to **“Report Incident”**, fill the form, and submit.  
2. **AI‑assisted analysis** – The server calls Gemini to generate an initial understanding. If Gemini is unavailable, the fallback rule‑based service runs.  
3. **Decision ledger** – All incidents, analyses, and final decisions appear in the **Decision Ledger** page, searchable and filterable.  
4. **Public register** – The ledger is read‑only for external users; internal staff can edit decisions via the admin UI (not covered here).

## Workflow Overview  

```
User → Front‑end (React) → API (Express) → Gemini (AI) → Response
          ↳ Validation ↘               ↘
            ↳ Fallback Service (Rule‑based) ↘
```

- **Form validation** happens client‑side with TypeScript types and concise UI feedback.  
- **API layer** validates payloads again before forwarding to the AI service.  
- **AI Service** (`aiService.ts`) wraps Gemini calls, handling retries and error mapping.  
- **Fallback Service** ensures uninterrupted processing when the AI endpoint fails.  

## AI Pipeline  

1. **Incident ingestion** – Raw JSON payload from the front‑end.  
2. **Pre‑processing** – Normalization and sanitization.  
3. **Gemini request** – Structured prompt generated in `aiService.ts`.  
4. **Response parsing** – Extracted insights stored in the ledger entry.  
5. **Fallback** – If Gemini returns an error, `fallbackIncidentUnderstandingService.ts` generates a deterministic rule‑based analysis.  

All AI‑related logic resides in `server/src/services/`.

## Design Decisions  

- **Civic visual language** – Custom Tailwind tokens (ccivic blue, decision emerald, evidence teal) replace generic indigo/purple palettes.  
- **Accessibility first** – WCAG AA compliance for color contrast, focus rings, and ARIA attributes.  
- **Separation of concerns** – Front‑end and back‑end are independent packages; shared types avoid duplication.  
- **Graceful degradation** – Fallback analysis guarantees continuity when the external AI service is down.  

## Non‑Functional Aspects  

| Aspect | Implementation |
|--------|----------------|
| **Error handling** | Centralized Express error middleware; UI displays user‑friendly toast messages. |
| **Security** | Helmet middleware, CORS whitelist, input sanitization, and environment‑based secret management. |
| **Performance** | Lazy‑loaded routes, minimal bundle size via Vite, server‑side caching of AI responses (in‑memory for dev). |
| **Scalability** | Stateless API design; can be containerised and scaled horizontally; AI calls are external and stateless. |

## Known Limitations  

- **In‑memory data store** – Persistence is lost on server restart; replace with a DB (PostgreSQL, MongoDB, etc.) for production.  
- **No auth/role management** – Public read‑only ledger; admin features require additional auth implementation.  
- **Rate limits** – Gemini API quotas are not throttled internally; consider adding rate‑limiting middleware for production.

## Contributing  

1. **Fork** the repository.  
2. **Create a feature branch** (`git checkout -b feat/your-feature`).  
3. **Run lint and tests** before committing:  

   ```bash
   npm run lint          # both client and server
   npx tsc --noEmit      # type‑checking
   npm run build         # ensure production build succeeds
   ```

4. **Submit a Pull Request** with a clear description and reference any related issue.  
5. Follow the existing **code style** (Prettier + ESLint) and include **type definitions** for new data structures.

## License  

This project is released under the **MIT License**. See `LICENSE` for full terms.  

---  

*Generated on 2026‑07‑06 based on the current state of the CommUnity‑AI repository.*
