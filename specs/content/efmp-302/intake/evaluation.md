# EFMP-302 intake evaluation (G0 / G1) - shadow run

- **Run id:** `agent-evaluator-efmp302-shadow-001`
- **Evaluated by:** `agent:evaluator`, 2026-09-19
- **Gates:** G0 course intake, G1 unit-spec
- **Constitutional basis:** Constitution Article VII.8; skill `.claude/skills/evaluate-intake/SKILL.md` v1.0.0
- **Mode:** **shadow** (ADR-0019 section 5). Nothing is appended to `specs/decisions/log.md` or
  `specs/gaps.md`; the entries this run would have written are proposals in
  `proposed-decisions.md` and `proposed-gaps.md` in this directory. No gate is marked, no content
  is certified, no reviewer is qualified, no publication is authorised.

## Manifest verification

Recomputed independently with `manifestFor()` from `scripts/lib/review-evidence.mjs`, passing the
same root set that `scripts/prepare-intake-evidence.mjs` defines, rather than trusting
`manifest.json`.

| Check | Result |
|---|---|
| Inputs claimed / recomputed | 48 / 48 |
| Paths present in one side only | none |
| Per-path digest mismatches | **0** |
| `manifest_digest` claimed | `dc982f74a114a23ce08b95e2a5727117abaa7174c919b14156cd2dd68701e515` |
| `manifest_digest` recomputed | `dc982f74a114a23ce08b95e2a5727117abaa7174c919b14156cd2dd68701e515` |
| Bound commit | `5debd4a25f2863a7a139292df6f45084c20cfff6` |
| Working tree | clean |
| `git diff 5debd4a..HEAD` | one file, `specs/content/efmp-302/intake-shadow-001/manifest.json` (the bundle itself); no bound input changed |

**Verdict: the manifest is sound.** The `.mdx` normalisation caveat did not arise: the intake root
set binds no `.mdx` file, so `normalized()` was a no-op for all 48 inputs.

## The bound guide documents

Two documents in the bundle purport to be the EFMP-302 course guide, and they are not the same
document:

| | `Scheme-and-Course-guides/1st 2026.pdf` (extract `extracted-text/1st 2026.txt`, lines 715-1006) | `.specify/Course_guides_and_Scheme/EFMP-302 Teaching Profession.pdf` |
|---|---|---|
| Issuing body | Faculty of Education, University of Sindh, Jamshoro | Department of Early Childhood and Elementary Education, Elsa Qazi Campus, Hyderabad |
| Credit hours | `3 (3-0)` (line 723) | `03 (0-3)` (page 1) |
| `Major:` line | `Professional Course- II` (line 718) | absent |
| CLO order | "Identify and exhibit ..." first, "Define and explain ..." second (lines 748, 750) | "Define and explain ..." first, "Identify and exhibit ..." second |
| Unit outline 1.1 to 6.4 | identical | identical |
| Suggested Readings | 12 entries (lines 923-990) | the same 12 entries |

The board Scheme of Study designated final authority by the curriculum owner
(`Scheme-and-Course-guides/B.Ed 4 Year 2026 revised after board.docx`, extract line 78-86) gives
`EFMP-302 / Teaching Profession / 3 (3-0) / Major: Professional Course- II / EC&EE`.

The spec (`content-spec.md:8`) names only the first document as its source and does not record the
existence of the second. `catalog/courses.json:45-50` carries `3 (3-0)`.

Nothing in the bound set establishes which of the two guide documents is authoritative. This is
the finding that most constrains the rest of this evaluation, because the CLO **numbers** that
every unit's outcome trace uses differ between them.

## Criterion verdicts

Each verdict carries a locator into the bound inputs. `fail` and `unverified` cannot contribute to
an approval (skill, "Criteria").

### 1. `identity` - **fail (escalate, Article II.3)**

- Code and title agree everywhere: `catalog/courses.json:45-46` (`EFMP-302`, `Teaching Profession`)
  = revised Scheme extract lines 78-80 = both guide documents = `content-spec.md:6`.
- Semester agrees: Scheme Semester I, both guides "Semester: 1st", `content-spec.md:8`.
- **Credit hours conflict.** Scheme and `1st 2026.pdf`: `3 (3-0)`. Standalone guide PDF:
  `03 (0-3)`. These are not the same course: `(3-0)` is three theory hours and no practical,
  `(0-3)` is the reverse. The catalog follows the Scheme.
- `specs/gaps.md` was checked first as the skill requires. G-2026-02 and G-2026-05 adjudicate
  credit-hour conflicts for **GNAS-301** and **GSOS-301** only, and the register's own header is
  explicit that "each guide-vs-scheme conflict was still decided on its own merits by the owner".
  No entry adjudicates EFMP-302. G-2026-01 records the Semester I inventory but not this split.
