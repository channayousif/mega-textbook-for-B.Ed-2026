# ADR-0020: Licence content tier

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Proposed
- **Date:** 2026-09-13
- **Feature:** 015-licence-content-tree
- **Context:** `specs/content/licence-blueprint.md` established that the Sindh Teaching Licence test assesses Classroom Management, which the 2026 scheme restructured away with no successor. `EED-313` therefore has content to write and no course in the degree corpus to hold it. Folding it into an unrelated degree course was rejected by the owner on 2026-09-13 because it records a false fact about the approved programme.

Nothing can be authored outside `docs/semester-N/` today, and not by design. Five gate scripts plus `review-evidence.mjs` each independently re-derive the same rule: walk `docs/` for `^semester-\d+$`, thread a numeric semester through the check function, then rebuild the Urdu path as `semester-${semester}` under a hardcoded `UR_BASE`. Nobody chose "one content hierarchy" as an architecture; it became load-bearing because six places copied it. A directory that is not a semester is invisible to all of them.

This decision fixes where non-degree content lives, what its URL is, and how the catalogue describes it. Following ADR-0009's own reasoning, it is not reversible without a URL and navigation restructuring once candidates have bookmarked or been taught a location.

<!-- Significance checklist (ALL must be true to justify this ADR)
     1) Impact: Long-term consequence for architecture/platform/security?
     2) Alternatives: Multiple viable options considered with tradeoffs?
     3) Scope: Cross-cutting concern (not an isolated detail)?
     If any are false, prefer capturing as a PHR note instead of an ADR. -->

## Decision

Introduce **content tiers** as a first-class concept, and add a `licence` tier as the second one. Five components, adopted together:

- **Shared walker** - `scripts/lib/content-roots.mjs` becomes the single definition of where content lives, yielding `{ tier, tierDir, courseFolder, courseCode, unitNo, unitDir, urUnitDir, ordinal }`. All six consumers port to it. The semester regex and the `UR_BASE` join then appear exactly once in the repository.
- **Urdu path derived from the plugin id, never assumed.** A tier's `urBase` comes from its Docusaurus plugin instance id, because Docusaurus names translation directories that way; `i18n/ur/docusaurus-plugin-content-docs-guides/` already exists as proof. The default `UR_BASE` would otherwise pass a licence unit that has no Urdu mirror at all.
- **Licence tier as a third docs-plugin instance**, `id: licence`, `routeBasePath: /licence`, content root `licence/`, own `sidebars-licence.ts`, joined to `docsRouteBasePath` for offline search. This follows ADR-0009 rather than inventing a pattern.
- **Additive catalogue key** - `tracks[]` beside `semesters[]` in `catalog/courses.json`, same course shape, read through a new `allCourses()` helper so "every course" is the default way to ask.
- **Article V.4 made checkable** - `check-add-course.mjs` gains a throwaway licence course alongside its throwaway semester course, so the "adding a course is content-only" guarantee is proven for the new tier rather than assumed.

The licence tier does **not** appear in degree navigation. It has its own sidebar, a navbar entry and search indexing; Article X-bis discoverability is met without implying the course belongs to the approved programme.

<!-- For technology stacks, list all components:
     - Framework: Next.js 14 (App Router)
     - Styling: Tailwind CSS v3
     - Deployment: Vercel
     - State Management: React Context (start simple)
-->

## Consequences

### Positive

- **Licence content becomes possible at all.** `EED-313` is the only STEDA Part II area with no degree host, and it carries two sampled CRQ items.
- **Six duplicated derivations become one.** This is a net simplification: the feature removes more path logic than it adds, in the same way Spec 013 collapsed four divergent gate-command lists into one.
- **The duplication that caused the problem cannot recur.** A future tier is a config entry plus a content folder, which is why the route could safely be named `/licence/` rather than a defensive generic.
- **The degree corpus is provably unaffected.** FR-009 makes byte-identical gate findings on `docs/` the acceptance test, and the phased ordering ports the walker before any licence directory exists so the comparison cannot be confounded.
- **A whole class of silent bilingual failure is closed** by deriving `urBase` from the plugin id.

<!-- Example: Integrated tooling, excellent DX, fast deploys, strong TypeScript support -->

### Negative

