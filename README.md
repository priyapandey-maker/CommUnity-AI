# CommUnity AI

> Turning Community Signals into Trusted Decisions

CommUnity AI is a Google Cloud hackathon project that helps communities surface, triage, and act on local incidents using AI-assisted workflows.

---

## Repository Structure

```
community-ai/
├── client/          # React + Vite + TypeScript frontend
├── server/          # Node.js + Express + TypeScript backend
├── shared/          # Shared types / utilities (client & server)
├── docs/            # Project documentation
├── .gitignore
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9
- Docker (optional, for containerized runs)

### Install Dependencies

```bash
# Client
cd client && npm install

# Server
cd server && npm install
```

### Environment Variables

Copy the example env files and fill in your values:

```bash
cp client/.env.example client/.env
cp server/.env.example server/.env
```

### Run in Development

```bash
# Terminal 1 – backend
cd server && npm run dev

# Terminal 2 – frontend
cd client && npm run dev
```

### Run with Docker

```bash
# Build & start the server container
cd server
docker build -t community-ai-server .
docker run -p 8080:8080 --env-file .env community-ai-server
```

---

## Scripts

| Location | Command | Description |
|----------|---------|-------------|
| `client` | `npm run dev` | Vite dev server |
| `client` | `npm run build` | Production build |
| `client` | `npm run lint` | ESLint |
| `client` | `npm run format` | Prettier |
| `server` | `npm run dev` | ts-node-dev watch |
| `server` | `npm run build` | tsc compile |
| `server` | `npm start` | Run compiled JS |
| `server` | `npm run lint` | ESLint |
| `server` | `npm run format` | Prettier |

---

## Deployment

Both `client` and `server` are designed to run on **Google Cloud Run**.

- The server listens on `process.env.PORT` (Cloud Run injects this automatically).
- The client is a static SPA; serve the `dist/` output via Cloud Run + Nginx or Cloud Storage + CDN.
