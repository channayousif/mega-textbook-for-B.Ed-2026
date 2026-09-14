---
id: 0019
title: Anti rot for profile dependents
stage: general
date: 2026-09-14
surface: agent
model: claude-opus-5
feature: none
branch: chore/profile-dependents-anti-rot
user: M Yousif Channa
command: look for the solution to avoid rot of the list in future
labels: ["test-hygiene", "fixture-leak", "mutation-testing", "foreign-keys"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
tests:
 - npm run check:all - 14/14 PASS
 - tests/unit/profile-dependents.test.mjs - 5 passed, both failure modes mutation-verified
 - RLS 175 passed / 0 leaked; e2e 65 passed / 0 leaked after the refactor
files:
 - tests/profile-dependents.mjs (new, the single list)
 - tests/unit/profile-dependents.test.mjs (new, the completeness check)
 - tests/rls/_helpers.mjs, tests/e2e/_cleanup.ts (both now import it)
---

## Prompt

look for the solution to avoid rot of the list in future, author  EFMP-301 Unit 1 ur

## Response snapshot

**The list is now derived-checkable rather than trusted.** `tests/profile-dependents.mjs` holds it
once; `tests/unit/profile-dependents.test.mjs` reads `supabase/migrations/*.sql`, extracts every
foreign key to `profiles(id)` with its delete rule, and fails when a NO ACTION key has no entry.

Three choices worth naming:

**A unit test, not an RLS test.** It parses SQL rather than querying `pg_constraint`, so it needs no
database and runs in `npm test` and `check:all` on every push - not only where credentials happen to
exist. The thing it guards against is a schema change, and schema changes arrive as migration files.

**It fails on a stale entry too**, not only a missing one, so a dropped or renamed table cannot
leave a ghost behind.

**It asserts it found something.** A parser that silently matches nothing would pass forever, which
is the same shape as the bug it exists to prevent: `expect(keys.length).toBeGreaterThanOrEqual(18)`,
plus a check that no migration declares a profiles FK via `ALTER TABLE`, the form this parser does
not read. Better to fail loudly on an unparsed form than to skip it.

**Mutation-verified rather than assumed.** Added a throwaway migration with an unlisted NO ACTION
key: the test failed naming `mutation_probe.student_id (9999_mutation_probe.sql)`. Added a bogus
list entry: it failed naming `dropped_table.student_id`. A passing test is not evidence that a test
can fail, and I have spent this session on two harnesses that passed while asserting nothing.

**EFMP-301 Unit 1's Urdu was already authored** - all 7 files, 13,935 Urdu words against 11,221
English, G4 signed off 2026-09-11. What is open is G5 review, not authoring, and that is a
certification I must not make. Reported rather than acted on.

## Outcome

- ✅ Impact: the 16-table list can no longer rot silently; both teardown paths read one definition.
- 🧪 Tests: check:all 14/14; 5 new tests, both failure modes mutation-verified; RLS and e2e still leak zero.
- 📁 Files: 2 new test files, 2 helpers repointed.
- 🔁 Next prompts: decide what "author EFMP-301 Unit 1 ur" should mean, given the Urdu exists.
- 🧠 Reflection: the guard is worth more than the fix it guards. The fix was correct on 2026-09-14 and would have been wrong on the day someone added the nineteenth table, with no signal until the orphan count looked implausible again.

## Evaluation notes (flywheel)

- Failure modes observed: my own restore step used `git checkout` on an untracked file and silently failed, leaving a mutation in place - caught only because the next run still showed a failure.
- Graders run and results (PASS/FAIL): completeness test PASS 5/5; mutation 1 (unlisted FK) correctly FAILED; mutation 2 (stale entry) correctly FAILED; restored state PASS; check:all PASS 14/14; leak measurement PASS (0 from both suites).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): apply the same shape to the CONTENT_GATES / FULL_GATES lists in scripts/lib/gates.mjs, which are the same kind of hand-maintained inventory.
