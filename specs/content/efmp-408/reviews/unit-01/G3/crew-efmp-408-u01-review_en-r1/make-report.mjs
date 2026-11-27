import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const root = process.cwd();
const dir = 'specs/content/efmp-408/reviews/unit-01/G3/crew-efmp-408-u01-review_en-r1';
const manifest = JSON.parse(readFileSync(`${dir}/manifest.json`, 'utf8'));
const sha = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

const evidenceFiles = [
  `${dir}/manifest.json`,
  `${dir}/summary.md`,
  `${dir}/limitations.md`,
  `${dir}/assessment-solutions.md`,
  `${dir}/advisory-tracker-row.md`,
  `${dir}/make-report.mjs`,
  `${dir}/logs/input-verification.txt`,
  `${dir}/logs/validate-content.txt`,
  `${dir}/logs/check-depth-gate.txt`,
  `${dir}/logs/check-figures.txt`,
  `${dir}/logs/check-no-em-dash.txt`,
  `${dir}/logs/check-no-answer-keys.txt`,
  `${dir}/logs/check-docs-sync.txt`,
  `${dir}/logs/render-review.txt`,
  `${dir}/logs/check-content.txt`,
  `${dir}/logs/build-content-status.txt`,
  `${dir}/logs/measure-figure-text.txt`,
];
const evidence_manifest = Object.fromEntries(evidenceFiles.map((p) => [p, sha(p)]));

const commands = [
  { name: 'validate:content', exit_code: 0, log_path: `${dir}/logs/validate-content.txt` },
  { name: 'check:depth-gate', exit_code: 0, log_path: `${dir}/logs/check-depth-gate.txt` },
  { name: 'check:figures', exit_code: 0, log_path: `${dir}/logs/check-figures.txt` },
  { name: 'check:no-em-dash', exit_code: 0, log_path: `${dir}/logs/check-no-em-dash.txt` },
  { name: 'check:no-answer-keys', exit_code: 0, log_path: `${dir}/logs/check-no-answer-keys.txt` },
  { name: 'check:docs-sync', exit_code: 0, log_path: `${dir}/logs/check-docs-sync.txt` },
  { name: 'render-review', exit_code: 1, log_path: `${dir}/logs/render-review.txt` },
  { name: 'check:content', exit_code: 0, log_path: `${dir}/logs/check-content.txt` },
  { name: 'measure-figure-text', exit_code: 0, log_path: `${dir}/logs/measure-figure-text.txt` },
];

