# Feature Specification: Complete EFMP-302 Teaching Profession Course

**Feature Branch**: `023-author-efmp-302`
**Created**: 2026-09-24
**Status**: Draft
**Input**: Orchestrator mandate: "Complete EFMP-302 to the batch standard. Current state: ALL 6 English units are authored and published under docs/semester-1/efmp-302/ (full per-topic layout); Urdu mirrors exist ONLY for units 1-2; the pipeline tracker shows units 2-6 at the gate-checked tier (no accepted G3/G5 evidence). Your job: complete the Urdu corpus (units 3-6), run G3 advisory reviews where tracker rows are open, and run G5 advisory reviews for all units with Urdu mirrors - without unnecessary rework of what earlier cycles already settled." (this feature: EFMP-302 Teaching Profession, Semester 1)

## Course history this feature inherits

- All 6 English units are authored, gate-checked and published under ADR-0026's `gated` tier
  (Unit 1 is `certified` with human sign-off and a reviewed Urdu mirror; Units 2-6 publish under
  "Draft - expert review pending").
- EFMP-302 consumed G3 review cycles 001-007 in mid-September 2026. Unit 3's provisional tier was
  revoked under Art. VII.4 (ADR-0027 narrowed the bound set); Unit 2's cycle-3 pass
  (`antigravity-g3-efmp302-u2-c3-20260920T222443Z.json`) is likewise stale against current
  manifests. All prior G3 evidence is advisory and none binds current bytes.
- Unit 2 is the ADR-0022 Urdu rate probe; its Urdu mirror exists alongside Unit 1's. Units 3-6
  have no Urdu mirror.
- This feature does NOT re-author English content except repairs that fresh reviews demand,
  within the two-cycle budget per ADR-0019.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Course is fully bilingual and accessible (Priority: P1)

As a B.Ed student in Semester 1 studying in the Urdu medium, I want the complete EFMP-302
Teaching Profession course in Urdu so that I can study the teaching profession - the effective
teacher, roles and responsibilities, professionalism and ethics, professional development,
assessment and reflective practice - in my own language.

**Why this priority**: This is the core deliverable. Under ADR-0022 the Urdu corpus is a
corpus-completion requirement; without units 3-6 the course is four-sixths English-only for its
Urdu-medium audience.

**Independent Test**: Switch the platform to the Urdu locale, navigate to every EFMP-302 unit
1-6, and verify each renders a complete Urdu mirror (index, every topic, unit assessment,
teacher notes) with Urdu-labelled figures and no untranslated-fallback banner on any unit.

**Acceptance Scenarios**:

1. **Given** the course is bilingual, **When** the student opens units 3, 4, 5 or 6 in the Urdu
   locale, **Then** every file of the English unit has a same-named Urdu counterpart with the
   same headings, components, figure IDs and assessment items
2. **Given** a topic page is opened in Urdu, **Then** its figures render from `.ur.svg`
   variants with Urdu labels, in light and dark themes
3. **Given** a unit assessment is opened in Urdu, **Then** the 10 MCQ / 10 RRQ / 5 ERQ bank and
   the bounded answers section carry the same cognitive work as the English

### User Story 2 - Content follows quality standards (Priority: P2)

As a curriculum owner, I want the Urdu corpus and any English-side review repairs to pass every
automated quality gate so that the published course stays consistent with the platform's
standards.

**Why this priority**: ADR-0026 makes the deterministic gates the load-bearing quality
mechanism; nothing may merge with a red gate.

**Independent Test**: Run `npm run check:all` (full tier including the bilingual build) and
verify every gate passes for both locales.

**Acceptance Scenarios**:

1. **Given** a unit's Urdu mirror is added, **When** `npm run check:content` runs, **Then**
   validate:content, figures, no-em-dash (which scans i18n/), no-answer-keys and every other
   content gate pass
2. **Given** an English-side repair changes bytes, **When** gate evidence is regenerated via
   `prepare-gate-evidence.mjs`, **Then** the unit's G2 row references the new manifest paths
3. **Given** the Urdu mirror is drafted, **When** the temporary reviewed-flip check runs, **Then**
   the parity and terminology gates hold before the flip is reverted

### User Story 3 - Review evidence and Urdu parity are on the record (Priority: P3)

As a reviewer or auditor, I want fresh advisory G3 and G5 review reports for the units whose
tracker rows are open, with every binding failure escalated rather than papered over, so that
the review queue under ADR-0026 has real evidence to act on.

**Why this priority**: ADR-0026 keeps every published-but-uncertified unit in the review queue;
advisory reports are the queue's currency, and ADR-0019 forbids agent sign-off.

**Independent Test**: Inspect `specs/content/efmp-302/reviews/unit-NN/{G3,G5}/` for fresh
reports binding current bytes, and `specs/gaps.md` for G-2026-62..71 escalations covering every
binding failure. Verify no G3/G5/G6/G7 tracker row was marked done from agent findings.

**Acceptance Scenarios**:

1. **Given** a unit's G3 row is open, **When** a fresh g3-reviewer session runs against a
   prepared manifest, **Then** a validated advisory report lands under the unit's reviews tree
   and the row stays open with the report path in Notes
