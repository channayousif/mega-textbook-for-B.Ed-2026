// G5 feat023-r2 report generator. Assembles agent-g5-efmp302-u2-feat023-r2.json from
// the prepared r2 manifest (input_manifest + skill_digest), the reviewer's recorded
// criteria/findings/commands, and SHA-256 hashes of the exact saved evidence bytes.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..', '..', '..', '..', '..', '..', '..');
const sha256 = (p) => createHash('sha256').update(readFileSync(join(repo, p))).digest('hex');

const manifest = JSON.parse(readFileSync(join(repo, 'specs/content/efmp-302/reviews/unit-02/G5/feat023-r2/manifest.json'), 'utf8'));

const LOGS = 'specs/content/efmp-302/reviews/unit-02/G5/logs-feat023-r2';
const RENDERS = 'specs/content/efmp-302/reviews/unit-02/G5/renders-feat023-r2';

const evidenceFiles = [
  `${LOGS}/validate-content.log`,
  `${LOGS}/check-depth-gate.log`,
  `${LOGS}/check-figures.log`,
  `${LOGS}/check-no-em-dash.log`,
  `${LOGS}/check-no-answer-keys.log`,
  `${LOGS}/check-docs-sync.log`,
  `${LOGS}/site-build.log`,
  `${LOGS}/render-review.log`,
  `${LOGS}/render-inspect-stdout.log`,
  `${LOGS}/measure-figure-text.log`,
  `${LOGS}/en-fig-u2-5-repair-check.log`,
  `${LOGS}/verify-manifest.log`,
  `${LOGS}/manifest-comparison-g3r2-vs-g5r2.log`,
  `${LOGS}/repair-diff-86ce1dd.log`,
  `${LOGS}/ur-element-inspect-stdout.log`,
  `${RENDERS}/verify-manifest.mjs`,
  `${RENDERS}/ur-element-inspect.mjs`,
  `${RENDERS}/ur-element-inspect.log`,
  `${RENDERS}/render-inspect.log`,
  `${RENDERS}/render-inspect.json`,
  `${RENDERS}/gen-report.mjs`,
];
for (const f of readdirSync(join(repo, RENDERS))) {
  if (/\.(png|pdf)$/.test(f)) evidenceFiles.push(`${RENDERS}/${f}`);
}
const evidenceManifest = {};
for (const p of evidenceFiles.sort()) evidenceManifest[p] = sha256(p);

