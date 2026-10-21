# GQUR-301 Unit 2: advisory G3 review, round 1

Disposition: **escalate**, with observed defects requiring author revision. No certification,
provisional publication recommendation, tracker completion or content repair is made.
Reviewer: agent:codex-g3-reviewer. Actual session: 01a15ce3-0ba2-75d2-aff3-2592f4a5fb48.
Model identity available to this host: GPT-6; exact serving snapshot unavailable.
Reviewed commit: 2186dd161e7665c93e140525fd949a6b07e00c88, equal to origin/main at review start.
Skill 1.1.0; G3 rubric 1.0.0; actual style guide 4.6 (the spec header still says 4.5).

## Provenance and limits

The checkout was clean and had no commits beyond origin/main. No parent-prepared G3 bundle
or actual author run identity was supplied. The reviewer prepared a diagnostic manifest of
96 committed inputs before writing findings. All 96 current digests were recomputed and
verified. This is input binding, not proof of a parent-frozen handoff. The last unit-changing
commit is 47e142532868643a41e53abfca375f4e7c8ceb6e; a commit is not an author run ID.
The report explicitly records the author run identity as unavailable rather than inventing it.
This session did not author or translate these inputs.

The entire assessment, including supplied guidance, was displayed in one read before the
solution record below was written. Therefore solve-before-consulting-guidance independence
was not achieved. The calculations below are useful checks but cannot substitute for a fresh,
answer-blind assessment review. This procedural limitation also requires escalation.

The job expressly prohibits builds, dev servers and Playwright. No browser or print inspection
was run, and no rendered artifacts are claimed. The optional text-geometry script imports
Playwright, so it was not run either. Desktop, 360px, keyboard scrolling, light/dark and A4
print presentation remain unverified. SVG source geometry supports the factual findings
below, but cannot establish actual glyph clipping or page accessibility.

## Authority and coverage

The authoritative guide, Scheme-and-Course-guides/extracted-text/2nd 2026.txt, Chapter 2
(lines 416-425), lists two sections and five leaves. The approved content spec's Unit 2
checklist and both topic files follow that partition. All five leaves have substantive
explanations, not just headings: topic-01 explains grouping, counts and running totals;
topic-02 distinguishes category comparisons, grouped numeric distributions and shares.
The mapping to unit-assessment covers both outcomes and all five leaves. The bank contains
10 MCQ, 10 RRQ, 5 ERQ, with at least two MCQ and RRQ per topic. ERQ 3-5 require comparative
judgements with reasons, satisfying the unit-level higher-order floor.

The current tracker leaves G1 open and advises fresh intake evaluation. intake-3/evaluation.md
approved the old six-unit partition, not this 16-unit spec. Owner ruling D-2026-0070 confirms
the new partition but explicitly advises fresh intake before G3. Authority therefore remains
unverified pending owner/evaluator confirmation of the restructured G1, rather than treating
old intake evidence as current approval. No new intake or scope decision is made here.

## Source support inspected

Bound evidence: sources/unit-02.md and sources/texts/lane2023.md, Chapter 2. The latter is a
short authored synopsis, not a captured primary-source passage; its old Unit 1 labels refer
to the superseded grouping. It supports general chart distinctions but cannot verify the
whole unit's claims or numerical drawings.

Supplemental primary-source inspection on 2026-10-21:

