# ADR-0015: Curriculum-Owner Catalog Edits - Download-and-Commit Flow, Not a Live Database Write

> **Scope**: Document decision clusters, not individual technology choices. Group related decisions that work together (e.g., "Frontend Stack" not separate ADRs for framework, styling, deployment).

- **Status:** Accepted
- **Date:** 2026-09-05
- **Feature:** 010-curriculum-owner-console
- **Context:** Spec 010 User Story 6 (FR-029) asks for the curriculum owner to update a catalog
  entry (a course listing's code/title/credit-hours/category/bilingual metadata,
  `catalog/courses.json`) from the console, explicitly requiring that "version control stays the
  source of truth for catalog content" and that the console "does not write catalog content
  directly to the live database." Constitution Art. V.1 draws a hard line between content (Git,
  Docusaurus-rendered, diffable) and application state (the self-hosted Supabase Postgres
  instance); `catalog/courses.json` is content by that definition - it is the seed for
  `scripts/scaffold-catalog.mjs` and is read by the build, not by any RLS-governed table. Every
  other content-adjacent write path in this codebase (topic authoring, figure placement, the
  content/figure status report) already produces a file for Git, never a database row. Spec.md
  itself named this mechanism "settled during planning" as one of the four decisions this feature
  earmarked for an ADR, leaving the exact flow open rather than guessing at implementation time.

<!-- Significance checklist (ALL true):
     1) Impact - sets the precedent for how the console (or any future admin surface) may ever
        touch content that lives in Git: through a downloadable artifact for human review and
        commit, never a direct write. A future engineer adding another catalog-adjacent edit
        surface will look to this decision before reaching for a database table.
     2) Alternatives - a live database write with the catalog synced from Postgres back to Git
        (or vice versa); a GitHub API-driven PR-creation flow; the chosen download-and-commit flow.
     3) Scope - cross-cutting: touches the build pipeline (a new static copy step), the console UI
        (a new form), and the project's content/application-state boundary (Constitution Art. V.1)
        that every other feature in this repo already respects. -->

## Decision

Adopt, as **one integrated catalog-edit mechanism**, the following three components. They ship
together in Spec 010, are motivated by the same "Git stays the source of truth" constraint, and
would be revised together.

### 1. A build-time static copy, not a live database read

`catalog/courses.json` (already checked into Git, already the seed for
`scripts/scaffold-catalog.mjs`) is copied verbatim to `static/catalog-courses.json` at build time
- the same `static/*.json` convention `content-index.json` (Spec 003) and `content-status.json`
(this feature's own Story 4) already establish. The console's catalog-edit form reads this static
copy via a plain `fetch()`, exactly like every other console panel reads its own generated JSON.

### 2. An in-browser edit form producing a downloadable replacement file, never a network write

The owner edits one course entry's fields (code, title, credit hours, category, the `bilingual`
flag) in a form; on submit, the client assembles the **complete, updated** `courses.json` content
in memory and offers it as a download. No request is ever sent to Postgres, to Supabase, or to any
Edge Function for this data - the entire operation is a client-side string transformation over
data already fetched.

### 3. The owner commits the downloaded file through the ordinary PR flow - a deliberate, accepted manual step

The console's job ends at producing a correct, complete replacement file. Reviewing it, replacing
`catalog/courses.json` in a working tree, and committing/merging it is the curriculum owner's own
action, through the same Git workflow every other content change in this repository already goes
through (Constitution Art. IV.4's spec-drift discipline, Art. V.1's content-in-Git principle).

## Consequences

### Positive

- **Git remains the single source of truth for catalog content**, with zero risk of the database
  and the repository disagreeing about what a course listing says - there is no second copy of
  catalog data that could drift, because the console never writes one.
- **No new attack surface.** No Edge Function, no new RLS policy, no new writable table is
  introduced for this feature. A compromised or buggy console session can, at worst, offer a
  malformed download - it can never corrupt live catalog data, because there is no live catalog
  data to corrupt.
- **Consistent with every other content-adjacent mechanism in this codebase.** Topic authoring, the
  `generate-figures` skill's asset placement, and this feature's own `content-status.json`
  report all produce files for a human to review and commit; this decision extends the same
  pattern to catalog metadata rather than inventing a fourth, different pattern.
- **Reviewable by construction.** A downloaded `courses.json` is a normal diff in a normal pull
  request - the existing Content gate (Constitution Art. VII) and any human review of that PR
  apply to a catalog change exactly as they would to any other content change.
- **Zero new cost or infrastructure.** No managed-tier feature, no additional Supabase table, no
  new CI job - the entire mechanism is a static-file copy the build already knows how to produce
  plus one client-side form.

### Negative

