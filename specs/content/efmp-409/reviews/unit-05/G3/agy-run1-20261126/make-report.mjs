import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { rulingDigest, validateReport } from '../../../../../../../scripts/lib/review-evidence.mjs';

const dir = 'specs/content/efmp-409/reviews/unit-05/G3/agy-run1-20261126';
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

const U = 'docs/semester-4/efmp-409/unit-05';
const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'specs/content/efmp-409/content-spec.md:318-369 Unit 5 G1 spec: sub-topics U5-01..U5-09, figure plan fig-U5-1..6, banner fig-U5-7, blueprint 10/10/5.',
      'Scheme-and-Course-guides/extracted-text/course-guides-2025/FoundationsEd_Sept13.txt: Unit 5 Education Reports and Policies allocates topics on difference between reports and policies, framing, launch and application, factors hindering application, Sharif Commission 1959, 1978-80 policy review, 1998-2010 policy main points and analysis, and need for a new policy.',
      `${U}/topic-01.mdx ### The difference between reports and policies matches U5-01.`,
      `${U}/topic-01.mdx ### How reports and policies are framed matches U5-02.`,
      `${U}/topic-01.mdx ### How reports and policies are launched and applied matches U5-03.`,
      `${U}/topic-02.mdx ### Factors that hinder the application of reports and policies matches U5-04.`,
      `${U}/topic-02.mdx ### The main points of the Sharif Commission (1959) matches U5-05.`,
      `${U}/topic-02.mdx ### A critical review of the 1978-80 policy (National Education Policy 1979) matches U5-06.`,
      `${U}/topic-03.mdx ### The main points of the 1998-2010 policy matches U5-07.`,
      `${U}/topic-03.mdx ### An analysis of the 1998-2010 policy matches U5-08.`,
      `${U}/topic-03.mdx ### Is there any need for a new policy? matches U5-09.`,
      'CLO/SLO references SLO:EFMP-409-5-1, SLO:EFMP-409-5-2, and SLO:EFMP-409-5-3 traced across index, topics, and assessment.',
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'specs/content/efmp-409/sources/texts/pie-1959-commission.md: Report of the Commission on National Education (Sharif Commission) 1959.',
      'specs/content/efmp-409/sources/texts/pie-1979-policy.md: National Education Policy and Implementation Programme 1979.',
      'specs/content/efmp-409/sources/texts/pie-1998-policy.md: National Education Policy 1998-2010.',
      'specs/content/efmp-409/sources/texts/saiyid-nihcr.md: Saiyid (1987) An evaluation of the Sharif, Hamoodur Rehman and Nur Khan reports on education in Pakistan.',
      'specs/content/efmp-409/sources/texts/inverge-2025-punjab.md: Bukhari et al. (2025) Analysing the impact of education policies and their implementation in Punjab.',
      'specs/content/efmp-409/sources/texts/wb-wdi-2026.md: World Bank World Development Indicators for Pakistan adult literacy and gross primary enrolment (2000-2012).',
      'specs/content/efmp-409/sources/texts/nep-2009.md: National Education Policy 2009 Ministry of Education.',
      'specs/content/efmp-409/sources/unit-05.md: All external sources verified and bound; no unverifiable sources declared.',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/efmp-409/coverage/unit-05.md: Maps all nine subtopics U5-01..U5-09 to exact headings with bound sources; design trace details retrieval items, MCQs, RRQs, and ERQs.',
      'check:depth-gate exit 0: concept coverage, required pedagogical blocks (classroom situation, explanation, worked example, misconceptions, activity, retrieval, summary, self-assessment, practicum, summative task with rubric), formative floor, reading-minutes band (62 min vs 46-62 min band), coverage-sources consistency.',
      'specs/content/efmp-409/concepts/unit-05.md: Defines 9 core concepts (CON:EFMP-409-5-1..9) with prerequisites, SLO mappings, and assessment links.',
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      `${dir}/assessment-solutions.md: Independent solve of MCQs 1-10 (B, B, A, B, B, C, A, A, A, B) matches ${U}/unit-assessment.mdx:113-122 10/10.`,
      'MCQ topic spread across Topic 5.1 (4 items), Topic 5.2 (3 items), and Topic 5.3 (3 items); RRQ topic spread 3/3/4 matching syllabus balance.',
      'RRQs 1-10 derived answers verified against model answers and marking criteria; cognitive demand ranges Understand to Analyze.',
      'ERQs 1-5 feature analytic rubrics with Bloom demand Analyze to Evaluate; ERQ 5 is approved blueprint item evaluating 1998-2010 policy targets using bound source evidence.',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'render-review unavailable (exit 1): deployed SHA 074ab11456b999cf5d3c9b8aa6e603b2de834eb5 differs from HEAD d73f4d36b1c7e077c14e6e3487095ba525ba3151 on docs/semester-4/efmp-409/unit-05/index.mdx and static/img/figures/efmp-409/unit-05/fig-U5-7.webp; host limits and brief prohibit local build, dev server, or browser runs.',
      'Structural accessibility passes from source: all figures have descriptive alt text; all SVGs carry role="img", aria-labelledby, <title>, and <desc>; semantic headings and table markup verified.',
      'measure-figure-text exits 0 across all 12 SVGs in static/img/figures/efmp-409/unit-05/.',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      `${U}/index.mdx, topic-01.mdx, topic-02.mdx, topic-03.mdx: clear, plain prose suitable for B.Ed trainees without specialist background.`,
      'Core concepts defined at first use with bold text (education report, education policy, terms of reference, implementation, Sharif Commission, National Education Policy).',
      'Grounded in realistic Pakistani classroom contexts across Sindh (Khairpur, Sukkur, Larkana, Sanghar).',
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'All topics execute complete pedagogical progression: classroom situation -> explanation -> worked example -> misconception correction -> group activity -> retrieval -> summary -> self-assessment -> practicum connection -> summative task with rubric.',
      'Common misconceptions explicitly addressed: a report and a policy are the same document (Topic 5.1), a policy is written by one minister in a room (Topic 5.1), launching a policy means the job is done (Topic 5.1), policies fail only because of too little money (Topic 5.2), the Sharif Commission was only about higher education (Topic 5.2), the 1979 policy failed because it was religious (Topic 5.2), the 1998-2010 policy was only about primary education (Topic 5.3), a new policy will solve problems the old one could not (Topic 5.3), if a policy fails the answer is to try harder with the same approach (Topic 5.3).',
      'Policy and commission documents handled with historical objectivity, professional focus, and empirical implementation perspective.',
    ],
  },
];

