# Implementation Plan: Visual-density standard

**Branch**: `012-visual-density-standard` | **Date**: 2026-09-08 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/012-visual-density-standard/spec.md`

## Summary

Raise the content pipeline's figure floor from **one carrier per `topic-*.mdx`** to **two**, and
add a new rule: **every new-shape unit carries at least one concept map, flowchart, or timeline**.
Give every figure a single **archetype** from a closed six-value list
(`table | concept-map | flowchart | timeline | diagram | illustration`), recorded on the figure
manifest. Enforce all of it in `scripts/check-figures.mjs` with fixture tests. Record the raised
bar in the constitution (new **Article III.10**, governance `2.7.0 → 2.8.0`) and the content
style guide (`version 3.2 → 3.3`, which re-freezes `terminology.csv`), keep the `author-unit`
skill's embedded standard in sync, and teach `generate-figures` the archetype. Prove it by
retrofitting **EFMP-302 Unit 1** (four figures → at least eight, plus one schematic archetype)
in both locales with every gate green. Queue the **EFMP-301 Unit 1** golden re-proof in the
backlog (Article VI.1), not done here.

## Technical Context

**Language/Version**: Plain Node ESM (`.mjs`) gate scripts + one React prop-type widening
(`src/components/Figure.tsx`). TypeScript 5.6 / Node 22+, unchanged.
**Primary Dependencies**: `gray-matter` (existing) for the gate; the `sharp` devDep from Spec 009
is untouched. **No new dependency** (FR-014).
**Storage**: Filesystem / Git only. No database. New committed SVG assets under the existing
`static/img/figures/efmp-302/unit-01/` tree for the retrofit; the figure manifest at
`specs/content/efmp-302/figures/unit-01.md` gains an archetype per row.
**Testing**: Vitest - extend `tests/unit/figures-gate.test.mjs` with the five FR-006 fixtures
(passing unit; per-topic shortfall; missing schematic archetype; blank/unknown archetype; skipped
legacy unit). Same `spawn`-the-script-against-a-fixture-`CONTENT_ROOT` pattern already used there.
**Target Platform**: Same static site (`textbook.com.pk`) and GitHub Actions CI. **No new CI
step** - `check:figures` already runs; its checks widen.
**Project Type**: Single Docusaurus-rooted project. Zero Supabase / Edge Function / app-runtime
change. `<Figure>`'s only change is a wider `kind`/archetype prop union + `.figure--*` CSS.
**Constraints**: `check:figures` stays green byte-for-byte for legacy five-file units and
coming-soon stubs (regression floor, FR-005); no committed script makes a network call;
zero-em-dash and all Article III.8 accessibility rules hold for every new figure (FR-015); new
SVGs legible light + dark, no colour-only meaning, `break-inside: avoid` in the A4 print
stylesheet; the `ur` locale shows translated labels (`.ur.svg`) for every new diagram.
**Scale/Scope**: 1 gate-script rewrite (`check-figures.mjs`) + 1 manifest-lib change
(`scripts/lib/figure-manifest.mjs`) + test extension; 1 constitution amendment; 1 style-guide
section rewrite + `version` bump; 1 `author-unit` reference-file sync + `SKILL.md` step edit;
1 `generate-figures` reference/step edit; 1 manifest-contract doc bump; then EFMP-302 Unit 1:
~4+ new SVG assets (+ `.ur.svg`) + `<Figure>` wiring across 4 EN + 4 UR topic files + manifest
rows + `specs/backlog.md` note + PHRs.

## Constitution Check

| Article | Alignment |
|---|---|
| **III (Content Quality)** | This feature *adds* III.10. The amendment is MINOR (new sub-point, nothing removed or reversed) - same shape as the III.9 (v2.7.0) and III.1/III.3/III.6 (v2.6.0) amendments. |
| **III.8 (Accessibility)** | Reinforced: every new figure needs descriptive alt text, no colour-only meaning, RTL-correct Urdu labels. FR-015. |
| **IV (SDD Law)** | Full spec → plan → tasks → implementation; this plan is the gate. |
| **V.5 (Bundle budget)** | Images are excluded from the < 200 KB first-load budget and stay lazy-loaded; per-asset budgets from Spec 009 (SVG ≤ 20 KB) unchanged. More figures do not regress the budget. |
| **VI.1 (Standard versioning)** | Triggered: proving unit = EFMP-302 Unit 1 (done here); golden unit = EFMP-301 Unit 1 (queued in backlog, FR-013). |
| **VII (Review Gates)** | Engineering-gate row updated to name the density check alongside `check:figures` marker↔manifest consistency. |
| **VI.2 (Scope discipline)** | The golden-unit re-authoring is explicitly deferred to the backlog, not smuggled into this feature. |

No violation. No Complexity Tracking entry needed.

## Key design decisions (resolve here; ADR candidate)

### D1 - Archetype storage: **widen the manifest `Kind` column, do not add a new column**

`scripts/lib/figure-manifest.mjs` `KIND_ENUM` today is `{diagram, illustration}` and the parser
already accepts both the Spec 008 v1 (5-col) and Spec 009 v2 (7-col) headers. Chosen approach:
**replace `Kind` values with the six archetypes** (`table | concept-map | flowchart | timeline |
diagram | illustration`), keeping the column name `Kind`. Rationale:
- Smallest diff - one enum, no new column, the v2 header stays 7 wide.
- `diagram` and `illustration` remain valid values, so existing v2 rows that already say
  `diagram`/`illustration` still parse; only rows that *should* be a more specific archetype get
  updated (a lint the gate can surface as a soft note first, hard fail after the retrofit).
- `<Figure kind>` maps 1:1.
- The v2→v3 change is "the `Kind` vocabulary widened from 2 to 6"; contract doc bumped to note it.
Rejected: a separate `Archetype` column (8-wide header) - more parser surface, two fields that
can disagree, migration churn on every existing row.

### D2 - "non-table diagram" = archetype ∈ `{concept-map, flowchart, timeline}`

FR-002's schematic requirement is satisfied only by those three. `diagram` (generic schematic)
and `table` and `illustration` do **not** satisfy it. This matches the user's words ("concept
map, flow charts or timelines") and is unambiguous for the gate.

### D3 - Per-topic count is a count of **carriers**, archetype-blind

Two `table`s in one topic satisfy FR-001. Diversity is only enforced at unit level (FR-002).
Keeps the per-topic check a simple `>= 2`.

### D4 - Scope guard unchanged from the existing one-figure rule

Only units with `>= 1 topic-*.mdx` are checked; `index.mdx` / `unit-assessment.mdx` /
`unit-teacher-notes.mdx` / `course-review.mdx` carry no figure minimum; legacy five-file units
and coming-soon stubs are skipped (FR-005).

## Proposed constitution amendment (for owner review at the checkpoint)

**Governance version**: `2.7.0 → 2.8.0` (MINOR - new sub-point, no principle removed or reversed).
**Last Amended**: `2026-09-03 → 2026-09-08`.

**New Article III.10** (III.1–III.9 unchanged, NOT renumbered):

> 10. **Visual density**: every new-shape unit topic file (`topic-*.mdx`) MUST carry **at least
>     two figures** (a `{/* FIGURE[...] */}` marker or a rendered `<Figure>`), and every
>     new-shape unit MUST include **at least one concept map, flowchart, or timeline**. Every
>     figure is classified by one archetype - `table`, `concept-map`, `flowchart`, `timeline`,
>     `diagram`, or `illustration` - recorded on the unit's figure manifest. Legacy five-file
>     units and non-topic pages are exempt, as they are from III's per-topic structure rules.
>     Enforced by the `check:figures` CI gate. Accessibility (III.8) applies to every figure.

**Article VII review-gate table**, Engineering-gate row - append:
`• figure visual-density floor: >= 2 figures per topic, >= 1 concept-map/flowchart/timeline per unit (Spec 012 check:figures)`

**Amendment history block** (top-of-file `SYNC IMPACT REPORT (v2.8.0)`): new entry, prior v2.7.0
report retained below it, in the established format - records the MINOR rationale, the single
modified article, and the downstream artifacts reviewed (style-guide v3.3 + terminology re-freeze;
`check-figures.mjs` + `figure-manifest.mjs` + tests; `author-unit` / `generate-figures` skills;
manifest contract v2→v3; EFMP-302 Unit 1 retrofit; EFMP-301 Unit 1 backlog follow-up).

## Phase 0 - Research (`research.md`)

- **R1** - audit `scripts/check-figures.mjs` line-by-line: where the `>= 1 carrier/topic` check
  lives (`:131-133`), how it iterates topic files, where manifest rows are cross-checked, the
  `KIND_ENUM` gate in `figure-manifest.mjs:11-12`, and the `placed`/bilingual branch (`:216-247`).
- **R2** - confirm the `figures-gate.test.mjs` fixture harness shape and how it builds a throwaway
  `CONTENT_ROOT` (so the five new fixtures follow it).
- **R3** - confirm EFMP-302 Unit 1's current `translation_status` on the **EN** `index.mdx`
  (drives whether `check:figures` demands the `.ur.svg` side for the new figures *now* or only
  once Workstream D flips the UR mirror to `reviewed`). Decide retrofit ordering vs the Urdu
  re-translation accordingly.
- **R4** - the four EFMP-302 Unit 1 topics: pick the archetype + subject for each added figure so
  the extra figures teach, not decorate (topic 1.3's professionalization arc → timeline is the
  natural unit-level schematic; the four-quality comparison is already `fig-U1-1` as a table).
- **R5** - `generate-figures` `references/svg-authoring.md` "five archetypes" → the six-value
  list mapping; confirm no render-route gap.

## Phase 1 - Design & Contracts

- **`scripts/lib/figure-manifest.mjs`**: `KIND_ENUM` → the six archetypes; keep v1/v2 header
  acceptance; add a `SCHEMATIC_ARCHETYPES` set for the gate.
- **`scripts/check-figures.mjs`**:
  - per-topic carrier count `>= 1` → `>= 2`, message names the file + the minimum.
  - new per-unit pass: `>= 1` manifest row (or carrier) whose archetype ∈ `{concept-map,
    flowchart, timeline}`; message names the unit.
  - every carrier/row must resolve to a valid archetype; blank/unknown → fail naming the figure ID.
  - all existing checks unchanged; legacy/stub skip unchanged.
- **`tests/unit/figures-gate.test.mjs`**: +5 fixtures (FR-006).
- **`src/components/Figure.tsx`**: widen the `kind` prop union to the six values; `.figure--*`
  classes in `src/css/custom.css` for the four new values (visual treatment can be minimal -   a caption/aria affordance, not a redesign).
- **Contract** `specs/009-figure-rendering/contracts/figure-manifest-v2.md` → add a v3 note
  (the `Kind` vocabulary widened 2 → 6; `Kind` column name unchanged).
- **`specs/content/style-guide.md`**: rewrite `## Figure markers and manifests` quantity rule
  (`:359`) and `## Diagram conventions` (`:70-73`) to state FR-001/002/003; update the
  depth-gate-vs-human table row (`:221`); bump front-matter `version "3.2" → "3.3"`. Then
  re-attest `specs/content/terminology.csv` against the new version (Spec 006 FR-007) - no term
  is expected to change; the retrofit's figure labels reuse existing bank terms.
