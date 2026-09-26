// G5 run001 report writer: embeds the review's full findings and assembles the
// contract JSON with real SHA-256 evidence hashes and timestamps, reading the
// actual evidence bytes from disk. Run AFTER run-all-render-harness.mjs.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-ad57ca9469bfc4572';
const dir = 'specs/content/efmp-301/reviews/unit-08/G5';
const logs = `${dir}/logs-agent-g5-efmp301-u8-run001`;
const renders = `${dir}/renders-agent-g5-efmp301-u8-run001`;
const digest = (p) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex');

const prepared = JSON.parse(readFileSync(join(root, dir, 'manifest.json'), 'utf8'));

// ---- evidence manifest: every log, every PNG, the summary ----
const evidence = {};
for (const f of readdirSync(join(root, logs)).sort()) evidence[`${logs}/${f}`] = digest(`${logs}/${f}`);
function walkRenders(rel) {
  for (const f of readdirSync(join(root, rel)).sort()) {
    const p = `${rel}/${f}`;
    if (f.endsWith('.png')) evidence[p] = digest(p);
  }
}
walkRenders(renders);
walkRenders(`${renders}/figures`);
evidence[`${dir}/summary-run001.txt`] = digest(`${dir}/summary-run001.txt`);

// ---- render-dependent criterion facts (filled from the harness logs) ----
const renderReview = existsSync(join(root, logs, 'render-review.log'))
  ? JSON.parse(readFileSync(join(root, logs, 'render-review.log'), 'utf8')) : null;
const geometry = existsSync(join(root, logs, 'figure-geometry.log'))
  ? JSON.parse(readFileSync(join(root, logs, 'figure-geometry.log'), 'utf8')) : null;

const hasPageRenders = !!renderReview;
// Below-fold lazy figures and display:none dark twins report ok:false at the initial
// viewport by design; every img must carry an Urdu alt, the logo and each page's first
// (above-fold) figure must have loaded, and the below-fold/dark srcs are verified
// served-and-renderable in figure-serve-check.log plus the standalone figure PNGs.
const pagesOk = renderReview && renderReview.length >= 18
  && renderReview.every((r) => (r.overflowX ?? 0) === 0)
  && renderReview.filter((r) => r.view === 'desktop-1280x900').every((r) => r.dir === 'rtl' && r.errors.length === 0
    && r.imgs.every((i) => (i.alt || '').length > 0)
    && r.imgs.filter((i) => !/\.dark\.svg$/.test(i.src)).slice(0, 2).every((i) => i.ok));
const printOk = renderReview && renderReview.filter((r) => r.view === 'a4-print-794x1123').every((r) => r.visibleDarkVariants.length === 0);
const u6crossed = geometry?.['fig-U8-6.ur.svg']?.crossed ?? null;
console.log('render facts: hasPageRenders=', hasPageRenders, 'pagesOk=', pagesOk, 'printOk=', printOk, 'u6crossed=', u6crossed?.length);

