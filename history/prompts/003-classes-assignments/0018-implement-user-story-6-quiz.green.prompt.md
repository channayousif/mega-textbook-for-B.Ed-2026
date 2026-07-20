---
id: 0018
title: Implement User Story 6 quiz
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 003-classes-assignments
branch: 003-classes-assignments
user: channayousif@gmail.com
command: /sp.implement
labels: [quiz, auto-grading, rls, security-invoker, migrations, e2e]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - supabase/migrations/0022_quiz_items.sql
  - supabase/migrations/0023_quiz_attempts.sql
  - src/lib/quiz.ts
  - src/lib/gradebookExport.ts (column-name bug fix: score -> best_score)
  - src/pages/app/classes/quiz.tsx
  - src/pages/app/classes/assignment-new.tsx
  - src/pages/app/classes/assignments.tsx
  - tests/rls/quiz-item-gate.test.mjs
  - tests/rls/quiz-attempt-scoring.test.mjs
  - tests/rls/quiz-retake-best-score.test.mjs
  - tests/rls/quiz-no-stakes-restriction.test.mjs
  - tests/e2e/quiz-retake.spec.ts
  - specs/003-classes-assignments/tasks.md
tests:
  - npm run test:rls (38 files passed, 1 skipped)
  - npx playwright test (5 specs together: classes-lifecycle, assignments-publish-submit, grading-queue, gradebook-export, quiz-retake — all pass)
  - npx tsc --noEmit (clean)
---

## Prompt

continue with US6

## Response snapshot

Implemented Phase 8, User Story 6 (auto-graded practice quiz) — the last
user story (P3), test-first, live-verified throughout:

1. Read data-model.md's `quiz_items`/`quiz_attempts` entities, research.md R2
   (submit_quiz_attempt as a SECURITY DEFINER RPC, join_class_by_code's
   established pattern) and R7 (quiz_best_scores as a plain uncached MAX()
   aggregate view — no premature caching at 200-student scale).
2. Wrote 4 RLS tests first (T053-T055, T074): quiz-item-gate,
   quiz-attempt-scoring, quiz-retake-best-score, quiz-no-stakes-restriction.
   T074 passed immediately (no schema change needed — the existing
   `assignments` table already had no max_mark ceiling by source_kind); the
   other three failed as expected against the not-yet-existing tables.
3. Wrote `supabase/migrations/0022_quiz_items.sql` and `0023_quiz_attempts.sql`.
   The two views in this story needed OPPOSITE `security_invoker` settings,
   and getting this backwards would be a real security bug, not a style
   choice: `quiz_items_public` must EXPOSE every row to every authenticated
   user regardless of `verified_teacher` (questions aren't confidential, only
   `correct_option` is) — relies on the view owner's `rolbypassrls` (verified
   directly: `select rolbypassrls from pg_roles where rolname = current_user`
   → true on this instance), so left at the Postgres default
   (`security_invoker = false`). `quiz_best_scores` must instead RESPECT
   `quiz_attempts`' RLS per row before aggregating (a student sees only their
   own best score, a teacher only their class's) — explicitly set
   `security_invoker = true`, the opposite choice. Documented both choices
   inline with an explicit cross-reference to this session's earlier
   `assignments_update` USING/WITH CHECK mixup, flagging the pattern for
   future edits. Applied both migrations; all 4 RLS tests passed on the
   first real run.