- **`.claude/skills/author-unit/references/structure-standard.md`** (the style-guide twin) -   mirror the same rule text in the same branch; **`SKILL.md`** Step 3.1 (plan 2–3
  archetype-tagged figures per topic; ensure one schematic archetype in the unit) and Step 4
  (manifest rows carry an archetype).
- **`.claude/skills/author-unit/references/figure-prompts.md`** - the "≥ 1 marker per topic; more
  is fine" line → "≥ 2 markers per topic, each tagged with an archetype; ≥ 1
  concept-map/flowchart/timeline per unit".
- **Per-course content-spec `**Figure plan**` shape** (contract
  `specs/008-rich-unit-pedagogy/contracts/*content-spec*`) - allow ≥ 2 IDs per topic, each with
  an archetype; the `### Topic list` `Figures` column likewise. Update
  `specs/content/efmp-302/content-spec.md` `**Figure plan**` / `### Topic list` for Unit 1.
- **`.claude/skills/generate-figures/`** - `SKILL.md` Step 1.3 + `references/svg-authoring.md`:
  the six archetype names, each mapped to a render route (schematic → hand SVG; illustration →
  raster). Record the archetype on the manifest row it advances.

## Phase 2 - (handled by `/sp.tasks`, not here)

## Retrofit - EFMP-302 Unit 1 (the proving unit)

