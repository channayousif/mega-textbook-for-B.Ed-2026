import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { rulingDigest, validateReport } from '../../../../../../../scripts/lib/review-evidence.mjs';

const dir = 'specs/content/gict-300/reviews/unit-01/G3/agy-cycle2-20261127';
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
  { name: 'measure-figure-text', exit_code: 1, log_path: `${dir}/logs/measure-figure-text.log` },
];

const U = 'docs/semester-1/gict-300/unit-01';
const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'specs/content/gict-300/content-spec.md:52-115 Unit 1 G1 spec: sub-topics U1-01..U1-08, figure plan fig-U1-1..8, banner fig-U1-9, illustrations fig-U1-10..13, unit-end blueprint 10/10/5.',
      `${U}/topic-01.mdx ### Concept and scope of computer literacy matches U1-01.`,
      `${U}/topic-01.mdx ### Importance of ICT in education, work, and everyday life matches U1-02.`,
      `${U}/topic-02.mdx ### Historical evolution of computers: from abacus to modern smartphones matches U1-03.`,
      `${U}/topic-02.mdx ### Generations of computers: first to fifth generations and their core technologies matches U1-04.`,
      `${U}/topic-03.mdx ### Classification by functionality: analog, digital, and hybrid computers matches U1-05.`,
      `${U}/topic-03.mdx ### Classification by size and power: supercomputers, mainframes, minicomputers, microcomputers, embedded systems matches U1-06.`,
      `${U}/topic-04.mdx ### Impact of computers and the internet on society: communication, education, commerce, social challenges matches U1-07.`,
      `${U}/topic-04.mdx ### Applications of ICT across fields: health, agriculture, banking, government, and industry matches U1-08.`,
      'CLO/SLO references SLO:GICT-300-1-1 and SLO:GICT-300-1-2 traced across index, topics, and assessment.',
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'specs/content/gict-300/sources/unit-01.md: DigComp 2.2 (Vuorikari et al. 2022) verified via Crossref DOI https://doi.org/10.2760/115376, supporting the five areas of digital competence (U1-01).',
      'specs/content/gict-300/sources/unit-01.md: Bourgeois et al. (2019) OpenAlex verified (W2561598203) with bound excerpt in sources/texts/bourgeois2019.md, supporting technology-people-process (U1-01), digital divide (U1-07), ICT across fields (U1-08). F1 repair verified in topic-04.mdx:49-55 (gender over-attribution removed).',
      'specs/content/gict-300/sources/unit-01.md: UNESCO (2018) ICT Competency Framework for Teachers (Version 3) supporting ICT in education and levels of teacher development (U1-02, U1-08).',
      'specs/content/gict-300/sources/unit-01.md: Khan Academy beginner computing course supporting computer concepts and history (U1-03).',
      'specs/content/gict-300/sources/unit-01.md: Pakistan Telecommunication Authority (2025) indicators supporting Pakistan broadband/cellular metrics (U1-02, U1-07).',
      'specs/content/gict-300/sources/unit-01.md: Guide-required sources Shelly & Vermaat (U1-04, U1-06) and Norton (U1-05) declared honestly at title level per D-2026-0001; HEC guidelines declared and cited in topic-01.mdx Further reading (F3 repair verified).',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/gict-300/coverage/unit-01.md maps all eight sub-topics U1-01..U1-08 to exact topic headings with bound sources; reinforces U1-01, U1-04, U1-05, U1-07 in assessment.',
      'check:depth-gate exit 0: concept coverage, required pedagogical blocks (hook, explanation, worked example, misconceptions, activity, retrieval, summary, self-assessment, practicum, summative task with rubric), formative floor, reading-minutes band (82 reading-min within 65-95 budget), coverage-sources consistency.',
      'specs/content/gict-300/concepts/unit-01.md defines 8 core concepts (CON:GICT-300-1-1..8) with prerequisites, SLO mappings, and assessment links.',
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      `${dir}/assessment-solutions.md: independent solve of MCQs 1-10 (b, b, d, b, c, b, c, b, b, c) matches ${U}/unit-assessment.mdx ### MCQ answer key 10/10.`,
      'RRQs 1-10 derived answers verified against model answers and mark schemes; Bloom demand ranges Understand to Analyze.',
      'ERQs 1-5 feature analytic rubrics (total 10 marks each) matching Bloom cognitive demand Analyze and Evaluate; ERQ 4 is blueprint ICT impact analysis item; ERQ 5 is blueprint integrative teacher computer literacy evaluation.',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'render-review unavailable (exit 1): deployed SHA 366019f8ace647e892523e553b81ab6d1832ec68 differs from HEAD 3f8e0bc3be6797f26f24d983ae41477ca94f475b on 5 MDX files and 5 WebP illustrations (fig-U1-9 through fig-U1-13); host limits and brief prohibit local build, dev server, or browser runs.',
      'Structural accessibility passes from source: all figures have descriptive alt text; all SVGs carry role="img", aria-labelledby, <title>, and <desc>; semantic headings and table markup verified.',
      'F2 repair verified in fig-U1-6.svg and fig-U1-6.dark.svg: axis label anchored at x=768 text-anchor="end", no clipping beyond viewBox.',
      'measure-figure-text reports 12 text contrast warnings on fig-U1-3.dark.svg and fig-U1-3.ur.dark.svg secondary timeline dates (1.41:1 vs 1.6:1 threshold); recorded as advisory finding.',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      `${U}/index.mdx, topic-01..04.mdx, unit-assessment.mdx, unit-teacher-notes.mdx: clear, plain sentences suitable for B.Ed trainees without specialist prerequisite knowledge.`,
      'Key terms defined at first use with Glossary components (Computer literacy, ICT, Stored-program, Analog computer, Digital computer, Hybrid computer, Supercomputer, Mainframe, Minicomputer, Microcomputer, Embedded computer, Digital divide).',
      'Contextualized with authentic Pakistani and Sindhi classroom scenarios (Karachi, Hyderabad, Sukkur, Matiari).',
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'All four topics execute complete pedagogical progression: classroom situation -> explanation -> worked examples -> misconception correction -> group activity -> retrieval -> summary -> self-assessment -> practicum connection -> summative task with rubric.',
      'Common misconceptions explicitly debunked: computer literacy is only typing (Topic 1.1), phone use equals computer literacy (Topic 1.1), computers have always been electronic (Topic 1.2), size determines computer power (Topic 1.3), technology solves all educational challenges automatically (Topic 1.4).',
      'Activities feasible in local classrooms with slates, cards, peer exchanges, and school observation.',
    ],
  },
];

