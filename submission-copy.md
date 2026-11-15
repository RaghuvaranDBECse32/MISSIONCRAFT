# NASA Space Apps 2026 — Submission Copy (MagicBuzzers)

> Replace `https://YOUR-VERCEL-DOMAIN.vercel.app` with the real deployment URL after publishing. Do not submit the placeholder URL.

## Project name
MissionCraft: Launch Lab — Interactive Space Mission Design Game

## Project summary (50–200 words)
MissionCraft: Launch Lab is a beginner-friendly, browser-based space mission design game built for the Space Mission Design Game challenge. Players act as a mission director and configure an Earth-observation satellite by selecting its spacecraft bus, scientific payload, power system, communications and thermal control. The game recalculates budget, spacecraft mass, electrical power balance and communications capacity as choices change. Players must also select a launch vehicle with sufficient training payload capacity. A mission-readiness gate identifies failed constraints before a simplified launch sequence and mission report. The prototype includes a NASA POWER data connection that retrieves historical daily solar-radiation data for Chennai as environmental context for learning about solar energy; this is not live spacecraft telemetry. The project aims to make engineering trade-offs tangible for students and beginners through interactive experimentation.

## Project demonstration
https://YOUR-VERCEL-DOMAIN.vercel.app/demo.html

## Project website
https://YOUR-VERCEL-DOMAIN.vercel.app/

## Project details
MissionCraft: Launch Lab addresses the challenge by turning mission planning into a sequence of interactive decisions. In the first playable scenario, Earth Observer-01, players configure five spacecraft system categories and choose among training launch vehicles. The interface calculates total component cost, spacecraft mass, power generation and draw, and communication capacity. A readiness gate checks the project budget, selected launch vehicle capacity, power balance, communication requirement and system configuration. Launch is blocked until the checks pass. A simplified countdown then leads to a mission report. All component costs, capacities, resource thresholds and mission scoring are illustrative gameplay values and are not presented as real spacecraft specifications or engineering certification.

The website is implemented with HTML, CSS and JavaScript. Vercel Node.js Functions provide a backend endpoint. Mission configurations can be saved in the browser and, after configuring the Supabase database environment variables, synchronized to a Supabase Postgres table. A separate server-side function retrieves NASA POWER daily environmental data for a Chennai coordinate. The NASA parameter is `ALLSKY_SFC_SW_DWN`, daily all-sky surface shortwave downward radiation. It is used as historical solar-energy context for the educational simulation, not real-time satellite data.

The current MVP focuses on one mission so the full design-to-launch loop is demonstrable. Future work includes lunar and planetary missions, more detailed orbital constraints, collaborative team missions and 3D spacecraft visualization.

## NASA data / resources
- NASA POWER Daily API documentation — https://power.larc.nasa.gov/docs/services/api/temporal/daily/
- NASA POWER data portal — https://power.larc.nasa.gov/
- Example Chennai API request (daily solar radiation, 1–7 January 2024) — https://power.larc.nasa.gov/api/temporal/daily/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&longitude=80.2707&latitude=13.0827&start=20240101&end=20240107&format=JSON

## Space Agency Partner & other resources
- Vercel Functions documentation — https://vercel.com/docs/functions/runtimes/node-js
- Vercel Git deployment documentation — https://vercel.com/docs/git
- Supabase documentation — https://supabase.com/docs
- OpenAI / ChatGPT — https://openai.com/ (AI-assisted code scaffolding and project-text drafting; disclose in SI-use selection)

## Use of Super Intelligence (SI)
Select the form's option corresponding to generative AI / large language model / ChatGPT or OpenAI, if listed. State that ChatGPT assisted with code scaffolding and drafting written project content. Review and test all generated code and text before final submission. No AI-generated images are included in the slide deck.

## Important checks before submission
1. Replace both placeholder URLs with your actual public Vercel deployment URL.
2. Ensure the `/demo.html` link opens without login and contains exactly seven slides.
3. If cloud database is enabled, add `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel project environment variables.
4. Verify the NASA POWER data button after deployment; if unavailable, do not claim a successful live retrieval in your final project description.
5. The challenge form says the demo must be publicly accessible and no more than seven slides; the project must also have a publicly accessible URL.
6. The text you supplied says the Erode local-event deadline is Sunday, 15 November 2026 at 11:59 PM local time. Save progress and submit for judging before that exact cutoff; the website deployment and NASA form submission are separate actions.
