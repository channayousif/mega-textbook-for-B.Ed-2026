# Implementation Plan: Content Authoring Pipeline

**Branch**: `006-content-pipeline` | **Date**: 2026-08-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/006-content-pipeline/spec.md`

## Summary

Give the "mega textbook" scale (40+ courses × ~8 units × 5 files × 2 languages, ~3,000+ documents
at completion) a repeatable, review-gated assembly line, and let an accepted teacher suggestion
(Spec 005) re-enter it as a revision. This feature adds **no new application surface and no new
database** — it is Markdown/CSV process artifacts under a new `specs/content/` tree (course
content-specs with embedded unit specs, per-course task trackers, a shared terminology bank, a
shared style guide) plus **one new Node validation script** wired into the existing CI pipeline
(`scripts/check-pipeline-gate.mjs`), a small extension to the **already-existing**
`scripts/check-no-answer-keys.mjs` (which turns out to already implement FR-016d's keyword/pattern
leak-prevention scan), and three JSON-Schema contract changes/additions.

The golden unit this feature proves itself against — EFMP-301 Unit 1 — **already exists**,
fully published bilingual, from Spec 001's earlier template work; its `course-overview.mdx` was
even built with this feature's needs in mind (its schema description already says "Spec 006
CP9"). This plan's golden-unit work is retroactive: author the content-spec/tracker artifacts so
the new CI gate passes against what's already shipped, not re-draft any prose (research.md R10).

Two `/sp.clarify` passes (2026-08-24, spec.md `## Clarifications`, 10 bullets total) resolved
every mechanical ambiguity the new CI gate (FR-016) introduced — status enum, leak-detection
mechanism, revision-task shape, approval marker, unit-spec location, terminology-check
feasibility, and freeze verification. This plan's Phase 0 research (research.md, R1–R10) turns
each of those policy decisions into a concrete file format, script, or contract change.

## Technical Context

**Language/Version**: Plain Node.js (`.mjs`, ES modules) on Node 22+ — unchanged from Specs
001–005; no TypeScript needed for this feature's two build scripts (matches `validate-content.mjs`/`check-no-answer-keys.mjs`/`check-add-course.mjs`'s existing convention)
**Primary Dependencies**: `gray-matter` (existing, for all front-matter reads) — **no new
dependency**. `terminology.csv` is parsed by a ~15-line hand-rolled parser (research.md R7), not a
new CSV-parsing package.
**Storage**: Filesystem/Git only. New tree: `specs/content/style-guide.md`,
`specs/content/terminology.csv`, `specs/content/<course-code>/content-spec.md` (Unit Specs live as
subsections inside it, research.md R1), `specs/content/<course-code>/tasks.md`, and per-unit
git-ignored `specs/content/<course-code>/.staging/unit-NN.md` worksheets. **No database** — this
feature stays entirely on the "content" side of Constitution Art. V.1's split; the only backend
touch is *manual* entry from a staging worksheet into Spec 003's existing `quiz_items`/
`answer_keys` tables (research.md R9), which this feature does not automate.
**Testing**: Vitest, extending `tests/unit/` with fixture tests for the new
`check-pipeline-gate.mjs` (same `makeFixture`/`runValidator`-style helper pattern as
`tests/unit/_helpers.mjs`, `weighting-sum.test.mjs`, etc.) — no new test framework.
**Target Platform**: Same CI (GitHub Actions `ubuntu-latest`, `.github/workflows/ci.yml`) and
same static site (`www.a2ahs.com`) as Specs 001–005. No new infrastructure.
**Project Type**: Single project (extends the Docusaurus root Spec 001 established). No
frontend/backend split — this feature ships zero UI; its entire surface is Git-tracked files plus
two Node CLI scripts run in CI.
**Performance Goals**: The new `check-pipeline-gate.mjs` walk is the same order of magnitude as
`validate-content.mjs`'s existing whole-`docs/`-tree walk (already proven at CI scale); no new
performance budget — reuses the existing CI job's overall runtime envelope.
**Constraints**: Git-ignored staging worksheets MUST NOT be committed (FR-018) — enforced by
`.gitignore` plus `check-no-answer-keys.mjs`'s extended scan as a backstop (research.md R5, R9);
`content-spec.md`/`tasks.md`/`terminology.csv`/`style-guide.md` stay plain Markdown/CSV in Git,
never a database (spec.md Assumptions); the terminology-conformance check MUST be a structured
`{en, ur}` equality check, never a full-text prose scan (research.md R4 — a feasibility
constraint from `/sp.clarify`).
**Scale/Scope**: One new script (`check-pipeline-gate.mjs`), one extended script
(`check-no-answer-keys.mjs`), three contract changes (`content-spec-frontmatter.schema.json` new,
`style-guide-frontmatter.schema.json` new, `unit-frontmatter.schema.json` gains `key_terms`), one
new CI step, one `.gitignore` entry, and the golden course's pipeline artifacts (EFMP-301:
`content-spec.md`, `tasks.md`) plus the two shared documents (`style-guide.md`,
`terminology.csv`, ~100 seed terms per SDD §5 step 1). Per FR-017, authoring content-specs for the
remaining Semester 1–4 courses is explicitly **out of** this feature's own Definition of Done.

## Constitution Check

*GATE: evaluated against Constitution v2.4.0. Re-checked after Phase 1 design below.*

