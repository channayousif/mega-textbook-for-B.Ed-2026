# Phase 1 Data Model: Bilingual Content Platform

**Feature**: 001-content-platform | **Date**: 2026-07-17

This feature has **no database** — its "data model" is the content structure on disk plus the front-matter metadata that the validator enforces. Entities map to folders/files; relationships are expressed by folder nesting and front-matter references. Field contracts are formalized in `contracts/*.schema.json`.

---

## Entity: Semester

The programme term grouping courses.

| Field | Type | Source | Notes |
|---|---|---|---|
| number | int 1–8 | folder `semester-{n}` | ordering |
| title_en / title_ur | string | `_category_.json` label + i18n | display label |
| priority | int | `catalog/courses.json` | 1–4 authored first |

- **Representation**: `docs/semester-{n}/` (EN) + `i18n/ur/.../semester-{n}/` (UR).
- **Relationships**: has many Courses.
- **Rules**: all 8 MUST exist (FR-014); ordered 1→8 in the sidebar.

## Entity: Course

A subject within a semester.

| Field | Type | Source | Notes |
|---|---|---|---|
| course_code | string | folder name (e.g. `efmp-301`) | matches `^[A-Z]{2,4}-[0-9]{3}(--)?$` (uppercased); placeholder codes (e.g. `EFPC-4--`) allowed while pending |
| title_en / title_ur | string | `_category_.json` + i18n | |
| credit_hours | string | `catalog/courses.json` | e.g. `3 (3-0)` |
| category | enum | catalog | General Education / Major: Professional / Pedagogy / Elective / Practical / Interdisciplinary / Internship / Capstone |
| position | int | `_category_.json` | sidebar order within semester |

- **Representation**: `docs/semester-{n}/<course-code>/` with a `_category_.json` and one `course-overview.mdx`.
- **Relationships**: belongs to one Semester; has one Course overview; has many Units.
- **Rules**: adding a Course = new folder + metadata only, no code change (FR-005, SC-006). Un-authored courses still render with "coming soon" placeholder units (SC-005).

## Entity: Course overview

Course-wide teaching context, referenced by the course's units (not repeated per unit).

- **File**: `course-overview.mdx` (front-matter contract: `contracts/course-overview.schema.json`).
- **Carries**: teaching/instructional strategies, assessment criteria (with 60/40 weighting), practical work, recommended resources/books (as citations, never reproduced).
- **Relationships**: belongs to one Course; referenced by its Units.
- **Rules**: guide sections fold **here + into the five unit files** — no new file types (FR-008, Constitution III.6; Spec 006 §2 mapping).

## Entity: Unit

A chapter within a course — the core reading artifact.

**Fixed five-file shape** (FR-007; SDD F2 — these five are the only unit files):

| File | Section | Folded guide content (Spec 006 §2) |
|---|---|---|
| `index.mdx` | Content | Reading materials, "Further reading", References |
| `activities.mdx` | Activities | Suggested Practical Activities (flagged **optional**) |
| `formative.mdx` | Formative | Assessment criteria framing (formative side) |
| `summative.mdx` | Summative | Assessment criteria framing (summative side) |
| `teacher-notes.mdx` | Teacher Notes | Teaching/Instructional Strategies + Practical Work block |

**Front-matter schema** (contract: `contracts/unit-frontmatter.schema.json`):

| Field | Req? | Type | Rule |
|---|---|---|---|
| `course_code` | ✅ | string | must match the parent course folder |
| `unit_no` | ✅ | int ≥ 1 | matches `unit-NN` folder |
| `clo_refs` | ✅ | string[] (≥1) | SLO-format refs `SLO:<course-code>-<unit-no>-<n>` (e.g. `SLO:EFMP-301-1-2`); key stays `clo_refs` per Constitution II.2 |
| `blooms_summary` | ✅ | string | Bloom coverage summary (Constitution III.3) |
| `est_reading_minutes` | ✅ | int ≥ 1 | reading estimate |
| `translation_status` | ✅ | enum `draft` \| `reviewed` | UR publish only when `reviewed` (FR-003) |
| `title` | ✅ | string | page title |
| `resources` | ○ | object[] `{ref, type?}` | reading materials/recommended books — **shape-checked when present** |
| `teaching_strategies` | ○ | string[] | shape-checked when present |
| `assessment_weighting` | ○ | object `{summative:int, formative:int}` | defaults `{60,40}`; if present must sum to 100 (custom validator check) |
| `assessment_weighting_note` | ○ | string | justification for any deviation from 60/40 (FR-010); required in practice when weighting ≠ `{60,40}` |
| `coming_soon` | ○ | boolean | placeholder/un-authored marker → "coming soon" render (SC-005) |

