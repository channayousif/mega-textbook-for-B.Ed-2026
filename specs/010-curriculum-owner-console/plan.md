# Implementation Plan: Curriculum-owner console and the content-improvement loop

**Branch**: `010-curriculum-owner-console` | **Date**: 2026-09-05 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/010-curriculum-owner-console/spec.md`

## Summary

Four owner-reported gaps, shipped as one additive release: a persisted, cross-device
self-assessment checklist (1A); a structured reader-feedback stream with passage anchoring and an
owner triage queue feeding a documented, assistant-driven revision loop (1B); a single
curriculum-owner overview at `/app/admin/overview` (1C); and a content/figure status report
reused by that overview and by CI (1D). Two new Supabase Postgres tables
(`self_assessment_checks`, `content_feedback`) extend Specs 002-005's schema with RLS as the sole
authorization layer - no application server. **Amended 2026-09-07** (spec.md Clarifications):
this originally read "no new Edge Function" too, true for the feature as it shipped; opening
reader feedback to a signed-out guest (a follow-up the curriculum owner asked for after using the
feature) is a public, unauthenticated write with its own server-side validation and a
confirmation email RLS cannot express - `guest-feedback-submit`, one new Edge Function using the
service role, the same escape hatch Spec 002's `admin-suspend`/`admin-list-users` already
established for exactly this class of problem (a privileged or validation-heavy action RLS alone
can't gate). The checklist becomes
interactive **without editing a single topic file** (FR-008) by hydrating Spec 008's existing
disabled checkboxes client-side, keyed by position, not text (research.md R1-R3). Reader feedback
reuses `window.getSelection()` for passage capture (no new dependency, research.md R7) and is a
third, distinct stream alongside Spec 005's `activity_feedback`/`improvement_suggestions`
(research.md R8). The Story 4 report reuses `check-figures.mjs`/`check-unit-depth.mjs`'s own
parsing logic via three small shared modules extracted from those scripts (research.md R9) - it
never re-derives a manifest read or a depth verdict, satisfying FR-033 directly.

Two `/sp.adr` candidates spec.md itself names are confirmed by this plan and recommended after it
lands: (1) `content_feedback` as a distinct table from `activity_feedback`/
`improvement_suggestions`, and (2) best-effort in-house passage re-location over an annotation
library. A third named candidate (the catalog-edit mechanism, FR-029) is resolved below as a
download-a-patched-file flow, keeping Git as the source of truth with zero live-database write of
catalog content - also a plan-level candidate for `/sp.adr`. The fourth (self-assessment
independence from `unit_progress`) is already spec.md's own explicit design (FR-005, Out of
scope) and needs only a plan note, not a fresh decision.

## Technical Context

**Language/Version**: TypeScript 5.6 on Node 22+ (unchanged from Specs 002-009). Gate/report
scripts stay plain Node ESM (`.mjs`).
**Primary Dependencies**: Docusaurus 3.10, `@supabase/supabase-js` ^2, React 18.3, `gray-matter`
(all existing) - **no new dependency**. Passage capture uses the browser's native
`window.getSelection()`; the checklist hydration uses `useDoc()`'s existing `toc` plus plain DOM
walking (research.md R1/R2/R7; spec.md Assumptions: "No new third-party library is added for text
selection/anchoring or for the console").
**Storage**: Supabase Postgres - 2 new tables (`self_assessment_checks`, `content_feedback`)
extending Specs 002-005's schema (`profiles`, `is_admin()`, `current_profile_id()`,
`touch_updated_at()` all reused verbatim). Course/unit/topic content stays in Git (Art. V.1);
every course/unit/topic reference on the new tables is an unvalidated pointer, the same
convention every course-scoped table has used since Spec 003. Two file-based, non-database
artifacts: `static/content-status.json` (generated, build-time) and the transient feedback export
document (generated on demand, never stored).
**Testing**: Vitest (unit + RLS matrix, extends `tests/rls/` and `tests/unit/`), Playwright
(e2e, extends `tests/e2e/`) - both already configured. The three script extractions (research.md
R9) are verified behavior-preserving by re-running the existing `figures-gate.test.mjs` and
depth-gate fixture suites unchanged before the new report script is written (`quickstart.md`
step 2).
**Target Platform**: Same self-hosted VPS as Specs 001-009 (`www.a2ahs.com` + `api.a2ahs.com` ->
Kong -> self-hosted Supabase, ADR-0006/ADR-0007). No new infrastructure - the "refresh"
control re-reads a build-time artifact rather than triggering a live rebuild (research.md R10),
so no new deploy-trigger surface is added.
**Project Type**: Web - static frontend + self-hosted backend; no application server. Zero
client-writable RPCs beyond `confirm_guest_feedback()` (2026-09-07 addition, `SECURITY DEFINER`,
callable by `anon` - the emailed token is itself the sole credential, the same "the secret IS the
authorization" shape as any confirm-by-link flow) - two guard triggers
(`enforce_self_assessment_immutable_identity()`,
`enforce_content_feedback_status_transition()`) plus one stamping trigger
(`stamp_content_feedback_author_role()`, extended 2026-09-07 to stamp `'guest'` when there is no
profile to look a role up from), all reached via ordinary RLS-authorized PostgREST calls, same
pattern as Spec 005's `enforce_suggestion_status_transition()`. One Edge Function
(`guest-feedback-submit`, 2026-09-07) - see Summary above.
**Performance Goals**: No new performance budget - reuses the existing < 200 KB first-load budget
(Art. V.5) and Spec 003 SC-005's 5-second p95 for class-scale actions as the reference point for
the console's own queries, which run at admin-single-user scale, not per-class-of-200.
**Constraints**: RLS-only authorization (Art. V.2/IX.2); `course_code`/`unit_no`/`topic_no` on
both new tables are unvalidated pointers into Git content, never duplicated (Art. V.1/V.4); the
self-assessment checklist's markdown source is untouched - the content-structure gate
(`check-unit-depth.mjs`) keeps passing unchanged (FR-008); `content_feedback`'s `author_role` and
initial `status` are stamped/forced server-side, never client-supplied (FR-014); the report
script reuses, never re-derives, the figure and depth gates' own logic (FR-033); the catalog-edit
console flow never writes catalog content to Postgres (Constraints, "Content stays in version
control"); bilingual EN/UR incl. RTL for every new screen and control (Art. III.8, FR-012, FR-030).
**Scale/Scope**: 4 new migrations (2 tables + 2 guard/stamp triggers split across them,
`quickstart.md` step 1), 3 extracted shared script modules + 1 new report script, 1 new theme
swizzle (`DocItem/Content.tsx`) alongside the already-swizzled `DocItem/Footer.tsx` (extended, not
replaced), 1 new guard component (`OwnerConsoleGuard.tsx`), 2 new app pages
(`admin/overview.tsx`, `admin/feedback-queue.tsx`), 1 extended existing page
(`dashboard/progress.tsx`), 1 new Claude Code skill (`.claude/skills/revise-topic/`).

## Constitution Check

*GATE: evaluated against Constitution v2.7.0. Re-checked after Phase 1 design below.*

| Article | Requirement | Status |
|---|---|---|
| III.1 | Simple-English register | Not touched - no new student-facing curriculum prose; console/queue UI copy follows the same plain-language discipline as every other dashboard screen |
| III.8 | Accessibility - RTL-correct, no colour-only meaning | The console, queue, and hydrated checklist all render bilingual/RTL (FR-012, FR-030); the hydrated checkbox reuses the browser's native `<input type="checkbox">` semantics (already accessible), just un-disabled |
| III.9 | Zero em dash | This plan and every generated artifact (`research.md`, `data-model.md`, `contracts/`, `quickstart.md`) are written with zero em dash, spaced-hyphen convention throughout |
| IV.4 | Spec drift is a defect | No spec.md edit was needed during planning - every fork research.md resolves sits within spec.md's stated Assumptions/Clarifications (research.md's closing note) |
| V.1 | Content in Git; app state in self-hosted Supabase; static site holds no secrets | 2 new tables only; content stays out of Postgres - every course/unit/topic reference is an unvalidated pointer (data-model.md). The catalog-edit flow (FR-029) explicitly never writes to the live database - see Phase 1 |
| V.2 | Security in the backend; RLS, not hidden pages | Both new tables RLS-enabled; two guard triggers enforce what RLS alone cannot express (identity-column immutability; the feedback status-transition graph) |
| V.3 | Roles/`verified_teacher`; teacher role grants peer-teaching only | Unchanged - this feature only *consumes* `is_admin()`/`current_profile_id()`. `self_assessment_checks` deliberately has **no** teacher-visible branch at all (Art. VIII.1, FR-006) - the strictest role boundary in the codebase so far |
| V.4 | Adding a course requires zero platform-code change | `course_code`/`unit_no`/`topic_no` on both new tables are unvalidated pointers, same convention as every table since Spec 003 |
| V.5 | < 200 KB first load, low-bandwidth first | No new dependency (Technical Context); the new theme swizzle and app pages live under the existing lazy-loaded `src/pages/app/` and swizzle precedents - verify bundle size in the Art. VII engineering gate before merge |
| V.6 | Cost-controlled infrastructure | Same self-hosted VPS/Supabase instance; no new infra. The "refresh" control deliberately does **not** add a live-rebuild trigger (research.md R10), precisely to avoid a new privileged surface for a P3 convenience |
| VI.3 | Real-time features beyond email are Phase 3+ | No notifications built - feedback status changes are read on next visit to the reader's own account, not pushed |
| VII | RLS tested, responsive/RTL, Lighthouse | RLS matrix extended (`data-model.md`'s access-control matrix, `contracts/console-operations.md`'s 16-item test checklist) |
| VIII.1 | Student data visible only to student, their teacher(s)/admin - RLS-enforced | `self_assessment_checks` is **stricter** than the Art. VIII.1 baseline for teachers - not even a teacher sees it, matching the Constraints section's explicit "visible only to that student and the curriculum owner." `content_feedback` follows the ordinary author-own + admin-all shape |
| VIII.2 | Collect the minimum | No new personal-data columns; both new tables' person-FKs point at `profiles.id`. FR-017 explicitly forbids soliciting personal information in the feedback form |
| IX.2 | Authorize at the database layer, not only UI | RLS + two guard triggers + one stamping trigger; `OwnerConsoleGuard` is cosmetic only, same disclaimer pattern as every existing guard component |
| X.1/X.2 | Docs gate - a spec changing a student/teacher/contributor workflow updates the matching guide in the same branch | **New obligation, addressed by this plan** - the Student Guide gains a "Self-assessment and giving feedback" section, the Teacher Guide gains a "Giving feedback on content" section, and README gains a short "Curriculum-owner console" pointer under its admin-tooling notes |
| XI | Amendment procedure & versioning | No constitution amendment anticipated - every requirement here is satisfied within v2.7.0's existing articles, same posture as Spec 009's plan |

**Result: PASS, no amendment required.** One Complexity Tracking entry (the checklist-hydration
swizzle's coupling to Spec 008's exact nine-heading contract) and one deliberate scope narrowing
(research.md R6 - the reader-feedback control's five-page-kind reach) are recorded below.

**Post-Phase-1 re-check**: Phase 1 design (`data-model.md`, `contracts/`) introduces no new
constitutional conflict. The two-guard-trigger design keeps every write path enforced at the
database layer exactly as Art. V.2/IX.2 require; no table grants `anon` any privilege.

📋 **Architectural decision candidates** (all four named in spec.md's own "Architectural decisions
to record during planning" section; recommend `/sp.adr` after this plan, grouped as one ADR since
they are one coherent design conversation about this feature's data shape):

1. `content_feedback` as a dedicated table, distinct from `improvement_suggestions` (research.md
   R8).
2. Best-effort, in-house passage capture/re-location via `window.getSelection()`, not an
   annotation library (research.md R7).
3. The catalog-edit mechanism: a download-a-patched-`courses.json` flow, not a live-database
   write (Phase 1, below).
4. (Lighter, plan-note-only per spec.md's own framing) Self-assessment completion stays
   independent of `unit_progress` - already spec.md's explicit design (FR-005), not a fresh fork.

## Project Structure

### Documentation (this feature)

```text
specs/010-curriculum-owner-console/
├── plan.md                                  # This file
├── spec.md                                  # Feature specification (1 clarification session, FR-001…FR-033)
├── research.md                              # Phase 0 - R1…R10
├── data-model.md                            # Phase 1 - 2 new tables, RLS matrix, triggers, file-based entities
├── contracts/
│   ├── console-operations.md                # Phase 1 - permitted ops, denial shapes, contract test checklist
│   └── self-assessment-hydration.md         # Phase 1 - the checklist DOM-hydration mechanism, precisely
├── quickstart.md                            # Phase 1 - migration order, script-extraction order, build order, verification checklist
└── tasks.md                                 # Phase 2 - created by /sp.tasks, NOT by this command
```

### Source Code (repository root)

Same single-Docusaurus-app layout as Specs 002-009 - no `site/` subdirectory, no
frontend/backend split. New and edited paths:

```text
src/
├── lib/
│   ├── selfAssessment.ts            # NEW - upsert/read-own/admin-aggregate helpers over self_assessment_checks (FR-001, FR-004, FR-006), plus mergeLocalChecks() (research.md R4)
│   ├── contentFeedback.ts           # NEW - submit/read-own/admin-queue/transition + exportUnitFeedback() (FR-010…FR-022); re-exports feedbackExport.ts's pure helpers
│   ├── feedbackExport.ts            # NEW (drift from the original file list) - resolveContentPath()/renderFeedbackExportDocument() pulled out of contentFeedback.ts into their own zero-`@site`-value-import module specifically so tests/unit/feedback-export.test.mjs can import it directly under vitest (no Supabase/webpack alias resolution available there) - the same reason authErrors.ts already had to be import-clean
│   ├── contentStatus.ts             # NEW (drift) - fetchContentStatus(): fetch('/content-status.json') + its typed shape, shared by admin/overview.tsx's content-status panel and refresh control
│   ├── catalog.ts                   # NEW (drift) - fetchCatalog(): fetch('/catalog-courses.json') + its typed shape, used only by the catalog-edit form
│   └── docPosition.ts               # NEW - findNearestSectionAnchor() extracted from DocItem/Footer.tsx, shared by the suggestion control and the new feedback control
├── theme/
│   └── DocItem/
│       └── Content.tsx              # NEW SWIZZLE - checklist hydration (contracts/self-assessment-hydration.md); passes through unmodified for every non-topic page
│       # Footer.tsx (EDITED, not new) - adds the reader ContentFeedbackControl (any reader - signed-in OR a signed-out guest since the 2026-09-07 follow-up, 5 page kinds, research.md R6) alongside the existing student/teacher controls; resolves the one page-kind ambiguity (a bare unit-NN URL could be either layout's index.mdx) via a one-time content-index.json fetch for topic-layout unit membership; 2026-09-07 additions: upfront selection guidance (previously shown only after opening the form), a "give more feedback" reset (submission was never actually limited to once per page, only the UI dead-ended there), a guest email field + honeypot when signed out
├── components/
│   └── OwnerConsoleGuard.tsx        # NEW - owner-only gate for /app/admin/overview AND /app/admin/feedback-queue (both routes use this guard in the final implementation, not the generic AuthGuard), mirrors StudentDashboardGuard's dedicated-message pattern
└── pages/app/
    ├── confirm-feedback.tsx         # NEW (2026-09-07 follow-up) - the guest confirmation landing page; outside every auth guard on purpose, reached only via the emailed link
    ├── admin/
    │   ├── overview.tsx             # NEW - the console (Story 3): content-status panel (+ refresh, T037), feedback summary + inline triage (T036), self-assessment aggregate, progress aggregates (reuses fetchOwnUnitProgress()/fetchEarnedAchievements() unmodified - under an admin session, is_admin()'s own RLS branch already returns every student's rows), catalog-edit form (T038)
    │   └── feedback-queue.tsx       # NEW - the full triage queue (Story 2): filter, quoted-passage-in-context, transitions, export (T033); 2026-09-07 - + an Author column (role, or a guest's email + confirmation status)
    └── dashboard/
        └── progress.tsx             # EDITED - + self-assessment roll-up panel (FR-004), kept visually separate from the existing unit-coverage panel

