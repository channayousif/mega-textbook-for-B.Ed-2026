# Feature Specification: Rich Unit Pedagogy — Nested Per-Topic Learning Cycles

**Feature Branch**: `008-rich-unit-pedagogy`
**Created**: 2026-08-27
**Status**: Draft
**ADR**: [ADR-0011](../../history/adr/0011-nested-per-topic-unit-pedagogy-bounded-answer-keys-and-figure-markers.md) (Accepted 2026-08-27)
**Input**: User description: "Restructure course units into nested per-topic learning cycles with unit-end and course-end matter, figure markers, an amended answer-key policy, and a rewritten author-unit skill."

## Overview

Today a unit is five flat files (`index.mdx`, `activities.mdx`, `formative.mdx`, `summative.mdx`,
`teacher-notes.mdx`, Spec 006 FR-004). Exposition lives in `index.mdx` (one heading per guide
sub-topic); activities, formative items and the summative task are pooled once for the whole unit.
Spec 007 added a depth gate over that shape (concept coverage, a `## Common misconceptions` +
`## Further reading` requirement, a formative floor of five, a reading-minutes band, and
coverage↔sources consistency).

This feature introduces an **alternative unit shape** in which each **topic** is a self-contained
teaching-and-learning cycle — real-life hook → explanation → collaborative activity → formative check
→ short summary → self-assessment checklist → practicum-transfer task → summative task → further
reading — followed by an **end-of-unit matter** file (chapter summary + a fixed-size question bank
with answers and rubrics) and, at course level, an **end-of-course review** (course summary +
practice bank + practicum project ideas). It also introduces **figure markers** — text prompts,
placed where a teaching image belongs, that a later image pass will generate from — and a
matching consistency gate.

Like Spec 007, the change is delivered as a full SDD feature: a constitution amendment, new and
superseding contracts, a data model, a dependency-ordered task list, a rewritten authoring skill,
a README update, an ADR, and PHRs — **proven end-to-end on one unit** (EFMP-302 Unit 1) before any
rollout.

**The new shape is opt-in and additive.** Every unit and course still on the legacy five-file
layout MUST keep passing every gate with no change. A unit is on the new shape only when it both
carries `topic-*` files on disk **and** its course content-spec declares a topic partition for it —
the same "presence of a declared table = opt-in" mechanism Spec 007 uses for its checklist.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Author a unit as nested per-topic cycles (Priority: P1)

An author is asked to bring a unit up to the new structure standard. Working from the course
content-spec's declared topic partition and the course guide, they use the authoring skill to
produce: a unit-opening file, one file per topic each carrying the full nine-part cycle with at
least one figure marker, an end-of-unit assessment file (chapter summary + 10 multiple-choice + 10
restricted-response + 5 extended-response items + a bounded answers-and-marking-guidance section),
and — where the guide supplies teaching strategies/practical work — an optional teacher-notes file.
They emit the unit's coverage matrix, sources-consulted list and figure manifest, run the gate set
locally until green, and hand the unit to the curriculum owner for the human Content gate.

**Why this priority**: This is the feature. Without a repeatable authoring path that produces
gate-passing content, nothing else has value. Proven on EFMP-302 Unit 1, it becomes the template
for every later unit.

**Independent Test**: Run the authoring skill against EFMP-302 Unit 1's declared topic partition;
confirm the produced files satisfy `validate:content`, the depth gate, the figure gate, the
answer-key gate and the unit tests, with committed coverage/sources/figure artefacts, and that the
prose holds the plain-English register.

**Acceptance Scenarios**:

1. **Given** a course content-spec whose `## Unit N` subsection declares a topic partition and a
   re-baselined depth budget, **When** the author runs the skill, **Then** it produces the
   unit-opening file, one file per declared topic with all nine cycle headings in the required
   order, the end-of-unit assessment file with exactly 10/10/5 items and a final
   answers-and-marking-guidance section, and the three governance artefacts.
2. **Given** a fully drafted new-shape unit, **When** every automated gate runs, **Then** all pass
   and the unit's total reading-minutes fall inside the declared budget band.
