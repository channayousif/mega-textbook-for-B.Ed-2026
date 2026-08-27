# Phase 0 Research: Content Depth Standard & Reusable Unit-Authoring Skill

**Feature**: 007-content-depth-standard | **Date**: 2026-08-27 | **Plan**: [plan.md](./plan.md)

No open `NEEDS CLARIFICATION` items. ADR-0010 (Accepted) and two `/sp.clarify` passes
(spec.md `## Clarifications`) settled every design fork. This document records each as a
**Decision / Rationale / Alternatives** entry, and pins the three small format choices the
plan adds (R1 ID grammar, R7 formative heuristic, R6 aggregation).

---

## R1 — Enumerated sub-topic checklist: a table in the content-spec `## Unit N` subsection

**Decision**: Each migrated unit's `## Unit N` subsection in
`specs/content/<course-code>/content-spec.md` carries a Markdown table:

```markdown
### Sub-topic checklist

| ID | Guide ref | Sub-topic |
|---|---|---|
| U1-01 | 1.1 | Concept of a profession and professional |
| U1-02 | 1.1 | Features distinguishing a profession from an occupation |
| … | … | … |
```

`ID` = `U<unit-no>-<seq>` with a zero-padded 2-digit sequence, unique within the unit, and
**stable once assigned** (a later edit that removes a sub-topic leaves a gap in the sequence
rather than renumbering — same "hand-edited, no history" posture as Spec 006's `tasks.md`).
`Guide ref` is the source-guide section number for human traceability only (not parsed).

**Rationale**: Mirrors Spec 006's own choice (research.md R1/R2) to keep unit-level data as a
subsection of the single per-course file, and its choice (R2) of a pipe-delimited table that
is both human-readable and parseable with a ~15-line splitter. A stable ID lets the gate's
comparison be exact set-equality and lets its failure message name the exact missing ID
(SC-004).

**Alternatives considered**: free-text bullet list (rejected — no stable handle for the gate
to match on, and the failure message could only say "some sub-topic is missing"); a separate
`checklist.yaml` per unit (rejected — a new file family and format Spec 006 explicitly
avoided); numbering by the guide's own `1.1.a` scheme (rejected — the extracted guide text's
bullet nesting is inconsistent/OCR-damaged, so guide numbering is unreliable as a key; it is
kept as the human-readable `Guide ref` column instead).

## R2 — Gate comparison: structured set-equality, never a guide-text parse

**Decision**: `check-unit-depth.mjs` compares the **set of `ID`s in the checklist table**
against the **set of `Sub-topic ID`s in `coverage/unit-NN.md`**. Every checklist ID must
appear in the coverage matrix at least once with non-empty `File`, `Section`, and `Source`
cells. The raw `Scheme-and-Course-guides/extracted-text/*.txt` is never read by the gate.

**Rationale**: `/sp.clarify` round-1 Q4 rejected parsing the extracted guide text for exactly
this feasibility reason (inconsistent bullet nesting, OCR artefacts). This is the same class
of check as Spec 006 FR-016c's terminology conformance — a structured comparison against a
declared list, which the curriculum owner is responsible for keeping faithful to the guide at
the human Content gate (Constitution Art. II.2).

**Alternatives considered**: NLP/heuristic extraction of guide bullets (rejected — not
reliably automatable); requiring the guide be re-typed into a structured file per course
(rejected — large one-time cost, and the content-spec subsection already is that structured
list once the checklist table is added).

## R3 — Coverage matrix & sources list: committed files under `specs/content/<course>/`

**Decision**: `specs/content/<course-code>/coverage/unit-NN.md` and
`specs/content/<course-code>/sources/unit-NN.md`. Committed (not `.gitignore`d). Discovered
by the gate walking `specs/content/` by course-code folder, exactly as
`check-pipeline-gate.mjs` already resolves `tasks.md` / `content-spec.md`.

**Rationale**: `/sp.clarify` round-1 Q1 (Option A). Keeps these with the course's other
governance artefacts, outside the Docusaurus `docs/` render path (so Docusaurus never tries
to render them and the build is unaffected), and means a unit re-draft never has to touch the
approved `content-spec.md`.

**Alternatives considered**: a `## Unit N — Coverage` subsection inside `content-spec.md`
(rejected — couples re-draft churn to the approved-governance file); `coverage.md` beside the
five `.mdx` files in `docs/…/unit-NN/` (rejected — risks Docusaurus rendering a stray page or
failing the build); front-matter arrays on `index.mdx` (rejected — a full matrix in front
matter is unreviewable by a human).

