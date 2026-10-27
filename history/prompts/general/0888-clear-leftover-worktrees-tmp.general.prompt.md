---
id: 0888
title: Clear leftover worktrees and check tmp
stage: general
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: M Yousif Channa
command: yes clear them and check /tmp
labels: ["board-direct", "crew", "ops", "disk"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0888-clear-leftover-worktrees-tmp.general.prompt.md
 - history/prompts/general/0887-merge-339-queue-figure-repairs.general.prompt.md (renumbered from 0885)
tests:
 - none
---

## Prompt

yes clear them and check /tmp

## Response snapshot

Disk had fallen to 3.9 GB free and the crew held launches under its 8 GB floor. Removed the
gqur-301-u07-translate and lead-g3-rereview worktrees (branches kept; the u07 commit 7cd3c2ee
exists only on the local branch), /tmp/gqur-u07-main-VgSLAy (2.4 GB non-git copy from
2026-10-25), 179 leaked native-library files /tmp/.*-00000000.so older than a day (about 0.9 GB,
none open), and the git-ignored 2.4 GB .crew/main-baseline scratch copy in the finished
gsos-301-u01-fix worktree. Free space rose to 11 GB and launches resumed (3 running).
Batch PR #342 is red on the figure-geometry gate: 4 Urdu figures still overlap by 1.6 to 5.6px
(efmp-301 U4 fig-U4-3, efmp-303 U6 fig-U6-2, gnas-301 U6 fig-U6-1 and fig-U6-7); the crew queued
its fix job. Not touched: opencode.db (4.4 GB, growing), ~/wt-g3-desk (5.3 GB, uncommitted G3
sign-off desk work from another session), regenerable caches.

## Outcome

- Impact: crew launches unblocked.
- Tests: none.
- Files: PHR only; local PHR 0885 renumbered to 0887 because wt-g3-desk uses 0885.
- Next prompts: owner decision on opencode.db growth and caches.
- Reflection: codex workers copy main into .crew/main-baseline (2.4 GB each); the crew should
  delete it when a job finishes.

## Handoff (for CEO and agents)

- Shipped: disk cleanup only.
- Decisions to respect: wt-g3-desk owns PHR 0885 and ADR 0031; do not reuse them.
- Pending: #342 figure-geometry fix (crew); main-baseline cleanup in the crew (lead); opencode.db
  size (owner); PHRs 0886 to 0888 to commit with the next PR.
- Issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: disk floor hit mid-queue; PHR ID collision across sessions.
- Next experiment: crew removes .crew/main-baseline on job completion.
