// Report generator - agent-g5-gqur300-u5-run001 (G5 Urdu review, GQUR-300 Unit 5)
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';

const ROOT = '.';
const DIR = 'specs/content/gqur-300/reviews/unit-05/G5';
const LOGS = `${DIR}/logs-agent-g5-gqur300-u5-run001`;
const RENDERS = `${DIR}/renders-agent-g5-gqur300-u5-run001`;
const manifest = JSON.parse(readFileSync(`${DIR}/manifest.json`, 'utf8'));
const digest = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

const evidence = {};
for (const f of readdirSync(LOGS)) evidence[`${LOGS}/${f}`] = digest(`${LOGS}/${f}`);
for (const f of readdirSync(RENDERS)) evidence[`${RENDERS}/${f}`] = digest(`${RENDERS}/${f}`);

const EN = 'docs/semester-1/gqur-300/unit-05';
const UR = 'i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-05';
const FIG = 'static/img/figures/gqur-300/unit-05';

const report = {
  schema_version: 1,
  course_code: 'GQUR-300',
  unit_no: 5,
  stage: 'G5',
  disposition: 'revise',
  reviewer_id: 'agent:g5-reviewer',
  author_run_id: 'commit:c48326d27728aeb4eba8da74300b8aad99cf0aae',
  reviewer_run_id: 'agent-g5-gqur300-u5-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T06:26:14Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  rulings: {},
  g3_dependency: {
    accepted_g3_evidence: null,
    status: 'ADR-0019: agent certification blocked; no accepted, signed G3 report exists for this unit. Best-available context: the G3 run001 advisory report (disposition revise) at specs/content/gqur-300/reviews/unit-05/G3/agent-g3-gqur300-u5-run001.json, which reviewed the pre-repair English at commit 56f5b54. The author applied its repairs at commit 2d5cd6a (fig-U5-5 geometry, gender-gap arithmetic, openstax scoping, census-conduct excerpt, prose citations) and G2 gate evidence was rebound (all eight gates exit 0, specs/content/gqur-300/reviews/unit-05/G2/20260924T022803613Z-gates.json). Seven English-side bound inputs changed between the G3 report and this bundle (topic-01.mdx, topic-03.mdx, unit-assessment.mdx, coverage/unit-05.md, sources/unit-05.md, fig-U5-5.svg, fig-U5-5.dark.svg); the English has not been re-reviewed since the repairs. The bound English inputs are this review\'s authoritative comparison base, per the coordinating parent.',
    best_available_g3_report: 'specs/content/gqur-300/reviews/unit-05/G3/agent-g3-gqur300-u5-run001.json',
  },
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        'Bound course guide .specify/Course_guides_and_Scheme/300 Quantitative_Reasoning_I.docx and docs/semester-1/gqur-300/course-overview.mdx: Unit 5 focus (data cycle, displays, averages, reading published statistics) and SLO scheme confirmed; the Urdu unit carries the same clo_refs (SLO:GQUR-300-2-2, SLO:GQUR-300-5-5) in all six files and teaches the same approved outcomes',
        `${UR}/index.mdx:49-60 - four unit learning outcomes mirror ${EN}/index.mdx:26-37 including the five interpretation questions`,
        'specs/content/gqur-300/content-spec.md ## Unit 5 (bound, unit-sliced): sub-topics U5-01..U5-04 and the 10/10/5 blueprint are all delivered in Urdu; see bilingual-comparison.txt',
      ],
    },
    {
      id: 'sources',
      status: 'pass',
      evidence: [
        `${UR}/topic-01.mdx:128-134, ${UR}/topic-02.mdx:129-133, ${UR}/topic-03.mdx:146-152 - Further reading mirrors the EN citations (PBS 2023 with report-verified date 2026-09-23 rendered as رپورٹ جانچی گئی 2026-09-23; OpenStax Prealgebra 2e Section 5.5 rendered حصہ 5.5 اوسط اور احتمال; OECD PISA; Tout 2020 ERIC)`,
        `${UR}/topic-03.mdx:68-86 - the census reading retains the EN qualifications: first digital census, door-to-door on tablets March-May 2023, Council of Common Interests approval, 10-years-and-above base, and the supporting meaning of every figure (57.54 / 64.23 / 50.21 / 54.57 / 46.29)`,
        'In-text citations preserved: (PBS، 2023), Marecek, Anthony-Smith and Mathis (2020, حصہ 5.5), (OECD، بغیر تاریخ) for (OECD, n.d.), ٹوٹ (2020); pbs.md record summary in the repo matches every quoted figure (note: pbs.md itself is not bound - G3 run001 advisory tooling gap, carried forward)',
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        `U5-01 ${UR}/topic-01.mdx (data cycle, three collection methods, tallies, frequency table, total check); U5-02 ${UR}/topic-02.mdx (five displays, choice rule, construction reading); U5-03 ${UR}/topic-03.mdx:38-61 (mean, median, mode); U5-04 ${UR}/topic-03.mdx:63-90 (five interpretation questions) - each maps to the bound coverage/unit-05.md rows`,
        `Every EN outcome is assessed in Urdu: MCQs 1-10, RRQs 1-10, ERQs 1-5 in ${UR}/unit-assessment.mdx correspond item-for-item to ${EN}/unit-assessment.mdx with Bloom tags preserved; assessment-independent-working.txt records the independent solving`,
        'specs/content/gqur-300/concepts/unit-05.md: all twelve concept rows are taught in the Urdu prose with the authored Label UR forms (G5-flagged labels reviewed - see terminology criterion and advisory findings)',
      ],
    },
    {
      id: 'assessment',
      status: 'fail',
      evidence: [
        `${UR}/topic-01.mdx:86 - CYU item 2(b) renders EN "which snack the canteen should stock" (${EN}/topic-01.mdx:93) as "کینٹین کون سی نسٹاک رکھے" containing the non-word نسٹاک`,
        `${UR}/unit-assessment.mdx:159 - RRQ model answer 1 renders EN "survey (which snack to stock)" (${EN}/unit-assessment.mdx:169) as "سروے (کون سی نسٹاک رکھنی ہے)" - same non-word`,
        'Otherwise equivalent: all 10 MCQs independently answered from the Urdu match the key (b,b,b,c,b,c,b,b,c,b); RRQ values re-derived (660/11=60; median 62; mode 70; 22.5% x 360 = 81 degrees; 64.23-50.21=14.02; class-strengths median 40 with no mode); option order preserved; no item leaks its answer; cognitive demand unchanged - see assessment-independent-working.txt',
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        'Urdu alt text present and meaning-matching on all six Figure tags (e.g. fig-U5-5: "11 نمبروں کے نقطہ خاکے کا ڈایاگرام: حسابی اوسط 60 پر، درمیانی قدر 62 پر اور عاد 70 پر گھیرے ہوئے...") and inside every .ur.svg <title>/<desc>',
        'A4 print emulation (794x1123, media print): nav hidden, zero clipped elements on all six pages (render-verification.json print section); no colour-only meaning - the fig-U5-5 mode ring is labelled عاد = 70 and the fig-U5-4 pitfalls are text cells',
        'renders-agent-g5-gqur300-u5-run001/a4-print-*.png (6 pages) and render-review.txt inspection record',
      ],
    },
    {
      id: 'completeness',
      status: 'fail',
      evidence: [
        `Omission: ${EN}/index.mdx:58 "Glossary terms are underlined; hover or tap them for the Urdu definition" is rendered ${UR}/index.mdx:79-80 as "لغت کے الفاظ کو نیچے دی گئی لکیر سے پہچانیں؛ اردو تعریف کے لیے ان پر جائیں" - the explicit hover-or-tap interaction is dropped (same class the Unit 3 G5 repair restored)`,
        'Otherwise complete: heading counts match in all six file pairs (5/11/11/12/10/8); Figure tags 0/2/2/2/0/0; topic-01 table rows 6/6; list items match after excluding wrapped " - " prose lines; no heading-only stubs; no untranslated passages (Further-reading citations intentionally English, course-wide pattern) - bilingual-comparison.txt',
        `Benign additions recorded: ${UR}/topic-03.mdx:30-32 adds three <Glossary> wraps (حسابی اوسط، درمیانی قدر، عاد) where the EN opening has plain text; fig-U5-5.ur.svg subtitle drops لمبی from "a long tail" (immaterial)`,
      ],
    },
    {
      id: 'semantics',
      status: 'fail',
      evidence: [
        `${FIG}/fig-U5-4.ur.svg line-graph pitfall cell: EN "implies continuity that may not exist" became "نقطوں کے بیچ تسلسل دکھاتا ہے جو ہو نہیں" - the epistemic hedge is dropped (asserts the continuity does not exist)`,
        `${UR}/topic-01.mdx:86 and ${UR}/unit-assessment.mdx:159 - نسٹاک is not an Urdu word; the meaning of "snack" is unrecoverable for a reader (also filed under assessment)`,
        'All other inspected divergences are immaterial and recorded in bilingual-comparison.txt: negation, quantities, percentages, dates, comparisons, causal claims, examples, pronoun referents and instructional sequences are preserved; "a few tiny sections can make the mean flatter the reality most pupils live" shifts agent to the sections hiding reality from the mean with the same conclusion',
      ],
    },
    {
      id: 'terminology',
      status: 'pass',
      evidence: [
        'Banked terms used correctly: معیارِ جانچ (Rubric) in all three topics and the ERQ rubrics; خود جائزہ (Self-Assessment) in the three checklist headings; حکمتِ تدریس (Teaching Strategy) in teacher notes; گروہی کام / گروہی اسائنمنٹ (Group Work) in teacher notes; مجموعی جائزہ (Summative Assessment) in the assessment heading - sweep forms hold in Unit 5 prose',
        'Authored math labels consistent across index key_terms, prose, figures and assessment (معطیات، تعدد جدول، حسابی اوسط، درمیانی قدر، عاد، بار چارٹ، پائی چارٹ، لکیر گراف، تصویری جدول، مراکزی رجحان کے پیمانے); course-wide heading forms consistent (مجموعی کام in all 18 GQUR-300 topic files)',
        `Residual of a proven sweep defect class: ٹیوٹرز remains in the teacher-notes frontmatter blooms_summary (${UR}/unit-teacher-notes.mdx:9) while all Unit 5 prose uses آپ کے ٹیوٹر (${UR}/topic-02.mdx:73, ${UR}/topic-03.mdx:90) - advisory finding; owner proposals (Tally/گنتی overlap, Records/رجسٹر narrowing, concept-label drift) filed as advisory findings, bank not edited`,
      ],
    },
    {
      id: 'register',
      status: 'pass',
      evidence: [
        'Register is academic-plain (درسی مگر عام فہم): natural sentence order throughout; idiomatic renderings (تیار پوشاک میں آتی ہیں for "arrive ready-dressed"; مٹی میں جڑتے ہیں for "anchor"); English technical terms (ڈسپلے، سروے، سٹاک، گرڈ) treated consistently',
        'Recurring minor grammar slips recorded as advisory findings, none impeding comprehension: محور treated as feminine (بار چارٹ کی عمودی محور / کٹی ہوئی محور, six-plus loci); کس اکلی سوال (twice); پوری صفحے کی گنتی; دو استادانیوں; پورا ایک چیز in fig-U5-4.ur.svg',
        'Feminine agreement for the trainee reader is consistent across the unit (کر سکنے گیں، لے سکتی ہوں), matching the course cohort; no literary or archaic registers; no em dash (gate exit 0)',
      ],
    },
    {
      id: 'rtl',
      status: 'pass',
      evidence: [
        'dir=rtl on all six pages; Noto Nastaliq Urdu webfont loads and is the body font (render-verification.json fontCheck); zero clipped text and zero out-of-viewport elements at 1280 and 360; overflowX 0 px everywhere',
        'Bidi/numerals: all twelve tested digit runs (57.54, 64.23, 50.21, 46.29, 54.57, 14.02, 2.97, 660, 11,120, 4,200, 55,600, 39,000) render intact; digit-reversed control strings absent; embedded Latin (author names, PBS, OECD, URLs) uncorrupted; the Markdown table renders RTL with column order preserved (وجہ rightmost)',
        'Figure variants verified: fig-U5-1/3 arrows and fig-U5-5 axis mirrored for RTL; fig-U5-5 pixel sampling confirms all 11 dots at 20,45,50,55,60,62,62,70,70,70,96 with mean line at 60, median at 62 and the mode ring at 70 (fig-u5-5-geometry-resample.json); fig-U5-6 carries the census figures correctly in RTL cells; 24 page renders + 6 figure renders in renders-agent-g5-gqur300-u5-run001/',
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: false,
      message: 'Garbled non-word "نسٹاک" in two assessment passages. EN docs/semester-1/gqur-300/unit-05/topic-01.mdx:92-94 CYU item 2(b) "which snack the canteen should stock" is rendered i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-05/topic-01.mdx:86 as "کینٹین کون سی نسٹاک رکھے"؛ and EN docs/semester-1/gqur-300/unit-05/unit-assessment.mdx:169 RRQ model answer 1 "survey (which snack to stock)" is rendered i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-05/unit-assessment.mdx:159 as "سروے (کون سی نسٹاک رکھنی ہے)". "نسٹاک" is not an Urdu word (an apparent snack/stock blend); a reader cannot recover the meaning "snack", so the item and its model answer are not fully comprehensible. Repair: use a natural phrase, e.g. "کینٹین کون سا ناشتہ رکھے" / "کون سا ناشتہ سٹاک رکھنا ہے".',
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'Unresolved G3 dependency: no accepted G3 evidence exists for the English inputs bound to this review. Per ADR-0019 agent certification is blocked; the best-available G3 run001 report (specs/content/gqur-300/reviews/unit-05/G3/agent-g3-gqur300-u5-run001.json, disposition revise) reviewed the pre-repair English at commit 56f5b54, and seven English-side bound inputs changed at the repair commit 2d5cd6a (topic-01.mdx, topic-03.mdx, unit-assessment.mdx, coverage/unit-05.md, sources/unit-05.md, fig-U5-5.svg, fig-U5-5.dark.svg) with no English re-review since. G2 gates were rebound at 2d5cd6a and all exit 0. The contract requires an accepted, signed G3 report for the current English inputs before a G5 pass; this finding forbids a pass independently of the Urdu quality and is for the parent/owner to resolve (fresh G3 cycle or accepted human G3 record), not the Urdu author.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Residual of the course-wide tutors sweep: "ٹیوٹرز" remains in the teacher-notes frontmatter blooms_summary (i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-05/unit-teacher-notes.mdx:9, "ٹیوٹرز کے لیے یونٹ 5 کی ترتیب کی رہنمائی..."), while all Unit 5 prose uses the swept form آپ کے ٹیوٹر (i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-05/topic-02.mdx:73, i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-05/topic-03.mdx:90). EN: docs/semester-1/gqur-300/unit-05/unit-teacher-notes.mdx:9 "Guidance for tutors sequencing Unit 5". Repair: align the frontmatter to the swept form.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Instructional-sequence softening in the index: EN docs/semester-1/gqur-300/unit-05/index.mdx:58 "Glossary terms are underlined; hover or tap them for the Urdu definition" is rendered i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-05/index.mdx:79-80 as "لغت کے الفاظ کو نیچے دی گئی لکیر سے پہچانیں؛ اردو تعریف کے لیے ان پر جائیں"، dropping the explicit hover-or-tap interaction (the same omission class the Unit 3 G5 repair restored). Repair: e.g. "ان پر جائیں یا ٹیپ کریں".',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Modal-force shift in a figure label: static/img/figures/gqur-300/unit-05/fig-U5-4.ur.svg line-graph pitfall cell renders EN "implies continuity that may not exist" (fig-U5-4.svg) as "نقطوں کے بیچ تسلسل دکھاتا ہے جو ہو نہیں"، asserting the continuity does not exist instead of may not exist. Repair: e.g. "جو ہو بھی نہیں سکتا" or "جو موجود نہ ہو".',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Recurring gender-agreement slips (meaning unaffected, register-level): محور is treated as feminine - "بار چارٹ کی عمودی محور" (topic-02.mdx:84; unit-assessment.mdx:72), "ایک بار چارٹ کی محور" (unit-assessment.mdx:106), "کٹی ہوئی محور" (topic-02.mdx:65; unit-assessment.mdx:151; unit-teacher-notes.mdx:40; fig-U5-4.ur.svg) - standard Urdu treats محور as masculine; "کس اکلی سوال" (topic-02.mdx:77; unit-teacher-notes.mdx:51) should agree masculine (اکلے سوال) or use کس ایک سوال; "پوری صفحے کی گنتی" (topic-01.mdx:45) should be پورے صفحے; "پورا ایک چیز" (fig-U5-4.ur.svg) should be پوری ایک چیز; "دو استادانیوں" (topic-01.mdx:28) is a nonstandard feminine form (دو استادوں / دو معلمات).',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Terminology proposals for the owner (bank not edited, per the rubric): (a) Tally is glossed گنتی, which is the ordinary word for counting used in the same passages for the summarize step (topic-01.mdx:44-45 گنتی ... تعدد جدول; :96-97 خلاصہ سادہ گنتی بن جاتی ہے) - a distinct tally term would disambiguate; (b) Records is rendered رجسٹر (topic-01.mdx:27-28; fig-U5-2.ur.svg row 3), consistent unit-wide but narrower than the EN method name "records"; (c) concepts/unit-05.md CON:GQUR-300-5-8 Label UR uses اوسط where the unit key term is حسابی اوسط for Mean, and CON:GQUR-300-5-12 Label UR drops the EN "(base, comparison, gap)" parenthetical. The twelve authored concept labels were otherwise confirmed against unit usage.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Benign additions recorded (no repair required, listed for completeness): i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-05/topic-03.mdx:30-32 adds three <Glossary> wraps (حسابی اوسط، درمیانی قدر، عاد) where the EN opening has plain text; fig-U5-5.ur.svg subtitle drops لمبی from EN "a long tail of low marks".',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Inspection limitation and pipeline observations: this session\'s image-display tool returned no output for PNG and JPEG, so pixel-level review rests on in-browser DOM measurement and canvas pixel sampling (render-verification.json, fig-u5-5-geometry-resample.json) per the G3 run001 precedent; the committed PNGs remain available for human re-inspection. SVG figures loaded as <img> render their Urdu labels in the OS Arabic fallback (Naskh-style) because SVG images cannot use the page\'s self-hosted Nastaliq webfont - a site-wide pipeline property, not unit-5-specific. In fig-U5-5 (both EN and UR variants) the mode circle\'s class="stroke" CSS rule overrides the stroke="var(--a3)" presentation attribute, so the circle renders in ink colour rather than the intended accent; colour stays redundant with the عاد = 70 / mode = 70 label, so no meaning is lost.',
    },
  ],
  commands: [
    { name: 'input-manifest-verification', exit_code: 0, log_path: `${LOGS}/manifest-digest-verify-normalized.log` },
    { name: 'validate:content', exit_code: 0, log_path: `${LOGS}/validate-content.log` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${LOGS}/check-depth-gate.log` },
    { name: 'check:figures', exit_code: 0, log_path: `${LOGS}/check-figures.log` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${LOGS}/check-no-em-dash.log` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${LOGS}/check-no-answer-keys.log` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${LOGS}/check-docs-sync.log` },
    { name: 'check:concept-graph', exit_code: 0, log_path: `${LOGS}/check-concept-graph.log` },
    { name: 'check:bloom-bands', exit_code: 0, log_path: `${LOGS}/check-bloom-bands.log` },
    { name: 'check:pipeline-gate', exit_code: 0, log_path: `${LOGS}/check-pipeline-gate.log` },
    { name: 'figures:variants:check', exit_code: 0, log_path: `${LOGS}/figures-variants-check.log` },
    { name: 'build', exit_code: 0, log_path: `${LOGS}/build.txt` },
    { name: 'serve', exit_code: 0, log_path: `${LOGS}/serve.log` },
    { name: 'render-capture', exit_code: 0, log_path: `${LOGS}/render-capture-report.json` },
    { name: 'render-verification', exit_code: 0, log_path: `${LOGS}/render-verification.json` },
    { name: 'fig-u5-5-geometry-resample', exit_code: 0, log_path: `${LOGS}/fig-u5-5-geometry-resample.json` },
    { name: 'render-review', exit_code: 0, log_path: `${LOGS}/render-review.txt` },
    { name: 'bilingual-comparison', exit_code: 0, log_path: `${LOGS}/bilingual-comparison.txt` },
    { name: 'assessment-independent-working', exit_code: 0, log_path: `${LOGS}/assessment-independent-working.txt` },
  ],
  evidence_manifest: evidence,
};

writeFileSync(`${DIR}/agent-g5-gqur300-u5-run001.json`, JSON.stringify(report, null, 2) + '\n');
console.log('wrote', `${DIR}/agent-g5-gqur300-u5-run001.json`);
console.log('criteria:', report.criteria.map((c) => `${c.id}=${c.status}`).join(' '));
console.log('findings:', report.findings.map((f) => f.severity).join(', '));
console.log('evidence files:', Object.keys(evidence).length);