## R4 — Gate scope predicate: checklist presence is the opt-in

**Decision**: A unit is **in scope** for `check-unit-depth.mjs` if and only if its
`content-spec.md` `## Unit N` subsection contains the `### Sub-topic checklist` table. A unit
with no such table is skipped (exit-0, no finding). No `depth_standard:` front-matter flag is
introduced.

**Rationale**: `/sp.clarify` round-2 Q1 (Option A). This grandfathers EFMP-301 Unit 1 (the
constitutional golden unit) and the not-yet-migrated EFMP-302 Units 2–6 automatically, lets
adoption scale in unit-by-unit, and adds no new marker to maintain. A unit that *has* a
checklist is always checked, so it cannot silently regress. Directly parallels
`check-pipeline-gate.mjs` skipping `coming_soon` units.

**Alternatives considered**: run on every non-`coming_soon` published unit immediately
(rejected — EFMP-301 + EFMP-302 U2–U6 would fail CI on day one, forcing a bulk migration the
user explicitly deferred); an explicit `depth_standard: "2.0"` flag (rejected — a second
marker that can disagree with the checklist's actual presence).

## R5 — Skill source acquisition: web retrieval at authoring time, graceful offline degradation

**Decision**: The `author-unit` skill uses the harness's `WebSearch` / `WebFetch` while
drafting to (a) locate an open-access source for a guide sub-topic whose mapped reading is
unavailable and (b) verify a citation resolves (title/author/year/DOI). Each source used is
recorded in `sources/unit-NN.md` with its exact URL/DOI and `Kind`
(`guide-required` | `open-access-substitute` | `no-external-source`). When retrieval is not
available, the skill falls back to author-provided material and, where nothing can be found,
writes a `no-external-source` row and raises the FR-004 escalation to the curriculum owner
via `specs/gaps.md`. The skill never fabricates a citation.

**Rationale**: `/sp.clarify` round-1 Q2 (Option A). Substitution is expected to be the norm
early (guide readings are mostly books / paywalled articles), so the skill has to be able to
find real open-access equivalents; recording the exact URL/DOI keeps the substitution
auditable at the Content gate (FR-003 rejects an off-topic substitute).

**Note**: retrieval happens **only** in the authoring session. `check-unit-depth.mjs` in CI
does no network I/O — it only checks that the `sources/unit-NN.md` rows exist and are
internally consistent with the coverage matrix.

## R6 — Depth budget: advisory concept count, gated reading-minutes band (unit total)

**Decision**: The `**Depth budget**: N sub-topics; A–B reading-min` line in each unit
subsection is authoring guidance for the concept count (the gate does not compare `N` to the
checklist length — FR-009a coverage is the real check). The `A–B` range **is** consumed by
the gate: `check-unit-depth.mjs` sums `est_reading_minutes` across the unit's five English
files and fails if the **unit total** is outside `[A, B]`.

**Rationale**: `/sp.clarify` round-1 Q3 (Option A) for advisory-vs-gated. The unit-total
aggregation is a plan-time refinement of an impractical spec line (`Assumptions` originally
said "each file" — a single band cannot fit both `teacher-notes.mdx` and `index.mdx`); the
spec's FR-012(d) and `Assumptions` were updated to "sum of the five English files" during
planning (Constitution Art. IV.4).

**Alternatives considered**: per-file bands (rejected — five ranges to maintain, and the
files are deliberately different lengths); gate computes minutes from word count and ignores
the budget (rejected — reintroduces a word-count metric the user rejected in planning);
check `index.mdx` only (rejected — misses activities/teacher-notes depth).

## R7 — Formative item-count heuristic

**Decision**: `check-unit-depth.mjs` counts matches of `/^\s*\d+\.\s/m` in `formative.mdx`
(body after front matter) — top-level ordered-list items — and fails if the count is < 5
(FR-006). The expected "numbered list, one item per question" format is stated in the
`## Unit depth standard` section of `style-guide.md` so authors write to what is counted.

**Rationale**: The repo has no prior assessment-item parser; a numbered-list count is the
simplest checkable proxy and matches how every existing `formative.mdx` is already written
(e.g. `docs/semester-1/efmp-302/unit-01/formative.mdx`). FR-013 keeps assessment *quality*
(are these good items? right Bloom mix?) with the human Content gate — the gate only enforces
the floor.

**Alternatives considered**: parse a structured `items:` front-matter array (rejected — no
such convention exists and adding one is a bigger change than the floor warrants); count
`?`-terminated lines (rejected — multi-sentence stems and rhetorical questions in prose both
miscount).

## R8 — v2.0 freeze marker: `style-guide.md`'s `version` field only

**Decision**: Set `specs/content/style-guide.md` front-matter `version: "2.0"`.
`terminology.csv` gains nothing. "Frozen at v2.0" = that one field reads `"2.0"` and the
terminology bank is its frozen pair; any later edit to either requires bumping it.

**Rationale**: `/sp.clarify` round-2 Q3 (Option A) — preserves Spec 006 FR-007's single-marker
design with zero new machinery. `contracts/style-guide-frontmatter.schema.json`'s existing
pattern `^[0-9]+\.[0-9]+$` already admits `"2.0"`, so only its human-readable `description`
needs a note.

**Alternatives considered**: a `# version: 2.0` header row in `terminology.csv` (rejected —
awkward in a CSV, and `check-pipeline-gate.mjs`'s `parseCsv` would treat it as a data row);
a standalone `specs/content/VERSION` file (rejected — more surface than the problem).

## R9 — Answer-key safety: no change needed

**Decision**: `scripts/check-no-answer-keys.mjs` already includes `specs/content` in
`TARGETS` and scans `.md`/`.mdx` (Spec 006 research.md R5), so `coverage/unit-NN.md` and
`sources/unit-NN.md` are covered with no edit. No `.gitignore` change — these files are
committed governance artefacts, not `.staging/` worksheets.

**Rationale**: The Spec 006 extension already generalised the scan to the whole
`specs/content` tree precisely so any accidental answer content there is caught. Re-touching
it would be an unneeded change against "smallest viable diff".

**Alternatives considered**: add a dedicated exclusion or inclusion for the new dirs
(rejected — the existing glob already covers them; `style-guide.md` remains the only
`EXCLUDE` entry and stays so).

## R10 — Skill packaging: Claude Code skill with progressive disclosure

**Decision**: `.claude/skills/author-unit/SKILL.md` (YAML front matter: `name`,
`description` with trigger phrases like "author a unit", "draft unit content", "content depth
standard") + `.claude/skills/author-unit/references/{depth-standard,pedagogy-checklist,
citation-and-register}.md`. `SKILL.md` stays short and links into `references/` on demand.

**Rationale**: `/sp.clarify` round-1 Q5 / ADR-0010 — a committed, invocable method that is
loaded per authoring session, versioned with the repo, and cannot drift into being an
unread prose doc. Matches the skill format the harness already enumerates.

**Alternatives considered**: a `specs/content/authoring-method.md` prose runbook (rejected —
not invoked, drifts from practice); a single monolithic `SKILL.md` (rejected — progressive
disclosure keeps the always-loaded part small, per the skill-authoring norm).

---

## Consolidated decisions table

| # | Decision | Source |
|---|---|---|
| R1 | Checklist = `\| ID \| Guide ref \| Sub-topic \|` table in the `## Unit N` subsection; IDs `U<n>-<seq>`, stable | clarify r1 Q4 + r2 Q1; plan |
| R2 | Gate = structured set-equality of checklist IDs vs coverage-matrix IDs; never a guide-text parse | clarify r1 Q4 |
| R3 | `coverage/unit-NN.md` + `sources/unit-NN.md` under `specs/content/<course>/`; committed | clarify r1 Q1 |
| R4 | In-scope iff the `## Unit N` subsection has the checklist table; else skip (grandfathering) | clarify r2 Q1 |
| R5 | Skill uses WebSearch/WebFetch to find+verify sources at authoring time; offline → author-provided + FR-004; never fabricate | clarify r1 Q2 |
| R6 | Depth-budget concept count advisory; reading-minutes band gated against the **unit total** (sum of 5 EN files) | clarify r1 Q3; plan refinement |
| R7 | Formative floor: count `/^\s*\d+\.\s/m` in `formative.mdx`, require ≥5; format documented in style-guide | plan |
| R8 | Freeze marker: `style-guide.md` `version: "2.0"` only; `terminology.csv` unchanged | clarify r2 Q3 |
| R9 | No change to `check-no-answer-keys.mjs` or `.gitignore` — `specs/content` already scanned | Spec 006 R5 |
| R10 | Skill at `.claude/skills/author-unit/` (`SKILL.md` + `references/`), progressive disclosure | clarify r1 Q5; ADR-0010 |
