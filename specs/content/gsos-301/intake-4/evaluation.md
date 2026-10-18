# GSOS-301 - G0 intake / G1 unit-spec evaluation (fourth intake)

- **Evaluator:** agent:evaluator (fresh session; did not draft the spec or the repair)
- **Date:** 2026-10-10
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (digest `77ff2fa9...` bound in manifest)
- **Decision recorded:** `D-2026-0066` (pending-owner-review)
- **Scope:** the single remaining repair from `D-2026-0064` (readings), plus a fresh decision-residue
  search; the other six verdicts are reused because their inputs are unchanged (shown below).

## 1. Bundle verification

- Manifest: `intake4/GSOS-301/manifest.json`, commit `44dfdb707e0d50b85a21574f5f17b3d21df4fd41`,
  manifest digest `f47bd2809b78fdfcf4c90fe93954530b714f860d1cce03ee79c59e11a9cbaccd`, 67 inputs.
- Recomputed with `manifestFor()` (`scripts/lib/review-evidence.mjs:319`) over
  `intakeRoots('gsos-301')` (`scripts/prepare-intake-evidence.mjs:46-59`) at the worktree HEAD
  (`44dfdb70`, matches `commit`): **0 mismatches of 67**; `digest(JSON.stringify(input_manifest))`
  reproduces `manifest_digest`; both registers (`specs/decisions/log.md` `82c61cd3...`,
  `specs/gaps.md` `b47b50cb...`) match at read time. Working tree clean before and after the checks.

## 2. Delta since D-2026-0064

Compared against `specs/content/gsos-301/intake-3/manifest.json` (digest `bb6b7514...`, commit
`cb40583c`):