3. **Given** the drafted unit, **When** the curriculum owner reviews it, **Then** every guide
   sub-topic on the checklist is taught in exactly one topic, each topic cites the readings mapped
   to it, and the register is unchanged from the legacy standard.

---

### User Story 2 - Declare a unit's topic partition and budgets (Priority: P2)

The curriculum owner prepares a unit for the new shape by expanding its `## Unit N` subsection in
the course content-spec: a topic list (each topic → title → the sub-topic IDs it teaches → a
reading-minutes sub-band → its planned figure IDs), a `Topic` column added to the existing
sub-topic checklist, a re-baselined unit depth budget, a figure plan, and a unit-end assessment
blueprint. They re-affirm the content-spec's `approved` status. This declaration is what opts the
unit into the new-shape gates.

**Why this priority**: Authoring (US1) cannot start until the partition exists, and the partition is
the single authoritative artefact the gates check the draft against. It is a small, self-contained
piece of work that gates the rest.

**Independent Test**: Add a topic partition + budget to one unit's content-spec subsection; confirm
the depth gate now treats that unit as new-shape, that a partition which leaves a checklist
sub-topic unassigned (or assigns one twice) fails the gate, and that a legacy unit with no
partition is still treated as legacy.

**Acceptance Scenarios**:

1. **Given** a unit whose content-spec subsection has a topic list covering every checklist
   sub-topic exactly once, **When** the depth gate runs, **Then** the unit is evaluated on the
   new-shape rules.
2. **Given** a topic list that omits one checklist sub-topic, **When** the depth gate runs,
   **Then** it fails with a message naming the unassigned sub-topic.
3. **Given** a topic list that assigns one sub-topic to two topics, **When** the depth gate runs,
   **Then** it fails with a message naming the doubly-assigned sub-topic.
4. **Given** a content-spec whose status is not `approved`, **When** any drafting gate runs,
   **Then** the unit is blocked exactly as under the current pipeline gate.

---

### User Story 3 - Automated gates catch a structurally incomplete unit (Priority: P2)

A contributor opens a pull request that restructures a unit but leaves it incomplete — a missing
cycle heading, a formative check with too few items, a question bank that is not 10/10/5, a section
placed after the answers block, a topic with no figure marker, or a figure marker absent from the
manifest. CI blocks the merge and the failure message names the exact unmet condition and the file
it is in.

**Why this priority**: The standard only has teeth if it is enforced mechanically and the failure
is self-explanatory. This is the difference between a guideline and a gate.

**Independent Test**: For each failure mode, craft a fixture that violates exactly one rule; confirm
the relevant gate exits non-zero and its message identifies the condition and the file.

**Acceptance Scenarios**:

1. **Given** a topic file missing one of the nine cycle headings, **When** the depth gate runs,
   **Then** it fails naming the missing heading and the topic file.
2. **Given** a topic file whose cycle headings are present but out of order, **When** the depth
   gate runs, **Then** it fails naming the first out-of-order heading and the topic file.
3. **Given** an end-of-unit assessment file with 9 multiple-choice items, **When** the depth gate
   runs, **Then** it fails naming the multiple-choice count.
4. **Given** an end-of-unit assessment file with any top-level section after
   `## Answers and marking guidance`, **When** the answer-key gate runs, **Then** it fails naming
   the "must be the final section" rule.
5. **Given** a topic file with no figure marker, **When** the figure gate runs, **Then** it fails
   naming the topic file.
6. **Given** a figure marker with no matching manifest row (or a manifest row with no matching
   marker), **When** the figure gate runs, **Then** it fails naming the figure ID.

---

### User Story 4 - Self-learner works the assessment banks with answers (Priority: P3)

A student using the platform as a primary resource reaches the end of a unit. They work the
chapter's multiple-choice, restricted-response and extended-response questions, then check their
work against the answers-and-marking-guidance section printed at the end of the same page. At the
end of the course they do the same with the course review's practice bank and pick a practicum
project idea to carry into a real school.

