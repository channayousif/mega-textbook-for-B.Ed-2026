# ADR-0014: Self-Assessment Checklist - Position-Keyed DOM Hydration, No New Component

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-09-05
- **Feature:** 010-curriculum-owner-console
- **Context:** Spec 008 already authors a `## Self-assessment checklist` section on every
  per-topic `topic-NN.mdx` file - a plain GFM task list (`- [ ] statement`) that Docusaurus
  renders as disabled `<input type="checkbox">` elements. Spec 010 User Story 1 asks for this to
  become a live, persisted record: a signed-in student ticks/unticks items and the state survives
  reloads, sessions, and devices, while a signed-out visitor's ticks persist locally with a
  sign-in hint. Critically, FR-008 requires this without changing **how the checklist is written
  in topic source** - no new front-matter field, no new MDX import, and the existing
  `check-unit-depth.mjs` structural gate must keep passing byte-for-byte unchanged. This repo's
  most recent precedent for "turn static content into something richer," ADR-0012 (Spec 009's
  `<Figure>` component), solved a superficially similar problem by having the author **import a
  component into the source file** and replacing a comment marker with it. That approach is not
  available here: FR-008 explicitly rules out touching topic source at all, so a genuinely
  different mechanism was needed - one that works identically across the English and Urdu routes,
  where the checklist's own heading text is translated.

<!-- Significance checklist (ALL true):
     1) Impact - establishes a new interaction pattern in this codebase (hydrate already-rendered,
        already-authored markdown client-side by structural position) that future features
        wanting to add interactivity to existing content sections, without an author-facing
        source change, will look to as precedent or deliberately diverge from.
     2) Alternatives - an MDX component the author imports (the ADR-0012 <Figure> pattern); a
        remark/build-time transform; heading-text/id-based lookup vs. positional lookup.
     3) Scope - cross-cutting: the swizzled DocItem/Content.tsx affects every topic page's render
        path, the merge-on-sign-in behavior touches AuthContext's sign-in flow, and the Progress
        area's roll-up depends on a per-topic count sourced from the same content this hydration
        reads. -->

## Decision

Adopt, as **one integrated hydration mechanism**, the following four components. They ship
together in Spec 010, are motivated by the same "make it interactive without touching source"
constraint, and would be revised together.

### 1. A theme swizzle (`DocItem/Content.tsx`), not an author-imported component

`src/theme/DocItem/Content.tsx` wraps `@theme-original/DocItem/Content` and, after the page
mounts, hydrates the checklist's already-rendered DOM in place. The topic file's Markdown is
byte-for-byte what Spec 008 already specifies; nothing is imported, nothing is added to front
matter. This is the opposite of ADR-0012's `<Figure>` pattern (a component the author places in
source) - deliberately, since FR-008 forbids the source edit that pattern requires.

### 2. Locate the section by structural position, never by heading text or a new marker

The component reads `useDoc().toc`, filters to the nine `##` cycle headings (contract:
`topic-cycle.md`), and takes the **6th** entry - "Self-assessment checklist" is always part 6 of
9 by the Spec 008 cycle contract, regardless of what that heading's text says. This is what makes
the mechanism locale-proof for free: the Urdu page's translated heading ("خود جانچ کی فہرست") sits
in the same 6th position, so no id or text match is ever needed. If the page does not have exactly
nine `##` headings (a legacy unit, or a topic file not yet matching the cycle contract), the
component renders the original content unmodified - degrading to today's non-interactive but
fully spec-compliant read, never erroring.

### 3. Item identity is position, not text; a wording change unticks, it never crashes

Once the target `<ul>` is found, each `<li>`'s 1-based index in document order is that item's
`item_position` - the natural key `self_assessment_checks` upserts against
(`(student_id, course_code, unit_no, topic_no, locale, item_position)`). The item's own text is
stored only as a normalized `item_text_snapshot`, compared on every load: a mismatch (an author
edited the wording) renders the item unticked without touching the stored row, leaving the
student's other ticks on the same topic untouched. A reordering or removal of items is handled
identically, by design - Spec 008's own EN/UR parity guarantee means position alignment across
locales is already assured elsewhere in the pipeline.

### 4. Signed-out state lives in `localStorage`, keyed identically, merged once on first sign-in

