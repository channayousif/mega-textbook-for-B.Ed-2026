# ADR-0017: Visual-density Standard and Figure Archetype Taxonomy

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together.

- **Status:** Accepted
- **Date:** 2026-09-08
- **Feature:** 012-visual-density-standard
- **Context:** Spec 008 (ADR-0011) gave units a per-topic layout, `{/* FIGURE[...] */}` markers,
  and a per-unit manifest; Spec 009 (ADR-0012) turned markers into `<Figure>` images in both
  locales and gave the manifest a `Kind` column (`diagram | illustration`) and a
  `prompt-only → generated → placed` lifecycle. The **quantity** rule stopped at a floor of one:
  `specs/content/style-guide.md` says "at least one figure per `topic-*.mdx`",
  `scripts/check-figures.mjs` enforces exactly that, and the `author-unit` skill tells authors to
  plan one figure per topic. Nothing distinguishes a comparison table from a concept map, and
  nothing requires the schematic aids (flow, sequence, relationship webs, timelines) that carry
  the most teaching load. On the page, a B.Ed trainee in Sindh reads long prose with a single
  table or triangle per topic. The owner's instruction ("more diagrams, concept maps, flow charts
  or timelines within the topics ... reinforce the content pipeline") and the AskUserQuestion
  decisions (2026-09-08: hard enforcement, its own spec, retrofit EFMP-302 Unit 1) set the
  direction. Constraints: no new runtime/build dependency (Spec 009 keeps SVG + WebP);
  `check:figures` stays byte-for-byte green for legacy five-file units and coming-soon stubs;
  Art. III.8 accessibility holds for every figure; the `style-guide.md` `version` bump re-freezes
  `terminology.csv` as a pair (Spec 006 FR-007); and Art. VI.1 requires a proving unit now plus a
  golden-unit (EFMP-301 Unit 1) re-proof queued.

<!-- Significance checklist (ALL true):
     1) Impact - a new non-negotiable content requirement (constitution Art. III.10, governance
        2.7.0 -> 2.8.0), a rewritten CI gate with a per-unit pass, a widened manifest vocabulary,
        a <Figure> prop-type change, and edits to two authoring skills - the bar every future
        unit is authored and gated against.
     2) Alternatives - soft style-guide nudge vs hard gate; widen the Kind enum vs a new
        Archetype column; >=2/topic vs a higher minimum or a per-unit total; archetype-blind
        count vs enforced per-topic diversity.
     3) Scope - cross-cutting: the constitution, the content style guide + terminology freeze,
        the figures gate + manifest library + its tests, the reader-facing <Figure> component,
        and the author-unit / generate-figures skills. -->

## Decision

Adopt, as **one standard**, the following four decisions. They ship together in Spec 012, serve
the same goal (a guaranteed visual floor that authors and CI both enforce), and would be revised
together.

### D1 - Raise the gate floor: >= 2 figures per topic, >= 1 schematic per unit

`scripts/check-figures.mjs` changes from "**>= 1** figure carrier per `topic-*.mdx`" to "**>= 2**",
and gains a new **per-unit** pass: the unit MUST carry **>= 1 figure whose archetype is
`concept-map`, `flowchart`, or `timeline`**. Failures name the offending file or unit and the
unmet rule. All existing checks (ID format/uniqueness, non-empty prompt + alt, marker <-> manifest
set equality, `Topic` match, `placed` asset existence, the `reviewed`-bilingual `.ur.svg` branch)
are unchanged. The rule is written into the constitution as **Article III.10** (governance
`2.7.0 -> 2.8.0`, MINOR) and into `specs/content/style-guide.md` (`version 3.2 -> 3.3`).

### D2 - A closed six-value archetype taxonomy, stored by widening the manifest `Kind` enum

Every figure is classified by exactly one archetype:
`table | concept-map | flowchart | timeline | diagram | illustration`. This is stored by
**replacing the `Kind` enum** in `scripts/lib/figure-manifest.mjs` (`{diagram, illustration}` ->
the six values) - **not** by adding a new `Archetype` column. `diagram` (generic schematic) and
`illustration` (pictorial) remain valid values, so existing Spec 009 v2 manifest rows still parse;
the v2 seven-column header is unchanged; the manifest contract gets a v3 note recording that the
`Kind` vocabulary widened from two to six. `<Figure>`'s `kind` prop union widens to match, with
`.figure--*` classes for the new values.

### D3 - The per-topic count is an archetype-blind carrier count

