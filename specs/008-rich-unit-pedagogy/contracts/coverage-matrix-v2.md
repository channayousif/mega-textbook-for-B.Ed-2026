# Contract: Unit Coverage Matrix v2 (Spec 008)

**Supersedes**: `specs/007-content-depth-standard/contracts/coverage-matrix.md` for new-shape units.
Legacy units keep the v1 contract unchanged.
**File**: `specs/content/<course-code>/coverage/unit-NN.md` (`NN` = zero-padded unit number)
**Read by**: `scripts/check-unit-depth.mjs` (FR-002, FR-020, FR-021)
**Format**: Markdown. Front matter optional and ignored. The parser reads **every** pipe table in
the file (a second `## Reinforcement` table is permitted; its rows still obey the column rules).
Tolerance matches `check-unit-depth.mjs`'s `parsePipeTable`: leading/trailing `|` required, cells
trimmed, `|---|` separator rows skipped, a row with fewer than 4 cells ignored, header rows
(`Sub-topic ID` / `ID` in cell 0) skipped.

## Table

```markdown
| Sub-topic ID | File | Section | Source |
|---|---|---|---|
| U1-01 | topic-01.mdx | What a profession is | carr2000 |
| U1-02 | topic-01.mdx | Features that distinguish a profession | carr2000 |
| U1-05 | topic-02.mdx | Historical industrial metaphors of teaching | hargreaves2000 |
| U1-06 | topic-02.mdx | The shift to inquiry-based professionalism | hargreaves2000 |
| U1-09 | topic-03.mdx | Accountability, autonomy and collegiality | hurst2009 |
| U1-14 | topic-04.mdx | Reflecting on who am I becoming as a teacher | brookfield2017 |
```

## Column rules

| Column | Rule | Gate failure if… |
|---|---|---|
| `Sub-topic ID` | matches an `ID` in the unit's `### Sub-topic checklist` (contract: `content-spec-v3.md`) | a checklist ID has **no** row here |
| `File` | one of the **new-shape** file set: `index.mdx`, `topic-01.mdx` … `topic-NN.mdx`, `unit-assessment.mdx`, `unit-teacher-notes.mdx` | blank, or not in the set |
| `Section` | the exact heading text of the subsection covering that sub-topic in `File` — normally a `###` sub-heading under that topic's `## Explanation` | blank |
| `Source` | a `Key` present in `sources/unit-NN.md` (contract unchanged: `specs/007-content-depth-standard/contracts/sources-consulted.md`) | blank, or no matching `Key` |

## Invariants

- **Total coverage**: `set(checklist IDs) ⊆ set(Sub-topic IDs across all tables)`. A sub-topic MAY
  appear in more than one row.
- **Every topic referenced** *(new in v2)*: every `topic-NN.mdx` in the unit folder appears as the
  `File` of **at least one** coverage row. A topic file that teaches nothing on the checklist fails
  the gate.
- **Sources closure** *(unchanged from v1)*: every `Source` appears as a `Key` in `sources/unit-NN.md`,
  and every `Key` there (except `Kind = no-external-source`) appears as a `Source` here — mutual, both
  directions.
- Re-authored wholesale on each re-restructure; no change history (hand-edited file).

## Relationship to the `### Topic list` — a gated cross-check

The `### Topic list` (in `content-spec-v3.md`) declares which topic **file** each sub-topic belongs
to (the partition). The coverage matrix declares which **section** inside that file covers it, and
with which source.

**Gated rule (hard failure)**: for every checklist ID, **at least one** coverage row MUST name the
exact `topic-NN.mdx` file its `### Topic list` row assigns it to. Additional rows for the same ID
naming other files (e.g. reinforcement in `unit-assessment.mdx`) are allowed and ignored by this
check. A checklist ID whose only coverage rows point at a *different* topic file than its declared
assignment fails the depth gate, naming the ID and both files.

Rationale: the two artefacts must agree on where a concept is taught. Making the mismatch a hard
failure (rather than a non-failing "finding") keeps the gate binary — there is no warning channel in
the gate scripts.

## Not checked by the gate (human Content gate, FR-013)

Whether `Section` names a heading that actually exists and genuinely covers the sub-topic; whether
the cited `Source` is apt; whether the coverage is deep rather than a token mention; whether the
partition in the `### Topic list` groups sub-topics sensibly.
