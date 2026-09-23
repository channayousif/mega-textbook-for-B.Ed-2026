# GQUR-300 · Quantitative Reasoning-I - Intake Evaluation (third pass)

**Evaluator**: agent:evaluator
**Gates**: G0 intake / G1 unit-spec
**Date**: 2026-09-23
**Constitution**: Article VII.8
**Spec under evaluation**: `specs/content/gqur-300/content-spec.md` (status: draft, at commit `43910bf`)
**Course guide**: `Scheme-and-Course-guides/extracted-text/1st 2026.txt` (GQUR-300 block, lines 546-680)
**Decision recorded**: `D-2026-0042` in `specs/decisions/log.md` (pending-owner-review)

Third intake pass. `D-2026-0040` and `D-2026-0041` approved seven criteria and escalated `readings`
as `G-2026-28`; the owner ruled on that gap on 2026-09-23 (recorded resolved in `specs/gaps.md`), the
ruling application landed at `43910bf`, and this pass judges the spec cold, re-deriving every verdict
from the bound inputs. The owner ruling recorded in the resolved `G-2026-28` entry is relied on for
the `grawe` and `ncm` dispositions.

## Manifest verification

- Bundle: `specs/content/gqur-300/intake/manifest.json`
- Commit: `43910bfc9177e14b0b3c4128e9e48288173d1682` (matches actual HEAD)
- Inputs bound: 54
- Manifest digest: `4d3fd0ae99da012d1a34b7a1fbad9a7440c173a5f2d071ba8825d9c9937195a1`
- Recomputed independently with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the same
  `intakeRoots('gqur-300')` root set the prepare script uses: every path and every digest matched, no
  extra and no missing entry, and the recorded `manifest_digest` reproduced from a fresh read. The
  `registers` field (decision log, gaps) also matched.
- Worktree state at evaluation: only `intake/manifest.json` (re-prepared by the parent to bind
  `43910bf`) and the deleted prior `intake/evaluation.md`, both under the `intake/` path the prepare
  script excludes from its dirty-input refusal; every bound input is clean at the bound commit.

## Deterministic checks (run at HEAD `43910bf`, real exit codes)

| Check | Exit code | Notes |
|---|---|---|
| check:no-em-dash | 1 | 0 gqur mentions; findings in GENG-300 material |
| validate:content | 1 | 0 gqur mentions; GENG-300 unit-01 front matter |
| check:bloom-bands | 0 | pass |
| check:concept-graph | 0 | pass |
| check:depth-gate | 1 | 0 gqur mentions |
| check:figures | 1 | 0 gqur mentions |
| check:no-answer-keys | 1 | 0 gqur mentions |
| check:docs-sync | 0 | pass |
| check:source-floor | 1 | GENG-300 Unit 1 and GQUR-300 Unit 1: floor declared, no sources file (placeholder tree; expected at intake, binds at G2) |
| check:pipeline-gate | 1 | 0 gqur mentions |

Every gate that walks `docs/` is vacuous for GQUR-300's authored content (only the `coming_soon`
placeholder tree exists), so the spec-side invariants were replayed directly with the gate's own
parsers (`unitSectionLines`, `parsePipeTable`, `tableAfterHeading`): zero failures across all six
units. The `check:source-floor` GQUR-300 finding is the expected-at-intake condition recorded the
same way for GENG-300 under `D-2026-0019`: the newly declared `open_access_floor` is exactly what
makes the floor enforceable once units are authored.

## Criteria

### 1. Identity - PASS

GQUR-300, "Quantitative Reasoning-I", 3 (3-0) credit hours, Semester 1, General Education, bilingual
by default. Guide: code `1st 2026.txt:546`, title `:549`, semester `:552`, credit total "3" `:554`.
Revised board Scheme (final authority): `B.Ed 4 Year 2026 revised after board.txt:18-24` gives
`GQUR-300 / Quantitative Reasoning-1 (Math) / 3(3-0) / General Education` (verified this run).
Catalog matches. Title variants typographic (`D-2026-0006` posture); guide total and Scheme split do
not contradict (`G-2026-02`/`G-2026-05` posture). No Article II.3 conflict. `D-2026-0003` settles the
bound departmental variant as superseded provenance-only; the spec has zero `.specify` references.

### 2. Partition - PASS

The guide numbers six units at `:577`, `:584`, `:591`, `:598`, `:620`, `:629`; the spec carries
exactly those six units under those titles (string-equal after trimming the PDF bullet glyph,
verified mechanically). No week table in the guide; the spec's `## Week schedule` is derived and
labelled with its basis stated (`content-spec.md:36-39`, `:105-108`, "(derived)" on every unit's
weeks line) - the form `D-2026-0012` permits. Calendar substance approved as to form only.

### 3. Coverage - PASS

24 guide sub-topic bullets (four per unit) map to 30 checklist rows (5+6+5+4+4+6). Verified
mechanically, word-level, in both directions: nothing lost, nothing added beyond the guide's own
words. Five compound bullets decomposed using the guide's own words (G1.4, G2.1, G2.2, G3.2, G6.1).
The single insertion, "of numbers and operations" in U2-06, is the guide's own Unit 2 heading
(`:584`); the row-level trace confirms it is the only heading-word insertion in the spec.
`D-2026-0019` standard.

