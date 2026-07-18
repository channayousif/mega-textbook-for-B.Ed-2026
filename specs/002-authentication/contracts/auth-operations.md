# Contract: Client Auth Operations

**Feature**: 002-authentication | **Date**: 2026-07-18

This feature has **no bespoke REST API**. Per Constitution Art. V.1 the client talks to
Supabase directly (PostgREST + GoTrue) with the anon key, and authorization is enforced by
RLS — not by an application server. The "contracts" here are therefore the operations the
client is permitted to perform and their expected outcomes, plus two Edge Function endpoints
that do require server-side privilege.

Anything not listed is denied by default. That is the point of the design.

---

## A. Session operations (GoTrue via supabase-js)

| Op | Call | Success | Failure modes |
|---|---|---|---|
| Sign up (email) | `signUp({email, password, options:{data:{role}}})` | Verification email sent; no session until confirmed | `user_already_exists` → guide to sign-in/reset (FR edge case); weak password; rate limited |
| Sign up / in (Google) | `signInWithOAuth({provider:'google', options:{redirectTo}})` | Redirect → session; existing email links to same account (FR-003a) | provider error; redirect-URL mismatch |
| Sign in (email) | `signInWithPassword({email,password})` | Session issued | `email_not_confirmed` → FR-002; `invalid_credentials`; suspended (see §C) |
| Password reset request | `resetPasswordForEmail(email, {redirectTo})` | Reset email sent (always reports success — no account enumeration) | rate limited |
| Password update | `updateUser({password})` | Password changed; old one invalid (FR-004) | expired/used link → FR edge case |
| Sign out | `signOut()` | Local session cleared (FR-012) | — |
| Session read | `getSession()` / `onAuthStateChange` | Session or null; auto-refreshed (FR-011a) | — |

**Role at sign-up**: `options.data.role` is a *request*, not a grant. The `handle_new_user`
trigger validates it against `{student, teacher}` and coerces anything else to `student`.
A client sending `role: 'admin'` receives a `student` profile — no error, no elevation.

**Error presentation**: every failure above is mapped through a bilingual message dictionary
before display (FR-014). Raw GoTrue strings are never shown.

---

## B. Profile & audit operations (PostgREST, RLS-enforced)

| Op | Statement | Who | Result |
|---|---|---|---|
| Read own profile | `select * from profiles where id = auth.uid()` | any active user | own row |
| Read another profile | `select * from profiles where id = <other>` | non-admin | **0 rows** (RLS, not an error) — FR-016 |
| Read all profiles | `select * from profiles` | admin | all rows |
| Update own name | `update profiles set full_name=… where id = auth.uid()` | any active user | 1 row — FR-010 |
| Change own role | `update profiles set role=… where id = auth.uid()` | non-admin | **error** `42501 privileged column change requires admin` — FR-010a |
| Grant verified teacher | `update profiles set verified_teacher=true where id=<user>` | admin | 1 row + audit row — FR-007, FR-018 |
| Self-grant verified teacher | same, `id = auth.uid()`, non-admin | non-admin | **error** — FR-006 |
| Read audit history | `select * from privilege_audit where subject_id=…` | admin | rows — FR-019 |
| Read audit history | same | non-admin | **0 rows** — FR-019 |
| Write/alter audit | `insert/update/delete on privilege_audit` | anyone | **error** (no policy) — FR-019 |

**Two distinct denial shapes, deliberately**:
- *Reads* of other users' data return **zero rows** (RLS filters silently) — no existence
  disclosure.
- *Writes* to privileged columns **raise an error** — the caller must know the write failed
  rather than believing it succeeded.

---

## C. Suspension & deletion (Edge Functions — service-role)

### `POST /functions/v1/admin-suspend`

Caller must be an active admin (verified server-side; the JWT alone is not trusted).

```jsonc
// request
{ "user_id": "uuid", "suspend": true }   // false = reinstate
// 200
{ "ok": true, "status": "suspended" }
```

| Code | Meaning |
|---|---|
| 401 | no/invalid session |
| 403 | caller is not an admin |
| 404 | target profile not found |
| 409 | target is a tombstone (deleted account) |

Side effects: `profiles.status` updated → audit row written by trigger → `auth.admin.signOut(user_id,'global')`
revokes refresh tokens so the session cannot renew (FR-020, R5).

**Suspended-user behaviour** (FR-020): existing access token is not retroactively invalidated,
but every RLS policy requires `status='active'`, so all protected reads/writes fail
immediately; refresh is revoked so the session dies within the access-token TTL and sign-in is
refused thereafter with a bilingual "account suspended" message.

### `POST /functions/v1/delete-account`

Caller must be the account owner. No body — the subject is `auth.uid()`, so one user can never
delete another.

```jsonc
// 200
{ "ok": true }
```

| Code | Meaning |
|---|---|
| 401 | no/invalid session |
| 409 | already deleted |

Side effects, in order (FR-021, FR-022, R6):
1. `full_name → NULL`, `deleted_at → now()` (profile becomes a tombstone; FK targets survive)
2. `auth.admin.deleteUser(uid)` — credentials gone, email freed for re-registration

Requires prior explicit confirmation in the UI (FR-022); the function does not enforce the
warning, the client does, but the operation is irreversible either way.

---

## D. Contract test checklist

Each row is an executable assertion for the RLS suite that SC-004 requires.

- [ ] Email sign-up creates exactly one `profiles` row, `role='student'`, `verified_teacher=false` — SC-002
- [ ] Google sign-in on an email with an existing password account resolves to the **same** `profiles.id` — FR-003a
- [ ] Unconfirmed email cannot obtain a session — FR-002
- [ ] `signUp` with `data.role='admin'` yields `role='student'` — R3, FR-009
- [ ] `signUp` with `data.role='teacher'` yields `role='teacher'`, `verified_teacher=false` — FR-003, FR-005a
- [ ] Student selecting own row: 1 row; selecting another user's row: 0 rows — FR-016
- [ ] Non-admin updating own `role` / `verified_teacher` / `status`: error — FR-006, FR-010a
- [ ] Admin updating another user's `role`: succeeds **and** writes exactly one audit row with `actor_id` = admin — FR-007, FR-018
- [ ] Audit row `actor_id` cannot be overridden by client-supplied value — FR-018
- [ ] Non-admin selecting `privilege_audit`: 0 rows; insert/update/delete: error — FR-019
- [ ] Suspended user: every protected read/write fails; sign-in refused — FR-020
- [ ] Unverified teacher reading answer-key-bearing table: 0 rows / denied — FR-005a, FR-017
- [ ] `verified_teacher=true` teacher reading same: allowed — FR-005a
- [ ] Deleted account: `auth.users` row gone, `profiles` tombstone retained with `full_name IS NULL`, referencing rows still resolve — FR-021, SC-009
- [ ] Re-registering a deleted email creates a new `profiles.id` unrelated to the tombstone — FR-022
