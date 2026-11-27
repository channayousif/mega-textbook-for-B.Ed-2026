import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { rulingDigest, validateReport } from '../../../../../../../scripts/lib/review-evidence.mjs';

const dir = 'specs/content/efpg-402/reviews/unit-03/G3/agy-run1-20261127';
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

const U = 'docs/semester-4/efpg-402/unit-03';
const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:754-763 (Unit 3: Methods and Approaches of Teaching Science, sections 3.1 to 3.7).',
      'specs/content/efpg-402/content-spec.md:193-260 Unit 3 G1 spec: sub-topics U3-01..U3-13, figure plan fig-U3-1..14, banner fig-U3-15, blueprint 10/10/5.',
      `${U}/topic-01.mdx ### Lecture method matches U3-01; ### Discussion method matches U3-02.`,
      `${U}/topic-02.mdx ### Laboratory method matches U3-03; ### Demonstration method matches U3-04.`,
      `${U}/topic-03.mdx ### Scientific method matches U3-05; ### Problem-solving method matches U3-06.`,
      `${U}/topic-04.mdx ### Project method matches U3-07; ### Field-trip method matches U3-08.`,
      `${U}/topic-05.mdx ### Inductive method matches U3-09; ### Deductive method matches U3-10.`,
      `${U}/topic-06.mdx ### Inquiry-based learning matches U3-11; ### Discovery learning matches U3-12.`,
      `${U}/topic-07.mdx ### Experiential and activity-based learning matches U3-13.`,
      'CLO/SLO references SLO:EFPG-402-3-1 and SLO:EFPG-402-3-2 traced across index, topics, and assessment.',
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'specs/content/efpg-402/sources/unit-03.md: bscs-2006-5e (Bybee et al. 2006, BSCS 5E full report) supporting 5E model, direct instruction, laboratory integration, and guided discovery.',
      'specs/content/efpg-402/sources/unit-03.md: ncp-science-2022 (NCC 2023, National Curriculum of Pakistan 2022-23 Science Progression Grid Grades 4-8) supporting scientific enquiry skills and Grade 6 solar oven outcome.',
      'specs/content/efpg-402/sources/unit-03.md: sep-scientific-method (Hepburn & Andersen 2015/2026, Stanford Encyclopedia of Philosophy) supporting Dewey inquiry steps and inductive/deductive reasoning.',
      'specs/content/efpg-402/sources/unit-03.md: prince-felder-2006 (Prince & Felder 2006, JEE) supporting inductive teaching methods, project work, and inquiry/discovery distinctions.',
      'specs/content/efpg-402/sources/unit-03.md: kilpatrick-1918 (Kilpatrick 1918) supporting the project method purposing-planning-executing-judging sequence.',
      'specs/content/efpg-402/sources/unit-03.md: behrendt-franklin-2014 (Behrendt & Franklin 2014) supporting field trip preparation, execution, and follow-up.',
      'specs/content/efpg-402/sources/unit-03.md: banchi-bell-2008 (Banchi & Bell 2008) supporting the four levels of inquiry.',
      'specs/content/efpg-402/sources/unit-03.md: morris-2020-kolb (Morris 2020) supporting Kolb experiential learning cycle.',
      'specs/content/efpg-402/sources/unit-03.md: das-1985 and kochhar-science declared under ## Unverifiable sources with honest scope disclosure (guide-recommended print monographs; title-level support under D-2026-0001; unit accounts grounded in bound sources).',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/efpg-402/coverage/unit-03.md maps all thirteen sub-topics U3-01..U3-13 to exact topic headings with bound sources.',
      'check:depth-gate exit 0: concept coverage, required pedagogical blocks (classroom situation, explanation, worked examples, misconceptions, activity, retrieval, summary, self-assessment, practicum, summative task with rubric), formative floor, reading-minutes band (54-79 reading-min budget), coverage-sources consistency.',
      'specs/content/efpg-402/concepts/unit-03.md defines 10 core concepts (CON:EFPG-402-3-1..10) with prerequisites, SLO mappings, and assessment links.',
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      `${dir}/assessment-solutions.md: independent solve of MCQs 1-10 (B, C, C, A, C, B, C, B, C, C) matches ${U}/unit-assessment.mdx ### MCQ answer key 10/10.`,
      'RRQs 1-10 derived answers verified against model answers and mark schemes; Bloom demand ranges Understand to Analyze.',
      'ERQs 1-5 feature analytic rubrics with explicit higher-order cognitive demand (Analyze, Evaluate, Create); ERQ 5 is blueprint integrative method selection and defense item.',
      'check:no-answer-keys exit 0: answer keys and marking guidance strictly quarantined within bounded final section.',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'render-review unavailable (exit 1): deployed SHA 0cbed86bb96f7a6a03420ad3e5d726a47e8f5513 differs from HEAD 956c4ba9149ccc34e41e7d1dc31c624f7709d1b6 on docs/semester-4/efpg-402/unit-03/index.mdx and static/img/figures/efpg-402/unit-03/fig-U3-15.webp; host limits and brief prohibit local build, dev server, or browser runs.',
      'Structural accessibility passes from source: all figures have descriptive alt text; all SVGs carry role="img", aria-labelledby, <title>, and <desc>; semantic headings and table markup verified.',
      'measure-figure-text exits 0 across all 28 SVGs in static/img/figures/efpg-402/unit-03/.',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      `${U}/index.mdx, topic-01.mdx through topic-07.mdx, unit-assessment.mdx: clear, plain sentences suitable for B.Ed trainees without specialist prerequisite knowledge.`,
      'Technical terms defined on first use with clear explanations and reinforced across topics.',
      'Contextualized with authentic Pakistani and Sindhi classroom scenarios (Sukkur, Shaheed Benazirabad, Khairpur, Badin, Jacobabad, Dadu, Sanghar).',
      'check:no-em-dash exit 0: zero em dashes in authored content.',
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'All seven topics execute complete pedagogical progression: classroom situation -> explanation -> worked examples -> misconception correction -> collaborative activity -> retrieval -> summary -> self-assessment -> practicum connection -> summative task.',
      'Common misconceptions explicitly debunked: activity-based learning means no teacher input (Topic 3.7), lecture method is always bad (Topic 3.1), discovery learning works without guidance (Topic 3.6).',
      'Activities feasible in local classrooms with low-cost materials (turmeric, candle, glass jar, seeds, cards, torches).',
    ],
  },
];

