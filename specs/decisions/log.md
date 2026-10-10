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
  - *Amended 2026-10-06 by `D-2026-0045`:* publication authority **is** delegated to the CEO
    for QC-cleared content (§2a checklist A–F on the TEX-4 roadmap). Reviewer qualification
    remains undelegated.
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

---

## D-2026-0030 - GICT-300 intake: identity, partition, coverage, outcomes, readings, blueprint, structure, no decision residue

- **Status:** pending-owner-review
- **Gate:** G0 intake / G1 unit-spec
- **Scope:** GICT-300 only. Settles identity, the six-unit partition, the sub-topic coverage of all
  six checklists, the CLO traces, the reading list including the proposed open-access floor, the
  assessment blueprints, structural conformance, and the absence of decision residue. Does **not**
  settle the week schedule's term length or distribution (`G-2026-25`).
- **Decided by:** agent:evaluator, 2026-09-23
- **Decision:**
  1. **Identity.** GICT-300, "Application of ICT", **3 (2-1)** credit hours, Semester 1, General
     Education, bilingual (catalog default). `catalog/courses.json:24-28` matches the guide
     (`1st 2026.txt:374`, `:381-382`, `:384-387`: Credit Hours 3, Semester 1st) and the revised
     board Scheme (`B.Ed 4 Year 2026 revised after board.txt:54-60`: 3 (2-1)). A credit total and
     a split of that total do not contradict each other, so there is **no Article II.3 conflict
     to escalate** - the posture G-2026-02, G-2026-05 and `D-2026-0015.1` established. The title
     variants (guide "Applications of Information and Communication Technology (ICT)", scheme
     "Application of Information Communication & Technologies(ICT)", catalog "Application of
     ICT") are one course name at different levels of abbreviation; the catalog title is the name
     the owner confirmed in the G-2026-01 Sem I inventory, which binds. `D-2026-0003` (confirmed,
     corpus-wide) covers this course's file in `.specify/Course_guides_and_Scheme/`: a superseded
     departmental variant set, never authoritative; the spec records this correctly at
     `content-spec.md:31-32`.
  2. **Partition follows the guide.** The guide numbers six units (`1st 2026.txt:416`, `:447`,
     `:459`, `:469`, `:481`, `:491`); the spec follows them 1:1 under the guide's own verbatim
     titles (`content-spec.md:84`, `:145`, `:206`, `:265`, `:323`, `:375`). The guide gives
     numbered units, not a week table, so the partition is guide-determined and approved as such.
     The calendar is not guide-determined and is escalated as `G-2026-25`, following the
     `G-2026-16` precedent for EFMP-304.
  3. **Coverage is complete and adds nothing.** The guide enumerates **31** sub-topic bullets
     (6 + 5 + 4 + 5 + 4 + 7, at `:418-428`, `:449-457`, `:461-467`, `:471-479`, `:483-489`,
     `:493-505`). The spec's six checklists carry **40** rows (8 + 8 + 6 + 6 + 4 + 8). Every
     guide bullet appears, none dropped; the 9 extra rows decompose compound bullets whose
     components the guide's own text names: U1 b3 "Evolution and generations" (`:422`) to 2 rows;
     U1 b4 "Classification of computers" (`:424`) to 2 rows on the two axes the guide's own CLO 2
     names at `:400` ("functionality and size"); U2 b1 "Input, output, and storage devices"
     (`:449`) to 3; U2 b2 "Primary and secondary memory" (`:451`) to 2; U3 b1 "Functions and
     types" (`:461`) to 2; U3 b2 "File and process management" (`:463`) to 2; U4 b1 "Cyber threats
     and online security" (`:471`) to 2; U6 b1 "Web browsers and search engines" (`:493`) to 2.
     That is 9 exactly. **No row sits under a bare guide heading with no textual ancestor** (the
     G-2026-08 failure mode is absent), and the spec's own count claim ("31 guide sub-topic
     bullets", `content-spec.md:72`) is accurate. Verified mechanically: 31 distinct guide refs
     across the six checklists, 40 rows, no addition.
  4. **The outcome traces hold.** The guide's eight Learning Outcomes (`:398-412`) are reproduced
     verbatim at `content-spec.md:48-55`. Each has a unit whose guide topics deliver it: CLOs 1, 2
     to Unit 1; CLO 3 to Unit 2; CLO 4 to Unit 3; CLO 5 to Unit 4; CLO 6 to Unit 5; CLOs 7, 8 to
     Unit 6. No SLO lacks a guide ancestor and no CLO is orphaned, so the G-2026-10 failure mode
     is absent. Unit 1's parenthetical CLO 8 "societal-impact thread" (`:88-89`) is a disclosed
     secondary hedge whose primary delivery is Unit 6; recorded, not blocking.
  5. **The reading list is present and every entry resolves to a real work** (guide `:530-538`,
     five entries, all reproduced in the spec's `### Guide-required` table at `:448-452` with
     citations matching the guide). Four are canonical textbooks (Shelly & Vermaat; Norton; Stair
     & Reynolds; Laudon & Laudon); the fifth, the HEC ICT and Digital Literacy Guidelines,
     resolves to HEC's published ICT and Digital Literacy Policy/Guidelines line at hec.gov.pk
     (checked externally on 2026-09-23, an external registry rather than a bound input, the same
     footing as the EFMP-304 run's Open Library check). All five are print/official with no
     open-access text: monographs noted, each binding the author to **title-level support** under
     `D-2026-0001` (confirmed, corpus-wide), which the spec states at `:439-452` and in every
     unit's `**Mapped readings**` line. The spec's mitigation - a 13-entry curated open-access
     list (`:454-471`) plus a declared `open_access_floor: default: 2` (`:5-6`, `:473-476`) - is
     **approved as an application of `D-2026-0013`'s confirmed pattern** to the exact condition
     that ruling names (a print-only guide list), at numbers at or above every confirmed
     precedent (EFMP-304's owner-ruled 2/2/2/1/1/1; GENG-300's evaluator-approved 1/1/1 under
     `D-2026-0019`), and mechanically enforced at G2 by `scripts/check-source-floor.mjs` (the
     G-2026-17 fix). Every unit maps at least two open-access candidates, so the floor is
     satisfiable from the spec's own mapping. `D-2026-0013` expressly did not set a corpus-wide
     floor; this adoption is flagged for the owner within this pending-owner-review entry, and a
     reversal of it strikes the floor without touching the rest of this approval.
  6. **All six assessment blueprints are internally consistent and consistent with the style
     guide.** `specs/content/style-guide.md:227-230` fixes the bank at exactly 10 MCQs, 10 RRQs
     and 5 ERQs; every unit uses that bank (`content-spec.md:141-143`, `:202-204`, `:261-263`,
     `:320-321`, `:372-373`, `:432-434`). Per-topic floors of >= 2 MCQ and >= 2 RRQ resolve to 8
     of 10 on the five four-topic units and 6 of 10 on Unit 5's three topics; "one ERQ per topic
     plus an integrative item" resolves to exactly 5 on four-topic units and floors at 4 of 5 on
     Unit 5. No floor the spec sets would be breached by its own items in any unit. Every unit
     carries an Analyze-or-higher integrative ERQ. The Bloom bands are not stated in the spec;
     the style guide's defaults govern, the posture `D-2026-0019` approved for GENG-300 (see
     repair item (a) for the enforcement consequence). The guide carries no assessment-criteria
     table, so the Constitution Art. III.7 default 60/40 at `:63-65` is the correct fallback. The
     course review plan's 24/18/12 mix (`:498-499`) is permitted: `style-guide.md:234-235` fixes
     no count for `course-review.mdx`.
  7. **Structure conforms.** Front matter (`course_code: GICT-300`, `status: draft`) validates
     against `contracts/content-spec-frontmatter.schema.json`. Every required course-level
     section is present - `## Course-wide items`, `## Course Description`, `## Reading list` with
     both subheadings, `## Week schedule` (conforming to `D-2026-0012` as to form: derived,
     clearly labelled, basis stated at `:69-73`), `## Standards & frameworks anchors`, `##
     Course review plan` - and each unit subsection carries the full block set. Section order
     follows the GENG-300/EED-313 family; no gate parses course-level order. The spec-side
     invariants were replayed directly with the depth gate's own parsers (the docs-walking gates
     are vacuous for this course: no unit is authored, and `docs/semester-1/gict-300/unit-01/`
     holds only the `coming_soon` navigation scaffold from the initial platform commit): for all
     six units the `Sub-topic IDs` cells form a **total, disjoint partition** of the checklist;
     every checklist `Topic` cell equals its `### Topic list` row label; every `**Depth budget**`
     count matches its own tables; every topic plans two figure IDs and every unit at least one
     concept-map, flowchart or timeline (Art. III.10); figure IDs are consistent between topic
     lists and figure plans (46 figures). Zero failures across all six units.
  8. **No decision residue.** All `confirmed` entries were swept against the **whole** spec, not
     only the sections their scope lines name. `D-2026-0001` is invoked within its Limits
     (title-level, disclosed). `D-2026-0002`/`D-2026-0004`'s superseded EFMP-302 activity design
     appears nowhere; the spec's only "one-page" wording (`:509`) is its own
     emerging-technology briefing practicum, an unrelated activity, and all five practicum briefs
     (`:500-510`) are GICT-300's own. `D-2026-0003` is correctly applied to this course's file in
     the superseded folder. `D-2026-0005` is not evaded. `D-2026-0012` is applied in the body.
     `D-2026-0013` is applied as disclosed precedent (`:473-476`), not copied beyond what fits
     this course. `D-2026-0014` introduces no superseded design, and this decision authorises no
     publication.
- **Basis:**
  `Scheme-and-Course-guides/extracted-text/1st 2026.txt`, the GICT-300 block at `:374-538`: code
  `:374`, title `:381-382`, credit hours `:384-387`, description `:389-395`, outcomes `:398-412`,
  unit outline `:416-505`, strategies and practical work `:507-527`, readings `:530-538`. The
  revised board Scheme at `B.Ed 4 Year 2026 revised after board.txt:54-60`. `catalog/courses.json:24-28`
  for code/title/credits/category. `specs/content/style-guide.md` (v4.5) for the bank, Bloom bands
  and visual density; `specs/007-content-depth-standard/contracts/content-spec-v2.md` and
  `specs/008-rich-unit-pedagogy/contracts/content-spec-v3.md` for the section set and per-unit
  tables; `contracts/content-spec-frontmatter.schema.json` for the front matter;
  `specs/decisions/log.md` for the residue sweep. Items 1 to 4 are determined by the guide
  directly, because each is a reading of the guide's own enumerated text against the spec's
  tables. Item 5 rests on the guide for presence and on the owner's confirmed `D-2026-0001` and
  `D-2026-0013` for the print-only posture and its mitigation. Items 6 to 8 rest on the guide for
  content and on the bound style guide and contracts for form, as the `structure` criterion
  contemplates.
- **Deterministic checks actually run at HEAD `73001c11`, with real exit codes:**
  `npm run validate:content` **1** (13 errors, all in `docs/semester-1/geng-300/unit-01/`, another
  course, pre-existing; zero GICT-300 findings); `npm run check:no-em-dash` **1** (9 occurrences,
  all in `specs/content/geng-300/intake/evaluation.md`, the previous evaluator's own record; the
  GICT-300 spec is clean); `npm run check:source-floor` **1** (one GICT-300 finding, "Unit 1
  declares a floor of 2 but has no sources/unit-01.md" - the expected intake state, since
  per-unit sources are authored with units and the walked unit-01 is the coming-soon scaffold);
  `npm run check:depth-gate` **1**, `npm run check:figures` **1**, `npm run check:no-answer-keys`
  **1**, `npm run check:pipeline-gate` **1** (every finding GENG-300 Unit 1; vacuous for
  GICT-300); `npm run check:docs-sync` **0**; `npm run check:bloom-bands` **0** (vacuous for
  GICT-300 - the spec declares no bands in the format the gate parses, repair item (a));
  `npm run check:concept-graph` **0**. The GICT-300-relevant invariants were therefore replayed
  directly against the bound spec with the gate's own parsers; zero failures (decision item 7).
- **Bound to:** `specs/content/gict-300/intake/manifest.json`, manifest digest
  `50960500ee7effa5b56c57be3c52a4816ee4c5f21fda29ded8ecaf66c39e901f`, **54 inputs** at commit
  `73001c11e29e4f7cd1733091f976d31aaaf9081d`. Recomputed independently with `manifestFor()` from
  `scripts/lib/review-evidence.mjs` over the same `intakeRoots('gict-300')` root set the prepare
  script uses: every path and every digest matched, with no extra and no missing entry, and the
  recorded `manifest_digest` reproduced from both the file's map and a fresh read from disk. The
  `registers` field also matched. **Any change to a bound input voids this approval**
  (Art. VII.8.5). Per the `G-2026-15` fix, `specs/decisions/log.md` and `specs/gaps.md` are
  recorded in `registers` and are deliberately **not** freshness-bearing, so recording this
  decision does not void it.
- **Effect on `status`:** with the calendar excluded (`G-2026-25`), all eight criteria pass on
  their guide-determined substance, so `specs/content/gict-300/content-spec.md` is set to
  **`status: approved`** - the transition the spec itself assigns to this gate at `:15-17`. That
  releases authoring under Spec 006 FR-002. **This is not an authorisation to publish.**
  Publication authority is the owner's and was given in `D-2026-0014`; Art. VII.8.4 withholds it
  from an evaluator.
