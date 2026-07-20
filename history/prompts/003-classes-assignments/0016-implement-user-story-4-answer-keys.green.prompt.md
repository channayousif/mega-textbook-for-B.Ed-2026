---
id: 0016
title: Implement User Story 4 answer keys
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 003-classes-assignments
branch: 003-classes-assignments
user: channayousif@gmail.com
command: /sp.implement
labels: [answer-keys, rls, migrations, verified-teacher]
links:
  spec: specs/003-classes-assignments/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - supabase/migrations/0021_answer_keys.sql
  - src/lib/answerKeys.ts
  - src/pages/app/classes/queue.tsx
  - tests/rls/answer-key-gate.test.mjs
  - specs/003-classes-assignments/tasks.md
tests:
  - npm run test:rls (34 files passed, 1 skipped)
  - npx tsc --noEmit (clean)
  - manual Playwright diagnostic script — answer-key panel absent for an unverified teacher, present and reveals content for a verified one (live run, cleaned up afterward)
---

## Prompt

continue with US4

## Response snapshot

Implemented Phase 6, User Story 4 (consult the official answer key while
grading) — the last of the P1/P2 grading-adjacent stories, test-first per
this branch's established discipline:

1. Read data-model.md's `answer_keys` entity and contracts/classes-operations.md
   §F, and Spec 002's `is_verified_teacher()` (0010_verified_teacher_gate.sql,
   built specifically ahead of this table per its own header comment).
2. Wrote `tests/rls/answer-key-gate.test.mjs` (T046) against the not-yet-existing
   table, confirmed it failed (`Cannot read properties of null`).
3. Wrote `supabase/migrations/0021_answer_keys.sql` (T047): `answer_keys` table,
   unique on `(course_code, unit_no, kind)`, RLS SELECT-only gated on
   `is_verified_teacher() OR is_admin()`, no client write policy at all
   (content is curriculum-authority-managed, same rationale as `quiz_items`).
   Applied it directly to the live self-hosted instance; both tests
   (verified-reads-1-row/unverified-and-student-get-0, and
   verified-teacher-cannot-write) passed on the first real run.
4. Implemented `src/lib/answerKeys.ts` (T048): `fetchAnswerKey(courseCode,
   unitNo, kind)`, a thin RLS-backed lookup.
5. Extended `src/pages/app/classes/queue.tsx` (T049) with an `AnswerKeyPanel`
   component: rendered only when `useAuth().verifiedTeacher` is true (absent,
   not just hidden, otherwise); only for `source_kind` `formative`/`summative`
   assignments with a `course_code`/`unit_no`; lazy-fetches on an explicit
   "Show answer key / rubric" reveal click rather than on page load.
6. Given this session had already found multiple real bugs in code that
   "looked right" but had never been executed, did a live sanity check beyond
   the RLS layer: started the dev server, ran a standalone Playwright script
   toggling a real teacher's `verified_teacher` flag between false/true and
   confirming the reveal button's presence/absence and the rubric content's
   visibility after reveal — both behaved exactly as designed. Cleaned up the
   diagnostic script and the dev server process afterward.

Updated `tasks.md` checkboxes for T046-T049. All of Phase 6 (US4) is done —
Phase 6's own checkpoint ("verified teachers can consult answer keys while
grading; unverified teachers and students categorically cannot, by any path")
is verified both at the RLS layer and the UI layer.

## Outcome

- ✅ Impact: User Story 4 (answer-key gate) fully implemented and verified
  live at both the RLS and UI layers. US1-US4 (all P1/P2 stories through the
  grading loop plus the answer-key add-on) are now complete.
- 🧪 Tests: tests/rls — 34 files / 76 tests passed, 1 skipped (up from 33/34).
  tsc --noEmit clean. Manual live UI verification (not a committed test —
  no E2E task was specified for US4 in tasks.md; RLS coverage was the
  deliverable per Constitution Art. VII, and this was an extra confidence
  check given this session's track record).
- 📁 Files: 1 new migration, 1 new lib module, 1 extended page (queue.tsx), 1
  new RLS test, tasks.md checkboxes updated.
- 🔁 Next prompts: Phase 7 (US5 — gradebook export, T050-T052), Phase 8 (US6 —
  quiz, T053-T061), then Phase 9 polish (T062-T067, T072).
- 🧠 Reflection: unlike US1-US3, this story's migration and RLS design were
  correct on the very first live run — no forward-reference, recursion, or
  silent-no-op bugs this time. Consistent with the fact that `answer_keys` is
  a simple, standalone, SELECT-only table with no cross-table policy
  dependencies (the exact shape that caused every prior bug this session).
  The pattern holding is a useful signal: cross-table RLS references are
  where the real risk concentrates, not table design in isolation.

## Evaluation notes (flywheel)

- Failure modes observed: none this story — first clean first-try migration
  of the session, consistent with its simpler (no cross-table RLS reference)
  shape.
- Graders run and results (PASS/FAIL): npm run test:rls — PASS (34/35 files,
  1 skipped by design). npx tsc --noEmit — PASS. Manual live diagnostic —
  PASS (both verified/unverified branches behaved as designed).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): continue applying each phase's
  migrations to the live instance and running its tests immediately after
  writing them, as already adopted from the US3 lesson — it held up cleanly
  here.
