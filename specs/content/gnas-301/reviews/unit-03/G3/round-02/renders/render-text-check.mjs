// Text-level verification of the rendered pages (supplements screenshots):
// confirms the round-1 repair passages render as written, and extracts SVG
// figure label text from the served figure assets for instructional-meaning checks.
import { chromium } from 'playwright';
import { writeFileSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4613';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const out = { checks: [] };

async function textOf(path) {
  await page.goto(BASE + path, { waitUntil: 'networkidle' });
  return page.evaluate(() => document.querySelector('article').innerText);
}

// Unit 3: repaired RRQ-04 wording in the bank
let t = await textOf('/semester-1/gnas-301/unit-03/unit-assessment');
out.checks.push({ unit: 3, page: 'unit-assessment', hasNewRRQ4: t.includes('A school beside a main road asks for the cheapest noise controls'), hasOldRRQ4: t.includes('Why is a clear sky not evidence'), answersPresent: /MCQ answer key/.test(t) && /1\. b - carbon monoxide/.test(t) });
// Unit 3: repaired misconception + anwar wording
t = await textOf('/semester-1/gnas-301/unit-03/topic-01');
out.checks.push({ unit: 3, page: 'topic-01', hasWinterOnlyMisconception: t.includes('smog is a winter problem only'), hasRepairedAnwar: t.includes('over winter seasons (2019 to 2021)'), hasOldAnwar: t.includes('worst air over the same settled winters') });
// Unit 4: repaired quotation as hypothetical
t = await textOf('/semester-1/gnas-301/unit-04/topic-02');
out.checks.push({ unit: 4, page: 'topic-02', hasHypothetical: t.includes('could honestly have said'), hasOldAttributedQuote: t.includes('told a reporter'), hasReformSentence: t.includes('national safety reforms have strengthened since the 2012') });
// Unit 4: heatwave generalisation + hearing/mental-health citations
t = await textOf('/semester-1/gnas-301/unit-04/topic-07');
out.checks.push({ unit: 4, page: 'topic-07', hasGeneralHeatwave: t.includes("Karachi's heatwaves have"), has2015Specific: t.includes('2015 heatwave'), hasHearingCitation: t.includes('(WHO, 2026)'), hasMentalHealthCitation: t.includes('(WHO, 2026b)'), has12Billion: t.includes('12 billion working days') });
// Unit 4: bank intact
t = await textOf('/semester-1/gnas-301/unit-04/unit-assessment');
out.checks.push({ unit: 4, page: 'unit-assessment', mcq10Present: t.includes('12 billion working days lost yearly'), keyPresent: /10\. d - depression and anxiety/.test(t) });

// SVG label extraction: instructional meaning of key figures
const svgs = [
  ['u3-fig-U3-3', '/img/figures/gnas-301/unit-03/fig-U3-3.svg'],
  ['u3-fig-U3-7', '/img/figures/gnas-301/unit-03/fig-U3-7.svg'],
  ['u4-fig-U4-3', '/img/figures/gnas-301/unit-04/fig-U4-3.svg'],
  ['u4-fig-U4-9', '/img/figures/gnas-301/unit-04/fig-U4-9.svg'],
  ['u4-fig-U4-11', '/img/figures/gnas-301/unit-04/fig-U4-11.svg'],
  ['u4-fig-U4-14', '/img/figures/gnas-301/unit-04/fig-U4-14.svg'],
];
for (const [id, path] of svgs) {
  const resp = await page.request.get(BASE + path);
  const body = await resp.text();
  const labels = [...body.matchAll(/<text[^>]*>([^<]+)<\/text>/g)].map((m) => m[1]).filter((s) => s.trim());
  out.checks.push({ figure: id, status: resp.status(), labelCount: labels.length, labels: labels.slice(0, 18) });
}

writeFileSync('specs/content/gnas-301/reviews/unit-03/G3/round-02/renders/render-text-check.json', JSON.stringify(out, null, 1));
writeFileSync('specs/content/gnas-301/reviews/unit-04/G3/round-02/renders/render-text-check.json', JSON.stringify(out, null, 1));
console.log(JSON.stringify(out.checks.map((c) => ({ ...c, labels: c.labels ? c.labels.length : undefined })), null, 1));
await browser.close();
