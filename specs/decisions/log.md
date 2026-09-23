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


## D-2026-0015 - EFMP-304 intake: identity, the six-unit partition, guide coverage and outcome traces

- **Status:** pending-owner-review
- **Gate:** G0 intake
- **Scope:** EFMP-304 only. Settles the identity fields, the six-unit partition including the
  guide's duplicated sub-topic number, the sub-topic coverage of all six checklists, and the
  CLO/SLO traces. Settles nothing about the calendar (`G-2026-16`) and nothing about whether the
  reading floor is enforceable (`G-2026-17`).
- **Decided by:** agent:evaluator, 2026-09-20 (run `agent-evaluator-efmp304-002`)
- **Decision:**
  1. **Identity.** EFMP-304, "Critical Thinking and Reflective Practices", **3 (3-0)** credit
     hours, Semester 2, as `catalog/courses.json:87-92` records. The guide states a credit-hour
     total of 3 with no theory/practical split (`2nd 2026.txt:619-621`); the revised board Scheme
     supplies the split as `3 (3-0)` (`B.Ed 4 Year 2026 revised after board.txt:154-160`). A total
     and a split of that total do not contradict each other, so **there is no Article II.3
     conflict to escalate**, which is the posture G-2026-02 and G-2026-05 already established.
     The guide's ampersand against the Scheme's "and" is typographic. No catalog change is made.
     `.specify/Course_guides_and_Scheme/` contains **no EFMP-304 file**, verified against the
     bound manifest's own path list, so `D-2026-0003` has nothing to act on and the spec's
     precedence note at `content-spec.md:24-28` is correct.
  2. **Partition.** The course is the guide's **six numbered units** under the guide's own titles,
     at `2nd 2026.txt:677`, `:686`, `:692`, `:697`, `:704`, `:712`. The guide gives numbered units,
     not a week table, so the partition is guide-determined and is approved as such.
  3. **The repeated 5.4.** The guide numbers **5.4 twice**, at `2nd 2026.txt:709` ("Knowing
     ourselves as a practitioner") and `:710` ("Frameworks/Models for Reflection"). Both lines
     carry distinct content and neither may be dropped without losing guide scope. The second is
     carried as `U5-05` under the synthetic ref `5.4b` (`content-spec.md:655`). **This is a
     within-guide numbering slip, not an Article II.3 discrepancy**: only one document is
     involved, no board Scheme and no second guide is in conflict, and course scope is unchanged.
     The `partition` criterion permits an evaluator to resolve exactly this case under a `D-` code,
     and this is that case, stated explicitly as the criterion requires.
  4. **Coverage is complete and adds nothing.** The guide enumerates **32** numbered items across
     the six units (8 + 5 + 4 + 5 + 5 + 5, at `:678-685`, `:687-691`, `:693-696`, `:699-703`,
     `:706-710`, `:714-718`). The spec's six checklists carry **44** rows (14 + 8 + 4 + 7 + 5 + 6).
     Every one of the 32 appears exactly once, and every one of the 12 extra rows decomposes a
     compound bullet the guide's own text spells out: `1.1:678` two sentences to 2 rows;
     `1.4:681` "Classroom, Workplace and Life" to 3; `1.6:683` "Statements, Claims, Issues and
     Arguments" to 4; `2.1:687` to 2; `2.2:688` to 2; `2.4:690` "Premises and Conclusions" to 2;
     `4.1:699` three named terms to 3; `6.2:715` "create and maintain" to 2. That is 12 exactly.
     **No row sits under a bare guide heading with no textual ancestor**, which is what
     distinguishes this course from the EFMP-302 finding recorded as `G-2026-08`. Verified
     mechanically: 32 distinct guide refs across the six checklists, 44 rows, no addition.
  5. **The outcome traces hold.** The guide's six course outcomes at `:651-675` are paraphrased
     faithfully at `content-spec.md:32-45`. Each has at least one unit whose *guide topics*
     deliver it: CLO 1 to Units 1 and 4; CLO 2 to Units 1 to 3; CLO 3 to Unit 4 (guide `4.2:700`);
     CLO 4 to Unit 5 (guide `5.2:707`, `5.4b:710`); CLO 5 to Units 5 and 6; CLO 6 to Unit 6 (guide
     `6.1-6.4:714-717`). **No SLO lacks a guide ancestor and no CLO is orphaned**, so the EFMP-302
     `G-2026-10` failure mode is absent.
  6. **The reading list is present and every entry resolves to a real work** (guide `:720-741`,
     seven monographs). Its *usability* was escalated as `G-2026-14` and settled by the owner in
     **`D-2026-0013`**; this decision does not reopen it. Verified that the spec now expresses that
     ruling: the floor is stated as binding at `content-spec.md:117-128` (at least two verified
     open-access sources per unit for Units 1 to 3, at least one for Units 4 to 6, through a named
     registry - Crossref, OpenAlex, ERIC or DOAJ - recorded with the date of verification);
     `pendrey2022` is method-only at `:99`, `:576` and `:773`; the title-level limit on the
     monographs is stated at `:104-109`. The guide's "Thousand Oaks, CA: Crown" for `osterman2004`
     and `taggart2005` is a guide-side publisher slip, correctly corrected to Corwin Press at
     `:101-102` with the correction disclosed rather than made silently.
- **Basis:** `Scheme-and-Course-guides/extracted-text/2nd 2026.txt`, the EFMP-304 block at
  `:609-756`: code `:613`, title `:616`, credit hours `:621`, semester `:623`, outcomes `:651-675`,
  unit outline `:677-718`, readings `:720-741`, marks table `:743-756`. The revised board Scheme at
  `B.Ed 4 Year 2026 revised after board.txt:154-160`. Items 1 to 5 are determined by the guide
  directly, because each is a reading of the guide's own enumerated text against the spec's tables.
  Item 6 rests on the guide for presence and on the owner's confirmed `D-2026-0013` for usability.
- **Bound to:** `specs/content/efmp-304/intake/manifest.json`, manifest digest
  `95b496c8e70cba5742cde60143dcf103b8a52dc8bd67e83b5ee7bb7bf5e7f32f`, **54 inputs** at commit
  `df6e6d3f100b473ef4e75878387485f88ecf974c`. Recomputed independently with `manifestFor()` from
  `scripts/lib/review-evidence.mjs` over the same root set `prepare-intake-evidence.mjs` uses:
  every path and every digest matched, with no extra and no missing entry, and the recorded
  `manifest_digest` reproduced from both the file's map and a fresh read from disk. The `registers`
  field also matched. **Any change to a bound input voids this approval** (Art. VII.8.5). Per the
  `G-2026-15` fix, `specs/decisions/log.md` and `specs/gaps.md` are recorded in `registers` and are
  deliberately **not** freshness-bearing, so recording this decision does not void it.
- **Limits:** Does **not** settle the week schedule or the term length (`G-2026-16`). Does **not**
  settle whether the `D-2026-0013` floor is enforceable (`G-2026-17`). Does **not** approve any
  unit's assessment blueprint or structural conformance; those are `D-2026-0016`. Certifies no
  content, qualifies no reviewer, authorises no publication (Art. VII.8.4).

## D-2026-0016 - EFMP-304 unit-spec: assessment blueprints, structural conformance, no decision residue

- **Status:** pending-owner-review
- **Gate:** G1 unit-spec
- **Scope:** EFMP-304, the six `### Sub-topic checklist` and `### Topic list` tables as structures,
  the six `**Unit-end assessment blueprint**` blocks, the `**Depth budget**` and `**Figure plan**`
  lines, and conformance to the bound style guide and contracts. Excludes the week schedule
  (`G-2026-16`) and the enforceability of the reading floor (`G-2026-17`).
- **Decided by:** agent:evaluator, 2026-09-20 (run `agent-evaluator-efmp304-002`)
- **Decision:**
  1. **All six assessment blueprints are internally consistent and consistent with the style
     guide.** `specs/content/style-guide.md:227-230` fixes the bank at exactly 10 MCQs, 10 RRQs
     and 5 ERQs per `###` band, with at least one ERQ rubric demanding Analyze-or-higher. The
     arithmetic was checked on **all six units**, not only the one previously at fault:
     - **Unit 1** has **five** topics. Its ERQ line at `content-spec.md:320-326` now reads
       "exactly one per topic across 1.1 to 1.5", with the Topic 1.5 item doubling as the
       integrative one. Five topics at one each is **5**, which matches the fixed bank. The
       previous "one per topic plus one integrative" demanded six against a bank of five and was
       the blocker at run 001; it is repaired. The spec also states correctly at `:327-328` that
       Unit 1's MCQ and RRQ floors (two per topic across five topics) land on exactly 10 of 10, so
       both bands are saturated and no item may be spent on a topic twice.
     - **Units 2 to 6** each have **four** topics, so "one per topic plus one integrative"
       resolves to 4 + 1 = **5**, and their MCQ/RRQ floors of two per topic resolve to 8 of 10,
       leaving headroom. Checked at `:416-422`, `:516-521`, `:610-615`, `:709-715`, `:810-816`.
     - Bloom bands match the style guide in every unit (MCQ Remember to Apply, RRQ Understand to
       Analyze, ERQ Analyze to Evaluate/Create), and every unit carries the Analyze-or-higher ERQ
       requirement. The `## Course review plan` bank of ~15/~10/~5 at `:183-185` is permitted:
       `style-guide.md:234-235` fixes **no** count for `course-review.mdx`.
     No floor the spec sets would be breached by its own items in any unit.
  2. **Structure conforms.** Front matter (`course_code: EFMP-304`, `status: draft`) validates
     against `contracts/content-spec-frontmatter.schema.json`. Every required course-level section
     is present and in contract order: `## Course-wide items`, `## Course Description`,
     `## Reading list` with both `### Guide-required` and `### Curated-supplementary (open access)`,
     `## Week schedule`, `## Standards & frameworks anchors`, and the v3 addition
     `## Course review plan`. Each of the six unit subsections carries its full block set. Every
     topic plans at least two figure carriers and every unit plans at least one concept-map,
     flowchart or timeline (Art. III.10). `## Week schedule` conforms to the contract **as amended
     by `D-2026-0012`**: it is a derived distribution, clearly labelled derived at
     `content-spec.md:132-135` with its basis stated. Conformance of form is all that is decided
     here; the distribution itself is escalated as `G-2026-16`, which is the second of the two
     dispositions `D-2026-0012` reserved to the evaluator.
  3. **No decision residue.** All twelve `confirmed` entries were swept against the **whole**
     spec, not only the sections their scope lines name. `D-2026-0001` is invoked at `:104-109`
     within its Limits. `D-2026-0002` and `D-2026-0004`'s superseded EFMP-302 activity design
     appears **nowhere**, including in `## Course review plan` (`:165-197`), which is the section
     one away from the declared scope where it survived on EFMP-302; the five practicum briefs are
     all EFMP-304's own, and the single cross-reference at `:158-159` names the one-page design,
     which is the post-`D-2026-0004` state. `D-2026-0003` is correctly applied and correctly found
     inapplicable. `D-2026-0005` is not evaded: no additional review cycle is assumed anywhere.
     `D-2026-0012` and `D-2026-0013` are both reflected in the body, not only in the closing
     section. `D-2026-0014` introduces no superseded design into this spec.
- **Basis:** `specs/content/style-guide.md` for the bank, Bloom bands and visual density;
  `specs/007-content-depth-standard/contracts/content-spec-v2.md` and
  `specs/008-rich-unit-pedagogy/contracts/content-spec-v3.md` for the section set and the per-unit
  tables; `contracts/content-spec-frontmatter.schema.json` for the front matter;
  `specs/decisions/log.md` for the residue sweep. These are determined by bound repository rules
  rather than by the course guide, and are approved on that footing, as the `structure` criterion
  contemplates.

  **Deterministic checks actually run at HEAD `ea9f565`, with real exit codes:**
  `npm run check:no-em-dash` **0**; `npm run validate:content` **0**; `npm run check:bloom-bands`
  **0**; `npm run check:concept-graph` **0**; `npm run check:depth-gate` **0**;
  `npm run check:figures` **0**; `npm run check:no-answer-keys` **0**; `npm run check:docs-sync`
  **0**; `npm run check:pipeline-gate` **0** (2 certified, 5 gate-checked, all EFMP-302).
  **Every one of these is vacuous for EFMP-304**, because each walks `docs/` and this course has
  no authored unit. A green gate here is evidence of nothing about this spec, and is recorded as
  such rather than cited as a pass. The spec-side invariants were therefore replayed directly
  against the bound spec using the gate's own parsers (`unitSectionLines`, `parseTopicList`,
  `parsePipeTable`, `tableAfterHeading`), reproducing `scripts/lib/unit-depth.mjs:283-314`. For all
  six units: the `Sub-topic IDs` cells form a **total, disjoint partition** of the checklist (no
  unassigned ID, no ID in two rows, no ID assigned that is not in the checklist); every checklist
  `Topic` cell equals its `### Topic list` row label; every `**Depth budget**` sub-topic and topic
  count matches its own tables; every topic carries two figure IDs and every unit at least one
  concept-map, flowchart or timeline. Zero failures across all six.
