# Deploying Deceit

Deceit is a fully client-side party game — no database, no accounts — so it can
be hosted almost anywhere.

## Base path

The build's base path is controlled by one environment variable:

| Host | `VITE_BASE_PATH` |
| --- | --- |
| Vercel / Netlify (root domain) | `/` |
| GitHub Pages project site | `/<repo-name>/` |
| GitHub Pages user site (`<name>.github.io`) | `/` |

## Vercel

1. Push this repo to GitHub and import it in Vercel.
2. `vercel.json` already sets the build command and `VITE_BASE_PATH=/`.
3. Deploy — no other settings needed.

## Netlify

1. Import the repo in Netlify.
2. `netlify.toml` already sets the build command, publish directory, base path,
   and the SPA fallback (`public/_redirects` is included as well).
3. Deploy.

## GitHub Pages

1. Push the repo to GitHub.
2. In **Settings → Pages**, set the source to **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds a static copy on every
   push to `main` and publishes it. It derives the base path from the repo name
   automatically.

## Manual / any static host

```bash
VITE_BASE_PATH=/ bun install && bun run build
```

Upload the contents of `.output/public` to your host and add a catch-all
rewrite to `index.html` so deep links like `/play` work on refresh.
