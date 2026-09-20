# Gate Decision Log

Every gate approval that was not made by the curriculum owner in person is recorded here under a
stable code, with the basis it rested on and the inputs it was bound to. The owner reviews entries
in batches and sets `confirmed` or `reversed`.

This register is the counterpart to `specs/gaps.md`. That log records **questions escalated to the
owner**; this one records **decisions taken on the owner's behalf**, so both directions of the
delegation are auditable from the repository alone.

Status: `pending-owner-review` (taken, awaiting the owner) - `confirmed` - `reversed`.

A reversal reopens the gate. It never rewrites the original entry, because the point of the log is
that a decision and its basis remain inspectable after the fact.

## What is NOT delegated

Recorded here so the boundary stays visible as the log grows:

- **Article II.3 discrepancies** - a conflict between the board Scheme of Study and a course guide
  is an adjudication about which external document is authoritative. No agent can settle that; it
  is a question about the world, not the repository. These continue to escalate via
  `specs/gaps.md`.
- **Publication authority** (Constitution Art. VII.1) and **reviewer qualification** (Art. VII.5).
- Anything an evaluator marks as not determined by the course guide.

---

## D-2026-0001 - Unretrievable sources may be flagged and passed

- **Status:** confirmed
- **Gate:** G3 (English review), `sources` criterion
- **Scope:** corpus-wide
- **Decided by:** curriculum owner, 2026-09-19
- **Decision:** A source whose text cannot be obtained may be flagged "Could not be retrieved on
  \<date\>" and the work proceeds, rather than blocking the gate indefinitely.
- **Basis:** Four independent G3 reviews of EFMP-302 Units 3-6 (run 002, reports under
  `specs/content/efmp-302/reviews/unit-0N/G3/`) all returned `escalate`, and all four concluded
  independently that the surviving `sources` findings could not be closed by further authoring:
  the publishers do not serve the text to this host. Re-attempts during review reproduced
  itacec.org HTTP 401/403, nacte.org.pk HTTP 404, unesdoc HTTP 403 and ScienceDirect HTTP 403,
  while ERIC and Crossref answered normally in the same sessions.
- **Applied in:** the `## Unverifiable sources` declarations across
  `specs/content/efmp-302/sources/unit-0{1..6}.md` (24 keys), and the rubric amendment in
  `.claude/skills/review-unit/references/g3.md` plus `.claude/skills/review-unit/SKILL.md` without
  which the declaration alone would still force an escalate.
- **Limits:** The source remains unverified; the declaration is not a substitute for reading it.
  A reviewer still fails `sources` where prose relies on such a source for a claim it does not
  disclose as uncorroborated, or states more than the declaration supports.

## D-2026-0002 - EFMP-302 Unit 6 activity design: the one-page plan

- **Status:** confirmed
- **Gate:** G1 (unit-spec)
- **Scope:** EFMP-302, Unit 6
- **Decided by:** curriculum owner, 2026-09-19
- **Decision:** Unit 6's worked-example activity is the **one-page** development plan, built in
  about twenty minutes and reviewed at a named date, carrying the six blocks of Topic 6.4. The
  competing one-term design, which named one activity from each "ways to continue developing"
  category, is superseded.
- **Basis:** The G3 run-003 review of Unit 6 found `content-spec.md` "## Unit 6" stating both
  designs in the same subsection with no amendment note, which is a contradiction in the G1
  authority itself rather than a defect the author could resolve. `topic-04.mdx:131-143` follows
  the one-page design and `:77-79` argues directly against building a plan from one activity per
  category, so the authored unit already embodies the decision. Escalated because a reviewer
  cannot choose between two readings of an approved spec; that is a scope decision under
  Constitution Art. II.3 and Art. VII.1.
- **Applied in:** `specs/content/efmp-302/content-spec.md` "## Unit 6", both the
  `**Worked-example / activity concepts**` bullet and the `**Worked-examples plan**` paragraph,
  the superseded wording recorded rather than silently deleted.
- **Limits:** Settles Unit 6 only. It does not change the assessment blueprint, the sub-topic
  checklist, or any other unit's activity design.

