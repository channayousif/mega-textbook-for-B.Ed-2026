# ADR-0027: Unit-scoped evidence binding

- **Status:** Accepted
- **Date:** 2026-09-20
- **Scope:** `manifestRoots`, `bound` and `normalized` in `scripts/lib/review-evidence.mjs`.
- **Constitution:** none. Article VII.4's freshness rule is unchanged; this ADR changes *what a
  unit's evidence is bound to*, not *whether a change to a bound input revokes acceptance*.

## Context

A unit's review evidence binds a manifest of input digests. Any change to a bound input
invalidates the acceptance that rested on it (Art. VII.4). That is correct and load-bearing.

The bound set was too wide in two ways, and both scaled badly.

**A course's units invalidated each other.** `manifestRoots` bound the whole
`specs/content/<code>/` tree. Of EFMP-302 Unit 3's 145 bound paths, 40 were under that tree and
24 belonged to *sibling units* - their coverage, sources, figure and concept tables. So authoring
unit 6 invalidated the accepted evidence of units 1 to 5. At six units that was an irritation and
was visible in the gate output as `EFMP-302 Unit 2 ... G2 en-draft: stale or incomplete input
manifest`. At ninety units it means a course's units can never be finished independently: the
last unit authored is the only one whose evidence is current.

**Routine edits invalidated the whole repository.** `.claude/skills/review-unit` was bound as a
directory, so editing the **G5** rubric invalidated every **G3** manifest. That is not
hypothetical; it happened during EFMP-302, and the gate still reported `reviewer skill changed`
days later. `.claude/agents` bound the evaluator alongside the two reviewers. `terminology.csv`
was bound at every stage although `CRITERIA.G3` has no terminology criterion, so banking one Urdu
term would have invalidated ~90 English units for a criterion their reviews never evaluated.

## Decision

**Bind what this unit is, not what its course contains.**

A three-way partition over paths under `specs/content/<code>/`. The middle case is the one that
keeps the narrowing honest:

1. **A path naming a unit binds to that unit only.** Derived from the name (`coverage/unit-03.md`,
   `figures/unit-03.md`, and any per-unit artefact type added later), so new conventions are
   scoped automatically rather than needing enumeration.
2. **A path under the course directory naming no unit stays bound to every unit.** This is the
   anti-escape-hatch. Prose cannot hide from a manifest by living somewhere unenumerated; it can
   only hide by being named after a different unit, which is visible and checkable.
3. **`sources/texts/<key>.md` binds to a unit iff that unit cites `<key>`.** The depth gate
   already enforces coverage/sources consistency, so the derivation is sound. Without this,
   authoring unit 6 adds four or five excerpts and re-invalidates units 1 to 5 anyway.

**The shared `content-spec.md` is sliced, not unbound.** `normalized()` already establishes the
precedent of an exact, narrow, documented projection (the `translation_status` lifecycle line).
A second case replaces *other* units' `## Unit K` sections with a placeholder. Editing the
preamble, reading list, week schedule or course review plan still invalidates every unit,
correctly. Editing `## Unit 6` invalidates unit 6 alone.

**If the unit's own `## Unit N` heading is not found, the whole file is bound, unsliced.** Not
hypothetical: `specs/content/efmp-301/content-spec.md` has no such heading. **Unknown structure
must fail toward binding more, never less.**

Corpus-wide inputs are narrowed to what the stage actually depends on: the skill and *this
stage's* rubric (exactly `skillDigest`'s set), *this stage's* reviewer agent, and
`terminology.csv` for G4/G5 only. The style guide, the constitution and `contracts/` stay bound
whole and freshness-bearing: they are the standard the content is judged against, so an amendment
re-opening the corpus is Article VI.1 working, not a bug.

Measured: EFMP-302 Unit 3 goes from **145 bound paths to 112**.

## Alternatives considered

- **Unbind the course directory entirely and bind only the unit's own files.** Simplest, and
  rejected: the shared `content-spec.md` legitimately governs every unit, and an unbound course
  directory is exactly the escape hatch case 2 exists to prevent.
- **Enumerate the per-unit artefact types** (`coverage/`, `sources/`, `figures/`, `concepts/`)
  rather than deriving from the name. Rejected because the next artefact type would silently
  default to unscoped or unbound depending on how the list was written; deriving from the name
  fails safe either way.
- **Slice nothing and accept that a course's units freeze together.** Defensible at six units.
  Rejected at ninety, where it makes course-by-course delivery impossible.

## Consequences

### Positive

- A course's units can be authored, evidenced and published independently.
- A rubric edit invalidates only the stage it governs.
- Manifests are smaller and cheaper, which matters inside a fix-and-rerun loop.

### Negative

- **Every existing manifest on disk is invalidated by this change**, because
  `review-evidence.mjs` is itself inside the hashed review-entry closure. A re-evidence sweep is
  required, not optional.
- The bound set is now **derived rather than literal**, so "what is bound" takes reading a
  function instead of reading a list. The four boundary tests exist to make that inspectable.
- **A mutation suite cannot prove a narrowing safe.** The existing 27 tests pass unchanged, and
  that is necessary but not sufficient: they contain no fixture for the removed files, so they
  would pass equally if the binding were narrowed to nothing. Four boundary tests pin what must
  still invalidate and what must now stop.

## References

- ADR-0019 §3 (freshness and the exclusion rule), ADR-0026 (publication rests on G2 evidence,
  which makes manifest correctness a publication concern rather than only a review concern).
- `G-2026-12` and `G-2026-15`, the two earlier bundle defects found by running evaluators against
  their own inputs. This is the same class, found the same way.
