-- 0008_guard_privileged_columns.sql — Spec 002 (Authentication & Roles)
-- Column-level authorization for public.profiles (FR-006, FR-009, FR-010, FR-010a).
--
-- WHY A TRIGGER AND NOT JUST RLS:
-- RLS decides which ROWS a statement may touch; it cannot say "you may update
-- this row but not these three columns". The 0005 policy lets a user update
-- their own row (so they can edit full_name, FR-010) — without this trigger a
-- crafted UPDATE could set role='admin' on that same row. This trigger is what
-- makes "role is server-authoritative" true rather than aspirational.
--
-- Denial is an EXCEPTION, not a silent no-op: the caller must learn the write
-- failed (contracts/auth-operations.md §B).

create or replace function public.guard_privileged_columns()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  caller_is_admin boolean := public.is_admin();
begin
  -- The service role (Edge Functions: admin-suspend, delete-account) runs with
  -- auth.uid() IS NULL and bypasses RLS. Those functions verify the caller
  -- themselves before acting, so let them through.
  if auth.uid() is null then
    return new;
  end if;

  if new.role is distinct from old.role and not caller_is_admin then
    raise exception 'privileged column change requires admin: role'
      using errcode = '42501';  -- insufficient_privilege
  end if;

  if new.verified_teacher is distinct from old.verified_teacher and not caller_is_admin then
    raise exception 'privileged column change requires admin: verified_teacher'
      using errcode = '42501';
  end if;

  if new.status is distinct from old.status and not caller_is_admin then
    raise exception 'privileged column change requires admin: status'
      using errcode = '42501';
  end if;

  -- FR-021 — tombstoning is the delete-account Edge Function's job (service
  -- role, auth.uid() null, returned above). A client must not forge one.
  if new.deleted_at is distinct from old.deleted_at then
    raise exception 'deleted_at is set only by the delete-account function'
      using errcode = '42501';
  end if;

  -- Identity re-pointing is the sign-up trigger's job, never a client's.
  if new.auth_user_id is distinct from old.auth_user_id then
    raise exception 'auth_user_id is not client-writable'
      using errcode = '42501';
  end if;

  -- role_chosen_at may be set ONCE by the account holder (the OAuth one-time
  -- role prompt, research.md R3) and never cleared or rewritten afterwards.
  if old.role_chosen_at is not null
     and new.role_chosen_at is distinct from old.role_chosen_at
     and not caller_is_admin then
    raise exception 'role_chosen_at is write-once'
      using errcode = '42501';
  end if;

  return new;
end;
$$;

comment on function public.guard_privileged_columns() is
  'FR-006/FR-010a — rejects non-admin changes to role, verified_teacher, status, '
  'deleted_at, and auth_user_id. Complements RLS, which cannot express column-level rules.';

create trigger profiles_guard_privileged_columns
  before update on public.profiles
  for each row
  execute function public.guard_privileged_columns();
