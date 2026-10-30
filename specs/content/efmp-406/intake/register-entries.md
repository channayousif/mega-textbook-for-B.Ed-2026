# EFMP-406 intake - entries for the registers

Drafted by agent:evaluator on 2026-10-31 for the parent to append verbatim. This run did not edit
either register. Full evaluation: `specs/content/efmp-406/intake/evaluation.md`.

## For specs/decisions/log.md

```markdown
## D-2026-0075 - EFMP-406 intake: partition (units), coverage, outcomes, blueprint, structure and decision residue approved; identity, topic grouping and readings escalated

- **Status:** pending-owner-review
- **Gate:** G0 intake / G1 unit-spec
- **Scope:** EFMP-406 Contemporary Literacies only, `specs/content/efmp-406/content-spec.md`
  (`status: draft`) at commit `815d59fd`. First intake. Evaluated in a fresh session that did not
  draft the spec. Settles the six-unit partition, sub-topic coverage, SLO traces, the unit
  assessment blueprints (for the two-topic grouping as drafted) and spec structure. Settles nothing
  about the course title, the catalog entry, the topic grouping or the reading list.
- **Decided by:** agent:evaluator, 2026-10-31
- **Decision:**
  1. **identity: not approved (escalated).** `catalog/courses.json` has **no EFMP-406 entry**:
     Semester 3 is empty. I judged the spec's proposed entry (`content-spec.md:12`). Its code
     (`EFMP-406`), credit hours (`3 (3-0)`; the guide's bare `3` does not contradict the Scheme's
     split), semester (3) and category ("Major: Professional") agree with the guide and the Scheme.
     The title does not: the guide says "Contemporary Literacy" and the Scheme says "Contemporary
     Literacies" (`G-2026-155`). Adding the entry is an owner call (`G-2026-156`).
  2. **partition: approved for units.** One unit per guide unit, in the guide's order and with the
     guide's titles (Units 1-6), as `D-2026-0070` item 1 requires. The week schedule is recorded as
     guide-silent with no invented calendar (`D-2026-0012`). The 2+2 **topic** grouping is **not**
     approved (`G-2026-157`).
  3. **coverage: approved.** All 24 guide bullets appear once each in the six `### Sub-topic
     checklist` tables (U1-01..U6-04), verbatim apart from "centred". The spec adds no sub-topic.
  4. **outcomes: approved.** The five guide outcomes are reproduced verbatim. Each unit's two SLOs
     are scoped to that unit's guide bullets and trace to guide outcomes, and all five outcomes are
     reached.
  5. **readings: not approved (escalated).** The guide's list is present and its entries are real
     works, but all five are about inclusive education, and the spec concedes they support only
     U6-02 (`G-2026-158`). The spec's author-selected open-access list (eleven DOIs, all verified
     against Crossref and OpenAlex on 2026-10-31) and its `open_access_floor` rest on `D-2026-0053`
     item 2, whose scope is Semester 2 (`G-2026-159`).
  6. **blueprint: approved for the two-topic grouping as drafted.** Formative 5-8 (two topics times
     the per-topic floor of 3 gives at least 6), one Analyze-or-higher summative item, 60/40
     default, MCQ/RRQ/ERQ 10/10/5 in the style guide's Bloom bands, ERQ "2 per topic + 1" = 5. All
     are consistent with `specs/content/style-guide.md:225-252`, and `check:bloom-bands` parses
     every band.
  7. **structure: approved.** Front matter validates against
     `contracts/content-spec-frontmatter.schema.json`. Each unit's topic list is a total, disjoint
     partition of its checklist, with 2 figures per topic and at least one schematic per unit. The
     depth budget parses as 55-75. Gate exits: `validate:content`, `check:pipeline-gate`,
     `check:depth-gate`, `check:figures`, `check:no-em-dash`, `check:source-floor`,
     `check:bloom-bands`, `check:concept-graph` and `check:map-sources` all 0.
     `check:no-answer-keys` is 1, solely on `specs/content/efpg-401/content-spec.md`, not on this
     course. Most gates pass vacuously because no EFMP-406 docs exist.
  8. **decision-residue: approved.** I searched the whole spec against `D-2026-0070`,
     `D-2026-0072`, `D-2026-0012`, `D-2026-0001`, `D-2026-0003` and `D-2026-0005`, and found no
     superseded design.
- **Author repairs required (guide-determined):**
  1. `:26`: report the guide's second assessment block, `:306-310` (class test, mid-term test,
     evaluation of assignments, class attendance, class participation).
  2. `:45`: Loreman et al.'s 2005 title is *Inclusive Education: A Practical Guide to Supporting
     Diversity in the Classroom*.
  3. `:57`: Minott's subtitle, "A confirmatory investigation".
  4. `:14`: the title note overstates what the catalog `_note` settles (`specs/gaps.md:23-24`).
- **Basis:** `Scheme-and-Course-guides/extracted-text/3rd 2026.txt`, the EFMP-406 block `:228-310`:
  code `:229`, credit hours `:232`, title `:235`, semester `:236`, description `:238-239`,
  outcomes `:242-246`, Units 1-6 `:249-278`, strategies `:279-284`, assessment `:285-289` and
  `:306-310`, references `:290-295`. Scheme
  `Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt:244-254`
  (Semester III row 4). The units, bullets and outcomes are stated in the guide, so it determines
  everything approved above.
- **Bound to:** `specs/content/efmp-406/intake/manifest.json`, manifest digest
  `0888f6078ade5c2962215b463ceed596a717a99221e9fbecb71e743ad2953faf`, 55 inputs at commit
  `815d59fd8d672b34468b9814a0a2500ade3b80a0`. Recomputed independently with `manifestFor()`:
  every path and digest matched. Registers at read time: `specs/decisions/log.md` `e9598a98...`,
  `specs/gaps.md` `383dcc3b...` (recorded, not freshness-bearing). **Any change to a bound input
  voids this approval** (Art. VII.8.5).
- **Limits:** Blocked until ruled:
  - identity (`G-2026-155`, `G-2026-156`);
  - the topic grouping in all six units (`G-2026-157`), with the blueprint and figure plan
    approvals in items 6-7 contingent on it;
  - `## Reading list`, every unit's `**Mapped readings**` and the `open_access_floor` declaration
    (`G-2026-158`, `G-2026-159`).

  The spec stays `status: draft`, and no unit may be authored. A fresh intake on a newly prepared
  manifest is required after the rulings and repairs. This decision does not add the catalog entry.
  It certifies no content, qualifies no reviewer and authorises no publication (Art. VII.8).