- The general precedence rule would give `3 (3-0)`, and that answer looks obvious. The skill and
  Article VII.8.2 both forbid me from taking it: which external document is authoritative is a
  question about the world. **Escalated, not decided.** See proposed `G-2026-07`.
- The part that is not in conflict (code, title, semester) is approvable and is carried in
  proposed `D-2026-0004`.

### 2. `partition` - **pass**

- The guide gives **numbered units with numbered sections**, so criterion 2's "where the guide
  gives numbered units, the partition must follow them" applies rather than its week-table branch.
- Units 1, 3, 4 and 6 map one-to-one onto the guide's sections: `content-spec.md:203-214`
  (Unit 1 topics 1.1-1.4), `:481-492` (Unit 3, 3.1-3.5), `:599-609` (Unit 4, 4.1-4.4),
  `:849-861` (Unit 6, 6.1-6.4). Unit counts,
  titles and week bands match the guide headings exactly, including the guide's own truncated
  ranges resolved against the standalone PDF (`Unit 4 (9-11)`, `Unit 6 (14-16)`).
- Units 2 and 5 split one guide section across two topic files (guide 2.3 into topics 2.3/2.4,
  guide 5.1 into topics 5.1/5.2). Both splits are **already recorded owner decisions**
  (`content-spec.md:330-336` confirmed 2026-09-15; `:729-737` confirmed 2026-09-18), both keep the
  `Guide ref` column pointing at the real guide section, and both state the seam to the learner.
  I am confirming that the decisions exist and are recorded, not re-taking them.
- The week schedule at `content-spec.md:97-104` reproduces the guide's week bands without drift.
- Approved in proposed `D-2026-0003`.

### 3. `coverage` - **fail (one half passes)**

Completeness passes; the no-additions half does not.

**Completeness (passes).** I enumerated every leaf bullet of the guide's Unit 1 to Unit 6 outlines
and matched each against the spec's `### Sub-topic checklist` rows. 53 guide leaf bullets, and
every one of them is carried by at least one checklist row. Nothing in the guide is dropped.

**Additions (fails).** The six checklists carry 78 rows against those 53 bullets. Most of the
excess is legitimate decomposition of compound bullets (guide 3.5's single five-role bullet into
`U3-11..U3-13`; guide 4.2's "Structure, domains and indicators" into `U4-05..U4-07`; guide 5.1's
"Workload, stress and burnout" into `U5-01`/`U5-02`). **Fourteen rows have no guide bullet
ancestor at all**, because they sit under guide headings that carry no bullets:

| Guide heading | Bullets in guide | Spec rows | Disclosed in the spec? |
|---|---|---|---|
| 2.1 Meaning and significance of professional ethics | 0 | `U2-01..U2-04` (4) | yes, `content-spec.md:300-305` |
| 4.3 Applying standards in Practice to guide self-evaluation | 0 | `U4-08`, `U4-09` (2) | **no** |
| 4.4 Linking standards to licensing, certification, appraisal | 0 | `U4-10`, `U4-11`, `U4-12` (3) | **no** |
| 5.3 Responding to Professional Challenges | 0 | `U5-11`, `U5-12` (2) | yes, `content-spec.md:706-709` |
| 6.4 Building a Personal Professional Development Plan | 0 | `U6-12`, `U6-13` (2) | yes, `content-spec.md:830-832` |
| 6.1 (heading itself) | 2 | 3 rows, `U6-01` from the heading | partially |

Three further defects in the spec's own account of its derivation:

- `content-spec.md:579` claims Unit 4 is "One row per leaf bullet of course-guide sections
  4.1-4.4". It is not: 4.3 and 4.4 have no bullets, and 4.1 and 4.2 were split. Unit 4 is the
  only expanded checklist with **no** "expansion, not a transcription" disclosure, so a reader
  checking the spec against the guide is told the wrong thing.
- `U4-12` ("What happens when a standard is used for a purpose it was not designed for") is a
  substantive critical-perspective sub-topic with no guide ancestor of any kind. It is a good
  sub-topic. It is still an addition, and additions escalate.
- `content-spec.md:706-707` states the guide's Unit 5 outline "carries ten leaf bullets across
  three headings" with 5.3 contributing none. The actual count is **eight** (5.1 has six, which
  the same spec states correctly at `:731`; 5.2 has two). The derivation note contradicts itself
  two paragraphs apart.
- `content-spec.md:458` and `:830` make the same "one row per leaf bullet" claim for Units 3 and
  6, and both are inexact for the same reason.

Escalated as proposed `G-2026-08`. The completeness half is approved in proposed `D-2026-0005`.

### 4. `outcomes` - **fail (escalate)**

- The spec paraphrases the guide's seven CLOs at `content-spec.md:21-29`; the paraphrase is
  faithful to both guide documents.
