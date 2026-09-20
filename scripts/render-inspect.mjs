#!/usr/bin/env node
/**
 * Rendered-page inspection for a single unit, as G3 evidence.
 *
 * WHY THIS EXISTS. `review-unit/SKILL.md` requires that a reviewer "inspect
 * actual rendered pages and print views" and states plainly that "a successful
 * build is not visual inspection". Every G3 run so far has met that by
 * hand-writing its own Playwright driver into its own evidence folder. There
 * are eight of them under specs/content/efmp-302/reviews/** - render-inspect.mjs,
 * render-inspect.cjs, render-inspect-run005.mjs, render-review.mjs,
 * render-crops-run005.mjs - 697 lines of near-duplicate code with hardcoded
 * absolute paths and ad-hoc ports (3103, 4599), rewritten for roughly thirty
 * review runs. This is that code, parameterised once.
 *
 * DELIBERATELY NOT A GATE. `scripts/measure-figure-text.mjs` explains the
 * reason in its own header and it applies here with more force: the gate
 * scripts are hashed review-entry inputs, so putting a browser dependency on
 * the gate path would stale every accepted review manifest. This runs on
 * demand, during a review, and its output is cited as an evidence artifact.
 *
 * WHAT IT MEASURES, and why each check is here rather than invented:
 *   A. desktop 1280x900 - heading order, img alt/naturalSize, bare-URL links
 *   B. narrow 360x780   - document overflow, and the scroll container ITSELF.
 *                         Three separate reviews reported a wide table as
 *                         unreachable at 360px and all three measured the
 *                         wrapping div.theme-doc-markdown instead of the
 *                         <table>, which is the actual scroller. This walks
 *                         both and reports which one scrolls.
 *   C. A4 print 794px   - clipped elements and figures, per the handout flow
 *   D. SVG geometry     - text past the viewBox or overprinting the wordmark.
 *                         Five of thirty-four SVGs overflowed their viewBox and
 *                         a caption overprinted a wordmark; check:figures
 *                         measures no glyph geometry and passed all of it.
 *
 * USAGE
 *   node scripts/render-inspect.mjs EFMP-302 2 [options]
 *     --out DIR      artifact directory (default: specs/content/<course>/reviews/unit-NN/renders-<stamp>)
 *     --base URL     inspect an already-running server instead of starting one
 *     --locale ur    inspect the Urdu mirror (prefixes /ur)
 *     --port N       port to serve on when starting one (default 4599)
 *     --no-pdf       skip PDF emission, keep the print-media measurements
 *
 * Exits 1 when a hard defect is found, 0 when clean. Advisory observations
 * never affect the exit code: a reviewer reads the log, the exit code only
 * says whether something is certainly wrong.
 */
import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { resolveUnit } from './lib/content-roots.mjs';
import { readManifest } from './lib/figure-manifest.mjs';

const root = resolve(process.env.CONTENT_ROOT || '.');
const argv = process.argv.slice(2);
const flag = (name, fallback = null) => {
  const i = argv.indexOf(`--${name}`);
  return i === -1 ? fallback : argv[i + 1];
};
const has = (name) => argv.includes(`--${name}`);

/** Positionals are the args that are neither a flag nor a flag's value. */
const VALUE_FLAGS = new Set(['--out', '--base', '--locale', '--port']);
const positional = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i].startsWith('--')) { if (VALUE_FLAGS.has(argv[i])) i++; continue; }
  positional.push(argv[i]);
}
const [courseArg, unitArg] = positional;
if (!courseArg || !unitArg) {
  console.error('Usage: node scripts/render-inspect.mjs COURSE UNIT [--out DIR] [--base URL] [--locale ur] [--port N] [--no-pdf]');
  process.exit(2);
}

const unit = resolveUnit(root, courseArg, unitArg);
const unitNN = String(unit.unitNo).padStart(2, '0');
const locale = flag('locale', '');
const port = Number(flag('port', '4599'));
/** A4 at 96dpi in CSS pixels, the width the print stylesheet lays out against. */
const A4_LIMIT = 794;

const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z');
const outDir = resolve(root, flag('out',
  `specs/content/${unit.courseFolder}/reviews/unit-${unitNN}/renders-${stamp}`));
mkdirSync(outDir, { recursive: true });

/* ---------- page + figure discovery, from disk rather than a hardcoded list ---------- */

