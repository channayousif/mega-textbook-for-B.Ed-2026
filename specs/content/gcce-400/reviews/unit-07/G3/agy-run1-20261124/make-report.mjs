import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { rulingDigest } from '../../../../../../../scripts/lib/review-evidence.mjs';

const dir = 'specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124';
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

const U = 'docs/semester-4/gcce-400/unit-07';
const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'specs/content/gcce-400/content-spec.md:374-428 Unit 7 G1 spec: sub-topics U7-01..U7-04, figure plan fig-U7-1..8, banner fig-U7-9, unit-end blueprint 10/10/5.',
      `${U}/topic-01.mdx ### Understanding diversity in society & ### Diversity and national unity match U7-01.`,
      `${U}/topic-02.mdx ### Youth, women and minorities in social development matches U7-02.`,
      `${U}/topic-03.mdx ### Forms of social inequality in Pakistan & ### Responding to injustice: from noticing to action match U7-03.`,
      `${U}/topic-04.mdx ### Inclusive citizenship and equal rights matches U7-04.`,
      'CLO/SLO references SLO:GCCE-400-7-1, 7-2, 7-3, 7-4 traced across all unit topics and assessments.',
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'specs/content/gcce-400/sources/texts/openstax-sociology-3e: Chapter 11.1 (race as physical marker, ethnicity as shared culture, Wirth minority group definition) and Chapter 21.2 (social movement definition, four stages) match topic-01.mdx:36 and topic-03.mdx:58.',
      'specs/content/gcce-400/sources/texts/constitution-pakistan.md: Articles 16, 19, 25, 25A, 26, 27, 28, 33, 34, 36, 37, 38 read in current text with amendment notes, accurately matching topic-01.mdx:62, topic-02.mdx:40-42, topic-03.mdx:40,67,68, topic-04.mdx:38,44.',
      'specs/content/gcce-400/sources/texts/unesco-2015-gced: Learner attribute of being socially connected and respectful of diversity (pp. 23-24) and global community belonging (p. 14) match topic-02.mdx and topic-04.mdx:50.',
      'specs/content/gcce-400/sources/texts/pbs-census-2023.md: Table 11 (mother tongues: Punjabi 37%, Pashto 18%, Sindhi 14%, Saraiki 12%, Urdu 9%), Table 4.2 (provincial population), Table 4.13 (religion 96% Muslim), Section 4.2.2 (age 15-24 18.56%), Table 4.21 & Section 3.9 (literacy 68.00% male, 52.84% female), Section 4.6.2 (out-of-school 35.60%), Section 4.7 (employment 38.57%) match topic-01.mdx:40-43, topic-02.mdx:38-40, topic-03.mdx:40-43.',
      'specs/content/gcce-400/sources/unit-07.md ## Unverifiable sources: kymlicka-norman-2000 and youniss-levine-2009 declared under Owner Ruling 2026-09-19 (D-2026-0001); topic-01.mdx, topic-02.mdx, topic-04.mdx cite only general volume themes without uncorroborated quotations.',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/gcce-400/coverage/unit-07.md maps all four sub-topics U7-01..U7-04 to exact topic headings with bound sources; design trace details retrieval items, MCQs, RRQs, and ERQs.',
      'check:depth-gate exit 0: concept coverage, required pedagogical blocks (hook, explanation, worked example, misconceptions, activity, retrieval, summary, self-assessment, practicum, summative task with rubric), formative floor, reading-minutes band (59 min vs 44-64 min band), coverage-sources consistency.',
      'specs/content/gcce-400/concepts/unit-07.md defines 11 core concepts (CON:GCCE-400-7-1..11) with prerequisites, SLO mappings, and assessment links.',
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      `${dir}/assessment-solutions.md: independent solve of MCQs 1-10 (B, B, C, A, B, B, A, B, D, B) matches ${U}/unit-assessment.mdx ### MCQ answer key 10/10.`,
      'RRQs 1-10 derived answers verified against model answers and point-based mark schemes; Bloom demand ranges Understand to Analyze.',
      'ERQs 1-5 feature 4-criterion analytic rubrics (0-3 marks per criterion, 12 marks total each) matching Bloom cognitive demand (Analyze, Create, Evaluate); ERQ 4 is blueprint practicum Create task designing an inclusive classroom routine.',
      'Advisory finding noted in assessment-solutions.md regarding MCQ key distribution (Option B represents 6 out of 10 items).',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'render-review unavailable (exit 1): deployed SHA 5a3deb303255eb4c6bd11d331722b8efac16cbca differs from HEAD 88e07887c472884f65e99b9729b8073a3ff99f10 on docs/semester-4/gcce-400/unit-07/index.mdx and static/img/figures/gcce-400/unit-07/fig-U7-9.webp; host limits and brief prohibit local build, dev server, or browser runs.',
      'Structural accessibility passes from source: all 9 figures have descriptive alt text; all SVGs carry role="img", aria-labelledby, <title>, and <desc>; semantic headings and table markup verified.',
      'measure-figure-text exits 0 across all 32 SVGs in static/img/figures/gcce-400/unit-07/.',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      `${U}/index.mdx, topic-01.mdx, topic-02.mdx, topic-03.mdx, topic-04.mdx: clear, plain sentences suitable for B.Ed trainees without specialist prerequisite knowledge.`,
      'Key terms (Diversity, Race, Ethnicity, Minority group, Social development, Social inequality, Injustice, Social movement, Inclusive citizenship, Equality, Equity) explicitly defined at first use with Glossary components.',
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'Constructivist learning progression from authentic Sindhi classroom situations (Sukkur, Hyderabad, Larkana) to structured explanations, worked examples, group activities, retrieval checks, and practicum school applications.',
      'Four explicit misconception corrections: diversity as threat to unity (topic-01), minority rights as favour (topic-02), inequality vs personal trouble (topic-03), and identical treatment as equality (topic-04).',
      'Realistic, low-cost group activities (dimension mapping, participation audit, next step audit, inclusive routine design) and community storytelling practical work in unit-teacher-notes.mdx.',
    ],
  },
];

