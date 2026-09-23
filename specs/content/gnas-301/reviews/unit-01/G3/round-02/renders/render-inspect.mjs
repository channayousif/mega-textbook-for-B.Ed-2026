// G3 round-2 render inspection for GNAS-301 Unit 1 (advisory evidence, ADR-0019).
// Serves the fresh build/ and inspects all 7 English pages at desktop, 360px narrow
// and A4 print emulation. Measures the scrolling element itself (the <table>), per
// the G3 rubric, and records keyboard-reachability attributes from hydration.
import { createServer } from 'node:http';
import { readFile, writeFile, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const BUILD = path.join(ROOT, 'build');
const OUT = path.join(ROOT, 'specs/content/gnas-301/reviews/unit-01/G3/round-02/renders');
const PORT = 4611;
const BASE = `http://127.0.0.1:${PORT}`;
const PAGES = [
  ['index', '/semester-1/gnas-301/unit-01/'],
  ['topic-01', '/semester-1/gnas-301/unit-01/topic-01/'],
  ['topic-02', '/semester-1/gnas-301/unit-01/topic-02/'],
  ['topic-03', '/semester-1/gnas-301/unit-01/topic-03/'],
  ['topic-04', '/semester-1/gnas-301/unit-01/topic-04/'],
  ['unit-assessment', '/semester-1/gnas-301/unit-01/unit-assessment/'],
  ['unit-teacher-notes', '/semester-1/gnas-301/unit-01/unit-teacher-notes/'],
];
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.json': 'application/json', '.woff2': 'font/woff2', '.txt': 'text/plain' };

const server = createServer(async (req, res) => {
  try {
    let p = decodeURIComponent(new URL(req.url, BASE).pathname);
    let file = path.join(BUILD, p);
    const st = await stat(file).catch(() => null);
    if (!st) file = path.join(BUILD, p, 'index.html');
    else if (st.isDirectory()) file = path.join(file, 'index.html');
    if (!existsSync(file)) { res.writeHead(404); res.end('not found'); return; }
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch (e) { res.writeHead(500); res.end(String(e)); }
});
await new Promise((r) => server.listen(PORT, '127.0.0.1', r));

const browser = await chromium.launch();
const results = { host: BASE, served_from: 'build/ (fresh npm run build, this attempt)', pages: [] };
const log = [];
const say = (m) => { log.push(m); console.log(m); };

say(`browser: chromium ${browser.version()} (playwright)`);
say(`host: ${BASE} (node static server over build/)`);

for (const [name, route] of PAGES) {
  const url = BASE + route;
  const rec = { name, url, defects: [] };

  // ---- desktop 1280x900 ----
  const d = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await d.goto(url, { waitUntil: 'networkidle' });
  const dImg = await d.evaluate(() => {
    const imgs = [...document.querySelectorAll('main img')];
    return imgs.map((i) => {
      const cs = getComputedStyle(i);
      const visible = cs.display !== 'none' && cs.visibility !== 'hidden';
      return { src: i.getAttribute('src'), alt: i.getAttribute('alt'), complete: i.complete, nw: i.naturalWidth, visible };
    });
  });
  for (const i of dImg) {
    if (!i.alt || !i.alt.trim()) rec.defects.push(`desktop: image without alt: ${i.src}`);
    // The Figure component renders a display:none lazy dark twin in light mode
    // (src/components/Figure.tsx); only a VISIBLE unloaded image is broken.
    if (i.visible && (!i.complete || i.nw === 0)) rec.defects.push(`desktop: broken image: ${i.src}`);
  }
  const dHead = await d.evaluate(() => {
    const hs = [...document.querySelectorAll('main h1, main h2, main h3, main h4, main h5, main h6')];
    let skips = [];
    for (let i = 1; i < hs.length; i++) {
      const a = +hs[i - 1].tagName[1], b = +hs[i].tagName[1];
      if (b - a > 1) skips.push(`${hs[i - 1].tagName} -> ${hs[i].tagName} at "${hs[i].textContent.trim().slice(0, 40)}"`);
    }
    return { count: hs.length, skips, title: document.title };
  });
  for (const s of dHead.skips) rec.defects.push(`desktop: skipped heading level: ${s}`);
  // figure order check for topic-01 (the round-1 repair): which figure follows the scope prose
  if (name === 'topic-01') {
    const order = await d.evaluate(() => {
      const main = document.querySelector('main article') || document.querySelector('main');
      // document-order walk over paragraphs and figures, whatever the nesting
      const nodes = [...main.querySelectorAll('p, figure')];
      const seq = nodes.map((el) => (el.tagName === 'FIGURE'
        ? { kind: 'fig', src: (el.querySelector('img') || {}).getAttribute?.('src') }
        : { kind: 'p', text: el.textContent.replace(/\s+/g, ' ') }));
      const idxOf = (text) => seq.findIndex((n) => n.kind === 'p' && n.text.includes(text));
      const nextFigAfter = (idx) => { for (let j = idx + 1; j < seq.length; j++) if (seq[j].kind === 'fig') return seq[j].src; return null; };
      const scopeIdx = idxOf('The table below shows each area');
      const spheresIdx = idxOf('The figure below gathers the four spheres');
      return {
        figs: seq.filter((n) => n.kind === 'fig').map((n) => n.src),
        scopeNextFig: scopeIdx >= 0 ? nextFigAfter(scopeIdx) : 'scope paragraph not found',
        spheresNextFig: spheresIdx >= 0 ? nextFigAfter(spheresIdx) : 'spheres sentence not found',
        spheresBeforeItsFig: spheresIdx >= 0 ? null : null,
      };
    });
    rec.topic01FigureOrder = order;
    if (!/fig-U1-2/.test(order.scopeNextFig || '')) rec.defects.push(`topic-01: figure after scope prose is ${order.scopeNextFig}, expected fig-U1-2`);
    say(`topic-01 figure order: all=${order.figs.join(', ')} | after scope prose=${order.scopeNextFig} | next fig after "figure below" sentence=${order.spheresNextFig}`);
  }
  await d.screenshot({ path: path.join(OUT, `desktop-${name}.png`), fullPage: true });
  await d.close();

  // ---- narrow 360x780 ----
  const n = await browser.newPage({ viewport: { width: 360, height: 780 } });
  await n.goto(url, { waitUntil: 'networkidle' });
  const nData = await n.evaluate(() => {
    const doc = document.documentElement;
    const out = { docOverflowX: doc.scrollWidth - doc.clientWidth, tables: [], figures: [] };
    for (const t of document.querySelectorAll('main table')) {
      const r = t.getBoundingClientRect();
      out.tables.push({
        clientWidth: t.clientWidth, scrollWidth: t.scrollWidth,
        overflows: t.scrollWidth > t.clientWidth + 1,
        rightPastViewport: r.right > window.innerWidth + 1,
        tabindex: t.getAttribute('tabindex'), role: t.getAttribute('role'), ariaLabel: t.getAttribute('aria-label'),
      });
    }
    for (const f of document.querySelectorAll('main figure')) {
      const r = f.getBoundingClientRect();
      out.figures.push({ right: Math.round(r.right), fits: r.right <= window.innerWidth + 1 });
    }
    return out;
  });
  if (nData.docOverflowX > 1) rec.defects.push(`narrow360: document horizontal overflow ${nData.docOverflowX}px`);
  for (const t of nData.tables) {
    if (t.overflows && t.rightPastViewport && t.tabindex === null) rec.defects.push(`narrow360: overflowing table without keyboard attrs (tabindex/role/aria-label)`);
  }
  for (let i = 0; i < nData.figures.length; i++) {
    if (!nData.figures[i].fits) rec.defects.push(`narrow360: figure ${i + 1} extends past viewport (right=${nData.figures[i].right})`);
  }
  rec.narrow360 = nData;
  say(`narrow360 ${name}: docOverflowX=${nData.docOverflowX}, tables=${JSON.stringify(nData.tables.map((t) => ({ c: t.clientWidth, s: t.scrollWidth, kb: t.tabindex !== null })))}, figuresFit=${nData.figures.every((f) => f.fits)}`);
  await n.screenshot({ path: path.join(OUT, `narrow360-${name}.png`), fullPage: true });
  await n.close();

  // ---- A4 print emulation ----
  const p = await browser.newPage({ viewport: { width: 794, height: 1123 } });
  await p.emulateMedia({ media: 'print' });
  await p.goto(url, { waitUntil: 'networkidle' });
  const printData = await p.evaluate(() => {
    const clipped = [];
    for (const el of document.querySelectorAll('main figure, main table, main img')) {
      const r = el.getBoundingClientRect();
      if (r.right > 794 + 1 || r.left < -1) clipped.push(`${el.tagName}.${el.className && el.className.toString().slice(0, 20)} right=${Math.round(r.right)}`);
    }
    return { clipped, hasPrintHandout: !!document.querySelector('[data-print-handout], .print-handout') };
  });
  for (const c of printData.clipped) rec.defects.push(`printA4: clipped element: ${c}`);
  await p.pdf({ path: path.join(OUT, `print-a4-${name}.pdf`), format: 'A4', printBackground: true });
  rec.printA4 = { clippedCount: printData.clipped.length };
  say(`printA4 ${name}: clippedElems=${printData.clipped.length}`);
  await p.close();

  results.pages.push(rec);
}

// ---- dark-mode figure variant check on topic-01 (both committed variants must load) ----
{
  const d = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await d.goto(BASE + '/semester-1/gnas-301/unit-01/topic-01/', { waitUntil: 'networkidle' });
  await d.evaluate(() => document.documentElement.setAttribute('data-theme', 'dark'));
  await d.waitForTimeout(600);
  const dark = await d.evaluate(async () => {
    const out = [];
    for (const i of document.querySelectorAll('main img')) {
      const cs = getComputedStyle(i);
      const visible = cs.display !== 'none';
      if (visible && (!i.complete || i.naturalWidth === 0)) out.push(`dark: visible broken image: ${i.getAttribute('src')}`);
    }
    return out;
  });
  results.darkModeTopic01 = { brokenVisible: dark };
  for (const b of dark) results.pages.find((p) => p.name === 'topic-01').defects.push(b);
  await d.screenshot({ path: path.join(OUT, 'dark-topic-01.png'), fullPage: true });
  say(`dark-mode topic-01: visible broken images=${dark.length ? dark.join('; ') : 'none'}`);
  await d.close();
}

const withDefects = results.pages.filter((r) => r.defects.length);
say(`\ndefects: ${withDefects.length === 0 ? 'NONE' : ''}`);
for (const r of withDefects) for (const dcl of r.defects) say(`  DEFECT ${r.name}: ${dcl}`);

await browser.close();
server.close();
await writeFile(path.join(OUT, 'render-inspect.json'), JSON.stringify(results, null, 2));
await writeFile(path.join(OUT, 'render-inspect.log'), log.join('\n') + '\n');
console.log('done');
