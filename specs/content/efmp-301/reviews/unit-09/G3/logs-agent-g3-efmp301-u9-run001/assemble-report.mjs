// Assembles the G3 report JSON for EFMP-301 Unit 9, run agent-g3-efmp301-u9-run001.
// Binds the CURRENT input manifest (required by validateReport) and hashes the exact
// evidence bytes saved under this run's logs/ and renders/ directories.
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { inputManifest, skillDigest } from '../../../../../../../scripts/lib/review-evidence.mjs';

const ROOT = '/home/a2ahs/mega_book_for_B.Ed/.claude/worktrees/agent-ad57ca9469bfc4572';
const RUN = 'specs/content/efmp-301/reviews/unit-09/G3';
const sha = (p) => createHash('sha256').update(readFileSync(join(ROOT, p))).digest('hex');

const evidence = {};
for (const f of readdirSync(join(ROOT, RUN, 'logs-agent-g3-efmp301-u9-run001'))) {
  evidence[`${RUN}/logs-agent-g3-efmp301-u9-run001/${f}`] = sha(`${RUN}/logs-agent-g3-efmp301-u9-run001/${f}`);
}
for (const f of readdirSync(join(ROOT, RUN, 'renders-agent-g3-efmp301-u9-run001'))) {
  evidence[`${RUN}/renders-agent-g3-efmp301-u9-run001/${f}`] = sha(`${RUN}/renders-agent-g3-efmp301-u9-run001/${f}`);
}
evidence[`${RUN}/summary-run001.txt`] = sha(`${RUN}/summary-run001.txt`);

