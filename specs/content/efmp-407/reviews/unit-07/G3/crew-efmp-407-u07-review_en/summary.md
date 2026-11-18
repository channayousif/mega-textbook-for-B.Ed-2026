# EFMP-407 Unit 7 - G3 English review summary

Reviewer: agent:opencode-g3-reviewer. Stage: G3. Date: 2026-11-07.
Disposition: **escalate**. G3 remains open and unsigned. This report is advisory.

The unit is well structured, plain-language and carefully qualified. Its three used sources are real
and support the claims, the assessment bank matches its keys, and the deterministic gates all pass.
Two things prevent a pass: the National Education Policy 2009 is cited to the wrong section, and no
actual rendered page or print view of the unit could be inspected because the brief prohibits a
build, a dev server and Playwright, and the live site does not publish Unit 7.

## Criterion evidence

### authority - pass

- `specs/content/efmp-407/content-spec.md` Unit 7 (weeks 13-14, SLO:EFMP-407-7-1 and -7-2, tracing
  to guide objective 6) is the approved authority (`D-2026-0076`).
- `Scheme-and-Course-guides/extracted-text/3rd 2026.txt:366-368` names the two guide sections:
  national education policy and ESD integration; curriculum reforms and teacher education
  initiatives. The content spec splits the second into U7-02 and U7-03, which the spec's own
  sub-topic-split rule sanctions (`content-spec.md:468`).
- `docs/semester-3/efmp-407/unit-07/index.mdx` carries both SLO refs and four learning outcomes at
  Understand, Analyze, Apply and Evaluate.
- Both topic files carry the matching `clo_refs` and the named sections exist.

### sources - fail

- `docs/semester-3/efmp-407/unit-07/topic-01.mdx:33` and `:107`,
  `specs/content/efmp-407/sources/unit-07.md:7` and `sources/texts/nep-2009.md:7` cite the National
  Education Policy 2009 to "section 6.1, policy actions". The cited sentence is in section 6.2
  (Curriculum Reform), policy action 5. See `source-verification.md`.
- The other two used sources (jumani-abbasi-2015, hopkins-mckeown-2005) are verified against their
  bound passages and the live publisher or mirror text; the unit's qualifications match.
- The mapped National SDG Framework is disclosed as unavailable but not under the rubric's
  `## Unverifiable sources` heading (advisory F4).

### coverage - pass

- `specs/content/efmp-407/coverage/unit-07.md` maps U7-01 to topic-01 "National education policy and
  ESD integration", U7-02 to topic-02 "Curriculum reforms", U7-03 to topic-02 "Teacher education
  initiatives". All three sections exist and cover their sub-topic.
- `docs/semester-3/efmp-407/unit-07/index.mdx` `## In this unit` lists both topics.
- The unit-end bank covers both topics and both SLOs: MCQ 1-5 and RRQ 1-5 on topic 7.1, MCQ 6-10
  and RRQ 6-10 on topic 7.2; ERQ 1-2 policy, ERQ 3-4 curriculum and teacher education, ERQ 5
  integrative.
- `specs/content/efmp-407/concepts/unit-07.md` links every concept to assessment item IDs; the
  graph is acyclic and resolvable (`check:concept-graph` exit 0).

### assessment - pass

- `assessment-independent.md` records an independent solve of all 10 MCQ, 10 RRQ and 5 ERQ, then a
  comparison with the supplied keys. Every key matches; no distractor is ambiguous; no rubric
  rewards unrequested work.
- MCQ tags stay Remember to Apply; RRQ tags stay Understand to Analyze; ERQ tags span Analyze to
  Create. Every ERQ rubric demands Analyze or higher (`check:bloom-bands` exit 0).
- The per-topic `## Summative task` mini-rubrics demand Analyze or Evaluate, satisfying the
  per-topic Analyze-or-higher rule.
