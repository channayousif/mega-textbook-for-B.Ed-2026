---
id: "0053"
title: "Author developmental domains table"
stage: misc
date: 2026-09-24
surface: agent
model: GPT-5
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: "M Yousif Channa"
command: "author fig-U2-6 SVG"
labels: ["efmp-301", "unit-02", "topic-2.3", "svg", "figure"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-301/unit-02/fig-U2-6.svg
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-02/fig-U2-6.svg static/img/figures/efmp-301/unit-02/fig-U2-6.svg
 - static SVG contract check (PASS)
 - node scripts/measure-figure-text.mjs static/img/figures/efmp-301/unit-02/fig-U2-6.svg (blocked: Chromium sandbox)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 2, topic 2.3).

Figure identity: id fig-U2-6, Kind table, topic_label 2.3. Target path (write exactly here): static/img/figures/efmp-301/unit-02/fig-U2-6.svg

Marker prompt (verbatim): clean flat vector comparison table, labelled, high contrast, four columns and four rows. Columns: "domain", "what grows", "a Class 2 vs Class 6 difference", "one classroom sign". Row 1 cognitive: thinking and memory / certain the tall glass holds more vs explains the pour rule / multi-step instructions followed without reminders. Row 2 emotional: regulation of feelings / crying at a wrong answer vs flushing and trying again / the pupil who laughs in March at what made them cry in September. Row 3 social: relationships, play, peers / parallel play beside others vs negotiated games with rules / the seating map of who works with whom. Row 4 physical (recalled from 2.2): body and motor control / large shaky letters vs small even letters / the handwriting on the newest exercise book

Marker alt (verbatim): A table comparing the four developmental domains - cognitive, emotional, social and physical - on what grows, a typical Class 2 versus Class 6 difference, and one classroom sign of each.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>. Cell text may be small (13px .small / 14px .body) to fit; keep every label legible.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A table comparing the four developmental domains") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the .bg / .grid / .ink / .muted / .h / .sh / .body / .small / .wm classes from the boilerplate.
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-02/fig-U2-6.svg and report the file size in bytes.

## Response snapshot

Created and optimised the requested single-file comparison-table SVG. It uses the exact light palette block, accessible title and description, shape-plus-label domain cues, and one wordmark; the final size is 5,414 bytes.

## Outcome

- ✅ Impact: Authored fig-U2-6 for EFMP-301 Unit 2 topic 2.3.
- 🧪 Tests: Optimisation and static contract checks passed; browser text measurement was blocked by the sandbox.
- 📁 Files: static/img/figures/efmp-301/unit-02/fig-U2-6.svg.
- 🔁 Next prompts: Derive the dark variant and localise/place the figure in the later figure-production steps.
- 🧠 Reflection: Short wrapped labels preserve the marker wording without compromising the 780 by 470 table layout.

## Evaluation notes (flywheel)

- Failure modes observed: Browser-based overflow measurement could not launch because Chromium sandbox shutdown is disallowed in this environment.
- Graders run and results (PASS/FAIL): optimise-figure PASS; static SVG contract PASS; measure-figure-text BLOCKED.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): Run the text-measurement script in an environment where Playwright Chromium can start.