A signed-out visitor's ticks are stored under `localStorage['sa:<course>:<unit>:<topic>:<locale>:
<position>']` - the same five-part key shape the account-backed table uses. On the browser's
first sign-in for that account (gated by a `sa-merged:<profileId>` flag), every local key whose
tuple has no existing account row is upserted once; after that, `localStorage` is never consulted
again for that account. This is a client-side operation with no new table and no server-side merge
logic.

## Consequences

### Positive

- **Zero content-source churn.** Every topic file authored under Spec 008 - already-shipped units
  and future ones alike - becomes interactive with no re-authoring pass, no migration script over
  Markdown, and no risk of a bad find-and-replace touching hundreds of checklist sections.
- **Locale-proof by construction.** Because the lookup is positional, not textual, the mechanism
  needs no Urdu-specific branch, no translated-id table, and does not break if a future topic's
  Urdu heading translation changes wording.
- **Degrades safely, never destructively.** A topic file that doesn't match the nine-heading
  precondition (today: any legacy unit) simply keeps its current, fully correct non-interactive
  render - there is no failure mode where the page breaks or shows wrong data.
- **No new dependency, no build-time transform.** The entire mechanism is a `useEffect` DOM walk
  over already-rendered markup; nothing is added to the Docusaurus MDX pipeline or the bundle
  beyond the swizzle itself.
- **The merge-on-sign-in behavior is a pure client-side batch operation** - one gated upsert pass,
  no new table, no server logic, matching the shape of the account merge the clarification
  session (2026-09-05) specified exactly.

### Negative

- **Silent degradation is also a risk, not only a safety net.** If a future topic file's headings
  drift from the exact nine-heading cycle contract (a typo, a reordering, a missing heading) for a
  unit that should otherwise be interactive, the checklist simply stops hydrating with no visible
  error to the author. Mitigation: `check-unit-depth.mjs`'s existing nine-heading-order check
  (contract: `topic-cycle.md`) already fails loudly in CI for exactly this drift, independent of
  this feature - the hydration's silence and the gate's loudness are two sides of the same
  precondition.
- **A DOM-structure assumption about Docusaurus's own GFM rendering** (a checklist section renders
  as heading -> `<ul>` -> `<li>` with a disabled checkbox) is now load-bearing. A future
  Docusaurus/remark-gfm upgrade that changes this output shape would silently break hydration
  without failing any existing content gate. Mitigation: `tests/e2e/self-assessment-checklist.spec.ts`
  exercises the real rendered DOM, not a mock, so a rendering-shape regression fails that suite.
- **Position-keying cannot distinguish "item edited" from "item reordered."** Both read as
  "position N's text no longer matches its snapshot" and both resolve identically (render
  unticked). Accepted: Spec 008's EN/UR parity and the depth gate's heading/order enforcement make
  an uncoordinated reorder unlikely in practice, and the spec's own edge case treats the two cases
  the same way.
- **This is a second interactivity pattern in the codebase**, alongside ADR-0012's
  component-import pattern - a future engineer must know which one applies where (content the
  author places explicitly, like a figure, vs. content whose source format is frozen, like this
  checklist). Mitigation: this ADR and `contracts/self-assessment-hydration.md` document the
  distinction explicitly, and the FR-008 constraint that forces the choice is itself the
  discriminator.

### Related, lighter decision: self-assessment stays independent of unit coverage

Self-assessment completion (this table) and unit-coverage/"studied" tracking
(Spec 004's `unit_progress`) are deliberately two separate signals - ticking every checklist item
across a unit only ever shows a non-blocking prompt to mark it studied (FR-005); it never writes
to `unit_progress` itself. Spec 010's own Out of Scope section already names "auto-syncing
self-assessment completion into the unit-coverage record" as a distinct future change with its own
decision record when and if it is ever proposed - so this ADR records the current, narrower
decision (keep them separate now) as context rather than as a fifth numbered component of the
Decision section above; it does not introduce a new schema, trigger, or reachable code path beyond
what components 1-4 already establish, and Spec 005's own precedent (computing teacher-facing
unit coverage independently of `unit_progress`, never granted its own ADR) treats this same kind
of "deliberately kept separate" call as plan-documented, not ADR-worthy, on its own.

