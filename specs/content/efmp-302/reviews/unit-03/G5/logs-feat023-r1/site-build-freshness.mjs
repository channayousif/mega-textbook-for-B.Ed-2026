// G5 feat023-r1 site-build freshness evidence (no rebuild; the shared build at 86ce1dd is used).
// Verifies, for THIS unit's pages only, that the served build carries the current Urdu bytes:
//  1. every built Unit 3 Urdu figure SVG hash-matches the committed static asset;
//  2. every built Unit 3 Urdu page contains distinctive strings from the current Urdu sources
//     (prose markers unique to the final G4 state), so the build is not stale for this unit;
//  3. records the NUL-byte offset that makes grep treat Docusaurus HTML as binary (tooling note).
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';

const results = [];
const report = (line) => { results.push(line); console.log(line); };

// 1. Figure assets.
const figDir = 'build/img/figures/efmp-302/unit-03/';
const svgs = readdirSync(figDir).filter((f) => f.endsWith('.svg'));
let hashMatch = 0;
const hashDiffer = [];
for (const f of svgs) {
  const a = createHash('sha256').update(readFileSync(`static/img/figures/efmp-302/unit-03/${f}`)).digest('hex');
  const b = createHash('sha256').update(readFileSync(figDir + f)).digest('hex');
  if (a === b) hashMatch += 1; else hashDiffer.push(f);
}
report(`figure SVGs in build: ${svgs.length}; hash-matching static: ${hashMatch}; differing: ${hashDiffer.join(',') || 'none'}`);

// 2. Distinctive current-content markers per built Urdu page.
const markers = {
  'index.html': 'مؤثر استاد بننا',
  'topic-01/index.html': 'نہ صرف اشارہ شدہ تعریفیں',
  'topic-02/index.html': 'مہارت کے آگے آتا ہے، پیچھے نہیں',
  'topic-03/index.html': 'شہادت کو اس کے دائرے کے ساتھ پڑھیے',
  'topic-04/index.html': 'پیشہ ور کا قیاس',
  'topic-05/index.html': 'بار بردار',
  'unit-assessment/index.html': 'تجمیعی؛',
  'unit-teacher-notes/index.html': 'فرضی استاد',
};
// topic-04 carries the scope paragraph; topic-03 marker corrected below (scope heading is topic-04).
const corrected = { ...markers };
delete corrected['topic-03/index.html'];
corrected['topic-03/index.html'] = 'مشترک دھاگہ';
corrected['topic-04/index.html'] = 'شہادت کو اس کے دائرے کے ساتھ پڑھیے';
let pagesOk = 0;
for (const [page, marker] of Object.entries(corrected)) {
  const path = `build/ur/semester-1/efmp-302/unit-03/${page}`;
  if (!existsSync(path)) { report(`MISSING built page: ${path}`); continue; }
  const html = readFileSync(path).toString('utf8');
  const nul = html.indexOf('\u0000');
  const found = html.includes(marker);
  if (found) pagesOk += 1;
  report(`built page ${page}: marker ${found ? 'FOUND' : 'NOT FOUND'} (marker=${JSON.stringify(marker)}); first NUL byte at ${nul >= 0 ? nul : 'none'}`);
}
report(`built Urdu Unit 3 pages with current-content markers: ${pagesOk}/8`);

// 3. English pages still served (spot check one).
const en = readFileSync('build/semester-1/efmp-302/unit-03/topic-04/index.html').toString('utf8');
report(`built EN topic-04 contains 'Read the evidence with its scope attached': ${en.includes('Read the evidence with its scope attached')}`);

report(hashMatch === svgs.length && pagesOk === 8 ? 'BUILD-FRESH-FOR-UNIT-3-URDU' : 'BUILD-STALE-OR-INCOMPLETE-FOR-UNIT-3');