- Each unit declares SLO refs tracing to numbered CLOs: `content-spec.md:158, 277, 438, 562,
  685-686, 807`.
- **CLO 4 has no unit that delivers it.** CLO 4 is "Develop skills to plan, implement, and
  evaluate teaching strategies for diverse learners". Units 5 (`:685-686`) and 6 (`:807`) both
  claim it as an ancestor. Unit 5's guide topics are workload, burnout, multilingual and
  multi-grade classrooms, accountability, stakeholder expectations, status, digital
  professionalism and responding to challenges. Unit 6's are CPD, career stages, development
  routes and a personal plan. Neither unit teaches planning, implementing or evaluating a
  teaching strategy. The trace is asserted rather than earned, and no other unit claims CLO 4.
  This is a hole in the **guide**, not in the spec: the guide's own six-unit outline contains no
  instructional-planning content. The guide therefore does not determine how CLO 4 is discharged,
  which is exactly the condition for escalation. Proposed `G-2026-10`.
- **The CLO numbering itself is unstable.** Every trace above cites CLOs by number. The two guide
  documents order CLOs 1 and 2 differently (see the table above). If the standalone PDF is
  authoritative, "traces to guide CLOs 1-3" at `:158` and "CLOs 1, 5" at `:438` shift meaning.
  This criterion cannot be settled ahead of proposed `G-2026-07`.
- No SLO was found that lacks any guide ancestor, so the addition half of this criterion is clean.

### 5. `readings` - **fail (escalate)**

- A reading list is present (`content-spec.md:52-93`, guide-required table `:59-75`, curated `:77-93`), so this course does not hit the
  "no reading list" bar that criterion 5 says cannot pass.
- **The "### Guide-required" table carries 13 entries. Both guide documents list 12.** The extra
  entry is `kwakman2003` (`content-spec.md:71`), Kwakman (2003), *Teaching and Teacher Education*
  19(2). It appears in neither guide's Suggested Readings (`extracted-text/1st 2026.txt:923-990`,
  and the standalone PDF's identical list). It is a real, correctly cited work, and its own note
  says the bibliographic record was verified via OpenAlex. That is not the problem. The problem is
  that it is filed under a heading asserting the guide requires it, when the guide does not, and
  it is then carried into Unit 6's `**Mapped readings**` (`:874`) on that footing. Either it
  belongs in `### Curated-supplementary`, or a guide document I was not given lists it.
- `icka2024` (`content-spec.md:73`) gives "(open access - journal site)" with **no DOI and no
  URL**. Criterion 5 requires each entry to be resolvable to a real work; this one is not
  resolvable from the bound inputs. It is a guide-listed entry, so the guide's own reference is
  the incomplete one.
- **Monographs, per the criterion's `D-2026-0001` instruction.** Five guide-required entries are
  print books with no retrievable text: `brookfield2017`, `carr2000`, `day1999`, `guskey2000`,
  `hurst2009`. `D-2026-0001` is `confirmed` and corpus-wide, so an author may flag these and
  proceed, but each binds the author to **title-level support only** unless a copy is obtained.
  Between them they are mapped to Units 1, 2, 3 and 6, which is four of six units resting part of
  their source base on title-level support. This is recorded so the G3 reviewer of those units
  inherits it rather than rediscovering it.
- Escalated as proposed `G-2026-09`.

### 6. `blueprint` - **fail**

Counts and per-topic minimums are arithmetically sound in all six units. I checked the tight case
explicitly: Unit 3 has five topics, so "2 per topic" consumes all 10 MCQs and all 10 RRQs exactly,
and the spec correctly declines to add a sixth ERQ, loading the integrative demand onto the 3.1
item instead (`content-spec.md:550-556`). That is the one place the fixed 10/10/5 bank could have
been over-committed, and it was not.

Two defects:

- **Unit 3's RRQ band is wrong.** `content-spec.md:551` sets RRQs at "**Remember** to Analyze".
  `specs/content/style-guide.md:228` fixes the band at "Understand to Analyze", and the other five
  units all say "Understand to Analyze" (`:266, :427, :675, :797, :912`). This is a bound-input
  contradiction with a determinate answer, so it is a defect to report rather than a question to
  escalate: the style guide settles it. Reported now because criterion 6 exists to catch a floor
  before items are written against it.
- **The `## Course review plan` still carries a design that `D-2026-0002` superseded.**
  `content-spec.md:151-152` lists a practicum brief, *One-term PD plan*, that builds a plan
  "naming one activity from each 'ways to continue developing' category". That is verbatim the
  design `D-2026-0002` records as superseded (`specs/decisions/log.md`, D-2026-0002 Decision), and
  `content-spec.md:817-822` states the supersession inside the Unit 6 section. `D-2026-0002`'s
  own **Applied in** names only "`content-spec.md` '## Unit 6'", and its **Limits** say "Settles
  Unit 6 only", so the course-level section was outside its reach and the superseded design
  survived there. Whether a course-level practicum brief may keep a design the unit it draws on
  has abandoned is a scope question the guide does not touch, so it escalates: proposed
  `G-2026-11`.

