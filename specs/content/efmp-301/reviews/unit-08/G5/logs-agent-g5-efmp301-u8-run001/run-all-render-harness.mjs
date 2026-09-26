// G5 run001 combined render harness (one window, everything remaining):
//   1. figure-geometry.log - browser-measured text bboxes vs vertical grid
//      dividers for every Urdu figure variant, plus pixel sampling of the
//      fig-U8-5 arrowhead marker in EN and UR.
//   2. render-review.log + page PNGs - the six Urdu Unit 8 pages from the
//      production build served at localhost:3212, at desktop 1280x900,
//      narrow 360x780 and A4 print 794x1123 (titles, dir, overflow, img alts,
//      console errors, table metrics, past-page-box elements, dark variants,
//      heading font stack).
import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync } from 'node:fs';

const root = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-ad57ca9469bfc4572';
const logs = `${root}/specs/content/efmp-301/reviews/unit-08/G5/logs-agent-g5-efmp301-u8-run001`;
const out = `${root}/specs/content/efmp-301/reviews/unit-08/G5/renders-agent-g5-efmp301-u8-run001`;
const base = 'http://localhost:3212';
const exe = '/home/a2ahs/.cache/ms-playwright/chromium-1228/chrome-linux/chrome';
const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });

// ---------- 1. figure geometry ----------
const geo = {};
const gpage = await browser.newPage({ viewport: { width: 780, height: 470 } });
async function measureFig(file) {
  await gpage.goto(`file://${root}/static/img/figures/efmp-301/unit-08/${file}`);
  await gpage.waitForTimeout(150);
  return gpage.evaluate(() => {
    const svg = document.querySelector('svg');
    const vb = svg.viewBox.baseVal;
    const dividers = [];
    for (const p of svg.querySelectorAll('path.grid')) {
      for (const m of (p.getAttribute('d') || '').matchAll(/M\s*(\d+(?:\.\d+)?)\s+\d+V/g)) dividers.push(Number(m[1]));
    }
    const texts = [...svg.querySelectorAll('text')].map((t) => {
      const b = t.getBBox();
      return { text: t.textContent.trim().slice(0, 44), x: +b.x.toFixed(1), right: +(b.x + b.width).toFixed(1), y: +b.y.toFixed(1), h: +b.height.toFixed(1) };
    });
    const crossed = [];
    for (const t of texts) for (const d of dividers) if (d > t.x + 1 && d < t.right - 1) crossed.push({ text: t.text, divider: d, textX: t.x, textRight: t.right, y: t.y });
    const outside = texts.filter((t) => t.x < 0 || t.right > vb.width || t.y < 0 || t.y + t.h > vb.height);
    return { viewBox: `${vb.width}x${vb.height}`, dividers, textCount: texts.length, crossed, outside };
  });
}
for (const f of ['fig-U8-1.ur.svg', 'fig-U8-2.ur.svg', 'fig-U8-3.ur.svg', 'fig-U8-4.ur.svg', 'fig-U8-5.ur.svg', 'fig-U8-6.ur.svg', 'fig-U8-6.ur.dark.svg', 'fig-U8-6.svg']) {
  geo[f] = await measureFig(f);
}
writeFileSync(`${logs}/figure-geometry.log`, JSON.stringify(geo, null, 1));
console.log('figure-geometry.log written (dividers/crossed/outside)');
async function markerPixels(file, x, y) {
  await gpage.goto(`file://${root}/static/img/figures/efmp-301/unit-08/${file}`);
  await gpage.waitForTimeout(150);
  return gpage.evaluate(([x, y]) => {
    const svg = document.querySelector('svg');
    const r = svg.getBoundingClientRect();
    const c = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
    c.width = Math.round(r.width); c.height = Math.round(r.height);
    const ctx = c.getContext('2d');
    ctx.drawImage(svg, 0, 0);
    const cx = Math.round(x * r.width / 780), cy = Math.round(y * r.height / 470);
    const data = ctx.getImageData(cx - 12, cy - 4, 24, 22).data;
    let dark = 0, total = 0;
    for (let i = 0; i < data.length; i += 4) { total++; if (data[i] < 120 && data[i + 1] < 120 && data[i + 2] < 120) dark++; }
    return { dark, total, ratio: +(dark / total).toFixed(3) };
  }, [x, y]);
}
try {
  geo['marker-en@arrow-tip(120,100)'] = await markerPixels('fig-U8-5.svg', 120, 100);
  geo['marker-ur@arrow-tip(660,100)'] = await markerPixels('fig-U8-5.ur.svg', 660, 100);
} catch (e) {
  geo['marker-error'] = String(e).slice(0, 200);
}
await gpage.close();
writeFileSync(`${logs}/figure-geometry.log`, JSON.stringify(geo, null, 1));
console.log('figure-geometry.log written');

