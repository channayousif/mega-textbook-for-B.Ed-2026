---
id: "0527"
title: "Crew hourly batch PRs"
stage: general
date: 2026-10-19
surface: agent
model: claude-opus-5-5
feature: none
branch: ops/crew-hourly-batch
user: M Yousif Channa
command: batch the crew's merges, one PR per hour
labels: ["board-direct", "crew", "ci", "deploy"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - scripts/crew/batch.mjs
 - scripts/crew/crew.mjs
 - scripts/crew/state.mjs
 - tests/crew/batch.test.mjs
 - ops/crew/README.md
 - history/prompts/general/0527-crew-hourly-batch-prs.general.prompt.md
tests:
 - node --test tests/crew/*.test.mjs (14 pass)
 - crew.mjs tick --dry-run against a copy of the crew state (would batch the injected ready job; real board unchanged)
 - npm run check:docs-sync
---

## Prompt

batch the crew's merges to fix deploys, ask crew to make one pr per hour to manage huge number of small prs batch enough  works togather for pr

## Response snapshot

A finished crew job no longer opens its own PR: it is pushed and marked `ready`. At most once an hour,
and only when no batch PR is open, the tick merges every ready job onto main's head in a fresh
crew/batch-<UTC> worktree, runs check:content on the combined branch and opens one PR (jobs become
`batched`); green CI auto-merges it and marks every member merged. A job that conflicts or fails the
gate only in combination is left out and gets a merge fix on its own branch. Jobs touching protected
paths keep their own PR. CI and conflict fixes on a batch use a batch scope in the brief. Also made
tick --dry-run truly dry (reap and merged/closed PR handling only report).

## Outcome

- Impact: at most about one push to main per hour from the crew, so a CI run can finish on main's
  head and deploy-prod.sh can deploy.
- Tests: listed above.
- Files: listed above.
- Reflection: stacked on #201 (same file); merge #201 first.

## Handoff (for CEO and agents)

- Shipped: hourly batch PRs (CREW_BATCH_EVERY_MIN, default 60).
- Decisions to respect: one crew PR per hour (owner, 2026-10-19); protected-path jobs still get their own PR.
- Pending: owner merges #201 then this PR (scripts/ is protected). A batch red after two CI fixes
  stops batching until the lead acts.
- Paperclip issues affected: none.