---

## D-2026-0003 - `.specify/Course_guides_and_Scheme/` is a superseded departmental variant set

- **Status:** confirmed
- **Gate:** G0 (course intake), `identity` criterion
- **Scope:** corpus-wide, all eight files in that folder
- **Decided by:** curriculum owner, 2026-09-20
- **Decision:** the guides in `.specify/Course_guides_and_Scheme/` are a **superseded departmental
  variant set** issued by the Department of Early Childhood and Elementary Education, Elsa Qazi
  Campus. They are retained for provenance only. Where one conflicts with a Faculty course guide
  or with the revised board Scheme, it does **not** govern. Credit hours for EFMP-301 and
  EFMP-302 stand at **`3 (3-0)`**, as `catalog/courses.json` already records, and the CLO
  numbering of the Faculty guides governs the SLO traces in both courses' specs.
- **Basis:** the first intake evaluation (Art. VII.8) found that two documents both present as the
  EFMP-302 course guide and disagree on credit hours, the `Major:` line and the order of CLOs 1
  and 2. Tracing the pattern found EFMP-301 in the same position. Where a file exists in that
  folder it states `(0-3)`; the Faculty guides and the revised Scheme state `(3-0)`. G-2026-05
  already held that credit-hour values are a property of the degree-awarding scheme.
- **Limits:** settles precedence for that folder. It does not revise any unit's content, and it
  does not pre-decide a future conflict on something other than credit hours or CLO order; those
  are still decided on their merits under Art. II.3.
- **Applied in:** `specs/gaps.md` G-2026-07 resolved; a provenance README added to the folder so
  the question cannot recur silently.

## D-2026-0004 - `D-2026-0002` extends beyond Unit 6

- **Status:** confirmed
- **Gate:** G1 (unit-spec)
- **Scope:** EFMP-302, course-wide
- **Decided by:** curriculum owner, 2026-09-20
- **Decision:** the one-page development plan settled by `D-2026-0002` is the course's design
  wherever that activity appears, not only in Unit 6. The *One-term PD plan* practicum item in
  `content-spec.md` "## Course review plan" is corrected to the one-page design, with the
  superseded wording recorded rather than deleted.
- **Basis:** Unit 6's G3 run-007 review found the superseded design alive one section outside
  `D-2026-0002`'s declared "Unit 6 only" scope, and the first intake evaluation found it
  independently. Same design, same course, same reasoning; a student following the practicum
  would have built the plan Topic 6.4 argues against.
- **Limits:** settles EFMP-302 only. It does not change the assessment blueprint or any other
  course's activity design.

## D-2026-0005 - No blanket waiver of ADR-0019's two-cycle repair limit

- **Status:** confirmed
- **Gate:** G3 (English review)
- **Scope:** corpus-wide
- **Decided by:** curriculum owner, 2026-09-20
- **Decision:** ADR-0019 section 2's limit of two repair-and-review cycles per stage stands. The
  EFMP-302 units that exceeded it (Unit 3 at six cycles, Unit 4 at seven, Units 5 and 6 at four)
  are **not** granted a retrospective waiver and are **not** authorised for further cycles. Their
  open findings route to the content-improvement loop.
- **Basis:** cycles five through seven on this course did not converge. They were not one defect
  resisting repair; each surfaced new defects, several introduced by the preceding repair. Raising
  the limit would have bought more of the same. The provisional publication tier already lets a
  unit be visible and honest with open findings recorded, which is the intended relief.
- **Limits:** a specific unit may still be granted a specific additional cycle by the owner. This
  refuses the blanket waiver, not every future exception.

---

## D-2026-0006 - EFMP-304 course identity and the six-unit partition, including the guide's repeated 5.4

- **Status:** pending-owner-review
- **Gate:** G0 intake
- **Scope:** EFMP-304 only. Settles the course's identity fields and the top-level unit partition,
  including how the guide's duplicated sub-topic number is carried. Settles nothing about the
  calendar, the reading list or any assessment blueprint.
