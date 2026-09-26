// Generate the G5 feat023-r2 report JSON for EFMP-302 Unit 6.
// Content assembled by the reviewer; this script binds the input manifest from the
// prepared manifest.json and computes the evidence_manifest hashes of the exact
// saved bytes.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../../../../../../../', import.meta.url).pathname;
const sha = (p) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex');

const manifest = JSON.parse(readFileSync(new URL('../feat023-r2/manifest.json', import.meta.url), 'utf8'));

const LOGS = 'specs/content/efmp-302/reviews/unit-06/G5/logs-feat023-r2';
const RENDERS = 'specs/content/efmp-302/reviews/unit-06/G5/renders-feat023-r2';

const evidence = {};
const files = (dir) => readdirSync(join(root, dir)).filter((f) => statSync(join(root, dir, f)).isFile()).sort();
for (const f of files(LOGS)) evidence[`${LOGS}/${f}`] = sha(`${LOGS}/${f}`);
for (const f of files(RENDERS)) evidence[`${RENDERS}/${f}`] = sha(`${RENDERS}/${f}`);
const cropsDir = `${RENDERS}/crops`;
for (const f of files(cropsDir)) evidence[`${cropsDir}/${f}`] = sha(`${cropsDir}/${f}`);

const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'Guide section 6 (Scheme-and-Course-guides/extracted-text/1st 2026.txt:898-922) maps one-to-one onto the four Urdu topics, verified by reading each Urdu file against specs/content/efmp-302/coverage/unit-06.md:14-26: 6.1 -> topic-01 (مسلسل پیشہ ورانہ ترقی کا مطلب / مسلسل پیشہ ورانہ تعلم اور ترقی کی ضرورت / پیشہ ورانہ ترقی کے اصول), 6.2 -> topic-02 (تربیت سے پہلے کا مرحلہ / نئے استاد کا مرحلہ / تجربہ کار استاد کا مرحلہ), 6.3 -> topic-03 (کانفرنسیں / ورکشاپس / آن لائن پیشہ ورانہ ترقی کے پلیٹ فارم / پیشہ ورانہ تعلمی برادری / غور و فکر اور خود جائزے کے اوزار), 6.4 -> topic-04 (ذاتی پیشہ ورانہ ترقی کے منصوبے میں کیا ہوتا ہے / ایک ایسا منصوبہ جو اسکولی سال بچائے); all 13 sub-topics U6-01..U6-13 are real ### sections in the Urdu mirror',
      'SLO structure preserved: clo_refs identical in all seven Urdu files (SLO:EFMP-302-6-1 on index/topic-01/topic-02, SLO:EFMP-302-6-2 on index/topic-03/topic-04, both on unit-assessment/unit-teacher-notes); both SLOs are taught and assessed in Urdu (6-1 by the 6.1/6.2 items, 6-2 by the 6.3/6.4 items and ERQ 5)',
      "The unit's authority spine survives translation intact, re-verified passage by passage this cycle: the six development principles each WITH what they rule out (topic-01:115-134), the three career stages with the inverse capacity/pressure arrangement (topic-02:107-110), the five routes with cost/reach/can/cannot (topic-03:42-127), and the six-block plan with four destroyers and three legitimate review outcomes (topic-04:74-103)",
      'The English comparison base is byte-identical to what both the feat023-r1 advisory G3 and the cycle-1 G5 reviewed: 99 shared paths with the G3 manifest, zero digest differences; vs the r1 G5 manifest, 125 shared paths with exactly the 7 repaired Urdu-side paths changed and every English path unchanged (logs-feat023-r2/verify-inputs.log)',
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'Every citation in the Urdu mirror retains its English supporting meaning and disclosures: Guskey (2000) multi-level evaluation argument (i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-06/topic-01.mdx:61-65); Villegas-Reimers (2003) IIEP convergence claim (:112-113); Kwakman (2003) cited only for its question with the point-of-use disclosure "یہ یونیت اس کام کا حوالہ صرف اس سوال کے لیے دیتا ہے... اس کی کوئی دریافت یہاں دعویٰ نہیں کی گئی" (:96-98) plus the further-reading annotation; Hennessy (2022) with the scope disclosure "وہ دائرہ نوٹ کیجیے..." and the mixed-outcomes emphasis carried (topic-03.mdx:87-95); Day (1999) (topic-02.mdx:55-56); Brookfield (2017) (topic-03.mdx:133-136)',
      'Both no-external-source passages keep their point-of-use disclosures in Urdu: Pakistani provision (topic-01.mdx:100-105) and the doctor/teacher comparison (topic-02.mdx:70-71) - MCQ 5 keys on the second and the Urdu MCQ 5 carries the same load in stem and options',
      "ENGLISH-SIDE CAVEAT, recorded rather than failed per the review mandate: the G3 feat023-r1 sources failure (S1 coverage-mapping, S2 uncorroborated Guskey/Villegas-Reimers attributions, both owner-gated as G-2026-64; S3 no bound source text) attaches to the English bytes this mirror translates. The Urdu adds no attribution, removes no disclosure and introduces no new source claim; see the dependency finding",
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'Every required outcome is taught in Urdu: all 13 coverage rows U6-01..U6-13 map to real ### sections in the Urdu mirror (verified by reading all seven Urdu files); the four-topic partition matches the content-spec topic list (specs/content/efmp-302/content-spec.md:817-839)',
      'Every required outcome is assessed in Urdu with the same blueprint: 10 MCQ / 10 RRQ / 5 ERQ, at least 2 MCQ and 2 RRQ per topic (MCQ 1-4/RRQ 1-3/ERQ 1 on 6.1; MCQ 5-6/RRQ 4-6/ERQ 2 on 6.2; MCQ 7-8/RRQ 7-8/ERQ 3 on 6.3; MCQ 9-10/RRQ 9-10/ERQ 4 on 6.4) plus the integrative ERQ 5 - identical distribution to the English bank (i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-06/unit-assessment.mdx)',
      'est_reading_minutes unchanged in the Urdu frontmatter (7+23+20+25+22+25+11 = 133, inside the 120-170 budget); check:depth-gate exit 0 (logs-feat023-r2/check-depth-gate.log)',
      "The G3's U6-07 observation (Conferences is the only sub-topic with no dedicated bank item) carries unchanged into the Urdu mirror - English-side, not a translation defect",
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      'All 10 Urdu MCQs answered from the Urdu items alone before comparing with the English key (logs-feat023-r2/independent-urdu-mcq-derivation.md, with the disclosed caveat that both keys are bound inputs already read for the bilingual comparison): derived 1الف 2د 3ج 4ب 5ج 6الف 7د 8ب 9ج 10الف, i.e. 1a 2d 3c 4b 5c 6a 7d 8b 9c 10a - identical to the English key (docs/semester-1/efmp-302/unit-06/unit-assessment.mdx:187-199); option order preserved (الف/ب/ج/د = a/b/c/d), every option meaning-matched, no reordering, no leak, distractors plausible',
      "The متبادل repair inside MCQ 3's quoted stem verified at unit-assessment.mdx:67 (was متبعل in cycle 1); the stem now quotes the topic's own correctly-spelled sentence and the keyed answer (ج) is unchanged",
      'RRQ equivalence: stems, mark totals (8/6/8/6/5/5/6/5/10/4) and mark-scheme splits match (unit-assessment.mdx:196-236); RRQ 7\'s pairing-mark neutralisation survives ("جوڑنے والا نمبر انہی جوابوں پر دیجیے جو موضوع-03 کے تین اصولوں سے ملتے ہوں"); RRQ 9\'s six-blocks list and the September-vs-March explanation match; RRQ 4 carries the same transition ambiguity as its English stem (English-side advisory, unchanged by translation)',
      'ERQ equivalence: five items x four criteria x three bands with the 10-cap floor preserved ("جو جواب تجزیہ، جائزہ یا تخلیق کے معیار پر مناسب تک نہ پہنچے وہ مجموعی طور پر 10 سے اوپر نہیں جا سکتا"); ERQ 5 remains the integrative closing task drawing on at least three earlier units and naming the plan\'s weakest point; Bloom labels match item-for-item (یاد رکھنا/سمجھنا/اطلاق/تجزیہ/جائزہ/تخلیق) so cognitive demand is unchanged',
    ],
  },
  {
    id: 'accessibility',
    status: 'pass',
    evidence: [
      'Rendered inspection of the actual Urdu pages (logs-feat023-r2/render-inspect.log, exit 0, zero defects): the shared two-locale build (verified current for Unit 6 Urdu by the repaired-byte probes, build-freshness.log) served at http://127.0.0.1:4629, inspected in bundled Chromium 149.0.7827.0 at desktop 1280x900, narrow 360x780 and A4 794px print; 7 desktop PNGs, 7 narrow PNGs and 7 print PDFs saved under renders-feat023-r2/',
      'Headings: no skipped levels on any of the seven Urdu pages; alt text present on all 16 figure imgs (8 visible .ur.svg + 8 display:none .ur.dark.svg) matching the MDX carriers; no vague link text; 5 advisory bare-URL further-reading links (same class as the English pages)',
      'NARROW 360px measured on the scroller itself: docHorizontalOverflow=0px on every page; the four topic mini-rubric tables and the five ERQ rubric tables FIT at client=328; the eight figures are FIGURE.figure scrollers (client 328, scroll 880-936), swipe-reachable with keyboard attributes',
      'A4 PRINT: clippedElems=0 on all seven pages; every visible figure fits (max right edge 777 of 794); the answers and marking sections print ("جوابات اور نمبر دہی کی رہنمائی", "MCQ جوابی کلید", "RRQ نمونہ جوابات اور نمبر دہی کے خاکے")',
      'Figure-internal geometry over all 16 Urdu variants (logs-feat023-r2/figure-geometry-overlap-ur.log): zero text-on-text superposition, zero wordmark collision, zero viewBox escape; the repaired fig-U6-7 is clean (22 texts in-render, note boxes and leader lines verified by DOM and pixel probes, pixel-probe-fig-u6-7.log + pixel-probe-fig-u6-7-ink.log); measure-figure-text exit 0 over all 16 variants (widest 924.3 of 936)',
      "fig-U6-2's dashed rules-out box overflow is inherited from the English originals (4 escaping EN lines, right by 15.4-25.1px - logs-feat023-r2/figure-geometry-overlap-en.log) and reproduces in the Urdu mirror (3 lines, left by 5.5-37.0px); unchanged since cycle 1, no overlap/clipping, cosmetic - advisory finding; the cycle-1 claim that the EN overflows do not reproduce in Urdu was an instrument artifact (see the finding)",
      'Session limitation disclosed: the image tool returned visual content for one full-page render only (renders-feat023-r2/desktop-topic-04.png, inspected at page level); the rest of the inspection is numeric/DOM/pixel measurement with all PNG/PDF artifacts saved for human audit (render-review.log)',
    ],
  },
  {
    id: 'completeness',
    status: 'pass',
    evidence: [
      'THE CYCLE-1 BLOCKING OMISSION IS REPAIRED AND VERIFIED FOUR WAYS. fig-U6-7\'s Urdu variants (static/img/figures/efmp-302/unit-06/fig-U6-7.ur.svg and .ur.dark.svg) now draw all four English margin notes: "ایک، پانچ نہیں۔" (One, not five.), "پانچ ہدف مارچ تک افسوسوں کی فہرست ہوتے ہیں۔" (Five goals is a list of regrets by March. - note 1 line 2, added), "ابھی طے کیجیے، مارچ میں نہیں۔" (Decided now, not in March. - note 2 title, added) and "بعد میں چنی گئی شہادت ہمیشہ داد دیتی ہے۔" (Evidence chosen later always flatters. - note 2 body, added). Counts now 22/22 text elements vs English (was 19) and two note boxes (was one); both leader lines terminate at a real box (logs-feat023-r2/figure-text-parity.log)',
      'The repair renders in the served build: both built SVG assets carry the four notes and the topic-04 page wires them (logs-feat023-r2/build-freshness.log sections A-C); in-render DOM measurement confirms note box 1 contains exactly the first two lines and note box 2 exactly the second two, with zero overlaps and zero escapes (pixel-probe-fig-u6-7.log); pixel ink 0.088-0.107 in both note-box regions of both variants vs 0.000 in the empty control (pixel-probe-fig-u6-7-ink.log)',
      "The SVG <desc> and the MDX alt text promises are now kept: both still say \"...یہ نوٹ کے ساتھ کہ ایک ہدف، پانچ نہیں، اور شہادت ابھی طے کیجیے\" and the figure now draws it",
      'All seven other figures remain at EN/UR text parity (fig-U6-1 41, fig-U6-2 17, fig-U6-3 22, fig-U6-4 28, fig-U6-5 53, fig-U6-6 17, fig-U6-8 23 texts, byte-identical to the cycle-1-verified state); every label has a faithful Urdu counterpart',
      'Smaller omissions remain advisory: "substantive use of at least three earlier units" still loses "at least three" in the Urdu teacher notes (:101-102); everything else - headings, activities, checklists, tables, the 25-item bank, further reading - is complete across the seven file pairs, verified by full bilingual comparison',
    ],
  },
  {
    id: 'semantics',
    status: 'pass',
    evidence: [
      'Full bilingual comparison of all seven file pairs on the current bytes: the learner-facing prose (index, topics, assessment) is semantically faithful - negation, modal force, quantities (eleven certificates, thirty-four pupils, 400-450/450-500 words, 25/30/35 minutes, Weeks 14-16), dates (September/March, 2026/2040, nineteen years), comparisons, causal claims, pronoun references and instructional sequences all preserved; the six principles\' rules-out, the inverse capacity/pressure arrangement, the five routes\' can/cannot columns and the plan\'s blocks/destroyers/review outcomes match the English meaning',
      'THE CYCLE-1 SEMANTIC DEFECTS OF CONSEQUENCE ARE REPAIRED: teacher notes :69 now reads "نشست کے دوران لاگو کیجیے، نمبر دہی میں نہیں" - "Enforce it during the session rather than in marking" restored, the نششت typo gone, the self-contradiction eliminated; teacher notes :53 now reads "بہت سے زیرِ خدمت استاد بھی" - "serving teachers" (was فرضی استاد, imaginary teachers, which inverted the claim about real practising teachers)',
      'Remaining shifts, all advisory and recoverable from context: "it is harder than it sounds" rendered "اتنا مشکل ہے جتنا سنتا ہے" (as difficult as it sounds - the comparative is lost, topic-04.mdx:76); "the common case, not an unlucky one" -> "عام معاملہ ہیں، غیر معمولی نہیں" (not unusual, topic-02.mdx:102); "the honest count rather than the polite one" -> "جھوٹی نہیں، دیانتدار گنتی لیجیے" (not the false one, teacher notes:112)',
      'One ADDITION (advisory finding): topic-03.mdx:139-141 adds a parenthetical distinguishing this unit\'s غور و فکر بطور طریقہ کار from Unit 2\'s banked غور و فکر پر مبنی فیصلہ سازی - accurate against Unit 2\'s actual content and responsive to concepts/unit-06.md\'s translator note, but absent from the English source, including its synthesising claim "دونوں ایک ہی سوچ کے دو استعمال ہیں"',
    ],
  },
  {
    id: 'terminology',
    status: 'pass',
    evidence: [
      'Frozen bank conformance: both Unit 6 key_terms are bank-exact and used consistently - Continuous Professional Development = مسلسل پیشہ ورانہ ترقی and Professional Learning Community = پیشہ ورانہ تعلمی برادری (specs/content/terminology.csv:121-122); the UR key_terms block carries exactly these (i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-06/index.mdx:12-16)',
      'Other bank terms used correctly in the mirror: Teacher Burnout = پیشہ ورانہ تھکن (topic-02.mdx:78), Classroom Management = جماعتی انتظام (:81), Rubric = معیارِ جانچ (all four mini-rubrics and the ERQ rubric heading), Profession = پیشہ; Unit 2\'s banked Reflective Decision Making is referenced by its exact banked phrase غور و فکر پر مبنی فیصلہ سازی (topic-03.mdx:140) and kept distinct from this unit\'s غور و فکر بطور طریقہ کار',
      'Concept labels: 12 of the 13 authored labels in concepts/unit-06.md confirmed fit against the mirror\'s usage; CON:6-14\'s ذاتی پیشہ ورانہ ترقی کا منصوبہ is now spelled correctly in the mirror (the ذتی misspelling repaired at index.mdx:50 and topic-04.mdx:158)',
      'FLAG for the owner (not a bank conflict): CON:EFMP-302-6-6 "The preservice stage" = "تربیت سے پہلے کا مرحلہ" remains a misleading calque - the stage covers initial teacher education (before service, not before training), and topic-02\'s own definition ("سند تک کی ابتدائی استاد کی تربیت") contradicts the label\'s literal reading; used consistently, so a rename (قبل از خدمت / خدمت سے پہلے کا مرحلہ) is an owner decision and a bank/label update, not a translator repair',
    ],
  },
  {
    id: 'register',
    status: 'pass',
    evidence: [
      'The register is academic-plain (درسی مگر عام فہم) and an entering B.Ed student can follow every section; the defects below are localised and small',
      "THE LEARNER-FACING AND ASSESSMENT TYPOS ARE REPAIRED: متبعل -> متبادل x2 (unit-assessment.mdx:26 unit summary and :67 inside MCQ 3's quoted stem), ذتی -> ذاتی x2 (index.mdx:50, topic-04.mdx:158), نہیں ملاا -> نہیں ملا (topic-02.mdx:36), نششت -> نشست with the sentence rebuilt (unit-teacher-notes.mdx:69), فرضی استاد -> زیرِ خدمت استاد (:53) - all verified in the current bytes and in the served build (build-freshness.log sections A-B)",
      'Remaining register items, all advisory: پسائی for پسپائی (topic-04.mdx:96,150); اوپر کا شکل for اوپر کی شکل (topic-01.mdx:44,111; topic-03.mdx:39,159; topic-04.mdx:44); ناکام نہیں ہے رہی for ناکام نہیں ہو رہی (topic-02.mdx:52); ایسی نظریہ for ایسا نظریہ (fig-U6-4.ur.svg cell); untranslated English in Urdu prose: "quote" (topic-02.mdx:71, topic-03.mdx:100) and "فریمنگ" for framing (topic-01.mdx:198,200; topic-04.mdx:82; unit-teacher-notes.mdx:86); the استادِ تربیت / اساتذہِ تربیت calque for trainee(s) (topic-02.mdx:47, unit-assessment.mdx MCQ 5 option ب, teacher notes passim) - زیرِ تربیت استاد is standard',
      'No em dash anywhere in the Urdu tree (check:no-em-dash exit 0, logs-feat023-r2/check-no-em-dash.log); technical terms are consistently glossed where a student needs it (wait time -> انتظار کا وقت (wait time), topic-02.mdx:29)',
    ],
  },
  {
    id: 'rtl',
    status: 'pass',
    evidence: [
      'Every built Urdu page declares lang="ur" dir="rtl" (verified in build/ur/semester-1/efmp-302/unit-06/*.html) and renders right-to-left - visually confirmed on the one full-page render the image tool returned (renders-feat023-r2/desktop-topic-04.png: title right-aligned, prose blocks right, figure blocks right, margin notes left) and by the DOM measurements',
      'All eight .ur.svg figures mirror their horizontal layout per style-guide v4.1, re-verified this cycle by coordinate-level reading: the career timeline runs right-to-left (تربیت سے پہلے x=750 -> نیا استاد x=450 -> تجربہ کار استاد x=150) with both transitions correctly placed between their stages (fig-U6-3.ur.svg); the lesson-study cycle numbers stations 1-5 right-to-left (fig-U6-6); the plan flowchart stations 1-6 right-to-left with continue/narrow/replace branches ordered R-to-L (fig-U6-8); table row-label columns at the right edge; glyphs never mirrored (rewritten coordinates, text-anchor end)',
      'The REPAIRED fig-U6-7 follows the same mirroring conventions: note boxes on the LEFT at x=24 with text-anchor=end at x=262, leader lines running right-to-left (M346 -> L286) terminating at the boxes, matching the English geometry mirrored; the new elements introduce no bidi or ordering anomaly (figure-geometry-overlap-ur.log: clean)',
      'Nastaliq rendering confirmed by pixel probes: glyph-ink ratios 0.088-0.107 in both repaired note-box regions of both variants (comparable to the known-good plan-block region 0.060-0.066), 0.000 in the empty control (pixel-probe-fig-u6-7-ink.log); real glyph extents measured in-render over all 16 variants with no tofu (measure-figure-text.log)',
      'Bidi, numerals and embedded Latin are clean: Western digits (2026, 2040, 6.1, 400-450), the Latin gloss (wait time), acronym runs (MCQ, RRQ, ERQ, B.Ed) and URLs render without overflow or clipping at all three viewports (render-inspect.log sections A-C); zero document overflow at 360px; print unclipped',
    ],
  },
];

