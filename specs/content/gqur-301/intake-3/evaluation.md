# GQUR-301 third intake evaluation (G0 / G1), after the D-2026-0055 repairs

- **Evaluator:** agent:evaluator. A fresh session. It did not draft the spec (Paperclip BilingualAuthor) or its repairs (the board-direct session, commit `c332c0b0`).
- **Date:** 2026-10-10
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (bound, digest `77ff2fa9...de5ff2`)
- **Worktree:** `wt-tex-41`, at `c332c0b0e0e4a20e6fbe60a3056f4565a292b405`
- **Prior passes:** `D-2026-0049` (confirmed) and `D-2026-0055` (pending-owner-review)
- **Decision:** `D-2026-0060` (pending-owner-review), appended to the worktree's `specs/decisions/log.md`
- **Escalations:** none. `G-2026-126` to `G-2026-129` are unused.

## Manifest verification

I recomputed the manifest with `manifestFor()` over `intakeRoots('gqur-301')`:

- All 67 paths are present with 0 digest mismatches, 0 extra and 0 missing.
- `manifest_digest` reproduced as `f54ba8662c9e54a90a02d7f3a7e567371b8876a1c42a68c7649aed57f9c7d502`.
- Both `registers` digests matched at read time, and the tree was clean before writing.
- Compared with the intake-2 manifest, only `content-spec.md` changed, plus the two added intake-2 records.

The bundle copy of the owner ruling is `intake2/D-2026-0053.md`, sha256 `15d74a8c...ab1f`. It differs from the `56ae62a2...` that `D-2026-0055` recorded, and from main's text at `a131c75b`. The differences are:

- added items 6 and 7, which concern EFMP-305 only
- a front-matter clarification in item 2

Items 1, 2 and 4, the ones that govern GQUR-301, are the same in substance. The spec's front matter, `open_access_floor: {default: 1}`, satisfies the clarified item 2.

## Criterion verdicts

| # | Criterion | D-2026-0055 | Now | Key locators |
|---|---|---|---|---|
| 1 | identity | pass | **pass** | guide `:371,375,380,381`; revised Scheme `:104-112`; catalog |
| 2 | partition | pass (owner ruling) | **pass (owner ruling)** | D-2026-0053 item 1; spec `:105-116` |
| 3 | coverage | fail | **pass** | U2-05/07/08 `:260,262,263` = 4.2/5.2/5.3 (guide `:463,467,468`) |
| 4 | outcomes | pass | **pass** | guide `:394-401`; outcome 3 now verbatim `:46-47` |
| 5 | readings | fail | **pass** | nist locators `:284-285,526-527,611-612`; Units column `:100` |
| 6 | blueprint | pass | **pass** | `style-guide.md:227-230`; floors 8/10 and 10/10 |
| 7 | structure | pass | **pass** | ajv true; replay of all six units |
| 8 | decision-residue | fail | **pass** | baboons `:87,446-447,613` all "bibliographic level only" |

### Repairs required by D-2026-0055: status

1. **Unit 2 guide refs:** done (`:260` 4.2, `:262` 5.2, `:263` 5.3).
2. **nist-sematech locators:** done. I checked each one at itl.nist.gov on 2026-10-10:
   - 1.3.5.1 Measures of Location (Unit 2)
   - 1.3.3.26 Scatter Plot and 4.1.4.1 Linear Least Squares Regression (Unit 5)
   - 1.3.5.2 Confidence Limits for the Mean, 1.3.5.3 Two-Sample t-Test for Equal Means, and 7.1.3 What are statistical tests? (Unit 6)

   Every section exists and matches its unit's topic.
3. **nist Units column:** done. It now reads `2, 3, 4, 5, 6`, which matches every unit that maps the handbook.
4. **baboons "title level":** done everywhere. A whole-spec search finds no remaining "title level" for this reading.
5. **Optional fixes:** done. Outcome 3 is now verbatim, and the header locator is now `:365-580`.

### Coverage replay

The guide has 43 leaf sub-topics (`:405-527`). Each appears exactly once across the spec's 46 checklist rows, because 6.2, 10.1 and 13.1 are each split into two rows. The spec adds no sub-topic the guide lacks.

### Structure replay

All six units pass the following checks:

- Topic-list partitions are total and disjoint.
- Every checklist Topic cell matches its assigned Topic label.
- Every topic plans two figures.
- Figure-plan bullets match the Topic-list cells.
- Every unit plans a concept-map or a flowchart.
- The depth-budget counts match.

## Deterministic checks (at c332c0b0)

| Script | Exit | GQUR-301 findings |
|---|---|---|
| validate-content | 0 | 0 |
| check-no-em-dash | 0 | 0 |
| check-no-answer-keys | 0 | 0 |
| check-concept-graph | 0 | 0 |
| check-bloom-bands | 0 | 0 |
| check-source-floor | 0 | 0 |
| check-unit-depth | 0 | 0 |
| check-figures | 0 | 0 |
| check-docs-sync | 0 | 0 |
| check-pipeline-gate | 1 | 4 findings, all on Units 1-2: the spec is `draft` and their G2 rows are not done. This is expected while the spec awaits approval. |

No heavy job was run.

## Non-blocking observations (recommended cleanups, not guide-determined)

1. In `content-spec.md:121-123`, the Standards and frameworks anchors line for NIST still says "(Units 3, 4, 6)". The handbook is now mapped in Units 2-6.
2. `sources/unit-01.md:8` still cites the old locator "lines 383-588".
3. The Reading-list Units column is broader than some units' Mapped-readings paragraphs. For example, zaslow and chaudhry2008 appear in no unit paragraph. `style-guide.md:267-269` permits an open-access substitute, so this is for G3 to watch, not a spec defect.

## Outcome

All eight criteria are approved under `D-2026-0060`, pending owner review, and nothing is escalated.

**On owner confirmation of D-2026-0060, the spec may move to `status: approved`.** The approval is bound to manifest digest `f54ba866...d502`. Any change to a bound input voids it.