| Input | Change |
|---|---|
| `specs/content/gsos-301/content-spec.md` | `71638640...` -> `9351ad40...` |
| `specs/content/gsos-301/intake-3/evaluation.md`, `intake-3/manifest.json` | new (the prior intake's own record; not a spec input) |
| all other 64 inputs (guide, Scheme, catalog, contracts, style guide, constitution, coverage, sources, figures, concepts) | byte-identical |

`git diff 5bc6ea4c 44dfdb70` touches only `content-spec.md`, 4 insertions / 1 deletion:
`:57` (`hammondnd` Units `1, 3, 6` -> `1-6`, note gains the chapter-check date and the
`D-2026-0064` purpose), and one new `hammondnd` row in each of Units 2 (`:227`), 4 (`:348`) and
5 (`:409`) `### Mapped readings`. No checklist row, SLO, Topic list, week schedule, blueprint or
required section is touched. The six unrelated verdicts of `D-2026-0064` therefore carry forward.

## 3. Verdicts

| # | Criterion | Verdict | Locator / basis |
|---|---|---|---|
| 1 | identity | pass (reused) | Guide, Scheme, catalog unchanged; `:12` 2 (2-0) vs guide `03` (`2nd 2026.txt:789`) already adjudicated by `G-2026-01`, `G-2026-05` (`D-2026-0064` item 1) |
| 2 | partition | pass (reused) | Checklists, Topic lists, week schedule unchanged; rests on confirmed owner ruling `D-2026-0053` item 1 (`G-2026-92`), not on the guide alone |
| 3 | coverage | pass (reused, re-checked for the delta) | 43 checklist rows unchanged (`2nd 2026.txt:804-935`); the three new rows cite only existing IDs U2-01..06 (`:197-202`), U4-01..06 (`:321-326`), U5-01..03 (`:382-384`); no sub-topic added |
| 4 | outcomes | pass (reused) | SLO text untouched; `D-2026-0064` item 4 |
| 5 | readings | **pass** | See section 4 |
| 6 | blueprint | pass (reused) | Untouched; `D-2026-0051` item 4 / `D-2026-0064` item 5 |
| 7 | structure | pass (reused, re-run) | Untouched sections; front matter unchanged (`open_access_floor: {default: 1}`, `:6-7`); new rows are well-formed two-column table rows; `validate:content` 0 |
| 8 | decision-residue | **pass** | See section 5 |

## 4. Readings (judged afresh)

Requirement: owner ruling `D-2026-0053` item 2 (confirmed) - every unit binds at least one
open-access source, under a floor in the mapping form `check:source-floor` reads; that check counts
a row only when it names a registry and an ISO date (`scripts/check-source-floor.mjs:40-41,75-76`),
and the spec itself calls the floor "registry-verified" (`:4-5`).

- **Registry identity.** `hammondnd` (`:57`) records "OpenAlex W2590335685, verified 2026-10-10".
  Re-queried `api.openalex.org/works/W2590335685` on 2026-10-10: "Introduction to Sociology Hammond
  and Cheney", type book, `is_oa: true` (green, `hdl.handle.net/10211.3/183592`), authors Ron
  Hammond, Paul Chaney, publication_year 2017. The work is real and open access.
- **Every unit now plans it.** `### Mapped readings` rows: Unit 1 `:160`, Unit 2 `:227`, Unit 3
  `:288`, Unit 4 `:348`, Unit 5 `:409`, Unit 6 `:473`. The reading-list Units column (`:57`) says
  `1-6`, consistent with the six mappings.
- **Chapter references verified on LibreTexts (2026-10-10).** The book URL returns 200; its
  `01: Chapters` page lists 1.01-1.21. Every chapter the spec cites exists under the stated title:
  1.05 Culture, 1.06 Socialization (Unit 2); 1.07 Society and Groups (Unit 3); 1.08 Deviance and
  Crime, 1.16 Media (Unit 6); 1.09 Stratification, 1.10 Sex and Gender (Unit 4); 1.13 Family,
  1.14 Education, 1.15 Religion (Unit 5). Chapter pages 1.05, 1.06, 1.13, 1.14, 1.15 each return
  200. Spot check: 1.09 discusses caste (12 occurrences) and social mobility, supporting U4-01/02;
  1.10 discusses gender roles, supporting U4-04.
- **Topical fit of the new mappings.** Culture -> U2-01..03 (elements, diversity, ethnocentrism);
  Socialization -> U2-04..06; Stratification -> U4-01..03; Sex and Gender -> U4-04..06; Family,
  Education, Religion -> U5-01, U5-02, U5-03 one-to-one. Sound.
- **Earlier repairs unchanged and still verified** (`D-2026-0064`): guide list recorded
  (`:43-50`, `2nd 2026.txt:964-968`); `johnson1961` title-level under `D-2026-0001`;
  `lindsey2001` ISBN confirmed.

Verdict: **pass**. Each unit's planned sources include one open-access work with a registry
identity and verification date, as `D-2026-0053` item 2 requires. That ruling settles it; no new
judgement is needed.

**Advisories (no repair required):**
1. Chapter 1.10 has no treatment of feminist perspectives (no "feminis*" match); `hammondnd` is
   weak support for U4-06. `conerly2021` and `lindsey2001` are also mapped to U4-06, and the floor
   counts per unit, not per row, so this does not fail the criterion. The Unit 4 author should not
   cite `hammondnd` for feminist theory.
2. Carried from `D-2026-0064`: `hammondnd` cited n.d. while OpenAlex says 2017 (a repository
   deposit year); either is defensible. `singhnd` attribution unverified; no unit maps it.
3. `check:source-floor` exits 1 on `specs/content/gsos-301/sources/unit-02.md` (0 registry-verified
   rows; `hammondnd` absent from that file). That file is pre-intake authored content, not the
   spec; the spec now plans a qualifying source for Unit 2, so the defect lies in the authored
   unit and must be fixed when Unit 2 is re-sourced/re-authored after approval. It is not a spec
   defect.

## 5. Decision residue (searched afresh)

Confirmed decisions touching GSOS-301: `D-2026-0051` (confirmed), `D-2026-0053` (confirmed);
plus `D-2026-0001` (global). Pending decisions `D-2026-0057`, `D-2026-0064` were also searched for
their superseded designs. Whole bound tree `specs/content/gsos-301/` (excluding the intake records):

- `henson2022`: only historical "Replaces `henson2022`" notes (`content-spec.md:57`,
  `sources/unit-01.md:12`); no live citation.
- `lindsey2010`, `introduction-to-sociology-3e`, `776-972`, `D-2026-0012`, bare
  `open_access_floor: 1`: none.
- Stale `hammondnd` Units value `1, 3, 6`: none.

Verdict: **pass**.

## 6. Deterministic checks at `44dfdb70` (real exit codes)

| Check | Exit | GSOS-301 findings |
|---|---|---|
| `check:no-em-dash` | 0 | - |
| `validate:content` | 0 | - |
| `check:bloom-bands` | 0 | - |
| `check:concept-graph` | 0 | - |
| `check:depth-gate` | 0 | - |
| `check:no-answer-keys` | 0 | - |
| `check:docs-sync` | 0 | - |
| `check:figures` | 1 | 15, all in pre-intake authored Units 1-2 (unchanged from `D-2026-0064`) |
| `check:source-floor` | 1 | Unit 2 authored `sources/unit-02.md`: 0 of 1 (advisory 3) |
| `check:pipeline-gate` | 1 | Units 1-2: spec `draft`; G2 rows not done (expected before approval) |

None of the three failures is a spec defect; all three were present at `D-2026-0064`.

## 7. Escalations

None. Reserved gap codes `G-2026-150` to `G-2026-153` are unused; `specs/gaps.md` not modified.

## 8. Outcome

All eight criteria pass on manifest digest `f47bd280...`. On owner confirmation of `D-2026-0066`,
the spec may move to `status: approved`. That status edit to `content-spec.md:3` is the only
change this decision anticipates; any other change to a bound input voids it (Art. VII.8.5).
This record certifies no content, qualifies no reviewer and authorises no publication
(Art. VII.8.4).