const findings = [
  {
    severity: 'uncertain',
    resolved: false,
    message: 'Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: the deployed SHA 0cbed86bb96f7a6a03420ad3e5d726a47e8f5513 differs from HEAD 956c4ba9149ccc34e41e7d1dc31c624f7709d1b6 on docs/semester-4/efpg-402/unit-03/index.mdx and static/img/figures/efpg-402/unit-03/fig-U3-15.webp. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure geometry pass from source.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'Reviewer confirmed source citations: BSCS 5E (Bybee et al. 2006), NCP Science 2022-23, SEP Scientific Method, Prince & Felder (2006), Kilpatrick (1918), Behrendt & Franklin (2014), Banchi & Bell (2008), Morris (2020) verified in open access / bound excerpts; Das (1985) and Kochhar appropriately declared under ## Unverifiable sources for background context only. MCQ keys are distributed across options (A: 1, B: 3, C: 6). Assessment alignment and rubrics are verified clean.',
  },
];

const rulings = {
  'D-2026-0001': rulingDigest('.', 'D-2026-0001'),
};

const report = {
  schema_version: 1,
  course_code: 'EFPG-402',
  unit_no: 3,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:8b58f672de81406058d75f3bc7d1557cfeef44cf',
  reviewer_run_id: '3043d3cb-2c9a-4666-bb72-3769cdb90044',
  model: 'Gemini 3.8 Flash (Medium)',
  started_at: '2026-11-27T15:19:33.000Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  rulings,
  criteria,
  findings,
  commands,
  evidence_manifest,
};

const reportPath = 'specs/content/efpg-402/reviews/unit-03/G3/3043d3cb-2c9a-4666-bb72-3769cdb90044.json';
writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log('Wrote report to', reportPath);

validateReport('.', report);
console.log('✓ Report validated successfully against review evidence contract.');
