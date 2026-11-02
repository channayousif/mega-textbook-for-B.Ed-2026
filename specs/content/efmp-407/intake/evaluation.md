# EFMP-407 - G0 intake / G1 unit-spec evaluation

- **Evaluator:** agent:evaluator, fresh session, 2026-10-31. This session did not draft
  `specs/content/efmp-407/content-spec.md`.
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (byte-identical to the bound copy,
  digest `77ff2fa9...de5ff2`).
- **Spec under evaluation:** `specs/content/efmp-407/content-spec.md` (`status: draft`).
- **Decision code:** `D-2026-0076`. **Gaps:** `G-2026-165` to `G-2026-169`. Entries to append are
  in `specs/content/efmp-407/intake/register-entries.md`. The registers themselves were not
  edited (parallel run instruction).
- **Overall outcome: partial.** Seven criteria approved (identity on the proposed entry's values
  only, partition, coverage at row level, outcomes, blueprint, structure, decision-residue).
  Readings is not approved and is escalated. One coverage carve-out (the guide's "Brundtland"
  listed as a conference) is escalated. The catalog entry does not exist and its addition is
  escalated. The spec must not move to `status: approved` on this evaluation.

## Bundle verification

- Manifest: `specs/content/efmp-407/intake/manifest.json`, prepared at commit `815d59fd`.
- Recomputed with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the ten intake roots
  of `scripts/prepare-intake-evidence.mjs` (`intakeRoots('efmp-407')`): **55 inputs, 0 digest
  mismatches, same key order**. `digest(JSON.stringify(input_manifest))` reproduces
  `manifest_digest` **`79a48658e6ee2e628cdf97e563f8712b8c0497ec79e45e1fb383d987adb740e8`**.
- Registers recomputed: `specs/decisions/log.md` `e9598a98...539da` and `specs/gaps.md`
  `383dcc3b...b5a` both unchanged from the recorded values.
- Worktree `/home/a2ahs/wt-sem3-intake` at `d7aabb98`; `git diff --name-only 815d59fd HEAD` lists
  only the six Semester 3 `intake/manifest.json` files, none of them a bound input. The working
  tree has no change under any bound root.
- Verifier script: the scratchpad script `verify407.mjs` (not committed).

## Criterion verdicts

| Criterion | Verdict | Disposition |
|---|---|---|
| identity | pass (proposed entry values) | approved, `D-2026-0076` item 1; catalog entry absent, `G-2026-165` |
| partition | pass | approved, `D-2026-0076` item 2 |
| coverage | pass at row level | approved, `D-2026-0076` item 3; Brundtland framing escalated, `G-2026-169` |
| outcomes | pass | approved, `D-2026-0076` item 4 |
| readings | not approved | escalated, `G-2026-166`, `G-2026-167`, `G-2026-168` |
| blueprint | pass | approved, `D-2026-0076` item 5 |
| structure | pass | approved, `D-2026-0076` item 6 |
| decision-residue | pass | approved, `D-2026-0076` item 7 |

### 1. identity - pass, on the proposed entry's values only

**EFMP-407 has no entry in `catalog/courses.json`.** The Semester 3 group there is empty
(`semesters[2].courses` is `[]`). The criterion as written compares the catalog with the guide
and the Scheme. It was judged here against the spec's **proposed** entry (`content-spec.md:12`),
as the parent instructed:

| Field | Guide `3rd 2026.txt` | Revised Scheme `B.Ed 4 Year 2026 revised after board.txt` | Proposed entry |
|---|---|---|---|
| Code | `CourseNo.EFMP-407` (`:316`) | `EFMP-407` (`:258`) | `EFMP-407` |
| Title | "Education for Sustainable Development (ESD)" (`:321`) | "Education for Sustainable Development" (`:260`) | "Education for Sustainable Development" |
| Credit hours | "3" (`:318-319`) | "3 (3-0)" (`:262`) | "3 (3-0)" |
| Category | "(Professional Course)" (`:322`) | "Major: Professional Course - VII" (`:264`; the source has an en dash) | "Major: Professional" |
| Semester | "3rd" (`:324`) | SEMESTER III (`:190`), row 5 (`:256`) | Semester 3 |

