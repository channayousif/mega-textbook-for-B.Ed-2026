# EFMP-305 third intake evaluation (G0 / G1), after D-2026-0054 repairs and the G-2026-102 ruling

- **Evaluator:** agent:evaluator, fresh session; did not draft or repair the spec
- **Date:** 2026-10-10
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (digest `77ff2fa9...de5ff2`, bound)
- **Worktree / commit:** `wt-TEX-39` at `76659f21a0ad712f5b5dbb617b5049d6523cb290`, clean before writing
- **Manifest:** `intake3/EFMP-305/manifest.json`, digest
  `6342b0733dd3748e087e3d61a177c780e41dbd5af41fc3265b9ea7cf209da9b5`, 65 inputs
- **Decision:** `D-2026-0065`, `pending-owner-review`
- **Escalations:** none. Reserved `G-2026-146` to `G-2026-149` unused.
- **Binding owner ruling:** `D-2026-0053` (confirmed), read from `intake2/D-2026-0053.md`
  (sha256 `15d74a8c3e737fbd639164f2b9e3c933504b0d2558659dfed8dfdfecadc2ab1f`). It is not in the
  worktree log; the parent states items 6-7 are merging to main via PR #128.
- **Calibration:** not a calibration run.

## Manifest verification

Recomputed with `manifestFor()` over `intakeRoots('efmp-305')`: 65 inputs, 0 mismatches,
`manifest_digest` reproduced; both register digests matched the manifest before writing. Against
the intake-2 manifest, the only changed bound inputs are `content-spec.md`, `sources/unit-01.md`,
`sources/unit-02.md`, and the intake-2 record itself. So the intake-2 findings on the guide,
Scheme, catalog, style guide, contracts, coverage, concepts and figures files carry over. All eight
criteria were re-checked against the new spec.

## Verdicts

| Criterion | Verdict | Locator |
|---|---|---|
| identity | **pass** | guide `2nd 2026.txt:189-197`; catalog `3 (3-0)`, Major: Professional; spec `:13`, `:20-22`; `D-2026-0053` item 3 |
| partition | **pass** | guide `:225-294`; spec week table `:158-165`; Unit 6 slip disclosed `:167` |
| coverage | **pass** | guide `:227-294`; checklists `:247-253`, `:326-332`, `:393-399`, `:468-474`, `:542-548`, `:626-632`; derivations `:255`, `:401`, `:550` |
| outcomes | **pass** | guide `:213-221`; spec `:36-42`; SLO lines `:234`, `:315`, `:382`, `:458`, `:525`, `:614` |
| readings | **pass** | guide has no list (`:189-345`); spec `:91-151`; `D-2026-0053` items 2 and 7 |
| blueprint | **pass** | per-unit blueprints; spec `:57-58`; `style-guide.md:225-232`, `:283-287` |
| structure | **pass** | replay and gate table below |
| decision-residue | **pass** (one residue extended, ruling-determined) | whole `specs/content/efmp-305/` tree swept |

### D-2026-0054 repairs: status

| Outstanding item in D-2026-0054 | Now |
|---|---|
| Topic 6.2 plans one figure | Fixed: `fig-U6-3` flowchart and `fig-U6-6` table (`:639`, `:673-676`) |
| Checklist `Guide ref` / `Topic` columns | Fixed, all six units |
| Topic list `Topic \| Title \| Sub-topic IDs \| Reading-min \| Figures` | Fixed, all six units |
| Per-unit Prerequisite / Misconceptions / Mapped readings / Worked-examples / Best-practice lines | Present in all six units |
| `Guide-required` / `Curated-supplementary (open access)` tables | Fixed (`:96-119`); Guide-required stated empty |
| Course-review practicum ideas | Fixed (`:213-228`) |
| Accuracy `:20-21` (EFMP-302/304 readings) | Fixed (`:29`) |
| Accuracy `:27` (outcomes locator) | Fixed (`:36`, lines 211-221) |
| Accuracy `:140-141` (guide names no statute) | Fixed (`:170`, "does not name one enacted statute") |
| `G-2026-102` (which statute) | Ruled by `D-2026-0053` item 7 and applied (see Readings) |

### Readings

- The guide's Week 11 text is kept as guide text (`:164`, `:537`). Elsewhere, Unit 5 teaches the
  Sindh Act as item 7 directs: `U5-2` and `U5-3` (`:545-546`), the Topic 5.2 title (`:557`), key
  terms (`:532-535`), the standards anchors (`:179-185`), `fig-U5-1` to `fig-U5-4` (`:590-600`), the
  worked examples (`:576-581`), the misconceptions (`:567-570`) and the best-practice note
  ("federal comparison short", `:585`). Nowhere is the federal Act presented as the primary
  framework.
- I checked these myself:
  - **Sindh Act.** The Government of Sindh DEPD page returns HTTP 200 and gives "Sindh Act No:
    XLVIII of 2018", notified 11 June 2018, with s. 9 "Equity in education".
  - **ICT Act.** The ADB-hosted Gazette PDF returns HTTP 200 and gives "ACT NO. XXXV OF 2020",
    presidential assent 22 September 2020, extent the Islamabad Capital Territory only, s. 9
    "Equity in education". The short title is "ICT Rights of Persons with Disability Act, 2020",
    singular, as the spec notes.
  - **DOIs.** Crossref matches all five: unesco2020, ainscow2020 (49(3-4), 123-134), ainscow2020b
    (6(1), 7-16), florian2014 (29(3), 286-294) and miles2010 (14(1), 1-15).
  - **Other URLs.** The NEP 2009, UNICEF, WHO and CAST URLs return HTTP 200.
  - **UN DESA CRPD page.** It returned 403 to a scripted request, which looks like bot protection.
    The instrument itself is not in doubt.
