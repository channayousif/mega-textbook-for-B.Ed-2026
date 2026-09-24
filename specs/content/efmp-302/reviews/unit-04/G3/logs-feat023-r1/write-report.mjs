#!/usr/bin/env node
// Generates agent-g3-efmp302-u4-feat023-r1.json with computed evidence hashes.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, resolve } from 'node:path';

const root = resolve(process.env.CONTENT_ROOT || '.');
const sha = (p) => createHash('sha256').update(readFileSync(join(root, p))).digest('hex');
const manifest = JSON.parse(readFileSync(join(root, 'specs/content/efmp-302/reviews/unit-04/G3/feat023-r1/manifest.json'), 'utf8'));

const L = 'specs/content/efmp-302/reviews/unit-04/G3/logs-feat023-r1/';
const R = 'specs/content/efmp-302/reviews/unit-04/G3/renders-feat023-r1/';

const evidence = {};
for (const f of readdirSync(join(root, L))) evidence[L + f] = sha(L + f);
for (const f of readdirSync(join(root, R))) evidence[R + f] = sha(R + f);

const report = {
  schema_version: 1,
  course_code: 'EFMP-302',
  unit_no: 4,
  stage: 'G3',
  disposition: 'pass',
  reviewer_id: 'agent:g3-reviewer',
  author_run_id: 'commit:51f46ec',
  reviewer_run_id: 'agent-g3-efmp302-u4-feat023-r1',
  model: 'LongCat-2.0',
  started_at: '2026-09-24T16:01:14Z',
  completed_at: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z'),
  skill_digest: manifest.skill_digest,
  input_manifest: manifest.input_manifest,
  rulings: {
    'D-2026-0001': '8ff79df9af668329f6d0094a2257654f45fc545122a753b4888fb9936f402f1f',
    'D-2026-0009': '571cd748be40f275429abec7d45a8a051d982ea8eb5fdb661715397b845dd685',
  },
  criteria: [
    {
      id: 'authority',
      status: 'pass',
      evidence: [
        'Scheme-and-Course-guides/extracted-text/1st 2026.txt:865-879, guide Unit 4 read verbatim: 4.1 carries three leaf bullets (concept and purpose; global and national perspectives; using standards for ensuring teacher quality and accountability), 4.2 one leaf bullet (structure, domains and indicators), 4.3 and 4.4 bare headings with no bullets',
        'specs/content/efmp-302/content-spec.md ## Unit 4 -> ### Sub-topic checklist: 12 rows U4-01..U4-12; the preamble discloses "This table is an expansion, not a transcription" and that 4.3/4.4 are bare headings; authored rows U4-08..U4-12 carry the curriculum owner confirmation D-2026-0009 (2026-09-20), bound in this report\'s rulings map',
        'guide sections 4.1-4.4 map one-to-one onto the four topic files; the ### Topic list partition is total and disjoint (U4-01..04 -> 4.1, U4-05..07 -> 4.2, U4-08..09 -> 4.3, U4-10..12 -> 4.4)',
        'SLO trace: SLO:EFMP-302-4-1 and SLO:EFMP-302-4-2 trace to guide CLOs 3 and 6 (1st 2026.txt Course Learning Outcomes, read this run); CLO 3 "Analyze the importance of teacher professionalism and accountability" fits directly; CLO 6 "Demonstrate professional ethics in teaching, learning and assessment" is a weaker fit, recorded as a carried advisory rather than adjudicated',
        'no contradictory or missing G0/G1 authority found; scope was not silently revised',
      ],
    },
    {
      id: 'sources',
      status: 'pass',
      evidence: [
        'specs/content/efmp-302/sources/texts/isore2009.md verified against the unit: para 17 "often conflicting - but not necessarily incompatible" and "countries rarely use a pure form" exact at topic-04.mdx:94-96; the distortion passage ("High-stakes incentive schemes based on standardised tests...") supports topic-03.mdx:115-119 including its scoping caveat; the Annex 2 section 3 heading is exact; topic-01.mdx:142-146\'s "central design problem" characterisation judged a fair reading of the paper\'s organising theme (section 2.1, Annex 2 section 3, conclusion) with Isore\'s exact wording quoted immediately after',
        'specs/content/efmp-302/sources/texts/goe2008.md verified against the unit: "there is no single measure that will provide valid information on all the ways teachers contribute... Multiple measures - each designed to measure different aspects - must be employed" supports topic-02.mdx:111-113; "Consider the purpose for the evaluation... before deciding on the appropriate measure" (with the value-added example) supports topic-03.mdx:76-78; the triangulation passage supports topic-03.mdx:107',
        'specs/content/efmp-302/sources/unit-04.md ## Unverifiable sources: npst-pakistan-2009, unesco-teacher-ethics and carr2000 each carry retrieval attempts, the date 2026-09-19 and owner ruling D-2026-0001; under the G3 reference these do not by themselves fail the criterion',
        'the npst-pakistan-2009 declaration is honest and complete for the current bytes: it states exactly what is uncorroborated (the ten standard names, the three-part division, the 2009 MoE/UNESCO/USAID origin). The run-007 undisclosed fourth claim ("Most come from the performance band") is absent from every artifact this run: the fig-U4-3 caption, its <desc> in both variants, the topic-02 img alt and the figures/unit-04.md row were each read, and none carries it',
        'the remaining fig-U4-3 caption clause "what a teacher knows and values is inferred from what performance shows" examined and judged within the declaration\'s scope: a general epistemic statement about observation-based assessment, consistent with topic-02\'s taught content (the practicum note that dispositions are nearly impossible to evidence by watching), not a claim about the NPST document\'s contents',
        'unesco-teacher-ethics declaration explicitly leaves topic-01\'s international-framework claims (U4-01, U4-02) unchecked; topic-01.mdx:84-86\'s "close to universal... over the last thirty years" is hedged and covered by that declaration (carried advisory)',
        'specs/content/efmp-302/coverage/unit-04.md: every source key resolves in sources/unit-04.md; every cited key appears in the prose and Further reading of the topic it grounds',
      ],
    },
    {
      id: 'coverage',
      status: 'pass',
      evidence: [
        'specs/content/efmp-302/coverage/unit-04.md: all 12 rows U4-01..U4-12 map to a real ### heading under a topic\'s ## Explanation, verified by reading each heading: topic-01 "The concept of a professional standard, and what it is for" / "Global perspectives on teacher standards" / "National perspectives on teacher standards" / "Using standards to ensure teacher quality and accountability"; topic-02 "The structure of Pakistan\'s National Professional Standards for Teachers" / "The domains the standards cover" / "Indicators, and how a domain is evidenced in practice"; topic-03 "Using a standard to evaluate your own practice" / "Building evidence against an indicator"; topic-04 "Teacher licensing and certification" / "Appraisal, and the difference between formative and summative purposes" / "What happens when a standard is used for a purpose it was not designed for"',
        'index.mdx ## Unit learning outcomes: each of the five outcomes has a taught passage and at least one summative item: outcome 1 -> topic-01 concept section / MCQ-01, MCQ-02, RRQ-02; outcome 2 -> topic-01 global+national sections / RRQ-02, RRQ-03; outcome 3 -> topic-02 / MCQ-05, RRQ-05, RRQ-06; outcome 4 -> topic-03 / MCQ-07, MCQ-08, RRQ-08, RRQ-09, ERQ-04; outcome 5 -> topic-04 / MCQ-09, MCQ-10, RRQ-01, RRQ-04, ERQ-05',
        'specs/content/efmp-302/concepts/unit-04.md checked against the bank rather than taken on trust: CON:EFMP-302-4-7 -> MCQ-04, RRQ-05 and CON:EFMP-302-4-9 -> RRQ-05, ERQ-02 are accurate; RRQ-05 is the sole RRQ assessor of each',
        'npm run check:depth-gate exit 0 (concept coverage, required blocks, formative floor, reading-minutes band, coverage-sources consistency); npm run check:concept-graph exit 0',
      ],
    },
    {
      id: 'assessment',
      status: 'pass',
      evidence: [
        'logs-feat023-r1/assessment-derivation.log - all 25 items solved from the unit content before the "## Answers and marking guidance" section (unit-assessment.mdx:178-303) was read and before any prior report was read; 10 of 10 independently derived MCQ keys agree with the supplied key; no ambiguous stem and no defensible second answer; distractors checked individually (including MCQ-06\'s proxy family and MCQ-04\'s absence of a 2008 distractor)',
        'RRQ: all ten mark schemes sum to their stated totals (4, 7, 8, 4, 5, 4, 5, 9, 9, 4 = 59); no scheme contradicts its own stem',
        'RRQ-05, unit-assessment.mdx:133-134 and its scheme at :227-231 - the run-006 blocking defect remains repaired: the added clause is taught at topic-02 "### The domains the standards cover" and restated in topic-02\'s Summary and the unit summary; it duplicates neither RRQ-06 nor RRQ-07; the scheme sums to 5 and pays both clauses of the stem; fig-U4-3 now agrees with the prose without the undisclosed frequency claim',
        'blueprint, content-spec.md ## Unit 4 Unit-end assessment blueprint: MCQ >= 2 per topic (4.1=3 including the spanning MCQ-03, 4.2=3, 4.3=2, 4.4=2); RRQ >= 2 per topic (4.1=3, 4.2=3, 4.3=2, 4.4=2); ERQ one per topic plus the integrative ERQ-02; every ERQ carries a four-criterion analytic rubric out of 20 with the 10-mark cap below Adequate stated for all five; all five ERQs demand Analyze or higher (Evaluate, Analyze, Create, Evaluate, Evaluate)',
        'Bloom demand classified from the thinking actually required: MCQ labels 3 Remember / 5 Understand / 2 Apply hold except MCQ-06 (carried advisory); the three Analyze RRQs are the three whose marks are mostly explanation, so those labels are honest; the RRQ band\'s recall weighting is recorded as a carried advisory',
      ],
    },
    {
      id: 'accessibility',
      status: 'pass',
      evidence: [
        'renders-feat023-r1/render-inspect.json and logs-feat023-r1/render-review.log: all 7 unit pages inspected at 1280x900 dsf1, 360x780 dsf2 isMobile and A4 794px print emulation against the fresh session build (both locales, exit 0) served at 127.0.0.1:4599, chromium 149.0.7827.0; defects: 0',
        '0 alt-less images and 0 non-descriptive link texts on any page at any viewport; no skipped heading level on any of the 7 pages; no horizontal document overflow at 360 CSS px',
        'FIGURE-INTERNAL TEXT GEOMETRY, measured by this reviewer over all 8 unit-04 figures in BOTH EN theme variants (16 files), rendered-DOM getBBox per <text> element with pairwise intersection at a 0.1 user-unit epsilon: ZERO text-on-text candidates (no two text glyph boxes even touch) and ZERO wordmark collisions; a pixel ink-intersection instrument (per-pair alpha-mask AND) was built into the measurement and would have run on any candidate pair, but none arose. Evidence: logs-feat023-r1/measure-text-overlap.log, measure-text-overlap.mjs, renders-feat023-r1/text-overlap-measurement.json. This is the check that would have caught the b8f8ffe regression (G-2026-62); the current reverted bytes are clean',
        'the two ded73ec repairs re-measured in the rendered DOM: fig-U4-3 caption line 1 ends at x=713.4 against the wordmark\'s x=775.7, a 62.3px clearance in both variants (run-007 measured a 4.5px OVERPRINT); fig-U4-5 caption line 1 clears the wordmark by 172.7px in both variants (was a 34.6px overprint); visually confirmed at renders-feat023-r1/crop-desktop-fig-U4-3-feat023-r1.png',
        'node scripts/measure-figure-text.mjs over all 16 files: clean, no viewBox overflow and no wordmark overprint (logs-feat023-r1/measure-figure-text.log)',
        'narrow 360 px: figures are their own scroll containers (scrollWidth 880-940 vs clientWidth 328) and expose tabindex="0" role="region" with an aria-label; scroll test on fig-U4-3: after scrollLeft = scrollWidth the image right edge reaches 344 CSS px, inside the 360 viewport, so the whole diagram is reachable; the five ERQ rubric tables carry tabindex and the scrollable-table aria-label (logs-feat023-r1/figure-dom-check.log)',
        'A4 print emulation: clippedElems=0 on every page, all 8 figures fit (right edges 717-777 within 794), the whole Answers and marking guidance section prints intact; PDFs emitted for all 7 pages (topic-02: 9 pages, unit-assessment: 12 pages)',
        'carried advisories, none blocking: the at-rest visual affordance for overflowing figures; the fig-U4-3 teaching sentence being image-only text (figcaption is the wordmark alone, alt 223 chars conveys structure but not that sentence); the fig-U4-4 alt not carrying the force of the in-figure caveat; the fig-U4-3 indicator text sitting 1.2px past its box border',
      ],
    },
    {
      id: 'readability',
      status: 'pass',
      evidence: [
        'topic-01.mdx "### The concept of a professional standard, and what it is for" defines the term, gives the three features, and works the contrast ("Be a good teacher" against "Plans lessons with clear learning objectives...") without prior specialist knowledge',
        'topic-02.mdx "### Indicators, and how a domain is evidenced in practice" gives three graded attempts at one indicator with the reason each succeeds or fails, then a full trace from standard to part to indicator to evidence',
        'topic-04.mdx "### Teacher licensing and certification" separates three confused terms by the question each answers; every topic opens with a named classroom situation (the probation decision, Sadia\'s photocopied form, Nadia and Kashif, the province\'s reform) and returns to it in the summative task',
        'misconceptions are named explicitly in all four topics and match the five listed at content-spec.md ## Unit 4 Common misconceptions',
        'HSC/intermediate register held; technical terms glossed at first use except Certification (carried advisory); one grammar slip at topic-04.mdx:47-48 (carried advisory)',
        'npm run check:no-em-dash exit 0; an independent grep over every unit-04 mdx and governance file found zero em dash characters',
      ],
    },
    {
      id: 'pedagogy',
      status: 'pass',
      evidence: [
        'all four topic files carry the full nine-part cycle: classroom situation, Explanation, Activity, Check your understanding, Summary, Self-assessment checklist, Try this at your practicum school, Summative task with mini-rubric, Further reading',
        'progression is genuine: 4.2 uses 4.1\'s four uses, 4.3 cannot run without 4.2\'s indicator, and 4.4 names 4.1\'s four uses to diagnose the province\'s error; index.mdx "## How to use this unit" states the dependency',
        'activities are feasible in a Pakistani/Sindhi classroom: groups of three or four or pairs, 25-30 minutes, no materials beyond the printed list, each with a second-stage task (attack a peer\'s indicator; find the weakest point in your own design) that carries the learning',
        'practicum tasks are performable in an under-resourced government school; topic-03\'s explicitly warns that three lessons will probably not show a change and treats that as a finding rather than a failure',
        'conceptual depth with the counter-argument stated in both directions: topic-04 teaches Isore\'s "not necessarily incompatible" against topic-03\'s separation imperative, and closes with "None of this argues against accountability"; one unreconciled tension between topic-03 and topic-04 on one-document-both-purposes is carried as an advisory',
      ],
    },
  ],
  findings: [],
  commands: [
    { name: 'validate:content', exit_code: 0, log_path: L + 'validate-content.log' },
    { name: 'check:depth-gate', exit_code: 0, log_path: L + 'check-depth-gate.log' },
    { name: 'check:figures', exit_code: 0, log_path: L + 'check-figures.log' },
    { name: 'check:no-em-dash', exit_code: 0, log_path: L + 'check-no-em-dash.log' },
    { name: 'check:no-answer-keys', exit_code: 0, log_path: L + 'check-no-answer-keys.log' },
    { name: 'check:docs-sync', exit_code: 0, log_path: L + 'check-docs-sync.log' },
    { name: 'check:concept-graph', exit_code: 0, log_path: L + 'check-concept-graph.log' },
    { name: 'measure-figure-text', exit_code: 0, log_path: L + 'measure-figure-text.log' },
    { name: 'measure-text-overlap', exit_code: 0, log_path: L + 'measure-text-overlap.log' },
    { name: 'site-build', exit_code: 0, log_path: L + 'site-build.log' },
    { name: 'render-review', exit_code: 0, log_path: L + 'render-review.log' },
  ],
  evidence_manifest: evidence,
  supersedes: null,
  summary: `Fresh G3 cycle-1 review of EFMP-302 Unit 4 under feature 023, binding current bytes at commit 51f46ec against the prepared feat023-r1 manifest (all 103 inputs digest-verified; the manifest recomputes identically). Disposition pass. All seven criteria pass; every mandatory command exits 0.

Both run-007 blocking findings are repaired and now verified by a reviewer. The fig-U4-3 caption no longer overprints the wordmark: re-measured in the rendered DOM, caption line 1 ends at x=713.4 against the wordmark's x=775.7, a 62.3px clearance in both theme variants (run-007 measured a 4.5px overprint). The caption's quantitative claim about the unread NPST document ("Most come from the performance band") is gone from every carrier - caption, desc, alt and manifest row - replaced by a diagram-scoped statement; the unverifiable-sources declaration again lists exactly what it leaves uncorroborated. The run-007 escalation over the feature-022 cycle budget is answered by this fresh submission (cycle 1 of 2), and the repair-displacement pattern it warned about was specifically re-checked: no new defect in the repaired artifacts.

Because the 2026-09-21 b8f8ffe re-optimisation had broken figure text course-wide and was reverted on 2026-09-24 (G-2026-62), this review measured figure-internal text geometry itself, beyond what any gate sees: rendered-DOM bounding boxes for every text element in all 8 unit-04 figures, both EN theme variants - zero text-on-text candidates (no two glyph boxes even touch), zero wordmark collisions, with a pixel ink-intersection instrument ready for any candidate pair. measure-figure-text is clean on all 16 files; render-inspect reports 0 defects across desktop, 360px and A4 print; figures are keyboard-reachable scrollable regions and the whole diagram is swipe-reachable at 360px.

Assessment: all 25 items solved blind before the key was read; 10/10 MCQ keys agree, all ten RRQ schemes sum, the 10/10/5 blueprint holds, and the run-006 RRQ-05 repair remains sound. Sources: isore2009 and goe2008 bound excerpts verified claim by claim; the three D-2026-0001 declarations are honest and complete for these bytes.

Eighteen advisories carry unresolved (RRQ recall weighting, RRQ-03's four-requirements-three-marks, the Topic 3.4 cross-reference, the unglossed Certification term, carr2000 over-declaration, the npst attempt-log divergence, the 2008/2009 date divergence, one grammar slip, the fig-U4-4 alt residual, topic-01's near-universal claim, the missing at-rest scroll affordance, fig-U4-3's 1.2px indicator-box graze and image-only caption sentence, RRQ-09's missing model answer, the topic-03/04 one-document tension, CLO 6's weaker fit, MCQ-06's Apply label, and topic-04's Isore referent generalisation). None is blocking; none forbids a pass.

This report is advisory. It is not a signature, a registry entry, a qualification record, a tracker transition or an acceptance.`,
};

