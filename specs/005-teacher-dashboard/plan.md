# Implementation Plan: Teacher Dashboard, Feedback & Book Improvement Loop

**Branch**: `005-teacher-dashboard` | **Date**: 2026-07-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-teacher-dashboard/spec.md`

## Summary

Give every signed-in teacher a dashboard home (Overview) and three genuinely new capabilities —
a teaching diary, structured per-activity feedback, and a book-wide "suggest an improvement"
loop moderated by an admin — plus read-only Analytics over data Spec 003 already records. Two of
the six areas named in FR-001 (**Classes**, **Grading**) already exist in full as Spec 003's
`/app/classes/*` pages (roster, gradebook, grading queue, assignment authoring, quiz management)
and are reused verbatim as navigation targets, not rebuilt. Only **Overview**, **My Teaching
Log**, **Feedback & Suggestions**, and **Analytics** (including the per-student drill-down) are
new pages; only three new tables (`teaching_log_entries`, `activity_feedback`,
`improvement_suggestions`) are new storage — Overview and Analytics are pure reads/aggregations
over Specs 002/003's existing schema.

Two clarify rounds (2026-07-24, spec.md `## Clarifications`) closed a genuine cross-spec conflict:
FR-011's "unit coverage" cannot read Spec 004's `unit_progress` table, whose RLS explicitly
excludes teachers by design ("coverage is more private here than grades"). This plan computes
teacher-facing unit coverage independently, from data teachers already see (submissions, grades,
quiz attempts), leaving `unit_progress` and its RLS completely untouched.

Technical approach: extend Specs 002/003's schema in the same self-hosted Supabase Postgres,
reached directly from the browser with RLS as the sole authorization layer (Constitution Art.
V.1/V.2, IX.2) — no application server, no new Edge Functions. Three new tables plus a status-
transition guard trigger for `improvement_suggestions` cover every new write; Overview and
Analytics reuse existing query-composition idioms already proven in this codebase (`gradebookExport.ts`'s
grades+`quiz_best_scores` merge; Spec 004's `fetchTotalUnitsForCourse` helper). This feature also
authors the project's **Teacher Guide** (Constitution Article X), the second and final guide named
in Article X's Sync Impact Report, reusing the `guides` Docusaurus docs-plugin instance Spec 004
already built (ADR-0009) — no new plugin configuration needed.

## Technical Context

**Language/Version**: TypeScript 5.6 on Node 22+ (unchanged from Specs 002–004)
**Primary Dependencies**: Docusaurus 3.10 (existing), `@supabase/supabase-js` ^2 (existing), React 18.3 (existing) — **no new dependency** (research.md R7: Analytics renders as plain CSS/SVG bars, not a charting library, per Art. V.5's bundle budget, same precedent as Spec 004 R7)
**Storage**: Supabase Postgres — 3 new tables (`teaching_log_entries`, `activity_feedback`, `improvement_suggestions`) extending Specs 002/003's schema. Course/unit content stays in Git (Art. V.1); every course/unit reference on these tables (`course_code`, `unit_no`, `source_kind`) is an unvalidated pointer, exactly like Spec 003's `assignments` (research.md R2). Spec 004's `unit_progress` table is explicitly **not** read by this feature (spec.md Clarifications, 2026-07-24) — FR-011's coverage figure is derived independently from `submissions`/`grades`/`quiz_attempts` instead.
**Testing**: Vitest (unit + RLS matrix, extends `tests/rls/`), Playwright (e2e, extends `tests/e2e/`) — both already configured
**Target Platform**: Same self-hosted VPS as Specs 001–004 (`www.a2ahs.com` + `api.a2ahs.com` → Kong → self-hosted Supabase, ADR-0006/ADR-0007). No new infrastructure.
**Project Type**: Web — static frontend + self-hosted backend; no application server (unchanged). Zero Edge Functions; the one new trigger (`enforce_suggestion_status_transition()`) is a plain `SECURITY DEFINER`-free `BEFORE UPDATE` trigger, reached via ordinary RLS-authorized PostgREST calls.
**Performance Goals**: Reuses Spec 003 SC-005's existing 5-second p95 budget for class actions at 200 students (spec.md Assumptions) — Analytics and Overview, built on the same underlying data, target the same budget rather than defining a new one.
**Constraints**: RLS-only authorization (Art. V.2/IX.2); `course_code`/`unit_no`/`source_kind` on the three new tables are unvalidated pointers into Git content, never duplicated (Art. V.1/V.4); FR-011's unit coverage MUST NOT read `unit_progress` — computed independently instead, preserving Spec 004's teacher-exclusion RLS untouched (spec.md Clarifications); FR-007 has no "book's estimate" comparison — dropped entirely per clarification, since no per-activity duration field exists anywhere in the content schema (only a per-file, reading-time `est_reading_minutes`, Spec 001); every person-referencing FK points at `profiles(id)`, never `auth.users(id)` (Spec 002's tombstone-survival design); bilingual EN/UR incl. RTL for every area (Art. III.8, FR-012); the Teacher Guide (Art. X.1/X.2) must be authored in this same branch, reusing the existing `guides` docs-plugin instance (ADR-0009) with zero new plugin config.
**Scale/Scope**: 3 new tables, 1 new guard trigger (+1 column-restriction companion), 7 new app pages (5 under `src/pages/app/teacher/`, 2 under `src/pages/app/admin/`), 1 swizzled theme component extended (not newly created — `theme/DocItem/Footer.tsx` gains teacher-facing branches alongside the existing student "Mark as studied" control), 1 new navbar link component (`TeacherDashboardNavLink.tsx`), 1 new Teacher Guide content tree (`guides/teacher-guide/`) in the existing `guides` docs instance.

## Constitution Check

*GATE: evaluated against Constitution v2.4.0. Re-checked after Phase 1 design below.*

| Article | Requirement | Status |
|---|---|---|
| V.1 | Content in Git; app state in self-hosted Supabase; static site holds no secrets | ✅ 3 new tables only; course/unit content stays out of Postgres — every reference is an unvalidated pointer (research.md R2) |
| V.2 | Security in the backend; sensitive data protected by RLS, not hidden pages | ✅ All 3 new tables RLS-enabled; `improvement_suggestions`' status transitions enforced by a `BEFORE UPDATE` guard trigger, not client discipline |
| V.3 | Roles/`verified_teacher` per Spec 002; teacher role grants peer-teaching only | ✅ This feature only *consumes* `is_admin()`/`current_profile_id()` — it does not touch roles. The moderation queue and aggregated-feedback view are admin-only (FR-005, FR-008); a teacher's own tools stay peer-teaching-scoped |
| V.4 | Adding a course must not require platform-code change | ✅ `course_code`/`unit_no`/`source_kind` on all 3 new tables are unvalidated pointers, same convention as Spec 003's `assignments` |
| V.5 | < 200 KB first load, low-bandwidth first | ✅ No new dependency (research.md R7); 7 new app pages live under the existing lazy-loaded `src/pages/app/` precedent — verify bundle size in the Art. VII engineering gate before merge |
| V.6 | Cost-controlled infrastructure | ✅ Same self-hosted VPS/Supabase instance; no new infra |
| VI.3 | Real-time features beyond email are Phase 3+ | ✅ No notifications built — explicit Assumption in spec.md ("No notifications") |
| VII | RLS tested, responsive/RTL, Lighthouse; **Docs gate**: a spec changing a teacher workflow updates the matching guide in the same branch | ✅ RLS matrix extended (data-model.md); ⚠️ **Docs gate is this feature's obligation** — the Teacher Guide does not yet exist anywhere in the repo; this plan scopes its initial authoring here (research.md R6), reusing ADR-0009's `guides` instance with zero new plugin config, since Article X's own Sync Impact Report names Spec 005 as the Teacher Guide's natural home |
| VIII.1 | Student data visible only to student, their teacher(s), admin — RLS-enforced | ✅ FR-011's per-class drill-down/coverage is scoped to the teacher's *own* class only (SC-004); Analytics never surfaces an at-risk flag on the student's own dashboard (FR-010, mirrors Spec 004's FR-010 in the opposite direction). **`unit_progress` remains untouched by this feature** — Spec 004's "not even a teacher gets access" boundary is preserved exactly (spec.md Clarifications, 2026-07-24) |
| VIII.2 | Collect the minimum | ✅ No new personal-data columns; all new person-FKs point at the already-collected `profiles.id` |
| VIII.4 | Deletion anonymizes rather than destroys | ✅ No change needed — the 3 new tables reference `profiles.id`, which already survives tombstoning per Spec 002's design |
| IX.2 | Authorize at the database layer, not only UI | ✅ RLS + the one guard trigger; `TeacherDashboardGuard` (Phase 1) is cosmetic only, same disclaimer pattern as Specs 002/004's guards |
| IX.3 | `verified_teacher` grant is an explicit, audited admin action (Spec 002) | ✅ Unchanged — this feature does not touch `verified_teacher` at all |
| X.1/X.2 | Teacher Guide must exist and cover class/assignment/grading workflows, the teacher dashboard, and what `verified_teacher` unlocks; stay-in-sync obligation | ⚠️ **New obligation, addressed by this plan** — Phase 1 authors `guides/teacher-guide/` in the existing `guides` docs-plugin instance (no new plugin needed — ADR-0009 already built it generically for this) |

**No violations requiring justification beyond the two ⚠️ items above**, both of which are new
*obligations* this plan fulfills, not constitutional conflicts — the same posture Spec 004's plan
took for the Student Guide.

**Post-Phase-1 re-check**: Phase 1 design (data-model.md, contracts/) introduces no new
constitutional conflict. V.5 remains a measurable check, not a violation, tracked the same way
Specs 002–004 tracked their own bundle-budget risk.

## Project Structure

### Documentation (this feature)

```text
specs/005-teacher-dashboard/
├── plan.md                          # This file
├── spec.md                          # Feature specification (2 clarification sessions, FR-001…FR-014)
├── checklists/
│   └── requirements.md              # Spec quality checklist (all items pass)
├── research.md                      # Phase 0 — R1…R8
├── data-model.md                    # Phase 1 — 3 new tables, RLS matrix, triggers, read-only query shapes
├── contracts/
│   └── teacher-dashboard-operations.md  # Phase 1 — permitted ops, denial shapes, contract test checklist
├── quickstart.md                    # Phase 1 — migration order, guide setup, verification steps, failure modes
└── tasks.md                         # Phase 2 — created by /sp.tasks, NOT by this command
```

### Source Code (repository root)

Same single-Docusaurus-app layout as Specs 002–004 — no `site/` subdirectory, no separate
frontend/backend split. New paths:

```text
src/
├── lib/
│   ├── teacherOverview.ts           # per-class ungraded counts, soonest-due assignments, recent-activity feed (FR-002)
│   ├── teachingLog.ts               # log entry create/list (FR-006), most-recent-first
│   ├── activityFeedback.ts          # upsert-by-(teacher,course,unit,source_kind), own-record read, admin aggregate read (FR-007, FR-008)
│   ├── suggestions.ts               # file/list-own (FR-003, FR-004), admin list+filter+transition (FR-005)
│   └── teacherAnalytics.ts          # per-class distribution/trend/unit-average/at-risk (FR-009, FR-010), per-student drill-down (FR-011) — reuses gradebookExport.ts's grades+quiz_best_scores merge pattern and Spec 004's fetchTotalUnitsForCourse
├── components/
│   ├── TeacherDashboardGuard.tsx    # mirrors StudentDashboardGuard's pattern for `/app/teacher/*` — FR-013's opposite-direction denial, teacher-specific notice
│   └── TeacherDashboardNavLink.tsx  # registered as `custom-teacherDashboardLink` navbar item (extends src/theme/NavbarItem/ComponentTypes.tsx) — visible only when signed in as a teacher
├── theme/
│   ├── NavbarItem/
│   │   └── ComponentTypes.tsx      # extended (not new) — registers `custom-teacherDashboardLink` alongside `custom-authWidget`/`custom-dashboardLink`
│   └── DocItem/
│       └── Footer.tsx               # extended (not new) — adds a teacher-only "Suggest improvement" control (FR-003) and, on activity-bearing unit pages, a "Give feedback on this activity" control (FR-007), alongside the existing student-only "Mark as studied" branch
└── pages/app/
    ├── teacher/
    │   ├── index.tsx                # Overview — per-class ungraded counts, 5 soonest-due assignments, 10-item recent-activity feed, "caught up" empty state (FR-002)
    │   ├── teaching-log.tsx         # My Teaching Log — log form + most-recent-first list, each entry offering "give feedback" (FR-006, FR-007)
    │   ├── feedback-suggestions.tsx # Feedback & Suggestions area — "My Suggestions" list (FR-004) + the teacher's own filed Activity Feedback history
    │   ├── analytics.tsx            # Analytics — one class (?classId=): distribution, trend, unit average, at-risk flags (FR-009, FR-010)
    │   └── student.tsx              # Student drill-down (?classId=&studentId=): submissions, grades, coverage for that class only (FR-011)
    └── admin/
        ├── suggestions.tsx          # Moderation queue — filter by status/category/course, transition + note (FR-005)
        └── feedback.tsx             # Aggregated Activity Feedback per activity — average rating + issue notes (FR-008)

guides/
└── teacher-guide/                   # NEW content in the EXISTING `guides` docs-plugin instance (ADR-0009) — no docusaurus.config.ts change
    ├── index.mdx                    # overview + nav
    ├── manage-classes-and-assignments.mdx   # points at Spec 003's existing /app/classes/* workflows
    ├── grade-submissions.mdx
    ├── use-the-teacher-dashboard.mdx # this feature's own areas
    ├── give-feedback-and-suggest-improvements.mdx
    └── verified-teacher-material.mdx # what verified_teacher unlocks (Spec 002)

supabase/
└── migrations/                      # numbered after Spec 004's 0027
    # 0028_teaching_log_entries.sql, 0029_activity_feedback.sql,
    # 0030_improvement_suggestions.sql, 0031_improvement_suggestions_transitions.sql

tests/
├── rls/                              # NEW — extends the existing matrix; see data-model.md's
│                                      # access-control matrix and contracts/teacher-dashboard-operations.md's checklist
└── e2e/teacher-{overview,teaching-log,feedback-suggestions,analytics,student-drilldown}.spec.ts,
    suggestion-moderation.spec.ts, teacher-dashboard-rtl.spec.ts
```

**Structure Decision**: Extend the existing root-level Docusaurus app exactly as Specs 002–004
did — flat pages under `src/pages/app/teacher/` and `src/pages/app/admin/`, using the established
`?classId=`/`?studentId=`-style query-param convention for Analytics and the student drill-down
(matching `ClassContext`'s existing per-class scoping idiom from Spec 003's `roster.tsx`/`queue.tsx`).
**Classes and Grading are deliberately not rebuilt**: FR-001 names them as dashboard areas, but
Spec 003's `/app/classes/*` pages (`index.tsx`, `roster.tsx`, `queue.tsx`, `gradebook.tsx`,
`assignment.tsx`, `assignment-new.tsx`, `quiz.tsx`) already fully implement both — the new
Overview page links out to them rather than duplicating their functionality (see Complexity
Tracking). The Teacher Guide slots into the existing `guides` docs-plugin instance exactly as
ADR-0009 anticipated ("a future spec's obligation... zero new plugin/config work — only new
content folders").

## Phase 0 — Research (complete)

See [research.md](./research.md). Eight questions resolved: the "Suggest improvement"/"Give
feedback" widget's slug/section-anchor/locale capture mechanism with no new dependency (R1),
keeping course/unit references as unvalidated pointers consistent with Spec 003 (R2), computing
FR-011's unit coverage independently of Spec 004's `unit_progress` (R3), reusing
`gradebookExport.ts`'s existing grades+`quiz_best_scores` merge pattern for Analytics instead of a
new SQL view (R4), enforcing `improvement_suggestions`' one-directional status state machine via a
guard trigger (R5), placing the Teacher Guide in the existing `guides` docs-plugin instance with
zero new config (R6), confirming no new npm dependency is needed (R7), and migration numbering
(R8). No `NEEDS CLARIFICATION` markers remain — both of spec.md's clarify rounds are complete.

One finding materially shaped the design: **Classes and Grading are not net-new build** — they
already exist in full as Spec 003's `/app/classes/*` pages. This feature's actual new surface is
narrower than FR-001's six-area list suggests at first read: four areas (Overview, My Teaching
Log, Feedback & Suggestions, Analytics) are genuinely new; two are navigation entries to
already-shipped functionality.

## Phase 1 — Design & Contracts (complete)

- [data-model.md](./data-model.md) — 3 new entities (`teaching_log_entries`, `activity_feedback`,
  `improvement_suggestions`), their RLS policies, the status-transition guard trigger, the full
  access-control matrix, and the read-only query shapes backing Overview and Analytics.
- [contracts/teacher-dashboard-operations.md](./contracts/teacher-dashboard-operations.md) —
  permitted client operations with expected denial shapes, and a contract test checklist covering
  every functional requirement including both clarification-resolved edge cases (FR-011's
  independent coverage source, FR-007's dropped estimate comparison).
- [quickstart.md](./quickstart.md) — migration order, Teacher Guide setup verification, an
  end-to-end verification checklist, and the failure modes most likely to bite.

Agent context refreshed via `.specify/scripts/bash/update-agent-context.sh claude`.

## Complexity Tracking

No constitutional violations require justification. Three deliberate complexity choices are
recorded for review:

| Choice | Why needed | Simpler alternative rejected because |
|---|---|---|
| Classes/Grading areas reuse Spec 003's `/app/classes/*` pages verbatim, with no new teacher-dashboard-scoped versions | Those pages already fully implement roster management, grading, gradebook export, and quiz authoring — rebuilding them under `/app/teacher/` would be pure duplication | A parallel "teacher dashboard" copy of the same functionality would violate Article VI's scope discipline (features not in an approved spec are out of scope) for zero functional gain, and would create two divergent code paths for the same data |
| `improvement_suggestions`' status transitions enforced by a `BEFORE UPDATE` guard trigger, not app-layer discipline alone | Key Entities describes a strict one-directional state graph (submitted → under review → accepted/rejected → published); only a database-layer check can guarantee it survives a crafted client request (Art. IX.2) | Relying on the client UI to only ever present "legal" transition buttons is exactly the "hidden page" anti-pattern Art. V.2 rules out — a direct PostgREST call could otherwise jump straight to `published` or move backward |
| FR-011's unit coverage computed independently from `submissions`/`grades`/`quiz_attempts`, not from Spec 004's `unit_progress` | Spec 004's `unit_progress` RLS explicitly denies teachers any access, by deliberate design ("coverage is more private here than grades") — reusing it would either require reversing that decision or reading a table this role cannot access | Relaxing `unit_progress`'s RLS to admit teachers was considered (clarification session, 2026-07-24) and rejected — it would reverse a documented Spec 004 privacy decision without its own justification/ADR, for a feature whose own spec explicitly scoped coverage to teacher-visible data only |

## Risks

1. **A crafted `improvement_suggestions` UPDATE bypasses the status-transition guard**, e.g.
   jumping directly from `submitted` to `published`, or moving `rejected` back to `under_review`.
   Blast radius: a fabricated status could misrepresent a suggestion's real review state to the
   filing teacher. Mitigation: the RLS/trigger test suite must assert every illegal transition is
   rejected, not just the legal path — mirroring Spec 003's `class-guard-trigger.test.mjs` pattern.
2. **FR-011's independently-derived coverage figure and Spec 004's `unit_progress`-based figure
   drift in definition over time**, since they are two deliberately separate implementations of a
   similar concept (by design, per the 2026-07-24 clarification that rejected merging them). Blast
   radius: a student's self-reported coverage percentage (Spec 004) and their teacher's view of the
   same student's coverage (this feature) could show different numbers for defensible reasons
   (self-marking vs. only-graded-work), which could read as a bug if not documented. Mitigation:
   `data-model.md` and both features' Teacher/Student Guides note explicitly that these are
   different measures by design, not a data-consistency bug.
3. **New app pages, the swizzled `Footer.tsx` extension, or Teacher Guide content regress the Art.
   V.5 bundle budget.** Blast radius: slower content pages for low-bandwidth users, the same risk
   Specs 002–004 flagged for their own new bundles. Mitigation: measure in the engineering gate
   before merge, same precedent; no new dependency is added (research.md R7).

## Follow-ups

- **Admin navbar entries remain unadded** for `/app/admin/suggestions` and `/app/admin/feedback`,
  consistent with the pre-existing gap where `/app/admin/audit` and `/app/admin/users` (Spec 002)
  also have no navbar entry today — this feature does not introduce or worsen that gap, and closing
  it for all four admin pages at once is better scoped as its own small follow-up than done
  piecemeal here.
- **Spec 006 (future authoring pipeline)** consumes `status='accepted'` suggestions as its input
  signal — this feature stops at recording `accepted`/`published` with no automated linkage, per
  spec.md's own Assumptions.
- Deferred as implementation detail, consistent with Specs 002–004's precedent: pagination for
  Overview's recent-activity feed and Analytics at multi-year/multi-class scale beyond the
  200-student ceiling Spec 003 SC-005 already targets, and observability beyond what the RLS/e2e
  suites already assert.
