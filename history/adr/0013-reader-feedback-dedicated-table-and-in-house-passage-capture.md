# ADR-0013: Reader Feedback - Dedicated Table and In-House Passage Capture

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-09-05
- **Feature:** 010-curriculum-owner-console
- **Context:** Spec 010 User Story 2 asks for a reader-facing feedback stream: any signed-in
  student or teacher flags a whole page or a specific passage on any of five Spec 008 page kinds
  (a topic file, the unit opening, the unit-assessment page, the optional unit-teacher-notes page,
  or a course-level review page), and the curriculum owner triages each item through
  open/planned/resolved/declined with the quoted passage visible in context. The codebase already
  has two feedback-shaped tables from Spec 005: `activity_feedback` (a teacher's 1-5 rating of one
  book activity, upsert-revisable, no lifecycle) and `improvement_suggestions` (a teacher-filed,
  admin-moderated, five-state stream with no passage concept at all). Neither shape fits: this
  feature's authors include students (Spec 005's two tables are teacher-only), its items are
  scoped to a specific selected passage with surrounding context for later re-location, and its
  lifecycle (four states plus a reopen edge) differs from both existing streams. Separately,
  passage capture itself needs a mechanism: the spec requires the exact selected text, enough
  context to find it again later, correct behavior across the English/Urdu right-to-left
  boundary, and a length cap - all without adding a new dependency (spec.md Assumptions: "No new
  third-party library is added for text selection/anchoring"). These two questions (how the data
  is shaped and stored; how the passage is captured client-side) are one design conversation - the
  capture mechanism's output (a quote plus before/after context, in logical reading order) is
  exactly what the table's `quoted_passage`/`passage_context` columns are built to hold, and both
  were decided together in the same planning pass (research.md R6-R8, R11).

<!-- Significance checklist (ALL true):
     1) Impact - a third distinct feedback table alongside two Spec 005 tables, a new
        author-role-stamping trigger and a four-state (plus reopen) status-transition guard
        trigger, and the reach rule (which page kinds get a feedback control) other engineers will
        extend when a sixth page kind is ever added.
     2) Alternatives - a shared polymorphic "feedback" table vs. three distinct tables; extending
        `improvement_suggestions` vs. a new table; a real annotation/range-anchoring library vs.
        `window.getSelection()` with a stored context window.
     3) Scope - cross-cutting: the data model, RLS/trigger design, the reader-facing capture
        control on five page kinds, and the owner's triage queue all follow from this decision. -->

## Decision

Adopt, as **one integrated reader-feedback subsystem**, the following four components. They ship
together in Spec 010, are motivated by the same goal (capture and triage reader feedback on
content), and would be revised together.

### 1. `content_feedback` - a new table, not a shared polymorphic table, not an extension of `improvement_suggestions`

A dedicated Postgres table (`data-model.md`) with its own `content_feedback_page_kind`/
`content_feedback_scope`/`content_feedback_status` enums, distinct from Spec 005's
`suggestion_category`/`suggestion_status`. Author is any reader (student or teacher), not
teacher-only; scope is `whole_page` or `passage`; a passage row carries `quoted_passage` (<=2,000
chars) and `passage_context` (<=2,000 chars, best-effort re-location material); status moves
`open -> {planned, resolved, declined}`, `planned -> {resolved, declined}`, and either terminal
state back to `open` (reopen) - a lifecycle shape neither existing table has.

### 2. Server-stamped identity and forced initial status, not client-trusted fields

`author_role` is never client-supplied: a `BEFORE INSERT` trigger,
`stamp_content_feedback_author_role()`, overwrites it unconditionally from the inserting user's
`profiles.role`. `status` can only be inserted as `'open'` (RLS `WITH CHECK`); every subsequent
transition is admin-only and further restricted by `enforce_content_feedback_status_transition()`
to the legal edges above plus a column-immutability rule (only `status`/`owner_note`/
`resolution_ref` may ever change). This mirrors Spec 005's
`enforce_suggestion_status_transition()` pattern, extended with the reopen edge this feature's
lifecycle needs.

