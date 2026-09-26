import { chromium } from 'playwright-core';

const base = 'http://127.0.0.1:4601';
const browser = await chromium.launch();
const results = {};

// A. Narrow 360: the rubric's scroll procedure on the actual scrolling elements.
const narrow = await browser.newPage({ viewport: { width: 360, height: 780 } });
await narrow.goto(base + '/semester-1/efmp-302/unit-03/topic-04/', { waitUntil: 'networkidle' });
results.topic04_narrow = await narrow.evaluate(() => {
  const out = { wrapper: null, figures: [], svgServedAs: null };
  const wrap = document.querySelector('div.theme-doc-markdown');
  if (wrap) {
    const cs = getComputedStyle(wrap);
    out.wrapper = { clientWidth: wrap.clientWidth, scrollWidth: wrap.scrollWidth, overflowX: cs.overflowX };
  }
  for (const fig of document.querySelectorAll('figure.figure')) {
    const cs = getComputedStyle(fig);
    const before = fig.scrollLeft;
    fig.scrollLeft = fig.scrollWidth;
    const after = fig.scrollLeft;
    out.figures.push({
      id: fig.id,
      clientWidth: fig.clientWidth,
      scrollWidth: fig.scrollWidth,
      overflowX: cs.overflowX,
      scrollLeftBefore: before,
      scrollLeftAfter: after,
      reachedRightEdge: after + fig.clientWidth >= fig.scrollWidth - 1,
      tabindex: fig.getAttribute('tabindex'),
      role: fig.getAttribute('role'),
      ariaLabel: fig.getAttribute('aria-label'),
    });
  }
  return out;
});
// crop of the fig-U3-7 area on the page at 360px (scrolled to left edge is the visible state)
const fig7 = narrow.locator('figure#fig-U3-7');
await fig7.scrollIntoViewIfNeeded();
await narrow.waitForTimeout(400);
await fig7.screenshot({ path: 'specs/content/efmp-302/reviews/unit-03/G3/renders-feat023-r1/onpage-fig-U3-7-narrow360.png' });

// B. unit-assessment ERQ rubric table scroll test at 360.
await narrow.goto(base + '/semester-1/efmp-302/unit-03/unit-assessment/', { waitUntil: 'networkidle' });
results.assessment_narrow = await narrow.evaluate(() => {
  const out = [];
  for (const t of document.querySelectorAll('table')) {
    const cs = getComputedStyle(t);
    t.scrollLeft = t.scrollWidth;
    out.push({
      clientWidth: t.clientWidth,
      scrollWidth: t.scrollWidth,
      overflowX: cs.overflowX,
      scrollLeftAfter: t.scrollLeft,
      reachedRightEdge: t.scrollLeft + t.clientWidth >= t.scrollWidth - 1,
      tabindex: t.getAttribute('tabindex'),
      role: t.getAttribute('role'),
      ariaLabel: t.getAttribute('aria-label'),
    });
  }
  return out;
});

// C. Served-artifact identity: the fig-U3-7 the page renders is the committed bytes.
const served = await narrow.request.get(base + '/img/figures/efmp-302/unit-03/fig-U3-7.svg');
results.servedFigU37 = { status: served.status(), bytes: (await served.body()).length };

// D. Print emulation: verify the answers section is present and unclipped on unit-assessment.
const printPage = await browser.newPage();
await printPage.emulateMedia({ media: 'print' });
await printPage.goto(base + '/semester-1/efmp-302/unit-03/unit-assessment/', { waitUntil: 'networkidle' });
results.assessment_print = await printPage.evaluate(() => {
  const answers = document.querySelector('#answers-and-marking-guidance, h2');
  const headings = [...document.querySelectorAll('h2, h3')].map((h) => h.textContent.trim());
  const clipped = [...document.querySelectorAll('main *')].filter((el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && (r.right > 823 + 2 || r.left < -2);
  }).length;
  return { hasAnswersHeading: headings.some((h) => h.includes('Answers and marking guidance')), clippedElements: clipped };
});
await printPage.pdf({ path: 'specs/content/efmp-302/reviews/unit-03/G3/renders-feat023-r1/assessment-print-verify.pdf', format: 'A4', margin: { top: '12mm', bottom: '12mm', left: '12mm', right: '12mm' }, printBackground: true });

console.log(JSON.stringify(results, null, 2));
await browser.close();
