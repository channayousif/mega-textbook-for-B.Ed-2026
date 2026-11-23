# Feature 032: Textbook visuals and interactivity

**Status:** Phase A in progress · **Owner ruling:** 2026-11-23 (D-2026-0097)

## Why
The book should illustrate every topic, draw clear diagrams, offer presentations and tables, and
be interactive, all in one look. The owner reviewed a list of ten popular skills; this feature
adopts what fits the repository's rules and builds the rest as data-driven components.

## Phases
- **A.** The `textbook-visuals` router skill; animated figures (animated-diagrams-skill adapted:
  silent, captioned; Study Studio video, Shorts and social, and a "Watch it animate" button beside
  the static figure); pilot EFMP-301 Unit 4 (fig-U4-1, fig-U4-3, fig-U4-5, EN and UR).
- **B.** Web slide decks (frontend-slides adapted as `studio-slides`) and a pptx export, in the
  Study Studio; closes Feature 029's slides task.
- **C.** Data-driven widgets: `<Flashcards>` (glossary), `<SelfCheck>` (practice items, no keys
  client-side), `<Chart>` (GQUR data).
- **D.** The crew's `refresh_figures` stage: redraw placed schematics to the improved standard,
  uncertified units first.

## Requirements
- **FR-001** No visual is added by rewriting a review-bound file; new visuals reach pages through
  data read by components.
- **FR-002** Every visual has an Urdu, right-to-left version and meets the figure accessibility
  rules (alt text, no colour-only meaning, reduced motion, captions, a print fallback).
- **FR-003** Animated figures are silent with on-screen captions, are rendered under the host's
  heavy-job rules, and go private first through the Media Studio pipeline.
- **FR-004** `refresh_figures` never runs on a certified unit or one awaiting the owner's G3
  sign-off; it keeps each figure's id, alt text and meaning, and refreshes the unit's G2 evidence.
- **FR-005** Third-party skills are adopted under their licences (animated-diagrams-skill
  Apache-2.0; GSAP standard licence; HyperFrames Apache-2.0; frontend-slides MIT), pinned, and
  kept outside the site's `node_modules`.
