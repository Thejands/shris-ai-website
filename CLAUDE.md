# Shris AI website: rules for AI assistants

This is the Shris AI website at https://shris.thejands.in: marketing pages,
product docs (`/docs/*`) and the operations console (`/app`) for the Shris AI
voice platform, a Thejands product.

Follow [CONTRIBUTING.md](./CONTRIBUTING.md) for branches, commits and pull
requests. It is the same standard used in every Thejands repository.

## Hard rules

- Every page in the sitemap has exactly one `h1` and no horizontal overflow at
  360px. Grid children need `min-width: 0`; use `minmax(0, 1fr)` columns.
- Colors, spacing and type come from `src/styles/tokens.css` and
  `src/styles/global.css`.
- The company is written "Thejands", linking to https://thejands.in.
- Website URLs use `https://shris.thejands.in`. API and SDK hostnames in the
  docs (for example `api.shris.ai`) are product endpoints; leave them alone.
- No invented customers, logos, testimonials, metrics or certifications.

## Architecture notes

- Astro 5 with the Vercel adapter. `scripts/add-traffic-middleware.mjs` runs
  after `astro build` and registers an edge function that records page and
  crawler hits to Supabase `traffic_hits`. It does nothing without
  `TRAFFIC_SUPABASE_URL` and `TRAFFIC_SUPABASE_KEY`.
- The Dockerfile and `nginx.conf` serve the static build only; `/api/leads`
  needs the Vercel deployment.

## Before you push

```bash
npm run build
```

Then check the sitemap pages at 360px for overflow and a single `h1`.