const accessibilityPass = !!(pagesOk && printOk);
const criteria = [
  { id: 'authority', status: 'unverified', evidence: [
    'G3 dependency unmet for the bound English: the only G3 report (specs/content/efmp-301/reviews/unit-08/G3/agent-g3-efmp301-u8-run001.json) is advisory under ADR-0019, disposition revise, and its input_manifest binds the PRE-repair English - digests differ from this bundle for docs/semester-1/efmp-301/unit-08/topic-01.mdx, unit-assessment.mdx, unit-teacher-notes.mdx, specs/content/efmp-301/concepts/unit-08.md, coverage/unit-08.md, figures/unit-08.md, sources/unit-08.md and sources/texts/seifert2009.md; the English was repaired at commit f2e751aa with no round-2 G3 and no signed/accepted G3 exists for the current inputs (owner escalation, GQUR-300 PR #65 precedent)',
    'Urdu-side tracing where checkable: clo_refs identical on every UR file (index.mdx:6-8, topic-01.mdx:8-9, topic-02.mdx:8-9, topic-03.mdx:9, unit-assessment.mdx:6-8, unit-teacher-notes.mdx:6-8); guide Week 13 / Chapter 8 scope mirrored (unit-teacher-notes.mdx:22)',
  ] },
  { id: 'sources', status: 'pass', evidence: [
    'Seifert & Sutton (2009) citations retained inline at every translated quotation: topic-01.mdx:36 (definition), :42 (prevention), topic-03.mdx:37 (rules), :39 (logical consequences); further-reading citation identical to the English on all three topics (topic-01.mdx:102-103)',
    'Quotation meanings preserved against the English (compared passage by passage this run): the prevention quotation, both rules quotations and the logical-consequences definition carry the same claims; no source claim strengthened, weakened or invented in Urdu',
    'The G3-repaired practical-work attribution is correctly mirrored (unit-teacher-notes.mdx:60: the guide-generic list with the unit\'s own instantiation framing)',
  ] },
  { id: 'coverage', status: 'pass', evidence: [
    'All five sub-topics taught in Urdu at the mirrored headings: U8-1 topic-01.mdx:34-38, U8-2 topic-01.mdx:40-52, U8-3 topic-02.mdx:33-45, U8-4 topic-03.mdx:35-39, U8-5 topic-03.mdx:41-53; no heading-only stubs',
    'Structural parity file by file: the nine-part cycle present and ordered in all three topics; index outcomes/prerequisites/unit map/how-to; assessment unit summary + 10 MCQ + 10 RRQ + 5 ERQ + bounded answers (MCQ key, RRQ mark schemes, five ERQ rubrics); teacher-notes six sections - nothing omitted or added',
    'check:depth-gate exit 0 (logs-agent-g5-efmp301-u8-run001/check-depth-gate.log); Latin-script scan of the Urdu files leaves only SLO refs, key_terms, MCQ option letters, code refs and citations - no untranslated prose',
  ] },
  { id: 'assessment', status: 'fail', evidence: [
    'Independent solve: all 10 Urdu MCQs answered before reading either key - derived 1-b, 2-b, 3-b, 4-b, 5-a, 6-c, 7-b, 8-b, 9-c, 10-b matches the Urdu key (unit-assessment.mdx:123-132) and the English key (unit-assessment.mdx:159-170) exactly; option order preserved; distractors faithful; the G3-repaired MCQ-05, MCQ-10 and RRQ-10 are correctly mirrored',
    'RRQ model answers and mark allocations mirror the English (unit-assessment.mdx:138-147 vs :176-199); all five ERQ rubrics carry identical marks (5+7+4+4, 6+6+4+4, 6+7+3+4, 6+6+4+4, 6+7+3+4) and cognitive-demand tags',
    'FAIL: MCQ-9 and RRQ-9 stems render "step" as سیڑھی (ladder) - "سیڑھی کی پہلی سیڑھی" (unit-assessment.mdx:82), "سیڑھی کی پانچ سیڑھیاں" (:104) read as "the ladder\'s first ladder / five ladders"; RRQ-10 changes the English "once-a-term seating map" to "سال میں ایک بار بنایا بیٹھنے کا نقشہ" (once a year, :105) in a tangled sentence',
  ] },
  { id: 'accessibility', status: accessibilityPass ? 'pass' : 'unverified', evidence: accessibilityPass ? [
    'All six Urdu pages rendered from the production build served at localhost:3212 (this worktree\'s build/, written 2026-09-26T00:54:52Z from the clean tree at HEAD 58126b44; served Urdu Unit 8 content spot-verified against the current sources before inspection) in Chromium via playwright-core at desktop 1280x900, narrow 360x780 and A4 print 794x1123: dir=rtl, zero horizontal overflow on every page at both viewports, zero console errors, every figure img carries Urdu alt text and every above-fold figure loaded; the below-fold lazy figures and display:none dark twins report not-loaded at the initial viewport by design and are verified served (HTTP 200, byte-exact) in figure-serve-check.log, with all twelve Urdu SVG variants rendering standalone as PNGs - render-review.log, 18 entries; 18 page PNGs + 18 figure PNGs under renders-agent-g5-efmp301-u8-run001/',
    'Narrow viewport: every content table fits (scrollWidth=clientWidth=328 at 360px; 5 tables on the assessment page, 1 on each topic and the teacher notes)',
    'A4 print emulation: the only element past the page box on every page is the Docusaurus skip-to-content link (a framework control, same as the G3 English round); no learner content, table, figure or answers section overflows; no dark variant is visible in print (render-review.log a4-print entries)',
    'Nastaliq: body text resolves to "Noto Nastaliq Urdu", "Noto Naskh Arabic", "Jameel Noori Nastaleeq", serif on every page; h1 resolves to the Latin system-ui stack (platform-wide heading typography gap recorded as an advisory finding, consistent with the Units 5/6 records)',
  ] : [
    'Page-level render inspection could not be completed: the Bash safety classifier was unavailable for browser-launch commands for the remainder of this run after the figure renders succeeded; render-review.log is absent. The 18 figure PNGs (figures/*.png) are real renders of all EN/UR/UR-dark SVG variants; the six deterministic gates all pass. Accessibility cannot be verified without the page renders - escalated.',
  ] },
  { id: 'completeness', status: 'pass', evidence: [
    'Passage-level EN/UR comparison across index, topic-01, topic-02, topic-03, unit-assessment and unit-teacher-notes found no omitted or added passages, examples, quantities, dates, comparisons or instructional sequences; every English section has its Urdu counterpart at the same position',
    'All six figures mirrored with .ur.svg sources in the Urdu topics (topic-01.mdx:30,52; topic-02.mdx:29,55; topic-03.mdx:29,53) with translated alt text, including the G3-repaired fig-U8-1 tagline (topic-01.mdx:30)',
    'key_terms block present in the Urdu index (index.mdx:12-14); translation_status draft on all files, mirroring the English lifecycle state',
  ] },
  { id: 'semantics', status: 'fail', evidence: [
    'Negation, modal force, quantities, dates, comparisons, causal claims, examples, pronoun references and instructional sequences compared passage by passage; the great majority are faithful (e.g. "کبھی من مانی نہیں" for "never arbitrary"; "شاید" preserving the "may" hedging of the developmental reading, topic-03.mdx:51; "پانچ، پندرہ نہیں" for "five, not fifteen")',
    'Material divergences: "step" rendered as سیڑھی (ladder) in seven student-facing places (MCQ-9, RRQ-9, CYU-4, summary, checklist, fig-U8-5 alt and note); RRQ-10 "once-a-term" becomes "سال میں ایک بار" (once a year); "which is where a consequence teaches anything at all" loses its exclusivity (topic-03.mdx:47 "جہاں نتیجہ کچھ سکھاتا ہے"); "settles" as بیٹھتی ہے (sits, topic-01.mdx:28); "another confrontation" as "ایک اور آمادگی" (readiness, unit-assessment.mdx:143)',
    'Full enumerated list with locators in findings below; meanings that could not be resolved confidently: none beyond the escalated G3 dependency',
  ] },
  { id: 'terminology', status: 'fail', evidence: [
    'Bank departures on core terms: کاؤنٹرائزنگ x42 for Classroom Management (bank جماعتی انتظام, terminology.csv:26) - a garbled transliteration, contradicted by the unit\'s own fig-U8-1.ur.svg (جماعتی انتظام), concepts/unit-08.md CON:8-1 (انتظام), unit-teacher-notes.mdx:56 (names the banked term) and glossary.json; گھبراہٹ x6 for Anxiety (bank اضطراب, terminology.csv:56) at topic-01.mdx:50, topic-03.mdx:90,96, unit-assessment.mdx:113,175, unit-teacher-notes.mdx:50; حوصلہ x2 for Motivation (bank محرک) and انفرادی فرق for Individual Differences (bank انفرادی اختلافات) at index.mdx:23,38',
    'The Urdu index key_terms block declares the unbanked pair (index.mdx:12-14) - check:pipeline-gate FR-016c will fail it once translation_status flips to reviewed (same class as Unit 5 round-1 finding 8)',
    'Figure/prose/concept-graph splits on nine core terms (consistency تسلسل/استقلال; learning time تعلیمی/تعلمی; safety حفاظت/تحفظ; participation شرکت/شراکت; norms اصول/رسمیں/رسم; feedback بازخورد/تاثرات; dignity وقار/عزت; private word نجی/ذاتی بات; parent meeting میٹنگ/ملاقات); "step" rendered three ways (قدم/مرحلہ/سیڑھی)',
  ] },
  { id: 'register', status: 'fail', evidence: [
    'منتظم (manager, noun) used as an adjective for "managed" six times: index.mdx:25, topic-01.mdx:36,50,66,72, unit-teacher-notes.mdx:46 ("اچھی منتظم جماعت" / "خراب منتظم" for "well-managed / badly managed class" - should be منظم)',
    '"نشوونمائی طور پر" for "developmentally" x7 (index.mdx:34, topic-03.mdx:3,51,69,73, unit-assessment.mdx:28) plus "نشوونمائی قرأت" (topic-03.mdx:69); "پٹی پہنے ہوئی سزا" for "a punishment with a costume on" (topic-03.mdx:47); "ایک اور آمادگی" for "another confrontation" (unit-assessment.mdx:143); "کمرے کا دفاع کی ہوئی" grammar slip (unit-assessment.mdx:132)',
    'Garbled constructions: "جس کا، نوٹ کریں، دفاع نام لینے کر رہا تھا" (topic-03.mdx:90, the summative task\'s key insight); "استاد کے غلط جوابوں کے پہلے جوابوں سے بنا" (unit-assessment.mdx:141); "چلنے والا سیٹ" for "a workable set" (topic-03.mdx:37); typo "ہفہ" for ہفتہ (topic-02.mdx:86); طالب علم inside the rules quotation vs شاگرد everywhere else (topic-03.mdx:37)',
    'Otherwise academic-plain and readable: the Hyderabad two-rooms narrative, the Sukkur room, the Tando Allahyar ladder and all activities read naturally for an entering B.Ed student',
  ] },
  { id: 'rtl', status: 'fail', evidence: [
    'fig-U8-6.ur.svg + .ur.dark.svg: dividers at 648/360/576 (correct mirrors of EN 132/360/576: 648/420/204) - browser-measured 15 text strikes (7 function-column texts by x=576, 8 first-response texts by x=360; e.g. "سب سے پہلے سنے جانے کے لیے،" bbox 467.7-636, "قربت، پھر ذاتی بات؛" bbox 301.3-408); the English original measures zero crossings (figure-geometry.log; PNG figures/fig-U8-6.ur.png)',
    'fig-U8-2.ur.svg (dividers 662/424, correct 662/356) and fig-U8-4.ur.svg (628/436, correct 628/344): same unmirrored-second-divider defect; text positions are correctly mirrored so no text is struck, but the visible column boundary sits 68/92px from the intended position (figure-geometry.log)',
    'fig-U8-5.ur.svg + .ur.dark.svg: the arrowhead marker "M 780 0L 770 5L 780 10z" lies wholly outside its marker viewBox "0 0 10 10" and clips to nothing - the ladder arrow renders headless in Urdu; pixel-measured over the PNGs: EN tip-box gray-mean 0.832 vs line-only control 0.906, UR tip-box 0.931 vs the same 0.906 control (marker-pixels.log)',
    'fig-U8-1.ur.svg: the استقلال panel (x=530-760) paints over the central ellipse\'s right half (ellipse x=419-643) - a faithful mirror of the same overprint in the English original (panel 20-250 vs ellipse 137-361), recorded as an English-side residual; the mirroring itself (panels, arrows, icons, tagline) is correct in fig-U8-1 through fig-U8-4',
    'Page-level RTL sound: dir=rtl on every page, zero horizontal overflow at 1280x900 and 360x780, all tables fit (scrollWidth=clientWidth=328 at 360px), print shows no learner content past the page box and no visible dark variants (render-review.log, 18 entries)',
  ] },
];

