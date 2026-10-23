import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const astro = path.join(repo, 'node_modules/astro/bin/astro.mjs');
const studio = path.join(repo, 'scripts/journal-studio.mjs');
const children = new Set();
const env = { ...process.env, ASTRO_TELEMETRY_DISABLED: '1', SHEA_SITE_BASE: '/' };
let stopping = false;

async function readPage(url) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(3000) });
    return await response.text();
  } catch {
    return null;
  }
}

function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill();
  process.exitCode = code;
}

function start(file, args = []) {
  const child = spawn(process.execPath, [file, ...args], {
    cwd: repo,
    env,
    stdio: 'inherit',
    windowsHide: true,
  });
  children.add(child);
  child.once('error', (error) => {
    console.error(error.message);
    stop(1);
  });
  child.once('exit', (code) => {
    children.delete(child);
    if (!stopping && (file === studio || args[0] === 'preview')) stop(code ?? 1);
  });
  return child;
}

for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP']) process.on(signal, () => stop());

try {
  const runningStudio = await readPage('http://127.0.0.1:4324/');
  if (runningStudio?.includes('post-form')) {
    console.log('The writing studio is already open: http://127.0.0.1:4324');
  } else {
    if (runningStudio !== null) throw new Error('Port 4324 is in use by another service.');
    await fs.access(astro);
    try {
      await fs.access(path.join(repo, 'dist/zh/index.html'));
    } catch {
      console.log('Preparing the local website...');
      const build = start(astro, ['build']);
      const code = await new Promise((resolve) => build.once('exit', resolve));
      if (code !== 0) throw new Error('The local website could not be built.');
    }
    const preview = await readPage('http://127.0.0.1:4323/zh');
    if (preview !== null && !preview.includes('Shea')) throw new Error('Port 4323 is in use by another service.');
    if (preview === null) start(astro, ['preview', '--host', '127.0.0.1', '--port', '4323']);
    console.log('Open http://127.0.0.1:4324 in your browser. Keep this window open. Ctrl+C stops this session.');
    start(studio);
  }
} catch (error) {
  console.error(error.message);
  stop(1);
}
