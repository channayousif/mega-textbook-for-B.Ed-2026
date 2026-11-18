# EFMP-408 G0/G1 intake evaluation

- **Evaluator:** agent:evaluator (fresh session; did not draft this specification)
- **Date:** 2026-11-18
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (Constitution Article VII.8)
- **Specification:** `specs/content/efmp-408/content-spec.md` (424 lines, `status: draft`)
- **Bundle:** `specs/content/efmp-408/intake/manifest.json`, prepared at commit `7750c153`
- **Worktree:** `/home/a2ahs/crew-wt/sem4-intake-eval`, branch `content/sem4-intake-eval`, off
  `origin/main` at `fa80a282`
- **Outcome:** **partial.** Decision `D-2026-0088` (pending-owner-review) approves what the guide
  settles. Gaps `G-2026-212`, `G-2026-214`, `G-2026-221`, `G-2026-222` and `G-2026-223` escalate
  the rest. Two small author repairs are listed at the end.

## Manifest verification

Recomputed with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
`prepare-intake-evidence.mjs` root set, with `specs/content/efmp-408` as the course root:

- 56 bound inputs recorded, 56 recomputed, **0 mismatches**.
- `manifest_digest` recorded `b7cedb683c20f7cc11df7ffce8c585092dce5d008c7d0e7565fda66c3052b1be`;
  recomputed from the file and from the live tree: identical.
- Registers matched their recorded read-time digests (`ceb73bf9...`, `18ab3a6b...`).

Any change to a bound input voids `D-2026-0088`.

## Criteria

Guide: `Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt`, EFMP-408 block `:194-302`.
Scheme: `B.Ed 4 Year 2026 revised after board.txt` (cited as `Scheme:N`).

### 1. identity - pass

- Guide: `EFMP-408`, Semester-IV, Credit Hours `03` (`:200`), "Educational Assessment and
  Evaluation (EA & E)" (`:202`).
- Scheme: Semester IV row 3, `EFMP-408`, "Educational Assessment and Evaluation", `3 (3-0)`,
  "Major: Professional Course - VIII" (`Scheme:333-343`).
- `catalog/courses.json` Semester 4 already carries `EFMP-408`, "Educational Assessment and
  Evaluation", `title_ur` "تعلیمی جانچ اور تشخیص", `3 (3-0)`, "Major: Professional". It agrees with
  both. **This is the only Semester 4 course whose identity criterion passes in full.**

### 2. partition - escalated (`G-2026-222`)

- The guide is a bare 16-week table (`:216-280`). The skill makes any grouping a judgement the
  guide does not determine.
- Proposed partition, recorded for the owner (drafting note 2, `:419`): six units over Weeks 1-2,
  3-4, 5-7, 9-10, 11-12 and 13-15. Topics split some weeks: Week 2 becomes Topics 1.2 and 1.3;
  Week 4 becomes 2.2 and 2.3; Week 7 becomes 3.3 and 3.4; Week 9 becomes 4.1 and 4.2; Week 12
  becomes 5.2 and 5.3. This gives topic counts of 3, 3, 4, 3, 3 and 4, with Topic 6.4 added (see
  criterion 3).
- **Approved within the partition:** Weeks 8 and 16 (`:247-249`, `:278-280`) are review and
  examination, and carry no row (`D-2026-0059`, `D-2026-0063` precedent).

### 3. coverage - pass for the guide's rows; Topic 6.4 escalated (`G-2026-221`)

Checked by hand against the guide. The spec cites week ranges rather than single lines:

| Unit | Guide lines | Rows | Notes |
|---|---|---|---|
| 1 | `:217-220`, `:222-224` | U1-01..09 | "formative vs summative" and "norm- vs criterion-referenced" are each split into two rows |
| 2 | `:226-228`, `:231-234` | U2-01..07 | |
| 3 | `:236-238`, `:240-242`, `:244-246` | U3-01..11 | "essays, short answers" and "MCQs, true/false, matching" are split by item type |
| 4 | `:251-253`, `:255-257` | U4-01..09 | "portfolios and projects", "analytic & holistic", "peer and self" are each split |
| 5 | `:259-261`, `:263-265` | U5-01..07 | "difficulty index, discrimination index" is split |
| 6 | `:267-269`, `:271-273`, `:275-277` | U6-01..09 | |

