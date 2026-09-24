---
id: 0062
title: Author model sources table
stage: misc
date: 2026-09-24
surface: agent
model: GPT-5
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: M Yousif Channa
command: direct user request
labels: ["efmp-301", "unit-03", "bandura", "svg", "table"]
links:
  spec: specs/022-author-efmp-301/spec.md
  ticket: null
  adr: history/adr/0024-capability-based-claude-and-codex-visual-authoring.md
  pr: null
files:
 - static/img/figures/efmp-301/unit-03/fig-U3-7.svg
 - history/prompts/022-author-efmp-301/0062-author-model-sources-table.misc.prompt.md
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-03/fig-U3-7.svg static/img/figures/efmp-301/unit-03/fig-U3-7.svg (pass)
 - source-level SVG requirement checks (pass)
 - npm run check:figures -- --path static/img/figures/efmp-301/unit-03/fig-U3-7.svg (blocked by existing unplaced Unit 3 figures)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 3, topic 3.3).

Figure identity: id fig-U3-7, Kind table, topic_label 3.3. Target path (write exactly here): static/img/figures/efmp-301/unit-03/fig-U3-7.svg

Marker prompt (verbatim): clean flat vector comparison table, labelled, high contrast, three columns and five rows. Columns: "who the model is", "what is being modelled", "what strengthens or weakens the modelling". Rows: the teacher - how errors, questions and effort are treated / strongest model in the room: important, present daily / consistency between words and outcomes. Row 2 peers: how work is done, how others are treated / strong: similar and ever-present / the classroom's visible norms, who gets attention. Row 3 older pupils: habits, confidence, shortcuts / strong: admired and near in age / what the school rewards them for. Row 4 family: attitudes to school, to reading, to authority / strong: warm and long-standing / whether school and home model the same things. Row 5 screens and stories: behaviour repertoires, consequences as shown / strong: vivid, repeated, engaging / whether consequences are shown honestly or glamorised. High contrast

Marker alt (verbatim): A table of five sources of models - teacher, peers, older pupils, family, and screens and stories - each against what is being modelled and what strengthens or weakens the modelling.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A table of five sources of models") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-03/fig-U3-7.svg and report the file size in bytes.

## Response snapshot

Created the single light-theme SVG for fig-U3-7. It is an accessible six-band comparison table with one header and five labelled model sources; grid position and labels preserve meaning without relying on colour.

## Outcome

- ✅ Impact: Added the requested comparison table of sources of social models.
- 🧪 Tests: Optimizer and source-level SVG requirement checks passed; the course-wide figure gate remains blocked by pre-existing unplaced Unit 3 figures.
- 📁 Files: Added the SVG source and this request record.
- 🔁 Next prompts: Place the figure marker and derive variants only in the designated placement workflow.
- 🧠 Reflection: The table's headers, rules, and labels retain its meaning when viewed without colour.

## Evaluation notes (flywheel)

- Failure modes observed: The scoped figure command still evaluates the full Unit 3 corpus, whose prompt-only figure markers are not yet placed.
- Graders run and results (PASS/FAIL): optimize-figure PASS; source-level requirement checks PASS; check-figures BLOCKED by existing unplaced figures.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Re-run the course figure gate after the Unit 3 placement work is complete.
