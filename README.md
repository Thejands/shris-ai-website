# Shris AI website

Marketing pages, product docs and the operations console for the Shris AI voice platform. A Thejands product.

| | |
| --- | --- |
| Live | [shris.thejands.in](https://shris.thejands.in) |
| Hosting | Vercel (shris-ai). Production deploys from `main`. |
| Stack | Astro 5, CSS design tokens |
| Node / package manager | 22 (`.nvmrc`) / npm |
| Contributing | [CONTRIBUTING.md](./CONTRIBUTING.md) · [SECURITY.md](./SECURITY.md) |

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
