#!/bin/sh
set -e

EMDASH_CLI="node /app/packages/core/dist/cli/index.mjs"

cd /app/demos/isaacbosch

# Force-export the env vars so every child process (CLI, server, scripts)
# inherits them — Easypanel sometimes injects env after Dockerfile defaults
# and we want a single source of truth.
export EMDASH_DB_URL="${EMDASH_DB_URL:-file:/data/data.db}"
export EMDASH_UPLOADS_DIR="${EMDASH_UPLOADS_DIR:-/data/uploads}"

# Resolve the SQLite file path (strip "file:" / "file://").
DB_PATH=$(printf '%s' "$EMDASH_DB_URL" | sed -e 's#^file://##' -e 's#^file:##')
DB_DIR=$(dirname "$DB_PATH")
mkdir -p "$DB_DIR" "$EMDASH_UPLOADS_DIR"

echo "EMDASH_DB_URL=$EMDASH_DB_URL"
echo "Resolved DB path: $DB_PATH"

# Initialize EmDash on first run (creates tables, runs migrations, seeds content)
# IMPORTANT: pass --database explicitly. The CLI does NOT read EMDASH_DB_URL —
# it has its own default of ./data.db which would put the DB in the cwd
# (/app/demos/isaacbosch/data.db) and bypass the persistent volume entirely.
if [ ! -f "$DB_PATH" ]; then
  echo "First run: initializing EmDash at $DB_PATH ..."
  $EMDASH_CLI init --database "$DB_PATH"
  $EMDASH_CLI seed seed/seed.json --database "$DB_PATH"
else
  echo "Existing DB at $DB_PATH — running migrations only ..."
  $EMDASH_CLI init --database "$DB_PATH" || true
fi

# Auto-create / promote admin user from ADMIN_EMAIL env var.
# Generates a single-use magic link and prints it to the logs.
if [ -n "$ADMIN_EMAIL" ]; then
  echo ""
  echo "==============================================================="
  echo "ADMIN BOOTSTRAP"
  echo "==============================================================="
  node /app/demos/isaacbosch/scripts/create-admin.mjs "$ADMIN_EMAIL" "${ADMIN_NAME:-Admin}" || true
  echo "==============================================================="
  echo ""
fi

# Start the server (custom wrapper that rewrites host from x-forwarded-host)
exec node ./server.mjs