Two carriers of the **same** archetype (e.g. two tables) satisfy the per-topic minimum of two.
Archetype diversity is enforced **only** at unit level (D1's `>= 1` schematic rule). This keeps
the per-topic check a plain `>= 2`.

### D4 - Scope guard unchanged from the existing one-figure rule

The visual-density checks apply **only** to new-shape units (a folder with >= 1 `topic-*.mdx`).
`index.mdx`, `unit-assessment.mdx`, `unit-teacher-notes.mdx`, and `course-review.mdx` carry no
figure minimum. Legacy five-file units and coming-soon stubs are skipped, exactly as the current
one-figure rule skips them.

### Proving unit + follow-up

EFMP-302 Unit 1 is retrofitted to the new standard (four figures -> at least eight, at least one
timeline, both locales, all gates green) as the Art. VI.1 proving unit. The EFMP-301 Unit 1
golden re-proof to `version 3.3` is recorded in `specs/backlog.md` as the immediate-next content
task and is **not** performed in this feature.

## Consequences

### Positive

- Every new-shape topic page gets a guaranteed second visual, and every unit gets at least one
  process/relationship/sequence schematic - the aids that do the most teaching work - instead of
  leaving density to author discretion.
- CI catches a thin unit before merge, with a message that names the file and the shortfall;
  authors get the standard where they work (style guide + `author-unit` skill), so a conforming
  unit is the default output, not a rework cycle.
- Widening `Kind` rather than adding a column keeps the manifest-library diff to one enum,
  preserves the v2 header, and keeps existing rows parseable; `<Figure kind>` maps 1:1.
- No new dependency; figures stay hand-authored SVG (schematics) + budget WebP (illustrations);
  Art. V.5's image-excluded first-load budget is unaffected.
- The archetype is now a first-class, queryable property of every figure - useful for future
  reporting, print layout, and the content-status console.

### Negative

- A higher bar for every future unit and a one-time retrofit cost for EFMP-302 Unit 1 (roughly
  doubles its figure count and its SVG-authoring effort), plus the queued EFMP-301 Unit 1 re-proof.
- A hard gate can block a merge on a missing archetype tag or a second figure that an author
  considers unnecessary; the `>= 2` and the schematic rule are judgement calls encoded as a floor.
- Reclassifying figures into six archetypes is a manual pass; `diagram` stays a valid catch-all,
  so an author can under-specify (mark a concept map as `diagram`) and pass the per-topic count
  while failing the per-unit rule until corrected.
- The `style-guide.md` `version` bump re-freezes `terminology.csv`; an accidental term drift in
  the same branch would fail `check:pipeline-gate` (mitigated by re-attesting with a zero-diff CSV).
- Constitution churn: a fourth Article III amendment in three governance versions (III.9 at
  v2.7.0, III.1/III.3/III.6 at v2.6.0, now III.10 at v2.8.0).

## Alternatives Considered

- **Soft style-guide-only nudge** (update `author-unit` + `style-guide.md` prose to "plan 2-3
  figures per topic", no gate change). Rejected: figure density stayed at author discretion - the
  exact status quo the owner asked to fix - and nothing would have forced the EFMP-302 Unit 1
  retrofit. The owner explicitly chose hard enforcement.
- **A separate `Archetype` manifest column** (eight-wide v3 header, `Kind` kept as
  `diagram|illustration`). Rejected: larger parser surface in `figure-manifest.mjs`, two fields
  that can disagree (`Kind: illustration` + `Archetype: timeline`), and a migration touch on every
  existing row. Widening the single `Kind` enum is the smaller, back-compatible change.
- **A higher per-topic minimum (3) or a per-unit total (e.g. ">= 8 figures/unit")**. Rejected: not
  evidenced as needed; `>= 2` per topic plus one schematic per unit already roughly doubles
  current density, and a blunt per-unit total would penalise a legitimately short two-topic unit.
- **Enforce per-topic archetype diversity** (each topic must have >= 2 *different* archetypes).
  Rejected: over-constrains topics that are genuinely best served by, say, two tables; the
  teaching-value case is a unit-level "at least one schematic", not a per-topic quota.
- **A new constitution article** rather than an Article III sub-point. Rejected: this is a content
  quality standard, squarely Article III's subject; III.8-III.10 now form the accessibility /
  punctuation / visual-density triad.

## References

- Feature Spec: `specs/012-visual-density-standard/spec.md`
- Implementation Plan: `specs/012-visual-density-standard/plan.md` (Key design decisions D1-D4)
- Related ADRs: ADR-0011 (nested per-topic unit pedagogy, figure markers - built on), ADR-0012
  (figure rendering component, manifest lifecycle, `Kind` column - widened here). No conflict:
  this ADR extends both.
- Constitution: Article III.10 (new, v2.8.0), Article VI.1 (proving unit + golden re-proof),
  Article VII (review-gate table).
- Evaluator Evidence: `history/prompts/012-visual-density-standard/0003-adr-visual-density-standard.misc.prompt.md`
