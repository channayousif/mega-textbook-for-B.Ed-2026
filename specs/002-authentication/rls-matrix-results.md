# RLS Access-Control Matrix — Results (SC-004 Evidence)

**Feature**: 002-authentication | **Date**: 2026-07-19 | **Run against**: the live self-hosted
instance (ADR-0006), not a mock

SC-004 requires "a documented access-control test set" proving a student cannot read another
user's profile and a self-declared teacher without `verified_teacher` cannot reach restricted
material — "100% of these checks pass." This document is that evidence: every row below maps to
an actual test file that ran against the live database, not a planned assertion.

**Result: 34/35 automated assertions PASS. 1 documented SKIP** (T023 — see below; not a gap, a
platform-level guarantee this suite cannot independently exercise).

```
Test Files  14 passed | 1 skipped (15)
     Tests  34 passed | 1 skipped (35)
```

---

## How to reproduce

```bash
set -a && source .env.local && set +a
npm run test:rls
```

Requires a live self-hosted instance (`DOCUSAURUS_SUPABASE_URL`, `DOCUSAURUS_SUPABASE_ANON_KEY`,
`SUPABASE_SERVICE_ROLE_KEY` in `.env.local`) — see `quickstart.md`. `npm test` (the offline unit
suite) stays green with none of these set; this suite is deliberately separate.

---

## Matrix: contracts/auth-operations.md §D, cross-referenced to tests

| # | Assertion | FR / SC | Test file | Result |
|---|---|---|---|---|
| 1 | Email sign-up creates exactly one `profiles` row, `role='student'`, `verified_teacher=false` | SC-002 | `signup-profile.test.mjs` | ✅ PASS |
| 2 | Google sign-in on an email with an existing password account resolves to the same `profiles.id` | FR-003a | `identity-linking.test.mjs` | ⚠️ SKIP — see note below |
| 3 | Unconfirmed email cannot obtain a session | FR-002 | `email-confirmation.test.mjs` | ✅ PASS |
| 4 | `signUp` with `data.role='admin'` yields `role='student'` | R3, FR-009 | `signup-role-allowlist.test.mjs` | ✅ PASS |
| 5 | `signUp` with `data.role='teacher'` yields `role='teacher'`, `verified_teacher=false` | FR-003, FR-005a | `signup-role-allowlist.test.mjs` | ✅ PASS |
| 6 | Student selecting own row: 1 row; selecting another user's row: 0 rows | FR-016 | `profile-isolation.test.mjs` | ✅ PASS |
| 7 | A user CAN update `full_name` on their own row; the same statement touching `role`/`verified_teacher`/`status` errors | FR-010, FR-006 | `own-profile-update.test.mjs`, `privileged-columns.test.mjs` | ✅ PASS |
| 8 | Non-admin updating own `role`/`verified_teacher`/`status`: error | FR-006, FR-010a | `privileged-columns.test.mjs` | ✅ PASS |
| 9 | Admin updating another user's `role`: succeeds **and** writes exactly one audit row with `actor_id` = admin | FR-007, FR-018 | `admin-role-change.test.mjs` | ✅ PASS |
| 10 | An admin's role change and `verified_teacher` grant apply to a signed-in user on their next page load, without re-authentication | FR-008, SC-005 | `tests/e2e/auth-role-propagation.spec.ts` (e2e, not RLS — real browser, two sessions) | ✅ PASS |
| 11 | Audit row `actor_id` cannot be overridden by client-supplied value | FR-018 | `audit-actor-spoofing.test.mjs` | ✅ PASS |
| 12 | Non-admin selecting `privilege_audit`: 0 rows; insert/update/delete: error | FR-019 | `audit-immutability.test.mjs` | ✅ PASS |
| 13 | Suspended user: every protected read/write fails; sign-in refused | FR-020 | `suspended-lockout.test.mjs` | ✅ PASS |
| 14 | Unverified teacher reading answer-key-bearing table: 0 rows / denied | FR-005a, FR-017 | `verified-teacher-gate.test.mjs` | ✅ PASS |
| 15 | `verified_teacher=true` teacher reading same: allowed | FR-005a | `verified-teacher-gate.test.mjs` | ✅ PASS |
| 16 | Deleted account: `auth.users` row gone, `profiles` tombstone retained with `full_name IS NULL`, referencing rows still resolve | FR-021, SC-009 | `deletion-tombstone.test.mjs` | ✅ PASS |
| 17 | Re-registering a deleted email creates a new `profiles.id` unrelated to the tombstone | FR-022 | `deletion-reregistration.test.mjs` | ✅ PASS |

