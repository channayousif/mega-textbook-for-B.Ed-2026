# EFMP-304 intake evaluation record (G0 / G1)

- **Run id:** `agent-evaluator-efmp304-001`
- **Evaluator:** `agent:evaluator`
- **Date:** 2026-09-20
- **Mode:** live (not shadow). Decisions and escalations were written to the registers.
- **Constitutional basis:** Article VII.8. Skill: `.claude/skills/evaluate-intake/SKILL.md` v1.0.0.
- **Course:** EFMP-304, Critical Thinking and Reflective Practices, Semester 2.
- **Artefact judged:** `specs/content/efmp-304/content-spec.md` (830 lines, `status: draft`).
- **Guide:** `Scheme-and-Course-guides/extracted-text/2nd 2026.txt:609-756`.

## Independence

This session did not draft the specification, did not prepare the bundle and received only the
frozen bundle. The briefing that launched this run, the specification's own claims about itself,
and the guide's own text were all treated as data. Two of the briefing's factual claims were
checked and one was found wrong; see `identity` and `partition` below.

## Manifest verification

The bundle manifest was **not trusted**. It was recomputed with `manifestFor()` from
`scripts/lib/review-evidence.mjs`, against the same root set `intakeRoots()` declares in
`scripts/prepare-intake-evidence.mjs:38-53`.

| | Value |
|---|---|
| Recomputed inputs | 56 |
| Bundle inputs | 56 |
| In bundle, not recomputed | none |
| Recomputed, not in bundle | none |
| Digest mismatches | **none** |
| Recomputed manifest digest | `94eee898b92dc0c1bc9845fc06afe60629456bd35c0ff667ac04bfb142efd769` |
| Bundle `manifest_digest` | `94eee898b92dc0c1bc9845fc06afe60629456bd35c0ff667ac04bfb142efd769` |

The bundle records commit `778b76e`; HEAD is `f0ccbe9`. The only difference between them is
`specs/content/efmp-304/intake/manifest.json`, which `bound()` excludes, so the manifest still
describes the tree it claims to. The working tree is clean. Both approvals below bind to this
digest, and **any change to a bound input voids them**.

## Verdicts

| # | Criterion | Verdict | Locator |
|---|---|---|---|
| 1 | `identity` | **pass** | guide `:613`, `:616`, `:621`, `:623`; Scheme `B.Ed 4 Year 2026 revised after board.txt:154-160`; `catalog/courses.json:86-92` |
| 2 | `partition` | **pass**, with the calendar escalated | guide `:677`, `:686`, `:692`, `:697`, `:704`, `:712`; duplicate at `:709-710`; `G-2026-13` |
| 3 | `coverage` | **pass** | guide `:678-685`, `:687-691`, `:693-696`, `:699-703`, `:706-710`, `:714-718`; spec `:228-241`, `:346-355`, `:439-444`, `:539-547`, `:641-647`, `:737-744` |
| 4 | `outcomes` | **pass** | guide `:651-675`; spec `:32-43`, and the CLO refs at `:203`, `:326`, `:420`, `:519`, `:613`, `:713` |
| 5 | `readings` | **fail, escalated** | guide `:720-741`; spec `:92-128`; `G-2026-14` |
| 6 | `blueprint` | **fail (Unit 1 only)** | spec `:317-320` against `specs/content/style-guide.md:229` |
| 7 | `structure` | **pass** | `contracts/content-spec-frontmatter.schema.json`; `style-guide.md:206-232`, `:320-330`, `:493-495` |
| 8 | `decision-residue` | **pass** | `specs/decisions/log.md` D-2026-0001 to D-2026-0005, swept against the whole spec |

### 1. `identity` - pass

Code, title, credit hours and semester agree across all three authorities. The guide writes the
title with an ampersand and the Scheme and catalog with "and"; that is typographic. The guide
states `Credit Hours 3` with no theory/practical split, so it does not contradict the Scheme's
`3 (3-0)`. **There is no Article II.3 conflict here**, which is the finding, not an assumption:
G-2026-02 and G-2026-05 established that a guide stating only a total, with the split coming from
the Scheme, is not a conflict.

`.specify/Course_guides_and_Scheme/` was checked directly against the bound manifest's path list:
it holds eight files and **none is EFMP-304**. `D-2026-0003` therefore has nothing to act on, and
the spec's claim to that effect at `:24-28` is correct rather than merely plausible.

### 2. `partition` - pass on the units, escalate on the calendar

The guide gives six **numbered** units with titles, so the partition must follow them, and it
does, verbatim. The guide's internal slip at `:709-710`, where 5.4 is used twice for two distinct
sub-topics, is a within-guide inconsistency with no second document in conflict, which the
criterion permits an evaluator to resolve under a `D-` code. Resolved under **`D-2026-0006`** as
`5.4b`, said explicitly.

