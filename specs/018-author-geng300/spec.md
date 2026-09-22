# Feature Specification: Author GENG-300 Functional English Course

**Feature Branch**: `018-author-geng300`
**Created**: 2026-09-22
**Status**: Draft
**Input**: User description: "Author a course: GENG-300 · Functional English, see the approved plan"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Course is fully authored and accessible (Priority: P1)

As a B.Ed student in Semester 1, I want to access the complete GENG-300 Functional English
course on the platform so that I can study functional English skills including grammar,
comprehension, communication, and professional writing.

**Why this priority**: This is the core deliverable. Without authored content, the course
does not exist for students.

**Independent Test**: Navigate to the course page on the platform, verify all 4 units are
present with topics, assessment, and teacher notes. Verify all figures render correctly.

**Acceptance Scenarios**:

1. **Given** the course exists in the catalog, **When** a student navigates to the course
   page, **Then** all 4 units are listed with their topics and learning materials
2. **Given** a unit page is loaded, **When** the student views a topic, **Then** the
   nine-part learning cycle is present (situation, explanation, activity, check understanding,
   summary, self-assessment, practicum task, summative task, further reading)
3. **Given** the assessment page is loaded, **When** the student views questions, **Then**
   10 MCQs, 10 RRQs, and 5 ERQs are present with answer guidance

---

### User Story 2 - Content follows quality standards (Priority: P2)

As a curriculum owner, I want the course to follow the platform's pedagogical and structural
standards so that it is consistent with other courses and passes all automated quality gates.

**Why this priority**: Quality gates ensure the content is pedagogically sound, structurally
consistent, and accessible.

**Independent Test**: Run `npm run check:content` and verify all 11 gates pass. Verify figures
meet accessibility standards (no colour-only meaning, alt text present).

**Acceptance Scenarios**:

1. **Given** the course is authored, **When** the content validation gate runs, **Then**
   all front-matter is valid, no em dash is present, and no answer keys are leaked
2. **Given** the course is authored, **When** the concept graph gate runs, **Then** all
   concepts are acyclic with resolvable prerequisites
3. **Given** the course is authored, **When** the figures gate runs, **Then** each topic
   has at least 2 figures and each unit has at least 1 schematic (concept-map/flowchart/timeline)

---

### User Story 3 - Sources are properly cited (Priority: P3)

As a student or reviewer, I want all cited sources to be real and verifiable so that I can
trust the academic integrity of the course content.

**Why this priority**: Academic integrity depends on real, citable sources.

**Independent Test**: Verify that every source cited in the course resolves to a real
publication. Verify that unretrievable monographs are flagged per D-2026-0001.

**Acceptance Scenarios**:

1. **Given** a source is cited in prose, **When** the source-floor gate runs, **Then**
   the source appears in the sources-consulted list with a valid citation
2. **Given** a source is a print monograph, **When** the source is recorded, **Then** it
   is flagged as unverifiable with an owner ruling reference

---

### Edge Cases

- What happens when a course guide has no week schedule? The spec must record the week
  schedule as guide-silent or derived-and-labelled per D-2026-0012.
- What happens when the guide lists commercial monographs? They are flagged as unretrievable
  per D-2026-0001 and supplemented with open-access sources.
- What happens when a course is marked bilingual: false? No Urdu mirror is required, and
  bilingual diagram/glossary parity rules are waived.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST create a G0/G1 intake evaluation for GENG-300 that records the
  course identity, partition, coverage, outcomes, readings, blueprint, structure, and
  decision residue against the course guide
- **FR-002**: System MUST create a content-spec.md with 4 units, each containing a sub-topic
  checklist, topic list with reading-minutes and figures, depth budget, common misconceptions,
  figure plan, and 10/10/5 assessment blueprint
- **FR-003**: System MUST author 4 units following the Spec 008 per-topic structure: index.mdx,
  topic-*.mdx (nine-part cycles), unit-assessment.mdx (10/10/5 + answers), unit-teacher-notes.mdx
- **FR-004**: System MUST create governance artefacts per unit: coverage matrix, sources consulted,
  figure manifest, and concept graph
- **FR-005**: System MUST generate SVG figures for all planned figures, with dark variants,
  replacing markers with `<Figure>` elements and updating manifest status to placed
- **FR-006**: System MUST ensure all content gates pass: validate:content, pipeline-gate,
  depth-gate, figures, no-em-dash, no-answer-keys, concept-graph, bloom-bands, source-floor,
  content-status, docs-sync
- **FR-007**: System MUST use the course guide's 10 recommended readings as primary sources,
  supplemented with open-access sources where available
- **FR-008**: System MUST record the course as English-only (bilingual: false) with no Urdu mirror

### Key Entities

- **Course**: GENG-300 Functional English, 3 (3-0) credits, Semester 1, General Education
- **Unit**: A major section of the course containing multiple topics (4 units total)
- **Topic**: A nine-part learning cycle with situation, explanation, activity, assessment
- **Figure**: A visual element (SVG schematic) embedded in a topic
- **Assessment Item**: MCQ, RRQ, or ERQ with Bloom level and marking guidance
- **Source**: A cited publication (book, article, or open-access resource)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 4 units are authored with complete nine-part topic cycles (36 topics total
  across 4 units)
- **SC-002**: All 11 content gates pass when `npm run check:content` is run
- **SC-003**: Every topic has at least 2 rendered figure SVGs (≥ 72 figures total)
- **SC-004**: The course renders correctly at textbook.com.pk/licence/geng-300/ with all
  pages returning HTTP 200
- **SC-005**: All cited sources appear in the sources-consulted list with valid bibliographic
  detail
- **SC-006**: The course passes G0/G1 intake evaluation and is recorded under a D- code
