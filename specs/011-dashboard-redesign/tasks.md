---
description: "Task list for 011-dashboard-redesign"
---

# Tasks: Dashboard redesign

**Input**: `/specs/011-dashboard-redesign/` (spec.md, plan.md)
**Tests**: REQUESTED - FR-019 requires an RLS test per new policy and an e2e test per new flow.

## Format: `[ID] [P?] [Story] Description`

---

## Phase 1: Setup

- [x] T001 Confirm branch `011-dashboard-redesign`; `npm test` + `npx tsc --noEmit` green at baseline.

## Phase 2: Foundational (blocking)

### Migrations (start at 0038)

- [x] T002 `supabase/migrations/0038_student_notes.sql` - table `student_notes` (id, student_id ->
  profiles on delete cascade, course_code text null, unit_no int null, topic_no int null, title
  text null, body text not null check <= 8000, created_at, updated_at); RLS `enable`; policy
  `student_notes_all` `for all to authenticated using/with check (student_id =
  public.current_profile_id() and public.is_student())`; `updated_at` trigger; grants.
- [x] T003 `supabase/migrations/0039_assignment_delete.sql` - `grant delete on public.assignments
  to authenticated`; policy `assignments_delete` `for delete using (owning teacher AND not exists
  (select 1 from public.submissions s where s.assignment_id = assignments.id))`.
- [x] T004 `supabase/migrations/0040_quiz_authoring_rls.sql` - `quiz_items` + `answer_keys`
  INSERT/UPDATE/DELETE policies + grants, `using`/`with check =
  public.is_verified_teacher(auth.uid())`; SELECT policies + `quiz_items_public` view untouched.
- [x] T005 `supabase/migrations/0041_assignment_templates.sql` - table `assignment_templates`
  (id, teacher_id -> profiles, name, title_pattern, instructions, max_mark, allow_late,
  created_at); RLS `for all` where `teacher_id = public.current_profile_id()`; grants.
- [x] T006 Deploy 0038-0041 to the self-hosted Supabase (or note as a deploy step for CI/owner).

### Shell + nav

- [x] T007 `src/lib/dashboardNav.ts` - `studentNav` / `teacherNav`: `{ key, label: {en,ur}, to,
  activeMatch: RegExp }` (student: Home, Progress, Assignments, Grades, Achievements, Notes,
  My classes, History; teacher: Overview, Classes, Assignments, Grading, Analytics, Quiz
  authoring, Teaching log, Feedback).
- [x] T008 `src/components/AppDashboardShell.tsx` - props `{ role: 'student'|'teacher', children }`;
  renders the matching guard + sidebar (from T007, `aria-current` on active via `useLocation`) +
  `<main className="container auth-page margin-vert--lg">`. Mobile (`<= 768px`): a toggle button
  opens a drawer; hand-rolled focus trap (first/last focusable + keydown), closes on `Escape`,
  backdrop, item select, and route change; focus returns to the toggle.
- [x] T009 `.dashboard-shell` block in `src/css/custom.css` - grid (sidebar + main), RTL-aware,
  drawer at `<= 768px`, 44px targets, active-item style. No new stylesheet.

**Checkpoint**: shell renders; migrations deployed.

---

## Phase 3: US1 - Shared app shell (P1, MVP)

- [x] T010 [US1] Adopt `AppDashboardShell` in `src/pages/app/dashboard/{index,progress,grades,
  assignments,history,achievements}.tsx` - swap `<XGuard><main …>` for `<AppDashboardShell
  role="student">`; keep each page's `<Layout title>` + content.
- [x] T011 [US1] Adopt it in `src/pages/app/teacher/{index,analytics,student,teaching-log,
  feedback-suggestions}.tsx` with `role="teacher"`.
- [ ] T012 [P] [US1] `tests/e2e/dashboard-shell.spec.ts` - student reaches every menu item by
  click with the active one marked; teacher likewise; 360px drawer opens/closes by keyboard,
  traps focus, returns focus to the toggle.
- [ ] T013 [US1] a11y pass on the shell (chrome-devtools-mcp a11y skill): semantic `<nav>`,
  `aria-current`, focus order, 44px targets, contrast.

