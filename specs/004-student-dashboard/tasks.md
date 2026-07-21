---
description: "Task list for 004-student-dashboard implementation"
---

# Tasks: Student Dashboard

**Input**: Design documents from `/specs/004-student-dashboard/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/dashboard-operations.md, quickstart.md

**Tests**: **REQUIRED** for this feature (not optional). Spec SC-005 mandates isolation checks that
"deliberately attempt to surface another student's classes, grades, coverage, or achievements,"
and Constitution Art. VII's engineering gate requires "RLS policies tested." A passing suite that
only covers happy paths is insufficient — the negative assertions in data-model.md's
access-control matrix and contracts/dashboard-operations.md's 13-item checklist are the
deliverable, not an afterthought.

**Organization**: Tasks are grouped by user story (US1–US6, spec.md priorities
P1/P1/P2/P2/P2/P3), each independently implementable and testable. FR-003 (the full Assignments
area) has no dedicated user story in spec.md — it shares its query shape with US1's due-soon
list (data-model.md's read-only query table) and is delivered inside US1's phase.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1–US6)
- Exact file paths included in every task

## Path Conventions

Single Docusaurus app at repository root (no `site/` subdirectory), extending Specs 002/003's
layout per plan.md's Structure Decision. New code lands in `src/lib`, `src/components`,
`src/theme/DocItem`, `src/pages/app/dashboard/`, `guides/`, `supabase/migrations/`, `tests/rls/`,
`tests/e2e/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: One-time initialization that doesn't block any user story but must exist before the
Student Guide (Article X obligation) can be authored, and shared types every story references.