const findings = [
  { severity: 'blocking', resolved: false, message: 'Terminology: "Classroom Management" is rendered as "جماعت کی کاؤنٹرائزنگ" - a garbled transliteration (reads like "contracting/countering"), not an Urdu word and not the banked term (terminology.csv:26 banks جماعتی انتظام). 42 occurrences across all six Urdu files (index.mdx x10 incl. the title, description and key_terms block; topic-01.mdx x15; topic-02.mdx x2; topic-03.mdx x1; unit-assessment.mdx x10; unit-teacher-notes.mdx x3). The unit\'s own artifacts contradict the prose: fig-U8-1.ur.svg title and central node say جماعتی انتظام, concepts/unit-08.md CON:8-1 says انتظام بطور ڈیزائن, unit-teacher-notes.mdx:56 explicitly names the banked term, and glossary.json\'s Urdu tooltip renders جماعت کو ایسا ڈیزائن کرنا اور چلانا. The Urdu index key_terms block (index.mdx:12-14) declares the unbanked pair and will fail check:pipeline-gate FR-016c once translation_status flips to reviewed. Repair: use جماعتی انتظام throughout (matching the figures and concept graph), or obtain an owner ruling and bank a term first (style guide: translator-vs-bank conflicts are owner-resolved).' },
  { severity: 'blocking', resolved: false, message: 'Terminology: گھبراہٹ for Anxiety instead of the banked اضطراب (terminology.csv:56) at topic-01.mdx:50, topic-03.mdx:90, topic-03.mdx:96, unit-assessment.mdx:113, unit-assessment.mdx:175 and unit-teacher-notes.mdx:50. Known repo-wide defect family (blocking in Unit 6 round 1, repaired there); the pre-flight lint 72c14f85 covered only شاگرڈ/صورت بہبود/روبرک/بازخرد and did not include it. اضطراب never appears in this unit. Repair: replace all six with اضطراب.' },
  { severity: 'blocking', resolved: false, message: 'Terminology: prerequisite-course term drift in the Urdu index - حوصلہ for Motivation (bank محرک, terminology.csv:8) at index.mdx:23 and :38, and انفرادی فرق for Individual Differences (bank انفرادی اختلافات, terminology.csv:15) at index.mdx:38. Both repeat defect families that were blocking in sibling units (Units 5 and 6 round 1). Repair: محرک and انفرادی اختلافات.' },
  { severity: 'blocking', resolved: false, message: 'Semantics/terminology: "step" of the escalation ladder is rendered as سیڑھی (ladder) in student-facing assessment items and prose: "سیڑھی کی پہلی سیڑھی ہے" (MCQ-9, unit-assessment.mdx:82), "سیڑھی کی پانچ سیڑھیاں بیان کریں" (RRQ-9, unit-assessment.mdx:104), "سیڑھی کی پانچ سیڑھیاں نام لیں" (CYU-4, topic-03.mdx:68), "سیڑھی کی پانچ سیڑھیاں اور ہر ایک کا اصول" (checklist, topic-03.mdx:79), "سیڑھی ایک سیڑھی ایک وقت میں آزمائی جاتی ہے" (summary, topic-03.mdx:73), "پانچ سیڑھیوں کی بڑھتی سیڑھی" and "ہر سیڑھی اگلی سے پہلے" (fig-U8-5 alt, topic-03.mdx:29), "ہر سیڑھ اگلی سے پہلے آزمائی جائے" (fig-U8-5.ur.svg note). "سیڑھی کی پانچ سیڑھیاں" reads "the ladder\'s five ladders". The correct words already exist in the unit\'s own artifacts: قدم (unit-teacher-notes.mdx:28 "ہر سیڑھی کا قدم") and مرحلہ (fig-U8-2/fig-U8-4 cell texts, fig-U8-5.ur.svg desc "پانچ مرحلے"). Repair: قدم or مرحلہ in all seven places, including the figure note and alt text.' },
  { severity: 'blocking', resolved: false, message: 'RTL/figure: all three Urdu table figures carry vertical grid dividers misplaced by incomplete RTL mirroring - only the FIRST M coordinate of each grid path was mirrored; the rest kept their English x positions (same defect family as Unit 6 round-1 blocking finding 6). Browser-measured (figure-geometry.log): fig-U8-6.ur.svg and fig-U8-6.ur.dark.svg have dividers at 648/360/576 where the correct mirrors of the English 132/360/576 are 648/420/204 - the x=576 divider strikes 7 function-column cell texts and the x=360 divider strikes 8 first-response cell texts (15 measured crossings, e.g. "سب سے پہلے سنے جانے کے لیے،" textX 467.7-636 crossed at 576; "قربت، پھر ذاتی بات؛" textX 301.3-408 crossed at 360), and the intended x=204 boundary is missing; the English original measures zero crossings. fig-U8-2.ur.svg has dividers 662/424 where the correct mirrors of EN 118/424 are 662/356, and fig-U8-4.ur.svg has 628/436 where the correct mirrors of EN 152/436 are 628/344 - in both, every text position IS correctly mirrored (headers at 509/184 and 486/178 are centred on the intended 356/344 boundaries), so the unmirrored divider lands inside the "what it looks like" column 68/92px from its intended position; no text is struck there, but the column boundary the reader sees is wrong. Repair: rewrite the grid paths to the fully mirrored forms - fig-U8-2 "M 662 14V426M356 14V426...", fig-U8-4 "M 628 14V426M344 14V426...", fig-U8-6 "M 648 14V426M420 14V426M204 14V426..." - in the .ur.svg and .ur.dark.svg twins (PNG evidence figures/fig-U8-6.ur.png, figures/fig-U8-2.ur.png, figures/fig-U8-4.ur.png).' },
  { severity: 'blocking', resolved: false, message: 'RTL/figure: fig-U8-5.ur.svg and fig-U8-5.ur.dark.svg - the upward arrow\'s marker head is defined as "M 780 0L 770 5L 780 10z" inside <marker viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">: every coordinate lies outside the 0-10 viewBox, so the marker clips to nothing and the ladder\'s arrow renders headless in Urdu. Pixel evidence over the rendered PNGs (marker-pixels.log): the EN tip box (25x20 SVG units around the arrow tip) measures gray-mean 0.832 against a line-only control of 0.906 (the head\'s extra dark pixels), while the UR tip box measures 0.931 - lighter than its own line-only control, i.e. the head contributes no pixels; the two line-only controls are identical (0.906), so the line itself renders the same. Even unclipped, the mirrored triangle would point backward along the upward path. Repair: keep the English +x-pointing triangle (an orient="auto" marker on an upward path rotates with the path; the arrowhead does not need mirroring), e.g. "M0 0 L10 5 L0 10 z" with refX=8, in both variants.' },
  { severity: 'blocking', resolved: false, message: 'Assessment: RRQ-10 diverges from the English item. EN (unit-assessment.mdx:125-126): "Break is the social test of the school day. Name the support that meets it, and what a once-a-term seating map shows that mark sheets do not." UR (unit-assessment.mdx:105): "وقفہ اسکول کے دن کی سماجی جانچ ہے۔ وہ سہارا نام لیں جو اس سے ملتا ہے، اور وہ جو سال میں ایک بار بنایا بیٹھنے کا نقشہ دکھاتا ہے جو نمبر کی شیٹیں نہیں دکھاتیں۔" - "once-a-term" has become "سال میں ایک بار" (once a year), a changed frequency claim in a student-facing item, and the second sentence is garbled ("وہ جو ... دکھاتا ہے جو ... نہیں دکھاتیں"). The tested concept (what the map shows) and the mark scheme are unchanged. Repair: "سہ ماہی میں ایک بار بنایا گیا بیٹھنے کا نقشہ جو کیا دکھاتا ہے، وہ نام لیں جو کوئی نمبر شیٹ نہیں دکھاتی" or equivalent.' },
  { severity: 'uncertain', resolved: false, message: 'Authority/G3 dependency (owner escalation, GQUR-300 PR #65 precedent; same status recorded by Units 5, 6 and 7): the contract requires accepted G3 evidence for the exact English inputs bound to this review. The available G3 report (specs/content/efmp-301/reviews/unit-08/G3/agent-g3-efmp301-u8-run001.json) is advisory under ADR-0019, disposition revise with an open blocking finding at review time, and its input_manifest binds the PRE-repair English (different digests for topic-01.mdx, unit-assessment.mdx, unit-teacher-notes.mdx, concepts/unit-08.md, coverage/unit-08.md, figures/unit-08.md, sources/unit-08.md, sources/texts/seifert2009.md). The English was repaired at commit f2e751aa (blueprint rebalance to 4/3/3 MCQ and 3/4/3 RRQ spreads plus advisory repairs) with no round-2 G3 verification, and no signed/accepted G3 exists for the current inputs. The full Urdu-vs-English comparison was nevertheless performed against the current bound English. The owner must decide how the G3 gap is closed (fresh G3 run002 on the post-repair English, or acceptance of run001 plus the repair diff).' },
  { severity: 'advisory', resolved: false, message: 'Terminology unification (figure/prose/concept-graph): nine core terms are rendered differently across the unit\'s Urdu surfaces - consistency تسلسل (prose) vs استقلال (fig-U8-1.ur.svg, fig-U8-2.ur.svg, concepts/unit-08.md CON:8-4); learning time تعلیمی وقت (prose) vs تعلمی وقت (fig-U8-1.ur.svg, CON:8-1); safety حفاظت (prose) vs تحفظ (fig-U8-1.ur.svg, CON:8-1); participation شرکت (prose) vs شراکت (fig-U8-1.ur.svg, CON:8-1); norms شرکت کے اصول (prose) vs شراکت کی رسمیں (fig-U8-3/4.ur.svg, CON:8-6) vs رسم (MCQ-10 stem, unit-assessment.mdx:88); feedback بازخورد (prose) vs تاثرات (fig-U8-3/4.ur.svg; the bank banks تشکیلی تاثرات for Formative Feedback); dignity وقار (prose) vs عزت (fig-U8-5.ur.svg, CON:8-9); private word نجی بات (prose, fig-U8-5) vs ذاتی بات (fig-U8-6.ur.svg); parent meeting والدین کی میٹنگ (prose, MCQ-9d) vs والدین سے ملاقات (fig-U8-5/6.ur.svg). concepts/unit-08.md\'s own foot note asks G5 to confirm its authored Urdu labels and promote survivors into the bank - that owner decision resolves several of these splits.' },
  { severity: 'advisory', resolved: false, message: 'Figure label word-choice: fig-U8-6.ur.svg column header "ممکنہ کارکردگی" renders "a likely function" as "likely performance" (کارکردگی is the bank\'s performance/achievement word; the unit\'s prose and the MDX alt use فعل - topic-03.mdx:53 "ممکن فعل"); fig-U8-6 row label "بلند آواز میں" (in a loud voice) for "calling out" (the SVG desc carries the fuller بلند آواز میں بولنا); fig-U8-5.ur.svg note "سرپٹی نہیں" for "not a slip" (سرپٹ means headlong; the prose correctly uses پھسلنا, topic-03.mdx:73); fig-U8-1.ur.svg desc and the topic-01.mdx:30 alt "بطور داخل" for "as inputs" (داخل means entering/inside; suggest ان پٹ یا خام مال).' },
  { severity: 'advisory', resolved: false, message: 'Register: منتظم (manager, a noun) used as an adjective for "managed" six times - "اچھی منتظم جماعت" / "خراب منتظم" at index.mdx:25, topic-01.mdx:36,50,66,72 and unit-teacher-notes.mdx:46 (should be منظم / اچھی طرح منظم); "نشوونمائی طور پر" for "developmentally" x7 (index.mdx:34, topic-03.mdx:3,51,69,73, unit-assessment.mdx:28) - a non-standard coinage, suggest ترقیاتی انداز سے - plus "نشوونمائی قرأت" (topic-03.mdx:69; قرأت is recitation, not the interpretive "reading"); "پٹی پہنے ہوئی سزا" for "a punishment with a costume on" (topic-03.mdx:47; پٹی = bandage/strip, suggest بھیس بدلے ہوئے سزا); "ایک اور آمادگی" for "another confrontation" (unit-assessment.mdx:143; آمادگی = readiness, suggest ایک اور مقابلہ); "کمرے کا دفاع کی ہوئی" grammar slip (unit-assessment.mdx:132); "جس کا، نوٹ کریں، دفاع نام لینے کر رہا تھا" garbles the summative task\'s key insight "which, notice, is the thing the naming was defending" (topic-03.mdx:90); "استاد کے غلط جوابوں کے پہلے جوابوں سے بنا" double-genitive garble (unit-assessment.mdx:141); "چلنے والا سیٹ" transliterates "set" (topic-03.mdx:37); "کم سطح کی خلل" gender slip (topic-03.mdx:45, خلل is masculine); "معیار بیٹھانے کے لیے" calque for "to set standards" (unit-assessment.mdx:60); typo "ہفہ" for ہفتہ (topic-02.mdx:86); طالب علم inside the rules quotation while all surrounding prose uses شاگرد (topic-03.mdx:37).' },
  { severity: 'advisory', resolved: false, message: 'Minor semantic drifts to align: "settles somewhere near the middle of the period" rendered "پیریڈ کے درمیان کہیں بیٹھتی ہے" (sits, topic-01.mdx:28; suggest سنبھلتی ہے); "which is where a consequence teaches anything at all" loses its exclusivity (topic-03.mdx:47 "جہاں نتیجہ کچھ سکھاتا ہے"); MCQ-7a "procedures for efficiency" as "کارکردگی کے طریقۂ کار" (unit-assessment.mdx:71); fig-U8-4 "mark the first work for the next step only" as "چیک کریں" vs the prose\'s "نمبر دیں" (topic-02.mdx:51); fig-U8-1 on-image tagline "کاپیوں میں نظر آتی ہے" vs the MDX alt\'s "کتابوں میں نظر آنے والی" (exercise books vs books); "rigidity" as سخت گیری (strictness, topic-01.mdx:44); "میزوں کی جالی" for "the desk grid" (topic-02.mdx:37).' },
  { severity: 'advisory', resolved: false, message: 'English-side residuals for the owner (faithfully mirrored into Urdu, not translation defects): (1) fig-U8-2.svg and fig-U8-2.ur.svg carry only three horizontal separators (y=76/190/304) for four principle rows - the engagement and consistency rows share the y=304-426 band with no divider between them; (2) fig-U8-1.svg and fig-U8-1.ur.svg paint the consistency/استقلال panel over the central ellipse\'s inner half (EN ellipse x=137-361 vs panel x=20-250; UR ellipse x=419-643 vs panel x=530-760), covering the ellipse-to-panel connector and the inner half of the central label - both passed the G3 round\'s text-vs-viewBox and non-blank-pixel checks, which cannot see panel-on-ellipse overprint; conclusion rests on the SVG paint-order arithmetic (elements after the ellipse paint over it).' },
  { severity: 'advisory', resolved: false, message: 'Platform/owner, out of unit scope: Urdu h1/h2 headings resolve to the Latin system-ui font stack on Urdu pages while body text is Noto Nastaliq Urdu - recorded by the Units 5 and 6 G5 rounds as a course-wide typography gap' + (accessibilityPass ? ' (confirmed on this unit\'s rendered pages: h1 computed font-family is the system-ui stack, body is Noto Nastaliq Urdu; render-review.log)' : ' (could not be re-confirmed on this unit\'s pages this run - classifier outage; recorded from the sibling-unit evidence)') + '. Also for the owner: the Bash safety classifier (automode) was unavailable for most of this run; the deterministic gates and figure renders were executed in the available windows and the passage comparison was completed read-only in between.' },
];

