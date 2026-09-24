---
id: "0007"
title: "G3 reviews and G4 Urdu mirrors"
stage: misc
date: 2026-09-24
surface: agent
model: LongCat-2.0
feature: 021-author-gqur-300
branch: 021-author-gqur-300
user: M Yousif Channa
command: review-evidence + g3-reviewer + translate-unit
labels: ["gqur-300", "g3", "g4", "urdu", "reviews", "repairs"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: ADR-0019
  pr: null
files:
  - specs/content/gqur-300/reviews/unit-01/G3/ (run001 report + repairs)
  - specs/content/gqur-300/reviews/unit-02/G3/ (run001 report + repairs)
  - specs/content/gqur-300/reviews/unit-03/G3/ (in flight)
  - specs/content/gqur-300/reviews/unit-04/G3/ (in flight)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-01..06/ (all 36 UR files)
tests:
  - check:content PASS after every UR mirror
  - reviewed-flip parity test on Unit 3 (all parity gates hold)
---

## Prompt

(Full verbatim orchestrator brief recorded in 0001; stage-relevant core below.)

Phase 4: G3 review on EVERY unit (advisory, fresh g3-reviewer per unit, max 2 cycles). Phase 5:
G4 translation + G5 review on EVERY unit. Re-run check:content after each Urdu mirror.

## Response snapshot

G3 run001 completed for Units 1 and 2 (dispositions: revise). Unit 1 blocking findings: fig-U1-4/
fig-U1-6 text clipping, coverage rows without prose attribution, missing npst2009 point-of-use
disclosure. Unit 2 blocking findings: fig-U2-1 clipping (100px), a self-refuting add-to-scale
example (20 more people is a doubling where adding is coincidentally correct), gula2025 cited
only in Further reading, and a false concept-graph linkage (CON-2-7 to RRQ-05). All repaired in
commit 93e6321: labels shortened across units 1-6 (fig-U1-4, U1-6, U2-1, U3-2, U3-5, U4-6, U5-4,
U6-2, U6-6), the recipe example corrected to 30 more people across all five locations, gula2025
prose citation added, CON-2-7 unlinked, npst2009 disclosure added, MCQ key redistributed (was 9 of
10 option b), course-overview rewritten with SLO definitions, content-spec Unit 1 CLO refs widened
to outcomes 1, 2 and 3. G2 evidence rebound for all six units. G3 run001 for Units 3-4 launched
(2 concurrent per the capacity note). G4 Urdu mirrors completed for all six units (36 files),
each passing check:content; Unit 3 verified with the temporary reviewed-flip parity test (all
parity gates hold; only owner G4/G5 tracker rows would block, as designed).

## Outcome

- Impact: 2 of 6 G3 reviews complete with repairs applied; all 6 Urdu mirrors done
- Tests: check:content PASS after every mirror and repair
- Files: review bundles, 36 UR files, repair commits
- Next prompts: G3 units 5-6, G3 second cycle units 1-2, G5 all units, check:all, PR
- Reflection: the two G3 reviews found real defects the gates could not see (self-refuting
  worked example, unsound model answer, concept-graph linkage the structural gate passes). This
  is ADR-0019 working as designed.

## Evaluation notes (flywheel)

- Failure modes observed: an example chosen at the one multiplier where the misconception's wrong
  method gives the right answer; MCQ answer keys clustering on one option.
- Graders run and results: check:content PASS throughout; reviews advisory.
- Prompt variant (if applicable): null
- Next experiment: null
