# Feature Specification: Visual-density standard - a gated figure floor per topic and per unit

**Feature Branch**: `012-visual-density-standard`
**Created**: 2026-09-08
**Status**: Draft
**Input**: User request: "there should be more diagrams, concept maps, flow charts or timelines
within the topics, remember a visual worth thousand words. reinforce the relevant unit/topic
writing skills/content pipeline."

Owner decisions (AskUserQuestion, 2026-09-08):

- **Hard enforcement**, not a soft nudge: the CI figures gate blocks a unit that falls short, and
  the constitution carries the rule.
- **Its own spec** (this one), separate from the dashboard work (Spec 011), because it amends the
  constitution and needs a proving unit.
- **Retrofit EFMP-302 Unit 1** as the proving unit - the already-published unit gains its extra
  diagrams in both locales, not just the standard set forward.
- Full SDD: this `specs/012-visual-density-standard/` set precedes implementation.

## Context

Spec 008 gave every new-shape unit a per-topic layout, `{/* FIGURE[...] */}` markers, and a
per-unit figure manifest. Spec 009 turned those markers into committed, accessible, lazy-loaded
`<Figure>` images in both locales. But the **quantity** rule stopped at a floor of one: the
style guide says "at least one figure per `topic-*.mdx`", the figures gate enforces exactly that,
and the `author-unit` skill tells the author to plan one figure per topic (more "is fine" but is
never asked for). Nothing distinguishes a comparison table from a concept map, and nothing
requires the schematic aids - flow, sequence, relationship webs, timelines - that carry the most
teaching load.

The result on the page: a B.Ed trainee in Sindh, often on a low-end phone, reads long stretches
of prose with a single table or triangle per topic and no visual scaffold for the processes and
relationships the prose describes. EFMP-302 Unit 1 - the current working depth exemplar - ships
four figures across four topics, one each.

This feature raises the floor and makes it non-negotiable: **at least two figures per topic
file, and at least one concept map, flowchart, or timeline per unit**, classified by a named
archetype, enforced by the gate, recorded in the constitution and the style guide, and
demonstrated on EFMP-302 Unit 1.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - The figures gate enforces the visual-density floor (Priority: P1) 🎯 MVP

A content reviewer (or CI on a pull request) runs the figures gate against a new-shape unit. The
gate reports a failure, naming the file, when any `topic-*.mdx` carries fewer than two figure
carriers, or when the unit as a whole carries no figure classified as a concept map, flowchart,
or timeline. When both conditions are met the gate passes. Every figure carrier and manifest row
is also checked to declare a valid archetype from the closed list.

**Why this priority**: This is the feature. Without the gate change the standard is advisory and
units keep shipping one figure per topic.

**Independent Test**: Point the gate at a fixture unit with two topics - one topic with a single
figure, one with two tables and no schematic - and confirm it fails with two distinct messages
(topic-01 under the per-topic minimum; unit has no concept-map/flowchart/timeline). Add a second
figure to topic-01 and convert one table to a flowchart; confirm it passes. Confirm a manifest
row with a blank or unknown archetype fails.

**Acceptance Scenarios**:

1. **Given** a new-shape unit where `topic-02.mdx` has exactly one `<Figure>` and one marker is
   absent, **When** the figures gate runs, **Then** it fails with a message naming
   `topic-02.mdx` and the per-topic minimum of two.
2. **Given** a new-shape unit where every topic has two or more carriers but none of the unit's
   figures is a concept map, flowchart, or timeline, **When** the gate runs, **Then** it fails
   with a message naming the unit and the missing schematic-archetype requirement.
3. **Given** a unit where every topic has two or more carriers and at least one figure is a
   timeline, **When** the gate runs, **Then** the visual-density checks pass (subject to the
   existing marker/manifest consistency checks).
4. **Given** a manifest row whose archetype cell is blank, an unknown word, or missing, **When**
   the gate runs, **Then** it fails with a message naming the figure ID and the allowed archetype
   values.
5. **Given** a legacy five-file unit (no `topic-*.mdx`), **When** the gate runs, **Then** the
   visual-density checks are skipped exactly as the current one-figure rule is skipped.

---

### User Story 2 - An author plans and places figures to the new standard (Priority: P2)

A content author authoring or re-drafting a unit consults the updated style guide and the
`author-unit` skill. Both now tell them to plan **two to three figures per topic**, each tagged
with an archetype, and to ensure the unit includes at least one concept map, flowchart, or
timeline. The per-course content-spec "Figure plan" now lists multiple figure IDs per topic with
an archetype for each. When the author later runs the `generate-figures` skill, it renders each
figure to its archetype (the archetypes map onto the SVG archetypes the render skill already
supports) and records the archetype on the manifest row.

