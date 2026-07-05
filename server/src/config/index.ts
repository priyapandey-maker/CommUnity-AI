/**
 * Centralised application configuration.
 * Values are read from environment variables (populated via dotenv in index.ts).
 */
export const config = {
  port: Number(process.env.PORT ?? 8080),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  gcp: {
    project: process.env.GOOGLE_CLOUD_PROJECT ?? '',
    location: process.env.VERTEX_AI_LOCATION ?? 'us-central1',
  },
} as const;
