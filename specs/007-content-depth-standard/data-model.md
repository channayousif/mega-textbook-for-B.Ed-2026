# Phase 1 Data Model: Content Depth Standard

**Feature**: 007-content-depth-standard | **Date**: 2026-08-27 | **Plan**: [plan.md](./plan.md)

File-based, Git-tracked, **no database** (Constitution Art. V.1). Every entity is Markdown
under `specs/content/` or `.claude/`. Parsers are `gray-matter` (front matter) + a hand-rolled
pipe-table splitter, exactly as `scripts/check-pipeline-gate.mjs` already does.

---

## Entity: Enumerated Sub-topic Checklist

**Where**: a `### Sub-topic checklist` table inside each migrated `## Unit N` subsection of
`specs/content/<course-code>/content-spec.md`.

| Column | Type | Rule |
|---|---|---|
| `ID` | string | `^U<unit-no>-\d{2,}$` (e.g. `U1-07`). Unique within the unit. Stable once assigned — removing a sub-topic leaves a sequence gap, never renumber. |
| `Guide ref` | string | Source-guide section label (e.g. `1.3`). Human traceability only; not parsed by the gate. |
| `Sub-topic` | string | One leaf concept from the course guide, in the author's words. Non-empty. |

**Identity**: `(<course-code>, <unit-no>, ID)`.
**Authoritative role**: this is the single set the Unit Coverage Matrix is graded against
(FR-009a, research.md R2). Keeping it faithful to the source guide is the curriculum owner's
job at the human Content gate (Constitution Art. II.2).
**Presence = opt-in**: a `## Unit N` subsection **with** this table puts the unit in the depth
gate's scope; **without** it, the gate skips the unit (research.md R4).

## Entity: Unit Coverage Matrix

**Where**: `specs/content/<course-code>/coverage/unit-NN.md` (committed; `NN` = zero-padded
unit number). Optional front matter; body is one table.

| Column | Type | Rule |
|---|---|---|
| `Sub-topic ID` | string | MUST match an `ID` from the unit's checklist. Every checklist ID MUST appear in ≥1 row. |
| `File` | enum | one of `index.mdx` / `activities.mdx` / `formative.mdx` / `summative.mdx` / `teacher-notes.mdx` (the FR-004 folding-rule files). Non-empty. |
| `Section` | string | Exact heading text of the subsection that covers this sub-topic in `File`. Non-empty. |
| `Source` | string | A citation `Key` that MUST exist in the unit's Sources-Consulted List. Non-empty. |

**Identity**: `(<course-code>, <unit-no>, Sub-topic ID, File, Section)` — a sub-topic MAY be
covered in more than one place.
**Validation (gate)**: fail if the file is missing; fail if any checklist `ID` has no row;
fail if any row has a blank `File`/`Section`/`Source`; fail if any `Source` has no matching
`Key` in the sources list (FR-012a, FR-012e).
**Lifecycle**: re-authored wholesale on each unit re-draft (no history — hand-edited file,
same posture as Spec 006 `tasks.md`).

## Entity: Sources-Consulted List

**Where**: `specs/content/<course-code>/sources/unit-NN.md` (committed). Optional front matter;
body is one table.

| Column | Type | Rule |
|---|---|---|
| `Key` | string | Short citation key (e.g. `hargreaves2000`). Unique within the unit. |
| `Citation` | string | Full APA reference. Non-empty. |
| `URL/DOI` | string | Exact resolvable link/DOI; empty only when `Kind = no-external-source`. |
| `Supports` | string | Which sub-topic(s) / theme this source backs (free text; human-checkable). |
| `Kind` | enum | `guide-required` \| `open-access-substitute` \| `no-external-source`. |

**Validation (gate)**: fail if any `Key` referenced by the coverage matrix is absent; fail if
a `Key` here is unused by the coverage matrix (FR-012e — mutual consistency). A
`no-external-source` row is legal (FR-004) but the gate does not require it to be referenced.
**Cross-check (human Content gate, not the CI gate, FR-013)**: whether an
`open-access-substitute` genuinely supports its sub-topic; whether a `no-external-source` row
was escalated in `specs/gaps.md`.

## Entity: Expanded Course Content-Spec

**Where**: `specs/content/<course-code>/content-spec.md` — the Spec 006 file, front matter
(`course_code`, `status`) unchanged, plus new **body** sections.

