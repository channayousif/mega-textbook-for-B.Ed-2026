# Contract: Unit Coverage Matrix

> **Extended by Spec 008 — see `specs/008-rich-unit-pedagogy/contracts/coverage-matrix-v2.md`.**
> This v1 contract stays in force for legacy five-file units; v2 governs any unit on the
> per-topic layout.

**File**: `specs/content/<course-code>/coverage/unit-NN.md` (`NN` = zero-padded unit number)
**Read by**: `scripts/check-unit-depth.mjs` (FR-002, FR-012a, FR-012e)
**Format**: Markdown. Front matter optional and ignored. Body MUST contain exactly one
pipe-delimited table with the header below. Parser tolerance matches
`check-pipeline-gate.mjs`'s `parseTasksTable`: leading/trailing `|` required, cells trimmed,
a `|---|` separator row is skipped, a row with fewer than 4 cells is ignored.

## Table

```markdown
| Sub-topic ID | File | Section | Source |
|---|---|---|---|
| U1-01 | index.mdx | What makes teaching a profession | carr2000 |
| U1-02 | index.mdx | What makes teaching a profession | carr2000 |
| U1-03 | index.mdx | Profession vs. professionalisation | hargreaves2000 |
| U1-04 | activities.mdx | Activity 1: Profession or occupation? | demirkasimoglu2010 |
| U1-05 | teacher-notes.mdx | Teaching the industrial→inquiry shift | hargreaves2000 |
```

## Column rules

| Column | Rule | Gate failure if… |
|---|---|---|
| `Sub-topic ID` | matches an `ID` in the unit's `### Sub-topic checklist` table (contract: `content-spec-v2.md`) | a checklist ID has **no** row here |
| `File` | one of `index.mdx`, `activities.mdx`, `formative.mdx`, `summative.mdx`, `teacher-notes.mdx` | blank, or not one of the five |
| `Section` | exact heading text of the subsection covering that sub-topic in `File` | blank |
| `Source` | a `Key` present in `sources/unit-NN.md` (contract: `sources-consulted.md`) | blank, or no matching `Key` |

## Invariants

- **Total coverage**: `set(checklist IDs) ⊆ set(Sub-topic IDs in this table)`. A sub-topic MAY
  appear in more than one row (covered in multiple files/sections).
- **Sources closure**: every `Source` value appears as a `Key` in `sources/unit-NN.md`, and
  every `Key` in `sources/unit-NN.md` (except `Kind = no-external-source` rows) appears as a
  `Source` here (FR-012e — mutual consistency, both directions).
- Re-authored wholesale on each unit re-draft; no change history is kept (hand-edited file).

## Not checked by the gate (human Content gate, FR-013)

Whether `Section` names a heading that actually exists and actually covers the sub-topic;
whether the cited `Source` is apt; whether the coverage is deep rather than a token mention.

## Implementation note (2026-08-27, /sp.implement)

`scripts/check-unit-depth.mjs` parses **every** pipe-table row in the file, not only the first
table — a file MAY carry a second table (e.g. a `## Reinforcement` table of non-required extra
coverage recorded for the human Content gate). Rows in any such table must still satisfy the
column rules above (valid `File`, non-blank cells, `Source` resolving in the sources list), or
the gate fails.
