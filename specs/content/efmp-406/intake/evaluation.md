# EFMP-406 Contemporary Literacies - G0 intake / G1 unit-spec evaluation

- **Evaluator:** agent:evaluator, 2026-10-31, fresh session; did not draft this spec.
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (Constitution Art. VII.8).
- **Spec under evaluation:** `specs/content/efmp-406/content-spec.md` (`status: draft`, 351 lines).
- **Worktree / branch:** `/home/a2ahs/wt-sem3-intake`, `content/sem3-content-specs` (HEAD `d7aabb98`,
  which adds only the intake bundles on top of the bundle commit).
- **Decision code:** `D-2026-0075` (pending-owner-review). **Gaps raised:** `G-2026-155` to
  `G-2026-159`. Entries are drafted in `register-entries.md` beside this file for the parent to append;
  this run did not edit `specs/decisions/log.md` or `specs/gaps.md`.

## Bundle verification

- `specs/content/efmp-406/intake/manifest.json`: `kind: intake`, commit
  `815d59fd8d672b34468b9814a0a2500ade3b80a0`, 55 inputs, manifest digest
  `0888f6078ade5c2962215b463ceed596a717a99221e9fbecb71e743ad2953faf`.
- I recomputed it with `manifestFor()` from `scripts/lib/review-evidence.mjs`, using the intake roots
  from `scripts/prepare-intake-evidence.mjs`. All 55 paths match, with **0 digest mismatches** and no
  extra or missing path. `digest(JSON.stringify(input_manifest))` reproduces the stored digest.
- Registers at read time match the manifest's `registers` field: `specs/decisions/log.md` `e9598a98...`
  and `specs/gaps.md` `383dcc3b...`.
- `git diff 815d59fd HEAD` touches only `specs/content/efmp-406/intake/manifest.json` among this
  course's inputs, and the working tree was clean at the start of the run.
- The skill file in the worktree is byte-identical to the main checkout's copy.

## Verdicts

| # | Criterion | Verdict | Outcome |
|---|---|---|---|
| 1 | identity | **unverified** (escalated) | code, credit hours, semester and category agree; title conflict `G-2026-155`; no catalog entry `G-2026-156` |
| 2 | partition | **pass** (units) / topic grouping **escalated** | six guide units approved; the 2+2 topic grouping is escalated as `G-2026-157` |
| 3 | coverage | **pass** | 24/24 guide bullets, each exactly once, with no additions |
| 4 | outcomes | **pass** | every SLO traces to guide outcomes 1-5, and all five are reached |
| 5 | readings | **fail** (escalated) | guide list present but off-topic for 23/24 sub-topics, `G-2026-158`; remedy rests on a Semester 2 ruling, `G-2026-159` |
| 6 | blueprint | **pass** (for the drafted two-topic grouping only) | internally consistent and consistent with the style guide |
| 7 | structure | **pass** | contract-valid front matter; gates exit 0 except one unrelated failure; v3 shape consistent |
| 8 | decision-residue | **pass** | no superseded design found in the whole spec |

**Overall: partial.** The spec stays `status: draft`. No unit may be authored until `G-2026-155` to
`G-2026-159` are ruled and a fresh intake runs on a newly prepared manifest.

---

## 1. identity - unverified (escalated)

