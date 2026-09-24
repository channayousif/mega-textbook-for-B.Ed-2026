---
id: 0063
title: Author constructivism concept map
stage: misc
date: 2026-09-24
surface: agent
model: GPT-5
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: user
command: direct figure authoring
labels: ["efmp-301", "unit-03", "concept-map", "svg"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-301/unit-03/fig-U3-8.svg
 - history/prompts/022-author-efmp-301/0063-author-constructivism-concept-map.misc.prompt.md
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-03/fig-U3-8.svg static/img/figures/efmp-301/unit-03/fig-U3-8.svg (pass, 4.4 KB)
 - focused SVG structural, accessibility, palette, and byte-budget assertions (pass)
 - node scripts/measure-figure-text.mjs static/img/figures/efmp-301/unit-03/fig-U3-8.svg (blocked: Chromium sandbox startup denied)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 3, topic 3.4).

Figure identity: id fig-U3-8, Kind concept-map, topic_label 3.4. Target path (write exactly here): static/img/figures/efmp-301/unit-03/fig-U3-8.svg

Marker prompt (verbatim): clean flat vector concept map, labelled, high contrast. A central node "constructivism" with four solid-linked claims: "the learner builds understanding, it is not delivered", "prior knowledge is the building material", "activity and talk are the tools", "the teacher designs the site". From the central node, two further linked nodes: "psychological constructivism - the individual organises experience (Piaget)" and "social constructivism - understanding is built with assistance (Vygotsky, Bruner)". Attached to the social node, two small boxes: "zone of proximal development: what the pupil can do with help but not yet alone" and "scaffolding: temporary support, removed as it is stood on". High contrast

Marker alt (verbatim): A concept map of constructivism with its four claims at the centre, linked to psychological constructivism (the individual organises experience) and social constructivism (understanding is built with assistance), with the zone of proximal development and scaffolding attached.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A concept map of constructivism with its four claims at the centre,...") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-03/fig-U3-8.svg and report the file size in bytes.

## Response snapshot

Authored the requested light concept-map SVG at the exact target path using the published palette and required accessibility metadata. It is 4,546 bytes after optimisation and passes focused source validation.

## Outcome

- ✅ Impact: Added one light SVG schematic for the EFMP-301 Unit 3 constructivism concept map.
- 🧪 Tests: SVG optimisation and focused source assertions passed; rendered-text measurement was blocked by Chromium sandbox startup.
- 📁 Files: SVG figure and this prompt history record.
- 🔁 Next prompts: Generate derived variants and place the figure through the course workflow.
- 🧠 Reflection: Preserved the marker contract, including its prompt and alt text, without modifying the manifest.

## Evaluation notes (flywheel)

- Failure modes observed: None at authoring time.
- Graders run and results (PASS/FAIL): optimise-figure PASS; focused source assertions PASS; measure-figure-text BLOCKED by sandbox.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): Inspect at rendered textbook width after placement.