- The `## Answers and marking guidance` section is the final section and is the only place answer
  prose appears (`check:no-answer-keys` exit 0).

### accessibility - unverified

- Static inspection: the nine-part headings are present and ordered; every figure has a meaningful
  `alt` and a caption with attribution; each SVG has `<title>` and a `<desc>` equal to the page
  `alt`; links are descriptive; the glossary terms resolve to bilingual entries; `PrintHandout` is
  present on every topic, the assessment and the teacher notes.
- `node scripts/measure-figure-text.mjs` exits 0 on all four SVGs: no text overflows the viewBox and
  no glyph overprints the wordmark.
- No actual rendered page, narrow-view or A4 print inspection was possible. The brief prohibits a
  build, a dev server and Playwright; the live site `textbook.com.pk` returns 404 for the Unit 7
  routes (its sitemap publishes EFMP-407 Units 1 and 2 only). See `logs/render-review.txt`.

### readability - pass

- Definitions precede use: national education policy and policy implementation (topic-01), ESD
  integration and the three dimensions (topic-01), curriculum and curriculum reform (topic-02),
  teacher education, pre-service, in-service, initiative, alignment and trade-off (topic-02).
- Sentences are short and active; the register is accessible to an HSC/intermediate graduate. The
  three `<Glossary>` terms resolve to bilingual entries in `glossary.json`.
- The unit keeps the plain-English ceiling while raising conceptual depth, as the style guide
  requires.

### pedagogy - pass

- Each topic opens with a fictional Pakistani classroom situation (Hyderabad, Sukkur), explains the
  concept, gives a worked example, runs a group activity, checks understanding, summarises, and
  closes with retrieval, reflection and a summative task.
- The three approved misconceptions are named and corrected: policy is not automatically taught;
  ESD is not only environmental studies; teacher education must change for ESD.
- Activities are feasible with low-cost materials (posters, exercise books, picture cards, supplied
  drawings). Safety is explicit: no child handles plumbing, tools or real refuse. Inclusion is
  explicit: oral routes, meaningful roles, no shaming over family purchasing, anonymous examples.

## Findings

| ID | Severity | Criterion | Finding |
|---|---|---|---|
| F1 | blocking | sources | NEP 2009 cited to section 6.1; the passage is in section 6.2 (Curriculum Reform), policy action 5. Repair the locator in topic-01.mdx (prose and Further reading), sources/unit-07.md and sources/texts/nep-2009.md. |
| F2 | uncertain | accessibility | No actual rendered page, narrow-view or A4 print inspection of Unit 7. The brief prohibits a build, a dev server and Playwright, and the live site does not publish Unit 7. |
| F3 | uncertain | provenance | No parent-prepared manifest or host author session id was supplied. The manifest was prepared locally over committed inputs; the author identity is the crew job id from the PHR. Independence holds: this reviewer did not author or translate the unit. |
| F4 | advisory | sources | The National SDG Framework unavailable-source declaration is under `## Access and interpretation notes`, not `## Unverifiable sources`, and the unit file does not restate the retrieval attempts and date. Add the heading for machine readability. |
| F5 | advisory | assessment | The bundle supplies the answers in the same file, so a blinded independent solve was not possible. The recorded solve was performed from the question prose and compared afterwards. |

## Commands

All deterministic gates were run and logged under `logs/`. `validate:content`, `check:depth-gate`,
`check:figures`, `check:no-em-dash`, `check:no-answer-keys`, `check:docs-sync`,
`check:concept-graph`, `check:bloom-bands`, `check:svg-style`, `check:source-floor`,
`measure-figure-text` and `npm run check:content` all exited 0. `render-review` exited 1 because no
render could be obtained.

## Verdict

The unit is close to a pass. Repair the NEP 2009 locator (F1), then obtain a real narrow-view and
A4 print inspection of the rendered pages (F2) before a fresh review can pass. The advisory items
(F4, F5) should be folded into the same repair.