// ---- findings ----
const F = (severity, resolved, message) => report.findings.push({ severity, resolved, message });

F('blocking', true, `VERDICT ON RUN-007 [0] - fig-U4-3 caption overprinting the site wordmark. RESOLVED, and verified by this reviewer's own measurement rather than the author's.

The repair (ded73ec, 2026-09-19) replaced the over-long caption line with a measured two-line caption. Re-measured this run in the rendered DOM, both theme variants (fig-U4-3.svg and fig-U4-3.dark.svg, viewBox 0 0 880 470):
  caption line 1 <text class="m" x="30" y="444"> measured bbox x 30.0 -> 713.4, y 433.7 -> 446.8
  wordmark       <text class="wm" x="868" y="444"> measured bbox x 775.7 -> 868.5, y 433.7 -> 446.8
Clearance 62.3 px on a shared baseline, both variants (the repair commit claimed 62.5; the 0.2 px difference is measurement rounding). Run-007 measured the defect as a 4.5 px overprint at commit 0222168. Visually confirmed at renders-feat023-r1/crop-desktop-fig-U4-3-feat023-r1.png: the caption ends, clear space follows, then the wordmark.

The b8f8ffe re-optimisation that later broke figure text across the course was reverted by 69bae9e to the pre-b8f8ffe geometry, which preserves this repair; the current bytes are the reverted ones and they measure clean.`);

