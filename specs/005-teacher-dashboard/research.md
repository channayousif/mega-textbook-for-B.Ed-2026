# Phase 0 Research: Teacher Dashboard, Feedback & Book Improvement Loop

**Feature**: 005-teacher-dashboard | **Date**: 2026-07-24 | **Spec**: [spec.md](./spec.md)

No `NEEDS CLARIFICATION` markers remain in the spec (two `/sp.clarify` sessions resolved the
at-risk "falling trend" definition, Overview's bounded scope, and — the one genuine cross-spec
conflict found — FR-011's unit-coverage source). This document resolves the *implementation-level*
unknowns needed to fill Technical Context and justifies each architectural choice the way Specs
003/004's research.md documents did.

---

## R1 — How does the "Suggest improvement" / "Give feedback" widget capture page slug, section anchor, and locale with no new dependency?

**Decision**: Extend the already-swizzled `src/theme/DocItem/Footer.tsx` (Spec 004 added it for
the student-only "Mark as studied" control) with two new teacher-only branches, reusing APIs
already in use elsewhere in this codebase:

- **Slug**: `useLocation().pathname` (`@docusaurus/router`), the same source `StudentDashboardGuard.tsx`
  already uses for its own return-to URL.
- **Locale**: `useDocusaurusContext().i18n.currentLocale`, the same source the existing
  `useLocale()` helper (repeated verbatim across `classes/index.tsx`, `queue.tsx`, `Footer.tsx`
  itself) already reads.
- **Nearest section heading**: `useDoc()` (`@docusaurus/plugin-content-docs/client`, already
  imported in `Footer.tsx` for `frontMatter`) also exposes `toc: {value, id, level}[]` for the
  current page. At the moment the teacher clicks "Suggest improvement" (not via a continuous
  scroll listener — see Alternatives), walk `toc` in order, read each entry's heading element via
  `document.getElementById(entry.id)`, and take the **last** entry whose `getBoundingClientRect().top`
  is at or above a small threshold (≈100px, roughly "the reading position"). If none qualifies
  (the reader is above the first heading), `section_anchor` is `null` — a legitimate value meaning
  "top of page, before any heading."
- **Course/unit reference**: "Suggest improvement" (FR-003) activates whenever
  `frontMatter.course_code` is present — `unit_no` is included when also present, `null` otherwise.
  This covers both unit pages (all five files, per Spec 001's data model) **and** course-overview
  pages (`course-overview.mdx`, which carries `course_code` but no `unit_no`), satisfying FR-003's
  "every book content page" literally rather than narrowing it to unit pages only (2026-07-24
  remediation, `/sp.analyze` finding U1). "Give feedback on this activity" (FR-007) keeps the
  stricter, `unit_no`-required condition unchanged — feedback is inherently about one specific
  activity, which only exists within a unit, so course-overview pages never get that control.

**Rationale**: No new dependency, no new swizzle point, no continuous `IntersectionObserver`
(cheaper — computed once, on click, not on every scroll frame) — and it reuses three APIs already
proven in this exact file/sibling files.

**Alternatives considered**:
- A persistent `IntersectionObserver` tracking the "currently read" heading at all times — rejected
  as unnecessary continuous work for a control only read once, at click time; the on-demand
  `getBoundingClientRect()` walk is cheaper and simpler to test.
- A new, separate swizzle point (e.g., a floating action button independent of `DocItem/Footer`) —
  rejected: `Footer.tsx` already renders once per doc page and already branches by role for the
  student case; adding teacher branches to the same file is the smaller diff.

---

## R2 — Course/unit references on the three new tables

**Decision**: `teaching_log_entries`, `activity_feedback`, and `improvement_suggestions` all use
plain, unvalidated `course_code text` / `unit_no integer` columns (plus `source_kind text` on the
first two), identical in shape and validation posture to Spec 003's `assignments.course_code`/
`unit_no`/`source_kind`. `improvement_suggestions` additionally stores `page_slug text` (the exact
page path, not derivable from `course_code`/`unit_no` alone since a unit has five separate pages).

**Rationale**: Constitution Art. V.1 (content/app separation) and V.4 (adding a course must not
require platform-code change) — the same reasoning Spec 003's data-model.md and Spec 004's R1 both
already documented. The client (not the database) validates these against the build-time content
index before allowing a write.

**Alternatives considered**: A `content_pages` reference table mirroring Git structure into
Postgres — rejected for the same reason Spec 003 rejected it: content stays in Git, full stop; a
mirror table becomes another thing to keep in sync by hand.

---

## R3 — FR-011's unit coverage: independent computation, not `unit_progress`

**Decision**: A teacher's view of a student's "unit coverage" within a class is computed **at read
time**, client-side, from data the teacher already has RLS access to: `count(distinct
(course_code, unit_no))` across that student's graded `submissions` (joined through `assignments`)
**plus** that student's `quiz_attempts` (joined through `assignments`) for the class's course,
divided by `fetchTotalUnitsForCourse(class.course_code)` — the exact helper Spec 004 already
built (`src/lib/unitProgress.ts`, research.md R1 there), reused unmodified since the denominator
(total units in a course, derived from `static/content-index.json`) is identical regardless of who
is asking. Spec 004's `unit_progress` table is not read, written, or referenced by this feature in
any way.

**Rationale**: This is the direct implementation of the 2026-07-24 clarification. Spec 004's
`unit_progress` RLS explicitly denies teachers any access, a deliberate privacy decision
("coverage is more private here than grades... not even a teacher gets access," Spec 004
plan.md Art. VIII.1) — reusing it here would either require reversing that decision (its own
ADR-worthy change, out of this feature's scope) or silently attempting a read this role cannot
perform. Computing independently from tables teachers already see (`submissions`, `grades`,
`quiz_attempts`) needs no new grant and no schema change.

**Alternatives considered**: Relaxing `unit_progress`'s RLS to admit `teacher (own class's
students)` — presented to and rejected by the owner during clarification; reopening a documented
prior privacy decision without its own justification/ADR was judged worse than two independently
defined notions of "coverage" (Risks §2 documents the resulting drift risk and mitigation).

---

## R4 — Analytics: reuse `gradebookExport.ts`'s merge pattern, no new SQL view

**Decision**: Per-class Analytics (score distribution, per-student trend, unit-by-unit average,
at-risk flags) is computed **client-side** by composing the same two RLS-scoped queries
`src/lib/gradebookExport.ts` already runs for its own export — non-quiz assignments' marks via
`submissions.grades(mark)`, quiz assignments' marks via the existing `quiz_best_scores` (Spec 003)
view — merged per student per assignment exactly as `exportGradebook()` already does, then
aggregated in-memory for the three Analytics figures. At-risk detection (FR-010) runs over the same
merged, per-student, chronologically-ordered score array: **≥2 missed deadlines** = assignments
whose `due_at` has passed with no corresponding `submissions`/`quiz_attempts` row; **falling
trend** = the student's last 3 graded scores (normalized `mark/max_mark`) each strictly lower than
the one before (spec.md Clarifications, 2026-07-24).

**Rationale**: spec.md's own Assumptions state Analytics "introduces no new source of truth for
scores" — a new SQL view would be a second, parallel implementation of logic
`gradebookExport.ts` already contains, risking drift between the two. Reusing the same
merge function (refactored into a small shared helper, not copy-pasted) keeps one implementation.

**Alternatives considered**: A new Postgres view (`class_analytics` or similar) pre-computing
distribution/trend/average server-side — rejected: Spec 003/004 both computed dashboard
aggregations client-side over RLS-scoped reads rather than adding views, and at the 200-student
scale ceiling this budget already targets (Spec 003 SC-005), client-side aggregation over one
class's data is not a performance concern.

---

## R5 — `improvement_suggestions` status transitions: a guard trigger, not app-layer discipline

**Decision**: A `BEFORE UPDATE ON improvement_suggestions` trigger,
`enforce_suggestion_status_transition()`, allows only these exact transitions for a non-admin-bypassed
caller: `submitted → under_review`, `under_review → accepted`, `under_review → rejected`,
`accepted → published`. Any other attempted transition (skipping a step, moving backward, or
touching a terminal `rejected`/`published` row) raises. The same migration also restricts a
permitted `UPDATE` to the `status`/`admin_note` columns only (mirroring Spec 003's
`guard_class_updates()` "narrows which columns an already-permitted UPDATE may touch" role) — the
row-level RLS `UPDATE` policy (admin only) grants row access; the trigger narrows what within that
access may change.

**Rationale**: Key Entities describes this exact one-directional graph ("Status moves in one
direction: submitted → under review → accepted/rejected, and (for accepted suggestions only) →
published") as a formal state machine, the same way Spec 003's `class_status` diagram was. Only a
database-layer check (Art. IX.2) can guarantee a crafted PostgREST call can't shortcut it.

**Alternatives considered**: Trusting the admin moderation UI to only ever expose legal
transition buttons — rejected as the same "hidden page" anti-pattern Art. V.2 exists to rule out;
a direct API call could otherwise bypass the UI entirely.

---

## R6 — Teacher Guide placement: the existing `guides` docs-plugin instance, zero new config

**Decision**: `guides/teacher-guide/` is added as a new content folder inside the **already
existing** `guides` Docusaurus docs-plugin instance (`docusaurus.config.ts`, `id: 'guides'`,
`routeBasePath: 'guides'`), which Spec 004 built generically for exactly this purpose. No change
to `docusaurus.config.ts`, `sidebars-guides.ts` (already `{type: 'autogenerated', dirName: '.'}`),
or the search theme's `docsRouteBasePath` (already `['/', '/guides']`) is needed — only new `.mdx`
content and its `_category_.json`, plus `i18n/ur/docusaurus-plugin-content-docs-guides/current/teacher-guide/`
translations.

**Rationale**: ADR-0009 (Spec 004) explicitly anticipated this: "The Teacher Guide (a future
spec's obligation) slots into the same `guides/` instance with zero new plugin/config work — only
new content folders." This feature is that future spec.

**Alternatives considered**: None — this was a settled decision from Spec 004's ADR-0009, not a
new architectural choice this feature needs to re-litigate.

---

## R7 — No new npm dependency

**Decision**: No new dependency is added. Analytics' score distribution and unit-by-unit average
render as plain CSS (filled `<div>`s / simple bar rows) or inline SVG, the same choice Spec 004's
R7 made for progress bars. `@supabase/supabase-js`, React, and Docusaurus (all already
dependencies) are sufficient for every read/write path this feature needs.

**Rationale**: Constitution Art. V.5 (< 200 KB first load) — the same budget discipline Spec 004
tracked applies here.

**Alternatives considered**: A charting library (e.g., a lightweight SVG chart package) for the
score-distribution histogram — rejected for the same reason Spec 004 rejected one for progress
bars: a handful of `<div>`s/`<svg>` bars render a histogram and a trend line perfectly well at this
feature's data scale (one class, ≤200 students, a bounded number of assignments).

---

## R8 — Migration numbering

**Decision**: Continue directly after Spec 004's `0027_achievement_triggers.sql`:
- `0028_teaching_log_entries.sql` — table + RLS.
- `0029_activity_feedback.sql` — table + RLS (including the upsert-permitting `UPDATE` policy).
- `0030_improvement_suggestions.sql` — enum types, table + RLS.
- `0031_improvement_suggestions_transitions.sql` — `enforce_suggestion_status_transition()`
  trigger.

**Rationale**: Matches the sequential, never-renumbered convention every prior spec in this repo
has followed.

---

## Summary of resolved Technical Context

| Field | Resolution |
|---|---|
| Language/Version | TypeScript 5.6 on Node 22+ (unchanged) |
| Primary Dependencies | Docusaurus 3.10, `@supabase/supabase-js` ^2, React 18.3 (all existing) — no new dependency (R7) |
| Storage | Supabase Postgres — 3 new tables (`teaching_log_entries`, `activity_feedback`, `improvement_suggestions`) extending Specs 002/003's schema (R2, R5); Spec 004's `unit_progress` explicitly untouched (R3) |
| Testing | Vitest (unit + RLS matrix, extends `tests/rls/`), Playwright (e2e, extends `tests/e2e/`) |
| Target Platform | Same self-hosted VPS as Specs 001–004 |
| Project Type | Web — static frontend + self-hosted backend, zero Edge Functions (unchanged posture) |
| Performance Goals | Reuses Spec 003 SC-005's 5s p95 @ 200 students |
| Constraints | RLS-only authorization; course/unit references are unvalidated pointers (R2); FR-011 coverage computed independently of `unit_progress` (R3); Analytics reuses `gradebookExport.ts`'s merge pattern (R4); suggestion status transitions enforced by a guard trigger (R5); Teacher Guide reuses the existing `guides` instance with zero new config (R6) |
| Scale/Scope | 3 new tables, 1 new guard trigger + column restriction, 7 new app pages, 1 extended swizzled theme component (R1), 1 new navbar link component, Teacher Guide content (R6) |