/** Route path for this unit, honouring the track's routeBasePath (Feature 015). */
function unitRoute() {
  const localePrefix = locale ? `/${locale}` : '';
  const trackPrefix = unit.track.routeBasePath === '/' ? '' : unit.track.routeBasePath;
  const group = unit.trackDir ? `/${unit.trackDir}` : '';
  return `${localePrefix}${trackPrefix}${group}/${unit.courseFolder}/unit-${unitNN}`;
}

/** Page slugs in reading order: index first, then topics ascending, then the rest. */
function unitPages() {
  const files = readdirSync(unit.unitDir).filter((f) => f.endsWith('.mdx'));
  const slugs = files.map((f) => f.replace(/\.mdx$/, ''));
  const topics = slugs.filter((s) => /^topic-\d+$/.test(s)).sort();
  const tail = slugs.filter((s) => s !== 'index' && !/^topic-\d+$/.test(s)).sort();
  return [...(slugs.includes('index') ? [''] : []), ...topics, ...tail];
}

/** Placed figure ids for this unit, from the manifest rather than a guessed range. */
function unitFigures() {
  const file = join(root, 'specs', 'content', unit.courseFolder, 'figures', `unit-${unitNN}.md`);
  if (!existsSync(file)) return [];
  return readManifest(file)
    .filter((r) => r.status === 'placed')
    .map((r) => ({ id: r.id, kind: r.kind }));
}

const pages = unitPages();
const figures = unitFigures();

/* ---------- log plumbing ---------- */

const lines = [];
const defects = [];
const say = (...a) => { const s = a.join(' '); lines.push(s); console.log(s); };
const defect = (where, what) => { defects.push(`${where}: ${what}`); say(`   DEFECT ${what}`); };
const label = (slug) => slug === '' ? 'index' : slug;

/* ---------- optionally start our own server ---------- */

let server = null;
let base = flag('base');
if (!base) {
  base = `http://127.0.0.1:${port}`;
  // `docusaurus serve`, never `start`. The dev server renders ONE locale per
  // process, so every RTL assertion against a dev server silently sees English
  // with dir="ltr" - the reason playwright.config.ts also insists on a build.
  say(`### starting: npm run serve -- --port ${port}`);
  server = spawn('npm', ['run', 'serve', '--', '--port', String(port), '--no-open'],
    { cwd: root, stdio: 'ignore', detached: true });
  const deadline = Date.now() + 180_000;
  let up = false;
  while (Date.now() < deadline && !up) {
    await new Promise((r) => setTimeout(r, 2000));
    try { up = (await fetch(base, { method: 'HEAD' })).ok; } catch { /* not yet */ }
  }
  if (!up) {
    if (server.pid) process.kill(-server.pid, 'SIGTERM');
    console.error(`Server did not come up on ${base} within 180s. Is there a build? Run: npm run build`);
    process.exit(2);
  }
}

const url = (slug) => `${base}${unitRoute()}${slug ? `/${slug}` : ''}/`;

/* ---------- inspection ---------- */

const browser = await chromium.launch();
say(`### render-inspect  ${unit.courseCode} Unit ${unit.unitNo}${locale ? ` (${locale})` : ''}`);
say(`### route: ${unitRoute()}  pages: ${pages.length}  placed figures: ${figures.length}`);
say(`### host: ${base}   browser: chromium ${browser.version()}`);
say(`### started: ${new Date().toISOString()}`);

