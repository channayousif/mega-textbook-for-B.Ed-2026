---
id: 0047
title: render and place GSOS-301 Unit 4 figures
stage: complete
date: 2026-10-22
surface: agent
model: longcat/LongCat-2.0
feature: gsos-301
branch: crew/gsos-301-u04-author
user: crew
command: author-unit / generate-figures
labels: [gsos-301, unit-04, figures, svg]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/gsos-301/unit-04/fig-U4-1.svg
  - static/img/figures/gsos-301/unit-04/fig-U4-1.dark.svg
  - static/img/figures/gsos-301/unit-04/fig-U4-2.svg
  - static/img/figures/gsos-301/unit-04/fig-U4-2.dark.svg
  - static/img/figures/gsos-301/unit-04/fig-U4-3.svg
  - static/img/figures/gsos-301/unit-04/fig-U4-3.dark.svg
  - static/img/figures/gsos-301/unit-04/fig-U4-4.svg
  - static/img/figures/gsos-301/unit-04/fig-U4-4.dark.svg
  - docs/semester-2/gsos-301/unit-04/topic-01.mdx
  - docs/semester-2/gsos-301/unit-04/topic-02.mdx
  - specs/content/gsos-301/figures/unit-04.md
  - specs/content/gsos-301/tasks.md
  - specs/content/gsos-301/reviews/unit-04/G2/20261022T022405266Z-gates.json
  - static/content-status.json
tests:
  - npm run check:content (all 13 gates pass)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is my whole task.

The brief specified authoring GSOS-301 Unit 4 from its approved content-spec, following the author-unit skill. The unit content was already authored in a prior attempt. The remaining work was to render the four schematic figures (fig-U4-1 diagram, fig-U4-2 table, fig-U4-3 concept-map, fig-U4-4 table), place them by replacing markers with `<Figure>` elements, update the manifest to `placed`, mark G2 en-draft done, and pass all content gates.

## Response snapshot

Authored four self-contained SVG schematics using the published boilerplate (light tokens only, dark variants derived via `npm run figures:variants`). All four passed optimization under 20 KB. Replaced all four `{/* FIGURE[...] */}` markers with `<Figure id=… src=… alt=… />` elements in topic-01.mdx and topic-02.mdx. Updated the figure manifest to `placed`. Generated G2 gate evidence. Marked G2 en-draft done with `auto:gates` initials. Rebuilt content-status.json. All 13 content gates pass.

## Outcome

- ✅ Impact: GSOS-301 Unit 4 now has all four figures rendered and placed; G2 en-draft marked done with valid gate evidence; all content gates pass.
- 🧪 Tests: npm run check:content — all 13 gates PASS (validate:content, check:pipeline-gate, check:depth-gate, check:figures, check:no-em-dash, check:no-answer-keys, check:concept-graph, check:bloom-bands, check:source-floor, check:licence, licence:map:check, check:content-status, check:docs-sync).
- 📁 Files: 4 schematic SVGs (+ 4 dark variants), 2 topic files (markers replaced), 1 manifest (placed), 1 tasks.md (G2 done), 1 gate evidence JSON + 8 log files, 1 content-status.json.
- 🔁 Next prompts: G3 en-review (independent review pass), then G4 ur-translation.
- 🧠 Reflection: The unit content was already well-authored; the gap was purely figure rendering and pipeline gate completion. The generate-figures skill's Claude-fallback path worked directly since the schematic archetypes are all shape-and-label (no Codex raster needed).

## Handoff (for CEO and agents)

- Shipped / changed: All four GSOS-301 Unit 4 figures authored as accessible SVGs with dark variants; markers replaced in both topic files; manifest updated to `placed`; G2 en-draft marked done with committed gate evidence; all content gates green.
- Decisions the team must respect: No em dash (U+2014) in any SVG `<text>` label; dark variants derived never authored by hand; `auto:gates` initials only for G2 (never G3/G5).
- Pending / next owner: G3 independent English review (separate review-unit skill run, different session); then G4 Urdu translation.
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: None in this pass. Prior attempt left figures at prompt-only and G2 unmarked.
- Graders run and results (PASS/FAIL): check:content all PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
