---
id: 0066
title: Author creativity concept map
stage: misc
date: 2026-09-24
surface: agent
model: gpt-5
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: user
command: author SVG figure fig-U5-3
labels: ["efmp-301", "unit-05", "figure", "svg", "concept-map"]
links:
  spec: specs/022-author-efmp-301/spec.md
  ticket: null
  adr: history/adr/0024-capability-based-claude-and-codex-visual-authoring.md
  pr: null
files:
 - static/img/figures/efmp-301/unit-05/fig-U5-3.svg
 - history/prompts/022-author-efmp-301/0066-author-creativity-concept-map.misc.prompt.md
tests:
 - npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-05/fig-U5-3.svg static/img/figures/efmp-301/unit-05/fig-U5-3.svg (pass, 4.3 KB)
 - npm run check:figures -- --course efmp-301 --unit 05 (blocked by the unit's remaining prompt-only and unplaced figures)
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 5, topic 5.2).

Figure identity: id fig-U5-3, Kind concept-map, topic_label 5.2. Target path (write exactly here): static/img/figures/efmp-301/unit-05/fig-U5-3.svg

Marker prompt (verbatim): clean flat vector concept map, labelled, high contrast. A central node "creativity" with three solid-linked parts: "fluency - many ideas", "flexibility - different kinds of ideas", "originality - ideas that are new here", "elaboration - ideas worked out in detail" (four parts). Dashed arrows link creativity to "divergent thinking: many possible answers" and "convergent thinking: the one well-established answer", labelled "both are needed". A separate linked node "giftedness: unusual level of skill or knowledge, an educational need" sits to the side with a note "not a prize, and not an exemption from teaching"

Marker alt (verbatim): A concept map of creativity with its four observable parts - fluency, flexibility, originality and elaboration - linked to divergent and convergent thinking, with giftedness beside it as an educational need rather than a prize.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A concept map of creativity with its four observable parts") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the boilerplate classes (.bg / .panel / .grid / .ink / .muted / .h / .sh / .body / .small / .wm / .stroke / .stroke-a).
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-05/fig-U5-3.svg and report the file size in bytes.

## Response snapshot

Created the requested accessibility-labelled concept-map SVG with the exact light palette block, four solid-linked creativity parts, dashed arrows to divergent and convergent thinking, and a linked giftedness educational-need note. Optimized size: 4,355 bytes.

## Outcome

- ✅ Impact: Added the requested EFMP-301 Unit 5 creativity concept map.
- 🧪 Tests: The SVG optimizer passed. The Unit 5 figure gate remains blocked by other prompt-only figures and no placed Figure carriers, outside this asset-only request.
- 📁 Files: One SVG asset and this prompt-history record.
- 🔁 Next prompts: Place the planned Unit 5 figures in their topic pages when figure placement is in scope.
- 🧠 Reflection: Used labelled nodes, solid links and dashed arrow links so the teaching distinctions do not depend on colour.

## Evaluation notes (flywheel)

- Failure modes observed: Direct SVG preview was unsupported by the local image viewer; optimizer validation completed successfully.
- Graders run and results (PASS/FAIL): optimize-figure PASS; check-figures BLOCKED by unrelated Unit 5 placement state.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Render the asset through the site build when the Unit 5 content placement is in scope.
