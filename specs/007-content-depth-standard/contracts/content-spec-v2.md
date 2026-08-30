# Contract: Expanded Course Content-Spec (v2)

> **Extended by Spec 008 — see `specs/008-rich-unit-pedagogy/contracts/content-spec-v3.md`.**
> v2 stays valid for any course/unit that has not opted into the per-topic layout.

**File**: `specs/content/<course-code>/content-spec.md`
**Extends**: Spec 006's content-spec (front matter `course_code`, `status` — **unchanged**;
`contracts/content-spec-frontmatter.schema.json` still applies as-is).
**Read by**: humans + the human Content gate for the new body sections;
`scripts/check-unit-depth.mjs` parses **only** the per-unit `### Sub-topic checklist` table
and the `**Depth budget**` line.

## New course-level body sections (order after the existing `## Course-wide items`)

### `## Course Description`

Prose taken from the course guide — quoted (< 15 words, Constitution Art. III.5) or
paraphrased. If the guide has none: log in `specs/gaps.md`, escalate, do **not** invent
(FR-010).

### `## Reading list`

Two subheadings, each a table:

```markdown
### Guide-required

| Key | Citation | DOI/URL | Units | Note |
|---|---|---|---|---|
| hargreaves2000 | Hargreaves, A. (2000). Four ages of professionalism… Teachers and Teaching, 6(2), 151–182. | https://doi.org/10.1080/713698714 | 1, 6 | professionalism as a historically shifting idea |

### Curated-supplementary (open access)

| Key | Citation | DOI/URL | Units | Note |
|---|---|---|---|---|
| npst-pakistan | National Professional Standards for Teachers in Pakistan (2009), Policy & Planning Wing, Ministry of Education. | https://… | 4 | domains/indicators used in Unit 4 |
```

- `Key` matches the `sources/unit-NN.md` `Key` used when the source is cited in a unit.
- `Units` = comma-separated unit numbers the source supports (FR-008 — every reading tagged to
  ≥ 1 unit).

### `## Week schedule`

```markdown
| Week(s) | Unit | Sub-topics |
|---|---|---|
| 1–3 | Unit 1 | profession vs occupation; industrial→inquiry; dimensions; teacher identity |
```

### `## Standards & frameworks anchors`

Bullets naming each framework and what it anchors (e.g. "National Professional Standards for
Teachers, Pakistan — Unit 4 domains/indicators"; "UNESCO/NACTE codes — Unit 2 ethical
conduct"). Present only where the subject engages them.

## Per-unit additions (inside each `## Unit N` subsection)

### `### Sub-topic checklist`  — **the machine-read table** (research.md R1/R2, FR-009a)

```markdown
| ID | Guide ref | Sub-topic |
|---|---|---|
| U1-01 | 1.1 | Concept of a profession and professional |
| U1-02 | 1.1 | Features distinguishing a profession from an occupation |
| U1-03 | 1.1 | Professionalism in teaching vs professionalisation of teaching |
| U1-04 | 1.2 | Industrial metaphors of teaching (efficiency, control, compliance) |
| U1-05 | 1.2 | Shift to reflective, inquiry-based, learning-centred professionalism |
| …     | …   | … |
```

- `ID` grammar: `^U<unit-no>-\d{2,}$`, unique in the unit, **stable once assigned** (deletion
  leaves a gap; never renumber).
- One row per **leaf** concept in the guide's unit block. Grouping several guide bullets under
  one row is allowed only if none is lost — the human Content gate owns "is this faithful to
  the guide?".
- **Presence of this table = the unit is in the depth gate's scope** (research.md R4).

### Other per-unit lines (human-read; `**Depth budget**` is also parsed)

```markdown
**Depth budget**: 16 sub-topics; 40–65 reading-min
**Prerequisite knowledge**: none (opening unit) — assumes only HSC-level general study skills
**Common misconceptions**: "a profession = a well-paid job"; "reflective practice = writing a diary"
**Mapped readings**: carr2000, hargreaves2000, demirkasimoglu2010, beijaard2004, brookfield2017
**Worked-examples plan**: one Pakistani-classroom vignette per sub-group (≈ 1 per sub-topic) — see coverage/unit-01.md
**International best-practice notes**: UNESCO teacher-professionalism framing; OECD TALIS on teacher identity
```

- `**Depth budget**` — the gate reads the `A–B reading-min` range and checks the **sum** of
  the unit's five English files' `est_reading_minutes` against `[A, B]` (research.md R6). The
  `N sub-topics` figure is advisory (not compared to the checklist length).

## What the depth gate parses vs. ignores

| Parses | Ignores (human Content gate) |
|---|---|
| `### Sub-topic checklist` table → set of `ID`s | `## Course Description`, `## Reading list`, `## Week schedule`, `## Standards & frameworks anchors` |
| `**Depth budget**` `A–B reading-min` range | `**Prerequisite knowledge**`, `**Common misconceptions**`, `**Mapped readings**`, `**Worked-examples plan**`, `**International best-practice notes**` |
| — | `N sub-topics` count in the depth budget |
