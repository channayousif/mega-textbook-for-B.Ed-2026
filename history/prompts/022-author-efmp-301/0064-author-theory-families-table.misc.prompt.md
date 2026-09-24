---
id: 0064
title: Author theory families table
stage: misc
date: 2026-09-24
surface: agent
model: GPT-5
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: user
command: direct figure authoring
labels: ["efmp-301", "unit-03", "table", "svg"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-301/unit-03/fig-U3-9.svg
 - history/prompts/022-author-efmp-301/0064-author-theory-families-table.misc.prompt.md
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-03/fig-U3-9.svg static/img/figures/efmp-301/unit-03/fig-U3-9.svg (pass, 4.9 KB)
 - focused SVG structural, accessibility, palette, and byte-budget assertions (pass)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 3, topic 3.4).

Figure identity: id fig-U3-9, Kind table, topic_label 3.4. Target path (write exactly here): static/img/figures/efmp-301/unit-03/fig-U3-9.svg

Marker prompt (verbatim): clean flat vector comparison table, labelled, high contrast, four columns and five rows. Columns: "theory family", "what learning is", "the teacher's job", "what it misses". Row 1 behaviourism: change in observable behaviour / arrange consequences that train the wanted behaviour / understanding, meaning, the inside of the head. Row 2 cognitive: change in thinking, schemas rebuilt / order experience enactive to iconic to symbolic, meet prior schemas / the social setting where learning happens. Row 3 social learning: change through observation of models / be a deliberate model, aim attention and its outcomes / what is constructed, not just copied. Row 4 constructivism: understanding built by the learner with assistance / design the task, place and remove scaffolds in the zone / slow, hard to run with sixty pupils and a syllabus clock. High contrast

Marker alt (verbatim): A table comparing the four theory families - behaviourism, cognitive, social learning and constructivism - on what learning is, the teacher's job, and what each misses.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A table comparing the four theory families") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-03/fig-U3-9.svg and report the file size in bytes.

## Response snapshot

Authored the requested light comparison-table SVG at the exact target path using the published palette and required accessibility metadata. It is 4,967 bytes after optimisation and passes focused source validation.

## Outcome

- ✅ Impact: Added one light SVG schematic comparing four learning theory families for EFMP-301 Unit 3.
- 🧪 Tests: SVG optimisation and focused source assertions passed.
- 📁 Files: SVG figure and this prompt history record.
- 🔁 Next prompts: Generate derived variants and place the figure through the course workflow.
- 🧠 Reflection: Preserved the marker contract, including its prompt and alt text, without modifying the manifest.

## Evaluation notes (flywheel)

- Failure modes observed: None at authoring time.
- Graders run and results (PASS/FAIL): optimise-figure PASS; focused source assertions PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): Inspect at rendered textbook width after placement.
