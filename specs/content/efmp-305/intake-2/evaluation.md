# EFMP-305 re-intake evaluation (G0 / G1), after author repairs

- **Evaluator:** agent:evaluator, fresh session; did not draft or repair the spec (Paperclip
  BilingualAuthor did)
- **Date:** 2026-10-10
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (digest `77ff2fa9...de5ff2`, bound)
- **Worktree / commit:** `wt-TEX-39`, detached at `bc61ff7ae880935f32c7f4a25738c99e7ba50c4c`, clean
- **Manifest:** `intake2/EFMP-305/manifest.json`, digest
  `13d09407ed3ff1cbf2b04fbf5e83455517b4013b5d8bb85ba65143385353567a`, 63 inputs
- **Decision:** `D-2026-0054`, `pending-owner-review`
- **Escalation:** `G-2026-102`, `open`
- **Binding owner ruling:** `D-2026-0053` (confirmed 2026-10-10; read from
  `intake2/D-2026-0053.md`, not yet in the worktree log)
- **Calibration:** not a calibration run.

## Manifest verification

Recomputed with `manifestFor()` over `intakeRoots('efmp-305')`: 63 inputs, 0 mismatches,
`manifest_digest` reproduced, both register digests matched before writing. Re-run after writing:
inputs still 0 mismatches (only the two registers changed, by this evaluator's appends).
Against the prior intake manifest (`specs/content/efmp-305/intake/manifest.json`, commit
`00c49f1a`), the **only** changed bound input is `content-spec.md`; prior findings on the guide,
Scheme, catalog, style guide, contracts, coverage/sources/figures/concepts files are reused.

## Verdicts

| Criterion | Verdict | Locator | Change since D-2026-0047 |
|---|---|---|---|
| identity | **pass** | guide `:196` `03 (0-3)`; Scheme `revised...txt:166-170` and catalog `3 (3-0)`; spec `:9` | Was fail; `G-2026-72` resolved by `D-2026-0053` item 3 |
| partition | **pass** | guide `:225-294`; spec `:121-133` | Unchanged; Unit 6 slip now disclosed (`:133`) |
| coverage | **pass** | guide `:227-294`; checklists `:184-190`, `:239-245`, `:286-292`, `:339-345`, `:390-396`, `:445-451` | Was fail; U1-5/U3-5/U5-5 derivations named (`:192`, `:294`, `:398`) per `D-2026-0053` item 4 |
| outcomes | **pass** | guide `:213-221`; SLO lines per unit | Unchanged (locator `:27` still says ~207-217) |
| readings | **fail (escalated)** | guide `:282`; spec `:89-93`, `:139-141` | Course-wide anchors now correct and labelled; new escalation `G-2026-102` |
| blueprint | **pass** | per-unit blueprints; spec `:48-49`; `style-guide.md` | 40/60 per `D-2026-0053` item 6 (`G-2026-75` resolved) |
| structure | **fail (author repair)** | see below | Partly repaired |
| decision-residue | **pass** | whole spec swept | No residue of 80/20, `(0-3)`, 2-week Unit 6 or underived rows |

### Readings

Repaired: UNESCO title now *Inclusion and education: All means all* (2020 GEM Report, correct);
NEP edition named (2009); all anchors labelled author-selected; `open_access_floor: 1` declared
and `## Open-access floor` added. `check:source-floor` exit 0 (Units 1-2 meet the floor).

Not settled: the guide's Week 11 "Rights of Persons with Disabilities Act (2018)" (`:282`) does not
resolve to one enacted statute. The federal Act is the ICT Rights of Persons with Disabilities
Act, 2020 (bill tabled 2018); the 2018 statute is the provincial Sindh Empowerment of Persons with
Disabilities Act, 2018. The spec calls it "the primary national legal framework" (`:139-140`).
Which statute Unit 5 teaches is not guide-determined: `G-2026-102`.

### Structure: repaired since D-2026-0047

- Partitions total and disjoint in all six units (replayed with `unitSectionLines`,
  `parseTopicList`, `parsePipeTable`, `tableAfterHeading`).
- Gate-readable `**Depth budget**` lines in Units 3-6; N and T counts match checklist and topic rows.
- Topics 3.3, 4.1, 5.1, 5.3, 6.1 now plan two figures each; every unit plans a schematic.
- Assessment locator `:312-345`; Class Participation `:306-310` recorded; Unit 6 slip disclosed;
  tracker G1 rows reset to not-started (the `G-2026-76` repair; that gap's status is not this
  evaluator's to change).

### Structure: outstanding (D-2026-0053 binds the author to the repairs the intake listed)

1. **Topic 6.2 plans one figure** (`fig-U6-3`, `:471-472`); Art. III.10 floor is two.
2. **Contract form, not done:** checklists still `ID | Sub-topic | Target Bloom` (no `Guide ref`
   / `Topic`); topic-list header still `Topic | Label | ...` (title and label swapped, no
   `Reading-min` / `Figures`); no per-unit `**Prerequisite knowledge**`, `**Common
   misconceptions**`, `**Mapped readings**`, `**Worked-examples plan**`, `**International
   best-practice notes**` lines in any unit (`:58` points to `Mapped readings` lines that do not
   exist); no `Guide-required` / `Curated-supplementary (open access)` tables; no practicum ideas
   in the course review plan. These are not gate-parsed, and the defining contract
   (`specs/008-rich-unit-pedagogy/contracts/content-spec-v3.md`) is not itself a bound input; they
   are held here because `D-2026-0053` requires the listed repairs.
3. **Accuracy:** `:20-21` still describes EFMP-302/304 as guide-silent on reading lists; `:27`
   outcomes locator should be `:211-221`; `:140-141` says the guide names no statute, but `:282`
   does.

## Deterministic checks (commit `bc61ff7a`, real exit codes)

| Command | Exit | EFMP-305 findings |
|---|---|---|
| `npm run check:depth-gate` | 0 | none |
| `npm run check:figures` | 1 | 6, authored Units 1-2: prompt-only markers not rendered (content stage, not spec) |
| `npm run check:concept-graph` | 0 | none |
| `npm run check:bloom-bands` | 0 | none |
| `npm run check:source-floor` | 0 | floor now declared and met |
| `npm run check:pipeline-gate` | 1 | 4: spec `status: draft`; G2 rows in progress (Units 1-2) |
| `npm run validate:content` | 0 | none |
| `npm run check:no-em-dash` | 0 | none |
| `npm run check:no-answer-keys` | 0 | none |
| `npm run check:docs-sync` | 0 | none |

Spec-side replay: Units 1-5 OK; Unit 6 fails only the Topic 6.2 figure floor.

## Observations for the owner (not verdicts)

- The worktree log's `D-2026-0047` status line was changed to `confirmed` by author commit
  `6a6c8589`, citing `D-2026-0053`. The supplied `D-2026-0053` text rules the gaps but does not
  expressly confirm `D-2026-0047`. `D-2026-0054` does not rest on `D-2026-0047`'s status.
- The marks table (Mid 30, Final 50, Sessional 10, Attendance 10) sits beside the owner-ruled
  40/60 split. The ruling governs; the table is unchanged by it.
- `D-2026-0053` item 6 requires the UR course overview to state 40/60; no UR EFMP-305 overview
  exists in this worktree yet. The EN overview states 40/60.

## May the spec move to `status: approved` now?

**No.** Remaining before a fresh intake on a new manifest:

1. Owner ruling on `G-2026-102`, then the author applies it to Unit 5 (`:130` stays guide text;
   `:139-141`, key terms `:381`, `U5-2`/`U5-3` wording, `fig-U5-1` to `fig-U5-4`) and corrects
   `:140-141`.
2. Add a second figure to Topic 6.2.
3. Make the contract-form repairs in Structure item 2.
4. Fix accuracy at `:20-21` and `:27`.

## Boundaries observed

Wrote only: `specs/decisions/log.md` (appended `D-2026-0054`), `specs/gaps.md` (appended
`G-2026-102`), and this record. Did not edit the spec, tracker, content, catalog, constitution or
guide; did not commit or push; ran no heavy job. Unused reserved codes: `G-2026-103` to
`G-2026-105`.