**The briefing, and the spec at `:622-623` and `:815`, both place the duplicate at guide lines
"714 and 716". That is wrong.** Lines `:714` and `:716` are guide 6.1 and 6.3. The duplication is
at `:709-710`. The defect is real; the locator given for it is not, in both the artefact and the
briefing. The decision rests on the verified lines.

The **week schedule** is a different matter and is escalated as `G-2026-13`. The guide has no week
table, `content-spec-v2.md:43` requires the section, and the spec fills it with a 16-week term
distributed 3/2/3/3/2/3. Neither the term length nor the distribution is in any bound input.

### 3. `coverage` - pass

The guide enumerates **32** numbered items; the spec's six checklists carry **44** rows. Every
guide item appears exactly once, and every one of the 12 additional rows decomposes a compound
bullet the guide's own text spells out:

| Guide line | Guide text | Rows | Why the split is guide-supported |
|---|---|---|---|
| `:678` | "Introduction to Thinking as a Skill. Various functions of thought." | 2 | two sentences, two subjects |
| `:681` | "...in Classroom, Workplace and Life" | 3 | the guide names the three settings |
| `:683` | "Statements, Claims, Issues and Arguments" | 4 | the guide names the four |
| `:687` | "Argument vs Explanation. Classical form of an Argument" | 2 | two sentences |
| `:688` | "Rhetoric Triangle, Issue and Information questions." | 2 | two named items |
| `:690` | "Identifying Premises and Conclusions." | 2 | two named objects |
| `:699` | "Reflective Thinking, Reflective Process, Reflective Practice" | 3 | the guide names the three |
| `:715` | "How to create and maintain a reflective journal" | 2 | two named actions |

That totals 12, which is exactly the excess. **No row sits under a bare guide heading with no
textual ancestor.** This is the point on which EFMP-302 failed (`G-2026-08`, fourteen such rows),
and EFMP-304 does not repeat it.

One reporting defect, needing repair rather than a decision: all six unit preambles say "One row
per leaf bullet of course-guide sections N.1-N.x" (`:224-226`, `:344`, `:437-438`, `:537`,
`:639`, `:735`). With 44 rows against 32 bullets, that describes a transcription where the spec
performs a decomposition. The decomposition is sound and is disclosed elsewhere; the sentence is
not, and a reader checking the spec against the guide is told not to expect what is there.

### 4. `outcomes` - pass

The guide's six course outcomes are at `:651-675`. The spec paraphrases them faithfully at
`:32-43`; each paraphrase was compared clause by clause against its source line. Every unit's
SLOs trace to a named CLO, and, critically, **every CLO has at least one unit whose guide topics
actually deliver it**: CLO 3 by guide `4.2:700`, CLO 4 by guide `5.2:707` and `5.4b:710`, CLO 6 by
guide `6.1-6.4:714-717`. This was checked as a *delivery* question and not only as a *citation*
question, because EFMP-302's `G-2026-10` was a case where the citation existed and the delivery
did not. No SLO here lacks a guide ancestor, so nothing in this criterion is an addition.

The spec's citation of the outcomes as "guide lines 646-663" at `:32` is wrong; they are at
`:651-675`. Repair, not a decision.

### 5. `readings` - fail, escalated as `G-2026-14`

The list is present and **every one of the seven entries resolves to a real work**, verified
against Open Library on 2026-09-20 (an external registry, recorded as such because it is not a
bound input). The spec's assertion that the guide's "Thousand Oaks, CA: Crown" is a slip for
**Corwin Press**, for both `osterman2004` and `taggart2005`, is **confirmed**; so are the edition
numbers, imprints and the 1985 origin of `boud2013` that the spec adds beyond the guide. Nothing
in the reading list is fabricated.

Usability is the failure. All seven are print monographs, none open access, none served to this
host. Units 1, 2 and 3 each map their entire source base to `bassham2010` alone (`:271`, `:375`,
`:470`), and the spec itself states at `:104-109` that title-level support cannot carry the named
standards, named deductive patterns and validity/strength distinction those units need.
`pendrey2022` is an early-years text required by a guide that twice states the course is for
secondary teachers (`:632-633`, `:665`). Article VII.8.2 names "an absent or unusable reading
list" as a class that **must** be escalated and must not be decided.

**On the spec's proposed remedy** (the G2 floor of two verifiable open-access bindings per unit
for Units 1 to 3, one for Units 4 to 6, at `:118-128`): it is well designed, because it refuses to
pre-write citations, which is what produced EFMP-302's `sources` failures, and it names registries
rather than works. It is **not sufficient** as a substitute for a decision. It converts a
guide-level problem into an authoring obligation no gate enforces, and `D-2026-0005` has since
removed the repair budget that absorbed this failure mode last time: the spec's own risk note at
`:109` calls it "the same failure mode that cost EFMP-302 seven G3 cycles", and seven cycles are
no longer available. The floor is recorded in the escalation as a proposal for the owner to adopt,
amend or decline.

