# GENT-401 G0/G1 intake evaluation

- **Evaluator:** agent:evaluator (fresh session; did not draft this specification)
- **Date:** 2026-11-18
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (Constitution Article VII.8)
- **Specification:** `specs/content/gent-401/content-spec.md` (410 lines, `status: draft`)
- **Bundle:** `specs/content/gent-401/intake/manifest.json`, prepared at commit `7750c153`
- **Worktree:** `/home/a2ahs/crew-wt/sem4-intake-eval`, branch `content/sem4-intake-eval`, off
  `origin/main` at `fa80a282`
- **Outcome:** **partial.** Decision `D-2026-0087` (pending-owner-review) approves what the guide
  settles. Gaps `G-2026-211`, `G-2026-212`, `G-2026-213`, `G-2026-219` and `G-2026-220` escalate
  the rest. No author repair is needed beyond what those rulings decide.

## Manifest verification

Recomputed with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
`prepare-intake-evidence.mjs` root set (as listed in `specs/content/gcce-400/intake/evaluation.md`,
with `specs/content/gent-401` as the course root):

- 56 bound inputs recorded, 56 recomputed, **0 mismatches**.
- `manifest_digest` recorded `1bf77bceb60eb22bc988c301011979981ba406240a96dd24871f4396115ac287`;
  recomputed from the file and from the live tree: identical.
- Registers matched their recorded read-time digests (`ceb73bf9...`, `18ab3a6b...`).

Any change to a bound input voids `D-2026-0087`.

## Criteria

Guide: `Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt`, GENT-401 block `:304-408`.
Scheme: `B.Ed 4 Year 2026 revised after board.txt` (cited as `Scheme:N`).

### 1. identity - code and title pass; credit hours are an Article II.3 conflict (`G-2026-219`); no catalog entry (`G-2026-211`)

- Guide: `GENT-401`, Semester-IV, Credit Hours `03` (`:311`), "Entrepreneurship" (`:312`).
- Scheme: Semester IV row 2, `GENT– 401`, "Entrepreneurship", `2 (2-0)`, General Education, PTGR
  (`Scheme:321-331`).
- **Credit hours conflict.** The guide says 3, the Scheme says 2 (2-0). The spec states the
  conflict and adopts the Scheme's value "as `D-2026-0053` item 3 did for EFMP-305" (`:12`,
  drafting note 1 `:404`). That item rules EFMP-305 only. Which document governs here is an
  Article II.3 question, so I do not decide it, however likely the Scheme's value is. Escalated
  as `G-2026-219`.
- `catalog/courses.json` has no GENT-401 entry; the `title_ur` "کاروباری صلاحیت" is the drafter's
  proposal (`:14`). Escalated in `G-2026-211`.

### 2. partition - escalated (`G-2026-220`)

- The guide is a bare 16-week table with no unit headings (`:326-391`). The skill makes any
  grouping of such a table a judgement the guide does not determine.
- `D-2026-0070` item 1 permits grouping for such guides but confirms only the Semester 2
  groupings of `D-2026-0053` item 1. It does not approve a new one.
- Proposed partition, recorded for the owner (`:64-72`): seven units of two consecutive content
  weeks (1-2, 3-4, 5-6, 7 and 9, 10-11, 12-13, 14-15), each week one topic. Unit 4 joins Weeks 7
  and 9 across the mid-term week because the guide splits "Business Plan Development (Part 1/2)"
  there (`:352`, `:360`). The grouping is coherent with the guide's week titles, but it is the
  drafter's construction.
- **Approved within the partition:** Week 8 "Mid-Term Review / Exam" (`:357-359`) and Week 16
  "Final Project & Evaluation" (`:388-391`) are assessment events, not concepts, and carry no row.
  That is consistent with `D-2026-0059` and `D-2026-0063`. Week 16's business plan and pitch are
  routed to `## Course project` (`:396-398`).

### 3. coverage - pass, except one derived row (escalated, `G-2026-213`)

Replayed with the gate's parsers and checked by hand:

| Unit | Guide lines | Rows |
|---|---|---|
| 1 | `:327-329`, `:331-333` | U1-01..06 |
| 2 | `:335-336`, `:339-341` | U2-01, 02, 04..06 |
| 3 | `:344-346`, `:349-351` | U3-01..06 |
| 4 | `:353-355`, `:361-363` | U4-01..06 |
| 5 | `:365-367`, `:369-371` | U5-01..06 |
| 6 | `:373-375`, `:377-379` | U6-01..06 |
| 7 | `:381-383`, `:385-387` | U7-01..06 |

That is 41 guide rows, each once, with faithful wording. U6-04 "(sole proprietor, partnership,
company; SECP)" and U6-05 "(IPO-Pakistan)" are Pakistani glosses, not new sub-topics.

- **U2-03 is an addition.** The guide's third Week 3 line reads only "Entrepreneurship" (`:337`),
  evidently truncated. The spec fills it with "intrapreneurship and women's entrepreneurship"
  under `D-2026-0053` item 4 (`:135`, drafting note 4 `:407`). The guide does not name these
  forms. `D-2026-0053` is scoped to Semester 2 (`log.md:2541`). Escalated in `G-2026-213`.

### 4. outcomes - pass

The guide's eight outcomes (`:318-325`) are quoted verbatim (`content-spec.md:19-26`). Every SLO
restates its own unit's guide items and names its ancestors: Unit 1 outcomes 1, 3 and 7; Unit 2
outcomes 2 and 3; Unit 3 outcomes 2 and 5; Unit 4 outcome 4; Unit 5 outcome 6; Unit 6 outcomes 6
and 8; Unit 7 outcome 7. All eight outcomes are reached. No SLO lacks a guide ancestor.

