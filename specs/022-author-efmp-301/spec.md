# Feature Specification: Complete EFMP-301 Educational Psychology Course

**Feature Branch**: `022-author-efmp-301`
**Created**: 2026-09-24
**Status**: Draft
**Input**: User description: "complete the remaining uncomplete courses of semester 1" (this feature: EFMP-301 Educational Psychology, Semester 1 - the course currently has only Unit 1)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Course is fully authored and accessible (Priority: P1)

As a B.Ed student in Semester 1, I want to access the complete EFMP-301 Educational
Psychology course on the platform so that I can study human growth and development, learning
theories, cognitive processes, intelligence and creativity, motivation, individual differences,
classroom management, assessment, the teaching-learning process and school well-being, in both
English and Urdu.

**Why this priority**: This is the core deliverable. Without authored content, the course
does not exist for students beyond Unit 1.

**Independent Test**: Navigate to the course page on the platform, verify all 6 units are
present with topics, assessment, and teacher notes, in English and in Urdu. Verify all
figures render correctly in both locales. Verify Unit 1 is byte-identical to its published
state.

**Acceptance Scenarios**:

1. **Given** the course exists in the catalog, **When** a student navigates to the course
   page, **Then** all 6 units are listed with their topics and learning materials
2. **Given** a unit page is loaded, **When** the student views a topic, **Then** the
   nine-part learning cycle is present (situation, explanation, activity, check
   understanding, summary, self-assessment, practicum task, summative task, further
   reading)
3. **Given** the assessment page is loaded, **When** the student views questions, **Then**
   10 MCQs, 10 RRQs, and 5 ERQs are present with answer guidance
4. **Given** the course is bilingual, **When** the student switches to the Urdu locale,
   **Then** every new unit page renders its complete Urdu mirror with Urdu-labelled figures

---

### User Story 2 - Content follows quality standards (Priority: P2)

As a curriculum owner, I want the course to follow the platform's pedagogical and
structural standards so that it is consistent with other courses and passes all automated
quality gates.

**Why this priority**: Quality gates ensure the content is pedagogically sound,
structurally consistent, and accessible.

**Independent Test**: Run `npm run check:content` and verify all gates pass. Verify
figures meet accessibility standards (no colour-only meaning, alt text present).

**Acceptance Scenarios**:

1. **Given** the course is authored, **When** the content validation gate runs, **Then**
   all front-matter is valid, no em dash is present, and no answer keys are leaked
2. **Given** the course is authored, **When** the concept graph gate runs, **Then** all
   concepts are acyclic with resolvable prerequisites
3. **Given** the course is authored, **When** the figures gate runs, **Then** each topic
   has at least 2 figures and each unit has at least 1 schematic
   (concept-map/flowchart/timeline)

---

### User Story 3 - Sources are verifiable and Urdu parity holds (Priority: P3)

As a student or reviewer, I want all cited sources to be real and verifiable, and the Urdu
version to say what the English says, so that I can trust the academic integrity of the
course content in both languages.

**Why this priority**: Academic integrity depends on real, citable sources; bilingual
integrity depends on reviewed parity.

**Independent Test**: Verify that every source cited in the course resolves to a real
publication. Verify that the guide's two recommended open-access books are bound with
verification dates. Verify the Urdu mirror carries the same headings, components, figure
IDs, and assessment items as the English.

**Acceptance Scenarios**:

1. **Given** a source is cited in prose, **When** the source-floor gate runs, **Then**
   the source appears in the sources-consulted list with a valid citation
2. **Given** a guide-recommended source cannot be retrieved, **When** the source is
   recorded, **Then** it is flagged as unverifiable with a ruling reference per
   D-2026-0001
3. **Given** a unit's Urdu mirror exists, **When** the bilingual parity gate runs,
   **Then** the Urdu file set, heading vectors, and figure wiring match the English unit

---

### Edge Cases

- What happens when a course guide numbers its outline by week and chapter but carries no
  unit headings beyond the existing Unit 1? The units 2+ partition is derived from the
  guide's own week/chapter grouping, clearly labelled as derived with its basis stated,
  per D-2026-0012, and requires evaluator approval with owner confirmation.
- What happens when the guide's recommended readings are open-access URLs rather than
  print monographs? They are verified by retrieval from the authoring host at authoring
  time and bound with verification dates; if a URL cannot be retrieved, the source is
  flagged per D-2026-0001 rather than blocking.
