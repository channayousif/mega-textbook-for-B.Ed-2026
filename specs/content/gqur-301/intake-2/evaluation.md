# GQUR-301 intake re-evaluation (G0 / G1), after author repairs

- **Evaluator:** agent:evaluator. Fresh session; did not draft the spec, which was drafted by the
  Paperclip BilingualAuthor agent.
- **Date:** 2026-10-10
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (bound, digest `77ff2fa9...de5ff2`)
- **Worktree:** `wt-tex-41`, detached at `3f41076923ff57e48295f88b1dfa53841c11cc11`
- **Prior pass:** `D-2026-0049` (confirmed), gaps `G-2026-82`, `G-2026-83` (resolved by `D-2026-0053`)
- **Decision:** `D-2026-0055` (pending-owner-review), appended to the worktree's `specs/decisions/log.md`
- **Escalations:** none. `G-2026-106` to `G-2026-109` unused.

## Manifest verification

Recomputed `manifest.json` with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
prepare script's `intakeRoots('gqur-301')`:

- 65 of 65 paths present, 0 digest mismatches, 0 extra, 0 missing
- `manifest_digest` reproduced: `c786bd3b8ac1fac2ef0de093f316b76acf40cbd62b7bd0a0deb5e8769eadb7ed`
- `registers` (`log.md`, `gaps.md`) both matched at read time; worktree clean before writing
- Against the `D-2026-0049` manifest, only `specs/content/gqur-301/content-spec.md` changed

