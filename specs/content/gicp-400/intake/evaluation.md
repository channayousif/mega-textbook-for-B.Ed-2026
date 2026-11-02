# GICP-400 intake evaluation (G0 intake / G1 unit-spec)

- **Evaluator:** agent:evaluator, 2026-10-31. Fresh session; did not draft this spec.
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (Constitution Art. VII.8).
- **Spec under evaluation:** `specs/content/gicp-400/content-spec.md` (`status: draft`), 413 lines.
- **Bundle:** `specs/content/gicp-400/intake/manifest.json`, prepared at commit `815d59fd`.
- **Recording mode for this run:** the parent appends the register entries. This evaluator did not
  edit `specs/decisions/log.md` or `specs/gaps.md`; the exact entries are in
  `specs/content/gicp-400/intake/register-entries.md` (decision `D-2026-0078`, gaps
  `G-2026-185` to `G-2026-189`).

Spec locators below are file line numbers of `content-spec.md`. Guide locators are lines of
`Scheme-and-Course-guides/extracted-text/3rd 2026.txt` (written `guide:NNN`). Scheme locators
are lines of `Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt`
(written `scheme:NNN`).

## 0. Manifest verification

Recomputed with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the ten intake roots
that `scripts/prepare-intake-evidence.mjs` binds (`intakeRoots('gicp-400')`):

- 55 inputs recomputed, 55 in the bundle, **0 digest mismatches**, no path added or missing.
- `manifest_digest` reproduced: `5dea74c64cc3680f3a3b0f4029afd0a2592d4417fa170061c83f7f40ee3c6e53`.
- Registers at read time match the bundle: `specs/decisions/log.md` `e9598a98...`,
  `specs/gaps.md` `383dcc3b...`.
- `git diff --stat 815d59fd HEAD` over the spec, catalog, guides and style guide shows only the
  bundle's own `manifest.json` added (commit `d7aabb98`). The bundle describes the tree judged.

The bundle is genuine; judging proceeds.

## 1. identity - values pass; catalog record absent (escalated)

| Field | Guide | Revised Scheme (authority) | Spec's proposed entry (`:10`, `:12`) |
|---|---|---|---|
| Code | `GICP - 400` (`guide:573`) | `GICP -400` (`scheme:234`) | `GICP-400` |
| Title | Ideology and Constitution of Pakistan (`guide:574`) | same (`scheme:236`) | same |
| Credit hours | `2` (`guide:573`) | `2 (2-0)` (`scheme:238`) | `2 (2-0)` |
| Semester | `3RD` (`guide:574`) | Semester III (`scheme:190`) | Semester 3 |
| Category | not stated | General Education (`scheme:240`) | General Education |

The code differs only in spacing. The guide's bare `2` is less specific than the Scheme's
`2 (2-0)` but does not contradict it, so no Article II.3 conflict arises. The superseded board
Scheme agrees (`B.Ed 4 Year board.txt:123-127`). `specs/gaps.md` holds no prior adjudication for
this course; its banner names the revised Scheme as the final authority.

**The catalog entry does not exist.** `catalog/courses.json` has an empty Semester 3 group and no
`GICP-400` entry. The criterion as written compares the catalog to the guide and Scheme. It was
judged against the spec's proposed entry instead, as instructed. The code, title, credit hours,
semester and category of that entry are guide- and Scheme-determined and are **approved**. Whether
and when the entry is added is the owner's call: every G2/G3 manifest binds the catalog whole.
The Urdu title `نظریہ اور آئینِ پاکستان` is not guide-given. That is escalated as **G-2026-185**
and not approved here.

## 2. partition - escalated (G-2026-186)

The guide gives a 16-week table with week titles and **no unit or chapter headings**
(`guide:583-646`). The spec groups Weeks 1-15 into seven units (`:61-74`):

| Unit | Weeks | Teaching weeks | Topics |
|---|---|---|---|
| 1 | 1-2 | 2 | 2 |
| 2 | 3-4 | 2 | 2 |
| 3 | 5-6 | 2 | 2 |
| 4 | 7-9 | 3 | 3 |
| 5 | 10-12 | 3 | 3 |
| 6 | 13-14 | 2 | 2 |
| 7 | 15 | 1 | 1 |
| - | 16 | review and final assessment | - |

Verified mechanically: the blocks are contiguous, no guide week is reordered or split, every
week is exactly one topic and keeps its guide title, and each unit's "Weeks N-M" line
(`:78`, `:124`, `:170`, `:216`, `:267`, `:319`, `:365`) agrees with the schedule table and with
the checklists' `Guide ref` cells.