- Every guide item is reached. The splits divide a listed pair into its members; they add no
  sub-topic.
- **One guide item has no row of its own:** Week 6 "Advantages & limitations" (`:241`) of
  subjective items. It is carried only in U3-04's wording "what they assess well" and in SLO 3-2
  "knowing their limits". Author repair, guide-determined: name it in the checklist.
- **Topic 6.4 (U6-10, U6-11, U6-12) is an addition.** The spec states that "Assessment policies
  and practices in Pakistani schools" is "not in the 2026 `EFMP-408` outline" and was added "by
  owner decision on 2026-09-13" to carry licence objective 5 (`:67-85`, `:357-359`, drafting note
  4 `:421`).
  - The sources the spec names exist: `course-guides-2025/ClassroomAssess_Sept13.txt:264-296`
    (Standard 5, test-based versus assessment-based cultures) and `:345` (the policy-and-practice
    section). The blueprint maps the objective to `EFMP-408; EFMP-303` (`licence-blueprint.md:254`).
  - **No owner decision of 2026-09-13 on this point is recorded** in `specs/decisions/log.md` or
    in any bound input. The 2026-09-13 entries in `licence-blueprint.md` (`:19`, `:118-122`,
    `:343`) concern the 2025 guides' supply and storage, not this topic.
  - An addition resting on an unrecorded ruling cannot be approved, however likely the ruling is.
    Escalated as `G-2026-221`.

### 4. outcomes - pass, except SLO 6-4

The six guide outcomes (`:208-213`) are reproduced in substance (`content-spec.md:28-35`; the spec
calls them "paraphrased", but the wording changes are only typographic). SLOs 1-1 to 6-3 restate
their units' guide items and name ancestors (Unit 1 outcomes 1 and 6; Unit 2 outcome 3; Unit 3
outcomes 2 and 4; Unit 4 outcome 5; Unit 5 outcome 6; Unit 6 outcomes 2 and 5). SLO 6-4 is Topic
6.4's outcome and has no guide ancestor. It follows `G-2026-221`.

### 5. readings - escalated (`G-2026-212`, `G-2026-223`)

The guide prints four bare links (`:299-302`). Checked 2026-11-18:

| Line | Result |
|---|---|
| `:299` | Downloaded. PDF metadata and title page: "Educational Evaluation, Assessment, and Monitoring", Scheerens, Glas and Thomas, 425 pp. It is a real book, so the spec's `scheerens-2003` matches. It is a copyrighted book on an unrelated repository, so not linking it is sound. |
| `:300` | Utkal DDCE "CORE_5.pdf": HTTP 403 to scripted requests, as the spec reports. It is not identified. |
| `:301` | A Scribd user upload, "book 1", with no author or publisher |
| `:302` | A SlideShare user deck |

One of four guide entries identifies a work. The rest are unidentified or not citable. The
course's substantive sources are the author-selected rows:

| Key | Verified |
|---|---|
| `hec-2013-classroom-assessment` | HEC PDF HTTP 200; its text is bound as `course-guides-2025/ClassroomAssess_Sept13.txt` |
| `hec-2013-testdev` | Bound as `course-guides-2025/TestDevEval_Sept13.txt` |
| `seifert-sutton-2009` | Open Textbook Library record HTTP 200 |
| `openstax-statistics-2e` | HTTP 200 |
| `npstp-2009` | Teacher Task Force record returned HTTP 403 here. Not a defect at intake (`D-2026-0001`). |

Every unit maps an open-access row, but on the basis of `D-2026-0053` item 2 (`:391`), which is
scoped to Semester 2 (`G-2026-212`). Whether a guide list with one usable entry may be replaced
in substance by author-selected sources, and whether the guide's list should be corrected at
source, is escalated as `G-2026-223`.