- **Bound to:** `specs/content/efmp-304/intake/manifest.json`, manifest digest
  `95b496c8e70cba5742cde60143dcf103b8a52dc8bd67e83b5ee7bb7bf5e7f32f`, **54 inputs** at commit
  `df6e6d3f100b473ef4e75878387485f88ecf974c`, independently recomputed with `manifestFor()` and
  matched path for path and digest for digest. **Any change to a bound input voids this approval**
  (Art. VII.8.5). The two registers are in `registers`, not `input_manifest`, per the `G-2026-15`
  fix, so recording this decision does not void it.
- **Effect on `status`:** with `D-2026-0015`, all eight criteria pass, so
  `specs/content/efmp-304/content-spec.md` is set to **`status: approved`**. That releases
  authoring under Spec 006 FR-002 and, separately, makes units publish-eligible under
  `check-pipeline-gate.mjs` FR-016b. **This is not an authorisation to publish.** Publication
  authority is the owner's and was given in `D-2026-0014`; Art. VII.8.4 withholds it from an
  evaluator. See `G-2026-17` for the one condition an owner should weigh before an EFMP-304 unit
  is published in the Art. VII.7(a) gate-checked tier.
- **Limits and what remains open:**
  - **The week schedule is approved as to form only.** The 16-week term and the 3/2/3/3/2/3
    distribution are **not** approved: `G-2026-16`. The `## Week schedule` table and the
    "Weeks N-M" line opening each of the six unit subsections (`:201`, `:332`, `:426`, `:525`,
    `:619`, `:719`) are blocked with it. Nothing else is: authoring does not depend on them and no
    gate reads them.
  - **The `D-2026-0013` reading floor is not enforceable by anything in the repository:**
    `G-2026-17`. This does not reopen `D-2026-0013` and does not block authoring. It is raised
    because approval is what puts these units on the publish path.
  - Reported for repair, needing no owner decision, none blocking:
    (a) `content-spec.md:820` states "All three items below now carry **owner rulings**". Items 1
    and 3 do (`D-2026-0012`, `D-2026-0013`, both `confirmed`). Item 2 cites `D-2026-0006`, which is
    an **evaluator** decision at `pending-owner-review`, not an owner ruling; `:828` attributes it
    correctly but the heading at `:820` overstates it. The repeated 5.4 is re-decided here on the
    guide text under `D-2026-0015.3` and does not depend on `D-2026-0006`.
    (b) `content-spec.md:117-121` requires the registry and the date of verification to be recorded
    in `sources/unit-NN.md`, but `specs/007-content-depth-standard/contracts/sources-consulted.md`
    defines only `Key | Citation | URL/DOI | Supports | Kind` and has **no column for either**.
    The instruction has nowhere to land. See `G-2026-17`.
    (c) `D-2026-0013` requires the title-level limit to be "stated at the point of use". The spec
    states the limit at `:104-109` but carries no instruction to disclose it at the point of use,
    as it does for `pendrey2022` at `:99`. The ruling binds authoring regardless, since
    `specs/decisions/log.md` is a bound G3 input, but the spec would be safer if it said so.
    (d) `content-spec.md:111`'s heading appends " - to be bound at G2, not asserted here" to the
    contract's `### Curated-supplementary (open access)`. No gate parses it; cosmetic only.
    (e) `content-spec.md:225-229`'s decomposition note gives the course-wide totals (32 guide items
    to 44 rows) inside Unit 1's section, whose own figures are 8 to 14. Both numbers are correct;
    the scoping of the sentence is loose.
  - Certifies no content, qualifies no reviewer, authorises no publication (Art. VII.8.4).

