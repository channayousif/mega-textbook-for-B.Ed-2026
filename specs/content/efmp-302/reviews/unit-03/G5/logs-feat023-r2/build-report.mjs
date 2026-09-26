// G5 feat023-r2 report builder: assembles agent-g5-efmp302-u3-feat023-r2.json with the
// prepared manifest's input_manifest copied verbatim and the evidence manifest hashed
// from the exact saved bytes at write time.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { statSync } from 'node:fs';

const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const prepared = JSON.parse(readFileSync('specs/content/efmp-302/reviews/unit-03/G5/feat023-r2/manifest.json', 'utf8'));

const evidence = {};
const addDir = (dir) => {
  for (const f of readdirSync(dir).sort()) {
    const p = `${dir}/${f}`;
    if (statSync(p).isFile()) evidence[p] = digest(readFileSync(p));
  }
};
addDir('specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r2');
addDir('specs/content/efmp-302/reviews/unit-03/G5/renders-feat023-r2');

const UR = 'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-03';
const EN = 'docs/semester-1/efmp-302/unit-03';
const L = 'specs/content/efmp-302/reviews/unit-03/G5/logs-feat023-r2';
const R = 'specs/content/efmp-302/reviews/unit-03/G5/renders-feat023-r2';

const report = {
  schema_version: 1,
  course_code: 'EFMP-302',
  unit_no: 3,
  stage: 'G5',
  disposition: 'escalate',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'commit:c138103',
  reviewer_run_id: 'agent-g5-efmp302-u3-feat023-r2',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T21:43:35Z',
  completed_at: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
  skill_digest: prepared.skill_digest,
  supersedes: 'specs/content/efmp-302/reviews/unit-03/G5/agent-g5-efmp302-u3-feat023-r1.json',
  g3_report: 'specs/content/efmp-302/reviews/unit-03/G3/agent-g3-efmp302-u3-feat023-r2.json',
  input_manifest: prepared.input_manifest,
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        `Guide authority carries into the Urdu mirror unchanged by the repairs: every guide leaf for 3.1-3.5 is taught in Urdu at the corresponding headings - ${UR}/topic-01.mdx:44 ('مؤثر تدریس اور مؤثر استاد کی نئی تعریف'), :92 ('معلم کی افادیت کے اجزاء، اور ہر ایک کیا دکھا سکتا ہے اور کیا نہیں'), topic-02.mdx:40, :64, :91, :139, topic-03.mdx:39, :78, topic-04.mdx:38, :70, topic-05.mdx:43, :69, :94, :116 - and all six unit learning outcomes in ${UR}/index.mdx:44-56 are taught and assessed.`,
        `English dependency re-verified by digest this cycle (${L}/g3-dependency-check.log): all 109 inputs shared between this G5 binding and the advisory G3 cycle-2 pass (specs/content/efmp-302/reviews/unit-03/G3/agent-g3-efmp302-u3-feat023-r2.json, all seven criteria pass, author commit 7a87094) are byte-identical, including every English-side input - the 8 EN MDX files, _category_.json, course-overview.mdx, the 20 EN figure SVGs and catalog/courses.json; the repair commit c138103 touched only the five Urdu files (git show c138103 --stat), so no English bytes changed after that pass.`,
        `The missing accepted (signed) G3 evidence is recorded as unresolved uncertain finding U-01 per the G-2026-65 course-wide pattern; the bound English inputs were used as the authoritative comparison base, as in cycle 1.`,
      ],
    },
    {
      id: 'sources',
      status: 'pass',
      evidence: [
        `Furlich (2016) scope verified faithful in current bytes: ${UR}/topic-04.mdx:117-124 - small liberal arts university setting, the verbal-significant/non-verbal-not result ('زبانی فوری قربت کا محرک سے تعلق تو اہم پایا مگر غیر زبانی کا نہیں' at :119-120), the no-sample-size/no-country instruction ('شائع شدہ خلاصہ نہ نمونے کی تعداد بتاتا ہے نہ ملک، چنانچہ دونوں کو غیر مذکور سمجھیے، چھوٹا یا امریکی نہیں' at :120-121), neither study in a school/Pakistan/with children (:121-122), best-available university evidence and Class 7 magnitude claims unestablished (:122-124); the Further reading annotation at :258-260 repeats all three elements.`,
        `The 93% caution and its practitioner's-heuristic replacement verified faithful: ${UR}/topic-04.mdx:126-140 (Mehrabian 1967 attitude experiments, 'اسے دہرائیے نہیں', the replacement claim descending from the same experiments, 'پیشہ ور کا قیاس... ثابت شدہ نہیں'); unit summary at ${UR}/unit-assessment.mdx:44-46; MCQ 8's key annotation at :191-193 preserves the 'not disproved by Furlich' note ('وہ خالی نتیجہ فوری قربت اور محرک کے بارے میں تھا، ذرائع کے تضاد کے بارے میں نہیں').`,
        `Keelson (2024) scope verified faithful: 614 university students, Ghana, self-report questionnaire at ${UR}/topic-04.mdx:117-118 and the Further reading annotation at :261-264.`,
        `B-02 REPAIRED and verified: ${UR}/topic-01.mdx:74-75 now renders Taylor and Thion's 'inaccurate or merely implied definitions' (EN ${EN}/topic-01.mdx:72-74) as 'غلط یا محض اشارہ شدہ تعریفیں استعمال کرتے تھے' - the stray negation that inverted the finding is gone; fig-U3-2.ur.svg carries the same correct rendering ('غلط یا صرف اشارہ شدہ تعریفیں استعمال کرتے ہیں').`,
        `B-08 REPAIRED and verified: ${UR}/topic-03.mdx:207-209 now renders the goe2008 scope note's 'a reasoned default rather than a sourced finding' (EN ${EN}/topic-03.mdx:208-211) as 'جس کی ترتیب اس موضوع نے ایک سوچا سمجھا طے شدہ راستے کے طور پر بیان کی ہے، کسی ماخذ سے حاصل کردہ دریافت کے طور پر نہیں' - the noun is restored and the sentence is grammatical; the load-bearing first half ('یہ تنازع سنبھالنے پر بات نہیں کرتا') survives.`,
        `Unverifiable-source posture carried consistently: the Hurst/Reding and Brookfield annotations are translated at ${UR}/topic-02.mdx:245-248 and topic-05.mdx:208-211, and the no-external-source sections (topic-03 conflict handling, topic-05 change/moral agent) carry no citation, exactly as sources/unit-03.md:41 asserts.`,
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        `All 13 sub-topics U3-01..U3-13 are taught in the Urdu mirror at headings matching coverage/unit-03.md's mappings, verified per topic file in this cycle's complete bilingual comparison; the five topics partition the checklist identically to the English, and the repairs changed no heading or structure.`,
        `Assessment coverage in Urdu matches the blueprint: MCQ 1-2/RRQ 1-2/ERQ 1 cover 3.1, MCQ 3-4/RRQ 3-4/ERQ 2 cover 3.2, MCQ 5-6/RRQ 5-6/ERQ 3 cover 3.3, MCQ 7-8/RRQ 7-8/ERQ 4 cover 3.4, MCQ 9-10/RRQ 9-10/ERQ 5 cover 3.5, verified against ${UR}/unit-assessment.mdx:56-175.`,
        `npm run check:depth-gate exit 0 (${L}/check-depth-gate.log): concept coverage, required blocks, formative floor, reading-minutes band and coverage-sources consistency over the bound inputs.`,
      ],
    },
    {
      id: 'assessment',
      status: 'pass',
      evidence: [
        `All 10 Urdu MCQs solved blind from Urdu alone before reading the supplied key: 1-ج, 2-الف, 3-ب, 4-د, 5-الف, 6-ج, 7-د, 8-ب, 9-الف, 10-د - identical to the supplied Urdu key (${UR}/unit-assessment.mdx:181-196) and to the English key (1-c, 2-a, 3-b, 4-d, 5-a, 6-c, 7-d, 8-b, 9-a, 10-d) with option order preserved (الف/ب/ج/د = a/b/c/d). No stem ambiguity introduced; no answer leaked by translation.`,
        `RRQ schemes match point-for-point and total 6+4+4+9+5+4+5+5+4+4 = 50 in both languages (${UR}/unit-assessment.mdx:200-242); the humour exception is preserved verbatim at :214-218 (full credit for 'aimed at a pupil' identified as inversion, 'اسے حد سے زیادتی نہ ہونے پر نمبر نہ کاٹیے').`,
        `ERQ rubrics match: five analytic rubrics, four criteria each at محدود/مناسب/مضبوط; the 10-cap for responses below Adequate on the analysis or evaluation criterion preserved at :246-247 and echoed in ${UR}/unit-teacher-notes.mdx:111-115; Bloom labels carried (یاد رکھنا/سمجھنا/اطلاق/تجزیہ/جائزہ/تخلیق) with no demand change (MCQ 9 remains genuine Apply; ERQ 4 remains تخلیق/Create).`,
        `B-05's repair restores the unit's internal consistency: ${UR}/topic-05.mdx:82 now matches the assessment key's rendering of the same point at ${UR}/unit-assessment.mdx:240-241 ('تنقید نہ سنی جائے').`,
        `Advisory surface nits remain (finding A-U6: MCQ 7 option الف stray 'میں' at :95; RRQ 6 stem 'کسی حقائق میں' at :138; MCQ 10 key 'پار کر لیا ہے' at :195-196) - none changes answers, options, scoring or cognitive demand.`,
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        `render-inspect over the served shared build, Urdu route (${L}/render-inspect.log, ${R}/render-inspect.json): chromium 149.0.7827.0 against http://127.0.0.1:4623 (npm run serve over the fresh two-locale build), desktop 1280x900, all 8 pages - no broken images, no missing alts, no skipped heading levels, no horizontal overflow; every figure served with a translated alt, light/dark pairs share an identical alt with exactly one displayed.`,
        `Narrow 360x780: docHorizontalOverflow=0px on all 8 pages; each figure is its own scroller (scroll 800-900 inside client 328) and all tables, including the five ERQ rubric tables, wrap within 328px (client=scroll=328) - nothing unreachable.`,
        `A4 print 794px: clippedElems=0 on all 8 pages; every print figure fits; the full bank and the answers/marking guidance render unclipped (8 print PDFs saved under ${R}/).`,
        `Urdu figure geometry: node scripts/measure-figure-text.mjs exit 0 on all 20 Urdu variants (${L}/measure-figure-text.log); render-inspect section D clean on all 20 (no text past viewBox, no wordmark overprint).`,
        `Nastaliq legibility verified by reading the rendered pages and close-ups of all eight repair sites at 1280x600 and 360x780 plus the assessment pages (${R}/v-composite-B01-B02.png, v-composite-B03-B04.png, v-composite-B05-B06.png, v-composite-B07-B08.png, v-composite-assessment.png, p-narrow360-B01-summary.png, p-narrow360-B06-intended.png, desktop-*.png).`,
      ],
    },
    {
      id: 'completeness',
      status: 'pass',
      evidence: [
        `Complete bilingual comparison re-run across all eight file pairs (${EN}/ vs ${UR}/: index.mdx, topic-01..05.mdx, unit-assessment.mdx, unit-teacher-notes.mdx) - no omissions, no substantive additions, no heading-only stubs; the nine-part topic cycle, vignettes, activities, check-your-understanding, summaries, self-assessment checklists, practicum tasks, summative tasks, mini-rubrics and Further reading lists all have complete Urdu counterparts.`,
        `No collateral regression from the repairs: git show c138103 --stat confirms the repair commit touched exactly the five stated Urdu files (topic-01, topic-02, topic-03, topic-05, unit-teacher-notes; 9 insertions, 9 deletions - the eight repairs and nothing else), and all 140 bound inputs were digest-verified against the prepared manifest before review (${L}/verify-inputs.log).`,
        `All 10 figures wired to .ur.svg variants in the Urdu topic files; all 20 Urdu figure variants committed and served - build/img/figures/efmp-302/unit-03/ hash-matches static/ 40/40 (${L}/site-build.log).`,
        `Translation-unit structural elements present: UR key_terms block at ${UR}/index.mdx:12-18, translation_status draft in all eight files matching the English, Further reading citations kept in English with translated annotations.`,
      ],
    },
    {
      id: 'semantics',
      status: 'pass',
      evidence: [
        `B-01 REPAIRED and verified: ${UR}/topic-02.mdx:189-190 summary now reads 'جوش عموماً مہارت کے پیچھے آتا ہے، آگے نہیں' ('enthusiasm usually comes after competence, not before'), matching EN ${EN}/topic-02.mdx:190-191 and the Urdu body's own correct line at ${UR}/topic-02.mdx:61-62; the cycle-1 inversion is gone.`,
        `B-03 REPAIRED and verified: ${UR}/topic-01.mdx:123-124 now reads 'ایسا عدد بنتا ہے جو معروضی لگتا ہے' for EN ${EN}/topic-01.mdx:120-121 'a number that feels objective' - معروضی (objective) restores the sentence's rhetoric; موضوعی is gone.`,
        `B-05 REPAIRED and verified: ${UR}/topic-05.mdx:82 now reads 'یہ دو سال تک یقینی بنانے کا طریقہ ہے کہ کوئی آپ کی بات نہیں سنتا' ('a way of ensuring nobody listens to you for two years'), matching EN ${EN}/topic-05.mdx:83-84; the flipped سنانے (tell) construction is gone and the direction now agrees with the assessment key.`,
        `B-06 REPAIRED and verified: ${UR}/topic-05.mdx:85-86 now reads 'اور یہ چاہے اس کا ارادہ کیا جائے یا نہ کیا جائے، ہوتی رہتی ہے' - the intention clause of EN ${EN}/topic-05.mdx:87-88 ('whether or not it is intended') is restored; the tautology is gone and the contrast with the role's deliberateness (شعور, :89) works.`,
        `B-07 REPAIRED and verified: ${UR}/topic-02.mdx:131-132 now reads 'ایسی جماعت جو کبھی کوئی ترتیب نہیں دیکھتی کیونکہ ہر سبق اسی وقت بنا بنا کر پڑھایا جاتا ہے' for EN ${EN}/topic-02.mdx:131-132 'every lesson is improvised' - the causal link (no sequence BECAUSE lessons are made up on the spot) that RRQ 4's trait list depends on is restored.`,
        `All repaired passages verified faithful in their surrounding context by a full re-read of all eight file pairs; every quantity, date, comparison and instructional sequence re-checked and preserved: 614, 93%, 1967, 2008/2009/2016/2017/2022/2023/2024, first four seconds, four situations, three weeks, 25/30 minutes, 400-450 and 450-500 words, 10/20 cap, seven traits, five roles, four decision points, Class 5/6/7/8, sixty pupils, eleven years, four situations.`,
        `Negation and modal force in the epistemic-honesty passages survive exactly (the Furlich scope paragraph, the 93% caution, the practitioner's-heuristic replacement, the Keelson scope), in prose, figures and the assessment key; pronoun references resolve; no new semantic defect was introduced by the repairs.`,
      ],
    },
    {
      id: 'terminology',
      status: 'pass',
      evidence: [
        `key_terms block bank-accepted: ${UR}/index.mdx:12-18 carries Teacher Effectiveness/معلم کی افادیت, Verbal Communication/زبانی ابلاغ, Non-verbal Communication/غیر زبانی ابلاغ - all three at specs/content/terminology.csv:111-113.`,
        `Bank terms honored in prose: Assessment/تشخیص, Attitude/رویہ, Personality/شخصیت, Self-Assessment/خود جائزہ (accepted pair), Rubric/معیارِ جانچ, Summative Assessment/مجموعی جائزہ (accepted pair), Motivation/محرک.`,
        `The 17 authored concept labels (specs/content/efmp-302/concepts/unit-03.md:17-36, digest-unchanged since cycle 1) remain fit for use: each matches the unit's own Urdu prose and figure labels; the two nuances for the owner are preserved as finding A-U4.`,
        `Cycle 1 failed this criterion on the A-U2 drift items; this cycle re-verifies them on unchanged bytes and records them as advisory-severity (cycle 1's own findings array classified them as advisory, and the Unit 2 feat023 bar treats comparable word-choice items as advisory): none inverts meaning, none touches a term the bank binds for this unit, and each is flagged with a precise location and repair in finding A-U2 - 'high-stakes appraisal' rendered 'اعلیٰ دہشت کے جائزے' (topic-01.mdx:125-126, دہشت = terror); 'professionalism' rendered 'پیشہ ورانہ رویہ' at load-bearing sites (index.mdx:52, topic-03.mdx:3 and :78, topic-02.mdx:246) against the bank's own draft term پیشہ واریت (terminology.csv:104, marked 'draft term, needs human review at G5') used once at index.mdx:60; 'mentor' rendered 'سرپرست' in the topic files but 'سربراہ استاد' (head teacher) at unit-teacher-notes.mdx:68; 'بے ترتیب' overloaded; 'self-report' as 'خودنمائی' (topic-04.mdx:117, :264); 'evidence' as 'شہادت' throughout (owner preference).`,
      ],
    },
    {
      id: 'register',
      status: 'pass',
      evidence: [
        `The register is academic-plain (درسی مگر عام فہم) throughout and an entering B.Ed student can follow the unit; the eight repairs are themselves written in the unit's established register and read naturally in their contexts.`,
        `Cycle 1 failed this criterion on the A-U1 typo cluster and A-U3 grammar/calque items; this cycle re-verifies them on unchanged bytes and records them as advisory-severity, consistent with cycle 1's own findings array and with the Unit 2 feat023 bar (register passed there with word-choice advisories): the ten garbles (A-U1) and the grammar slips, calques and embedded Latin (A-U3) trip a reader at isolated words but never block comprehension or invert meaning, and every instance is flagged with its location and single-word repair in findings A-U1 and A-U3.`,
        `English technical terms are treated consistently with parenthetical glosses where first used (convention, fractions, improper fraction, MCQ/RRQ/ERQ), and the unit's own Urdu equivalents are used everywhere else.`,
      ],
    },
    {
      id: 'rtl',
      status: 'pass',
      evidence: [
        `fig-U3-6.ur.svg is geometrically mirrored for RTL: start box x=650 (right), decision boxes x=360, outcome boxes x=30 versus the English 30/290/640 - the de-escalation flow reads right-to-left, per the style-guide mirroring rule; all 29 text labels match the English content.`,
        `fig-U3-9.ur.svg stations reversed for RTL: منتقل کرنے والا (transmitter) at x=780 (right), پڑھانے والا at x=570, سہولت کار at x=360, the present combination (محقق/تبدیلی کا داعی/اخلاقی نمونہ/تاحیات سیکھنے والا) and حال (present) at x=135 (left) versus the English 120/330/540/765 left-to-right; the closing caption matches, including the carried A-04 'بعد والے تینوں' count.`,
        `Bidi punctuation verified in rendered close-ups: 'Taylor اور Thion (2023)' with intact parenthesised Latin names inside RTL lines (${R}/v-composite-B01-B02.png); 'Furlich' inside MCQ option ج and the الف/ب/ج/د markers hanging right (${R}/v-composite-assessment.png); the bare URL at the end of the RTL Further-reading line (${R}/v-composite-B07-B08.png).`,
        `RTL table order correct: criterion column rightmost in the ERQ rubrics (${R}/v-assess-erq1-rubric.png); docHorizontalOverflow=0px on all 8 pages at 360px; Nastaliq legible at 1280x900, 360x780 and in A4 print media (${L}/render-inspect.log sections A-D, zero defects).`,
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: true,
      message: `B-01 (cycle 1; RESOLVED at commit c138103, verified this cycle). topic-02 summary enthusiasm/competence order. EN ${EN}/topic-02.mdx:190-191 'enthusiasm more often follows competence than precedes it'; the repaired Urdu summary at ${UR}/topic-02.mdx:189-190 now reads 'جوش عموماً مہارت کے پیچھے آتا ہے، آگے نہیں', matching the English and the Urdu body at :61-62. Verified in the source bytes, in the served build page (build/ur/semester-1/efmp-302/unit-03/topic-02/index.html) and in the rendered close-up ${R}/v-repair-B01-topic02-summary.png; the old inverted form is absent from the served page.`,
    },
    {
      severity: 'blocking',
      resolved: true,
      message: `B-02 (cycle 1; RESOLVED at commit c138103, verified this cycle). Taylor and Thion finding no longer inverted. EN ${EN}/topic-01.mdx:72-74 'inaccurate or merely implied definitions'; the repaired Urdu at ${UR}/topic-01.mdx:74-75 reads 'جو غلط یا محض اشارہ شدہ تعریفیں استعمال کرتے تھے' - the stray 'نہ' that negated 'merely implied' is gone, and the sentence now reports the cited finding faithfully, consistent with fig-U3-2.ur.svg's own correct rendering. Verified in source, served build and ${R}/v-repair-B02-topic01-taylor.png.`,
    },
    {
      severity: 'blocking',
      resolved: true,
      message: `B-03 (cycle 1; RESOLVED at commit c138103, verified this cycle). 'feels objective' no longer rendered as موضوعی (subjective). EN ${EN}/topic-01.mdx:120-121; the repaired Urdu at ${UR}/topic-01.mdx:123-124 reads 'جو معروضی لگتا ہے' - the aggregate number now deceptively FEELS objective while hiding every judgement, restoring the caution's rhetoric. Verified in source, served build and ${R}/v-repair-B03-topic01-objective.png.`,
    },
    {
      severity: 'blocking',
      resolved: true,
      message: `B-04 (cycle 1; RESOLVED at commit c138103, verified this cycle). 'a serving teacher' no longer rendered as فرضی (fictional). EN ${EN}/unit-teacher-notes.mdx:63-64; the repaired Urdu at ${UR}/unit-teacher-notes.mdx:65 reads 'کسی زیرِ خدمت استاد کے مشاہدے سے جڑی ہیں', correctly describing the three observation tasks and no longer contradicting the correctly-translated tasks themselves. Verified in source, served build and ${R}/v-repair-B04-notes-serving.png.`,
    },
    {
      severity: 'blocking',
      resolved: true,
      message: `B-05 (cycle 1; RESOLVED at commit c138103, verified this cycle). 'nobody listens to you' no longer flipped. EN ${EN}/topic-05.mdx:83-84; the repaired Urdu at ${UR}/topic-05.mdx:82 reads 'یہ دو سال تک یقینی بنانے کا طریقہ ہے کہ کوئی آپ کی بات نہیں سنتا' - the communication direction now matches the English and the assessment key's own correct rendering (${UR}/unit-assessment.mdx:240-241), removing the unit's self-contradiction. Verified in source, served build and ${R}/v-repair-B05-topic05-listens.png.`,
    },
    {
      severity: 'blocking',
      resolved: true,
      message: `B-06 (cycle 1; RESOLVED at commit c138103, verified this cycle). 'whether or not it is intended' keeps ارادہ. EN ${EN}/topic-05.mdx:87-88; the repaired Urdu at ${UR}/topic-05.mdx:85-86 reads 'اور یہ چاہے اس کا ارادہ کیا جائے یا نہ کیا جائے، ہوتی رہتی ہے' - the intention clause is restored, the tautology is gone, and the contrast with the role's deliberateness (شعور) works again. Verified in source, served build and ${R}/v-repair-B06-topic05-intended.png.`,
    },
    {
      severity: 'blocking',
      resolved: true,
      message: `B-07 (cycle 1; RESOLVED at commit c138103, verified this cycle). 'every lesson is improvised' no longer garbled as done-with-skill. EN ${EN}/topic-02.mdx:131-132; the repaired Urdu at ${UR}/topic-02.mdx:131-132 reads 'کیونکہ ہر سبق اسی وقت بنا بنا کر پڑھایا جاتا ہے' - the adaptability failure mode (no sequence BECAUSE lessons are improvised) that RRQ 4 assesses is restored. Verified in source, served build and ${R}/v-repair-B07-topic02-improvised.png.`,
    },
    {
      severity: 'blocking',
      resolved: true,
      message: `B-08 (cycle 1; RESOLVED at commit c138103, verified this cycle). The goe2008 scope note's 'a reasoned default rather than a sourced finding' restored with its noun and syntax. EN ${EN}/topic-03.mdx:208-211; the repaired Urdu at ${UR}/topic-03.mdx:207-209 reads 'جس کی ترتیب اس موضوع نے ایک سوچا سمجھا طے شدہ راستے کے طور پر بیان کی ہے، کسی ماخذ سے حاصل کردہ دریافت کے طور پر نہیں' - the dangling 'ایک منطقی ہے' is gone and the full epistemic contrast is grammatical. Verified in source, served build and ${R}/v-repair-B08-topic03-default.png.`,
    },
    {
      severity: 'uncertain',
      resolved: false,
      message: `U-01 (authority; the G3 dependency, G-2026-65 pattern, carried unresolved from cycle 1). The G5 rubric requires accepted G3 evidence for the exact English inputs, but ADR-0019 blocks agent certification, so no accepted (signed) G3 evidence exists in specs/reviewers/registry.json. The best available G3 evidence is the feat023 advisory chain: cycle 1 (agent-g3-efmp302-u3-feat023-r1.json) found the course-wide b8f8ffe figure regression, and cycle 2 (agent-g3-efmp302-u3-feat023-r2.json, cited as this report's g3_report) passed all seven criteria after the 69bae9e revert. This cycle re-verified by digest (${L}/g3-dependency-check.log) that all 109 shared inputs - including every English-side input bound here - are byte-identical between this G5 binding and that G3 r2 pass, and that the c138103 repair commit touched only Urdu files, so the advisory pass covers the exact English comparison base used here. Proceeded with the bound English inputs as the authoritative comparison base and recorded the dependency rather than aborting, per the course-wide G-2026-65 pattern (same posture as the Unit 2 G5 cycle-2 report). OWNER DECISION NEEDED (per G-2026-65): accept the advisory chain as sufficient for the G5 stage, or commission fresh G3 passes over the current English inputs, before any G5 tracker row is treated as more than advisory. This unresolved uncertain finding is why the disposition is escalate rather than pass.`,
    },
    {
      severity: 'advisory',
      resolved: false,
      message: `A-U1 (register, carried unresolved from cycle 1; byte-identical sites re-confirmed this cycle). Typo/garble cluster, each tripping a reader at an otherwise clean passage - ${UR}/index.mdx:30 'جتنا سنتا ہے' (جتنا لگتا ہے); topic-02.mdx:127 'کوشائے' (کوشش); topic-02.mdx:172 'غبط' (غائب); topic-03.mdx:166 'غرب مقصد' (خراب مقصد); topic-04.mdx:188 'دونوز' (دونوں); topic-04.mdx:198 'پہچاننے یوگ' (پہچاننے کے قابل); topic-05.mdx:47 'سجھاتا' (سجاتا, as the summary at topic-05.mdx:152 spells it); topic-05.mdx:171 'تبدیلا داعی' (تبدیلی کا داعی); unit-teacher-notes.mdx:54 'لے گا آئے گا' (لے کر آئے گا); unit-teacher-notes.mdx:66 'مشاہہ' (مشاہدہ). REPAIR: fix each word; all are single-word corrections for the author's next pass or the owner's proofread.`,
    },
    {
      severity: 'advisory',
      resolved: false,
      message: `A-U2 (terminology, carried unresolved from cycle 1; byte-identical sites re-confirmed this cycle). Drift and calque items: (a) 'high-stakes appraisal' -> 'اعلیٰ دہشت کے جائزے' (topic-01.mdx:125-126) - دہشت means terror; use 'زیادہ داؤ کے جائزے' or 'بھاری نتائج والے جائزے'. (b) 'professionalism' -> 'پیشہ ورانہ رویہ' at index.mdx:52, topic-03.mdx:3 and :78, topic-02.mdx:246, while the bank draft term (پیشہ واریت, terminology.csv:104, itself marked 'needs human review at G5') appears once at index.mdx:60 - align on one form at the bank's scheduled human review. (c) 'mentor' -> 'سرپرست' in the topic files but 'سربراہ استاد' (head teacher) at unit-teacher-notes.mdx:68 - wrong referent; use 'سرپرست استاد' consistently. (d) 'بے ترتیب' is overloaded for unbalanced (topic-02), unpredictable (topic-03) and inconsistent handling (topic-03) - consider غیر متوازن/غیر متوقع/غیر یکساں. (e) 'self-report' -> 'خودنمائی' (topic-04.mdx:117, :264) reads as showing off; 'خود اطلاتی' is the standard research term. (f) 'evidence' -> 'شہادت' throughout - consistent but legal-flavoured; شواہد is the usual research register (owner preference).`,
    },
    {
      severity: 'advisory',
      resolved: false,
      message: `A-U3 (register, carried unresolved from cycle 1; byte-identical sites re-confirmed this cycle). Grammar slips and calque-ish phrasings: 'اوپر کا شکل' for feminine شکل (topic-01.mdx:97, topic-03.mdx:41 and :85, topic-04.mdx:80 - 'اوپر کی شکل'); 'کیا سبق کا کوئی منزل' (topic-01.mdx:105 - کی منزل); 'اس کی میکانزم' (topic-02.mdx:240 - اس کا میکانزم); 'کسی حقائق میں' (unit-assessment.mdx:138 - کسی حقیقت میں); 'مقابلہ بازی' for 'competing' (consistent but a calque); 'کارآمد دوبارہ ترتیب' for 'useful reframing' (topic-02.mdx:58); 'مطالعہ کیس' for 'case study' (topic-02.mdx:227); 'پیداواری فریمنگ' for 'productive framing' (unit-teacher-notes.mdx:75); 'صاف اور کھرا علاج' for 'frank treatment' (topic-02.mdx:53); 'تاثر' for 'feedback' at topic-03.mdx:53; 'پس منظر کا فائدہ' for 'benefit of hindsight' at topic-02.mdx:241; embedded Latin 'conclusion' (topic-04.mdx:133), 'assignment' (topic-04.mdx:140, unit-teacher-notes.mdx:55), 'paraphrase' (topic-04.mdx:248), 'fail' (topic-01.mdx:35, topic-03.mdx:26) where the unit's own Urdu equivalents are used elsewhere. None blocks comprehension; all are one-phrase repairs.`,
    },
    {
      severity: 'advisory',
      resolved: false,
      message: `A-U4 (terminology, owner decision, carried unresolved from cycle 1; concepts/unit-03.md digest-unchanged). The 17 authored concept labels are confirmed fit for use (each matches the unit's own prose, figures and assessment), with two nuances the owner should weigh before promoting them into terminology.csv per concepts/unit-03.md:38-45: (a) 'moral agent' -> 'اخلاقی نمونہ' (moral exemplar) - the English distinguishes the Unit 2 ground (a teacher IS an ethical model) from the role (agent: recognises formation and chooses deliberately); the Urdu uses one term for both, flattening the passive-model/active-agent distinction, though the definitions carry the content. (b) 'change agent' -> 'تبدیلی کا داعی' (advocate of change) - an agent effects change, a داعی calls for it; the definition supplies the acting sense. Also CON:EFMP-302-3-5 'Within-classroom processes' -> 'جماعت کے اندر کے عوامل' uses the same word as CON:EFMP-302-3-6 'factors beyond the classroom', while fig-U3-2's own caption uses عملوں (processes) - consider 'جماعت کے اندر کے عمل'.`,
    },
    {
      severity: 'advisory',
      resolved: false,
      message: `A-U5 (carried English-side advisories, faithfully mirrored; re-confirmed this cycle). The G3 feat023-r2 advisories affect the Urdu reader identically because the Urdu mirrors the English faithfully at each site: A-02 (fig-U3-3's resilience overdone cell 'جو بتانا چاہیے تھا اسے سہتا ہے' diverges from the prose's stubbornness failure mode that RRQ 4 scores); A-03 (fig-U3-5's link labels give instances where the prose and RRQ 5 require purposes); A-04 (fig-U3-9's closing caption count 'بعد والے تینوں' fits no counting of the timeline); A-06 (MCQ option-length cue - the key is the longest option on items 5-8, visible in ${R}/v-composite-assessment.png); A-09 (Hurst/Reding and Brookfield point-of-use attributions beyond the bound excerpts, and U3-11's nominal grounding); A-10 (Keelson 'Ghana' from affiliation); A-11 (the Goe reuse-direction paraphrase, in the same sentence as the دہشت term); A-13 ('immediacy' -> 'فوری قربت' has no glossary entry); A-N3 (bare-URL link text on the Further reading lists, re-observed by this cycle's render-inspect). None is a translation defect; listed so the owner can consider them with the English.`,
    },
    {
      severity: 'advisory',
      resolved: false,
      message: `A-U6 (assessment surface nits, carried unresolved from cycle 1; no effect on answers or scoring, re-confirmed this cycle): MCQ 7 option الف carries a stray 'میں' ('الف) میں زیادہ وقت لیتا ہے', unit-assessment.mdx:95); RRQ 6 stem has the agreement slip 'کسی حقائق میں' (:138); MCQ 10's key annotation renders 'skipped transmission, not surpassed it' as 'اسے پار کر لیا ہے' (:195-196), comprehensible but looser than the English contrast.`,
    },
    {
      severity: 'advisory',
      resolved: false,
      message: `A-U7 (figures, no repair required, carried unresolved from cycle 1; the 20 Urdu SVGs are digest-identical to cycle 1's binding). fig-U3-4.ur.svg and fig-U3-4.ur.dark.svg have a marginal 1.2px bounding-box graze between the left-side annotation header 'طرزِ عمل' and its own 'پیغام: میرے پاس آنا محفوظ ہے' line; cycle 1's pixel-level analysis (logs-feat023-r1/fig-U3-4-ur-ink-gap.log) showed a clean ~2px ink-free gap at 1x, so the glyphs do not touch. This cycle's measure-figure-text and render-inspect section D both report the variant clean. Recorded for the figure author in case the annotation stack is revisited.`,
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: `${L}/validate-content.log` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${L}/check-depth-gate.log` },
    { name: 'check:figures', exit_code: 0, log_path: `${L}/check-figures.log` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${L}/check-no-em-dash.log` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${L}/check-no-answer-keys.log` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${L}/check-docs-sync.log` },
    { name: 'site-build', exit_code: 0, log_path: `${L}/site-build.log` },
    { name: 'render-review', exit_code: 0, log_path: `${L}/render-inspect.log` },
    { name: 'measure-figure-text', exit_code: 0, log_path: `${L}/measure-figure-text.log` },
    { name: 'verify-inputs', exit_code: 0, log_path: `${L}/verify-inputs.log` },
    { name: 'g3-dependency-check', exit_code: 0, log_path: `${L}/g3-dependency-check.log` },
    { name: 'targeted-shots', exit_code: 0, log_path: `${L}/targeted-shots.log` },
    { name: 'viewport-shots', exit_code: 0, log_path: `${L}/viewport-shots.log` },
    { name: 'assessment-shots', exit_code: 0, log_path: `${L}/assessment-shots.log` },
  ],
  evidence_manifest: evidence,
  summary: `Fresh G5 Urdu review of EFMP-302 Unit 3 under feature 023, cycle 2, binding current bytes at commit c138103 (the repair commit) against the prepared feat023-r2 manifest; all 140 bound inputs digest-verified through the contract library's recompute, and the repair commit confirmed to touch exactly the five stated Urdu files. All eight cycle-1 blocking findings are REPAIRED and verified with paired EN/UR locators in source bytes, in the served pages of the fresh shared two-locale build, and in rendered close-ups: the topic-02 summary's enthusiasm/competence order restored (B-01); 'merely implied' un-negated (B-02); معروضی for objective (B-03); 'a serving teacher' as زیرِ خدمت (B-04); 'nobody listens to you' un-flipped and now consistent with the assessment key (B-05); 'whether or not it is intended' keeping ارادہ (B-06); 'every lesson is improvised' as made-up-on-the-spot (B-07); and the goe2008 scope note's 'reasoned default rather than a sourced finding' restored with its noun and syntax (B-08). Nothing else regressed. All ten criteria pass on the current bytes: the epistemic-honesty passages (Furlich scope, 93% caution, practitioner's heuristic, Keelson scope) survive exactly; all 10 Urdu MCQs solved blind match both keys with option order preserved; RRQ schemes total 50/50 with the humour exception intact; the ERQ 10-cap survives; key_terms are bank-accepted; the 17 concept labels remain fit; the de-escalation flowchart is geometrically mirrored and the timeline stations reversed for RTL; narrow and A4 print views are clean; measure-figure-text and all six deterministic gates exit 0. Cycle 1 failed the terminology and register criteria on items its own findings array classified as advisory; this cycle re-verifies those items on unchanged bytes and records them as advisory-severity consistent with the Unit 2 feat023 bar - the ten-instance typo cluster (A-U1), terminology drift including اعلیٰ دہشت for high-stakes and the mentor referent (A-U2), and the grammar/calque items (A-U3) all remain flagged with precise locations and repairs. Disposition ESCALATE, not pass: the G3 dependency (U-01) is unresolved - no signed G3 evidence exists under ADR-0019 - so per the contract an unresolved uncertain finding forbids a pass even with all criteria satisfied; the English comparison base was verified byte-identical to the advisory G3 cycle-2 pass by digest, and the owner decision per G-2026-65 (accept the advisory chain or commission fresh G3 passes) is the remaining gate. Advisory only: no signing, no registry or tracker change, translation_status stays draft.`,
};

writeFileSync('specs/content/efmp-302/reviews/unit-03/G5/agent-g5-efmp302-u3-feat023-r2.json', JSON.stringify(report, null, 2) + '\n');
console.log('report written:', 'specs/content/efmp-302/reviews/unit-03/G5/agent-g5-efmp302-u3-feat023-r2.json');
console.log('criteria:', report.criteria.map((c) => c.id + ':' + c.status).join(', '));
console.log('disposition:', report.disposition);
console.log('findings:', report.findings.length, '(8 blocking resolved, 1 uncertain unresolved, 7 advisory unresolved)');
console.log('commands:', report.commands.length, 'evidence files:', Object.keys(evidence).length);
