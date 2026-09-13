# Contract: concept graph (`concepts/unit-NN.md`)

The fourth per-unit governance table, beside `coverage/`, `sources/` and `figures/`. It records
what a learner must understand and in what order; the other three record what a unit covers, what
it is grounded in, and what it shows.

## File

`specs/content/<course-lowercase>/concepts/unit-NN.md`. A prose header naming the unit and this
contract, then exactly one table.

## Table

| Column | Rule |
|---|---|
| `Concept ID` | `CON:<COURSE>-<unit>-<n>`, e.g. `CON:EFMP-302-1-3`. Unique in the unit. Stable once assigned. |
| `Label EN` | Short noun phrase, the thing to be understood. Not a sentence. |
| `Label UR` | Same, in Urdu. Drawn from `specs/content/terminology.csv` where the concept matches an approved term; authored and flagged for G5 review otherwise. |
| `Prerequisites` | Comma-separated `Concept ID`s, or `-`. Each must resolve to a concept in this unit. |
| `Topic` | The `### Topic list` topic label the concept belongs to, e.g. `1.2`. |
| `SLO refs` | One or more `SLO:` refs, matching the unit's front-matter `clo_refs` vocabulary. |
| `Assessment item IDs` | One or more derived item IDs, or `-`. |

## Derived assessment item IDs

Not authored into prose. `unit-assessment.mdx` already numbers its items beneath three named
headings, so the IDs are read from what is on the page:

| Heading | IDs |
|---|---|
| `### Multiple-choice questions (MCQs)` | `MCQ-01` … `MCQ-10` |
| `### Restricted-response questions (RRQs)` | `RRQ-01` … `RRQ-10` |
| `### Extended-response questions (ERQs)` | `ERQ-01` … `ERQ-05` |

The gate fails if a unit's counts do not match the Spec 008 10/10/5 blueprint, which is what keeps
the derived IDs stable: an item cannot be added or removed without the gate noticing.

## Gate: `scripts/check-concept-graph.mjs`

Five checks. Each names the unit and the offending ID.

1. **Coverage** - every `U<n>-NN` row in the unit's `### Sub-topic checklist` is reached by at least
   one concept, via that concept's `Topic` matching the sub-topic's assigned topic.
2. **No orphan concept** - every concept's `Topic` is a real topic in the `### Topic list`.
3. **Acyclic** - the `Prerequisites` edges form a DAG. A cycle is reported with the cycle path.
4. **Resolvable prerequisites** - every prerequisite ID exists in the same unit's table.
5. **Assessment linkage** - every item ID in a row exists in the derived set, and the unit's item
   counts match 10/10/5.

Runs only for units that have a `concepts/unit-NN.md`, so it is opt-in per unit exactly as the
Spec 008 per-topic layout was. A unit without the file is skipped, not failed - which is what lets
v4.0 land before the corpus is retrofitted.

## What this contract deliberately does not do

No heading is added, moved or renamed in any `topic-*.mdx` or `unit-assessment.mdx`. The parity
gate compares heading vectors, so leaving them untouched is what keeps `EFMP-302` Unit 1 at
`translation_status: reviewed` (spec FR-003). Nothing reads this layer at runtime; it is a governed
file, not a feature.
