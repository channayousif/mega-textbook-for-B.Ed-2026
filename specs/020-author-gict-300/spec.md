# Feature Specification: Author GICT-300 Application of ICT Course

**Feature Branch**: `020-author-gict-300`
**Created**: 2026-09-23
**Status**: Draft
**Input**: User description: "Author GICT-300 Application of ICT course content (Semester 1, B.Ed 4-Year, bilingual, degree track)"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Course is fully authored and accessible (Priority: P1)

As a B.Ed student in Semester 1, I want to access the complete GICT-300 Application of ICT
course on the platform so that I can study computer literacy, hardware and software,
operating systems, cybersecurity, digital ethics, and emerging technologies.

**Why this priority**: This is the core deliverable. Without authored content, the course
does not exist for students; the legacy placeholder tree shows only a coming-soon notice.

**Independent Test**: Navigate to the course page on the platform, verify all 6 units are
present with topics, assessment, and teacher notes. Verify all figures render correctly in
both light and dark themes, in English and Urdu.

**Acceptance Scenarios**:

1. **Given** the course exists in the catalog, **When** a student navigates to the course
   page, **Then** all 6 units are listed with their topics and learning materials
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
meet accessibility standards (no colour-only meaning, alt text present, palette tokens,
wordmark).

**Acceptance Scenarios**:

1. **Given** the course is authored, **When** the content validation gate runs, **Then**
   all front-matter is valid, no em dash is present, and no answer keys are leaked
2. **Given** the course is authored, **When** the concept graph gate runs, **Then** all
   concepts are acyclic with resolvable prerequisites
3. **Given** the course is authored, **When** the figures gate runs, **Then** each topic
   has at least 2 figures and each unit has at least 1 schematic (concept-map/flowchart/timeline)

---

### User Story 3 - Sources are verifiable and Urdu parity is delivered (Priority: P3)

As a student or reviewer, I want all cited sources to be real and verifiable, and the complete
Urdu mirror to exist, so that I can trust the academic integrity of the course and study it in
either language.

**Why this priority**: Academic integrity depends on real, citable sources; Urdu parity is a
corpus completion requirement (Constitution Art. III.2) and this course is bilingual.

**Independent Test**: Verify that every source cited in the course resolves to a real
publication. Verify that unretrievable monographs are flagged per D-2026-0001. Verify each
unit's Urdu mirror exists with matching structure and translation_status transitions.

**Acceptance Scenarios**:

1. **Given** a source is cited in prose, **When** the source-floor gate runs, **Then**
   the source appears in the sources-consulted list with a valid citation
2. **Given** a source is a print monograph, **When** the source is recorded, **Then** it
   is flagged as unverifiable with an owner ruling reference (D-2026-0001)
3. **Given** a unit is authored in English, **When** the Urdu mirror is complete, **Then**
   the bilingual parity gate passes and the translation follows the frozen terminology bank

---

### Edge Cases

- What happens when the course guide has no week schedule? The spec records the week
  schedule as guide-silent or derived-and-labelled per D-2026-0012.
- What happens when the guide lists commercial print monographs? They are cited at
  title/bibliographic level only, flagged as unretrievable per D-2026-0001, and supplemented
  with open-access sources.
- What happens when a G3 or G5 advisory review finds defects? Repairs are applied in at most
  2 cycles per stage; if findings persist, the gap is escalated under this feature's G-code
  block (G-2026-25..G-2026-27) and the tracker row stays in-progress.
- What happens to the legacy placeholder tree? The coming_soon five-file set is replaced by
  the per-topic layout; the course-overview is rewritten and _category_.json labels fixed.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST create a G0/G1 intake evaluation for GICT-300 that records the
  course identity, partition, coverage, outcomes, readings, blueprint, structure, and
  decision residue against the course guide, approved under a D-code from the pre-assigned
  block D-2026-0030..D-2026-0039 (never "next free")
- **FR-002**: System MUST create a content-spec.md with 6 units following the guide's
  Unit 1-6 headings, each containing a sub-topic checklist, topic list with reading-minutes
  and figures, depth budget, common misconceptions, figure plan, and 10/10/5 assessment
  blueprint
- **FR-003**: System MUST author 6 units following the Spec 008 per-topic structure:
  index.mdx, topic-*.mdx (nine-part cycles), unit-assessment.mdx (10/10/5 + bounded answers),
  unit-teacher-notes.mdx
- **FR-004**: System MUST create governance artefacts per unit: coverage matrix, sources
  consulted, figure manifest, and concept graph
- **FR-005**: System MUST generate SVG figures for all planned figures (Codex-primary with
  Claude fallback), with dark variants and Urdu-label variants (.ur.svg + .ur.dark.svg),
  replacing markers with `<Figure>` elements and updating manifest status to placed
- **FR-006**: System MUST ensure all content gates pass: validate:content, pipeline-gate,
  depth-gate, figures, no-em-dash, no-answer-keys, concept-graph, bloom-bands, source-floor,
  content-status, docs-sync
- **FR-007**: System MUST use the course guide's 5 recommended readings as primary sources
  (title-level support per D-2026-0001 where print-only), supplemented with open-access
  sources
- **FR-008**: System MUST create a complete Urdu mirror per unit under
  i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gict-300/unit-NN/ with
  translation_status transitions per the translate-unit skill contract (bilingual: true)
- **FR-009**: System MUST obtain advisory G3 (English) and G5 (Urdu) reviews per unit from
  fresh reviewer subagents; findings are advisory (ADR-0019), review rows are never marked
  done, and no human initials are used
- **FR-010**: System MUST replace the legacy placeholder tree (delete activities/formative/
  summative.mdx and teacher-notes.mdx, drop coming_soon, rewrite course-overview.mdx, fix
  _category_.json labels)

### Key Entities

- **Course**: GICT-300 Application of ICT, 3 (2-1) credit hours, Semester 1, General
  Education, bilingual
- **Unit**: A major section of the course containing multiple topics (6 units total)
- **Topic**: A nine-part learning cycle with situation, explanation, activity, assessment
- **Figure**: A visual element (SVG schematic or prompt-only illustration) embedded in a topic
- **Assessment Item**: MCQ, RRQ, or ERQ with Bloom level and marking guidance
- **Source**: A cited publication (book, article, or open-access resource)

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 6 units are authored with complete nine-part topic cycles (topic count
  finalised by the approved content-spec; approximately 25 topics)
- **SC-002**: All 11 content gates pass when `npm run check:content` is run
- **SC-003**: Every topic has at least 2 rendered figure SVGs with light/dark/Urdu variants
- **SC-004**: Every unit has a complete Urdu mirror and the bilingual parity gates pass
- **SC-005**: All cited sources appear in the sources-consulted list with valid bibliographic
  detail; print-only monographs flagged per D-2026-0001
- **SC-006**: The course passes G0/G1 intake evaluation recorded under a D-code from the
  D-2026-0030..0039 block
