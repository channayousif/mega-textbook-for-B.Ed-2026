import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { rulingDigest, skillDigest, validateReport } from '../../../../../../../scripts/lib/review-evidence.mjs';

const root = '.';
const dir = 'specs/content/efpg-402/reviews/unit-02/G3/1947560f-ec6d-49d7-86e1-0c8e0c563ccb';
const manifest = JSON.parse(readFileSync(`${dir}/manifest.json`, 'utf8'));
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

const evidenceFiles = [
  `${dir}/manifest.json`,
  `${dir}/assessment-solutions.md`,
  `${dir}/limitations.md`,
  `${dir}/summary.md`,
  `${dir}/advisory-tracker-row.md`,
  `${dir}/make-report.mjs`,
  `${dir}/source-checks/ncp-science-2022-unit-02-search.txt`,
  `${dir}/logs/prepare.txt`,
  `${dir}/logs/render-input-identity.txt`,
  `${dir}/logs/validate:content.log`,
  `${dir}/logs/check:depth-gate.log`,
  `${dir}/logs/check:figures.log`,
  `${dir}/logs/check:no-em-dash.log`,
  `${dir}/logs/check:no-answer-keys.log`,
  `${dir}/logs/check:docs-sync.log`,
  `${dir}/logs/render-review.txt`,
  `${dir}/logs/measure-figure-text.log`,
  `${dir}/logs/build-content-status.log`,
  `${dir}/logs/check-content.log`,
  `${dir}/renders/render-inspect.json`,
  `${dir}/renders/render-inspect.log`,
  ...readdirSync(`${dir}/renders`).filter((f) => f.endsWith('.png')).map((f) => `${dir}/renders/${f}`).sort(),
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

const U = 'docs/semester-4/efpg-402/unit-02';
const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:746-752 Guide Unit 2 (Weeks 3-4) sections 2.1-2.5 match specs/content/efpg-402/content-spec.md:139-191 (U2-01..U2-05).',
      `${U}/topic-01.mdx ### Principles of science curriculum construction matches U2-01.`,
      `${U}/topic-02.mdx ### Aims and objectives of the secondary science curriculum matches U2-02.`,
      `${U}/topic-03.mdx ### Organisation and sequencing of content matches U2-03.`,
      `${U}/topic-04.mdx ### Textbook analysis and evaluation matches U2-04.`,
      `${U}/topic-05.mdx ### Correlation of science with other subjects matches U2-05.`,
      'CLO/SLO references SLO:EFPG-402-2-1 and 2-2 traced across all five topics and the unit assessment.',
    ],
  },
  {
    id: 'sources',
    status: 'fail',
    evidence: [
      `${dir}/source-checks/ncp-science-2022-unit-02-search.txt: the full 74-page NCP Science progression-grid PDF (HTTP 200, 19.6 MB, 2026-11-28) does not contain the quoted SLO wordings used in topic-03, the RRQ 1 model answer and topic-04.`,
      `${U}/topic-03.mdx:54 worked example quotes Grade 4 "identify the main parts of the human body and their basic functions", Grade 6 "describe the functions of the main organs of the digestive system" and Grade 8 "explain how the circulatory and respiratory systems work together"; the actual NCP SLOs are S-04-A-17, S-05-A-04, S-05-A-05, S-06-A-11/12/13 and S-08-A-14.`,
      `${U}/unit-assessment.mdx:143 RRQ 1 model answer attributes "classify materials as conductors or insulators" to the NCP; the wording is absent from the published PDF.`,
      `${U}/topic-04.mdx:61 worked example quotes "describe the functions of the main organs of the digestive system" as an NCP SLO; absent from the published PDF.`,
      `${U}/topic-02.mdx:40-47 the six aims and "scientific literacy" are a synthesis; the NCP states no list of aims and never uses either phrase.`,
      'specs/content/efpg-402/sources/unit-02.md:13-20 declares dcar-science-4-8, kochhar-science, aggarwal-science and bruner-1960 under ## Unverifiable sources (D-2026-0001); no finding rests on them alone.',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/efpg-402/coverage/unit-02.md maps all five sub-topics U2-01..U2-05 to exact topic headings with bound sources.',
      'check:depth-gate exit 0: 5 topics, 5 sub-topics, reading-minutes total 42 within the 42-61 band, all required pedagogical blocks present.',
      'specs/content/efpg-402/concepts/unit-02.md defines 8 concepts (CON:EFPG-402-2-1..8) with prerequisites, SLO mappings and 10/10/5 item links.',
    ],
  },
  {
    id: 'assessment',
    status: 'fail',
    evidence: [
      `${dir}/assessment-solutions.md: independent solve of MCQs 1-10 (C, B, B, C, C, C, C, C, D, C) matches ${U}/unit-assessment.mdx ### MCQ answer key 10/10.`,
      `${U}/unit-assessment.mdx:155 RRQ 7 model answer names "Relevance (or inclusivity via illustrations)" as the second weak criterion; relevance is not one of the six checklist criteria (accuracy, curriculum alignment, language, activities, illustrations, inclusivity). The correct second answer is inclusivity.`,
      `${U}/unit-assessment.mdx:143 RRQ 1 model answer uses an NCP SLO wording that the published NCP does not contain.`,
      'Bank structure passes: 10 MCQs (Remember to Apply, 2 per topic), 10 RRQs (Understand to Analyze, at least one per topic), 5 ERQs (Evaluate/Create) with analytic rubrics; ERQ 5 is integrative; check:bloom-bands exit 0.',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      `${dir}/logs/render-review.txt: render-inspect against https://textbook.com.pk (deployed SHA 00ac8dbb5ee318db7387243e2b3b92aed650ae8c matches HEAD for this unit) is clean on desktop 1280x900 (0 broken images, 0 missing alt, 0 overflow), narrow 360x780 (0 px document overflow; tables scroll with tabindex=0 and an aria-label) and A4 print (0 clipped elements, answers section present), but exits 1 because it requests .svg variants for the five WebP illustrations fig-U2-12 to fig-U2-16.`,
      'Structural accessibility passes from source: all 15 Figure elements carry descriptive alt text; headings, tables and reading order are semantic.',
      'measure-figure-text exits 0 across all 40 SVGs in static/img/figures/efpg-402/unit-02/.',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      `${U}/index.mdx, topic-01.mdx to topic-05.mdx: plain academic sentences, terms defined at first use, suitable for an HSC/intermediate graduate without specialist curriculum-design knowledge.`,
      'Authentic Pakistani/Sindhi classroom scenarios (Sukkur, Hyderabad, Nawabshah, Thatta, Mirpurkhas, Larkana) with locally available materials.',
      'check:no-em-dash exit 0: zero em dashes in authored content.',
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'All five topics execute the full progression: classroom situation -> explanation -> worked example -> misconception correction -> collaborative activity -> retrieval -> summary -> self-assessment -> practicum task -> summative task with analytic rubric.',
      'Common misconceptions explicitly addressed: the textbook is the curriculum (2.1, 2.4), a thicker textbook is better (2.2), science should be taught on its own (2.3, 2.5).',
      'Activities are feasible in a typical Sindh government school with textbooks, chart paper, local water/soil samples, seeds and pair or group work.',
    ],
  },
];

