# EFMP-407 Unit 5 - G3 English review summary (attempt crew-efmp-407-u05-review_en)

Reviewer: agent:opencode-g3-reviewer. Stage: G3. Date: 2026-11-07.
Disposition: **revise**. G3 remains open and unsigned. This report is advisory.

The unit is well structured, plain-language and carefully qualified. Its assessment bank matches
its keys, the deterministic gates all pass, and most cited sources are real and support the
claims. One blocking source defect remains: the IUCN Pakistan 2004 citation resolves to an
unrelated Tanzania report and does not carry the glacier-grafting claim it is cited for. A second
finding records that two per-topic retrieval items are tagged Analyze, above the approved
formative band. The unit bytes are unpublished (the live site returns 404 for every unit-05
route), so nothing has shipped on the strength of this content.

## Criterion evidence

### authority - pass

- `specs/content/efmp-407/content-spec.md:279-326` (Unit 5, SLO:EFMP-407-5-1 and -5-2, tracing to
  guide objectives 1 and 5 and learning outcome (b)) is the approved authority (`D-2026-0076`).
- `Scheme-and-Course-guides/extracted-text/3rd 2026.txt:357-360` names the three guide sections:
  peace, gender equality, social justice; human rights and inclusion; indigenous knowledge
  systems. The content spec splits the first into U5-01, U5-02 and U5-03, which the spec's own
  sub-topic checklist sanctions.
- `docs/semester-3/efmp-407/unit-05/index.mdx` carries both SLO refs and five learning outcomes at
  Understand, Analyze, Apply, Evaluate and Analyze.
- All three topic files carry the matching `clo_refs` and the named sections exist.

### sources - fail

- `specs/content/efmp-407/sources/unit-05.md:14` and
  `docs/semester-3/efmp-407/unit-05/topic-03.mdx:168` cite IUCN Pakistan (2004) *Indigenous
  Knowledge and Biodiversity Conservation in Pakistan* at
  `https://portals.iucn.org/library/sites/library/files/documents/2004-099.pdf`. That URL returns
  a Tanzania marine-park report, not the cited work, and the cited title could not be located.
  The glacier-grafting claim the citation carries is not in the bound excerpt. See
  `source-verification.md` and F1.
- The other cited sources (UNESCO 2017, UNESCO 2020, Pakistan Constitution, UNCRC, Zidny 2020,
  Owuor 2008, Kahlown 1994) are verified against their bound passages; the unit's claims match,
  with the qualifications recorded in F3, F4 and F5.

### coverage - pass

- `specs/content/efmp-407/coverage/unit-05.md` maps U5-01 to topic-01 "Peace", U5-02 to
  "Gender equality", U5-03 to "Social justice", U5-04 to topic-02 "Human rights and inclusion",
  U5-05 to topic-03 "Indigenous knowledge systems". All five sections exist and cover their
  sub-topic.
- `docs/semester-3/efmp-407/unit-05/index.mdx` `## In this unit` lists all three topics in order.
- The unit-end bank covers all three topics and both SLOs: MCQ 1-3, RRQ 1-3 and ERQ 1 on topic
  5.1; MCQ 4-7, RRQ 4-7 and ERQ 2 on topic 5.2; MCQ 8-10, RRQ 8-10 and ERQ 3 on topic 5.3; ERQ 4
  and 5 integrative.
- `specs/content/efmp-407/concepts/unit-05.md` links every concept to assessment item IDs; the
  graph is acyclic and resolvable (`check:concept-graph` exit 0).

### assessment - fail

- `assessment-independent.md` records an independent solve of all 10 MCQ, 10 RRQ and 5 ERQ, then a
  comparison with the supplied keys. Every key matches; no distractor is ambiguous; every ERQ
  rubric demands Analyze or higher.
- MCQ tags stay Remember to Apply; RRQ tags stay Understand to Analyze; ERQ tags span Analyze to
  Create (`check:bloom-bands` exit 0). The `## Answers and marking guidance` section is the final
  section and the only answer prose (`check:no-answer-keys` exit 0).
- Two per-topic `## Check your understanding` items (topic-02 item 3, topic-03 item 3) are tagged
  `*(Analyze)*`, above the content spec's formative band `Remember/Understand/Apply`
  (`content-spec.md:286`) and the style guide's per-topic `Remember -> Apply` rule. The labels
  match the actual demand, so the band and the item wording are in tension. See F2.

