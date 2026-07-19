-- 0002_profiles.sql — Spec 002 (Authentication & Roles)
-- The application-side account record. Identity itself is owned by auth.users;
-- this table holds role, capability, status, and display name.
-- See specs/002-authentication/data-model.md → Entity: profiles.

create table public.profiles (
  -- Same id as auth.users. CASCADE so deleting the auth user via the
  -- delete-account Edge Function does not orphan this row... but note that
  -- FR-021 requires the profile to SURVIVE as a tombstone so Spec 003's
  -- submissions keep a valid FK. The Edge Function therefore strips identity
  -- and sets deleted_at BEFORE deleting the auth user, and the FK is deferred
  -- to ON DELETE SET NULL semantics via the nullable auth_user_id below.
  id uuid primary key default gen_random_uuid(),

  -- Link to the auth identity. NULLed on account deletion so the tombstone
  -- survives while credentials are destroyed (FR-021, FR-022).
  auth_user_id uuid unique references auth.users (id) on delete set null,

  -- FR-010b: optional. Auto-filled from the Google profile when available;
  -- when null the UI falls back to the account email (read from the session,
  -- deliberately NOT duplicated here — Constitution Art. VIII.2 minimal data,
  -- and one less identifier to erase on deletion).
  full_name text,

  -- FR-003 / FR-010 / FR-010a. Default student; set once at sign-up by the
  -- 0007 trigger; thereafter writable only by an admin (0008 guard trigger).
  role public.user_role not null default 'student',

  -- FR-005a: the answer-key gate. Admin-granted only, default off.
  -- Orthogonal to `role` by design (ADR-0005) — a self-declared teacher never
  -- receives this, and a verified teacher may still be teaching a peer group.
  verified_teacher boolean not null default false,

  -- FR-020: admin-controlled suspension. Every RLS policy predicates on this.
  status public.account_status not null default 'active',

  -- research.md R3: Google OAuth has no pre-consent metadata hook, so OAuth
  -- users get the default role and are prompted once. Null = not yet chosen.
  role_chosen_at timestamptz,

  -- FR-021 tombstone marker. Non-null means identity has been stripped and the
  -- row exists only to keep downstream foreign keys valid.
  deleted_at timestamptz,

  created_at timestamptz not null default now()
);

comment on table public.profiles is
  'Application account record (Spec 002). Role and verified_teacher are server-authoritative: '
  'writable only by an admin via the 0008 guard trigger, never by the account holder.';

comment on column public.profiles.verified_teacher is
  'FR-005a — grants access to answer keys / restricted material. Admin-granted only, default false. '
  'Independent of the self-selectable teacher role (ADR-0005).';

comment on column public.profiles.deleted_at is
  'FR-021 — tombstone. When set, full_name is null and auth_user_id is null; the row is retained '
  'so Spec 003 submissions/grades keep referential integrity while being non-attributable.';

-- Lookup by auth identity happens on every page load (AuthContext), so index it.
create index profiles_auth_user_id_idx on public.profiles (auth_user_id)
  where auth_user_id is not null;

-- Admin user-list views filter out tombstones.
create index profiles_active_idx on public.profiles (created_at desc)
  where deleted_at is null;
