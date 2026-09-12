# Feature Specification: Content Authoring Pipeline

**Feature Branch**: `006-content-pipeline`
**Created**: 2026-08-24
**Status**: Draft
**Input**: User description: "after teacher dashboard, go for @SDD/006-content-pipeline.md, refine the feature further after evaluating the file"

## G3/G5 review delegation (2026-09-11 amendment)

Constitution v3.0.0 Article III.2/VII and
[ADR-0019](../../history/adr/0019-independent-agents-for-g3-g5-review.md) supersede the
human-only execution requirements in this document **only after delegated review is enabled**.
G0 course-intake approval and unresolved guide/terminology decisions remain with the curriculum
owner. Existing three-state trackers and latest-row-wins behavior remain.

A qualified independent agent may then satisfy G3/G5 without per-unit human countersignature,
using authenticated, input-bound evidence and an enabled reviewer identity. A non-empty
reviewer field alone is insufficient. G5 requires a complete translation and accepted G3
evidence for the identical English inputs. `translation_status: reviewed` cannot be set
on an advisory report.

**Current runtime:** Feature 014 installs callable reviewers, manifest/report tooling and
pipeline enforcement for signed agent evidence. The registry is empty pending actual reviewer
qualification and protected signing-host provisioning. Human sign-off remains operative;
reviewers can emit advisory reports now. See the [Feature 014 contract](../014-agent-review-governance/contracts/review-evidence.md)
for qualification, signatures and tracker references. References below to human review describe
the retained human path; a non-empty reviewer string no longer authorizes an agent pass.

## Clarifications

### Session 2026-08-24

- Q: How strictly should this pipeline's own quality gates (content-spec approval, task-tracker
  accuracy, terminology-bank conformance) be enforced? → A: A new automated CI gate — a merge is
  blocked unless the target unit's task-tracker row reads "done," its course's content-spec is
  marked approved, and (for a unit touching Urdu) its terms conform to the terminology bank. This
  is new build tooling scoped to this feature, in addition to Spec 001's existing validators.
- Q: Does this spec's Definition of Done include authoring content for all of Semesters 1–4, or
  does it stop at proving the pipeline on the EFMP-301 golden unit? → A: Pipeline-proof only —
  Done is the frozen style guide/terminology bank v1, EFMP-301's approved content-spec and
  course-overview, EFMP-301 Unit 1 published bilingual through every stage, and one test suggestion
  flowing G8 end-to-end. Rolling out to the remaining Sem 1–4 courses is subsequent execution
  tracked through this pipeline's own task trackers, not a closing condition of this spec.
- Q: How should quiz-bank/answer-key authoring at the Assets stage (G6) be handled? → A: Add a
  lightweight, non-repo staging format — a git-ignored per-unit worksheet (question stem, options,
  correct answer, Bloom tag) that formalizes the handoff from content author to whoever performs
  the manual `quiz_items`/`answer_keys` entry in Studio. It is never committed to the content
  repository.
- Q: What are the valid values for a task-tracker row's status mark (▢/▣/✅), and which value does
  the FR-016 CI gate treat as satisfying its "done" condition? → A: A 3-value enum — not-started
  (▢) / in-progress (▣) / done (✅) — matching the three symbols already used in the draft; the CI
  gate's tracker check (FR-016a) passes only on `done`.
- Q: FR-012/FR-016 require catching answer-key content before it's committed — since parsing
  arbitrary prose for "is this an answer key" isn't reliably automatable, what should the CI check
  actually do? → A: A keyword/pattern scan — CI greps every changed file in a PR against a
  maintained list of answer-key-shaped markers (e.g. "correct answer", "answer key", "marking
  scheme"), across all committed content, not just the quiz staging worksheet path. A match blocks
  merge until a human confirms it's a false positive or removes the content; the pattern list is
  heuristic (can false-positive/negative) and is maintained alongside the style guide.
- Q: FR-011 says an accepted suggestion "creates a revision task that re-enters the pipeline" —
  what is a Revision Task as a tracked artifact? → A: New row(s) appended to the same course
  `tasks.md` tracker (FR-005) used for first-time drafting, tagged with the originating
  suggestion's identifier and the target re-entry stage (G2 for a content fix, G4 for a
  translation fix). No new artifact type or file; the same FR-016 CI gate applies to these rows
  exactly as it does to any other unit row.
