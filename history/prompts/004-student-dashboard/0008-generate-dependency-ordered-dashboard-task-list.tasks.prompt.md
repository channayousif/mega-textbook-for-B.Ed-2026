---
id: 0008
title: Generate dependency-ordered dashboard task list
stage: tasks
date: 2026-07-20
surface: agent
model: claude-sonnet-5
feature: 004-student-dashboard
branch: 004-student-dashboard
user: channayousif@gmail.com
command: /sp.tasks
labels: ["tasks", "planning", "student-dashboard"]
links:
  spec: specs/004-student-dashboard/spec.md
  ticket: null
  adr: history/adr/0009-separate-docusaurus-docs-instance-for-usage-guides.md
  pr: null
files:
 - specs/004-student-dashboard/tasks.md
tests:
 - none (task-planning artifact only; no code/tests written this session)
---

## Prompt

/sp.tasks

(No additional user input text was provided.)

## Response snapshot

Ran `.specify/scripts/bash/check-prerequisites.sh --json` (`AVAILABLE_DOCS`: research.md,
data-model.md, contracts/, quickstart.md — plan.md/spec.md read directly). Read the
`tasks-template.md` structure and Spec 003's actual `tasks.md` to match this repo's established
granularity/format conventions (per-task file paths, `(depends on TXXX)` annotations, RLS tests
marked REQUIRED given an SC-005-style isolation mandate).

Re-read spec.md's 6 user stories carefully and found FR-003 (the full Assignments area) has no
dedicated user story of its own — data-model.md's read-only query table already groups it with
US1's due-soon query as the same shape, unfiltered by time window — so it's delivered inside US1's
phase rather than invented as a 7th story, and this is called out explicitly in the tasks.md
header to avoid confusion later.

Mapped every FR/entity/trigger/RPC from data-model.md and contracts/dashboard-operations.md to a
phase:

- **Setup (T001–T002)**: the second Docusaurus docs-plugin instance registration (ADR-0009) and
  shared TypeScript types — neither blocks any of the 6 stories, both needed before other work
  can build on them.
- **Foundational (T003–T008)**: the `unit_progress` table + its two `SECURITY DEFINER` sync
  triggers (migrations `0024`/`0025`) — placed here rather than inside US3's or US4's phase
  because both US3 (read) and US4 (write) and US6 (achievement triggers) depend on this same
  substrate; `StudentDashboardGuard`, the navbar link, and shared RLS fixtures — all consumed by
  every one of the 6 dashboard pages, none exclusive to one story.
- **US1–US2, US5 (P1/P1/P2)**: independent, disjoint-file phases, each extending
  `dashboardQueries.ts` with its own non-conflicting function and building its own page.
- **US3 (P2, read coverage)**: consumes Foundational's `unit_progress` read helpers; its own
  tests confirm the sync triggers actually populate coverage end-to-end (not just that the table
  exists).
- **US4 (P2, self-mark)**: explicitly sequenced after US3 since it extends US3's `progress.tsx`
  and `unitProgress.ts`, and adds the swizzled `theme/DocItem/Footer.tsx` entry point
  (research.md R5) as its own task.
- **US6 (P3, achievements, 12 tasks — the largest phase)**: owns its own migrations
  (`0026`/`0027`, `student_achievements` + the 3 pure triggers + the 1 client-assisted RPC per
  research.md R2), 5 separate RLS test files (one per achievement condition plus one for the
  no-client-write policy) matching contracts/dashboard-operations.md's 13-item checklist item by
  item, and extends both US1's `index.tsx` (achievement preview) and US3's `progress.tsx`
  (the `check_full_coverage_achievement` call site) — both labeled `[US6]` since the integration
  work belongs to delivering achievements, matching Spec 003's precedent of later-phase tasks
  extending earlier-phase files under the extending story's own label.
- **Polish (T042–T048)**: a consolidated cross-table isolation regression test (beyond each
  story's narrower assertions), the Student Guide's actual content authoring (Article X,
  ADR-0009) — split into "existing workflows" (navigate/join/submit/read-grades, can start
  anytime) versus "use the dashboard" (must wait until all 6 areas exist, explicit dependency on
  T012/T013/T017/T020/T029/T039), the Art. V.5 bundle-budget check, and a final full-suite/
  quickstart validation run.

Verified format compliance by grep: all 48 tasks match `- [ ] T\d{3}` exactly, T-numbers are
sequential with no gaps or duplicates (T001–T048), and every user-story-phase task carries its
`[US#]` label while Setup/Foundational/Polish tasks correctly omit one.

## Outcome

- ✅ Impact: 48 dependency-ordered, independently-testable tasks spanning 6 user stories plus
  Setup/Foundational/Polish, each task specific enough (exact file path, exact function/migration
  name, explicit `(depends on TXXX)`) to execute without re-deriving context from the design docs.
  US1 alone (Setup + Foundational + Phase 3, 13 tasks) is callable out as the MVP stopping point,
  matching spec.md's own "Home is the dashboard's reason to exist" framing.
- 🧪 Tests: None run this session (planning artifact only); 15 new test tasks are specified across
  the 6 stories plus 1 consolidated Polish-phase isolation test, collectively covering every
  numbered item in contracts/dashboard-operations.md's 13-item contract test checklist.
- 📁 Files: `specs/004-student-dashboard/tasks.md` (new, 48 tasks across 9 phases).
- 🔁 Next prompts: `/sp.implement` to begin executing tasks in order (or a specific user story's
  phase, e.g. US1 for the MVP slice).
- 🧠 Reflection: Explicitly checking whether FR-003 had its own user story before assigning it a
  phase (rather than assuming a 1:1 FR-to-story mapping) avoided inventing a 7th, spec-uncited
  story — the read-only-query-shapes table in data-model.md, written during `/sp.plan`, was what
  made the correct grouping obvious rather than requiring a fresh guess here.

## Evaluation notes (flywheel)

- Failure modes observed: None — the one place this could have gone wrong (treating each of the
  4 achievements as needing its own migration/phase, mirroring their non-uniform architecture from
  research.md R2) was avoided by keeping all 4 under one US6 phase with separate *test* files but
  shared *migration* files, since they're delivered as one cohesive feature slice (achievements),
  not 4 independently valuable increments.
- Graders run and results (PASS/FAIL): Self-applied format grader — PASS: all 48 tasks match the
  required checkbox/ID/[P]/[Story]/file-path format (verified via grep for `^\- \[ \] T\d{3}` and
  sequential numbering with no gaps).
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): When a design doc (here, data-model.md's read-only
  query shapes table) already answers an FR-to-story mapping question, cite it directly in the
  tasks.md header (as done here for FR-003) rather than leaving the reader to notice the mapping
  implicitly from task placement alone.