- **Repair items, reported for repair, needing no owner decision, none blocking:**
  (a) the six unit-end blueprint lines use condensed prose that `scripts/check-bloom-bands.mjs`
  cannot parse and state no Bloom bands, so the deterministic Bloom-band gate will be vacuous for
  GICT-300 once units are authored; rewrite them in the contract's bullet format with the style
  guide's default bands **before any unit is authored** - this matters more than usual because
  GICT-300 is `D-2026-0014`-covered and can publish gate-checked with no reviewer (the same
  defect is live for GENG-300's authored Unit 1 and EED-313 Units 2-4, reported to the parent);
  (b) Unit 1's topic Reading-min bands sum to 38-54, whose ceiling is one minute below the unit
  band floor of 55 (`:117-120` vs the topic list at `:115-120`); the gated sum includes index and
  assessment minutes so the budget is satisfiable, but the topic guidance and the unit band are
  inconsistent at the boundary - align one of them before authoring Unit 1.
- **Limits and what remains open:**
  - **The week schedule is approved as to form only.** The 16-week term and the 3/3/2/3/2/3
    distribution are **not** approved: `G-2026-25`. The `## Week schedule` table and the "Weeks
    N-M (derived)" line opening each of the six unit subsections (`:86`, `:147`, `:208`, `:267`,
    `:325`, `:377`) are blocked with it. Nothing else is: authoring does not depend on them and
    no gate reads them.
  - Does not approve any unit's English review (G3) or Urdu translation (G5). Certifies no
    content, qualifies no reviewer, authorises no publication (Art. VII.8.4).
## D-2026-0040 - GQUR-300 intake: identity, partition, coverage, outcomes, blueprint, structure, residue approved; readings escalated

- **Status:** pending-owner-review
- **Gate:** G0 intake / G1 unit-spec
- **Scope:** GQUR-300 only. Settles identity, the six-unit partition, the sub-topic coverage of all
  six checklists, the CLO traces, the assessment blueprints, structural conformance, and the absence
  of decision residue. Does **not** settle the reading list's resolvability (`G-2026-28`).
- **Decided by:** agent:evaluator, 2026-09-23
- **Decision:**
  1. **Identity.** GQUR-300, "Quantitative Reasoning-I", **3 (3-0)** credit hours, Semester 1,
     category General Education, bilingual by default, as `catalog/courses.json` records it in its
     Semester 1 group. The guide gives the code at `1st 2026.txt:546`, the title
     "Quantitative Reasoning-1(Maths)" at `:549`, "Semester : 1st" at `:552`, and credit hours as a
     bare total "3" at `:554` with no split. The revised board Scheme (final authority) gives
     `GQUR-300 / Quantitative Reasoning-1 (Math) / 3(3-0) / General Education` at
     `B.Ed 4 Year 2026 revised after board.txt:18-24`, in its Semester I block. The title variants
     ("1" vs "I", "Maths" vs "Math", the parenthetical dropped in the catalog) are typographic, the
     same posture as `D-2026-0006`'s ampersand ruling; the guide's total and the Scheme's split do
     not contradict each other, which is the `G-2026-02`/`G-2026-05` posture. **There is no Article
     II.3 conflict to escalate.** The departmental variant
     `.specify/Course_guides_and_Scheme/300 Quantitative_Reasoning_I.docx` sits in the bound bundle;
     `D-2026-0003` (confirmed, corpus-wide) settles that folder as superseded provenance-only, and
     the spec cites only the Faculty guide, so nothing new is in conflict. The catalog entry omits
     `bilingual`, which the repo's `!== false` convention reads as bilingual (GENG-300/GENG-301 are
     the explicit opt-outs), consistent with the spec's full-Urdu-scope claim and its degree-track
     placement.
  2. **Partition follows the guide.** The guide numbers six units at `1st 2026.txt:577`, `:584`,
     `:591`, `:598`, `:620`, `:629` under its own titles; the spec carries exactly those six units
     under those titles. The guide carries **no week table**; the spec's `## Week schedule` is a
     derived distribution **clearly labelled as derived with its basis stated**
     (`content-spec.md:89-90`, and the "(derived)" tag on every unit's weeks line), which is the
     form `D-2026-0012` (confirmed, corpus-wide) permits. The 16-week term and the 3/3/3/2/3/2
     distribution are approved **as to form** on the `D-2026-0012` footing, the same disposition
     `D-2026-0019` gave GENG-300's derived 16-week schedule; the calendar substance remains the
     spec's construction, not the guide's, and is recorded as such in Limits.
  3. **Coverage is complete and adds nothing.** The guide enumerates **24** sub-topic bullets, four
     per unit (`:579-582`, `:586-589`, `:593-596`, `:600`/`:601`/`:617`/`:618`,
     `:622`/`:623`/`:624`/`:627`, `:631`/`:632`/`:634`/`:636`). The spec's six checklists carry
     **30** rows (5+6+5+4+4+6). Every guide bullet appears exactly once, as itself or as its named
     components, and the **six extra rows decompose five compound bullets using the guide's own
     words**: `G1.4` "Logical reasoning and problem-solving strategies" to U1-04/U1-05; `G2.1`
     "Whole numbers, integers, fractions, and decimals" to U2-01/U2-02; `G2.2` "Ratios,
     proportions, and percentages" to U2-03/U2-04; `G3.2` "Linear equations and inequalities" to
     U3-02/U3-03; `G6.1` "Financial literacy (profit, loss, interest, budgeting)" to
     U6-01/U6-02/U6-03. Nothing is lost and nothing is added beyond the guide's own words: the one
     insertion, "of numbers and operations" in U2-06, is the guide's own Unit 2 heading. Verified
     mechanically, word-level, in both directions. This is the `D-2026-0019` standard applied to
     GENG-300's comma-lists, applied here.
  4. **The outcome traces hold.** The guide's five course outcomes (`:567`, `:568`, `:570`,
     `:571`, `:573`) are reproduced verbatim at `content-spec.md:37-42`. Each has at least one unit
     whose guide topics deliver it: CLO 1 (Unit 1 numeracy and number sense; Units 2-3), CLO 2
     (Units 2-6 applications), CLO 3 (Unit 1 logical reasoning; Unit 2 ratios and proportions),
     CLO 4 (Unit 6 "Interpreting quantitative information in education and society"), CLO 5 (Unit 5
     tables, graphs, charts and statistical interpretation). **No SLO lacks a guide ancestor and no
     CLO is orphaned**, so the `G-2026-10` failure mode is absent. The Unit 4 trace to CLO 4 is the
     loosest (no Unit 4 guide bullet names communication); it is a mapping judgement, not an
     addition, and CLO 4 does not depend on it.
  5. **Readings: presence approved, resolvability not.** The guide's four readings (`:653-656`)
     are all present in `### Guide-required`. `steen2001` resolves to a real work (Open Library:
     Steen 2001, with a borrowable Internet Archive ebook), but the spec's added locator
     "ERIC ED459269" is **false**: ED459269 is "State Summary of West Virginia. Ed Watch Online."
     (Education Trust, 2001), verified against eric.ed.gov and the ERIC API, and *Mathematics and
     Democracy* is not findable in ERIC at all. `grawe` does **not** resolve from this host: Open
     Library catalogues eight Nathan D. Grawe works and not this title, the Internet Archive and
     ERIC have no record, and Cognella answers 403. `ncm2006` is deferred by the spec itself with
     added bibliographic detail (2006, Grades I-XII, Ministry of Education, Islamabad) that no
     bound input verifies. `npst2009` resolves (in-corpus: EFMP-302's `npst-pakistan-2009`, with
     the itacec.org retrieval limit already recorded under `D-2026-0001`). **Escalated as
     `G-2026-28`**, following the `G-2026-09`/`D-2026-0010` precedent for guide-required entries
     that do not resolve.
  6. **All six assessment blueprints are internally consistent and consistent with the style
     guide.** Every unit carries the fixed 10/10/5 bank (`style-guide.md` unit-end assessment bank
     section), MCQ Remember to Apply, RRQ Understand to Analyze, ERQ Analyze to Evaluate, and the
     Analyze-or-higher ERQ rubric requirement. Every unit has three topics, so the spec's
     ">= 2 MCQ and >= 2 RRQ per topic" floors resolve to 6 of 10 with headroom: **no floor its own
     items would breach, in any unit** (the EFMP-304 Unit 1 defect class is absent). The
     parenthetical relaxations in Units 3-6 ("Topic N may carry fewer where items integrate
     earlier sub-topics") are deliberate, disclosed relaxations of the spec's own floor; the style
     guide sets no per-topic minimum, so nothing binding is breached. The course-review plan's
     ~15-20 / ~10-15 / ~5-8 mix is permitted (the style guide fixes no count for
     `course-review.mdx`).
  7. **Structure conforms.** Front matter (`course_code: GQUR-300`, `status: draft`) validates
     against `contracts/content-spec-frontmatter.schema.json`. All required course-level sections
     are present in contract order (`## Course-wide items`, `## Course Description`,
     `## Reading list` with both `### Guide-required` and `### Curated-supplementary (open
     access)`, `## Week schedule`, `## Standards & frameworks anchors`, `## Course review plan`),
     and every per-unit block is present in all six units. The spec-side invariants were replayed
     directly with the gate's own parsers (`unitSectionLines`, `parseTopicList`, `parsePipeTable`,
     `tableAfterHeading`), because every gate that walks `docs/` is vacuous for GQUR-300 (no
     authored units): for all six units the `Sub-topic IDs` cells form a **total, disjoint
     partition** of the checklist; every checklist `Topic` cell equals its `### Topic list` row
     label; every `**Depth budget**` sub-topic and topic count matches its tables; every topic
     plans two figure carriers; every unit plans at least one concept-map, flowchart or timeline
     (Art. III.10). Zero failures across all six units.
  8. **No decision residue.** All confirmed entries were swept against the **whole** spec.
     `D-2026-0001` is invoked at the grawe row within its Limits. `D-2026-0003` is correctly
     inapplicable: the spec cites only the Faculty guide and never the departmental variant, though
     the variant file sits in the bound bundle. `D-2026-0005` is not evaded. `D-2026-0012` is
     applied correctly (the week schedule is labelled derived with its basis stated).
     `D-2026-0002`/`D-2026-0004`'s superseded EFMP-302 activity design appears nowhere; the only
     "one-page" hit in the spec is GQUR-300's own practicum wording. `D-2026-0013` is
     EFMP-304-specific and correctly not extended: GQUR-300 declares no `open_access_floor`, and
     its guide list is not wholly print-only. `D-2026-0014` introduces no superseded design.
- **Basis:** `Scheme-and-Course-guides/extracted-text/1st 2026.txt`, the GQUR-300 block at
  `:546-680`: code `:546`, title `:549`, semester `:552`, credit hours `:554`, description
  `:558-563`, outcomes `:564-573`, unit headings `:577`/`:584`/`:591`/`:598`/`:620`/`:629`,
  readings `:651-656`, teaching strategies `:638-646` and `:658-661`, practical work `:663-666`,
  assessment criteria `:668-680`. The revised board Scheme at
  `B.Ed 4 Year 2026 revised after board.txt:18-24`. `catalog/courses.json` Semester 1 group.
  `specs/content/style-guide.md` v4.5 for the bank, Bloom bands and visual density;
  `contracts/content-spec-frontmatter.schema.json` and the content-spec v2/v3 contracts for the
  section set. External registries (not bound inputs, checked 2026-09-23): Open Library, the
  Internet Archive and the ERIC API for the readings findings in item 5. Items 1-4 are determined
  by the guide directly; items 6-8 rest on the bound style guide and contracts and are approved on
  that footing; item 5 rests on the guide for presence and on the registries for resolvability.

  **Deterministic checks actually run at HEAD `ffd1f6f`, with real exit codes:**
  `npm run check:no-em-dash` **1** (9 findings, all in `specs/content/geng-300/intake/evaluation.md`,
  none in GQUR-300); `npm run validate:content` **1** (GENG-300 unit-01 front matter, none GQUR-300);
  `npm run check:bloom-bands` **0**; `npm run check:concept-graph` **0**; `npm run check:depth-gate`
  **1** (GENG-300 Unit 1, none GQUR-300); `npm run check:figures` **1** (GENG-300 Unit 1, none
  GQUR-300); `npm run check:no-answer-keys` **1** (GENG-300 teacher notes, none GQUR-300);
  `npm run check:docs-sync` **0**; `npm run check:source-floor` **1** (GENG-300 declares a floor,
  GQUR-300 declares none); `npm run check:pipeline-gate` **1** (none GQUR-300). Every failing gate
  fails on GENG-300's authored unit or on the GENG-300 evaluator's own record; a grep of every
  failing output for "gqur" returns zero. The green gates are vacuous for this course (no authored
  units) and are recorded as such, not cited as passes; the spec-side invariants above were
  replayed directly instead.
- **Bound to:** `specs/content/gqur-300/intake/manifest.json`, manifest digest
  `c16e64c0a515fcb2cf58325c847e975f72adbfe60bae20e2d1c4672bf641c007`, **54 inputs** at commit
  `ffd1f6fe3d2e1cb2e8643ae656c2417a665522ac`. Recomputed independently with `manifestFor()` from
  `scripts/lib/review-evidence.mjs` over the same `intakeRoots('gqur-300')` root set the prepare
  script uses: every path and every digest matched, with no extra and no missing entry, and the
  recorded `manifest_digest` reproduced from a fresh read. The `registers` field also matched.
  **Any change to a bound input voids this approval** (Art. VII.8.5). The two registers are in
  `registers`, not `input_manifest`, per the `G-2026-15` fix, so recording this decision does not
  void it.
- **Limits and what remains blocked:**
  - **Criterion 5 `readings` is not approved.** `G-2026-28`. The `### Guide-required` rows for
    `grawe` and `ncm2006`, and those two keys within the `**Mapped readings**` lines of Units 2-6
    (grawe in Units 5-6, ncm2006 in Units 2-4), are blocked with it. The `steen2001` and `npst2009`
    rows and the whole `### Curated-supplementary (open access)` table are not blocked.
  - **`status` stays `draft`.** Authoring remains blocked under Spec 006 FR-002 until `G-2026-28`
    is settled and the locator repair below lands. This decision is the G0/G1 approval for
    everything else; once the readings question is settled, no re-evaluation of items 1-4 and 6-8
    is needed unless a bound input changes.
  - **The week schedule is approved as to form only.** The 16-week term and the 3/3/3/2/3/2
    distribution are the spec's construction, permitted and labelled under `D-2026-0012`, not
    guide-given. Same disposition as GENG-300 under `D-2026-0019`.
  - **Reported for repair, needing no owner decision:** (a) the `steen2001` locator
    "ERIC ED459269, https://eric.ed.gov/?id=ED459269" is false and must be corrected or removed
    (the work is real and borrowable via the Internet Archive; it is not findable in ERIC);
    (b) the guide-block citation "lines 549-715" is imprecise (the block runs `:546-680`; `:709`
    onward is the EFMP-302 header) and the Course Description citation ":555-561" should read
    ":558-563"; (c) the Unit 4 CLO-4 trace is loose and would rest better on Unit 6 alone.
  - Does not approve any unit's English review (G3) or Urdu translation (G5). Certifies no content,
    qualifies no reviewer, authorises no publication (Art. VII.8.4).

