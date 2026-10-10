# GPKS-402 · Pakistan Studies - Intake Evaluation

**Evaluator**: agent:evaluator (fresh session; did not draft the spec, which the Paperclip BilingualAuthor agent drafted)
**Gates**: G0 intake / G1 unit-spec
**Date**: 2026-10-10
**Constitution**: Article VII.8
**Skill**: `.claude/skills/evaluate-intake/SKILL.md` v1.0.0
**Spec under evaluation**: `specs/content/gpks-402/content-spec.md` (status: draft, 352 lines, at commit `26ecd199`)
**Course guide**: `Scheme-and-Course-guides/extracted-text/2nd 2026.txt` (GPKS block, lines 972-1153)
**Decision recorded**: `D-2026-0052` in `specs/decisions/log.md` (pending-owner-review)
**Escalations recorded**: `G-2026-97`, `G-2026-98`, `G-2026-99`, `G-2026-100` in `specs/gaps.md` (all open). `G-2026-101` unused.

## Manifest verification

- Bundle: `intake/GPKS-402/manifest.json`
- Commit: `26ecd199f80d43135c10fadd11ceae3ee8a30177` (matches worktree HEAD; worktree clean before writing)
- Inputs bound: 63
- Manifest digest: `513a177525d45102d39c8d4cee3a52d9f1c3b333575535987465988ed6c4512a`
- Recomputed independently with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
  `intakeRoots('gpks-402')` set the prepare script uses: every path and digest matched, no extra
  or missing entry, and `manifest_digest` reproduced. Registers (`specs/decisions/log.md`
  `520adf81...`, `specs/gaps.md` `4d3fd0ae...`) matched at read time.
- Note: `specs/007-content-depth-standard/contracts/content-spec-v2.md` and
  `specs/008-rich-unit-pedagogy/contracts/content-spec-v3.md` are **not** bound. They were read
  for context only; no verdict rests on them.

## Deterministic checks (run at `26ecd199`, real exit codes)

| Check | Exit | GPKS-402 findings |
|---|---|---|
| check:no-em-dash | 0 | none |
| validate:content | 0 | none |
| check:bloom-bands | 0 | none |
| check:concept-graph | 0 | none |
| check:depth-gate | 0 | none (Units 1-2 authored; Units 3-6 not yet in scope) |
| check:figures | 1 | 6, all on authored Units 1-2: every topic has 2 prompt-only markers, 0 rendered; no schematic placed |
| check:no-answer-keys | 0 | none |
| check:docs-sync | 0 | none |
| check:source-floor | 0 | none, because GPKS-402 declares no `open_access_floor` (gate cannot see it) |
| check:pipeline-gate | 1 | 4, on Units 1-2: content-spec `status: draft`; no G2 en-draft row |

The two failing gates concern the authored units and the spec's draft status, not the spec's
structure. Spec-side invariants were replayed mechanically (script over the spec's tables):
checklist/topic partition total and disjoint in all six units, `Topic` column consistent,
figures per topic 2/2, 2/2, 2/2, 3/2/2, 2/2, 2/2/2, schematic present in every unit.

## Criteria

### 1. identity - PASS

Guide: "Course No. GPKS - 302 / Credit Hours 2" `:980`, "Course Title: Pakistan Studies /
Semester 2nd" `:982`. Revised Scheme (final authority): SEMESTER II heading `:90`; row
`GPKS - 402 / Pakistan Studies / 2 (2-0) / General Education` `:176-186`. Catalog: semester 2,
`GPKS-402`, "Pakistan Studies", `2 (2-0)`, General Education. The code conflict is already
adjudicated by `G-2026-03` (resolved: GPKS-402, Semester II, 2 (2-0); "GPKS-302" a guide-side
slip), which binds. Credit split from the Scheme per `G-2026-05` posture. Advisory: the spec's
code note (`:10`) reads as its own adjudication; it should cite `G-2026-03` (and has a typo,
"scheme-of-studios").

### 2. partition - ESCALATED (`G-2026-97`)

The guide gives a 16-week table (`:1008-1141`), mid-term Week 9 (`:1085`), review Week 16
(`:1137`), no units. The checklists derive 1-2 / 3-4 / 5-6 / 7, 8, 10 / 11-12 / 13-15:
contiguous, no reordering, no split week. The six-unit count and boundaries, notably Unit 4
spanning the mid-term, are not guide-determined. Separate guide-determined defect: the
`## Week schedule` table (`:49-58`) gives Units 4/5/6 as 7-8 / 9-10 / 11-12, contradicting the
guide and the spec's own checklists, omits Weeks 9 and 16, and is not labelled derived; unit
opening lines `:256` and `:303` are self-contradictory; Unit 4 and 6 titles differ between
`:56`/`:199` and `:58`/`:301`.

### 3. coverage - PASS (row level)

43 guide bullets in teaching weeks (3 per week, 4 in Week 14 `:1121-1127`) map to 47 rows
(6+6+7+11+7+10). Mapping, by guide line: W1 `:1012,1014,1023` -> U1-01..03; W2 `:1027,1031,1033`
-> U1-04..06; W3 `:1037-1041` -> U2-01..03; W4 `:1045-1049` -> U2-04..06; W5 `:1053-1057` ->
U3-01, U3-02+U3-03 (decomposed), U3-04; W6 `:1061-1067` -> U3-05..07; W7 `:1071-1075` -> U4-01,
U4-02..04 (decomposed), U4-05; W8 `:1079-1083` -> U4-06..08; W10 `:1089-1093` -> U4-09..11;
W11 `:1097-1101` -> U5-01+U5-02 (decomposed), U5-03, U5-04; W12 `:1105-1109` -> U5-05..07;
W13 `:1113-1117` -> U6-01..03; W14 `:1121-1127` -> U6-04..07; W15 `:1131-1135` -> U6-08..10.
Each bullet once; no row without a guide bullet. Week 16's "Course review" and "Student
presentations and discussions" (`:1139-1141`) sit under the guide heading "Review and Final
Assessment" and are correctly not content rows; their placement is not settled here (the
optional `course-review.mdx`, style guide `:350`).

