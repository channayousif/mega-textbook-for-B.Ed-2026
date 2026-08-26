# Phase 0 Research: Content Authoring Pipeline

Every unknown the spec's Clarifications sessions left as a policy decision (not an implementation
one) is resolved here as a concrete technical design, grounded in what Specs 001/003 already
ship. No `NEEDS CLARIFICATION` markers remain in the Technical Context — this feature adds no new
runtime dependency, no new database, and no new application surface; it is Markdown/CSV artifacts
plus two Node validation scripts wired into the existing CI pipeline.

## R1 — Unit Spec storage: subsection, not a file

**Decision**: A Unit Spec is a `##`-level subsection inside its course's single
`content-spec.md`, keyed by unit number (e.g. `## Unit 1: Introduction to Educational
Psychology`), carrying CLO refs, key terms, worked-example ideas, activity concepts, reading
materials, and the assessment blueprint as sub-bullets/sub-headings underneath.

**Rationale**: Confirmed in `/sp.clarify` (2026-08-24). Keeps one file, one approval flag
(`status: approved`, FR-002/FR-016b) per course — adding a second per-unit file family would
duplicate the single-source-of-truth property FR-002/FR-005 already establish for content-spec
and tasks tracker.

**Alternatives considered**: a separate `unit-XX-spec.md` per unit (rejected — a second
per-unit file family alongside `content-spec.md`/`tasks.md`, no added value); embedding directly
in the unit's own `index.mdx` front matter (rejected — collapses G1 into G2, losing the
pre-draft review point Constitution Art. II.2 requires before any prose is written).

## R2 — Task tracker: a parseable Markdown table

**Decision**: `tasks.md` is a Markdown table, one row per unit per **G1–G7** stage (G0 is
tracked at the content-spec level via its own `status` field, not as a tasks.md row — course
intake is a course-wide, not per-unit, milestone):

```markdown
| Unit | Stage | Status | Reviewer | Suggestion |
|---|---|---|---|---|
| Unit 1 | G1 unit-spec | ✅ | YM | |
| Unit 1 | G2 en-draft | ✅ | YM | |
| Unit 1 | G3 en-review | ✅ | YM | |
| Unit 1 | G4 ur-translation | ✅ | YM | |
| Unit 1 | G5 ur-review | ✅ | YM | |
| Unit 1 | G6 assets | ▣ | | |
| Unit 1 | G7 publish | ▢ | | |
```

Status is exactly one of `▢` (not-started) / `▣` (in-progress) / `✅` (done) — FR-005's 3-value
enum. `Reviewer` holds initials, required once a row is `✅`. `Suggestion` is blank for a normal
drafting row and holds the originating `improvement_suggestions.id` (UUID) for a revision-task row
(FR-011) — reusing the same table rather than a parallel one (R6 below).

