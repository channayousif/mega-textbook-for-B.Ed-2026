# Contract: `scripts/lib/content-roots.mjs`

The single definition of where content lives. Six consumers depend on this surface; no consumer may
re-derive a content path independently. Success criterion 5 is that the semester regex and the
hardcoded `UR_BASE` join appear exactly once in the repository, and this module is that once.

## Exports

### `TRACKS`

Frozen array of `ContentTrack` (see data-model.md). Order is stable and defines gate-report order.

### `walkUnits(root, options?) -> UnitRecord[]`

Every unit across every track, sorted by track order, then `trackDir`, then `courseFolder`, then
`unitNo`. `options.track` narrows to one track id.

- Returns `[]` for a track whose content root does not exist. A missing `licence/` is not an error;
  the track is simply unoccupied.
- Never throws for absent directories. Throws only on a malformed unit directory name, which is a
  real defect the gates should surface.

### `resolveUnit(root, courseCode, unitNo) -> UnitRecord`

Finds one unit by course and number across all tracks. Throws if it resolves to zero or more than
one directory. This is what `review-evidence.mjs`'s `inputManifest` calls, replacing its own
`readdirSync(docs).filter(/^semester-\d+$/)` (FR-003).

### `urPathFor(record, ...segments) -> string`

Joins under the record's track `urBase`. The only sanctioned way to build an Urdu path.

## Guarantees

1. **Behaviour-preserving for `docs/`.** For the pre-service track, `walkUnits` yields exactly the
   units the six current implementations yield, with identical `courseCode` casing and `unitNo`
   parsing. FR-009's acceptance test compares gate output before and after the port.
2. **Urdu paths are track-derived, never assumed.** No consumer may join `UR_BASE` itself.
3. **No ordinal leakage.** `ordinal` is `null` for tracks without one; a consumer that needs a
   semester number must handle `null` rather than coerce it.

## Consumers

`validate-content.mjs`, `check-unit-depth.mjs`, `check-figures.mjs`, `check-pipeline-gate.mjs`,
`build-content-index.mjs`, `lib/review-evidence.mjs`.

## Non-goals

Not a content reader: it yields paths, never front-matter or prose. Not a catalogue reader: course
metadata stays in `catalog/courses.json` behind `allCourses()`.
