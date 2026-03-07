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

echo "Starting Backend API..."
$PYTHON_CMD -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
