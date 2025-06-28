#!/bin/bash

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"

# Ensure MongoDB isn't running with old config
if docker ps -a --format '{{.Names}}' | grep -Eq '^mongo-dev$'; then
  echo "🔄 Stopping existing MongoDB container..."
  docker stop mongo-dev >/dev/null
  docker rm mongo-dev >/dev/null
fi

# Start MongoDB with persistent volume
echo "📦 Starting MongoDB with persistent volume..."
docker volume create mongo-data >/dev/null
docker run -d --name mongo-dev -p 27017:27017 -v mongo-data:/data/db mongo

echo "⏳ Waiting for MongoDB to be ready..."
sleep 5

# Start backend
echo "🚀 Starting backend with dynamic port..."
(cd "$PROJECT_ROOT/server" && ./start-backend-dev.sh) &

# Start frontend
echo "🚀 Starting frontend..."
(cd "$PROJECT_ROOT/client" && npm install && npm run dev) &

# Wait for both processes
wait
