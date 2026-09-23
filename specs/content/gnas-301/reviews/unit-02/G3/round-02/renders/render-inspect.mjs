// G3 round-2 render inspection for GNAS-301 Unit 2 (review evidence artifact).
// Serves no purpose outside this review; run with the repo's playwright-core
// against the locally served build. Writes render-inspect.json/.log beside it.
import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';

const R = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-a8eefd2fc607a93b9/specs/content/gnas-301/reviews/unit-02/G3/round-02/renders';
const base = 'http://127.0.0.1:4614/semester-1/gnas-301/unit-02';
const names = ['index', 'topic-01', 'topic-02', 'topic-03', 'unit-assessment', 'unit-teacher-notes'];
const url = (n) => base + (n === 'index' ? '/' : '/' + n);

const domCheck = () => {
  const imgs = [...document.querySelectorAll('img')];
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')];
  let skipped = 0, prev = 0;
  for (const h of headings) { const l = Number(h.tagName[1]); if (prev && l > prev + 1) skipped++; prev = l; }
  const links = [...document.querySelectorAll('main a, article a')];
  const bareUrl = links.filter(a => /^https?:\/\//.test(a.textContent.trim())).map(a => a.textContent.trim());
  return {
    headings: headings.length, skippedHeadingLevels: skipped,
    imgs: imgs.map(i => ({ src: i.getAttribute('src'), natural: i.naturalWidth + 'x' + i.naturalHeight, shown: !!(i.offsetWidth || i.offsetHeight), loading: i.getAttribute('loading'), alt: (i.alt || '').slice(0, 60) })),
    visibleBroken: imgs.filter(i => (i.offsetWidth || i.offsetHeight) && i.complete && i.naturalWidth === 0).length,
    missingAlt: imgs.filter(i => !i.hasAttribute('alt') || !(i.alt || '').trim()).length,
    bareUrlLinks: bareUrl,
    docHOverflow: Math.max(0, document.documentElement.scrollWidth - document.documentElement.clientWidth),
  };
};

const narrowCheck = () => {
  const doc = document.documentElement;
  const tables = [...document.querySelectorAll('table')].map(t => {
    const fits = t.scrollWidth <= t.clientWidth + 1;
    let scrollReach = null;
    if (!fits) {
      t.scrollLeft = t.scrollWidth;
      const lastCell = t.querySelector('tr:last-child td:last-child, tr:last-child th:last-child');
      scrollReach = { scrolledTo: t.scrollLeft, lastCellRight: lastCell ? Math.round(lastCell.getBoundingClientRect().right) : null, viewportW: window.innerWidth };
    }
    return { client: t.clientWidth, scroll: t.scrollWidth, fits, overflowX: getComputedStyle(t).overflowX, display: getComputedStyle(t).display, tabindex: t.getAttribute('tabindex'), role: t.getAttribute('role'), ariaLabel: t.getAttribute('aria-label'), scrollReach };
  });
  const figures = [...document.querySelectorAll('figure')].map(f => {
    let scroller = null;
    for (const el of f.querySelectorAll('*')) { const cs = getComputedStyle(el); if (['auto', 'scroll'].includes(cs.overflowX) && el.scrollWidth > el.clientWidth) { scroller = el.tagName; break; } }
    return { client: f.clientWidth, scroll: f.scrollWidth, scroller: scroller || 'visible', fits: f.scrollWidth <= f.clientWidth + 1 };
  });
  return { docHOverflow: Math.max(0, doc.scrollWidth - doc.clientWidth), tables, figures };
};

const printCheck = () => {
  const nav = document.querySelector('header, .navbar, nav');
  const footer = document.querySelector('footer, .footer');
  const vis = (el) => !!el && !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  return { navVisible: vis(nav), footerVisible: vis(footer), docTitle: document.title };
};

const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'] });
const page = await browser.newPage();
const consoleErrors = [];
page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 160)); });
page.on('pageerror', e => consoleErrors.push('pageerror: ' + String(e).slice(0, 160)));

const out = { host: base, browser: browser.version(), startedAt: new Date().toISOString(), desktop: {}, narrow: {}, print: {}, consoleErrors };

