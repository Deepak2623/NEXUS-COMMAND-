#!/bin/bash
set -e

echo "--- NEXUS UNIVERSAL GATEWAY ---"

# Determine which python command is available
if command -v python3 &>/dev/null; then
    PYTHON_CMD="python3"
elif command -v python &>/dev/null; then
    PYTHON_CMD="python"
else
    PYTHON_CMD="python3" 
fi

# Run the master server which handles both backend and frontend
echo "🚀 Starting Master Server..."
$PYTHON_CMD server.py