- **Decided by:** agent:evaluator, 2026-09-20
- **Decision:**
  1. **Identity.** EFMP-304, "Critical Thinking and Reflective Practices", **3 (3-0)** credit
     hours, Semester 2, category "Major: Professional", as `catalog/courses.json:86-92` already
     records. No change to the catalog is required and none is made.
  2. **Partition.** The course is the guide's **six numbered units**, with the guide's own titles:
     1 Understanding Critical Thinking, 2 Recognizing and Analyzing Arguments, 3 Basic Logic
     Concepts and Analyzing the Argument, 4 Becoming a Reflective Teacher, 5 Engaging in Reflective
     Practice, 6 Creating and Maintaining Reflective Journals.
  3. **The repeated 5.4.** The guide numbers **5.4 twice**, at
     `Scheme-and-Course-guides/extracted-text/2nd 2026.txt:709` ("Knowing ourselves as a
     practitioner") and `:710` ("Frameworks/Models for Reflection"). Both lines carry distinct
     content and neither may be dropped without losing guide scope. The second is carried as a
     distinct sub-topic under the synthetic guide ref **`5.4b`**, exactly as
     `specs/content/efmp-304/content-spec.md:647` records it. This is a **within-guide numbering
     slip**: only one document is involved, no board Scheme or second guide is in conflict, and
     nothing about course scope changes. The evaluator skill's `partition` criterion permits an
     evaluator to resolve exactly this case under a `D-` code, and this is that case, stated
     explicitly as the criterion requires.
- **Basis:** `Scheme-and-Course-guides/extracted-text/2nd 2026.txt`, the EFMP-304 block at
  `:609-756`. Code `:613`, title `:616` (the guide's ampersand against the Scheme's "and" is
  typographic, not a discrepancy), credit hours `:621` ("3", stated with no theory/practical
  split), semester `:623`. Unit headings at `:677`, `:686`, `:692`, `:697`, `:704`, `:712`. The
  duplicate at `:709-710`.

  The revised board Scheme, the owner's designated final authority, gives
  `EFMP-304 / Critical Thinking and Reflective Practices / 3 (3-0)` at
  `Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt:154-160`, in
  its Semester II block. **There is no Article II.3 conflict to escalate**: the guide states a
  credit-hour total and no split, so it does not contradict the Scheme's `(3-0)`; the Scheme
  supplies the split, which is the posture G-2026-02 and G-2026-05 already established for exactly
  this pattern. `.specify/Course_guides_and_Scheme/` contains **no EFMP-304 file**, verified
  against the bound manifest's own path list, so `D-2026-0003` has nothing to act on here and the
  spec's precedence note at `content-spec.md:24-28` is correct.

  Note for the record: `content-spec.md:622-623` and `:815` both cite the duplicate 5.4 as being
  at guide lines "714 and 716". Those lines are guide 6.1 and 6.3. The duplication is real and is
  at `:709-710`. This decision rests on the verified lines, not on the spec's citation of them.
- **Bound to:** `specs/content/efmp-304/intake/manifest.json`, manifest digest
  `94eee898b92dc0c1bc9845fc06afe60629456bd35c0ff667ac04bfb142efd769`, 56 inputs at commit
  `778b76e`. Recomputed independently with `manifestFor()` from
  `scripts/lib/review-evidence.mjs`; every path and every digest matched, with no extra and no
  missing entry. **Any change to a bound input voids this approval** (Art. VII.8.5).
  **Recording this decision itself changes two bound inputs** (`specs/decisions/log.md` and
  `specs/gaps.md`), because `bound()` excludes `/intake/` but not the two registers an
  evaluator is required to write to. The digest above is the state this judgement rested on,
  at commit `778b76e`; see `G-2026-15`. Freshness under Art. VII.8.5 should be read against
  the other 54 inputs.
- **Limits:** Does **not** settle the week schedule or the term length: those are escalated as
  `G-2026-13` and the calendar is expressly outside this decision. Does **not** settle the reading
  list (`G-2026-14`). Does **not** approve any unit's assessment blueprint. Does **not** authorise
  authoring: `content-spec.md` remains at `status: draft`. Certifies no content, qualifies no
  reviewer, authorises no publication.

## D-2026-0007 - EFMP-304 sub-topic coverage, outcome traces, structure and decision residue

- **Status:** pending-owner-review
- **Gate:** G1 unit-spec
- **Scope:** EFMP-304, the six `### Sub-topic checklist` and `### Topic list` tables, the
  CLO/SLO traces, and structural conformance to the bound style guide and contracts. Excludes the
  reading list, the week schedule, and Unit 1's unit-end assessment blueprint.
- **Decided by:** agent:evaluator, 2026-09-20
- **Decision:**
  1. **Coverage is complete and adds nothing.** The guide enumerates **32** numbered items across
     the six units (8 + 5 + 4 + 5 + 5 + 5). The spec's checklists carry **44** rows
     (14 + 8 + 4 + 7 + 5 + 6). Every one of the 32 guide items appears, and **every one of the 12
     extra rows is a decomposition of a compound bullet the guide's own text spells out**:
     `1.1:678` two sentences to 2 rows; `1.4:681` "Classroom, Workplace and Life" to 3;
     `1.6:683` "Statements, Claims, Issues and Arguments" to 4; `2.1:687` two sentences to 2;
     `2.2:688` two items to 2; `2.4:690` "Premises and Conclusions" to 2; `4.1:699` three named
     terms to 3; `6.2:715` "create and maintain" to 2. That is 12 exactly. **No row sits under a
     bare guide heading with no textual ancestor**, which is what distinguishes this course from
     the EFMP-302 finding recorded as `G-2026-08`.
  2. **The outcome traces hold.** The guide's six course outcomes at `:651-675` are paraphrased
     faithfully at `content-spec.md:32-43`. Each of the six has at least one unit whose *guide
     topics* actually deliver it: CLO 1 to Units 1 and 4, CLO 2 to Units 1 to 3, CLO 3 to Unit 4
     (guide `4.2:700`), CLO 4 to Unit 5 (guide `5.2:707` and `5.4b:710`), CLO 5 to Units 5 and 6,
     CLO 6 to Unit 6 (guide `6.1-6.4:714-717`). **No SLO lacks a guide ancestor and no CLO is
     orphaned**, so the EFMP-302 `G-2026-10` failure mode is absent here.
  3. **Structure conforms.** Front matter validates against
     `contracts/content-spec-frontmatter.schema.json`. All seven required course-level sections are
     present, and all ten required per-unit blocks are present in all six units. The
     checklist-to-topic partition is **total and disjoint in every unit**, every checklist `Topic`
     cell equals its `### Topic list` row label, and every `**Depth budget**` sub-topic and topic
     count matches its tables. Every topic plans at least two figure carriers and every unit plans
     at least one concept-map, flowchart or timeline (Art. III.10, `style-guide.md:493-495`).
  4. **No decision residue.** All five confirmed entries above were swept against the **whole**
     spec, not only the sections they name. `D-2026-0001` is invoked at `content-spec.md:104-109`
     within its Limits. `D-2026-0002` and `D-2026-0004`'s superseded one-term / one-activity-per-
     category design appears **nowhere**, including in `## Course review plan` (`:165-198`), which
     is where it survived on EFMP-302; the single cross-reference at `:158` names the one-page
     design, which is the post-`D-2026-0004` state. `D-2026-0003` is correctly applied.
     `D-2026-0005` is not evaded: no additional review cycles are assumed anywhere.
- **Basis:** `Scheme-and-Course-guides/extracted-text/2nd 2026.txt:677-718` for the unit outline
  and `:651-675` for the outcomes; `specs/content/style-guide.md` v4.5 for the structural rules;
  `specs/content/efmp-304/content-spec.md` throughout. The guide determines items 1 and 2 directly,
  because both are a reading of the guide's own enumerated text against the spec's tables. Items 3
  and 4 are determined by bound repository rules rather than by the guide, and are approved on that
  footing.

  Deterministic checks actually run at HEAD `f0ccbe9`, with real exit codes:
  `npm run check:no-em-dash` **0**; `npm run validate:content` **0**; `npm run check:bloom-bands`
  **0**; `npm run check:concept-graph` **0**; `npm run check:depth-gate` **0**;
  `npm run check:pipeline-gate` **1** (10 findings, **all EFMP-302**, none touching EFMP-304).
  `check:depth-gate`'s exit 0 is **vacuous for this course**: `scripts/check-unit-depth.mjs:63`
  walks `docs/` and EFMP-304 has no authored unit, so the gate never parsed these tables. The
  partition, `Topic`-column and `**Depth budget**` invariants above were therefore replayed
  directly against the bound spec using the gate's own parsers (`unitSectionLines`,
  `parseTopicList`, `parsePipeTable`, `tableAfterHeading`), reproducing
  `scripts/lib/unit-depth.mjs:300-314`. They passed for all six units.
