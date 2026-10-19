---
id: "0532"
title: "Main content gates and crew batch bug"
stage: general
date: 2026-10-19
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: M Yousif Channa
command: go-ahead to check
labels: ["board-direct", "crew", "gates", "diagnosis"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files: []
tests:
 - npm run check:content on origin/main f88db171 (13/13 PASS)
---

## Prompt

 go-ahead to check

## Response snapshot

`npm run check:content` on origin/main f88db171 (in /home/a2ahs/crew-system): all 13 gates PASS. Main is
not red.

Root cause of the ~20 "fails npm run check:content (it could not join the hourly batch)" jobs: the batch
in scripts/crew/crew.mjs builds a fresh sparse worktree from origin/main, and `static/content-status.json`
is gitignored, so it is missing there and `check:content-status` fails. The main baseline (ROOT) has a
fresh copy because crew.mjs:67 regenerates it, so the failure counts as a new finding. The finding list
in the reason is empty because the gate's output does not match the gateFindings filter. Every conflict
fix worker "fixes" it by regenerating the file locally, which is never committed (gitignored), so the job
fails the next batch again. That loop is why efmp-305-u01-repair_en went red after 5 merge fixes.
CI does not hit this because ci.yml:123 runs `node scripts/report-content-status.mjs` before
`check:content-status`.

Proposed fix (not applied; awaiting owner go-ahead): in gateFindings(cwd) run
`node scripts/report-content-status.mjs` in cwd before `npm run -s check:content`.

## Outcome

- Impact: diagnosis only; no files changed apart from this PHR.
- Tests: check:content on main, PASS.

## Handoff (for CEO and agents)

- Shipped: nothing; diagnosis only.
- Decisions to respect: do not hand-close the queued -conflictN jobs as failures; they are victims of the
  batch bug, not bad branches.
- Pending: the gateFindings fix PR (owner approval), then requeue efmp-305-u01-repair_en. The dava crew
  copy has no batch step and no gitignored gate input, so it needs no port (see PHR 0533).
- Paperclip issues affected: none.
