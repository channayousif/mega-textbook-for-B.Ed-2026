// G5 run001 page render harness: renders the six Urdu Unit 8 pages from the
// production build served on localhost (BASE env var), at desktop 1280x900,
// narrow 360x780 and A4 print 794x1123, capturing PNGs and the inspection
// record (titles, dir, overflow, image alts, console errors, print overflow).
import { chromium } from 'playwright-core';
import { mkdirSync, writeFileSync } from 'node:fs';

const base = process.env.BASE || 'http://localhost:4319';
const root = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-ad57ca9469bfc4572';
const out = `${root}/specs/content/efmp-301/reviews/unit-08/G5/renders-agent-g5-efmp301-u8-run001`;
mkdirSync(out, { recursive: true });

const pages = [
  ['index', '/semester-1/efmp-301/unit-08/'],
  ['topic-01', '/semester-1/efmp-301/unit-08/topic-01'],
  ['topic-02', '/semester-1/efmp-301/unit-08/topic-02'],
  ['topic-03', '/semester-1/efmp-301/unit-08/topic-03'],
  ['unit-assessment', '/semester-1/efmp-301/unit-08/unit-assessment'],
  ['unit-teacher-notes', '/semester-1/efmp-301/unit-08/unit-teacher-notes'],
];

const exe = '/home/a2ahs/.cache/ms-playwright/chromium-1228/chrome-linux/chrome';
const browser = await chromium.launch({ executablePath: exe, args: ['--no-sandbox'] });
const record = [];

for (const [name, path] of pages) {
  const url = `${base}/ur${path}`;
  // Desktop
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 120)); });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const desktop = await page.evaluate(() => {
    const de = document.documentElement;
    const imgs = [...document.querySelectorAll('img')].map((i) => ({ src: i.getAttribute('src'), ok: i.complete && i.naturalWidth > 0, alt: (i.alt || '').slice(0, 60) }));
    return { title: document.title, dir: de.dir || document.body.dir, overflowX: de.scrollWidth - de.clientWidth, h1: document.querySelector('h1')?.textContent, imgs, headings: [...document.querySelectorAll('h1,h2')].map((h) => h.textContent.trim()).slice(0, 16) };
  });
  await page.screenshot({ path: `${out}/desktop-1280-${name}.png`, fullPage: false });
  record.push({ name, view: 'desktop-1280x900', ...desktop, errors });
  // Narrow 360
  await page.setViewportSize({ width: 360, height: 780 });
  await page.waitForTimeout(300);
  const narrow = await page.evaluate(() => {
    const de = document.documentElement;
    const tables = [...document.querySelectorAll('table')].map((t) => ({ scrollWidth: t.scrollWidth, clientWidth: t.clientWidth }));
    return { overflowX: de.scrollWidth - de.clientWidth, tables };
  });
  await page.screenshot({ path: `${out}/narrow-360-${name}.png`, fullPage: false });
  record.push({ name, view: 'narrow-360x780', ...narrow });
  // A4 print
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
  await page.screenshot({ path: `${out}/a4-print-${name}.png`, fullPage: false });
  record.push({ name, view: 'a4-print-794x1123', ...print });
  await page.emulateMedia({ media: 'screen' });
  await page.close();
}
await browser.close();
writeFileSync(`${root}/specs/content/efmp-301/reviews/unit-08/G5/logs-agent-g5-efmp301-u8-run001/render-review.log`, JSON.stringify(record, null, 1));
console.log('render-review record written:', record.length, 'entries');
