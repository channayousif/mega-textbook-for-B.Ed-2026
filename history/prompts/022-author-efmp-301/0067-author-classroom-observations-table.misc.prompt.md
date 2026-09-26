---
id: 0067
title: Author classroom observations table
stage: misc
date: 2026-09-24
surface: agent
model: GPT-5
feature: 022-author-efmp-301
branch: agent-ad57ca9469bfc4572
user: owner
command: author fig-U5-4 SVG
labels: ["efmp-301", "unit-05", "figure", "svg", "accessibility"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-301/unit-05/fig-U5-4.svg
 - history/prompts/022-author-efmp-301/0067-author-classroom-observations-table.misc.prompt.md
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-05/fig-U5-4.svg static/img/figures/efmp-301/unit-05/fig-U5-4.svg (pass, 3.9 KB)
 - npm run check:figures -- --file static/img/figures/efmp-301/unit-05/fig-U5-4.svg (expected unit-level failures: four prompt-only markers are not placed)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 5, topic 5.2).

Figure identity: id fig-U5-4, Kind table, topic_label 5.2. Target path (write exactly here): static/img/figures/efmp-301/unit-05/fig-U5-4.svg

Marker prompt (verbatim): clean flat vector comparison table, labelled, high contrast, three columns and four rows. Columns: "what you see", "the common reading", "what this topic suggests". Row 1: the essay that reuses memorised phrases / earns the top mark / add a box for originality: what here could not have been written by anyone. Row 2: the pupil who finishes early and disturbs others / a discipline case / an unmet need: real problems, not more worksheets. Row 3: the pupil who asks a question the textbook does not answer / wasting time / divergent thinking doing its job: welcome it, then choose. Row 4: the gifted pupil who is also sociable and sporty / does not fit the stereotype / the stereotype is the defect: look in every group. High contrast

Marker alt (verbatim): A table of four classroom observations - the reused essay, the early finisher, the off-textbook question and the sociable gifted pupil - each against the common reading and what this topic suggests instead.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A table of four classroom observations") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-05/fig-U5-4.svg and report the file size in bytes.

## Response snapshot

Authored the accessible, compact, light-theme SVG comparison table with the exact palette token block, required title and description, and one bottom-right wordmark. The table has the requested three labelled columns and four classroom-observation rows.

## Outcome

- ✅ Impact: Added fig-U5-4 as a hand-authored schematic table for topic 5.2.
- 🧪 Tests: Optimisation passed at 3.9 KB. The figure gate reports the unit's unrelated unplaced prompt-only markers.
- 📁 Files: SVG figure and this prompt-history record.
- 🔁 Next prompts: Place the full Unit 5 figure set and derive locale/theme variants in the dedicated rendering pass.
- 🧠 Reflection: The required textual column headings and contents preserve all distinctions without reliance on colour.

## Evaluation notes (flywheel)

- Failure modes observed: xmllint is unavailable in the local environment; the optimiser successfully parsed and rewrote the SVG.
- Graders run and results (PASS/FAIL): optimize:figure PASS; check:figures unit-level FAIL because content markers remain prompt-only outside this request.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Render and place all Unit 5 markers before rerunning the unit-level figure gate.
