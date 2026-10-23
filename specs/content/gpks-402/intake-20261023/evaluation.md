# GPKS-402 · Pakistan Studies - Intake Evaluation (fresh, 2026-10-23)

**Evaluator**: agent:evaluator (fresh session; did not draft the spec)
**Gates**: G0 intake / G1 unit-spec
**Date**: 2026-10-23
**Constitution**: Article VII.8
**Skill**: `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (bound digest `77ff2fa9...`)
**Spec under evaluation**: `specs/content/gpks-402/content-spec.md` (status: draft, 360 lines)
**Course guide**: `Scheme-and-Course-guides/extracted-text/2nd 2026.txt` (GPKS block, lines 972-1153)
**Prior intake**: `D-2026-0069` (bundle `intake-88/`, pending-owner-review). Void under Art. VII.8.5:
`specs/content/terminology.csv` changed after its bundle (`git diff d3bdfc9a 413d76ea`: 9 EFMP-305
rows added, no GPKS-402 row touched). Its verdicts were not reused; every criterion was judged
afresh on this bundle.
**Decision recorded**: `D-2026-0071` in `specs/decisions/log.md` (pending-owner-review)
**Escalation recorded**: `G-2026-154` in `specs/gaps.md` (open)

## Manifest verification

- Bundle: `specs/content/gpks-402/intake-20261023/manifest.json`
- Manifest commit: `413d76ea5ce6518bfd56b8c6fdbbca4883a045dc`; bundle committed as `23c2f632`
  (`git diff --stat 413d76ea 23c2f632`: only the manifest itself added). Worktree clean before
  evaluation.
- Inputs bound: 57. Manifest digest:
  `f496696957bb67e338afdbea40ebb613108119ed6788f11cc0a930ab4062a7a0`.
- Recomputed independently with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
  `intakeRoots('gpks-402')` set at `23c2f632`: all 57 recorded paths present, 0 per-file digest
  mismatches, `digest(JSON.stringify(input_manifest))` reproduces the stored digest, and the
  recomputed map (less the one extra path below) reproduces it too.
- One extra path in the recompute: `specs/content/gpks-402/intake-20261023/manifest.json` itself,
  committed after preparation. It is not an input the decision rests on. Cause: `bound()`
  (`review-evidence.mjs:205-207`) excludes `/intake/` but not `intake-<suffix>/`, so a bundle
  directory named `intake-NN/` or `intake-<date>/` falls inside its own course's bound set. The
  same effect puts `intake-88/evaluation.md` and `intake-88/manifest.json` in this bundle's
  inputs, and this record will be inside the next recompute. Tooling advisory, not a spec defect.
- Registers (read, not freshness-bearing) matched at read time: `specs/decisions/log.md`
  `c462efad...`, `specs/gaps.md` `4ba99483...`.

## Deterministic checks (real exit codes, run at `23c2f632`)

| Check | Exit | GPKS-402 findings |
|---|---|---|
| validate:content | 0 | none |
| check:pipeline-gate | 0 | none (no GPKS-402 unit under `docs/`) |
| check:depth-gate | 0 | none |
| check:figures | 0 | none |
| check:no-em-dash | 0 | none |
| check:no-answer-keys | 0 | none |
| check:concept-graph | 0 | none |
| check:bloom-bands | 0 | none (900 items, none GPKS-402) |
| check:source-floor | 0 | none; 63 units in 9 courses checked, **none GPKS-402** |
| check:licence | 0 | none |
| licence:map:check | 0 | none |
| check:content-status | **1** | `static/content-status.json` stale; not a bound input, no GPKS-402 line, unrelated to this spec |
| check:docs-sync | 0 | none |

Front matter validated separately against `contracts/content-spec-frontmatter.schema.json` with
Ajv 2020: valid (`course_code: GPKS-402`, `status: draft`, `open_access_floor: {default: 1}`).

**These exits are vacuous for GPKS-402.** `docs/semester-2/gpks-402/` holds only
`_category_.json` and `course-overview.mdx`, and the depth, Bloom, figure and source-floor gates
walk authored units (`check-source-floor.mjs:55` iterates `walkUnits()`). A green run says nothing
about this spec's readings or blueprint, so both were checked by hand and by a replay script over
the spec's tables (below). `D-2026-0069` cited `check:source-floor` exit 0 as confirming the floor;
it could not have.

Spec-side replay (script over the spec's own tables): in all six units the `### Topic list` cells
partition the checklist totally and disjointly and agree with every checklist `Topic` cell; each
topic has >= 2 figure-plan rows matching its Figures cell; each unit plans >= 1
concept-map/flowchart/timeline; each ERQ line sums to 5.