| Article | Requirement | Status |
|---|---|---|
| II.2/II.3 | Traceability to guide items; gaps logged in `specs/gaps.md`, never invented | ✅ FR-002/FR-013 make content-spec CLO/SLO mapping and gap-escalation mandatory before drafting |
| III.5 | Citations; recommended readings cited only, never reproduced | ✅ FR-010, reused verbatim from the original SDD's CP6 |
| III.6 | Guide-section fidelity — the five-file folding rule, no new file types | ✅ FR-004's fixed mapping table; Unit Spec itself also stays a subsection, not a new file (research.md R1) |
| III.7 | 60/40 assessment weighting default; per-unit deviation justified | ✅ FR-008/FR-009, unchanged from Spec 001's existing `assessment_weighting` sum-to-100 validator, which this feature does not modify |
| IV | Spec → Plan → Tasks → Implementation → Review Gate order | ✅ Two `/sp.clarify` passes completed before this plan; `tasks.md` (this feature's own) follows via `/sp.tasks` |
| V.1 | Content/application separation; content stays Markdown/CSV in Git | ✅ No database; every new artifact is a plain file (data-model.md) |
| V.2 | Security in the backend; static bundle is public, no hidden answer keys | ✅ FR-012/FR-016d/FR-018 — quiz/answer content never committed, backed by the pre-existing `check-no-answer-keys.mjs` (research.md R5), extended not rebuilt |
| V.4 | One course = one content module; adding a course = zero platform-code change | ✅ This feature adds no per-course platform code — a course's pipeline footprint is one `content-spec.md` + one `tasks.md`, same "content folder, not code" shape as Spec 001's existing `check:add-course` invariant |
| VI.1 | Golden unit (EFMP-301 U1) proves the pipeline before scaling | ✅ FR-015/FR-017 scope this feature's own Definition of Done to exactly that (research.md R10) |
| VII | Content gate (curriculum owner); Engineering gate (spec compliance, CI) | ✅ `check-pipeline-gate.mjs` is the new Engineering-gate CI check (FR-016); the Content gate itself stays human (curriculum owner reviewing `content-spec.md`/PRs), unchanged in kind from Spec 001's existing human Content gate |
| X.2 | Docs gate — a spec changing contributor-facing setup/process MUST update README.md in the same branch | ✅ This feature adds a new mandatory contributor-facing CI step (`check:pipeline-gate`) and a new content-authoring workflow (`specs/content/`); T036 creates/updates `README.md` with a "Content authoring pipeline" section covering it |

**Result: PASS — no violations.** Complexity Tracking table is empty (nothing to justify): this
feature reuses more existing infrastructure (`gray-matter`, the whole-tree-walk pattern, the
answer-key scan script, the course-overview schema already built for it) than it adds.

## Project Structure

### Documentation (this feature)

```text
specs/006-content-pipeline/
├── plan.md              # This file
├── research.md           # Phase 0 output (R1-R10)
├── data-model.md         # Phase 1 output (file-based entities, no DB)
├── quickstart.md         # Phase 1 output (seed → build → prove-on-golden-unit → wire CI)
├── contracts/            # Phase 1 output (proposed schema files, applied to repo-root contracts/ during implementation)
│   ├── content-spec-frontmatter.schema.json   # new
│   ├── style-guide-frontmatter.schema.json    # new
│   └── unit-frontmatter.schema.json           # existing file + key_terms (diff against repo-root copy)
├── checklists/
│   └── requirements.md
└── tasks.md              # Phase 2 output (/sp.tasks — NOT created by /sp.plan)
```

### Source Code (repository root)

No `frontend/`/`backend/` split — this feature adds files to the same single Docusaurus-rooted
project Spec 001 established, plus two Node CLI scripts. **Content dirs grow with no platform-code
change** (Constitution V.4), same as Spec 001.

```text
specs/content/                         # NEW tree — this feature's entire "system"
├── style-guide.md                     # FR-007; front matter: version (R8)
├── terminology.csv                    # FR-006; term_en,term_ur,notes
├── efmp-301/                          # golden course (proves the pipeline, R10)
│   ├── content-spec.md                # FR-002; front matter: course_code, status; Unit Spec subsections (R1)
│   ├── tasks.md                       # FR-005; Markdown table, one row per unit x stage (R2)
│   └── .staging/                      # git-ignored — Assets Staging Worksheets (R9)
│       └── unit-01.md
└── <course-code>/                     # same shape, one dir per course as pipeline scales (out of this feature's DoD, FR-017)

contracts/                             # repo-root — existing dir, this feature edits/adds:
├── content-spec-frontmatter.schema.json   # NEW
├── style-guide-frontmatter.schema.json    # NEW
└── unit-frontmatter.schema.json           # EDITED — adds optional key_terms (R4)

scripts/
├── check-pipeline-gate.mjs            # NEW (R6) — tracker/content-spec/terminology gate
├── check-no-answer-keys.mjs           # EDITED (R5) — +pattern, +specs/content target
└── validate-content.mjs               # unchanged — content-shape gate stays a separate concern

tests/unit/
└── pipeline-gate.test.mjs             # NEW — fixture tests for check-pipeline-gate.mjs

.gitignore                             # EDITED — +specs/content/**/.staging/
.github/workflows/ci.yml               # EDITED — +"Pipeline gate" step (FR-016)
```

**Structure Decision**: Single project, same repo root as Specs 001–005. This feature's entire
new "system" is the `specs/content/` file tree plus two small Node scripts — no `src/` UI code,
no Supabase migration, no Edge Function. It sits alongside `docs/`/`i18n/` (the content Spec 001
already publishes) as a *governance* layer over the same tree, read by CI but never rendered by
Docusaurus itself.

## Complexity Tracking

> No Constitution Check violations — nothing to justify.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
