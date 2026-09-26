// G5 feat023-r2 viewport close-ups: scroll each repair site into the centre of a
// 1280x600 viewport and capture the whole viewport, so the Nastaliq rendering of
// each repaired passage is readable in the evidence set.
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

say(`viewport-shots (feat023-r2) ${new Date().toISOString()}`);
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

const shots = [
  { slug: 'topic-02', needle: 'جوش عموماً', name: 'v-repair-B01-topic02-summary.png' },
  { slug: 'topic-01', needle: 'محض اشارہ شدہ تعریفیں', name: 'v-repair-B02-topic01-taylor.png' },
  { slug: 'topic-01', needle: 'معروضی لگتا', name: 'v-repair-B03-topic01-objective.png' },
  { slug: 'unit-teacher-notes', needle: 'زیرِ خدمت استاد', name: 'v-repair-B04-notes-serving.png' },
  { slug: 'topic-05', needle: 'کوئی آپ کی بات نہیں سنتا', name: 'v-repair-B05-topic05-listens.png' },
  { slug: 'topic-05', needle: 'اس کا ارادہ کیا جائے', name: 'v-repair-B06-topic05-intended.png' },
  { slug: 'topic-02', needle: 'بنا بنا کر پڑھایا جاتا ہے', name: 'v-repair-B07-topic02-improvised.png' },
  { slug: 'topic-03', needle: 'سوچا سمجھا طے شدہ راستے', name: 'v-repair-B08-topic03-default.png' },
];

let ok = 0;
for (const s of shots) {
  const resp = await pg.goto(`${base}${route}/${s.slug}/`, { waitUntil: 'networkidle' });
  if (!resp?.ok()) { say(`FAIL ${s.name}: HTTP ${resp?.status()}`); continue; }
  const found = await pg.evaluate((needle) => {
    const els = [...document.querySelectorAll('main p, main li')];
    const el = els.find((e) => e.textContent.includes(needle));
    if (!el) return null;
    el.scrollIntoView({ block: 'center' });
    return el.textContent.trim().slice(0, 100);
  }, s.needle);
  if (!found) { say(`FAIL ${s.name}: needle not found`); continue; }
  await new Promise((r) => setTimeout(r, 300));
  await pg.screenshot({ path: `${outDir}/${s.name}` });
  say(`OK ${s.name}`);
  ok += 1;
}

await browser.close();
try { if (server.pid) process.kill(-server.pid, 'SIGTERM'); } catch { /* already gone */ }
say(`result: ${ok}/${shots.length} viewport close-ups captured`);
writeFileSync('specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r2/viewport-shots.log', log.join('\n') + '\n');
process.exit(ok === shots.length ? 0 : 1);
