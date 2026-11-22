# SmogMission — SmogGuide + MissionCraft

**PromptWars · Challenge 6 | Combined JavaScript edition**

SmogMission brings together two experiences behind one local account:

1. **SmogGuide** — an air-quality explorer with city search, current modeled pollution and hourly forecasts, practical guidance, and optional Gemini-generated recommendations.
2. **MissionCraft** — an Earth-observation mission simulation with an interactive mission designer, a demo experience, and a NASA POWER solar-radiation data endpoint.

The combined app also includes **community channels** and **support tickets**. The backend uses **Node.js** and **SQLite**; **Python, Flask, Supabase, and email OTP are not needed** for this edition.

> **Status:** Development/hackathon demonstration. The included smoke test checks only a few local routes. External API calls, complete browser journeys, and production security have not been verified.

## Requirements and quick start

- **Node.js 22.13+** (Node.js 24 LTS recommended); npm comes with Node.js.
- Internet connection for live Open-Meteo and NASA POWER data, and Gemini when enabled.
- No `npm install` is required: the server uses Node.js built-in modules.

Open PowerShell in the extracted `SmogMission_JS` folder:

```powershell
node --version
npm start
```

Then visit **http://127.0.0.1:5000/signup**, create an account with an email and a **12–128-character password**, and sign in. Registration is local; no verification email is sent.

To run the automated smoke test:

```powershell
npm test
```

To use another port:

```powershell
$env:PORT="5050"
npm start
```

## Both projects in one application

| Experience | Browser route | Main functionality | Data/service |
| --- | --- | --- | --- |
| Combined dashboard | `/` | Navigate between experiences | Local HTML |
| **SmogGuide** | `/smogguide` | City air-quality insights, hourly trends, practical guidance | Open-Meteo; optional Gemini |
| **MissionCraft** | `/missioncraft` | Interactive Earth-observation mission designer | Browser-local mission data |
| MissionCraft demo | `/missioncraft/demo` | Game demonstration | Browser HTML/JavaScript |
| Community | `/community` | `general`, `air-quality`, `space-missions`, `help` channels | SQLite |
| Support | `/support` | Create and review your own tickets | SQLite |

**SmogGuide API:** `POST /api/advice` accepts a JSON city, language and optional household profile. It uses Open-Meteo modeled air-quality and weather data. When `GEMINI_API_KEY` is absent or Gemini fails, it returns rule-based guidance.

**MissionCraft API:** `GET /api/nasa-power` queries NASA POWER daily solar-radiation data. The game files are in `missioncraft/`. `GET/POST /api/mission` currently return HTTP 503 because cloud mission storage is **not implemented**; use the browser-local saving provided by the game where available.

See [SmogGuide details](templates/SMOGGUIDE_README.md) and [MissionCraft details](missioncraft/README.md).

## Optional Gemini AI for SmogGuide

Set the key only in the terminal session running the server:

```powershell
$env:GEMINI_API_KEY=Read-Host "Enter Gemini API key"
npm start
```

You may optionally set `GEMINI_MODEL` (default `gemini-2.5-flash`). **Do not paste keys into JavaScript/HTML or commit them to Git.** Without a key, SmogGuide still provides rule-based results when Open-Meteo is available.

## Application structure

```text
SmogMission_JS/
├── server.js                  # Node.js HTTP server, authentication and APIs
├── package.json               # npm start / npm test
├── README.md                  # This combined guide
├── templates/
│   ├── index.html             # Dashboard
│   ├── smogguide.html         # SmogGuide UI
│   ├── SMOGGUIDE_README.md    # SmogGuide-specific guide
│   ├── community.html         # Community UI
│   └── support.html           # Support UI
├── missioncraft/
│   ├── index.html             # MissionCraft game
│   ├── demo.html              # MissionCraft demo
│   └── README.md              # MissionCraft-specific guide
├── tests/
│   └── smoke.test.js          # Basic route checks
└── data/                      # SQLite database generated at runtime; excluded from ZIP
```

## Accounts, storage, and privacy

- Signup/login use local SQLite users, **scrypt** password hashes, opaque server-side sessions, and HttpOnly cookies.
- Community messages are stored in SQLite and visible in their respective channels to signed-in users.
- Support tickets are stored in SQLite and listed for the signed-in user only.
- The database is created automatically at `data/smogmission.sqlite`. Do not commit it or share it with the project ZIP.
- This edition does **not** migrate existing Supabase accounts, messages, or tickets.
- There is no email OTP, password-reset email flow, or pre-created demo account in this package.

## Limitations and deployment notes

This is a local development edition, **not a production-hardened authentication service**. Before publishing publicly, implement and verify HTTPS/reverse-proxy settings, secure cookies, robust CSRF protections, persistent rate limiting, session expiration/revocation, password recovery, content security policy, abuse controls, monitoring, and database backups. Check the handling of untrusted model output and external API failures. Avoid presenting modeled AQI as a nearby physical sensor measurement or medical advice.

For testing, open `/health` to check whether the server is running. If port 5000 is already in use, stop the previous Flask/Node server or change `PORT`. For local development, run only one SmogMission server on a given port.

## Attribution and challenge scope

- **SmogGuide:** Open-Meteo modeled air-quality/weather data; optional Google Gemini-generated advice.
- **MissionCraft:** NASA POWER data integration and Earth-observation mission simulation.
- The combined application is a hackathon project; live service availability, API usage rules, and competition submission requirements should be checked independently.
