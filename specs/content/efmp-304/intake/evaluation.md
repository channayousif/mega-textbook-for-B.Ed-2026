# EFMP-304 intake evaluation - run `agent-evaluator-efmp304-002`

- **Gates:** G0 course intake, G1 unit-spec
- **Constitutional basis:** Article VII.8 (constitution at v5.0.0)
- **Evaluator:** `agent:evaluator`, 2026-09-20
- **Course:** EFMP-304, Critical Thinking and Reflective Practices
- **Spec under evaluation:** `specs/content/efmp-304/content-spec.md`
- **Guide:** `Scheme-and-Course-guides/extracted-text/2nd 2026.txt:609-756`
- **Outcome:** approved. `status` set from `draft` to `approved`. Two decisions recorded,
  two items escalated.
- **Independence:** this session did not draft the specification and did not make the repairs
  made since run 001. Every repair was verified against the bound inputs rather than taken on
  trust, which is the point, since the repairs were made by the session that drafted the spec.

## Manifest verification

Recomputed before judging anything, with `manifestFor()` from `scripts/lib/review-evidence.mjs`
over the same root set `scripts/prepare-intake-evidence.mjs` uses, rather than trusting the file.

```
recorded count 54  recomputed count 54
in manifest not recomputed: []
recomputed not in manifest: []
digest mismatches: []
recorded manifest_digest    95b496c8e70cba5742cde60143dcf103b8a52dc8bd67e83b5ee7bb7bf5e7f32f
recomputed (from file map)  95b496c8e70cba5742cde60143dcf103b8a52dc8bd67e83b5ee7bb7bf5e7f32f
recomputed (from disk)      95b496c8e70cba5742cde60143dcf103b8a52dc8bd67e83b5ee7bb7bf5e7f32f
registers: recorded == recomputed
```

All 54 bound inputs matched path for path and digest for digest, with no extra and no missing
entry. The manifest records commit `df6e6d3`; `HEAD` is `ea9f565`, and
`git diff --name-only df6e6d3 ea9f565` touches only `specs/content/efmp-304/intake/`, which
`bound()` excludes, so the bundle describes the working state correctly.

`registers` (`specs/decisions/log.md`, `specs/gaps.md`) also matched at read time. Per the
`G-2026-15` fix these sit outside `input_manifest` and are deliberately not freshness-bearing,
because this evaluator is required to write to both. Freshness under Art. VII.8.5 reads against
the 54.

## Verdicts

| # | Criterion | Verdict | Locator |
|---|---|---|---|
| 1 | `identity` | **pass** | guide `:613`, `:616`, `:619-621`, `:623`; Scheme `B.Ed 4 Year 2026 revised after board.txt:154-160`; `catalog/courses.json:87-92` |
| 2 | `partition` | **pass** | guide unit headings `:677`, `:686`, `:692`, `:697`, `:704`, `:712`; repeated 5.4 at `:709-710` |
| 3 | `coverage` | **pass** | guide `:678-685`, `:687-691`, `:693-696`, `:699-703`, `:706-710`, `:714-718`; spec checklists |
| 4 | `outcomes` | **pass** | guide `:651-675`; spec `:32-45`, and the six unit CLO/SLO lines |
| 5 | `readings` | **pass** (presence and resolvability; usability per confirmed `D-2026-0013`) | guide `:720-741`; spec `:94-128`. Enforcement escalated as `G-2026-17` |
| 6 | `blueprint` | **pass** | `style-guide.md:227-230`, `:234-235`; spec `:320-328`, `:416-422`, `:516-521`, `:610-615`, `:709-715`, `:810-816` |
| 7 | `structure` | **pass** | `contracts/content-spec-frontmatter.schema.json`; content-spec v2 and v3 contracts; spec headings at `:30`, `:68`, `:86`, `:92`, `:111`, `:130`, `:149`, `:165` |
| 8 | `decision-residue` | **pass** | all twelve `confirmed` entries swept against the whole spec; `## Course review plan` at `:165-197` checked specifically |

No criterion is `unverified`. Every criterion had a locator that reached its evidence.

### The three repairs claimed since run 001, verified

1. **`readings`.** `D-2026-0013` is `confirmed` in the register. The spec expresses it: the floor
   is binding at `:117-128`, at least two verified open-access sources for Units 1 to 3 and at
   least one for Units 4 to 6, through named registries (Crossref, OpenAlex, ERIC, DOAJ), with the
   date of verification; `pendrey2022` is method-only at `:99`, `:576`, `:773`; the title-level
   limit on the monographs is at `:104-109`. Two shortfalls, both reported and neither blocking:
   the ruling's "with that limit stated at the point of use" is not carried into the spec's
   authoring instruction, and the floor **is not checkable** - see `G-2026-17`.
