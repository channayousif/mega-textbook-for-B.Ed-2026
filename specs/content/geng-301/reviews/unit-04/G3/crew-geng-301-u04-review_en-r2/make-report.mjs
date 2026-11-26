/**
 * Build the G3 cycle-2 report for GENG-301 Unit 4 from the evidence already saved in this folder.
 *
 * The input manifest is read from manifest.json (prepared with
 * `node scripts/review-evidence.mjs prepare GENG-301 4 G3`) and re-verified by
 * `node scripts/review-evidence.mjs validate` after this file writes the report.
 * Evidence hashes are computed from the exact bytes on disk, so the report cannot
 * describe a log that changed after it was written.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';

const runDir = dirname(new URL(import.meta.url).pathname);
const coursePrefix = 'specs/content/geng-301/reviews/unit-04';
const sha256 = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');

const prepared = JSON.parse(readFileSync(join(runDir, 'manifest.json'), 'utf8'));
const head = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();

const evidenceFiles = [
  'manifest.json',
  'assessment-solutions.md',
  'limitations.md',
  'advisory-tracker-row.md',
  ...readdirSync(join(runDir, 'logs')).sort().map((f) => `logs/${f}`),
];
const evidenceManifest = Object.fromEntries(
  evidenceFiles.sort().map((rel) => [`${coursePrefix}/G3/crew-geng-301-u04-review_en-r2/${rel}`, sha256(join(runDir, rel))]),
);

const log = (name) => `${coursePrefix}/G3/crew-geng-301-u04-review_en-r2/logs/${name}.txt`;

const criteria = [
  {
    id: 'authority',
    status: 'pass',
    evidence: [
      'Scheme-and-Course-guides/extracted-text/2nd 2026.txt:77-83 allots section 4 "Different Types of Expository Writing" exactly six leaf types: Description, Illustration, Classification, Cause and effect, Process analysis, Comparative analysis.',
      'specs/content/geng-301/content-spec.md:343-352 (Unit 4 sub-topic checklist) carries the same six leaf sub-topics as U4-01..U4-06 with guide ref 4, and content-spec.md:326 binds the unit to course outcome 2.',
      'Every unit file carries clo_refs SLO:GENG-301-4-1 (index, topic-01..03, unit-assessment, unit-teacher-notes front matter). No G0/G1 contradiction found; no missing authority.',
      'Advisory only: content-spec.md:356-360 and :368-373 still list only the six schematics, so the approved spec and the delivered unit diverge on the four placed illustrations (see the figure-plan advisory below).',
    ],
  },
  {
    id: 'sources',
    status: 'fail',
    evidence: [
      'specs/content/geng-301/sources/unit-04.md:12-20 `## Unverifiable sources` states only that no open-access excerpt could be bound and cites Constitution Art. III.5. It records no retrieval attempt, no date and no owner authorisation, so it does not meet the unavailable-source convention in .claude/skills/review-unit/references/g3.md and D-2026-0001 (specs/decisions/log.md).',
      'Contrast the repaired declarations in the same course: sources/unit-01.md and unit-02.md record dated Open Library and Crossref lookups and cite D-2026-0001; unit-03.md and unit-06.md carry a retrieval record. unit-04.md and unit-05.md still carry the short pre-repair form.',
      'The prose states more than that declaration supports: topic-01.mdx:119-120 asserts "Chapter 6 covers the power of specific detail", topic-02.mdx:122-123 asserts "Chapter 3 covers classification and causal analysis", topic-03.mdx:125-126 asserts "Chapter 7 covers comparison and process". These are chapter-level claims about monographs whose text was not obtained and are not disclosed as uncorroborated.',
      'Bound accessible support: specs/content/geng-301/sources/texts/writing2015.md (Writing for Success, chapter 10, CC BY-NC-SA, consulted 2026-10-17) covers classification, causal explanation, process and comparison, and supports the coverage rows for U4-03..U4-06. The open-access floor is met by that row (sources/unit-04.md:10).',
      'Advisory: content-spec.md:331-335 maps UNESCO2022 and openstax2021 section 11.3 to Unit 4, but neither key appears in sources/unit-04.md, coverage/unit-04.md or the unit prose, and there is no open-access binding note of the kind units 01 and 02 record.',
    ],
  },
  {
    id: 'coverage',
    status: 'pass',
    evidence: [
      'specs/content/geng-301/coverage/unit-04.md:5-14 maps U4-01..U4-06 to a file, a named section and a source; every sub-topic has a `###` section (topic-01.mdx:36 Description, :48 Illustration; topic-02.mdx:36 Classification, :49 Cause and effect; topic-03.mdx:37 Process analysis, :52 Comparative analysis).',
      'The content-spec sub-topic IDs form a total, disjoint partition of the guide checklist, and the concept graph links all six concepts to assessment items (check:concept-graph exit 0).',
      'Reading minutes: index 4 + topics 16/18/20 + assessment 12 + teacher notes 4 = 74, inside the 70-85 depth budget (content-spec.md:362); check:depth-gate exit 0.',
      'Figure density: 6 schematics + 4 illustrations across the unit, at least 2 carriers per topic and 3 concept-map/flowchart rows (fig-U4-2 concept-map, fig-U4-3 flowchart); check:figures exit 0.',
      'Advisory: the content-spec Unit 4 "Common misconceptions" list (content-spec.md:364-366) names "compare and contrast must always be block format" and "process analysis is just a list of steps without explanation"; topic-03.mdx:69-71 instead addresses "a comparison must give equal weight", and the process misconception is only implied at topic-03.mdx:50. Coverage of the six types is unaffected.',
    ],
  },
  {
    id: 'assessment',
    status: 'fail',
    evidence: [
      'Bank shape: unit-assessment.mdx:30-158 holds exactly 10 MCQ, 10 RRQ and 5 ERQ, matching content-spec.md:375. MCQ per topic 4.1: 2, 4.2: 3, 4.3: 4; RRQ per topic 4.1: 3, 4.2: 3, 4.3: 4 (all >= 2).',
      'Independent solve (assessment-solutions.md): derived MCQ key C C B B B B B B A B, identical to the supplied key at unit-assessment.mdx:166-175. All ten MCQs have one clearly best answer.',
      'Option-length audit (assessment-solutions.md): the keyed option is the uniquely longest in 3 of 10 items (4, 7, 9) and tied longest in one more (2), a residual length cue recorded as an advisory below. It is far weaker than the 9-of-10 giveaway recorded for EFMP-408 cycle 1.',
      'All ten RRQ mark schemes were re-added. Nine are internally consistent. RRQ 9 at unit-assessment.mdx:195 reads "Marks (2): 1 - goal stated; 2 - steps in order": the components sum to 3 against a 2-mark header (blocking finding below).',
      'All five ERQ rubrics are headed 0-3 and their criterion rows sum to 3 (unit-assessment.mdx:199-234). ERQ 3, 4 and 5 demand Analyze, Evaluate and Create, satisfying the Create-level blueprint item.',
      'check:bloom-bands exit 0: Bloom tags honour the approved bands. check:no-answer-keys exit 0: every key and rubric sits inside the single bounded `## Answers and marking guidance` section, which is the last `##` section of the file.',
    ],
  },
  {
    id: 'accessibility',
    status: 'unverified',
    evidence: [
      'render-review unavailable (exit 1): deployed SHA 366019f8ace647e892523e553b81ab6d1832ec68 differs from HEAD 6a810e62c7b9d4ff7643b56a17f75cb9db2ce98e on index.mdx, topic-01..03.mdx and fig-U4-7..10.webp, so the CI-built production site is not this submission and was not inspected. See logs/render-review.txt and limitations.md.',
      'Narrow-viewport scrolling, A4 print clipping and the visual accessibility of the current bytes are therefore unverified, not passed. No rendered PNG/WebP/JPG is claimed.',
      'Structural checks that do not need a browser pass from source: heading order is monotonic in all six files (no skipped levels, topics open at `##` and expository types at `###`); all ten `<Figure>` tags carry non-empty alt text; all twelve SVGs carry role="img", aria-labelledby, one `<title>` and one `<desc>`; no bare URLs in prose.',
      'logs/measure-figure-text.txt: all 12 SVGs pass glyph geometry (widest text 768.4px in a 780px viewBox, wordmark 675.7px), so the prior wordmark-overflow finding is closed.',
    ],
  },
  {
    id: 'readability',
    status: 'pass',
    evidence: [
      'Register holds for a fresh HSC/intermediate graduate: short single-idea paragraphs, active voice, and technical terms defined inline through `<Glossary>` on first use (topic-01.mdx:38 Description, :50 Illustration; topic-02.mdx:38 Classification, :51 Cause and effect; topic-03.mdx:39 Process analysis, :54 Comparative analysis).',
      'Worked examples are concrete and classroom-bound (overcrowded classroom, Shikarpur school, primary schools classified by management type, setting up a Grade 4 science demonstration, B.Ed registration process).',
      'The four new illustrations carry long, specific alt text that matches the manifest row and describes the teaching point, so a screen-reader user recovers the figure meaning (alt lengths 327-353 characters).',
      'No em dash anywhere in the unit (check:no-em-dash exit 0).',
    ],
  },
  {
    id: 'pedagogy',
    status: 'pass',
    evidence: [
      'The nine-part learning cycle is present and ordered in all three topics: situation, explanation, misconception, activity, check (3 items), summary, self-assessment checklist (3 items), practicum, summative with mini-rubric, further reading (check:depth-gate exit 0).',
      'Progression runs from recognition to production: each topic opens with a real classroom situation, names a misconception, gives a worked example, then asks pupils to produce. Retrieval practice sits in "Check your understanding" (Remember to Apply).',
      'Activities are feasible in a Pakistani/Sindhi B.Ed classroom (pair work, textbook analysis, practicum observation, a parent-teacher meeting process) with usable instructions, time limits and materials.',
      'Summative mini-rubrics demand Analyze-or-higher demand in the integration row (topic-01.mdx:115), the classification row (topic-02.mdx:117) and the comparison row (topic-03.mdx:120).',
    ],
  },
];

const findings = [
  {
    severity: 'blocking',
    message:
      'sources/unit-04.md `## Unverifiable sources` (lines 12-20) does not meet the unavailable-source convention: it records no retrieval attempt, no date and no owner authorisation under D-2026-0001, unlike the repaired declarations in units 01, 02, 03 and 06 of the same course. The unit prose also states more than the declaration supports: topic-01.mdx:119-120 (Zinsser chapter 6), topic-02.mdx:122-123 (Rosenwasser and Stephen chapter 3) and topic-03.mdx:125-126 (Faigley and Selzer chapter 7) assert chapter-level content of monographs whose text was not obtained, without disclosing that the claims are uncorroborated. Repair: add a dated retrieval record citing D-2026-0001, and either remove the chapter numbers and content claims or label them unverified reading suggestions, as unit-03.md does.',
    resolved: false,
  },
  {
    severity: 'blocking',
    message:
      'unit-assessment.mdx:195 (RRQ 9 mark scheme) reads "Marks (2): 1 - goal stated; 2 - steps in order". The components sum to 3 against a 2-mark header, so a teacher cannot award the scheme as written. Repair: make the header and the components agree, either "Marks (3): 1 - goal stated; 2 - steps in order" or "Marks (2): 1 - goal stated; 1 - steps in order".',
    resolved: false,
  },
  {
    severity: 'uncertain',
    message:
      'Rendered-page and A4-print evidence is unavailable, so this carries forward prior finding F2 (no real browser inspection). The deployed build 366019f8ace647e892523e553b81ab6d1832ec68 differs from HEAD 6a810e62c7b9d4ff7643b56a17f75cb9db2ce98e on the unit, and the brief forbids a local build or server, so render-review is recorded as unavailable (logs/render-review.txt, exit 1). Narrow-viewport scrolling, print clipping and visual accessibility of the current bytes remain unverified. Changed images can be served stale for up to 30 days, so this is a tooling limitation, not a content defect.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message:
      'Figure manifest Alt text is stale for all six schematics. specs/content/geng-301/figures/unit-04.md rows carry the short authoring-time alt (for example fig-U4-1 "A diagram comparing description (sensory detail) and illustration (concrete examples)"), while the carrier alt and the SVG <desc> carry the longer aligned text (for example " ... as two ways to make abstract ideas concrete."). The four illustrations match. ADR-0024 makes the manifest row and the carrier the same handoff contract, so the six rows should be brought in line with the carrier alt unless a content correction is recorded.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message:
      'The approved content-spec Unit 4 topic list and figure plan (content-spec.md:356-373) still list only the six schematics. The four placed illustrations (fig-U4-7 banner, fig-U4-8..10) are recorded in the figure manifest and banner sidecar but not in the spec, so the frozen spec and the delivered unit diverge. The spec is approved and frozen, so aligning it is an owner decision.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message:
      'content-spec.md:331-335 maps UNESCO2022 and openstax2021 section 11.3 to Unit 4 as open-access readings, but neither key appears in sources/unit-04.md, coverage/unit-04.md or the unit prose, and the unit carries no open-access binding note of the kind sources/unit-01.md and unit-02.md record for the same situation. The open-access floor itself is met by writing2015, so this is a mapping gap, not a floor failure.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message:
      'MCQ 6 (unit-assessment.mdx:67-71) keys on the signal phrase "For example" over the concept: the stem sentence "For example, many schools lack libraries" is a generalisation rather than a concrete example, and topic-01.mdx:81-83 teaches that a "For example" sentence can fail to illustrate. The key (B Illustration) is defensible, but a concrete instance would remove the tension.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message:
      'Residual MCQ option-length cue (unit-assessment.mdx:34-98). The keyed option is the uniquely longest option in 3 of 10 items (4, 7 and 9) and is tied longest with a distractor in item 2, so a pupil who follows the convention "the longest option is usually right" is rewarded in four items. Every key is defensible on content and the effect is much weaker than the 9-of-10 giveaway recorded for EFMP-408 cycle 1, so this is advisory. Rebalancing the option wording in items 4, 7 and 9 would remove it.',
    resolved: false,
  },
  {
    severity: 'advisory',
    message:
      'Prior report finding F1 (wordmark overflowing the right viewBox edge on all twelve SVGs) is verified RESOLVED. logs/measure-figure-text.txt exits 0 on all 12 SVGs: widest text ends at 768.4px and the wordmark sits at 675.7px inside the 780px viewBox. The `.wm` rule is present in every SVG.',
    resolved: true,
  },
  {
    severity: 'advisory',
    message:
      'Prior report finding F2 (narrow-viewport and A4-print inspection never performed with a real browser) is NOT resolved. It is carried as the uncertain finding above; the limitation is now caused by the deployed build lagging HEAD rather than only by the absent browser.',
    resolved: false,
  },
];

const commands = [
  ['validate:content', 'validate-content'],
  ['check:depth-gate', 'check-depth-gate'],
  ['check:figures', 'check-figures'],
  ['check:no-em-dash', 'check-no-em-dash'],
  ['check:no-answer-keys', 'check-no-answer-keys'],
  ['check:docs-sync', 'check-docs-sync'],
  ['render-review', 'render-review'],
  ['check:content', 'check-content'],
  ['check:bloom-bands', 'check-bloom-bands'],
  ['check:concept-graph', 'check-concept-graph'],
  ['check:svg-style', 'check-svg-style'],
  ['check:source-floor', 'check-source-floor'],
  ['check:licence', 'check-licence'],
  ['check:pipeline-gate', 'check-pipeline-gate'],
  ['measure-figure-text', 'measure-figure-text'],
  ['build:content-status', 'build-content-status'],
].map(([name, file]) => ({
  name,
  exit_code: name === 'render-review' ? 1 : 0,
  log_path: log(file),
}));

const report = {
  schema_version: 1,
  course_code: 'GENG-301',
  unit_no: 4,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:claude-crew',
  author_run_id: 'agy:crew-geng-301-u04-illustrate:2026-11-26',
  reviewer_run_id: 'claude:crew:geng-301-u04-review_en-r1:c3569c4d-c6bb-473b-b6c9-96ff8de92725',
  model: 'Claude Code (model identity LongCat-2.5; exact deployment version unavailable)',
  started_at: '2026-11-26T20:27:06Z',
  completed_at: new Date().toISOString(),
  skill_digest: prepared.skill_digest,
  input_manifest: prepared.input_manifest,
  criteria,
  findings,
  commands,
  evidence_manifest: evidenceManifest,
  reviewed_commit: head,
  limitations: 'limitations.md',
};

const out = `${coursePrefix}/G3/crew-geng-301-u04-review_en-r2.json`;
writeFileSync(out, JSON.stringify(report, null, 2) + '\n');
console.log(`wrote ${out}`);
console.log(`evidence files hashed: ${Object.keys(evidenceManifest).length}`);