- The guide's parenthetical "(ESD)" is an abbreviation of the same title, not a second title.
  This is the reading the log already applies to dropped parentheticals (GQUR-300 identity,
  `specs/decisions/log.md:1170-1171`).
- The guide states a total and the Scheme supplies the split. A total and a split of the same
  total do not conflict (`specs/decisions/log.md:451-453`).
- The superseded board Scheme agrees (`B.Ed 4 Year board.txt:135-138`). There is no EFMP-407 file
  in `.specify/Course_guides_and_Scheme/` (`D-2026-0003`).
- `specs/gaps.md` holds no prior adjudication on EFMP-407.
- **No Article II.3 conflict** exists between the guide and the Scheme on code, title, credit
  hours, category or semester.
- `title_ur` ("پائیدار ترقی کے لیے تعلیم") is not given by the guide or the Scheme, and is not in
  `specs/content/terminology.csv`. The criterion does not judge it. It is listed here so the owner
  sees it when ruling on `G-2026-165`.
- **Not settled:** whether and when the entry is added to `catalog/courses.json`. Every G2/G3
  manifest binds that file whole, so adding the entry re-opens reviewed units. That is a question
  for the owner, not for the guide. It is escalated as `G-2026-165`. The approval covers the
  entry's values, not its existence.

### 2. partition - pass

- The guide gives eight numbered units with headings and weeks: Unit 1 `:341` (Weeks 1-2), Unit 2
  `:345` (3-4), Unit 3 `:349` (5-6), Unit 4 `:353` (7-8), Unit 5 `:357` (9-10), Unit 6 `:361`
  (11-12), Unit 7 `:366` (13-14), Unit 8 `:369` (15-16).
- The spec's eight `## Unit N` headings (`content-spec.md:89`, `:137`, `:184`, `:231`, `:279`,
  `:327`, `:374`, `:417`) and its week schedule (`:76-85`) reproduce the guide's titles, order and
  weeks exactly. The schedule invents no mid-term week (`:74`).
- Each topic is one guide section, as `D-2026-0070` item 1 (confirmed, every course) requires.
- **Within-guide numbering omission, resolved here.** The guide prints a section number on only
  five lines: 1.3 (`:344`), 2.3 (`:348`), 3.3 (`:352`), 5.1 (`:358`) and 7.2 (`:368`). The spec
  numbers the rest by position under the same heading (`:87`). Every printed number agrees with
  that positional rule: 1.3, 2.3 and 3.3 are third, 5.1 is first, 7.2 is second. No second
  document is involved, so this is resolvable under a `D-` code (`D-2026-0076` item 2).

### 3. coverage - pass at row level; one framing carve-out escalated

The guide has 22 section lines. The spec has 34 checklist rows. Every guide line maps to one or
more rows under its own section, and no row lacks a guide ancestor:

| Guide line | Rows |
|---|---|
| `:342` Definitions and evolution of SD | U1-01 |
| `:343` Major global conferences (Stockholm, Brundtland, Rio+20) | U1-02, U1-03, U1-04 |
| `:344` 1.3 Dimensions | U1-05 |
| `:346` UNESCO framework of ESD | U2-01 |
| `:347` ESD vs. Environmental Education | U2-02 |
| `:348` 2.3 Transformative learning and systems thinking | U2-03, U2-04 |
| `:350` Overview of SDGs with focus on SDG 4.7 | U3-01, U3-02 |
| `:351` Pakistan's National SDG Framework | U3-03 |
| `:352` 3.3 Education for global citizenship | U3-04 |
| `:354` Project-based and inquiry-based learning | U4-01, U4-02 |
| `:355` Systems and futures thinking | U4-03, U4-04 |
| `:356` Developing sustainability lesson plans | U4-05 |
| `:358` 5.1 Peace, gender equality, social justice | U5-01, U5-02, U5-03 |
| `:359` Human rights and inclusion | U5-04 |
| `:360` Indigenous knowledge systems | U5-05 |
| `:362` Green economy, sustainable consumption | U6-01, U6-02 |
| `:363` CSR | U6-03 |
| `:364` Ethical consumerism | U6-04 |
| `:367` National education policy and ESD integration | U7-01 |
| `:368` 7.2 Curriculum reforms and teacher education initiatives | U7-02, U7-03 |
| `:370` Planning and implementing sustainability projects | U8-01, U8-02 |
| `:371` Community participation and reporting | U8-03, U8-04 |

