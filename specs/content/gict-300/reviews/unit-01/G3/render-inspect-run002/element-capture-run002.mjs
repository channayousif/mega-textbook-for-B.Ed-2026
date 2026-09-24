// Run-002 element close-ups for GICT-300 Unit 1 G3 evidence.
// Starts the overlay server, captures the repaired fig-U1-6 element (light),
// its dark variant, and the answers section at 360px, then shuts down.
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';

const root = '/tmp/gict300-g3-overlay-run002';
const outDir = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-aed74e6fa51c2d4d4/specs/content/gict-300/reviews/unit-01/G3/render-inspect-run002';
const base = 'http://127.0.0.1:4599';

const server = spawn('npm', ['run', 'serve', '--', '--port', '4599', '--no-open'],
  { cwd: root, stdio: 'ignore', detached: true });
const deadline = Date.now() + 180_000;
let up = false;
while (Date.now() < deadline && !up) {
  await new Promise((r) => setTimeout(r, 2000));
  try { up = (await fetch(base, { method: 'HEAD' })).ok; } catch { /* not yet */ }
}
if (!up) { process.kill(-server.pid, 'SIGTERM'); console.error('server did not come up'); process.exit(2); }

const browser = await chromium.launch();
// 1. fig-U1-6 element close-up, light theme, desktop width
let ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
let pg = await ctx.newPage();
await pg.goto(`${base}/semester-1/gict-300/unit-01/topic-03/`, { waitUntil: 'networkidle' });
const fig = pg.locator('img[src*="fig-U1-6.svg"]').first();
await fig.scrollIntoViewIfNeeded();
await fig.screenshot({ path: `${outDir}/fig-U1-6-element-run002.png` });
// measure the label text in the served SVG for the record
const label = await pg.evaluate(async () => {
  const res = await fetch('/img/figures/gict-300/unit-01/fig-U1-6.svg');
  const xml = await res.text();
  const m = /<text[^>]*x="(\d+)"[^>]*y="(\d+)"[^>]*text-anchor="end"[^>]*>more specialised<\/text>/.exec(xml);
  return m ? { x: m[1], y: m[2], anchor: 'end' } : null;
});
console.log('fig-U1-6 label geometry in served SVG:', JSON.stringify(label));
await ctx.close();

// 2. dark variant: force data-theme=dark
ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
pg = await ctx.newPage();
await pg.goto(`${base}/semester-1/gict-300/unit-01/topic-03/`, { waitUntil: 'networkidle' });
await pg.evaluate(() => { document.documentElement.setAttribute('data-theme', 'dark'); });
await pg.waitForTimeout(300);
const figDark = pg.locator('img[src*="fig-U1-6.dark.svg"]').first();
await figDark.scrollIntoViewIfNeeded();
await figDark.screenshot({ path: `${outDir}/fig-U1-6-dark-element-run002.png` });
await ctx.close();

// 3. answers section at 360px
ctx = await browser.newContext({ viewport: { width: 360, height: 780 } });
pg = await ctx.newPage();
await pg.goto(`${base}/semester-1/gict-300/unit-01/unit-assessment/`, { waitUntil: 'networkidle' });
const answers = pg.locator('#answers-and-marking-guidance, h2:has-text("Answers and marking guidance")').first();
await answers.scrollIntoViewIfNeeded();
await pg.waitForTimeout(200);
await pg.screenshot({ path: `${outDir}/answers-narrow-360-run002.png` });
await ctx.close();

await browser.close();
process.kill(-server.pid, 'SIGTERM');
console.log('element captures written');
