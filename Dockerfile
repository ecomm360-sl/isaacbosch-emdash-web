# Stage 1: Build
FROM node:22-slim AS builder

RUN corepack enable && corepack prepare pnpm@10.28.0 --activate

WORKDIR /app

# Copy workspace metadata
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY tsconfig.base.json tsconfig.json ./

# Copy all packages and the isaacbosch demo
COPY packages/ packages/
COPY demos/isaacbosch/ demos/isaacbosch/

# Install ONLY the dependencies needed by the isaacbosch demo and its
# transitive workspace dependencies. The "..." suffix tells pnpm to
# include workspace deps transitively. This avoids downloading the
# hundreds of MB pulled in by packages/cloudflare, marketplace, etc.
# which the demo doesn't use.
RUN pnpm install --shamefully-hoist --filter "@emdash-cms/demo-isaacbosch..."

# Build only the workspace packages required by the demo, then the demo
RUN pnpm --filter "@emdash-cms/demo-isaacbosch..." run build

# Prune the pnpm store to reduce image size
RUN pnpm store prune || true

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
# Resend env vars (set these in Easypanel runtime, NOT here):
#   RESEND_API_KEY        — your Resend API key
#   RESEND_FROM           — verified sender, e.g. "Isaac Bosch <hola@isaacbosch.com>"
#   CONTACT_EMAIL_TO      — destination inbox for contact form submissions

EXPOSE 4321

WORKDIR /app/demos/isaacbosch

ENTRYPOINT ["/app/docker-entrypoint.sh"]
