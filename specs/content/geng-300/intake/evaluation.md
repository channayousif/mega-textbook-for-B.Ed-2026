# GENG-300 - Intake Evaluation (G0/G1)

**Course**: GENG-300 · Functional English
**Evaluator**: agent:evaluator
**Date**: 2026-09-22
**Manifest**: `specs/content/geng-300/intake/manifest.json` (70 bound inputs)
**Verdict**: APPROVED

## Criteria

### 1. Identity - PASS

- Code: GENG-300 matches guide and catalog.
- Title: "Functional English" matches guide (`FUNCTIONAL ENGLISH`) and catalog.
- Credit hours: 3 (3-0) matches guide ("Credit Hours 3") and catalog.
- Semester: 1st matches guide and catalog.
- Category: General Education matches catalog.
- bilingual: false matches catalog (English-only).

### 2. Partition - ESCALATED (recorded, not blocking)

The guide gives numbered syllabus sections but no week table or unit numbering. The 4-unit
partition is a judgement the guide does not determine. The proposed partition is recorded below
for owner confirmation:

- Unit 1 (weeks 1-4): Foundations of Functional English
- Unit 2 (weeks 5-8): Comprehension and Analysis
- Unit 3 (weeks 9-12): Effective Communication
- Unit 4 (weeks 13-16): Professional Writing and Intercultural Communication

This is a derived partition per D-2026-0012. Owner confirmation recorded under D-2026-00XX.

### 3. Coverage - PASS

Every guide sub-topic maps to exactly one spec sub-topic:

- Foundations: vocabulary building, communicative grammar, word formation, sentence structure,
  sound production and pronunciation → U1-01..U1-05
- Comprehension and Analysis: purpose/audience/context, contextual interpretation, reading
  strategies, active listening → U2-01..U2-04
- Effective Communication: principles, structuring documents, inclusivity, public speaking,
  presentation skills, informal communication, professional writing → U3-01..U3-06
- Intercultural communication (CLO 4): intercultural variations, cultural awareness, adapting
  communication style → U4-03, U4-04

No guide sub-topic is omitted; no spec sub-topic lacks a guide ancestor.

### 4. Outcomes - PASS

All 4 CLOs are reproduced verbatim from the guide:
1. Apply enhanced English communication skills through effective use of word choices, grammar
   and sentence structure. → Unit 1
2. Comprehend a variety of literary / non-literary written and spoken texts in English. → Unit 2
3. Effectively express information, ideas and opinions in written and spoken English. → Units 3, 4
4. Recognize inter-cultural variations in the use of English language and to effectively adapt
  their communication style and content based on diverse cultural and social contexts. → Unit 4

### 5. Readings - PASS (with D-2026-0001)

The guide lists 10 recommended readings (Azar, Murphy, Straus, Hutchinson & Waters, Downes,
Swan, James & Merickel, Johns & Lenski, Kintsch, Verma & Raman). All are print monographs.
Per D-2026-0001, unretrievable sources are flagged and proceeded with. No open-access substitutes
are required at intake; the authoring pass may add them.

### 6. Blueprint - PASS

Each unit specifies a 10/10/5 assessment blueprint (10 MCQ / 10 RRQ / 5 ERQ) with >= 2 MCQ
and >= 2 RRQ per topic. Bloom ranges align with the style guide (MCQ Remember-Apply, RRQ
Understand-Analyze, ERQ Analyze+).

### 7. Structure - PASS

The content-spec follows the v4.0 structure: front-matter (`course_code`, `status: approved`),
course-wide items, per-unit blocks with Sub-topic checklist, Topic list, Depth budget, Figure
plan, and Assessment blueprint.

### 8. Decision Residue - PASS

No confirmed decisions in `specs/decisions/log.md` are superseded by this spec. The course is
new; no prior designs exist.

## Decision

**APPROVED** (with partition escalation recorded). The content-spec is a faithful derivation
of the course guide. The 4-unit partition is derived and labelled per D-2026-0012.
