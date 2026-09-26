// G5 render-inspection harness - EFMP-301 Unit 9 (Urdu)
// Renders the production build (localhost:3217) in cached Chromium via playwright-core.
// Passes: desktop 1280x900, narrow 360x780, A4 print 794x1123 (media print),
// per-figure SVG geometry (light + dark), and a Nastaliq-font-injected measurement
// pass (same-origin webfont loaded into the top-level SVG document) so text bbox
// clipping/divider crossings are measured with the production font, not the host
// fallback. fig-U9-4 hole positions are measured against target group centres.
import { chromium } from 'playwright-core';
import { writeFileSync, mkdirSync } from 'node:fs';

const BASE = 'http://localhost:3217';
const OUT = 'specs/content/efmp-301/reviews/unit-09/G5/renders-agent-g5-efmp301-u9-run001';
const LOG = 'specs/content/efmp-301/reviews/unit-09/G5/logs-agent-g5-efmp301-u9-run001';
const EXE = `${process.env.HOME}/.cache/ms-playwright/chromium-1243/chrome-linux-arm64/chrome`;
const PAGES = [
  ['index', '/ur/semester-1/efmp-301/unit-09/'],
  ['topic-01', '/ur/semester-1/efmp-301/unit-09/topic-01/'],
  ['topic-02', '/ur/semester-1/efmp-301/unit-09/topic-02/'],
  ['topic-03', '/ur/semester-1/efmp-301/unit-09/topic-03/'],
  ['unit-assessment', '/ur/semester-1/efmp-301/unit-09/unit-assessment/'],
  ['unit-teacher-notes', '/ur/semester-1/efmp-301/unit-09/unit-teacher-notes/'],
];
const FIGS = ['fig-U9-1', 'fig-U9-2', 'fig-U9-3', 'fig-U9-4', 'fig-U9-5', 'fig-U9-6'];
const report = { started: new Date().toISOString(), browser: EXE, base: BASE, passes: {}, figures: {}, nastaliq: {} };
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
const GEO_FN = () => {
  const svg = document.documentElement;
  const vb = svg.viewBox.baseVal;
  const out = { viewBox: `${vb.x} ${vb.y} ${vb.width} ${vb.height}`, texts: [], gridVerticals: [], gridHorizontals: [], headerStrip: null, overlaps: [], clipped: [], struck: [], targets: [] };
  for (const p of svg.querySelectorAll('path.grid')) {
    const d = p.getAttribute('d');
    for (const m of d.matchAll(/M\s*([\d.]+)\s+([\d.]+)V([\d.]+)/g)) out.gridVerticals.push({ x: +m[1], y1: +m[2], y2: +m[3] });
    for (const m of d.matchAll(/M\s*([\d.]+)\s+([\d.]+)H([\d.]+)/g)) out.gridHorizontals.push({ x1: +m[1], x2: +m[3], y: +m[2] });
  }
  const ink = svg.querySelector('path.ink');
  if (ink) out.headerStrip = ink.getAttribute('d');
  // target groups with holes (fig-U9-4 family): g[transform] containing circle.ink
  for (const g of svg.querySelectorAll('g[transform]')) {
    const holes = [...g.querySelectorAll('circle.ink')].map((c) => ({ cx: c.cx.baseVal.value, cy: c.cy.baseVal.value }));
    if (holes.length) {
      const m = /translate\(\s*([\d.-]+)\s*,\s*([\d.-]+)\s*\)/.exec(g.getAttribute('transform'));
      if (m) out.targets.push({ gx: +m[1], gy: +m[2], holes, holesAbsX: holes.map((h) => +(h.cx + +m[1]).toFixed(1)) });
    }
  }
  const boxes = [];
  for (const t of svg.querySelectorAll('text')) {
    if (!t.textContent || !t.textContent.trim()) continue;
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
};
for (const fig of FIGS) {
  for (const variant of ['ur', 'ur.dark']) {
    const url = `${BASE}/img/figures/efmp-301/unit-09/${fig}.${variant}.svg`;
    await page.goto(url, { waitUntil: 'networkidle' });
    const geo = await page.evaluate(GEO_FN);
    report.figures[`${fig}.${variant}`] = geo;
    if (variant === 'ur') await page.screenshot({ path: `${OUT}/figure-${fig}-ur.png` });
  }
}
report.figures.consoleErrors = consoleErrors.splice(0);

// ---- Pass 5: Nastaliq-injected measurement (light variants) --------------------
// Load the same-origin site webfont into the top-level SVG document, wait for it,
// then re-measure: Nastaliq is wider/taller than any host fallback, so this is the
// production-faithful measurement for clipping and divider crossings.
for (const fig of FIGS) {
  const url = `${BASE}/img/figures/efmp-301/unit-09/${fig}.ur.svg`;
  await page.goto(url, { waitUntil: 'networkidle' });
  const loaded = await page.evaluate(async () => {
    const st = document.createElementNS('http://www.w3.org/2000/svg', 'style');
    st.textContent = "@font-face{font-family:'Noto Nastaliq Urdu';src:url('/fonts/NotoNastaliqUrdu-Regular.woff2') format('woff2');font-display:block;}";
    document.documentElement.appendChild(st);
    try { await document.fonts.load('16px "Noto Nastaliq Urdu"'); } catch (e) { return 'load-error:' + String(e).slice(0, 80); }
    await document.fonts.ready;
    return document.fonts.check('16px "Noto Nastaliq Urdu"') ? 'loaded' : 'not-loaded';
  });
  await page.waitForTimeout(300);
  const geo = await page.evaluate(GEO_FN);
  report.nastaliq[`${fig}.ur`] = { font: loaded, ...geo };
}
report.nastaliq.consoleErrors = consoleErrors.splice(0);

report.completed = new Date().toISOString();
writeFileSync(`${LOG}/render-inspection.json`, JSON.stringify(report, null, 1));
console.log('inspection complete');
await browser.close();
