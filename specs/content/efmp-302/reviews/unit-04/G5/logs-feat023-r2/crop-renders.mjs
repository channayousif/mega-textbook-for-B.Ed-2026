// G5 feat023-r2 render crops: locator-based screenshots of the specific
// passages this review cites (repaired and residual), taken against the same
// shared build at 127.0.0.1:4625 that render-inspect used. The script starts
// its own server on 4625, opens each Urdu page, finds the passage by text and
// screenshots the containing block element.
import { spawn, execSync } from 'node:child_process';
import { chromium } from 'playwright';

const base = 'http://127.0.0.1:4625';
const out = 'specs/content/efmp-302/reviews/unit-04/G5/renders-feat023-r2';
const route = (p) => `${base}/ur/semester-1/efmp-302/unit-04/${p}`;

// [page, locator, outfile, label]
const targets = [
  ['index', 'p:has-text("4.2 کے بغیر 4.3")', 'crop-index-dependency.png', 'repair 2: dependency sentence'],
  ['topic-01', 'li:has-text("داؤ")', 'crop-topic-01-dau.png', 'repair 4: stakes bullet'],
  ['topic-01', 'p:has-text("زیرِ خدمت استاد")', 'crop-topic-01-serving.png', 'repair 6: serving teacher'],
  ['topic-03', 'p:has-text("شمارشے")', 'crop-topic-03-tallies.png', 'repair 13a + residual ثبٹ: own-record paragraph'],
  ['topic-03', 'p:has-text("مشق کے بجائے ریکارڈ")', 'crop-topic-03-practicum.png', 'repair 3: practicum record-not-practice'],
  ['topic-03', 'p:has-text("جس کے خلاف")', 'crop-topic-03-isore.png', 'repair 4+12: high-stakes + risk-to-design-against'],
  ['topic-04', 'p:has-text("چاہتا ہے") >> nth=1', 'crop-topic-04-chahata.png', 'repair 1: restored چاہتا passage'],
  ['topic-04', 'p:has-text("شاذ و نادر")', 'crop-topic-04-isore.png', 'repair 10: rarely passage'],
  ['topic-04', 'p:has-text("ترغیبی ڈھانچہ")', 'crop-topic-04-incentive.png', 'repair 8: incentive structure'],
  ['topic-04', 'figure:has-text("تشکیلی بمقابلہ مجموعی")', 'crop-topic-04-fig-U4-8.png', 'residual: fig-U4-8 caption شاید'],
  ['unit-assessment', 'li:has-text("یکجائتی")', 'crop-assessment-erq2.png', 'repair 7 (fixed locus): ERQ-2 label یکجائتی'],
  ['unit-assessment', 'h3:has-text("مجموعی نقشہ")', 'crop-assessment-erq2-rubric.png', 'residual: ERQ-2 rubric title مجموعی'],
  ['unit-assessment', 'table >> tr:has-text("خلاصی")', 'crop-assessment-khalisi.png', 'residual: خلاصی for Abstract'],
  ['unit-teacher-notes', 'p:has-text("مشق کے بجائے ریکارڈ")', 'crop-notes-debrief.png', 'repair 3: debrief question + negation'],
  ['unit-teacher-notes', 'p:has-text("ERQ 2 مجموعی")', 'crop-notes-erq2.png', 'residual: ERQ 2 مجموعی سوال'],
];

const server = spawn('npm', ['run', 'serve', '--', '--port', '4625', '--no-open'], { stdio: 'ignore', detached: true });
await new Promise((r) => setTimeout(r, 6000));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

let ok = 0;
let miss = 0;
for (const [pg, sel, file, label] of targets) {
  await page.goto(route(pg === 'index' ? '' : `${pg}/`), { waitUntil: 'networkidle' });
  const loc = page.locator(sel).first();
  try {
    await loc.waitFor({ state: 'visible', timeout: 8000 });
    await loc.screenshot({ path: `${out}/${file}` });
    ok += 1;
    console.log(`OK   ${file} <- ${pg}: ${label}`);
  } catch {
    miss += 1;
    console.log(`MISS ${file} <- ${pg}: ${label} (locator not found: ${sel})`);
  }
}

await browser.close();
try { process.kill(-server.pid, 'SIGTERM'); } catch { /* already gone */ }
console.log(`crops: ${ok} ok, ${miss} missed`);
process.exit(miss === 0 ? 0 : 1);
