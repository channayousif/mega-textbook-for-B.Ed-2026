# Implementation Plan: Student Dashboard

**Branch**: `004-student-dashboard` | **Date**: 2026-07-20 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-student-dashboard/spec.md`

## Summary

Give every signed-in student one place — six distinct areas (Home, Assignments, Grades, Progress,
History, Achievements) — to see their current-term status, close the loop on every grade, track
per-course unit coverage, self-mark study progress independent of graded work, review past
semesters as a frozen transcript, and get recognized for four fixed milestones. Five of the six
areas are pure reads over Spec 003's existing schema; only unit coverage (self-marking plus
automatic sync from grading/quiz attempts) and achievements need new storage.

Technical approach: extend Specs 002/003's schema in the same self-hosted Supabase Postgres,
reached directly from the browser with RLS as the sole authorization layer (Constitution Art.
V.1/V.2, IX.2) — no application server, no new Edge Functions. Two new tables
(`unit_progress`, `student_achievements`) plus seven `SECURITY DEFINER` trigger/helper/RPC
functions cover every write this feature needs; everything a student *reads* is either a plain
RLS-scoped `SELECT`
over existing tables or a client-side aggregation of two already-available sources (Postgres rows
plus the build-time `static/content-index.json`, which supplies each course's total unit count
without duplicating Git-tracked content into the database). This feature also authors the
project's first **Student Guide** (Constitution Article X, added this same session), since it is
the first feature giving students a workflow substantial enough to document.

## Technical Context

**Language/Version**: TypeScript 5.6 on Node 22+ (unchanged from Specs 002/003)
**Primary Dependencies**: Docusaurus 3.10 (existing), `@supabase/supabase-js` ^2 (existing), React 18.3 (existing) — **no new dependency** (research.md R7: progress bars are plain CSS/SVG, not a charting library, per Art. V.5's bundle budget)
**Storage**: Supabase Postgres — 2 new tables (`unit_progress`, `student_achievements`) extending Specs 002/003's schema (research.md R3, R4). Course/unit content and the fixed achievement catalog both stay outside Postgres — the former in Git (unchanged Art. V.1 posture), the latter as a static TypeScript constant (research.md R4) — neither is duplicated into the database.
**Testing**: Vitest (unit + RLS matrix, extends `tests/rls/`), Playwright (e2e, extends `tests/e2e/`) — both already configured
**Target Platform**: Same self-hosted VPS as Specs 001–003 (`textbook.com.pk` + `api.textbook.com.pk` → Kong → self-hosted Supabase, ADR-0006/ADR-0007). No new infrastructure.
**Project Type**: Web — static frontend + self-hosted backend; no application server (unchanged). Zero Edge Functions; the one new RPC (`check_full_coverage_achievement`) is a `SECURITY DEFINER` Postgres function reached via PostgREST, exactly like Spec 003's two RPCs.
**Performance Goals**: SC-008 (dashboard home area < 2s p95 for a student with up to 8 semesters of history and 6 classes/semester, 2026-07-20 clarification)
**Constraints**: RLS-only authorization (Art. V.2/IX.2); `total_units` per course derived from `static/content-index.json`, never duplicated into Postgres (Art. V.1/V.4, research.md R1); achievement catalog is static code, not a table (research.md R4); one narrow, explicitly documented client-trust exception — `check_full_coverage_achievement`'s `p_total_units` parameter — justified in research.md R2 by its low blast radius (one motivational badge, never academic data); every person-referencing FK points at `profiles(id)`, never `auth.users(id)` (Spec 002's tombstone-survival design); bilingual EN/UR incl. RTL for every area (Art. III.8, FR-010); the Student Guide (Art. X.1/X.2) must be authored in this same branch, since this feature changes the student-facing workflow
**Scale/Scope**: 2 new tables, 7 new trigger/helper/RPC functions, 1 new Docusaurus docs-plugin instance (`guides`, research.md R6) with the initial Student Guide, 6 new app pages under `src/pages/app/dashboard/`, 1 swizzled theme component (`theme/DocItem/Footer`, research.md R5) for the unit-page "mark as studied" control, 1 new navbar link component

## Constitution Check

*GATE: evaluated against Constitution v2.4.0. Re-checked after Phase 1 design below.*

| Article | Requirement | Status |
|---|---|---|
| V.1 | Content in Git; app state in self-hosted Supabase; static site holds no secrets | ✅ `unit_progress`/`student_achievements` are the only new Supabase tables; course/unit content and the achievement catalog both stay out of Postgres (research.md R1, R4) |
| V.2 | Security in the backend; sensitive data protected by RLS, not hidden pages | ✅ `unit_progress`/`student_achievements` are RLS-scoped to the owning student; no client write path exists for achievement grants except the internal `grant_achievement()` helper |
| V.3 | Roles/`verified_teacher` per Spec 002; teacher role grants peer-teaching only | ✅ This feature only *consumes* `is_admin()`/`current_profile_id()` — it does not touch roles. Teachers get **no** access to `unit_progress`/`student_achievements` at all (coverage/achievements are student-private in this feature) |
| V.4 | Adding a course must not require platform-code change | ✅ `unit_progress.course_code`/`unit_no` are unvalidated pointers, same as Spec 003's `assignments`; `total_units` is derived from the folder structure, never a config field to maintain (research.md R1) |
| V.5 | < 200 KB first load, low-bandwidth first | ✅ No new dependency (research.md R7); 6 new app pages live under the existing lazy-loaded `src/pages/app/` precedent, never loaded by content pages — verify bundle size in the Art. VII engineering gate before merge |
| V.6 | Cost-controlled infrastructure | ✅ Same self-hosted VPS/Supabase instance; no new infra |
| VI.3 | Real-time features beyond email are Phase 3+ | ✅ No notifications built — explicit Assumption in spec.md ("No notifications") |
| VII | RLS tested, responsive/RTL, Lighthouse; **Docs gate**: a spec changing a student workflow updates the matching guide in the same branch | ✅ RLS matrix extended (data-model.md); ⚠️ **Docs gate is this feature's obligation** — the Student Guide does not yet exist anywhere in the repo; this plan scopes its initial authoring here (research.md R6) since this is the first student-facing feature substantial enough to document, and Article X's own Sync Impact Report names Spec 004 as its natural home |
| VIII.1 | Student data visible only to student, their teacher(s), admin — RLS-enforced | ✅ `unit_progress`/`student_achievements`: student (own rows) + admin (support) only — **not even a teacher** gets access, since coverage/achievements are more private than grades (which teachers do need to see) |
| VIII.2 | Collect the minimum | ✅ No new personal-data columns; all new person-FKs point at the already-collected `profiles.id` |
| VIII.4 | Deletion anonymizes rather than destroys | ✅ No change needed — `unit_progress`/`student_achievements` reference `profiles.id`, which already survives tombstoning per Spec 002's design; this feature adds no new PII |
| IX.2 | Authorize at the database layer, not only UI | ✅ RLS + `SECURITY DEFINER` triggers/RPC; the `StudentDashboardGuard` UI component (Phase 1) is cosmetic only, same disclaimer pattern as Spec 002's `AuthGuard` |
| IX.3 | `verified_teacher` grant is an explicit, audited admin action (Spec 002) | ✅ Unchanged — this feature does not touch `verified_teacher` at all |
| X.1/X.2 | Student Guide must exist and cover platform navigation, joining a class, submitting work, reading grades, and using the dashboard; stay-in-sync obligation | ⚠️ **New obligation, addressed by this plan** — Phase 1 scopes a second Docusaurus docs-plugin instance (`guides`) and the initial Student Guide content, covering the full enumerated topic list (not just this feature's own dashboard slice), since no earlier spec authored it and none of it exists yet |

**No violations requiring justification beyond the two ⚠️ items above**, both of which are new
*obligations* this plan fulfills, not constitutional conflicts. The Student Guide's placement (a
second docs-plugin instance vs. folding into the existing curriculum docs tree) is documented in
[ADR-0009](../../history/adr/0009-separate-docusaurus-docs-instance-for-usage-guides.md) — a
cross-cutting docs-architecture decision with real alternatives, not decided unilaterally without
owner visibility.

**Post-Phase-1 re-check**: Phase 1 design (data-model.md, contracts/) introduces no new
constitutional conflict. V.5 remains a measurable check, not a violation, tracked the same way
Specs 002/003 tracked their own bundle-budget risk.

## Project Structure

### Documentation (this feature)

```text
specs/004-student-dashboard/
├── plan.md                          # This file
├── spec.md                          # Feature specification (3 clarification sessions, FR-001…FR-013)
├── research.md                      # Phase 0 — R1…R7
├── data-model.md                    # Phase 1 — 2 new tables, RLS matrix, triggers, read-only query shapes
├── contracts/
│   └── dashboard-operations.md      # Phase 1 — permitted ops, RPC, 13-item contract test checklist
├── quickstart.md                    # Phase 1 — migration order, guide setup, verification steps, failure modes
└── tasks.md                         # Phase 2 — created by /sp.tasks, NOT by this command
```

### Source Code (repository root)

Same single-Docusaurus-app layout as Specs 002/003 — no `site/` subdirectory, no separate
frontend/backend split. New paths:

```text
src/
├── lib/
│   ├── unitProgress.ts             # self-mark insert (ON CONFLICT DO NOTHING), own-rows read, content-index total_units helper
│   ├── achievements.ts             # static bilingual catalog (4 entries) + earned-achievements read + check_full_coverage_achievement wrapper
│   └── dashboardQueries.ts         # home/assignments/grades/history aggregation queries over Spec 003 tables (research.md's "read-only query shapes")
├── components/
│   ├── StudentDashboardGuard.tsx   # extends AuthGuard's pattern with FR-012's specific teacher/admin-pointer message (not the generic "no access" text)
│   └── DashboardNavLink.tsx        # registered as a `custom-dashboardLink` navbar item (extends src/theme/NavbarItem/ComponentTypes.tsx, mirroring the existing custom-authWidget precedent) — visible only when signed in as a student
├── theme/
│   ├── NavbarItem/
│   │   └── ComponentTypes.tsx      # extended (not new) — registers `custom-dashboardLink` alongside the existing `custom-authWidget`
│   └── DocItem/
│       └── Footer.tsx              # swizzled — "Mark as studied" button on any unit page carrying course_code/unit_no front matter (research.md R5)
└── pages/app/
    └── dashboard/
        ├── index.tsx                # Home — current semester, classes, due-soon (48h-first), recent grades, achievement preview (FR-002, FR-009)
        ├── assignments.tsx          # All published/unsubmitted assignments+quizzes, soonest-due-first (FR-003)
        ├── grades.tsx                # Every returned grade, no average (FR-004)
        ├── progress.tsx              # Per-course coverage fraction + semester-level figure; self-mark control (FR-005, FR-006)
        ├── history.tsx               # Past semesters, frozen, grouped (FR-007)
        └── achievements.tsx          # Full catalog, earned/unearned, "how to reach it" (FR-009)

