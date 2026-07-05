import express, { Application } from 'express';
import cors from 'cors';
import { healthRouter } from './routes/health';
import { errorHandler } from './middleware/errorHandler';

const app: Application = express();

// ── Middleware ──────────────────────────────────────────────
// Restrict CORS origin via CORS_ORIGIN env var in production.
// Falls back to '*' in development so local dev works out of the box.
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  }),
);
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────
app.use('/health', healthRouter);

// ── Error handler (must be last) ────────────────────────────
app.use(errorHandler);

export default app;
