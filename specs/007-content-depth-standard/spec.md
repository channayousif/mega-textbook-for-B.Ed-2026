# Feature Specification: Content Depth Standard & Reusable Unit-Authoring Skill

**Feature Branch**: `007-content-depth-standard`
**Created**: 2026-08-27
**Status**: Draft
**Input**: User description: "Content depth standard and reusable unit-authoring skill (extends Spec 006). Per ADR-0010 (Accepted, 2026-08-27). The content pipeline's first at-scale output (EFMP-302 Units 1-6) is too shallow for the credit weight it carries, and content-spec.md omits the source material an author needs to go deep (course description, annotated reading list, week schedule, standards anchors). This feature adds a concept-coverage depth standard, an expanded content-spec schema, a reusable author-unit skill, and a CI depth gate, proven by re-drafting EFMP-302 Unit 1."

## Overview

The Content Authoring Pipeline (Spec 006) proved it could turn a course guide into published
bilingual units and pass its structural gates. Its first at-scale run — EFMP-302 "Teaching
Profession", Units 1–6 — exposed a quality gap the v1 pipeline does not catch: the output is
**structurally correct but conceptually thin**. EFMP-302 Unit 1 covers weeks 1–3 of a 16-week
course (four guide sub-units, ~16 discrete concepts) in ~620 words that engage perhaps four of
those concepts and cite none of the six scholarly sources the guide attaches to that material.
The `content-spec.md` the author works from is missing the very material that would let them go
deep: no course description, a bare author-year reading list with no full citations or per-unit
mapping, no week schedule, no standards anchors.

This feature closes that gap with one coherent change: a **concept-coverage depth standard**
that makes "did this unit actually cover the guide, with sources?" a checkable condition; an
**expanded course content-spec** that carries the source material an author needs; a **reusable
authoring skill** that front-loads the research → design → draft → self-review loop so output
is consistent across authors and runs; and a **CI depth gate** that blocks a merge when the
structural evidence of depth is missing. It is proven end-to-end by re-drafting one unit
(EFMP-302 Unit 1). It changes the standard and the tooling; it does not change the register
ceiling — student-facing prose stays plain English for a fresh HSC/intermediate graduate
(Constitution Art. III.1). This is a process/quality specification layered on Spec 006, not a
new application surface.

## Clarifications

### Session 2026-08-27 (from planning discussion, encoded here)

- Q: Is the depth metric a word/reading-minute floor or concept coverage? → A: Concept coverage
  is the hard, checkable rule — every course-guide sub-topic bullet gets its own named
  subsection in the file it folds into, recorded in a per-unit coverage matrix (its committed
  location was fixed to `specs/content/<course-code>/coverage/unit-NN.md` in the /sp.clarify
  round-1 pass below). Word
  length is a soft rule: precise and complete over the concept set, no padding; roughly one
  illustrative example per sub-topic. `est_reading_minutes` is only sanity-checked for
  consistency, never enforced as a floor.
- Q: How wide is the first rollout? → A: Proof-first — re-draft EFMP-302 Unit 1's English
  content only, passing every EN-side gate with a committed coverage matrix and
  sources-consulted list (see the round-2 clarification for the Urdu-handoff detail).
  Re-drafting EFMP-302 Units 2–6 and deciding the EFMP-301 golden unit's fate (re-draft vs
  grandfather-with-note) is subsequent execution tracked through the pipeline's own task
  trackers, not part of this feature's Definition of Done.
- Q: What happens when a guide's recommended reading is unavailable? → A: A topically-related
  reputable open-access source (e.g. UNESCO, OECD, ERIC, a government standards document, an
  established open textbook) may be substituted, provided it genuinely supports the same
  sub-topic, and it is recorded in the unit's committed `sources-consulted.md`. Substitution
  for an unrelated or low-quality source is rejected at the Content gate.
- Q: Does deepening concepts raise the language register? → A: No. Concept depth rises;
  language complexity does not. The register ceiling stays a fresh HSC/intermediate graduate
  (Constitution Art. III.1); an unfamiliar term still requires a glossary entry. Importing
  graduate-level vocabulary to signal depth is a Content-gate failure.
- Q: What form does the authoring method take? → A: A committed Claude Code skill under
  `.claude/skills/` (progressive disclosure — a driving `SKILL.md` plus reference files), so
  the method is invoked per authoring session rather than living as a prose document that
  drifts from practice.
