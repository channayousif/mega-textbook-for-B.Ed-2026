// targeted-shots.mjs - feat023-r2 (G5 cycle 2, EFMP-302 Unit 5)
// Reviewer's own visual inspection driver against the shared build (commit 219960c bytes).
// Serves build/ on port 4627, then captures:
//   (1) native-scale crops of the seven repaired prose loci (cycle-1 findings F1-F6, F9)
//   (2) element shots of the two repaired figures (fig-U5-4 Law cell, fig-U5-8 station 1)
//       in both site themes, plus the other six Urdu figures for the rtl record
//   (3) print-media emulation of a repaired passage
// Log: targeted-shots.log in this directory. PNGs -> ../renders-feat023-r2/
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const OUT = resolve(process.cwd(), 'specs/content/efmp-302/reviews/unit-05/G5/renders-feat023-r2');
const PORT = 4627;
const log = [];
const p = (s) => { log.push(s); console.log(s); };

const server = spawn('npm', ['run', 'serve', '--', '--port', String(PORT), '--no-open'],
  { cwd: OUT, stdio: 'ignore', detached: true });
const base = `http://127.0.0.1:${PORT}`;
let up = false;
const deadline = Date.now() + 120_000;
while (Date.now() < deadline && !up) {
  await new Promise((r) => setTimeout(r, 2000));
  try { up = (await fetch(base, { method: 'HEAD' })).ok; } catch { /* not yet */ }
}
if (!up) { p('SERVER FAILED TO START'); process.exit(2); }
p(`server up on ${PORT} (shared build, commit 219960c bytes)`);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const pg = await ctx.newPage();

const page = (slug) => `${base}/ur/semester-1/efmp-302/unit-05${slug ? '/' + slug : ''}/`;

// (1) repaired prose loci: [slug, unique substring, crop name]
const loci = [
  ['topic-02', 'اس سے اختلاف نہیں کرتا', 'crop-t2-stance-repaired'],
  ['topic-02', 'تضاد کو جائزہ کے نظاموں کا مرکزی ڈیزائن مسئلہ', 'crop-t2-isore-tadad-repaired'],
  ['topic-02', 'نتیجہ لاگو کرتے ہیں', 'crop-t2-consequences-repaired'],
  ['topic-03', 'ان کی لاگت ان کے پاس ہونے والے صرف تیس منٹ', 'crop-t3-cost-leg-repaired'],
  ['topic-04', 'مگر موجود بھی ہیں', 'crop-t4-not-nothing-repaired'],
  ['unit-assessment', 'محنت اور خلوص کے ساتھ جُڑتا ہے', 'crop-assess-rrq1-point4-repaired'],
  ['unit-assessment', 'ہٹانے والے اور نہ ہٹنے والے الگ', 'crop-assess-erq1-rubric-repaired'],
];

for (const [slug, needle, name] of loci) {
  await pg.goto(page(slug), { waitUntil: 'networkidle' });
  const found = await pg.evaluate((n) => {
    const norm = (s) => s.replace(/\s+/g, ' ');
    const paras = [...document.querySelectorAll('main p, main li, main td, main h2, main h3')];
    for (const el of paras) if (norm(el.textContent).includes(n)) {
      el.scrollIntoView({ block: 'center' });
      const r = el.getBoundingClientRect();
      return { x: r.x, y: r.y, w: r.width, h: r.height, text: el.textContent.slice(0, 80) };
    }
    return null;
  }, needle);
  if (!found) { p(`LOCUS NOT FOUND on ${slug}: ${needle}`); continue; }
  const clip = {
    x: Math.max(0, found.x - 20),
    y: Math.max(0, found.y - 30),
    width: Math.min(1240 - Math.max(0, found.x - 20), found.w + 40),
    height: Math.min(880 - Math.max(0, found.y - 30), found.h + 60),
  };
  if (clip.width < 50 || clip.height < 20) { p(`[1] ${name}: clip too small, skipping`); continue; }
  await pg.screenshot({ path: `${OUT}/${name}.png`, clip });
  p(`[1] ${name}.png  <- ${slug} :: ${found.text.slice(0, 60)}...`);
}

// (2) figure element shots, both themes
const figPages = [
  ['topic-01', ['fig-U5-1', 'fig-U5-2']],
  ['topic-02', ['fig-U5-3', 'fig-U5-4']],
  ['topic-03', ['fig-U5-5', 'fig-U5-6']],
  ['topic-04', ['fig-U5-7', 'fig-U5-8']],
];
for (const [slug, figs] of figPages) {
  await pg.goto(page(slug), { waitUntil: 'networkidle' });
  for (const fig of figs) {
    const el = pg.locator(`figure:has(img[src*="${fig}.ur.svg"])`).first();
    await el.scrollIntoViewIfNeeded();
    await el.screenshot({ path: `${OUT}/figure-${fig}-ur-light.png` });
    p(`[2] figure-${fig}-ur-light.png (${slug})`);
    await pg.evaluate(() => { document.documentElement.setAttribute('data-theme', 'dark'); });
    await pg.waitForTimeout(300);
    await el.screenshot({ path: `${OUT}/figure-${fig}-ur-dark.png` });
    p(`[2] figure-${fig}-ur-dark.png (${slug})`);
    await pg.evaluate(() => { document.documentElement.setAttribute('data-theme', 'light'); });
  }
}

// (3) print-media emulation over the repaired stance passage
await pg.goto(page('topic-02'), { waitUntil: 'networkidle' });
await pg.emulateMedia({ media: 'print' });
await pg.screenshot({ path: `${OUT}/print-emulation-t2-stance.png`, fullPage: false });
p('[3] print-emulation-t2-stance.png (print media, repaired stance passage page)');
await pg.emulateMedia({ media: null });

await browser.close();
try { process.kill(-server.pid, 'SIGTERM'); } catch { /* already gone */ }
p(`finished ${new Date().toISOString()}`);
writeFileSync(new URL('targeted-shots.log', import.meta.url).pathname, log.join('\n') + '\n');
process.exit(0);