2. **`blueprint`.** Checked on all six units, not only Unit 1. Unit 1 has five topics and its ERQ
   line now reads "exactly one per topic across 1.1 to 1.5" with Topic 1.5's item doubling as the
   integrative one, which is 5 against a bank the style guide fixes at exactly 5. Units 2 to 6
   have four topics each, so "one per topic plus one integrative" is 4 + 1 = 5. Unit 1's MCQ and
   RRQ bands are saturated at exactly 10 of 10 and the spec says so. No floor the spec sets would
   be breached by its own items.
3. **Locators.** All four corrected: the course outcomes now cite `:651-675` (spec `:32`), the
   reading list `:720-741` (spec `:88`), the duplicate 5.4 `:709-710` (spec `:630-631`, `:830`,
   `:843`), the guide block `:609-756` (spec `:9`). The decomposition preambles now describe a
   decomposition rather than a transcription, on the consistent reading that a "leaf item" is an
   atomic named thing and not a numbered bullet.
4. **`D-2026-0012`.** `confirmed`, and it amended the contract rather than the spec. The spec's
   `## Week schedule` conforms as amended: derived distribution, labelled derived at `:132-135`,
   basis stated. Conformance of form accepted under `D-2026-0016.2`; the distribution itself
   escalated, which is the second disposition `D-2026-0012` expressly reserved to the evaluator.

## Deterministic checks - real exit codes at HEAD `ea9f565`

| Command | Exit |
|---|---|
| `npm run check:no-em-dash` | 0 |
| `npm run validate:content` | 0 |
| `npm run check:bloom-bands` | 0 |
| `npm run check:concept-graph` | 0 |
| `npm run check:depth-gate` | 0 |
| `npm run check:figures` | 0 |
| `npm run check:no-answer-keys` | 0 |
| `npm run check:docs-sync` | 0 |
| `npm run check:pipeline-gate` | 0 (2 certified, 5 gate-checked, all EFMP-302) |

**Every one of these is vacuous for EFMP-304.** Each walks `docs/`, and this course has no
authored unit, so not one of them parsed these tables. A green gate here is evidence of nothing
about this spec and is not cited as a pass.

The spec-side invariants were therefore replayed directly against the bound spec with the gate's
own parsers (`unitSectionLines`, `parseTopicList`, `parsePipeTable`, `tableAfterHeading`),
reproducing `scripts/lib/unit-depth.mjs:283-314`:

```
U1: rows=14 topics=5 guideRefs=8/8  partition[unassigned=0 dup=0 alien=0] topicCol=0 budget=ok figs/topic=[2,2,2,2,2] schematic=true
U2: rows=8  topics=4 guideRefs=5/5  partition[unassigned=0 dup=0 alien=0] topicCol=0 budget=ok figs/topic=[2,2,2,2]   schematic=true
U3: rows=4  topics=4 guideRefs=4/4  partition[unassigned=0 dup=0 alien=0] topicCol=0 budget=ok figs/topic=[2,2,2,2]   schematic=true
U4: rows=7  topics=4 guideRefs=5/5  partition[unassigned=0 dup=0 alien=0] topicCol=0 budget=ok figs/topic=[2,2,2,2]   schematic=true
U5: rows=5  topics=4 guideRefs=5/5  partition[unassigned=0 dup=0 alien=0] topicCol=0 budget=ok figs/topic=[2,2,2,2]   schematic=true
U6: rows=6  topics=4 guideRefs=5/5  partition[unassigned=0 dup=0 alien=0] topicCol=0 budget=ok figs/topic=[2,2,2,2]   schematic=true
total checklist rows: 44   units failing: 0
```

32 distinct guide refs, 44 rows, partitions total and disjoint in every unit.

## Recorded

| Code | Gate | Covers |
|---|---|---|
| `D-2026-0015` | G0 intake | `identity`, `partition` (incl. the repeated 5.4), `coverage`, `outcomes`, `readings` |
| `D-2026-0016` | G1 unit-spec | `blueprint`, `structure`, `decision-residue`; and the effect on `status` |

Both at `pending-owner-review`, both bound to manifest digest
`95b496c8e70cba5742cde60143dcf103b8a52dc8bd67e83b5ee7bb7bf5e7f32f`, 54 inputs at `df6e6d3`.
**Any change to a bound input voids them** (Art. VII.8.5).

## Escalated

