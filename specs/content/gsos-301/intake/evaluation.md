# GSOS-301 intake evaluation (G0 / G1)

- **Evaluator:** agent:evaluator (fresh session; did not draft the spec, which was drafted by the
  Paperclip BilingualAuthor agent)
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (bound digest `77ff2fa9...5ff2`)
- **Date:** 2026-10-10
- **Worktree:** detached at `ca5f0af5eb0b7c697dd33c091b4ae6feb72d683b`
- **Decision:** `D-2026-0051` (pending-owner-review)
- **Escalations:** `G-2026-92`, `G-2026-93`, `G-2026-94` (open). `G-2026-95` and `G-2026-96`
  are unused.

## Manifest verification

`manifest.json` in this directory was recomputed independently with `manifestFor()` from
`scripts/lib/review-evidence.mjs` over the same `intakeRoots('gsos-301')` set that
`prepare-intake-evidence.mjs` uses: 63 inputs, **0 mismatches**, no extra or missing path, the
`manifest_digest` `99a1ad1ed73ffc58ee06b63fb45126a419c9dc337be2b30ecca1d4ee0e827752`
reproduced from a fresh read, and both `registers` digests matched at read time. HEAD equals the
manifest commit and the tree was clean before any write. Any change to a bound input voids
`D-2026-0051`.

## Criterion verdicts

| # | Criterion | Verdict | Locator |
|---|---|---|---|
| 1 | identity | **pass** | guide `2nd 2026.txt:776,778,787-789`; Scheme `B.Ed 4 Year 2026 revised after board.txt:118-121`; catalog Semester 2 group; binding owner rulings `G-2026-05` (2 (2-0)) and `G-2026-01` (title) |
| 2 | partition | **escalated** (`G-2026-92`) | guide gives Weeks 1-16 (`:802-942`), no units; six-unit merge 3/2/2/2/2/3 teaching weeks and the Unit 6 topic split are judgements |
| 3 | coverage | **pass** | 43 guide leaves (`:804-935`, excluding Weeks 8 and 16) = 43 checklist rows; each exactly once; no additions |
| 4 | outcomes | **pass** | CLOs `:794-800` = `content-spec.md:14-20`; spec adds no SLO. Units carry no CLO trace (repair) |
| 5 | readings | **fail, escalated** (`G-2026-93`, `G-2026-94`) | guide list `:964-968` (Johnson preview PDF + slide deck) absent from spec; the four spec "Guide-required" rows are not the guide's and misattributed or unresolvable; self-declared floor not owner-adopted |
| 6 | blueprint | **pass** | every unit 10/10/5 with style-guide Bloom bands; per-topic splits sum correctly (U1 3/4/3, U2-U5 5/5, U6 4/6) |
| 7 | structure | **fail** (repair) | Units 3-6 checklist IDs `3.1`... not `^U<n>-\d{2,}$` and Topic-list columns non-conforming: replay yields 0 IDs; Art. III.10 under-planned in every topic; Unit 1/2 figure-topic disagreements; course review plan short of v3 contract; v2 per-unit lines absent |
| 8 | decision-residue | **fail** (repair) | `D-2026-0012` misapplied: guide is not week-silent, yet `content-spec.md:58-69` presents a "derived" 11-week calendar that contradicts guide Weeks 1-16 |

## Deterministic checks (real exit codes, at `ca5f0af5`)

| Command | Exit | GSOS-301 findings |
|---|---|---|
| `npm run check:no-em-dash` | 0 | none |
| `npm run validate:content` | 0 | none |
| `npm run check:bloom-bands` | 0 | none |
| `npm run check:concept-graph` | 0 | none |
| `npm run check:depth-gate` | 0 | vacuous for Units 3-6 (unauthored) |
| `npm run check:figures` | 1 | 7, all Units 1-2 (prompt-only markers render no figure) |
| `npm run check:no-answer-keys` | 0 | none |
| `npm run check:docs-sync` | 0 | none |
| `npm run check:source-floor` | 0 | course declares no `open_access_floor`; nothing checked |
| `npm run check:pipeline-gate` | 1 | 4, all Units 1-2 (spec `draft`; G2 rows not done) |

Spec-side replay with `unitSectionLines`, `parseTopicList`, `parsePipeTable`,
`tableAfterHeading`: Units 1-2 partition total and disjoint (10/10, 6/6); Units 3-6 parse to
**0** checklist IDs and **0** topic-assigned IDs.

## Readings evidence (external, checked 2026-10-10; not bound inputs)

- Guide entry 1: pageplace.de preview PDF, HTTP 200, 6,270,766 bytes, sha256
  `ff612d5a30956f899c08e7ecf58598a7c67db3d1f096f096f6f1ac8def9c7b24`; PDF metadata
  Title "SOCIOLOGY: A SYSTEMATIC INTRODUCTION", Author "HARRY M. JOHNSON"; about 70 page
  objects (preview only).
- Guide entry 2: SlideShare "Introduction of Sociology", Bhavesh Singh, 31 slides, nursing framing.
- `givens2023` URL: OpenStax *Introduction to Sociology 3e*, senior authors Conerly, Holmes,
  Tamang, published 2021-06-03.
- `henson2022` URL: LibreTexts "Introduction to Sociology" resolves; no Henson attribution found.
- `lindsey2020`, `anderson2016`: Open Library returns no match as printed; nearest real works are
  Lindsey & Beach, *Sociology* (Prentice Hall) and Andersen, Taylor & Logio, *Sociology: The
  Essentials* (Wadsworth/Cengage).

## Repair items needing no owner decision

1. Units 3-6: renumber checklist IDs to `U<n>-NN`, add `Guide ref` and `Topic` columns, and
   rebuild each `### Topic list` as `Topic | Title | Sub-topic IDs | Reading-min | Figures`.
2. Plan at least two figures per topic in every unit (Art. III.10) and reconcile Topic list vs
   Figure plan for fig-U1-2, fig-U1-3, fig-U2-2.
3. Replace `## Week schedule` with the guide's own Weeks 1-16 (including Week 8 mid-term and
   Week 16 final; restore U2-05 to the Unit 2 row), dropping the "derived" label.
4. Course review plan: add a "Practice-question mix" bullet and at least one more practicum idea.
5. Add `**Prerequisite knowledge**`, `**Worked-examples plan**`, `**International best-practice
   notes**` per unit, and a CLO trace per unit.
6. `content-spec.md:32`: "explicitly for trainee teachers" is not stated by the guide; `:8` block
   citation should end at `:968`.

## Can the spec move to `status: approved` after owner confirmation?

**No, not on `D-2026-0051` alone.** Owner confirmation of `D-2026-0051` settles identity,
coverage, outcomes and blueprints. Approval additionally needs owner rulings on `G-2026-92`,
`G-2026-93` and `G-2026-94`, the structure and residue repairs above, and a re-intake against a
fresh manifest to verify those repairs. Units 1-2, authored before intake, were context only and
are not judged here.

This record certifies no content, qualifies no reviewer and authorises no publication.
