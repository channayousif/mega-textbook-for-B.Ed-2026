# EFMP-407 Unit 8 - G3 English review summary

Reviewer: agent:opencode-g3-reviewer. Stage: G3. Date: 2026-11-07.
Disposition: **revise**. G3 remains open and unsigned. This report is advisory.

The unit is well structured, plain-language and carefully scoped. Its authority, coverage,
readability and pedagogy are sound, the assessment bank matches its keys, and every deterministic
gate passes. One blocking source defect prevents a pass: the Jumani and Abbasi (2015) passage that
carries two of the unit's claims is not in the paper. A per-topic formative item is also tagged
above its approved band, and the Sindh Act's cited URL is dead.

## Criterion evidence

### authority - pass

- `specs/content/efmp-407/content-spec.md:417-459` (Unit 8, weeks 15-16, SLO:EFMP-407-8-1 and -8-2,
  tracing to learning outcome (c) and guide objective 5) is the approved authority (`D-2026-0076`).
- `Scheme-and-Course-guides/extracted-text/3rd 2026.txt:369-371` names the two guide sections:
  planning and implementing sustainability projects; community participation and reporting. The
  content spec splits each into two sub-topics (U8-01 to U8-04), which the spec's own sub-topic
  split rule sanctions (`content-spec.md:468`).
- `docs/semester-3/efmp-407/unit-08/index.mdx` carries both SLO refs and four learning outcomes at
  Apply, Analyze and Create.
- Both topic files carry the matching `clo_refs` and the named sections exist.

### sources - fail

