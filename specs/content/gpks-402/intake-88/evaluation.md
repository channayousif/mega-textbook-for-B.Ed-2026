# GPKS-402 · Pakistan Studies - Intake Evaluation (fresh)

**Evaluator**: agent:evaluator (fresh session; did not draft the spec)
**Gates**: G0 intake / G1 unit-spec
**Date**: 2026-10-17
**Constitution**: Article VII.8
**Skill**: `.claude/skills/evaluate-intake/SKILL.md` v1.0.0
**Spec under evaluation**: `specs/content/gpks-402/content-spec.md` (status: draft, 360 lines)
**Course guide**: `Scheme-and-Course-guides/extracted-text/2nd 2026.txt` (GPKS block, lines 979-1153)
**Prior intake**: `D-2026-0052` (on stale bundle at `26ecd199`, now superseded by repairs and the owner ruling `D-2026-0053`; not reused)
**Decision recorded**: `D-2026-0069` in `specs/decisions/log.md` (pending-owner-review)

## Manifest verification

- Bundle: `specs/content/gpks-402/intake-88/manifest.json`
- Commit: `d3bdfc9afa5f1535d745de860c7f1ebe6f10c2f8` (worktree HEAD; tree clean before writing)
- Inputs bound: 55
- Manifest digest: `4b7ec0302eb9f10b4fbc2244368a1b872bf4e087d85c24ad4e1a2b67d19b9b1d`
- Recomputed independently with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
  `intakeRoots('gpks-402')` set: every path reproduced, every per-file digest matched
  (0 mismatches), and `manifest_digest` reproduced byte-for-byte.
- Registers recorded at read time (not freshness-bearing): `specs/decisions/log.md`
  `84ba9cd8...`, `specs/gaps.md` `1d14ea0e...`.

## Deterministic checks (real exit codes, run at `d3bdfc9a`)

| Check | Exit | GPKS-402 findings |
|---|---|---|
| check:no-em-dash | 0 | none |
| validate:content | 0 | none |
| check:bloom-bands | 0 | none (750 items) |
| check:concept-graph | 0 | none |
| check:depth-gate | 0 | none (concept coverage, required blocks, formative floor, reading-min band, coverage↔sources) |
| check:source-floor | 0 | floor met - `open_access_floor: default: 1` declared; every unit binds >= 1 open-access source |
| check:no-answer-keys | 0 | none |
| check:docs-sync | 0 | none (no authored units in scope) |

`check:pipeline-gate` and `check:figures` are not evaluable here - they run against authored
`docs/`, and no units are authored yet (Units 1-2 were withdrawn under `D-2026-0053`; all
other units await this approval). Their Sem-1 failures belong to EFMP-301/302 and are
unrelated to this spec.

