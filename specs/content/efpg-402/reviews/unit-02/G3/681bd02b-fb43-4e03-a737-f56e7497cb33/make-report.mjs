// Build the cycle-2 G3 report for EFPG-402 Unit 2 from the evidence in this folder.
// Run: node make-report.mjs
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const dir = fileURLToPath(new URL('.', import.meta.url));
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const runId = '681bd02b-fb43-4e03-a737-f56e7497cb33';
const reportPath = join(dir, `${runId}.json`);
const prefix = `specs/content/efpg-402/reviews/unit-02/G3/${runId}/`;

const input_manifest = JSON.parse(readFileSync(join(dir, 'manifest.json'), 'utf8')).input_manifest;

function walk(rel) {
  const out = [];
  for (const name of readdirSync(join(dir, rel))) {
    const r = rel ? `${rel}/${name}` : name;
    if (statSync(join(dir, r)).isDirectory()) out.push(...walk(r));
    else out.push(r);
  }
  return out;
}

const evidence_manifest = {};
for (const rel of walk('')) {
  if (rel === `${runId}.json`) continue;
  evidence_manifest[prefix + rel] = sha(join(dir, rel));
}

const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:746-752 Guide Unit 2 (Weeks 3-4) sections 2.1-2.5 match specs/content/efpg-402/content-spec.md:139-191 (U2-01..U2-05).',
      'docs/semester-4/efpg-402/unit-02/topic-01.mdx:38 ### Principles of science curriculum construction (U2-01); topic-02.mdx:38 ### Aims and objectives of the secondary science curriculum (U2-02); topic-03.mdx:38 ### Organisation and sequencing of content (U2-03); topic-04.mdx:38 ### Textbook analysis and evaluation (U2-04); topic-05.mdx:40 ### Correlation of science with other subjects (U2-05).',
      'docs/semester-4/efpg-402/unit-02/index.mdx:31-32 carries SLO:EFPG-402-2-1 and SLO:EFPG-402-2-2; all five topics and unit-assessment.mdx reference them.',
      'specs/content/efpg-402/coverage/unit-02.md maps U2-01..U2-05 to those exact ### sections with bound sources (ncp-science-2022, dcar-science-4-8, kochhar-science, aggarwal-science, bruner-1960).',
    ],
  },
  {
    id: 'sources',
    status: 'fail',
    evidence: [
      'specs/content/efpg-402/reviews/unit-02/G3/681bd02b-fb43-4e03-a737-f56e7497cb33/source-checks/ncp-science-2022-unit-02-search.txt: independent search of the full 74-page NCP Science progression-grid PDF (HTTP 200, 19606893 bytes, 2026-11-28).',
      'docs/semester-4/efpg-402/unit-02/topic-03.mdx:54 cites S-08-A-14 for the "complex transport system" outcome and calls it Grade 8; the published NCP has that outcome as S-07-A-15 (Grade 7) and S-08-A-14 is "Identify the three major parts of the brain". Verified on the rendered pages source-checks/ncp-science-p17.png and ncp-science-p19.png.',
      'docs/semester-4/efpg-402/unit-02/topic-04.mdx:46 quotes "plan a fair test with one variable changed" as NCP wording; the NCP names "fair test" only as one of five enquiry types (ncp-science.txt:74) and never uses "variable".',
      'Resolved from run 1: topic-03.mdx:52-54 and unit-assessment.mdx:143 now use S-04-B-02, S-05-B-05, S-06-B-11, S-04-A-17 and S-06-A-12, all of which match the published NCP text; the fabricated Grade 4/6/8 human-body wordings and "classify materials as conductors or insulators" no longer appear.',
      'specs/content/efpg-402/sources/unit-02.md:13-20 declares dcar-science-4-8, kochhar-science, aggarwal-science and bruner-1960 under ## Unverifiable sources (D-2026-0001); no blocking finding rests on them alone.',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/efpg-402/coverage/unit-02.md maps all five sub-topics U2-01..U2-05 to exact topic headings with bound sources.',
      'check:depth-gate exit 0: 5 topics, 5 sub-topics, the five topics total 42 reading-minutes (inside the 42-61 band), all required pedagogical blocks present, coverage-sources consistent.',
      'specs/content/efpg-402/concepts/unit-02.md defines 8 concepts (CON:EFPG-402-2-1..8) with prerequisites, SLO mappings and 10/10/5 item links; check:concept-graph and check:bloom-bands exit 0.',
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      'specs/content/efpg-402/reviews/unit-02/G3/681bd02b-fb43-4e03-a737-f56e7497cb33/assessment-solutions.md: independent solve of MCQs 1-10 (A, B, B, D, A, C, D, A, D, C) matches docs/semester-4/efpg-402/unit-02/unit-assessment.mdx ### MCQ answer key 10/10; key distribution A:3, B:2, C:2, D:3.',
      'docs/semester-4/efpg-402/unit-02/unit-assessment.mdx:155 RRQ 7 model answer now names Activities and Inclusivity; both are checklist criteria (run-1 finding repaired).',
      'Bank structure passes: 10 MCQs (Remember to Apply, 2 per topic), 10 RRQs (Understand to Analyze, at least one per topic), 5 ERQs (Evaluate/Create) each with an analytic rubric; ERQ 5 is integrative across all five topics; check:bloom-bands exit 0.',
      'docs/semester-4/efpg-402/unit-02/unit-assessment.mdx:143 RRQ 1 model answer cites S-06-A-12 with wording that matches the published NCP (run-1 finding repaired).',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'specs/content/efpg-402/reviews/unit-02/G3/681bd02b-fb43-4e03-a737-f56e7497cb33/logs/render-review.txt: render-review unavailable. deployed SHA b7b7e00c9a8640158b8d336ba1215e4fcfed01e9 differs from HEAD b2dc2715255b31026bf257e58e451ecbf983d001 on topic-02.mdx, topic-03.mdx, topic-04.mdx, unit-assessment.mdx and the four fig-U2-3 SVGs, so the CI-built production site is not the reviewed input. render-inspect was not run and no build, dev server or browser run was attempted.',
      'Structural accessibility passes from source: 16 Figure markers in docs/semester-4/efpg-402/unit-02/ (15 unit figures plus the banner), every one carrying descriptive alt text; heading order runs h1 to h2 to h3 with no skipped level in all seven files.',
      'measure-figure-text exits 0 across all 40 SVGs in static/img/figures/efpg-402/unit-02/.',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      'docs/semester-4/efpg-402/unit-02/index.mdx and topic-01.mdx to topic-05.mdx: plain academic sentences, terms defined at first use (curriculum, organisation, correlation, spiral), suitable for an HSC/intermediate graduate without specialist curriculum-design knowledge.',
      'Authentic Pakistani/Sindhi classroom scenarios (Sukkur, Hyderabad, Nawabshah, Thatta, Mirpurkhas, Larkana) with locally available materials.',
      'check:no-em-dash exit 0: zero em dashes in authored content.',
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'All five topics execute the full progression: classroom situation, explanation, worked example, misconception correction, collaborative activity, retrieval questions, summary, self-assessment checklist, practicum task and summative task with an analytic rubric.',
      'Common misconceptions explicitly addressed: the textbook is the curriculum (2.1, 2.4), a thicker textbook is better (2.2), science should be taught on its own (2.3, 2.5).',
      'Activities are feasible in a typical Sindh government school with textbooks, chart paper, local water and soil samples, seeds, and pair or group work.',
    ],
  },
];

