import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const rid = '75270cdd-f889-4ee3-bf95-5b1b88039d3a';
const course = 'EFPG-402';
const unit = 4;
const stage = 'G3';
const prefix = `specs/content/efpg-402/reviews/unit-04/G3/${rid}`;
const manifest = JSON.parse(readFileSync(join(here, 'manifest.json'), 'utf8'));

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const evidence_manifest = {};
for (const p of walk(here)) {
  const rel = relative(process.cwd(), p).split('\\').join('/');
  evidence_manifest[rel] = createHash('sha256').update(readFileSync(p)).digest('hex');
}

const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:764-770 (Unit 4: Teaching-Learning Resources, sections 4.1 to 4.5).',
      'specs/content/efpg-402/content-spec.md:261-313 Unit 4 G1 spec: sub-topics U4-01..U4-05, topics 4.1-4.5, depth budget 42-61 reading-min, figure plan fig-U4-1..10.',
      'specs/content/efpg-402/coverage/unit-04.md maps U4-01..U4-05 to topic-01.mdx..topic-05.mdx and to a ### Explanation section each.',
      'docs/semester-4/efpg-402/unit-04/topic-01.mdx..topic-05.mdx each carry the mapped ### section (Importance of teaching aids; Use of laboratory equipment; Preparation and use of low-cost teaching aids; Use of ICT in science teaching; Science exhibitions, field trips and community resources).',
      'clo_refs SLO:EFPG-402-4-1 (topics 4.1-4.2) and SLO:EFPG-402-4-2 (topics 4.3-4.5) trace to course-overview.mdx objective 4.',
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'specs/content/efpg-402/sources/unit-04.md maps ncp-science-2022, khan-2019-low-cost, khan-academy-science, vaidya-science and dale-1969; khan-academy-science, vaidya-science and dale-1969 remain declared under ## Unverifiable sources with dates and D-2026-0001.',
      'source-checks/ncp-science-2022-grade-check.txt: NCP Science Grades 4-8 progression grid retrieved in full (HTTP 200, 74 pages, 19,606,893 bytes); every curriculum-grade reference in the repaired unit matches it.',
      'source-checks/khan-2019-low-cost.txt: Khan, Farooq and Fleury (2019) retrieved in full (HTTP 200, 15 pages); the experimental group outscored the control for low and high achievers and low achievers took greater interest, supporting topic-03.mdx:44 and RRQ 6.',
      'specs/content/efpg-402/sources/texts/ncp-science-2022.md excerpts 3-6 and 10 support the enquiry, measurement, models and science-in-context claims; sources/texts/khan-2019-low-cost.md binds the low-cost-aid evidence.',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/efpg-402/coverage/unit-04.md maps every sub-topic U4-01..U4-05 to a topic file and a ### Explanation section with a cited source.',
      'check:depth-gate exit 0 (concept coverage, required pedagogical blocks, formative floor, reading-minutes band, coverage-sources consistency); check:content exit 0 across all 14 content gates.',
      'specs/content/efpg-402/concepts/unit-04.md defines CON:EFPG-402-4-1..4-7 with prerequisites, SLO refs and corrected assessment links.',
      'All spec-mandated misconceptions are taught: topic-01.mdx:73 (expensive kits), topic-04.mdx:88 (ICT replaces practical work), topic-05.mdx:84 (field trips are only outings).',
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      'assessment-solutions.md: independent solve of MCQs 1-10 gives D, B, C, C, A, B, A, B, C, D, matching unit-assessment.mdx:139-148 10/10; key distribution A2/B3/C3/D2.',
      'assessment-solutions.md: RRQs 1-10 derived answers match the model answers and mark schemes; no conflicting key.',
      'docs/semester-4/efpg-402/unit-04/topic-01.mdx:57-60 teaches four Dale levels; unit-assessment.mdx:105 asks for four and :154 names the same four; static/img/figures/efpg-402/unit-04/fig-U4-2.svg:23-33 renders the same four bands. The run-1 conflict is resolved.',
      'docs/semester-4/efpg-402/unit-04/unit-assessment.mdx:129 ERQ 3 names SLO S-05-B-16 (Grade 5, NCP PDF p. 56), satisfying content-spec.md:268; ERQ 1-5 demand Analyze, Evaluate, Create, Analyze, Evaluate; MCQ/RRQ/ERQ each cover all five topics; the 10/10/5 bank and bounded answers section satisfy check:no-answer-keys.',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'logs/render-review.txt: render-review unavailable (exit 1). Deployed SHA b7b7e00c9a8640158b8d336ba1215e4fcfed01e9 differs from HEAD b2dc2715255b31026bf257e58e451ecbf983d001 on eight unit files; the production build is not the reviewed input.',
      'logs/measure-figure-text.log: scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efpg-402/unit-04/*.svg exit 0 across all 40 SVGs (10 English pairs and 10 Urdu pairs).',
      'check:figures, check:svg-style and check:no-em-dash exit 0. Visual, narrow-screen and A4 print inspection could not be performed on the reviewed bytes.',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      'docs/semester-4/efpg-402/unit-04/index.mdx and topic-01.mdx..topic-05.mdx: short plain sentences, terms defined on first use (teaching aid, low-cost teaching aid, ICT, science exhibition), no specialist prerequisite.',
      'Authentic Pakistani and Sindhi classroom contexts: Larkana (topic-01), Khairpur (topic-02), Badin (topic-03), Dadu (topic-04), Jacobabad (topic-05).',
      'check:no-em-dash exit 0: zero em dashes in authored content.',
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      "Every topic runs the full cycle: classroom situation, explanation, worked example, common misconception, collaborative activity, check your understanding, summary, self-assessment checklist, practicum task, summative task with a mini-rubric.",
      'Worked examples are concrete and feasible: mammalian heart sequencing (topic-01), graduated-cylinder parallax (topic-02), circuit tester (topic-03), ICT and hands-on circuits (topic-04), canal water field investigation (topic-05).',
      'Activities use low-cost local materials and pair or group work suitable for large Pakistani classrooms.',
    ],
  },
];

