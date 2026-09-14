# Tasks: The reviewer role

**Feature**: 017-reviewer-role | **Branch**: `017-reviewer-role`
**Input**: [spec.md](./spec.md) · [plan.md](./plan.md) · [research.md](./research.md) ·
[data-model.md](./data-model.md) · [contracts/certification.md](./contracts/certification.md) ·
[quickstart.md](./quickstart.md)

## Format: `[ID] [P?] [Story] Description`

`[P]` marks tasks that touch different files with no incomplete dependency, so they may run in
parallel. `[US#]` maps to the increments below.

**Note on organisation.** `spec.md` is requirements-based (FR-001 to FR-010) and declares no
P1/P2/P3 user stories, as Feature 015's spec did. The four increments below are derived from the
plan's Phase 2 ordering and preserve its central property: **the backend is provably safe before
any UI exists**. A capability that suspension does not revoke is the failure that matters, and it
is testable with no page.

**Tests are included.** The spec requests them directly: success criterion 5 enumerates five policy
assertions, and criterion 2 is falsifiable only as a test ("without any policy naming `status`").

## Path Conventions

Repository root. Migrations under `supabase/migrations/`; app code under `src/`; RLS tests under
`tests/rls/` (`vitest.rls.config.ts`); pure unit tests under `tests/unit/`; gate and report scripts
are plain Node ESM under `scripts/`.

---

## Three findings that change the task list

These came out of reading the existing code rather than the design documents, and each one would
otherwise have been silently missed.

**1. `guard_privileged_columns()` does not protect a column merely because the column is new.**
FR-001 says "`guard_privileged_columns` blocks self-grant" as though it were already true. It is
not: `0008_guard_privileged_columns.sql` tests `role`, `verified_teacher`, `status`, `deleted_at`
and `auth_user_id` **by name**. A `reviewer` column added without a matching branch would be
freely self-grantable by any user under the 0005 own-row policy. The same is true of
`write_privilege_audit()` in `0009`, which also enumerates columns by name, so without a branch
there the audit row FR-001 requires would never be written. T007 and T008 exist for this reason and
are the load-bearing tasks of the whole feature.

**2. The enum value needs its own migration file.** PostgreSQL permits `alter type ... add value`
inside a transaction but forbids *using* the new value in that same transaction. The Supabase CLI
runs each migration file in one transaction, and `0044` both defines a function whose body writes
`'reviewer'` and is exercised by tests immediately afterwards. Splitting into `0043` (the enum
alone) and `0044` (everything else) is therefore required, not stylistic. This deviates from
plan.md's single `0043_reviewer_capability.sql`; the deviation is recorded here rather than
silently absorbed.

**3. Two of success criterion 5's five assertions have no database surface, by design.**
"Reviewer reads queue" and "reviewer cannot alter another reviewer's certification" are listed as
RLS assertions, but certifications are Git artefacts (data-model, contracts) and the queue is
derived from a build-time JSON report, so neither is a Postgres row anybody could alter. Faking
tests against tables that do not exist would be worse than saying so. They are covered instead as
what they actually are: a **structural** assertion that the capability grants no new write anywhere
(T013), and Git history's append-only property (contracts/certification.md). The remaining three
assertions are real RLS tests: T010, T011, T012. spec.md's success criterion 5 has since been
reworded to say this directly rather than leaving tasks.md to reconcile it.

## Three more, from `/sp.analyze`

**4. The G5 binding was missing everywhere.** Art. VII §4 requires G5 to bind to accepted G3
evidence for the same English version, and success criterion 3 says so, but the certification
contract had no `g3_report` field and no task enforced the precondition. The agent path enforces it
(`review-evidence.mjs` refuses a G5 report without `g3_report` and recursively accepts it); the
human path would have let a G5 certify past a G3 that was never accepted, with `check:pipeline-gate`
returning early for human initials and catching nothing. T020, T028 and T030 close it.

**5. The Docs gate had no task.** Art. X is non-negotiable and X.1 makes the Teacher Guide the home
for what a capability unlocks; Art. VII's Docs gate names the feature author as owner. A reviewer is
typically already a teacher, so this is a teacher-facing capability, and the guide is bilingual.
T037 and T038 close it, and plan.md's Constitution Check has gained the two rows it was missing.

