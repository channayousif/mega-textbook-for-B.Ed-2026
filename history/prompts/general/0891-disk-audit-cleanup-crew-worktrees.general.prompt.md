---
id: 0891
title: Disk audit cleanup and crew worktrees
stage: general
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/crew-drop-ready-worktrees
user: M Yousif Channa
command: perform an audit of the whole disk
labels: ["board-direct", "crew", "ops", "disk"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - scripts/crew/crew.mjs
 - tests/crew/worktrees.test.mjs
 - history/prompts/general/0890-merged-343-crew-sync.general.prompt.md
 - history/prompts/general/0891-disk-audit-cleanup-crew-worktrees.general.prompt.md
tests:
 - npm run test:crew (72 pass)
 - dry run of dropWaitingWorktrees on the live board (20 folders)
---

## Prompt

perform an audit of the whole disk, tell me where the space is gone, it is possible to distribute the load to other dava machine.

(Plan answers: evaluate making dava production and this host development; then "phase 1 reshape is rejected, it may incurr extra costs" (OCI Always Free A1 is now 2 OCPU / 12 GB per tenancy); then "cancel site migration for now, i am not ready yet." Approved cleanups: old Claude worktrees, stray git repo in home, move backups to dava, clear rebuildable caches.)

## Response snapshot

Audit of 113 GB used: crew job folders 15 GB, main checkout 12 GB (4.5 GB old Claude worktrees),
Docker/Supabase 10.7 GB, deploy checkout 7.1 GB, other sessions' folders 8 GB, tool data about
27 GB, data and backups about 12 GB, system about 10 GB. The two hosts are in different OCI
tenancies and regions, so their resources cannot be pooled; the production move to dava (Riyadh)
was evaluated as feasible and deferred by the owner.
Done: saved diffs and untracked files of .claude/worktrees/s2-courses and TEX-90 to
~/backups/worktree-patches and removed them (branches kept); deleted ~/.git; moved the Paperclip
backup to dava (sha256 matched) and deleted it here; cleared uv, npm, whisper and Homebrew caches.
Free space 7.8 GB to 20 GB; crew launches resumed. OCI check: one 125 GB boot volume in the
tenancy, so growing it to 200 GB stays inside the free allowance (owner console action).
Crew: new `space` tick phase removes the worktree of every ready or batched job not used by a
running job (about 0.7 GB each; 20 on the live board).

## Outcome

- Impact: 12 GB recovered now; about 14 GB more once this PR merges.
- Tests: crew suite 72 pass.
- Files: crew.mjs, worktrees.test.mjs.
- Next prompts: owner grows the boot volume; port the crew change to dava's crew copy.
- Reflection: the ~/.git check piped errors to /dev/null, so "0 commits" was not proof; it had
  packed-refs and FETCH_HEAD from some remote. Never discard stderr on a pre-delete check.

## Handoff (for CEO and agents)

- Shipped: disk cleanup on the host; crew sweep of waiting worktrees (this PR).
- Decisions to respect: no compute reshape (cost); site migration to dava deferred by the owner.
- Pending: boot volume growth (owner); port to dava crew (lead); #342 fix (crew).
- Issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: a pre-delete check that hid its own errors.
- Next experiment: none.