try {
  // A. desktop 1280x900
  await page.setViewportSize({ width: 1280, height: 900 });
  for (const n of names) {
    await page.goto(url(n), { waitUntil: 'networkidle' });
    out.desktop[n] = await page.evaluate(domCheck);
    await page.screenshot({ path: `${R}/desktop-${n}.png`, fullPage: false });
  }

  // B. narrow 360x780
  await page.setViewportSize({ width: 360, height: 780 });
  for (const n of names) {
    await page.goto(url(n), { waitUntil: 'networkidle' });
    out.narrow[n] = await page.evaluate(narrowCheck);
    await page.screenshot({ path: `${R}/narrow360-${n}.png`, fullPage: false });
  }
  // narrow viewport shot of the assessment answers section (scroll to it)
  await page.goto(url('unit-assessment'), { waitUntil: 'networkidle' });
  const found = await page.evaluate(() => {
    const h = [...document.querySelectorAll('h2')].find(x => x.textContent.includes('Answers and marking guidance'));
    if (h) h.scrollIntoView();
    return !!h;
  });
  if (found) await page.screenshot({ path: `${R}/narrow360-unit-assessment-answers.png` });
  out.answersSectionFound = found;

  // C. print A4
  for (const n of names) {
    await page.goto(url(n), { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    out.print[n] = await page.evaluate(printCheck);
    await page.pdf({ path: `${R}/print-a4-${n}.pdf`, format: 'A4', printBackground: true });
    if (n === 'topic-01') await page.screenshot({ path: `${R}/print-view-topic-01.png`, fullPage: false });
    await page.emulateMedia({ media: 'screen' });
  }
  out.completedAt = new Date().toISOString();
} finally {
  await browser.close();
}

writeFileSync(`${R}/render-inspect.json`, JSON.stringify(out, null, 2) + '\n');

const L = [];
L.push('### render-inspect  GNAS-301 Unit 2 (G3 round 2, fresh attempt)');
L.push(`### host: ${out.host}   browser: chromium ${out.browser}`);
L.push(`### route: /semester-1/gnas-301/unit-02  pages: ${names.length}`);
L.push(`### started: ${out.startedAt}`);
L.push('');
L.push('===== A. DESKTOP 1280x900 =====');
for (const n of names) {
  const d = out.desktop[n];
  L.push(`-- ${n}: headings=${d.headings} imgs=${d.imgs.length} visibleBroken=${d.visibleBroken} missingAlt=${d.missingAlt} bareUrlLinks=${d.bareUrlLinks.length} docHOverflow=${d.docHOverflow}px skippedHeadingLevels=${d.skippedHeadingLevels}`);
  for (const i of d.imgs) L.push(`   img ${i.src} natural=${i.natural} shown=${i.shown} loading=${i.loading} alt="${i.alt}"`);
  for (const b of d.bareUrlLinks) L.push(`   advisory bare-URL link text: ${b}`);
}
L.push('');
L.push('===== B. NARROW 360x780 =====');
for (const n of names) {
  const d = out.narrow[n];
  L.push(`-- ${n}: docHOverflow=${d.docHOverflow}px tables=${d.tables.length} figures=${d.figures.length}`);
  for (const [k, t] of d.tables.entries()) L.push(`   table[${k}] client=${t.client} scroll=${t.scroll} fits=${t.fits} overflowX=${t.overflowX} display=${t.display} tabindex=${t.tabindex} role=${t.role} aria-label="${t.ariaLabel}"` + (t.scrollReach ? ` scrollReach=${JSON.stringify(t.scrollReach)}` : ''));
  for (const [k, f] of d.figures.entries()) L.push(`   figure[${k}] client=${f.client} scroll=${f.scroll} scroller=${f.scroller} fits=${f.fits}`);
}
L.push(`-- answers section located at 360px: ${out.answersSectionFound} (narrow360-unit-assessment-answers.png)`);
L.push('');
L.push('===== C. PRINT A4 (emulated media, page.pdf) =====');
for (const n of names) L.push(`-- ${n}: print-a4-${n}.pdf generated  navVisible=${out.print[n].navVisible} footerVisible=${out.print[n].footerVisible}`);
L.push('');
if (out.consoleErrors.length) { L.push('===== console errors ====='); for (const e of out.consoleErrors) L.push('   ' + e); }
else L.push('console errors: none');
L.push(`### completed: ${out.completedAt}`);
writeFileSync(`${R}/render-inspect.log`, L.join('\n') + '\n');
console.log(L.join('\n'));
