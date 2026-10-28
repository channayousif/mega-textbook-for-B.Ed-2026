---
id: "20261027-001"
title: "Fix figure text-geometry problems for GNAS-301 Unit 4"
stage: fix
date: 2026-10-27T08:58:33Z
surface: figure-text-geometry
model: claude-sonnet-4-20250514
feature: gnas-301
branch: crew/gnas-301-u04-fix
user: crew
command: Read .crew/brief.md in the current directory and carry it out completely
labels: [crew, opencode]
links:
  spec: specs/content/gnas-301/
  ticket: null
  adr: null
  pr: null
files:
  changed:
    - static/img/figures/gnas-301/unit-04/fig-U4-2.svg
    - static/img/figures/gnas-301/unit-04/fig-U4-2.dark.svg
    - static/img/figures/gnas-301/unit-04/fig-U4-7.svg
    - static/img/figures/gnas-301/unit-04/fig-U4-7.dark.svg
    - static/img/figures/gnas-301/unit-04/fig-U4-10.svg
    - static/img/figures/gnas-301/unit-04/fig-U4-10.dark.svg
    - static/img/figures/gnas-301/unit-04/fig-U4-12.svg
    - static/img/figures/gnas-301/unit-04/fig-U4-12.dark.svg
    - static/img/figures/gnas-301/unit-04/fig-U4-12.ur.svg
    - static/img/figures/gnas-301/unit-04/fig-U4-12.ur.dark.svg
    - static/img/figures/gnas-301/unit-04/fig-U4-13.svg
    - static/img/figures/gnas-301/unit-04/fig-U4-13.dark.svg
    - docs/semester-1/gnas-301/unit-04/topic-01.mdx
    - docs/semester-1/gnas-301/unit-04/topic-04.mdx
    - docs/semester-1/gnas-301/unit-04/topic-05.mdx
    - docs/semester-1/gnas-301/unit-04/topic-06.mdx
    - docs/semester-1/gnas-301/unit-04/topic-07.mdx
    - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-01.mdx
    - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-04.mdx
    - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-05.mdx
    - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-06.mdx
    - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-04/topic-07.mdx
    - specs/content/gnas-301/tasks.md
    - specs/content/gnas-301/reviews/unit-04/G2/20261027T085833746Z-gates.json
    - specs/content/gnas-301/reviews/unit-04/G2/logs-20261027T085833746Z/*.txt
  reviewed:
    - .crew/brief.md
tests:
  measure-figure-text: "PASS - all 28 light SVGs pass (0 failures)"
  figures-variants: "PASS - 6 dark variants written"
  check-content: "PASS for all gates except check:pipeline-gate (expected stale G2)"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely.

## Response snapshot

Parsed the brief, ran `scripts/measure-figure-text.mjs` to identify 9 text-geometry failures across 6 SVG files (fig-U4-2, fig-U4-7, fig-U4-10, fig-U4-12, fig-U4-12.ur, fig-U4-13). Applied fixes by wrapping overflowing labels into multiple lines, growing the containing panel rects and viewBox heights, shifting subsequent content down, regenerating dark variants with `npm run figures:variants`, and updating Figure carrier height attributes in both English and Urdu topic files. Ran `node scripts/prepare-gate-evidence.mjs GNAS-301 4` to refresh G2 evidence and updated `specs/content/gnas-301/tasks.md` to point at the new gates file and mark G3 rows stale.

## Outcome

- Impact: All 28 GNAS-301 Unit 4 light SVGs now pass measure-figure-text with 0 failures. Figure carrier heights updated in 10 topic mdx files.
- Tests: measure-figure-text (0 failures), figures-variants (6 dark variants), check:content (12/13 pass; pipeline-gate expected stale G2).
- Files: 6 light SVGs + 6 dark variants + 10 topic mdx + tasks.md + gates.json + gate logs.
- Next prompts: None required; G3 needs a fresh review run (owner-gated).
- Reflection: The Urdu `.ur.svg` files require `text-anchor="end"` to be preserved when wrapping RTL text; dropping it causes overflow. ElementTree serialization was unsuitable for single-line SVGs, so string-based manipulation was used instead.

## Handoff (for CEO and agents)

- Shipped / changed: figure text-geometry fixes for GNAS-301 Unit 4 across 6 SVG pairs and 10 topic carriers. Dark variants regenerated. G2 evidence refreshed.
- Decisions the team must respect: G3 rows for Unit 4 are marked stale since the figure-geometry repair; a fresh G3 run is needed (owner authorization required per G-2026-31).
- Pending / next owner: G3 review cycle for Unit 4 remains open; a fresh G3 run requires owner authorization.
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: Initial ElementTree approach mangled single-line SVG format and lost `text-anchor="end"` attributes; string-based manipulation fixed this.
- Graders run and results (PASS/FAIL): PASS
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
