/**
 * G3 programmatic render inspection for GQUR-300 Unit 3 (run001).
 * The review host cannot display images to the reviewer this session, so
 * accessibility/visual criteria are inspected on the LIVE RENDERED DOM of the
 * production build (served at :4173): image loading, alt text, heading
 * hierarchy, link text, viewport overflow at 360px, print-emulation clipping,
 * and figure label extraction. Renders are saved separately as evidence.
 */
import { chromium } from 'playwright-core';
import { writeFileSync } from 'node:fs';

const BASE = 'http://localhost:4173';
const UNIT = '/semester-1/gqur-300/unit-03';
const pages = [
  ['index', `${UNIT}/`],
  ['topic-01', `${UNIT}/topic-01/`],
  ['topic-02', `${UNIT}/topic-02/`],
  ['topic-03', `${UNIT}/topic-03/`],
  ['unit-assessment', `${UNIT}/unit-assessment/`],
  ['unit-teacher-notes', `${UNIT}/unit-teacher-notes/`],
];

const browser = await chromium.launch();
const out = [];
const log = (l) => { out.push(l); console.log(l); };

for (const [name, path] of pages) {
  for (const [label, vp] of [['desktop1280', { width: 1280, height: 800 }], ['narrow360', { width: 360, height: 740 }]]) {
    const ctx = await browser.newContext({ viewport: vp });
    const pg = await ctx.newPage();
    const failed = [];
    pg.on('requestfailed', (r) => failed.push(r.url()));
    await pg.goto(BASE + path, { waitUntil: 'networkidle' });
    await pg.waitForTimeout(1200);
    const data = await pg.evaluate(() => {
      const art = document.querySelector('article') || document.body;
      const imgs = [...art.querySelectorAll('img')].map((i) => ({
        src: i.getAttribute('src'), alt: i.getAttribute('alt'),
        loaded: i.complete && i.naturalWidth > 0,
        renderedW: Math.round(i.getBoundingClientRect().width),
      }));
      const hs = [...art.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => ({ tag: h.tagName, text: h.textContent.trim().slice(0, 50) }));
      const links = [...art.querySelectorAll('a')].map((a) => ({ text: a.textContent.trim().slice(0, 40), href: a.getAttribute('href') }));
      // any element wider than the viewport (potential unscrollable overflow)
      const wide = [...art.querySelectorAll('*')]
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .filter(({ r }) => r.width > 0 && r.right > window.innerWidth + 1 && getComputedStyle(el).overflowX !== 'auto' && getComputedStyle(el).overflowX !== 'scroll' && !el.closest('[overflow-x*=auto], table'))
        .map(({ el, r }) => ({ tag: el.tagName, cls: String(el.className).slice(0, 40), right: Math.round(r.right) }))
        .slice(0, 8);
      return {
        title: document.title,
        docScrollW: document.documentElement.scrollWidth,
        innerW: window.innerWidth,
        imgs, hs, links, wide,
        h1count: art.querySelectorAll('h1').length,
      };
    });
    log(`== ${name} @${label}: docScrollW=${data.docScrollW} innerW=${data.innerW} h1=${data.h1count}`);
    if (data.docScrollW > data.innerW + 1) log(`   PAGE HORIZONTAL OVERFLOW: scrollWidth ${data.docScrollW} > viewport ${data.innerW}`);
    for (const i of data.imgs) log(`   img ${i.src} alt="${i.alt ? i.alt.slice(0, 60) : 'MISSING'}" loaded=${i.loaded} renderedW=${i.renderedW}`);
    const badLinks = data.links.filter((l) => /^(click here|here|link|this)$/i.test(l.text));
    if (badLinks.length) log(`   NON-DESCRIPTIVE LINKS: ${JSON.stringify(badLinks)}`);
    else log(`   links: ${data.links.length} all descriptive; internal: ${data.links.filter((l) => l.href && l.href.startsWith('.')).length}`);
    if (data.wide.length) log(`   ELEMENTS PAST VIEWPORT (non-scrollable): ${JSON.stringify(data.wide)}`);
    // heading hierarchy
    let prev = 0; let skip = [];
    for (const h of data.hs) {
      const lvl = Number(h.tag[1]);
      if (prev && lvl > prev + 1) skip.push(`${h.tag} "${h.text}" after h${prev}`);
      prev = lvl;
    }
    if (skip.length) log(`   HEADING SKIPS: ${skip.join(' | ')}`);
    else log(`   headings ok (${data.hs.length})`);
    if (failed.length) log(`   REQUESTS FAILED: ${failed.join(', ')}`);
    await ctx.close();
  }
}

// Print-emulation clipping check: right-edge overflow of content elements at A4 width
for (const [name, path] of pages) {
  const ctx = await browser.newContext({ viewport: { width: 794, height: 1123 } }); // A4 @96dpi
  const pg = await ctx.newPage();
  await pg.goto(BASE + path, { waitUntil: 'networkidle' });
  await pg.emulateMedia({ media: 'print' });
  await pg.waitForTimeout(500);
  const clip = await pg.evaluate(() => {
    const w = 794;
    return [...document.querySelectorAll('article img, article figure, article table, article pre, article code')]
      .map((el) => ({ el, r: el.getBoundingClientRect() }))
      .filter(({ r }) => r.width > 0 && (r.right > w + 1 || r.left < -1))
      .map(({ el, r }) => ({ tag: el.tagName, src: el.getAttribute('src') || '', right: Math.round(r.right), left: Math.round(r.left) }));
  });
  log(`== ${name} @printA4: clipped elements=${clip.length ? JSON.stringify(clip) : 'none'}`);
  await ctx.close();
}

// Figure SVG label extraction (verify instructional content matches alt text)
for (const [name, path] of pages.filter(([n]) => n.startsWith('topic'))) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const pg = await ctx.newPage();
  await pg.goto(BASE + path, { waitUntil: 'networkidle' });
  await pg.waitForTimeout(1000);
  const figs = await pg.evaluate(async () => {
    const res = [];
    for (const fig of document.querySelectorAll('article figure')) {
      const img = fig.querySelector('img');
      if (!img) continue;
      const r = await fetch(img.getAttribute('src'));
      const svg = await r.text();
      const labels = [...svg.matchAll(/<text[^>]*>([^<]+)<\/text>/g)].map((m) => m[1].trim()).filter(Boolean);
      res.push({ src: img.getAttribute('src'), alt: img.getAttribute('alt'), labels: labels.slice(0, 25) });
    }
    return res;
  });
  for (const f of figs) log(`== figure ${f.src}\n   alt: ${f.alt}\n   labels: ${f.labels.join(' | ')}`);
  // dark variant actually fetched under [data-theme=dark]
  await pg.evaluate(() => { document.documentElement.setAttribute('data-theme', 'dark'); });
  await pg.waitForTimeout(800);
  const darkSrc = await pg.evaluate(() => {
    const img = document.querySelector('article figure img');
    return img ? { currentSrc: img.currentSrc, complete: img.complete && img.naturalWidth > 0 } : null;
  });
  log(`   dark-theme fetch: ${JSON.stringify(darkSrc)}`);
  await ctx.close();
}

await browser.close();
writeFileSync('specs/content/gqur-300/reviews/unit-03/G3/logs-run001/dom-inspection.txt', out.join('\n') + '\n');
console.log('DONE');
