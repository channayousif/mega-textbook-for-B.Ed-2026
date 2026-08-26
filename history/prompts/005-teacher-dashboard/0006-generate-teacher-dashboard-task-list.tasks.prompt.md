---
id: 0006
title: Generate teacher dashboard task list
stage: tasks
date: 2026-07-24
surface: agent
model: claude-sonnet-5
feature: 005-teacher-dashboard
branch: 005-teacher-dashboard
user: channayousif@gmail.com
command: /sp.tasks
labels: ["tasks", "teacher-dashboard", "user-stories"]
links:
  spec: specs/005-teacher-dashboard/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/005-teacher-dashboard/tasks.md
tests:
 - none (tasks-generation stage; no code changes — tasks.md defines 25 future RLS/E2E test tasks)
---

## Prompt

/sp.tasks

(No additional free-text input provided; command run against the completed plan.md/research.md/
data-model.md/contracts/quickstart.md for 005-teacher-dashboard.)

## Response snapshot

Ran `.specify/scripts/bash/check-prerequisites.sh --json` to confirm FEATURE_DIR and
AVAILABLE_DOCS (research.md, data-model.md, contracts/, quickstart.md all present). Read the
tasks-template.md structure and Spec 004's tasks.md as the concrete style precedent (phase
structure, "Tests: REQUIRED" framing, dependency/parallel-example sections) before drafting.

Mapped spec.md's 7 user stories (P1/P1/P2/P2/P2/P3/P3) to phases 3–9, each independently
implementable and testable per the task-generation rules. Key structural decisions:
- Classes/Grading (named in FR-001 but not a dedicated user story) get **no** implementation
  tasks at all — plan.md's Structure Decision already established they're reused from Spec 003's
  `/app/classes/*`, so no task recreates them; only US1's Overview page links out to them.
- US3 (moderation) sequenced after US2 (suggestion filing) since US3's migrations depend on US2's
  `improvement_suggestions` schema existing.
- US5 (activity feedback) sequenced after US4 (teaching log) since US5 extends US4's
  `teaching-log.tsx` and shares `Footer.tsx` with US2.
- US7 (student drill-down) sequenced after US6 (analytics) since US7 extends US6's
  `teacherAnalytics.ts` base module, matching spec.md's own framing of US7 as "a natural extension
  of Analytics."
- Teacher Guide authoring (Constitution Art. X) placed last in Polish (T044–T047), written after
  the pages it documents exist, mirroring Spec 004's tasks.md precedent for the Student Guide.

Produced `tasks.md`: Phase 1 (Setup, 1 task) → Phase 2 (Foundational, 3 tasks: guard, nav link,
shared teacher-scale RLS fixture) → Phases 3–9 (7 user stories, each with RLS + E2E tests before
implementation) → Phase 10 (Polish: 8 tasks — consolidated isolation regression, RTL spec, Teacher
Guide content, bundle-budget check, full quickstart/test-suite run). 49 tasks total (T001–T049),
every migration file name matching plan.md/data-model.md/quickstart.md exactly (0028–0031).

Validated format compliance programmatically: `grep`-checked for duplicate task IDs (none), a
continuous T001→T049 sequence (no gaps), and that every task line matches the strict
`- [ ] T### [P?] [Story?] Description` pattern (all 49 passed a regex check for this).

## Outcome

- ✅ Impact: A complete, dependency-ordered, independently-testable task breakdown ready for
  `/sp.implement`, with the Classes/Grading reuse decision from plan.md correctly reflected as
  "zero new tasks" rather than accidentally regenerating rebuild tasks for already-shipped pages.
- 🧪 Tests: None run — this stage only *defines* tests. 25 of the 49 tasks are RLS/E2E test tasks
  (one pair per user story plus 2 consolidated Polish-phase tests), all marked to be written first
  and confirmed failing before their paired implementation tasks, per this repo's established
  TDD-within-story convention.
- 📁 Files: `specs/005-teacher-dashboard/tasks.md` (new).
- 🔁 Next prompts: `/sp.implement` to execute the task list, or `/sp.analyze` first if a
  cross-artifact consistency pass is wanted before implementation begins.
- 🧠 Reflection: The single highest-value check in this pass was re-confirming, task-by-task, that
  no task silently reintroduced a "rebuild Classes/Grading" item — since spec.md's FR-001 names
  those areas and a less careful reading of the requirements section alone (without plan.md's
  Structure Decision in hand) could have generated redundant tasks for already-shipped Spec 003
  pages.

## Evaluation notes (flywheel)

- Failure modes observed: None. One deliberate sequencing choice worth flagging for
  `/sp.implement`: US5 extends `Footer.tsx` (T029) after US2 also extends it (T014) — both stories
  touch the same file, so despite neither being individually blocked on the other's *migration*,
  their `Footer.tsx` edits should not be worked on concurrently by different developers (called out
  explicitly in the Parallel Opportunities section) to avoid a merge conflict on a shared swizzled
  component.
- Graders run and results (PASS/FAIL): Format validation via `grep` — PASS (no duplicate IDs, no
  sequence gaps, all 49 lines match the required checklist pattern).
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