scripts/
├── lib/
│   ├── figure-manifest.mjs          # NEW - parseManifest()/readManifest() + figureStatusFor() (counts + pending list), extracted from check-figures.mjs (behavior-preserving)
│   ├── unit-depth.mjs               # NEW - checkLegacy()/checkTopic() verdicts (as originally scoped) PLUS, drift beyond T002's original scope: the full per-unit orchestration (unitSectionLines(), loadContentSpec(), topicFilesIn(), parseTopicList(), detectLayout(), and checkUnitVerdict() tying them together) also moved here from check-unit-depth.mjs - required so report-content-status.mjs could get a unit's authored/translation_status/depth_check verdict without re-deriving the out-of-scope/layout-detection rules a second time (FR-033 applied to the orchestration layer, not only the leaf verdict functions)
│   └── mdx-sections.mjs             # NEW - parsePipeTable()/tableAfterHeading()/readTable()/countNumberedInSection()/countContentLinesInSection()/countChecklistInSection() - all generic table/section parsing, extracted from check-unit-depth.mjs (countChecklistInSection() also used by build-content-index.mjs, research.md R5)
├── check-figures.mjs                # EDITED - imports scripts/lib/figure-manifest.mjs instead of inlining the parser; same behavior, same tests pass
├── check-unit-depth.mjs             # EDITED - now a thin wrapper: calls scripts/lib/unit-depth.mjs's checkUnitVerdict() and converts its result to err() calls exactly as before; same behavior, same tests pass
├── build-content-index.mjs          # EDITED - + self_assessment_count AND topic_no per topic record (both needed by the Progress roll-up, research.md R5); + a build-time copy of catalog/courses.json to static/catalog-courses.json (T038, FR-029)
└── report-content-status.mjs        # NEW - Story 4; imports checkUnitVerdict() (unit-depth.mjs) + readManifest()/figureStatusFor() (figure-manifest.mjs), writes static/content-status.json (FR-031…FR-033); depth_check is `'pass' | 'fail' | 'not_applicable'` - the third value for a unit that doesn't exist yet, is coming_soon, or isn't yet in scope for the depth standard (data-model.md)

