# Curriculum Gaps & Discrepancies Log

Per Constitution Art. II.3, any ambiguity or mismatch between the **board Scheme of Study** and
the **course guides** is logged here and escalated to the curriculum owner (Yousif), never
invented or silently resolved.

Status: `open` (awaiting owner decision) · `resolved` (decision recorded).

> **Scheme of Study - final authority (2026-09-10).** The curriculum owner has designated
> `Scheme-and-Course-guides/B.Ed 4 Year 2026 revised after board.docx` as the **final authority**
> for the scheme of studies. `B.Ed 4 Year board.docx` is the superseded earlier scheme, retained
> for provenance only. What the revision changed (diff of the two extractions):
>
> | Course | Superseded scheme | **Revised scheme (authoritative)** |
> |---|---|---|
> | GPKS-402 Pakistan Studies 2(2-0) | Semester IV | **Semester II** |
> | GUHQ-301 Fehm-e-Quran I 1(0-1) | Semester II | **Semester III** |
> | GUHQ-400 Fehm-e-Quran II 1(0-1) | Semester III | **Semester IV** |
>
> Credit-hour totals move accordingly: **Sem II 18 -> 19**, **Sem IV 17 -> 16**; Sem III
> unchanged at 16; grand total still **132**. **Semester I is unchanged** by the revision.
>
> "Final authority" settles precedence *in general*, but each guide-vs-scheme conflict was still
> decided on its own merits by the owner, recorded per gap below.

---

