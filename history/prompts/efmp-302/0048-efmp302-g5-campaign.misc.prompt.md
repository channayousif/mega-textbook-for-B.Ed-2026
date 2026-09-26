---
id: "0048"
title: "EFMP-302 G5 campaign complete"
stage: misc
date: 2026-09-25
surface: agent
model: LongCat-2.0
feature: 023-author-efmp-302
branch: 023-author-efmp-302
user: orchestrator
command: completion-agent phase 4 (G5 reviews)
labels: [efmp-302, g5, urdu, review, feat023]
links:
  spec: specs/023-author-efmp-302/spec.md
  ticket: null
  adr: ADR-0019
  pr: null
files:
  - specs/content/efmp-302/reviews/unit-02/G5/ (feat023 r1+r2)
  - specs/content/efmp-302/reviews/unit-03/G5/ (feat023 r1+r2)
  - specs/content/efmp-302/reviews/unit-04/G5/ (feat023 r1+r2)
  - specs/content/efmp-302/reviews/unit-05/G5/ (feat023 r1+r2)
  - specs/content/efmp-302/reviews/unit-06/G5/ (feat023 r1, r2 pending)
  - specs/gaps.md (G-2026-65, G-2026-66, G-2026-67)
  - i18n/ur/.../unit-0{2,3,4,5,6}/ (G5-demanded repairs)
  - static/img/figures/efmp-302/ (fig-U4-8, fig-U5-4, fig-U5-8, fig-U6-7 Urdu variant repairs)
tests:
  - All G5 reports validate (review-evidence.mjs validate exit 0)
  - check:content green after every repair round
  - figures:variants:check OK (466) after every figure repair
---

## Prompt

Phase 4: fresh advisory G5 reviews for every unit with a complete Urdu mirror (units 2-6; Unit
1's accepted human sign-off stands, its mirror untouched).

## Response snapshot

Eleven G5 review runs across five units (a host reboot at ~01:30 interrupted two mid-run; their
evidence was committed and both were re-spawned fresh). Every review bound current English bytes
as the comparison base with the G3 dependency recorded as an uncertain finding (G-2026-65,
course-wide). Outcomes: Unit 2 r1 revise (one Urdu key gap) repaired, r2 all ten criteria pass;
Unit 3 r1 revise (8 semantic defects) repaired, r2 all ten pass; Unit 4 r1 revise (13 defects)
repaired, r2 12/13 verified with 4 residuals repaired post-report and escalated (G-2026-66);
Unit 5 r1 revise (9 defects) repaired, r2 all nine verify, 9/10 pass with the advisory register
batch escalated (G-2026-67); Unit 6 r1 revise (one figure defect) repaired, r2 verifying. All
MCQ keys re-derived blind matching both keys; key_terms bank-accepted on every unit; render/rtl
clean throughout; 13+ Urdu-side repair commits. No row marked done; translation_status stays
draft on units 2-6.

## Outcome

- ✅ Impact: every unit with a mirror carries fresh advisory G5 evidence; 34 of 50 criteria-pass
  verdicts across the final cycles; the remaining failures are owner-gated dependencies and
  advisory register items.
- 🧪 Tests: as listed, all green.
- 📁 Files: as listed.
- 🔁 Next prompts: Unit 6 G5 r2, then check:all and the PR.
- 🧠 Reflection: the parallel-reviewer pattern with one shared build and assigned ports worked
  well until the reboot killed the render servers; committing interrupted evidence before
  re-spawning preserved everything.

## Evaluation notes (flywheel)

- Failure modes observed: host reboot mid-review (recovered by commit + fresh re-spawn); the
  Agent tool classifier timeout (transient).
- Graders run and results: all G5 reports validate; content gates green after every repair.
- Prompt variant: g5-reviewer with shared-build and assigned-port instructions.
- Next experiment: the final gates + PR.
