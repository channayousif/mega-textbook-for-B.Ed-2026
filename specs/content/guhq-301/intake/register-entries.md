# GUHQ-301 intake: register entries for the parent to append

Written by agent:evaluator on 2026-10-31. Do not edit them; append each block verbatim to the file
named in its heading. Full record: `specs/content/guhq-301/intake/evaluation.md`.

## For specs/decisions/log.md

## D-2026-0080 - GUHQ-301 intake: identity values, unit partition, coverage, outcomes, structure and most of the blueprint approved; topic partition, Unit 2 formative count, readings, catalog entry and decision residue escalated

- **Status:** pending-owner-review
- **Gate:** G0 intake / G1 unit-spec
- **Scope:** GUHQ-301 Fehm-e-Quran - I. Settles only items 1-7 below. Does not settle the topic
  partition, the Unit 2 formative count, the reading list, the catalog entry or the residue items
  in `G-2026-205` to `G-2026-209`.
- **Decided by:** agent:evaluator, 2026-10-31
- **Decision:**
  1. **identity: values approved; the catalog entry is escalated.** The proposed entry GUHQ-301,
     "Fehm-e-Quran - I", 1 (0-1), General Education, Semester 3 (`content-spec.md:14`) matches the
     resolved `G-2026-04` and the Scheme's Semester III row. The guide's `GUHQ- 401`, `03 (0-1)` and
     `2nd` were already adjudicated by `G-2026-04` and are not re-opened. `catalog/courses.json`
     has no GUHQ-301 entry, so the catalog-side check cannot pass (`G-2026-205`).
  2. **partition (unit level): approved.** There are seven units, one per numbered guide unit, in
     the guide's order and weeks (1-2, 3-6, 7-8, 9-11, 12-13, 14, 15-16).
     - **Within-guide slip, resolved:** guide Unit 07 repeats Unit 06's heading. No second
       document is in conflict. Unit 7 is titled "Integrated Practice and Application", wording
       taken from its own items 7.1 and 7.6. The owner may substitute another heading.
     - The topic partition inside each unit is **not** approved (`G-2026-206`).
  3. **coverage: approved.**
     - 47 checklist rows reproduce every guide schedule item once: `:138-140`, `:143-145`,
       `:149-151`, `:154-156`, `:158-160`, `:162-164`, `:168-170`, `:172-174`, `:178-180`,
       `:182-184`, `:187-189`, `:193-195`, `:197-199`, `:204-207`, `:211-213` and `:217`.
     - The spec adds no sub-topic the guide lacks.
     - Items 7.4 "Revision of entire course" and 7.5 "Final assessment / presentation"
       (`:215-216`) are a course activity and an assessment event, not concepts. They carry no
       row, consistent with EFMP-303's review week (`D-2026-0059`, `D-2026-0063`).
  4. **outcomes: approved.** The four guide outcomes (`:130-133`) are quoted verbatim. All 13 SLOs
     trace to them through their own units' guide items. SLO 6-1 traces through item 6.4 (`:207`)
     and the description (`:127`).
  5. **blueprint: approved for Units 1, 3, 4, 5, 6 and 7.**
     - Unit-end banks are 10/10/5 with the style guide's bands.
     - Per-topic minimums fit, and ERQ distributions sum to 5.
     - Formative lines admit the per-topic floor of 3; Unit 4 applies `D-2026-0072`.
     - Each topic plans 2-3 figures, and each unit has a schematic.
     - Each unit has an Analyze-or-higher summative item.
     - **Unit 2 is not approved.** Its summative line names an "Apply-or-higher" item
       (`content-spec.md:124`) against `style-guide.md:228` (author repair). Its 12-item formative
       line is escalated (`G-2026-207`).
  6. **structure: approved.**
     - Front matter validates against `contracts/content-spec-frontmatter.schema.json`.
     - All per-unit blocks are present.
     - Topic lists partition the checklists totally and disjointly.
     - Depth-budget counts match the tables.
     - Figure IDs are unique.
     - The deterministic checks exit 0, except `check:no-answer-keys` (exit 1). Its single
       finding is in `specs/content/efpg-401/content-spec.md`, outside this bundle.
     - Absent `**Worked-examples plan**`, `**International best-practice notes**` and
       `## Course review plan` are recommendations only: the bound style guide does not require
       them (`D-2026-0043`(d) precedent).
  7. **readings and decision-residue are not approved** (`G-2026-206`, `G-2026-207`,
     `G-2026-208`, `G-2026-209`).
     - The two DOI-bearing author-selected rows resolve on Crossref and OpenAlex as cited:
       `10.63317/5ca39mfekwbt` (`W48549471`) and `10.6007/ijarbss/v12-i6/13322`
       (`W4283369090`).
