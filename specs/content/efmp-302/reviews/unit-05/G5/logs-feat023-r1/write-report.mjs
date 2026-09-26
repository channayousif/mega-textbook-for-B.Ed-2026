#!/usr/bin/env node
// G5 feat023-r1 report writer for EFMP-302 Unit 5. Assembles the contract report
// with exact SHA-256 evidence hashes computed from the saved bytes.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const manifest = JSON.parse(readFileSync('specs/content/efmp-302/reviews/unit-05/G5/feat023-r1/manifest.json', 'utf8'));
const digest = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

const evidenceManifest = {};
for (const dir of ['specs/content/efmp-302/reviews/unit-05/G5/logs-feat023-r1', 'specs/content/efmp-302/reviews/unit-05/G5/renders-feat023-r1']) {
  for (const f of readdirSync(dir).sort()) {
    const p = join(dir, f);
    if (statSync(p).isFile()) evidenceManifest[p] = digest(p);
  }
}

const report = {
  schema_version: 1,
  course_code: 'EFMP-302',
  unit_no: 5,
  stage: 'G5',
  disposition: 'revise',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'commit:a483c9e',
  reviewer_run_id: 'agent-g5-efmp302-u5-feat023-r1',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T22:55:26Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: manifest.skill_digest,
  g3_report: 'specs/content/efmp-302/reviews/unit-05/G3/agent-g3-efmp302-u5-feat023-r1.json',
  input_manifest: manifest.input_manifest,
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        'Scheme-and-Course-guides/extracted-text/1st 2026.txt lines 881-896 (guide Unit 5 sections 5.1-5.3) remain the authority base; the Urdu index.mdx "## اس یونٹ کی تقسیم کے بارے میں ایک وضاحت" preserves the disclosed four-topic-for-three-section split and "کچھ شامل نہیں ہوا اور کچھ چھوڑا نہیں گیا" (nothing added or left out).',
        'All six unit learning outcomes are stated in Urdu (i18n index.mdx "## یونٹ کے تعلیمی نتائج", six bullets matching EN one-for-one) and each is taught and assessed in Urdu: outcome 1 (topic-01 + MCQ 1-2, RRQ 1-3, ERQ 1), outcome 2 (topic-01 multilingual/multi-grade + MCQ 4, RRQ 3), outcome 3 (topic-02 + MCQ 5-7, RRQ 4-6, ERQ 2), outcome 4 (topic-02 status/recognition + MCQ 7, RRQ 6), outcome 5 (topic-03 + MCQ 3/8, RRQ 7-8, ERQ 3), outcome 6 (topic-04 + MCQ 9-10, RRQ 9-10, ERQ 4-5).',
        'Heading parity verified programmatically across all seven file pairs (15/13/12/12 headings in the topics, 7/10/7 in index/assessment/notes): every EN heading has its Urdu counterpart, links identical, checklist and ordered-list counts identical.',
        'Frontmatter parity verified: course_code, unit_no, topic_no, topic_label, clo_refs, est_reading_minutes and translation_status identical in all seven UR files (the UR-only key_terms block is the pipeline-mandated addition).',
        'Caveat recorded as an unresolved uncertain finding: the G3 dependency rests on the unsigned feat023-r1 advisory pass, not signed evidence (G-2026-65 pattern).'
      ]
    },
    {
      id: 'sources',
      status: 'fail',
      evidence: [
        'Seven of the eight source keys retain their supporting meaning in Urdu, verified passage by passage: maslach2016 human-service scope (topic-01.mdx:79-81 "انسانی خدمت والے پیشوں میں... ان کا مقالہ اساتذہ کے بارے میں نہیں ہے" + further-reading note "اساتذہ کا مطالعہ نہیں"); skaalvik2020 262 Norwegian high-school teachers with demands/resources named (topic-01.mdx:83-87, topic-04.mdx:83-87, both further-reading notes); little2001 agenda-setting claim (topic-01.mdx:159-161); naparan2021 ten teachers in one district of one country, existence proof not prescription (topic-01.mdx:171-175); hennessy2022 teacher-development scope limit and the three declared claims including "نتائج اب تک ملے جلے ہیں" (topic-03.mdx:48-55); the no-research-claimed passages on Pakistani conditions and multilingual practices (topic-01.mdx:148-150, topic-02.mdx:120-124); demirkasimoglu2010 definitional-debate framing with the comparison honesty note (topic-02.mdx:104-124).',
        'FAIL locus 1 - i18n topic-02.mdx:50-51: Isoré (2009)\'s central finding "found the tension between accountability and development to be the central design problem of evaluation systems" is rendered "جوابدہی اور ترقی کے درمیان تناوب کو جائزہ کے نظاموں کا مرکزی ڈیزائن مسئلہ پاتی ہیں" - تناوب means ALTERNATION, not tension/conflict, so the sourced claim is distorted. Recurrence of the Unit 4 G5 feat023-r1 systematic تناوب finding; Unit 4\'s reviewed Urdu uses تضاد for the same source concept (unit-04 topic-01.mdx:140-142).',
        'FAIL locus 2 - i18n topic-02.mdx:51-52: "Accountability mechanisms measure, compare and impose consequences" is rendered with "نتیجہ لگاتے ہیں" (draw conclusions), losing the impose-consequences force on which the following sentence\'s contrast ("وہ اپنی ذات میں وہ کچھ فراہم نہیں کرتے...") depends.'
      ]
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'All twelve U5-NN sub-topics are taught in Urdu with full heading parity: topic-01 carries the five 5.1 headings (کام کا بوجھ / دباؤ اور پیشہ ورانہ تھکن / معاونت اور وسائل کی کمی / کثیر اللسانی جماعت / کثیر درجاتی کلاس روم), topic-02 the three 5.2 headings, topic-03 the two 5.3 headings, topic-04 the two 5.4 headings; check:depth-gate exit 0.',
        'Every topic file carries the full nine-part cycle in Urdu (situation, explanation, activity, check your understanding, summary, self-assessment checklist, practicum transfer, summative task with mini-rubric, further reading); checklist item counts 6/5/5/5 match the English exactly.',
        'Nothing outside the guide is added: the topic-5.4 expansion remains the disclosed authored expansion; the Urdu index reproduces the disclosure; no Urdu-only sub-topic or heading exists (heading parity check).',
        'Reading minutes unchanged (29/23/22/23 + index 8 + assessment 26 + notes 10), matching the English frontmatter.'
      ]
    },
    {
      id: 'assessment',
      status: 'pass',
      evidence: [
        'Blind solve: all ten Urdu MCQs derived from the Urdu prose alone BEFORE reading either key; derived answers د، ج، الف، ب، د، ب، الف، ج، د، الف match the published Urdu key 10/10 and the English key d,c,a,b,d,b,a,c,d,a 10/10; option order الف/ب/ج/د maps one-to-one onto a/b/c/d in all ten items with no reordering.',
        'MCQ 3\'s Urdu key explains why ج (no reply at all) and د (reply and delete) fail, matching the English key\'s discriminations; no Urdu option inadvertently reveals an answer or lowers cognitive demand (Bloom labels سمجھنا/یاد رکھنا/اطلاق match EN Understand/Remember/Apply item for item).',
        'RRQ mark schemes sum identically (4+6+5+4+6+5+5+4+7+4 = 50) with point-by-point allocations preserved; RRQ 9 remains (سمجھنا)/Understand at 7 marks (3 region names + 2 examples + 2 cross-region explanation), the 44bc1d7 repair intact in Urdu.',
        'ERQ structure preserved: five 20-mark items each with four analytic criteria and the bolded higher-order criterion (ERQ 1 مداخلتوں کا دفاع (تجزیہ); ERQ 2 جواز والی ترتیب (جائزہ) and کیریئر کی حقیقت پسندی (تجزیہ); ERQ 3 اعتراض کا جواب (جائزہ); ERQ 4 جواب کا ڈیزائن (تخلیق) and نظامی اعتراض (تجزیہ); ERQ 5 ساختی اور ذاتی الگ (جائزہ)), plus the 10-cap sentence preserved verbatim in meaning; ERQ 5\'s Diagnosis criterion still distinguishes the two taught readings of the group-work remark with the same marking caution in unit-teacher-notes.mdx:113-117.',
        'Marking-guidance blemishes recorded as findings rather than failures of equivalence: RRQ 1 point 4\'s collapsed contrast (blocking, semantics), the untranslated "fixed" in the ERQ 1 rubric (blocking, completeness), MCQ 7 key explanation dropping خود مختاری from the four-marker list and MCQ 3\'s اصول strengthening of "default" (advisory). The items, keys, scoring totals and cognitive demand are equivalent.'
      ]
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        'render-review (render-inspect.mjs against the shared two-locale build at a483c9e served at 127.0.0.1:4626, Chromium 149.0.7827.0): desktop 1280x900 all seven Urdu pages - no skipped heading levels, no broken images, no missing alt, no horizontal overflow; narrow 360x780 - docHorizontalOverflow 0px on every page; A4 print 794px - clippedElems 0 on every page, all eight figures fit (max right edge 777px). Exit 0, defects 0 (render-review.log sections A-C).',
        'Figure carriers at 360px: each of the eight figures is its own scroll container (client 328, scroll 880-1030, scroller=FIGURE.figure); all six marking tables fit without scrolling at 360px (client 328 = scroll 328); img alt text is the full Urdu manifest alt on every carrier; both theme variants serve.',
        'Nastaliq and bidi verified on the rendered pages (render-review.log section E + crops): the self-hosted Noto Nastaliq Urdu webfont loads (document.fonts "Noto Nastaliq Urdu loaded", html lang="ur" dir="rtl"); shaping and ligatures correct; bidi punctuation, Western digits inside RTL runs (262، 22 تا 28، 450 تا 500) and embedded Latin (Maslach, Leiter, Skaalvik, Isoré, OECD, WhatsApp, MCQ/RRQ/ERQ) all render without scrambling.',
        'Environment limitation recorded honestly (advisory finding): no system Nastaliq for SVG-internal figure text on this host; figure glyphs render in fallback Arabic shaping in both the measurement instrument and the browser; page body text unaffected.'
      ]
    },
    {
      id: 'completeness',
      status: 'fail',
      evidence: [
        'Structural parity is exact: heading, link, checklist and ordered-list counts identical across all seven file pairs; all eight figures carried with .ur.svg sources; est_reading_minutes and clo_refs identical.',
        'FAIL locus 1 - i18n unit-assessment.mdx:245, ERQ 1 rubric row "حدود کی حقیقت پسندی", Adequate cell "ہٹانے اور fixed الگ" leaves the English word "fixed" untranslated where the EN reads "Distinguishes removable from fixed"; visible on the rendered page (crop-assess-erq1-rubric.png).',
        'Addition - i18n unit-teacher-notes.mdx:103: the heading "## یونٹ کی تشخیص کی جانچ، اور اختتام" adds "، اور اختتام" (and the ending) to EN "## Marking the unit assessment" with no corresponding content.',
        'Omission - i18n unit-assessment.mdx:190: the MCQ 7 key explanation lists three markers (تنخواہ، چھانٹ اور پذیرائی) where the EN lists four (pay, entry selectivity, autonomy and recognition), dropping خود مختاری.',
        'Addition - i18n topic-03.mdx:198: the mini-rubric Realism row adds "اگلے ہفتے" (next week) to "تجویز وہ ہے جو ان کی جگہ والی استاد واقعی اگلے ہفتے کر سکے" where EN reads "The recommendation is something a teacher in her position could actually carry out"; the timeframe belongs to ERQ 3\'s rubric and Topic 5.4\'s activity, not this row.'
      ]
    },
    {
      id: 'semantics',
      status: 'fail',
      evidence: [
        'FAIL locus 1 (negation inversion) - i18n topic-02.mdx:45: EN "The case for accountability is strong and this unit does not dispute it" is rendered "جوابدہی کا دعویٰ مضبوط ہے اور یہ یونٹ اس سے اتفاق نہیں کرتا" - "does not dispute" (accepts) has become "does not agree" (rejects), inverting the unit\'s stated stance on accountability; the surrounding Urdu (the next sentence defends accountability; the summary says "اس کا دعویٰ درست ہے") contradicts the translated sentence. Visible on the rendered page (crop-t2-accountability-stance.png).',
        'FAIL locus 2 (double-negative inversion) - i18n topic-04.mdx:89-90: EN "The resources actually available... are smaller than the ones in that study and are not nothing" is rendered "...چھوٹے ہیں اور کچھ بھی نہیں ہیں:" - one negation where the English carries two, so "are not nothing" (they exist) has become "are nothing at all", inverting the hinge into the four-resource list and teaching despair, the exact opposite of the topic\'s design. Visible on the rendered page (crop-t4-not-nothing.png).',
        'FAIL locus 3 (garbled cost leg) - i18n topic-03.mdx:71-72: EN "cost her the only thirty minutes she has" is rendered "ان کا مطلب ان کے پاس ہونے والے صرف تیس منٹ ہیں" ("their meaning is the only thirty minutes she has"), dropping the لاگت/cost verb from the worked application of the three-question test - the topic\'s assessed spine (MCQ 8, RRQ 7, ERQ 3). Visible on the rendered page (crop-t3-cost-leg.png).',
        'FAIL locus 4 (wrong relational noun on a sourced claim) - i18n topic-02.mdx:50-51: تناوب (alternation) for "tension"; see the sources criterion. FAIL locus 5 (weakened mechanism) - i18n topic-02.mdx:51-52: "نتیجہ لگاتے ہیں" (draw conclusions) for "impose consequences".',
        'FAIL locus 6 (collapsed marking-point contrast) - i18n unit-assessment.mdx:198-200: RRQ 1 point 4 "بوجھ فرض کے ساتھ جُڑتا ہے، رسمی ذمہ داری کے ساتھ نہیں" renders "the burden correlates with commitment rather than with formal duty" as duty-vs-formal-responsibility, two near-synonyms, muddling what the fourth mark rewards.',
        'Verified clean on the passages the G3 flagged as scope-critical: the Maslach/Leiter human-service scope, the Skaalvik 262-Norwegian scope (twice), Hennessy\'s teacher-development scope and "mixed" outcomes, Naparan\'s ten-teachers-one-district existence-proof framing, Little\'s agenda claim, the no-research-claimed passages, the demands-and-resources model and both levers, the three-regions distinction with the Mr Bilal/Miss Ayesha contrast, the technology three-questions test, and "relocating a system\'s failure into an individual\'s character" ("نظام کی ناکامی کو ایک فرد کی شخصیت میں منتقل کرنے کا طریقہ") all preserve the English meaning.'
      ]
    },
    {
      id: 'terminology',
      status: 'fail',
      evidence: [
        'Frozen-bank conformance PASSES: all four UR key_terms are bank-exact (Stress=دباؤ terminology.csv:57; Teacher Burnout=پیشہ ورانہ تھکن :118; Multi-grade Classroom=کثیر درجاتی کلاس روم :119; Digital Professionalism=ڈیجیٹل پیشہ واریت :120); پیشہ واریت، جوابدہی، خود مختاری and the Unit 3 trait لچک are used consistently with earlier reviewed units.',
        'FAIL locus 1 - i18n topic-02.mdx:51: تناوب for "tension" is a wrong term inconsistent with Unit 4\'s reviewed تضاد for the same Isoré concept (recurrence of the Unit 4 G5 systematic finding).',
        'FAIL locus 2 - static/img/figures/efmp-302/unit-05/fig-U5-8.ur.svg (+ .ur.dark.svg): station 1\'s sublabel carries the non-word "ششہ" (U+0634 U+0634 U+06C1) for EN "discipline"; no Urdu reader can recover the vague-label example.',
        'Polysemy collision (advisory) - لچک names both workload "elasticity" (topic-01.mdx:47,62,212-213; unit-assessment.mdx:22,180) and "resilience" (Unit 3 usage; topic-04.mdx:72-76; unit-assessment.mdx:48,114,180), so the workload property and the misconception trait share one word across topics.',
        'Concept labels: fourteen authored labels in concepts/unit-05.md reviewed and confirmed fit for bank promotion (subject to owner decision) - accurate, natural and consistent with the Urdu prose - with two minor notes (CON:5-6 بطور سبب narrows "as the mechanism"; CON:5-7 ناپید vs the prose\'s غائب for "missing"). Note: CON:5-4 پیشہ ورانہ تھکن is already banked (carried G3 advisory about the concepts-file count).'
      ]
    },
    {
      id: 'register',
      status: 'fail',
      evidence: [
        'The overall register is genuinely academic-plain (درسی مگر عام فہم): short declarative sentences, concrete Pakistani anchoring (نوابشاہ، جماعت چہارم، باسٹھ شاگرد، ضلعی سرکلولر), technical terms defined at first use; an entering B.Ed student can follow it. The failures below are localized and repairable.',
        'Code-mixing: the Latin verb "quote" is used four times where حوالہ دینا is the natural Urdu (index.mdx:44, topic-01.mdx:148, topic-02.mdx:120, unit-teacher-notes.mdx:120).',
        'Orthographic errors: صفروں (zeros) for صفوں (rows) topic-01.mdx:43; ضلہ for ضلع topic-01.mdx:268; بچاۓ for بچائے topic-04.mdx:35; کر رے for کر رہے topic-04.mdx:194; صورتحت for صورتحال unit-assessment.mdx:151; تائیف for تائید unit-assessment.mdx:281; کیوجہ for کی وجہ topic-02.mdx:106.',
        'Gender-agreement slips: اوپر کا شکل for اوپر کی شکل at ten loci (topic-01:43,102; topic-02:75,114,122; topic-03:58,89; topic-04:44,104); پہلا سخت حقیقت for پہلی (topic-01:49); جیتی ہوئی مسئلہ for جیتا ہوا (topic-02:129).',
        'Lexical register: شہادت (testimony) is used for "evidence" throughout (شہادت کی دیانتداری، تحقیقی شہادت) where شواہد is the standard academic term - consistent but worth an owner decision; "workload" alternates between کام کا بوجھ and the transliteration ورک لوڈ within the same files.'
      ]
    },
    {
      id: 'rtl',
      status: 'fail',
      evidence: [
        'Rendering, mirroring and print are CLEAN: fig-U5-2\'s burnout path reads right-to-left (sustainable demand at the right, three dimensions at the left) and fig-U5-8\'s six stations mirror correctly; the fig-U5-7 concentric diagram keeps the third region outermost with RTL labels; tables are RTL with row labels on the right; measure-figure-text exit 0 over all 16 Urdu variants; reviewer geometry check (measure-text-overlap.log) finds zero text-on-text superposition, zero wordmark collision and zero viewBox overflow across all 16 variants (min vertical clearance 0.85px, fig-U5-7); narrow 360x780 and A4 print clean (render-review.log sections B-C); both theme variants serve and were visually inspected.',
        'FAIL locus 1 - static/img/figures/efmp-302/unit-05/fig-U5-4.ur.svg and .ur.dark.svg: the Law (قانون) row\'s public-recognition cell (mirrored x=112, y=158) reads بلند (High) where the EN figure reads "Mixed" (EN x=787, y=158) - a data change inside the comparison table whose caption point is that the markers do not move together; visible in figure-U5-4-ur-light.png.',
        'FAIL locus 2 - static/img/figures/efmp-302/unit-05/fig-U5-8.ur.svg and .ur.dark.svg: station 1\'s sublabel "ٹھیک طرح، \"ششہ\" نہیں" carries the non-word ششہ for EN "discipline", defeating the vague-vs-precise naming example; visible in figure-U5-8-ur-light.png.',
        'All 41/27/24/36/46/22/23/19 Urdu labels per figure were extracted and compared against the EN variants: apart from the two loci above, every label matches in meaning, including the burnout-dimension names, the six want/measure party pairs, the occupation-table cells and the six method stations; the EN fig-U5-7 footer claim (carried G3 advisory) is mirrored faithfully.'
      ]
    }
  ],
  findings: [
    { severity: 'blocking', resolved: false, message: 'NEGATION INVERSION ON THE UNIT\'S STANCE. i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-05/topic-02.mdx:45 renders "The case for accountability is strong and this unit does not dispute it" as "جوابدہی کا دعویٰ مضبوط ہے اور یہ یونٹ اس سے اتفاق نہیں کرتا" - "does not dispute" (accepts the case) has become "does not agree" (rejects it). The Urdu sentence now contradicts both the English source and its own context (the next sentence defends accountability; the unit summary says "جوابدہی بڑھی ہے اور اس کا دعویٰ درست ہے"). Repair: "اور یہ یونٹ اس سے اختلاف نہیں کرتا" (or "اور یہ یونٹ اسے مانتا ہے").' },
    { severity: 'blocking', resolved: false, message: 'DOUBLE-NEGATIVE INVERSION BEFORE THE RESOURCE LIST. i18n .../unit-05/topic-04.mdx:89-90 renders "The resources actually available to a teacher in a Pakistani government school are smaller than the ones in that study and are not nothing:" as "...واقعی دستیاب وسائل اس مطالعے والوں سے چھوٹے ہیں اور کچھ بھی نہیں ہیں:" - a single negation where the English carries two, so "are not nothing" (they exist) reads as "are nothing at all", immediately followed by a list of four real resources. The sentence is the hinge into the growth section and its inversion teaches despair, the opposite of the topic\'s design (G3 pedagogy: the unit describes hard conditions without tipping into despair). Repair: "اور یہ خالی بھی نہیں ہیں" or "اور ان میں کچھ نہ کچھ شامل ہے".' },
    { severity: 'blocking', resolved: false, message: 'COST LEG GARBLED IN THE THREE-QUESTION WORKED APPLICATION. i18n .../unit-05/topic-03.mdx:71-72 renders "the tablets add English drill to a class that cannot decode, cost her the only thirty minutes she has, depend on electricity that fails, and would replace reading practice" with "ان کا مطلب ان کے پاس ہونے والے صرف تیس منٹ ہیں" ("their meaning is the only thirty minutes she has") - the لاگت (cost) verb is lost, breaking the add/cost/replace parallel that MCQ 8, RRQ 7 and ERQ 3 assess. Repair: "ان کی لاگت ان کے پاس ہونے والے صرف تیس منٹ ہیں".' },
    { severity: 'blocking', resolved: false, message: 'WRONG TERM تناوب (ALTERNATION) FOR "TENSION" ON ISORÉ\'S CENTRAL FINDING. i18n .../unit-05/topic-02.mdx:50-51 renders "found the tension between accountability and development to be the central design problem of evaluation systems" with "جوابدہی اور ترقی کے درمیان تناوب" - alternation instead of conflict, distorting the sourced claim. This is a recurrence of the Unit 4 G5 feat023-r1 systematic تناوب finding; Unit 4\'s reviewed Urdu renders the same source concept as تضاد (unit-04 topic-01.mdx:140-142). Repair: "جوابدہی اور ترقی کے درمیان تضاد" (or تناؤ/کشیدگی).' },
    { severity: 'blocking', resolved: false, message: 'WEAKENED MECHANISM SENTENCE. i18n .../unit-05/topic-02.mdx:51-52 renders "Accountability mechanisms measure, compare and impose consequences" as "جوابدہی کے طریقے ناپتے ہیں، موازنہ کرتے ہیں اور نتیجہ لگاتے ہیں" - "نتیجہ لگاتے ہیں" means draw conclusions, losing the impose-consequences force on which the next sentence\'s contrast (they supply nothing) depends. Repair: "نتائج کا اطلاق کرتے ہیں" or "سزا یا انعام کا فیصلہ کرتے ہیں".' },
    { severity: 'blocking', resolved: false, message: 'RRQ 1 MARK-SCHEME POINT 4 COLLAPSES THE COMMITMENT/DUTY CONTRAST. i18n .../unit-05/unit-assessment.mdx:198-200 renders "the burden correlates with commitment rather than with formal duty" as "چنانچہ بوجھ فرض کے ساتھ جُڑتا ہے، رسمی ذمہ داری کے ساتھ نہیں" - duty vs formal responsibility, two near-synonyms, so the fourth mark\'s criterion (workload tracks caring, not the job description) is muddled. Repair: "چنانچہ بوجھ پرواہ/لگن کے ساتھ جڑتا ہے، رسمی فرائض کے ساتھ نہیں".' },
    { severity: 'blocking', resolved: false, message: 'FIGURE DATA CHANGE: LAW RECOGNITION CELL. static/img/figures/efmp-302/unit-05/fig-U5-4.ur.svg and fig-U5-4.ur.dark.svg render the Law (قانون) row\'s public-recognition cell as بلند (High) where the EN figure reads "Mixed" (EN x=787 y=158; UR mirrored x=112 y=158). The figure\'s caption point is that the markers do not move together; showing Law uniformly high erases one instance of exactly that. Repair: ملے جلے in both variants.' },
    { severity: 'blocking', resolved: false, message: 'NON-WORD IN A FIGURE LABEL. static/img/figures/efmp-302/unit-05/fig-U5-8.ur.svg and fig-U5-8.ur.dark.svg render station 1\'s sublabel as "ٹھیک طرح، \"ششہ\" نہیں" where the EN reads "precisely, not \'discipline\'". ششہ (U+0634 U+0634 U+06C1) is not an Urdu word; the vague-vs-precise naming example is unreadable. Repair: a real one-word vague label, e.g. "\"نظم و ضبط\" نہیں".' },
    { severity: 'blocking', resolved: false, message: 'UNTRANSLATED WORD IN A PUBLISHED RUBRIC CELL. i18n .../unit-05/unit-assessment.mdx:245, ERQ 1 rubric row "حدود کی حقیقت پسندی", Adequate cell "ہٹانے اور fixed الگ" leaves "fixed" in English where the EN reads "Distinguishes removable from fixed". Repair: "قابلِ ہٹاؤ اور نہ ہٹنے والے الگ".' },
    { severity: 'uncertain', resolved: false, message: 'THE G3 DEPENDENCY IS NOT SATISFIED BY SIGNED EVIDENCE (G-2026-65 pattern). The G5 rubric requires accepted, signed G3 evidence for the exact English inputs. ADR-0019 blocks agent certification, so no signed G3 exists on this host. The best available G3 is the feat023-r1 advisory pass (specs/content/efmp-302/reviews/unit-05/G3/agent-g3-efmp302-u5-feat023-r1.json, all seven criteria pass, both 44bc1d7 repairs verified), and its bound English digests are identical (normalized) to this review\'s English inputs - verified path by path - so the English comparison base used here is the exact text that advisory pass reviewed. The dependency nevertheless cannot be discharged by signed evidence by this reviewer; owner-side resolution (signed G3 or an owner-accepted equivalent) is required before any certified G5 pass. This finding alone forbids a pass disposition regardless of the content repairs.' },
    { severity: 'advisory', resolved: false, message: 'REGISTER/ORTHOGRAPHY BATCH (none inverts meaning). (a) Latin verb "quote" four times where حوالہ دینا is natural: index.mdx:44, topic-01.mdx:148, topic-02.mdx:120, unit-teacher-notes.mdx:120. (b) Typos: صفروں for صفوں (topic-01:43), ضلہ for ضلع (topic-01:268), بچاۓ for بچائے (topic-04:35), کر رے for کر رہے (topic-04:194), صورتحت for صورتحال (unit-assessment:151), تائیف for تائید (unit-assessment:281), کیوجہ for کی وجہ (topic-02:106). (c) Gender agreement: اوپر کا شکل for اوپر کی شکل at topic-01:43,102, topic-02:75,114,122, topic-03:58,89, topic-04:44,104; پہلا سخت حقیقت for پہلی (topic-01:49); جیتی ہوئی مسئلہ for جیتا ہوا (topic-02:129). (d) شہادت for "evidence" throughout - consistent but شواہد is the standard academic term; owner decision. (e) "workload" alternates between کام کا بوجھ and ورک لوڈ within the same files.' },
    { severity: 'advisory', resolved: false, message: 'SMALLER SEMANTIC SHIFTS AND ADDITIONS (meaning recoverable, listed for repair). MCQ 3 stem strengthens "The professional default is to" to "پیشہ ورانہ اصول یہ ہے کہ" (unit-assessment:68); MCQ 7 key explanation drops خود مختاری from the four-marker list (unit-assessment:190); topic-03.mdx:198 mini-rubric adds "اگلے ہفتے" not present in the EN row; unit-teacher-notes.mdx:103 heading adds "، اور اختتام"; unit-teacher-notes.mdx:24-25 "یہی وہ تھکن کا پہلو" is ambiguous between the burnout and exhaustion dimensions (say پیشہ ورانہ تھکن کا پہلو); topic-04.mdx:68-69 renders the normative "are exactly who should be pressing on that" descriptively as "اسی وقت دباؤ ڈالنے والے ہیں"; index.mdx:35 "بے خبر" for "naive"; topic-01.mdx:104-105 the marking-exchange reciprocity ("a colleague who takes half the marking in exchange for half of hers") is muddled in "جو آدھی جانچ کے بدلے آدھی ان کی جانچ لے لے".' },
    { severity: 'advisory', resolved: false, message: 'TERMINOLOGY POLYSEMY: لچک NAMES BOTH "ELASTICITY" AND "RESILIENCE". Unit 3\'s reviewed Urdu banks لچک as resilience (unit-03 topic-02), and Unit 5 topic-01 uses لچک/لچکدار for the workload\'s elasticity (topic-01:47,62,212-213; unit-assessment:22,180) while topic-04 and the assessment use لچک for resilience (topic-04:72-76; unit-assessment:48,114,180). A student meets "the workload\'s لچک" and "resilience لچک" in one unit. Consider reserving لچک for resilience and using پھیلاؤ/کشادگی for the workload sense. Concept labels otherwise confirmed: the fourteen authored labels in concepts/unit-05.md are fit for bank promotion (notes: CON:5-6 بطور سبب narrows "as the mechanism"; CON:5-7 ناپید vs prose غائب); CON:5-4 is already banked (carried G3 advisory).' },
    { severity: 'advisory', resolved: false, message: 'CARRIED G3 (feat023-r1) ADVISORIES THAT APPLY EQUALLY TO THE URDU MIRROR. blooms_summary understates the Apply counts (mirrored in all seven UR frontmatter); ten further-reading bare-URL links (visible in the Urdu renders, render-review.log section A); fig-U5-7\'s footer carries a substantive claim absent from prose (mirrored in the .ur.svg footer); the teacher-notes collective-pressure cross-reference is imprecise (mirrored at unit-teacher-notes.mdx:76-79); RRQ 2\'s "where conducted" stem presupposition (mirrored). EN-side governance, no new Urdu defect.' },
    { severity: 'advisory', resolved: false, message: 'STALE GOVERNANCE PROSE IN A BOUND FILE. specs/content/efmp-302/figures/unit-05.md lines 9-10 still say the unit is "translation_status: draft with no Urdu mirror on disk, so the bilingual figure rule does not apply yet" - false since the 2026-09-24 translation; lines 5-6 say "three flowcharts" while naming two (carried G3 advisory). No learner-facing effect; update with the repairs.' },
    { severity: 'advisory', resolved: false, message: 'ENVIRONMENT LIMITATION ON FIGURE-INTERNAL NASTALIQ VERIFICATION. This host has no system Noto Nastaliq Urdu for SVG text (the .ur.svg files use system font stacks and embed no font), so figure-internal glyphs render in fallback Arabic shaping in both the geometry instrument and the browser screenshots; page body text is unaffected (the self-hosted webfont loads). Figure-internal Nastaliq verification on a Nastaliq-capable host remains an owner-side check, as in the Unit 3/4 G5 runs.' },
    { severity: 'advisory', resolved: true, message: 'RESOLVED - INDEPENDENCE, INPUT BINDING AND BUILD FRESHNESS (positive checks). Independence: this fresh session authored and translated none of the reviewed bytes. Input binding: the feat023-r1 manifest was verified, not refreshed - recomputing the bundle with the contract\'s own inputManifest() gives 131 paths matching 131, zero digest mismatches, zero added or dropped, skill_digest equal to skillDigest(root, "G5") (verify-inputs.log); a plain byte-hash check first showed 15 apparent mismatches that are fully explained by the contract\'s documented frontmatter translation_status normalization and content-spec unit slicing, not by changed inputs. Build freshness: the shared build at a483c9e serves Unit 5\'s current Urdu bytes - every current-source probe (including the defect-locator strings) found in the built pages and all 16 Urdu figure assets byte-identical to source (site-build.log); no rebuild was needed or run.' }
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-05/G5/logs-feat023-r1/validate-content.log' },
    { name: 'check:depth-gate', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-05/G5/logs-feat023-r1/check-depth-gate.log' },
    { name: 'check:figures', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-05/G5/logs-feat023-r1/check-figures.log' },
    { name: 'check:no-em-dash', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-05/G5/logs-feat023-r1/check-no-em-dash.log' },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-05/G5/logs-feat023-r1/check-no-answer-keys.log' },
    { name: 'check:docs-sync', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-05/G5/logs-feat023-r1/check-docs-sync.log' },
    { name: 'site-build', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-05/G5/logs-feat023-r1/site-build.log' },
    { name: 'render-review', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-05/G5/logs-feat023-r1/render-review.log' },
    { name: 'measure-figure-text', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-05/G5/logs-feat023-r1/measure-figure-text.log' },
    { name: 'measure-text-overlap', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-05/G5/logs-feat023-r1/measure-text-overlap.log' },
    { name: 'verify-inputs', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-05/G5/logs-feat023-r1/verify-inputs.log' },
    { name: 'figure-shots', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-05/G5/logs-feat023-r1/figure-shots.log' },
    { name: 'targeted-shots', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-05/G5/logs-feat023-r1/targeted-shots.log' }
  ],
  command_notes: {
    'site-build': 'NOT a rebuild. The shared two-locale build at build/ (mtime 2026-09-24T22:50:19Z, built at commit a483c9e immediately before this review launched) was proven fresh for Unit 5\'s Urdu pages by logs-feat023-r1/build-freshness-probe.mjs: every current-source probe string, including the defect-locator strings, is present in the built Urdu HTML (whitespace-normalised matching, since the build preserves intra-paragraph newlines), and all 16 Urdu figure assets under build/img/figures/efmp-302/unit-05/ are byte-identical to static/ sources. No npm run build was run by this reviewer.',
    'render-review': 'node scripts/render-inspect.mjs EFMP-302 5 --locale ur --port 4626 --out specs/content/efmp-302/reviews/unit-05/G5/renders-feat023-r1 against the shared build served by npm run serve -- --port 4626; Chromium 149.0.7827.0 headless; sections A desktop 1280x900, B narrow 360x780 (document overflow, figure/table scrollers), C A4 print 794px (clipped elements, figure fit), D SVG text geometry; defects 0. Section E of the log is the reviewer\'s own visual inspection record: all 7 desktop and narrow full-page PNGs, all 8 Urdu figures in both themes (dark re-shot via html[data-theme=dark] after emulateMedia proved insufficient for this site\'s theming), 11 targeted native-scale crops of key passages and both defect loci, and print-media-emulation screenshots; Nastaliq webfont confirmed loading on the Urdu pages.',
    'measure-text-overlap': 'Reviewer-authored instrument (logs-feat023-r1/measure-text-overlap.mjs): rendered getBoundingClientRect of every <text> element in all 16 Urdu SVG variants, pairwise intersection test with 0.1-unit epsilon, wordmark clearance, viewBox overflow, plus minimum-clearance quantification. Zero overlaps, zero collisions, zero overflows; minimum vertical clearance 0.85px (fig-U5-7), minimum horizontal 17.72px, minimum wordmark clearance 17.72px. Fallback-metric geometry (no system Nastaliq for SVG text on this host), as recorded in the instrument header.',
    'figure-shots': 'Reviewer-authored Playwright driver (figure-shots.mjs + figure-shots-dark.mjs) serving the shared build on port 4626; per-figure element screenshots of all 8 Urdu figures in both site themes plus in-context shots of the RTL-critical diagrams.',
    'targeted-shots': 'Reviewer-authored Playwright driver (targeted-shots.mjs): native-scale 1280x560 crops of eleven key passages located in the live DOM (source-scope passages, the three negation/garble defect loci, the MCQ options and key, the ERQ 1 rubric cell with the untranslated word), for the visual Nastaliq/bidi/numeral/Latin inspection recorded in render-review.log section E.',
    'verify-inputs': 'Manifest verification (logs-feat023-r1/verify-inputs.log): recomputed the bundle with the contract\'s inputManifest() - 131 paths, zero diffs, skill_digest match - rather than refreshing it.'
  },
  evidence_manifest: evidenceManifest,
  summary: 'Feature-023 cycle 1, G5 Urdu review of EFMP-302 Unit 5. Disposition revise: the translation is structurally complete (exact heading/link/list parity across all seven file pairs) and the assessment bank is genuinely equivalent (blind-solved the ten Urdu MCQs 10/10 with option order and keys matching, RRQ/ERQ mark schemes and the 10-cap preserved), but nine blocking content defects require repair: three meaning inversions or garbles in prose (the unit\'s stance on accountability inverted at topic-02:45; "are not nothing" inverted to "are nothing at all" at topic-04:89-90; the cost leg of the three-question application garbled at topic-03:71-72), the تناوب-for-tension wrong term on Isoré\'s finding (recurrence of the Unit 4 G5 finding), a weakened impose-consequences rendering, a collapsed RRQ 1 marking-point contrast, two figure defects (the Law recognition cell reading بلند where the EN reads Mixed; the non-word ششہ in fig-U5-8), and an untranslated "fixed" in the ERQ 1 rubric. Rendering is otherwise clean: RTL mirroring correct on both flowcharts and the three-regions diagram, zero text overlap across all 16 Urdu figure variants, narrow and A4 print clean, the Nastaliq webfont loading with correct bidi, digits and embedded Latin. Register is good academic-plain overall with a repairable batch of typos, agreement slips and code-mixed "quote". The G3 dependency remains undischargeable by signed evidence (G-2026-65 pattern) and is recorded as an unresolved uncertain finding; the English comparison base is the exact text the feat023-r1 advisory G3 passed, verified digest by digest. Advisory only; not certification; translation_status remains draft.'
};

writeFileSync('specs/content/efmp-302/reviews/unit-05/G5/agent-g5-efmp302-u5-feat023-r1.json', JSON.stringify(report, null, 2) + '\n');
console.log('report written:', 'specs/content/efmp-302/reviews/unit-05/G5/agent-g5-efmp302-u5-feat023-r1.json');
console.log('evidence files:', Object.keys(evidenceManifest).length);
console.log('criteria:', report.criteria.map((c) => c.id + '=' + c.status).join(' '));
console.log('findings:', report.findings.filter((f) => f.severity === 'blocking' && !f.resolved).length, 'blocking,',
  report.findings.filter((f) => f.severity === 'uncertain' && !f.resolved).length, 'uncertain,',
  report.findings.filter((f) => f.severity === 'advisory').length, 'advisory');
