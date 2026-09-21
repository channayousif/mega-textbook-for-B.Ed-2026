---
id: 0034
title: Improve EFMP-302 SVG readability
stage: refactor
date: 2026-09-21
surface: agent
model: Codex GPT-5
feature: none
branch: main
user: repository owner
command: improve EFMP-302 SVG readability
labels: ["efmp-302", "svg", "accessibility", "rtl", "figures"]
links:
  spec: null
  ticket: null
  adr: history/adr/0024-claude-codex-visual-production-boundary.md
  pr: null
files:
 - static/img/figures/efmp-302/unit-01/
 - static/img/figures/efmp-302/unit-02/
 - static/img/figures/efmp-302/unit-03/
 - static/img/figures/efmp-302/unit-04/
 - static/img/figures/efmp-302/unit-05/
 - static/img/figures/efmp-302/unit-06/
 - /home/a2ahs/.codex/skills/generate-figures/SKILL.md
 - /home/a2ahs/.codex/skills/generate-figures/references/
 - history/prompts/general/0034-improve-efmp302-svg-readability.general.prompt.md
tests:
 - npm run figures:variants:check
 - node scripts/measure-figure-text.mjs static/img/figures/efmp-302/unit-*/*.svg
 - npm run check:figures
 - npm test -- tests/unit/figure-palette.test.mjs tests/unit/figures-gate.test.mjs
 - npm run check:content
 - npm run build
---

## Prompt

A previous agent produced the plan below to accomplish the user's task. Implement the plan in a fresh context. Treat the plan as the source of user intent, re-read files as needed, and carry the work through implementation and verification.

# Improve EFMP-302 SVG readability

## Summary

Create a Codex-native copy of the `generate-figures` skill in `~/.codex/skills/generate-figures`, retaining the repository’s SVG, RTL, palette, and validation references while rewriting the workflow for direct Codex authorship.

Retrofit all 50 EFMP-302 English source SVGs and all 16 existing Urdu source SVGs. Their dark variants will be regenerated, not edited by hand.

## Key changes

- Set the copied skill’s balanced readability standard to 18 px headings, 16 px instructional labels, and 14 px supporting labels; reserve 11 px only for the decorative wordmark.
- Redesign each diagram’s spacing, line wrapping, panel dimensions, and viewBox where needed so enlarged text never clips or overlaps. Keep figure meaning, IDs, alt text, manifest entries, and MDX placement unchanged.
- Preserve the published token palette and make all instructional text use the high-contrast `--ink` token. Keep `--muted` limited to nonessential supporting material.
- Update Urdu sources with the same readable scale and safe vertical spacing, preserving translated text, mirrored RTL reading order, and Nastaliq-first font stacks.
- Correct the 12 baseline cosmetic wordmark collisions encountered during geometry inspection as part of the layout redesign.
- Generate dark SVG variants from the revised light sources only after a clean preflight check confirms no unrelated variant drift.

## Public interfaces

No application APIs, content schemas, figure IDs, source paths, or MDX interfaces change. SVG visual design and the local Codex skill are the only modified surfaces.

## Validation

- Run figure-variant freshness checks before and after the work.
- Optimise every changed light SVG and keep each under the 20 KB budget.
- Run the SVG text-geometry checker across all EFMP-302 variants, requiring zero text overflow and zero wordmark collisions.
- Run `check:figures`, palette tests, `check:content`, and a production build.
- Visually inspect representative English and Urdu figures in light and dark modes at the site’s rendered width.

## Assumptions

- “All EFMP-302 images” includes six units, all English SVG sources, and every existing Urdu SVG source.
- “High contrast” means retaining the already WCAG-tested palette while using `--ink` for teaching text, rather than changing the global palette.

## Response snapshot

Installed the Codex-native `generate-figures` skill with copied references. Retrofitted the 50 English and 16 Urdu light SVG sources, regenerated their dark variants, added safe footer space for decorative wordmarks, and reflowed enlarged labels. Figure IDs, descriptions, manifests, and MDX placement were preserved.

## Outcome

- ✅ Impact: EFMP-302 SVG diagrams now use the readable 18/16/14 px hierarchy and the published high-contrast palette in both themes.
- 🧪 Tests: Variant freshness, the complete text-geometry scan, the figure gate, palette unit tests, and production build passed. The repository-wide content pipeline gate and the existing figure-gate fixture test harness still report unrelated failures.
- 📁 Files: 132 source and derived figure SVGs were refreshed across six units; the local Codex skill was installed.
- 🔁 Next prompts: Review the unrelated pipeline-gate and figure-fixture test failures independently if desired.
- 🧠 Reflection: Geometry checks caught the legacy single-line captions and wordmark footer collisions before dark variants were derived.

## Evaluation notes (flywheel)

- Failure modes observed: Initial enlarged text exposed compact legacy captions; reflow and additional footer height resolved every geometry finding.
- Graders run and results (PASS/FAIL): variants PASS; geometry PASS; check:figures PASS; palette PASS; check:content PARTIAL, unrelated pipeline gate failed; build PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Repair the pipeline-gate evidence separately from this visual-only change.