```

## For specs/gaps.md

```markdown
## G-2026-155 - EFMP-406 title: the guide says "Contemporary Literacy", the revised Scheme says "Contemporary Literacies"

- **Status:** open
- **Gate:** G0 intake, `identity` criterion (Art. II.3)
- **Raised by:** agent:evaluator, 2026-10-31, under `D-2026-0075`
  (`specs/content/efmp-406/intake/manifest.json`, digest `0888f607...53faf`)
- **Detail:** the Faculty course guide titles the course "Contemporary Literacy"
  (`Scheme-and-Course-guides/extracted-text/3rd 2026.txt:235`). The revised board Scheme (final
  authority) lists "Contemporary Literacies" (`B.Ed 4 Year 2026 revised after board.txt:248`), and
  so does the superseded scheme (`B.Ed 4 Year board.txt:130`). The guide's own body uses the
  singular throughout (`:242`, `:245`, `:269`, `:277`). The spec's proposed catalog entry follows
  the Scheme (`content-spec.md:12-14`). The gaps-log header (`:23-24`) holds that each
  guide-vs-scheme conflict is decided by the owner on its merits, and no ruling covers this title.
  The difference changes no content.
- **Needed, and from whom:** the curriculum owner, to state the course's English title of record.
- **Blocks:** the `identity` criterion for EFMP-406 and the `title_en` of its catalog entry.

---

## G-2026-156 - EFMP-406 has no `catalog/courses.json` entry; adding one re-opens every bound G2/G3 manifest

- **Status:** open
- **Gate:** G0 intake, `identity` criterion
- **Raised by:** agent:evaluator, 2026-10-31, under `D-2026-0075`
- **Detail:** `catalog/courses.json` Semester 3 is empty. The `_note` calls Semesters 3-8
  "placeholders pending G0 course intake", and EFMP-406 is not listed. The `identity` criterion
  compares the catalog with the guide and Scheme, so it cannot pass while there is no entry. The spec
  states a proposed entry instead (`content-spec.md:12`): `EFMP-406`, `3 (3-0)`,
  "Major: Professional", Semester 3. This evaluation found the code, credit hours, semester and
  category consistent with guide and Scheme. The title is `G-2026-155`. `title_ur` ("عصری خواندگیاں")
  is not determined by any bound input, and "literacy" is not in `specs/content/terminology.csv`.
  Every G2/G3 manifest binds `catalog/courses.json` whole (open `G-2026-71`), so adding this course
  stales all outstanding review evidence. The same applies to every other Semester 3 course whose
  intake runs now.
- **Needed, and from whom:** the curriculum owner, to rule whether and when Semester 3 entries are
  added (singly or as one batch), and to approve `title_en` and `title_ur`. Possibly the owner and
  WebLead together, if `G-2026-71`'s narrowing of the catalog binding is decided first.
- **Blocks:** the `identity` criterion for EFMP-406; any G2 authoring for the course (`docs/`
  validation keys on the catalog).

---

## G-2026-157 - EFMP-406: the guide's unit bullets are unnumbered, so `D-2026-0070` item 1 does not settle the topic grouping

