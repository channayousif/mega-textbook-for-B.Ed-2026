# Feature 016: Concept graph and style guide v4.0

**Status**: Scoped 2026-09-13, awaiting owner approval.
**Decision**: Roadmap locked decision 8 (owner, 2026-09-13) - "style guide advances to v4.0 with
the concept-graph layer", recorded against advice with three binding mitigations.
**Blocks**: every unit authored after it, including `EED-313` (4 units) and `EFMP-408` (6 units),
which are both specified and deliberately unwritten pending this feature and the freeze.

## Why

The corpus records which sub-topics a unit covers (`coverage/unit-NN.md`), what it is grounded in
(`sources/unit-NN.md`) and what it shows (`figures/unit-NN.md`). It does not record **what a
learner must understand, in what order**. Without that there is no prerequisite structure, so
nothing downstream can recommend a next step, diagnose a gap, or explain why it recommended
anything - the adaptive layer the repositioning plan describes has no substrate.

This feature adds that substrate as a fourth governance table, and then the standard freezes.

## Scope

Add the concept layer, the gate that enforces it, and the schema widening that must happen in the
same pass. Retrofit the two authored units. Freeze the standard.

## Requirements

- FR-001: Each unit gains `specs/content/<course>/concepts/unit-NN.md`, a governance table in the
  same idiom as `coverage/`, `sources/` and `figures/`: one row per concept, with
  `| Concept ID | Label EN | Label UR | Prerequisites | Topic | SLO refs | Assessment item IDs |`.
- FR-001a: `Label UR` is filled for every concept (owner decision, 2026-09-13). Labels come from
  `specs/content/terminology.csv` wherever a concept matches an approved term, so the bank stays the
  single source for bilingual vocabulary; labels with no bank entry are authored and **flagged for
  the G5 reviewer**, because a governance file is not published prose and never passes the parity
  gate, so nothing else would catch a bad one.
- FR-002: Concept IDs follow the existing reference idiom - `CON:<COURSE>-<unit>-<n>`, e.g.
  `CON:EFMP-301-1-3` - matching how `SLO:` refs are already formed.
- FR-003: **The layer is additive.** It must not change any `##` or `###` heading in any
  `topic-*.mdx`, so `checkParity` in `validate-content.mjs` stays green and **`EFMP-302` Unit 1
  keeps `translation_status: reviewed`**. If that flips to `draft`, the design has failed and the
  second unit must not be touched until it is reconsidered.
- FR-004: Assessment item IDs are **derived, not authored**. `unit-assessment.mdx` already numbers
  its items 1-10, 1-10 and 1-5 beneath three named `###` headings, so `MCQ-01 … MCQ-10`,
  `RRQ-01 … RRQ-10` and `ERQ-01 … ERQ-05` are addressable from what is already on the page. **No
  prose is touched at all**, which makes FR-003 trivially true rather than merely intended.
  The gate parses the existing structure and fails if a unit's item counts do not match the
  10/10/5 blueprint, which is what keeps the derived IDs stable.
- FR-005: A new gate `scripts/check-concept-graph.mjs` enforces: every checklist sub-topic reaches
  at least one concept; no orphan concept (one that no topic file covers); no prerequisite cycle;
  every prerequisite resolves to a real concept ID; every assessment item ID in a row exists in the
  unit's `unit-assessment.mdx`.
- FR-006: The gate registers in `scripts/lib/gates.mjs` `CONTENT_GATES`, so `check:docs-sync`
  propagates it into the skill files and `check:all` runs it.
- FR-007: `.claude/skills/author-unit/SKILL.md` gains a concept-table step, and its emitted
  artefact list grows from three governance files to four.
- FR-008: **Deferred** (owner decision, 2026-09-13). The patterns stay
  `^[A-Z]{2,4}-[0-9]{3}(--)?$`-shaped, which correctly validates every code in the B.Ed scheme and
  the licence track today. The roadmap's reason to widen was SSC/HSC fit, but that scheme is not in
  the repository, so widening would trade real typo-catching for a guess at a format nobody has
  seen. Recorded in `specs/backlog.md` to be done when an SSC/HSC scheme exists - which is also
  when the cheapest-moment argument actually applies.
- FR-009: `specs/content/style-guide.md` advances to `version: "4.0"` with a matching changelog
  entry, which `check:docs-sync`'s freeze-marker check already enforces.
- FR-010: Constitution Art. VI.1 re-proof, in order: `EFMP-302` Unit 1 (the proving unit), then
  `EFMP-301` Unit 1 (the golden unit). Both keep their existing translation status.
- FR-011: **This is the last standard revision before the freeze.** The roadmap's Phase 5 freeze
  begins when this lands; further standard improvements go to `specs/backlog.md` and are applied in
  one batch once 50 units exist.

## Success criteria

1. `npm run check:all` is green before and after, and `EFMP-302` Unit 1's front matter still reads
   `translation_status: reviewed`. This is FR-003's falsifiable form and the feature's main risk.
2. A deliberately broken concept table fails `check:concept-graph` for the right reason in each of
   its five checks - uncovered sub-topic, orphan concept, prerequisite cycle, dangling
   prerequisite, missing assessment item.
3. Both retrofitted units carry a complete `concepts/unit-01.md` whose prerequisite edges form a
   directed acyclic graph.
4. `npm run check:content` runs eight gates, not seven, and the skill files name the new one
   without hand-editing, via `check:docs-sync`.
5. The style guide reads `version: "4.0"` with a `**v4.0**` changelog entry.

## Out of scope

No adaptive behaviour, no learner model, no database. The concept graph is a governed file layer
only; nothing reads it at runtime in this feature. No new unit prose at all - FR-004 derives item IDs from existing structure. No
Urdu re-translation - FR-003 exists precisely so none is needed. No KSoR dependency: the
repositioning plan's advice to borrow the patterns and not take the dependency stands.

## Risks

- **Touching two reviewed units is the whole risk.** `EFMP-301` U1 has been authored three times
  already and its G5 is still open; `EFMP-302` U1 holds the only `reviewed` Urdu mirror in the
  repository. Mitigation: FR-003 is a success criterion, and the proving unit is retrofitted before
  the golden one so a failure is caught on the less costly of the two.
- **Concept granularity has no objective test.** Too coarse and the graph says nothing; too fine
  and every unit becomes a hundred rows nobody maintains. Mitigation: the two retrofits set the
  precedent, and the style guide records the rule they establish rather than inventing one first.
- **A ninth standard revision before the first sale.** Recorded and overruled by the owner in the
  roadmap; FR-011 is the counterweight that makes it the last.

## Resolved before implementation

1. **Schema widening** - deferred (FR-008). The target format is unknown until an SSC/HSC scheme
   exists, and widening to a guess costs real validation for speculative fit.
2. **Urdu concept labels** - filled for every concept (FR-001a), drawn from `terminology.csv` where
   a term exists and flagged for G5 review where authored.

### Found while scoping

**Assessment item IDs need no prose change.** The plan and the roadmap both assumed FR-004 would
touch `unit-assessment.mdx` to add stable IDs, described as "the one place prose is touched".
Reading the file shows the items are already numbered under three named headings, so the IDs are
derivable from existing structure. FR-004 is rewritten accordingly: **zero prose touch**, which
turns FR-003 from an intention into a property of the design.
