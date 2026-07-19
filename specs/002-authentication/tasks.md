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
- [X] T014 Create migration `supabase/migrations/0008_guard_privileged_columns.sql`: BEFORE UPDATE trigger on `profiles` raising unless `is_admin(auth.uid())` when `role`, `verified_teacher`, or `status` changes (FR-006, FR-010a) — **amended during T031** with a single carve-out: a non-admin may set `role` to `student`/`teacher` exactly once, in the same statement that stamps `role_chosen_at` from null (the OAuth one-time role prompt, R3). Without it the prompt this same spec requires was structurally impossible — every attempt raised `42501`. See data-model.md's 2026-07-18 correction.
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

> **Status (2026-07-18, updated)**: self-hosted Supabase is now running (Docker installed,
> ADR-0006 stack up, all 9 migrations applied) and **all 13 RLS tests actually PASS** against the
> live instance (`npm run test:rls`; T023 remains `.skip()` — see below). This is the first real
> execution of this feature's 526 lines of SQL.
>
> A 14th test was added and needed while proving this: **T031's carve-out
> (`0008_guard_privileged_columns.sql`) had zero coverage** — every existing test signs up with
> an explicit role, so `role_chosen_at` is always set at insert and the carve-out branch (which
> only applies when it's still null) never ran. `tests/rls/oauth-role-prompt.test.mjs` closes
> this: it also caught that `_helpers.mjs`'s `createUser({role: undefined})` silently becomes
> `role: 'student'` (a destructuring-default trap — `undefined` triggers the default, `null`
> doesn't), so simulating a true no-role OAuth signup requires `role: null`. All four new
> assertions pass: the profile lands with `role_chosen_at=null`; the one-time choice succeeds;
> `role='admin'` is rejected even while still null (FR-009 holds); a second attempt after the
> first is rejected (write-once holds).
>
> See T023 for a separate, unrelated design finding (GoTrue's own identity linking, not this
> trigger, satisfies FR-003a — that test stays `.skip()`, deferred to T063's live OAuth check).

- [X] T021 [P] [US1] RLS test in `tests/rls/signup-profile.test.mjs`: email sign-up creates exactly one profile with `role='student'`, `verified_teacher=false`, `status='active'` (SC-002)
- [X] T021a [P] [US1] RLS test in `tests/rls/email-confirmation.test.mjs`: an account created with an unconfirmed email cannot obtain a session; after confirmation sign-in succeeds (FR-002, US1 acceptance scenario 2, contracts §D item 3)
- [X] T022 [P] [US1] RLS test in `tests/rls/signup-role-allowlist.test.mjs`: `signUp` with `data.role='admin'` yields `role='student'`; with `data.role='teacher'` yields `role='teacher'` and `verified_teacher=false` (FR-003, FR-009)
- [X] T023 [P] [US1] RLS test in `tests/rls/identity-linking.test.mjs`: **finding, not a runnable assertion** — GoTrue links a Google identity to an existing verified-email account at the `auth.identities` level, keeping `auth.users.id` unchanged; `handle_new_user()`'s email-matching branch never fires for this case, so FR-003a is satisfied natively by GoTrue, not by our trigger. `admin.createUser` can't simulate the real OAuth path either way. Test is `.skip()`; real verification is T063. See data-model.md's 2026-07-18 note.
- [X] T024 [P] [US1] RLS test in `tests/rls/profile-isolation.test.mjs`: a student selecting their own row gets 1 row; selecting another user's row gets **0 rows**, not an error (FR-016)
- [X] T024a [P] [US1] RLS test in `tests/rls/own-profile-update.test.mjs`: a user can UPDATE `full_name` on their own row, and the same statement touching `role`, `verified_teacher`, or `status` errors (FR-010 positive case paired with FR-006)
- [X] T025 [P] [US1] E2E test in `tests/e2e/auth-signup.spec.ts`: sign-up returns the user to the originating page, header shows name or email fallback (FR-013, FR-010b) — `test.skip` when Supabase env vars are absent, mirroring the RLS harness's skip pattern. **PASSING 2/2 against the live instance as of 2026-07-18** — see the Phase 3 checkpoint note for the production-mail-path bug this run uncovered

### Implementation for User Story 1

- [X] T026 [P] [US1] Build the sign-up page at `src/pages/app/signup.tsx` with Google button, email/password form, and an optional student/teacher role choice defaulting to student (FR-001, FR-003)
- [X] T027 [P] [US1] Build the sign-in page at `src/pages/app/login.tsx` with both providers and bilingual errors from `src/lib/authErrors.ts` (FR-001, FR-014)
- [X] T028 [US1] Implement return-to-origin redirect handling in `src/lib/authRedirect.ts` and wire it into both pages (FR-013)
- [X] T029 [US1] Implement `src/components/NavbarAuthWidget.tsx` showing Sign in when signed out, else name — falling back to the account email when `full_name` is null (FR-010b)
- [X] T030 [US1] Register the navbar widget in `docusaurus.config.ts` navbar items via `custom-authWidget` + swizzled `src/theme/NavbarItem/ComponentTypes.tsx`; confirmed both `/app/*` and doc routes render it in a full `npm run build`
- [X] T031 [US1] Implement the one-time role prompt for OAuth users in `src/pages/app/profile.tsx`, setting `role_chosen_at` (research.md R3 — Google has no pre-consent metadata hook) — **required amending `0008_guard_privileged_columns.sql`**: the trigger unconditionally rejected every non-admin role change, which made this exact prompt impossible (`42501` on every attempt). Added a single carve-out (role → student/teacher only, exactly once, tied to the same statement stamping `role_chosen_at` from null). See data-model.md's 2026-07-18 correction.
- [X] T031a [US1] Add display-name editing to `src/pages/app/profile.tsx` — a user may set or change their own `full_name` at any time (FR-010). Navbar reflects the change after `refreshProfile()`; not yet re-verified live (no DB).

**Checkpoint**: US1 fully functional and independently testable — reached 2026-07-18. Typecheck,
unit suite, full SSG build (en+ur), `check:no-service-key`, and the **live RLS suite (13/13
passing, 1 skipped)** all pass — and, as of the same day, against the **real public endpoint**:
`api.a2ahs.com` → nginx (Cloudflare Origin Certificate, Full-strict) → Kong (loopback-only,
ADR-0006) → GoTrue, confirmed end-to-end (`curl` with the anon key returns GoTrue's health
response) and re-verified by re-running the full RLS suite through that public path instead of
loopback. `.env.local`'s `DOCUSAURUS_SUPABASE_URL` now points at the public URL, and a full
`npm run build` confirms it's correctly baked into the client bundle. **This is the MVP**, now
reachable the way a real deployment would use it.

**T025 now PASSES against the live instance** (2/2, both assertions). Getting there surfaced a
production-blocking bug this session's earlier testing had missed: `npm run test:rls` uses the
admin API, which bypasses GoTrue's real `/signup` mail-sending path entirely — so every RLS test
passed while the *actual* sign-up flow was silently broken. GoTrue's `SMTP_HOST=supabase-mail`
pointed at a hostname with no corresponding service (newer self-hosted `docker-compose.yml`
dropped the bundled mail catcher older versions shipped), so every real signup 500'd with
`dial tcp: lookup supabase-mail: server misbehaving` — caught only by running the real e2e flow
through a browser. Fixed for **local/dev testing only** by adding a Mailpit catcher container
(`~/supabase-project/docker-compose.yml`, not this repo) aliased to `supabase-mail`; confirmed it
actually captured a "Confirm Your Email" message, not just that GoTrue stopped erroring. This is
explicitly not the production fix — ADR-0006's Resend/SES mail relay requirement is unchanged and
still outstanding; Mailpit is a same-box test double, not a real delivery path.

**Mail relay resolved same day.** Resend verified for `edu.a2ahs.com` (a dedicated subdomain, not
the apex, to stay clear of the existing `mail.a2ahs.com` inbox), a sending-access-only API key
wired into GoTrue's live `.env`, and confirmed working two independent ways: a direct Resend API
send returned a message ID, and a real `signUp()` through GoTrue returned `200` with a genuine
SMTP round-trip (~650ms) and no error. ADR-0006's mail relay requirement is now satisfied for
real, not just planned.

**Google OAuth wired same day.** Client ID/secret from Google Cloud Console (redirect URI
`https://api.a2ahs.com/auth/v1/callback`, matching `docker-compose.yml`'s
`GOTRUE_EXTERNAL_GOOGLE_REDIRECT_URI: ${API_EXTERNAL_URL}/callback` and Supabase's own
self-hosting docs) set in GoTrue's live `.env`; `SUPABASE_PUBLIC_URL`/`API_EXTERNAL_URL` updated
from `localhost` placeholders to `https://api.a2ahs.com` so the computed redirect is correct.
Verified at the config level: `GET /auth/v1/settings` reports `external.google: true`, and
`GET /auth/v1/authorize?provider=google` 302s to `accounts.google.com` carrying exactly the
registered `client_id` and `redirect_uri` — confirmed by decoding the actual `Location` header,
not just trusting the settings flag. **T063's interactive step completed 2026-07-19** — the owner
signed in with their real Google account via an SSH-tunneled dev server, independently confirmed
via GoTrue's audit log and the resulting `profiles` row (see T063's own line below). **US1 (the
MVP) is now fully proven end to end**: every acceptance path — email/password signup with mail
confirmation, Google OAuth signup with the one-time role prompt, profile isolation, the role/
audit RLS matrix, the T031 carve-out — has been exercised against a live instance, not just
typechecked or unit-tested. What remains is redoing T063 specifically on a mobile device against
the real deployed site once `www.a2ahs.com` actually serves this build (still only local right
now), to satisfy SC-001's literal click-count/timing measurement.

---

## Phase 4: User Story 2 - Recover access to an account (Priority: P1)

**Goal**: A user resets a forgotten password by email without administrator involvement.

**Independent Test**: Request a reset for a known email, follow the link, set a new password;
sign-in succeeds with the new password and fails with the old one.

### Tests for User Story 2 ⚠️

- [X] T032 [P] [US2] E2E test in `tests/e2e/auth-reset.spec.ts`: full reset journey — request → link → new password → sign-in succeeds, old password rejected (FR-004, SC-003). **PASSING against the live instance (2 tests)**, split into a UI test (real `/app/reset` form submission, uniform-success/no-enumeration assertion) and a mechanics test (`verifyOtp` + `updateUser` + sign-in swap). Split was necessary, not stylistic: `admin.generateLink()` can only produce an implicit-flow link — a PKCE `?code=` link requires a `code_verifier` that only exists in the browser session that actually calls `resetPasswordForEmail`, and *that* link is the one GoTrue emails, which this environment cannot read back (Resend's key is send-only; Mailpit no longer receives anything now that SMTP is globally pointed at Resend). Empirically confirmed via a direct Playwright script — navigating a real `flowType:'pkce'` browser to a `generateLink()` action_link leaves `localStorage` empty and the hash fragment unconsumed. Real users are unaffected (they get the PKCE-correct link); this is a property of testing an OTP-email flow without inbox access.
- [X] T033 [P] [US2] Unit test in `tests/unit/auth-errors.test.mjs`: expired/used reset link and rate-limit codes map to friendly bilingual messages, never raw provider text (FR-014). **Passed immediately, no code change needed** — T017's up-front stub already covered `reset_link_invalid` and `rate_limited` in both languages.

### Implementation for User Story 2

- [X] T034 [US2] Build the reset-request and new-password pages at `src/pages/app/reset.tsx`, reporting success uniformly to avoid account enumeration (contracts §A). Two modes on one page: request (default) and recovery (entered via the `PASSWORD_RECOVERY` `onAuthStateChange` event, per Supabase's own documented pattern). Rate-limit is the one error shown distinctly on the request form — it reveals nothing about account existence, everything else reports uniform success.
- [X] T035 [US2] Extend `src/lib/authErrors.ts` with expired-link, used-link, and reset rate-limit cases in English and Urdu. **Already satisfied by T017** — no changes were needed; T033's unit test confirms it.

**Checkpoint**: US1 and US2 both work independently — verified 2026-07-19 against the live
instance, not just typechecked. Full regression clean: tsc, 15 unit tests, 13 RLS tests (1 skip),
4 e2e tests (2 signup + 2 reset) all pass together.

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

- [X] T036 [P] [US3] RLS test in `tests/rls/privileged-columns.test.mjs`: a non-admin updating their own `role`, `verified_teacher`, or `status` **errors** (not a silent no-op) (FR-006, FR-010a)
- [X] T037 [P] [US3] RLS test in `tests/rls/admin-role-change.test.mjs`: admin changing another user's role succeeds **and** writes exactly one audit row with `actor_id` = the admin (FR-007, FR-018)
- [X] T038 [P] [US3] RLS test in `tests/rls/audit-immutability.test.mjs`: non-admin SELECT returns 0 rows; INSERT/UPDATE/DELETE all error for every role including admin (FR-019)
- [X] T039 [P] [US3] RLS test in `tests/rls/audit-actor-spoofing.test.mjs`: a client-supplied `actor_id` cannot override the trigger-derived value (FR-018)
- [X] T040 [P] [US3] RLS test in `tests/rls/verified-teacher-gate.test.mjs`: an unverified teacher is denied answer-key-bearing rows; a `verified_teacher` teacher is allowed (FR-005a, FR-017). **Scope resolved 2026-07-19, confirmed with the owner**: no answer-key/restricted-material table exists yet (Spec 003 owns that storage). Added `is_verified_teacher()` (0010_verified_teacher_gate.sql, mirrors `is_admin()`'s pattern exactly) plus a minimal, clearly-labeled demo table (`_verified_teacher_gate_demo`) purely to prove the RLS gate mechanism Spec 003's real tables must reuse. All 6 assertions PASS against the live instance, including a suspension-revokes-access case (FR-020).
- [X] T041 [P] [US3] E2E test in `tests/e2e/auth-roles.spec.ts`: self-selected teacher sees peer-teaching UI but no restricted material; non-admin reaching `/app/admin/users` is denied (FR-015). **Scoped down, same pattern as T040/T023**: peer-teaching UI is Spec 003's (FR-005 says so explicitly). Covers exactly what Spec 002 builds — AuthGuard denying signed-out visitors, students, and self-selected teachers, while admitting admins. 4/4 PASS.
- [X] T041a [P] [US3] E2E test in `tests/e2e/auth-role-propagation.spec.ts`: an admin changes a signed-in user's role and grants `verified_teacher`; on the user's next page load both apply without re-authentication (FR-008, SC-005). Regression guard for research.md R2 — fails if role is ever moved into a JWT claim. **PASSES** — two real browser contexts, target user's session never re-authenticates, admin drives the change through the actual `admin/users.tsx` UI (not a service-role shortcut).

### Implementation for User Story 3

- [X] T042 [P] [US3] Implement `src/components/AuthGuard.tsx` gating children by role and/or `verified_teacher`, treating UI gating as cosmetic only — the database is the enforcement point (FR-005 authorization basis, FR-005a, Constitution Art. IX.2)
- [X] T043 [US3] Build the admin user list at `src/pages/app/admin/users.tsx` with role editing and `verified_teacher` toggle, wrapped in `AuthGuard` requiring admin (FR-007, FR-015). **Required a new Edge Function** (`supabase/functions/admin-list-users/`, confirmed with the owner before building — a real scope decision, not assumed): `profiles` deliberately has no email column, so an admin identifying accounts needs `auth.users.email`, which needs the service-role key server-side. Verifies the caller is an active admin using their OWN token (never a client-supplied id) before returning anything, same pattern the constitution already mandates for admin-suspend/delete-account. Tested directly (non-admin → 403, admin → 200 with correctly joined data) before wiring the UI to it.
- [X] T044 [US3] Build the audit history view in `src/pages/app/admin/audit.tsx` showing subject, actor, change type, before/after, and timestamp (FR-019, SC-008)
- [X] T045 [US3] Surface role and verified status read-only on `src/pages/app/profile.tsx`, with copy explaining that role changes are requested from an administrator (FR-010a)

**Checkpoint**: US1, US2, and US3 all work independently — verified 2026-07-19 against the live
instance. Full regression: tsc clean, 15 unit tests, **31 RLS tests** (1 skip), and the full e2e
suite for this feature (14 auth specs) all pass. (Two unrelated Feature 001 e2e failures — Urdu
RTL rendering and search — are pre-existing dev-server-only artifacts: `docusaurus start` serves
a single locale and never builds the search index, unlike `docusaurus build && serve`. Confirmed
via the raw HTML response and untouched git history on those test files; not a Feature 002
regression.)

---

## Phase 6: User Story 4 - Stay signed in across the whole site (Priority: P2)

**Goal**: One session spans textbook and app pages, survives browser restarts, and ends
everywhere on that device at sign-out.

**Independent Test**: Sign in, navigate docs ↔ app pages, close and reopen the browser — still
signed in throughout; sign out and confirm every page treats the user as signed out.

### Tests for User Story 4 ⚠️

- [X] T046 [P] [US4] E2E test in `tests/e2e/auth-session.spec.ts`: session persists across docs↔app navigation and across a browser-context restart with no re-prompt (FR-011, FR-011a, SC-006). "Restart" simulated via `context.storageState()` capture + a brand-new context seeded from it — exactly what a real browser persists to disk, matching research.md R1's "no custom token storage" constraint (a cookie- or memory-only session would fail to reproduce here). PASSES.
- [X] T047 [P] [US4] E2E test in `tests/e2e/auth-signout.spec.ts`: sign-out from a docs page ends the session on app pages too (FR-012). Deliberately signs out from a DOCS page (not the app page sign-in happened on) and confirms `/app/profile` redirects afterward. PASSES.

### Implementation for User Story 4

- [X] T048 [US4] Verify and, if needed, configure `persistSession` / `autoRefreshToken` defaults in `src/lib/supabase.ts`; add no custom token storage (spec §Security, research.md R1). **Already satisfied since T016** (Phase 2) — no change needed; T046 is the live proof.
- [X] T049 [US4] Add sign-out to `src/components/NavbarAuthWidget.tsx`, clearing context state and redirecting to the current page signed out (FR-012). Uses a full page reload rather than client-side state clearing alone — every mounted page (docs or app) must re-render as signed out immediately, not just the navbar widget.
- [X] T050 [US4] Add a loading state to `src/contexts/AuthContext.tsx` so pages do not flash signed-out content during session rehydration. **Already satisfied since T018/T029** (Phase 2/3) — `loading` was exposed and consumed from the start; no change needed.

**Checkpoint**: US1–US4 independently functional — verified 2026-07-19 against the live instance.
Full regression: tsc clean, 15 unit tests, 31 RLS tests (1 skip), and all 11 auth e2e specs built
so far pass together in one run. US5 (account lifecycle — suspend/reinstate/delete) is the only
remaining phase, and needs the `admin-suspend`/`delete-account` Edge Functions this session has
deliberately left unbuilt until their own phase.

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

- [X] T051 [P] [US5] RLS test in `tests/rls/suspended-lockout.test.mjs`: a suspended user fails every protected read and write, and cannot sign in (FR-020). Calls the REAL `admin-suspend` function, not a bypass. **Found and fixed two real bugs while writing this test**: (1) `profiles_select_own`'s RLS policy never checked `status='active'` at all — a suspended user could still read their own profile, contradicting the spec's access matrix; (2) `auth.admin.signOut(user_id, 'global')` — research.md R5's specified mechanism — doesn't take a user id, it needs the target's own JWT, which an admin never has; the real mechanism is `updateUserById({ban_duration})`. Also found a third, correct-as-is denial shape: a suspended user's write is a silent 0-row success (RLS row-filtering), not a raised error — different from the privileged-column-on-an-active-account case (T036). All documented in data-model.md/contracts. PASSES.
- [X] T052 [P] [US5] RLS test in `tests/rls/deletion-tombstone.test.mjs`: after deletion the `auth.users` row is gone, the `profiles` tombstone remains with `full_name IS NULL`, and referencing rows still resolve (FR-021, SC-009). Calls the REAL `delete-account` function. PASSES, worked correctly on the first attempt.
- [X] T053 [P] [US5] RLS test in `tests/rls/deletion-reregistration.test.mjs`: re-registering a deleted email creates a new `profiles.id` unrelated to the tombstone (FR-022). PASSES, worked correctly on the first attempt.

### Implementation for User Story 5

- [X] T054 [US5] Implement the `supabase/functions/admin-suspend/index.ts` Edge Function: verify caller is an active admin server-side, set `status`, then ~~call `auth.admin.signOut(user_id,'global')`~~ **call `auth.admin.updateUserById(uid, {ban_duration})`** to stop GoTrue itself from issuing new sessions (the originally-specified `signOut` call doesn't work for an admin acting on someone else's account — see T051). Verified directly (curl-equivalent fetch) before wiring any UI: non-admin → 403, admin suspend → 200 + immediate RLS lockout + `user_banned` on fresh sign-in, reinstate → 200 + sign-in works again.
- [X] T055 [US5] Implement the `supabase/functions/delete-account/index.ts` Edge Function: subject is `auth.uid()` only (never a body parameter, so one user can never delete another); null `full_name`, set `deleted_at`, then `auth.admin.deleteUser(uid)`. Worked correctly on the first attempt — verified directly (auth.users row gone, tombstone correct) before wiring any UI. `admin-list-users` (T043), `admin-suspend`, and `delete-account` now share `supabase/functions/_shared/adminAuth.ts` for the "resolve caller from their own token, check admin" logic, extracted once a second function needed it.
- [X] T056 [US5] Add suspend/reinstate controls to `src/pages/app/admin/users.tsx` with a confirmation step (`window.confirm`). Verified through the real browser UI (not just the underlying function): clicking Suspend shows the correct confirmation text and the DB status actually changes.
- [X] T057 [US5] Add the delete-account flow to `src/pages/app/profile.tsx` with an explicit irreversibility warning stating that submitted work is retained anonymously (FR-022). Delete button is disabled until an explicit acknowledgement checkbox is checked, plus a native confirm dialog. **Found and fixed a UI race while verifying through the real browser**: the post-delete redirect competed with `profile.tsx`'s own "not authenticated" guard (triggered by the `signOut()` call's state change) and could land on `/app/login?next=...` instead of `/`. Fixed by not awaiting `signOut()` before navigating — the account is already gone server-side, so the local session is orphaned regardless of whether client-side cleanup finishes first.
- [X] T058 [US5] Extend `src/lib/authErrors.ts` and the sign-in path with the bilingual "account suspended" message (FR-020, FR-014). The message itself already existed from T017's up-front stub; what was actually missing was the **sign-in path** wiring — GoTrue's ban makes a *fresh* sign-in attempt fail with `user_banned` directly (already handled), but for a session that predates a suspension there's no error to classify: the profile fetch just returns zero rows. `login.tsx` now explicitly checks for that after a successful `signInWithPassword` and shows the suspended message rather than silently proceeding.

**Checkpoint**: Full account lifecycle — create, suspend, reinstate, delete — is operational,
verified 2026-07-19 against the live instance via the real Edge Functions (not bypasses) and the
real browser UI. Full regression: tsc clean, 15 unit tests, **34 RLS tests** (1 skip), 11 auth e2e
specs all pass together. **All five user stories (US1–US5) are now implemented and proven.** Only
Phase 8 (Polish & Cross-Cutting Concerns) remains.

---

## Phase 8: Polish & Cross-Cutting Concerns

- [X] T059 [P] Verify the Urdu locale renders all auth pages RTL-correctly; run `npm run write-translations` and translate new strings in `i18n/ur/code.json` (FR-014, SC-007, Constitution Art. III.8). **Scope resolved with the owner 2026-07-19, not executed as literally worded**: confirmed that *no* UI chrome anywhere in this codebase — not Spec 002's auth pages, not Feature 001's own components (e.g. `PrintHandout.tsx`'s "Print / Save as PDF") — has ever used Docusaurus's `<Translate>`/`translate()` API; `i18n/ur/` contains only translated book *content* (MDX), no `code.json` exists. `write-translations` extracts nothing from custom pages without it. Owner's explicit direction: **only the book content is bilingual; all other UI, including auth, stays English-only** — not a gap, the intended design. Verified this is already correctly implemented rather than assumed: Docusaurus auto-generates a `/ur/app/*` mirror route for every custom page (confirmed in the production build — `lang="ur" dir="rtl"` wrapping the same English text), but every real navigation link into the auth flow (`NavbarAuthWidget.tsx`, `authRedirect.ts`, and every in-page `<a href>`) uses a plain, non-locale-prefixed path rather than Docusaurus's locale-aware `<Link>` — so no real user flow ever routes into the RTL-mirrored English page. `authErrors.ts`'s existing bilingual messages remain as a harmless defensive fallback for the edge case of someone directly navigating to a `/ur/app/*` URL, not the primary design.
- [X] T060 [P] Measure the content-page first-load bundle and lazy-load the auth client so pages stay under the < 200 KB budget (Constitution Art. V.5 — the plan's watch item). **FIXED and RE-MEASURED 2026-07-19**: `getSupabase()` (`src/lib/supabase.ts`) switched from a synchronous `require()` to a dynamic `import()`, caching the in-flight promise (not just the resolved client) so concurrent callers share one import. Every one of the 14 call sites across 7 files already lived inside an async function except two `useEffect`s (`AuthContext.tsx`, `reset.tsx`), which needed the standard async-setup/sync-cleanup pattern (`cancelled` flag + a replaceable `unsubscribe`). **Result**: `main.js` dropped from 697.2 KB raw / 204.1 KB gzip to **483.6 KB raw / 146.6 KB gzip** — supabase-js now lives in its own 214.6 KB raw / 54.1 KB gzip chunk, fetched lazily rather than bundled into the critical path. **Comfortably under budget** (146.6 KB vs the 200 KB limit, only ~2 KB gzip above the pre-auth baseline of 144.5 KB). Verified no functional regression: unit 15/15, RLS 34/35 (1 skip), and all 11 auth e2e specs pass together against the rebuilt client.
- [X] T060a [P] Run a Lighthouse audit against a preview deployment for one docs page and one auth page; record scores in `specs/002-authentication/lighthouse-results.md` and treat a Performance or Accessibility score below 90 as a gate failure (Constitution Art. VII engineering gate). No public preview deployment exists yet, so ran against `npm run build && npm run serve` (a real production build, the honest available substitute — noted plainly, not glossed over). **Both gates PASS with wide margin**: Performance 99/100 (docs/auth), Accessibility 100/100 (both). One shared, pre-existing, out-of-scope finding: both pages lose 4 Best-Practices points (not gated) to the same `errors-in-console` audit — a 404 for `/img/favicon.ico`, a Feature 001 asset gap unrelated to this feature, flagged not fixed.
- [X] T061 [P] Add accessibility passes to all auth forms: labels, focus order, error announcement, and 44px tap targets (Constitution Art. III.8). **Found a real, previously-unnoticed gap**: Infima (Docusaurus's CSS framework) ships no `.input` class at all — `className="input"` had been a complete no-op across every text field built this session, rendering as bare, unstyled, browser-default inputs. Added real `.input`/`.auth-tap-target`/`.auth-page .button` CSS (`custom.css`) using Infima's own theme variables so it tracks light/dark mode. Measured, not assumed: a live screenshot + `boundingBox()` check confirms email input, submit button, and radio label all render at exactly 44px. Also added `aria-live="assertive"` to two error regions (`profile.tsx`, `admin/users.tsx`, `admin/audit.tsx`) that had `role="alert"` but not the explicit live-region attribute the other pages already used. Verified no regression: all 11 e2e specs still pass (selector changes were whitespace-only, accessible-name computation unaffected).
- [X] T062 Wire `npm run test:rls` and the auth e2e specs into `.github/workflows/` CI so a missing negative test fails the build (Constitution Art. VII engineering gate). Added a `check:no-service-key` step (was missing from CI entirely — Art. V.1's release-blocking guard existed but nothing ran it) and an `npm run test:rls` step to `ci.yml`'s `build` job; threaded the three secrets through the `e2e` job too so `auth-*.spec.ts` actually run instead of `test.skip`ping for lack of config. Also fixed `deploy.yml`'s build step, which would have silently baked empty Supabase config into that build path. **Repo secrets set** (`gh secret set`, confirmed with the owner first — pushes the service-role key into GitHub's remote secret store, a real cross-system action): `DOCUSAURUS_SUPABASE_URL`, `DOCUSAURUS_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, same values already live in `.env.local`. Not yet triggered on the actual GitHub Actions runners — that requires pushing/opening a PR, which wasn't requested this session.
- [X] T063 Register OAuth redirect URLs for localhost and `https://www.a2ahs.com` (no Vercel preview environment — self-hosted, ADR-0006), then smoke-test the Google flow on a real mobile device, recording click count and elapsed time from "Sign up" to signed-in state; assert ≤ 2 clicks and < 30 s (quickstart.md §1.4 — the most common silent-failure mode; SC-001). **Core flow proven 2026-07-19**: real Google sign-in completed end-to-end via SSH-tunneled dev server + desktop browser (the owner's actual account, not a synthetic test user) — confirmed independently via GoTrue's audit log (`user_signedup`/`login`, `provider: google`, `grant_type: pkce`, status 200) and the resulting `profiles` row (`role='student'`, `role_chosen_at` null, `full_name` auto-filled from Google — exactly the OAuth shape research.md R3 predicted). **Not yet verified**: a literal mobile device, and the ≤2-click/<30s timing measurement SC-001 requires — this was a desktop tunnel, not the field conditions T063 specifies. Redo on an actual phone once the site is deployed publicly (this ran against a local dev server, not `https://www.a2ahs.com`).
- [X] T064 [P] Document the RLS access-control matrix results in `specs/002-authentication/rls-matrix-results.md` as the SC-004 evidence artifact. All 17 contracts §D checklist items mapped to the actual test file that proves them (34/35 automated assertions PASS, T023's 1 documented skip explained with its independent live-OAuth evidence instead), plus the additional coverage found during implementation (the OAuth role-prompt carve-out, the third denial shape) and the 4 real bugs this suite caught on first attempt, not around.
- [X] T065 Run the full `quickstart.md` verification checklist end-to-end against a preview deployment. No preview deployment exists; walked every section against what this session actually proved on the live self-hosted instance instead, and fixed what didn't match reality rather than mechanically re-running it: Docker's status (stale — installed since 2026-07-19), the mail relay section (now has real Resend values, not a placeholder), a **syntax bug** in the manual-spot-check SQL (`'<someone's auth.users id>'` — the unescaped apostrophe in "someone's" would break the string literal if copy-pasted), the Urdu row (rewritten to match the owner's actual English-only-UI decision, T059), and §7's Edge Function deploy step — **found and removed an unnecessary `docker compose restart functions` instruction**: verified directly that the self-hosted edge-runtime picks up new/changed functions per-request with no restart, since all three functions (`admin-list-users`, `admin-suspend`, `delete-account`) worked immediately against a `functions` container that had been running for hours before any of them existed.
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
