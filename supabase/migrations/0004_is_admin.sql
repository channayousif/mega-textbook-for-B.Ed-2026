-- 0004_is_admin.sql — Spec 002 (Authentication & Roles)
-- SECURITY DEFINER helpers used by RLS policies and guard triggers.
--
-- ⚠️ RECURSION TRAP (data-model.md "Recursion note"):
-- A policy ON public.profiles that asks "is the caller an admin?" by SELECTing
-- from public.profiles will re-enter that same policy, and Postgres raises
-- "infinite recursion detected in policy for relation profiles".
--
-- SECURITY DEFINER makes these functions run as the owner, bypassing RLS for
-- that single lookup and breaking the cycle. They are deliberately narrow:
-- they answer one boolean question and expose no rows.
--
-- search_path is pinned to defeat search_path-hijacking against a
-- SECURITY DEFINER function.

-- Resolve the caller's profile id from their auth identity.
create or replace function public.current_profile_id()
returns uuid
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select p.id
  from public.profiles p
  where p.auth_user_id = auth.uid()
    and p.deleted_at is null
  limit 1;
$$;

-- Is the given auth uid an ACTIVE admin?
-- Suspended admins (FR-020) lose privilege immediately — status is checked here,
-- so a suspension takes effect without touching every dependent policy.
create or replace function public.is_admin(uid uuid default auth.uid())
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
      and p.role = 'admin'
      and p.status = 'active'
      and p.deleted_at is null
  );
$$;

-- Is the caller an active, non-deleted account? Every protected policy predicates
-- on this so a suspended user fails all reads and writes (FR-020).
create or replace function public.is_active_user(uid uuid default auth.uid())
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
      and p.status = 'active'
      and p.deleted_at is null
  );
$$;

comment on function public.is_admin(uuid) is
  'SECURITY DEFINER admin check for RLS policies. Bypasses RLS on profiles to avoid '
  'infinite policy recursion. Returns false for suspended or deleted admins.';

revoke all on function public.current_profile_id() from public;
revoke all on function public.is_admin(uuid) from public;
revoke all on function public.is_active_user(uuid) from public;
grant execute on function public.current_profile_id() to authenticated;
grant execute on function public.is_admin(uuid) to authenticated;
grant execute on function public.is_active_user(uuid) to authenticated;
