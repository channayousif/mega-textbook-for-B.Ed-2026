# EFMP-303 intake evaluation (G0 intake / G1 unit-spec)

- **Evaluator:** agent:evaluator (fresh session; did not draft this spec, which was drafted by the
  Paperclip BilingualAuthor agent)
- **Date:** 2026-10-10
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0, Constitution Art. VII.8
- **Subject:** `specs/content/efmp-303/content-spec.md`, `status: draft`, commit
  `2452929d1ba1b34c0a4f2335df49bc40fd015fa9`
- **Decision recorded:** `D-2026-0048` (pending-owner-review), `specs/decisions/log.md`
- **Escalations recorded:** `G-2026-77`, `G-2026-78`, `G-2026-79` (open), `specs/gaps.md`.
  `G-2026-80` and `G-2026-81` were reserved but not used.

## Manifest verification

`manifest.json` in this directory was recomputed independently with `manifestFor()` from
`scripts/lib/review-evidence.mjs` over the same root set `prepare-intake-evidence.mjs` uses for
`efmp-303`:

- 80 inputs recorded, 80 recomputed, **0 mismatches**, no extra or missing paths.
- `manifest_digest` `7888898df5da901f1daf58251556809aa8ce0c04f8412fb267445b99694a3805`
  reproduced from a fresh read from disk.
- `registers` (`specs/decisions/log.md`, `specs/gaps.md`) matched at read time.
- Worktree HEAD equals the manifest `commit`, and the tree was clean before any write.

## Criterion verdicts

| # | Criterion | Verdict | Locator | Disposition |
|---|---|---|---|---|
| 1 | identity | **pass** | guide `2nd 2026.txt:1171-1177`; Scheme `B.Ed 4 Year 2026 revised after board.txt:90,142-148`; `catalog/courses.json` `semesters[1].courses[3]` | approved, D-2026-0048.1 |
| 2 | partition | **escalated** | guide week table `:1215-1347`, no unit headings; spec `:77-78`, `:111`, `:176`, `:238`, `:300`, `:355`, `:414` | G-2026-77 |
| 3 | coverage | **pass** | 45 guide bullets `:1217-1341` against 45 checklist rows, paired 1:1 in order by script | approved, D-2026-0048.2 |
| 4 | outcomes | **pass**, one repair | objectives `:1193-1201`; spec `:23-27`, SLO refs per unit | approved, D-2026-0048.3; drop Unit 1's "and 5" trace |
| 5 | readings | **fail, escalated** | guide `:1349-1357`; spec `:4-11`, `:60-73` | G-2026-79 |
| 6 | blueprint | **pass** | spec unit blueprints; `style-guide.md` "Unit-end assessment bank" | approved, D-2026-0048.4 |
| 7 | structure | **pass** except `## Week schedule` | schema validation, script checks, gate exit codes below | approved, D-2026-0048.5; Week schedule under G-2026-78 |
| 8 | decision-residue | **fail, escalated** | `D-2026-0012` misapplied at spec `:77-87` | folded into G-2026-78 |

## Findings by criterion

### 1. identity: pass
Guide, revised Scheme and catalog agree on code, title, `3 (3-0)`, Semester 2 and Major:
Professional. The guide gives a bare total of 3; the Scheme gives the split. No conflict. No
EFMP-303 file in the superseded `.specify/Course_guides_and_Scheme/` set.

### 2. partition: escalated (G-2026-77)
The guide is a week table only (Weeks 1-16). The spec's merge (W1-2 / W3-5 / W6-8 / W9-10 /
W11-12 / W13-15 into Units 1-6) is contiguous, in guide order, splits no week and loses no bullet
(all verified). But the number of units and the boundaries are a judgement, and the spec's only
stated basis is "the task's unit plan", which is not a bound input. This matches the GNAS-301
(`G-2026-22`) and EFMP-301 (`G-2026-52`) precedents.

### 3. coverage: pass
Every Week 1-15 bullet appears exactly once with the correct week ref; no off-guide sub-topic.
Added words come from the guide's own week headings or are minimal glosses. Week 16 ("Course
review"; "Student presentations and discussions") is a non-teaching slot left unrouted; that is
recorded in G-2026-78.