## G-2026-01 - Sem I/II course guides extracted (was: pending PDF extraction)
- **Status:** resolved
- **Detail:** `1st 2026.pdf` and `2nd 2026.pdf` are text-extracted (via `pdfminer.six`/`pypdf` in a venv; `poppler-utils` needs root and was unavailable). Both follow the enriched 2026 structure: *Suggested Practical Activities (optional)*, *Suggested Instructional/Reading Materials*, *Teaching/Instructional Strategies*, *Practical Work*, *Assessment Criteria*, *Recommended Books*.
- **Confirmed course inventory (reconciled against the revised scheme, 2026-09-10):**
  - **Sem I (6, 18 CH):** GENG-300 Functional English · GNAS-301 Environmental Science · GICT-300 Application of ICT · GQUR-300 Quantitative Reasoning-I (Maths) · EFMP-301 Educational Psychology · EFMP-302 Teaching Profession.
  - **Sem II (7, 19 CH):** GQUR-301 Quantitative Reasoning-II (Statistics) · GSOS-301 Social Science (Sociology) · GENG-301 Expository Writing · EFMP-303 Educational Policies & Plans of Pakistan · EFMP-304 Critical Thinking & Reflective Practices · EFMP-305 Inclusive Education · **GPKS-402 Pakistan Studies** (moved in from Sem IV by the revision; the guide's "GPKS-302" is superseded, see G-2026-03).

## G-2026-02 - GNAS code mismatch (Sem I)
- **Status:** resolved (owner decision, 2026-09-10)
- **Detail:** Environmental Science is coded **GNAS-301** in the Sem I course guide but **GNAS-401** in both the superseded and the revised board scheme. The revision did not touch Semester I, so the conflict stands on its own.
- **Decision:** **GNAS-301** is authoritative. The Sem I course guide is the document teachers and students actually hold, the code is already the published content path (`docs/semester-1/gnas-301/`), and the scheme's `GNAS-401` is treated as a board-side numbering slip. This is the one case where the guide is taken over the scheme, decided deliberately rather than by the general precedence rule.
- **Credit-hour reconciliation:** the guide states only `Credit Hours 3` with no lab split; the scheme states `3 (2-1)`. The catalog previously carried an invented `3 (3-0)`. Resolved to **`3 (2-1)`** - code from the guide, split from the scheme, which is the same posture taken for GSOS-301 in G-2026-05.

## G-2026-03 - Pakistan Studies semester/code mismatch
- **Status:** resolved (revised scheme, 2026-09-10)
- **Detail:** The Sem II guide includes **GPKS-302 Pakistan Studies (2 CH)**. The superseded scheme listed Pakistan Studies as **GPKS-402** under **Semester IV**.
- **Decision:** **GPKS-402, Semester II, 2 (2-0).** The revised scheme moves Pakistan Studies into Semester II, which vindicates the guide on *placement* and the scheme on *code*. `GPKS-302` is a guide-side numbering slip and is not used anywhere.

## G-2026-04 - Fehm-e-Quran (GUHQ) code and semester
- **Status:** resolved (revised scheme, 2026-09-10)
- **Detail:** The superseded scheme listed **GUHQ-301 Fehm-e-Quran I (1 CH)** in Sem II, but the Sem II guide contained no such course; an "Understanding of Holy Quran I / **GUHQ-401**, Semester: 2nd" block appeared instead inside `3rd 2026.docx`.
- **Decision:** **GUHQ-301 Fehm-e-Quran I, Semester III, 1 (0-1)** and **GUHQ-400 Fehm-e-Quran II, Semester IV, 1 (0-1)**. The revision moves Fehm-e-Quran I from Sem II to Sem III, which explains both anomalies at once: the Sem II guide has no such course *because it moved*, and the block in `3rd 2026.docx` is where it now belongs. The guide's `GUHQ-401` is a guide-side numbering slip.

## G-2026-05 - GSOS-301 credit-hours mismatch (Sem II)
- **Status:** resolved (owner decision, 2026-09-10)
- **Detail:** Social Science (Sociology), GSOS-301, shows **3 CH** in the Sem II guide vs **2 (2-0)** in both the superseded and the revised scheme.
- **Decision:** **2 (2-0).** Credit-hour values are a property of the degree-awarding scheme, so the scheme governs. This is consistent with the Sem II total of **19 CH** in the revised scheme (3+2+3+3+3+3+2).

---

## G-2026-06 - EFMP-301 U1: no open-access source for "what education gives back to psychology"

- **Status:** **resolved** (owner decision `D-2026-0008`, 2026-09-20)
- **Decision:** accepted as disclosed. The prose already states the limit and attributes the claim to the guide bullet rather than to a source. If an open-access treatment is found, the improvement loop cites it.
- **Detail:** The EFMP-301 course guide's Chapter 1 lists "Relationship between psychology and
  education" as a bullet. The direction *psychology -> education* is well served by open-access
  material (Seifert & Sutton 2009). The reverse direction - what school practice contributes back
  to psychology - has no introductory-level open-access treatment I could verify. It is covered in
  `topic-02.mdx` from the guide bullet plus general knowledge, kept short and uncontroversial, and
  logged as a `no-external-source` row in `specs/content/efmp-301/sources/unit-01.md`
  (`author-unit` Step 1.4, Constitution Art. II.3).
- **Owner decision needed:** accept the general-knowledge treatment, supply a preferred source, or
  narrow the sub-topic (U1-6) at G1.

---

## Previously logged gaps

All five earlier discrepancies are resolved. New ambiguities found during G0 course intake for
Semesters III-VIII should be appended here as `G-2026-06` onward and escalated before any catalog
or content change (Art. II.3).

## EFMP-302 Unit 2 - two unresolved source references (2026-09-15, from the G3 review)

**1. "NACTE guidelines" (sub-topic U2-09).** The course guide names these under Unit 2's codes of
conduct with no reference. A drafting note claimed they resolve to the *National Professional
Standards for Teachers* on the grounds that NACTE publishes no separate code of ethics. **That
claim was wrong and unsupported**: it was inferred from a search that returned nothing, not from a
document. G3 review evidence indicates NACTE publishes its own accreditation standards for teacher
education programmes, in which the national standards appear as a single indicator. That finding
could not be re-verified from the authoring host, which returns 404 for every `nacte.org.pk` path
tried, so it is recorded here rather than asserted in the unit.

**Needed**: the curriculum owner or a reviewer with access should identify which NACTE document
the guide means, confirm whether it contains conduct or ethics provisions, and either add it to
the course reading list or record that the guide's reference is unresolvable. The unit currently
tells the learner plainly that the reference is unverified and directs them to ask their tutor.

**2. The four-step Empathy, Context, Reflect, Action framework (sub-topic U2-11).** Named in the
guide's Unit 2 outline with no reference. It was mistakenly mapped to `ehrich2011` at drafting;
that paper contains a different five-part critical-incident model. No verifiable source has been
found. It is taught as guide-given and carries a `no-external-source` row in
`specs/content/efmp-302/sources/unit-02.md`.

**Needed**: identify the framework's origin, or confirm that it is the course guide's own
construction, so the unit can attribute it correctly.


**Unit 4 carried the same conflation (2026-09-19, from the G3 run-003 review).** Seven passages in Unit 4 asserted that Pakistani teacher education is *accredited against* the National Professional Standards. That states more than the `npst-pakistan-2009` declaration supports, which covers the ten standard names, the three-part division and the 2009 origin, and it collides with the finding recorded above that NACTE publishes its own accreditation standards. All seven now say the standards are what teacher education is *built to*, which the declaration does support. The underlying question is unchanged and still needs the decision described above.


---

## Intake evaluation, EFMP-302 (2026-09-19)

The following were raised by the first run of the intake evaluator (Constitution Art. VII.8),
in shadow mode, against the frozen bundle at commit `5debd4a`. Its record is at
`specs/content/efmp-302/intake/`. The evaluator recorded them rather than deciding them,
which is the correct outcome: none is determined by the course guide.

## G-2026-07 - EFMP-302 credit hours: two guide documents disagree with each other and one disagrees with the Scheme

- **Status:** **resolved** (owner decision `D-2026-0003`, 2026-09-20)
- **Decision:** `.specify/Course_guides_and_Scheme/` is a **superseded departmental variant set**,
  retained for provenance only. Credit hours for EFMP-301 and EFMP-302 stand at `3 (3-0)`, which
  `catalog/courses.json` already carries, so no content or catalog change follows. The Faculty
  guides' CLO numbering governs both courses' SLO traces, so those traces are unaffected too. A
  provenance README now sits in the folder, which is what stops this recurring for the six other
  courses with a file there.
- **Criterion:** `identity` (G0 intake). Constitution Art. II.3.
- **Detail:** The bundle binds two documents that both present themselves as the EFMP-302 course
  guide, and they are not the same document.

  | | `Scheme-and-Course-guides/1st 2026.pdf` | `.specify/Course_guides_and_Scheme/EFMP-302 Teaching Profession.pdf` |
  |---|---|---|
  | Issuing body | Faculty of Education, University of Sindh, Jamshoro | Dept of Early Childhood and Elementary Education, Elsa Qazi Campus, Hyderabad |
  | Credit hours | `3 (3-0)` (extract `extracted-text/1st 2026.txt:723`) | `03 (0-3)` (page 1) |
  | `Major:` line | `Professional Course- II` (extract `:718`) | absent |
  | CLO 1 / CLO 2 order | "Identify and exhibit" then "Define and explain" (`:748`, `:750`) | the reverse |
  | Unit outline 1.1 to 6.4 | identical between the two | identical |
  | Suggested Readings | the same 12 entries | the same 12 entries |

  The revised board Scheme, which the owner designated final authority on 2026-09-10
  (`Scheme-and-Course-guides/extracted-text/B.Ed 4 Year 2026 revised after board.txt:78-86`),
  gives `3 (3-0)`. `catalog/courses.json:45-50` carries `3 (3-0)`.
  `specs/content/efmp-302/content-spec.md:8` cites only the first guide document as its source
  and does not record that the second exists.

  `(3-0)` is three theory hours and no practical; `(0-3)` is the reverse. They describe different
  courses, and the difference bears on the Constitution Art. III.7 assessment default the spec
  falls back to at `content-spec.md:33-34`.

  Two consequences beyond the number itself. First, the **CLO numbering** differs between the two
  documents, and every unit in the spec traces its SLOs to CLOs **by number**
  (`content-spec.md:158, 277, 438, 562, 685-686, 807`), so those traces move if the standalone
  PDF is authoritative. Second, the general precedence rule the register's header records would
  give `3 (3-0)`, and G-2026-05 already decided for another course that "credit-hour values are a
  property of the degree-awarding scheme". That makes the answer look obvious, which is exactly
  the situation Art. VII.8.2 and the decision log's non-delegated boundary address: the register's
  own header states that each guide-vs-scheme conflict "was still decided on its own merits by the
  owner", and no entry adjudicates EFMP-302. **Not decided here.**

- **Needed, and from whom:** the curriculum owner, to state (a) which of the two documents is the
  authoritative EFMP-302 course guide, or that one is superseded and should be marked so, and
  (b) the credit-hour value that follows. If the standalone PDF is superseded, a provenance note
  in `.specify/Course_guides_and_Scheme/` would stop this recurring for every course in that
  folder, which has no README and no extracted text.
- **Blocks:** `catalog/courses.json` `credit_hours` for EFMP-302; the numeric CLO traces in all
  six unit sections; proposed `D-2026-0004` is written to exclude the credit-hour split for this
  reason.

- **Generalised after the evaluation (2026-09-20).** EFMP-302 is not the only case, and the
  pattern is cleaner than one course suggests. `.specify/Course_guides_and_Scheme/` holds a
  **departmental variant set** of guides, and where one exists it states `(0-3)`:

  | Course | `.specify/` departmental guide | Faculty guide (`1st 2026`) | Revised Scheme (authority) | `catalog/courses.json` |
  |---|---|---|---|---|
  | EFMP-301 | `03 (0-3)` | `03`, no split stated | `3 (3-0)` | `3 (3-0)` |
  | EFMP-302 | `03 (0-3)` | `3 (3-0)` | `3 (3-0)` | `3 (3-0)` |

  So for EFMP-302 two of the three authorities already agree on `(3-0)` and only the departmental
  guide dissents; for EFMP-301 the Faculty guide states no split at all, so the only conflict is
  the departmental `(0-3)` against the Scheme's `(3-0)`. **EFMP-301 Unit 1 is certified and
  published**, which is why this is recorded rather than left for whenever that course is next
  opened.

  This makes the question one decision rather than fourteen: **is
  `.specify/Course_guides_and_Scheme/` a superseded departmental variant set, or an authority?**
  One answer settles both courses and the six other files in that folder. The folder has no
  README, no extracted text and no provenance note, which is why nothing had noticed it.

  Still not decided here. G-2026-05 held that credit-hour values are a property of the
  degree-awarding scheme, which points at `(3-0)`, and the register's header records that each
  conflict is decided on its merits by the owner.

## G-2026-08 - EFMP-302 Unit 4: five sub-topics authored under bare guide headings, undisclosed

- **Status:** **resolved** (owner decision `D-2026-0009`, 2026-09-20)
- **Decision:** `U4-08` to `U4-12` confirmed as authored decompositions of bare guide headings 4.3 and 4.4, on the same footing as Units 2 and 5. Unit 4's preamble now carries the "expansion, not a transcription" disclosure; the same false claim was corrected in Units 1, 3 and 6.
- **Criterion:** `coverage` (G1 unit-spec).
- **Detail:** The spec's six `### Sub-topic checklist` tables carry 78 rows against 53 guide leaf
  bullets. No guide bullet is dropped, and most of the excess is legitimate decomposition of
  compound bullets. **Fourteen rows have no guide bullet ancestor**, because they sit under guide
  headings that carry no bullets at all: guide 2.1 (`U2-01` to `U2-04`), 4.3 (`U4-08`, `U4-09`),
  4.4 (`U4-10` to `U4-12`), 5.3 (`U5-11`, `U5-12`), 6.4 (`U6-12`, `U6-13`), plus `U6-01` taken
  from the 6.1 heading itself.

  Units 2, 5 and 6 disclose this in terms
  (`content-spec.md:300-305`, `:706-709`, `:830-832`), and Units 2 and 5 additionally carry
  recorded owner confirmations of their topic partitions. **Unit 4 discloses nothing.** It states
  at `content-spec.md:579` that its checklist is "One row per leaf bullet of course-guide sections
  4.1-4.4". Guide 4.3 and 4.4 have no leaf bullets, and 4.1 and 4.2 were split, so the statement
  is wrong, and a reader checking the spec against the guide is told not to expect what is there.

  `U4-12`, "What happens when a standard is used for a purpose it was not designed for", is the
  sharpest case: a substantive critical-perspective sub-topic with no guide ancestor of any kind.
  It is a good sub-topic. Criterion 4 is nonetheless explicit that additions are escalations, and
  the guide is silent on whether a course may teach the limits of the standards it teaches.

  Three further inaccuracies in the spec's own account of its derivation, reported together
  because they are the same class of error:
  - `content-spec.md:706-707` says the guide's Unit 5 outline "carries ten leaf bullets across
    three headings" with 5.3 contributing none. The actual count is **eight** (5.1 has six, which
    the same spec states correctly at `:731`; 5.2 has two).
  - `content-spec.md:458` makes the "one row per leaf bullet" claim for Unit 3, where guide 3.5's
    single bullet became three rows.
  - `content-spec.md:830` makes it for Unit 6 sections 6.1 to 6.3, where 6.1's two bullets became
    three rows.