const findings = [
  {
    severity: 'uncertain',
    message: 'Render and print inspection (360px viewport, table horizontal scrolling, desktop layout, A4 print layout, figure clipping) could not be performed against the production site. The crew brief prohibits npm run build, a dev server, and Playwright on this host, and the live production site does not match candidate inputs: deployed SHA 5a3deb303255eb4c6bd11d331722b8efac16cbca differs from HEAD 88e07887c472884f65e99b9729b8073a3ff99f10 on docs/semester-4/gcce-400/unit-07/index.mdx and static/img/figures/gcce-400/unit-07/fig-U7-9.webp. In accordance with brief instructions, render-review is recorded as unavailable (exit code 1). Visual accessibility remains unverified; structural accessibility and SVG figure text geometry pass from source.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message: 'In docs/semester-4/gcce-400/unit-07/unit-assessment.mdx:36-85, the correct MCQ keys are distributed as A: 2, B: 6, C: 1, D: 1. Key B represents 60% of correct items. While each item and distractor is unambiguous and factually correct, balancing correct options across all keys is recommended in future test bank updates.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message: 'In docs/semester-4/gcce-400/unit-07/topic-02.mdx:40, the text cites "(Pakistan Bureau of Statistics, 2023, Table 3.3)" for literacy statistics (68.00% male, 52.84% female). Table 4.21 is the detailed literacy table in the report. Both tables state the exact same values; cross-referencing Table 4.21 would provide direct alignment with Section 4.6.1.',
    resolved: false,
  },
];

const report = {
  schema_version: 1,
  course_code: 'GCCE-400',
  unit_no: 7,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:9653c4b17e8627ed74b004f30f1329642948a361',
  reviewer_run_id: '69dbefcd-add9-49b2-af6f-84aa5f9ee0b6',
  model: 'Gemini 3.8 Flash (Medium)',
  started_at: '2026-11-24T03:01:42.000Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  rulings: {
    'D-2026-0001': rulingDigest('.', 'D-2026-0001'),
  },
  criteria,
  findings,
  commands,
  evidence_manifest,
};

const reportPath = 'specs/content/gcce-400/reviews/unit-07/G3/agy-run1-20261124.json';
writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(`Wrote validated report to ${reportPath}`);
