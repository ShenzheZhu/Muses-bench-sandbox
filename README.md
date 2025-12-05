# Muses-bench Web Sandbox

## Prerequisities

1.  **MongoDB Atlas URI**: You need a connection string to a MongoDB cluster.
2.  **Google Cloud Client ID**: enabled for OAuth 2.0 Web Client.

## Setup

### 1. Backend

1.  Navigate to `web_sandbox/backend`.
2.  Copy `.env.example` to `.env`:
    ```bash
    cp .env.example .env
    ```
3.  Edit `.env` and fill in `MONGODB_URI` and `GOOGLE_CLIENT_ID`.
4.  Run the server:
    ```bash
    uv run main.py
    ```
    Server runs on `http://localhost:8000`.

### 2. Frontend

1.  Navigate to `web_sandbox/frontend`.
2.  Create `.env.local` (or edit `src/main.tsx` directly if preferred):
    ```
    VITE_GOOGLE_CLIENT_ID=your-google-client-id
    ```
3.  Run the dev server:
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173`.

## Features

-   **Login**: Google Sign-In.
-   **Dashboard**: View available scenarios.
-   **Architecture**: FastAPI + MongoDB (Backend), React + Tailwind (Frontend).
