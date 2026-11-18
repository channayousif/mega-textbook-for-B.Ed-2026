# EFPC-411 G0/G1 intake evaluation

- **Evaluator:** agent:evaluator (fresh session; did not draft this specification)
- **Date:** 2026-11-18
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (Constitution Article VII.8)
- **Specification:** `specs/content/efpc-411/content-spec.md` (255 lines, `status: draft`)
- **Bundle:** `specs/content/efpc-411/intake/manifest.json`, prepared at commit `7750c153`
- **Worktree:** `/home/a2ahs/crew-wt/sem4-intake-eval`, branch `content/sem4-intake-eval`, off
  `origin/main` at `fa80a282`
- **Outcome:** **partial.** Decision `D-2026-0090` (pending-owner-review) approves what the guide
  settles. Gaps `G-2026-211`, `G-2026-212`, `G-2026-214` and `G-2026-227` to `G-2026-229` escalate
  the rest. One author repair (Week 12 line references) is listed at the end.

## Manifest verification

Recomputed with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
`prepare-intake-evidence.mjs` root set, with `specs/content/efpc-411` as the course root:

- 56 bound inputs recorded, 56 recomputed, **0 mismatches**.
- `manifest_digest` recorded `f815db8e07144082c635576fb9230265aeb1051e6f85e4836de61d74e171d11e`;
  recomputed from the file and from the live tree: identical.
- Registers matched their recorded read-time digests (`ceb73bf9...`, `18ab3a6b...`).

Any change to a bound input voids `D-2026-0090`.

## Criteria

Guide: `Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt`, EFPC-411 block `:540-712`.
Scheme: `B.Ed 4 Year 2026 revised after board.txt` (cited as `Scheme:N`).

### 1. identity - code escalated (Article II.3, `G-2026-227`); no catalog entry (`G-2026-211`)

- Guide: "School Observation", `EFPC- 411`, `02 (0-2)`, Semester 4th (`:544-546`).
- Scheme: Semester IV row "6" (the Scheme's own numbering skips 5), `EFPC-4--`, "School
  Observation", `2 (0-2)`, "Major: Practical Course-I", All departments (`Scheme:357-367`).
- Title, credit hours and semester agree. **The Scheme gives no course number.** The spec adopts
  the guide's 411 because it is "the only number available" (`:12`, drafting note 1).
  - A blank in the authoritative document is not a guide-side slip that I may resolve.
  - The owner's rule that the Scheme is final authority (`gaps.md:9-24`) settles nothing when the
    Scheme is silent.
  - `G-2026-02` shows the owner decides such code questions case by case.
  - Escalated as `G-2026-227`. The licence blueprint's use of `EFPC-411` (`licence-blueprint.md:230`)
    is derived, not authoritative.
- No catalog entry exists. The `title_ur` "اسکول کا مشاہدہ" and the category "Major: Practical"
  are proposals (`:14`). Escalated in `G-2026-211`.

### 2. partition - escalated (`G-2026-228`)

- The guide names two blocks: "Task - 01: Introduction to The School and Classroom Context (four
  week seminars)" (`:558`, Weeks 1-4) and "UNIT # 02 School Placement Observation Plan (15 days
  Internship)" (`:587`, Weeks 5-8). Weeks 9-12 (`:618-691`) follow with no heading.
- The spec makes three units (`:68-72`). Units 1 and 2 follow the guide's two headings and are
  guide-determined.
- Unit 3 (Weeks 9-12) is the drafter's construction. Read literally, those weeks sit under
  "UNIT # 02" (drafting note 2).
- Because the unit count itself is not determined, the partition criterion is escalated as a
  whole, with Units 1 and 2 recorded as guide-anchored.
- Weeks 13-16 are not scheduled in the guide. The spec invents nothing for them and notes that
  the viva (`:711`) presumably falls there (drafting note 3).
- Topics are one per week, as in GUHQ-301. That was accepted for GUHQ-301 only, by approving that
  spec as drafted.

### 3. coverage - pass

Every guide schedule line (`:561-586`, `:590-616`, `:619-691`) is reached by a checklist row.
Rows merge consecutive guide lines into one sub-topic (U1-05 `:567-571`, U1-06 `:572-576`, U2-03
`:592-595`, U2-05 `:598-602`, U3-02 `:622-630` and so on). That fits this guide, whose lines are
sub-bullets of observation and portfolio tasks. No row introduces anything the guide lacks.

- **Author repair (guide-determined):** in Week 12, U3-08 cites `:676-683` and U3-09 cites
  `:678, 684-687`, so `:678` ("Write a Final Reflective Report") is cited twice. Meanwhile `:679`
  ("Prepare conclusion and learning summary") and the Week 12 evidence list `:688-691` are named
  in neither row's wording. Weeks 9-11 do name their evidence lists.

