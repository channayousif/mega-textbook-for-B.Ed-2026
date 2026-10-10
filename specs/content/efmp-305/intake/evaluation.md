# EFMP-305 intake evaluation (G0 / G1)

- **Evaluator:** agent:evaluator, fresh session, did not draft the spec (drafted by the Paperclip
  BilingualAuthor agent)
- **Date:** 2026-10-10
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (digest `77ff2fa9...de5ff2`, bound)
- **Worktree / commit:** `wt-TEX-39`, detached at `00c49f1ae333daebb37c2232998ca48d9c1ba6b1`
- **Manifest:** `intake/EFMP-305/manifest.json`, digest
  `e3bcd12fc5ccddfd907816905a55b030b08c4a8082a4622fb83f95fe5b8f5f65`, 63 inputs
- **Decision:** `D-2026-0047`, `pending-owner-review`
- **Escalations:** `G-2026-72`, `G-2026-73`, `G-2026-74`, `G-2026-75`, `G-2026-76`, all `open`
- **Calibration:** not a calibration run; no known-defect list was supplied.

## Manifest verification

Recomputed with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
`intakeRoots('efmp-305')` root set the prepare script uses. 63 inputs, 0 mismatches, no extra or
missing path; `manifest_digest` reproduced from a fresh read; `registers` digests for
`specs/decisions/log.md` and `specs/gaps.md` matched before anything was written. The guide's
identity lines were re-extracted from `2nd 2026.pdf` with pypdf to rule out an extraction artefact.

## Verdicts

| Criterion | Verdict | Locator | Disposition |
|---|---|---|---|
| identity | **fail** (escalated) | guide `2nd 2026.txt:196` `03 (0-3)` vs Scheme `revised...txt:170` and catalog `3 (3-0)` | `G-2026-72` (Art. II.3). Code, title, semester and category agree. |
| partition | **pass** | guide `:225-294`; spec `:114-121` | Approved. Guide's Unit 6 "(2 Weeks)" header vs Weeks 14-16 resolved under `D-2026-0047` as a within-guide slip: Unit 6 = 3 weeks. |
| coverage | **fail** (partly approved, partly escalated) | guide weeks `:227-294`; spec checklists | Guide to spec complete; 27 of 30 rows approved as decompositions; U1-5, U3-5, U5-5 have no guide ancestor: `G-2026-74`. |
| outcomes | **pass** | guide `:213-221`; spec `:27-31` and each unit's SLO line | Approved. Locator "~207-217" should be `:211-221`. |
| readings | **fail** (escalated) | guide block `:189-345` has no reading list | `G-2026-73`. Floor not owner-ruled for this course; UNESCO 2020 title misstated; NEP edition unnamed; no keys or locators. |
| blueprint | **pass** | spec unit blueprint lines; `style-guide.md:223-235` | Approved. Marks table transcription approved; its 80/20 formative/summative label is not guide-given: `G-2026-75`. |
| structure | **fail** (drafter repair) | see below | Not an owner question; repair and re-submit. |
| decision-residue | **pass** | whole spec swept | Approved. No superseded design present. |

### Structure failures (for the drafter)

1. Non-disjoint partition: U5-5 in Topics 5.1 and 5.3 (`content-spec.md:380-382`); U6-4 in Topics
   6.1 and 6.3 (`:429-431`). Hard `check:depth-gate` failure once authored.
2. Units 3-6 have no gate-readable `**Depth budget**: N sub-topics; T topics; A-B reading-min` line
   (`:288`, `:336`, `:386`, `:435`). Unit 5 says "four topics" against three rows.
3. Art. III.10: Topics 3.3, 4.1, 5.1, 5.3, 6.1, 6.2 plan one figure each (floor is two).
4. Contract form: checklists lack `Guide ref` and `Topic` columns; topic-list header has title and
   label swapped and lacks `Reading-min` / `Figures`; per-unit `Prerequisite knowledge`, `Common
   misconceptions`, `Mapped readings` (keys), `Worked-examples plan`, `International best-practice
   notes` lines absent in all units; reading list lacks the `Guide-required` /
   `Curated-supplementary (open access)` tables; course review plan lacks practicum ideas.
5. Accuracy: `:8` attributes `3 (3-0)` to the guide; `:20-21` misdescribes EFMP-302/304 as
   guide-silent on readings; assessment locator should be `:312-345`; guide Class Participation
   paragraph (`:306-310`) omitted; Unit 6 week-header slip adopted without disclosure.

Units 1 and 2 pass every replayed invariant.

## Deterministic checks (commit `00c49f1a`, real exit codes)

| Command | Exit | EFMP-305 findings |
|---|---|---|
| `npm run check:depth-gate` | 0 | none (vacuous for unauthored Units 3-6) |
| `npm run check:figures` | 1 | 6, authored Units 1-2: prompt-only markers not rendered |
| `npm run check:concept-graph` | 0 | none |
| `npm run check:bloom-bands` | 0 | none |
| `npm run check:source-floor` | 0 | none (no floor declared, so vacuous) |
| `npm run check:pipeline-gate` | 1 | 4: spec `status: draft`; G2 rows not done (Units 1-2) |
| `npm run validate:content` | 0 | none |
| `npm run check:no-em-dash` | 0 | none |
| `npm run check:no-answer-keys` | 0 | none |
| `npm run check:docs-sync` | 0 | none |

Spec-side replay with the gate's own parsers (`unitSectionLines`, `parseTopicList`,
`parsePipeTable`, `tableAfterHeading`): Units 1-2 OK; Units 3-6 fail as listed above. Front matter
validates against `contracts/content-spec-frontmatter.schema.json`.

## Escalations and what they block

| Code | Question | Owner of the answer | Blocks |
|---|---|---|---|
| `G-2026-72` | Credit-hour split: guide `(0-3)` vs Scheme/catalog `(3-0)` | curriculum owner | identity; spec `:8`, `:32-34`, `:49-51` |
| `G-2026-73` | No guide reading list: floor, level, or a designated list | curriculum owner | readings; `## Reading list`; all `Mapped readings`; G2 binding for all units |
| `G-2026-74` | U1-5, U3-5, U5-5 have no guide ancestor | curriculum owner | Unit 1 Topic 1.2; Unit 3 Topic 3.3; Unit 5 Topics 5.1, 5.3 |
| `G-2026-75` | 80/20 formative/summative label on the guide's marks table | curriculum owner | spec `:46-48` only |
| `G-2026-76` | Tracker marks G1 done for Units 1-2 on an unapproved spec | curriculum owner | reliance on tracker G1 rows |

## May the spec move to `status: approved` after owner confirmation?

**No.** Owner confirmation of `D-2026-0047` confirms only the approved criteria. Approval of the
spec needs owner rulings on `G-2026-72`, `G-2026-73` and `G-2026-74`, the structure repairs, and a
fresh intake pass over the repaired spec at a new manifest.

## Boundaries observed

Wrote only `specs/decisions/log.md` (appended `D-2026-0047`), `specs/gaps.md` (appended
`G-2026-72` to `G-2026-76`) and this record. Did not edit the spec, tracker, content, catalog,
constitution or guide; did not commit or push; ran no heavy job.
