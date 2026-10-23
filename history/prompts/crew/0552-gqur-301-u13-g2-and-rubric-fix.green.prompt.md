---
id: 0552
title: GQUR-301 U13 rubric fix and G2 evidence
stage: green
date: 2026-10-23
surface: agent
model: claude-opus-5-5
feature: gqur-301
branch: crew/gqur-301-u13-author
user: channayousif
command: crew/brief.md
labels: ["crew", "author-unit", "gqur-301", "unit-13", "g2"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/gqur-301/unit-13/topic-01.mdx
  - docs/semester-2/gqur-301/unit-13/unit-assessment.mdx
  - specs/content/gqur-301/tasks.md
  - specs/content/gqur-301/reviews/unit-13/G2/20261022T193430944Z-gates.json
tests:
  - npm run check:content (13/13 pass)
  - node scripts/prepare-gate-evidence.mjs GQUR-301 13 (8/8 pass)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Continued the earlier authoring attempt. Recomputed every worked example: topic sums, r, b, a
and residuals were correct, but the ERQ 1/2 rubric values were wrong for the ERQ data set
(stated b 6.1, a 24.7, prediction 73.5, residual 1.6; correct b 5.31, a 29.4, prediction 71.9,
residual -2.2, r 0.986). Fixed the rubric, escaped `|r|` inside GFM table rows (it split cells),
generated G2 gate evidence and set the `Unit 13 | G2 en-draft` row to done (auto:gates).

## Outcome

- check:content 13/13 green after regenerating the untracked static/content-status.json.
- npm run build not run (crew brief forbids it); MDX render not verified.

## Handoff (for CEO and agents)

- Shipped: U13 EN content with corrected ERQ rubric; G2 en-draft done via auto:gates.
- Pending: G3 en-review (independent reviewer), G4/G5 Urdu, figures still prompt-only.
- Paperclip issues: none (crew job gqur-301-u13-author).
