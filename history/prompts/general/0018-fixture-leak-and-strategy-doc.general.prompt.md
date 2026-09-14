---
id: 0018
title: Fixture leak and strategy doc
stage: general
date: 2026-09-14
surface: agent
model: claude-opus-5
feature: none
branch: chore/fixture-leak-and-strategy-doc
user: M Yousif Channa
command: Two things still open, help me decide.
labels: ["test-hygiene", "fixture-leak", "review-evidence", "bound-inputs", "production-data"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
tests:
 - npm run check:all - 14/14 PASS
 - RLS suite 175 passed, leaked 0 profiles (was ~104 per run mid-fix, far more before)
 - e2e suite 65 passed, leaked 0 profiles
 - review:evidence prepare EFMP-301 1 G5 - 129 inputs, brand strategy not among them
files:
 - tests/rls/_helpers.mjs (cleanupUsers rewritten)
 - tests/e2e/_cleanup.ts (new), 35 e2e specs (75 call sites)
 - scripts/ops/purge-orphan-profiles.sql (new, one-off remediation)
 - specs/business/README.md + textbook-com-pk-brand-strategy.pdf (moved out of the bound root)
---

## Prompt

Two things still open, help me decide.

## Response snapshot

**The PDF was in the wrong directory, and the blocked pipeline was the symptom.**
`Scheme-and-Course-guides/` is a bound review input - it supplies 31 of the 129 digests in an
EFMP-301 Unit 1 G5 manifest - so committing a brand strategy there would bind every future
certification to a business document no content review depends on, and every edit to it would
invalidate outstanding evidence. Gitignoring would have unblocked `prepare` while leaving a real
document unversioned. Moved to `specs/business/`, which is not a bound root, with a README saying
why. Verified after: 129 inputs, brand strategy absent.

**The orphan numbers were worse and differently shaped than first reported.** 29,381 orphans
against 227 live profiles - 99.2% junk. All had `auth_user_id IS NULL` rather than a dangling id,
so they could never authenticate: `is_admin()` matches on `auth_user_id = uid` and NULL matches
nothing. Pollution, not an open door.

**The fix took three attempts, and the first two looked correct.**

1. `cleanupUsers`'s own comment claimed deleting an auth user "cascades to their profiles". The FK
   is `ON DELETE SET NULL`. One wrong word, 29,381 rows.
2. Resolving profile ids before deleting the auth row, then deleting the profiles, still leaked 104
   per suite run. I checked four tables for dependent rows, found none, and was wrong: almost every
   table referencing `profiles(id)` is NO ACTION, and one `unit_progress` row aborts the whole
   statement. The error was being discarded, so it looked like success.
3. Deleting dependents first, from an explicit 16-table list, with the surviving error logged
   rather than swallowed. RLS suite 0 leaked, e2e suite 0 leaked.

`ON DELETE CASCADE` would have been the shorter fix and the wrong one: FR-021 deliberately
anonymizes a deleted account rather than destroying the teacher gradebooks referencing it.

Purged 29,381 rows after a 68M dump, dependents first, via a committed one-off script rather than a
migration. Admin count went from 4,605 to 6. The owner's reviewer grant and audit row 6936 survived
intact, as predicted.

## Outcome

- ✅ Impact: the review pipeline is unblocked, and the leak that regrew 25,796 purged rows in three days is closed at source.
- 🧪 Tests: check:all 14/14; RLS 175 and e2e 65 both passing and both leaking zero.
- 📁 Files: 2 test helpers, 35 e2e specs, 1 ops script, 1 relocated document.
- 🔁 Next prompts: open the PR and merge on green.
- 🧠 Reflection: I asserted "referenced by NOTHING" from a four-table check and moved on. The claim was false and the measurement that disproved it took thirty seconds. Checking four of eighteen tables and reporting the result as if it were exhaustive is the actual error, not the missing tables.

## Evaluation notes (flywheel)

- Failure modes observed: a code comment stating the opposite of the schema's behaviour, trusted for months; my own partial query reported as a complete one; a discarded error making a broken delete look successful; a measurement contaminated by my own concurrent test runs, caught only because the row count was implausible.
- Graders run and results (PASS/FAIL): check:all PASS 14/14; leak measurement PASS (0 from both suites, quiesced baseline); purge verification PASS (0 orphans, 228 live, 244 tombstones, grant intact); prepare PASS (129 inputs, PDF unbound).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): when a cleanup helper must know about a set of tables, assert the set is complete - query the FK catalog in a test and fail if a table references profiles(id) and is missing from DEPENDENTS.
