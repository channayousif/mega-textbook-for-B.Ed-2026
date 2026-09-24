// Report generator - GQUR-300 Unit 5 G3 run001. Assembles the contract JSON
// with recomputed evidence hashes and the D-2026-0001 ruling digest.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

// Resolve the library from the repo root (the script lives deep under specs/).
const root = join(import.meta.dirname, '..', '..', '..', '..', '..', '..', '..');
const { rulingDigest } = await import(pathToFileURL(join(root, 'scripts/lib/review-evidence.mjs')).href);

const digest = (p) => createHash('sha256').update(readFileSync(p)).digest('hex');
const LOGS = 'specs/content/gqur-300/reviews/unit-05/G3/logs-agent-g3-gqur300-u5-run001';
const RENDERS = 'specs/content/gqur-300/reviews/unit-05/G3/renders-agent-g3-gqur300-u5-run001';

const evidence_manifest = {};
for (const dir of [LOGS, RENDERS]) {
  for (const name of readdirSync(join(root, dir)).sort()) evidence_manifest[`${dir}/${name}`] = digest(join(root, dir, name));
}

const prepared = JSON.parse(readFileSync(join(root, 'specs/content/gqur-300/reviews/unit-05/G3/manifest.json'), 'utf8'));

const report = {
  schema_version: 1,
  course_code: 'GQUR-300',
  unit_no: 5,
  stage: 'G3',
  disposition: 'revise',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:56f5b54',
  reviewer_run_id: 'agent-g3-gqur300-u5-run001',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T01:21:00Z',
  completed_at: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  skill_digest: prepared.skill_digest,
  input_manifest: prepared.input_manifest,
  rulings: { 'D-2026-0001': rulingDigest(root, 'D-2026-0001') },
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        "Scheme-and-Course-guides/extracted-text/1st 2026.txt:620-627 - the guide's Unit 5 carries exactly four leaves ('Collection and organization of data', 'Tables, graphs, and charts', 'Measures of central tendency', 'Interpretation of statistical information'); all four are taught at the exact headings named in specs/content/gqur-300/coverage/unit-05.md (topic-01 'Collection and organization of data', topic-02 'Tables, graphs, and charts', topic-03 'Measures of central tendency' and 'Interpretation of statistical information') and each carries assessment items.",
        "specs/content/gqur-300/content-spec.md ## Unit 5 (lines 420-486): CLO refs 'course outcomes 2 and 5' match the unit's clo_refs (SLO:GQUR-300-2-2, SLO:GQUR-300-5-5), consistent with the course-wide SLO scheme (course-overview.mdx:56-58); topic list, reading-min bands (12-16/14-18/14-18 vs delivered 13/15/15), figure plan (6 figures, archetypes match the manifest) and assessment blueprint all match the delivered unit; no contradictory G0/G1 authority found.",
        "Guide teaching strategies and practical work (1st 2026.txt:641-666: group activities, real-life case studies, question-answer, group/individual assignments, presentations) are operationalized in unit-teacher-notes.mdx (group-work activities, case-study mode, ERQ-5 presentations).",
      ],
    },
    {
      id: 'sources',
      status: 'fail',
      evidence: [
        "VERIFIED - pbs figures: specs/content/gqur-300/sources/texts/pbs.md (sha256 9686693d..., pinned in " + LOGS + "/source-verification.txt) supports every census figure quoted in the unit - population 55,696,147; literacy 10+ 57.54 (2017: 54.57), male 64.23, female 50.21; out-of-school 5-16 46.29 - at every occurrence (topic-03.mdx:67-68,74,80,133-135; unit-assessment.mdx:30,93,116-117,132-134; index.mdx:23-24,56-57; unit-teacher-notes.mdx:48-50,72-73).",
        "FAIL - gender-gap error: topic-03.mdx:79-80 states 'nearly 10 percentage points between male and female literacy'; the unit's own verified figures give 64.23 - 50.21 = 14.02 percentage points, as computed by unit-assessment.mdx:204 (ERQ-3 rubric), :188 (RRQ-9) and unit-teacher-notes.mdx:72-73.",
        "FAIL - openstax-prealgebra mapping unsupported: coverage/unit-05.md maps U5-01/U5-02/U5-03 to openstax-prealgebra and sources/unit-05.md:10 claims support for 'frequency tables, averages (mean/median/mode) and data displays', but the excerpt sources/texts/openstax-prealgebra.md scopes itself to 'GQUR-300 Units 2-4 ... Supported at record/structure level' and verifies neither Section 5.5 nor any data-display content; topic-01.mdx:141-143 cites 'Section 5.5 Averages and Probability, and the data sections' - unverified.",
        "FAIL - traceability claim false: sources/unit-05.md:3-5 claims every key is 'cited both in prose and in a per-topic ## Further reading section', but openstax-prealgebra appears only in topic-01.mdx:141-143 (Further reading), never in prose.",
        "FAIL - PBS conduct and structure claims unverified: topic-03.mdx:70-73 ('the country's first digital census'; 'Door-to-door enumeration on tablets, March to May 2023, approved by the Council of Common Interests') and topic-01.mdx:74-77 ('its Sindh report (2023) is organized as exactly these stages') are absent from the bound pbs.md excerpt, whose 'What this supports' limits full-text support to the quoted figures.",
        "VERIFIED - tout2020 at ERIC-record level: topic-03.mdx:83-87 matches sources/texts/tout2020.md's record summary without overstatement. DECLARED - oecd-pisa under ## Unverifiable sources (sources/unit-05.md:16-18) with attempts and date, resting on corpus-wide owner ruling D-2026-0001 (bound in this report's rulings map).",
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        "Taught-passage mapping verified 4/4: every row of specs/content/gqur-300/coverage/unit-05.md names a file and an exact ### heading that exists in that file (U5-01 topic-01.mdx 'Collection and organization of data'; U5-02 topic-02.mdx 'Tables, graphs, and charts'; U5-03 topic-03.mdx 'Measures of central tendency'; U5-04 topic-03.mdx 'Interpretation of statistical information').",
        "Each sub-topic carries instruction and assessment: U5-01 -> MCQ-01..03, RRQ-01..02, ERQ-01; U5-02 -> MCQ-04..07, RRQ-04/06/07, ERQ-02; U5-03 -> MCQ-08/09, RRQ-03/05/08, ERQ-04; U5-04 -> MCQ-10, RRQ-09/10, ERQ-03; consistent with concepts/unit-05.md.",
        "Depth budget respected: topic est_reading_minutes 13/15/15 within the spec's 12-16/14-18/14-18 bands; check:depth-gate exit 0; guide leaf coverage complete with no scope drift.",
      ],
    },
    {
      id: 'assessment',
      status: 'fail',
      evidence: [
        "Independent working recorded in " + LOGS + "/assessment-independent-working.txt: MCQ key agreement 10/10 (b,b,b,c,b,c,b,b,c,b); all RRQ/ERQ computations re-derived and agreeing (mean 60 / median 62 / mode 70; takings median 4,200; slice angles 108 and 81 degrees; class-strength total 200 with 45/200 = 22.5 percent; gap 14.02 pp; rise 2.97 pp, gap/rise = 4.72 so 'more than four times' holds).",
        "FAIL - RRQ-9 model answer (unit-assessment.mdx:188-190) calls the gender divide 'the near-10-point-plus divide' in the same sentence that correctly computes 14.02 percentage points, conflicting with the ERQ-3 rubric (:204) and the teacher notes (unit-teacher-notes.mdx:71-73); the marking guidance is internally inconsistent and could lead a marker to accept 'about 10 points'.",
        "Blueprint satisfied: 10/10/5 bank; MCQ 3/4/3 and RRQ 2/3/5 per topic (>= 2 floor met for all three topics); MCQs Remember/Understand/Apply, RRQs Understand/Apply/Analyze, ERQs Analyze x4 + Evaluate x1; Bloom labels match the thinking actually required (audited item by item); rubric mark totals sum correctly (6/6/6/7/10); check:bloom-bands and check:concept-graph exit 0.",
      ],
    },
    {
      id: 'accessibility',
      status: 'fail',
      evidence: [
        "FAIL - fig-U5-5 (static/img/figures/gqur-300/unit-05/fig-U5-5.svg and fig-U5-5.dark.svg) does not plot its stated data: its subtitle reads 'Marks of 11 pupils: 20, 45, 50, 55, 60, 62, 62, 70, 70, 70, 96' but the dots sit at value positions ~35, 40, ~45, 50, 52 (pair), 60 (triple) and 100; no dots exist at 55, 62, 70 or 96; the 'median = 62' dashed line is drawn at the 52 position and the 'mode = 70' circle encircles the 60 stack. Confirmed in the rendered page by in-browser pixel sampling (renders-agent-g3-gqur300-u5-run001/fig-U5-5-pixel-check.json). The figure contradicts its alt text, its own caption and topic-03.mdx:27-35, so a learner cannot recover its instructional meaning.",
        "PASSING - headings, links, alt text: every page has exactly one H1 with logical heading sequences; no empty link text; all figure <img> elements (light and dark variants) carry non-empty alt equal to the manifest alt text, with the hidden dark variant display:none so exactly one is exposed (render-verification.json).",
        "PASSING - small screen and print: no horizontal document overflow at 360px on any of the six pages; the topic-01 frequency table is 275px wide (fits, not a scroll container; measured on the <table> itself per the G3 reference); zero overflowing elements in A4 (794x1123) print emulation; two real A4 PDFs produced (topic-02-a4.pdf, 5 pages; unit-assessment-a4.pdf, 6 pages); the bounded answers section prints unclipped.",
        "All 12 unit-05 SVGs pass text-geometry measurement (measure-figure-text.txt: widest text ends at 772.3 < 780 viewBox width, no wordmark overprint); figures:variants:check exit 0. Rendered-input identity, viewport/print setup and artifact paths recorded in " + LOGS + "/render-review.txt.",
      ],
    },
    {
      id: 'readability',
      status: 'pass',
      evidence: [
        "Register is reachable by a fresh HSC/intermediate graduate per specs/content/style-guide.md v4.5 '## EN readability rules': short active sentences, one idea per paragraph, everyday Pakistani contexts (Khairpur girls' primary school, rupee takings, travel-to-school modes, Sindh census figures).",
        "All glossary terms used in the unit (Data, Frequency table, Tally, Bar chart, Pie chart, Line graph, Pictograph, Measures of central tendency, Mean, Median, Mode) resolve to bilingual glossary.json entries; terminology is used consistently with no synonym switching.",
        "No em dash (check:no-em-dash exit 0); every page carries a description and single H1 (validate:content exit 0); est_reading_minutes 13/15/15 within the spec's bands.",
      ],
    },
    {
      id: 'pedagogy',
      status: 'fail',
      evidence: [
        "PASSING - progression: each topic runs the nine-part cycle in order (classroom situation with figure, explanation with worked example and misconception, activity, check your understanding, summary, self-assessment checklist, practicum task, summative task with mini-rubric, further reading); activities are feasible in a Pakistani/Sindhi classroom with stated group sizes, durations and materials (travel-to-school survey, groups of four, 25 minutes; display-swap in pairs; marksheet clinic, groups of three).",
        "PASSING - misconceptions and retrieval: each topic names and corrects one misconception ('data means numbers', 'a graph's impression is the data', 'the mean is the average'), echoed with probing moves in unit-teacher-notes.mdx; check-your-understanding items give retrieval practice; the unit builds on Unit 2 percentages and Unit 1 reasonableness as the spec requires.",
        "FAIL - the Topic 5.3 explanation's central figure (fig-U5-5) contradicts the worked example it illustrates (mean 60, median 62, mode 70 on the 11-mark data set): the figure plots a different data arrangement, places the median line at 52 and the mode circle on the 60 stack, so the topic's core lesson - three honest averages in three different places - is visually mis-taught. The 'nearly 10 percentage points' gender-gap error (topic-03.mdx:79-80) likewise teaches the wrong number in the unit's flagship interpretation example.",
      ],
    },
  ],
  findings: [
    {
      severity: 'blocking',
      resolved: false,
      message:
        "fig-U5-5 does not plot the data it captions. static/img/figures/gqur-300/unit-05/fig-U5-5.svg and fig-U5-5.dark.svg (rendered on topic-03) subtitle the data as '20, 45, 50, 55, 60, 62, 62, 70, 70, 70, 96', but the 11 dots sit at value positions approximately 20, 35, 40, 45, 50, 52, 52, 60, 60, 60, 100 (axis: 20 at x=60 to 100 at x=660, 7.5 px per unit): dots exist at 35, 40, 52 (a pair) and 100 that are not in the data, and there are no dots at 55, 62 (the pair), 70 (the triple) or 96. The 'median = 62' dashed line is drawn at the 52 position (x=300) and the 'mode = 70' circle encircles the middle dot of the 60 stack (x=360). Confirmed in the rendered page by in-browser pixel sampling (renders-agent-g3-gqur300-u5-run001/fig-U5-5-pixel-check.json). The figure contradicts its own caption, its alt text ('the mean at 60, the median at 62 and the mode circled at 70') and the topic-03 prose, mis-teaching the topic's core concept. Repair: re-plot the dots at the stated values (55 at x=322.5, the 62 pair at x=375, the 70 triple at x=435, 96 at x=630, removing the spurious 35 and 40 dots), move the median line to x=375 and the mode circle to the 70 stack, in both the light and dark variants; the figure manifest row and alt text already describe the correct figure and need no change.",
    },
    {
      severity: 'blocking',
      resolved: false,
      message:
        "False figure in the flagship interpretation example: docs/semester-1/gqur-300/unit-05/topic-03.mdx:79-80 states 'The gap: nearly 10 percentage points between male and female literacy', but from the unit's own verified census figures the gap is 64.23 - 50.21 = 14.02 percentage points, as the unit itself computes in the ERQ-3 rubric (unit-assessment.mdx:204), the RRQ-9 model answer (:188) and the teacher notes (unit-teacher-notes.mdx:71-73, 'the 14.02-point gap'). The error leaks into the RRQ-9 model answer's phrase 'the near-10-point-plus divide' (unit-assessment.mdx:188-190), which conflicts with the 14.02 computation in the same sentence. In a unit whose final outcome is reading published statistics honestly, the taught gap must be correct. Repair: state the gap as 14.02 percentage points (or 'more than 14 points') in topic-03.mdx and replace 'near-10-point-plus divide' with '14.02-point divide' in the RRQ-9 model answer.",
    },
    {
      severity: 'blocking',
      resolved: false,
      message:
        "Unsupported source mapping for three of four sub-topics: specs/content/gqur-300/coverage/unit-05.md maps U5-01, U5-02 and U5-03 to openstax-prealgebra, and specs/content/gqur-300/sources/unit-05.md:10 claims it supports 'frequency tables, averages (mean/median/mode) and data displays', but the bound excerpt specs/content/gqur-300/sources/texts/openstax-prealgebra.md verifies chapter/section structure for Units 2-4 topics only - its 'What this supports' reads 'GQUR-300 Units 2-4 ... Supported at record/structure level', and the sections fetched were 5.1 (Decimals) and 5.7 (square roots), not 5.5. topic-01.mdx:141-143 cites 'Ch. 5, Section 5.5 Averages and Probability, and the data sections' - no bound evidence verifies Section 5.5, frequency tables or any 'data sections' of Prealgebra 2e. Repair: fetch and verify Section 5.5 (and name and verify the data sections if they exist) and extend the excerpt, or re-scope the mapping to what is verified (e.g. averages-only support for U5-03 via 5.5) and ground U5-01/U5-02 elsewhere with honest declarations.",
    },
    {
      severity: 'blocking',
      resolved: false,
      message:
        "Citation-traceability claim false: specs/content/gqur-300/sources/unit-05.md:3-5 asserts 'every key here is cited both in prose and in a per-topic ## Further reading section', but openstax-prealgebra appears only in topic-01.mdx:141-143 (Further reading) and nowhere in unit prose. Same defect class as GQUR-300 Unit 4 run001's blocking finding 3 (repaired for Units 3-4 in commit 78f0366, after Unit 5 was authored in 56f5b54). Repair: cite openstax-prealgebra in the prose passages it grounds (e.g. the averages explanation in topic-03), or correct the sources-file claim.",
    },
    {
      severity: 'blocking',
      resolved: false,
      message:
        "PBS-attributed claims go beyond the bound excerpt: topic-03.mdx:70-73 states 'the country's first digital census' and 'Door-to-door enumeration on tablets, March to May 2023, approved by the Council of Common Interests', and topic-01.mdx:74-77 states the Sindh report '(2023) is organized as exactly these stages (PBS, 2023)'. None of these appear in the bound excerpt specs/content/gqur-300/sources/texts/pbs.md, whose 'What this supports' limits full-text support to 'the figures quoted above' (all quoted figures were verified against it). The declaration records that the report PDF was downloaded and read, so the repair is cheap: extend pbs.md's record summary to quote or summarise the report passages carrying the conduct facts and its structure, or soften the prose to what the excerpt supports.",
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        "oecd-pisa attribution likely overstates the public summary: topic-02.mdx:70-71 'The PISA framework makes this exact demand: interpreting mathematics in context includes recognising how a display frames what it shows (OECD, n.d.)'. The source is declared unverifiable (sources/unit-05.md:16-18: oecd.org 403, framework described from its public summary, D-2026-0001), and 'makes this exact demand' with the display-framing gloss attributes specificity the bound evidence cannot support. Recommend softening the attribution to what a public summary plausibly supports, or binding the public summary text as a sources/texts excerpt.",
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        "tout2020 support level could be disclosed in the unit's sources file: sources/texts/tout2020.md discloses 'NOT verbatim publisher text; the publisher full text was not read from this host ... Supported at record level', and the prose claim (topic-03.mdx:83-87) matches the ERIC record summary without overstatement, but sources/unit-05.md:12 says only '(registry checked 2026-09-23)'. Recommend recording the record-level basis in the sources file, as the excerpt itself does.",
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        "Sources-record accuracy: sources/unit-05.md:9 marks pbs Kind 'guide-required', but pbs is named in neither the course guide's recommended books (1st 2026.txt:651-656) nor the content-spec reading list's Guide-required block (content-spec.md:83-90; pbs is Curated-supplementary at :102), and the sources-consulted contract (specs/007-content-depth-standard/contracts/sources-consulted.md) defines guide-required as one of those two. Relatedly, content-spec.md:462 maps grawe (bibliographic level only) and grawe2012 to Unit 5, but the unit cites neither at any level, so Unit 5's guide-required reading has no citation (Units 1 and 6 cite their guide-required monographs with the D-2026-0001 limit stated). Recommend correcting the Kind label and either citing grawe at bibliographic level or recording why the mapping changed.",
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        "Input-binding gap (tooling): sources/texts/pbs.md and sources/texts/openstax-prealgebra.md are cited by unit-05's coverage and sources tables but are not bound in the unit's input manifest, because scripts/lib/review-evidence.mjs citedKeysFor only recognises citation keys containing a 4-digit year ('pbs' and 'openstax-prealgebra' carry none; only tout2020.md is bound). Both files are committed and clean at HEAD ad0c4d1 and this review pins their SHA-256 in " + LOGS + "/source-verification.txt, but post-review edits to them would not invalidate this unit's evidence. Recommend fixing the key-matching rule (or the key naming) before acceptance relies on these excerpts; the same class likely affects ncm.md for Units 2-4.",
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        "Unglossed declared key term: content-spec.md ## Unit 5 declares 'Average' among the key terms; the unit uses the word heavily ('the honest average', 'three honest averages') but never glosses it, and 'Average' is absent from glossary.json (183 entries). Same class as the Unit 2 and Unit 4 run001 advisories.",
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        "Concept-graph mapping gap: concepts/unit-05.md maps ERQ-04 (compute all three averages and explain their ordering) only to CON:GQUR-300-5-12; the mean/median/mode concepts (CON:GQUR-300-5-8/5-9/5-10) list no ERQ. The concept-graph contract requires only that mapped IDs exist (check:concept-graph exit 0), but the graph's account of the bank is incomplete. Same class as Unit 4 run001's unmapped-items advisory.",
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        "Inspection limitation: this session's image-display tool returned no output for PNG and JPEG files, so the reviewer could not view rendered pixels directly. Visual verification rests on in-browser DOM measurement (overflow, alt text, heading outlines, table geometry), in-browser pixel sampling of the rendered fig-U5-5 (objective colour checks at computed coordinates), deterministic SVG geometry (measure-figure-text.txt) and valid multi-page A4 PDFs; all 26 PNGs, 2 PDFs and 4 measurement JSONs are saved unchanged under renders-agent-g3-gqur300-u5-run001/ for human visual inspection. Had this been the only open question on an otherwise passing unit, it would have justified escalation rather than a pass.",
    },
    {
      severity: 'advisory',
      resolved: false,
      message:
        "Worktree concurrency and gate-sequence note: HEAD moved from 37171b6 to ad0c4d1 during this review (tracker-only change, excluded from the manifest by design); the input manifest was re-verified after it landed (96/96 digests, no dirty inputs). The initial npm run check:content exited 1 on a stale git-ignored generated artifact (static/content-status.json); it was regenerated with the gate's own instructed command (no tracked file touched) and the re-run exited 0 - both runs recorded (" + LOGS + "/check-content-initial-run.txt and check-content.txt). No tracked bound input was modified at any point.",
    },
  ],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: LOGS + '/validate-content.txt' },
    { name: 'check:depth-gate', exit_code: 0, log_path: LOGS + '/check-depth-gate.txt' },
    { name: 'check:figures', exit_code: 0, log_path: LOGS + '/check-figures.txt' },
    { name: 'check:no-em-dash', exit_code: 0, log_path: LOGS + '/check-no-em-dash.txt' },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: LOGS + '/check-no-answer-keys.txt' },
    { name: 'check:docs-sync', exit_code: 0, log_path: LOGS + '/check-docs-sync.txt' },
    { name: 'render-review', exit_code: 0, log_path: LOGS + '/render-review.txt' },
    { name: 'check:content', exit_code: 0, log_path: LOGS + '/check-content.txt' },
    { name: 'check:content-initial', exit_code: 1, log_path: LOGS + '/check-content-initial-run.txt' },
    { name: 'check:concept-graph', exit_code: 0, log_path: LOGS + '/check-concept-graph.txt' },
    { name: 'check:bloom-bands', exit_code: 0, log_path: LOGS + '/check-bloom-bands.txt' },
    { name: 'figures:variants:check', exit_code: 0, log_path: LOGS + '/figures-variants-check.txt' },
    { name: 'measure-figure-text', exit_code: 0, log_path: LOGS + '/measure-figure-text.txt' },
    { name: 'build', exit_code: 0, log_path: LOGS + '/build.txt' },
    { name: 'serve', exit_code: 0, log_path: LOGS + '/serve.txt' },
    { name: 'input-binding-verification', exit_code: 0, log_path: LOGS + '/input-binding-verification.txt' },
    { name: 'assessment-independent-working', exit_code: 0, log_path: LOGS + '/assessment-independent-working.txt' },
    { name: 'source-verification', exit_code: 0, log_path: LOGS + '/source-verification.txt' },
  ],
  evidence_manifest,
};

const OUT = join(root, 'specs/content/gqur-300/reviews/unit-05/G3/agent-g3-gqur300-u5-run001.json');
writeFileSync(OUT, JSON.stringify(report, null, 2) + '\n');
console.log('wrote', OUT, 'with', Object.keys(evidence_manifest).length, 'evidence files');
