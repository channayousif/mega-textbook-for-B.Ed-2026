---
id: "0072"
title: "G5 phase complete; PR opened"
stage: misc
date: 2026-09-26
surface: agent
model: LongCat-2.0
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: M Yousif Channa
command: "coordinator RESUME (G5 phase completion, push, PR)"
labels: [efmp-301, g5, urdu, repair, pr]
links:
  spec: null
  ticket: null
  adr: ADR-0019
  pr: "textbook.com.pk repository, branch 022-author-efmp-301"
files:
  - specs/content/efmp-301/reviews/unit-05..11/G5/ (run001 reports + evidence)
  - i18n/ur/.../unit-05..11/ (G5 repairs: semantics, terminology, register)
  - static/img/figures/efmp-301/unit-04..12/ (grid re-mirroring, marker fixes,
    vocabulary alignment, geometry rebuilds, header bands)
  - specs/content/efmp-301/tasks.md (G5 advisory dispositions for all 11 units)
tests:
  - "node scripts/run-gates.mjs full - ALL 17 GATES PASS at the final state"
  - "node scripts/measure-figure-text.mjs on every repaired Urdu figure - clean"
---

## Prompt

Coordinator RESUME: complete the G5 phase for the remaining units, then check:all,
push, and open the PR per the plan.

## Response snapshot

The G5 phase is complete: all 11 units (2-12) reviewed in fresh advisory run001
sessions, every disposition REVISE, every blocking finding repaired and committed.
The later rounds (units 7-11) found the deeper figure defects the earlier sweeps
could not see: the mirroring tool had applied the global 780-cx formula to grouped
local coordinates (fig-U9-4's targets rebuilt), left marker paths in 780-space
inside 10x10 marker viewports (headless arrows in units 8, 9, 10 - all restored),
mis-mirrored grid dividers in eight units (all re-mirrored against their EN
originals), and never carried the Unit 10 G3 figure repairs into the Urdu variants
(now mirrored). Terminology conformance reached every unit's core terms (classroom
management x42, slow-learner family, validity/reliability, teacher effectiveness,
teaching strategy, motivation, anxiety, working memory, the station vocabulary).
One bank defect was found and escalated rather than propagated (the Reliability
row's Arabic-yeh codepoint); one bank conflict was escalated on pedagogical
grounds (Slow Learner = کمزور متعلم contradicts Unit 7's slow-!=-weak teaching).
A dispatch-metadata error of mine (quoting Unit 12's answer key to the Unit 11
reviewer) was caught and documented by that reviewer; the content itself was
verified correct. Final state: all 17 full gates pass, including the production
build; the tracker carries advisory G3/G5 dispositions with repair commits and
owner escalations for every unit.

## Outcome

- ✅ Impact: the complete EFMP-301 course (11 authored units + golden Unit 1) is
  bilingual, reviewed at both G3 and G5 in advisory mode, repaired, and fully
  gate-green.
- 🧪 Tests: check:all (17 gates) PASS at HEAD.
- 📁 Files: 11 G5 report bundles, ~30 Urdu MDX files repaired, ~40 Urdu SVG
  variants repaired, tracker.
- 🔁 Next prompts: owner rulings on the escalated terminology items and the G3
  dependency; the human register pass before translation_status flips.
- 🧠 Reflection: the G5 rounds' deepest value was catching what no deterministic
  gate can - meaning inversions, dropped citations, and figure geometry that only
  browser measurement reveals. The pre-flight lint (mechanical families) cut the
  later rounds' blocking counts roughly in half; a pre-flight GEOMETRY audit
  (grid mirroring + markers vs the EN original) would have cut them further.

## Evaluation notes (flywheel)

- Failure modes observed: the G4 mirroring tool's coordinate bugs (global formula
  on local coordinates, unmirrored path tails, marker paths); terminology drift
  as the default failure of translation at scale; my own dispatch metadata can
  drift (wrong key quoted) - reviewers verifying against bound inputs caught it.
- Graders run and results (PASS/FAIL): all 17 full gates PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): add the grid/marker mirror audit to
  the generate-figures skill's verification step so the defect never ships.
