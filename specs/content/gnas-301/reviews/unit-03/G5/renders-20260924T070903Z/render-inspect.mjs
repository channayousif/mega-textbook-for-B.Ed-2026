// G5 Urdu render inspection for GNAS-301 Unit 3 - served build at
// http://127.0.0.1:4617 (fresh `npm run build`, log: ../logs-20260924T070903Z/build-retry.log,
// bound commit d9a616f). Desktop 1280x900, narrow 360x780, A4 print emulation per the G5
// rubric: RTL direction, Nastaliq font application, .ur.svg figure variants, bidi
// punctuation/numerals/Latin embeds, table order and scroll reachability, clipping.
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4617';
const OUT = 'specs/content/gnas-301/reviews/unit-03/G5/renders-20260924T070903Z';
const PAGES = [
  ['index', '/ur/semester-1/gnas-301/unit-03/'],
  ['topic-01', '/ur/semester-1/gnas-301/unit-03/topic-01'],
  ['topic-02', '/ur/semester-1/gnas-301/unit-03/topic-02'],
  ['topic-03', '/ur/semester-1/gnas-301/unit-03/topic-03'],
  ['topic-04', '/ur/semester-1/gnas-301/unit-03/topic-04'],
  ['unit-assessment', '/ur/semester-1/gnas-301/unit-03/unit-assessment'],
  ['unit-teacher-notes', '/ur/semester-1/gnas-301/unit-03/unit-teacher-notes'],
];

const browser = await chromium.launch();
const audit = { base: BASE, locale: 'ur', started: new Date().toISOString(), browser: await browser.version(), commit: 'd9a616f', pages: [] };

// Screenshot with retry: the shared box occasionally fails Page.captureScreenshot
// under transient load; retry after a pause rather than losing the whole pass.
const shot = async (page, opts, tries = 4) => {
  for (let i = 1; ; i++) {
    try { return await page.screenshot(opts); }
    catch (e) {
      if (i >= tries) throw e;
      await new Promise((r) => setTimeout(r, 1500 * i));
    }
  }
};