Advisory, outside the approval (glosses are the spec's wording, for G3): U3-04 "the gap between
1956 and 1973" (the 1962 Constitution sits inside that gap); U5-03 "poverty, inequality and debt"
duplicates U6-05 "Poverty and unemployment"; U5-05 adds "tribal"; enumerations in U4-09, U4-10
("water"), U6-02 (four named states), U6-03 (UN, OIC, SAARC; fig-U6-2 adds SCO), U6-07.

### 4. outcomes - PASS for 13 of 14 SLOs; `SLO:GPKS-402-6-1` ESCALATED (`G-2026-99`)

Objectives `:998-1006`. Units 1-2 -> obj 1, 2; Unit 3 -> obj 3; Unit 4 -> obj 3 (structure,
rights), 4 (geography); Unit 5 -> obj 4, 5 (education in economic development); SLO 6-2 -> obj 4
(society, economy); SLO 6-3 -> obj 5. SLO 6-1 (foreign policy, Week 13 `:1111-1117`) is traced
to obj 4, 5 (`:305`); neither names foreign policy, and the guide maps no objective to weeks.
Not an added outcome (it has a week-table ancestor), but its trace is undetermined.

### 5. readings - ESCALATED (`G-2026-98`)

Guide list present (`:1143-1153`), four entries, all transcribed. Verified externally on
2026-10-10: Rabbani (Caravan Book House), Hamid Khan (OUP Pakistan, 4th ed. ISBN
9780199060986) and Burki (Westview, 3rd ed. 1999, ISBN 9780813336213) resolve, all print-only
monographs (`D-2026-0001` title-level binding unless a copy is obtained). The HEC "Pakistan
Studies Curriculum" fits more than one HEC document and the guide does not say which. No
open-access floor declared, so `check:source-floor` cannot see the course. Supplements: `ziad-pak-
foreign-policy` (Zia 2020, JRSP 57(2)) not locatable, key/author mismatch, no URL; `goe-bloom`
(ERIC ED521228) real but off-topic for its stated use and tagged to a non-existent Unit 8.
`Units` column disagrees with `**Mapped readings**` for three keys (`:139`, `:238`, `:339`).
`burki-fifty-years` note says "fifty decades" (`:40`).

### 6. blueprint - FAIL (author repair)

Every unit's ERQ line (`:104`, `:150`, `:197`, `:252`, `:299`, `:352`) states "ERQs (5): ...
one per topic plus one integrative", which gives 3 ERQs in two-topic Units 1, 2, 3, 5 and 4 in
three-topic Units 4, 6, never the 5 the line itself and `style-guide.md:229` require. The spec
copies the v3 contract's example line, which is consistent only for a four-topic unit. Units 4
and 6 add an ambiguous "(at least 4.1, 4.2)" / "(at least 6.1, 6.2)". The fix is to state how the
remaining ERQs distribute. Consistent: MCQ (10, Remember-Apply, >= 2 per topic), RRQ (10,
Understand-Analyze), >= 1 Analyze-or-higher ERQ rubric, formative 5-8 per unit, summative
Analyze-or-higher item per unit, 60/40 per Constitution Art. III.7. Depth budget bands within
about +/-16% of centre. Because this breaches the spec's own floor, the authored Units 1-2 should
be checked against whatever distribution the repair states (`G-2026-100`).

### 7. structure - PASS (bound inputs)

Front matter `course_code: GPKS-402`, `status: draft` conforms to
`contracts/content-spec-frontmatter.schema.json`. All per-unit machine-read elements present and
consistent (above). Course Description, Reading list (two subsections), Week schedule (present
but misstated, counted under partition) present. Advisory against the unbound v3 contract only:
no `## Course review plan`, and no per-unit `**Worked-examples plan**` or `**International
best-practice notes**` lines; the absent course review plan is also why Week 16 has no home.

### 8. decision-residue - PASS

`specs/decisions/log.md` has no confirmed entry scoped to GPKS-402. Corpus-wide confirmed
entries checked across the whole spec: `D-2026-0001` (no conflict), `D-2026-0003` (zero
`.specify` references), `D-2026-0012` (does not apply: the guide gives a calendar; the
misstatement is a partition defect, not residue). Superseded designs from resolved `G-2026-03`:
"302" only in the descriptive note `:10`; no "Semester IV"; all paths `semester-2`.

## Context: authored units

Units 1 and 2 (EN and UR) exist at the bound commit against a draft spec. They were not judged.
Escalated as `G-2026-100` for the owner's disposition because three spec defects reach them.

## Outcome

`D-2026-0052` approves identity, coverage (row level), outcomes (13 of 14), structure and
decision residue, at pending-owner-review. Partition, readings and SLO 6-1 are escalated; the
blueprint fails. **The spec may not move to `status: approved` on owner confirmation of
`D-2026-0052` alone.** It needs owner rulings on `G-2026-97/98/99`, the author's repair of the ERQ
blueprint, week schedule and unit lines, titles and reading-list defects, the owner's disposition
of `G-2026-100`, and a fresh intake on a newly prepared bundle (the repairs void this entry).