- **Basis:**
  - Guide: `Scheme-and-Course-guides/extracted-text/3rd 2026.txt:119-224`. Identity `:123-125`,
    description `:127`, outcomes `:128-133`, schedule `:134-217`, readings `:218-224`.
  - Scheme: `Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt:281-289`.
  - Identity: `specs/gaps.md` `G-2026-04` (resolved).
  - Style guide: `specs/content/style-guide.md:227-250`, `:513-514`.
  - Why the guide determines this: each approved item rests on the guide's own numbered units and
    schedule lines, or on an already-resolved ruling. No item depends on a judgement between two
    documents.
- **Bound to:** `specs/content/guhq-301/intake/manifest.json`, manifest digest
  `a8e5ba491740d3e89c23d4dc8080f0178047f6634607dd08f88c000ce1d15896`.
  - 55 inputs, recomputed with `manifestFor()`, 0 mismatches.
  - Registers matched at read time.
  - Any change to a bound input voids this entry.
  - Record: `specs/content/guhq-301/intake/evaluation.md`.
- **Limits:**
  - **Still blocked:**
    - the catalog entry (`G-2026-205`);
    - every unit's `### Topic list` and the `## Week schedule` topic column, Units 1-7
      (`G-2026-206`);
    - the Unit 2 formative line (`G-2026-207`);
    - the whole `## Reading list` and the readings criterion for every unit (`G-2026-208`,
      `G-2026-209`).
  - **Author repair outstanding:** the Unit 2 summative line.
  - The spec may not move to `status: approved` until these are ruled and repaired and a fresh
    intake runs on a newly prepared manifest.
  - Certifies no content, qualifies no reviewer (including the scholar review drafting note 7
    asks for), and authorises no publication.

## For specs/gaps.md

## G-2026-205 - GUHQ-301 has no `catalog/courses.json` entry; adding one re-opens bound G2/G3 manifests
- **Status:** open
- **Raised by:** `D-2026-0080` (agent:evaluator, 2026-10-31), GUHQ-301 intake
- **Detail:**
  - The identity values are settled: `G-2026-04` rules GUHQ-301, Fehm-e-Quran I, Semester III,
    1 (0-1). The spec's proposed entry (`specs/content/guhq-301/content-spec.md:14`) matches it and
    the Scheme (`B.Ed 4 Year 2026 revised after board.txt:281-289`, General Education).
  - `catalog/courses.json` lists no Semester 3 courses, so the intake `identity` criterion cannot
    be checked against the catalog.
  - Every G2 and G3 evidence manifest binds `catalog/courses.json` whole, so adding the entry
    stales them all.
  - The proposed `title_ur` "فہمِ قرآن - I" is given by neither the guide nor the Scheme.
- **Needed from the owner:**
  - whether and when to add the GUHQ-301 catalog entry, given the corpus-wide manifest
    invalidation;
  - confirmation of the Urdu title.
- **Blocks:** the catalog entry; authoring any GUHQ-301 unit under `docs/semester-3/guhq-301/`.

## G-2026-206 - GUHQ-301 topic partition: weeks as topics, against `D-2026-0070` item 1's "Topic N.k teaches guide section N.k"
- **Status:** open
- **Raised by:** `D-2026-0080` (agent:evaluator, 2026-10-31), GUHQ-301 intake
- **Detail:**
  - The guide names seven units (`3rd 2026.txt:135-217`). `D-2026-0070` item 1 (confirmed,
    every course) makes each topic one of the unit's numbered sections.
  - The spec makes each guide **week** a topic instead (`content-spec.md:59-69`; drafting notes
    4-5, `:410-411`). That gives units of 2, 4, 2, 3, 2, 1 and 1 topics. Topic 7.1 spans two
    weeks, despite the "one per week" column.
  - The guide's numbering is partial, so literal application needs positional numbering the guide
    does not print:
    - Unit 1 Week 1 (`:138-140`), Unit 2 Weeks 5-6 (`:158-164`) and Unit 3 Week 8
      (`:172-174`) are unnumbered;
    - Unit 4 (`:178-189`) is wholly unnumbered;
    - numbered items are one-line points.
  - A literal application gives units of 6, 12, 6, 9, 6, 4 and 4-6 topics.
  - Whether the ruling reaches one-line items in a week-divided guide is a scope question about
    an owner ruling.
