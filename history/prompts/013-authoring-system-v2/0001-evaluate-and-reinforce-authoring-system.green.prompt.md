---
id: 0001
title: Evaluate and reinforce the authoring system
stage: green
date: 2026-09-11
surface: agent
model: claude-opus-5
feature: 013-authoring-system-v2
branch: 013-authoring-system-v2
user: channayousif@gmail.com
command: (chat)
labels: ["audit", "figures", "colour", "branding", "seo", "enforcement", "constitution"]
links:
  spec: specs/013-authoring-system-v2/spec.md
  ticket: null
  adr: history/adr/0018-figure-theming-palette-and-generated-standard-prose.md
  pr: null
files:
 - scripts/lib/figure-palette.mjs
 - scripts/lib/gates.mjs
 - scripts/check-docs-sync.mjs
 - scripts/build-figure-variants.mjs
 - scripts/run-gates.mjs
 - scripts/check-figures.mjs
 - src/components/Figure.tsx
 - src/theme/DocItem/Metadata/index.tsx
 - src/css/custom.css
 - docusaurus.config.ts
 - static/img/ (favicon, logo, social card, 32 figure assets)
 - specs/content/style-guide.md
 - .specify/memory/constitution.md
tests:
 - npm test (198/198)
 - npm run check:content (7 gates)
 - npm run build (en + ur)
---

## Prompt

i want you to evaluate the content authoring system, make it more organised, and reinforced. The SVGs created are monochrome and somewhat dull, it can be made more interesting by setting some eyecandy coloring standards so the book doesnot get endlessly boring. we can add branding textbook.com.pk to the media assets to standout in google search. Also think about SEO optimized content creation system and follow best practices for google seo and others.

## Response snapshot

Audited the authoring system, figure pipeline and SEO posture before proposing anything. All
three owner observations were real, and two rested on defects rather than taste.

**Bug A - dark mode was broken for every figure.** All 16 SVGs themed themselves with
`@media (prefers-color-scheme: dark)`, which follows the OPERATING SYSTEM. Docusaurus themes by
toggling `[data-theme]` on `<html>`, and `custom.css` had zero `[data-theme]` rules. A light-OS
reader who clicked the site's dark toggle saw white plates punched into a dark page.

**Bug B - an Urdu-parity hole.** `check-figures.mjs` keyed the `.ur.svg` requirement on
`kind === 'diagram'`, so it fired for only 2 of 8 placed figures.

**The greyscale was prescribed**, not accidental: `svg-authoring.md` handed every author an
eight-grey boilerplate including `/* tick glyph - dark, not green */`. Art. III.8 forbids colour
as the SOLE carrier; it had been read as forbidding colour outright.

**SEO**: 0 of 114 pages set a `description`, and every topic file opens with the same
`## A real classroom situation`, so the whole book shipped one identical meta description in both
locales. The declared favicon had no file behind it. No social card, no robots.txt, no sitemap
index, and 35 auth-gated pages in the sitemap.

**And a governance problem that made any fix temporary**: `check-figures.mjs` never read a byte
of an SVG, the `Kind` enum lived in seven prose files, and "run the gates" existed in four
inconsistent variants, none running `check:pipeline-gate`.

Delivered Phases A-F: a WCAG-verified token palette on a deliberate luminance ladder (four
accents at equal contrast are the same grey on a printed handout); two committed variants per
schematic switched by CSS; an accent pass that reinforces distinctions each figure already makes
by shape or dash; the wordmark and caption credit; an SVG lint with ten new fixture tests; the
docs-sync gate; the full SEO surface; Constitution v2.9.0 and style-guide v3.4.

Two things found along the way that nobody was looking for: six figures carried em dashes in
their text nodes, breaching Art. III.9 invisibly because `check-no-em-dash.mjs` never scanned
`static/`; and the test tree turned out to hold three independent copies of "valid unit front
matter".

## Outcome

- ✅ Impact: two live defects fixed, two latent gate holes closed, the standard made enforceable.
- 🧪 Tests: 198/198 unit; 7 content gates; build green in both locales.
- 📁 Files: 5 new scripts/libs, 1 new theme component, 32 figure assets, 81 pages given
  descriptions, constitution + style guide + ADR.
- 🔁 Next prompts: Phase G (title rewrite), then EFMP-301 Unit 1 at v3.4.
- 🧠 Reflection: the colour request and the enforcement work were not separable. Writing a
  palette into a document that no gate reads would have decayed exactly the way the previous
  standard did - which is observable, since two skill files were still describing the
  pre-Spec-012 vocabulary.

## Evaluation notes (flywheel)

- Failure modes observed: a self-contained SVG cannot observe its host page's theme; a gate that
  checks only file existence proves nothing about the file; prose duplication of a constant is
  drift waiting to happen.
- Graders run and results (PASS/FAIL): unit 198/198 PASS; 7 content gates PASS; build PASS;
  every new lint rule verified to FAIL on a seeded violation before being trusted.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): run the alt-vs-manifest check report-only to see how
  much whitespace drift exists before making it blocking.
