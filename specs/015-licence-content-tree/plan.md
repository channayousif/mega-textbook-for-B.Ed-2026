# Implementation Plan: Licence content tree

**Branch**: `015-licence-content-tree` | **Date**: 2026-09-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/015-licence-content-tree/spec.md`

## Summary

Make the content pipeline able to host more than one content tier, then add a `licence` tier so
`EED-313` Classroom Management has somewhere to live. The work is a behaviour-preserving refactor
first and a feature second: five gate scripts plus the review-evidence manifest each re-derive the
same rule (walk `docs/` for `^semester-\d+$`, thread a numeric semester, rebuild the Urdu path
under a hardcoded `UR_BASE`), and that duplication is the only reason a non-semester directory is
invisible. One shared walker replaces all six derivations; the licence tier then follows ADR-0009's
second-docs-instance pattern.

## Technical Context

**Language/Version**: TypeScript 5.6 on Node 22+; gate scripts are plain Node ESM (`.mjs`)
**Primary Dependencies**: Docusaurus 3.10 (`@docusaurus/plugin-content-docs`), `@easyops-cn/docusaurus-search-local`, `gray-matter`, `ajv` - **no new dependency**
**Storage**: Filesystem / Git only - no database; the licence tier is content and Article V.1 keeps content in version control
**Testing**: `vitest` for unit fixtures, `node --test` for the review-evidence suite, the seven
content gates as the integration surface, Playwright for the rendered route
**Target Platform**: static site, two locales, self-hosted
**Project Type**: single project - content pipeline plus a Docusaurus site
**Performance Goals**: no regression in gate runtime; the walker runs once per gate instead of each
gate walking `docs/` independently, so runtime should fall slightly
**Constraints**: FR-009 requires byte-identical gate findings on the degree corpus; Article V.5's
bundle budget forbids shipping a heavier client for this
**Scale/Scope**: 2 tiers, 6 consuming scripts, 6 catalogue consumers, 1 new plugin instance,
1 new sidebar, 1 new Urdu tree. No unit prose.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Article | Requirement | Verdict |
|---|---|---|
| II - Guiding document supremacy | No invented curriculum authority | **PASS** - the tier hosts content sourced from HEC guides; this feature adds no content |
| III - Content quality | Standards unchanged | **PASS** - no style-guide change, no gate relaxed; licence units face the same gates |
| IV - SDD law | Approved spec and plan precede implementation | **PASS** - this plan; spec at PR #46 awaiting approval |
| V.1 - Content and application separate | Content stays in Git | **PASS** - `licence/` is a content folder, no database |
| **V.4 - One course = one content module** | Adding a course must not change platform code | **CONDITIONAL** - see Complexity Tracking |
| V.5 - Offline-tolerant, bundle budget | No heavier client | **PASS** - one more docs instance, no runtime code added |
| VI - Scope discipline | No style-guide bump, no golden-unit change | **PASS** - explicitly out of scope |
| VII - Review gates | Gate ladder unchanged | **PASS** - licence units enter at G0 like any course |
| X-bis - Discoverability | Content must be findable | **PASS** - R3: own sidebar, navbar entry, and search indexing |

Post-Phase-1 re-check: unchanged. The design adds no constitution tension beyond V.4 below.

## Project Structure

### Documentation (this feature)

```text
specs/015-licence-content-tree/
├── plan.md              # This file
├── research.md          # Phase 0 - R1 catalogue key, R2 route, R3 navigation, R4 Article V.4
├── data-model.md        # Phase 1 - tier, track, unit record
├── quickstart.md        # Phase 1 - how to add a licence course
├── contracts/
│   └── content-roots.md # Phase 1 - the walker's contract
└── tasks.md             # Phase 2 (/sp.tasks - NOT created here)
```

### Source Code (repository root)

```text
scripts/
├── lib/
│   ├── content-roots.mjs        # NEW - the single walker (FR-001)
│   └── review-evidence.mjs      # MODIFIED - inputManifest resolves via the walker (FR-003)
├── validate-content.mjs         # MODIFIED - consume the walker (FR-002)
├── check-unit-depth.mjs         # MODIFIED
├── check-figures.mjs            # MODIFIED
├── check-pipeline-gate.mjs      # MODIFIED
├── build-content-index.mjs      # MODIFIED
└── check-add-course.mjs         # MODIFIED - also prove a licence course is content-only (R4)

src/lib/
└── catalog.ts                   # MODIFIED - CatalogTrack type + allCourses() (R1)

licence/                         # NEW - the tier's content root
└── eed-313/                     # catalogued only; no units authored by this feature

i18n/ur/docusaurus-plugin-content-docs-licence/current/   # NEW - the tier's Urdu mirror

docusaurus.config.ts             # MODIFIED - third docs instance, docsRouteBasePath (FR-005)
sidebars-licence.ts              # NEW
catalog/courses.json             # MODIFIED - tracks[] beside semesters[] (R1)
```

**Structure Decision**: single project. The licence tier is a sibling content root to `docs/`,
mirroring how `guides/` already sits beside it under ADR-0009, rather than a subdirectory of
`docs/` (which would keep it inside the semester walker's scope and defeat the separation) or a
separate site (which would fork i18n, search and deployment for one course).

## Phase 0 - Research

Complete. See [research.md](./research.md). Resolved: catalogue key is an additive `tracks` array
with a shared `allCourses()` reader; route is `/licence/`; the tier stays out of degree navigation;
and Article V.4 is satisfied in substance by extending the add-course gate, not merely by it
passing.

## Phase 1 - Design & Contracts

Complete. [data-model.md](./data-model.md) defines the tier, track and unit-record entities.
[contracts/content-roots.md](./contracts/content-roots.md) fixes the walker's surface, which is the
one interface all six consumers depend on. [quickstart.md](./quickstart.md) is the
add-a-licence-course walkthrough that R4's extended gate asserts.

No API contracts: this feature adds no endpoint. The walker's module signature is the contract.

## Phase 2 - Task planning approach

`/sp.tasks` should order tasks so the refactor is proven before the tier exists:

1. **Walker first, no behaviour change.** Write `content-roots.mjs` with the semester tier only.
   Port all six consumers. FR-009's acceptance - identical findings on `docs/` - is testable at
   this point, and nothing licence-related has been introduced to confound it.
2. **Tier plumbing.** Add the `licence` tier to the walker, the plugin instance, the sidebar, the
   catalogue key and `allCourses()`.
3. **Prove it.** Scaffold a throwaway licence unit, confirm all four content gates see it and fail
   it correctly when broken, then extend `check-add-course.mjs` per R4.
4. **Catalogue `EED-313`** and delete the scaffold.

Anything that authors prose belongs to a later feature, after v4.0 and the freeze.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Article V.4: this feature changes `src/`, `docusaurus.config.ts` and `sidebars.ts` | V.4 governs adding a **course**, not adding a **tier**. A tier is a one-time platform change that restores V.4 for every course placed in it thereafter. R4 makes this checkable rather than asserted: `check-add-course.mjs` gains a throwaway licence course, so if adding a second licence course ever needed platform code, the gate fails | Placing licence content under a pseudo-semester needs no platform change, but records a false fact about the degree programme in the catalogue, the URL and the sidebar - the same objection that ruled out folding `EED-313` into an unrelated course. Folding it into `EFMP-305` was likewise rejected by the owner on 2026-09-13 |