---

## D-2026-0041 - GQUR-300 re-evaluation after repair: identity, partition, coverage, outcomes, blueprint, structure, residue re-approved; readings still not approved (G-2026-28 open)

- **Status:** pending-owner-review
- **Gate:** G0 intake / G1 unit-spec
- **Scope:** GQUR-300 only. Re-evaluation of the spec as repaired at commit `139876c` ("fix(gqur-300):
  repair intake findings from D-2026-0040 / G-2026-28"), by an evaluator who did not draft it. Settles
  identity, the six-unit partition, the sub-topic coverage of all six checklists, the CLO traces, the
  assessment blueprints, structural conformance, the absence of decision residue, and the resolvability
  of every reading **except** the two whose disposition `G-2026-28` reserves to the owner. Does **not**
  settle the `grawe` and `ncm` rows of `### Guide-required`. `D-2026-0040`'s approval bound to `ffd1f6f`;
  the repair changed the spec, voiding it under Art. VII.8.5, so this entry re-records the approvals at
  `139876c`.
- **Decided by:** agent:evaluator, 2026-09-23
- **Decision:**
  1. **Identity.** GQUR-300, "Quantitative Reasoning-I", **3 (3-0)** credit hours, Semester 1, category
     General Education, bilingual by default, as `catalog/courses.json` records it in its Semester 1
     group. The guide gives the code at `1st 2026.txt:546`, the title "Quantitative Reasoning-1(Maths)"
     at `:549`, "Semester : 1st" at `:552`, and credit hours as a bare total "3" at `:554` with no split.
     The revised board Scheme (final authority) gives `GQUR-300 / Quantitative Reasoning-1 (Math) /
     3(3-0) / General Education` at `B.Ed 4 Year 2026 revised after board.txt:18-24` (verified this run).
     The title variants are typographic (`D-2026-0006` posture); the guide's total and the Scheme's
     split do not contradict each other (`G-2026-02`/`G-2026-05` posture). **No Article II.3 conflict.**
     The departmental variant `.specify/Course_guides_and_Scheme/300 Quantitative_Reasoning_I.docx` sits
     in the bound bundle; `D-2026-0003` (confirmed, corpus-wide) settles that folder as superseded
     provenance-only, and the spec cites only the Faculty guide (zero `.specify` references, verified).
     The catalog entry omits `bilingual`, which the repo's `!== false` convention
     (`scripts/check-figures.mjs:128`) reads as bilingual.
  2. **Partition follows the guide.** The guide numbers six units at `1st 2026.txt:577`, `:584`, `:591`,
     `:598`, `:620`, `:629`; the spec carries exactly those six units under those titles (verified
     mechanically, string-equal after trimming the PDF bullet glyph). The guide carries **no week
     table**; the spec's `## Week schedule` is a derived distribution clearly labelled as derived with
     its basis stated (`content-spec.md:30-33`, `:99-102`, and "(derived)" on every unit's weeks line),
     the form `D-2026-0012` (confirmed, corpus-wide) permits. The 16-week term and the 3/3/3/2/3/2
     distribution are approved **as to form only**; the calendar substance remains the spec's
     construction (see Limits), the same disposition `D-2026-0019` gave GENG-300.
  3. **Coverage is complete and adds nothing.** The guide enumerates **24** sub-topic bullets, four per
     unit (`:579-582`, `:586-589`, `:593-596`, `:600`/`:601`/`:617`/`:618`,
     `:622`/`:623`/`:624`/`:627`, `:631`/`:632`/`:634`/`:636`). The spec's six checklists carry **30**
     rows (5+6+5+4+4+6). Every guide bullet appears exactly once, as itself or as its named components;
     the six extra rows decompose five compound bullets using the guide's own words (`G1.4` to
     U1-04/U1-05; `G2.1` to U2-01/U2-02; `G2.2` to U2-03/U2-04; `G3.2` to U3-02/U3-03; `G6.1` to
     U6-01/U6-02/U6-03). Verified mechanically, word-level, in both directions (nothing lost, nothing
     added beyond the guide's own words; the one insertion, "of numbers and operations" in U2-06, is the
     guide's own Unit 2 heading at `:584`). `D-2026-0019` standard.
  4. **The outcome traces hold.** The guide's five course outcomes (`:567`, `:568`, `:570`, `:571`,
     `:573`) are reproduced verbatim at `content-spec.md:37-42` (verified mechanically; the only
     difference is the guide's PDF bullet glyph). Each CLO is referenced by at least one unit (CLO 1:
     Units 1-3; CLO 2: Units 2-6; CLO 3: Units 1-2; CLO 4: Units 4 and 6; CLO 5: Units 5-6). No SLO
     lacks a guide ancestor and no CLO is orphaned. The repaired Unit 4 trace to CLO 4 now discloses its
     mechanism ("communicating measurements and geometric results precisely"); it remains a mapping
     judgement, not an addition, and CLO 4's guide-anchored delivery rests on Unit 6
     ("Interpreting quantitative information in education and society", `:636`).
  5. **Readings: presence and every resolvable entry approved; the `grawe`/`ncm` disposition is not.**
     All four guide readings (`:653-656`) are present in `### Guide-required`. **`steen2001` resolves
     and its repaired locator is true**: the Internet Archive record
     `https://archive.org/details/mathematicsdemoc0000unse` was fetched this run and is "Mathematics
     and democracy: the case for quantitative literacy", NCED, Princeton NJ, 2001, ISBN 0970954700,
     controlled-lending - exactly what the spec's citation and note state; the Open Library work
     `OL18229070W` also verified. **`npst2009` resolves** (in-corpus precedent: EFMP-302's
     `npst-pakistan-2009` at the identical itacec.org URL; the host's HTTP 401 is the retrieval limit
     already recorded under `D-2026-0001`). **Every curated-supplementary work is real**: `grawe2012`
     (ERIC EJ981327), `sikko2023` (EJ1450768), `gula2025` (EJ1489427), `mcclure2020` (EJ1480153) all
     verified exact against eric.ed.gov this run; `tout2020` (EJ1266633) verified real;
     `openstax-prealgebra` resolves at its exact URL with matching title/authors/year; `pbs` resolves
     (HTTP 200). **The `D-2026-0013` floor pattern is satisfied**: every unit's `**Mapped readings**`
     line carries at least one verified open-access source (U1: grawe2012, sikko2023; U2: gula2025,
     openstax-prealgebra; U3/U4: openstax-prealgebra; U5: grawe2012, tout2020, pbs; U6: mcclure2020,
     pbs), verified mechanically. **Not approved:** the `grawe` and `ncm` rows. `G-2026-28` remains
     open and reserves their disposition to the owner; the repair applied the unresolvable-recording
     branch of that choice unilaterally. The `ncm` row now conforms to the `D-2026-0010` manner (the
     unverified 2006/Grades I-XII/imprint details are gone; the citation is the guide's own words
     `:655`); the `grawe` row does not fully conform - it retains "Cognella Academic Publishing", an
     added detail no bound input verifies, against the same row's "cited at bibliographic level only".
     Extending the `D-2026-0010` manner (scope: EFMP-302, two keys) to another course is a scope
     judgement, and every reading-list disposition in this register so far (`D-2026-0010`,
     `D-2026-0013`, the `G-2026-21` decision) was an owner ruling on its own course's list. The
     evaluator's own web searches this run surfaced a plausible Cognella record for the Grawe title
     (full title "Quantitative Literacy: Reasoning About Data, Change, Chance, and Uncertainty", ISBN
     978-1-5165-4901-6) that could not be verified from this host through any registry (Open Library:
     no record, checked this run; Cognella's site serves search pages but no static product record;
     search results unstable across repeated queries), so the owner's confirm-or-record choice is
     substantive, not formal.
  6. **All six assessment blueprints are internally consistent and consistent with the style guide.**
     Every unit carries the fixed 10/10/5 bank with MCQ Remember to Apply, RRQ Understand to Analyze,
     ERQ Analyze to Evaluate, and the Analyze-or-higher ERQ rubric requirement
     (`specs/content/style-guide.md:223-231`). Every unit has three topics, so the ">= 2 MCQ and >= 2
     RRQ per topic" floors resolve to 6 of 10 with headroom: **no floor its own items would breach,
     in any unit**. The parenthetical relaxations in Units 3-6 are deliberate, disclosed relaxations
     of the spec's own floor; the style guide sets no per-topic minimum. The course-review plan's
     ~15-20 / ~10-15 / ~5-8 mix is permitted (`style-guide.md:234-235` fixes no count for
     `course-review.mdx`).
  7. **Structure conforms.** Front matter (`course_code: GQUR-300`, `status: draft`) validates against
     `contracts/content-spec-frontmatter.schema.json` (replayed directly with ajv). All six required
     course-level sections are present in contract order, both reading-list subheadings carry the
     contract's column set, and every per-unit block is present in all six units (verified
     mechanically). No em dashes in the spec. The spec-side invariants were replayed directly with the
     gate's own parsers (`unitSectionLines`, `parseTopicList`, `parsePipeTable`, `tableAfterHeading`),
     because every gate that walks `docs/` is vacuous for GQUR-300 (no authored units): for all six
     units the `Sub-topic IDs` cells form a **total, disjoint partition** of the checklist; every
     checklist `Topic` cell equals its `### Topic list` row label; every `**Depth budget**` count
     matches its tables; every topic carries exactly two figure carriers, consistent between the
     `### Topic list` column and the `**Figure plan**` bullets; every unit plans at least one
     concept-map, flowchart or timeline (Art. III.10). Zero failures across all six units. Every
     `**Mapped readings**` key resolves to a reading-list row.
  8. **No decision residue.** All confirmed entries were swept against the **whole** spec.
     `D-2026-0001` is invoked within its Limits (steen2001, grawe and npst2009 notes state their
     text-retrieval limits). `D-2026-0002`/`D-2026-0004`'s superseded EFMP-302 activity design appears
     nowhere; the only "one-page" hit is GQUR-300's own practicum wording (`content-spec.md:137`).
     `D-2026-0003` is correctly inapplicable (the spec cites only the Faculty guide). `D-2026-0005` is
     not evaded. `D-2026-0012` is applied correctly. `D-2026-0013` is invoked as precedent in prose,
     not contradicted and not silently converted into a binding rule (the spec declares no
     `open_access_floor`; see Limits). `D-2026-0014` introduces no superseded design. All three repair
     items `D-2026-0040` listed have landed: the source-block citation now reads `:546-680`, the Course
     Description citation `:558-563`, the `steen2001` locator is the verified IA record, and the Unit 4
     CLO-4 trace is tightened.
- **Basis:** `Scheme-and-Course-guides/extracted-text/1st 2026.txt`, the GQUR-300 block at `:546-680`:
  code `:546`, title `:549`, semester `:552`, credit hours `:554`, description `:558-563`, outcomes
  `:564-573`, unit headings `:577`/`:584`/`:591`/`:598`/`:620`/`:629`, readings `:653-656` (Steen `:653`,
  Grawe `:654`, National Curriculum for Mathematics `:655`, HEC NPST `:656`). The revised board Scheme
  at `B.Ed 4 Year 2026 revised after board.txt:18-24`. `catalog/courses.json` Semester 1 group.
  `specs/content/style-guide.md` v4.5 for the bank, Bloom bands and visual density;
  `contracts/content-spec-frontmatter.schema.json` and the content-spec v2/v3 contracts for the
  section set. External registries (not bound inputs, checked 2026-09-23): the Internet Archive and
  Open Library for `steen2001`; eric.ed.gov for the five curated articles; Crossref
  (10.1007/s11159-020-09831-4) for `tout2020`'s page range; Open Library and Cognella's site for
  `grawe`. Items 1-4 are determined by the guide directly; items 6-8 rest on the bound style guide and
  contracts and are approved on that footing; item 5 rests on the guide for presence and on the
  registries for resolvability.

  **Deterministic checks actually run at HEAD `139876c`, with real exit codes:**
  `npm run check:no-em-dash` **1** (9 findings, all in `specs/content/geng-300/intake/evaluation.md`);
  `npm run validate:content` **1** (13 errors, all GENG-300 unit-01); `npm run check:bloom-bands`
  **0**; `npm run check:concept-graph` **0**; `npm run check:depth-gate` **1** (GENG-300);
  `npm run check:figures` **1** (GENG-300); `npm run check:no-answer-keys` **1** (GENG-300);
  `npm run check:docs-sync` **0**; `npm run check:source-floor` **1** (GENG-300 declares a floor with
  no sources file); `npm run check:pipeline-gate` **1** (none GQUR-300). A grep of every failing
  output for "gqur" returns zero. The green gates are vacuous for this course (no authored units) and
  are recorded as such, not cited as passes; the spec-side invariants above were replayed directly
  instead.
- **Bound to:** `specs/content/gqur-300/intake/manifest.json`, manifest digest
  `4acaa8f34ee767a924610174fd2a9c2e63a0ae3b8aa3fc623978a7fb65a782da`, **54 inputs** at commit
  `139876c5c19f9c8ef093eb2c57b25ce4e2462e5a`. Recomputed independently with `manifestFor()` from
  `scripts/lib/review-evidence.mjs` over the same `intakeRoots('gqur-300')` root set the prepare
  script uses: every path and every digest matched, with no extra and no missing entry, and the
  recorded `manifest_digest` reproduced. The `registers` field also matched. **Any change to a bound
  input voids this approval** (Art. VII.8.5). The two registers are in `registers`, not
  `input_manifest`, per the `G-2026-15` fix, so recording this decision does not void it.