F('blocking', true, `VERDICT ON RUN-007 [1] - fig-U4-3's caption asserting a quantitative claim about the unread primary document. RESOLVED.

The defect: "Most come from the performance band" was a frequency claim about npst-pakistan-2009's indicators, absent from every topic file and not among the three claims the unverifiable-sources declaration discloses.

Checked against the current bytes, every carrier of the claim:
  1. static/img/figures/efmp-302/unit-04/fig-U4-3.svg and .dark.svg caption now reads "Indicators sit beneath the parts, and only indicators produce evidence. The three shown below are drawn from performance and skills, the part that can be seen; what a teacher knows and values is inferred from what performance shows." The frequency claim is gone; "The three shown below" is a statement about the diagram itself, which is true of it and asserts nothing about the document.
  2. The <desc> in both variants contains no frequency claim.
  3. The topic-02.mdx:24 img alt (223 chars, verified in the rendered DOM) contains none.
  4. The figures/unit-04.md fig-U4-3 row contains none.
The remaining clause "what a teacher knows and values is inferred from what performance shows" was present before the run-006/007 repairs, was examined again this run, and is judged within the declaration's scope: a general epistemic statement about observation-based assessment, consistent with topic-02's own teaching (the practicum note that the dispositions part is nearly impossible to evidence by watching), not a claim about the NPST document's contents. The declaration at sources/unit-04.md:42 lists exactly what remains uncorroborated - the ten standard names, the three-part division and the 2009 origin - and nothing in the unit now states more than that.`);

