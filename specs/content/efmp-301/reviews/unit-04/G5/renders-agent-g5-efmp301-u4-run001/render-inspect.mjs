// G5 Urdu render inspection - EFMP-301 Unit 4 (agent-g5-efmp301-u4-run001)
// Serves against the PRODUCTION BUILD (npm run serve) and inspects the actual
// rendered Urdu pages: RTL direction, Nastaliq font application, Urdu figure
// variants, bidi/numerals, table order and wrapping at desktop + 360px, and
// A4 print clipping. Mirrors the G3 run001 inspection shape with G5 additions.
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const BASE = 'http://localhost:3218';
const OUT = 'specs/content/efmp-301/reviews/unit-04/G5/renders-agent-g5-efmp301-u4-run001';
mkdirSync(OUT, { recursive: true });

const PAGES = [
  ['index', '/ur/semester-1/efmp-301/unit-04/'],
  ['topic-01', '/ur/semester-1/efmp-301/unit-04/topic-01/'],
  ['topic-02', '/ur/semester-1/efmp-301/unit-04/topic-02/'],
  ['topic-03', '/ur/semester-1/efmp-301/unit-04/topic-03/'],
  ['unit-assessment', '/ur/semester-1/efmp-301/unit-04/unit-assessment/'],
  ['unit-teacher-notes', '/ur/semester-1/efmp-301/unit-04/unit-teacher-notes/'],
];

const results = { base: BASE, pages: [], dark: null, print: [] };
const log = [];
const say = (m) => { log.push(m); console.log(m); };

const browser = await chromium.launch();

// ---------- Desktop pass (1280x900) ----------
const desktop = await browser.newPage({ viewport: { width: 1280, height: 900 } });
for (const [name, path] of PAGES) {
  await desktop.goto(BASE + path, { waitUntil: 'networkidle' });
  await desktop.waitForTimeout(700); // hydration settle
  const m = await desktop.evaluate(() => {
    const imgs = [...document.querySelectorAll('img')];
    const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src);
    const noAlt = imgs.filter((i) => !i.getAttribute('alt')).length;
    const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => Number(h.tagName[1]));
    const skipped = [];
    for (let i = 1; i < hs.length; i++) if (hs[i] - hs[i - 1] > 1) skipped.push(`${hs[i - 1]}->${hs[i]}`);
    const doc = document.documentElement;
    const p = document.querySelector('article p, main p');
    return {
      title: document.title,
      htmlDir: doc.getAttribute('dir'),
      htmlLang: doc.getAttribute('lang'),
      bodyFont: p ? getComputedStyle(p).fontFamily.slice(0, 120) : null,
      imgCount: imgs.length,
      figureSrcs: imgs.map((i) => i.getAttribute('src')),
      brokenImages: broken,
      imgsNoAlt: noAlt,
      skippedHeadings: skipped,
      docOverflowX: doc.scrollWidth - doc.clientWidth,
      answersSectionPresent: !!document.querySelector('#جوابات-اور-نمبر-دینے-کی-رہنمائی, #answers-and-marking-guidance'),
      badgeText: document.querySelector('.theme-doc-markdown article')?.textContent.includes('مسودہ') ?? null,
      latinRuns: [...document.querySelectorAll('article p')]
        .map((el) => el.textContent)
        .filter((t) => /[A-Za-z]{3,}/.test(t)).length,
    };
  });
  await desktop.screenshot({ path: `${OUT}/desktop-${name}.png`, fullPage: true });
  results.pages.push({ name, pass: 'desktop', ...m });
  say(`desktop ${name}: dir=${m.htmlDir} lang=${m.htmlLang} imgs=${m.imgCount} urFigs=${m.figureSrcs.filter((s) => s && s.includes('.ur.svg')).length} broken=${m.brokenImages.length} noAlt=${m.imgsNoAlt} skippedH=${JSON.stringify(m.skippedHeadings)} docOverflowX=${m.docOverflowX}`);
}
say(`desktop font sample: ${results.pages[0].bodyFont}`);