- **Needed, and from whom:** the curriculum owner, to confirm or revise the five Unit 4 rows
  `U4-08` to `U4-12` as authored decompositions of bare guide headings 4.3 and 4.4, on the same
  footing as the confirmations already recorded for Units 2 and 5; and to direct that Unit 4's
  checklist preamble carry the same "expansion, not a transcription" disclosure the other expanded
  checklists carry. The four miscounted derivation notes are authoring corrections and need no
  owner decision, only a fix.
- **Blocks:** Unit 4's `### Sub-topic checklist`. Proposed `D-2026-0005` approves only the
  completeness half of criterion 3 for this reason.

## G-2026-09 - EFMP-302 reading list: one entry filed as guide-required is not in either guide, and one guide entry has no locator

- **Status:** **resolved** (owner decision `D-2026-0010`, 2026-09-20)
- **Decision:** `kwakman2003` re-filed to `### Curated-supplementary` (no guide lists it); `icka2024` stays guide-required with its locator recorded unresolvable, cited at bibliographic level only.
- **Criterion:** `readings` (G0 intake).
- **Detail:** Both bound guide documents list exactly **12** Suggested Readings
  (`Scheme-and-Course-guides/extracted-text/1st 2026.txt:923-990`, and the identical list in the
  standalone PDF). The spec's `### Guide-required` table carries **13**
  (`specs/content/efmp-302/content-spec.md:59-75`).

  1. **`kwakman2003`** (`:71`), Kwakman, K. (2003), *Teaching and Teacher Education* 19(2),
     149-170, is the extra entry. It is in neither guide. It is a real and correctly cited work,
     and its own note records that the bibliographic record was verified via OpenAlex on
     2026-09-15, so this is not a fabrication finding. It is a **filing** finding: the table
     asserts by its heading that the guide requires the entry, and it does not, and Unit 6 then
     carries it into `**Mapped readings**` (`:874`) and into a scope-discipline paragraph (`:877`)
     on that footing.
  2. **`icka2024`** (`:73`) gives "(open access - journal site)" and **no DOI and no URL**.
     Criterion 5 requires each entry to be resolvable to a real work, and this one is not
     resolvable from the bound inputs. The incomplete reference originates in the guide, not in
     the spec.
  3. **Monographs, recorded because `D-2026-0001` binds them.** Five guide-required entries are
     print books with no retrievable text: `brookfield2017`, `carr2000`, `day1999`, `guskey2000`,
     `hurst2009`. `D-2026-0001` is confirmed and corpus-wide, so an author may flag and proceed,
     but each binds the author to **title-level support only** unless a copy is obtained. They are
     mapped across Units 1, 2, 3 and 6, so four of six units rest part of their source base on
     title-level support. This is recorded so a G3 reviewer of those units inherits it rather than
     rediscovering it; no decision is requested on this item.

- **Needed, and from whom:** the curriculum owner, to decide whether `kwakman2003` moves to
  `### Curated-supplementary` or whether a guide document not in this bundle lists it; and to
  supply a resolvable locator for `icka2024`, or to record the guide's reference as unresolvable
  in the manner G-2026-06 uses.
- **Blocks:** the `### Guide-required` table. Criterion 5 is not approved.

## G-2026-10 - EFMP-302 CLO 4 has no unit whose guide topics deliver it

