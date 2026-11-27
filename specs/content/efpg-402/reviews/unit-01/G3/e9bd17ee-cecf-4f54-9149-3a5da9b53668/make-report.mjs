import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { rulingDigest, skillDigest, validateReport } from '../../../../../../../scripts/lib/review-evidence.mjs';

const root = '.';
const dir = 'specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668';
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

const U = 'docs/semester-4/efpg-402/unit-01';
const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'specs/content/efpg-402/content-spec.md:83-138 Unit 1 G1 spec: sub-topics U1-01..U1-07, figure plan fig-U1-1..10, banner fig-U1-11, unit-end blueprint 10/10/5.',
      `${U}/topic-01.mdx ### Meaning and characteristics of science matches U1-01.`,
      `${U}/topic-02.mdx ### Science as a process (process skills) matches U1-02.`,
      `${U}/topic-02.mdx ### Science as a product (facts, concepts, laws, theories) matches U1-03.`,
      `${U}/topic-02.mdx ### Science as an attitude (curiosity, open-mindedness, honesty) matches U1-04.`,
      `${U}/topic-03.mdx ### Aims and objectives of teaching science matches U1-05.`,
      `${U}/topic-04.mdx ### Values of science education: intellectual, moral, social matches U1-06.`,
      `${U}/topic-05.mdx ### Role of science in modern society matches U1-07.`,
      'CLO/SLO references SLO:EFPG-402-1-1, 1-2 traced across all unit topics and assessments.',
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'specs/content/efpg-402/sources/texts/ncp-science-2022.md & National Curriculum of Pakistan 2022-23 (Science, Grades 4-8): Scientific Enquiry, Science in Context, benchmark shifts, health/biotech/energy.',
      'specs/content/efpg-402/sources/texts/sep-scientific-method.md & Stanford Encyclopedia of Philosophy (Scientific Method): empirical basis, fallibility, non-linear cyclic method, values behind method.',
      'specs/content/efpg-402/sources/texts/halai-2003-nos.md & Halai (2003): nature-of-science ideas for school science, teaching science in Pakistan, scientific literacy as curriculum aim.',
      'specs/content/efpg-402/sources/texts/epi-pakistan-factfile.md & EPI Pakistan Fact File (Federal Directorate of Immunization): 1978 launch, vaccine introduction timeline, routine immunization.',
      'specs/content/efpg-402/sources/unit-01.md: Print monographs Das (1985) and Yadav (2002) declared under ## Unverifiable sources per D-2026-0001; no claim rests on them alone.',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/efpg-402/coverage/unit-01.md maps all seven sub-topics U1-01..U1-07 to exact topic headings with bound sources; design trace details retrieval items, MCQs, RRQs, and ERQs.',
      'check:depth-gate exit 0: 5 topics, 7 sub-topics, reading-minutes budget within 42-61 min band, all required pedagogical blocks present across all topics (hook, explanation, worked example, misconceptions, activity, retrieval, summary, self-assessment, practicum, summative task with rubric).',
      'specs/content/efpg-402/concepts/unit-01.md defines 11 core concepts (CON:EFPG-402-1-1..11) with prerequisites, SLO mappings, and 10/10/5 assessment item links.',
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      `${dir}/assessment-solutions.md: independent solve of MCQs 1-10 (C, B, C, A, B, C, B, A, C, A) matches ${U}/unit-assessment.mdx ### MCQ answer key 10/10.`,
      'RRQs 1-10 derived answers verified against model answers and mark schemes; Bloom demand ranges Understand to Analyze.',
      'ERQs 1-5 feature 3-to-4-criterion analytic rubrics matching Bloom cognitive demand (Analyze, Create, Evaluate); ERQ 1 classifies 10 lesson statements (Analyze); ERQ 4 is lesson design (Create); ERQ 5 is blueprint integrative capstone (Evaluate).',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'render-review unavailable (exit 1): deployed SHA 0cbed86bb96f7a6a03420ad3e5d726a47e8f5513 differs from HEAD 956c4ba914a2750e5058774e1d916bb4b11f7c5d on docs/semester-4/efpg-402/unit-01/index.mdx and static/img/figures/efpg-402/unit-01/fig-U1-11.webp; host limits and brief prohibit local build, dev server, or browser runs.',
      'Structural accessibility passes from source: all figures have descriptive alt text; all SVGs carry role="img", aria-labelledby, <title>, and <desc>; semantic headings and table markup verified.',
      'measure-figure-text exits 0 across all 40 SVGs in static/img/figures/efpg-402/unit-01/.',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      `${U}/index.mdx, topic-01.mdx, topic-02.mdx, topic-03.mdx, topic-04.mdx, topic-05.mdx: clear, plain sentences suitable for B.Ed trainees without specialist prerequisite knowledge.`,
      'Key terms defined at first use with Glossary components (Science, Scientific attitude, Process skills, Empirical, Tentative, Theory, Hypothesis, Scientific literacy).',
      'Contextualized with authentic Pakistani and Sindhi classroom scenarios (Tando Allahyar, Mirpurkhas, Hyderabad, Larkana, Thatta).',
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'All five topics execute complete pedagogical progression: classroom situation -> explanation -> worked example -> misconception correction -> group activity -> retrieval -> summary -> self-assessment -> practicum connection -> summative task with rubric.',
      'Common misconceptions explicitly debunked: science is a collection of facts to memorise (Topic 1.1), scientific theories are guesses (Topic 1.2), science and values have nothing to do with each other (Topic 1.4).',
      'Activities feasible in local classrooms with chart paper, seeds, soap, chalk, local community observation, and peer exchanges.',
    ],
  },
];

const findings = [
  {
    severity: 'uncertain',
    resolved: false,
    message: 'Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: the deployed SHA 0cbed86bb96f7a6a03420ad3e5d726a47e8f5513 differs from HEAD 956c4ba914a2750e5058774e1d916bb4b11f7c5d on docs/semester-4/efpg-402/unit-01/index.mdx and static/img/figures/efpg-402/unit-01/fig-U1-11.webp. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure geometry pass from source.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'In docs/semester-4/efpg-402/unit-01/unit-assessment.mdx:37-89, MCQ correct keys are distributed as A: 3, B: 3, C: 4, D: 0. Option D is never the correct key across all 10 items. All items and distractors are clear and unambiguous, but balancing the key distribution across A-D in future revisions is recommended.',
  },
];

const report = {
  schema_version: 1,
  course_code: 'EFPG-402',
  unit_no: 1,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:5575ac2aba126a90814c26464b885914108d9142',
  reviewer_run_id: 'e9bd17ee-cecf-4f54-9149-3a5da9b53668',
  model: 'Gemini 3.8 Flash (Medium)',
  started_at: '2026-11-27T15:19:19.000Z',
  completed_at: new Date().toISOString(),
  skill_digest: skillDigest(root, 'G3'),
  input_manifest: manifest.input_manifest,
  rulings: {
    'D-2026-0001': rulingDigest(root, 'D-2026-0001'),
  },
  criteria,
  findings,
  commands,
  evidence_manifest,
};

const reportPath = 'specs/content/efpg-402/reviews/unit-01/G3/e9bd17ee-cecf-4f54-9149-3a5da9b53668.json';
writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(`Wrote report to ${reportPath}`);

validateReport(root, report);
console.log('Report validated successfully!');
