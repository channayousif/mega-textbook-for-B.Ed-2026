import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const OUT = process.argv[2];
const BASE = 'http://localhost:3105/semester-1/efmp-302/unit-05';
const pages = [['index','/'],['topic-01','/topic-01'],['topic-02','/topic-02'],['topic-03','/topic-03'],['topic-04','/topic-04'],['unit-assessment','/unit-assessment'],['unit-teacher-notes','/unit-teacher-notes']];
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
console.log('browser:', browser.version(), '| engine: chromium (playwright 1.61.1, headless)');
const report = {};
for (const [name, path] of pages) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
  page.on('pageerror', e => consoleErrors.push('pageerror: ' + e.message));
  const resp = await page.goto(BASE + path, { waitUntil: 'networkidle' });
  const status = resp && resp.status();
  await page.screenshot({ path: `${OUT}/${name}-desktop-1280x900.png`, fullPage: true });

  const audit = await page.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    const hs = [...main.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => ({ lvl: +h.tagName[1], text: h.textContent.replace(/[#​]/g,'').trim().slice(0,110) }));
    const imgs = [...main.querySelectorAll('img')].map(i => ({ src: (i.getAttribute('src')||'').slice(-70), alt: i.getAttribute('alt'), w: i.naturalWidth, h: i.naturalHeight }));
    const figs = [...main.querySelectorAll('figure')].map(f => ({ cap: (f.querySelector('figcaption')||{}).textContent?.trim().slice(0,90) || null }));
    const links = [...main.querySelectorAll('a')].map(a => ({ text: a.textContent.trim().slice(0,70), href: (a.getAttribute('href')||'').slice(0,80) }));
    const vague = links.filter(l => /^(here|click here|link|read more|this|more)$/i.test(l.text));
    const bareUrl = links.filter(l => /^https?:\/\//i.test(l.text));
    const tables = [...main.querySelectorAll('table')].map(t => ({ hasTh: !!t.querySelector('th'), cols: t.querySelectorAll('tr') [0]?.children.length || 0 }));
    return { title: document.title, h1: hs.filter(h=>h.lvl===1).length, headings: hs, imgs, figs,
      linkCount: links.length, vagueLinks: vague, bareUrlLinks: bareUrl.length, tables,
      hasSkipLink: !!document.querySelector('a[href="#__docusaurus_skipToContent_fallback"], a.skipToContent_fallback, a[href^="#main"]') };
  });
  // heading order violations
  const viol = [];
  let prev = 0;
  for (const h of audit.headings) { if (prev && h.lvl > prev + 1) viol.push(`h${prev} -> h${h.lvl} at "${h.text}"`); prev = h.lvl; }
  audit.headingOrderViolations = viol;

  // narrow viewport
  await page.setViewportSize({ width: 360, height: 740 });
  await page.waitForTimeout(400);
  const overflow = await page.evaluate(() => {
    const de = document.documentElement;
    const bad = [];
    const main = document.querySelector('main') || document.body;
    for (const el of main.querySelectorAll('table, pre, img, figure, blockquote, ul, ol, p, h1, h2, h3')) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && (r.right > window.innerWidth + 1 || r.left < -1)) {
        bad.push({ tag: el.tagName, cls: (el.className||'').toString().slice(0,40), right: Math.round(r.right), text: (el.textContent||'').trim().slice(0,60) });
      }
    }
    return { docScrollW: de.scrollWidth, innerW: window.innerWidth, horizontalPageScroll: de.scrollWidth > window.innerWidth + 1, clipped: bad.slice(0, 12) };
  });
  await page.screenshot({ path: `${OUT}/${name}-narrow-360x740.png`, fullPage: true });

  // print emulation
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.emulateMedia({ media: 'print' });
  await page.waitForTimeout(300);
  const printInfo = await page.evaluate(() => {
    const main = document.querySelector('main') || document.body;
    const hiddenTxt = [];
    for (const el of main.querySelectorAll('table, figure, img, h2, h3, ol, ul')) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden') hiddenTxt.push({ tag: el.tagName, text: (el.textContent||'').trim().slice(0,60) });
    }
    const A4 = 794; // ~210mm at 96dpi
    const wide = [];
    for (const el of main.querySelectorAll('table, pre, figure, img')) {
      const r = el.getBoundingClientRect();
      if (r.width > A4) wide.push({ tag: el.tagName, w: Math.round(r.width), text: (el.textContent||'').trim().slice(0,60) });
    }
    return { hiddenInPrint: hiddenTxt.slice(0,15), widerThanA4: wide.slice(0,10) };
  });
  await page.screenshot({ path: `${OUT}/${name}-print-emulated.png`, fullPage: true });
  await page.pdf({ path: `${OUT}/${name}-A4.pdf`, format: 'A4', printBackground: true, margin: { top:'15mm', bottom:'15mm', left:'15mm', right:'15mm' } });
  await page.emulateMedia({ media: null });
  report[name] = { status, ...audit, narrow: overflow, print: printInfo, consoleErrors };
  await ctx.close();
  console.log(`rendered ${name}: http ${status}`);
}
await browser.close();
console.log('\n===== AUDIT JSON =====');
console.log(JSON.stringify(report, null, 1));