F('uncertain', true, `VERDICT ON RUN-007 [2] - the feature-022 cycle-budget escalation (seventh cycle against a two-cycle limit). ADDRESSED for this submission, and the pattern it warned about was specifically checked this cycle.

Run-007 escalated partly because five repair cycles had each closed its target while displacing or introducing a defect in the same artifact, and authorising an eighth was framed as an owner decision. The owner's response was to close that submission and open feature 023: this review is cycle 1 of a fresh two-cycle budget against a freshly prepared manifest (103 inputs at commit 51f46ec), so the exhausted-budget state no longer describes the current submission. The course-level consequences are recorded where the owner sees them: G-2026-62 (the b8f8ffe regression, its 69bae9e revert and the gate blind spot) and G-2026-63 (the Unit 2 analogue).

The displacement pattern itself was watched for: the two ded73ec repairs under verification live in the same artifact (fig-U4-3) that run-007's defects lived in, and both were re-measured from scratch this run - caption/wordmark clearance 62.3 px both variants, zero text-on-text candidates across all 16 unit-04 SVG files, and the b8f8ffe revert verified not to have reintroduced overlapping baselines. No new defect was found in the repaired artifacts. Marked resolved for this submission's budget; the owner-facing items in the gaps register remain open there.`);

F('advisory', true, `VERDICT ON RUN-007's content-spec self-description advisory - "One row per leaf bullet of course-guide sections 4.1-4.4" was not literally what the checklist is. RESOLVED via D-2026-0009.

The current content-spec.md ## Unit 4 ### Sub-topic checklist preamble reads "This table is an expansion, not a transcription", states that the guide's Unit 4 outline carries four leaf bullets across two headings and that sections 4.3 and 4.4 are bare headings with no bullets at all, and marks rows U4-08 to U4-12 as authored with the curriculum owner's confirmation under D-2026-0009 (2026-09-20). Read against the bound guide this run: guide 4.1 has three leaf bullets, 4.2 has one, 4.3 and 4.4 have none. The self-description is now accurate.`);

