#!/bin/bash
set -e

echo "--- NEXUS STARTUP SEQUENCE ---"

# Determine which python command is available
if command -v python3 &>/dev/null; then
    PYTHON_CMD="python3"
elif command -v python &>/dev/null; then
    PYTHON_CMD="python"
else
    echo "❌ ERROR: Python not found in path."
    exit 1
fi

echo "Using: $PYTHON_CMD"
echo "Port: ${PORT:-8000}"

# Add current directory to python path
export PYTHONPATH=$PYTHONPATH:.

if [ -d "backend" ]; then
    echo "📦 Detected Monorepo: Entering backend directory..."
    cd backend
    export PYTHONPATH=$PYTHONPATH:.
    echo "🚀 Launching Uvicorn..."
    $PYTHON_CMD -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000} --log-level info
elif [ -f "main.py" ]; then
    echo "🚀 Starting Service from current directory..."
    $PYTHON_CMD -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000} --log-level info
elif [ -d "frontend" ]; then
    echo "📦 Detected Monorepo: Starting Frontend..."
    cd frontend
    npm start
else
    echo "❌ ERROR: No entry point found (backend/main.py or main.py)."
    exit 1
fi