const findings = [
  {
    severity: 'blocking',
    resolved: true,
    message:
      "RESOLVED - THE CYCLE-1 BLOCKING FIGURE DEFECT IS REPAIRED AND VERIFIED. fig-U6-7's Urdu variants (static/img/figures/efmp-302/unit-06/fig-U6-7.ur.svg and .ur.dark.svg) omitted three of the four English margin notes in cycle 1 (19 vs 22 texts, one note box vs two, a dangling second leader line). Repair commit e99c1a2 added the second line of note box 1 (\"پانچ ہدف مارچ تک افسوسوں کی فہرست ہوتے ہیں۔\") and the entire second note box (\"ابھی طے کیجیے، مارچ میں نہیں۔\" + \"بعد میں چنی گئی شہادت ہمیشہ داد دیتی ہے۔\") to both variants. This review verified the repair at four levels: (1) bytes - 22/22 text elements vs the English figure, two note boxes, both leader lines now terminate at a box (logs-feat023-r2/figure-text-parity.log); (2) served build - both built SVG assets carry all four notes and the topic-04 page wires them (build-freshness.log section C); (3) in-render DOM - note box 1 contains exactly the first two lines, note box 2 exactly the second two, zero overlaps, zero rect/viewBox escapes (figure-geometry-overlap-ur.log, pixel-probe-fig-u6-7.log); (4) pixels - glyph ink 0.088-0.107 in both note-box regions of both variants vs 0.000 in the empty control (pixel-probe-fig-u6-7-ink.log). The SVG desc and MDX alt promises are kept, and the notes carry exactly the rule RRQ 9 and ERQ 4/5 assess.",
  },
  {
    severity: 'advisory',
    resolved: true,
    message:
      "RESOLVED - ALL SIX CYCLE-1 WRONG-WORD REPAIRS VERIFY, WITH NO REGRESSIONS. The only bound-input changes since the r1 report are the 7 Urdu-side paths of commit e99c1a2 (5 MDX files + the 2 fig-U6-7 Urdu variants); every English path and every other Urdu path is byte-identical to the r1-verified state (verify-inputs.log). Verified in the current bytes and in the served build: متبعل -> متبادل x2 (unit-assessment.mdx:26 and :67, the latter inside MCQ 3's quoted stem - the item still keys to ج); ذتی -> ذاتی x2 (index.mdx:50, topic-04.mdx:158 - concept label CON:6-14 now spelled correctly); نہیں ملاا -> نہیں ملا (topic-02.mdx:36); the teacher-notes session/marking sentence rebuilt as \"نشست کے دوران لاگو کیجیے، نمبر دہی میں نہیں\" with the نششت typo gone (unit-teacher-notes.mdx:69); فرضی استاد -> زیرِ خدمت استاد (:53), restoring the claim that real serving teachers hold the misconception. All pre-repair defect strings are absent from the built pages (build-freshness.log section B).",
  },
  {
    severity: 'uncertain',
    resolved: false,
    message:
      "THE G3 DEPENDENCY IS NOT SATISFIED BY SIGNED EVIDENCE (G-2026-65 pattern). The G5 rubric requires accepted, signed G3 evidence for the exact English inputs. ADR-0019 blocks agent certification, so no signed G3 exists on this host. The best available G3 is the feat023-r1 advisory ESCALATE (specs/content/efmp-302/reviews/unit-06/G3/agent-g3-efmp302-u6-feat023-r1.json: six of seven criteria pass; sources fails on S1 and S2, both owner-gated as G-2026-64; S3 uncertain). This cycle re-verified that its bound English digests are identical to this review's English inputs (99 shared paths, zero digest differences; verify-inputs.log) and that the English bytes are also unchanged since the cycle-1 G5, so the comparison base used here is the exact text both prior reviews read. The G3's sources blockers are English-side owner decisions (S1: coverage grounds rows in sources the prose never cites; S2: the Guskey and Villegas-Reimers attributions carry no point-of-use uncorroborated disclosure), not Urdu defects: the Urdu mirror faithfully carries the same attributions and every disclosure, and no Urdu criterion was failed for them. The dependency nevertheless cannot be discharged by signed evidence by this reviewer; owner-side resolution (a qualified G3 acceptance, or an owner-accepted equivalent under the G-2026-64 decision) is required before any certified G5 pass. This finding alone forbids a pass disposition regardless of the content repairs.",
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      "ADDED LEARNER-FACING PROSE NOT IN THE ENGLISH SOURCE (preserved from cycle 1). i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-06/topic-03.mdx:139-141 appends a parenthetical distinguishing this unit's غور و فکر بطور طریقہ کار from Unit 2's banked غور و فکر پر مبنی فیصلہ سازی: \"(یہ غور و فکر یونٹ 2 کے... سے الگ چیز ہے: وہ اخلاقی مخمصوں پر فیصلوں کا ماڈل تھی؛ یہ اپنی مشق کے جائزے کا طریقہ کار ہے۔ دونوں ایک ہی سوچ کے دو استعمال ہیں۔)\". The content is accurate against Unit 2 and implements exactly the disambiguation concepts/unit-06.md's translator note asks for, because both terms open with غور و فکر. But the English source has no such note anywhere in Unit 6, and the final clause (\"both are two uses of the same thinking\") is a synthesising claim the English never makes. Owner decision: accept as a deliberate Urdu-side disambiguation, or mirror the note into the English so the two locales teach the same relationship.",
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      "COMPARATIVE LOST IN LEARNER-FACING PROSE (preserved from cycle 1, not in the repair set). i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-06/topic-04.mdx:76 renders \"and it is harder than it sounds\" (docs/.../topic-04.mdx:77-78) as \"اور یہ اتنا مشکل ہے جتنا سنتا ہے\" - \"as difficult as it sounds\" - dropping the comparative the one-goal-rule paragraph rests on. Repair: \"اور یہ سنتے سے کہیں زیادہ مشکل ہے\".",
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      "QUANTITY DROPPED IN MARKING GUIDANCE (preserved from cycle 1, not in the repair set). i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-06/unit-teacher-notes.mdx:101-102 renders \"substantive use of at least three earlier units\" as \"پہلے یونٹس کا مکمل استعمال\" - \"at least three\" is lost and \"substantive\" becomes \"مکمل\" (complete). ERQ 5's own stem keeps the quantity correctly (\"اس کورس کے کم از کم تین پہلے یونٹ پر\"), so the teacher-facing marking note under-specifies the item it marks. Repair: \"کم از کم تین پہلے یونٹس کا مکمل استعمال\".",
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      "MINOR SEMANTIC SHIFTS, MEANING RECOVERABLE (preserved from cycle 1). topic-02.mdx:102 renders \"is the common case, not an unlucky one\" as \"عام معاملہ ہیں، غیر معمولی نہیں\" (not unusual, rather than not unlucky); unit-teacher-notes.mdx:112 renders \"Take the honest count rather than the polite one\" as \"جھوٹی نہیں، دیانتدار گنتی لیجیے\" (false rather than polite). Neither changes the instructional point; repair opportunistically with the other prose fixes.",
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      "SPELLING, GRAMMAR AND LOANWORD DEFECTS REMAIN IN THE URDU MIRROR (register; the cycle-1 items of this class that sat in learner-facing or assessment text were repaired, these were not in the repair set). Typos: پسائی for پسپائی (topic-04.mdx:96,150); اوپر کا شکل for اوپر کی شکل five times (topic-01.mdx:44,111; topic-03.mdx:39,159; topic-04.mdx:44); ناکام نہیں ہے رہی for ناکام نہیں ہو رہی (topic-02.mdx:52); ایسی نظریہ for ایسا نظریہ (fig-U6-4.ur.svg cell). Untranslated English in Urdu prose: \"quote\" (topic-02.mdx:71; topic-03.mdx:100 - حوالہ دینا is the natural verb) and \"فریمنگ\" for framing (topic-01.mdx:198,200; topic-04.mdx:82; unit-teacher-notes.mdx:86). Awkward calque: استادِ تربیت / اساتذہِ تربیت for trainee(s) (topic-02.mdx:47; unit-assessment.mdx MCQ 5 option ب; teacher notes passim) - زیرِ تربیت استاد is standard. All are small, precisely located repairs; none changes meaning.",
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      "CONCEPT LABEL FLAG (preserved from cycle 1): CON:EFMP-302-6-6 \"The preservice stage\" = \"تربیت سے پہلے کا مرحلہ\". The label is used consistently (index, topic-02 x6, unit-assessment x2, fig-U6-3, fig-U6-4) but is a misleading calque: preservice means before service/employment, while تربیت سے پہلے reads \"before training\", and the stage in fact IS the initial training (topic-02 defines it as \"سند تک کی ابتدائی استاد کی تربیت\"). One of the 13 authored labels concepts/unit-06.md routes to G5 for confirmation or flags: 12 confirmed, this one flagged. Per the rubric this is a term proposal for the owner (قبل از خدمت کا مرحلہ / خدمت سے پہلے کا مرحلہ), not a translator repair, and the bank has no preservice entry to conflict with.",
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      "STALE GOVERNANCE PROSE IN A BOUND FILE (preserved from cycle 1). specs/content/efmp-302/figures/unit-06.md preamble still says the unit is \"translation_status: draft with no Urdu mirror on disk, so the bilingual figure rule does not apply yet\" - false since the 2026-09-24 translation: all eight .ur.svg variants exist, are wired into the Urdu topic files and follow the v4.1 mirroring rule (verified in this review). No learner-facing effect; update the preamble in the owner's content-improvement loop (same class as the Unit 5 G5 finding).",
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      "NEW THIS CYCLE, AN INSTRUMENT CORRECTION RATHER THAN A CONTENT CHANGE: fig-U6-2's dashed \"rules out\" boxes are too narrow for their longest lines in BOTH locales, and the cycle-1 report's claim that the English overflows \"do NOT reproduce in the Urdu variant\" was an artifact of the cycle-1 instrument. That instrument only checked texts whose bbox LEFT edge starts inside the rect, which structurally skips right-anchored RTL text escaping to the left. This cycle's centre-based enclosing-rect check (same five measurements otherwise) finds 3 escaping lines in the Urdu variants (left by 37.0px \"رد کرتی ہے: ان شاگردوں سے دور تربیت جنہیں آپ پڑھاتے ہیں\", 17.2px and 5.5px, in both .ur and .ur.dark) and the same defect class in the English originals (right by 25.1/23.5/20.0/15.4px - logs-feat023-r2/figure-geometry-overlap-en.log), i.e. the G3 feat023-r1 advisory X2 class inherited by the mirror. fig-U6-2's bytes are unchanged since cycle 1 (digest match), so this is not a regression from the repair. No text-on-text overlap, no clipping, no viewBox escape; the spilled text remains fully legible over the figure background. Cosmetic; fix belongs in the owner's figure-improvement loop (widen the ro boxes or shorten the longest rules-out lines) and should be applied to both locales together.",
  },
  {
    severity: 'advisory',
    resolved: false,
    message:
      "CARRIED G3 (feat023-r1) ADVISORIES THAT APPLY EQUALLY TO THE URDU MIRROR, NO NEW URDU DEFECT (preserved from cycle 1): identical accessible names on the five ERQ rubric-table scrollers and the figure scrollers at 360px (platform components, G3 X1); table-archetype figures render ~640px against 880-936-unit viewboxes on desktop, ~7.5px effective body text (G3 X3); RRQ 4's \"the new-teacher transition\" stem ambiguity is carried identically in the Urdu stem (\"نئے استاد کی تبدیلی\", unit-assessment.mdx:130-131); the reviewer-register disclosure sentences (G3 P5) are mirrored at topic-01.mdx:96-98 and topic-03.mdx:88-89 in the same student-visible register; U6-07 (Conferences) remains the only sub-topic without a dedicated bank item. EN-side governance, recorded for the owner's content-improvement loop.",
  },
  {
    severity: 'advisory',
    resolved: true,
    message:
      "RESOLVED - INPUT BINDING VERIFIED. The prepared manifest (specs/content/efmp-302/reviews/unit-06/G5/feat023-r2/manifest.json) was verified with inputManifest() from scripts/lib/review-evidence.mjs rather than by hand: 125 bound paths recomputed at HEAD 7c177b15, zero missing, zero digest mismatches, zero extra paths; skillDigest(root,\"G5\") matches; dirtyInputs empty (logs-feat023-r2/verify-inputs.log). The English comparison base is unchanged since both the feat023-r1 G3 (99 shared paths, zero differences) and the cycle-1 G5 (the 7 changed paths since r1 are exactly the repair commit's Urdu-side footprint; no English path changed).",
  },
  {
    severity: 'advisory',
    resolved: true,
    message:
      "RESOLVED - INDEPENDENCE AND DERIVATION DISCIPLINE. This session did not author or translate any reviewed byte; it is a fresh reviewer session that first read the skill, the contract, the prepared manifest and the cycle-1 report, then the bound inputs. The 10 Urdu MCQs were derived from the Urdu items alone and written down (logs-feat023-r2/independent-urdu-mcq-derivation.md) before the correspondence with the English key was checked. Disclosed caveat: the Urdu assessment file prints its own key further down the same bound file and the English file (including its key) is a bound input, so the derivation cannot claim blindness to key material; it does verify that each Urdu item as written keys to the same letter for Urdu-internal reasons. All r2 evidence was generated fresh by this session; the r1/r1b artifacts were read as the prior record but not reused as this cycle's evidence.",
  },
];

