---
id: 0048
title: Author EFMP-301 thinking concept map
stage: general
date: 2026-09-24
surface: agent
model: GPT-5
feature: none
branch: 022-author-efmp-301
user: user
command: Author requested schematic SVG figure fig-U4-5
labels: ["efmp-301", "figure", "svg", "concept-map", "unit-04"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-301/unit-04/fig-U4-5.svg
  - history/prompts/general/0048-author-efmp301-thinking-concept-map.general.prompt.md
tests:
  - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-04/fig-U4-5.svg static/img/figures/efmp-301/unit-04/fig-U4-5.svg
  - static SVG contract assertions
  - npm run check:figures -- --course efmp-301 (known incomplete-unit findings)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 4, topic 4.3).

Figure identity: id fig-U4-5, Kind concept-map, topic_label 4.3. Target path (write exactly here): static/img/figures/efmp-301/unit-04/fig-U4-5.svg

Marker prompt (verbatim): clean flat vector concept map, labelled, high contrast. A central node "thinking" with three solid-linked branches. Branch "concepts": learned categories with defining features; classroom instance - the Class 1 pupil building "sabzi" from market visits. Branch "problem-solving": strategies with names; sub-labels - algorithm, heuristic, means-ends, working backwards, analogy; classroom instance - Ayesha's bars. Branch "reasoning": from cases to rule (inductive) and from rule to case (deductive); classroom instance - "this teacher always marks late" versus the syllogism a pupil can check. High contrast

Marker alt (verbatim): A concept map of thinking with three branches - concepts as learned categories, problem-solving with its named strategies, and reasoning in its inductive and deductive forms - each with a classroom instance.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A concept map of thinking with three branches") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-04/fig-U4-5.svg and report the file size in bytes.

## Response snapshot

Created the requested high-contrast thinking concept map. It has a central thinking node, three solid-arrow branches, labelled distinctions and classroom examples, accessible title and description metadata, the published token block, and exactly one wordmark.

## Outcome

- ✅ Impact: Added the requested instructional SVG concept map.
- 🧪 Tests: Optimisation and static SVG contract assertions passed; the course-wide figure gate reports Unit 4 figure placement work outside this asset request.
- 📁 Files: One SVG asset and this request record.
- 🔁 Next prompts: Place the Unit 4 figure markers to satisfy the rendered-figure gate.
- 🧠 Reflection: Branch labels, panel geometry, arrows and written classroom examples retain meaning without colour.

## Evaluation notes (flywheel)

- Failure modes observed: The text-measurement browser cannot start in this sandbox; the course figure gate cannot pass until all existing Unit 4 markers are placed.
- Graders run and results (PASS/FAIL): optimize: PASS; static SVG assertions: PASS; text measure: BLOCKED by sandbox; check-figures: FAIL only for unplaced Unit 4 markers outside this request.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run text measurement in an environment where Chromium can launch.
