---
id: crew-gnas-301-u06-fix-figure-geometry
title: Fix figure text-geometry in GNAS-301 Unit 6
stage: fix
date: 2026-10-27
surface: opencode
model: longcat/LongCat-2.0
feature: 015-licence-content-tree
branch: crew/gnas-301-u06-fix
user: ceo
command: Read .crew/brief.md in the current directory and carry it out completely.
labels: [opencode]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/gnas-301/unit-06/fig-U6-3.svg
  - static/img/figures/gnas-301/unit-06/fig-U6-7.svg
  - static/img/figures/gnas-301/unit-06/fig-U6-7.ur.svg
  - static/img/figures/gnas-301/unit-06/fig-U6-8.svg
  - static/img/figures/gnas-301/unit-06/fig-U6-10.svg
  - static/img/figures/gnas-301/unit-06/fig-U6-11.ur.svg
  - static/img/figures/gnas-301/unit-06/fig-U6-12.svg
  - static/img/figures/gnas-301/unit-06/fig-U6-1.dark.svg
  - static/img/figures/gnas-301/unit-06/fig-U6-1.ur.dark.svg
  - static/img/figures/gnas-301/unit-06/fig-U6-2.dark.svg
  - static/img/figures/gnas-301/unit-06/fig-U6-3.dark.svg
  - static/img/figures/gnas-301/unit-06/fig-U6-7.dark.svg
  - static/img/figures/gnas-301/unit-06/fig-U6-7.ur.dark.svg
  - static/img/figures/gnas-301/unit-06/fig-U6-8.dark.svg
  - static/img/figures/gnas-301/unit-06/fig-U6-10.dark.svg
  - static/img/figures/gnas-301/unit-06/fig-U6-10.ur.dark.svg
  - static/img/figures/gnas-301/unit-06/fig-U6-11.ur.dark.svg
  - static/img/figures/gnas-301/unit-06/fig-U6-12.dark.svg
  - specs/content/gnas-301/reviews/unit-06/G2/20261027T004729624Z-gates.json
  - specs/content/gnas-301/tasks.md
tests:
  - scripts/measure-figure-text.mjs (exit 0 on all 24 light SVGs)
  - npm run figures:variants (regenerated 10+1 dark variants)
  - npm run check:content (pipeline-gate PASS, check:figures PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for GNAS-301 Unit 6 (16 findings across 8 SVG files). Edit only the light .svg and .ur.svg sources, measure until exit 0, run figures:variants, update G2 gate evidence, and mark G3 stale.

## Response snapshot

Rewrote fig-U6-10.svg (restructured columns to x=200/410/580, wrapped long labels into 2-3 lines per row), fig-U6-12.svg (moved columns to x=180/400/580, wrapped "heat-action plans, flood-proof" and "School-scale version" header), fig-U6-3.svg (nudged "ban, substitute, screen" from x=575 to x=585), fig-U6-7.svg (rewrote layout: widened panels, wrapped body text, moved sun to x=690, repositioned "short-wave sunlight in"), fig-U6-7.ur.svg (moved Natural panel title from x=724 anchor=end to x=396 anchor=start), fig-U6-11.ur.svg (moved caption from y=448 to y=458), fig-U6-8.svg (wrapped "a greenhouse gas; ozone chemical" to two lines). Added missing wordmark to fig-U6-7.svg (was accidentally dropped during rewrite). Regenerated all dark variants.

## Outcome

- Impact: All 16 text-geometry findings resolved; measure-figure-text.mjs exits 0
- Tests: measure-figure-text PASS, figures:variants regenerated, check:content pipeline-gate PASS, check:figures PASS
- Files: 17 SVG files (8 light + 9 dark), 1 new G2 gates file, tasks.md updated
- Next prompts: G3 en-review needs a fresh run (marked stale in tasks.md)
- Reflection: The fig-U6-7.svg rewrite dropped the wordmark; always verify all required elements after a full rewrite. The content-status.json gate failure is pre-existing (file unmerged/deleted on this branch) and out of scope.

## Handoff (for CEO and agents)

- Shipped / changed: All figure text-geometry issues in GNAS-301 Unit 6 fixed and committed. G2 gate evidence regenerated.
- Decisions the team must respect: fig-U6-7.svg layout was substantially rewritten (sun moved right, panels widened, text wrapped). The Urdu version had the Natural panel title moved from right-aligned to left-aligned.
- Pending / next owner: G3 en-review is stale and needs a fresh run. Owner should authorise the third G3 cycle (previously gated at G-2026-33).
- Paperclip issues affected: none

## Evaluation notes (flywheel)

- Failure modes observed: Full SVG rewrite can drop required elements (wordmark); always self-check against svg-authoring.md rules before measuring.
- Graders run and results (PASS/FAIL): measure-figure-text PASS, check:figures PASS, check:pipeline-gate PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
