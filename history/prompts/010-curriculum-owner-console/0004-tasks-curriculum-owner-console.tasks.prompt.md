---
id: 0004
title: Tasks curriculum owner console
stage: tasks
date: 2026-09-05
surface: agent
model: claude-sonnet-5
feature: 010-curriculum-owner-console
branch: 010-curriculum-owner-console
user: channayousif
command: /sp.tasks
labels: ["tasks", "self-assessment", "content-feedback", "admin-console", "rls", "content-status-report"]
links:
  spec: specs/010-curriculum-owner-console/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/010-curriculum-owner-console/tasks.md
tests:
  - none (task-generation stage; tasks.md itself specifies the required RLS/unit/e2e tests as tasks)
---

## Prompt

/sp.tasks

(User input for this invocation was empty - the command ran with no additional argument, against
the already-completed Phase 0-1 design set for this feature: `plan.md`, `spec.md`, `research.md`,
`data-model.md`, `contracts/console-operations.md`, `contracts/self-assessment-hydration.md`, and
`quickstart.md`.)

## Response snapshot

Ran `.specify/scripts/bash/check-prerequisites.sh --json` (confirmed `research.md`,
`data-model.md`, `contracts/`, `quickstart.md` all present), then generated
`specs/010-curriculum-owner-console/tasks.md`: 46 tasks (T001-T046) across 9 phases, organized by
spec.md's 6 user stories in priority order (P1, P1, P2, P2, P3, P3):

- **Phase 1 (Setup)** - shared domain types.
- **Phase 2 (Foundational)** - the two new tables' four migrations (`self_assessment_checks`;
  `content_feedback` + its author-role-stamp and status-transition-guard triggers) and the two
  script-module extractions (`scripts/lib/mdx-sections.mjs`, `scripts/lib/unit-depth.mjs` out of
  `check-unit-depth.mjs`; `scripts/lib/figure-manifest.mjs` out of `check-figures.mjs`) that Story
  1's roll-up count and Story 4's report both need - confirmed via `tests/unit/figures-gate.test.mjs`
  spawning the gate as a subprocess that no test-file edit is needed for the extraction to stay
  behavior-preserving.
- **Phase 3 (US1, P1, MVP)** - `selfAssessment.ts`, the `content-index.json` `self_assessment_count`
  addition, the `DocItem/Content.tsx` hydration swizzle, and the Progress-area roll-up panel, plus
  3 tests (2 RLS, 1 e2e covering tick/reload/second-device/sign-out/merge-once).
- **Phase 4 (US2, P1)** - `docPosition.ts` extraction, `contentFeedback.ts`, the reader
  `FeedbackControl` on `DocItem/Footer.tsx`, and `admin/feedback-queue.tsx`, plus 4 tests (2 RLS
  covering isolation and the status-transition graph, 2 e2e covering submission and triage).
- **Phase 5 (US3, P2)** - `OwnerConsoleGuard.tsx` and the `admin/overview.tsx` shell (panels wired
  to US1/US2's helpers), plus 1 e2e test (also covering non-owner denial and RTL).
- **Phase 6 (US4, P2)** - `report-content-status.mjs` (importing the two Foundational shared
  modules, never re-deriving), the `prestart`/`prebuild`/CI wiring, and overview-panel wiring, plus
  1 fixture-driven unit test.
- **Phase 7 (US5, P3)** - `exportUnitFeedback()`, the queue's export control, and the new
  `.claude/skills/revise-topic/` skill (2 references), plus 1 test for the empty/idempotent export
  case.
- **Phase 8 (US6, P3)** - inline triage, the refresh control, and the catalog-edit download form
  on `admin/overview.tsx`, plus 1 e2e test extending Phase 5's RTL spec.
- **Phase 9 (Polish)** - a consolidated cross-table RLS regression test, Student/Teacher Guide +
  README edits (Docs gate), the bundle-budget check, full `quickstart.md` verification, the
  grouped `/sp.adr`, and drift reconciliation.

Every dependency call in the plan/research/data-model docs (script-extraction-before-report,
migrations-before-lib-helpers, US3/US5/US6 depending on US1/US2/US4's outputs) is reflected in
task ordering and the Dependencies section. Validated every one of the 46 checklist lines against
the required `- [ ] T### [P]? [USn]? Description` format programmatically (all 46 pass) and
confirmed zero em-dash characters across the file.

## Outcome

- Impact: every requirement in spec.md (FR-001-033) and every checklist item in
  `contracts/console-operations.md` now has a concrete implementation and/or test task; the MVP
  scope (US1+US2) is explicit and independently deployable.
- Tests: n/a for this stage itself - the generated `tasks.md` specifies 3 RLS tests, 8 e2e/unit
  tests, and 1 consolidated regression test as tasks (required, not optional, per Constitution
  Art. VII and spec.md SC-002/SC-007/SC-009).
- Files: `specs/010-curriculum-owner-console/tasks.md` (new, 46 tasks).
- Next prompts: begin implementation at Phase 1 (`/sp.implement` or manual work starting at T001),
  or `/sp.adr` now for the grouped decision cluster if the owner wants it recorded before code
  lands.
- Reflection: the trickiest sequencing call was Story 4 (the content/figure status report) - it
  has zero dependency on Stories 1-3's new tables, only on Foundational's script extractions, so it
  could run fully in parallel with them; it is placed after US3 in the phase list only because its
  output feeds US3's overview panel (T030), and the Dependencies section says so explicitly rather
  than leaving that judgment implicit.

## Evaluation notes (flywheel)

- Failure modes observed: none at task-generation stage.
- Graders run and results (PASS/FAIL): checklist-format validation PASS (46/46 lines match
  `- [ ] T### [P]? [USn]? Description`); zero-em-dash scan PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