## Criteria

### 1. identity - PASS

Guide `:980` "Course No. GPKS - 302 ... Credit Hours 2", `:982` "Course Title: Pakistan Studies ...
Semester 2nd". Revised board Scheme `B.Ed 4 Year 2026 revised after board.txt:90` (SEMESTER II) and
`:178-184` (`GPKS - 402 / Pakistan Studies / 2 (2-0) / General Education`). `catalog/courses.json`
Semester 2: `GPKS-402`, "Pakistan Studies", `2 (2-0)`, General Education. The code difference is
the guide-side slip adjudicated in `G-2026-03` (resolved, `specs/gaps.md:55-56`), which binds; no
new Article II.3 question. Spec `:10-12` states the same identity and cites `G-2026-03`.

### 2. partition - PASS (rests on owner rulings, not on the guide alone)

The guide gives a 16-week table with no unit headings (`:1008-1141`; mid-term `:1085`, review
`:1137-1141`). The six-unit grouping (Weeks 1-2 / 3-4 / 5-6 / 7-8+10 / 11-12 / 13-15) is not
guide-determined; it was escalated as `G-2026-97` and confirmed by the owner in `D-2026-0053`
item 1. `D-2026-0070` item 1 (confirmed 2026-10-20) names GPKS-402 among the bare-week-table
courses whose `D-2026-0053` grouping stands. The spec's grouping is identical to the one
`G-2026-97` recorded. Guide-determined parts verified: every checklist `Guide ref` week is the
guide's; the partition uses contiguous weeks, reorders no guide topic and splits no week; the
`## Week schedule` table (`:57-66`) and the unit opening lines (`:209` Weeks 7-8 and 10 with Week 9
mid-term; `:311` Weeks 13-15 with Week 16 review) agree with the guide; the table titles match the
six `## Unit N` headings (`:68/114/160/207/262/309`). The `D-2026-0052` week and title defects are
repaired.

### 3. coverage - PASS (row level)

Guide teaching bullets: Weeks 1-8 and 10-15, three per week and four in Week 14, 43 in all
(`:1012-1135`). Spec rows: 47 (6/6/7/11/7/10; `:81-86`, `:127-132`, `:173-179`, `:220-230`,
`:275-281`, `:322-331`). Mapping, each guide bullet exactly once:

| Guide week (lines) | Spec rows |
|---|---|
| W1 `:1010-1023` | U1-01, U1-02, U1-03 |
| W2 `:1025-1033` | U1-04, U1-05, U1-06 |
| W3 `:1035-1041` | U2-01, U2-02, U2-03 |
| W4 `:1043-1049` | U2-04, U2-05, U2-06 |
| W5 `:1051-1057` | U3-01; "Constitutions of 1956 and 1962" -> U3-02 + U3-03; U3-04 |
| W6 `:1059-1067` | U3-05, U3-06, U3-07 |
| W7 `:1069-1075` | U4-01; "Legislature, Executive, Judiciary" -> U4-02 + U4-03 + U4-04; U4-05 |
| W8 `:1077-1083` | U4-06, U4-07, U4-08 |
| W10 `:1087-1093` | U4-09, U4-10, U4-11 |
| W11 `:1095-1101` | "Agriculture, industry, and trade" -> U5-01 + U5-02; U5-03; U5-04 |
| W12 `:1103-1109` | U5-05, U5-06, U5-07 |
| W13 `:1111-1117` | U6-01, U6-02, U6-03 |
| W14 `:1119-1127` | U6-04, U6-05, U6-06, U6-07 |
| W15 `:1129-1135` | U6-08, U6-09, U6-10 |