- `specs/content/efmp-407/reviews/unit-08/G3/crew-efmp-407-u08-review_en/source-verification.md`.
- **F1 (blocking).** The Jumani and Abbasi (2015) bound excerpt's second passage is presented as a
  verbatim quote but is not in the paper. The publisher abstract and the full 7-page PDF (fetched
  from the publisher's text-mining link) contain none of its distinctive phrases. The unit's claims
  at `topic-01.mdx:57` and `:78` rest on it, and `coverage/unit-08.md:9,11` maps U8-01 and U8-02 to
  the source. Repair: remove or replace the attribution, or rewrite the claims to match the paper's
  actual content.
- **F2 (advisory).** The Wals et al. (2024) bound excerpt's four passages are presented in
  quotation marks but are not verbatim from the open-access book. The unit's paraphrases are fair
  and the concepts are present; the source file should present them as paraphrases.
- **F3 (advisory).** The Sindh Act's cited URL (`pas.gov.pk`) returns HTTP 404. An official copy at
  `sja.gos.pk` carries the same Section 16 text, which supports the unit's claims. Update the URL.
- **F4 (uncertain).** `topic-02.mdx:61` says Tilbury and Wortman (2004) "demonstrate that lasting
  sustainability occurs only when participation reaches active collaboration". The source is
  unretrievable and the declaration supports title-level claims only; a demonstrated causal
  relationship is more than the declaration supports.
- **F5 (advisory).** `topic-02.mdx:75` attributes a four-part reporting taxonomy to Wals et al.
  (2024); the "Community mobilization" purpose is not in the bound passage.
- **F6 (advisory).** The six-stage project cycle is an author elaboration of the bound Wals
  excerpt's five phases, but `coverage/unit-08.md` maps U8-01 to Wals for "project cycle".

### coverage - pass

- `specs/content/efmp-407/coverage/unit-08.md` maps U8-01 to topic-01 "Planning sustainability
  projects", U8-02 to "Implementing sustainability projects", U8-03 to topic-02 "Community
  participation", U8-04 to "Reporting project outcomes". All four sections exist and cover their
  sub-topic.
- `docs/semester-3/efmp-407/unit-08/index.mdx` `## In this unit` lists both topics.
- The unit-end bank covers both topics and both SLOs: MCQ 1-5 and RRQ 1-5 on topic 8.1, MCQ 6-10
  and RRQ 6-10 on topic 8.2; ERQ 1-2 project planning, ERQ 3-4 community and reporting, ERQ 5
  integrative.
- `specs/content/efmp-407/concepts/unit-08.md` links every concept to assessment item IDs; the
  graph is acyclic and resolvable (`check:concept-graph` exit 0).

### assessment - fail

- `assessment-independent.md` records an independent solve of all 10 MCQ, 10 RRQ and 5 ERQ, then a
  comparison with the supplied keys. Every key matches; no distractor is ambiguous; every ERQ
  rubric distinguishes performance and demands Analyze-or-higher; every mark total is 10.
- MCQ tags stay Remember to Apply; RRQ tags stay Understand to Analyze; ERQ tags span Analyze to
  Create. Every ERQ rubric demands Analyze or higher (`check:bloom-bands` exit 0).
- **F8 (uncertain).** `topic-02.mdx:138` (`## Check your understanding` item 3) is tagged
  `*(Analyze)*`, above the approved formative band `Remember/Understand/Apply`
  (`content-spec.md:424`; `style-guide.md:237`). The label matches the actual demand, so either
  reword the item to the band or record an owner ruling that the band extends.
- **F7 (advisory).** MCQ 6's stem omits "school management" from the four groups the Act requires,
  making the question slightly incomplete; the key (C) is still the only defensible answer.

### accessibility - pass

- Static inspection: the nine-part headings are present and ordered; every figure has a meaningful
  `alt`, a `<title>` and a `<desc>` equal to the carrier alt; links are descriptive; the
  glossary terms resolve to bilingual entries; `PrintHandout` is present on both topic pages and
  the assessment page.
- `node scripts/measure-figure-text.mjs` exits 0 on all four SVGs: no text overflows the viewBox
  and no glyph overprints the wordmark.
- All four SVGs and their dark variants were rasterised to PNG (`renders/`); light and dark carry
  distinct dominant colours.
- **F9 (advisory).** No live browser render of the reviewed pages was possible: the brief prohibits
  a build, a dev server and Playwright. The live site does publish Unit 8, but the live build is
  not the reviewed commit. Static layout and geometry checks stand in for it. See
  `render-review.txt`.

### readability - pass

- Definitions precede use: Whole School Approach, project cycle, monitoring indicators, SMC, School
  Improvement Plan, co-ownership, multimodal reporting.
- Sentences are short and active; the register is accessible to an HSC/intermediate graduate.
- The unit keeps the plain-English ceiling while raising conceptual depth, as the style guide
  requires.

### pedagogy - pass

- Each topic opens with a fictional Pakistani classroom situation (Badin, Larkana), explains the
  concept, gives a worked example, runs a group activity, checks understanding, summarises, and
  closes with retrieval, reflection and a summative task.
- The three approved misconceptions are named and corrected: a project is not finished when the
  activity is done; the community is not an audience; reporting is not a long unread document.
- Activities are feasible with low-cost materials (recycled bottles, gravel, native seeds, notice
  boards). Safety is explicit: no child handles hazardous chemicals, sharp metal or sewage.
  Inclusion is explicit: equal leadership for boys and girls, oral routes for non-literate
  parents.

## Findings

| ID | Severity | Criterion | Finding |
|---|---|---|---|
| F1 | blocking | sources | The Jumani and Abbasi (2015) bound passage is not in the paper. Repair the attribution at topic-01.mdx:57 and :78, the sources row, the bound excerpt and the coverage mappings. |
| F2 | advisory | sources | The Wals et al. (2024) bound passages are paraphrases presented as quotations. |
| F3 | advisory | sources | The Sindh Act URL is dead; an official copy exists at sja.gos.pk. |
| F4 | uncertain | sources | Tilbury and Wortman (2004) is asked to demonstrate a causal relationship that title-level support cannot carry. |
| F5 | advisory | sources | The "Community mobilization" reporting purpose is not in the bound Wals passage. |
| F6 | advisory | coverage | The six-stage cycle is an elaboration of the bound five-phase passage, but the coverage matrix attributes the project cycle to Wals. |
| F7 | advisory | assessment | MCQ 6's stem omits "school management" from the Act's four equal-representation groups. |
| F8 | uncertain | assessment | topic-02.mdx:138 is tagged Analyze, above the formative band Remember/Understand/Apply. |
| F9 | advisory | accessibility | No live browser render was possible under the brief; figure rasters and static layout checks stand in. |

## Commands

All deterministic gates were run and logged under `logs/`. `validate:content`, `check:depth-gate`,
`check:figures`, `check:no-em-dash`, `check:no-answer-keys`, `check:docs-sync`,
`check:concept-graph`, `check:bloom-bands`, `check:svg-style`, `check:source-floor`,
`measure-figure-text`, `rasterize` and `npm run check:content` all exited 0. `render-review` exited
0 on the static and geometry evidence, with the missing live render recorded as F9.

## Verdict

Repair the Jumani and Abbasi (2015) attribution (F1), then bring the per-topic formative item back
inside its approved band or record an owner ruling (F8). The advisory items (F2, F3, F5, F6, F7, F9)
should be folded into the same repair. A fresh review of the repaired bytes is required before G3
can pass.
