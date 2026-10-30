---
id: 2437
title: CI e2e longer timeouts and leeway
stage: general
date: 2026-10-29
surface: agent
model: claude-opus-5-5
feature: none
branch: ci/e2e-timeout-leeway
user: M Yousif Channa
command: give the CI e2e tests longer timeouts and more leeway
labels: ["board-direct", "ci", "e2e", "crew"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - playwright.config.ts
 - tests/e2e/dashboard-performance.spec.ts
 - tests/e2e/teacher-dashboard-performance.spec.ts
 - history/prompts/general/2436-crew-status-and-failing-ci.general.prompt.md
 - history/prompts/general/2437-ci-e2e-timeout-leeway.general.prompt.md
tests:
 - tsc --noEmit on the three changed files (clean; unrelated pre-existing _cleanup.ts directive warning)
 - CI e2e on this PR
---

## Prompt

give the CI e2e tests longer timeouts and more leeway

## Response snapshot

CI-only changes (local runs unchanged): Playwright per-test timeout 30s -> 60s and expect timeout 5s -> 10s when `CI` is set; dashboard (SC-008, 2000ms) and teacher dashboard (SC-005, 5000ms) single-run perf budgets get 2x leeway in CI (4000ms / 10000ms). Retries stay at 2. Rationale: last 7 red e2e runs rotated across reviewer-and-jobs, admin-and-dashboard-a11y (30s timeouts) and perf budgets (2.0-3.6s), with no code cause; Supabase shares the loaded 2-CPU host.

## Outcome

- Impact: crew batch PRs should stop failing e2e on host latency alone.
- Tests: type-check clean; CI on the PR is the real check.
- Files: playwright config, two perf specs, two PHRs.
- Next prompts: if failures persist at 60s, the cause is not latency; investigate the spec.
- Reflection: leeway is CI-only so local runs still catch real regressions at the spec budget.

## Evaluation notes (flywheel)

- Failure modes observed: rotating latency timeouts in Supabase-backed e2e.
- Graders run and results (PASS/FAIL): pending CI
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): watch the next 5 crew batch runs.

## Handoff (for CEO and agents)

- Shipped: CI-only e2e leeway (60s test, 10s expect, 2x perf budgets).
- Decisions to respect: owner chose leeway over pausing crew during CI (2026-10-29). Do not tighten CI budgets back without owner approval; SC-008/SC-005 spec budgets themselves are unchanged and still apply locally.
- Pending: merge this PR; then rebase/re-run crew PR #367 and draft #369.
- Paperclip issues affected: none (Paperclip retired).