- **Limits and what remains blocked:**
  - **Criterion 5 `readings` is not approved.** `G-2026-28` stays open. Blocked: the `grawe` and `ncm`
    rows of `### Guide-required`, and those two keys within the `**Mapped readings**` lines of Units
    2-6 (ncm in Units 2-4, grawe in Units 5-6). Not blocked: the `steen2001` and `npst2009` rows, the
    whole `### Curated-supplementary (open access)` table as to the reality of its works, and the
    per-unit open-access mapping. **Update to `G-2026-28` recorded here** (the gap entry itself is not
    rewritten): its item 1's spec-side defects are repaired except the Cognella imprint; its item 2's
    unverified additions are removed and the row now conforms to the `D-2026-0010` manner; its item
    3's false locator is fixed and verified true; the owner's remaining choice is exactly the
    confirm-or-record decision the gap frames, now with a narrower surface.
  - **Repairs needed, no owner decision:** (a) `tout2020`'s page range "583-605" is **false** - ERIC
    EJ1266633 and Crossref both give **183-209** (verified this run); (b) the `grawe` note's guide
    citation `1st 2026.txt:652` is false - line 652 is blank; Grawe is at `:654`; (c) the `ncm` note's
    citation `1st 2026.txt:653` is false - line 653 is the Steen entry; NCM is at `:655`. All three
    were introduced by the repair; (d) if the owner directs the unresolvable recording for `grawe`,
    the "Cognella Academic Publishing" imprint must go with it, since the row's own manner is
    "bibliographic level only".
  - **Recommended, not required:** declare `open_access_floor` in the content-spec front matter so the
    prose floor ("every unit maps at least one verified open-access source") becomes checkable by
    `check:source-floor` at G2, the `G-2026-17` machinery.
  - **The week schedule is approved as to form only.** The 16-week term and the 3/3/3/2/3/2
    distribution are the spec's construction, permitted and labelled under `D-2026-0012`, not
    guide-given.
  - **`status` stays `draft`.** Authoring remains blocked under Spec 006 FR-002 until `G-2026-28` is
    settled and the repairs above land. Once the readings question is settled, items 1-4 and 6-8 need
    no re-evaluation unless a bound input changes.
  - Does not approve any unit's English review (G3) or Urdu translation (G5). Certifies no content,
    qualifies no reviewer, authorises no publication (Art. VII.8.4).

---

## D-2026-0042 - GQUR-300 third intake pass: all eight criteria approved, readings settled by the G-2026-28 owner ruling

- **Status:** pending-owner-review
- **Gate:** G0 intake / G1 unit-spec
- **Scope:** GQUR-300 only. Third intake pass, by an evaluator who did not draft the spec, judging the
  spec as it stands at commit `43910bf` ("intake(gqur-300): apply owner ruling G-2026-28 to the reading
  list"). Settles all eight criteria **including `readings`**, whose `grawe`/`ncm` dispositions the owner
  ruled on in the resolved `G-2026-28` entry (2026-09-23). Re-records the seven criteria `D-2026-0041`
  approved at the pre-ruling state, and approves `readings` for the first time. `D-2026-0040`/`0041`
  were treated as context only; every verdict below was re-derived from the bound inputs this run.
- **Decided by:** agent:evaluator, 2026-09-23
- **Decision:**
  1. **Identity.** GQUR-300, "Quantitative Reasoning-I", **3 (3-0)** credit hours, Semester 1, category
     General Education, bilingual by default, as `catalog/courses.json` records it in its Semester 1
     group. The guide gives the code at `1st 2026.txt:546`, the title "Quantitative Reasoning-1(Maths)"
     at `:549`, "Semester : 1st" at `:552`, and credit hours as a bare total "3" at `:554` with no split.
     The revised board Scheme (final authority) gives `GQUR-300 / Quantitative Reasoning-1 (Math) /
     3(3-0) / General Education` at `B.Ed 4 Year 2026 revised after board.txt:18-24` (verified this run).
     Title variants are typographic (`D-2026-0006` posture); the guide's total and the Scheme's split do
     not contradict each other (`G-2026-02`/`G-2026-05` posture). **No Article II.3 conflict.** The
     departmental variant `.specify/Course_guides_and_Scheme/300 Quantitative_Reasoning_I.docx` sits in
     the bound bundle; `D-2026-0003` (confirmed, corpus-wide) settles that folder as superseded
     provenance-only, and the spec carries zero `.specify` references (verified by grep this run).
  2. **Partition follows the guide.** The guide numbers six units at `1st 2026.txt:577`, `:584`, `:591`,
     `:598`, `:620`, `:629`; the spec carries exactly those six units under those titles (string-equal
     after trimming the PDF bullet glyph, verified mechanically this run). The guide carries **no week
     table**; the spec's `## Week schedule` is a derived distribution clearly labelled as derived with
     its basis stated (`content-spec.md:36-39`, `:105-108`, and "(derived)" on every unit's weeks line),
     the form `D-2026-0012` (confirmed, corpus-wide) permits. The 16-week term and the 3/3/3/2/3/2
     distribution are approved **as to form only**; the calendar substance remains the spec's
     construction (see Limits).
  3. **Coverage is complete and adds nothing.** The guide enumerates **24** sub-topic bullets, four per
     unit (`:579-582`, `:586-589`, `:593-596`, `:600`/`:601`/`:617`/`:618`,
     `:622`/`:623`/`:624`/`:627`, `:631`/`:632`/`:634`/`:636`). The spec's six checklists carry **30**
     rows (5+6+5+4+4+6). Verified mechanically, word-level, in both directions this run: every guide
     bullet appears exactly once, as itself or as its named components, and the six extra rows decompose
     five compound bullets using the guide's own words (`G1.4` to U1-04/U1-05; `G2.1` to U2-01/U2-02;
     `G2.2` to U2-03/U2-04; `G3.2` to U3-02/U3-03; `G6.1` to U6-01/U6-02/U6-03). The single insertion,
     "of numbers and operations" in U2-06, is the guide's own Unit 2 heading at `:584`; the row-level
     trace confirms it is the only heading-word insertion in the spec. `D-2026-0019` standard.
  4. **The outcome traces hold.** The guide's five course outcomes (`:567`, `:568`, `:570`, `:571`,
     `:573`) are reproduced verbatim at `content-spec.md:43-48` (verified mechanically; the only
     difference is the guide's PDF bullet glyph). Unit CLO refs: U1 → 1, 3; U2 → 1, 2, 3; U3 → 1, 2;
     U4 → 2, 4; U5 → 2, 5; U6 → 2, 4, 5. No SLO lacks a guide ancestor, no CLO is orphaned, and no ref
     falls outside 1-5 (all verified mechanically). The Unit 4 trace to CLO 4 carries a disclosed
     mechanism gloss ("communicating measurements and geometric results precisely"); it is a mapping
     judgement, not an addition, and CLO 4's guide-anchored delivery rests on Unit 6
     ("Interpreting quantitative information in education and society", `:636`).
  5. **Readings: approved, for the first time.** All four guide readings (`:653-656`) are present in
     `### Guide-required`, and each is now either resolvable or owner-ruled:
     - `steen2001` **resolves and its locator is true**: the Internet Archive record
       `archive.org/details/mathematicsdemoc0000unse` was fetched this run and is "Mathematics and
       democracy: the case for quantitative literacy", NCED, Princeton NJ, 2001, ISBN 0970954700,
       controlled-lending - exactly what the row states; cited at bibliographic level with
       `D-2026-0001` governing the unobtainable text.
     - `grawe` **conforms to the owner's `G-2026-28(a)` ruling** (recorded resolved in
       `specs/gaps.md`): recorded unresolvable in the `D-2026-0010` manner, the citation at title level
       with **no imprint** (the word "Cognella" now appears only inside the note's record of what was
       checked, not as bibliographic detail), the limit stated at point of use, and the same author's
       verified open-access article `grawe2012` as the cited replacement. The extension of the
       `D-2026-0010` manner to this course is owner-ruled, not silent.
     - `ncm` **conforms to the owner's `G-2026-28(b)` ruling**: the owner-directed NCC website check is
       recorded in the resolved gap entry, and the row cites the verified NCC Mathematics page
       (ncc.gov.pk) with the two named documents and no publication year (the page asserts none). This
       evaluator re-fetched the page this run and it verifies: the NCP Mathematics Progression Grid
       (1-12) and the Mathematics Suggested Guidelines (1-8) are served as open PDFs, with no
       publication year asserted.
     - `npst2009` resolves (in-corpus precedent: EFMP-302's `npst-pakistan-2009`; the itacec.org
       retrieval limit is already recorded under `D-2026-0001`).
     Every curated-supplementary work is real, verified this run against the ERIC API where it has an
     ERIC id (`grawe2012` EJ981327, `tout2020` EJ1266633 with the repaired page range 183-209,
     `sikko2023` EJ1450768, `gula2025` EJ1489427, `mcclure2020` EJ1480153 - titles, authors, years and
     journals all match the rows), and unchanged since `D-2026-0041`'s verification where it does not
     (`openstax-prealgebra`, `pbs`, `oecd-pisa`). The `open_access_floor: default: 1` front-matter
     declaration is the `D-2026-0041`-recommended repair: the prose floor is now machine-checkable by
     `check:source-floor` at G2, and every unit's `**Mapped readings**` maps at least one verified
     open-access source (U1: grawe2012, sikko2023; U2: gula2025, openstax-prealgebra; U3/U4:
     openstax-prealgebra; U5: grawe2012, tout2020, pbs; U6: mcclure2020, pbs - verified mechanically).
  6. **All six assessment blueprints are internally consistent and consistent with the style guide.**
     Every unit carries the fixed 10/10/5 bank with MCQ Remember to Apply, RRQ Understand to Analyze,
     ERQ Analyze to Evaluate, and the Analyze-or-higher ERQ rubric requirement
     (`specs/content/style-guide.md:223-231`). The spec's ERQ band "Analyze to Evaluate" sits within the
     style guide's "Analyze → Evaluate/Create" band (a subset, not a breach). Every unit has three
     topics, so the ">= 2 MCQ and >= 2 RRQ per topic" floors resolve to 6 of 10 with headroom: **no
     floor its own items would breach, in any unit**. The parenthetical relaxations in Units 3-6 are
     deliberate, disclosed relaxations of the spec's own floor; the style guide sets no per-topic
     minimum. The course-review plan's ~15-20 / ~10-15 / ~5-8 mix is permitted (`style-guide.md:234-235`
     fixes no count for `course-review.mdx`).
  7. **Structure conforms.** Front matter (`course_code: GQUR-300`, `status: draft`,
     `open_access_floor: {default: 1}`) validates against
     `contracts/content-spec-frontmatter.schema.json` (replayed directly with ajv 2020-12 this run; the
     floor key is permitted by the contract's `additionalProperties: true` and is the key
     `check-source-floor.mjs` reads). All required course-level sections are present in contract order,
     both reading-list subheadings carry the contract's column set, and every per-unit block is present
     in all six units. The spec-side invariants were replayed directly with the gate's own parsers
     (`unitSectionLines`, `parsePipeTable`, `tableAfterHeading`), because every gate that walks `docs/`
     is vacuous for GQUR-300's authored content (only the `coming_soon` placeholder tree exists): for
     all six units the `Sub-topic IDs` cells form a **total, disjoint partition** of the checklist;
     every checklist `Topic` cell equals its `### Topic list` row label; every `**Depth budget**`
     sub-topic and topic count matches its tables (the reading-min band is a unit-file total per
     `style-guide.md` "Depth budget", not the sum of the per-topic planning figures); every topic plans
     exactly two figure carriers, consistent between the `### Topic list` column and the
     `**Figure plan**` bullets; every unit plans at least one concept-map, flowchart or timeline
     (Art. III.10); every `**Mapped readings**` key resolves to a reading-list row. **Zero failures
     across all six units.** No em dashes in the spec.
  8. **No decision residue.** All confirmed entries were swept against the **whole** spec.
     `D-2026-0001` is invoked within its Limits (steen2001, grawe and npst2009 notes state their
     text-retrieval limits). `D-2026-0002`/`D-2026-0004`'s superseded EFMP-302 activity design appears
     nowhere; the only "one-page" hit is GQUR-300's own practicum wording (`content-spec.md:143`).
     `D-2026-0003` is correctly inapplicable (zero `.specify` references). `D-2026-0005` is not evaded.
     `D-2026-0012` is applied correctly (derived-and-labelled week schedule). `D-2026-0010`'s
     unresolvable-recording manner is extended to `grawe` **by the owner's `G-2026-28(a)` ruling**, not
     silently. `D-2026-0013`'s floor pattern is invoked as precedent with a declared, machine-checkable
     floor - the repair `D-2026-0041` recommended, and anticipated by that decision's Limits ("the
     obvious precedent for any other course whose guide list is print-only"). `D-2026-0014` introduces
     no superseded design. All repairs `D-2026-0041` directed have landed at `c72199e`/`43910bf`
     (tout2020 pages 183-209; grawe guide ref `:654`; ncm guide ref `:655`; the `open_access_floor`
     declaration; the Cognella imprint removal), confirmed by diffing `139876c..43910bf`: the change is
     exactly the ruling application plus those repairs, nothing else.
