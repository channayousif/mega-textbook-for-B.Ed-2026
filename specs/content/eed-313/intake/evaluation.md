# EED-313 intake evaluation record

- **Evaluator:** agent:evaluator
- **Gates:** G0 intake / G1 unit-spec
- **Date:** 2026-09-20
- **Constitution:** Article VII.8
- **Spec under evaluation:** `specs/content/eed-313/content-spec.md` (status: draft)
- **Course guide:**
  `Scheme-and-Course-guides/extracted-text/course-guides-2025/ClassroomMgmt_Sept13.txt`
  (HEC pre-service course guide, 56 pages)

## Manifest verification

- **Bundle:** `specs/content/eed-313/intake/manifest.json`, commit `45fafa8c`
- **Recorded manifest_digest:** `f72884a17c9228d448a945e478caa2ca53bd5f3ea5e6fc909076ab6c0180de25`
- **Verification method:** recomputed with `manifestFor('.', roots)` from
  `scripts/lib/review-evidence.mjs`, using the same `intakeRoots('eed-313')` root set the
  prepare script uses (the manifest's own paths are repo-relative, so root is `.`, not the
  course dir). `roots` are walked against the git index; `/reviews/`, `/intake/`, `tasks.md`
  and `.staging/` are excluded by `bound()`.
- **Result:** **54 inputs**, every path present, every per-input digest matched, no extra and
  no missing entry, and the independently recomputed `manifest_digest` equals the recorded one.
  The `registers` field (`specs/decisions/log.md`, `specs/gaps.md`) also matched.
- **Any change to a bound input voids the approvals below** (Art. VII.8.5).

## Deterministic checks (run at HEAD `45fafa8c`, real exit codes)

| Check | Exit |
|---|---|
| `validate:content` | 0 |
| `check:depth-gate` | 0 |
| `check:figures` | 0 |
| `check:bloom-bands` | 0 |
| `check:concept-graph` | 0 |
| `check:docs-sync` | 0 |
| `check:no-em-dash` | 0 |

These walk `docs/`, which has no authored EED-313 unit yet, so a green gate is evidence of
nothing about this spec's content and is recorded as such. The spec-side invariants
(checklist/topic-list partition, depth-budget arithmetic, figure counts, blueprint bank) are
replayed in the decision entry below, not inferred from the gates.

## Criteria

The governing question for each is the same: **does the course guide determine this?** An
evaluator approves only what the guide settles. Where the guide is silent, self-contradictory,
or in tension with another authority (Art. II.3), the finding is escalated under a `G-` code
and recorded in `specs/gaps.md`; it is not decided here.

### 1. Identity - APPROVED

- **Code/title.** `catalog/courses.json:148-164` records `code: EED-313`, `title_en: Classroom
  Management`, `title_ur: کلاس روم مینجمنٹ`, `credit_hours: 3 (3-0)`, in `tracks[0]` (licence).
  The guide gives the title as "CLASSROOM MANAGEMENT" (`ClassroomMgmt_Sept13.txt:107-108`) and
  the credit total as "3 credits" (`:115`). The 2025 scheme carries the course (confirmed by
  `specs/content/licence-blueprint.md:97`); the 2026 revision restructured it away with no
  successor, which is why it is authored from the licence track. The spec's title and 3-credit
  total match both sources.
- **No Article II.3 conflict.** The credit total (3) agrees; the `(3-0)` split is the catalogue
  expression of the same total, not a contradiction of the guide, which states no split. No
  board Scheme and no second guide conflict on code, title or credits.
- **Why this course exists outside the 2026 degree corpus** is stated at `content-spec.md:13-17`;
  it is context for the licence placement, not an identity claim, and is consistent with the
  licence-blueprint.

### 2. Partition - ESCALATED (see G-2026-20)

- The guide numbers **five** units (`ClassroomMgmt_Sept13.txt:94-102` TOC; `:167`, `:192`,
  `:206`, `:218`, `:244` body): Unit 1 Learning theories; Unit 2 Curriculum; Unit 3
  Routines/schedules/time management; Unit 4 Creating shared values; Unit 5 Course review.
