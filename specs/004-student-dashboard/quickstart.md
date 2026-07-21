# Quickstart: Student Dashboard

**Feature**: 004-student-dashboard | **Date**: 2026-07-20

Assumes Specs 002 and 003 are already deployed (self-hosted Supabase per ADR-0006/ADR-0007; at
least one class with an assignment/quiz/submission/grade exists for test data). This feature adds
no new infrastructure — only migrations, a second Docusaurus docs-plugin instance, and static app
pages/theme swizzle.

Every `docker compose ...` command below must run from the compose project directory
(`cd ~/supabase-project`), not this repo's root — same note as Spec 003's quickstart.

---

## 1. Apply migrations

```bash
cd ~/supabase-project
cat /path/to/mega_book_for_B.Ed/supabase/migrations/0024_*.sql \
    /path/to/mega_book_for_B.Ed/supabase/migrations/0025_*.sql \
    /path/to/mega_book_for_B.Ed/supabase/migrations/0026_*.sql \
    /path/to/mega_book_for_B.Ed/supabase/migrations/0027_*.sql \
  | docker compose exec -T db psql -U postgres -d postgres
```

Order matters — apply strictly by file number (`0024` through `0027`, continuing directly after
Spec 003's `0023`):
- `0024_unit_progress.sql` — `unit_progress_method` enum, `unit_progress` table, RLS policies.
- `0025_unit_progress_sync_triggers.sql` — `sync_unit_progress_from_grade()`,
  `sync_unit_progress_from_quiz()` (both `SECURITY DEFINER`), attached to Spec 003's existing
  `grades`/`quiz_attempts` tables.
- `0026_student_achievements.sql` — `student_achievements` table, RLS policies (no client write
  policy), `grant_achievement()` helper.
- `0027_achievement_triggers.sql` — `grant_first_submission_achievement()`,
  `grant_study_streak_achievement()`, `grant_on_time_completion_achievement()` (attached to
  `submissions`/`unit_progress`/`grades`), and the `check_full_coverage_achievement(text, int)`
  RPC.

## 2. Content index — no rebuild needed

`static/content-index.json` (built by the existing `scripts/build-content-index.mjs`, run
automatically via `prestart`/`prebuild`) already contains everything this feature needs —
`total_units` per course is derived client-side by counting distinct `unit_no` values in that
file (research.md R1). No change to the build script.

## 3. Second Docusaurus docs instance (Student Guide)

Confirm `docusaurus.config.ts`'s `plugins` array includes the new `guides` instance
(`routeBasePath: '/guides'`, content dir `guides/`) and that `guides/student-guide/` exists with
at least an `index.mdx` plus the topics Article X.1 names (navigate the platform, join a class,
submit work, read grades, use the dashboard) in both `en` and `ur` locales. Verify with:

```bash
npm run build   # fails on broken links / missing translations if misconfigured
```

## 4. Verification checklist

- [ ] Sign in as a student with seeded enrollments/assignments/grades from Spec 003's fixtures;
      confirm the dashboard home (`/app/dashboard/`) shows current semester, classes, due-soon
      items (48h-first ordering), and up to 5 recent grades above the fold on a 360px viewport.
- [ ] Mark a unit studied from its content page (any of the five unit files); confirm it appears
      in Progress (`/app/dashboard/progress`) without a page reload race.
- [ ] Mark the same unit studied again; confirm no duplicate row (`select count(*) from
      unit_progress where student_id=… and course_code=… and unit_no=…` returns `1`).
- [ ] Grade a unit-linked submission as a teacher; confirm a `unit_progress` row with
      `method='assignment'` appears for that student without any client action.
- [ ] Submit a practice quiz attempt as a student; confirm a `unit_progress` row with
      `method='quiz'` appears.
- [ ] Submit a student's first-ever assignment; confirm `first_submission` appears in
      `student_achievements` and on `/app/dashboard/achievements`.
- [ ] Self-mark units on 3 consecutive calendar days; confirm `study_streak` is granted once, not
      once per day.
- [ ] Complete every published assignment in a class on time (no lates); confirm
      `on_time_class_completion` is granted; confirm a class with zero published assignments
      never grants it.
- [ ] Reach 100% coverage in one course; confirm the Progress page's client-side check triggers
      `check_full_coverage_achievement` and the badge appears without a manual refresh.
- [ ] As a signed-in teacher, navigate to `/app/dashboard/`; confirm the student-only notice with
      a pointer to teacher tools appears — never another student's data, never a blank/error page.
- [ ] Switch locale to Urdu; confirm every dashboard area and the Student Guide render correctly
      right-to-left with no untranslated fallback banners.
- [ ] Run the RLS suite (`npm run test:rls`) and confirm every negative assertion in
      `data-model.md`'s access-control matrix and `contracts/dashboard-operations.md`'s test
      checklist passes.

## Failure modes most likely to bite

1. **Forgetting `SECURITY DEFINER` on the sync/grant trigger functions.** Without it, a teacher's
   `grades` insert (or the `submit_quiz_attempt()` RPC's internal `quiz_attempts` insert) would
   silently fail to write the corresponding `unit_progress`/`student_achievements` row — RLS would
   reject the cross-user insert with 0 rows affected and no visible client-side error, since the
   student never sees the teacher's transaction. Symptom: coverage/achievements never update after
   grading, but self-marking (a same-user insert) works fine — a strong signal to check this first.
2. **`check_full_coverage_achievement` never being called.** Since this one achievement is
   client-initiated (research.md R2), forgetting to wire the call into the Progress/Achievements
   page's render path after computing a 100% fraction means the badge simply never appears, with
   no error anywhere — this is a UI wiring bug, not a database bug, so check the client call site
   before the trigger logic.
3. **Docs-plugin id collision or sidebar bleed.** If the new `guides` docs instance is misconfigured
   (e.g., missing a distinct `id`), Docusaurus's classic preset silently merges it with the
   curriculum docs instance rooted at `/`, corrupting both the semester sidebar and the guide's own
   navigation. Verify with `npm run build` (fails loudly on a plugin-id collision) before assuming
   the guide "just isn't showing up" is a routing issue.
