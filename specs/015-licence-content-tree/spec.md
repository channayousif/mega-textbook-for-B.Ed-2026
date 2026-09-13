# Feature 015: Licence content tree

**Status**: Scoped 2026-09-13, awaiting owner approval.
**Blocks**: `specs/content/eed-313/content-spec.md` (Classroom Management) and every licence-track
module after it.
**Precedent**: ADR-0009 (second docs-plugin instance for guides), Spec 013 (one shared definition
replacing per-script copies).

## Why

`specs/content/licence-blueprint.md` establishes that the Sindh Teaching Licence test assesses
Classroom Management, which the 2026 scheme restructured away. Licence-track content therefore has
no degree course to live in, and the owner chose (2026-09-13) a top-level licence tree over
folding it into an unrelated course.

Nothing can be authored there today. Every gate and the review-evidence manifest resolve content
by walking `docs/` for `^semester-\d+$`, thread a numeric `semester` through their check
functions, and rebuild the Urdu path as `` `semester-${semester}` `` under a hardcoded `UR_BASE`.
A directory that is not a semester is invisible to all of them.

## Scope

Make the content pipeline able to host more than one content track, then add the licence track.
Degree content keeps its paths, routes and behaviour unchanged.

## Clarifications

### Session 2026-09-13

- Q: Can the same `course_code` exist in two tracks, given `EFMP-408` is both a degree course and a licence-objective carrier? → A: No. Course codes are globally unique across all tracks; a duplicate is a gate failure.
- Q: "Track" for the catalogue key but "tier" for the code concept - which is canonical? → A: **Track**, everywhere; "tier" is dropped. Further tracks are anticipated (pre-service, CPD / in-service, licence), so the degree corpus is the `pre-service` track rather than a peer of `licence`.
- Q: `CourseOptionGroup` is semester-keyed but a licence course has no semester. How does the teacher course picker group an ordinal-free track? → A: Generalise the group to track-keyed, `{ trackId, label, ordinal: number | null, courses }`; `semester` becomes `ordinal`.

## Requirements

- FR-001: A shared content-root walker (`scripts/lib/content-roots.mjs`) yields every unit as
  `{ track, trackDir, courseFolder, courseCode, unitNo, unitDir, urUnitDir }`. It is the single
  definition of where content lives and what its Urdu mirror path is.
- FR-002: `validate-content.mjs`, `check-unit-depth.mjs`, `check-figures.mjs`,
  `check-pipeline-gate.mjs` and `build-content-index.mjs` consume FR-001's walker instead of each
  re-deriving the semester regex and `UR_BASE` join. Five copies become one.
- FR-003: `review-evidence.mjs`'s `inputManifest` resolves a unit through the same walker, so a
  licence unit can be prepared for review exactly as a degree unit is.
- FR-004: Two tracks ship: **`pre-service`** (`docs/semester-N/<course>/unit-NN/`, unchanged -
  the degree corpus, which groups by semester) and **`licence`**
  (`licence/<course>/unit-NN/`, no semester grouping). Semester grouping is a property of the
  pre-service track, not of the content model. The track vocabulary lives in code, not in prose.
- FR-013: The model must accommodate further tracks without another refactor. **CPD / in-service**
  is the anticipated next one (the Sindh licence requires five CPD credit hours for renewal).
  Adding it must be a `TRACKS` entry, a content root and a plugin instance - no change to the
  walker's contract or to any consumer.
- FR-005: The licence track renders as a third `@docusaurus/plugin-content-docs` instance with
  `id: 'licence'`, `routeBasePath: 'licence'` and `sidebars-licence.ts`, following ADR-0009.
  It joins `docsRouteBasePath` so offline search indexes it.
- FR-006: The licence track's Urdu mirror is
  `i18n/ur/docusaurus-plugin-content-docs-licence/current/<course>/unit-NN/`. Docusaurus derives
  that directory from the plugin id; the EN/UR structural parity gate must compare against it and
  not against the default instance's tree.
