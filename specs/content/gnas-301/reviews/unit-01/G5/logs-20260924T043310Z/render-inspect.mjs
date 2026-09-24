// G5 Urdu render inspection for GNAS-301 Unit 1 (run agent:g5-reviewer:gnas301-u1-run001).
// Serves the scratch-copy build (bound inputs byte-identical; only two out-of-scope
// syntax patches, see build-scratch-copy.log) and captures desktop / narrow-360 /
// A4-print screenshots plus DOM bidi, font, figure and overflow checks.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-a8eefd2fc607a93b9';
const BUILD = '/tmp/g5u1-render/build';
const OUT = path.join(ROOT, 'specs/content/gnas-301/reviews/unit-01/G5/renders-20260924T043310Z');
const PORT = 4621;
const BASE = `http://127.0.0.1:${PORT}/ur/semester-1/gnas-301/unit-01/`;
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.json': 'application/json', '.woff2': 'font/woff2', '.txt': 'text/plain' };

mkdirSync(OUT, { recursive: true });
const server = createServer(async (req, res) => {
  try {
    const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(BUILD, p);
    const st = await stat(file).catch(() => null);
    if (!st) file = path.join(BUILD, p, 'index.html');
    else if (st.isDirectory()) file = path.join(file, 'index.html');
    if (!existsSync(file)) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(await readFile(file));
  } catch (e) { res.writeHead(500); res.end(String(e)); }
});
await new Promise((r) => server.listen(PORT, '127.0.0.1', r));

const browser = await chromium.launch();
const record = { started_at: new Date().toISOString(), base: BASE, viewports: {}, checks: {} };

const domChecks = async (page, label) => {
  return await page.evaluate(() => {
    const html = document.documentElement;
    const body = getComputedStyle(document.body);
    const imgs = [...document.querySelectorAll('figure img, img')].map((i) => ({
      src: i.getAttribute('src'), loaded: i.complete && i.naturalWidth > 0, alt: (i.getAttribute('alt') || '').slice(0, 60),
    }));
    const overflowX = document.documentElement.scrollWidth - window.innerWidth;
    const clipped = [...document.querySelectorAll('main *')].filter((el) => {
      const cs = getComputedStyle(el);
      return cs.overflowX !== 'visible' && el.scrollWidth > el.clientWidth + 2;
    }).slice(0, 5).map((el) => el.tagName + '.' + String(el.className).slice(0, 30));
    const tables = [...document.querySelectorAll('table')].map((t) => ({ dir: getComputedStyle(t).direction, rows: t.rows.length }));
    const nastaliq = [...new Set([...document.querySelectorAll('main p, main li, main h1, main h2, main h3')].slice(0, 8).map((el) => getComputedStyle(el).fontFamily.split(',')[0]))];
    return {
      dir: html.getAttribute('dir'), lang: html.getAttribute('lang'),
      bodyFont: body.fontFamily.split(',').slice(0, 2).join(','),
      mainDirection: getComputedStyle(document.querySelector('main') || body).direction,
      nastaliq, overflowX, clipped, tables, imgs,
      title: document.title.slice(0, 60),
    };
  }).then((r) => { record.checks[label] = r; return r; });
};

// Desktop 1280x800
const desktop = await browser.newPage({ viewport: { width: 1280, height: 800 } });
for (const [name, route] of [
  ['index', ''], ['topic-01', 'topic-01/'], ['topic-02', 'topic-02/'], ['topic-03', 'topic-03/'],
  ['topic-04', 'topic-04/'], ['unit-assessment', 'unit-assessment/'], ['unit-teacher-notes', 'unit-teacher-notes/'],
]) {
  await desktop.goto(BASE + route, { waitUntil: 'networkidle' });
  await desktop.screenshot({ path: path.join(OUT, `desktop-${name}.png`), fullPage: true });
  await domChecks(desktop, `desktop-${name}`);
}
const desktop2 = await browser.newPage({ viewport: { width: 1280, height: 800 } });
// Figure element shots (Urdu variants) from topic pages. Figures are lazy-loaded
// (Spec 009), so scroll each into view and wait for it to become visible first.
const shootFigures = async (page, route, wanted) => {
  await page.goto(BASE + route, { waitUntil: 'networkidle' });
  for (const fig of await page.$$('figure img')) {
    const src = await fig.getAttribute('src');
    const hit = wanted.find(([needle]) => src?.includes(needle));
    if (!hit) continue;
    await fig.scrollIntoViewIfNeeded().catch(() => {});
    await fig.waitForElementState('visible').catch(() => {});
    await page.waitForTimeout(700);
    await fig.screenshot({ path: path.join(OUT, hit[1]) }).catch((e) => console.log('figure shot failed', src, e.message));
  }
};
await shootFigures(desktop2, 'topic-01/', [['fig-U1-1', 'figure-fig-U1-1-ur.png'], ['fig-U1-2', 'figure-fig-U1-2-ur.png']]);
await shootFigures(desktop2, 'topic-04/', [['fig-U1-7', 'figure-fig-U1-7-ur.png'], ['fig-U1-8', 'figure-fig-U1-8-ur.png']]);
await desktop2.close();
await desktop.close();

// Narrow 360x800
const narrow = await browser.newPage({ viewport: { width: 360, height: 800 } });
for (const [name, route] of [
  ['index', ''], ['topic-01', 'topic-01/'], ['topic-03', 'topic-03/'], ['unit-assessment', 'unit-assessment/'],
]) {
  await narrow.goto(BASE + route, { waitUntil: 'networkidle' });
  await narrow.screenshot({ path: path.join(OUT, `narrow360-${name}.png`), fullPage: true });
  await domChecks(narrow, `narrow360-${name}`);
}
await narrow.close();

// A4 print emulation 794x1123
const print = await browser.newPage({ viewport: { width: 794, height: 1123 } });
await print.emulateMedia({ media: 'print' });
for (const [name, route] of [
  ['topic-01', 'topic-01/'], ['unit-assessment', 'unit-assessment/'], ['unit-teacher-notes', 'unit-teacher-notes/'],
]) {
  await print.goto(BASE + route, { waitUntil: 'networkidle' });
  await print.screenshot({ path: path.join(OUT, `print-a4-${name}.png`), fullPage: true });
  await domChecks(print, `print-a4-${name}`);
}
await print.close();

record.completed_at = new Date().toISOString();
await readFile('/dev/null'); // no-op keep imports honest
const { writeFileSync } = await import('node:fs');
writeFileSync(path.join(OUT, 'render-inspect.json'), JSON.stringify(record, null, 2));
console.log('renders + inspection record written to', OUT);
await browser.close();
server.close();