The +4 rows are decompositions of three compound bullets in the guide's own words. No row lacks a
guide ancestor; no row adds a sub-topic. Week 9 (`:1085`) and Week 16 (`:1137-1141`, "Course
review", "Student presentations and discussions") are examination and review weeks the guide
titles as such; they carry no teaching sub-topic, so their absence from the checklists follows the
guide. Whether to plan a course-review artefact for Week 16 is a design choice the guide does not
make and the spec does not make either; `D-2026-0052` left it unsettled and it stays unsettled
(the style guide makes `course-review.mdx` optional).

Advisory, left to G3 as in `D-2026-0052`: descriptive glosses inside rows are the spec's wording,
not the guide's (`:176` U3-04 "the gap between 1956 and 1973", which is odd given the 1962
Constitution; `:277` U5-03 "poverty, inequality and debt", overlapping `:326` U6-05; the
enumerations in U4-09, U6-02, U6-03, U6-07).

### 4. outcomes - PASS (SLO 6-1 rests on an owner ruling)

Guide objectives `:996-1006` (five). Fourteen SLOs:
- Unit 1 (`:72`) and Unit 2 (`:118`) -> obj 1, 2: ideology and Movement, on the objectives' words.
- Unit 3 (`:164`) -> obj 3: constitutional development.
- Unit 4 (`:211`) -> obj 3 (governance, rights) and 4 (geography).
- Unit 5 (`:266`) -> obj 4 (economy, society) and 5 (education).
- Unit 6 (`:313`): SLO 6-2 -> obj 4; SLO 6-3 -> obj 5 on its words. SLO 6-1 (foreign policy) has a
  guide ancestor in Week 13 (`:1111-1117`) but no objective names it; escalated as `G-2026-99`,
  resolved by `D-2026-0053` item 4 (sub-topics and SLO wording may derive from relevance to the
  outcomes and readings; the row names objectives 4, 5).
No SLO lacks a guide ancestor in the week table.

### 5. readings - FAIL (author repairs; determined by `D-2026-0053` item 2, no new owner question)

The guide's list (`:1143-1153`, four entries) is transcribed at spec `:37-42`. The approach of
author-selected open-access supplements and the floor is owner-ruled (`D-2026-0053` item 2,
resolving `G-2026-98`). That ruling also says "Unresolvable or misattributed entries the intakes
named must still be corrected", and as applied in the confirmed `D-2026-0066` (GSOS-301) it requires
every unit to bind an open-access source whose reading-list row records a registry identity and a
verification date, the form `check:source-floor` counts (`scripts/check-source-floor.mjs:40-41,
75-76`). Checked 2026-10-23 (external lookups, not bound inputs):

| Key (spec line) | Finding |
|---|---|
| `pak-constitution-1973` (`:53`) | **Unresolvable locator.** `https://na.gov.pk/uploads/documents/1973_constitution.pdf` returns HTTP 404. The work is real; the National Assembly copy at `na.gov.pk/uploads/documents/1333523681_951.pdf` returns 200 (not opened further) |
| `unesco-pak-education` (`:54`) | **Misattributed.** `ark:/48223/pf0000232662` resolves to "Reply by Ms Irina Bokova, Director-General of UNESCO, to the 196th Session of the Executive Board; UNESCO, 14 April 2015" (`dc.title`), not *Education for All 2015 National Review: Pakistan* |
| `sbp-annual` (`:51`) | **Unresolvable locator.** `reports_annual.htm` is served as SBP's "We can't seem to find the page" error page |
| `mofa-foreign-policy` (`:52`) | Locator is the ministry home page (news and press releases); no document titled *Foreign Policy of Pakistan* is identified |
| `na-lahore-resolution` (`:55`) | Locator is the National Assembly home page; the Resolution is real but the row does not locate a text of it |
| `pbs-pak-stats` (`:50`) | Real serial (*Pakistan Statistical Yearbook*); locator is the PBS home page; no edition or year |
| `hec-pak-studies` (`:39`) | Still not one document. "The undergraduate-level curriculum" fits more than one HEC document (`G-2026-98` named a degree curriculum and an undergraduate compulsory-course outline, both undergraduate); no year or locator |
| `hamid-khan-const` (`:41`) | Real work (OUP). The stated ISBN 9780199060986 is not among the ISBNs Open Library lists for the work (9780199407828, 9780195979756, 9780195477870, ...). Advisory: confirm edition and ISBN |
| `burki-fifty-years` (`:42`) | Resolves: Open Library lists ISBN 9780813336213 (Westview) |
| `rabbani-pak-studies` (`:40`) | Resolves at title level (Caravan Book House, print, as `G-2026-98` recorded) |

