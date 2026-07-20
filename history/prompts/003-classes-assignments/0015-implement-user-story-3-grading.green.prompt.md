---
id: 0015
title: Implement User Story 3 grading
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 003-classes-assignments
branch: 003-classes-assignments
user: channayousif@gmail.com
command: /sp.implement
labels: [grading, rls, migrations, e2e, bugfix]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - supabase/migrations/0012_classes.sql
  - supabase/migrations/0015_enrollments.sql
  - supabase/migrations/0017_assignments.sql
  - supabase/migrations/0020_grades.sql
  - src/lib/grading.ts
  - src/pages/app/classes/queue.tsx
  - src/pages/app/classes/assignment.tsx
  - tests/rls/grading-queue-missing.test.mjs
  - tests/rls/grade-max-mark.test.mjs
  - tests/rls/grade-edit-visibility.test.mjs
  - tests/rls/grade-isolation.test.mjs
  - tests/rls/grade-tombstone-anonymized.test.mjs
  - tests/rls/verified-teacher-gate.test.mjs (deleted — obsolete)
  - tests/e2e/grading-queue.spec.ts
  - tests/e2e/assignments-publish-submit.spec.ts
  - specs/003-classes-assignments/tasks.md
tests:
  - npm run test:rls (33 files passed, 1 skipped)
  - npx playwright test tests/e2e/classes-lifecycle.spec.ts tests/e2e/assignments-publish-submit.spec.ts tests/e2e/grading-queue.spec.ts (3 passed)
  - npx tsc --noEmit (clean)
---

## Prompt

continue with implimentation

## Response snapshot

Continued /sp.implement on branch 003-classes-assignments. Checklist (18/18) and
US1/US2 (T001-T036, T068-T070, T073, T075-T077) were already done; picked up at
Phase 5, User Story 3 (grading — T037-T045, T071).

Before writing new code, applied migrations 0011-0019 to the live self-hosted
Supabase instance (docker exec into supabase-db) to actually run the existing
US1/US2 RLS suite for the first time — it had never been executed against real
Postgres. This surfaced three pre-existing, previously-undetected bugs:

1. **0012_classes.sql forward-referenced `enrollments`** (created in 0015) in
   its SELECT policy — fails outright under strict-numeric-order migration
   apply. Fixed by splitting the enrolled-student branch into a second, OR'd
   policy (`classes_select_enrolled_student`) added in 0015 once `enrollments`
   exists.
2. **Circular RLS recursion (`42P17`) between `classes` and `enrollments`** —
   `classes`' policy queried `enrollments` and vice versa. Fixed with two new
   SECURITY DEFINER helpers (`is_actively_enrolled()`, `owns_class()`), the
   same pattern 0004_is_admin.sql already established for `profiles`.
3. **`assignments_update`'s RLS `USING` clause silently no-op'd** archived-class
   edit attempts (0 rows updated, no error) instead of raising — violates this
   project's own "the caller must learn the write failed" rule. Fixed by
   narrowing `USING` to ownership-only (so `enforce_active_class()`'s trigger
   actually fires and raises) while keeping the active-class check in `WITH CHECK`.

All 28 RLS test files passed cleanly after these fixes (verified via repeated
apply/test cycles against the live instance, with transactional migration
application to keep failures atomic).

Then implemented US3 test-first: wrote 5 new RLS tests (T037-T040, T071) against
the not-yet-existing `grades` table, confirmed they failed, wrote migration
0020_grades.sql (grades table, `enforce_max_mark()` trigger, RLS reusing
`owns_class()`), applied it, and all 5 passed on the first real run. Deleted
the now-permanently-broken `tests/rls/verified-teacher-gate.test.mjs` — its
target demo table was intentionally dropped by 0011 per T002's own documented
design ("superseded once Spec 003 lands"); its job is superseded by the future
`answer_keys`/`quiz_items` tests (US4/US6).

