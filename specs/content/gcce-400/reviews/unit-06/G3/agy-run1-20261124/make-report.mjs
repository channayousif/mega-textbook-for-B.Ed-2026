import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { rulingDigest } from '../../../../../../../scripts/lib/review-evidence.mjs';

const dir = 'specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124';
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

const U = 'docs/semester-4/gcce-400/unit-06';
const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'specs/content/gcce-400/content-spec.md:327-372 Unit 6 G1 spec: sub-topics U6-01..U6-03, figure plan fig-U6-1..6, banner fig-U6-7, unit-end blueprint 10/10/5.',
      `${U}/topic-01.mdx ### The use of digital platforms for civic engagement matches U6-01.`,
      `${U}/topic-02.mdx ### Cyber ethics and responsible use of social media matches U6-02.`,
      `${U}/topic-03.mdx ### Digital divides and their impact on citizenship matches U6-03.`,
      'CLO/SLO references SLO:GCCE-400-6-1, 6-2, 6-3 traced across all unit topics and assessments.',
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'specs/content/gcce-400/sources/texts/coe-2019-dce.md: Digital citizen definition p. 11 ("actively, positively and responsibly engage in both on- and offline communities"), ten domains, ethics and empathy p. 13 match topic-01.mdx:36 and topic-02.mdx:34.',
      'specs/content/gcce-400/sources/texts/khalid-2026-social-media-civic.md: 384 university students, social media usage predicts civic engagement, digital literacy mediation, dual effect of connectivity and echo chambers match topic-01.mdx:63 and topic-03.mdx:37.',
      'specs/content/gcce-400/sources/texts/constitution-pakistan.md: Articles 17 and 19 (freedom of association and freedom of speech subject to reasonable legal limits) match topic-01.mdx:46.',
      'specs/content/gcce-400/sources/texts/ali-2023-misinformation.md: RCT in urban Pakistan, low digital literacy, general video messages no significant effect, personalized feedback +0.14 SD improvement match topic-02.mdx:46.',
      'specs/content/gcce-400/sources/texts/shair-2022-digital-divide.md & publisher abstract: PSLM-HIES survey, logit model, ICT infrastructure and access as leading determinants, sizeable digital divide, Pakistan ranked 135 out of 144 in internet access match topic-03.mdx:41.',
      'specs/content/gcce-400/sources/texts/iftikhar-2023-digital-divide.md: university students post-Covid, widening existing divide, barriers of gadgets, internet access, income, gender, study field, age, and location match topic-03.mdx:43.',
      'specs/content/gcce-400/sources/unit-06.md ## Unverifiable sources: mattson-2017 declared under owner ruling 2026-09-19 (D-2026-0001); topic-01.mdx and reading list use only title-level book aim without unverified quotations.',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/gcce-400/coverage/unit-06.md maps all three sub-topics U6-01..U6-03 to exact topic headings with bound sources; design trace details retrieval items, MCQs, RRQs, and ERQs.',
      'check:depth-gate exit 0: concept coverage, required pedagogical blocks (hook, explanation, worked example, misconceptions, activity, retrieval, summary, self-assessment, practicum, summative task with rubric), formative floor, reading-minutes band (46 min vs 36-52 min band), coverage-sources consistency.',
      'specs/content/gcce-400/concepts/unit-06.md defines 8 core concepts (CON:GCCE-400-6-1..8) with prerequisites, SLO mappings, and assessment links.',
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      `${dir}/assessment-solutions.md: independent solve of MCQs 1-10 (B, A, B, A, B, C, B, A, A, C) matches ${U}/unit-assessment.mdx ### MCQ answer key 10/10.`,
      'RRQs 1-10 derived answers verified against model answers and mark schemes; Bloom demand ranges Understand to Analyze.',
      'ERQs 1-5 feature 4-criterion analytic rubrics (0-3 marks per criterion, 12 marks total each) matching Bloom cognitive demand (Analyze, Create, Evaluate); ERQ 5 is blueprint practicum Create task.',
      'Advisory finding noted in assessment-solutions.md regarding RRQ 6 model answer describing check 4 (harm) while prompt asks for last check (decide), and MCQ key distribution lacking key D.',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'render-review unavailable (exit 1): deployed SHA 175a90b7a644bd366cf3d1d2592090a93f912bcb differs from HEAD 6da753a0c89ff4be5d224b7884655bf7520911c2 on docs/semester-4/gcce-400/unit-06/index.mdx and static/img/figures/gcce-400/unit-06/fig-U6-7.webp; host limits and brief prohibit local build, dev server, or browser runs.',
      'Structural accessibility passes from source: all figures have descriptive alt text; all SVGs carry role="img", aria-labelledby, <title>, and <desc>; semantic headings and table markup verified.',
      'measure-figure-text exits 0 across all 24 SVGs in static/img/figures/gcce-400/unit-06/.',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      `${U}/index.mdx, topic-01.mdx, topic-02.mdx, topic-03.mdx: clear, plain sentences suitable for B.Ed trainees without specialist prerequisite knowledge.`,
      'Key terms defined at first use with Glossary components (Digital citizenship, Digital platform, Digital civic engagement, Cyber ethics, Personal data, Data protection, Misinformation, Disinformation, Digital divide, Digital literacy).',
      'Contextualized with authentic Pakistani and Sindhi examples (Thatta, Khairpur, Sanghar, Badin, Pakistan Citizen\'s Portal).',
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'All three topics execute complete pedagogical progression: classroom situation -> explanation -> worked example -> misconception correction -> group activity -> retrieval -> summary -> self-assessment -> practicum connection -> summative task with mini-rubric.',
      'Common misconceptions explicitly debunked: online participation as shallow (Topic 6.1), anything online is private (Topic 6.2), sharing is not the same as saying it (Topic 6.2), everyone in Pakistan has internet (Topic 6.3).',
      'Activities feasible in local classrooms with chart paper, slips, and peer exchanges.',
    ],
  },
];

