# WA Policy Graph - Frontend Beta Handoff

This directory contains the Next.js frontend prototype (the "Ask Penner" UI) for the WA Policy Graph system. It has been successfully wired to hit the local Python backend and mimics the intended zero-hallucination behavior.

## Current State & Tech Stack
- **Framework:** Next.js 14.2 (App Router)
- **Styling:** Tailwind CSS + pure CSS grid canvas (`globals.css`). Note that `Geist` and `Inter` fonts are injected natively in `globals.css` to match the exact weights of the mockup.
- **Backend Coupling:** The app is currently hardcoded to make a `POST` request to `/api/v1/oracle/synthesize` on `localhost:8002` (the FastAPI scraper backend) when a user submits a query.

## What's Working
1. **The Bloom Architecture:** Pressing "Enter" in the main search bar opens the full-screen modal (`#bloom-overlay`) without a page reload.
2. **Dynamic Canvas:** The `topo-canvas` runs a lightweight 2D context render loop on `requestAnimationFrame` mimicking topographical map lines.
3. **Live Extraction:** The `activeItem` state array maps the structured JSON response (narrative, citations, suggested actions) directly into the UI.
4. **Auth Stub:** The "Assign Penner to Monitor This" button opens a static form modal.

## What the Beta Team Needs to Do

### 1. Fix the API Proxy (CORS/Routing)
The frontend is trying to hit `/api/v1/oracle/synthesize`. For this to work in production/beta, you must configure `next.config.mjs` with rewrites, or point the `fetch()` call in `src/app/page.tsx` directly to the deployed Python backend URL.

### 2. Implement Real Authentication
The current "Assign Penner" modal just closes on submit. The team needs to wire this form up to a real Auth provider (e.g., Supabase, Auth0, or NextAuth) and send the active jurisdiction context + email back to the database to actually register a monitoring mission.

### 3. Server-Sent Events (Streaming)
Right now, the UI sits in a "Thinking..." state until the entire LLM narrative finishes generating in Python, which takes 5-10 seconds. The team needs to upgrade the `fetch()` call in `src/app/page.tsx` to handle a readable stream so the text generates linearly like ChatGPT.

### 4. Production Build & Deployment
Run `npm run build` to generate the optimized static pages. The `.next` folder can then be deployed to Vercel, AWS Amplify, or a standalone Docker container. 

## Local Development
To spin up this exact environment to verify the layout:
1. `npm install`
2. `npm run dev -- -p 3001`
3. Make sure the Python backend is running on port `8002`.
