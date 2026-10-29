---
id: 2436
title: Crew status and failing CI check
stage: general
date: 2026-10-29
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: M Yousif Channa
command: crew status, check failing CI
labels: ["board-direct", "crew", "ci", "e2e", "ops"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/2436-crew-status-and-failing-ci.general.prompt.md
tests:
 - none run locally (read-only CI log inspection; one GitHub Actions failed-job rerun)
---

## Prompt

crew status, check failing CI

## Response snapshot

Crew board (06:56Z): 0 running, 1 queued, 2 ready, 2 batched, 4 red, 1 blocked, 527 merged. Focus GPKS-402 (4 crew jobs left). Owner: `gpks-402-u04-translate` held (release with `crew retry gpks-402-u04-translate`); 83 units await G3 sign-off. Lead: gnas-301-u06-review_en, gqur-300-u05-review_en, gpks-402-u03-author could not join a batch after 5 merge fixes. agy_claude cooling to 2026-11-04 (429 quota).

Failing CI: main is green (c8608a8b). Two open PRs red, both e2e only: #367 (crew batch 2026-10-28 17:15Z) and #369 (draft sourced map). Across the last 7 red runs the failing test rotates between reviewer-and-jobs, admin-and-dashboard-a11y (30 s test timeouts) and dashboard/teacher performance budgets (2.0-3.6 s vs 2 s budget). No content or code-caused failure; same Supabase/server-load latency pattern as before. Re-ran failed jobs of run 40791185434 (#367).

## Outcome

- Impact: status reported; #367 e2e rerun queued.
- Tests: none locally.
- Files: this PHR only.
- Next prompts: decide CI e2e timeout policy (longer timeouts/budgets vs pausing crew during CI); release gpks-402-u04-translate after #369 decision.
- Reflection: e2e flakes block crew merges repeatedly; a policy decision is overdue.

## Evaluation notes (flywheel)

- Failure modes observed: e2e latency flake rotates across tests, so retries are a lottery.
- Graders run and results (PASS/FAIL): n/a
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): raise e2e per-test timeout and perf budget tolerance in CI only.

## Handoff (for CEO and agents)

- Shipped: nothing; read-only status plus one CI rerun on #367.
- Decisions to respect: none new.
- Pending: owner choice on CI e2e timeout policy; #369 owner map sign-off; 83 G3 sign-offs; three crew jobs stuck after 5 merge fixes (lead).
- Paperclip issues affected: none (Paperclip retired).