- What happens when a review finding demands changes to Unit 1? Unit 1 is the certified,
  published golden unit; it is never edited. The finding is escalated under the agent's
  G-code block for an owner ruling.
- What happens when Unit 1's open G5 tracker row is encountered? The row may gain advisory
  evidence (a g5-reviewer report) without touching Unit 1 bytes; the row itself stays open
  because the style guide requires a human quality pass before
  `translation_status: reviewed`.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST extend `specs/content/efmp-301/content-spec.md` from its
  Unit-1-only scope to the guide-determined full course (6 units), keeping Unit 1's
  approved G1 blocks byte-identical, labelling the units 2+ partition as derived per
  D-2026-0012
- **FR-002**: System MUST re-run G0/G1 intake: freeze the extended spec, prepare intake
  evidence, and obtain an evaluator decision recorded from the pre-allocated
  D-2026-0043..0052 block (never "next free")
- **FR-003**: System MUST author units 2-6 following the Spec 008 per-topic structure:
  index.mdx, topic-*.mdx (nine-part cycles), unit-assessment.mdx (10/10/5 + bounded
  answers), unit-teacher-notes.mdx
- **FR-004**: System MUST create governance artefacts per new unit: coverage matrix (v2),
  sources consulted, figure manifest (v2), and concept graph (v4)
- **FR-005**: System MUST render SVG figures for all planned schematic figures, with dark
  variants and `.ur.svg` Urdu-label mirrored variants, replacing markers with `<Figure>`
  elements and updating manifest status to placed; illustrations stay prompt-only for
  Codex per ADR-0024
- **FR-006**: System MUST ensure all content gates pass per unit and at course level:
  validate:content, pipeline-gate, depth-gate, figures, no-em-dash, no-answer-keys,
  concept-graph, bloom-bands, source-floor, content-status, docs-sync
- **FR-007**: System MUST bind the guide's two recommended open-access books as verified
  sources (with retrieval dates) and supplement with verifiable open-access sources for
  in-prose citations; unretrievable sources are flagged per D-2026-0001
- **FR-008**: System MUST author a complete Urdu mirror for every new unit (G4) and obtain
  an advisory G5 review for every new unit, binding to the accepted G3 evidence
- **FR-009**: System MUST obtain an advisory G3 English review for every new unit from a
  fresh reviewer session
- **FR-010**: System MUST NOT modify Unit 1's content, Urdu mirror, or existing
  governance/review artefacts (golden unit); any finding demanding such a change is
  escalated, not applied
- **FR-011**: System MUST record per-unit gate evidence via the prepare-gate-evidence
  script and extend the course tasks.md tracker with rows for units 2-6 (keeping Unit 1's
  existing rows untouched), never marking G3/G5/G6/G7 rows done from advisory findings

### Key Entities

- **Course**: EFMP-301 Educational Psychology, 3 (3-0) credits, Semester 1, Major:
  Professional, bilingual (English + Urdu)
- **Unit**: A major section of the course containing multiple topics (6 units total; Unit 1
  exists and is frozen)
- **Topic**: A nine-part learning cycle with situation, explanation, activity, assessment
- **Figure**: A visual element (SVG schematic or prompt-only illustration) embedded in a
  topic
- **Assessment Item**: MCQ, RRQ, or ERQ with Bloom level and marking guidance
- **Source**: A cited publication (book, article, or open-access resource)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 6 units exist on the platform with complete nine-part topic cycles
  (Unit 1 preserved byte-identical; units 2-6 newly authored covering all guide weeks
  3-16 sub-topics)
- **SC-002**: All content gates pass when `npm run check:content` is run, and
  `npm run check:all` passes at the full tier before the PR
- **SC-003**: Every new topic has at least 2 rendered figure carriers, each new unit has
  at least 1 concept-map/flowchart/timeline, and every schematic carries an Urdu-label
  variant
- **SC-004**: The course renders correctly on the platform at the Semester 1 course route
  in both locales
- **SC-005**: All cited sources appear in the sources-consulted list with valid
  bibliographic detail and verification dates; any unretrievable source is flagged per
  D-2026-0001
- **SC-006**: The extended spec passes G0/G1 intake recorded under a D-2026-0043..0052
  code (or the blocking items are escalated under G-2026-52..61), and every new unit
  carries advisory G3 and G5 review reports
- **SC-007**: Every new unit has a complete Urdu mirror whose file set, heading vectors,
  figure IDs, and assessment items match the English unit
