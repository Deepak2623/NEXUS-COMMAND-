#!/bin/bash
if [ -d "backend" ]; then
    echo "Detected Monorepo: Starting Backend..."
    cd backend
    python -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
elif [ -f "main.py" ]; then
    echo "Starting Service from current directory..."
    python -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
elif [ -d "frontend" ]; then
    echo "Detected Monorepo: Starting Frontend..."
    cd frontend
    npm start
else
    echo "Error: No entry point found."
    exit 1
fi
