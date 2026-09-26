// G5 render-inspection harness - EFMP-301 Unit 7 (Urdu)
// Renders the production build (localhost:3213) in cached Chromium via playwright-core.
// Passes: desktop 1280x900, narrow 360x780, A4 print 794x1123 (media print),
// plus per-figure SVG geometry measurement (light + dark Urdu variants).
import { chromium } from 'playwright-core';
import { writeFileSync, mkdirSync } from 'node:fs';

const BASE = 'http://localhost:3213';
const OUT = 'specs/content/efmp-301/reviews/unit-07/G5/renders-agent-g5-efmp301-u7-run001';
const LOG = 'specs/content/efmp-301/reviews/unit-07/G5/logs-agent-g5-efmp301-u7-run001';
const EXE = `${process.env.HOME}/.cache/ms-playwright/chromium-1243/chrome-linux-arm64/chrome`;
const PAGES = [
  ['index', '/ur/semester-1/efmp-301/unit-07/'],
  ['topic-01', '/ur/semester-1/efmp-301/unit-07/topic-01/'],
  ['topic-02', '/ur/semester-1/efmp-301/unit-07/topic-02/'],
  ['unit-assessment', '/ur/semester-1/efmp-301/unit-07/unit-assessment/'],
  ['unit-teacher-notes', '/ur/semester-1/efmp-301/unit-07/unit-teacher-notes/'],
];
const FIGS = ['fig-U7-1', 'fig-U7-2', 'fig-U7-3', 'fig-U7-4'];
const report = { started: new Date().toISOString(), browser: EXE, base: BASE, passes: {}, figures: {} };
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ executablePath: EXE, headless: true });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const consoleErrors = [];
page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 300)); });
page.on('pageerror', (e) => consoleErrors.push('PAGEERROR: ' + String(e).slice(0, 300)));

async function overflowCheck() {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const vw = doc.clientWidth;
    const wide = [];
    for (const el of doc.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > vw + 1 || r.left < -1)) {
        const cs = getComputedStyle(el);
        if (cs.position === 'fixed' || cs.display === 'none') continue;
        wide.push(`${el.tagName.toLowerCase()}${el.className && typeof el.className === 'string' ? '.' + el.className.split(' ').slice(0, 2).join('.') : ''} left=${r.left.toFixed(0)} right=${r.right.toFixed(0)}`);
      }
    }
    return { scrollWidth: doc.scrollWidth, clientWidth: vw, wideCount: wide.length, wide: wide.slice(0, 8) };
  });
}

async function rtlAndFontCheck() {
  return page.evaluate(async () => {
    await document.fonts.ready;
    const html = document.documentElement;
    return {
      dir: html.getAttribute('dir'),
      lang: html.getAttribute('lang'),
      nastaliqLoaded: document.fonts.check('16px "Noto Nastaliq Urdu"'),
      bodyFont: getComputedStyle(document.querySelector('article, main, .theme-doc-markdown, body')).fontFamily.slice(0, 80),
    };
  });
}

// ---- Pass 1: desktop 1280x900 -------------------------------------------------
await page.setViewportSize({ width: 1280, height: 900 });
report.passes.desktop = {};
for (const [name, path] of PAGES) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  // scroll through to trigger lazy figures, then back to top
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
  const meta = await rtlAndFontCheck();
  const figs = await page.evaluate(() => [...document.querySelectorAll('img[src*="/img/figures/"]')].map((i) => ({ src: i.getAttribute('src'), complete: i.complete, w: i.naturalWidth, h: i.naturalHeight })));
  await page.screenshot({ path: `${OUT}/desktop-1280-${name}.png` });
  report.passes.desktop[name] = { ...meta, figures: figs };
}
report.passes.desktop.consoleErrors = consoleErrors.splice(0);

// ---- Pass 2: narrow 360x780 ---------------------------------------------------
await page.setViewportSize({ width: 360, height: 780 });
report.passes.narrow = {};
for (const [name, path] of PAGES) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 100)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
  const of = await overflowCheck();
  await page.screenshot({ path: `${OUT}/narrow-360-${name}.png` });
  report.passes.narrow[name] = of;
}
report.passes.narrow.consoleErrors = consoleErrors.splice(0);

