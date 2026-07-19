---
id: 0021
title: Implement and verify US3 roles and admin
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: null
labels: ["roles", "admin", "verified-teacher", "audit", "edge-function", "us3", "sc-004"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - supabase/migrations/0010_verified_teacher_gate.sql
 - supabase/functions/admin-list-users/index.ts
 - src/components/AuthGuard.tsx
 - src/pages/app/admin/users.tsx
 - src/pages/app/admin/audit.tsx
 - src/pages/app/profile.tsx
 - tests/rls/privileged-columns.test.mjs
 - tests/rls/admin-role-change.test.mjs
 - tests/rls/audit-immutability.test.mjs
 - tests/rls/audit-actor-spoofing.test.mjs
 - tests/rls/verified-teacher-gate.test.mjs
 - tests/e2e/auth-roles.spec.ts
 - tests/e2e/auth-role-propagation.spec.ts
 - specs/002-authentication/tasks.md
 - specs/002-authentication/data-model.md
 - specs/002-authentication/quickstart.md
 - tsconfig.json
tests:
 - "PASS: npx tsc --noEmit (clean, after excluding supabase/functions — Deno, not Node)"
 - "PASS: npm test — 15 unit tests (unchanged, regression)"
 - "PASS: npm run test:rls — 31/32, 1 skip (18 new for US3)"
 - "PASS: npx playwright test tests/e2e/ — 19/21 (2 unrelated Feature 001 dev-server-only failures, confirmed pre-existing)"
---

## Prompt

continue with US3 roles and admin,

## Response snapshot

Implemented all 11 Phase 5 tasks (T036–T045) and verified every one against the live instance,
continuing this session's established discipline of not calling anything done until proven.

**Two genuine scope gaps surfaced before writing any code**, both resolved by asking rather than
improvising — the tasks assumed infrastructure Spec 002 doesn't actually own:

1. **T040** wants "an unverified teacher is denied answer-key-bearing rows," but no answer-key
   table exists — spec.md itself says that storage is "detailed in later specs" (Spec 003).
   Asked the owner; chose to add `is_verified_teacher()` (mirrors `is_admin()`'s exact pattern —
   SECURITY DEFINER, same recursion-avoidance reasoning) plus a minimal, clearly-labeled demo
   table (`_verified_teacher_gate_demo`, leading underscore signaling "not content") purely to
   prove the RLS gate mechanism Spec 003's real tables must reuse. New migration
   (`0010_verified_teacher_gate.sql`), applied to the live instance, all 6 test assertions pass
   including a suspension-revokes-access case.
2. **T043**'s admin user list needs to show *which* account is which, but `profiles` deliberately
   has no email column (avoids duplicating PII, Art. VIII.2) — reading `auth.users.email` needs
   the service-role key, which the constitution forbids in the browser. That means a new Edge
   Function, and admin-suspend/delete-account (the only two ever planned) are Phase 7, not built
   yet. Asked the owner rather than either building ahead of schedule silently or shipping a
   user list with no way to identify accounts; chose to build it now. `admin-list-users` verifies
   the caller is an active admin using their OWN token server-side (never a client-supplied id),
   the same pattern the constitution already mandates for the other two functions. Tested
   directly with curl-equivalent fetch calls (non-admin → 403, admin → 200 with correctly joined
   data, 118 users at the time) *before* wiring any UI to it.

**T036–T040** (RLS, the SC-004 evidence set): all 18 assertions passed on the first run against
the live instance — no debugging needed, unlike several earlier phases this session.

**T042–T045** (implementation): `AuthGuard.tsx` gates by role/verified_teacher, explicitly
documented as cosmetic-only (Constitution Art. IX.2 — RLS is the real enforcement, a bug here
degrades UX, not security). `admin/users.tsx` reads via the new Edge Function, writes directly
through the browser's own RLS-protected client (no need to route writes through the function —
T037 already proved the write path is correctly protected for an admin caller). `admin/audit.tsx`
is a read-only view with a client-side id→name/role lookup for readability. `profile.tsx` gained
a read-only role/verified-teacher section, gated on `role_chosen_at` being set (so it doesn't
appear alongside the one-time OAuth prompt from T031).

