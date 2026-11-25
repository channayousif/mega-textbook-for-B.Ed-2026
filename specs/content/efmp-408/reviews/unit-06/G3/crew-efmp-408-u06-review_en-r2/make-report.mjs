import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, join } from 'node:path';
import { inputManifest, skillDigest } from '/home/a2ahs/crew-wt/efmp-408-u06-review_en-r1/scripts/lib/review-evidence.mjs';

const root = '/home/a2ahs/crew-wt/efmp-408-u06-review_en-r1';
const R = join(root, 'specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2');
const digest = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const rel = (p) => p.slice(root.length + 1);

const evidence = {};
const walk = (dir) => {
  for (const e of readFileSync.length ? [] : []) void e;
};
import { readdirSync, statSync } from 'node:fs';
const collect = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) collect(p);
    else if (!/\.json$/.test(p) && !p.endsWith('/logs/report-validation.txt')) evidence[rel(p)] = digest(p);
  }
};
collect(R);

const report = {
  schema_version: 1,
  course_code: 'EFMP-408',
  unit_no: 6,
  stage: 'G3',
  disposition: 'escalate',
  reviewer_id: 'agent:claude-crew',
  author_run_id: 'agy:crew-efmp-408-u06-repair_en',
  reviewer_run_id: 'crew-efmp-408-u06-review_en-r2',
  model: 'Claude Code (model identity LongCat-2.5; exact deployment version unavailable)',
  started_at: '2026-11-25T22:19:00Z',
  completed_at: new Date().toISOString(),
  skill_digest: skillDigest(root, 'G3'),
  input_manifest: inputManifest(root, 'EFMP-408', 6, 'G3'),
  criteria: [
    {
      id: 'authority', status: 'pass',
      evidence: [
        'Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:266-277 allots Week 13 (Standardized Testing), Week 14 (Ethical Issues) and Week 15 (Modern Trends) to EFMP-408; specs/content/efmp-408/content-spec.md:345-360 carries the same twelve leaves as U6-01..U6-12 with frontmatter status: approved.',
        'specs/content/efmp-408/content-spec.md:358-360 derives U6-10..U6-12 from licence objective 5 under owner decision D-2026-0093 item 6; topic-04.mdx:27-29 carries the visible Curriculum enrichment topic banner required by content-spec.md:373-375.',
        'specs/content/efmp-408/coverage/unit-06.md:5-33 maps every sub-topic to a real ### heading that exists and teaches it: topic-01.mdx:39,59,79; topic-02.mdx:39,54,76; topic-03.mdx:39,52,68; topic-04.mdx:45,60,93.',
      ],
    },
    {
      id: 'sources', status: 'pass',
      evidence: [
        'All four cycle-1 source findings re-checked and closed: sources/unit-06.md:12 carries a no-external-source row naming NTS 2002, NEAS Grades 4 and 8, STEDA and the Sindh Teaching Licence, FPSC CBT, SEF and PEAC, CIE O/A Levels and IB, the CAT mechanism and academic integrity classifications, with Supports = U6-01, U6-03, U6-05, U6-06, U6-08, U6-10; coverage/unit-06.md grounds the same six IDs; specs/gaps.md:3588-3593 records escalation G-2026-236.',
        'topic-01.mdx:96 no longer states that Pakistan participated in TIMSS 2019; fig-U6-4.svg, fig-U6-4.dark.svg, fig-U6-4.ur.svg and fig-U6-4.ur.dark.svg now read International surveys instead of TIMSS participation. The bound TestDevEval_Sept13.txt:655-675 names TIMSS, PISA, NEAS, ASER, AKU-EB and FBISE as international and national assessment systems, supporting the remaining general description.',
        'topic-02.mdx:56 and :78 no longer cite HEC (2012); a full-text search of the bound ClassroomAssess_Sept13.txt still returns no cheating, academic integrity, confidentiality or privacy passage. topic-02.mdx:78 keeps NPSTP (2009), supported by sources/texts/npstp-2009.md notes 2 and 4. topic-02.mdx:41 keeps HEC (2012) for the fairness definition, supported by ClassroomAssess_Sept13.txt:405-411.',
        'sources/unit-06.md:7 drops U6-05 and U6-06 from the hec-2013-classroom-assessment scope and coverage/unit-06.md follows, so no source scope is overstated. check:depth-gate exit 0 includes the coverage-to-sources scope agreement.',
        'scheerens-2003 remains declared unverifiable at sources/unit-06.md:15 under D-2026-0001 and is used only for systemic evaluation, assessment monitoring and institutional cultures, which the declaration names (topic-01.mdx:61; topic-04.mdx:95).',
        'See source-verification.md for the passage-level re-reads.',
      ],
    },
    {
      id: 'coverage', status: 'pass',
      evidence: [
        'specs/content/efmp-408/coverage/unit-06.md:5-33 maps U6-01..U6-12; the content-spec Topic list (content-spec.md:364-369) partitions the same IDs across the four topic files with none assigned twice and none unmapped.',
        'Reading minutes: index 3 + topic-01 18 + topic-02 17 + topic-03 17 + topic-04 18 + assessment 22 + notes 4 = 99, inside the approved 85-115 band (check:depth-gate exit 0).',
        'Assessment spread: 6.1 MCQ 1-3 / RRQ 1-2 / ERQ 1; 6.2 MCQ 4-5 / RRQ 3-6 / ERQ 2; 6.3 MCQ 6-7 / RRQ 7-8 / ERQ 3; 6.4 MCQ 8-10 / RRQ 9-10 / ERQ 4-5 (specs/content/efmp-408/concepts/unit-06.md:7-17).',
      ],
    },
    {
      id: 'assessment', status: 'pass',
      evidence: [
        'All 10 MCQs solved independently before the supplied key was read; the derived key matches the supplied key on every letter (assessment-solutions.md).',
        'Cycle-1 key defect closed: the key is now A3 / B2 / C2 / D3 (items 1-10 = A, C, D, B, A, D, C, B, A, D), so the all-B strategy that scored 9/10 in cycle 1 now scores 2/10 and no option letter is empty (unit-assessment.mdx:126-135).',
        'Cycle-1 RRQ band defect closed: RRQ 6 is now tagged Understand and RRQ 9 Analyze (unit-assessment.mdx:106,109), inside the RRQ band Understand to Analyze (specs/content/style-guide.md:248); their mark schemes were updated to match (lines 159-173).',
        'RRQ model answers and mark schemes and both ERQ rubrics were read and checked: point-by-point marks, performance descriptors that require higher-order work, and no conflicting keys. check:no-answer-keys exit 0.',
        'Residual advisory A-1: the keyed option is the longest or tied-longest option in 5 of the 10 MCQs, so a weak length cue remains.',
      ],
    },
    {
      id: 'accessibility', status: 'unverified',
      evidence: [
        'render-review unavailable (exit 1): deployed SHA 074ab11456b999cf5d3c9b8aa6e603b2de834eb5 differs from HEAD 83b5dd5ec49f76485d3c9b8ae6e603b2de834eb5 on docs/semester-4/efmp-408/unit-06/topic-01.mdx, topic-02.mdx, unit-assessment.mdx and five unit-06 SVGs, so the production build is not the reviewed input and no browser or print inspection was run (logs/render-review.txt, render-verify/render-verify.txt).',
        'Structural checks from source: all nine Figure uses carry non-empty descriptive alt text; every topic file carries the nine canonical cycle headings in order; heading order is monotonic in all seven files; the unit tables are rendered by the static display:block / overflow-x:auto rule in src/css/custom.css, so each table is its own scroll container.',
        'measure-figure-text exit 0 on all 16 bound unit SVGs (logs/measure-figure-text.txt); no glyph overflow, intersection or wordmark collision reported. The cycle-1 fig-U6-5 title defect is closed: the title is now 48 characters and the widest text ends at 768.4px in a 780px viewBox.',
        '360px scrolling, A4 print and figure clipping remain uninspected for the current bytes. The cycle-1 render passed on the pre-repair bytes and is not evidence about this submission.',
      ],
    },
    {
      id: 'readability', status: 'pass',
      evidence: [
        'All seven English files read in full. The register holds for a fresh HSC/intermediate graduate: short single-idea paragraphs, a Mirpurkhas/Larkana/Hyderabad/Sukkur classroom vignette before each abstraction, and technical terms defined at first use (standardized test at topic-01.mdx:41, norming at :49, construct-irrelevant barrier at topic-02.mdx:43, CAT at topic-03.mdx:59, competency-based assessment at :83, NPSTP Standard 5 dimensions at topic-04.mdx:68-91).',
        'check:no-em-dash exit 0 (logs/check-no-em-dash.txt); validate:content exit 0 (logs/validate-content.txt).',
        'The cycle-1 HEC attribution and TIMSS sentence rewrites keep the register: topic-02.mdx:56 now states the cheating claim without a citation and topic-01.mdx:96 states the TIMSS description in the same plain register as the surrounding sentences.',
      ],
    },
    {
      id: 'pedagogy', status: 'pass',
      evidence: [
        'The nine-part learning cycle is intact and ordered in all four topic files (check:depth-gate exit 0); each carries a classroom situation, a named activity with grouping, time and materials, retrieval checks, a self-assessment checklist, a practicum task, a summative task with a rubric and a further-reading list.',
        'The approved misconceptions (content-spec.md:338-339) are all named and corrected: standardized means the same paper for everyone (topic-01.mdx:51-52), digital assessment is automatically more objective (topic-03.mdx:49-50), continuous assessment means more tests (topic-03.mdx:75-76); topic-02.mdx:51-52 adds the equality-versus-equity misconception and unit-teacher-notes.mdx:38-47 gives handling strategies.',
        'Activities are feasible in the stated Pakistani/Sindhi context (pairs or groups of three to four, 25-30 minutes, chart paper, board and printed cases only), and the practicum tasks are realistic for a trainee with no authority. Progression runs classroom situation to explanation, activity, retrieval, reflection and assessment.',
      ],
    },
  ],
  findings: [
    {
      severity: 'uncertain', resolved: false,
      message: 'Render and print inspection unavailable. Deployed SHA 074ab11456b999cf5d3c9b8aa6e603b2de834eb5 differs from HEAD 83b5dd5ec49f76485d3c9b8ae6e603b2de834eb5 on the unit English directory and figure folder, so the CI-built production site is not the reviewed input; the brief also forbids building or serving the site from a review job. render-review is recorded as unavailable (exit 1) in logs/render-review.txt and render-verify/render-verify.txt. Narrow-viewport scrolling, A4 print clipping and visual accessibility of the current bytes remain unverified, so accessibility cannot pass and the report escalates.',
    },
    {
      severity: 'advisory', resolved: false,
      message: 'Residual MCQ option-length cue (unit-assessment.mdx:39-97). The key is now A3 / B2 / C2 / D3 and the cycle-1 all-B giveaway is gone, but the keyed option is still the longest or tied-longest option in 5 of the 10 items (items 1, 3, 4, 6, 8), and it is the shortest in item 2. The item-writing rule asks for similar length with no giveaway. REPAIR (optional): vary option length further so the correct option is not disproportionately the longest.',
    },
    {
      severity: 'advisory', resolved: true,
      message: 'Cycle-1 B-1 (blocking, MCQ key A0 / B9 / C1 / D0 with the keyed option longest in 9 of 10 items) is resolved by the repair: the key is A3 / B2 / C2 / D3 and option lengths were rebalanced in English and Urdu.',
    },
    {
      severity: 'advisory', resolved: true,
      message: 'Cycle-1 B-2 (blocking, undeclared missing sources for NTS 2002, NEAS Grades 4 and 8, STEDA, FPSC, SEF, PEAC, CIE/IB and the Sindh Teaching Licence claim) is resolved: sources/unit-06.md:12 records the no-external-source row, coverage grounds the same six sub-topics, and G-2026-236 is escalated in specs/gaps.md.',
    },
    {
      severity: 'advisory', resolved: true,
      message: 'Cycle-1 S-2 (uncertain, TIMSS 2019 participation unverified) is resolved: the claim is removed from topic-01.mdx:96 and from fig-U6-4.svg and its dark and Urdu variants.',
    },
    {
      severity: 'advisory', resolved: true,
      message: 'Cycle-1 A-2 (RRQ 6 and RRQ 9 tagged Remember below the RRQ floor) is resolved: RRQ 6 is tagged Understand and RRQ 9 Analyze, with their mark schemes updated.',
    },
    {
      severity: 'advisory', resolved: true,
      message: 'Cycle-1 A-3 (HEC cited at topic-02.mdx:56 and :78 for content absent from the bound guide) is resolved: both citations were removed and the source scope updated.',
    },
    {
      severity: 'advisory', resolved: true,
      message: 'Cycle-1 A-4 (fig-U6-5 title ending at 779.1px in a 780px viewBox) is resolved: the title is shortened and measure-figure-text reports the widest text at 768.4px.',
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: 'specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/validate-content.txt' },
    { name: 'check:depth-gate', exit_code: 0, log_path: 'specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-depth-gate.txt' },
    { name: 'check:figures', exit_code: 0, log_path: 'specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-figures.txt' },
    { name: 'check:no-em-dash', exit_code: 0, log_path: 'specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-no-em-dash.txt' },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: 'specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-no-answer-keys.txt' },
    { name: 'check:docs-sync', exit_code: 0, log_path: 'specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-docs-sync.txt' },
    { name: 'render-review', exit_code: 1, log_path: 'specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/render-review.txt' },
    { name: 'check:content', exit_code: 0, log_path: 'specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-content.txt' },
    { name: 'check:bloom-bands', exit_code: 0, log_path: 'specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-bloom-bands.txt' },
    { name: 'check:concept-graph', exit_code: 0, log_path: 'specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-concept-graph.txt' },
    { name: 'check:svg-style', exit_code: 0, log_path: 'specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-svg-style.txt' },
    { name: 'check:source-floor', exit_code: 0, log_path: 'specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-source-floor.txt' },
    { name: 'check:licence', exit_code: 0, log_path: 'specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-licence.txt' },
    { name: 'check:pipeline-gate', exit_code: 0, log_path: 'specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/check-pipeline-gate.txt' },
    { name: 'measure-figure-text', exit_code: 0, log_path: 'specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/measure-figure-text.txt' },
    { name: 'build:content-status', exit_code: 0, log_path: 'specs/content/efmp-408/reviews/unit-06/G3/crew-efmp-408-u06-review_en-r2/logs/build-content-status.txt' },
  ],
  evidence_manifest: evidence,
  reviewed_commit: '83b5dd5ec49f76485d3c9b8aa6e603b2de834eb5',
  limitations: [
    'Render and print inspection was not performed: deployed SHA 074ab11456b999cf5d3c9b8aa6e603b2de834eb5 differs from HEAD 83b5dd5ec49f76485d3c9b8aa6e603b2de834eb5 on the unit English directory and figure folder, and the brief forbids a build, dev server or Playwright e2e run from a review job. accessibility is therefore unverified and the report escalates.',
    'No parent-prepared frozen handoff or runtime provenance was supplied; the manifest was prepared locally over a clean tree and re-verified against a fresh inputManifest() computation (105 inputs, 0 mismatches). The author identity is taken from history/prompts/efmp-408/crew-efmp-408-u06-repair_en.misc.prompt.md.',
    'The Urdu mirror and the .ur.svg variants are G5 scope. The repair edits were spot-checked for parity (MCQ key, RRQ 6 and 9 demand, TIMSS removal, HEC citation removal) but were not reviewed as Urdu content, and they are not in the G3 manifest.',
    'No new external retrieval of NTS, NEAS, TIMSS, PISA, STEDA, FPSC, SEF, PEAC, CIE, IB or the HEC PDFs was attempted. External-body facts are accepted as declared under no-external-source and escalated in specs/gaps.md; they remain unverified.',
    'specs/gaps.md and specs/decisions/log.md are not in the G3 manifest. specs/gaps.md was read as the escalation record for G-2026-236; no decision ruling is cited, so the report carries no rulings block.',
    'Advisory only: this report does not certify the unit, sign anything, append a tracker row, change translation_status, alter the registry or publish.',
  ],
};

const out = join(R, 'crew-efmp-408-u06-review_en-r2.json');
writeFileSync(out, JSON.stringify(report, null, 2) + '\n');
console.log('wrote', out, Object.keys(evidence).length, 'evidence files');