- **Basis:** `Scheme-and-Course-guides/extracted-text/1st 2026.txt`, the GQUR-300 block at `:546-680`:
  code `:546`, title `:549`, semester `:552`, credit hours `:554`, description `:558-563`, outcomes
  `:564-573`, unit headings `:577`/`:584`/`:591`/`:598`/`:620`/`:629`, readings `:651-656` (Steen
  `:653`, Grawe `:654`, National Curriculum for Mathematics `:655`, HEC NPST `:656`). The revised board
  Scheme at `B.Ed 4 Year 2026 revised after board.txt:18-24`. `catalog/courses.json` Semester 1 group.
  `specs/content/style-guide.md` v4.5 for the bank, Bloom bands, depth budget and visual density;
  `contracts/content-spec-frontmatter.schema.json` and the content-spec v2/v3 contracts for the section
  set. The resolved `G-2026-28` entry in `specs/gaps.md` (a bound register) for the owner's `grawe`/`ncm`
  ruling. External registries (not bound inputs, checked 2026-09-23, this run): the Internet Archive
  for `steen2001`; the NCC Mathematics page for `ncm`; the ERIC API for `grawe2012`, `tout2020`,
  `sikko2023`, `gula2025` and `mcclure2020`. Items 1-4 are determined by the guide directly; items 6-8
  rest on the bound style guide and contracts; item 5 rests on the guide for presence, on the owner
  ruling for the two ruled dispositions, and on the registries for resolvability of the rest.

  **Deterministic checks actually run at HEAD `43910bf`, with real exit codes:**
  `npm run check:no-em-dash` **1** (0 gqur mentions; findings are in GENG-300 material);
  `npm run validate:content` **1** (0 gqur mentions; GENG-300 unit-01 front matter);
  `npm run check:bloom-bands` **0**; `npm run check:concept-graph` **0**; `npm run check:depth-gate`
  **1** (0 gqur mentions); `npm run check:figures` **1** (0 gqur mentions); `npm run
  check:no-answer-keys` **1** (0 gqur mentions); `npm run check:docs-sync` **0**; `npm run
  check:source-floor` **1** (2 findings: GENG-300 Unit 1 and **GQUR-300 Unit 1, both "declares a floor
  of 1 but has no sources/unit-01.md"** - the GQUR-300 finding walks the `coming_soon` placeholder tree
  at `docs/semester-1/gqur-300/unit-01/`; sources are authored with units, not at intake, so this is the
  expected-at-intake condition recorded the same way for GENG-300 under `D-2026-0019`, and the floor
  binds at G2); `npm run check:pipeline-gate` **1** (0 gqur mentions). The green gates are vacuous for
  this course's authored content and are recorded as such, not cited as passes; the spec-side
  invariants above were replayed directly instead.
- **Bound to:** `specs/content/gqur-300/intake/manifest.json`, manifest digest
  `4d3fd0ae99da012d1a34b7a1fbad9a7440c173a5f2d071ba8825d9c9937195a1`, **54 inputs** at commit
  `43910bfc9177e14b0b3c4128e9e48288173d1682`. Recomputed independently with `manifestFor()` from
  `scripts/lib/review-evidence.mjs` over the same `intakeRoots('gqur-300')` root set the prepare script
  uses: every path and every digest matched, with no extra and no missing entry, and the recorded
  `manifest_digest` reproduced from a fresh read. The `registers` field also matched. **Any change to a
  bound input voids this approval** (Art. VII.8.5). The two registers are in `registers`, not
  `input_manifest`, per the `G-2026-15` fix, so recording this decision does not void it.
- **Limits:**
  - **No criterion is blocked and no gap is open for this course.** `G-2026-28` is resolved by the
    owner ruling; this decision consumes no `G-` code (the block `G-2026-29`/`G-2026-30` stays unused).
  - **`status: approved` is the owner's action, not this evaluator's** (Spec 006 FR-002: the
    content-spec front-matter contract has the owner set it). This entry is the G0/G1 approval on which
    that flip may rest: with it recorded at pending-owner-review, the owner may set
    `status: approved` and authoring may begin. No repairs remain.
  - **The week schedule is approved as to form only.** The 16-week term and the 3/3/3/2/3/2
    distribution are the spec's construction, permitted and labelled under `D-2026-0012`, not
    guide-given.
  - The `grawe` row remains a title-level citation to a work that cannot be shown to exist from this
    host; retrievable content for its units is carried by `grawe2012` and the other mapped open-access
    sources, and `D-2026-0001` still governs any prose that leans on the unopened title.
  - Does not approve any unit's English review (G3) or Urdu translation (G5). Certifies no content,
    qualifies no reviewer, authorises no publication (Art. VII.8.4).

---

## D-2026-0043 - EFMP-301 extension re-intake: identity, coverage, outcome traces, readings, blueprint, structure, no decision residue

- **Status:** pending-owner-review
- **Gate:** G0 intake / G1 unit-spec
- **Scope:** EFMP-301 only, and only the **extension**: the course-wide items, the reading list, the
  week schedule transcription, and the five new unit blocks (Units 2-6), at commit `a104623`
  ("content(efmp-301): extend content-spec to the full 6-unit course"). Evaluated in a fresh session
  that did not draft the spec. Unit 1's carried-forward G1 blocks are verified (see Decision item 7)
  and are **not re-opened**; the unit stays frozen under Art. VI.1. Does **not** settle the units 2+
  partition (`G-2026-52`) or the pipeline-gate consequence of the `status: draft` flip
  (`G-2026-53`).
- **Decided by:** agent:evaluator, 2026-09-24
- **Decision:**
  1. **Identity.** EFMP-301, "Educational Psychology", **3 (3-0)** credit hours, Semester 1, Major:
     Professional. The guide gives the code at `1st 2026.txt:1011`, the title at `:1017`,
     "Semester-I" at `:1016` and "Credit Hours 03" at `:1019-1021` (a bare total, no split).
     `catalog/courses.json` (`semesters[0].courses[4]`) records `3 (3-0)`, Major: Professional,
     Semester 1; the revised board Scheme records `EFMP-301 / Educational Psychology / 3 (3-0) /
     Major: Professional Course-II` at `B.Ed 4 Year 2026 revised after board.txt:66-71` (verified
     this run). `D-2026-0003` (confirmed, corpus-wide) already binds this course's credit split at
     `3 (3-0)`: the superseded PTGR folder's `(0-3)` does not govern, and the spec cites that folder
     only as superseded provenance (`content-spec.md:42-44`). A guide total of 3 and a Scheme split
     of `3 (3-0)` do not contradict each other (`G-2026-02`/`G-2026-05` posture). **No Article II.3
     conflict.**
  2. **Coverage is complete for Weeks 3-16 and adds no off-guide topic.** The guide's outline
     (`:1042-1171`) carries, for Weeks 3-16, **35 substantive bullets** (W3 `:1045-1047` two; W4
     `:1063-1064` two; W5 `:1082` one; W6 `:1086-1087` two; W7 `:1094` one; W8 `:1102-1103` two;
     W9 `:1108-1109` one; W10 `:1114-1117` four; W11 `:1122-1124` three; W12 `:1129-1131` three;
     W13 `:1141-1143` three; W14 `:1148-1150` three; W15 `:1156-1158` three; W16 `:1164-1168`
     five) plus three non-teaching slots: W7 "Application activities & review" (`:1095`), W9 "Class
     activities" (`:1109`) and W16 "Final revision / assessment" (`:1171`). The spec's five new
     checklists carry **60 rows** (U2: 10, U3: 12, U4: 13, U5: 14, U6: 11; counts verified
     mechanically, IDs contiguous). Every substantive bullet and both activity slots are claimed by
     exactly one unit (the two slots are folded into sub-topics U3-12 and U4-8, the same pattern
     Unit 1's approved U1-14 established); the W16 revision slot is routed to Unit 6's assessment
     and the eventual `course-review.mdx`, disclosed at `content-spec.md:824-828`. No row lacks a
     guide ancestor: every row's `Guide source` cell names its week and bullet. Rows that name
     discipline-standard constituents of a compound or bare bullet rather than the guide's literal
     words (U2-3 heredity/environment under "Principles of development"; U3-4 reinforcement and
     punishment; U3-9 the observational-learning research; U4-5 concept formation; U5-1
     intrinsic/extrinsic motivation; U5-8 abilities) each cite the bullet they read, the disclosed
     decomposition pattern Unit 1's approved checklist and `D-2026-0009` (EFMP-302) established.
     Noted, non-blocking: the Unit 2 preamble (`:277-280`) discloses the Week 4 decompositions but
     not the Week 3 one (U2-1 to U2-3 all read W3 "Principles of development").
  3. **The outcome traces hold.** The guide's six CLOs (`:1035-1040`) are transcribed verbatim at
     `content-spec.md:51-56` (recorded for the spec record, cited by reference per Art. III.5).
     The 14 new SLOs (two to three per unit, `:263-266`, `:377-380`, `:513-517`, `:655-659`,
     `:803-808`) each trace to named guide CLOs, and every CLO is delivered by at least one unit
     whose guide topics carry it: CLO 1 by Units 2, 3 and 4; CLO 2 by Unit 5 (W12); CLO 3 by Units
     2-6; CLO 4 by Units 4 (W10) and 5 (W11); CLO 5 by Unit 6 (W14); CLO 6 by Unit 6 (W16). No SLO
     lacks a guide ancestor and no CLO is orphaned, so the EFMP-302 `G-2026-10` failure mode is
     absent. Unit 1's restated refs (`:177-182`) match the published unit's `clo_refs` and
     `blooms_summary` front matter (corroborated against `docs/semester-1/efmp-301/unit-01/index.mdx`,
     not a bound input).
  4. **Readings are approved, including the no-`open_access_floor` posture.** The guide's reading
     list is two URLs (`:1198-1202`), both present in the spec's `### Guide-required` table
     (`:105-106`). Both were verified retrievable **independently on this run, 2026-09-24**:
     `https://home.cc.umanitoba.ca/~seifert/EdPsy2009.pdf` (HTTP 200, `application/pdf`, 2.9 MB)
     and `https://www.opentextbooks.org.hk/system/files/export/6/6118/pdf/Educational_Psychology_6118.pdf`
     (HTTP 200, `application/pdf`, 5.7 MB). Both are open access (CC BY 3.0; CC BY-SA 4.0), so each
     guide entry resolves to a real, usable work and neither is a print-only monograph. The
     spec's reasoning for declaring no floor holds: `D-2026-0013` (EFMP-304) and `D-2026-0021`
     (GNAS-301) were owner responses to guide lists that were print-only or did not resolve as
     printed, a condition that does not arise here, and `check:source-floor` is opt-in by design
     ("a course whose content-spec declares no `open_access_floor` is not checked, so courses whose
     guide reading lists are adequate are unaffected" - `scripts/check-source-floor.mjs` header;
     EFMP-302 likewise declares none). Per-unit bindings remain a per-unit concern recorded in
     `sources/unit-NN.md` with verification dates and judged by the G3 `sources` criterion;
     `D-2026-0001` governs any URL that later stops resolving, which the spec itself invokes
     (`:111-112`). The page counts (376 pp, 455 pp) rest on the author's verification; only
     retrievability was re-verified here.
  5. **All five new assessment blueprints are internally consistent and consistent with the style
     guide.** Every unit carries the fixed 10 MCQ / 10 RRQ / 5 ERQ bank with the style guide's
     bands (MCQ Remember-Apply, RRQ Understand-Analyze, ERQ Analyze-Evaluate/Create) and at least
     one Analyze-or-higher ERQ rubric. Every spread sums exactly to its fixed count (verified
     mechanically: 3/3/2/2, 2/3/2/3, 1/1/1/2; 3/2/3/2; 2/2/2/2/2 x2; 2/3/3/2), and each unit's
     `### Topic list` `Sub-topic IDs` cells form a total, disjoint partition of its checklist
     (verified mechanically for all five units). The guide carries no assessment-criteria table
     (verified: the block runs week table `:1042-1171` -> strategies `:1173-1180` -> practical
     work `:1182-1191` -> books `:1193-1202`), so the Constitution Art. III.7 60/40 default
     applies and is stated, not invented (`:64-67`).
  6. **Structure conforms on the bound requirements.** Front matter (`course_code: EFMP-301`,
     `status: draft`, `bilingual: true`) validates against
     `contracts/content-spec-frontmatter.schema.json` (`bilingual` is an additional property,
     permitted). Units 2-6 each carry the full per-unit contract block set (CLO/SLO refs, Key
     terms, Mapped readings, `### Sub-topic checklist` with the `Topic` column, `### Topic list`,
     Depth budget, Prerequisite knowledge, Common misconceptions, Worked-examples plan,
     International best-practice notes, Figure plan, Unit-end assessment blueprint). Every figure
     plan meets Art. III.10: >= 2 carriers per topic, >= 1 concept-map/flowchart/timeline per unit,
     the six-value `Kind` vocabulary, unique well-formed `fig-U<n>-<seq>` IDs, and topic
     assignments that match the `### Topic list` rows (verified for all five units). Depth-budget
     sub-topic counts match their own tables (10/12/13/14/11). Zero em dash characters. Gate exit
     codes recorded this run: `validate:content` **0**, `check:pipeline-gate` **1** (single
     finding, escalated as `G-2026-53`), `check:depth-gate` **0**, `check:figures` **0**,
     `check:no-em-dash` **0**, `check:no-answer-keys` **0**, `check:concept-graph` **0**,
     `check:bloom-bands` **0**, `check:source-floor` **0**, `check:content-status` **0**,
     `check:docs-sync` **0**. The depth/figures/concept-graph/bloom gates walk `docs/`, where only
     Unit 1 exists; the Units 2-6 invariants above were replayed directly against the spec, the
     GNAS-301 `D-2026-0020` method.
  7. **No decision residue, and the Unit 1 carry-forward verifies.** The whole specification was
     swept for superseded designs, not only the sections confirmed decisions name: no one-page or
     one-term development plan (`D-2026-0002`/`D-2026-0004`), no five-file
     `formative.mdx`/`summative.mdx` design in live use (the single mention, `:252-256`, is Unit
     1's carried-forward note that records the supersession itself, the `D-2026-0004` pattern), no
     review-cycle assumptions (`D-2026-0005`), no reliance on the
     `.specify/Course_guides_and_Scheme/` tree beyond the labelled provenance note
     (`D-2026-0003`), and `D-2026-0012` applied correctly: the calendar is recorded as guide-given
     and the partition as derived, clearly labelled with its basis stated (`:128-137`). Unit 1's
     G1 blocks were diffed against the approved Unit-1-only spec at commit `6158d25`
     (`status: approved` there): byte-identical from the checklist introduction through the
     Supersedes note, with only the `### Sub-topic checklist` heading restored, exactly as the
     spec discloses (`:16-19`); the two summary bullets at `:177-182` are new document-level
     restatements of the published unit's front matter, accurate as verified in item 3.
  8. **Reported for repair, needing no owner decision** (author applies before authoring Units
     2-6; none blocks this approval):
     (a) the guide locators in `## Course-wide items` are wrong: teaching strategies
     `:1189-1195` (`:57`) should read `:1173-1180` and practical work `:1197-1203` (`:59`)
     should read `:1182-1191` - both currently point into the Practical Work tail and the
     reading list; also imprecise are the Course Description `:1017-1027` (`:74` -> `:1023-1029`),
     the CLO range `:1029-1041` (`:48` -> `:1031-1040`), the reading list `:1200-1204` (`:97` ->
     `:1198-1202`) and the week-table range `:1043-1187` (`:128` -> `:1042-1171`). The
     transcribed content itself is correct in every case; this decision rests on the verified
     lines, in the manner of `D-2026-0040`'s note on GQUR-300's citations.
     (b) two depth-budget target arithmetic slips: Unit 4's components (4 + 16+19+19+19+17 + 24
     + 8) sum to **126** against a stated target of 125 (`:565-566`); Unit 6's (4 + 19+18+17+18
     + 24 + 8) sum to **108** against a stated 114 (`:856-857`). Both sit inside their bands and
     the gate reads the band, not the target, but the stated targets contradict their own
     components.
     (c) minor: the `seifert2009` annotation says "twelve chapters" and lists eleven titles
     (`:105`); correct the count or add the missing title.
     (d) minor: the v3 content-spec contract's course-level `## Course review plan` seeding
     section (`specs/008-rich-unit-pedagogy/contracts/content-spec-v3.md`) is absent; the spec
     discloses the deferral (`:954-955`), no gate parses the section, and the bound style guide
     does not require it, so this is a recommendation, not a defect against a bound contract.