Owner ruling bound by reference: `intake2/D-2026-0053.md`, sha256
`56ae62a22da263d8f305e05bca1e3137622c50385be9475cdf9e5e064ab706ff` (confirmed 2026-10-10, merging via
PR #125; not yet in this worktree's log).

## Criterion verdicts

| # | Criterion | Prior (D-2026-0049) | Now | Disposition | Key locators |
|---|---|---|---|---|---|
| 1 | identity | pass | **pass** | approved | guide `:371,375,380,381`; revised Scheme Sem II row 1; catalog digest unchanged |
| 2 | partition | escalated G-2026-82 | **pass (owner ruling)** | approved on D-2026-0053 item 1 | spec `:109-116`, weeks lines; guide `:405-527` |
| 3 | coverage | fail | **fail** | drafter repair | U2-05/07/08 guide refs `content-spec.md:260,262,263` vs guide `:463,467,468` |
| 4 | outcomes | escalated G-2026-83 | **pass** | approved (CLO 3 on D-2026-0053 item 4) | guide `:394-401`; CLO refs `:159,239,316,399,482,559` |
| 5 | readings | fail | **fail** | drafter repair | nist-sematech `:100`, `:284-285`, `:526`, `:610` |
| 6 | blueprint | pass | **pass** | approved | `style-guide.md:227-230`; per-unit blueprint lines |
| 7 | structure | fail | **pass** | approved | Topic cells `:339,341,342,424,583,585,586`; Unit 5 `:510,533-535` |
| 8 | decision-residue | pass | **fail** | drafter repair | stale "baboons (title level only)" `:446-447`, `:611` |

### 1. identity - pass

Unchanged inputs; re-affirmed. Guide gives GQUR-301 / Quantitative Reasoning-II / 3 / 2nd; the
revised Scheme gives `3(3-0)`, General Education; the catalog agrees. No Article II.3 conflict.

### 2. partition - pass, on the owner's ruling

`D-2026-0053` item 1 confirms the six-unit grouping as drafted. The spec's grouping is unchanged
(2/3/3/3/2/3 chapters; weeks follow the guide's one-chapter-per-week table). This verdict rests on
the owner ruling, not on the guide.

### 3. coverage - fail

Repaired since D-2026-0049: description locator now `:383-388` (`:66`); week-schedule summary now
carries 8.3, 11.2, 16.2, 16.3 (`:113-116`). Still wrong, and named as a repair in D-2026-0049:

| Row | Spec Guide ref | Guide | Guide line |
|---|---|---|---|
| U2-05 Median | 4.1 | 4.2 | `:463` |
| U2-07 Comparison of mean, median, mode | 5.1 | 5.2 | `:467` |
| U2-08 Applications and interpretation | 5.1 | 5.3 | `:468` |

The `Topic` cells (4.1, 5.1) are correct; only the `Guide ref` column is wrong. In substance, all
43 guide leaf sub-topics appear exactly once across 46 rows (6.2, 10.1, 13.1 split), none added.
Minor, non-blocking: the header locator `lines 383-588` (`:11`) starts at the description rather
than the course header (`:365`/`:371`) and runs past the block's last text line (`:580`).

### 4. outcomes - pass

Every CLO ref traces to guide outcomes 1-3; no SLO without an ancestor. `D-2026-0053` item 4
resolves `G-2026-83`: outcome-derived rows are permitted when labelled; the spec adds none, so no
derivation label is owed. Minor, non-blocking: `:41` labels the outcomes "verbatim" but outcome 3
omits the guide's "It is an" (`:399`); the meaning is unchanged.

### 5. readings - fail

Guide side passes: all seven entries resolve. Re-checked this run: Babones (Ed.) 2013 SAGE ISBN
9781446208397 (forename Salvatore J., matching the guide's "Salvatore Baboons"); Zaslow 2020
Cambridge ISBN 9781108419413; Lock et al. 1st ed. ISBN 9780470601877. The five spec corrections
D-2026-0049 named are made, and `siegfried2020` is gone from the whole bound tree (spec, sources,
coverage). Every unit maps lane2023 and openstax-stats, satisfying `open_access_floor: 1`
(`D-2026-0053` item 2). The Babones misprint is resolved as a within-guide slip under D-2026-0055.

New defects, all in the curated `nist-sematech` row:

- Unit 2 (`:284-285`), added by this repair: "Section 1.3.3, sampling and central tendency".
  Handbook 1.3.3 is "Graphical Techniques: Alphabetical". It is not sampling or central tendency.
- Units 5 (`:526`) and 6 (`:610`): "Section 1.3.7" does not exist. Section 1.3 has subsections
  1.3.1 to 1.3.6 only (itl.nist.gov `eda/section3/eda3.htm`, fetched 2026-10-10).
- Reading-list row (`:100`) lists Units "3, 4, 6" but Units 2 and 5 also map it.

### 6. blueprint - pass

Unchanged. 10/10/5; Bloom bands within the style guide; per-topic floor 8/10 (Units 1, 2, 5),
10/10 (Units 3, 4, 6). Feasible, but there is no headroom in the five-topic units.

### 7. structure - pass

Front matter is valid (ajv 2020). All seven Topic cells are repaired and every checklist row's
Topic now lists its ID in the Topic list. Partitions are total and disjoint. Every topic has two
figures. Every unit now has a structural figure: U1 concept-map and flowchart, U2 concept-map and
flowchart, U3 flowchart, U4 concept-map, U5 concept-map (`fig-U5-1`, new), U6 flowchart and
concept-map.

### 8. decision-residue - fail

D-2026-0049 (confirmed) found `baboons` resolvable. The repair changed the reading-list row to
"bibliographic level only" (`:87`) but left the superseded "title level only" in the Unit 4
(`:446-447`) and Unit 6 (`:611`) mapped readings. This is the residue pattern the skill describes:
the fix was applied where the finding pointed and stopped there. Extending the fix is
guide-determined, so it is a repair and not an escalation. No residue was found for the other
confirmed entries (searches for "one-page", "one-term", `.specify`, "unresolvable" outside the
print rows, and `siegfried` returned nothing).

## Deterministic checks (at 3f410769)

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
| check-pipeline-gate | 1 | 4: Units 1-2 fail because the spec is `draft` and their G2 rows are `in-progress`. This is expected after authoring before intake |

No heavy job was run. The spec-side invariants for all six units were replayed directly from the
spec tables.

## Observation outside the bound set (not judged, tracker not edited)

`specs/content/gqur-301/tasks.md` at `3f410769` has three G1 rows mislabelled "Unit 3". They sit
where the Unit 4, 5 and 6 G1 rows belong, so the tracker has no G1 row for Units 4-6 and four
for Unit 3. The tracker owner should correct this before any G1 row is marked.

## Outcome

- Approved under D-2026-0055, pending owner review: identity, partition (owner ruling), outcomes,
  blueprint, structure.
- Fail, drafter repair, no owner ruling needed: coverage, readings, decision-residue.
- **The spec may not move to `status: approved` yet.** The remaining repairs:
  1. `content-spec.md:260,262,263`: change the Guide ref for U2-05 to `4.2`, U2-07 to `5.2` and
     U2-08 to `5.3`.
  2. `:284-285`, `:526`, `:610`: replace the `nist-sematech` section locators with sections that
     exist and match the content (1.3.3 is graphical techniques; there is no 1.3.7).
  3. `:100`: make the `nist-sematech` Units column match its mappings (add 2 and 5), or drop
     those mappings.
  4. `:446-447`, `:611`: change "baboons (title level only)" to "bibliographic level only".
  5. Optional: drop "verbatim" or restore "It is an" at `:41`/`:46`; tighten the `:11` locator.
  6. Then prepare a fresh manifest and run a fresh intake.

Firecrawl reported low account credits during the readings checks.
