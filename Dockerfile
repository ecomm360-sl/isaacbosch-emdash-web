# Stage 1: Build
FROM node:22-slim AS builder

RUN corepack enable && corepack prepare pnpm@10.28.0 --activate

WORKDIR /app

# Copy everything needed for the monorepo build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY tsconfig.base.json tsconfig.json ./

# Copy all packages and the isaacbosch demo
COPY packages/ packages/
COPY demos/isaacbosch/ demos/isaacbosch/

# Install with shamefully-hoist so all deps are resolvable from any path
RUN pnpm install --shamefully-hoist

# Build workspace packages first, then the blog template
RUN pnpm run build
RUN cd demos/isaacbosch && pnpm run build

# Stage 2: Production
FROM node:22-slim AS runtime

RUN corepack enable && corepack prepare pnpm@10.28.0 --activate

WORKDIR /app

# Copy the full built workspace
COPY --from=builder /app ./

# Copy entrypoint script
COPY docker-entrypoint.sh /app/docker-entrypoint.sh
RUN chmod +x /app/docker-entrypoint.sh

# Create directories for persistent data
RUN mkdir -p /app/data /app/uploads

ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production
ENV EMDASH_DB_URL=file:/app/data/data.db
ENV EMDASH_UPLOADS_DIR=/app/uploads

EXPOSE 4321

WORKDIR /app/demos/isaacbosch

ENTRYPOINT ["/app/docker-entrypoint.sh"]
