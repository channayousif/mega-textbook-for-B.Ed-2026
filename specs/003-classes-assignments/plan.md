# Implementation Plan: Virtual Classes, Assignments & Assessments

**Branch**: `003-classes-assignments` | **Date**: 2026-07-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-classes-assignments/spec.md`

## Summary

Give teachers a virtual class (join-code roster) and let them publish assignments straight from a
textbook unit's activity, formative, or summative content — or a custom prompt, or an
auto-graded multiple-choice practice quiz. Students submit text/files (editable until the due
date, then locked), teachers grade and return results from a single queue, and verified teachers
can consult the book's official answer key while grading. Teachers can export a class's gradebook
as a correctly-Urdu-rendering spreadsheet, and archiving a class (manually, or automatically if
its teacher becomes ineligible) is reversible.

Technical approach: extend Spec 002's schema in the same self-hosted Supabase Postgres, reached
directly from the browser with RLS as the sole authorization layer (Constitution Art. V.1/V.2,
IX.2) — no application server, no new Edge Functions. Two `SECURITY DEFINER` RPCs cover the two
operations that must run with elevated privilege but are triggered by an ordinary user: joining a
class by code (so join codes are never browsable) and scoring a quiz attempt (so correct answers
never reach the client). Answer keys and quiz correct-answers live exclusively in Postgres, never
in the Git-tracked static bundle — Spec 001 already enforces this categorically
(`scripts/check-no-answer-keys.mjs`). Gradebook export is generated client-side as `.xlsx`.

## Technical Context

**Language/Version**: TypeScript 5.6 on Node 22+ (repo `engines: ">=22"`, bumped from 20 in PR #3 for `@supabase/supabase-js`'s WebSocket requirement)
**Primary Dependencies**: Docusaurus 3.10 (existing), `@supabase/supabase-js` ^2 (existing), React 18.3 (existing); **new**: `exceljs` (gradebook export, FR-014/R5)
**Storage**: Supabase Postgres — 8 new tables (`classes`, `enrollments`, `assignments`, `submissions`, `grades`, `quiz_items`, `quiz_attempts`, `answer_keys`) extending Spec 002's `profiles`; one new private Supabase Storage bucket (`submissions`, 10 MB/type-limited). Course/unit content stays in Git (Constitution Art. V.1) — referenced by `course_code`/`unit_no` only, never duplicated.
**Testing**: Vitest (unit + RLS matrix, extends `tests/rls/`), Playwright (e2e, extends `tests/e2e/`) — both already configured
**Target Platform**: Same self-hosted VPS as Spec 001/002 — static site (`textbook.com.pk`) + `api.textbook.com.pk` → Kong → self-hosted Supabase (ADR-0006/ADR-0007). No new infrastructure.
**Project Type**: Web — static frontend + self-hosted backend; no application server (unchanged from Spec 002). This feature adds **zero Edge Functions** — every write path is either an ordinary RLS-authorized PostgREST call or a `SECURITY DEFINER` RPC using the caller's own JWT (research.md R2), unlike Spec 002's two Edge Functions, which existed specifically because `auth.admin.*` needs the service-role key.
**Performance Goals**: SC-001 (empty class → published assignment in <2 min, ≤3 clicks after picking the unit item); SC-005 (submit/grading-queue/roster actions <5 s p95 at 200 students/class, 2026-07-19 clarification)
**Constraints**: RLS-only authorization (Art. V.2/IX.2, no client-trusted checks); answer keys and `quiz_items.correct_option` MUST NOT enter the Git-tracked bundle (Art. V.2, enforced today by `scripts/check-no-answer-keys.mjs`) — live only in Postgres, gated by `is_verified_teacher()`/`is_admin()` (reused unmodified from Spec 002); bilingual EN/UR incl. RTL (Art. III.8, FR-016); uploads ≤10 MB, allowlisted MIME types (FR-009); deadlines evaluated as PKT instants (FR-008, research.md R6); every person-referencing FK points at `profiles(id)`, never `auth.users(id)` (Spec 002's tombstone-survival design, FR-019/FR-021)
**Scale/Scope**: classes up to 200 students (SC-005); 8 new tables, 2 new `SECURITY DEFINER` RPCs, 1 new Storage bucket, 4 new guard/enforcement triggers; new app pages under `src/pages/app/` for class management, assignment authoring, submission, grading queue, and gradebook export

## Constitution Check

*GATE: evaluated against Constitution v2.3.0. Re-checked after Phase 1 design below.*

| Article | Requirement | Status |
|---|---|---|
| V.1 | Content in Git; app state in self-hosted Supabase; static site holds no secrets | ✅ All 8 new tables in Supabase; no service-role key needed anywhere in this feature — see research.md R2 |
| V.2 | Security in the backend; answer keys/grades protected by RLS, not hidden pages | ✅ `answer_keys` and `quiz_items.correct_option` gated by `is_verified_teacher()`/`is_admin()`; Spec 001's `check-no-answer-keys.mjs` build gate continues to guarantee nothing restricted reaches the static bundle |
| V.3 | Roles/`verified_teacher` per Spec 002; teacher role grants peer-teaching only | ✅ This feature only *consumes* `is_admin()`/`is_verified_teacher()`/`current_profile_id()` — it does not redefine roles or the capability grant |
| V.4 | Adding a course must not require platform-code change | ✅ `classes`/`assignments` reference `course_code`/`unit_no` as free-text pointers, validated client-side against the existing build-time catalog; no per-course code added |
| V.5 | < 200 KB first load, low-bandwidth first | ⚠️ New app pages live under `src/pages/app/` (same lazy-load precedent as Spec 002's auth bundle, never loaded by content pages); `exceljs` is dynamically imported only on the gradebook-export action, not the base app chunk — verify in the Art. VII engineering gate before merge |
| V.6 | Cost-controlled infrastructure | ✅ Same self-hosted VPS/Supabase instance; no new infra, no metered vendor tier |
| VI.3 | Real-time features beyond email are Phase 3+ | ✅ No notifications/live features built — explicit Assumption in spec.md |
| VII | RLS tested, responsive/RTL, Lighthouse | ✅ `tests/rls/` extended with the matrix in data-model.md; Playwright e2e extended |
| VIII.1 | Student data visible only to student, their teacher(s), admin — RLS-enforced | ✅ Full access-control matrix in data-model.md; SC-004 negative-test checklist in contracts/classes-operations.md §H |
| VIII.2 | Collect the minimum | ✅ No new personal-data columns; all new person-FKs point at the already-collected `profiles.id` |
| VIII.4 | Deletion anonymizes rather than destroys | ✅ FR-019: `grades`/`submissions` keep referencing the tombstoned `profiles` row (`full_name IS NULL`) exactly as Spec 002's design already guarantees — no schema change needed on that side |
| IX.2 | Authorize at the database layer, not only UI | ✅ RLS + guard triggers + two `SECURITY DEFINER` RPCs; UI gating is cosmetic only |
| IX.3 | `verified_teacher` grant is an explicit, audited admin action (Spec 002) | ✅ Unchanged — this feature only reads the capability to gate `answer_keys`/`quiz_items` |

**No violations.** Two deliberate complexity choices are recorded in Complexity Tracking below,
not as constitutional exceptions but for design-review visibility.

**Post-Phase-1 re-check**: Phase 1 design (data-model.md, contracts/) introduces no new
constitutional conflict. V.5 remains a measurable check, not a violation — tracked the same way
Spec 002 tracked its own bundle-budget risk.

## Project Structure

### Documentation (this feature)

```text
specs/003-classes-assignments/
├── plan.md                          # This file
├── spec.md                          # Feature specification (8 clarifications, FR-001…FR-022)
├── research.md                      # Phase 0 — R1…R9
├── data-model.md                    # Phase 1 — tables, RLS matrix, triggers, state transitions
├── contracts/
│   └── classes-operations.md        # Phase 1 — permitted ops, RPCs, contract test checklist
├── quickstart.md                    # Phase 1 — setup, verification, failure modes
└── tasks.md                         # Phase 2 — created by /sp.tasks, NOT by this command
```

### Source Code (repository root)

Same single-Docusaurus-app layout as Spec 002 — no `site/` subdirectory, no separate
frontend/backend split. New paths:

```text
src/
├── lib/
│   ├── classes.ts                  # class CRUD + join_class_by_code wrapper
│   ├── assignments.ts              # assignment CRUD, publish/unpublish
│   ├── submissions.ts              # submit/resubmit, Storage upload wrapper
│   ├── grading.ts                  # grading queue query, grade/return, edit
│   ├── quiz.ts                     # submit_quiz_attempt wrapper, best-score reads
│   └── gradebookExport.ts          # exceljs-based .xlsx generation (dynamically imported)
├── contexts/
│   └── ClassContext.tsx            # useClassRole()/useQueryParam() hooks — role-in-class per classId
└── pages/app/
    └── classes/
        ├── index.tsx                # teacher: class list + create; student: joined classes + join-by-code
        ├── roster.tsx                # ?classId=… — roster, join-code reissue/revoke, archive/reactivate/remove/restore
        ├── assignments.tsx           # ?classId=… — list (teacher: all; student: published only)
        ├── assignment-new.tsx        # ?classId=… — pick unit activity/formative/summative, or custom, or quiz
        ├── assignment.tsx            # ?classId=…&assignmentId=… — student: view+submit/resubmit; teacher: details+publish toggle
        ├── queue.tsx                 # ?classId=…&assignmentId=… — teacher: grading queue (incl. "missing")
        ├── quiz.tsx                  # ?classId=…&assignmentId=… — student: take/retake; teacher: best-score results
        └── gradebook.tsx             # ?classId=… — teacher: export button
