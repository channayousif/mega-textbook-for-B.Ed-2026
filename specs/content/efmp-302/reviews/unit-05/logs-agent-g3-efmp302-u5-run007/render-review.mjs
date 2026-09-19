import { chromium } from 'playwright';
import fs from 'node:fs';

const BASE = 'http://127.0.0.1:4599';
const OUT  = '/home/a2ahs/mega_book_for_B.Ed/specs/content/efmp-302/reviews/unit-05/renders-agent-g3-efmp302-u5-run007';
const pages = ['', 'topic-01/', 'topic-02/', 'topic-03/', 'topic-04/', 'unit-assessment/', 'unit-teacher-notes/'];
const P = (s) => `${BASE}/semester-1/efmp-302/unit-05/${s}`;

const log = [];
const say = (...a) => { const s = a.join(' '); log.push(s); console.log(s); };

const browser = await chromium.launch();
say('### render-review  EFMP-302 Unit 5  run agent-g3-efmp302-u5-run007');
say('### host: docusaurus serve (fresh build) at ' + BASE);
say('### browser: chromium ' + browser.version());
say('### started: ' + new Date().toISOString());

// ---------- 1. DESKTOP 1280x900 ----------
say('\n===== A. DESKTOP 1280x900 (light) =====');
let ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
let pg = await ctx.newPage();
for (const s of pages) {
  await pg.goto(P(s), { waitUntil: 'networkidle' });
  const name = s === '' ? 'index' : s.replace(/\/$/, '');
  const d = await pg.evaluate(() => {
    const hs = [...document.querySelectorAll('main h1,main h2,main h3,main h4')].map(h => h.tagName + ':' + h.textContent.trim().slice(0, 60));
    const imgs = [...document.querySelectorAll('main img')].map(i => ({ src: i.getAttribute('src'), alt: i.getAttribute('alt'), w: i.naturalWidth, h: i.naturalHeight, shown: i.getBoundingClientRect().width > 0 }));
    const bare = [...document.querySelectorAll('main a')].filter(a => /^https?:\/\//.test(a.textContent.trim())).map(a => a.textContent.trim().slice(0, 50));
    return { hs, imgs, bare, overflow: document.documentElement.scrollWidth > window.innerWidth };
  });
  const broken = d.imgs.filter(i => !i.w || !i.h);
  const noalt  = d.imgs.filter(i => !i.alt || !i.alt.trim());
  say(`\n-- ${name}: headings=${d.hs.length} imgs=${d.imgs.length} brokenImgs=${broken.length} missingAlt=${noalt.length} bareUrlLinks=${d.bare.length} hOverflow=${d.overflow}`);
  // heading order
  let prev = 0, jumps = [];
  for (const h of d.hs) { const l = +h[1]; if (prev && l > prev + 1) jumps.push(`${prev}->${l} at ${h}`); prev = l; }
  if (jumps.length) say('   HEADING LEVEL JUMPS: ' + jumps.join(' | ')); else say('   heading order: no skipped levels');
  for (const i of d.imgs) say(`   img ${i.src} natural=${i.w}x${i.h} shown=${i.shown} alt="${(i.alt||'').slice(0,90)}"`);
  if (broken.length) say('   BROKEN: ' + broken.map(b => b.src).join(', '));
  await pg.screenshot({ path: `${OUT}/desktop-${name}.png`, fullPage: true });
}
await ctx.close();

// ---------- 2. NARROW 360x780 ----------
say('\n===== B. NARROW 360x780 (small screen) =====');
ctx = await browser.newContext({ viewport: { width: 360, height: 780 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
pg = await ctx.newPage();
for (const s of pages) {
  await pg.goto(P(s), { waitUntil: 'networkidle' });
  const name = s === '' ? 'index' : s.replace(/\/$/, '');
  const d = await pg.evaluate(() => {
    const docOverflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    const figs = [...document.querySelectorAll('figure')].map(f => {
      const cs = getComputedStyle(f);
      return { cls: f.className, ox: cs.overflowX, cw: f.clientWidth, sw: f.scrollWidth, tabindex: f.getAttribute('tabindex'), role: f.getAttribute('role'), label: f.getAttribute('aria-label') };
    });
    const tables = [...document.querySelectorAll('main table')].map(t => {
      const w = t.parentElement;
      const cs = getComputedStyle(w);
      return { cw: w.clientWidth, sw: w.scrollWidth, ox: cs.overflowX, tabindex: w.getAttribute('tabindex'), label: w.getAttribute('aria-label'), lastCell: t.querySelector('tr:first-child th:last-child,tr:first-child td:last-child')?.textContent.trim().slice(0,24) };
    });
    // any element pushing past the viewport
    const spill = [...document.querySelectorAll('main *')].filter(e => e.getBoundingClientRect().right > window.innerWidth + 1).map(e => e.tagName + '.' + (typeof e.className === 'string' ? e.className.split(' ')[0] : '')).slice(0, 8);
    return { docOverflow, figs, tables, spill };
  });
  say(`\n-- ${name}: documentHorizontalOverflow=${d.docOverflow}px  figures=${d.figs.length}  tables=${d.tables.length}  spillElems=${d.spill.length}`);
  d.figs.forEach((f, i) => say(`   fig[${i}] ${f.cls} overflowX=${f.ox} client=${f.cw} scroll=${f.sw} scrollable=${f.sw > f.cw} tabindex=${f.tabindex} role=${f.role} aria-label=${f.label}`));
  d.tables.forEach((t, i) => say(`   table[${i}] client=${t.cw} scroll=${t.sw} overflowX=${t.ox} scrollable=${t.sw > t.cw} tabindex=${t.tabindex} aria-label=${t.label} lastHeader="${t.lastCell}"`));
  if (d.spill.length) say('   SPILL past viewport: ' + d.spill.join(', '));
  await pg.screenshot({ path: `${OUT}/narrow360-${name}.png`, fullPage: true });
}
await ctx.close();

// ---------- 3. A4 PRINT ----------
say('\n===== C. A4 PRINT EMULATION =====');
ctx = await browser.newContext({ viewport: { width: 794, height: 1123 } });
pg = await ctx.newPage();
for (const s of pages) {
  await pg.goto(P(s), { waitUntil: 'networkidle' });
  const name = s === '' ? 'index' : s.replace(/\/$/, '');
  await pg.emulateMedia({ media: 'print' });
  const d = await pg.evaluate(() => {
    const A4 = 794;
    const clipped = [...document.querySelectorAll('main *')].filter(e => {
      const r = e.getBoundingClientRect();
      return r.width > 0 && r.right > A4 + 1;
    }).map(e => ({ t: e.tagName, c: typeof e.className === 'string' ? e.className.split(' ')[0] : '', right: Math.round(e.getBoundingClientRect().right) })).slice(0, 10);
    const figs = [...document.querySelectorAll('figure img')].map(i => ({ src: i.getAttribute('src'), w: Math.round(i.getBoundingClientRect().width), right: Math.round(i.getBoundingClientRect().right) }));
    const vis = getComputedStyle(document.querySelector('main')).display;
    // is the answers section present in print?
    const ans = [...document.querySelectorAll('h2,h3')].map(h=>h.textContent.trim()).filter(t=>/Answer|marking|rubric/i.test(t));
    return { clipped, figs, vis, ans };
  });
  say(`\n-- ${name} @print(794px): overflowingElems=${d.clipped.length} figureImgs=${d.figs.length} answerHeadings=${JSON.stringify(d.ans)}`);
  d.figs.forEach(f => say(`   printfig ${f.src} w=${f.w} right=${f.right} ${f.right > 795 ? 'CLIPPED' : 'fits'}`));
  if (d.clipped.length) say('   OVERFLOW: ' + d.clipped.map(c => `${c.t}.${c.c}@${c.right}`).join(', '));
  await pg.pdf({ path: `${OUT}/print-a4-${name}.pdf`, format: 'A4', printBackground: true });
  await pg.screenshot({ path: `${OUT}/print-a4-${name}.png`, fullPage: true });
  await pg.emulateMedia({ media: 'screen' });
}
await ctx.close();

// ---------- 4. FIGURE TEXT GEOMETRY (the ded73ec repair) ----------
say('\n===== D. SVG TEXT GEOMETRY, measured in-browser =====');
ctx = await browser.newContext({ viewport: { width: 1200, height: 800 } });
pg = await ctx.newPage();
for (const id of ['fig-U5-1','fig-U5-2','fig-U5-3','fig-U5-4','fig-U5-5','fig-U5-6','fig-U5-7','fig-U5-8']) {
  for (const v of ['', '.dark']) {
    const url = `${BASE}/img/figures/efmp-302/unit-05/${id}${v}.svg`;
    await pg.goto(url, { waitUntil: 'networkidle' });
    const r = await pg.evaluate(() => {
      const svg = document.querySelector('svg');
      const vb = svg.viewBox.baseVal;
      const wm = [...svg.querySelectorAll('text')].find(t => t.classList.contains('wm'));
      const wmB = wm ? wm.getBBox() : null;
      const out = [];
      for (const t of svg.querySelectorAll('text')) {
        const b = t.getBBox();
        const rec = { s: t.textContent.slice(0, 34), x: +b.x.toFixed(1), r: +(b.x + b.width).toFixed(1), y: +b.y.toFixed(1), bot: +(b.y + b.height).toFixed(1) };
        if (rec.r > vb.width - 1) out.push({ ...rec, why: 'past viewBox right edge' });
        else if (rec.bot > vb.height - 1) out.push({ ...rec, why: 'past viewBox bottom' });
        else if (wmB && t !== wm && rec.r > wmB.x - 2 && (rec.y < wmB.y + wmB.height) && (rec.bot > wmB.y)) out.push({ ...rec, why: 'overlaps the wordmark' });
      }
      return { vb: `${vb.width}x${vb.height}`, wm: wmB ? { x: +wmB.x.toFixed(1), y: +wmB.y.toFixed(1), w: +wmB.width.toFixed(1) } : null, out, n: svg.querySelectorAll('text').length };
    });
    const flag = r.out.length ? 'PROBLEM' : 'clean';
    say(`   ${id}${v || '.light'}  viewBox=${r.vb} texts=${r.n} wordmark@x=${r.wm?.x} -> ${flag}`);
    r.out.forEach(o => say(`      ! "${o.s}" x=${o.x} right=${o.r} (${o.why})`));
  }
}
await ctx.close();

say('\n### finished: ' + new Date().toISOString());
await browser.close();
fs.writeFileSync('/home/a2ahs/mega_book_for_B.Ed/specs/content/efmp-302/reviews/unit-05/logs-agent-g3-efmp302-u5-run007/render-review.log', log.join('\n') + '\n### exit_code: 0\n');