- **Basis:** `Scheme-and-Course-guides/extracted-text/1st 2026.txt`, the EFMP-301 block at
  `:1011-1204`: code `:1011`, title `:1017`, semester `:1016`, credit hours `:1019-1021`, Course
  Description `:1023-1029`, CLOs `:1031-1040`, week outline `:1042-1171`, teaching strategies
  `:1173-1180`, practical work `:1182-1191`, recommended books `:1193-1202` (URLs `:1198-1202`).
  `catalog/courses.json` `semesters[0].courses[4]`. `Scheme-and-Course-guides/extracted-text/B.Ed 4
  Year 2026 revised after board.txt:66-71`. `specs/content/style-guide.md` (v4.0) for the blueprint
  and structure clauses; `contracts/content-spec-frontmatter.schema.json`. The confirmed decisions
  named above (`D-2026-0001`, `D-2026-0002`/`0004`, `D-2026-0003`, `D-2026-0009`, `D-2026-0012`).
  Items 1-3 are determined by the guide directly; items 4-6 rest on the guide for content and on
  the bound style guide and contracts for form; item 7 rests on the confirmed decisions it names
  and on the diff against commit `6158d25`. URL retrievability verified from this host on
  2026-09-24.
- **Bound to:** `specs/content/efmp-301/intake/manifest.json`, manifest digest
  `77954a4bd01625390db498c660432808adb6fcaca4429a68580dc9dee5797e8f`, **58 inputs** at commit
  `a104623a63c14dae6d142d8c5c4530be763d92ac`. Recomputed independently with `manifestFor()` from
  `scripts/lib/review-evidence.mjs` over the same `intakeRoots('efmp-301')` root set
  `prepare-intake-evidence.mjs` uses: every path and every digest matched, with no extra and no
  missing entry, and the recorded `manifest_digest` reproduced from a fresh read from disk. The
  `registers` field also matched. **Any change to a bound input voids this approval**
  (Art. VII.8.5). The two registers are recorded in `registers`, not `input_manifest`, per the
  `G-2026-15` fix, so recording this decision does not void it.
- **Limits and what remains open:**
  - **The units 2+ partition is not approved.** The guide numbers its outline by week and chapter
    and gives no unit headings, so the five-block merge (W3-4 -> Unit 2, W5-7 -> Unit 3, W8-10 ->
    Unit 4, W11-13 -> Unit 5, W14-16 -> Unit 6) is a judgement the guide does not determine; it is
    recorded and escalated as `G-2026-52`. The week calendar itself **is** guide-given and is
    approved as such, as are the merge's mechanically verified properties (contiguous whole weeks
    in guide order, every week in exactly one unit, no chapter split across units, contact hours
    6+6+9+9+9+9 = 48 = 16 weeks x 3 credit hours).
  - **The pipeline-gate consequence of the `status: draft` flip is not settled** (`G-2026-53`):
    the published Unit 1 now fails `check:pipeline-gate` until the owner acts.
  - **`status: approved` is the owner's action, not this evaluator's.** With this entry recorded
    at pending-owner-review and `G-2026-52` resolved, the owner may set `status: approved` and
    authoring of Units 2-6 may begin; the repair items in Decision item 8 should be applied
    first.
  - Unit 1 remains frozen (Art. VI.1); nothing here re-opens its content, Urdu mirror or
    governance artefacts. Concept graphs for Units 2-6
    (`specs/content/efmp-301/concepts/unit-NN.md`) are authored per unit and enforced by
    `check:concept-graph`; this approval does not settle them.
  - Does not approve any unit's English review (G3) or Urdu translation (G5). Certifies no
    content, qualifies no reviewer, authorises no publication (Art. VII.8.4).

## D-2026-0044 - EFMP-301 rework: the owner-ruled chapter-wise 12-unit partition, reworked Units 4-12, no new escalation

- **Status:** pending-owner-review
- **Gate:** G0 intake / G1 unit-spec
- **Scope:** EFMP-301 only, and only the **rework to the owner's chapter-wise ruling**: the 12-unit
  partition, the reworked Units 4-12, and the course-level sections the rework touched (header
  guide note, Course Description consequences, reading-list unit tags, week schedule, course
  review plan), at commit `25a94d5` ("content(efmp-301): rework extension to the owner's
  chapter-wise 12-unit partition (G-2026-52 ruling)"). Evaluated in a fresh session that did not
  draft the spec. Settles the `G-2026-52` partition question against the owner's 2026-09-24 ruling
  and confirms the `G-2026-53` status-flip path. Units 1-3 blocks and the reading list are verified
  byte-identical to commit `a104623` (what `D-2026-0043` approved; confirmed by direct diff this
  run, the rework's first unit-level change begins at the Unit 4 heading) and are not re-opened;
  Unit 1 stays frozen under Art. VI.1.
- **Decided by:** agent:evaluator, 2026-09-24
- **Decision:**
  1. **The partition is approved against the owner's ruling, not as a fresh derivation.** The guide
     numbers its outline by week and chapter with no unit headings (`1st 2026.txt:1042-1171`), so
     the partition was escalated as `G-2026-52`; the owner ruled on 2026-09-24 ("chapterwise is
     good, consider chapters as units. follow the course guide", recorded resolved in
     `specs/gaps.md`) and the ruling enumerates all twelve units with their chapters and weeks. The
     spec implements exactly that ruling, verified mechanically: 12 units; Unit 1 = Ch 1 W1-2 (the
     frozen golden unit), Unit 2 = Ch 2 W3-4, Unit 3 = Ch 3 W5-7, Unit 4 = Ch 4 W8-9, Unit 5 =
     Ch 5 W10, Unit 6 = Ch 6 W11, Unit 7 = Ch 7 W12, Unit 8 = Ch 8 W13, Unit 9 = Ch 9 W14,
     Unit 10 = Ch 10 W15, Unit 11 = Ch 11 W16, Unit 12 = Ch 12 W16; every unit's teaching weeks
     are the guide's own placement of its chapter; no week reordered, no chapter split; the shared
     Week 16 recorded honestly in both Unit 11's and Unit 12's headers; contact hours
     6+6+9+6+3+3+3+3+3+3+3 = 48 = 16 weeks x 3 credit hours, with Week 16's 3 hours shared by
     Units 11 and 12. The `partition` criterion of `D-2026-0043` is thereby approved; units 2-12
     authoring is unblocked.
  2. **The Week 16 bullet assignment is a faithful within-guide resolution and is approved.** The
     guide's W16 block (`:1162-1171`) combines Chapters 11 and 12 under one heading and lists five
     substantive bullets (`:1164-1168`) plus the final-revision slot (`:1171`) without chapter
     attribution. The ruling's own text names the two chapter titles (Unit 11 "Mental Health and
     Well-being in Schools"; Unit 12 "Guidance and Counseling"), which anchors the two
     title-matched bullets (`:1164` to Unit 11, `:1165` to Unit 12). The three unmatched bullets -
     application of educational psychology (`:1166`), technology and learning (`:1167`),
     professional ethics (`:1168`) - are assigned to Unit 12 as the course's closing material, and
     the final-revision slot seeds the course review. No second document is in conflict; every W16
     substantive bullet stays inside W16's two units and is claimed exactly once (verified
     mechanically); and the assignment is disclosed in the header guide note, the week schedule,
     Unit 12's own section and the evaluator note as "a disclosure, not a claim about the guide".
     This is the within-guide-slip posture the partition criterion permits resolving under a `D-`
     code, and it is stated here explicitly: the guide does not attribute these three bullets, the
     ruling's chapter rule plus the guide's "(Combined + Course Review)" heading and bullet order
     are what make the closing-material reading faithful. The owner may redirect any of the three
     at confirmation as a one-row reassignment inside Units 11-12 without re-opening the partition.
  3. **Coverage of the reworked units is complete and adds no off-guide topic.** The guide carries
     35 substantive bullets for Weeks 3-16 (W3 `:1057-1058`; W4 `:1063,1077`; W5 `:1082`; W6
     `:1089-1090`; W7 `:1097`; W8 `:1103-1104`; W9 `:1109`; W10 `:1115-1118`; W11 `:1123-1125`;
     W12 `:1134-1136`; W13 `:1142-1144`; W14 `:1149-1151`; W15 `:1157,1158,1160`; W16
     `:1164-1168`) plus three non-teaching slots (W7 `:1098`, W9 `:1110`, W16 `:1171`); all 35
     were re-verified present in the guide text this run. The reworked checklists carry 49 rows
     (U4: 8, U5: 5, U6: 6, U7: 5, U8: 5, U9: 6, U10: 4, U11: 4, U12: 6; IDs contiguous), beside
     the unchanged 22 rows of Units 2-3, 71 in total. Every W8-W16 substantive bullet is claimed by
     exactly one unit, in the ruling unit for its week; the W9 "Class activities" slot is folded
     into U4-8, the same pattern Unit 1's approved U1-14 established and `D-2026-0043` approved
     for U3-12; the W16 revision slot is routed to the course review, disclosed. No row cites a
     guide bullet or slot that does not exist. Decompositions are disclosed in each checklist
     introduction and stay inside the guide's own words (W8 "Attention and perception" into its two
     processes; the W11 theory bullet's three named theories into U6-2/3/4; the W16 single broad
     bullet into four constituents per the Unit-1 broad-bullet pattern `D-2026-0043` accepted).
     Noted, non-blocking: `D-2026-0043` item 2's per-week bullet locators were loose (for example
     "W3 `:1045-1047`" points at Week 1's bullets); this item's locators are exact and supersede
     them for tracing.
  4. **The outcome traces hold.** The six CLOs (`:1031-1040`) are transcribed verbatim at
     `content-spec.md:53-61`. The reworked units carry 19 new SLOs (U4: 3, U5: 2, U6: 2, U7: 2,
     U8: 2, U9: 2, U10: 2, U11: 1, U12: 3), beside Units 2-3's 5 unchanged, 24 in total; each
     traces to named guide CLOs and every CLO is delivered: CLO 1 by Units 2-4; CLO 2 by Unit 7
     (W12); CLO 3 by Units 2-4, 8, 10 and 12; CLO 4 by Units 5-6 (W10-11); CLO 5 by Unit 9 (W14);
     CLO 6 by Units 7, 11 and 12 (W12, W16). No SLO lacks a guide ancestor and no CLO is orphaned.
  5. **Blueprints and structure conform.** All nine reworked units carry the fixed 10/10/5 bank
     with the style-guide (v4.5) Bloom bands and at least one Analyze-or-higher ERQ rubric; every
     spread sums exactly (MCQ and RRQ 4/3/3 for U4/U8/U9/U12 and 5/5 for U5/U6/U7/U10/U11; ERQ
     per-topic plus integrative summing to 5 in every unit), verified mechanically. Every Topic
     list is a total, disjoint partition of its checklist (verified mechanically for Units 2-12).
     Depth budgets: sub-topic counts match their tables; every unit's components sum exactly to
     its stated target (U4 90, U5 73, U6 74, U7 73, U8 86, U9 86, U10 72, U11 71, U12 86);
     targets sit inside their bands and bands stay within roughly +/-25% of target. Figure plans:
     >= 2 carriers per topic, >= 1 concept-map/flowchart/timeline per unit, the six-value
     archetype vocabulary, unique well-formed `fig-U<n>-<seq>` IDs, and topic-list cells
     consistent with the plan bullets (verified mechanically for Units 2-12). Front matter
     (`course_code: EFMP-301`, `status: draft`, `bilingual: true`) validates against
     `contracts/content-spec-frontmatter.schema.json`. Zero em dashes. Gate exit codes recorded
     this run: `validate:content` 0, `check:pipeline-gate` **1** (single finding, the known
     `G-2026-53` consequence: "EFMP-301 Unit 1 ... content-spec.md is not approved (status:
     'draft')"; resolved by the owner's ruling, see item 9), `check:depth-gate` 0, `check:figures`
     0, `check:no-em-dash` 0, `check:no-answer-keys` 0, `check:concept-graph` 0,
     `check:bloom-bands` 0, `check:source-floor` 0, `check:content-status` 0, `check:docs-sync` 0.
     The depth/figures/concept-graph/bloom gates walk `docs/`, where only Unit 1 exists; the
     Units 2-12 invariants above were replayed directly against the spec, the `D-2026-0020` method.
  6. **The regression base is intact.** Unit 1's G1 blocks (91 lines) and the Units 2-3 blocks
     (250 lines) are byte-identical between `a104623` and the rework (direct diff this run); the
     four `D-2026-0043` item-8 repairs remain applied (guide locators `:1173-1180`, `:1182-1191`,
     `:1023-1029`, `:1031-1040`, `:1198-1202`, `:1042-1171`; the corrected twelve-title
     seifert2009 chapter list; the `## Course review plan` section). Identity is unchanged
     (precedence note intact; catalog `3 (3-0)`, Major: Professional, Semester 1; guide `:1011`,
     `:1016-1021`; `D-2026-0003` posture; no Article II.3 conflict). Readings: both guide URLs
     (`:1198-1202`) re-verified retrievable independently this run, 2026-09-24 (HTTP 200 both);
     the reading list is unchanged apart from unit tags widened to 1-12 / 2-12.
  7. **Decision residue: one ruling-determined residue found, reported for repair.** The whole
     specification was swept for superseded designs, not only the reworked sections: no one-page
     or one-term development plan (`D-2026-0002`/`D-2026-0004`); the single five-file
     `formative.mdx`/`summative.mdx` mention is Unit 1's carried-forward supersession note; no
     review-cycle assumptions (`D-2026-0005`); the PTGR folder appears only in the labelled
     provenance note (`D-2026-0003`); `D-2026-0012` correctly applied with the partition now
     recorded as owner-determined per the ruling. One residue: the course review plan's summary
     points 5 and 6 (`content-spec.md:189-193`) still cite the superseded five-block merge's unit
     numbers ("(Unit 5)" for the motivation / individual-differences / management arc and
     "(Unit 6)" for the assessment / teaching / well-being arc; under the ruling those are Units
     6-8 and 9-12). The through-line content is correct, the section is parsed by no gate, and the
     correction is fully determined by the ruling and the guide (no scope judgement), so it is
     reported for repair in the `D-2026-0043` item-8 manner rather than escalated.
  8. **Repair items** (author applies with the status flip or before authoring Units 2-12; none
     blocks this approval):
     (a) `## Course review plan`, summary points 5-6 (`content-spec.md:189-193`): replace the
     stale "(Unit 5)" and "(Unit 6)" references with the ruled partition's units (motivation,
     individual differences and classroom management are Units 6-8; assessment, teaching methods,
     well-being, guidance and ethics are Units 9-12).
     (b) `## Unit 5` sub-topic checklist introduction (`content-spec.md:677`): "guide Chapter 10's
     four Week 10 bullets" should read "guide Chapter 5's" - the chapter number is conflated with
     the week number; the unit header and every row's Guide source cell are already correct.
     (c) The "(Topic X.Y; a unit schematic)" label is applied to four `diagram`-kind figures
     (fig-U5-1, fig-U6-1, fig-U9-4, fig-U11-1). Style-guide v4.5 reserves the per-unit schematic
     rule for concept-map / flowchart / timeline, and each affected unit carries a genuine
     schematic elsewhere (fig-U5-3, fig-U6-3, fig-U9-1 and fig-U9-5, fig-U11-3), so Art. III.10
     is met; drop the label from `diagram` rows or reword it so the figure author is not misled
     about which row satisfies the rule.
  9. **Status flip authorized by the ruling.** Under the `G-2026-53` resolution (owner decision,
     2026-09-24, option a) the author may set the content-spec `status: approved` once this entry
     is recorded, recording `D-2026-0043`, `D-2026-0044` and the ruling in the front-matter note;
     that restores `check:pipeline-gate` for Unit 1 with no gate-code change. This entry remains
     pending-owner-review; the owner's confirmation of this decision and the flip are separate
     owner actions, and a veto at review would re-open items 1-2 only.