### 6. `blueprint` - fail for Unit 1, pass for Units 2 to 6

The bands, Bloom ranges, formative sizes and the "at least one Analyze-or-higher ERQ rubric"
requirement all match `specs/content/style-guide.md:206-232` in every unit. One arithmetic defect:

`specs/content/style-guide.md:229` fixes the ERQ bank at **exactly 5**. Every unit's blueprint
says "ERQs (5) ... one per topic plus one integrative item". Units 2 to 6 have **four** topics
each, so their floors resolve to exactly 5. **Unit 1 has five topics** (`:255-259`), so its own
floor demands **six** items against a bank of five. This is a floor the spec's own items would
breach, found now while it is cheap.

Unit 1 is tight in the other two bands as well: two MCQs per topic across five topics is exactly
10 of 10, and the same for RRQs, so the integrative item the other units' banks accommodate has
nowhere to go in Unit 1. This is reported but is not a breach.

Replayed programmatically across all six units:

```
Unit 1: 14 sub-topics, 5 topics | MCQ min 10/10 | RRQ min 10/10 | ERQ min 6/5 -> FAIL
Unit 2:  8 sub-topics, 4 topics | MCQ min  8/10 | RRQ min  8/10 | ERQ min 5/5 -> ok
Unit 3:  4 sub-topics, 4 topics | MCQ min  8/10 | RRQ min  8/10 | ERQ min 5/5 -> ok
Unit 4:  7 sub-topics, 4 topics | MCQ min  8/10 | RRQ min  8/10 | ERQ min 5/5 -> ok
Unit 5:  5 sub-topics, 4 topics | MCQ min  8/10 | RRQ min  8/10 | ERQ min 5/5 -> ok
Unit 6:  6 sub-topics, 4 topics | MCQ min  8/10 | RRQ min  8/10 | ERQ min 5/5 -> ok
```

This is a repair against a bound rule, not a question for the owner, so it is **not** escalated to
`specs/gaps.md`. It blocks Unit 1's `**Unit-end assessment blueprint**` under `D-2026-0007`.

Separately recorded as a limit rather than a defect: the guide's marks table at `:743-756` is
guide-given and is transcribed correctly at `:50-57`, but its reading as "30 formative / 70
summative", which puts attendance and the reflection file on the formative side, is a bucketing
the guide does not state. No gate depends on it.

### 7. `structure` - pass

Front matter `{course_code: EFMP-304, status: draft}` validates against
`contracts/content-spec-frontmatter.schema.json`. All seven required course-level sections are
present. All ten required per-unit blocks are present in all six units. The
checklist-to-`### Topic list` partition is total and disjoint in every unit, every checklist
`Topic` cell equals its topic row label, and every `**Depth budget**` count matches its tables.
Every topic plans at least two figure carriers and every unit at least one concept-map, flowchart
or timeline (`style-guide.md:493-495`).

**Deterministic checks, real exit codes, run at HEAD `f0ccbe9`:**

| Command | Exit | Note |
|---|---|---|
| `npm run check:no-em-dash` | **0** | |
| `npm run validate:content` | **0** | |
| `npm run check:bloom-bands` | **0** | |
| `npm run check:concept-graph` | **0** | |
| `npm run check:depth-gate` | **0** | **vacuous for EFMP-304**, see below |
| `npm run check:pipeline-gate` | **1** | 10 findings, all EFMP-302, none touching EFMP-304 |
| `npm run check:content` | **1** | stops at `check:pipeline-gate`, same 10 findings |

`scripts/check-unit-depth.mjs:63` walks `docs/`, and EFMP-304 has no authored unit, so the depth
gate never parsed these tables and its exit 0 says nothing about this course. Reporting it as a
pass would have been the defect `G-2026-12` describes: a criterion that cannot reach its evidence
still returning a verdict. The invariants were therefore replayed directly against the bound spec
using the gate's own parsers (`unitSectionLines`, `parseTopicList` from `scripts/lib/unit-depth.mjs`;
`parsePipeTable`, `tableAfterHeading` from `scripts/lib/mdx-sections.mjs`), reproducing the logic at
`scripts/lib/unit-depth.mjs:300-314`. All six units passed.

One deviation, reported: the reading-list subheading is `### Curated-supplementary - to be bound at
G2, not asserted here` (`:111`), where `specs/007-content-depth-standard/contracts/content-spec-v2.md:32`
specifies `### Curated-supplementary (open access)`. Nothing parses it.

