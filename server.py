import os
import sys
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from contextlib import asynccontextmanager

# ─── PATH & IMPORT BOOTSTRAP ──────────────────────────────────────────────────
ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(ROOT_DIR, "backend")

# Ensure Python can find both 'backend' and 'app' modules
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

# Import the FastAPI app from backend/main.py
try:
    print(f"📦 Bootstrapping Nexus Backend from {BACKEND_DIR}...")
    import main as nexus_main
    nexus_app = nexus_main.app
    print("✅ Backend imported successfully.")
except Exception as e:
    print(f"❌ CRITICAL ERROR during backend bootstrap: {e}")
    nexus_app = FastAPI()
    @nexus_app.get("/health")
    def health_crash(): return {"status": "crash", "error": str(e)}

# ─── MASTER GATEWAY ───────────────────────────────────────────────────────────

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Nexus Universal Gateway — Starting...")
    yield
    print("🛑 Nexus Universal Gateway — Shutting down.")

master_app = FastAPI(title="Nexus Gateway", lifespan=lifespan)

# 1. Mount Backend at /api
master_app.mount("/api", nexus_app)

# 2. Serve Frontend Static Files
FRONTEND_OUT = os.path.join(ROOT_DIR, "frontend", "out")

# 3. SPA Fallback Handler
# This catches all 404s (non-existent API routes OR deep frontend routes)
@master_app.exception_handler(404)
async def spa_fallback(request: Request, exc):
    # A. If it's an API route, return a proper JSON 404
    if request.url.path.startswith("/api"):
        return JSONResponse(
            status_code=404,
            content={"error": "API Route not found", "path": request.url.path}
        )
    
    # B. Serve existing static files (css, js, images)
    # request.url.path might be "/static/main.js"
    # We strip the leading slash
    relative_path = request.url.path.lstrip("/")
    target_file = os.path.join(FRONTEND_OUT, relative_path)
    
    if os.path.isfile(target_file):
        return FileResponse(target_file)
        
    # C. Fallback to index.html for CSR (Client Side Routing)
    index_html = os.path.join(FRONTEND_OUT, "index.html")
    if os.path.isfile(index_html):
        return FileResponse(index_html)
    
    # D. Ultimate fallback if distribution is missing
    return JSONResponse(
        status_code=503,
        content={"error": "Nexus frontend distribution not found. Please deploy with build artifacts."}
    )

# Optional: Add a health check at the gateway level too
@master_app.get("/health")
def gateway_health():
    return {"status": "ok", "service": "gateway"}

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    print(f"📡 Gateway listening on 0.0.0.0:{port}...")
    uvicorn.run(master_app, host="0.0.0.0", port=port, log_level="info")