**T041/T041a** (e2e) hit two real, fixable issues, not infrastructure gaps this time:
- T041's original scope ("teacher sees peer-teaching UI") assumes UI that doesn't exist — FR-005
  itself says peer-teaching is "implemented by Spec 003." Narrowed to what Spec 002 actually
  builds (AuthGuard denial), same pattern as T023/T040. 4/4 pass.
- T041a — the regression guard for research.md R2 (role must never live in a JWT claim) — failed
  once on `.check()`'s strict "did the checkbox visually change" assertion, even though a
  standalone debug script proved the underlying feature worked correctly (DB showed the right
  values). Diagnosed as a controlled-component flicker: the native checkbox toggles instantly on
  click, React's controlled re-render briefly reverts it until the async update+reload resolves,
  and `.check()` samples right in that window. Fixed by switching to `.click()` + a retrying
  `toBeChecked()` — the same fix the standalone script had already stumbled into. Now passes:
  two real browser contexts, the target user's session never re-authenticates anywhere in the
  test, the admin drives the change through the actual `admin/users.tsx` UI, not a service-role
  shortcut.

**Full regression**: tsc clean (after adding `supabase/functions` to tsconfig's exclude list —
Deno globals aren't part of the Node project, same reason `tests/` is excluded); 15 unit tests
unchanged; 31 RLS tests (18 new) all pass; e2e suite 19/21, with the 2 failures independently
confirmed as pre-existing Feature 001 dev-server-only artifacts (Urdu locale and search index
both require `docusaurus build`, not `docusaurus start` — verified via the raw HTML response
showing `lang="en"` on the `/ur/` route, and confirmed those test files have no history from this
session). Cleaned up ~118 accumulated test-fixture users from this session's various debug
scripts down to the handful that don't match the `@example.test` pattern.

## Outcome

- ✅ Impact: US3 (roles, admin management, verified-teacher gate, audit trail) is implemented and proven against the live instance in the same session it was written — the SC-004 evidence set (this feature's core security claim) now has 18 passing negative-case tests behind it, not just a plan for them.
- 🧪 Tests: tsc clean; unit 15/15 (unchanged); RLS 31/32 + 1 skip (18 new, all passing); e2e 19/21 (2 pre-existing unrelated failures, confirmed not caused by this session).
- 📁 Files: 1 new migration, 1 new Edge Function, 4 new/modified pages, 7 new test files, 3 doc updates, 1 tsconfig fix.
- 🔁 Next prompts: US4 (session persistence across docs↔app navigation and browser restarts) and US5 (suspend/delete, which needs the admin-suspend/delete-account Edge Functions this phase deliberately didn't build) are the remaining phases per tasks.md.
- 🧠 Reflection: this phase's two "ask before building" moments (T040's demo table, T043's Edge Function) were both genuine spec/reality gaps, not manufactured caution — in both cases the literal task description assumed infrastructure that doesn't exist in this spec's scope, and building silently in either direction (skip the test vs. invent Spec 003's schema; ship a useless list vs. build ahead of schedule) would have been a real judgment call the owner should make, not one to default silently. Distinguishing "this needs a decision" from "this just needs debugging" (the `.check()` timing issue) continues to be the more valuable skill than either always asking or never asking.

## Evaluation notes (flywheel)

- Failure modes observed: (a) `.check()`'s stricter pre/post-state assertion doesn't tolerate a legitimate async-controlled-component flicker that `.click()` + a separately-retrying `toBeChecked()` handles correctly — worth remembering for any future test touching a controlled checkbox backed by an async handler; (b) none in the RLS layer this time — the SC-004 test set passed clean on the first attempt, a first for this session's negative-case suites.
- Graders run and results (PASS/FAIL): tsc PASS; unit 15/15 PASS; RLS 31/32 PASS + 1 skip; e2e 19/21 PASS (2 pre-existing failures outside this session's scope, independently confirmed).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when a Playwright `.check()`/`.uncheck()` call targets a checkbox driven by an async handler (not a purely synchronous local state update), default to `.click()` + a separate `expect(...).toBeChecked()` from the start rather than discovering the flicker failure first — the pattern is now identified, so the next occurrence shouldn't need its own debug script.
