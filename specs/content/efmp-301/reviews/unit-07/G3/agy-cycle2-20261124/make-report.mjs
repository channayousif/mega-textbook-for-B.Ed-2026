import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const dir = 'specs/content/efmp-301/reviews/unit-07/G3/agy-cycle2-20261124';
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

const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'Scheme-and-Course-guides/extracted-text/1st 2026.txt:1120-1135 allocates Week 12 Chapter 7 to Individual Differences and Special Needs (learning styles, slow learners, gifted learners, inclusive education).',
      'specs/content/efmp-301/content-spec.md:688-697 Sub-topic checklist (U7-1..U7-5) defines the approved G1 scope; specs/content/efmp-301/coverage/unit-07.md:8-13 maps each subtopic to a taught section.'
    ]
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'sources/texts/rohrer2012.md:1-24 binds the learning styles matched-teaching evidence verdict cited at topic-01.mdx:49-53.',
      'sources/texts/seifert2009.md:329-370 binds diversity framing, abilities as profiles, learning disability supports, giftedness, and inclusion principles.',
      'sources/texts/spielman2020.md:11-47 binds intelligence theories and multimodal instructional approaches.',
      'sources/texts/vosniadou2001.md:1-25 binds developmental and individual differences.'
    ]
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'All 5 sub-topics taught under mapped headings: U7-1 in topic-01.mdx, U7-2..U7-5 in topic-02.mdx; specs/content/efmp-301/coverage/unit-07.md:8-13.',
      'check:depth-gate exit 0 (concept coverage, required pedagogical blocks, formative floor, 73-minute reading band, coverage-sources consistency).',
      'specs/content/efmp-301/concepts/unit-07.md:15-23 defines the nine core unit concepts with SLO mappings and assessment item links.'
    ]
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      'Independent solve of all 10 MCQs before reading the key: derived 1-b, 2-b, 3-b, 4-b, 5-b, 6-c, 7-b, 8-b, 9-d, 10-b exactly matches unit-assessment.mdx:155-165.',
      'MCQ topic spread is 5/5 and RRQ topic spread is 5/5 across Topics 7.1 and 7.2, adhering to blueprint.',
      'ERQ rubrics at unit-assessment.mdx:206-247 are analytic, scored out of 20 each, with higher-order cognitive demands (Analyze, Create).'
    ]
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'render-review unavailable (exit 1): deployed SHA 98fbbb0647d5e2c6040059edcaaccc1317b620a1 differs from HEAD ac3d5e2fcd1818492dd11bc9b72d8cfed9a25e8d on the unit English files and newly placed raster illustrations; host limits and brief prohibit local build, dev server, or browser runs.',
      'Structural checks pass from source: every Figure has descriptive alt text; all SVGs carry role="img", aria-labelledby, <title>, and <desc>.',
      'measure-figure-text exits 0 across all 16 SVGs in static/img/figures/efmp-301/unit-07/.'
    ]
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      'HSC/intermediate graduate register maintained across index.mdx and topic-01..02.mdx; short sentences, direct active voice, single-concept paragraphs.',
      'Core pedagogical terms defined at first use (learning style, multimodal teaching, profile, slow learner, gifted learner, inclusion principle).'
    ]
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'Full nine-part learning cycle present and correctly sequenced in topic-01.mdx and topic-02.mdx (check:depth-gate exit 0).',
      'Classroom activities are feasible in Sindh contexts without specialised resources (wheelchair route walk, seed/leaf sorting, ability profile sketch).',
      'Clear progression from classroom vignettes to conceptual exposition, activity, retrieval, reflection, and assessment; misconception callouts directly target persistent myths.'
    ]
  }
];

const findings = [
  {
    severity: 'uncertain',
    resolved: false,
    message: 'Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: the deployed SHA 98fbbb0647d5e2c6040059edcaaccc1317b620a1 differs from HEAD ac3d5e2fcd1818492dd11bc9b72d8cfed9a25e8d on docs/semester-1/efmp-301/unit-07/ and static/img/figures/efmp-301/unit-07/. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure geometry pass from source.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'MCQ option key clustering: 8 of 10 keys remain option (b) (unit-assessment.mdx:155-165; items 1-5, 7, 8, 10 are b; item 6 is c, item 9 is d). Advisory: shuffle distractor positions in a future maintenance pass.'
  }
];

const report = {
  schema_version: 1,
  course_code: 'EFMP-301',
  unit_no: 7,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:5995f7523fb2357f51c382b6e5742e00fc24bbb3',
  reviewer_run_id: '127f7015-3eaa-44f1-891a-5a7ba95cda40',
  model: 'Gemini 3.8 Flash (Medium)',
  started_at: '2026-11-23T22:31:13.000Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  criteria,
  findings,
  commands,
  evidence_manifest
};

writeFileSync('specs/content/efmp-301/reviews/unit-07/G3/agy-cycle2-20261124.json', JSON.stringify(report, null, 2) + '\n');
console.log('Wrote report to specs/content/efmp-301/reviews/unit-07/G3/agy-cycle2-20261124.json');
