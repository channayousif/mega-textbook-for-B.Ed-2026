# Validation record: Feature 015

## US1 - one definition of where content lives *(complete, 2026-09-13)*

T001-T020 plus T017a. Phases 1-3 of tasks.md.

### FR-009: byte-identical degree-corpus results

Baseline captured to `baseline/` before any edit (T001), compared after the port (T019):

| Gate | Result |
|---|---|
| `validate:content` | IDENTICAL |
| `check:pipeline-gate` | IDENTICAL |
| `check:depth-gate` | IDENTICAL |
| `check:figures` | IDENTICAL |
| `check:no-em-dash` | IDENTICAL |
| `check:no-answer-keys` | IDENTICAL |
| `check:docs-sync` | IDENTICAL |

`static/content-index.json` and `static/content-status.json` also compared as parsed JSON and are
identical (the latter excluding its `generated_at` timestamp). **FR-009: PASS.**

### Success criterion 5

| Pattern | Occurrences in `scripts/` |
|---|---|
| grouping-directory regex | 1, in `lib/content-roots.mjs` |
| `join(UR_BASE, ...)` | 0 outside the library |
| hardcoded `['docs', ...]` root array | 0 |

**PASS.** No gate carries its own idea of where content lives, whether it walks units or scans trees.

### Suite

`check:content` 7/7 · `npm test` 219 passed across 18 files (up from 206; 13 new walker tests) ·
`test:review` 21/21.

## Findings during implementation

**1. A ninth consumer, in neither plan.md nor tasks.md.** `scripts/report-content-status.mjs`
carries its own `^semester-\d+$` walk and would have under-reported licence content in the status
report. Found by T020's grep rather than by reading, ported as T017a. The plan's survey counted six
walker-based consumers and two pattern gates; it missed this one because it is a soft CI step
(`|| echo ::warning::`) listed in `CI_ONLY` rather than in `FULL_GATES`.

**2. The walker contract under-specified course-level access.** It exposed units only, but
`build-content-index` emits `course-review.mdx` records, `validate-content` runs category, overview
and bilingual checks per course, and `report-content-status` aggregates per course. Each would have
kept its own grouping walk, defeating success criterion 5. `walkCourses` was added and `walkUnits`
rebuilt on top of it; the contract is updated.

**3. Ordering was incidental, now deliberate.** The prior walks relied on `readdirSync` order with
no sort. Measured before porting: that order already equals sorted order everywhere in `docs/`, so
the contract's sort is a no-op for the current corpus. Byte-identical output is preserved *and* the
walk is now deterministic rather than filesystem-dependent.

## US2 - the licence track exists, renders and is gated *(complete, 2026-09-13)*

T021-T033, plus T042's cleanup run early.

### FR-013: a third track costs one entry

A `cpd` track was registered with a content root that does not exist. All seven gates passed, and
`git diff --name-only` showed **no file but `content-roots.mjs` needed editing**. The entry was
then removed. FR-013 is falsifiable and holds.

### Success criterion 2: every gate sees and judges licence content

Two gates initially skipped the probe for reasons that apply equally to degree units - no
content-spec means the depth gate skips, no topic files means the figure gate skips. A topic file
and a minimal content-spec were added so both were genuinely exercised. All six then reported:

| Gate | Reported, for the right reason |
|---|---|
| `validate:content` | invalid course-overview front-matter |
| `check:depth-gate` | topic files present but no `### Topic list` |
| `check:figures` | 0 figure carriers, Constitution III.10 requires 2 |
| `check:pipeline-gate` | content-spec not approved |
| `check:no-em-dash` | `U+2014 EM DASH` at an exact line and column |
| `check:no-answer-keys` | `answer_key:` front-matter key |

The last two matter most: they prove FR-014's fix. Without `CONTENT_ROOTS`, a licence unit
containing an answer key would have passed.

### Success criteria 3 and 4

`resolveUnit` reaches the licence track and returns `ordinal: null` with `urUnitDir` under
`docusaurus-plugin-content-docs-licence`, never the default tree. `inputManifest` built for both
tracks (70 licence inputs, 116 degree). Both locales rendered, the `ur` route serving English by
Docusaurus fallback as Spec 001 FR-003 specifies. The offline search index carries 12 `/licence/`
references in each locale.

### FR-008 / R3

The degree sidebar contains no reference to `licence`; the track has `hasOrdinal: false` so nothing
can ask it for a semester; its only navigation is a navbar entry.

## Findings during US2

**4. A track-ordering regression, caught by a test.** Rebuilding `walkUnits` on `walkCourses`
during US1 silently dropped the track-order comparator. Nothing noticed until the licence track
existed, because a single track cannot expose it: the licence track's empty `trackDir` sorted
ahead of `semester-1`. The comparator is restored and the ordering is now asserted.

**5. `"Licence track"` is not a valid course-overview category.** `validate:content` rejected the
probe's `category: "Licence track"` against the schema enum. US3's T032 must widen
`contracts/course-overview.schema.json` before `EED-313` can be catalogued with that category.

**6. FR-009's baseline diverges once the track exists, correctly.** `check:no-em-dash` now reports
`scanned: docs, licence, guides, ...`. Findings are unchanged; only the scan list grew. This is why
the tasks carried an explicit constraint that T021 must not precede T019.

## Not yet done

US2 (T021-T033) and US3 (T034-T042), then Polish (T043-T046). The licence track does not exist
yet; nothing user-visible has changed.
