---
id: "0070"
title: "G3 phase complete, G5 phase launched"
stage: misc
date: 2026-09-25
surface: agent
model: LongCat-2.0
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: M Yousif Channa
command: "coordinator RESUME (G3 wrap + G5 phase)"
labels: [efmp-301, g3, g5, review, repair, tracker]
links:
  spec: null
  ticket: null
  adr: ADR-0019
  pr: null
files:
  - specs/content/efmp-301/tasks.md (G3 advisory dispositions for Units 2-12; G2 rows re-evidenced)
  - specs/content/efmp-301/reviews/unit-11/G3/ (round-1 report + repairs)
  - specs/content/efmp-301/reviews/unit-12/G3/ (round-1 report + repairs)
  - docs/semester-1/efmp-301/unit-11/unit-assessment.mdx (MCQ 7/3 -> 5/5; ERQ 1/3/1 -> 2/2+1)
  - docs/semester-1/efmp-301/unit-12/ (blueprint 4/3/3 + 3/4/3; worked examples; figure fixes)
  - static/img/figures/efmp-301/unit-12/fig-U12-1.*.svg (dashed link attached + labelled)
  - static/img/figures/efmp-301/unit-12/fig-U12-3.*.svg (five-row rebalance, overprint fix)
  - specs/content/efmp-301/sources/unit-12.md (seifert2009 row restated to honest support)
  - specs/content/efmp-301/sources/texts/seifert2009.md (mislabeled Ch 10 heading -> Ch 2)
  - specs/content/efmp-301/sources/texts/who2026.md, vosniadou2001.md (Used-for extended to U12)
  - i18n/ur/.../unit-11/, i18n/ur/.../unit-12/ (all repairs mirrored)
  - specs/content/efmp-301/reviews/unit-02/G5/manifest.json, unit-12/G5/manifest.json (G5 begins)
tests:
  - "node scripts/run-gates.mjs content - 9 of 11 PASS; pipeline-gate + content-status re-greened after evidence refresh"
  - "node scripts/measure-figure-text.mjs (8 Unit 12 figure variants) - PASS"
  - "node scripts/check-pipeline-gate.mjs - PASS at 43e2e859"
---

## Prompt

Coordinator RESUME: complete the G3 advisory phase, record tracker dispositions, then
run the G5 (Urdu) advisory phase for all units, then check:all, push and open the PR.

## Response snapshot

G3 round-1 complete for all 11 units (2-12), every disposition REVISE, every blocking
finding repaired. Unit 11: MCQ spread 7/3 -> 5/5 (MCQ-02 onto the stations, MCQ-06 onto
the referral record), ERQ 1/3/1 -> 2/2+1 (ERQ-02 re-themed to the steady-marks
signs-pattern analysis), sources row restated as background-only. Unit 12: MCQ 5/3/2 ->
4/3/3, RRQ 5/3/2 -> 3/4/3 with the Analyze band now reached, MCQ keys rebalased to an
a/b/c/d spread, the wrong cross-unit analogy attribution fixed (Unit 3 -> Unit 4),
fig-U12-3's fifth-row text-on-text overprint repaired by rebalancing all five rows into
70px bands (plus the missing separator and the Urdu 398->382 mirror error), fig-U12-1's
dashed link attached and labelled per the manifest prompt, the seifert2009 registry row
restated to honest bound support with the mislabeled Chapter 10 heading corrected to
Chapter 2, and the spec's two missing worked examples delivered (Hyderabad counselor
week, post-floods referral). All repairs mirrored into Urdu. G2 evidence refreshed for
all 11 units at the final state (43e2e859). Advisory G3 dispositions recorded in the
tracker for Units 2-12 following the GQUR-300 PR #65 row pattern. G5 phase launched:
manifests prepared and fresh g5-reviewer agents dispatched for Units 2 and 12 (capacity
rule: max 2 concurrent reviewers).

## Outcome

- ✅ Impact: the English course is at its reviewed, repaired, fully gate-green state;
  the G5 Urdu phase is underway.
- 🧪 Tests: pipeline gate PASS; all content gates PASS at the final evidence state.
- 📁 Files: 2 units' EN+UR content, 8 figure variants, 3 shared excerpts, tracker.
- 🔁 Next prompts: G5 reviews for Units 3-11, G5 repairs, final check:all, push, PR.
- 🧠 Reflection: the Unit 12 review exposed a new failure class - overstatement in the
  sources REGISTRY (claiming bound support from chapters never excerpted) - which the
  deterministic gates cannot see. The repair pattern (restate the row to what is
  actually bound, re-ground coverage) is now proven across Units 11 and 12.

## Evaluation notes (flywheel)

- Failure modes observed: registry overstatement beyond the bound excerpts; figure
  text-on-text overprint invisible to measure-figure-text (third occurrence - U10-4,
  U12-3; browser-measured audits remain necessary); MCQ key clustering.
- Graders run and results (PASS/FAIL): all gates PASS after repairs; both new review
  reports validate.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): author the sources registry row from the
  bound excerpt's Used-for list (not from the book's table of contents) at authoring
  time.
