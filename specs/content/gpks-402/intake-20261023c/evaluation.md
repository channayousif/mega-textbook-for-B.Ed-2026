# GPKS-402 · Pakistan Studies - Intake Evaluation (re-intake after the two-row readings repair, 2026-10-23)

**Evaluator**: agent:evaluator (fresh session; did not draft the spec, the first repair or the two-row repair)
**Gates**: G0 intake / G1 unit-spec
**Date**: 2026-10-23
**Constitution**: Article VII.8
**Skill**: `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (bound digest `77ff2fa9...`)
**Spec under evaluation**: `specs/content/gpks-402/content-spec.md` (status: draft, 360 lines)
**Course guide**: `Scheme-and-Course-guides/extracted-text/2nd 2026.txt` (GPKS block, lines 972-1153)
**Prior intake**: `D-2026-0073` (bundle `intake-20261023b/`, pending-owner-review). Void under
Art. VII.8.5: its bound input `content-spec.md` changed after its bundle (commit `49c7cf87`).
**Decision recorded**: `D-2026-0074` in `specs/decisions/log.md` (pending-owner-review)
**Escalations**: none

## Manifest verification

- Bundle: `specs/content/gpks-402/intake-20261023c/manifest.json`.
- Manifest commit: `49c7cf8733e74f4412a30567a1011b04dba12333`; bundle committed as `99c9621e`
  (`git diff --stat 49c7cf87 99c9621e`: only the manifest itself added). Worktree clean before
  evaluation.
- Inputs bound: 61. Manifest digest:
  `42398cabc89d1fdc4a8a72704715c2d4ce594c8a54fb7fe70c8b09d06251725c`.
- Recomputed independently with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
  `intakeRoots('gpks-402')` set at `99c9621e`: all 61 recorded paths present, 0 per-file digest
  mismatches; `digest(JSON.stringify(input_manifest))` reproduces the stored digest; the
  recomputed map restricted to the 61 recorded paths reproduces it too.
- One extra path in the recompute: the bundle's own `intake-20261023c/manifest.json`, committed
  after preparation. Not an input this decision rests on (the `intake-<suffix>/` binding
  behaviour `D-2026-0071` and `D-2026-0073` already recorded as a tooling advisory).
- Registers (read, not freshness-bearing) matched at read time: `specs/decisions/log.md`
  `dfba85eb...`, `specs/gaps.md` `383dcc3b...`.

### Delta against the `D-2026-0073` bundle

Compared `intake-20261023c/manifest.json` with `intake-20261023b/manifest.json` entry by entry:

| Path | Change |
|---|---|
| `specs/content/gpks-402/content-spec.md` | `e24f07b5...` -> `40cf79ab...` |
| `specs/content/gpks-402/intake-20261023b/evaluation.md` | new (the `D-2026-0073` record) |
| `specs/content/gpks-402/intake-20261023b/manifest.json` | new (the `D-2026-0073` bundle) |
| all other 58 inputs | byte-identical: guide and Scheme texts, catalog, contracts, style guide, terminology, constitution, skill, agent file, earlier intake records |

The two new paths are the prior intake's own record and bundle, not normative inputs. The spec
diff (`git diff 01845105 49c7cf87 -- specs/content/gpks-402/content-spec.md`) is exactly three
hunks: the `durrani-dunne-2010` row deleted from the author-selected table (old `:50`); the
`worldbank-pdu-2025` licence changed from "CC BY 3.0 IGO" to "CC BY-NC 3.0 IGO" (now `:53`); and
`durrani-dunne-2010` removed from the Unit 1 and Unit 6 `**Mapped readings**` lines (now `:101`,
`:347`). Front matter, guide-required table, week schedule, every checklist, topic list,
blueprint, figure plan and SLO line are untouched.

Because only those spec lines changed, this intake follows the scope `D-2026-0073` set: it relies
on `D-2026-0073`'s checked findings for identity, partition, coverage, outcomes, blueprint and
structure, re-verifies the readings criterion in full, and redoes decision residue over the whole
spec. Line locators in `intake-20261023b/evaluation.md` at or after old `:50` are now one lower.

## Deterministic checks (real exit codes, run at `99c9621e`)

| Check | Exit | GPKS-402 findings |
|---|---|---|
| validate:content | 0 | none |
| check:pipeline-gate | 0 | none (no GPKS-402 unit under `docs/`) |
| check:depth-gate | 0 | none |
| check:figures | 0 | none |
| check:no-em-dash | 0 | none |
| check:no-answer-keys | 0 | none |
| check:concept-graph | 0 | none |
| check:bloom-bands | 0 | none |
| check:source-floor | 0 | none (no authored GPKS-402 unit, so vacuous) |
| check:licence | 0 | none |
| licence:map:check | 0 | none |
| check:content-status | **1** | `static/content-status.json` stale; not a bound input, no GPKS-402 line, unrelated to this spec (same result `D-2026-0073` recorded) |
| check:docs-sync | 0 | none |

Front matter validated separately against `contracts/content-spec-frontmatter.schema.json` with
Ajv 2020: valid (`course_code: GPKS-402`, `status: draft`, `open_access_floor: {default: 1}`).
`docs/semester-2/gpks-402/` and its Urdu mirror still hold only `_category_.json` and
`course-overview.mdx`, so the unit-walking gates are vacuous for this course; readings were checked
by hand and by external lookup.

## Criteria

### 1. identity - PASS (carried from `D-2026-0073`; inputs unchanged)

Guide `:980-982`, revised Scheme `B.Ed 4 Year 2026 revised after board.txt:90`, `:178-184` and
`catalog/courses.json` are byte-identical to the `D-2026-0073` bundle; spec `:10-12` is untouched.
GPKS-402, Pakistan Studies, 2 (2-0), General Education, Semester 2; the guide's "GPKS - 302" is the
slip resolved in `G-2026-03`.

### 2. partition - PASS (carried; rests on owner rulings `D-2026-0053` item 1, `D-2026-0070` item 1)

Week schedule (`:57-66`) and unit headings unchanged. The six-unit grouping over a bare week table
is the owner-confirmed one, not a guide determination.

### 3. coverage - PASS (carried)

All six checklists unchanged; 43 guide teaching bullets (`:1012-1135`) map to 47 rows exactly once,
as recorded in `intake-20261023b/evaluation.md`.

### 4. outcomes - PASS (carried; SLO 6-1 rests on `D-2026-0053` item 4)

SLO lines unchanged. All 14 SLOs trace to guide objectives `:996-1006` or, for 6-1, to Week 13
under the owner ruling.

### 5. readings - PASS (re-verified in full)

Guide list `:1143-1153` (four print entries) transcribed at spec `:39-42`, unchanged:
`hec-pak-studies` flagged title-level under `D-2026-0001`; `rabbani-pak-studies`,
`hamid-khan-const` (ISBN 9780199407828), `burki-fifty-years` (ISBN 9780813336213) are print
monographs, title-level support under `D-2026-0001` unless a copy is obtained. Policy for the
author-selected supplements is owner-ruled (`D-2026-0053` item 2, applied in confirmed
`D-2026-0066`): labelled, verified, and every unit binds >= 1 open-access source with a registry
identity and a verification date.

**The two `D-2026-0073` defects are repaired.**

- `durrani-dunne-2010` no longer occurs anywhere under `specs/content/gpks-402/` outside the earlier
  intake record, nor under `docs/` or `i18n/` (grep for `durrani`, `Durrani`, `figshare`: 0 hits in
  the spec). It is removed from the table and from both Mapped readings lines.
- `worldbank-pdu-2025` (`:53`) now states "CC BY-NC 3.0 IGO". The OKR item API
  (`openknowledge.worldbank.org/server/api/core/items/360b64ce-...`) returns `dc.rights`
  "CC BY-NC 3.0 IGO", `dc.rights.uri` `creativecommons.org/licenses/by-nc/3.0/igo`, `dc.identifier.doi`
  `10.1596/45320`, issued 2025-10-31. Matches. No "CC BY 3.0" remains in the spec.

**Every remaining open-access row re-checked on 2026-10-23** (Crossref REST API, OpenAlex API, DOI
resolution, and download of the full text itself; none of these is a bound input):

| Key (spec line) | Crossref | OpenAlex ID -> DOI | Full text actually served | Finding |
|---|---|---|---|---|
| `hassan-2020-two-nation` (`:50`) | Hassan, *AJSSMS* 7(2) 80-88 | `W3034006569` -> this DOI | `asianonlinejournals.com/.../download/1568/1482`: HTTP 200, application/pdf, 9 pages; page 1 carries the title, volume and DOI | Verified |
| `khan-khan-2020-aligarh` (`:51`) | Khan; Khan, *JHSS* 11(1) | `W3106934127` -> this DOI (cc-by) | `jhss-uok.com/.../download/102/96`: 200, application/pdf, 22 pages; page 1 title and both authors match (DOI landing page returns 406 to a plain client, a bot block) | Verified |
| `hussain-kokab-2012-18th` (`:52`) | Hussain; Kokab, *Asian Social Science* 8(1) | `W2127299016` -> this DOI (cc-by) | `ccsenet.org/.../download/11145/9786`: 200, application/pdf, 8 pages; page 1 "Asian Social Science Vol. 8, No. 1; January 2012 ... Eighteenth Amendment ..." | Verified |
| `worldbank-pdu-2025` (`:53`) | title matches; DOI resolves to the OKR item | `W7172064073` -> this DOI | OKR ORIGINAL bitstream `P507205-...pdf`: 200, application/pdf, 4,590,212 bytes, 50 pages; cover "October 2025 PAKISTAN DEVELOPMENT UPDATE Staying the Course for Growth and Jobs" | Verified; licence now correct |
| `khan-2015-foreign-policy` (`:54`) | R. M. Khan, *JCS* 4(1) 14-30 | `W3208096173` -> this DOI | `jcs.ndu.edu.pk/.../download/74/45`: 200, application/pdf, 18 pages; page 1 "Journal of Contemporary Studies, Vol. IV, No.1, Summer 2015 FOREIGN POLICY OF PAKISTAN ..." | Verified |
| `pak-constitution-1973` (`:55`) | none claimed (primary text, correctly) | n/a | `na.gov.pk/uploads/documents/1333523681_951.pdf`: 200, application/pdf, 222 pages; title page "[As modified upto the 28th February, 2012] NATIONAL ASSEMBLY OF PAKISTAN" | Verified as described |

**Units column against Mapped readings**, checked mechanically by a script over the spec's own
tables: all ten keys agree (`hec-pak-studies` 1,3,4; `rabbani-pak-studies` 1,2,4,5;
`hamid-khan-const` 2,3,4; `burki-fifty-years` 5,6; `hassan-2020-two-nation` 1,2;
`khan-khan-2020-aligarh` 2; `hussain-kokab-2012-18th` 3,4; `worldbank-pdu-2025` 5;
`khan-2015-foreign-policy` 6; `pak-constitution-1973` 1,3,4), against Mapped readings at `:101`,
`:147`, `:194`, `:246`, `:296`, `:347`.

**Floor (`open_access_floor.default: 1`), per unit**, counting only rows that carry a registry
identity and a verification date and whose full text was downloaded above:

| Unit | Registry-verified open-access sources mapped |
|---|---|
| 1 | `hassan-2020-two-nation` (plus the primary-text `pak-constitution-1973`) |
| 2 | `hassan-2020-two-nation`, `khan-khan-2020-aligarh` |
| 3 | `hussain-kokab-2012-18th` (plus `pak-constitution-1973`) |
| 4 | `hussain-kokab-2012-18th` (plus `pak-constitution-1973`) |
| 5 | `worldbank-pdu-2025` |
| 6 | `khan-2015-foreign-policy` |

Every unit meets the floor. Advisories, no repair required: (a) the removal leaves Unit 1's
"national ideology and identity" and "Pakistan Studies in educational context" rows and Unit 6's
education-and-national-integration rows (U6-08 to U6-10) without a topic-specific open-access
source; the floor is per unit, not per topic, so this is not a defect, but those authors will lean
on title-level print support; (b) `worldbank-pdu-2025` is NC-licensed: citation by reference is
unaffected (Art. III.5), but any figure redrawn from its data should be checked at G3 against the
NC term; (c) the `D-2026-0073` advisories stand (2012 Constitution edition predates later
amendments, check U4-04; `hussain-kokab` online date 2011-12-30; cite the JHSS DOI, not the site).

### 6. blueprint - PASS (carried)

Blueprint lines unchanged (`:75`, `:121`, `:167`, `:214`, `:269`, `:316` and the unit-end lines).
Two-topic Units 1, 2, 3, 5 "formative 5-8"; three-topic Units 4 and 6 "formative 9 items, 3 per
topic" per confirmed `D-2026-0072`; 10/10/5 bank and ERQ arithmetic as recorded.

### 7. structure - PASS (re-confirmed)

Front matter re-validated (Ajv 2020, valid); every required section and per-unit block still
present (`## Course-wide items :14`, `## Course Description :27`, `## Reading list :31` with both
tables, `## Week schedule :57`, six `## Unit N` blocks each with `### Sub-topic checklist` and
`### Topic list`); `validate:content` exit 0. The author-selected table keeps its five columns.
Advisories unchanged (header source range `:10` a few lines off the guide block; stray leading
space in a Unit 1 misconception at `:99`).