Neither defect is reachable by CI. `specs/008-rich-unit-pedagogy/contracts/content-spec-v3.md`
states that `## Course review plan`, `**Figure plan**` and `**Unit-end assessment blueprint**` are
"human-read; they seed the manifest and the bank but are not parsed", and
`specs/content/style-guide.md:302` and `:321` put "whether the items are ... correctly
Bloom-levelled" on the human Content gate side of the split. **There is no deterministic check
anywhere in the repository that compares an authored Bloom tag against the band its unit spec
sets.** That is a standing structural hole, and it is the mechanism by which a wrong band, or a
right band with wrong items under it, reaches a published unit.

### 7. `structure` - **partial pass, with one clause unverified**

**Required sections, checked against the bound style guide and the v3 contract.** All five
course-level sections are present: `## Course Description` (:39), `## Reading list` (:52),
`## Week schedule` (:95), `## Standards & frameworks anchors` (:106), `## Course review plan`
(:120). Front matter is `course_code` + `status: approved` as the contract requires (`:1-4`).
Every unit carries `### Sub-topic checklist`, `### Topic list`, `**Depth budget**`,
`**Prerequisite knowledge**`, `**Common misconceptions**`, `**Mapped readings**`,
`**Worked-examples plan**`, `**Figure plan**` and `**Unit-end assessment blueprint**`.

**Defect:** `**International best-practice notes**` is present in Units 1, 2, 3 and 4
(`:238, :394, :518, :645`) and **absent from Units 5 and 6**. The v3 contract lists it among the
per-unit lines. It is not parsed by any gate, so nothing flagged it.

**Deterministic checks, real exit codes, run at the bound tree:**

| Command | Exit |
|---|---|
| `npm run validate:content` | 0 |
| `npm run check:pipeline-gate` | **1** |
| `npm run check:depth-gate` | 0 |
| `npm run check:figures` | 0 |
| `npm run check:no-em-dash` | 0 |
| `npm run check:no-answer-keys` | 0 |
| `npm run check:concept-graph` | 0 |
| `npm run check:docs-sync` | 0 |

`check:pipeline-gate`'s 10 findings are all tracker rows for EFMP-302 Units 2 to 6 ("G2 en-draft:
stale or incomplete input manifest", "'G3 en-review' row ... is not done", "reviewer skill
changed"). None concerns `content-spec.md`, and the tracker is explicitly excluded from the bound
set by `bound()` in `scripts/lib/review-evidence.mjs:141-143`. It is recorded as a real exit code
and attributed, not treated as a spec defect.

**Unverified clause.** Criterion 7 requires the spec to satisfy "the contracts in `contracts/`".
`specs/008-rich-unit-pedagogy/contracts/` is **not a bound input of this bundle**;
`intakeRoots()` in `scripts/prepare-intake-evidence.mjs:26-39` does not include it. I read
`content-spec-v3.md` (sha256 `fb038aeb367454be2284302dbd94ea376010d9fe2a393e6d88e9b9cc17d60899`)
and `end-of-course-review.md` (sha256 `a8490b5e8e93f722e1b0278dd6a1bdf77c5c6bd127c885e137d5e70032dad27d`)
from the working tree so that this criterion could be judged at all, and I record their digests
here so the reading is auditable. Because they are outside the manifest, **that clause is
`unverified` and contributes to no approval.** See proposed `G-2026-12`.

## Summary

| # | Criterion | Verdict |
|---|---|---|
| 1 | `identity` | fail - escalate (Art. II.3 credit-hour conflict); non-conflicting part approved |
| 2 | `partition` | **pass** |
| 3 | `coverage` | fail - completeness passes, additions escalate |
| 4 | `outcomes` | fail - escalate |
| 5 | `readings` | fail - escalate |
| 6 | `blueprint` | fail - two defects, one escalation |
| 7 | `structure` | partial pass; contract clause `unverified` |

Three narrow approvals are proposed (`D-2026-0003` partition, `D-2026-0004` non-conflicting
identity, `D-2026-0005` coverage completeness). Six escalations are proposed (`G-2026-07` to
`G-2026-12`). Two defects are reported without escalation because a bound input settles them: the
Unit 3 RRQ band and the missing `**International best-practice notes**` lines.

**This is a shadow run. None of it changes any gate, and EFMP-302's existing owner-approved intake
and its six authored units are untouched by it.**
