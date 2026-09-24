---
id: "0035"
title: "Author GICT Concept Map"
stage: general
date: 2026-09-23
surface: agent
model: gpt-5
feature: none
branch: 020-author-gict-300
user: "M Yousif Channa"
command: "author fig-U1-1 SVG"
labels: [svg, concept-map, gict-300, accessibility]
links:
  spec: null
  ticket: null
  adr: "history/adr/0024-claude-codex-visual-production-boundary.md"
  pr: null
files:
  - static/img/figures/gict-300/unit-01/fig-U1-1.svg
tests:
  - npm run optimize:figure -- --svg static/img/figures/gict-300/unit-01/fig-U1-1.svg static/img/figures/gict-300/unit-01/fig-U1-1.svg
  - custom SVG contract checks (pass)
  - node scripts/check-figures.mjs (expected repository-wide placement failures)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook repository. Your working directory is the repository root.

FIGURE IDENTITY:
- id: fig-U1-1
- Kind (archetype): concept-map
- topic_label: 1.1
- Target path (write the file here, exactly): static/img/figures/gict-300/unit-01/fig-U1-1.svg

MARKER CONTENT (verbatim):
- prompt: clean flat vector concept map, central rounded node labelled "Computer literacy" with five outer boxes joined by lines: "operate a device", "handle files", "create documents", "find and judge information", "communicate and stay safe"; clean flat vector, labelled, high contrast, no colour-only meaning; landscape
- alt: Concept map with computer literacy at the centre and five skill branches: operating a device, handling files, creating documents, finding and judging information, and communicating and staying safe.

HARD RULES (follow exactly):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (alt's first clause) + <desc id="d"> (full alt).
- PASTE the published light :root token block verbatim (read it from .claude/skills/generate-figures/references/svg-authoring.md, the GENERATED figure-palette-light block, or from scripts/lib/figure-palette.mjs). No hex anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the .bg / .panel / .ink / .muted / .h / .wm / .ah classes from the boilerplate in .claude/skills/generate-figures/references/svg-authoring.md; add custom classes only when the boilerplate ones do not cover the need.
- Keep the file under 20 KB; hand-authored flat SVGs land at 2-8 KB.

INSTRUCTION: Read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs first to learn the exact boilerplate, token block and rules. Then author the completed SVG for the marker content above and write it to static/img/figures/gict-300/unit-01/fig-U1-1.svg. Report the file size in bytes when done.

## Response snapshot

Created and optimized the accessible light-theme SVG concept map at the requested path. It is 2,615 bytes and passed the SVG contract checks; the repository-wide figure gate remains red only because this task did not place the asset into the topic or advance its manifest row.

## Outcome

- ✅ Impact: Authored the requested GICT-300 Unit 1 computer-literacy concept map SVG.
- 🧪 Tests: Optimizer and all targeted SVG contract checks passed; repository-wide figure gate has unrelated and expected unplaced-marker findings.
- 📁 Files: static/img/figures/gict-300/unit-01/fig-U1-1.svg
- 🔁 Next prompts: Place the asset and advance its manifest row only when the broader figure-rendering pass is requested.
- 🧠 Reflection: A self-contained tokenized SVG can satisfy both light-theme accessibility and future dark-variant generation without embedded media queries.

## Evaluation notes (flywheel)

- Failure modes observed: ImageMagick cannot preview SVG CSS custom properties, so visual preview was unavailable; structural and optimizer validation passed.
- Graders run and results (PASS/FAIL): optimize-figure PASS; targeted SVG contract checks PASS; check-figures FAIL only for existing and intentionally unplaced figure markers.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Use a browser-based SVG preview that supports CSS custom properties if a visual rendering check is required.
