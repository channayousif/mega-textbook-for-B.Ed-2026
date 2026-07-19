# Phase 1 Data Model: Authentication & Roles

**Feature**: 002-authentication | **Date**: 2026-07-18 | **Spec**: [spec.md](./spec.md)

All tables live in the Supabase Postgres `public` schema with RLS **enabled**. Identity is
owned by Supabase's `auth.users`; this feature owns the application-side profile, capability,
and audit tables.

---

## Entity: `profiles`

Maps spec entity **Profile**. One row per account, created automatically by trigger.

| Column | Type | Constraints | Maps to |
|---|---|---|---|
| `id` | `uuid` | PK, `default gen_random_uuid()` — **independent of `auth.users`** | Profile identity (stable across deletion) |
| `auth_user_id` | `uuid` | UNIQUE, nullable, FK → `auth.users(id)` **ON DELETE SET NULL** | Account ↔ Profile link |
| `full_name` | `text` | nullable | FR-010b (optional display name) |
| `role` | `user_role` enum | NOT NULL, default `'student'` | FR-003, FR-010 |
| `verified_teacher` | `boolean` | NOT NULL, default `false` | FR-005a, FR-016 |
| `status` | `account_status` enum | NOT NULL, default `'active'` | FR-020 |
| `role_chosen_at` | `timestamptz` | nullable | R3 — OAuth one-time role prompt |
| `deleted_at` | `timestamptz` | nullable | FR-021 tombstone |
| `created_at` | `timestamptz` | NOT NULL, default `now()` | Profile entity |

```sql
create type user_role      as enum ('student','teacher','admin');
create type account_status as enum ('active','suspended');
```

**Derived rule**: a profile with `deleted_at IS NOT NULL` is a tombstone — `full_name` is NULL,
`auth_user_id` is NULL, and the corresponding `auth.users` row no longer exists. It is retained
solely so Spec 003's submissions/grades keep a valid foreign key (FR-021).

> **Correction (2026-07-18, found during implementation).** This table originally specified
> `id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE`. That is **incompatible with
> FR-021**: `delete-account` calls `auth.admin.deleteUser()`, and CASCADE would destroy the very
> tombstone the requirement depends on, breaking every Spec 003 foreign key pointing at it.
> The profile now owns an independent primary key, with the auth link held in a nullable
> `auth_user_id` (ON DELETE SET NULL). Deleting the auth identity therefore severs the link and
> leaves the stripped profile intact, which is what FR-021 and Constitution Art. VIII.4 require.
> Consequence: all lookups key on `auth_user_id`, not `id` — see `0004_is_admin.sql` and
> `AuthContext.loadProfile`.

### Validation rules

- `role` is settable by the account holder **only at insert**, and only to `student`/`teacher`
  (trigger allowlist, R3). Any later self-change is rejected → FR-010, FR-010a — **except** the
  single OAuth one-time role choice (see correction below).

> **Correction (2026-07-18, found during T031 implementation).** The statement above was
> incomplete: `guard_privileged_columns()` (0008) originally rejected **every** non-admin role
> change unconditionally, which made the OAuth one-time role prompt this same requirement
> mandates (R3 — Google has no pre-consent metadata hook) impossible to implement — any attempt
> would raise `42501`. The trigger now carves out exactly one exception: a non-admin may set
> `role` to `student`/`teacher` (never `admin`, preserving FR-009) in the same `UPDATE` statement
> that stamps `role_chosen_at` from `null`. Once `role_chosen_at` is non-null, the existing
> write-once check closes the door — a second attempt falls back to the unconditional rejection.
> See `0008_guard_privileged_columns.sql` and `src/pages/app/profile.tsx`.
- `verified_teacher`, `status`, and promotion to `role='admin'` are admin-only → FR-006, FR-009.
- `full_name` is the only column the account holder may update → FR-010.
- Display fallback: when `full_name` is NULL the UI shows the account email → FR-010b.
  (Email is read from the session, not duplicated into `profiles` — avoids a second copy of
  personal data to erase on deletion, Constitution Art. VIII.2.)

### State transitions

**Role** (FR-010/FR-010a — self-select once, admin-only thereafter):
```
[sign-up] ──user choice (student|teacher)──▶ role set, role_chosen_at = now()
                                                  │
                                                  └──admin only──▶ any role (audited)
```

**Status** (FR-020):
```
active ──admin suspend──▶ suspended ──admin reinstate──▶ active     (both audited)
```

**Lifecycle** (FR-021):
```
active ──user deletes──▶ tombstone (full_name NULL, deleted_at set, auth.users row deleted)
```
Terminal — a tombstone is never reactivated; re-registering the same email creates a new,
unrelated profile (FR-022).

---

## Entity: `privilege_audit`

Maps spec entity **Privilege-change audit entry**. Append-only (FR-018, FR-019).

| Column | Type | Constraints | Maps to |
|---|---|---|---|
| `id` | `bigint` | PK, generated always as identity | — |
| `subject_id` | `uuid` | NOT NULL, FK → `profiles(id)` | affected account |
| `actor_id` | `uuid` | NOT NULL — set from `auth.uid()` in trigger | acting administrator |
| `change_type` | `audit_change` enum | NOT NULL | what changed |
| `old_value` | `text` | nullable | previous value |
| `new_value` | `text` | NOT NULL | new value |
| `created_at` | `timestamptz` | NOT NULL, default `now()` | when |

```sql
create type audit_change as enum ('role','verified_teacher','status');
```