F('advisory', false, `CARRIED AND STILL OPEN from run-006 [11] through run-007. Recall weighting of the RRQ band, re-derived independently this run.

Of the 59 marks in the ten RRQ schemes, roughly 43 pay for naming, listing or describing taught content and roughly 16 for explanation. RRQ-05, rewritten to add a non-recall clause, still pays 4 of 5 marks for recitation; RRQ-09 is wholly descriptive. The three *(Analyze)* items (04, 07, 10) are the three whose marks are mostly or wholly explanation, so the labels are honest; the weighting is the issue. specs/backlog.md records a bank-wide rebalancing pass; a backlog entry is a plan, not a repair, and specs/backlog.md is not a bound input of this bundle.`);

F('advisory', false, `CARRIED AND STILL OPEN from run-006 [12]. Mark-scheme arithmetic in RRQ-03, re-verified this run at unit-assessment.mdx:213-218.

The stem asks for the four uses "and state what each use requires of the standard". The scheme pays "one mark per apt requirement (3)" and then itself lists four requirements (initial training needs alignment with preparation; development needs generosity and safety; appraisal needs precision and evidence; accountability needs a public claim). Four demanded, three payable; the 4+3+1 = 8 total is internally consistent, but a marker has no rule for which of the four to leave unpaid.`);

