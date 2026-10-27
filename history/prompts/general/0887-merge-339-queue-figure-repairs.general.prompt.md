---
id: 0887
title: merge-339-queue-figure-repairs
stage: general
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: M Yousif Channa
command: merge #339 and queue the repair jobs
labels: ["board-direct", "crew", "figures", "merge"]
links:
  spec: null
  ticket: null
  adr: null
  pr: "#339"
files:
  - history/prompts/general/0885-merge-339-queue-figure-repairs.general.prompt.md
tests:
  - node scripts/measure-figure-text.mjs over all non-dark SVGs on main 19c79a47 (558 problems)
---

## Prompt

merge #339 and queue the repair jobs

## Response snapshot

Merged #339 with --admin as 19c79a47 (CI 5/5 green; figure-geometry measured fig-U4-1 light and dark). Re-measured the corpus on main: 558 problems; 60 B.Ed unit folders (550 problems) queued as crew `fix` jobs ordered by problem count (GQUR-301 U5 68, EFMP-304 U1 37, EFMP-304 U2 31, GQUR-301 U16 30, ...). Each task lists the flagged files, points at the "Fit and spacing" rules, allows the Chromium measure via scripts/heavy.sh, forbids prose and wording changes, and requires refreshing G2 evidence and marking G3 stale. Board backed up to board.json.bak-20261027-figrepair. Tick launched 3 (gqur-301-u05, efmp-304-u01, efmp-304-u02). Licence figures (3 folders, 6 files) not queued: the crew's course/unit model does not cover the pedagogy tree.

## Outcome

- #339 merged; 60 repair jobs queued, 3 running.

## Handoff (for CEO and agents)

- Shipped: print fix and overlap gate (#339).
- Decisions to respect: repairs change layout only, never wording; every repaired unit's G3 evidence is stale and needs a fresh run.
- Pending: 57 queued repair jobs (crew); licence figures (lead/owner); G3 sign-off queue grows as repairs land.
- Paperclip issues affected: none.
