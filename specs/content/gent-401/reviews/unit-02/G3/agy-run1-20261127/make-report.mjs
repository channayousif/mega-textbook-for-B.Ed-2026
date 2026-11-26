import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { rulingDigest, validateReport } from '../../../../../../../scripts/lib/review-evidence.mjs';

const dir = 'specs/content/gent-401/reviews/unit-02/G3/agy-run1-20261127';
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

const U = 'docs/semester-4/gent-401/unit-02';
const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'specs/content/gent-401/content-spec.md:120-165 Unit 2 G1 spec: sub-topics U2-01..U2-06, figure plan fig-U2-1..4, banner fig-U2-5, unit-end blueprint 10/10/5.',
      `${U}/topic-01.mdx ### Small businesses and scalable start-ups matches U2-01.`,
      `${U}/topic-01.mdx ### Social entrepreneurship matches U2-02.`,
      `${U}/topic-01.mdx ### Other forms: intrapreneurship and women's entrepreneurship matches U2-03.`,
      `${U}/topic-02.mdx ### Identifying business opportunities matches U2-04.`,
      `${U}/topic-02.mdx ### Idea-generation techniques matches U2-05.`,
      `${U}/topic-02.mdx ### Screening and evaluating ideas matches U2-06.`,
      'CLO/SLO references SLO:GENT-401-2-1 and SLO:GENT-401-2-2 traced across index, topics, and assessment.',
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'specs/content/gent-401/sources/unit-02.md: Laverty & Littel (2020) Entrepreneurship (OpenStax), chapters 2, 5, 6 supporting small business vs start-up (2.1), social enterprise (3.2), intrapreneurship (2.2), opportunity definition & Schumpeter\'s five paths (5.1), idea-generation techniques & five-step creative problem solving (6.2, 6.3), screening criteria (5.2).',
      'specs/content/gent-401/sources/unit-02.md: Qamar et al. (2020) Social entrepreneurship in Pakistan: Challenges and prospects, JMR 7(2), 1-41; verified via OpenAlex W3118924195.',
      'specs/content/gent-401/sources/unit-02.md: Butler, E. (2020) An Introduction to Entrepreneurship, IEA, ISBN 978-0-255-36794-3, p. 23 supporting intrapreneurship and managerial vs innovative roles; confirmed publication year 2020.',
      'specs/content/gent-401/sources/unit-02.md: Mellor et al. (2009) declared under ## Unverifiable sources with honest scope disclosure (used by reference only for general background on small/large ventures and developing ideas; no page or wording claimed).',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/gent-401/coverage/unit-02.md maps all six sub-topics U2-01..U2-06 to exact topic headings with bound sources; reinforces U2-02, U2-03, U2-06 in assessment and teacher notes.',
      'check:depth-gate exit 0: concept coverage, required pedagogical blocks (hook, explanation, worked example, misconceptions, activity, retrieval, summary, self-assessment, practicum, summative task with rubric), formative floor, reading-minutes band (32-44 reading-min budget), coverage-sources consistency.',
      'specs/content/gent-401/concepts/unit-02.md defines 10 core concepts (CON:GENT-401-2-1..10) with prerequisites, SLO mappings, and assessment links.',
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      `${dir}/assessment-solutions.md: independent solve of MCQs 1-10 (B, C, D, D, C, A, D, B, C, D) matches ${U}/unit-assessment.mdx ### MCQ answer key 10/10.`,
      'RRQs 1-10 derived answers verified against model answers and mark schemes; Bloom demand ranges Understand to Analyze.',
      'ERQs 1-5 feature 4-criterion analytic rubrics (total 12 marks each) matching Bloom cognitive demand Analyze, Evaluate, and Create; ERQ 4 is blueprint weighted checklist evaluation item; ERQ 5 is blueprint district venture Create item.',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'render-review unavailable (exit 1): deployed SHA 366019f8ace647e892523e553b81ab6d1832ec68 differs from HEAD 39ac555fd68079fbe4a9a92440f3408a2fcb7c46 on docs/semester-4/gent-401/unit-02/index.mdx and static/img/figures/gent-401/unit-02/fig-U2-5.webp; host limits and brief prohibit local build, dev server, or browser runs.',
      'Structural accessibility passes from source: all figures have descriptive alt text; all SVGs carry role="img", aria-labelledby, <title>, and <desc>; semantic headings and table markup verified.',
      'measure-figure-text exits 0 across all 16 SVGs in static/img/figures/gent-401/unit-02/.',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      `${U}/index.mdx, topic-01.mdx, topic-02.mdx, unit-assessment.mdx, unit-teacher-notes.mdx: clear, plain sentences suitable for B.Ed trainees without specialist prerequisite knowledge.`,
      'Key terms defined at first use with Glossary components (Small business, Scalable start-up, Social enterprise, Intrapreneurship, Women entrepreneurship, Business opportunity).',
      'Contextualized with authentic Pakistani and Sindhi classroom scenarios (Thatta, Khairpur, Sukkur, Badin).',
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'Both topics execute complete pedagogical progression: classroom situation -> explanation -> worked examples -> misconception correction -> group activity -> retrieval -> summary -> self-assessment -> practicum connection -> summative task with rubric.',
      'Common misconceptions explicitly debunked: small business is failed start-up (Topic 2.1), social enterprise is charity (Topic 2.1), entrepreneurship is only for men (Topic 2.1), only new inventions count as opportunities (Topic 2.2), a good idea is enough to succeed (Topic 2.2).',
      'Activities feasible in local classrooms with chart paper, cards, and peer exchanges.',
    ],
  },
];

const findings = [
  {
    severity: 'uncertain',
    resolved: false,
    message: 'Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: the deployed SHA 366019f8ace647e892523e553b81ab6d1832ec68 differs from HEAD 39ac555fd68079fbe4a9a92440f3408a2fcb7c46 on docs/semester-4/gent-401/unit-02/index.mdx and static/img/figures/gent-401/unit-02/fig-U2-5.webp. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure geometry pass from source.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'Reviewer confirmed source citations: Qamar et al. (2020) was verified in OpenAlex record W3118924195 with diamond open access; Butler (IEA) monograph publication year 2020 was verified; Mellor et al. (2009) is appropriately declared under ## Unverifiable sources for background context only. MCQ keys are distributed across options (A: 1, B: 2, C: 3, D: 4). Assessment alignment and rubrics are verified clean.',
  },
];

const rulings = {
  'D-2026-0001': rulingDigest('.', 'D-2026-0001'),
};

const report = {
  schema_version: 1,
  course_code: 'GENT-401',
  unit_no: 2,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:c512cbeaf5557bb5f1297b9dfbfa4caf2c460bef',
  reviewer_run_id: 'fe6a6335-fbbf-45e2-8c35-6c799b77114d',
  model: 'Gemini 3.8 Flash (Medium)',
  started_at: '2026-11-26T21:16:35.000Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  rulings,
  criteria,
  findings,
  commands,
  evidence_manifest,
};

const reportPath = 'specs/content/gent-401/reviews/unit-02/G3/agy-run1-20261127.json';
writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log('Wrote report to', reportPath);

validateReport('.', report);
console.log('✓ Report validated successfully against review evidence contract.');
