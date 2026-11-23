---
name: textbook-visuals
description: >-
  The router for every visual and interactive element of textbook.com.pk (Feature 032): pick the
  right output for a teaching need (SVG figure, raster illustration, animated figure, web slide
  deck, downloadable pptx or xlsx, chart, flashcards or self-check), apply the one shared look
  (palette, fonts, Urdu RTL), obey the rules every visual shares, and hand off to the skill that
  does the job. Use before making any figure, illustration, animation, deck, chart, table download
  or interactive widget for a unit, or when asked "how should we show this topic".
---

# Textbook visuals

One shared look, many outputs. Decide the output here, then follow the skill that makes it.

## 1. Pick the output

| The topic needs... | Make | Skill |
|---|---|---|
| a relationship, process, sequence, comparison or timeline | SVG schematic (`table`, `concept-map`, `flowchart`, `timeline`, `diagram`) | **generate-figures** (`references/svg-authoring.md`) |
| a scene: a classroom, a place, people doing something | raster illustration | **generate-figures** → crew `illustrate` (agy, gflow, Codex: ADR-0024/0029/0036) |
| motion that teaches: a process unfolding, a map built step by step | animated figure (silent, captioned video of an existing connected figure) | **animated-figures** |
| a talk or a lesson to present | web slide deck (16:9, in the Study Studio) plus a downloadable pptx | **studio-slides** (Phase B) and **pptx** |
| numbers or data a reader should explore | an interactive chart with a static print fallback | `<Chart>` (Phase C) and **dataviz** |
| recall and practice | flashcards from the glossary, a self-check from practice items | `<Flashcards>`, `<SelfCheck>` (Phase C) |
| a record sheet or planner to fill in | downloadable xlsx | **xlsx** |
| audio or video overviews, posters, mind maps, study guides | Study Studio media | **studio-media** (and **media-studio**) |
| a course teaser Short or a social post | teaser or update card | **studio-teaser**, **social-updates** |

Not used for textbook visuals: excalidraw (clashes with the house look), runtime Mermaid in MDX
(bypasses the figure gates; use Mermaid or Graphviz only to get coordinates, then hand-finish the
SVG), canvas-design for figures (raster figures follow the ADR-0029 route; canvas-design is fine
for posters and social art), generic SVG-diagram skills (generate-figures already does more).

## 2. The shared look

- **Figure palette:** the `:root` token block in `generate-figures/references/svg-authoring.md`
  (generated from `scripts/lib/figure-manifest.mjs`); dark twins are derived, never authored.
- **House colours** (`scripts/media/brand.mjs`, `src/css/tokens.css`): teal `#123e43`, amber
  `#e5a333`, paper `#f8f5ef`. Amber is a fill or accent on teal, never text on a light ground.
- **Fonts:** English uses the system UI stack in figures and the site fonts on pages; Urdu uses
  `'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq'`, with taller line heights and no letter-spacing.
- **Urdu and RTL:** every visual has an Urdu version, mirrored for right-to-left reading (first
  step on the right, arrows pointing left); never the `direction` attribute in SVG
  (`generate-figures/references/bilingual-figures.md`).
- **Motion:** calm (ease out, no bounce), and every animation respects `prefers-reduced-motion`.

## 3. Rules every visual obeys

- **Never rewrite a review-bound file to add a visual.** Topic MDX and placed figures are bound
  into review evidence. New visuals reach a page through data (an index read by a component,
  such as `figureAnimations` for `Figure.tsx`), not new MDX props on existing units.
- **Redrawing placed figures** (owner, 2026-11-23) runs as the crew's `refresh_figures` stage, on
  units that are neither certified nor waiting for the owner's G3 sign-off; it refreshes the G2
  evidence itself. Certified units are redrawn only when they next re-open for review.
- **Accessibility:** alt text that says what the visual teaches; no colour-only meaning; keyboard
  reachable controls; captions for any video.
- **Print:** every interactive element has a static fallback that prints.
- **Facts:** a visual shows what the unit says. It never adds a claim the text does not make.
- **Imagery:** Pakistani school settings, modest dress, no readable text in raster art, no maps,
  flags or emblems, never a sacred person, scripture or calligraphy.
- **Media:** no media in git (`~/studio-media/`); heavy renders through `scripts/heavy.sh` in a
  capped scope; videos private first, public only on the owner's word.
- **Answer keys** never reach a client bundle or a public asset.
