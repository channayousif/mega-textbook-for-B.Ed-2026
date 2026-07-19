---
id: 0012
title: Implement US1 sign-up and sign-in
stage: green
date: 2026-07-18
surface: agent
model: claude-sonnet-5
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: /sp.implement
labels: ["implement", "authentication", "supabase", "rls", "oauth", "navbar"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: history/adr/0005-self-selectable-teacher-role-with-verified-teacher-gate.md
  pr: null
files:
 - tests/rls/signup-profile.test.mjs
 - tests/rls/email-confirmation.test.mjs
 - tests/rls/signup-role-allowlist.test.mjs
 - tests/rls/identity-linking.test.mjs
 - tests/rls/profile-isolation.test.mjs
 - tests/rls/own-profile-update.test.mjs
 - tests/e2e/auth-signup.spec.ts
 - src/lib/authRedirect.ts
 - src/pages/app/login.tsx
 - src/pages/app/signup.tsx
 - src/pages/app/profile.tsx
 - src/components/NavbarAuthWidget.tsx
 - src/theme/NavbarItem/ComponentTypes.tsx
 - docusaurus.config.ts
 - supabase/migrations/0008_guard_privileged_columns.sql
 - specs/002-authentication/data-model.md
 - specs/002-authentication/tasks.md
tests:
 - "PASS: npx tsc --noEmit (clean)"
 - "PASS: npm test (10 unit tests, 4 files, no regression)"
 - "PASS: npm run test:rls (10 tests, all skip cleanly via rlsConfigured — no DB in this environment)"
 - "PASS: npm run build (full SSG, en + ur locales, /app/login, /app/signup, /app/profile all emitted)"
 - "PASS: npm run check:no-service-key (re-verified clean after adding auth pages)"
 - "NOT RUN: RLS/E2E assertions against a live Supabase instance — still no Docker/psql/CLI in this environment"
---

## Prompt

i did it, continue sp.impliment

(Context: this followed the user running, in their own terminal, the sudo commands to stop and
disable `mariadb`, `vsftpd`, and `php8.3-fpm` on the Hestia host — freeing RAM in preparation for
a self-hosted Supabase stack, per the earlier `#decision: we will go with selfhosted backend`.
The message above is the complete, verbatim instruction that followed.)

## Response snapshot

Re-invoked `/sp.implement`. Prerequisites check confirmed `tasks.md` present with 51 tasks
remaining; re-verified no Docker/psql/Supabase CLI exists in this environment (the blocker noted
at the end of the previous PHR is still open — the Hestia service trim did not include installing
Docker). Proceeded with Phase 3 (User Story 1 — sign up and sign in as a student, the P1 MVP)
since all of it can be authored and typechecked/built without a live database; RLS/E2E execution
against real data remains blocked exactly as before.

Delivered all 14 US1 tasks (T021–T031a): six RLS test files plus one E2E spec written against the
actual migrations and the T020 harness, then the sign-up/sign-in pages, the return-to-origin
redirect helper, the navbar identity widget (registered via Docusaurus's `custom-` navbar item
mechanism — verified the exact swizzle pattern via Context7 rather than assuming it), and the
profile page's one-time OAuth role prompt plus display-name editing.

**Two findings from writing this phase, neither from the docs:**

1. **T023's identity-linking assertion (FR-003a) turns out to be unwritable as an RLS test, and
   possibly unnecessary.** Queried Supabase Auth's own source (`DetermineAccountLinking`) via
   Context7: GoTrue links a Google identity to an existing verified-email account at the
   `auth.identities` level, keeping `auth.users.id` unchanged. No new `auth.users` row is
   inserted, so `handle_new_user()`'s AFTER INSERT trigger — and its email-matching re-link
   branch — never fires for the scenario FR-003a describes. The guarantee is delivered natively
   by GoTrue, not by application code. `admin.createUser` also can't simulate this: it enforces
   email uniqueness before any trigger runs. Left the migration as-is (harmless, unreachable
   defensive code) and turned T023 into a documented `.skip()`, deferring real verification to
   T063's live OAuth smoke test. Recorded in data-model.md rather than silently asserting
   something unverifiable.

2. **T031's one-time OAuth role prompt was structurally impossible under the migration written
   last session.** `guard_privileged_columns()` (0008) rejected *every* non-admin change to
   `role`, unconditionally — including the one-time choice that the very same spec (research.md
   R3: "Google has no pre-consent metadata hook") requires. Every attempt from `profile.tsx`
   would have raised `42501`. Fixed by amending 0008 with a single carve-out: a non-admin may set
   `role` to `student`/`teacher` (never `admin` — FR-009 preserved) exactly once, in the same
   statement that stamps `role_chosen_at` from null. The existing write-once check on
   `role_chosen_at` closes the door immediately after. This is the third implementation-discovered
   spec/code contradiction in this feature (after the CASCADE/FR-021 conflict and this session's
   GoTrue finding) — same failure class each time: individually reasonable pieces that only
   conflict when actually built.

**Verified (actually ran):** typecheck clean; unit suite unchanged at 10/10; the RLS suite now
collects 10 tests across 6 new files and skips all of them cleanly through the existing
`rlsConfigured` gate (no false green — genuinely not executed, and it says so); full SSG build
succeeds for both locales with `/app/login`, `/app/signup`, `/app/profile` all emitting; the
service-key guard was re-run and still finds nothing.

**Not verified (stated plainly, same as last session):** no RLS assertion, no E2E assertion, and
no real OAuth round-trip has ever executed. The Art. V.5 bundle-budget violation from T060 is
unchanged and still unfixed. `tasks.md` records all of this precisely rather than marking
anything green that didn't run.

## Outcome

- ✅ Impact: User Story 1 (the P1 MVP) is code-complete — sign-up, sign-in, Google OAuth, return-to-origin, the one-time role prompt, and display-name editing all exist and build cleanly. Still blocked from being *proven* until a Supabase instance exists.
- 🧪 Tests: tsc + unit (10/10) + build (en+ur) + guard PASS. RLS (10 tests) and E2E (2 tests) exist and are structurally sound but NOT RUN — no database in this environment.
- 📁 Files: 12 new, 5 modified (1 migration amended for a correctness bug, not a style change).
- 🔁 Next prompts: stand up the self-hosted Supabase stack (blocked on Docker, which the Hestia trim did not install) or a disposable hosted project, then `npm run test:rls` and `npm run test:e2e` to actually prove Phase 3 before calling it the MVP. The constitution/ADR amendment for the self-hosted-backend decision is still outstanding, asked three times previously.
- 🧠 Reflection: both findings this session came from writing tests and reading a real upstream source (GoTrue's linking logic), not from re-reading our own docs — echoing the previous PHR's point that execution surfaces contradictions review passes miss. The role-prompt one is more serious than the CASCADE fix: it wasn't a schema mismatch, it was a security control that would have silently blocked a documented, spec-required user action in production, discoverable only by trying to write the UI that uses it.

## Evaluation notes (flywheel)

- Failure modes observed: (a) a BEFORE UPDATE trigger written to be maximally strict (no admin exception for a spec-mandated one-time self-service action) — over-restrictive security code is still a correctness bug, just one that fails safe; (b) an FR (FR-003a) whose acceptance criterion assumed application code was the enforcement mechanism when the actual guarantee comes from the platform underneath it — worth checking upstream behavior before writing enforcement code for something the platform may already handle.
- Graders run and results (PASS/FAIL): tsc PASS; vitest unit 10/10 PASS; vitest RLS 10/10 SKIP (not FAIL — no DB); docusaurus build PASS (en+ur); service-key guard PASS; RLS/E2E execution NOT RUN (infrastructure, not code).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): before writing a column-level guard trigger, enumerate every legitimate non-admin write path the spec requires (not just the malicious ones to block) — the role-prompt gap would have surfaced at write-time instead of implement-time if the trigger's design pass had cross-checked against every FR that involves a self-service write to a privileged column.
