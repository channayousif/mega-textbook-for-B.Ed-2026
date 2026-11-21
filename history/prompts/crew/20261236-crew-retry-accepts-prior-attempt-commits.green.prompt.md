---
id: 20261236
title: Crew retry accepts commits from an earlier attempt
stage: green
date: 2026-11-21
surface: agent
model: claude-opus-5-5
feature: crew
branch: fix/crew-retry-prior-commits
user: M Yousif Channa
command: yes, fix the retry bug too
labels: [board-direct, crew]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - scripts/crew/checks.mjs
  - scripts/crew/crew.mjs
  - tests/crew/checks.test.mjs
tests:
  - node --test tests/crew/*.test.mjs (151 pass, 0 fail)
---

## Prompt

yes, fix the retry bug too

## Response snapshot

`finishSuccess` required commits since this attempt's `startHead`. When an attempt committed its
work and then died (auth error, timeout), every retry reused the branch, found nothing left to
do, and failed with "the worker exited without committing any change"; after three attempts the
job went `gate_red` (efpg-401-u01-plan_illustrations, landed by hand in PR #681).

New pure helper `workMade` in `scripts/crew/checks.mjs`: a job on its own fresh branch (no CI-fix
`parent`, no salvage `base`) that is ahead of origin/main counts as having made work even when this
attempt added nothing, and the produced files are then diffed with `origin/main...HEAD`. CI-fix and
salvage jobs start ahead of main, so they still must add commits. All later checks (work files,
content findings, registry damage) still run. Two tests added.

## Outcome

- ✅ Impact: a retry after a partly successful attempt finishes instead of burning attempts into gate_red.
- 🧪 Tests: 151/151 crew tests pass.
- 📁 Files: checks.mjs (workMade), crew.mjs (finishSuccess uses it), checks.test.mjs.
- 🔁 Next prompts: none.
- 🧠 Reflection: "made nothing this attempt" and "branch has no work" are different facts; the check conflated them.

## Handoff (for CEO and agents)

- Shipped / changed: crew success check accepts a job's own earlier-attempt commits.
- Decisions the team must respect: CI-fix (parent) and salvage (base) jobs still must add commits per attempt.
- Pending / next owner: none.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: retry-after-partial-success misread as no work.
- Graders run and results (PASS/FAIL): crew node tests PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