const commands = [
  { name: 'validate:content', exit_code: 0, log_path: `${LOGS}/validate-content.log` },
  { name: 'check:depth-gate', exit_code: 0, log_path: `${LOGS}/check-depth-gate.log` },
  { name: 'check:figures', exit_code: 0, log_path: `${LOGS}/check-figures.log` },
  { name: 'check:no-em-dash', exit_code: 0, log_path: `${LOGS}/check-no-em-dash.log` },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: `${LOGS}/check-no-answer-keys.log` },
  { name: 'check:docs-sync', exit_code: 0, log_path: `${LOGS}/check-docs-sync.log` },
  { name: 'site-build', exit_code: 0, log_path: `${LOGS}/build-freshness.log` },
  { name: 'render-review', exit_code: 0, log_path: `${LOGS}/render-review.log` },
  { name: 'render-inspect', exit_code: 0, log_path: `${LOGS}/render-inspect.log` },
  { name: 'measure-figure-text', exit_code: 0, log_path: `${LOGS}/measure-figure-text.log` },
  { name: 'figure-text-parity', exit_code: 0, log_path: `${LOGS}/figure-text-parity.log` },
  { name: 'figure-geometry-overlap-ur', exit_code: 1, log_path: `${LOGS}/figure-geometry-overlap-ur.log` },
  { name: 'figure-geometry-overlap-en', exit_code: 0, log_path: `${LOGS}/figure-geometry-overlap-en.log` },
  { name: 'verify-inputs', exit_code: 0, log_path: `${LOGS}/verify-inputs.log` },
];

