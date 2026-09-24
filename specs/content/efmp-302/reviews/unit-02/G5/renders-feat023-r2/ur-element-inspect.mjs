// G5 feat023-r2 targeted element inspection over the shared build (commit 86ce1dd).
// Serves build/ on port 4621 and captures the load-bearing Urdu elements this
// review must read directly: the repaired MCQ 6 key item, an MCQ list sample,
// the key_terms block, a Nastaliq paragraph with embedded Latin, an RTL table,
// a .ur.svg figure, and the A4 print view of the repaired key.
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve('.');
const out = 'specs/content/efmp-302/reviews/unit-02/G5/renders-feat023-r2';
const port = 4621;
const base = `http://127.0.0.1:${port}`;
const route = '/ur/semester-1/efmp-302/unit-02';

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
const log = [];
const say = (s) => { log.push(s); console.log(s); };
say(`### ur-element-inspect feat023-r2  host=${base}  browser=chromium ${browser.version()}`);
say(`### started: ${new Date().toISOString()}`);

const shots = [];
async function elementShot(ctx, url, selector, name, note) {
  const pg = await ctx.newPage();
  const res = await pg.goto(url, { waitUntil: 'networkidle' });
  if (!res?.ok()) { say(`FAIL ${name}: HTTP ${res?.status()}`); return; }
  const el = await pg.$(selector);
  if (!el) { say(`FAIL ${name}: selector not found: ${selector}`); return; }
  await el.scrollIntoViewIfNeeded();
  await pg.waitForTimeout(600);
  await el.screenshot({ path: `${out}/${name}.png` });
  const box = await el.boundingBox();
  shots.push(name);
  say(`ok ${name}  (${note})  box=${Math.round(box.width)}x${Math.round(box.height)}`);
  await pg.close();
}

// Desktop 1280x900
let ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const U = (slug) => `${base}${route}/${slug}/`;

// 1. The repaired MCQ 6 key item (desktop)
await elementShot(ctx, U('unit-assessment'), 'ol li:nth-child(6)', 'desktop-element-assessment-mcq6-key',
  'repaired Urdu MCQ 6 key with appended caveat');

// 2. MCQ question list sample (desktop) - questions 5-7 region
{
  const pg = await ctx.newPage();
  await pg.goto(U('unit-assessment'), { waitUntil: 'networkidle' });
  const mcqs = await pg.$$('main ol li');
  // The first ol is the MCQ list; capture items 6-7 (question 6 with Standard 9 options)
  if (mcqs.length >= 7) {
    await mcqs[5].scrollIntoViewIfNeeded();
    await pg.waitForTimeout(400);
    await mcqs[5].screenshot({ path: `${out}/desktop-element-assessment-mcq6-question.png` });
    shots.push('desktop-element-assessment-mcq6-question');
    say('ok desktop-element-assessment-mcq6-question  (MCQ 6 question with Standard 9 options)');
  }
  await pg.close();
}

// 3. Nastaliq paragraph with embedded Latin citations (topic-01 further reading,
//    anchored on the مزید مطالعہ heading)
{
  const pg = await ctx.newPage();
  await pg.goto(U('topic-01'), { waitUntil: 'networkidle' });
  const ul = await pg.evaluateHandle(() => {
    const h2s = [...document.querySelectorAll('main h2')];
    const h = h2s.find((x) => x.textContent.includes('مزید مطالعہ'));
    if (!h) return null;
    let s = h.nextElementSibling;
    while (s && s.tagName !== 'UL') s = s.nextElementSibling;
    return s;
  });
  if (ul && ul.asElement()) {
    await ul.asElement().scrollIntoViewIfNeeded();
    await pg.waitForTimeout(400);
    await ul.asElement().screenshot({ path: `${out}/desktop-element-topic01-further-reading.png` });
    shots.push('desktop-element-topic01-further-reading');
    say('ok desktop-element-topic01-further-reading  (further reading list with Latin citations)');
  } else { say('FAIL desktop-element-topic01-further-reading: list not found'); }
  await pg.close();
}

// 5. A body paragraph (topic-01 explanation)
await elementShot(ctx, U('topic-01'), 'main p:nth-of-type(3)', 'desktop-element-topic01-paragraph', 'topic-01 body paragraph Nastaliq');

