---
id: 0051
title: "Author physical development table"
stage: misc
date: 2026-09-24
surface: agent
model: GPT-5 Codex
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: M Yousif Channa
command: "author fig-U2-4 SVG"
labels: ["EFMP-301", "Unit 2", "physical development", "SVG", "figure"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - static/img/figures/efmp-301/unit-02/fig-U2-4.svg
 - history/prompts/022-author-efmp-301/0051-author-physical-development-table.misc.prompt.md
tests:
 - "npm run optimize:figure -- --svg static/img/figures/efmp-301/unit-02/fig-U2-4.svg static/img/figures/efmp-301/unit-02/fig-U2-4.svg (PASS, 4.4 KB)"
 - "SVG static requirement audit (PASS, 4530 bytes)"
 - "node scripts/measure-figure-text.mjs static/img/figures/efmp-301/unit-02/fig-U2-4.svg (blocked: Chromium sandbox launch)"
---

## Prompt

You are authoring one schematic SVG figure for a B.Ed textbook (course EFMP-301, Unit 2, topic 2.2).

Figure identity: id fig-U2-4, Kind table, topic_label 2.2. Target path (write exactly here): static/img/figures/efmp-301/unit-02/fig-U2-4.svg

Marker prompt (verbatim): clean flat vector comparison table, labelled, high contrast, four columns and four rows. Columns: "phase", "typical changes", "what it means for the classroom", "what it does NOT mean". Row 1 early childhood (to age 6): fastest proportional growth, gross motor skills arriving / furniture scale, sand and blocks, movement breaks / that fine writing is carelessness. Row 2 primary years (6 to 11): steady growth, fine motor control maturing, permanent teeth / pencil grips, line spacing, craft tools, patience with handwriting / that small-for-age means less able. Row 3 puberty (about 10 to 14): second steep phase, sexual maturation, girls earlier than boys / privacy, flexibility, no body comments, timetable sense / that inconsistency is defiance. Row 4 later adolescence (14 to 18): adult height approached, strength and endurance rising / serious sport, lab work, load-bearing responsibilities / that adult appearance means adult judgement

Marker alt (verbatim): A table of four phases of physical development from early childhood to later adolescence, each with its typical changes, what the phase means for the classroom, and what it does not mean.

First read .claude/skills/generate-figures/references/svg-authoring.md and scripts/lib/figure-palette.mjs in this repository to learn the exact boilerplate, the published :root token block and the rules. Then author the figure.

Hard rules (mandatory):
- viewBox="0 0 780 470", no width/height attributes on <svg>. Cell text may be small (13px .small / 14px .body) to fit; keep every label legible.
- role="img" + aria-labelledby="t d" + <title id="t"> (the alt's first clause: "A table of four phases of physical development") + <desc id="d"> (the full alt text above).
- PASTE the published light :root token block verbatim from the reference. No hex colour anywhere else.
- System font stack only: font-family="system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif". No @import, no web font, no font file.
- NO @media (prefers-color-scheme...) block. NO <script>, <foreignObject>, external <image>, or raster <image>.
- Exactly one wordmark: <text class="wm" x="768" y="460" text-anchor="end" aria-hidden="true">textbook.com.pk</text>.
- No colour-only meaning: every distinction the figure makes MUST also be carried by shape, label or dash pattern.
- No em dash (U+2014) in any <text> label. Use comma, colon or spaced hyphen.
- Use the .bg / .grid / .ink / .muted / .h / .sh / .body / .small / .wm classes from the boilerplate.
- Keep the whole file under 20 KB; single-line compact output like the existing figures in static/img/figures/efmp-301/unit-01/.
- Do NOT create any dark variant file; the dark twin is derived later by a build script.

Write the completed SVG to static/img/figures/efmp-301/unit-02/fig-U2-4.svg and report the file size in bytes.

## Response snapshot

Created the requested single-file, light-theme SVG comparison table at the exact target path. It carries the prescribed accessibility metadata, token block, system font, four columns and four phase rows, with a single bottom-right wordmark.

## Outcome

- ✅ Impact: Authored the EFMP-301 Unit 2 physical-development comparison-table asset.
- 🧪 Tests: Optimisation and a static requirement audit passed; browser-based text measurement was blocked by the execution sandbox.
- 📁 Files: Added the SVG asset and this prompt-history record.
- 🔁 Next prompts: The calling authoring workflow may place the figure, create its Urdu mirror, and derive the dark variant.
- 🧠 Reflection: Short line-wrapped labels preserve the full marker meaning while retaining a compact 780 by 470 comparison table.

## Evaluation notes (flywheel)

- Failure modes observed: `measure-figure-text.mjs` could not launch Chromium because the sandbox denied its shutdown host operation; this did not affect SVG optimisation or static checks.
- Graders run and results (PASS/FAIL): optimize-figure PASS; static requirement audit PASS; measure-figure-text BLOCKED by sandbox.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): Run the text-measurement check in an environment that permits Playwright Chromium startup.
