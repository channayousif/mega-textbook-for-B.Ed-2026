// G5 feat023-r2 report writer: assembles agent-g5-efmp302-u4-feat023-r2.json
// from the review's verified findings, with the evidence manifest hashed from
// the exact saved bytes.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';

const root = new URL('../../../../../../../', import.meta.url).pathname;
const g5dir = 'specs/content/efmp-302/reviews/unit-04/G5';
const prepared = JSON.parse(readFileSync(`${root}${g5dir}/feat023-r2/manifest.json`, 'utf8'));

const sha256 = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const evidence = {};
for (const sub of ['logs-feat023-r2', 'renders-feat023-r2']) {
  for (const f of readdirSync(`${root}${g5dir}/${sub}`)) {
    const rel = `${g5dir}/${sub}/${f}`;
    if (statSync(`${root}${rel}`).isFile()) evidence[rel] = sha256(`${root}${rel}`);
  }
}
const evCount = Object.keys(evidence).length;
const pngCount = Object.keys(evidence).filter((p) => p.endsWith('.png')).length;

const report = {
  schema_version: 1,
  course_code: 'EFMP-302',
  unit_no: 4,
  stage: 'G5',
  disposition: 'revise',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'commit:a483c9e',
  reviewer_run_id: 'agent-g5-efmp302-u4-feat023-r2',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T22:53:16Z',
  completed_at: '2026-09-24T23:25:18Z',
  skill_digest: prepared.skill_digest,
  g3_report: 'specs/content/efmp-302/reviews/unit-04/G3/agent-g3-efmp302-u4-feat023-r1.json',
  input_manifest: prepared.input_manifest,
  supersedes: 'specs/content/efmp-302/reviews/unit-04/G5/agent-g5-efmp302-u4-feat023-r1.json',
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        'Guide Unit 4 sections 4.1-4.4 map one-to-one onto the four Urdu topic files; all 12 coverage/unit-04.md sub-topic sections are present in Urdu with their taught content, re-verified by reading every Urdu section heading and body (topic-01 concept/global/national/four-uses; topic-02 structure/domains/indicators; topic-03 self-evaluation/evidence; topic-04 licensing/appraisal/misuse)',
        'All five index.mdx Unit learning outcomes are taught and assessed in Urdu with the same outcome-to-item mapping as the English (outcome 1 -> MCQ-01/02, RRQ-02; outcome 3 -> MCQ-05, RRQ-05/06; outcome 4 -> MCQ-07/08, RRQ-08/09, ERQ-04; outcome 5 -> MCQ-09/10, RRQ-01/04, ERQ-05), re-verified by reading every Urdu stem and scheme',
        'SLO trace now fully correct in Urdu frontmatter: topic-01 binds SLO:EFMP-302-4-1, topics 02/03/04 bind SLO:EFMP-302-4-2, and index/unit-assessment/unit-teacher-notes bind both - byte-identical to the English clo_refs (repair 9 verified; grep + git show a483c9e)',
        'The primary-document posture is preserved in Urdu: index.mdx:85-88 (obtain a copy, read alongside 4.2), topic-02.mdx:100-102 (full text matters and is not here; referenced not reproduced), unit-teacher-notes.mdx:22-33',
        'npm run check:depth-gate exit 0 (logs-feat023-r2/check-depth-gate.log)'
      ]
    },
    {
      id: 'sources',
      status: 'fail',
      evidence: [
        'POSITIVE: the Isoré quotations retain their supporting meaning in the prose - topic-04.mdx:93-98 preserves "often conflicting" -> "اکثر متضاد" and "but not necessarily incompatible" -> "مگر لازمی ناممکنِ امتزاج نہیں"; the RRQ-4 marking guard (unit-assessment.mdx:219-221) preserves "conflicting but not incompatible"; topic-04.mdx:95 now correctly renders "countries rarely use a pure form of either" as "ملک شاذ و نادر کسی ایک کی خالص شکل استعمال کرتے ہیں" (repair 10 verified in prose)',
        'DEFECT: the fig-U4-8 caption still weakens the same sourced claim - static/img/figures/efmp-302/unit-04/fig-U4-8.ur.svg and fig-U4-8.ur.dark.svg render Isoré\'s "countries rarely use a pure form" as "ملک شاید کسی خالص شکل کا استعمال نہیں کرتے" (perhaps do not use), the exact modal-force defect of cycle-1 finding 10\'s figure locus; the repair commit a483c9e touched no SVG, so the student-facing figure contradicts the repaired prose beside it (verified in the served page: renders-feat023-r2/crop-fig-U4-8-ur-caption.png)',
        'POSITIVE: topic-03.mdx:111-115 now renders the Isoré scoping caveat correctly - "high-stakes schemes built on standardised test scores" -> "معیاری ٹیسٹ نمبروں پر بنے اعلیٰ داؤ والے سکیموں" (repair 4) and "a well-founded risk to design against" -> "ایسا خطرہ سمجھیے جس کے خلاف ڈیزائن کرنا پڑتا ہے اور جس کی بنیاد مضبوط ہے" (repair 12), direction restored',
        'POSITIVE: every D-2026-0001 unverifiable-sources disclosure survives at point of use in Urdu - the 2009 MoE/UNESCO/USAID origin (topic-01.mdx:104-106, topic-02.mdx:42-45), the ten-names secondary-corroboration caveat (topic-02.mdx:100-102), the teacher-notes verification limitation (unit-teacher-notes.mdx:30-33), and the fig-U4-4.ur.svg in-figure caveat "کسی کا جائزہ لینے سے پہلے، خود اپنے بھی، اسے بنیادی دستاویز میں پڑھیے"',
        'ADVISORY (cycle 1, unresolved): Goe\'s "no single measure that captures every way a teacher contributes" still reads "استاد کے تعاون" (cooperation) for "contributes" (topic-02.mdx:108-110); the hedged near-universal claim keeps its hedge (topic-01.mdx:84-86 "تقریباً عام" + "پچھلے تیس برسوں میں")'
      ]
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'Every U4-NN row of coverage/unit-04.md maps to a real Urdu section heading under its topic\'s وضاحت, re-verified by reading each: topic-01 "پیشہ ورانہ معیار کا تصور..." / "اساتذہ کے معیارات پر عالمی نقطہ نظر" / "...قومی نقطہ نظر" / "معیارات کا استعمال بطور..."; topic-02 "...ساخت" / "...دائرے..." / "اشاریے، اور ایک دائرہ..."; topic-03 "...اپنی مشق کے جائزے..." / "...شہادت بنانا"; topic-04 "...لائسنس اور سند بندی" / "جائزہ، اور تشکیلی اور مجموعی مقاصد کا فرق" / "جب معیار اس مقصد کے لیے..."',
        'The ten NPST standard names are complete, in order and meaning-matched in Urdu (topic-02.mdx:73-82), using bank-consistent terms (تشخیص for Assessment, ضابطہ اخلاق for code of conduct, مسلسل پیشہ ورانہ ترقی for CPD), with the secondary-corroboration caveat intact at topic-02.mdx:100-102',
        'All four topics carry the full nine-part cycle in Urdu (classroom situation, وضاحت, سرگرمی, اپنی سمجھ جانچیں, خلاصہ, خود جائزہ فہرست, practicum, مجموعی کام with mini-rubric, مزید مطالعہ); no heading-only stubs found in any of the seven file pairs; all seven pairs align section-for-section and paragraph-for-paragraph',
        'npm run check:depth-gate exit 0; npm run validate:content exit 0 (EN-UR structural parity gate)'
      ]
    },
    {
      id: 'assessment',
      status: 'pass',
      evidence: [
        'All 10 Urdu MCQs were solved blind from Urdu alone before any key was read; derived answers 1-ب, 2-د, 3-الف, 4-ج, 5-ب, 6-د, 7-ج, 8-الف, 9-ب, 10-ج agree with the Urdu key (unit-assessment.mdx:181-195) and with the English key (b,d,a,c,b,d,c,a,b,c); option order الف ب ج د maps one-to-one onto a b c d with no reordering (keys re-read in the rendered narrow viewport: renders-feat023-r2/crop-narrow360-assessment-key.png)',
        'All ten RRQ mark schemes sum to their stated totals in Urdu (4,7,8,4,5,4,5,9,9,4 = 59), identical to the English; the RRQ-4 anti-answer guard is preserved ("ایسا جواب نمبر نہ دیجیے جس کا نتیجہ یہ ہو کہ ایک دستاویز دونوں نہیں سنبھال سکتی... متضاد مگر ناممکنِ امتزاج نہیں", unit-assessment.mdx:219-221)',
        'All five ERQ rubrics are present with their four criteria and Limited/Adequate/Strong bands, and the 10-cap is preserved: "جو جواب تجزیہ، جائزہ یا تخلیق کے معیار پر \'مناسب\' تک نہ پہنچے وہ مجموعی طور پر 10 سے اوپر نہیں جا سکتا" (unit-assessment.mdx:251-252)',
        'The ERQ-2 item label no longer collides with summative: unit-assessment.mdx:158 reads "**یکجائتی۔**" (repair 7 verified at this locus; renders-feat023-r2/crop-assessment-erq2.png); no translated item reveals an answer or lowers cognitive demand; the two stem-level shifts of cycle 1 (MCQ-3 option د "جیسا کام کرتا ہوا", MCQ-8 stem word order) are unchanged advisories that do not affect keys, scoring or demand',
        'The 25-item bank is complete in Urdu (10/10/5) with matching Bloom labels (یاد رکھنا/سمجھنا/اطلاق/تجزیہ/جائزہ/تخلیق); ERQ-5\'s stem and rubric rows now read متبادل (repair 13d verified at unit-assessment.mdx:173, :296)'
      ]
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        'renders-feat023-r2/render-inspect.log and render-inspect.json: all 7 Urdu pages inspected at 1280x900, 360x780 (dsf2, isMobile) and A4 794px print emulation against the shared two-locale build (freshness verified in logs-feat023-r2/site-build.log: built at commit a483c9e, 2026-09-24T22:50Z, serves every repaired string and both figure-variant sets) served at 127.0.0.1:4625, chromium 149.0.7827.0; defects: 0',
        '0 images without alt, 0 visible broken images, 0 skipped heading levels, 0 horizontal document overflow on any page at any viewport; every figure carries a translated Urdu alt (verified in the rendered DOM, render-inspect.log section A)',
        'At 360px all eight figures are their own scroll containers (figure scrollWidth 880-940 vs client 328) and all five ERQ rubric tables fit without scrolling in Urdu; nothing is unreachable',
        'A4 print: clippedElems=0 on every page, all figure right edges 717-777 within the 794px page, the whole جوابات اور نمبر دہی کی رہنمائی section prints intact (5 Urdu answer headings detected in print emulation); valid 8-page PDFs emitted for all 7 pages',
        'The G3 accessibility advisories (fig-U4-3 caption sentence living only inside the SVG, fig-U4-4 alt not carrying the full force of the in-figure caveat) carry identically to the Urdu because the Urdu alts are faithful translations of the English alts; no new accessibility defect was found'
      ]
    },
    {
      id: 'completeness',
      status: 'fail',
      evidence: [
        'DEFECT (cycle 1, unrepaired): a doubled Urdu full stop in the bold evidence-type label at topic-03.mdx:94 ("**شاگردوں کی آواز۔۔**")',
        'DEFECT (new, same class as the cycle-1 متبیل typo): "ثبٹ" - not an Urdu word; a misspelling of ثبوت (proof) - at topic-03.mdx:99 ("کسی اور کے لیے ثبٹ کے طور پر کمزور") and :154 ("استاد کا اپنا ریکارڈ ثبٹ کے طور پر کمزور"), both student-facing (verified in the rendered page: renders-feat023-r2/crop-topic-03-tallies.png)',
        'DEFECT (new, same wrong-word class cycle 1 repaired at topic-03:50): "خلاصی" (escape/deliverance) renders the ERQ-1 rubric\'s Specificity "Limited" band descriptor "Abstract" at unit-assessment.mdx:261 ("| مخصوص ہونا | خلاصی | کچھ ٹھیک تفصیل | ..."), in the published marking guidance (renders-feat023-r2/crop-assessment-khalisi.png)',
        'DEFECT (incomplete repair, cross-cited under terminology): unit-assessment.mdx:9 blooms_summary still labels the integrative item "ایک مجموعی سوال" where the English says "one integrative item"',
        'POSITIVE: the cycle-1 corrupted codepoint is gone - zero U+FFFD in source and built pages (probe count 0/0, logs-feat023-r2/site-build.log); apart from the items above, all seven file pairs align section-for-section and paragraph-for-paragraph with no untranslated stub or heading-only section'
      ]
    },
    {
      id: 'semantics',
      status: 'fail',
      evidence: [
        'DEFECT (cycle-1 finding 10, figure locus unrepaired): the fig-U4-8.ur.svg / fig-U4-8.ur.dark.svg caption converts Isoré\'s measured frequency claim "countries rarely use a pure form of either" into epistemic doubt - "ملک شاید کسی خالص شکل کا استعمال نہیں کرتے" (perhaps do not use) - while the prose beside it (topic-04.mdx:95) now correctly says "شاذ و نادر"; the student reads two contradictory renderings of the same sourced sentence (cross-cited under sources)',
        'RESIDUAL (cycle-1 finding 13b, partially repaired): topic-03.mdx:50 renders "not the one you are weakest at in the abstract" as "نہ وہ جس میں آپ خلاصہ طور پر کمزور ہیں" - the nonsense word خلاصی (escape) is gone, but the replacement خلاصہ طور پر (in summary) still does not carry "in the abstract" (considered in general terms, apart from your actual classroom); cycle 1\'s suggested repair (نظری طور پر / مجرّد طور پر) was not applied; meaning is recoverable from the surrounding contrast, so this is recorded as a lesser unresolved shift rather than a reversal',
        'VERIFIED REPAIRS (re-checked in source, build and render): the index dependency now reads "4.2 کے بغیر 4.3 مکمل نہیں ہو سکتا" (index.mdx:78-79, repair 2); the "improve the record instead of the practice" question reads "مشق کے بجائے ریکارڈ بہتر کرنے کے لیے آمادہ تھے" at topic-03.mdx:177-178 and unit-teacher-notes.mdx:92-93 (repair 3) with the rushed-negation restored ("جلدی کرنے پر باقی نہیں رہتا", teacher-notes:94); "It is what the incentive structure asks for" reads "یہ وہی ہے جو ترغیبی ڈھانچہ مانگتا ہے" (topic-04.mdx:107, repair 8); blooms_summary "the person appraised" reads "جس شخص کا جائزہ لیا جاتا ہے اس میں" (topic-04.mdx:10, repair 11)',
        'Smaller shifts and omissions, all advisory and meaning-recoverable, are listed in the findings (cycle-1 advisory set preserved plus a few newly noted: "to show anything" dropped at topic-03.mdx:175 and unit-teacher-notes.mdx:87; "game" softened to "defeat" (شکست دینے) at topic-02.mdx:158); none inverts a claim'
      ]
    },
    {
      id: 'terminology',
      status: 'fail',
      evidence: [
        'DEFECT (cycle-1 finding 7, INCOMPLETELY REPAIRED): the ERQ-2 label is now یکجائتی (unit-assessment.mdx:158, verified), but the integrative item is still labelled with the unit\'s own word for "summative" at three further loci: unit-assessment.mdx:9 (blooms_summary "بشمول ایک مجموعی سوال" for "including one integrative item"), unit-assessment.mdx:263 (rubric title "**ERQ 2 - بیان کردہ استاد کا مجموعی نقشہ**" for "Integrative mapping of a described teacher") and unit-teacher-notes.mdx:105 ("ERQ 2 مجموعی سوال ہے" for "ERQ 2 is the integrative item"); the assessment file now contradicts itself (item label یکجائتی, rubric title مجموعی نقشہ), and the teacher notes still tell the teacher the integrative item is the summative one',
        'POSITIVE: all four UR key_terms match the frozen terminology bank exactly - پیشہ ورانہ معیارات, اساتذہ کے لیے قومی پیشہ ورانہ معیارات, اساتذہ کا لائسنس, اساتذہ کی سند بندی (terminology.csv rows 114-117); the bank\'s ضابطہ اخلاق, تشخیص, نصاب and مسلسل پیشہ ورانہ ترقی are used consistently in the ten-standards list and prose; مجموعی جائزہ is one of the bank\'s two accepted summative pairings and is used consistently for summative',
        'POSITIVE: the cycle-1 systematic wrong terms are all gone at the byte level (grep across the unit: 0 hits for دہشت, تناوب, فرضی استاد/فرضی مشق, اشاریہ ڈھانچہ, متبیل) - stakes is داؤ (topic-01.mdx:96, :193; اعلیٰ داؤ والے at topic-03.mdx:113), tension/conflict is تضاد (topic-01.mdx:141, topic-03.mdx:112, topic-04.mdx:97, unit-assessment.mdx:211), a serving teacher is زیرِ خدمت استاد (topic-01.mdx:128, topic-04.mdx:57, :173, unit-assessment.mdx:41), and فرضی survives only where it correctly means "hypothetical" (unit-teacher-notes.mdx:28)',
        'Concept graph: 10 of the 13 authored labels in concepts/unit-04.md remain confirmed (CON:4-2, -4-3, -4-4, -4-5, -4-6, -4-8, -4-9, -4-10, -4-13, -4-16); CON:4-12 "خود تشخیصی کا دائرہ" and CON:4-15 "تشکیلی اور جامع جائزے کے مقاصد" still need rework before bank promotion (unchanged by the repair commit), and CON:4-11 still renders "trade-off" as خطرہ; دائرہ still carries three distinct English senses (scope, domains, cycle)'
      ]
    },
    {
      id: 'register',
      status: 'fail',
      evidence: [
        'The cycle-1 register garbles are all still present, unrepaired: "شہادت کے قابلِ تفصیل" for "evidence-specific statement" (topic-01.mdx:188, unit-assessment.mdx:22), "معیار معیار کو نظر آنے لگاتا ہے" (index.mdx:36-37), "چھیں چھیں کرتے ہیں" for "They overlap" (topic-01.mdx:73, unit-teacher-notes.mdx:54), "پیچھا کر سکے" in the topic-02 rubric Register row (topic-02.mdx:228), "لے کر نہیں آنا" for "rather than recited" (unit-teacher-notes.mdx:106), "معیارات کے کاموں کی روایت والی روانی" (unit-teacher-notes.mdx:109-110), "جائزے کی مشاہدے کے ذریعے حقیقی حد" (topic-02.mdx:208), "حاصل ممکن" compression for "achievable" (9 loci), the Latin adverb "formally" inside Urdu prose (topic-01.mdx:223) and "بہ طور ڈیفالٹ" (topic-04.mdx:102, :113; unit-assessment.mdx:219)',
        'Newly noted minor instances of the same classes: embedded English "fail" in the marking guidance (unit-assessment.mdx:183, :276 - "آزمائش میں fail", "ایک آزمائش میں fail"), "نا مشاہدہ کے قابل یا نا حاصل ممکن" (unit-assessment.mdx:278, spaced نا prefix), "حیرتان درست" for "surprisingly accurate" (topic-03.mdx:94), "بیچ" for "cohort" (unit-teacher-notes.mdx:41), "حقیقی کمرے" for "a real classroom" (topic-01.mdx:146), "دونوں تقاضوں کا مجموعہ ایک دوسرے کے خلاف کھینچتا ہے" in the fig-U4-8 bar label, "کیا کھولتا ہے" for "what each reveals" in the fig-U4-6 alt (topic-03.mdx:72)',
        'POSITIVE: the register is otherwise genuinely academic-plain - the classroom situations, activities and rubrics read naturally in Nastaliq Urdu, technical terms are glossed at first use, and the defective constructions are local (roughly 25 passages in ~1,600 lines), not pervasive; the repaired passages themselves read naturally (داؤ, تضاد, زیرِ خدمت استاد, ترغیبی ڈھانچہ, یکجائتی, شاذ و نادر all sit correctly in their sentences)'
      ]
    },
    {
      id: 'rtl',
      status: 'pass',
      evidence: [
        'Rendered Urdu pages verified RTL at 1280x900, 360x780 and A4 print: right-hand sidebar, right-aligned text, and the self-hosted Noto Nastaliq Urdu webfont rendering the page prose (desktop-*.png and crop-narrow360-topic-04.png read by this reviewer)',
        'RTL mirroring of the Urdu figures re-verified from the committed SVG geometry and the render: fig-U4-7.ur.svg runs its seven stations right-to-left (داخلہ down to دوبارہ لائسنس, visible in the rendered page), fig-U4-1.ur.svg mirrors the comparison table, and fig-U4-3.ur.svg right-aligns the bands with indicator boxes in RTL order',
        'Bidi, numerals and embedded Latin render correctly in the pages read: Western digits inside RTL prose (400 تا 450, 25 منٹ), the MCQ option markers الف) ب) ج) د), bold keys (ب، د، الف، ج) in the rendered answer key, and Latin citations (Isoré, OECD, B.Ed, NPST, USAID) inside RTL sentences, with no bidi punctuation or ordering defect observed (crop-narrow360-assessment-key.png)',
        'All 16 Urdu figure variants measure clean: scripts/measure-figure-text.mjs exit 0 (no viewBox overflow, no wordmark overprint; logs-feat023-r2/measure-figure-text.log) and render-inspect section D reports all 16 clean',
        'LIMITATION recorded (unchanged from cycle 1): this host has no Nastaliq system font (fc-list :lang=ur -> FreeSerif/FreeMono/Unifont) and the SVGs embed no font, so figure-INTERNAL labels were measured and read under Chromium\'s fallback Arabic shaping; the font stack is the repo-wide pattern. Page prose Nastaliq was verified visually and is unaffected'
      ]
    }
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: false,
      message: 'CYCLE-1 FINDING 7 (integrative rendered مجموعی) INCOMPLETELY REPAIRED - STILL BLOCKING AT THREE LOCI. The repair commit fixed only the ERQ-2 item label (unit-assessment.mdx:158 now reads "**یکجائتی۔**", verified). Still unrepaired: (1) unit-assessment.mdx:9 blooms_summary "بشمول ایک مجموعی سوال" for "including one integrative item"; (2) unit-assessment.mdx:263 rubric title "**ERQ 2 - بیان کردہ استاد کا مجموعی نقشہ**" for "Integrative mapping of a described teacher" (a locus cycle 1 did not pin; the same collision, student-facing in the rubric heading); (3) unit-teacher-notes.mdx:105 "ERQ 2 مجموعی سوال ہے" for "ERQ 2 is the integrative item". مجموعی is this unit\'s word for "summative" (مجموعی جائزہ, مجموعی مقاصد, مجموعی کام), so the assessment file now labels its integrative item one term at :158 and the contradictory term at :263, and the teacher notes still call the integrative item the summative one in the sentence that tells the teacher which item best indicates the unit landed. Repairs: use یکجائتی at all three loci (aligning with the repaired :158).'
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'CYCLE-1 FINDING 10 (Isoré "rarely" weakened to "perhaps") UNREPAIRED IN THE FIGURE CAPTION. The prose repair is verified (topic-04.mdx:95 now reads "ملک شاذ و نادر کسی ایک کی خالص شکل استعمال کرتے ہیں"), but commit a483c9e touched no SVG: static/img/figures/efmp-302/unit-04/fig-U4-8.ur.svg and fig-U4-8.ur.dark.svg still carry "ملک شاید کسی خالص شکل کا استعمال نہیں کرتے" (countries perhaps do not use a pure form) for Isoré\'s "countries rarely use a pure form of either" - the exact modal-force defect cycle 1 flagged in this caption. The figure renders on the topic-04 page directly beside the corrected prose (verified: renders-feat023-r2/crop-fig-U4-8-ur-caption.png), so a student reads two contradictory renderings of the same sourced sentence. Repair: regenerate both fig-U4-8 Urdu variants with "ملک شاذ و نادر..." (and re-run figures:variants:check / measure-figure-text).'
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'WRONG WORD "خلاصی" (ESCAPE) FOR "ABSTRACT" IN THE ERQ-1 MARKING RUBRIC - same wrong-word class cycle 1 repaired at topic-03:50, at a locus cycle 1 did not flag. unit-assessment.mdx:261, ERQ-1 rubric row "Specificity", Limited band: English "Abstract" is rendered "خلاصی" ("| مخصوص ہونا | خلاصی | کچھ ٹھیک تفصیل | بتاتا ہے رپورٹ میں کیا شامل ہونا پڑتا |"). A marker reading the band descriptor sees "escape"; the intended sense is "vague/not concrete". Repair: "مجرّد" or "عام انداز میں".'
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'NON-WORD "ثبٹ" (MISSPELLING OF ثبوت, PROOF) AT TWO STUDENT-FACING LOCI - the same non-word typo class as the cycle-1 متبیل finding. topic-03.mdx:99 ("کسی اور کے لیے ثبٹ کے طور پر کمزور" for "Weak as proof to somebody else") and topic-03.mdx:154 ("استاد کا اپنا ریکارڈ ثبٹ کے طور پر کمزور" for "a teacher\'s own record is weak as proof"). ثبٹ is not an Urdu word; the phrase should read "ثبوت کے طور پر". Verified in the rendered page (renders-feat023-r2/crop-topic-03-tallies.png).'
    },
    {
      severity: 'uncertain',
      resolved: false,
      message: 'THE G3 DEPENDENCY IS NOT SATISFIED BY SIGNED EVIDENCE (G-2026-65 pattern; carried unresolved from cycle 1). The G5 rubric requires accepted G3 evidence for the exact English inputs; the contract\'s automatic path requires a fresh SIGNED G3 report. ADR-0019 blocks agent certification and no protected signing host is provisioned, so no signed G3 evidence exists for EFMP-302 Unit 4. This review proceeded, per the parent\'s instruction, with the best available G3 evidence - the advisory agent pass agent-g3-efmp302-u4-feat023-r1.json (disposition pass, all seven criteria, reviewer agent:g3-reviewer, unsigned) - as the comparison base, after verifying that all 8 English unit inputs bound here are byte-identical (digest-equal) to that report\'s own input_manifest binding (logs-feat023-r2/manifest-verify.log). The dependency therefore rests on advisory, unsigned evidence and cannot be resolved by any content repair: it requires the protected signing host and registry activation, or an owner-recorded human G3 acceptance of these English bytes. Recorded as uncertain and unresolved; it forbids a pass on its own, independent of the content findings.'
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'REGISTER: the full cycle-1 advisory set remains unrepaired (none inverts meaning): "شہادت کے قابلِ تفصیل" (topic-01.mdx:188, unit-assessment.mdx:22), "معیار معیار کو نظر آنے لگاتا ہے" (index.mdx:36-37), "چھیں چھیں کرتے ہیں" (topic-01.mdx:73, unit-teacher-notes.mdx:54), "پیچھا کر سکے" (topic-02.mdx:228), "لے کر نہیں آنا" (unit-teacher-notes.mdx:106), "معیارات کے کاموں کی روایت والی روانی" (unit-teacher-notes.mdx:109-110), "جائزے کی مشاہدے کے ذریعے حقیقی حد" (topic-02.mdx:208), "حاصل ممکن" x9, Latin "formally" (topic-01.mdx:223), "بہ طور ڈیفالٹ" (topic-04.mdx:102, :113; unit-assessment.mdx:219), and the doubled Urdu full stop at topic-03.mdx:94 (a cycle-1 completeness typo, trivially repairable). Newly noted same-class minors: embedded "fail" (unit-assessment.mdx:183, :276), "نا مشاہدہ کے قابل یا نا حاصل ممکن" (unit-assessment.mdx:278), "حیرتان درست" (topic-03.mdx:94), "بیچ" for cohort (unit-teacher-notes.mdx:41), "حقیقی کمرے" for "a real classroom" (topic-01.mdx:146), "دونوں تقاضوں کا مجموعہ" (fig-U4-8 bar label), "کیا کھولتا ہے" for "reveals" (fig-U4-6 alt, topic-03.mdx:72).'
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'SMALLER SEMANTIC SHIFTS AND OMISSIONS (meaning recoverable; cycle-1 set preserved plus new minors). Cycle 1: "what happens" dropped from the index topic-4.4 entry (index.mdx:73-74); "so often" dropped (index.mdx:82); "of self-evaluation" dropped (topic-03.mdx:188, unit-assessment.mdx ERQ-4:169); "address why ... is or is not acceptable" lowered to "say whether" (topic-02.mdx:218); MCQ-3 option د "working as intended" -> "جیسا کام کرتا ہوا"; MCQ-8 stem word order; "in a fortnight" -> "آدھے میعاد میں" (unit-teacher-notes.mdx:89); "pursue teacher quality" -> "یقینی بنانے" (defensible per the course guide); "an incidental flaw" -> "معمولی خامی"; "whose climate is hostile" -> "خطرناک"; Goe\'s "contributes" -> "تعاون" (topic-02.mdx:108-110); "It is a mixture of kinds" -> "اقسام کا ملاپ"; "nested" -> "جڑواں"; "trade-off" -> "سودا"; fig-U4-2 "ایسا زبان"/"والد"; fig-U4-6 "سب سے کم قابل". New minors: "to show anything" dropped at topic-03.mdx:175 and unit-teacher-notes.mdx:87; "game" -> "شکست دینے" (defeat, topic-02.mdx:158); "optimises to the indicator" softened to "بہتر ہو جاتا ہے" (topic-04.mdx:127); the ترقی/ترقی double-duty for "development"/"promotion" is idiomatic but leaves the unit\'s central contrast resting on one word (index.mdx:9, :55; topic-04.mdx:3, :148).'
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'CONCEPT-GRAPH LABELS (unchanged by the repair commit): 10 of the 13 authored Urdu labels in specs/content/efmp-302/concepts/unit-04.md are confirmed and can be promoted to the terminology bank (CON:4-2, -4-3, -4-4, -4-5, -4-6, -4-8, -4-9, -4-10, -4-13, -4-16). Two need rework before promotion: CON:4-12 "خود تشخیصی کا دائرہ" (prose uses خود جائزہ for self-evaluation and چکر for cycle; suggest "خود جائزہ کا چکر") and CON:4-15 "تشکیلی اور جامع جائزے کے مقاصد" (uses the bank\'s other accepted summative variant جامع where this unit\'s prose consistently uses مجموعی; suggest "تشکیلی اور مجموعی جائزوں کے مقاصد"). CON:4-11 renders "trade-off" as خطرہ; consider سمجھوتا.'
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'ENVIRONMENT LIMITATION ON FIGURE-INTERNAL NASTALIQ VERIFICATION (carried from cycle 1). This host has no Noto Nastaliq Urdu or Jameel Noori Nastaleeq system font (fc-list :lang=ur lists only FreeSerif/FreeMono/Unifont), and the .ur.svg files embed no font, so figure-internal labels were measured and read under Chromium\'s fallback Arabic shaping. The font stack is the repo-wide pattern (identical in the accepted unit-03 and unit-05 Urdu figures), all labels were verified legible, correctly ordered and collision-free under those metrics, and the page prose (webfont-loaded) was visually verified in Nastaliq. True Nastaliq metrics are typically taller than the fallback\'s; a host with the font installed should re-run the geometry instruments before any future pass relies on them.'
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'STALE GOVERNANCE NOTE (EN-side, no Urdu action; carried from cycle 1). specs/content/efmp-302/figures/unit-04.md still says the unit "has no Urdu mirror on disk, so the bilingual figure rule does not apply yet". The Urdu mirror and its 16 .ur.svg variants exist and are bound by this review\'s manifest; the note is outdated. Repair belongs to the author/owner (this reviewer does not edit governance tables).'
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'CYCLE-LIMIT NOTE FOR THE OWNER. This is review cycle 2 of the feature-023 G5 submission for this unit (cycle 1: agent-g5-efmp302-u4-feat023-r1, 13 blocking findings; repair commit a483c9e; this review verifies 12 of 13 repairs fully applied and finds 4 unresolved blocking-level residuals plus the carried advisories). The review-unit skill allows at most two repair/review cycles per stage per submission, so the owner must decide how the remaining repairs are validated (for example an owner-recorded human review, or a fresh submission) rather than assuming an automatic third agent cycle. This is a process observation, not a content finding.'
    },
    {
      severity: 'blocking',
      resolved: true,
      message: 'CYCLE-1 FINDING 1 (U+FFFD inside چاہتا) VERIFIED REPAIRED. topic-04.mdx:100 now reads "جو نظام دونوں چاہتا ہے اسے پہلے سے طے کرنا ہوگا"; zero U+FFFD codepoints in any Urdu or English unit file (byte-level grep) and zero in the built page (probe count 0/0, logs-feat023-r2/site-build.log); renders as clean Nastaliq (renders-feat023-r2/crop-topic-04-chahata.png).'
    },
    {
      severity: 'blocking',
      resolved: true,
      message: 'CYCLE-1 FINDING 2 (index dependency inverted) VERIFIED REPAIRED. index.mdx:78-79 now reads "اور 4.2 کے بغیر 4.3 مکمل نہیں ہو سکتا" - Topic 4.3 cannot be done without 4.2, matching the English; the inverted form is absent from the built page (renders-feat023-r2/crop-index-dependency.png).'
    },
    {
      severity: 'blocking',
      resolved: true,
      message: 'CYCLE-1 FINDING 3 ("improve the record instead of the practice" inverted in both files; rushed-negation lost) VERIFIED REPAIRED. topic-03.mdx:177-178 now reads "کیا آپ کسی بھی لمحے مشق کے بجائے ریکارڈ بہتر کرنے کے لیے آمادہ تھے" and unit-teacher-notes.mdx:92-93 carries the same corrected order ("کیا آپ کبھی مشق کے بجائے ریکارڈ بہتر کرنے کے لیے آمادہ تھے؟"); the same teacher-notes sentence restores the negation: "جلدی کرنے پر باقی نہیں رہتا" (does not survive being rushed). Both verified in source, build and render (renders-feat023-r2/crop-topic-03-practicum.png, crop-notes-debrief.png).'
    },
    {
      severity: 'blocking',
      resolved: true,
      message: 'CYCLE-1 FINDING 4 (stakes as دہشت "terror") VERIFIED REPAIRED at all three loci: topic-01.mdx:96 bullet label "داؤ", topic-01.mdx:193 summary "دائرے، باریکی اور داؤ میں مختلف", topic-03.mdx:113 "اعلیٰ داؤ والے سکیموں" for high-stakes schemes; zero دہشت remains anywhere in the unit (grep), matching the figures\' own correct داؤ پر idiom.'
    },
    {
      severity: 'blocking',
      resolved: true,
      message: 'CYCLE-1 FINDING 5 (tension/conflict as تناوب "alternation") VERIFIED REPAIRED at all four loci of the unit\'s central argument: topic-01.mdx:141 ("اس تضاد کو ... مرکزی ڈیزائن مسئلہ"), topic-03.mdx:112 ("ترقیاتی اور جوابدہانہ مقاصد کے درمیان تضاد"), topic-04.mdx:97 ("تضاد حقیقی ہے اور میدان کا ڈیزائن مسئلہ ہے"), unit-assessment.mdx:211 ("دو تقاضوں کے درمیان حقیقی تضاد"); zero تناوب remains (grep).'
    },
    {
      severity: 'blocking',
      resolved: true,
      message: 'CYCLE-1 FINDING 6 (a serving teacher as فرضی استاد "hypothetical teacher") VERIFIED REPAIRED at all four loci: topic-01.mdx:128, topic-04.mdx:57, topic-04.mdx:173 (summary) and unit-assessment.mdx:41 (summary) all read زیرِ خدمت استاد / زیرِ خدمت استاد کی مشق; فرضی survives only at unit-teacher-notes.mdx:28 where it correctly means "hypothetical" (grep across the unit).'
    },
    {
      severity: 'blocking',
      resolved: true,
      message: 'CYCLE-1 FINDING 8 (incentive structure as "indicator structure") VERIFIED REPAIRED. topic-04.mdx:107 now reads "یہ وہی ہے جو ترغیبی ڈھانچہ مانگتا ہے" for "It is what the incentive structure asks for"; zero occurrences of اشاریہ ڈھانچہ remain (grep); renders correctly (renders-feat023-r2/crop-topic-04-incentive.png).'
    },
    {
      severity: 'blocking',
      resolved: true,
      message: 'CYCLE-1 FINDING 9 (clo_refs divergence) VERIFIED REPAIRED. Urdu topic-02.mdx:9, topic-03.mdx:9 and topic-04.mdx:9 now bind SLO:EFMP-302-4-2, byte-identical to the English frontmatter (topic-01 keeps 4-1; index, unit-assessment and unit-teacher-notes carry both), confirmed by grep and by the repair diff.'
    },
    {
      severity: 'blocking',
      resolved: true,
      message: 'CYCLE-1 FINDING 10 (Isoré "rarely" as "perhaps") VERIFIED REPAIRED IN THE PROSE ONLY. topic-04.mdx:95 now reads "ملک شاذ و نادر کسی ایک کی خالص شکل استعمال کرتے ہیں" - a measured frequency claim, and the ERQ-2 stem\'s "rarely changes her approach" consistently uses "شاذ و نادر ہی". The figure-caption locus of the same finding remains unrepaired and is recorded as an unresolved blocking finding above.'
    },
    {
      severity: 'blocking',
      resolved: true,
      message: 'CYCLE-1 FINDING 11 (person appraised reversed to the appraiser) VERIFIED REPAIRED. topic-04.mdx:10 blooms_summary now reads "ہر مقصد جس شخص کا جائزہ لیا جاتا ہے اس میں کیا پیدا کرتا ہے" - what each purpose produces in the person appraised (frontmatter; verified in source, and the built page carries the repaired topic).'
    },
    {
      severity: 'blocking',
      resolved: true,
      message: 'CYCLE-1 FINDING 12 ("a well-founded risk to design against" direction garbled) VERIFIED REPAIRED. topic-03.mdx:114-115 now reads "ایسا خطرہ سمجھیے جس کے خلاف ڈیزائن کرنا پڑتا ہے اور جس کی بنیاد مضبوط ہے" - a risk to design against, with the well-founded grounding preserved; verified in source, build and render (renders-feat023-r2/crop-topic-03-isore.png).'
    },
    {
      severity: 'blocking',
      resolved: true,
      message: 'CYCLE-1 FINDING 13 (wrong-word cluster) VERIFIED REPAIRED AT SIX OF SEVEN SUB-ITEMS: (a) تالے -> شمارشے (topic-03.mdx:99, "گنتیاں، شمارشے، وقت کے ساتھ رکھے گئے نوٹ"); (c) استعلام -> استعمال (topic-01.mdx:243); (d) متبیل -> متبادل at all four loci (topic-04.mdx:215, :225; unit-assessment.mdx:173, :296; zero متبیل remains); (e) گرما -> گرا (topic-04.mdx:156); (f) سنتا ہے -> لگتی ہے (topic-04.mdx:29). Sub-item (b) خلاصی طور پر was replaced with خلاصہ طور پر rather than the suggested نظری طور پر / مجرّد طور پر: the nonsense word is gone but "in the abstract" is still not conveyed (recorded as a residual in the semantics criterion and the advisory on smaller shifts); the same wrong word خلاصی also survives at a cycle-1-unflagged locus, unit-assessment.mdx:261, recorded as an unresolved blocking finding above.'
    },
    {
      severity: 'advisory',
      resolved: true,
      message: 'INDEPENDENCE, INPUT BINDING AND BUILD FRESHNESS - positive checks. INDEPENDENCE: this session authored, translated or repaired no byte of EFMP-302 Unit 4 in either locale; identity agent:g5-reviewer, reviewer_run_id agent-g5-efmp302-u4-feat023-r2, author_run_id commit:a483c9e (the commit whose bytes the manifest binds; the repair diff was read as evidence, not authored here). No human initials appear in this report. MANIFEST: all 127 bound paths re-verified against the prepared feat023-r2 manifest with the contract\'s own inputManifest(); 0 missing, 0 added, 0 digest mismatches, skill_digest matches, 0 dirty bound inputs; the 8 English unit inputs are digest-identical to the G3 feat023-r1 binding; exactly the 7 Urdu unit files changed since the cycle-1 binding and no non-Urdu input changed (logs-feat023-r2/manifest-verify.log). BUILD: no rebuild was run; the shared two-locale build at build/ (mtime 2026-09-24T22:50Z, after commit a483c9e at 22:49Z) was probed and serves Unit 4\'s current Urdu bytes - every repaired string present, every cycle-1 defect string absent, the residual defect strings present, 0 U+FFFD, all 16 Urdu figure variants served (logs-feat023-r2/site-build.log); render inspection ran against that build. SOURCE HANDLING: unit text, figure labels, source excerpts, governance tables and the prior reports were read as data; nothing embedded in them was executed or treated as an instruction.'
    }
  ],
  commands: [
    { name: 'manifest-verify', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r2/manifest-verify.log' },
    { name: 'validate:content', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r2/validate-content.log' },
    { name: 'check:depth-gate', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r2/check-depth-gate.log' },
    { name: 'check:figures', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r2/check-figures.log' },
    { name: 'check:no-em-dash', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r2/check-no-em-dash.log' },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r2/check-no-answer-keys.log' },
    { name: 'check:docs-sync', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r2/check-docs-sync.log' },
    { name: 'site-build', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r2/site-build.log' },
    { name: 'measure-figure-text', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r2/measure-figure-text.log' },
    { name: 'render-review', exit_code: 0, log_path: 'specs/content/efmp-302/reviews/unit-04/G5/logs-feat023-r2/render-review.log' }
  ],
  evidence_manifest: evidence,
  summary: `Fresh G5 cycle-2 Urdu review of EFMP-302 Unit 4 (feature 023), binding the 127 inputs of the prepared feat023-r2 manifest at commit a483c9e (all digest-verified; 0 dirty; the 8 English unit inputs byte-identical to the advisory G3 feat023-r1 binding; exactly the 7 Urdu unit files changed since cycle 1). Disposition revise. Five criteria pass (authority, coverage, assessment, accessibility, rtl - the last with the carried no-Nastaliq-font limitation) and five fail (sources, completeness, semantics, terminology, register). All mandatory commands exit 0; the shared build (verified fresh for this unit's Urdu pages; no rebuild run) served all 7 pages at 1280x900, 360x780 and A4 print with 0 defects, and this reviewer read the rendered pages and 20 targeted passage crops. Assessment equivalence re-verified: all 10 Urdu MCQs solved blind (1-ب 2-د 3-الف 4-ج 5-ب 6-د 7-ج 8-الف 9-ب 10-ج) match the Urdu and English keys, option order maps one-to-one, RRQ schemes sum to 59, the ERQ 10-cap and the RRQ-4 marking guard are preserved. Twelve of the thirteen cycle-1 blocking repairs verify fully in source, build and render (U+FFFD, dependency inversion, record-not-practice with the rushed negation, stakes as داؤ, tension as تضاد, serving teacher as زیرِ خدمت, incentive structure as ترغیبی ڈھانچہ, clo_refs, rarely as شاذ و نادر in prose, person appraised, risk-to-design-against, and six of seven wrong-word sub-items). Against that, four blocking-level defects remain: (1) the "integrative" repair is incomplete - the ERQ-2 label is now یکجائتی but the blooms_summary (:9), the ERQ-2 rubric title (:263) and the teacher notes (:105) still label the integrative item مجموعی, the unit's word for summative, leaving the assessment file self-contradictory; (2) the fig-U4-8 Urdu captions (light and dark) still weaken Isoré's "rarely" to "شاید" beside the corrected prose (the repair touched no SVG); (3) خلاصی (escape) still renders "Abstract" in the ERQ-1 rubric's Limited band (unit-assessment:261); (4) the non-word ثبٹ for ثبوت at topic-03:99/:154. The uncertain G3-dependency finding (G-2026-65 pattern: unsigned advisory base, no protected signing host) is preserved unresolved and forbids a pass on its own, and the cycle-1 register/semantic advisories are preserved (plus minor new ones and a cycle-limit process note for the owner). This report is advisory: not a signature, registry entry, qualification record, tracker transition or acceptance; translation_status remains draft.`
};

const outPath = `${root}${g5dir}/agent-g5-efmp302-u4-feat023-r2.json`;
writeFileSync(outPath, JSON.stringify(report, null, 1) + '\n');
console.log(`written: ${outPath}`);
console.log(`evidence files: ${evCount} (${pngCount} PNG)`);
console.log(`criteria: ${report.criteria.map((c) => `${c.id}=${c.status}`).join(', ')}`);
console.log(`findings: ${report.findings.length} (${report.findings.filter((f) => !f.resolved && f.severity === 'blocking').length} unresolved blocking, ${report.findings.filter((f) => !f.resolved && f.severity === 'uncertain').length} unresolved uncertain, ${report.findings.filter((f) => !f.resolved && f.severity === 'advisory').length} unresolved advisory, ${report.findings.filter((f) => f.resolved).length} resolved)`);