const findings = [
  {
    severity: 'uncertain',
    resolved: false,
    message: 'Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: the deployed SHA 175a90b7a644bd366cf3d1d2592090a93f912bcb differs from HEAD 6da753a0c89ff4be5d224b7884655bf7520911c2 on docs/semester-4/gcce-400/unit-06/index.mdx and static/img/figures/gcce-400/unit-06/fig-U6-7.webp. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure geometry pass from source.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'In docs/semester-4/gcce-400/unit-06/unit-assessment.mdx:90, RRQ 6 asks: "List the five checks you should make before sharing a post about a public issue, and explain in one sentence what the last check asks." The model answer at line 131 states: "The last check asks what the post could do to a person or community before you share it" and marks "1 for the harm check explained". This explains the fourth check ("consider the harm") rather than the fifth/last check ("decide"). Authors should align the prompt or mark scheme.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'In docs/semester-4/gcce-400/unit-06/unit-assessment.mdx:30-81, MCQ correct keys are distributed as A: 4, B: 4, C: 2, D: 0. Option D is never the correct key across all 10 items. All items and distractors are clear and unambiguous, but balancing the key distribution across A-D in future revisions is recommended.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'In specs/content/gcce-400/sources/texts/shair-2022-digital-divide.md:11, the note mentions "Use in GCCE-400 Unit 1: Topic 1.3...". Unit 6 also relies on this bound note for U6-03; updating the note text to reference Unit 6 would clarify provenance for future reviewers.',
  },
];

const rulings = {
  'D-2026-0001': rulingDigest('.', 'D-2026-0001'),
};

const report = {
  schema_version: 1,
  course_code: 'GCCE-400',
  unit_no: 6,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:83395d0296907b259329dd93071f020f043f0e8f',
  reviewer_run_id: '759d9e52-79fb-4844-92e5-0c1c6b4bceef',
  model: 'Gemini 3.8 Flash (Medium)',
  started_at: '2026-11-24T00:46:09.000Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  rulings,
  criteria,
  findings,
  commands,
  evidence_manifest,
};

writeFileSync('specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124.json', JSON.stringify(report, null, 2) + '\n');
console.log('Wrote report to specs/content/gcce-400/reviews/unit-06/G3/agy-run1-20261124.json with', Object.keys(evidence_manifest).length, 'evidence files.');