- [X] T001 Register a second Docusaurus docs-plugin instance in `docusaurus.config.ts` — id
      `guides`, `routeBasePath: '/guides'`, content dir `guides/` — reusing the existing `en`/`ur`
      `i18n` config; scaffold `guides/student-guide/_category_.json` and extend the existing
      `@easyops-cn/docusaurus-search-local` theme config's indexed routes to include `/guides`
      (research.md R6, ADR-0009). Verify with `npm run build` (fails loudly on a plugin-id
      collision, per quickstart.md's failure mode #3).
- [X] T002 [P] Add dashboard-domain TypeScript types (`UnitProgress`, `UnitProgressMethod`,
      `StudentAchievement`, `AchievementKey`) in `src/lib/types.ts`, mirroring data-model.md's
      `unit_progress`/`student_achievements` columns.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The `unit_progress` substrate (schema + sync triggers) that US3/US4/US6 all depend
on, plus the access-gate, nav entry, and test fixtures every one of the six dashboard pages needs.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete. Migrations must be
applied in numeric order — `0024`/`0025` continue directly after Spec 003's `0023` and assume
Spec 003's `grades`/`quiz_attempts` tables already exist.

- [X] T003 Create migration `supabase/migrations/0024_unit_progress.sql`: `unit_progress_method`
      enum and `unit_progress` table per data-model.md — RLS `SELECT` (owning student, admin);
      `INSERT` `WITH CHECK (student_id = current_profile_id() AND method = 'self_marked')`; no
      `UPDATE`/`DELETE` policy.
- [X] T004 Create migration `supabase/migrations/0025_unit_progress_sync_triggers.sql`:
      `sync_unit_progress_from_grade()` (`AFTER INSERT ON grades`, `SECURITY DEFINER`, skips
      `custom`-source assignments whose `course_code`/`unit_no` are null) and
      `sync_unit_progress_from_quiz()` (`AFTER INSERT ON quiz_attempts`, `SECURITY DEFINER`) —
      both `INSERT ... ON CONFLICT (student_id, course_code, unit_no) DO NOTHING` (depends on
      T003; research.md R3).
- [X] T005 [P] Implement `src/lib/unitProgress.ts` (base): `fetchOwnUnitProgress()` (own
      `unit_progress` rows) and `fetchTotalUnitsForCourse(courseCode)` (counts distinct `unit_no`
      from `fetch('/content-index.json')`, research.md R1) (depends on T003, T002).
- [X] T006 [P] Implement `src/components/StudentDashboardGuard.tsx`: extends `AuthGuard`'s
      cosmetic-gate pattern (`src/components/AuthGuard.tsx`) with FR-012's specific messaging —
      when a signed-in `teacher`/`admin` reaches a dashboard page, show a notice that this view
      is student-only with a link to their own tools, not the generic "no access" text.
- [X] T007 [P] Register a new `custom-dashboardLink` navbar item type (extend
      `src/theme/NavbarItem/ComponentTypes.tsx`, mirroring the existing `custom-authWidget`
      precedent) backed by a new `src/components/DashboardNavLink.tsx` — renders a "Dashboard"
      link to `/app/dashboard/` only when signed in with `role === 'student'`; renders nothing
      otherwise. Add the item to `docusaurus.config.ts`'s `navbar.items`.
- [X] T008 [P] Extend the RLS test harness with `tests/rls/_dashboardFixtures.mjs`: seed helpers
      building on Spec 003's `tests/rls/_classFixtures.mjs` for a student with 2+ semesters of
      classes/enrollments/assignments/submissions/grades/quiz_attempts (SC-008's 8-semester/
      6-class scale as the upper bound to seed against) — reused by every story's tests below.

**Checkpoint**: `unit_progress` substrate, access gate, nav entry, and shared fixtures ready —
user story implementation can begin.

---

## Phase 3: User Story 1 - See what's due right now, at a glance (Priority: P1) 🎯 MVP

**Goal**: The dashboard home area shows, above the fold on a 360px screen, current semester,
enrolled classes, due-soon assignments/quizzes (48h-first), and up to 5 recent grades. The
Assignments area (FR-003) shares the same due-soon query, unfiltered, as its own full list.

**Independent Test**: Enroll a student in two active classes with assignments at varying due
dates and two recent grades; open the dashboard on a 360px screen and confirm current semester,
both classes, due-soon ordering, and recent grades are all visible above the fold.

### Tests for User Story 1 ⚠️

> Write these FIRST and confirm they FAIL before implementing.

- [X] T009 [P] [US1] RLS test in `tests/rls/dashboard-home-isolation.test.mjs`: a student's
      current-semester/classes/due-soon/recent-grades queries never return another student's
      rows, even for classes/assignments that exist in the fixture (FR-001, SC-005).
- [X] T010 [P] [US1] E2E test in `tests/e2e/dashboard-home.spec.ts`: items due within 48h appear
      first; a student with nothing pending sees "all caught up," not an empty region; on a
      360px viewport, semester/classes/due-soon/recent-grades are all reachable without
      scrolling past the fold (US1 AS1–AS3, SC-006).
- [X] T051 [P] [US1] E2E test in `tests/e2e/dashboard-assignments.spec.ts`: the full Assignments
      area (FR-003) distinguishes overdue from future-due items, states whether a late submission
      is still accepted or the window has closed for each, never renders a closed item as
      actionable, and shows a past-due unattempted quiz as closed rather than an actionable
      overdue item (spec.md Edge Cases); on a 360px viewport, confirms no horizontal scrolling is
      required (SC-006) — resolved via `/sp.analyze` (2026-07-21): T013 previously had no
      dedicated test of its own.

### Implementation for User Story 1

- [X] T011 [P] [US1] Implement `src/lib/dashboardQueries.ts`: `fetchCurrentSemesterClasses()` —
      returns every active `enrollments` → active `classes` row (never filtered by semester) plus
      a separate `currentSemester: number` label computed as `max(semester)` by looking up each
      returned class's `course_code` in `content-index.json` (research.md R1); a student can hold
      active classes across more than one semester at once (e.g., retaking one while progressing
      in another) — the label picks the highest, the class list itself is unfiltered (resolved via
      `/sp.analyze`, 2026-07-21). `fetchDueSoon(windowHours?)` (published assignments/quizzes
      minus existing `submissions`, ordered `due_at` asc, stable secondary order by class then
      title for same-due-date ties per spec.md's Edge Cases; **each row also carries `allow_late`
      and a computed state — `open` / `overdue-late-allowed` / `closed`** — required by FR-003's
      late-acceptance wording and the quiz-closed-not-overdue edge case; both Home's preview (T012)
      and the full Assignments area (T013) consume this same shape). `fetchRecentGrades(limit=5)`
      (`grades` joined to `submissions/assignments/classes`, ordered `graded_at` desc) (depends on
      T002).
- [X] T012 [US1] Build `src/pages/app/dashboard/index.tsx`: Home page wrapped in
      `StudentDashboardGuard` (T006) — the `currentSemester` label (T011, highest semester among
      active classes), the unfiltered class list, due-soon list (48h bucket first), recent grades,
      an explicit "all caught up" empty state (FR-011), bilingual `MESSAGES` dict per this repo's
      existing convention (FR-010) (depends on T011, T006, T007).
- [X] T013 [US1] Build `src/pages/app/dashboard/assignments.tsx`: full Assignments area (FR-003)
      — every published/unsubmitted assignment/quiz, soonest-due-first, overdue items visually
      distinguished from future-due, late-acceptance state stated explicitly, closed items never
      rendered as actionable; an explicit "nothing due" empty state when the list is empty
      (FR-011), bilingual `MESSAGES` dict per this repo's existing convention (FR-010) (depends on
      T011, T006).