- **Status:** **resolved** (owner decision `D-2026-0011`, 2026-09-20)
- **Decision:** recorded as a guide drafting artefact. No content is invented for it, and the CLO list now states that Units 5 and 6 tracing to CLO 4 by number is not evidence of coverage.
- **Criterion:** `outcomes` (G1 unit-spec).
- **Detail:** Guide CLO 4 is "Develop skills to plan, implement, and evaluate teaching strategies
  for diverse learners" (`Scheme-and-Course-guides/extracted-text/1st 2026.txt:752-754`;
  `content-spec.md:26`). Unit 5 (`:685-686`) and Unit 6 (`:807`) both name it as an ancestor of
  their SLOs. Neither unit's guide topics support it: Unit 5 covers workload, burnout,
  multilingual and multi-grade classrooms, accountability, stakeholder expectations, status,
  digital professionalism and responding to challenges; Unit 6 covers CPD, career stages,
  development routes and a personal plan. Neither teaches planning, implementing or evaluating a
  teaching strategy, and no other unit claims CLO 4.

  This is a hole in the **guide**, not in the spec. The guide's own six-unit outline contains no
  instructional-planning content anywhere, so no faithful derivation of it can discharge CLO 4.
  The spec's response was to attach the outcome to the two units with the loosest fit, which
  produces a trace that reads as satisfied and is not.

  The guide therefore does not determine how CLO 4 is discharged, which is the condition for
  escalation rather than decision.
- **Needed, and from whom:** the curriculum owner, to decide whether CLO 4 is discharged elsewhere
  in the programme (EFMP-301 or a methods course), whether it is a drafting artefact in the guide
  that should be recorded as such, or whether EFMP-302 must carry content for it that the guide
  does not list. Until then, the Unit 5 and Unit 6 CLO traces should not be read as evidence that
  CLO 4 is covered.
- **Blocks:** the Unit 5 and Unit 6 CLO traces. Criterion 4 is not approved.

## G-2026-11 - `D-2026-0002`'s superseded Unit 6 design survives in EFMP-302's course review plan

- **Status:** **resolved** (owner decision `D-2026-0004`, 2026-09-20)
- **Decision:** `D-2026-0002` extends beyond Unit 6 for this course. The *One-term PD plan*
  practicum item in `content-spec.md` "## Course review plan" is corrected to the one-page design,
  with the superseded wording recorded rather than deleted.
- **Criterion:** `blueprint` (G1 unit-spec), and a scope question about an existing decision.
- **Detail:** `D-2026-0002` (confirmed, curriculum owner, 2026-09-19) settles Unit 6's activity
  design as the **one-page** development plan and records the competing **one-term** design,
  "which named one activity from each 'ways to continue developing' category", as superseded. The
  spec applies that inside Unit 6 and records the supersession openly
  (`content-spec.md:817-822`, `:886-887`).

  `content-spec.md:151-152`, in the course-level `## Course review plan`, still lists a practicum
  brief called *One-term PD plan*: "build a personal professional-development plan naming one
  activity from each 'ways to continue developing' category". That is the superseded design,
  verbatim.

  It survived legitimately. `D-2026-0002`'s **Applied in** field names only "`content-spec.md`
  '## Unit 6'", and its **Limits** say "Settles Unit 6 only", so the course-level section was
  outside its declared reach. `specs/008-rich-unit-pedagogy/contracts/content-spec-v3.md` states
  that `## Course review plan` is "Not parsed by any gate", and the spec repeats this at `:123`,
  so nothing deterministic could have flagged it.

  The substantive question is not clerical. `D-2026-0002`'s basis records that Unit 6's
  `topic-04.mdx` "argues directly against building a plan from one activity per category". A
  trainee who reaches the end-of-course review would therefore be set a practicum built on a
  design the unit they learned it from teaches against.
- **Needed, and from whom:** the curriculum owner, to decide whether `D-2026-0002` extends to the
  course review plan (in which case the *One-term PD plan* brief is superseded there too and a
  replacement brief is needed), or whether a course-level practicum may deliberately differ from
  the unit design. This is a scope extension of a confirmed decision, which Art. VII.8.2 places
  outside an evaluator's reach.
- **Blocks:** the `## Course review plan` practicum briefs, and, downstream, the eventual
  `course-review.mdx`.

## G-2026-12 - The intake bundle omitted inputs its own criteria depend on

- **Status:** resolved (developer fix, 2026-09-19)
- **Detail:** `intakeRoots()` in `scripts/prepare-intake-evidence.mjs` bound only
  `content-spec.md` from the course directory. The `coverage` criterion therefore could not see
  `coverage/unit-NN.md`, which the spec references in six places, and the `structure` criterion
  could never fully pass on any course because `contracts/` was unbound. The evaluator marked the
  affected clause `unverified` rather than let unbound material support an approval, and raised
  the omission against the bundle.
- **Fix:** the whole `specs/content/<code>/` tree and `contracts/` are now bound, taking the
  bundle from 48 inputs to 94. `bound()` additionally excludes `/intake/` alongside `/reviews/`,
  so an evaluator's own record cannot invalidate the evidence it rests on (ADR-0019 s3).
- **Note:** this is recorded rather than silently fixed because it is the class of defect that
  matters most in a governance tool - a criterion that cannot reach its own evidence still
  reports a verdict.

---

## Intake evaluation, EFMP-304 (2026-09-20)

Raised by the intake evaluator (Constitution Art. VII.8) against the frozen bundle at commit
`778b76e`, manifest `specs/content/efmp-304/intake/manifest.json`, manifest digest
`94eee898b92dc0c1bc9845fc06afe60629456bd35c0ff667ac04bfb142efd769` (56 inputs, recomputed with
`manifestFor()` and matching the bundle exactly). The evaluator's record is at
`specs/content/efmp-304/intake/evaluation.md`. Both items below are recorded rather than decided:
neither is determined by the course guide, and Art. VII.8.2 names both classes explicitly.

## G-2026-13 - EFMP-304 has no guide week schedule, but the content-spec contract requires the section

