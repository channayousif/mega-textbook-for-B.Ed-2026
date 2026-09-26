---
id: 0045
title: Author EFMP-301 attention factors table
stage: general
date: 2026-09-24
surface: agent
model: GPT-5
feature: none
branch: 022-author-efmp-301
user: user
command: Author requested schematic SVG figure fig-U4-2
labels: ["efmp-301", "figure", "svg", "table", "unit-04"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-301/unit-04/fig-U4-2.svg
  - history/prompts/general/0045-author-efmp-301-attention-factors-table.general.prompt.md
tests:
  - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-04/fig-U4-2.svg static/img/figures/efmp-301/unit-04/fig-U4-2.svg
  - node scripts/check-figures.mjs --course efmp-301 (known incomplete-unit findings)
  - static SVG contract assertions (pass)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 4, topic 4.1).

Figure identity: id fig-U4-2, Kind table, topic_label 4.1. Target path (write exactly here): static/img/figures/efmp-301/unit-04/fig-U4-2.svg

Marker prompt (verbatim): clean flat vector comparison table, labelled, high contrast, three columns and six rows. Columns: "what pulls or shapes it", "in the classroom", "one teacher move". Rows: novelty - a new object or voice / the unannounced demonstration jar / let the object do the announcing. Contrast - difference against a background / the one coloured chalk line / use it for the single point that matters. Meaning - relevance to the learner / the story that starts with the pupils' own street / open with what this is for. Emotion - feeling attached to the event / the lesson about the flood they lived through / let the feeling carry the content. Task demand - how hard the task grips / copying competes with listening / one demand at a time. Expectation - what the perceiver already knows / the diagram obvious to the teacher / name the parts aloud before the puzzle. High contrast

Marker alt (verbatim): A table of six factors - novelty, contrast, meaning, emotion, task demand and expectation - each against how it appears in the classroom and one teacher move that uses it.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A table of six factors") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-04/fig-U4-2.svg and report the file size in bytes.

## Response snapshot

Created the requested high-contrast six-factor comparison table. It has the required three columns, accessibility metadata, published palette token block, boilerplate classes, and exactly one wordmark.

## Outcome

- ✅ Impact: Added the requested instructional SVG table.
- 🧪 Tests: Optimisation and static SVG contract assertions passed; the course-wide figure gate reports four pre-existing incomplete-unit placement findings.
- 📁 Files: One SVG asset and this request record.
- 🔁 Next prompts: Place the remaining Unit 4 figure markers to make the course-wide rendered-figure gate pass.
- 🧠 Reflection: Labels and the table grid preserve every distinction without reliance on colour.

## Evaluation notes (flywheel)

- Failure modes observed: The text-measurement browser could not start because the sandbox prevents Chromium's sandbox host from launching.
- Graders run and results (PASS/FAIL): optimize: PASS; static SVG assertions: PASS; check-figures: FAIL only for unplaced Unit 4 markers outside this request.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
