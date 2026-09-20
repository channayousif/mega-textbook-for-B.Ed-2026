# G3 English review summary - EFMP-302 Unit 3, run 005

- Reviewer run: `agent-g3-efmp302-u3-run005` (`agent:g3-reviewer`, model `claude-opus-5`)
- Author run: `commit:22708ec`. Reviewed tree: commit `957e130`, `git status --short` empty
  before and after the review.
- Manifest: `specs/content/efmp-302/reviews/unit-03/G3-run005/manifest.json`, verified with
  `inputManifest()` rather than by hand: 142 paths prepared, 142 live, zero missing, zero
  extra, zero digest mismatches, `dirtyInputs()` empty, `skillDigest` identical.
- Disposition: **pass**. All seven required criteria pass. No blocking and no uncertain
  finding. Nine advisory findings are recorded unresolved; none of them blocks publication.

This report is advisory. It is unsigned, no qualification record exists for this reviewer in
the protected registry, and nothing here certifies the unit, writes a tracker row or
constitutes sign-off.

## Verdict on each run-004 finding

1. **`goe2008` Supports cell claimed U3-08 - RESOLVED.** `sources/unit-03.md` now reads
   `topic-01.mdx U3-01 (families of definition in actual use)`, and the coverage matrix grounds
   `goe2008` in U3-01 only. Exact agreement in both directions.
2. **`suarez2022` Supports cell claimed U3-12 - RESOLVED.** Supports is now
   `topic-05.mdx U3-13`; coverage grounds `suarez2022` in U3-13 alone. The regrounding of U3-12
   is corroborated by the bound record at `sources/texts/suarez2022.md`, which states the work
   addresses neither the change agent nor the moral agent.
3. **"No `no-external-source` row was needed" - RESOLVED.** Replaced by "One
   `no-external-source` row covers U3-08 and U3-12", and the table carries that row with
   Supports `topic-03.mdx U3-08; topic-05.mdx U3-12`, matching coverage exactly.
4. **`hurst2009` / `brookfield2017` declarations, and U3-11's undisclosed unread dependency -
   RESOLVED as a disclosure defect.** `hurst2009` declares U3-03, U3-04, U3-05, U3-07, which is
   exactly what coverage grounds in it. `brookfield2017` declares U3-06 and U3-11 and states
   plainly "U3-11, the researcher role, rests on this unread source alone." The declaration the
   run-004 review found missing now exists and is accurate against the coverage matrix.
   One residual observation is recorded as advisory F-04 below: in the prose, the U3-11 section
   carries no Brookfield citation at all.
5. **`check:depth-gate` source-scope cross-check - HOLDS, with three named limits.** See F-05.
6. **Figures as focusable named scroll regions at 360px - RESOLVED, verified by render.** See
   the accessibility section.

## Assessment: independent solve

The ten MCQ keys were derived from the prose before the answers section or any prior report was
opened; the derivation, its per-item prose locators, an independent Bloom classification and an
option-length audit were written to `logs-run005/blind-derivation-run005.md` first.

Derived `1c 2a 3b 4d 5a 6c 7d 8b 9a 10d`. Supplied key identical. **10 of 10 agree**, with no
ambiguous item and no conflicting key.

RRQ mark schemes match the independently derived expectations point for point. RRQ 4's mark
scheme handles the one genuine subtlety correctly: humour's failure is inversion rather than
excess, and the scheme instructs "Do not mark it down for not being an excess", which is
consistent with topic-02's own treatment.

Blueprint conformance against `content-spec.md` `## Unit 3`: 2 MCQs and 2 RRQs per topic across
3.1 to 3.5, one ERQ per topic, ERQ 1 carrying the integrative load with a "Breadth across the
unit" rubric row, and all five ERQs carrying analytic rubrics with an Analyze-or-higher row.

## Sources

Verified against bound excerpts: `taylor2023` (verbatim publisher text, supports the competing
definitions and the "inaccurate or implied definitions" wording exactly), `furlich2016`
(verbatim abstract; the unit correctly reports the verbal result significant and the non-verbal
result not significant, and the "N=77" figure the excerpt flagged is no longer in the prose),
`keelson2024` and `suarez2022` (OpenAlex record summaries), `goe2008` (ERIC full text excerpt).

`hurst2009` and `brookfield2017` remain unread print books. Both are declared under
`## Unverifiable sources` with retrieval attempts, the date, what each leaves unchecked, and the
owner authorisation `D-2026-0001`. Judged against the G3 reference: the declarations are honest,
they match the coverage matrix exactly, and they name the sole-dependency case rather than
leaving it to be inferred. Under the owner ruling this does not fail `sources`; those two
sources are nonetheless still unverified and this report does not claim otherwise.

The unit's citation discipline is unusually strong in two places worth recording. It marks the
school-appraisal extension of Taylor and Thion as "a reasonable inference rather than their
finding", and it refuses not only the 93% Mehrabian claim but also its usual replacement,
labelling "the non-verbal channel wins" a practitioner's heuristic rather than a finding.

## Accessibility and actual presentation

Inspected the served prebuilt `build/` via `npm run serve -- --port 3103` with Playwright
chromium 149.0.7827.0, at desktop 1280x900, narrow 360x740 and A4 print emulation (794x1123,
`media: print`), across all eight unit pages. Artifacts in `render-run005/`.