1. For each `docs/semester-1/efmp-302/unit-01/topic-01..04.mdx`: add ≥ 1 figure marker so each
   topic has ≥ 2 carriers; ensure the unit gains ≥ 1 `concept-map` / `flowchart` / `timeline`.
2. Update `specs/content/efmp-302/figures/unit-01.md` - new rows, archetype per row, lifecycle
   `prompt-only → generated → placed`.
3. Render new SVGs via `generate-figures` into `static/img/figures/efmp-302/unit-01/`; replace
   markers with `<Figure>`.
4. Urdu mirror: per R3 - if the unit is (or becomes) `translation_status: reviewed`, add the
   matching UR `<Figure>` + `<figId>.ur.svg` for every new figure; otherwise this rides along
   with Workstream D's re-translation pass (the D branch merges after this one).
5. `specs/backlog.md` - record the EFMP-301 Unit 1 golden re-proof to `version 3.3` as the
   immediate-next content task (FR-013).

## Risks & follow-ups (max 3)

- **R-1** - retrofitting an already-published, possibly-`reviewed` unit can trip the bilingual
  `check:figures` branch mid-change. Mitigation: R3 settles ordering; if EN is `reviewed`, do the
  `.ur.svg` + UR `<Figure>` in the same branch; else sequence before Workstream D and let D
  translate the new labels.
