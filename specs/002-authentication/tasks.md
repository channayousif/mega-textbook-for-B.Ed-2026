---
description: "Task list for 002-authentication implementation"
---

# Tasks: Authentication & Roles

**Input**: Design documents from `/specs/002-authentication/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/auth-operations.md, quickstart.md

**Tests**: **REQUIRED** for this feature (not optional). Spec SC-004 mandates "a documented
access-control test set" and Constitution Art. VII's engineering gate requires "RLS policies
tested". A passing suite that only covers happy paths is explicitly insufficient — the negative
cases are the deliverable.

**Organization**: Tasks are grouped by user story (US1–US5), each independently implementable
and testable.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1–US4)
- Exact file paths included in every task

## Path Conventions

Single Docusaurus app at repository root (no `site/` subdirectory), per plan.md Structure
Decision. New code lands in `src/lib`, `src/contexts`, `src/pages/app`, `supabase/`, `tests/rls`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Dependencies, environment plumbing, and tooling before any auth code

- [X] T001 Add `@supabase/supabase-js` ^2 to dependencies in `package.json` and run `npm install`
- [X] T002 Expose `DOCUSAURUS_SUPABASE_URL` and `DOCUSAURUS_SUPABASE_ANON_KEY` via `customFields` in `docusaurus.config.ts` (direct `process.env` reads are `undefined` in the browser bundle — see quickstart.md §2)
- [X] T003 [P] Initialise the Supabase CLI project and create `supabase/` with `config.toml`, `migrations/`, and `functions/` directories
- [X] T004 [P] Add `test:rls` script to `package.json` and create `vitest.rls.config.ts` scoped to `tests/rls/` (mirror the e2e-exclusion pattern already used in `vitest.config.ts`)
- [X] T005 [P] Create `.env.example` documenting the two public vars, and add `.env.local` to `.gitignore`
- [X] T006 [P] Add a `check:no-service-key` guard in `scripts/check-no-service-key.mjs` that fails the build if a service-role key pattern appears anywhere under `src/` (Constitution Art. V.1 — release-blocking if violated)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Database schema, authorization primitives, and the site-wide session provider.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete. Migrations must be
applied in the order below — policies referencing `is_admin()` fail to create if the function
does not exist yet (quickstart.md §3).

### Database schema

- [X] T007 Create migration `supabase/migrations/0001_enums.sql` defining `user_role`, `account_status`, and `audit_change` enums per data-model.md
- [X] T007a Set `enable_confirmations = true` under `[auth.email]` in `supabase/config.toml` so email confirmation is version-controlled rather than a dashboard-only setting, and record the equivalent hosted-project setting in `quickstart.md` §1.2 (FR-002)
- [X] T008 Create migration `supabase/migrations/0002_profiles.sql` for the `profiles` table (id, auth_user_id, full_name, role, verified_teacher, status, role_chosen_at, deleted_at, created_at) — **corrected during implementation**: the planned `id … REFERENCES auth.users(id) ON DELETE CASCADE` contradicted FR-021 (CASCADE destroys the tombstone that Spec 003 foreign keys depend on). Profile now owns an independent PK with a nullable `auth_user_id` FK **ON DELETE SET NULL**; data-model.md amended to match
- [X] T009 Create migration `supabase/migrations/0003_privilege_audit.sql` for the append-only `privilege_audit` table with FK `subject_id` → `profiles(id)` and index on `(subject_id, created_at desc)`
- [X] T010 Create migration `supabase/migrations/0004_is_admin.sql` defining the `is_admin(uid)` `SECURITY DEFINER` helper (bypasses RLS for the admin lookup — prevents infinite policy recursion, see data-model.md "Recursion note")

### Authorization policies and triggers

- [X] T011 Create migration `supabase/migrations/0005_profiles_policies.sql`: enable RLS; SELECT own row; SELECT all for admin; UPDATE own row — every policy predicated on `status = 'active'`
- [X] T012 Create migration `supabase/migrations/0006_audit_policies.sql`: enable RLS; SELECT for admin only; **no INSERT/UPDATE/DELETE policy at all** so those commands are denied by default (FR-019)
- [X] T013 Create migration `supabase/migrations/0007_handle_new_user.sql`: `SECURITY DEFINER` AFTER INSERT trigger on `auth.users` creating the profile, reading role from `raw_user_meta_data` **through a `{student,teacher}` allowlist**, coercing anything else to `student` (FR-003, FR-009 — untrusted input, see research.md R3)
- [X] T014 Create migration `supabase/migrations/0008_guard_privileged_columns.sql`: BEFORE UPDATE trigger on `profiles` raising unless `is_admin(auth.uid())` when `role`, `verified_teacher`, or `status` changes (FR-006, FR-010a)
- [X] T015 Create migration `supabase/migrations/0009_write_privilege_audit.sql`: AFTER UPDATE trigger emitting one `privilege_audit` row per changed privileged column with `actor_id = auth.uid()` read server-side, never from client input (FR-018)

### Client foundation

- [X] T016 [P] Implement the SSG-safe lazy Supabase singleton in `src/lib/supabase.ts` — no client construction at module scope, or the Docusaurus prerender fails with `window is not defined` (research.md R1)
- [X] T017 [P] Implement the provider-error → bilingual message dictionary in `src/lib/authErrors.ts`, stubbing keys for **all** cases up front (unconfirmed email, invalid credentials, already-registered, expired/used reset link, rate limited, account suspended) so T035 and T058 only supply translations and never restructure the module (FR-014)
- [X] T018 Implement `src/contexts/AuthContext.tsx` exposing session, profile, role, and `verified_teacher`, reading role from `profiles` (**not** from a JWT claim — long sessions would serve stale roles, research.md R2)
- [X] T019 Create the Docusaurus Root swizzle `src/theme/Root.tsx` wrapping every page in `<AuthProvider>` (only swizzle point covering docs *and* app pages, FR-011)

### Test harness

- [X] T020 Create the RLS test harness in `tests/rls/_helpers.mjs` providing per-role authenticated clients (anon, student, unverified teacher, verified teacher, suspended user, admin) and per-test fixture teardown

**Checkpoint**: Schema, policies, triggers, and session provider in place — user stories can begin.

---

## Phase 3: User Story 1 - Sign up and sign in as a student (Priority: P1) 🎯 MVP

**Goal**: A visitor can create an account with Google or email/password and is identified across
the site with the default `student` role.

**Independent Test**: Create one Google account and one email account without choosing a role;
both land signed in, identified in the header, with `role='student'` and `verified_teacher=false`.

### Tests for User Story 1 ⚠️

> Write these FIRST and confirm they FAIL before implementing.

- [ ] T021 [P] [US1] RLS test in `tests/rls/signup-profile.test.mjs`: email sign-up creates exactly one profile with `role='student'`, `verified_teacher=false`, `status='active'` (SC-002)
- [ ] T021a [P] [US1] RLS test in `tests/rls/email-confirmation.test.mjs`: an account created with an unconfirmed email cannot obtain a session; after confirmation sign-in succeeds (FR-002, US1 acceptance scenario 2, contracts §D item 3)
- [ ] T022 [P] [US1] RLS test in `tests/rls/signup-role-allowlist.test.mjs`: `signUp` with `data.role='admin'` yields `role='student'`; with `data.role='teacher'` yields `role='teacher'` and `verified_teacher=false` (FR-003, FR-009)
- [ ] T023 [P] [US1] RLS test in `tests/rls/identity-linking.test.mjs`: Google sign-in on an email with an existing password account resolves to the **same** `profiles.id` (FR-003a)
- [ ] T024 [P] [US1] RLS test in `tests/rls/profile-isolation.test.mjs`: a student selecting their own row gets 1 row; selecting another user's row gets **0 rows**, not an error (FR-016)
- [ ] T024a [P] [US1] RLS test in `tests/rls/own-profile-update.test.mjs`: a user can UPDATE `full_name` on their own row, and the same statement touching `role`, `verified_teacher`, or `status` errors (FR-010 positive case paired with FR-006)
- [ ] T025 [P] [US1] E2E test in `tests/e2e/auth-signup.spec.ts`: sign-up returns the user to the originating page, header shows name or email fallback (FR-013, FR-010b)

### Implementation for User Story 1

- [ ] T026 [P] [US1] Build the sign-up page at `src/pages/app/signup.tsx` with Google button, email/password form, and an optional student/teacher role choice defaulting to student (FR-001, FR-003)
- [ ] T027 [P] [US1] Build the sign-in page at `src/pages/app/login.tsx` with both providers and bilingual errors from `src/lib/authErrors.ts` (FR-001, FR-014)
- [ ] T028 [US1] Implement return-to-origin redirect handling in `src/lib/authRedirect.ts` and wire it into both pages (FR-013)
- [ ] T029 [US1] Implement `src/components/NavbarAuthWidget.tsx` showing Sign in when signed out, else name — falling back to the account email when `full_name` is null (FR-010b)
- [ ] T030 [US1] Register the navbar widget in `docusaurus.config.ts` navbar items and confirm it renders on docs and app routes alike
- [ ] T031 [US1] Implement the one-time role prompt for OAuth users in `src/pages/app/profile.tsx`, setting `role_chosen_at` (research.md R3 — Google has no pre-consent metadata hook)
- [ ] T031a [US1] Add display-name editing to `src/pages/app/profile.tsx` — a user may set or change their own `full_name` at any time, with the navbar reflecting the change on save (FR-010)

**Checkpoint**: US1 fully functional and independently testable. **This is the MVP.**

---

## Phase 4: User Story 2 - Recover access to an account (Priority: P1)

**Goal**: A user resets a forgotten password by email without administrator involvement.

**Independent Test**: Request a reset for a known email, follow the link, set a new password;
sign-in succeeds with the new password and fails with the old one.

### Tests for User Story 2 ⚠️

- [ ] T032 [P] [US2] E2E test in `tests/e2e/auth-reset.spec.ts`: full reset journey — request → link → new password → sign-in succeeds, old password rejected (FR-004, SC-003)
- [ ] T033 [P] [US2] Unit test in `tests/unit/auth-errors.test.mjs`: expired/used reset link and rate-limit codes map to friendly bilingual messages, never raw provider text (FR-014)

### Implementation for User Story 2

- [ ] T034 [US2] Build the reset-request and new-password pages at `src/pages/app/reset.tsx`, reporting success uniformly to avoid account enumeration (contracts §A)
- [ ] T035 [US2] Extend `src/lib/authErrors.ts` with expired-link, used-link, and reset rate-limit cases in English and Urdu

**Checkpoint**: US1 and US2 both work independently.

---

## Phase 5: User Story 3 - Self-select a teaching role; admin manages roles (Priority: P2)

**Goal**: Teacher role is self-selectable at sign-up but grants peer-teaching only; answer-key
access requires an admin-granted `verified_teacher`; admins manage roles and review the audit.

**Independent Test**: Sign up as teacher → peer-teaching available, restricted material blocked.
As admin, change a role and grant `verified_teacher` → both apply by the user's next load and
each writes exactly one audit row.

### Tests for User Story 3 ⚠️

> These are the SC-004 evidence set. Negative cases are mandatory — happy-path-only tests cannot
> detect an over-permissive policy.

- [ ] T036 [P] [US3] RLS test in `tests/rls/privileged-columns.test.mjs`: a non-admin updating their own `role`, `verified_teacher`, or `status` **errors** (not a silent no-op) (FR-006, FR-010a)
- [ ] T037 [P] [US3] RLS test in `tests/rls/admin-role-change.test.mjs`: admin changing another user's role succeeds **and** writes exactly one audit row with `actor_id` = the admin (FR-007, FR-018)
- [ ] T038 [P] [US3] RLS test in `tests/rls/audit-immutability.test.mjs`: non-admin SELECT returns 0 rows; INSERT/UPDATE/DELETE all error for every role including admin (FR-019)
- [ ] T039 [P] [US3] RLS test in `tests/rls/audit-actor-spoofing.test.mjs`: a client-supplied `actor_id` cannot override the trigger-derived value (FR-018)
- [ ] T040 [P] [US3] RLS test in `tests/rls/verified-teacher-gate.test.mjs`: an unverified teacher is denied answer-key-bearing rows; a `verified_teacher` teacher is allowed (FR-005a, FR-017)
- [ ] T041 [P] [US3] E2E test in `tests/e2e/auth-roles.spec.ts`: self-selected teacher sees peer-teaching UI but no restricted material; non-admin reaching `/app/admin/users` is denied (FR-015)
- [ ] T041a [P] [US3] E2E test in `tests/e2e/auth-role-propagation.spec.ts`: an admin changes a signed-in user's role and grants `verified_teacher`; on the user's next page load both apply without re-authentication (FR-008, SC-005). Regression guard for research.md R2 — fails if role is ever moved into a JWT claim

### Implementation for User Story 3

- [ ] T042 [P] [US3] Implement `src/components/AuthGuard.tsx` gating children by role and/or `verified_teacher`, treating UI gating as cosmetic only — the database is the enforcement point (FR-005 authorization basis, FR-005a, Constitution Art. IX.2)
- [ ] T043 [US3] Build the admin user list at `src/pages/app/admin/users.tsx` with role editing and `verified_teacher` toggle, wrapped in `AuthGuard` requiring admin (FR-007, FR-015)
- [ ] T044 [US3] Build the audit history view in `src/pages/app/admin/audit.tsx` showing subject, actor, change type, before/after, and timestamp (FR-019, SC-008)
- [ ] T045 [US3] Surface role and verified status read-only on `src/pages/app/profile.tsx`, with copy explaining that role changes are requested from an administrator (FR-010a)

**Checkpoint**: US1, US2, and US3 all work independently.

---

## Phase 6: User Story 4 - Stay signed in across the whole site (Priority: P2)

**Goal**: One session spans textbook and app pages, survives browser restarts, and ends
everywhere on that device at sign-out.

**Independent Test**: Sign in, navigate docs ↔ app pages, close and reopen the browser — still
signed in throughout; sign out and confirm every page treats the user as signed out.

### Tests for User Story 4 ⚠️

- [ ] T046 [P] [US4] E2E test in `tests/e2e/auth-session.spec.ts`: session persists across docs↔app navigation and across a browser-context restart with no re-prompt (FR-011, FR-011a, SC-006)
- [ ] T047 [P] [US4] E2E test in `tests/e2e/auth-signout.spec.ts`: sign-out from a docs page ends the session on app pages too (FR-012)

### Implementation for User Story 4

- [ ] T048 [US4] Verify and, if needed, configure `persistSession` / `autoRefreshToken` defaults in `src/lib/supabase.ts`; add no custom token storage (spec §Security, research.md R1)
- [ ] T049 [US4] Add sign-out to `src/components/NavbarAuthWidget.tsx`, clearing context state and redirecting to the current page signed out (FR-012)
- [ ] T050 [US4] Add a loading state to `src/contexts/AuthContext.tsx` so pages do not flash signed-out content during session rehydration

**Checkpoint**: US1–US4 independently functional; US5 (account lifecycle) follows in Phase 7.

---

## Phase 7: User Story 5 - Manage the end of an account (Priority: P3)

**Goal**: An admin can suspend and reinstate accounts; a user can delete their own account with
identity removed and academic work retained anonymously.

**Independent Test**: Suspend a signed-in test user → session ends, sign-in refused, data
retained, reinstatement restores access. Delete a test account with submissions → sign-in
impossible, submissions still present and anonymous.

Both operations need the service-role key, which must never reach the browser (Constitution
Art. V.1) — hence Edge Functions.

### Tests for User Story 5 ⚠️

- [ ] T051 [P] [US5] RLS test in `tests/rls/suspended-lockout.test.mjs`: a suspended user fails every protected read and write, and cannot sign in (FR-020)
- [ ] T052 [P] [US5] RLS test in `tests/rls/deletion-tombstone.test.mjs`: after deletion the `auth.users` row is gone, the `profiles` tombstone remains with `full_name IS NULL`, and referencing rows still resolve (FR-021, SC-009)
- [ ] T053 [P] [US5] RLS test in `tests/rls/deletion-reregistration.test.mjs`: re-registering a deleted email creates a new `profiles.id` unrelated to the tombstone (FR-022)

### Implementation for User Story 5

- [ ] T054 [US5] Implement the `supabase/functions/admin-suspend/index.ts` Edge Function: verify caller is an active admin server-side, set `status`, then call `auth.admin.signOut(user_id,'global')` to revoke refresh tokens (a status column alone does not end a live session — research.md R5)
- [ ] T055 [US5] Implement the `supabase/functions/delete-account/index.ts` Edge Function: subject is `auth.uid()` only (never a body parameter, so one user can never delete another); null `full_name`, set `deleted_at`, then `auth.admin.deleteUser(uid)`
- [ ] T056 [US5] Add suspend/reinstate controls to `src/pages/app/admin/users.tsx` with a confirmation step
- [ ] T057 [US5] Add the delete-account flow to `src/pages/app/profile.tsx` with an explicit irreversibility warning stating that submitted work is retained anonymously (FR-022)
- [ ] T058 [US5] Extend `src/lib/authErrors.ts` and the sign-in path with the bilingual "account suspended" message (FR-020, FR-014)

**Checkpoint**: Full account lifecycle — create, suspend, reinstate, delete — is operational.

---

## Phase 8: Polish & Cross-Cutting Concerns

- [ ] T059 [P] Verify the Urdu locale renders all auth pages RTL-correctly; run `npm run write-translations` and translate new strings in `i18n/ur/code.json` (FR-014, SC-007, Constitution Art. III.8)
- [ ] T060 [P] Measure the content-page first-load bundle and lazy-load the auth client so pages stay under the < 200 KB budget (Constitution Art. V.5 — the plan's watch item). **MEASURED 2026-07-18, currently VIOLATING**: mounting `<AuthProvider>` at Root pulls `supabase-js` into `main.js`, which every content page loads. Baseline 465.2 KB raw / **144.5 KB gzip** → with auth 697.2 KB raw / **204.1 KB gzip**. That is +59.6 KB gzip and **4.1 KB over the budget**. Root cause: `getSupabase()` uses `require()`, which webpack bundles statically rather than code-splitting. Fix: switch to dynamic `import()` so supabase-js becomes a separate chunk fetched only when auth is used (makes `getSupabase()` async — ripples into `AuthContext`), or mount `<AuthProvider>` only on `/app` routes. Re-measure after fixing
- [ ] T060a [P] Run a Lighthouse audit against a preview deployment for one docs page and one auth page; record scores in `specs/002-authentication/lighthouse-results.md` and treat a Performance or Accessibility score below 90 as a gate failure (Constitution Art. VII engineering gate)
- [ ] T061 [P] Add accessibility passes to all auth forms: labels, focus order, error announcement, and 44px tap targets (Constitution Art. III.8)
- [ ] T062 Wire `npm run test:rls` and the auth e2e specs into `.github/workflows/` CI so a missing negative test fails the build (Constitution Art. VII engineering gate)
- [ ] T063 Register OAuth redirect URLs for localhost, Vercel preview, and `https://www.a2ahs.com`, then smoke-test the Google flow on a real mobile device, recording click count and elapsed time from "Sign up" to signed-in state; assert ≤ 2 clicks and < 30 s (quickstart.md §1.4 — the most common silent-failure mode; SC-001)
- [ ] T064 [P] Document the RLS access-control matrix results in `specs/002-authentication/rls-matrix-results.md` as the SC-004 evidence artifact
- [ ] T065 Run the full `quickstart.md` verification checklist end-to-end against a preview deployment
- [x] T066 Flip ADR-0005 from Proposed to Accepted in `history/adr/0005-self-selectable-teacher-role-with-verified-teacher-gate.md` and note the sign-up-only role restriction from Constitution v2.1.0 — **done 2026-07-18**: status was already Accepted; the Decision section's stale "may later switch their own role" clause was corrected to match v2.1.0, and plan/data-model references were added

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: no dependencies — start immediately
- **Foundational (Phase 2)**: depends on Setup — **BLOCKS all user stories**
- **US1 (Phase 3)**: depends on Phase 2 only
- **US2 (Phase 4)**: depends on Phase 2; independent of US1
- **US3 (Phase 5)**: depends on Phase 2; independent of US1/US2
- **US4 (Phase 6)**: depends on Phase 2; verification is strongest after US1 exists
- **US5 (Phase 7)**: depends on Phase 2; suspension UI (T056) also needs T043 from US3, and the delete flow (T057) shares `profile.tsx` with T031/T031a from US1
- **Polish (Phase 8)**: depends on all desired stories