The guide does **not** determine the number of units (seven), the block boundaries, or the
single-week Unit 7. The spec cites `D-2026-0053` item 1 and `D-2026-0070` item 1 (`:63`).
`D-2026-0053` is scoped to six named Semester 2 courses and confirms their specific groupings,
so it does not reach GICP-400. `D-2026-0070` item 1 *permits* grouping where a guide gives only
weeks, but it does not choose the grouping. Drafting note 1 (`:408`) says the same. This is the
case the skill names: record the proposed partition and escalate.

## 3. coverage - pass

Guide bullet to checklist row, by line:

- The 44 teaching bullets in Weeks 1-15 (`guide:586-643`) each appear in **exactly one**
  checklist row, with the correct week and line reference. Week headings are not counted.
- No row cites a non-bullet line, and no row introduces a sub-topic the guide lacks (44 rows,
  44 bullets).
- Every checklist `Topic` cell matches the `### Topic list` assignment. The Topic list
  `Sub-topic IDs` form a total, disjoint partition in all seven units.
- Week 16's "Course review" and "Student presentations and discussions" (`guide:644-646`) are
  review activities, not teaching sub-topics, and are rightly left off the checklists. This
  matches the GPKS-402 treatment approved under `D-2026-0074`. The course-review question that
  `D-2026-0052` left open is not settled here.

Drafting-note claims tested:

- Note 2 (`:409`), the Week 9 overlap. Week 9's two bullets (`guide:617-619`) do restate ground
  from Weeks 5-8. The guide gives them as a separate week, though, so keeping them as Topic 4.3
  is guide-determined. The look-back framing is an authoring choice for G3.
- Glosses checked against the guide:
  - U3-02 adds "as adapted" (`:182`; `guide:603`). This is a faithful gloss.
  - U3-06 reads the Week 6 "Comparative overview" (`guide:608`) as 1956 against 1962 (`:186`).
    The guide does not name the comparator. Comparing with 1956 is the natural reading under a
    1962 week that follows a 1956 week, but this decision does not settle it. G3 may treat a
    wider comparison as in scope.

## 4. outcomes - pass (traces); objective 4 completeness escalated (G-2026-189)

The guide's five Course Objectives (`guide:577-582`) are reproduced verbatim (`:18-23`). Each
of the 13 SLOs names its guide objective, and each claim holds against the guide week it
covers:

| SLO | Spec line | Covers guide weeks | Objective(s) | Holds |
|---|---|---|---|---|
| 1-1, 1-2 | `:80` | 1-2 | 1 | yes |
| 2-1, 2-2 | `:126` | 3-4 | 1 | yes |
| 3-1, 3-2 | `:172` | 5-6 | 2 | yes |
| 4-1, 4-2 | `:218` | 7-9 | 2, 3 | yes |
| 5-1, 5-2 | `:269` | 10-12 | 3, 4 | yes |
| 6-1, 6-2 | `:321` | 13-14 | 2, 3 | yes |
| 7-1 | `:367` | 15 | 5 | yes |

No SLO lacks a guide ancestor, so there are no additions.

**Within-guide inconsistency, escalated.** Objective 4 (`guide:581`) and the Course Description
(`guide:576`) both name the "duties of citizens". No week in the breakdown names duties
(`guide:585-646`), and the spec teaches none: "duties" occurs only in the reproduced objective,
`:22`, and in a figure about *state* duties, `:310`. Adding a duties sub-topic would be an
addition the weekly breakdown does not give. The permission in `D-2026-0053` item 4 to derive
sub-topics from outcomes is scoped to Semester 2. Whether to add one is the owner's question.
This decision approves the SLO traces only. It does not say the SLO set delivers objective 4 in
full.

## 5. readings - fail / escalated (G-2026-187, G-2026-188, plus two author repairs)

**Presence.** The guide has a reading list (`guide:647-651`), and all four entries are in the
spec's `### Guide-required` table (`:37-44`).

**Resolution of the guide entries:**

| Guide entry | Spec row | Result |
|---|---|---|
| Constitution of the Islamic Republic of Pakistan (1973) (`guide:648`) | `pak-constitution-1973` `:41` | Real work, open access. The bound `na.gov.pk` PDF returned no response from this host on 2026-10-31 (`na.gov.pk/` root also unreachable), and that text is amended only to 2012. |
| Hamid Khan, *Constitutional and Political History of Pakistan* (`:649`) | `hamid-khan-const` `:42` | Resolves. ISBN 9780199407828 is OUP, Open Library work OL5862007W; the edition record shows 2020 with no edition statement against the spec's "3rd ed." Print, title-level under `D-2026-0001`. |
| Ishtiaq Husain Qureshi, *The Pakistan Movement* (`:650`) | `qureshi-struggle` `:43` | **Does not resolve as printed.** Open Library lists 36 works by Qureshi, none with that title; a title-plus-author search returns 0. *The Struggle for Pakistan* (1965, OL11551W) is plausible, but *A Nation Born of Sacrifice* (1976) and *Pakistan* (1950) also exist. Choosing which work the guide means is not guide-determined: **G-2026-187.** |
| Iqbal, *Reconstruction of Religious Thought in Islam* (`:651`) | `iqbal-reconstruction` `:44` | Resolves. ISBN 9780804786867 is Stanford UP 2013, OL20369735W. Title-level. |