const criteria = [
  { id: 'authority', status: 'pass', evidence: [
    'Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:216-224 allots Week 1 (concept of assessment vs evaluation; purpose and importance; key terms measurement, test, appraisal; role in teaching-learning) and Week 2 (formative vs summative; diagnostic and placement; norm- vs criterion-referenced) to EFMP-408.',
    'specs/content/efmp-408/content-spec.md:87-101 is the approved G1 Unit 1 scope (frontmatter status: approved; U1-01..U1-09); specs/content/efmp-408/coverage/unit-01.md:5-25 maps every sub-topic to a taught heading.',
  ] },
  { id: 'sources', status: 'pass', evidence: [
    'sources/texts/hec-2013-classroom-assessment.md:8-18 binds the Week 1-2 definitions, purpose, formative/summative and diagnostic/placement passages; topic-01.mdx:41-95 and topic-02.mdx:39-79 stay within them.',
    'sources/texts/hec-2013-testdev.md:8-16 binds testing, measurement/appraisal/evaluation and the norm- vs criterion-referenced distinction; topic-03.mdx:44-97 stays within them.',
    'sources/texts/seifert-sutton-2009.md:8-14 binds assessment embedded in all phases and the two reference frames; cited at topic-01.mdx:91 and topic-03.mdx:53,73.',
    'sources/unit-01.md:12-14 declares scheerens-2003 unverifiable under D-2026-0001; prose uses it only for the systemic evaluation/monitoring concept (topic-01.mdx:43,62), which the declaration permits.',
    'topic-01.mdx:55 cites NPSTP Standard 5; the course excerpt sources/texts/npstp-2009.md supports the claim but is scoped to Unit 6, so it is outside this G3 bundle (advisory finding).',
  ] },
  { id: 'coverage', status: 'pass', evidence: [
    'All nine sub-topics are taught: U1-01..U1-04 topic-01.mdx:39-97; U1-05..U1-06 topic-02.mdx:39-79; U1-07..U1-09 topic-03.mdx:39-97; specs/content/efmp-408/coverage/unit-01.md:5-25.',
    'check:depth-gate exit 0 (concept coverage, required blocks, formative floor, reading-minutes band 83 inside 70-95, coverage-sources consistency).',
    'specs/content/efmp-408/concepts/unit-01.md:5-14 carries eight concepts with prerequisites, SLO refs and derived assessment item IDs.',
  ] },
  { id: 'assessment', status: 'fail', evidence: [
    'Independent solve of all 10 MCQs before reading the key matches unit-assessment.mdx:152-161; see assessment-solutions.md.',
    'Formative band breach: topic-02.mdx:108 item 4 and topic-03.mdx:122 item 3 are tagged *(Analyze)*, above the approved Remember/Understand/Apply band (content-spec.md:98; style-guide.md:237); the unit carries 12 formative items (4 per topic) against the approved 9 (3 per topic, D-2026-0072).',
    'RRQ 4 (unit-assessment.mdx:106) is tagged *(Remember)*, below the RRQ Understand floor (style-guide.md:248).',
    'MCQ key distribution A2/B4/C4/D0: no item keys to D, so a candidate can eliminate D on every item.',
  ] },
  { id: 'accessibility', status: 'unverified', evidence: [
    'render-review unavailable (exit 1): deployed SHA 3910d26161b35a1faf18ce848fd50ab0b4cf59f7 differs from HEAD 7bb9e4d484428859cbfe2f6e3775c0e8291b11ea on docs/semester-4/efmp-408/unit-01/index.mdx and static/img/figures/efmp-408/unit-01/fig-U1-4.webp; no build, server or browser run is permitted.',
    'Structural checks from source: all seven Figure uses carry non-empty alt text; all 24 SVGs carry role="img", aria-labelledby, <title> and <desc>; heading order is monotonic; index.mdx:49-51 uses descriptive link text.',
    'measure-figure-text exit 0 on all 24 SVGs (logs/measure-figure-text.txt); no glyph overflow or wordmark collision reported.',
  ] },
  { id: 'readability', status: 'pass', evidence: [
    'HSC/intermediate-graduate register held across index.mdx and topic-01..03.mdx; short sentences, active voice, one concept per paragraph.',
    'Technical terms are defined at first use: test, measurement, appraisal (topic-01.mdx:71-78), formative and summative (topic-02.mdx:39-66), norm- and criterion-referenced (topic-03.mdx:51-81), feedforward (topic-02.mdx:50-53).',
    'Worked examples show rather than assert: Asim 28/40 read three ways (topic-01.mdx:80-87) and the 72% score under two frames (fig-U1-3, topic-03.mdx:35).',
  ] },
  { id: 'pedagogy', status: 'pass', evidence: [
    'Full nine-part learning cycle present and ordered in all three topic files (check:depth-gate exit 0).',
    'Activities are feasible in Pakistani teacher-training contexts with ordinary materials (conceptual sorting, slate check, feedforward rewrite, reference-frame workshop) and carry usable instructions and grouping.',
    'Progression runs classroom situation to explanation, activity, retrieval, reflection and assessment; the three content-spec misconceptions are named and cleared in blockquote blocks.',
  ] },
];

