---
description: "Task list for 005-teacher-dashboard implementation"
---

# Tasks: Teacher Dashboard, Feedback & Book Improvement Loop

**Input**: Design documents from `/specs/005-teacher-dashboard/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/teacher-dashboard-operations.md, quickstart.md

**Tests**: **REQUIRED** for this feature (not optional). Spec SC-004 mandates isolation checks
"verified by dedicated isolation checks," SC-007 requires 100%-of-attempts access denial, and
Constitution Art. VII's engineering gate requires "RLS policies tested." The negative assertions
in data-model.md's access-control matrix and contracts/teacher-dashboard-operations.md's 16-item
checklist are the deliverable, not an afterthought — same posture Spec 004's tasks.md took.

**Organization**: Tasks are grouped by user story (US1–US7, spec.md priorities
P1/P1/P2/P2/P2/P3/P3), each independently implementable and testable. FR-001 (route/areas
structure), FR-012 (bilingual/RTL), FR-013 (role-gating denial), and FR-014 (empty states) are
cross-cutting requirements with no dedicated story — each page task below builds them in directly
(bilingual `MESSAGES` dict, an explicit empty state, guard-wrapped route), matching Spec 004's
convention. **Classes and Grading (also named in FR-001) are not rebuilt** — they already exist as
Spec 003's `/app/classes/*` pages (plan.md's Structure Decision); no task here recreates them, only
the Overview page (US1) links out to them.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1–US7)
- Exact file paths included in every task

## Path Conventions

Single Docusaurus app at repository root (no `site/` subdirectory), extending Specs 002–004's
layout per plan.md's Structure Decision. New code lands in `src/lib`, `src/components`,
`src/theme/DocItem`, `src/pages/app/teacher/`, `src/pages/app/admin/`, `guides/teacher-guide/`,
`supabase/migrations/`, `tests/rls/`, `tests/e2e/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Shared types every story's implementation references. No Docusaurus plugin
registration is needed this time — the `guides` docs-plugin instance already exists (Spec 004,
ADR-0009); Teacher Guide content is authored in Polish (Phase 10) once the pages it documents
exist.

- [X] T001 Add teacher-dashboard-domain TypeScript types (`TeachingLogEntry`,
      `ActivityFeedback`, `SuggestionCategory`, `SuggestionStatus`, `ImprovementSuggestion`) in
      `src/lib/types.ts`, mirroring data-model.md's three new tables' columns.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The access gate, nav entry, and shared teacher-scale test fixture every dashboard
page and its tests need.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T002 [P] Implement `src/components/TeacherDashboardGuard.tsx`: extends `AuthGuard`'s
      cosmetic-gate pattern (mirroring `StudentDashboardGuard.tsx`) with FR-013's specific
      messaging — a signed-in student/non-teacher reaching `/app/teacher/*` sees a notice that
      this view is for teachers with a pointer back to their own dashboard, not the generic
      "no access" text.
- [X] T003 [P] Register a new `custom-teacherDashboardLink` navbar item type (extend
      `src/theme/NavbarItem/ComponentTypes.tsx`, alongside the existing `custom-authWidget`/
      `custom-dashboardLink` entries) backed by a new `src/components/TeacherDashboardNavLink.tsx`
      — renders a "Teacher Dashboard" link to `/app/teacher/` only when signed in with
      `role === 'teacher'`; renders nothing otherwise. Add the item to `docusaurus.config.ts`'s
      `navbar.items`.
- [X] T004 [P] Extend the RLS test harness with `tests/rls/_teacherFixtures.mjs`: seed helpers
      building on Spec 003's `tests/rls/_classFixtures.mjs` for a teacher with 2+ active classes,
      a mix of graded/ungraded submissions, quiz attempts, and assignments due at varying times —
      reused by US1 (Overview), US6 (Analytics), and US7 (student drill-down) below.

**Checkpoint**: Access gate, nav entry, and shared fixtures ready — user story implementation can
begin.

---

## Phase 3: User Story 1 - See my teaching day at a glance (Priority: P1) 🎯 MVP

**Goal**: The Overview area shows, across all of a teacher's classes, a per-class ungraded
submission count, the 5 soonest-due assignments, a 10-item recent-activity feed, and an explicit
"caught up" empty state when nothing is pending.

**Independent Test**: Give a teacher two classes with a mix of graded/ungraded submissions and
assignments due at different times; open the dashboard and confirm both classes show an accurate,
separate ungraded count, due dates are visible and correctly ordered, and recent activity appears.

### Tests for User Story 1 ⚠️

> Write these FIRST and confirm they FAIL before implementing.

- [X] T005 [P] [US1] RLS/read-shape test in `tests/rls/teacher-overview-isolation.test.mjs`: a
      teacher's ungraded-count/soonest-due/recent-activity queries never return another teacher's
      classes or submissions, even when the fixture contains other teachers' classes (FR-002,
      SC-004; contract checklist item 13).
- [X] T006 [P] [US1] E2E test in `tests/e2e/teacher-overview.spec.ts`: two classes each show their
      own ungraded count (not combined); the soonest-due list is ordered correctly across both
      classes; the recent-activity feed merges submissions and quiz attempts; a teacher with
      nothing pending sees an explicit "caught up" state, not a blank region (US1 AS1–AS3).

### Implementation for User Story 1

- [X] T007 [US1] Implement `src/lib/teacherOverview.ts`: `fetchUngradedCountsByClass()`
      (`submissions` joined to `assignments`, scoped to the teacher's own classes, minus rows with
      a matching `grades` row, grouped by `class_id` — quiz assignments naturally excluded since
      they never populate `submissions`), `fetchSoonestDueAssignments(limit=5)` (`assignments`
      where `class_id` in the teacher's own active classes and `due_at >= now()`, ordered
      `due_at` asc across all classes combined), `fetchRecentActivity(limit=10)` (`submissions`
      + `quiz_attempts`, each ordered by their own timestamp desc, merged client-side, top 10
      kept) (data-model.md's Read-only query shapes).
- [X] T008 [US1] Build `src/pages/app/teacher/index.tsx`: Overview page wrapped in
      `TeacherDashboardGuard` (T002) — per-class ungraded counts, the 5-soonest-due list, the
      10-item recent-activity feed, an explicit "caught up" empty state (FR-014), bilingual
      `MESSAGES` dict per this repo's convention (FR-012), with links out to the existing
      `/app/classes/*` pages for Classes/Grading management (depends on T007, T002, T003).

**Checkpoint**: US1 fully functional and independently testable — this alone delivers the
dashboard's day-to-day reason to exist.

---

## Phase 4: User Story 2 - Suggest an improvement to any part of the book (Priority: P1)

**Goal**: A teacher-only "Suggest improvement" control on every book content page captures the
page's slug, nearest section heading, and current locale automatically, alongside a chosen
category and body; a teacher can later find and track every suggestion they've filed in
"My Suggestions."

**Independent Test**: As a teacher, open any unit page, file a suggestion in one category, then
open "My Suggestions" and confirm it appears with the correct page slug, section anchor, locale,
category, and a status of "submitted."

### Tests for User Story 2 ⚠️

- [X] T009 [P] [US2] RLS test in `tests/rls/suggestion-filing-isolation.test.mjs`: a teacher can
      insert their own `improvement_suggestions` row (status defaults to `submitted`); an insert
      with an explicit non-`submitted` status is rejected; a teacher cannot `SELECT` another
      teacher's individual suggestion row (FR-003, FR-004, contract checklist item 7;
      data-model.md access-control matrix item 3).
- [X] T010 [P] [US2] E2E test in `tests/e2e/teacher-suggest-improvement.spec.ts`: from any unit
      page, using "Suggest improvement" files a suggestion with the exact page slug, nearest
      section heading, and current locale captured automatically — nothing the teacher types
      beyond category and body; "My Suggestions" then shows it with category, body, and status
      "submitted" (US2 AS1–AS2). Repeats the same check from a course-overview page (no `unit_no`
      in front matter) and confirms the filed suggestion has `unit_no = null`, not a rejected
      submission (2026-07-24 remediation, research.md R1).

### Implementation for User Story 2

- [X] T011 [US2] Create migration `supabase/migrations/0030_improvement_suggestions.sql`:
      `suggestion_category`/`suggestion_status` enums, `improvement_suggestions` table per
      data-model.md — RLS `SELECT` (filing teacher own rows, admin all rows); `INSERT`
      `WITH CHECK (teacher_id = current_profile_id() AND status = 'submitted')`; `UPDATE`
      `USING/WITH CHECK (is_admin())`; no `DELETE` policy.
- [X] T012 [US2] Create migration
      `supabase/migrations/0031_improvement_suggestions_transitions.sql`:
      `enforce_suggestion_status_transition()` `BEFORE UPDATE` trigger — restricts a permitted
      admin `UPDATE` to `status`/`admin_note` only and allows exclusively
      `submitted→under_review`, `under_review→accepted`, `under_review→rejected`,
      `accepted→published` (research.md R5) (depends on T011).
- [X] T013 [P] [US2] Implement `src/lib/suggestions.ts` (base): `fileSuggestion()`,
      `fetchOwnSuggestions()` (depends on T011, T001).
- [X] T014 [US2] Extend `src/theme/DocItem/Footer.tsx` (alongside the existing student-only
      "Mark as studied" branch) with a teacher-only "Suggest improvement" control: reads the
      page's slug (`useLocation().pathname`), current locale (`useDocusaurusContext().i18n.
      currentLocale`), the nearest section heading (`useDoc().toc` walked against
      `getBoundingClientRect()` at click time, research.md R1), and `frontMatter.course_code`
      (required — activates on any page carrying it, including `course-overview.mdx`) plus
      `frontMatter.unit_no` (included when present, `null` otherwise — 2026-07-24 remediation,
      `/sp.analyze` finding U1); renders an inline category + body form; calls `fileSuggestion()`
      (T013) (depends on T013).
- [X] T015 [US2] Build `src/pages/app/teacher/feedback-suggestions.tsx`: "My Suggestions" list —
      category, body, current status, and any admin note, empty state when nothing filed yet
      (FR-014), bilingual `MESSAGES` (FR-012), wrapped in `TeacherDashboardGuard` (depends on
      T013, T002).

**Checkpoint**: US1 and US2 both independently functional — the dashboard's two P1 stories done.

---

## Phase 5: User Story 3 - Moderate incoming suggestions (Priority: P2)

**Goal**: An admin moderation queue lists every suggestion from every teacher, filterable by
status/category/course, with the ability to transition a suggestion's status and attach a note.

**Independent Test**: Seed three suggestions in different categories and courses. As an admin,
filter the queue by each dimension in turn, transition one suggestion to "accepted" with a note,
and confirm the filing teacher sees the new status and note on their own tracker.

### Tests for User Story 3 ⚠️

- [X] T016 [P] [US3] RLS test in `tests/rls/suggestion-moderation-transitions.test.mjs`: an admin
      can filter by any combination of status/category/course; every legal transition
      (`submitted→under_review→accepted→published`, `under_review→rejected`) succeeds and bumps
      `updated_at`; every illegal transition (skip, backward, or touching a terminal
      `rejected`/`published` row) is rejected; an admin's attempt to change any column other than
      `status`/`admin_note` is rejected; a non-admin teacher cannot update any suggestion row,
      including their own (contract checklist items 8, 10, 11).
- [X] T017 [P] [US3] E2E test in `tests/e2e/suggestion-moderation.spec.ts`: as an admin, filter
      the queue by status, category, and course in turn; transition one suggestion through
      `submitted → under_review → accepted → published` with a note at each step; confirm the
      filing teacher's "My Suggestions" reflects each change without a refresh action; confirm a
      signed-in teacher (not admin) is denied access to the moderation route (US3 AS1–AS3).

### Implementation for User Story 3

- [X] T018 [US3] Extend `src/lib/suggestions.ts` (T013) with `fetchModerationQueue(filters)` and
      `transitionSuggestion(id, status, note)` (depends on T013).
- [X] T019 [US3] Build `src/pages/app/admin/suggestions.tsx`: filterable moderation queue
      (status/category/course), transition-with-note controls presenting only the currently
      legal next status per row, admin-only via the existing `AuthGuard requireRole={['admin']}`
      pattern (mirroring `admin/audit.tsx`/`admin/users.tsx`) (depends on T018).

**Checkpoint**: US1–US3 all independently functional — the suggestion loop is now end-to-end.

---

## Phase 6: User Story 4 - Keep a teaching diary (Priority: P2)

**Goal**: A teacher logs a teaching activity (unit/activity, class, date, duration, reflection)
in one fast flow and can view their own log ordered most-recent-first.

**Independent Test**: As a teacher, log one teaching activity end-to-end in under 30 seconds by a
stopwatch, then confirm it appears in "My Teaching Log" with all fields intact.

### Tests for User Story 4 ⚠️

- [X] T020 [P] [US4] RLS test in `tests/rls/teaching-log-isolation.test.mjs`: a teacher can insert
      a `teaching_log_entries` row only for a `class_id` they own; the same insert for a class
      owned by another teacher is rejected; a teacher cannot `SELECT` another teacher's log
      entries; no `UPDATE`/`DELETE` path exists on this table for any actor (FR-006, contract
      checklist items 1–3).
- [X] T021 [P] [US4] E2E test in `tests/e2e/teacher-teaching-log.spec.ts`: logs one activity in a
      single flow, timed under 30 seconds; confirms several entries appear most-recent-first,
      each attributed to the correct class, with all fields intact (US4 AS1–AS3, SC-005).

### Implementation for User Story 4

- [X] T022 [US4] Create migration `supabase/migrations/0028_teaching_log_entries.sql`:
      `teaching_log_entries` table per data-model.md — RLS `SELECT` (owning teacher, admin);
      `INSERT` `WITH CHECK (teacher_id = current_profile_id() AND EXISTS (SELECT 1 FROM classes c
      WHERE c.id = class_id AND c.teacher_id = current_profile_id()))`; no `UPDATE`/`DELETE`
      policy.
- [X] T023 [US4] Implement `src/lib/teachingLog.ts`: `logActivity()`, `fetchOwnLog()`
      (most-recent-first) (depends on T022, T001).
- [X] T024 [US4] Build `src/pages/app/teacher/teaching-log.tsx`: single fast entry form
      (unit/activity picker sourced from `static/content-index.json`, class picker limited to the
      teacher's own classes, date, duration, reflection) plus the most-recent-first list, each
      entry offering a "Give feedback" affordance (wired in US5); empty state (FR-014), bilingual
      `MESSAGES` (FR-012), wrapped in `TeacherDashboardGuard` (depends on T023, T002).

**Checkpoint**: US1–US4 all independently functional.

---

## Phase 7: User Story 5 - Record structured feedback on a book activity (Priority: P2)

**Goal**: A teacher rates a book activity they've run (1–5, what worked, what didn't, actual time
taken), reachable from a teaching log entry or the activity's own content page, revisable on a
repeat rating; an admin can view aggregated feedback per activity across every teacher.

**Independent Test**: As a teacher, submit feedback for one activity, then as an admin confirm
that activity's aggregated view shows the correct average rating and surfaces the recorded issue
text.

### Tests for User Story 5 ⚠️

- [X] T025 [P] [US5] RLS test in `tests/rls/activity-feedback-upsert.test.mjs`: a teacher can
      insert then re-rate (upsert) their own `activity_feedback` for the same activity — exactly
      one row results, with updated fields and a bumped `updated_at`; a teacher cannot `SELECT`
      another teacher's individual row; an admin can `SELECT` every teacher's rows for one
      activity to compute an aggregate (contract checklist items 4–6).
- [X] T026 [P] [US5] E2E test in `tests/e2e/teacher-activity-feedback.spec.ts`: submits feedback
      for one activity from a teaching-log entry; re-submits feedback for the same activity from
      the activity's own content page; confirms exactly one, updated record; as an admin, views
      that activity's aggregated feedback and confirms the average rating and recorded
      what-didn't-work notes are both visible (US5 AS1–AS3).

### Implementation for User Story 5

- [X] T027 [US5] Create migration `supabase/migrations/0029_activity_feedback.sql`:
      `activity_feedback` table per data-model.md — RLS `SELECT` (own rows or admin); `INSERT`
      `WITH CHECK (teacher_id = current_profile_id())`; `UPDATE`
      `USING/WITH CHECK (teacher_id = current_profile_id())` (supports the upsert path); no
      `DELETE` policy.
- [X] T028 [US5] Implement `src/lib/activityFeedback.ts`: `submitFeedback()` (upsert via
      `on conflict (teacher_id, course_code, unit_no, source_kind) do update`),
      `fetchOwnFeedback(courseCode, unitNo, sourceKind)`, `fetchAggregatedFeedback(courseCode,
      unitNo, sourceKind)` (admin — average rating + every recorded `what_didnt` note) (depends
      on T027, T001).
- [X] T029 [US5] Extend `src/theme/DocItem/Footer.tsx` (T014) with a teacher-only "Give feedback
      on this activity" control on activity-bearing unit pages, pre-filled with the teacher's
      existing rating if one exists (depends on T028, T014).
- [X] T030 [US5] Extend `src/pages/app/teacher/teaching-log.tsx` (T024): wire each log entry's
      "Give feedback" affordance to open the same feedback form for that entry's
      `course_code`/`unit_no`/`source_kind` (depends on T028, T024).
- [X] T031 [US5] Extend `src/pages/app/teacher/feedback-suggestions.tsx` (T015) with the teacher's
      own Activity Feedback history section (depends on T028, T015).
- [X] T032 [US5] Build `src/pages/app/admin/feedback.tsx`: aggregated feedback per activity —
      average rating and every recorded `what_didnt` note across every rating teacher, admin-only
      via `AuthGuard requireRole={['admin']}` (depends on T028).

**Checkpoint**: US1–US5 all independently functional — the improvement loop's other half
(structured feedback) is now complete.

---

## Phase 8: User Story 6 - See how my classes are performing (Priority: P3)

**Goal**: Analytics for one class shows score distribution per assignment, per-student trend over
time, a unit-by-unit class average, and an advisory at-risk flag with a plain-language reason —
never visible on the student's own dashboard.

**Independent Test**: Seed one class with graded assignments across several students, including
one who meets the at-risk criteria. Open Analytics and confirm the distribution, per-student
trends, and unit averages all match a manual calculation, and only the one qualifying student is
flagged, with a tooltip explaining why.

### Tests for User Story 6 ⚠️

- [X] T033 [P] [US6] RLS/read-shape test in `tests/rls/teacher-analytics-isolation.test.mjs`:
      Analytics queries are scoped to one `class_id` the caller owns; another teacher's class
      never appears through any query path (FR-009, FR-010, SC-004; contract checklist item 14).
- [X] T034 [P] [US6] E2E test in `tests/e2e/teacher-analytics.spec.ts`: with a seeded fixture,
      confirms score distribution, per-student trend, and unit-by-unit average all match a manual
      calculation; confirms only the student(s) meeting either at-risk criterion (≥2 missed
      deadlines, or last-3-scores-declining) are flagged, each with a tooltip naming the specific
      reason (US6 AS1–AS2).
- [X] T035 [P] [US6] E2E test in `tests/e2e/dashboard-no-at-risk-leak.spec.ts`: the flagged
      student's own dashboard (`/app/dashboard/`, Spec 004) shows no at-risk flag or label of any
      kind, under any condition (US6 AS3 — mirrors Spec 004's own FR-010 in the opposite
      direction).

### Implementation for User Story 6

- [X] T036 [US6] Implement `src/lib/teacherAnalytics.ts` (base): `fetchClassAnalytics(classId)` —
      reuses `gradebookExport.ts`'s existing grades+`quiz_best_scores` merge (extracted into a
      small shared helper, research.md R4), normalizes each score to `mark/max_mark`, computes
      score distribution per assignment, each student's chronological (`due_at`-ordered) trend,
      and the unit-by-unit class average; computes the at-risk flag per student (≥2 assignments
      past `due_at` with no `submissions`/`quiz_attempts` row, **or** the student's last 3
      normalized scores each strictly lower than the one before) with a plain-language reason
      string per flag (spec.md Clarifications, 2026-07-24).
- [X] T037 [US6] Build `src/pages/app/teacher/analytics.tsx` (`?classId=`): distribution/trend/
      unit-average rendered as plain CSS/SVG bars (research.md R7, no charting dependency),
      at-risk flags with a tooltip explanation per student, empty state when no graded work
      exists yet (FR-014), wrapped in `TeacherDashboardGuard` (depends on T036, T002).

**Checkpoint**: US1–US6 all independently functional.

---

## Phase 9: User Story 7 - Drill into one student's full record (Priority: P3)

**Goal**: From within a class, a teacher opens one student's record and sees their submissions,
grades, and unit coverage for that class together — with nothing from any other class visible.

**Independent Test**: As a teacher, open one student's drill-down view within a class and confirm
their submissions, grades, and coverage figures all match that student's records exactly, with
nothing from any other class visible.

### Tests for User Story 7 ⚠️

- [X] T038 [P] [US7] RLS test in `tests/rls/student-drilldown-isolation.test.mjs`: the drill-down
      query is scoped to one `(class_id, student_id)` pair the caller owns; a combination outside
      that ownership returns zero rows; the unit-coverage computation touches only `submissions`/
      `grades`/`quiz_attempts` — confirmed by re-asserting Spec 004's existing RLS still denies a
      teacher any read of `unit_progress`/`student_achievements` (FR-011, SC-004, contract
      checklist item 15, data-model.md matrix item 10).
- [X] T039 [P] [US7] E2E test in `tests/e2e/teacher-student-drilldown.spec.ts`: opens a student's
      drill-down within one class; submissions, grades, and coverage figures match that student's
      records exactly; confirms no data from a class the teacher doesn't teach is present
      (US7 AS1–AS2).

### Implementation for User Story 7

- [X] T040 [US7] Extend `src/lib/teacherAnalytics.ts` (T036) with
      `fetchStudentDrilldown(classId, studentId)`: submissions/grades/quiz attempts for that
      exact pair, plus a unit-coverage fraction —
      `count(distinct (course_code, unit_no))` across that student's graded submissions and quiz
      attempts for the class's course, divided by Spec 004's existing
      `fetchTotalUnitsForCourse()` (`src/lib/unitProgress.ts`, reused unmodified) — **never**
      `unit_progress` (research.md R3) (depends on T036).
- [X] T041 [US7] Build `src/pages/app/teacher/student.tsx` (`?classId=&studentId=`): submissions,
      grades, and the unit-coverage figure together for that class only, wrapped in
      `TeacherDashboardGuard` (depends on T040, T002).

**Checkpoint**: All seven user stories independently functional and integrated.

---

## Phase 10: Polish & Cross-Cutting Concerns

**Purpose**: A comprehensive cross-table isolation regression test, dashboard-wide RTL
verification, the Teacher Guide (Constitution Article X's Docs-gate obligation, reusing ADR-0009's
existing `guides` instance), and final validation.

- [X] T042 [P] RLS test in `tests/rls/teacher-dashboard-full-isolation.test.mjs`: walks the
      complete access-control matrix from data-model.md (teacher/admin/student ×
      `teaching_log_entries`/`activity_feedback`/`improvement_suggestions`) as one consolidated
      regression check, complementing each story's narrower tests above, and re-verifies Spec
      004's `unit_progress`/`student_achievements` RLS is unchanged (SC-004) (depends on T012,
      T022, T027 — all schema must exist).
- [X] T043 [P] E2E test in `tests/e2e/teacher-dashboard-rtl.spec.ts`: switches locale to Urdu and
      confirms every area (Overview, My Teaching Log, Feedback & Suggestions, Analytics, the
      student drill-down, the moderation queue, and the admin feedback view) plus every
      category/status name and the at-risk explanation tooltip render correctly right-to-left,
      matching Specs 002–004's own RTL-testing precedent (SC-006) (depends on T008, T015, T019,
      T024, T032, T037, T041).
- [X] T044 [P] Author `guides/teacher-guide/index.mdx` and
      `guides/teacher-guide/manage-classes-and-assignments.mdx` (EN + UR) — Teacher Guide overview
      and a pointer to Spec 003's existing `/app/classes/*` workflows (Art. X.1).
- [X] T045 [P] Author `guides/teacher-guide/grade-submissions.mdx` and
      `guides/teacher-guide/verified-teacher-material.mdx` (EN + UR) — the existing Spec 003
      grading workflow and what the Spec 002 `verified_teacher` capability unlocks.
- [X] T046 Author `guides/teacher-guide/use-the-teacher-dashboard.mdx` and
      `guides/teacher-guide/give-feedback-and-suggest-improvements.mdx` (EN + UR) — this feature's
      own areas; written last since they document pages built in Phases 3–9 (depends on T008,
      T015, T019, T024, T032, T037, T041).
- [X] T047 Link the Teacher Guide from the teacher dashboard navigation (extend
      `TeacherDashboardNavLink`, T003, mirroring the existing student "Guide" link) (depends on
      T003, T046).
- [X] T048 Verify the Art. V.5 bundle budget for the new lazy-loaded `src/pages/app/teacher/*` and
      `src/pages/app/admin/{suggestions,feedback}.tsx` pages plus the extended `Footer.tsx`
      swizzle (build-size/Lighthouse check, per plan.md's Risk 3).
- [X] T050 [P] Performance test measuring Overview's (`teacherOverview.ts`) and Analytics'
      (`teacherAnalytics.ts`) load time against Spec 003 SC-005's 5-second p95 budget, using the
      T004 fixture seeded at the 200-student scale ceiling — distinct from T048's bundle-*size*
      check, this measures load *time* (2026-07-24 remediation, `/sp.analyze` finding G1) (depends
      on T004, T008, T037).
- [X] T051 [P] E2E test in `tests/e2e/teacher-dashboard-access-denial.spec.ts`: a signed-in
      student reaching `/app/teacher/` sees `TeacherDashboardGuard`'s denial notice; reaching
      `/app/admin/suggestions` and `/app/admin/feedback` is denied by the existing `AuthGuard`
      (FR-013, SC-007, 2026-07-24 remediation, `/sp.analyze` finding G2) (depends on T002, T019,
      T032).
- [X] T049 Run quickstart.md's full end-to-end verification checklist, plus the complete
      `npm run test:rls` and `npm run test:e2e` suites (including T042's consolidated isolation
      test, T043's RTL spec, T050's load-time measurement, and T051's access-denial spec); confirm
      every item in contracts/teacher-dashboard-operations.md's 16-item checklist passes.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion — BLOCKS all user stories (the access
  gate, nav entry, and shared fixture are used by every teacher-facing page and its tests).
- **User Stories (Phase 3–9)**: All depend on Foundational phase completion.
  - US1 and US2 (both P1) have no dependency on each other or on any P2/P3 story.
  - US3 depends on US2's `improvement_suggestions` schema (T011, T012) existing to have anything
    to moderate — matches spec.md's own stated story ordering ("it naturally follows Story 2").
  - US4 and US5 both extend `teaching-log.tsx`/`Footer.tsx`, so US5 is sequenced after US4
    (US5's "Give feedback" affordance wires into US4's log-entry list), though US5's own schema
    (T027) has no dependency on US4's.
  - US6 and US7 share `teacherAnalytics.ts` — US7 extends US6's base module (T036), so US7 is
    sequenced after US6, matching their shared P3 priority and spec.md's own "natural extension"
    framing (User Story 7's rationale).
- **Polish (Phase 10)**: Depends on all seven user stories being complete (T046 specifically needs
  every dashboard page to exist; T042 needs every new table's schema to exist).

### Within Each User Story

- Tests MUST be written and FAIL before implementation.
- Migrations before lib helpers; lib helpers before pages.
- Story complete before moving to the next priority (though US1/US2 can proceed in parallel if
  staffed, since they touch disjoint files until Polish).

### Parallel Opportunities

- Foundational: T002–T004 are all `[P]` (disjoint files).
- US1 and US2 can be staffed in parallel once Foundational completes — disjoint files
  (`teacherOverview.ts`/`index.tsx` vs. `suggestions.ts`/`Footer.tsx`/`feedback-suggestions.tsx`).
- US6's migration-free `teacherAnalytics.ts` work can start in parallel with US3/US4/US5's
  migration-bearing work, though the shared `Footer.tsx` file (touched by US2 and US5) means
  those two stories' `Footer.tsx` edits should not run concurrently.
- All RLS/E2E tests within a story marked `[P]` can run in parallel.

---

## Parallel Example: User Story 1

```bash
# Launch both tests for User Story 1 together:
Task: "RLS test in tests/rls/teacher-overview-isolation.test.mjs"
Task: "E2E test in tests/e2e/teacher-overview.spec.ts"

# T007 (teacherOverview.ts) has no [P] peer within US1 since T008 depends on it —
# but T007 can run in parallel with US2's own Foundational-dependent-only setup work.
```

---

## Implementation Strategy

### MVP First (User Stories 1 + 2 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories).
3. Complete Phase 3: User Story 1 (Overview).
4. Complete Phase 4: User Story 2 (Suggest an improvement + My Suggestions).
5. **STOP and VALIDATE**: Test both stories independently.
6. Deploy/demo if ready — together these deliver both of the spec's P1 stories: the day-to-day
   entry point and the strategic improvement-loop core.

### Incremental Delivery

1. Setup + Foundational → foundation ready.
2. US1 (Overview) → test independently → deploy (MVP, part 1).
3. US2 (Suggest improvement + My Suggestions) → test independently → deploy (MVP, part 2).
4. US3 (Moderation queue) → test independently → deploy.
5. US4 (Teaching log) → test independently → deploy.
6. US5 (Activity feedback + admin aggregate) → test independently → deploy.
7. US6 (Analytics) → test independently → deploy.
8. US7 (Student drill-down) → test independently → deploy.
9. Polish: Teacher Guide, full isolation regression, RTL, bundle-budget check.

### Parallel Team Strategy

With multiple developers, once Foundational is done: Developer A takes US1 then US6+US7 (reads
over existing data, naturally sequenced); Developer B takes US2 then US3 (the suggestion loop,
naturally sequenced); Developer C takes US4 then US5 (the teaching-log/feedback pair, naturally
sequenced, sharing `Footer.tsx`/`teaching-log.tsx`).

---

## Notes

- `[P]` tasks = different files, no dependencies.
- `[Story]` label maps task to specific user story for traceability.
- Verify tests fail before implementing.
- Commit after each task or logical group.
- Stop at any checkpoint to validate a story independently.
- FR-011's unit-coverage computation (T040) is deliberately independent of Spec 004's
  `unit_progress` table — do not "simplify" this later by reading `unit_progress` directly; that
  table's RLS excludes teachers by design (research.md R3), and reusing it would silently break
  once Spec 004's own tests catch the unauthorized read.
- `enforce_suggestion_status_transition()` (T012) is the only thing preventing a crafted admin
  API call from skipping a moderation step — do not relax it to "trust the moderation UI" later.
