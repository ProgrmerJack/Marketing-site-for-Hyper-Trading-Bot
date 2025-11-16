#!/usr/bin/env node
// Check that core assets are served with correct content types and 200 status.
// Usage: node scripts/check-assets.mjs --url=http://localhost:3000

import { setTimeout as delay } from 'node:timers/promises';
import url from 'node:url';

const args = process.argv.slice(2);
const params = Object.fromEntries(args.map((arg) => {
  const [k, v] = arg.split('=');
  return [k, v === undefined ? 'true' : v];
}));
const base = params['--url'] || process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000';
const outdir = params['--outdir'] || process.env.CHECK_ASSETS_OUTDIR || 'tmp/assets-diagnostics';
const verbose = params['--verbose'] === 'true' || false;

const assets = [
  { path: '/_next/static/css/app/layout.css', expect: /^text\/css/ },
  { path: '/_next/static/chunks/main-app.js', expect: /^application\/(javascript|x-javascript)/ },
];

async function checkAsset(fullUrl, expectedRegex) {
  try {
    const resp = await fetch(fullUrl, { method: 'HEAD' });
    if (!resp.ok) {
      return { ok: false, status: resp.status, statusText: resp.statusText, headers: Object.fromEntries(resp.headers.entries()) };
    }
    const ct = resp.headers.get('content-type') || '';
    const matches = expectedRegex.test(ct);
    return { ok: matches, contentType: ct, headers: Object.fromEntries(resp.headers.entries()) };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

async function main() {
  // Create outdir if requested so diagnostics can be written
  try {
    await import('node:fs/promises').then((fs) => fs.mkdir(outdir, { recursive: true }));
  } catch (e) {
    // ignore
  }
  for (const asset of assets) {
    const fullUrl = new url.URL(asset.path, base).toString();
    let tries = 0;
    let result = null;
    while (tries < 10) {
      result = await checkAsset(fullUrl, asset.expect);
      if (result.ok) break;
      tries++;
      await delay(1000);
    }
    if (!result || !result.ok) {
      console.error(Asset check failed: );
      console.error(result);
      if (verbose) {
        console.error('Attempting to curl (GET) details for diagnostics...');
      }
      // Try to capture more details: fetch full body and write to file
      try {
        const resp = await fetch(fullUrl, { method: 'GET' });
        const headers = Object.fromEntries(resp.headers.entries());
        const body = await resp.text().catch(() => '<binary-or-empty>');
        const record = {
          url: fullUrl,
          status: resp.status,
          statusText: resp.statusText,
          headers,
          bodyPreview: body.slice(0, 4096),
          timestamp: new Date().toISOString(),
        };
        if (verbose) console.error(JSON.stringify(record, null, 2));
        try {
          const fname = ${outdir.replace(/\/$/, '')}/-.json;
          await import('node:fs/promises').then((fs) => fs.writeFile(fname, JSON.stringify(record, null, 2)));
          console.error(Wrote diagnostic to );
        } catch (e) {
          // ignore file write errors
        }
      } catch (e) {
        if (verbose) console.error('Failed to GET asset for diagnostics: ', String(e));
      }
      process.exitCode = 1;
      return;
    }
    console.log(OK:  content-type );
  }
  process.exitCode = 0;
}

main();