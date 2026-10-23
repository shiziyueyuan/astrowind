import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import { parseDocument, serializeDocument, identity, languages, today } from './journal-format.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const workspace = path.dirname(repo);
const work = path.join(workspace, 'work', 'journal-studio');
const published = path.join(repo, 'src', 'data', 'journal');
const drafts = path.join(work, 'drafts');
const port = 4324;
const origin = `http://127.0.0.1:${port}`;
const token = crypto.randomBytes(32).toString('hex');
const branch = 'main';
const expectedRemote = 'https://github.com/shiziyueyuan/astrowind.git';
const website = 'https://shiziyueyuan.github.io/astrowind';
let job = { state: 'idle', step: 'idle' };
const hash = (text) => crypto.createHash('sha256').update(text).digest('hex');
const read = async (file) =>
  fs.readFile(file, 'utf8').catch((error) => {
    if (error.code === 'ENOENT') return null;
    throw error;
  });
function fenced(file) {
  const absolute = path.resolve(file);
  const relative = path.relative(workspace, absolute);
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) throw new Error('forbidden');
  return absolute;
}
async function store(file, text) {
  fenced(file);
  await fs.mkdir(path.dirname(file), { recursive: true });
  const previous = await read(file);
  if (previous !== null) {
    const backup = fenced(path.join(work, 'backups', `${Date.now()}-${crypto.randomUUID()}.md`));
    await fs.mkdir(path.dirname(backup), { recursive: true });
    await fs.writeFile(backup, previous, { flag: 'wx' });
  }
  const temporary = fenced(`${file}.${crypto.randomUUID()}.tmp`);
  await fs.writeFile(temporary, text, { flag: 'wx' });
  await fs.rename(temporary, file);
}
async function allPosts() {
  const posts = new Map();
  for (const [base, state] of [
    [published, 'published'],
    [drafts, 'draft'],
  ]) {
    for (const locale of languages) {
      const names = await fs.readdir(path.join(base, locale)).catch((error) => {
        if (error.code === 'ENOENT') return [];
        throw error;
      });
      for (const name of names.filter((value) => value.endsWith('.md'))) {
        const text = await read(path.join(base, locale, name));
        if (text === null) continue;
        const document = parseDocument(text, name);
        // Existing private development drafts stay private and outside the studio list.
        if (state === 'published' && document.draft) continue;
        const id = identity(locale, document.key);
        const previous = posts.get(id);
        posts.set(id, {
          ...document,
          locale,
          id,
          state,
          revision: hash(text),
          hasPublished: state === 'published' || previous?.hasPublished === true,
        });
      }
    }
  }
  return [...posts.values()].sort((a, b) => b.date.localeCompare(a.date));
}
function command(executable, args, environment = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(executable, args, {
      cwd: repo,
      windowsHide: true,
      shell: false,
      env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1', ...environment },
    });
    let output = '';
    child.stdout.on('data', (chunk) => {
      output = (output + chunk).slice(-80000);
    });
    child.stderr.on('data', (chunk) => {
      output = (output + chunk).slice(-80000);
    });
    child.on('error', reject);
    child.on('close', async (code) => {
      try {
        await fs.mkdir(work, { recursive: true });
        await fs.writeFile(path.join(work, 'latest-operation.log'), output);
      } catch {
        /* The operation result remains available if logging fails. */
      }
      if (code === 0) resolve(output.trim());
      else reject(new Error('operation_failed'));
    });
  });
}
const git = (args) =>
  command('git', ['-c', `safe.directory=${repo.replaceAll('\\', '/')}`, ...args], {
    GIT_TERMINAL_PROMPT: '0',
    GCM_INTERACTIVE: 'never',
  });
