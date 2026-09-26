// Report writer - agent-g5-efmp301-u11-run001 (G5 Urdu review, EFMP-301 Unit 11)
// Assembles the contract JSON report and hashes every evidence artifact.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

const ROOT = process.cwd();
const DIR = 'specs/content/efmp-301/reviews/unit-11/G5';
const LOGS = `${DIR}/logs-agent-g5-efmp301-u11-run001`;
const RENDERS = `${DIR}/renders-agent-g5-efmp301-u11-run001`;
const RENERS = RENDERS;
const sha = (p) => createHash('sha256').update(readFileSync(join(ROOT, p))).digest('hex');

const manifest = JSON.parse(readFileSync(join(ROOT, DIR, 'manifest.json'), 'utf8'));

const evidence = {};
for (const f of readdirSync(join(ROOT, LOGS)).sort()) {
  const p = `${LOGS}/${f}`;
  if (statSync(join(ROOT, p)).isFile()) evidence[p] = sha(p);
}
for (const f of readdirSync(join(ROOT, RENDERS)).sort()) {
  const p = `${RENERS}/${f}`;
  evidence[p] = sha(p);
}

const report = {
  schema_version: 1,
  course_code: 'EFMP-301',
  unit_no: 11,
  stage: 'G5',
  disposition: 'revise',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'claude-code:023-author-efmp-301:225dd76f',
  reviewer_run_id: 'agent-g5-efmp301-u11-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-26T03:30:00Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: manifest.skill_digest,
  g3_report: 'specs/content/efmp-301/reviews/unit-11/G3/agent-g3-efmp301-u11-20260925T165209548Z.json',
  input_manifest: manifest.input_manifest,
  criteria: [
    {
      id: 'authority',
      status: 'unverified',
      evidence: [
        'G3 dependency unsatisfiable for the bound English inputs: the only G3 evidence is advisory run001 (specs/content/efmp-301/reviews/unit-11/G3/agent-g3-efmp301-u11-20260925T165209548Z.json, disposition revise, sources:fail, assessment:fail, completed 2026-09-25T17:18:17Z), which reviewed the PRE-repair English; the bound English was repaired afterwards at commit 3a31f523 (assessment blueprint rebalance MCQ-02/MCQ-06/ERQ-02 and sources row restatement), so no G3 round - signed or advisory - covers the exact English digests in this manifest (ADR-0019: certification not provisioned; owner escalation per the GQUR-300 PR #65 precedent)',
        'Course-guide scope otherwise verified in both languages: Week 16 / Chapter 16-shared placement mirrored (docs/semester-1/efmp-301/unit-11/unit-teacher-notes.mdx:21-23 vs i18n/ur/.../unit-teacher-notes.mdx:21-23); SLO:EFMP-301-11-1 clo_refs identical in all five Urdu frontmatter blocks; guide-named practical work mirrored (unit-teacher-notes.mdx:102-105 vs :68)',
      ],
    },
    {
      id: 'sources',
      status: 'pass',
      evidence: [
        'Citations mirrored verbatim in both languages: WHO (2026) fact sheet and Seifert & Sutton (2009) further-reading entries identical in topic-01.mdx:175-178 / topic-02.mdx:171-174 and their Urdu mirrors (topic-01.mdx:107-110, topic-02.mdx:103-106), including URLs and licence lines',
        'WHO quotations carry their supporting meaning in topic-01.mdx:36 (state of well-being enabling coping; basic human right) with in-text citation (World Health Organization, 2026) preserved; the "intrinsic and instrumental value" fragment is garbled and recorded as advisory finding (quotation fidelity)',
        'specs/content/efmp-301/sources/unit-11.md scope rows (who2026 U11-1..U11-4, seifert2009 background only, guide-efmp301 Week 16) remain applicable to the Urdu claims; no Urdu-only claim cites an unbound source',
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'All four unit outcomes taught in Urdu: index.mdx:30-33 mirrors index.mdx:35-42; topic-01 covers the WHO framing, balance and signs; topic-02 covers stations, the three-part role and the referral boundary',
        'All outcomes assessed in Urdu: the 10 MCQ + 10 RRQ + 5 ERQ bank is fully mirrored with identical cognitive-demand labels and Bloom tags (unit-assessment.mdx:33-116 UR vs :44-155 EN)',
        'Section-by-section parity confirmed by full passage comparison of index, topic-01, topic-02, unit-assessment, unit-teacher-notes and both figure alt texts; no heading-only stubs, no dropped sections (only omissions found are the advisory "by role" drops in ERQ-5 and the teacher-notes practical)',
      ],
    },
    {
      id: 'assessment',
      status: 'fail',
      evidence: [
        'All 10 Urdu MCQs independently answered before reading either key: 1-b, 2-c, 3-b, 4-b, 5-c, 6-d, 7-b, 8-c, 9-c, 10-b; identical to the Urdu key and the bound English key (answer-key-comparison.log)',
        'G3-repaired blueprint mirrored: MCQ-02 (station definition, unit-assessment.mdx:39-43 vs EN :51-56), MCQ-06 (referral record, :63-67 vs EN :77-82) and ERQ-02 (steady marks, :110 vs EN :134-140) match the current post-repair English with the same options, distractors and mark allocations; ERQ rubric totals 20 per item with identical splits (5/7/4/4, 5/7/4/4, 5/8/3/4, 5/7/4/4, 8/6/2/4)',
        'FAIL driver: ERQ-4 stem inverts its task meaning - "how the teacher gets the walk made without betraying the relationship" (EN unit-assessment.mdx:149-150) is rendered "بغیر رشتے کو ٹھیک کرے" ("without fixing the relationship", UR :114), contradicting the item\'s own rubric row which renders "without betrayal" as "بغیر دھوکے" (:185 vs EN :244); MCQ-10 option b and its key garble "the referral is the care" as "رجوع وہی خیال ہے" (:89, :131)',
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        'Rendered Urdu verified in real Chromium (Playwright 1.61.1 bundled build) against the served production build: dir=rtl, lang=ur, Noto Nastaliq Urdu webfont loaded (document.fonts.check true), draft translation badge present, zero console errors (render-review.log)',
        'No horizontal overflow at 360px on index, topic-01, topic-02, unit-assessment (horizOverflowPx=0 each); full-page captures at 1280px and 360px plus A4 print emulation PNG+PDF saved for topic-01 and unit-assessment',
        'Figure alt texts translated in both topics; both light and dark figure variants wired (figure img srcs verified on the rendered pages)',
      ],
    },
    {
      id: 'completeness',
      status: 'pass',
      evidence: [
        'Full EN/UR passage comparison across all five files: every English section, list item, table row, blockquote, rubric row and checklist item has a Urdu counterpart and vice versa; the UR index additionally carries the required key_terms block (G4 convention)',
        'Quantities, dates and proper nouns preserved: Class 8/Class 7, Karachi/Hyderabad, September, March, Eid, Mondays/Fridays, 20 minutes, 250-300 words, four minutes, three weeks, Week 16, Unit cross-references (2, 4, 6, 7, 8)',
        'Figure captions and alt texts mirrored for all four figures (fig-U11-1..4) in both topics',
      ],
    },
    {
      id: 'semantics',
      status: 'fail',
      evidence: [
        'Causal inversion: EN "the predictability that fear cannot survive without" (topic-02.mdx:73-74) rendered "وہ قابل پیشن گوئی جس کے بغیر خوف نہیں جیت سکتا" ("the predictability without which fear cannot WIN", topic-02.mdx:47) - as written it implies predictability enables fear; fig-U11-4.ur.svg renders the same phrase correctly as "جس کے بغیر خوف نہیں جی سکتا", proving the prose جیت is a corruption of جی',
        'Garbled unit-centre sentence: "The referral is not a failure of care; it IS the care, delivered by the right hands" (topic-02.mdx:83-84) rendered with خیال (thought/idea) for "care" at topic-02.mdx:49 ("رجوع خیال کی ناکامی نہیں ہے؛ یہی خیال ہے"), topic-02.mdx:80, unit-assessment.mdx:89 and :131 - reads as "the referral is not a failure of thought; it is the very thought"',
        'ERQ-4 stem task inversion (see assessment criterion): "بغیر رشتے کو ٹھیک کرے" (unit-assessment.mdx:114) for "without betraying the relationship"',
        'Remaining semantics verified clean: negation, modal force, percentages-free quantities, comparisons and pronoun references compared passage by passage with no further material divergence',
      ],
    },
    {
      id: 'terminology',
      status: 'fail',
      evidence: [
        'Bank drift on anxiety: terminology.csv:56 banks اضطراب, but the unit renders it گھبراہٹ/گھبرایا ہوا at index.mdx:22 and :37 (including the cross-reference "یونٹ 6 کے جذبات اور گھبراہٹ", where Unit 6\'s own Urdu uses اضطراب), topic-01.mdx:48 (the difficulties list), topic-02.mdx:47 and unit-teacher-notes.mdx:56 - while unit-teacher-notes.mdx:64 itself lists اضطراب as the banked term; Units 6 and 8 use اضطراب throughout',
        'Figure/prose core-vocabulary mismatch: the four .ur.svg figures label the unit\'s central concepts تقاضا/معاونت/علامت/مرحلہ/آخری گھنٹہ/حوالگی while the MDX prose and the figures\' own alt texts use مانگ/سہارا/نشانی/اسٹیشن/آخری پیریڈ/رجوع (e.g. fig-U11-1.ur.svg "تقاضے/معاونتیں" vs topic-01 alt "مانگیں/سہارے"; fig-U11-2.ur.svg title "پانچ علامات" vs alt "پانچ نشانیوں کا جدول"; fig-U11-3.ur.svg "مرحلہ بہ مرحلہ/آخری گھنٹہ" vs prose "اسٹیشن بہ اسٹیشن/آخری پیریڈ"; fig-U11-4.ur.svg "حوالگی" vs prose "رجوع") - the teacher notes require this exact vocabulary on the board in both languages',
        'Banked terms otherwise respected: معیارِ جانچ (rubric), تشکیلی (formative), ثبوت (evidence), شاگرد (student), تعلم in learning compounds - all conformant; key_terms block uses "رہنمائی اور مشاورت" vs the banked "رہنمائی و مشاورت" (terminology.csv:53), recorded as advisory',
      ],
    },
    {
      id: 'register',
      status: 'fail',
      evidence: [
        'Garbled WHO quotation fragment: "has intrinsic and instrumental value" rendered "اندرونی اور ذریعے کے طور پر قیمت ہے" (topic-01.mdx:36) - قیمت (price) for value and an ungrammatical instrumental half',
        'Visible typographic and agreement slips: broken word "کو ن" twice in topic-01.mdx:38; "نمور" for نمبر (topic-02.mdx:25); doubled "وہ وہ نقصان" (topic-02.mdx:49); "میٹز" for میز (unit-teacher-notes.mdx:56, unit-assessment.mdx:144); gender agreement "کون سی ثبوت/مفروضہ" (topic-01.mdx:65), "اپنی آرام" (topic-02.mdx:53), "مانگیں اور سہارے کی الفاظ" (unit-teacher-notes.mdx:64); the second Class 8 pupil (a boy) referred to femininely at topic-01.mdx:26 ("دوسری") and unit-teacher-notes.mdx:36',
        'Calques and off-register choices needing repair: "سب سے نتیجہ خیز جملہ" for "most consequential sentence" (index.mdx:48); "جیا ہوا تجربہ" for "lived experience" (unit-teacher-notes.mdx:27); "اس کا اخراج نہیں" for "not its exclusion" (unit-teacher-notes.mdx:56); "حملہ نہیں" for "not ambushed" (topic-02.mdx:97, unit-assessment.mdx:175); "قرأت" for "readings" (topic-01.mdx:65, unit-assessment.mdx:110); "بڑھاوا مانگنا/دینا" for same-day escalation (topic-01.mdx:50,73,77, index.mdx:33, unit-assessment.mdx:25); "ایک حقیقی جماعتی صورتحال" heading (topic-01.mdx:24)',
        'Overall register is otherwise academic-plain and readable; the defects above are localized and repairable without re-translation',
      ],
    },
    {
      id: 'rtl',
      status: 'fail',
      evidence: [
        'Confirmed geometric defect: the header underline path in fig-U11-2.ur.svg, fig-U11-2.ur.dark.svg, fig-U11-4.ur.svg and fig-U11-4.ur.dark.svg is "M 768 74H768V78H12z" - a degenerate wedge (pixel-measured ink coverage 59.9% of the strip vs 99.9% for the EN bar "M12 74H768V78H12z"); the full-width header bar should be mirror-invariant',
        'Pre-flight re-mirroring verified as held, not assumed: vertical dividers correctly mirrored in fig-U11-2.ur (552/314 = 780-228/780-466) and fig-U11-4.ur (598/332 = 780-182/780-448); fig-U11-1.ur panels correctly swapped (demands right, supports left); fig-U11-3.ur all six timeline ticks and five station panels map x to 780-x; no markers exist in any figure so the invisible-arrowhead family cannot apply',
        'No text clipping or overprint: every <text> bounding box measured in Chromium with the Nastaliq webfont inlined stays inside its column, pill or panel and clear of every divider (figure-geometry.log); narrow-viewport pages show zero horizontal overflow',
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: false,
      message:
        'Semantics/causal inversion: i18n/ur/.../topic-02.mdx:47 renders "the predictability that fear cannot survive without" (docs/.../topic-02.mdx:73-74) as "وہ قابل پیشن گوئی جس کے بغیر خوف نہیں جیت سکتا" - "the predictability without which fear cannot WIN", which inverts the claim (as written, predictability enables fear). fig-U11-4.ur.svg renders the same English correctly as "جس کے بغیر خوف نہیں جی سکتا", so the prose جیت is a corruption of جی. Repair: restore "جی سکتا" (or "زندہ نہیں رہ سکتا").',
    },
    {
      severity: 'blocking',
      resolved: false,
      message:
        'Semantics/garbled central claim: "care" in "The referral is not a failure of care; it IS the care, delivered by the right hands" is rendered خیال (thought/idea) at i18n/ur/.../topic-02.mdx:49 ("رجوع خیال کی ناکامی نہیں ہے؛ یہی خیال ہے، درست ہاتھوں سے پہنچایا ہوا"), topic-02.mdx:80 (checklist "رجوع خیال ہے، ہاتھ کھینچنا نہیں"), unit-assessment.mdx:89 (MCQ-10 option b) and unit-assessment.mdx:131 (key 10) - the sentence the index calls the unit\'s most consequential one reads as "the referral is not a failure of thought; it is the very thought". Repair: دیکھ بھال (e.g. "رجوع دیکھ بھال کی ناکامی نہیں؛ یہی دیکھ بھال ہے، درست ہاتھوں سے پہنچائی ہوئی").',
    },
    {
      severity: 'blocking',
      resolved: false,
      message:
        'Assessment/ERQ-4 stem inversion: i18n/ur/.../unit-assessment.mdx:114 renders "how the teacher gets the walk made without betraying the relationship" (EN :149-150) as "بغیر رشتے کو ٹھیک کرے" - "without fixing the relationship" - inverting the required task; the item\'s own rubric row (:185 vs EN :244) renders "without betrayal" as "بغیر دھوکے", so stem and rubric contradict each other. Repair: e.g. "بغیر رشتے میں دھوکہ دیے" or "بغیر رشتے کو ٹوٹے".',
    },
    {
      severity: 'blocking',
      resolved: false,
      message:
        'Terminology bank drift on anxiety: banked اضطراب (terminology.csv:56) rendered گھبراہٹ/گھبرایا ہوا at i18n/ur/.../index.mdx:22 and :37, topic-01.mdx:48, topic-02.mdx:47 and unit-teacher-notes.mdx:56, while unit-teacher-notes.mdx:64 lists اضطراب as the banked term and Units 6 and 8 use اضطراب (so the prerequisite cross-reference "یونٹ 6 کے جذبات اور گھبراہٹ" contradicts Unit 6\'s own vocabulary). Repair: align all five sites to the bank.',
    },
    {
      severity: 'blocking',
      resolved: false,
      message:
        'Figure/prose core-vocabulary mismatch: the four .ur.svg figures label demands/supports/signs/station/last-period/referral as تقاضا/معاونت/علامت/مرحلہ/آخری گھنٹہ/حوالگی while the MDX prose and each figure\'s own alt text use مانگ/سہارا/نشانی/اسٹیشن/آخری پیریڈ/رجوع (fig-U11-1.ur.svg تقاضے/معاونتیں vs topic-01.mdx:30 alt مانگیں/سہارے; fig-U11-2.ur.svg title "پانچ علامات" vs alt "پانچ نشانیوں کا جدول"; fig-U11-3.ur.svg "مرحلہ بہ مرحلہ"/"آخری گھنٹہ" vs topic-02 prose "اسٹیشن"/"آخری پیریڈ"; fig-U11-4.ur.svg "حوالگی" vs prose "رجوع"). The teacher notes (unit-teacher-notes.mdx:64) require this vocabulary on the board in both languages, so diagram and text must share one term set. Repair: relabel the SVGs (or align the prose) for the six core terms.',
    },
    {
      severity: 'blocking',
      resolved: false,
      message:
        'Figures/RTL: the header underline path in fig-U11-2.ur.svg, fig-U11-2.ur.dark.svg, fig-U11-4.ur.svg and fig-U11-4.ur.dark.svg reads "M 768 74H768V78H12z" and renders a tapering wedge instead of the EN full-width bar "M12 74H768V78H12z" (pixel-verified: 59.9% ink coverage across the strip vs 99.9% EN). The vertical dividers ARE correctly mirrored (552/314 and 598/332 = 780-x), so the pre-flight re-mirroring held; this bar is the residual. Repair: restore the mirror-invariant full-width bar path.',
    },
    {
      severity: 'uncertain',
      resolved: false,
      message:
        'G3 dependency not satisfied for the bound English inputs (owner escalation per the GQUR-300 PR #65 precedent): the only G3 evidence is advisory run001 (disposition revise, sources:fail, assessment:fail, completed 2026-09-25T17:18:17Z), which reviewed the pre-repair English; the bound English was repaired afterwards at commit 3a31f523 (MCQ-02/MCQ-06/ERQ-02 rebalance, sources row restated), so no G3 round covers the exact English digests bound here, and no signed G3 can exist while certification is unprovisioned (ADR-0019). This review therefore compared the Urdu directly against the current bound English, passage by passage; the owner must decide whether a fresh G3 round on the post-repair English is required before any acceptance.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Dispatch metadata (parent action, no content defect): the dispatch quoted the English MCQ key as "1-b, 2-c, 3-b, 4-d, 5-c, 6-a, 7-b, 8-d, 9-c, 10-c", which does not match the bound English unit-assessment (docs/.../unit-assessment.mdx:159-173: 1-b, 2-c, 3-b, 4-b, 5-c, 6-d, 7-b, 8-c, 9-c, 10-b; each key answer verified against its item rationale, and the reviewer independently re-solved all items). The Urdu key matches the bound English exactly (answer-key-comparison.log). The parent should correct its dispatch records.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Typographic and agreement slips to repair: broken word "کو ن" twice in i18n/ur/.../topic-01.mdx:38 ("کو ن بیمار ہے؟", "کو نمٹ رہا ہے" - should be کون); "نمور" for نمبر (topic-02.mdx:25); doubled "وہ وہ نقصان" (topic-02.mdx:49); "میٹز" for میز (unit-teacher-notes.mdx:56, unit-assessment.mdx:144 - the figures spell میز correctly); "کون سی ثبوت/مفروضہ" gender (topic-01.mdx:65 - both masculine); "اپنی آرام" (topic-02.mdx:53 - اپنا آرام); "مانگیں اور سہارے کی الفاظ" (unit-teacher-notes.mdx:64 - کے الفاظ); the second Class 8 pupil is a boy but is referred to femininely at topic-01.mdx:26 ("دوسری کے لیے") and unit-teacher-notes.mdx:36 ("درمیانہ نمبر والی مستحکم شاگرد").',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Quotation fidelity: WHO\'s "has intrinsic and instrumental value and is a basic human right" is rendered "اندرونی اور ذریعے کے طور پر قیمت ہے اور یہ ایک بنیادی انسانی حق ہے" (i18n/ur/.../topic-01.mdx:36) - قیمت (price) for value and an ungrammatical "ذریعے کے طور پر قیمت" half. Suggested repair: e.g. "اس کی اپنی اور بطور وسیلے دونوں قدر ہے اور یہ ایک بنیادی انسانی حق ہے".',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Register/calque repairs: "سب سے نتیجہ خیز جملہ" for "most consequential sentence" (index.mdx:48 - نتیجہ خیز means productive; suggest "سب سے زیادہ اثر رکھنے والا جملہ"); "جیا ہوا تجربہ" for "lived experience" (unit-teacher-notes.mdx:27); "اس کا اخراج نہیں" for "not its exclusion" (unit-teacher-notes.mdx:56 - اخراج means expulsion); "حملہ نہیں" for "not ambushed" (topic-02.mdx:97, unit-assessment.mdx:175 - suggest "غافل نہ کیا گیا"); "قرأت" for "readings" (topic-01.mdx:65, unit-assessment.mdx:110); "بڑھاوا مانگنا/دینا" for same-day escalation (topic-01.mdx:50,73,77, index.mdx:33, unit-assessment.mdx:25 - reads as "boost"; suggest "اسی دن بڑی سطح پر اطلاع/حوالہ" or tie to رجوع); heading "ایک حقیقی جماعتی صورتحال" (topic-01.mdx:24 - suggest "جماعت کی ایک حقیقی صورتحال").',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Small omissions/modal shifts: "designated person by role" loses "by role" in unit-assessment.mdx:116 (ERQ-5) and unit-teacher-notes.mdx:68 ("کردار کے طور پر" missing); index.mdx:33 renders "never diagnose or counsel beyond training" as "کبھی تشخیص یا مشاورت نہ کریں بغیر تربیت کے" ("without training"), subtly weaker than "beyond training" (topic-02.mdx:49 renders it correctly as "تربیت سے آگے").',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'key_terms block (i18n/ur/.../index.mdx:12-13) uses "رہنمائی اور مشاورت" where the bank entry is "رہنمائی و مشاورت" (terminology.csv:53); align the connector to the banked form.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        'Environment limitation recorded honestly: this review host has no system Nastaliq font and the Read tool cannot display images, so figure-label inspection was performed by DOM-inlining each SVG with the site\'s Noto Nastaliq Urdu webfont and measuring every <text> bounding box (no clipping or overprint found) plus pixel-level ink measurement of the rendered strips; page prose was verified in the real served build (webfont loaded, dir=rtl, no overflow at 360px, no console errors). On hosts without a Nastaliq font, SVGs behind <img> fall back to DejaVu/FreeSerif Arabic - a site-wide Spec 009 architecture property, not a unit defect.',
    },
    {
      severity: 'advisory',
      resolved: true,
      message:
        'Assessment equivalence verified (informational): all 10 Urdu MCQs independently answered before reading either key (1-b, 2-c, 3-b, 4-b, 5-c, 6-d, 7-b, 8-c, 9-c, 10-b) - identical to the Urdu key and the bound English key; option order and cognitive-demand labels preserved; the G3-repaired items (MCQ-02 stations, MCQ-06 referral record, ERQ-02 steady marks) are mirrored with the same distractors, model answers and mark allocations; no translation inadvertently reveals an answer or lowers cognitive demand (answer-key-comparison.log).',
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: `${LOGS}/validate-content.log` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${LOGS}/check-depth-gate.log` },
    { name: 'check:figures', exit_code: 0, log_path: `${LOGS}/check-figures.log` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${LOGS}/check-no-em-dash.log` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${LOGS}/check-no-answer-keys.log` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${LOGS}/check-docs-sync.log` },
    { name: 'render-review', exit_code: 0, log_path: `${LOGS}/render-review.log` },
    { name: 'build', exit_code: 0, log_path: `${LOGS}/build.log` },
    { name: 'serve', exit_code: 0, log_path: `${LOGS}/serve.log` },
    { name: 'verify-manifest', exit_code: 0, log_path: `${LOGS}/verify-manifest.log` },
    { name: 'figure-geometry', exit_code: 0, log_path: `${LOGS}/figure-geometry.log` },
    { name: 'answer-key-comparison', exit_code: 0, log_path: `${LOGS}/answer-key-comparison.log` },
  ],
  evidence_manifest: evidence,
};

writeFileSync(join(ROOT, DIR, 'agent-g5-efmp301-u11-run001.json'), JSON.stringify(report, null, 2) + '\n');
console.log('report written; evidence files:', Object.keys(evidence).length);