- Monographs: `westwood2018` (print) binds title-level support under `D-2026-0001`.

### Structure: replay and gates

Replayed with `unitSectionLines`, `parseTopicList`, `parsePipeTable` and `tableAfterHeading`:
- In every unit the topic partition is total and disjoint, and the checklist `Topic` column agrees
  with the topic list.
- Each unit's depth line gives 5 sub-topics, with topic counts 2/2/3/2/3/3 matching the tables.
- Unit bands exceed the per-topic minute sums by the index and assessment allowance
  (style guide `:285`, `:325`).
- All 15 topics plan two figures, every unit plans a concept-map, flowchart or timeline, and every
  figure-plan topic matches the topic-list row.

| Command (commit `76659f21`) | Exit | EFMP-305 findings |
|---|---|---|
| `npm run check:depth-gate` | 0 | none |
| `npm run check:figures` | 1 | 6, authored Units 1-2: prompt-only markers not rendered (content stage) |
| `npm run check:concept-graph` | 0 | none |
| `npm run check:bloom-bands` | 0 | none |
| `npm run check:source-floor` | 0 | floor declared and met |
| `npm run check:pipeline-gate` | 1 | 4: spec `status: draft`; G2 rows in progress (Units 1-2) |
| `npm run validate:content` | 0 | none |
| `npm run check:no-em-dash` | 0 | none |
| `npm run check:no-answer-keys` | 0 | none |
| `npm run check:docs-sync` | 0 | none |

The two non-zero exits are expected before approval and authoring, and neither is a spec defect.

### Decision residue

- **Searched for:** `80/20`, `(0-3)`, two-week Unit 6, underived added rows, "primary national"
  framework, and pre-ruling statute and source titles. None of these remain in
  `content-spec.md`, `coverage/`, `concepts/`, `figures/` or `sources/`.
- `rpwd2018` survives only as a legacy citation key whose record is now the Sindh Act
  (`sources/unit-01.md:28-30`, `:41`; spec `:118`, `:280`). That is a key name, not a superseded
  design.
- **Residue found:** `sources/unit-01.md:9-10` still states "the binding floor is two verifiable
  open-access sources per unit". This is the pre-ruling floor. `D-2026-0053` item 2 and spec
  `:131` set it at one. Extending the ruling to this line is ruling-determined, not a scope
  judgement, so it is recorded in `D-2026-0065` rather than escalated. The line should be aligned
  at G2.

## Observations carried forward (not verdicts, not spec defects)

1. **Units 1-2 prose.** It still carries pre-ruling statute wording and old source titles. This
   is G3 territory, flagged in `sources/unit-01.md:28-30`.
2. **Westwood edition date.** `sources/unit-02.md:23` dates Westwood's 7th edition to 2018.
   Crossref and OpenAlex list the Routledge 7th edition as 2015 (doi:10.4324/9781315716695), with
   no 2018 edition. The same date appears in `docs/.../unit-02/topic-02.mdx:182`. Correct it at G2
   or G3.
3. **Generic URLs.** `hehir2016` (`https://www.abtassociates.com`) and `unCRPD`
   (`https://www.un.org`) in `sources/unit-01.md` point at domain roots. The spec's reading list
   gives a specific UN DESA URL for unCRPD.
4. **UR course overview.** `D-2026-0053` item 6 requires it to state 40/60, and it does not exist
   in this worktree yet.
5. **Topic 4.2 title.** The title "Accessibility, aids and arrangement" includes arrangement, but
   `U4-5` (arranging the classroom) sits in Topic 4.1. This is cosmetic, and both rows decompose
   the same guide item (Week 8, `:274`).
6. **Spec-recorded G2 obligations.** The spec itself records the floor sources for Units 4 and 6
   and the U5-4 teacher-attitude study as G2 binding obligations (`:140-142`, `:494-496`,
   `:573-574`, `:653-655`).
7. **Ruling not yet in the worktree log.** `D-2026-0053` is not in the worktree's
   `specs/decisions/log.md`, although `G-2026-102` there is marked resolved citing it. This
   approval rests on the supplied confirmed text.

## May the spec move to `status: approved`?

**Yes, on owner confirmation of `D-2026-0065`.** No criterion is failed, unverified or escalated.
The approval binds to manifest digest `6342b073...09da9b5`, and any change to a bound input voids
it. Setting `status: approved` and updating the tracker are not this evaluator's actions.

## Boundaries observed

- **Wrote only:** `specs/decisions/log.md` in the worktree (appended `D-2026-0065`) and this
  record.
- **Did not touch:** `specs/gaps.md` (nothing escalated), the spec, sources, tracker, content,
  catalog, constitution or guide.
- **Did not:** commit or push, or run any heavy job.
- **External lookups:** Crossref, OpenAlex and HTTP checks of public URLs only; no personal data
  was sent.