async function build() {
  job = { state: 'running', step: 'building' };
  await command(process.execPath, [path.join(repo, 'node_modules/astro/bin/astro.mjs'), 'build'], {
    SHEA_SITE_BASE: '/',
  });
}
function startJob(task) {
  job = { state: 'running', step: 'saving' };
  task().catch((error) => {
    job = { state: 'failed', step: error.message };
  });
}
async function body(request) {
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > 2 * 1024 * 1024) throw new Error('too_large');
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    throw new Error('invalid_metadata');
  }
}
function send(response, status, value) {
  response.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(value));
}
const server = http.createServer(async (request, response) => {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'"
  );
  try {
    if (request.headers.host !== `127.0.0.1:${port}` || request.headers['sec-fetch-site'] === 'cross-site')
      throw new Error('forbidden');
    const url = new URL(request.url, origin);
    if (request.method === 'GET' && url.pathname === '/api/session')
      return send(response, 200, { token, today: today(), website });
    if (request.method === 'GET' && url.pathname === '/api/status') return send(response, 200, job);
    if (request.method === 'GET' && url.pathname === '/api/posts') {
      const posts = await allPosts();
      return send(
        response,
        200,
        posts.map((post) => ({ ...post, body: undefined }))
      );
    }
    if (request.method === 'GET' && url.pathname === '/api/post') {
      const id = identity(url.searchParams.get('locale'), url.searchParams.get('key'));
      const post = (await allPosts()).find((entry) => entry.id === id);
      return send(response, post ? 200 : 404, post ?? { error: 'not_found' });
    }
    if (request.method === 'POST') {
      if (
        request.headers.origin !== origin ||
        request.headers['x-shea-studio'] !== token ||
        !request.headers['content-type']?.startsWith('application/json')
      )
        throw new Error('forbidden');
      if (job.state === 'running') return send(response, 409, { error: 'busy' });
      const input = await body(request);
      if (url.pathname === '/api/inspect') {
        if (typeof input.filename !== 'string' || !input.filename.toLowerCase().endsWith('.md'))
          throw new Error('invalid_file');
        return send(response, 200, parseDocument(input.markdown, input.filename));
      }
      if (url.pathname === '/api/save') {
        const id = identity(input.locale, input.key);
        const previous = (await allPosts()).find((entry) => entry.id === id);
        if (previous && input.revision !== previous.revision) throw new Error('exists');
        if (input.revision && (!previous || previous.revision !== input.revision)) throw new Error('changed');
        const isDraft = input.action === 'draft';
        if (!isDraft && input.action !== 'publish') throw new Error('invalid_action');
        const text = serializeDocument(input, isDraft);
        const file = fenced(path.join(isDraft ? drafts : published, input.locale, `${input.key}.md`));
        if (isDraft) {
          await store(file, text);
          return send(response, 200, { state: 'draft_saved' });
        }
        startJob(async () => {
          const old = await read(file);
          await store(file, text);
          try {
            await build();
          } catch {
            if (old !== null) await store(file, old);
            else {
              const recovery = fenced(
                path.join(work, 'failed-publications', `${Date.now()}-${crypto.randomUUID()}.md`)
              );
              await fs.mkdir(path.dirname(recovery), { recursive: true });
              await fs.rename(fenced(file), recovery);
            }
            await store(fenced(path.join(drafts, input.locale, `${input.key}.md`)), serializeDocument(input, true));
            try {
              await build();
            } catch {
              /* The failed draft and build log are retained. */
            }
            throw new Error('build_failed');
          }
          const draft = fenced(path.join(drafts, input.locale, `${input.key}.md`));
          if ((await read(draft)) !== null) {
            const backup = fenced(path.join(work, 'backups', `${Date.now()}-${crypto.randomUUID()}.md`));
            await fs.mkdir(path.dirname(backup), { recursive: true });
            await fs.rename(draft, backup);
          }
          job = {
            state: 'done',
            step: 'published_local',
            preview: `http://127.0.0.1:4323/${input.locale}/journal/${input.key}`,
          };
        });
        return send(response, 202, job);
      }
      if (url.pathname === '/api/sync') {
        startJob(async () => {
          if (
            (await git(['branch', '--show-current'])) !== branch ||
            (await git(['remote', 'get-url', 'origin'])) !== expectedRemote
          )
            throw new Error('wrong_repository');
          const staged = await git(['diff', '--cached', '--name-only']);
          if (staged.split('\n').some((name) => name && !name.startsWith('src/data/journal/')))
            throw new Error('other_changes');
          await build();
          job = { state: 'running', step: 'syncing' };
          const publicFiles = [];
          for (const locale of languages) {
            const names = await fs.readdir(path.join(published, locale)).catch((error) => {
              if (error.code === 'ENOENT') return [];
              throw error;
            });
            for (const name of names.filter((file) => /^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(file))) {
              const text = await read(fenced(path.join(published, locale, name)));
              if (text && !parseDocument(text, name).draft) publicFiles.push(`src/data/journal/${locale}/${name}`);
            }
          }
          if (publicFiles.length) await git(['add', '--', ...publicFiles]);
          const pending = await git(['diff', '--cached', '--name-only']);
          for (const file of pending.split('\n').filter(Boolean)) {
            if (file.endsWith('.md') && parseDocument(await git(['show', `:${file}`]), path.basename(file)).draft)
              throw new Error('other_changes');
          }
          if (await git(['diff', '--cached', '--name-only']))
            await git([
              '-c',
              'user.name=Shea',
              '-c',
              'user.email=333328080+shiziyueyuan@users.noreply.github.com',
              'commit',
              '-m',
              'Publish journal writing',
            ]);
          await git(['push', 'origin', 'main']);
          job = { state: 'done', step: 'synced', preview: `${website}/zh/journal` };
        });
        return send(response, 202, job);
      }
      return send(response, 404, { error: 'not_found' });
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') return send(response, 405, { error: 'forbidden' });
    if (url.pathname === '/brand.css') {
      const html = (await read(path.join(repo, 'dist/zh/index.html'))) ?? '';
      const css = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
        .map((match) => match[1])
        .filter((style) => style.includes('--font-') || style.includes('--shea-cjk'))
        .join('\n');
      response.writeHead(200, { 'Content-Type': 'text/css; charset=utf-8' });
      return response.end(css);
    }
    const relative = url.pathname.replace(/^\/astrowind(?=\/)/, '');
    let file;
    if (['/', '/studio.js', '/studio.css'].includes(relative))
      file = path.join(repo, 'scripts', 'studio', relative === '/' ? 'index.html' : relative.slice(1));
    else if (/^\/_astro\/fonts\/[a-f0-9]+\.woff2$/.test(relative)) file = path.join(repo, 'dist', relative.slice(1));
    else return send(response, 404, { error: 'not_found' });
    const bytes = await fs.readFile(fenced(file));
    const mime = {
      '.html': 'text/html; charset=utf-8',
      '.js': 'text/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.woff2': 'font/woff2',
    };
    response.writeHead(200, { 'Content-Type': mime[path.extname(file)] });
    response.end(request.method === 'HEAD' ? undefined : bytes);
  } catch (error) {
    send(response, error.message === 'forbidden' ? 403 : 400, { error: error.message });
  }
});
server.listen(port, '127.0.0.1', () =>
  console.log(`Shea writing studio: ${origin}\nPrivate drafts: ${drafts}\nPress Ctrl+C to stop.`)
);
server.on('error', (error) => {
  console.error(error.code === 'EADDRINUSE' ? `Studio is already running at ${origin}` : error.message);
  process.exitCode = 1;
});
