#!/usr/bin/env node
import path from 'node:path';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const [, , ...args] = process.argv;

if (args.length === 0) {
  console.error('Usage: node scripts/next-with-wasm.mjs <command> [...args]');
  process.exit(1);
}

const nextBin = (() => {
  try {
    return require.resolve('next/dist/bin/next');
  } catch (error) {
    console.error('Unable to locate the Next.js CLI. Did you install dependencies?');
    console.error(error);
    process.exit(1);
  }
})();

const wasmDir = path.join(process.cwd(), 'node_modules', '@next', 'swc-wasm-nodejs');

if (!fs.existsSync(wasmDir)) {
  console.warn('The @next/swc-wasm-nodejs package was not found in node_modules. Falling back to default Next.js behavior.');
} else {
  process.env.NEXT_TEST_WASM_DIR = wasmDir;
}

const child = spawn(process.execPath, [nextBin, ...args], {
  cwd: process.cwd(),
  env: process.env,
  stdio: 'inherit'
});

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
  } else {
    process.exit(code ?? 0);
  }
});
