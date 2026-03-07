# Nexus Command Center Deployment Guide

This repository contains both the **Frontend** and **Backend** for the Nexus Command Center.

## GitHub Repository

The code is available at: `https://github.com/Deepak2623/NEXUS-COMMAND-.git`

## Railway Deployment (Mono-repo)

To deploy both services on Railway, follow these steps:

### 1. Connect Repository

- Go to [Railway](https://railway.app/) and create a new project.
- Select **Deploy from GitHub repo** and choose `NEXUS-COMMAND-`.

### 2. Setup Backend Service

- In your Railway project, click **New** -> **GitHub Repo** -> `NEXUS-COMMAND-`.
- Go to the **Settings** tab of this new service.
- Set **Root Directory** to `/backend`.
- Set **Custom Build Command** to `pip install .` or let Nixpacks handle it.
- Set **Start Command** to `python main.py` or `uvicorn main:app --host 0.0.0.0 --port $PORT`.
- Add all environment variables from your `backend/.env` to the **Variables** tab.

### 3. Setup Frontend Service

- Click **New** -> **GitHub Repo** -> `NEXUS-COMMAND-` again (creating a second service from the same repo).
- Go to the **Settings** tab.
- Set **Root Directory** to `/frontend`.
- Railway will automatically detect Next.js.
- Add environment variables:
  - `NEXT_PUBLIC_API_URL`: The URL of your Railway Backend service.
  - `NEXT_PUBLIC_LANGFUSE_PROJECT_ID`: (If used)
  - `NEXT_PUBLIC_LANGFUSE_PUBLIC_KEY`: (If used)

## Mobile & Display Optimization

The interface has been fully optimized for all display sizes:

- **Responsive Mesh Grid**: Adapts from 1 to 4 columns based on screen width.
- **Adaptive Governance Table**: Hides non-critical columns on mobile while maintaining full desktop detail.
- **Fluid Layout**: Uses Tailwind CSS and glassmorphism for a premium feel on any device.
- **Scrollable Tabs**: Dashboard panels now support horizontal scroll for navigation on small touch screens.

## Local Development

- **Frontend**: `cd frontend && npm install && npm run dev`
- **Backend**: `cd backend && pip install -r requirements.txt && python main.py`
