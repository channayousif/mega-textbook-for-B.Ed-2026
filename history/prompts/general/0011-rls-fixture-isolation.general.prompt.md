---
id: 0011
title: RLS fixtures could not clean up after themselves
stage: general
date: 2026-09-11
surface: agent
model: claude-opus-5
feature: none
branch: fix/rls-fixture-isolation
user: M Yousif Channa
command: none
labels: ["spec-003", "spec-005", "tests", "rls", "ci", "incident", "data-hygiene"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - tests/rls/_classFixtures.mjs
 - tests/rls/*.test.mjs (27 files, 57 hardcoded join codes removed)
 - tests/unit/rls-fixture-isolation.test.mjs
 - .github/workflows/ci.yml
tests:
 - npm run test:rls (67/68 files, 170 passed, 1 skipped, 0 failed)
 - npx vitest run (206 unit tests passing, incl. 4 new guard cases)
 - Leak measurement: old code leaked 2 rows/run, fixed code leaked 0
---

## Prompt

fix the RLS fixtures too

## Response snapshot

Followed on from the PR #34 work, where merging two PRs five seconds apart put
three CI runs on one shared Supabase and took `main` red.

The initial diagnosis - "hardcoded join codes collide" - was only half right,
and the first mechanism I proposed for it (`Date.now()`-derived codes) was
simply wrong: `randomJoinCode()` uses `Math.random()` over a 32-character
alphabet, so chance collision is implausible. Corrected that before acting on
it.

Querying the stranded rows directly settled it. **Every** leftover class had
exactly one `teaching_log_entries` row and nothing else.
`teaching_log_entries.class_id` (0028) has no `on delete cascade` - by design,
since a log entry is immutable with no DELETE policy - so `cleanupClasses`'s
bare `delete from classes` raised a foreign-key violation that
`Promise.allSettled` discarded silently. Two stranded rows per CI run, since
the project began: 182 in total, essentially the entire `classes` table.

The hardcoded codes were the second defect and only mattered in combination:
once `PUB001`/`UPS001` could never be deleted, they poisoned every later run.

Three fixes: cleanup deletes non-cascading dependents and throws rather than
swallowing; 57 hardcoded codes across 27 files removed; CI serialized on one
concurrency group. Left the production FK untouched - test teardown should not
reshape production semantics.

## Outcome

- ✅ Impact: the RLS suite is safe to run concurrently and no longer strands
  rows in the shared database. `main` recovered to green after the hand purge.
- 🧪 Tests: 67/68 RLS files, 170 passed / 1 skipped / 0 failed. 206 unit tests.
  Proven as a natural experiment on the same database minutes apart - the
  `main` CI run on old code leaked 2 rows, the full suite on the fixed code
  leaked 0.
- 📁 Files: 1 helper, 27 test files, 1 new guard test, 1 workflow.
- 🔁 Next prompts: merge; decide whether to purge the 182 pre-existing litter
  rows; then back to PR #32.
- 🧠 Reflection: two wrong turns worth recording. I proposed a schema migration
  before reading the sibling call site that already had the right answer, and I
  asserted a collision mechanism (`Date.now()`) without reading the generator.
  Both were caught by checking the actual source rather than reasoning forward
  from a plausible story. The decisive evidence in the end was not in the code
  at all - it was one query against the stranded rows showing every one of them
  held exactly one teaching-log entry.

## Evaluation notes (flywheel)

- Failure modes observed: cleanup that fails silently (`Promise.allSettled`
  with no error inspection) hid a 100%-reproducible leak for the life of the
  project. Shared mutable test state with no concurrency guard in CI. Fixture
  identifiers hardcoded into a UNIQUE column.
- Graders run and results (PASS/FAIL): `test:rls` PASS (was 4 files failing);
  unit suite PASS; new guard PASS and fails-when-mutated.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): the 182 stranded classes are still
  present - the fix stops new ones but does not retroactively remove them. Also
  worth asking whether the RLS/e2e suites should run against a disposable
  branch database rather than the production project at all; that is the real
  structural answer and is ADR-sized.
