---
id: 0007
title: Implement reviewer capability
stage: green
date: 2026-09-13
surface: agent
model: claude-opus-5
feature: 017-reviewer-role
branch: 017-reviewer-role
user: M Yousif Channa
command: /sp.implement 017-reviewer-role
labels: ["impl-017", "reviewer", "rls", "migrations", "docs-gate", "adr-0015"]
links:
  spec: specs/017-reviewer-role/spec.md
  ticket: null
  adr: history/adr/0015-download-and-commit.md
  pr: null
tests:
 - npm run check:all - 14/14 PASS
 - vitest offline suite - 257 passed (27 new in tests/unit/reviewQueue.test.mjs, 3 new in content-status-report)
 - tests/rls/reviewer-capability.test.mjs - written, NOT RUN (needs 0043/0044 applied to the database)
files:
 - supabase/migrations/0043_reviewer_audit_change_enum.sql (new)
 - supabase/migrations/0044_reviewer_capability.sql (new)
 - supabase/functions/admin-list-users/index.ts (reviewer column)
 - src/contexts/AuthContext.tsx, src/pages/app/admin/users.tsx, src/pages/app/admin/audit.tsx
 - src/components/ReviewerGuard.tsx (new), src/pages/app/admin/review-queue.tsx (new)
 - src/lib/reviewQueue.ts (new), src/lib/contentStatus.ts
 - scripts/lib/review-criteria.mjs (new), scripts/lib/tracker-rows.mjs (new)
 - scripts/lib/review-evidence.mjs, scripts/check-pipeline-gate.mjs, scripts/report-content-status.mjs
 - guides/teacher-guide/review-and-certify.mdx + its Urdu mirror (new)
 - specs/reviewers/human-reviewers.md (new), specs/backlog.md
 - tests/rls/reviewer-capability.test.mjs (new), tests/unit/reviewQueue.test.mjs (new), tests/unit/content-status-report.test.mjs
---

## Prompt

ok, go on

## Response snapshot

38 of 41 tasks. All 14 gates green, 257 offline tests passing, the site builds.

**The load-bearing bit is 0044's two `create or replace` blocks.** `guard_privileged_columns` and
`write_privilege_audit` both enumerate protected columns **by name**, so `profiles.reviewer` would
have been self-grantable and unaudited without them. The migration carries that reasoning in a
comment at the point where a future column-adder will read it.

**The enum value is alone in 0043** because Postgres forbids using a new enum value in the
transaction that added it, and 0044's audit function writes `'reviewer'`.

**Two extractions the tasks called for, both of which removed a second definition rather than
adding one.** `scripts/lib/review-criteria.mjs` now holds `CRITERIA` and `COMMANDS`, so the browser
certify form and the agent evidence validator cannot drift. `scripts/lib/tracker-rows.mjs` holds the
tracker parser that `check-pipeline-gate.mjs` had privately, so `report-content-status.mjs` derives
per-unit G3/G5 state from the same definition of a row. That derivation is what lets the review
queue exist with **no database table**: the queue is built from `static/content-status.json` in the
browser, and Postgres learns nothing about a gate outcome.

**`stageState` treats a ticked-but-unattributed row as open**, which is stricter than it looks: an
unsigned tick is not evidence that anyone reviewed anything. A revision row re-opens a done gate,
because the last row for a stage wins.

**The G5 binding is enforced in two of its three places.** `buildReviewQueue` offers G3 only while
G3 is open, and `buildCertification` throws on a G5 whose `g3_report` is missing or names the wrong
unit or stage. The third is the reviewer's own commit.

**FR-009 is a test, not a promise.** `tests/unit/reviewQueue.test.mjs` reads `reviewQueue.ts` and
asserts its only value import is the rubric module: no Supabase client, no `node:fs`. The page
downloads two files and writes nothing.

**Three tasks cannot complete locally.** T036 (grant the capability in production), T041 (the
quickstart walk) and the RLS half of T040 all need 0043/0044 applied to the live Supabase, which is
a production schema change and the owner's call.

## Outcome

- ✅ Impact: the capability, the surface, the export, the governance record and the Docs gate all exist; 38/41 tasks.
- 🧪 Tests: check:all 14/14; 257 offline tests; 5 RLS tests written but unrun pending migration.
- 📁 Files: 2 migrations, 3 new src modules, 2 new script libs, 2 guide pages, 1 governance record, 2 new test files.
- 🔁 Next prompts: apply 0043/0044 to production (with a backup), then run the RLS suite and walk the quickstart.
- 🧠 Reflection: the two extractions were the most valuable part. Both replaced a private copy with a shared definition, so the feature's new consumers could not introduce drift that nothing would have detected.

## Evaluation notes (flywheel)

- Failure modes observed: an existing unit test asserted the whole status record with `toEqual`, so a new field broke it - the right fix was to widen it and add three tracker-derivation cases, not to loosen the assertion.
- Graders run and results (PASS/FAIL): check:all PASS 14/14; vitest PASS 257; tsc PASS; build PASS (pre-existing /ur/licence broken-link warnings unchanged at 236).
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): when a migration adds a column, grep every trigger that enumerates columns by name before assuming the column is protected.