- **Status:** **resolved** (owner decision `D-2026-0012`, 2026-09-20)
- **Decision:** the contract is amended, not the spec. A guide-silent course may record the section as guide-silent, or record a derived distribution clearly labelled as derived with its basis stated. EFMP-304's existing schedule conforms without change.
- **Criterion:** `partition` (G0 intake / G1 unit-spec).
- **Detail:** The EFMP-304 guide block
  (`Scheme-and-Course-guides/extracted-text/2nd 2026.txt:609-756`) carries a course description,
  six course outcomes, a six-unit topic outline, a reading list and a marks table. It carries
  **no week table of any kind**. `specs/007-content-depth-standard/contracts/content-spec-v2.md:43`
  nonetheless makes `## Week schedule` a required course-level section, and
  `specs/008-rich-unit-pedagogy/contracts/content-spec-v3.md:115` carries it forward as a section
  the human Content gate reads.

  `specs/content/efmp-304/content-spec.md:130-147` supplies one, marked "Derived, not guide-given"
  and described as proportional to sub-topic count and technical density. It allocates a
  **16-week** term as 3/2/3/3/2/3 weeks across Units 1 to 6, and each `## Unit N` subsection
  repeats its band on its first line (`:201`, `:324`, `:418`, `:517`, `:611`, `:711`).

  Two things are undetermined, not one. First, the **term length**: nothing in the bundle states
  that an EFMP-304 term is 16 weeks. Second, the **distribution**: Unit 3 is given three weeks for
  four sub-topics while Unit 5 is given two weeks for five, on a density judgement the guide gives
  no basis for. The spec is candid that this is a judgement and asks for it to be escalated if the
  evaluator agrees; the evaluator does agree. The unit partition itself is guide-determined and is
  approved separately under `D-2026-0006`; only the calendar is at issue here.

- **Needed, and from whom:** the curriculum owner, to state the term length EFMP-304 is taught
  over and either to confirm the proposed 3/2/3/3/2/3 distribution or to supply another; or,
  alternatively, to direct that `## Week schedule` be recorded as guide-silent for this course in
  the manner Art. III.6 uses for the optional enrichment sections, in which case the contract's
  requirement needs amending rather than filling.
- **Blocks:** `## Week schedule` and the "Weeks N-M" line opening each of the six `## Unit N`
  subsections. Nothing else: `D-2026-0006` and `D-2026-0007` are written to exclude the calendar.

## G-2026-14 - EFMP-304's entire guide reading list is print-only, and Units 1 to 3 rest on one unopenable book