- Q: FR-016b requires CI to check that a course's `content-spec.md` "is marked approved" — how is
  that approval state represented in the file? → A: A front-matter field — `content-spec.md`
  carries YAML front matter with `status: approved` (mirroring the `draft`/`reviewed` pattern
  Spec 001 already uses for `translation_status`), so CI reads one structured field rather than
  parsing prose.
- Q: Where does a "Unit Spec" (G1 output: CLO refs, key terms, activity concepts, assessment
  blueprint) live as a file? → A: As a per-unit subsection inside the course's single
  `content-spec.md` — not a separate file per unit — keeping one course-level file and one
  approval flag (FR-002/FR-016b) consistent with the rest of the pipeline's single-file-per-course
  artifacts.
- Q: FR-016c checks that a unit's Urdu "terms conform to terminology.csv" — since scanning
  free-form Urdu prose for every bank term isn't reliably automatable, what should the check
  actually compare? → A: A structured comparison only — each unit's G1 key-terms list (already
  part of its Unit Spec subsection) is recorded as a front-matter array; CI checks only that each
  listed term's UR translation in the drafted unit matches `terminology.csv`, not a full-text scan
  of the prose.
- Q: FR-017's Definition of Done requires "the frozen style guide and terminology bank v1" — what
  does "frozen" mean operationally? → A: A version field — `style-guide.md` carries a
  `version: 1.0` front-matter field that is the single authoritative freeze marker for both
  artifacts (the two are always versioned/frozen together as a pair); freezing v1 means that field
  is set, and any further edit to either document requires bumping the version — a checkable file
  state, not a process-only claim.

## Overview

At full scale this project is 40+ courses × ~8 units × 5 files × 2 languages — roughly 3,000+
documents. Without a repeatable assembly line, that scale collapses into ad hoc, untraceable
authoring. This feature defines the pipeline that turns an official course guide
(`Scheme-and-Course-guides/`) into published, review-gated, bilingual units on the platform built
in Spec 001, and the loop that lets an accepted teacher suggestion (Spec 005) re-enter that same
pipeline as a revision. It is a process/workflow specification: its "system" is a fixed set of
stages, required artifacts, and review gates that every course and unit must pass through — not a
new application surface.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Turn a course guide into an approved content-spec (Priority: P1)

The curriculum owner (or an author working on their behalf) takes one official course guide and
produces a `content-spec.md` that lists every unit, maps each to the guide's CLOs/SLOs, and
carries forward the guide's teaching strategies, practical work, recommended resources, and
assessment criteria (with the 60/40 GECE weighting). The curriculum owner approves it before any
unit under that course may be drafted.

**Why this priority**: Every later stage depends on this artifact existing and being accurate —
without it, nothing downstream has a traceable source of truth, and Constitution Art. II.2
forbids drafting a unit that doesn't trace to a guide item.

**Independent Test**: Take one course guide with no prior content-spec, produce
`specs/content/<course-code>/content-spec.md` and a `course-overview.mdx`, and have the
curriculum owner approve it — independent of any unit drafting.

**Acceptance Scenarios**:

1. **Given** a course guide with a unit list, CLOs, and the enriched 2026 sections (teaching
   strategies, practical work, assessment criteria, recommended books), **When** the content-spec
   is produced, **Then** every unit is mapped to at least one guide CLO/SLO and every guide
   section listed above appears in the content-spec or the course-overview.
2. **Given** a course guide that is silent or ambiguous on a required section, **When** the
   content-spec is drafted, **Then** the gap is logged in `specs/gaps.md` and escalated to the
   curriculum owner rather than invented, and the affected unit is not drafted until it resolves.
3. **Given** an unapproved content-spec, **When** anyone attempts to start drafting a unit under
   that course, **Then** the attempt is rejected/paused pending approval.

---

### User Story 2 - Draft an English unit through the review gate (Priority: P1)

A content author drafts one unit's five files (`index.mdx`, `activities.mdx`, `formative.mdx`,
`summative.mdx`, `teacher-notes.mdx`) from its course's content-spec — specifically that unit's own
subsection (its unit spec) within it — folding every relevant
course-guide section into the correct file per the fixed mapping, and the draft clears the
Content gate (Constitution Art. VII): traceability, readability, citations, Bloom's tags, and
guide-section fidelity all pass.

**Why this priority**: This is the core value of the feature — the actual textbook content. A
pipeline that cannot reliably turn a spec into a gate-passing draft has no reason to exist.

