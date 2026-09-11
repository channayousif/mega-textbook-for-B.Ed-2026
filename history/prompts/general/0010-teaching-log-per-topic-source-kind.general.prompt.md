---
id: 0010
title: Teaching log offered source kinds the database refuses
stage: general
date: 2026-09-11
surface: agent
model: claude-opus-5
feature: none
branch: fix/teaching-log-per-topic-kinds
user: M Yousif Channa
command: none
labels: ["spec-005", "spec-008", "bug", "e2e", "content-index", "regression-guard"]
links:
  spec: specs/005-teacher-dashboard/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - src/lib/assignments.ts
 - src/pages/app/teacher/teaching-log.tsx
 - src/pages/app/classes/assignment-new.tsx
 - tests/unit/loggable-content-kinds.test.mjs
 - tests/e2e/teacher-teaching-log.spec.ts
 - tests/e2e/teacher-activity-feedback.spec.ts
 - tests/e2e/handout-print.spec.ts
tests:
 - npm run check:all (10/10 gates PASS, 202 unit tests)
 - tests/unit/loggable-content-kinds.test.mjs (4 new, mutation-verified)
 - tests/e2e/teacher-teaching-log.spec.ts (2 PASS against served build + real DB)
 - tests/e2e/handout-print.spec.ts (3 PASS on retargeted routes)
---

## Prompt

what next

ok, also check failed e2e

## Response snapshot

Surveyed open work: PR #33 (docs one-liner, CI pending) and PR #32
(EFMP-301 Unit 1 re-authored to v3.4, draft, `e2e` red 5/61 while `main` was
green).

Pulled the failing job log rather than trusting the hand-off note's
"blocked on G4/G5" framing. All five failures traced to one cause - the
v3.4 restructure removed EFMP-301 Unit 1's legacy
`activities`/`formative`/`summative` pages - but they split into two classes:

1. `handout-print.spec.ts` pinned three now-deleted routes (test-only).
2. `teacher-teaching-log` / `teacher-activity-feedback` exposed a **product
   bug already live on production**: `build-content-index.mjs` emits six
   `kind` values, `teaching_log_entries` (0028) and `activity_feedback`
   (0029) CHECK three, and `teaching-log.tsx` filtered the index by course
   code alone before auto-selecting the first record. EFMP-302 Unit 1 has
   been per-topic since Spec 012, so an EFMP-302 teacher's first save has
   been failing with the generic error banner ever since.

Initially proposed widening the CHECK constraints. Reading
`DocItem/Footer.tsx`'s `deriveSourceKindFromPath` (which deliberately
returns null for topic pages) and `assignment-new.tsx` (which already
filters to the three kinds) showed the schema was right and the call site
was wrong - so the fix is a filter, not a migration.

Extracted `LOGGABLE_CONTENT_KINDS` / `isLoggableContent` into
`src/lib/assignments.ts`, routed both pickers through it, added an explicit
empty state, and retargeted the five brittle specs off EFMP-301 Unit 1 onto
EFMP-302 Unit 2 so PR #32 stops being blocked by them.

## Outcome

- ✅ Impact: closes a live production defect in the Spec 005 teaching log and
  activity feedback for every per-topic course, and clears all five e2e
  failures blocking PR #32 without touching the database.
- 🧪 Tests: `check:all` 10/10 gates PASS (202 unit tests). New unit test
  mutation-verified - adding `'topic'` to the constant fails all four cases.
  E2E verified both ways against the served build and the real database:
  with the filter reverted the picker yields `"topic"` and the save fails;
  with it in place both specs pass.
- 📁 Files: 3 source, 4 test (1 new).
- 🔁 Next prompts: push and open the PR; rebase PR #32 onto it; then #32's
  real blockers (Content-gate pass, G-2026-06 decision, G4/G5 Urdu prose).
- 🧠 Reflection: the hand-off note recorded the e2e failure as an unexplained
  red check. Reading the job log first, instead of the note, is what turned a
  "fix the test" task into finding a live bug. The near-miss was proposing the
  migration before reading the sibling call site - the schema was the one
  thing in the system that was already correct.

## Evaluation notes (flywheel)

- Failure modes observed: Spec 008's per-topic migration widened the content
  index's `kind` vocabulary but updated only one of the two pickers that turn
  index records into a writable `source_kind`. No gate tied the index
  vocabulary to the SQL CHECK, so the divergence was invisible until a course
  the e2e suite exercised happened to migrate.
- Graders run and results (PASS/FAIL): `check:all` PASS; new unit test PASS
  and PASS-when-mutated-to-fail; targeted e2e PASS (and FAIL against the
  deliberately unfixed build, as intended).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): decide whether per-topic units
  should become loggable/ratable at all. Today the answer is no by omission,
  which means the teaching log and activity feedback quietly shrink toward
  zero coverage as content migrates to the v3.x standard. That is an ADR, not
  a patch.