**Why this priority**: The gate can only reject; authors need the standard written where they
work so a conforming unit is the default output, not a rework cycle.

**Independent Test**: Follow the updated `author-unit` skill for a fresh unit; confirm the draft
it produces has two-plus tagged figures per topic and at least one schematic archetype, and that
the figures gate passes on the first run with no figure-count rework.

**Acceptance Scenarios**:

1. **Given** the updated `author-unit` skill, **When** an author drafts a unit, **Then** each
   `topic-*.mdx` carries two or more figure markers, each with an archetype, and the unit carries
   at least one concept-map / flowchart / timeline marker.
2. **Given** the updated content-spec "Figure plan" shape, **When** an author fills it, **Then**
   it enumerates two or more figure IDs per topic, each with an archetype, and the emitted
   manifest has one `prompt-only` row per ID.
3. **Given** a unit drafted to the new standard, **When** `generate-figures` runs, **Then** every
   manifest row reaches `placed` with an archetype and a source file, and both the figures gate
   and the depth gate pass.

---

### User Story 3 - EFMP-302 Unit 1 is retrofitted as the proving unit (Priority: P2)

The already-published EFMP-302 Unit 1 currently has four figures, one per topic. Under this
feature it gains enough additional figures to meet the floor (two-plus per topic) and to include
at least one concept map, flowchart, or timeline. The new figures are authored and rendered the
same way Spec 009 renders any figure, mirrored into the Urdu locale, and the unit's figure
manifest is updated. All content gates stay green.

**Why this priority**: Constitution Article VI.1 requires the raised bar to be demonstrated on a
proving unit before the new standard version is frozen. EFMP-302 Unit 1 is that unit.

**Independent Test**: After the retrofit, every EFMP-302 Unit 1 topic page shows two or more
distinct figures; the unit includes at least one schematic archetype; `check:figures`,
`check:depth-gate`, `validate:content`, `check:no-em-dash`, `check:pipeline-gate`, `npm test`,
and `npm run build` (both locales) all pass; the built pages render the new figures in EN and UR.

**Acceptance Scenarios**:

1. **Given** EFMP-302 Unit 1 with one figure per topic, **When** the retrofit is complete,
   **Then** each of its topic files carries two or more `<Figure>` elements and the manifest has
   a row per figure with an archetype and `Status: placed`.
2. **Given** the retrofit adds a concept map to the unit, **When** the figures gate runs,
   **Then** the schematic-archetype requirement is satisfied.
3. **Given** the unit's Urdu mirror, **When** the retrofit places a new diagram, **Then** the
   Urdu topic file carries the matching `<Figure>` and a translated-label variant exists, so the
   figures gate passes for the reviewed bilingual unit. *(Coordinated with the EFMP-302 Unit 1
   Urdu re-translation work stream; if that work stream runs first, the new figures are included
   in its translation pass.)*

---

### User Story 4 - The raised bar is recorded in governance (Priority: P3)

The curriculum owner amends the constitution with a figure-density clause under Article III and
bumps the governance version. The content style guide's quantity rule and diagram-conventions
section are rewritten and its `version` field is bumped, which by existing rule re-freezes the
terminology bank. The style guide's twin reference inside the `author-unit` skill is updated in
the same change. The Article VI.1 obligation to bring the golden unit (EFMP-301 Unit 1) to the
new version is recorded in the backlog as the immediate-next content task.

**Why this priority**: Without the governance record the gate change is an unexplained tightening
and the golden-unit follow-up is lost. It is P3 only because it does not itself block a unit from
being authored once the gate and skills are in place.

**Independent Test**: Read the constitution and confirm a new Article III sub-point states the
per-topic and per-unit figure minimums, the amendment history and governance version are
updated, and the review-gate table references the density check. Read the style guide and confirm
the rule text, the bumped `version`, and the matching skill reference. Read the backlog and
confirm the EFMP-301 Unit 1 follow-up entry.

**Acceptance Scenarios**:

1. **Given** the current constitution with no figure-count clause, **When** the amendment lands,
   **Then** Article III carries a figure-density sub-point, the amendment-history note and the
   governance `version` are updated, and Article VII's review-gate table names the density check.