- The spec partitions into **four** units, dropping Unit 5 "Course review"
  (`content-spec.md:76-337`). Unit 5's substance ("How can I use what I have learnt to create the
  classroom I want?", `:247`) is absorbed into Unit 4's integrative ERQ, which asks the reader to
  write "the community-and-care section of their own classroom management plan - the artefact the
  guide's own course review asks for" (`content-spec.md:336-337`).
- **The guide gives numbered units, so the partition must follow them.** A four-unit partition
  is a judgement the guide does not determine; the licence-blueprint's recommendation to drop the
  review unit (`licence-blueprint.md:183`) is a project-level argument, not a reading of the
  guide. Recorded and escalated rather than approved.

### 3. Coverage - APPROVED

Every guide weekly theme appears in exactly one spec sub-topic row, and no row sits under a
heading with no guide ancestor. Verified against the guide's unit outlines:

- **Unit 1** (guide `:168-189`, weeks 1-4) → 19 rows `U1-01..U1-19`. The opening question
  ("Why a course on classroom management?"), the three learning theories, "management as
  maximising learning", the philosophy question, the well-managed-classroom question, the
  observation week (W2), the physical/social features, the discipline/management distinction, the
  environment-choice question, and the four W4 design bullets are each carried once. The W4 bullet
  "Employ physical facilities to enhance the learning environment" and "Build the social
  environment" are merged into `U1-19`, which is a faithful reading of a single design act, not an
  omission.
- **Unit 2** (guide `:193-201`, weeks 5-8) → 9 rows `U2-01..U2-09`. Curriculum-as-management,
  the philosophy-consistent plan, the four-stage cycle (split into `U2-03..U2-06`), and
  differentiation / multigrade / overcrowding each appear once.
- **Unit 3** (guide `:207-216`, weeks 9-11) → 9 rows `U3-01..U3-09`. Routines defined, time
  bought, multigrade and special-needs routines, the three subject-specific routines, and
  co-operation/collaboration each appear once.
- **Unit 4** (guide `:219-238`, weeks 12-15) → 12 rows `U4-01..U4-12`. Community defined,
  participation and its practices, involvement (including the multigrade variant), the ethic of
  care with its two sub-bullets, and accountability / breakdown / unexpected events each appear
  once.
- **Adds nothing.** No sub-topic is introduced that lacks a guide ancestor; the decompositions
  above are of compound guide bullets the guide itself spells out.

### 4. Outcomes - APPROVED

- The guide's six course outcomes (`ClassroomMgmt_Sept13.txt:148-155`) are reproduced **verbatim**
  at `content-spec.md:39-44` (maximizing student learning; identify key features; plan
  lessons/activities/assignments; differentiate by need/interest/level; design predictable
  routines to minimize disruptions; plan for caring and community).
- **Traces hold.** Unit 1 → outcomes 1, 2; Unit 2 → outcomes 3, 4; Unit 3 → outcome 5; Unit 4 →
  outcome 6 (`content-spec.md:80`, `:178`, `:231`, `:284`). Every outcome has at least one unit
  whose guide topics deliver it; no outcome is orphaned and no outcome lacks a guide ancestor.

### 5. Readings - ESCALATED (see G-2026-21)

- The guide lists **six** suggested resources (`ClassroomMgmt_Sept13.txt:250-274`): Canter
  (Assertive Discipline); Evertson & Poole (IRIS Center); **Evertson & Emmer 2009**
  *Classroom Management for Elementary Teachers*; **Henley 2009** *Introduction to Proactive
  Classroom Management*; **Marzano, Marzano & Pickering 2003** *Classroom Management That Works*;
  **Vincent** *The Multigrade Classroom: Book 3*.
- The spec's reading list (`content-spec.md:341-346`) carries three: Canter, Evertson & Poole, and
  **Wong & Wong 1998** (the last drawn from the guide's in-session reading at `:437`, not from the
  suggested-resources list). **Four of the six guide-suggested resources are omitted** (Evertson &
  Emmer, Henley, Marzano, Vincent). The spec notes that "additional sources are gathered per unit
  at authoring time" (`:348`), but the G1 reading criterion asks whether the guide's reading list
  is present in the spec now. It is not. Escalated; `D-2026-0001` governs unretrievable sources.

