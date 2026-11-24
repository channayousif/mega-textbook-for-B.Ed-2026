import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { rulingDigest } from '../../../../../../../scripts/lib/review-evidence.mjs';

const dir = 'specs/content/gcce-400/reviews/unit-04/G3/agy-cycle2-20261124';
const manifest = JSON.parse(readFileSync(`${dir}/manifest.json`, 'utf8'));
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

const evidenceFiles = [
  `${dir}/manifest.json`,
  `${dir}/prior-findings.md`,
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

const U = 'docs/semester-4/gcce-400/unit-04';
const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'specs/content/gcce-400/content-spec.md:233-279 Unit 4 G1 spec: sub-topics U4-01..U4-07, figure plan fig-U4-1..5, unit-end blueprint 10/10/5.',
      `${U}/topic-01.mdx ### Accountability, ### Non-violence, ### Ethical considerations in civic engagement; ${U}/topic-02.mdx four ### headings match U4-04..U4-07 verbatim.`,
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'specs/content/gcce-400/sources/texts/hasan-2006-orangi.md: 1.2 million, 1.5 per cent, 1980, 1988, 5,479 lanes, 98,527 houses, Rs 90m vs Rs 630m, IMR 128 to 37, 1994 SKAA, 248 locations, 2004 nalas group all match topic-02.mdx and fig-U4-5 alt text.',
      'specs/content/gcce-400/sources/texts/retallick-2005-smc.md: 15 members, teachers ineligible, monthly, two paid teachers, home visits, punctuality checks, four mechanisms match topic-02.mdx School management committees paragraph.',
      'macqueen-2001-community.md, unesco-2015-gced.md (pp. 23-24), bala-2013-khudai-khidmatgar.md (abstract), oecd-2011-social-cohesion.md: unit claims stay within the notes.',
      'Articles 16, 19, 25 of the Constitution of Pakistan (2012) accurately paraphrased in topic-01.mdx; no 26th/27th Amendment modification applies.',
      'specs/content/gcce-400/sources/unit-04.md ## Unverifiable sources: youniss-levine-2009 declared under owner ruling 2026-09-19 (D-2026-0001); topic-02.mdx uses it only for title-level general idea.',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/gcce-400/coverage/unit-04.md maps all seven sub-topics to exact headings with bound sources; design trace names retrieval items and assessment items per sub-topic.',
      'check:depth-gate exit 0 (concept coverage, required pedagogical blocks, formative floor, reading-minutes band, coverage-sources consistency).',
      'specs/content/gcce-400/concepts/unit-04.md defines core concepts with SLO mappings and assessment links.',
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      `${dir}/assessment-solutions.md: independent solve of MCQs 1-10 (B,C,B,C,D,C,B,B,A,C) matches ${U}/unit-assessment.mdx ### MCQ answer key.`,
      `${U}/topic-02.mdx:71-74 IAP2 Collaborate example reworded to shared recommendation and explicit sentence added that agency still decides at Involve and Collaborate, fully teaching RRQ 6 model similarity.`,
      'MCQ option balance A:1, B:4, C:4, D:1; MCQ 5 retagged Apply; ERQ 4 rubric accepts "inform, at most a token consult". ERQ rubrics analytic, totals 10/10/12/10/14; ERQ 5 is blueprint Create item.',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'render-review unavailable (exit 1): deployed SHA ac3d5e2fcd1818492dd11bc9b72d8cfed9a25e8d differs from HEAD 175a90b7a644bd366cf3d1d2592090a93f912bcb on unit English files; host limits and brief prohibit local build, dev server, or browser runs.',
      'Structural checks pass from source: every Figure has descriptive alt text; all SVGs carry role="img", aria-labelledby, <title>, and <desc>.',
      'measure-figure-text exits 0 across all 20 SVGs in static/img/figures/gcce-400/unit-04/.',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      `${U}/topic-01.mdx and topic-02.mdx: short sentences, terms defined at first use with Glossary components, Sindh and Pakistani contextualization (Sukkur, Thatta, Orangi).`,
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'Both topics run classroom situation, explanation, worked examples, misconception corrections, group activity, retrieval, summary, self-assessment, practicum task, summative task with mini-rubric.',
      'All three content-spec misconceptions addressed in topic-02.mdx; activities use chart paper and slips, feasible in Sindh classrooms.',
    ],
  },
];

const findings = [
  {
    severity: 'uncertain',
    resolved: false,
    message: 'Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: the deployed SHA ac3d5e2fcd1818492dd11bc9b72d8cfed9a25e8d differs from HEAD 175a90b7a644bd366cf3d1d2592090a93f912bcb on docs/semester-4/gcce-400/unit-04/topic-01.mdx, topic-02.mdx, and unit-assessment.mdx. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure geometry pass from source.',
  },
];

const rulings = {
  'D-2026-0001': rulingDigest('.', 'D-2026-0001'),
};

const report = {
  schema_version: 1,
  course_code: 'GCCE-400',
  unit_no: 4,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:1cfa8056c4c315af0d7abc4fc88f25b40db8ad56',
  reviewer_run_id: 'fa4c0502-c180-4c3e-8532-b789e0a94d5a',
  model: 'Gemini 3.8 Flash (Medium)',
  started_at: '2026-11-23T23:30:54.000Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  rulings,
  criteria,
  findings,
  commands,
  evidence_manifest,
};

writeFileSync('specs/content/gcce-400/reviews/unit-04/G3/agy-cycle2-20261124.json', JSON.stringify(report, null, 2) + '\n');
console.log('Wrote report to specs/content/gcce-400/reviews/unit-04/G3/agy-cycle2-20261124.json with', Object.keys(evidence_manifest).length, 'evidence files.');