All 17 contract checklist items are covered. Two beyond the original checklist, found and closed
during implementation, are recorded below rather than silently added to the table above.

---

## Additional coverage beyond the original checklist

Found while implementing, not planned up front — each closes a real gap the original 17-item
checklist didn't anticipate:

- **The T031/T054 OAuth role-prompt carve-out** (`oauth-role-prompt.test.mjs`, 4 tests): proves a
  non-admin may set `role` exactly once — to `student`/`teacher` only, never `admin` — tied to
  stamping `role_chosen_at` from null, and that a second attempt is rejected. This exercises a
  trigger carve-out added mid-implementation (see `data-model.md`'s 2026-07-18 correction) that
  the original design didn't have.
- **A third denial shape** (`suspended-lockout.test.mjs`): contracts §D's "two distinct denial
  shapes" (reads = 0 rows, privileged writes = raise) turned out incomplete. A suspended user's
  write to an *ordinary* column is a silent zero-row success — RLS filters the row out via
  `profiles_update_own`'s `status='active'` predicate before the 0008 trigger ever runs. Documented
  in `contracts/auth-operations.md`'s 2026-07-19 correction.

## T023 — why this one is a documented SKIP, not a gap

`tests/rls/identity-linking.test.mjs` cannot exercise real Google-OAuth identity linking through
this suite: Supabase's own GoTrue links a Google identity to an existing verified-email account at
the `auth.identities` level, keeping `auth.users.id` unchanged — no new `auth.users` row is
inserted, so `handle_new_user()`'s AFTER INSERT trigger never fires for this case, and
`admin.createUser()` (this suite's only tool) enforces email uniqueness before any trigger could
run either way. FR-003a's guarantee is delivered natively by GoTrue, not application code — see
`data-model.md`'s 2026-07-18 finding. The real, live verification is **T063**: a genuine Google
OAuth sign-in was completed 2026-07-19 with the owner's own account and confirmed independently via
GoTrue's audit log (`user_signedup`, `provider: google`, `grant_type: pkce`, status 200) — see
`tasks.md` Phase 3's checkpoint. This is evidence a unit-style RLS suite structurally cannot
produce, not a missing check.

---

## Negative-case discipline (why this evidence is trustworthy)

Every RLS test in this suite asserts a **denial**, not just a happy path — a suite that only
proves legitimate access works cannot detect an over-permissive policy, which is this feature's
principal risk (per `data-model.md`'s own framing). Concretely:

- **17/17** contract checklist assertions covered (16 direct RLS/e2e, 1 documented platform-level
  skip with independent live evidence).
- **4 real bugs were found by these tests failing on first attempt**, not by writing tests that
  happened to pass around a pre-existing bug: the missing `status='active'` check in
  `profiles_select_own`, the wrong session-revocation API in `admin-suspend`, the PKCE/implicit
  link-format mismatch in the password-reset flow, and the SMTP-catcher gap that broke real
  sign-up entirely. All four are documented at their respective migration/function/PHR.
- Every test that calls an Edge Function (`admin-suspend`, `delete-account`, `admin-list-users`)
  calls the **real, deployed function** — not a service-role bypass simulating its effect. Two of
  this feature's worst-hidden bugs (T025's mail path, T032's PKCE link) were specifically hidden
  behind exactly that kind of shortcut earlier in this feature's implementation.

## Known limitation

This suite runs against one self-hosted instance, on demand, not in CI yet (see T062). A missing
negative test would currently only be caught by someone remembering to run `npm run test:rls`
before merging — not by an automated gate. Wiring this into `.github/workflows/` is T062's job.