const findings = [
  { severity: 'uncertain', resolved: false, message: 'Render and print inspection (360px viewport, table scrolling, desktop layout, A4 print, figure clipping) could not be performed. The crew brief prohibits npm run build, a dev server and Playwright, and the production site is not the reviewed input: the deployed SHA 3910d26161b35a1faf18ce848fd50ab0b4cf59f7 differs from HEAD 7bb9e4d484428859cbfe2f6e3775c0e8291b11ea on docs/semester-4/efmp-408/unit-01/index.mdx and static/img/figures/efmp-408/unit-01/fig-U1-4.webp. render-review is recorded as unavailable (exit 1). Visual accessibility remains unverified; structural accessibility and figure geometry pass from source.' },
  { severity: 'uncertain', resolved: false, message: 'Formative blueprint breach: docs/semester-4/efmp-408/unit-01/topic-02.mdx:108 item 4 and topic-03.mdx:122 item 3 are tagged *(Analyze)*, above the approved formative band Remember/Understand/Apply (specs/content/efmp-408/content-spec.md:98; specs/content/style-guide.md:237). The unit also carries 12 formative items (4 per topic) against the approved 9 (3 per topic, D-2026-0072). The tags match the actual demand, so either reword the two items to the band or record an owner ruling that the band extends.' },
  { severity: 'advisory', resolved: false, message: 'unit-assessment.mdx:106 RRQ 4 is tagged *(Remember)*, below the style guide RRQ floor of Understand (specs/content/style-guide.md:248). The demand really is recall, so raise the item to Understand or record the variation.' },
  { severity: 'advisory', resolved: false, message: 'MCQ answer key never uses option D (A2/B4/C4/D0 across unit-assessment.mdx:36-94). A candidate can eliminate D on all ten items; redistribute at least one key to D.' },
  { severity: 'advisory', resolved: false, message: 'topic-01.mdx:55, unit-assessment.mdx:54 and :142 cite NPSTP Standard 5, but npstp-2009 is not a Key in specs/content/efmp-408/sources/unit-01.md and has no coverage row. The claim is supported by the course excerpt sources/texts/npstp-2009.md, which is scoped to Unit 6 and so is outside this G3 bundle; add the key and a U1-02 coverage row or declare the limitation.' },
  { severity: 'advisory', resolved: false, message: 'sources/unit-01.md:12-14 declares scheerens-2003 unverifiable with the retrieval attempt and date, but does not record the owner authorisation that D-2026-0001 requires. Add the ruling citation to match the corpus declaration form.' },
  { severity: 'advisory', resolved: false, message: 'topic-01.mdx:41 defines assessment as "gathering, documenting and interpreting information about student knowledge, skills, attitudes and beliefs"; the bound HEC note (sources/texts/hec-2013-classroom-assessment.md:8-10) supports "gathering, analysing and interpreting evidence about student learning". Either align the wording or bind a source for the exact phrasing.' },
  { severity: 'advisory', resolved: false, message: 'topic-01.mdx:78 defines appraisal and adds a Pakistani teacher-education usage (holistic reviews encompassing academic performance, conduct, social interaction and motor participation). The bound note sources/texts/hec-2013-testdev.md:11 only says appraisal integrates multiple forms of evidence, and the bound HEC guides do not define the term. Align the definition with the bound note or bind a source for the usage.' },
];

const report = {
  schema_version: 1,
  course_code: 'EFMP-408',
  unit_no: 1,
  stage: 'G3',
  disposition: 'revise',
  reviewer_id: 'agent:claude',
  author_run_id: 'agy:crew-efmp-408-u01-author',
  reviewer_run_id: 'crew/efmp-408-u01-review_en-r1',
  model: 'LongCat-2.5',
  started_at: '2026-11-25T15:10:00Z',
  completed_at: new Date().toISOString(),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  criteria,
  findings,
  commands,
  evidence_manifest,
  reviewed_commit: '7bb9e4d484428859cbfe2f6e3775c0e8291b11ea',
  limitations: [
    'Render and print inspection not performed: the deployed SHA differs from HEAD on the unit English files and banner figure, and the brief prohibits build, server and Playwright.',
    'Manifest prepared locally over a clean tree and verified against a fresh inputManifest() computation; no dispatcher-supplied frozen handoff or runtime identities were provided.',
    'Urdu mirror and .ur.svg variants are G5 scope and were not evaluated.',
    'No new external source retrieval; the Scheerens text remains unread under its D-2026-0001 declaration.',
  ],
};

writeFileSync(`${dir}/../crew-efmp-408-u01-review_en-r1.json`, JSON.stringify(report, null, 2) + '\n');
console.log('wrote report with', Object.keys(evidence_manifest).length, 'evidence files and', Object.keys(manifest.input_manifest).length, 'inputs');