/* ===== A. DESKTOP ===== */
say('\n===== A. DESKTOP 1280x900 =====');
let ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
let pg = await ctx.newPage();
for (const slug of pages) {
  const name = label(slug);
  const response = await pg.goto(url(slug), { waitUntil: 'networkidle' });
  if (!response?.ok()) { say(`\n-- ${name}: HTTP ${response?.status()}`); defect(name, `page did not load (HTTP ${response?.status()})`); continue; }
  const d = await pg.evaluate(() => {
    const hs = [...document.querySelectorAll('main h1,main h2,main h3,main h4')]
      .map((h) => ({ level: +h.tagName[1], text: h.textContent.trim().slice(0, 60) }));
    const imgs = [...document.querySelectorAll('main img')].map((i) => ({
      src: i.getAttribute('src'), alt: i.getAttribute('alt'), loading: i.getAttribute('loading'),
      w: i.naturalWidth, h: i.naturalHeight, shown: i.getBoundingClientRect().width > 0,
    }));
    const bare = [...document.querySelectorAll('main a')]
      .filter((a) => /^https?:\/\//.test(a.textContent.trim())).map((a) => a.textContent.trim().slice(0, 50));
    const vague = [...document.querySelectorAll('main a')]
      .filter((a) => /^(here|link|click here|read more|this)$/i.test(a.textContent.trim())).map((a) => a.textContent.trim());
    return { hs, imgs, bare, vague, overflow: document.documentElement.scrollWidth > window.innerWidth };
  });
  // A hidden image is NOT a broken image. `Figure.tsx` renders BOTH the light
  // and the derived `.dark.svg` and lets CSS show one per `[data-theme]`; the
  // hidden one carries `loading="lazy"` and `display:none`, so the browser
  // never fetches it and naturalWidth is legitimately 0. Treating that as a
  // failure produced four phantom defects per unit on the first run of this
  // script. Loading is judged on the VISIBLE image; existence is judged by
  // fetching every distinct src, which catches a genuinely missing dark
  // variant without depending on whether it was painted.
  const broken = d.imgs.filter((i) => i.shown && (!i.w || !i.h));
  const missing = [];
  for (const src of [...new Set(d.imgs.map((i) => i.src))]) {
    const target = src.startsWith('http') ? src : `${base}${src}`;
    try { if (!(await fetch(target, { method: 'HEAD' })).ok) missing.push(src); }
    catch { missing.push(src); }
  }
  const noalt = d.imgs.filter((i) => !i.alt || !i.alt.trim());
  const jumps = [];
  let prev = 0;
  for (const h of d.hs) { if (prev && h.level > prev + 1) jumps.push(`h${prev}->h${h.level} at "${h.text}"`); prev = h.level; }

  say(`\n-- ${name}: headings=${d.hs.length} imgs=${d.imgs.length} visibleBroken=${broken.length} notServed=${missing.length} missingAlt=${noalt.length} bareUrlLinks=${d.bare.length} vagueLinks=${d.vague.length} hOverflow=${d.overflow}`);
  for (const i of d.imgs) say(`   img ${i.src} natural=${i.w}x${i.h} shown=${i.shown} loading=${i.loading} alt="${(i.alt || '').slice(0, 90)}"`);
  if (jumps.length) { say(`   heading level jumps: ${jumps.join(' | ')}`); defect(name, `skipped heading level (${jumps[0]})`); }
  else say('   heading order: no skipped levels');
  if (broken.length) defect(name, `visible image did not load: ${broken.map((b) => b.src).join(', ')}`);
  if (missing.length) defect(name, `image asset not served: ${missing.join(', ')}`);
  if (noalt.length) defect(name, `image without alt text: ${noalt.map((b) => b.src).join(', ')}`);
  if (d.overflow) defect(name, 'document overflows horizontally at 1280px');
  if (d.bare.length) say(`   advisory bare-URL link text: ${d.bare.join(' | ')}`);
  if (d.vague.length) say(`   advisory non-descriptive link text: ${d.vague.join(' | ')}`);
  await pg.screenshot({ path: join(outDir, `desktop-${name}.png`), fullPage: true });
}
await ctx.close();

/* ===== B. NARROW ===== */
say('\n===== B. NARROW 360x780 =====');
ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
pg = await ctx.newPage();
for (const slug of pages) {
  const name = label(slug);
  const response = await pg.goto(url(slug), { waitUntil: 'networkidle' });
  if (!response?.ok()) continue;
  const d = await pg.evaluate(() => {
    const docOverflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    // Measure the element that actually scrolls. Reporting the wrapper has
    // produced three false "unreachable table" findings, so walk the table AND
    // each ancestor up to main, and name whichever one is the scroller.
    const scrollerFor = (el) => {
      for (let n = el; n && n.tagName !== 'MAIN'; n = n.parentElement) {
        const cs = getComputedStyle(n);
        if (/auto|scroll/.test(cs.overflowX) && n.scrollWidth > n.clientWidth + 1) {
          return { tag: n.tagName, cls: (typeof n.className === 'string' ? n.className.split(' ')[0] : ''),
            cw: n.clientWidth, sw: n.scrollWidth, tabindex: n.getAttribute('tabindex'), label: n.getAttribute('aria-label') };
        }
      }
      return null;
    };
    const tables = [...document.querySelectorAll('main table')].map((t) => ({
      cw: t.clientWidth, sw: t.scrollWidth, fits: t.scrollWidth <= t.clientWidth + 1,
      scroller: scrollerFor(t),
      lastHeader: t.querySelector('tr:first-child th:last-child,tr:first-child td:last-child')?.textContent.trim().slice(0, 24),
    }));
    const figs = [...document.querySelectorAll('main figure')].map((f) => ({
      cls: typeof f.className === 'string' ? f.className.split(' ')[0] : '',
      cw: f.clientWidth, sw: f.scrollWidth, scroller: scrollerFor(f),
    }));
    const spill = [...document.querySelectorAll('main *')]
      .filter((e) => e.getBoundingClientRect().right > window.innerWidth + 1)
      .map((e) => `${e.tagName}.${typeof e.className === 'string' ? e.className.split(' ')[0] : ''}`).slice(0, 8);
    return { docOverflow, tables, figs, spill };
  });
  say(`\n-- ${name}: docHorizontalOverflow=${d.docOverflow}px tables=${d.tables.length} figures=${d.figs.length} spill=${d.spill.length}`);
  d.tables.forEach((t, i) => {
    const s = t.scroller;
    say(`   table[${i}] client=${t.cw} scroll=${t.sw} fits=${t.fits} lastHeader="${t.lastHeader}" scroller=${s ? `${s.tag}.${s.cls} (client=${s.cw} scroll=${s.sw} tabindex=${s.tabindex} aria-label=${s.label})` : 'NONE'}`);
    if (!t.fits && !s) defect(name, `table[${i}] is wider than the viewport and no ancestor scrolls it - content unreachable`);
    else if (!t.fits && s && s.tabindex === null) say(`   advisory table[${i}] scrolls but its scroller is not keyboard focusable (no tabindex)`);
  });
  d.figs.forEach((f, i) => say(`   figure[${i}] .${f.cls} client=${f.cw} scroll=${f.sw} scroller=${f.scroller ? `${f.scroller.tag}.${f.scroller.cls}` : 'none'}`));
  if (d.docOverflow > 1) { say(`   spill: ${d.spill.join(', ')}`); defect(name, `document overflows horizontally by ${d.docOverflow}px at 360px`); }
  await pg.screenshot({ path: join(outDir, `narrow360-${name}.png`), fullPage: true });
}
await ctx.close();

/* ===== C. A4 PRINT ===== */
say('\n===== C. A4 PRINT EMULATION (794px) =====');
ctx = await browser.newContext({ viewport: { width: 794, height: 1123 } });
pg = await ctx.newPage();
for (const slug of pages) {
  const name = label(slug);
  const response = await pg.goto(url(slug), { waitUntil: 'networkidle' });
  if (!response?.ok()) continue;
  await pg.emulateMedia({ media: 'print' });
  const d = await pg.evaluate(() => {
    const A4 = 794;
    const clipped = [...document.querySelectorAll('main *')]
      .filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.right > A4 + 1; })
      .map((e) => `${e.tagName}.${typeof e.className === 'string' ? e.className.split(' ')[0] : ''}@${Math.round(e.getBoundingClientRect().right)}`)
      .slice(0, 10);
    const figs = [...document.querySelectorAll('main figure img')]
      .map((i) => ({ src: i.getAttribute('src'), w: Math.round(i.getBoundingClientRect().width), right: Math.round(i.getBoundingClientRect().right) }));
    // English AND Urdu, or the UR locale silently reports no answers section at all -
    // misleading in the one locale where a translator is told to check it renders.
    const ANSWERS_RE = /answer|marking|rubric|\u062c\u0648\u0627\u0628|\u0631\u0648\u0628\u0631\u06a9|\u0646\u0645\u0628\u0631/i;
    const answers = [...document.querySelectorAll('main h2,main h3')]
      .map((h) => h.textContent.trim()).filter((t) => ANSWERS_RE.test(t));
    return { clipped, figs, answers };
  });
  say(`\n-- ${name} @print: clippedElems=${d.clipped.length} figureImgs=${d.figs.length} answerHeadings=${JSON.stringify(d.answers)}`);
  d.figs.forEach((f) => {
    say(`   printfig ${f.src} w=${f.w} right=${f.right} ${f.right > A4_LIMIT ? 'CLIPPED' : 'fits'}`);
    if (f.right > A4_LIMIT) defect(name, `figure clipped in A4 print: ${f.src} extends to ${f.right}px`);
  });
  if (d.clipped.length) { say(`   overflowing: ${d.clipped.join(', ')}`); defect(name, `${d.clipped.length} element(s) extend past the A4 page width`); }
  if (!has('no-pdf')) await pg.pdf({ path: join(outDir, `print-a4-${name}.pdf`), format: 'A4', printBackground: true });
  await pg.emulateMedia({ media: 'screen' });
}
await ctx.close();