package.json                          # EDITED - + "check:content-status" script alias; prestart/prebuild call it alongside build-content-index.mjs
.github/workflows/ci.yml              # EDITED - + one informational (non-blocking) "content-status report" step after the existing figure gate step

.claude/skills/revise-topic/          # NEW SKILL (named in Constitution v2.7.0's own Sync Impact Report as this feature's obligation)
├── SKILL.md                          # triggers ("revise this unit from feedback", "propose a revision from the export"); read export → locate each quoted passage → propose minimal edit → mirror to translation → run the full content-check set → present the change set
└── references/
    ├── export-format.md              # the exact export document shape (data-model.md's "Feedback export bundle")
    └── stale-passage-handling.md     # the "report and skip, never guess" rule for a quote no longer found verbatim (FR-025, edge case)

supabase/migrations/
├── 0032_self_assessment_checks.sql            # table + RLS + enforce_self_assessment_immutable_identity() + touch_updated_at trigger
├── 0033_content_feedback.sql                  # table + 3 enums + RLS
├── 0034_content_feedback_author_role_trigger.sql   # stamp_content_feedback_author_role()
├── 0035_content_feedback_status_transitions.sql    # enforce_content_feedback_status_transition() + touch_updated_at trigger
├── 0036_self_assessment_checks_student_role_guard.sql  # is_student() guard on self_assessment_checks INSERT/UPDATE (drift, found during post-implementation verification - see quickstart.md)
└── 0037_content_feedback_guest_access.sql     # NEW (2026-09-07 follow-up) - nullable author_id + guest_email/guest_confirmation_token/guest_confirmed_at columns, the exclusive-or/format/pairing check constraints, stamp_content_feedback_author_role() extended for a guest insert, confirm_guest_feedback() RPC (anon-executable)

