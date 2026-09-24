// G5 feat023-r2 targeted close-ups: screenshot each of the eight cycle-1 repair
// sites from the served Urdu build, plus two narrow-view checks, as rendered
// evidence that the repaired passages display correctly in Nastaliq RTL.
// Serves the existing build/ on port 4623 (no rebuild).
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve('.');
const outDir = 'specs/content/efmp-302/reviews/unit-03/G5/renders-feat023-r2';
mkdirSync(outDir, { recursive: true });
const port = 4623;
const base = `http://127.0.0.1:${port}`;
const route = '/ur/semester-1/efmp-302/unit-03';

const log = [];
const say = (s) => { log.push(s); console.log(s); };

say(`targeted-shots (feat023-r2) ${new Date().toISOString()}`);
say(`serving existing build/ on ${base} (npm run serve, no rebuild)`);

const server = spawn('npm', ['run', 'serve', '--', '--port', String(port), '--no-open'],
  { cwd: root, stdio: 'ignore', detached: true });
const deadline = Date.now() + 180_000;
let up = false;
while (Date.now() < deadline && !up) {
  await new Promise((r) => setTimeout(r, 2000));
  try { up = (await fetch(base, { method: 'HEAD' })).ok; } catch { /* not yet */ }
}
if (!up) {
  if (server.pid) process.kill(-server.pid, 'SIGTERM');
  console.error('server did not come up');
  process.exit(2);
}
say(`server up: ${base}`);

const browser = await chromium.launch();
say(`browser: chromium ${browser.version()}`);

// Each shot: page slug, a unique text fragment of the repaired passage, output name.
const shots = [
  { slug: 'topic-02', needle: 'جوش عموماً', name: 'p-repair-B01-topic02-summary-enthusiasm.png', desc: 'B-01 topic-02 summary: enthusiasm follows competence' },
  { slug: 'topic-01', needle: 'محض اشارہ شدہ تعریفیں', name: 'p-repair-B02-topic01-taylor.png', desc: 'B-02 topic-01: inaccurate or merely implied definitions' },
  { slug: 'topic-01', needle: 'معروضی لگتا', name: 'p-repair-B03-topic01-objective.png', desc: 'B-03 topic-01: the aggregate number feels objective' },
  { slug: 'unit-teacher-notes', needle: 'زیرِ خدمت استاد', name: 'p-repair-B04-notes-serving-teacher.png', desc: 'B-04 teacher-notes: observing a serving teacher' },
  { slug: 'topic-05', needle: 'کوئی آپ کی بات نہیں سنتا', name: 'p-repair-B05-topic05-nobody-listens.png', desc: 'B-05 topic-05: ensuring nobody listens to you' },
  { slug: 'topic-05', needle: 'اس کا ارادہ کیا جائے یا نہ کیا جائے', name: 'p-repair-B06-topic05-intended.png', desc: 'B-06 topic-05: whether or not it is intended' },
  { slug: 'topic-02', needle: 'بنا بنا کر پڑھایا جاتا ہے', name: 'p-repair-B07-topic02-improvised.png', desc: 'B-07 topic-02: every lesson is improvised' },
  { slug: 'topic-03', needle: 'سوچا سمجھا طے شدہ راستے', name: 'p-repair-B08-topic03-reasoned-default.png', desc: 'B-08 topic-03: a reasoned default rather than a sourced finding' },
];

const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const pg = await ctx.newPage();
let ok = 0;
for (const s of shots) {
  const resp = await pg.goto(`${base}${route}/${s.slug}/`, { waitUntil: 'networkidle' });
  if (!resp?.ok()) { say(`FAIL ${s.name}: HTTP ${resp?.status()}`); continue; }
  // Find the paragraph containing the needle, scroll it into view, then screenshot.
  const found = await pg.evaluate((needle) => {
    const els = [...document.querySelectorAll('main p, main li')];
    const el = els.find((e) => e.textContent.includes(needle));
    if (!el) return null;
    el.scrollIntoView({ block: 'center' });
    const r = el.getBoundingClientRect();
    return { x: Math.max(0, r.x - 12), y: Math.max(0, r.y - 12), w: Math.min(r.width + 24, 1280), h: r.height + 24, text: el.textContent.trim().slice(0, 200) };
  }, s.needle);
  if (!found) { say(`FAIL ${s.name}: needle not found on ${s.slug}`); continue; }
  await pg.screenshot({ path: `${outDir}/${s.name}`, clip: { x: found.x, y: found.y, width: found.w, height: Math.min(found.h, 880) } });
  say(`OK ${s.name} :: ${s.desc}`);
  say(`   passage: ${found.text.replace(/\s+/g, ' ').slice(0, 160)}`);
  ok += 1;
}

// Two narrow-view checks: the repaired B-01 summary line and the B-07 line at 360px.
const nctx = await browser.newContext({ viewport: { width: 360, height: 780 } });
const npg = await nctx.newPage();
const narrow = [
  { slug: 'topic-02', needle: 'جوش عموماً', name: 'p-narrow360-B01-summary.png' },
  { slug: 'topic-05', needle: 'اس کا ارادہ کیا جائے', name: 'p-narrow360-B06-intended.png' },
];
for (const s of narrow) {
  const resp = await npg.goto(`${base}${route}/${s.slug}/`, { waitUntil: 'networkidle' });
  if (!resp?.ok()) { say(`FAIL ${s.name}: HTTP ${resp?.status()}`); continue; }
  const found = await npg.evaluate((needle) => {
    const els = [...document.querySelectorAll('main p, main li')];
    const el = els.find((e) => e.textContent.includes(needle));
    if (!el) return null;
    el.scrollIntoView({ block: 'center' });
    return { text: el.textContent.trim().slice(0, 120) };
  }, s.needle);
  if (!found) { say(`FAIL ${s.name}: needle not found`); continue; }
  await npg.screenshot({ path: `${outDir}/${s.name}` });
  say(`OK ${s.name} (narrow 360x780) :: ${found.text.replace(/\s+/g, ' ').slice(0, 100)}`);
  ok += 1;
}

await browser.close();
try { if (server.pid) process.kill(-server.pid, 'SIGTERM'); } catch { /* already gone */ }
say(`result: ${ok}/${shots.length + narrow.length} targeted shots captured`);
writeFileSync('specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r2/targeted-shots.log', log.join('\n') + '\n');
process.exit(ok === shots.length + narrow.length ? 0 : 1);
