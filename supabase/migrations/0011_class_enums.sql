-- 0011_class_enums.sql — Spec 003 (Virtual Classes, Assignments & Assessments)
-- Shared enums for this feature's tables, plus retiring Spec 002's placeholder.
--
-- 0010_verified_teacher_gate.sql's _verified_teacher_gate_demo table exists
-- solely to prove the verified_teacher RLS pattern ahead of this feature; its
-- own comment says it is "Superseded, not extended, once Spec 003 lands." This
-- migration is that landing — drop the demo fixture and its policy, keeping
-- is_verified_teacher()/is_admin()/current_profile_id() (0004, 0010), which
-- this feature reuses unmodified (research.md R9).

drop policy if exists verified_teacher_gate_demo_select on public._verified_teacher_gate_demo;
drop table if exists public._verified_teacher_gate_demo;

create type public.class_status as enum ('active', 'archived');
create type public.enrollment_status as enum ('active', 'removed');

-- Is the given auth uid a CURRENTLY eligible teacher — still holding the
-- teacher role, active, not deleted? Mirrors is_admin()/is_verified_teacher()
-- (0004, 0010) exactly. Used for: creating a class, and the stricter of the
-- two guard_class_updates() strictness levels (status transitions — 0013).
-- Deliberately NOT used for join_code writes, which only need ownership +
-- is_active_user() (see 0013's comment for why that distinction exists).
create or replace function public.is_eligible_teacher(uid uuid default auth.uid())
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
      and p.role = 'teacher'
      and p.status = 'active'
      and p.deleted_at is null
  );
$$;

comment on function public.is_eligible_teacher(uuid) is
  'Spec 003 — SECURITY DEFINER check: still holds the teacher role AND is '
  'active. Stricter than is_active_user(); used where FR-020''s reactivation '
  'clarification requires the caller to still be a teacher, not just unsuspended.';

revoke all on function public.is_eligible_teacher(uuid) from public;
grant execute on function public.is_eligible_teacher(uuid) to authenticated;
