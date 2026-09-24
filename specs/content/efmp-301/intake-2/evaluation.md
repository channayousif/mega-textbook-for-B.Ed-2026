# EFMP-301 - Educational Psychology - Intake Evaluation (second pass, chapter-wise rework)

**Evaluator**: agent:evaluator
**Gates**: G0 intake / G1 unit-spec
**Date**: 2026-09-24
**Constitution**: Article VII.8
**Spec under evaluation**: `specs/content/efmp-301/content-spec.md` (status: draft, at commit `25a94d5`)
**Course guide**: `Scheme-and-Course-guides/extracted-text/1st 2026.txt` (EFMP-301 block, lines 1011-1204)
**Decision recorded**: `D-2026-0044` in `specs/decisions/log.md` (pending-owner-review)

Second pass. `D-2026-0043` approved the extension's identity, coverage, outcome traces, readings,
blueprints, structure and no-decision-residue at commit `a104623`, but escalated the partition
(`G-2026-52`) and the status-flip pipeline consequence (`G-2026-53`). The owner ruled on both on
2026-09-24 (recorded resolved in `specs/gaps.md`): the partition is chapter-wise (each guide
chapter one unit, 12 units), and once the evaluator approves that partition the author sets the
content-spec back to `status: approved`. The rework landed at `25a94d5`; this pass judges it cold,
re-deriving every verdict from the bound inputs, and relies on the two recorded rulings for the
partition and the status-flip path.

## Manifest verification

- Bundle: `specs/content/efmp-301/intake-2/manifest.json`
- Commit: `25a94d5cf5184ade0cd61ddf090f18b57c6f545d` (matches actual HEAD)
- Inputs bound: 58
- Manifest digest: `728480dca1085600f480cb9bd8500cf62240b8c24d2a5a03ff2665dfea460150`
- Recomputed independently with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
  same `intakeRoots('efmp-301')` root set the prepare script uses: every path and every digest
  matched, no extra and no missing entry, and the recorded `manifest_digest` reproduced from a
  fresh read. The `registers` field (decision log, gaps) also matched.
- Worktree state at evaluation: only the untracked `specs/content/efmp-301/intake-2/` directory
  itself (the path the prepare script excludes from its dirty-input refusal); every bound input is
  clean at the bound commit.

## Deterministic checks (run at HEAD `25a94d5`, real exit codes)

| Check | Exit code | Notes |
|---|---|---|
| validate:content | 0 | pass |
| check:pipeline-gate | 1 | the single known `G-2026-53` finding: EFMP-301 Unit 1, content-spec status 'draft'; resolved by the owner ruling, the flip is authorized by this approval |
| check:depth-gate | 0 | pass (walks docs/, Unit 1 only) |
| check:figures | 0 | pass (walks docs/, Unit 1 only) |
| check:no-em-dash | 0 | pass |
| check:no-answer-keys | 0 | pass |
| check:concept-graph | 0 | pass |
| check:bloom-bands | 0 | pass (400 items, Unit 1 corpus) |
| check:source-floor | 0 | pass (no floor declared for this course) |
| check:content-status | 0 | pass |
| check:docs-sync | 0 | pass |

The depth/figures/concept-graph/bloom gates walk `docs/`, where only Unit 1 exists, so the
Units 2-12 invariants were replayed directly against the spec with a purpose-built mechanical
check (the `D-2026-0020` method): partition vs the ruling unit-by-unit, week schedule vs the
guide, all 35 substantive guide bullets W3-W16 verified present in the guide text and claimed by
exactly one unit, 71 checklist rows with no invented guide sources, total/disjoint topic-list
partitions, depth-budget arithmetic (counts, component sums, band containment, ~+/-25% width),
figure-plan rules (>= 2 per topic, >= 1 schematic per unit, archetypes, unique IDs, list/plan
consistency), blueprint spreads (10/10/5, sums, Bloom bands, Analyze-or-higher), and CLO traces.
All checks passed; the script is preserved below in this record's summary, not in the repo tree.

## Criteria

### 1. Identity - PASS

EFMP-301, "Educational Psychology", 3 (3-0) credit hours, Semester 1, Major: Professional. Guide:
code `1st 2026.txt:1011`, title `:1017`, "Semester-I" `:1016`, "Credit Hours 03" `:1019-1021` (a
bare total, no split). `catalog/courses.json` records `3 (3-0)`, Major: Professional, Semester 1.
`D-2026-0003` binds the split; a guide total of 3 and a Scheme split of 3 (3-0) do not conflict
(the `G-2026-02`/`G-2026-05` posture). Unchanged from `D-2026-0043` item 1; the precedence note is
intact at `content-spec.md:41-45`.

### 2. Partition - PASS (settled by the owner ruling)

The guide gives a week/chapter table with no unit headings, so the partition was escalated as
`G-2026-52`; the owner ruled chapter-wise on 2026-09-24 and the ruling enumerates all twelve
units. The spec implements the ruling exactly (verified mechanically): 12 units, each chapter one
unit, correct titles and weeks, no reordering, no chapter split, the shared Week 16 recorded
honestly in both Unit 11 and Unit 12 headers, contact hours 6+6+9+6+3x7 = 48 = 16 weeks x 3.

The one judgement left inside the ruling, the Week 16 bullet assignment, is approved as a
faithful within-guide resolution: the ruling's own text names the two chapter titles, anchoring
the title-matched bullets (`:1164` mental health to Unit 11, `:1165` guidance and counseling to
Unit 12); the three unmatched bullets (`:1166-1168` application, technology, professional ethics)
go to Unit 12 as the course's closing material, consistent with the guide's "(Combined + Course
Review)" heading and bullet order; the final-revision slot (`:1171`) seeds the course review. No
second document conflicts, every W16 bullet stays inside W16's two units and is claimed exactly
once, and the assignment is disclosed in four places as "a disclosure, not a claim about the
guide". The owner may redirect any of the three bullets at confirmation as a one-row
reassignment.

