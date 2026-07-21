# Phase 0 Research: Student Dashboard

**Feature**: 004-student-dashboard | **Date**: 2026-07-20 | **Spec**: [spec.md](./spec.md)

No `NEEDS CLARIFICATION` markers remain in the spec (three `/sp.clarify` sessions resolved
achievement-logic, information-architecture, and performance-budget ambiguities). This document
resolves the *implementation-level* unknowns needed to fill Technical Context and justifies each
architectural choice the way Spec 003's research.md did.

---

## R1 — How is a course's total unit count determined, given content stays in Git?

**Decision**: Derive `total_units` per course at **read time in the browser**, from the existing
build-time `static/content-index.json` (built by `scripts/build-content-index.mjs`, already
shipped for Spec 003/T034) — `total_units(course_code) = count(distinct unit_no)` across that
file's records for the given `course_code`. **No change to `build-content-index.mjs` is needed**:
the Spec 001 data model's "every `unit-NN/` contains exactly the five files" rule guarantees
`activities.mdx` (one of the three kinds the script already indexes) exists for every unit
folder, authored or `coming_soon`, so counting distinct `unit_no` from the existing three-kind
index already yields the true unit count — including not-yet-authored units, which is the correct
denominator (a `coming_soon` unit folder still represents a unit the student will eventually need
to cover; excluding it would make 100% coverage reachable before the course is even fully
authored).

**Rationale**: Constitution Art. V.1 (content/app separation) and V.4 (adding a course must not
require platform-code change) both rule out mirroring a `unit_count` field into
`catalog/courses.json` or Postgres — the count must stay derived from the Git-tracked folder
structure that already exists, the same way Spec 003 treats `course_code`/`unit_no` as unvalidated
pointers rather than duplicated data.

**Alternatives considered**:
- Add a `unit_count`/`total_units` field to `catalog/courses.json` or `course-overview.mdx` front
  matter — rejected: this is data that must be kept in sync by hand every time a unit folder is
  added, exactly the kind of platform-code/config coupling Art. V.4 exists to prevent. The folder
  structure is already the source of truth; counting it is cheaper and can't drift.
- Mirror a per-course unit count into a small Postgres table via a build/deploy script — rejected
  for *this* purpose specifically (see R3 below for the one place a Postgres-side count actually
  is needed, and why a client-supplied value is preferred there instead).

---

## R2 — Achievement-granting architecture: event-driven triggers vs. read-time computation

**Decision**: Three of the four starter achievements are **pure Postgres triggers**, granted
exactly when their condition first becomes true, with no client involvement:

| Achievement | Trigger point | Why it can be server-only |
|---|---|---|
| First submission | `AFTER INSERT ON submissions` | Numerator and "first ever" check are both native to `submissions` (Spec 003) — no Git dependency. |
| Study streak (3 self-marked days) | `AFTER INSERT ON unit_progress` (only rows with `method='self_marked'`) | Streak is purely a function of `unit_progress.occurred_at::date` for that student — no Git dependency. |
| On-time completion of every assignment in a class | `AFTER INSERT ON grades` | Both sides of the comparison — count of the class's published `assignments` and count of that student's on-time (`late=false`) graded submissions for them — already live in Spec 003's Postgres tables. No Git dependency. |

The fourth, **100% unit coverage in a single course**, cannot be a pure trigger: its denominator
(`total_units`, R1) lives only in Git-derived `content-index.json`, which Postgres cannot read.
This one is **read-time and client-assisted**: the Progress/Achievements page, after computing a
course's coverage fraction client-side (numerator from `unit_progress`, denominator from
`content-index.json`, per R1), calls a `SECURITY DEFINER` RPC —
`check_full_coverage_achievement(p_course_code, p_total_units)` — that **recomputes the numerator
itself, authoritatively, server-side** (never trusts the client for that half) and only accepts
`p_total_units` from the caller for the other half of the comparison, since only the caller (via
Git-sourced `content-index.json`) can know it.

**Rationale — why trusting the client for `p_total_units` is acceptable here specifically**: this
RPC's blast radius, if a student passed a wrong number, is earning one motivational badge slightly
early or late — never a grade, submission, answer key, or another student's data (the things
Constitution Art. V.2/VIII.1 exist to protect). SC-004 only requires "granted... exactly once,"
which the `unique (student_id, achievement_key)` constraint (data-model.md) guarantees regardless
of what triggers the call. Treating this as equivalent in sensitivity to grading/answer-key
authorization would be over-engineering a badge.

**Alternatives considered**:
- Mirror `total_units` per course into a small Postgres table (rejected in R1, same reasoning) —
  would let this one achievement be a pure trigger too, but adds a build/deploy sync step for a
  single low-stakes check.
- Compute all four achievements read-time, client-assisted — rejected: the other three have no
  Git dependency at all, so making them client-assisted would needlessly weaken an
  otherwise-fully-server-authoritative guarantee for no benefit.