for (const [name, path] of PAGES) {
  const entry = { name, path, desktop: {}, narrow: {}, print: {} };

  // ---- desktop 1280x900 ----
  const dctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const dpage = await dctx.newPage();
  const errors = [];
  dpage.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  dpage.on('pageerror', (e) => errors.push(String(e)));
  await dpage.goto(BASE + path, { waitUntil: 'networkidle' });
  await dpage.waitForTimeout(500);
  entry.desktop = await dpage.evaluate(() => {
    const doc = document.documentElement;
    const imgs = [...document.querySelectorAll('article img')];
    const broken = imgs.filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src'));
    const noAlt = imgs.filter((i) => !(i.getAttribute('alt') || '').trim()).map((i) => i.getAttribute('src'));
    const body = document.body;
    const bodyFont = getComputedStyle(body).fontFamily;
    const sample = document.querySelector('article p');
    const sampleFont = sample ? getComputedStyle(sample).fontFamily : null;
    // bidi probes: Latin embeds (dB, PM2.5, MCQ letters), digits, punctuation
    const text = document.querySelector('article').innerText;
    const latinEmbeds = [...new Set((text.match(/[A-Za-z][A-Za-z0-9.]*/g) || []))].slice(0, 25);
    const westernDigits = [...new Set((text.match(/[0-9]/g) || []))];
    const easternDigits = [...new Set((text.match(/[۰-۹]/g) || []))];
    return {
      title: document.title,
      htmlDir: doc.getAttribute('dir'),
      htmlLang: doc.getAttribute('lang'),
      h1Count: document.querySelectorAll('article h1').length,
      h1Text: (document.querySelector('article h1') || {}).textContent?.trim().slice(0, 80) ?? null,
      imgCount: imgs.length,
      urSvgCount: imgs.filter((i) => (i.getAttribute('src') || '').includes('.ur.svg')).length,
      brokenImages: broken,
      imagesWithoutAlt: noAlt,
      bodyFont,
      sampleFont,
      nastaliqApplied: /Nastaliq|Noto Nastaliq/i.test(bodyFont + ' ' + (sampleFont || '')),
      latinEmbeds,
      westernDigits,
      easternDigits,
      docScrollWidth: doc.scrollWidth,
      docClientWidth: doc.clientWidth,
      docOverflowX: doc.scrollWidth > doc.clientWidth,
      linksNoText: [...document.querySelectorAll('article a')].filter((a) => !a.textContent.trim() && !a.getAttribute('aria-label')).length,
    };
  });
  entry.desktop.consoleErrors = errors;
  await shot(dpage, { path: `${OUT}/desktop-${name}.png`, fullPage: false });

  // figure checks on desktop: force lazy-load, measure alt/figcaption/pixels
  entry.desktop.figures = await dpage.evaluate(async () => {
    const figs = [...document.querySelectorAll('article figure')];
    const out = [];
    for (const f of figs) {
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
      out.push({
        id: f.id || img?.getAttribute('src') || null,
        src: img?.getAttribute('src'),
        altStartsWithUrdu: /[؀-ۿ]/.test(img?.getAttribute('alt') || ''),
        altLen: (img?.getAttribute('alt') || '').length,
        hasFigcaption: !!f.querySelector('figcaption'),
        loaded: !!(img && img.complete && img.naturalWidth > 0),
        pixelStddev,
      });
    }
    return out;
  });
  // one full-page desktop screenshot for Nastaliq legibility inspection
  if (name === 'topic-01' || name === 'unit-assessment') {
    await shot(dpage, { path: `${OUT}/desktop-${name}-fullpage.png`, fullPage: true });
  }
  await dctx.close();

  // ---- narrow 360x780 ----
  const nctx = await browser.newContext({ viewport: { width: 360, height: 780 } });
  const npage = await nctx.newPage();
  await npage.goto(BASE + path, { waitUntil: 'networkidle' });
  await npage.waitForTimeout(500);
  entry.narrow = await npage.evaluate(() => {
    const doc = document.documentElement;
    const tables = [...document.querySelectorAll('article table')].map((t) => {
      const rect = t.getBoundingClientRect();
      const cols = [...t.querySelectorAll('tr')][0] ? [...t.querySelectorAll('tr')][0].children : [];
      const lastCol = cols[cols.length - 1];
      const before = lastCol ? { left: Math.round(lastCol.getBoundingClientRect().left) } : null;
      t.scrollLeft = t.scrollWidth * -1; // RTL: scroll toward the inline-end
      const after = lastCol ? { left: Math.round(lastCol.getBoundingClientRect().left) } : null;
      t.scrollLeft = 0;
      return {
        clientWidth: t.clientWidth,
        scrollWidth: t.scrollWidth,
        fits: t.scrollWidth <= t.clientWidth,
        tableDirection: getComputedStyle(t).direction,
        lastColLeftBeforeScroll: before?.left ?? null,
        lastColLeftAfterScroll: after?.left ?? null,
        hydrationAttrs: {
          tabindex: t.getAttribute('tabindex'),
          role: t.getAttribute('role'),
          ariaLabel: t.getAttribute('aria-label'),
        },
      };
    });
    const figs = [...document.querySelectorAll('article figure img')].map((i) => {
      const r = i.getBoundingClientRect();
      return { src: i.getAttribute('src'), left: Math.round(r.left), right: Math.round(r.right), fits: r.left >= 0 && r.right <= 360 };
    });
    return {
      docScrollWidth: doc.scrollWidth,
      docClientWidth: doc.clientWidth,
      docOverflowX: doc.scrollWidth > doc.clientWidth,
      tables,
      figures: figs,
    };
  });
  await shot(npage, { path: `${OUT}/narrow360-${name}.png`, fullPage: false });
  await nctx.close();

  // ---- A4 print emulation ----
  const pctx = await browser.newContext({ viewport: { width: 794, height: 1123 } });
  const ppage = await pctx.newPage();
  await ppage.emulateMedia({ media: 'print' });
  await ppage.goto(BASE + path, { waitUntil: 'networkidle' });
  await ppage.waitForTimeout(500);
  entry.print = await ppage.evaluate(() => {
    const doc = document.documentElement;
    const clipped = [...document.querySelectorAll('article *')].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.right > 795 || r.left < -1);
    }).slice(0, 5).map((el) => el.tagName + '.' + String(el.className).slice(0, 40));
    const navbar = document.querySelector('.navbar, nav');
    const sidebar = document.querySelector('.theme-doc-sidebar-container, .docs-wrapper aside');
    const figs = [...document.querySelectorAll('article figure img')].map((i) => {
      const r = i.getBoundingClientRect();
      return { src: i.getAttribute('src'), right: Math.round(r.right), loaded: i.complete && i.naturalWidth > 0 };
    });
    const answers = [...document.querySelectorAll('article h2, article h3')].find((h) => /جوابات|نمبر دینے/i.test(h.textContent));
    return {
      docScrollWidth: doc.scrollWidth,
      docOverflowX: doc.scrollWidth > doc.clientWidth,
      clippedElems: clipped,
      navbarHidden: navbar ? getComputedStyle(navbar).display === 'none' : 'no-navbar',
      sidebarHidden: sidebar ? getComputedStyle(sidebar).display === 'none' : 'no-sidebar',
      figures: figs,
      allFiguresFit: figs.every((f) => f.right <= 794 && f.loaded),
      answersHeadingY: answers ? Math.round(answers.getBoundingClientRect().top + window.scrollY) : null,
    };
  });
  await ppage.pdf({ path: `${OUT}/print-a4-${name}.pdf`, format: 'A4', printBackground: true });
  await shot(ppage, { path: `${OUT}/printview-${name}.png`, fullPage: false });
  await pctx.close();

  audit.pages.push(entry);
  console.log(`${name}: desktop(dir=${entry.desktop.htmlDir}, errors=${(entry.desktop.consoleErrors || []).length}, broken=${entry.desktop.brokenImages.length}, noAlt=${entry.desktop.imagesWithoutAlt.length}, urSvg=${entry.desktop.urSvgCount}/${entry.desktop.imgCount}, nastaliq=${entry.desktop.nastaliqApplied}) narrow(overflow=${entry.narrow.docOverflowX}, tables=${entry.narrow.tables.length}) print(clipped=${entry.print.clippedElems.length}, figsFit=${entry.print.allFiguresFit})`);
}

audit.completed = new Date().toISOString();
writeFileSync(`${OUT}/render-inspect.json`, JSON.stringify(audit, null, 1));
await browser.close();
console.log('render inspection complete');
