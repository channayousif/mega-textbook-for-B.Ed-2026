# GUHQ-301 G0/G1 intake evaluation

- **Evaluator:** agent:evaluator (fresh session; did not draft this specification)
- **Date:** 2026-10-31
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (Constitution Article VII.8)
- **Specification:** `specs/content/guhq-301/content-spec.md` (413 lines, `status: draft`)
- **Bundle:** `specs/content/guhq-301/intake/manifest.json`, prepared at commit `815d59fd`
- **Worktree:** `/home/a2ahs/wt-sem3-intake`, branch `content/sem3-content-specs`, HEAD `d7aabb98`
  (that commit adds only the six intake `manifest.json` files on top of `815d59fd`)
- **Outcome:** **partial.** Decision `D-2026-0080` (pending-owner-review) approves what the guide
  settles; gaps `G-2026-205` to `G-2026-209` escalate what it does not. The spec cannot move to
  `status: approved` until those gaps are ruled and the one author repair below is made.

## Manifest verification

Recomputed with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
`prepare-intake-evidence.mjs` root set (`specs/content/guhq-301`, `contracts`,
`catalog/courses.json`, `specs/content/style-guide.md`, `specs/content/terminology.csv`,
`.specify/memory/constitution.md`, `Scheme-and-Course-guides`, `.specify/Course_guides_and_Scheme`,
`.claude/skills/evaluate-intake`, `.claude/agents/evaluator.md`):

- 55 bound inputs recorded, 55 recomputed, **0 mismatches**.
- `manifest_digest` recorded `a8e5ba491740d3e89c23d4dc8080f0178047f6634607dd08f88c000ce1d15896`;
  recomputed from the file and from the live tree: identical.
- Registers (`specs/decisions/log.md`, `specs/gaps.md`) match their recorded read-time digests.

Every verdict below rests on that digest. Any change to a bound input voids `D-2026-0080`.

## Criteria

### 1. identity - pass on the values; the catalog entry does not exist (escalated, `G-2026-205`)

- Guide block: title "Understanding of Holy Quran I", code `GUHQ- 401`, credit hours `03 (0-1)`,
  semester `2nd` (`3rd 2026.txt:123-125`); the description calls it "Understanding of Quranic
  Arabic" (`:127`).
- Scheme (authoritative, `gaps.md:9-24`): `GUHQ – 301`, "Fehm-e-Quran – I", `1 (0-1)`, General
  Education, Semester III row 7 (`B.Ed 4 Year 2026 revised after board.txt:281-289`).
- **These conflicts are already adjudicated.** `G-2026-04` (resolved, `gaps.md:62-65`) decides
  "**GUHQ-301 Fehm-e-Quran I, Semester III, 1 (0-1)**" and names the guide's `GUHQ-401` a
  guide-side slip. The ruling states the credit value explicitly, and the guide's own `03` is
  inconsistent with its own `(0-1)` split. The decision binds; it is not re-opened here.
- The spec's proposed entry (`content-spec.md:14`): code `GUHQ-301`, `title_en` "Fehm-e-Quran - I",
  `credit_hours` "1 (0-1)", category "General Education", Semester 3. It matches `G-2026-04` and the
  Scheme row on every field the Scheme gives.
- **The catalog entry itself does not exist.** `catalog/courses.json` has an empty Semester 3
  course list. The criterion as written checks the catalog, so it cannot pass in full. Adding the
  entry re-opens every G2/G3 manifest that binds the catalog, and the owner has not ruled on that.
  `title_ur` "فہمِ قرآن - I" appears in neither the guide nor the Scheme. Escalated as `G-2026-205`.
- Finding for the author: drafting note 1 (`:407`) and the "Identity conflicts" paragraph (`:12`)
  present the identity as an open Article II.3 question. It is not open: cite `G-2026-04`.

### 2. partition - pass at unit level; topic partition escalated (`G-2026-206`)

- The guide numbers seven units (`:135`, `:146`, `:165`, `:175`, `:190`, `:201`, `:208`) with week
  ranges 1-2, 3-6, 7-8, 9-11, 12-13, 14, 15-16. The spec's seven units and its `## Week schedule`
  (`:61-69`) follow them in order, as `D-2026-0070` item 1 requires. **Approved.**
