---
id: "0055"
title: "Author matched response table"
stage: misc
date: 2026-09-24
surface: agent
model: GPT-5
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: "M Yousif Channa"
command: "author fig-U2-8 SVG"
labels: ["efmp-301", "unit-02", "topic-2.4", "svg", "table", "figure"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-301/unit-02/fig-U2-8.svg
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-02/fig-U2-8.svg static/img/figures/efmp-301/unit-02/fig-U2-8.svg
 - static SVG contract check (PASS)
 - npm run check:figures -- --course efmp-301 --unit 02 (expected existing unit-level placement failures)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 2, topic 2.4).

Figure identity: id fig-U2-8, Kind table, topic_label 2.4. Target path (write exactly here): static/img/figures/efmp-301/unit-02/fig-U2-8.svg

Marker prompt (verbatim): clean flat vector comparison table, labelled, high contrast, three columns and five rows. Columns: "what you see in class", "the developmental reading", "a matched response". Row 1: copying without understanding / the task is at a stage ahead of the pupils' thinking / back to concrete materials, then pictures, then symbols. Row 2: multi-step instructions lost midway / reversibility not yet in place / numbered steps on the board, external reminders. Row 3: large shaky handwriting despite effort / fine motor control still maturing / wider lines, larger boxes, patience. Row 4: shouting when group work frustrates / emotional regulation still developing / a role in the group, a named strategy, time. Row 5: one pupil always alone at break / the peer-group map has a gap / structured pairing, deliberate roles

Marker alt (verbatim): A table of five common classroom observations, each with the developmental reading that explains it and a matched teaching response.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A table of five common classroom observations") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the .bg / .grid / .ink / .muted / .h / .sh / .body / .small / .wm classes from the boilerplate.
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-02/fig-U2-8.svg and report the file size in bytes.

## Response snapshot

Created and optimized the requested single-file comparison table SVG. It uses the exact light palette block, accessible title and description, five wrapped observation rows, and one wordmark; the final size is 3,288 bytes.

## Outcome

- ✅ Impact: Authored fig-U2-8 for EFMP-301 Unit 2 topic 2.4.
- 🧪 Tests: Optimisation and static SVG contract checks passed. The figure gate remains red because the unit's prompt-only markers have not yet been placed, which is outside this request.
- 📁 Files: static/img/figures/efmp-301/unit-02/fig-U2-8.svg.
- 🔁 Next prompts: Localise, place, and derive variants during the later figure-production step.
- 🧠 Reflection: A six-band grid with a clearly separated header keeps the three linked readings legible without adding colour-dependent meaning.

## Evaluation notes (flywheel)

- Failure modes observed: The browser-based text-measurement script could not launch Chromium in this sandbox; XML and static SVG checks passed.
- Graders run and results (PASS/FAIL): optimise-figure PASS; static SVG contract PASS; check:figures EXPECTED UNIT-LEVEL FAIL.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): Inspect the SVG in a browser-capable environment during placement.