- **Basis:** `Scheme-and-Course-guides/extracted-text/1st 2026.txt`, the EFMP-301 block at
  `:1011-1204`: code `:1011`, title `:1017`, semester `:1016`, credit hours `:1019-1021`, Course
  Description `:1023-1029`, CLOs `:1031-1040`, week outline `:1042-1171` (per-week bullet
  locators as cited in item 3), teaching strategies `:1173-1180`, practical work `:1182-1191`,
  recommended books `:1193-1202` (URLs `:1198-1202`). The owner rulings recorded resolved in
  `specs/gaps.md`: `G-2026-52` (chapter-wise partition, 2026-09-24) and `G-2026-53` (status-flip
  path, 2026-09-24). Item 1 rests on the ruling plus the guide's chapter structure; item 2 on the
  ruling's own chapter titles plus the guide's W16 block; items 3-4 on the guide directly; items
  5-6 on the bound `specs/content/style-guide.md` (v4.5), `contracts/` and the diff against
  `a104623`; item 7 on the confirmed decisions it names. `catalog/courses.json`
  `semesters[0].courses[4]`. `D-2026-0043` (the prior round, whose approvals for Units 2-3, the
  reading list and the course-wide items this round carries forward), `D-2026-0003`,
  `D-2026-0012`, `D-2026-0002`/`D-2026-0004`, `D-2026-0005`. URL retrievability re-verified from
  this host on 2026-09-24.
- **Bound to:** `specs/content/efmp-301/intake-2/manifest.json`, manifest digest
  `728480dca1085600f480cb9bd8500cf62240b8c24d2a5a03ff2665dfea460150`, **58 inputs** at commit
  `25a94d5cf5184ade0cd61ddf090f18b57c6f545d`. Recomputed independently with `manifestFor()` from
  `scripts/lib/review-evidence.mjs` over the same `intakeRoots('efmp-301')` root set
  `prepare-intake-evidence.mjs` uses: every path and every digest matched, with no extra and no
  missing entry, and the recorded `manifest_digest` reproduced from a fresh read from disk. The
  `registers` field also matched. **Any change to a bound input voids this approval**
  (Art. VII.8.5). The two registers are recorded in `registers`, not `input_manifest`, per the
  `G-2026-15` fix, so recording this decision does not void it.
- **Limits and what remains open:**
  - What this does **not** settle: per-unit source bindings (`sources/unit-NN.md`, judged at G3);
    figure prompts, alt text and SVG geometry (authored with the units); the Urdu terminology of
    the course (banked vs authored labels, G4/G5); concept graphs for Units 2-12
    (`specs/content/efmp-301/concepts/unit-NN.md`, authored per unit, enforced by
    `check:concept-graph`); the `course-review.mdx` file itself (future work outside this
    feature).
  - Unit 1 remains frozen (Art. VI.1); nothing here re-opens its content, Urdu mirror or
    governance artefacts.
  - The Week 16 bullet placement (item 2) may be redirected by the owner at confirmation - a
    one-row reassignment inside Units 11-12 that would not re-open the partition or the other
    items of this decision.
  - The repair items in item 8 are the author's to apply; they do not block the status flip but
    should land with it or before authoring Units 2-12 begins.
  - Does not approve any unit's English review (G3) or Urdu translation (G5). Certifies no
    content, qualifies no reviewer, authorises no publication (Art. VII.8.4).

---

## D-2026-0045 — CEO publication authority under the permanent machine-authored disclaimer