### 4. Outcomes - PASS

The guide's five course outcomes (`:567`, `:568`, `:570`, `:571`, `:573`) are reproduced verbatim at
`content-spec.md:43-48` (verified mechanically; the only difference is the guide's PDF bullet glyph).
Unit CLO refs (U1: 1,3; U2: 1,2,3; U3: 1,2; U4: 2,4; U5: 2,5; U6: 2,4,5) all fall in 1-5, no CLO is
orphaned, no SLO lacks a guide ancestor. The Unit 4 CLO-4 gloss is a disclosed mapping judgement;
CLO 4's guide-anchored delivery rests on Unit 6 (`:636`).

### 5. Readings - PASS (first time)

All four guide readings (`:653-656`) present in `### Guide-required`:

- `steen2001`: resolves; IA record fetched this run (title, NCED Princeton NJ, 2001, ISBN 0970954700,
  controlled-lending) - exactly what the row states; bibliographic level, `D-2026-0001` for text.
- `grawe`: conforms to the owner's `G-2026-28(a)` ruling - unresolvable recording in the
  `D-2026-0010` manner, title-level citation with no imprint ("Cognella" survives only inside the
  note's record of what was checked), limit stated at point of use, `grawe2012` the cited replacement.
- `ncm`: conforms to the owner's `G-2026-28(b)` ruling - the NCC Mathematics page cited with the
  verified URL; this evaluator re-fetched the page this run and it verifies (Progression Grid 1-12 and
  Suggested Guidelines 1-8 served as open PDFs; no publication year asserted, none cited).
- `npst2009`: resolves (in-corpus precedent, EFMP-302 `npst-pakistan-2009`; itacec.org limit under
  `D-2026-0001`).

Curated-supplementary works verified real: `grawe2012` (EJ981327), `tout2020` (EJ1266633, repaired
pages 183-209), `sikko2023` (EJ1450768), `gula2025` (EJ1489427), `mcclure2020` (EJ1480153) all
fetched against the ERIC API this run with matching titles/authors/years/journals;
`openstax-prealgebra`, `pbs`, `oecd-pisa` unchanged since `D-2026-0041`'s verification. The
`open_access_floor: default: 1` declaration is the `D-2026-0041`-recommended repair, and every unit's
Mapped readings carries at least one verified open-access source (verified mechanically).

### 6. Blueprint - PASS

All six units: fixed 10/10/5 bank, MCQ Remember to Apply, RRQ Understand to Analyze, ERQ Analyze to
Evaluate with the Analyze-or-higher rubric clause - consistent with `style-guide.md:223-231` (the
spec's ERQ band is a subset of the style guide's "Analyze → Evaluate/Create"). Three topics per unit
so the ">= 2 MCQ and >= 2 RRQ per topic" floors are feasible with headroom (6 of 10); the Units 3-6
parenthetical relaxations are disclosed relaxations of the spec's own floor and the style guide sets
no per-topic minimum. Course-review mix (~15-20 / ~10-15 / ~5-8) permitted (`style-guide.md:234-235`).

### 7. Structure - PASS

Front matter (`course_code: GQUR-300`, `status: draft`, `open_access_floor: {default: 1}`) validates
against `contracts/content-spec-frontmatter.schema.json` (replayed with ajv 2020-12; the floor key is
permitted by `additionalProperties: true` and is the key `check-source-floor.mjs` reads). All
course-level sections present in contract order; both reading subheadings carry the contract's column
set; every per-unit block present in all six units. Spec-side invariants replayed with the gate's own
parsers: total, disjoint sub-topic partitions; checklist Topic cells equal topic-list labels; depth
budget counts match; exactly two figure carriers per topic consistent with the Figure plans; at least
one concept-map/flowchart/timeline per unit (Art. III.10); every Mapped readings key resolves. Zero
failures. No em dashes.

### 8. Decision residue - PASS

All confirmed decisions swept against the whole spec: `D-2026-0001` invoked within Limits;
`D-2026-0002`/`0004`'s superseded EFMP-302 design absent (the only "one-page" hit is GQUR-300's own
practicum wording, `content-spec.md:143`); `D-2026-0003` clean (zero `.specify` references);
`D-2026-0005` not evaded; `D-2026-0012` applied; `D-2026-0010`'s manner extended to `grawe` by owner
ruling, not silently; `D-2026-0013`'s floor pattern invoked with a declared, checkable floor (the
recommended repair, anticipated by its Limits); `D-2026-0014` no superseded design. All
`D-2026-0041`-directed repairs landed at `c72199e`/`43910bf`, confirmed by diffing
`139876c..43910bf`: the change is exactly the ruling application plus those repairs.

## Escalations

None. `G-2026-28` is resolved by the owner ruling; this pass consumes no `G-` code (the assigned
block `G-2026-29`/`G-2026-30` stays unused). No criterion is blocked.

## Outcome

All eight criteria approved under `D-2026-0042` (pending-owner-review), bound to manifest digest
`4d3fd0ae99da012d1a34b7a1fbad9a7440c173a5f2d071ba8825d9c9937195a1` at commit `43910bf`. With this
decision recorded, the owner may set `status: approved` and authoring may begin. No repairs remain.
This evaluation certifies no content, qualifies no reviewer, and authorises no publication
(Art. VII.8.4).
