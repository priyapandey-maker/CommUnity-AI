# ── Stage 1: Build ───────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy monorepo root package files
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/
COPY shared/package*.json ./shared/

# Install dependencies for all workspaces
RUN npm ci

# Copy shared and server sources
COPY shared/ ./shared/
COPY server/ ./server/

# Compile the server
RUN npm run build --workspace=server

# ── Stage 2: Production ──────────────────────────────────────
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
COPY server/package*.json ./server/
COPY shared/package*.json ./shared/

# Install only production dependencies
RUN npm ci --omit=dev

# Copy build artifacts and source code
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/shared/src ./shared/src

WORKDIR /app/server
ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/index.js"]
