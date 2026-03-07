#!/bin/bash
set -e

echo "--- NEXUS STARTUP ---"

# Add backend to python path
export PYTHONPATH=$PYTHONPATH:$(pwd)/backend

if [ -d "backend" ] && [ -f "backend/main.py" ]; then
    echo "🚀 Starting Backend Service..."
    python3 -m uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000}
elif [ -d "frontend" ] && [ -f "frontend/package.json" ]; then
    echo "🚀 Starting Frontend Service..."
    cd frontend
    npm start
else
    echo "❌ ERROR: No service detected to start."
    exit 1
fi
