// G5 feat023-r2 assessment close-ups: MCQ 8 (Latin "Furlich" inside RTL options),
// the MCQ key, and the ERQ rubric table, as rendered bidi evidence.
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve('.');
const outDir = 'specs/content/efmp-302/reviews/unit-03/G5/renders-feat023-r2';
const port = 4623;
const base = `http://127.0.0.1:${port}`;
const route = '/ur/semester-1/efmp-302/unit-03';
const log = [];
const say = (s) => { log.push(s); console.log(s); };

say(`assessment-shots (feat023-r2) ${new Date().toISOString()}`);
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
const ctx = await browser.newContext({ viewport: { width: 1280, height: 600 } });
const pg = await ctx.newPage();
const resp = await pg.goto(`${base}${route}/unit-assessment/`, { waitUntil: 'networkidle' });
if (!resp?.ok()) { say('FAIL: unit-assessment did not load'); process.exit(1); }

const shots = [
  { needle: 'Furlich کے مطالعے نے غلط ثابت', name: 'v-assess-mcq8-options.png', desc: 'MCQ 8 options with embedded Latin (Furlich)' },
  { needle: 'MCQ جوابی کلید', name: 'v-assess-mcq-key.png', desc: 'MCQ answer key' },
  { needle: 'ERQ 1', name: 'v-assess-erq1-rubric.png', desc: 'ERQ 1 rubric table (RTL table order)' },
];
let ok = 0;
for (const s of shots) {
  const found = await pg.evaluate((needle) => {
    const els = [...document.querySelectorAll('main p, main li, main h3, main h2, main table')];
    const el = els.find((e) => e.textContent.includes(needle));
    if (!el) return null;
    el.scrollIntoView({ block: 'center' });
    return el.textContent.trim().slice(0, 80);
  }, s.needle);
  if (!found) { say(`FAIL ${s.name}: needle not found`); continue; }
  await new Promise((r) => setTimeout(r, 300));
  await pg.screenshot({ path: `${outDir}/${s.name}` });
  say(`OK ${s.name} :: ${s.desc}`);
  ok += 1;
}
await browser.close();
try { if (server.pid) process.kill(-server.pid, 'SIGTERM'); } catch { /* already gone */ }
say(`result: ${ok}/${shots.length} assessment close-ups captured`);
writeFileSync('specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r2/assessment-shots.log', log.join('\n') + '\n');
process.exit(ok === shots.length ? 0 : 1);