- **Status:** **resolved** (owner decision `D-2026-0013`, 2026-09-20)
- **Decision:** the G2 open-access floor is binding (2 sources per unit for Units 1-3, 1 for Units 4-6). Monographs cited at title level with the limit stated at point of use; `pendrey2022` method-only. Author now; deepen sourcing if texts are obtained.
- **Criterion:** `readings` (G0 intake).
- **Detail:** The guide lists seven works at
  `Scheme-and-Course-guides/extracted-text/2nd 2026.txt:720-741`. All seven are **monographs**.
  None carries a DOI, none is open access, and none served its text to this host. Every one of the
  seven nonetheless **resolves to a real work**, which the evaluator checked against Open Library
  on 2026-09-20 (an external registry, not a bound input):

  | Key | Resolves | Guide's record | Correction in the spec |
  |---|---|---|---|
  | bassham2010 | Bassham, Irwin, Nardone & Wallace, McGraw-Hill, 4th ed. 2010 | correct | edition added |
  | jasper2003 | Jasper, Nelson Thornes, 2003 | correct | none |
  | boud2013 | Boud, Keogh & Walker, Routledge 2013 (orig. Kogan Page 1985) | correct | editors and 1985 origin added |
  | pendrey2022 | Pendrey, Routledge / Taylor & Francis, 2022 | correct | none |
  | brookfield2017 | Brookfield, Jossey-Bass / Wiley, 2017 (2nd ed.; 1st 1995) | correct | edition and imprint added |
  | osterman2004 | Osterman & Kottkamp, **Corwin Press**, 2004 | "Thousand Oaks, CA: Crown" | publisher corrected |
  | taggart2005 | Taggart & Wilson, **Corwin Press**, 2005 | "Thousand Oaks, CA: Crown" | publisher corrected |

  The spec's claim at `specs/content/efmp-304/content-spec.md:101-102` and `:826-828` that the
  guide's "Crown" is a slip for Corwin Press is therefore **confirmed**, for both entries. That is
  recorded here for the owner's information and needs no decision: no bibliographic fact is in
  dispute.

  What needs a decision is **usability**. Article VII.8.2 requires an evaluator to escalate "an
  absent or unusable reading list" rather than decide it, and three findings bear on usability:

  1. **Units 1 to 3 are single-sourced on a book the host cannot open.**
     `content-spec.md:271`, `:375` and `:470` each map their whole unit to `bassham2010` alone.
     `D-2026-0001` permits an unretrievable source to be flagged and passed, but its Limits bind
     the author to what the declaration supports. The spec states the consequence itself at
     `:104-109`: title-level support "is not enough to carry the specific claims Units 1 to 3
     need (a named list of critical-thinking standards, named deductive patterns, a
     validity/strength distinction)". Those are the load-bearing claims of three of the six units.
  2. **`pendrey2022` is scoped against the guide's own stated audience.** The guide states twice
     that the course is for secondary teachers (`:632-633` "prospective secondary school
     teachers"; `:665` "at the secondary school level") and then requires a reading whose subtitle
     is "A practical guide to the early years" (`:730`). The spec confines it to method only
     (`:99`, `:567`, `:765`), which is a sound authoring discipline, but whether a guide-required
     reading may be used against the audience the same guide names is a question the guide does
     not answer, because the guide is where the tension sits.
  3. **The spec's remedy is a rule the guide does not contain.** `:118-128` sets a binding G2
     floor: Units 1 to 3 must each bind at least two verifiable open-access sources before
     authoring, Units 4 to 6 at least one, resolved through Crossref, OpenAlex, ERIC or DOAJ. The
     evaluator judges the floor **well designed and insufficient as a substitute for a decision**.
     It is well designed because it refuses to pre-write citations, which is what produced
     EFMP-302's `sources` failures. It is not a substitute because it converts a guide-level
     problem into an authoring obligation that no gate enforces, and because `D-2026-0005`
     (confirmed 2026-09-20) now holds ADR-0019's two-cycle repair limit with no blanket waiver.
     The spec's own risk note at `:109` says this is "the same failure mode that cost EFMP-302
     seven G3 cycles". Under `D-2026-0005` those seven cycles are no longer available, so a unit
     that reaches G3 under-sourced has two cycles and then routes to the content-improvement loop.

- **Needed, and from whom:** the curriculum owner, to decide (a) whether the seven print
  monographs constitute a usable basis for authoring EFMP-304 as they stand, or whether copies of
  `bassham2010` in particular must be obtained before Units 1 to 3 are drafted; (b) whether the
  proposed G2 open-access floor is adopted as a binding requirement, adopted with different
  numbers, or declined; and (c) whether `pendrey2022` is used method-only as the spec proposes, is
  set aside for this course, or is replaced.
- **Blocks:** `## Reading list` in full, and the `**Mapped readings**` line of every unit.
  Criterion 5 is **not approved**, and `D-2026-0007` is written to exclude it.

## G-2026-15 - Recording an intake decision invalidates the manifest that decision binds to

- **Status:** **resolved** (developer fix, 2026-09-20)
- **Fix:** `intakeRoots()` no longer binds `specs/decisions/log.md` or `specs/gaps.md`. They move
  to a separate `registers` field on the manifest, which records their digests at read time so an
  auditor can still see exactly what the evaluator read, but which does not bear on freshness.
  The principle is **bind what you do not write**: an evaluator reads those registers *and*
  records its result in them, so binding them made every approval void its own manifest the
  moment it was written. G3 review is the opposite case and keeps them bound in `manifestRoots()`,
  because a reviewer reads those rulings and never writes to them - that binding was added for a
  real reason (Unit 6's run-007 finding A1) and is unaffected.
- **Note:** this is the second bundle defect found by an evaluator on its own inputs, after
  G-2026-12. Both were found only by running the thing for real, which is the argument for the
  shadow-then-live sequence rather than either alone.
- **Criterion:** none. This is a defect in the intake bundle, raised against the tool, in the
  manner `G-2026-12` was.
- **Detail:** `intakeRoots()` in `scripts/prepare-intake-evidence.mjs:38-53` binds
  `specs/decisions/log.md` and `specs/gaps.md`. `bound()` in `scripts/lib/review-evidence.mjs`
  excludes `/reviews/`, `/intake/`, `tasks.md` and `/.staging/` so that "recording a result does
  not invalidate the evidence it rests on", and commit `778b76e` added `/intake/` for exactly that
  reason. **It does not exclude the two registers.**

  For G3/G5 that is correct: a reviewer reads `specs/decisions/log.md` and never writes to it. For
  intake evaluation it is not, because `.claude/skills/evaluate-intake/SKILL.md` **requires** the
  evaluator to append its approval to `specs/decisions/log.md` and its escalations to
  `specs/gaps.md`. The required act therefore voids the digests the approval binds to. Measured on
  this run, immediately after recording `D-2026-0006`, `D-2026-0007`, `G-2026-13` and `G-2026-14`:

  ```
  bound inputs whose digest now differs from the frozen manifest:
    [ 'specs/decisions/log.md', 'specs/gaps.md' ]
  newly bound paths not in the frozen manifest: (none)
  ```

  The other 54 of 56 inputs are unchanged. This did not surface on the EFMP-302 run because that
  run was shadow and wrote nothing; this is the first live run.

  The consequence is not cosmetic. Art. VII.8.5 makes an approval void when a bound input changes,
  so as it stands every intake approval is void the instant it is recorded, and a later reader
  cannot distinguish "the spec's guide was edited under this approval" from "the evaluator wrote
  the approval down".
- **Suggested fix:** exclude `specs/decisions/log.md` and `specs/gaps.md` from the intake bundle's
  bound set, or, better, bind them by the commit they were read at rather than by content digest,
  so that an owner ruling landing after the evaluation still visibly invalidates it while the
  evaluator's own record does not. The two exclusion lists in `review-evidence.mjs` and
  `prepare-intake-evidence.mjs` must stay identical, which is what `778b76e` established.
- **Blocks:** nothing substantive. `D-2026-0006` and `D-2026-0007` each carry a note pointing here
  so a reader checking their digests knows why two of 56 differ.

## G-2026-16 - EFMP-304's term length and week distribution are the spec's construction, not the guide's

- **Status:** open
- **Criterion:** `partition` (G0 intake / G1 unit-spec), calendar only. The unit partition itself
  **is** guide-determined and is approved separately under `D-2026-0015.2`; only the calendar is
  at issue here, exactly as `G-2026-13` was written.
- **Why this is not `G-2026-13` reopened.** `G-2026-13` asked whether a contract may require a
  section a guide cannot supply. The owner answered that in `D-2026-0012` by amending the
  contract, and that question is closed. But `D-2026-0012`'s own Decision text ends "**for an
  evaluator to approve or escalate**", and its Applied-in line says the schedule "conforms"
  without change, which settles the **form** and expressly leaves the **substance** to this gate.
  This entry is the second of the two dispositions that ruling reserved. Approving it would have
  meant asserting that the guide determines a sixteen-week term, and it does not.
- **Detail:** the EFMP-304 guide block
  (`Scheme-and-Course-guides/extracted-text/2nd 2026.txt:609-756`) carries a course description,
  six course outcomes, a six-unit topic outline, a reading list and a marks table. It carries
  **no week table of any kind**, and no statement of term length or contact hours. The revised
  board Scheme contains the word "week" **nowhere at all**.

  This silence is deliberate, not an extraction artefact. **The same guide file carries week
  tables for other courses**: EFMP-305 Inclusive Education is laid out week by week from
  `2nd 2026.txt:225` ("UNIT 1: Foundations of Inclusive Education(2 Weeks)", "Week-1 ...",
  "Week-2 ..."). The guide is able to express a calendar and does not do so for EFMP-304.

  `specs/content/efmp-304/content-spec.md:130-147` supplies one, correctly marked "Derived, not
  guide-given" and described as proportional to sub-topic count and technical density. It
  allocates a **16-week** term as 3/2/3/3/2/3 across Units 1 to 6, and each `## Unit N` subsection
  repeats its band on its first line (`:201`, `:332`, `:426`, `:525`, `:619`, `:719`).

  Two things are undetermined, not one. First, the **term length**: nothing in the 54 bound inputs
  states that an EFMP-304 term is sixteen weeks. Second, the **distribution**: the stated basis is
  "proportional to sub-topic count", but the allocation is not proportional to sub-topic count and
  the spec says so itself at `:146-147` - Unit 3 receives three weeks for four sub-topics while
  Unit 5 receives two for five. The work is therefore being done by "technical density", which is
  a pedagogical judgement, and the guide supplies no basis for it. The spec is candid that this is
  a judgement and asks for it to be escalated if the evaluator agrees. The evaluator agrees.
- **Needed, and from whom:** the curriculum owner, to state the term length EFMP-304 is taught
  over and either to confirm the proposed 3/2/3/3/2/3 distribution or supply another; or to direct
  that `## Week schedule` be recorded as guide-silent for this course, which `D-2026-0012` now
  expressly permits as the alternative.
- **Blocks:** `## Week schedule` and the "Weeks N-M" line opening each of the six `## Unit N`
  subsections. **Nothing else.** `D-2026-0015` and `D-2026-0016` are written to exclude the
  calendar, no gate parses it, and authoring does not depend on it. This does **not** hold
  `status: approved`.

## G-2026-17 - `D-2026-0013`'s open-access floor is binding on paper and enforced by nothing

- **Status:** **resolved** (developer fix, 2026-09-20)
- **Fix:** `scripts/check-source-floor.mjs`, wired into `CONTENT_GATES` and CI. A course declares
  `open_access_floor` in its content-spec front matter; the gate counts rows in each unit's
  `sources/unit-NN.md` that name a registry (Crossref, OpenAlex, ERIC, DOAJ, ...) **and** carry an
  ISO date in the same row, and fails below the floor. EFMP-304 now declares `D-2026-0013`'s
  numbers: 2 for Units 1-3, 1 for Units 4-6. Opt-in, so courses with adequate guide reading lists
  are unaffected.
- **Both halves of the token are required, deliberately.** A registry name with no date is
  unfalsifiable; a date with no registry says nothing about what was checked. Seven fixture tests
  pin that, plus the missing-file and no-floor cases - without them "the gate passes" would prove
  nothing, since it is vacuous on the real tree until EFMP-304 has authored units.
- **What it does not do:** it proves an author looked something up, not that the source supports
  the sentence citing it. Only a reviewer establishes that. This is a floor, not a substitute for
  G3 - which matters more now that Art. VII.7(a) publishes before review.
- **Criterion:** `readings` (enforcement, not presence). The criterion itself **passes**: the
  guide's list is present at `2nd 2026.txt:720-741` and all seven entries resolve to real works.
  Whether that list is *usable* was escalated as `G-2026-14` and settled by the owner in
  `D-2026-0013`. **This entry does not reopen that ruling.** It reports that the mitigation the
  ruling rests on has no mechanism behind it.
- **Detail:** `D-2026-0013` accepted a print-only reading list on an explicit condition: at least
  two verified open-access sources bound per unit for Units 1 to 3 and at least one for Units 4 to
  6, "resolved through a named registry and recorded with the date of verification". Its own Basis
  says Units 1 to 3 need "a named list of critical-thinking standards and a formal definition of
  validity, which title-level support cannot carry". The floor is therefore the whole reason the
  ruling is safe. Three findings, each verified against the bound inputs:

  1. **No gate counts open-access sources.** `grep -rn "open-access-substitute" scripts/` returns
     **zero matches**. The `Kind` vocabulary is defined in
     `specs/007-content-depth-standard/contracts/sources-consulted.md` and parsed into `keyKind` at
     `scripts/lib/unit-depth.mjs:224-229` and `:451-454`, but only the value
     `no-external-source` is ever branched on. Nothing anywhere counts rows per unit, so
     "at least two" and "at least one" are enforced by no deterministic check.
  2. **The record the floor demands has nowhere to go.** `content-spec.md:119-121` requires the
     registry and the date of verification to be recorded in `sources/unit-NN.md`. That file's
     contract defines exactly five columns, `Key | Citation | URL/DOI | Supports | Kind`, and has
     **no column for a registry and none for a verification date**. A search of the depth-gate
     scripts and both content-spec contracts for "verification date", "date of verification",
     "verified on" or "registry" returns nothing. An author complying in full has no conformant
     place to put the evidence, and an auditor has no field to read it from.
  3. **The reader who would have caught it has been removed.** Constitution v5.0.0 Art. VII.7(a)
     publishes a unit on deterministic gates with **no reviewer having read it**, and
     `D-2026-0014` supplies the standing authorisation naming the 15 catalogued courses. EFMP-304
     is one of them (14 semester courses plus 1 track course in `catalog/courses.json`). The
     style guide is explicit that whether an `open-access-substitute` is genuinely on-topic is
     **human Content gate only**. On this course's actual publication path there is no human
     Content gate before readers.

  Taken together: a unit could be authored from the seven unopened monographs alone, bind zero
  open-access sources, pass every deterministic gate, and publish under the "Draft - expert review
  pending" notice, with the breach of `D-2026-0013` invisible to every mechanism in the
  repository. `D-2026-0014` already records the owner accepting that gates prove shape and not
  truth; this entry reports that for **this** course the accepted residual risk is larger than the
  ruling that created it assumed, because the compensating control does not exist.
- **Needed, and from whom:** the curriculum owner, to choose one of:
  (a) instrument the floor - add a per-unit minimum count of `open-access-substitute` rows to
  `scripts/check-unit-depth.mjs`, and add registry and verification-date columns to the
  sources-consulted contract, so `D-2026-0013` becomes checkable;
  (b) require a human read of EFMP-304 Units 1 to 3 before they leave the gate-checked tier,
  narrowing `D-2026-0014` for this course only; or
  (c) record that the floor is advisory, which would mean `D-2026-0013`'s Basis no longer holds
  and `G-2026-14` needs deciding again on different grounds.
- **Blocks:** **nothing at G0/G1, and not authoring.** The spec faithfully expresses the ruling it
  was given; the defect is in the instrumentation, not the derivation, so it is not a reason to
  withhold `status: approved`. It is recorded as a condition the owner should close **before any
  EFMP-304 unit is published** under `D-2026-0014`.

## G-2026-18 - An EFMP-304 decision entry invalidates EFMP-302's review evidence

- **Status:** **resolved** (developer fix, 2026-09-20)
- **Fix:** `specs/decisions/log.md` leaves the freshness-bearing manifest, and reports bind the
  **entries they cite** instead, through a new optional `rulings: {code: digest}` field that
  `validateReport` verifies with `rulingDigest()`.
- **Strictly stronger than what it replaces.** The whole-file digest proved a reviewer held *some*
  version of the register but never that the ruling it relied on was the one it read. Now a
  changed cited ruling invalidates the reports that rested on it, and an unrelated new entry
  touches nothing. Verified both directions in `tests/review/evidence.test.mjs`, and against the
  live case: appending a decision no longer moves EFMP-302's five gate-checked units.
- **Note:** this is the second half of the change `G-2026-15` began. The plan recorded that the
  two halves had to ship together or not at all; they were split, and this gap is what that cost -
  an EFMP-304 intake decision turned CI red across a different course.
- **Criterion:** none. This is a defect in the evidence-binding machinery, raised against the
  tool, in the manner `G-2026-12` and `G-2026-15` were. It does not affect any verdict in
  `D-2026-0015` or `D-2026-0016`.
- **Detail:** measured on this run. Before recording anything, `npm run check:pipeline-gate`
  exited **0** ("2 certified, 5 gate-checked"). Immediately after appending `D-2026-0015` and
  `D-2026-0016` to `specs/decisions/log.md`, the same command exits **1** with five findings:

  ```
  - EFMP-302 Unit 2 .. Unit 6: G2 en-draft: stale or incomplete input manifest
  ```

  The cause is `manifestRoots()` in `scripts/lib/review-evidence.mjs`, which binds
  `specs/decisions/log.md` for G3/G5 by **whole-file content digest**. That binding is deliberate
  and the comment beside it gives good reasons: owner rulings decide review outcomes, so a new
  ruling should re-open a review that rested on the old state. `G-2026-15` unbound the two
  registers for the **intake** bundle only, so that an evaluator's approval no longer voids its
  own manifest. It did not, and was not meant to, address the cross-course case.

  The consequence is that an EFMP-304-scoped entry invalidates the evidence of five **EFMP-302**
  units that are already published in the Art. VII.7(a) gate-checked tier, for a ruling that
  cannot possibly bear on them. This is the same blast-radius problem ADR-0027 already solved once
  for `content-spec.md`, where `sliceSpec()` replaces other units' sections with a placeholder so
  that editing Unit 6 does not invalidate Unit 3. The decision log has no equivalent slicing, so
  every entry is global.

  Left unaddressed, the effect is that CI goes red after every recorded decision and the five
  EFMP-302 units need their G2 evidence regenerated each time, which trains whoever is on the
  other end to regenerate evidence reflexively rather than ask what changed. That is the exact
  habit the binding exists to prevent.
- **Needed, and from whom:** a developer, to narrow the binding rather than remove it. Options,
  in preference order: (a) bind the decision log by the **commit** it was read at rather than by
  content digest, which is the fix `G-2026-15` already suggested and which keeps a later ruling
  visibly invalidating an earlier acceptance; (b) slice the log the way `sliceSpec()` slices the
  content-spec, so a review binds only the entries whose Scope names its course plus every
  corpus-wide entry; (c) leave it and accept the churn, recorded as a deliberate choice.
- **Blocks:** nothing in this evaluation. Reported because `check:pipeline-gate` is now red on
  `provisional-review-publication-tier` as a direct and expected result of recording these two
  decisions, and a reader who does not know why would reasonably read it as an EFMP-302 defect.

## G-2026-19 - Translating a unit invalidates its English review evidence

- **Found:** 2026-09-20, translating EFMP-302 Unit 2 into Urdu (the ADR-0022 rate probe).
- **What happened:** the G4 translation added 16 `.ur.svg` / `.ur.dark.svg` files. `manifestRoots`
  in `scripts/lib/review-evidence.mjs` binds `static/img/figures/<course>/<unit>` as a whole
  directory at **every** stage, so Unit 2's English G3 input manifest went from 103 bound files to
  119. Nothing changed and nothing was removed: 16 were added, and not one of them is an input an
  English review evaluates. `check:pipeline-gate` correctly reported both the G2 gate evidence and
  the G3 review report as stale, and Unit 2's provisional tier was revoked under Art. VII.4 hours
  after it was granted.
- **Why it matters beyond this unit:** this is not review history, it is scope. Under the current
  binding, **English review and Urdu translation are mutually exclusive for every unit in the
  corpus**: any unit that is translated loses its English certification at that moment, and
  re-review costs a cycle against ADR-0019's limit of two. Roughly 200 units are due translation
  under ADR-0022, so the corpus cannot reach a state where both hold. It is also the second
  revocation by a scope mechanism in one day (Unit 3 was the first, via an amended `g3.md`), which
  is the pattern ADR-0027 was written to stop.
- **Direct precedent for the fix:** ADR-0027 already narrowed three roots in this same function
  for this same reason, and the closest one is exact. `terminology.csv` is now bound for G4/G5
  only, and the recorded reason is that "`CRITERIA.G3` has no terminology criterion, so banking one
  Urdu term invalidated ~90 English units for a criterion their reviews never evaluated." The
  identical argument applies here: `CRITERIA.G3` has no Urdu-figure criterion.
- **Needed, and from whom:** a developer, to narrow rather than remove. Options in preference
  order: (a) bind `<figId>.svg` and `<figId>.dark.svg` at all stages but `<figId>.ur.svg` and
  `<figId>.ur.dark.svg` at G4/G5 only, mirroring the `terminology.csv` treatment exactly;
  (b) slice the figure directory the way `sliceSpec()` slices the content-spec; (c) leave it and
  accept that a translated unit must always be re-reviewed in English, recorded as a deliberate
  choice with its cycle cost acknowledged.
- **Deliberately not fixed here.** The session that produced the translation is the session that
  would benefit from the rule change, and re-validating one's own just-invalidated review by
  editing the evidence layer is the move the independence rules exist to prevent. Restoring green
  was done the rules-following way instead: G2 evidence regenerated, G3 tier revoked.
- **Independent assessment, 2026-09-20** (Antigravity, gemini-3.1-pro-high, agy conversation
  `4601a7a4`, asked adversarially and explicitly told that "do not narrow" was an acceptable
  answer). It **rejected option (a)** and proposed a better fix. All four of its load-bearing
  claims were checked against the repository and hold:
  - **The proposal's central factual claim is false.** `CRITERIA.G3` *does* contain a criterion
    that can rest on an Urdu figure: `g3.md:49-51` requires the reviewer to "check that a learner
    can recover each figure's instructional meaning" and to "record inspected render artifacts".
    Nothing in `check-figures.mjs` forbids an English carrier from pointing its `src` at a
    `.ur.svg`, so if one ever did, option (a) would unbind the very asset the G3 accessibility
    review inspected. That is a blind spot, not a saving.
  - **The ADR-0027 analogy is stretched.** `terminology.csv` was narrowed largely because one
    shared file invalidated ~90 units across the corpus. Figure assets are already unit-scoped,
    so the blast radius here is one unit and the precedent's main justification does not carry.
  - **Better option (d), with its own precedent in the same ADR.** ADR-0027 line 44 already
    establishes "`sources/texts/<key>.md` binds to a unit iff that unit cites `<key>`", and the
    machinery exists: `inScope()` takes `citedKeys` and `citedKeysFor()` is wired at
    `review-evidence.mjs:275`. Apply the identical rule to figures: **bind a figure asset iff the
    unit actually references it.** An unreferenced `.ur.svg` then stops invalidating the English
    review, while any figure a unit does render stays bound at every stage. This fixes the cycle
    cost without opening the blind spot.
- **Recommended:** option (d), not (a). Option (a) as originally written should not be adopted.
- **Resolved 2026-09-20** in `fac210b`, as option (d) **narrowed**. An Urdu figure variant now
  binds iff the stage's own locale renders it: G3 reads the English unit, G4/G5 read English and
  Urdu, and a rendered `x.svg` also binds the `x.dark.svg` that `Figure.tsx` derives. The
  assessment's general form ("bind a figure iff the unit cites it") was deliberately restricted to
  Urdu variants, because the error directions are not symmetric - over-binding costs a review
  cycle, under-binding is a blind spot, and a reference-extraction regex that misses a carrier
  under-binds silently. A stray or unreferenced **English** asset therefore still invalidates.
  The assessment's own objection is closed by construction: a `.ur.svg` an English carrier renders
  is bound at G3. Five tests; two fail against the old code and pin the change, three guard
  behaviour that must not move.
- **Known consequence, not worked around.** `review-evidence.mjs` is itself a bound input via
  `reviewScripts()`, so the fix invalidated every manifest computed under the old rule (Art. VI.1).
  EFMP-302 Units 2-6 had their deterministic G2 evidence regenerated. **Unit 2's cycle-2 G3 report
  is also invalidated** and cannot simply be re-accepted: its bound file set now matches exactly
  (0 added, 0 removed) and only this script's digest differs, but restoring the provisional tier
  needs a third review cycle, which ADR-0019 reserves to the owner. Unit 2 stays `gated`.
- **Blocks:** Unit 2's provisional tier, and the same for every unit translated hereafter.