### Critical path within Phase 2

Migrations are strictly ordered — T007 → T008 → T009 → T010 → T011/T012 → T013/T014/T015.
`is_admin()` (T010) must exist before any policy referencing it, and the tables before their
triggers. The client tasks T016–T019 are independent of the migration chain and can proceed
in parallel with it.

### Within each user story

Tests → components → pages → integration. Tests must fail before implementation.

### Parallel Opportunities

- Setup: T003, T004, T005, T006 in parallel
- Foundational: the client track (T016, T017) parallel with the migration chain; T018 depends on T016; T019 depends on T018
- All test tasks marked [P] within a story run in parallel
- After Phase 2, US1 / US2 / US3 can be built by different people simultaneously
- ⚠️ `src/lib/authErrors.ts` is touched by T017, T035, and T058 across Phase 2, US2, and Phase 7. If US2 and Phase 7 run concurrently, coordinate on this file — T017 stubs all keys up front to keep the later edits additive.
- ⚠️ `src/pages/app/profile.tsx` is touched by T031, T031a (US1), T045 (US3), and T057 (Phase 7). Sequential across phases as ordered, but a parallel US1/US3 split needs coordination.

---

## Parallel Example: User Story 3

```bash
# All six US3 tests together (they touch different files):
Task: "RLS test privileged-columns in tests/rls/privileged-columns.test.mjs"
Task: "RLS test admin-role-change in tests/rls/admin-role-change.test.mjs"
Task: "RLS test audit-immutability in tests/rls/audit-immutability.test.mjs"
Task: "RLS test audit-actor-spoofing in tests/rls/audit-actor-spoofing.test.mjs"
Task: "RLS test verified-teacher-gate in tests/rls/verified-teacher-gate.test.mjs"
Task: "E2E test auth-roles in tests/e2e/auth-roles.spec.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Phase 1 Setup → 2. Phase 2 Foundational (critical, blocks everything) → 3. Phase 3 US1
4. **STOP and VALIDATE**: sign-up and sign-in work end-to-end with correct default role
5. Deploy to preview and smoke-test Google OAuth on mobile before going further

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. + US1 → **MVP**, deployable
3. + US2 → account recovery, removes the lockout support burden
4. + US3 → roles, verified-teacher gate, audit (the security-critical increment)
5. + US4 → session-persistence verification
6. + US5 → suspension and deletion complete the lifecycle

### Security-gate note

Phase 5's test tasks (T036–T041a) plus T051–T053 constitute the SC-004 access-control evidence.
Treat a missing negative test as a failing gate: the risk this feature carries is an
over-permissive RLS policy leaking answer keys, and no happy-path test can detect that.

---

## Notes

- 72 tasks total: Setup 6, Foundational 15, US1 14, US2 4, US3 11, US4 5, US5 8, Polish 9
- 22 test tasks plus the T020 harness — proportionate to a feature whose core deliverable is authorization (11 of them are RLS negative-case tests)
- [P] = different files, no dependencies on incomplete work
- Commit after each task or logical group
- Stop at any checkpoint to validate a story independently