- **Needed from the owner:** one of the following.
  - (a) Apply `D-2026-0070` item 1 literally (one topic per guide item, unnumbered items numbered
    by position).
  - (b) Confirm weeks as topics for GUHQ-301, stating how Week 15-16 is handled.
  - (c) Another grouping.
- **Blocks:** every unit's `### Topic list`, the `## Week schedule` topic column, the figure plans,
  reading-minute bands and per-topic bank distributions for Units 1-7. `G-2026-207` depends on it.

## G-2026-207 - GUHQ-301 Unit 2 formative count for a four-topic unit is not ruled
- **Status:** open
- **Raised by:** `D-2026-0080` (agent:evaluator, 2026-10-31), GUHQ-301 intake
- **Detail:**
  - Unit 2's blueprint states "formative 12 items, 3 per topic" for four topics
    (`content-spec.md:124`), extending `D-2026-0072`.
  - `D-2026-0072` "does not rule on units with four or more topics" (`specs/decisions/log.md:3921-3922`).
  - `style-guide.md:227` gives "5-8". The per-topic floor (`style-guide.md:237`) forces at least
    12.
  - The figure is internally consistent, but no ruling authorises it.
- **Needed from the owner:** the formative count for units of four or more topics (corpus-wide or
  for GUHQ-301), after `G-2026-206` fixes Unit 2's topic count.
- **Blocks:** the Unit 2 `**Assessment blueprint**` line.

## G-2026-208 - GUHQ-301 reading list: none of the guide's six entries identifies a single work
- **Status:** open
- **Raised by:** `D-2026-0080` (agent:evaluator, 2026-10-31), GUHQ-301 intake
- **Detail:** the guide's list (`3rd 2026.txt:219-224`):

  | Line | Entry | Problem |
  |---|---|---|
  | `:219` | "MuallimUl Quran (Vol 3) & related volumes" | no author or publisher |
  | `:220` | Fehmul Quran translations and commentaries, "various authors/editions" | a category, not a work |
  | `:221` | "Books on Asbāb al-Nuzūl ... and Seerah texts" | a category, not a work |
  | `:222` | "Rahman, U. (2025). Muallimul Quran (Vols. 3-5). [Course Book]." | no publisher |
  | `:223` | "TafseerTalim-ul-Quran (2 Vols.). Maktaba-tul-Madinah" | no author or edition |
  | `:224` | "Mafhoom-al-Quran (2nd ed.)" | no author; more than one Urdu work has a similar title |

  The spec:
  - merges `:219` and `:222` into one key (`content-spec.md:42`), a drafter judgement the guide
    does not make;
  - leaves `mafhoom-al-quran` bound to no unit (`:46`);
  - treats all six as print-only and title-level under `D-2026-0001`.
- **Needed from the owner:**
  - the intended work and edition (author, publisher, year) for `:219`, `:222`, `:223` and
    `:224`;
  - whether `:219` and `:222` are one series;
  - whether the two category entries may stand as categories;
  - whether any copy is obtainable, so that authors are not bound to title-level support.
- **Blocks:** the `## Reading list` Guide-listed table; the readings criterion for every unit.

## G-2026-209 - GUHQ-301 relies on `D-2026-0053` item 2 (author-selected sources, open-access floor), which is scoped to Semester 2
- **Status:** open
- **Raised by:** `D-2026-0080` (agent:evaluator, 2026-10-31), GUHQ-301 intake
- **Detail:**
  - The spec binds author-selected open-access sources and an `open_access_floor` `default: 1`
    "under `D-2026-0053` item 2" (`content-spec.md:34`).
  - That ruling's scope is "Semester 2 courses EFMP-305, EFMP-303, GQUR-301, GENG-301, GSOS-301,
    GPKS-402" (`specs/decisions/log.md:2541-2543`). GUHQ-301 is Semester 3.
  - The rows themselves check out:
    - `dukes-2010-treebank` (DOI `10.63317/5ca39mfekwbt`, OpenAlex `W48549471`) and
      `kadir-2022-asbab` (DOI `10.6007/ijarbss/v12-i6/13322`, OpenAlex `W4283369090`, diamond OA)
      resolve as cited;
    - every unit maps at least one OA row.
  - Units 1, 4 and 7 meet the floor only with Quran.com and the Leeds Quranic Arabic Corpus,
    which are primary-text and reference tools rather than scholarship.
- **Needed from the owner:** whether `D-2026-0053` item 2 extends to Semester 3 courses
  (corpus-wide or for GUHQ-301), and whether primary-text and reference tools satisfy the
  open-access floor.
- **Blocks:** the `## Reading list` Author-selected table and the `open_access_floor` front matter
  as a binding floor.
