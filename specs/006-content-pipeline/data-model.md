# Phase 1 Data Model: Content Authoring Pipeline

No database. Every entity below is a plain file (Markdown/CSV) under `specs/content/` or a
front-matter extension of an existing Spec 001 content file — consistent with Constitution Art.
V.1's content/application split (Spec 006 stays entirely on the "content" side).

## Course Content-Spec

`specs/content/<course-code>/content-spec.md` — one per course, the FR-002 artifact.

**Front matter** (`contracts/content-spec-frontmatter.schema.json`):

| Field | Type | Required | Notes |
|---|---|---|---|
| `course_code` | string | yes | e.g. `EFMP-301`; must match the folder name uppercased |
| `status` | enum `draft`/`approved` | yes | FR-002/FR-016b; CI's tracker check (R6) requires `approved` |

**Body structure** (prose convention, not schema-enforced beyond headings existing):

- `## Course-wide items` — teaching strategies, practical work, recommended resources,
  assessment criteria (60/40 default) — the source the published `course-overview.mdx` is drawn
  from (FR-003).
- `## Unit N: <title>` (one per unit — this **is** the Unit Spec, R1) — CLO/SLO refs, key terms,
  worked-example ideas, activity concepts, reading materials, assessment blueprint.

## Task Tracker

`specs/content/<course-code>/tasks.md` — one per course, the FR-005 artifact. A Markdown table,
one row per unit per stage (G1–G7; G0 is tracked via Content-Spec's own `status`, R2):

| Column | Values | Notes |
|---|---|---|
| Unit | e.g. `Unit 1` | matches the unit's `unit_no` |
| Stage | `G1 unit-spec` / `G2 en-draft` / `G3 en-review` / `G4 ur-translation` / `G5 ur-review` / `G6 assets` / `G7 publish` | fixed 7-value set |
| Status | `▢` not-started / `▣` in-progress / `✅` done | FR-005's 3-value enum |
| Reviewer | initials | required once Status is `✅` |
| Suggestion | blank, or an `improvement_suggestions.id` (UUID) | present only on a Revision Task row (FR-011) |

**State transitions**: `▢ → ▣ → ✅`, forward-only per row (a regression re-opens by editing the
cell back to `▣`/`▢`, not a tracked history — this is a hand-edited file, not an audit log).

## Terminology Bank

`specs/content/terminology.csv` — one shared file, the FR-006 artifact. Columns: `term_en,
term_ur, notes` (no header-name variation; `notes` may be empty). One row per canonical term.

## Style Guide

`specs/content/style-guide.md` — one shared file, the FR-007 artifact.

**Front matter** (`contracts/style-guide-frontmatter.schema.json`): `version` (string, e.g.
`"1.0"`) — R8's freeze marker, authoritative for itself and the Terminology Bank as a pair.

**Body**: EN readability rules, UR register rules, Pakistan/Sindh localization rules, citation
format, diagram conventions, and (new for this feature) the maintained list of answer-key marker
patterns `check-no-answer-keys.mjs` scans for (FR-016d) — kept here so the pattern list has one
documented, human-reviewable home rather than living only inside the script.

## Gap Log Entry

`specs/gaps.md` — pre-existing file (Constitution Art. II.3), unchanged by this feature. Referenced,
not owned, by this spec (FR-013).

## Revision Task

Not a new file — a Task Tracker row (see above) whose `Suggestion` column is populated (FR-011).
Recorded in the target course's existing `tasks.md`, tagged with the re-entry stage (`G2 en-draft`
for a content fix, `G4 ur-translation` for a translation fix) exactly like a first-time drafting
row.

## Key-Terms Declaration (unit front-matter extension)

Extends `contracts/unit-frontmatter.schema.json` — new optional field on a unit's **Urdu**
`index.mdx` (the file where the translation choice is made):

```yaml
key_terms:
  - en: "Educational Psychology"
    ur: "تعلیمی نفسیات"
```

Each `en` value is looked up in the Terminology Bank; the declared `ur` MUST equal the bank's
`term_ur` for that term, or `check-pipeline-gate.mjs` (R6) flags a mismatch. An `en` absent from
the bank is flagged as "not in bank," not silently passed (FR-016c).

## Assets Staging Worksheet

`specs/content/<course-code>/.staging/unit-NN.md` — one per unit needing quiz-bank or answer-key
content (FR-018, broadened per R9). **Git-ignored** (`specs/content/**/.staging/` in `.gitignore`)
— never committed. Structure (free-form Markdown, no schema — it never reaches CI):

```markdown
## Quiz items
1. <question_text>
   - A) ...  B) ...  C) ...  D) ...
   - Correct: B
   - Bloom: Apply

## Formative answer key
<rubric content>

## Summative answer key
<rubric content>
```

Deleted or archived outside the repository once its content is manually entered into Spec 003's
`quiz_items`/`answer_keys` tables via Studio.

## Relationships

```text
Course Content-Spec (1) ──approves──> Unit Spec subsections (N)   [same file]
Course Content-Spec (1) ──gates (status: approved)──> Task Tracker rows (N)   [check-pipeline-gate.mjs]
Task Tracker (1 per course) ──rows──> Unit × Stage (N × 7)
Task Tracker row ──optional──> Revision Task (via Suggestion column → improvement_suggestions.id, Spec 005)
Unit's UR index.mdx ──key_terms──> Terminology Bank rows (lookup + equality check)
Style Guide.version ──freeze marker for──> Terminology Bank (paired, R8)
Assets Staging Worksheet (per unit, git-ignored) ──manual entry──> quiz_items / answer_keys (Spec 003, backend)
```
