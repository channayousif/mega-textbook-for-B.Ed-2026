---
id: 0040
title: Reconcile Unit One G3 Repairs
stage: misc
date: 2026-11-05
surface: agent
model: GPT-6
feature: 019-author-gnas-301
branch: crew/gnas-301-u01-repair_en-r1
user: owner
command: Read .crew/brief.md
labels: [codex, gnas-301, repair]
links:
  spec: specs/019-author-gnas-301/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/content/gnas-301/tasks.md
  - specs/content/gnas-301/reviews/unit-01/repair-20261105.md
  - history/prompts/019-author-gnas-301/0040-reconcile-unit-one-g3-repairs.misc.prompt.md
tests:
  - npm run check:content
  - scripts/heavy.sh npm test
  - node scripts/measure-figure-text.mjs static/img/figures/gnas-301/unit-01/*.svg
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Reconciled latest G3 report 20261102T213114Z-g3-desk-00b73da1.json against
current Unit 1 files. All reported SVG fixes already exist in base commit
250b7b0d9; preserved them and verified 32 SVG variants. Appended the required
advisory repair tracker row, leaving G3 unticked. Recorded each finding's disposition
and preserved the deferred shared WHO heading and unverified live-page inspection.

## Outcome

- Impact: Traceable repair reconciliation without duplicating existing source changes.
- Tests: Geometry PASS for 32 SVG variants; all 368 unit tests PASS across 31 files. All 14 final content gates PASS after refreshing ignored static/content-status.json.
- Files: Advisory tracker row, Unit 1 repair record and required PHR.
- Next prompts: Owner coordinates permitted browser/print inspection and independent review; Unit 2 owner coordinates shared source heading and evidence refresh.
- Reflection: Inspect command dependencies before execution, including scripts described as geometry measurement.

## Handoff (for CEO and agents)

- Shipped / changed: Latest Unit 1 G3 finding reconciliation and unticked advisory tracker row.
- Decisions the team must respect: Preserve existing SVG repairs and 780 by 490 fig-U1-6 carriers; no certification, evidence signing or publication change.
- Pending / next owner: Owner/orchestrator owns page rendering and fresh independent review under G-2026-24; Unit 2 evidence owner owns deferred shared heading correction.
- Paperclip issues affected: None supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Report describes defects already fixed in base. Geometry script internally launches Playwright Chromium and was inadvertently run without the heavy wrapper despite brief restrictions; it exited, the deviation was disclosed, and no further browser commands ran. No build or dev server was started.
- Graders run and results (PASS/FAIL): Geometry PASS (32); unit tests PASS (368 across 31 files); content gates PASS (14); git diff --check PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run permitted live-page accessibility inspection before independent certification.