**Checkpoint**: every dashboard/teacher page has the shell; nav + drawer tested.

---

## Phase 4: US2 - Join-in-dashboard + course-wise Progress (P2)

- [x] T014 [US2] `src/pages/app/dashboard/classes.tsx` - student join-by-code (reuse
  `joinClassByCode` + `classifyJoinError` from `src/lib/classes.ts`) + current-class list, in
  the shell; add the menu item (T007 already lists it).
- [x] T015 [US2] Rewrite `src/pages/app/dashboard/progress.tsx` - group by `course_code` from
  `fetchOwnUnitProgress()` (drop the `enrolledCourseCodes` filter, FR-007); union
  `fetchOwnChecksForCourses` for topic-level completion; totals from `content-index.json`;
  keep the CSS coverage bars.
- [x] T016 [P] [US2] `tests/e2e/dashboard-join-and-progress.spec.ts` - join a class from the
  dashboard menu; mark a unit studied on a non-enrolled course; Progress shows both courses
  grouped, non-enrolled not hidden.

---

## Phase 5: US3 - Personal notes (P2)

- [x] T017 [US3] `src/lib/studentNotes.ts` - `listOwnNotes`, `createNote`, `updateNote`,
  `deleteNote` (Result-typed).
- [x] T018 [US3] `src/pages/app/dashboard/notes.tsx` - list (newest first, course filter from
  `fetchContentIndex()`), create/edit/delete, in the shell.
- [x] T019 [US3] `src/theme/DocItem/Footer.tsx` - "add a note about this page" control for a
  signed-in student, keyed to `course_code`/`unit_no`/`topic_no` (same gating pattern as the
  existing controls); signed-out reader gets a sign-in hint, no note created.
- [x] T020 [P] [US3] `tests/rls/student-notes.test.mjs` - a student reaches only their own
  notes; a second student cannot read/update/delete the first's; a teacher/admin cannot; an
  over-length body is rejected.
- [x] T021 [P] [US3] `tests/e2e/student-notes.spec.ts` - create from the Notes page + from two
  content pages, edit one, delete one, filter by course; second student sees none.

---

## Phase 6: US4 - Teacher shell + course dropdown + reachable analytics (P2)

- [x] T022 [US4] `src/lib/courseOptions.ts` - `fetchCourseOptions()` = `fetchCatalog()` filtered
  to distinct `course_code`s in `fetchContentIndex()`, semester-grouped, bilingual names.
- [x] T023 [US4] `src/pages/app/classes/index.tsx` (`TeacherClassesView`) - replace the free-text
  `course_code` `<input>` with a `<select>` + `<optgroup label="Semester N">` from T022; a
  course with no content is absent/disabled.
- [x] T024 [US4] `src/pages/app/teacher/index.tsx` - each class row links to
  `/app/teacher/analytics?classId=` and its roster; recent-activity rows link to
  `/app/teacher/student?classId=&studentId=`. (Menu links added in T007.)
- [x] T025 [P] [US4] `tests/e2e/teacher-course-dropdown-and-nav.spec.ts` - create a class picking
  a course from the dropdown (no text box); reach Analytics + a student drill-down by link only.

---

## Phase 7: US5 - Assignment + class management (P3)

- [ ] T026 [US5] `src/lib/assignments.ts` - `updateAssignment(id, patch)`, `deleteAssignment(id)`
  (Result-typed); `src/lib/classes.ts` - `updateClass(id, patch)`.
- [ ] T027 [US5] `src/pages/app/classes/assignment-edit.tsx` - edit route reusing the
  `assignment-new.tsx` form shape (title/instructions/due/max-mark/allow-late); a delete button
  disabled when the assignment has submissions.
- [ ] T028 [US5] `src/pages/app/classes/assignments.tsx` - "Edit" + "Delete" per row (link to
  T027); `src/pages/app/classes/roster.tsx` - an edit-class form (name/term/course via T022).
- [ ] T029 [P] [US5] `tests/rls/assignment-delete.test.mjs` - owning teacher deletes an empty
  assignment; deletion refused when submissions exist; non-owner refused. `tests/rls/class-edit`
  covered by the existing `classes_update` (add a case if none).
