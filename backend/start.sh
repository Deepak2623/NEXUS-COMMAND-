#!/bin/bash
echo "Starting Backend API..."
python -m uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