// ---- Pass 3: A4 print 794px, media print --------------------------------------
await page.setViewportSize({ width: 794, height: 1123 });
await page.emulateMedia({ media: 'print' });
report.passes.print = {};
for (const [name, path] of PAGES) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 800) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
  const of = await overflowCheck();
  await page.screenshot({ path: `${OUT}/print-a4-${name}.png` });
  report.passes.print[name] = of;
}
await page.emulateMedia({ media: null });
report.passes.print.consoleErrors = consoleErrors.splice(0);

// ---- Pass 4: figure SVG geometry (direct navigation, light + dark) ------------
for (const fig of FIGS) {
  for (const variant of ['ur', 'ur.dark']) {
    const url = `${BASE}/img/figures/efmp-301/unit-07/${fig}.${variant}.svg`;
    await page.goto(url, { waitUntil: 'networkidle' });
    const geo = await page.evaluate(() => {
      const svg = document.documentElement;
      const vb = svg.viewBox.baseVal;
      const out = { viewBox: `${vb.x} ${vb.y} ${vb.width} ${vb.height}`, texts: [], gridVerticals: [], gridHorizontals: [], headerStrip: null, overlaps: [], clipped: [], struck: [] };
      for (const p of svg.querySelectorAll('path.grid')) {
        const d = p.getAttribute('d');
        for (const m of d.matchAll(/M\s*([\d.]+)\s+([\d.]+)V([\d.]+)/g)) out.gridVerticals.push({ x: +m[1], y1: +m[2], y2: +m[3] });
        for (const m of d.matchAll(/M\s*([\d.]+)\s+([\d.]+)H([\d.]+)/g)) out.gridHorizontals.push({ x1: +m[1], x2: +m[3], y: +m[2] });
      }
      for (const ln of svg.querySelectorAll('line.grid')) out.gridVerticals.push({ x: ln.x1.baseVal.value, y1: ln.y1.baseVal.value, y2: ln.y2.baseVal.value });
      const ink = svg.querySelector('path.ink');
      if (ink) out.headerStrip = ink.getAttribute('d');
      const boxes = [];
      for (const t of svg.querySelectorAll('text')) {
        const b = t.getBBox();
        const rec = { text: (t.textContent || '').slice(0, 40), x: +b.x.toFixed(1), y: +b.y.toFixed(1), w: +b.width.toFixed(1), h: +b.height.toFixed(1) };
        boxes.push(rec);
        out.texts.push(rec);
        if (b.x < -0.5 || b.y < -0.5 || b.x + b.width > vb.width + 0.5 || b.y + b.height > vb.height + 0.5) out.clipped.push(rec);
      }
      for (let i = 0; i < boxes.length; i++) for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i], c = boxes[j];
        const ox = Math.min(a.x + a.w, c.x + c.w) - Math.max(a.x, c.x);
        const oy = Math.min(a.y + a.h, c.y + c.h) - Math.max(a.y, c.y);
        if (ox > 2 && oy > 2) out.overlaps.push([a.text, c.text, `ox=${ox.toFixed(0)} oy=${oy.toFixed(0)}`]);
      }
      for (const g of out.gridVerticals) for (const b of boxes) {
        if (g.x > b.x + 1 && g.x < b.x + b.w - 1 && g.y1 < b.y + b.h && g.y2 > b.y) out.struck.push(`x=${g.x} strikes "${b.text}" (bbox ${b.x}..${b.x + b.w})`);
      }
      return out;
    });
    report.figures[`${fig}.${variant}`] = geo;
    if (variant === 'ur') await page.screenshot({ path: `${OUT}/figure-${fig}-ur.png` });
  }
}
report.figures.consoleErrors = consoleErrors.splice(0);
report.completed = new Date().toISOString();
writeFileSync(`${LOG}/render-inspection.json`, JSON.stringify(report, null, 1));
console.log('inspection complete');
await browser.close();