2. **Given** the style guide at its current `version`, **When** the rule is rewritten, **Then**
   the quantity rule states "two-plus per topic file" and the schematic-per-unit rule, the
   `version` is bumped, and the `author-unit` skill's copy of the standard matches.
3. **Given** the terminology bank frozen against the old style-guide `version`, **When** the
   `version` bumps, **Then** the freeze coupling is honoured (the bank is re-attested against the
   new version) with no unintended term changes.
4. **Given** the backlog, **When** the amendment lands, **Then** it carries an entry naming
   EFMP-301 Unit 1 as the golden-unit re-proof owed under Article VI.1.

---

### Edge Cases

- **A topic with two figures of the same archetype** (e.g. two tables): satisfies the per-topic
  count of two. Archetype diversity is enforced only at unit level.
- **An illustration (pictorial) carrier**: counts toward the per-topic minimum of two, but does
  not satisfy the per-unit concept-map / flowchart / timeline requirement.
- **A single-topic unit**: still needs two-plus carriers in that one topic, and at least one of
  them must be a concept map, flowchart, or timeline.
- **Non-topic files** (`index.mdx`, `unit-assessment.mdx`, `unit-teacher-notes.mdx`,
  `course-review.mdx`): no figure minimum, matching the scope of the current one-figure rule.
- **A unit mid-migration** whose manifest predates the archetype column: the gate must give a
  clear "add an archetype to each row" failure, not a crash.
- **A `translation_status: reviewed` unit gaining a new figure**: the Urdu mirror must gain the
  matching `<Figure>` and translated-label variant before the gate passes, exactly as Spec 009
  already requires for the first figure.
- **Coming-soon unit stubs**: excluded, as they are from every other content gate.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The content pipeline MUST require every `topic-*.mdx` in a new-shape unit to carry
  at least two figure carriers (a `{/* FIGURE[...] */}` marker or a rendered `<Figure>` element),
  raising the current floor of one.
- **FR-002**: The content pipeline MUST require every new-shape unit to carry at least one figure
  whose archetype is a concept map, a flowchart, or a timeline.
- **FR-003**: Every figure MUST be classified by exactly one archetype from a closed list:
  **table, concept-map, flowchart, timeline, diagram** (other schematic), **illustration**
  (pictorial). The classification MUST be recorded on the figure manifest and be discoverable by
  the gate.
- **FR-004**: The figures gate MUST fail, with a message naming the offending file or unit and
  the unmet rule, when FR-001, FR-002, or FR-003 is violated; and MUST pass when all three hold
  (alongside the existing marker/manifest consistency, ID-format, alt-text, asset-existence, and
  bilingual checks, which are unchanged).
- **FR-005**: The visual-density checks MUST apply only to new-shape units (a unit folder with at
  least one `topic-*.mdx`); legacy five-file units MUST be skipped exactly as the current
  one-figure rule skips them.
- **FR-006**: The gate change MUST ship with fixture-based tests covering: a passing unit, a
  per-topic shortfall, a missing schematic archetype, a blank/unknown archetype, and a skipped
  legacy unit.
- **FR-007**: The constitution MUST gain a figure-density clause under Article III stating FR-001
  and FR-002, with the amendment-history note updated, the governance `version` bumped, and
  Article VII's review-gate table referencing the density check.
- **FR-008**: The content style guide MUST rewrite its figure-quantity rule and
  diagram-conventions text to state FR-001, FR-002, and FR-003, and MUST bump its `version`
  field; the terminology-bank freeze coupling to that `version` MUST be honoured.
- **FR-009**: The `author-unit` skill and its embedded copy of the unit-structure standard MUST
  be updated to instruct planning two to three archetype-tagged figures per topic and at least
  one concept map / flowchart / timeline per unit; the two copies MUST stay in sync in the same
  change.
- **FR-010**: The `generate-figures` skill MUST record an archetype on each manifest row it
  advances and MUST map the six archetypes onto its existing render routes (schematic archetypes
  → hand-authored SVG; illustration → the raster route).
- **FR-011**: The per-course content-spec "Figure plan" section MUST be able to express two or
  more figure IDs per topic, each with an archetype, and the emitted manifest MUST have one
  `prompt-only` row per ID.
- **FR-012**: EFMP-302 Unit 1 MUST be retrofitted to satisfy FR-001 and FR-002 in both locales,
  with its figure manifest updated and every content gate (`check:figures`, `check:depth-gate`,
  `validate:content`, `check:no-em-dash`, `check:pipeline-gate`, unit tests, and the production
  build for both locales) passing.