F('advisory', false, `CARRIED AND STILL OPEN from run-001 [12] through run-007. Inaccurate cross-reference; re-verified against Unit 3's actual text this run.

topic-02.mdx:136 closes the worked trace with "Evidence: a seating map with contributions marked, which is precisely the Topic 3.4 practicum task." docs/semester-1/efmp-302/unit-03/topic-04.mdx "## Try this at your practicum school" asks an observer to record "where you stood, minute by minute, and which pupils you made eye contact with", then "Map the results onto a seating plan afterwards" - teacher position and teacher gaze. The indicator being traced ("pupils across the room, not only the front, contribute without prompting") needs pupil contributions. A trainee who follows the reference collects the wrong datum. One-clause repair: drop the cross-reference or restate it as the same seating-plan method recording pupil contributions.`);

F('advisory', false, `CARRIED AND STILL OPEN from run-001 [14] through run-007. Declared key term not glossed; re-verified this run.

content-spec.md ## Unit 4 Key terms declares "Teacher Certification" and specs/content/terminology.csv carries the row, but topic-04.mdx:46 introduces **Certification** in plain bold. topic-04.mdx:51 is the only <Glossary> call in that file (Teacher Licensing). The unit's other three declared key terms are all wrapped. Certification is the single omission, in the same paragraph as the term that is wrapped.`);

F('advisory', false, `CARRIED AND STILL OPEN, unchanged from run-003 through run-007. The unverifiable-sources block declares a key this unit does not use.

sources/unit-04.md:44 declares carr2000 under "## Unverifiable sources". Grepped this run across docs/semester-1/efmp-302/unit-04/ and specs/content/efmp-302/coverage/unit-04.md: zero hits for carr2000 or Carr. Over-declaring understates nothing, so it does not touch the honesty of the declaration; it remains the mirror image of the repaired hurst2009 over-listing.`);

F('advisory', false, `CARRIED AND STILL OPEN, unchanged from run-003 through run-007. Internal divergence in the npst-pakistan-2009 attempt log.

sources/unit-04.md:10-12 records the attempts as "itacec.org HTTP 403, nacte.org.pk HTTP 404, teachertaskforce.org HTTP 403"; the formal declaration at :42 records "itacec.org HTTP 401/403, nacte.org.pk HTTP 404" and omits teachertaskforce.org. Both are plausibly true of different sessions. Recorded so the two can be reconciled into one authoritative list; what the declaration leaves unchecked is stated accurately either way.`);

F('advisory', false, `CARRIED AND STILL OPEN, unchanged from run-004 through run-007. Date divergence inside the bound bundle; re-counted this run.

MCQ-04's key asserts the National Professional Standards were issued in 2009 by the Ministry of Education. Eight bound 2025 course guides carry the phrase "2008 National Professional Standards for Teachers" and one, course-guides-2025/TestDevEval_Sept13.txt, says the standards "were developed in 2009". No MCQ-04 distractor offers 2008, so no candidate is harmed and the key is not ambiguous; sources/unit-04.md treats the 2009 origin as corroborated only from secondary sources outside the bundle when it has one in-bundle corroboration and eight in-bundle statements of a different year, neither cited.`);