supabase/functions/
└── guest-feedback-submit/           # NEW (2026-09-07 follow-up) - the only way an anon caller can create a content_feedback row; service-role insert + Resend confirmation email (reuses the same credential already verified for GoTrue's SMTP relay, ADR-0006, called over Resend's HTTP API instead); verified manually (curl, both the happy path and every rejection shape) per quickstart.md's own precedent for admin-suspend/admin-list-users - not covered by the automated RLS/e2e suites, since those would otherwise send a real email on every run

guides/
├── student-guide/                    # EDITED (existing tree, Spec 004) - + a section on the self-assessment checklist and giving feedback
└── teacher-guide/                    # EDITED (existing tree, Spec 005) - + a section on giving reader feedback (teachers are readers too, FR-010)
README.md                             # EDITED - a short "Curriculum-owner console" pointer under the admin-tooling notes

tests/
├── unit/
│   ├── figures-gate.test.mjs         # EDITED - same cases, now exercising the extracted scripts/lib/figure-manifest.mjs indirectly; unchanged pass/fail behavior asserted
│   ├── depth-gate.test.mjs           # EDITED - same, for scripts/lib/unit-depth.mjs + mdx-sections.mjs
│   └── content-status-report.test.mjs  # NEW - fixture-driven: a course with no manifest reports zero figures outstanding; a fully-placed unit contributes nothing to figures_pending
├── rls/
│   ├── self-assessment-isolation.test.mjs         # NEW
│   ├── self-assessment-immutable-identity.test.mjs # NEW
│   ├── content-feedback-isolation.test.mjs        # NEW
│   └── content-feedback-status-transitions.test.mjs # NEW
└── e2e/
    ├── self-assessment-checklist.spec.ts          # NEW - tick, reload, second-device, sign-out/local, merge-on-sign-in
    ├── content-feedback-submission.spec.ts        # NEW - whole-page + passage capture, both locales, small-screen
    ├── owner-feedback-triage.spec.ts               # NEW - filter, quoted passage in context, transitions, export
    └── owner-console-rtl.spec.ts                   # NEW - /app/admin/overview + /app/admin/feedback-queue in ur/RTL, non-owner denial notice
