---
feature: 024-licence-topic-design
status: approved
created: 2026-09-26
owner_decisions: 2026-09-26 (this session)
---

# Feature 024: the licence track as a topic list

## Why

The licence track (Feature 015) held one course-shaped module, EED-313 Classroom Management. To
serve all of Part II of the Sindh Teaching Licence test, the owner decided on 2026-09-26:

1. **Shape.** The licence track does not use subject > unit > topic > assessment. It is a list of
   topics and subtopics under a **Pedagogy** section: the five STEDA Part II headings (A-E), each
   holding its syllabus objectives as pages. The syllabus (S1, SIBA Testing Services 2024) is a
   table of contents, and the track mirrors it one page per objective.
2. **No course codes.** Licence content carries none. EED-313 is migrated into heading C and its
   code retired.
3. **Cross-link, do not duplicate.** Where a degree topic already teaches an objective, the
   licence page gives an exam-focused summary plus a link to that topic. Only the material the
   degree leaves out is authored.
4. **Practice.** Each subtopic page ends with 1-2 CRQs with rubrics, and each heading has a
   practice page with a CRQ set and a case-study ERQ with rubrics.
5. **Semester I** is recorded as content-complete, with its review backlog kept queued.

## Requirements

- **FR-001**: `catalog/licence-objectives.json` lists all 57 Part II objectives verbatim from S1,
  with heading, slug and the 2025 HEC guide units each was copied from.
- **FR-002**: every objective has exactly one page at `licence/pedagogy/<heading>/<slug>.mdx`, and
  every heading has `index.mdx` and `practice.mdx`.
- **FR-003**: page front matter follows `contracts/licence-page.schema.json`, and pages follow
  `contracts/licence-page.md`.
- **FR-004**: every declared degree link resolves to an existing `docs/` file and is linked in
  the body.
- **FR-005**: depth is set by coverage: `covered` is capped, `partial` and `authored` have floors.
- **FR-006**: degree pages that licence pages link to show an "On the Sindh Teaching Licence
  test" box linking back, without editing any degree file. This keeps reviewed units' hashed
  evidence valid.
- **FR-007**: licence content is excluded from the unit-shaped gates and keeps the em-dash and
  answer-key scans. Rubrics sit under the final `## Answers and marking guidance`.
- **FR-008**: retired EED-313 URLs redirect to their new pages.
- **FR-009**: each Urdu mirror matches its English page's kind, objective, coverage, links and
  question counts.

## Out of scope

- Part I (Class 1-8 content knowledge).
- A certification evidence contract for topic-list pages. G3/G5 tooling is unit-shaped, so
  licence pages get advisory independent reviews only (follow-up).
- Making licence pages assignable in classes (G-2026-69).

## Success criteria

- `npm run check:licence` passes without `--allow-missing`: 57/57 objective pages plus 5
  practice pages, in English and Urdu.
- `npm run check:content` and the en+ur build pass.
- `licence/eed-313/` is gone and its URLs redirect.