- **Bound to:** `specs/content/efmp-304/intake/manifest.json`, manifest digest
  `94eee898b92dc0c1bc9845fc06afe60629456bd35c0ff667ac04bfb142efd769`, 56 inputs at commit
  `778b76e`, independently recomputed and matched. **Any change to a bound input voids this
  approval** (Art. VII.8.5).
  **Recording this decision itself changes two bound inputs** (`specs/decisions/log.md` and
  `specs/gaps.md`), because `bound()` excludes `/intake/` but not the two registers an
  evaluator is required to write to. The digest above is the state this judgement rested on,
  at commit `778b76e`; see `G-2026-15`. Freshness under Art. VII.8.5 should be read against
  the other 54 inputs.
- **Limits and what remains blocked:**
  - **Criterion 5 `readings` is not approved.** `G-2026-14`. `## Reading list` and every unit's
    `**Mapped readings**` line are blocked.
  - **Criterion 6 `blueprint` failed for Unit 1 and is not approved for it.**
    `content-spec.md:317-320` sets "ERQs (5) ... one per topic plus one integrative". Unit 1 has
    **five** topics, so its own floor demands **six** ERQs against a bank
    `specs/content/style-guide.md:229` fixes at **exactly 5**. Units 2 to 6 have four topics each
    and their floors resolve to exactly 5, so only Unit 1 is affected. Unit 1's MCQ and RRQ floors
    (two per topic across five topics) land on exactly 10 of 10, leaving no headroom for an
    integrative item in either band. **Unit 1's `**Unit-end assessment blueprint**` is blocked**
    until the line is corrected; this is a repair against the bound style guide, not a question
    for the owner. Units 2 to 6 blueprints are approved.
  - **The week schedule is not approved.** `G-2026-13`. The "Weeks N-M" line opening each unit
    subsection is blocked with it.
  - **The formative/summative attribution is not settled.** The guide's marks table at `:743-756`
    is guide-given and is approved as transcribed at `content-spec.md:50-57`. The spec's reading of
    it as "30 formative / 70 summative", which places attendance and the reflection file on the
    formative side, is a bucketing judgement the guide does not state. No gate depends on it.
  - Reported for repair, needing no owner decision: the guide-line citations at
    `content-spec.md:30` (course outcomes are at `:651-675`, not `:646-663`), `:88` (the reading
    list begins at `:721`, not `:724`), and `:622` and `:815` (the duplicate 5.4 is at `:709-710`,
    not `:714` and `:716`); the "one row per leaf bullet" derivation note repeated in all six unit
    preambles, which describes a transcription where the spec performs a documented decomposition;
    and the `### Curated-supplementary` heading, which drops the "(open access)" that
    `specs/007-content-depth-standard/contracts/content-spec-v2.md:32` specifies.
  - `status` stays **`draft`**. Authoring remains blocked under Spec 006 FR-002. This decision
    certifies no content, qualifies no reviewer and authorises no publication (Art. VII.8.4).