const report = {
  schema_version: 1,
  course_code: 'EFMP-302',
  unit_no: 6,
  stage: 'G5',
  disposition: 'escalate',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'commit:87ed3f39',
  reviewer_run_id: 'agent-g5-efmp302-u6-feat023-r2',
  model: 'LongCat-2.0',
  started_at: '2026-09-25T13:05:00Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: manifest.skill_digest,
  supersedes: 'specs/content/efmp-302/reviews/unit-06/G5/agent-g5-efmp302-u6-feat023-r1.json',
  g3_report: 'specs/content/efmp-302/reviews/unit-06/G3/agent-g3-efmp302-u6-feat023-r1.json',
  input_manifest: manifest.input_manifest,
  summary:
    "Fresh G5 cycle 2 on the Unit 6 Urdu mirror against the bound English inputs at commit 87ed3f39 (repair commit e99c1a2 plus evidence/tracker/PHR commits that change no Unit 6 bound input; the English bytes are identical to what both the feat023-r1 advisory G3 and the cycle-1 G5 reviewed). Input binding verified with the library: 125 paths, zero mismatches, skill digest match, no dirty inputs; the 7 paths changed since cycle 1 are exactly the repair's Urdu-side footprint. THE CYCLE-1 BLOCKING FINDING IS REPAIRED AND VERIFIED FOUR WAYS: fig-U6-7's Urdu variants now draw all four English margin notes (22/22 texts, two note boxes, both leader lines terminating at boxes), the served build carries them, in-render DOM measurement confirms the note boxes' contents with zero overlaps/escapes, and pixel probes show real Nastaliq ink in both note regions (0.088-0.107 vs 0.000 control). All six wrong-word repairs verify (متبادل x2 including inside MCQ 3's stem, ذتی x2, نہیں ملا, the rebuilt session-vs-marking sentence, زیرِ خدمت استاد) with no regressions. Re-verification of the load-bearing checks: the 10 Urdu MCQs re-derived independently match the English key exactly (1a 2d 3c 4b 5c 6a 7d 8b 9c 10a, option order preserved); both key_terms remain bank-exact; 12 of 13 concept labels confirmed with CON:6-6 still flagged for the owner; render/rtl/print inspection clean at 1280x900, 360x780 and A4 (exit 0, zero defects); all six content gates exit 0. One instrument correction this cycle: fig-U6-2's dashed rules-out boxes overflow in BOTH locales (3 Urdu lines left by 5.5-37px, 4 English lines right by 15-25px) - inherited from the English design (G3 advisory X2 class), unchanged since cycle 1, cosmetic; the cycle-1 claim that it did not reproduce in Urdu was an instrument artifact. The G3 dependency remains undischargeable by signed evidence (G-2026-65 pattern): the best available G3 is the feat023 advisory escalate whose sources failure (S1/S2) is owner-gated as G-2026-64 and is an English-side decision, not an Urdu defect. Disposition escalate: every Urdu criterion passes on the current bytes and the cycle-1 blocking repair verifies, but the dependency cannot be discharged by this reviewer, the remaining register/semantic items are small advisories best batched into the owner's loop rather than a third repair cycle (the two-cycle budget is exhausted), and two items (the added topic-03 parenthetical, the CON:6-6 label) are owner decisions. This report is advisory only; translation_status stays draft.",
  criteria,
  findings,
  commands,
  command_notes: [
    'All six contract-required content gates exit 0 over the current tree (English and Urdu together).',
    'site-build is NOT a rebuild: the shared two-locale build at build/ (built 2026-09-25 07:34-07:35 at commit 87ed3f39, after repair commit e99c1a2) was verified current for Unit 6 Urdu by probes for every repaired sentence, every pre-repair defect string (all absent), and all four fig-U6-7 margin notes in both built SVG assets; 33/35 general prose probes exact, the remaining 2 present behind NUL bytes the Docusaurus build emits inside JSX text nodes (the HTML parser ignores U+0000 character tokens, so the words render joined; NUL-aware fragment search confirms). No rebuild was run.',
    "render-review is this host's composite browser/print inspection record (render-review.log): rendered-input identity, viewport/print setup, how inspection ran, findings and the disclosed session limitation (the image tool returned visual content for one full-page render only; the rest is numeric/DOM/pixel measurement with all artifacts saved). render-inspect is the instrument run itself (exit 0, zero defects).",
    "render-inspect DEVIATION, recorded: the mandated --port form spawns `npm run serve` detached, which dies immediately in this sandboxed session (the instrument then fails with kill ESRCH after its 180s deadline; first attempt preserved in the session record). The wrapper logs-feat023-r2/run-render-review.mjs started an equivalent static server in-process on the SAME port 4629 rooted at the SAME build/ directory and ran the SAME instrument via --base. Same bytes, same port, same instrument; only the server process differs.",
    'figure-geometry-overlap-ur is the cycle-1 instrument (five measurements: text-on-text, wordmark, rect-escape, viewBox-escape, near-miss) adapted to load the committed SVGs via page.setContent (the measure-figure-text.mjs method) so no server is needed, and with the enclosing-rect check made centre-based so right-anchored RTL text escaping left is no longer skipped (the cycle-1 startsInside gate missed exactly that class). Its exit code is 1 because it counts the 3 inherited fig-U6-2 box overflows x 2 variants as defects; there are zero text-on-text, wordmark or viewBox defects, and the repaired fig-U6-7 is clean. figure-geometry-overlap-en points the same measurement at the English fig-U6-2 originals and finds the same defect class there (4 escaping lines), establishing inheritance.',
    'figure-text-parity is the byte-level EN/UR text-element comparison over all eight figures (41/17/22/28/53/17/22/23 texts, all matching; UR light/dark pairs text-identical) - the check that found the cycle-1 omission and now confirms its repair.',
    'pixel-probe-fig-u6-7 (+ -ink) are the element-screenshot and ink-density probes of the repaired figure: DOM note-box contents and glyph-ink ratios in both note-box regions of both variants against an empty control.',
    'measure-figure-text exit 0 over all 16 Urdu variants (widest text 924.3 of 936 on fig-U6-5.ur).',
  ],
  evidence_manifest: evidence,
};

const out = 'specs/content/efmp-302/reviews/unit-06/G5/agent-g5-efmp302-u6-feat023-r2.json';
writeFileSync(join(root, out), JSON.stringify(report, null, 2) + '\n');
console.log(`wrote ${out}`);
console.log(`criteria: ${report.criteria.length}, findings: ${report.findings.length}, commands: ${report.commands.length}, evidence files: ${Object.keys(evidence).length}`);
