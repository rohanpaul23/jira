#!/bin/bash

set -e

cd "$(dirname "$0")"

# Find an available port starting at 5000
PORT=5000
while lsof -i :"$PORT" &>/dev/null; do
  PORT=$((PORT+1))
done

# Write the chosen port to .env if it exists
if [ -f .env ]; then
  grep -v '^PORT=' .env > .env.tmp
  echo "PORT=$PORT" >> .env.tmp
  mv .env.tmp .env
else
  echo "PORT=$PORT" > .env
fi

echo "✅ Using PORT=$PORT"

echo "📦 Starting MongoDB (if not already running)..."
docker run -d --rm --name mongo-dev -p 27017:27017 mongo || true

echo "⏳ Waiting for MongoDB to be ready..."
sleep 5

echo "🚀 Starting backend server on port $PORT"
export $(grep -v '^#' .env | xargs) 2>/dev/null
npm install
npm run dev
