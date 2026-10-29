---
id: 2438
title: Reviewer picker row cap and crew stall
stage: general
date: 2026-10-29
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/reviewer-account-picker-cap
user: M Yousif Channa
command: crew: batch 2026-10-28 17:15Z, 2 jobs (GPKS-402) #367 / crew status
labels: ["board-direct", "crew", "ci", "e2e", "admin", "bug"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - src/pages/app/admin/reviewers.tsx
 - tests/e2e/reviewer-and-jobs.spec.ts
 - history/prompts/general/2438-reviewer-picker-row-cap-and-crew-stall.general.prompt.md
tests:
 - tsc --noEmit -p . (clean for both files)
 - CI e2e on this PR
---

## Prompt

crew: batch 2026-10-28 17:15Z, 2 jobs (GPKS-402) #367

crew status

## Response snapshot

#367 could not auto-update (conflict in specs/content/gpks-402/tasks.md); merged origin/main into crew/batch-20261028-1715 by hand (kept #367's Unit 2 G4 row, took main's newer Unit 4 G2 gates path), 12/13 content gates pass (content-status.json is build-generated), pushed 42ca5a76. CI then failed only reviewer-and-jobs, all 3 attempts at the new 60s limit.

Root cause (not latency): production Supabase holds 1,528 live profiles (1,512 unnamed, mostly leaked e2e users). /app/admin/reviewers loaded profiles in one unpaged query ordered by full_name; PostgREST max_rows is 1000 and nulls sort last, so any new account never reaches the Account picker and the test's selectOption waits out the timeout. Real admin bug too. The test's finally block closed contexts before deleting users, so every timeout leaked three more users, making it worse each run.

Fix: page the profiles query with the existing fetchAllPages helper (stable order full_name, id); in the spec, delete users before closing contexts and tolerate close() errors.

Crew stall: batch-20261028-1715 is gate_red, and batchDue() blocks all new batches while a batch job is gate_red; crew no longer watches #367, so it will not auto-merge even when green.

## Outcome

- Impact: admin Account picker shows all accounts; reviewer-and-jobs stops failing and stops leaking users.
- Tests: tsc clean; CI pending.
- Files: reviewers.tsx, reviewer-and-jobs.spec.ts, this PHR.
- Next prompts: merge this PR, re-merge main into #367, merge #367 and update crew board; owner decision on purging ~1,500 leaked @example.test accounts from production.
- Reflection: retries plus a cleanup in `finally` that can throw turns one flake into a growing data leak.

## Evaluation notes (flywheel)

- Failure modes observed: unpaged admin-wide query hit PostgREST max_rows (same class as the Spec 010 pagination fix).
- Graders run and results (PASS/FAIL): pending CI
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): grep other admin pages for unpaged profiles queries.

## Handoff (for CEO and agents)

- Shipped: paged reviewer Account picker; leak-proof cleanup in reviewer-and-jobs e2e.
- Decisions to respect: admin-wide reads go through fetchAllPages (src/lib/pagination.ts).
- Pending: owner to approve purge of leaked e2e accounts in production Supabase; crew board entry for batch-20261028-1715 needs reset or manual merge (owner choice).
- Paperclip issues affected: none (Paperclip retired).
