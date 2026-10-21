---
id: crew-gqur-301-u12-figures-g2
title: GQUR-301 U12 render figures and pass G2 gate
stage: green
date: 2026-10-21
surface: cli
model: LongCat-2.0
feature: gqur-301
branch: crew/gqur-301-u12-author
user: a2ahs
command: opencode
labels: [opencode, crew, gqur-301]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/gqur-301/unit-12/fig-U12-1.svg
  - static/img/figures/gqur-301/unit-12/fig-U12-1.dark.svg
  - static/img/figures/gqur-301/unit-12/fig-U12-2.svg
  - static/img/figures/gqur-301/unit-12/fig-U12-2.dark.svg
  - static/img/figures/gqur-301/unit-12/fig-U12-3.svg
  - static/img/figures/gqur-301/unit-12/fig-U12-3.dark.svg
  - static/img/figures/gqur-301/unit-12/fig-U12-4.svg
  - static/img/figures/gqur-301/unit-12/fig-U12-4.dark.svg
  - docs/semester-2/gqur-301/unit-12/topic-01.mdx
  - docs/semester-2/gqur-301/unit-12/topic-02.mdx
  - specs/content/gqur-301/figures/unit-12.md
  - specs/content/gqur-301/tasks.md
  - specs/content/gqur-301/reviews/unit-12/G2/20261021T065608298Z-gates.json
tests:
  - npm run check:content (all 13 gates pass)
---

## Prompt

"Read .crew/brief.md in the current directory and carry it out completely. It is your whole task."

## Response snapshot

Crew brief for gqur-301-u12-author: render the 4 prompt-only figure markers for GQUR-301 Unit 12 into committed, placed SVGs, replace markers with `<Figure>` elements, update the manifest to `placed`, and mark G2 en-draft done so the pipeline gate passes. Authored 4 schematics (concept-map, table, diagram, table) with dark variants via `figures:variants`. Ran `prepare-gate-evidence.mjs GQUR-301 2` which wrote G2 evidence after all DRAFT_COMMANDS passed. Updated tasks.md G2 row to `auto:gates` done.

## Outcome

- ✅ Impact: All 13 content gates pass (was 2 of 13 failing: pipeline-gate, figures). Figure gate and pipeline gate now green.
- 🧪 Tests: `npm run check:content` — all 13 gates pass.
- 📁 Files: 4 SVGs + 4 dark variants placed; 2 topic files updated from markers to `<Figure>`; manifest flipped to `placed`; tasks.md G2 row marked done with auto:gates evidence.
- 🔁 Next prompts: G3 independent review (separate run), then G4 Urdu mirror, then G6 assets / G7 publish.
- 🧠 Reflection: Previous attempt left figures as prompt-only markers and G2 unmarked; both resolved in this pass.

## Handoff (for CEO and agents)

- Shipped / changed: 4 rendered SVG figures (concept-map, 2 tables, diagram) placed into topic-01.mdx and topic-02.mdx; manifest at specs/content/gqur-301/figures/unit-12.md now shows all rows `placed`; G2 en-draft marked done with auto:gates evidence at specs/content/gqur-301/reviews/unit-12/G2/20261021T065608298Z-gates.json.
- Decisions the team must respect: Codex not used for SVG authoring (authored directly per generate-figures fallback path); `<desc>` in each SVG matches carrier `alt` verbatim (gate requires exact match).
- Pending / next owner: G3 independent review (separate fresh reviewer run); G4 Urdu mirror (separate job); `.ur.svg` variants for all 4 figures (G4/G5 scope).
- Paperclip issues affected: none directly; this was a branch-local crew job.

## Evaluation notes (flywheel)

- Failure modes observed: SVG `<desc>` must exactly match `<Figure alt>` text; a mismatch fails check:figures even when the asset exists.
- Graders run and results (PASS/FAIL): check:content — all PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