- **The owner must remember to actually commit the downloaded file.** Nothing in this design
  enforces that step - a downloaded-but-never-committed `courses.json` simply means the catalog
  page in the live site does not yet reflect the edit. Accepted: this is the explicit cost of
  keeping Git as the sole source of truth (Constraints, spec.md), the same manual-commit step
  every other content author already takes for every other content change in this repository.
- **No in-console confirmation that the edit "took."** Because there is no live write, the console
  cannot show "saved" - only "downloaded." A future UX pass could add a lightweight reminder
  ("commit and merge this file to publish the change"), but no such reminder is built in this
  feature.
- **A concurrent edit by two sessions is not reconciled.** Two owners downloading and editing
  `courses.json` around the same time could produce two diverging replacement files; the ordinary
  Git merge/PR-review process is the only conflict-resolution mechanism, exactly as it already is
  for any other simultaneous edit to a checked-in file.
- **The viewer's browser sandbox blocks a script-driven save in some contexts** (a known Artifact-
  style constraint for hosted pages; less relevant for this project's own authenticated
  first-party page, but worth naming): the download must be a genuine same-origin file download
  from the project's own site, not a third-party-hosted preview, for the flow to work reliably.

## Alternatives Considered

- **A live database write**, with `courses.json` either synced from a new Postgres table back into
  Git by a scheduled job, or treated as generated output the repository stops tracking by hand.
  Rejected: directly violates Constitution Art. V.1 ("content and application are separate
  concerns... Docusaurus is static and MUST NOT be trusted with secrets or access control" -  by
  extension, catalog content joining application state reverses that separation) and FR-029's own
  explicit constraint; also introduces a new sync-direction problem (which side wins on conflict)
  that the download-and-commit flow never creates.
  - **Pros**: an in-console "Saved" confirmation; no manual commit step; trivially supports
    concurrent edits via ordinary database transaction semantics.
  - **Cons**: violates Art. V.1; needs a new table, new RLS, and a sync mechanism in one direction
    or the other; makes the live site's catalog page authoritative over Git instead of the
    reverse, which is a governance reversal, not a feature.
- **A GitHub API-driven flow** where the console calls GitHub's API (via a server-side token) to
  open a pull request directly, skipping the manual download/commit step. Would remove the
  "did the owner remember to commit it" gap. Rejected for this feature's scope: it requires a new
  server-side credential (a GitHub token) living somewhere reachable by the console - either a new
  Edge Function or a build-time secret - which is new infrastructure and a new secret-handling
  surface for a P3 convenience story, and this project's existing Constitution Art. V.6
  (cost-controlled infrastructure) weighs against adding infrastructure for a convenience rather
  than a core requirement. Noted as a reasonable future upgrade if the manual-commit gap proves
  costly in practice - it would supersede this ADR's component 3, not components 1-2.
  - **Pros**: closes the "forgot to commit" gap entirely; a genuinely one-click flow.
  - **Cons**: new secret/credential surface; new infrastructure; disproportionate to a P3 console
    convenience; still ultimately produces a PR a human reviews, so the review step doesn't
    disappear, only the file-handling step does.
- **No catalog-edit mechanism in this feature at all** (defer FR-029 entirely). Rejected: FR-029 is
  a stated requirement with its own acceptance scenario (US6 AS3); the download-and-commit flow is
  the smallest change that satisfies it without new infrastructure, so deferring gains nothing a
  smaller-scope implementation doesn't already achieve.

## References

- Feature Spec: [specs/010-curriculum-owner-console/spec.md](../../specs/010-curriculum-owner-console/spec.md)
  (User Story 6, FR-029; "Architectural decisions to record during planning" item 3; Assumptions -
  "the safe default is a change-set or download flow")
- Implementation Plan: [specs/010-curriculum-owner-console/plan.md](../../specs/010-curriculum-owner-console/plan.md)
  (Phase 1 - "Catalog-edit mechanism (FR-029), resolved here")
- Data Model: [specs/010-curriculum-owner-console/data-model.md](../../specs/010-curriculum-owner-console/data-model.md)
  (Catalog entry - "Editable by the owner through the console; its content stays under version
  control")
- Related ADRs: [ADR-0004](0004-content-integrity-build-gate-and-data-driven-catalog.md)
  (establishes `catalog/courses.json` as the data-driven catalog source this ADR keeps
  authoritative), [ADR-0006](0006-self-hosted-supabase-backend.md) (the content/application-state
  boundary this decision preserves)
- Evaluator Evidence: [history/prompts/010-curriculum-owner-console/0003-plan-curriculum-owner-console.plan.prompt.md](../prompts/010-curriculum-owner-console/0003-plan-curriculum-owner-console.plan.prompt.md)
  (the planning pass that resolved FR-029's open mechanism question)