- **R-2** - widening `KIND_ENUM` could fail existing v2 rows that legitimately say `diagram`.
  Mitigation: `diagram` stays a valid value; only rows that *should* be more specific are updated,
  and only EFMP-302 Unit 1 has authored figures today.
- **R-3** - style-guide `version` bump re-freezes `terminology.csv`; an accidental term drift
  would fail `check:pipeline-gate`. Mitigation: re-attest with no content change; diff the CSV to
  confirm zero term edits.

## Implementation notes (post-build reconciliation - Constitution Art. IV.4)

Landed 2026-09-08/09 on `012-visual-density-standard` in three commits (`f70ee25` foundations,
`9e11a85` US1+US2, `<US3 commit>` retrofit).

**Deviations / discoveries vs. the plan:**

- **`prompt-only` Kind rule relaxed, not just widened.** Spec 009 forbade a `Kind` on a
  `prompt-only` row. Keeping that would have made the per-unit schematic rule uncheckable before
  render and would have blocked authors from recording a *planned* archetype. Resolution: a
  `prompt-only` row MAY carry its planned archetype (must be valid if present); `Src` still must
  be blank. `generated`/`placed` rows must carry a valid archetype.
- **Density rules are conditional on classification, not unconditional.** The `>= 2 carriers per
  topic` rule is unconditional for new-shape units. The **per-unit schematic** rule and the
  **every-rendered-row-needs-a-Kind** rule apply only once *any* manifest row carries a `Kind`
  (`kindedRows.length > 0`). A fully unplanned all-`prompt-only` manifest with blank `Kind` cells
  keeps the Spec 008/009 behaviour byte-for-byte - this preserved every existing
  `figures-gate.test.mjs` regression-floor case without a fixture rewrite for those.
- **Fixture harness rewritten.** Both `makeFiguresFixture` (v1) and `makeV2Fixture` (v2) build
  **two carriers per topic** now (a primary + a mirrored filler), with matching manifest rows;
  `makeV2Fixture` defaults `fig-U1-1` to `flowchart` so any rendered fixture satisfies the
  schematic rule. 30 cases pass (was 24); full unit suite 142/142.
- **EFMP-302 Unit 1 retrofit kept existing ids.** Rather than renumber, the four new figures are
  `fig-U1-5`..`fig-U1-8` (ids are unit-scoped, not required contiguous). `fig-U1-1` reclassified
  `diagram -> table`, `fig-U1-4` `diagram -> concept-map`; `fig-U1-2`/`fig-U1-3` stay `diagram`.
  New schematics: `fig-U1-5` concept-map (1.1), `fig-U1-6` flowchart (1.2), `fig-U1-7` timeline
  (1.3, the unit's required schematic), `fig-U1-8` flowchart (1.4). All hand-authored SVG
  2.7-3.6 KB, + `.ur.svg` label variants. The UR mirror is `translation_status: draft`, so its
  `<Figure>`s and `.ur.svg`s are written and wired but not yet gate-enforced (Workstream D's
  re-translation reviews the Urdu labels).
- `Figure.tsx` `kind` prop widened to a `FigureKind` union of the six values; `.figure--table` /
  `--concept-map` / `--flowchart` / `--timeline` added to `src/css/custom.css`.

**Verification (all green):** `check:figures`, `check:depth-gate`, `validate:content`,
`check:no-em-dash`, `check:pipeline-gate`, `check:no-answer-keys`; `npx tsc --noEmit`;
`npm test` 142/142; `npm run build` en + ur - built EN and UR topic pages render both figures
with the archetype class (`figure--table`, `figure--concept-map`, ...) and the `.ur.svg` on the
`/ur/` route.

**Follow-up (backlog):** EFMP-301 Unit 1 golden re-proof to style-guide v3.3 (Art. VI.1);
EFMP-302 Units 2-6 meet Art. III.10 when they move to the per-topic layout.
