import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { createHash } from 'node:crypto';
import { rulingDigest, validateReport } from '../../../../../../../scripts/lib/review-evidence.mjs';

const root = resolve('.');
const dir = 'specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb';
const manifest = JSON.parse(readFileSync(`${dir}/manifest.json`, 'utf8'));
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

function walkFiles(d) {
  const res = [];
  for (const entry of readdirSync(d)) {
    const full = join(d, entry);
    if (statSync(full).isDirectory()) {
      res.push(...walkFiles(full));
    } else {
      res.push(full);
    }
  }
  return res;
}

const allFiles = walkFiles(dir).sort();
const evidence_manifest = Object.fromEntries(allFiles.map((p) => [p, sha(p)]));

const commands = [
  { name: 'validate:content', exit_code: 0, log_path: `${dir}/logs/validate:content.log` },
  { name: 'check:depth-gate', exit_code: 0, log_path: `${dir}/logs/check:depth-gate.log` },
  { name: 'check:figures', exit_code: 0, log_path: `${dir}/logs/check:figures.log` },
  { name: 'check:no-em-dash', exit_code: 0, log_path: `${dir}/logs/check:no-em-dash.log` },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: `${dir}/logs/check:no-answer-keys.log` },
  { name: 'check:docs-sync', exit_code: 0, log_path: `${dir}/logs/check:docs-sync.log` },
  { name: 'render-review', exit_code: 0, log_path: `${dir}/renders/render-inspect.log` },
  { name: 'check:content', exit_code: 0, log_path: `${dir}/logs/check-content.log` },
  { name: 'measure-figure-text', exit_code: 0, log_path: `${dir}/logs/measure-figure-text.log` },
];