Implemented `src/lib/grading.ts` (fetchQueue composing enrollments+submissions+
grades, gradeAndReturn, editGrade, fetchGradeForSubmission), built
`src/pages/app/classes/queue.tsx` (teacher grading queue with max-mark
validation and FR-019 anonymized-name handling), and extended
`assignment.tsx` to show the student's own returned grade. Wrote and ran
`tests/e2e/grading-queue.spec.ts` (T041) — passed first try.

Running the full e2e suite alongside it caught a second latent bug: T028's
existing `assignments-publish-submit.spec.ts` used
`getByLabel(/^custom$/i).check()`, which hung 30s and timed out — root-caused
via a standalone Playwright diagnostic script to a leading-space text node in
the wrapping `<label>{' '}Custom</label>` JSX, which `getByLabel`'s regex
matching doesn't trim (unlike `getByRole`'s accessible-name algorithm, which
does). Fixed by switching that one line to `getByRole('radio', {name: /^custom$/i})`.
All three classes/assignments/grading e2e specs pass together afterward.

Updated `tasks.md` checkboxes for T037-T045 and T071. US1, US2, and US3 are
now all independently functional — the full core assign/submit/grade/return
loop works end-to-end, verified live, not just written.

## Outcome

- ✅ Impact: User Story 3 (grade submissions and return results) fully
  implemented and verified live: migration 0020_grades.sql, src/lib/grading.ts,
  queue.tsx, and the assignment.tsx extension. Additionally fixed 4 latent bugs
  in already-"done" US1/US2 work (migration ordering, RLS recursion, a
  silent-no-op RLS policy, and a broken E2E locator) that had never been
  caught because none of it had been run against a real Postgres/browser
  instance until this session.
- 🧪 Tests: tests/rls — 33 files / 74 tests passed, 1 skipped (was 22
  failing before the fixes). tests/e2e — classes-lifecycle,
  assignments-publish-submit, grading-queue all pass together. tsc --noEmit
  clean.
- 📁 Files: 1 new migration, 1 new lib module, 1 new page, 1 extended page, 5
  new RLS tests, 1 new E2E test, 3 migrations corrected in place (0012, 0015,
  0017), 1 obsolete test deleted, tasks.md checkboxes updated.
- 🔁 Next prompts: Phase 6 (US4 — answer-key gate, T046-T049), Phase 7 (US5 —
  gradebook export, T050-T052), Phase 8 (US6 — quiz, T053-T061), then Phase 9
  polish/bilingual/RTL/bundle-budget/quickstart validation (T062-T067, T072).
- 🧠 Reflection: this branch's RLS migrations and E2E tests had been authored
  and marked [X] complete across several prior sessions without ever being
  executed against a real database or browser — every one of the four bugs
  found here was a plausible-looking artifact that only broke on first actual
  execution. Actually applying migrations and running the full suite (not just
  writing it) is the only way these surface; worth doing at the end of every
  phase going forward, not deferred entirely to the Phase 9 quickstart step.

## Evaluation notes (flywheel)

- Failure modes observed: (1) forward-referenced table in a migration's RLS
  policy — fails only under strict apply order; (2) circular RLS recursion
  across two tables' policies — a cross-table version of the same-table
  recursion trap already documented for `profiles`; (3) RLS `USING` clause
  silently filtering rows on UPDATE instead of raising — a Postgres/PostgREST
  semantics gap between `USING` (silent filter) and `WITH CHECK`/triggers
  (raise); (4) `getByLabel` regex matching not trimming a label's leading
  whitespace text node, unlike `getByRole`'s accessible-name algorithm.
- Graders run and results (PASS/FAIL): npm run test:rls — PASS (33/34 files,
  1 skipped by design). npx playwright test (3 targeted specs) — PASS. npx tsc
  --noEmit — PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): apply and run each phase's
  migrations/tests against the live instance immediately after writing them,
  rather than batching verification to the end — would have caught all four
  bugs one phase earlier each.