Floor defects:
1. **No author-selected row records a registry identity or verification date** (`:50-55`). None
   names Crossref, OpenAlex, ERIC, DOAJ, PubMed, Semantic Scholar or Unpaywall. Once units are
   authored, every unit's `sources/unit-NN.md` would fail `check:source-floor` unless the author
   finds a different source; this is the `D-2026-0064` GSOS-301 defect.
2. **Unit 3 plans no open-access source.** Its `**Mapped readings**` (`:194`) are
   `hamid-khan-const, hec-pak-studies`, both in the print/HEC table, contrary to the spec's own
   "Each unit binds >= 1" (`:46`) and to `D-2026-0053` item 2.
3. **The Units column and the mapped lines still disagree**, so no single reading of the spec
   meets the floor: `pak-constitution-1973` column 3, 4 but mapped in Units 1 and 4 (not 3);
   `hamid-khan-const` column 3, 4 but mapped in Units 2, 3, 4; `hec-pak-studies` column 1, 2, 3 but
   mapped in Units 1, 3, 4 (not 2). By the column, Unit 1 has no open-access source; by the mapped
   lines, Unit 3 has none.

**Repair (author):** correct or replace `pak-constitution-1973`, `unesco-pak-education` and
`sbp-annual`; give `mofa-foreign-policy`, `na-lahore-resolution` and `pbs-pak-stats` a locator for
an identifiable document (or replace them); identify the HEC document by title, year and locator,
or record it as title-level under `D-2026-0001`; for every unit plan in `**Mapped readings**` at
least one open-access source whose reading-list row records a registry identity and a verification
date; align the Units column with the mapped lines. Determined by `D-2026-0053` item 2 as applied
in `D-2026-0066`; no escalation.

### 6. blueprint - PASS for Units 1, 2, 3, 5 and every unit-end bank; NOT APPROVED for the formative line of Units 4 and 6 (escalated, `G-2026-154`)

Per unit: formative 5-8 R/U/A, summative >= 1 Analyze-or-higher, 60/40 default
(`style-guide.md:227-229`); unit-end MCQ 10 (Remember-Apply, >= 2 per topic), RRQ 10
(Understand-Analyze, >= 2 per topic), ERQ 5 (Analyze-Evaluate/Create, >= 1 rubric Analyze-or-higher)
(`style-guide.md:247-250`). ERQ distributions sum to 5 in all six units (`:112`, `:158`, `:205`,
`:307`: 2 per topic + 1; `:260`, `:360`: 1 per topic + 2). Per-topic MCQ/RRQ minimums fit inside 10
(max 6 for three topics). Depth bands are within the style guide's +/-25% (`:303-307`) and are
whole-unit totals, so they correctly exceed the topic reading-min sums.

**Defect reported now, while cheap:** the per-topic layout requires `## Check your understanding`
to carry >= 3 numbered items in every topic file (`style-guide.md:236-237`), and the depth gate
enforces it (`scripts/lib/unit-depth.mjs:342-343`). Units 4 and 6 have three topics, so their
authored formative items will number >= 9, which breaches the spec's own "formative 5-8 items"
(`:214`, `:316`) copied from the style guide's default (`style-guide.md:227`). Two-topic units
(>= 6) fit. The style guide does not say which rule governs a unit with three or more topics, so
choosing between them is not mine to decide: escalated as `G-2026-154`. The same wording appears
in other approved specs (for example `efmp-304/content-spec.md:226`), so the question is
corpus-wide.