const findings = [
  {
    severity: 'uncertain',
    resolved: false,
    message: 'Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: the deployed SHA 074ab11456b999cf5d3c9b8aa6e603b2de834eb5 differs from HEAD d73f4d36b1c7e077c14e6e3487095ba525ba3151 on docs/semester-4/efmp-409/unit-05/index.mdx and static/img/figures/efmp-409/unit-05/fig-U5-7.webp. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure geometry pass from source.',
  },
];

const rulings = {
  'D-2026-0001': rulingDigest('.', 'D-2026-0001'),
};

const report = {
  schema_version: 1,
  course_code: 'EFMP-409',
  unit_no: 5,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:1e0656c0a341cf98a2483dbcd9fd410a7989e79d',
  reviewer_run_id: '56fb947e-154e-4226-be00-5f2af2f8676a',
  model: 'Gemini 3.8 Flash (Medium)',
  started_at: '2026-11-26T05:21:31.000Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  rulings,
  criteria,
  findings,
  commands,
  evidence_manifest,
};

const reportPath = 'specs/content/efmp-409/reviews/unit-05/G3/agy-run1-20261126.json';
writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(`Wrote report to ${reportPath} with ${Object.keys(evidence_manifest).length} evidence files.`);

validateReport('.', report);
console.log('Report successfully validated against review evidence contract.');
