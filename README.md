# SmogMission — JavaScript Edition

This is a JavaScript/Node.js conversion of the uploaded Flask project. No Python, Flask, pip, virtual environment, or Supabase keys are needed.

## Run on Windows

Install Node.js 22.13+ (Node 24 LTS recommended). In PowerShell:

```powershell
cd path\to\SmogMission_JS
node --version
npm start
```

Open http://127.0.0.1:5000/signup and create an account with a password of at least 12 characters. No email OTP is required. Sign in to access SmogGuide, MissionCraft, community, and support.

SQLite data lives in `data/smogmission.sqlite` and is not included in the ZIP. User passwords are salted and hashed with scrypt; login uses opaque HttpOnly SameSite cookies. Never commit the database or environment secrets.

## Optional Gemini AI

```powershell
$env:GEMINI_API_KEY=Read-Host "Gemini API key"
npm start
```

Without a key, SmogGuide uses rule-based guidance based on Open-Meteo. The NASA POWER endpoint also requires network access.

## Scope / limitations

- Preserves original HTML for dashboard, SmogGuide, MissionCraft, community, and support.
- Reimplements Flask endpoints in Node.js; browser-local mission saving remains available. Cloud mission storage is not implemented.
- Local SQLite community messages and per-user support tickets; **no Supabase migration**.
- Password recovery, email notifications, and production-grade anti-abuse protections are not implemented.
- Demo/local development build: do not deploy publicly without TLS, stronger rate limiting, session management, recovery, security review, and tests.
- Existing Python tests are not applicable; JavaScript smoke tests are provided.