```

**Routing correction (found during T003/T019 implementation):** the tree above originally used
bracket-notation directories (`[classId]/`, `[assignmentId]/`), sketching a Next.js-style dynamic
path segment. Docusaurus's file-based router has no such convention — a directory literally named
`[classId]` would route to the literal path `/app/classes/[classId]/roster`, not a parameterized
one. The alternative (a custom Docusaurus plugin registering `:classId`-style react-router routes
via `addRoute` in a plugin's `contentLoaded` lifecycle) would work but adds new build-time
infrastructure for no benefit here. This feature instead uses **flat pages with query-string
params** (`?classId=…`), the same static-page pattern every existing `src/pages/app/*.tsx` from
Spec 002 already uses (`login.tsx`, `profile.tsx`, …) — no new routing infrastructure, and
`ClassContext.tsx`'s `useQueryParam()`/`useClassRole()` hooks give each page the same information
a route param would have. Purely a routing-mechanism choice; no FR/data-model changed.
```text

supabase/
└── migrations/                      # numbered after Spec 002's 0010; per-story dependency order (see tasks.md)
    # 0011_class_enums.sql, 0012_classes.sql, 0013_class_guard_trigger.sql,
    # 0014_teacher_ineligibility_trigger.sql, 0015_enrollments.sql, 0016_join_class_rpc.sql,
    # 0017_assignments.sql, 0018_submissions.sql, 0019_submissions_storage.sql, 0020_grades.sql,
    # 0021_answer_keys.sql, 0022_quiz_items.sql, 0023_quiz_attempts.sql
    # (first migration also drops 0010's _verified_teacher_gate_demo fixture)

tests/
├── rls/                              # NEW — extends Spec 002's matrix; see data-model.md's
│                                      # access-control matrix and contracts/classes-operations.md §H
└── e2e/classes-{lifecycle,roster}.spec.ts, assignments-{publish,submit}.spec.ts,
    grading-queue.spec.ts, quiz-retake.spec.ts, gradebook-export.spec.ts, answer-key-gate.spec.ts
```

**Structure Decision**: Extend the existing root-level Docusaurus app exactly as Spec 002 did —
there is still no application server to house, and the constitution still forbids adding one.
`src/pages/app/classes/` is a flat directory of static pages (class → assignment → submission/queue
hierarchy expressed via `?classId=…&assignmentId=…` query params, not nested route segments — see
the routing correction above), mirroring the same page-per-file pattern every existing
`src/pages/app/*.tsx` from Spec 002 already uses. Database artifacts continue in the existing
top-level `supabase/` directory, numbered to continue directly after Spec 002's `0010`.

## Phase 0 — Research (complete)

See [research.md](./research.md). Nine questions resolved: answer-key/correct-answer storage
location (R1), server-side MCQ auto-grading without an app server (R2), auto-archive-on-role-change
trigger design (R3), upload type/size enforcement (R4), Urdu-safe gradebook export (R5), PKT
deadline evaluation (R6), best-of-many-retakes computation (R7), join-code format (R8), and the
Spec 002 primitives this feature reuses unmodified (R9). No `NEEDS CLARIFICATION` markers remain.

Two findings materially shaped the design:
- Spec 001's `check-no-answer-keys.mjs` build gate and forbidden front-matter fields make R1 a
  *constraint this feature must satisfy*, not a choice it gets to make — answer keys and quiz
  correct-answers can only ever live in Supabase.
- Spec 002's `0010_verified_teacher_gate.sql` was written anticipating this exact feature (its own
  comment: "Superseded, not extended, once Spec 003 lands") — `is_verified_teacher()` and
  `is_admin()` are reused as-is, and the demo fixture table is dropped in this feature's first
  migration.

## Phase 1 — Design & Contracts (complete)

- [data-model.md](./data-model.md) — 7 new entities (`classes`, `enrollments`, `assignments`,
  `submissions`, `grades`, `quiz_items`/`quiz_attempts`, `answer_keys`), state transitions
  (including the 2026-07-19 archive-reversal and unpublish clarifications), the full
  access-control matrix, guard triggers, and two `SECURITY DEFINER` RPCs.
- [contracts/classes-operations.md](./contracts/classes-operations.md) — permitted client
  operations with expected denial shapes, and a 29-item contract test checklist covering every
  functional requirement and all six 2026-07-19 clarifications (five from the pre-planning
  session plus the post-planning rejoin/restore clarification).
- [quickstart.md](./quickstart.md) — migration order, Storage bucket setup, verification steps,
  and the four failure modes most likely to bite.

Agent context refreshed via `.specify/scripts/bash/update-agent-context.sh claude`.

## Complexity Tracking

No constitutional violations require justification. Three deliberate complexity choices are
recorded for review:

| Choice | Why needed | Simpler alternative rejected because |
|---|---|---|
| Two `SECURITY DEFINER` RPCs (`join_class_by_code`, `submit_quiz_attempt`) | Joining must not require browsing other classes' join codes; quiz scoring must never expose correct answers to the client | Plain RLS-authorized INSERTs would require the client to already know the class row (defeating code secrecy) or the correct answer (defeating auto-grading's entire point) |
| `guard_class_updates()` trigger restricting non-admin `classes` writes to `join_code`/`status` only | RLS is row-level, not column-level — it cannot express "may update these two columns but not the rest of the row" | A generic ownership-only RLS policy would let a teacher rewrite `course_code`/`name`/`teacher_id` via a crafted UPDATE — no requirement asks for general class editing, so nothing should silently allow it |
| No `auto_graded` column; `source_kind='quiz'` implies it | Avoids an unused toggle — nothing in the design ever restricted quiz assignments by stakes/weight, so the 2026-07-19 clarification ("any assignment type, including summative") required no schema change to satisfy | A separate boolean would model a distinction (quiz-but-not-auto-graded, or non-quiz-but-auto-graded) that the spec never describes and this design never produces |

## Risks

1. **A crafted `classes` UPDATE bypasses `guard_class_updates()`.** Blast radius: a teacher
   silently reassigns their class to another course, or forges a `status` transition while
   ineligible — undermining FR-020's entire safety guarantee. Mitigation: the RLS/trigger suite
   must assert the negative case (disallowed column write raises, not silently no-ops) and run in
   CI, exactly as Spec 002's `privileged-columns.test.mjs` does for `profiles`.
2. **`submit_quiz_attempt()` or `join_class_by_code()` leaks data through its error messages.**
   Blast radius: a distinguishable "wrong answer" vs. "quiz already attempted" error, or a
   distinguishable "code never existed" vs. "code was revoked" error, narrows what an attacker can
   infer even without direct table access. Mitigation: both RPCs return uniform error shapes for
   their respective denial classes (documented in contracts/classes-operations.md §A, §E).
3. **`exceljs` or the new app pages regress the Art. V.5 bundle budget.** Blast radius: slower
   content pages for low-bandwidth users, the same risk Spec 002 flagged for `supabase-js`.
   Mitigation: dynamic `import()` for `exceljs` gated behind the export button click; measure in
   the engineering gate before merge, same as Spec 002's precedent.

## Follow-ups

- Quiz item and answer-key **authoring** (who writes `quiz_items`/`answer_keys` rows, and how) is
  explicitly out of this feature's UI scope — content work under Constitution Art. II, seeded
  administratively for now. A future spec may add a teacher/admin authoring UI if that becomes a
  bottleneck.
- Rejoin-after-removal behavior (reactivating vs. duplicating an `enrollments` row) is an
  implementation choice documented in data-model.md, not a spec-clarified requirement — revisit
  if a future story needs to distinguish "rejoined" from "never left."
- Deferred as implementation detail, consistent with Spec 002's precedent: submission-queue
  pagination/search at scale beyond SC-005's 200-student target, and observability beyond what
  the RLS/e2e suites already assert.
