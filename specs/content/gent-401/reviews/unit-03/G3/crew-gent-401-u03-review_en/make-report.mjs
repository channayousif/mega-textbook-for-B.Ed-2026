import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { validateReport } from '../../../../../../../scripts/lib/review-evidence.mjs';

const dir = 'specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en';
const manifest = JSON.parse(readFileSync(`${dir}/manifest.json`, 'utf8'));
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

const evidenceFiles = [
  `${dir}/manifest.json`,
  `${dir}/assessment-solutions.md`,
  `${dir}/limitations.md`,
  `${dir}/summary.md`,
  `${dir}/advisory-tracker-row.md`,
  `${dir}/make-report.mjs`,
  `${dir}/logs/validate_content.txt`,
  `${dir}/logs/check_depth-gate.txt`,
  `${dir}/logs/check_figures.txt`,
  `${dir}/logs/check_no-em-dash.txt`,
  `${dir}/logs/check_no-answer-keys.txt`,
  `${dir}/logs/check_docs-sync.txt`,
  `${dir}/logs/check_concept-graph.txt`,
  `${dir}/logs/check_bloom-bands.txt`,
  `${dir}/logs/build-content-status.txt`,
  `${dir}/logs/check-content.txt`,
  `${dir}/logs/measure-figure-text.txt`,
  `${dir}/logs/render-review.txt`,
];

const evidence_manifest = Object.fromEntries(evidenceFiles.map((p) => [p, sha(p)]));

const commands = [
  { name: 'validate:content', exit_code: 0, log_path: `${dir}/logs/validate_content.txt` },
  { name: 'check:depth-gate', exit_code: 0, log_path: `${dir}/logs/check_depth-gate.txt` },
  { name: 'check:figures', exit_code: 0, log_path: `${dir}/logs/check_figures.txt` },
  { name: 'check:no-em-dash', exit_code: 0, log_path: `${dir}/logs/check_no-em-dash.txt` },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: `${dir}/logs/check_no-answer-keys.txt` },
  { name: 'check:docs-sync', exit_code: 0, log_path: `${dir}/logs/check_docs-sync.txt` },
  { name: 'render-review', exit_code: 1, log_path: `${dir}/logs/render-review.txt` },
  { name: 'check:concept-graph', exit_code: 0, log_path: `${dir}/logs/check_concept-graph.txt` },
  { name: 'check:bloom-bands', exit_code: 0, log_path: `${dir}/logs/check_bloom-bands.txt` },
  { name: 'check:content', exit_code: 0, log_path: `${dir}/logs/check-content.txt` },
  { name: 'measure-figure-text', exit_code: 0, log_path: `${dir}/logs/measure-figure-text.txt` },
];