- **Status:** open
- **Gate:** G1 unit-spec, `partition` criterion (topic level)
- **Raised by:** agent:evaluator, 2026-10-31, under `D-2026-0075`
- **Detail:** the guide gives six named units, each with four **unnumbered** bullets
  (`3rd 2026.txt:249-278`). `D-2026-0070` item 1 requires "each topic is one of that chapter's
  numbered sections (Topic N.k teaches guide section N.k)". The spec groups each unit's four
  bullets two-and-two into two topics (`### Topic list` in each `## Unit N`; drafting note 3,
  `content-spec.md:350`). That grouping is the drafter's construction. Under the alternative
  reading (a bullet is a section, one topic per bullet), each unit has four topics, and the
  blueprint breaks against itself:
  - "2 ERQs per topic + 1" would need 9 ERQs in a bank of 5;
  - the per-topic formative floor gives 12 items, above "5-8", and `D-2026-0072` rules only on
    three-topic units;
  - the figure plan would need 8 figures per unit.
- **Needed, and from whom:** the curriculum owner, to rule whether unnumbered guide bullets count
  as "sections" under `D-2026-0070` item 1. If they do, the owner should also rule the formative
  count for four-topic units, which `D-2026-0072` leaves open. Other Semester 3 guides with
  unnumbered bullets raise the same question.
- **Blocks:** the `### Topic list` of all six EFMP-406 units. `D-2026-0075`'s blueprint and
  structure approvals are contingent on the grouping as drafted.

---

## G-2026-158 - EFMP-406: the guide block's reading list, project and school-visit strategy are about inclusive education, not literacy

- **Status:** open
- **Gate:** G0 intake, `readings` criterion (Art. II.3: which document is authoritative)
- **Raised by:** agent:evaluator, 2026-10-31, under `D-2026-0075`
- **Detail:** the EFMP-406 block's outline (`3rd 2026.txt:248-278`) and outcomes (`:242-246`) are
  about literacy. Its references (`:290-295`) are about inclusive education: Booth and Ainscow 2016;
  Mittler 2019; Loreman, Deppeler and Harvey 2020; UNESCO 2017; Government of Pakistan 2018. So are
  its 30% project, "Developing an inclusive lesson plan" (`:288`), and its "Visits to inclusive
  schools" strategy (`:283`). The spec concedes the list supports one checklist row of 24 (U6-02)
  and relies on it for no literacy claim (`content-spec.md:39`). `G-2026-73` already reported this
  list "may be a misplaced list" (EFMP-305 has none), for information only, and `D-2026-0053` did
  not rule on it. Two entries also carry years that resolve to no edition in Crossref or OpenAlex:
  Mittler 2019 (Crossref `10.4324/9780203386149` is the 2012 Routledge reissue of the 2000 work)
  and Loreman et al. 2020 (2005 and 2010 editions only).
- **Needed, and from whom:** the curriculum owner, if necessary with the Faculty, to say:
  - whether the inclusion material in the EFMP-406 block belongs to EFMP-406 or was carried over
    from another course (EFMP-305);
  - if it does belong, whether the 30% project stays an inclusive lesson plan;
  - which editions the two unresolved years stand for.
- **Blocks:** the `readings` criterion for EFMP-406; `## Reading list` "Guide-listed" (`:37-47`);
  Unit 6 `**Mapped readings**`. It informs, but does not block, the course-wide assessment line.

---

## G-2026-159 - EFMP-406: author-selected readings and the open-access floor rely on `D-2026-0053` item 2, which is scoped to Semester 2

- **Status:** open
- **Gate:** G0 intake, `readings` criterion
- **Raised by:** agent:evaluator, 2026-10-31, under `D-2026-0075`
- **Detail:** with the guide's list unusable for Units 1-5 (`G-2026-158`), the spec binds eleven
  author-selected open-access works and declares `open_access_floor: {default: 1}`, both "under
  `D-2026-0053` item 2" (`content-spec.md:35`, `:51`). `D-2026-0053`'s scope is "Semester 2 courses
  EFMP-305, EFMP-303, GQUR-301, GENG-301, GSOS-301, GPKS-402", and no confirmed decision extends it.
  The eleven works themselves check out: each DOI resolves in Crossref to the cited work, each is
  open access in OpenAlex, and every unit maps at least one. Only the authority to use them is in
  question.
- **Needed, and from whom:** the curriculum owner, to rule whether `D-2026-0053` item 2 (verified
  author-selected readings, labelled as such, with at least one open-access source per unit in the
  mapping form) extends to EFMP-406, or to all Semester 3 courses. The other Semester 3 intakes
  running now may raise the same question, and one ruling can answer them all.
- **Blocks:** the `readings` criterion for EFMP-406; `## Reading list` "Author-selected" (`:49-65`);
  every unit's `**Mapped readings**`; the front-matter `open_access_floor` declaration.
```

IDs used: `D-2026-0075`; `G-2026-155`, `G-2026-156`, `G-2026-157`, `G-2026-158`, `G-2026-159`.
`G-2026-160` to `G-2026-164` are unused.
