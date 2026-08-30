# Contract: Expanded Course Content-Spec (v3)

**Supersedes**: `specs/007-content-depth-standard/contracts/content-spec-v2.md`. v2 stays valid for
courses/units that have not opted into the Spec 008 per-topic shape.
**File**: `specs/content/<course-code>/content-spec.md`
**Front matter**: `course_code`, `status` — **unchanged**; `contracts/content-spec-frontmatter.schema.json`
still applies (`status: approved` still gates all drafting).
**Read by**: humans + the human Content gate for the prose sections;
`scripts/check-unit-depth.mjs` parses the per-unit `### Sub-topic checklist` table, the new
`### Topic list` table, and the `**Depth budget**` line.

## What v3 adds over v2

Everything in v2 is retained. v3 adds:

1. a course-level `## Course review plan` section;
2. a per-unit `### Topic list` table (its presence, with `topic-*.mdx` on disk, is the new-shape
   opt-in — see `research.md` R1);
3. a `Topic` column on the existing `### Sub-topic checklist`;
4. a re-baselined `**Depth budget**` line;
5. per-unit `**Figure plan**` and `**Unit-end assessment blueprint**` lines.

## New course-level section — `## Course review plan`

Seeds an eventual `course-review.mdx` (contract: `end-of-course-review.md`). Bullets:

```markdown
## Course review plan

- **Course summary points**: <the 4–6 through-lines the course review should recap>
- **Practice-question mix**: <rough sizes and coverage for the ### MCQs / ### RRQs / ### ERQs banks>
- **Practicum project ideas** (3–6):
  - <title> — <purpose>; <rough method>; <evidence to bring back>
  - …
```

Not parsed by any gate. Authoring the actual `course-review.mdx` is follow-up (FR-029).

## Per-unit `### Topic list` — the new machine-read table

```markdown
### Topic list

| Topic | Title | Sub-topic IDs | Reading-min | Figures |
|---|---|---|---|---|
| 1.1 | What makes teaching a profession | U1-01, U1-02, U1-03, U1-04 | 18–26 | fig-U1-1 |
| 1.2 | From an industrial model to inquiry-based teaching | U1-05, U1-06 | 14–20 | fig-U1-2 |
| 1.3 | The four dimensions of teacher professionalism | U1-07, U1-08, U1-09, U1-10 | 20–30 | fig-U1-3 |
| 1.4 | Becoming a teacher: developing your identity | U1-11, U1-12, U1-13, U1-14 | 18–26 | fig-U1-4 |
```

| Column | Rule | Gate failure if… |
|---|---|---|
| `Topic` | display label; becomes each `topic-*.mdx` file's `topic_label` and orders the topic files (`1.1` → `topic-01.mdx`) | — |
| `Title` | the topic's human title (→ the file's `title`) | — |
| `Sub-topic IDs` | comma-separated `### Sub-topic checklist` IDs this topic teaches | a checklist ID assigned to **no** topic row, or to **more than one** (message names the ID) |
| `Reading-min` | advisory per-topic sub-band (typical `12–25`) | — (not gated; guidance) |
| `Figures` | planned figure IDs for this topic (`fig-U<n>-<seq>`) → seeds `figures/unit-NN.md` | — (the figure gate checks markers vs. the manifest, not this cell) |

**Invariant (gated)**: the `Sub-topic IDs` cells across all rows form a **total, disjoint partition**
of the unit's `### Sub-topic checklist`. Row count **==** number of `topic-*.mdx` files (a mismatch
fails the depth gate — `research.md` R1).

**Presence = opt-in**: a `## Unit N` subsection with a `### Topic list` **and** `topic-*.mdx` files
on disk is evaluated on the new-shape rules. One without the other → loud depth-gate failure.

## `### Sub-topic checklist` — gains a `Topic` column

```markdown
### Sub-topic checklist

| ID | Guide ref | Topic | Sub-topic |
|---|---|---|---|
| U1-01 | 1.1 | 1.1 | Concept of a profession and a professional |
| U1-05 | 1.2 | 1.2 | Historical "industrial" metaphors of teaching |
| U1-11 | 1.4 | 1.4 | Influence of sociocultural and policy contexts on teacher identity |
```

- `ID` grammar unchanged: `^U<unit-no>-\d{2,}$`, unique, stable once assigned.
- `Topic` = the `### Topic list` label this sub-topic is assigned to. Declares the partition
  explicitly (the gate still checks it against the `### Topic list` cells).
- Still the authoritative concept inventory the coverage matrix is graded against.

## Per-unit lines

```markdown
**Depth budget**: 14 sub-topics; 4 topics; 100–150 reading-min
**Prerequisite knowledge**: none (opening unit) — assumes HSC-level general study skills
**Common misconceptions**: "a profession = a well-paid job"; "reflective practice = keeping a diary"
**Mapped readings**: carr2000, demirkasimoglu2010, hargreaves2000, hurst2009, beijaard2004, brookfield2017, suarez2022
**Worked-examples plan**: ~one Pakistan-grounded vignette per sub-topic — see coverage/unit-01.md
**International best-practice notes**: UNESCO teacher-professionalism framing; OECD TALIS on teacher identity
**Figure plan**:
  - fig-U1-1 — four-features comparison table (Topic 1.1)
  - fig-U1-2 — "one lesson, two ways" split panel (Topic 1.2)
  - fig-U1-3 — accountability / autonomy / collegiality triangle (Topic 1.3)
  - fig-U1-4 — identity-shaping influences web (Topic 1.4)
**Unit-end assessment blueprint**:
  - MCQs (10): Remember→Apply; ≥2 per topic
  - RRQs (10): Understand→Analyze; ≥2 per topic
  - ERQs (5): Analyze→Evaluate/Create; one per topic + one integrative
```

- `**Depth budget**` — the gate reads the `A–B reading-min` range and checks the **sum** of the
  new-shape file set's `est_reading_minutes` (`index.mdx` + every `topic-*.mdx` +
  `unit-assessment.mdx` [+ `unit-teacher-notes.mdx`]) against `[A, B]`. `N sub-topics` and
  `T topics` are advisory.
- `**Figure plan**` and `**Unit-end assessment blueprint**` are human-read; they seed the manifest
  and the bank but are not parsed.

## What the depth gate parses vs. ignores (new-shape unit)

| Parses | Ignores (human Content gate) |
|---|---|
| `### Sub-topic checklist` → set of `ID`s (+ the `Topic` column for the partition cross-check) | `## Course Description`, `## Reading list`, `## Week schedule`, `## Standards & frameworks anchors`, `## Course review plan` |
| `### Topic list` → the partition + row count | `**Prerequisite knowledge**`, `**Common misconceptions**`, `**Mapped readings**`, `**Worked-examples plan**`, `**International best-practice notes**`, `**Figure plan**`, `**Unit-end assessment blueprint**` |
| `**Depth budget**` `A–B reading-min` range | `N sub-topics` and `T topics` counts |
