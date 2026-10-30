# GICP-400 intake - register entries for the parent to append

Written by agent:evaluator, 2026-10-31. Neither register was edited by this evaluator. The parent
appends the block under each heading verbatim. Full evidence:
`specs/content/gicp-400/intake/evaluation.md`.

## For specs/decisions/log.md

## D-2026-0078 - GICP-400 intake: identity values, coverage, outcome traces, blueprint, structure and decision residue approved; partition, readings, the catalog record and objective 4 escalated

- **Status:** pending-owner-review
- **Gate:** G0 intake / G1 unit-spec
- **Scope:** GICP-400 Ideology and Constitution of Pakistan,
  `specs/content/gicp-400/content-spec.md` (status: draft) at commit `815d59fd`. Settles the
  identity values of the proposed catalog entry, sub-topic coverage of all seven checklists, the
  13 SLO traces, the assessment blueprints, structural conformance and decision residue. Settles
  nothing about the unit partition, the reading list, whether the catalog entry is added, or the
  "duties of citizens" in objective 4.
- **Decided by:** agent:evaluator, 2026-10-31 (fresh session; did not draft the spec)
- **Decision:**
  1. **identity - the values are approved; the catalog record is not.** The code `GICP-400`,
     title "Ideology and Constitution of Pakistan", credit hours `2 (2-0)`, Semester 3 and
     category General Education in the spec's proposed entry (`content-spec.md:10`, `:12`) match
     the guide (`3rd 2026.txt:573-574`, which gives `GICP - 400` and a bare `2`) and the revised
     Scheme (`B.Ed 4 Year 2026 revised after board.txt:190`, `:234-240`). The guide's `2` is
     less specific than `2 (2-0)` but does not conflict with it. **The entry does not exist in
     `catalog/courses.json`**, whose Semester 3 group is empty. Adding it, and its non-guide Urdu
     title, are escalated in `G-2026-185`.
  2. **coverage - approved.** All 44 teaching bullets of Weeks 1-15 (`3rd 2026.txt:586-643`)
     appear in exactly one checklist row with the correct week and line. No row adds a sub-topic,
     and each Topic list forms a total, disjoint partition of its checklist. Week 16's review
     items (`:644-646`) are not teaching sub-topics.
  3. **outcomes - SLO traces approved.** All 13 SLOs (`:80`, `:126`, `:172`, `:218`, `:269`,
     `:321`, `:367`) trace to the five verbatim guide objectives (`3rd 2026.txt:577-582`), and
     none is an addition. This approves the traces only. Whether objective 4's "duties of
     citizens" needs teaching is escalated in `G-2026-189`.
  4. **blueprint - approved.**
     - MCQ, RRQ and ERQ Bloom bands and the 10/10/5 counts match `style-guide.md:247-250`.
     - ERQ per-topic arithmetic sums to 5 in every unit.
     - Formative counts are 5-8 for one- and two-topic units and 9 (3 per topic) for
       three-topic Units 4 and 5 under `D-2026-0072`.
     - Every unit has one Analyze-or-higher summative task; weighting is the Art. III.7 60/40
       default, the guide being silent.
     - Depth bands contain the summed topic reading-minutes.
     - The figure plans meet >= 2 per topic and >= 1 concept-map/flowchart/timeline per unit.
     - No floor the spec sets is breached by its own items.
  5. **structure - approved.**
     - Front matter is valid against `contracts/content-spec-frontmatter.schema.json` (Ajv 2020).
     - All content-spec-v2 sections are present, and `## Week schedule` is labelled derived
       (`D-2026-0012`).
     - Deterministic checks at `d7aabb98`: validate:content, pipeline-gate, depth-gate,
       figures, no-em-dash, concept-graph, bloom-bands, source-floor, map-sources and
       docs-sync exit 0. Depth-gate, figures and source-floor are vacuous because no unit is
       authored. no-answer-keys exits 1 on `specs/content/efpg-401/content-spec.md` only,
       which is another course.
  6. **decision-residue - approved.** The whole spec was searched against `D-2026-0001`,
     `-0003`, `-0005`, `-0012`, `-0014`, `-0068`, `-0070`, `-0072` and the revised-Scheme
     authority ruling. No superseded design survives. The spec's three citations of the
     Semester-2-scoped `D-2026-0053` (`:36`, `:48`, `:63`) are extensions, not residue, and are
     escalated in `G-2026-186` and `G-2026-188`.
- **Repairs required (guide-determined; not owner questions), before re-intake:**
  1. `pak-constitution-1973` lists Unit 3 in its Units column (`:41`), but Unit 3's Mapped
     readings (`:201`) omit it. Reconcile the two.
  2. U6-05 (`:334`) covers the 25th Amendment, which is guide-required (`3rd 2026.txt:638`), yet
     no Unit 6 source (`:350`) postdates 2018. Bind the Constitution (Twenty-fifth Amendment)
     Act, 2018, or a current official consolidated text, at a URL reachable from this host.
     The bound `na.gov.pk` PDF did not respond on 2026-10-31.