### 4. outcomes - pass

The six guide outcomes (`:551-556`) are reproduced verbatim, with the extraction's run-together
spacing restored (`content-spec.md:22-28`). Every SLO restates its unit's guide lines and names
its ancestors: Unit 1 outcomes 1, 3, 5 and 6; Units 2 and 3 likewise trace through their own task
lines. No SLO lacks an ancestor.

### 5. readings - escalated (`G-2026-212`, `G-2026-229`)

The guide's list (`:693-705`) is present and mostly resolvable:

| Entry | Verified |
|---|---|
| HEC 2013 Practicum I & II (`:693`), Methods (`:705`), EduPsy (`:704`), CurrDev (`:703`), Literacy (`:701`) | HEC PDFs HTTP 200 on 2026-11-18 |
| HEC 2013 Foundations (`:702`) | HTTP 200 (checked under EFMP-409) |
| HEC 2016 Reading practicum and Advanced practicum (`:694-695`) | no link given; not found in Open Library |
| McBurney-Fry 2002, "Thomson Social Science Press" (`:696`) | Open Library search: 0 results. The spec says it is cited elsewhere as 2005, Social Science Press; not re-verified here. |
| Richards & Lockhart 1994 (`:697`) | Open Library `OL15053472W`, confirmed |
| Harmer, Brown, Scrivener (`:698-700`) | well-known ELT texts; print |

- The spec leaves three guide entries unbound as matching no topic: HEC Foundations, HEC
  Literacy and the 2016 practicums (`:51-53`). It uses the four ELT texts only for their general
  chapters (drafting note 6). Both are drafter judgements about guide-listed material, so they
  are escalated in `G-2026-229` with the McBurney-Fry imprint.
- Author-selected: `teach-primary-2021` (World Bank PDF, HTTP 200). The floor and the row rest on
  `D-2026-0053` item 2 (`:39`), which is scoped to Semester 2 (`G-2026-212`). The guide's HEC PDFs
  are themselves open, so the floor would hold in every unit on guide-listed sources alone
  (Units 1-3 each map `hec-2013-practicum`).

### 6. blueprint - pass except the four-topic formative lines

- **Weighting is guide-determined and correctly applied.** The guide sets seminars 20, placement
  40, portfolio 20 and viva 20 (`:707-712`). The spec replaces the 60/40 default with it (`:30`)
  and confines the unit banks to the 20 seminar marks. **Approved.**
- Each unit has four topics and states "formative 12 items, 3 per topic" (`:81` and Units 2-3),
  extending `D-2026-0072`. Escalated in `G-2026-214`.
- Summatives are Analyze (Units 1, 2) and Create (Unit 3). Banks are 10/10/5. ">= 2 per topic" over
  4 topics fits. The ERQ spread sums within 5.
- 2 figures per topic, with a flowchart or concept-map in every unit.
- Keeping the 10/10/5 bank in a practicum (drafting note 4) is what the style guide requires.

### 7. structure - pass

- All 14 `CONTENT_GATES` exit 0 (tree-wide run on 2026-11-18; see
  `specs/content/gcce-400/intake/evaluation.md`, criterion 7).
- Front matter validates.
- Partitions, topic cells, depth counts and per-unit blocks replay clean.
- Figure IDs are unique and contiguous.

### 8. decision-residue - not approved (escalated)

| Entry | Status in the spec | Verdict |
|---|---|---|
| `D-2026-0070` item 1 | Followed for the two headed blocks; a third unit added; weeks as topics | Escalated, `G-2026-228` |
| `D-2026-0072` | Extended to three four-topic units | Escalated, `G-2026-214` |
| `D-2026-0053` item 2 | Relied on in Semester 4 | Escalated, `G-2026-212` |
| `D-2026-0001`, `D-2026-0003`, `D-2026-0012`, `D-2026-0081` | No superseded design present. The privacy rule (drafting note 7) is compatible with `D-2026-0081`. | No residue |

## Blocked until the owner rules

| Gap | What it blocks |
|---|---|
| `G-2026-211` | the catalog entry |
| `G-2026-212` | the Author-selected row and `open_access_floor` as a binding floor |
| `G-2026-214` | the formative lines of Units 1-3 |
| `G-2026-227` | the course code, and with it the catalog entry and `docs/semester-4/efpc-411/` path |
| `G-2026-228` | Unit 3's existence, every topic list and Weeks 13-16 |
| `G-2026-229` | the Guide-listed table and the readings criterion |

**Author repair, with no owner ruling needed:** correct the Week 12 references so `:678` is cited
once, and name `:679` and `:688-691` in a row.
