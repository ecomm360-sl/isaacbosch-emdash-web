#!/bin/sh
set -e

EMDASH_CLI="node /app/packages/core/dist/cli/index.mjs"

cd /app/demos/isaacbosch

# Resolve the SQLite file path from EMDASH_DB_URL (strip "file:" / "file://").
DB_PATH=$(printf '%s' "${EMDASH_DB_URL:-file:/data/data.db}" | sed -e 's#^file://##' -e 's#^file:##')
DB_DIR=$(dirname "$DB_PATH")
mkdir -p "$DB_DIR"

# Initialize EmDash on first run (creates tables, runs migrations, seeds content)
if [ ! -f "$DB_PATH" ]; then
  echo "First run: initializing EmDash at $DB_PATH ..."
  $EMDASH_CLI init
  $EMDASH_CLI seed
else
  echo "Existing DB at $DB_PATH — running migrations only ..."
  $EMDASH_CLI init || true
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

# Start the server
exec node ./dist/server/entry.mjs
