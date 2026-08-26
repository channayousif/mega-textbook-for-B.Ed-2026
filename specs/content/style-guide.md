---
version: "0.1-draft"
---

# Content Style Guide

Shared reference for every course/unit produced through the content authoring pipeline
(Spec 006). The Content gate (Constitution Art. VII) checks every drafted unit against this
document. `version` (front matter above) is the single freeze marker for **both** this document
and `terminology.csv` (FR-007, research.md R8) — the two are always versioned/frozen together;
bumping either past v1 requires bumping this field.

## EN readability rules

- Target register: accessible to a fresh HSC/intermediate graduate (Constitution Art. III.1).
  No graduate-level jargon without a bilingual glossary entry (`glossary.json`).
- Prefer short sentences and active voice. One idea per paragraph.
- Define a technical term the first time it appears in a unit, then use it consistently —
  do not switch between synonyms for the same concept within a unit.

## UR register rules

- Register: academic-plain (درسی مگر عام فہم) — not literary/archaic (Constitution Art. III.2).
- Every student-facing unit MUST have a complete, human-reviewed Urdu version before publish,
  except units belonging to a course flagged `bilingual: false`.
- Machine translation MAY draft; a human quality pass is mandatory before a unit is marked
  `translation_status: reviewed`.

## Pakistan/Sindh localization rules

- Case studies and examples use Pakistani/Sindh classroom contexts wherever the subject allows
  (Constitution Art. III.4).

## Citation format

- All prose is original. Quotations under 15 words carry a citation to the course guide, HEC
  document, or a named academic source.
- A course guide's recommended readings are cited by reference only — never reproduced
  (Constitution Art. III.5, FR-010).

## Diagram conventions

- Diagrams/images carry descriptive alt text (Constitution Art. III.8).
- No color-only meaning; semantic heading hierarchy throughout.

## Terminology bank

`specs/content/terminology.csv` (`term_en,term_ur,notes`) is the mandatory reference every
translator consults (FR-006). A conflict between a translator's term choice and the bank is
resolved by the curriculum owner, and the resolution updates the bank so later translators see
it (research.md R4).

## Answer-key marker patterns (FR-016d)

The CI gate's keyword/pattern scan (`scripts/check-no-answer-keys.mjs`) blocks a PR that adds a
committed file matching any of these markers, pending human confirmation it is a false positive
or removal of the content. This list is heuristic (can false-positive/negative) and is
maintained here alongside the scan itself:

- `answer_key:` / `answers:` / `marking_scheme:` / `rubric_answers:` (forbidden front-matter keys)
- "answer key"
- "marking scheme"
- "correct answer"

## Assessment blueprint defaults (FR-008/FR-009)

- Formative: 5–8 items, Remember → Understand → Apply.
- Summative: mixed constructed-response with a rubric, plus at least one Analyze-or-higher item.
- Weighting default: 60% summative / 40% formative (Constitution Art. III.7). A per-unit
  deviation is permitted only when justified in that unit's spec.
