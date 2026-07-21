# Phase 1 Data Model: Student Dashboard

**Feature**: 004-student-dashboard | **Date**: 2026-07-20 | **Spec**: [spec.md](./spec.md)

Two new tables live in the Supabase Postgres `public` schema with RLS **enabled**, extending Spec
002 (`profiles`) and Spec 003 (`classes`, `enrollments`, `assignments`, `submissions`, `grades`,
`quiz_attempts`). Every FK that points at a person references `profiles(id)` (never
`auth.users(id)`), consistent with Spec 002's tombstone-survival design. `is_admin()`,
`is_active_user()`, and `current_profile_id()` are reused unmodified from
`supabase/migrations/0004_is_admin.sql`.

This feature reads far more than it writes: the dashboard's home, assignments, grades, and history
areas are pure `SELECT`s over Spec 003's existing tables (no schema change needed there — see
"Read-only query shapes" at the end of this document). Only unit coverage and achievements need
new storage.

---

## Entity: `unit_progress`

Maps spec entity **Unit Progress**. One row per `(student_id, course_code, unit_no)` — the
constraint itself is what guarantees FR-006's "counts toward coverage exactly once regardless of
how many times marked or through how many means" (research.md R3).

| Column | Type | Constraints | Maps to |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | — |
| `student_id` | `uuid` | NOT NULL, FK → `profiles(id)` | FR-005, FR-006 |
| `course_code` | `text` | NOT NULL | FR-005 |
| `unit_no` | `integer` | NOT NULL | FR-005 |
| `method` | `unit_progress_method` enum | NOT NULL | Key Entities |
| `occurred_at` | `timestamptz` | NOT NULL, default `now()` | FR-006 (streak dates read from this) |

```sql
create type unit_progress_method as enum ('self_marked', 'assignment', 'quiz');
unique (student_id, course_code, unit_no)
```

**`course_code`/`unit_no` are unvalidated-by-FK pointers into Git-tracked content**, exactly like
Spec 003's `assignments.course_code`/`unit_no` — this feature does not duplicate course/unit
content into Postgres (Constitution Art. V.1). Total units per course is derived client-side from
`static/content-index.json`, never stored here (research.md R1).

### RLS policies

- `SELECT`: the owning student (`student_id = current_profile_id()`); admin (all rows, read-only
  support access). No teacher access — coverage is student-private (FR-001), not shared with a
  class's teacher in this feature.
- `INSERT`: **only** the owning student, and **only** with `method = 'self_marked'`:
  ```sql
  with check (student_id = current_profile_id() and method = 'self_marked')
  ```
  This is the single client-reachable write path (self-marking, FR-006). The two `assignment`/
  `quiz` rows are written exclusively by `SECURITY DEFINER` trigger functions (below), which bypass
  RLS entirely (table-owner execution context), so this policy never needs to accommodate them.
- No `UPDATE`/`DELETE` policy — a unit-progress row, once it exists, is never edited or removed by
  any actor; re-marking is idempotent via `ON CONFLICT DO NOTHING` at the application layer (the
  client issues `insert ... on conflict (student_id, course_code, unit_no) do nothing`), matching
  User Story 4 AS2 ("marks the same unit... more than once... counted only once").

### Triggers / sync functions

- `sync_unit_progress_from_grade()` — `AFTER INSERT ON grades` (Spec 003 table), `SECURITY
  DEFINER`. Resolves `NEW.submission_id → submissions → assignments`; if the assignment's
  `course_code`/`unit_no` are **not null** (i.e. `source_kind != 'custom'`), inserts `(student_id =
  submissions.student_id, course_code, unit_no, method='assignment', occurred_at=NEW.graded_at)
  ON CONFLICT (student_id, course_code, unit_no) DO NOTHING`. A `custom` assignment (no unit
  attached) contributes nothing to coverage — there is no unit for it to count toward.