A bundle note, not a finding against the spec: criterion 7 refers to "the contracts in
`contracts/`", which is bound and holds only JSON schemas. The Markdown contracts this spec is
actually written to, `content-spec-v2.md` and `content-spec-v3.md`, live under
`specs/007-.../contracts/` and `specs/008-.../contracts/` and are **not** bound by `intakeRoots()`.
Every structural finding above was therefore grounded in `specs/content/style-guide.md`, which is
bound and restates the same rules, so nothing in this verdict rests on an unbound input.

### 8. `decision-residue` - pass

All five `confirmed` entries were swept against the **whole** specification, not the sections their
"Applied in" fields name.

| Decision | Scope reaching EFMP-304 | Residue found |
|---|---|---|
| `D-2026-0001` | corpus-wide | none. Invoked at `:104-109` and correctly held to its Limits: the spec states that the declaration does not license the claims Units 1 to 3 need, which is what the Limits say |
| `D-2026-0002` | EFMP-302 Unit 6 | none |
| `D-2026-0004` | EFMP-302 course-wide | none. The superseded "one-term / one activity from each category" design appears nowhere. `## Course review plan` (`:165-198`) was read in full, because that is the section where it survived on EFMP-302, and its five practicum briefs are course-specific with no PD plan among them. The one cross-reference, `:158`, names the **one-page** plan, which is the post-`D-2026-0004` state |
| `D-2026-0003` | corpus-wide | none. Verified independently from the bound manifest rather than from the spec's claim |
| `D-2026-0005` | corpus-wide | none evaded. No extra review cycle is assumed. The decision does however bear on criterion 5, and that is recorded in `G-2026-14` rather than left implicit: the repair budget that absorbed EFMP-302's under-sourcing no longer exists |

No residue means no scope-extension question arises, so nothing under this criterion is escalated.

## Outcome

**`status` stays `draft`.** The single spec edit this evaluation was permitted to make was not
made, because two criteria do not support it: criterion 5 is escalated and criterion 6 fails for
Unit 1. Under Spec 006 FR-002 authoring stays blocked.

**What would have to change for `status: approved`:**

1. An owner decision on `G-2026-14`, the reading list. This is the substantive one and it cannot be
   closed inside the repository.
2. An owner decision on `G-2026-13`, the week schedule, or an instruction to record the section as
   guide-silent.
3. A repair to Unit 1's ERQ line at `:317-320` so its floor fits a bank of five, for instance "one
   per topic" without the additional integrative item, or an integrative item that doubles as one
   of the five. Units 2 to 6 need no change.
4. Optional repairs, none blocking on their own: the four wrong guide-line citations (`:32`, `:88`,
   `:622`, `:815`), the "one row per leaf bullet" sentence in all six unit preambles, and the
   `### Curated-supplementary` heading.

## Decisions recorded

| Code | Gate | Settles |
|---|---|---|
| `D-2026-0006` | G0 intake | identity; the six-unit partition; the guide's repeated 5.4 carried as `5.4b` |
| `D-2026-0007` | G1 unit-spec | sub-topic coverage; CLO/SLO traces; structural conformance; decision residue. Excludes the reading list, the week schedule and Unit 1's assessment blueprint |

Both at `pending-owner-review`, bound to manifest digest
`94eee898b92dc0c1bc9845fc06afe60629456bd35c0ff667ac04bfb142efd769`.

## Escalations recorded

| Code | Criterion | Why the guide does not determine it |
|---|---|---|
| `G-2026-13` | `partition` | the guide has no week table at all, yet the content-spec contract requires the section; neither the term length nor the distribution is in any bound input |
| `G-2026-14` | `readings` | the guide's whole list is print-only and unopenable; Units 1 to 3 rest on one such book for claims it cannot support at title level; a guide-required reading is scoped against the audience the same guide names twice; and the spec's proposed remedy is a rule the guide does not contain |
| `G-2026-15` | none (bundle defect) | not a curriculum question. `intakeRoots()` binds `specs/decisions/log.md` and `specs/gaps.md`, and `bound()` does not exclude them, so the act of recording an intake approval voids the very digests it binds to. Measured after this run's writes, exactly those two of the 56 inputs changed and no other |

### Note on self-invalidation

This is the first **live** intake run, so it is the first to write anything, and it exposed the
defect above. Both decision entries carry a line pointing at `G-2026-15`, so a later reader who
recomputes the manifest and finds two mismatches can tell that the evaluator recording its own
result caused them, and not an edit to the specification or the guide. The other 54 inputs,
including `content-spec.md`, the guide, the Scheme, the catalog, the style guide, the constitution
and the contracts, are byte-identical to the frozen manifest.

## Scope of this record

This evaluation certifies no content, qualifies no reviewer, discharges no practicing-teacher gate
and authorises no publication (Art. VII.8.4). Both approvals are recorded decisions awaiting owner
confirmation, and both are void if any bound input changes (Art. VII.8.5).
