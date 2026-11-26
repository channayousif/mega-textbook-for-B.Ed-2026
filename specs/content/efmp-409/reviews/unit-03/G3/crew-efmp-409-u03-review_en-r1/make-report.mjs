#!/usr/bin/env node
/**
 * Build the G3 report for EFMP-409 Unit 3 from the prepared manifest and the
 * evidence files in this folder. Run from the repository root:
 *   node specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/make-report.mjs
 * The script only hashes bytes already on disk; it does not re-run any gate.
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const repo = join(here, '..', '..', '..', '..', '..', '..', '..');
const manifest = JSON.parse(readFileSync(join(here, 'manifest.json'), 'utf8'));

const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const rel = (p) => relative(repo, p).split('\\').join('/');

function evidenceManifest() {
  const out = {};
  const walk = (dir) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (rel(p) !== rel(join(here, 'crew-efmp-409-u03-review_en-r1.json'))) out[rel(p)] = sha(p);
    }
  };
  walk(here);
  return Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b)));
}

const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'specs/content/efmp-409/content-spec.md:195-262 carries Unit 3 with status: approved and the nineteen leaves U3-01..U3-19; the guide outline (Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:454-482) lists the same nineteen items.',
      'specs/content/efmp-409/coverage/unit-03.md:5-37 maps every leaf to a real ### heading that teaches it (31 rows, 0 missing headings).',
      'docs/semester-4/efmp-409/unit-03/index.mdx:27-35 states five unit outcomes traced to SLO:EFMP-409-3-1, SLO:EFMP-409-3-2 and SLO:EFMP-409-3-3 (content-spec.md:198-201).',
    ],
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'source-verification.md: the Curren definition was re-read live on 2026-11-26 and supports the framing at topic-02.mdx:50 and topic-01.mdx:39,72.',
      'source-verification.md: Kraut, Shields, Bertram and Hildebrand were re-read live on 2026-11-26; the Forms doctrine, eudaimonia, negative education and the five inquiry phases are supported at topic-01.mdx:51, topic-02.mdx:44, topic-03.mdx:56 and topic-04.mdx:57-62.',
      'source-verification.md: the Cheddadi bound note supports at-tadrij, malaka and the prohibition of harshness at topic-04.mdx:71-77 and topic-06.mdx:63,74-75,110.',
      'source-verification.md: the Iqbal Cyber Library bound note supports Khudi, tag-o-dou, aql/ishq, the murshid and the Shaheen at topic-05.mdx:41-73; the Bang-e-Dra verses are web-verified.',
      'sources/unit-03.md:3 declares the print anthologies and gutenberg-primary as unavailable and not bound, with no claim resting on them; no cited source is unretrievable, so no ## Unverifiable sources section is required.',
    ],
  },
  {
    id: 'coverage',
    status: 'fail',
    evidence: [
      'specs/content/efmp-409/coverage/unit-03.md:52 assigns MCQ-07 to U3-12 (Ibn Khaldun), but unit-assessment.mdx:67-71 makes MCQ-07 a Dewey item (the Badin salinity inquiry).',
      'specs/content/efmp-409/coverage/unit-03.md:54-55 and specs/content/efmp-409/concepts/unit-03.md:16-17 assign MCQ-08 and MCQ-09 to U3-14 and U3-15 (Iqbal), but unit-assessment.mdx:72-81 make both items Ibn Khaldun (punishment; al-tadarruj).',
      'specs/content/efmp-409/content-spec.md:262 requires MCQs >= 1 per topic; the bank leaves topic 3.5 without an MCQ because MCQ-10 is assigned to U3-17 in topic 3.6.',
    ],
  },
  {
    id: 'assessment',
    status: 'fail',
    evidence: [
      'assessment-solutions.md: all 10 MCQs were solved independently before the key was read; the derived key matches the supplied key on every letter (unit-assessment.mdx:113-122).',
      'assessment-solutions.md: the key is B in 9 of 10 items and the keyed option is the longest option in 9 of 10, a giveaway the item-writing reference forbids (unit-assessment.mdx:37-86; .claude/skills/author-unit/references/item-writing.md:27-28).',
      'assessment-solutions.md: RRQ model answers and ERQ rubrics checked point by point; totals are 10, 10, 10, 12, 12 and each rubric distinguishes performance levels (unit-assessment.mdx:126-161).',
      'topic-06.mdx:138-140 carries three Check your understanding items with no Bloom tag; Constitution Art. III.3 requires a tag on every assessment item.',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'render-review unavailable (exit 1): deployed SHA 074ab11456b999cf5d3c9b8aa6e603b2de834eb5 differs from HEAD 895cc30bc6b9edbc87b56365f50f479c8939d049 on docs/semester-4/efmp-409/unit-03/index.mdx and static/img/figures/efmp-409/unit-03/fig-U3-13.webp, so the production build is not the reviewed input and no browser or print inspection was run (logs/render-review.txt, render-verify/render-verify.txt).',
      'Structural checks from source: every Figure use carries non-empty descriptive alt text; heading order is monotonic in all eight files; each English SVG <desc> equals its page alt (12 of 12); the unit tables use the static display:block / overflow-x:auto rule in src/css/custom.css.',
      'measure-figure-text exit 0 on all 48 unit SVGs (logs/measure-figure-text.txt); no glyph overflow, intersection or wordmark collision reported.',
      '360px scrolling, A4 print and figure clipping remain uninspected for the current bytes.',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      'All eight English files were read in full. The register holds for a fresh HSC/intermediate graduate: short single-idea paragraphs, a Hyderabad/Larkana/Mirpur Khas/Thatta/Badin/Sukkur classroom vignette before each abstraction, and technical terms defined at first use (idealism at topic-01.mdx:39, eudaimonia and habituation at topic-02.mdx:44-45, negative education at topic-03.mdx:56, at-tadrij and malaka at topic-04.mdx:71-76, Khudi and aql/ishq at topic-05.mdx:41-63).',
      'check:no-em-dash exit 0 (logs/check:no-em-dash.txt); validate:content exit 0 (logs/validate:content.txt).',
      'Advisory A8: sociopedagogy, theocentric, anthropocentric and reconstructionism are used at topic-06.mdx:45-63 and unit-teacher-notes.mdx:23 without a definition or a glossary.json entry.',
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'The nine-part learning cycle is intact and ordered in all six topic files (check:depth-gate exit 0); each carries a classroom situation, a named activity with grouping, time and materials, retrieval checks, a self-assessment checklist, a practicum task, a summative task with a mini-rubric and a further-reading list.',
      'The four approved misconceptions (content-spec.md:243) are named and corrected: idealism means being unrealistic (topic-01.mdx:47), naturalism means letting children do whatever they like (topic-03.mdx:47), Islamic and Western thought have nothing in common (topic-06.mdx:71-81), and Ibn Khaldun was a pragmatist in Dewey\'s sense (topic-04.mdx:79).',
      'Activities are feasible in the stated Pakistani/Sindhi context (pairs or groups of three to four, 20-25 minutes, printed cases, chart paper, magnifying glasses and local specimens only), and the practicum tasks are realistic for a trainee with no authority.',
    ],
  },
];

const findings = [
  {
    severity: 'blocking',
    message: 'MCQ answer-key pattern (unit-assessment.mdx:37-86, key at :113-122). The key is B for 9 of the 10 items (only item 7 is A; no C or D key at all), and the keyed option is the longest option in 9 of the 10 items (item 1 tied-longest, item 7 not). The item-writing reference names "the longest option being correct" as a giveaway to avoid. A learner who always picks the longest B option scores 9/10 without reading the unit. Repair: reorder options so the key is balanced across A-D and no option-length cue remains.',
    resolved: false,
  },
  {
    severity: 'blocking',
    message: 'Assessment trace mis-mapping. specs/content/efmp-409/coverage/unit-03.md:52 assigns MCQ-07 to U3-12 (Ibn Khaldun), and :54-55 assign MCQ-08 and MCQ-09 to U3-14 and U3-15 (Iqbal); specs/content/efmp-409/concepts/unit-03.md:15-17 repeats the assignments. The actual items are MCQ-07 Dewey, MCQ-08 and MCQ-09 Ibn Khaldun, and MCQ-10 Iqbal. Repair: re-map MCQ-07 to U3-11, MCQ-08 and MCQ-09 to U3-12, and MCQ-10 to U3-14 or U3-17 as the content actually supports.',
    resolved: false,
  },
  {
    severity: 'blocking',
    message: 'MCQ per-topic spread. The approved blueprint (specs/content/efmp-409/content-spec.md:262) requires MCQs >= 1 per topic. As written, the ten MCQs leave one of topics 3.5 and 3.6 without an MCQ (the only candidate, MCQ-10, is assigned by the coverage matrix to U3-17 in topic 3.6, so topic 3.5 has none). Repair: reassign or add an item so every topic carries at least one MCQ.',
    resolved: false,
  },
  {
    severity: 'blocking',
    message: 'Missing Bloom tags in topic 3.6. docs/semester-4/efmp-409/unit-03/topic-06.mdx:138-140 carries three ## Check your understanding items with no Bloom tag, while every other topic tags all three. Constitution Art. III.3 requires every assessment item to carry a Bloom tag, and check:bloom-bands only scans unit-assessment.mdx, so the gate passes over the omission. Repair: tag the three items.',
    resolved: false,
  },
  {
    severity: 'uncertain',
    message: 'Render and print inspection unavailable. Deployed SHA 074ab11456b999cf5d3c9b8aa6e603b2de834eb5 differs from HEAD 895cc30bc6b9edbc87b56365f50f479c8939d049 on docs/semester-4/efmp-409/unit-03/index.mdx and static/img/figures/efmp-409/unit-03/fig-U3-13.webp, so the CI-built production site is not the reviewed input; the brief also forbids building or serving the site from a review job. render-review is recorded as unavailable (exit 1) in logs/render-review.txt and render-verify/render-verify.txt. Narrow-viewport scrolling, A4 print clipping and visual accessibility of the current bytes remain unverified, so accessibility cannot pass and the report escalates.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message: 'Terminology inconsistency. The unit switches between at-tadrij (topic-04.mdx:71,112,119,123,129,144) and al-tadarruj (unit-teacher-notes.mdx:30; unit-assessment.mdx:79,121), and between malaka (topic-04.mdx:76) and malakah (topic-06.mdx:110; unit-assessment.mdx:29,149). The style guide asks for one term per concept within a unit.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message: 'Iqbal quotation presented as verbatim. topic-05.mdx:63 writes "As Iqbal wrote: \"Intellect without love is demonic; intellect with love is divine.\"" Web and encyclopaedic sources circulate the sentence as Iqbal\'s, but none traces it to a named work; it reads as a paraphrase of the aql/ishq synthesis. Attribute it as a paraphrase or source the wording.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message: 'Sources declaration inaccurate. sources/unit-03.md:3 states "quotations are under 15 words and cited". The Emile opening at topic-03.mdx:51 is 20 words and the Dewey definition at topic-04.mdx:56 is 24 words. Both are public-domain primary works attributed to the author, so this is an inaccurate declaration rather than a copyright problem.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message: 'Figure manifest alt typo. specs/content/efmp-409/figures/unit-03.md:11 records the fig-U3-5 alt text as "sensORY training"; the placed SVG <desc>, the page alt (topic-03.mdx:31) and the manifest row disagree. The placed asset says "sensory".',
    resolved: false,
  },
  {
    severity: 'advisory',
    message: 'Practical-work attribution. unit-teacher-notes.mdx:50 says "The HEC course guide mandates four categories of practical coursework for Unit 3". The guide\'s Unit 3 section lists teaching methodology only (FoundationsEd_Sept13.txt:1030-1033); the four categories are the unit\'s own framing of the course-level approaches at :696-706. Imprecise attribution, not a misquotation.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message: 'SEP scope. The SEP entries cited for U3-02, U3-03, U3-04, U3-05, U3-08 and U3-09 do not contain the educational detail the unit teaches (Plato\'s curriculum stages, Aristotle\'s habituation and public schooling, Rousseau\'s age stages). The detail is attributed in prose to the named primary works (The Republic, Nicomachean Ethics, Politics, Emile), which is defensible, but the sources table presents the SEP entries as the support for those leaves.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message: 'Stale citation years in topic-06. topic-06.mdx:183-190 cites Bertram (2020), Curren (2018), Hildebrand (2021), Kraut (2022) and Shields (2022), while topics 3.1 to 3.5, the sources table and the live SEP entries give Bertram 2010/2023, Curren 2025, Hildebrand 2018/2024, Kraut 2004/2026 and Shields 2008/2020.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message: 'Undefined specialised terms. topic-06.mdx:45-63 and unit-teacher-notes.mdx:23 use sociopedagogy, theocentric, anthropocentric and reconstructionism without a definition, and glossary.json has no entry for them. The surrounding prose carries the meaning, but the HSC register rule (Constitution Art. III.1) is strained.',
    resolved: false,
  },
];

const commands = [
  { name: 'validate:content', exit_code: 0, log_path: 'specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/validate:content.txt' },
  { name: 'check:depth-gate', exit_code: 0, log_path: 'specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:depth-gate.txt' },
  { name: 'check:figures', exit_code: 0, log_path: 'specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:figures.txt' },
  { name: 'check:no-em-dash', exit_code: 0, log_path: 'specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:no-em-dash.txt' },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: 'specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:no-answer-keys.txt' },
  { name: 'check:docs-sync', exit_code: 0, log_path: 'specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:docs-sync.txt' },
  { name: 'render-review', exit_code: 1, log_path: 'specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/render-review.txt' },
  { name: 'check:content', exit_code: 0, log_path: 'specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check-content.txt' },
  { name: 'check:concept-graph', exit_code: 0, log_path: 'specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:concept-graph.txt' },
  { name: 'check:bloom-bands', exit_code: 0, log_path: 'specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:bloom-bands.txt' },
  { name: 'check:source-floor', exit_code: 0, log_path: 'specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:source-floor.txt' },
  { name: 'check:licence', exit_code: 0, log_path: 'specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:licence.txt' },
  { name: 'check:svg-style', exit_code: 0, log_path: 'specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:svg-style.txt' },
  { name: 'check:pipeline-gate', exit_code: 0, log_path: 'specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/check:pipeline-gate.txt' },
  { name: 'measure-figure-text', exit_code: 0, log_path: 'specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/measure-figure-text.txt' },
  { name: 'build:content-status', exit_code: 0, log_path: 'specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1/logs/build-content-status.txt' },
];

const report = {
  schema_version: 1,
  course_code: 'EFMP-409',
  unit_no: 3,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:claude-crew',
  author_run_id: 'agy:crew-efmp-409-u03-illustrate',
  reviewer_run_id: 'crew-efmp-409-u03-review_en-r1',
  model: 'Claude Code (model identity LongCat-2.5; exact deployment version unavailable)',
  started_at: '2026-11-26T00:33:13Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  criteria,
  findings,
  commands,
  evidence_manifest: evidenceManifest(),
  reviewed_commit: '895cc30bc6b9edbc87b56365f50f479c8939d049',
  limitations: [
    'Render and print inspection was not performed: the deployed SHA differs from HEAD on the unit English directory and figure folder, and the brief forbids a build, dev server or Playwright e2e run from a review job. accessibility is therefore unverified and the report escalates.',
    'No parent-prepared frozen handoff or runtime provenance was supplied; the manifest was prepared locally over a clean tree and re-verified against a fresh inputManifest() computation (113 inputs, 0 mismatches).',
    'The prose was authored on crew/efmp-409-u03-author; the index banner was added on crew/efmp-409-u03-illustrate, which is the author_run_id recorded here.',
    'The Urdu mirror and the .ur.svg variants are G5 scope and were not read as content.',
    'The Stanford Encyclopedia entries are philosophy entries, not education entries; the educational detail is attributed in prose to named primary works. The Cheddadi article was verified from its bound note and Crossref record, not re-fetched in full.',
    'No decision ruling is cited, so the report carries no rulings block.',
    'Advisory only: this report does not certify the unit, sign anything, append a tracker row, change translation_status, alter the registry or publish.',
  ],
};

const out = join(here, 'crew-efmp-409-u03-review_en-r1.json');
writeFileSync(out, JSON.stringify(report, null, 2) + '\n');
console.log(`wrote ${rel(out)} with ${Object.keys(report.evidence_manifest).length} evidence files`);
