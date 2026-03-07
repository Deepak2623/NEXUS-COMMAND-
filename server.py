import os
import sys

# Add the current directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import the FastAPI app from backend/main.py explicitly
try:
    print("Trying to import 'app' from 'backend.main'...")
    from backend.main import app as nexus_app
    print("Successfully imported 'app' from 'backend.main'.")
except ImportError as e:
    print(f"Failed to import 'backend.main': {e}")
    # Fallback to appending backend path
    backend_path = os.path.join(os.path.dirname(__file__), "backend")
    sys.path.append(backend_path)
    print(f"Added {backend_path} to sys.path, trying to import 'main'...")
    import main as nexus_main
    nexus_app = nexus_main.app
    print("Successfully imported 'app' from 'main'.")

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# Create the master wrapper app
master_app = FastAPI(title="Nexus Universal Gateway")

# 1. Mount the backend at /api
master_app.mount("/api", nexus_app)

# 2. Serve built frontend files at /
# (Fallback: serve index.html for all non-API the SPA/Next.js router)
# 2. Serve built frontend files at /
# (Fallback: serve index.html for all non-API routes)
FRONTEND_PATH = os.path.join(os.path.dirname(__file__), "frontend", "out")

# Ensure the folder exists to avoid FastAPI mount error
if not os.path.isdir(FRONTEND_PATH):
    print(f"⚠️ WARNING: Frontend build folder not found at: {FRONTEND_PATH}")
    # Creating a dummy path for development if necessary, or just log
else:
    print(f"📦 Serving frontend from: {FRONTEND_PATH}")

@master_app.get("/{full_path:path}")
async def serve_spa_frontend(full_path: str):
    # Skip if it is an API route (unlikely to reach here if /api is mounted above)
    if full_path.startswith("api"):
        return None
        
    # Determine the file location
    file_path = os.path.join(FRONTEND_PATH, full_path)
    
    # If the file exists (like .js or .css), serve it
    if os.path.isfile(file_path):
        return FileResponse(file_path)
        
    # Otherwise, fallback to index.html for React/Next.js client-side routing
    index_path = os.path.join(FRONTEND_PATH, "index.html")
    if os.path.isfile(index_path):
        return FileResponse(index_path)
    
    # Last resort fallback if build is completely missing
    return {"error": "Frontend build files missing. Run 'npm run build' first."}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    print(f"🚀 Starting Nexus Command Center on port {port}...")
    uvicorn.run(master_app, host="0.0.0.0", port=port, log_level="info")
