---
id: 0173
title: CI content fast lane
stage: general
date: 2026-10-17
surface: agent
model: claude-opus-5-5
feature: none
branch: ci/content-only-fast-lane
user: M Yousif Channa
command: none
labels: ["board-direct", "ci", "github-actions", "crew"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .github/workflows/ci.yml
tests:
 - YAML parse; job graph checked (changes, build, rls, e2e; lock only on rls and e2e)
 - classifier run against PRs #174, #168 (content-only), #183, #186, #161 (full suite)
 - npm run check:docs-sync PASS (every gate still named in ci.yml)
---

## Prompt

yes, prepare the content-only CI PR, think about self hosted runner for github actions, is it worth? (https://docs.github.com/actions/hosting-your-own-runners/about-self-hosted-runners)

## Response snapshot

The `shared-supabase` lock moves from the workflow to the two jobs that use the database, `rls` (now its own job) and `e2e`. `build` (all gates, unit tests, two-locale build, Lighthouse) runs unlocked and in parallel. A new `changes` job marks a PR content-only when every changed file is under docs/, licence/, guides/, history/, specs/, an i18n docs mirror or static/img/figures/. Such a PR skips `rls` and `e2e`. Every main push still runs everything, so the deploy gate is unchanged. `e2e` downloads `build`'s output instead of rebuilding inside the lock.

Self-hosted runner: not worth it. The repo is public, so GitHub-hosted minutes are free. GitHub says self-hosted runners "should almost never be used for public repositories" because a PR can persistently compromise the machine. The only host is the production server, which froze twice under concurrent builds. And the bottleneck was the deliberate database lock, not runner capacity.

## Outcome

- Impact: crew content PRs verify in about 12 min in parallel instead of queueing ~7 h; main stays fully gated.
- Tests: listed above.
- Files: 1.
- Next prompts: owner reviews and merges (protected path).
- Reflection: the lock protected one resource but was placed on the whole workflow.

## Handoff (for CEO and agents)

- Shipped / changed: ci.yml job graph (pending owner merge).
- Decisions the team must respect: content-only PRs are verified by the gates and build only; RLS and e2e run on every main push. Keep the Supabase lock on `rls` and `e2e` with `queue: max`.
- Pending / next owner: owner merges the PR.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: CI throughput far below the crew's PR rate.
- Graders run and results (PASS/FAIL): classifier PASS, docs-sync PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): measure queue time per crew PR for a day after the merge.
