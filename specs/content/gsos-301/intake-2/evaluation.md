# GSOS-301 re-intake evaluation (G0 / G1)

- **Evaluator:** agent:evaluator (fresh session; did not draft the spec, which was drafted and
  repaired by the Paperclip BilingualAuthor agent)
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (bound digest `77ff2fa9...5ff2`)
- **Date:** 2026-10-10
- **Worktree:** detached at `1b560c4618e41d97feedfcbae45b7c43b6481e23`
- **Decision:** `D-2026-0057` (pending-owner-review), appended to the worktree's
  `specs/decisions/log.md`
- **Escalations:** none. Reserved `G-2026-114` to `G-2026-117` are unused.
- **Binding owner rulings applied:** `D-2026-0053` (confirmed 2026-10-10; supplied at
  `intake2/D-2026-0053.md`, not yet in this worktree's log), items 1, 2 and 4; owner confirmation
  of `D-2026-0051` including its repair list.

## Manifest verification

`manifest.json` in this directory was recomputed with `manifestFor()` from
`scripts/lib/review-evidence.mjs` over `intakeRoots('gsos-301')`: 63 inputs, **0 mismatches**,
no extra or missing path, `manifest_digest`
`cb5ea9c8d8c79e4f8c918000d51a91ded42176609fa0d0b2b45ef9ae33758e10` reproduced, and both
`registers` digests matched at read time. HEAD equals the manifest commit and the tree was clean
before any write. Compared with the prior bundle (`D-2026-0051`), only seven GSOS-301 files
changed (`content-spec.md`, `coverage/`, `figures/`, `sources/` for Units 1-2); the guide,
Scheme, catalog, style guide and contracts are unchanged, so prior findings resting only on them
are reused. Any change to a bound input voids `D-2026-0057`.

## Criterion verdicts

| # | Criterion | Prior (`D-2026-0051`) | Now | Locator |
|---|---|---|---|---|
| 1 | identity | pass | **pass** (reused) | guide `2nd 2026.txt:776-789`; Scheme `revised after board.txt:118-121`; `G-2026-01`, `G-2026-05`; spec `:9` 2 (2-0) |
| 2 | partition | escalated `G-2026-92` | **pass** (on owner ruling) | `D-2026-0053` item 1; spec `:54-75` = guide Weeks 1-16 `:802-942`; `Guide ref` column per row; Topic 6.2 retitled `:410` |
| 3 | coverage | pass | **pass** | 43 rows = 43 guide leaves `:804-935`; no loss or addition after renumbering |
| 4 | outcomes | pass | **fail** (one-line repair) | Unit 5 `:335` "describe institutional change" labelled CLO 3 (`:796`); its ancestor is CLO 4 (`:798`). All other unit outcomes trace to their named CLOs |
| 5 | readings | fail, escalated `G-2026-93/94` | **fail** (repair) | guide list `:964-968` absent; `henson2022` still unresolvable as printed; `lindsey2010` misdated |
| 6 | blueprint | pass | **pass** (reused) | blueprint lines unchanged; course-review mix `:92` consistent |
| 7 | structure | fail | **fail** (repair, narrowed) | machine-read structure now passes; v2 lines, practicum count, `:33`, `:9` unrepaired |
| 8 | decision-residue | fail | **pass** | derived calendar gone; no superseded keys or labels in the tree; advisory: `:56` still cites `D-2026-0012` |

## Status of each `D-2026-0051` repair item

| # | Repair | Status |
|---|---|---|
| 1 | Units 3-6 `U<n>-NN` IDs, `Guide ref`/`Topic` columns, v3 Topic list | **done** |
| 2 | >= 2 figures per topic; reconcile fig-U1-2, fig-U1-3, fig-U2-2 | **done** |
| 3 | Week schedule = guide Weeks 1-16, drop "derived" | **done** (advisory: drop the `D-2026-0012` citation at `:56`) |
| 4 | Course review: practice-question mix; >= 3 practicum ideas | **half**: mix added `:92`; still 2 practicum ideas `:89-91` |
| 5 | Per-unit Prerequisite knowledge / Worked-examples plan / International best-practice notes; CLO trace | **half**: CLO traces added; the three v2 lines absent in all six units |
| 6 | `:33` "explicitly for trainee teachers"; `:9` cite ends `:968` | **not done** (both unchanged) |

## Deterministic checks (real exit codes, at `1b560c46`)

| Command | Exit | GSOS-301 findings |
|---|---|---|
| `npm run check:no-em-dash` | 0 | none |
| `npm run validate:content` | 0 | none |
| `npm run check:bloom-bands` | 0 | none |
| `npm run check:concept-graph` | 0 | none |
| `npm run check:depth-gate` | 0 | none (Units 3-6 unauthored) |
| `npm run check:figures` | 1 | all in pre-intake Units 1-2: prompt-only markers; fig-U1-4..6 in manifest but not carried; topic-label drift against the repaired plan |
| `npm run check:no-answer-keys` | 0 | none |
| `npm run check:docs-sync` | 0 | none |
| `npm run check:source-floor` | 0 | floor `1` now declared and met |
| `npm run check:pipeline-gate` | 1 | Units 1-2: spec `draft`, G2 rows not done |

Spec-side replay with the gate's own parsers: Units 1-6 parse 10/6/6/6/6/9 = 43 IDs, each Topic
list a total disjoint partition matching the checklist `Topic` column, 2 figures per topic, a
concept-map or flowchart in every unit, Figure plan = Topic list, Depth budgets parse. Front
matter `{course_code, status: draft, open_access_floor: 1}` validates against
`contracts/content-spec-frontmatter.schema.json` (Ajv 2020).

## Readings evidence (external, checked 2026-10-10; not bound inputs)

- `conerly2021`: OpenStax *Introduction to Sociology 3e* URL resolves (verified in the prior run as
  Conerly, Holmes & Tamang, 2021).
- `henson2022`: the LibreTexts URL is a bookshelf listing "Introduction to Sociology (Hammond et
  al.)", "Introductory Sociology 1e (OpenStax)" and "Sociology (Boundless)"; no Henson work.
