// Assembles agent-g5-gqur300-u3-run001.json with evidence hashes computed from
// the exact saved bytes. Report content only; no content, tracker, bank or
// translation_status changes.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const L = 'specs/content/gqur-300/reviews/unit-03/G5/logs-agent-g5-gqur300-u3-run001';
const R = 'specs/content/gqur-300/reviews/unit-03/G5/renders-agent-g5-gqur300-u3-run001';
const manifest = JSON.parse(readFileSync('specs/content/gqur-300/reviews/unit-03/G5/manifest.json', 'utf8'));

const evidence = {};
for (const f of readdirSync(L)) evidence[`${L}/${f}`] = sha(`${L}/${f}`);
for (const f of readdirSync(R)) evidence[`${R}/${f}`] = sha(`${R}/${f}`);

const UR = 'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-03';
const EN = 'docs/semester-1/gqur-300/unit-03';

const report = {
  schema_version: 1,
  course_code: 'GQUR-300',
  unit_no: 3,
  stage: 'G5',
  disposition: 'revise',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'commit:59faad3f68b3760c693379e66dfbc5273f28bd37',
  reviewer_run_id: 'agent-g5-gqur300-u3-run001',
  model: 'longcat-2.0',
  started_at: '2026-09-23T23:05:00Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: manifest.skill_digest,
  rulings: { 'D-2026-0001': '8ff79df9af668329f6d0094a2257654f45fc545122a753b4888fb9936f402f1f' },
  input_manifest: manifest.input_manifest,
  criteria: [
    {
      id: 'authority',
      status: 'fail',
      evidence: [
        `Bundle verified: all 115 bound inputs recomputed identical to specs/content/gqur-300/reviews/unit-03/G5/manifest.json using the contract normalization (${L}/input-binding-verification.txt); worktree HEAD 59faad3, clean tree.`,
        'G3 dependency unmet: no accepted G3 evidence exists (ADR-0019; specs/reviewers/registry.json has no enabled reviewers). Best-available context: G3 run001 advisory report (disposition revise) at specs/content/gqur-300/reviews/unit-03/G3/agent-g3-gqur300-u3-run001.json.',
        'English digest changed since that G3 report: docs/semester-1/gqur-300/unit-03/topic-02.mdx and unit-assessment.mdx (git diff 93e6321..HEAD shows exactly the G3 advisory repairs F2/F3 applied at 78f0366). No re-review covers the repaired English; recorded as a dependency finding per the review handoff, not an abort.',
        `Course/unit identity consistent across locales: GQUR-300 unit 3, same clo_refs (SLO:GQUR-300-1-1, SLO:GQUR-300-2-2) in all six Urdu files; course outcomes 1 (numerical and algebraic reasoning) and 2 (solve real-world quantitative problems) are taught and assessed in the Urdu mirror.`,
        `G2 context: the newest bound G2 evidence (specs/content/gqur-300/reviews/unit-03/G2/20260924T011726786Z-gates.json, commit 78f0366) predates the course-wide Urdu sweep (c61192e) that touched this unit's Urdu files; all deterministic gates were re-run fresh at HEAD by this review with exit 0.`,
      ],
    },
    {
      id: 'sources',
      status: 'pass',
      evidence: [
        `Urdu Further-reading sections cite the same three sources with identical URLs/DOI (${UR}/topic-01.mdx:136-142, topic-02.mdx:139-144, topic-03.mdx:125-131); chapter titles translated (باب 2: الجبرا کی زبان), citation data unchanged.`,
        `The Gula and Lovric (2025) claim (crossing between concrete and abstract thinking) is preserved without distortion at ${UR}/topic-01.mdx:49-51.`,
        `The NCC curriculum claim is preserved at ${UR}/topic-01.mdx:51-54; minor drift: "(NCC, n.d.)" becomes "(NCC)".`,
        'U3-03 (linear inequalities) is declared no-external-source in specs/content/gqur-300/sources/unit-03.md with attempts, date (2026-09-24) and escalation G-2026-29; per D-2026-0001 this does not by itself block (ruling cited in rulings).',
        'No source claim is fabricated, dropped or strengthened in the Urdu mirror.',
      ],
    },
    {
      id: 'coverage',
      status: 'fail',
      evidence: [
        `All five sub-topics present in Urdu: U3-01/U3-04 (${UR}/topic-01.mdx), U3-02/U3-03 (${UR}/topic-02.mdx), U3-05 (${UR}/topic-03.mdx); heading counts match the English exactly per file (5/5, 12/12, 12/12, 11/11, 10/10, 8/8).`,
        `U3-03 (linear inequalities) is not validly assessed in Urdu: ERQ-4's Urdu stem omits the 45-rupee unit price, so the item the sub-topic's assessment rests on is unsolvable as written (${UR}/unit-assessment.mdx:132-135).`,
        `Both course outcomes are taught and assessed in Urdu across the three topics and the 10/10/5 bank.`,
      ],
    },
    {
      id: 'assessment',
      status: 'fail',
      evidence: [
        `All 25 Urdu items answered independently before reading the key (${L}/assessment-independent-working.txt); the English key was itself re-derived and is correct for all 25 items.`,
        `10/10 MCQ keys match the English (a,b,b,b,b,a,b,b,b,b); options in the same a-d order; no option leaks an answer; no item is lowered to recall.`,
        `RRQ model answers and mark schemes equivalent, including RRQ-8 which correctly tracks the G3-repaired English (substitution check belongs to the decide step, ${UR}/unit-assessment.mdx:172-174).`,
        `ERQ rubric weights identical (7/7/7/8/10) and Analyze/Evaluate tags preserved; ERQ-4 is the exception: its Urdu stem cannot produce the rubric's 45b <= 1,700 (blocking finding).`,
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        `Urdu alt text present and faithful on all six figures (${UR}/topic-01.mdx:24,58, ${UR}/topic-02.mdx:25,65, ${UR}/topic-03.mdx:25,42); fig-U3-2's Urdu alt additionally names the five vocabulary terms (benign addition).`,
        'All six .ur.svg and .ur.dark.svg variants committed; zero zero-size and zero out-of-bounds text nodes in the Urdu variants (figure-measurements.txt); dark variants carry the same labels; check:figures exit 0.',
        'Pages render with dir=rtl and the Noto Nastaliq Urdu webfont loaded (fonts.check true, woff2 200); no horizontal overflow and zero clipped elements at 1280px and 360px on all six pages (render-measurements.txt).',
        'A4 print emulation captured for all six pages (print-a4-*.png); advisory: figure labels scale to 3.3-4.1 CSS px at the 360px viewport (figure-scale.txt), the same systemic figure-design condition the Unit 1 G5 run flagged; it affects the English variants equally.',
      ],
    },
    {
      id: 'completeness',
      status: 'fail',
      evidence: [
        `Structural parity complete: every English section has an Urdu counterpart in all six files; the Urdu index carries the required key_terms block (8 terms, ${UR}/index.mdx:12-28), the intentional G4 structural addition.`,
        `Material omission: the topic-02 worked-example setup omits "at most 2,000 rupees" (${UR}/topic-02.mdx:76-77 vs ${EN}/topic-02.mdx:78-80); the 2,000 first appears mid-solution at ${UR}/topic-02.mdx:78.`,
        `Smaller omissions recorded in ${L}/bilingual-comparison.txt: Amna's "so 3 plus 38 more" (topic-01:29-30), "(NCC, n.d.)" (topic-01:52), "for a function" (topic-01:122), "safety" in "safety check" (topic-02:33), "for b boxes" (topic-02:68), "hover or tap" (index:75-76), "substitution" in the bus-task check (topic-02:129, assessment ERQ-2), "of triangles / can carry" compressions (assessment ERQ-1).`,
        `Benign additions (no repair needed): fig-U3-2 Urdu alt names the five terms; fig-U3-5.ur.svg adds the four strategy steps in parentheses.`,
      ],
    },
    {
      id: 'semantics',
      status: 'fail',
      evidence: [
        `Blocking: ERQ-4 stem omits the 45-rupee unit price (${UR}/unit-assessment.mdx:132-135 vs ${EN}/unit-assessment.mdx:138-139).`,
        `Blocking: topic-02 worked example omits the 2,000-rupee budget from the setup (${UR}/topic-02.mdx:76-77).`,
        `Blocking: arithmetic error "38 ضرب 45 = 1,770" (${UR}/topic-02.mdx:80-81); 38 x 45 = 1,710 (${EN}/topic-02.mdx:83; the Urdu ERQ-4 rubric at unit-assessment.mdx:194 has the correct 1,710).`,
        `Blocking: "Defend one answer to the class" rendered as "ایک جواب کلاس کے سامنے بچائیں" ("save one answer", ${UR}/topic-03.mdx:74 vs ${EN}/topic-03.mdx:75-76).`,
        `Advisory shifts: modal force "a teacher must walk" -> "چاہتی ہے" (topic-01:53-54); "round in the direction the situation demands" -> "وہاں گول کرنا" (index:51-52, topic-02:108-109); "sign slips" -> "نشانیاں" (topic-02:55); tense shift "settled" -> present (topic-03:36).`,
      ],
    },
    {
      id: 'terminology',
      status: 'fail',
      evidence: [
        `Banked terms correctly applied: معیارِ جانچ (Rubric) in all rubric contexts, گروہی کام (Group Work) at teacher-notes:61, حکمتِ تدریس (Teaching Strategy) heading at teacher-notes:28, خود جائزہ (Self-Assessment) in all three topics; ٹیوٹر transliteration applied; no residual ربرک or خود جانچ.`,
        `Residual of the swept گروپ class: "گروپ اسائنمنٹ" at ${UR}/unit-teacher-notes.mdx:61 (گروہی اسائنمنٹ expected).`,
        `Internal inconsistency: index key_terms "ترازو ماڈل" (Balance model) vs glossary/body "ترازو" alone (${UR}/topic-02.mdx:42-44).`,
        `Systematic calque "قیمت" (price) for "value (of a variable)" at topic-01:63, topic-01:104, topic-02:41-42, unit-assessment:112-113 and fig-U3-2.ur.svg; standard term قدر.`,
        `Unbanked coinages flagged for G5 confirmation in specs/content/gqur-300/concepts/unit-03.md: confirmed acceptable (متغیر، نمونہ، تسلسل، عددِ ضرب، رکن، لکیری مساوات، لکیری نابرابری); disputed (اثر for expression; بڑھوٹر for growth). Owner decisions required; survivors to be promoted into terminology.csv.`,
      ],
    },
    {
      id: 'register',
      status: 'fail',
      evidence: [
        'Overall the prose is academic-plain (درسی مگر عام فہم) and understandable for an entering B.Ed student; the reader is addressed in the feminine throughout, consistent with GQUR-300 Units 1-2 where the same policy is already an open owner question (carried over, not re-raised as new).',
        `Non-words: "بڑھوٹر" (growth; topic-01:48,102, unit-assessment:22) and "بنکھیں" (draw; topic-01:85).`,
        `Misspellings: "قائدوں" for قاعدوں (topic-01:102), "نابرابلی" for نابرابری (unit-assessment:124), "موازنے" for موازنہ (teacher-notes:75), "ممکنے چھوٹے چھپائی" for ممکنہ چھوٹی چھپائی (topic-03:122, unit-assessment:191).`,
        `Grammar slips: "کر سکنے گیں" (index:45), "کی عددی کام" for کا (index:37), "ایک ایسے کل" (topic-02:121), "خرچ اثر" for خرچ کا اثر (topic-03:78), "کچھ کچھ کے برابر" (topic-01:68).`,
        `Latin "substitution" (index:49, topic-02:25,93,113, unit-assessment:104,110,134,164,172) and "brainstorming" (teacher-notes:30) kept in Latin script, consistent within the unit; the Bloom tags and MCQ/RRQ/ERQ labels are kept in English in both locales (same advisory as the Unit 1 G5).`,
      ],
    },
    {
      id: 'rtl',
      status: 'pass',
      evidence: [
        'dir=rtl on all six Urdu pages; computed body font resolves to "Noto Nastaliq Urdu" and document.fonts.check is true with the woff2 fetched 200 (font-figure-scale.txt).',
        'No horizontal overflow and zero viewport-clipped elements at 1280x900 and 360x740 on all six pages (render-measurements.txt); A4 print emulation captured (print-a4-*.png).',
        'RTL table order verified inside the SVG tables: fig-U3-2.ur.svg headers اصطلاح x=630 > مطلب x=360 > مثال x=140; fig-U3-6.ur.svg روزمرہ جملہ x=550 > الجبرا x=180 (term/phrase column rightmost).',
        'Embedded Latin (2t + 1, 60 + 15k = 195, x > 4, -2x < -8, k = 9, substitution) is present in the RTL flow in prose, figures and alt text; western numerals per course convention; no wrapping or clipping defects found.',
        'Limitation recorded: this review host returns no visual content for image reads (verified with a minimal valid PNG), so inspection is DOM-, geometry-, font-state- and pixel-ink-based; all 24 screenshots are saved under renders-agent-g5-gqur300-u3-run001/ for human eyeballing (render-review.txt).',
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: false,
      message: `[assessment] ERQ-4 stem omits the unit price. EN ${EN}/unit-assessment.mdx:138-139 "geometry boxes costing 45 rupees each"; UR ${UR}/unit-assessment.mdx:132-135 states the 2,000-rupee cap and the 300-rupee debt but never the 45-rupee price, so 45b <= 1,700 cannot be derived from the Urdu text while the rubric (UR:193-196) still expects it. The Urdu item is unsolvable as written. Repair: add "45 روپے فی ڈبہ" to the stem.`,
    },
    {
      severity: 'blocking',
      resolved: false,
      message: `[semantics/completeness] Topic-02 worked example omits the budget constraint. EN ${EN}/topic-02.mdx:78-80 "A school can spend at most 2,000 rupees on geometry boxes..."; UR ${UR}/topic-02.mdx:76-77 has only "can buy geometry boxes at 45 rupees per box" plus the 300-rupee debt; the 2,000 first appears mid-solution at UR:78 ("ڈبوں کے لیے دستیاب: 2,000 - 300 = 1,700"). A reader of the Urdu alone cannot reconstruct the problem. Repair: add "زیادہ سے زیادہ 2,000 روپے خرچ کر سکتا ہے" to the setup (the assessment's ERQ-4 UR stem has this part right).`,
    },
    {
      severity: 'blocking',
      resolved: false,
      message: `[semantics] Arithmetic error introduced in translation. UR ${UR}/topic-02.mdx:80-81 "38 ضرب 45 = 1,770"; 38 x 45 = 1,710. EN ${EN}/topic-02.mdx:83 says 1,710 and the Urdu ERQ-4 rubric (${UR}/unit-assessment.mdx:194) also says 1,710, confirming the topic-02 figure is drift. Repair: 1,770 -> 1,710.`,
    },
    {
      severity: 'blocking',
      resolved: false,
      message: `[semantics] Wrong verb corrupts an activity step. EN ${EN}/topic-03.mdx:75-76 "Defend one answer to the class"; UR ${UR}/topic-03.mdx:74 "ایک جواب کلاس کے سامنے بچائیں" ("save one answer before the class") - بچانا means save, the needed verb is دفاع کرنا, which the teacher notes use correctly at ${UR}/unit-teacher-notes.mdx:63. The rate-card clinic's capstone step is unperformable as written. Repair: "کلاس کے سامنے ایک جواب کا دفاع کریں".`,
    },
    {
      severity: 'uncertain',
      resolved: false,
      message: `[authority] G3 dependency unmet. No accepted G3 evidence exists in the registry (ADR-0019; agent certification blocked). Best-available: the G3 run001 advisory report (disposition revise) plus the English inputs bound in this manifest, which are the comparison base used. The English digest has changed since that G3 report (topic-02.mdx, unit-assessment.mdx - exactly the G3 advisory repairs applied at 78f0366, verified by git diff 93e6321..HEAD); no re-review covers the repaired English. The Urdu tracks the repaired English (RRQ-8 model and the 150-rupee fare example both match). This report is advisory only; a pass at G5 would additionally require an accepted G3 report for the current English inputs.`,
    },
    {
      severity: 'uncertain',
      resolved: false,
      message: `[terminology] Owner decisions required on unbanked math terms (specs/content/gqur-300/concepts/unit-03.md lists them with a G5 flag; none are in terminology.csv). Confirmed acceptable: متغیر (variable), نمونہ (pattern), تسلسل (sequence), عددِ ضرب (coefficient), رکن (term), لکیری مساوات/نابرابری (linear equation/inequality), ترازو (balance). Disputed: (a) اثر for "expression" - اثر ordinarily means effect/impact and the standard Pakistani textbook term is الجبرائی عبارت; used consistently (index key_terms, all topics, assessment, fig-U3-2) so a one-time owner ruling can settle it; (b) بڑھوٹر for "growth" - not a dictionary word, نمو or بڑھاؤ is standard; (c) قیمت for "value (of a variable)" - reads as price in a unit full of rupee amounts, standard term قدر; (d) index key_terms "ترازو ماڈل" vs topic-02 body "ترازو" - pick one form. Survivors should be promoted into specs/content/terminology.csv per the concepts table; the bank was not edited by this review.`,
    },
    {
      severity: 'uncertain',
      resolved: false,
      message: `[register] Reader-gender policy carried over from GQUR-300 Units 1-2 (owner ruling still pending there): the Urdu addresses the reader exclusively in the feminine (index:45 "کر سکنے گیں"; checklists "سکتی ہوں"; topic-03:64 "دیکھ لیتی ہیں"). Consistent across this unit and with Units 1-2, so not re-raised as a new Unit 3 defect; the pending ruling covers all three units. Note index:45 "کر سکنے گیں" is also ungrammatical in any policy (should be "کر سکیں گیں").`,
    },
    {
      severity: 'advisory',
      resolved: false,
      message: `[semantics] Teacher-notes referent error on a swept line. EN ${EN}/unit-teacher-notes.mdx:32-33 "the tutor circulates while pairs trade equations" (the tutor = the notes' reader); UR ${UR}/unit-teacher-notes.mdx:32-33 "آپ کے ٹیوٹر جوڑیوں کے بیچ گھومتے رہیں" ("your tutor keeps circulating") - the sweep replaced the bare Latin "tutors" here with "آپ کے ٹیوٹر", cementing a broken point of view, and "while pairs trade equations" is dropped. Repair: "آپ جوڑیوں کے بیچ گھومتے رہیں جبکہ جوڑیاں مساواتیں آپس میں بدلیں".`,
    },
    {
      severity: 'advisory',
      resolved: false,
      message: `[terminology] Residual of the swept گروپ defect class: "گروپ اسائنمنٹ" at ${UR}/unit-teacher-notes.mdx:61 (EN "a group assignment") where the established form is گروہی (banked Group Work = گروہی کام applied on the same line). Repair: گروہی اسائنمنٹ.`,
    },
    {
      severity: 'advisory',
      resolved: false,
      message: `[register] Word-level defects, each a one-word repair: بڑھوٹر -> نمو/بڑھاؤ (topic-01:48,102; unit-assessment:22; also part of the terminology ruling), بنکھیں -> کھینچیں (topic-01:85), قائدوں -> قاعدوں (topic-01:102), نابرابلی -> نابرابری (unit-assessment:124), موازنے -> موازنہ (teacher-notes:75), ممکنے چھوٹے چھپائی -> ممکنہ چھوٹی چھپائی (topic-03:122; unit-assessment:191), کر سکنے گیں -> کر سکیں گیں (index:45), کی عددی کام -> کا عددی کام (index:37), ایک ایسے کل -> ایسا کل (topic-02:121), خرچ اثر -> خرچ کا اثر (topic-03:78), کچھ کچھ کے برابر -> کچھ چیز کچھ چیز کے برابر (topic-01:68), استادانی -> استانی (topic-01:28).`,
    },
    {
      severity: 'advisory',
      resolved: false,
      message: `[semantics] Small omissions and modal shifts to tighten at the human pass: Amna's "so 3 plus 38 more" dropped (topic-01:29-30); "(NCC, n.d.)" -> "(NCC)" (topic-01:52); "for a function" dropped (topic-01:122); "safety check" -> جانچ (topic-02:33); "for b boxes" dropped (topic-02:68); "hover or tap them" -> "ان پر جائیں" (index:75-76); "substitution check" loses "substitution" in the bus task (topic-02:129) and assessment ERQ-2 (UR:125-126) though kept in ERQ-1/ERQ-4; ERQ-1 compresses "largest whole number of triangles a 70-metre ribbon can carry" to "70 میٹر ربن کی سب سے بڑی پوری تعداد" (unit-assessment:121-122); "a teacher must walk" -> "چاہتی ہے" wants-to (topic-01:53-54); "round in the direction the situation demands" -> "وہاں گول کرنا" round-where (index:51-52, topic-02:108-109); "sign slips" -> "نشانیاں" (topic-02:55); "a rule plus a known total" -> "قاعدہ بمقابلہ معلوم کل" rule-versus-total (index:39); gender mismatch "ایک تربیتی طالبہ، مجاہد" - طالبہ is feminine, Amjad male (topic-03:29; use طالبِ علم).`,
    },
    {
      severity: 'advisory',
      resolved: false,
      message: `[rtl] Figure label size at the narrow viewport: the six figures render 328px wide at 360px, scaling their 12-15px SVG labels to 3.3-4.1 CSS px - below comfortable reading size, and Nastaliq stacking worsens it (figure-scale.txt). Same systemic figure-design condition the Unit 1 G5 run flagged (~5.5 CSS px there); it affects the English variants equally, so it is not introduced by the translation. No clipping or out-of-bounds text was found in the Urdu variants.`,
    },
    {
      severity: 'advisory',
      resolved: false,
      message: `[register] Latin technical terms left in Urdu prose: "substitution" (index:49; topic-02:25,93,113; unit-assessment:104,110,134,164,172) and "brainstorming" (teacher-notes:30), plus established transliterations (فلو چارٹ، ریٹ کارڈ، فلیٹ شرح، سیٹ اپ، کاؤنٹر). Consistent within the unit; the Unit 1 G5 already carries the owner question on keeping Bloom tags and bank labels in English, and these belong in the same ruling.`,
    },
    {
      severity: 'advisory',
      resolved: true,
      message: `RESOLVED - INPUT BINDING VERIFIED. All 115 bound inputs recomputed identical to specs/content/gqur-300/reviews/unit-03/G5/manifest.json under the contract normalization (translation_status lifecycle lines; content-spec bound as the ADR-0027 Unit-3 slice) at worktree HEAD 59faad3, clean tree (${L}/input-binding-verification.txt). A raw-byte check differs on exactly the 13 normalized paths, as expected.`,
    },
    {
      severity: 'advisory',
      resolved: true,
      message: `RESOLVED - INDEPENDENCE. This session did not author or translate any reviewed byte: the unit was authored at fe83157, translated at fe16a05, G3-repaired at 78f0366 and Urdu-swept at c61192e, all before this fresh session started from a clean worktree at 59faad3.`,
    },
    {
      severity: 'advisory',
      resolved: true,
      message: `RESOLVED - SWEEP VERIFICATION. The parent's course-wide sweep holds in Unit 3: ٹیوٹر transliteration applied (5 loci, no residual Latin "tutors"), معیارِ جانچ for rubric in all four rubric contexts, گروہی کام at teacher-notes:61, حکمتِ تدریس heading at teacher-notes:28, خود جائزہ in all three checklists, and the key_terms block present in the UR index (8 terms). Two residuals of the swept classes are reported separately (گروپ اسائنمنٹ; the آپ کے ٹیوٹر referent on a swept line).`,
    },
    {
      severity: 'advisory',
      resolved: true,
      message: `RESOLVED - RENDER ACCESS. Production build of both locales (exit 0), served locally, all six Urdu routes 200; desktop 1280x900, narrow 360x740 (dsf 2) and A4 print 794x1123 captured for all six pages plus the six standalone .ur.svg variants (24 screenshots). Nastaliq webfont confirmed loaded; no overflow or clipping. Host limitation (no image display, verified with a minimal valid PNG) recorded in render-review.txt; screenshots saved for human eyeballing.`,
    },
  ],
  commands: [
    { name: 'verify-input-manifest', exit_code: 0, log_path: `${L}/input-binding-verification.txt` },
    { name: 'bilingual-comparison', exit_code: 0, log_path: `${L}/bilingual-comparison.txt` },
    { name: 'assessment-independent-working', exit_code: 0, log_path: `${L}/assessment-independent-working.txt` },
    { name: 'validate:content', exit_code: 0, log_path: `${L}/validate-content.txt` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${L}/check-depth-gate.txt` },
    { name: 'check:figures', exit_code: 0, log_path: `${L}/check-figures.txt` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${L}/check-no-em-dash.txt` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${L}/check-no-answer-keys.txt` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${L}/check-docs-sync.txt` },
    { name: 'check:pipeline-gate', exit_code: 0, log_path: `${L}/check-pipeline-gate.txt` },
    { name: 'check:concept-graph', exit_code: 0, log_path: `${L}/check-concept-graph.txt` },
    { name: 'check:bloom-bands', exit_code: 0, log_path: `${L}/check-bloom-bands.txt` },
    { name: 'build', exit_code: 0, log_path: `${L}/build.txt` },
    { name: 'serve', exit_code: 0, log_path: `${L}/serve.txt` },
    { name: 'render-review', exit_code: 0, log_path: `${L}/render-review.txt` },
  ],
  evidence_manifest: evidence,
  summary:
    'Advisory G5 Urdu review of GQUR-300 Unit 3 (Algebraic Reasoning) at commit 59faad3; ADVISORY ONLY under ADR-0019 - no tracker row, sign-off or status change follows from this report. All 115 bound inputs verified. The six-file Urdu mirror is structurally complete (heading parity exact, key_terms present), the sweep fixes from Units 1-2 hold, all 25 assessment items were independently answered (10/10 MCQ keys match, no leakage, no lowered demand), the .ur.svg variants are correctly mirrored for RTL with correct table order, and everything renders cleanly at desktop, 360px and A4 print with the Nastaliq webfont loaded. Four blocking defects require repair before this unit could pass: the ERQ-4 stem omits the 45-rupee unit price (item unsolvable in Urdu), the topic-02 worked example omits the 2,000-rupee budget from its setup, an arithmetic error (38 x 45 given as 1,770 instead of 1,710), and "Defend one answer" rendered as "save one answer" (بچائیں). Terminology needs owner rulings (اثر for expression, بڑھوٹر for growth, قیمت for value, ترازو vs ترازو ماڈل) with the unbanked coinage set confirmed or promoted per the concepts table. Disposition: revise.',
  notes:
    'Severity vocabulary follows the evidence contract (blocking/uncertain/advisory); "blocking" means must-repair-before-pass. The G3 stage remains advisory (ADR-0019) and no accepted G3 evidence exists, so this G5 cannot certify anything even after repairs; a fresh G5 attempt would need a new prepared manifest and a fresh reviewer session. The deterministic parity gates fire only at translation_status: reviewed, so the structural parity gate is dormant at draft (check-pipeline-gate.txt lists this unit as gate-checked); no translation_status value was changed by this review. This review did not edit unit prose, the terminology bank, policy, tracker or any prior report, and did not run review-evidence.mjs accept.',
};

writeFileSync('specs/content/gqur-300/reviews/unit-03/G5/agent-g5-gqur300-u3-run001.json', JSON.stringify(report, null, 2) + '\n');
console.log('report written; evidence files:', Object.keys(evidence).length);
