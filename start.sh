#!/bin/bash

# Nexus Command Center - Start Script
# Version: 4.5.3 (Ultra Edition)
# Date: 2026-03-05

# Colors for output
BLUE='\033[0;34m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Initializing Nexus Command Center...${NC}"

# Get the script's directory
PROJECT_ROOT=$(pwd)
BACKEND_DIR="$PROJECT_ROOT/backend"
FRONTEND_DIR="$PROJECT_ROOT/frontend"

# ── Port Guard & Lock Buster ────────────────────────────────────────────────
echo -e "${CYAN}🧹 Cleaning up ghost processes and locks...${NC}"

# Kill processes on ports 8000 and 3000 if they exist
for port in 8000 3000; do
    PID=$(lsof -ti :$port)
    if [ ! -z "$PID" ]; then
        echo -e "${RED}⚠️  Port $port is in use by PID $PID. Clearing...${NC}"
        kill -9 $PID 2>/dev/null
    fi
done

# Clear Next.js dev lock
if [ -d "$FRONTEND_DIR/.next" ]; then
    rm -rf "$FRONTEND_DIR/.next"
    echo -e "${GREEN}✅ Cleaned .next lock directory${NC}"
fi

# Function to kill background processes on exit
cleanup() {
    echo -e "\n${RED}🛑 Shutting down Nexus...${NC}"
    kill $BACKEND_PID $FRONTEND_PID $SLACK_PID 2>/dev/null
    exit
}

trap cleanup SIGINT SIGTERM

# 1. Start Backend
echo -e "${CYAN}📦 Starting Backend (FastAPI + LangGraph)...${NC}"
cd "$BACKEND_DIR" || exit
if [ ! -d ".venv" ]; then
    echo -e "${RED}⚠️  No virtual environment found. Installing dependencies...${NC}"
    uv venv && uv sync
fi

# Run backend in background with High-Speed Dev Mode
NEXUS_MODE=dev uv run python main.py &
BACKEND_PID=$!

# 1b. Start Slack Listener (Two-way communication)
if grep -q "xapp-" .env; then
    echo -e "${CYAN}📡 Starting Slack Listener (Socket Mode)...${NC}"
    uv run python scripts/slack_listener.py &
    SLACK_PID=$!
else
    echo -e "${RED}ℹ️  Slack Socket Mode disabled (No xapp- token found)${NC}"
fi

# 2. Wait for backend to be ready
echo -e "${CYAN}⏳ Waiting for Backend to initialize...${NC}"
until curl -s http://localhost:8000/health > /dev/null; do
  sleep 1
done
echo -e "${GREEN}✅ Backend is LIVE on port 8000${NC}"

# 3. Start Frontend
echo -e "${CYAN}🛰️  Starting Frontend (Next.js 16)...${NC}"
cd "$FRONTEND_DIR" || exit
if [ ! -d "node_modules" ]; then
    echo -e "${RED}⚠️  node_modules missing. Running npm install...${NC}"
    npm install
fi

# Clear cache to fix resolution issues
rm -rf .next

# Run frontend in background with explicit project root
npm run dev -- --port 3000 &
FRONTEND_PID=$!

echo -e "${GREEN}✅ Frontend is LIVE on http://localhost:3000${NC}"
echo -e "${BLUE}──────────────────────────────────────────────────${NC}"
echo -e "${GREEN}🚀 NEXUS COMMAND CENTER IS NOW OPERATIONAL${NC}"
echo -e "Backend: http://localhost:8000 (PID: $BACKEND_PID)"
echo -e "Frontend: http://localhost:3000 (PID: $FRONTEND_PID)"
echo -e "${BLUE}──────────────────────────────────────────────────${NC}"
echo -e "${CYAN}Press Ctrl+C to stop all services.${NC}"

# Keep script running
wait