## Alternatives Considered

- **An author-imported `<SelfAssessmentChecklist>` MDX component**, mirroring ADR-0012's
  `<Figure>` pattern exactly. Rejected outright: it requires editing every topic file to add the
  import and wrap the section, which is precisely what FR-008 forbids - and would re-touch every
  already-shipped Spec 008 unit a second time for no content reason.
  - **Pros**: consistent with the one existing "make static content interactive" precedent in
    this codebase; explicit, discoverable in source.
  - **Cons**: fails FR-008 outright; forces a re-authoring pass across every existing and future
    topic file; couples the checklist's presence to the author remembering to add the component.
- **A remark/MDX build-time transform** that rewrites the checklist section into an interactive
  form at build time. Rejected: still needs the same position-based targeting this ADR's
  client-side approach uses (no build-time signal distinguishes "this is the checklist" any more
  than a client-side DOM walk does), adds a new build dependency and a new point of MDX-pipeline
  coupling, and is harder to reason about for the signed-out/localStorage and merge-on-sign-in
  behavior, which are inherently client-side runtime concerns.
  - **Pros**: could pre-render checkbox state server-side for a signed-in SSR request (not
    applicable here - this is a static Docusaurus build with no per-request server render).
  - **Cons**: new build-time dependency; no simpler than the client-side walk for the actual hard
    part (locating the section); doesn't help with the signed-out/local-merge behavior at all.
- **Heading-text or `id`-based lookup** (e.g. matching the literal English heading text, or a
  hardcoded slugger-derived id like `self-assessment-checklist`). Rejected: breaks on the Urdu
  route, where the heading's rendered text - and therefore its Docusaurus-generated anchor id -
  differs from the English page. Positional lookup (the 6th of nine fixed cycle headings) works
  identically in both locales with no translation table to maintain.
  - **Pros**: simpler code, no dependency on the nine-heading-count precondition.
  - **Cons**: locale-fragile by construction; would need a maintained EN/UR heading-text or
    id-mapping table that could silently drift out of sync with actual authored content.

## References

- Feature Spec: [specs/010-curriculum-owner-console/spec.md](../../specs/010-curriculum-owner-console/spec.md)
  (User Story 1, FR-001 to FR-009)
- Implementation Plan: [specs/010-curriculum-owner-console/plan.md](../../specs/010-curriculum-owner-console/plan.md)
  (Complexity Tracking - the position-based targeting entry; Risks - the silent-degradation risk)
- Research: [specs/010-curriculum-owner-console/research.md](../../specs/010-curriculum-owner-console/research.md)
  (R1 - hydration without source change; R2 - locale-proof heading lookup; R3 - position identity
  and the wording-snapshot rule; R4 - the signed-out merge; R5 - the shared per-topic count)
- Data Model: [specs/010-curriculum-owner-console/data-model.md](../../specs/010-curriculum-owner-console/data-model.md)
  (`self_assessment_checks` table, RLS, the immutable-identity guard trigger)
- Contracts: [self-assessment-hydration.md](../../specs/010-curriculum-owner-console/contracts/self-assessment-hydration.md)
  (the exact DOM-hydration mechanism)
- Related ADRs: [ADR-0012](0012-figure-rendering-component-manifest-lifecycle-and-the-generate-figures-skill.md)
  (the component-import interactivity pattern this ADR deliberately does not follow, and why),
  [ADR-0011](0011-nested-per-topic-unit-pedagogy-bounded-answer-keys-and-figure-markers.md)
  (establishes the nine-part topic cycle and the `## Self-assessment checklist` section this
  feature hydrates, unchanged)
- Evaluator Evidence: [history/prompts/010-curriculum-owner-console/0003-plan-curriculum-owner-console.plan.prompt.md](../prompts/010-curriculum-owner-console/0003-plan-curriculum-owner-console.plan.prompt.md),
  [0005-apply-analyze-remediation-edits.misc.prompt.md](../prompts/010-curriculum-owner-console/0005-apply-analyze-remediation-edits.misc.prompt.md)
  (the `/sp.analyze` pass that added the FR-009 wording-change and `ur`/RTL test coverage this
  mechanism's design depends on)
