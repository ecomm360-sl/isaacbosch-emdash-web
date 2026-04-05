#!/bin/sh
set -e

cd /app/templates/blog

# Initialize EmDash on first run (creates tables, runs migrations)
if [ ! -f /app/data/data.db ]; then
  echo "First run: initializing EmDash..."
  npx emdash init
  npx emdash seed
fi

# Start the server
exec node ./dist/server/entry.mjs