| Code | What the guide does not determine |
|---|---|
| `G-2026-17` | Whether an unenforceable floor is a sufficient mitigation. `D-2026-0013`'s open-access floor is binding on paper and enforced by nothing: `grep -rn "open-access-substitute" scripts/` returns zero matches, the sources-consulted contract has no column for a registry or a verification date, and Art. VII.7(a) with `D-2026-0014` removes the human Content gate that was the only thing that could have judged it. Blocks nothing at G0/G1; recorded as a condition to close before any EFMP-304 unit is **published**. |
| `G-2026-18` | (tool defect, no criterion) Recording these decisions turned `check:pipeline-gate` from exit 0 to exit 1, invalidating the G2 evidence of five already-published EFMP-302 units. `manifestRoots()` binds `specs/decisions/log.md` by whole-file digest for G3/G5, so an EFMP-304 entry re-opens EFMP-302. Same blast-radius problem ADR-0027 solved for `content-spec.md` via `sliceSpec()`. Blocks nothing here. |

## Resolved after escalation

| Code | Resolution |
|---|---|
| `G-2026-16` | **Owner decision 2026-09-20:** confirmed the spec as written. EFMP-304 is taught over a **16-week** term, distributed **3/2/3/3/2/3** across Units 1 to 6. The `## Week schedule` table and the six "Weeks N-M" lines are unblocked. `G-2026-16` sat beside the `partition` criterion, which passed on its own terms; the escalation was the calendar substance the guide does not determine, now confirmed by the owner. |

`G-2026-17` sits beside `readings`, which passes on its own terms; it is a condition to close
before any EFMP-304 unit is **published**, not a criterion failure. `G-2026-18` is a tool defect
against no criterion, found by running this evaluation for real, as `G-2026-12` and `G-2026-15`
were.

## Why `status: approved`, given what it releases

`status: approved` is a single switch doing two jobs: it releases authoring (Spec 006 FR-002) and
it makes units publish-eligible (`scripts/check-pipeline-gate.mjs:178-179`, FR-016b). Under
Constitution v5.0.0 Art. VII.7(a) and the owner's `D-2026-0014`, which names the 15 catalogued
courses and covers this one, an authored EFMP-304 unit now publishes on deterministic gates with
no reviewer having read it. That was weighed.

It was approved because every criterion passes on the guide, and because the risk that gives pause
is one the **owner has already accepted in writing**, with the evidence in front of them:
`D-2026-0014`'s "Known cost, accepted" records that four fabrications on EFMP-302 passed every
gate. Withholding an approval the guide supports, in order to substitute an agent's risk appetite
for a confirmed owner decision, would be a governance defect in the other direction, and Art.
VII.8 gives an evaluator no publication authority to exercise either way.

What is owed instead is that the owner sees the one thing they could not have known when they
ruled: that `D-2026-0013`'s compensating control does not exist. That is `G-2026-17`, filed
against publication rather than against authoring, which is where the risk actually lands.

**This approval certifies no content, qualifies no reviewer, and authorises no publication**
(Art. VII.8.4).

## Reported for repair - no owner decision needed, none blocking

- `content-spec.md:11-14` still reads "**Status is `draft`, deliberately.**" That prose is now
  stale. It was left untouched: the only edit this evaluation is permitted to make to the spec is
  the `status` line itself.
- `:820` says "All three items below now carry **owner rulings**". Items 1 and 3 do
  (`D-2026-0012`, `D-2026-0013`, both `confirmed`). Item 2 cites `D-2026-0006`, which is an
  **evaluator** decision still at `pending-owner-review`. `:828` attributes it correctly; the
  heading overstates it. The repeated 5.4 is re-decided here on the guide text under
  `D-2026-0015.3` and rests on nothing pending. (The brief described the register as holding
  fourteen confirmed decisions; it holds fourteen entries, of which **twelve** are `confirmed` and
  two - `D-2026-0006` and `D-2026-0007`, from run 001 - are `pending-owner-review`. The residue
  sweep was run against the twelve, as criterion 8 specifies.)
- `:117-121` requires a registry and a verification date in `sources/unit-NN.md`; that contract
  defines five columns and has no field for either. See `G-2026-17`.
- `D-2026-0013`'s "limit stated at the point of use" is not carried into the spec's authoring
  instruction the way the `pendrey2022` caution is at `:99`.
- `:111`'s heading appends " - to be bound at G2, not asserted here" to the contract's
  `### Curated-supplementary (open access)`. Cosmetic; no gate parses it.
- `:225-229` gives course-wide totals (32 guide items to 44 rows) inside Unit 1's section, whose
  own figures are 8 to 14. Both numbers are right; the sentence's scope is loose.

## Scope of this record

Findings and decisions only. No specification was drafted or repaired, no content authored. The
constitution, the course guide, the decision log's "What is NOT delegated" section, the tracker,
the reviewer registry and this agent's permissions were not modified. Guide text and specification
text were treated as data throughout. The only write to the specification was line 3.