- **FR-013**: The backlog MUST record that EFMP-301 Unit 1 (the golden unit) is owed a re-proof
  to the new standard version as the immediate-next content task under Article VI.1; that
  re-authoring is NOT performed in this feature.
- **FR-014**: No new runtime or build dependency may be introduced; figures remain hand-authored
  SVG for schematics and budget-limited WebP for illustrations, per Spec 009.
- **FR-015**: The zero-em-dash rule and all existing accessibility rules (descriptive alt text,
  no colour-only meaning, RTL-correct Urdu labels) MUST hold for every new figure.

### Key Entities

- **Figure archetype**: a single-valued classification of a figure, drawn from the closed list
  {table, concept-map, flowchart, timeline, diagram, illustration}. "Schematic archetypes" =
  {concept-map, flowchart, timeline, diagram}; the per-unit rule (FR-002) is satisfied only by
  {concept-map, flowchart, timeline}.
- **Figure carrier**: an unrendered `{/* FIGURE[...] */}` marker or a rendered `<Figure>`
  element in a `topic-*.mdx` file. The per-topic count (FR-001) is a count of carriers.
- **Figure manifest**: the per-unit `specs/content/<course>/figures/unit-NN.md` record, one row
  per figure, extended so each row declares an archetype.
- **New-shape unit**: a unit folder containing at least one `topic-*.mdx`; the only scope of the
  visual-density checks.
- **Proving unit / golden unit**: EFMP-302 Unit 1 is the proving unit for this standard version;
  EFMP-301 Unit 1 is the golden unit owed a follow-up re-proof (Article VI.1).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of new-shape unit topic pages show at least two distinct figures.
- **SC-002**: 100% of new-shape units contain at least one concept map, flowchart, or timeline.
- **SC-003**: 100% of figure-density violations are caught before merge by the gate, each with a
  message that names the file or unit and the unmet rule.
- **SC-004**: Every figure across all new-shape units declares a valid archetype; zero blank or
  unknown archetype values pass the gate.
- **SC-005**: EFMP-302 Unit 1 meets the standard in both English and Urdu with every content gate
  green, and its topic pages carry on average at least two figures per topic (up from one).
- **SC-006**: An author following the updated skill produces a unit that passes the figures gate
  on the first run with no rework for figure count or archetype.
- **SC-007**: The raised bar is discoverable in the constitution (Article III clause + bumped
  governance version) and the style guide (rewritten rule + bumped `version`), and the golden-unit
  follow-up is recorded in the backlog.

## Assumptions

- The per-topic minimum of two applies only to `topic-*.mdx` files in new-shape units; non-topic
  files and legacy five-file units are out of scope, matching the current one-figure rule.
- Besides EFMP-302 Unit 1 and coming-soon stubs, no authored new-shape units exist yet, so there
  is no retroactive backfill beyond the proving unit.
- Two carriers of the same archetype satisfy the per-topic count; archetype diversity is a
  unit-level rule only.
- The archetype list is closed at six values for this version; adding a value is a future
  style-guide `version` bump.
- The `generate-figures` render routes are sufficient for all six archetypes (Spec 009's SVG
  archetypes already include comparison table, relationship diagram, concept map, flow/timeline).
- The governance version bump is a minor amendment (a new sub-point, no article removed or
  reversed).

## Dependencies

- **Spec 008** - per-topic unit layout, figure markers, the per-unit manifest, the depth gate.
- **Spec 009** - the `<Figure>` component, the render pipeline, translated-label SVG variants,
  the manifest lifecycle.
- **Spec 006** - the style-guide `version` field as the shared freeze marker for the style guide
  and the terminology bank.
- **Constitution** - Article III (content standards), Article VI.1 (standard versioning: proving
  unit + golden-unit re-proof), Article VII (review-gate table).
- **EFMP-302 Unit 1 Urdu re-translation** (separate work stream) - the retrofit's new figures
  must be mirrored into the Urdu locale; the two efforts coordinate on ordering.

## Out of Scope

- Bringing EFMP-301 Unit 1 (or any unit other than EFMP-302 Unit 1) to the new standard - that
  is the queued Article VI.1 follow-up.
- Rendering additional figures for EFMP-302 Units 2–6 or any other course.
- Any change to how illustrations are generated or optimised (Spec 009 owns that).
- A maximum figure count, or a per-unit total requirement beyond FR-001 and FR-002.
- Changes to the reader-facing rendering of figures beyond carrying the archetype through.
- The student and teacher dashboard redesign (Spec 011).
