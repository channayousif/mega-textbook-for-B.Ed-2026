---
id: 0057
title: Author operant consequences flowchart
stage: misc
date: 2026-09-24
surface: agent
model: gpt-5
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: user
command: author schematic SVG fig-U3-2
labels: ["efmp-301", "unit-03", "figure", "svg", "flowchart"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-301/unit-03/fig-U3-2.svg
 - history/prompts/022-author-efmp-301/0057-author-operant-consequences-flowchart.misc.prompt.md
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-03/fig-U3-2.svg static/img/figures/efmp-301/unit-03/fig-U3-2.svg (pass, 4.4 KB)
 - Direct SVG contract scan (pass, 4,478 bytes)
 - node scripts/check-figures.mjs (blocked by other prompt-only Unit 3 figures)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 3, topic 3.1).

Figure identity: id fig-U3-2, Kind flowchart, topic_label 3.1. Target path (write exactly here): static/img/figures/efmp-301/unit-03/fig-U3-2.svg

Marker prompt (verbatim): clean flat vector flowchart, labelled, high contrast. A central box "a behaviour happens" with an arrow down to a decision "what follows it?" branching into four labelled quadrants: "something added that the pupil wants: positive reinforcement - behaviour becomes MORE frequent", "something removed that the pupil dislikes: negative reinforcement - behaviour becomes MORE frequent", "something added that the pupil dislikes: punishment - behaviour becomes LESS frequent", "something removed that the pupil wants: response cost - behaviour becomes LESS frequent". Each quadrant carries a small classroom example: praise for a good answer / seatwork finished and the scolding stops / scolding for calling out / a star removed for talking. High contrast, meaning by shape and label

Marker alt (verbatim): A flowchart of a behaviour and its consequence, branching into four quadrants: positive and negative reinforcement, which make behaviour more frequent, and punishment and response cost, which make it less frequent, each with a classroom example.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A flowchart of a behaviour and its consequence, branching into four...") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-03/fig-U3-2.svg and report the file size in bytes.

## Response snapshot

Authored the light-only flowchart at the requested path. It has one central behaviour node, a consequence decision, and four labelled quadrants for positive reinforcement, negative reinforcement, punishment, and response cost. Each quadrant includes the requested classroom example and redundant label and shape cues for add/remove and more/less frequent outcomes.

## Outcome

- ✅ Impact: Added the requested EFMP-301 Unit 3 SVG without changing prose, markers, manifest rows, or dark variants.
- 🧪 Tests: Optimizer and direct SVG contract scan passed. The repository-wide figure gate remains blocked by other Unit 3 prompt-only markers.
- 📁 Files: Added fig-U3-2.svg and this prompt-history record.
- 🔁 Next prompts: Place the figure and transition its lifecycle only when the content workflow authorises it.
- 🧠 Reflection: Routed lower-branch connectors around the outside of the upper cards to keep every label unobstructed.

## Evaluation notes (flywheel)

- Failure modes observed: The full Unit 3 figure gate cannot pass until the other planned figures are placed.
- Graders run and results (PASS/FAIL): optimize-figure PASS; static SVG contract scan PASS; check-figures BLOCKED by unrelated prompt-only rows.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run the full figure gate after all Unit 3 figures are placed.