```

**Structure Decision**: Extend the existing root-level Docusaurus app exactly as Specs 002-009
did - flat pages under `src/pages/app/admin/`, a new theme swizzle alongside the one Spec 004/005
already added under `src/theme/DocItem/`, and shared script modules under a new `scripts/lib/`
that both the pre-existing gates and the new report import - never a second implementation of
either gate's logic. The console (`overview.tsx`) and the full triage queue (`feedback-queue.tsx`)
are deliberately two pages, not one - Story 3's overview links out to Story 2's queue for full
detail (FR-027: "full detail stays in the dedicated queue"), the same "overview links to detail"
relationship Spec 005's `teacher/index.tsx` already has with `/app/classes/*`.

## Phase 0 - Research (complete)

See [research.md](./research.md). Ten questions resolved: hydrating Spec 008's existing disabled
checkboxes without any topic-source edit (R1), a locale-proof way to find the checklist section by
position rather than heading text (R2), positional item identity with a wording snapshot for
FR-009's "material change" rule (R3), the signed-out-to-signed-in one-time merge mechanics (R4), a
shared-helper-sourced per-topic item count for the Progress roll-up (R5), scoping the reader-
feedback control to exactly the five page kinds spec.md's own acceptance scenarios name (R6),
native `window.getSelection()` passage capture with reading-order-correct RTL behavior for free
(R7), why `content_feedback` is a third, distinct table rather than a shared polymorphic one (R8),
reusing the two existing gate scripts' own parsing rather than re-deriving it for the Story 4
report (R9), and why "refresh" re-reads a build artifact instead of triggering a live rebuild
(R10). No `NEEDS CLARIFICATION` markers remain - spec.md's single clarify session (2026-09-05) is
complete and every plan-level fork above sits inside its Assumptions.

## Phase 1 - Design & Contracts (complete)

- [data-model.md](./data-model.md) - 2 new tables (`self_assessment_checks`,
  `content_feedback`), their RLS policies, 3 triggers, the full access-control matrix, and the
  three file-based entities (feedback export bundle, content-status snapshot, extended
  content-index record).
- [contracts/console-operations.md](./contracts/console-operations.md) - permitted client
  operations with expected denial shapes, and a 16-item contract test checklist covering both new
  tables plus the file-based operations.
- [contracts/self-assessment-hydration.md](./contracts/self-assessment-hydration.md) - the exact
  DOM-hydration mechanism (activation condition, section location, item reading, wiring, and
  checked-state resolution across signed-in/signed-out/merge states).
- [quickstart.md](./quickstart.md) - migration order, the mandatory script-extraction-before-
  report-script build order, frontend build order, the revision-loop walkthrough, an end-to-end
  verification checklist, and the failure modes most likely to bite.

**Catalog-edit mechanism (FR-029), resolved here**: the console's catalog-edit form reads the
already-public `catalog/courses.json` (copied to `static/catalog-courses.json` at build time, the
same `static/*.json` convention as `content-index.json`/`content-status.json`), lets the owner
edit one course entry's fields, and produces a **downloadable, fully-formed replacement
`courses.json`** the owner reviews and commits themselves through the ordinary PR flow - the
console never calls Postgres for this and never writes catalog content anywhere at runtime. This
is the "safe default is a change-set or download flow" spec.md's own Assumptions anticipated,
made concrete.

Agent context refreshed via `.specify/scripts/bash/update-agent-context.sh claude`.

## Complexity Tracking

No constitutional violations require justification. Two deliberate complexity choices are
recorded for review:

| Choice | Why needed | Simpler alternative rejected because |
|---|---|---|
| Checklist hydration locates its target `<ul>` by **position** among the topic file's nine cycle headings (research.md R2), not by a stable id or an explicit MDX component | FR-008 forbids touching topic source at all - no new import, no new front-matter field is available to mark the section. Position is the only signal that survives translation (the Urdu heading text differs) and needs zero content change | A `<SelfAssessmentChecklist>` MDX component the author imports (mirrors `<Figure>`'s Spec 009 pattern) - rejected outright, it edits every topic file, which is exactly what FR-008 rules out. A remark/MDX build-time transform - rejected, it would need the same position-based targeting anyway, plus a new build dependency, for no gain over a `useEffect` DOM walk |
| Three script modules (`scripts/lib/figure-manifest.mjs`, `unit-depth.mjs`, `mdx-sections.mjs`) are extracted from two already-shipped gate scripts before the new report script is written | FR-033 requires the report to reuse, not re-derive, the existing manifest-reading and depth-check logic "so it cannot drift from the gates." The only way to satisfy that literally is for both the gates and the report to call the same function | Shelling out to `check-figures.mjs`/`check-unit-depth.mjs` as child processes and parsing their stderr - rejected in research.md R9: gives pass/fail, not the granular per-course/unit data Story 4 needs, and turns human-readable log text into a load-bearing data format |

## Risks & follow-ups (max 3)

- **The nine-heading-count precondition (research.md R2) silently degrades rather than loudly
  fails.** A topic file that doesn't yet match `contracts/topic-cycle.md`'s exact nine-heading
  shape gets a non-interactive checklist with no error, which is correct today (many units are
  still legacy five-file) but could mask a genuine authoring mistake on a topic file that *should*
  qualify. Mitigation: `check-unit-depth.mjs`'s existing heading-order check already fails loudly
  for any in-scope topic file that doesn't match the contract - this feature adds no new
  reason for that check to stay silent, it only reuses its existing pass/fail signal.
- **Two independent "feedback" entry points on the same page** (the teacher-only "suggest
  improvement"/"give feedback on this activity" controls from Spec 005 and the new any-reader
  content-feedback control) could read as redundant to a teacher who is also a reader. Mitigation:
  FR-016 requires the Spec 005 flow to keep working unchanged, and the new control is visually and
  functionally distinct (general book-quality suggestions vs. a comment tied to specific page
  content); the Teacher Guide edit (Docs gate) explains the difference in one sentence rather than
  leaving it to be inferred.
- **The catalog-edit download flow (FR-029) still depends on the owner actually committing the
  downloaded file** - nothing enforces that step happens. Mitigation: this is the explicitly
  accepted trade-off of keeping Git as the sole source of truth for catalog content (Constraints);
  a live-database write was rejected specifically to avoid a divergent, ungoverned catalog copy,
  so an occasional manual commit step is the correct cost, not a defect to engineer away.

## Phase 2 - (handled by `/sp.tasks`, not here)

`/sp.tasks` decomposes this into dependency-ordered tasks: the 4 migrations -> the 3 script
extractions (verified behavior-preserving against existing tests) -> `report-content-status.mjs`
+ its fixture tests -> `selfAssessment.ts`/`contentFeedback.ts`/`docPosition.ts` ->
`DocItem/Content.tsx` swizzle + `DocItem/Footer.tsx` extension -> `OwnerConsoleGuard.tsx` ->
`admin/overview.tsx` -> `admin/feedback-queue.tsx` -> `dashboard/progress.tsx` extension -> the
`revise-topic` skill -> Student/Teacher Guide + README edits (Docs gate) -> full RLS/e2e
verification -> `/sp.adr` for the grouped decision cluster -> drift reconciliation.
