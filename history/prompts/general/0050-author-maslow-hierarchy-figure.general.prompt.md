---
id: 0050
title: Author Maslow Hierarchy Figure
stage: general
date: 2026-09-24
surface: agent
model: GPT-5 Codex
feature: none
branch: 022-author-efmp-301
user: Yousif Channa
command: author fig-U6-1 SVG
labels: ["efmp-301", "unit-06", "maslow", "svg"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-301/unit-06/fig-U6-1.svg
 - history/prompts/general/0050-author-maslow-hierarchy-figure.general.prompt.md
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-06/fig-U6-1.svg static/img/figures/efmp-301/unit-06/fig-U6-1.svg (pass, 4.2 KB)
 - static SVG structural and palette assertion (pass)
 - node scripts/measure-figure-text.mjs static/img/figures/efmp-301/unit-06/fig-U6-1.svg (blocked by sandboxed Chromium launch)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 6, topic 6.1).

Figure identity: id fig-U6-1, Kind diagram, topic_label 6.1. Target path (write exactly here): static/img/figures/efmp-301/unit-06/fig-U6-1.svg

Marker prompt (verbatim): clean flat vector diagram, labelled, high contrast, five rising steps from bottom left to top right like a staircase. Step 1 "physiological needs" with a small roti icon and the label "a hungry pupil cannot learn"; step 2 "safety" with a lock icon and "a frightened pupil cannot risk"; step 3 "belonging" with two figures and "an isolated pupil cannot join"; step 4 "esteem" with a star and "an unnoticed pupil cannot shine"; step 5 "self-actualization" with a rising arrow and "a supported pupil can become". A vertical arrow beside the steps reading "deficit needs first, then growth"

Marker alt (verbatim): Maslow's hierarchy drawn as five rising steps, each with a classroom instance: a hungry pupil cannot learn, a frightened pupil cannot risk, an isolated pupil cannot join, an unnoticed pupil cannot shine, a supported pupil can become.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "Maslow's hierarchy drawn as five rising steps, each with a classroo...") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-06/fig-U6-1.svg and report the file size in bytes.

## Response snapshot

Authored the requested compact, accessible staircase diagram with all five classroom instances, distinct icons, a vertical progression arrow, the exact light palette block and one wordmark. The optimized SVG is 4,318 bytes.

## Outcome

- ✅ Impact: Created the requested EFMP-301 Unit 6 Maslow hierarchy SVG.
- 🧪 Tests: Optimizer and static compliance assertions passed; browser-backed text geometry measurement was blocked by the sandbox's Chromium restriction.
- 📁 Files: Added the SVG and this prompt history record.
- 🔁 Next prompts: Derive the dark twin and place the figure only when the rendering workflow is requested.
- 🧠 Reflection: A numbered staircase plus named icons keeps the hierarchy legible even without colour.

## Evaluation notes (flywheel)

- Failure modes observed: The text-geometry script could not launch Chromium because the sandbox denied its shutdown operation.
- Graders run and results (PASS/FAIL): SVG optimizer PASS; static structure and palette assertions PASS; text geometry measurement BLOCKED.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run the geometry script in an environment that permits Playwright Chromium startup.