- [Lane, Histograms](https://onlinestatbook.com/2/graphing_distributions/histograms.html),
  paragraphs beginning with the grouped distribution example and the final discussion of
  bin choice (browser text lines 6-31). It demonstrates grouping counts, boundaries,
  quantitative discrete scores and continuous measurements. Its closing discussion makes
  width selection conditional on how well a plot communicates a distribution.
- [OpenStax 1.3](https://openstax.org/books/introductory-statistics-2e/pages/1-3-frequency-frequency-tables-and-levels-of-measurement),
  Frequency subsection and Tables 1.10-1.12 (browser text lines 46-89). It defines counts,
  count/total proportions and accumulated proportions. These support topic-01's table
  operations, not the accuracy of a particular SVG drawing.

These live pages were not in the prepared manifest as captured primary-source bytes. They
are supplemental diagnostic evidence only. A new parent bundle should bind the necessary
source text before an accepted review. Full source verification, including graphical and
unequal-width histogram guidance, remains unverified; URL resolution is not a pass.

## Blocking revision requests

1. **F1, figure quantitative accuracy.** static/img/figures/gqur-301/unit-02/fig-U2-3.svg,
   LEFT Bars / Y labels: the baseline y=320 and tick 50 at y=240 imply 1.6 pixels per pupil.
   Heights 150, 210, 90, 35, 15 imply 93.75, 131.25, 56.25, 21.875, 9.375 pupils, rather
   than 45, 78, 32, 12, 5. Reconstruct the chart with one linear scale and actual counts.
   RIGHT Pie slices: the first ray (620,125) to (701.5,184) sweeps about 72 degrees rather
   than 45/172*360 = 94.19 degrees. The final endpoint (537,195) does not return to the
   starting ray, leaving an unfilled wedge. Build five contiguous, correctly proportioned
   sectors totalling 360 degrees, with redundant category labels. Re-derive the dark asset
   and review both. The page alt repeats the three-chart description but does not identify
   the middle histogram as an intentional misuse; explicitly convey that teaching distinction.

2. **F2, assessment interval-width overclaims.** unit-assessment.mdx, RRQ 1 and ERQ 2
   guidance: no data range or shape is supplied for the 30 marks or 60 heights. Width 2 is
   not necessarily too sparse and width 5 is not necessarily best. Supply actual values or
   a range, or award reasoned conditional choices instead of prescribing width 5. RRQ 5
   calls width 1 intrinsically wrong even though 15 bins can usefully show an integer-mark
   distribution; ask learners to compare representations for a stated purpose and accept
   a justified fine-grained table. MCQ 4 option A also covers every observation exactly once
   in equal intervals; B is more compact but the question gives no explicit optimisation
   criterion. Clarify the objective or revise alternatives for a defensible single best answer.

3. **F3, higher-order per-topic demand.** topic-01.mdx, Summative task / Mini-rubric:
   constructing a prescribed width-5 table and reading a prescribed cutoff require Apply
   and routine interpretation. Neither criterion requires Analyze or higher as mandated
   by style-guide.md, Per-topic cycle assessments. Add a comparison or justified grouping
   decision and reward the reasoning. The unit-end ERQs do not waive this per-topic rule.

4. **F4, production skills are underscaffolded.** topic-02.mdx, Pie charts / Activity /
   Summative task: learners must draw pie charts without a worked percentage-to-angle
   procedure. Histograms are defined but no correct quantitative histogram is worked;
   fig-U2-3 shows only an explicitly wrong categorical example. Add worked sector sizing
   and labelled numeric bins before requiring chart production. The final mark interval
   80-100 contains 21 integer scores while earlier intervals contain 20; clarify boundaries,
   measurement convention and appropriate heights/areas, or use consistently wide bins.
   ERQ 5 also expects unequal-width histogram criticism without teaching density. Teach
   area proportional to frequency and height proportional to frequency/width, or narrow
   the expected correction to the equal-width procedure actually taught.

## Readability, pedagogy and accessibility

Readability passes for the inspected prose: topic-01 defines the essential table columns
before a worked example, uses short numbered steps, and explains cumulative totals in
ordinary language. topic-02 defines each chart in context. Technical vocabulary is unpacked
locally. Books-read pair work (20 minutes) and the three-person chart activity (25 minutes)
need only paper and ordinary classroom data, so they are feasible in the stated context.
Pedagogy fails for F1-F4 despite that useful progression. Teacher-notes, Topic 2.2 and
Materials needed, also ask for all three charts of one dataset without explaining the
numeric/categorical distinction at each station; coordinate those instructions with F4.

Source inspection shows ordered headings, meaningful topic links, nonempty figure alt text,
and a final bounded answers section. Figure/alt descriptions for figures 1, 2 and 4 match
their SVG desc strings; figure 3 also matches but omits the instructional misuse distinction.
No claim is made about viewport reachability or clipping without a browser inspection.

## Assessment calculation record (not answer-blind)

MCQ 1 B (count), 2 B (unique bin), 3 B (all scores <=49), 4 B preferred but A valid
without a stated efficiency criterion, 5 D (4+10+10=24), 6 B (adjacent numeric intervals),
7 C (shares), 8 B (heights), 9 B (separate categories), 10 B (too many slices). The supplied
letters match these preferred selections; MCQ 4 remains ambiguous as explained in F2.

RRQ checks, in order:

1. Width 10 can smooth a sufficiently broad range; without the range no universal choice.
2. Ages: 20-29 count 2; 30-39 count 6; 40-49 count 4; total 12.
3. 27-15=12 in the later bin.
4. Cumulative answers a threshold question; individual frequency answers a bin question.
5. Fifteen one-mark classes show individual scores; width 5 smooths them. Neither is
   inherently wrong without specifying the communicative goal.
6. Gaps distinguish category bins from adjacent numeric intervals; discrete quantitative
   data can also be histogrammed, so touching bars do not prove continuous measurement.
7. Bar chart compares counts; pie chart communicates shares.
8. 78/172*100=45.3488%, rounded 45.3%; pie or percentage bar chart can show shares.
9. Day-labelled bars preserve chronology; a histogram discards it and shows frequencies.
10. Sports are categories, so use separated bars or a labelled share chart.

ERQ checks:

1. Counting the 24 raw marks gives f=(4,10,9,1), cumulative=(4,14,23,24), with 19/24
   between 15 and 24. Supplied totals agree.
2. Compare noise and smoothing conditional on range and shape; no unique width follows
   from n=60. The supplied unconditional rubric should not penalise a justified alternative.
3. Pie conveys district shares; nine slices impede comparisons. A labelled sorted bar
   chart supports comparing taluka school counts. Supplied rubric broadly agrees.
4. Grade counts: bars; grade-8 marks: numeric histogram; pass/fail share: pie or percent
   bars with justification. Missing labels and distorted scales impede interpretation.
5. Specify non-overlapping income boundaries. For unequal numeric bin widths retain
   actual widths and density heights so area represents count, or re-bin from raw data
   into equal widths. Counts alone in three aggregate bins cannot recover a finer equal-bin
   table. Supplied rubric partially covers area, but the teaching does not scaffold it.

Topic tasks and formative checks:

- Topic-01 books: with bins 1-2, 3-4, 5-6, 7-8, frequencies 3,7,7,3, cumulative 3,10,17,20;
  range 8-1=7. Other sensible bins are possible.
- Topic-01 formative item 3: bins 2-3,4-5,6-7,8-9 give f=1,6,7,2 and cumulative 1,7,14,16.
  Item 1: interval/frequency, optionally relative/cumulative. Item 2: more observations
  can support more bins, but sample size alone does not determine them.
- Topic-01 heights: bins 135-139,140-144,145-149,150-154,155-159 give f=2,5,5,6,2;
  cumulative 2,7,12,18,20. Twelve pupils are below 150 cm.
- Topic-02 opening: n=172, shares 26.16%,45.35%,18.60%,6.98%,2.91%; angles approximately
  94.19,163.26,66.98,25.12,10.47 degrees. A categorical histogram is inappropriate.
- Topic-02 formative: histogram versus separated bars distinction as above. Favourite
  subjects total 63; angle=360*count/63 gives 68.57,102.86,85.71,57.14,45.71 degrees.
- Topic-02 summative frequencies total 200. Nominal heights 15,35,60,55,35 apply only
  after a consistent-width boundary convention; otherwise use appropriate density heights.
  Most pupils (115/200) are in 40-79. The supplied symmetric-shape judgement needs caution.

## Checks and handoff

Actual command logs are adjacent to this summary and hashed by the JSON report. All six
mandatory deterministic commands passed. The full 13-gate content suite failed only because
static/content-status.json is absent in this checkout. The initial run used unchanged
origin/main bytes (HEAD and origin/main equal, no tracked changes). This is the baseline
finding; the final rerun is compared against it. No build, server or Playwright was run.

The advisory tracker row is expressly required by the crew brief, overriding the skill's
ordinary no-tracker-write rule. It remains open, uses an agent identity, and points to an
escalation report without a certified or provisional evidence token. Historical rows remain.

Next owners: author repairs F1-F4; owner/evaluator resolves fresh G1 authority and supplies
actual provenance; orchestration prepares a new bundle with source passages and enables a
fresh answer-blind reviewer with permitted narrow-screen and A4 inspection. Prior old-grouping
reports remain archived and are not superseded by an acceptance in this attempt.

Final rerun completed: 12 of 13 content gates passed. The complete failure section and exit
code match the initial origin/main-state run exactly. No new findings were introduced; see
check-content-final.txt and baseline-comparison.txt.
