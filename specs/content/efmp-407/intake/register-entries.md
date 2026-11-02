# EFMP-407 intake - register entries for the parent to append

Written by agent:evaluator, 2026-10-31. The registers were not edited directly (parallel run).
Full criterion-by-criterion detail: `specs/content/efmp-407/intake/evaluation.md`.

## For specs/decisions/log.md

## D-2026-0076 - EFMP-407 intake: identity (proposed entry), partition, coverage, outcomes, blueprint, structure and decision residue approved; readings, the Brundtland framing and the catalog entry escalated

- **Status:** pending-owner-review
- **Gate:** G0 intake / G1 unit-spec
- **Scope:** EFMP-407 Education for Sustainable Development, `specs/content/efmp-407/content-spec.md`
  (status: draft), bundle prepared at commit `815d59fd`. This entry settles seven things:
  - identity, on the values of the spec's proposed catalog entry only;
  - the eight-unit partition and its section numbering;
  - row-level coverage, except the framing escalated in `G-2026-169`;
  - outcome traces;
  - the assessment blueprints of all eight units;
  - structure;
  - decision residue.

  It does not settle readings.
- **Decided by:** agent:evaluator, 2026-10-31 (fresh session; did not draft the spec)
- **Decision:**
  1. **identity - approved on the proposed values.** The values are EFMP-407, "Education for
     Sustainable Development", 3 (3-0), Major: Professional, Semester 3. The guide gives code
     `:316`, title `:321` (with "(ESD)", an abbreviation of the same title), credit total "3"
     `:318-319`, "(Professional Course)" `:322` and semester `:324`. The revised Scheme gives
     `:258-264` (row 5 of Semester III, `:190`): `3 (3-0)`, Major: Professional Course - VII. The
     two documents do not conflict under Art. II.3. **The entry does not exist in
     `catalog/courses.json`.** Whether it is added is escalated in `G-2026-165`, and this item
     does not approve the entry's existence.
  2. **partition - approved.** The guide names eight units with weeks (`:341`, `:345`, `:349`,
     `:353`, `:357`, `:361`, `:366`, `:369`). The spec has one unit per guide unit in guide order,
     with the guide's titles and weeks 1-16, and each topic is one guide section (`D-2026-0070`
     item 1). The guide prints section numbers only on 1.3, 2.3, 3.3, 5.1 and 7.2. Numbering the
     other sections by position under their heading agrees with every printed number. This is a
     within-guide omission with no second document in conflict, and it is resolved here.
  3. **coverage - approved at row level.** All 22 guide section lines (`:342-371`) map to 34
     checklist rows under their own sections. No row lacks a guide ancestor. The topic lists form
     a total, disjoint partition of each checklist. Systems thinking appears twice because the
     guide lists it twice (`:348`, `:355`). U1-03's framing of "Brundtland" is **not** approved
     (`G-2026-169`).
  4. **outcomes - approved.** All 16 SLOs (two per unit) trace to the guide's six objectives
     (`:330-335`) or three learning outcomes (`:337-339`), and every objective and outcome is
     reached.
  5. **blueprint - approved, all eight units.**
     - Formative: three-topic Units 1-6 carry 9 items (`D-2026-0072`); two-topic Units 7-8 keep
       5-8, which the gate floor of at least 6 does not breach.
     - Unit-end bank: 10/10/5 with the style guide's Bloom bands; per-topic minimums fit; ERQ
       arithmetic sums to 5.
     - Summative: Analyze-or-higher in every unit.
     - Weighting: Art. III.7 default 60/40, because the guide's marks table (`:375-378`) states
       no formative/summative split.
     - Depth bands 35-55 and 25-40, within the style guide's tolerance.
     - Figure plans: at least 2 per topic and at least 1 schematic per unit.
  6. **structure - approved.** The front matter is valid against
     `contracts/content-spec-frontmatter.schema.json`. Every required course-level section and
     per-unit block is present.
  7. **decision-residue - approved.** I searched the whole spec against `D-2026-0001`, `0003`,
     `0005`, `0012`, `0068`, `0070` and `0072`, and no superseded design survives.