F('advisory', false, `CARRIED AND STILL OPEN from run-005 [8] through run-007. Grammar slip, confirmed present this run.

topic-04.mdx:47-48: "It is usually awarded once, on completion of an\\nrecognised programme." Should read "a recognised programme". The line break is why a single-line grep misses it. Single-word repair; comprehension is not impeded.`);

F('advisory', false, `CARRIED AND STILL OPEN from run-005 [9] through run-007. Residual on the fig-U4-4 alt text.

Measured in the rendered DOM this run: the img alt is 206 characters and reads "...marked as a summary that directs the reader to the primary document", which conveys that the table is a navigational summary. The rendered caveat inside the figure carries a sterner second line the alt does not: "Read it in the primary document before using it to judge anyone, including yourself." A screen-reader user gets the fact of the limitation but not the force of the caution. Folding that clause into the alt would be a cheap improvement to the mitigation credited for the unverified npst-pakistan-2009 key.`);

F('advisory', false, `CARRIED AND STILL OPEN from run-005 [10] through run-007. Touches the honesty of a declaration rather than a fact.

topic-01.mdx:84-86 states that standards frameworks "are close to universal in school systems that have tried to raise teaching quality at scale over the last thirty years", and topic-01.mdx:194 restates it as "near-universal internationally". U4-01 and U4-02 are grounded in unesco-teacher-ethics, declared unretrievable, so this frequency-and-period generalisation rests on a source nobody in this pipeline has read. It does NOT fail sources under the G3 reference: the declaration is explicit about exactly this and the claim is hedged. Recorded so that when the document is obtained, this sentence and the "last thirty years" span are checked specifically.`);

F('advisory', false, `CARRIED AND STILL OPEN from run-006 [13]. The at-rest visual affordance for overflowing figures; independently re-measured and re-photographed this run.

At 360x780 dsf2, all eight Unit 4 figures overflow their 328 px box (scrollWidth 880-940) and are exposed as focusable named scroll regions: tabindex="0", role="region", aria-label, verified in the rendered DOM. The WCAG 2.1.1 keyboard half is implemented. The at-rest visual half is not: the right-edge fade goes to tables with data-scrollable only; figures receive none. A sighted phone reader gets no cue that the figure continues to the right. Evidence: renders-feat023-r1/crop-narrow360-fig-U4-3-feat023-r1.png, cut mid-diagram with no edge treatment. Deferred in specs/backlog.md pending a design decision; a deferral is not a repair and the backlog is not a bound input.`);

F('advisory', false, `CARRIED AND STILL OPEN from run-007. Inside fig-U4-3.svg and fig-U4-3.dark.svg, <text> "Indicator: checks understanding mid-lesson" has a measured bbox right edge of x2 = 561.2 against its containing rect.ind right edge of x = 560.0: the final glyph sits 1.2 px outside its box. Run-007 measured 1.1 px; the difference is font-metric rounding between sessions. Visible only as the text touching the box border, where the other two indicator boxes have 39-44 px of clearance. No character is lost and no meaning is affected. (Distinct from the repaired caption defect in the same file; the caption now clears the wordmark by 62.3 px.)`);

F('advisory', false, `CARRIED AND STILL OPEN from run-007. fig-U4-3's teaching sentence is image-only text and reaches no assistive technology.

Measured in the rendered DOM this run: the figcaption content is "textbook.com.pk" alone (no caption prop is passed), and the explanatory sentence lives inside the SVG as <text>, i.e. inside the <img>. The only accessible text is the 223-character alt - identical to the SVG <desc> - which conveys the figure's instructional structure but not the caption sentence. Advisory because the G3 reference's recoverability requirement is met by the alt; recorded because the caption is the sentence carrying the corrected indicator-location claim, so a screen-reader reader is not shown the very sentence the run-007 repair installed for correctness. Repair option: pass the caption through the Figure component's caption prop, which renders it as real figcaption text.`);

F('advisory', false, `CARRIED AND STILL OPEN from run-007. RRQ-09 has a mark allocation but no model answer, against the approved blueprint.

content-spec.md ## Unit 4 requires of the unit-end bank: "RRQs (10): ... each with a model answer and a point-by-point mark scheme". unit-assessment.mdx:247-248 gives RRQ-09 as "Three marks per evidence type: what it shows, what it cannot show, ease of production without competence." That is an allocation rule with no model content for any evidence type, where the other nine items all give scorable content. Mitigating: the stem says "any three", so a single fixed model is not possible, and topic-03's "### Building evidence against an indicator" gives a marker everything needed. A one-line-per-type model would close it.`);

