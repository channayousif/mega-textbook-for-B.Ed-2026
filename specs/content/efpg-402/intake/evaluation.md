# MFPG-402 G0/G1 intake evaluation

- **Evaluator:** agent:evaluator (fresh session; did not draft this specification)
- **Date:** 2026-11-18
- **Skill:** `.claude/skills/evaluate-intake/SKILL.md` v1.0.0 (Constitution Article VII.8)
- **Specification:** `specs/content/mfpg-402/content-spec.md` (556 lines, `status: draft`)
- **Bundle:** `specs/content/mfpg-402/intake/manifest.json`, prepared at commit `7750c153`
- **Worktree:** `/home/a2ahs/crew-wt/sem4-intake-eval`, branch `content/sem4-intake-eval`, off
  `origin/main` at `fa80a282`
- **Outcome:** **partial.** Decision `D-2026-0091` (pending-owner-review) approves what the guide
  settles. This is the one Semester 4 spec whose unit **and** topic partition the guide fully
  determines. Gaps `G-2026-211`, `G-2026-212`, `G-2026-214` and `G-2026-230` to `G-2026-232`
  escalate the rest.

## Manifest verification

Recomputed with `manifestFor()` from `scripts/lib/review-evidence.mjs` over the
`prepare-intake-evidence.mjs` root set, with `specs/content/mfpg-402` as the course root:

- 56 bound inputs recorded, 56 recomputed, **0 mismatches**.
- `manifest_digest` recorded `3d274dd25268935425c2b73db77e856d4ad91d8080b56791994e9c7c07fe897b`;
  recomputed from the file and from the live tree: identical.
- Registers matched their recorded read-time digests (`ceb73bf9...`, `18ab3a6b...`).

Any change to a bound input voids `D-2026-0091`.

## Criteria

Guide: `Scheme-and-Course-guides/extracted-text/4TH SEMESTER.txt`, Teaching of Science block
`:714-833`. Scheme: `B.Ed 4 Year 2026 revised after board.txt` (cited as `Scheme:N`).

### 1. identity - code escalated (Article II.3, `G-2026-230`); no catalog entry (`G-2026-211`)

- Guide: "TEACHING OF SCIENCE", Credit Hours `3 (3+0)`, "Course Category: Pedagogy Course",
  "Course code: EFPG-402" (`:719-722`). The block itself states no semester; it sits in the
  4th-semester file.
- Scheme: Semester IV row 7, `MFPG-402`, "Teaching of Science", `3 (3-0)`, "Major: Pedagogy
  Course - II", STE (`Scheme:369-380`).
- Title, credit hours and category agree. **The codes conflict: EFPG-402 against MFPG-402.**
  - The spec adopts the Scheme's code as "final authority" and notes that EFPG fits the pedagogy
    series (`:12`, drafting note 1).
  - The owner's general precedence rule (`gaps.md:9-24`) says each guide-vs-scheme conflict "was
    still decided on its own merits by the owner". `G-2026-02` is the case where the guide's code
    won.
  - So this is not mine to settle. Escalated as `G-2026-230`.
- The catalog has no entry. The `title_ur` "سائنس کی تدریس" is the drafter's proposal. Escalated
  in `G-2026-211`.

### 2. partition - pass (units and topics)

- The guide names eight units with weeks (`:738`, `:746`, `:754`, `:764`, `:772`, `:780`, `:789`,
  `:797`): two weeks each across Weeks 1-16. Every section is numbered N.k (`:740-803`).
- The spec has eight units in order, and each topic teaches its guide section, Topic N.k = section
  N.k (`:70-81`). That is exactly `D-2026-0070` item 1. **Approved, at unit and topic level.**
- Topic counts are 5, 5, 7, 5, 5, 6, 5 and 5. They follow from the guide, not from a drafter
  choice.

### 3. coverage - pass, except one silent rewording (`G-2026-232`)

Each of the guide's 43 sections (`:740-803`) has at least one row; replayed with the gate's parsers
and by hand. Where a section names two or three methods or practices, the spec gives each its own
row under the same section and topic (for example 3.1 gives U3-01 lecture and U3-02 discussion;
5.2 gives three lesson-plan types). That divides the section; it adds nothing. The glosses at
U1-02..04, U2-03 "(topical, concentric, spiral)" and U7-03 "(including practical and performance
assessment)" add no sub-topic.

- **U6-01 changes the guide's level.** The guide's "Importance of the science laboratory in
  secondary education" (`:782`) becomes "... in school education". U1-05 and U2-02 keep
  "secondary" with a note. This belongs to the level question in `G-2026-232`.
- The practicum tasks (`:805-810`) carry no row and are routed to `## Practicum plan`. The guide
  prints them under "Assessment criteria", so they are course-level practical work. Approved.

### 4. outcomes - pass

The six guide objectives (`:729-735`) are quoted verbatim (`content-spec.md:20-26`). Each unit's
SLOs restate its own sections and name their objectives, from Unit 1 (objective 1) through Unit 8.
No SLO lacks an ancestor. Objective 2's "secondary level" is part of `G-2026-232`.

### 5. readings - escalated (`G-2026-212`, `G-2026-231`)