const findings = [
  {
    severity: 'uncertain',
    resolved: false,
    message: 'Render and print inspection of the reviewed bytes could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: deployed SHA b7b7e00c9a8640158b8d336ba1215e4fcfed01e9 differs from HEAD b2dc2715255b31026bf257e58e451ecbf983d001 on eight unit files (topic-01.mdx, topic-03.mdx, topic-04.mdx, unit-assessment.mdx, fig-U4-2.svg, fig-U4-2.dark.svg, fig-U4-2.ur.svg, fig-U4-2.ur.dark.svg). render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure geometry pass from source.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'Carried from run 1: figure-plan drift. specs/content/efpg-402/content-spec.md:307 plans fig-U4-9 as "farm, clinic, workshop, river, museum", but the placed figure and topic-05.mdx:52 use "Pottery / Brick Kiln" and no museum. The figure matches the prose; the approved content-spec plan wording is the outlier and is frozen for a reviewer.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'Figure-manifest prompt drift introduced by the grade repairs. specs/content/efpg-402/figures/unit-04.md:19 (fig-U4-14) still says "a Grade 5 science lesson" while topic-03.mdx:28 now teaches Grade 7, and :20 (fig-U4-15) still says "a Grade 8 science lesson" while topic-04.mdx:28 now teaches Grade 7. The student-facing alt text carries no grade, so this is a manifest-record inconsistency, not a learner-facing defect.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'static/img/figures/efpg-402/unit-04/fig-U4-6.svg still labels the circuit-tester concept "Closed electric circuits and electrical conductivity of materials". The table header says "Grades 4-8", so it is not a Grade 5 blueprint claim, but "electrical conductivity" is not an NCP SLO phrase (the grid names thermal conductivity at Grade 7). Minor terminology drift.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'docs/semester-4/efpg-402/unit-04/unit-assessment.mdx:71 MCQ 6 says "A Grade 5 teacher builds a working lung model" and asks about diaphragm mechanics, which the NCP places at Grade 7 (S-07-A-11). The item tests the mechanism rather than claiming a Grade 5 curriculum placement, so it is not a blueprint defect, but it sits oddly beside the repaired Grade 7 prose.',
  },
];

const commands = [
  { name: 'validate:content', exit_code: 0, log_path: `${prefix}/logs/validate:content.log` },
  { name: 'check:depth-gate', exit_code: 0, log_path: `${prefix}/logs/check:depth-gate.log` },
  { name: 'check:figures', exit_code: 0, log_path: `${prefix}/logs/check:figures.log` },
  { name: 'check:no-em-dash', exit_code: 0, log_path: `${prefix}/logs/check:no-em-dash.log` },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: `${prefix}/logs/check:no-answer-keys.log` },
  { name: 'check:docs-sync', exit_code: 0, log_path: `${prefix}/logs/check:docs-sync.log` },
  { name: 'render-review', exit_code: 1, log_path: `${prefix}/logs/render-review.txt` },
  { name: 'check:content', exit_code: 0, log_path: `${prefix}/logs/check-content.log` },
  { name: 'measure-figure-text', exit_code: 0, log_path: `${prefix}/logs/measure-figure-text.log` },
  { name: 'build:content-status', exit_code: 0, log_path: `${prefix}/logs/build-content-status.log` },
];

const report = {
  schema_version: 1,
  course_code: course,
  unit_no: unit,
  stage,
  disposition: 'escalate',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'crew-job:efpg-402-u04-repair_en',
  reviewer_run_id: rid,
  model: 'LongCat-2.5',
  started_at: '2026-11-28T07:47:00Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  criteria,
  findings,
  commands,
  evidence_manifest,
};

const out = `${prefix}.json`;
writeFileSync(out, JSON.stringify(report, null, 2) + '\n');
console.log(`wrote ${out} with ${Object.keys(evidence_manifest).length} evidence files`);
