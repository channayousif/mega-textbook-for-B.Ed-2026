---
id: 0056
title: Author classical conditioning diagram
stage: misc
date: 2026-09-24
surface: agent
model: gpt-5
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: user
command: author schematic SVG fig-U3-1
labels: ["efmp-301", "unit-03", "figure", "svg"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-301/unit-03/fig-U3-1.svg
 - history/prompts/022-author-efmp-301/0056-author-classical-conditioning-diagram.misc.prompt.md
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-03/fig-U3-1.svg static/img/figures/efmp-301/unit-03/fig-U3-1.svg (pass, 4.7 KB)
 - Direct SVG contract scan (pass)
 - node scripts/measure-figure-text.mjs static/img/figures/efmp-301/unit-03/fig-U3-1.svg (blocked, Chromium sandbox shutdown restriction)
 - node scripts/check-figures.mjs (blocked by existing prompt-only Unit 3 figures)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 3, topic 3.1).

Figure identity: id fig-U3-1, Kind diagram, topic_label 3.1. Target path (write exactly here): static/img/figures/efmp-301/unit-03/fig-U3-1.svg

Marker prompt (verbatim): clean flat vector diagram, labelled, high contrast, two stacked panels. Upper panel titled "before conditioning": a bell icon with no response beside it (a small crossed-out droplet), and separately a plate of food with a label "salivation" and an arrow between them. Lower panel titled "after conditioning": the bell alone with the label "salivation" and an arrow, plus three small labels "bell: neutral stimulus becomes conditioned stimulus", "food: unconditioned stimulus", "salivation: response now triggered by the bell". High contrast, meaning by shape and label, not colour

Marker alt (verbatim): A two-panel diagram of classical conditioning: before conditioning, the bell produces no response while food produces salivation; after conditioning, the bell alone produces salivation.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A two-panel diagram of classical conditioning: before conditioning,...") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-03/fig-U3-1.svg and report the file size in bytes.

## Response snapshot

Authored the light-only two-panel classical-conditioning schematic at the requested path. It includes the required accessible title and full description, the exact published light token block, mandatory classes, one bottom-right wordmark, and icon-plus-label distinctions for the bell, no response, food, and salivation.

## Outcome

- ✅ Impact: Added the requested EFMP-301 Unit 3 figure asset without changing authored prose, markers, manifest rows, or dark variants.
- 🧪 Tests: Optimizer passed at 4,828 bytes; direct contract scan passed. Browser measurement could not launch because the environment blocks Chromium sandbox shutdown. The repository-wide figure gate reported only pre-existing prompt-only Unit 3 figure placement gaps.
- 📁 Files: Added fig-U3-1.svg and this prompt-history record.
- 🔁 Next prompts: Place the figure and update its manifest only when the corresponding content workflow authorises lifecycle transition.
- 🧠 Reflection: Kept the diagram compact while preserving all marker wording and redundant non-colour cues.

## Evaluation notes (flywheel)

- Failure modes observed: Browser-dependent measurement is unavailable in the restricted execution environment.
- Graders run and results (PASS/FAIL): optimize-figure PASS; static SVG contract scan PASS; measure-figure-text BLOCKED; check-figures BLOCKED by unrelated prompt-only rows.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run text measurement in an environment that permits Playwright Chromium lifecycle operations.
