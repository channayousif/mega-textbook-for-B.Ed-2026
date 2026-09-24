// Element-level Urdu screenshots: figures at narrow width, print-media PNG, badge.
// Serves the production build (build/ur exists) - the dev server renders one locale only.
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(process.env.CONTENT_ROOT || '.');
const outDir = resolve(root, 'specs/content/gqur-300/reviews/unit-01/G5/renders-agent-g5-gqur300-u1-run001/crops');
mkdirSync(outDir, { recursive: true });

const port = 4602;
const server = spawn('npm', ['run', 'serve', '--', '--port', String(port), '--no-open'],
  { cwd: root, stdio: 'ignore', detached: true });
const base = `http://127.0.0.1:${port}`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let up = false;
for (let i = 0; i < 90; i++) {
  await sleep(2000);
  try {
    const r = await fetch(`${base}/ur/semester-1/gqur-300/unit-01/`);
    if (r.ok) { up = true; break; }
  } catch {}
}
if (!up) { console.error('server did not come up'); process.exit(2); }
console.log(`server up at ${base}`);

const browser = await chromium.launch();
try {
  // Narrow: figure elements on the three topic pages.
  const ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2 });
  const pg = await ctx.newPage();
  const pages = ['topic-01', 'topic-02', 'topic-03'];
  for (const slug of pages) {
    await pg.goto(`${base}/ur/semester-1/gqur-300/unit-01/${slug}`, { waitUntil: 'networkidle' });
    const figs = await pg.$$('main figure');
    let n = 0;
    for (const f of figs) {
      n += 1;
      await f.screenshot({ path: resolve(outDir, `narrow-fig-${slug}-${n}.png`) });
      console.log(`shot narrow-fig-${slug}-${n}.png`);
    }
  }
  // Badge + heading region on the index page (desktop).
  const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
  const pg2 = await ctx2.newPage();
  await pg2.goto(`${base}/ur/semester-1/gqur-300/unit-01/`, { waitUntil: 'networkidle' });
  const badge = await pg2.$('.theme-badge, [class*="badge"], .badge');
  if (badge) { await badge.screenshot({ path: resolve(outDir, 'ur-badge.png') }); console.log('shot ur-badge.png'); }
  const h1 = await pg2.$('main h1');
  if (h1) { await h1.screenshot({ path: resolve(outDir, 'ur-h1.png') }); console.log('shot ur-h1.png'); }
  // Print-media PNG of the assessment page top (answers section visibility check).
  await pg2.goto(`${base}/ur/semester-1/gqur-300/unit-01/unit-assessment`, { waitUntil: 'networkidle' });
  await pg2.emulateMedia({ media: 'print' });
  await pg2.setViewportSize({ width: 794, height: 1123 });
  await pg2.screenshot({ path: resolve(outDir, 'print-a4-unit-assessment-top.png'), fullPage: false });
  console.log('shot print-a4-unit-assessment-top.png');
  await ctx2.close();
  await ctx.close();
} finally {
  await browser.close();
  try { process.kill(-server.pid, 'SIGTERM'); } catch {}
}
console.log('done');
