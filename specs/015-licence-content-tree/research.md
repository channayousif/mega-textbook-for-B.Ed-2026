# Phase 0 Research: Licence content tree

Resolves the three NEEDS CLARIFICATION items carried by `spec.md`. Each records a decision, its
rationale, and the alternatives weighed.

## R1 - Catalogue track key

**Decision**: add a `tracks` array beside `semesters` in `catalog/courses.json`, sharing the
existing course shape. Introduce `allCourses(catalog)` in `src/lib/catalog.ts` and have every
consumer call it instead of iterating `catalog.semesters` directly.

**Rationale**: `Catalog` is currently `{ _note?, semesters: CatalogSemester[] }`, read by
`src/lib/catalog.ts`, `src/lib/courseOptions.ts`, `scripts/scaffold-catalog.mjs` and three
dashboard pages. An additive key leaves all of them valid, which is what makes FR-009's
"byte-identical degree results" provable rather than asserted. The known weakness of an additive
key is a consumer that should see licence courses and silently does not; `allCourses()` removes
that by making "every course" the default way to ask, so a missed consumer fails visibly at the
type level rather than quietly returning degree courses only.

**Alternatives considered**:

- *Flat `courses: []` with a `track` field per course.* One list, no missed-consumer class of bug.
  Rejected: it is a breaking migration of the catalogue file and all six consumers at once, in the
  same change that refactors five gate scripts. Two simultaneous migrations make FR-009
  unfalsifiable, because a degree-corpus regression could originate in either.
- *A second catalogue file, `catalog/licence.json`.* Clean separation. Rejected: two files have to
  be kept in step by convention, and `build-content-index.mjs` copies the catalogue verbatim to
  `static/` for the console, so a second file doubles that plumbing for no gain.

## R2 - Route name

**Decision**: `/licence/`, with the plugin instance id `licence` and content root `licence/`.

**Rationale**: it is honest about what is actually there. `specs/content/licence-blueprint.md`
establishes that the first and only planned occupant is content aligned to the Sindh Teaching
Licence syllabus, whose authority is the HEC pre-service guides. ADR-0009 set the precedent of
naming an instance for what it holds (`/guides`) rather than for a category it might one day hold.

The usual argument for a generic name is future cost, and the track abstraction removes it. Once
FR-001's walker exists, adding a third track is a config entry plus a content folder, not a
restructure. Being specific now therefore costs nothing later.

A future SSC or HSC exam track would in any case want its own track rather than sharing this one:
its authority is the DCAR school curriculum, not the HEC guides, and the licence blueprint's Part
I finding shows those corpora do not overlap.

**Alternatives considered**:

- *`/exam/`.* Generic and still meaningful to a candidate. Rejected: it would group the licence
  corpus with a future school-curriculum corpus that shares neither authority nor audience, and
  URL changes are not reversible once candidates have bookmarked or been taught a location
  (ADR-0009's own stated context).
- *`/track/`.* Fully generic. Rejected: meaningless to the reader, which works against Article
  X-bis discoverability.

## R3 - Licence track in degree navigation

**Decision**: no. The licence track gets its own sidebar (`sidebars-licence.ts`) and a navbar
entry, and is indexed by offline search through `docsRouteBasePath`. It does not appear in the
semester sidebar.

**Rationale**: placing a course that is not in the approved 2026 scheme inside semester navigation
misrepresents the degree programme. That is the same objection that led the owner to reject
folding `EED-313` into an unrelated degree course on 2026-09-13, and it applies identically to
navigation. Article X-bis's discoverability requirement is satisfied by search plus an explicit
navbar entry; it does not require presence in every sidebar.

Cross-linking is the right connective tissue: `specs/content/licence-blueprint.md` already maps
STEDA objectives to degree courses, and degree units whose topics overlap the licence syllabus can
link to the licence module directly.

**Alternatives considered**:

- *Show it in the semester sidebar under a "Licence track" heading.* Maximum discoverability for a
  student already browsing the degree. Rejected: it implies the course is part of the programme.
- *Hide it from navigation entirely, search-only.* Rejected: fails Article X-bis for a reader who
  does not already know the module exists.

## R4 - Article V.4 and the add-course gate

**Not a spec question, but a constitution gate that must be answered before implementation.**

**Finding**: `check-add-course.mjs` captures `git status --porcelain` on `src`,
`docusaurus.config.ts`, `sidebars.ts` and `tsconfig.json` before and after adding a throwaway
course, and compares. It asserts that *adding a course* changes no platform code; it does not
assert that a feature branch leaves those files untouched. Feature 015 therefore does not trip it,
in CI or locally.

**Decision**: satisfy Article V.4 in substance, not just by the gate passing. Extend
`check-add-course.mjs` to add a throwaway licence course as well as a throwaway semester course,
so the "adding a course is content-only" guarantee provably holds for the new track. Without this,
015 would leave a track whose second course might silently require platform edits.

**Alternatives considered**:

- *Leave the gate as is.* Rejected: it would pass while proving nothing about the track this
  feature exists to add, which is precisely the one-directional-assertion failure mode Spec 013's
  docs-sync check was rewritten to close.