2. **Given** a G5 review cannot bind accepted G3 evidence (none exists, or post-pass repairs
   changed English bytes), **Then** the failure is recorded as an escalation under the
   G-2026-62..71 block in the G-2026-34 pattern and the review continues on the bound English
   inputs as comparison base
3. **Given** a review returns blocking findings, **When** repairs are applied, **Then** at most
   two repair-and-review cycles run per unit before the remainder escalates under the G-block

---

### Edge Cases

- What happens when no accepted G3 evidence exists for a unit (ADR-0019 blocks agent
  certification)? The G5 reviewer proceeds with the bound English inputs as the authoritative
  comparison base and records the dependency as a finding; the author records the escalation
  under the G-block in the G-2026-34 pattern (see also G-2026-30 for the course-wide form).
- What happens when post-pass advisory repairs changed the English bytes after a G3 pass? The
  G5 dependency is stale by the freshness rule; the delta is the reviewer's own advisory list,
  which the escalation records, and the G5 findings stand on their own evidence.
- What happens when the frozen terminology bank lacks a term a unit needs? The term is
  translated, recorded as a proposed term in the handoff and in the unit's concepts authored
  labels, and never banked by the translator (the bank is read-only to this feature).
- What happens with Unit 3's revoked provisional tier and the prior cycles' parked findings?
  The revocation stands; prior reports stay on record; fresh reviews bind current bytes and do
  not re-litigate closed rows; cycle counts beyond the two-cycle budget escalate under the
  G-block rather than consuming further cycles.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST translate units 3-6 into complete Urdu mirrors at G4 (index.mdx,
  every topic file, unit-assessment.mdx with the 10/10/5 bank and bounded answers,
  unit-teacher-notes.mdx), bound to the frozen terminology bank, academic-plain register,
  emitting the UR `key_terms` block each Urdu index carries
- **FR-002**: System MUST generate `.ur.svg` and `.ur.dark.svg` Urdu-label figure variants for
  units 3-6 per the generate-figures bilingual-figures reference, keeping figure IDs, alt text
  meaning and geometry consistent with the English SVGs
- **FR-003**: System MUST run `npm run check:content` after each unit's mirror and `npm run
  check:all` before the PR, fixing findings within the two-cycle budget
- **FR-004**: System MUST run a fresh advisory G3 review for each unit whose G3 tracker row is
  open (units 2-6), from a reviewer session that never authored the bytes, against a prepared
  input manifest
- **FR-005**: System MUST apply sensible English-side repairs demanded by G3 findings (max two
  repair-and-review cycles per unit, then escalate under the G-block), re-running
  `prepare-gate-evidence.mjs` and updating G2 rows whenever bytes change
- **FR-006**: System MUST run a fresh advisory G5 review for every unit with a complete Urdu
  mirror (units 1-6), binding to accepted G3 evidence per freshness rules, and record every
  binding failure as an escalation under the G-2026-62..71 block
- **FR-007**: System MUST leave every G3/G5/G6/G7 tracker row un-done from agent findings; rows
  stay open with report paths in Notes; no human initials; no self-signing
- **FR-008**: System MUST NOT modify the existing unit-01/02 Urdu mirrors except repairs a G5
  review demands, within the two-cycle budget
- **FR-009**: System MUST record PHRs for the feature under `history/prompts/023-author-efmp-302/`
  and run records under `history/prompts/efmp-302/`
- **FR-010**: System MUST consume only the pre-assigned code blocks: D-2026-0053..0062 for
  evaluator approvals (if intake action is needed), G-2026-62..71 for escalations; hot files are
  append-only within those blocks

### Key Entities

- **Course**: EFMP-302 Teaching Profession, 3 (3-0) credits, Semester 1, Professional
  Course-II, bilingual (English + Urdu)
- **Unit mirror**: The same-named Urdu file set under
  `i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-NN/`
- **Figure variant**: `<figId>.ur.svg` (+ derived `.ur.dark.svg`) with Urdu labels, same
  geometry as the English SVG
- **Advisory review report**: A validated JSON report under
  `specs/content/efmp-302/reviews/unit-NN/{G3,G5}/` binding a prepared input manifest
- **Escalation**: A `specs/gaps.md` entry under the G-2026-62..71 block recording a binding
  failure or budget exhaustion for the owner

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Units 3-6 each carry a complete Urdu mirror (unit 3: 5 topics; units 4-6: 4 topics
  each; plus index, assessment, teacher notes) whose file set, heading vectors, components,
  figure IDs and assessment items match the English unit
- **SC-002**: Every figure in units 3-6 has `.ur.svg` and `.ur.dark.svg` variants;
  `npm run figures:variants:check` is clean
- **SC-003**: `npm run check:all` passes at the final commit
- **SC-004**: Units 2-6 each carry a fresh advisory G3 report binding current bytes; units 1-6
  each carry a fresh advisory G5 report (unit 1's only if its mirror needed repair; otherwise
  its existing accepted human sign-off stands and no fresh G5 is forced)
- **SC-005**: Every G5-to-G3 binding failure and every budget exhaustion is escalated under
  G-2026-62..71; no tracker row is marked done from agent findings
- **SC-006**: The Urdu corpus uses only bank-accepted terminology in `key_terms` blocks;
  unbanked terms are recorded as proposals, never silently banked
- **SC-007**: The PR reports Urdu word counts per unit, review runs and outcomes, D/G codes
  consumed, and every escalation
