---
id: 0061
title: Author Bandura observation flowchart
stage: misc
date: 2026-09-24
surface: agent
model: GPT-5
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: M Yousif Channa
command: direct user request
labels: ["efmp-301", "unit-03", "bandura", "svg", "flowchart"]
links:
  spec: specs/022-author-efmp-301/spec.md
  ticket: null
  adr: history/adr/0024-capability-based-claude-and-codex-visual-authoring.md
  pr: null
files:
 - static/img/figures/efmp-301/unit-03/fig-U3-6.svg
 - history/prompts/022-author-efmp-301/0061-author-bandura-observation-flowchart.misc.prompt.md
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-03/fig-U3-6.svg static/img/figures/efmp-301/unit-03/fig-U3-6.svg (pass)
 - source-level SVG requirement checks (pass)
 - node scripts/measure-figure-text.mjs static/img/figures/efmp-301/unit-03/fig-U3-6.svg (blocked: Chromium sandbox startup)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 3, topic 3.3).

Figure identity: id fig-U3-6, Kind flowchart, topic_label 3.3. Target path (write exactly here): static/img/figures/efmp-301/unit-03/fig-U3-6.svg

Marker prompt (verbatim): clean flat vector flowchart, labelled, high contrast, four boxes in a left-to-right chain with arrows, each with a classroom instance beneath. Box 1 "attention: the pupil notices the model" - instance "the pupil watches how the teacher treats the first wrong answer". Box 2 "retention: the pupil remembers what was seen" - instance "remembers that the error was worked through, not mocked". Box 3 "reproduction: the pupil can do the behaviour" - instance "answers wrongly out loud without hiding". Box 4 "motivation: the outcome makes it worth doing" - instance "sees the wrong answer lead to help, not shame". A note under the chain: "all four must be present; a missing step is a missing lesson"

Marker alt (verbatim): A flowchart of Bandura's four observational-learning steps - attention, retention, reproduction and motivation - each with a classroom instance, and a note that all four must be present.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A flowchart of Bandura's four observational-learning steps") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-03/fig-U3-6.svg and report the file size in bytes.

## Response snapshot

Created the single light-theme SVG for fig-U3-6, preserving the marker text and alt text. The source is optimized, structurally checked, and remains below the 20 KB budget; no dark variant was authored.

## Outcome

- ✅ Impact: Added the requested accessible Bandura observational-learning flowchart.
- 🧪 Tests: Optimizer and source-level SVG requirement checks passed; browser-based text measurement could not start in the sandbox.
- 📁 Files: Added the SVG source and this request record.
- 🔁 Next prompts: Derive dark and Urdu variants only when the figure-placement workflow calls for them.
- 🧠 Reflection: Numbered panels and arrows carry the ordered process independently of the shared accent colour.

## Evaluation notes (flywheel)

- Failure modes observed: The text-measurement script could not launch Chromium because the container sandbox denied its startup; ImageMagick could not render CSS variable fills.
- Graders run and results (PASS/FAIL): optimize-figure PASS; source-level requirement checks PASS; measure-figure-text BLOCKED by environment.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run the text-measurement script in the normal CI or developer environment with a permitted Chromium sandbox.
