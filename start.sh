#!/bin/bash

# Determine which python command is available
if command -v python3 &>/dev/null; then
    PYTHON_CMD="python3"
elif command -v python &>/dev/null; then
    PYTHON_CMD="python"
else
    echo "Error: Python not found in path."
    exit 1
fi

if [ -d "backend" ]; then
    echo "Detected Monorepo: Starting Backend..."
    cd backend
    $PYTHON_CMD -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
elif [ -f "main.py" ]; then
    echo "Starting Service from current directory..."
    $PYTHON_CMD -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
elif [ -d "frontend" ]; then
    echo "Detected Monorepo: Starting Frontend..."
    cd frontend
    npm start
else
    echo "Error: No entry point found."
    exit 1
fi
