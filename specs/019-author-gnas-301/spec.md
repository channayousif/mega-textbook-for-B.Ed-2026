# Feature Specification: Author GNAS-301 Environmental Science Course

**Feature Branch**: `019-author-gnas-301`
**Created**: 2026-09-23
**Status**: Draft
**Input**: User description: "Author remaining courses in new session per course with dedicated agent to each. use /sp.specify skill to create separate specs and pranch for each course. follow speckit SDD workflow constitution and the skills to author the content." (this feature: GNAS-301 Environmental Science, Semester 1)

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Course is fully authored and accessible (Priority: P1)

As a B.Ed student in Semester 1, I want to access the complete GNAS-301 Environmental
Science course on the platform so that I can study environmental science including
ecosystems, pollution, waste management, occupational safety, toxicology, and climate
change, in both English and Urdu.

**Why this priority**: This is the core deliverable. Without authored content, the course
does not exist for students.

**Independent Test**: Navigate to the course page on the platform, verify all 6 units are
present with topics, assessment, and teacher notes, in English and in Urdu. Verify all
figures render correctly in both locales.

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
   **Then** every unit page renders its complete Urdu mirror with Urdu-labelled figures

---

### User Story 2 - Content follows quality standards (Priority: P2)

As a curriculum owner, I want the course to follow the platform's pedagogical and
structural standards so that it is consistent with other courses and passes all automated
quality gates.

**Why this priority**: Quality gates ensure the content is pedagogically sound,
structurally consistent, and accessible.

**Independent Test**: Run `npm run check:content` and verify all 11 gates pass. Verify
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
publication. Verify that unretrievable monographs are flagged per D-2026-0001. Verify the
Urdu mirror carries the same headings, components, figure IDs, and assessment items as the
English.

**Acceptance Scenarios**:

1. **Given** a source is cited in prose, **When** the source-floor gate runs, **Then**
   the source appears in the sources-consulted list with a valid citation
2. **Given** a source is a print monograph, **When** the source is recorded, **Then** it
   is flagged as unverifiable with an owner ruling reference
3. **Given** a unit's Urdu mirror exists, **When** the bilingual parity gate runs,
   **Then** the Urdu file set, heading vectors, and figure wiring match the English unit

---

### Edge Cases

- What happens when a course guide numbers its outline by week but carries no unit
  headings? The unit partition is derived from the guide's own week grouping, clearly
  labelled as derived with its basis stated, per D-2026-0012.
- What happens when the guide lists commercial print monographs? They are listed as
  bibliographic references, supported at title level, and flagged as unretrievable per
  D-2026-0001 where their text cannot be obtained; open-access substitutes carry the
  citations in prose.
- What happens when the catalog and guide state credit hours differently (catalog
  "3 (2-1)" vs guide "Credit Hours 3")? The guide states the total; the catalog carries
  the split; the two agree on the total of 3, so there is no Article II.3 conflict to
  escalate.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST create a G0/G1 intake evaluation for GNAS-301 that records the
  course identity, partition, coverage, outcomes, readings, blueprint, structure, and
  decision residue against the course guide, under a D-2026-0020..0029 decision code
- **FR-002**: System MUST create a content-spec.md with 6 units, each containing a
  sub-topic checklist, topic list with reading-minutes and figures, depth budget, common
  misconceptions, figure plan, and 10/10/5 assessment blueprint
- **FR-003**: System MUST author 6 units following the Spec 008 per-topic structure:
  index.mdx, topic-*.mdx (nine-part cycles), unit-assessment.mdx (10/10/5 + bounded
  answers), unit-teacher-notes.mdx
- **FR-004**: System MUST create governance artefacts per unit: coverage matrix (v2),
  sources consulted, figure manifest (v2), and concept graph (v4)
- **FR-005**: System MUST render SVG figures for all planned schematic figures, with dark
  variants and `.ur.svg` Urdu-label mirrored variants, replacing markers with `<Figure>`
  elements and updating manifest status to placed; illustrations stay prompt-only for
  Codex per ADR-0024
- **FR-006**: System MUST ensure all content gates pass: validate:content,
  pipeline-gate, depth-gate, figures, no-em-dash, no-answer-keys, concept-graph,
  bloom-bands, source-floor, content-status, docs-sync
- **FR-007**: System MUST use the course guide's 7 recommended readings as bibliographic
  references, supplemented with verifiable open-access sources for in-prose citations
- **FR-008**: System MUST author a complete Urdu mirror for every unit (G4) and obtain an
  advisory G5 review for every unit, binding to the accepted G3 evidence
- **FR-009**: System MUST obtain an advisory G3 English review for every unit from a
  fresh reviewer session
- **FR-010**: System MUST replace the legacy placeholder tree (coming_soon unit-01
  five-file set) with the authored per-topic units and rewrite course-overview.mdx and
  _category_.json labels
- **FR-011**: System MUST record per-unit gate evidence via the prepare-gate-evidence
  script and keep the course tasks.md tracker rows in step with the evidence kind (never
  a done mark for G3/G5/G6/G7 from advisory findings)

### Key Entities

- **Course**: GNAS-301 Environmental Science, 3 (2-1) credits, Semester 1, General
  Education, bilingual (English + Urdu)
- **Unit**: A major section of the course containing multiple topics (6 units total)
- **Topic**: A nine-part learning cycle with situation, explanation, activity, assessment
- **Figure**: A visual element (SVG schematic or prompt-only illustration) embedded in a
  topic
- **Assessment Item**: MCQ, RRQ, or ERQ with Bloom level and marking guidance
- **Source**: A cited publication (book, article, or open-access resource)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 6 units are authored with complete nine-part topic cycles (28 topics
  total across 6 units, covering all 52 guide sub-topics)
- **SC-002**: All 11 content gates pass when `npm run check:content` is run
- **SC-003**: Every topic has at least 2 rendered figure carriers (>= 56 figures total),
  each unit has at least 1 concept-map/flowchart/timeline, and every schematic carries an
  Urdu-label variant
- **SC-004**: The course renders correctly on the platform at the Semester 1 course route
  in both locales
- **SC-005**: All cited sources appear in the sources-consulted list with valid
  bibliographic detail; unretrievable guide monographs are flagged per D-2026-0001
- **SC-006**: The course passes G0/G1 intake evaluation recorded under a D-2026-0020..0029
  code, and every unit carries advisory G3 and G5 review reports
- **SC-007**: Every unit has a complete Urdu mirror whose file set, heading vectors,
  figure IDs, and assessment items match the English unit