Spec-side invariants replayed mechanically (script over the spec's tables): checklist/
topic partition total and disjoint in all six units; figures per topic count matches the
figure-plan rows; schematic-topic flag present in every unit.

## Criteria

### 1. identity - PASS

Guide lines 980/982: "Course No. GPKS - 302 / Credit Hours 2" / "Course Title: Pakistan
Studies / Semester 2nd". Revised Scheme (final authority, `G-2026-03` resolved): Semester II
row `GPKS - 402 / Pakistan Studies / 2 (2-0) / General Education`. Catalog `courses.json`:
Semester 2, `GPKS-402`, "Pakistan Studies", `2 (2-0)`, General Education. Code conflict already
adjudicated by `G-2026-03` (confirmed): GPKS-402 authoritative, "GPKS-302" a guide-side slip.
Credit split 2 (2-0) from the Scheme. No discrepancy.

### 2. partition - PASS (guide-determined after owner ruling)

The guide gives a 16-week table (Weeks 1-8, 10-15 teaching; Week 9 mid-term; Week 16 review),
no numbered units. The spec groups: 1-2 / 3-4 / 5-6 / 7-8+10 / 11-12 / 13-15. This partition
is a judgement the bare week table does not determine, so it was escalated as `G-2026-97` in
`D-2026-0052` and **confirmed by the owner** under `D-2026-0053` ruling 1 ("the grouping is
confirmed as drafted; the unit's weeks follow the table"). That ruling binds.

The defects `D-2026-0052` flagged in the week-schedule table (Unit 4/5/6 listed as 7-8/9-10/
11-12, contradicting the checklists; titles differing between the table and unit openings)
are **repaired**: the `## Week schedule` table now reads 7-8,10 / 11-12 / 13-15 and matches
both the guide and each unit's opening line. Confirmed by inspection of the table (lines
49-58) and the six `## Unit N` headings (lines 68/114/160/207/262/309).

Week 9 (mid-term) and Week 16 (review/final assessment) carry no content sub-topics; they are
correctly absent from the checklists.

### 3. coverage - PASS

43 guide bullets across the 15 teaching weeks (3 per week; 4 in Week 14; Weeks 9 and 16
excluded) map to 47 spec sub-topic rows (6+6+7+11+7+10). The +4 surplus is legitimate
decomposition of compound guide bullets, each row retaining its guide ancestor:
- "Constitutions of 1956 and 1962" (Week 5) → U3-02 + U3-03
- "Legislature, Executive, Judiciary" (Week 7) → U4-02 + U4-03 + U4-04
- "Agriculture, industry, and trade" (Week 11) → U5-01 + U5-02

Verified by guide-line/row pairing: every teaching-week bullet appears exactly once; no spec
row lacks a guide ancestor; no off-syllabus row introduced. Week 16's two bullets ("Course
review", "Student presentations and discussions") are review/assessment and correctly have no
checklist row.

### 4. outcomes - PASS (guide-determined after owner ruling)

Five guide objectives (lines 998-1006). All fourteen SLOs trace to at least one:
- Units 1-2 → obj 1, 2
- Unit 3 → obj 3
- Unit 4 → obj 3 (governance/rights), 4 (geography)
- Unit 5 → obj 4 (economy/society), 5 (education in economic development)
- Unit 6: SLO 6-1 (foreign policy) + 6-2 (contemporary issues) → obj 4; SLO 6-3 (role of
  education) → obj 5

SLO 6-1 (foreign policy) was escalated as `G-2026-099` in `D-2026-0052` because obj 4/5 do
not name foreign policy explicitly. **Confirmed by the owner** under `D-2026-0053` ruling 4:
sub-topics may be derived from relevance to the guide's course outcomes and its reading
material. No added outcome lacks a guide ancestor.

### 5. readings - PASS (guide-determined after owner ruling)

Guide "Recommended Readings" (lines 1143-1153): four entries, all transcribed, all resolvable
to verified real works:
- hec-pak-studies - HEC undergraduate Pakistan Studies curriculum (ambiguity noted: the
  title fits >1 HEC document; the spec binds the undergraduate-level scope document)
- rabbani-pak-studies - Ikram Rabbani, *Pakistan Studies* (Caravan Book House)
- hamid-khan-const - Hamid Khan, *Constitutional and Political History of Pakistan* (OUP
  Pakistan, 4th ed. ISBN 9780199060986)
- burki-fifty-years - Shahid Javed Burki, *Pakistan: Fifty Years of Nationhood* (Westview,
  3rd ed. 1999 ISBN 9780813336213)

The first is a print/HEC document; the rest are print monographs (`D-2026-0001` title-level
binding unless obtained). The readings approach was escalated as `G-2026-98` and **confirmed
by the owner** under `D-2026-0053` ruling 2: where the guide lists only print monographs, the
author may bind verified real works labelled author-selected; every unit must bind >= 1
open-access source declared via `open_access_floor`. That floor is now declared (`default: 1`)
and the `check:source-floor` gate passes.

The defects `D-2026-0052` flagged are resolved: the unlocatable keys it named (`ziad-pak-
foreign-policy`, `goe-bloom`) are gone, replaced by the verified open-access entries above;
the "fifty decades" note typo is repaired (reads "fifty years").

**Advisory (not a criterion defect, for author cleanup):** three reading-list entries have a
Units column that disagrees with the unit's `**Mapped readings**` line - `pak-constitution-
1973` (list says 3,4; Unit 1 maps it), `hamid-khan-const` (list says 3,4; Unit 2 maps it),
`hec-pak-studies` (list says 1,2,3; Unit 4 maps it). The entries themselves are real and
resolvable, so criterion 5 passes; the cross-reference is imprecise and the author should
align the Units column with the per-unit mapped lists before unit authoring. Reported, not
escalated - `G-2026-98` is already resolved by `D-2026-0053`.

### 6. blueprint - PASS (author repair confirmed)

`D-2026-0052` failed this criterion: every unit stated "2 per topic + 1 integrative", which
gave 3 ERQs for two-topic units and 4 for three-topic units, never the 5 the style guide
requires. **Repaired**: every unit now declares "ERQs (5)" with a distribution that sums to 5:
- Two-topic units (1,2,3,5): 2 per topic + 1 integrative = 5
- Three-topic units (4,6): 1 per topic + 2 integrative = 5

Verified arithmetically for all six units (lines 112/158/205/260/307/360): each computes to
exactly 5. `check:bloom-bands` passes (750 items). Other blueprint invariants hold per unit:
MCQ 10 (Remember-Apply, >=2/topic), RRQ 10 (Understand-Analyze, >=2/topic), formative 5-8,
summative >=1 Analyze-or-higher, 60/40 weighting, >=1 ERQ demanding Analyze-or-higher. Depth
budget bands within tolerance. `check:depth-gate` passes.

### 7. structure - PASS

Front matter `course_code: GPKS-402`, `status: draft`, `open_access_floor: {default: 1}`
conforms to `contracts/content-spec-frontmatter.schema.json` (course_code matches parent
folder; status is the governing "draft before approval" state, FR-002). Required sections
present and internally consistent: Course-wide items, Course Description, Reading list
(guide-required + author-selected subsections), Week schedule, and for all six units: CLO/SLO
refs, key terms, topics, sub-topic checklist, topic list, depth budget, prerequisite
knowledge, common misconceptions, mapped readings, figure plan, unit-end assessment
blueprint. Deterministic content gate (`validate:content`) and depth gate pass.

No `## Course review plan` (the guide's Week 16 is review/assessment; the style-guide
contract's course-review section is optional for a spec with no authored review artefact).
This is advisory only and is not guide-determined; it does not block the gate.

### 8. decision-residue - PASS

Confirmed decisions touching this course: `G-2026-03` (code precedence), `D-2026-0053`
(Semester 2 rulings). Searched the whole spec for superseded designs:
- `G-2026-03`: "GPKS-302" appears only in the descriptive code note (lines 9-13), which
  correctly records the superseded guide label; all paths/content use GPKS-402 and Semester
  II. No residue.
- `D-2026-0053`: the spec embodies its rulings (partition, readings, outcome derivation);
  Units 1-2 were withdrawn from authored `docs/` and remain defined only in the spec, which
  is correct. No superseded design survives.

## Outcome

`D-2026-0069` approves all eight G0/G1 criteria (identity, partition, coverage, outcomes,
readings, blueprint, structure, decision-residue) at pending-owner-review, bound to manifest
digest `4b7ec0302eb9f10b4fbc2244368a1b872bf4e087d85c24ad4e1a2b67d19b9b1d`.

The three escalations `D-2026-0052` raised (`G-2026-97`, `G-2026-98`, `G-2026-99`) were
resolved by the confirmed owner ruling `D-2026-0053`; this intake verifies the spec against
that ruling rather than re-raising them. The blueprint and source-floor defects `D-2026-
0052` found are repaired and confirmed by the deterministic gates. Three reading-list Units-
column cross-references remain imprecise (advisory, reported for author cleanup, not a gate
blocker).

The spec may move to `status: approved` on owner confirmation of `D-2026-0069`. Until then,
no unit may be authored (`status: draft` governs, FR-002/FR-016b).
