# GENG-301 · Expository Writing - Intake Evaluation

**Evaluator**: agent:evaluator (a fresh session that did not draft this spec; the drafter was the Paperclip BilingualAuthor agent)
**Gates**: G0 intake / G1 unit-spec
**Date**: 2026-10-10
**Constitution**: Article VII.8
**Skill**: `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (bound, digest `77ff2fa9...`)
**Spec under evaluation**: `specs/content/geng-301/content-spec.md` (status: draft) at commit `513894b1`
**Course guide**: `Scheme-and-Course-guides/extracted-text/2nd 2026.txt`, GENG-301 block, lines 1-154
**Scheme (final authority)**: `Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt`
**Decision recorded**: `D-2026-0050` in `specs/decisions/log.md` (pending-owner-review)
**Escalations recorded**: `G-2026-87`, `G-2026-88`, `G-2026-89`, `G-2026-90`, `G-2026-91` in `specs/gaps.md` (all open)

## Manifest verification

- Bundle: `intake/GENG-301/manifest.json` (this directory)
- Commit: `513894b1e284beb83f045d2618c1d5d765d301f1`, equal to the worktree HEAD; `git status` clean
  before any write.
- Inputs bound: 79.
- Recomputed with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the same root set
  `intakeRoots('geng-301')` uses in `scripts/prepare-intake-evidence.mjs`: 0 mismatches, no missing or
  extra path. `manifest_digest` reproduced: `7ff61ccf0548b99738a9f2716228a858ffc7df93f561f31ea28228b04a603f5e`.
- `registers` (decision log `520adf81...`, gaps `4d0f3510...`) matched at read time, before this
  evaluation appended to them.
- Unbound material read as context only: `specs/008-rich-unit-pedagogy/contracts/content-spec-v3.md`
  and `specs/007-content-depth-standard/contracts/content-spec-v2.md` (the spec contracts), the
  tracker `tasks.md`, and the authored `docs/semester-2/geng-301/` units. None of it was judged as
  content. **Recommendation:** bind the content-spec contract in `intakeRoots()`; the `structure`
  criterion depends on it and today it sits outside the manifest.

## Deterministic checks (run at `513894b1`, real exit codes)

| Check | Exit | GENG-301 findings |
|---|---|---|
| `node scripts/validate-content.mjs` | 0 | none |
| `node scripts/check-unit-depth.mjs` | 0 | none (but see Structure (a) and `G-2026-91`) |
| `node scripts/check-figures.mjs` | 1 | 6: every unit plans a concept-map/flowchart/timeline but none is placed (authored-content state, not a spec defect) |
| `node scripts/check-no-em-dash.mjs` | 0 | none |
| `node scripts/check-concept-graph.mjs` | 0 | none |
| `node scripts/check-bloom-bands.mjs` | 0 | none |
| `node scripts/check-source-floor.mjs` | 0 | none (GENG-301 declares no floor, so the gate has nothing to check) |
| `node scripts/check-pipeline-gate.mjs` | 1 | 12: every unit, "content-spec.md is not approved (status: 'draft')" and "G2 en-draft: reviewer must be human initials or explicit agent identity" |
| `node scripts/check-no-answer-keys.mjs` | 0 | none |
| `node scripts/check-docs-sync.mjs` | 0 | none |

The spec's front matter (`course_code: GENG-301`, `status: draft`) validates against
`contracts/content-spec-frontmatter.schema.json` (ajv 2020-12). No em dash in the spec. Spec-side
invariants were replayed with a script: each unit's topic-list partition is total and disjoint, the
depth-budget sub-topic and topic counts match, every topic has two figure carriers, and every unit
plans at least one concept-map/flowchart/timeline. Two defects were found (Structure (a) and (b)).

## Criteria

### 1. Identity - PASS (approved)

Guide: `Course No.GENG-301` at `:3`, title `EXPOSITORYWRITING` at `:9` (an extraction artefact
for "Expository Writing"), `(General Education)` at `:11`, `Credit Hours 3` at `:13`, Semester `2nd`
at `:15-17`. The revised Scheme puts the course in its Semester II block (`:90`), row
`GENG-301 / Expository Writing / 3 (3-0) / General Education / CD&I` at `:128-136`. The superseded
board scheme has the same code and title (`B.Ed 4 Year board.txt:67-68`). The catalog entry matches:
`GENG-301`, "Expository Writing", `3 (3-0)`, General Education, `bilingual: false`. The guide's total
and the Scheme's split do not contradict (`G-2026-02`/`G-2026-05` posture). The older
`B.Ed (4-Year) 2025-2.txt:40` lists "Expository Writing (General Course)" as `EED-302`. That document is
neither of the two schemes the `specs/gaps.md` header names, and the revised scheme is designated
final authority, so it raises no conflict. No `.specify/` departmental variant exists for this
course, and `D-2026-0003` would govern one if it did. **No Article II.3 conflict.**

### 2. Partition - PASS (approved)

The guide gives six numbered syllabus sections: 1 `:44`, 2 `:50`, 3 `:61`, 4 `:77`, 5 `:86`, 6 `:93`.
The spec has six units in the same order, one per section, so the guide determines the partition.
Titles: Units 1-3 match the guide. Units 4-6 shorten it ("Different Types of Expository Writing" to
"Types of Expository Writing"; "Writing for Specific Purposes and Audiences" to "Writing for Purposes
and Audiences"; "Ethical Considerations" to "Ethical Considerations in Writing"). These are wording
changes, not a partition question, and are recorded as an advisory. The topic grouping inside each
unit is an authoring structure the guide does not address and is not approved as guide-determined.

### 3. Coverage - FAIL (not approved; one part escalated as `G-2026-87`)

Guide bullet to checklist row map:

| Guide | Bullets | Spec rows | Verdict |
|---|---|---|---|
| 1 `:46-48` | 3 | U1-01..U1-07 | **fail**: U1-01 (see a) |
| 2 `:52-59` | 5 (pre-writing lists 6 techniques) | U2-01..U2-09 | all 6 techniques present; **fail** on conciseness (b); U2-04/05/06 escalated |
| 3 `:63-67` | 5 | U3-01..U3-09 | all present; U3-03/04 escalated |
| 4 `:79-84` | 6 | U4-01..U4-06 | **pass**: each type exactly once |
| 5 `:88-91` | 4 | U5-01..U5-07 | **fail** on "persuasive" (c); U5-06 escalated |
| 6 `:95-98` | 4 | U6-01..U6-07 | **pass** (the guide's "or other citation styles" is optional wording; the CRAAP criteria in U6-02 explain "evaluating information" and add no topic) |

Defects the guide settles (returned to the drafter, no gap):

- **(a)** `U1-01` (`content-spec.md:71`, also key terms `:56`) defines expository writing by "its place
  among four modes (narration, description, exposition, argumentation)". That makes description a mode
  outside exposition. The guide's own Unit 4 lists Description as a **type of expository writing**
  (`:77-79`). The guide's only other use of "types" with "expository writing" (`:77`) names its six
  expository types, so the "types" in Unit 1's first bullet (`:46`) has no row that covers it as
  expository types.
- **(b)** The revising/editing bullet lists "grammar, clarity, coherence, conciseness" (`:57`).
  `U2-06`/`U2-07` (`:125-126`) drop conciseness. Under the v3 contract, rows may group guide bullets
  only if nothing is lost.
- **(c)** The public-audiences bullet says "engaging, informative and persuasive language" (`:90`).
  `U5-05` (`:281`) changes this to "engaging, informative and accessible".

Escalated (`G-2026-87`, because the guide does not settle whether these elaborations are in scope):
the stage names in `U2-04`; `U2-05`, which repeats Unit 5's purpose/audience content inside drafting;
"argument strength" in `U2-06`; the "arguable"/"debatability" thesis criteria in `U3-03`/`U3-04`
against the guide's "clear and focused" (`:64`); and the named public forms in `U5-06`.

### 4. Outcomes - PASS (approved)

The three CLOs at `content-spec.md:35-40` match `:31-41` verbatim. Unit CLO refs: U1 1,2; U2 1;
U3 1,2; U4 2; U5 2; U6 3. All are in range and none is orphaned. CLO 1 (writing process,
well-structured essays) is carried by Units 2-3, CLO 2 (expository types, purposes, audiences) by
Units 4-5, and CLO 3 (ethics, originality) by Unit 6. The spec states no SLO text of its own. The
concept graphs' `SLO:GENG-301-n-k` IDs have one ID per spec CLO ref in each unit (2,1,2,1,1,1). They
resolve only through the unbound unit front matter, so the spec adds no SLO without a guide ancestor.

### 5. Readings - PASS for presence and resolution (approved); sourcing posture escalated as `G-2026-89`

All ten guide entries (`:108-126`) appear at `content-spec.md:365-374` with authors and titles intact.
Each resolved this run in Open Library: St. Martin's Guide OL65275W; They Say / I Say OL33417829W;
Writing Analytically OL2042383W; Style: Lessons in Clarity and Grace OL37563548W; Elements of Style
OL38285W; Good Reasons with Contemporary Arguments OL23048W; Writing to Learn OL16062911W; Norton
Field Guide OL5847286W; Art of Styling Sentences OL5956058W; Writing Today OL15441513W. **All ten are
print monographs.** `D-2026-0001` governs their text and binds authors to title-level support. The
spec reads `D-2026-0001` as "flag and proceed" (`:362-363`) and declares no open-access floor.
Whether to adopt a floor (the `D-2026-0013`/`D-2026-0021` pattern) is an owner decision, so it is
escalated. Context, not judged: the six bound `sources/unit-NN.md` files have 23 rows, and every
one is a print monograph with no URL.

### 6. Blueprint - PASS (approved)

Every unit's unit-end bank is 10 MCQ / 10 RRQ / 5 ERQ, with >= 2 MCQ and >= 2 RRQ per topic
(`:99`, `:152`, `:207`, `:256`, `:307`, `:358`). The most topics in any unit is four, so the floors
use at most 8 of 10 items. Each unit's summative line names one Analyze-or-higher item (Analyze in
Units 1, 2 and 5, Evaluate in 3 and 6, Create in 4), inside the style guide's ERQ band "Analyze to
Evaluate/Create" (`style-guide.md`, "Unit-end assessment bank"). The spec sets no Bloom bands, so
the style-guide defaults govern; nothing contradicts them. Advisory: the v3 contract's example
blueprint states bands per band, and adding them would make the floors checkable from the spec
alone. The Unit 1 formative ("identifying expository types") depends on how coverage defect (a) is
repaired.

### 7. Structure - FAIL (not approved)

- **(a)** `U4-04` is in Topic 4.3 in the checklist (`:231`) but in Topic 4.2 in the topic list. The
  depth gate exits 0 because `scripts/lib/unit-depth.mjs` reads only the ID column (`:584`), even
  though the v3 contract says the gate checks this. Escalated as tooling gap `G-2026-91`.
- **(b)** A stray line `-95 reading-min.` at `:192`, directly above Unit 3's real depth-budget line.
- **(c)** Against the v3 content-spec contract (read at the bound commit, unbound):
  - no `## Course Description` heading. The prose is under "Why this course exists" (`:11-17`).
  - no `## Week schedule` section (see `G-2026-88`).
  - no `## Course review plan`.
  - `## Reading list` is a numbered list, not the `### Guide-required` table of `Key | Citation |
    DOI/URL | Units | Note`. No reading is tagged to a unit, so the keys the sources files cite
    (`graff2011`, `williams2017`, `axelrod2016`, `zinsser2006`, `rosenwasser2012`, `faigley2015`, ...)
    resolve to nothing in the spec. `style-guide.md` "Unit depth standard" also expects readings
    "mapped to it in the content-spec `## Reading list`".
  - no unit has `**Mapped readings**`, `**Prerequisite knowledge**` or `**Worked-examples plan**`.