**Author-selected rows (`:46-59`).** All seven DOIs resolve on Crossref with matching author,
title, journal and volume/issue. All seven are open access on OpenAlex:

- five diamond OA, each with the W-ID the spec states (W3034006569, W3106934127, W4390528283,
  W7168299306, W4386227995);
- W2127299016 hybrid;
- W2063556125 gold.

The licences checked agree with the spec: Al-Qamar and Policy Perspectives CC BY 4.0,
Education Sciences CC BY 3.0. `goi-act-1935` returns HTTP 200 on legislation.gov.uk. The JHSS
publisher is "University of Karachi" per Crossref, as stated.

**Authority for the author-selected list and the floor, escalated: G-2026-188.** The spec binds
these rows and its `open_access_floor: {default: 1}` front matter under `D-2026-0053` item 2
(`:36`, `:48`). That ruling's Scope is the six Semester 2 courses. Applying it to a Semester 3
course is an extension the owner has not made, so this evaluator does not make it.

**Author repairs (guide-determined; not owner questions):**

1. **Units column against Mapped readings.** `pak-constitution-1973` is tagged to Unit 3
   (`:41`), but Unit 3's Mapped readings (`:201`) omit it. This is the only mismatch among the
   12 keys and 7 units. Either add it to `:201` or drop 3 from `:41`.
2. **U6-05 has no source for the 25th Amendment.** Guide Week 14 names the 18th, 19th and 25th
   Amendments (`guide:638`; spec `:334`). Unit 6 maps `hussain-kokab-2012-18th`,
   `pak-constitution-1973` and `hamid-khan-const` (`:350`). The Constitution text is amended to
   2012, and the other two predate 2018. The spec says Unit 6 "must cite that amendment from its
   own Act or a later consolidated text" (`:41`) but binds neither. The guide names both the
   Constitution and the 25th Amendment, so binding an official post-2018 text is determined by
   the guide. Bind the Constitution (Twenty-fifth Amendment) Act, 2018, or a current official
   consolidated text, with a URL reachable from this host.

**Open-access coverage per unit:** U1, U2 `hassan`; U2 `khan-khan`, `akhter`; U3 `shah`,
`abbas`, `goi-act-1935`; U4 `abbas`; U5, U6 `hussain-kokab`; U7 `kennedy`. A floor of 1 per unit
would be met if G-2026-188 adopts it. `check:source-floor` is vacuous here because no
`sources/unit-NN.md` exists yet.

## 6. blueprint - pass

- **Bloom bands** match `style-guide.md:247-250` in every unit: MCQs Remember to Apply, RRQs
  Understand to Analyze, ERQs Analyze to Evaluate/Create. The counts are 10/10/5 per unit.
- **ERQ per-topic arithmetic** totals 5 in every unit:
  - two-topic Units 1, 2, 3 and 6: 2 per topic + 1 integrative;
  - three-topic Units 4 and 5: 1 per topic + 2 integrative;
  - one-topic Unit 7: all 5 on the one topic.
- **MCQ and RRQ floors** of ">= 2 per topic" are satisfiable within 10 in every unit (at most
  6 needed).
- **Formative counts:**
  - two-topic units say "5-8". The per-topic floor (>= 3 under each topic's
    `## Check your understanding`, `style-guide.md:236-237`) gives >= 6, which is inside 5-8;
  - three-topic Units 4 and 5 say "9 items, 3 per topic" under confirmed `D-2026-0072`
    (`:221`, `:272`);
  - Unit 7 needs >= 3 and says 5-8, which is consistent.
- **Summative tasks.** Each unit names one Analyze-or-higher task (`style-guide.md:228`). The
  levels are Analyze for Units 1, 2, 3 and 5; Evaluate for Units 4 and 6; Create for Unit 7.
- **Weighting.** 60/40 is the Constitution Art. III.7 default, and the guide gives no
  assessment section (`guide:564-651`), so applying the default (`:25`) is correct.
- **Depth bands.** Every unit band contains its summed topic reading-minutes with room for
  `index.mdx` and `unit-assessment.mdx`:
  - 2 x 12-17 against 40-55;
  - 3 x 12-17 against 55-75;
  - 18-26 against 25-40.
- **Figures.** Every topic plans >= 2 figures, and every unit plans >= 1 concept-map,
  flowchart or timeline (`style-guide.md:513-514`).

No floor the spec sets is breached by its own items.

Advisory, for G3: Unit 1's summative item says "explain how" (`:83`) while claiming Analyze.
The authored task must actually demand analysis.

