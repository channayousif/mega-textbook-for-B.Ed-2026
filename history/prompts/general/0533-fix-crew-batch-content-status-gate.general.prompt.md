---
id: "0533"
title: "Fix crew batch content-status gate"
stage: general
date: 2026-10-19
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/crew-batch-content-status
user: M Yousif Channa
command: yes open the PR and port to dava
labels: ["board-direct", "crew", "gates", "fix"]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/281
files:
 - scripts/crew/crew.mjs
 - history/prompts/general/0531-crew-disk-unblock-and-delete-paperclip.general.prompt.md
 - history/prompts/general/0532-check-main-content-gates-crew-batch-bug.general.prompt.md
 - history/prompts/general/0533-fix-crew-batch-content-status-gate.general.prompt.md
tests:
 - fresh sparse worktree of origin/main f88db171, npm run check:content - check:content-status FAIL (reproduced)
 - same worktree after node scripts/report-content-status.mjs - all 13 gates PASS
 - node --check scripts/crew/crew.mjs
---

## Prompt

yes open the PR and port to dava

## Response snapshot

`gateFindings(cwd)` in scripts/crew/crew.mjs now runs `node scripts/report-content-status.mjs` in `cwd`
before `npm run -s check:content`, the same order ci.yml uses. Without it, a fresh batch or job worktree has
no `static/content-status.json` (gitignored), `check:content-status` fails there but not in ROOT, and every
job is kept out of the hourly batch and sent round a merge-fix loop that can never commit the cure.

Dava port: the davinciartstore crew (ssh davinci, ~/crew-system at 28d0875) has no batch step and no
content-status file. Its gate `checkFindings` runs storefront astro check, unit tests and lint, with no
gitignored generated input that ROOT has and a job worktree lacks. No port needed and none made.

PHRs 0144/0145 from the main checkout were renumbered to 0531/0532 because those IDs were taken on main.

## Outcome

- Impact: crew batch stops rejecting clean branches over a missing generated file.
- Tests: reproduced the failure and its fix on a fresh worktree (see tests above).
- Files: scripts/crew/crew.mjs (+3 lines) and three PHRs.

## Handoff (for CEO and agents)

- Shipped: PR fixing the crew batch gate. scripts/ is PROTECTED, so the crew will not auto-merge it; the
  owner merges.
- Decisions to respect: the queued -conflictN merge-fix jobs were victims of this bug; once it merges the
  next batch should take the ready jobs without them.
- Pending: owner merges the PR; then requeue efmp-305-u01-repair_en (gate_red) and let the next tick batch.
- Paperclip issues affected: none.
