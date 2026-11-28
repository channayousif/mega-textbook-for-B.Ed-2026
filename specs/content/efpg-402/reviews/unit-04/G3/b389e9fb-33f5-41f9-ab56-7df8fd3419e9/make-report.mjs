#!/usr/bin/env node
/**
 * Build the G3 report for EFPG-402 Unit 4 from the prepared manifest and the
 * evidence folder. Evidence hashes are computed from the exact saved bytes.
 * Run: node make-report.mjs <evidence-dir> <report-path>
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(process.env.CONTENT_ROOT || '.');
const evid = resolve(process.argv[2]);
const reportPath = resolve(process.argv[3]);
const manifest = JSON.parse(readFileSync(join(evid, 'manifest.json'), 'utf8'));
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}
const evidenceManifest = {};
for (const file of walk(evid)) {
  const rel = relative(root, file).split(sep).join('/');
  evidenceManifest[rel] = sha(file);
}
const ev = (name) => `specs/content/efpg-402/reviews/unit-04/G3/b389e9fb-33f5-41f9-ab56-7df8fd3419e9/${name}`;

const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:764-770 (Unit 4: Teaching-Learning Resources, sections 4.1 to 4.5).',
      'specs/content/efpg-402/content-spec.md:261-313 Unit 4 G1 spec: sub-topics U4-01..U4-05, topics 4.1-4.5, depth budget 42-61 reading-min, figure plan fig-U4-1..10.',
      'specs/content/efpg-402/coverage/unit-04.md maps U4-01..U4-05 to topic-01.mdx..topic-05.mdx and to a ### Explanation section each.',
      'docs/semester-4/efpg-402/unit-04/topic-01.mdx ### Importance of teaching aids in science (U4-01); topic-02.mdx ### Use of laboratory equipment (U4-02); topic-03.mdx ### Preparation and use of low-cost teaching aids (U4-03); topic-04.mdx ### Use of ICT in science teaching (U4-04); topic-05.mdx ### Science exhibitions, field trips and community resources (U4-05).',
      'clo_refs SLO:EFPG-402-4-1 (topics 4.1-4.2) and SLO:EFPG-402-4-2 (topics 4.3-4.5) trace to course-overview.mdx:27 objective 4 (use teaching-learning resources and ICT).',
    ],
  },
  {
    id: 'sources',
    status: 'fail',
    evidence: [
      'specs/content/efpg-402/sources/unit-04.md: ncp-science-2022, khan-2019-low-cost, khan-academy-science, vaidya-science, dale-1969; four are declared under ## Unverifiable sources with dates and D-2026-0001.',
      'source-checks/khan-2019-low-cost.txt: Khan, Farooq and Fleury (2019) retrieved in full (DOI 10.36902/sjesr-vol2-iss2-2019(33-47)); experimental group outscored the control for low and high achievers and low achievers took greater interest, supporting topic-03.mdx:44 and RRQ 6.',
      'specs/content/efpg-402/sources/texts/ncp-science-2022.md excerpts 3, 4, 5 and 6 support the enquiry, measurement, models and science-in-context claims in topics 4.1, 4.2 and 4.5.',
      'source-checks/ncp-science-2022-grade-check.txt: topic-03.mdx:28 (Grade 5 respiration and diaphragm) contradicts Grade 5 SLO S-05-A-02 and its note, and Grade 7 SLO S-07-A-11; topic-03.mdx:94 (Grade 5 transpiration and xylem) contradicts Grade 8 Benchmark II and Grade 7 SLO S-07-A-02; topic-04.mdx:28 (Grade 8 atomic structure) contradicts Grade 7 SLO S-07-B-01; topic-04.mdx:94 (Grade 6 changes of state) contradicts the Grade 5 Benchmark VII; unit-assessment.mdx:125 (Grade 8 sound transmission and waves) contradicts Grade 5 SLOs S-05-B-11/12.',
      'topic-03.mdx:44 "superior retention" rests on the paper literature review and its two-month retention test rather than a reported retention result (source-checks/khan-2019-low-cost.txt).',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/efpg-402/coverage/unit-04.md maps every sub-topic U4-01..U4-05 to a topic file and a ### Explanation section with a cited source.',
      'check:depth-gate exit 0: concept coverage, required pedagogical blocks, formative floor, reading-minutes band (index 2 + 5 topics x 8 + assessment 12 = 54, within 42-61), coverage-sources consistency.',
      'specs/content/efpg-402/concepts/unit-04.md defines CON:EFPG-402-4-1..4-7 with prerequisites, SLO refs and assessment links.',
      'All five spec-mandated misconceptions are taught: topic-01.mdx:74 (expensive kits), topic-04.mdx:88 (ICT replaces practical work), topic-05.mdx:84 (field trips are only outings).',
    ],
  },
  {
    id: 'assessment',
    status: 'fail',
    evidence: [
      'assessment-solutions.md: independent solve of MCQs 1-10 gives D, B, C, C, B, B, B, B, B, B, matching unit-assessment.mdx:139-148 10/10.',
      'assessment-solutions.md: RRQs 1-10 derived answers compared with the model answers and mark schemes; all match except RRQ 2.',
      'docs/semester-4/efpg-402/unit-04/topic-01.mdx:57-61 teaches five Dale levels; unit-assessment.mdx:105 asks for four and unit-assessment.mdx:154 names Direct, Contrived, Visual, Verbal; static/img/figures/efpg-402/unit-04/fig-U4-2.svg renders four bands with second band "Demonstrations & Working Models". The key conflicts with the taught text.',
      'docs/semester-4/efpg-402/unit-assessment.mdx:129 ERQ 3 names a Grade 5 concept, but the concept is NCP Grade 6 (SLO S-06-B-37); specs/content/efpg-402/content-spec.md:268 requires a named Grade 5 concept.',
      'assessment-solutions.md: ERQ 1-5 demand Analyze, Evaluate, Create, Analyze, Evaluate; ERQ 5 is the integrative item; MCQ/RRQ/ERQ each cover all five topics; the 10/10/5 bank and bounded answers section satisfy check:no-answer-keys.',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'renders/render-inspect.log section A (desktop 1280x900): 7 pages, no heading-level jump, alt text on every image, no visible broken image, no unserved asset, no document overflow.',
      'renders/render-inspect.log section B (narrow 360x780): document horizontal overflow 0px on all pages; every wide table scrolls inside its own container with tabindex=0 and aria-label "Scrollable table, scroll sideways to see all columns".',
      'renders/render-inspect.log section C (A4 print 794px): zero clipped elements, all figures fit the page width, answers and marking guidance headings render on unit-assessment.',
      'renders/render-inspect.log section D: fig-U4-1..10 SVG text geometry clean; fig-U4-12..16 reported "variant not served" because Section D fetches .svg for raster .webp illustrations (tooling limitation, see limitations.md).',
      'renders/desktop-index.png, renders/desktop-topic-01.png, renders/narrow360-index.png, renders/narrow360-topic-01.png (full set under renders/).',
      'scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/efpg-402/unit-04/*.svg exit 0 across all 40 SVGs (logs/measure-figure-text.log).',
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
      'Every topic runs the full cycle: classroom situation, explanation, worked example, common misconception, collaborative activity, check your understanding, summary, self-assessment checklist, practicum task, summative task with a mini-rubric.',
      'Worked examples are concrete and feasible: mammalian heart sequencing (topic-01), graduated-cylinder parallax (topic-02), circuit tester (topic-03), ICT and hands-on circuits (topic-04), canal water field investigation (topic-05).',
      'Activities use low-cost local materials and pair or group work suitable for large Pakistani classrooms.',
    ],
  },
];

const findings = [
  {
    severity: 'blocking',
    resolved: false,
    message: 'Dale\'s cone level count and naming disagree across the unit. docs/semester-4/efpg-402/unit-04/topic-01.mdx:57-61 teaches five levels (Direct purposeful experiences; Contrived experiences and models; Dramatisation and demonstrations; Visual and auditory media; Verbal and text symbols). static/img/figures/efpg-402/unit-04/fig-U4-2.svg renders four bands (Direct Purposeful Experiences; Demonstrations & Working Models; Visual & Auditory Media; Verbal & Text Symbols). docs/semester-4/efpg-402/unit-04/unit-assessment.mdx:105 asks for "the four main levels" and its key at :154 names Direct, Contrived, Visual, Verbal. A candidate who answers from the taught text with five levels cannot match the 4-mark key, and the figure\'s second band name differs from the key. Repair: choose one canonical set and align the topic-01 prose, fig-U4-2 and the RRQ 2 key.',
  },
  {
    severity: 'blocking',
    resolved: false,
    message: 'ERQ 3 (docs/semester-4/efpg-402/unit-04/unit-assessment.mdx:129) is required by specs/content/efpg-402/content-spec.md:268 to design a low-cost aid for a named Grade 5 concept, but it names "Closed Electric Circuits and Electrical Conductivity", which the National Curriculum of Pakistan 2022-23 places at Grade 6 (SLO S-06-B-37, Differentiate between open and closed circuits, PDF p. 56); "electrical conductivity" is not an NCP SLO (the grid names thermal conductivity at Grade 7). Repair: relabel the item to Grade 6 or substitute a Grade 5 concept such as S-05-B-16/S-05-B-17 (flow of current, circuit diagrams).',
  },
  {
    severity: 'blocking',
    resolved: false,
    message: 'Several curriculum-grade references contradict the NCP progression grid (source-checks/ncp-science-2022-grade-check.txt). topic-03.mdx:28 says Grade 5 respiration expects diaphragm mechanics, but Grade 5 SLO S-05-A-02 excludes detailed respiratory-system knowledge and the air pathway is Grade 7 SLO S-07-A-11. topic-03.mdx:94 says Grade 5 transpiration and xylem flow, but transpiration is Grade 8 (Benchmark II) and xylem/phloem role is Grade 7 SLO S-07-A-02. topic-04.mdx:28 says Grade 8 atomic structure, but atomic structure is Grade 7 SLO S-07-B-01 (chemical bonds are Grade 8). topic-04.mdx:94 says Grade 6 changes of state, but the Grade 5 Benchmark VII covers conditions that cause matter to change state. unit-assessment.mdx:125 calls sound transmission and waves a Grade 8 topic, but sound characteristics and transmission are Grade 5 SLOs S-05-B-11/12 and waves are the Grade 8 benchmark. Repair: align every grade reference with the NCP progression grid.',
  },
  {
    severity: 'uncertain',
    resolved: false,
    message: 'render-review tooling limitation: scripts/render-inspect.mjs exited 1 on ten artifacts because Section D fetches <id>.svg and <id>.dark.svg for every placed figure, including the five raster illustrations fig-U4-12..16 (Kind: illustration, .webp), which have no SVG variants. Section A loaded all five WebP files (HTTP 200, natural 1344x756 or 1200x675, shown=true), and sections A (desktop 1280x900), B (narrow 360x780) and C (A4 print 794px) otherwise found no hard defect. The exit code is a known script limitation (specs/intelligence/daily/2026-11-20.md C1), not a content defect; the command exit code is recorded as 1 and accessibility is unverified for a machine pass.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'MCQ key distribution is skewed: B is the key for 7 of 10 items and A for none (docs/semester-4/efpg-402/unit-04/unit-assessment.mdx:139-148). All items and distractors are unambiguous, but the pattern is a weak test-design convention.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'Concept-graph assessment mappings for CON:EFPG-402-4-6 and -4-7 appear swapped: specs/content/efpg-402/concepts/unit-04.md:12 maps MCQ-09 (instructional field trip) and RRQ-09 (community resources) to Science exhibitions, and :13 maps RRQ-10 (exhibition safety inspections) to Field trips and community resources.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'Figure-plan drift: specs/content/efpg-402/content-spec.md:307 plans fig-U4-9 as "farm, clinic, workshop, river, museum", but the placed figure and topic-05.mdx:52 use "Pottery / Brick Kiln" and no museum. The figure matches the prose; the spec plan wording is the outlier.',
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'sources/unit-04.md declares khan-2019-low-cost unverifiable ("bound excerpt not committed on this host"), but the article is diamond open access and was retrieved in full for this review. Consider committing a bound excerpt or adjusting the declaration; the "superior retention" wording in topic-03.mdx:44 rests on the paper\'s literature review and its two-month retention test rather than a reported retention result.',
  },
];

const commands = [
  ['validate:content', 0, ev('logs/validate:content.log')],
  ['check:depth-gate', 0, ev('logs/check:depth-gate.log')],
  ['check:figures', 0, ev('logs/check:figures.log')],
  ['check:no-em-dash', 0, ev('logs/check:no-em-dash.log')],
  ['check:no-answer-keys', 0, ev('logs/check:no-answer-keys.log')],
  ['check:docs-sync', 0, ev('logs/check:docs-sync.log')],
  ['render-review', 1, ev('logs/render-review.txt')],
  ['check:content', 0, ev('logs/check-content.log')],
  ['measure-figure-text', 0, ev('logs/measure-figure-text.log')],
  ['build:content-status', 0, ev('logs/build-content-status.log')],
].map(([name, exit_code, log_path]) => ({ name, exit_code, log_path }));

const started = process.env.REVIEW_STARTED || '2026-11-28T04:52:19.000Z';
const report = {
  schema_version: 1,
  course_code: 'EFPG-402',
  unit_no: 4,
  stage: 'G3',
  disposition: 'revise',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'crew-job:efpg-402-u04-author',
  reviewer_run_id: 'b389e9fb-33f5-41f9-ab56-7df8fd3419e9',
  model: 'LongCat-2.5',
  started_at: started,
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  criteria,
  findings,
  commands,
  evidence_manifest: evidenceManifest,
};
writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(`Wrote ${reportPath} with ${Object.keys(evidenceManifest).length} evidence files.`);