// ---------- 2. page renders ----------
mkdirSync(out, { recursive: true });
const pages = [
  ['index', '/semester-1/efmp-301/unit-08/'],
  ['topic-01', '/semester-1/efmp-301/unit-08/topic-01'],
  ['topic-02', '/semester-1/efmp-301/unit-08/topic-02'],
  ['topic-03', '/semester-1/efmp-301/unit-08/topic-03'],
  ['unit-assessment', '/semester-1/efmp-301/unit-08/unit-assessment'],
  ['unit-teacher-notes', '/semester-1/efmp-301/unit-08/unit-teacher-notes'],
];
const record = [];
for (const [name, path] of pages) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 120)); });
  await page.goto(`${base}/ur${path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const desktop = await page.evaluate(() => {
    const de = document.documentElement;
    const imgs = [...document.querySelectorAll('img')].map((i) => ({ src: i.getAttribute('src'), ok: i.complete && i.naturalWidth > 0, alt: (i.alt || '').slice(0, 55) }));
    const h1 = document.querySelector('h1');
    const h1font = h1 ? getComputedStyle(h1).fontFamily : null;
    const bodyfont = getComputedStyle(document.body).fontFamily;
    return { title: document.title, dir: de.dir || document.body.dir, overflowX: de.scrollWidth - de.clientWidth, h1: h1?.textContent, h1font, bodyfont, imgs, headings: [...document.querySelectorAll('h1,h2')].map((h) => h.textContent.trim()).slice(0, 15) };
  });
  await page.screenshot({ path: `${out}/desktop-1280-${name}.png` });
  record.push({ name, view: 'desktop-1280x900', ...desktop, errors });
  await page.setViewportSize({ width: 360, height: 780 });
  await page.waitForTimeout(300);
  const narrow = await page.evaluate(() => {
    const de = document.documentElement;
    const tables = [...document.querySelectorAll('table')].map((t) => ({ sw: t.scrollWidth, cw: t.clientWidth }));
    return { overflowX: de.scrollWidth - de.clientWidth, tables };
  });
  await page.screenshot({ path: `${out}/narrow-360-${name}.png` });
  record.push({ name, view: 'narrow-360x780', ...narrow });
  await page.emulateMedia({ media: 'print' });
  await page.setViewportSize({ width: 794, height: 1123 });
  await page.waitForTimeout(300);
  const print = await page.evaluate(() => {
    const de = document.documentElement;
    const bad = [...document.querySelectorAll('body *')].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.right > 804 || r.left < -10) && getComputedStyle(el).display !== 'none';
    }).slice(0, 5).map((el) => `${el.tagName}.${(el.className || '').toString().split(' ')[0]} right=${el.getBoundingClientRect().right.toFixed(0)}`);
    const darks = [...document.querySelectorAll('img')].filter((i) => /dark\.svg/.test(i.src) && getComputedStyle(i).display !== 'none').map((i) => i.src.split('/').pop());
    return { overflowX: de.scrollWidth - de.clientWidth, pastPageBox: bad, visibleDarkVariants: darks };
  });
  await page.screenshot({ path: `${out}/a4-print-${name}.png` });
  record.push({ name, view: 'a4-print-794x1123', ...print });
  await page.close();
}
writeFileSync(`${logs}/render-review.log`, JSON.stringify(record, null, 1));
console.log('render-review.log written:', record.length, 'entries');
await browser.close();
console.log('ALL DONE');
