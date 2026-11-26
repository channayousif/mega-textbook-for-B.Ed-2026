#!/usr/bin/env node
/**
 * Build the G3 report for EFMP-409 Unit 1 from the saved evidence.
 * The input_manifest and skill_digest come from the prepared manifest, which
 * logs/input-verification.txt shows is identical to a fresh inputManifest().
 * Evidence hashes are taken from the exact saved bytes at run time.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, relative, sep } from 'node:path';

const root = resolve(process.env.CONTENT_ROOT || '.');
const out = resolve(import.meta.dirname);
const rel = (p) => relative(root, p).split(sep).join('/');
const digest = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

const prepared = JSON.parse(readFileSync(resolve(out, 'manifest.json'), 'utf8'));

const evidenceFiles = [
  'manifest.json',
  'logs/prepare.txt',
  'logs/input-verification.txt',
  'logs/validate-content.txt',
  'logs/check-depth-gate.txt',
  'logs/check-figures.txt',
  'logs/check-no-em-dash.txt',
  'logs/check-no-answer-keys.txt',
  'logs/check-docs-sync.txt',
  'logs/render-review.txt',
  'render-verify/render-verify.txt',
  'logs/check-content.txt',
  'logs/check-bloom-bands.txt',
  'logs/check-concept-graph.txt',
  'logs/check-svg-style.txt',
  'logs/check-source-floor.txt',
  'logs/check-licence.txt',
  'logs/check-pipeline-gate.txt',
  'logs/measure-figure-text.txt',
  'logs/build-content-status.txt',
  'logs/report-validation.txt',
  'source-verification.md',
  'assessment-solutions.md',
  'summary.md',
  'limitations.md',
  'advisory-tracker-row.md',
  'make-report.mjs',
];

const evidenceManifest = {};
for (const f of evidenceFiles) {
  const abs = resolve(out, f);
  if (!existsSync(abs)) throw new Error(`missing evidence file: ${f}`);
  evidenceManifest[rel(abs)] = digest(abs);
}

const commands = [
  { name: 'validate:content', exit_code: 0, log_path: rel(resolve(out, 'logs/validate-content.txt')) },
  { name: 'check:depth-gate', exit_code: 0, log_path: rel(resolve(out, 'logs/check-depth-gate.txt')) },
  { name: 'check:figures', exit_code: 0, log_path: rel(resolve(out, 'logs/check-figures.txt')) },
  { name: 'check:no-em-dash', exit_code: 0, log_path: rel(resolve(out, 'logs/check-no-em-dash.txt')) },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: rel(resolve(out, 'logs/check-no-answer-keys.txt')) },
  { name: 'check:docs-sync', exit_code: 0, log_path: rel(resolve(out, 'logs/check-docs-sync.txt')) },
  { name: 'render-review', exit_code: 1, log_path: rel(resolve(out, 'logs/render-review.txt')) },
  { name: 'check:content', exit_code: 0, log_path: rel(resolve(out, 'logs/check-content.txt')) },
  { name: 'check:bloom-bands', exit_code: 0, log_path: rel(resolve(out, 'logs/check-bloom-bands.txt')) },
  { name: 'check:concept-graph', exit_code: 0, log_path: rel(resolve(out, 'logs/check-concept-graph.txt')) },
  { name: 'check:svg-style', exit_code: 0, log_path: rel(resolve(out, 'logs/check-svg-style.txt')) },
  { name: 'check:source-floor', exit_code: 0, log_path: rel(resolve(out, 'logs/check-source-floor.txt')) },
  { name: 'check:licence', exit_code: 0, log_path: rel(resolve(out, 'logs/check-licence.txt')) },
  { name: 'check:pipeline-gate', exit_code: 0, log_path: rel(resolve(out, 'logs/check-pipeline-gate.txt')) },
  { name: 'measure-figure-text', exit_code: 0, log_path: rel(resolve(out, 'logs/measure-figure-text.txt')) },
  { name: 'build:content-status', exit_code: 0, log_path: rel(resolve(out, 'logs/build-content-status.txt')) },
];

const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'specs/content/efmp-409/content-spec.md:102-146 carries Unit 1 with status: approved and the six leaves U1-01..U1-06; the guide scheme (Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:422,434-442) and the HEC 2013 guide (course-guides-2025/FoundationsEd_Sept13.txt:928-955) agree on the unit scope.',
      'specs/content/efmp-409/coverage/unit-01.md:5-20 maps every leaf to a real ### heading that teaches it: topic-01.mdx:33,49,92; topic-02.mdx:33,62,88.',
      'docs/semester-4/efmp-409/unit-01/index.mdx:24-33 states six unit outcomes that trace to SLO:EFMP-409-1-1 and SLO:EFMP-409-1-2 (content-spec.md:106).',
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'source-verification.md: Kneller broad/technical sense, Pestalozzi and Dewey checked against the bundled HEC guide extraction (FoundationsEd_Sept13.txt:1355-1385, 1498-1505) and supported at topic-01.mdx:58-67.',
      'source-verification.md: Curren definition and policy scope re-read live 2026-11-26 and supported at topic-01.mdx:68 and topic-02.mdx:35,73.',
      'source-verification.md: OpenStax 1.1 and chapters 6-8 introductions re-read live 2026-11-26 and supported at topic-01.mdx:94-104.',
      'source-verification.md: Susanti full text PDF read 2026-11-26; tarbiyah, ta\'lim, ta\'dib and the al-Attas attribution supported at topic-01.mdx:70-78.',
      'source-verification.md: NEP 2009 PDF pages 20-21 read 2026-11-26; vision and aims 1, 4, 8, 9, 17 supported at topic-02.mdx:75,96-100,106 and unit-assessment.mdx:74,104-106.',
      'source-verification.md: QMMB page re-read live 2026-11-26; the Jinnah quotation supported at topic-02.mdx:106-111 and unit-assessment.mdx:104.',
      'sources/unit-01.md:3 declares the print anthologies and gutenberg-primary as unavailable and not bound, with no claim resting on them; no cited source is unretrievable, so no ## Unverifiable sources section is required.',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/efmp-409/coverage/unit-01.md:5-20 maps U1-01..U1-06; the content-spec Topic list (content-spec.md:124-127) partitions the same IDs across the two topic files with none unmapped.',
      'Reading estimate: index 2 + topic-01 14 + topic-02 13 + assessment 14 + teacher notes 3 = 46 minutes, inside the approved 36-48 band (check:depth-gate exit 0).',
      'Assessment spread: MCQ 1-5 / RRQ 1-5 / ERQ 1-2 sample Topic 1.1; MCQ 6-10 / RRQ 6-10 / ERQ 3-4 sample Topic 1.2; ERQ 5 integrates both (specs/content/efmp-409/concepts/unit-01.md:7-12).',
    ],
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      'assessment-solutions.md: all 10 MCQs solved independently before the supplied key was read; the derived key matches the supplied key on every letter (unit-assessment.mdx:115-124).',
      'assessment-solutions.md: RRQ model answers and mark schemes checked point by point; no scheme contradicts its question and no model states more than the unit teaches (unit-assessment.mdx:128-137).',
      'assessment-solutions.md: all five ERQ rubrics checked; totals are 10, 10, 10, 12, 12 and each rubric distinguishes performance levels (unit-assessment.mdx:141-145).',
      'ERQ 4 is the approved blueprint Analyze item on three statements by Pakistani policy-makers; its quoted statements match the bound sources (source-verification.md).',
      'check:no-answer-keys exit 0; the answer key sits only in the final ## Answers and marking guidance section.',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'render-review unavailable (exit 1): deployed SHA 074ab11456b999cf5d3c9b8aa6e603b2de834eb5 differs from HEAD 5533bee27c33bae4cdd87405b7051d2e4ee1aa92 on docs/semester-4/efmp-409/unit-01/index.mdx and static/img/figures/efmp-409/unit-01/fig-U1-5.webp, so the production build is not the reviewed input and no browser or print inspection was run (logs/render-review.txt, render-verify/render-verify.txt).',
      'Structural checks from source: all five Figure uses carry non-empty descriptive alt text; heading order is monotonic in all five files; the unit tables are rendered by the static display:block / overflow-x:auto rule in src/css/custom.css, so each table is its own scroll container.',
      'measure-figure-text exit 0 on all 16 bound unit SVGs (logs/measure-figure-text.txt); no glyph overflow, intersection or wordmark collision reported.',
      '360px scrolling, A4 print and figure clipping remain uninspected for the current bytes.',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      'All five English files read in full. The register holds for a fresh HSC/intermediate graduate: short single-idea paragraphs, a Tando Allahyar/Larkana/Hyderabad/Dadu classroom vignette before each abstraction, and technical terms defined at first use (narrow and broad meaning at topic-01.mdx:58-60, axiology at :104, aim versus objective at topic-02.mdx:90).',
      'check:no-em-dash exit 0 (logs/check-no-em-dash.txt); validate:content exit 0 (logs/validate-content.txt).',
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'The nine-part learning cycle is intact and ordered in both topic files (check:depth-gate exit 0); each carries a classroom situation, a named activity with grouping, time and materials, retrieval checks, a self-assessment checklist, a practicum task, a summative task with a rubric and a further-reading list.',
      'The approved misconceptions (content-spec.md:133) are all named and corrected: education means schooling (topic-01.mdx:62), philosophy is abstract (topic-02.mdx:60), the aim is to pass examinations (topic-02.mdx:104); unit-teacher-notes.mdx:36-42 gives handling strategies.',
      'Activities are feasible in the stated Pakistani/Sindhi context (groups of four to five, 25-30 minutes, printed cases and chart paper only), and the practicum tasks are realistic for a trainee with no authority. Progression runs classroom situation to explanation, activity, retrieval, reflection and assessment.',
    ],
  },
];

const findings = [
  {
    severity: 'uncertain',
    message: 'Render and print inspection unavailable. Deployed SHA 074ab11456b999cf5d3c9b8aa6e603b2de834eb5 differs from HEAD 5533bee27c33bae4cdd87405b7051d2e4ee1aa92 on the unit English directory and figure folder, so the CI-built production site is not the reviewed input; the brief also forbids building or serving the site from a review job. render-review is recorded as unavailable (exit 1) in logs/render-review.txt and render-verify/render-verify.txt. Narrow-viewport scrolling, A4 print clipping and visual accessibility of the current bytes remain unverified, so accessibility cannot pass and the report escalates.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message: 'Residual MCQ option-length cue (unit-assessment.mdx:34-83). The keyed option is the unique longest in 5 of the 10 items (1, 2, 4, 8, 10) and tied-longest in item 9; the item-writing reference asks for parallel options of similar length with no giveaway. No key is wrong. Optional repair: vary option length further.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message: 'topic-02.mdx:106 and unit-assessment.mdx:104 call the 1947 meeting the "first" All Pakistan Educational Conference. The bound QMMB page attributes the message to the All Pakistan Educational Conference at Karachi, 27 November 1947, and does not say "first". Either source the word or drop it.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message: 'topic-01.mdx:37 attributes the five-foundation list to "the University of Sindh course guide" with an HEC 2012/2013 citation. The list (philosophical, sociological, psychological, ideological, historical) matches the 2026 University of Sindh scheme course description (4TH SEMESTER.txt:422); the HEC 2013 guide rationale says "socio-economic" rather than "sociological" (FoundationsEd_Sept13.txt:140). Name the document that actually carries the list.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message: 'topic-01.mdx:54 writes the Latin prefix behind educere as "e-"; the bound etymonline note gives "ex-". Either quote the note or cite the dictionary form.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message: 'topic-01.mdx:104 says "Axiology (also called value theory)" and quotes Smith for the definition. OpenStax uses "value theory", not "axiology"; the equation of the two names is not Smith wording, although the HEC guide uses "the axiology of education". Name the source for the equivalence or attribute it as the unit\'s framing.',
    resolved: false,
  },
];

const report = {
  schema_version: 1,
  course_code: 'EFMP-409',
  unit_no: 1,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:claude-crew',
  author_run_id: 'agy:crew-efmp-409-u01-illustrate',
  reviewer_run_id: 'crew-efmp-409-u01-review_en-r1',
  model: 'Claude Code (model identity LongCat-2.5; exact deployment version unavailable)',
  started_at: '2026-11-25T23:20:13Z',
  completed_at: new Date().toISOString(),
  skill_digest: prepared.skill_digest,
  input_manifest: prepared.input_manifest,
  criteria,
  findings,
  commands,
  evidence_manifest: evidenceManifest,
  reviewed_commit: '5533bee27c33bae4cdd87405b7051d2e4ee1aa92',
  limitations: [
    'Render and print inspection was not performed: the deployed SHA differs from HEAD on the unit English directory and figure folder, and the brief forbids a build, dev server or Playwright e2e run from a review job. accessibility is therefore unverified and the report escalates.',
    'No parent-prepared frozen handoff or runtime provenance was supplied; the manifest was prepared locally over a clean tree and re-verified against a fresh inputManifest() computation (95 inputs, 0 mismatches).',
    'The prose was authored on crew/efmp-409-u01-author; the index banner and its Figure element were added on crew/efmp-409-u01-illustrate, which is the author_run_id recorded here.',
    'The Urdu mirror and the .ur.svg variants are G5 scope and were not read as content.',
    'Etymonline served a JavaScript and cookie challenge to the reviewer\'s fetch, so that entry was verified from the bound note; the QMMB, Curren, OpenStax, Susanti and NEP 2009 sources were re-read live or from the bundled PDF.',
    'No decision ruling is cited, so the report carries no rulings block.',
    'Advisory only: this report does not certify the unit, sign anything, append a tracker row, change translation_status, alter the registry or publish.',
  ],
};

writeFileSync(resolve(out, '..', 'crew-efmp-409-u01-review_en-r1.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`wrote report with ${Object.keys(evidenceManifest).length} evidence files`);