### 8. decision-residue - PASS (redone over the whole spec)

Confirmed decisions whose scope reaches GPKS-402, each searched across the whole spec, not only
its "Applied in" section:

- `G-2026-03`: "GPKS - 302" occurs only in the code note (`:12`); no "GPKS-302", "Semester IV" or
  `semester-4`. No residue.
- `D-2026-0001`: applied as the title-level flag on `hec-pak-studies` (`:39`). No residue.
- `D-2026-0003`: no `.specify/Course_guides` reference. No residue.
- `D-2026-0052` (confirmed): none of its superseded designs occur (`goe-bloom`, `ziad`, "fifty
  decades", "Curated-supplementary": 0 hits); Units column consistent for all ten keys.
- `D-2026-0053` items 1, 2, 4, 5 and `D-2026-0066`: grouping kept; floor in mapping form, no bare
  `open_access_floor: 1`; SLO 6-1 trace as ruled; no authored GPKS-402 unit under `docs/` or the
  Urdu mirror. The entries `D-2026-0071` found defective stay gone (`pbs-pak-stats`, `sbp-annual`,
  `mofa-foreign-policy`, `unesco-pak-education`, `na-lahore-resolution`: 0 hits);
  `1973_constitution.pdf` (`:55`) and ISBN `9780199060986` (`:41`) survive only inside the notes
  recording what was replaced.
- `D-2026-0070` item 1: grouping kept for a bare week table; item 3 is outside the spec. No
  residue.
- `D-2026-0072`: applied at `:214` and `:316`; "formative 5-8" survives only in the two-topic Units
  1, 2, 3, 5, which the ruling leaves on the default. No residue.

`D-2026-0069`, `D-2026-0071` and `D-2026-0073` are pending-owner-review, not confirmed, so they are
not residue sources. Their named repairs are nonetheless checked: `D-2026-0073`'s two rows are
repaired (no `durrani`, `figshare` or "CC BY 3.0" anywhere in the spec), and no residue of the
removed row survives in Units 1 or 6.

## Outcome

`D-2026-0074` approves all eight criteria (identity, partition, coverage, outcomes, readings,
blueprint, structure, decision residue) for all six units, at pending-owner-review, bound to
manifest digest `42398cabc89d1fdc4a8a72704715c2d4ce594c8a54fb7fe70c8b09d06251725c`. Partition and
the SLO 6-1 trace rest on owner rulings (`D-2026-0053`, `D-2026-0070`), not on the guide alone;
readings rest on the owner policy `D-2026-0053` item 2. Nothing is escalated; no `G-` entry is
opened.

`D-2026-0074` supersedes `D-2026-0073`, which is void under Art. VII.8.5 because `content-spec.md`
changed after its bundle. `D-2026-0073` is not edited.

The spec stays `status: draft`; this evaluation does not change it. Moving it to `approved` is the
owner's act on confirming `D-2026-0074`. Any further change to a bound input voids this decision.
Certifies no content, qualifies no reviewer, authorises no publication (Art. VII.8.4).
