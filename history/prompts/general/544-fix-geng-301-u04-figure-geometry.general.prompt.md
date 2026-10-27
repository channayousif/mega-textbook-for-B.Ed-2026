---
id: 544
title: "Fix GENG-301 Unit 4 figure text-geometry (wordmark overflow)"
stage: general
date: 2026-10-27T15:08:00Z
surface: svg, gates
model: claude-sonnet-4-20250514
feature: 015
branch: crew/geng-301-u04-fix
user: crew
command: ".crew/brief.md: fix figure text-geometry for GENG-301 Unit 4"
labels: [opencode]
links:
  spec: specs/content/geng-301/unit-04/
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/geng-301/unit-04/fig-U4-1.svg
  - static/img/figures/geng-301/unit-04/fig-U4-1.dark.svg
  - static/img/figures/geng-301/unit-04/fig-U4-2.svg
  - static/img/figures/geng-301/unit-04/fig-U4-2.dark.svg
  - static/img/figures/geng-301/unit-04/fig-U4-3.svg
  - static/img/figures/geng-301/unit-04/fig-U4-3.dark.svg
  - static/img/figures/geng-301/unit-04/fig-U4-4.svg
  - static/img/figures/geng-301/unit-04/fig-U4-4.dark.svg
  - static/img/figures/geng-301/unit-04/fig-U4-5.svg
  - static/img/figures/geng-301/unit-04/fig-U4-5.dark.svg
  - static/img/figures/geng-301/unit-04/fig-U4-6.svg
  - static/img/figures/geng-301/unit-04/fig-U4-6.dark.svg
  - specs/content/geng-301/tasks.md
  - specs/content/geng-301/reviews/unit-04/G2/20261027T150802204Z-gates.json
tests:
  - node scripts/measure-figure-text.mjs (exits 0 for all 6)
  - npm run figures:variants (6 dark variants written)
  - npm run check:content (12/13 pass; content-status.json pre-exists on main)
---

## Prompt

Crew job geng-301-u04-fix: Fix the figure text-geometry problems that scripts/measure-figure-text.mjs reports for this unit (6 in total; PR #339 added the overlap and spill checks): fig-U4-1.svg through fig-U4-6.svg, each overflowing right edge by ~43px on the "textbook.com.pk" wordmark.

## Response snapshot

Diagnosed root cause: the `.wm` CSS class was never defined in any of the 6 SVGs, so the wordmark `<text class="wm" text-anchor="end">` inherited `text-anchor:middle` from the `text` rule and rendered centred on x=768 instead of right-aligned, spilling ~43px past the 780-wide viewBox. Added `.wm { fill: var(--wm); font-size: 11px; text-anchor: end; }` to all 6 light SVGs, regenerated dark variants, re-measured clean, refreshed G2 gate evidence, and updated tasks.md.

## Outcome

- ✅ Impact: All 6 figure SVGs now pass measure-figure-text.mjs with zero text-geometry problems; wordmark sits 12px inside the right edge.
- 🧪 Tests: measure-figure-text.mjs exits 0 for all 6; figures:variants regenerates 6 dark twins; check:content passes 12/13 gates (the 1 failure, content-status.json, pre-exists on origin/main).
- 📁 Files: 12 SVG edits (6 light + 6 dark), 1 tasks.md row update, 1 new G2 gate evidence file.
- 🔁 Next prompts: A fresh independent G3 review is needed (row flagged stale).
- 🧠 Reflection: The `.wm` class omission is a template-authoring bug in earlier figure generation - same pattern seen in Units 1 and 2 PHRs. Consider adding it to the svg-authoring.md boilerplate example explicitly.

## Handoff (for CEO and agents)

- Shipped / changed: wordmark overflow fixed in all 6 GENG-301 Unit 4 SVGs; G2 gate evidence refreshed; G3 row flagged stale.
- Decisions the team must respect: the `.wm` class (fill + font-size + text-anchor:end) is now part of every GENG-301 figure SVG; future figure generation must include it.
- Pending / next owner: G3 en-review needs a fresh independent run (ADR-0019) - the previous advisory pass is stale since the figure-geometry repair.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: CSS `text-anchor:middle` on the generic `text` rule silently overrode the wordmark's `text-anchor="end"` presentation attribute because the `.wm` class was never defined. The measure script caught it; a static gate would not have.
- Graders run and results (PASS/FAIL): measure-figure-text PASS, figures:variants PASS, check:content 12/13 PASS (content-status.json FAIL pre-exists on main).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): add a lint gate that verifies `.wm` class presence in every SVG, preventing recurrence.
