-- 0010_verified_teacher_gate.sql — Spec 002 (Authentication & Roles), T040
--
-- FR-005a/FR-017 require proving "an unverified teacher is denied answer-key-
-- bearing rows; a verified_teacher teacher is allowed" — but the real content
-- tables (quiz_items, answer keys, etc.) are Spec 003's, not built here
-- ("their storage is detailed in later specs" — spec.md line 192). Rather than
-- leave FR-005a/SC-004's negative case unproven, or invent Spec 003's schema,
-- this migration adds exactly the reusable authorization primitive Spec 003
-- will need, plus the smallest possible fixture to prove the RLS pattern works
-- end to end. The demo table is NOT real content and carries no student-facing
-- meaning — it exists solely as this feature's SC-004 evidence.

-- Is the given auth uid an ACTIVE teacher with the verified_teacher capability?
-- Mirrors is_admin()'s shape exactly (0004_is_admin.sql) — same recursion-
-- avoidance reason (SECURITY DEFINER bypasses RLS on profiles for this one
-- lookup) and the same suspension behavior (a suspended verified teacher loses
-- restricted-material access immediately, FR-020).
create or replace function public.is_verified_teacher(uid uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.profiles p
    where p.auth_user_id = uid
      and p.verified_teacher = true
      and p.status = 'active'
      and p.deleted_at is null
  );
$$;

comment on function public.is_verified_teacher(uuid) is
  'FR-005a — SECURITY DEFINER verified-teacher check for RLS policies gating '
  'answer keys/restricted material. Spec 003''s content tables should reuse this '
  'function rather than re-deriving the check. Returns false for suspended/deleted.';

revoke all on function public.is_verified_teacher(uuid) from public;
grant execute on function public.is_verified_teacher(uuid) to authenticated;

-- Demo fixture only (T040) — proves the RLS pattern Spec 003's real tables must
-- follow. Superseded, not extended, once Spec 003 lands; the leading underscore
-- signals "not a content table" to anyone browsing the schema.
create table public._verified_teacher_gate_demo (
  id uuid primary key default gen_random_uuid(),
  label text not null
);

comment on table public._verified_teacher_gate_demo is
  'Spec 002 T040 fixture only — proves the verified_teacher RLS gate pattern. '
  'Not real content; Spec 003 owns the actual answer-key/restricted-material tables.';

alter table public._verified_teacher_gate_demo enable row level security;

create policy verified_teacher_gate_demo_select
  on public._verified_teacher_gate_demo
  for select
  to authenticated
  using (public.is_verified_teacher() or public.is_admin());

grant select on public._verified_teacher_gate_demo to authenticated;

insert into public._verified_teacher_gate_demo (label) values ('restricted-material probe row');