const findings = [
  {
    id: 'F1',
    severity: 'blocking',
    resolved: true,
    message: 'Run 001 finding, verified repaired: topic-04.mdx over-attributed a "gender" dimension of the digital divide to Bourgeois and colleagues (2019), which the bound chapter 11 excerpt does not contain. Current bytes read "the divide runs along income, geography, education and age lines", exactly matching the bound source excerpt.',
    location: 'docs/semester-1/gict-300/unit-01/topic-04.mdx:52-53',
  },
  {
    id: 'F2',
    severity: 'blocking',
    resolved: true,
    message: 'Run 001 finding, verified repaired: fig-U1-6 light and dark variants clipped the bottom-right axis label "more specialised" past the 780-unit viewBox. Current bytes anchor the label at x=768 text-anchor="end" in both variants; verified no viewBox overflow.',
    location: 'static/img/figures/gict-300/unit-01/fig-U1-6.svg and fig-U1-6.dark.svg',
  },
  {
    id: 'F3',
    severity: 'advisory',
    resolved: true,
    message: 'Run 001 finding, verified repaired: hecICT was cited in topic-01 prose but appeared in no Further reading list. The HEC guidelines citation is now present in topic-01.mdx ## Further reading; all 8 source keys are cited both in prose and in a per-topic Further reading section.',
    location: 'docs/semester-1/gict-300/unit-01/topic-01.mdx ## Further reading',
  },
  {
    id: 'F4',
    severity: 'advisory',
    resolved: true,
    message: 'Run 001 finding, verified repaired: sources file overstated what the bound bourgeois2019 excerpt supports for history sub-topics (U1-03). The current sources file states honestly that no bound excerpt carries the history account and that the history prose rests on the guide outline and general knowledge, disclosed; U1-03 mapping is clean.',
    location: 'specs/content/gict-300/sources/unit-01.md and specs/content/gict-300/coverage/unit-01.md',
  },
  {
    id: 'F5',
    severity: 'advisory',
    resolved: false,
    message: 'Carried unresolved from run 001: Further reading citation links render as bare URLs as the link text on all four topic pages (e.g. https://doi.org/10.2760/115376). Descriptive link text would serve screen-reader users better; the current repo convention for citation lists accepts bare URLs, so this remains advisory and does not block.',
    location: 'docs/semester-1/gict-300/unit-01/topic-01..04.mdx ## Further reading',
  },
  {
    id: 'F6',
    severity: 'uncertain',
    resolved: false,
    message: 'Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: the deployed SHA 366019f8ace647e892523e553b81ab6d1832ec68 differs from HEAD 3f8e0bc3be6797f26f24d983ae41477ca94f475b on 10 files (5 MDX files and 5 WebP illustrations: fig-U1-9 through fig-U1-13). render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility passes from source.',
    location: 'docs/semester-1/gict-300/unit-01/ and static/img/figures/gict-300/unit-01/',
  },
  {
    id: 'F7',
    severity: 'advisory',
    resolved: false,
    message: 'In static/img/figures/gict-300/unit-01/fig-U1-3.dark.svg and fig-U1-3.ur.dark.svg, secondary timeline date labels "(ancient)", "(1600s)", etc. have 1.41:1 contrast against .panel fill (threshold is 1.6:1 in measure-figure-text.mjs). Advisory observation; does not block check:figures or primary timeline comprehension.',
    location: 'static/img/figures/gict-300/unit-01/fig-U1-3.dark.svg and fig-U1-3.ur.dark.svg',
  },
];

const rulings = {
  'D-2026-0001': rulingDigest('.', 'D-2026-0001'),
  'D-2026-0030': rulingDigest('.', 'D-2026-0030'),
};

const report = {
  schema_version: 1,
  course_code: 'GICT-300',
  unit_no: 1,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:fff432dd569f4713da4121bf3a681cbb470d07fa',
  reviewer_run_id: '28741b13-4cb9-4d34-886d-5c11b6edf8a3',
  model: 'Gemini 3.8 Flash (Medium)',
  started_at: '2026-11-27T05:01:46.000Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  rulings,
  criteria,
  findings,
  commands,
  evidence_manifest,
};

const reportPath = 'specs/content/gict-300/reviews/unit-01/G3/agy-cycle2-20261127.json';
writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log('Wrote report to', reportPath);

validateReport('.', report);
console.log('✓ Report validated successfully against review evidence contract.');