**6. `is_reviewer()` gates no policy, and the spec now says so.** The feature creates no policy,
because certifying produces a file rather than a row, so the helper would have been dead code and
success criterion 2 ("a suspended reviewer's certification attempt fails") was unsatisfiable as
worded. Owner decision, 2026-09-13: keep the posture and state it. spec.md gained an **Enforcement
posture** section; the helper is called by the review surface over RPC (T021), so suspension is the
database's answer rather than a cached column's, and T012 tests that rather than a policy that does
not exist.

**7. And the rest of the analysis, remediated in a second pass.** The evidence formats were not
actually comparable (A2): `input_manifest` now carries the digest map rather than a path, because a
path cannot be compared against a freshly computed manifest and so would make Art. VII §4's
freshness rule uncheckable; `commands` is now recorded; and the four genuinely agent-specific fields
are enumerated as absent in the contract rather than silently dropped. T017 moves `COMMANDS` beside
`CRITERIA`, T031 takes both from the reviewer, and T030 asserts them. FR-009's "no automatic writes"
is now a test (T033) rather than on-screen text. FR-004's escalation says what it actually is - a
disposition carried in the ordinary export - instead of implying a notification channel nobody is
building. FR-001 no longer states the guard blocks self-grant as an existing fact. research R6 and
plan.md carry the two-file migration split, and data-model §4 says the queue is derived rather than
owned.

---

## Phase 1: Setup

- [X] T001 [P] Scaffold `tests/rls/reviewer-capability.test.mjs` with the vitest shape used by `tests/rls/class-guard-trigger.test.mjs`: a header comment naming the tasks it covers, `describe.skipIf(!rlsConfigured)`, an `afterAll` that calls `cleanupUsers`, and no assertions yet
- [X] T002 [P] Scaffold `src/lib/reviewQueue.ts` with its module docstring and exported types only (`ReviewStage`, `Disposition`, `CertificationFinding`, `CertificationCriterion`, `Certification`, `ReviewQueueItem`), no implementation, following `src/lib/feedbackExport.ts`'s `import type`-only discipline so the module is unit-testable under plain vitest with no `@site/...` alias resolution
- [X] T003 [P] Scaffold `tests/unit/reviewQueue.test.mjs` importing `../../src/lib/reviewQueue` by relative path, with the describe blocks for the queue builder and the certification builder and no assertions yet

---

## Phase 2: Foundational (Blocking Prerequisites)

**Blocks every story below.** Nothing in the UI may be written until the capability is proven
unforgeable and revocable.