### 6. blueprint - pass except the four-topic formative lines and one ERQ count

- Three-topic Units 1, 2, 4 and 5 state formative 9, applying `D-2026-0072`. **Four-topic Units 3
  and 6 state 12** (`:193`, `:339`), extending it. Escalated in `G-2026-214`.
- Every summative names an Analyze-or-higher item: Analyze (Units 1, 5), Evaluate (Units 2, 6),
  Create (Units 3, 4).
- Banks are 10/10/5. MCQ and RRQ ">= 2 per topic" fits.
- **Unit 1's ERQ distribution sums to 4, not 5.** It reads "one ERQ per topic plus an integrative
  item" over three topics (`:134-136`), and Unit 2 adopts it "on the pattern above" (`:181`).
  Author repair, guide-independent: place the fifth ERQ.
- The unit-end lines give no Bloom bands. The style guide's bands (`style-guide.md:247-250`)
  bind regardless; stating them is a recommendation.
- 2 figures per topic, with a concept-map, flowchart or timeline in every unit.
- The depth budgets (60-115 reading-min) are larger than in the other Semester 4 specs. That is
  consistent with 3 credits and sixteen licence objectives (drafting note 5), and it is not a
  defect.

### 7. structure - pass

- All 14 `CONTENT_GATES` exit 0 (tree-wide run on 2026-11-18; see
  `specs/content/gcce-400/intake/evaluation.md`, criterion 7).
- Front matter validates against `contracts/content-spec-frontmatter.schema.json`.
- In all six units the topic lists partition the checklist totally and disjointly, topic cells
  match, and depth-budget counts match.
- Every unit carries CLO/SLO refs, Key terms, Common misconceptions, Assessment blueprint,
  Prerequisite knowledge, Mapped readings, Figure plan and Unit-end blueprint, and a
  `**Worked-example concept**` line.
- The spec has no `**Topics**` line and writes its figure plan as a paragraph. The bound style
  guide requires neither form (it requires a `**Figure plan**` naming archetypes, `:515`), so
  this is not a defect.
- **Observation:** Units 1 and 4 skip `fig-U1-4` and `fig-U4-4`. The IDs are unique and
  well-formed, which is what `style-guide.md:508-509` requires; contiguity is not required.

### 8. decision-residue - not approved (escalated)

| Entry | Status in the spec | Verdict |
|---|---|---|
| `D-2026-0070` item 1 | Invoked for grouping a bare week table | Escalated, `G-2026-222` |
| `D-2026-0072` | Applied to three-topic units; extended to Units 3 and 6 | Escalated, `G-2026-214` |
| `D-2026-0053` item 2 | Relied on in Semester 4 | Escalated, `G-2026-212` |
| "owner decision 2026-09-13" | Cited for Topic 6.4; no recorded entry | Escalated, `G-2026-221` |
| `D-2026-0001`, `D-2026-0003`, `D-2026-0012`, `D-2026-0081` | No superseded design present. The 2025 HEC guides are in `Scheme-and-Course-guides/extracted-text/course-guides-2025/`, not the superseded `.specify` folder. | No residue |

## Blocked until the owner rules

| Gap | What it blocks |
|---|---|
| `G-2026-212` | the Author-selected table and `open_access_floor` as a binding floor |
| `G-2026-214` | the Unit 3 and Unit 6 formative lines |
| `G-2026-221` | Topic 6.4 (U6-10..12), SLO 6-4, fig-U6-7/8, and licence objective 5's placement |
| `G-2026-222` | the six-unit grouping and every topic list; criteria 3, 4 and 6 are approved for the partition as drafted |
| `G-2026-223` | the Guide-listed table and the readings criterion |

**Author repairs, with no owner ruling needed:**

1. Give guide item `:241` "Advantages & limitations" (of subjective items) an explicit place in
   the Unit 3 checklist.
2. Make the Unit 1 (and Unit 2) ERQ distribution sum to 5.