## 7. structure - pass

**Front matter.** It validates against `contracts/content-spec-frontmatter.schema.json` with
Ajv 2020 (valid: `course_code` GICP-400, `status` draft; the `open_access_floor` mapping form
is allowed by `additionalProperties`).

**Required sections** of the content-spec-v2 contract
(`specs/007-content-depth-standard/contracts/content-spec-v2.md`; not a bound input, read for
reference) are all present:

- `## Course-wide items`, `## Course Description`, `## Reading list` with guide and supplement
  tables, and `## Week schedule`, labelled derived per `D-2026-0012`;
- per unit: `### Sub-topic checklist`, `### Topic list`, `**Depth budget**` (parses 40-55,
  40-55, 40-55, 55-75, 55-75, 40-55, 25-40 with the gate's regex), prerequisites,
  misconceptions, Mapped readings, Figure plan and Unit-end assessment blueprint.

The absent `**Worked-examples plan**` and `**International best-practice notes**` lines are
also absent from the approved GPKS-402 spec (`D-2026-0074` structure approved), so the
precedent treats them as optional. `## Standards & frameworks anchors` is present-only-where-
engaged.

**Deterministic checks**, run under `flock /tmp/mega-book-heavy.lock` at `d7aabb98`:

| Check | Exit | Note |
|---|---|---|
| validate:content | 0 | |
| check:pipeline-gate | 0 | |
| check:depth-gate | 0 | vacuous for GICP-400: `docs/semester-3/gicp-400/` does not exist |
| check:figures | 0 | vacuous, as above |
| check:no-em-dash | 0 | covers `specs/content/` |
| check:no-answer-keys | **1** | sole finding `specs/content/efpg-401/content-spec.md` ("Marking rubric"); another course, not GICP-400 |
| check:concept-graph | 0 | |
| check:bloom-bands | 0 | |
| check:source-floor | 0 | vacuous for GICP-400 (no sources files) |
| check:map-sources | 0 | |
| check:docs-sync | 0 | |

## 8. decision-residue - pass (no superseded design); D-2026-0053 extension escalated

These confirmed rulings touch this course: corpus-wide `D-2026-0001`, `D-2026-0003`,
`D-2026-0005`, `D-2026-0012`, `D-2026-0068`, `D-2026-0070` (every course) and `D-2026-0072`;
the gaps-register banner ruling that the revised Scheme is final; and `D-2026-0014`, whose
publication authorisation excludes Semester 3. The whole spec was searched, not only the
sections each ruling names:

- No `.specify/Course_guides_and_Scheme` guide is used (`D-2026-0003`). Identity rests on the
  revised Scheme, not the superseded board Scheme.
- `## Week schedule` labels the grouping as the drafter's construction (`:63`), as
  `D-2026-0012` requires.
- No three-topic unit keeps "formative 5-8" (`:221`, `:272` say 9). The two-topic and one-topic
  units keep 5-8, as `D-2026-0072` directs.
- The monographs are declared title-level (`:42`, `:44`), consistent with `D-2026-0001`.
- The spec claims no publication authority.

No superseded design survives.

**Extension, not residue.** The spec cites the Semester-2-scoped `D-2026-0053` three times:
item 1 for the partition (`:63`) and item 2 for the readings and floor (`:36`, `:48`). Extending
a ruling past its declared scope is a scope judgement, so it is escalated, not approved:
item 1 in G-2026-186, item 2 in G-2026-188.

## Outcome: partial

| Criterion | Verdict | Recorded |
|---|---|---|
| identity | pass on values; catalog record absent | D-2026-0078 item 1; G-2026-185 |
| partition | escalated | G-2026-186 |
| coverage | pass | D-2026-0078 item 2 |
| outcomes | pass (traces) | D-2026-0078 item 3; G-2026-189 (objective 4 completeness) |
| readings | not approved | G-2026-187, G-2026-188; two author repairs in D-2026-0078 |
| blueprint | pass | D-2026-0078 item 4 |
| structure | pass | D-2026-0078 item 5 |
| decision-residue | pass | D-2026-0078 item 6; extensions in G-2026-186, G-2026-188 |

**Blocked:**

- the `## Week schedule` table and every unit's boundaries (Units 1-7);
- the `## Reading list` and every `**Mapped readings**` line;
- specifically Unit 2 (`qureshi-struggle`), Unit 3 (`:201` against `:41`) and Unit 6 (U6-05);
- the catalog record;
- any duties-of-citizens addition.

The spec cannot move to `status: approved` until these are ruled and repaired and a fresh intake
runs on a new manifest.

Advisories, no repair required:

- the GPKS-402 overlap (`:14`) is a policy note, not a Scheme/guide conflict;
- the Hamid Khan edition statement;
- the Unit 1 summative verb;
- the U3-06 comparator.
