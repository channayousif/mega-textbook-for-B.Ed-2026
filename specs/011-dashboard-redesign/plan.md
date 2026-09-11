# Implementation Plan: Dashboard redesign

**Branch**: `011-dashboard-redesign` | **Date**: 2026-09-09 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/011-dashboard-redesign/spec.md`

## Summary

One shared **app shell** with a role-aware left-side menu wraps every `/app/dashboard/*` and
`/app/teacher/*` page (drawer + focus-trap on mobile). On top of it: the missing student
features (join-a-class in the dashboard, a `student_notes` table with RLS, a course-wise
Progress view that stops hiding self-marked-but-not-enrolled courses) and the teacher makeover
(catalog course dropdown instead of free text, reachable Analytics, assignment edit/delete,
class edit, a verified-teacher quiz-item / answer-key authoring page, a per-class command
centre, assignment templates, bulk actions). Analytics stay CSS/SVG - no charting dependency.

## Technical Context

**Language/Version**: TypeScript 5.6 on Node 22+, Docusaurus 3.10, React 18.3, `@supabase/supabase-js` ^2
- all existing. **No new runtime dependency** (drawer focus-trap is hand-rolled; visuals stay
CSS/SVG per Constitution Art. V.5 / Spec 005 precedent).
**Storage**: Supabase Postgres. New: `student_notes` (per-student private), `assignment_templates`
(per-teacher). Extended RLS: `assignments` DELETE, `quiz_items` + `answer_keys` INSERT/UPDATE/DELETE
for verified teachers. `assignments` UPDATE and `classes` UPDATE policies **already exist**
(owning teacher) - only new lib helpers + UI are needed there. Migrations start at **0038**.
**Testing**: `tests/rls/*` (one per new policy), `tests/e2e/*` (shell nav + drawer a11y, join-in-
dashboard, notes CRUD + cross-student isolation, course dropdown, assignment edit/delete, class
edit, quiz-authoring gate, bulk actions), Vitest for any new pure helpers.
**Target Platform**: same static site (`textbook.com.pk`) + self-hosted Supabase + GitHub Actions.
**Project Type**: single Docusaurus-rooted project; file-based routing under `src/pages/app/**`;
query-string params (`?classId=`, `?studentId=`) kept, no new dynamic routes.
**Constraints**: reuse the existing guards (`StudentDashboardGuard`, `TeacherDashboardGuard`,
`AuthGuard`) unchanged; keep the `MESSAGES`/`useLocale` i18n idiom; 44px targets
(`.auth-page .button` already enforces it); `aria-current` on the active item; RLS is the real
enforcement, the shell/guards are cosmetic (Art. IX.2); every new user-facing string bilingual.
**Scale/Scope**: 1 new shell component + 1 nav model + a CSS block; 4 migrations + 4 RLS test
files; ~6 new lib helpers; ~5 new pages; ~13 existing pages adopt the shell (mechanical); the
`dashboard/progress.tsx` regroup and the `classes/index.tsx` dropdown are the two substantive
existing-page rewrites.

## Constitution Check

| Article | Alignment |
|---|---|
| **V.3 / IX (Roles & access)** | No change to the role model. `verified_teacher` quiz-authoring reuses `public.is_verified_teacher` (Spec 002, migration 0010). |
| **V.5 (Bundle budget)** | No charting dep; analytics/progress stay CSS/SVG; the shell adds one small component + one CSS block. |
| **VIII (Data protection)** | `student_notes` is student-private, RLS-enforced + an RLS regression test (Art. VIII.1). Minimal fields; no new PII. |
| **IX.2 (Authz at the DB layer)** | Every new capability (notes, assignment delete, class edit, quiz authoring, templates) gets an RLS policy + test; UI gating is cosmetic. |
| **IX.3 (Verified-teacher elevation)** | Unchanged - authoring is gated on the existing `verified_teacher` flag, not a new elevation path. |
| **X.2 (Docs stay in sync)** | Student Guide + Teacher Guide updated in this branch (FR-020, SC-008). |
| **VII (Review gates)** | Engineering gate: new RLS tested, responsive/RTL verified, Lighthouse a11y pass on the shell. |

No violation. No Complexity Tracking entry.

## Key design decisions (ADR candidate)

### D1 - The shell is a per-page component, not a route wrapper

`src/components/AppDashboardShell.tsx` - props `{ role: 'student' | 'teacher', children }`.
It renders the existing guard, the sidebar (from the nav model), and a `<main className="container
auth-page …">` frame identical to today's. Each of the ~13 pages swaps its
`<XGuard><main …>{content}</main></XGuard>` for `<AppDashboardShell role="…">{content}</AppDashboardShell>`.
Rationale: Docusaurus `src/pages/**` has no nested-layout hook; a per-page component is the
in-convention change, keeps each page's `<Layout title>` and imports, and the diff is a
2-line swap per page. Rejected: a `src/theme/Root.tsx` branch on pathname (fragile, couples the
global root to `/app` internals) and a custom route plugin (new infra for one shell).

### D2 - Nav model in code, not data

`src/lib/dashboardNav.ts` exports `studentNav` and `teacherNav`: ordered
`{ key, label: {en,ur}, to, activeMatch: RegExp }`. The shell reads `useLocation()` for the
active item (`aria-current="page"`). No table, no config file - the menu is a fixed part of the
product.

### D3 - `student_notes`: one table, nullable content pointers

`student_notes(id uuid pk default gen_random_uuid(), student_id uuid not null references
profiles(id) on delete cascade, course_code text null, unit_no int null, topic_no int null,
title text null, body text not null check (char_length(body) <= 8000), created_at timestamptz
default now(), updated_at timestamptz default now())`. RLS: `for all` where
`student_id = public.current_profile_id() and public.is_student()` (mirrors migration 0036's
`self_assessment_checks` student-role guard). An `updated_at` trigger. `course_code`/`unit_no`/
`topic_no` are unvalidated pointers (same posture as `assignments.course_code`), so a renamed or
removed course does not break a note.

### D4 - Reuse the existing `assignments` / `classes` UPDATE policies; add only DELETE + quiz writes

- `assignments` already has `assignments_update` (owning teacher, any column) - FR-012 edit is a
  new `updateAssignment(id, patch)` lib helper + an edit route reusing the `assignment-new.tsx`
  form shape; no migration.
- `classes` already has `classes_update` - FR-013 is `updateClass(id, patch)` + a form in
  `roster.tsx`; no migration.
- **New**: `0039` adds an `assignments` DELETE grant + `assignments_delete` policy - owning
  teacher `and not exists (select 1 from public.submissions s where s.assignment_id = assignments.id)`
  so an assignment with submissions cannot be destroyed.
- **New**: `0040` adds `quiz_items` + `answer_keys` INSERT/UPDATE/DELETE policies +
  grants, `using`/`with check` = `public.is_verified_teacher(auth.uid())`. SELECT policies and
  the `quiz_items_public` view (correct-option hidden) are unchanged.

### D5 - `assignment_templates`: a small owned table (server-side)

`assignment_templates(id, teacher_id references profiles(id), name text, title_pattern text,
instructions text, max_mark int, allow_late bool, created_at)`. RLS `for all` where
`teacher_id = public.current_profile_id()`. Chosen over `localStorage` for cross-device parity
with the notes decision and so a template survives a browser change. Migration `0041`.

### D6 - Course dropdown source

`src/lib/courseOptions.ts` `fetchCourseOptions()` = `fetchCatalog()` (bilingual names,
semester-grouped) filtered to the distinct `course_code`s present in `fetchContentIndex()` -
the exact "has content" test `assignment-new.tsx` already applies to units. A `<select>` with
`<optgroup label="Semester N">`. `classes/index.tsx` loses its free-text `course_code` input.

### D7 - Progress regroup

`dashboard/progress.tsx` iterates `fetchOwnUnitProgress()` grouped by `course_code` (not
`fetchCurrentSemesterClasses`), unions in `fetchOwnChecksForCourses` for topic-level completion,
and derives totals from `content-index.json`. The `enrolledCourseCodes` filter is dropped
(FR-007). Coverage bars stay the existing CSS.

## Phase 0 - Research (`research.md`)

- **R1** - the ~13 pages to adopt the shell; confirm each is `<Layout><XGuard><main className="container
  auth-page …">` so the swap is uniform; note the two (`profile.tsx`, auth pages) that are *not*
  in scope.
- **R2** - `self_assessment_checks` migration 0036: copy its `is_student()` write-guard shape for
  `student_notes`.
- **R3** - `assignments` / `classes` existing UPDATE policies: confirm they already permit a
  full-column owner edit (they do) so FR-012/FR-013 need no migration.
- **R4** - `quiz_items` / `answer_keys` (0021/0022): the exact SELECT policies + the
  `quiz_items_public` view, so the new write policies sit beside them without touching reads.
- **R5** - the drawer focus-trap: a minimal hand-rolled trap (first/last focusable + keydown),
  no dependency; confirm the `chrome-devtools-mcp:a11y-debugging` skill covers the check.
- **R6** - `fetchContentIndex` / `fetchCatalog` shapes for `courseOptions.ts` (already
  client-loaded).

## Phase 1 - Design & Contracts

- **Migrations** `supabase/migrations/`:
  - `0038_student_notes.sql` - table + RLS (`for all`, `is_student()` guard) + `updated_at` trigger + grants.
  - `0039_assignment_delete.sql` - DELETE grant + `assignments_delete` policy (owner + no submissions).
  - `0040_quiz_authoring_rls.sql` - `quiz_items` + `answer_keys` INSERT/UPDATE/DELETE policies + grants, `is_verified_teacher(auth.uid())`.
  - `0041_assignment_templates.sql` - table + RLS (`for all`, owner) + grants.
  - `0042_assignment_delete_no_recursion.sql` - **post-deploy fix to 0039** (2026-09-11).
    0039's inline `not exists (select 1 from public.submissions ...)` re-entered
    `assignments` through `submissions_select` (0018); Postgres detects policy recursion per
    relation, so every delete failed with `42P17`. Both predicates moved into a
    `SECURITY DEFINER` `can_delete_assignment()` that bypasses RLS on the probe. Found only
    once the migrations were applied to the live database - the RLS suite cannot exercise a
    policy that does not exist yet.
- **Component** `src/components/AppDashboardShell.tsx` + `src/lib/dashboardNav.ts` +
  a `.dashboard-shell` block in `src/css/custom.css` (grid: sidebar + main; RTL-aware; drawer
  at `<= 768px`; 44px targets). Consider the `frontend-design` skill for the visual pass.
- **Libs** `src/lib/`: `studentNotes.ts`, `assignmentTemplates.ts`, `quizAuthoring.ts`,
  `courseOptions.ts`; `+updateAssignment` / `+deleteAssignment` in `assignments.ts`;
  `+updateClass` in `classes.ts`. All `Result`-typed like `unitProgress.ts`.
- **New pages** `src/pages/app/`: `dashboard/notes.tsx`, `dashboard/classes.tsx` (student
  join + list), `teacher/quiz-authoring.tsx` (verified-only), `teacher/class.tsx` (command
  centre), `classes/assignment-edit.tsx`.
- **Modified pages**: every `dashboard/*` + `teacher/*` adopts `AppDashboardShell`;
  `dashboard/progress.tsx` regroup (D7); `classes/index.tsx` course dropdown (D6);
  `classes/assignments.tsx` multi-select + edit/delete links; `classes/roster.tsx` edit-class
  form; `classes/queue.tsx` bulk return; `teacher/index.tsx` links to analytics/drilldown.
- **Content-page note affordance**: extend `src/theme/DocItem/Footer.tsx` with an
  "add a note" control for a signed-in student, keyed to `course_code`/`unit_no`/`topic_no`
  (same gating pattern as the existing controls).
- **Docs**: `guides/student-guide/*` (navigation, notes, join flow, progress) and
  `guides/teacher-guide/*` (navigation, course dropdown, assignment/class management, quiz
  authoring, command centre) updated (FR-020).

## Phase 2 - (handled by `/sp.tasks`, not here)

## Risks & follow-ups (max 3)

- **R-1** - adopting the shell across ~13 pages is broad; a subtle guard/`<Layout>` regression
  could slip. Mitigation: the swap is uniform (R1), one page converted and reviewed first, then
  the rest; e2e nav test covers every menu item.
- **R-2** - the drawer focus-trap is hand-rolled; a11y bugs are easy. Mitigation: the
  `a11y-debugging` skill + a Playwright keyboard test (open, Tab cycles within, `Escape` closes,
  focus returns to the toggle).
- **R-3** - opening `quiz_items`/`answer_keys` writes to verified teachers widens the attack
  surface on the answer store. Mitigation: `is_verified_teacher` is the same gate that protects
  reads today; RLS test asserts an unverified teacher and a student are refused every verb.

## Implementation notes (post-build reconciliation - Constitution Art. IV.4)

_(filled after implementation)_