### 3. `window.getSelection()` passage capture, no annotation library

On selecting text and choosing "give feedback on this passage," the control reads
`window.getSelection().toString()` (capped client-side at 2,000 characters), captures up to 100
characters of surrounding text as `passage_context`, and finds the nearest section via the same
`toc`-walking helper (`findNearestSectionAnchor`, extracted to `src/lib/docPosition.ts` so the
existing Spec 005 "Suggest improvement" control and this new control share one implementation).
`Selection.toString()` already returns text in logical reading order, not visual order, which
satisfies the edge case ("the stored quote is in reading order, not visual order") for Urdu
right-to-left content with zero extra handling.

### 4. Reach is exactly five page kinds, not every doc page

The feedback control renders only on a per-topic unit's `index.mdx` (unit opening),
`topic-NN.mdx` (topic), `unit-assessment.mdx`, `unit-teacher-notes.mdx`, and a course-level
`course-review.mdx` - the five kinds spec.md's own acceptance scenarios name by their Spec 008
filenames. A legacy five-file unit gets no reader-feedback control in this feature; only the
existing teacher-only "suggest improvement" control (Spec 005, unchanged) remains available
there.

## Consequences

### Positive

- **No accidental coupling between three different feedback shapes.** `activity_feedback`'s
  upsert-revisable rating, `improvement_suggestions`' teacher-only five-state moderation queue,
  and `content_feedback`'s any-reader four-state-plus-reopen passage stream each keep their own
  RLS predicate, their own enum, and their own guard trigger - no shared table with nullable
  columns for whichever shape doesn't apply, and no compromise status enum wide enough to be
  meaningless for any one stream.
- **A client can never forge who filed an item or fast-track its status.** The stamping and
  status-transition triggers make both guarantees at the database layer (Constitution Art. V.2/
  IX.2), not merely in the submission form's UI.
- **RTL correctness for free.** Using the browser's own `Selection` API means the stored quote is
  already in logical reading order for Urdu content - no bespoke bidi-aware text extraction was
  written or needs maintaining.
- **No new dependency.** `window.getSelection()` is a standard browser API; the whole capture
  mechanism adds zero bytes to the bundle beyond the feedback control's own markup.
- **The five-page-kind reach rule is a single, explicit list**, not an inferred "any page with
  `course_code` in front matter" rule - a future sixth page kind is an explicit, reviewable
  addition to that list, not a silent behavior change.

### Negative

- **Passage re-location is best-effort, not guaranteed.** A quote's surrounding context can go
  stale if the topic text changes materially; the owner still sees the original quote verbatim
  (the row is immutable after filing, per the guard trigger), but the "jump to it on the page"
  affordance can degrade to the nearest section. Accepted per spec.md's own edge case framing.
- **Three feedback-shaped tables now exist in the schema** (`activity_feedback`,
  `improvement_suggestions`, `content_feedback`), each with its own RLS/trigger surface to
  reason about and test. Mitigation: `contracts/console-operations.md`'s 16-item checklist and
  `tests/rls/content-feedback-*.test.mjs` isolate this table's guarantees from the other two, and
  none of the three tables' triggers reference another table.
- **The five-page-kind reach rule must be manually extended** if a future content shape (a sixth
  page kind) also wants reader feedback - there is no generic "any content page" fallback by
  design (research.md R6). A missed extension shows up as "no feedback control on this page,"
  a silent gap rather than a loud failure.
- **`passage_context`'s 100-character-each-side capture is a fixed heuristic**, not a proven
  re-location algorithm - a very short surrounding sentence or a passage spanning a figure/heading
  boundary can produce a weak context window. Accepted: an annotation library would solve this
  more robustly (see Alternatives) at a cost this feature's scope does not justify.

