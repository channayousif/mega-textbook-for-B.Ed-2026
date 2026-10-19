---
id: "0529"
title: "Fix PR 164 decision log merge"
stage: general
date: 2026-10-19
surface: agent
model: claude-opus-5-5
feature: geng-301
branch: crew/geng-301-u00-salvage
user: M Yousif Channa
command: fix conflicts for crew(geng-301): salvage unit 0 by codex #164
labels: ["board-direct", "crew", "geng-301", "registry"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: "#164"
files:
 - specs/decisions/log.md
 - history/prompts/general/0529-fix-pr164-decision-log-merge.general.prompt.md
tests:
 - npm run check:content (13/13 pass after build:content-status)
---

## Prompt

fix conflicts for crew(geng-301): salvage unit 0 by codex #164

## Response snapshot

The crew's merge fix (geng-301-u00-salvage-conflict2, opencode, attempt 2) had made #164 mergeable,
but its specs/decisions/log.md merge was wrong: D-2026-0067 lost its heading and item 1, and extra
copies of D-2026-0053 and a stub D-2026-0048 left two duplicate decision IDs (main has none).
glossary.json (valid, all 387 main entries kept, 38 new unique terms) and specs/gaps.md (nothing
removed, no duplicate IDs) were correct. Rebuilt the log as main's log unchanged plus the branch's
three GENG-301 entries (D-2026-0050, D-2026-0056, D-2026-0062; IDs unused on main), appended in
main's order then the branch's. Also confirmed the three earlier GENG-301 MDX build errors are fixed
on the branch.

## Outcome

- Impact: #164's decision log keeps every main entry intact and adds only GENG-301's intake decisions.
- Tests: check:content 13/13.
- Files: listed above.
- Reflection: opencode's registry merges have now broken glossary.json once and the decision log once;
  shared-registry conflict fixes need a structural check (no main line removed, no duplicate IDs).

## Handoff (for CEO and agents)

- Shipped: decision-log repair on #164.
- Decisions to respect: owner ruled #164 merge (2026-10-19), re-opening GENG-301 G0/G1; registries are append-only.
- Pending: CI on #164, then the crew merges it with the recorded owner approval.
- Paperclip issues affected: none.
