// G5 in-browser render verification for GQUR-300 Unit 5 (Urdu) - agent-g5-gqur300-u5-run001
// The session's image-display tool cannot show PNG/JPEG to the reviewer, so this script
// verifies the rendered pages programmatically: webfont load, RTL direction, text clipping,
// table order, figure load, and canvas pixel sampling of the .ur.svg figures (including
// fig-U5-5's dot geometry: 11 dots at 20,45,50,55,60,62,62,70,70,70,96; mean 60; median 62;
// mode circled at 70).
import { chromium } from '@playwright/test';

const BASE = 'http://127.0.0.1:4173';
const pages = [
  ['index', '/ur/semester-1/gqur-300/unit-05/'],
  ['topic-01', '/ur/semester-1/gqur-300/unit-05/topic-01'],
  ['topic-02', '/ur/semester-1/gqur-300/unit-05/topic-02'],
  ['topic-03', '/ur/semester-1/gqur-300/unit-05/topic-03'],
  ['unit-assessment', '/ur/semester-1/gqur-300/unit-05/unit-assessment'],
  ['unit-teacher-notes', '/ur/semester-1/gqur-300/unit-05/unit-teacher-notes'],
];

const browser = await chromium.launch();
const out = { fontCheck: null, pages: [], figures: {}, bidi: null, print: [] };
try {
  // --- font + direction on index (desktop) ---
  let ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  let page = await ctx.newPage();
  await page.goto(BASE + pages[0][1], { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  out.fontCheck = await page.evaluate(async () => {
    await document.fonts.ready;
    const loaded = [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family);
    return {
      nastaliqUsable: document.fonts.check('16px "Noto Nastaliq Urdu"'),
      loadedFamilies: [...new Set(loaded)],
      htmlDir: document.documentElement.dir,
      bodyFont: getComputedStyle(document.querySelector('article, main, body')).fontFamily,
    };
  });

  // --- per-page clipping + tables + figures (desktop and narrow) ---
  for (const [vpName, width, height] of [['desktop-1280', 1280, 900], ['narrow-360', 360, 800]]) {
    const c = await browser.newContext({ viewport: { width, height } });
    const p = await c.newPage();
    for (const [name, path] of pages) {
      await p.goto(BASE + path, { waitUntil: 'networkidle' });
      await p.waitForTimeout(500);
      const res = await p.evaluate(() => {
        const doc = document.documentElement;
        const clipped = [];
        for (const el of document.querySelectorAll('article p, article li, article td, article th, article h1, article h2, article h3, article h4, figcaption, article code')) {
          const cs = getComputedStyle(el);
          const overX = el.scrollWidth - el.clientWidth;
          if (overX > 2 && cs.overflowX !== 'visible') clipped.push({ tag: el.tagName, text: (el.textContent || '').trim().slice(0, 40), overX });
        }
        const beyondViewport = [];
        for (const el of document.querySelectorAll('article *')) {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && (r.right > doc.clientWidth + 2 || r.left < -2)) beyondViewport.push({ tag: el.tagName, cls: el.className && String(el.className).slice(0, 30), left: Math.round(r.left), right: Math.round(r.right) });
        }
        const tables = [...document.querySelectorAll('article table')].map(t => ({
          dir: getComputedStyle(t).direction,
          firstRowCells: t.querySelector('tr') ? [...t.querySelector('tr').children].map(c => c.textContent.trim().slice(0, 20)) : [],
        }));
        const figs = [...document.querySelectorAll('article figure img')].map(i => ({
          src: i.getAttribute('src'), naturalWidth: i.naturalWidth, naturalHeight: i.naturalHeight, complete: i.complete,
        }));
        return { clipped, beyondViewport: beyondViewport.slice(0, 10), tables, figs, docDir: doc.dir };
      });
      out.pages.push({ viewport: vpName, page: name, ...res });
    }
    await c.close();
  }

  // --- figure pixel sampling (desktop) ---
  const p2 = await ctx.newPage();
  await p2.goto(BASE + pages[1][1], { waitUntil: 'networkidle' });
  const figDefs = [
    ['fig-U5-1', 'topic-01'], ['fig-U5-2', 'topic-01'], ['fig-U5-3', 'topic-02'],
    ['fig-U5-4', 'topic-02'], ['fig-U5-5', 'topic-03'], ['fig-U5-6', 'topic-03'],
  ];
  for (const [fig, pg] of figDefs) {
    await p2.goto(BASE + `/ur/semester-1/gqur-300/unit-05/${pg}`, { waitUntil: 'networkidle' });
    await p2.waitForTimeout(300);
    out.figures[fig] = await p2.evaluate(async (figId) => {
      const img = document.querySelector(`figure img[src*="${figId}"]`);
      if (!img) return { error: 'img not found' };
      const W = img.naturalWidth || 780, H = img.naturalHeight || 470;
      const cv = document.createElement('canvas');
      cv.width = W; cv.height = H;
      const g = cv.getContext('2d');
      g.drawImage(img, 0, 0, W, H);
      const data = g.getImageData(0, 0, W, H).data;
      const px = (x, y) => {
        const i = ((Math.round(y) * W) + Math.round(x)) * 4;
        return [data[i], data[i + 1], data[i + 2]];
      };
      const lum = (x, y) => { const [r, gg, b] = px(x, y); return 0.299 * r + 0.587 * gg + 0.114 * b; };
      const inkIn = (x0, y0, x1, y1) => {
        let ink = 0, n = 0;
        for (let y = y0; y <= y1; y += 2) for (let x = x0; x <= x1; x += 2) { n++; if (lum(x, y) < 140) ink++; }
        return { ink, n, ratio: +(ink / n).toFixed(4) };
      };
      const res = { W, H, titleBand: inkIn(150, 35, 630, 85), captionBand: inkIn(150, H - 75, 630, H - 25) };
      if (figId === 'fig-U5-5') {
        const dots = [[720, 316], [532, 316], [495, 316], [458, 316], [420, 316], [405, 316], [405, 294], [345, 316], [345, 294], [345, 272], [150, 316]];
        res.dots = dots.map(([x, y]) => +lum(x, y).toFixed(0));
        const lineInk = (x) => { let hit = 0; for (let y = 125; y < 338; y += 3) if (lum(x, y) < 190) hit++; return hit; };
        res.meanLineX420 = lineInk(420);
        res.medianLineX405 = lineInk(405);
        res.axisLabels = { at20: inkIn(705, 355, 735, 375), at100: inkIn(105, 355, 135, 375), at60: inkIn(405, 355, 435, 375) };
        const cx = 345, cy = 294, r = 26;
        res.modeRing = [0, 90, 180, 270].map(a => {
          const rad = a * Math.PI / 180;
          const [rr, gg, b] = px(cx + r * Math.cos(rad), cy + r * Math.sin(rad));
          return [rr, gg, b];
        });
        res.gapBetweenDotsIsLight = +lum(480, 316).toFixed(0);
      }
      return res;
    }, fig);
  }

  // --- bidi spot check: digit runs intact in rendered text ---
  await p2.goto(BASE + pages[3][1], { waitUntil: 'networkidle' });
  out.bidi = await p2.evaluate(() => {
    const text = document.body.innerText;
    const wanted = ['57.54', '64.23', '50.21', '46.29', '54.57', '14.02', '2.97', '660', '11,120', '4,200', '55,600', '39,000'];
    const found = {};
    for (const w of wanted) found[w] = text.includes(w);
    const reversed = ['45.75', '32.46', '12.05', '75.45', '20.41', '79.2'];
    const revFound = {};
    for (const w of reversed) revFound[w] = text.includes(w);
    return { found, reversedStringsPresent: revFound };
  });

  // --- print emulation checks ---
  const c3 = await browser.newContext({ viewport: { width: 794, height: 1123 } });
  const p3 = await c3.newPage();
  await p3.emulateMedia({ media: 'print' });
  for (const [name, path] of pages) {
    await p3.goto(BASE + path, { waitUntil: 'networkidle' });
    await p3.waitForTimeout(400);
    out.print.push({
      page: name,
      ...(await p3.evaluate(() => {
        const nav = document.querySelector('navbar, nav');
        const clipped = [];
        for (const el of document.querySelectorAll('article p, article li, article td, article th, figcaption')) {
          const cs = getComputedStyle(el);
          if (el.scrollWidth - el.clientWidth > 2 && cs.overflowX !== 'visible') clipped.push((el.textContent || '').trim().slice(0, 30));
        }
        return { navDisplayed: nav ? getComputedStyle(nav).display : 'none-found', clippedCount: clipped.length, clipped: clipped.slice(0, 5) };
      })),
    });
  }
  await c3.close();
  await ctx.close();
} finally {
  await browser.close();
}
console.log(JSON.stringify(out, null, 1));