---

## D-2026-0008 - EFMP-301 Unit 1's one-directional source gap is accepted as disclosed

- **Status:** confirmed
- **Gate:** G3 (English review), `sources` criterion
- **Scope:** EFMP-301 Unit 1, topic-02
- **Decided by:** curriculum owner, 2026-09-20
- **Decision:** the absence of an open-access source for what school practice contributes *back* to
  psychology is **accepted as disclosed**. The prose already states the limit, keeps the claim
  short and uncontroversial, and attributes it to the guide bullet rather than to a source.
- **Basis:** the direction psychology to education is well served (Seifert & Sutton 2009); the
  reverse has no introductory-level open-access treatment that could be verified from this host.
  Inventing a citation is the failure mode this pipeline exists to prevent, and dropping the guide
  bullet would silently narrow approved scope.
- **Limits:** settles this passage only. If an open-access treatment is found, the improvement loop
  should cite it. Resolves `G-2026-06`.

## D-2026-0009 - EFMP-302 Unit 4's five authored sub-topics are confirmed

- **Status:** confirmed
- **Gate:** G1 (unit-spec)
- **Scope:** EFMP-302 Unit 4
- **Decided by:** curriculum owner, 2026-09-20
- **Decision:** rows `U4-08` to `U4-12` are confirmed as **authored decompositions** of guide
  sections 4.3 and 4.4, on the same footing as the confirmations already recorded for Units 2 and
  5. Unit 4's checklist preamble now carries the same "expansion, not a transcription" disclosure.