### 5. readings - guide-listed entries pass; author-selected basis escalated (`G-2026-212`)

**Guide-listed: all three links resolve to identifiable works.** The guide prints three bare PDF
links (`:406-408`). I downloaded each on 2026-11-18 and read its front matter:

| Line | Work found | Spec row |
|---|---|---|
| `:406` | PDF metadata and title page: "Entrepreneurship for Everyone: A Student Textbook", Robert Mellor with Coulton, Chick, Bifulco, N. Mellor and Fisher, (c) 2009, 257 pp. Open Library `OL15517021W` (2009). | `mellor-2009`, matches |
| `:407` | "By Jonathan T Scott", "Copyright 2017 by Jonathan T. Scott and EFMD. All rights reserved", 222 pp. | `scott-2017-efmd`, matches |
| `:408` | "An Introduction to Entrepreneurship", Eamonn Butler; "First Published: August 2023 - Kabul, Afghanistan"; ISBN 978-0-255-36794-3; 136 pp. | `butler-iea`, matches |

- The spec's decision not to link the `:406` copy, a copyrighted SAGE book on an unrelated
  college repository, is a sound authoring constraint. It needs no ruling here. The owner may
  wish to correct the guide's link at source (drafting note 3).
- The IEA original's year (spec: 2020) is not in the file. The spec already marks it for
  confirmation (`:48`, drafting note 5). This is not a defect at intake.

**Author-selected rows:**

| Key | Verified as |
|---|---|
| `qamar-2020-social` | Crossref `10.29145/jmr/72/070201`: Qamar et al., Journal of Management and Research, 2020; OpenAlex `W3118924195`, diamond |
| `saeed-2014-ee` | Crossref `10.1515/erj-2013-0041`: Saeed et al., Entrepreneurship Research Journal, 2014; OpenAlex `W1969264211`, green |
| `openstax-entrepreneurship` | URL HTTP 200 |
| `secp-registration`, `ipo-pakistan` | Not reachable from this host on 2026-11-18 (403 and timeout). Not a defect at G0/G1 (`D-2026-0001`). |

Every unit maps `openstax-entrepreneurship`, so the floor holds in every unit. But the spec binds
the floor and the author-selected rows under `D-2026-0053` item 2 (`:38`), which is scoped to
Semester 2. Escalated in `G-2026-212`.

### 6. blueprint - pass (for the partition as drafted)

- All seven units have two topics. Each states formative "5-8" (`style-guide.md:227`), which
  admits the per-topic floor of 3 (`:237`).
- Unit-end banks are 10/10/5 with the guide's bands. ">= 2 per topic" fits. ERQ "2 per topic plus
  1 integrative" sums to 5.
- Every summative names an Analyze-or-higher item: Analyze (Unit 1), Evaluate (Units 2, 6),
  Create (Units 3, 4, 7), and "Apply-then-Evaluate" in Unit 5, whose second step is Evaluate.
- 2 figures per topic, with a concept-map, flowchart or timeline in every unit. Topic
  reading-minutes sit inside each `**Depth budget**` band.
- The guide gives no weighting beyond naming a mid-term and a final (`:357-359`, `:388-391`), so
  the 60/40 default (`style-guide.md:229`, Constitution Art. III.7) applies as the spec says
  (`:29`).
- The depth budgets are sized for 2 credits (drafting note 1). If `G-2026-219` rules 3 credits,
  the budgets change, but the structure does not.

### 7. structure - pass

- All 14 `CONTENT_GATES` exit 0 (run once for the tree on 2026-11-18; see
  `specs/content/gcce-400/intake/evaluation.md`, criterion 7, including the `check:content-status`
  note).
- Front matter validates against `contracts/content-spec-frontmatter.schema.json`.
- Topic lists partition every checklist. Topic cells match. Depth-budget counts match. Every
  per-unit block is present. Figure IDs are unique and contiguous, and archetypes match.
- Recommendations only: no `**Worked-examples plan**` or `**International best-practice notes**`
  lines (a finance unit would benefit from worked break-even examples).

### 8. decision-residue - not approved (escalated)

| Entry | Status in the spec | Verdict |
|---|---|---|
| `D-2026-0070` item 1 | Invoked for grouping a bare week table; the grouping is new | Escalated, `G-2026-220` |
| `D-2026-0053` item 3 (EFMP-305 credit hours) | Cited as precedent for adopting the Scheme's credit value | Escalated, `G-2026-219` |
| `D-2026-0053` item 2 (Semester 2) | Relied on for a Semester 4 course | Escalated, `G-2026-212` |
| `D-2026-0053` item 4 (Semester 2) | Relied on for U2-03 | Escalated, `G-2026-213` |
| `D-2026-0072` | Not needed: every unit has two topics | No residue |
| `D-2026-0001`, `D-2026-0003`, `D-2026-0012`, `D-2026-0081` | No superseded design present | No residue |

## Blocked until the owner rules

| Gap | What it blocks |
|---|---|
| `G-2026-211` | the catalog entry |
| `G-2026-212` | the Author-selected table and `open_access_floor` as a binding floor |
| `G-2026-213` | U2-03 |
| `G-2026-219` | the credit-hour value, and with it the depth budgets |
| `G-2026-220` | the seven-unit grouping and every unit's topic list; the approvals of criteria 3, 4 and 6 are for the partition as drafted |