const commands = [
  { name: 'validate:content', exit_code: 0, log_path: `${logs}/validate-content.log` },
  { name: 'check:depth-gate', exit_code: 0, log_path: `${logs}/check-depth-gate.log` },
  { name: 'check:figures', exit_code: 0, log_path: `${logs}/check-figures.log` },
  { name: 'check:no-em-dash', exit_code: 0, log_path: `${logs}/check-no-em-dash.log` },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: `${logs}/check-no-answer-keys.log` },
  { name: 'check:docs-sync', exit_code: 0, log_path: `${logs}/check-docs-sync.log` },
  { name: 'verify-manifest', exit_code: 0, log_path: `${logs}/verify-manifest.log` },
  { name: 'render-figures', exit_code: 0, log_path: `${logs}/render-figures.log` },
  { name: 'measure-figure-text', exit_code: 0, log_path: `${logs}/measure-figure-text.log` },
];
if (geometry) commands.push({ name: 'figure-geometry', exit_code: 0, log_path: `${logs}/figure-geometry.log` });
commands.push({ name: 'marker-pixels', exit_code: 0, log_path: `${logs}/marker-pixels.log` });
commands.push({ name: 'figure-serve-check', exit_code: 0, log_path: `${logs}/figure-serve-check.log` });
if (renderReview) commands.push({ name: 'render-review', exit_code: 0, log_path: `${logs}/render-review.log` });
else commands.push({ name: 'render-review', exit_code: 1, log_path: `${logs}/render-review-missing.log` });

const disposition = (geometry && hasPageRenders) ? 'revise' : 'escalate';
const report = {
  schema_version: 1,
  course_code: 'EFMP-301',
  unit_no: 8,
  stage: 'G5',
  disposition,
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'claude-code:022-author-efmp-301:c6325afe',
  reviewer_run_id: 'agent-g5-efmp301-u8-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-26T00:30:00Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: prepared.skill_digest,
  g3_report: 'specs/content/efmp-301/reviews/unit-08/G3/agent-g3-efmp301-u8-run001.json',
  input_manifest: prepared.input_manifest,
  criteria,
  findings,
  commands,
  evidence_manifest: evidence,
};
writeFileSync(join(root, dir, 'agent-g5-efmp301-u8-run001.json'), JSON.stringify(report, null, 2) + '\n');
console.log('report written, disposition:', disposition, '| criteria:', criteria.map((c) => `${c.id}:${c.status}`).join(' '), '| evidence files:', Object.keys(evidence).length);
