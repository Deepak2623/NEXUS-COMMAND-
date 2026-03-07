import os
import sys

# Add the backend directory to sys.path so 'app' and 'main' can be found
backend_path = os.path.join(os.path.dirname(__file__), "backend")
sys.path.append(backend_path)

# Import the FastAPI app from backend/main.py
try:
    from main import app
except ImportError:
    # Fallback for different directory structures
    sys.path.append(os.path.join(backend_path, "app"))
    from main import app

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
