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

## Not yet done

US2 (T021-T033) and US3 (T034-T042), then Polish (T043-T046). The licence track does not exist
yet; nothing user-visible has changed.
