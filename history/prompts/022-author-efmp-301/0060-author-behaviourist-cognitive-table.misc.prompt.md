---
id: 0060
title: Author behaviourist cognitive table
stage: misc
date: 2026-09-24
surface: agent
model: gpt-5
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: M Yousif Channa
command: author SVG figure fig-U3-5
labels: ["efmp-301", "unit-03", "svg", "figure"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-301/unit-03/fig-U3-5.svg
 - history/prompts/022-author-efmp-301/0060-author-behaviourist-cognitive-table.misc.prompt.md
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-03/fig-U3-5.svg static/img/figures/efmp-301/unit-03/fig-U3-5.svg
 - targeted SVG structural assertions (pass)
 - npm run check:figures -- --file static/img/figures/efmp-301/unit-03/fig-U3-5.svg (known unrelated Unit 3 placement findings)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 3, topic 3.2).

Figure identity: id fig-U3-5, Kind table, topic_label 3.2. Target path (write exactly here): static/img/figures/efmp-301/unit-03/fig-U3-5.svg

Marker prompt (verbatim): clean flat vector comparison table, labelled, high contrast, three columns and four rows. Columns: "the view", "behaviourist", "cognitive". Row 1 what learning is: a change in observable behaviour / a change in thinking and understanding. Row 2 what the teacher arranges: consequences that follow behaviour / experiences that meet and rebuild schemas. Row 3 what counts as evidence: what the pupil can do, seen from outside / what the pupil can explain, transfer and use in a new situation. Row 4 a classroom instance: Rashid's letter-perfect recitation / Sana's self-corrected recitation hanging on a story. High contrast

Marker alt (verbatim): A table comparing the behaviourist and cognitive views of learning on what learning is, what the teacher arranges, what counts as evidence, and a classroom instance of each.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A table comparing the behaviourist and cognitive views of learning ...") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-03/fig-U3-5.svg and report the file size in bytes.

## Response snapshot

Created the accessible, palette-compliant comparison-table SVG at the requested path. The optimized file is 4,122 bytes; its targeted structural checks pass, while the repository-wide figure gate still reports other Unit 3 figures that are intentionally prompt-only.

## Outcome

- ✅ Impact: Added the requested three-column, four-row learning-theory comparison table.
- 🧪 Tests: Optimizer and targeted structural assertions passed; the full figure gate retains five unrelated Unit 3 placement findings.
- 📁 Files: One SVG and this prompt history record.
- 🔁 Next prompts: Place the completed figure in topic 3.2 when the content-authoring workflow reaches placement.
- 🧠 Reflection: The exact token block and accessible metadata can be preserved in a compact hand-authored SVG.

## Evaluation notes (flywheel)

- Failure modes observed: The broad figure gate examines the complete Unit 3 and cannot isolate this file; its remaining findings concern other prompt-only figures.
- Graders run and results (PASS/FAIL): optimize: PASS; targeted SVG assertions: PASS; repository-wide figure gate: FAIL only on unrelated unplaced Unit 3 figures.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run the full figure gate after the rest of Unit 3's planned figures are placed.
