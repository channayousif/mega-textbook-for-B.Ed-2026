import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { rulingDigest, validateReport } from '../../../../../../../scripts/lib/review-evidence.mjs';

const dir = 'specs/content/efmp-408/reviews/unit-02/G3/agy-run1-20261125';
const manifest = JSON.parse(readFileSync(`${dir}/manifest.json`, 'utf8'));
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

const evidenceFiles = [
  `${dir}/manifest.json`,
  `${dir}/assessment-solutions.md`,
  `${dir}/limitations.md`,
  `${dir}/summary.md`,
  `${dir}/advisory-tracker-row.md`,
  `${dir}/make-report.mjs`,
  `${dir}/logs/validate:content.log`,
  `${dir}/logs/check:depth-gate.log`,
  `${dir}/logs/check:figures.log`,
  `${dir}/logs/check:no-em-dash.log`,
  `${dir}/logs/check:no-answer-keys.log`,
  `${dir}/logs/check:docs-sync.log`,
  `${dir}/logs/render-review.txt`,
  `${dir}/logs/check-content.log`,
  `${dir}/logs/build-content-status.log`,
  `${dir}/logs/measure-figure-text.log`,
];

const evidence_manifest = Object.fromEntries(evidenceFiles.map((p) => [p, sha(p)]));

const commands = [
  { name: 'validate:content', exit_code: 0, log_path: `${dir}/logs/validate:content.log` },
  { name: 'check:depth-gate', exit_code: 0, log_path: `${dir}/logs/check:depth-gate.log` },
  { name: 'check:figures', exit_code: 0, log_path: `${dir}/logs/check:figures.log` },
  { name: 'check:no-em-dash', exit_code: 0, log_path: `${dir}/logs/check:no-em-dash.log` },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: `${dir}/logs/check:no-answer-keys.log` },
  { name: 'check:docs-sync', exit_code: 0, log_path: `${dir}/logs/check:docs-sync.log` },
  { name: 'render-review', exit_code: 1, log_path: `${dir}/logs/render-review.txt` },
  { name: 'check:content', exit_code: 0, log_path: `${dir}/logs/check-content.log` },
  { name: 'measure-figure-text', exit_code: 0, log_path: `${dir}/logs/measure-figure-text.log` },
];