- Advisory: `:22-24` says no Urdu mirror is required and then says a Urdu track is "noted but gated
  `draft`". This is internally unclear but does not conflict with `bilingual: false`.

### 8. Decision residue - FAIL (not approved)

Every confirmed entry was checked against the whole spec, not only the sections each entry names:

- **`D-2026-0012`** (confirmed; names GENG-301). The per-unit weeks are labelled derived (`:29-31`,
  `:53`, `:103`, `:156`, `:211`, `:260`, `:311`). One section earlier, though, `:8` states
  "16 weeks" under the citation "Source: `2nd 2026.txt` lines 3-180", and that block has no week count.
  This is the superseded posture (a calendar presented as guide-supplied) still present outside the
  labelled note. Extending `D-2026-0012` to `:8` is guide-determined, because the guide carries no
  term length. The repair belongs to the drafter. The basis for the distribution itself is escalated
  as `G-2026-88`.
- **`D-2026-0001`** (confirmed). `:362-363` uses it beyond its Limits, as permission to proceed on
  unopened monographs. Escalated within `G-2026-89`.
- **`D-2026-0003`**: the spec has no `.specify` reference, so it is clean.
- **`D-2026-0002`/`0004`, `0005`, `0008`-`0011`, `0013`, `0017`, `0021`, `0046`**: their scope is other
  courses or other gates, and none of their superseded designs appears in this spec.