| Guide entry (`:814-833`) | Verified |
|---|---|
| Das, "Science Teaching in Schools", Sterling (`:816`) | Open Library `OL13678681W`, confirmed |
| Yadav, "Teaching of Science", Anmol (`:821`) | Open Library `OL10226886W`, confirmed |
| Kochhar, "Teaching of Science", Sterling (`:818`) | Open Library search: 0 results. The spec binds it title-level. |
| Aggarwal, "Teaching of Science", Vikas (`:820`) | Only "Teaching of Political Science and Civics" found. The spec binds it title-level. |
| Kulshreshtha (`:817`), Vaidya (`:819`) | Not found per the spec; Kulshreshtha left unbound, Vaidya bound title-level |
| NCERT position paper and textbooks (`:814-815`), Indian journals (`:824-826`), Indian websites (`:829-831`, `:833`) | Indian curriculum documents. Left unbound. |
| Khan Academy (`:832`) | HTTP 200 |

- Binding title-level works that no registry shows (Kochhar, Aggarwal, Vaidya) stretches
  `D-2026-0001`. That ruling covers a source that cannot be **retrieved**, not one that cannot be
  **identified**. GCCE-400's spec draws the line correctly; this spec does not.
- The spec substitutes Pakistan's National Curriculum 2022-23 and the Sindh DCAR curriculum for the
  guide's NCERT material (drafting note 4). That is sound for the cohort, but the guide does not
  make that choice.
- Both are escalated in `G-2026-231`.

**Author-selected rows:**

| Key | Verified |
|---|---|
| `khan-2019-low-cost` | Crossref `10.36902/sjesr-vol2-iss2-2019(33-47)`: Khan et al., SJESR, 2019; OpenAlex `W2995687045`, diamond |
| `minhas-2025-lab` | OpenAlex `W7223721518`, 2025, diamond, no DOI. The spec already flags its locator as to be confirmed. |
| `unesco-2017-esd` | Crossref `10.54675/CGBA9153`: "Education for Sustainable Development Goals: learning objectives", 2017 |
| `ncp-science-2022` | ranged GET 206, application/pdf |
| `dcar-science-4-8` | HTTP 200 |
| `sep-scientific-method` | SEP |
| `bscs-2006-5e`, `cpsc-niosh-2006` | Not reachable from this host on 2026-11-18 (timeout, 403). Not a defect at G0/G1 (`D-2026-0001`). |

Every unit maps an open-access row, but under `D-2026-0053` item 2 (`:38`), which is scoped to
Semester 2 (`G-2026-212`).

### 6. blueprint - pass except the formative lines

- Every unit has five to seven topics. Each states "formative 3 per topic" (15, 15, 21, 15, 15, 18,
  15, 15), extending `D-2026-0072` "as for EFPG-401". Escalated in `G-2026-214`. This is the
  course where the question matters most: 21 items in Unit 3.
- With more than five topics, the unit-end floors drop to ">= 1 per topic" (drafting note 2), which
  is internally consistent with 10 MCQs and 10 RRQs. ERQs spread 5 over the topics with at least
  one integrative item.
- Every summative names an Analyze-or-higher item: Analyze (Units 1, 6), Evaluate (Units 2, 3),
  Create (Units 4, 5, 7, 8).
- 2 figures per topic, with a schematic in every unit. Topic reading-minutes (6-9 each) sit
  inside each band.
- The guide gives practicum tasks but no weighting (`:805-810`), so the 60/40 default applies.

### 7. structure - pass

- All 14 `CONTENT_GATES` exit 0 (tree-wide run on 2026-11-18; see
  `specs/content/gcce-400/intake/evaluation.md`, criterion 7).
- Front matter validates.
- Partitions, topic cells, depth counts and per-unit blocks replay clean in all eight units.
- Figure IDs are unique and contiguous, and archetypes match.

### 8. decision-residue - not approved (escalated)

| Entry | Status in the spec | Verdict |
|---|---|---|
| `D-2026-0070` item 1 | Followed exactly at unit and topic level | No residue |
| `D-2026-0072` | Extended to every unit (5-7 topics) | Escalated, `G-2026-214` |
| `D-2026-0053` item 2 | Relied on in Semester 4 | Escalated, `G-2026-212` |
| `D-2026-0001` | Stretched to bind three books no registry shows | Escalated, `G-2026-231` |
| `D-2026-0003`, `D-2026-0012`, `D-2026-0081` | No superseded design present | No residue |

## Out of scope, noted only

Drafting note 5 (overlaps with EFMP-408 and EFPG-401) and drafting note 6 (US safety guidance
presented as context, not as Pakistani law) are authoring matters.

## Blocked until the owner rules

| Gap | What it blocks |
|---|---|
| `G-2026-211` | the catalog entry |
| `G-2026-212` | the Author-selected table and `open_access_floor` as a binding floor |
| `G-2026-214` | the formative line of all eight units |
| `G-2026-230` | the course code, and with it the docs path, catalog entry and every SLO ID |
| `G-2026-231` | the Guide-listed table and the readings criterion |
| `G-2026-232` | U6-01's wording, and the level at which U1-05, U2-02 and objective 2 are taught |