const U = 'docs/semester-4/efpc-411/unit-02';
const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'specs/content/efpc-411/content-spec.md:133-183 Unit 2 G1 spec: sub-topics U2-01..U2-10, figure plan fig-U2-1..8, banner fig-U2-9, unit-end blueprint 10/10/5.',
      `${U}/topic-01.mdx ### Observing the school environment: physical layout, resources and the discipline system matches U2-01.`,
      `${U}/topic-01.mdx ### School rules, routines and the daily schedule matches U2-02.`,
      `${U}/topic-01.mdx ### Reading one classroom: interaction, seating and climate matches U2-03.`,
      `${U}/topic-02.mdx ### Observing three to four lessons in different subjects matches U2-04.`,
      `${U}/topic-02.mdx ### Lesson focus: objectives, methods and strategies, teaching aids, pupil participation matches U2-05.`,
      `${U}/topic-03.mdx ### Managing the class: discipline techniques, time management, pupil behaviour and engagement matches U2-06.`,
      `${U}/topic-03.mdx ### Assessment methods in use: oral questions, quizzes and homework matches U2-07.`,
      `${U}/topic-04.mdx ### The teacher's professional conduct and interaction with colleagues and parents matches U2-08.`,
      `${U}/topic-04.mdx ### Inclusive practice in the classroom matches U2-09.`,
      `${U}/topic-04.mdx ### Observing one complete lesson from start to end matches U2-10.`,
      'CLO/SLO references SLO:EFPC-411-2-1, 2-2, 2-3, 2-4 traced across all unit topics and assessment items.',
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'specs/content/efpc-411/sources/texts/hec-2013-practicum.md & HEC (2013) Practicum I & II: Semester 3 & 4 handbook outlines school placement requirements, observation tasks, and proformas (U2-01, U2-02, U2-03, U2-04, U2-08, U2-10).',
      'specs/content/efpc-411/sources/texts/teach-primary-2021.md & Molina et al. (2021) Teach Primary: Observer manual (2nd ed., World Bank, DOI: 10.1596/37669) provides empirical low-inference observer protocols for classroom physical environment, time on task, lesson observation, and inclusion (U2-01, U2-03, U2-05, U2-06, U2-09).',
      'specs/content/efpc-411/sources/texts/hec-2013-methods.md & HEC (2013) General Methods of Teaching: instructional objectives, varied teaching strategies, learning aids, and classroom assessment (U2-02, U2-04, U2-05, U2-07).',
      'specs/content/efpc-411/sources/texts/hec-2013-edupsy.md & HEC (2013) Educational Psychology: classroom management, engagement, discipline without punishment, and inclusive practices (U2-06, U2-07, U2-09).',
      'specs/content/efpc-411/sources/unit-02.md: mcburney-fry (2002) and elt-methods-texts (Harmer 2007, Brown 2007, Scrivener 2011) transparently declared under ## Unverifiable sources per Constitution Art. VII and Decision D-2026-0001; claims supported are general and fully corroborated by hec-2013-practicum.',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/efpc-411/coverage/unit-02.md maps all ten sub-topics U2-01..U2-10 to exact topic headings with bound sources.',
      'check:depth-gate exit 0: concept coverage, required pedagogical blocks (hook, explanation, worked example, misconceptions, activity, retrieval, summary, self-assessment, practicum, summative task with rubric), formative floor, reading-minutes budget, coverage-sources consistency.',
      'specs/content/efpc-411/concepts/unit-02.md defines 10 core concepts (CON:EFPC-411-2-1..10) with prerequisites, SLO mappings, and assessment links.',
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      `${dir}/assessment-solutions.md: independent solve of MCQs 1-10 (B, B, C, C, B, B, B, C, B, B) matches ${U}/unit-assessment.mdx ### MCQ answer key 10/10.`,
      'RRQs 1-10 derived answers verified against model answers and point-based mark schemes; Bloom demand ranges Understand to Analyze.',
      'ERQs 1-5 feature 3-criterion analytic rubrics (total 10 marks each) matching Bloom cognitive demand (Analyze, Evaluate, Create); ERQ 3 fulfills the content-spec blueprint requirement for analyzing an observation record; ERQ 5 is the blueprint integrative capstone placement plan.',
    ],
  },
  {
    id: 'accessibility',
    status: 'pass',
    evidence: [
      'render-review executed against https://textbook.com.pk (deployed SHA c8efed9b430b39867c1418fae61194c49cefcda9 matches HEAD); render-inspect.log and render-inspect.json exit 0 with 0 defects across desktop (1280x900), mobile narrow (360x780), and A4 print (794px).',
      'Mobile narrow inspection verified all tables scroll horizontally in their own container with role="region", tabindex="0", and aria-label; document overflow is 0px.',
      'All 12 full-page PNG screenshots recorded in evidence_manifest under renders/.',
      'measure-figure-text exits 0 across all 16 SVG variants in static/img/figures/efpc-411/unit-02/; zero text overflow past viewBox and zero collision with wordmark.',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      `${U}/index.mdx, topic-01.mdx, topic-02.mdx, topic-03.mdx, topic-04.mdx: plain, direct prose suitable for B.Ed student teachers without specialist prerequisite training.`,
      'Technical concepts defined at first use with glossary/callout conventions (School environment, Classroom climate, Teacher-pupil interaction, Time on task, Inclusive practice, Professional conduct).',
      'Contextualized with realistic Sindh classroom situations (Khairpur, Sukkur, Larkana, Hyderabad).',
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'All four topics follow the complete instructional cycle: authentic classroom situation -> conceptual explanation with low-inference examples -> misconception debunks -> interactive group activity -> formative retrieval checks -> unit summary -> self-assessment -> field practicum application -> summative performance task with rubric.',
      'Common misconceptions explicitly debunked: a quiet class is always well managed (Topic 2.3), assessment happens only in tests (Topic 2.3), inclusion is only about pupils with disabilities (Topic 2.4).',
      'Practicum activities provide concrete, actionable observation tasks feasible in local Sindh schools.',
    ],
  },
];

const findings = [
  {
    severity: 'advisory',
    resolved: false,
    message: 'In docs/semester-4/efpc-411/unit-02/unit-assessment.mdx:35-94, MCQ correct keys are distributed as A: 0, B: 7, C: 3, D: 0. Neither option A nor option D is ever the correct key across all 10 items, and option B is keyed for 70% of items. All items, stems, and distractors are clear, accurate, and unambiguous, but balancing key distribution across options A-D in future revisions is recommended.',
  },
];

const rulings = {
  'D-2026-0001': rulingDigest(root, 'D-2026-0001'),
};

const report = {
  schema_version: 1,
  course_code: 'EFPC-411',
  unit_no: 2,
  stage: 'G3',
  disposition: 'pass',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:6ccf00792650338a7a168cedcd53de74cfe5f9a1',
  reviewer_run_id: 'cbe2e670-0dc7-446a-a8e2-b41ac6087cdb',
  model: 'Gemini 3.8 Flash (Medium)',
  started_at: '2026-11-27T13:34:00.000Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  rulings,
  criteria,
  findings,
  commands,
  evidence_manifest,
};

const reportPath = 'specs/content/efpc-411/reviews/unit-02/G3/cbe2e670-0dc7-446a-a8e2-b41ac6087cdb.json';
writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(`Wrote report to ${reportPath}`);

const validated = validateReport(root, report);
console.log(`Report validated successfully: ${validated.disposition}`);
