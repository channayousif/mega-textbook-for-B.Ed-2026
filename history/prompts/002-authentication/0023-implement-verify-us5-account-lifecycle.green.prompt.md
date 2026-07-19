---
id: 0023
title: Implement and verify US5 account lifecycle
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: null
labels: ["suspend", "delete-account", "ban", "edge-function", "us5", "feature-complete"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - supabase/functions/_shared/adminAuth.ts
 - supabase/functions/admin-suspend/index.ts
 - supabase/functions/delete-account/index.ts
 - supabase/functions/admin-list-users/index.ts
 - supabase/migrations/0005_profiles_policies.sql
 - src/pages/app/login.tsx
 - src/pages/app/admin/users.tsx
 - src/pages/app/profile.tsx
 - tests/rls/_helpers.mjs
 - tests/rls/suspended-lockout.test.mjs
 - tests/rls/deletion-tombstone.test.mjs
 - tests/rls/deletion-reregistration.test.mjs
 - specs/002-authentication/tasks.md
 - specs/002-authentication/research.md
 - specs/002-authentication/contracts/auth-operations.md
tests:
 - "PASS: npx tsc --noEmit (clean)"
 - "PASS: npm test — 15 unit tests (unchanged, regression)"
 - "PASS: npm run test:rls — 34/35, 1 skip (3 new for US5)"
 - "PASS: npx playwright test — 11/11 across every auth e2e spec"
 - "Manual browser verification: Suspend button (admin/users.tsx) and Delete-account flow (profile.tsx) both confirmed working through the real UI, not just the underlying functions"
---

## Prompt

continue with US5 account lifecycle

## Response snapshot

Implemented the last phase of Spec 002 — all 8 tasks (T051–T058) — and, breaking from strict
TDD ordering deliberately (explained up front, not silently), built the two Edge Functions
*before* the RLS tests this time: this feature's two worst-hidden bugs so far (T025's mail bypass,
T032's PKCE-shortcut) were both hidden behind an admin-API convenience standing in for the real
path, and testing suspend/delete via a service-role bypass would have repeated exactly that
pattern. Testing the real functions directly (curl-equivalent fetch calls) before writing anything
else caught two more real bugs the same way.

**Bug 1**: `admin-suspend` 500'd with a JWT-parse error. `research.md R5` specified
`auth.admin.signOut(user_id, 'global')` — an assumption never verified against the real API. It
revokes sessions for whoever a **JWT** belongs to, not an arbitrary user id; an admin acting on
someone else's account never holds their JWT. Found the correct mechanism by reading GoTrue's own
docs rather than guessing again: `updateUserById(uid, { ban_duration })` — confirmed to block new
sign-ins, refresh, and be "verified on every authenticated request," which is *stronger* than
`signOut` would have been, and it surfaces as GoTrue's own `user_banned` code that `authErrors.ts`
already classified correctly since T017.

**Bug 2**, found investigating why an "old session" test assertion didn't behave as expected:
`profiles_select_own`'s RLS policy never checked `status='active'` at all — only the UPDATE policy
did. A suspended user could still read their own profile, directly contradicting this feature's
own access-control matrix ("any suspended user: denied," reads included). Fixed the policy, applied
the correction live, and it's what makes `login.tsx`'s suspension-detection signal (empty profile
fetch after a successful sign-in) actually fire.

**A third finding, not a bug**: testing the write-denial case for a suspended user, my first test
assertion wrongly expected a raised error (matching T036's privileged-column pattern). The actual,
correct behavior is a silent zero-row success — `profiles_update_own`'s own USING clause requires
`status='active'`, so RLS filters the row out before the 0008 trigger ever runs. Confirmed via a
direct debug script before fixing the assertion, and documented as a third, distinct denial shape
in `contracts/auth-operations.md` (previously described as exactly two).

**T058** turned out to be less about `authErrors.ts` (already complete since T017) and more about
`login.tsx`: GoTrue's ban only rejects a *fresh* sign-in attempt with `user_banned` — a session
that predates a suspension has no error to classify, since PostgREST doesn't raise on the
now-empty profile fetch. Added an explicit check after `signInWithPassword` succeeds: if the
resulting profile fetch is empty, treat it as suspended (sign out, show the message) rather than
silently letting the user through with a technically-valid-but-useless session.

Refactored `admin-list-users` (T043) to share a `_shared/adminAuth.ts` helper with the two new
functions once the identical "resolve caller from their own token, check active admin" logic was
needed a second time.

**T056/T057** (suspend button, delete-account flow) were verified through the real browser, not
just the underlying functions — this surfaced a small UI race in the delete flow: awaiting
`signOut()` before navigating let `profile.tsx`'s own "not authenticated" guard fire a competing
redirect to `/app/login` instead of landing on `/`. Fixed by not awaiting it (the account is
already gone server-side either way).

Full regression: tsc clean; unit 15/15 unchanged; RLS 34/35 + 1 skip (3 new, all passing); e2e
11/11 across every spec built this feature, run together. Cleaned up leftover test-fixture users
after.

## Outcome

- ✅ Impact: US5 (account lifecycle) is implemented and proven — **all five user stories in Spec 002 are now complete and verified against a live instance**, not just planned. Only Phase 8 (Polish) remains.
- 🧪 Tests: tsc clean; unit 15/15; RLS 34/35 + 1 skip; e2e 11/11; two flows additionally hand-verified through the real browser UI.
- 📁 Files: 2 new Edge Functions + 1 shared helper, 1 migration correction, 2 pages modified, 3 new RLS tests, 3 doc corrections (research.md, contracts, tasks.md).
- 🔁 Next prompts: Phase 8 — Urdu RTL verification for auth pages, the Art. V.5 bundle-budget fix (T060, still outstanding since PHR 0011), a Lighthouse audit, accessibility passes, CI wiring, and the RLS access-control matrix write-up (T064). None of these are user-story-blocking; the feature's functional scope is done.
- 🧠 Reflection: this phase's decision to build-then-test-for-real rather than test-then-build paid off exactly as intended — both real bugs (signOut's wrong parameter type, the missing status check) were caught by the first honest attempt to use the actual function, not by elaborate RLS-test design. The pattern holding across three phases now (T025 mail, T032 PKCE, T054 signOut) is specific: research.md and tasks.md both specified exact API calls that were never verified against the real service before being written down, and every one of them was wrong in a way only execution surfaced.

## Evaluation notes (flywheel)

- Failure modes observed: (a) a specified API call (`admin.signOut(user_id, 'global')`) that reads as plausible and specific enough to not question, but was never actually verified — the third instance of this exact failure mode this session; (b) an RLS policy pair (SELECT/UPDATE on the same table) where one half got the `status='active'` predicate and the other didn't, invisible without a suspended-user test actually exercising the read path; (c) a test author's own assumption (mine) that all denial should look like the T036 pattern, corrected by checking the real response shape instead of asserting from memory of a similar-looking case.
- Graders run and results (PASS/FAIL): tsc PASS; unit 15/15 PASS; RLS 34/35 PASS + 1 skip; e2e 11/11 PASS; manual UI checks PASS (2/2).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): for any future spec's research.md, flag every cited SDK/API method signature as "verify before implementing" rather than "verified" by default — three separate instances this session (signOut, PKCE link generation, Kong's port defaults) were all research-stage claims that read as settled but weren't checked against the primary source until implementation forced the question.