/* ===== D. SVG GEOMETRY ===== */
say('\n===== D. SVG TEXT GEOMETRY =====');
ctx = await browser.newContext({ viewport: { width: 1200, height: 800 } });
pg = await ctx.newPage();
const variants = locale === 'ur' ? ['.ur', '.ur.dark'] : ['', '.dark'];
for (const fig of figures) {
  for (const v of variants) {
    const svgUrl = `${base}/img/figures/${unit.courseFolder}/unit-${unitNN}/${fig.id}${v}.svg`;
    const response = await pg.goto(svgUrl, { waitUntil: 'networkidle' });
    if (!response?.ok()) { say(`   ${fig.id}${v || '.light'} MISSING (HTTP ${response?.status()})`); defect(fig.id, `variant ${v || 'light'} not served`); continue; }
    const r = await pg.evaluate(() => {
      const svg = document.querySelector('svg');
      if (!svg) return null;
      const vb = svg.viewBox.baseVal;
      const wm = [...svg.querySelectorAll('text')].find((t) => t.classList.contains('wm'));
      const wmB = wm ? wm.getBBox() : null;
      const out = [];
      for (const t of svg.querySelectorAll('text')) {
        const b = t.getBBox();
        const rec = { s: t.textContent.slice(0, 34), x: +b.x.toFixed(1), r: +(b.x + b.width).toFixed(1), y: +b.y.toFixed(1), bot: +(b.y + b.height).toFixed(1) };
        if (rec.r > vb.width - 1) out.push({ ...rec, why: 'past viewBox right edge' });
        else if (rec.bot > vb.height - 1) out.push({ ...rec, why: 'past viewBox bottom' });
        else if (wmB && t !== wm && rec.r > wmB.x - 2 && rec.y < wmB.y + wmB.height && rec.bot > wmB.y) out.push({ ...rec, why: 'overlaps the wordmark' });
      }
      return { vb: `${vb.width}x${vb.height}`, wmX: wmB ? +wmB.x.toFixed(1) : null, out, n: svg.querySelectorAll('text').length };
    });
    if (!r) { defect(fig.id, `variant ${v || 'light'} served no <svg>`); continue; }
    say(`   ${fig.id}${v || '.light'} [${fig.kind}] viewBox=${r.vb} texts=${r.n} wordmark@x=${r.wmX} -> ${r.out.length ? 'PROBLEM' : 'clean'}`);
    for (const o of r.out) {
      say(`      ! "${o.s}" x=${o.x} right=${o.r} bottom=${o.bot} (${o.why})`);
      defect(`${fig.id}${v || '.light'}`, `text "${o.s}" ${o.why}`);
    }
  }
}
await ctx.close();
await browser.close();

/* ---------- artifacts ---------- */

say(`\n### finished: ${new Date().toISOString()}`);
say(`### defects: ${defects.length}`);
for (const d of defects) say(`###   ${d}`);

const exitCode = defects.length ? 1 : 0;
writeFileSync(join(outDir, 'render-inspect.log'), `${lines.join('\n')}\n### exit_code: ${exitCode}\n`);
writeFileSync(join(outDir, 'render-inspect.json'), `${JSON.stringify({
  schema_version: 1,
  course_code: unit.courseCode,
  unit_no: unit.unitNo,
  locale: locale || 'en',
  base,
  route: unitRoute(),
  pages: pages.map(label),
  figures: figures.map((f) => f.id),
  viewports: ['1280x900', '360x780', 'A4 794x1123 print'],
  defects,
  exit_code: exitCode,
  generated_at: new Date().toISOString(),
}, null, 2)}\n`);

if (server?.pid) { try { process.kill(-server.pid, 'SIGTERM'); } catch { /* already gone */ } }
console.log(`\nArtifacts: ${outDir}`);
process.exit(exitCode);