const findings = [
  {
    id: 'F1',
    severity: 'blocking',
    resolved: false,
    message: 'Misattributed NCP SLO (carries run-1 F1, which is otherwise repaired). docs/semester-4/efpg-402/unit-02/topic-03.mdx:54 states that in Grade 8 pupils explain that living organisms have a "complex transport system" and cites S-08-A-14. In the published NCP Science progression grid that outcome is S-07-A-15 (Grade 7); S-08-A-14 is "Identify the three major parts of the brain - cerebrum, cerebellum, the fore brain, mid brain and hind brain". Wrong code and wrong grade, presented as an exact reference. Repair: cite S-07-A-15 and Grade 7, or substitute a real Grade 8 life-sciences SLO.',
  },
  {
    id: 'F2',
    severity: 'blocking',
    resolved: false,
    message: 'Invented NCP quotation. docs/semester-4/efpg-402/unit-02/topic-04.mdx:46 writes "If the NCP asks pupils to \'plan a fair test with one variable changed\'". The full 74-page NCP Science PDF names "fair test" only as one of the five scientific-enquiry types and never uses the word "variable". Same class as the run-1 fabricated quotations. Repair: remove the quotation marks and reframe it as the unit\'s own example, or bind the real SLO wording.',
  },
  {
    id: 'F3',
    severity: 'uncertain',
    resolved: false,
    message: 'Render and print inspection (desktop, 360px narrow, table scrolling, A4 print, figure clipping) could not be performed. deployed SHA b7b7e00c9a8640158b8d336ba1215e4fcfed01e9 differs from HEAD b2dc2715255b31026bf257e58e451ecbf983d001 on the four repaired unit files and the four fig-U2-3 SVGs, so the production build is not the reviewed input; the crew brief prohibits a local build, dev server or Playwright run. Accessibility is unverified rather than passed.',
  },
  {
    id: 'F4',
    severity: 'advisory',
    resolved: false,
    message: 'docs/semester-4/efpg-402/unit-02/topic-03.mdx:48 quotes Bruner (1960) as "any subject can be taught in some intellectually honest form to any child at any stage of development". The canonical wording, bound at specs/content/efmp-301/sources/texts/seifert2009.md:112 and :373, is "any subject can be taught effectively in some intellectually honest form...". Restore "effectively" or paraphrase without quotation marks.',
  },
  {
    id: 'F5',
    severity: 'advisory',
    resolved: false,
    message: 'The Urdu mirror propagates finding F1: i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efpg-402/unit-02/topic-03.mdx:54 also cites S-08-A-14 for the "complex transport system" outcome. G3 certifies English only, but the G5 review must check this line.',
  },
  {
    id: 'F6',
    severity: 'uncertain',
    resolved: true,
    message: 'Run-1 F2 resolved: the six aims are now disclosed as the unit\'s own synthesis. topic-02.mdx:40 states the NCP "does not state a numbered list of aims" and that the six aims are "our synthesis, not the curriculum\'s own wording"; topic-02.mdx:78, :82, :89, :93, unit-assessment.mdx:29 and the activity at topic-02.mdx:66-67 all use the same framing.',
  },
  {
    id: 'F7',
    severity: 'uncertain',
    resolved: true,
    message: 'Run-1 F3 resolved: unit-assessment.mdx:155 (RRQ 7 model answer) now names Activities and Inclusivity, both of which are checklist criteria; "relevance" is no longer offered as the second criterion.',
  },
  {
    id: 'F8',
    severity: 'advisory',
    resolved: true,
    message: 'Run-1 F5 resolved: the MCQ key distribution is now A:3, B:2, C:2, D:3 (was A:0, B:2, C:7, D:1); option A is the key for items 1, 5 and 8.',
  },
  {
    id: 'F9',
    severity: 'advisory',
    resolved: true,
    message: 'Run-1 F6 resolved: topic-04.mdx:89 now reads "a textbook can be weak on activities, language or relevance"; the unsupported "widely used" claim is gone.',
  },
  {
    id: 'F10',
    severity: 'advisory',
    resolved: true,
    message: 'Run-1 F7 resolved: topic-04.mdx:60 now says the label "esophagus" is not itself an error because the NCP prints the same spelling, and turns the point on the foreign source; the British-spelling claim is gone.',
  },
  {
    id: 'F11',
    severity: 'advisory',
    resolved: true,
    message: 'Run-1 F8 resolved: fig-U2-3.svg, fig-U2-3.dark.svg, fig-U2-3.ur.svg and fig-U2-3.ur.dark.svg now head the column "Our example (illustrative)"; the manifest alt text and topic-02.mdx:49 state the examples are written by the unit and not quoted from the curriculum.',
  },
];

