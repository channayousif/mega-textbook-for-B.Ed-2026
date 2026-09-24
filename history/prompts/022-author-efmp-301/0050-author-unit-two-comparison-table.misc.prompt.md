---
id: 0050
title: author unit two comparison table
stage: misc
date: 2026-09-24
surface: agent
model: Codex
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: M Yousif Channa
command: author one EFMP-301 schematic SVG
labels: ["efmp-301", "unit-02", "table", "svg"]
links:
  spec: null
  ticket: null
  adr: ADR-0024
  pr: null
files:
 - static/img/figures/efmp-301/unit-02/fig-U2-2.svg
 - history/prompts/022-author-efmp-301/0050-author-unit-two-comparison-table.misc.prompt.md
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-02/fig-U2-2.svg static/img/figures/efmp-301/unit-02/fig-U2-2.svg (PASS)
 - targeted structural SVG assertions (PASS)
 - node scripts/check-figures.mjs --course efmp-301 --unit 02 (expected broader Unit 2 placement findings)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 2, topic 2.1).

Figure identity: id fig-U2-2, Kind table, topic_label 2.1. Target path (write exactly here): static/img/figures/efmp-301/unit-02/fig-U2-2.svg

Marker prompt (verbatim): clean flat vector comparison table, labelled, high contrast, four columns and three rows. Columns: "engine", "what it is", "an everyday example", "what a teacher can do". Row 1 growth: physical increase, measured in centimetres / a pupil a head taller than last year / adjust the desk and the seating plan. Row 2 maturation: a built-in programme unfolding with age / puberty arriving on its own schedule / wait, and prepare the pupil for it. Row 3 learning: change through experience and practice / knowing the birds of the schoolyard / teach it, and check the teaching worked

Marker alt (verbatim): A table comparing the three engines of development - growth, maturation and learning - against what each is, an everyday example, and what a teacher can do about it.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A table comparing the three engines of development") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the .bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .wm classes from the boilerplate (a .grid table-rule class is ideal for table lines).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-02/fig-U2-2.svg and report the file size in bytes.

## Response snapshot

Created the requested light comparison-table SVG with the prescribed accessibility metadata, exact palette block, system font stack, labels, grid rules, numbered rows, and one wordmark. Optimisation reduced the SVG to 3,510 bytes; no dark variant was created.

## Outcome

- ✅ Impact: A complete EFMP-301 Unit 2 comparison-table figure source now exists at the requested path.
- 🧪 Tests: Optimisation and targeted structural checks passed. The broader figure gate reports separate prompt-only and unplaced figures in Unit 2.
- 📁 Files: The requested SVG and this PHR were created.
- 🔁 Next prompts: Place the figure in its MDX and update the manifest only when the requested lifecycle transition is authorised.
- 🧠 Reflection: Labels, row numbers, and grid geometry preserve the comparison without relying on colour.

## Evaluation notes (flywheel)

- Failure modes observed: The complete Unit 2 gate cannot pass until the separately planned figures are rendered and placed.
- Graders run and results (PASS/FAIL): optimise PASS; structural checks PASS; figure gate reports expected broader Unit 2 placement findings.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Render and place the remaining planned Unit 2 figures when authorised.
