#!/usr/bin/env node
/**
 * Build the EFMP-408 Unit 1 G3 cycle-2 report and hash its evidence.
 * Run from the repository root:
 *   node specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r2/make-report.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { rulingDigest } from '../../../../../../../scripts/lib/review-evidence.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolveHere(here);
function resolveHere(p) {
  // <root>/specs/content/efmp-408/reviews/unit-01/G3/<run-id>
  return join(p, '..', '..', '..', '..', '..', '..', '..');
}
const sha256 = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const rel = (p) => relative(root, p).split(sep).join('/');

const manifest = JSON.parse(readFileSync(join(here, 'manifest.json'), 'utf8'));
const REPORT = join(here, '..', 'crew-efmp-408-u01-review_en-r2.json');

const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'specs/content/efmp-408/content-spec.md:87-101 is the approved G1 Unit 1 scope (frontmatter status: approved; U1-01..U1-09); Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:216-224 lists the same Week 1 and Week 2 subtopics; specs/content/efmp-408/coverage/unit-01.md:5-25 maps every sub-topic to a taught heading.',
      'The guide requires NPSTP Standard 5 (content-spec.md:75-83); it is now bound to U1-02 at sources/unit-01.md:10 and coverage/unit-01.md:11.'
    ]
  },
  {
    id: 'sources',
    status: 'pass',
    evidence: [
      'sources/texts/hec-2013-classroom-assessment.md:10-14 supports topic-01.mdx:41-95 and topic-02.mdx:39-79; topic-01.mdx:41 now quotes the note\'s own definition.',
      'sources/texts/hec-2013-testdev.md:11-13 supports the appraisal definition (topic-01.mdx:78) and the reference-frame passages (topic-03.mdx:53-81).',
      'sources/texts/seifert-sutton-2009.md:10-14 supports topic-01.mdx:91, topic-02.mdx:60 and topic-03.mdx:53,73.',
      'sources/texts/npstp-2009.md:10-13 supports topic-01.mdx:55, unit-assessment.mdx:142 and :155; npstp-2009 is bound at sources/unit-01.md:10 and coverage/unit-01.md:11.',
      'sources/unit-01.md:15 declares scheerens-2003 unverifiable with the attempt, date and owner ruling D-2026-0001 (specs/decisions/log.md:1-21); prose uses it only for the systemic evaluation concept (topic-01.mdx:43,62).'
    ]
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'All nine sub-topics are taught: U1-01..U1-04 topic-01.mdx:39-97; U1-05..U1-06 topic-02.mdx:39-79; U1-07..U1-09 topic-03.mdx:39-97; specs/content/efmp-408/coverage/unit-01.md:5-25.',
      'check:depth-gate exit 0 (concept coverage, required blocks, formative floor, reading-minutes band, coverage-sources consistency); check:concept-graph exit 0.',
      'specs/content/efmp-408/concepts/unit-01.md:5-14 carries eight concepts with prerequisites, SLO refs and derived assessment item IDs.'
    ]
  },
  {
    id: 'assessment',
    status: 'pass',
    evidence: [
      'Independent solve of all 10 MCQs before reading the key matches unit-assessment.mdx:152-161; see assessment-solutions.md.',
      'Formative bank is now 9 items, 3 per topic, all Remember/Understand/Apply (topic-01.mdx:121-123; topic-02.mdx:105-107; topic-03.mdx:120-122), matching content-spec.md:98 and D-2026-0072.',
      'MCQ key A1/B3/C4/D2; RRQ 4 is Understand (unit-assessment.mdx:106); all RRQ tags sit inside Understand-to-Analyze; ERQ 4 is the blueprint three-axis Analyze item and each ERQ rubric distinguishes performance and support.'
    ]
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'render-review unavailable (exit 1): deployed SHA 7d1ba965530b409ac8e425d07bf86ec24930310d differs from HEAD 7fb77de68f5d59bbc507e85c07a892a3cbf93eca on topic-01.mdx, topic-02.mdx, topic-03.mdx and unit-assessment.mdx; no build, server or browser run is permitted.',
      'Structural checks from source: all seven Figure uses carry non-empty alt text; all 24 SVGs carry role="img", aria-labelledby, <title> and <desc>; heading order is monotonic; index.mdx:49-51 uses descriptive link text.',
      'measure-figure-text exit 0 on all 24 SVGs (logs/measure-figure-text.txt); no glyph overflow or wordmark collision reported.'
    ]
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      'HSC/intermediate-graduate register held across index.mdx and topic-01..03.mdx; short sentences, active voice, one concept per paragraph.',
      'Technical terms are defined at first use: test, measurement, appraisal (topic-01.mdx:71-78), formative and summative (topic-02.mdx:39-66), norm- and criterion-referenced (topic-03.mdx:51-81), feedforward (topic-02.mdx:50-53).',
      'Worked examples show rather than assert: Asim 28/40 read three ways (topic-01.mdx:80-87) and the 72% score under two frames (fig-U1-3, topic-03.mdx:35).'
    ]
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'Full nine-part learning cycle present and ordered in all three topic files (check:depth-gate exit 0).',
      'Activities are feasible in Pakistani teacher-training contexts with ordinary materials (conceptual sorting, slate check, feedforward rewrite, reference-frame workshop) and carry usable instructions and grouping.',
      'Progression runs classroom situation to explanation, activity, retrieval, reflection and assessment; the three content-spec misconceptions are named and cleared in blockquote blocks.'
    ]
  }
];

const findings = [
  {
    severity: 'uncertain',
    resolved: false,
    message: 'Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: deployed SHA 7d1ba965530b409ac8e425d07bf86ec24930310d differs from HEAD 7fb77de68f5d59bbc507e85c07a892a3cbf93eca on docs/semester-4/efmp-408/unit-01/topic-01.mdx, topic-02.mdx, topic-03.mdx and unit-assessment.mdx. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure geometry pass from source.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'sources/unit-01.md:20 says the shared npstp-2009 note (notes 1 and 3) binds the Unit 1 claims, but the MCQ 4 rationale (unit-assessment.mdx:155) also rests on note 4 and ERQ 5 (unit-assessment.mdx:142) on note 2. The claims themselves are supported; tighten the parenthetical so the provenance is complete.'
  },
  {
    severity: 'advisory',
    resolved: false,
    message: 'specs/content/efmp-408/content-spec.md:100 still lists Unit 1 mapped readings as hec-2013-classroom-assessment, hec-2013-testdev, seifert-sutton-2009 and scheerens-2003, while the unit now also cites npstp-2009 (sources/unit-01.md:10; coverage/unit-01.md:11). The approved content-spec is frozen, so record an owner ruling or update the spec.'
  }
];

const commandLog = (name, exit_code, log) => ({ name, exit_code, log_path: `specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r2/logs/${log}` });
const commands = [
  commandLog('validate:content', 0, 'validate-content.txt'),
  commandLog('check:depth-gate', 0, 'check-unit-depth.txt'),
  commandLog('check:figures', 0, 'check-figures.txt'),
  commandLog('check:no-em-dash', 0, 'check-no-em-dash.txt'),
  commandLog('check:no-answer-keys', 0, 'check-no-answer-keys.txt'),
  commandLog('check:docs-sync', 0, 'check-docs-sync.txt'),
  commandLog('render-review', 1, 'render-review.txt'),
  commandLog('check:content', 0, 'check-content.txt'),
  commandLog('check:bloom-bands', 0, 'check-bloom-bands.txt'),
  commandLog('check:concept-graph', 0, 'check-concept-graph.txt'),
  commandLog('check:svg-style', 0, 'check-svg-style.txt'),
  commandLog('measure-figure-text', 0, 'measure-figure-text.txt'),
  commandLog('build:content-status', 0, 'build-content-status.txt')
];

const evidence_manifest = {};
(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else evidence_manifest[rel(p)] = sha256(p);
  }
})(here);

const report = {
  schema_version: 1,
  course_code: 'EFMP-408',
  unit_no: 1,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:claude',
  author_run_id: 'claude:crew-efmp-408-u01-repair_en',
  reviewer_run_id: 'crew-efmp-408-u01-review_en-r2',
  model: 'LongCat-2.5',
  started_at: '2026-11-25T18:01:00Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  rulings: { 'D-2026-0001': rulingDigest(root, 'D-2026-0001') },
  criteria,
  findings,
  commands,
  evidence_manifest,
  reviewed_commit: '7fb77de68f5d59bbc507e85c07a892a3cbf93eca',
  limitations: [
    'Render and print inspection not performed: the deployed SHA differs from HEAD on four unit files, and the brief prohibits build, server and Playwright.',
    'Manifest prepared locally over a clean tree and verified against a fresh inputManifest() computation; no dispatcher-supplied frozen handoff or runtime identities were provided.',
    'Urdu mirror and .ur.svg variants are G5 scope and were not evaluated.',
    'No new external source retrieval; the Scheerens text remains unread under its D-2026-0001 declaration.',
    'The approved content-spec is frozen, so its Unit 1 mapped-readings line was not edited.'
  ]
};

writeFileSync(REPORT, JSON.stringify(report, null, 2) + '\n');
console.log(`Wrote ${rel(REPORT)} with ${Object.keys(evidence_manifest).length} evidence files.`);
