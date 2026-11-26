# EFMP-409 Unit 3 G3 review - summary

Reviewer: `agent:claude-crew` (fresh session; the reviewer did not author or translate this unit).
Report: `specs/content/efmp-409/reviews/unit-03/G3/crew-efmp-409-u03-review_en-r1.json`.
Reviewed commit: `895cc30bc6b9edbc87b56365f50f479c8939d049`.
Disposition: **escalate**.

## What was checked

All eight English unit files (index, six topics, unit assessment, teacher notes), the placed banner
`fig-U3-13.webp`, the twelve placed schematic SVGs and their dark variants, the approved content
spec, the coverage matrix, the concept graph, the figure manifests, the sources table and its bound
source notes, the HEC course-guide extraction, and live reads of the five Stanford Encyclopedia of
Philosophy entries the unit cites (Plato, Aristotle, Rousseau, Dewey, Curren). The manifest binds
113 inputs and was re-verified identical to a fresh `inputManifest()` computation. Every mandatory
content gate was run and logged; `check:content` passes on this commit.

## Criteria

- **authority: pass.** The approved content spec (`status: approved`, `## Unit 3` at
  `specs/content/efmp-409/content-spec.md:195`) carries the nineteen leaves U3-01 to U3-19, and the
  guide outline (`Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt:454-482`) lists the same
  nineteen items. The coverage matrix maps every leaf to a real `###` heading that teaches it
  (31 rows, 0 missing headings). No contradictory G0/G1 authority was found.
- **sources: pass.** Every quotation and claim checked is supported by a bound note or a named
  primary work. The Curren definition, the Dewey five-phase inquiry cycle, the Plato Forms doctrine,
  the Aristotle `eudaimonia` discussion and the Rousseau negative-education concept were re-read
  live in the SEP entries on 2026-11-26. Advisories A3, A6 and A7 below qualify the attribution.
- **coverage: fail.** The taught passages are complete, but the assessment trace in the coverage
  matrix and the concept graph assigns MCQ-07, MCQ-08 and MCQ-09 to the wrong sub-topics
  (findings B2 and B3).
- **assessment: fail.** All ten MCQs solve to the supplied key, but the key is gameable: nine of
  ten keys are B and the keyed option is the longest option in nine of ten items (finding B1).
- **accessibility: unverified.** Render and print inspection could not be run (finding U1).
- **readability: pass.** The register holds for a fresh HSC/intermediate graduate: short
  single-idea paragraphs, a Sindh classroom situation before each abstraction, and technical terms
  defined at first use. One advisory on undefined specialised terms (A8).
- **pedagogy: pass.** The nine-part cycle is intact and ordered in all six topic files; the four
  approved misconceptions are named and corrected; activities are feasible in the stated
  Pakistani/Sindhi context with low-cost materials.

## Blocking findings

- **B1 (assessment): MCQ answer-key pattern.** `unit-assessment.mdx:37-86` with the key at
  `:113-122`: the key is B for 9 of the 10 items (only item 7 is A; no C or D key at all), and the
  keyed option is the longest option in 9 of the 10 items (item 1 tied-longest, item 7 not). The
  item-writing reference (`.claude/skills/author-unit/references/item-writing.md:27-28`) names
  "the longest option being correct" as a giveaway to avoid. A test-wise learner who always picks
  the longest B option scores 9/10 without reading the unit.
- **B2 (coverage): assessment trace mis-mapping.** `coverage/unit-03.md:52,54,55` assigns MCQ-07 to
  U3-12 (Ibn Khaldun), MCQ-08 to U3-14 (Iqbal's `Khudi`) and MCQ-09 to U3-15 (Iqbal's poetry);
  `concepts/unit-03.md:15-17` repeats the same assignments. The actual items are MCQ-07 Dewey
  (Badin salinity inquiry), MCQ-08 and MCQ-09 Ibn Khaldun (punishment; `al-tadarruj`), and MCQ-10
  Iqbal. The trace therefore claims Iqbal coverage that the bank does not contain and omits the two
  Ibn Khaldun items.
- **B3 (coverage): MCQ per-topic spread.** The approved blueprint requires `>= 1 per topic`
  (`content-spec.md:262`). As written, the ten MCQs leave one of topics 3.5 and 3.6 without an MCQ
  (the only candidate, MCQ-10, is assigned by the coverage matrix to U3-17 in topic 3.6, so topic
  3.5 has none).