## Alternatives Considered

- **A shared polymorphic "feedback" table** covering `activity_feedback`,
  `improvement_suggestions`, and `content_feedback` as one table with a `kind` discriminator
  column. Rejected: the three streams' access rules, lifecycles, and required columns diverge
  enough that a single `USING` clause would need to express three different visibility rules, and
  a shared status enum would be too wide to mean anything precise for any one stream - exactly the
  coupling Spec 005 avoided when it kept `activity_feedback` and `improvement_suggestions`
  separate in the first place.
- **Extend `improvement_suggestions`** with a nullable `quoted_passage` column and admit students
  as filers. Rejected: `improvement_suggestions`' RLS and status graph are teacher-filed by
  design (Spec 005 FR-003); relaxing the author check to admit students would be an unreviewed
  change to an already-shipped, already-tested table, for a feature whose lifecycle also needs a
  reopen edge that table's guard trigger does not have.
- **A real annotation/range-anchoring library** (e.g. a `dom-anchor-text-quote`-style approach) for
  passage capture and re-location. Would re-locate a moved/edited passage more robustly than a
  fixed-width text-context heuristic. Rejected: adds the feature's first new client dependency for
  a best-effort guarantee the spec explicitly scopes down (spec.md: "Best-effort passage
  re-location built in-house rather than adopting an annotation library" is itself one of the
  four decisions spec.md flagged for this ADR), and the verbatim quote (always retained and
  displayed) already satisfies the owner's actual need even when re-location fails.
- **A generic "any page with `course_code` in front matter" reach rule**, matching the existing
  Spec 005 "suggest improvement" control's broader availability. Rejected: every one of spec.md's
  own acceptance scenarios is written against the five named Spec 008 page kinds specifically
  ("unit opening, unit-assessment, unit-teacher-notes, or course-level review page - not a topic
  file"); reading the requirement as "every page regardless of shape" would require inventing
  page-kind values the spec never names and no scenario exercises.

## References

- Feature Spec: [specs/010-curriculum-owner-console/spec.md](../../specs/010-curriculum-owner-console/spec.md)
  (User Story 2, FR-010 to FR-021; "Architectural decisions to record during planning" items 1-2)
- Implementation Plan: [specs/010-curriculum-owner-console/plan.md](../../specs/010-curriculum-owner-console/plan.md)
- Research: [specs/010-curriculum-owner-console/research.md](../../specs/010-curriculum-owner-console/research.md)
  (R6 - reach scope; R7 - passage capture; R8 - a third distinct table)
- Data Model: [specs/010-curriculum-owner-console/data-model.md](../../specs/010-curriculum-owner-console/data-model.md)
  (`content_feedback` table, RLS, triggers, access-control matrix)
- Contracts: [console-operations.md](../../specs/010-curriculum-owner-console/contracts/console-operations.md)
  (table B, 16-item test checklist)
- Related ADRs: none directly - this feature's `content_feedback` sits alongside, and is
  deliberately distinct from, the two feedback-shaped tables Spec 005 introduced (no dedicated ADR
  exists for those; they are documented in `specs/005-teacher-dashboard/data-model.md`)
- Evaluator Evidence: [history/prompts/010-curriculum-owner-console/0003-plan-curriculum-owner-console.plan.prompt.md](../prompts/010-curriculum-owner-console/0003-plan-curriculum-owner-console.plan.prompt.md),
  [0004-tasks-curriculum-owner-console.tasks.prompt.md](../prompts/010-curriculum-owner-console/0004-tasks-curriculum-owner-console.tasks.prompt.md),
  [0005-apply-analyze-remediation-edits.misc.prompt.md](../prompts/010-curriculum-owner-console/0005-apply-analyze-remediation-edits.misc.prompt.md)
  (the `/sp.analyze` pass that added the length-cap and FR-021 test coverage this table's design
  depends on)