**Independent Test**: Starting from an approved content-spec and a written unit spec, draft one
unit's five files and run it through the Content gate in isolation, without needing translation
or publishing to have completed something checkable.

**Acceptance Scenarios**:

1. **Given** a unit spec with CLO refs, key terms, and an assessment blueprint, **When** the EN
   draft is produced, **Then** all five files exist, follow the golden template (Spec 001 §6.9),
   and every guide section from §2's mapping lands in its designated file with none invented and
   none duplicated into a new file type.
2. **Given** a completed EN draft, **When** it is submitted to the Content gate, **Then** it is
   checked against `specs/content/style-guide.md` and the terminology bank, and is only marked
   passed once traceability, readability, citations, Bloom's tags, and guide-section fidelity all
   hold.
3. **Given** a unit whose assessment blueprint deviates from the 60/40 default or the 5–8 item
   formative / mixed-constructed-response summative pattern, **When** it reaches the Content gate,
   **Then** the deviation is only accepted if justified in the unit spec.

---

### User Story 3 - Produce and review the Urdu counterpart (Priority: P2)

A translator produces a full Urdu draft of an EN-gated unit (machine-translation-assisted is
permitted), consulting the terminology bank for every term choice, and a human Urdu reviewer then
performs a register/terminology pass before the unit is marked `translation_status: reviewed`.

**Why this priority**: Bilingual parity is a non-negotiable product promise (Constitution Art.
III.2), but it is naturally sequenced after an EN draft exists and gates independently of it.

**Independent Test**: Take any unit that has already cleared the EN Content gate, run it through
UR translation and UR review alone, and confirm it is marked `reviewed` with terminology-bank
conformance.

**Acceptance Scenarios**:

1. **Given** an EN-gated unit and the terminology bank, **When** the UR draft is produced, **Then**
   every bank-covered term uses the bank's `term_ur` value, and any conflict is escalated to the
   curriculum owner and resolved in the bank.
2. **Given** a UR draft, **When** the human reviewer performs the register/terminology pass,
   **Then** the unit is only marked `translation_status: reviewed` after that human pass, never
   from machine translation alone.
3. **Given** a course flagged `bilingual: false` (Constitution Art. III.2 carve-out), **When** its
   units reach this stage, **Then** UR translation/review is skipped without blocking publish.

---

### User Story 4 - Track pipeline progress for a course (Priority: P2)

Anyone checking a course's authoring status opens its `tasks.md` task tracker and sees one row per
unit per stage, each marked with a status and reviewer initials, as the single place that reflects
true progress — no separate spreadsheet or chat thread required.

**Why this priority**: At 3,000+ document scale, progress that lives only in memory or scattered
threads becomes invisible and unmanageable; the tracker is what makes the pipeline auditable
day-to-day, but it has no value until Stories 1–2 exist to generate rows worth tracking.

**Independent Test**: With a course partway through its units at different stages, open its
`tasks.md` and confirm the visible status of every unit/stage combination matches its actual
state, without cross-referencing any other document.

**Acceptance Scenarios**:

1. **Given** a course with several units at different stages, **When** the tracker is opened,
   **Then** every unit has one row per stage showing status (▢/▣/✅) and reviewer initials.
2. **Given** a unit's stage status changes, **When** the tracker is next opened, **Then** the new
   status is reflected with no other document needing to be checked to confirm it.

---

### User Story 5 - Close the loop on an accepted suggestion (Priority: P3)

An admin has accepted a teacher's improvement suggestion (Spec 005). That acceptance creates a
revision task that re-enters the pipeline at the appropriate stage (G2 for a content fix, G4 for a
translation fix), carries the originating suggestion's identifier through drafting and review, and
the suggestion's status is updated to `published` once the fix ships.

**Why this priority**: This closes Spec 005's feedback loop, which explicitly blocks on this
feature to exist — but it depends on Stories 1–3's drafting/review machinery already working, so
it is the last piece to prove.

**Independent Test**: Seed one accepted suggestion, open a revision task from it, carry it through
the relevant re-draft/re-review stage, publish the fix, and confirm the suggestion's status
updates to `published` with the identifier traceable at every step.

**Acceptance Scenarios**:

1. **Given** a suggestion with `status='accepted'`, **When** a revision task is opened, **Then**
   the task references that suggestion's identifier and targets the correct existing unit/section.
