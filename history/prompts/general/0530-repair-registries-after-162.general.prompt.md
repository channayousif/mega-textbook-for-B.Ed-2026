---
id: "0530"
title: "Repair registries after PR 162"
stage: general
date: 2026-10-19
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/registry-repair-after-162
user: M Yousif Channa
command: go for long term fix
labels: ["board-direct", "crew", "registry", "repair"]
links:
  spec: null
  ticket: null
  adr: null
  pr: "#162"
files:
 - specs/decisions/log.md
 - specs/gaps.md
 - history/prompts/general/0530-repair-registries-after-162.general.prompt.md
tests:
 - registry guard (scripts/crew/registries.mjs) pre-#162 main vs repaired: clean for all four registries
 - npm run check:content (13/13)
---

## Prompt

go for long term fix

## Response snapshot

Building the shared-registry guard, its first audit found that the crew's merge of #162 (GQUR-301
salvage, conflict3 by opencode) had already corrupted main: specs/decisions/log.md lost GSOS-301's
intake decisions D-2026-0051 and D-2026-0057 (181 of main's lines removed or changed) and re-added stale
copies of D-2026-0019, -0048, -0059 and -0063; specs/gaps.md re-added stale copies of EFMP-305's
G-2026-72..76 and G-2026-102. Content gates do not read these files, so CI stayed green. Repair: both
files rebuilt as main just before #162 (52229682, no duplicates) plus, unchanged and in current order,
every entry whose ID it lacked: GQUR-301's D-2026-0049, -0055, -0060 and G-2026-82, -83. glossary.json
(+55 terms) and terminology.csv were sound.

## Outcome

- Impact: decision log back to 47 unique entries (D-2026-0051 and D-2026-0057 restored); gaps 64 unique.
- Tests: listed above.
- Files: listed above.

## Handoff (for CEO and agents)

- Shipped: registry repair on main (this PR); the crew guard follows in its own PR.
- Decisions to respect: decision log and gaps are append-only; never resolve their conflicts by
  taking a stale side.
- Pending: owner merge.
- Paperclip issues affected: none.