// ---------- Narrow 360px pass ----------
const narrow = await browser.newPage({ viewport: { width: 360, height: 780 } });
for (const [name, path] of PAGES) {
  await narrow.goto(BASE + path, { waitUntil: 'networkidle' });
  await narrow.waitForTimeout(700);
  const m = await narrow.evaluate(() => {
    const doc = document.documentElement;
    const out = { docOverflowX: doc.scrollWidth - doc.clientWidth, tables: [], figuresFit: [] };
    for (const t of document.querySelectorAll('table')) {
      t.scrollLeft = t.scrollWidth; // RTL: scroll fully toward the first column
      out.tables.push({
        scrollable: t.scrollWidth > t.clientWidth,
        clientWidth: t.clientWidth,
        scrollWidth: t.scrollWidth,
        dir: getComputedStyle(t).direction,
      });
    }
    for (const f of document.querySelectorAll('figure img, img.figure__img, article img')) {
      const r = f.getBoundingClientRect();
      if (f.naturalWidth > 0) out.figuresFit.push({ src: f.getAttribute('src'), fits: r.left >= -1 && r.right <= 361, w: Math.round(r.width) });
    }
    return out;
  });
  await narrow.screenshot({ path: `${OUT}/narrow360-${name}.png`, fullPage: true });
  results.pages.push({ name, pass: 'narrow360', ...m });
  const tab = JSON.stringify(m.tables);
  const unfit = m.figuresFit.filter((f) => !f.fits).length;
  say(`narrow360 ${name}: docOverflowX=${m.docOverflowX} tables=${tab} figuresNotFitting=${unfit}`);
}

// ---------- Urdu figure close-ups (desktop) ----------
const figPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const FIGS = [
  ['fig-U4-1', '/ur/semester-1/efmp-301/unit-04/topic-01/'],
  ['fig-U4-2', '/ur/semester-1/efmp-301/unit-04/topic-01/'],
  ['fig-U4-3', '/ur/semester-1/efmp-301/unit-04/topic-02/'],
  ['fig-U4-4', '/ur/semester-1/efmp-301/unit-04/topic-02/'],
  ['fig-U4-5', '/ur/semester-1/efmp-301/unit-04/topic-03/'],
  ['fig-U4-6', '/ur/semester-1/efmp-301/unit-04/topic-03/'],
];
for (const [fig, path] of FIGS) {
  await figPage.goto(BASE + path, { waitUntil: 'networkidle' });
  const el = await figPage.$(`figure img[src*="${fig}"]`);
  if (el) {
    await el.scrollIntoViewIfNeeded();
    await figPage.waitForTimeout(400);
    await el.screenshot({ path: `${OUT}/ur-figure-${fig}.png` });
    say(`figure close-up saved: ${fig}`);
  } else {
    say(`FIGURE NOT FOUND ON PAGE: ${fig} at ${path}`);
  }
}

// ---------- Dark variant check ([data-theme=dark] loads .ur.dark.svg) ----------
const dark = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await dark.goto(BASE + '/ur/semester-1/efmp-301/unit-04/topic-01/', { waitUntil: 'networkidle' });
await dark.evaluate(() => { document.documentElement.setAttribute('data-theme', 'dark'); });
await dark.waitForTimeout(900);
const darkSrcs = await dark.evaluate(() => [...document.querySelectorAll('img')].map((i) => i.getAttribute('src')));
await dark.screenshot({ path: `${OUT}/dark-topic-01.png`, fullPage: true });
results.dark = { srcs: darkSrcs, urDarkLoaded: darkSrcs.filter((s) => s && s.includes('.ur.dark.svg')).length };
say(`dark: urDarkVariantsLoaded=${results.dark.urDarkLoaded} srcs=${JSON.stringify(darkSrcs)}`);

// ---------- A4 print pass ----------
const print = await browser.newPage({ viewport: { width: 794, height: 1123 } });
for (const [name, path] of PAGES) {
  await print.goto(BASE + path, { waitUntil: 'networkidle' });
  await print.emulateMedia({ media: 'print' });
  await print.waitForTimeout(500);
  const m = await print.evaluate(() => {
    const doc = document.documentElement;
    const clipped = [...document.querySelectorAll('article *')].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.right > 795 || r.left < -1);
    }).length;
    return {
      docOverflowX: doc.scrollWidth - doc.clientWidth,
      clippedElements: clipped,
      printHidden: [...document.querySelectorAll('nav, header.navbar, footer')].every((el) => getComputedStyle(el).display === 'none' || getComputedStyle(el).visibility === 'hidden') ? 'some-or-all-hidden' : 'visible',
    };
  });
  await print.pdf({ path: `${OUT}/print-a4-${name}.pdf`, format: 'A4', printBackground: true });
  await print.screenshot({ path: `${OUT}/print-a4-${name}.png`, fullPage: true });
  results.print.push({ name, ...m });
  say(`printA4 ${name}: docOverflowX=${m.docOverflowX} clipped=${m.clippedElements} nav=${m.printHidden}`);
}

writeFileSync(`${OUT}/render-inspect.json`, JSON.stringify(results, null, 2));
writeFileSync(`${OUT}/render-inspect.log`, log.join('\n') + '\n');
await browser.close();
say('render inspection complete');