- **Not approved:**
  - **readings - escalated.** The guide's eight entries are present.
    - The author-selected supplement and the open-access floor cite `D-2026-0053` item 2, whose
      scope is Semester 2 (`G-2026-166`).
    - Several guide entries do not resolve as printed (`G-2026-167`): the Jones et al. DOI is
      Poore 2012; the Orr entry mixes Orr 1992 with Stone & Barlow 2005; the Tilbury URL is
      unverified here; UNESCO 2014 and the Government of Pakistan framework have no registry
      record.
    - Topic 3.2 has no retrievable source for its own subject, contrary to drafting note 2
      (`G-2026-168`).
  - **Unit 1 Topic 1.2 Brundtland framing** - escalated (`G-2026-169`).
  - **Catalog entry** - escalated (`G-2026-165`).
  - **Blocked until ruled:**
    - readings for all eight units;
    - Unit 3 Topic 3.2 (U3-03, fig-U3-3, fig-U3-4) and fig-U7-1's sourcing;
    - Unit 1 Topic 1.2's U1-03 wording, topic title, fig-U1-3, fig-U1-4 and misconception line;
    - all authoring and publication under `docs/semester-3/efmp-407/` until the catalog entry
      exists.

    The spec must not move to `status: approved` on this entry.
- **Basis:**
  - Guide `Scheme-and-Course-guides/extracted-text/3rd 2026.txt:312-387`.
  - Revised Scheme `Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after
    board.txt:190-264`. The superseded board Scheme agrees (`B.Ed 4 Year board.txt:135-138`).
  - `specs/content/style-guide.md:225-250`, `:303-308`, `:370`, `:513-515`.
  - Confirmed `D-2026-0001`, `D-2026-0003`, `D-2026-0012`, `D-2026-0053` (scope checked),
    `D-2026-0070`, `D-2026-0072`.
  - Crossref and OpenAlex lookups of all 22 reading rows on 2026-10-31.
  - Deterministic checks at `d7aabb98` (which differs from `815d59fd` only by six intake
    manifests, none bound):
    - exit 0: validate:content, pipeline-gate, depth-gate, figures, no-em-dash, concept-graph,
      bloom-bands, source-floor, docs-sync and add-course. The unit-level checks pass vacuously,
      because no EFMP-407 unit is authored.
    - exit 1: no-answer-keys. The only hit is `specs/content/efpg-401/content-spec.md`, a sibling
      spec; EFMP-407 has 0 hits.

  Detail is in `specs/content/efmp-407/intake/evaluation.md`.
- **Bound to:** `specs/content/efmp-407/intake/manifest.json`, manifest digest
  `79a48658e6ee2e628cdf97e563f8712b8c0497ec79e45e1fb383d987adb740e8`. That is 55 inputs at
  commit `815d59fd`, recomputed with `manifestFor()`: 0 digest mismatches, and the digest is
  reproduced. Registers at read time: `specs/decisions/log.md` `e9598a98...539da`,
  `specs/gaps.md` `383dcc3b...b5a`, both unchanged. A change to any bound input voids this
  approval.
- **Limits:**
  - This entry certifies no content, qualifies no reviewer and authorises no publication
    (Art. VII.8).
  - It does not add EFMP-407 to the catalog.
  - It does not approve the Urdu title "پائیدار ترقی کے لیے تعلیم", which neither the guide nor
    the Scheme gives and which is not in `terminology.csv`.
  - It does not extend `D-2026-0053` to Semester 3.
  - It does not decide which "Ecological Literacy" the guide means, or how Brundtland is taught.

## For specs/gaps.md

## G-2026-165 - EFMP-407 is not in `catalog/courses.json`, and adding it re-opens every bound G2/G3 manifest

- **Status:** open
- **Gate:** G0 intake (identity criterion)
- **Source:** `D-2026-0076`
- **Detail:** The identity criterion compares `catalog/courses.json` with the guide and the
  Scheme. The catalog's Semester 3 group is empty, so the spec states a proposed entry instead
  (`specs/content/efmp-407/content-spec.md:12`). The proposed values agree with the guide
  (`3rd 2026.txt:316-324`) and the revised Scheme (`B.Ed 4 Year 2026 revised after
  board.txt:258-264`), and `D-2026-0076` item 1 approves those values. Every G2 and G3 evidence
  manifest binds `catalog/courses.json` whole, so adding any course voids the evidence of every
  reviewed unit. This is a question about process and timing, which the guide cannot answer. The
  same question applies to every Semester 3 spec in this intake batch (EFMP-406, EFPG-401,
  GICP-400, GISS-401, GUHQ-301), which have no catalog entries either. The proposed `title_ur` is
  not guide-given and not banked in `terminology.csv`.
