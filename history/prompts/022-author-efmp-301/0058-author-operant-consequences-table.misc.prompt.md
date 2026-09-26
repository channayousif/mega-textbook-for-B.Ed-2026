---
id: 0058
title: Author operant consequences table
stage: misc
date: 2026-09-24
surface: agent
model: GPT-5 Codex
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: user
command: author EFMP-301 Unit 3 figure fig-U3-3
labels: ["efmp-301", "unit-03", "figure", "svg", "table"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-301/unit-03/fig-U3-3.svg
 - history/prompts/022-author-efmp-301/0058-author-operant-consequences-table.misc.prompt.md
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-03/fig-U3-3.svg static/img/figures/efmp-301/unit-03/fig-U3-3.svg (pass, 4.7 KB)
 - SVG structural assertion script (pass)
 - npm run check:figures -- --course efmp-301 (expected fail: other Unit 3 figures remain prompt-only)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 3, topic 3.1).

Figure identity: id fig-U3-3, Kind table, topic_label 3.1. Target path (write exactly here): static/img/figures/efmp-301/unit-03/fig-U3-3.svg

Marker prompt (verbatim): clean flat vector comparison table, labelled, high contrast, four columns and five rows. Columns: "consequence", "what it is", "what it makes more or less likely", "what it risks". Rows: praise for a good answer / something wanted is added / good answers more frequent / praise inflation, dependence on the teacher; star chart for completed work / something wanted is added / completed work more frequent / copying rewarded if completion is all that is checked; scolding stops when seatwork is done / something disliked is removed / finishing work more frequent / pupils only work when scolded; scolding for calling out / something disliked is added / calling out less frequent / fear, avoidance of the subject, underground behaviour; a star removed for talking / something wanted is removed / talking less frequent / the chart becomes a threat rather than a prize. High contrast

Marker alt (verbatim): A table of five classroom consequences - praise, a star chart, scolding that stops, scolding for calling out, and a removed star - each against what it is, what it makes more or less likely, and what it risks.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A table of five classroom consequences") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-03/fig-U3-3.svg and report the file size in bytes.

## Response snapshot

Created the requested compact SVG comparison table at the specified path. It uses the published light token block, exact accessibility metadata and wordmark, and contains all four headers and five supplied classroom-consequence rows. The optimized file is 4,811 bytes.

## Outcome

- ✅ Impact: Added the requested EFMP-301 Unit 3 table schematic only.
- 🧪 Tests: SVG optimizer and structural assertions passed. The course-wide figure gate still reports other unplaced Unit 3 figures.
- 📁 Files: static/img/figures/efmp-301/unit-03/fig-U3-3.svg
- 🔁 Next prompts: Derive dark variants only through the repository build script when the figure set is ready.
- 🧠 Reflection: The table’s labels and grid position carry every distinction independently of colour.

## Evaluation notes (flywheel)

- Failure modes observed: Course-wide visual-density gate cannot pass until the remaining prompt-only Unit 3 figures are placed.
- Graders run and results (PASS/FAIL): optimize: PASS; structural assertions: PASS; check:figures: expected unit-level FAIL.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Validate the full Unit 3 figure set once each remaining marker is placed.