- Q: Does the depth standard apply separately to the Urdu mirror? → A: No. The standard applies
  to the English draft (Spec 006 stage G2). The Urdu mirror (G4/G5) inherits concept coverage
  through Spec 001's existing EN↔UR structural-parity gate; there is no separate Urdu
  coverage matrix.

### Session 2026-08-27 (/sp.clarify)

- Q: Where do the per-unit coverage matrix and sources-consulted list live? → A: As committed
  files under `specs/content/<course-code>/coverage/unit-NN.md` and
  `specs/content/<course-code>/sources/unit-NN.md` — alongside the course's other pipeline
  governance artifacts (`content-spec.md`, `tasks.md`), outside the Docusaurus `docs/` render
  path. The depth gate discovers them by walking `specs/content/`, exactly as
  `check-pipeline-gate.mjs` already does; unit re-draft churn never touches the approved
  `content-spec.md`.
- Q: Does the authoring skill retrieve sources from the web? → A: Yes — the skill uses web
  search/fetch to locate and verify open-access sources, recording each source's exact URL/DOI
  in `sources/unit-NN.md`. When retrieval is unavailable it degrades gracefully to
  author-provided material and, where no source can be found, the FR-004 "no external source
  found" escalation path. Retrieval discovers and verifies; it never invents a citation.
- Q: Is the per-unit depth budget enforced by the gate or advisory? → A: Advisory. The depth
  gate enforces only concept coverage (every course-guide sub-topic for the unit is mapped to
  a real subsection); it does not compare the mapped count to the budget's concept number. The
  budget's target reading-minutes range IS used, as the expected band for the FR-012(d)
  `est_reading_minutes` consistency check. The concept count in the budget is authoring
  guidance only.
