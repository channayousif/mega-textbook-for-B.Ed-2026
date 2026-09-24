#!/usr/bin/env node
// G5 feat023-r1 report writer: assembles agent-g5-efmp302-u4-feat023-r1.json from
// the verified evidence, the prepared manifest and this run's findings.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';

const sha256 = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const manifest = JSON.parse(readFileSync('specs/content/efmp-302/reviews/unit-04/G5/feat023-r1/manifest.json', 'utf8'));

const startedAt = '2026-09-24T21:41:45Z';
const completedAt = new Date().toISOString().replace(/\.\d+Z$/, 'Z');

const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'Scheme-and-Course-guides/extracted-text/1st 2026.txt guide Unit 4 sections 4.1-4.4 map one-to-one onto the four Urdu topic files; all 12 coverage/unit-04.md sub-topic sections are present in Urdu with their taught content (topic-01 concept/global/national/four-uses; topic-02 structure/domains/indicators; topic-03 self-evaluation/evidence; topic-04 licensing/appraisal/misuse)',
      'All five index.mdx Unit learning outcomes are taught and assessed in Urdu with the same outcome-to-item mapping as the English (outcome 1 -> MCQ-01/02, RRQ-02; outcome 3 -> MCQ-05, RRQ-05/06; outcome 4 -> MCQ-07/08, RRQ-08/09, ERQ-04; outcome 5 -> MCQ-09/10, RRQ-01/04, ERQ-05), verified by reading every Urdu stem and scheme',
      'SLO trace preserved in the frontmatter that carries both SLOs (index, unit-assessment, unit-teacher-notes); the topic-level clo_refs divergence is recorded as a completeness finding, not an authority failure, because the outcomes themselves are taught and assessed',
      'The primary-document posture is preserved in Urdu: index.mdx:85-88 (obtain a copy, read alongside 4.2), topic-02.mdx:100-102 (full text matters and is not here; referenced not reproduced), unit-teacher-notes.mdx:22-33',
      'npm run check:depth-gate exit 0 (logs-feat023-r1/check-depth-gate.log)',
    ],
  },
  {
    id: 'sources',
    status: 'fail',
    evidence: [
      'POSITIVE: the Isore quotations retain their supporting meaning - topic-04.mdx:93-98 preserves "often conflicting" -> "اکثر متضاد" and "but not necessarily incompatible" -> "مگر لازمی ناممکنِ امتزاج نہیں", and the RRQ-4 marking guard (unit-assessment.mdx:219-221) preserves "conflicting but not incompatible" verbatim in meaning',
      'DEFECT: topic-04.mdx:95 renders Isore\'s "countries rarely use a pure form of either" as "ملک شاید کسی خالص شکل استعمال نہیں کرتے" - a measured frequency claim becomes epistemic uncertainty ("perhaps"); the same shift sits inside the fig-U4-8.ur.svg caption ("ملک شاید کسی خالص شکل کا استعمال نہیں کرتے")',
      'DEFECT: topic-03.mdx:111-115 degrades the Isore scoping caveat twice: "high-stakes schemes built on standardised test scores" -> "اعلیٰ دہشت والے سکیموں" (high-terror schemes), and "a well-founded risk to design against" is reversed into "ڈیزائن کے خلاف محفوظ رکھنے والا خطرہ" (a risk that protects against design)',
      'DEFECT: topic-02.mdx:108-110 renders Goe\'s "no single measure that captures every way a teacher contributes" with "استاد کے تعاون" (the teacher\'s cooperation) for "contributes"',
      'POSITIVE: every D-2026-0001 unverifiable-sources disclosure survives at point of use in Urdu - the 2009 MoE/UNESCO/USAID origin (topic-01.mdx:104-106, topic-02.mdx:41-45), the ten-names secondary-corroboration caveat (topic-02.mdx:100-102), the teacher-notes verification limitation (unit-teacher-notes.mdx:30-33), and the fig-U4-4.ur.svg in-figure caveat "کسی کا جائزہ لینے سے پہلے، خود اپنے بھی، اسے بنیادی دستاویز میں پڑھیے"',
      'POSITIVE: the hedged near-universal claim is preserved with its hedge (topic-01.mdx:84-86 "تقریباً عام" + "پچھلے تیس برسوں میں"), so the unesco-teacher-ethics declaration still covers exactly what the Urdu asserts',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'Every U4-NN row of coverage/unit-04.md maps to a real Urdu section heading under its topic\'s وضاحت, verified by reading each: topic-01 "پیشہ ورانہ معیار کا تصور..." / "اساتذہ کے معیارات پر عالمی نقطہ نظر" / "...قومی نقطہ نظر" / "معیارات کا استعمال بطور..."; topic-02 "...ساخت" / "...دائرے..." / "اشاریے، اور ایک دائرہ..."; topic-03 "...اپنی مشق کے جائزے..." / "...شہادت بنانا"; topic-04 "...لائسنس اور سند بندی" / "جائزہ، اور تشکیلی اور مجموعی مقاصد کا فرق" / "جب معیار اس مقصد کے لیے..."',
      'The ten NPST standard names are complete, in order and meaning-matched in Urdu (topic-02.mdx:73-82), using bank-consistent terms (تشخیص for Assessment, ضابطہ اخلاق for code of conduct, مسلسل پیشہ ورانہ ترقی for CPD), with the secondary-corroboration caveat intact at topic-02.mdx:100-102',
      'All four topics carry the full nine-part cycle in Urdu (classroom situation, وضاحت, سرگرمی, اپنی سمجھ جانچیں, خلاصہ, خود جائزہ فہرست, practicum, مجموعی کام with mini-rubric, مزید مطالعہ); no heading-only stubs found in any of the seven file pairs',
      'npm run check:depth-gate exit 0; npm run validate:content exit 0 (EN-UR structural parity gate)',
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      'All 10 Urdu MCQs were solved blind from Urdu alone before any key was read; derived answers 1-ب, 2-د, 3-الف, 4-ج, 5-ب, 6-د, 7-ج, 8-الف, 9-ب, 10-ج agree with the Urdu key (unit-assessment.mdx:181-195) and with the English key (b,d,a,c,b,d,c,a,b,c); option order الف ب ج د maps one-to-one onto a b c d with no reordering',
      'All ten RRQ mark schemes sum to their stated totals in Urdu (4,7,8,4,5,4,5,9,9,4 = 59), identical to the English; the RRQ-4 anti-answer guard is preserved ("ایسا جواب نمبر نہ دیجیے جس کا نتیجہ یہ ہو کہ ایک دستاویز دونوں نہیں سنبھال سکتی", unit-assessment.mdx:219-221)',
      'All five ERQ rubrics are present with their four criteria and Limited/Adequate/Strong bands, and the 10-cap is preserved: "جو جواب تجزیہ، جائزہ یا تخلیق کے معیار پر \'مناسب\' تک نہ پہنچے وہ مجموعی طور پر 10 سے اوپر نہیں جا سکتا" (unit-assessment.mdx:251-252)',
      'No translated item reveals an answer or lowers cognitive demand; the two stem-level shifts (MCQ-3 option د "working as intended" -> "جیسا کام کرتا ہوا"; MCQ-8 stem word order) do not change keys, scoring or demand and are recorded as advisories',
      'The 25-item bank is complete in Urdu (10/10/5) with matching Bloom labels (یاد رکھنا/سمجھنا/اطلاق/تجزیہ/جائزہ/تخلیق)',
    ],
  },
  {
    id: 'accessibility',
    status: 'pass',
    evidence: [
      'renders-feat023-r1/render-inspect.log and render-inspect.json: all 7 Urdu pages inspected at 1280x900, 360x780 dsf2 isMobile and A4 794px print emulation against the shared two-locale build (freshness verified in logs-feat023-r1/site-build.log) served at 127.0.0.1:4624, chromium 149.0.7827.0; defects: 0',
      '0 images without alt, 0 visible broken images, 0 skipped heading levels, 0 horizontal document overflow on any page at any viewport; every figure carries a translated Urdu alt (verified in the rendered DOM, render-inspect.log section A)',
      'At 360px all eight figures are their own scroll containers (figure scrollWidth 880-940 vs client 328) and all five ERQ rubric tables fit without scrolling in Urdu; nothing is unreachable',
      'A4 print: clippedElems=0 on every page, all figure right edges 717-777 within the 794px page, the whole جوابات اور نمبر دہی کی رہنمائی section prints intact (5 Urdu answer headings detected in print emulation); PDFs emitted for all 7 pages',
      'The G3 accessibility advisories (fig-U4-3 caption sentence living only inside the SVG, fig-U4-4 alt not carrying the full force of the in-figure caveat) carry identically to the Urdu because the Urdu alts are faithful translations of the English alts; no new accessibility defect was found',
    ],
  },
  {
    id: 'completeness',
    status: 'fail',
    evidence: [
      'DEFECT: a literal U+FFFD replacement character sits inside the word چاہتا at i18n/ur/.../unit-04/topic-04.mdx:100 ("جو نظام دونوں چا�تا ہے"), i.e. student-facing text carries a corrupted codepoint that renders as a broken glyph (confirmed visually in renders-feat023-r1/crop-topic-04-ufffd.png and in the built page)',
      'DEFECT: frontmatter clo_refs diverge - Urdu topic-02.mdx, topic-03.mdx and topic-04.mdx each bind SLO:EFMP-302-4-1 where the English binds SLO:EFMP-302-4-2 (defect-locators.log)',
      'DEFECT: typo-level text errors - "متبیل" for متبادل (topic-04.mdx:215,225; unit-assessment.mdx:173,296), "گرما سکتا" for گرا سکتا (topic-04.mdx:156), "سنتا ہے" for لگتا ہے (topic-04.mdx:29), "استعلام" for استعمال (topic-01.mdx:243), a doubled Urdu full stop (topic-03.mdx:94)',
      'DEFECT: small omissions - "what happens" dropped from the index topic-4.4 list entry (index.mdx:73-74), "so often" dropped from the appraisal sentence (index.mdx:82), "of self-evaluation" dropped from the topic-04 summative task (topic-03.mdx:188), "address why" lowered to "say whether" (topic-02.mdx:218)',
      'POSITIVE: apart from these, all seven file pairs align section-for-section and paragraph-for-paragraph; every English passage has an Urdu counterpart and no untranslated stub or heading-only section was found',
    ],
  },
  {
    id: 'semantics',
    status: 'fail',
    evidence: [
      'DEFECT (reversal): index.mdx:78-79 - English "Topic 4.3 cannot be done without 4.2" is rendered "اور 4.3 کے بغیر 4.2 مکمل نہیں ہو سکتا" (without 4.3, 4.2 cannot be completed): the instructional dependency is inverted',
      'DEFECT (reversal): topic-03.mdx:177-178 - "whether you were tempted at any point to improve the record instead of the practice" becomes "کیا آپ کسی بھی لمحے پر ریکارڈ بہتر کرنے کے بجائے مشق بہتر کرنے کے لیے آمادہ تھے" (tempted to improve the practice instead of the record); unit-teacher-notes.mdx:92-93 repeats the same inversion in the debrief question the English calls the unit\'s most important learning moment',
      'DEFECT (negation lost): unit-teacher-notes.mdx:93-94 - "does not survive being rushed" is rendered "جلدی کرنے سے بچ جاتا ہے" (survives being rushed), the opposite claim, in the same sentence as the reversal above',
      'DEFECT (agent reversed): topic-04.mdx:10 - "what each purpose produces in the person appraised" becomes "ہر مقصد جائزہ لینے والے میں کیا پیدا کرتا ہے" (in the appraiser)',
      'DEFECT (concept substitution): topic-04.mdx:107 - "It is what the incentive structure asks for" becomes "یہ وہی ہے جو اشاریہ ڈھانچہ مانگتا ہے" (the indicator structure), substituting the unit\'s own term اشاریہ for "incentive"',
      'DEFECT (modal force): topic-04.mdx:95 - "countries rarely use a pure form of either" becomes "ملک شاید ... استعمال نہیں کرتے" (perhaps do not use), converting Isore\'s frequency finding into doubt (cross-cited under sources)',
      'Smaller shifts, recorded for repair: "pursue teacher quality" -> "یقینی بنانے" (ensure; matches the course guide\'s own "ensuring" so defensible), "an incidental flaw" -> "معمولی خامی" (minor), "whose climate is hostile" -> "خطرناک" (dangerous), "in a fortnight" -> "آدھے میعاد میں" (half a term), "They overlap" -> "چھیں چھیں کرتے ہیں"',
    ],
  },
  {
    id: 'terminology',
    status: 'fail',
    evidence: [
      'POSITIVE: all four UR key_terms match the frozen terminology bank exactly - پیشہ ورانہ معیارات, اساتذہ کے لیے قومی پیشہ ورانہ معیارات, اساتذہ کا لائسنس, اساتذہ کی سند بندی (terminology.csv rows for EFMP-302 Unit 4); the bank\'s ضابطہ اخلاق, تشخیص, نصاب and مسلسل پیشہ ورانہ ترقی are used consistently in the ten-standards list and prose',
      'DEFECT (systematic): "Stakes" is rendered دہشت (terror) at topic-01.mdx:96 (the framework-difference bullet label) and :193 (summary), and "high-stakes" as "اعلیٰ دہشت" at topic-03.mdx:113; the correct idiom داؤ پر is used for "at stake" in fig-U4-7.ur.svg and the topic-04 alt, proving دہشت is an error, not a choice',
      'DEFECT (systematic): "tension"/"conflict" is rendered تناوب (alternation) at topic-01.mdx:141, topic-03.mdx:112, topic-04.mdx:97 and unit-assessment.mdx:211 - a wrong word in the unit\'s central formative/summative argument',
      'DEFECT (systematic): "a serving teacher" is rendered فرضی استاد (a hypothetical teacher) at topic-01.mdx:128, topic-04.mdx:57 and :173, and "serving practice" as فرضی مشق at unit-assessment.mdx:41; the same word is used correctly for "hypothetical" at unit-teacher-notes.mdx:28, so the serving readings are mistranslations',
      'DEFECT (collision): "Integrative" (ERQ-2) is rendered مجموعی at unit-assessment.mdx:9 and :158 and unit-teacher-notes.mdx:105 - the exact word the unit uses for "summative" (مجموعی جائزہ), so the integrative item is labelled "summative" inside the assessment file',
      'Concept graph: 10 of the 13 authored labels in concepts/unit-04.md are confirmed (CON:4-2, -4-3, -4-4, -4-5, -4-6, -4-8, -4-9, -4-10, -4-13, -4-16); CON:4-12 "خود تشخیصی کا دائرہ" is inconsistent with the prose on both halves (prose: خود جائزہ for self-evaluation, چکر for cycle; the label also reuses دائرہ, which already serves "scope" and "domains"); CON:4-15 uses جامع where the prose consistently uses مجموعی for summative; CON:4-11 renders "trade-off" as خطرہ (danger)',
      'دائرہ carries three distinct English senses in this unit (scope at topic-01.mdx:93, domains at topic-02.mdx:67, and cycle in CON:4-12), an avoidable ambiguity for a student',
    ],
  },
  {
    id: 'register',
    status: 'fail',
    evidence: [
      'Broken or ungrammatical constructions in student-facing prose: "شہادت کے قابلِ تفصیل" for "evidence-specific statement" (topic-01.mdx:188, unit-assessment.mdx:22), "معیار معیار کو نظر آنے لگاتا ہے" (index.mdx:36-37, the same word as subject and object), "چھیں چھیں کرتے ہیں" for "They overlap" (topic-01.mdx:73, unit-teacher-notes.mdx:54), "پیچھا کر سکے" for "could follow it" (topic-02.mdx:228 rubric Register row), "لے کر نہیں آنا" for "rather than recited" (unit-teacher-notes.mdx:106), "معیارات کے کاموں کی روایت والی روانی" (unit-teacher-notes.mdx:109-110), "جائزے کی مشاہدے کے ذریعے حقیقی حد" (topic-02.mdx:208)',
      'Inconsistent treatment of English terms: the ordinary adverb "formally" is left in Latin script inside an Urdu sentence (topic-01.mdx:223) where "رسمی طور پر" was used correctly elsewhere (unit-teacher-notes.mdx:204); "بہ طور ڈیفالٹ" (topic-04.mdx:102,113; unit-assessment.mdx:219) embeds English "default" in academic-plain prose',
      'The compression "حاصل ممکن" for "achievable" (9 loci, defect-locators.log) reads as a clipped calque against the natural "حاصل کرنا ممکن"',
      'POSITIVE: the register is otherwise genuinely academic-plain - the classroom situations, activities and rubrics read naturally in Nastaliq Urdu, technical terms are glossed at first use, and the defective constructions are local (roughly 20 passages in ~1,600 lines), not pervasive',
    ],
  },
  {
    id: 'rtl',
    status: 'pass',
    evidence: [
      'Rendered Urdu pages verified RTL at 1280x900, 360x780 and A4 print: right-hand sidebar, right-aligned text, and the self-hosted Noto Nastaliq Urdu webfont rendering the page prose (desktop-topic-02.png, desktop-topic-04.png, crop-narrow360-topic-02.png read by this reviewer)',
      'RTL mirroring of the Urdu figures verified from the committed SVG geometry: fig-U4-7.ur.svg runs its seven stations right-to-left (داخلہ at x=830 down to دوبارہ لائسنس at x=80, confirmed visually in crop-topic-04-timeline.png), fig-U4-1.ur.svg mirrors the comparison table (standard column rightmost, row labels text-anchor=end at x=868), and fig-U4-3.ur.svg right-aligns the bands (text-anchor=end at x=816/818) with indicator boxes in RTL order',
      'Bidi, numerals and embedded Latin render correctly in the pages read: Western digits inside RTL prose (400 تا 450, 25 منٹ), the MCQ option markers الف) ب) ج) د), bold keys (ب، د، الف، ج) in the answer key, and Latin citations (Isoré, OECD, B.Ed, NPST, USAID) inside RTL sentences, with no bidi punctuation or ordering defect observed (print-a4-screen-unit-assessment.png)',
      'All 16 Urdu figure variants measure clean: scripts/measure-figure-text.mjs exit 0 (no viewBox overflow, no wordmark overprint) and the text-overlap instrument (logs-feat023-r1/measure-text-overlap.mjs) found 0 text-on-text candidates, 0 wordmark collisions and 0 bbox contacts across all 16 files (renders-feat023-r1/text-overlap-measurement.json)',
      'LIMITATION recorded: this host has no Nastaliq system font (fc-list :lang=ur -> FreeSerif/FreeMono/Unifont) and the SVGs embed no font, so figure-INTERNAL labels were measured and read under Chromium\'s fallback Arabic shaping; the font stack is the repo-wide pattern (identical in the accepted unit-03 and unit-05 .ur.svg figures). Page prose Nastaliq was verified visually and is unaffected',
    ],
  },
];

