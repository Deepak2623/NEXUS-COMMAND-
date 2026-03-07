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
def find_frontend_dist():
    """Identify the exact location of the built frontend files."""
    paths = [
        os.path.join(os.path.dirname(__file__), "frontend/out"),
        os.path.join(os.path.dirname(__file__), "out"),
        "/app/frontend/out",
        "/app/out"
    ]
    for p in paths:
        if os.path.isdir(p) and os.path.isfile(os.path.join(p, "index.html")):
            print(f"📦 Found frontend dist at: {p}")
            return p
    return None

frontend_dist = find_frontend_dist()

@master_app.get("/{full_path:path}")
async def serve_frontend(full_path: str):
    # Skip if it's an API route 
    if full_path.startswith("api"):
        return None 

    if not frontend_dist:
        available = []
        try:
            available = os.listdir(os.path.dirname(__file__))
        except: pass
        return {
            "error": "Frontend build files not found.",
            "debug_root": os.path.dirname(__file__),
            "debug_files": available,
            "instruction": "Ensure 'npm run build' ran successfully and generated 'frontend/out/index.html'."
        }

    # Check if the requested file exists
    file_path = os.path.join(frontend_dist, full_path)
    if os.path.isfile(file_path):
        return FileResponse(file_path)
    
    # Fallback to index.html for CSR
    index_path = os.path.join(frontend_dist, "index.html")
    if os.path.isfile(index_path):
        return FileResponse(index_path)
    
    return {"error": f"Path '{full_path}' not found in frontend distribution."}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    print(f"🚀 Starting Nexus Command Center on port {port}...")
    uvicorn.run(master_app, host="0.0.0.0", port=port, log_level="info")
