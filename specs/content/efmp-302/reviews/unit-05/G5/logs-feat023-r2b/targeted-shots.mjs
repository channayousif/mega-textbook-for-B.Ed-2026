// targeted-shots.mjs - feat023-r2b. Reviewer-authored Playwright driver.
// Serves the shared build (NOT a rebuild) on port 4627 and captures native-scale
// screenshots of the nine repaired loci and their context, plus the two repaired
// Urdu figures in both site themes, and records the Nastaliq/bidi environment
// facts the G5 rtl/accessibility criteria rest on. Section E of render-review.
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.env.CONTENT_ROOT || '.');
const outDir = join(root, 'specs/content/efmp-302/reviews/unit-05/G5/renders-feat023-r2b');
mkdirSync(outDir, { recursive: true });
const lines = [];
const say = (s) => { lines.push(s); console.log(s); };
const base = 'http://127.0.0.1:4627';
const route = '/ur/semester-1/efmp-302/unit-05';

const server = spawn('npm', ['run', 'serve', '--', '--port', '4627', '--no-open'], { cwd: root, stdio: 'ignore', detached: true });
const deadline = Date.now() + 180_000;
let up = false;
while (Date.now() < deadline && !up) {
  await new Promise((r) => setTimeout(r, 2000));
  try { up = (await fetch(base, { method: 'HEAD' })).ok; } catch { /* not yet */ }
}
if (!up) { console.error('server did not come up'); process.exit(2); }

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const pg = await ctx.newPage();

// Environment facts: lang/dir and the Nastaliq webfont, on a Urdu page.
await pg.goto(base + route + '/topic-02/', { waitUntil: 'networkidle' });
const env = await pg.evaluate(async () => {
  await document.fonts.ready;
  const loaded = [...document.fonts].filter((f) => f.status === 'loaded' && f.family).map((f) => f.family);
  return {
    lang: document.documentElement.lang,
    dir: document.documentElement.dir,
    nastaliqLoaded: loaded.some((fam) => fam.includes('Noto Nastaliq Urdu')),
    loadedFamilies: [...new Set(loaded)],
  };
});
say(`env: lang=${env.lang} dir=${env.dir} nastaliqWebfont=${env.nastaliqLoaded}`);
say(`fonts loaded: ${env.loadedFamilies.join(' | ')}`);

/** Locate a passage by a unique Urdu substring inside <p>/<li>/<td>, scroll it into view, shoot it. */
async function crop(page, url, needle, name, pad = 40) {
  await page.goto(url, { waitUntil: 'networkidle' });
  const bb = await page.evaluate((n) => {
    const norm = (s) => s.replace(/\s+/g, ' ');
    const target = norm(n);
    const nodes = [...document.querySelectorAll('main p, main li, main td, main h2, main h3, main blockquote p')];
    for (const node of nodes) if (norm(node.textContent).includes(target)) {
      node.scrollIntoView({ block: 'center' });
      const r = node.getBoundingClientRect();
      return { x: r.x, y: r.y, width: r.width, height: r.height };
    }
    return null;
  }, needle);
  if (!bb) { say(`MISSING ${name}: needle not found`); return false; }
  await page.waitForTimeout(200);
  const bb2 = await page.evaluate((n) => {
    const norm = (s) => s.replace(/\s+/g, ' ');
    const target = norm(n);
    const nodes = [...document.querySelectorAll('main p, main li, main td, main h2, main h3, main blockquote p')];
    for (const node of nodes) if (norm(node.textContent).includes(target)) { const r = node.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }
    return null;
  }, needle);
  const b = bb2 || bb;
  await page.screenshot({ path: join(outDir, name), clip: { x: Math.max(0, b.x - 8), y: Math.max(0, b.y - pad), width: Math.min(1280, b.width + 16), height: Math.min(900 - Math.max(0, b.y - pad), b.height + 2 * pad) } });
  say(`shot ${name}`);
  return true;
}

const t2 = base + route + '/topic-02/';
const t3 = base + route + '/topic-03/';
const t4 = base + route + '/topic-04/';
const asmt = base + route + '/unit-assessment/';

// The nine repaired loci (prose + assessment), in context.
await crop(pg, t2, 'جوابدہی کا دعویٰ مضبوط ہے اور یہ یونٹ اس سے اختلاف نہیں کرتا', 'crop-t2-stance-repair1.png');
await crop(pg, t2, 'جوابدہی اور ترقی کے درمیان تضاد کو جائزہ کے نظاموں کا مرکزی ڈیزائن مسئلہ', 'crop-t2-isore-tazad-repair4.png');
await crop(pg, t2, 'ناپتے ہیں، موازنہ کرتے ہیں اور نتیجہ لاگو کرتے ہیں', 'crop-t2-consequences-repair5.png');
await crop(pg, t3, 'ان کی لاگت ان کے پاس ہونے والے صرف تیس منٹ ہیں', 'crop-t3-cost-leg-repair3.png');
await crop(pg, t4, 'واقعی دستیاب وسائل اس مطالعے والوں سے چھوٹے ہیں مگر موجود بھی ہیں', 'crop-t4-not-nothing-repair2.png');
await crop(pg, asmt, 'بوجھ محنت اور خلوص کے ساتھ جُڑتا ہے، رسمی فرض کے ساتھ نہیں', 'crop-assess-rrq1-pt4-repair6.png');
await crop(pg, asmt, 'ہٹانے والے اور نہ ہٹنے والے الگ', 'crop-assess-erq1-rubric-repair9.png');
// MCQ options + key (assessment equivalence visual check)
await crop(pg, asmt, 'ایسے راستے سے جواب دیں جو والد یا ساتھی دیکھ سکے', 'crop-assess-mcq3-options.png', 60);
await crop(pg, asmt, 'نظر نہ آنے والا کام لچکدار ہے', 'crop-assess-mcq1-key.png', 60);

// The two repaired figures, in page context, light theme (default) then dark via data-theme.
async function figureShot(url, figId, name) {
  await pg.goto(url, { waitUntil: 'networkidle' });
  const img = pg.locator(`figure:has(img[src*="${figId}.ur.svg"]) img[src*="${figId}.ur.svg"]`).first();
  await img.scrollIntoViewIfNeeded();
  await pg.waitForTimeout(300);
  await img.screenshot({ path: join(outDir, name) });
  say(`shot ${name}`);
}
await figureShot(t2, 'fig-U5-4', 'figure-U5-4-ur-light.png');
await figureShot(t4, 'fig-U5-8', 'figure-U5-8-ur-light.png');
await pg.addInitScript(() => {
  try { window.localStorage.setItem('theme', 'dark'); } catch { /* ignore */ }
  document.documentElement.setAttribute('data-theme', 'dark');
});
await figureShot(t2, 'fig-U5-4', 'figure-U5-4-ur-dark.png');
await figureShot(t4, 'fig-U5-8', 'figure-U5-8-ur-dark.png');

await browser.close();
try { process.kill(-server.pid, 'SIGTERM'); } catch { /* already gone */ }
say('done');
writeFileSync(join(root, 'specs/content/efmp-302/reviews/unit-05/G5/logs-feat023-r2b/targeted-shots.log'), lines.join('\n') + '\n');
