---
id: 20261251
title: Fix broken Urdu figures and invisible labels; complex figures become raster (D-2026-0098)
stage: green
date: 2026-11-23
surface: agent
model: claude-opus-5-5
feature: 032-textbook-visuals
branch: fix/figure-defects-d0098
user: M Yousif Channa
command: fix 22 figure if they are complex, make raster images instead
labels: [board-direct, figures, urdu, review]
links:
  spec: specs/032-textbook-visuals/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-304/unit-06/fig-U6-1.ur.svg (+ U6-2, U6-4, U6-8)
  - static/img/figures/efmp-304/unit-02/fig-U2-3.ur.svg
  - static/img/figures/efmp-301/unit-08/fig-U8-1.svg (+ .ur)
  - static/img/figures/gqur-301/unit-04/fig-U4-4.ur.svg
  - static/img/figures/gnas-301/unit-06/fig-U6-7.svg (+ .ur)
  - 22 files with labels on dark shapes, and their dark twins
  - specs/content/{efmp-301,gict-300,gnas-301}/tasks.md (G2 repointed, G3 re-opened)
  - specs/content/*/reviews/unit-NN/G2/20261123T1222*-gates.json
  - static/content-status.json
tests:
  - node scripts/measure-figure-text.mjs (all changed SVGs)
  - npm run check:content (14 gates PASS)
---

## Prompt

note: simple diagrams may be made as svg but complex diagrams such as The Urdu fig-U4-1 should be made raster images with proper description. approve . fix 22 figure if they are complex, make raster images instead. it's okay to fix and reopen g3 review. I'll make uploaded videos public

## Response snapshot

- Rule recorded as D-2026-0098 (in PR #725 with the skill updates): simple diagrams SVG; complex
  diagrams raster with alt text and caption in both languages.
- Triage of the 22 Urdu figures that kept English polygon coordinates, rendered EN beside UR: 19
  were correct (symmetric shapes; number lines, curves and charts rightly not mirrored). Real
  defects: EFMP-301 fig-U4-1 (complex scene, broken mirroring: raster), EFMP-304 fig-U2-3 and
  GQUR-301 fig-U4-4.
- Two new scans found more of the same class: text painted over by a later filled shape, and
  rects mirrored to W - x (width forgotten): EFMP-304 U6 fig-U6-1/2/4/8, EFMP-301 fig-U8-1,
  GNAS-301 fig-U6-7 (English arrows missing too).
- A render then showed 54 labels on dark shapes invisible in 22 files (stylesheet `text{fill}`
  beats the `fill` attribute); fixed with inline style.
- G2 refreshed for 10 units; G3 re-opened for the same 10 (3 certified, 7 awaiting sign-off).
  Urdu-only changes do not touch the English-stage manifest.
- fig-U4-1 raster deferred: every image producer was out (agy quota, gflow offline, Codex until
  14:05 UTC); the new no-text prompt and full description are drafted.

## Outcome

- ✅ Impact: 8 broken Urdu figures and 54 invisible labels fixed across 13 units.
- 🧪 Tests: measure-figure-text clean; check:content 14/14 PASS; pipeline gate 32 certified.
- 📁 Files: see front matter.
- 🔁 Next prompts: generate fig-U4-1 as a raster when a producer is free; fresh G3 runs for the
  10 re-opened units (crew); 158 accent-coloured labels still render in ink (legible, not fixed).
- 🧠 Reflection: the measure gate trusts coordinates, so whole-drawing transforms and paint order
  hide real defects; only a render shows them.

## Handoff (for CEO and agents)

- Shipped / changed: figure fixes, dark twins, G2 evidence, G3 re-open rows, content status.
- Decisions the team must respect: D-2026-0098; G3 re-opened for EFMP-301 U2, U4, U5, U7, U8, U9,
  U11, U12, GICT-300 U1, GNAS-301 U6 (fresh review needed).
- Pending / next owner: Claude: fig-U4-1 raster. Crew: G3 runs for the 10 units. Owner: sign-off
  after those runs.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: mirroring with a forgotten width; counter-transformed text; paint order;
  CSS rules overriding fill attributes; labels drawn ink-on-ink.
- Graders run and results (PASS/FAIL): measure PASS; check:content PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): a gate that renders each figure and flags text whose
  computed fill matches the shape under it, and text covered by a later shape.
