# EFMP-409 Unit 1 G3 review - summary

Reviewer: `agent:claude-crew` (fresh session; the reviewer did not author or translate this unit).
Report: `specs/content/efmp-409/reviews/unit-01/G3/crew-efmp-409-u01-review_en-r1.json`.
Reviewed commit: `5533bee27c33bae4cdd87405b7051d2e4ee1aa92`.
Disposition: **escalate**.

## What was checked

All five English unit files, the four placed schematic SVGs and the placed banner, the approved
content spec, the coverage matrix, the concept graph, the sources table, the bound source notes and
the two primary source documents that could be read directly (the bundled HEC guide extraction and
the bundled NEP 2009 PDF), plus live checks of the QMMB, Curren, OpenStax and Susanti sources. The
manifest binds 95 inputs and was re-verified identical to a fresh computation.

## Criteria

- **authority: pass.** The approved content spec (`status: approved`) carries the six Unit 1 leaves
  as U1-01 to U1-06; the coverage matrix maps each to a real `###` heading that teaches it. The 2026
  University of Sindh scheme and the HEC 2013 guide agree on the unit's scope. No contradictory
  G0/G1 authority was found.
- **sources: pass.** Every quotation used in the prose was checked against a bound passage or a
  primary source. The Kneller, Pestalozzi, Dewey, Curren, OpenStax, Susanti, NEP 2009 and Jinnah
  quotations are supported. Three advisory attribution notes remain (below).
- **coverage: pass.** Six sub-topics, two topics, all taught and assessed; reading estimate 46
  minutes inside the approved 36-48 band; assessment spread 5/5/5 per topic across MCQ, RRQ and ERQ.
- **assessment: pass.** All ten MCQs solved independently and the derived key matches the supplied
  key. RRQ mark schemes and ERQ rubrics are internally consistent and demand higher-order work. One
  residual advisory on MCQ option length.
- **accessibility: unverified.** Render and print inspection could not be run (see the blocking
  finding).
- **readability: pass.** The register holds for a fresh HSC/intermediate graduate; terms are defined
  at first use and each abstraction is preceded by a Sindh classroom situation.
- **pedagogy: pass.** The nine-part cycle is intact and ordered; activities are feasible in the
  stated Pakistani/Sindhi context; the three approved misconceptions are named and corrected.

## Blocking finding

- **R1 (uncertain, unresolved): render-review unavailable.** The deployed SHA
  `074ab11456b999cf5d3c9b8aa6e603b2de834eb5` differs from HEAD
  `5533bee27c33bae4cdd87405b7051d2e4ee1aa92` on the unit's English directory and figure folder
  (`index.mdx` and the new `fig-U1-5.webp` banner). The brief therefore makes the live site
  ineligible as the reviewed input, and it forbids building or serving the site from a review job.
  Narrow-viewport scrolling, A4 print clipping and visual accessibility of the current bytes remain
  unverified, so accessibility cannot pass and the report escalates. Structural checks from source
  (heading order, figure alt text, manifest consistency, glyph geometry) pass.

## Advisory findings

- **A1:** the keyed MCQ option is the unique longest in 5 of 10 items and tied-longest in a sixth;
  the item-writing reference asks for similar-length options with no giveaway.
- **A2:** `topic-02.mdx:106` and `unit-assessment.mdx:104` call the 1947 meeting the "first" All
  Pakistan Educational Conference; the bound QMMB page does not say "first".
- **A3:** `topic-01.mdx:37` attributes the five-foundation list to "the University of Sindh course
  guide" with an HEC 2012/2013 citation; the list matches the 2026 Sindh scheme, while the HEC 2013
  rationale says "socio-economic" rather than "sociological".
- **A4:** `topic-01.mdx:54` writes the Latin prefix as `e-` where the bound etymonline note has
  `ex-`.
- **A5:** OpenStax uses "value theory", not "axiology"; the unit's equation of the two names is not
  Smith's wording, although the HEC guide does use "axiology of education".

## Advisory only

This report does not certify the unit, sign anything, append a tracker row, change
`translation_status`, alter the reviewer registry or publish. G3 stays open.
