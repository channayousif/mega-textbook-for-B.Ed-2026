---
id: 544
title: "Fix EFMP-302 Unit 2 figure text-geometry (fig-U2-3, fig-U2-7)"
stage: general
date: 2026-10-27T16:42:00Z
surface: static/img/figures/efmp-302/unit-02 (SVG text-geometry)
model: LongCat-2.0
feature: null
branch: crew/efmp-302-u02-fix
user: crew
command: ".crew/brief.md - efmp-302-u02-fix figure text-geometry repair"
labels: [opencode]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-302/unit-02/fig-U2-3.svg
  - static/img/figures/efmp-302/unit-02/fig-U2-3.dark.svg
  - static/img/figures/efmp-302/unit-02/fig-U2-7.svg
  - static/img/figures/efmp-302/unit-02/fig-U2-7.dark.svg
  - specs/content/efmp-302/tasks.md
  - specs/content/efmp-302/reviews/unit-02/G2/20261027T163935314Z-gates.json
tests:
  - scripts/measure-figure-text.mjs (exits 0 for all unit-02 SVGs)
  - npm run figures:variants (writes 2 dark variants)
  - npm run check:content (12/13 pass; check:content-status pre-existing)
---

## Prompt

Crew job efmp-302-u02-fix: fix the 3 figure text-geometry problems that measure-figure-text.mjs reports for EFMP-302 Unit 2 (fig-U2-3.svg: 2 overlaps, fig-U2-7.svg: 1 spill). Follow svg-authoring.md "Fit and spacing" section. Then prepare gate evidence, update tasks.md G2 pointer, mark G3 stale.

## Response snapshot

- fig-U2-3.svg: wrapped "a verdict handed to a pupil" → "a verdict handed" + "to a pupil" (moved "about their own capacity" down to y=140); wrapped "travels and is never checked" → "travels and is" + "never checked" (y=389).
- fig-U2-7.svg: wrapped header "A defensible first move" → "A defensible" (y=38) + "first move" (y=55) so it no longer spills past cellhdr edge at x=764.
- Regenerated dark variants via `npm run figures:variants`.
- measure-figure-text.mjs exits 0 for all 16 unit-02 SVG/ur.svg pairs.
- `node scripts/prepare-gate-evidence.mjs EFMP-302 2` → all 8 G2 gates pass; new evidence file 20261027T163935314Z-gates.json.
- Updated tasks.md Unit 2 G2 row to point at new gates file; appended "Stale since the figure-geometry repair; needs a fresh G3 run" to G3 row.

## Outcome

- ✅ Impact: all 3 text-geometry findings resolved; measure-figure-text.mjs exits 0; no viewBox height changes needed (wrapping kept content within existing bounds).
- 🧪 Tests: measure-figure-text.mjs ✓, figures:variants ✓, check:content 12/13 (check:content-status pre-existing on origin/main, not in scope).
- 📁 Files: 4 SVG files edited (2 EN + 2 dark variants regenerated); tasks.md updated; new G2 evidence committed.
- 🔁 Next prompts: owner sign-off under G-2026-63 before a fresh independent G3 review.
- 🧠 Reflection: wrapping text (not shrinking) per svg-authoring.md "Fit and spacing" was sufficient for all three issues; no viewBox growth needed.

## Handoff (for CEO and agents)

- Shipped / changed: fig-U2-3.svg, fig-U2-7.svg geometry repaired; dark variants regenerated; G2 evidence regenerated; tasks.md G2 pointer updated and G3 marked stale.
- Decisions the team must respect: did not touch Urdu .ur.svg files (already passed measurement); did not change viewBox heights; did not edit prose.
- Pending / next owner: third G3 review needs owner sign-off under G-2026-63 before a fresh independent G3 run; G5 Urdu review remains pending per ADR-0019; Urdu fig-U2-1/fig-U2-5 box overlaps still need a reviewer's ink-overlap check.
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: none (single-pass fix).
- Graders run and results (PASS/FAIL): measure-figure-text PASS; figures:variants PASS; G2 gates PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