### 4. outcomes: pass, with one guide-determined repair
The five objectives are transcribed faithfully. All 12 SLOs restate guide week headings (no
additions), and each objective is delivered by at least one unit. Unit 1's trace to objective 5
has no support in Weeks 1-2 and should be removed. Advisory: Unit 5's trace to objective 2 is weak.

### 5. readings: fail, escalated (G-2026-79)
Independent check (Open Library API, web search, HTTP probes, 2026-10-10):

- `nep2009`: a real work. Not retrievable here (itacec 401; planipolis bot challenge). The spec's
  locator `moe.gov.pk` serves an unrelated page ("MoFEPT Skills Courses - Cisco NetAcad Free
  Enrollment").
- `nep2017`: a real work. The ministry copy is filed as "Draft ... 2017". The spec's locator is a
  bare domain, and it did not connect from here.
- `unesco-epg`: does not resolve as printed. The bound `sources/` files bind this one key to two
  different IIEP pages.
- `andrabi-pak`: does not resolve.
- `khan2018`: does not resolve.

Units 1, 3 and 4 map only to entries that do not resolve. The spec's prose requires at least one
open-access source per unit, but its front matter declares `open_access_floor` as 0 throughout,
so `check:source-floor` passes without checking anything. Adopting a floor is the owner's act
(`D-2026-0013`, `D-2026-0021`).

### 6. blueprint: pass
The fixed 10/10/5 bank and Bloom bands match the style guide in all six units. Per-topic minimums
fit within the counts in every unit. The 60/40 default is correctly applied because the guide
gives no assessment criteria.

### 7. structure: pass (except `## Week schedule`)
Front matter is valid against the contract. Topic lists partition the checklists exactly. Depth
budgets match their tables. Figure plans meet Art. III.10 in every unit. There are no em dashes.

Gate exit codes:

| Gate | Exit | Note |
|---|---|---|
| `validate:content` | 0 | |
| `check:depth-gate` | 0 | |
| `check:no-em-dash` | 0 | |
| `check:no-answer-keys` | 0 | |
| `check:concept-graph` | 0 | |
| `check:docs-sync` | 0 | |
| `check:source-floor` | 0 | vacuous: floor declared 0 |
| `check:pipeline-gate` | 1 | 12 findings: `status: draft` and no `tasks.md`, x6 units; expected after the board's reversion |
| `check:figures` | 1 | 6 findings: schematics planned but not placed in the authored units (context) |
| `check:bloom-bands` | 1 | 4 findings: missing Bloom tags in the authored Unit 2 assessment (context) |
| `check:content-status` | 1 | `static/content-status.json` build artefact absent from the worktree (environment) |

No heavy job was run.

### 8. decision-residue: fail, escalated (inside G-2026-78)
`D-2026-0012`'s guide-silent pattern is applied to a guide that is not silent. "The guide carries
no week table" (`:77`) is false, and the 3/3/3/2/3/2 calendar (`:80-87` and the six "Weeks N-M"
lines) contradicts both the guide and the spec's own guide refs. The other confirmed decisions
(`D-2026-0001`, `0002`/`0004`, `0003`, `0005`) show no residue, apart from `D-2026-0001` being
invoked for works that may not exist; that is covered by G-2026-79.

## Context observations (authored units, not judged)

- The units were authored and the spec self-approved before any intake decision. The board
  reverted the approval at `2452929d`.
- `sources/unit-05.md` and `sources/texts/wb_hci.md` record an OpenAlex verification date of
  2024-06-15, which predates this project. G2/G3 should re-verify it.
- Every guide source in every unit's sources file is declared title-level only. If G-2026-79 is
  resolved with a floor, the authored units will need re-sourcing to meet it.

## Outcome

- **Approved (pending owner review):** identity, coverage, outcome traces (minus Unit 1's
  objective-5 trace), blueprint, and structure outside `## Week schedule`.
- **Escalated:** partition (G-2026-77); calendar, Week 16 routing and D-2026-0012 residue
  (G-2026-78); readings and floor (G-2026-79).
- **May the spec move to `status: approved` after owner confirmation?** Not on owner
  confirmation of D-2026-0048 alone. The owner must also resolve G-2026-77, G-2026-78 and
  G-2026-79. The author must then apply the repairs: correct the calendar, fix the policy
  locators and settle `unesco-epg`, declare the adopted floor, and drop Unit 1's objective-5
  trace. The changed sections then need re-evaluation against a fresh manifest. Setting the status
  remains the owner's act.