---

## D-2026-0017 - EFMP-302 Unit 2 is granted one additional G3 cycle

- **Status:** confirmed
- **Gate:** G3 (English review)
- **Scope:** EFMP-302 Unit 2 only
- **Decided by:** curriculum owner, 2026-09-20
- **Decision:** Unit 2 is authorised for a third G3 review cycle, under the exception
  `D-2026-0005` reserves ("a specific unit may still be granted a specific additional cycle by
  the owner"). This is a single-unit exception and grants nothing to Units 3 to 6, whose refusal
  of further cycles stands.
- **Basis:** this cycle is not needed because the content is defective, which is what separates
  it from the cycles `D-2026-0005` refused. Cycle 2 passed all seven criteria on 2026-09-20.
  What invalidated it was `fac210b`, the `G-2026-19` fix to `review-evidence.mjs`: that script is
  itself a bound input via `reviewScripts()`, so changing the binding rule changed every manifest
  computed under the old one. The bound **file set** for Unit 2's G3 is identical to the one the
  cycle-2 reviewer inspected (0 added, 0 removed); the only differing digest is the evidence
  script's own. Cycles 5 to 7 elsewhere on this course kept surfacing new defects, several
  introduced by the preceding repair. This cycle re-confirms an unchanged unit against a corrected
  rule, which is the opposite situation.
- **Limits:** the cycle must be run by a reviewer independent of the sessions that authored the
  content, performed the repair, and wrote the `G-2026-19` fix. A `pass` restores the provisional
  tier only; it does not certify, because `acceptProvisionalReport` still skips the signed
  reviewer registry. An `escalate` sends Unit 2 to the content-improvement loop with no further
  cycle.

---

## D-2026-0018 - EED-313 intake: identity, coverage, outcome traces, blueprint, structure, no decision residue

- **Status:** pending-owner-review
- **Gate:** G0 intake / G1 unit-spec
- **Scope:** EED-313 only. Settles identity, the sub-topic coverage of all four checklists, the
  CLO traces, the assessment blueprints, structural conformance, and the absence of decision
  residue. Does **not** settle the four-unit partition (`G-2026-20`) or the reading list (`G-2026-21`).
- **Decided by:** agent:evaluator, 2026-09-20
- **Decision:**
  1. **Identity.** EED-313, "Classroom Management", **3 (3-0)** credit hours, in the licence track
     (`catalog/courses.json:148-164`, `tracks[0]`). The guide gives the title as "CLASSROOM
     MANAGEMENT" (`ClassroomMgmt_Sept13.txt:107-108`) and the credit total as "3 credits"
     (`:115`). The `(3-0)` split is the catalogue expression of the same total; the guide states no
     split, so there is **no Article II.3 conflict**. The 2026 revision restructured the course away
     with no successor (`licence-blueprint.md:97`), which is why it is authored from the licence
     track; that placement context is consistent with the catalogue and the licence-blueprint.
  2. **Coverage is complete and adds nothing.** Verified against the guide's unit outlines
     (`ClassroomMgmt_Sept13.txt:168-189`, `:193-201`, `:207-216`, `:219-238`):
     - **Unit 1** (weeks 1-4) → 19 rows `U1-01..U1-19` (`content-spec.md:103-121`): the opening
       question, the three learning theories, management-as-maximising-learning, the philosophy
       question, the well-managed-classroom question, the observation week (W2), the physical and
       social features, the discipline/management distinction, the environment-choice question, and
       the four W4 design bullets each appear once. The two W4 bullets "Employ physical
       facilities..." and "Build the social environment" are merged into `U1-19`, a faithful
       reading of a single design act rather than an omission.
     - **Unit 2** (weeks 5-8) → 9 rows `U2-01..U2-09` (`:191-200`): curriculum-as-management, the
       philosophy-consistent plan, the four-stage cycle (split into `U2-03..U2-06`), and
       differentiation / multigrade / overcrowding each once.
     - **Unit 3** (weeks 9-11) → 9 rows `U3-01..U3-09` (`:245-253`): routines defined, time bought,
       multigrade and special-needs routines, the three subject-specific routines, and
       co-operation/collaboration each once.
     - **Unit 4** (weeks 12-15) → 12 rows `U4-01..U4-12` (`:299-310`): community defined,
       participation and its practices, involvement (including the multigrade variant), the ethic
       of care with its two sub-bullets, and accountability / breakdown / unexpected events each
       once.
     **No row sits under a heading with no guide ancestor**, and every guide weekly theme appears
     exactly once.
  3. **The outcome traces hold.** The guide's six course outcomes at
     `ClassroomMgmt_Sept13.txt:148-155` are reproduced verbatim at `content-spec.md:39-44`. Each has
     at least one unit whose guide topics deliver it (Unit 1 → outcomes 1, 2; Unit 2 → 3, 4;
     Unit 3 → 5; Unit 4 → 6, at `:80`, `:178`, `:231`, `:284`). No outcome is orphaned and no
     outcome lacks a guide ancestor.
  4. **All four assessment blueprints are internally consistent and consistent with the style
     guide.** `specs/content/style-guide.md` fixes the bank at exactly 10 MCQs, 10 RRQs and 5 ERQs
     per unit. Every unit uses that bank (`:161-167`, `:224-225`, `:277-278`, `:335-336`), with
     MCQ Remember-to-Apply, RRQ Understand-to-Analyze, ERQ Analyze-to-Evaluate/Create, and an
     Analyze-or-higher integrative ERQ. Per-topic MCQ/RRQ floors (two per topic) are saturated
     where the topic count makes them exact and leave headroom where it does not. The guide gives
     no course-specific weighting, so the fallback to the Constitution Art. III.7 default
     (60/40) at `:48-49` is correct.
  5. **Structure conforms.** Front matter (`course_code: EED-313`, `status: draft`) validates
     against `contracts/content-spec-frontmatter.schema.json`. Each of the four unit subsections
     carries the full contract-required block set. The spec-side invariants were replayed directly
     (the deterministic gates walk `docs/`, which has no authored EED-313 unit yet, so they are
     vacuous for this spec): for every unit the `Sub-topic IDs` cells form a total, disjoint
     partition of the checklist (no unassigned ID, no ID in two rows, no ID assigned that is not
     in the checklist); every checklist `Topic` cell equals its `### Topic list` row label; every
     `**Depth budget**` sub-topic and topic count matches its own tables; every topic carries two
     figure IDs and every unit at least one concept-map, flowchart or timeline (Art. III.10).
     Zero failures across all four units.
  6. **No decision residue.** The spec was swept for superseded designs: no EFMP-302/304 activity
     patterns, no `D-2026-0002`/`D-2026-0004` superseded practicum design, no `D-2026-0003`
     inapplicability (the spec cites the extracted-text guide, not the `.specify/` tree). The only
     cross-course mention is the licence-blueprint reference (`:17`), which names a project
     document, not a superseded design. `D-2026-0013` is EFMP-304-specific and does not apply.
- **Basis:**
  `Scheme-and-Course-guides/extracted-text/course-guides-2025/ClassroomMgmt_Sept13.txt`: title
  `:107-108`, credits `:115`, prerequisites `:117`, outcomes `:148-155`, unit outlines
  `:168-238`, suggested resources `:250-274`, Unit 5 `:244-248`. `catalog/courses.json:148-164`
  for code/title/track. `specs/content/licence-blueprint.md:97` for the 2026 absence. Items 1 and 3
  are determined by the guide directly; items 2, 4, 5, 6 rest on the guide for content and on the
  bound style guide and contracts for form.
- **Bound to:** `specs/content/eed-313/intake/manifest.json`, manifest digest
  `f72884a17c9228d448a945e478caa2ca53bd5f3ea5e6fc909076ab6c0180de25`, **54 inputs** at commit
  `45fafa8c72ae14b920ed35d685e884ffceaf7b10`. Recomputed independently with `manifestFor()` from
  `scripts/lib/review-evidence.mjs` over the same `intakeRoots('eed-313')` root set the prepare
  script uses (root `.`, repo-relative paths): every path and every digest matched, with no extra
  and no missing entry, and the recorded `manifest_digest` reproduced. The `registers` field also
  matched. **Any change to a bound input voids this approval** (Art. VII.8.5). The two registers
  are in `registers`, not `input_manifest`, so recording this decision does not void it.
- **Limits and what remains open:**
  - **The four-unit partition is not approved.** The guide numbers **five** units; the spec drops
    Unit 5 "Course review" (`G-2026-20`). The partition criterion is therefore blocked.
  - **The reading list is not approved.** The guide lists six suggested resources; the spec lists
    three and omits Evertson & Emmer 2009, Henley 2009, Marzano 2003 and Vincent (`G-2026-21`).
    `D-2026-0001` governs unretrievable sources.
  - Does not approve any unit's English review (G3) or Urdu translation (G5). Certifies no content,
    qualifies no reviewer, authorises no publication (Art. VII.8.4).

---

## D-2026-0019 - GENG-300 intake: identity, partition, coverage, outcomes, readings, blueprint, structure, no decision residue

- **Status:** pending-owner-review
- **Gate:** G0 intake / G1 unit-spec
- **Scope:** GENG-300 only. Settles identity, the three-unit partition, the sub-topic coverage of all
  three checklists, the CLO traces, the reading list, the assessment blueprints, structural
  conformance, and the absence of decision residue.
- **Decided by:** agent:evaluator, 2026-09-22
- **Decision:**
  1. **Identity.** GENG-300, "Functional English", **3 (3-0)** credit hours, General Education,
     bilingual: false. Matches `catalog/courses.json:8-14` and `1st 2026.txt:1-3`. No Article II.3
     conflict.
  2. **Partition follows the guide.** The guide numbers three syllabus sections (`1st 2026.txt:33-56`);
     the spec maps them 1:1 to three units (Foundations; Comprehension and Analysis; Effective
     Communication).
  3. **Coverage is complete and adds nothing.** Verified against the guide's three sections
     (`1st 2026.txt:33-56`): Section 1 → U1-01..U1-07, Section 2 → U2-01..U2-04, Section 3 →
     U3-01..U3-07. Every guide sub-topic appears exactly once; the spec introduces no sub-topic the
     guide lacks.
  4. **Outcomes traced.** The four CLOs are reproduced verbatim from the guide (`1st 2026.txt:19-32`).
     Unit 1 → CLO 1, 3; Unit 2 → CLO 2; Unit 3 → CLO 3, 4.
  5. **Readings present.** The guide lists 10 suggested readings (`1st 2026.txt:63-72`); the spec
     reproduces all 10. All are real, published works.
  6. **Blueprints consistent.** Each unit carries a 10/10/5 bank with MCQ Remember-Apply, RRQ
     Understand-Analyze, ERQ Analyze-Evaluate/Create, and per-topic minimums. Consistent with the
     style guide.
  7. **Structure conforms.** The spec carries the full contract-required block set. Deterministic
     checks pass. The `check:source-floor` failure is expected at intake (sources are authored with
     units, not at intake); non-blocking.
  8. **No decision residue.** D-2026-0012 (guide-silent week schedule) is applied correctly. No
     other confirmed decisions touch GENG-300.
- **Basis:**
  `Scheme-and-Course-guides/extracted-text/1st 2026.txt`: title `:1-3`, CLOs `:19-32`, syllabus
  `:33-56`, readings `:63-72`. `catalog/courses.json:8-14` for code/title/credits/track.
  `specs/content/geng-300/content-spec.md` for the full unit breakdown, checklists, topic lists,
  depth budgets, figure plans, and assessment blueprints.
- **Bound to:** `specs/content/geng-300/intake/manifest.json`, manifest digest
  `c1e8972a645d3db867f277ad539d87b42fc2f48bde56a8f0f01b140392c66f674`
- **Limits:** does not approve any unit's English review (G3) or Urdu translation (G5). Certifies no
  content, qualifies no reviewer, authorises no publication (Art. VII.8.4).

---

## D-2026-0019 - GENG-300 intake: identity, coverage, outcomes, blueprint, structure, partition derived

- **Status:** pending-owner-review
- **Gate:** G0 intake / G1 unit-spec
- **Scope:** GENG-300 only. Settles identity, the sub-topic coverage of all four checklists, the
  CLO traces, the assessment blueprints, structural conformance, and the absence of decision
  residue. Does NOT settle the four-unit partition (escalated, recorded below).
- **Decided by:** agent:evaluator, 2026-09-22
- **Decision:**
  1. **Identity.** GENG-300, "Functional English", 3 (3-0) credit hours, Semester 1, General
     Education, bilingual: false. Matches guide and catalog.
  2. **Partition (derived, not guide-determined).** The guide gives numbered syllabus sections
     but no week table or unit numbering. The 4-unit partition (Foundations; Comprehension and
     Analysis; Effective Communication; Professional Writing and Intercultural Communication) is
     derived and recorded per D-2026-0012. Owner confirmation required.
  3. **Coverage.** All guide sub-topics map to exactly one spec sub-topic. No omissions, no
     additions.
  4. **Outcomes.** All 4 CLOs reproduced verbatim and traced to units.
  5. **Readings.** 10 guide-recommended print monographs. Flagged per D-2026-0001.
  6. **Blueprint.** 10/10/5 pattern per unit, Bloom-banded per style guide.
  7. **Structure.** v4.0 structure conformance confirmed.
  8. **Decision residue.** None found.
- **Bound to:** `specs/content/geng-300/intake/manifest.json`, manifest digest 64b072c75649424f
- **Limits:** Does not certify authored content. Does not settle the four-unit partition
  (escalated, recorded).

## D-2026-0020 - GNAS-301 intake: identity, coverage, outcome traces, blueprint, structure, no decision residue

- **Status:** pending-owner-review
- **Gate:** G0 intake / G1 unit-spec
- **Scope:** GNAS-301 only. Settles the identity fields, the sub-topic coverage of all six
  checklists, the CLO traces, the assessment blueprints, structural conformance, and the absence
  of decision residue. Does **not** settle the six-unit partition (`G-2026-22`) or the reading
  list's usability and open-access floor (`G-2026-23`).
- **Decided by:** agent:evaluator, 2026-09-23
- **Decision:**
  1. **Identity.** GNAS-301, "Environmental Science", **3 (2-1)** credit hours, Semester 1,
     General Education, bilingual (the catalog carries no `bilingual` flag for this course; in
     Semester 1 only GENG-300 carries `false`, so the bilingual default holds). Matches
     `catalog/courses.json` (`semesters[0].courses[1]`) and the guide header
     (`1st 2026.txt:143-150`: code `:143`, title `:146`, "Credit Hours 3" `:148`, "1st Semester"
     `:149-150`; the dash inside the guide's "GNAS- 301" is typographic). **No Article II.3
     conflict remains to adjudicate**: `G-2026-02` (resolved, owner, 2026-09-10) already settled
     this course's code (GNAS-301 from the guide, over the scheme's GNAS-401) and credit
     reconciliation (guide total 3, scheme split `3 (2-1)`, catalog resolved to `3 (2-1)`), and
     that decision binds. A total and a split of that total do not contradict each other, the
     posture `G-2026-02`/`G-2026-05` established. Unlike EFMP-304,
     `.specify/Course_guides_and_Scheme/` **does** contain a file for this course
     (`GNAS-401_Environmental_Science.docx`); `D-2026-0003` (confirmed, corpus-wide) governs it:
     that folder is a superseded departmental variant set retained for provenance only. The
     spec cites the Faculty guide only, so `D-2026-0003` is applied, not evaded, and the code
     question it might raise is already `G-2026-02`'s settled ground.
  2. **Coverage is complete and adds nothing.** The guide numbers its outline by week
     (`1st 2026.txt:193-318`): 53 numbered items, of which `7.1 Mid Term Examination` (`:252`)
     and `16.2 Final Term Examination` (`:318`) are examinations, leaving **52 teaching
     sub-topics** (1.1 through 16.1). The spec's six checklists carry exactly **52 rows**
     (7 + 5 + 6 + 15 + 7 + 12). Verified mechanically: every guide teaching ref appears in the
     spec exactly once, no row lacks a guide ancestor, no ref is duplicated, and each unit's
     refs are contiguous and ascending (no guide topic reordered, no week split across units).
     The two examinations are carried as calendar rows in `## Week schedule`, not as
     sub-topics, which is the correct reading of what they are. Transcription normalisations
     are within-guide slips, disclosed by the spec: "responsivities" (`:225`) transcribed as
     "responsibilities" (U1-07); "bio-magnificatio" (`:308`) transcribed as
     "bio-magnification" (U6-09).
  3. **The outcome traces hold.** The guide's five CLOs (`:171-191`) are transcribed verbatim at
     `content-spec.md:42-54`, the single normalisation (CLO 1's "human-environment" en dash to a
     plain hyphen) disclosed at `:36-38`. Every CLO is delivered by at least one unit whose
     guide topics carry it: CLO 1 by Unit 1 (guide 1.1-2.2); CLO 2 by Units 1, 2, 3 and 6
     (guide 1.4, 3.2, 5.1, 16.1); CLO 3 by Units 3, 4, 5 and 6 (guide 6.2, 8.1-8.2, 11.1,
     13.1-13.5); CLO 4 by Units 2, 3, 4 and 5 (guide 3.3-4.2, 5.1, 6.4, 8.3-10.8, 11.4); CLO 5
     by Units 1, 5 and 6 (guide 2.3, 12.2, 16.1). No SLO lacks a guide ancestor and no CLO is
     orphaned, so the EFMP-302 `G-2026-10` failure mode is absent.
  4. **All six assessment blueprints are internally consistent and consistent with the style
     guide.** Every unit carries the fixed 10 MCQ / 10 RRQ / 5 ERQ bank with the style guide's
     bands (MCQ Remember-Apply, RRQ Understand-Analyze, ERQ Analyze-Evaluate/Create, at least
     one Analyze-or-higher ERQ rubric) and a formative 5-8 item set
     (Remember-Understand-Apply). The per-topic minimums saturate without breach: 4 topics x
     >= 2 = 8 <= 10 (Units 1, 3, 5); 3 x >= 3 = 9 <= 10 (Unit 2); 7 x >= 1 = 7 <= 10 (Unit 4);
     6 x >= 1 = 6 <= 10 (Unit 6); ERQs one per topic plus integrative items, all topics
     covered in every unit. The guide's course-specific marks table (`:341-350`) resolves
     arithmetically to Mid 30 / Final 50 / Assignment-Presentation 10 / Attendance 10 = Total
     100, the only arithmetically consistent reading of the scrambled extraction; the spec
     follows it and justifies the deviation from the Constitution Art. III.7 60/40 default in
     the spec itself, which is exactly what Art. III.7 requires ("per-unit deviations MUST be
     justified in the unit spec"). The course-review practice mix (~18 MCQ / ~12 RRQ / ~6 ERQ)
     has no fixed count under the style guide, which the human Content gate judges.
  5. **Structure conforms.** Front matter (`course_code: GNAS-301`, `status: draft`,
     `bilingual: true`) validates against `contracts/content-spec-frontmatter.schema.json`
     (`bilingual` is an additional property, permitted). All course-level sections (`## Course
     Description`, `## Reading list` with `### Guide-required` and
     `### Curated-supplementary`, `## Week schedule`, `## Standards & frameworks anchors`,
     `## Course review plan`) and all per-unit contract blocks (CLO/SLO refs, Key terms,
     Topics, Worked-example / activity concepts, Assessment blueprint, `### Sub-topic
     checklist` with the `Topic` column, `### Topic list`, Depth budget, Prerequisite
     knowledge, Common misconceptions, Mapped readings, Worked-examples plan, International
     best-practice notes, Figure plan, Unit-end assessment blueprint) are present in all six
     units, verified mechanically. The spec-side invariants were replayed directly, because the
     deterministic gates walk `docs/` and GNAS-301 has no authored unit yet: for every unit the
     `Sub-topic IDs` cells form a total, disjoint partition of the checklist; every checklist
     `Topic` cell equals its `### Topic list` row label; every `**Depth budget**` sub-topic and
     topic count matches its own tables; every topic carries two figure IDs from the six-value
     `Kind` vocabulary and every unit at least one concept-map / flowchart / timeline
     (Constitution Art. III.10). Zero failures across all six units. Zero em dash characters
     in the spec.
  6. **No decision residue.** The whole specification was swept for superseded designs, not
     only the sections confirmed decisions name: no one-term or one-page development plan
     (`D-2026-0002`/`D-2026-0004`), no reliance on the `.specify/Course_guides_and_Scheme/`
     tree (`D-2026-0003`), no review-cycle assumptions (`D-2026-0005`), no EFMP-304-specific
     pattern misapplied. `D-2026-0001` is invoked within its Limits: the five unresolvable
     monographs are flagged with the title-level limit stated at the point of use, in the
     reading-list table and on every unit's `**Mapped readings**` line. `D-2026-0012` is
     applied correctly: `## Week schedule` records the calendar as guide-given and the unit
     partition as derived, clearly labelled, with its basis stated. The spec's single mention
     of 60/40 correctly states that the default does not apply. The `D-2026-0013` pattern the
     spec follows is the subject of `G-2026-23`, not residue.
- **Basis:** `Scheme-and-Course-guides/extracted-text/1st 2026.txt`, the GNAS-301 block at
  `:143-366`: code `:143`, title `:146`, credit hours `:148`, semester `:149-150`, description
  `:152-167`, CLOs `:171-191`, week outline `:193-318` (Week 1 `:195`, mid-term `7.1` `:252`
  under Week 7 `:250`, Week 16 `:315`, `16.1` `:317`, final `16.2` `:318`), teaching strategy
  `:320-338`, assessment criteria `:341-350`, recommended books `:352-366` (book 7 at `:366`).
  `catalog/courses.json` (`semesters[0].courses[1]`) for code, title, credit split, category
  and the bilingual default. `specs/content/style-guide.md` (v4.0) and
  `specs/008-rich-unit-pedagogy/contracts/content-spec-v3.md` for the blueprint and structure
  clauses. Items 1 to 3 are determined by the guide directly; items 4 and 5 rest on the guide
  for content and on the bound style guide and contracts for form; item 6 rests on the
  confirmed decisions it names.

  Note for the record: the spec's own guide citations read `:152-163` (description), `:169-183`
  (CLOs), `:193-317` (outline), `:352-364` (books) and `:313` ("bio-magnificatio"). The
  verified ranges are `:152-167`, `:171-191`, `:193-318`, `:352-366` and `:308`. Every
  citation's target content is present in the guide and correctly transcribed in the spec; only
  the line ranges are short or off. This decision rests on the verified lines, not on the
  spec's citation of them, in the manner of `D-2026-0006`'s note on the EFMP-304 duplicate.
- **Bound to:** `specs/content/gnas-301/intake/manifest.json`, manifest digest
  `9050a3b7be854c41c20784294c7481008c23277997e0a71baaf572daeff4bea7`, **54 inputs** at commit
  `34f36685231eeb2fefda164794e0723c72aaa93e`. Recomputed independently with `manifestFor()`
  from `scripts/lib/review-evidence.mjs` over the same `intakeRoots('gnas-301')` root set
  `prepare-intake-evidence.mjs` uses: every path and every digest matched, with no extra and no
  missing entry, and the recorded `manifest_digest` reproduced from a fresh read from disk. The
  `registers` field also matched. **Any change to a bound input voids this approval**
  (Art. VII.8.5). The two registers are recorded in `registers`, not `input_manifest`, so
  recording this decision does not void it.
- **Limits and what remains open:**
  - **The six-unit partition is not approved.** The guide numbers its outline by week and gives
    no unit headings, so the partition is a judgement the guide does not determine; it is
    recorded and escalated as `G-2026-22`. The week calendar itself (16 weeks, mid-term at
    Week 7, final at Week 16) **is** guide-given and is approved as such, as are the merge's
    mechanically verified properties (contiguous whole weeks, no reordering, no week split
    across units, the mid-term week excluded, 16.1 taught in the examination week per the
    guide's own placement).
  - **The reading list's usability and the open-access floor are not approved.** Five of the
    seven guide-required entries do not resolve as printed, and the spec's two-per-unit
    open-access floor follows the EFMP-304 precedent (`D-2026-0013`) whose scope names that
    course only; escalated as `G-2026-23`, which also records that the floor is not declared
    in `open_access_floor` front matter, so `check:source-floor` does not check this course at
    all.
  - Does not approve any unit's English review (G3) or Urdu translation (G5). Certifies no
    content, qualifies no reviewer, authorises no publication (Art. VII.8.4).

## D-2026-0021 - GNAS-301 adopts a binding open-access floor and authors against the confirmed reading list

- **Status:** confirmed
- **Gate:** G0 (course intake), `readings`
- **Scope:** GNAS-301
- **Decided by:** curriculum owner, 2026-09-23 (relayed by the orchestrator session)
- **Decision:** the G2 open-access floor written into GNAS-301's spec is **binding**: at least
  two verifiable open-access sources bound per unit, for **all six units**, resolved through the
  publisher or a named registry and recorded with the date of verification. Following the
  `D-2026-0013` precedent, the floor is declared in the content-spec's `open_access_floor` front
  matter (`"1"` through `"6"`, each 2) so `check:source-floor` enforces it, closing the
  enforcement gap `G-2026-23` recorded. The five `D-2026-0001` flags and closest-real-work
  identifications in the spec's `### Guide-required` table are **confirmed**, and use of the
  verified open-access replacement source set (12 sources, listed in the spec's
  `### Curated-supplementary` table) is confirmed. Failure to meet a unit's floor is an
  escalation, never a reason to lean harder on an unopened book.
- **Basis:** five of the seven guide monographs do not resolve as printed (`D-2026-0020`'s
  independent verification), and the owner has elected to author against the confirmed flags and
  the verified replacement set rather than block on obtaining texts. The front-matter
  declaration is the author's action the owner directed, and is the `G-2026-17` mechanism built
  for exactly this.
- **Limits:** settles GNAS-301 only. The floor numbers are this course's (2 per unit for all six
  units, stronger than EFMP-304's 2/2/2/1/1/1 under `D-2026-0013`); it does not set a
  corpus-wide floor. Together with the owner's partition confirmation recorded in `G-2026-22`'s
  resolution (2026-09-23), this unblocks the two open criteria of `D-2026-0020`, and the
  content-spec is set to `status: approved` on that combined authority. Does not approve any
  unit's English review (G3) or Urdu translation (G5). Certifies no content, qualifies no
  reviewer, authorises no publication (Art. VII.8.4).
