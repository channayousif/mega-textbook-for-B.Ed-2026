---
id: 0065
title: Author measurement facts table
stage: misc
date: 2026-09-24
surface: agent
model: gpt-5
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: user
command: author SVG figure fig-U5-2
labels: ["efmp-301", "unit-05", "figure", "svg"]
links:
  spec: specs/022-author-efmp-301/spec.md
  ticket: null
  adr: history/adr/0024-claude-codex-visual-boundary.md
  pr: null
files:
 - static/img/figures/efmp-301/unit-05/fig-U5-2.svg
 - history/prompts/022-author-efmp-301/0065-author-measurement-facts-table.misc.prompt.md
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-05/fig-U5-2.svg static/img/figures/efmp-301/unit-05/fig-U5-2.svg (pass, 5.9 KB)
 - node scripts/check-figures.mjs --course efmp-301 --unit 05 (blocked by other unplaced Unit 5 figures)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 5, topic 5.1).

Figure identity: id fig-U5-2, Kind table, topic_label 5.1. Target path (write exactly here): static/img/figures/efmp-301/unit-05/fig-U5-2.svg

Marker prompt (verbatim): clean flat vector comparison table, labelled, high contrast, four columns and four rows. Columns: "what a test does", "the fact", "what it does NOT show", "the teacher's stance". Row 1 the score: a number from a standardised test, mean 100, deviation 15 / a summary of performance on the sampled tasks / one source of evidence, never a verdict. Row 2 the band: 85 to 115 covers about two-thirds of people / that those outside the band are worth less / bands describe, they do not decide. Row 3 the prediction: predicts school performance moderately well / almost nothing else a school grows / use for support decisions, not labels. Row 4 the history: early tests ranked people unjustly / that today's tests are free of that risk / know the history, hold the humility. High contrast

Marker alt (verbatim): A table of four measurement facts - the score, the band, the prediction and the history - each against the fact, what it does not show, and the teacher's stance.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A table of four measurement facts") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-05/fig-U5-2.svg and report the file size in bytes.

## Response snapshot

Created the requested table SVG with the exact light palette token block, accessible title and description, system font stack, single required wordmark, four columns and four content rows. Optimized size: 5,995 bytes.

## Outcome

- ✅ Impact: Added the requested EFMP-301 Unit 5 measurement-facts comparison figure.
- 🧪 Tests: The SVG optimizer passed. The Unit 5 figure gate remains blocked by other prompt-only figures, not this asset.
- 📁 Files: One SVG asset and this prompt-history record.
- 🔁 Next prompts: Place all planned Unit 5 figures in the topic pages before running the complete figure gate.
- 🧠 Reflection: Kept the asset self-contained and used table labels and positions, rather than colour, to communicate its distinctions.

## Evaluation notes (flywheel)

- Failure modes observed: ImageMagick cannot rasterize CSS custom properties, so it was not used for preview.
- Graders run and results (PASS/FAIL): optimize-figure PASS; check-figures BLOCKED by unrelated unplaced figures.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Render the asset through the site build when the Unit 5 content placement is in scope.
