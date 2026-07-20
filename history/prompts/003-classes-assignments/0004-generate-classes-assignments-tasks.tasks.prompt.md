---
id: 0004
title: Generate classes/assignments tasks
stage: tasks
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 003-classes-assignments
branch: 003-classes-assignments
user: channayousif@gmail.com
command: /sp.tasks
labels: ["tasks", "classes-assignments", "rls-testing"]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/003-classes-assignments/tasks.md
tests:
 - none (tasks-generation stage; the 67 tasks themselves specify 20 new RLS tests and 6 new e2e tests to be written during implementation)
---

## Prompt

(No additional user input provided — `/sp.tasks` invoked with empty arguments to run the standard task-generation workflow against the completed spec.md + plan.md/research.md/data-model.md/contracts/quickstart.md for branch `003-classes-assignments`.)

## Response snapshot

Ran `.specify/scripts/bash/check-prerequisites.sh --json`, confirming all four optional design docs present (research.md, data-model.md, contracts/, quickstart.md) alongside the required plan.md/spec.md. Read Spec 002's `tasks.md` in full to match its established style (RLS tests required, not optional — SC-004-driven; per-story Test/Implementation subsections; explicit migration-ordering dependency notes) before drafting, plus the existing `checklists/requirements.md` (all items already pass) and the tasks-template.md structure.

Generated `tasks.md` with 67 tasks (T001–T067, verified sequential with no gaps/duplicates):
- **Phase 1 Setup** (1 task): add `exceljs` dependency.
- **Phase 2 Foundational** (4 tasks): class/enrollment enums + drop Spec 002's now-superseded demo fixture, `ClassContext.tsx`, shared TS types, RLS fixture helpers.
- **Phase 3–8, one per user story** (US1–US6, spec.md priorities P1/P1/P1/P2/P2/P3): each with a "Tests" subsection (written first, must fail before implementation) directly citing the FR/clarification/SC it proves, then an "Implementation" subsection ordered migrations → `src/lib/*` → pages, with explicit inter-task and inter-story dependencies noted per task. US1=16 tasks (MVP), US2=15, US3=9, US4=4, US5=3, US6=9.
- **Phase 9 Polish** (6 tasks): bilingual/RTL passes, Art. V.5 bundle-budget check, full regression run, quickstart.md live validation, backlog logging for plan.md's Follow-ups.

Cross-checked migration numbering against plan.md's Project Structure section (0011–0023, 13 files) — task-level migration assignments match exactly, confirming no drift between the plan and the generated tasks. Every one of data-model.md's 10 required negative RLS assertions and all 5 same-day spec clarifications are each traceable to a specific test task.

## Outcome

- ✅ Impact: Complete, immediately-executable task breakdown for 003-classes-assignments — 67 tasks organized by independently-testable user story, each citing its governing FR/SC/clarification and exact file path, ready for implementation to begin at US1 (the MVP).
- 🧪 Tests: None run at this stage (task-generation only); the tasks themselves specify 20 new RLS test files and 6 new Playwright e2e spec files to be authored test-first during implementation, per Constitution Art. VII's engineering gate.
- 📁 Files: `specs/003-classes-assignments/tasks.md` (new).
- 🔁 Next prompts: `/sp.analyze` (optional cross-artifact consistency check) or begin implementation directly with `/sp.implement`, starting at Phase 1/2 then US1.
- 🧠 Reflection: Verifying the migration-number cross-reference against plan.md's already-written Project Structure section (rather than assigning fresh numbers ad hoc) caught what would otherwise have been a silent drift between two supposedly-consistent planning artifacts — worth doing as a standard check whenever `/sp.tasks` runs after a `/sp.plan` that already enumerated concrete file names.

## Evaluation notes (flywheel)

- Failure modes observed: None — task IDs verified sequential (T001–T067) with a grep-based check before reporting completion, rather than trusting manual numbering by eye.
- Graders run and results (PASS/FAIL): N/A (no automated grader configured for tasks-stage).
- Prompt variant (if applicable): Standard `/sp.tasks` workflow, unmodified.
- Next experiment (smallest change to try): N/A.
