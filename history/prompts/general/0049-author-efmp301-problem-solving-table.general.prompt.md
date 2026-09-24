---
id: "0049"
title: "Author EFMP-301 problem-solving table"
stage: general
date: 2026-09-24
surface: agent
model: gpt-5
feature: none
branch: 022-author-efmp-301
user: user
command: "Author fig-U4-6 schematic SVG"
labels: ["efmp-301", "unit-04", "figure", "svg"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-301/unit-04/fig-U4-6.svg
  - history/prompts/general/0049-author-efmp301-problem-solving-table.general.prompt.md
tests:
  - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-04/fig-U4-6.svg static/img/figures/efmp-301/unit-04/fig-U4-6.svg
  - custom SVG requirement assertion, pass
  - npm run check:figures -- --file static/img/figures/efmp-301/unit-04/fig-U4-6.svg, blocked by existing unplaced Unit 4 figures
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 4, topic 4.3).

Figure identity: id fig-U4-6, Kind table, topic_label 4.3. Target path (write exactly here): static/img/figures/efmp-301/unit-04/fig-U4-6.svg

Marker prompt (verbatim): clean flat vector comparison table, labelled, high contrast, three columns and five rows. Columns: "strategy", "an everyday instance", "one obstacle it can hit". Rows: algorithm - the long-division steps / no algorithm exists for this problem, so the pupil is stuck. Heuristic (draw it, try a simpler case) - Ayesha's bars for the rickshaw problem / the drawing becomes the task and the question is forgotten. Means-ends analysis - compare where you are with the answer, shrink the biggest gap / the gap chosen is the easy one, not the blocking one. Working backwards - start from what is asked: what would produce it? / the start point itself is unclear, so the backwards chain has no first link. Analogy - this is like the water-pump question from last term / the likeness is superficial and the method is imported wrongly. High contrast

Marker alt (verbatim): A table of five problem-solving strategies - algorithm, heuristic, means-ends analysis, working backwards and analogy - each with an everyday instance and one obstacle it can hit.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A table of five problem-solving strategies") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-04/fig-U4-6.svg and report the file size in bytes.

## Response snapshot

Created the compact fig-U4-6 comparison-table SVG with the specified alt text, palette block, system font stack, boilerplate classes and one wordmark. The optimized file is 3,718 bytes.

## Outcome

- ✅ Impact: Added the requested EFMP-301 Unit 4 topic 4.3 schematic table.
- 🧪 Tests: Optimizer and focused SVG requirement assertion passed. The repository figure gate found only pre-existing Unit 4 placement failures outside this asset.
- 📁 Files: Added the SVG figure and this prompt history record.
- 🔁 Next prompts: Place planned figures in the Unit 4 topic files when requested.
- 🧠 Reflection: A labelled grid carries all five strategy comparisons without colour-only meaning.

## Evaluation notes (flywheel)

- Failure modes observed: Initial custom assertion expected 13 palette literals; the published token block correctly contains 14.
- Graders run and results (PASS/FAIL): optimize: PASS; custom SVG assertion: PASS; check:figures: FAIL due to unplaced Unit 4 figures outside this request.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run the figure gate again after the planned Unit 4 figures are placed in content.