// 6. The topic-02 disclosure paragraph (bold caveat in taught passage)
{
  const pg = await ctx.newPage();
  await pg.goto(U('topic-02'), { waitUntil: 'networkidle' });
  const paras = await pg.$$('main p');
  let target = null;
  for (const p of paras) {
    const t = await p.textContent();
    if (t.includes('غیر مصدقہ')) { target = p; break; }
  }
  if (target) {
    await target.scrollIntoViewIfNeeded();
    await pg.waitForTimeout(400);
    await target.screenshot({ path: `${out}/desktop-element-topic02-caveat.png` });
    shots.push('desktop-element-topic02-caveat');
    say('ok desktop-element-topic02-caveat  (taught-passage disclosure paragraph)');
  } else { say('FAIL desktop-element-topic02-caveat: paragraph with غیر مصدقہ not found'); }
  await pg.close();
}

// 7. RTL table at narrow 360 (topic-03 diagnostic table)
const nctx = await browser.newContext({ viewport: { width: 360, height: 780 } });
{
  const pg = await nctx.newPage();
  await pg.goto(U('topic-03'), { waitUntil: 'networkidle' });
  const tables = await pg.$$('main table');
  if (tables.length) {
    await tables[0].scrollIntoViewIfNeeded();
    await pg.waitForTimeout(400);
    await tables[0].screenshot({ path: `${out}/narrow360-element-topic03-diagnostic-table.png` });
    shots.push('narrow360-element-topic03-diagnostic-table');
    say('ok narrow360-element-topic03-diagnostic-table  (RTL table column order at 360px)');
  }
  await pg.close();
}

// 8. Repaired MCQ 6 key at narrow 360
await elementShot(nctx, U('unit-assessment'), 'ol li:nth-child(6)', 'narrow360-element-assessment-mcq6-key',
  'repaired MCQ 6 key at 360px');

// 9. ERQ 1 rubric table at narrow 360 (assessment)
{
  const pg = await nctx.newPage();
  await pg.goto(U('unit-assessment'), { waitUntil: 'networkidle' });
  const tables = await pg.$$('main table');
  if (tables.length) {
    await tables[0].scrollIntoViewIfNeeded();
    await pg.waitForTimeout(400);
    await tables[0].screenshot({ path: `${out}/narrow360-element-assessment-erq1-rubric.png` });
    shots.push('narrow360-element-assessment-erq1-rubric');
    say('ok narrow360-element-assessment-erq1-rubric  (ERQ 1 rubric RTL at 360px)');
  }
  await pg.close();
}

// 10. A .ur.svg figure element at desktop (topic-03 fig-U2-5, the Rest flowchart)
await elementShot(ctx, U('topic-03'), 'figure:first-of-type', 'desktop-element-topic03-fig5', 'fig-U2-5.ur.svg rendered figure');

// 11. A4 print view of the repaired key
const pctx = await browser.newContext({ viewport: { width: 794, height: 1123 } });
await pctx.addInitScript(() => { window.__forcePrint = true; });
{
  const pg = await pctx.newPage();
  await pg.goto(U('unit-assessment'), { waitUntil: 'networkidle' });
  await pg.emulateMedia({ media: 'print' });
  const keys = await pg.$$('main ol li');
  if (keys.length >= 7) {
    // find the key list: the second ol is the MCQ key region within answers section
    const keyItem = keys[5];
    const t = await keyItem.textContent();
    // The first ol is the question list; locate the key item containing the caveat
    let target = null;
    for (const li of keys) {
      const txt = await li.textContent();
      if (txt.includes('غیر مصدقہ')) { target = li; break; }
    }
    if (target) {
      await target.scrollIntoViewIfNeeded();
      await pg.waitForTimeout(400);
      await target.screenshot({ path: `${out}/print-a4-element-assessment-mcq6-key.png` });
      shots.push('print-a4-element-assessment-mcq6-key');
      say('ok print-a4-element-assessment-mcq6-key  (repaired key item in A4 print media)');
    } else { say('FAIL print-a4-element-assessment-mcq6-key: key item with غیر مصدقہ not found in print view'); }
  }
  await pg.close();
}

say(`\n### captured ${shots.length} element shots`);
say(`### finished: ${new Date().toISOString()}`);
writeFileSync(`${out}/ur-element-inspect.log`, log.join('\n') + '\n');

await browser.close();
try { process.kill(-server.pid, 'SIGTERM'); } catch { /* already gone */ }
process.exit(0);