2. **Given** a revision task in progress, **When** it clears the same gate its stage requires
   (Content gate for a G2 fix, UR review for a G4 fix), **Then** it publishes exactly like a new
   unit would, and the originating suggestion's status moves to `published`.

---

### Edge Cases

- A course guide is missing or ambiguous on a section this pipeline requires (e.g., no
  "Suggested Practical Activities"): the gap is logged in `specs/gaps.md` and escalated — never
  invented — and the affected unit does not proceed past G0/G1 until resolved (Constitution Art.
  II.3; this pipeline's existing open gaps include GNAS/GPKS/GUHQ/GSOS code and placement
  mismatches).
- A course is flagged `bilingual: false`: G4/G5 are skipped for all its units, and its `ur` route
  falls back to English without the "not yet available" banner (Spec 001 FR-003 exception).
- A translator's chosen Urdu term conflicts with the terminology bank: escalated to the curriculum
  owner, who resolves it and updates the bank so the conflict does not recur.
- A unit's assessment blueprint needs to deviate from the 60/40 / formative-summative defaults:
  permitted only with a justification recorded in the unit spec, not silently.
- A quiz item's correct answer is accidentally drafted into a committed file (index/activities/
  summative/teacher-notes/quiz staging worksheet): this must never reach G7 publish — the CI gate's
  answer-key keyword/pattern scan (FR-016d) blocks the merge pending human confirmation; answers
  exist only in the backend `quiz_items` store (Spec 003) once manually entered from the staging
  worksheet.
- The answer-key keyword scan (FR-016d) flags a false positive (e.g. a unit legitimately
  discussing what makes a good "answer key" in a pedagogy context): the human reviewer confirms
  it's a false positive and the merge proceeds — the scan blocks-pending-review, it does not
  hard-fail irreversibly.
- A unit's task-tracker row is stale or missing when its PR is opened: the CI gate (FR-016) blocks
  the merge until the tracker is updated to "done" with reviewer initials — it does not merge on
  trust that the tracker will be updated later.
- A term in a unit's declared key-terms list is entirely absent from the terminology bank (not
  merely conflicting): the CI gate's structured comparison (FR-016c) flags it rather than silently
  passing or blocking outright, and the curriculum owner adds the term to the bank before the unit
  re-submits. A term outside that declared list is a human-only concern at UR review (Story 3),
  not something the CI gate checks.
- A revision task originates from a suggestion that is later re-opened or reversed by the admin
  before the fix ships: the revision task is withdrawn rather than published, and the suggestion
  keeps whatever status the admin set.
- A unit spec calls for a practical activity the guide never listed: not authored — "Suggested
  Practical Activities" is optional and only appears when the guide provides it (Constitution Art.
  III.6).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The pipeline MUST define a fixed, ordered sequence of stages per unit — course
  intake, unit spec, EN draft, EN review, UR translation, UR review, assets, publish — each with
  an explicit primary/reviewer owner and a required output artifact; a unit MUST NOT advance to a
  later stage before the prior stage's required output exists and, where a gate applies, passes
  it.
- **FR-002**: Every course MUST have an approved `specs/content/<course-code>/content-spec.md`
  before any unit under it may be drafted. Approval MUST be recorded as a `status: approved`
  front-matter field on the content-spec file (mirroring Spec 001's `draft`/`reviewed`
  `translation_status` pattern). The content-spec MUST map every unit to the source guide's
  CLOs/SLOs and MUST list the guide's recommended books/resources, teaching/instructional
  strategies, and practical-work items as its starting reference set. Each unit's own G1 output
  (CLO refs, key terms, worked-example ideas, activity concepts, reading materials, assessment
  blueprint) MUST live as that unit's dedicated subsection within this same `content-spec.md`,
  not as a separate per-unit file.
- **FR-003**: Every course MUST produce a `course-overview.mdx` carrying its course-wide items —
  teaching strategies, assessment criteria (with the 60/40 weighting default), practical work, and
  recommended resources — so that individual units link to it instead of repeating it.
