# Marketing-site-for-Hyper-Trading-Bot

## Dev and Test Notes

Use `npm run dev` to run the site locally on port 3000. If you want to start the dev server and verify that critical assets are being served with the correct Content-Type before running Playwright or manual tests, run:

```pwsh
npm run dev:check
```
If you need more verbose diagnostics (writes header & body previews to `tmp/`), run the debug wrapper which creates helpful artifacts:

```bash
npm run dev:check:debug
```

To check assets for a deployed URL (e.g., CDN or production site), run the helper script and pass `--url`:

```bash
node scripts/check-assets.mjs --url=https://example.com
```

This command picks a free port (3000–3010), starts the dev server, and runs a quick check to confirm CSS and JS assets are returned with proper content-type headers.

The Playwright config (`playwright.config.ts`) is updated to use a wrapper that starts the dev server on a free port and validates assets before launching tests.
