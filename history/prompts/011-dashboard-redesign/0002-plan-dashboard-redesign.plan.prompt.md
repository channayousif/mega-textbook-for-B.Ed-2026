---
id: 0002
title: Plan Dashboard Redesign
stage: plan
date: 2026-09-09
surface: agent
model: claude-sonnet-5
feature: 011-dashboard-redesign
branch: 011-dashboard-redesign
user: channayousif@gmail.com
command: /sp.plan (011-dashboard-redesign)
labels: ["plan", "dashboard", "app-shell", "student-notes", "rls", "migrations", "teacher-tools"]
links:
  spec: specs/011-dashboard-redesign/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/011-dashboard-redesign/plan.md
tests:
 - "n/a (planning artifact); test surface named: tests/rls/* per new policy + tests/e2e/* per new flow"
---

## Prompt

Continue Workstream B: produce the implementation plan for Spec 011 (dashboard redesign), then
checkpoint before /sp.tasks and implementation.

## Response snapshot

Wrote `specs/011-dashboard-redesign/plan.md` in the project's plan house style.

Seven design decisions:
- **D1** the shell is a per-page component (`AppDashboardShell.tsx`, props `{role, children}`),
  not a route wrapper - Docusaurus `src/pages/**` has no nested-layout hook; each of ~13 pages
  swaps its `<XGuard><main …>` for `<AppDashboardShell role="…">` (2-line diff/page).
- **D2** nav model in code (`src/lib/dashboardNav.ts`, `studentNav`/`teacherNav`), not a table.
- **D3** `student_notes` = one table, nullable `course_code`/`unit_no`/`topic_no` pointers, RLS
  `for all` where `student_id = current_profile_id() and is_student()` (mirrors migration 0036),
  `body` <= 8000 chars, `updated_at` trigger.
- **D4** reuse the EXISTING `assignments_update` / `classes_update` policies (they already permit
  a full-column owner edit) - FR-012/FR-013 need only lib helpers + UI; only NEW policies are
  `assignments` DELETE (owner + no submissions) and `quiz_items`/`answer_keys` write
  (`is_verified_teacher(auth.uid())`).
- **D5** `assignment_templates` = a small owned server table (chosen over localStorage for
  cross-device parity with the notes decision).
- **D6** course dropdown = `fetchCatalog()` filtered to `course_code`s in `fetchContentIndex()`,
  `<optgroup>` per semester; free-text input removed from `classes/index.tsx`.
- **D7** `progress.tsx` regroups by `course_code` from `fetchOwnUnitProgress()` (drops the
  enrollment filter, FR-007) + unions `fetchOwnChecksForCourses` for topic-level completion.

Migrations start at **0038**: `0038_student_notes`, `0039_assignment_delete`,
`0040_quiz_authoring_rls`, `0041_assignment_templates`. ~6 new lib helpers, ~5 new pages, ~13
pages adopt the shell (mechanical), 2 substantive existing-page rewrites (progress regroup,
course dropdown). No new dependency; analytics stay CSS/SVG.

Constitution check: no violation (V.3/IX role model unchanged; V.5 no charting dep; VIII
notes-private + RLS test; IX.2 every capability gets a policy + test; X.2 guides updated in
branch). Three risks logged (shell adoption breadth; hand-rolled focus-trap; widened answer-store
write surface), each mitigated.

Checkpointing: spec + plan drafted; this is the largest of the four work streams (7 stories,
4 migrations, a new shell, ~18 touched pages). Awaiting the owner's steer on execution approach
(MVP-first vs full build vs artifacts-first) before `/sp.tasks` + implementation.

## Outcome

- ✅ Impact: the redesign has a concrete technical approach with the migration + RLS surface
  scoped down (two of four "new policy" items turned out to already exist).
- 🧪 Tests: none run (planning); RLS-per-policy + e2e-per-flow surface named.
- 📁 Files: `specs/011-dashboard-redesign/plan.md`.
- 🔁 Next prompts: `/sp.adr` (shared-shell pattern + verified-teacher write elevation) ->
  `/sp.tasks` -> implement MVP (US1 shell) first, checkpoint, then US2-US7.
- 🧠 Reflection: checking the existing `assignments`/`classes` RLS before planning cut the
  migration count from a feared 6 to 4.

## Evaluation notes (flywheel)

- Failure modes observed: over-scoping the migration set - avoided by reading the existing
  policies (D4).
- Graders run and results (PASS/FAIL): constitution-check table - no violation, PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): convert ONE page to `AppDashboardShell` and review
  before the other twelve.
