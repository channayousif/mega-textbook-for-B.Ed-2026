# GENT-401 Unit 6 - G3 English review (advisory)

- **Reviewer:** `agent:claude-crew` (claude_crew worker), model `LongCat-2.5`
- **Reviewed commit:** `f71773ed96f566c1e421ec586142274b2fdf3acd` (branch `crew/gent-401-u06-review_en`)
- **Input manifest:** `manifest.json` (93 bound inputs, prepared 2026-11-26)
- **Disposition:** **escalate** (advisory only; unsigned, not a certification or a tracker done mark)

## Why escalate

Two independent reasons. First, the mandatory `render-review` could not be performed: the deployed
site is built from `366019f8ace647e892523e553b81ab6d1832ec68`, which differs from the reviewed HEAD
for this unit (`index.mdx` gained the `fig-U6-5` banner carrier and `fig-U6-5.webp` was added), so
the live pages are not the reviewed input. The crew brief prohibits building or serving the site.
Narrow-screen, reading-order, clipping and A4 print inspection therefore remain unverified, and the
skill requires escalation when a required render cannot be obtained. Second, the review found an
unresolved formative-band breach and an unsupported factual generalisation.

## Criteria

| Criterion | Status | Note |
|---|---|---|
| authority | pass | Weeks 12-13 leaves map to exact Explanation headings; spec approved |
| sources | fail | Word-of-mouth "single most influential driver" superlative has no bound support; PPC legal label unverified |
| coverage | pass | U6-01..U6-06 all mapped and taught |
| assessment | fail | Formative item above the approved band; concept-graph mapping errors; ERQ per-topic distribution not 2/2/1 |
| accessibility | unverified | No render available; SVG text geometry and alt text checked statically |
| readability | pass | Definitions, worked examples and misconceptions in an HSC register |
| pedagogy | pass | Classroom situation, explanation, activity, retrieval, reflection, summative task in both topics |

## Findings (all unresolved)

- **F1 uncertain** - `topic-02.mdx:133` "Check your understanding" item 3 is tagged `*(Evaluate)*`,
  above the approved formative band Remember - Understand - Apply (`style-guide.md:227,237`).
- **F2 advisory** - `concepts/unit-06.md:7` maps RRQ-02 (word-of-mouth promotion) to CON-1 (Branding
  and market positioning) instead of CON-2 (Promotion strategies); `:12` maps ERQ-05 only to CON-6
  although the integrative task also integrates CON-1, CON-2, CON-4 and CON-5.
- **F3 advisory** - `unit-assessment.mdx` ERQs are distributed 1 for topic 6.1 (ERQ 1) and 3 for
  topic 6.2 (ERQ 2-4) plus the integrative ERQ 5, while `content-spec.md:348` says "2 per topic plus
  1 integrative item (total 5)".
- **F4 uncertain** - `topic-01.mdx:75` asserts word of mouth is "the single most influential driver of
  school choices and tuition enrolments" in Pakistani education; no bound source supports the
  superlative. Cite a source, soften it, or record a `no-external-source` row (`style-guide.md:293`).
- **F5 advisory** - `topic-02.mdx:113` characterises the conduct as violating "the Pakistan Penal Code
  (fraud)"; no bound source supports that specific label.
- **F6 uncertain** - Rendered-page and A4 print inspection unavailable (see above).
- **F7 advisory** - `topic-01.mdx:56-61` says the positioning table is "as shown in Figure 6.1", but
  `fig-U6-1.svg` plots a different set of four ventures (it drops the standard textbook bookstore
  and adds an "Unverified Tutor").
- **F8 advisory** - `topic-01.mdx:73-78` names four channels (word of mouth, print, demonstrations,
  referral incentives) while `fig-U6-2.svg` rows are word of mouth, print, digital & social and
  demonstrations, and the alt text calls the fourth row "community events"; `fig-U6-4.svg` gives the
  patent example as "at half normal cost" where `topic-02.mdx:88` says "80 percent less wire".

## Commands

All six deterministic content gates the contract names passed (`validate:content`,
`check:depth-gate`, `check:figures`, `check:no-em-dash`, `check:no-answer-keys`, `check:docs-sync`),
plus `check:concept-graph`, `check:bloom-bands`, `check:content` and `measure-figure-text`.
`render-review` is recorded as unavailable with its reason log. Logs are under
`logs-20261126T220359677Z/`.

## Acceptance boundary

This report is advisory. It is unsigned, so it cannot certify the unit, satisfy a pipeline gate, or
support provisional publication. No tracker done mark, signature, registry entry or publication
action is claimed.
