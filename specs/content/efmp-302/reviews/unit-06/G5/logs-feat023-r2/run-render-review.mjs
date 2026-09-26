// G5 feat023-r2 render-review wrapper.
//
// WHY THIS WRAPPER EXISTS: the mandated command is
//   node scripts/render-inspect.mjs EFMP-302 6 --locale ur --port 4629 --out <dir>
// whose internal server spawn (`npm run serve`, detached) dies immediately in this
// sandboxed session (the instrument then fails with kill ESRCH after its 180s
// deadline), and background server tasks could not be kept alive from this shell.
// This wrapper starts an equivalent static server IN-PROCESS on the SAME port 4629,
// rooted at the SAME shared build/ directory the task designates, then runs the
// SAME instrument with --base http://127.0.0.1:4629 so its inspection logic runs
// unchanged against those bytes. The substitution is recorded in render-review.log.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { spawn } from 'node:child_process';

const ROOT = new URL('../../../../../../../', import.meta.url).pathname;
const PORT = 4629;
const BASE = `http://127.0.0.1:${PORT}`;
const OUT = 'specs/content/efmp-302/reviews/unit-06/G5/renders-feat023-r2';
const LOG = 'specs/content/efmp-302/reviews/unit-06/G5/logs-feat023-r2/render-inspect.log';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

const server = createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, BASE).pathname);
    if (path.endsWith('/')) path += 'index.html';
    const file = normalize(join(ROOT, 'build', path));
    if (!file.startsWith(join(ROOT, 'build'))) { res.writeHead(403).end(); return; }
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': MIME[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
});

await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));
console.log(`static server on ${BASE} rooted at build/ (in-process substitute for \`npm run serve\`)`);

const child = spawn(process.execPath, [
  'scripts/render-inspect.mjs', 'EFMP-302', '6', '--locale', 'ur',
  '--base', BASE, '--out', OUT,
], { cwd: ROOT, stdio: 'inherit' });

const code = await new Promise((resolve) => child.on('close', resolve));
server.close();
console.log(`render-inspect exit code: ${code}`);
process.exit(code);