- **Forbidden fields (FR-012)**: no `answer_key`, `answers`, `marking_scheme`, `rubric_answers` anywhere — validator rejects them (answer keys live only in the backend, Spec 005).
- **Representation**: `docs/semester-{n}/<course-code>/unit-NN/` (EN) mirrored under `i18n/ur/...` (UR).
- **Relationships**: belongs to one Course; references Course overview; references CLOs; may produce Handouts.
- **State** (per-language render on the `/ur/` route):
  - `coming_soon: true` → placeholder, marked forthcoming, excluded from search index and from the parity gate.
  - **no UR file** → `/ur/` falls back to EN body under an "Urdu translation not yet available" banner (FR-003, Q1); exempt from parity gate.
  - `translation_status: draft` → UR file shown with a visible "draft translation" badge (FR-003); exempt from parity gate.
  - `translation_status: reviewed` → publishable as complete bilingual unit; **subject to the EN↔UR structural parity gate** (rule 6).

## Entity: Recommended resource / reading material

- **Representation**: entries in a Unit's `resources[]` or listed in `course-overview.mdx`; rendered as a References/Further-reading list.
- **Rule**: bibliographic citation only — never reproduced as content (Constitution III.5, Spec 006 CP6).

## Entity: Glossary term

Bilingual definition for a specialized term, surfaced inline (clarification 2026-07-17, Q → A).

| Field | Type | Rule |
|---|---|---|
| `term` | string | unique key; the jargon term as written |
| `definition_en` | string | English definition (simple-English register, Constitution III.1) |
| `definition_ur` | string | Urdu definition (academic-plain register) |

- **Representation**: entries in `glossary.json` (contract: `contracts/glossary.schema.json`); surfaced via `<Glossary term="...">` in any MDX file — no separate glossary page (out of scope this feature).
- **Rules**: adding/editing a term is a content/data-only change (no platform code, FR-016, aligns FR-005/SC-006). `<Glossary term="X">` MUST reference an existing `term` in `glossary.json`; a missing key is a validation error (fails the build like other content gates). Both `definition_en` and `definition_ur` required so no term ships monolingual (Constitution III.1/III.2).

## Entity: Handout

- **Representation** *(clarification 2026-07-17, Q3)*: **not a stored file** — a print-optimized rendering of the page itself. Each of `activities.mdx`, `formative.mdx`, `summative.mdx` surfaces a `<PrintHandout/>` control that calls `window.print()` against an A4 `@media print` stylesheet; the reader's browser produces the PDF. No `static/handouts/*.pdf` artifacts and no build-time PDF pipeline in this feature.
- **Source**: `activities.mdx`, `formative.mdx`, and `summative.mdx` (all public framing).
- **Rule**: public-safe content only; the print stylesheet hides site chrome and paginates clean on A4 with RTL/Nastaliq preserved (FR-011, SC-009); no answer keys (FR-012).

---

## Structural validation rules (enforced by `validate-content.mjs`)

1. Every `unit-NN/` contains exactly the five files; missing a required file → build fails.
2. Every required front-matter field present and typed per schema → else build fails naming the file+field (SC-007).
3. Optional fields, when present, match their shape; `assessment_weighting` must sum to 100.
4. No forbidden answer-key field appears in any file (FR-012).
5. `course_code`/`unit_no` in front-matter agree with the folder path.
6. **EN↔UR structural parity gate (FR-001 clarified, build-enforced)**: for any unit whose UR `translation_status` is `reviewed`, the EN and UR versions MUST match in (a) section-file presence (same five files) and (b) heading structure — the ordered vector of Markdown heading levels/counts per file must be equal. A mismatch fails the build, naming the file and first divergent heading. Units with `translation_status: draft` or **no UR file at all** are exempt from this gate; the `/ur/` route instead falls back to EN content under an "untranslated" banner (draft → "draft translation" badge) per FR-003.
7. Un-authored units set `coming_soon: true` (keeps SC-005 dead-end-free) and are excluded from the search index (FR-006) while remaining visible in the sidebar marked "coming soon".

## State transitions (Unit lifecycle)

```
scaffolded (coming_soon:true)
      │  author EN
      ▼
EN drafted (coming_soon:false, translation_status:draft)
      │  content gate (Art. VII)
      ▼
EN reviewed  ──► UR drafted (translation_status:draft, UR badge shown)
                      │  UR human review (Art. VII)
                      ▼
              reviewed (translation_status:reviewed) → publishable bilingual
```
The golden unit EFMP-301 U1 additionally passes the Teacher gate before the template is frozen (SC-008).