- FR-007: `catalog/courses.json` gains a sibling to `semesters` for track-scoped courses, with the
  same course shape (`code`, `title_en`, `title_ur`, `credit_hours`, `category`, `bilingual`).
  `src/lib/catalog.ts` and the teacher course picker read both without special-casing either.
- FR-012: `CourseOptionGroup` becomes track-keyed - `{ trackId, label, ordinal: number | null,
  courses }` - replacing its `semester: number` key, so a track without an ordinal cannot be asked
  for one. `src/pages/app/classes/index.tsx` and `src/pages/app/teacher/quiz-authoring.tsx`
  migrate to the new shape. The per-course `semester` field becomes `ordinal` for the same reason.
- FR-008: A licence course is exempt from semester-derived ordering and numbering. Nothing may
  require a licence course to declare a semester, and nothing may place it in semester navigation.
- FR-009: Every existing gate stays green on the degree corpus with byte-identical results. The
  refactor is behaviour-preserving for `docs/`; the only new behaviour is that a second track is
  now visible.
- FR-011: A `course_code` identifies exactly one course across all tracks. The same code must not
  appear in two tracks, and `check:pipeline-gate` fails on a duplicate. `resolveUnit(root, code,
  unitNo)` therefore needs no track argument, and CLI commands such as
  `review:evidence prepare EED-313 1 G3` stay unambiguous. Licence-relevant degree material is
  reached by cross-link, as `specs/content/licence-blueprint.md` already does, never by
  duplicating a course into a second track.
- FR-010: `EED-313` is catalogued in the licence track as the track's proving course, with
  `bilingual: true` and the Urdu mirror deferred (owner decision, 2026-09-13). No unit content is
  authored by this feature.

## Success criteria

1. `npm run check:all` is green before and after, with no change in findings on `docs/`.
2. A scaffolded `licence/eed-313/unit-01/` with a placeholder unit is seen by
   `validate:content`, `check:depth-gate`, `check:figures` and `check:pipeline-gate`, and fails
   each of them for the right reason when deliberately broken.
3. `review:evidence prepare EED-313 1 G3` produces a manifest, proving FR-003.
4. `/licence/eed-313/` renders in both locales and appears in offline search.
5. The semester regex and the hardcoded `UR_BASE` join appear exactly once in the repository.

## Out of scope

No unit prose, no Urdu translation, no v4.0 concept layer, no changes to degree-course routes or
URLs, no new gate. Authoring `EED-313` waits for v4.0 and the standard freeze
(owner decision, 2026-09-13).

## Risks

- **The refactor touches every content gate at once.** Mitigation: FR-009 makes byte-identical
  degree-corpus results the acceptance test, and the change lands before v4.0 so the two do not
  interleave in the same files.
- **A second docs instance can merge silently into the first if its `id` is omitted**, a failure
  mode Spec 004's quickstart already records. Mitigation: FR-005 names the id explicitly and
  success criterion 4 checks the rendered route.
- **Parity against the wrong Urdu tree.** FR-006 exists because the guides instance already uses
  `docusaurus-plugin-content-docs-guides`, so the default `UR_BASE` would silently pass a licence
  unit with no Urdu mirror at all.

## Resolved during planning

All three questions this spec originally carried were decided in Phase 0
([research.md](./research.md)) and are recorded in ADR-0020:

1. **Catalogue key** - an additive `tracks[]` beside `semesters[]`, read through `allCourses()`,
   rather than a flat list with a per-course field. R1.
2. **Route naming** - `/licence/`, following ADR-0009's precedent of naming an instance for what
   it holds. The track abstraction makes a later `/cpd/` cheap, so being specific costs nothing. R2.
3. **Degree navigation** - the licence track gets its own sidebar, a navbar entry and search
   indexing, but does not appear in the semester sidebar. R3.

A fourth question the spec had not asked was found and answered in R4: Article V.4 is satisfied in
substance by extending `check-add-course.mjs` to add a throwaway licence course, not merely by the
gate continuing to pass. `sidebars-licence.ts` joins that gate's guarded-path list, so adding a
licence course cannot silently edit the track's own sidebar.
