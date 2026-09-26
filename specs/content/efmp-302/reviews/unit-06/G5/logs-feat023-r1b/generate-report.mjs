// Generate the G5 feat023-r1 report for EFMP-302 Unit 6 (Urdu mirror review).
// Run: node specs/content/efmp-302/reviews/unit-06/G5/logs-feat023-r1b/generate-report.mjs
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { inputManifest } from '../../../../../../../scripts/lib/review-evidence.mjs';

const root = join(import.meta.dirname, '../../../../../../../');
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

// ---- evidence manifest: every file under the two r1b evidence directories ----
const evidenceDirs = [
  'specs/content/efmp-302/reviews/unit-06/G5/logs-feat023-r1b',
  'specs/content/efmp-302/reviews/unit-06/G5/renders-feat023-r1b',
];
const evidenceManifest = {};
const walk = (dir) => {
  for (const name of readdirSync(dir).sort()) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else evidenceManifest[relative(root, p)] = sha(p);
  }
};
evidenceDirs.forEach(walk);

const L = 'specs/content/efmp-302/reviews/unit-06/G5/logs-feat023-r1b';
const UR = 'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-06';

const report = {
  schema_version: 1,
  course_code: 'EFMP-302',
  unit_no: 6,
  stage: 'G5',
  disposition: 'revise',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'commit:1da5f6b',
  reviewer_run_id: 'agent-g5-efmp302-u6-feat023-r1',
  model: 'LongCat-2.0',
  started_at: '2026-09-25T09:21:06Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: '02797f90adddd8f4bc50c6e80c6e68d8f6f0219d68d297aabcc8b5443bace5a8',
  g3_report: 'specs/content/efmp-302/reviews/unit-06/G3/agent-g3-efmp302-u6-feat023-r1.json',
  input_manifest: inputManifest(root, 'EFMP-302', 6, 'G5'),
  summary: 'Fresh G5 on the Unit 6 Urdu mirror (translated 2026-09-24, feat023 cycle 1) against the bound English inputs at commit 1da5f6b, whose bytes are unchanged since the feat023-r1 advisory G3 (99 shared manifest paths, zero digest differences). Input binding verified with the library: 125 paths, zero mismatches, skill digest match, no dirty inputs. Complete bilingual comparison of all seven file pairs: learner-facing prose is semantically faithful (principles, stages, routes, plan, disclosures, quantities, dates, sequences all preserved); the 10/10/5 assessment bank is equivalent (Urdu MCQ key derived independently and identical to the English key, option order preserved, rubrics and the 10-cap floor intact, ERQ 5 still integrative); terminology is bank-conformant with one authored label flagged for the owner; all eight .ur.svg figures are correctly RTL-mirrored and geometrically clean over all 16 variants; rendered inspection at 1280x900 / 360x780 / A4 print found zero accessibility or print defects. One blocking Urdu defect: fig-U6-7\'s two Urdu variants omit three of the four English margin notes (19 vs 22 text elements, one note box vs two, an orphaned leader line pointing at nothing) while the SVG desc and the MDX alt text promise the missing "decided now" note - the exact rule RRQ 9 and ERQ 4/5 assess. A cluster of smaller translation defects: a garbled "rather than in marking" sentence, "serving teachers" rendered as "فرضی استاد" (imaginary teachers), a lost comparative ("harder than"), a dropped "at least three", typos in learner-facing text including the متبعل misspelling inside MCQ 3\'s stem, untranslated "quote"/"فریمنگ", and grammar slips. The G3 dependency remains undischargeable by signed evidence (G-2026-65 pattern): the best available G3 is the feat023 advisory escalate whose sources failure (S1/S2, G-2026-64) is an English-side owner decision, not an Urdu defect, and is recorded in the dependency finding. Disposition revise: the Urdu mirror needs one figure repair and a set of small prose repairs; this report is advisory only.',
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        'Guide section 6 (Scheme-and-Course-guides/extracted-text/1st 2026.txt:898-922) maps one-to-one onto the four Urdu topics, verified by reading each Urdu file against coverage/unit-06.md:14-26: 6.1 -> topic-01 (مسلسل پیشہ ورانہ ترقی کا مطلب / مسلسل پیشہ ورانہ تعلم اور ترقی کی ضرورت / پیشہ ورانہ ترقی کے اصول), 6.2 -> topic-02 (تربیت سے پہلے کا مرحلہ / نئے استاد کا مرحلہ / تجربہ کار استاد کا مرحلہ), 6.3 -> topic-03 (کانفرنسیں / ورکشاپس / آن لائن پیشہ ورانہ ترقی کے پلیٹ فارم / پیشہ ورانہ تعلمی برادری / غور و فکر اور خود جائزے کے اوزار), 6.4 -> topic-04 (ذاتی پیشہ ورانہ ترقی کے منصوبے میں کیا ہوتا ہے / ایک ایسا منصوبہ جو اسکولی سال بچائے / اختتام); all 13 sub-topics U6-01..U6-13 are real ### sections in the Urdu mirror',
        'SLO structure preserved: clo_refs identical in all seven Urdu files (SLO:EFMP-302-6-1 on index/topic-01/topic-02, SLO:EFMP-302-6-2 on index/topic-03/topic-04, both on unit-assessment/unit-teacher-notes); both SLOs are taught and assessed in Urdu (6-1 by the 6.1/6.2 items, 6-2 by the 6.3/6.4 items and ERQ 5)',
        'The unit\'s authority spine survives translation intact: the six development principles each WITH what they rule out (topic-01:115-134), the three career stages with the inverse capacity/pressure arrangement (topic-02:107-110), the five routes with cost/reach/can/cannot (topic-03), and the six-block plan with four destroyers and three legitimate review outcomes (topic-04) - all verified against the English passage by passage',
        'English-side authority repairs (A2/D-2026-0004 practicum brief, D-2026-0002 one-page plan) are unchanged since the G3 and the Urdu mirror teaches the one-page, six-block design the course brief now describes (topic-04:42-44)',
      ],
    },
    {
      id: 'sources',
      status: 'pass',
      evidence: [
        'Every citation in the Urdu mirror retains its English supporting meaning and disclosures: Guskey (2000) multi-level evaluation argument (' + UR + '/topic-01.mdx:61-65); Villegas-Reimers (2003) IIEP convergence claim (:112-115); Kwakman (2003) cited only for its question with the point-of-use disclosure "یہ یونیت اس کام کا حوالہ صرف اس سوال کے لیے دیتا ہے... اس کی کوئی دریافت یہاں دعویٰ نہیں کی گئی" (:96-98) plus the further-reading annotation; Hennessy (2022) with the scope disclosure "وہ دائرہ نوٹ کیجیے..." and the mixed-outcomes emphasis carried (topic-03.mdx:87-95); Day (1999) (topic-02.mdx:55-56); Brookfield (2017) (topic-03.mdx:133-136)',
        'Both no-external-source passages keep their point-of-use disclosures in Urdu: Pakistani provision (topic-01.mdx:100-105, "دونوں یہاں کورس گائیڈ اور عام مشاہدے سے بیان کی گئی ہیں، کسی مطالعے سے نہیں...") and the doctor/teacher comparison (topic-02.mdx:70-73, "یہ موازنہ وسیع مشاہدے کے طور پر پیش کیا گیا ہے...") - MCQ 5 keys on the second and the Urdu MCQ 5 carries the same load in stem and options',
        'ENGLISH-SIDE CAVEAT, recorded rather than failed per the review mandate: the G3 feat023-r1 sources failure (S1 coverage-mapping, S2 uncorroborated Guskey/Villegas-Reimers attributions, both owner-gated as G-2026-64; S3 no bound source text) attaches to the English bytes this mirror translates. The Urdu adds no attribution, removes no disclosure and introduces no new source claim; see the dependency finding',
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'Every required outcome is taught in Urdu: all 13 coverage rows U6-01..U6-13 map to real ### sections in the Urdu mirror (verified by reading all seven Urdu files); the four-topic partition matches the content-spec topic list',
        'Every required outcome is assessed in Urdu with the same blueprint: 10 MCQ / 10 RRQ / 5 ERQ, at least 2 MCQ and 2 RRQ per topic (MCQ 1-4/RRQ 1-3/ERQ 1 on 6.1; MCQ 5-6/RRQ 4-6/ERQ 2 on 6.2; MCQ 7-8/RRQ 7-8/ERQ 3 on 6.3; MCQ 9-10/RRQ 9-10/ERQ 4 on 6.4) plus the integrative ERQ 5 - identical distribution to the English bank (' + UR + '/unit-assessment.mdx)',
        'est_reading_minutes unchanged in the Urdu frontmatter (7+23+20+25+22+25+11 = 133, inside the 120-170 budget); check:depth-gate exit 0 (' + L + '/check-depth-gate.log)',
        'The G3\'s U6-07 observation (Conferences is the only sub-topic with no dedicated bank item) carries unchanged into the Urdu mirror - English-side, not a translation defect',
      ],
    },
    {
      id: 'assessment',
      status: 'pass',
      evidence: [
        'All 10 Urdu MCQs answered from the Urdu items alone before comparing with the English key (' + L + '/independent-urdu-mcq-derivation.md, with the disclosed caveat that the English key was a bound input already read for the bilingual comparison): derived 1الف 2د 3ج 4ب 5ج 6الف 7د 8ب 9ج 10الف, i.e. 1a 2d 3c 4b 5c 6a 7d 8b 9c 10a - identical to the English key (unit-assessment.mdx:187-199); option order preserved (الف/ب/ج/د = a/b/c/d), every option\'s meaning matches its English counterpart, no reordering, no leak, distractors plausible, no Urdu wording that reveals a keyed answer',
        'RRQ equivalence: stems, mark totals (8/6/8/6/5/5/6/5/10/4) and mark-scheme splits match (' + UR + '/unit-assessment.mdx:196-236); RRQ 7\'s pairing-mark neutralisation survives ("جوڑنے والا نمبر انہی جوابوں پر دیجیے جو موضوع-03 کے تین اصولوں سے ملتے ہوں"); RRQ 9\'s six-prevents list and the September-vs-March explanation match; RRQ 4 carries the same transition ambiguity as its English stem (English-side advisory, unchanged by translation)',
        'ERQ equivalence: five items x four criteria x three bands with the 10-cap floor preserved ("جو جواب تجزیہ، جائزہ یا تخلیق کے معیار پر مناسب تک نہ پہنچے وہ مجموعی طور پر 10 سے اوپر نہیں جا سکتا"); ERQ 5 remains the integrative closing task drawing on at least three earlier units and naming the plan\'s weakest point; Bloom labels match item-for-item (یاد رکھنا/سمجھنا/اطلاق/تجزیہ/جائزہ/تخلیق) so cognitive demand is unchanged',
        'The متبعل misspelling sits inside MCQ 3\'s quoted stem (see the register finding); it does not change the keyed answer or the item\'s meaning',
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        'Rendered inspection of the actual Urdu pages (' + L + '/render-review.log): the shared two-locale build (verified current for Unit 6 Urdu, build-freshness.log) served at http://127.0.0.1:4628 via docusaurus serve, inspected in bundled Chromium 149.0.7827.0 at desktop 1280x900, narrow 360x780 and A4 794px print; render-inspect exit 0, zero defects',
        'Headings: no skipped levels on any of the seven Urdu pages; alt text present on all 16 figure imgs (8 visible .ur.svg + 8 display:none .ur.dark.svg), matching the MDX carriers\' Urdu alt text; no vague link text; 5 advisory bare-URL further-reading links (same class as the English pages)',
        'NARROW 360px measured on the scroller itself: docHorizontalOverflow=0px on every page; the four topic mini-rubric tables and the five ERQ rubric tables FIT at client=328; the eight figures are FIGURE.figure scrollers (client 328, scroll 880-936), swipe-reachable with keyboard attributes',
        'A4 PRINT: clippedElems=0 on all seven pages; every visible figure fits (max right edge 777 of 794); the answers and marking sections print ("جوابات اور نمبر دہی کی رہنمائی", "MCQ جوابی کلید", "RRQ نمونہ جوابات اور نمبر دہی کے خاکے")',
        'Figure-internal geometry over all 16 Urdu variants (' + L + '/figure-geometry-overlap-ur.log): zero text-on-text superposition, zero wordmark collisions, zero rect escapes, zero viewBox escapes, zero near-misses; measure-figure-text exit 0 (widest 924.3 of 936 on fig-U6-5.ur). The EN dashed-box rect escapes (G3 advisory X2) do NOT reproduce in the Urdu variant',
        'Carried platform advisories (English-side G3 X1/X3) apply identically here: identical accessible names on the rubric-table and figure scrollers at 360px, and ~7.5px effective table-figure body text at desktop. Session limitation disclosed: the image tool returned visual content for one full-page render only; the rest of the inspection is numeric/DOM/pixel measurement with all PNG/PDF artifacts saved under renders-feat023-r1b/ (render-review.log)',
      ],
    },
    {
      id: 'completeness',
      status: 'fail',
      evidence: [
        'BLOCKING OMISSION in fig-U6-7\'s Urdu variants (static/img/figures/efmp-302/unit-06/fig-U6-7.ur.svg and fig-U6-7.ur.dark.svg): the English figure carries four margin notes - "One, not five." / "Five goals is a list of regrets by March." / "Decided now, not in March." / "Evidence chosen later always flatters." - while the Urdu carries only "ایک، پانچ نہیں۔" (One, not five.). EN has 22 <text> elements and two note boxes; UR has 19 texts and one box (coordinate-level dumps ' + L + '/en-figure-text-dump.txt vs ur-figure-text-dump.txt; confirmed by render-inspect text counts). The second leader line (path M346 348 L286 348) points at no box: a visible dangling arrow',
        'The omission contradicts the figure\'s own accessibility description and the MDX alt text, both of which promise the missing note: "...یہ نوٹ کے ساتھ کہ ایک ہدف، پانچ نہیں، اور شہادت ابھی طے کیجیے" (the SVG <desc> and ' + UR + '/topic-04.mdx:24)',
        'The missing notes carry assessed content: block 5\'s evidence-decided-now rule is exactly what RRQ 9 and ERQ 4/5 assess; the topic-04 prose teaches it ("ابھی طے کیجیے، ستمبر میں، مارچ میں نہیں") so the figure alone is incomplete relative to its English counterpart',
        'All seven other figures are complete: EN and UR text-element counts match exactly (fig-U6-1 41, fig-U6-2 17, fig-U6-3 22, fig-U6-4 28, fig-U6-5 53, fig-U6-6 17, fig-U6-8 23) and every label has a faithful Urdu counterpart, verified label by label against the dumps',
        'Smaller omissions are recorded as advisory findings: "substantive use of at least three earlier units" loses "at least three" in the Urdu teacher notes (:101-102); everything else - headings, activities, checklists, tables, the 25-item bank, further reading - is complete across the seven file pairs, verified by full bilingual comparison',
      ],
    },
    {
      id: 'semantics',
      status: 'fail',
      evidence: [
        'Full bilingual comparison of all seven file pairs: the learner-facing prose (index, topics, assessment) is semantically faithful - negation, modal force, quantities (eleven certificates, thirty-four pupils, 400-450/450-500 words, 25/30/35 minutes, Weeks 14-16), dates (September/March, 2026/2040, nineteen years), comparisons, causal claims, pronoun references and instructional sequences all preserved; the six principles\' rules-out, the inverse capacity/pressure arrangement, the five routes\' can/cannot columns and the plan\'s blocks/destroyers/review outcomes match the English meaning',
        'SEMANTIC DEFECT 1 (teacher notes): ' + UR + '/unit-teacher-notes.mdx:69 renders "Enforce it during the session rather than in marking" as "نششت کے دوران اور نشست میں نہیں، اسے لاگو کیجیے" - "marking" is lost and the sentence contrasts the session with itself; also the typo نششت',
        'SEMANTIC DEFECT 2 (teacher notes): :53 renders "so, quietly, do many serving teachers" as "اور، خاموشی سے، بہت سے فرضی استاد بھی" - فرضی means imaginary/fictitious, so the claim that real practising teachers hold the misconception reads as being about hypothetical teachers',
        'SEMANTIC DEFECT 3 (learner-facing): ' + UR + '/topic-04.mdx:76 renders "it is harder than it sounds" as "اتنا مشکل ہے جتنا سنتا ہے" ("as difficult as it sounds") - the comparative is lost',
        'Minor shifts: "not an unlucky one" -> "غیر معمولی نہیں" ("not unusual", topic-02.mdx:102); "the honest count rather than the polite one" -> "جھوٹی نہیں، دیانتدار گنتی" ("not the false one", teacher notes:112); both recoverable from context',
        'One ADDITION (advisory finding): topic-03.mdx:139-141 adds a parenthetical distinguishing this unit\'s غور و فکر بطور طریقہ کار from Unit 2\'s banked غور و فکر پر مبنی فیصلہ سازی - accurate against Unit 2\'s actual content (its decision loop is for ethical dilemmas; the reflective habit examines one\'s own decisions) and responsive to concepts/unit-06.md\'s translator note, but absent from the English source, including its synthesising claim "دونوں ایک ہی سوچ کے دو استعمال ہیں"',
      ],
    },
    {
      id: 'terminology',
      status: 'pass',
      evidence: [
        'Frozen bank conformance: both Unit 6 key_terms are bank-exact and used consistently - Continuous Professional Development = مسلسل پیشہ ورانہ ترقی and Professional Learning Community = پیشہ ورانہ تعلمی برادری (specs/content/terminology.csv:121-122); the UR key_terms block carries exactly these (' + UR + '/index.mdx:12-16)',
        'Other bank terms used correctly in the mirror: Teacher Burnout = پیشہ ورانہ تھکن (topic-02.mdx:78), Classroom Management = جماعتی انتظام (:81), Rubric = معیارِ جانچ (all four mini-rubrics and the ERQ rubric heading), Profession = پیشہ; Unit 2\'s banked Reflective Decision Making is referenced by its exact banked phrase غور و فکر پر مبنی فیصلہ سازی (topic-03.mdx:140) and kept distinct from this unit\'s غور و فکر بطور طریقہ کار',
        'Concept labels: 12 of the 13 authored labels in concepts/unit-06.md confirmed fit against the mirror\'s usage, including CON:6-12 غور و فکر بطور طریقہ کار, CON:6-13 سبق کا مشترکہ مطالعہ and CON:6-15\'s سالِ وسط جائزہ phrasing; CON:6-14\'s ذاتی is misspelled ذتی twice in the mirror (register finding)',
        'FLAG for the owner (not a bank conflict; the bank has no preservice entry): CON:EFMP-302-6-6 "The preservice stage" = "تربیت سے پہلے کا مرحلہ" is a misleading calque - the stage covers initial teacher education (before service/employment, not before training), and topic-02\'s own definition ("سند تک کی ابتدائی استاد کی تربیت") contradicts the label\'s literal reading; used consistently across index/topic-02/unit-assessment/fig-U6-3/fig-U6-4, so a rename (قبل از خدمت / خدمت سے پہلے کا مرحلہ) is an owner decision and a bank/label update, not a translator repair',
      ],
    },
    {
      id: 'register',
      status: 'fail',
      evidence: [
        'The register is academic-plain (درسی مگر عام فہم) and an entering B.Ed student can follow every section; the defects below are localised spelling, grammar and loanword problems, several in learner-facing or assessment text',
        'Typos in learner-facing files: متبعل for متبادل twice in unit-assessment.mdx (:26 unit summary and :67 INSIDE MCQ 3\'s quoted stem); ذتی for ذاتی (index.mdx:50, topic-04.mdx:158); نہیں ملاا (topic-02.mdx:36); پسائی for پسپائی (topic-04.mdx:96,150); ناکام نہیں ہے رہی for ناکام نہیں ہو رہی (topic-02.mdx:52); اوپر کا شکل for اوپر کی شکل five times (topic-01.mdx:44,111; topic-03.mdx:39,159; topic-04.mdx:44); ایسی نظریہ for ایسا نظریہ (fig-U6-4.ur.svg); نششت (unit-teacher-notes.mdx:69)',
        'Untranslated English words inside Urdu prose: "quote" (topic-02.mdx:71, topic-03.mdx:100 - حوالہ دینا is the natural verb) and "فریمنگ" for framing (topic-01.mdx:198,200; topic-04.mdx:82; unit-teacher-notes.mdx:86)',
        'Awkward calque: استادِ تربیت / اساتذہِ تربیت for trainee(s) reads as "teacher of training" (topic-02.mdx:47, unit-assessment.mdx MCQ 5 option ب, unit-teacher-notes.mdx passim); زیرِ تربیت استاد is the standard form',
        'No em dash anywhere in the Urdu tree (check:no-em-dash exit 0, ' + L + '/check-no-em-dash.log); technical terms are consistently glossed where a student needs it (wait time -> انتظار کا وقت (wait time), topic-02.mdx:29)',
      ],
    },
    {
      id: 'rtl',
      status: 'pass',
      evidence: [
        'Every built Urdu page declares lang="ur" dir="rtl" (verified in build/ur/semester-1/efmp-302/unit-06/*.html) and renders right-to-left - visually confirmed on the rendered desktop-topic-04 page (title right-aligned, figure blocks right, margin notes left) and by the DOM measurements',
        'All eight .ur.svg figures mirror their horizontal layout per style-guide v4.1, verified by coordinate-level EN/UR comparison (' + L + '/en-figure-text-dump.txt vs ur-figure-text-dump.txt): table row-label columns moved to the right edge (fig-U6-1 labels x=870, fig-U6-4 x=850, fig-U6-5 x=906) with column order reversed R-to-L; the career timeline runs right-to-left (تربیت سے پہلے x=750 -> نیا استاد x=450 -> تجربہ کار استاد x=150) with both transitions correctly placed between their stages; the lesson-study cycle numbers stations 1-5 right-to-left (fig-U6-6); the plan flowchart stations 1-6 right-to-left with continue/narrow/replace branches ordered R-to-L (fig-U6-8); fig-U6-7\'s blocks sit right with notes left; glyphs never mirrored (rewritten coordinates, text-anchor end)',
        'Nastaliq rendering confirmed: pixel probe of the rendered topic-04 page shows structured ink rows through the figure region (densities 0.03-0.35 in text bands) and ink in every 500px band of the page (' + L + '/pixel-probe.log); figure text measured in-render over all 16 variants with real glyph extents (no tofu)',
        'Bidi, numerals and embedded Latin are clean: Western digits (2026, 2040, 6.1, 400-450), the Latin gloss (wait time), acronym runs (MCQ, RRQ, ERQ, B.Ed) and URLs render without overflow or clipping at all three viewports (render-inspect.log sections A-C); zero document overflow at 360px; print unclipped',
        'The fig-U6-7 omission is a completeness defect, not an RTL defect: the layout that is present is correctly mirrored; the missing second note box would sit on the left at the orphaned leader line\'s y=348',
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: false,
      message: 'FIG-U6-7\'s URDU VARIANTS OMIT THREE OF THE FOUR ENGLISH MARGIN NOTES. static/img/figures/efmp-302/unit-06/fig-U6-7.ur.svg and fig-U6-7.ur.dark.svg carry 19 <text> elements where the English carries 22, and one note box where the English carries two. Present in Urdu: "ایک، پانچ نہیں۔" (One, not five.). Missing: (a) "Five goals is a list of regrets by March." (the second line of note 1), (b) "Decided now, not in March." (note 2\'s title), (c) "Evidence chosen later always flatters." (note 2\'s body). The second leader line (path M346 348 L286 348) is drawn pointing at the missing box, so the rendered figure shows a dangling arrow. Both the SVG\'s own <desc> and the MDX alt text promise the missing note ("...اور شہادت ابھی طے کیجیے"). This is the capstone topic\'s plan figure and the missing notes carry exactly the rule RRQ 9 and ERQ 4/5 assess (evidence decided in September, not March). Repair: add the second note box and its two lines plus the second line of note 1 to both Urdu variants, mirroring the English geometry per scripts/mirror-figure-rtl.mjs conventions, or descope the alt/desc to match what is drawn.',
    },
    {
      severity: 'uncertain',
      resolved: false,
      message: 'THE G3 DEPENDENCY IS NOT SATISFIED BY SIGNED EVIDENCE (G-2026-65 pattern). The G5 rubric requires accepted, signed G3 evidence for the exact English inputs. ADR-0019 blocks agent certification, so no signed G3 exists on this host. The best available G3 is the feat023-r1 advisory ESCALATE (specs/content/efmp-302/reviews/unit-06/G3/agent-g3-efmp302-u6-feat023-r1.json: six of seven criteria pass; sources fails on S1 and S2, both owner-gated as G-2026-64; S3 uncertain), and its bound English digests are identical to this review\'s English inputs - verified path by path (99 shared paths, zero digest differences; ' + L + '/verify-inputs.log) - so the English comparison base used here is the exact text that advisory G3 reviewed. The G3\'s sources blockers are English-side owner decisions (S1: coverage grounds seven rows in sources the prose never cites; S2: the Guskey and Villegas-Reimers attributions carry no point-of-use uncorroborated disclosure), not Urdu defects: the Urdu mirror faithfully carries the same attributions and every disclosure, and this review did not fail any Urdu criterion for them. The dependency nevertheless cannot be discharged by signed evidence by this reviewer; owner-side resolution (a qualified G3 acceptance, or an owner-accepted equivalent under the G-2026-64 decision) is required before any certified G5 pass. This finding alone forbids a pass disposition regardless of the content repairs.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'ADDED LEARNER-FACING PROSE NOT IN THE ENGLISH SOURCE. ' + UR + '/topic-03.mdx:139-141 appends a parenthetical distinguishing this unit\'s غور و فکر بطور طریقہ کار from Unit 2\'s banked غور و فکر پر مبنی فیصلہ سازی: "(یہ غور و فکر یونٹ 2 کے... سے الگ چیز ہے: وہ اخلاقی مخمصوں پر فیصلوں کا ماڈل تھی؛ یہ اپنی مشق کے جائزے کا طریقہ کار ہے۔ دونوں ایک ہی سوچ کے دو استعمال ہیں۔)". The content is accurate against Unit 2 (its decision loop is for ethical dilemmas; the reflective habit examines one\'s own decisions) and it implements exactly the disambiguation concepts/unit-06.md\'s translator note asks for, because both terms open with غور و فکر. But the English source has no such note anywhere in Unit 6, and the final clause ("both are two uses of the same thinking") is a synthesising claim the English never makes. Owner decision: accept as a deliberate Urdu-side disambiguation, or mirror the note into the English so the two locales teach the same relationship.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'GARBLED INSTRUCTIONAL SEQUENCE IN THE TEACHER NOTES. ' + UR + '/unit-teacher-notes.mdx:69 renders "Enforce it during the session rather than in marking" (docs/.../unit-teacher-notes.mdx:73-74) as "نششت کے دوران اور نشست میں نہیں، اسے لاگو کیجیے" - "during the session and not in the session, apply it". The word "marking" (نمبر دہی) is lost and the sentence contrasts the session with itself; نششت is also a typo for نشست. Repair: "نشست کے دوران ہی لاگو کیجیے، نمبر دہی میں نہیں" or equivalent.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'MISLEADING WORD CHOICE FOR "SERVING TEACHERS". ' + UR + '/unit-teacher-notes.mdx:53 renders "Trainees hold this and so, quietly, do many serving teachers" as "اساتذہِ تربیت یہ مانتے ہیں اور، خاموشی سے، بہت سے فرضی استاد بھی" - فرضی means imaginary/fictitious, so the sentence claims many hypothetical teachers hold the misconception. The English means real, practising teachers. Repair: "بہت سے فرض سرانجام دیتے استاد بھی" or "بہت سے ملازمت پیشہ اساتذہ بھی".',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'COMPARATIVE LOST IN LEARNER-FACING PROSE. ' + UR + '/topic-04.mdx:76 renders "and it is harder than it sounds" (docs/.../topic-04.mdx:77-78) as "اور یہ اتنا مشکل ہے جتنا سنتا ہے" - "as difficult as it sounds" - dropping the comparative the one-goal-rule paragraph rests on. Repair: "اور یہ سنتے سے کہیں زیادہ مشکل ہے".',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'QUANTITY DROPPED IN MARKING GUIDANCE. ' + UR + '/unit-teacher-notes.mdx:101-102 renders "substantive use of at least three earlier units" as "پہلے یونٹس کا مکمل استعمال" - "at least three" is lost and "substantive" becomes "مکمل" (complete). ERQ 5\'s own stem keeps the quantity correctly ("اس کورس کے کم از کم تین پہلے یونٹ پر"), so the teacher-facing marking note now under-specifies the item it marks. Repair: "کم از کم تین پہلے یونٹس کا مکمل استعمال".',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'MINOR SEMANTIC SHIFTS, MEANING RECOVERABLE. topic-02.mdx:102 renders "is the common case, not an unlucky one" as "عام معاملہ ہیں، غیر معمولی نہیں" (not unusual, rather than not unlucky); unit-teacher-notes.mdx:112 renders "Take the honest count rather than the polite one" as "جھوٹی نہیں، دیانتدار گنتی لیجیے" (false rather than polite). Neither changes the instructional point; repair opportunistically with the other prose fixes.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'SPELLING, GRAMMAR AND LOANWORD DEFECTS IN THE URDU MIRROR (register). Typos: متبعل for متبادل at unit-assessment.mdx:26 and :67 - the second INSIDE MCQ 3\'s quoted stem; ذتی for ذاتی at index.mdx:50 and topic-04.mdx:158 (misspelling concept label CON:6-14); نہیں ملاا (topic-02.mdx:36); پسائی for پسپائی (topic-04.mdx:96,150); نششت (unit-teacher-notes.mdx:69); ایسی نظریہ for ایسا نظریہ (fig-U6-4.ur.svg cell). Grammar: ناکام نہیں ہے رہی for ناکام نہیں ہو رہی (topic-02.mdx:52); اوپر کا شکل for اوپر کی شکل five times (topic-01.mdx:44,111; topic-03.mdx:39,159; topic-04.mdx:44). Untranslated English in Urdu prose: "quote" (topic-02.mdx:71; topic-03.mdx:100) and "فریمنگ" (topic-01.mdx:198,200; topic-04.mdx:82; unit-teacher-notes.mdx:86). Awkward calque: استادِ تربیت for trainee (topic-02.mdx:47; unit-assessment.mdx MCQ 5 option ب; teacher notes passim) - زیرِ تربیت استاد is standard. All are small, precisely located repairs; none changes meaning except where separately listed.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'CONCEPT LABEL FLAG: CON:EFMP-302-6-6 "The preservice stage" = "تربیت سے پہلے کا مرحلہ". The label is used consistently (index, topic-02 x6, unit-assessment x2, fig-U6-3, fig-U6-4) but is a misleading calque: preservice means before service/employment, while تربیت سے پہلے reads "before training", and the stage in fact IS the initial training (topic-02 defines it as "سند تک کی ابتدائی استاد کی تربیت"). One of the 13 authored labels concepts/unit-06.md routes to G5 for confirmation or flags: 12 confirmed, this one flagged. Per the rubric this is a term proposal for the owner (قبل از خدمت کا مرحلہ / خدمت سے پہلے کا مرحلہ), not a translator repair, and the bank has no preservice entry to conflict with.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'STALE GOVERNANCE PROSE IN A BOUND FILE. specs/content/efmp-302/figures/unit-06.md:13-14 still says the unit is "translation_status: draft with no Urdu mirror on disk, so the bilingual figure rule does not apply yet" - false since the 2026-09-24 translation: all eight .ur.svg variants exist, are wired into the Urdu topic files and follow the v4.1 mirroring rule (verified in this review). No learner-facing effect; update the preamble with the repairs (same class as the Unit 5 G5 finding).',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'CARRIED G3 (feat023-r1) ADVISORIES THAT APPLY EQUALLY TO THE URDU MIRROR, NO NEW URDU DEFECT: identical accessible names on the five ERQ rubric-table scrollers and the figure scrollers at 360px (platform components, G3 X1); table-archetype figures render ~640px against 880-936-unit viewboxes on desktop, ~7.5px effective body text (G3 X3); RRQ 4\'s "the new-teacher transition" stem ambiguity is carried identically in the Urdu stem ("نئے استاد کی تبدیلی", unit-assessment.mdx:130-131); the reviewer-register disclosure sentences (G3 P5) are mirrored at topic-01.mdx:96-98 and topic-03.mdx:88-89 in the same student-visible register; U6-07 (Conferences) remains the only sub-topic without a dedicated bank item. EN-side governance, recorded for the owner\'s content-improvement loop.',
    },
    {
      severity: 'advisory',
      resolved: true,
      message: 'RESOLVED - INPUT BINDING VERIFIED. The prepared manifest (specs/content/efmp-302/reviews/unit-06/G5/feat023-r1/manifest.json) was verified with inputManifest() from scripts/lib/review-evidence.mjs rather than by hand: 125 bound paths recomputed at HEAD 1da5f6b, zero missing, zero digest mismatches, zero extra paths; skillDigest(root,"G5") matches; dirtyInputs empty (' + L + '/verify-inputs.log). The English comparison base is unchanged since the feat023-r1 G3: 99 paths shared between the two manifests, zero digest differences.',
    },
    {
      severity: 'advisory',
      resolved: true,
      message: 'RESOLVED - INDEPENDENCE AND DERIVATION DISCIPLINE. This session did not author or translate any reviewed byte. The 10 Urdu MCQs were derived from the Urdu items alone and written down (' + L + '/independent-urdu-mcq-derivation.md) before the correspondence with the English key was checked. Disclosed caveat: the English unit-assessment.mdx, including its answer key, is a bound input that had already been read for the bilingual comparison, so the derivation cannot claim blindness to the key sequence; it does verify that each Urdu item as written keys to the same letter for Urdu-internal reasons. The interrupted prior attempt\'s partial logs (logs-feat023-r1/) were not reused; all r1b evidence was generated fresh by this session.',
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: L + '/validate-content.log' },
    { name: 'check:depth-gate', exit_code: 0, log_path: L + '/check-depth-gate.log' },
    { name: 'check:figures', exit_code: 0, log_path: L + '/check-figures.log' },
    { name: 'check:no-em-dash', exit_code: 0, log_path: L + '/check-no-em-dash.log' },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: L + '/check-no-answer-keys.log' },
    { name: 'check:docs-sync', exit_code: 0, log_path: L + '/check-docs-sync.log' },
    { name: 'site-build', exit_code: 0, log_path: L + '/build-freshness.log' },
    { name: 'render-review', exit_code: 0, log_path: L + '/render-review.log' },
    { name: 'render-inspect', exit_code: 0, log_path: L + '/render-inspect.log' },
    { name: 'measure-figure-text', exit_code: 0, log_path: L + '/measure-figure-text.log' },
    { name: 'figure-geometry-overlap-ur', exit_code: 0, log_path: L + '/figure-geometry-overlap-ur.log' },
    { name: 'verify-inputs', exit_code: 0, log_path: L + '/verify-inputs.log' },
  ],
  command_notes: [
    'All six contract-required content gates exit 0 over the current tree (English and Urdu together).',
    'site-build is NOT a rebuild: the shared two-locale build at build/ (built 2026-09-24 19:11 at commit 219960c; only review-evidence commits since) was verified current for Unit 6 Urdu by 35 verbatim prose probes taken programmatically from the seven Urdu sources - 33 exact matches, the remaining 2 verified present by fragment search (JSX text-node separators split two words: probe-missing.log). No other build was running (checked); the review served the build on port 4628 and stopped its server afterwards.',
    'render-review is this host\'s composite browser/print inspection record: rendered-input identity, viewport/print setup, how inspection ran, findings and the disclosed session limitation (the image tool returned visual content for one full-page render only; the rest is numeric/DOM/pixel measurement with all artifacts saved). render-inspect is the instrument run itself (exit 0, zero defects).',
    'figure-geometry-overlap-ur is the G3 feat023-r1 instrument (validated there by a negative control on the b8f8ffe bytes, which flagged 25 superpositions) pointed at the 16 Urdu variants: zero text-on-text, zero wordmark, zero rect-escape, zero viewBox-escape, zero near-miss.',
    'The EN/UR figure text dumps (en-figure-text-dump.txt, ur-figure-text-dump.txt) are the byte-level label comparison that found the fig-U6-7 omission; the render instruments report that file "clean" because they measure geometry, not EN-UR parity.',
    'pixel-probe.log is the PIL ink-density probe of the rendered Urdu topic-04 page (real Nastaliq ink in the figure and prose bands). build-freshness-check.py / probe-missing.py / probe-context.py / crop-renders.py / extract-ur-figure-text.py are the evidence-generating scripts, saved beside their logs.',
  ],
  evidence_manifest: evidenceManifest,
};

const out = 'specs/content/efmp-302/reviews/unit-06/G5/agent-g5-efmp302-u6-feat023-r1.json';
writeFileSync(join(root, out), JSON.stringify(report, null, 2) + '\n');
console.log('wrote', out, 'with', Object.keys(evidenceManifest).length, 'evidence files');