- **Within-guide slip, resolved:** guide Unit 07 repeats Unit 06's heading, "Historical and
  Cultural Context of the Quran" (`:201`, `:208`), but its items are integrated practice,
  revision, assessment and reflection (`:211-217`). No second document conflicts. The spec's
  heading "Integrated Practice and Application" uses the unit's own item wording: 7.1 "Integrated
  practice" (`:211`) and 7.6 "practical application" (`:217`). Resolved under `D-2026-0080`; the
  owner may substitute a different heading.
- **Topic partition: not guide-determined. Escalated.** `D-2026-0070` item 1 (confirmed, scope
  "every course") says that where a guide names units, "each topic is one of that chapter's numbered
  sections (Topic N.k teaches guide section N.k)". The spec instead makes each guide **week** a
  topic (`:59`, `:61-69`, drafting notes 4-5 `:410-411`). Applying the ruling literally is not
  possible here either. Guide numbering is partial:
  - Unit 1 Week 1 (`:138-140`) is unnumbered, while Week 2 starts at 1.4.
  - Unit 2 Weeks 5-6 (`:158-164`) and Unit 3 Week 8 (`:172-174`) are unnumbered.
  - Unit 4 (`:178-189`) is wholly unnumbered.
  - The numbered items are one-line points.

  A literal reading would give units of 6, 12, 6, 9, 6, 4 and 4-6 topics. Whether the ruling
  reaches one-line items in a week-divided guide is a scope judgement about an owner ruling, so I
  do not decide it. The week-as-topic design is also not uniform: Topic 7.1 spans Weeks 15-16
  (`:69`), although the column says "one per week".

### 3. coverage - pass

Each guide schedule item appears exactly once in a checklist. I replayed this with the gate's own
parsers (`unitSectionLines`, `tableAfterHeading`, `parsePipeTable`) and checked it by hand against
the guide text:

| Unit | Guide lines | Rows | Notes |
|---|---|---|---|
| 1 | `:138-140`, `:143-145` | U1-01..06 | |
| 2 | `:149-151`, `:154-156`, `:158-160`, `:162-164` | U2-01..12 | |
| 3 | `:168-170`, `:172-174` | U3-01..06 | |
| 4 | `:178-180`, `:182-184`, `:187-189` | U4-01..09 | |
| 5 | `:193-195`, `:197-199` | U5-01..06 | |
| 6 | `:204-207` | U6-01..04 | |
| 7 | `:211-213`, `:217` | U7-01..04 | 7.4 and 7.5 excluded, see below |

