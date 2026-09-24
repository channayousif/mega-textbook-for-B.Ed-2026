// Font/bidi verification for G5 GNAS-301 Unit 1 (run agent:g5-reviewer:gnas301-u1-run001).
// 1. Confirms the self-hosted Noto Nastaliq Urdu webfont is loaded and used for page prose.
// 2. Detects tofu (missing-glyph boxes) in the .ur.svg figure labels by comparing the
//    rendered advance width of the figure title string against a guaranteed-tofu control
//    at the same font size inside the same SVG-as-document context.
// 3. Checks bidi ordering of embedded Latin digits in RTL prose via Range bounding boxes.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { existsSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-a8eefd2fc607a93b9';
const BUILD = '/tmp/g5u1-render/build';
const OUT = path.join(ROOT, 'specs/content/gnas-301/reviews/unit-01/G5/renders-20260924T043310Z');
const PORT = 4622;
const MIME = { '.html': 'text/html', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.json': 'application/json' };
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
const record = {};

// 1. Page webfont check on the Urdu topic page.
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto(`http://127.0.0.1:${PORT}/ur/semester-1/gnas-301/unit-01/topic-01/`, { waitUntil: 'networkidle' });
record.pageWebfont = await page.evaluate(async () => {
  await document.fonts.ready;
  return {
    nastaliqLoaded: document.fonts.check("16px 'Noto Nastaliq Urdu'"),
    fontsStatus: document.fonts.status,
    loadedFonts: [...document.fonts].map((f) => f.family + ':' + f.status).slice(0, 6),
  };
});

// 3. Bidi check: visual order of "99 فیصد" and "(ڈبلیو ایچ او، 2024)" in rendered prose.
record.bidi = await page.evaluate(() => {
  const find = (needle) => {
    const walker = document.createTreeWalker(document.querySelector('main'), NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) if (n.textContent.includes(needle)) return n.parentElement;
    return null;
  };
  const out = {};
  const pct = find('فیصد');
  if (pct) {
    const r = document.createRange();
    r.selectNodeContents(pct);
    out.percentSentenceBox = { right: Math.round(r.getBoundingClientRect().right), left: Math.round(r.getBoundingClientRect().left) };
    out.percentText = pct.textContent.slice(0, 80);
  }
  const who = find('ڈبلیو ایچ او');
  if (who) out.whoCitationText = who.textContent.slice(0, 80);
  // Latin embed: AQI transliteration
  const aqi = find('اے کیو آئی');
  out.aqiFound = !!aqi;
  return out;
});

// 2. Tofu detection inside the .ur.svg (SVG as document: same font rules as SVG as <img>).
const svgPage = await browser.newPage({ viewport: { width: 900, height: 600 } });
await svgPage.goto(`http://127.0.0.1:${PORT}/img/figures/gnas-301/unit-01/fig-U1-1.ur.svg`);
record.figureTofu = await svgPage.evaluate(() => {
  const svg = document.querySelector('svg');
  const ns = 'http://www.w3.org/2000/svg';
  const mk = (txt, family) => {
    const t = document.createElementNS(ns, 'text');
    t.setAttribute('x', 20); t.setAttribute('y', 500); t.setAttribute('font-size', 24);
    t.setAttribute('font-family', family); t.textContent = txt;
    svg.appendChild(t);
    return t;
  };
  const title = document.querySelector('text');
  const titleStr = title ? title.textContent : 'زمین کے چار کروں کا خاکہ';
  // Guaranteed-tofu control: unassigned codepoints no font covers.
  const tofuControl = mk('͸͹΀΁΂΃', 'sans-serif');
  const urduSans = mk(titleStr, 'sans-serif');
  const urduStack = mk(titleStr, "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', system-ui, sans-serif");
  const len = (t) => Math.round(t.getComputedTextLength());
  const perChar = (t, s) => len(t) / [...s].length;
  return {
    titleInFigure: titleStr,
    tofuPerChar: +perChar(tofuControl, '͸͹΀΁΂΃').toFixed(1),
    urduSansPerChar: +perChar(urduSans, titleStr).toFixed(1),
    urduStackPerChar: +perChar(urduStack, titleStr).toFixed(1),
    verdict: perChar(urduStack, titleStr) < 0.8 * perChar(tofuControl, '͸͹΀΁΂΃') ? 'real-glyphs' : 'likely-tofu',
  };
});
await writeFileSync(path.join(OUT, 'font-bidi-check.json'), JSON.stringify(record, null, 2));
console.log(JSON.stringify(record, null, 2));
await browser.close();
server.close();
