# Proposed gap entries - EFMP-302 intake, shadow run

**These are proposals. Nothing here has been appended to `specs/gaps.md`.** This run is a shadow
qualification exercise under ADR-0019 section 5, and `specs/gaps.md` is a bound input of this
bundle, so writing to it would modify an input the evaluation binds to.

Codes are allocated as the next free ones at the bound commit. `specs/gaps.md` runs `G-2026-01`
through `G-2026-06`, so these are `G-2026-07` to `G-2026-12`. Two later EFMP-302 sections in that
file are unnumbered; if the owner adopts these, the codes must be re-checked against the register
at that time.

All six rest on `specs/content/efmp-302/intake-shadow-001/manifest.json`, manifest digest
`dc982f74a114a23ce08b95e2a5727117abaa7174c919b14156cd2dd68701e515`. Per-criterion reasoning is in
`evaluation.md` in this directory.

---

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

## G-2026-12 - The intake bundle omits inputs that the intake criteria depend on

- **Status:** open (awaiting owner decision)
- **Criterion:** `structure` (criterion 7) directly; `coverage` (criterion 3) by implication. This
  is a finding about the **evaluation machinery**, not about EFMP-302.
- **Detail:** `intakeRoots()` in `scripts/prepare-intake-evidence.mjs:26-39` binds the
  content-spec, the catalog, the style guide, the terminology bank, the constitution, the decision
  and gap registers, both guide folders, and the evaluator's own skill and agent files. Two things
  the criteria need are missing.

  1. **Criterion 7 requires the spec to satisfy "the contracts in `contracts/`", and no contract
     is bound.** `specs/008-rich-unit-pedagogy/contracts/` is not in the root set. To judge
     criterion 7 at all I read `content-spec-v3.md` (sha256
     `fb038aeb367454be2284302dbd94ea376010d9fe2a393e6d88e9b9cc17d60899`) and
     `end-of-course-review.md` (sha256
     `a8490b5e8e93f722e1b0278dd6a1bdf77c5c6bd127c885e137d5e70032dad27d`) off the working tree, and
     recorded those digests in `evaluation.md` so the reading is auditable. Because they sit
     outside the manifest, that clause of criterion 7 is marked `unverified` and supports no
     approval. As written, **criterion 7 can never fully pass on any course.** This one is a
     straightforward skill/script inconsistency.
  2. **Intake on an already-authored course is a different job from intake on an empty one, and
     the root set models only the second.** The script's own header says so deliberately: the
     bound set is "deliberately NOT `docs/`, because nothing is authored yet". For EFMP-302 six
     units are authored and each carries four per-unit governance tables (`coverage/`, `sources/`,
     `figures/`, `concepts/`), none of them bound. The spec points outward at them at six separate
     places, each saying its checklist is "the authoritative list the depth gate grades
     `specs/content/efmp-302/coverage/unit-0N.md` against" (`content-spec.md:177-179`, `:294-296`,
     `:455-457`, `:576-578`, `:701-702`, `:827-829`). Criterion 3 is named `coverage`. An evaluator
     is pointed at the coverage matrix by the artefact under evaluation and cannot see it.

     A concrete instance was independently found by G3 outside this run: `coverage/unit-06.md`
     maps seven of thirteen sub-topics to sources the authored prose never cites. Nothing in the
     48 bound inputs could reach it.

- **Needed, and from whom:** the curriculum owner, with the developer, to decide (a) whether
  `specs/008-rich-unit-pedagogy/contracts` joins `intakeRoots()`, which appears to be a plain fix,
  and (b) whether a **retrofit** intake variant exists for a course whose units already exist,
  binding the per-unit governance tables and possibly `docs/`. (b) is a gate-boundary question,
  not a script bug: widening the bundle moves an evaluator into work Article VII.8.4 reserves to
  G3, and that boundary should be redrawn deliberately or left where it is.
- **Blocks:** criterion 7's contract clause, on every intake evaluation, until (a) is resolved.
