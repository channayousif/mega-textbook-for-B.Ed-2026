---
id: 0068
title: Author EFMP301 U6 comparison table
stage: general
date: 2026-09-24
surface: agent
model: GPT-5
feature: none
branch: agent-ad57ca9469bfc4572
user: user
command: author one schematic SVG figure
labels: ["efmp-301", "unit-06", "svg", "figure"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-301/unit-06/fig-U6-2.svg
 - history/prompts/general/0068-author-efmp301-u6-comparison-table.general.prompt.md
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-06/fig-U6-2.svg static/img/figures/efmp-301/unit-06/fig-U6-2.svg
 - node scripts/check-figures.mjs (expected unrelated unit-level placement failures)
 - SVG structural token and prohibited-element checks
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 6, topic 6.1).

Figure identity: id fig-U6-2, Kind table, topic_label 6.1. Target path (write exactly here): static/img/figures/efmp-301/unit-06/fig-U6-2.svg

Marker prompt (verbatim): clean flat vector comparison table, labelled, high contrast, four columns and three rows. Columns: "theory", "the question it asks", "a school instance", "one limit". Row 1 Maslow: what must be met before growth can pull? / the midday meal that changed Class 3's afternoons / the strict order does not always hold. Row 2 Herzberg: is this a satisfaction problem or a dissatisfaction problem? / fans and water versus the chosen-topic project / built on adult workers, not pupils. Row 3 self-determination: are autonomy, competence and relatedness being fed? / the project that ran past the bell / three needs fed together, not one at a time

Marker alt (verbatim): A table comparing Maslow, Herzberg and self-determination theory on the question each asks, a school instance, and one limit.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A table comparing Maslow, Herzberg and self-determination theory on...") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-06/fig-U6-2.svg and report the file size in bytes.

## Response snapshot

Authored the requested compact, accessible four-column comparison-table SVG at the exact target path. It carries the published light token block, a single wordmark, and redundant labelled plus shape distinctions for the three theory rows.

## Outcome

- ✅ Impact: Added the requested EFMP-301 Unit 6 table asset only.
- 🧪 Tests: SVG optimisation passed at 4.5 KB; focused structural checks passed. The repository-wide figure gate still reports existing unplaced Unit 6 markers outside this one-asset request.
- 📁 Files: static/img/figures/efmp-301/unit-06/fig-U6-2.svg; this PHR.
- 🔁 Next prompts: Place the remaining Unit 6 figures and derive variants in the broader rendering workflow.
- 🧠 Reflection: Used tokens and shape-plus-label redundancy to meet accessibility constraints.

## Evaluation notes (flywheel)

- Failure modes observed: Repository figure-gate failures were pre-existing broader Unit 6 placement gaps.
- Graders run and results (PASS/FAIL): optimise PASS; structural SVG checks PASS; full figure gate FAIL for unrelated unplaced markers.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Render the remaining planned Unit 6 figures before re-running the unit gate.