---

## R3 — Unifying "how a unit was completed" into one queryable record

**Decision**: A single new table, `unit_progress` (one row per `(student_id, course_code,
unit_no)`, `unique` constraint), is populated from **three** write paths, each using `ON CONFLICT
(student_id, course_code, unit_no) DO NOTHING`:
1. A direct, RLS-authorized client `INSERT` when a student self-marks a unit (`method =
   'self_marked'`) — FR-006's dashboard and unit-page entry points both call the same
   `markUnitStudied()` client function.
2. A `SECURITY DEFINER` trigger `sync_unit_progress_from_grade()`, `AFTER INSERT ON grades`
   (Spec 003), which resolves the graded submission's assignment and, **only if that assignment
   has a non-null `course_code`/`unit_no`** (i.e., `source_kind != 'custom'`), inserts `method =
   'assignment'`.
3. A `SECURITY DEFINER` trigger `sync_unit_progress_from_quiz()`, `AFTER INSERT ON quiz_attempts`
   (Spec 003), which always has a unit (quiz assignments are never `source_kind='custom'`),
   inserts `method = 'quiz'`.

**Why `SECURITY DEFINER` is required for (2) and (3)**: the inserting caller for a `grades` row is
the *teacher*, and for a `quiz_attempts` row it's the `submit_quiz_attempt()` RPC acting on the
*student's own* JWT — but even in the student case, an ordinary `SECURITY INVOKER` trigger
executing as part of a `submit_quiz_attempt()` call already runs under that RPC's own `SECURITY
DEFINER` context, and a teacher's `grades` insert plainly has a different `current_profile_id()`
than the student the `unit_progress` row belongs to. Without `SECURITY DEFINER`, RLS would reject
the cross-user insert outright. This is the same, already-established pattern as Spec 003's
`join_class_by_code()`/`submit_quiz_attempt()` — "the system must write a row on behalf of someone
other than the current caller."

**Rationale**: This directly satisfies FR-006's "counts exactly once regardless of how many times
marked or through how many different means" at the database layer via a single unique constraint,
rather than requiring the client to de-duplicate a three-way UNION of `unit_progress`-equivalent
data at every read. It also matches the spec's own Key Entity framing ("Unit Progress: one record
per student per unit... capturing how it was completed... and when").

**Alternatives considered**:
- A read-time `UNION` view over `unit_self_marks`, `submissions+grades`, and `quiz_attempts`
  instead of a real table — rejected: three-way joins on every dashboard/progress read for
  something write-time triggers can pre-resolve into one row is unnecessary read-path cost,
  working against SC-008's 2-second p95 budget for no benefit (the write-time cost of an `ON
  CONFLICT DO NOTHING` insert is negligible and happens on already-existing write paths).

---

## R4 — Achievement catalog storage: static code vs. a Postgres table

**Decision**: The fixed catalog of four milestone definitions (bilingual title, description, "how
to reach it" copy) is a **static TypeScript constant**, `src/lib/achievements.ts`, not a Postgres
table. Only **earned** achievements (`student_achievements`: `student_id`, `achievement_key`,
`earned_at`) are persisted in Postgres.

**Rationale**: This repo's established convention for bilingual, platform-wide UI copy that never
needs per-user or admin authoring is a local `{ en, ur }`-keyed constant read via a `useLocale()`
hook (e.g. `MESSAGES` objects in `src/pages/app/classes/index.tsx`/`roster.tsx`) — not a database
row. The achievement catalog is exactly this kind of data: fixed at four entries, identical for
every student, never edited through any UI in this feature (mirrors Spec 003's `quiz_items`/
`answer_keys` precedent that curriculum-authority content has no client authoring UI — Constitution
Art. II). A Postgres table for four rows that are never queried by `WHERE` clause, never filtered,
and never change without a code deploy anyway would add RLS-policy surface for no read/write
benefit over a static import.

**Alternatives considered**: A `achievements` catalog table (matching the spec's Key Entities
section literally) — rejected: the Key Entities section describes a *concept*, not a mandated
schema; nothing in the FRs or Success Criteria requires the catalog itself to be queryable via
Postgres, and `student_achievements.achievement_key` (a `CHECK`-constrained enum-like `text`
column) is sufficient to reference the four fixed keys the static catalog also defines.

---

## R5 — Where the "mark unit studied" control lives on a unit's content page

**Decision**: Swizzle `theme/DocItem/Footer` (wrapping `@theme-original/DocItem/Footer`), reading
the current doc's front matter via Docusaurus's doc-context hook. Because Spec 001's data model
requires **every** file in a `unit-NN/` folder (`index.mdx`, `activities.mdx`, `formative.mdx`,
`summative.mdx`, `teacher-notes.mdx`) to carry `course_code`/`unit_no` front matter, the swizzled
footer conditionally renders a "Mark as studied" button on **any** of a unit's five pages whenever
both fields are present **and** the signed-in user is a student — calling the same
`markUnitStudied()` function the Progress area's self-mark control uses.

**Rationale**: A swizzled theme component requires zero per-file content-author action (Art. V.4)
— it activates automatically wherever the front matter already exists, unlike an MDX shortcode
that would need manual inclusion in every unit file (and risk being forgotten). `teacher-notes.mdx`
is never rendered to a student-role visitor in the first place (existing content-visibility rule
from Spec 001), so this button never actually appears there in practice.

**Alternatives considered**: An MDX component manually dropped into `index.mdx` only — rejected
for the per-file authoring burden above, and because it would only ever appear on one of the five
pages rather than "the unit's own content page" generically.

---

## R6 — Student Guide placement (Constitution Article X)

**Decision**: A **second Docusaurus docs-plugin instance**, id `guides`, `routeBasePath:
'/guides'`, its own content directory (`guides/`), reusing the same classic-preset content
pipeline and bilingual `i18n` config as the curriculum docs instance already rooted at `/`. The
Student Guide (`guides/student-guide/index.mdx` and sub-pages: navigate the platform, join a
class, submit work, read grades, use the dashboard — Art. X.1's exact enumerated scope) is authored
in this feature's branch; a "Dashboard" navbar entry (R7) links a signed-in student to both the
guide and the new dashboard pages.

**Rationale**: Constitution Art. X.1 was added in this same session (constitution v2.4.0) and its
own Sync Impact Report names "Spec 004/005's dashboards" as the natural home for the Student/
Teacher Guides' **initial authoring**, since this is the first feature giving students a workflow
substantial enough to document. Article VII's Docs gate requires "a shipped spec that changes a
student... workflow updates the matching guide... in the same branch" — Spec 004 changes the
student workflow (adds the entire dashboard surface), so the Student Guide is this feature's
obligation. The Teacher Guide is explicitly **not** in scope here (spec.md's own Assumptions:
"Teacher-side equivalent is a separate feature") — it remains a follow-up for whichever future spec
first changes teacher-facing workflow. A **separate plugin instance**, rather than folding guide
pages into the existing semester-rooted docs tree, keeps the curriculum content's sidebar/search
tuning (semester → course → unit) uncontaminated by app-usage documentation, which has a
completely different navigational shape (guide topic → guide topic, not semester → course → unit).

**Alternatives considered**: Folding guide pages into the existing `docs/` instance under a
non-semester path (e.g. `docs/guides/...`) — rejected: `sidebars.ts` and the local-search plugin
are both tuned around the semester/course/unit shape (per Spec 001), and mixing an unrelated
navigational structure into the same sidebar risks confusing the curriculum catalog that is meant
to be the site's home per Spec 001's SC-003. This is flagged below as an ADR-suggestion candidate
(cross-cutting docs-architecture decision, alternatives considered, affects every future spec that
adds guide content) rather than decided unilaterally without owner visibility.

---

## R7 — No new npm dependency

**Decision**: No new dependency is added. Progress/coverage bars render as plain CSS (a filled
`<div>` sized by percentage) or inline SVG — consistent with the spec's own checklist note that
"CSS/SVG-only chart rendering" was deliberately left out of spec.md as an implementation detail
belonging here. `@supabase/supabase-js`, React, and Docusaurus (all already dependencies) are
sufficient for every read/write path this feature needs.

**Rationale**: Constitution Art. V.5 (< 200 KB first load, low-bandwidth first) — the same budget
discipline Spec 003 tracked for `exceljs` applies here in reverse: the cheapest way to stay under
budget is to not add a charting library for what a handful of `<div>`s and percentages can render.

---

## Summary of resolved Technical Context

| Field | Resolution |
|---|---|
| Language/Version | TypeScript 5.6 on Node 22+ (unchanged) |
| Primary Dependencies | Docusaurus 3.10, `@supabase/supabase-js` ^2, React 18.3 (all existing) — no new dependency (R7) |
| Storage | Supabase Postgres — 2 new tables (`unit_progress`, `student_achievements`) extending Spec 002/003's schema (R3, R4) |
| Testing | Vitest (unit + RLS matrix, extends `tests/rls/`), Playwright (e2e, extends `tests/e2e/`) |
| Target Platform | Same self-hosted VPS as Spec 001–003 |
| Project Type | Web — static frontend + self-hosted backend, zero Edge Functions (unchanged posture) |
| Performance Goals | SC-008: home area < 2s p95 @ 8 semesters / 6 classes per semester |
| Constraints | RLS-only authorization; `total_units` derived from Git via `content-index.json`, never duplicated (R1); achievement catalog is static code, not a table (R4); one narrow, documented client-trust exception for a single low-stakes RPC (R2) |
| Scale/Scope | 2 new tables, 5 new trigger/RPC functions, 1 new Docusaurus docs-plugin instance (R6), 6 new app pages, 1 swizzled theme component (R5) |