### accessibility - pass

- Static inspection: the nine-part headings are present and ordered; every figure has a
  meaningful `alt` and each SVG has `<title>` and a `<desc>` equal to the page `alt`; the Figure
  component renders both light and dark `<img>` with identical alt and `display:none` on the
  hidden one; links are descriptive; `PrintHandout` is present on all three topics and the
  assessment.
- `node scripts/measure-figure-text.mjs` exits 0 on all six SVGs and their dark variants: no text
  overflows the viewBox and no glyph overprints the wordmark.
- All six SVGs and their dark variants were rasterised to PNG (sharp, under `scripts/heavy.sh`);
  the artifacts are registered in the evidence manifest.
- The unit's markdown tables render as HTML tables; `custom.css` gives `.markdown table`
  `display: block; width: fit-content; overflow-x: auto` below 997px, so a phone scrolls inside
  the table box and the page never overflows; the print stylesheet keeps every figure inside the
  A4 page box.
- No live browser render of the reviewed pages was possible under the brief (F7, advisory).

### readability - pass

- Definitions precede use: negative and positive peace, gender equality, environmental injustice
  (topic-01); Article 25A, inclusion and the three pillars (topic-02); indigenous knowledge
  systems, two-eyed seeing (topic-03).
- Sentences are short and active; the register is accessible to an HSC/intermediate graduate.
- "Peace education" is used without a standalone definition (F6, advisory).

### pedagogy - pass

- Each topic opens with a fictional Pakistani classroom situation (Larkana, Badin, Mastung),
  explains the concept, gives a worked example, runs a group activity, checks understanding,
  summarises, and closes with retrieval, reflection and a summative task.
- The four approved misconceptions are named and corrected: sustainability has nothing to do with
  peace or gender; social justice is a political topic teachers must avoid; inclusion is only
  about disability; indigenous knowledge is superstition.
- Activities are feasible with low-cost materials (group charters, classroom audits, community
  elder interviews). The teacher notes sequence the unit across Weeks 9 and 10 and caution on
  sensitive cases.

## Findings

| ID | Severity | Criterion | Finding |
|---|---|---|---|
| F1 | blocking | sources | The IUCN Pakistan 2004 citation URL resolves to an unrelated Tanzania report and the cited title could not be located. The glacier-grafting claim it carries is not in the bound excerpt. Repair the citation to a verifiable source, or declare the source under `## Unverifiable sources` with the retrieval attempts, date and owner authorisation. |
| F2 | uncertain | assessment | topic-02 and topic-03 `## Check your understanding` item 3 are tagged `*(Analyze)*`, above the approved formative band `Remember/Understand/Apply`. The labels match the actual demand, so either reword the items to the band or record an owner ruling that the band extends. |
| F3 | advisory | sources | The specific Karez crisis numbers and place names (thousands of tube-wells, Quetta/Mastung/Pishin, dozens of metres, village migration) and the "kash"/"punn" rangeland terms are not in the bound excerpts and could not be independently verified. |
| F4 | advisory | sources | topic-02 says UNESCO (2020) "models the inclusive classroom across three concentric dimensions"; the bound excerpt says "three interconnected dimensions". The word "concentric" is the unit's framing, not the source's. |
| F5 | advisory | sources | topic-01 cites Purvis et al. (2019) for a social-justice definition that the bound Purvis excerpt does not contain. |
| F6 | advisory | readability | "Peace education" is used without a standalone definition; the unit defines negative and positive peace instead. |
| F7 | advisory | accessibility | No live browser render of the reviewed pages was possible: the brief prohibits build, dev server and Playwright, and no Chrome is available to the browser MCP. Figure rasters and static layout checks stand in for it. |

## Commands

All deterministic gates were run and logged under `logs/`. `validate:content`, `check:depth-gate`,
`check:figures`, `check:no-em-dash`, `check:no-answer-keys`, `check:docs-sync`,
`check:concept-graph`, `check:bloom-bands`, `check:svg-style`, `check:source-floor`,
`measure-figure-text`, `npm run check:content` and the sharp rasterisation all exited 0.
`render-review` exited 0 on the figure rasters and static layout checks.

## Verdict

Repair the IUCN citation (F1) and resolve the formative-band tension (F2). The unit is otherwise
sound and the assessment bank is correct. The advisory items (F3-F7) should be folded into the
same repair where cheap, but none blocks a pass once F1 and F2 are fixed.
