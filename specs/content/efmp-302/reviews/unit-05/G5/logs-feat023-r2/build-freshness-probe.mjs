// build-freshness-probe.mjs - feat023-r2 site-build evidence (G5 cycle 2, EFMP-302 Unit 5)
// NOT a rebuild. The shared two-locale build at build/ was produced at commit 219960c
// immediately before this review launched. This probe proves the served build carries
// Unit 5's CURRENT Urdu bytes: (a) every repaired passage from the 9 cycle-1 blocking
// findings is present in the built Urdu HTML; (b) the superseded defect strings are
// absent; (c) a spread of current-source probe strings across all seven pages is found;
// (d) all 16 Urdu figure assets under build/ are byte-identical to static/ sources.
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { readdirSync } from 'node:fs';

const ROOT = new URL('../../../../../../../', import.meta.url).pathname;
const B = (p) => ROOT + 'build/ur/semester-1/efmp-302/unit-05/' + (p === 'index' ? 'index.html' : p + '/index.html');
const S = (p) => ROOT + 'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-05/' + p + '.mdx';

const log = [];
const p = (s) => { log.push(s); console.log(s); };
const norm = (s) => s.replace(/\s+/g, ' ');

// (a) repaired passages: [page, repaired substring, finding id]
const repaired = [
  ['topic-02', 'اس سے اختلاف نہیں کرتا', 'F1 stance'],
  ['topic-02', 'تضاد کو جائزہ کے نظاموں کا مرکزی ڈیزائن مسئلہ', 'F4 tension'],
  ['topic-02', 'نتیجہ لاگو کرتے ہیں', 'F5 impose consequences'],
  ['topic-03', 'ان کی لاگت ان کے پاس ہونے والے صرف تیس منٹ ہیں', 'F3 cost leg'],
  ['topic-04', 'مگر موجود بھی ہیں', 'F2 not nothing'],
  ['unit-assessment', 'محنت اور خلوص کے ساتھ جُڑتا ہے، رسمی فرض کے ساتھ', 'F6 RRQ1 contrast'],
  ['unit-assessment', 'ہٹانے والے اور نہ ہٹنے والے الگ', 'F9 fixed rubric'],
];
// (b) superseded defect strings: [page, old substring, finding id]
const oldDefects = [
  ['topic-02', 'اس سے اتفاق نہیں کرتا', 'F1 old inverted stance'],
  ['topic-02', 'تناوب', 'F4 old alternation'],
  ['topic-02', 'نتیجہ لگاتے ہیں', 'F5 old draw-conclusions'],
  ['topic-03', 'ان کا مطلب ان کے پاس ہونے والے صرف تیس منٹ', 'F3 old garbled cost'],
  ['topic-04', 'اور کچھ بھی نہیں ہیں', 'F2 old nothing-at-all'],
  ['unit-assessment', 'فرض کے ساتھ جُڑتا ہے، رسمی ذمہ داری', 'F6 old duty-vs-duty'],
  ['unit-assessment', 'ہٹانے اور fixed الگ', 'F9 old untranslated fixed (the only Latin "fixed" in the built page is the navbar--fixed-top CSS class, verified separately)'],
];
// (c) current-source spread probes: [page, source substring from current bytes]
const spread = [
  ['index', 'اس یونٹ کی تقسیم کے بارے میں ایک وضاحت'],
  ['topic-01', 'انسانی خدمت والے پیشوں'],
  ['topic-01', 'کثیر درجاتی کلاس روم'],
  ['topic-02', 'کاغذ ہی وہ چیز ہے جو نظام میں اوپر جاتی ہے'],
  ['topic-03', 'ملے جلے ہیں۔ ملا جلا ہی وہ اہم لفظ ہے'],
  ['topic-03', 'پیشہ واریت کا موضوع ہے، ٹیکنالوجی کا نہیں'],
  ['topic-04', 'سرپرست کی معاونت'],
  ['unit-assessment', 'کثیر انتخابی سوالات (MCQs)'],
  ['unit-assessment', 'مجموعی طور پر 10 سے اوپر نہیں جا سکتا'],
  ['unit-assessment', 'MCQ جوابی کلید'],
  ['unit-teacher-notes', 'دو ہفتوں کے بلاک میں ترتیب'],
  ['unit-teacher-notes', 'بار بار آنے والی غلط فہمیاں'],
];

