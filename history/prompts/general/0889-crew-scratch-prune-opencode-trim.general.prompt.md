---
id: 0889
title: Crew scratch prune and opencode trim
stage: general
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/crew-prune-scratch
user: M Yousif Channa
command: yes
labels: ["board-direct", "crew", "ops", "disk"]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/343
files:
 - scripts/crew/crew.mjs
 - tests/crew/worktrees.test.mjs
 - history/prompts/general/0889-crew-scratch-prune-opencode-trim.general.prompt.md
tests:
 - npm run test:crew (70 pass)
---

## Prompt

yes

(Approving: make the crew delete worker scratch copies when a job ends, and trim opencode's history database.)

## Response snapshot

Added pruneScratch(wt) to scripts/crew/crew.mjs; reapOne calls it once a job's log is read, so
subfolders of .crew/ go on every outcome while brief.md and logs stay. PR #343.
Trimmed ~/.local/share/opencode/opencode.db: deleted 169 opencode sessions from crew worktrees
idle over two days with `opencode session delete` (crew tick lock held, no opencode running),
then VACUUM INTO a compact copy (integrity ok, 114 sessions) and swapped it in: 4.4 GB to 0.57 GB.
The 88 sessions from the main checkout and all recent ones were kept.
Also removed ~/wt-gpks-intake2 and ~/wt-geng301-log (clean, already in main). A full 2.4 GB
checkout made for this fix briefly took free space to 168 MB; it was replaced by a sparse one.

## Outcome

- Impact: about 7.5 GB recovered across the session; opencode growth reset.
- Tests: crew suite 70 pass.
- Files: crew.mjs, worktrees.test.mjs.
- Next prompts: owner decision on a periodic opencode trim and a bigger disk.
- Reflection: each crew job worktree is about 0.7 GB, so 12 open (ready plus batched) jobs alone
  hold the host near the 8 GB floor.

## Handoff (for CEO and agents)

- Shipped: PR #343 (crew scratch prune); opencode.db trimmed on the host.
- Decisions to respect: never make a full checkout on this host for crew-only work; use sparse.
- Pending: #343 merge (owner, crew.mjs is protected); #342 figure-geometry fix (crew).
- Issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: disk floor hit; my own full checkout nearly filled the disk.
- Next experiment: trim opencode sessions older than a week on a schedule.
