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

if __name__ == "__main__":
    import uvicorn
    # Use the process's PORT environment variable or default to 8000
    port = int(os.getenv("PORT", 8000))
    print(f"🚀 Starting Nexus Command Center on port {port}...")
    # Pass the app object directly to uvicorn.run for stability
    uvicorn.run(nexus_app, host="0.0.0.0", port=port, log_level="info")