- Every one of the ten figure carriers overflows at 360px and every one is
  `<figure role="region" tabindex="0" aria-label="Scrollable figure, scroll sideways to see the
  whole diagram">`, and programmatically focusable (`document.activeElement === e` true for all
  ten). The five assessment rubric tables carry the parallel table wording. This is run-004's
  fifth repair, confirmed against the rendered DOM rather than the source.
- No page-level horizontal overflow at 360px on any of the eight pages (360/360 everywhere).
- In print the dark variant is hidden and the light variant forced, with `break-inside: avoid`
  on figures. The MCQ answer key, all ten RRQ mark schemes and all five ERQ rubric tables render
  complete at A4 with no clipping of rows or columns.
- Alt text on all ten figures is substantive and carries the instructional point rather than
  naming the object; the hidden variant is `display: none`, so a screen reader announces each
  figure once.
- No vague link text ("here", "click here", "read more") anywhere in the unit.

## Advisory findings

- **F-01** MCQ option-length cue. In 6 of 10 items (3, 4, 5, 6, 7, 8) the key is the longest
  option, and in items 5, 6 and 7 it is more than twice the length of every distractor. A
  candidate who has not read the unit can score above chance on those items by length alone.
- **F-02** `unit-assessment.mdx` MCQ 4 and MCQ 7 are labelled *(Apply)* but both are verbatim
  recall of a sentence stated in topic-02 and topic-04 respectively; only MCQ 9 of the three
  Apply-labelled items demands transfer. The front matter's "three at Apply" overstates demand.
  The blueprint's Remember-to-Apply range is not breached.
- **F-03** `unit-assessment.mdx` front matter says "ERQs at Analyze and Evaluate"; ERQ 4 is
  labelled *(Create)* with a "Design reasoning (Create)" rubric row. The content spec permits
  "Analyze to Evaluate/Create", so the item is in scope and the front-matter description is what
  is inaccurate.
- **F-04** `coverage/unit-03.md` grounds U3-11 in `brookfield2017`, but `topic-05.mdx` lines
  42-70, the `### The teacher as facilitator and as researcher` section, carries no Brookfield
  citation; Brookfield's only topic-05 in-prose citation is line 105, inside
  `### The teacher as life-long learner`, which coverage grounds in `suarez2022`. This is the
  same shape as the U3-12 defect that was repaired by regrounding to `no-external-source`, and
  it was not repaired the same way. The direction is the safe one, because the declaration
  overstates the dependency rather than hiding it, so it does not meet the G3 reference's
  failure condition. Recommend the owner decide between regrounding U3-11 and citing Brookfield
  in that section, once the book is obtainable.
- **F-05** The new cross-check in `scripts/lib/unit-depth.mjs` does hold: it is wired into the
  depth gate, it compares the Supports cell and the `## Unverifiable sources` bullets against
  the coverage matrix in both directions, and 40 depth-gate tests pass at this commit including
  the two new drift cases. Three limits are worth recording: (a) both loops `continue` when the
  claimed ID set is empty, so a Supports cell or a declaration bullet naming no ID at all is
  silently exempt; (b) `no-external-source` rows are skipped by kind, so that row's own ID
  claims are never cross-checked; (c) it is set equality on IDs only and never checks that the
  prose section for a grounded sub-topic actually cites the key, which is exactly why F-04
  survives a passing gate.
- **F-06** `topic-04.mdx` and its Further reading describe `keelson2024` as "614 university
  students in Ghana". The bound excerpt records that 614 and the tertiary setting are confirmed
  but Ghana rests on author affiliation (Takoradi Technical University) rather than a stated
  study location, and recommends "a technical university in Ghana".
- **F-07** `topic-01.mdx:121` attributes to Goe and colleagues both that different components
  suit different purposes, which the bound excerpt supports directly, and that "an instrument
  built for professional development should not be reused for high-stakes appraisal", which is a
  paraphrase of the excerpt's purpose-before-measure recommendations rather than a position the
  bound text states in that direction. The unit already models the better handling elsewhere by
  marking the Taylor and Thion extension as an inference.
- **F-08** `content-spec.md` describes the sub-topic checklist as "One row per leaf bullet of
  course-guide sections 3.1-3.5", but guide section 3.5 has a single leaf bullet naming all five
  roles and yields three rows (U3-11, U3-12, U3-13): 11 guide leaf bullets, 13 checklist rows.
  Coverage is expanded rather than reduced, so the direction is safe; the self-description is
  what is inaccurate. Relatedly, `content-spec.md:438` traces Unit 3 to "guide CLOs 1, 5", while
  the guide's on-point outcome for this unit, "Identify and exhibit the characteristics and
  qualities of an effective teacher", is its second CLO and is claimed only by Unit 1's "CLOs
  1-3" range. The trace is imprecise, not contradictory, and the unit covers every guide leaf
  bullet for sections 3.1 to 3.5.
- **F-09** Process, not content: the review-unit skill allows "at most two repair/review cycles
  per stage per submission" and this is the fifth G3 cycle on this unit. Each cycle followed a
  genuine input change rather than an unchanged-input retry, so the prohibition on retries
  seeking a pass is not engaged, but the cycle allowance has been exceeded and only the owner
  can waive it. Recorded so that a passing report is not read as having settled that question.

## What this report does not establish

`hurst2009` and `brookfield2017` were not read, so U3-03, U3-04, U3-05, U3-06, U3-07 and U3-11
are supported at bibliographic level only. The Goe clause in F-07 is not covered by the bound
excerpt. No source outside the bound bundle was consulted to reach any conclusion here.
