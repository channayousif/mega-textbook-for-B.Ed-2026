#!/usr/bin/env node
/** Assemble the G5 feat023-r1 report JSON, injecting the prepared input manifest verbatim. */
import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(process.env.CONTENT_ROOT || '.');
const prepared = JSON.parse(readFileSync(join(root, 'specs/content/efmp-302/reviews/unit-02/G5/feat023-r1/manifest.json'), 'utf8'));

const report = {
  schema_version: 1,
  course_code: 'EFMP-302',
  unit_no: 2,
  stage: 'G5',
  disposition: 'revise',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'commit:47ac733',
  reviewer_run_id: 'agent-g5-efmp302-u2-feat023-r1',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T19:11:54Z',
  completed_at: '2026-09-24T19:59:30Z',
  skill_digest: prepared.skill_digest,
  supersedes: 'specs/content/efmp-302/reviews/unit-02/G5/204c7dfa-2541-4f42-a0a5-4c78ec349d57.json',
  g3_report: 'specs/content/efmp-302/reviews/unit-02/G3/agent-g3-efmp302-u2-feat023-r2.json',
  input_manifest: prepared.input_manifest,
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        'Scheme-and-Course-guides/extracted-text/1st 2026.txt guide Unit 2 outline (2.1 meaning and significance of professional ethics; 2.2 conduct domains plus local and international codes; 2.3 Rest four-component model, four-step framework, reflective decision making, classroom dilemmas) is bound in the input manifest and unchanged since the G3 feat023-r2 advisory: 99 shared manifest paths identical, the only changed English inputs being the two repaired fig-U2-5 EN variants (logs-feat023-r1/manifest-comparison-g3r2-vs-g5r1.log)',
        'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-02/index.mdx:79-82 carries the same guide-division disclosure as docs/semester-1/efmp-302/unit-02/index.mdx:67-73: the guide sets the unit in three sections, Topic 2.4 is the second half of guide section 2.3, nothing added or left out',
        'All seven Urdu files carry clo_refs SLO:EFMP-302-2-1 / SLO:EFMP-302-2-2 identical to their English counterparts (frontmatter of index, topic-01..04, unit-assessment, unit-teacher-notes)',
        'Every English sub-topic heading has its Urdu counterpart at the same structural position (topic-01 UR :46,:84,:115,:146; topic-02 UR :47,:62,:79,:94,:108; topic-03 UR :45,:89,:125; topic-04 UR :41,:61,:97); no guide sub-topic added or dropped in the Urdu mirror',
        'The G3 dependency itself is recorded as an unresolved uncertain finding (no accepted signed G3 evidence exists under ADR-0019); the bound English inputs were used as the authoritative comparison base per the G-2026-30/G-2026-34 pattern',
      ],
    },
    {
      id: 'sources',
      status: 'pass',
      evidence: [
        'All six source keys plus the no-external-source row from specs/content/efmp-302/sources/unit-02.md are carried in the Urdu mirror with citations kept in Latin: Carr 2000 and Icka & Kochoska 2024 (topic-01 UR :257-262), UNESCO 2019 and NPST 2009 (topic-02 UR :237-240), Bebeau/Rest/Narvaez 1999 and Ehrich et al 2011 with DOIs (topic-03 UR :239-244), Ehrich 2011 and UNESCO 2019 (topic-04 UR :220-224)',
        'Every uncorroborated/unreachable disclosure in the English prose has a faithful Urdu counterpart: Carr print-only and uncorroborated, argument reported not read (topic-01 UR :111-113); Icka & Kochoska unretrieved (UR :141-144); UNESCO and NPST unreachable with the Standard 9 attribution flagged uncorroborated in bold (topic-02 UR :120-124, rendered in renders-feat023-r1/desktop-element-topic02-caveat.png); NACTE gap with tutor referral and source-register note (UR :126-130); four-step framework taught as guide-given (topic-03 UR :98-100); Ehrich conceptual-model-illustrated-by-constructed-scenarios qualifier preserved (topic-03 UR :114-116)',
        'The one qualification lapse found (Urdu MCQ 6 key) is recorded under assessment, completeness and semantics with paired locators; the prose citations themselves all retain their supporting meaning',
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'All 14 sub-topics taught in Urdu with headings aligned 1:1 to the English (see authority evidence); all five unit learning outcomes taught (index UR :42-53) and each assessed in the Urdu 10/10/5 bank',
        'Guide leaf-to-assessment mapping preserved: 2.1 -> MCQ 1-3, RRQ 1-3, ERQ 1; 2.2 conduct domains -> MCQ 4-5, RRQ 4-5, ERQ 2; 2.2 local/international codes -> MCQ 6, RRQ 6; 2.3 Rest -> MCQ 7-8, RRQ 7-8, ERQ 3 and 5; 2.3 four-step framework -> ERQ 4-5; 2.3 classroom dilemmas -> MCQ 9-10, RRQ 9-10, ERQ 4-5 (i18n/ur/.../unit-assessment.mdx:51-181)',
        'Carried advisory from the G3 chain (not a coverage breach, blueprint requires >= 2 items per topic not per sub-topic): U2-12 Reflective Decision Making is taught (topic-03 UR :125-146) and formatively assessed (UR :175, :207-214) but has no direct summative item, same as the English bank',
      ],
    },
    {
      id: 'assessment',
      status: 'fail',
      evidence: [
        'Independent blind solve of all 10 Urdu MCQs from the Urdu alone before reading the English key: derived 1-ب, 2-ج, 3-ب, 4-ب, 5-ج, 6-ج, 7-الف, 8-ج, 9-ب, 10-ب; all ten correspond to the English key (b,c,b,b,c,c,a,c,b,b) via الف/ب/ج/د = a/b/c/d; option content and order match item by item including MCQ 8 where EN c) character / d) motivation maps to UR ج) اخلاقی کردار / د) اخلاقی محرک; no item inadvertently reveals its answer or changes cognitive demand; Bloom labels match (یاد رکھنا, سمجھنا, اطلاق, تجزیہ, جائزہ, تخلیق)',
        'RRQ marks (4,4,4,8,4,5,8,5,5,3), point-by-point mark schemes, the ERQ 20-point analytic rubrics with the analysis-floor cap of 10, and the ERQ 5 integrative item requiring both models all correspond exactly (i18n/ur/.../unit-assessment.mdx:204-299 vs docs/.../unit-assessment.mdx:208-304)',
        'FAIL: the Urdu MCQ 6 answer-key explanation (i18n/ur/.../unit-assessment.mdx:194-195) omits the English key caveat sentence (docs/.../unit-assessment.mdx:196-199: "As Topic 2.2 discloses, the primary document could not be opened, so this attribution follows secondary accounts and is uncorroborated"). The Urdu key presents the Standard 9 pairing as settled fact while the Urdu taught passage (topic-02 UR :120-124) carries the disclosure, so a learner or marker reading only the Urdu key sees an assertion the unit itself elsewhere flags as uncorroborated. Rendered evidence: renders-feat023-r1/narrow360-element-assessment-mcq-key.png and print-a4-element-assessment-mcq-key.png',
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        'logs-feat023-r1/render-review.log + renders-feat023-r1/render-inspect.log: full host inspection over a fresh both-locale build (site-build.log exit 0), desktop 1280x900 / narrow 360x780 / A4 794px print media, chromium 149.0.7827.0: no skipped heading levels, every image served with non-empty alt, dark variants hidden (natural=0x0), 0px document overflow at 360px, tables fit their 328px client width, figures are their own scroll containers (scroll=780), clippedElems=0 on all 7 pages at A4, answers and marking guidance render unclipped',
        'logs-feat023-r1/ur-figure-text-overlap.log/.json: the figure-internal text-geometry measurement no prior review ran over the Urdu variants - served bytes sha256-matched to committed bytes, rendered-DOM getBBox pairwise intersection plus canvas pixel ink-intersection over all 16 Urdu variants (8 figures x .ur.svg/.ur.dark.svg): 0 bbox-overlapping pairs, 0 shared-ink pixels, 0 near-misses, 0 wordmark-text overlaps; negative control over the known-bad b8f8ffe .ur.svg bytes detects 5/6/7 overlapping pairs with 0/2/3 real ink collisions (ur-figure-text-overlap-control-b8f8ffe.json), proving the instrument detects the failure mode in Urdu',
        'logs-feat023-r1/en-fig-u2-5-repair-check.log: the two repaired EN fig-U2-5 variants (8db9943, the only English inputs changed since the G3 r2 binding) re-measured with the same method: 0 overlapping pairs; "was outweighed" (x 488.0-585.6, y 139-153) is disjoint from the rewrapped "did not"/"follow through" (x 678.0-764.4, two lines at y 131-145/147-161)',
        'Wordmark-shape grazes (rect.bg and an 88.4x4 rect.grid graze on fig-U2-1.ur) are the same cosmetic reported-not-failed class the G3 chain accepted: the wordmark paints last, is aria-hidden and is never occluded',
      ],
    },
    {
      id: 'completeness',
      status: 'fail',
      evidence: [
        'Structural comparison complete: all seven files (index, topic-01..04, unit-assessment, unit-teacher-notes) present under i18n/ur/.../unit-02/ with every English section carried: real classroom situation, explanation with all sub-headings, activity, check your understanding, summary, self-assessment checklist, practicum task, summative task with mini-rubric, further reading; 10 MCQs, 10 RRQs, 5 ERQs, all mark schemes and rubrics; all 8 figure carriers wired to .ur.svg with translated alt texts; est_reading_minutes identical (8/26/24/24/23/28/10); no heading-only stubs and no added content',
        'FAIL: one omission found - the English MCQ 6 key second sentence (docs/.../unit-assessment.mdx:196-199) has no counterpart in the Urdu key (i18n/ur/.../unit-assessment.mdx:194-195, the item ends at "ایک ہی معیار کے تحت آتی ہیں۔"); every other passage across the seven file pairs is complete',
      ],
    },
    {
      id: 'semantics',
      status: 'fail',
      evidence: [
        'Full passage-by-passage comparison across all seven file pairs: negation, modal force, quantities (11 of 40 marks, thirty classmates, four seconds, third time this month, 350-400 / 400-450 / 450-500 words, 20/25/30 minutes, groups of three/four, Weeks 4-5, five years), dates (January, 2009, 2024, 2011, 1999, 2000), comparisons, causal claims, examples, pronoun references and instructional sequences all preserved; the mark-versus-response distinction, the four Rest components and their failure modes, the confidentiality limit formulation ("I will keep what you tell me private unless you are in danger..."), the equity conditions-versus-standard test and the four-interest sorting all carry identical meaning',
        'FAIL: epistemic uncertainty is preserved everywhere except one place - "uncorroborated ... follows secondary accounts" in the English MCQ 6 key (docs/.../unit-assessment.mdx:196-199) is asserted as settled fact in the Urdu key (i18n/ur/.../unit-assessment.mdx:194-195). This is the single material semantic divergence found and is recorded as the blocking finding with a repair request',
        'Minor non-blocking shifts recorded as advisories: misconduct -> بدعنوانی (corruption, narrower) at topic-01 UR :131-133 and the fig-U2-2.ur breach label; patronise -> تحقیر کرنا (humiliate) at topic-04 UR :125; "a parent" -> والدہ (mother) in the topic-02 UR :91-92 sentence; "does not pray" -> نماز نہیں پڑھتا (contextually apt for Pakistan, narrows the generic "pray")',
      ],
    },
    {
      id: 'terminology',
      status: 'pass',
      evidence: [
        'All four UR key_terms match specs/content/terminology.csv:107-110 exactly: Professional Ethics/پیشہ ورانہ اخلاقیات, Code of Ethical Conduct/ضابطہ اخلاق, Ethical Dilemma/اخلاقی مخمصہ, Reflective Decision Making/غور و فکر پر مبنی فیصلہ سازی; the bank G5-review flag on the last phrase is answered by this review: the phrase is natural, precise and used consistently (topic-03 UR :125-146 and the assessment items)',
        'Bank terms used consistently in prose: تشخیص (assessment), معیارِ جانچ (rubric), اخلاقی محرک matching bank محرک (motivation), پیشہ ورانہ معیارات (professional standards), مسلسل پیشہ ورانہ ترقی (CPD), پیشہ واریت (professionalism)',
        'All 18 authored concept labels in specs/content/efmp-302/concepts/unit-02.md:18-50 reviewed as the file requests: every one is semantically correct, understandable academic-plain Urdu (e.g. قانون بطور اخلاقی کم از کم حد, روزمرہ اعمال بطور اخلاقی فیصلے, محدود رازداری, نمبر اور ردِ عمل کا فرق); six differ in wording from the published Urdu prose (ذاتی اخلاقیات vs prose ذاتی اخلاق; والدین اور معاشرے vs prose والدین اور برادری; ہم پیشہ افراد vs prose ساتھی اساتذہ; چار مرحلوں کا فیصلہ ساز ڈھانچہ vs prose چار مرحلہ فریم ورک; علنی جواز کی کسوٹی vs prose عوامی وجہ کی کسوٹی; لکھے ہوئے ضابطے vs prose تحریری ضابطہ) - recorded as an advisory; promotion into the bank is an owner action this reviewer does not take',
      ],
    },
    {
      id: 'register',
      status: 'pass',
      evidence: [
        'Academic-plain (درسی مگر عام فہم) register holds throughout: natural sentence order, no literary or archaic diction, technical terms defined at first use exactly where the English defines them (پیشہ ورانہ اخلاقیات topic-01 UR :48-51, ضابطہ اخلاق topic-02 UR :42-45, غور و فکر پر مبنی فیصلہ سازی topic-03 UR :127-129, اخلاقی مخمصہ topic-04 UR :43-44); gendered verb forms correct for محترمہ رابعہ/نادیہ/فرح and جناب اسلم/خالد',
        'Reads at desktop, narrow and print scale in the captured renders (renders-feat023-r1/desktop-element-topic01-paragraph.png, print-a4-element-topic01-paragraph.png, desktop-element-index-article.png): legible Nastaliq, correct line-final punctuation, bold emphasis preserved, the draft translation-status badge renders (مسودہ)',
        'Minor register notes recorded as advisories, none blocking understanding: تفویض for "assignment" where اسائنمنٹ is the usual academic usage (topic-02 UR :123); نقشہ used for both "table" and "diagram" in figure alt texts and the topic-03 table references where جدول is precise (topic-03 UR :71, :151); بدعنوانی for "misconduct"',
      ],
    },
    {
      id: 'rtl',
      status: 'pass',
      evidence: [
        'Served pages are lang="ur" dir="rtl" (verified in the served HTML and the desktop captures); layout mirrors with the sidebar on the right',
        'All 8 .ur.svg figures mirror their horizontal layout per style-guide v4.1, not just their labels: fig-U2-5.ur stages run 1-rightmost to 4-leftmost (step rects at x=600/410/220/30 with right-anchored failure labels at x=764/574/384/194), fig-U2-1.ur row-label column rightmost, fig-U2-2.ur branches reflected with text-anchor swapped (شاگرد سپرد کرتے ہیں at x=744 end-anchored vs EN "Pupils entrust" at x=36 start), fig-U2-4.ur labels at x=530 vs EN x=250, fig-U2-6.ur loop stations and fig-U2-8.ur panels run right-to-left (visual: the 16 standalone 2x renders)',
        'Bidi punctuation at line ends correct: full stops, question marks, colons and closing parentheses sit at the left edge of ended lines across the MCQ list, key, paragraphs and tables captures; mechanical census over 179 assessment text nodes shows Urdu full stop (۔) 29x and ")" 35x line-final; embedded Latin (citations, DOIs, journal names, Western numerals, the textbook.com.pk wordmark) renders correctly inside RTL lines (renders-feat023-r1/desktop-element-topic01-further-reading.png)',
        'Table column order at 360px is RTL-correct and mirrors the English tables (renders-feat023-r1/narrow360-element-topic03-diagnostic-table.png: جزو | ناکامی | دراصل کیا مدد دیتا ہے rightmost-first; narrow360-element-assessment-erq1-rubric.png: معیار | محدود (1-2) | مناسب (3) | مضبوط (4-5)); figures sit in their own scroll containers at the RTL start edge (narrow360-element-topic03-fig5-scrolled.png, scrollLeft=0 is the right edge in RTL)',
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: false,
      message: 'The Urdu MCQ 6 answer key omits the English key uncorroborated-attribution caveat. English unit-assessment.mdx:196-199 (key item 6) reads "...As Topic 2.2 discloses, the primary document could not be opened, so this attribution follows secondary accounts and is uncorroborated." (added by the cycle-1 G3 advisory repair, verified landed in G3 feat023-r2). The Urdu key item 6 (i18n/ur/.../unit-assessment.mdx:194-195) ends at "...یونٹ 2 کی ذمہ داریاں اور یونٹ 6 کی ترقی ایک ہی معیار کے تحت آتی ہیں۔" with no equivalent sentence, presenting the Standard 9 attribution as settled fact. The Urdu taught passage (topic-02.mdx UR :120-124) carries the disclosure, so the Urdu unit now has exactly the passage-versus-key asymmetry the English repair closed. A learner or marker reading only the Urdu key takes the attribution as corroborated. Repair request: append an honest Urdu equivalent, for example "جیسا کہ موضوع 2.2 بیان کرتا ہے، بنیادی دستاویز کھلی نہیں سکی، لہٰذا یہ انتساب ثانوی بیانات کی پیروی کرتا ہے اور غیر مصدقہ ہے۔" to the Urdu key item 6, then re-run check:pipeline-gate over the repaired mirror. Rendered evidence: renders-feat023-r1/narrow360-element-assessment-mcq-key.png, print-a4-element-assessment-mcq-key.png.',
    },
    {
      severity: 'uncertain',
      resolved: false,
      message: 'G3 dependency (G-2026-30/G-2026-34 pattern): the G5 rubric requires accepted G3 evidence for the exact English inputs, but ADR-0019 blocks agent certification, so no accepted signed G3 evidence exists anywhere. The best available G3 evidence for Unit 2 is the feat023 advisory chain: cycle 1 pass (agent-g3-efmp302-u2-feat023-r1.json, earned against the b8f8ffe-broken figures) and cycle 2 revise (agent-g3-efmp302-u2-feat023-r2.json, which verified everything except one pre-existing fig-U2-5 EN label collision, repaired post-report at 8db9943). The current English inputs are byte-identical to the G3 r2 binding except those two repaired fig-U2-5 EN variants (logs-feat023-r1/manifest-comparison-g3r2-vs-g5r1.log), and this review independently re-measured the repaired variants clean (en-fig-u2-5-repair-check.log, 0 overlapping pairs). This reviewer proceeded with the bound English inputs as the authoritative comparison base and records the dependency here rather than aborting. Needed from the curriculum owner: accept the advisory chain (G3 r2 + the verified 8db9943 repair) as sufficient for G5, or commission a fresh G3 over the current English bytes. Until then this finding, and ADR-0019, forbid treating this report as more than advisory; no tracker row may be marked done from it.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Carried unresolved from the G3 chain: U2-12 Reflective Decision Making (guide 2.3 leaf bullet 3) is taught (topic-03 UR :125-146) and formatively assessed (UR :175, :207-214) but has no direct summative item in the 10/10/5 bank; the concept graph maps it to MCQ-09 and ERQ-05 (concepts/unit-02.md CON:EFMP-302-2-18), which engage it only obliquely. The same applies, more weakly, to social media among the 2.4 dilemma types. Blueprint-compliant (>= 2 items per topic, not per sub-topic); the Urdu mirror inherits the property identically. Suggested at next revision: one RRQ distinguishing structured reflection from merely thinking about the day, and/or one MCQ on loop closure, in both languages.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Carried unresolved from the G3 chain: bebeau1999 full text remains unread (SAGE 403); the bound evidence is an OpenAlex record summary supporting the four component names, order and attribution, while the unit claim that failing any one component prevents ethical action (topic-03 UR :47-49) rests on record-level support plus the unit own labelled gloss. The sources register declares exactly this boundary (specs/content/efmp-302/sources/unit-02.md ## Source gaps). The Urdu mirror carries the same attribution boundary faithfully (attributing the model to Rest, the exposition to the 1999 paper). Recorded so the limitation stays visible across attempts.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Concept-label/prose wording variances: of the 18 authored G5-flagged Urdu labels in specs/content/efmp-302/concepts/unit-02.md, all are semantically correct and fit for purpose, but six differ in wording from the published Urdu prose (CON:EFMP-302-2-2 ذاتی اخلاقیات vs prose ذاتی اخلاق; -2-10 والدین اور معاشرے کے ساتھ طرزِ عمل vs prose والدین اور برادری; -2-11 ہم پیشہ افراد vs prose ساتھی اساتذہ; -2-17 چار مرحلوں کا فیصلہ ساز ڈھانچہ vs prose چار مرحلہ فریم ورک; -2-22 مساوات کے لیے علنی جواز کی کسوٹی vs prose عوامی وجہ کی کسوٹی; -2-12 لکھے ہوئے ضابطے کی حدود vs prose تحریری ضابطہ). Suggest aligning the labels with the prose wording at next revision and promoting the survivors into specs/content/terminology.csv so the next unit inherits them; promotion is an owner action.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Minor register/word-choice observations, none blocking understanding: "misconduct" rendered بدعنوانی (corruption; narrower than misconduct) at topic-01 UR :131-133 and in the fig-U2-2.ur breach label; "assignment" rendered تفویض (delegation) at topic-02 UR :123 where اسائنمنٹ is the usual academic usage; نقشہ used for both "table" and "diagram" in figure alt texts and the topic-03 table references (جدول is the precise word for a table); "patronise" rendered تحقیر کرنا (humiliate) at topic-04 UR :125; "a parent" rendered والدہ (mother) at topic-02 UR :91-92 where the immediate context is Bilal\'s mother; "does not pray" rendered نماز نہیں پڑھتا, contextually apt for the Pakistani B.Ed audience though narrower than the generic English. Also carried from the G3 chain: the fig-U2-1 cosmetic shape-wordmark graze (88.4x4 px, rect.grid) exists on the Urdu variant too; the wordmark paints last and is never occluded (reported-not-failed class).',
    },
    {
      severity: 'advisory',
      resolved: true,
      message: 'The prior G5 attempt (204c7dfa-2541-4f42-a0a5-4c78ec349d57, 2026-09-21) escalated solely for missing render access (blocking finding: could not inspect rendered Urdu, Nastaliq, bidi, tables, print). Resolved by this attempt: full render access was available and used - fresh both-locale build, render-inspect over the Urdu route at 1280x900 / 360x780 / A4 print, targeted element captures, and the first figure-internal geometry measurement over all 16 Urdu variants (render-review.log records how inspection ran). The prior report\'s source-comparison passes (semantics, terminology, register, completeness, assessment, authority, sources, coverage on the then-current bytes) remain consistent with this review\'s findings on the current bytes except where the English MCQ 6 key repair has since opened the divergence recorded as this review\'s blocking finding.',
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-02/G5/logs-feat023-r1/validate-content.log' },
    { name: 'check:depth-gate', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-02/G5/logs-feat023-r1/check-depth-gate.log' },
    { name: 'check:figures', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-02/G5/logs-feat023-r1/check-figures.log' },
    { name: 'check:no-em-dash', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-02/G5/logs-feat023-r1/check-no-em-dash.log' },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-02/G5/logs-feat023-r1/check-no-answer-keys.log' },
    { name: 'check:docs-sync', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-02/G5/logs-feat023-r1/check-docs-sync.log' },
    { name: 'site-build', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-02/G5/logs-feat023-r1/site-build.log' },
    { name: 'render-review', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-02/G5/logs-feat023-r1/render-review.log' },
    { name: 'measure-figure-text', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-02/G5/logs-feat023-r1/measure-figure-text.log' },
    { name: 'ur-figure-text-overlap', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-02/G5/logs-feat023-r1/ur-figure-text-overlap.log' },
    { name: 'en-fig-u2-5-repair-check', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-02/G5/logs-feat023-r1/en-fig-u2-5-repair-check.log' },
  ],
  evidence_manifest: JSON.parse(readFileSync(join(root, 'specs/content/efmp-302/reviews/unit-02/G5/renders-feat023-r1/evidence-hashes.json'), 'utf8')),
};

const out = join(root, 'specs/content/efmp-302/reviews/unit-02/G5/agent-g5-efmp302-u2-feat023-r1.json');
writeFileSync(out, `${JSON.stringify(report, null, 2)}\n`);
console.log(`wrote ${out}`);
