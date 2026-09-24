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

- **Status:** **resolved** (owner decision, 2026-09-20)
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
- **Decision (2026-09-20):** the owner confirmed the spec as written. EFMP-304 is taught over a
  **16-week** term, distributed **3/2/3/3/2/3** across Units 1 to 6. The "Weeks N-M" line opening
  each `## Unit N` subsection and the `## Week schedule` table are therefore confirmed, not
  guide-given, and the derivation basis the spec itself states ("proportional to sub-topic count
  and technical density") stands as the pedagogical judgement. The distribution is retained as
  authored: Unit 3 carries the fewest sub-topics and the most weeks on purpose (four guide
  bullets on deductive and inductive form are denser per bullet than anything else in the
  course), and Unit 3's band was the very disproportion the evaluator flagged - it is confirmed
  deliberately, not in error.
- **Blocks:** ~~`## Week schedule` and the "Weeks N-M" line opening each of the six `## Unit N`
  subsections.~~ **Unblocked by the decision above.**

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

---

## G-2026-20 - EED-313 intake: the four-unit partition drops the guide's Unit 5

- **Status:** **resolved** (owner decision, 2026-09-20)
- **Gate:** G0 intake (partition criterion)
- **Source:** `D-2026-0018`
- **Question:** The course guide numbers **five** units
  (`ClassroomMgmt_Sept13.txt:94-102` TOC, `:167`/`:192`/`:206`/`:218`/`:244` body): Unit 1
  Learning theories and classroom management; Unit 2 Curriculum and classroom management; Unit 3
  Routines, schedules, and time management in diverse classrooms; Unit 4 Creating shared values and
  community; **Unit 5 Course review** (`:244-248`, "How can I use what I have learnt to create the
  classroom I want?", peer critique and review of final projects, summary and close). The spec
  originally partitioned into **four** units (`content-spec.md:76-337`), dropping Unit 5.
- **Decision (2026-09-20):** add Unit 5 back and follow the guide's five numbered units. Unit 5 is
  carried as a review/synthesis capstone (Week 16): peer critique and review of the classroom
  management plans built across Units 1 to 4, plus summary and close. This makes the partition
  guide-determined. The course is now 16 weeks as 4/4/3/4/1 across Units 1 to 5.
- **Blocks:** ~~the `partition` criterion of `D-2026-0018`~~ **unblocked**.

---

## G-2026-21 - EED-313 intake: four of six guide-suggested resources are missing from the reading list

- **Status:** **resolved** (owner decision, 2026-09-20)
- **Gate:** G0 intake (readings criterion)
- **Source:** `D-2026-0018`
- **Question:** The guide lists **six** suggested resources
  (`ClassroomMgmt_Sept13.txt:250-274`): Canter; Evertson & Poole; Evertson & Emmer 2009; Henley
  2009; Marzano, Marzano & Pickering 2003; Vincent. The spec's reading list originally carried
  three (Canter, Evertson & Poole, Wong & Wong) and omitted Evertson & Emmer, Henley, Marzano and
  Vincent.
- **Decision (2026-09-20):** add all four omitted sources. The spec's reading list now carries all
  six guide-suggested resources plus Wong & Wong (drawn from the guide's in-session reading).
  Unretrievable print monographs bind the author to title-level support at point of use under
  `D-2026-0001`; no full-text access is required at G1.
- **Blocks:** ~~the `readings` criterion of `D-2026-0018`~~ **unblocked**.

---

## G-2026-22 - GNAS-301 intake: the six-unit partition is the spec's construction over a guide that gives only a week table

- **Status:** **resolved** (owner decision, 2026-09-23)
- **Gate:** G0 intake / G1 unit-spec (partition criterion)
- **Source:** `D-2026-0020`
- **Detail:** The GNAS-301 guide block (`Scheme-and-Course-guides/extracted-text/1st 2026.txt:143-366`)
  numbers its topical outline under explicit week headings only: Week 1 (`:195`) through Week 16
  (`:315`), sub-topics 1.1 to 16.2, with the mid-term at 7.1 (`:252`) and the final term at 16.2
  (`:318`). It carries **no unit headings of any kind**. The spec records the calendar as
  guide-given and derives a six-unit partition (Weeks 1-2 -> Unit 1, 3-4 -> Unit 2, 5-6 -> Unit 3,
  8-10 -> Unit 4, 11-12 -> Unit 5, 13-16 -> Unit 6), clearly labelled as derived per
  `D-2026-0012` with its basis stated (contiguous whole weeks; the mid-term divides the pre- and
  post-mid halves; boundaries where the guide's topics change character).

  What the guide **does** determine, and what the evaluator verified mechanically: the 16-week
  calendar, the mid-term and final placement, and the partition's structural properties -
  contiguous whole weeks, no guide topic reordered, no week split across units, the mid-term week
  excluded from teaching units, and 16.1 taught in the examination week per the guide's own
  placement (it is a teaching sub-topic the guide lists under Week 16, before the final
  examination entry).

  What the guide does **not** determine: the number of units (six) and the block boundaries. The
  guide gives no unit grouping, so any contiguous merge - three units, six, one per teaching week -
  is equally consistent with it. The spec's stated basis ("block boundaries fall where the guide's
  own topics change character") is a pedagogical judgement. `D-2026-0012` permits the section to
  be recorded as derived and labelled; it expressly leaves the substance "for an evaluator to
  approve or escalate", and the partition criterion's own text for week-table-only guides is that
  the partition is a judgement the guide does not determine. The spec anticipates this and asks
  for the finding ("if the evaluator judges a different merge better serves the guide's grouping,
  that is a G0/G1 finding to apply before authoring").
- **Needed, and from whom:** the curriculum owner, to confirm the six-block merge (2/2/2/3/2/4
  teaching weeks across Units 1 to 6) or supply another partition, in the manner `G-2026-16`
  settled EFMP-304's calendar. The week calendar itself needs no decision: it is guide-given.
- **Decision (2026-09-23):** the owner **confirmed the six-unit partition exactly as derived**:
  teaching weeks 2/2/2/3/2/4 across Units 1 to 6 (Weeks 1-2 -> Unit 1, 3-4 -> Unit 2, 5-6 ->
  Unit 3, 8-10 -> Unit 4, 11-12 -> Unit 5, 13-16 -> Unit 6). The partition is now
  owner-determined on the guide's week calendar, in the manner `G-2026-16` settled EFMP-304's.
- **Blocks:** ~~the `partition` criterion of `D-2026-0020`~~ **unblocked**. The "Weeks N-M" line
  opening each of the six `## Unit N` subsections stands as confirmed.

## G-2026-23 - GNAS-301's guide reading list: five of seven entries do not resolve as printed, and the spec's open-access floor is neither owner-adopted nor enforced

- **Status:** **resolved** (owner decision, 2026-09-23)
- **Gate:** G0 intake (readings criterion)
- **Source:** `D-2026-0020`
- **Detail:** The guide lists seven recommended books (`1st 2026.txt:352-366`). The spec
  transcribes all seven and files each as verified real or flagged. The evaluator verified each
  entry independently against Open Library on 2026-09-23 (an external registry, not a bound
  input):

  | Guide entry | Verification |
  |---|---|
  | *Planetary Health*, A. Haines and H. Frumkin | **resolves**: *Planetary Health*, Island Press; 1st ed. 2020 (Myers & Frumkin), 2nd ed. 2023 (Frumkin & Haines) - the guide's pair matches the second edition, as the spec records |
  | *Occupational Health*, J. M. Harrington / F. S. Gill | **resolves**: *Occupational health*, Harrington & Gill, Blackwell Scientific, 1983 |
  | *Oxford Textbook of Environmental Science, Vol. I & II*, W. W. Holland | does not resolve as printed; Holland's real multi-volume Oxford textbook is the *Oxford Textbook of Public Health* (with R. Detels, OUP, 1984-1997), confirming the spec's identification |
  | *Textbook of Preventive of Pollution*, J. E. Park, K. Park | does not resolve as printed; the closest real work is *Park's Textbook of Preventive and Social Medicine* (J. E. Park, Banarsidas Bhanot, 1970 onward), confirming the spec's identification |
  | *Environmental Science in South East Asia*, W. O. Phoon, P. C. Y. Chen | does not resolve as printed; W. O. Phoon is a real Singapore-based occupational-health author (*Occupational health in developing countries in Asia*, SEAMIC, 1985); the exact title with Chen is not locatable, confirming the spec's reading |
  | *Environmental Health Practice*, R. S. F. Shilling | not resolvable from this host either way: Open Library holds no Shilling records at all and web search returned nothing; the spec's identification (his real standard work is *Occupational Health Practice*) is consistent with the claim but unverified from here |
  | *Environmental Studies*, Clark and Henderson | does not resolve as printed: no Clark/Henderson environmental-studies textbook in Open Library's title matches set; a web-search candidate (*Environmental Studies: Critical Approaches*, Broadview Press) could not be verified on Open Library or at the publisher and is recorded here only as an unverified lead |

  So the spec's reading of its reading list is confirmed in substance: **two of seven verified
  real, five unresolvable as printed** and flagged per `D-2026-0001` with title-level support
  only. All seven are print monographs; none carries a DOI. Units 2 and 3 map only flagged
  sources, so some units have no verified-real guide reading at all.

  Three things need an owner decision, none of which the guide determines:

  1. **Usability.** This is the `G-2026-14` question again, on weaker ground: EFMP-304's seven
     entries all resolved to real works and only access was the problem; here five of seven do
     not resolve as printed. `D-2026-0013` settled EFMP-304's usability, and its Limits state it
     "does not set a corpus-wide floor, though it is the obvious precedent for any other course
     whose guide list is print-only". Whether GNAS-301 authors against this list as it stands is
     the owner's call.
  2. **The floor.** The spec sets a binding G2 requirement of at least two verifiable
     open-access sources per unit for **all six units** (stronger than EFMP-304's 2/2/2/1/1/1),
     resolved through a named registry and recorded with the date of verification, with an
     escalation path if a unit cannot meet it. The design follows the EFMP-304 precedent and,
     like that precedent, needs adoption: an evaluator approving it as binding would be
     extending `D-2026-0013`'s scope, which Art. VII.8.2 reserves.
  3. **Enforcement.** The floor is **not declared in `open_access_floor` front matter**, so
     `check:source-floor` - the `G-2026-17` fix built for exactly this - does not check GNAS-301
     at all. Verified on this run: the gate's only finding is GENG-300's; GNAS-301 is invisible
     to it. The spec's "binding requirement" is currently enforced by nothing. The fix is known
     and cheap (declare the floor in front matter in the form the gate reads, as EFMP-304 and
     GENG-300 already do), but wiring it should follow the owner's adoption decision, and the
     declaration is the author's action, not the evaluator's.
- **Needed, and from whom:** the curriculum owner, to (a) confirm the five flags and the
  closest-real-work identifications, or supply the real works the guide means (in particular for
  "Environmental Studies - Clark and Henderson" and "Environmental Health Practice - Shilling");
  (b) adopt the two-per-unit open-access floor for GNAS-301, adopt it with different numbers, or
  decline it; and (c) direct that the adopted floor be declared in `open_access_floor` front
  matter so `check:source-floor` enforces it.
- **Decision (2026-09-23):** the owner **confirmed all three items as the spec proposed them**:
  (a) the five `D-2026-0001` flags and the closest-real-work identifications are confirmed, and
  use of the verified open-access replacement source set (12 sources, listed in the spec's
  `### Curated-supplementary` table) is confirmed; (b) the two-verifiable-open-access-sources-
  per-unit floor is **adopted** for all six units, recorded as `D-2026-0021` on the
  `D-2026-0013` precedent; and (c) the adopted floor is declared in the content-spec's
  `open_access_floor` front matter so `check:source-floor` enforces it.
- **Blocks:** ~~the `readings` criterion of `D-2026-0020`; the `### Curated-supplementary`
  section's empty-with-floor posture~~ **unblocked**. The `**Mapped readings**` lines of all six
  units stand on the adopted floor.

---

## G-2026-24 - GNAS-301 Unit 1 G3: two advisory cycles consumed; the third is owner-gated

- **Status:** open
- **Gate:** G3 (English review), ADR-0019 two-cycle limit
- **Source:** GNAS-301 authoring session, 2026-09-23
- **Question:** Unit 1's G3 review has run two advisory cycles. Round 1
  (reviews/unit-01/G3/20260923T205300Z-g3-attempt-01.json) returned revise with 4 blocking
  findings; all were repaired. Round 2
  (reviews/unit-01/G3/round-02/20260923T214406Z-g3-attempt-02.json) verified all four
  repairs and returned revise with a single blocking finding, an excerpt-completeness gap
  in sources/texts/abbas2012.md, which the author repaired immediately after the report
  (commit "apply Unit 1 G3 round-2 repairs"). ADR-0019 reserves further review cycles to
  the owner after two.
- **Needed, and from whom:** the curriculum owner, to either accept the repaired state on
  the existing two advisory reports or authorise a third G3 cycle for Unit 1. The unit's
  G2 gates are green at the current commit; the G3 tracker row remains open either way.
- **Blocks:** a third G3 cycle for Unit 1; nothing else. G4 translation of Unit 1 may
  proceed on the gate-checked English (the G5 reviewer binds to the latest G3 report).

---

## G-2026-31 - GNAS-301 Unit 4 G3: two advisory cycles consumed; the third is owner-gated

- **Status:** open
- **Gate:** G3 (English review), ADR-0019 two-cycle limit
- **Source:** GNAS-301 authoring session, 2026-09-24
- **Question:** Unit 4 G3 ran two advisory cycles. Round 1 (reviews/unit-04/G3/agent-g3-gnas301-u4-run001.json) returned revise with 4 blocking findings. Round 2 (reviews/unit-04/G3/round-02/agent-g3-gnas301-u4-run002.json) verified the quotation rework and source declarations but returned revise with 2 remaining blocking findings: phantom abbasi2022 support for U4-08/U4-09 and phantom who-mental-health-work for U4-10. The author applied these repairs post-report (commit applying Unit 4 G3 round-2 repairs). ADR-0019 reserves further cycles to the owner after two.
- **Needed, and from whom:** the curriculum owner, to accept the repaired state on the two advisory reports or authorise a third G3 cycle for Unit 4.
- **Blocks:** a third G3 cycle for Unit 4; nothing else.

---

## G-2026-32 - GNAS-301 Unit 5 G3: two advisory cycles consumed; the third is owner-gated

- **Status:** open
- **Gate:** G3 (English review), ADR-0019 two-cycle limit
- **Source:** GNAS-301 authoring session, 2026-09-24
- **Question:** Unit 5 G3 ran two advisory cycles. Round 1 (reviews/unit-05/G3/20260924T001055Z-g3-attempt-01.json) returned revise with 4 blocking findings. Round 2 (reviews/unit-05/G3/round-02/agent-g3-gnas301-u5-run002.json) found most round-1 repairs had not actually been committed and returned revise with 5 blocking findings: the 5.1 RRQ deficit, the PM2.5 bloodstream claims beyond what the WHO 2024 fact sheet supports, the fig-U5-3 connector arrows (and the untouched .ur.svg geometry), the coverage-matrix U5-07/U5-06 cells, and the incomplete alibhatti2017 author list. The author applied the full repair set post-report (commit applying the remaining Units 5-6 G3 round-2 repairs), and the G2 evidence was regenerated at the repaired commit. ADR-0019 reserves further cycles to the owner after two.
- **Needed, and from whom:** the curriculum owner, to accept the repaired state on the two advisory reports or authorise a third G3 cycle for Unit 5.
- **Blocks:** a third G3 cycle for Unit 5; nothing else.

---

## G-2026-33 - GNAS-301 Unit 6 G3: two advisory cycles consumed; the third is owner-gated

- **Status:** open
- **Gate:** G3 (English review), ADR-0019 two-cycle limit
- **Source:** GNAS-301 authoring session, 2026-09-24
- **Question:** Unit 6 G3 ran two advisory cycles. Round 1 (reviews/unit-06/G3/agent-g3-gnas301-u6-run001.json) returned revise with 4 blocking findings. Round 2 (reviews/unit-06/G3/round-02/agent-g3-gnas301-u6-run002.json) found the ERQ-04 rewrite and the RRQ-08 re-key had not actually been committed and returned revise with 4 blocking findings: ERQ-04 still covering only 6.4, the RRQ/MCQ surplus distribution off the blueprint, the misattributed WHO framing in topic-06, and the anwar2026 excerpt's verification claim. The author applied the full repair set post-report (commit applying the remaining Units 5-6 G3 round-2 repairs), and the G2 evidence was regenerated at the repaired commit. ADR-0019 reserves further cycles to the owner after two.
- **Needed, and from whom:** the curriculum owner, to accept the repaired state on the two advisory reports or authorise a third G3 cycle for Unit 6.
- **Blocks:** a third G3 cycle for Unit 6; nothing else.

---

## G-2026-34 - GNAS-301 Unit 2 G5: stale G3 dependency after post-pass advisory applications

- **Status:** open
- **Gate:** G5 (Urdu review), English dependency rule (G5 rubric); ADR-0019 advisory regime
- **Source:** GNAS-301 G5 round 1, 2026-09-24 (reviews/unit-02/G5/agent-g5-gnas301-u2-run001.json)
- **Question:** Unit 2's G3 round 2 returned PASS (2026-09-23T22:06Z), after which the
  round-2 advisories were applied (commit f514923, 22:13Z: linkified URLs, a softened
  topic-01 claim onto the bound excerpt, the park-park declaration). The G5 rubric requires
  accepted G3 evidence for the exact English inputs bound to the review, so the changed
  English digests invalidate the dependency even though the changes were the G3 reviewer's
  own advisories. The G5 round 1 therefore escalated (6 blocking, 12 advisory). The Urdu
  content defects it found are repaired at the current commit; the render-blocking MDX
  errors (unit-02 PrintOut import, unit-06 </Gloss>) are fixed so future renders work.
- **Needed, and from whom:** the curriculum owner, to either accept the advisory-applied
  English state (the delta is the G3 round-2 report's own advisory list, applied verbatim)
  or authorise a fresh G3 round binding the current bytes; a G5 round 2 then re-runs with
  working renders. The same dependency question applies to Units 1, 4, 5 and 6, whose
  post-report repairs are already recorded as G-2026-24, G-2026-31, G-2026-32 and
  G-2026-33.
- **Blocks:** G5 acceptance for Unit 2 (and, by the same rule, the other units); nothing
  else. G4 translation and the Urdu-side G5 findings stand on their own evidence.

---

## G-2026-25 - GICT-300's term length and week distribution are the spec's construction, not the guide's

- **Status:** open
- **Gate:** G0 intake / G1 unit-spec (partition criterion, calendar only)
- **Source:** `D-2026-0030`
- **Question:** The GICT-300 guide block (`Scheme-and-Course-guides/extracted-text/1st 2026.txt:374-538`)
  carries a course description, eight learning outcomes, an explicit six-unit course outline, a
  "Teaching / Instructional Strategies" list, a "Practical Work" list and a "Recommended Books /
  References" list. It carries **no week table of any kind**, and no statement of term length or
  of how contact hours distribute across the term. The revised board Scheme contains the word
  "week" nowhere at all (verified: 0 matches in `B.Ed 4 Year 2026 revised after board.txt`). The
  same guide file carries no week table for the other Semester I courses either (GENG-300,
  `D-2026-0012`'s basis), so the silence is the guide's posture, not an extraction artefact.

  `specs/content/gict-300/content-spec.md:67-82` supplies a schedule, correctly marked "Derived,
  not guide-given" with its basis stated (the 3 (2-1) credit-hour split, a 16-week semester, and
  the relative weight of each guide unit "as judged by sub-topic count and cognitive demand") -
  the form `D-2026-0012` permits and reserves to this gate. It allocates a **16-week** term as
  **3/3/2/3/2/3** across Units 1 to 6, and each `## Unit N` subsection repeats its band on its
  first line (`:86`, `:147`, `:208`, `:267`, `:325`, `:377`).

  Two things are undetermined, not one. First, the **term length**: nothing in the 54 bound
  inputs states that a GICT-300 term is sixteen weeks. Second, the **distribution**: the stated
  basis is sub-topic count and cognitive demand, but the allocation is not proportional to
  sub-topic count (Unit 6 carries 7 sub-topics in 3 weeks while Unit 3 carries 4 in 2 and Unit 5
  carries 4 in 2; per-sub-topic weight varies from 0.43 to 0.6), so the work is done by a
  pedagogical judgement the guide supplies no basis for. The spec is candid that this is a
  judgement, and `D-2026-0012` expressly leaves the disposition to the evaluator; the evaluator
  escalates, exactly as `G-2026-16` did for EFMP-304.

  The owner has confirmed 16-week calendars for two courses individually (EFMP-304 in the
  `G-2026-16` decision; EED-313 in `G-2026-20`), but neither ruling sets a corpus-wide term
  length, so GICT-300's calendar still needs its own confirmation.
- **Needed, and from whom:** the curriculum owner, to state the term length GICT-300 is taught
  over and either to confirm the proposed 3/3/2/3/2/3 distribution or supply another; or to
  direct that `## Week schedule` be recorded as guide-silent for this course, which
  `D-2026-0012` expressly permits as the alternative.
- **Blocks:** the `## Week schedule` table and the "Weeks N-M (derived)" line opening each of the
  six `## Unit N` subsections. Nothing else: `D-2026-0030` is written to exclude the calendar,
  authoring does not depend on it, and no gate reads it.

## G-2026-26 - GICT-300 review cycles closed at the two-cycle budget with post-cycle repairs applied

- **Status:** open
- **Gate:** G3 en-review / G5 ur-review (advisory, ADR-0019)
- **Source:** 020-author-gict-300
- **Question:** The GICT-300 authoring feature's instructions cap each review stage at two
  cycles per unit, then escalate. Three units have reached that cap with repairs applied
  AFTER the second cycle, leaving those repairs verified only by the author:

  - **Unit 3 (G3):** run 001 revise (F1 sources-chain) -> repaired at a7200d2 -> run 002
    revise (F5 an ostep misquotation introduced by the repair; F6 buffer/spooling and
    metadata sub-claims) -> repaired at 90b097a (verbatim quote restored, ch 39 metadata
    passage bound, buffer/spooling disclosed as title-level). The run-002 repairs are
    mechanical but no third G3 cycle remains in budget.
  - **Unit 4 (G3):** run 001 revise (5 findings) -> repaired at a7200d2 -> run 002 revise
    (B1 an 11-character password labelled "twelve"; B2 a sources-preamble overclaim) ->
    repaired at aa2e7d0. Same posture.
  - **Unit 1 (G5):** run 001 escalated solely because its G3 run 001 pre-dated the
    English repairs; the G3 run 002 now passes over the current bytes, but no G5 run 002
    was run within budget (the shared sources/texts/bourgeois2019.md excerpt is bound by
    every unit's manifest, so each unit's repair stales every other unit's evidence and a
    fully-fresh chain would need more cycles than the budget allows).

  Every G5 run-001 Urdu finding across Units 1-4 has been repaired and committed. The
  reviews are advisory; nothing is certified and no tracker row was marked done. The
  question for the owner: accept the repaired state as the terminal state for this
  feature's advisory evidence, or commission further review cycles (and, if the latter,
  whether the shared-excerpt binding in `scripts/lib/review-evidence.mjs`'s citedKeys
  derivation - which also leaves the year-less keys `ostep` and `wipoIP` unbound, flagged
  by the Unit 3 and Unit 5 G3 run-002 reviewers - should be extended so a single-unit
  repair stops invalidating every unit's evidence).
- **Needed from:** curriculum owner (review-policy decision); developer (the tooling
  question, only if the owner wants the binding extended).
## G-2026-28 - GQUR-300 reading list: one guide-required entry unresolvable, one deferred with unverified additions, one false locator

- **Status:** **resolved** (owner ruling, relayed via the orchestrator session, 2026-09-23)
- **Gate:** G0 intake (readings criterion)
- **Source:** `D-2026-0040`
- **Criterion:** `readings` (G0 intake).
- **Detail:** The guide lists four readings at `Scheme-and-Course-guides/extracted-text/1st
  2026.txt:651-656`: Steen; Grawe; National Curriculum for Mathematics (Pakistan); HEC National
  Professional Standards for Teachers. The spec reproduces all four in `### Guide-required`
  (`specs/content/gqur-300/content-spec.md:70-77`). Presence is not in question; resolvability is:

  1. **`grawe` does not resolve from this host.** "Grawe, N. *Quantitative Literacy: Reasoning
     about Data.* Cognella Academic Publishing." Nathan D. Grawe is a real quantitative-literacy
     author (ERIC EJ981327, 2012, *Liberal Education*/AAC&U), but the specific title is absent
     from every registry reachable on 2026-09-23: Open Library's author search returns eight
     Grawe works and not this one; the Internet Archive has no record; ERIC has none; Cognella's
     own site answers HTTP 403 to this host. The spec marks it "to verify at unit authoring" and
     applies `D-2026-0001`, but `D-2026-0001` governs a source whose **text** cannot be obtained,
     not a work that cannot be shown to exist; the `G-2026-09`/`D-2026-0010` precedent (icka2024)
     is the matching case. The spec's added publisher detail is itself unverified.
  2. **`ncm2006` is deferred with unverified additions.** The guide names only "National
     Curriculum for Mathematics (Pakistan)". The spec expands it to "Government of Pakistan,
     Ministry of Education. (2006). *National Curriculum for Mathematics (Grades I-XII).*
     Islamabad." with "to verify at unit authoring". Nothing in the bound inputs verifies the
     year, the grade range or the imprint.
  3. **`steen2001`'s locator is false (repair, no ruling needed).** The work is real and verified
     (Open Library: Steen 2001, with a borrowable Internet Archive ebook), but the spec's added
     "ERIC ED459269, https://eric.ed.gov/?id=ED459269" points to "State Summary of West Virginia.
     Ed Watch Online." (Education Trust, 2001), verified against eric.ed.gov and the ERIC API.
     *Mathematics and Democracy* is not findable in ERIC at all. Recorded here for the owner's
     information because the intake briefing repeated the false number; the fix is mechanical and
     is listed as a repair in `D-2026-0040`.
  4. `npst2009` resolves (in-corpus: EFMP-302's `npst-pakistan-2009`, with the itacec.org
     retrieval limit already recorded under `D-2026-0001`).

- **Needed, and from whom:** the curriculum owner, to (a) supply a resolvable locator for Grawe's
  *Quantitative Literacy: Reasoning about Data* (or confirm the Cognella bibliographic record), or
  direct that it be recorded unresolvable in the `D-2026-0010` manner: guide-required, cited at
  bibliographic level only, limit stated at point of use; and (b) confirm or correct the 2006
  National Curriculum for Mathematics record, or direct the same unresolvable recording.
  `D-2026-0001` governs whatever texts cannot then be obtained.
- **Owner ruling (2026-09-23, relayed verbatim via the orchestrator session):**
  1. **(a) `grawe`: RECORD UNRESOLVABLE.** The owner confirms the `D-2026-0010` manner: keep the
     guide citation at title level flagged unresolvable, REMOVE the unverifiable "Cognella
     Academic Publishing" imprint, and cite the verified open-access replacements.
  2. **(b) `ncm`: CHECK THE NATIONAL CURRICULUM COUNCIL WEBSITE.** The owner directed a check of
     the National Curriculum Council (Pakistan) website (ncc.gov.pk) for the "National Curriculum
     for Mathematics" record; if a resolvable record is found there, cite it as the guide-required
     source; if nothing citable resolves, record exactly what was checked and re-escalate.
     **Check performed 2026-09-23:** the NCC Mathematics page
     (https://ncc.gov.pk/Detail/ZjgzYzg2MmMtZDc0Zi00NjEzLTk5ZmYtZGJiNjc5ODljOGUx, reached via
     ncc.gov.pk > Compulsory Subjects > Mathematics) lists and serves the national mathematics
     curriculum documents as open PDFs: "NCP - Math Progression Grid Grade (1-12)"
     (4_ NCP Mathematics PG 1-12.pdf, 15.9 MB, HTTP 200), "Math Suggested Guidlines Grade (1-8)"
     (Mathematics 1-8 - Suggested Guidelines.pdf, 5.2 MB, HTTP 200), "Math Suggested Guidlines
     Grade (9-12)" and "Functional Mathematics Grade (9-10)". PDF file modification dates are
     2023-11 and 2023-03; the listing page asserts no publication year, so none is cited. A
     resolvable record WAS found; it is cited as the guide-required source.
- **Blocks:** ~~the `### Guide-required` rows for `grawe` and `ncm2006`, and those two keys within
  the `**Mapped readings**` lines of Units 2-6~~ **unblocked** by the owner ruling of 2026-09-23
  and the NCC check. The `steen2001` locator repair landed at commit 139876c; the remaining
  mechanical repairs from `D-2026-0041` landed at c72199e.

---

## G-2026-29 - GQUR-300 Unit 3: Linear inequalities (U3-03) has no verifiable external source in the course's source set

- **Status:** open
- **Gate:** G3 English review (sources criterion), advisory
- **Source:** GQUR-300 Unit 3 G3 review run001 (2026-09-24)
- **Criterion:** `sources` (G3).
- **Detail:** The guide lists "Linear equations and inequalities" as one sub-topic
  (`Scheme-and-Course-guides/extracted-text/1st 2026.txt:585`). The Unit 3 G3 review
  (run001) verified that OpenStax *Prealgebra 2e* - the course's only algebra source -
  contains no inequalities chapter (11-chapter ToC checked), and the NCC documents' text
  layer cannot be read on this host to verify strand content beyond titles and grade
  coverage. The sub-topic is therefore covered from the guide text and general mathematics
  knowledge, recorded as a `no-external-source` row in `sources/unit-03.md` per the
  author-unit skill's rule, and escalated here rather than inventing a citation.
- **Needed, and from whom:** the curriculum owner, to either confirm an accessible source
  that covers linear inequalities at the right level (for example OpenStax *Elementary
  Algebra 2e*, which would need adding to the content-spec reading list), or accept the
  no-external-source posture for this sub-topic.
- **Blocks:** nothing in the automated gates; the G3 sources criterion for Unit 3 records
  the gap explicitly. The English content itself is complete and internally verified.

---

## G-2026-30 - GQUR-300: no accepted G3 evidence can cover the current English inputs (advisory chain needs an owner decision)

- **Status:** open
- **Gate:** G5 Urdu review (authority criterion), advisory; affects all six units
- **Source:** GQUR-300 G5 reviews run001, Units 1-6 (2026-09-24), each recording the
  dependency as an uncertain finding (Unit 1 U1, Unit 2 F11, Unit 3 F5, Unit 4 F5,
  Unit 5 B2, Unit 6 A12)
- **Criterion:** `authority` (G5); the G3 dependency clause of the review contract.
- **Detail:** ADR-0019 blocks agent certification, so no accepted (signed) G3 evidence
  exists in the reviewer registry. The best-available G3 evidence is the six advisory
  run001 reports (all dispositions: revise). The author applied every G3 repair the
  reports required, which changed the English inputs after each review (commits 93e6321,
  78f0366, 2d5cd6a), and rebound the G2 gate evidence at each step - so no G3 verdict,
  advisory or otherwise, covers the exact English bytes that the G5 reviews compared
  against. The G5 reviewers therefore proceeded with the bound English inputs as the
  authoritative comparison base and recorded this as a dependency finding per the
  contract, rather than aborting.
- **Needed, and from whom:** the curriculum owner, to either (a) accept the advisory
  chain (G3 run001 + verified repairs + rebound G2 gates) as sufficient for the G5
  stage, or (b) commission a fresh G3 pass over the current English inputs before the
  G5 findings are treated as more than advisory. Until then no G5 tracker row can be
  marked done from agent findings, which is the designed ADR-0019 posture.
- **Blocks:** the G5 tracker rows for Units 1-6 (all left unchecked, advisory); nothing
  in the automated gates. The Urdu content itself is complete and internally verified.

---

## G-2026-41 - GQUR-300: Urdu terminology and register rulings pending the curriculum owner

- **Status:** open
- **Gate:** G5 Urdu review (terminology and register criteria), advisory; course-wide
- **Source:** GQUR-300 G5 reviews run001, Units 1-6 (2026-09-24), terminology and
  register findings (Unit 1 U2/U3/U4, Unit 2 F8/F9/F10, Unit 3 F6, Unit 4 F6/F7,
  Unit 5 A7-terminology, Unit 6 A2/A9)
- **Criterion:** `terminology`, `register` (G5); the style guide's rule that conflicts
  between translator choice and the bank are resolved by the curriculum owner.
- **Detail:** The frozen bank (specs/content/terminology.csv) covers the
  education-psychology courses only; none of GQUR-300's core mathematics terms are
  banked. The G5 reviews confirmed most authored labels as internally consistent and
  faithful, and the author adopted the banked terms wherever they exist (معیارِ جانچ
  for Rubric, گروہی for Group Work, حکمتِ تدریس for Teaching Strategy, خود جائزہ for
  Self-Assessment). The following need owner rulings, with the reviewers' proposals:
  (a) disputed coinages embedded in glossary.json and the concept tables - تمام اعداد
  vs مکمل اعداد for "whole number", وسیع vs قوت نما for "exponent", اثر vs الجبرائی
  عبارت for "expression", بڑھوٹر vs نمو for "growth", قیمت vs قدر for "value",
  ترازو ماڈل vs ترازو for "balance model"; (b) the crossed mapping Assessment =
  جائزہ vs the bank's تشخیص while Evaluate is also rendered تشخیص; (c) Tally = گنتی,
  which overlaps the ordinary word for counting; Records = رجسٹر, narrower than the
  method name; (d) numeracy rendered عددیت in Unit 4 but عددی خواندگی in Unit 6;
  (e) perimeter rendered three ways (اطراف کی پیمائش dominant), with اطراف also
  meaning "sides" - the reviewers propose perimeter = اطراف کی پیمائش, sides = اضلاع;
  (f) کینٹین proposed for banking (canteen); (g) the reader-gender policy - the Urdu
  prose addresses the reader exclusively in the feminine while the SVG figure labels
  use the masculine generic; (h) Latin technical terms kept in Urdu prose
  (substitution, brainstorming, Bloom tags, bank labels) - defensible but worth an
  explicit owner note; (i) Figure labels render in the OS Arabic fallback because
  SVG-as-img cannot use the page's Nastaliq webfont, and table figures scale to
  3.3-5.5 CSS px at the 360 px viewport (a site-wide pipeline property affecting the
  English variants equally).
- **Needed, and from whom:** the curriculum owner, to rule on each item, promote the
  surviving authored labels into specs/content/terminology.csv, and record the
  register policy. The author cannot edit the bank, the glossary entries, or the
  style guide.
- **Blocks:** nothing in the automated gates (the FR-016c terminology conformance
  check fires only at translation_status: reviewed, and the key_terms blocks now
  present in every UR index will surface every unbanked term at that flip, which is
  the intended signal); the human quality pass before any reviewed flip.
---

## G-2026-62 - EFMP-302: the b8f8ffe figure re-optimisation shipped overlapping text to production, and no gate can see text-on-text overlap inside a committed SVG

- **Status:** open
- **Gate:** G3 (English review), accessibility criterion; affects all six EFMP-302 units
- **Source:** EFMP-302 Unit 3 G3 feat023-r1 (2026-09-24,
  `specs/content/efmp-302/reviews/unit-03/G3/agent-g3-efmp302-u3-feat023-r1.json`, blocking
  finding B-01), verified by feat023-r2
  (`agent-g3-efmp302-u3-feat023-r2.json`)
- **Question:** commit `b8f8ffe` (2026-09-21, "refresh G2 gate evidence manifests") silently
  included a mass SVG "re-optimisation" of all 132 figure files under
  `static/img/figures/efmp-302/`: a second CSS block enlarged every font (12.5-13px rules
  overridden by 16-18px rules) and long labels were re-wrapped into tspan blocks whose stacked
  baselines collide, so distinct strings printed on top of each other in nearly every figure
  (Unit 3 alone measured 18 full superpositions; a course-wide sweep estimated ~1000
  collisions). Every MDX carrier was also left 50px short of the enlarged viewBoxes. Because
  `b8f8ffe` is on `main` and the site auto-deploys from `main`, learners saw overlapping figure
  text in production from 2026-09-21 until the repair merges. The deterministic gates could not
  catch it: `check:figures` reads no glyph geometry, and `measure-figure-text.mjs` checks only
  viewBox overflow and the wordmark, not text-on-text overlap. Only a review that measures
  rendered geometry found it - and the Unit 2 feat023-r1 review, which ran the same gates but
  did not measure figure-internal geometry, passed the same broken figures on accessibility.
- **Action taken (author, feature 023):** all 132 files reverted to their pre-b8f8ffe geometry
  (commit `69bae9e`; no later commit had touched them, so nothing intentional was lost), and
  the one repair b8f8ffe had incidentally absorbed was re-applied (run-007 A-01, the fig-U3-6
  wordmark collision). Unit 3's cycle-2 review verified the repair four independent ways,
  including a negative control that reproduces the superpositions on the b8f8ffe bytes.
  `measure-figure-text` now reports fig-U3-6 clean; 10 pre-existing cosmetic shape-wordmark
  grazes remain (the reported-not-failed class prior reviews accepted).
- **Needed, and from whom:** the owner, to (a) extend `measure-figure-text.mjs` (or add a gate)
  so text-on-text overlap inside committed SVGs fails CI, closing the blind spot for every
  course; (b) note that a "cosmetic" asset-wide re-optimisation is a content change that needs
  review, not a chore commit - the commit message here described only manifest refreshes; and
  (c) confirm the production exposure window (2026-09-21 to merge) is acceptable to close by
  merge rather than an out-of-band hotfix.
- **Blocks:** nothing in the automated gates (all green on the repaired bytes); the Unit 2
  feat023-r1 accessibility pass is superseded by a cycle-2 re-run against the repaired figures.

---

## G-2026-63 - EFMP-302 Unit 2 G3: two advisory cycles consumed; the post-report figure repair is unverified

- **Status:** open
- **Gate:** G3 (English review), ADR-0019 two-cycle limit
- **Source:** EFMP-302 Unit 2 G3 feat023-r2 (2026-09-24,
  `specs/content/efmp-302/reviews/unit-02/G3/agent-g3-efmp302-u2-feat023-r2.json`), in the
  G-2026-24 pattern
- **Question:** Unit 2's feature-023 G3 review ran two advisory cycles. Cycle 1 (feat023-r1)
  returned pass, but its accessibility pass was earned against the b8f8ffe-broken figures
  without figure-internal geometry measurement (G-2026-62). Cycle 2 (feat023-r2), run against
  the repaired figures with exactly that measurement, returned **revise** on one blocking
  finding: fig-U2-5 (both EN variants) superposed the "was outweighed" and "did not follow
  through" failure-branch labels - pre-existing damage from the original figure commit,
  invisible to every gate and to cycle 1. The author repaired it post-report (rewrapped
  step-4's label as two lines right of its path line; measure-figure-text clean on both
  variants; the cycle-2 report's own negative-control instrument class confirms the geometry),
  rebound the G2 evidence, and per ADR-0019 the repair is unverified by a reviewer. Cycle 1's
  two advisory repairs (MCQ 6 key caveat, figures-manifest note) are verified landed by
  cycle 2; the MCQ key was re-derived blind at 10/10; three advisories carry (U2-12's
  indirect summative coverage, bebeau1999's text-level limit, the fig-U2-1 cosmetic graze).
- **Needed, and from whom:** the curriculum owner, to either accept the repaired state on the
  two advisory reports or authorise a third G3 cycle for Unit 2. The unit's G2 gates are green
  at the repaired commit; the G3 tracker row remains open either way.
- **Blocks:** a third G3 cycle for Unit 2; nothing else. G4 translation of Unit 2 is already
  complete (the rate probe), and the G5 review binds the current English inputs as its
  comparison base.

---

## G-2026-64 - EFMP-302 Unit 6 G3: the sources blockers are owner decisions; the fresh review escalates

- **Status:** open
- **Gate:** G3 (English review), sources criterion
- **Source:** EFMP-302 Unit 6 G3 feat023-r1 (2026-09-24,
  `specs/content/efmp-302/reviews/unit-06/G3/agent-g3-efmp302-u6-feat023-r1.json`), disposition
  escalate
- **Question:** the fresh feature-023 review of Unit 6 passes six of seven criteria on current
  bytes but fails `sources` on two blocking findings that predate this feature and were already
  marked owner-judgement in run 007: (S1) seven `coverage/unit-06.md` rows (U6-05/06 in day1999,
  U6-07/08/10 in villegas2003, U6-12/13 in guskey2000) assert a grounding the prose never cites
  in the named sections - repairing requires deciding whether the coverage claim or the citation
  is wrong, and adding citations to unretrievable texts would invent attributions; (S2)
  topic-01's Guskey (2000) multi-level evaluation attribution and Villegas-Reimers (2003)
  principles-convergence attribution carry no level-of-support declaration, and the texts are
  declared unretrievable, so the declaration's content is itself an owner judgement under
  D-2026-0001. The reviewer dispositioned escalate rather than revise because an author repair
  cycle for these is not authorised. Also verified this run: the 4a3a789 repairs hold (the
  decision register is a bound input via the rulings map; fig-U6-5's caption is consistent), and
  two of run-007's four owner findings are RESOLVED in current bytes - A2 by D-2026-0004's
  course-wide extension and P2 by 9972d70's Bloom relabelling (check:bloom-bands green over 400
  items). S3 (no bound source text for any of Unit 6's six keys) carries uncertain; figure
  geometry is clean across all 16 EN files.
- **Needed, and from whom:** the curriculum owner, to rule on S1 (correct the coverage rows or
  direct the prose citations) and S2 (the level-of-support declarations for guskey2000 and
  villegas2003, in the D-2026-0001 manner), and to decide whether a further G3 cycle for Unit 6
  is wanted after those rulings. G4 translation proceeds on the current English bytes; the G5
  review binds them as its comparison base.
- **Blocks:** G3 closure for Unit 6 (row stays open); nothing else - the unit's deterministic
  gates are green and its Urdu mirror is unaffected.

---

## G-2026-65 - EFMP-302: no accepted G3 evidence can cover the current English inputs for G5 (course-wide)

- **Status:** open
- **Gate:** G5 Urdu review (authority criterion), advisory; affects Units 2-6
- **Source:** EFMP-302 G5 feat023-r1, Unit 2 (2026-09-24,
  `specs/content/efmp-302/reviews/unit-02/G5/agent-g5-efmp302-u2-feat023-r1.json`, uncertain
  finding U-01), in the G-2026-30/G-2026-34 pattern; the same dependency is recorded by every
  subsequent feat023 G5 report
- **Criterion:** `authority` (G5); the G3 dependency clause of the review contract.
- **Detail:** ADR-0019 blocks agent certification, so no accepted (signed) G3 evidence exists in
  the reviewer registry. The best-available G3 evidence per unit is the feat023 advisory chain
  (Unit 2: cycle-1 pass earned against the b8f8ffe-broken figures, cycle-2 revise with the
  fig-U2-5 label collision repaired post-report at 8db9943; Unit 3: cycle-2 pass on the
  reverted figures; Units 4-5: cycle-1 passes; Unit 6: cycle-1 escalate with owner-gated
  sources findings, G-2026-64). The English bytes have in several cases changed after the
  relevant G3 report (post-report repairs), so no single G3 verdict covers the exact English
  bytes the G5 reviews compare against. The G5 reviewers therefore proceeded with the bound
  English inputs as the authoritative comparison base and recorded the dependency as an
  uncertain finding per the contract, rather than aborting. Unit 1 is excepted: its G5 row
  carries accepted human sign-off (2026-09-09) and its mirror was untouched by feature 023.
- **Needed, and from whom:** the curriculum owner, to either (a) accept the advisory chains
  (feat023 G3 reports + verified repairs + rebound G2 gates) as sufficient for the G5 stage, or
  (b) commission fresh G3 passes over the current English inputs before the G5 findings are
  treated as more than advisory. Until then no G5 tracker row can be marked done from agent
  findings, which is the designed ADR-0019 posture.
- **Blocks:** the G5 tracker rows for Units 2-6 (all left open, advisory); nothing in the
  automated gates. The Urdu content itself is complete and internally verified.

---

## G-2026-66 - EFMP-302 Unit 4 G5: two cycles consumed; the post-report residual repairs are unverified

- **Status:** open
- **Gate:** G5 Urdu review, ADR-0019 two-cycle limit
- **Source:** EFMP-302 Unit 4 G5 feat023-r2 (2026-09-24,
  `specs/content/efmp-302/reviews/unit-04/G5/agent-g5-efmp302-u4-feat023-r2.json`), in the
  G-2026-63 pattern
- **Question:** Unit 4's feature-023 G5 review ran two advisory cycles. Cycle 1 (feat023-r1)
  returned revise with 13 blocking Urdu-side findings; all were repaired at a483c9e. Cycle 2
  (feat023-r2) verified 12 of the 13 repairs fully and found 4 residual defects of the same
  classes at loci cycle 1 had not pinned: "integrative" still rendered مجموعی at three loci
  (the blooms summary, the ERQ-2 rubric title, the teacher notes); fig-U4-8's Urdu captions
  still weakening Isoré's "rarely" to "perhaps" (the repair commit touched no SVG); خلاصی for
  "Abstract" in the ERQ-1 rubric; and the non-word ثبٹ for ثبوت twice. The author applied
  these four repairs post-report (prose loci plus both fig-U4-8 Urdu variants regenerated with
  شاذ و نادر); all content gates, figures:variants:check and measure-figure-text are green on
  the repaired bytes, but the repairs are unverified by a reviewer. ADR-0019 reserves further
  cycles to the owner after two.
- **Needed, and from whom:** the curriculum owner, to either accept the repaired state on the
  two advisory reports or authorise a third G5 cycle for Unit 4. Six advisories (register
  garbles, minor semantic shifts, concept-label reworks for CON:4-12/CON:4-15) also carry.
- **Blocks:** a third G5 cycle for Unit 4; nothing else. The G3 dependency (G-2026-65) blocks
  G5 acceptance independently.