**Integrity rules**:
- `actor_id` is **never** accepted from the client — the trigger reads `auth.uid()`. Prevents
  forging attribution (FR-018).
- No `INSERT` policy for any client role: rows arrive only via the `SECURITY DEFINER` trigger,
  so a privilege change cannot occur without its audit row.
- No `UPDATE` or `DELETE` policy exists → both are denied by RLS default (FR-019).
- Index on `(subject_id, created_at desc)` to serve SC-008's "who granted answer-key access to
  this account, and when".

---

## Relationships

```
auth.users (Supabase-owned)
   │ 1:1  (id, ON DELETE CASCADE)
   ▼
profiles ──────1:N──────▶ privilege_audit.subject_id
   ▲                                │
   └────────N:1─────────────────────┘  privilege_audit.actor_id (the admin)

profiles ◀── (Spec 003: classes, submissions, grades reference profiles.id)
```

Note `privilege_audit` references `profiles`, not `auth.users` — so audit history survives
account deletion (the tombstone row persists), preserving the record of who granted what.

---

## Access-control matrix

Enforced at the database layer per Constitution Art. IX.2. This is the matrix the RLS test
suite (SC-004) must prove.

| Actor | `profiles` own row | `profiles` others | `verified_teacher` / `role` / `status` | `privilege_audit` | Restricted material |
|---|---|---|---|---|---|
| anonymous | — | — | — | — | denied |
| student (active) | read; update `full_name` | denied | denied | denied | denied |
| teacher (active, unverified) | read; update `full_name` | own students only (Spec 003) | denied | denied | **denied** |
| teacher (active, `verified_teacher`) | read; update `full_name` | own students only (Spec 003) | denied | denied | **allowed** |
| any suspended user | denied | denied | denied | denied | denied |
| admin | read; update `full_name` | read all | **write** (audited) | **read** | allowed |

Key negative assertions to test:
1. A student cannot `SELECT` another student's profile → FR-016.
2. A teacher without `verified_teacher` cannot read answer keys → FR-005a, FR-017.
3. No non-admin can `UPDATE` `role`, `verified_teacher`, or `status` — including on their own
   row → FR-006, FR-010a.
4. No client can `INSERT`, `UPDATE`, or `DELETE` `privilege_audit` → FR-019.
5. A suspended user fails every protected read/write → FR-020.
6. A user cannot set `role='admin'` at sign-up via `raw_user_meta_data` → R3, FR-009.

---

## Triggers & functions

| Name | Timing | Purpose |
|---|---|---|
| `handle_new_user()` | AFTER INSERT on `auth.users` | Create `profiles` row; read role from `raw_user_meta_data` through an allowlist (`student`/`teacher`, else `student`). `SECURITY DEFINER`. → FR-003, R3 |

> **Finding (2026-07-18, found while writing the T023 test).** `handle_new_user()`'s
> email-matching re-link branch (FR-003a) is unreachable for the scenario it was written for.
> Supabase's GoTrue links a Google identity to an existing verified-email account at the
> `auth.identities` level, keeping `auth.users.id` unchanged — no new `auth.users` row is
> inserted, so this AFTER INSERT trigger never fires for "Google after existing password
> account". FR-003a's "one email = one account" guarantee is therefore delivered natively by
> GoTrue, not by this trigger. The branch is harmless (a defensive no-op for an edge case
> `admin.createUser` cannot even simulate, since it enforces email uniqueness up front) but is
> not the mechanism actually satisfying FR-003a. Left in place; not removed, since GoTrue's
> automatic-linking config (`GOTRUE_MANUAL_LINKING_ENABLED`, unverified-provider-email edge
> cases) is an external setting this migration should not assume permanently. Real verification
> is T063's live Google OAuth smoke test, not an RLS unit test — see `tests/rls/identity-linking.test.mjs`.
| `guard_privileged_columns()` | BEFORE UPDATE on `profiles` | Raise unless caller is admin when `role`, `verified_teacher`, or `status` changes. → FR-006, FR-010a |
| `write_privilege_audit()` | AFTER UPDATE on `profiles` | Emit a `privilege_audit` row per changed privileged column, `actor_id = auth.uid()`. → FR-018 |
| `is_admin(uid)` | — | `SECURITY DEFINER` helper returning whether a uid is an active admin. Used by policies; avoids recursive RLS evaluation on `profiles`. |

**Recursion note**: policies on `profiles` that need "is the caller an admin?" must not
themselves query `profiles` under RLS, or evaluation recurses. `is_admin()` is `SECURITY
DEFINER` and bypasses RLS for that single lookup — a standard Supabase pattern and a real
correctness trap if missed.

---

## Edge Functions (service-role only — never shipped to the browser)

| Function | Purpose | Spec |
|---|---|---|
| `admin-suspend` | Set `status`, then `auth.admin.signOut(uid,'global')` to revoke refresh tokens | FR-020, R5 |
| `delete-account` | Strip `full_name`, set `deleted_at`, then `auth.admin.deleteUser(uid)` | FR-021, FR-022, R6 |
| `admin-list-users` | Join `profiles` with `auth.users.email` for the admin user list — added during T043 (not originally planned in this table), confirmed with the owner rather than assumed. `profiles` deliberately has no email column (Art. VIII.2); an admin managing accounts needs one, and reading `auth.users` for arbitrary users needs the service-role key. | FR-007, FR-015 |

All three verify the caller's role server-side before acting — `admin-suspend` and
`admin-list-users` require admin, `delete-account` requires the caller to be the account owner.
