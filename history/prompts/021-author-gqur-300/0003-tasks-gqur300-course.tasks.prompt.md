---
id: "0003"
title: "Generate GQUR-300 task list"
stage: tasks
date: 2026-09-23
surface: agent
model: LongCat-2.0
feature: 021-author-gqur-300
branch: 021-author-gqur-300
user: M Yousif Channa
command: /sp.tasks
labels: ["course-authoring", "gqur-300", "quantitative-reasoning", "tasks", "gates"]
links:
  spec: specs/021-author-gqur-300/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/021-author-gqur-300/tasks.md
tests:
  - All 29 tasks follow the checklist format (checkbox, ID, story label where required, file path)
---

## Prompt

(Full verbatim orchestrator brief recorded in 0001; stage-relevant core below.)

Follow .claude/commands/sp.tasks.md to produce specs/021-author-gqur-300/tasks.md
(per-unit tasks like 018's T001-T010, plus G3/G4/G5 tasks per unit).

## Response snapshot

Generated 29 tasks in 6 phases: Foundation G0/G1 (T001-T003: content-spec draft, intake
evidence, FRESH evaluator with D-2026-0040..0049), Unit authoring (T004-T009, one per
unit, each bundling authoring + governance + figures + gates + evidence + glossary),
G3 advisory reviews (T010-T015), G4 Urdu mirrors (T016-T021), G5 advisory reviews
(T022-T027), and final gates + PR (T028-T029). Every task carries a story label
([US1] authored/accessible, [US2] quality gates, [US3] sources + Urdu parity) and exact
file paths. Verification section lists all 9 gate/render checks.

## Outcome

- Impact: Task tracker ready; Phase 2 (G1 content-spec) can begin
- Tests: 29/29 tasks follow the checklist format
- Files: 1 file created (tasks.md)
- Next prompts: Phase 2 G1 content-spec authoring
- Reflection: Bundling figures + gates + evidence into each unit task (rather than a
  separate figure phase like 018's T008) matches the task brief's per-unit loop and
  keeps every commit unit-shaped.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