| Section | Shape |
|---|---|
| `## Course Description` | Prose from the guide (quoted < 15 words or paraphrased, Constitution Art. III.5). |
| `## Reading list` | Table `\| Key \| Citation \| DOI/URL \| Units \| Note \|`, split under `### Guide-required` and `### Curated-supplementary (open access)` subheadings. `Units` lists the unit numbers each source supports. |
| `## Week schedule` | Table `\| Week(s) \| Unit \| Sub-topics \|`. |
| `## Standards & frameworks anchors` | Bullets — e.g. UNESCO/NACTE codes, OECD, National Professional Standards for Teachers (Pakistan), HEC — with what each anchors. Present only where the subject engages them. |
| per-unit `## Unit N` additions | the `### Sub-topic checklist` table (above); `**Depth budget**: N sub-topics; A–B reading-min`; `**Prerequisite knowledge**: …`; `**Common misconceptions**: …`; `**Mapped readings**: <Key>, <Key>`; `**Worked-examples plan**: …` (≈ one per sub-topic); `**International best-practice notes**: …` |

**Validation**: `status: approved` still gates drafting (Spec 006 FR-002 /
`check-pipeline-gate.mjs`). The new sections are checked by the human Content gate; the depth
gate only parses the `## Unit N` checklist table and `**Depth budget**` line.
**Gap handling**: a guide silent on a required new section (e.g. no Course Description) → log
in `specs/gaps.md`, escalate, do not invent (FR-010, Constitution Art. II.3). A guide silent
only on readings → fall back to `### Curated-supplementary` entries, marked as such.

## Entity: Depth Standard (in the Style Guide)

**Where**: `specs/content/style-guide.md` — front matter `version: "1.0"` → `"2.0"`; two new
body sections.

| Section | Content |
|---|---|
| `## Unit depth standard` | The concept-coverage hard rule (every checklist sub-topic → its own named subsection in its folding-rule file; grouping allowed only if each is still individually covered in the matrix); the soft no-padding length rule (precise and complete over the concept set, ≈ one Pakistan-grounded example per sub-topic, no word floor); required `## Common misconceptions` + `## Further reading` blocks in `index.mdx`; formative ≥ 5 items **as a numbered list** (states the format the gate counts, research.md R7); the register ceiling restatement (Constitution Art. III.1 — deeper concepts, not harder language; new term → glossary entry). |
| `## What the depth gate checks vs. the human Content gate` | The FR-013 division: the gate checks structure (checklist coverage, required blocks, formative count, reading-minutes band, matrix↔sources consistency); the human Content gate owns padding, example aptness, substitute-source relevance, and whether the register held. |

`version` is the single freeze marker for the style-guide + `terminology.csv` pair (Spec 006
FR-007, research.md R8); any later edit to either → bump.

## Entity: Authoring Skill

**Where**: `.claude/skills/author-unit/` — `SKILL.md` (YAML `name`, `description` with
trigger phrases; body = the four-step workflow) + `references/depth-standard.md`,
`references/pedagogy-checklist.md`, `references/citation-and-register.md`.
**Not an artefact the gate reads** — it is tooling that *produces* the coverage matrix and
sources list. `references/depth-standard.md` restates the numeric/structural rules and MUST
be kept in sync with `style-guide.md`'s `## Unit depth standard` section (plan risk 3).

---

## Relationships

```text
Course Content-Spec (1 per course)
  ├── ## Unit N subsection (1 per unit)
  │     ├── Sub-topic Checklist (0 or 1 table) ──"in scope iff present"──> Depth Gate
  │     │     └── row.ID ──graded by set-equality──> Coverage Matrix.row.Sub-topic ID
  │     └── **Depth budget** A–B ──band──> Depth Gate (sum of 5 EN files' est_reading_minutes)
  ├── ## Reading list ──Key──> Sources-Consulted List.Key (per unit)
  └── ## Week schedule / ## Standards anchors / ## Course Description  (human Content gate)

Coverage Matrix (1 per migrated unit)
  ├── row.File ∈ the 5 folding-rule files
  ├── row.Section = a real heading in that file (human Content gate verifies "real")
  └── row.Source ──must match──> Sources-Consulted List.Key   (FR-012e, both directions)

Style Guide.version "2.0" ──freeze marker for the pair──> terminology.csv (unchanged)
Author-Unit Skill ──emits──> Coverage Matrix + Sources-Consulted List (+ the 5 re-drafted .mdx)
Skill.references/depth-standard.md ──kept in sync with──> Style Guide.## Unit depth standard
```

## State transitions

- **Unit not migrated** → (author adds the `### Sub-topic checklist` table to `## Unit N`) →
  **in depth-gate scope** (irreversible in practice — regression protection).
- **Unit in scope, no coverage file** → depth gate **fails** → (author runs the skill, emits
  `coverage/unit-NN.md` + `sources/unit-NN.md`, all checklist IDs mapped) → depth gate
  **passes**.
- **EN re-draft of an already-`reviewed` unit** → UR five files `translation_status`
  `reviewed` → `draft`; a `G4 ur-translation` / `G5 ur-review` revision row is appended to the
  course `tasks.md`; the UR mirror does not re-publish as reviewed until it re-clears review
  (downstream, FR-016/FR-017).
- **Style guide or terminology bank edited** → `style-guide.md` `version` MUST bump (e.g.
  `2.0` → `2.1`).
