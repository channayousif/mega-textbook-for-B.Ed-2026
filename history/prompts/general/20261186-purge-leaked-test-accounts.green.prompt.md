---
id: 20261186
title: Purge leaked test accounts and tidy the admin user list
stage: green
date: 2026-11-09
surface: agent
model: claude-opus-5-5
feature: general
branch: fix/purge-test-accounts
user: M Yousif Channa
command: none
labels: [board-direct, security, supabase, tests, ops]
links:
  spec: specs/002-authentication/data-model.md
  ticket: null
  adr: null
  pr: null
files:
  - scripts/ops/purge-test-accounts.mjs
  - tests/test-account-sweep.mjs
  - tests/e2e/global-sweep.ts
  - tests/rls/_global-sweep.mjs
  - tests/e2e/_password.ts
  - tests/rls/_password.mjs
  - tests/profile-dependents.mjs
  - tests/unit/profile-dependents.test.mjs
  - tests/unit/purge-test-accounts.test.mjs
  - tests/e2e/teacher-dashboard-performance.spec.ts
  - tests/e2e/*.spec.ts (password constant, 38 files)
  - tests/rls/_helpers.mjs
  - tests/rls/deletion-reregistration.test.mjs
  - playwright.config.ts
  - vitest.rls.config.ts
  - supabase/functions/admin-list-users/index.ts
  - src/pages/app/admin/users.tsx
tests:
  - tests/unit/purge-test-accounts.test.mjs (7 pass)
  - tests/unit/profile-dependents.test.mjs (6 pass)
---

## Prompt

1. on page https://textbook.com.pk/app/admin/users/ the list of users also includes test-users and deleted users, in implies that tests are keep adding those test accounts each time which will explode after sometime (also a security threat), investigate and fix by either immediately deleting the test accounts or creating few reusable test accounts for testing purpose. tidyup the users and filter out the deleted user rows from the displayed table of users on the page. i see some accounts with "-", check

## Response snapshot

Investigated production read-only first. There were 1,309 `@example.test` logins against 16 real ones. 68 of them were active admins, and all used the password `Test-Passw0rd!`, committed to a public repo. 288 stranded profiles (no login, not tombstoned) were the "-" rows. There were 2,421 tombstones. The leak was still running: teacher-dashboard-performance's `finally` deleted 31 users one at a time and outran its 120 s timeout (526 students leaked). Other specs leak whenever a test dies before its cleanup.

Owner chose: keep a fresh user per test with a guaranteed sweep and random passwords; purge only unreferenced tombstones. Implemented a purge script, suite-level sweeps for e2e and RLS, a nightly cron, per-run random passwords, a batched perf-spec cleanup, and an admin list that hides tombstones and stranded rows. Backed up the affected tables, then purged production: 1,303 logins and 3,118 profiles removed. Left: 16 real logins, 0 stranded rows, and 884 tombstones that other rows still reference (FR-021).

## Outcome

- ✅ Impact: production auth holds only the 16 real accounts. The public password no longer opens anything. /app/admin/users lists only live accounts. Future leaks are capped at one run (suite hooks) and swept nightly.
- 🧪 Tests: focused unit tests pass. The new PROFILE_REFERENCES check matches every profiles FK in the migrations. The live function, called as qa-admin, returned 0 deleted and 0 email-less rows.
- 📁 Files: see list; 53 files changed, mostly the password constant swap.
- 🔁 Next prompts: watch the first CI run with the global hooks; check ~/logs/purge-test-accounts.log after 04:30.
- 🧠 Reflection: per-spec cleanup in `finally` is not a guarantee, because a Playwright timeout abandons it. Only a suite-level sweep bounds the leak.

## Handoff (for CEO and agents)

- Shipped / changed:
  - `scripts/ops/purge-test-accounts.mjs` (dry run by default). It runs in Playwright globalSetup/globalTeardown and RLS globalSetup with a 60 min cutoff, and from host cron daily at 04:30 out of `~/deploy/mega_book`, logging to `~/logs/purge-test-accounts.log`.
  - Test passwords are random per process (`tests/e2e/_password.ts`, `tests/rls/_password.mjs`).
  - The admin-list-users edge function is already deployed to the self-hosted volume.
  - Production purge done 2026-11-09. The backup is at `~/backups/pre-test-account-purge-20261109.sql.gz`.
- Decisions the team must respect:
  - Fixture emails must end in `@example.test`, which is the sweep's only selector, and no real account may ever use that domain.
  - Never hardcode a fixture password.
  - A tombstone still referenced by any profiles FK is kept (FR-021). A new FK to profiles must be added to `PROFILE_REFERENCES` (the unit test enforces it).
- Pending / next owner: owner merges the PR. The users.tsx change reaches the site through the normal deploy after merge.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: Cloudflare returns 502 on PostgREST `in.(...)` filters of 100 uuids (URL length), so batch at 50.
- Graders run and results (PASS/FAIL): unit tests PASS; check-no-service-key PASS; SQL cross-check of the unreferenced tombstone count (1542 = 1542) PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): add a CI step that fails when any `@example.test` user older than 2 h exists, to surface leaks loudly.
