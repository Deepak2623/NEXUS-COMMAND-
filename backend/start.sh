#!/bin/bash
set -e

echo "--- NEXUS BACKEND STARTUP ---"

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

export PYTHONPATH=$PYTHONPATH:.

echo "🚀 Launching Uvicorn from $(pwd)..."
$PYTHON_CMD -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000} --log-level info
