---
id: 0044
title: Author EFMP-301 attention spotlight figure
stage: general
date: 2026-09-24
surface: agent
model: GPT-5
feature: none
branch: 022-author-efmp-301
user: user
command: Author requested schematic SVG figure fig-U4-1
labels: ["efmp-301", "figure", "svg", "unit-04"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-301/unit-04/fig-U4-1.svg
  - history/prompts/general/0044-author-efmp301-attention-spotlight-figure.general.prompt.md
tests:
  - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-04/fig-U4-1.svg static/img/figures/efmp-301/unit-04/fig-U4-1.svg
  - node scripts/check-figures.mjs --course efmp-301 (known unrelated incomplete-unit findings)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 4, topic 4.1).

Figure identity: id fig-U4-1, Kind diagram, topic_label 4.1. Target path (write exactly here): static/img/figures/efmp-301/unit-04/fig-U4-1.svg

Marker prompt (verbatim): clean flat vector diagram, labelled, high contrast. A classroom scene drawn as flat shapes: a teacher and blackboard at the top with a wide spotlight beam falling on the task and the pupil at a desk inside the beam; outside the beam, four grey distractor shapes labelled "road noise", "heat", "hunger", "neighbour's chatter". A second, split beam labelled "divided attention" falls on two desks at once with a note "each gets less". High contrast, meaning by shape and label

Marker alt (verbatim): A diagram of attention as a spotlight: the task and one pupil sit inside the beam while distractors sit outside it, and a split beam labelled divided attention lights two desks at once with a note that each gets less.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A diagram of attention as a spotlight: the task and one pupil sit i...") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-04/fig-U4-1.svg and report the file size in bytes.

## Response snapshot

Created the requested light-theme attention-spotlight SVG at the specified path. It uses the published token block, the required accessibility metadata and wordmark, and contains a labelled focused-attention classroom panel plus a labelled divided-attention split-beam panel.

## Outcome

- ✅ Impact: Added the requested instructional schematic figure.
- 🧪 Tests: Optimization passed at 5,497 bytes; the course-wide figure check only reports other still prompt-only Unit 4 markers.
- 📁 Files: One SVG asset and this request record.
- 🔁 Next prompts: Place the remaining Unit 4 figures to clear the course-wide rendered-figure gate.
- 🧠 Reflection: The diagram relies on labels, differing shapes and dashed split beams as well as palette accents.

## Evaluation notes (flywheel)

- Failure modes observed: Course-level figure completeness is outside this single-asset request.
- Graders run and results (PASS/FAIL): optimize: PASS; check-figures course completeness: FAIL, unrelated pre-existing markers.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
