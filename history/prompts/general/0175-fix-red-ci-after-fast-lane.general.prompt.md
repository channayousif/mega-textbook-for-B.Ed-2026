---
id: 0175
title: Fix red CI after fast lane
stage: general
date: 2026-10-17
surface: agent
model: claude-opus-5-5
feature: none
branch: crew/latest-check-per-name
user: M Yousif Channa
command: none
labels: ["board-direct", "ci", "crew", "incident"]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/189
files:
 - tests/unit/rls-fixture-isolation.test.mjs (PR #189)
 - scripts/crew/crew.mjs
tests:
 - npm test 307/307 with the new lock test; mutation (lock removed from rls) fails it
 - latestChecks() on PR #174's real rollup drops the stale build FAILURE
---

## Prompt

merge #187 and re-trigger the content PRs

## Response snapshot

#187 broke every PR's unit tests: `rls-fixture-isolation` required a top-level `concurrency:` line, and I had not run `npm test` before opening it. I fixed it as follows:

- Paused the crew so it would not dispatch fix jobs for a fake failure.
- Rewrote the test to assert the lock per job (#189): every job running `test:rls` or `test:e2e` holds `shared-supabase`, with `queue: max` and no `cancel-in-progress`, and main pushes always run them. Verified 307/307 locally plus a mutation check, then merged.
- Re-triggered all open PRs again under the tick lock, cancelling only runs that had not started.
- Found that GitHub keeps the old run's check runs in a PR's rollup for the same head SHA, so the crew would keep reading the stale FAILURE. `managePrs` now keeps only the latest result per workflow and check name (`latestChecks`).

## Outcome

- Impact: PR CI green again under the fast lane; the crew judges re-runs correctly.
- Tests: listed above.
- Files: the test (#189) and crew.mjs (this PR).
- Next prompts: none.
- Reflection: run the full unit suite before changing a workflow; tests read workflow files.

## Handoff (for CEO and agents)

- Shipped / changed: per-job lock test; latest-check dedupe in the crew.
- Decisions the team must respect: any `.github/workflows` change runs `npm test` first.
- Pending / next owner: none.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: a workflow refactor broke a test that asserts workflow text; stale check runs after re-runs.
- Graders run and results (PASS/FAIL): unit suite PASS, mutation PASS, dedupe PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none.
