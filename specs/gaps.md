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

- **Status:** open (awaiting owner decision)
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

- **Status:** open (awaiting owner decision)
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

- **Status:** open (awaiting owner decision)
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

- **Status:** open (awaiting owner decision)
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

- **Status:** open (awaiting owner decision)
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

- **Status:** open (awaiting owner decision)
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
