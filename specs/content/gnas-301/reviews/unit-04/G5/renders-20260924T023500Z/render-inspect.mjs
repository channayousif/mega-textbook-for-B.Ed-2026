// G5 Urdu render inspection for GNAS-301 Unit 4 - isolated build at build/g5-u4,
// served at http://127.0.0.1:4621 (build log: ../logs-20260924T000000Z/03-build-retry.txt,
// exit 0). Desktop 1280x900, narrow 360x780, A4 print emulation per the G5 rubric:
// RTL direction, Nastaliq font in effect, .ur.svg figure variants loaded, table
// RTL order and swipe reachability, overflow/clipping, bidi numerals and embedded
// Latin strings in the Urdu prose.
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4621';
const OUT = 'specs/content/gnas-301/reviews/unit-04/G5/renders-20260924T023500Z';
const PAGES = [
  ['index', '/ur/semester-1/gnas-301/unit-04/'],
  ['topic-01', '/ur/semester-1/gnas-301/unit-04/topic-01/'],
  ['topic-02', '/ur/semester-1/gnas-301/unit-04/topic-02/'],
  ['topic-03', '/ur/semester-1/gnas-301/unit-04/topic-03/'],
  ['topic-04', '/ur/semester-1/gnas-301/unit-04/topic-04/'],
  ['topic-05', '/ur/semester-1/gnas-301/unit-04/topic-05/'],
  ['topic-06', '/ur/semester-1/gnas-301/unit-04/topic-06/'],
  ['topic-07', '/ur/semester-1/gnas-301/unit-04/topic-07/'],
  ['unit-assessment', '/ur/semester-1/gnas-301/unit-04/unit-assessment/'],
  ['unit-teacher-notes', '/ur/semester-1/gnas-301/unit-04/unit-teacher-notes/'],
];

const browser = await chromium.launch();
const audit = { base: BASE, locale: 'ur', started: new Date().toISOString(), browser: await browser.version(), pages: [] };
mkdirSync(OUT, { recursive: true });