### 6. Blueprint - APPROVED

- Every unit uses the style-guide-fixed bank of **10 MCQ / 10 RRQ / 5 ERQ**
  (`content-spec.md:161-167`, `:224-225`, `:277-278`, `:335-336`), with MCQ Remember-to-Apply, RRQ
  Understand-to-Analyze, ERQ Analyze-to-Evaluate/Create, and an Analyze-or-higher integrative ERQ.
- Per-topic MCQ/RRQ floors (two per topic) are saturated where the topic count makes them exact
  and leave headroom where it does not; `check:bloom-bands` confirms the band consistency. The
  guide gives no course-specific weighting, so the fallback to the Constitution Art. III.7 default
  (60/40) at `content-spec.md:48-49` is correct.

### 7. Structure - APPROVED

- Front matter (`course_code: EED-313`, `status: draft`) validates against
  `contracts/content-spec-frontmatter.schema.json`.
- Each of the four unit subsections carries the full block set the contracts require: CLO refs,
  key terms, topics, worked-example/activity concepts, assessment blueprint, `### Sub-topic
  checklist`, `### Topic list` (with reading-min and figure IDs), `**Depth budget**`, `**Common
  misconceptions**`, `**Figure plan**`, and `**Unit-end assessment blueprint**`.
- **Checklist/topic-list partition** (replayed directly, since the gates are vacuous for a
  course with no authored unit): for every unit the `Sub-topic IDs` cells form a total, disjoint
  partition of the checklist (no unassigned ID, no ID in two rows, no ID assigned that is not in
  the checklist); every checklist `Topic` cell equals its `### Topic list` row label; every
  `**Depth budget**` sub-topic and topic count matches its own tables; every topic carries two
  figure IDs and every unit at least one concept-map, flowchart or timeline (Art. III.10).
  Zero failures across all four units.

### 8. Decision residue - APPROVED

- Swept the spec for superseded designs. No EFMP-302/304 activity patterns, no `D-2026-0002`/`D-2026-0004`
  superseded practicum design, no `D-2026-0003` inapplicability (the spec cites the extracted-text
  guide, not `.specify/Course_guides_and_Scheme/`). The only cross-course mention is the
  licence-blueprint reference (`content-spec.md:17`), which names a project document, not a
  superseded design. `D-2026-0013` (EFMP-304 open-access floor) is EFMP-304-specific and does not
  apply here. No decision residue.

## Verdict: MIXED

- **Approved:** identity, coverage, outcomes, blueprint, structure, decision-residue.
- **Escalated:** partition (G-2026-20), readings (G-2026-21).
- Because two criteria are escalated, the intake as a whole is **not approved**; the approved
  criteria are recorded under `D-2026-0018` and the escalations block the remainder pending owner
  decision.

## Owner resolution (2026-09-20)

Both escalations were returned to the owner and resolved the same day:

- **G-2026-20 (partition):** owner decided to add Unit 5 back, following the guide's five numbered
  units. The spec now carries Unit 5 "Course review" (Week 16): peer critique and review of the
  classroom management plans built across Units 1 to 4, plus summary and close. Course is now 16
  weeks as 4/4/3/4/1 across Units 1 to 5. Partition criterion **passes**.
- **G-2026-21 (readings):** owner decided to add all four omitted sources. The spec's reading list
  now carries all six guide-suggested resources (Canter; Evertson & Poole; Evertson & Emmer 2009;
  Henley 2009; Marzano, Marzano & Pickering 2003; Vincent) plus Wong & Wong. Readings criterion
  **passes** under `D-2026-0001` (title-level support for unretrievable print monographs).

With both escalations resolved, **all eight criteria pass** and the intake as a whole is
**APPROVED** at G0 intake / G1 unit-spec. `specs/content/eed-313/content-spec.md` may now advance
to `status: approved` and authoring may begin (Spec 006 FR-002).

## Recording

- Decision entry: `D-2026-0018` in `specs/decisions/log.md` (status: pending-owner-review).
- Gap entries: `G-2026-20`, `G-2026-21` in `specs/gaps.md` (both status: resolved).
- Certifies no content, qualifies no reviewer, authorises no publication (Art. VII.8.4).
