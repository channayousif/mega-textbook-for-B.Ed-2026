// G5 render inspection for EFMP-301 Unit 11 (Urdu) - agent-g5-efmp301-u11-run001
// Drives the repo's Playwright (bundled Chromium) against the served build on 127.0.0.1:4311.
// Captures: full pages at 1280px, narrow 360px, A4 print emulation, figure elements,
// and each .ur.svg inlined with the site's Nastaliq webfont for label inspection.
import { chromium } from 'playwright';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE = 'http://127.0.0.1:4311';
const UR = `${BASE}/ur/semester-1/efmp-301/unit-11`;
const OUT = 'specs/content/efmp-301/reviews/unit-11/G5/renders-agent-g5-efmp301-u11-run001';
const FIGDIR = 'static/img/figures/efmp-301/unit-11';
const notes = [];
const log = (m) => { notes.push(m); console.log(m); };

const browser = await chromium.launch();
try {
  // ---- 1. Normal viewport (desktop) full-page captures -------------------
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const pages = [
    ['index', `${UR}/`],
    ['topic-01', `${UR}/topic-01`],
    ['topic-02', `${UR}/topic-02`],
    ['unit-assessment', `${UR}/unit-assessment`],
    ['unit-teacher-notes', `${UR}/unit-teacher-notes`],
  ];
  for (const [name, url] of pages) {
    const resp = await page.goto(url, { waitUntil: 'networkidle' });
    log(`GET ${url} -> ${resp.status()}`);
    await page.waitForTimeout(600); // webfont settle
    await page.screenshot({ path: join(OUT, `ur-${name}-1280.png`), fullPage: true });
    log(`saved ur-${name}-1280.png (fullPage)`);
  }

  // figure element captures from the real served pages (SVG behind <img>)
  for (const [name, url] of [['topic-01', `${UR}/topic-01`], ['topic-02', `${UR}/topic-02`]]) {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    const figs = page.locator('figure');
    const n = await figs.count();
    for (let i = 0; i < n; i++) {
      const img = figs.nth(i).locator('img').first();
      const src = await img.getAttribute('src');
      await figs.nth(i).screenshot({ path: join(OUT, `ur-page-${name}-fig${i + 1}.png`) });
      log(`figure ${i + 1} on ${name}: src=${src} -> ur-page-${name}-fig${i + 1}.png`);
    }
  }

  // document scroll overflow check at 1280 (horizontal clipping)
  await page.goto(`${UR}/topic-01`, { waitUntil: 'networkidle' });
  const overflow = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
    dir: getComputedStyle(document.documentElement).direction,
    bodyFont: getComputedStyle(document.body).fontFamily.slice(0, 60),
  }));
  log(`topic-01 document: ${JSON.stringify(overflow)}`);

  // ---- 2. Narrow viewport 360px ------------------------------------------
  const narrow = await browser.newContext({ viewport: { width: 360, height: 800 } });
  const npage = await narrow.newPage();
  for (const [name, url] of [['index', `${UR}/`], ['topic-01', `${UR}/topic-01`], ['topic-02', `${UR}/topic-02`], ['unit-assessment', `${UR}/unit-assessment`]]) {
    const resp = await npage.goto(url, { waitUntil: 'networkidle' });
    await npage.waitForTimeout(500);
    await npage.screenshot({ path: join(OUT, `ur-${name}-360.png`), fullPage: true });
    const ov = await npage.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    log(`narrow ${name}: status=${resp.status()} horizOverflowPx=${ov} -> ur-${name}-360.png`);
  }
  await narrow.close();

  // ---- 3. A4 print emulation ---------------------------------------------
  await page.emulateMedia({ media: 'print' });
  for (const [name, url] of [['topic-01', `${UR}/topic-01`], ['unit-assessment', `${UR}/unit-assessment`]]) {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: join(OUT, `ur-${name}-a4print.png`), fullPage: true });
    await page.pdf({ path: join(OUT, `ur-${name}-a4print.pdf`), format: 'A4', printBackground: true });
    log(`A4 print capture: ur-${name}-a4print.png + .pdf`);
  }
  await page.emulateMedia({ media: null });
  await ctx.close();

  // ---- 4. Figure SVGs inlined with the site Nastaliq webfont -------------
  // The served pages load SVGs behind <img>, which cannot fetch the page
  // webfont; this harness inlines the same SVG bytes into the DOM so the
  // labels render in Noto Nastaliq Urdu exactly as the site styles prose.
  const fontCss = readFileSync('src/css/custom.css', 'utf8');
  const fontFace = /@font-face\s*\{[^}]*NotoNastaliq[^}]*\}/.exec(fontCss)?.[0] ?? '';
  const figCtx = await browser.newContext({ viewport: { width: 820, height: 520 } });
  const fpage = await figCtx.newPage();
  const figs = ['fig-U11-1', 'fig-U11-2', 'fig-U11-3', 'fig-U11-4'];
  for (const fig of figs) {
    for (const [variant, file] of [['ur', `${fig}.ur.svg`], ['ur.dark', `${fig}.ur.dark.svg`], ['en', `${fig}.svg`]]) {
      const svg = readFileSync(join(FIGDIR, file), 'utf8');
      const html = `<!doctype html><html><head><meta charset="utf-8"><style>
        ${fontFace}
        body{margin:0;padding:10px;background:${variant.includes('dark') ? '#1b1b1d' : '#fff'}}
        svg{width:780px;height:470px}
        </style></head><body>${svg}</body></html>`;
      await fpage.setContent(html, { waitUntil: 'networkidle' });
      await fpage.waitForTimeout(500);
      const shot = `fig-${fig}.${variant}-nastaliq.png`;
      await fpage.screenshot({ path: join(OUT, shot) });
      log(`inlined ${fig}.${variant} -> ${shot}`);
    }
  }
  await figCtx.close();
} finally {
  await browser.close();
}
writeFileSync('specs/content/efmp-301/reviews/unit-11/G5/logs-agent-g5-efmp301-u11-run001/render-review.log',
  `G5 render inspection - agent-g5-efmp301-u11-run001\nHost: this worktree; browser: Playwright bundled Chromium (headless), playwright 1.61.1\nServer: npm run serve on 127.0.0.1:4311 serving the fresh build (build.log)\nViewports: 1280x900 desktop, 360x800 narrow, A4 print emulation (media=print + page.pdf)\nFigure labels inspected via DOM-inlined SVG with the site Noto Nastaliq Urdu webfont\n(system has no Nastaliq font; <img>-embedded SVG falls back to DejaVu/FreeSerif Arabic)\n\n${notes.join('\n')}\n`);
console.log('DONE');
