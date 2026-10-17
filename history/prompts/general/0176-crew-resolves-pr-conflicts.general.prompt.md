---
id: 0176
title: Crew resolves PR conflicts
stage: general
date: 2026-10-17
surface: agent
model: claude-opus-5-5
feature: none
branch: crew/resolve-conflicts
user: M Yousif Channa
command: none
labels: ["board-direct", "crew", "ci", "git"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - scripts/crew/crew.mjs
 - ops/crew/README.md
tests:
 - node --check; git merge-tree on the 5 salvage branches (conflicts only in glossary.json, specs/decisions/log.md, specs/gaps.md, terminology.csv)
---

## Prompt

merge #187 and re-trigger the content PRs

## Response snapshot

While re-triggering CI, five salvage PRs (#161, #162, #164, #165, #167) turned out to conflict with main. GitHub runs no PR CI on a conflicting PR, and `managePrs` simply skipped them, so they would never merge. All of them append to the same registries, so each salvage that merges conflicts the rest.

The crew now queues a `-conflictN` fix job for a CONFLICTING PR. The job merges origin/main, keeps both sides of the append-only registries, renumbers clashing IDs this branch added, never alters main's entries, and passes `check:content`. Up to 5 per PR. CI-fix jobs are now counted separately (up to 2).

## Outcome

- Impact: salvage PRs keep flowing as their siblings merge.
- Tests: as above.
- Files: 2.
- Next prompts: none.
- Reflection: a "skip and wait" branch in a loop that nothing else unblocks is a stall.

## Handoff (for CEO and agents)

- Shipped / changed: conflict-merge jobs in the crew.
- Decisions the team must respect: shared registries are append-only; on a clash, the branch's new entry is renumbered, never main's.
- Pending / next owner: the crew resolves the 5 salvage conflicts on its next ticks.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: conflicting PRs silently parked.
- Graders run and results (PASS/FAIL): syntax PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): watch the first conflict job's diff for ID renumbering.
