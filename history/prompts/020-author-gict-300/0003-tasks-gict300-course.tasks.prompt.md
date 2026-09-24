---
id: "0003"
title: "tasks-gict300-course"
stage: tasks
date: 2026-09-23
surface: agent
model: LongCat-2.0
feature: 020-author-gict-300
branch: 020-author-gict-300
user: a2ahs
command: /sp.tasks
labels: ["course-authoring", "gict-300", "tasks"]
links:
  spec: specs/020-author-gict-300/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/020-author-gict-300/tasks.md
tests:
  - Task format validated (checkbox, ID, file paths)
---

## Prompt

Orchestrator task (excerpt): "Follow .claude/commands/sp.tasks.md ->
specs/020-author-gict-300/tasks.md (per-unit tasks like 018's T001-T010, plus G3/G4/G5 tasks
per unit)."

## Response snapshot

Wrote the task checklist: 31 tasks in 6 phases. Phase 1 (T001-T004): content-spec authoring,
intake manifest freeze, evaluator spawn with the D-2026-0030..0039 block, tracker creation.
Phase 2 (T005-T010): author Units 1-6 (one task per unit). Phase 3 (T011-T016): figures per
unit. Phase 4 (T017-T022): G2 gate evidence + G3 advisory review per unit. Phase 5
(T023-T028): G4 Urdu translation + G5 advisory review per unit. Phase 6 (T029-T031):
course-level polish, check:all, PR. Verification section lists the 8 acceptance checks.

## Outcome

- ✅ Impact: Task checklist ready for implementation
- 🧪 Tests: Format validated; every task carries file paths and gate commands
- 📁 Files: 1 file created (tasks.md)
- 🔁 Next prompts: Phase 2 (G1 content-spec + G0/G1 intake)
- 🧠 Reflection: Splitting G2 evidence and G3 review into their own phase (rather than folding
  them into the authoring tasks as 018 did) makes the advisory-only status of G3 explicit and
  keeps the per-unit commit/evidence rhythm auditable.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
