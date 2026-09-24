---
id: 0052
title: "Author developing pupil concept map"
stage: misc
date: 2026-09-24
surface: agent
model: GPT-5 Codex
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: M Yousif Channa
command: "author fig-U2-5 SVG"
labels: ["EFMP-301", "Unit 2", "cognitive emotional social development", "SVG", "concept map"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-301/unit-02/fig-U2-5.svg
 - history/prompts/022-author-efmp-301/0052-author-developing-pupil-concept-map.misc.prompt.md
tests:
 - "npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-02/fig-U2-5.svg static/img/figures/efmp-301/unit-02/fig-U2-5.svg (PASS, 3.7 KB)"
 - "SVG static requirement audit (PASS, 3835 bytes)"
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 2, topic 2.3).

Figure identity: id fig-U2-5, Kind concept-map, topic_label 2.3. Target path (write exactly here): static/img/figures/efmp-301/unit-02/fig-U2-5.svg

Marker prompt (verbatim): clean flat vector concept map, labelled, high contrast. A central node "the developing pupil" with three solid-linked domain branches. Branch "cognitive": how thinking changes with age; classroom signs - conservation questions answered differently by age, rule-following in multi-step tasks, jokes that land differently. Branch "emotional": from feelings to their regulation; classroom signs - crying at wrong answers fading over the year, pride in finished work, fear of new tasks. Branch "social": attachment, play and the peer group; classroom signs - who plays with whom, the isolated pupil, cooperative work becoming possible. Dashed arrows connect the three branches pairwise, labelled "each feeds the others"

Marker alt (verbatim): A concept map of the developing pupil with three domain branches - cognitive, emotional and social - each carrying classroom signs, and dashed arrows showing that each domain feeds the others.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A concept map of the developing pupil") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern. The dashed pairwise arrows must be dashed, not merely a different colour.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the .bg / .panel / .ink / .muted / .h / .sh / .body / .small / .wm classes from the boilerplate.
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-02/fig-U2-5.svg and report the file size in bytes.

## Response snapshot

Created the requested light-theme SVG concept map at the exact target path. It contains the central developing-pupil node, three solid-linked labelled domains with classroom signs, and three dashed pairwise arrows labelled "each feeds the others".

## Outcome

- ✅ Impact: Authored the EFMP-301 Unit 2 cognitive, emotional and social development concept-map asset.
- 🧪 Tests: SVG optimisation and a static requirement audit passed.
- 📁 Files: Added the SVG asset and this prompt-history record.
- 🔁 Next prompts: The calling authoring workflow may place the figure, create its Urdu mirror, and derive the dark variant.
- 🧠 Reflection: Position, labels and dashed connectors preserve the three-domain relationship without relying on colour.

## Evaluation notes (flywheel)

- Failure modes observed: The temporary SVG-to-PNG visual preview could not render CSS variables in the available ImageMagick installation; static audit and optimiser output were unaffected.
- Graders run and results (PASS/FAIL): optimize-figure PASS; static requirement audit PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): Inspect the committed SVG through the site preview when browser rendering is available.