for (const [name, path] of PAGES) {
  const entry = { name, path, desktop: {}, narrow: {}, print: {} };

  // ---- desktop 1280x900 ----
  const dctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const dpage = await dctx.newPage();
  const errors = [];
  dpage.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  dpage.on('pageerror', (e) => errors.push(String(e)));
  await dpage.goto(BASE + path, { waitUntil: 'networkidle' });
  await dpage.waitForTimeout(400);
  entry.desktop = await dpage.evaluate(async () => {
    const html = document.documentElement;
    const article = document.querySelector('article') || document.body;
    const probe = article.querySelector('p') || article;
    const cs = getComputedStyle(probe);
    const imgs = [...document.querySelectorAll('article img')];
    const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src'));
    const noAlt = imgs.filter((i) => !(i.getAttribute('alt') || '').trim()).map((i) => i.getAttribute('src'));
    const figs = [];
    for (const f of document.querySelectorAll('article figure')) {
      const img = f.querySelector('img');
      if (img && !img.complete) await new Promise((r) => { img.onload = img.onerror = r; setTimeout(r, 2500); });
      const canvas = document.createElement('canvas');
      let pixelStddev = null;
      if (img && img.complete && img.naturalWidth > 0) {
        canvas.width = 60; canvas.height = 40;
        const cx = canvas.getContext('2d');
        try {
          cx.drawImage(img, 0, 0, 60, 40);
          const d = cx.getImageData(0, 0, 60, 40).data;
          let sum = 0, sq = 0, n = 0;
          for (let i = 0; i < d.length; i += 4) { sum += d[i]; sq += d[i] * d[i]; n++; }
          pixelStddev = Math.round(Math.sqrt(sq / n - (sum / n) ** 2) * 10) / 10;
        } catch { pixelStddev = 'tainted'; }
      }
      figs.push({
        src: img?.getAttribute('src'),
        urVariant: !!img?.getAttribute('src')?.includes('.ur.svg'),
        loaded: !!(img && img.complete && img.naturalWidth > 0),
        pixelStddev,
        altLen: (img?.getAttribute('alt') || '').length,
      });
    }
    return {
      title: document.title,
      htmlDir: html.getAttribute('dir'),
      bodyFontFamily: cs.fontFamily,
      lineHeight: cs.lineHeight,
      imgCount: imgs.length,
      brokenImages: broken,
      imagesWithoutAlt: noAlt,
      figures: figs,
      docOverflowX: html.scrollWidth > html.clientWidth,
      latinTokens: [...article.querySelectorAll('p, li, td, h1, h2, h3')]
        .map((el) => el.textContent).join(' ').match(/[A-Za-z][A-Za-z0-9.:/-]{2,}/g)?.slice(0, 40) || [],
      westernDigits: [...article.querySelectorAll('p, li, td')]
        .map((el) => el.textContent).join(' ').match(/[0-9]+/g)?.slice(0, 30) || [],
    };
  });
  entry.desktop.consoleErrors = errors;
  await dpage.screenshot({ path: `${OUT}/desktop-${name}.png`, fullPage: false });
  await dctx.close();

  // ---- narrow 360x780 ----
  const nctx = await browser.newContext({ viewport: { width: 360, height: 780 } });
  const npage = await nctx.newPage();
  await npage.goto(BASE + path, { waitUntil: 'networkidle' });
  await npage.waitForTimeout(400);
  entry.narrow = await npage.evaluate(() => {
    const html = document.documentElement;
    const tables = [...document.querySelectorAll('article table')].map((t) => {
      const rect = t.getBoundingClientRect();
      const cols = [...t.querySelectorAll('tr')][0] ? [...t.querySelectorAll('tr')][0].children : [];
      const lastCol = cols[cols.length - 1];
      const before = lastCol ? { left: Math.round(lastCol.getBoundingClientRect().left) } : null;
      t.scrollLeft = t.scrollWidth * -1; // RTL: scroll fully toward the reading start
      const after = lastCol ? { left: Math.round(lastCol.getBoundingClientRect().left) } : null;
      t.scrollLeft = 0;
      return {
        dir: getComputedStyle(t).direction,
        clientWidth: t.clientWidth,
        scrollWidth: t.scrollWidth,
        fits: t.scrollWidth <= t.clientWidth,
        firstColRightEdge: rect.right <= 360,
        lastColReachable: after ? after.left >= -1 && after.left < 360 : true,
        tabindex: t.getAttribute('tabindex'),
        role: t.getAttribute('role'),
        ariaLabel: t.getAttribute('aria-label'),
      };
    });
    const figs = [...document.querySelectorAll('article figure img')].map((i) => {
      const r = i.getBoundingClientRect();
      return { src: i.getAttribute('src'), left: Math.round(r.left), right: Math.round(r.right), fits: r.left >= -1 && r.right <= 361 };
    });
    return {
      docScrollWidth: html.scrollWidth,
      docClientWidth: html.clientWidth,
      docOverflowX: html.scrollWidth > html.clientWidth,
      tables,
      figures: figs,
    };
  });
  await npage.screenshot({ path: `${OUT}/narrow360-${name}.png`, fullPage: false });
  await nctx.close();

  // ---- A4 print emulation ----
  const pctx = await browser.newContext({ viewport: { width: 794, height: 1123 } });
  const ppage = await pctx.newPage();
  await ppage.emulateMedia({ media: 'print' });
  await ppage.goto(BASE + path, { waitUntil: 'networkidle' });
  await ppage.waitForTimeout(400);
  entry.print = await ppage.evaluate(() => {
    const html = document.documentElement;
    const clipped = [...document.querySelectorAll('article *')].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.right > 795 || r.left < -1);
    }).slice(0, 5).map((el) => el.tagName + '.' + String(el.className).slice(0, 40));
    const navbar = document.querySelector('.navbar, nav');
    const sidebar = document.querySelector('.theme-doc-sidebar-container, .docs-wrapper aside');
    const figs = [...document.querySelectorAll('article figure img')].map((i) => {
      const r = i.getBoundingClientRect();
      return { src: i.getAttribute('src'), right: Math.round(r.right), left: Math.round(r.left), loaded: i.complete && i.naturalWidth > 0 };
    });
    return {
      docOverflowX: html.scrollWidth > html.clientWidth,
      clippedElems: clipped,
      navbarHidden: navbar ? getComputedStyle(navbar).display === 'none' : 'no-navbar',
      sidebarHidden: sidebar ? getComputedStyle(sidebar).display === 'none' : 'no-sidebar',
      figures: figs,
      allFiguresFit: figs.every((f) => f.right <= 794 && f.left >= -1 && f.loaded),
    };
  });
  await ppage.pdf({ path: `${OUT}/print-a4-${name}.pdf`, format: 'A4', printBackground: true });
  await ppage.screenshot({ path: `${OUT}/printview-${name}.png`, fullPage: false });
  await pctx.close();

  audit.pages.push(entry);
  console.log(`${name}: dir=${entry.desktop.htmlDir} font=${entry.desktop.bodyFontFamily?.split(',')[0]} figs=${entry.desktop.figures.length}(ur=${entry.desktop.figures.filter((f) => f.urVariant).length},broken=${entry.desktop.brokenImages.length}) narrow(overflow=${entry.narrow.docOverflowX},tables=${entry.narrow.tables.length},figsFit=${entry.narrow.figures.every((f) => f.fits)}) print(clipped=${entry.print.clippedElems.length},figsFit=${entry.print.allFiguresFit}) errors=${(entry.desktop.consoleErrors || []).length}`);
}

audit.completed = new Date().toISOString();
writeFileSync(`${OUT}/render-inspect.json`, JSON.stringify(audit, null, 1));
await browser.close();
console.log('G5 render inspection complete');