**Why this priority**: It is the reader-facing payoff of the structure, but it depends entirely on
US1/US2 producing the content. It also drives the answer-key policy change.

**Independent Test**: Open a restructured unit's end-of-unit assessment page and the course review
page; confirm the question banks and the bounded answers section render as ordinary content, the
answers section is last, and no answer material appears anywhere else on the site.

**Acceptance Scenarios**:

1. **Given** a restructured unit, **When** a reader opens its end-of-unit assessment page, **Then**
   they see 10 multiple-choice, 10 restricted-response and 5 extended-response questions followed by
   a single answers-and-marking-guidance section containing the keys and rubrics.
2. **Given** the published site, **When** the answer-key safety scan runs over the build output,
   **Then** answer material is found only inside the bounded sections of end-of-unit assessment and
   course-review pages, nowhere else.

---

### User Story 5 - Legacy units keep working untouched (Priority: P3)

Every course and unit still on the five-file layout — the golden course, the English-only course,
the un-restructured units of the proving course, and every scaffolded-but-unauthored course —
builds and passes every gate with no edits. No author is forced to migrate.

**Why this priority**: A standard that breaks existing content on adoption is not adoptable. This
is the additive guarantee, inherited from Spec 007's grandfathering.

**Independent Test**: Run the full gate set and the add-course check against every legacy course;
confirm all green with zero changes to legacy unit files.

**Acceptance Scenarios**:

1. **Given** a unit with no topic partition in its content-spec and no `topic-*` files, **When**
   every gate runs, **Then** it is evaluated on the legacy five-file rules exactly as before.
2. **Given** the add-course check (which scaffolds a throwaway legacy course), **When** it runs on
   this branch, **Then** it passes unchanged.

---

### Edge Cases

- **Signal disagreement**: a unit has `topic-*` files on disk but no topic partition declared (or
  the reverse, or the counts differ). The depth gate MUST fail with a message pointing at the
  mismatch rather than silently choosing a layout.
- **Half-migrated unit**: a unit folder contains both `topic-*` files and a legacy pooled file
  (`activities.mdx` / `formative.mdx` / `summative.mdx` / `teacher-notes.mdx`). The validator MUST
  reject the legacy pooled files' presence in a new-shape unit.
- **Non-contiguous topic ordinals**: `topic-01`, `topic-03` with no `topic-02`. The validator MUST
  fail naming the gap.
- **Topic front-matter drift**: a `topic-02` file whose declared topic ordinal is not `2`, or which
  omits its display label. The validator MUST fail naming the file.
- **Answers-block abuse**: a heading that only looks like the canonical answers heading (extra
  trailing words, different case) MUST NOT open the answer-key exception; more than one canonical
  answers heading in a file MUST fail.
- **Figure marker in a comment vs. rendered output**: markers are authoring comments and never
  render; the figure gate — not the rendered-HTML scan — is what enforces them.
- **Reviewed Urdu mirror invalidated**: restructuring an already-reviewed unit's English draft
  drops the Urdu mirror's review status and opens a translation/review revision cycle; the Urdu
  route falls back to English behind the existing "translation in progress" banner until then. This
  is expected, not a parity breach.
- **Budget band too loose**: a depth budget band wide enough that any plausible draft passes gives
  the check no teeth; the standard guidance is a tight band (roughly ±25% of target), judged at the
  human Content gate.
- **Course review before the course is ready**: a course whose units are mostly still legacy has no
  meaningful course review; authoring the actual course-review page is out of scope here (the
  contract and gate support ship; the page is authored when a course is fully restructured).

## Requirements *(mandatory)*

### Functional Requirements

#### The unit structure standard

- **FR-001**: The shared style guide MUST define a **unit structure standard** describing the
  new-shape unit: a unit-opening file, one file per topic, an end-of-unit matter file, an optional
  unit teacher-notes file, and a course-level course-review file. The standard MUST state that
  legacy five-file units are unchanged and are not required to migrate.
