# Implementation Plan: Author GENG-300 · Functional English

## Context

GENG-300 · Functional English is a new 3-credit General Education course for Semester 1
of the B.Ed (4-Year) programme. The course exists in `catalog/c.json` but has no authored
content. The course guide (`GENG-300 Functional English Outline.docx`, 4807 chars) provides
4 CLOs, 3 syllabus sections, and 10 recommended readings. The spec (FR-001..FR-08) defines
the requirements. This plan decomposes the work into tasks.

## Implementation Approach

Follow the gated Spec 006/008 workflow. Author English-only (bilingual: false), no Urdu
mirror. Use the licence track (`docs/semester-1/geng-300/unit-NN/`).

## Tasks

### Task 1: Create content-spec.md (G1 Gate)

**File**: `specs/content/geng-300/content-spec.md`

Create the content-spec with `status: approved`:

- **Front-matter**: `course_code: GENG-300`, `status: approved`
- **Header**: Licence track, 3 (3-0) credit hours, 16 weeks, source reference
- **Course-wide items**:
  - 4 CLOs (verbatim from guide)
  - Teaching strategies: lecture, discussions, Q&A, brainstorming
  - Assessment criteria: class test, mid term, assignments, attendance, participation
  - Practical work: group work, group assignments, individual assignment, presentations
  - 10 recommended readings + open-access supplements
  - Week schedule: derived-and-labelled per D-2026-0012 (guide has no week table)

- **4 unit blocks**, each with:
  - `### Sub-topic checklist` table
  - `### Topic list` table (reading-min + figures)
  - `**Depth budget**`
  - `**Common misconceptions**`
  - `**Figure plan**` (≥ 2 per topic, ≥ 1 schematic per unit)
  - `**Unit-end assessment blueprint**` (10/10/5)

| Unit | Title | Weeks | Sub-topics | CLOs |
|---|---|---|---|---|
| 1 | Foundations of Functional English | 1-4 | 8 sub-topics | CLO 1 |
| 2 | Comprehension and Analysis | 5-8 | 7 sub-topics | CLO 2 |
| 3 | Effective Communication | 9-12 | 10 sub-topics | CLO 3 |
| 4 | Professional Writing and Intercultural Communication | 13-16 | 6 sub-topics | CLO 3, 4 |

### Task 2: G0/G1 Intake Evaluation

**Files**:
- `specs/content/geng-300/intake/manifest.json`
- `specs/content/geng-300/intake/evaluation.md`

1. Create intake manifest with bound inputs (guide docx, constitution, catalog, contracts,
   content-spec, style-guide, terminology)
2. Run evaluation against 8 criteria (identity, partition, coverage, outcomes, readings,
   blueprint, structure, decision residue)
3. Record decision as `## D-2026-00XX` in `specs/decisions/log.md`

### Task 3: Author Unit 1 - Foundations of Functional English

**Files**:
- `docs/semester-1/geng-300/unit-01/index.mdx`
- `docs/semester-1/geng-300/unit-01/topic-01..08.mdx` (8 topics)
- `docs/semester-1/geng-300/unit-01/unit-assessment.mdx`
- `docs/semester-1/geng-300/unit-01/unit-teacher-notes.mdx`
- `specs/content/geng-300/coverage/unit-01.md`
- `specs/content/geng-300/sources/unit-01.md`
- `specs/content/geng-300/figures/unit-01.md`
- `specs/content/geng-300/concepts/unit-01.md`

Sub-topics: vocabulary building, communicative grammar, word formation, sentence structure,
sound production & pronunciation (plus 3 more granular sub-topics).

Run `npm run check:content` after completion.

### Task 4: Author Unit 2 - Comprehension and Analysis

**Files**: Same pattern as Unit 1, for `unit-02/`

Sub-topics: purpose/audience/context, contextual interpretation, reading strategies,
active listening (plus 3 more).

Run `npm run check:content` after completion.

### Task 5: Author Unit 3 - Effective Communication

**Files**: Same pattern, for `unit-03/`

Sub-topics: principles of communication, structuring documents, inclusivity, public speaking,
presentation skills, informal communication (plus 4 more).

Run `npm run check:content` after completion.

### Task 6: Author Unit 4 - Professional Writing and Intercultural Communication

**Files**: Same pattern, for `unit-04/`

Sub-topics: professional writing (emails, memos, reports, letters), intercultural variation,
cultural awareness, inclusive language, global communication (plus 1 more).

Run `npm run check:content` after completion.

### Task 7: Generate Figures

**Files**: SVG files under `static/img/figures/geng-300/unit-NN/`

For each unit, use the generate-figures skill:
- Classify each figure as schematic or illustration
- Author SVG schematics (Codex primary, Claude fallback)
- Place `<Figure>` elements in topic files
- Generate dark variants (`npm run figures:variants`)
- Update manifest rows to `Status: placed`

### Task 8: Gates and Deploy

1. Run `npm run check:content` (all 11 gates)
2. Run `npm run check:all` (full suite)
3. Commit all files
4. Push to origin/main
5. Run local-ci for deploy attestation
6. Run deploy-prod.sh

## Key Authoring Rules

- Register: Plain English for HSC/intermediate graduate (Constitution Art. III.1)
- Pakistan/Sindh-grounded examples
- Real open-access sources (never invent citations)
- Bloom tags: American spelling (Analyze not Analyse)
- clo_refs: `SLO:GENG-300-N-X`
- ≥ 2 figures per topic, ≥ 1 concept-map/flowchart/timeline per unit
- No em dash (U+2014) in any content
- No colour-only meaning in figures

## Verification

1. `npm run check:content` passes (all 11 gates)
2. All SVG files exist and are ≤ 20 KB
3. `check:figures` passes (≥ 2/topic, ≥ 1 schematic/unit)
4. `check:concept-graph` passes (acyclic, resolvable)
5. `check:bloom-bands` passes (MCQ Remember-Apply, RRQ Understand-Analyze, ERQ Analyze+)
6. `check:depth-gate` passes (reading-min within budget)
7. Course renders at textbook.com.pk/docs/semester-1/geng-300/
