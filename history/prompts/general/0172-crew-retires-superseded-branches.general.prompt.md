---
id: 0172
title: Crew retires superseded branches
stage: general
date: 2026-10-17
surface: agent
model: claude-opus-5-5
feature: none
branch: crew/retire-superseded-branches
user: M Yousif Channa
command: none
labels: ["board-direct", "crew", "git", "branches"]
links:
  spec: null
  ticket: null
  adr: history/adr/0030-crew-replaces-paperclip-control-plane.md
  pr: null
files:
 - scripts/crew/crew.mjs
 - ops/crew/README.md
tests:
 - crew.mjs retire --dry-run on a copy of the live state (lists agent/TEX-39 plus four already-deleted branches for efmp-305; nothing for open salvage PRs)
---

## Prompt

we have more than 100 brances, some of them are safe to delete

yes, have the crew delete them after salvage merges

## Response snapshot

- Deleted 63 remote branches whose work is provably on main, out of 109: 58 with no commits main lacks, and 5 squash-merged branches whose patches `git cherry` matched.
- Kept every branch with an open PR or with work that exists nowhere else.
- Added a `retire` tick phase (and a `crew.mjs retire [--dry-run]` command). Once a salvage job is merged, it deletes the head branches of its `supersedes` PRs and its `base`, skipping any branch an open PR still uses. It runs once per job (`retired`) and posts a 🧹 event.

## Outcome

- Impact: the 8 Paperclip salvage-source branches disappear automatically as their salvage PRs land; remote branches went from 109 to 46.
- Tests: dry run above.
- Files: 2.
- Next prompts: owner decides the 16 closed or stacked branches with unique work (licence headings, TEX-8 mock test, TEX-24/26/29/33, review/system-surface, TEX-61, TEX-33-done-3, TEX-48-tracker, tex-37).
- Reflection: "merged PR" is not "work on main" when PRs were stacked; check by patch, not by PR state.

## Handoff (for CEO and agents)

- Shipped / changed: crew `retire` phase; 63 stale branches deleted.
- Decisions the team must respect: superseded Paperclip branches are deleted after their salvage merges (owner ruling, 2026-10-17); other branches with unique work are not deleted without the owner.
- Pending / next owner: owner, the 16 branches listed above.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: stacked PRs marked MERGED whose work never reached main.
- Graders run and results (PASS/FAIL): dry run PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none.