- A parse of the tables confirmed four things for all eight units. The `### Topic list`
  `Sub-topic IDs` form a total, disjoint partition of the checklist. Each row's `Topic` column
  matches its topic. Every ID carries its unit prefix. The figure IDs in the topic list equal
  those in the `**Figure plan**`.
- **Systems thinking appears twice in the guide**, at `:348` (Unit 2, principles) and `:355`
  (Unit 4, pedagogies). The spec gives each occurrence one row (U2-04, U4-03). U4-03 adds "in the
  classroom", which follows the guide's own Unit 4 heading "Pedagogies for Sustainability"
  (`:353`). Both rows have a guide ancestor, so this is not duplication by the spec.
- **Drafting note 4 is inaccurate but harmless.** The note (`content-spec.md:468`) says sections
  are split where the guide uses commas. In fact several "and"-joined sections were split (2.3,
  7.2, 8.1, 8.2), while 1.1 and 5.2, also "and"-joined, were not. No guide item is lost and no row
  is added either way, so coverage is unaffected. The author may wish to correct the note.
- **Carve-out, escalated as `G-2026-169`.** The guide lists "Brundtland" under "Major global
  conferences" (`:343`). The spec does four things with it:
  - It names the item "The Brundtland Report, *Our Common Future* (1987)" (U1-03, `:104`).
  - It keeps the topic title "The global conferences that shaped the idea" (`:113`).
  - It plans fig-U1-4, which compares "the three milestones" on "who met" (`:128`).
  - It lists "the Brundtland Report was a conference" as a misconception (`:120`). The spec
    would therefore teach the guide's own wording as an error.

  Whether to teach against the guide's text is a guide-versus-world question that the guide does
  not settle. The close precedent is `G-2026-102`, the EFMP-305 statute that did not resolve as
  named and was ruled by the owner in `D-2026-0053` item 7. The row itself (the guide's item,
  covered once) is approved. Its framing is not.
- Drafting note 3 says the 1992 Rio Earth Summit is not added as a sub-topic. That is correct and
  faithful to the guide.

### 4. outcomes - pass

The guide states six objectives (`:330-335`) and three learning outcomes (`:337-339`). Every SLO
traces to one of them, and every objective and outcome is reached by at least one unit:

| SLO | Spec trace | Guide ancestor |
|---|---|---|
| 1-1, 1-2 | obj 1 | `:330` define SD and its dimensions |
| 2-1, 2-2 | obj 2, LO (b) | `:331` philosophy and frameworks of ESD; `:338` systems thinking |
| 3-1, 3-2 | obj 3, 5, 6 | `:332` SDG 4.7; `:334` responsible citizenship; `:335` Pakistan |
| 4-1, 4-2 | obj 4, LO (a), (b) | `:333`; `:337` lesson planning; `:338` |
| 5-1, 5-2 | obj 1, 5, LO (b) | `:330` social dimension; `:334`; `:338` |
| 6-1, 6-2 | obj 1, 5 | `:330` economic dimension; `:334` |
| 7-1, 7-2 | obj 6 | `:335` ESD policy and implementation in Pakistan |
| 8-1, 8-2 | LO (c), obj 5 | `:339` community-based projects; `:334` |

- No SLO is an addition.
- The SLOs are recorded as ref IDs with parenthetical scope rather than full statements. The
  approved GPKS-402 spec uses the same form.

### 5. readings - not approved; escalated

The guide's reading list is present: eight entries, `:380-387`. The spec carries all eight in
`### Guide-required` (`content-spec.md:42-49`). Resolution results, using only Crossref and
OpenAlex:

| Guide entry | Result |
|---|---|
| UNESCO (2017) learning objectives `:380` | **Resolves.** Crossref DOI `10.54675/cgba9153` points to the guide's own ark `pf0000247444`. Not used in the spec, which could add it |
| Jones, Selby & Sterling (2010) `:381` | **Real work. The guide's locator is wrong.** Crossref: `10.4324/9781849770712` is Poore, *Changing Landscapes* (Routledge, 2012). `10.4324/9781849776516` is *Sustainability Education* (Routledge, 2010), which the spec substitutes |
| Government of Pakistan (2021) National SDG framework `:382` | **Unresolved.** The guide gives no locator and qualifies its own citation ("URL may vary by ministry portal"). No Crossref or OpenAlex record exists (exact-title filters returned 0). The year 2021 could not be verified |
| Orr (1992) `:383` | **The guide entry mixes two works.** Author, SUNY Press and 1992 match Orr, *Ecological Literacy: Education and the Transition to a Postmodern World* (OpenAlex W1567553845 / W49644396, dated 1991 there). The guide's subtitle "Educating our children for a sustainable world" is that of Stone & Barlow (eds.), *Ecological Literacy: Educating Our Children for a Sustainable World* (2005), OpenAlex W351659903. The spec picks Orr without naming the other candidate |
| Tilbury & Wortman (2004) `:384` | **Real work**: a 2005 review of it has DOI `10.1017/s0814062600001026` (OpenAlex W2506824458). The drafter says the guide's IUCN URL (node 8327) resolves to an unrelated record. Not tested here, because this run's URL checks were limited to Crossref and OpenAlex |
| Hopkins & McKeown (2005) `:385` | **Real work** (OpenAlex W2293242386, dated 2006 there). The unesdoc locator could not be tested (HTTP 403 to this host, `D-2026-0001`) |
| UNESCO (2014) DESD final report `:386` | **Not registry-verified.** There is no Crossref or OpenAlex record (exact-title and keyword searches). The unesdoc locator could not be tested (`D-2026-0001`) |
| Palmer (1998) `:387` | **Resolves.** Crossref `10.4324/9780203012659` is the Routledge e-book, issued 2002, which the spec discloses |

Monographs: Jones et al., Orr, Tilbury & Wortman and Palmer are books. Orr is print-only with no
DOI, so an author is held to title-level support (`D-2026-0001`, as the skill states).

**Author-selected supplement (`content-spec.md:57-70`, 14 rows).** For every row I checked
Crossref (title, authors, venue, volume, issue, pages, year), the OpenAlex ID and the
open-access status. All 14 match. Every licence claim matches OpenAlex, and every unit maps at
least one open-access source:
- U1: purvis, CC BY
- U2: kopnina, green; maurer, gold
- U3: akkari, CC BY; khoo, hybrid
- U4: boeve, gold; lim, green
- U5: zidny, owuor
- U6: al-nuaimi, zulfiqar, szmigin
- U7: jumani, diamond
- U8: wals, CC BY

The `Units` column agrees with every unit's `**Mapped readings**` line for all 22 keys.

Why readings is not approved:

1. **The supplement and the open-access floor rest on a ruling that does not reach this course
   (`G-2026-166`).** The spec cites `D-2026-0053` item 2 as its authority (`:34`, `:53`).
   `D-2026-0053`'s scope is "Semester 2 courses EFMP-305, EFMP-303, GQUR-301, GENG-301, GSOS-301,
   GPKS-402". The course guide does not determine author-selected readings. Extending an owner
   ruling beyond its declared scope is a scope judgement, so it is escalated. The same citation
   appears in at least `efmp-406`, `efpg-401` and `gicp-400` (observed by grep, not judged here).
2. **Several guide entries do not resolve as printed (`G-2026-167`).** These are the Jones DOI,
   the Orr two-work conflation, the unverified Tilbury URL, and the unregistered UNESCO 2014 and
   Government of Pakistan entries. The guide is internally inconsistent on Jones and Orr, and
   silent on the Government of Pakistan locator. Correcting a guide citation against an external
   registry is not something the guide determines. For Semester 2 the owner directed such
   corrections (`D-2026-0053` item 2, last sentence), but that direction does not reach this
   course.
3. **Topic 3.2 has no retrievable source for its own subject (`G-2026-168`).** Guide section
   `:351` *is* Pakistan's National SDG Framework, and that document is not retrievable.
   - Unit 3's other mapped readings (akkari, khoo, unesco-2017) are not about Pakistan's
     framework.
   - fig-U3-3 ("how the national framework passes priorities from federal to provincial plans")
     and fig-U3-4 ("selected national priority goals") need the framework's content (`:221-222`).
   - Drafting note 2 (`:466`) says "No unit relies on a figure from it", and the reading-list row
     says "no unit relies on it for a specific figure" (`:44`). Both are contradicted by those two
     figures.
   - fig-U7-1 also leans on it through Unit 7's mapping (`:404`, `:407`).