- **FR-004**: Course-guide sections MUST fold into the five existing per-unit files per this fixed
  mapping, and no new per-unit file type may be introduced to hold them:
  | Guide section | Destination |
  |---|---|
  | Teaching/Instructional Strategies | `teacher-notes.mdx` + course-overview |
  | Suggested Practical Activities (optional) | `activities.mdx`, flagged optional |
  | Suggested Instructional/Reading Materials | `index.mdx` "Further reading" + `resources[]` front matter |
  | Practical Work | `teacher-notes.mdx` "Practical work" block |
  | Assessment Criteria (+ 60/40 split) | `formative.mdx` / `summative.mdx` framing + `assessment_weighting` |
  | Recommended Books/References | `index.mdx` "References" + content-spec resource list |

  > **Superseded *in part* by Spec 008 (rich unit pedagogy), not deleted.** The five-file rule
  > above remains the **default** and governs every unit that has **not** opted into the
  > per-topic layout. Spec 008 introduces an opt-in alternative unit shape —
  > `index.mdx` + `topic-NN.mdx` (one nine-part learning cycle each) + `unit-assessment.mdx`
  > (+ optional `unit-teacher-notes.mdx`) — selected when a unit's content-spec `## Unit N`
  > subsection carries a `### Topic list` table **and** `topic-*.mdx` files exist on disk. The
  > folding table's guide-section → destination *intent* is preserved in that shape:
  > Teaching/Instructional Strategies + Practical Work → `unit-teacher-notes.mdx`; Suggested
  > Practical Activities + Assessment Criteria (formative/summative) → each topic's nine-part
  > cycle (`## Activity`, `## Check your understanding`, `## Summative task`) plus the unit-end
  > `unit-assessment.mdx` 10/10/5 bank; Reading/Instructional Materials + Recommended
  > Books/References → per-topic `## Further reading`. See
  > `specs/008-rich-unit-pedagogy/contracts/` and Constitution Art. III.6 (amended v2.6.0).
- **FR-005**: A single task tracker `specs/content/<course-code>/tasks.md` MUST record one row per
  unit per stage, each carrying a status mark from the fixed 3-value enum — not-started (▢) /
  in-progress (▣) / done (✅) — and reviewer initials (required once a row reaches `done`), and
  MUST serve as that course's sole source of pipeline-progress truth. A revision task (FR-011)
  MUST be recorded as new row(s) in this same tracker — tagged with the originating suggestion's
  identifier and its target re-entry stage — not as a separate artifact or file.
- **FR-006**: A single terminology bank `specs/content/terminology.csv`
  (`term_en, term_ur, notes`) MUST be the mandatory reference every translator consults; a
  conflict between a translator's term choice and the bank is resolved by the curriculum owner,
  and the resolution updates the bank so later translators see it.
- **FR-007**: A single style guide `specs/content/style-guide.md` MUST define EN readability
  rules, UR register rules, Pakistan/Sindh example-localization rules, citation format, and
  diagram conventions; the Content gate MUST check every drafted unit against it. It MUST carry a
  `version` front-matter field, which is the single authoritative freeze marker for both the style
  guide and the terminology bank (FR-006) — the two are always versioned/frozen together; any
  further edit to either requires bumping this field.
- **FR-008**: Every assessment blueprint MUST default to formative = 5–8 items
  (Remember/Understand/Apply) and summative = mixed constructed-response with a rubric plus at
  least one Analyze-or-higher item; a per-unit deviation is permitted only when justified in that
  unit's spec.
- **FR-009**: Every course's assessment weighting MUST default to 60% summative / 40% formative
  (Constitution Art. III.7); where a unit's `assessment_weighting` front-matter is present it MUST
  sum to 100, consistent with Spec 001's existing build validator.
- **FR-010**: All prose MUST be original; quotations under 15 words MUST carry a citation; a
  course guide's recommended readings MUST be cited by reference only and never reproduced
  (Constitution Art. III.5).
- **FR-011**: A revision task created from an accepted improvement suggestion (Spec 005) MUST be
  recorded as new row(s) in the target course's existing `tasks.md` tracker (FR-005), MUST carry
  that suggestion's identifier through to the PR/commit that closes it, and the suggestion's
  status MUST be updated to `published` once the fix ships, preserving end-to-end traceability.
- **FR-012**: Quiz-item answer content produced at the assets stage MUST be entered only into the
  backend `quiz_items`/`answer_keys` store (Spec 003) and MUST NOT appear in any file committed to
  the content repository; the CI gate's keyword/pattern scan (FR-016d) MUST flag and block a PR
  that adds a committed file matching an answer-key marker, pending human confirmation.
- **FR-013**: Where a course guide is ambiguous or silent on a section this pipeline requires, the
  gap MUST be logged in `specs/gaps.md` and escalated to the curriculum owner rather than invented
  (Constitution Art. II.3); drafting of the affected unit MUST pause until the gap is resolved.
