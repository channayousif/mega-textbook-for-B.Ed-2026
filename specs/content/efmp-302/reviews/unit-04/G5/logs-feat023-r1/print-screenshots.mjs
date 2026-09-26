// G5 feat023-r1: print-media screenshots (A4 794px emulation) of the two most
// complex Urdu pages, so the reviewer can visually verify A4 print rendering
// (the host lacks poppler-utils, so the emitted PDFs cannot be rasterised here).
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(process.env.CONTENT_ROOT || '.');
const port = 4624;
const base = `http://127.0.0.1:${port}`;

const server = spawn('npm', ['run', 'serve', '--', '--port', String(port), '--no-open'],
  { cwd: root, stdio: 'ignore', detached: true });
const deadline = Date.now() + 180_000;
let up = false;
while (Date.now() < deadline && !up) {
  await new Promise((r) => setTimeout(r, 2000));
  try { up = (await fetch(base, { method: 'HEAD' })).ok; } catch { /* not yet */ }
}
if (!up) { console.error('server did not come up'); process.exit(2); }

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 794, height: 1123 } });
const pg = await ctx.newPage();
const pages = [
  ['unit-assessment', 'print-a4-screen-unit-assessment.png'],
  ['topic-04', 'print-a4-screen-topic-04.png'],
];
for (const [slug, out] of pages) {
  await pg.goto(`${base}/ur/semester-1/efmp-302/unit-04/${slug}/`, { waitUntil: 'networkidle' });
  await pg.emulateMedia({ media: 'print' });
  await pg.screenshot({
    path: `specs/content/efmp-302/reviews/unit-04/G5/renders-feat023-r1/${out}`,
    fullPage: true,
  });
  console.log(`saved ${out}`);
  await pg.emulateMedia({ media: 'screen' });
}
await browser.close();
try { process.kill(-server.pid, 'SIGTERM'); } catch { /* gone */ }
