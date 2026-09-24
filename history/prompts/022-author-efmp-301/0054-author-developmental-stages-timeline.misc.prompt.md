---
id: "0054"
title: "Author developmental stages timeline"
stage: misc
date: 2026-09-24
surface: agent
model: GPT-5
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: "M Yousif Channa"
command: "author fig-U2-7 SVG"
labels: ["efmp-301", "unit-02", "topic-2.4", "svg", "timeline", "figure"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-301/unit-02/fig-U2-7.svg
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-02/fig-U2-7.svg static/img/figures/efmp-301/unit-02/fig-U2-7.svg
 - static SVG contract check (PASS)
 - npm run check:figures (expected existing unit-level failure: prompt-only markers remain unplaced)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 2, topic 2.4).

Figure identity: id fig-U2-7, Kind timeline, topic_label 2.4. Target path (write exactly here): static/img/figures/efmp-301/unit-02/fig-U2-7.svg

Marker prompt (verbatim): clean flat vector left-to-right timeline, labelled, high contrast, four stage bands along a single arrow from age 5 to 16. Band 1 "early primary (about 5-7): thinking led by how things look and feel; teach with real objects and pictures". Band 2 "middle primary (about 7-11): rules held over concrete objects; teach with materials, experiments, steps that can be reversed". Band 3 "early adolescence (about 11-14): reasoning about possibilities begins; teach with real problems, counter-examples, debate". Band 4 "later adolescence (about 14-16): systematic formal reasoning; teach with hypotheses, general claims to test, structured argument". A caption under the arrow reading "ages approximate; order is not"

Marker alt (verbatim): A left-to-right timeline of four developmental stage bands from early primary to later adolescence, each naming how thinking works at that band and what teaching suits it, with a caption noting that ages are approximate but the order is not.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure. For layout reference, an existing accepted timeline of the same course is static/img/figures/efmp-301/unit-01/fig-U1-3.svg.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A left-to-right timeline of four developmental stage bands") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the .bg / .panel / .stroke / .ink / .muted / .h / .sh / .body / .small / .wm classes from the boilerplate.
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-02/fig-U2-7.svg and report the file size in bytes.

## Response snapshot

Created and optimized the requested single-file developmental-stage timeline SVG. It uses the exact light palette block, accessible title and description, four labelled proportional age bands connected to one arrow, and one wordmark; the final size is 5,047 bytes.

## Outcome

- ✅ Impact: Authored fig-U2-7 for EFMP-301 Unit 2 topic 2.4.
- 🧪 Tests: Optimisation and static SVG contract checks passed. The repository-wide figure gate remains red because this task does not place the unit's prompt-only markers.
- 📁 Files: static/img/figures/efmp-301/unit-02/fig-U2-7.svg.
- 🔁 Next prompts: Localise, place, and derive variants during the later figure-production step.
- 🧠 Reflection: Proportional bands preserve the age span while wrapped labels retain the full thinking and teaching guidance.

## Evaluation notes (flywheel)

- Failure modes observed: ImageMagick could not render CSS variables for a local visual preview; targeted structural validation passed.
- Graders run and results (PASS/FAIL): optimise-figure PASS; static SVG contract PASS; check:figures EXPECTED UNIT-LEVEL FAIL.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): Inspect the SVG in a browser-capable environment during placement.