**The catalog entry does not exist.** `catalog/courses.json` has no EFMP-406. Its Semester 3 array is
empty, and the `_note` calls Semesters 3-8 "placeholders pending G0 course intake". The criterion as
written ("the course code, title and credit hours in `catalog/courses.json` match the guide and the
Scheme") therefore cannot pass. I judged the spec's **proposed** entry (`content-spec.md:12`) instead:
`{"code": "EFMP-406", "title_en": "Contemporary Literacies", "title_ur": "عصری خواندگیاں",
"credit_hours": "3 (3-0)", "category": "Major: Professional"}`, Semester 3.

| Field | Guide (`3rd 2026.txt`) | Scheme (`B.Ed 4 Year 2026 revised after board.txt`) | Proposed entry | Finding |
|---|---|---|---|---|
| Code | `EFMP-406` (`:229`) | `EFMP-406` (`:246`, Semester III row 4, `:244`) | `EFMP-406` | agree |
| Title | "Contemporary **Literacy**" (`:235`) | "Contemporary **Literacies**" (`:248`) | Literacies | **conflict** |
| Credit hours | `3` (`:232`), no split | `3 (3-0)` (`:250`) | `3 (3-0)` | agree: the guide gives a total and no split, so it does not contradict the Scheme's split (the `G-2026-02`/`G-2026-05` posture, as in `D-2026-0006` item 1) |
| Semester | `3rd` (`:236`) | Semester III block (`:190`) | 3 | agree |
| Category | (none) | "Major: Professional Course - VI" (`:252`) | "Major: Professional" | agrees with the catalog's convention for every EFMP entry |

The superseded scheme (`B.Ed 4 Year board.txt:129-132`) carries the same code, title, `3 (3-0)` and
category. `.specify/Course_guides_and_Scheme/` holds no EFMP-406 file, so `D-2026-0003` has nothing to
act on.

**Title.** Singular in the guide, plural in the Scheme. That is a guide-vs-Scheme conflict, and under
Art. II.3 it is escalated rather than decided. The spec's title note (`:14`) says the catalog note
"treats [the Scheme] as the final authority for identity". The `specs/gaps.md` header (`:9-24`) does
name the revised Scheme the final authority, but it adds: "'Final authority' settles precedence *in
general*, but each guide-vs-scheme conflict was still decided on its own merits by the owner". No
confirmed ruling covers this title, so the conflict is escalated as **`G-2026-155`**. The likely answer
does not change the obligation.

**Catalog addition.** Adding the entry changes `catalog/courses.json`, which every G2/G3 manifest binds
whole (open `G-2026-71`). Whether and when to add it is an owner call, escalated as **`G-2026-156`**.
`title_ur` is not guide-determined either: the guide and Scheme are English-only, and
`specs/content/terminology.csv` has no "literacy" term.

## 2. partition - pass for the units; topic grouping escalated

- The guide names six numbered units with headings: Unit 1 `:249`, Unit 2 `:254`, Unit 3 `:259`,
  Unit 4 `:264`, Unit 5 `:269` and Unit 6 `:274`. Each has exactly four bullets (`:250-253`,
  `:255-258`, `:260-263`, `:265-268`, `:270-273`, `:275-278`).
- The spec's six units (`:72-78`, `## Unit 1`-`## Unit 6`) are one per guide unit, in the guide's
  order, with the guide's titles. That is what the confirmed `D-2026-0070` item 1 requires, and the
  guide settles it. **Approved.**
- **Week schedule:** the guide has no week allocation for EFMP-406. The spec records none and invents
  none (`:69`), which conforms to the confirmed `D-2026-0012`.
- **Topic grouping (drafting note 3, `:350`): escalated, `G-2026-157`.** `D-2026-0070` item 1 says
  "each topic is one of that chapter's numbered sections (Topic N.k teaches guide section N.k)". The
  EFMP-406 bullets are **unnumbered**. One reading treats each bullet as a section, giving four topics
  per unit with one bullet each. The other treats the ruling as silent, which permits the drafter's
  two topics of two bullets. The guide does not decide between them, and the 2+2 split is the
  drafter's construction. This is not a within-guide slip I may resolve, because the numbering is not
  inconsistent; it is absent.

## 3. coverage - pass

I checked every `### Sub-topic checklist` row against the guide line it cites:

| Unit | Rows | Guide lines | Result |
|---|---|---|---|
| 1 | U1-01..04 | `:250`, `:251`, `:252`, `:253` | verbatim |
| 2 | U2-01..04 | `:255`, `:256`, `:257`, `:258` | verbatim |
| 3 | U3-01..04 | `:260`, `:261`, `:262`, `:263` | verbatim |
| 4 | U4-01..04 | `:265`, `:266`, `:267`, `:268` | verbatim |
| 5 | U5-01..04 | `:270`, `:271`, `:272`, `:273` | verbatim, apart from the spelling "centred" for "centered" |
| 6 | U6-01..04 | `:275`, `:276`, `:277`, `:278` | verbatim |

All 24 guide bullets appear exactly once, and the spec adds no sub-topic the guide lacks. Each unit's
`**Topics**` bullet and `## Week schedule` row restate the same four bullets.

**Author repair (course-wide items, guide-determined, not an escalation):** the guide has a second
assessment block, `ASSESSMENT CRITERIA` (`:306-310`): class test, mid-term test, evaluation of
assignments, class attendance, and class participation/performance. The spec's `**Assessment**` line
(`:26`) reports only the weighted table at `:285-289`. The spec should report both blocks as given.
Neither block contradicts the other (`:306-310` carries no weights), so nothing needs ruling.

## 4. outcomes - pass

The spec reproduces the guide's five learning outcomes verbatim (`:18-23` against guide `:242-246`).
Each unit has two SLOs, and each SLO's scope is that unit's own guide bullets:

| Unit | SLO traces stated | Assessment |
|---|---|---|
| 1 | O1, O2 | direct: concept and scope; traditional vs contemporary views |
| 2 | O2, O3 | contemporary forms are the modern perspective (O2) in social and digital contexts (O3); O1's scope ("critical, digital, media, visual, and information literacies", description `:239`) would also fit |
| 3 | O3 | direct: social and cultural contexts |
| 4 | O3, O4 | digital contexts; classroom use |
| 5 | O4, O5 | direct: classroom strategies; designing activities |
| 6 | O3, O4 | developing contexts; the teacher's role |

All five outcomes are reached: O1 (U1), O2 (U1, U2), O3 (U2, U3, U4, U6), O4 (U4, U5, U6) and O5 (U5).
No SLO lacks a guide ancestor.

## 5. readings - fail (escalated)

**Present, and each entry resolves to a real work**, so this is not a guide-silent course. The guide
lists five references (`:290-295`). I checked them against Crossref and OpenAlex on 2026-10-31:

| Entry as printed | Finding |
|---|---|
| Booth and Ainscow (2016), *Index for Inclusion* | Real (CSIE). OpenAlex indexes the 2000 edition only; the 2016 4th edition is print. Monograph: title-level support under `D-2026-0001` unless a copy is obtained |
| Mittler (2019), *Working Towards Inclusive Education*, Routledge | Real work: Crossref `10.4324/9780203386149` was issued 2012-06-25 (David Fulton, Routledge reissue), and OpenAlex marks it closed. **No 2019 edition** was found. The year as printed does not resolve |
| Loreman, Deppeler and Harvey (2020), *Inclusive Education: Supporting Diversity in the Classroom* | Real work, with a 2005 first edition and a 2010 second edition. **No 2020 edition** was found in Crossref or OpenAlex, so the year as printed does not resolve. The spec says the 2005 edition has the "same ... title", but the 2005 title is *Inclusive Education: A Practical Guide to Supporting Diversity in the Classroom* (Crossref review `10.1017/s1030011200025252`). That is an author repair |
| UNESCO (2017), *A Guide for Ensuring Inclusion and Equity in Education* | Real; open at source; not retrieved (spec, under `D-2026-0001`) |
| Government of Pakistan (2018), *National Education Policy Framework* | Real; official; not retrieved (spec) |

**Why it cannot pass:**

1. **Fit.** All five entries are about inclusive education. The course outline (`:248-278`) is about
   literacy. The spec itself concedes the list supports one checklist row of 24 (U6-02) and relies on
   it for no literacy claim (`:39`). The same block also carries an inclusion project ("Developing an
   inclusive lesson plan", `:288`) and "Visits to inclusive schools" (`:283`). `G-2026-73` already told
   the owner this list "may be a misplaced list", for information only. `D-2026-0053` did not rule on
   it. Whether this block belongs to EFMP-406, or was carried over from EFMP-305, is a question about
   the world: **`G-2026-158`**.
2. **The remedy rests on an owner ruling outside its scope.** The spec binds eleven author-selected
   open-access works and declares `open_access_floor: {default: 1}` "under `D-2026-0053` item 2"
   (`:35`, `:51`). `D-2026-0053`'s scope line names six **Semester 2** courses, and EFMP-406 is not
   one of them. Applying it here extends a scoped owner ruling, which is the owner's call:
   **`G-2026-159`**.

**Author-selected list (`:53-65`):** I verified all eleven DOIs against Crossref and OpenAlex. Each
resolves to the cited title, authors, journal, volume and pages, and each is open access in OpenAlex
(Papen hybrid CC BY; Shakir diamond; Minott green; Alcolea-Díaz diamond, OpenAlex year 2019, Crossref
2020; Ashraf gold CC BY; Furenes hybrid CC BY; Greenhow bronze; Gasque diamond; Hafifah diamond;
Rehman hybrid, Crossref issued 2015-11 as the spec notes; Ahmad diamond CC BY). Every unit maps at
least one of them. If `G-2026-159` is ruled in the spec's favour, the list itself needs only the minor
repairs below.

Minor author repairs: Minott's title omits its subtitle, "A confirmatory investigation". The Loreman
2005 title slip is noted in the table above.

## 6. blueprint - pass (for the two-topic grouping as drafted)

I checked each unit against `specs/content/style-guide.md:225-252`:

- **Formative:** "5-8 items (Remember/Understand/Apply)". Two topics times the per-topic floor of 3
  gives at least 6 items, inside 5-8. The three-topic case in `D-2026-0072` does not arise.
- **Summative:** each unit names one Analyze-or-higher item (Unit 5 Create, Unit 6 Evaluate), and the
  weighting is the 60/40 default (Art. III.7).
- **Unit-end bank:** MCQ 10 Remember to Apply, at least 2 per topic (4 of 10 used); RRQ 10
  Understand to Analyze, at least 2 per topic; ERQ 5 Analyze to Evaluate/Create, "2 per topic plus 1
  integrative (total 5)", so 2 x 2 + 1 = 5. That is consistent.
- `check:bloom-bands`' parser (`scripts/check-bloom-bands.mjs:30-55`) reads every band line in this
  spec ("Remember to Apply" form, `- MCQs (10):` prefix).
- **Course-level weights:** the guide's 10/20/30/40 table is reported as given and not relabelled
  formative or summative, which is correct.

**Contingency.** If `G-2026-157` is ruled as one topic per bullet (four topics per unit), this
blueprint breaks against itself. "2 ERQs per topic plus 1" would need 9 ERQs where the bank has 5. The
formative floor would be 12 items, above the 8 that "5-8" allows, and `D-2026-0072` rules only on
three-topic units. The figure plan would also need 8 figures per unit. This approval is limited to the
grouping as drafted.

## 7. structure - pass

- **Front matter** (`contracts/content-spec-frontmatter.schema.json`, Ajv 2020): `{"course_code":
  "EFMP-406", "status": "draft", "open_access_floor": {"default": 1}}`. It is **valid**, and the floor
  is in the mapping form `check:source-floor` reads.
- **Per-unit shape:** I parsed it with the gate's own `unitSectionLines`, `tableAfterHeading` and
  `parseTopicList`. Every unit has a `### Sub-topic checklist` (with a Topic column) and a
  `### Topic list`. Each partition is total and disjoint (no duplicate, missing or extra ID). There are
  2 figures per topic, and each unit has at least one concept-map, flowchart or timeline (U1 2, U2 2,
  U3 1, U4 1, U5 1, U6 2). Figure IDs are unit-scoped (`fig-U<n>-k`, n = the unit). The `**Figure
  plan**` archetypes match the `### Topic list` Figures cells row for row. Every unit carries
  `**Depth budget**`, `**Prerequisite knowledge**`, `**Common misconceptions**`, `**Mapped readings**`,
  `**Figure plan**` and `**Unit-end assessment blueprint**`.
- **Depth budget:** "4 sub-topics; 2 topics; 55-75 reading-min" parses as `[55, 75]` under the
  new-shape regex (`scripts/lib/unit-depth.mjs:468`).
- **Course-level sections:** `## Course-wide items`, `## Course Description`, `## Reading list`,
  `## Week schedule` (guide-silent form, `D-2026-0012`). The spec contains zero em dashes and nothing
  that matches the answer-key patterns.
- **Deterministic gates** (each run as `flock /tmp/mega-book-heavy.lock npm run -s <gate>`):

  | Gate | Exit |
  |---|---|
  | `validate:content` | 0 |
  | `check:pipeline-gate` | 0 |
  | `check:depth-gate` | 0 |
  | `check:figures` | 0 |
  | `check:no-em-dash` | 0 |
  | `check:source-floor` | 0 |
  | `check:bloom-bands` | 0 |
  | `check:concept-graph` | 0 |
  | `check:map-sources` | 0 |
  | `check:no-answer-keys` | **1**: the single finding is `specs/content/efpg-401/content-spec.md` (its rubric heading matches the answer-key pattern), a different Semester 3 spec in this worktree. EFMP-406 has no match. Not a finding against this course |

  Most gates pass **vacuously** for EFMP-406: `docs/semester-3/efmp-406/` does not exist and the course
  is not in the catalog. They will first bite at G2.
- **Advisory (not a structure failure):** the unbound Spec 008 contract
  (`specs/008-rich-unit-pedagogy/contracts/content-spec-v3.md`) lists a course-level
  `## Course review plan`, plus per-unit `**Worked-examples plan**` and `**International best-practice
  notes**` lines, and this spec has none of them. No bound input requires them: the style guide makes
  `course-review.mdx` optional, and the bound `contracts/` holds only the front-matter schema. The
  drafter may want to add them for parity with EFMP-303.

## 8. decision-residue - pass

These confirmed decisions have a scope that reaches this course. I searched the **whole** spec for the
designs each one supersedes:

- **`D-2026-0070` (every course):**
  - Item 1: the spec does not group several guide units into one; its units are the guide's. The topic
    question is escalated (`G-2026-157`), not residue.
  - Item 3: the spec nowhere plans to write the guide link into `course-overview.mdx` (no
    "course-overview" or guide-PDF text in the spec).
- **`D-2026-0072` (corpus-wide):** no unit has three topics, so "5-8" is correct here.
- **`D-2026-0012` (corpus-wide):** the week schedule is labelled guide-silent, and there is no invented
  calendar anywhere (the unit headers and `## Week schedule` carry no week ranges).
- **`D-2026-0001` (corpus-wide):** it is invoked only for sources the spec says were not retrieved
  (`:43`, `:46`, `:47`), and none is asserted as read.
- **`D-2026-0003`, `D-2026-0005`:** nothing in the spec engages them.
- **`D-2026-0053`:** its scope is Semester 2, so it does not "touch" this course by scope. The spec's
  reliance on it is an extension question, escalated as `G-2026-159`, not residue.

## Drafting notes tested (`:344-351`)

1. **Reading-list fit:** confirmed. The years for Mittler and Loreman are confirmed not to resolve, and
   one more slip was found (the Loreman 2005 title). Escalated as `G-2026-158` and `G-2026-159`.
2. **Assessment project:** confirmed that the guide says "inclusive lesson plan" (`:288`) and "Visits
   to inclusive schools" (`:283`). The spec correctly leaves them unchanged. The same misplacement
   question is folded into `G-2026-158`.
3. **Topic grouping:** confirmed as the drafter's construction. Escalated as `G-2026-157`.
4. **Title:** confirmed as a conflict. Escalated as `G-2026-155`. The note's reading of the catalog
   `_note` overstates what it settles (see section 1).

## Author repairs (guide-determined; no ruling needed)

1. `:26`: also report the guide's `ASSESSMENT CRITERIA` block (`:306-310`) as given.
2. `:45`: the Loreman 2005 first edition's title is *Inclusive Education: A Practical Guide to
   Supporting Diversity in the Classroom*, not the same title.
3. `:57`: add Minott's subtitle, "A confirmatory investigation".
4. `:14`: the title note should not say that the catalog note makes the Scheme decisive for identity
   (gaps header `:23-24`). It can stand once `G-2026-155` is ruled.

## Limits

This record certifies no content, qualifies no reviewer and authorises no publication (Art. VII.8). It
does not add the catalog entry. It binds to manifest digest `0888f607...53faf` at commit `815d59fd`,
and any change to a bound input voids the approvals recorded under `D-2026-0075`.
