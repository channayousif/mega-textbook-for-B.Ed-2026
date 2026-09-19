import { chromium } from '@playwright/test';
import { writeFileSync } from 'node:fs';

const BASE = 'http://localhost:3103';
const OUT = '/home/a2ahs/mega_book_for_B.Ed/specs/content/efmp-302/reviews/unit-03/render-run005';
const PAGES = [
  ['index', '/semester-1/efmp-302/unit-03/'],
  ['topic-01', '/semester-1/efmp-302/unit-03/topic-01/'],
  ['topic-02', '/semester-1/efmp-302/unit-03/topic-02/'],
  ['topic-03', '/semester-1/efmp-302/unit-03/topic-03/'],
  ['topic-04', '/semester-1/efmp-302/unit-03/topic-04/'],
  ['topic-05', '/semester-1/efmp-302/unit-03/topic-05/'],
  ['unit-assessment', '/semester-1/efmp-302/unit-03/unit-assessment/'],
  ['unit-teacher-notes', '/semester-1/efmp-302/unit-03/unit-teacher-notes/'],
];

const probe = () => {
  const res = { url: location.pathname, title: document.title };
  res.headings = [...document.querySelectorAll('main h1,main h2,main h3,main h4')]
    .map((h) => `${h.tagName} ${h.textContent.trim().slice(0, 90)}`);
  res.images = [...document.querySelectorAll('main img')].map((i) => ({
    src: i.getAttribute('src'),
    alt: i.getAttribute('alt'),
    altLen: (i.getAttribute('alt') || '').length,
    loading: i.getAttribute('loading'),
    natural: `${i.naturalWidth}x${i.naturalHeight}`,
    rendered: `${Math.round(i.getBoundingClientRect().width)}x${Math.round(i.getBoundingClientRect().height)}`,
    complete: i.complete,
  }));
  // any element in main whose content scrolls horizontally
  res.scrollers = [...document.querySelectorAll('main *')]
    .filter((e) => e.scrollWidth - e.clientWidth > 2 && e.clientWidth > 0)
    .map((e) => ({
      tag: e.tagName,
      cls: (e.getAttribute('class') || '').slice(0, 70),
      role: e.getAttribute('role'),
      tabindex: e.getAttribute('tabindex'),
      ariaLabel: e.getAttribute('aria-label'),
      ariaLabelledby: e.getAttribute('aria-labelledby'),
      overflowX: getComputedStyle(e).overflowX,
      scrollWidth: e.scrollWidth,
      clientWidth: e.clientWidth,
      containsImg: !!e.querySelector('img'),
      containsTable: !!e.querySelector('table'),
    }));
  res.pageOverflow = {
    docScrollWidth: document.documentElement.scrollWidth,
    docClientWidth: document.documentElement.clientWidth,
    overflows: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
  };
  // elements wider than the viewport (clipping / overflow culprits)
  res.tooWide = [...document.querySelectorAll('main *')]
    .filter((e) => e.getBoundingClientRect().width > window.innerWidth + 1)
    .map((e) => `${e.tagName}.${(e.getAttribute('class') || '').split(' ')[0]} w=${Math.round(e.getBoundingClientRect().width)}`)
    .slice(0, 12);
  res.links = [...document.querySelectorAll('main a')]
    .map((a) => a.textContent.trim())
    .filter((t) => /^(here|click here|link|read more|this)$/i.test(t));
  res.tables = document.querySelectorAll('main table').length;
  res.checkboxItems = [...document.querySelectorAll('main li')].filter((l) => /^\[ \]/.test(l.textContent.trim())).length;
  return res;
};

const report = { started_at: new Date().toISOString(), base: BASE, host: 'npm run serve -- --port 3103 (prebuilt build/, not rebuilt)', viewports: {} };
const browser = await chromium.launch();
report.browser = `chromium ${browser.version()}`;

for (const [mode, vp] of [['desktop', { width: 1280, height: 900 }], ['narrow-360', { width: 360, height: 740 }]]) {
  const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  report.viewports[mode] = {};
  for (const [name, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(200);
    const data = await page.evaluate(probe);
    // keyboard reachability of the first figure scroller at narrow width
    if (mode === 'narrow-360') {
      data.focusableScrollers = await page.evaluate(() => {
        const s = [...document.querySelectorAll('main *')].filter((e) => e.scrollWidth - e.clientWidth > 2 && e.clientWidth > 0);
        return s.map((e) => {
          e.focus();
          return { tag: e.tagName, focused: document.activeElement === e, tabindex: e.getAttribute('tabindex'), role: e.getAttribute('role'), label: e.getAttribute('aria-label') };
        });
      });
    }
    report.viewports[mode][name] = data;
    await page.screenshot({ path: `${OUT}/${name}-${mode}.png`, fullPage: true });
  }
  await ctx.close();
}

// A4 print emulation
{
  const ctx = await browser.newContext({ viewport: { width: 794, height: 1123 } });
  const page = await ctx.newPage();
  report.viewports.print_a4 = {};
  for (const [name, path] of PAGES) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    await page.waitForTimeout(400);
    const data = await page.evaluate(probe);
    data.hiddenInPrint = await page.evaluate(() => {
      const main = document.querySelector('main');
      const hidden = [...main.querySelectorAll('h2,h3,table,img')]
        .filter((e) => getComputedStyle(e).display === 'none' || getComputedStyle(e).visibility === 'hidden')
        .map((e) => `${e.tagName} ${(e.textContent || e.getAttribute('alt') || '').trim().slice(0, 60)}`);
      return hidden;
    });
    report.viewports.print_a4[name] = data;
    await page.screenshot({ path: `${OUT}/${name}-print-a4.png`, fullPage: true });
    await page.pdf({ path: `${OUT}/${name}-a4.pdf`, format: 'A4', printBackground: true });
  }
  await ctx.close();
}

await browser.close();
report.completed_at = new Date().toISOString();
writeFileSync(`${OUT}/inspection-run005.json`, JSON.stringify(report, null, 2));
console.log('done');