- **Basis:** the guide gives 4.3 ("Applying standards in Practice to guide self-evaluation") and
  4.4 ("Linking standards to the teacher licensing, certification, and appraisal") as **bare
  headings with no bullets at all**, so there was nothing to transcribe. The unit could not be
  authored without decomposing them.
- **Applied in:** `content-spec.md` Unit 4 `### Sub-topic checklist` preamble. The same false
  "one row per leaf bullet" claim was corrected in Units 1, 3 and 6, which are decompositions too;
  those are authoring corrections and needed no decision.
- **Limits:** settles Unit 4's five rows. Resolves `G-2026-08`.

## D-2026-0010 - EFMP-302 reading list: `kwakman2003` re-filed, `icka2024` recorded unresolvable

- **Status:** confirmed
- **Gate:** G0/G1, `readings`
- **Scope:** EFMP-302 course reading list
- **Decided by:** curriculum owner, 2026-09-20
- **Decision:** `kwakman2003` moves from `### Guide-required` to `### Curated-supplementary`,
  because it appears in neither the Faculty guide nor the departmental variant and was therefore
  never guide-required. `icka2024` stays guide-required, with its **locator recorded as
  unresolvable** in the manner `G-2026-06` uses: cited at bibliographic level only, with the limit
  stated at the point of use.
- **Basis:** a source filed as guide-required that no guide lists misrepresents the approved
  reading list. A guide-listed source with no resolvable locator is the D-2026-0001 situation and
  is handled the same way: flag and proceed.
- **Limits:** settles these two keys. Resolves `G-2026-09`.

## D-2026-0011 - EFMP-302 CLO 4 is a guide drafting artefact