const findings = [
  {
    id: 'F1',
    severity: 'blocking',
    resolved: false,
    message: 'Invented NCP quotations. docs/semester-4/efpg-402/unit-02/topic-03.mdx:54 presents three Grade 4/6/8 human-body SLOs in quotation marks as the NCP progression grid; docs/semester-4/efpg-402/unit-02/unit-assessment.mdx:143 (RRQ 1 model answer) attributes "classify materials as conductors or insulators" to the NCP; docs/semester-4/efpg-402/unit-02/topic-04.mdx:61 quotes "describe the functions of the main organs of the digestive system" as an NCP SLO. The full published NCP Science progression-grid PDF (74 pages, checked 2026-11-28) contains none of these wordings; its actual SLOs are S-04-A-17, S-05-A-04, S-05-A-05, S-06-A-11/12/13 and S-08-A-14. Repair: replace the quotations with the real SLOs, or remove the quotation marks and reframe them as the unit\'s own illustration, and correct the RRQ 1 model example.',
  },
  {
    id: 'F2',
    severity: 'uncertain',
    resolved: false,
    message: 'docs/semester-4/efpg-402/unit-02/topic-02.mdx:40 states the NCP "sets out to build scientific literacy for every pupil" and lists "six broad aims". The published NCP states no list of aims and never uses "scientific literacy" or "spiral". The unit discloses that the aims "can be drawn from" the curriculum, but the summary and the assessment present them as the curriculum\'s own aims. Reframe them explicitly as the unit\'s synthesis, or bind a source that states them.',
  },
  {
    id: 'F3',
    severity: 'uncertain',
    resolved: false,
    message: 'docs/semester-4/efpg-402/unit-02/unit-assessment.mdx:155 (RRQ 7 model answer) names "Relevance (or inclusivity via illustrations)" as the second weak criterion. Relevance is not one of the six checklist criteria taught in Topic 2.4; the correct second answer is inclusivity (city-only examples exclude rural pupils). This is a marking-guidance defect that would teach the wrong criterion.',
  },
  {
    id: 'F4',
    severity: 'uncertain',
    resolved: false,
    message: 'render-review exited 1. render-inspect sections A (desktop), B (narrow) and C (A4 print) are clean against the production build, but section D requests .svg variants for the five WebP illustrations fig-U2-12 to fig-U2-16, which have none, producing ten false-positive defects. The contract requires render-review exit 0 for a pass, so visual accessibility is unverified rather than passed.',
  },
  {
    id: 'F5',
    severity: 'advisory',
    resolved: false,
    message: 'docs/semester-4/efpg-402/unit-02/unit-assessment.mdx MCQ correct keys are distributed A: 0, B: 2, C: 7, D: 1. Option A is never the key and C carries 7 of 10; all items and distractors are unambiguous, but balancing the key distribution across A-D is recommended.',
  },
  {
    id: 'F6',
    severity: 'advisory',
    resolved: false,
    message: 'docs/semester-4/efpg-402/unit-02/topic-04.mdx:89 summary says "even a widely used textbook can be weak on activities, language or relevance". The worked example concerns a newly received textbook and nowhere establishes that it is widely used. Soften to "a textbook can be weak..." or supply the evidence.',
  },
  {
    id: 'F7',
    severity: 'advisory',
    resolved: false,
    message: 'docs/semester-4/efpg-402/unit-02/topic-04.mdx:60 says a diagram labelled "esophagus" uses American spelling "rather than the British spelling (\'oesophagus\') used in Pakistani exams". The NCP itself prints "esophagus" (S-04-A-17), so the spelling point is weaker than presented. Reword to focus on the foreign source rather than the spelling.',
  },
  {
    id: 'F8',
    severity: 'advisory',
    resolved: false,
    message: 'static/img/figures/efpg-402/unit-02/fig-U2-3.svg labels its right-hand column "Sample standard (Grade 6)" with "Classify materials as conductors or insulators and test with circuit", "Explain the water cycle using a labelled diagram" and "Plan a fair test with one variable changed and others controlled". None of these is the NCP\'s wording (the NCP has "fair test" as one enquiry type and "understand the Water Cycle" at Grade 4). Either label the column as illustrative or use the actual NCP SLOs.',
  },
];

const report = {
  schema_version: 1,
  course_code: 'EFPG-402',
  unit_no: 2,
  stage: 'G3',
  disposition: 'revise',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:5d85468c72977804305edf866ba720f47fc6ccb8',
  reviewer_run_id: '1947560f-ec6d-49d7-86e1-0c8e0c563ccb',
  model: 'Claude LongCat-2.5',
  started_at: '2026-11-28T04:35:00.000Z',
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
  reviewed_commit: 'e29224ece005924eae6038b8fe42c236d1c66fd4',
  limitations: [
    'No parent-prepared frozen handoff; the manifest was prepared locally at HEAD e29224ece.',
    'Author run identity is the Unit 2 authoring commit; figure-placement commits followed it.',
    'render-review exited 1 on a render-inspect tool limitation for WebP illustrations; A/B/C inspection is clean.',
    'The full NCP PDF used for source verification is scratch (.crew/) and is not committed.',
  ],
};

const reportPath = 'specs/content/efpg-402/reviews/unit-02/G3/1947560f-ec6d-49d7-86e1-0c8e0c563ccb.json';
writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(`Wrote report to ${reportPath}`);

validateReport(root, report);
console.log('Report validated successfully!');
