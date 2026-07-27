# Quickstart: Teacher Dashboard, Feedback & Book Improvement Loop

**Feature**: 005-teacher-dashboard | **Date**: 2026-07-24

Assumes Specs 002, 003, and 004 are already deployed (self-hosted Supabase per ADR-0006/ADR-0007;
at least one teacher with a class, assignments, submissions, grades, and quiz attempts exists for
test data). This feature adds no new infrastructure — only migrations, new static app pages under
`src/pages/app/teacher/` and `src/pages/app/admin/`, a swizzled-theme-component extension, and new
Teacher Guide content in the already-existing `guides` docs-plugin instance.

Every `docker compose ...` command below must run from the compose project directory
(`cd ~/supabase-project`), not this repo's root — same note as Specs 003/004's quickstarts.

---

## 1. Apply migrations

```bash
cd ~/supabase-project
cat /path/to/mega_book_for_B.Ed/supabase/migrations/0028_*.sql \
    /path/to/mega_book_for_B.Ed/supabase/migrations/0029_*.sql \
    /path/to/mega_book_for_B.Ed/supabase/migrations/0030_*.sql \
    /path/to/mega_book_for_B.Ed/supabase/migrations/0031_*.sql \
  | docker compose exec -T db psql -U postgres -d postgres
```

