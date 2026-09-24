---
id: 0047
title: Author EFMP-301 study strategies table
stage: general
date: 2026-09-24
surface: agent
model: GPT-5
feature: none
branch: 022-author-efmp-301
user: user
command: Author requested schematic SVG figure fig-U4-4
labels: ["efmp-301", "figure", "svg", "table", "unit-04"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-301/unit-04/fig-U4-4.svg
  - history/prompts/general/0047-author-efmp301-study-strategies-table.general.prompt.md
tests:
  - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-04/fig-U4-4.svg static/img/figures/efmp-301/unit-04/fig-U4-4.svg
  - static SVG contract assertions (pass)
  - npm run check:figures (known incomplete-unit findings)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 4, topic 4.2).

Figure identity: id fig-U4-4, Kind table, topic_label 4.2. Target path (write exactly here): static/img/figures/efmp-301/unit-04/fig-U4-4.svg

Marker prompt (verbatim): clean flat vector comparison table, labelled, high contrast, four columns and five rows. Columns: "strategy", "what it asks of memory", "what the evidence says", "one school-scale use". Rows: re-reading - exposure, no retrieval / creates familiarity and recognition, weak recall / the cheapest and weakest of the set. Highlighting - attention to selections, no processing / little benefit unless it selects for a reason / use to mark the three sentences that carry a lesson. Spaced retrieval - pulling material back out, over time / strong evidence for durable recall / the Monday five-question exit quiz, weekly. Elaboration - connecting new material to what is known / strengthens encoding and storage / the "explain it to your partner" minute. Teaching it to someone - retrieval plus elaboration plus organisation / among the strongest study behaviours known / pair revision where each teaches half the topic. High contrast

Marker alt (verbatim): A table of five study strategies - re-reading, highlighting, spaced retrieval, elaboration and teaching it to someone - on what each asks of memory, what the evidence says, and one school-scale use.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A table of five study strategies") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-04/fig-U4-4.svg and report the file size in bytes.

## Response snapshot

Created the requested high-contrast comparison table for the five study strategies. It includes accessible title and description metadata, the published token block, all requested boilerplate classes, labelled row and column distinctions, and one wordmark.

## Outcome

- ✅ Impact: Added the requested instructional SVG table.
- 🧪 Tests: Optimisation and static SVG contract assertions passed; the course-wide figure gate reports incomplete Unit 4 marker placement outside this request.
- 📁 Files: One SVG asset and this request record.
- 🔁 Next prompts: Place all Unit 4 figure markers to satisfy the rendered-figure gate.
- 🧠 Reflection: The table uses position, grid geometry, headers, and labels, so no instructional distinction depends on colour.

## Evaluation notes (flywheel)

- Failure modes observed: The text measurement script cannot launch Chromium in this sandbox; `npm run check:figures` cannot pass until existing Unit 4 prompt-only markers are placed.
- Graders run and results (PASS/FAIL): optimize: PASS; static SVG assertions: PASS; text measure: BLOCKED by sandbox; check-figures: FAIL only for unplaced Unit 4 markers outside this request.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run text measurement in an environment where Chromium can launch.