**Rationale**: A Markdown table is trivially both human-readable (the FR-005 requirement — "the
single place that reflects true progress") and machine-parseable with a small regex over `|`-split
cells, consistent with this repo's existing preference for plain Markdown/CSV over structured data
formats for anything Git-tracked (Constitution Art. V.1).

**Alternatives considered**: YAML/JSON tracker file (rejected — loses the "open it and read it"
property FR-005 explicitly asks for; also a new file format this repo doesn't otherwise use for
hand-edited state); a checkbox list instead of a table (rejected — can't carry reviewer initials
or a suggestion id per row without inventing an ad hoc sub-syntax).

## R3 — Content-spec approval: front-matter field

**Decision**: `content-spec.md` carries YAML front matter:

```yaml
---
course_code: EFMP-301
status: approved   # draft | approved
---
```

**Rationale**: Confirmed in `/sp.clarify`. Mirrors the `translation_status: draft|reviewed`
pattern `contracts/unit-frontmatter.schema.json` already uses — the new pipeline-gate script reads
one structured field with `gray-matter` (already a dependency), the same library
`validate-content.mjs` already uses for every other front-matter read in this repo.

## R4 — Terminology-bank CI check: structured `{en, ur}` pairs, not prose scanning

**Decision**: `contracts/unit-frontmatter.schema.json` gains an optional field:

```json
"key_terms": {
  "type": "array",
  "items": {
    "type": "object",
    "required": ["en", "ur"],
    "properties": { "en": { "type": "string" }, "ur": { "type": "string" } }
  }
}
```

A unit's **Urdu** `index.mdx` (where the translation choice is actually made) declares its own
`key_terms: [{en: "...", ur: "..."}, ...]` — one entry per term from its Unit Spec's key-terms
list (R1). The new pipeline-gate script (R6) looks up each `en` value in `terminology.csv`: if
absent, flag "term not in bank" (FR-016c's "flagging, not silently overriding"); if present, the
declared `ur` MUST equal the bank's `term_ur` exactly, or flag a mismatch.

**Rationale**: This is what makes "conform to terminology.csv" fully automatable without prose
scanning — the earlier idea of grep-matching Urdu prose against the bank was rejected in
`/sp.clarify` for exactly this feasibility reason (inflected forms, synonyms). Declaring the pair
in front matter turns "does this translation match the bank" into an exact string-equality check,
the same class of check `assessment_weighting`'s sum-to-100 rule already is.

**Alternatives considered**: full-text keyword scan of the Urdu prose (rejected in `/sp.clarify`
— not reliably automatable); no automated check at all (rejected — FR-016c explicitly calls for
one; SC-003's manual 10-term spot-check stays as the complementary human-side verification of
translation *quality*, which this structured check does not and cannot assess).

## R5 — Answer-key leak prevention: extend the existing script, don't build a new one

**Decision**: `scripts/check-no-answer-keys.mjs` **already implements** FR-016d's keyword/pattern
scan — it greps `docs/`, `i18n/`, and `build/` for forbidden front-matter keys and answer-key
markers (`/\banswer\s*key\b/i`, `/\bmarking\s*scheme\b/i`, etc.) and is already wired into
`ci.yml` twice (pre-build and post-build), exiting non-zero on any hit. This feature:

1. Adds `/\bcorrect\s*answer\b/i` to its `PATTERNS` list (FR-016d names "correct answer" as an
   example marker the original script didn't cover).
2. Adds `specs/content` to its `TARGETS` list, so an accidentally-committed staging worksheet
   (R9) — despite being `.gitignore`d — is still caught if someone force-adds it.

No new script, no new CI step; the existing "Answer-key safety check" step's exit code already
functions exactly as FR-016d's "blocks merge pending human confirmation" (a failing required CI
check blocks the merge until a human fixes the false positive or removes the content — that *is*
"pending human confirmation," just expressed as a CI failure rather than a soft warning).

**Rationale**: Spec 001 built this precisely because Constitution Art. V.2 already required it
("Anything shipped in the static bundle is public"). Rebuilding it under a new name would
duplicate working, already-CI-wired code — directly against this repo's "smallest viable diff"
practice.

## R6 — New script: `scripts/check-pipeline-gate.mjs`

**Decision**: A new, single-purpose Node script (mirroring `check-add-course.mjs`'s and
`validate-content.mjs`'s existing shape — plain Node + `gray-matter`, no new dependency) walks
`docs/` exactly like `validate-content.mjs` already does, and for every **non-`coming_soon`**
unit it finds:

- **(a) Tracker check**: reads the unit's course `specs/content/<course-code>/tasks.md`; requires
  a `✅` row (with reviewer initials) for `G2 en-draft` and `G3 en-review`. If the unit's UR mirror
  exists with `translation_status: reviewed`, also requires `✅` rows for `G4 ur-translation` and
  `G5 ur-review`.
- **(b) Approval check**: reads `specs/content/<course-code>/content-spec.md`'s front matter;
  requires `status: approved`.
- **(c) Terminology check**: for the unit's UR `index.mdx` (if present), reads `key_terms` (R4)
  and cross-checks each pair against `specs/content/terminology.csv` (R7's parser).

Answer-key scanning (FR-016d) stays in `check-no-answer-keys.mjs` (R5) — a separate concern, run
as its own CI step, not folded into this script.

**Scope note**: this check intentionally excludes `G1` and `G6`/`G7`. `G1 unit-spec` is already
gated by the content-spec approval check (b) — a second check would be redundant. `G7 publish` is
not independently re-checked because publish *is* the merge event this gate runs against;
checking "G7 done" pre-merge would be circular. `G6 assets` hands off to a manual, out-of-repo
Studio entry step (R9) with no committed artifact for CI to inspect.

**Rationale**: Single-responsibility scripts are this repo's established pattern
(`validate-content.mjs` = content shape, `check-no-answer-keys.mjs` = security scan,
`check-add-course.mjs` = structural invariant). This governance/state gate is a different concern
from content shape validation — it reads a different root (`specs/content/`) for a different
purpose (process state, not document structure) — so it earns its own script rather than bloating
`validate-content.mjs`.

**Alternatives considered**: folding all three checks into `validate-content.mjs` (rejected — that
script already has a clear single job per its own docstring; mixing in tracker/approval reads
against a second root muddies both); a git-diff-based "only check PR-changed units" approach
(rejected — `validate-content.mjs`'s existing whole-tree-walk-on-every-push model is simpler,
already proven, and this script reuses the identical walk function shape for consistency).

## R7 — `terminology.csv` parsing: no new dependency

**Decision**: A ~15-line hand-rolled CSV line parser (split on `,`, trim, handle a
double-quote-wrapped field for the rare `notes` value containing a comma) — `term_en`, `term_ur`,
`notes` never need more than that in practice for this domain.

**Rationale**: Matches this repo's existing "no new dependency" precedent (Specs 004/005 R7: no
charting library for plain CSS/SVG bars) — a full CSV-parsing package (e.g. `csv-parse`) is
unjustified for a 3-column, comma-rare file this small.

## R8 — "Frozen v1" verification: `style-guide.md`'s `version` field

**Decision**: `specs/content/style-guide.md` carries front matter `version: "1.0"`; this single
field is the authoritative freeze marker for **both** the style guide and `terminology.csv` (they
are always versioned/frozen together per FR-017's phrasing). FR-017's Definition-of-Done check is
manual (a human confirms the field is set before declaring the feature done) — no CI gate enforces
it, since "done" is a one-time completion signal for this feature, not an ongoing per-PR check.

**Rationale**: Confirmed in `/sp.clarify`. Reuses the front-matter-field pattern already
established for `translation_status` and `content-spec.md`'s `status` (R3) rather than inventing a
git-tag or separate-log mechanism.

## R9 — Assets staging worksheet: broadened to cover both `quiz_items` and `answer_keys`

**Decision**: One per-unit, git-ignored file at `specs/content/<course-code>/.staging/unit-NN.md`,
covering **both** quiz-bank items (question stem, options, correct option, Bloom tag — matching
Spec 003's `quiz_items` shape: `question_text`, `options: [{key, text}]`, `correct_option`) *and*
formative/summative answer-key content (matching `answer_keys`' `kind`/`content` shape) — not just
quiz items as FR-018's name suggests. A single `.gitignore` entry, `specs/content/**/.staging/`,
covers the whole worksheet family.

**Rationale**: FR-012 already scopes *both* `quiz_items` and `answer_keys` as protected content
that must never reach the repo; FR-018 named only "quiz staging worksheet" because that was the
term in scope when the clarification question was asked, but the same leak-prevention logic
applies identically to formative/summative answer keys, which have nowhere else to stage before
manual Studio entry. This is an implementation-level generalization consistent with FR-012's
already-broader scope, not a new scope decision — no additional `/sp.clarify` round needed.

## R10 — Golden unit: retroactive fit, not re-authoring

**Decision**: EFMP-301 Unit 1 already exists, fully published (`translation_status: reviewed` in
both locales) and its `course-overview.mdx` already carries `teaching_strategies`,
`assessment_criteria`, and `resources` front matter (Spec 001 built this course-overview schema
with Spec 006 explicitly in mind — see its `description` field: "Spec 006 CP9"). This feature's
golden-unit work is authoring `specs/content/efmp-301/content-spec.md` (with `status: approved`
and a Unit 1 subsection tracing to the guide's CLOs) and `specs/content/efmp-301/tasks.md` (all
G1–G5 rows `✅`) so that the new `check-pipeline-gate.mjs` (R6) passes against the *already-shipped*
files — not re-drafting or re-translating any prose.

**Rationale**: Matches spec.md's Assumptions section exactly (SC-001/SC-002 "require it to
demonstrably pass through this spec's own formal artifacts... rather than requiring it be
re-authored from scratch").