- **Every content gate is touched at once.** Mitigated by FR-009's byte-identical acceptance test and by landing before v4.0 so the two changes do not interleave in the same files, but the blast radius is real.
- **A second docs instance can merge silently into the first if its `id` is omitted** - a failure mode Spec 004's quickstart already records. The rendered-route success criterion is the guard.
- **The additive catalogue key admits a missed consumer**, one that should show licence courses and silently shows only degree courses. `allCourses()` reduces this to a type-level question rather than removing it.
- **Two content hierarchies is more surface than one.** Every future content feature must ask which tiers it applies to, and a tier without an ordinal must never be asked for a semester number.
- **`/licence/` is a Sindh-specific name.** A future credential track in another province would want its own tier rather than sharing this one.

<!-- Example: Vendor lock-in to Vercel, framework coupling, learning curve -->

## Alternatives Considered

**Alternative A - pseudo-semester.** Place licence content under an unused `docs/semester-0/` or `semester-9/`. Zero platform change; every gate works immediately.
*Rejected*: it records a false fact about the degree programme in the catalogue, the URL and the sidebar, and Article V.4 would be satisfied only by accident. It is the same objection that ruled out folding `EED-313` into a degree course, applied to directories instead of courses.

**Alternative B - fold into an existing 2026 course.** Add the four units to `EFMP-305` Inclusive Education or `EFMP-302`. No new tier, no new course, no infrastructure.
*Rejected by the owner, 2026-09-13*: the content-spec would match neither course guide, and it misrepresents the approved scheme.

**Alternative C - a separate Docusaurus site for licence content.** Complete isolation of the two corpora.
*Rejected*: it forks i18n, offline search, deployment and the gate set for one course, and cross-linking between a licence module and the degree units that overlap it becomes a cross-origin problem.

**Alternative D - flat catalogue with a `tier` field per course**, instead of an additive `tracks[]`. One list, no missed-consumer class of bug.
*Rejected*: a breaking catalogue migration in the same change as a six-script refactor makes FR-009 unfalsifiable, since a degree-corpus regression could originate in either. Worth revisiting once the walker has settled.

**Alternative E - a generic route, `/exam/` or `/track/`.** Accommodates future credential tracks without a URL change.
*Rejected*: `/exam/` would group this corpus with a future SSC/HSC one that shares neither authority (HEC guides versus the DCAR school curriculum) nor audience, and the blueprint's Part I finding shows those corpora do not overlap. `/track/` is meaningless to a reader, working against Article X-bis. The tier abstraction makes adding a third tier cheap, so the usual future-proofing argument does not apply.

<!-- Group alternatives by cluster:
     Alternative Stack A: Remix + styled-components + Cloudflare
     Alternative Stack B: Vite + vanilla CSS + AWS Amplify
     Why rejected: Less integrated, more setup complexity
-->

## References

- Feature Spec: [specs/015-licence-content-tree/spec.md](../../specs/015-licence-content-tree/spec.md)
- Implementation Plan: [specs/015-licence-content-tree/plan.md](../../specs/015-licence-content-tree/plan.md) · [research.md](../../specs/015-licence-content-tree/research.md) · [contracts/content-roots.md](../../specs/015-licence-content-tree/contracts/content-roots.md)
- Related ADRs: [ADR-0009](0009-separate-docusaurus-docs-instance-for-usage-guides.md) - the precedent this follows; a second docs-plugin instance for `guides/`. **Extended, not superseded.**
  - [ADR-0002](0002-content-platform-architecture-and-hosting.md) - its **Navigation** bullet ("fully autogenerated Semester → Course → Unit sidebar") is **partially superseded**: that shape still governs the degree corpus, but it is no longer the only content hierarchy. Its Framework, Content substrate and Search bullets stand.
  - [ADR-0004](0004-content-integrity-build-gate-and-data-driven-catalog.md) - **extended**: the validator walks tiers rather than `docs/**` directly, and `catalog/courses.json` gains `tracks[]`. The contract-and-gate posture is unchanged.
- Evaluator Evidence: [history/prompts/015-licence-content-tree/0002-plan-licence-content-tree.plan.prompt.md](../prompts/015-licence-content-tree/0002-plan-licence-content-tree.plan.prompt.md) <!-- link to eval notes/PHR showing graders and outcomes -->