p(`build-freshness-probe feat023-r2 ${new Date().toISOString()}`);
p('Shared build at build/ (mtime 2026-09-24T19:10-05:00 = 2026-09-25T00:10Z, built at commit 219960c). No npm run build was run by this reviewer.');

let fail = 0;
for (const [page, needle, id] of repaired) {
  const html = norm(readFileSync(B(page), 'utf8'));
  const found = html.includes(norm(needle));
  p(`[a] ${id} @ ${page}: repaired passage ${found ? 'FOUND' : 'MISSING'}`);
  if (!found) fail += 1;
}
for (const [page, needle, id] of oldDefects) {
  const html = norm(readFileSync(B(page), 'utf8'));
  const found = html.includes(norm(needle));
  p(`[b] ${id} @ ${page}: old defect string ${found ? 'STILL PRESENT (stale build!)' : 'absent (correct)'}`);
  if (found) fail += 1;
}
for (const [page, needle] of spread) {
  const html = norm(readFileSync(B(page), 'utf8'));
  const src = norm(readFileSync(S(page), 'utf8'));
  const inSrc = src.includes(norm(needle));
  const inHtml = html.includes(norm(needle));
  p(`[c] spread probe @ ${page}: source ${inSrc ? 'yes' : 'NO (probe error)'} / built ${inHtml ? 'FOUND' : 'MISSING'} :: ${needle.slice(0, 30)}`);
  if (!inSrc || !inHtml) fail += 1;
}

// (d) figure asset byte-identity, all 16 Urdu variants
const figDir = ROOT + 'build/img/figures/efmp-302/unit-05/';
const staticDir = ROOT + 'static/img/figures/efmp-302/unit-05/';
const files = readdirSync(figDir).filter((f) => f.includes('.ur.'));
p(`[d] Urdu figure assets in build: ${files.length}`);
for (const f of files) {
  const a = createHash('sha256').update(readFileSync(figDir + f)).digest('hex');
  const b = createHash('sha256').update(readFileSync(staticDir + f)).digest('hex');
  p(`[d] ${f}: ${a === b ? 'byte-identical to static/' : 'DIFFERS from static/'}`);
  if (a !== b) fail += 1;
}
// figure-repair loci inside the built SVGs
for (const f of ['fig-U5-4.ur.svg', 'fig-U5-4.ur.dark.svg']) {
  const t = readFileSync(figDir + f, 'utf8');
  const okCell = /x="112" y="158">ملے جلے</.test(t);
  p(`[d] ${f}: Law public-recognition cell (x=112,y=158) reads ملے جلے: ${okCell}`);
  if (!okCell) fail += 1;
}
for (const f of ['fig-U5-8.ur.svg', 'fig-U5-8.ur.dark.svg']) {
  const t = readFileSync(figDir + f, 'utf8');
  const okLabel = t.includes('ٹھیک طرح، "نظم و ضبط" نہیں') && !t.includes('ششہ');
  p(`[d] ${f}: station 1 label نظم و ضبط present, ششہ absent: ${okLabel}`);
  if (!okLabel) fail += 1;
}

p(`VERDICT: ${fail === 0 ? 'shared build is FRESH for EFMP-302 Unit 5 Urdu (all repaired passages render; no stale defect strings; 16/16 figure assets identical)' : fail + ' STALENESS CHECKS FAILED - rebuild may be required'}`);
writeFileSync(new URL('site-build.log', import.meta.url).pathname, log.join('\n') + '\n');
process.exit(fail === 0 ? 0 : 1);