- Q: What authoritative list is the coverage matrix checked against, and at what granularity?
  → A: The content-spec unit subsection MUST enumerate the guide sub-topics as an explicit
  checklist, at the guide's leaf-bullet granularity. The depth gate checks that
  `coverage/unit-NN.md` covers exactly that enumerated list — a structured comparison against
  a declared list (the same pattern as Spec 006 FR-016c's key-terms check), never a parse of
  the raw extracted guide text. Keeping the enumerated list faithful to the source guide is
  the curriculum owner's responsibility at the human Content gate.

### Session 2026-08-27 (/sp.clarify, round 2)

- Q: Which units does the depth gate apply to? → A: A unit is in scope for the depth gate if
  and only if its content-spec unit subsection carries the FR-009a enumerated guide-sub-topic
  checklist. Units without one are skipped (grandfathered) — this is how EFMP-301 and the not-
  yet-migrated EFMP-302 Units 2–6 stay green while unmigrated. No new front-matter marker is
  introduced; the presence of the checklist is the opt-in. A unit that has a checklist is
  always checked and therefore cannot silently regress. (Mirrors Spec 006's gate skipping
  `coming_soon` units.)
- Q: Is EFMP-302 Unit 1's Urdu re-work inside this feature's Definition of Done? → A: No — the
  DoD covers the English re-draft passing every EN-side gate (Spec 001 validators, Spec 006
  pipeline gate, the new depth gate, the human Content gate), plus the correct handoff: the
  Urdu mirror's `translation_status` is reset from `reviewed` and a `G4 ur-translation` /
  `G5 ur-review` revision row is opened in `specs/content/efmp-302/tasks.md`. The actual Urdu
  re-translation and re-review is the next pipeline task, not a closing condition of this
  feature.
- Q: Where does the v2.0 freeze marker live? → A: `style-guide.md`'s `version` front-matter
  field alone governs the pair, unchanged from Spec 006 FR-007. `terminology.csv` gains no
  version field. "Frozen at v2.0" means the style guide's `version` reads `"2.0"` and the
  terminology bank is its frozen pair; any edit to either document requires bumping that one
  field.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Author a unit to the concept-coverage depth standard using the skill (Priority: P1)

A content author takes one unit whose course content-spec subsection is approved, invokes the
authoring skill, and produces the unit's five files such that **every course-guide sub-topic
bullet for that unit has its own named subsection** in the file it folds into (Spec 006
FR-004), each subsection carries roughly one Pakistan-grounded illustrative example, the unit's
mapped scholarly readings (or recorded open-access substitutes) are paraphrased and cited,
`index.mdx` contains a "Common misconceptions" and a "Further reading" block, the formative set
has at least 5 items, and the author emits a coverage matrix (guide sub-topic → file →
section → source cited) and a `sources-consulted.md` list alongside the unit.

**Why this priority**: This is the feature's core value — the actual depth of the textbook
content. Without it, the standard and the gate have nothing to act on.

**Independent Test**: Re-draft EFMP-302 Unit 1 from its (expanded) content-spec subsection and
the course guide using the skill; verify against the depth standard that all four guide
sub-units (1.1–1.4) and every bullet under them map to a named subsection with a cited source,
independent of translation or publishing.

**Acceptance Scenarios**:

1. **Given** an approved unit content-spec subsection listing the guide sub-topics, mapped
   readings, and a depth budget, **When** the author drafts the unit with the skill, **Then**
   the coverage matrix maps every checklist sub-topic to a real named subsection in one of the
   five files, with a cited source (guide reading, recorded substitute, or the guide text
   itself where no external source exists), and no checklist sub-topic is unmapped.
2. **Given** a completed draft, **When** it is checked against the depth standard and the Spec
   006 Content gate, **Then** it passes only if the required blocks ("Common misconceptions",
   "Further reading" with real citations) are present, the formative set has ≥5 items, the
   summative set keeps a rubric plus ≥1 Analyze-or-higher item, and the prose register is
   still plain English for a fresh HSC/intermediate graduate.
3. **Given** a mapped reading that is unavailable, **When** the author substitutes a
   topically-related open-access source, **Then** the substitution is recorded in
   `sources-consulted.md` with what it supports, and the Content gate accepts it only if it
   genuinely covers the same sub-topic.
4. **Given** a guide sub-topic for which neither the guide reading nor any topically-related
   open-access source can be found, **When** the unit is drafted, **Then** the sub-topic is
   still covered from the guide text and general knowledge, `sources-consulted.md` records "no
   external source found", and the gap is escalated to the curriculum owner rather than
   silently dropped.

---

### User Story 2 - Expand the course content-spec so it carries what an author needs (Priority: P1)

The curriculum owner (or an author on their behalf) upgrades a course's `content-spec.md` to
the expanded schema: a Course Description, a full annotated Reading list (complete citations
with DOI/URL, each entry tagged to the unit(s) it supports, one-line annotation, split into
guide-required and curated-supplementary), a Week schedule, and a Standards & frameworks
anchors section. Each per-unit subsection gains a depth budget (concept count and target
reading minutes), prerequisite knowledge, common misconceptions, mapped readings, a
worked-examples plan, and international best-practice notes. The curriculum owner re-approves
the upgraded content-spec before units under it are drafted or re-drafted to the new standard.

**Why this priority**: The author cannot meet the depth standard (Story 1) without this source
material assembled in one place; it is the input the skill reads.

**Independent Test**: Upgrade `specs/content/efmp-302/content-spec.md` to the expanded schema
and have the curriculum owner re-approve it, independent of any unit being re-drafted.

**Acceptance Scenarios**:

1. **Given** a course guide with a description and a recommended-readings list, **When** the
   content-spec is upgraded, **Then** the Course Description and every recommended reading
   appear in the content-spec with a full citation and are each tagged to at least one unit.
2. **Given** the upgraded content-spec, **When** it is validated, **Then** every required new
   section is present and each per-unit subsection carries its depth budget, prerequisites,
   misconceptions, mapped readings, and worked-examples plan.
3. **Given** a course guide that is silent on the course description, **When** the content-spec
   is upgraded, **Then** the gap is logged in `specs/gaps.md` and escalated to the curriculum
   owner rather than invented; a guide silent only on readings falls back to
   curated-supplementary open-access sources recorded as such.
4. **Given** an upgraded content-spec, **When** anyone attempts to draft or re-draft a unit
   under it, **Then** the attempt proceeds only if the content-spec carries the approved
   status.

---

### User Story 3 - Block a merge whose unit misses the depth standard (Priority: P2)

A contributor opens a pull request that adds or changes a unit. Continuous integration blocks
the merge unless the unit's structural evidence of depth is present: a coverage matrix
(`specs/content/<course-code>/coverage/unit-NN.md`) that covers every guide sub-topic on the
unit's enumerated checklist, the required content blocks, a formative set of at least 5 items,
and an `est_reading_minutes` value within the unit's depth-budget range. The failure message
names which condition is unmet.

**Why this priority**: At ~3,000-document scale an unautomated bar erodes; this is the minimum
enforcement that scales, and it is exactly the check the v1 pipeline lacked. It depends on
Stories 1–2 to have something to check.

**Independent Test**: Open a PR containing a deliberately thin unit (a guide sub-topic with no
matching subsection, or a 3-item formative set) and confirm the depth gate fails with a message
identifying the unmet condition; then fix it and confirm the gate passes.

**Acceptance Scenarios**:

1. **Given** a unit whose coverage matrix is missing or does not cover every sub-topic on the
   unit's enumerated checklist, **When** its PR runs CI, **Then** the depth gate fails and
   names the missing sub-topic(s) or the missing file.
2. **Given** a unit missing a required block or with fewer than 5 formative items, **When** its
   PR runs CI, **Then** the depth gate fails and names the specific shortfall.
3. **Given** a unit that satisfies every depth-standard condition, **When** its PR runs CI,
   **Then** the depth gate passes and does not block the merge, and it runs in addition to —
   not in place of — Spec 001's validators and the Spec 006 pipeline gate.

---

### User Story 4 - Freeze the standard as a versioned pair (Priority: P2)

Once the standard is proven on EFMP-302 Unit 1, `style-guide.md`'s `version` field is set to
`"2.0"`, re-freezing the style-guide + terminology-bank pair (`terminology.csv` has no version
field of its own). Any later edit to either document requires bumping that one field again, so
"which version of the standard was this unit authored against?" is always a checkable file
state.

**Why this priority**: Spec 006 established the version field as the single freeze marker for
the pair (FR-007); this feature materially expands the style guide, so the marker must move.
It has no value until the expansion (Stories 1–3) is settled.

**Independent Test**: Inspect the style guide and terminology bank version fields and confirm
both read 2.0 after the proving unit passes, and that the depth standard content is present in
the style guide.

**Acceptance Scenarios**:

1. **Given** the proven depth standard, **When** the style guide is updated with it, **Then**
   the style guide's version field reads 2.0 and the terminology bank is frozen at the same
   version as its pair.
2. **Given** the v2.0 freeze, **When** a further edit is made to either document, **Then** it
   is accompanied by a version bump; an un-bumped edit is flagged.

---

### User Story 5 - Roll the standard to remaining units without re-opening this feature (Priority: P3)

After the proving unit ships, remaining EFMP-302 units (and, when decided, the EFMP-301 golden
unit) are re-drafted to the v2.0 standard as ordinary pipeline work — new rows in the course's
existing task tracker, each passing the same depth gate — with this feature already marked
done.

**Why this priority**: It confirms the standard is a repeatable part of the pipeline, not a
one-off, but it is downstream execution, not a closing condition.

**Independent Test**: Add a task-tracker row for EFMP-302 Unit 2's re-draft, carry it through
the depth gate exactly as the proving unit was, and confirm nothing about this feature's status
changes.

**Acceptance Scenarios**:

1. **Given** this feature marked done, **When** EFMP-302 Unit 2 is re-drafted to the v2.0
   standard, **Then** it is tracked as a normal unit row and gated identically, with no change
   to this feature's artifacts.
2. **Given** the EFMP-301 golden unit predating v2.0, **When** it has not yet been re-drafted,
   **Then** it is grandfathered automatically because its content-spec subsection has no
   FR-009a enumerated checklist, so the depth gate does not run for it; this feature's
   Definition of Done does not require its retroactive coverage matrix, and the
   re-draft-vs-grandfather decision is recorded separately.

---

### Edge Cases

- **A guide sub-topic is a single trivial idea**: checklist sub-topics may share one named
  subsection only if the coverage matrix still maps each one to that subsection — grouping is
  allowed, silent omission is not. This prevents both over-fragmentation and dropped concepts.
- **Concept coverage is complete but the prose is padded** to look substantial: the soft
  length rule ("precise, no padding") is a Content-gate reviewer judgement; the automated depth
  gate checks structural proxies only and cannot detect padding — the spec acknowledges this
  limit.
- **An open-access substitute source is off-topic or low quality**: the curriculum owner
  rejects it at the Content gate and the author must find another; `sources-consulted.md` is
  not a licence to cite anything.
- **The course guide never stated a course description or readings** (some guides are terse):
  a missing course description is escalated per Constitution Art. II.3; a missing reading list
  falls back to curated-supplementary open-access sources recorded as such — the pipeline is
  not blocked on the guide's silence about an optional enrichment.
- **The Urdu mirror**: the depth standard is applied once, to the English draft; the Urdu
  version inherits coverage through the existing EN↔UR structural-parity gate and has no
  separate `coverage.md`.
- **A course flagged `bilingual: false`**: unchanged from Spec 006 — G4/G5 are skipped; the
  depth standard still applies to that course's English units.
- **An author deepens concepts by importing graduate-level vocabulary**: rejected at the
  Content gate; the standard separates concept depth from language complexity and holds the
  Art. III.1 ceiling.
- **A coverage matrix cites a source that does not appear in the sources-consulted list** (or vice
  versa): the two must be consistent; a mismatch is a gate failure.
- **The proving unit's existing reviewed Urdu mirror goes stale** after the English re-draft:
  its `translation_status` drops back to `draft` and it must re-clear G4/G5 — the re-draft is
  not *bilingually* complete until it does. In the interim the unit still ships: its `ur` route
  falls back to the English content behind Spec 001 FR-003's "translation in progress" banner
  (the sanctioned missing-Urdu state, not the `bilingual: false` carve-out), and the
  downstream G4/G5 re-review restores the reviewed Urdu version. This interim EN-fallback state
  is Art. III.2-compliant via that FR-003 banner mechanism, not an exception to parity.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The pipeline MUST define a **concept-coverage depth standard** as a section of
  the shared style guide. Its hard rule: for every unit, each guide sub-topic on the unit's
  enumerated sub-topic checklist (FR-009a) MUST have its own named subsection in the file it
  folds into per the Spec 006 FR-004 mapping; sub-topics MAY be grouped under one subsection
  only if each is still individually accounted for in the coverage matrix. Word length is NOT
  floored — prose MUST be precise and complete over the concept set without padding, with
  roughly one illustrative example per sub-topic.
- **FR-002**: Every unit produced or re-drafted under this standard MUST carry a committed
  per-unit **coverage matrix** at `specs/content/<course-code>/coverage/unit-NN.md` that maps
  every guide sub-topic on the unit's enumerated checklist (FR-009a) to the file, the named
  subsection, and the source cited for it. A checklist sub-topic with no mapped subsection
  MUST NOT pass. The file lives outside the Docusaurus `docs/` render path, alongside the
  course's `content-spec.md` and `tasks.md`.
- **FR-003**: Each unit MUST paraphrase-and-cite the scholarly readings mapped to it in the
  course content-spec. Where a mapped reading is unavailable, a **topically-related reputable
  open-access source** MAY be substituted; every reading actually used (mapped or substitute)
  MUST be recorded in a committed per-unit **sources-consulted list** at
  `specs/content/<course-code>/sources/unit-NN.md` with a one-line note of what it supports. A
  substitute that does not genuinely cover the same sub-topic MUST be rejected at the Content
  gate.
- **FR-004**: Where neither a mapped reading nor a topically-related open-access source can be
  found for a guide sub-topic, the sub-topic MUST still be covered from the guide text and
  general knowledge, the sources-consulted list MUST record "no external source found", and
  the gap MUST be escalated to the curriculum owner (Constitution Art. II.3) — never silently
  dropped.
- **FR-005**: Every unit's `index.mdx` under this standard MUST contain a "Common
  misconceptions" block and a "Further reading" block whose entries are real citations.
- **FR-006**: Every unit's formative set MUST contain at least 5 items (raising the Spec 006
  FR-008 5–8 range's lower bound from guidance to a floor); the summative set MUST keep a
  rubric plus at least one Analyze-or-higher item (unchanged, Constitution Art. III.3).
- **FR-007**: The depth standard MUST NOT raise the student-facing language register. Prose
  MUST remain accessible to a fresh HSC/intermediate graduate (Constitution Art. III.1); any
  technical term still requires a bilingual glossary entry. Deepening concept coverage by
  introducing graduate-level vocabulary MUST be treated as a Content-gate failure.
- **FR-008**: The course **content-spec MUST be expanded** to a schema that additionally
  carries: a Course Description; a Reading list with full citations (including DOI/URL where
  the guide provides one), each entry tagged to the unit(s) it supports, a one-line
  annotation, and a split between guide-required and curated-supplementary; a Week schedule;
  and a Standards & frameworks anchors section (e.g. UNESCO, NACTE, OECD, the National
  Professional Standards for Teachers in Pakistan, HEC) where the course's subject engages
  them.
- **FR-009**: Each per-unit subsection of the expanded content-spec MUST additionally carry: a
  depth budget (the count of guide sub-topics to cover and a target reading-minutes range),
  prerequisite knowledge, common misconceptions, the subset of the course reading list mapped
  to that unit, a worked-examples plan (roughly one per sub-topic), and international
  best-practice notes. The depth budget is authoring guidance, not a gated value: its concept
  count is not compared to the coverage matrix by the depth gate (FR-012 enforces the
  enumerated-checklist coverage of FR-009a instead), and only its target reading-minutes range
  is consumed by the gate — as the expected band for the FR-012(d) check.
- **FR-009a**: Each per-unit subsection of the expanded content-spec MUST enumerate that
  unit's guide sub-topics as an explicit checklist, at the source guide's leaf-bullet
  granularity. This enumerated list is the single authoritative set the coverage matrix
  (FR-002) and the depth gate (FR-012a) are checked against — a structured comparison against
  a declared list, never a parse of the raw extracted guide text (same pattern as Spec 006
  FR-016c). Keeping the enumerated list faithful to the source course guide is the curriculum
  owner's responsibility at the human Content gate (Constitution Art. II.2).
- **FR-010**: An expanded content-spec MUST carry the same explicit approved status Spec 006
  FR-002 requires; a unit MUST NOT be drafted or re-drafted to this standard while its course
  content-spec is not approved. A guide silent on a required new section (e.g. Course
  Description) MUST be logged in `specs/gaps.md` and escalated, not invented.
- **FR-011**: A **reusable authoring skill** MUST exist as a committed Claude Code skill that
  drives the unit-authoring workflow: gather sources (read the guide sub-unit verbatim, pull
  the mapped readings, and use web search/fetch to locate and verify a topically-related
  open-access substitute when a mapped reading is unavailable — recording each source's exact
  URL/DOI, never inventing one); design backward from the CLOs (desired understandings →
  assessment evidence → content, with a Bloom alignment table); draft the five files to the
  depth standard; and self-review the draft against the standard and the Content gate,
  emitting the coverage matrix and sources-consulted list. When web retrieval is unavailable
  the skill MUST degrade gracefully to author-provided material and the FR-004 escalation
  path. The skill MUST include reference material for pedagogy practice (cognitive load,
  worked-example effect, retrieval practice, universal design for learning, explicit
  vocabulary, dialogic/inquiry activities), the depth standard itself as a shared reference,
  and citation/register rules.
- **FR-012**: A **CI depth gate** MUST run for exactly those units whose content-spec
  subsection carries the FR-009a enumerated checklist (a unit without one is out of scope and
  skipped — this grandfathers EFMP-301 and any not-yet-migrated unit; no new front-matter
  marker is used, the checklist's presence is the opt-in). For an in-scope unit, the gate MUST
  block merging its draft or re-draft unless: (a) the unit's coverage matrix exists and covers
  every guide sub-topic on that unit's enumerated checklist (FR-009a), by structured
  comparison against that declared list — not a parse of the raw guide text; (b) the required
  blocks (FR-005) are present; (c) the formative set has at least 5 items; (d) the sum of the
  unit's five English files' `est_reading_minutes` falls within the unit's depth-budget target
  reading-minutes range (FR-009); and (e) the coverage matrix and sources-consulted list are
  mutually consistent.
  The failure message MUST identify which condition is unmet. This gate MUST run in addition to, not in place of, Spec 001's
  build-time validators and the Spec 006 FR-016 pipeline gate.
- **FR-013**: The automated depth gate is a structural check only. Judgements the gate cannot
  make — whether prose is padded, whether an example is apt, whether a substitute source is
  genuinely on-topic, whether the register held — remain with the human Content gate
  (Constitution Art. VII); this division MUST be stated in the style guide so reviewers know
  what the gate does and does not cover.
- **FR-014**: Once the standard is proven on the designated proving unit, `style-guide.md`'s
  `version` front-matter field MUST be set to `"2.0"`. That single field remains the freeze
  marker for the style-guide + terminology-bank pair (unchanged from Spec 006 FR-007) —
  `terminology.csv` carries no version field of its own — and any subsequent edit to either
  document MUST bump it.
- **FR-015**: The depth standard MUST be provable end-to-end on **EFMP-302 Unit 1** — re-drafted
  from its expanded content-spec subsection, passing Spec 001's validators, the Spec 006
  pipeline gate, the new depth gate, and the human Content gate, with a committed coverage
  matrix and sources-consulted list — before it is applied at scale to further units.
- **FR-016**: This feature's Definition of Done is scoped to proving the standard: the v2.0
  style guide carrying the depth standard, the expanded content-spec schema, the authoring
  skill, the CI depth gate wired into the pipeline, and EFMP-302 Unit 1's **English** re-draft
  passing every EN-side gate (FR-015) with a committed coverage matrix and sources-consulted
  list, plus the handoff for its Urdu mirror: `translation_status` reset from `reviewed` and a
  `G4 ur-translation` / `G5 ur-review` revision row opened in `specs/content/efmp-302/tasks.md`.
  The Urdu re-translation and re-review itself, re-drafting EFMP-302 Units 2–6, and deciding
  whether the EFMP-301 golden unit is re-drafted or grandfathered with a recorded note, are
  subsequent execution tracked through
  the pipeline's own task trackers — not conditions of this feature being marked done.
- **FR-017**: The depth standard applies to the English draft (Spec 006 stage G2). The Urdu
  mirror (G4/G5) MUST inherit concept coverage through Spec 001's existing EN↔UR
  structural-parity gate; this feature MUST NOT introduce a separate Urdu coverage matrix. An
  English re-draft of an already-reviewed unit MUST drop that unit's Urdu `translation_status`
  back and open a `G4 ur-translation` / `G5 ur-review` revision row in the course's `tasks.md`;
  the Urdu mirror does not re-publish as reviewed until it re-clears review, but performing
  that re-review is downstream pipeline work, not part of this feature (FR-016).
- **FR-018**: A contributor-facing description of the depth standard, the expanded
  content-spec, the authoring skill, and the depth gate MUST be added to the repository's
  README in the same branch (Constitution Art. X.2 docs gate).

### Key Entities *(include if feature involves data)*

- **Depth Standard**: the concept-coverage rules — sub-topic-to-subsection mapping,
  scholarly-engagement requirement, required blocks, formative floor, the soft no-padding
  length rule, and the explicit register ceiling — living as a section of the shared style
  guide, versioned with it.
- **Unit Coverage Matrix**: one committed file per unit at
  `specs/content/<course-code>/coverage/unit-NN.md`, mapping every guide sub-topic on the
  unit's enumerated checklist (FR-009a) to a file, a named subsection, and the source cited;
  the auditable evidence of coverage read by the depth gate and the Content gate. Sits with
  the course's other pipeline governance artifacts, not in `docs/`.
- **Sources-Consulted List**: one committed file per unit at
  `specs/content/<course-code>/sources/unit-NN.md`, listing every reading actually used
  (mapped reading, open-access substitute, or "no external source found") with a one-line note
  of what it supports; kept consistent with the coverage matrix.
- **Expanded Course Content-Spec**: the Spec 006 content-spec plus a Course Description,
  annotated per-unit Reading list, Week schedule, and Standards & frameworks anchors, with
  each per-unit subsection carrying an enumerated guide-sub-topic checklist (FR-009a, the list
  the coverage matrix is graded against), a depth budget, prerequisites, misconceptions,
  mapped readings, and a worked-examples plan; carries the same approved status marker.
- **Authoring Skill**: the committed, invocable method — a driving document plus pedagogy,
  depth-standard, and citation/register references — that produces a unit's five files and its
  coverage matrix from an approved content-spec subsection and the course guide.
- **Depth Gate**: the CI check that blocks a merge when a unit's coverage matrix, required
  blocks, formative floor, reading-minutes consistency, or matrix/sources consistency fail;
  additive to the Spec 001 validators and the Spec 006 pipeline gate.
- **Standard Version Marker**: the style guide's version field, moved to 2.0, freezing the
  style guide and terminology bank as a pair; any later edit to either requires a bump.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: EFMP-302 Unit 1's content-spec subsection enumerates its guide sub-topics (all
  leaf bullets under guide sections 1.1–1.4) as a checklist, and the re-drafted unit's
  coverage matrix maps 100% of that checklist to a named subsection with a cited source — zero
  unmapped sub-topics.
- **SC-002**: The re-drafted EFMP-302 Unit 1 cites at least 3 distinct scholarly sources (from
  its mapped guide readings or recorded topically-related open-access substitutes), up from 0
  in the current draft.
- **SC-003**: The re-drafted EFMP-302 Unit 1 clears Spec 001's validators, the Spec 006
  pipeline gate, the new depth gate, and the human Content gate on its first full run, with a
  committed coverage matrix and sources-consulted list.
- **SC-004**: A pull request whose unit omits a guide sub-topic subsection, or has fewer than
  5 formative items, fails the depth gate in 100% of attempts, with the failure message
  naming the unmet condition.
- **SC-005**: The re-drafted EFMP-302 Unit 1's student-facing prose stays within the
  established plain-English register — a readability spot-check finds no graduate-level term
  used without a glossary entry.
- **SC-006**: `specs/content/efmp-302/content-spec.md`, upgraded to the expanded schema,
  carries the Course Description and 100% of the guide's recommended readings as full
  citations, each tagged to at least one unit, and is re-approved.
- **SC-007**: After the proving unit passes, `style-guide.md`'s `version` field reads `"2.0"`
  (governing the terminology bank as its frozen pair), and the style guide contains the depth
  standard and the statement of what the automated gate does and does not check.
- **SC-008**: A second author (or a second run of the skill) re-drafting a different unit
  needs zero clarifying questions about what "enough depth" means — the enumerated
  guide-sub-topic checklist and the per-unit depth budget fully determine it.

## Assumptions

- **Pipeline artifacts stay plain files in Git**: the depth standard is prose in
  `specs/content/style-guide.md`; the coverage matrix and sources-consulted list are committed
  Markdown files under `specs/content/<course-code>/coverage/` and `.../sources/` (with the
  course's other governance artifacts, not in `docs/`); the expanded content-spec stays a
  single Markdown file per course. No database, consistent with Constitution Art. V.1 and Spec
  006's Assumptions.
- **Spec 001 and Spec 006 tooling is extended, not rebuilt**: the EN↔UR structural-parity
  check, `assessment_weighting` sum-to-100, front-matter presence (Spec 001), and the
  tracker/content-spec/terminology pipeline gate (Spec 006) already exist; this feature adds
  one new depth check alongside them and expands one schema.
- **The authoring skill is a Claude Code skill under `.claude/skills/`**: an invocable,
  version-controlled method with progressive disclosure, not a prose runbook.
- **The proving unit already exists**: EFMP-302 Unit 1 is published bilingual from Spec 006's
  work; this feature re-drafts its English content to the new standard and hands off the Urdu
  mirror for re-work (resets `translation_status`, opens a G4/G5 revision row), rather than
  authoring a unit from nothing. The Urdu re-translation/re-review itself is downstream
  (FR-016).
- **The Teacher gate is per-course, once (Constitution Art. VII)**: EFMP-302's teacher gate
  was satisfied under Spec 006 and is not re-run for this re-draft. The re-drafted activities
  and assessments are still curriculum-owner-reviewed at the Content gate (FR-013 / SC-003); a
  fresh teacher dry-run is out of scope for this feature and, if the owner wants one for the
  changed assessments, it is scheduled separately.
- **"Reading-minutes consistency" is checked against the depth-budget range, not a computed
  figure**: the depth gate sums `est_reading_minutes` across the unit's five English files and
  checks that the **unit total** falls within the target reading-minutes range recorded in
  that unit's content-spec depth budget (FR-009) — a loose band the author sets, not a value
  the gate computes from word count, and not a per-file check (a single range cannot fit both
  `teacher-notes.mdx` and `index.mdx`).
- **Open-access substitution is the norm, not the exception, at first**: many guide readings
  are books or paywalled journal articles; the pipeline is expected to lean on recorded
  topically-related open-access sources until originals are acquired, and this is acceptable
  provided the substitute genuinely supports the sub-topic.

## Dependencies

- **Spec 006 (Content Authoring Pipeline)**: supplies the stage sequence (G0–G7), the five-file
  folding rule (FR-004) the concept-coverage rule maps onto, the course content-spec this
  feature expands, the task tracker Story 5 rolls out through, the pipeline gate this feature's
  depth gate runs beside, and the style-guide/terminology version-freeze mechanism (FR-007).
- **Spec 001 (Content Platform)**: supplies the golden template, the EN↔UR structural-parity
  gate that carries concept coverage into the Urdu mirror (FR-017), the FR-003 missing-Urdu
  "translation in progress" EN-fallback banner that covers the interim after an EN re-draft,
  and the build-time validators the re-drafted proving unit must still pass.
- **ADR-0010 (Accepted, 2026-08-27)**: records this feature's decision cluster — the
  concept-coverage metric over a word floor, CI enforcement over reviewer-only, a skill over a
  method document, the open-access substitution policy, the proof-first rollout, and the v2.0
  pair freeze — with the alternatives considered.
- **Constitution Art. II (guide supremacy / gap escalation), Art. III.1 (plain-English
  register), Art. III.3 (Bloom's tagging), Art. III.5 (citations), Art. VI.1 (golden-unit
  exemplar + the v2.5.0 "Standard versioning" clause — proving unit, golden-unit re-proof as
  the immediate next content task, working depth exemplar), Art. VII (review gates), Art. X.2
  (docs gate)**: the authoritative constraints this standard operationalises.
