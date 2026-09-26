# Implementation Plan: Complete EFMP-302 · Teaching Profession

**Branch**: `023-author-efmp-302` | **Date**: 2026-09-24 | **Spec**: [spec.md](./spec.md)

## Context

EFMP-302 · Teaching Profession is a 3 (3-0) credit Professional Course-II for Semester 1 of the
B.Ed (4-Year) programme, bilingual (English + Urdu). All 6 English units are authored, published
and gate-checked under ADR-0026 (Unit 1 certified with human sign-off; Units 2-6 in the `gated`
tier). Urdu mirrors exist for Units 1-2 only (Unit 1 reviewed; Unit 2 the ADR-0022 rate probe at
`translation_status: draft`). No accepted G3/G5 evidence binds current bytes: the run 001-007
reports and Unit 2's cycle-3 pass are all stale under Art. VII.4 after the ADR-0027 binding
narrowing and the decision entries that followed (the G-2026-15/G-2026-18 pattern).

The spec (FR-001..FR-010) defines the requirements. This plan decomposes the completion into
tasks: fresh advisory G3 reviews where rows are open, the Urdu corpus for Units 3-6, fresh
advisory G5 reviews for every unit with a mirror, escalations under the pre-assigned blocks, and
the final gates + PR.

| Unit | Title (EN) | Topics | EN figures | UR mirror today | G3 row | G5 row |
|---|---|---|---|---|---|---|
| 1 | The Effective Teacher | 4 | 8 | reviewed | ✅ human | ✅ human |
| 2 | Roles and Responsibilities of Teachers | 4 | 8 | draft (rate probe) | open | open |
| 3 | Becoming an Effective Teacher | 5 | 10 | none | open (revoked provisional) | open |
| 4 | Professionalism and Ethics | 4 | 8 | none | open (parked, run 007) | open |
| 5 | Professional Development | 4 | 8 | none | open (parked, run 007) | open |
| 6 | Assessment and Reflective Practice | 4 | 8 | none | open (parked, run 007) | open |

## Implementation Approach

Reviews first, then translation, then G5 - so each Urdu mirror is translated against
post-review English bytes and the G5 comparison base is as fresh as the regime allows. The
G3 phase runs one fresh advisory cycle per open unit (2-6), applies sensible repairs within a
two-cycle budget, and escalates the remainder; it does not re-litigate what runs 001-007
settled, and it never marks a row done. The G4 phase follows the translate-unit skill exactly
(terminology working set, structure-first file-by-file translation, `.ur.svg` wiring via the
generate-figures bilingual reference, gates after each unit). The G5 phase runs one fresh
advisory cycle per unit with a mirror, escalating every dependency-binding failure in the
G-2026-34 pattern. Hot files (decisions log, gaps, glossary) are append-only within the
pre-assigned blocks D-2026-0053..0062 and G-2026-62..71.

## Tasks

### Task 1: SDD scaffolding

spec.md (this feature), plan.md, tasks.md, PHRs under `history/prompts/023-author-efmp-302/`;
run records under `history/prompts/efmp-302/`. Model on `specs/019-author-gnas-301/`.

### Task 2: Fresh advisory G3 reviews, Units 2-6

For each unit whose G3 row is open (2-6), in order:

- `node scripts/review-evidence.mjs prepare efmp-302 <N> G3 <outdir>` (committed tree only)
- spawn a FRESH g3-reviewer subagent (never a session that authored bytes) with the manifest
- findings are advisory: apply sensible English-side repairs, max 2 repair-and-review cycles
  per unit, then escalate the remainder under G-2026-62..71
- on any byte change: `node scripts/prepare-gate-evidence.mjs EFMP-302 <N>` and update the G2
  row Notes with the printed paths
- tracker rows stay open; report paths go in Notes

### Task 3: Urdu mirrors, Units 3-6 (G4, translate-unit skill)

For each of Units 3-6, in order (Unit 3 has 5 topics; Units 4-6 have 4 each):

- build the terminology working set (bank + glossary `definition_ur` + concepts `Label UR`)
- translate file by file in reading order; heading vectors, components, figure IDs, assessment
  items identical; front matter translated per the skill contract; academic-plain register
- UR `index.mdx` carries the `key_terms` block (bank-accepted terms only)
- `.ur.svg` Urdu-label variants for all 10/8/8/8 figures per the generate-figures
  bilingual-figures reference; `npm run figures:variants` + `figures:variants:check`
- temporary reviewed-flip parity check, then revert; `npm run check:content` after each unit
- render inspection via `node scripts/render-inspect.mjs EFMP-302 <N> --locale ur`
- commit per unit; do not touch the unit-01/02 mirrors except G5-demanded repairs

### Task 4: Fresh advisory G5 reviews, Units 1-6

For each unit with a complete Urdu mirror (2-6 fresh; Unit 1 only if its mirror needed repair,
otherwise its accepted human sign-off stands and no fresh G5 is forced):

- `node scripts/review-evidence.mjs prepare efmp-302 <N> G5 <outdir>`
- spawn a FRESH g5-reviewer subagent; it binds accepted G3 evidence per freshness rules
- where binding fails (no accepted G3, or post-pass repairs changed English bytes), record the
  escalation under G-2026-62..71 citing the G-2026-34 pattern and continue
- translation_status stays `draft`; never mark reviewed; rows stay open with report paths

### Task 5: Final gates + PR

- `npm run check:all` (full tier incl. bilingual build); fix findings (max 2 cycles, document)
- `git push -u origin HEAD`; `gh pr create` to main with the mandated body; never merge

## Constitution Check

- **Art. III.2 (as amended by ADR-0022)**: Urdu parity is a corpus-completion requirement;
  units publish English-only with the untranslated banner until their mirror lands. This
  feature completes the course's Urdu corpus.
- **Art. III.9**: zero em dash in every file touched.
- **Art. III.10**: visual density stands; this feature only adds Urdu label variants to
  existing figures, never removes carriers.
- **Art. V.1**: content stays in Git; no database.
- **Art. VII (ADR-0019)**: agent reviews are advisory; no self-signing, no human initials, no
  row marked done from agent findings; two-cycle budget then escalate.
- **ADR-0024**: all EFMP-302 figures are schematics (already placed); the `.ur.svg` variants
  are deterministic SVG label translations, which are Claude's side of the boundary.
- **ADR-0026/0027**: publication stays on the deterministic gates; evidence binds per-unit.

## Key Authoring Rules

- The English units are settled; only review-demanded repairs, smallest viable diff.
- The terminology bank is read-only; unbanked terms become proposals in the handoff.
- No edits outside EFMP-302's paths and the feature/spec/PHR trees; catalog, sidebars, config,
  src, scripts, contracts, style guide, constitution, package.json untouched.
- Capacity rule: `uptime` before every build-heavy step; load > 8 waits; max 2 concurrent
  reviewer/build subagents.

## Verification

- [ ] `npm run check:content` green after each Urdu unit
- [ ] `npm run figures:variants:check` clean; every unit 3-6 figure has `.ur.svg` + `.ur.dark.svg`
- [ ] `npm run check:all` green at the final commit
- [ ] Units 2-6 carry fresh advisory G3 reports; units with mirrors carry fresh advisory G5
      reports (Unit 1 excepted if untouched)
- [ ] Every binding failure and budget exhaustion escalated under G-2026-62..71
- [ ] No G3/G5/G6/G7 row marked done; no human initials; translation_status still draft on 2-6
- [ ] PR open to main, not merged
