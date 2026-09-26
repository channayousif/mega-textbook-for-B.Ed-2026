---
id: 0059
title: Author schema concept map
stage: misc
date: 2026-09-24
surface: agent
model: GPT-5 Codex
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: user
command: author EFMP-301 Unit 3 figure fig-U3-4
labels: ["efmp-301", "unit-03", "figure", "svg", "concept-map"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-301/unit-03/fig-U3-4.svg
 - history/prompts/022-author-efmp-301/0059-author-schema-concept-map.misc.prompt.md
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-03/fig-U3-4.svg static/img/figures/efmp-301/unit-03/fig-U3-4.svg (pass, 4.3 KB)
 - SVG structural assertion script (pass)
 - node scripts/measure-figure-text.mjs static/img/figures/efmp-301/unit-03/fig-U3-4.svg (blocked: sandbox prohibits Chromium's sandbox-host startup)
 - npm run check:figures -- --course efmp-301 (expected fail: Unit 3 source markers remain prompt-only)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 3, topic 3.2).

Figure identity: id fig-U3-4, Kind concept-map, topic_label 3.2. Target path (write exactly here): static/img/figures/efmp-301/unit-03/fig-U3-4.svg

Marker prompt (verbatim): clean flat vector concept map, labelled, high contrast. A central node "schema" with two curved arrows leaving it: "assimilation - new experience fitted into the existing schema (the child who calls every four-legged animal a cat meets a dog and files it under cat)" and "accommodation - the schema changes to fit the new experience (the child separates dog from cat and rebuilds the category)". Above the schema node a small box "Piaget: learning as reorganising thinking". Below, three linked nodes labelled "Bruner: enactive (doing it)", "Bruner: iconic (seeing it)", "Bruner: symbolic (the sign for it)" connected left to right by an arrow labelled "the order teaching should follow". High contrast, meaning by shape and label

Marker alt (verbatim): A concept map with schema at the centre, assimilation fitting new experience into the schema and accommodation changing the schema, above Piaget's framing, and below Bruner's three modes of representation - enactive, iconic, symbolic - in teaching order.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A concept map with schema at the centre, assimilation fitting new e...") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-03/fig-U3-4.svg and report the file size in bytes.

## Response snapshot

Created the requested compact SVG concept map at the specified path. It uses the published light token block, exact accessibility metadata and wordmark, and depicts Piaget's framing, a central schema, the two labelled cognitive movements and Bruner's ordered representations. The optimized file is 4,430 bytes.

## Outcome

- ✅ Impact: Added the requested EFMP-301 Unit 3 concept-map schematic only.
- 🧪 Tests: SVG optimizer and structural assertions passed. Browser text measurement is blocked by the sandbox; the course-wide figure gate still reports unplaced Unit 3 markers.
- 📁 Files: static/img/figures/efmp-301/unit-03/fig-U3-4.svg
- 🔁 Next prompts: Derive dark variants only through the repository build script when the figure set is ready.
- 🧠 Reflection: Labels, arrows, panel grouping and dashed association links preserve meaning without relying on colour.

## Evaluation notes (flywheel)

- Failure modes observed: Browser text measurement cannot launch because this sandbox blocks Chromium's sandbox host. The course-wide visual-density gate cannot pass until Unit 3's source markers are transitioned from prompt-only to placed and rendered.
- Graders run and results (PASS/FAIL): optimize: PASS; structural assertions: PASS; measure-figure-text: blocked by sandbox; check:figures: expected unit-level FAIL.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Validate the complete Unit 3 figure set after its remaining markers are placed.
