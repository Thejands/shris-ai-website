# Contributing to shris-ai-website

The Shris AI website: marketing pages, product docs and the operations console for the Shris AI voice platform.

This repository follows the Thejands repository standard. The same rules apply in
`thejands-company-website`, `convosphere-2.0`, `yaazh-website` and `shris-ai-website`.

## Repository facts

| | |
| --- | --- |
| Product | Shris AI |
| Live | [shris.thejands.in](https://shris.thejands.in) |
| Hosting | Vercel (shris-ai). Production deploys from `main`. |
| Stack | Astro 5, vanilla CSS design tokens |
| Node | 22 (see `.nvmrc`) |
| Package manager | npm |

## Setup

```bash
npm ci
cp .env.example .env   # placeholders only; real values live in Vercel
```

## Branches

- `main` is production. Every merge to `main` deploys.
- Nobody pushes to `main` directly. Every change goes through a pull request.
- There are no `release`, version or personal long-lived branches.
- Cut a short-lived branch from `main` named `<type>/<short-description>`, lowercase
  kebab case: `feat/pricing-page`, `fix/mobile-overflow`, `docs/readme`.
  Types: `feat`, `fix`, `perf`, `refactor`, `docs`, `test`, `ci`, `chore`.
  Branches opened by AI tools keep their tool prefix (`claude/...`, `cursor/...`).
- Delete the branch once it merges.

## Commits

- Use [Conventional Commits](https://www.conventionalcommits.org/):
  `type(scope): summary`, imperative mood, no trailing period.
  Example: `fix(pricing): show yearly prices in the visitor's currency`.
- Commit as `Thejands <hello@thejands.in>` or with your own `@thejands.in` address.
  Vercel only builds commits whose author belongs to the Vercel team.
- Keep a `Co-Authored-By:` trailer on AI-assisted commits.

## Pull requests

- One topic per pull request. Fill in the template.
- Run the checks before you ask for review:
  - `npm run build`
- Merge with a merge commit, then delete the branch.

## Code and content

- Formatting follows `.editorconfig`: UTF-8, LF, 2-space indent, final newline.
- Every page in the sitemap must have exactly one `h1` and no horizontal overflow at 360px.
- Headlines and buttons use sentence case. No invented customers, logos,
  testimonials, metrics or certifications.

## Secrets

- Never commit `.env` files, keys or service-account JSON. Only `.env.example`
  with placeholder values is tracked.
- If a secret is committed, rotate it first, then remove it from the repo.

## Security

See [SECURITY.md](./SECURITY.md).
