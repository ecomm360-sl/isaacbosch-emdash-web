#!/bin/sh
set -e

EMDASH_CLI="node /app/packages/core/dist/cli/index.mjs"

cd /app/templates/blog

# Initialize EmDash on first run (creates tables, runs migrations)
if [ ! -f /app/data/data.db ]; then
  echo "First run: initializing EmDash..."
  $EMDASH_CLI init
  $EMDASH_CLI seed
fi

# Start the server
exec node ./dist/server/entry.mjs
