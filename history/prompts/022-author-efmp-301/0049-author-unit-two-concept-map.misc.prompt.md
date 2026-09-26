---
id: 0049
title: author unit two concept map
stage: misc
date: 2026-09-24
surface: agent
model: Codex
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: M Yousif Channa
command: author one EFMP-301 schematic SVG
labels: ["efmp-301", "unit-02", "concept-map", "svg"]
links:
  spec: null
  ticket: null
  adr: ADR-0024
  pr: null
files:
 - static/img/figures/efmp-301/unit-02/fig-U2-1.svg
 - static/img/figures/efmp-301/unit-02/fig-U2-1.dark.svg
 - history/prompts/022-author-efmp-301/0049-author-unit-two-concept-map.misc.prompt.md
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-02/fig-U2-1.svg static/img/figures/efmp-301/unit-02/fig-U2-1.svg (PASS)
 - targeted figures:variants generation and freshness check (PASS)
 - structural SVG assertions and git diff --check (PASS)
 - npm run check:figures (expected existing Unit 2 lifecycle findings)
 - node scripts/measure-figure-text.mjs (blocked by Chromium sandbox shutdown permission)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 2, topic 2.1).

Figure identity: id fig-U2-1, Kind concept-map, topic_label 2.1. Target path (write exactly here): static/img/figures/efmp-301/unit-02/fig-U2-1.svg

Marker prompt (verbatim): clean flat vector concept map, labelled, high contrast. A central rounded node "development" with three solid-linked driver branches: "maturation" (unfolding with age, like puberty; arrives with time, not teaching), "learning" (change through experience, like knowing the birds of the schoolyard; arrives with practice and teaching), and "growth" (physical increase, like height; measured in centimetres). A fourth linked node "their interaction" sits below the three with a note "most classroom behaviour is a mix of all three". High contrast, meaning carried by shape and label, not colour

Marker alt (verbatim): A concept map with development at the centre, linked to three drivers - maturation, which unfolds with age; learning, which comes through experience; and growth, which is physical increase - with a note that most classroom behaviour is a mix of all three.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A concept map with development at the centre") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the .bg / .panel / .ink / .muted / .h / .wm classes from the boilerplate.
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.

Write the completed SVG to static/img/figures/efmp-301/unit-02/fig-U2-1.svg and report the file size in bytes.

## Response snapshot

Created the requested light concept-map SVG with the prescribed accessibility metadata, palette block, system font stack, labelled solid connectors and one wordmark. Optimisation reduced the source to 3,265 bytes, and its dark twin was deterministically derived.

## Outcome

- ✅ Impact: A complete EFMP-301 Unit 2 figure source now exists at the requested path.
- 🧪 Tests: Optimisation, target-only dark-variant freshness, structural assertions and whitespace checks passed. The text-measurement browser could not launch in the managed sandbox. The figure gate reports the separate prompt-only state of the rest of Unit 2.
- 📁 Files: The light SVG, derived dark SVG and this PHR were created.
- 🔁 Next prompts: Place the asset in its MDX and update the manifest only when the requested lifecycle transition is authorised.
- 🧠 Reflection: Labelled geometry and solid connectors preserve the concept map's meaning without relying on colour.

## Evaluation notes (flywheel)

- Failure modes observed: Chromium terminated at sandbox shutdown permission during text-geometry measurement; no source issue was reported.
- Graders run and results (PASS/FAIL): optimise PASS; targeted dark freshness PASS; structural checks PASS; figure gate reports expected broader Unit 2 placement findings.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run text measurement in an environment that permits Playwright Chromium shutdown.
