---
id: 0883
title: sort-g3-signoff-queue-by-verdict
stage: general
date: 2026-10-26
surface: agent
model: claude-opus-5-5
feature: none
branch: main
user: M Yousif Channa
command: yes sort them by verdict and show me eac
labels: ["board-direct", "crew", "g3", "sign-off", "status-check"]
links:
  spec: null
  ticket: null
  adr: history/adr/0019-review-delegation.md
  pr: null
files:
  - history/prompts/general/0883-sort-g3-signoff-queue-by-verdict.general.prompt.md
tests:
  - node scratchpad/g3sort.cjs over the 83 latest G3 reports listed by crew status
---

## Prompt

yes sort them by verdict and show me eac

## Response snapshot

Read the latest G3 report for each of the 83 units awaiting owner sign-off and sorted by advisory verdict: 17 pass (5 clean: EFMP-304 U4-U6, GQUR-301 U9, plus advisory-only notes on the rest), 34 revise (all carry open blocking findings), 32 escalate (about 8 of them escalate only because the reviewer could not render pages or verify independence, not for content defects). Many reports date from 2026-09-23 to 09-25 and may predate later repairs. Corrected the earlier "18 pass" to 17.

## Outcome

- Read-only; list shown to the owner. No sign-off made (ADR-0019: owner only).

## Handoff (for CEO and agents)

- Shipped: nothing.
- Decisions to respect: G3 sign-off is the owner's alone; agents never sign.
- Pending: owner signs pass units; revise/escalate units need repair jobs or owner rulings.
- Paperclip issues affected: none.