### 6. blueprint - pass

Checked against `specs/content/style-guide.md:225-250` and `:303-308`, and `D-2026-0072`
(confirmed, corpus-wide):

- **Formative.** Units 1-6 have three topics and state "formative 9 items, 3 per topic
  (D-2026-0072)". Units 7-8 have two topics and keep "5-8". With the gate-enforced floor of at
  least 3 per topic, two topics give at least 6, which the 5-8 band contains. No unit's floor is
  breached by its own items.
- **Unit-end bank.** Every unit has MCQ 10 (Remember to Apply), RRQ 10 (Understand to Analyze)
  and ERQ 5 (Analyze to Evaluate/Create), as the style guide requires (`:247-250`).
  - Per-topic minimums fit: at most 3 topics x 2 = 6 items, within 10.
  - ERQ arithmetic sums to 5 in every unit: 3 + 2 integrative for Units 1-6, and 2 x 2 + 1 for
    Units 7-8.
- **Summative.** Every unit names an Analyze-or-higher item. Units 1, 2 and 5 are Analyze;
  3, 6 and 7 are Evaluate; 4 and 8 are Create.
- **Weighting.** The guide's marks table (`:375-378`) does not label components formative or
  summative. The spec does not read a split into it. It applies the Constitution Art. III.7
  default (60/40) to unit banks and reports the guide's marks as given (`content-spec.md:25`).
  The constitution supplies the default where the guide is silent, so nothing here is a reading
  of the guide. This differs from `G-2026-75`, where a split was read into a guide table.
- **Depth.**
  - Three-topic units: per-topic 7-11 reading-min and unit band 35-55 (target 45, about ±22%).
  - Two-topic units: unit band 25-40 (about ±23%).
  - The new-shape parser (`scripts/lib/unit-depth.mjs:468`) accepts the "N topics;" infix, as on
    the approved GPKS-402 spec.
- **Figures.** Every topic plans at least 2 carriers, and every unit at least 1 concept-map,
  flowchart or timeline (`style-guide.md:513-515`).
- **Observation, not a finding.** Unit 7's summative item asks about "what they saw in a school"
  (`:381`). In a 3 (3-0) theory course that presumes a school visit the guide does not schedule.
  This is for the author to consider.

### 7. structure - pass

- **Front matter** `{course_code: EFMP-407, status: draft, open_access_floor: {default: 1}}`
  validates against `contracts/content-spec-frontmatter.schema.json` (ajv: valid).
  `open_access_floor` uses the mapping form `check:source-floor` reads.
- **Sections present:**
  - `## Course-wide items`, `## Course Description`, `## Reading list` (two tables) and
    `## Week schedule`.
  - Eight `## Unit N` blocks. Each has `### Sub-topic checklist` (with `Topic` column),
    `### Topic list`, `**Depth budget**`, `**Prerequisite knowledge**`,
    `**Common misconceptions**`, `**Mapped readings**`, `**Figure plan**` and
    `**Unit-end assessment blueprint**`.
- **Deterministic checks** run at `d7aabb98`, serially under `flock /tmp/mega-book-heavy.lock`:

| Command | Exit | Note |
|---|---|---|
| `validate:content` | 0 | |
| `check:pipeline-gate` | 0 | |
| `check:depth-gate` | 0 | vacuous for EFMP-407 (no unit authored) |
| `check:figures` | 0 | vacuous for EFMP-407 |
| `check:no-em-dash` | 0 | scans `specs/content`; the spec has 0 U+2014 |
| `check:no-answer-keys` | **1** | the only hit is `specs/content/efpg-401/content-spec.md` (a rubric heading matched the answer-material pattern), a sibling spec. EFMP-407 has 0 hits |
| `check:concept-graph` | 0 | vacuous for EFMP-407 |
| `check:bloom-bands` | 0 | vacuous for EFMP-407 |
| `check:source-floor` | 0 | vacuous for EFMP-407 (no `sources/`) |
| `check:docs-sync` | 0 | |
| `check:add-course` | 0 | |

