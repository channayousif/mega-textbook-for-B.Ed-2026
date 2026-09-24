// G5 render inspection - GQUR-300 Unit 3 Urdu mirror (run001)
// Drives the local production build (npx docusaurus serve --port 3221) with
// playwright-core + the cached Playwright Chromium, saving screenshots at
// desktop, narrow-mobile and A4-print setups, plus the standalone .ur.svg
// figure variants. Evidence only; no content is modified.
import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = 'http://localhost:3221';
const OUT = 'specs/content/gqur-300/reviews/unit-03/G5/renders-agent-g5-gqur300-u3-run001';
mkdirSync(OUT, { recursive: true });

const pages = [
  ['index', '/ur/semester-1/gqur-300/unit-03/'],
  ['topic-01', '/ur/semester-1/gqur-300/unit-03/topic-01/'],
  ['topic-02', '/ur/semester-1/gqur-300/unit-03/topic-02/'],
  ['topic-03', '/ur/semester-1/gqur-300/unit-03/topic-03/'],
  ['unit-assessment', '/ur/semester-1/gqur-300/unit-03/unit-assessment/'],
  ['unit-teacher-notes', '/ur/semester-1/gqur-300/unit-03/unit-teacher-notes/'],
];

const figs = ['fig-U3-1', 'fig-U3-2', 'fig-U3-3', 'fig-U3-4', 'fig-U3-5', 'fig-U3-6'];

const browser = await chromium.launch();
const notes = [];

async function setup(context, page) {
  // wait for the Nastaliq webfont to be in use before shooting
  await page.evaluate(async () => { if (document.fonts?.ready) await document.fonts.ready; });
}

// 1. Desktop 1280x900
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  for (const [name, path] of pages) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await setup(ctx, page);
    await page.screenshot({ path: `${OUT}/desktop-${name}.png`, fullPage: true });
    const m = await page.evaluate(() => {
      const article = document.querySelector('article') || document.body;
      const p = article.querySelector('p');
      return {
        dir: document.documentElement.dir,
        font: p ? getComputedStyle(p).fontFamily : null,
        title: document.title,
        scrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth,
      };
    });
    notes.push(`desktop ${name}: dir=${m.dir} font=${m.font} scrollW=${m.scrollW} clientW=${m.clientW} overflow=${m.scrollW > m.clientW}`);
  }
  await ctx.close();
}

// 2. Narrow mobile 360x740, dsf 2
{
  const ctx = await browser.newContext({
    viewport: { width: 360, height: 740 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true,
  });
  const page = await ctx.newPage();
  for (const [name, path] of pages) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await setup(ctx, page);
    await page.screenshot({ path: `${OUT}/narrow-${name}.png`, fullPage: true });
    const m = await page.evaluate(() => {
      const de = document.documentElement;
      const clipped = [];
      for (const el of document.querySelectorAll('article *')) {
        const r = el.getBoundingClientRect();
        if (r.width && (r.right > de.clientWidth + 1 || r.left < -1)) {
          const t = (el.textContent || '').trim().slice(0, 40);
          clipped.push(`${el.tagName}.${el.className && String(el.className).slice(0, 30)} "${t}" right=${Math.round(r.right)} left=${Math.round(r.left)}`);
          if (clipped.length >= 8) break;
        }
      }
      return { scrollW: de.scrollWidth, clientW: de.clientWidth, clipped };
    });
    notes.push(`narrow ${name}: scrollW=${m.scrollW} clientW=${m.clientW} overflow=${m.scrollW > m.clientW}\n    clipped: ${m.clipped.join(' | ') || 'none'}`);
  }
  await ctx.close();
}

// 3. A4 print emulation 794x1123, media=print
{
  const ctx = await browser.newContext({ viewport: { width: 794, height: 1123 } });
  const page = await ctx.newPage();
  await page.emulateMedia({ media: 'print' });
  for (const [name, path] of pages) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await setup(ctx, page);
    await page.screenshot({ path: `${OUT}/print-a4-${name}.png`, fullPage: true });
  }
  notes.push('print-a4: all six pages captured at 794x1123 with media=print');
  await ctx.close();
}

// 4. Standalone .ur.svg figure variants at natural rendered width
{
  const ctx = await browser.newContext({ viewport: { width: 900, height: 700 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  for (const f of figs) {
    await page.goto(`${BASE}/img/figures/gqur-300/unit-03/${f}.ur.svg`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/figure-${f}-ur.png`, fullPage: true });
    const m = await page.evaluate(() => {
      const svg = document.querySelector('svg');
      const vb = svg?.getAttribute('viewBox');
      const w = svg?.getBoundingClientRect().width;
      let clipped = 0;
      if (svg) {
        for (const t of svg.querySelectorAll('text')) {
          const r = t.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) clipped++;
        }
      }
      return { vb, w: Math.round(w), zeroSizeText: clipped };
    });
    notes.push(`figure ${f}.ur.svg: viewBox=${m.vb} renderedW=${m.w} zeroSizeText=${m.zeroSizeText}`);
  }
  await ctx.close();
}

await browser.close();
writeFileSync('specs/content/gqur-300/reviews/unit-03/G5/logs-agent-g5-gqur300-u3-run001/render-measurements.txt', notes.join('\n') + '\n');
console.log(notes.join('\n'));
