#!/bin/bash
if [ -d "backend" ]; then
    echo "Starting Backend Service..."
    cd backend
    export PORT=${PORT:-8000}
    /usr/local/bin/python -m uvicorn main:app --host 0.0.0.0 --port $PORT
elif [ -d "frontend" ]; then
    echo "Starting Frontend Service..."
    cd frontend
    npm start
else
    echo "No project found."
    exit 1
fi
