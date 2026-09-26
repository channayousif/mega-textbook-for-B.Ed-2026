---
id: 0001
title: Author EFMP301 growth curve
stage: general
date: 2026-09-24
surface: agent
model: GPT-5
feature: none
branch: agent-ad57ca9469bfc4572
user: user
command: author-svg-figure
labels: ["efmp-301", "figure", "svg"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-301/unit-02/fig-U2-3.svg
 - history/prompts/general/0001-author-efmp301-growth-curve.general.prompt.md
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-02/fig-U2-3.svg static/img/figures/efmp-301/unit-02/fig-U2-3.svg (PASS, 4,426 bytes)
 - structural SVG metadata and policy assertions (PASS)
 - node scripts/measure-figure-text.mjs static/img/figures/efmp-301/unit-02/fig-U2-3.svg (BLOCKED: Chromium sandbox launch denied by environment)
 - npm run check:figures -- --file static/img/figures/efmp-301/unit-02/fig-U2-3.svg (BLOCKED by five pre-existing Unit 2 placement findings)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 2, topic 2.2).

Figure identity: id fig-U2-3, Kind diagram, topic_label 2.2. Target path (write exactly here): static/img/figures/efmp-301/unit-02/fig-U2-3.svg

Marker prompt (verbatim): clean flat vector line diagram, labelled, high contrast, landscape. A height-by-age growth curve from age 2 to 18 as a rising line with two clearly steeper phases: early childhood (ages 2 to 6) and adolescence (ages 10 to 16), each marked with a bracket and label "first steep phase" and "second steep phase (puberty)". Between them a flatter plateau labelled "school years: steady but slow". Alongside the curve, two horizontal bands at the foot of the figure labelled "gross motor skills: running, jumping, catching" and "fine motor skills: writing, threading, using scissors", each with a small arrow marking that fine-motor control matures later than gross

Marker alt (verbatim): A growth curve of height by age showing two steep phases in early childhood and adolescence, with a steady plateau between them, and two bands noting that gross motor skills mature before fine motor skills.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A growth curve of height by age") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the .bg / .stroke / .stroke-a / .grid / .ink / .muted / .h / .sh / .body / .small / .wm classes from the boilerplate.
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-02/fig-U2-3.svg and report the file size in bytes.

## Response snapshot

Created the requested light-theme SVG diagram with accessible metadata, the exact token block, labelled growth phases and motor-skill timing bands. Optimisation and structural-policy assertions passed; text-overflow measurement could not launch Chromium in this sandbox, and the repository-wide figure gate remains blocked by five existing unplaced Unit 2 figures.

## Outcome

- ✅ Impact: Added the requested EFMP-301 Unit 2 schematic figure.
- 🧪 Tests: Optimisation and structural-policy assertions passed; text-overflow measurement is sandbox-blocked and the repository-wide figure gate is blocked by existing unplaced figures.
- 📁 Files: SVG figure and this prompt history record.
- 🔁 Next prompts: Derive the dark variant only through the project build script when requested.
- 🧠 Reflection: The distinct bracket, label and arrow geometry ensures the meanings do not rely on colour.

## Evaluation notes (flywheel)

- Failure modes observed: Playwright's Chromium could not launch because the sandbox denied its shutdown operation.
- Graders run and results (PASS/FAIL): optimise:figure PASS; SVG structural assertions PASS; measure-figure-text BLOCKED by sandbox; check:figures BLOCKED by five existing content-placement findings.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