- **Needed, and from whom:** the curriculum owner, to decide when and how Semester 3 courses
  enter the catalog. For example, the owner could add them all in one change before Semester 3
  authoring, or narrow what G2/G3 manifests bind from the catalog first. The owner should also
  confirm the Urdu title.
- **Blocks:** authoring and publication of any unit under `docs/semester-3/efmp-407/`. It does not
  block the other approved criteria of `D-2026-0076`.

## G-2026-166 - EFMP-407's author-selected readings and open-access floor cite `D-2026-0053` item 2, which is scoped to Semester 2

- **Status:** open
- **Gate:** G0 intake (readings criterion)
- **Source:** `D-2026-0076`
- **Detail:** The spec adds 14 author-selected open-access works (`content-spec.md:57-70`) and
  declares `open_access_floor: {default: 1}`. Its stated authority is `D-2026-0053` item 2
  (`:34`, `:53`). `D-2026-0053`'s scope line names only the Semester 2 courses EFMP-305,
  EFMP-303, GQUR-301, GENG-301, GSOS-301 and GPKS-402. The course guide does not determine
  author-selected readings. The guide's own list (`3rd 2026.txt:380-387`) exists but is defective
  (`G-2026-167`), which is the condition item 2 addresses, but applying the ruling here would
  extend an owner ruling past its declared scope. The 14 works themselves all verify:
  - Crossref metadata and OpenAlex IDs match;
  - every licence or open-access claim matches OpenAlex;
  - every unit maps at least one open-access source;
  - the `Units` column agrees with every `**Mapped readings**` line.

  The same citation of `D-2026-0053` appears in at least the `efmp-406`, `efpg-401` and
  `gicp-400` specs.
- **Needed, and from whom:** the curriculum owner, to say whether `D-2026-0053` item 2 (and,
  if wanted, item 4) extends to Semester 3 or corpus-wide.
- **Blocks:** the readings criterion for all eight EFMP-407 units, and with it every unit's
  open-access floor.

## G-2026-167 - EFMP-407 guide reading list: entries that do not resolve as printed

- **Status:** open
- **Gate:** G0 intake (readings criterion)
- **Source:** `D-2026-0076`
- **Detail:** All lookups below use Crossref and OpenAlex, 2026-10-31.
  1. **Jones, Selby & Sterling (2010)** (`3rd 2026.txt:381`). The guide's DOI
     `10.4324/9781849770712` is Poore, *Changing Landscapes* (Routledge, 2012). The book cited is
     `10.4324/9781849776516` (Routledge, 2010), which the spec substitutes.
  2. **Orr (1992)** (`:383`). The entry mixes two works:
     - Orr, *Ecological Literacy: Education and the Transition to a Postmodern World* (SUNY, 1992;
       OpenAlex W1567553845) matches the author, publisher and year.
     - Stone & Barlow (eds.), *Ecological Literacy: Educating Our Children for a Sustainable World*
       (2005; OpenAlex W351659903) matches the subtitle.

     The spec picks Orr and does not name the other candidate.
  3. **Tilbury & Wortman (2004)** (`:384`). The work is real: a 2005 review has DOI
     `10.1017/s0814062600001026`. The drafter reports that the guide's IUCN URL (node 8327) is an
     unrelated record. The evaluator did not test this.
  4. **UNESCO (2014) DESD final report** (`:386`). There is no Crossref or OpenAlex record, and
     unesdoc returns HTTP 403 to this host (`D-2026-0001`).
  5. **Government of Pakistan (2021) National SDG framework** (`:382`). The guide gives no locator
     and qualifies its own citation. There is no registry record, and the year is unverified.

  The guide is internally inconsistent on items 1 and 2 and silent on item 5's locator.
  Correcting a guide citation against an external registry is not something the guide determines.
  For Semester 2 the owner directed such corrections (`D-2026-0053` item 2), but that direction
  does not reach this course.