- **Basis:**
  - Guide `Scheme-and-Course-guides/extracted-text/3rd 2026.txt`: code and credits `:573-574`;
    description `:575-576`; objectives `:577-582`; weekly breakdown `:583-646`; readings
    `:647-651`.
  - Revised Scheme `:190`, `:234-240`; superseded Scheme `B.Ed 4 Year board.txt:123-127`
    (agrees).
  - Rulings: `D-2026-0001`, `-0012`, `-0070`, `-0072`.
  - Reading checks run 2026-10-31: Crossref (7 DOIs), OpenAlex (7 W-IDs), Open Library
    (ISBNs 9780199407828 and 9780804786867; Qureshi's 36 works).
  - Per-row evidence: `specs/content/gicp-400/intake/evaluation.md`.
- **Bound to:** `specs/content/gicp-400/intake/manifest.json`, manifest digest
  `5dea74c64cc3680f3a3b0f4029afd0a2592d4417fa170061c83f7f40ee3c6e53`.
  - 55 inputs at commit `815d59fd`, recomputed with `manifestFor()`: 0 digest mismatches, digest
    reproduced.
  - Registers at read time: `specs/decisions/log.md` `e9598a98...`, `specs/gaps.md`
    `383dcc3b...`.
  - A change to any bound input voids this decision (Art. VII.8.5).
- **Blocked, by unit and section:**
  - the `## Week schedule` table and the boundaries of Units 1-7 (`G-2026-186`);
  - the `## Reading list` and every `**Mapped readings**` line (`G-2026-187`, `G-2026-188`,
    repairs 1-2), in particular Unit 2 `qureshi-struggle`, Unit 3 `:201`, Unit 6 U6-05;
  - the catalog record (`G-2026-185`);
  - any duties-of-citizens addition (`G-2026-189`).

  The spec cannot move to `status: approved` until these are ruled and repaired and a fresh
  intake runs on a new manifest.
- **Limits:**
  - The spec stays `status: draft`.
  - Not settled here:
    - the Week 16 course-review question `D-2026-0052` left open;
    - the U3-06 comparator, which the spec reads as 1956 against 1962 while the guide's
      "Comparative overview" names none;
    - the Week 9 look-back framing.
  - Advisories:
    - the GPKS-402 overlap (`:14`) is not a Scheme/guide conflict;
    - Open Library's record for ISBN 9780199407828 carries no "3rd ed." statement;
    - the Unit 1 summative item says "explain how" while claiming Analyze.
  - Certifies no content, qualifies no reviewer, authorises no publication (Art. VII.8.4;
    `D-2026-0014` does not cover Semester 3).

## For specs/gaps.md

## G-2026-185 - GICP-400 has no `catalog/courses.json` entry; adding one re-opens every bound G2/G3 manifest

- **Status:** open
- **Gate:** G0 intake (identity criterion)
- **Source:** `D-2026-0078`
- **Detail:** The `catalog/courses.json` Semester 3 group is empty. The spec states a "Proposed
  catalog entry" instead (`specs/content/gicp-400/content-spec.md:12`), because every G2 and G3
  evidence manifest binds the catalog whole, so adding a course stales them all.
  - **Approved under `D-2026-0078`:** the entry's code, title, credit hours `2 (2-0)`,
    Semester 3 and category General Education match the guide (`3rd 2026.txt:573-574`) and the
    revised Scheme (`B.Ed 4 Year 2026 revised after board.txt:234-240`).
  - **Not guide-given:** the Urdu title `نظریہ اور آئینِ پاکستان`, which is a translation choice.
  - Likely common to all six Semester 3 intakes run on 2026-10-31.
- **Needed, and from whom:** the curriculum owner, to rule:
  1. whether and when Semester 3 courses enter the catalog, given the manifest cost (one batched
     addition, or a change to what G2/G3 manifests bind);
  2. on confirming the Urdu title.
- **Blocks:** the identity criterion's catalog record. Unit authoring and any G2 manifest for
  GICP-400 cannot bind a catalog entry that does not exist.

## G-2026-186 - GICP-400 intake: the seven-unit partition is the spec's construction over a guide that gives only a week table

- **Status:** open
- **Gate:** G0 intake / G1 unit-spec (partition criterion)
- **Source:** `D-2026-0078`
- **Detail:** The guide (`3rd 2026.txt:583-646`) gives 16 titled weeks and no unit or chapter
  headings. The spec (`content-spec.md:61-74`) groups them as:

  | Unit | Weeks | Teaching weeks |
  |---|---|---|
  | 1 Ideology, Constitution and the Ideological Foundations of Pakistan | 1-2 | 2 |
  | 2 Muslim Political Thought and the Pakistan Movement | 3-4 | 2 |
  | 3 Constitution-Making, 1947-1962 | 5-6 | 2 |
  | 4 Constitutional Crises and the Making of the 1973 Constitution | 7-9 | 3 |
  | 5 The 1973 Constitution: Features, Fundamental Rights and Principles of Policy | 10-12 | 3 |
  | 6 Structure of Government and Constitutional Amendments | 13-14 | 2 |
  | 7 Education for Ideology and the Constitution | 15 (single topic) | 1 |
  | - Review and final assessment | 16 | - |

  **Verified, and determined by the guide:** the blocks are contiguous; no week is reordered or
  split; each week is one topic carrying its guide title; and the unit opening lines, the schedule
  and the checklist `Guide ref` cells agree.

  **Not determined by the guide:** the number of units, the boundaries, and the single-week
  Unit 7. The spec cites:
  - `D-2026-0053` item 1, which confirms only six named Semester 2 groupings;
  - `D-2026-0070` item 1, which permits grouping where a guide gives only weeks but chooses no
    grouping.
- **Needed, and from whom:** the curriculum owner, to do one of:
  - confirm the 2/2/2/3/3/2/1 grouping above;
  - supply another grouping;
  - extend `D-2026-0053` item 1 to Semester 3.
- **Blocks:** the `## Week schedule` table and the boundaries of all seven units. It does not
  block the sub-topic checklists, whose rows and `Guide ref` weeks are guide-determined.

## G-2026-187 - GICP-400 reading list: the guide's "Ishtiaq Husain Qureshi. The Pakistan Movement" does not resolve to a work

- **Status:** open
- **Gate:** G0 intake (readings criterion)
- **Source:** `D-2026-0078`
- **Detail:** `3rd 2026.txt:650` lists "Ishtiaq Husain Qureshi. The Pakistan Movement". On
  2026-10-31, Open Library listed 36 works by Qureshi and none had that title; a title-plus-author
  search returned 0. The spec binds key `qureshi-struggle` to *The Struggle for Pakistan*
  (University of Karachi, 1965; OL11551W) "pending the owner's confirmation" (`content-spec.md:43`;
  drafting note 3, `:410`). Other candidates exist, among them *A Nation Born of Sacrifice* (1976)
  and *Pakistan* (1950). Which work the guide intends is not determined by the guide.
- **Needed, and from whom:** the curriculum owner (or the guide's issuing department), to name the
  intended work, or to rule that the entry be dropped as unresolvable.
- **Blocks:** the `qureshi-struggle` row (`:43`) and Unit 2's Mapped readings (`:155`).

## G-2026-188 - GICP-400 binds author-selected readings and an open-access floor under `D-2026-0053` item 2, a ruling scoped to Semester 2

- **Status:** open
- **Gate:** G0 intake (readings criterion)
- **Source:** `D-2026-0078`
- **Detail:** The spec's `### Author-selected (open access)` table (`content-spec.md:46-59`) cites
  `D-2026-0053` item 2 as its authority (`:36`, `:48`), as does its
  `open_access_floor: {default: 1}` front matter (`:4-5`). That ruling's Scope is six named
  Semester 2 courses. All seven rows are real and open access: the DOIs resolve on Crossref, the
  W-IDs on OpenAlex, and the Act at legislation.gov.uk returns HTTP 200. Their *authority* is the
  question, not their reality. Likely common to all six Semester 3 intakes run on 2026-10-31.
- **Needed, and from whom:** the curriculum owner, to extend `D-2026-0053` item 2, the
  author-selected readings and the per-unit open-access floor, to Semester 3 (or to GICP-400), or
  to rule otherwise.
- **Blocks:** the author-selected rows and the open-access floor, and with them the open-access
  coverage of every unit. Separately, the two author repairs listed in `D-2026-0078` (the Unit 3
  Constitution mapping, and a post-2018 source for U6-05) are guide-determined and need no ruling.

## G-2026-189 - GICP-400: objective 4 and the course description name "duties of citizens", but no week of the guide teaches them

- **Status:** open
- **Gate:** G0 intake / G1 unit-spec (outcomes and coverage criteria)
- **Source:** `D-2026-0078`
- **Detail:** This is a within-guide inconsistency:
  - Course Objective 4 reads "Understand fundamental rights and duties of citizens"
    (`3rd 2026.txt:581`), and the Course Description names "the rights and duties of citizens"
    (`:576`).
  - The weekly breakdown (`:585-646`) teaches fundamental rights (Week 11, `:624-627`) and no
    duties.
  - The spec follows the weekly breakdown: "duties" appears only in the reproduced objective
    (`content-spec.md:22`) and in a figure about state duties (`:310`).

  Adding a citizens' duties sub-topic (for example under Topic 5.2) would be an addition. The
  outcome-derived sub-topic permission in `D-2026-0053` item 4 is scoped to Semester 2. This is
  not a numbering slip the evaluator may resolve.
- **Needed, and from whom:** the curriculum owner, to rule whether citizens' duties are taught as
  a derived sub-topic, and where, or whether objective 4 is met by the rights content alone.
- **Blocks:** any duties-of-citizens checklist row or SLO wording. It does not block the
  approved SLO traces or the existing 44 checklist rows.