const L = `${RUN}/logs-agent-g3-efmp301-u9-run001`;
const report = {
  schema_version: 1,
  course_code: 'EFMP-301',
  unit_no: 9,
  stage: 'G3',
  disposition: 'revise',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:631bb07d',
  reviewer_run_id: 'agent-g3-efmp301-u9-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-25T15:03:00Z',
  completed_at: '2026-09-25T15:50:00Z',
  skill_digest: skillDigest(ROOT, 'G3'),
  input_manifest: inputManifest(ROOT, 'EFMP-301', 9, 'G3'),
  rulings: {},
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        'Scheme-and-Course-guides/extracted-text/1st 2026.txt:1146-1151 - guide Week 14 Chapter 9 names exactly three bullets (types and purposes of assessment; psychological tests and measurement; formative and summative evaluation); all three are decomposed into U9-1..U9-6 and taught',
        'Scheme-and-Course-guides/extracted-text/1st 2026.txt:1039 - guide CLO 5 "Use assessment techniques to support student learning"; both SLO:EFMP-301-9-1 and SLO:EFMP-301-9-2 trace to it per specs/content/efmp-301/content-spec.md ## Unit 9',
        'Scheme-and-Course-guides/extracted-text/1st 2026.txt:1193-1202 - the guide\'s recommended book 2 is the Seifert 2009 URL the unit cites; sources/unit-09.md:14 binds it guide-required',
        'docs/semester-1/efmp-301/course-overview.mdx:68 - overview row "9 | 14 | Assessment and Evaluation" matches the guide scheme',
        'specs/content/efmp-301/content-spec.md ## Unit 9 - sub-topic checklist is a faithful leaf decomposition of the three guide bullets; no scope invented or dropped',
      ],
    },
    {
      id: 'sources',
      status: 'fail',
      evidence: [
        'specs/content/efmp-301/sources/texts/seifert2009.md:258-292 - all seven direct quotations verified verbatim against the bound excerpt: summative definition (topic-01.mdx:62-65, topic-03.mdx:78-81), assessment-for-learning including "integral to the all phases" (topic-03.mdx:44-48), motivation-and-confidence (topic-03.mdx:70-73), validity definition (topic-02.mdx:67-70), reliability "consistency of the measurement" (topic-02.mdx:76-77), the three consistency questions (topic-02.mdx:77-79, paraphrased faithfully)',
        'docs/semester-1/efmp-301/unit-09/topic-01.mdx:50 - "Four purposes cover the classroom territory (Seifert & Sutton, 2009)": the diagnose/form/sum/certify partition has no bound passage; the excerpt contains no purposes enumeration and no diagnostic-before-instruction framing',
        'docs/semester-1/efmp-301/unit-09/topic-02.mdx:43-47 - the standardisation definition ("the same items, given the same way, scored the same way, everywhere") is cited to Seifert & Sutton (2009) but the bound excerpt contains no standardisation or teacher-made-trade passage, and binds no Chapter 12 text at all though the spec maps U9-3 to Chapters 11-12',
        'docs/semester-1/efmp-301/unit-09/topic-02.mdx:89-92 - the absence-of-bias gloss ("no group of pupils should be systematically disadvantaged...") is attributed to the source; the excerpt binds only the triad name "Absence of bias"',
        'specs/content/efmp-301/sources/unit-09.md:14 - the Supports column claims "the diagnostic-before-instruction framing" (U9-1) and "standardisation; the teacher-made trade" (U9-3), neither of which the bound excerpt contains; the declaration overstates what is bound',
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'specs/content/efmp-301/coverage/unit-09.md:7-13 - all six checklist sub-topics mapped to sections that exist and genuinely teach them, verified by reading each: topic-01.mdx "Types of assessment and the decisions they feed" (U9-1, U9-2), topic-02.mdx "Psychological tests: what they are and what they measure" (U9-3) and "Measurement quality: validity and reliability" (U9-4), topic-03.mdx "Formative evaluation: assessment that teaches" (U9-5) and "Summative evaluation: assessment that certifies" (U9-6)',
        'specs/content/efmp-301/coverage/unit-09.md:19-25 - all five reinforcement rows verified at their cited locations (U9-1/U9-4 in topic-03 Explanation, U9-5 in topic-01 Explanation, U9-6 in unit-assessment Unit summary, U9-5 practical work in teacher notes)',
        'logs-agent-g3-efmp301-u9-run001/check-depth-gate.log - coverage/sources consistency and checklist mapping machine-verified, exit 0',
      ],
    },
    {
      id: 'assessment',
      status: 'fail',
      evidence: [
        'docs/semester-1/efmp-301/unit-09/unit-assessment.mdx:43-152 - all 10 MCQs and 10 RRQs solved independently before reading the supplied answers; derived key 1-b, 2-b, 3-b, 4-b, 5-b, 6-b, 7-b, 8-b, 9-c, 10-b and derived RRQ substance all match the supplied answers and mark schemes; no ambiguous stems; distractors plausible; ERQ rubrics analytic (20 marks) with >= 1 Analyze-or-higher demand each',
        'specs/content/efmp-301/concepts/unit-09.md:15-22 - per the unit\'s own concept graph the MCQ topic spread is 3/4/3 (9.1: MCQ-01..03; 9.2: MCQ-05..08; 9.3: MCQ-04, 09, 10) and the RRQ spread is 2/4/4 (9.1: RRQ-01..02; 9.2: RRQ-03..06; 9.3: RRQ-07..10), against the approved blueprint 4/3/3 and 3/4/3 (specs/content/efmp-301/content-spec.md ## Unit 9, Unit-end assessment blueprint)',
        'docs/semester-1/efmp-301/unit-09/unit-assessment.mdx:155-166 - 9 of 10 MCQ keys are option b',
        'docs/semester-1/efmp-301/unit-09/unit-assessment.mdx:58,88,94 - MCQ-03, MCQ-08, MCQ-09 are labelled Apply but the thinking required is recognition of examples worked verbatim in the topics (Remember/Understand); no RRQ reaches the blueprint band\'s Analyze top (labels: 8 Understand, 2 Apply)',
        'docs/semester-1/efmp-301/unit-09/unit-assessment.mdx:127-151,196-243 - ERQ set matches the blueprint (one per topic plus the two named integrative items: evaluate-a-test and design-a-cycle)',
      ],
    },
    {
      id: 'accessibility',
      status: 'fail',
      evidence: [
        'renders-agent-g3-efmp301-u9-run001/render-inspection.json - real-browser inspection (Playwright Chromium on the served build): all 6 figures render and are visible at 360px with alt text verbatim from the manifest; no figure clipping (figure boxes scrollWidth == clientWidth); the one overflowing table (teacher-notes sequencing table, scrollWidth 341 in clientWidth 328) is keyboard-marked (tabindex=0, role=region, aria-label "Scrollable table, scroll sideways to see all columns") and swipe-reachable (maxScrollLeft 13, last column reachable)',
        'renders-agent-g3-efmp301-u9-run001/render-inspection.json a4-print pass - docW 794, zero overflowing elements on all six pages, all figures visible in print media, answers heading present on unit-assessment',
        'static/img/figures/efmp-301/unit-09/fig-U9-4.svg - caption text elements at x=530 (y=352/374/396) read "the wrong question (validity) needs a / instrument; an inconsistent measure / better rubric - not by difficulty." - garbled by commit 42ad6a8d (the pre-fix caption was grammatical); same defect in fig-U9-4.dark.svg; the Urdu twin fig-U9-4.ur.svg retains the correct sentence, so EN/UR figure parity is also broken',
        'static/img/figures/efmp-301/unit-09/fig-U9-3.svg - the teacher-made trade cell now reads "trades defensibility / for fit: this class\'s decisions", dropping "comparability", the exact trade the prose teaches twice (topic-01.mdx:72-74, topic-02.mdx:49-51,128-130) and the manifest prompt records ("comparability and defensibility"); same in the dark twin; the Urdu twin retains "comparison and defensibility"',
        'logs-agent-g3-efmp301-u9-run001/measure-figure-text.log - no glyph overflow in any of the 12 English SVG assets (widest text 770.6 inside viewBox width 780)',
        'renders-agent-g3-efmp301-u9-run001/*.png - 18 render artifacts (6 narrow-360 pages, 6 figure closeups, 6 A4 print pages) verified non-blank by pixel statistics',
      ],
    },
    {
      id: 'readability',
      status: 'pass',
      evidence: [
        'All five unit files read in full; register is HSC-accessible: short sentences, active voice, one idea per paragraph; every technical term defined at first use (assessment topic-01.mdx:43-47; validity and reliability topic-02.mdx:64-80; formative/summative topic-03.mdx:41-48,76-81)',
        'est_reading_minutes 4+17+16+17+24+8 = 86, inside the 78-105 depth budget (specs/content/efmp-301/content-spec.md ## Unit 9)',
        'logs-agent-g3-efmp301-u9-run001/check-no-em-dash.log - exit 0',
        'Two minor internal-consistency notes recorded as advisory findings (index "ranks them in December"; "three assessments" vs the unannounced December test)',
      ],
    },
    {
      id: 'pedagogy',
      status: 'pass',
      evidence: [
        'Nine-part cycle present and ordered in all three topics (gate-verified and read); misconception blocks in each Explanation match the spec\'s common-misconceptions list: "assessment means marks at the end" (topic-01.mdx:78-83), "a difficult test is a good test" (topic-02.mdx:94-99), purpose-not-timing (topic-03.mdx:84-95)',
        'Pakistan/Sindh grounding throughout: the Nawabshah Class 7 year (topic-01.mdx:26-35), the Sindhi-medium newcomer (topic-02.mdx:26-35), the two-corridors case (topic-03.mdx:26-35); all activities feasible in pairs with no materials, 20-25 minutes, usable instructions',
        'Worked examples present per sub-topic as planned in the spec; the course-as-worked-example meta-opportunity is exploited (index.mdx:63-65, teacher notes "Use the course as the worked example"); 15 formative items across the three "Check your understanding" blocks (floor 5-8); teacher-notes sequencing table and compression guidance are usable',
        'docs/semester-1/efmp-301/unit-09/unit-teacher-notes.mdx:75-80 - Urdu key terms match the terminology bank (Assessment, Formative, Summative, Diagnostic, Validity, Reliability, Standardized Test all banked in specs/content/terminology.csv:19-80)',
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: false,
      message: 'Accessibility/figures: the fig-U9-4 target-diagram caption is garbled in the rendered English SVG. static/img/figures/efmp-301/unit-09/fig-U9-4.svg text elements (x=530, y=352-396) read "the wrong question (validity) needs a / instrument; an inconsistent measure / better rubric - not by difficulty." - "better" is missing from the second line and "needs a" from the fourth, producing ungrammatical learner-facing text ("needs a instrument"; "an inconsistent measure better rubric"). Introduced by commit 42ad6a8d ("fix English figure label overflows"), which regressed the previously correct caption ("a wrong question (validity) needs a better / instrument; an inconsistent measure needs a / better rubric. Neither is answered by difficulty."). Same defect in fig-U9-4.dark.svg. The Urdu twin fig-U9-4.ur.svg still carries the correct sentence, so the light/dark English assets also disagree with their own Urdu mirror. Repair: restore the grammatical caption in fig-U9-4.svg and fig-U9-4.dark.svg (re-derive the dark twin), keeping lines within the viewBox.',
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'Accessibility/figures: fig-U9-3 (teacher-made vs standardised table) misstates the teacher-made trade after the same fix commit. The rendered cell (static/img/figures/efmp-301/unit-09/fig-U9-3.svg, x=592) now reads "trades defensibility / for fit: this class\'s decisions", dropping "comparability" - but the prose teaches comparability as the teacher-made price twice (topic-01.mdx:72-74 "at the price of comparability"; topic-02.mdx:49-51 "cannot be compared with any other class\'s result"; summary line 128-130 "trading fit for comparability in opposite directions") and the manifest prompt (specs/content/efmp-301/figures/unit-09.md:12) records "comparability and defensibility". A learner comparing figure and prose meets a contradiction on the unit\'s central concept. Same change in fig-U9-3.dark.svg; the Urdu twin retains the full "comparison and defensibility". Repair: restore "comparability" in both English variants (e.g. "trades comparability / for fit"), or reword within width while keeping both named trades consistent with the prose and manifest.',
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'Sources: three load-bearing attributions cite Seifert & Sutton (2009) for claims the bound excerpt does not contain, and the sources declaration overstates what is bound. (1) topic-01.mdx:50 "Four purposes cover the classroom territory (Seifert & Sutton, 2009)" - the diagnose/form/sum/certify partition has no bound passage; (2) topic-02.mdx:43-47 - the standardisation definition is cited to the source but the excerpt contains no standardisation or teacher-made-trade passage and binds no Chapter 12 text at all, though the spec maps U9-3 to Chapters 11-12; (3) topic-02.mdx:89-92 - the absence-of-bias gloss is attributed to the source while the excerpt binds only the triad name. sources/unit-09.md:14 claims support for "the diagnostic-before-instruction framing" (U9-1) and "standardisation; the teacher-made trade" (U9-3), neither present in sources/texts/seifert2009.md:258-292. All seven verbatim quotations do check out. Repair: extend the bound excerpt with the actual Chapter 11/12 passages (the purposes/diagnostic discussion, the standardisation definition, the absence-of-bias definition) or re-attribute those three sentences as unit synthesis; align the Supports column with what is actually bound.',
    },
    {
      severity: 'blocking',
      resolved: false,
      message: 'Assessment: the bank does not meet the approved blueprint\'s topic spreads. specs/content/efmp-301/content-spec.md ## Unit 9 (Unit-end assessment blueprint) requires MCQ "spread 4/3/3 across topics 9.1 to 9.3" and RRQ "spread 3/4/3". Per the unit\'s own concept graph (specs/content/efmp-301/concepts/unit-09.md:15-22) the actual MCQ spread is 3/4/3 (9.1: MCQ-01..03; 9.2: MCQ-05..08; 9.3: MCQ-04, 09, 10) and the RRQ spread is 2/4/4 (9.1: RRQ-01..02; 9.2: RRQ-03..06; 9.3: RRQ-07..10). Topic 9.1 is under-sampled in both bands. Repair: re-theme one MCQ and one RRQ onto Topic 9.1 material (or amend the blueprint in the spec with justification) so the bank conforms.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Assessment quality: 9 of 10 MCQ keys are option b (unit-assessment.mdx:155-166; only MCQ-09 is c). A test-wise pupil can score 90 percent on this bank without knowing the content, and the unit itself teaches assessment quality, so the bank should model balanced keying. Repair: redistribute correct-option positions across a/b/c/d at the next content revision.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Assessment: Bloom labels overstate actual demand at the top of the MCQ band and never reach the RRQ band\'s top. MCQ-03, MCQ-08 and MCQ-09 are labelled Apply (unit-assessment.mdx:58, 88, 94) but each asks the learner to recognise an example worked verbatim in the topic prose (the April check is diagnostic, topic-01.mdx:52-55; "consistently measuring the wrong mixture", topic-02.mdx:83-85; the two-corridors purpose answer, topic-03.mdx:31-35), which is Remember/Understand. No RRQ is labelled or demands Analyze (8 Understand, 2 Apply against the blueprint\'s "Understand to Analyze"). Repair: relabel the three MCQs, or rewrite them to require genuine application (a novel instance, not the worked one), and consider one true Analyze RRQ.',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Readability/consistency: two small internal inconsistencies in the Class 7 narrative. (1) index.mdx:27-28 says "the test that ranks them in December", but topic-01.mdx assigns ranking/certification to the March board examination (lines 30-31, 67-69) and gives the December test the summative decision (mastery, readiness, grades, lines 62-65) - in a unit whose discipline is naming decisions precisely, the index conflates the two instruments. (2) topic-01.mdx:26-35 opens "one year, three assessments" and names the April check, the Tuesday quiz and the March board exam, but the Explanation then uses a fourth instrument, "the December test" (line 62), with no introduction. Repair: at the next revision, align the index phrasing and introduce the December test in the classroom situation (or fold it into the "three assessments" frame).',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Figure manifest: the fig-U9-1 Prompt column misdescribes the rendered figure. specs/content/efmp-301/figures/unit-09.md:10 assigns "the board examination" as the sum instance and "the board certificate" as the certify instance, but the rendered SVG (and the prose, topic-01.mdx:62-69, and fig-U9-2) correctly pair sum with "the December test" and certify with "the board examination". The rendered asset is right; the manifest record is stale. Repair: correct the Prompt column at the next manifest touch so the record matches the placed asset.',
    },
    {
      severity: 'advisory',
      resolved: true,
      message: 'Process/drift (recorded, handled): the prepared manifest (specs/content/efmp-301/reviews/unit-09/G3/manifest.json, committed at 6d6236d7, 2026-09-25 02:45 -0500) is stale against the reviewed HEAD: 5 of 98 bound inputs changed after preparation - specs/content/efmp-301/sources/texts/seifert2009.md (extended excerpts, commit 8c15c7c9) and the four fig-U9-3/fig-U9-4 English SVGs (label-overflow fixes, commit 42ad6a8d). The English unit prose is unchanged. Per the parent instruction the digests were re-verified, the review covers the current bytes, and this report binds the current input manifest (HEAD 53b051ea), which is byte-identical for Unit 9 inputs to the state (4dbe708a) every recorded command and render ran against. No Unit 9 bound input changed during the review window: 4dbe708a..53b051ea touched only other units\' G2 evidence, the unit-07 sources registry, tasks.md, and this review\'s own logs (swept into 53b051ea by a concurrent parent-session commit; reviews/ is excluded from manifest binding and the log bytes are unchanged).',
    },
    {
      severity: 'advisory',
      resolved: false,
      message: 'Tooling limitation (recorded for the parent): this reviewer session could not display images (the Read tool returned no image content for PNGs and both MCP browser plugins could not launch - no system Chrome). Rendered inspection was therefore performed by a real Playwright Chromium session against the served build (render-inspect.mjs): DOM geometry, visibility, alt-text, print-overflow and swipe-reachability measurements for every figure and table, plus non-blank pixel-statistics verification of all 18 saved renders. The two figure defects above are additionally proven at the SVG text-element level, which is deterministic. The 18 PNG artifacts are saved for human viewing; a human glance at narrow-360-topic-02-fig-U9-4-closeup.png and the A4 prints is recommended when the repairs land.',
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: `${L}/validate-content.log` },
    { name: 'check:depth-gate', exit_code: 0, log_path: `${L}/check-depth-gate.log` },
    { name: 'check:figures', exit_code: 0, log_path: `${L}/check-figures.log` },
    { name: 'check:no-em-dash', exit_code: 0, log_path: `${L}/check-no-em-dash.log` },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: `${L}/check-no-answer-keys.log` },
    { name: 'check:docs-sync', exit_code: 0, log_path: `${L}/check-docs-sync.log` },
    { name: 'check:concept-graph', exit_code: 0, log_path: `${L}/check-concept-graph.log` },
    { name: 'check:bloom-bands', exit_code: 0, log_path: `${L}/check-bloom-bands.log` },
    { name: 'figures:variants:check', exit_code: 0, log_path: `${L}/figures-variants-check.log` },
    { name: 'measure-figure-text', exit_code: 0, log_path: `${L}/measure-figure-text.log` },
    { name: 'build', exit_code: 0, log_path: `${L}/build.log` },
    { name: 'serve', exit_code: 0, log_path: `${L}/serve.log` },
    { name: 'render-review', exit_code: 0, log_path: `${L}/render-review.log` },
  ],
  evidence_manifest: evidence,
};

writeFileSync(join(ROOT, RUN, 'agent-g3-efmp301-u9-run001.json'), JSON.stringify(report, null, 2) + '\n');
console.log('report written; criteria:', report.criteria.length, 'findings:', report.findings.length,
  'commands:', report.commands.length, 'evidence files:', Object.keys(evidence).length);