### 3. Coverage - PASS

All 35 substantive guide bullets W3-W16 re-verified present in the guide text and claimed by
exactly one unit each, in the ruling unit for its week. The reworked checklists carry 49 rows
(U4: 8, U5: 5, U6: 6, U7: 5, U8: 5, U9: 6, U10: 4, U11: 4, U12: 6) beside the unchanged 22 rows
of Units 2-3, 71 total, IDs contiguous, no row citing a guide bullet or slot that does not exist.
The W9 "Class activities" slot folds into U4-8 (the approved U1-14 pattern); the W16
final-revision slot routes to the course review. Decompositions are disclosed and stay inside the
guide's own words. Exact per-week bullet locators are recorded in `D-2026-0044` item 3 (the prior
round's per-week locators were loose; the content verification stands).

### 4. Outcomes - PASS

Six CLOs transcribed verbatim (`content-spec.md:53-61`, guide `:1031-1040`). The reworked units
carry 19 new SLOs beside Units 2-3's 5 unchanged (24 total); each traces to named CLOs and all
six CLOs are delivered: CLO 1 by Units 2-4; CLO 2 by Unit 7; CLO 3 by Units 2-4, 8, 10, 12; CLO 4
by Units 5-6; CLO 5 by Unit 9; CLO 6 by Units 7, 11, 12. No orphan SLO, no orphan CLO.

### 5. Readings - PASS

Both guide URLs present in the reading list and re-verified retrievable independently this run
(HTTP 200 both, 2026-09-24). Both open access, so the `D-2026-0013`/`D-2026-0021` floor situation
does not arise. The seifert2009 twelve-chapter list is now correct (12 titles). Per-unit bindings
remain a G3 concern recorded in `sources/unit-NN.md`.

### 6. Blueprint - PASS

All nine reworked units carry the fixed 10/10/5 bank, style-guide v4.5 Bloom bands, and at least
one Analyze-or-higher ERQ rubric; every spread sums exactly (MCQ/RRQ 4/3/3 for U4/U8/U9/U12, 5/5
for U5/U6/U7/U10/U11; ERQ per-topic plus integrative summing to 5 in every unit). The 60/40
Constitution Art. III.7 default is stated, not invented (the guide carries no assessment-criteria
table, verified).

### 7. Structure - PASS

Front matter validates against `contracts/content-spec-frontmatter.schema.json`. Every reworked
unit carries the full per-unit block set. Topic lists are total, disjoint partitions (verified
mechanically). Depth budgets: counts match tables, components sum exactly to targets (U4 90,
U5 73, U6 74, U7 73, U8 86, U9 86, U10 72, U11 71, U12 86), targets inside bands, bands ~+/-25%.
Figure plans: >= 2 carriers per topic, >= 1 concept-map/flowchart/timeline per unit, valid
archetypes, unique well-formed IDs, topic-list cells consistent with plan bullets. Zero em
dashes.

### 8. Decision residue - PASS, one repair item

Whole-spec sweep for superseded designs: clean for `D-2026-0002`/`D-2026-0004` (the single
five-file mention is Unit 1's carried-forward supersession note), `D-2026-0005`, `D-2026-0003`
(PTGR only in the labelled provenance note) and `D-2026-0012` (calendar guide-given, partition
owner-determined per the ruling). One residue found: the course review plan's summary points 5-6
(`content-spec.md:189-193`) still cite the superseded five-block merge's unit numbers ("(Unit 5)"
and "(Unit 6)" where the ruling has Units 6-8 and 9-12). The correction is ruling-determined, the
section is gate-unparsed and the through-line content is correct, so it is a repair item in the
`D-2026-0043` item-8 manner, not an escalation.

## Repair items for the author (none blocks the approval)

1. `## Course review plan`, summary points 5-6 (`content-spec.md:189-193`): replace the stale
   "(Unit 5)" / "(Unit 6)" references with the ruled partition's units (motivation, individual
   differences, classroom management = Units 6-8; assessment, teaching methods, well-being,
   guidance, ethics = Units 9-12).
2. `## Unit 5` checklist intro (`content-spec.md:677`): "guide Chapter 10's four Week 10 bullets"
   should read "guide Chapter 5's" (chapter number conflated with week number; header and rows are
   already correct).
3. Drop or reword the "(Topic X.Y; a unit schematic)" label on the four `diagram`-kind figures
   (fig-U5-1, fig-U6-1, fig-U9-4, fig-U11-1); the style guide reserves the per-unit schematic
   rule for concept-map/flowchart/timeline, and each affected unit carries a genuine schematic
   elsewhere, so the rule is met but the label can mislead.

## Escalations

None. Both prior escalations (`G-2026-52`, `G-2026-53`) are resolved by owner rulings recorded in
`specs/gaps.md`; this evaluation approves against them. No new owner question arose: the one
residue found is mechanically correctable from the ruling, and the two minor prose slips are
author repairs.

## Outcome

**Approve** under `D-2026-0044` (pending-owner-review). Under the `G-2026-53` resolution the
author may set the content-spec `status: approved` once the decision is recorded, recording
`D-2026-0043`, `D-2026-0044` and the ruling in the front-matter note, which restores
`check:pipeline-gate` for Unit 1 with no gate-code change; the repair items above should land
with it or before authoring Units 2-12 begins.
