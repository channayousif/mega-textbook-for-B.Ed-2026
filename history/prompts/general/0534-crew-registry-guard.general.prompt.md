---
id: "0531"
title: "Crew shared-registry guard"
stage: general
date: 2026-10-19
surface: agent
model: claude-opus-5-5
feature: none
branch: ops/crew-registry-guard
user: M Yousif Channa
command: go for long term fix
labels: ["board-direct", "crew", "registry", "guard"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - scripts/crew/registries.mjs
 - scripts/crew/crew.mjs
 - tests/crew/registries.test.mjs
 - history/prompts/general/0531-crew-registry-guard.general.prompt.md
tests:
 - node --test tests/crew/*.test.mjs (25 pass)
 - audit of real history: #164 0ac3e8ed flagged, #164 3859f166 clean, #162 merge on main flagged (repaired in #279)
 - crew.mjs tick --dry-run on a copy of the crew state
---

## Prompt

go for long term fix

## Response snapshot

New scripts/crew/registries.mjs checks glossary.json, specs/decisions/log.md, specs/gaps.md and
specs/content/terminology.csv against the branch's merge base with main: invalid JSON, a lost glossary
or terminology term, a lost gap, any removed decision-log line, or a new duplicate decision, gap or
term fails. Corrected definitions and gap status updates pass. crew.mjs runs it when a job finishes
(a failure is retried with the damage and the append-only rule as feedback) and when an hourly batch is
assembled (a job that damages the registries in combination is left out for a merge fix). Its first
audit found the #162 merge had already damaged main; that repair is #279.

## Outcome

- Impact: a registry-damaging merge can no longer leave a crew worktree.
- Tests: listed above.
- Files: listed above.

## Handoff (for CEO and agents)

- Shipped: crew registry guard.
- Decisions to respect: shared registries are append-only; the crew enforces it.
- Pending: owner merges this PR (scripts/ is protected); the #279 repair is merged. The batch-gate
  content-status bug found alongside was fixed separately in #281.
- Paperclip issues affected: none.