- [ ] T030 [P] [US5] `tests/e2e/teacher-manage-assignments-classes.spec.ts` - edit an
  assignment's due/max-mark (student sees the change); delete an empty one; edit a class name.

---

## Phase 8: US6 - Verified-teacher quiz authoring (P3)

- [ ] T031 [US6] `src/lib/quizAuthoring.ts` - CRUD for `quiz_items` (stem, options, correct
  option, Bloom tag) and `answer_keys` for a course + unit (Result-typed).
- [ ] T032 [US6] `src/pages/app/teacher/quiz-authoring.tsx` - gated on `verifiedTeacher` from
  `useAuth()`; course + unit pickers (T022 + content-index units); item-bank editor + answer-key
  editor; in the shell.
- [ ] T033 [P] [US6] `tests/rls/quiz-authoring.test.mjs` - a verified teacher can
  insert/update/delete `quiz_items` + `answer_keys`; an unverified teacher and a student are
  refused every verb; `quiz_items_public` still hides `correct_option`.
- [ ] T034 [P] [US6] `tests/e2e/quiz-authoring.spec.ts` - verified teacher adds/edits/deletes an
  item + key, then it is assignable; unverified teacher + student see the gated notice.
- [ ] T035 [US6] Update `specs/backlog.md` - strike the Spec 003 "Quiz item / answer-key
  authoring UI" item as delivered by Spec 011.

---

## Phase 9: US7 - Command centre, templates, bulk actions (P3)

- [ ] T036 [US7] `src/pages/app/teacher/class.tsx` - per-class command centre: roster count +
  ungraded count + due dates + at-risk (reuse `teacherOverview.ts` / `teacherAnalytics.ts`),
  each linking to detail; in the shell.
- [ ] T037 [US7] `src/lib/assignmentTemplates.ts` - CRUD; `assignment-new.tsx` gains a "from
  template" picker and a "save as template" action.
- [ ] T038 [US7] `src/pages/app/classes/assignments.tsx` - multi-select + bulk publish /
  unpublish / close (per-item outcome, no rollback of successes); `src/pages/app/classes/queue.tsx`
  - multi-select "return selected" for already-marked submissions.
- [ ] T039 [P] [US7] `tests/rls/assignment-templates.test.mjs` - a teacher reaches only their own
  templates. `tests/e2e/teacher-command-centre-bulk.spec.ts` - command centre panels; save +
  reuse a template; bulk unpublish 3; bulk return 2.

---

## Phase 10: Docs + cross-cutting

- [ ] T040 [P] `guides/student-guide/*` - navigation (the left menu), Notes, join-a-class flow,
  course-wise Progress (FR-020, both locales).
- [ ] T041 [P] `guides/teacher-guide/*` - navigation, the course dropdown, assignment + class
  management, quiz authoring, the command centre, templates, bulk actions.
- [ ] T042 `CLAUDE.md` Active Technologies / Recent Changes for Spec 011 (new tables, no new dep).
- [ ] T043 Full gate run: `npx tsc --noEmit`, `npm test`, `npm run test:e2e`, `npm run build`
  (both locales); a11y check on the shell + the new pages. Paste results into `plan.md`.
- [ ] T044 PHR (stage `green`) under `history/prompts/011-dashboard-redesign/`.

---

## Dependencies

- Phase 1 -> Phase 2 (migrations + shell) blocks everything.
- **US1** depends on Phase 2. MVP.
- **US2 / US3** depend on US1 (they add shell pages + a menu item). US3 also needs 0038.
- **US4** depends on US1 + T022. **US5** depends on US4 (course dropdown reused in class edit) +
  0039. **US6** depends on 0040 + T022. **US7** depends on US4/US5 + 0041.
- Phase 10 after US1-US7.

## Parallel opportunities

- The e2e/RLS test tasks (`[P]`) within each phase.
- T010 / T011 (shell adoption) are independent page sets.
- T040 / T041 (guides) are independent.

## Implementation strategy

Full build to one merge-ready PR (owner decision 2026-09-09). Order:
Phase 1-2 -> US1 -> US2 -> US3 -> US4 -> US5 -> US6 -> US7 -> Phase 10. Convert one page to the
shell (T010, first page) and eyeball it before the rest. Do not merge until T043 is green.