guides/                              # NEW — second Docusaurus docs-plugin instance (research.md R6)
└── student-guide/
    ├── index.mdx                    # overview + nav
    ├── navigate-the-platform.mdx
    ├── join-a-class.mdx
    ├── submit-work.mdx
    ├── read-grades.mdx
    └── use-the-dashboard.mdx        # this feature's own six areas

supabase/
└── migrations/                      # numbered after Spec 003's 0023
    # 0024_unit_progress.sql, 0025_unit_progress_sync_triggers.sql,
    # 0026_student_achievements.sql, 0027_achievement_triggers.sql

tests/
├── rls/                              # NEW — extends Spec 003's matrix; see data-model.md's
│                                      # access-control matrix and contracts/dashboard-operations.md's checklist
└── e2e/dashboard-{home,assignments,grades,progress,history,achievements}.spec.ts,
    unit-self-mark.spec.ts, dashboard-rtl.spec.ts
```

**Structure Decision**: Extend the existing root-level Docusaurus app exactly as Specs 002/003
did — flat pages under `src/pages/app/dashboard/`, no nested route segments, matching the
established `?classId=…`-style query-param convention where a page needs one (none of these six
pages need any — every dashboard page is scoped to "the signed-in student," not a specific
class/assignment id). The one structural addition is the `guides` docs-plugin instance
(research.md R6), kept deliberately separate from the semester-rooted curriculum docs instance so
neither's sidebar/search tuning interferes with the other. Database artifacts continue in the
existing top-level `supabase/` directory, numbered to continue directly after Spec 003's `0023`.

## Phase 0 — Research (complete)

See [research.md](./research.md). Seven questions resolved: total-unit-count derivation without
duplicating Git content into Postgres (R1), the achievement-granting split between pure
server-side triggers and one client-assisted, server-verified RPC (R2), unifying "how a unit was
completed" into a single `unit_progress` table populated from three write paths (R3), keeping the
fixed achievement catalog as static code rather than a table (R4), the swizzled-theme-component
approach for the unit-page "mark as studied" control (R5), the second-docs-instance decision for
the Student Guide (R6), and confirming no new npm dependency is needed (R7). No `NEEDS
CLARIFICATION` markers remain.

One finding materially shaped the design: **the four achievements are not uniformly
architectable** — three have both sides of their triggering condition natively in Postgres
(first submission, study streak, on-time class completion) and can be pure, event-driven
`SECURITY DEFINER` triggers with no client involvement at all, while the fourth (100% course
coverage) has a denominator that only exists in Git, forcing a deliberate, narrowly-scoped,
explicitly-justified exception to the "server computes everything" default (research.md R2).

## Phase 1 — Design & Contracts (complete)

- [data-model.md](./data-model.md) — 2 new entities (`unit_progress`, `student_achievements`),
  their RLS policies, 7 new trigger/helper/RPC functions, the full access-control matrix, and the
  8 existing-table read-only query shapes that back the other five dashboard areas.
- [contracts/dashboard-operations.md](./contracts/dashboard-operations.md) — permitted client
  operations with expected denial shapes, and a 13-item contract test checklist covering every
  functional requirement and both zero-assignment-class and self-marking-scope clarifications.
- [quickstart.md](./quickstart.md) — migration order, Student Guide setup verification, a
  10-item end-to-end verification checklist, and the three failure modes most likely to bite
  (missing `SECURITY DEFINER`, the client-initiated coverage-achievement call never being wired
  up, and docs-plugin id collision).

Agent context refreshed via `.specify/scripts/bash/update-agent-context.sh claude`.

## Complexity Tracking

No constitutional violations require justification. Three deliberate complexity choices are
recorded for review:

| Choice | Why needed | Simpler alternative rejected because |
|---|---|---|
| `check_full_coverage_achievement` trusts the client for `p_total_units` (research.md R2) | The only place in this feature where a Git-derived number (total units) must inform a server-side grant decision, and mirroring that count into Postgres would need its own build/deploy sync mechanism | Mirroring `total_units` into a Postgres table would make this one achievement a pure trigger too, but adds an ongoing sync-pipeline obligation for a single low-stakes badge check — the blast radius of a wrong client-supplied number here is one badge's timing, never a grade or another student's data |
| `unit_progress` as a real, trigger-populated table rather than a read-time `UNION` view over three sources | Directly enforces FR-006's "exactly once" via one `unique` constraint, and keeps the dashboard's read path (SC-008's 2s p95 budget) to a single-table `SELECT` instead of a three-way join on every load | A view avoids new write-time triggers, but re-derives the same de-duplication logic on every read instead of once at write time — working against the performance budget for no correctness benefit |
| Second Docusaurus docs-plugin instance (`guides`) rather than folding guide content into the existing curriculum docs tree | The Student Guide's navigational shape (guide topic → guide topic) is fundamentally different from the curriculum's semester → course → unit hierarchy that the existing sidebar/local-search tuning is built around | Folding it in risks confusing Spec 001's SC-003 promise that the curriculum catalog is the site's home, and would require re-tuning search/sidebar config to accommodate two incompatible navigational shapes in one instance |

## Risks

1. **A crafted `unit_progress` INSERT bypasses the `WITH CHECK` clause.** Blast radius: a student
   forges `method='assignment'`/`'quiz'` rows for units they never actually completed, inflating
   their own coverage figure and potentially triggering `full_course_coverage` or the study-streak
   achievement dishonestly. Mitigation: the RLS test suite must assert the negative case (forged
   `method`/`student_id` raises or is silently rejected, not silently accepted) and run in CI,
   exactly as Spec 003's `class-guard-trigger.test.mjs` does for `classes`.
2. **A sync/grant trigger function is deployed without `SECURITY DEFINER`, or with it accidentally
   dropped in a later migration.** Blast radius: coverage/achievements silently stop updating from
   grading or quiz attempts (self-marking, a same-user path, keeps working — see quickstart.md's
   failure-mode #1), which is easy to miss in manual testing since the dashboard still "looks
   fine" for whichever paths a tester happens to exercise. Mitigation: an RLS/integration test that
   grades a submission as a *different* user than the student and asserts the resulting
   `unit_progress` row exists — this is exactly the scenario a same-user manual test would never
   catch.
3. **New app pages or the `guides` docs instance regress the Art. V.5 bundle budget.** Blast
   radius: slower content pages for low-bandwidth users, the same risk Specs 002/003 flagged for
   their own new bundles. Mitigation: measure in the engineering gate before merge, same precedent;
   no new dependency is added (research.md R7), which keeps this risk lower than Spec 003's
   `exceljs` addition.

## Follow-ups

- Teacher Guide authoring (Constitution Art. X.1) is explicitly **out of this feature's scope** —
  spec.md's own Assumptions state "Teacher-side equivalent is a separate feature," and Article
  VII's Docs gate only obligates the guide matching whichever workflow a spec actually changes.
  Whichever future spec first changes teacher-facing workflow (a teacher dashboard, most likely)
  owns the Teacher Guide's initial authoring.
- The Student Guide's placement as a second Docusaurus docs-plugin instance (research.md R6) is
  documented in [ADR-0009](../../history/adr/0009-separate-docusaurus-docs-instance-for-usage-guides.md)
  (Proposed).
- `check_full_coverage_achievement`'s client-trust exception (research.md R2) is a deliberate,
  narrowly-scoped design choice, not a precedent to reuse casually elsewhere — any future feature
  wanting a similar client-assisted server verification should re-justify it against its own blast
  radius, not cite this one as blanket cover.
- Deferred as implementation detail, consistent with Specs 002/003's precedent: dashboard-wide
  pagination at multi-year scale beyond SC-008's 8-semester/6-classes-per-semester target, and
  observability beyond what the RLS/e2e suites already assert.

---

📋 **Architectural decision documented**: placing the Student Guide (and, later, the Teacher
Guide) in a second, separate Docusaurus docs-plugin instance rather than folding guide content
into the existing curriculum docs tree — see
[ADR-0009](../../history/adr/0009-separate-docusaurus-docs-instance-for-usage-guides.md)
(Proposed).