### 7. structure - PASS

Front matter conforms to `contracts/content-spec-frontmatter.schema.json` (Ajv 2020, valid);
`course_code` matches the folder; `status: draft` is the pre-approval state; the floor is declared
in the mapping form `D-2026-0053` item 2 requires. Present and parseable: Course-wide items
(`:14`), Course Description (`:27`), Reading list (`:31`), Week schedule (`:57`), and for each of
the six units the CLO/SLO refs, key terms, topics, assessment blueprint, `### Sub-topic checklist`
with `Topic` column, `### Topic list`, `**Depth budget**`, prerequisites, misconceptions, mapped
readings, figure plan (>= 2 per topic, >= 1 concept-map/flowchart/timeline per unit) and unit-end
blueprint. `validate:content` exit 0. Advisory: the header source range (`:10` "lines 979-1156")
is off by a few lines against the guide block (`:972-1153`).

### 8. decision-residue - FAIL (one repair named by a confirmed decision is not made)

Confirmed decisions whose scope reaches GPKS-402, and the whole spec searched for each superseded
design:
- `G-2026-03`: "GPKS - 302" appears only in the code note at `:12`; no Semester IV reference;
  all unit paths are `docs/semester-2/gpks-402/`. No residue.
- `D-2026-0003`: no `.specify/` guide is cited. No residue.
- `D-2026-0053`: items 1, 2, 4 and 5 are embodied (grouping, floor declared in mapping form,
  SLO 6-1 trace, Units 1-2 withdrawn: `docs/semester-2/gpks-402/` holds no unit). Item 2's
  "misattributed entries must still be corrected" is not met (criterion 5).
- `D-2026-0070` (corpus-wide): item 1 keeps the GPKS-402 grouping; item 3's guide link lives in
  the theme, and the spec plans nothing in `course-overview.mdx`. No residue.
- `D-2026-0052` (confirmed, with `G-2026-98`): named as author repairs the blueprint, the week
  schedule and titles, the two defective supplements, the "fifty decades" typo, and the
  **Units-column inconsistencies** (`hamid-khan-const` listed 3-4 but mapped in Unit 2;
  `hec-pak-studies` listed 1-3 but mapped in Unit 4 and not Unit 2). All are repaired except the
  last, which survives unchanged at `:39`, `:41`, `:147`, `:246`, and has grown a third instance
  (`pak-constitution-1973`, `:53` vs `:101`, `:194`). `D-2026-0069` reported it as an advisory; a
  repair a confirmed decision named is residue. Completing it is determined by that decision; no
  escalation.

## Outcome

`D-2026-0071` approves identity, partition, coverage, outcomes and structure, and the blueprint
for Units 1, 2, 3 and 5 and every unit-end bank, at pending-owner-review, bound to manifest digest
`f496696957bb67e338afdbea40ebb613108119ed6788f11cc0a930ab4062a7a0`. Readings and decision residue
fail on author repairs that `D-2026-0053` item 2 and `D-2026-0052` already determine. The Units 4
and 6 formative line is escalated (`G-2026-154`).

`D-2026-0071` supersedes `D-2026-0069`. That entry is already void (a bound input changed), and on
this bundle its readings and decision-residue approvals are not reproduced. Also, the manifest
digest `D-2026-0069` records (`specs/decisions/log.md`, under "Bound to") has 63 hex characters and
does not match `intake-88/manifest.json` (`4b7ec030...4bf4e087d...`); the record shows the correct
value. `D-2026-0069` is not edited here.

The spec stays `status: draft`. It cannot move to `approved` on confirmation of `D-2026-0071`: the
readings and residue repairs change `content-spec.md`, which voids this decision, and a fresh
bundle and intake are needed. A later intake may limit itself to the readings repair, the
Units-column alignment and the `G-2026-154` outcome if every other bound input is unchanged.
Certifies no content, qualifies no reviewer, authorises no publication (Art. VII.8.4).