- **FR-002**: The standard MUST define the **nine-part topic cycle** as a fixed, ordered set of
  named sections — real-life opening, explanation, collaborative activity, formative check, short
  summary, self-assessment checklist, practicum-transfer task, summative task, further reading —
  with the canonical heading text for each fixed so it can be checked mechanically. A topic that
  omits a section, or presents the sections out of order, MUST NOT pass.
- **FR-003**: The unit-opening file MUST carry an ordered topic map that links each topic file and
  whose entry count equals the number of topic files. In a new-shape unit the Spec 007 requirement
  that the opening file carry `## Common misconceptions` and `## Further reading` moves into the
  topic files (each topic carries its own further-reading section; misconceptions are handled within
  each topic's explanation). Legacy units keep the Spec 007 rule unchanged.
- **FR-004**: Each new-shape topic's formative check MUST contain **at least 3** items as a
  top-level numbered list, and each topic's self-assessment checklist MUST contain **at least 3**
  checkbox items. Each topic's further-reading section MUST contain **at least 1** citation or link.
- **FR-005**: Each new-shape unit MUST have an **end-of-unit matter file** containing, in order: a
  chapter summary; a summative-assessment section with **exactly 10** multiple-choice questions,
  **exactly 10** restricted-response questions and **exactly 5** extended-response questions, each
  as a top-level numbered list under its own sub-heading; and a single bounded
  **answers-and-marking-guidance section** that MUST be the file's final top-level section and holds
  the multiple-choice key, restricted-response model answers with mark schemes, and extended-response
  analytic rubrics (at least one rubric demanding Analyze-or-higher).
- **FR-006**: A course MAY carry a **course-review file** at course level containing a course
  summary, a practice-question bank (multiple-choice / restricted-response / extended-response), a
  set of practicum project ideas for real schools, and the same bounded answers-and-marking-guidance
  final section. It sorts after the last unit.
- **FR-007**: The structure standard MUST NOT raise the student-facing register. Prose stays
  accessible to a fresh HSC/intermediate graduate; any technical term still needs a bilingual
  glossary entry; introducing graduate-level vocabulary to signal depth is a Content-gate failure.
  Each topic still carries roughly one concrete Pakistan/Sindh-grounded example per sub-topic it
  teaches.

#### Answers and marking guidance policy

- **FR-008**: Answer keys, model answers and marking rubrics MUST be permitted in committed,
  published content **only** inside a bounded `## Answers and marking guidance` section that is the
  final top-level section of an end-of-unit matter file or a course-review file. The section MUST
  use one exact, canonical heading; a near-miss heading MUST NOT open the exception; a file MUST NOT
  carry more than one such heading; no top-level section MUST follow it.
- **FR-009**: The existing prohibition on answer-key **front-matter fields**
  (`answer_key` / `answers` / `marking_scheme` / `rubric_answers`) MUST remain absolute everywhere,
  including inside the bounded section. Only prose answer material inside the bounded section is
  permitted.
- **FR-010**: The answer-key safety scan MUST continue to reject answer-key markers and forbidden
  front-matter fields **everywhere else** — every topic file, every unit-opening file, every legacy
  unit file, and every other page — with no loss of coverage relative to today.
- **FR-011**: This policy change is limited to self-study printed-textbook answer keys. The
  RLS-protected LMS quiz bank and answer-key store (Spec 003), gated by the `verified_teacher`
  capability, is unaffected and MUST NOT be moved into committed content. The constitution MUST be
  amended to draw this line explicitly.

#### Figure markers and manifest

- **FR-012**: Authors MUST mark where a teaching image belongs with an in-content marker carrying a
  stable unit-scoped figure ID, a generation prompt, and alt text. Markers are authoring
  annotations and MUST NOT render on the page. Nothing in this feature generates or displays images.
- **FR-013**: Each new-shape unit MUST have a committed **figure manifest** at
  `specs/content/<course-code>/figures/unit-NN.md` with one row per marker recording the figure ID,
  the topic it belongs to, the prompt, the alt text, and a status drawn from a fixed set
  (`prompt-only` / `generated` / `placed`), all rows `prompt-only` for now.
- **FR-014**: A **figure gate** MUST run in CI for new-shape units and MUST fail unless: every
  topic file carries at least one marker; every marker's ID is well-formed and unique within the
  unit and its unit number matches the folder; every marker's prompt and alt text are non-empty;
  and the set of markers and the set of manifest rows match in both directions with each row's
  declared topic equal to the topic of the file the marker sits in. For an already-reviewed
  bilingual unit, the Urdu topic files MUST carry the same marker IDs. The failure message MUST
  name the unit and the unmet condition. Alt text is required on every marker (accessibility).

#### Course content-spec expansion (the opt-in declaration)

- **FR-015**: Each new-shape unit's content-spec `## Unit N` subsection MUST declare a **topic
  list** partitioning that unit's sub-topic checklist into topics: each row gives the topic label,
  its title, the checklist sub-topic IDs it teaches, a reading-minutes sub-band, and its planned
  figure IDs. Every checklist sub-topic MUST be assigned to **exactly one** topic (total and
  disjoint). The existing sub-topic checklist gains a column recording each sub-topic's topic, so
  the partition is declared rather than inferred. The **presence of a topic list is the opt-in
  signal** that puts a unit on the new-shape gates.
- **FR-016**: Each new-shape unit's content-spec subsection MUST carry a **re-baselined depth
  budget** whose reading-minutes band is the target for the sum across the unit-opening file, every
  topic file and the end-of-unit matter file. The subsection MUST also carry a **figure plan** and
  a **unit-end assessment blueprint** (confirming the 10/10/5 sizes, the Bloom spread, and which
  sub-topics each band targets). The course-level content-spec MUST carry a **course-review plan**
  seeding the course-review file.
- **FR-017**: No unit may be drafted or re-drafted to the new shape while its course content-spec's
  status is not `approved`, exactly as the current pipeline gate requires. Where the course guide is
  silent on a required new declaration, the gap MUST be logged and escalated, never invented.

#### Opt-in, additive, and enforcement

- **FR-018**: A unit MUST be evaluated on the new-shape rules **iff** it has `topic-*` files on disk
  **and** its content-spec subsection declares a topic list. If exactly one of those signals is
  present, or the topic-file count and the topic-list row count differ, the depth gate MUST fail
  naming the mismatch — it MUST NOT silently pick a layout.
- **FR-019**: Every unit and course on the legacy five-file layout MUST continue to pass every gate
  — content validation, the pipeline gate, the depth gate, the figure gate, the answer-key scan and
  the add-course check — with **no changes to those units**. New-shape gate logic MUST run in
  addition to, not in place of, the existing validators and gates.
- **FR-020**: The depth gate MUST, for a new-shape unit, additionally verify: the topic-file set
  matches the declared topic list and is contiguous from the first ordinal; the checklist→topic
  partition is total and disjoint; every topic file has all nine cycle headings in order; the
  per-topic formative and checklist minimums (FR-004); the unit-opening topic map (FR-003); the
  end-of-unit matter file's summary, 10/10/5 sizes (counted per question sub-heading) and final
  answers section (FR-005); the coverage matrix maps every checklist sub-topic to a topic file and
  exact section with a cited source, every topic file is referenced by at least one coverage row,
  and the coverage matrix agrees with the topic-list assignment (FR-021); and the reading-minutes
  sum across the new-shape file set falls inside the re-baselined budget band. Every failure MUST
  name the unmet condition and the file.
- **FR-021**: The per-unit **coverage matrix** contract MUST be extended so a sub-topic's `File`
  may be any file in the new-shape set (unit-opening, any topic file, end-of-unit matter, optional
  teacher-notes) and its `Section` is the exact heading — normally a sub-heading inside a topic's
  explanation. For every checklist sub-topic, at least one coverage row MUST name the exact topic
  file its topic-list row assigns it to — the coverage matrix and the declared partition MUST agree
  on where a concept is taught, and the depth gate MUST fail (naming the sub-topic and both files)
  when they do not. Additional coverage rows for the same sub-topic naming other files (e.g.
  reinforcement in the end-of-unit matter) are allowed. The sources-consulted contract is unchanged;
  mutual consistency between coverage and sources is unchanged.

#### The authoring skill

- **FR-022**: The reusable authoring skill MUST be rewritten to drive the new shape: gather and
  verify sources per topic (never fabricating a citation or DOI); design backward from the unit's
  learning outcomes **per topic** (enduring understandings → the formative check and summative task
  that evidence them → a Bloom alignment table over that topic's sub-topics) and plan the unit-end
  10/10/5 bank; draft the unit-opening file, one file per topic to the nine-part cycle with figure
  markers, the end-of-unit matter file with the bounded answers section, and the optional
  teacher-notes file; recompute each file's reading-minutes and land the unit total in the budget
  band; then emit the coverage matrix, sources-consulted list and figure manifest and run the gate
  set. It MUST degrade gracefully offline and MUST carry reference material for the nine-part
  pedagogy, question-item writing, the answers-section formatting rule, figure-prompt craft, and
  citation/register rules. It remains a single skill; it does not delegate to a sub-agent.
- **FR-023**: The skill's authoring-aid reference for the standard MUST stay in sync with the style
  guide's unit structure standard — a change to either updates the other in the same branch and
  bumps the style-guide version.

#### Governance, versioning, and documentation

- **FR-024**: The constitution MUST be amended (minor bump) to: recognise the new-shape per-topic
  cycle and the unit-end 10/10/5 bank as a permitted carrier of the guide's assessment sections;
  permit the per-topic layout as an alternative carrier of the guide's teaching/practical sections;
  add the Article V.2 carve-out distinguishing public printed-textbook self-check keys from the
  RLS-protected LMS bank (FR-011); re-run the Article VI.1 standard-versioning obligation (name the
  proving unit; make the golden-unit re-proof at the new version the next content task); reaffirm
  that the register is unchanged; and add a figure-gate row to the review-gate table.
- **FR-025**: Spec 006 FR-004 ("no new per-unit file type") MUST NOT be deleted. A superseding note
  MUST be added under its folding table stating that the five-file rule remains the default and
  governs every non-opted-in unit, that Spec 008 introduces the opt-in per-topic shape selected by
  the topic-list-plus-`topic-*`-files signal, and that the folding table's guide-section→destination
  intent is preserved in the new shape.
- **FR-026**: Once the standard is proven on the proving unit and it has passed the human Content
  gate, the style guide's `version` field MUST be set to `"3.0"` and the style guide MUST contain
  the unit structure standard, the answers-and-marking-guidance policy, the figure-marker
  convention, and the statement of what the automated gates check versus what the human Content gate
  checks. Any later edit to the style guide or terminology bank MUST bump that field.
- **FR-027**: A contributor-facing description of the unit structure standard, the expanded
  content-spec, the rewritten authoring skill, the answers policy and the figure gate MUST be added
  to the repo README in the same branch.

#### Bilingual handling

- **FR-028**: The structure standard applies to the English draft. The Urdu mirror inherits concept
  coverage through the existing English↔Urdu structural-parity gate; there is no separate Urdu
  coverage matrix or figure manifest, but the Urdu topic files MUST carry the same figure-marker
  IDs once reviewed. An English re-restructure of an already-reviewed unit MUST drop the Urdu
  mirror's review status and open a translation/review revision cycle in the course task tracker;
  the Urdu route falls back to English behind the existing "translation in progress" banner until
  that revision completes.

#### Definition of Done (scoped to proving the standard)

- **FR-029**: The Definition of Done for this feature is: the v3.0 style guide carrying the unit
  structure standard; the expanded content-spec schema and the proving course's content-spec
  updated and re-approved; the rewritten authoring skill; the depth-gate, validator and
  answer-key-gate rewrites and the new figure gate wired into CI with tests; and **EFMP-302 Unit
  1's English re-restructure** passing every English-side gate and the human Content gate, with a
  committed coverage matrix, sources-consulted list and figure manifest, plus the Urdu-mirror
  handoff (review status reset, translation/review revision rows opened). Restructuring EFMP-302
  Units 2–6, other courses, the golden-unit re-proof at v3.0, EFMP-302's actual course-review page
  and the proving unit's Urdu re-translation are subsequent execution, not DoD conditions.

### Key Entities *(include if feature involves data)*

- **Unit-opening file** — the new-shape `index.mdx`: unit orientation, learning outcomes,
  prerequisite knowledge, an ordered topic map linking every topic file, and a short "how to use
  this unit" note. Replaces the legacy exposition role of `index.mdx`.
- **Topic file** — one per topic (`topic-NN`, zero-padded single ordinal). Carries the nine-part
  cycle, roughly one Pakistan-grounded example per sub-topic it teaches, and at least one figure
  marker. Front matter adds a topic ordinal (equal to the filename ordinal) and a display label.
- **End-of-unit matter file** — `unit-assessment`: chapter summary, the 10/10/5 question bank, and
  the single bounded answers-and-marking-guidance final section.
- **Optional unit teacher-notes file** — `unit-teacher-notes`: teaching strategies and practical
  work drawn from the guide; present only where the guide supplies them; carries no assessment items.
- **Course-review file** — course-level `course-review`: course summary, practice bank, practicum
  project ideas, bounded answers section; sorts after the last unit. Its own front-matter shape.
- **Topic list** — a table in each new-shape unit's content-spec subsection partitioning the
  sub-topic checklist into topics with per-topic title, sub-topic IDs, reading-minutes sub-band and
  figure IDs. Its presence is the new-shape opt-in.
- **Sub-topic checklist (extended)** — the Spec 007 checklist gains a `Topic` column; it remains the
  authoritative concept inventory the coverage matrix is graded against.
- **Depth budget (re-baselined)** — the reading-minutes target band for the new-shape file set;
  roughly 2–3× the legacy band. The sub-topic and topic counts stay advisory; only the band is
  gated.
- **Figure marker** — an in-content annotation: a unit-scoped figure ID, a generation prompt, alt
  text. Never rendered.
- **Figure manifest** — `specs/content/<course-code>/figures/unit-NN.md`: one row per marker
  (figure ID, topic, prompt, alt text, status).
- **Unit coverage matrix (v2)** — per-unit mapping of every checklist sub-topic → new-shape file →
  exact section → cited source key; every topic file referenced at least once.
- **Answers-and-marking-guidance section** — the one bounded, canonical-heading, final-section
  location where published answer keys and rubrics are permitted.
- **Unit structure standard** — the style-guide section (v3.0) defining all of the above and the
  automated-vs-human split.
- **Authoring skill** — the committed Claude Code skill that produces a gate-passing new-shape unit
  and its three governance artefacts.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: For EFMP-302 Unit 1, 100% of the sub-topic checklist is partitioned across topics
  with each sub-topic assigned exactly once, and the committed coverage matrix maps every checklist
  sub-topic to a named section in a topic file with a cited source — zero unmapped, zero
  double-mapped — with every topic file referenced by at least one coverage row.
- **SC-002**: The re-restructured EFMP-302 Unit 1 cites at least 3 distinct scholarly sources
  across its topics.
- **SC-003**: The re-restructured unit clears content validation, the pipeline gate, the depth
  gate, the figure gate, the answer-key scan and the unit tests on its first full run, with
  committed coverage, sources and figure artefacts, and then passes the human Content gate.
- **SC-004**: A pull request whose restructured unit omits a cycle heading, has fewer than 3
  formative items in a topic, has a question bank that is not exactly 10/10/5, or places any
  top-level section after `## Answers and marking guidance` fails the relevant gate in 100% of
  attempts, with a message that names the unmet condition and the file.
- **SC-005**: A readability spot-check of the re-restructured unit finds no graduate-level term used
  without a bilingual glossary entry; the register is indistinguishable from the legacy standard.
- **SC-006**: After the proving unit passes the human Content gate, the style guide's `version`
  reads `"3.0"` and the style guide contains the unit structure standard, the answers policy, the
  figure-marker convention, and the statement of what the automated gates check versus the human
  Content gate.
- **SC-007**: Every unit and course on the legacy five-file layout, plus the add-course check,
  remains green on this branch with zero changes to any legacy unit file.
- **SC-008**: Every restructured topic in EFMP-302 Unit 1 carries at least one figure marker with a
  non-empty prompt and non-empty alt text, and the figure manifest matches the markers exactly in
  both directions.
- **SC-009**: A second author, given only the nine-part cycle skeleton and a unit's content-spec
  topic list and budgets, needs zero clarifying questions about "what structure to produce" — the
  declared partition and the fixed skeleton fully determine it.
- **SC-010**: The answer-key safety scan over the built site finds answer material only inside the
  bounded final sections of end-of-unit assessment and course-review pages, and nowhere else.

## Assumptions

- **Proving unit**: EFMP-302 Unit 1 is the proving unit. Its guide sections 1.1–1.4 map to four
  topics; its 14 sub-topics distribute across them as declared in the content-spec topic list
  (1.1 → U1-01…U1-04, 1.2 → U1-05…U1-06, 1.3 → U1-07…U1-10, 1.4 → U1-11…U1-14).
- **No rendering**: this feature only records figure prompts and alt text; it does not generate,
  optimise or display images. A later pass owns generation.
- **No backend change**: no database schema, RLS policy or application-server change. The
  application footer's per-page feedback control simply produces no per-activity kind on topic and
  assessment pages; a dedicated teaching-log kind for topics is out of scope.
- **Node 22 CI** and the existing gate-script conventions (content-root override for fixtures,
  front-matter parsing, hand-rolled pipe-table parsing, per-finding non-zero exit) are unchanged;
  the new gate follows the same shape.
- **Legacy layout is frozen, not deprecated**: legacy units may remain on the five-file layout
  indefinitely; adoption is per unit and always an explicit authoring act, never scaffolded.
- **Sidebar**: topic files order by zero-padded filename under the existing autogenerated sidebar;
  the course-review file is the single content file permitted an explicit sidebar position so it
  sorts after the last unit. Unit-level files still carry no explicit sidebar position.
- **Depth budget bands** for new-shape units are set from the actual drafted total of the proving
  unit and published as guidance; a tight band (roughly ±25% of target) is expected.
- **Urdu**: the proving unit's Urdu mirror is handed off as heading-only skeleton stubs in draft
  status; its full re-translation and re-review are downstream.

## Dependencies

- **Constitution** — amended v2.5.0 → **v2.6.0** for FR-024 (done 2026-08-27): Articles III.1 (register),
  III.3 (assessment), III.6 (guide-section fidelity / file-type rule), V.2 (answer-key carve-out),
  VI.1 (standard-versioning re-run), VII (figure-gate row).
- **Spec 006** — FR-004 (superseded in part, FR-025), FR-007 (the style-guide + terminology-bank
  freeze marker mechanism, now bumped to `"3.0"`), FR-016 (the pipeline gate, still runs).
- **Spec 007** — the depth gate and its `contracts/` (extended and partly superseded by this
  feature's contracts; the checklist/coverage/sources mechanism is reused and built on), the
  golden-unit / working-depth-exemplar concept, the grandfathering-by-declared-table pattern.
- **Spec 001** — content validators, the English↔Urdu structural-parity gate, and the FR-003
  "translation in progress" English-fallback behaviour.
- **Spec 003** — the RLS-protected LMS quiz bank and answer-key store, explicitly **unaffected** by
  the answers policy change (FR-011).

## Out of Scope

- Restructuring EFMP-302 Units 2–6, or any unit of any other course, to the new shape.
- The EFMP-301 golden-unit re-proof at v3.0 — tracked as the next content task after the proving
  unit (a prose note now; task-tracker rows when it is scheduled on its own branch), not done here.
- Authoring EFMP-302's actual course-review page (the contract, schema and gate support ship; the
  page is authored when a course is fully restructured).
- The proving unit's Urdu re-translation and re-review (only the handoff is in scope).
- Any image generation, optimisation, hosting or rendering.
- A dedicated "topic" teaching-log feedback kind and its database migration.
- Any intermediate sidebar grouping for a unit's topic files.