const U = 'docs/semester-4/efmp-408/unit-02';
const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'specs/content/efmp-408/content-spec.md:138-183 Unit 2 G1 spec: sub-topics U2-01..U2-07, figure plan fig-U2-1..6, banner fig-U2-7, unit-end blueprint 10/10/5.',
      `${U}/topic-01.mdx ### Writing instructional objectives with Bloom's Taxonomy matches U2-01.`,
      `${U}/topic-01.mdx ### The three domains: cognitive, affective and psychomotor matches U2-02.`,
      `${U}/topic-01.mdx ### Alignment between objectives, teaching and assessment matches U2-03.`,
      `${U}/topic-02.mdx ### Validity: content, construct and criterion matches U2-04.`,
      `${U}/topic-02.mdx ### Reliability: test-retest and inter-rater matches U2-05.`,
      `${U}/topic-03.mdx ### Practicality and usability matches U2-06.`,
      `${U}/topic-03.mdx ### Fairness and freedom from bias matches U2-07.`,
      'CLO/SLO references SLO:EFMP-408-2-1, 2-2, 2-3 traced across all unit topics and assessments.',
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'specs/content/efmp-408/sources/texts/hec-2013-testdev.md & HEC (2012) Test Development guide: Unit 3 pp. 63-68 (Bloom taxonomy, command words, three domains), Unit 4 pp. 68-72 (validity types, test-retest/interrater reliability), p. 73 (utility/practicality).',
      'specs/content/efmp-408/sources/texts/hec-2013-classroom-assessment.md & HEC (2012) Classroom Assessment guide: Unit 1 p. 16 & p. 60 (validity/reliability as inferences from scores), Unit 4 p. 22 & pp. 87-88 (fair tests, Table of Specifications), p. 252 (constructive alignment of objectives, activities, assessments).',
      'specs/content/efmp-408/sources/texts/seifert-sutton-2009.md: Chapters 10 and 11 on instructional alignment and integration of assessment into all teaching phases.',
      'specs/content/efmp-408/sources/unit-02.md: All external sources verified and bound; no unretrievable sources needed.',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/efmp-408/coverage/unit-02.md maps all seven sub-topics U2-01..U2-07 to exact topic headings with bound sources; design trace details retrieval items, MCQs, RRQs, and ERQs.',
      'check:depth-gate exit 0: concept coverage, required pedagogical blocks (hook, explanation, worked example, misconceptions, activity, retrieval, summary, self-assessment, practicum, summative task with rubric), formative floor, reading-minutes band (75 min vs 60-80 min band), coverage-sources consistency.',
      'specs/content/efmp-408/concepts/unit-02.md defines 7 core concepts (CON:EFMP-408-2-1..7) with prerequisites, SLO mappings, and assessment links.',
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      `${dir}/assessment-solutions.md: independent solve of MCQs 1-10 (A, B, B, C, B, C, B, A, B, B) matches ${U}/unit-assessment.mdx ### MCQ answer key 10/10.`,
      'RRQs 1-10 derived answers verified against model answers and mark schemes; Bloom demand ranges Understand to Analyze.',
      'ERQs 1-5 feature 3-criterion analytic rubrics (total 10 marks each) matching Bloom cognitive demand (Analyze, Create, Evaluate); ERQ 4 is blueprint integrative critique item; ERQ 5 is blueprint Evaluate item.',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'render-review unavailable (exit 1): deployed SHA 3910d26161b35a1faf18ce848fd50ab0b4cf59f7 differs from HEAD 7bb9e4d484428859cbfe2f6e3775c0e8291b11ea on docs/semester-4/efmp-408/unit-02/index.mdx and static/img/figures/efmp-408/unit-02/fig-U2-7.webp; host limits and brief prohibit local build, dev server, or browser runs.',
      'Structural accessibility passes from source: all figures have descriptive alt text; all SVGs carry role="img", aria-labelledby, <title>, and <desc>; semantic headings and table markup verified.',
      'measure-figure-text exits 0 across all 24 SVGs in static/img/figures/efmp-408/unit-02/.',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      `${U}/index.mdx, topic-01.mdx, topic-02.mdx, topic-03.mdx: clear, plain sentences suitable for B.Ed trainees without specialist prerequisite knowledge.`,
      'Key terms defined at first use with Glossary components (Instructional objective, Bloom\'s Taxonomy, Cognitive domain, Affective domain, Psychomotor domain, Alignment, Validity, Reliability, Practicality, Bias).',
      'Contextualized with authentic Pakistani and Sindhi classroom scenarios (Larkana, Tharparkar, Karachi).',
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'All three topics execute complete pedagogical progression: classroom situation -> explanation -> worked example -> misconception correction -> group activity -> retrieval -> summary -> self-assessment -> practicum connection -> summative task with rubric.',
      'Common misconceptions explicitly debunked: objective as restatement of heading (Topic 2.1), reliable test must be valid (Topic 2.2), validity is property of test rather than inference (Topic 2.2), fair means identical for everyone (Topic 2.3).',
      'Activities feasible in local classrooms with chart paper, chalkboards, and peer exchanges.',
    ],
  },
];

const findings = [
  {
    severity: 'uncertain',
    resolved: false,
    message: 'Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: the deployed SHA 3910d26161b35a1faf18ce848fd50ab0b4cf59f7 differs from HEAD 7bb9e4d484428859cbfe2f6e3775c0e8291b11ea on docs/semester-4/efmp-408/unit-02/index.mdx and static/img/figures/efmp-408/unit-02/fig-U2-7.webp. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure geometry pass from source.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'In docs/semester-4/efmp-408/unit-02/unit-assessment.mdx:36-95, MCQ correct keys are distributed as A: 2, B: 6, C: 2, D: 0. Option D is never the correct key across all 10 items. All items and distractors are clear and unambiguous, but balancing the key distribution across A-D in future revisions is recommended.',
  },
];

const rulings = {
  'D-2026-0001': rulingDigest('.', 'D-2026-0001'),
};

const report = {
  schema_version: 1,
  course_code: 'EFMP-408',
  unit_no: 2,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:524d79d15d0f9f4023c1ec340055de8a2a136091',
  reviewer_run_id: '62f64eb3-3275-4677-b6da-317a8e876527',
  model: 'Gemini 3.8 Flash (Medium)',
  started_at: '2026-11-25T15:32:22.000Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  rulings,
  criteria,
  findings,
  commands,
  evidence_manifest,
};

const reportPath = 'specs/content/efmp-408/reviews/unit-02/G3/agy-run1-20261125.json';
writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(`Wrote report to ${reportPath} with ${Object.keys(evidence_manifest).length} evidence files.`);

validateReport('.', report);
console.log('Report successfully validated against review evidence contract.');