- **Status:** pending-owner-review
- **Gate:** G7 (publish), ADR-0026 §1 supersession
- **Scope:** all courses and units that satisfy the §2a QC clearance checklist on [TEX-4
  roadmap](/TEX/issues/TEX-4#document-roadmap), revision 6. Supersedes ADR-0026 §1 for the
  build-out; does not narrow `D-2026-0014` (the owner's standing authorisation for the 15
  catalogued courses), it adds a second publication path alongside it.
- **Decided by:** board instruction, 2026-10-04 (TEX-26), recorded by CEO 2026-10-06
- **Decision:**
  1. **The reader-facing notice is permanent and intentional**, not a defect. Every
     machine-authored page carries it by design; it has no exit date, and no work item is
     justified by "removing the banner". A unit whose deterministic gates pass is published
     under that notice, and a passing agent review (`provisional`) refines the notice, but
     neither review tier is a publication precondition. A `gated` unit does **not** get
     reviewed or withdrawn at the build-out boundary — it stays published under the
     disclaimer. This replaces ADR-0026's exit condition ("reviewed or withdrawn; it does
     not become permanent by default").
  2. **Publication authority for QC-cleared content is delegated to the CEO.** The CEO
     records the clearance on the issue once the §2a checklist (A–F) is satisfied, and the
     tracker row moves to the tier the evidence supports. This is an additional delegation
     on top of `D-2026-0014`, which remains the owner's standing authorisation. The CEO
     does not certify content, qualify any reviewer, or waive any Art. VI.1 obligation.
- **Basis:** Board instruction (TEX-26): "The banner / 'no reviewer has read it yet' is NOT
  a status bug to fix. It is our intentional disclaimer to the reader that the content is
  machine-authored and they can give feedback for errors and omissions. The CEO publishes a
  course/unit/topic once QC checks are clear." The notice is described as "the whole
  mitigation" in ADR-0026 §3; the board has confirmed it is also permanent. `D-2026-0014`
  authorises the 15 catalogued courses; this decision authorises the CEO to publish any
  QC-cleared unit without a per-unit owner sign-off.
- **Applied in:** TEX-4 roadmap revision 6 (§5.1), TEX-27 (EFMP-302 U3/U4/U5 at
  `provisional`), and every future QC-cleared publication.
- **Limits:** Publishes only units that satisfy the §2a QC clearance checklist. Does not
  certify, qualify, or waive Art. VI.1. Narrowed automatically when `D-2026-0014` lapses
  (when the 15 catalogued courses are authored).
- **Amends:** ADR-0026 §1 (publication authority delegation) and ADR-0026's exit condition
  (gated units stay gated permanently under the disclaimer).

---

## D-2026-0046 - EFMP-302 Units 3, 4 and 5 are NOT published at provisional; QC criterion C fails for all three

- **Status:** confirmed
- **Gate:** G7 (publish), on the G3 (English review) evidence
- **Scope:** EFMP-302 Units 3, 4 and 5 only. Units 2 and 6 were out of scope and are untouched.
- **Decided by:** CurriculumOwner (Paperclip agent), 2026-10-04, on TEX-27
- **Authority exercised:** TEX-26 delegated publication of these three units to the CEO
  *conditional on the QC checklist passing*, on top of the standing authorisation in
  `D-2026-0014`. The condition failed. This records that, and nothing is published.

### Decision

1. **No tier change.** Units 3, 4 and 5 stay in the **gate-checked** tier under
   "Draft - expert review pending". `static/content-status.json` is correct as generated; no
   tracker row was edited.
2. **Unit 5 is granted one additional G3 cycle**, under the exception `D-2026-0005` reserves and
   on the exact reasoning of `D-2026-0017`: the content is not defective, and nothing about the
   unit changed.
3. **Units 3 and 4 need a fresh G3 cycle over their current bytes**, because their published
   English prose changed after the passing review. This is a new submission, not a continuation
   of the feature-023 cycles.

### Basis - what was measured

`acceptProvisionalReport()` was run against the three feature-023 G3 reports at commit
`71dfa698`. All three fail with `stale or incomplete input manifest`, so under **ADR-0026 §2**
("a G3 row that is present but whose evidence does not validate remains a gate failure") writing
the `🟡` row would have turned `check:pipeline-gate` red and published a claim of review that the
repository itself refuses.

The manifest diffs separate the three units into two different situations:

| Unit | Report | Bound paths added | changed | Content bytes changed? |
|---|---|---|---|---|
| Unit 3 | `agent-g3-efmp302-u3-feat023-r2.json` | 8 | 11 | **yes** - `index.mdx` and all five topic files |
| Unit 4 | `agent-g3-efmp302-u4-feat023-r1.json` | 6 | 9 | **yes** - `index.mdx` and topics 01-03 |
| Unit 5 | `agent-g3-efmp302-u5-feat023-r1.json` | 1 | 4 | **no** - zero content paths |

- **Units 3 and 4.** Commit `08ac3ff1` ("Gemini illustrations for EFMP-302 Units 2-4") inserted
  six new raster illustrations into Unit 3's reviewed prose (`fig-U3-11` to `fig-U3-16`) and four
  into Unit 4's (`fig-U4-9` to `fig-U4-12`), with the matching manifest rows. Those images are
  live to readers now and **no G3 reviewer has ever seen them**. A `provisional` notice on a unit
  whose figures postdate the review it names would be false in exactly the direction ADR-0026's
  negative list warns about ("a figure teaching the wrong answer to its own MCQ" passed the
  gates on this same course).
- **Unit 5.** The only invalidating commit is `cac3204c` (Feature 024, the licence track):
  `catalog/courses.json`, `scripts/lib/gates.mjs`, `scripts/lib/content-roots.mjs`,
  `scripts/check-no-answer-keys.mjs` and the new `contracts/licence-page.schema.json`. Zero
  removed paths, zero content paths. The bound **content** is byte-identical to what the
  reviewer read. This is `D-2026-0017`'s situation recurring with a different trigger, and it is
  escalated structurally as `G-2026-71`.

### The rest of the QC checklist, recorded

- **A. Gates.** `npm run check:content` - 13 of 13 pass at `71dfa698` (`check:content-status`
  needs `node scripts/report-content-status.mjs` first, exactly as `.github/workflows/ci.yml`
  line 88 runs it, because `static/content-status.json` is git-ignored).
- **B. Escalations.** No open `G-20NN-NN` entry is against the **G3** stage of Units 3, 4 or 5.
  `G-2026-65` (course-wide G3 dependency), `G-2026-66` (Unit 4) and `G-2026-67` (Unit 5) are all
  **G5 Urdu-review** escalations and do not reach the publication tier, which
  `publicationState()` derives from G3 then G2. Unit 4's four `G-2026-66` residuals are all
  Urdu-side (`مجموعی` for "integrative" at three loci; `fig-U4-8`'s Urdu captions weakening
  Isoré's "rarely"; `خلاصی` for "Abstract"; the non-word `ثبٹ`); each is repaired and
  gate-green but reviewer-unverified. **None of the four blocks an English publication tier**;
  all four block a certified G5, which is not claimed and not sought here.
- **C. Evidence validates.** **FAIL, all three.** This is the blocking finding.
- **D. Factual-claim spot check.** **PASS.** Independently re-verified, not taken from the
  reports: NPST Pakistan's ten standard names, its three-part division (knowledge and
  understanding / dispositions / performance and skills) and its 2009 Ministry of Education
  origin with UNESCO technical and USAID financial support, against ERIC-hosted peer-reviewed
  secondary sources - which closes the largest of Unit 4's 18 carried advisories, the one the G3
  could only mark "corroborated from secondary sources only". Crossref records match the cited
  bibliography exactly for `taylor2023`, `keelson2024`, `furlich2016`, `skaalvik2020` (including
  the 2020-issue / 2021-online split the sources file already recorded), `naparan2021` and
  `demirkasimoglu2010`; ERIC `ED521228` confirms `goe2008`'s authors, year and the
  "National Comprehensive Center for Teacher Quality" institution name. Unit 5's only in-prose
  statistic, Skaalvik and Skaalvik's 262 Norwegian high-school teachers, matches its bound
  excerpt. Unit 3's single percentage, the 93% non-verbal claim, is taught **as a misconception**
  and is correctly handled. No fabrication of the `D-2026-0014` class was found.
- **E. Illustrations.** **PASS on content, with the criterion-C caveat.** All ten new rasters in
  Units 3 and 4 were opened and inspected: no map, no flag, no national emblem, no insignia;
  dress, classroom furniture, ceiling fans, blackboards and school-gate architecture are all
  plausibly Sindh. One fidelity drift, advisory: `fig-U4-12`'s prompt places the teacher "at the
  back of his own classroom" making tally marks on a clipboard, and the image puts him at the
  front beside the board. This inspection is the curriculum owner's own and is **not**
  independent review; it does not substitute for the G3 cycle item 3 commissions.
- **F. Urdu parity of the disclaimer and the feedback route.** **PASS, with one gap that is
  locale-symmetric.** `ReviewStatusBanner` is rendered by the theme from tracker-derived state
  (`src/theme/DocItem/Content.tsx:434`), so both locales carry the same tier with the same
  message, and `FeedbackWidget` is fully localised. The gap: `Content.tsx:437` gates the widget
  on `isTopicOrAssessment`, so a unit's `index.mdx` and `unit-teacher-notes.mdx` carry the
  disclaimer with **no** feedback route, in both locales - and `index.mdx` is the page a reader
  arriving from a search engine lands on. Neither banner message states that readers may report
  errors and omissions, which is what TEX-26 says the notice is for. Both are
  [WebLeadAgy](/TEX/agents/weblead) items, not content items.

### Limits

This decision **certifies no content and qualifies no reviewer**. It authorises no publication,
discharges no Article VI.1 obligation and does not touch any `translation_status`. It does not
re-open Units 1, 2 or 6. The additional cycle granted to Unit 5 in item 2 must be run by a
reviewer independent of the sessions that authored the content, performed any repair, and wrote
this decision; a `pass` restores the provisional tier only, because `acceptProvisionalReport`
still skips the signed reviewer registry, and an `escalate` sends the unit to the
content-improvement loop with no further cycle.

---

## D-2026-0049 - GQUR-301 intake: identity, blueprint and decision residue approved; partition and outcomes escalated; coverage, readings and structure fail

- **Status:** pending-owner-review
- **Gate:** G0 intake / G1 unit-spec
- **Scope:** GQUR-301 only. First intake evaluation of `specs/content/gqur-301/content-spec.md` at
  commit `2fd037b2`, by an evaluator that did not draft it (drafted by the Paperclip
  BilingualAuthor agent). Settles **only** `identity`, `blueprint` and `decision-residue`. Units 1
  and 2 already authored under `docs/semester-2/gqur-301/` were treated as context, not judged.
- **Decided by:** agent:evaluator, 2026-10-10
- **Decision:**
  1. **Identity: approved.** GQUR-301, "Quantitative Reasoning-II (Statistics)", **3 (3-0)**,
     Semester 2, General Education, as `catalog/courses.json` records it in its Semester 2 group.
     The guide gives code `2nd 2026.txt:371`, title `:375`, credit hours "3" `:380`, semester "2nd"
     `:381`. The revised board Scheme (final authority) gives `GQUR-301 / Quantitative
     Reasoning-II (Statistics) / 3(3-0) / General Education` (`B.Ed 4 Year 2026 revised after
     board.txt`, Semester II row 1); the superseded board scheme agrees. The guide's bare total
     and the Scheme's split do not conflict (`G-2026-02`/`G-2026-05` posture). **No Article II.3
     conflict.** The `B.Ed (4-Year) 2025-2` document lists "GQUR:401 Quantitative Reasoning - II"
     in Semester IV; it is neither the Scheme of record nor a guide, and the owner's 2026-09-10
     final-authority designation (`specs/gaps.md` header) settles precedence among schemes, so it
     raises no question for this course.
  2. **Blueprint: approved.** Every unit carries the 10/10/5 bank, MCQ Remember to Apply, RRQ
     Understand to Analyze, ERQ Analyze to Evaluate with an Analyze-or-higher rubric
     (`style-guide.md:227-230`; the ERQ band is a subset of "Analyze to Evaluate/Create"). The
     ">= 2 MCQ and >= 2 RRQ per topic" floor resolves to 8/10 in Units 1, 2, 5 (four topics) and
     to exactly 10/10 in Units 3, 4, 6 (five topics): feasible in every unit, with no headroom in
     the five-topic units. **No floor the spec's own items would breach.**
  3. **Decision residue: approved, none found.** Every `confirmed` entry was swept against the
     whole spec. `D-2026-0001` is consistent with the bibliographic-level citation posture.
     `D-2026-0002`/`0004` ("one-page", "one-term"): zero hits. `D-2026-0003`: zero `.specify`
     references. `D-2026-0012`: the derived unit grouping is labelled derived. `D-2026-0013`/
     `0021` are course-specific; the spec's self-declared `open_access_floor: {default: 1}` follows
     the GQUR-300 precedent (`D-2026-0042` item 5) without claiming owner adoption. The spec's
     "unresolvable" rows for `baboons`/`zaslow` resemble `D-2026-0010`'s manner but are not an
     extension of it: both works resolve (see Limits, readings), so this is a readings defect, not
     residue. No other confirmed entry touches this course's spec.
- **Not approved (recorded so a reader can see what remains):**
  - **`partition` - escalated, `G-2026-82`.** The guide gives 16 week-mapped chapters and no units
    (`2nd 2026.txt:405-527`); the six-unit merge is a judgement it does not determine. Verified
    structural properties: contiguous, no chapter split or reordered, every chapter placed once.
  - **`outcomes` - escalated, `G-2026-83`.** The CLO refs trace to guide outcomes 1-3
    (`:394-401`) and none is an addition, but CLO 3's "appropriate computational tools" component
    has no outline ancestor and no unit delivers it. Also a defect: `content-spec.md:41` labels the
    outcomes "verbatim", but outcome 3 drops the guide's "It is an".
  - **`coverage` - fail (repairable by the drafter).** In substance every one of the guide's 43
    leaf sub-topics (`:406-526`) appears exactly once across the 46 checklist rows (three split
    compounds: 6.2, 10.1, 13.1), and no sub-topic is added. But three Unit 2 rows carry **false
    guide refs**: U2-05 Median "4.1" (guide 4.2, `:463`), U2-07 Comparison "5.1" (guide 5.2,
    `:467`), U2-08 Applications "5.1" (guide 5.3, `:468`) at `content-spec.md:261,263,264`. The
    `## Week schedule` summary (`:112-117`) omits 8.3, 11.2, 16.2 and 16.3, which the checklists
    carry. The description locator `2nd 2026.txt:385-389` (`:66`) should be `:383-388`.
  - **`readings` - fail (repairable by the drafter).** The guide's seven-entry list
    (`:551-580`) is present and every entry resolves to a real work, so the guide side passes.
    The spec's record of it does not: `baboons` (`:87`) and `zaslow` (`:88`) are recorded
    "unresolvable" but resolve (Babones, S. J. (Ed.) (2013) *Applied Statistical Modeling*, 4
    vols, SAGE, ISBN 9781446208397, the guide misprinting the surname; Zaslow, E. (2020),
    Cambridge University Press, ISBN 9781108419413); `lock2008` (`:90`) gives year 2008 and ISBN
    9780471764003, but the first edition is Wiley 2012, ISBN 9780470601877, and the given ISBN
    resolves to nothing found; curated `siegfried2020` (`:98`) attributes *Seeing Statistics* to
    "Siegfried, T. (2020), American Statistical Association, open-access", while every record found
    names Gary McClelland's commercial web-book (c. 1999), and the URL returned an empty response
    this run, so its "verified 2026-10-09" note is not supported; `openstax-stats` (`:100`) gives
    2020, OpenStax gives Dec 13, 2023 for 2e. `haq1984` and `chaudhry2008` resolve as real print
    works (widely cited in HEC/university syllabi), so `D-2026-0001` governs their text.
  - **`structure` - fail (repairable by the drafter).** Front matter validates against
    `contracts/content-spec-frontmatter.schema.json` (ajv 2020, true), all course-level sections
    are present in contract order, every unit has every per-unit block, the Topic-list partitions
    are total and disjoint, depth-budget counts match, every topic plans two figures, plan
    bullets match the topic-list cells, and every mapped-readings key resolves. Two defects:
    (a) the checklist `Topic` column must equal the assigned `### Topic list` label
    (`content-spec-v3.md`), but U3-06, U3-08, U3-09 (`:339,341,342`), U4-07 (`:424`), U6-05,
    U6-07, U6-08 (`:582,584,585`) carry guide numbers (7.2, 8.2, 8.3, 11.2, 15.3, 16.2, 16.3) that
    are not Topic-list labels (no gate enforces this today); (b) **Unit 5 plans no concept-map,
    flowchart or timeline** (`:510-513`, all diagram/table), breaching Art. III.10 /
    `style-guide.md:493-494`, which `check:figures` will fail at G2.
- **Basis:** `Scheme-and-Course-guides/extracted-text/2nd 2026.txt`, the GQUR-301 block: code
  `:371`, title `:375`, credit hours `:380`, semester `:381`, description `:383-388`, outcomes
  `:390-401`, outline `:403-527` (chapter/week headings `:405`, `:416`, `:454`, `:461`, `:465`,
  `:470`, `:475`, `:479`, `:484`, `:488`, `:492`, `:496`, `:511`, `:515`, `:519`, `:524`), teaching
  strategy `:529-535`, assessment `:537-547`, readings `:549-580`. The revised board Scheme for
  identity. `specs/content/style-guide.md` v4.5 and `specs/008-rich-unit-pedagogy/contracts/
  content-spec-v3.md` for blueprint and structure. External registries for readings (not bound,
  checked 2026-10-10): SAGE/UMT catalogue (Babones), Google Books/Cambridge (Zaslow), Bookfinder/
  Wiley (Lock), OpenStax (Illowsky & Dean), HEC 2008 Statistics curriculum (Haq), JSTOR/ HERDSA
  records (McClelland, *Seeing Statistics*). Identity rests on the guide and the Scheme directly;
  blueprint and residue rest on the bound style guide, contracts and register.

  **Deterministic checks run at `2fd037b2`, real exit codes:** `validate:content` 0;
  `check:no-em-dash` 0; `check:no-answer-keys` 0; `check:concept-graph` 0; `check:bloom-bands` 0;
  `check:source-floor` 0; `check:depth-gate` 0; `check:figures` 0; `check:docs-sync` 0;
  `check:pipeline-gate` **1** (4 GQUR-301 findings: Units 1 and 2 fail because the content-spec is
  `draft` and their G2 rows are not done, the expected result of authoring before intake). The
  green gates cover only authored Units 1-2; the spec-side invariants for all six units were
  replayed directly with the gate's own parsers (`unitSectionLines`, `parsePipeTable`,
  `tableAfterHeading`, `parseTopicList`).
- **Bound to:** `/tmp/claude-1005/-home-a2ahs-mega-book-for-B-Ed/e283ce34-647b-4701-9268-ea887141a5b3/scratchpad/intake/GQUR-301/manifest.json`,
  manifest digest `3dfe0d37ddf4b9c86599a2699445647cc2bcd33aa266fe7788deac6b8141434a`, 65 inputs at
  commit `2fd037b20b2c17bb4334e5655c61f7cd2ed9457c`. Recomputed independently with `manifestFor()`
  over the prepare script's `intakeRoots('gqur-301')`: every path and digest matched, none extra or
  missing, the `manifest_digest` reproduced, and both `registers` digests matched. **Any change to
  a bound input voids this approval** (Art. VII.8.5); the registers are not freshness-bearing
  (`G-2026-15`), so recording this entry does not void it.
- **Limits:**
  - **The spec may NOT move to `status: approved` on this entry.** That needs the owner's rulings
    on `G-2026-82` and `G-2026-83`, the drafter's repairs to coverage (three Unit 2 guide refs, the
    week-schedule summary, the description locator), readings (`baboons`, `zaslow`, `lock2008`,
    `siegfried2020`, `openstax-stats`) and structure (seven Topic cells, a structural figure for
    Unit 5), and a fresh evaluation against a new manifest.
  - **Blocked:** the unit grouping of all six units and their "Weeks N-M (derived)" lines
    (`G-2026-82`); the CLO 3 refs of Units 4, 5 and 6 (`G-2026-83`); Unit 1's and Unit 2's mapped
    readings that rely on `siegfried2020`; Unit 5's figure plan.
  - Approving `identity`, `blueprint` and `decision-residue` does not approve the partition the
    blueprints sit in; if the owner changes the partition, the blueprint verdict must be re-derived.
  - Does not judge authored Units 1-2, approve any G3/G5 review, certify content, qualify a
    reviewer or authorise publication (Art. VII.8.4).
