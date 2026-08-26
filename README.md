# Shris AI Website

Astro marketing site, docs, and operations console for the Shris AI voice workforce platform (Thejands LLP). Visual/IA reference: https://shris-ai.vercel.app/

## Run

```bash
npm install
npm run dev
```

Dev server: `http://localhost:4321` (`--host` enabled).

Optional: copy `.env.example` and point `PUBLIC_VOICE_API_ENDPOINT` at the runtime (`http://127.0.0.1:8787/v1`). Start `../Shris-ai-app`, then open `/app`. Admin: `dev@shris.ai` / `shris-dev-local`. Second tenant: `acme@shris.ai`. Operator and viewer accounts are in the runtime `.env.example`. Viewers cannot dispatch. Admins see a user list/create panel.

Full stack with health probes: from the parent `Shris AI` folder, `docker compose up --build` (web :4321, api :8787, postgres). Leave `DATABASE_URL` empty for local JSON when not using compose.

## Routes

| Path | Role |
| --- | --- |
| `/` `/platform` `/solutions` `/pricing` `/developers` `/company` `/contact` `/resources` | Marketing (synced with live) |
| `/docs/*` | Product + compliance documentation |
| `/app` | Operations console |
| `/privacy` `/terms` `/security` `/compliance` | Legal & TRAI/DPDP |
