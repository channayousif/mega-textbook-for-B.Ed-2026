---
id: 0880
title: crew-status-m3-m4-need-lead
stage: general
date: 2026-10-26
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: M Yousif Channa
command: crew status
labels: ["board-direct", "crew", "ops", "status-check"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/general/0880-crew-status-m3-m4-need-lead.general.prompt.md
tests:
  - node scripts/crew/crew.mjs status (in ~/crew-system at 07611556)
---

## Prompt

crew status

## Response snapshot

Ticks healthy since #335 (no new pathspec errors). Board: 0 running, 0 queued, 362 merged, 2 red, all workers ok, no owner decisions, 83 units await owner G3 sign-off. Red: maint-2026-w43-m3 (#329, mergeable; last review pass, then conflict2 fix) and maint-2026-w43-m4 (#328, conflicting; last review revise, revise2 done) both hit "3 reviews without a pass; needs the lead". Board header counts them as 0 open PRs although both are open.

## Outcome

- Status reported; no changes made.

## Handoff (for CEO and agents)

- Shipped: nothing.
- Pending: lead decision on #329 and #328; 83 G3 sign-offs (owner).
- Paperclip issues affected: none.