**Checkpoint**: US1 fully functional and independently testable — Home and the full Assignments
area both working.

---

## Phase 4: User Story 2 - See every grade and test score without hunting (Priority: P1)

**Goal**: The Grades area shows every returned assignment/quiz score with mark and maximum, never
a class/cohort average, and always the corrected value after a re-grade.

**Independent Test**: Grade several submissions and a quiz attempt for one student across two
classes; open Grades and confirm every mark appears with no average anywhere on the page.

### Tests for User Story 2 ⚠️

- [X] T014 [P] [US2] RLS/read-shape test in `tests/rls/dashboard-grades-no-average.test.mjs`:
      every returned grade (assignment and quiz) appears with mark/max/class/title; no
      average/aggregate value is computed or joined into the result set anywhere; updating a
      `grades.mark` (re-grade) is reflected on the next read, never the original value (FR-004,
      US2 AS1–AS3).
- [X] T015 [P] [US2] E2E test in `tests/e2e/dashboard-grades.spec.ts`: opens Grades, confirms
      every mark across both classes is visible and no average figure is rendered anywhere on
      the page; on a 360px viewport, confirms no horizontal scrolling is required (SC-006).

### Implementation for User Story 2

- [X] T016 [US2] Extend `src/lib/dashboardQueries.ts` (T011) with `fetchAllGrades()`: `grades`
      joined to `submissions/assignments/classes`, plus Spec 003's `quiz_best_scores` view for
      quiz assignments — deliberately no average/aggregate computed anywhere in this function
      (depends on T011).
- [X] T017 [US2] Build `src/pages/app/dashboard/grades.tsx`: full grade list, empty state when
      nothing is graded yet (FR-011), bilingual `MESSAGES` (FR-010) (depends on T016, T006).

**Checkpoint**: US1 and US2 both independently functional.

---

## Phase 5: User Story 3 - Track how much of each subject I've covered (Priority: P2)

**Goal**: The Progress area shows, per course, a completed-units-out-of-total fraction (covering
self-marked, graded, and quiz-derived completions, each counted exactly once) plus a
semester-level "share of courses with any progress" figure.

**Independent Test**: Give a student graded work covering 4 of 8 units in one course and nothing
in a second course; Progress reads 4/8 and 0 respectively, with a correct semester-level figure.

### Tests for User Story 3 ⚠️

