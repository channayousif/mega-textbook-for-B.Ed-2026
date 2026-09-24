---
id: "0038"
title: "Break down GNAS-301 tasks"
stage: tasks
date: 2026-09-23
surface: agent
model: LongCat-2.0
feature: 019-author-gnas-301
branch: 019-author-gnas-301
user: M Yousif Channa
command: "orchestrator task assignment (sp.tasks flow)"
labels: [tasks, gnas-301, per-unit-breakdown, g3-g5]
links:
  spec: specs/019-author-gnas-301/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/019-author-gnas-301/tasks.md
tests:
  - none
---

## Prompt

Orchestrator assignment (condensed; verbatim original in PHR-0035): follow .claude/commands/sp.tasks.md to produce specs/019-author-gnas-301/tasks.md with per-unit tasks like 018's T001-T010, plus G3/G4/G5 tasks per unit.

## Response snapshot

Authored tasks.md: 24 tasks in 5 phases - T001-T003 foundation (content-spec, intake evaluation with the D-2026-0020..0029 block, course tracker), T004-T010 per-unit English authoring with figures/gates/evidence (Unit 1 also replaces the legacy placeholder tree; T010 rewrites course-overview and _category_.json), T011-T016 G3 advisory review per unit, T017-T022 G4 translation + G5 review per unit, T023-T024 final gates and PR. Verification list covers all 11 gates, SVG budgets with mirrored Urdu variants, concept graph, Bloom bands, depth budgets, and Urdu mirror parity.

## Outcome

- ✅ Impact: feature 019 task breakdown created; dependency-ordered and per-unit scoped.
- 🧪 Tests: none (planning stage).
- 📁 Files: specs/019-author-gnas-301/tasks.md.
- 🔁 Next prompts: begin Phase 2 of the orchestrator assignment (G1 content-spec + intake).
- 🧠 Reflection: giving each unit one authoring task, one G3 task, and one G4+G5 task keeps the tracker rows and the per-unit gate evidence in a 1:1 relationship with tasks.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): not applicable.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
