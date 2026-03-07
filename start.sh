#!/bin/bash
set -e

echo "--- NEXUS UNIVERSAL RUNNER v2 ---"

# Determine which service to run (defaults to backend if not specified)
# Set SERVICE_TYPE="frontend" in Railway for the frontend service.
SERVICE="${SERVICE_TYPE:-backend}"

# Determine which python command is available
if command -v python3 &>/dev/null; then
    PYTHON_CMD="python3"
elif command -v python &>/dev/null; then
    PYTHON_CMD="python"
else
    PYTHON_CMD="python3" # Guess for environments that populate path later
fi

# CASE 1: Run Backend
if [ "$SERVICE" = "backend" ]; then
    echo "🚀 Starting BACKEND..."
    # If we are at root, use server.py which handles pathing internally
    if [ -f "server.py" ]; then
        $PYTHON_CMD server.py
    elif [ -f "main.py" ]; then
        $PYTHON_CMD main.py
    else
        echo "❌ ERROR: No backend entry point found."
        exit 1
    fi

# CASE 2: Run Frontend
elif [ "$SERVICE" = "frontend" ]; then
    echo "🚀 Starting FRONTEND..."
    if [ -d "frontend" ]; then
        cd frontend
    fi
    if command -v npm &>/dev/null; then
        npm start
    else
        echo "❌ ERROR: npm not found for frontend."
        exit 1
    fi

else
    echo "❌ ERROR: Unknown SERVICE_TYPE: $SERVICE"
    exit 1
fi
