---
id: "0338"
title: "CI rls waits for build"
stage: general
date: 2026-10-18
surface: agent
model: claude-opus-5-5
feature: none
branch: ops/ci-rls-after-build
user: M Yousif Channa
command: yes (draft the ci.yml change as a PR)
labels: ["board-direct", "ci", "cost"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - .github/workflows/ci.yml
 - history/prompts/general/0338-ci-rls-waits-for-build.general.prompt.md
tests:
 - tests/unit/rls-fixture-isolation.test.mjs ci.yml assertions replayed with node (all pass)
---

## Prompt

i cancelled 2 workflows whose build already failed but they were running rls

yes

## Response snapshot

The owner cancelled CI runs whose `build` had failed while `rls` kept running (e.g. #162 run
39157968103). `rls` only needed `changes`, so it started beside `build` and kept holding the
shared-supabase queue after the run was already red. Changed `rls` to `needs: [changes, build]`,
matching `e2e`. #162's build failure itself is LaTeX `$$\bar{x}...$$` in gqur-301 unit-02/topic-03.mdx
(no remark-math on the site), which the crew's CI-fix job will handle.

## Outcome

- Impact: a failed build now skips rls; green runs take longer because rls starts after build.
- Tests: shared-database job assertions from rls-fixture-isolation.test.mjs replayed, all pass.
- Files: listed above.

## Handoff (for CEO and agents)

- Shipped: ci.yml rls depends on build (PR, owner merges; .github/ is owner-only).
- Decisions to respect: rls/e2e keep the shared-supabase queue:max group; main still runs everything.
- Pending: owner review and merge.
- Paperclip issues affected: none (Paperclip paused).
