import express, { Application } from 'express';
import cors from 'cors';
import { healthRouter } from './routes/health';

const app: Application = express();

// ── Middleware ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────
app.use('/health', healthRouter);

export default app;