4. Implemented `src/lib/quiz.ts` (T059): `fetchQuizItemsForUnit` (ordered by
   `created_at` — a real ordering-determinism fix caught while writing the
   E2E test, not just test hygiene, since every other list function in this
   codebase already specifies explicit order), `submitAttempt`, `fetchOwnAttempts`,
   `fetchOwnBestScore`, `fetchClassBestScores` (composes two RLS-scoped
   queries client-side, same pattern as grading.ts's `fetchQueue`), and
   `fetchQuizUnitsForCourse` (for the assignment-new picker).
5. Fixed a real bug in US5's `gradebookExport.ts`, caught before it ever
   shipped: it queried `quiz_best_scores.score`, but the actual column (now
   that the view exists) is `best_score` — would have silently returned
   `undefined` for every quiz score in an exported gradebook. Fixed and
   updated the now-stale "doesn't exist until US6 ships" comments.
6. Built `quiz.tsx` (T060): student take/retake UI (radio-button questions,
   instant score + correct-count on submit, retake resets the form,
   best-score summary), teacher best-score results table.
7. Extended `assignment-new.tsx` (T061) with a third "Quiz" source mode: a
   unit picker populated from `fetchQuizUnitsForCourse` (distinct units with
   quiz items for the class's course), auto-filled title, and hid the
   "Allow late submissions" checkbox for quiz mode since `submit_quiz_attempt`
   has no late-allowed variant (a hard due-date cutoff always) — leaving it
   visible would have been misleading.
8. Found and fixed a real navigation gap while wiring this up: `assignments.tsx`
   unconditionally linked every assignment to `assignment.tsx`/`queue.tsx`,
   which don't apply to quiz-sourced assignments (no `submissions` row exists
   for a quiz — it's scored via `quiz_attempts`). Added a `detailHref()`
   helper routing quiz assignments to `quiz.tsx` instead, for both teacher
   and student rows. Also fixed the student list's status computation, which
   called `fetchOwnSubmission` unconditionally — for a quiz assignment this
   would always show "missing"/"not yet submitted" even after completion,
   since quizzes never produce a `submissions` row; switched to
   `fetchOwnBestScore` for quiz-sourced rows, mapped to the existing
   `computeStudentStatus`'s `graded` branch.
9. Wrote `tests/e2e/quiz-retake.spec.ts` (T056) — used `getByRole` for every
   radio interaction (never `getByLabel` with an anchored regex), directly
   applying this session's earlier `assignments-publish-submit.spec.ts`
   lesson about a wrapping `<label>{' '}Text</label>`'s untrimmed leading
   space. Passed on the first real run once the `created_at` ordering fix
   (step 4) was in place — without it, the test's `.first()`/`.nth(1)` radio
   selection would have been nondeterministic.
10. Ran the full RLS suite (38/39, 1 skipped) and all 5 classes-domain E2E
    specs together — all pass, no regressions. `tsc --noEmit` clean.

Updated `tasks.md` checkboxes for T053-T061, T074. **All six user stories
(US1-US6) are now complete** — every P1/P2/P3 story in this feature is
implemented and live-verified. Only Phase 9 (Polish & Cross-Cutting
Concerns) remains.

## Outcome

- ✅ Impact: User Story 6 (auto-graded quiz) fully implemented and verified
  live. This completes all six user stories in Spec 003 — the entire
  classes/assignments/grading/quiz/answer-key/gradebook feature set.
- 🧪 Tests: tests/rls — 38 files / 82 tests passed, 1 skipped (up from 34/35).
  tests/e2e — 5 specs pass together (quiz-retake new, plus the 4 existing
  classes/assignments/grading/gradebook specs). tsc --noEmit clean.
- 📁 Files: 2 new migrations, 1 new lib module, 1 new page, 2 extended pages
  (assignment-new.tsx, assignments.tsx), 4 new RLS tests, 1 new E2E test, 1
  bug fix in an already-shipped file (gradebookExport.ts's column name),
  tasks.md checkboxes updated.
- 🔁 Next prompts: Phase 9 polish — T062 (bilingual EN/UR copy pass across
  every new page, currently all-English by design/deferral), T063 (RTL
  layout verification), T064 (bundle-budget check — exceljs and the new
  route chunk excluded from content pages), T065 (full npm run test:rls +
  test:e2e regression, already continuously verified this session but worth
  one final combined run), T066 (quickstart.md live validation), T067
  (backlog logging of deferred follow-ups), T072 (200-student performance
  check against the <5s p95 target).
- 🧠 Reflection: this story required getting `security_invoker` backwards-
  correct across two views with opposite needs in the same migration file —
  exactly the kind of subtle RLS detail this session's earlier bugs
  (recursion, silent no-op, forward reference) warned should get extra
  scrutiny. Verifying `rolbypassrls` empirically before relying on it (rather
  than assuming default Postgres/Supabase behavior) was the right level of
  paranoia, and both migrations passed clean on the first live run as a
  result — a good sign the "verify claims against the live instance, don't
  assume" discipline adopted since US3 is holding.

## Evaluation notes (flywheel)

- Failure modes observed: none in the migrations/RLS layer this story (first
  try, both views correct) — but two real application-layer bugs were caught
  before they shipped: (1) a stale/wrong column name in gradebookExport.ts
  written speculatively in US5 before this table existed, (2) a missing
  explicit ORDER BY in a new list function, caught only because the E2E test
  needed deterministic ordering to make correct assertions — a reminder that
  writing the E2E test is itself a bug-finding step, not just a coverage
  checkbox.
- Graders run and results (PASS/FAIL): npm run test:rls — PASS (38/39 files,
  1 skipped by design). npx playwright test (5 specs) — PASS. npx tsc
  --noEmit — PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when starting Phase 9, re-run
  the full E2E suite (not just the classes-domain subset) to confirm no
  cross-feature regression from this session's changes touched Spec
  001/002's existing specs (navigation, search, auth, RTL, print).