- `sync_unit_progress_from_quiz()` — `AFTER INSERT ON quiz_attempts` (Spec 003 table), `SECURITY
  DEFINER`. Resolves `NEW.assignment_id → assignments` (a quiz assignment's `course_code`/
  `unit_no` are always non-null — `source_kind='quiz'` is never `'custom'`); inserts
  `(student_id=NEW.student_id, course_code, unit_no, method='quiz',
  occurred_at=NEW.attempted_at) ON CONFLICT ... DO NOTHING`. Every attempt (not just the
  best-scoring one) fires this — harmless, since the conflict target already de-duplicates by
  unit, not by attempt.

Both trigger functions must be `SECURITY DEFINER` because the inserting caller (a teacher, for
grades; the `submit_quiz_attempt()` RPC's own execution context, for quiz attempts) is not
necessarily `current_profile_id() = student_id` — the same "system writes on behalf of a different
user" shape Spec 003 already established for `join_class_by_code()`/`submit_quiz_attempt()`.

---

## Entity: `student_achievements`

Maps spec entity **Student Achievement**. The **Achievement (catalog)** entity itself is *not* a
table — the four fixed, bilingual milestone definitions are a static TypeScript constant,
`src/lib/achievements.ts` (research.md R4), never queried by SQL.

| Column | Type | Constraints | Maps to |
|---|---|---|---|
| `id` | `uuid` | PK, default `gen_random_uuid()` | — |
| `student_id` | `uuid` | NOT NULL, FK → `profiles(id)` | Key Entities |
| `achievement_key` | `text` | NOT NULL, CHECK IN `('first_submission', 'study_streak', 'full_course_coverage', 'on_time_class_completion')` | FR-008 |
| `earned_at` | `timestamptz` | NOT NULL, default `now()` | FR-008 |
| `context` | `jsonb` | nullable — e.g. `{"course_code": "EFMP-301"}` or `{"class_id": "..."}`, display-only, never read for authorization | SC-004 (display nicety only) |

```sql
unique (student_id, achievement_key)  -- SC-004: at most one per achievement per student, enforced at the DB layer
```

### RLS policies

- `SELECT`: the owning student (`student_id = current_profile_id()`); admin (read-only support).
- **No client `INSERT`/`UPDATE`/`DELETE` policy at all** — the only write path is the internal
  `grant_achievement(p_student_id, p_key, p_context)` helper (below), called exclusively from
  inside the trigger/RPC functions that detect each condition, never directly by a client. This
  mirrors Spec 003's `quiz_attempts` precedent ("no direct client write policy; only a
  `SECURITY DEFINER` path may insert").

### Grant helper and trigger functions

- `grant_achievement(p_student_id uuid, p_key text, p_context jsonb default null) returns void` —
  `SECURITY DEFINER`. `insert into student_achievements (student_id, achievement_key, context)
  values (p_student_id, p_key, p_context) on conflict (student_id, achievement_key) do nothing`.
  Every achievement-granting path below calls this instead of inserting directly, so the
  "exactly once" guarantee has one implementation, not four.
- `grant_first_submission_achievement()` — `AFTER INSERT ON submissions` (Spec 003 table).
  `SECURITY DEFINER`. If `(select count(*) from submissions where student_id = NEW.student_id) =
  1` (this row is the first), calls `grant_achievement(NEW.student_id, 'first_submission')`.
- `grant_study_streak_achievement()` — `AFTER INSERT ON unit_progress`, only fires for
  `NEW.method = 'self_marked'`. `SECURITY DEFINER`. Checks whether `today`, `today - 1`, and
  `today - 2` (calendar dates, PKT) each have at least one `unit_progress` row for
  `NEW.student_id` with `method = 'self_marked'` and `occurred_at::date` matching; if all three
  are present, calls `grant_achievement(NEW.student_id, 'study_streak')`. Grade/quiz-derived rows
  never trigger this function at all (the `WHEN` clause on the trigger definition filters them
  out), satisfying the "self-marking only" clarification.
- `grant_on_time_completion_achievement()` — `AFTER INSERT ON grades` (Spec 003 table).
  `SECURITY DEFINER`. Resolves the submission's assignment's `class_id` and `student_id`. Computes
  `published_count` (published assignments in that class) and `on_time_graded_count` (that
  student's graded submissions in that class where `submissions.late = false`); if
  `published_count >= 1 and on_time_graded_count = published_count`, calls
  `grant_achievement(student_id, 'on_time_class_completion', jsonb_build_object('class_id',
  class_id))`. `published_count >= 1` is what encodes the zero-assignment-class clarification — a
  class with no published assignments can never satisfy this trigger's condition at all, since
  `on_time_graded_count` would also be `0` and `0 = 0` is deliberately excluded by the `>= 1`
  guard.
- `check_full_coverage_achievement(p_course_code text, p_total_units integer) returns boolean` —
  callable RPC, `SECURITY DEFINER`, authenticated caller only. Recomputes `covered_count :=
  count(distinct unit_no) from unit_progress where student_id = current_profile_id() and
  course_code = p_course_code` **authoritatively, server-side** (never trusts the client for this
  half); accepts `p_total_units` from the caller (research.md R2 — the one place a Git-derived
  number must cross the client/server boundary, documented there as a deliberate, low-stakes
  exception). If `p_total_units > 0 and covered_count >= p_total_units`, calls
  `grant_achievement(current_profile_id(), 'full_course_coverage', jsonb_build_object(
  'course_code', p_course_code))` and returns `true` (newly/already granted); otherwise returns
  `false`. Called by the client from the Progress and Achievements pages after computing a
  course's fraction locally.

---

## Relationships

```
profiles (Spec 002)
   │ 1:N (student_id)                          │ 1:N (student_id)
   ▼                                            ▼
unit_progress                          student_achievements

unit_progress rows also populated (SECURITY DEFINER triggers, no direct FK) from:
  grades (Spec 003)         → sync_unit_progress_from_grade()   → method='assignment'
  quiz_attempts (Spec 003)  → sync_unit_progress_from_quiz()     → method='quiz'

student_achievements rows populated (SECURITY DEFINER, no direct FK) from:
  submissions (Spec 003)    → grant_first_submission_achievement()
  unit_progress (self-marked rows only) → grant_study_streak_achievement()
  grades (Spec 003)         → grant_on_time_completion_achievement()
  check_full_coverage_achievement() RPC → client-initiated, server-verified numerator
```

---

## Access-control matrix

Enforced at the database layer (Constitution Art. IX.2). Extends `tests/rls/`'s existing matrix.

| Actor | Own `unit_progress` | Other student's `unit_progress` | Own `student_achievements` | Other student's `student_achievements` |
|---|---|---|---|---|
| anonymous | denied | denied | denied | denied |
| student | read all own rows; insert own `self_marked` rows only | **denied** | read all own rows | **denied** |
| teacher (any) | denied — coverage is not shared with teachers in this feature | denied | denied | denied |
| admin | read all (support) | read all (support) | read all (support) | read all (support) |

Key negative assertions to test (mirrors Spec 002/003's SC-004/SC-005 pattern):
1. A student cannot `SELECT` another student's `unit_progress` or `student_achievements` rows —
   FR-001, SC-005.
2. A direct client `INSERT` on `unit_progress` with `method != 'self_marked'` is rejected — only
   the `SECURITY DEFINER` sync triggers may write `'assignment'`/`'quiz'` rows.
3. A direct client `INSERT`/`UPDATE` on `student_achievements` is rejected outright — only
   `grant_achievement()` (called from inside trigger/RPC functions) may write.
4. Marking the same unit studied twice produces exactly one `unit_progress` row (`ON CONFLICT DO
   NOTHING`) — User Story 4 AS2.
5. A unit already covered via a graded assignment, then also self-marked, still produces exactly
   one row — User Story 4 AS3 / User Story 3 AS3.
6. Triggering an achievement's condition twice (e.g., two separate classes both completed
   on-time) grants the achievement exactly once — `unique (student_id, achievement_key)`, SC-004.
7. `check_full_coverage_achievement()` recomputes its own numerator and ignores any client-side
   tampering with that half of the comparison — only `p_total_units` (the Git-derived half) is
   client-supplied, and a wrong value there only affects timing of one low-stakes badge, never
   another student's data or a graded outcome.
8. A class with zero published assignments never satisfies
   `grant_on_time_completion_achievement()`'s condition — `published_count >= 1` guard, per the
   2026-07-20 clarification.
9. A teacher cannot read a student's `unit_progress` or `student_achievements` rows through any
   query path — coverage/achievements are student-private in this feature (FR-001).

---

## Triggers & functions (new in this feature)

| Name | Timing | Purpose |
|---|---|---|
| `sync_unit_progress_from_grade()` | `AFTER INSERT ON grades` | Record unit coverage from a graded, unit-attached assignment. → FR-005, FR-006 |
| `sync_unit_progress_from_quiz()` | `AFTER INSERT ON quiz_attempts` | Record unit coverage from a quiz attempt. → FR-005, FR-006 |
| `grant_achievement(p_student_id, p_key, p_context)` | helper, `SECURITY DEFINER` | Single idempotent insert path for every achievement grant. → FR-008 |
| `grant_first_submission_achievement()` | `AFTER INSERT ON submissions` | Award "first submission" on a student's first-ever submission. → FR-008 |
| `grant_study_streak_achievement()` | `AFTER INSERT ON unit_progress` (self-marked rows only) | Award the study-streak badge at 3 consecutive self-marked calendar days. → FR-008 |
| `grant_on_time_completion_achievement()` | `AFTER INSERT ON grades` | Award "on-time completion of every assignment in a class." → FR-008 |
| `check_full_coverage_achievement(p_course_code, p_total_units)` | RPC, `SECURITY DEFINER` | Award "100% coverage in a course," verifying the numerator server-side. → FR-008, FR-009 |

Reused unmodified from Spec 002: `is_admin()`, `current_profile_id()`, `is_active_user()`.

---

## Read-only query shapes (no new schema — existing Spec 003 tables)

These back the dashboard's other five areas and involve no new tables, RLS policies, or triggers —
listed here so `/sp.tasks` can decompose them without re-deriving the joins from spec.md:

| Area | Source query shape |
|---|---|
| Home — current semester + classes (FR-002) | `enrollments (status='active') → classes (status='active')` — the class **list** includes every active class regardless of semester; the "current semester" **label** is `max(semester)` where `semester` comes from looking up each class's `course_code` in `content-index.json` (research.md R1), not from `classes.term_label` (a free-text display string, not a comparable ordinal). Resolved via `/sp.analyze` (2026-07-21) — a student can hold active classes across more than one semester at once (e.g., retaking one while progressing in another); the label picks the highest, the list is never filtered by it. |
| Home — due soon (FR-002, FR-003) | `assignments (published=true, class active, student enrolled)` minus `submissions` existing, ordered `due_at asc`, first-48h bucket first; each row carries `allow_late` and a computed overdue/closed state (open • overdue-but-late-allowed • closed) — required by FR-003's "state whether a late submission is still accepted or the window has closed" and the quiz-closed-not-overdue edge case. Both Home's preview and the full Assignments area consume this same shape. |
| Home — recent grades (FR-002) | `grades` joined to `submissions/assignments/classes`, `order by graded_at desc limit 5` |
| Assignments area (FR-003) | Same as due-soon, unfiltered by time window, full list |
| Grades area (FR-004) | `grades` joined to `submissions/assignments/classes` **and** `quiz_best_scores` (Spec 003 view) for quiz assignments, full list, no average computed or displayed |
| History area (FR-007) | `classes (status='archived')` grouped by `term_label`, joined to that student's `enrollments/submissions/grades/quiz_attempts` for those classes — frozen because archived classes are already read-only in Spec 003 |
| Progress area (FR-005) | `unit_progress` grouped by `course_code`, count vs. `content-index.json`-derived `total_units` (research.md R1) |
| Achievements area (FR-009) | Static catalog (`src/lib/achievements.ts`) joined client-side against `student_achievements` rows |

All of these are plain RLS-authorized `SELECT`s using the caller's own JWT — no new `SECURITY
DEFINER` RPC is needed for any of them, since Spec 003's existing RLS policies already scope every
row to the requesting student (or admin).