That is 47 rows. Wording is faithful, with only typographic normalisation (for example
"masculine/feminine" becomes "masculine and feminine", and "Makkan and Madinan" becomes "Makki and
Madani"). The spec adds no sub-topic the guide lacks.

- Guide items 7.4 "Revision of entire course" and 7.5 "Final assessment / presentation"
  (`:215-216`) have no checklist row. Their own wording names a course activity and an assessment
  event, not a concept. That matches the treatment of EFMP-303's "Review and Final Assessment" week
  as course review (`D-2026-0059`, `D-2026-0063`). The exclusion is approved.
- Recommendation: give 7.4 and 7.5 a home, as EFMP-303 did, by routing them to a
  `## Course review plan`. Unit 7's Create-level presentation task (`:368`) already echoes 7.5.
- Observation, not a defect: the course description names "noun declension" (`:127`), but no
  schedule item does. Coverage is judged against the schedule, so this is information for the
  author.

### 4. outcomes - pass

The guide's four outcomes (`:130-133`) are reproduced verbatim (`content-spec.md:18-22`). Every SLO
traces to a guide outcome, and its wording restates that unit's own guide items:

| SLO | Traces to |
|---|---|
| 1-1, 1-2 | outcome 1 |
| 2-1, 2-2 | outcome 2 |
| 3-1, 3-2 | outcomes 2 and 3 (syntax is grammar; "Syntax-based comprehension exercises" `:174` is reading) |
| 4-1, 4-2 | outcome 3 |
| 5-1, 5-2 | outcome 4 |
| 6-1 | outcome 4, through "Impact of context on interpretation" (`:207`), and the description's historical-context sentence (`:127`) |
| 7-1 | outcomes 1-4 |

No SLO lacks a guide ancestor.

### 5. readings - escalated (`G-2026-208`, `G-2026-209`)

**The guide list is present but resolves to no single work.** The guide prints six lines
(`:219-224`):

| Line | Entry | Problem |
|---|---|---|
| `:219` | "MuallimUl Quran (Vol 3) & related volumes" | no author, year or publisher |
| `:220` | "Fehmul Quran Urdu translations and commentaries (various authors/editions)" | a category, not a work |
| `:221` | "Books on Asbāb al-Nuzūl ... and Seerah texts" | a category, not a work |
| `:222` | "Rahman, U. (2025). Muallimul Quran (Vols. 3-5). [Course Book]." | author and year only; no publisher |
| `:223` | "TafseerTalim-ul-Quran (2 Vols.). Maktaba-tul-Madinah" | no author, edition or year |
| `:224` | "Mafhoom-al-Quran (2nd ed.)" | no author |

- The spec merges `:219` and `:222` into one key, `muallim-ul-quran` (`:42`), "pending the
  owner's confirmation". That merge is a drafter judgement the guide does not make.
- The spec leaves `mafhoom-al-quran` bound to no unit (`Units` "-", `:46`).
- The spec reports Open Library searches with no match. That claim was not re-run here, because
  verification was limited to Crossref and OpenAlex. The conclusion does not depend on it: the
  printed entries themselves do not identify a work and edition.
- All six are print-only. Under `D-2026-0001` they support title-level citation only.

This criterion cannot pass while no guide entry resolves. It is escalated as `G-2026-208`.

**Author-selected open-access rows: verified.**

| Key | Verified as |
|---|---|
| `dukes-2010-treebank` | Crossref resolves DOI `10.63317/5ca39mfekwbt` to "Syntactic Annotation Guidelines for the Quranic Arabic Dependency Treebank", Dukes, Atwell and Sharaf, LREC 2010, ELRA. OpenAlex `W48549471` is OA, with an oa_url for the LREC PDF the spec cites. |
| `kadir-2022-asbab` | Crossref resolves DOI `10.6007/ijarbss/v12-i6/13322` to "The Rules of Interpretation: Review on Asbab Al-Nuzul in Tafsir Al-Mishbah", Abdul Kadir et al., IJARBSS 12(6), 2022. OpenAlex `W4283369090` is diamond OA. |
| `quran-translation`, `quranic-arabic-corpus` | The HTTP 200 checks the spec reports were not re-run here. These are primary-text and reference tools, not scholarship. |

Every unit maps at least one OA row. The `Units` column and each unit's `**Mapped readings**` line
agree. Units 1, 4 and 7 have no scholarly OA source, only Quran.com and the Leeds corpus.

**The basis for authoring against author-selected sources is outside its scope.** The spec rests
its OA floor and its author-selected rows on `D-2026-0053` item 2 (`:34`). That ruling is scoped to
"Semester 2 courses" (`log.md:2541-2543`). GUHQ-301 is Semester 3. Extending an owner ruling is
not an evaluator decision. Escalated as `G-2026-209`.

### 6. blueprint - pass except Unit 2 (summative fails; formative count escalated, `G-2026-207`)

**Internally consistent and conformant with `style-guide.md` for Units 1, 3, 4, 5, 6 and 7:**

- Unit-end banks are 10/10/5 with the guide's Bloom bands (`style-guide.md:247-250`).
- MCQ and RRQ ">= 2 per topic" fits within 10 for every topic count.
- Every ERQ distribution sums to 5: 2+2+1, 1+1+1+2, or all on one topic with >= 1 integrative.
- The formative "5-8" lines for one- and two-topic units admit the per-topic floor of 3
  (`:237`). Unit 4's "9 items, 3 per topic" applies `D-2026-0072`.
- Each topic plans 2-3 figures, and each unit has a concept-map, flowchart or timeline
  (`style-guide.md:513-514`).
- Topic reading-minute ranges sit inside each unit's `**Depth budget**` band.
- Every per-unit summative names an Analyze-or-higher item: Analyze in Units 1, 3, 4 and 6,
  Evaluate in Unit 5, Create in Unit 7.

**Unit 2 summative: fail (author repair, guide-independent).** `content-spec.md:124` specifies
"one **Apply**-or-higher item". `style-guide.md:228` (and Art. III.3, `:301`) requires at least one
Analyze-or-higher summative item. The floor is set below the standard, so it is a defect now.

**Unit 2 formative: escalated.** "Formative 12 items, 3 per topic" (`:124`) is internally
consistent with the per-topic floor. But it exceeds `style-guide.md:227` "5-8", and
`D-2026-0072` "does not rule on units with four or more topics" (`log.md:3921-3922`). Its
resolution also depends on `G-2026-206`.

### 7. structure - pass

**Deterministic checks.** Run serially as
`flock /tmp/mega-book-heavy.lock npm run -s <check>` from the worktree:

| Check | Exit | Note |
|---|---|---|
| `validate:content` | 0 | |
| `check:depth-gate` | 0 | |
| `check:figures` | 0 | |
| `check:concept-graph` | 0 | |
| `check:bloom-bands` | 0 | |
| `check:no-em-dash` | 0 | |
| `check:docs-sync` | 0 | |
| `check:source-floor` | 0 | |
| `check:pipeline-gate` | 0 | |
| `check:no-answer-keys` | **1** | The only finding is `specs/content/efpg-401/content-spec.md` "Marking rubric". That is another course, outside this bundle; GUHQ-301 has no finding. |

Every gate that walks `docs/` is vacuous for GUHQ-301, because no unit is authored.

**Spec-side invariants, replayed directly:**

- Front matter `{course_code: GUHQ-301, status: draft, open_access_floor: {default: 1}}`
  validates against `contracts/content-spec-frontmatter.schema.json` (ajv 2020).
- For all seven units, the `### Topic list` `Sub-topic IDs` form a total, disjoint partition of
  the checklist.
- Every checklist `Topic` cell equals its topic-list row.
- Every `**Depth budget**` sub-topic and topic count matches its tables.
- Every per-unit block is present: CLO/SLO refs, Key terms, Topics, Assessment blueprint,
  checklist, topic list, Depth budget, Prerequisite knowledge, Common misconceptions, Mapped
  readings, Figure plan and Unit-end assessment blueprint.
- Figure IDs are unique and contiguous.
- The reading-list labels "Guide-listed" and "Author-selected (open access)" follow the approved
  GPKS-402 precedent and `D-2026-0053` item 2's labelling.

**Recommendations, not defects against a bound contract** (as in `D-2026-0043`(d)). The
unbound `specs/007` and `specs/008` contracts also name these items, and the bound style guide
requires none of them:

- `**Worked-examples plan**` and `**International best-practice notes**` lines are absent from
  every unit.
- `## Course review plan` is absent.
- The Guide-listed table has no `DOI/URL` column.

### 8. decision-residue - not approved (escalated, `G-2026-206`, `G-2026-207`, `G-2026-209`)

Confirmed entries whose scope touches this course, searched across the whole specification:

| Entry | Status in the spec | Verdict |
|---|---|---|
| `G-2026-04` (resolved identity) | Applied: no `GUHQ-401`, `03` or `2nd` value is used as the course's own anywhere. The spec does not cite the ruling. | No residue |
| `D-2026-0070` item 1 (every course) | Followed at unit level. Departed from at topic level throughout the `## Week schedule`, every `**Topics**` line and every `### Topic list`. | Escalated, `G-2026-206` |
| `D-2026-0072` (corpus-wide) | Applied to Unit 4. Extended by the drafter to Unit 2 (`:124`), outside its stated limit. | Escalated, `G-2026-207` |
| `D-2026-0053` item 2 (Semester 2) | Relied on for a Semester 3 course (`:34`). | Escalated, `G-2026-209` |
| `D-2026-0001`, `D-2026-0003`, `D-2026-0012` | `D-2026-0001` is cited for title-level guide entries. `D-2026-0003` has no GUHQ file in the superseded folder. `D-2026-0012` is not needed, because the guide gives a week table. | No residue |

`D-2026-0070` item 3 (guide PDF on the intro page) is a site matter, not a spec matter.

## Out of scope, noted only

Drafting note 7 (`:413`) asks that a qualified scholar review interpretation (Units 5-6) at G3.
Reviewer qualification is not delegated to this evaluator, so I make no ruling on it.

## Blocked until the owner rules

| Gap | What it blocks |
|---|---|
| `G-2026-205` | the catalog entry, and with it any authored unit |
| `G-2026-206` | the topic partition, the `### Topic list` and the `## Week schedule` topic column of Units 1-7; with them every per-topic figure plan, reading-minute band and the bank's per-topic distribution |
| `G-2026-207` | the Unit 2 formative line |
| `G-2026-208`, `G-2026-209` | the `## Reading list`, and the readings criterion for every unit |

Author repair, with no owner ruling needed: the Unit 2 summative line must name an
Analyze-or-higher item.