- [X] T018 [P] [US3] RLS test in `tests/rls/unit-progress-sync.test.mjs`: grading a unit-linked
      submission auto-inserts a `unit_progress` row with `method='assignment'`; grading a
      `custom`-source assignment's submission inserts nothing (no unit to attach to); submitting
      a quiz attempt auto-inserts a row with `method='quiz'`; a retake attempt on an already
      quiz-covered unit still results in exactly one row (US3 AS3, data-model.md's sync triggers).
- [X] T019 [P] [US3] E2E test in `tests/e2e/dashboard-progress.spec.ts`: with the 4-of-8/0-of-8
      fixture from the Independent Test, confirms both courses' fractions and the semester-level
      figure render correctly (US3 AS1–AS2); on a 360px viewport, confirms no horizontal
      scrolling is required (SC-006).

### Implementation for User Story 3

- [X] T020 [US3] Build `src/pages/app/dashboard/progress.tsx`: per-course coverage fraction (CSS-
      only bar, per research.md R7 — no charting dependency) computed from
      `fetchOwnUnitProgress()` (T005) grouped by `course_code` against `fetchTotalUnitsForCourse()`
      (T005); a semester-level figure for the share of enrolled courses with any recorded
      progress; empty state when nothing is covered yet (FR-011) (depends on T005, T006).

**Checkpoint**: US1–US3 all independently functional.

---

## Phase 6: User Story 4 - Mark my own study progress (Priority: P2)

**Goal**: A student can self-mark any unit studied from the dashboard or that unit's own content
page, independent of graded work, with idempotent "exactly once" counting.

**Independent Test**: Open a unit's content page, mark it studied, return to Progress and confirm
it now counts toward that course's coverage fraction, with no assignment/quiz activity involved.

### Tests for User Story 4 ⚠️

- [X] T021 [P] [US4] RLS test in `tests/rls/unit-self-mark.test.mjs`: a student can insert a
      `self_marked` `unit_progress` row for themselves; a repeat insert for the same unit is a
      no-op (`ON CONFLICT DO NOTHING`), not a duplicate row or an error; a forged `method`
      (`'assignment'`/`'quiz'`) or a forged `student_id` on a direct client insert is denied
      (US4 AS2, contract checklist items 1–4).
- [X] T022 [P] [US4] E2E test in `tests/e2e/unit-self-mark.spec.ts`: marks a unit studied from its
      content page, confirms it appears in Progress without a reload race (SC-002); marks the
      same unit again and confirms the coverage count doesn't change; marks a unit already
      covered via a graded assignment and confirms no double count (US4 AS3).

### Implementation for User Story 4

- [X] T023 [US4] Extend `src/lib/unitProgress.ts` (T005) with `markUnitStudied(courseCode,
      unitNo)`: `insert ... on conflict (student_id, course_code, unit_no) do nothing` (depends
      on T005).
- [X] T024 [US4] Extend `src/pages/app/dashboard/progress.tsx` (T020) with a "Mark as studied"
      control per not-yet-covered unit (depends on T020, T023).
- [X] T025 [US4] Swizzle `src/theme/DocItem/Footer.tsx` (wraps `@theme-original/DocItem/Footer`):
      reads the current doc's front matter via Docusaurus's doc-context hook; when both
      `course_code` and `unit_no` are present and the signed-in user is a student, renders the
      same "Mark as studied" control calling `markUnitStudied()` (research.md R5) (depends on
      T023).

**Checkpoint**: US1–US4 all independently functional.

---

## Phase 7: User Story 5 - Review my past semesters like a transcript (Priority: P2)

**Goal**: The History area groups past (archived) semesters, each frozen exactly as it stood at
archive time, with no editing/resubmission control anywhere.

**Independent Test**: Seed two archived past semesters with distinct classes/grades/coverage;
History shows both grouped separately, each with its own data, nothing editable.

### Tests for User Story 5 ⚠️

- [X] T026 [P] [US5] RLS/read-shape test in `tests/rls/dashboard-history-readonly.test.mjs`:
      archived classes (`status='archived'`) for the student appear grouped by `term_label` with
      their classes/grades/coverage exactly as they stood at archive time; the query shape
      exposes no write-capable path for any of this data (FR-007, SC-003).
- [X] T027 [P] [US5] E2E test in `tests/e2e/dashboard-history.spec.ts`: two archived semesters
      appear grouped separately with no edit/resubmit control rendered anywhere on the page; a
      student with no past semesters sees a plain explanation, not an empty region (US5 AS1–AS3);
      on a 360px viewport, confirms no horizontal scrolling is required (SC-006).

### Implementation for User Story 5

- [X] T028 [US5] Extend `src/lib/dashboardQueries.ts` (T011) with `fetchPastSemesters()`: `classes`
      where `status='archived'`, grouped by `term_label`, joined to that student's
      `enrollments`/`submissions`/`grades`/`quiz_attempts`/`unit_progress` for those classes
      (depends on T011).
- [X] T029 [US5] Build `src/pages/app/dashboard/history.tsx`: grouped-by-semester, strictly
      read-only rendering (no edit/resubmit controls anywhere in this component), empty state
      when no past semesters exist (FR-011) (depends on T028, T006).

**Checkpoint**: US1–US5 all independently functional.

---

## Phase 8: User Story 6 - Get recognized for milestones (Priority: P3)

**Goal**: Four fixed achievements (first submission, 3-day self-marked study streak, 100% course
coverage, on-time completion of every assignment in a class) are granted exactly once each,
previewed on Home, and fully browsable (earned and unearned) on a dedicated Achievements area.

**Independent Test**: Trigger each of the four milestone conditions one at a time and confirm the
matching badge appears after each; repeat one triggering action and confirm no duplicate.

- [X] T030 Create migration `supabase/migrations/0026_student_achievements.sql`:
      `student_achievements` table per data-model.md (`unique (student_id, achievement_key)`), RLS
      `SELECT` (owning student, admin) with **no** client `INSERT`/`UPDATE`/`DELETE` policy;
      `grant_achievement(p_student_id, p_key, p_context)` `SECURITY DEFINER` helper (`ON CONFLICT
      DO NOTHING`) (depends on T003).
- [X] T031 Create migration `supabase/migrations/0027_achievement_triggers.sql`:
      `grant_first_submission_achievement()` (`AFTER INSERT ON submissions`),
      `grant_study_streak_achievement()` (`AFTER INSERT ON unit_progress`, `WHEN (NEW.method =
      'self_marked')`, 3-consecutive-calendar-day check), `grant_on_time_completion_achievement()`
      (`AFTER INSERT ON grades`, with the `published_count >= 1` guard so a zero-assignment class
      never qualifies), and `check_full_coverage_achievement(p_course_code, p_total_units)` RPC
      (recomputes the numerator server-side; accepts `p_total_units` from the caller per
      research.md R2) — all `SECURITY DEFINER`, all calling `grant_achievement()` (depends on
      T030, T004, T003).

### Tests for User Story 6 ⚠️

- [X] T032 [P] [US6] RLS test in `tests/rls/achievement-first-submission.test.mjs`: a student's
      first-ever `submissions` insert (any class) grants `first_submission`; a second submission
      does not grant it again (SC-004).
- [X] T033 [P] [US6] RLS test in `tests/rls/achievement-study-streak.test.mjs`: 3 consecutive
      self-marked calendar days grant `study_streak` exactly once; a 4th consecutive day does not
      re-grant it; grade/quiz-derived `unit_progress` rows never advance the streak (2026-07-20
      clarification).
- [X] T034 [P] [US6] RLS test in `tests/rls/achievement-on-time-completion.test.mjs`: completing
      every published assignment in a class on time grants `on_time_class_completion`; a late
      submission in an otherwise-complete class does not grant it; a class with zero published
      assignments never grants it (2026-07-20 clarification, contract checklist item 9).
- [X] T035 [P] [US6] RLS test in `tests/rls/achievement-full-coverage.test.mjs`:
      `check_full_coverage_achievement` grants `full_course_coverage` only when the
      server-recomputed numerator meets the caller-supplied `p_total_units`; calling it again
      after the condition is already true does not re-grant (contract checklist item 10).
- [X] T036 [P] [US6] RLS test in `tests/rls/achievement-write-policy.test.mjs`: a direct client
      `insert`/`update` on `student_achievements` is denied for any caller, including admin — only
      `grant_achievement()` (internal) may write (contract checklist items 11, 13).
- [X] T037 [P] [US6] E2E test in `tests/e2e/dashboard-achievements.spec.ts`: a newly earned badge
      appears as a Home preview and on the full Achievements page; an achievement earned once does
      not duplicate on repeat triggering; a student with none earned sees what milestones exist
      and how to reach them (US6 AS1–AS3); on a 360px viewport, confirms no horizontal scrolling
      is required (SC-006).

### Implementation for User Story 6

- [X] T038 [US6] Implement `src/lib/achievements.ts`: static bilingual `ACHIEVEMENT_CATALOG`
      constant (4 entries: title/description/how-to-reach-it, `{en, ur}`, research.md R4),
      `fetchEarnedAchievements()`, and `checkFullCoverageAchievement(courseCode, totalUnits)`
      (RPC wrapper) (depends on T030, T031, T002).
- [X] T039 [US6] Build `src/pages/app/dashboard/achievements.tsx`: full catalog, earned vs.
      unearned clearly distinguished, "how to reach it" copy for unearned milestones, empty state
      guidance when nothing is earned yet (FR-009, FR-011) (depends on T038, T006).
- [X] T040 [US6] Extend `src/pages/app/dashboard/index.tsx` (T012) with a preview of the student's
      most recently earned achievement(s) (FR-009) (depends on T012, T038).
- [X] T041 [US6] Extend `src/pages/app/dashboard/progress.tsx` (T020) to call
      `checkFullCoverageAchievement()` after computing a course's fraction client-side, whenever
      that fraction reaches 100% (depends on T020, T038).

**Checkpoint**: All six user stories independently functional and integrated.

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: The Student Guide (Constitution Article X's Docs-gate obligation, ADR-0009), a
comprehensive cross-table isolation regression test, dashboard-wide RTL/performance verification,
and final validation.

- [X] T042 [P] RLS test in `tests/rls/dashboard-full-isolation.test.mjs`: walks the complete
      access-control matrix from data-model.md (student/teacher/admin × `unit_progress`/
      `student_achievements`) as one consolidated regression check, complementing each story's
      narrower tests above (SC-005) (depends on T004, T031 — all schema must exist).
- [X] T049 [P] E2E test in `tests/e2e/dashboard-rtl.spec.ts`: switches locale to Urdu and confirms
      all six dashboard areas (Home, Assignments, Grades, Progress, History, Achievements) plus
      every empty state render correctly right-to-left, matching Specs 002/003's own RTL-testing
      precedent (`classes-rtl.spec.ts`, `read-bilingual.spec.ts`) (SC-007) (depends on T012, T013,
      T017, T020, T029, T039).
- [X] T050 Performance test measuring the dashboard home area's load time against SC-008's budget
      (< 2s p95) using the T008 fixture seeded at its 8-semester/6-class-per-semester scale —
      distinct from T047's bundle-*size* check below, this measures load *time* (e.g., a
      Playwright/Lighthouse timing assertion, not just a KB budget) (depends on T008, T012).
- [X] T043 [P] Author `guides/student-guide/index.mdx` and `guides/student-guide/navigate-the-
      platform.mdx` (EN + UR) — Student Guide overview and site-navigation basics (Art. X.1)
      (depends on T001).
- [X] T044 [P] Author `guides/student-guide/join-a-class.mdx`, `submit-work.mdx`, and
      `read-grades.mdx` (EN + UR) — covers the existing Spec 002/003 student workflows Art. X.1
      names (depends on T001).
- [X] T045 Author `guides/student-guide/use-the-dashboard.mdx` (EN + UR) — covers this feature's
      six areas; written last since it documents pages built in Phases 3–8 (depends on T012, T013,
      T017, T020, T029, T039).
- [X] T046 Link the Student Guide from the dashboard navigation (extend `DashboardNavLink`, T007,
      or add a sibling "Guide" entry) (depends on T007, T045).
- [X] T047 Verify the Art. V.5 bundle budget for the 6 new lazy-loaded `src/pages/app/dashboard/*`
      pages and the new `guides` docs instance (build-size/Lighthouse check, per plan.md's Risk 3).
- [X] T048 Run quickstart.md's full 10-item verification checklist end-to-end, plus the complete
      `npm run test:rls` and `npm run test:e2e` suites (including T049's RTL spec and T050's
      load-time measurement); confirm every item in contracts/dashboard-operations.md's 13-item
      checklist passes.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion (T002's types) — BLOCKS all user
  stories (the `unit_progress` substrate, access gate, and nav entry are shared by every page).
- **User Stories (Phase 3–8)**: All depend on Foundational phase completion.
  - US1, US2, US5 have no dependency on each other or on US3/US4/US6 — pure reads over Spec 003.
  - US3 depends on Foundational's `unit_progress`/sync-trigger migrations (T003, T004) to have
    real coverage data, but not on US1/US2/US4/US5/US6.
  - US4 extends US3's `progress.tsx` (T020) and `unitProgress.ts` (T005) — sequenced after US3,
    though its RLS/self-mark schema (T003) is already in place from Foundational.
  - US6 depends on its own migrations (T030, T031) plus Foundational's `unit_progress` (for the
    streak/coverage achievements) and extends US1's `index.tsx` (T012) and US3's `progress.tsx`
    (T020) — sequenced last among the six, matching its P3 priority.
- **Polish (Phase 9)**: Depends on all six user stories being complete (T045 specifically needs
  every dashboard page to exist).

### Within Each User Story

- Tests MUST be written and FAIL before implementation.
- Query/lib helpers before pages.
- Story complete before moving to the next priority (though US1/US2/US5 can proceed in parallel
  if staffed, since none shares a file with another until Polish).

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel (T002 alongside T001).
- Foundational: T005–T008 are all [P] once T003 lands (T004 depends on T003 specifically).
- US1, US2, and US5 can be staffed in parallel once Foundational completes — they touch disjoint
  files (`dashboardQueries.ts` is extended by each, but with independent, non-conflicting
  functions).
- US3 and US6's migrations (T030) can be drafted in parallel with US1/US2/US4/US5 implementation,
  though US6's *trigger* migration (T031) needs Foundational's T004 to exist first.
- All RLS/E2E tests within a story marked [P] can run in parallel.

---

## Parallel Example: User Story 1

```bash
# Launch both tests for User Story 1 together:
Task: "RLS test in tests/rls/dashboard-home-isolation.test.mjs"
Task: "E2E test in tests/e2e/dashboard-home.spec.ts"

# T011 (dashboardQueries.ts) has no [P] peer within US1 since T012/T013 both depend on it —
# but T011 can run in parallel with US2/US5's own Foundational-dependent-only setup work.
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational (CRITICAL — blocks all stories).
3. Complete Phase 3: User Story 1 (Home + Assignments area).
4. **STOP and VALIDATE**: Test User Story 1 independently (360px layout, 48h-first ordering,
   caught-up empty state).
5. Deploy/demo if ready — this alone delivers the dashboard's stated "reason to exist."

### Incremental Delivery

1. Setup + Foundational → foundation ready.
2. US1 (Home/Assignments) → test independently → deploy (MVP!).
3. US2 (Grades) → test independently → deploy.
4. US3 (Progress, read) → test independently → deploy.
5. US4 (Self-marking) → test independently → deploy.
6. US5 (History) → test independently → deploy.
7. US6 (Achievements) → test independently → deploy.
8. Polish: Student Guide, full isolation regression, bundle-budget check.

### Parallel Team Strategy

With multiple developers, once Foundational is done: Developer A takes US1+US2 (both pure reads,
similar shape); Developer B takes US3+US4 (coverage read then write, naturally sequenced);
Developer C takes US5 then starts US6's migrations early (T030/T031 have no UI dependency).

---

## Notes

- [P] tasks = different files, no dependencies.
- [Story] label maps task to specific user story for traceability.
- Verify tests fail before implementing.
- Commit after each task or logical group.
- Stop at any checkpoint to validate a story independently.
- The achievement-granting split (3 pure triggers + 1 client-assisted RPC, research.md R2) is a
  deliberate, narrowly-scoped exception — do not generalize `check_full_coverage_achievement`'s
  client-trust pattern to future features without re-justifying it against its own blast radius.