- **FR-014**: A course flagged `bilingual: false` MUST skip the UR translation and UR review
  stages for every one of its units without those stages blocking publish (Constitution Art.
  III.2 carve-out).
- **FR-015**: The pipeline MUST be provable end-to-end on one designated golden unit
  (EFMP-301 Educational Psychology, Unit 1) before it is applied at scale to additional courses,
  per Constitution Art. VI.1.
- **FR-016**: A CI check MUST block merging a unit's draft (or a revision task's fix) unless: (a)
  that unit's `tasks.md` rows read "done" with reviewer initials present for `G2 en-draft` and
  `G3 en-review` — and, when the unit's Urdu mirror exists with `translation_status: reviewed`,
  also for `G4 ur-translation` and `G5 ur-review`. This check covers EN/UR drafting and review
  stages only: `G1 unit-spec` is gated separately via content-spec approval (b), and `G6 assets`/
  `G7 publish` are not independently re-checked here (research.md R6), (b) the course's
  `content-spec.md` carries `status: approved` in its front
  matter, (c) for any unit touching Urdu, every term in that unit's front-matter key-terms list
  (from its G1 Unit Spec subsection) has a UR translation matching `terminology.csv` — flagging,
  not silently overriding, any listed term absent from the bank; this is a structured comparison
  against the declared key-terms list, not a full-text scan of the Urdu prose — and (d) no changed
  file matches a maintained list of answer-key
  marker patterns (e.g. "correct answer", "answer key", "marking scheme") — a match blocks merge
  pending human confirmation it is a false positive or removal of the content. This is in addition
  to, not a replacement for, Spec 001's existing build-time validators (EN/UR structural parity,
  `assessment_weighting` sum-to-100, front-matter presence).
- **FR-017**: This feature's own completion is scoped to proving the pipeline — the frozen style
  guide and terminology bank v1 (`style-guide.md`'s `version: 1.0` front-matter field set, per
  FR-007), EFMP-301's approved content-spec and course-overview, the
  EFMP-301 Unit 1 golden unit published bilingual through every stage, and one test suggestion
  flowing G8 end-to-end. Authoring content for the remaining Semester 1–4 courses is subsequent
  execution work tracked through this same pipeline's own task trackers, not a condition of this
  feature being marked done.