- `lindsey2010`: Open Library `OL3335670W` gives Lindsey & Beach, *Sociology* (2nd ed.),
  Prentice Hall, 2001-2002; 3rd ed. 2003-2004; no 2010 edition found.
- `andersen2014`: Open Library `OL25629757W`, Andersen, Taylor & Logio, *Sociology: The
  Essentials* 8th ed., Cengage, 2014. Resolves.

## Remaining repairs (all determined; no owner decision needed)

1. `## Reading list`: add the guide's own list (`2nd 2026.txt:964-968`) as guide-required: Johnson,
   *Sociology: A Systematic Introduction* (Routledge reissue, ISBN 9781135034900; publisher
   preview only, `D-2026-0001` title-level posture) and the SlideShare deck "Introduction of
   Sociology" (Bhavesh Singh). Binding either in `### Mapped readings` stays optional.
2. Replace `henson2022` with a correctly attributed LibreTexts work (for example the Hammond et al.
   text at its own URL), in the spec and in `sources/unit-01.md`.
3. Correct `lindsey2010` to the real edition and year (e.g. 2nd ed., 2001), in the spec and in
   `sources/unit-02.md` / `coverage/unit-02.md` keys.
4. Unit 5 outcome line `:335`: name CLO 4 for "describe institutional change", or drop the clause.
5. Add `**Prerequisite knowledge**`, `**Worked-examples plan**`, `**International best-practice
   notes**` to each of the six units.
6. Add at least one more practicum idea to `## Course review plan` (3-6 required).
7. Remove "explicitly for trainee teachers" at `:33` (or restate without attributing it to the
   guide); change the block citation at `:9` to end at `:968`.
8. Advisory: drop "(D-2026-0012)" at `:56`; the guide supplies the schedule.

## May the spec move to `status: approved` now?

**No.** Identity, partition, coverage, blueprint and decision residue are approved under
`D-2026-0057` (pending owner review), but outcomes, readings and structure fail on repairs 1-7
above. After those land, a fresh manifest and a fresh intake are needed. Criteria 1, 3 and 6 need
no re-judging unless an input they rest on changes; criterion 2 must be re-confirmed only if
the partition or week schedule changes.

This record certifies no content, qualifies no reviewer and authorises no publication.