- **Status:** confirmed
- **Gate:** G0 (course intake), `outcomes`
- **Scope:** EFMP-302
- **Decided by:** curriculum owner, 2026-09-20
- **Decision:** CLO 4 ("Develop skills to plan, implement, and evaluate teaching strategies for
  diverse learners") is recorded as a **drafting artefact in the guide**. **No content is invented
  for it.** The CLO list now says so, and states that Units 5 and 6 tracing to CLO 4 by number is
  **not** evidence the outcome is covered.
- **Basis:** the guide's own unit outline lists no topic that teaches planning, implementing or
  evaluating teaching strategies. Authoring content the guide does not list would silently widen
  approved scope; leaving the numeric traces unannotated would let a reader infer coverage that
  does not exist. If the outcome is owed to the programme, a methods course discharges it.
- **Limits:** settles EFMP-302 only. Resolves `G-2026-10`.

## D-2026-0012 - A guide-silent course may record `## Week schedule` as guide-silent

- **Status:** confirmed
- **Gate:** G0/G1 contract
- **Scope:** corpus-wide
- **Decided by:** curriculum owner, 2026-09-20
- **Decision:** the **contract is amended, not the spec**.
  `specs/007-content-depth-standard/contracts/content-spec-v2.md` now permits a course whose guide
  carries no week table to record the section as guide-silent, or to record a derived distribution
  **clearly labelled as derived with its basis stated**, for an evaluator to approve or escalate.
  What a spec must not do is present an invented calendar as though the guide supplied it.
- **Basis:** requiring a section the guide cannot supply forces invention, which is the failure the
  contract exists to prevent. EFMP-304's guide has no week table; neither do GENG-300's or
  GENG-301's, which give numbered syllabus sections and no calendar at all. So this is a contract
  defect affecting at least three courses, not a defect in any one spec.
- **Applied in:** the contract; EFMP-304's existing derived-and-labelled schedule now conforms
  without change. Resolves `G-2026-13`.
- **Limits:** relaxes *how* the section may be satisfied, never *whether* a course's teaching
  sequence is recorded.

## D-2026-0013 - EFMP-304 authors against a binding open-access floor

- **Status:** confirmed
- **Gate:** G0 (course intake), `readings`
- **Scope:** EFMP-304
- **Decided by:** curriculum owner, 2026-09-20
- **Decision:** the G2 open-access floor written into EFMP-304's spec is **binding**: at least two
  verifiable open-access sources bound per unit for Units 1 to 3, at least one for Units 4 to 6,
  resolved through a named registry and recorded with the date of verification. The seven guide
  monographs are cited at **title and bibliographic level only**, with that limit stated at the
  point of use. `pendrey2022` is used **method-only**, since it is explicitly early-years against a
  guide that twice states the course is for secondary teachers. Failure to meet a unit's floor is
  an escalation, never a reason to lean harder on an unopened book.
- **Basis:** all seven readings are print-only with no DOI, and Units 1 to 3 need a named list of
  critical-thinking standards and a formal definition of validity, which title-level support cannot
  carry. This is the exact condition that cost EFMP-302 seven review cycles. The owner has elected
  to author now rather than block on obtaining texts; if copies are obtained, the improvement loop
  deepens the sourcing.
- **Limits:** settles EFMP-304. It does not set a corpus-wide floor, though it is the obvious
  precedent for any other course whose guide list is print-only. Resolves `G-2026-14`.

## D-2026-0014 - Standing authorisation to publish gate-checked units

- **Status:** confirmed
- **Gate:** G7 (publish)
- **Scope:** the **15 catalogued courses** in `catalog/courses.json` as of 2026-09-20. Courses
  added later, including any from semesters 3, 5, 6, 7 and 8, are **not** covered and need their
  own authorisation.
- **Decided by:** curriculum owner, 2026-09-20
- **Decision:** units of these courses MAY be published in the **gate-checked** tier of
  Constitution Art. VII.7(a) - deterministic gates passed, no reviewer has read them - under the
  "Draft - expert review pending" notice, without a further per-unit decision from the owner.
- **Basis:** Art. VII.1 reserves publication authority to the owner and Art. VII.7(a) requires a
  standing authorisation naming its courses, precisely so the tooling cannot authorise its own
  publications. This supplies it once for the build-out rather than ~90 times. The reasoning is
  ADR-0026's: on the measured EFMP-302 record one unit in six reached a passing review, at four
  to seven cycles each, so the old bar produced review debt rather than a corpus.
- **Limits.** This authorises publication, nothing else. It does not certify content, qualify a
  reviewer, discharge the practicing-teacher gate, or waive any Article VI.1 obligation. It does
  not authorise publishing a unit whose G2 evidence is stale or whose review row is present but
  invalid. It lapses with Art. VII.7's exit condition: when these 15 courses are authored, the
  owner decides again.
- **Known cost, accepted:** G2 proves shape, not truth. Reviews of this course caught a
  fabricated attribution, a false accreditation claim, a fabricated sample size and a figure
  teaching the wrong answer to its own question, and **all four passed the gates**. Publishing
  before review means defects of that class reach readers first, with the notice as the only
  mitigation.