F('advisory', false, `CARRIED AND STILL OPEN from run-007. Two taught passages pull in opposite directions on whether one document can serve both purposes, and no passage reconciles them for the student.

topic-03.mdx states in bold: "Self-evaluation and appraisal must not be the same document." topic-04.mdx teaches from Isore that the purposes are "often conflicting" but "but not necessarily incompatible", a single framework "can serve both summative and formative purposes", and "It is not a proof that one document can never do both." The two are reconcilable - one is about a developmental record feeding a consequential decision, the other about a framework serving two purposes by design - but nothing in the unit says so. It becomes assessable at RRQ-04's scheme (unit-assessment.mdx:224-225: "Do not award an answer whose conclusion is that one document cannot hold both"), which penalises a candidate who took topic-03's bolded imperative at face value. One sentence in topic-04 distinguishing "one framework, two purposes" from "one document, two uses" would close it.`);

F('advisory', false, `CARRIED from run-001 [15] through run-004, dropped from runs 005-007 with no recorded verdict, re-raised by run-007 and re-examined this run. content-spec.md ## Unit 4 traces the unit's SLOs to guide CLOs 3 and 6. CLO 3 "Analyze the importance of teacher professionalism and accountability" fits directly. CLO 6 "Demonstrate professional ethics in teaching, learning and assessment" is a weaker fit for a unit about standards rather than ethics; the nearest link is that NPST Standard 9 contains a code-of-conduct element, which topic-02 notes in one clause. An appropriateness judgement rather than a contradiction, which is why authority passes and this stays advisory.`);

F('advisory', false, `CARRIED AND STILL OPEN from run-007. MCQ-06's *(Apply)* label overstates the thinking the item requires.

Three of the four options are topic-02's own three worked attempts at an indicator, in the same order and near-verbatim, with the verdict on each stated in the prose; for a reader of topic-02 the item is recognition, not application. The blueprint ("MCQs (10): Remember to Apply") is satisfied whichever way the item is classified, and MCQ-03 is a genuine Apply item. Recorded because the G3 reference asks Bloom demand to be classified from the thinking actually required.`);

F('advisory', false, `CARRIED AND STILL OPEN from run-007. Residual over-generalisation in topic-04's Isore attribution; re-verified against the bound excerpt this run.

topic-04.mdx:96 writes that Isore reports "that a single framework 'can serve both summative and formative purposes'". The quoted words are exact, but isore2009.md para 35 reads "Thus, the Framework can serve both summative and formative purposes" and "the Framework" is Danielson's Framework for Teaching, which Isore is summarising at that point. The unit generalises the referent from one named framework to "a single framework". Mild, honestly quoted, and the surrounding two verified claims independently carry the unit's point. Precision repair: "that Danielson's framework 'can serve both summative and formative purposes'".`);

F('advisory', true, `INDEPENDENCE AND INPUT BINDING - positive check.

INDEPENDENCE. This session did not author, translate or repair any byte of EFMP-302 Unit 4; it holds no author context. Identity agent:g3-reviewer with reviewer_run_id agent-g3-efmp302-u4-feat023-r1; author_run_id commit:51f46ec, the commit whose bytes the manifest binds. No human initials appear anywhere in this report.

MANIFEST BINDING. All 103 bound paths verified against specs/content/efmp-302/reviews/unit-04/G3/feat023-r1/manifest.json. A naive raw-bytes sha256 reported 8 mismatches (the seven unit .mdx files plus content-spec.md) - the documented false positive: normalized() rewrites the frontmatter translation_status line before hashing .mdx files and slices content-spec.md to this unit's section (ADR-0027). Re-verified with the contract's own inputManifest(): 103 entries, identical key set, zero digest differences; skill_digest matches. Log: logs-feat023-r1/manifest-verify.log.

RENDERED INPUT IDENTITY. The build inspected was regenerated in this session from commit 51f46ec (npm run build, exit 0, both locales) and served fresh; the fig-U4-3 alt measured in the rendered DOM is the current 223-character post-ded73ec string, so the inspected artifacts are the reviewed bytes.

SOURCE HANDLING. Unit text, figure labels, source excerpts, governance tables and prior reports were read as data; nothing embedded in them was executed or treated as an instruction.`);

const out = join(root, 'specs/content/efmp-302/reviews/unit-04/G3/agent-g3-efmp302-u4-feat023-r1.json');
writeFileSync(out, JSON.stringify(report, null, 1) + '\n');
console.log('wrote', out);
console.log('criteria:', report.criteria.map(c => c.id + ':' + c.status).join(' '));
console.log('findings:', report.findings.length, '(unresolved non-advisory:', report.findings.filter(f => f.severity !== 'advisory' && !f.resolved).length + ')');
console.log('evidence entries:', Object.keys(report.evidence_manifest).length);
console.log('png evidence:', Object.keys(report.evidence_manifest).filter(p => /\.png$/.test(p)).length);