const report = {
  schema_version: 1,
  course_code: 'EFMP-302',
  unit_no: 2,
  stage: 'G5',
  disposition: 'escalate',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'commit:86ce1dd',
  reviewer_run_id: 'agent-g5-efmp302-u2-feat023-r2',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T20:14:00Z',
  completed_at: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
  skill_digest: manifest.skill_digest,
  supersedes: 'specs/content/efmp-302/reviews/unit-02/G5/agent-g5-efmp302-u2-feat023-r1.json',
  g3_report: 'specs/content/efmp-302/reviews/unit-02/G3/agent-g3-efmp302-u2-feat023-r2.json',
  input_manifest: manifest.input_manifest,
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        'All 127 paths in the prepared r2 manifest verify against current bytes with the contract digest normalization (logs-feat023-r2/verify-manifest.log); the only input changed since the cycle-1 G5 binding is i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-02/unit-assessment.mdx, exactly the B-01 repair target',
        'Scheme-and-Course-guides/extracted-text/1st 2026.txt guide Unit 2 outline (2.1 meaning and significance of professional ethics; 2.2 conduct domains plus local and international codes; 2.3 Rest four-component model, four-step framework, reflective decision making, classroom dilemmas) is bound and unchanged; the guide-division disclosure is carried identically in the Urdu index (i18n/ur/.../unit-02/index.mdx:77-82 vs docs/.../unit-02/index.mdx:67-73: three guide sections taught as four topics, Topic 2.4 is the second half of guide section 2.3, nothing added or left out)',
        'All seven Urdu files carry clo_refs SLO:EFMP-302-2-1 / SLO:EFMP-302-2-2 identical to their English counterparts (frontmatter of index, topic-01..04, unit-assessment, unit-teacher-notes), re-verified this cycle',
        'Every English sub-topic heading has its Urdu counterpart at the same structural position across all four topic pairs, re-verified this cycle (topic-01 UR :46,:84,:115,:146; topic-02 UR :47,:62,:79,:94,:108; topic-03 UR :45,:89,:125; topic-04 UR :41,:61,:97); no guide sub-topic added or dropped in the Urdu mirror',
        'The G3 dependency is recorded as an unresolved uncertain finding (U-01): no accepted signed G3 evidence exists under ADR-0019 (G-2026-65). This cycle independently verified the current English inputs are byte-identical to the G3 feat023-r2 binding except the two repaired fig-U2-5 EN variants, and re-measured both clean (logs-feat023-r2/manifest-comparison-g3r2-vs-g5r2.log, logs-feat023-r2/en-fig-u2-5-repair-check.log); the bound English inputs were used as the authoritative comparison base',
      ],
    },
    {
      id: 'sources',
      status: 'pass',
      evidence: [
        'All six source keys plus the no-external-source row from specs/content/efmp-302/sources/unit-02.md are carried in the Urdu mirror with citations kept in Latin: Carr 2000 and Icka & Kochoska 2024 (topic-01 UR :257-262), UNESCO 2019 and NPST 2009 (topic-02 UR :237-240), Bebeau/Rest/Narvaez 1999 and Ehrich et al 2011 with DOIs (topic-03 UR :239-244), Ehrich 2011 and UNESCO 2019 (topic-04 UR :220-224), re-verified this cycle',
        'Every uncorroborated/unreachable disclosure in the English prose has a faithful Urdu counterpart, re-verified this cycle: Carr print-only and uncorroborated, argument reported not read (topic-01 UR :111-113); Icka & Kochoska unretrieved (UR :141-144); UNESCO and NPST unreachable with the Standard 9 attribution flagged uncorroborated in bold (topic-02 UR :120-124, rendered in renders-feat023-r2/desktop-element-topic02-caveat.png); NACTE gap with tutor referral and source-register note (UR :126-130); four-step framework taught as guide-given (topic-03 UR :98-100); Ehrich conceptual-model-illustrated-by-constructed-scenarios qualifier preserved (topic-03 UR :114-116)',
        'New this cycle: the Urdu MCQ 6 answer key now also carries the uncorroborated qualifier (unit-assessment UR :194-197), so every attribution boundary in the unit - prose, taught passage and key - is now disclosed in Urdu; no qualification lapse remains',
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'All 14 sub-topics taught in Urdu with headings aligned 1:1 to the English (see authority evidence); all five unit learning outcomes taught (index UR :42-53) and each assessed in the Urdu 10/10/5 bank',
        'Guide leaf-to-assessment mapping preserved, re-verified this cycle: 2.1 -> MCQ 1-3, RRQ 1-3, ERQ 1; 2.2 conduct domains -> MCQ 4-5, RRQ 4-5, ERQ 2; 2.2 local/international codes -> MCQ 6, RRQ 6; 2.3 Rest -> MCQ 7-8, RRQ 7-8, ERQ 3 and 5; 2.3 four-step framework -> ERQ 4-5; 2.3 classroom dilemmas -> MCQ 9-10, RRQ 9-10, ERQ 4-5 (i18n/ur/.../unit-assessment.mdx:51-181)',
        'Carried advisory from the G3 chain (not a coverage breach; blueprint requires >= 2 items per topic, not per sub-topic): U2-12 Reflective Decision Making is taught (topic-03 UR :125-146) and formatively assessed (UR :175, :207-214) but has no direct summative item, same as the English bank',
      ],
    },
    {
      id: 'assessment',
      status: 'pass',
      evidence: [
        'Independent blind solve of all 10 Urdu MCQs from the Urdu questions alone, before reading either key: derived 1-ب, 2-ج, 3-ب, 4-ب, 5-ج, 6-ج, 7-الف, 8-ج, 9-ب, 10-ب; the Urdu key (unit-assessment UR :186-204) matches on all ten and corresponds to the English key (EN :188-206) via الف/ب/ج/د = a/b/c/d with option content and order preserved item by item; no item inadvertently reveals its answer or changes cognitive demand; Bloom labels match (یاد رکھنا, سمجھنا, اطلاق, تجزیہ, جائزہ, تخلیق)',
        'RRQ marks (4,4,4,8,4,5,8,5,5,3), point-by-point mark schemes, the ERQ 20-point analytic rubrics with the analysis-floor cap of 10, and the ERQ 5 integrative item requiring both models all correspond exactly (i18n/ur/.../unit-assessment.mdx:204-301 vs docs/.../unit-assessment.mdx:208-304), re-verified this cycle table by table',
        'CYCLE-1 B-01 REPAIR VERIFIED: the Urdu MCQ 6 key (i18n/ur/.../unit-assessment.mdx:194-197) now appends "جیسا کہ موضوع 2.2 بیان کرتا ہے، بنیادی دستاویز کھولی نہیں جا سکی، چنانچہ یہ نسبت ثانوی بیانات پر چلتی ہے اور غیر مصدقہ ہے۔" - a faithful rendering of the English key caveat (docs/.../unit-assessment.mdx:196-199 "As Topic 2.2 discloses, the primary document could not be opened, so this attribution follows secondary accounts and is uncorroborated"), landed at commit 86ce1dd (logs-feat023-r2/repair-diff-86ce1dd.log). The passage-versus-key asymmetry is closed; rendered at 1280px, 360px and A4 print (renders-feat023-r2/desktop-element-assessment-mcq6-key.png, narrow360-element-assessment-mcq6-key.png, print-a4-element-assessment-mcq6-key.png) and present verbatim in the served build (logs-feat023-r2/site-build.log)',
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        'logs-feat023-r2/render-inspect-stdout.log + renders-feat023-r2/render-inspect.json: full host inspection over the shared fresh build at commit 86ce1dd (not rebuilt; freshness verified in site-build.log), desktop 1280x900 / narrow 360x780 / A4 794px print, chromium 149.0.7827.0, defects: 0 - no skipped heading levels on any of the 7 pages, every image served with non-empty Urdu alt text, dark variants hidden (natural=0x0), 0px document overflow at 360px, all 6 tables fit their 328px client width, all 8 figure carriers are their own scroll containers (scroll=780), clippedElems=0 on all 7 pages at A4, answers and marking guidance render unclipped',
        'logs-feat023-r2/measure-figure-text.log: all 16 Urdu variants (8 figures x .ur.svg/.ur.dark.svg) clean - no text past the viewBox, no wordmark overprint; renders-feat023-r2/render-inspect.log section D independently measured the same 16 served variants clean',
        'logs-feat023-r2/en-fig-u2-5-repair-check.log: the two repaired EN fig-U2-5 variants (the only English inputs whose digests differ from the G3 r2 binding) re-measured clean this cycle',
        'logs-feat023-r2/render-review.log + renders-feat023-r2/ur-element-inspect.log: the reviewer read the rendered pages directly - 10 targeted element captures plus 14 full-page captures and 7 print PDFs; Nastaliq legible at desktop, narrow and print scale, bidi punctuation correct, RTL tables correct, figure labels legible; the repaired MCQ 6 key renders completely at every inspected scale',
      ],
    },
    {
      id: 'completeness',
      status: 'pass',
      evidence: [
        'Structural comparison re-verified this cycle: all seven files (index, topic-01..04, unit-assessment, unit-teacher-notes) present under i18n/ur/.../unit-02/ with every English section carried - real classroom situation, explanation with all sub-headings, activity, check your understanding, summary, self-assessment checklist, practicum task, summative task with mini-rubric, further reading; 10 MCQs, 10 RRQs, 5 ERQs, all mark schemes and rubrics; all 8 figure carriers wired to .ur.svg with translated alt texts; est_reading_minutes identical (8/26/24/24/23/28/10); no heading-only stubs and no added content',
        'CYCLE-1 B-01 OMISSION REPAIRED: the English MCQ 6 key second sentence (docs/.../unit-assessment.mdx:196-199) now has its Urdu counterpart (i18n/ur/.../unit-assessment.mdx:194-197); the r1->r2 manifest diff confirms this file was the only changed input since cycle 1 (logs-feat023-r2/verify-manifest.log), so no other passage could have regressed; every passage across the seven file pairs is complete',
      ],
    },
    {
      id: 'semantics',
      status: 'pass',
      evidence: [
        'Full passage-by-passage comparison across all seven file pairs this cycle: negation, modal force, quantities (11 of 40 marks, thirty classmates, four seconds, third time this month, 350-400 / 400-450 / 450-500 words, 20/25/30 minutes, groups of three/four, Weeks 4-5, five years), dates (January, 2009, 2024, 2011, 1999, 2000), comparisons, causal claims, examples, pronoun references and instructional sequences all preserved; the mark-versus-response distinction, the four Rest components and their failure modes, the confidentiality limit formulation ("جو آپ مجھے بتائیں گے میں اسے نجی رکھوں گا، سوائے اس کے کہ آپ خطرے میں ہوں..."), the equity conditions-versus-standard test and the four-interest sorting all carry identical meaning',
        'CYCLE-1 B-01 DIVERGENCE CLOSED: the one material semantic divergence (the Urdu key asserting the Standard 9 attribution as settled fact while the English key and the Urdu taught passage carry the uncorroborated disclosure) is repaired at 86ce1dd; epistemic uncertainty is now preserved everywhere in the Urdu mirror, including the key, which uses the same disclosure vocabulary as the taught passage (بنیادی دستاویز / ثانوی بیانات / غیر مصدقہ)',
        'Minor non-blocking shifts carried as advisories, unchanged since cycle 1 (byte-identical inputs): misconduct -> بدعنوانی (corruption, narrower) at topic-01 UR :131-133 and the fig-U2-2.ur breach label; patronise -> تحقیر کرنا (humiliate) at topic-04 UR :125; "a parent" -> والدہ (mother) at topic-02 UR :91-92; "does not pray" -> نماز نہیں پڑھتا (contextually apt for Pakistan, narrows the generic "pray")',
      ],
    },
    {
      id: 'terminology',
      status: 'pass',
      evidence: [
        'All four UR key_terms match specs/content/terminology.csv:107-110 exactly, re-verified this cycle: Professional Ethics/پیشہ ورانہ اخلاقیات, Code of Ethical Conduct/ضابطہ اخلاق, Ethical Dilemma/اخلاقی مخمصہ, Reflective Decision Making/غور و فکر پر مبنی فیصلہ سازی; the bank G5-review flag on the last phrase is answered again by this review: the phrase is natural, precise and used consistently (topic-03 UR :125-146 and the assessment items)',
        'Bank terms used consistently in prose: تشخیص (assessment), معیارِ جانچ (rubric), اخلاقی محرک matching bank محرک (motivation), پیشہ ورانہ معیارات (professional standards), مسلسل پیشہ ورانہ ترقی (CPD), پیشہ واریت (professionalism)',
        'All 18 authored concept labels in specs/content/efmp-302/concepts/unit-02.md:18-50 reviewed again as the file requests: every one is semantically correct, understandable academic-plain Urdu; six differ in wording from the published Urdu prose (ذاتی اخلاقیات vs prose ذاتی اخلاق; والدین اور معاشرے vs prose والدین اور برادری; ہم پیشہ افراد vs prose ساتھی اساتذہ; چار مرحلوں کا فیصلہ ساز ڈھانچہ vs prose چار مرحلہ فریم ورک; علنی جواز کی کسوٹی vs prose عوامی وجہ کی کسوٹی; لکھے ہوئے ضابطے vs prose تحریری ضابطہ) - carried advisory; promotion into the bank is an owner action this reviewer does not take',
      ],
    },
    {
      id: 'register',
      status: 'pass',
      evidence: [
        'Academic-plain (درسی مگر عام فہم) register holds throughout, re-verified this cycle: natural sentence order, no literary or archaic diction, technical terms defined at first use exactly where the English defines them (پیشہ ورانہ اخلاقیات topic-01 UR :48-51, ضابطہ اخلاق topic-02 UR :42-45, غور و فکر پر مبنی فیصلہ سازی topic-03 UR :127-129, اخلاقی مخمصہ topic-04 UR :43-44); gendered verb forms correct for محترمہ رابعہ/نادیہ/فرح and جناب اسلم/خالد',
        'Reads at desktop, narrow and print scale in the captured renders (renders-feat023-r2/desktop-element-topic01-paragraph.png, narrow360-element-assessment-mcq6-key.png, print-a4-element-assessment-mcq6-key.png, desktop-index.png): legible Nastaliq, correct line-final punctuation, bold and italic emphasis preserved, the draft translation-status badge renders (مسودہ)',
        'Minor register notes carried as advisories, none blocking understanding: تفویض for "assignment" where اسائنمنٹ is the usual academic usage (topic-02 UR :123); نقشہ used for both "table" and "diagram" in figure alt texts and the topic-03 table references where جدول is precise (topic-03 UR :71, :151); بدعنوانی for "misconduct"',
      ],
    },
    {
      id: 'rtl',
      status: 'pass',
      evidence: [
        'Served pages are lang="ur" dir="rtl" (verified in the served HTML, logs-feat023-r2/site-build.log) and the layout mirrors with the sidebar on the right (renders-feat023-r2/desktop-index.png)',
        'All 8 .ur.svg figures mirror their horizontal layout per style-guide v4.1, re-verified visually this cycle: fig-U2-5.ur stages run 1-rightmost to 4-leftmost with the failure labels under each stage (renders-feat023-r2/desktop-element-topic03-fig5.png); render-inspect section D measured all 16 Urdu variants clean',
        'Bidi punctuation at line ends correct in every read capture: full stops, commas, colons and closing parentheses sit at the left edge of ended lines (desktop-element-assessment-mcq6-key.png, desktop-element-topic01-paragraph.png); embedded Latin (citations, DOIs, journal names, Western numerals 9/2/6/2.2, the textbook.com.pk wordmark) renders correctly inside RTL lines (renders-feat023-r2/desktop-element-topic01-further-reading.png)',
        'Table column order at 360px is RTL-correct and mirrors the English tables: renders-feat023-r2/narrow360-element-topic03-diagnostic-table.png (جزو | ناکامی | دراصل کیا مدد دیتا ہے rightmost-first) and narrow360-element-assessment-erq1-rubric.png (معیار | محدود (1-2) | مناسب (3) | مضبوط (4-5)); figures sit in their own scroll containers at the RTL start edge (render-inspect section B, scroller=FIGURE.figure)',
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: true,
      message:
        'B-01 (cycle 1, now RESOLVED): the Urdu MCQ 6 answer key omitted the English key uncorroborated-attribution caveat, presenting the Standard 9 attribution as settled fact while the Urdu taught passage carried the disclosure. Repair verified at commit 86ce1dd: the Urdu key item 6 (i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-02/unit-assessment.mdx:194-197) now appends "جیسا کہ موضوع 2.2 بیان کرتا ہے، بنیادی دستاویز کھولی نہیں جا سکی، چنانچہ یہ نسبت ثانوی بیانات پر چلتی ہے اور غیر مصدقہ ہے۔" The sentence is faithful to the English key caveat (docs/semester-1/efmp-302/unit-02/unit-assessment.mdx:196-199): "As Topic 2.2 discloses" -> "جیسا کہ موضوع 2.2 بیان کرتا ہے", "the primary document could not be opened" -> "بنیادی دستاویز کھولی نہیں جا سکی", "so this attribution follows secondary accounts and is uncorroborated" -> "چنانچہ یہ نسبت ثانوی بیانات پر چلتی ہے اور غیر مصدقہ ہے". It uses the same disclosure vocabulary as the Urdu taught passage (topic-02 UR :120-124: بنیادی دستاویز نہ کھل سکی / ثانوی بیانات / غیر مصدقہ), so the passage-versus-key asymmetry is closed and a learner or marker reading only the Urdu key now sees the same qualification as the English key. The repair renders completely at 1280px, 360px and A4 print (renders-feat023-r2/desktop-element-assessment-mcq6-key.png, narrow360-element-assessment-mcq6-key.png, print-a4-element-assessment-mcq6-key.png) and is present verbatim in the served build (logs-feat023-r2/site-build.log). The r1->r2 manifest diff confirms this file was the only changed input, so nothing else regressed (logs-feat023-r2/verify-manifest.log).',
    },
    {
      severity: 'uncertain',
      resolved: false,
      message:
        "U-01, G3 dependency (G-2026-30/G-2026-34/G-2026-65 pattern), carried unresolved from cycle 1: the G5 rubric requires accepted G3 evidence for the exact English inputs, but ADR-0019 blocks agent certification, so no accepted signed G3 evidence exists anywhere. The best available G3 evidence for Unit 2 is the feat023 advisory chain: cycle 1 pass (agent-g3-efmp302-u2-feat023-r1.json, earned against the b8f8ffe-broken figures) and cycle 2 revise (agent-g3-efmp302-u2-feat023-r2.json, which verified everything except one pre-existing fig-U2-5 EN label collision, repaired post-report at 8db9943). This cycle independently verified the current English inputs are byte-identical to the G3 r2 binding except those two repaired fig-U2-5 EN variants, and re-measured both clean (logs-feat023-r2/manifest-comparison-g3r2-vs-g5r2.log, logs-feat023-r2/en-fig-u2-5-repair-check.log). This reviewer proceeded with the bound English inputs as the authoritative comparison base and records the dependency here rather than aborting. This unresolved uncertain finding is why the disposition is escalate rather than pass: all ten criteria are verified and satisfied on the current bytes and no content repair is requested, but the contract forbids a pass while it stands. Needed from the curriculum owner: (a) accept the advisory chain (G3 r2 + the verified 8db9943 repair) as sufficient for the G5 stage, or (b) commission a fresh G3 over the current English bytes. Until then this finding, and ADR-0019, forbid treating this report as more than advisory; no tracker row may be marked done from it.",
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Carried unresolved from the G3 chain (byte-identical inputs, re-confirmed): U2-12 Reflective Decision Making (guide 2.3 leaf bullet 3) is taught (topic-03 UR :125-146) and formatively assessed (UR :175, :207-214) but has no direct summative item in the 10/10/5 bank; the concept graph maps it to MCQ-09 and ERQ-05 (concepts/unit-02.md CON:EFMP-302-2-18), which engage it only obliquely. The same applies, more weakly, to social media among the 2.4 dilemma types. Blueprint-compliant (>= 2 items per topic, not per sub-topic); the Urdu mirror inherits the property identically. Suggested at next revision: one RRQ distinguishing structured reflection from merely thinking about the day, and/or one MCQ on loop closure, in both languages.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Carried unresolved from the G3 chain: bebeau1999 full text remains unread (SAGE 403); the bound evidence is an OpenAlex record summary supporting the four component names, order and attribution, while the unit claim that failing any one component prevents ethical action (topic-03 UR :47-49) rests on record-level support plus the unit own labelled gloss. The sources register declares exactly this boundary (specs/content/efmp-302/sources/unit-02.md ## Source gaps). The Urdu mirror carries the same attribution boundary faithfully (attributing the model to Rest, the exposition to the 1999 paper, and labelling the diagnostic table as the unit own gloss, topic-03 UR :71-72). Recorded so the limitation stays visible across attempts.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Carried unresolved from cycle 1: concept-label/prose wording variances. Of the 18 authored G5-flagged Urdu labels in specs/content/efmp-302/concepts/unit-02.md, all are semantically correct and fit for purpose, but six differ in wording from the published Urdu prose (CON:EFMP-302-2-2 ذاتی اخلاقیات vs prose ذاتی اخلاق; -2-10 والدین اور معاشرے کے ساتھ طرزِ عمل vs prose والدین اور برادری; -2-11 ہم پیشہ افراد vs prose ساتھی اساتذہ; -2-17 چار مرحلوں کا فیصلہ ساز ڈھانچہ vs prose چار مرحلہ فریم ورک; -2-22 مساوات کے لیے علنی جواز کی کسوٹی vs prose عوامی وجہ کی کسوٹی; -2-12 لکھے ہوئے ضابطے کی حدود vs prose تحریری ضابطہ). Suggest aligning the labels with the prose wording at next revision and promoting the survivors into specs/content/terminology.csv so the next unit inherits them; promotion is an owner action.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Carried unresolved from cycle 1 (byte-identical inputs): minor register/word-choice observations, none blocking understanding: "misconduct" rendered بدعنوانی (corruption; narrower than misconduct) at topic-01 UR :131-133 and in the fig-U2-2.ur breach label; "assignment" rendered تفویض (delegation) at topic-02 UR :123 where اسائنمنٹ is the usual academic usage; نقشہ used for both "table" and "diagram" in figure alt texts and the topic-03 table references (جدول is the precise word for a table); "patronise" rendered تحقیر کرنا (humiliate) at topic-04 UR :125; "a parent" rendered والدہ (mother) at topic-02 UR :91-92 where the immediate context is Bilal mother; "does not pray" rendered نماز نہیں پڑھتا, contextually apt for the Pakistani B.Ed audience though narrower than the generic English. Also carried from the G3 chain: the fig-U2-1 cosmetic shape-wordmark graze (88.4x4 px, rect.grid) exists on the Urdu variant too; the wordmark paints last, is aria-hidden and is never occluded (reported-not-failed class; measure-figure-text and render-inspect section D both pass it).',
    },
    {
      severity: 'advisory',
      resolved: true,
      message:
        'Render access, the sole blocker of the first G5 attempt (204c7dfa-2541-4f42-a0a5-4c78ec349d57, 2026-09-21, escalated for missing render access), remained resolved through this cycle: a fresh shared two-locale build existed at commit 86ce1dd, its freshness was verified before inspection (the repaired caveat renders in the served page), and the full inspection ran - render-inspect at 1280x900 / 360x780 / A4 print plus targeted element captures the reviewer read directly (logs-feat023-r2/render-review.log records how inspection ran, including a stale orphaned python3 http.server found squatting on the assigned port 4621 and terminated before inspection; it served a deleted directory from a different finished session and no longer responded to any route). One operational note for the parent: the first render-inspect attempt crashed with kill ESRCH while that stale process held the port; the re-run after freeing it completed cleanly with defects: 0.',
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: `${LOGS}/validate-content.log` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${LOGS}/check-depth-gate.log` },
    { name: 'check:figures', exit_code: 0, log_path: `${LOGS}/check-figures.log` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${LOGS}/check-no-em-dash.log` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${LOGS}/check-no-answer-keys.log` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${LOGS}/check-docs-sync.log` },
    { name: 'site-build', exit_code: 0, log_path: `${LOGS}/site-build.log` },
    { name: 'render-review', exit_code: 0, log_path: `${LOGS}/render-review.log` },
    { name: 'measure-figure-text', exit_code: 0, log_path: `${LOGS}/measure-figure-text.log` },
    { name: 'en-fig-u2-5-repair-check', exit_code: 0, log_path: `${LOGS}/en-fig-u2-5-repair-check.log` },
    { name: 'verify-input-manifest', exit_code: 0, log_path: `${LOGS}/verify-manifest.log` },
    { name: 'manifest-comparison-g3r2-vs-g5r2', exit_code: 0, log_path: `${LOGS}/manifest-comparison-g3r2-vs-g5r2.log` },
    { name: 'repair-diff-86ce1dd', exit_code: 0, log_path: `${LOGS}/repair-diff-86ce1dd.log` },
    { name: 'ur-element-inspect', exit_code: 0, log_path: `${LOGS}/ur-element-inspect-stdout.log` },
  ],
  evidence_manifest: evidenceManifest,
};

const outPath = join(repo, 'specs/content/efmp-302/reviews/unit-02/G5/agent-g5-efmp302-u2-feat023-r2.json');
writeFileSync(outPath, JSON.stringify(report, null, 2) + '\n');
console.log('wrote', outPath);
console.log('disposition:', report.disposition);
console.log('criteria:', report.criteria.map((c) => c.id + '=' + c.status).join(', '));
console.log('findings:', report.findings.map((f) => f.severity + (f.resolved ? '(resolved)' : '(open)')).join(', '));
console.log('commands:', report.commands.length, '| evidence files:', Object.keys(evidenceManifest).length);
console.log('png renders in manifest:', Object.keys(evidenceManifest).filter((p) => /\.png$/.test(p)).length);