- **`D-2026-0014`**: concerns publication, not the spec, and is not assessed here.

## Escalations

| Code | Matter | Blocks |
|---|---|---|
| `G-2026-87` | Checklist rows elaborated past their guide bullet (U2-04, U2-05, U2-06, U3-03, U3-04, U5-06) | Those rows in Units 2, 3 and 5; `coverage` |
| `G-2026-88` | Derived week distribution with no stated basis; "16 weeks" attributed to the guide; no `## Week schedule` | Course-wide week schedule |
| `G-2026-89` | All-print reading list, no open-access floor, `D-2026-0001` over-read | Reading sufficiency and `sources` posture, all six units |
| `G-2026-90` | Tracker records G1 done by the drafting agent, before any intake, and units were authored while the spec was `status: draft` | Tracker G1 claims (process); nothing in the spec |
| `G-2026-91` | Depth gate does not check the checklist `Topic` column, though the contract says it does | Tooling; nothing directly |

## Outcome

- **Approved under `D-2026-0050` (pending-owner-review):** identity, partition, outcomes, readings
  (presence and resolution), blueprint.
- **Not approved:** coverage, structure, decision residue.
- **Blocked:** Unit 1 (U1-01); Unit 2 (U2-04 to U2-07); Unit 3 (U3-03, U3-04, `:192`); Unit 4 (U4-04);
  Unit 5 (U5-05, U5-06); course-wide items: week schedule, reading-list structure and sourcing
  posture, and the missing contract sections. Unit 6's checklist is clean and is blocked only by the
  course-wide items.
- **May the spec move to `status: approved` after owner confirmation? No.** Confirming `D-2026-0050`
  confirms five criteria only. Before approval: the drafter must repair the coverage, structure and
  residue defects; the owner must rule on `G-2026-87` to `G-2026-89`; and a fresh evaluator must
  re-evaluate the repaired spec on a newly prepared manifest. This approval binds to manifest digest
  `7ff61ccf...603f5e`, and any change to a bound input voids it.
- This evaluation certifies no content, qualifies no reviewer and authorises no publication. The six
  units authored before intake were read only as context.
