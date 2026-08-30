# Contract: End-of-Course Matter (`course-review.mdx`)

**File**: `docs/semester-N/<course>/course-review.mdx` (course-level, sibling of `course-overview.mdx`)
**Read by**: `scripts/validate-content.mjs` (front matter, via `checkCourseReview`) and
`scripts/check-no-answer-keys.mjs` (FR-008–010)
**Format**: MDX. Front matter per `contracts/course-review.schema.json`.
**Presence**: OPTIONAL (FR-006 "MAY"). Authored when a course is fully restructured — **not** part
of EFMP-302's Spec 008 DoD (FR-029).

## Front matter

```yaml
---
title: "EFMP-302 — Course review"
course_code: EFMP-302
sidebar_position: 900        # the ONLY sanctioned sidebar_position in content — sorts after the last unit
translation_status: draft
---
```

- `required`: `title`, `course_code` (pattern `^[A-Z]{2,4}-[0-9]{3}(--)?$`, must match the course folder).
- `sidebar_position` SHOULD be `900` (any value that sorts after the highest `unit-NN` is valid;
  `900` is the convention). Mirror the same key in the UR i18n copy.
- Answer-key front-matter keys forbidden (`not/anyOf`), same as the unit and course-overview schemas.

## Body skeleton (headings the gate checks in **bold**)

```mdx
<PrintHandout />

# <Course title> — course review

**## Course summary**
<the whole-course recap: the through-lines across the units>

**## Practice questions**
### Multiple-choice questions (MCQs)
### Restricted-response questions (RRQs)
### Extended-response questions (ERQs)

**## Project ideas for your practicum school**
<3–6 real-school project briefs a trainee can carry into placement — each with a purpose,
 a rough method, and what evidence to bring back>

**## Answers and marking guidance**        ← MUST be the file's FINAL top-level (##) section
### MCQ answer key
### RRQ model answers and mark schemes
### ERQ rubrics
```

## Rules

| Rule | Gate | Failure if… |
|---|---|---|
| Front matter valid against `course-review.schema.json`; `course_code` matches the folder | validator (`checkCourseReview`) | invalid or mismatched |
| `## Course summary`, `## Practice questions`, `## Project ideas for your practicum school` present and well-formed | **human Content gate only** | — (no automated body/heading check for this file; `validate-content.mjs` checks front matter only) |
| `## Answers and marking guidance` present, exactly one, the last `##` section | answer-key gate (`check-no-answer-keys.mjs`) | more than one; any `##` after it |
| Prose answer patterns only below the answers heading; no answer-key front-matter key anywhere | answer-key gate + validator | any answer phrase above the line; any of the four keys present |

The `## Answers and marking guidance` bounded-block rule is **identical** to
`contracts/end-of-unit-assessment.md` — one canonical case-sensitive heading, must be last, ≤ 1 per
file. `scripts/check-no-answer-keys.mjs` treats `unit-assessment.mdx` and `course-review.mdx`
identically.

## Practice-question counts

Unlike the end-of-unit bank, the course-review practice bank has **no fixed count** — it is a
revision resource sized to the course. The three sub-headings SHOULD each be present; the human
Content gate judges sufficiency.

## Not checked by the gate

Question quality; whether the project ideas are feasible in a real Sindh school; whether the summary
captures the course's through-lines; the size of the practice bank.
