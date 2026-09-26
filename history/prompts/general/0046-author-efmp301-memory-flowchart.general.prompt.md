---
id: 0046
title: Author EFMP-301 memory flowchart
stage: general
date: 2026-09-24
surface: agent
model: GPT-5
feature: none
branch: 022-author-efmp-301
user: user
command: Author requested schematic SVG figure fig-U4-3
labels: ["efmp-301", "figure", "svg", "flowchart", "unit-04"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - static/img/figures/efmp-301/unit-04/fig-U4-3.svg
  - history/prompts/general/0046-author-efmp301-memory-flowchart.general.prompt.md
tests:
  - node scripts/optimize-figure.mjs --svg static/img/figures/efmp-301/unit-04/fig-U4-3.svg /tmp/fig-U4-3.optimized.svg
  - static SVG contract assertions (pass)
  - npm run check:figures (known incomplete-unit findings)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 4, topic 4.2).

Figure identity: id fig-U4-3, Kind flowchart, topic_label 4.2. Target path (write exactly here): static/img/figures/efmp-301/unit-04/fig-U4-3.svg

Marker prompt (verbatim): clean flat vector flowchart, labelled, high contrast, left to right. Box 1 "sensory memory: sights, sounds, tastes held for a second or two" with a small wastebasket icon labelled "most is lost here". Arrow to box 2 "working memory: the workbench, holds about four things at once, seconds not minutes" with a second wastebasket labelled "lost unless attended and rehearsed". Arrow to box 3 "encoding into long-term memory: connected to what is already known" then box 4 "long-term memory: storage believed unlimited". A return arrow from long-term memory back to working memory labelled "retrieval: getting it back when needed". Three small crosses on the arrows labelled "forgetting cuts in here: decay, interference, retrieval failure". High contrast

Marker alt (verbatim): A flowchart of the information-processing chain: sensory memory briefly holds impressions, working memory holds about four things for seconds, encoding moves material into unlimited long-term memory, and retrieval brings it back, with forgetting cutting in at decay, interference and retrieval failure.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A flowchart of the information-processing chain: sensory memory bri...") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-04/fig-U4-3.svg and report the file size in bytes.

## Response snapshot

Created the requested high-contrast memory information-processing flowchart. It includes four stages, loss-bin icons, three labelled forgetting interruptions, a labelled retrieval return path, accessibility metadata, the published palette token block, all requested boilerplate classes, and one wordmark.

## Outcome

- ✅ Impact: Added the requested instructional SVG flowchart.
- 🧪 Tests: Optimisation and static SVG contract assertions passed; the course-wide figure gate reports four pre-existing incomplete-unit placement findings.
- 📁 Files: One SVG asset and this request record.
- 🔁 Next prompts: Place all remaining Unit 4 figure markers to satisfy the rendered-figure gate.
- 🧠 Reflection: Flow, icons, labels, crosses, and dash pattern retain meaning independently of colour.

## Evaluation notes (flywheel)

- Failure modes observed: The course-wide gate cannot pass until the existing Unit 4 prompt-only markers are placed in their MDX topic files.
- Graders run and results (PASS/FAIL): optimize: PASS; static SVG assertions: PASS; check-figures: FAIL only for unplaced Unit 4 markers outside this request.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none