- **Observation, not a finding.** The unbound Markdown contracts list two more course-level
  sections:
  - `## Course review plan` (`specs/008-rich-unit-pedagogy/contracts/content-spec-v3.md`).
  - `## Standards & frameworks anchors`, "present only where the subject engages them"
    (`specs/007-content-depth-standard/contracts/content-spec-v2.md`). An ESD course does engage
    UNESCO and SDG frameworks.

  Neither contract is a bound input. The bound style guide makes `course-review.mdx` optional
  (`style-guide.md:370`), and the approved GPKS-402 spec has neither section (`D-2026-0074`).
  Adding both is recommended to the author. They are not required for this approval.

### 8. decision-residue - pass

The confirmed entries whose scope reaches EFMP-407 are the corpus-wide or every-course ones:
`D-2026-0001`, `D-2026-0003`, `D-2026-0005`, `D-2026-0012`, `D-2026-0068`, `D-2026-0070` and
`D-2026-0072`. Course-scoped entries (EFMP-301/302/304, GNAS-301 and the Semester 2 set) do not
reach this course. `D-2026-0014` is limited to the 15 courses catalogued on 2026-09-20. I searched
the whole spec, not only the sections each entry names:

- **`D-2026-0070`.** There is no grouping of guide units anywhere. Every topic is a guide section.
  Nothing plans guide text or a guide link inside `course-overview.mdx` (grep: no
  `course-overview`, `CourseGuideNotice` or guide-PDF mention).
- **`D-2026-0072`.** "5-8" appears only on the two-topic Units 7 and 8 (`:381`, `:424`). All six
  three-topic units say 9.
- **`D-2026-0012`.** The guide has week ranges, and the schedule copies them without inventing a
  calendar.
- **`D-2026-0001`.** Unretrievable sources are flagged with a date (`:42`, `:44`, `:47-48`). The
  spec does not present them as read.
- **`D-2026-0003`.** No EFMP-407 file exists in `.specify/Course_guides_and_Scheme/`.

No superseded design survives. The spec's reliance on `D-2026-0053` is not residue, because that
ruling never reached this course. It is handled under readings (`G-2026-166`).

## Drafting notes tested

| Note | Finding |
|---|---|
| 1 Three misprinted locators | **Confirmed in part.** The Jones DOI is confirmed by Crossref (`10.4324/9781849770712` = Poore 2012). On Orr, the subtitle is confirmed as not Orr's, but the note does not say whose it is: it is Stone & Barlow 2005, so the entry may intend that book. The Tilbury URL was not tested (limited to Crossref and OpenAlex). `G-2026-167` |
| 2 National SDG framework not retrievable; "no unit relies on a figure from it" | First half: no registry record found. Second half: **contradicted** by fig-U3-3 and fig-U3-4 and by Topic 3.2 itself. `G-2026-168` |
| 3 Brundtland listed as a conference | **Confirmed** (`:343`). The spec's treatment teaches the guide's wording as a misconception, so it is escalated, not approved. `G-2026-169` |
| 4 Sub-topic splits on commas | Describes the splitting rule inaccurately ("and"-joined sections were split too). Coverage is unaffected |
| 5 Section numbers positional | **Confirmed**, and consistent with every printed number. Approved under `D-2026-0076` item 2 |

## Blocked until the escalations are ruled

- **Readings, all eight units.** Every unit maps at least one author-selected source, and every
  unit's open-access floor depends on the supplement (`G-2026-166`). The guide-entry corrections
  are blocked too (`G-2026-167`).
- **Unit 3 Topic 3.2** (U3-03, fig-U3-3, fig-U3-4) and fig-U7-1's sourcing (`G-2026-168`).
- **Unit 1 Topic 1.2 framing**: U1-03's wording, the topic title, fig-U1-3, fig-U1-4 and the
  Brundtland misconception line (`G-2026-169`).
- **Unit authoring and publication under `docs/semester-3/efmp-407/`** until the catalog entry
  exists (`G-2026-165`).

## Limits

- This record certifies no content, qualifies no reviewer and authorises no publication
  (Art. VII.8).
- Every approval in `D-2026-0076` binds to manifest digest `79a48658...0e8`. A change to any of
  the 55 bound inputs voids it, including the spec, the guide text, the catalog and the style
  guide.