const findings = [
  {
    severity: 'blocking',
    resolved: false,
    message: 'CORRUPTED CHARACTER IN STUDENT-FACING TEXT. i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-04/topic-04.mdx:100 contains a literal U+FFFD replacement character inside the word چاہتا: "جو نظام دونوں چا\\uFFFDتا ہے اسے پہلے سے طے کرنا ہوگا". The intended text is "جو نظام دونوں چاہتا ہے" ("a system that wants both"). The corruption is in the source, in the built page (verified: exactly one U+FFFD in both), and renders as a broken glyph (renders-feat023-r1/crop-topic-04-ufffd.png). Repair: restore the missing ہ (U+06C3) at topic-04.mdx:100.',
  },
  {
    severity: 'blocking',
    resolved: false,
    message: 'INSTRUCTIONAL-DEPENDENCY REVERSAL IN THE INDEX. English index.mdx:69-70 reads "Topic 4.3 cannot be done without 4.2"; the Urdu index.mdx:78-79 reads "اور 4.3 کے بغیر 4.2 مکمل نہیں ہو سکتا" - "without 4.3, 4.2 cannot be completed". The numbers are swapped, so the stated prerequisite relation is inverted. A trainee reading the Urdu "How to use this unit" is told the opposite of the English (and of the unit\'s actual design, which the same paragraph\'s "ترتیب سے پڑھیے" only partly rescues). Repair: "اور 4.2 کے بغیر 4.3 مکمل نہیں ہو سکتا".',
  },
  {
    severity: 'blocking',
    resolved: false,
    message: 'THE "IMPROVE THE RECORD" QUESTION IS INVERTED IN BOTH PLACES IT APPEARS. (1) topic-03.mdx:176-178, practicum: English "be explicit about whether you were tempted at any point to improve the record instead of the practice" is rendered "کیا آپ کسی بھی لمحے پر ریکارڈ بہتر کرنے کے بجائے مشق بہتر کرنے کے لیے آمادہ تھے" - tempted to improve the PRACTICE instead of the record. (2) unit-teacher-notes.mdx:92-93, the debrief question the English calls "the unit\'s most important learning moment": same inversion. The question exists to catch the temptation to game the record; the Urdu asks about the good behaviour. (3) In the same teacher-notes sentence, "does not survive being rushed" loses its negation: "جلدی کرنے سے بچ جاتا ہے" says the admission DOES survive being rushed. Repairs: swap the objects back in both files ("مشق کے بجائے ریکارڈ بہتر کرنے کے لیے آمادہ تھے") and restore the negation ("جلدی کرنے سے ضائع ہو جاتا ہے" or "جلدی میں نہیں بچتا").',
  },
  {
    severity: 'blocking',
    resolved: false,
    message: 'SYSTEMATIC WRONG TERM: "STAKES" RENDERED AS دہشت (TERROR). topic-01.mdx:96 (the framework-difference bullet label "Stakes.") and :193 (summary "differ in scope, granularity and stakes") use دہشت; topic-03.mdx:113 renders "high-stakes schemes" as "اعلیٰ دہشت والے سکیموں" in the Isore scoping caveat. The figure author used the correct idiom - fig-U4-7.ur.svg carries "داؤ پر" for "at stake", and the topic-04 alt says "کیا داؤ پر ہے" - so دہشت is a translation error, not a terminology choice. A student reads "frameworks differ in terror". Repairs: "داؤ" or "نتیجہ خیز ہونے کا درجہ" for stakes; "اعلیٰ داؤ والے" or "اہم فیصلوں سے جُڑے" for high-stakes.',
  },
  {
    severity: 'blocking',
    resolved: false,
    message: 'SYSTEMATIC WRONG TERM: "TENSION"/"CONFLICT" RENDERED AS تناوب (ALTERNATION). Four loci in the unit\'s central argument: topic-01.mdx:141 ("found this tension to be the central design problem"), topic-03.mdx:112 ("records the conflict between developmental and accountability purposes"), topic-04.mdx:97 ("The tension is real and it is the design problem of the field"), unit-assessment.mdx:211 (RRQ-3 scheme "naming a real tension between two requirements"). تناوب means alternation/rotation and asserts the opposite of a pulling conflict. Repairs: تناؤ (tension) / تنازع or تضاد (conflict) at all four loci.',
  },
  {
    severity: 'blocking',
    resolved: false,
    message: 'SYSTEMATIC WRONG WORD: "A SERVING TEACHER" RENDERED AS فرضی استاد (A HYPOTHETICAL TEACHER). topic-01.mdx:128 ("A serving teacher uses the standard..."), topic-04.mdx:57 ("Appraisal is the periodic judgement of a serving teacher\'s practice"), topic-04.mdx:173 and unit-assessment.mdx:41 ("serving practice" -> فرضی مشق). The translator uses فرضی correctly for "hypothetical" at unit-teacher-notes.mdx:28, so these four are misreadings of "serving". Repair: زیرِ خدمت at all four loci.',
  },
  {
    severity: 'blocking',
    resolved: false,
    message: 'TERMINOLOGY COLLISION: "INTEGRATIVE" (ERQ-2) RENDERED AS مجموعی, THE UNIT\'S WORD FOR "SUMMATIVE". unit-assessment.mdx:9 (blooms_summary "one integrative item"), :158 (the ERQ-2 label "**Integrative.**" -> "**مجموعی۔**") and unit-teacher-notes.mdx:105 ("ERQ 2 is the integrative item"). The same file\'s section heading "## Summative assessment" is "مجموعی جائزہ", so the Urdu assessment labels its integrative item "summative" - actively misleading in the one file where مجموعی is a loaded term. Repair: "جامع" is also taken (bank pair for summative); use "یکجا کرنے والا" or "مربوط" for integrative, or spell it as "بین الموضوعی".',
  },
  {
    severity: 'blocking',
    resolved: false,
    message: 'CONCEPT SUBSTITUTION IN A LOAD-BEARING SENTENCE. topic-04.mdx:107: English "It is what the incentive structure asks for" (why a teacher rationally treats a combined document as summative) is rendered "یہ وہی ہے جو اشاریہ ڈھانچہ مانگتا ہے" - "it is what the INDICATOR structure asks for", substituting the unit\'s own term اشاریہ (indicator) for "incentive". The sentence explains behaviour by consequences, not by indicators. Repair: "ترغیبی ڈھانچہ" (or "انعام و سزا کا ڈھانچہ") for incentive structure.',
  },
  {
    severity: 'blocking',
    resolved: false,
    message: 'FRONTMATTER clo_refs DIVERGE FROM THE ENGLISH IN THREE FILES. Urdu topic-02.mdx:9, topic-03.mdx:9 and topic-04.mdx:9 each bind "SLO:EFMP-302-4-1" where the English files bind "SLO:EFMP-302-4-2" (the concept graph maps every 4.2-4.4 topic to SLO 4-2; only topic-01 should carry 4-1). The parity gate does not compare clo_refs, so this passes validate:content while misstating the outcome binding in metadata consumed by the content index. Repair: set SLO:EFMP-302-4-2 in all three Urdu topic frontmatters.',
  },
  {
    severity: 'blocking',
    resolved: false,
    message: 'MODAL-FORCE SHIFT ON A SOURCED CLAIM. topic-04.mdx:95: Isore\'s "countries rarely use a pure form of either" (a measured frequency finding) is rendered "ملک شاید کسی خالص شکل استعمال نہیں کرتے" ("countries perhaps do not use..."), and the fig-U4-8.ur.svg caption carries the same "شاید". The English asserts rarity; the Urdu expresses doubt about the fact. This sits inside the passage the unit uses to temper topic-03\'s separation imperative, so the hedge\'s character matters. Repair: "ملک بہت کم کسی ایک کی خالص شکل استعمال کرتے ہیں".',
  },
  {
    severity: 'blocking',
    resolved: false,
    message: 'REVERSED AGENT IN THE TOPIC-04 FRONTMATTER. topic-04.mdx:10 blooms_summary: English "what each purpose produces in the person appraised" (the teacher being appraised) is rendered "ہر مقصد جائزہ لینے والے میں کیا پیدا کرتا ہے" - what each purpose produces in the APPRAISER. The formative/summative distinction is about what happens to the appraised teacher (candour vs careful self-presentation). Repair: "جس کا جائزہ لیا جاتا ہے اس میں".',
  },
  {
    severity: 'blocking',
    resolved: false,
    message: 'DIRECTION GARBLE IN THE ISORE SCOPING CAVEAT. topic-03.mdx:113-115: "treat the general claim as a well-founded risk to design against" is rendered "ڈیزائن کے خلاف محفوظ رکھنے والا خطرہ سمجھیے" - "understand it as a risk that keeps you safe against design", reversing the direction of the designing. The first half of the sentence ("not a measured law about every mixed system") survives. Repair: "ایسا خطرہ سمجھیے جس کے خلاف ڈیزائن کرنا پڑتا ہے".',
  },
  {
    severity: 'blocking',
    resolved: false,
    message: 'WRONG-WORD ERRORS THAT PRODUCE NONSENSE OR WRONG REFERENTS. (a) topic-03.mdx:99: "Counts, tallies, notes kept over time" -> "گنتی، تالے، وقت کے ساتھ رکھے گئے نوٹ" - تالے means LOCKS; read "counts, locks, notes". Repair: "گنتیاں، شمار کے نشان". (b) topic-03.mdx:50: "not the one you are weakest at in the abstract" -> "خلاصی طور پر کمزور" - خلاصی means escape/release. Repair: "نظری طور پر" or "مجرّد طور پر". (c) topic-01.mdx:243 (mini-rubric row 2): "Names the use in play" -> "زیرِ بحث استعلام کا نام لیتا ہے" - استعلام means enquiry; should be استعمال. (d) "متبیل" (not an Urdu word; typo for متبادل) at topic-04.mdx:215, :225 and unit-assessment.mdx:173, :296 - in the ERQ-5 stem and its rubric row label. (e) topic-04.mdx:156: "گرما سکتا ہے" (can heat) for "گرا سکتا ہے" (can collapse) in the redesign activity. (f) topic-04.mdx:29: "ناقابلِ جواب سنتا ہے" for "sounds unanswerable" - سنتا ہے is ungrammatical here; should be لگتا ہے.',
  },
  {
    severity: 'uncertain',
    resolved: false,
    message: 'THE G3 DEPENDENCY IS NOT SATISFIED BY SIGNED EVIDENCE (G-2026-65 pattern). The G5 rubric requires accepted G3 evidence for the exact English inputs; the contract\'s automatic path requires a fresh SIGNED G3 report. ADR-0019 blocks agent certification and no protected signing host is provisioned, so no signed G3 evidence exists for EFMP-302 Unit 4. This review proceeded, per the parent\'s instruction, with the best available G3 evidence - the advisory agent pass agent-g3-efmp302-u4-feat023-r1.json (disposition pass, all seven criteria, reviewer agent:g3-reviewer, unsigned) - as the comparison base, after verifying that all 8 English unit inputs bound here are byte-identical (digest-equal) to that report\'s own input_manifest binding (logs-feat023-r1/manifest-verify.log). The dependency therefore rests on advisory, unsigned evidence and cannot be resolved by any content repair: it requires the protected signing host and registry activation, or an owner-recorded human G3 acceptance of these English bytes. Recorded as uncertain and unresolved; it forbids a pass on its own, independent of the content findings.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'REGISTER: BROKEN OR UNNATURAL CONSTRUCTIONS TO REPAIR (none inverts meaning). "شہادت کے قابلِ تفصیل" for "evidence-specific statement" (topic-01.mdx:188, unit-assessment.mdx:22; the body\'s "شہادت دینے کے لیے اتنا مخصوص" is fine - reuse it); "معیار معیار کو نظر آنے لگاتا ہے" (index.mdx:36-37, same word as subject and object for standard/quality); "چھیں چھیں کرتے ہیں" for "They overlap" (topic-01.mdx:73, unit-teacher-notes.mdx:54; use "ایک دوسرے پر چھاؤ" or "آپس میں مداخلت"); "پیچھا کر سکے" for "could follow it" in the topic-02 rubric Register row (topic-02.mdx:228; use "سمجھ سکے"); "لے کر نہیں آنا" for "rather than recited" (unit-teacher-notes.mdx:106; likely "رٹ کر نہیں آنا"); "معیارات کے کاموں کی روایت والی روانی" (unit-teacher-notes.mdx:109-110); "جائزے کی مشاہدے کے ذریعے حقیقی حد" (topic-02.mdx:208); "حاصل ممکن" compression for "achievable" (9 loci; use "حاصل کرنا ممکن"); the ordinary adverb "formally" left in Latin script (topic-01.mdx:223) where "رسمی طور پر" is used correctly at unit-teacher-notes.mdx:204; "بہ طور ڈیفالٹ" (topic-04.mdx:102,113; unit-assessment.mdx:219; use "بغیر کہے/خود بخود"); the doubled Urdu full stop at topic-03.mdx:94.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'SMALLER SEMANTIC SHIFTS AND OMISSIONS (meaning recoverable, listed for repair). "what happens" dropped from the index topic-4.4 entry (index.mdx:73-74); "so often" dropped (index.mdx:82); "a school\'s handling of self-evaluation" loses "of self-evaluation" (topic-03.mdx:188); topic-02 summative "address why ... is or is not acceptable" lowered to "say whether" (topic-02.mdx:218); MCQ-3 option د "summative appraisal working as intended" -> "مجموعی جائزہ جیسا کام کرتا ہوا" (working like summative appraisal); MCQ-8 stem word order garbled but answerable; "in a fortnight" -> "آدھے میعاد میں" (half a term, unit-teacher-notes.mdx:89); "pursue teacher quality" -> "یقینی بنانے" (ensure - matches the course guide\'s own "ensuring", so defensible); "an incidental flaw" -> "معمولی خامی" (minor); "whose climate is hostile" -> "خطرناک" (dangerous); Goe\'s "every way a teacher contributes" -> "استاد کے تعاون" (cooperation, topic-02.mdx:108-110); "It is a mixture of kinds" -> "اقسام کا ملاپ" (topic-02.mdx:91); "nested" -> "جڑواں" (twinned, topic-02.mdx:47 and the fig-U4-3 alt); "trade-off" -> "سودا" (topic-02.mdx:123, unit-assessment.mdx:33; CON:4-11 uses خطرہ); fig-U4-2 label "ایسا زبان" (gender agreement, should be ایسی زبان) and "والد" (father) for "a parent"; fig-U4-6 "سب سے کم قابل" for "least worth having".',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'CONCEPT-GRAPH LABELS: 10 of the 13 authored Urdu labels in specs/content/efmp-302/concepts/unit-04.md are confirmed and can be promoted to the terminology bank (CON:4-2 معیار، ضابطہ اور نصاب کا فرق; -4-3 معیار کا قابلِ شہادت ہونا; -4-4 اساتذہ کے معیارات پر عالمی نقطہ نظر; -4-5 معیار کے چار استعمال; -4-6 چار استعمالات کا باہمی تضاد; -4-8 معیار کی تین حصوں پر مشتمل ساخت; -4-9 معیارات کے دائرے; -4-10 اشاریہ; -4-13 اشاریے کے لیے شہادت کی اقسام; -4-16 مقاصد کے اختلاط سے ریکارڈ کی خرابی). Two need rework before promotion: CON:4-12 "خود تشخیصی کا دائرہ" disagrees with the prose on both halves (prose uses خود جائزہ for self-evaluation and چکر for cycle; the label also spends دائرہ, which already means scope and domains) - suggest "خود جائزہ کا چکر"; CON:4-15 "تشکیلی اور جامع جائزے کے مقاصد" uses the bank\'s other accepted summative variant جامع where this unit\'s prose consistently uses مجموعی - align to "تشکیلی اور مجموعی جائزوں کے مقاصد". CON:4-11 renders "trade-off" as خطرہ (danger); consider "سمجھوتا".',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'ENVIRONMENT LIMITATION ON FIGURE-INTERNAL NASTALIQ VERIFICATION. This host has no Noto Nastaliq Urdu or Jameel Noori Nastaleeq system font (fc-list :lang=ur lists only FreeSerif/FreeMono/Unifont), and the .ur.svg files embed no font, so figure-internal labels were measured and read under Chromium\'s fallback Arabic shaping. The font stack is the repo-wide pattern (identical in the accepted unit-03 and unit-05 Urdu figures), all labels were verified legible, correctly ordered and collision-free under those metrics, and the page prose (webfont-loaded) was visually verified in Nastaliq. True Nastaliq metrics are typically taller than the fallback\'s; a host with the font installed should re-run the geometry instruments before any future pass relies on them. Recorded as a limitation, not a defect.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'STALE GOVERNANCE NOTE (EN-side, no Urdu action). specs/content/efmp-302/figures/unit-04.md still says the unit "has no Urdu mirror on disk, so the bilingual figure rule does not apply yet". The Urdu mirror and its 16 .ur.svg variants now exist and are bound by this review\'s manifest; the note is outdated. Repair belongs to the author/owner (this reviewer does not edit governance tables); recorded so the next manifest preparation can correct it.',
  },
  {
    severity: 'advisory',
    resolved: true,
    message: 'INDEPENDENCE, INPUT BINDING AND BUILD FRESHNESS - positive checks. INDEPENDENCE: this session authored, translated or repaired no byte of EFMP-302 Unit 4 in either locale; identity agent:g5-reviewer, reviewer_run_id agent-g5-efmp302-u4-feat023-r1, author_run_id commit:c138103 (the commit whose bytes the manifest binds). No human initials appear in this report. MANIFEST: all 127 bound paths re-verified against the prepared manifest with the contract\'s own inputManifest(); 0 missing, 0 added, 0 digest mismatches, skill_digest matches, 0 dirty bound inputs (logs-feat023-r1/manifest-verify.log); the 8 English unit inputs are digest-identical to the G3 feat023-r1 binding. BUILD: no rebuild was run; the shared two-locale build at build/ (mtime 2026-09-24T21:39Z, commit c138103) was probed and serves Unit 4\'s current Urdu bytes, including every defect string and the single U+FFFD, plus all 16 Urdu figure variants (logs-feat023-r1/site-build.log); render inspection ran against that build. SOURCE HANDLING: unit text, figure labels, source excerpts, governance tables and the prior G3 report were read as data; nothing embedded in them was executed or treated as an instruction.',
  },
];

const commands = [
  { name: 'manifest-verify', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r1/manifest-verify.log' },
  { name: 'validate:content', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r1/validate-content.log' },
  { name: 'check:depth-gate', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r1/check-depth-gate.log' },
  { name: 'check:figures', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r1/check-figures.log' },
  { name: 'check:no-em-dash', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r1/check-no-em-dash.log' },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r1/check-no-answer-keys.log' },
  { name: 'check:docs-sync', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r1/check-docs-sync.log' },
  { name: 'site-build', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r1/site-build.log' },
  { name: 'measure-figure-text', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r1/measure-figure-text.log' },
  { name: 'measure-text-overlap', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r1/measure-text-overlap.log' },
  { name: 'render-review', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r1/render-review.log' },
];

// Evidence manifest: every log, instrument, measurement and render artifact.
const evidence = {};
const addDir = (dir, filter = () => true) => {
  for (const name of readdirSync(dir).sort()) {
    const p = `${dir}/${name}`;
    const st = statSync(p);
    if (st.isFile() && filter(name)) evidence[p] = sha256(p);
  }
};
addDir('specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r1');
addDir('specs/content/efmp-302/reviews/unit-04/G5/renders-feat023-r1');

const report = {
  schema_version: 1,
  course_code: 'EFMP-302',
  unit_no: 4,
  stage: 'G5',
  disposition: 'revise',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'commit:c138103',
  reviewer_run_id: 'agent-g5-efmp302-u4-feat023-r1',
  model: 'LongCat-2.0',
  started_at: startedAt,
  completed_at: completedAt,
  skill_digest: manifest.skill_digest,
  g3_report: 'specs/content/efmp-302/reviews/unit-04/G3/agent-g3-efmp302-u4-feat023-r1.json',
  input_manifest: manifest.input_manifest,
  criteria,
  findings,
  commands,
  evidence_manifest: evidence,
  supersedes: null,
  summary: 'Fresh G5 cycle-1 Urdu review of EFMP-302 Unit 4 (feature 023), binding 127 inputs at commit c138103 against the prepared feat023-r1 manifest (all digest-verified; the 8 English unit inputs are byte-identical to the advisory G3 feat023-r1 binding). Disposition revise. Five criteria pass (authority, coverage, assessment, accessibility, rtl), five fail (sources, completeness, semantics, terminology, register). All mandatory commands exit 0; the shared build was verified fresh for this unit\'s Urdu pages and no rebuild was run; render inspection (7 pages, 3 viewports, 16 Urdu figure variants) found 0 defects. Assessment equivalence holds: all 10 Urdu MCQs solved blind match the Urdu and English keys, option order الف ب ج د maps to a b c d, all RRQ schemes sum to 59, the ERQ 10-cap and the RRQ-4 marking guard are preserved. The ten NPST standard names are complete and ordered with the secondary-corroboration caveat intact, and every D-2026-0001 disclosure survives at point of use. Against that: one corrupted codepoint (U+FFFD inside چاہتا, topic-04.mdx:100), one inverted instructional dependency (index), the "improve the record instead of the practice" question inverted in both files that carry it plus a lost negation in the same teacher-notes sentence, three systematic wrong terms (stakes -> دہشت "terror"; tension/conflict -> تناوب "alternation"; serving -> فرضی "hypothetical"), the integrative ERQ labelled مجموعی (the unit\'s word for summative), "incentive structure" rendered as "indicator structure", "rarely" weakened to "perhaps" on the Isore claim, the appraised person reversed to the appraiser, clo_refs diverging in three topic frontmatters, and a set of nonsense wrong words (تالے "locks" for tallies, خلاصی طور پر for "in the abstract", استعلام for استعمال, متبیل x4, گرما for گرا). Thirteen blocking findings, one uncertain finding (the unsigned-advisory G3 dependency, G-2026-65 pattern) and five unresolved advisories. This report is advisory: not a signature, registry entry, qualification record, tracker transition or acceptance; translation_status remains draft.',
};

const outPath = 'specs/content/efmp-302/reviews/unit-04/G5/agent-g5-efmp302-u4-feat023-r1.json';
writeFileSync(outPath, JSON.stringify(report, null, 1) + '\n');
console.log(`wrote ${outPath}`);
console.log(`criteria: ${criteria.map((c) => `${c.id}=${c.status}`).join(', ')}`);
console.log(`findings: ${findings.length} (${findings.filter((f) => f.severity === 'blocking').length} blocking, ${findings.filter((f) => f.severity === 'uncertain').length} uncertain, ${findings.filter((f) => f.severity === 'advisory').length} advisory)`);
console.log(`evidence files: ${Object.keys(evidence).length}`);