- **Needed, and from whom:** the curriculum owner, to rule four things:
  - whether the spec may carry corrected locators for guide entries;
  - which *Ecological Literacy* the guide requires;
  - whether UNESCO 2014 and the Government of Pakistan framework may stand flagged under
    `D-2026-0001`;
  - whether the guide's misprints should be reported to the Faculty.
- **Blocks:** the readings criterion. The rows affected are jones-selby-sterling-2010,
  orr-1992-ecoliteracy, tilbury-wortman-2004, unesco-2014-desd-final and
  gop-national-sdg-framework (Units 1, 2, 3, 4, 7, 8).

## G-2026-168 - EFMP-407 Topic 3.2 teaches Pakistan's National SDG Framework with no retrievable source for it

- **Status:** open
- **Gate:** G0 intake (readings criterion); G1 unit-spec for Unit 3
- **Source:** `D-2026-0076`
- **Detail:** Guide section `3rd 2026.txt:351` is "Pakistan's National SDG Framework", so the
  document is the topic itself. Its only bound reading is gop-national-sdg-framework, which has no
  working locator (`content-spec.md:44`). Unit 3's other mapped readings (akkari-maleq-2020-gce,
  khoo-jorgensen-2021, unesco-2017-esd-objectives) are not about Pakistan's framework.
  - fig-U3-3 plans "how the national framework passes priorities from federal to provincial plans
    and to schools", and fig-U3-4 plans "selected national priority goals" (`:221-222`). Both
    need the framework's content.
  - Drafting note 2 (`:466`) says "No unit relies on a figure from it", and the row note says "no
    unit relies on it for a specific figure" (`:44`). Both statements are contradicted by these
    figures and by Topic 3.2.
  - Unit 7's policy timeline fig-U7-1 also maps to the framework (`:404`, `:407`).

  The style guide (`:290-293`) allows a sub-topic with no findable source to be covered from the
  guide and general knowledge with a `no-external-source` row, but it requires the gap to be
  escalated, which this entry does.
- **Needed, and from whom:**
  - The curriculum owner, to choose one of three routes: provide a retrievable copy of the
    framework; authorise a verified substitute that describes it (which depends on
    `G-2026-166`); or rule that Topic 3.2 is taught at title level with that limit disclosed and
    the figure plans narrowed.
  - The author, to correct drafting note 2 and the row note whichever route is chosen.
- **Blocks:** Unit 3 Topic 3.2 (U3-03, fig-U3-3, fig-U3-4), and the sourcing of fig-U7-1.

## G-2026-169 - EFMP-407 Unit 1: the guide lists "Brundtland" as a global conference; the spec teaches that as a misconception

- **Status:** open
- **Gate:** G1 unit-spec (coverage criterion, framing only)
- **Source:** `D-2026-0076`
- **Detail:** The guide's section 1.2 is "Major global conferences (Stockholm, Brundtland,
  Rio+20)" (`3rd 2026.txt:343`). The spec covers the item once (U1-03, `content-spec.md:104`),
  and the row is approved. Its framing departs from the guide in four places:
  - U1-03 names it "The Brundtland Report, *Our Common Future* (1987)".
  - The topic keeps the title "The global conferences that shaped the idea" (`:113`).
  - fig-U1-4 compares "the three milestones" on "who met" (`:128`).
  - The unit lists "the Brundtland Report was a conference" as a common misconception (`:120`).

  So the unit would teach the guide's own wording as an error, and student-teachers examined
  against the guide may meet the guide's framing. Whether to teach against the guide's text is a
  guide-versus-world question the guide does not settle. The precedent is `G-2026-102` (EFMP-305
  statute), which the owner ruled in `D-2026-0053` item 7. Relatedly, the spec correctly does
  not add the 1992 Rio Earth Summit as a sub-topic. The owner may wish to say whether U1-01's
  "evolution of SD" prose and the fig-U1-3 timeline may mention it.
- **Needed, and from whom:** the curriculum owner, to rule how Topic 1.2 presents Brundtland.
  The options include: as the 1987 commission report, noting the guide's wording; as the guide
  words it; or as a report placed among conferences, without a misconception line.
- **Blocks:** Unit 1 Topic 1.2: U1-03's wording, the topic title, fig-U1-3, fig-U1-4 and the
  Brundtland misconception line.
