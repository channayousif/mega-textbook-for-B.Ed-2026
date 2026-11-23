import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

const root = process.cwd();
const dir = 'specs/content/efmp-301/reviews/unit-04/G3/crew-cycle2-20261124';
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
  { id: 'authority', status: 'pass', evidence: [
    'Scheme-and-Course-guides/extracted-text/1st 2026.txt:1099-1110 allots Weeks 8-9 to Chapter 4 (attention and perception; memory and information processing; thinking, problem-solving and reasoning; class activities).',
    'specs/content/efmp-301/content-spec.md:577-586 Sub-topic checklist (U4-1..U4-8) is the approved G1 scope; specs/content/efmp-301/coverage/unit-04.md:8-16 maps every sub-topic to a taught heading.',
  ] },
  { id: 'sources', status: 'pass', evidence: [
    'sources/texts/spielman2020.md:11-47 binds Section 5.1 (sensation versus perception, attention, the gorilla study "nearly half") and Section 8.1 (encoding, storage, retrieval, sensory/working/long-term memory, Cowan 4 plus or minus 1).',
    'sources/texts/seifert2009.md:428-451 binds the Chapter 9 problem-solving passage (algorithms, heuristics, functional fixedness and response set, problem analysis, working backwards, analogical thinking).',
    'sources/texts/ariel2018.md:14-30 binds the retrieval-practice and spacing passages cited at topic-02.mdx:91-105.',
    'sources/unit-04.md:20-28 lists Vosniadou under Further reading only (no coverage binding); coverage/unit-04.md carries no vosniadou row and no unit prose cites it.',
  ] },
  { id: 'coverage', status: 'pass', evidence: [
    'All 8 sub-topics taught under the mapped headings: U4-1/U4-2 topic-01.mdx, U4-3/U4-4 topic-02.mdx, U4-5..U4-8 topic-03.mdx; specs/content/efmp-301/coverage/unit-04.md:8-16.',
    'check:depth-gate exit 0 (concept coverage, required blocks, formative floor, reading-minutes band, coverage-sources consistency).',
    'specs/content/efmp-301/concepts/unit-04.md:15-25 carries the eleven concepts with SLO refs and derived assessment item IDs.',
  ] },
  { id: 'assessment', status: 'pass', evidence: [
    'Independent solve of all 10 MCQs before reading the key: derived 1-a, 2-b, 3-d, 4-b, 5-d, 6-c, 7-a, 8-c, 9-a, 10-d matches unit-assessment.mdx:162-173; option positions a3/b2/c2/d3.',
    'MCQ topic spread 4/3/3 and RRQ spread 3/4/3 match content-spec.md:651-654; bank is 10/10/5, all Bloom-tagged.',
    'ERQ rubrics at unit-assessment.mdx:208-251 are analytic, 20 marks each, at least one Analyze-or-higher criterion.',
  ] },
  { id: 'accessibility', status: 'unverified', evidence: [
    'render-review unavailable (exit 1): deployed SHA dc60264d97702a5e9488670b1802651e21ee91eb differs from HEAD 98fbbb0647d5e2c6040059edcaaccc1317b620a1 on the unit English files and five figures; no build, server or browser run is permitted.',
    'Structural checks pass from source: every Figure carries descriptive alt text; every SVG carries role="img", aria-labelledby, <title> and <desc>.',
    'measure-figure-text exits 0 on all 24 SVGs; two cosmetic wordmark collisions reported on the Urdu fig-U4-5 variants.',
  ] },
  { id: 'readability', status: 'pass', evidence: [
    'HSC/intermediate-graduate register held across index.mdx and topic-01..03.mdx; short sentences, active voice, one concept per paragraph.',
    'Core terms defined at first use (attention, sensation versus perception, encoding, storage, retrieval, algorithm, heuristic, inductive, deductive).',
  ] },
  { id: 'pedagogy', status: 'pass', evidence: [
    'Full nine-part learning cycle present and ordered in all three topic files (check:depth-gate exit 0).',
    'Activities are feasible in Pakistani teacher-training contexts with usable instructions and ordinary materials (attention audit, span test, name-the-move).',
    'Progression runs classroom situation to explanation, activity, retrieval, reflection and assessment; misconception blocks name and clear the target myths.',
  ] },
];

const findings = [
  { severity: 'uncertain', resolved: false, message: 'Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: the deployed SHA dc60264d97702a5e9488670b1802651e21ee91eb differs from HEAD 98fbbb0647d5e2c6040059edcaaccc1317b620a1 on docs/semester-1/efmp-301/unit-04/ and five figure assets. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure geometry pass from source.' },
  { severity: 'advisory', resolved: false, message: 'Carried from run001 and not carried by the 2026-11-08 desk pass: topic-01.mdx:72-73 states attention "flags with sustained use" and is "shortest exactly where schools demand it most: in hot rooms, after lunch, in the last period" as a flat generalisation with no bound source. The classroom observations are uncontroversial; anchoring the claim or softening it would remove the last uncited generalisation. Owner may accept as is.' },
  { severity: 'advisory', resolved: false, message: 'Cosmetic figure geometry: node scripts/measure-figure-text.mjs (exit 0) reports two wordmark collisions on static/img/figures/efmp-301/unit-04/fig-U4-5.ur.svg and fig-U4-5.ur.dark.svg (a panel edge overlaps the wordmark by 86.3 x 3.0 px). The tool classifies these as reported, not failed; the English variants are clean.' },
];

const report = {
  schema_version: 1,
  course_code: 'EFMP-301',
  unit_no: 4,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:claude',
  author_run_id: 'commit:d212d7590987be9c841693ae7910b56220f06ea0',
  reviewer_run_id: 'crew-cycle2-20261124',
  model: 'LongCat-2.5',
  started_at: '2026-11-23T20:05:00Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  criteria,
  findings,
  commands,
  evidence_manifest,
};

writeFileSync(`${dir}/../crew-cycle2-20261124.json`, JSON.stringify(report, null, 2) + '\n');
console.log('wrote report with', Object.keys(evidence_manifest).length, 'evidence files and', Object.keys(manifest.input_manifest).length, 'inputs');
