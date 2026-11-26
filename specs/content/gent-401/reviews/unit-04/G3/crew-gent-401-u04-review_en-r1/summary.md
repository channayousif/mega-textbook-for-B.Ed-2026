# GENT-401 Unit 4 - G3 English review (advisory)

- **Reviewer:** `agent:claude-crew` (claude_crew worker), model `LongCat-2.5`
- **Reviewed commit:** `4f558d48a8508e40f21fb072b6c4ddbe4608368c` (branch `crew/gent-401-u04-review_en`)
- **Input manifest:** `manifest.json` (93 bound inputs, prepared 2026-11-26)
- **Disposition:** **escalate** (advisory only; unsigned, not a certification or a tracker done mark)

## Why escalate

The mandatory `render-review` could not be performed. The deployed site is built from
`366019f8ace647e892523e553b81ab6d1832ec68`, which differs from the reviewed HEAD for this unit
(`index.mdx` modified and `fig-U4-5.webp` added), so the live pages are not the reviewed input. The
crew brief prohibits building or serving the site. Narrow-screen, reading-order, clipping and A4
print inspection therefore remain unverified, and the skill requires escalation when a required
render cannot be obtained.

## Criteria

| Criterion | Status | Note |
|---|---|---|
| authority | pass | Weeks 7 and 9 leaves map to exact Explanation headings; spec approved |
| sources | fail | OpenStax license recorded as CC BY 4.0 in one place and CC BY-NC-SA 4.0 in two others; Mellor survival-rate claim exceeds its unverifiable declaration |
| coverage | pass | U4-01..U4-06 all mapped and taught |
| assessment | fail | Formative item above the approved band; concept-graph mapping errors; ERQ 1 prompt says "eight-section" |
| accessibility | unverified | No render available; SVG text geometry and alt text checked statically |
| readability | pass | Definitions, worked examples and misconceptions in an HSC register |
| pedagogy | pass | Classroom situation, explanation, activity, retrieval, reflection, summative task in both topics |

## Findings (all unresolved)

- **F1 advisory** - `sources/unit-04.md:7` says openstax is CC BY 4.0; `:17`, the bound note and the
  live OpenStax page say CC BY-NC-SA 4.0.
- **F2 uncertain** - `topic-01.mdx:55` attributes a specific survival-rate claim to Mellor (2009);
  the declaration covers only a general premise and records no owner ruling or retrieval attempt.
- **F3 uncertain** - `topic-02.mdx:130` "Check your understanding" item 3 is tagged `*(Analyze)*`,
  above the approved Remember/Understand/Apply formative band.
- **F4 advisory** - `unit-assessment.mdx:102` ERQ 1 says "eight-section business plan" while the unit
  and rubric say nine.
- **F5 advisory** - `unit-assessment.mdx:130` RRQ 1 asks for nine sections but the model answer names
  about six and the 2-mark scheme does not require all nine.
- **F6 advisory** - `concepts/unit-04.md:8-12` maps MCQ-04, MCQ-06, MCQ-08, MCQ-09 and RRQ-08 to the
  wrong concepts.
- **F7 uncertain** - `fig-U4-4.svg` stage 3 draws 21 people while the label, manifest alt and
  `topic-02.mdx:96` say twenty.
- **F8 advisory** - `topic-01.mdx:43` claims the nine-part structure is recognised across "Pakistani
  commercial standards"; no bound source names one.
- **F9 advisory** - `topic-01.mdx:99` calls the four-part mission formula "proven"; no bound source
  documents it.
- **F10 uncertain** - Rendered-page and A4 print inspection unavailable (see above).
- **F11 uncertain** - No parent-prepared frozen handoff or exact author runtime identity was supplied.

## Commands

All six deterministic content gates the contract names passed (`validate:content`,
`check:depth-gate`, `check:figures`, `check:no-em-dash`, `check:no-answer-keys`, `check:docs-sync`),
plus `check:concept-graph`, `check:bloom-bands`, `check:content` and `measure-figure-text`.
`render-review` is recorded as unavailable with its reason log. Logs are under
`logs-20261126T210700Z/`.

## Acceptance boundary

This report is advisory. It is unsigned, so it cannot certify the unit, satisfy a pipeline gate, or
support provisional publication. No tracker done mark, signature, registry entry or publication
action is claimed.
