# Quickstart: Content Authoring Pipeline

**Feature**: 006-content-pipeline | **Date**: 2026-08-24

How to stand up the pipeline's shared artifacts, wire its new CI gate, and prove it end-to-end on
the EFMP-301 golden unit. No new npm dependency; no new database. Package manager: `npm` (Node
22+, matching Specs 002–005).

## G3/G5 review delegation (2026-09-11 amendment)

Constitution v3.0.0 Article III.2/VII and
[ADR-0019](../../history/adr/0019-independent-agents-for-g3-g5-review.md) supersede the
human-only execution requirements in this document **only after delegated review is enabled**.
G0 course-intake approval and unresolved guide/terminology decisions remain with the curriculum
owner. Existing three-state trackers and latest-row-wins behavior remain.

A qualified independent agent may then satisfy G3/G5 without per-unit human countersignature,
using authenticated, input-bound evidence and an enabled reviewer identity. A non-empty
reviewer field alone is insufficient. G5 requires a complete translation and accepted G3
evidence for the identical English inputs. `translation_status: reviewed` cannot be set
on an advisory report.

**Current runtime:** reviewer implementation and qualification are not delivered by this
amendment. Existing human sign-off remains operative. References below to human reviewers
and initials describe that current path. The follow-on feature must update the data model,
gate, author/reviewer handoffs and CI evidence validation before activating the delegated path.

## 1. Seed the shared reference documents (FR-006, FR-007, R7, R8)

```bash
mkdir -p specs/content
```

- `specs/content/style-guide.md` — front matter `version: "1.0"` (draft it, don't freeze yet);
  EN readability rules, UR register rules, Pakistan/Sindh localization rules, citation format,
  diagram conventions, and the maintained answer-key marker pattern list (mirrors
  `scripts/check-no-answer-keys.mjs`'s `PATTERNS`, kept here as the documented source).
- `specs/content/terminology.csv` — `term_en,term_ur,notes` header, seed with ~100 core
  education terms EN↔UR (SDD §5 step 1).

Freeze v1 only after the golden unit (§4 below) passes — bump `style-guide.md`'s `version` to
`"1.0"` as the last step, not the first (FR-017's Definition of Done).

## 2. Extend the contracts (R4, R6)

Apply the three schema files from `specs/006-content-pipeline/contracts/` to the repo-root
`contracts/` directory:

```bash
cp specs/006-content-pipeline/contracts/content-spec-frontmatter.schema.json contracts/
cp specs/006-content-pipeline/contracts/style-guide-frontmatter.schema.json contracts/
cp specs/006-content-pipeline/contracts/unit-frontmatter.schema.json contracts/   # adds key_terms
```

## 3. Build the new pipeline-gate script (R6)

Create `scripts/check-pipeline-gate.mjs` (plain Node + `gray-matter`, same shape as
`scripts/validate-content.mjs`):

- Walk `docs/**` exactly like `validate-content.mjs` already does.
- For every non-`coming_soon` unit: read its course's `content-spec.md` (must be
  `status: approved`) and `tasks.md` (must have `✅` rows for `G2 en-draft`/`G3 en-review`, plus
  `G4 ur-translation`/`G5 ur-review` when the UR mirror is `translation_status: reviewed`).
- For the unit's UR `index.mdx` (if present): read `key_terms`, cross-check each `{en, ur}` pair
  against `specs/content/terminology.csv` (R4/R7).
- Exit non-zero with a per-unit message identifying which condition failed (SC-007).

```bash
npm run check:pipeline-gate   # add this script alias to package.json
```

Extend `scripts/check-no-answer-keys.mjs` (R5): add `/\bcorrect\s*answer\b/i` to `PATTERNS`, add
`specs/content` to `TARGETS`. No new script, no new CI step for this part — the existing
"Answer-key safety check" step already covers it.

## 4. Ignore the staging worksheets (R9)

Add to `.gitignore`:

```gitignore
# Spec 006: quiz/answer-key staging worksheets — never committed (FR-018)
specs/content/**/.staging/
```

## 5. Prove the pipeline on the golden unit (R10, SC-001/SC-002)

EFMP-301 Unit 1 already exists (published, `translation_status: reviewed` both locales;
`course-overview.mdx` already carries `teaching_strategies`/`assessment_criteria`/`resources`).
This step authors the pipeline's own artifacts retroactively — no prose is re-drafted:

```bash
mkdir -p specs/content/efmp-301
```

- `specs/content/efmp-301/content-spec.md` — `status: approved`; `## Course-wide items` mirroring
  what `course-overview.mdx` already carries; `## Unit 1: Introduction to Educational Psychology`
  mapping to `SLO:EFMP-301-1-1`/`SLO:EFMP-301-1-2` (already in the unit's `clo_refs`).
- `specs/content/efmp-301/tasks.md` — `Unit 1` rows for `G1`–`G5` all `✅` with reviewer initials
  (`G6`/`G7` `✅` once assets/publish are confirmed done, which they already are for this unit).
- Add `key_terms` to the UR `index.mdx`'s front matter for at least "Educational Psychology"
  (already a `<Glossary>` term in the EN body — reuse it), matching a `terminology.csv` row.

```bash
npm run check:pipeline-gate
npm run check:no-answer-keys
```

Both MUST pass with zero findings (SC-002).

## 6. Wire CI (FR-016)

In `.github/workflows/ci.yml`, add a step alongside the existing "Validate content" /
"Answer-key safety check" steps:

```yaml
- name: Pipeline gate (tracker, content-spec, terminology)
  run: npm run check:pipeline-gate
```

Place it after "Validate content" (content shape must already be valid before governance state is
checked) and before the build step.

## 7. Prove the feedback loop end-to-end (Story 5, SC-004)

Seed one `improvement_suggestions` row with `status='accepted'` (Spec 005's existing table).
Open a Revision Task: add a row to `specs/content/efmp-301/tasks.md` for the target unit/stage,
with the `Suggestion` column set to that row's `id`. Carry it through the same gate as any other
row (§5), publish the fix, and set the suggestion's `status` to `published` (Spec 005's existing
moderation UI). Confirm the identifier is traceable at every step (SC-004).

## Verification checklist

- [ ] `style-guide.md` and `terminology.csv` exist, `version: "1.0"` set only after step 5 passes
- [ ] `contracts/content-spec-frontmatter.schema.json`, `contracts/style-guide-frontmatter.schema.json` applied; `contracts/unit-frontmatter.schema.json` carries `key_terms`
- [ ] `scripts/check-pipeline-gate.mjs` exists and exits 0 against the golden unit
- [ ] `scripts/check-no-answer-keys.mjs` extended (pattern + target) and still exits 0
- [ ] `.gitignore` carries the `.staging/` entry
- [ ] `ci.yml` runs the new gate step
- [ ] `specs/content/efmp-301/content-spec.md` (`status: approved`) and `tasks.md` (G1–G7 `✅`) exist
- [ ] One test suggestion flows filed → accepted → revision task → published, traceably (SC-004)