const U = 'docs/semester-4/gent-401/unit-03';
const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'specs/content/gent-401/content-spec.md:166-211 (Unit 3 G1 spec: sub-topics U3-01..U3-06, figure plan fig-U3-1..4, banner fig-U3-5, unit-end blueprint 10/10/5)',
      'Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:343-351 (guide Weeks 5-6: Market Research and Business Models)',
      `${U}/topic-01.mdx ### Understanding customers and markets matches U3-01`,
      `${U}/topic-01.mdx ### Data-collection methods matches U3-02`,
      `${U}/topic-01.mdx ### Competitor analysis matches U3-03`,
      `${U}/topic-02.mdx ### Types of business models matches U3-04`,
      `${U}/topic-02.mdx ### Value proposition matches U3-05`,
      `${U}/topic-02.mdx ### Revenue streams matches U3-06`,
      'CLO/SLO references SLO:GENT-401-3-1, SLO:GENT-401-3-2 traced across all unit topics and assessments',
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'specs/content/gent-401/sources/texts/openstax-entrepreneurship.md & Laverty & Littel (2020) Entrepreneurship: Chapter 5 (idea screening), Chapter 8 (market research, STP, competitors), Chapter 11 (BMC, VPC, revenue architectures)',
      'specs/content/gent-401/sources/texts/scott-2017-efmd.md & Scott (2017) EFMD guide: Chapter 5 (market definition, primary/secondary data, triangulation), Chapter 6 (customer discovery, competitor analysis, SWOT), Chapter 9 (business model choices), Chapter 27 (price as revenue driver)',
      'specs/content/gent-401/sources/texts/spriggs-2016-bmc.md & Spriggs (2016) BMC teaching case: 9 building blocks, hypothesis testing, candidate value propositions',
      'specs/content/gent-401/sources/unit-03.md: All external sources verified and bound; no unretrievable sources needed',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/gent-401/coverage/unit-03.md maps all six sub-topics U3-01..U3-06 to exact topic headings with bound sources; reinforcement traced across assessment and teacher notes',
      'check:depth-gate exit 0: concept coverage, required pedagogical blocks (hook, explanation, worked example, misconceptions, activity, retrieval, summary, self-assessment, practicum, summative task with rubric), reading-minutes budget (43 min vs 32-44 min band), coverage-sources consistency',
      'specs/content/gent-401/concepts/unit-03.md defines 6 core concepts (CON:GENT-401-3-1..6) with prerequisites, SLO mappings, and assessment links',
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      `${dir}/assessment-solutions.md: independent solve of MCQs 1-10 (B, C, A, B, B, B, B, A, B, B) matches ${U}/unit-assessment.mdx ### MCQ answer key 10/10`,
      'RRQs 1-10 derived answers verified against model answers and mark schemes; Bloom demand ranges Understand to Analyze',
      'ERQs 1-5 feature 4-criterion analytic rubrics (total 12 marks each) matching Bloom cognitive demand (Analyze, Create, Evaluate); ERQ 3 is blueprint Create item drafting value proposition and revenue streams from survey data; ERQ 5 is integrative item',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'render-review unavailable (exit 1): deployed SHA 366019f8ace647e892523e553b81ab6d1832ec68 differs from HEAD 39ac555fd9d85f6797442e4fecd25e7fdfae5384 on docs/semester-4/gent-401/unit-03/index.mdx and static/img/figures/gent-401/unit-03/fig-U3-5.webp; host limits and brief prohibit local build, dev server, or browser runs',
      'Structural accessibility passes from source: all figures have descriptive alt text; all SVGs carry role="img", aria-labelledby, <title>, and <desc>; semantic headings and table markup verified',
      'measure-figure-text exits 0 across all 16 SVGs in static/img/figures/gent-401/unit-03/',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      `${U}/index.mdx, topic-01.mdx, topic-02.mdx: clear, plain sentences suitable for B.Ed trainees without specialist prerequisite knowledge`,
      'Key terms defined at first use with Glossary components (Market research, Business model, Value proposition, Revenue stream)',
      'Contextualized with authentic Pakistani and Sindhi classroom scenarios (Larkana, Sukkur, Hyderabad)',
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'Both topics execute complete pedagogical progression: classroom situation -> explanation -> worked example -> misconception correction -> group activity -> retrieval -> summary -> self-assessment -> practicum connection -> summative task with rubric',
      'Common misconceptions explicitly debunked: friends liking an idea is market research (Topic 3.1), having no competitors means a great opportunity (Topic 3.1), a business model is the same as a business plan (Topic 3.2), a value proposition is a slogan (Topic 3.2), more revenue streams are always better (Topic 3.2)',
      'Activities feasible in local classrooms with chart paper, chalkboards, and peer exchanges',
    ],
  },
];

const findings = [
  {
    severity: 'uncertain',
    resolved: false,
    message: 'Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: the deployed SHA 366019f8ace647e892523e553b81ab6d1832ec68 differs from HEAD d45dac6df448377759ad4c8f2ba5780a42409744 on docs/semester-4/gent-401/unit-03/index.mdx and static/img/figures/gent-401/unit-03/fig-U3-5.webp. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure geometry pass from source.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'In docs/semester-4/gent-401/unit-03/unit-assessment.mdx:30-82, MCQ correct keys are distributed as A: 2, B: 7, C: 1, D: 0. Option D is never the correct key across all 10 items. All items and distractors are clear and unambiguous, but balancing the key distribution across A-D in future revisions is recommended.',
  },
];

const report = {
  schema_version: 1,
  course_code: 'GENT-401',
  unit_no: 3,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:7cbdfae847e62db99b2ad2f7d2b6ca6ebefda8e9',
  reviewer_run_id: 'd06d5d28-9ecb-4076-99c8-f8b1065bb4ec',
  model: 'Gemini 3.8 Flash (Medium)',
  started_at: '2026-11-26T21:33:20.000Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  criteria,
  findings,
  commands,
  evidence_manifest,
};

const reportPath = 'specs/content/gent-401/reviews/unit-03/G3/crew-gent-401-u03-review_en.json';
writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(`Wrote report to ${reportPath} with ${Object.keys(evidence_manifest).length} evidence files.`);

validateReport('.', report);
console.log('Report successfully validated against review evidence contract.');
