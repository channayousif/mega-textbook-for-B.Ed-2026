---
id: 0886
title: Crew status during figure repairs
stage: general
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: M Yousif Channa
command: status
labels: ["board-direct", "crew", "figures", "status"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0886-crew-status-figure-repairs.general.prompt.md
tests:
 - measure-figure-text --report on origin/main for the 7 repaired unit folders (104 SVGs, 0 problems)
---

## Prompt

status

## Response snapshot

Crew board: running 3, queued 48, ready 2, merged 375, all workers ok. Of the 60 figure-repair
jobs, 7 merged (PRs #340, #341), 2 ready for the next batch, 3 running, 48 queued. Re-measuring
the merged units on origin/main found 0 problems across 104 SVGs. Disk at 93% (9.0 GB free),
close to the crew's 8 GB launch floor; leftover worktrees noted, nothing deleted.

## Outcome

- Impact: verified the repair jobs fix what they claim; flagged disk pressure.
- Tests: re-measure passed (0 problems).
- Files: this PHR only.
- Next prompts: owner decision on freeing disk.
- Reflection: crew worktrees with full node_modules (3.1 GB) are the main disk risk.

## Handoff (for CEO and agents)

- Shipped: nothing new; status only.
- Decisions to respect: repair jobs must not change wording; G3 evidence of repaired units is stale.
- Pending: 48 queued repair jobs (crew); disk cleanup decision (owner); PHRs 0886 and 0887 to commit with the next PR.
- Issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Next experiment: none.
