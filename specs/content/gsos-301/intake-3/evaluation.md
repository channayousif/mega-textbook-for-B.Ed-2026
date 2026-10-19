# GSOS-301 intake evaluation (third pass)

- **Evaluator:** agent:evaluator (fresh session; did not draft the spec or its repairs)
- **Date:** 2026-10-10
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (digest `77ff2fa9...5ff2`, bound)
- **Decision recorded:** `D-2026-0064`, `pending-owner-review`, G0 intake / G1 unit-spec
- **Escalations:** none (reserved `G-2026-142` to `G-2026-145` unused)

## Manifest verification

- Manifest: `intake3/GSOS-301/manifest.json`, commit `cb40583ce918cbb486c2a6860ad32f56c611f085`
  (equals worktree HEAD; tree clean).
- Recomputed with `manifestFor()` over `intakeRoots('gsos-301')`: 65 inputs, 0 mismatches;
  `manifest_digest` `bb6b75142c86353c6d8f824e8bf31468cc36ea290a030b3b3ee9d26047004c06` reproduced.
- Registers (`specs/decisions/log.md`, `specs/gaps.md`) matched at read time.
- Versus the intake-2 manifest, only `content-spec.md`, `coverage/unit-0{1,2}.md`,
  `sources/unit-0{1,2}.md` changed (plus the added intake-2 record). Guide, Scheme, catalog,
  style guide and contracts are byte-identical, so findings on those are reused from
  `D-2026-0057`.

## Criteria

| Criterion | Verdict | Locator |
|---|---|---|
| identity | pass | `content-spec.md:12` 2 (2-0) vs guide `2nd 2026.txt:789` "03"; adjudicated by `G-2026-01`, `G-2026-05` |
| partition | pass | Week schedule `:66-87` vs guide `:802-942`; rests on owner ruling `D-2026-0053` item 1 |
| coverage | pass | 43 checklist rows = guide leaves `:804-935` (excl. Weeks 8, 16); unchanged; new lines add no sub-topic |
| outcomes | pass | Unit 5 `:374` now CLO 3 (`:796`) for institutions, CLO 4 (`:797-798`) for change; all units name CLOs (`D-2026-0053` item 4) |
| readings | **fail** | Units 2, 4, 5 (`:222-226`, `:342-346`, `:402-406`) plan no registry-verifiable open-access source; see below |
| blueprint | pass | unchanged since `D-2026-0051` item 4 |
| structure | pass | practicum 4 ideas `:102-105`; three v2 lines in all six units; `:36`, `:12` fixed; front matter validates |
| decision-residue | pass | no `henson2022`/`lindsey2010` keys, old OpenStax URL, `776-972`, bare floor, or `D-2026-0012` citation |

### D-2026-0057 repair list: status

| Repair | Status |
|---|---|
| Unit 5 outcome names CLO 4 | done (`:374`) |
| (a) guide reading list recorded | done (`:43-50`); `johnson1961` verified from the preview PDF |
| (b) `henson2022` replaced | done: `hammondnd`, URL 200, OpenAlex `W2590335685` (Hammond and Cheney, open access) |
| (c) `lindsey2010` misdated | done: `lindsey2001`, Open Library `OL7331644M`, ISBN 0130413259, Prentice Hall 2001 |
| practicum ideas 3-6 | done (4) |
| v2 per-unit lines | done (all six units) |
| "explicitly for trainee teachers" | done (`:36` now says the guide does not state it) |
| `:9` line range | done (`:12` cites 776-968) |
| advisory `D-2026-0012` citation | done (dropped) |

### The remaining readings defect

`D-2026-0053` item 2 requires every unit to bind an open-access source under a floor declared in
the form `check:source-floor` reads. That check counts a source only if its row names a registry
and an ISO date (`scripts/check-source-floor.mjs:40-41,75-76`); the spec front matter (`:4-5`)
itself calls the floor "registry-verified". Units 1, 3, 6 plan `hammondnd` (OpenAlex + date,
`:57`). Units 2, 4, 5 plan only `conerly2021` as open access; its row (`:56`) records no registry,
and no registry record of the 3rd edition was found (OpenAlex: no 3e record, only 2e copies;
Crossref: no match; Semantic Scholar rate-limited, unchecked). As planned, those units cannot meet
the spec's own floor; `check:source-floor` already exits 1 on authored Unit 2 for this reason. So
the gate failure is not only an authored-content issue: the spec does not plan a qualifying source
for Unit 2 (nor Units 4, 5).

**Repair (determined by `D-2026-0053` item 2):** for each of Units 2, 4 and 5, plan in
`### Mapped readings` an open-access source whose reading-list row records a registry identity
and verification date (for example `hammondnd`, whose relevant chapters `:57` already lists), or
record such an identity for `conerly2021` if one exists.

Advisories: `hammondnd` n.d. vs OpenAlex 2017 (deposit year); `singhnd` attribution unchecked
(SlideShare client challenge) and unmapped, so verify before any unit binds it.

## Deterministic checks (commit `cb40583c`)

| Check | Exit | GSOS-301 findings |
|---|---|---|
| check:no-em-dash | 0 | - |
| validate:content | 0 | - |
| check:bloom-bands | 0 | - |
| check:concept-graph | 0 | - |
| check:depth-gate | 0 | - |
| check:no-answer-keys | 0 | - |
| check:docs-sync | 0 | - |
| check:figures | 1 | 15, all in pre-intake authored Units 1-2 |
| check:source-floor | 1 | Unit 2: 0 registry-verified sources, floor 1 |
| check:pipeline-gate | 1 | Units 1-2: spec `draft`, G2 rows not done |

Logs: `intake3/logs/*.log`. Front matter also validated directly with Ajv 2020 against
`contracts/content-spec-frontmatter.schema.json` (valid).

## Outcome

The spec may **not** move to `status: approved` on confirmation of `D-2026-0064`. One repair
remains (readings, Units 2, 4, 5), followed by a fresh manifest and a fourth intake. Any change to
a bound input voids this decision. Certifies no content, qualifies no reviewer, authorises no
publication.
