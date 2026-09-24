---
id: "0008"
title: "G3 phase complete, G5 launched"
stage: misc
date: 2026-09-24
surface: agent
model: LongCat-2.0
feature: 021-author-gqur-300
branch: 021-author-gqur-300
user: M Yousif Channa
command: review-evidence + g3-reviewer + prepare-gate-evidence
labels: ["gqur-300", "g3", "reviews", "repairs", "g5", "evidence"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: ADR-0019
  pr: null
files:
  - specs/content/gqur-300/reviews/unit-03/G3/ (run001 report)
  - specs/content/gqur-300/reviews/unit-04/G3/ (run001 report)
  - specs/content/gqur-300/reviews/unit-05/G3/ (run001 report)
  - specs/content/gqur-300/reviews/unit-06/G3/ (run001 report)
  - specs/content/gqur-300/reviews/unit-01..06/G5/manifest.json (bundles prepared)
  - docs/semester-1/gqur-300/unit-05/ + unit-06/ (repairs, EN)
  - i18n/ur/.../gqur-300/unit-05/ + unit-06/ (repairs, UR)
  - static/img/figures/gqur-300/unit-05/fig-U5-5.* (geometry fix, 4 variants)
  - specs/content/gqur-300/coverage/unit-05.md, sources/unit-05.md
  - specs/content/gqur-300/sources/texts/openstax-prealgebra.md, pbs.md
tests:
  - npm run check:content PASS (11/11) after repairs and evidence rebind
  - npm run check:all PASS (17/17) at HEAD ea3877d
  - measure-figure-text PASS on all four fig-U5-5 variants
---

## Prompt

(Full verbatim orchestrator brief recorded in 0001; stage-relevant core below.)

Phase 4: G3 advisory review on EVERY unit; apply sensible repairs; if bytes change, re-run
prepare-gate-evidence and update the G2 row. Phase 5: G5 review on EVERY unit, max 2 concurrent
reviewer subagents per the coordinator capacity note.

## Response snapshot

G3 run001 completed for Units 3-6 (dispositions: revise). Unit 3 blocking: U3-03 grounded in
nothing verifiable (re-grounded as no-source-u3-3, gap G-2026-29 escalated to the owner; the
reviewer independently confirmed OpenStax Prealgebra 2e has no inequalities chapter). Unit 4
repairs at 78f0366. Unit 5 blocking: fig-U5-5 dot positions did not match the stated data
(2-stack at x=300 instead of 375, 3-stack at 360 instead of 435, median line at 300 instead of
375, mode circle on the 60-stack), the gender gap stated as "nearly 10 percentage points" when
64.23 - 50.21 = 14.02, and openstax coverage rows claiming data-displays content the book does
not have (Chapter 11 is the rectangular coordinate system). Unit 6 blocking: ERQ-3 ratio
arithmetic (two teachers at a PTR-50 school of 100 pupils is 100/4 = 25, not 100/3 = 33) and
missing prose citations for tout2020, steen2001 and pbs where the coverage matrix grounds them.

Repairs applied at 2d5cd6a: fig-U5-5 rescaled to x = 60 + (mark-20)*7.5 in all four variants
with labels re-anchored to avoid the 15px mean/median collision; gender gap corrected in
topic-03 and the RRQ-9 model answer; Section 5.5 of Prealgebra 2e fetched and verified (four
objectives; frequency tables in the mode worked examples 5.54/5.55; no bar graphs or pie
charts) and the openstax excerpt, sources row, coverage row (U5-02 openstax row removed) and
prose citations scoped to what the book actually contains; pbs excerpt extended with the
census-conduct details already quoted in prose (first digital census, tablets, March-May 2023,
CCI); ERQ-3 corrected to 25 (100/4) in both the rubric and the assessment; steen2001, tout2020
and pbs prose citations added at the sections the coverage matrix names. All repairs mirrored
into the Urdu translations. G2 evidence rebound for Units 5-6 and tracker G3 rows recorded for
all six units (all rows remain unchecked: advisory per ADR-0019). G5 bundles prepared for all
six units; G5 run001 launched for Units 1-2 (2 concurrent per the capacity note).

## Outcome

- Impact: G3 advisory phase complete for all 6 units; G5 phase started
- Tests: check:content 11/11 PASS; check:all 17/17 PASS at ea3877d
- Files: 4 G3 reports, 6 G5 bundles, Units 5-6 EN+UR repairs, fig-U5-5 (4 variants)
- Next prompts: G5 units 3-6, G5 repairs, merge origin/main, check:all, push, PR
- Reflection: the depth gate caught a literal sub-topic token ("U5-02") inside my rephrased
  Supports cell and refused it because the coverage matrix no longer grounds that row - the
  gates and the reviewer findings caught different classes of error, both real.

## Evaluation notes (flywheel)

- Failure modes observed: hand-plotted dot positions eyeballed rather than computed from the
  axis scale; a percentage point difference described from memory instead of subtracted; a
  source credited with chapter content never verified against its table of contents.
- Graders run and results: check:content PASS, check:all PASS, measure-figure-text PASS.
- Prompt variant (if applicable): null
- Next experiment: null