Order matters — apply strictly by file number (`0028` through `0031`, continuing directly after
Spec 004's `0027`):
- `0028_teaching_log_entries.sql` — `teaching_log_entries` table, RLS policies.
- `0029_activity_feedback.sql` — `activity_feedback` table, RLS policies (including the
  upsert-permitting `UPDATE` policy).
- `0030_improvement_suggestions.sql` — `suggestion_category`/`suggestion_status` enums,
  `improvement_suggestions` table, RLS policies.
- `0031_improvement_suggestions_transitions.sql` — `enforce_suggestion_status_transition()`
  trigger.

## 2. Content index — no rebuild needed

`static/content-index.json` (built by the existing `scripts/build-content-index.mjs`) already
contains everything FR-011's unit-coverage figure needs — reused via Spec 004's existing
`fetchTotalUnitsForCourse()` helper (`src/lib/unitProgress.ts`), unmodified. No change to the
build script, and no read of `unit_progress` itself (research.md R3).

## 3. Teacher Guide content (existing `guides` docs instance)

Confirm `guides/teacher-guide/` exists with at least an `index.mdx` plus the topics named in
Constitution Article X.1 (class/assignment/grading workflows, using the teacher dashboard, what
`verified_teacher` unlocks) in both `en` and `ur` locales. **No `docusaurus.config.ts` change is
needed** — the `guides` plugin instance, its sidebar, and its search indexing already exist from
Spec 004/ADR-0009. Verify with:

```bash
npm run build   # fails on broken links / missing translations if misconfigured
```

## 4. Verification checklist

- [ ] Sign in as a teacher with seeded classes/assignments/submissions/grades/quiz-attempts from
      Spec 003's fixtures; confirm the Overview (`/app/teacher/`) shows an accurate per-class
      ungraded count (not a combined total), the 5 soonest-due assignments across all classes
      ordered soonest-first, and a 10-item recent-activity feed merging submissions and quiz
      attempts.
- [ ] With a teacher who has no ungraded work and nothing due soon, confirm the Overview shows an
      explicit "caught up" state, not a blank region.
- [ ] From any unit content page, as a teacher, use "Suggest improvement"; confirm the filed
      suggestion (visible in `feedback-suggestions.tsx`'s "My Suggestions" list) carries the exact
      page slug, the nearest section heading anchor, and the page's current locale, with nothing
      the teacher had to type beyond category and body.
- [ ] Repeat from a course-overview page (no `unit_no` in its front matter); confirm the
      suggestion is accepted with `unit_no = null`, not rejected.
- [ ] As an admin, open the moderation queue (`/app/admin/suggestions`); filter by status, category,
      and course in turn; transition one suggestion `submitted → under_review → accepted →
      published` with a note at each step; confirm the filing teacher's "My Suggestions" view
      reflects each change without any refresh action.
- [ ] Attempt (via direct API call, not the UI) an illegal transition (e.g. `submitted → published`
      directly, or `rejected → under_review`); confirm it is rejected.
- [ ] Log one teaching activity end-to-end from `/app/teacher/teaching-log`, timed under 30 seconds
      by a stopwatch; confirm it appears most-recent-first with all fields intact.
- [ ] As a teacher, submit Activity Feedback for one activity from a teaching-log entry; then
      re-submit feedback for the same activity from the activity's own content page; confirm
      exactly one `activity_feedback` row exists, updated, not duplicated.
- [ ] As an admin, view aggregated feedback for that same activity (`/app/admin/feedback`); confirm
      the average rating and every recorded `what_didnt` note across all rating teachers appear.
- [ ] Seed a class with graded assignments across several students, including one meeting each
      at-risk criterion independently (≥2 missed deadlines; last 3 scores strictly declining); open
      Analytics (`/app/teacher/analytics?classId=…`); confirm the score distribution, per-student
      trend, and unit averages match a manual calculation, and only the qualifying students are
      flagged, each with a tooltip naming the specific reason.
- [ ] As the flagged student, view their own dashboard (`/app/dashboard/`, Spec 004); confirm no
      at-risk flag or label of any kind appears anywhere on their own view.
- [ ] Open a student drill-down (`/app/teacher/student?classId=…&studentId=…`); confirm submissions,
      grades, and a unit-coverage figure for that class appear together, computed without any read
      of `unit_progress`; confirm no data from any other class is present.
- [ ] As a signed-in student, attempt to reach `/app/teacher/`, `/app/admin/suggestions`, and the
      "Suggest improvement"/"Give feedback" controls; confirm access is denied in every case with no
      partial data ever visible before the denial.
- [ ] Switch locale to Urdu; confirm every area (including category names, statuses, and the
      at-risk explanation tooltip) and the Teacher Guide render correctly right-to-left with no
      untranslated fallback banners.
- [ ] Run the RLS suite (`npm run test:rls`) and confirm every negative assertion in
      `data-model.md`'s access-control matrix and `contracts/teacher-dashboard-operations.md`'s
      contract test checklist passes.

## Failure modes most likely to bite

1. **The `teaching_log_entries` `WITH CHECK` subquery is dropped or weakened.** Without the
   `exists (select 1 from classes c where c.id = class_id and c.teacher_id =
   current_profile_id())` clause, a teacher could log activity against a class they don't own.
   Symptom: a log entry appears to succeed for a foreign `class_id` with no error — check this
   first if a cross-teacher log entry is ever observed in testing.
2. **`enforce_suggestion_status_transition()` is attached to `AFTER UPDATE` instead of `BEFORE
   UPDATE`, or omits the column-restriction half.** An `AFTER` trigger cannot prevent the write it's
   reacting to; and without the column check, an admin's `UPDATE` could silently also change
   `body`/`category`/`teacher_id`. Symptom: illegal transitions or unrelated column edits succeed
   without error — verify with the contract test checklist's items 10–11 specifically, not just a
   happy-path moderation flow.
3. **FR-011's coverage query accidentally joins against `unit_progress`.** Since Spec 004's
   `unit_progress` RLS silently returns zero rows to a teacher (rather than erroring), a coverage
   query written against the wrong table would appear to "work" by always showing 0% coverage for
   every student — a symptom easy to misdiagnose as a data problem rather than a wrong-table bug.
   Verify the query shape matches data-model.md's "Read-only query shapes" table exactly
   (`submissions`/`quiz_attempts`, never `unit_progress`) before assuming coverage figures are
   simply "not populated yet."
4. **Teacher Guide content added to the wrong docs instance** (e.g., a new top-level `docs/`
   folder or a duplicate plugin entry instead of `guides/teacher-guide/` inside the existing
   `guides` instance). Verify with `npm run build` (fails loudly on a plugin-id collision, per
   Spec 004's own quickstart note) before assuming a missing sidebar entry is a routing bug.