const commands = [
  { name: 'validate:content', exit_code: 0, log_path: prefix + 'logs/validate:content.log' },
  { name: 'check:depth-gate', exit_code: 0, log_path: prefix + 'logs/check:depth-gate.log' },
  { name: 'check:figures', exit_code: 0, log_path: prefix + 'logs/check:figures.log' },
  { name: 'check:no-em-dash', exit_code: 0, log_path: prefix + 'logs/check:no-em-dash.log' },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: prefix + 'logs/check:no-answer-keys.log' },
  { name: 'check:docs-sync', exit_code: 0, log_path: prefix + 'logs/check:docs-sync.log' },
  { name: 'render-review', exit_code: 1, log_path: prefix + 'logs/render-review.txt' },
  { name: 'check:content', exit_code: 0, log_path: prefix + 'logs/check-content.log' },
  { name: 'measure-figure-text', exit_code: 0, log_path: prefix + 'logs/measure-figure-text.log' },
];

const report = {
  schema_version: 1,
  course_code: 'EFPG-402',
  unit_no: 2,
  stage: 'G3',
  disposition: 'revise',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:b2dc2715255b31026bf257e58e451ecbf983d001',
  reviewer_run_id: runId,
  model: 'Claude LongCat-2.5',
  started_at: '2026-11-28T07:47:00.000Z',
  completed_at: new Date().toISOString(),
  skill_digest: 'eccc4074a6f753d12663e5010e19d9b3a0f9f5c461ac8c3a22d093503345998b',
  input_manifest,
  rulings: { 'D-2026-0001': 'bfd5624024eb20bb942f84aa16e29fdb18bb0afd93455f00a066a8c3878f379d' },
  criteria,
  findings,
  commands,
  evidence_manifest,
  reviewed_commit: 'b2dc2715255b31026bf257e58e451ecbf983d001',
  limitations: [
    'No parent-prepared frozen handoff; the manifest was prepared locally at HEAD b2dc2715255b31026bf257e58e451ecbf983d001.',
    'Author run identity is the reviewed HEAD commit, which carries the cycle-1 repairs.',
    'render-review unavailable: the deployed SHA b7b7e00c9a8640158b8d336ba1215e4fcfed01e9 is not the reviewed input for this unit, so no render or print inspection was performed.',
    'The full NCP PDF used for source verification is scratch (.crew/) and is not committed; the deciding pages are committed as PNG evidence.',
    'Second and final ADR-0019 G3 cycle for this submission; any further cycle needs owner authorization in specs/decisions/log.md.',
  ],
};

writeFileSync(reportPath, JSON.stringify(report, null, 2) + '\n');
console.log(`wrote ${reportPath} with ${Object.keys(evidence_manifest).length} evidence files`);
