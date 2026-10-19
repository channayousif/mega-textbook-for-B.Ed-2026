---
id: "0531"
title: "Crew disk unblock and Paperclip deletion"
stage: general
date: 2026-10-19
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: M Yousif Channa
command: crew status; yes do both; delete paperclip also
labels: ["board-direct", "crew", "ops", "paperclip", "disk"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files: []
tests: []
---

## Prompt

crew status

yes do both

delete paperclip also

## Response snapshot

Crew board 2026-10-19T18:16Z: running 0, queued 24, ready 20, PRs open 0, red 1 (efmp-305-u01-repair_en,
gate_red after 5 merge fixes), merged 134; all four workers ok; 43 units await human G3 sign-off.
The tick had refused to launch for about 9 ticks because disk free (~8.1 GB) was under the 8192 MB guard.
Most ready jobs failed to join the hourly batch on `check:content` after merging onto main, with conflict
fixes queued.

Actions:
- All 22 worktrees in ~/crew-wt belong to live jobs (ready/queued/gate_red), so none were pruned.
- Cleared the regenerable npm cache (~/.npm, 3.5 GB): disk free 8 GB -> 12 GB, guard cleared.
- Owner then said to delete Paperclip. Stopped and disabled the `paperclip.service` user unit (it was still
  running with embedded Postgres), archived ~/.paperclip to
  ~/backups/paperclip-textbook-2026-10-19.tar.zst (2.8 GB, zstd integrity verified, 5144 entries), then
  deleted ~/.paperclip. Net disk change from this step is about zero because the archive is nearly as big
  as the data it replaced.
- The `check:content` run on main was interrupted by the owner, so it has not been run. Whether main itself
  is red is still unknown.

## Outcome

- Impact: crew can launch again; Paperclip on the textbook host is fully removed (service disabled, data
  deleted, backup kept). This reverses the 2026-10-17 "pause Paperclip and keep its data" ruling.
- Tests: none.
- Files: this PHR only (host changes are outside the repo).

## Handoff (for CEO and agents)

- Shipped: disk guard cleared (12 GB free); Paperclip service disabled and ~/.paperclip deleted.
- Decisions to respect: Paperclip is gone on both hosts (textbook today, dava on 2026-10-18). Do not
  restart it; the crew is the only orchestrator. Restore only from ~/backups/paperclip-textbook-2026-10-19.tar.zst.
- Pending: confirm whether main passes `npm run check:content` before the queued conflict fixes run
  (owner/lead); efmp-305-u01-repair_en needs manual triage; 43 G3 sign-offs await a person.
- Paperclip issues affected: none (Paperclip retired).