- **FR-018**: Quiz-item and answer-key authoring at the assets stage MUST produce a per-unit
  Assets Staging Worksheet — quiz items (question stem, options, correct answer, Bloom tag) and
  formative/summative answer-key content — as a **git-ignored, non-committed** file — it exists
  only to hand off to whoever performs the manual `quiz_items`/`answer_keys` entry in Studio
  (Spec 003's existing service-role/Studio precedent) and MUST NOT be tracked by version control or
  reach the published content repository (FR-012).

### Key Entities *(include if feature involves data)*

- **Course Content-Spec**: one per course guide — the approved starting point for every unit under
  it; carries the unit list, CLO/SLO map, and the guide's teaching strategies, practical work,
  recommended resources, and assessment criteria.
- **Course Overview Page**: one per course — the published carrier of that course's course-wide
  items, linked from every unit instead of repeated per-unit.
- **Unit Spec**: one per unit — CLO refs, key terms, worked-example ideas, activity concepts,
  reading materials, and the assessment blueprint for that specific unit; recorded as a dedicated
  subsection within its course's Content-Spec, not a separate file.
- **Task Tracker Row**: one per unit per stage — status (not-started / in-progress / done) and
  reviewer initials; the record of where a unit currently sits in the pipeline.
- **Terminology Bank Entry**: one per term — `term_en`, `term_ur`, and notes; the reference every
  translation decision is checked against.
- **Style Guide**: a single shared document of readability, register, localization, citation, and
  diagram rules applied at every Content gate; its `version` front-matter field is the freeze
  marker for both itself and the terminology bank.
- **Gap Log Entry**: one per unresolved guide ambiguity/mismatch — logged in `specs/gaps.md`,
  escalated to the curriculum owner, blocking the affected unit until resolved.
- **Revision Task**: one per accepted improvement suggestion re-entering the pipeline — recorded as
  new row(s) in the target course's existing Task Tracker, carrying the suggestion's identifier
  and the target unit/re-entry stage, closing once the fix publishes.
- **Assets Staging Worksheet** *(renamed from "Quiz Staging Worksheet" — broadened per
  research.md R9 to also cover answer-key content)*: one per unit needing quiz-bank or
  answer-key content — question stems, options, correct answers, and Bloom tags, plus
  formative/summative answer-key content — awaiting manual entry into the backend; git-ignored,
  never committed, and deleted or archived outside the repository once entry is complete.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: EFMP-301's content-spec is approved with 100% of its units mapped to a guide
  CLO/SLO and zero invented (unsourced) teaching-strategy, practical-work, or assessment items.
- **SC-002**: The golden unit (EFMP-301 Unit 1) clears both the EN Content gate and the UR review
  gate with zero traceability gaps on its first full run through the frozen v1 pipeline.
- **SC-003**: A spot-check of 10 randomly sampled Urdu terms used across published units matches
  the terminology bank in 100% of cases.
- **SC-004**: A test suggestion completes the full loop — filed, accepted, revision task opened,
  fix published — with the suggestion's identifier traceable at every step and its status
  correctly reading `published` at the end, with zero broken links in the chain.
- **SC-005**: Once the template is frozen, a content author drafting a new unit needs zero
  clarifying questions about which of the five files a given course-guide section belongs in — the
  folding-rule mapping fully determines it. *(Spec 008: for a unit on the opt-in per-topic
  layout the same "no clarifying questions" guarantee holds against the nine-part topic cycle +
  `unit-assessment.mdx` mapping instead — see FR-004's superseding note.)*
- **SC-006**: No answer-key content is ever found in a committed content-repository file across
  the golden unit and any subsequent unit produced by this pipeline — verified by the CI gate's
  answer-key keyword/pattern scan (FR-016d) on every PR.
- **SC-007**: A unit whose task-tracker row is not "done" or whose course content-spec is not
  approved fails to merge in 100% of attempts, with the CI gate's failure message identifying
  which condition is unmet.

## Assumptions

- **Pipeline artifacts stay in Git as plain files**: `content-spec.md`, `tasks.md`,
  `terminology.csv`, and `style-guide.md` are Markdown/CSV files under `specs/content/`, not a new
  database or authoring tool — consistent with Constitution Art. V.1's content/application split.
- **Spec 001's platform-side validators are not rebuilt here**: the 8-semester folder scaffold,
  the golden template, and the build-time checks (EN/UR structural parity, `assessment_weighting`
  sum-to-100, `clo_refs`/`translation_status` front-matter) already exist from Spec 001. This
  feature adds one new, narrowly-scoped CI check (FR-016) — tracker/content-spec/terminology
  gating — on top of that existing tooling, rather than re-implementing any of it.
- **Revision-task linkage uses Spec 005's real identifier**: the original draft note's
  `revises: SUG-123` placeholder is corrected here to reference Spec 005's actual
  `improvement_suggestions.id` (a UUID), since that is the identifier the implemented suggestion
  system produces (FR-011).
- **Quiz-bank authoring stays manual, with a lightweight handoff**: consistent with Spec 003's own
  backlog note that `quiz_items`/`answer_keys` authoring is deliberately deferred (service-role/
  Studio entry, no client-facing UI), this feature does not add an authoring UI — it adds only a
  git-ignored staging worksheet as the handoff artifact (FR-018).
- **The golden unit (EFMP-301 Unit 1) already exists** from Spec 001's earlier template work; this
  feature's acceptance criteria (SC-001, SC-002) require it to demonstrably pass through this
  spec's own formal artifacts (content-spec, task tracker, terminology-bank spot-check) rather than
  requiring it be re-authored from scratch.

## Dependencies

- **Spec 001 (Content Platform)**: supplies the golden template (§6.9), the 8-semester scaffold,
  and the build-time validators (EN/UR parity, `assessment_weighting` sum, front-matter presence)
  that every unit this pipeline produces must ultimately pass; this feature's own CI gate
  (FR-016) runs alongside those validators, not in place of them.
- **Spec 003 (Classes, Assignments & Assessments)**: supplies the backend `quiz_items`/
  `answer_keys` store that G6's quiz-bank output is entered into (FR-012, FR-018).
- **Spec 005 (Teacher Dashboard)**: supplies the `improvement_suggestions` records whose
  `status='accepted'` rows are this feature's G8 input signal (FR-011); Spec 005 explicitly blocks
  on this feature for its own feedback loop to close.
- **Constitution Art. II, III, VI, VII**: authoritative source for guide supremacy, content
  quality standards, semester priority, and the review gates this pipeline operationalizes.
