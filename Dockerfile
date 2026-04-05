# Stage 1: Build
FROM node:22-slim AS builder

RUN corepack enable && corepack prepare pnpm@10.28.0 --activate

WORKDIR /app

# Copy everything needed for the monorepo build
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY tsconfig.base.json tsconfig.json ./

# Copy all packages and the blog template (needed for workspace resolution)
COPY packages/ packages/
COPY templates/blog/ templates/blog/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build workspace packages first, then the blog template
RUN pnpm run build
RUN cd templates/blog && pnpm run build

# Stage 2: Production — copy the entire workspace to preserve pnpm symlinks
FROM node:22-slim AS runtime

WORKDIR /app

# Copy the full workspace (pnpm symlinks require the complete structure)
COPY --from=builder /app ./

# Create directories for persistent data
RUN mkdir -p /app/data /app/uploads

ENV HOST=0.0.0.0
ENV PORT=4321
ENV NODE_ENV=production

EXPOSE 4321

WORKDIR /app/templates/blog

CMD ["node", "./dist/server/entry.mjs"]
