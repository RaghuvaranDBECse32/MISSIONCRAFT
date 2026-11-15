# MissionCraft: Launch Lab

Pre-Level 0 browser prototype for the NASA Space Apps Challenge 2026 — Space Mission Design Game. Team: MagicBuzzers.

## Included
- `index.html` — interactive Earth Observer-01 spacecraft builder, readiness gate, launch sequence and report.
- `demo.html` — exactly seven navigable browser-based project slides.
- `api/mission.js` — Node.js Vercel Function for saving/loading mission configurations to Supabase Postgres.
- `api/nasa-power.js` — Node.js Vercel Function proxy for NASA POWER daily solar-radiation data.
- `supabase-schema.sql` — database table definition.
- `submission-copy.md` — copy-ready NASA form text and resource links.

## Run locally
1. Install Node.js 20+ and Vercel CLI: `npm install -g vercel`
2. In this folder run: `vercel dev`
3. Open the local URL printed by Vercel. Do not open `index.html` directly if you want to test API routes. Browser LocalStorage saving still works without cloud credentials.

## Persistent storage
The app always writes the current spacecraft selection to browser LocalStorage. For cross-device cloud storage, create a Supabase project, run `supabase-schema.sql` in its SQL Editor, and add the following server-side environment variables in Vercel Project Settings → Environment Variables:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Never put the Supabase service-role key in frontend JavaScript or commit it to Git. Redeploy after adding the variables. The backend stores a JSONB snapshot keyed by a random browser session ID. This MVP has no user authentication; treat it as demo storage, not sensitive-data storage.

## NASA data connection
The `/api/nasa-power` function requests NASA POWER's daily `ALLSKY_SFC_SW_DWN` parameter. The default UI request is for Chennai (13.0827, 80.2707), 1–7 January 2024. Values are historical daily environmental solar-radiation estimates in kWh/m²/day. They provide educational context and are not real-time spacecraft telemetry. Documentation: https://power.larc.nasa.gov/docs/services/api/temporal/daily/

## Deploy to Vercel
1. Push this folder to a new GitHub repository (or use the Vercel CLI).
2. In Vercel, choose **Add New → Project**, import the GitHub repository, keep the project root as the repository root, and deploy. Vercel automatically serves the root HTML and deploys files under `/api` as server-side functions.
3. Configure Supabase environment variables if cloud storage is required, then redeploy.
4. Test the deployed site, `/demo.html`, `/api/nasa-power?...`, and save/restore.

## AI-use transparency
ChatGPT assisted with code scaffolding and drafting project text. The team should inspect, test and understand the submitted work. No AI-generated images are used in the included slide deck.

## Notes
All game component costs, masses, capacities, thresholds and scores are illustrative, not spacecraft specifications.
