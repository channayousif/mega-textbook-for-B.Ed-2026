# Feature Specification: Author GQUR-300 Quantitative Reasoning-I Course

**Feature Branch**: `021-author-gqur-300`
**Created**: 2026-09-23
**Status**: Draft
**Input**: User description: "Author GQUR-300 Quantitative Reasoning-I course content"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Course is fully authored and accessible (Priority: P1)

As a B.Ed student in Semester 1, I want to access the complete GQUR-300
Quantitative Reasoning-I course on the platform so that I can study quantitative
reasoning foundations, numbers and operations, algebraic reasoning, measurement
and geometry, data analysis, and everyday quantitative problem solving.

**Why this priority**: This is the core deliverable. Without authored content, the
course does not exist for students.

**Independent Test**: Navigate to the course page on the platform, verify all 6
units are present with topics, assessment, and teacher notes. Verify all figures
render correctly in both English and Urdu locales.

**Acceptance Scenarios**:

1. **Given** the course exists in the catalog, **When** a student navigates to the
   course page, **Then** all 6 units are listed with their topics and learning
   materials
2. **Given** a unit page is loaded, **When** the student views a topic, **Then**
   the nine-part learning cycle is present (situation, explanation, activity,
   check understanding, summary, self-assessment, practicum task, summative task,
   further reading)
3. **Given** the assessment page is loaded, **When** the student views questions,
   **Then** 10 MCQs, 10 RRQs, and 5 ERQs are present with answer guidance

---

### User Story 2 - Content follows quality standards (Priority: P2)

As a curriculum owner, I want the course to follow the platform's pedagogical and
structural standards so that it is consistent with other courses and passes all
automated quality gates.

**Why this priority**: Quality gates ensure the content is pedagogically sound,
structurally consistent, and accessible.

**Independent Test**: Run `npm run check:content` and verify all 11 gates pass.
Verify figures meet accessibility standards (no colour-only meaning, alt text
present).

**Acceptance Scenarios**:

1. **Given** the course is authored, **When** the content validation gate runs,
   **Then** all front-matter is valid, no em dash is present, and no answer keys
   are leaked
2. **Given** the course is authored, **When** the concept graph gate runs,
   **Then** all concepts are acyclic with resolvable prerequisites
3. **Given** the course is authored, **When** the figures gate runs, **Then** each
   topic has at least 2 figures and each unit has at least 1 schematic
   (concept-map/flowchart/timeline)

---

### User Story 3 - Sources are verifiable and Urdu parity holds (Priority: P3)

As a student or reviewer, I want all cited sources to be real and verifiable and
the Urdu mirror to match the English course structurally, so that I can trust the
academic integrity of the course in both languages.

**Why this priority**: Academic integrity and bilingual parity are core platform
promises; they matter once the content exists.

**Independent Test**: Verify that every source cited in the course resolves to a
real publication, that unretrievable monographs are flagged per D-2026-0001, and
that `npm run check:content` passes with the bilingual parity gates active for
every unit's Urdu mirror.

**Acceptance Scenarios**:

1. **Given** a source is cited in prose, **When** the source-floor gate runs,
   **Then** the source appears in the sources-consulted list with a valid
   citation
2. **Given** a source is a print monograph, **When** the source is recorded,
   **Then** it is flagged as unverifiable with an owner ruling reference
3. **Given** a unit's English content is accepted, **When** the Urdu mirror is
   authored, **Then** the mirror carries the same file set, heading vectors,
   figure IDs, and assessment items, and the parity gate passes

---

### Edge Cases

- What happens when a course guide has no week schedule? The spec must record the
  week schedule as guide-silent or derived-and-labelled per D-2026-0012.
- What happens when the guide lists commercial monographs? They are flagged as
  unretrievable per D-2026-0001 and supplemented with open-access sources.
- What happens when a course is marked bilingual: true? A complete Urdu mirror is
  required for every unit (G4) with G5 review, `.ur.svg` figure variants, and the
  terminology bank governs Urdu labels.
- What happens when mathematical notation spans both locales? Notation stays
  simple and consistent per the style guide, with numerals following the style
  guide's numeral policy in both English and Urdu prose.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST create a G0/G1 intake evaluation for GQUR-300 that
  records the course identity, partition, coverage, outcomes, readings,
  blueprint, structure, and decision residue against the course guide
- **FR-002**: System MUST create a content-spec.md with 6 units, each containing
  a sub-topic checklist, topic list with reading-minutes and figures, depth
  budget, common misconceptions, figure plan, and 10/10/5 assessment blueprint
- **FR-003**: System MUST author 6 units following the Spec 008 per-topic
  structure: index.mdx, topic-*.mdx (nine-part cycles), unit-assessment.mdx
  (10/10/5 + answers), unit-teacher-notes.mdx
- **FR-004**: System MUST create governance artefacts per unit: coverage matrix,
  sources consulted, figure manifest, and concept graph
- **FR-005**: System MUST generate SVG figures for all planned schematic figures,
  with dark variants and Urdu-label `.ur.svg` variants, replacing markers with
  `<Figure>` elements and updating manifest status to placed; illustrations stay
  prompt-only for Codex per ADR-0024
- **FR-006**: System MUST ensure all content gates pass: validate:content,
  pipeline-gate, depth-gate, figures, no-em-dash, no-answer-keys, concept-graph,
  bloom-bands, source-floor, content-status, docs-sync
- **FR-007**: System MUST use the course guide's 4 recommended readings as
  primary sources, supplemented with open-access sources where available
- **FR-008**: System MUST author a complete Urdu mirror per unit under
  i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-NN/
  (bilingual: true), bound to the frozen terminology bank
- **FR-009**: System MUST replace the legacy placeholder tree at
  docs/semester-1/gqur-300/ (delete activities/formative/summative and
  teacher-notes placeholders, drop coming_soon, rewrite course-overview.mdx,
  fix _category_.json labels)

### Key Entities

- **Course**: GQUR-300 Quantitative Reasoning-I, 3 (3-0) credits, Semester 1,
  General Education, bilingual
- **Unit**: A major section of the course containing multiple topics (6 units
  total)
- **Topic**: A nine-part learning cycle with situation, explanation, activity,
  assessment
- **Figure**: A visual element (SVG schematic or prompt-only illustration)
  embedded in a topic, with light/dark and English/Urdu variants
- **Assessment Item**: MCQ, RRQ, or ERQ with Bloom level and marking guidance
- **Source**: A cited publication (book, article, or open-access resource)
- **Urdu Mirror**: The complete per-unit Urdu translation carrying the same
  structure, figures, and assessment items

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 6 units are authored with complete nine-part topic cycles
- **SC-002**: All 11 content gates pass when `npm run check:content` is run
- **SC-003**: Every topic has at least 2 rendered figure carriers and each unit
  has at least 1 schematic (concept-map/flowchart/timeline)
- **SC-004**: The course renders correctly at textbook.com.pk/semester-1/gqur-300/
  with all pages returning HTTP 200 in both locales
- **SC-005**: All cited sources appear in the sources-consulted list with valid
  bibliographic detail
- **SC-006**: The course passes G0/G1 intake evaluation and is recorded under a
  D- code from the pre-assigned block D-2026-0040..D-2026-0049
- **SC-007**: Every unit has a complete Urdu mirror that passes the bilingual
  parity gates