- **B4 (assessment): missing Bloom tags in topic 3.6.** `topic-06.mdx:138-140` carries three
  `## Check your understanding` items with no `*(Remember)*`-style tag, while every other topic
  tags all three. Constitution Art. III.3 requires every assessment item to carry a Bloom tag, and
  `check:bloom-bands` only scans `unit-assessment.mdx`, so the gate passes over it.

## Advisory findings

- **A1 (assessment):** the keyed option is the longest in 9 of 10 items (see B1); this is the same
  cue reported for Unit 1, here at a much higher rate.
- **A2 (terminology):** the unit switches between `at-tadrij` (`topic-04.mdx:71,112,119,123,129,144`)
  and `al-tadarruj` (`unit-teacher-notes.mdx:30`, `unit-assessment.mdx:79,121`), and between `malaka`
  (`topic-04.mdx:76`) and `malakah` (`topic-06.mdx:110`, `unit-assessment.mdx:29,149`). The style
  guide asks for one term per concept within a unit.
- **A3 (sources):** `sources/unit-03.md:3` states "quotations are under 15 words and cited". The
  Emile opening at `topic-03.mdx:51` is 20 words and the Dewey definition at `topic-04.mdx:56` is
  24 words. Both are from public-domain primary works and are attributed to the author, so this is
  an inaccurate declaration rather than a copyright problem.
- **A4 (accessibility):** `figures/unit-03.md:11` records the `fig-U3-5` alt text as "sensORY
  training"; the placed SVG `<desc>`, the page `alt` (`topic-03.mdx:31`) and the manifest row
  disagree. The placed asset says "sensory".
- **A5 (pedagogy):** `unit-teacher-notes.mdx:50` says "The HEC course guide mandates four categories
  of practical coursework for Unit 3". The guide's Unit 3 section lists teaching methodology only
  (`FoundationsEd_Sept13.txt:1018-1022`); the four categories are the unit's own framing of the
  guide's course-level approaches (`:695-705`). Imprecise attribution, not a misquotation.
- **A6 (sources):** the SEP entries cited for U3-02, U3-03, U3-04, U3-05, U3-08 and U3-09 do not
  contain the educational detail the unit teaches (Plato's curriculum stages, Aristotle's
  habituation and public schooling, Rousseau's age stages). The detail is attributed in prose to
  the named primary works (`The Republic`, `Nicomachean Ethics`, `Politics`, `Emile`), which is
  defensible, but the sources table presents the SEP entries as the support for those leaves.
- **A7 (sources):** `topic-05.mdx:63` presents "Intellect without love is demonic; intellect with
  love is divine" as "As Iqbal wrote". Web and encyclopaedic sources circulate the sentence as
  Iqbal's, but none traces it to a named work; it reads as a paraphrase of the `aql`/`ishq`
  synthesis. Attribute it as a paraphrase or source the wording.
- **A8 (readability):** `topic-06.mdx:45-63` and `unit-teacher-notes.mdx:23` use `sociopedagogy`,
  `theocentric`, `anthropocentric` and `reconstructionism` without a definition, and `glossary.json`
  has no entry for them. The surrounding prose carries the meaning, but the HSC register rule
  (Constitution Art. III.1) is strained.

## Blocking finding for the escalation

- **U1 (uncertain, unresolved): render-review unavailable.** The deployed SHA
  `074ab11456b999cf5d3c9b8aa6e603b2de834eb5` differs from HEAD
  `895cc30bc6b9edbc87b56365f50f479c8939d049` on `docs/semester-4/efmp-409/unit-03/index.mdx` and
  `static/img/figures/efmp-409/unit-03/fig-U3-13.webp`, so the CI-built production site is not the
  reviewed input. The brief forbids building or serving the site from a review job, so no browser
  or print inspection was run. Narrow-viewport scrolling, A4 print clipping and visual
  accessibility of the current bytes remain unverified, so accessibility cannot pass and the
  report escalates. Structural checks from source (heading order, figure alt text, `desc` equals
  `alt`, glyph geometry) pass.

## Advisory only

This report does not certify the unit, sign anything, append a tracker row, change
`translation_status`, alter the reviewer registry or publish. G3 stays open.