- [X] T004 Create `supabase/migrations/0043_reviewer_audit_change_enum.sql` containing only `alter type public.audit_change add value 'reviewer';`, with a header comment stating why it is alone in its file (finding 2 above) so a future reader does not helpfully merge it into its neighbour
- [X] T005 Create `supabase/migrations/0044_reviewer_capability.sql` adding `reviewer boolean not null default false` to `public.profiles`, with a `comment on column` naming FR-001 and the `verified_teacher` precedent it mirrors (`0002_profiles.sql:32`)
- [X] T006 Add `public.is_reviewer(uid uuid default auth.uid())` to `supabase/migrations/0044_reviewer_capability.sql` - `returns boolean language sql stable security definer set search_path = public, pg_temp`, testing `reviewer = true and status = 'active' and deleted_at is null`, carrying forward `0004_is_admin.sql`'s comment that the status test lives here so a suspension takes effect without touching every dependent policy
- [X] T007 `create or replace` `public.guard_privileged_columns()` in `supabase/migrations/0044_reviewer_capability.sql`, reproducing `0008_guard_privileged_columns.sql` verbatim plus a `reviewer` branch that raises `errcode 42501` with the message `privileged column change requires admin: reviewer`; leave the OAuth `role_chosen_at` carve-out byte-identical, since Art. V.3's three-value enum is unchanged (finding 1)
- [X] T008 `create or replace` `public.write_privilege_audit()` in `supabase/migrations/0044_reviewer_capability.sql`, reproducing `0009_write_privilege_audit.sql` plus a `reviewer` branch inserting `change_type = 'reviewer'` with `old_value`/`new_value` cast to text, so a revocation is recorded as faithfully as a grant (finding 1, FR-001)
- [X] T009 Plumb the capability into `src/contexts/AuthContext.tsx`: add `reviewer: boolean` to the `Profile` type (line 29), add `reviewer` to the profile column list (line 54), and expose `reviewer` on the context value beside `verifiedTeacher` (lines 43 and 157)
- [X] T010 RLS test in `tests/rls/reviewer-capability.test.mjs`: an admin grants then revokes `reviewer` on another profile and both directions appear in `privilege_audit` with `change_type = 'reviewer'`, correct `actor_id`, and `old_value`/`new_value` of `'false'`/`'true'` then `'true'`/`'false'` (SC1, FR-001)
- [X] T011 RLS test in `tests/rls/reviewer-capability.test.mjs`: a non-admin setting `reviewer` on their **own** profile is rejected with an error containing `requires admin: reviewer` (not a silent no-op, per `0008`'s stated contract), and on **another** profile is a 0-row no-op because the row is invisible at the row level first (SC1, FR-001)
- [X] T012 RLS test in `tests/rls/reviewer-capability.test.mjs`: calling `is_reviewer()` over RPC **as the holder's own signed-in client** returns true while active and false once `status` is `suspended` or `deleted_at` is set, so the refusal is the database's answer and not a cached profile column's; assert as well that no code added by this feature reads `status` alongside `reviewer`, which is what makes SC2's "without any dependent code naming `status`" falsifiable rather than rhetorical (SC2, FR-002)
- [X] T013 RLS test in `tests/rls/reviewer-capability.test.mjs`: holding `reviewer` grants **no new write anywhere** - the holder still cannot update another profile, cannot insert into `privilege_audit`, and cannot write `quiz_items` or `answer_keys` any more than the same account could before the grant (FR-003, and finding 3's structural stand-in for two of SC5's five)
- [X] T014 RLS test in `tests/rls/reviewer-capability.test.mjs`: a reviewer's `content_feedback` insert succeeds exactly as any other authenticated account's does, confirming FR-008 needs no policy of its own (owner decision 2026-09-13: feedback is authenticated, all roles)

**Checkpoint**: the capability exists, cannot be self-granted, is audited in both directions, and
dies with a suspension. No page exists yet, and none is needed to know this.

---

## Phase 3: US1 - The grant path (the capability can be held)

**Goal**: an admin can grant and revoke `reviewer` from the existing users page, and see it in the
audit view. At the end of this phase the capability can be held and still does nothing, which is
the safest possible intermediate state.

**Independent test**: grant `reviewer` to a second account in `/app/admin/users`, revoke it, and
find both rows in `/app/admin/audit` with `change_type` `reviewer`.

- [X] T015 [US1] Add the `reviewer` toggle to `src/pages/app/admin/users.tsx` beside `verified_teacher`: extend the row type (line 12), the select column list, the toggle handler (line 70) and the table cell (line 150), keeping the optimistic-update shape the existing toggle uses
- [X] T016 [US1] Widen `change_type` in `src/pages/app/admin/audit.tsx` (line 10) to include `'reviewer'` so a grant renders with a label rather than falling through the union

**Checkpoint**: FR-001 is complete and observable end to end. Success criterion 1 is met.

---

## Phase 4: US2 - The review surface (a reviewer can see what awaits them)

**Goal**: `/app/admin/review-queue` lists units awaiting G3 or G5, shows the English source beside
the Urdu mirror for G5, and offers the three dispositions. Nothing is exported yet.

**Independent test**: a signed-in reviewer opens `/app/admin/review-queue` and sees exactly the
units whose tracker rows leave G3 or G5 open; a signed-in student sees the guard's notice instead.

**Design note.** Postgres gets **no queue table**. data-model.md §4 calls queue state "safe to
lose ... rebuilt from the tracker files and the content index", and plan.md's Technical Context
budgets "one column, one enum value, one function, RLS". Rebuilding it from the tracker files is
exactly what `report-content-status.mjs` already does for every other per-unit fact, so the queue
is derived at build time and Postgres never learns anything about a gate outcome (Art. V.1).

- [X] T017 [US2] Extract `CRITERIA` **and `COMMANDS`** from `scripts/lib/review-evidence.mjs` into a new `scripts/lib/review-criteria.mjs` and import them back, so the browser certify form (T022) and the checks list it records (T028) read the same definitions the evidence validator does and cannot drift; no behaviour change, and `npm run check:content` must be byte-identical after
- [X] T018 [US2] Extend `scripts/report-content-status.mjs` to emit a per-unit `gates: { G3: 'open' | 'done', G5: 'open' | 'done' }` derived from the unit's tracker rows, reusing `check-pipeline-gate.mjs`'s row parser rather than a second one, so `static/content-status.json` carries everything the queue needs
- [X] T019 [US2] Extend `ContentStatusUnit` in `src/lib/contentStatus.ts` with the `gates` field, matching T018's emitted shape
- [X] T020 [US2] Implement `buildReviewQueue(report)` in `src/lib/reviewQueue.ts` returning units with an open G3 or G5, ordered by course then unit, with G5 rows carrying both the `/docs/...` and `/ur/docs/...` routes; **a unit whose G3 is still open offers G3 only, never G5** (Art. VII §4, SC3 - the first of three places the binding is enforced); add its assertions to `tests/unit/reviewQueue.test.mjs`, including that a `coming_soon` unit never enters the queue and that a G3-open unit yields no G5 row
- [X] T021 [US2] Create `src/components/ReviewerGuard.tsx` admitting an account that `is_admin` **or** passes `is_reviewer()` **called over RPC**, not read from the cached profile column, so a suspension is honoured by the database (SC2); mirror `src/components/OwnerConsoleGuard.tsx` including its Art. IX.2 "cosmetic only" disclaimer and its bilingual EN/UR message pair
- [X] T022 [US2] Create `src/pages/app/admin/review-queue.tsx` inside `ReviewerGuard`: the queue table, a per-criterion form built from `CRITERIA[stage]` (T017), a findings list with the three severities, and the three actions **certify**, **request revision** and **escalate** mapping to dispositions `pass`, `revise` and `escalate` (FR-004)
- [X] T023 [US2] Add the side-by-side pane for a G5 row in `src/pages/app/admin/review-queue.tsx`: the English route and the Urdu route in adjacent same-origin frames, each with a plain link beside it so the comparison still works where frames are blocked (FR-004)
- [X] T024 [US2] Make **escalate** honest about its mechanism in `src/pages/app/admin/review-queue.tsx`: it sets `disposition` to `escalate`, produces the same two artefacts the other two actions do, and reaches the curriculum owner as a committed certification that leaves the gate open, not through a notification this feature does not build. Name the owner as the destination, citing Art. VII §1's reservation of policy and escalation (FR-004)

**Checkpoint**: a reviewer can do the review. They cannot yet produce evidence of it.

---

## Phase 5: US3 - The export (a certification becomes a Git artefact)

**Goal**: certifying produces the two files ADR-0015's flow expects - the certification JSON and
the tracker row line - offered as downloads. The app writes nothing to Git, changes no
`translation_status`, and marks no gate done (FR-009).

**Independent test**: certify a G5 in the browser, commit the two downloads unedited, and
`npm run check:content` passes with the new reviewer's initials on the tracker row.

- [X] T025 [US3] Implement `buildCertification(input)` in `src/lib/reviewQueue.ts` emitting `contracts/certification.md`'s shape (`schema_version: 1`, `course_code`, `unit_no`, `stage`, `reviewer_id`, `input_manifest`, `commands`, `criteria`, `findings`, `disposition`, `started_at`, `completed_at`, optional `supersedes`, and `g3_report` when the stage is G5). `input_manifest` is the **digest map itself**, copied verbatim from the `manifest.json` that `npm run review:evidence prepare` wrote, not a path to it: a path cannot be compared against a freshly computed manifest, so it would make Art. VII §4's freshness rule uncheckable and the two evidence formats undiffable
- [X] T026 [US3] Reject invalid identity in `buildCertification`: `reviewer_id` must match `/^[A-Z]{1,5}$/` and must **not** start with `agent:`, because Art. VII §3 forbids an agent identity wearing human initials and the converse would mislead `validateAgentTrackerRow` into a signature check that cannot pass (contracts/certification.md)
- [X] T027 [US3] Enforce the pass invariant in `buildCertification`: a `pass` disposition with any non-`advisory` unresolved finding, or with any criterion not `pass`, throws at build time - the same two rules `scripts/lib/review-evidence.mjs:193-195` applies to agent reports, so a human certification cannot be weaker evidence than an agent one
- [X] T028 [US3] Enforce the **G5 binding** in `buildCertification` in `src/lib/reviewQueue.ts`: a `G5` certification without a `g3_report`, or whose `g3_report` does not sit under `specs/content/<course-lowercase>/reviews/unit-NN/G3/` for the same course and unit, throws at build time (Art. VII §4, SC3, contracts/certification.md "The G5 binding" - the second of three places the binding is enforced; the third is the reviewer's own commit, which is where the referenced file's `disposition` becomes readable)
- [X] T029 [US3] Implement `buildTrackerRow(certification, reportPath)` in `src/lib/reviewQueue.ts` producing the pipe row `| Unit N | <stage> | ✅ | <initials> | review:<path> |` with the path under `specs/content/<course-lowercase>/reviews/unit-NN/<stage>/`
- [X] T030 [US3] Add the export assertions to `tests/unit/reviewQueue.test.mjs`: the emitted JSON round-trips; `input_manifest` is an object of path-to-digest entries and a string is rejected; `commands` covers every name in `COMMANDS` and a `pass` with a non-zero exit code throws; an `agent:` identity is rejected; a `pass` with an unresolved blocking finding throws; a `G5` with no `g3_report`, or one naming the wrong unit or stage, throws; `supersedes` is carried when present and absent otherwise; and the tracker row's path prefix matches the unit and stage
- [X] T031 [US3] Add the evidence intake to `src/pages/app/admin/review-queue.tsx`: a file input that reads the reviewer's `manifest.json` and carries its `input_manifest` through verbatim, and a checklist of `COMMANDS` (T017) where the reviewer records each exit code. The browser cannot see the repository, so this is the only honest way to get real digests into the artefact rather than inventing them
- [X] T032 [US3] Wire the certify action in `src/pages/app/admin/review-queue.tsx` to download both artefacts, following `src/lib/feedbackExport.ts`'s Blob-and-anchor shape, with on-screen text stating that applying them is a commit the reviewer makes (ADR-0015, FR-009)
- [X] T033 [US3] Assert FR-009 rather than promising it: a test in `tests/unit/reviewQueue.test.mjs` (or a Playwright check against the page) proving the certify action issues **no** Supabase mutation and writes no file - the module's export path touches no client, and the page's certify handler calls only `buildCertification`, `buildTrackerRow` and the download helper

**Checkpoint**: FR-005, FR-006 and FR-009 are complete. Success criteria 3 and 4 are met - 4 by
Git history rather than by any code, which is the point of the design.

---

## Phase 6: US4 - The governance record (someone actually holds it, and the reader is told)

**Goal**: the capability is held from day one, the path is exercised end to end before anyone
external holds it, and the Teacher Guide describes it for the reader it is aimed at. The spec's own
objection is that a capability nobody holds relieves no bottleneck; Art. X's is that a capability
nobody has documented is a stale guide, which is a defect rather than a later cleanup task.

**Independent test**: `specs/reviewers/human-reviewers.md` names at least one qualified reviewer
with scope and evidence, that reviewer holds the capability in production, and the Teacher Guide
page renders in both locales.

**What this phase does not do**: lift the ceiling. Granting the capability to the curriculum owner
leaves both facts in the spec's **Why** intact - every tracker row still carries the same initials,
and one person still closes every G5. The phase proves the path and grows comparators in the new
format; only a second qualified person produces throughput, which is why T036 ends by naming the
recruitment as the next piece of work rather than counting it as delivered.

- [X] T034 [US4] Create `specs/reviewers/human-reviewers.md` with the entry table (initials, scope as courses and stages, qualification evidence, date, status) and the qualification protocol from quickstart.md §1 - blind review of two or three already-reviewed units, compared on agreement over blocking findings and decisively on false passes (FR-010); open it with one sentence distinguishing it from `specs/reviewers/registry.json`, the signed **agent** registry beside it, which answers a forgeable-identity threat a named person does not pose
- [X] T035 [US4] Add the curriculum owner's own entry to `specs/reviewers/human-reviewers.md`, with scope "all courses, G3 and G5" and the existing tracker history as its evidence, and state plainly that this entry changes nothing operationally and exists to exercise the path
- [X] T036 [US4] Done 2026-09-14 at the owner's instruction: `privilege_audit` row 6936, `false -> true`, with `actor_id` NULL because the write was applied directly rather than through a session. The governance entry records that plainly rather than hiding it, and states that a second NULL-actor row would be a defect. Grant `reviewer` to the owner's production account through `/app/admin/users`, record the resulting `privilege_audit` row id in the entry, and add a standing line to `specs/backlog.md` naming "qualify and grant one external reviewer" as the work that actually lifts the ceiling, so the rehearsal is not mistaken for the destination
- [X] T037 [US4] Create `guides/teacher-guide/review-and-certify.mdx` (`sidebar_position: 7`, after `verified-teacher-material.mdx`): what the `reviewer` capability unlocks, how a G3 or G5 review is certified, that a G5 needs its unit's G3 accepted first, and what the capability does **not** grant - no authoring right, no capability granting, no content editing. Pedagogical register, role capabilities not implementation, per Art. X.1 (FR-011)
- [X] T038 [US4] Create the Urdu mirror at `i18n/ur/docusaurus-plugin-content-docs-guides/current/teacher-guide/review-and-certify.mdx`, structurally parallel to T037, since the guides are bilingual Docusaurus pages under Art. X.4 and every other teacher-guide page already has one (FR-011)

**Checkpoint**: FR-010 and FR-011 are complete, the Docs gate passes, and the first external
reviewer joins a path that is both known to work and written down.

---

## Phase 7: Polish and cross-cutting

- [X] T039 [P] Add two entries to `specs/backlog.md`: (a) `validateAgentTrackerRow` returns early for human initials, so a human row's `review:<path>` reference is never resolved and a dangling certification path passes the gate unnoticed - out of scope here because FR-010 commits to no gate change, but worth closing once several human certifications exist, and it is also where the G5 binding and the `input_manifest` freshness check could be enforced deterministically rather than at build time; (b) the deferred CI-applies-the-export idea, which the spec parks deliberately because automating a content-gate write deserves its own decision
- [X] T040 [P] Run `npm run check:all` and `npx vitest run --config vitest.rls.config.ts` and record both outcomes in the PR body
- [X] T041 Walked 2026-09-14 on `EFMP-301` Unit 1's open G5 (**not** EFMP-302 Unit 1, whose G5 has been done since 2026-08-30 - this task named the wrong unit). Dry run only: no certification was committed, because nobody has actually reviewed that unit's Urdu and writing a certification saying otherwise is the exact failure this feature exists to prevent. Walk `quickstart.md` end to end on one real unit - and correct any step the walk proves wrong; the quickstart is the only artefact here that claims the whole path works

---

## Dependencies

```text
Phase 1 (T001-T003)  -> Phase 2
Phase 2 (T004-T014)  -> every story below           [blocking]
  T004 -> T008        (the enum value must exist before the function that writes it)
  T005 -> T006 -> T007, T008
  T005 -> T009
  T006, T007, T008 -> T010-T014
Phase 3 (US1, T015-T016) -> independently shippable once Phase 2 is green
Phase 4 (US2, T017-T024) -> needs Phase 2 (the guard) and T009 (the context flag)
  T017 -> T022, T031  (one definition of the criteria and the commands)
  T018 -> T019 -> T020 -> T022
  T021 -> T022 -> T023, T024
Phase 5 (US3, T025-T033) -> needs T022 (the form supplies the certification's inputs)
  T025 -> T026, T027, T028 -> T030
  T025 -> T029 -> T030
  T025, T017 -> T031 -> T032 -> T033
  T020, T028 are the two halves of the G5 binding and must agree on the stage vocabulary
Phase 6 (US4, T034-T038) -> T036 needs Phase 3 (a real grant through the real page)
  T034 -> T035 -> T036
  T037 -> T038        (the Urdu mirror follows the English page it mirrors)
  T037, T038 need Phase 4 and Phase 5 settled, since the guide describes what the page does
Phase 7 (T039-T041)  -> last; T041 needs every phase
```

## Parallel opportunities

- **Phase 1**: T001, T002, T003 are three new files with no shared dependency.
- **Phase 2**: T010 through T014 are five tests in one file, so they are *not* `[P]`; they are
  written in order but each is independently runnable once T006-T008 land.
- **Phase 4**: T017 and T018 touch different scripts and may run together; T021 is a new component
  and may be written while either is in progress.
- **Phase 6**: T034 and T037 touch unrelated trees and may run together, though T037 reads better
  once the page it describes exists.
- **Phase 7**: T039 and T040 are independent.

## Implementation strategy

**MVP is Phase 2 plus Phase 3.** At that point the capability exists, is unforgeable, is audited,
dies with a suspension, and can be granted through the real admin page. That is genuinely
shippable: it changes nothing for anyone who does not hold it, and it is the half of the feature
that carries all the security risk.

Phases 4 and 5 are the half that relieves the bottleneck. Phase 6 is what makes the relief real
rather than theoretical, and it now also carries the Docs gate, so the phase is not optional in the
way a "governance record" phase might read.

## Task count

41 tasks: 3 setup, 11 foundational (5 migration and plumbing, 5 RLS tests, 1 feedback-permission
test), 2 in US1, 8 in US2, 9 in US3, 5 in US4, 3 polish.
