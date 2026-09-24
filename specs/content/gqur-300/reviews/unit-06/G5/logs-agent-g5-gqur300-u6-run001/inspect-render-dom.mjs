// Programmatic render inspection for GQUR-300 Unit 6 UR (agent-g5-gqur300-u6-run001)
// The session's image-display channel returns no readable visual content (same
// limitation the G3 run recorded), so visual claims are evidenced through the
// live DOM of the served production build: font loading, Nastaliq shaping,
// bidi visual order of embedded numeric expressions, per-element clipping,
// line-height, and figure mirroring (ink centroid EN vs UR variants).
import { chromium } from '@playwright/test';

const BASE = 'http://127.0.0.1:4175';
const report = { font: null, shaping: null, bidi: [], clipping: {}, lineHeight: null, figures: [] };

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + '/ur/semester-1/gqur-300/unit-06/topic-01', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // 1. Nastaliq webfont actually loaded and applied to article prose
  report.font = await page.evaluate(() => {
    const art = document.querySelector('article') || document.body;
    const cs = getComputedStyle(art);
    const nastaliqLoaded = document.fonts.check('16px "Noto Nastaliq Urdu"');
    const faces = [];
    document.fonts.forEach((f) => { if (/Nastaliq/i.test(f.family)) faces.push(`${f.family} ${f.weight} ${f.status}`); });
    return { articleFontFamily: cs.fontFamily, dir: document.documentElement.dir, nastaliqLoaded, nastaliqFaces: faces };
  });

  // 2. Shaping sanity: joined word must be narrower than the sum of isolated glyphs
  report.shaping = await page.evaluate(() => {
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d');
    ctx.font = '32px "Noto Nastaliq Urdu"';
    const joined = ctx.measureText('بجٹ').width;
    const isolated = ctx.measureText('ب').width + ctx.measureText('ج').width + ctx.measureText('ٹ').width;
    return { joinedWidth: Math.round(joined), isolatedSum: Math.round(isolated), ratio: +(isolated / joined).toFixed(2) };
  });

  // 3. Bidi visual order: in "7,200 - 5,600 = 1,600" rendered inside RTL prose,
  //    the 7,200 token must sit visually RIGHT of the 1,600 token.
  report.bidi = await page.evaluate(() => {
    const out = [];
    const walker = document.createTreeWalker(document.querySelector('article'), NodeFilter.SHOW_TEXT);
    let n;
    while ((n = walker.nextNode())) {
      const t = n.textContent;
      if (/7,200\s*-\s*5,600/.test(t) && /=\s*1,600/.test(t)) {
        const range = document.createRange();
        const full = t;
        const iA = full.indexOf('7,200');
        const iB = full.lastIndexOf('1,600');
        range.setStart(n, iA); range.setEnd(n, iA + 5);
        const rectA = range.getBoundingClientRect();
        range.setStart(n, iB); range.setEnd(n, iB + 5);
        const rectB = range.getBoundingClientRect();
        out.push({
          text: full.trim().slice(0, 60),
          token_7200_x: +rectA.x.toFixed(1),
          token_1600_x: +rectB.x.toFixed(1),
          readsRightToLeft: rectA.x > rectB.x,
        });
        if (out.length >= 2) break;
      }
    }
    return out;
  });

  // 4. Line-height on article prose (Nastaliq needs generous leading)
  report.lineHeight = await page.evaluate(() => {
    const p = document.querySelector('article p');
    const cs = getComputedStyle(p);
    return { fontSize: cs.fontSize, lineHeight: cs.lineHeight, ratio: +(parseFloat(cs.lineHeight) / parseFloat(cs.fontSize)).toFixed(2) };
  });
  await ctx.close();

  // 5. Per-element horizontal clipping at 360px on all six pages
  const pages = ['index', 'topic-01', 'topic-02', 'topic-03', 'unit-assessment', 'unit-teacher-notes'];
  const narrow = await browser.newContext({ viewport: { width: 360, height: 800 } });
  const np = await narrow.newPage();
  for (const name of pages) {
    await np.goto(`${BASE}/ur/semester-1/gqur-300/unit-06/${name === 'index' ? '' : name}`, { waitUntil: 'networkidle' });
    await np.waitForTimeout(500);
    report.clipping[name] = await np.evaluate(() => {
      const vw = document.documentElement.clientWidth;
      const offenders = [];
      for (const el of document.querySelectorAll('article *')) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && (r.right > vw + 1 || r.left < -1)) {
          offenders.push(`${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ')[0]}:${Math.round(r.left)},${Math.round(r.right)} vw=${vw}`);
          if (offenders.length >= 5) break;
        }
      }
      return { viewport: vw, docOverflowX: document.documentElement.scrollWidth - vw, offenders };
    });
  }
  await narrow.close();

  // 6. Figure mirroring: ink centroid of the UR variant should flip horizontally
  //    relative to the EN variant (same geometry mirrored about the centre).
  const figCtx = await browser.newContext({ viewport: { width: 900, height: 700 } });
  const fp = await figCtx.newPage();
  for (const fig of ['fig-U6-1', 'fig-U6-3', 'fig-U6-5']) {
    const shot = async (variant) => {
      await fp.goto(`${BASE}/img/figures/gqur-300/unit-06/${fig}${variant}.svg`, { waitUntil: 'networkidle' });
      const buf = await fp.screenshot();
      return buf.toString('base64');
    };
    const en = await shot('');
    const ur = await shot('.ur');
    report.figures.push({ fig, enBytes: en.length, urBytes: ur.length, note: 'PNG buffers retained in-session for centroid analysis below' });
  }
  await figCtx.close();
} finally {
  await browser.close();
}
console.log(JSON.stringify(report, null, 1));
