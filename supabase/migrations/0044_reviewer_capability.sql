-- 0044_reviewer_capability.sql - Spec 017 (The reviewer role)
-- The `reviewer` capability: a column, a helper, and the two column-enumerating
-- triggers that have to learn about it (FR-001, FR-002).
--
-- WHY THIS IS A CAPABILITY AND NOT A ROLE:
-- Constitution Art. V.3 enumerates the role set closed - student, teacher,
-- admin - and names the extension point in the same clause: restricted access
-- is a separate admin-granted capability. A reviewer is typically already a
-- teacher or an admin; reviewing is something they are trusted to do, not
-- something they are. ADR-0005 drew the same line for verified_teacher.
--
-- WHAT THIS CAPABILITY DOES NOT DO:
-- It grants no policy. Certifying a review produces a FILE the reviewer
-- commits, not a row, so there is no server-side certification action for RLS
-- to deny. is_reviewer() gates the review surface (called over RPC, so a
-- suspension is the database's answer rather than a cached column's) and is
-- the attachment point for any future policy. spec.md's "Enforcement posture"
-- section states this plainly rather than leaving a reader to assume an RLS
-- guarantee that was never built.

-- FR-001: the capability. Mirrors verified_teacher (0002_profiles.sql) exactly:
-- boolean, not null, default off, admin-granted.
alter table public.profiles
  add column if not exists reviewer boolean not null default false;

comment on column public.profiles.reviewer is
  'Spec 017 FR-001 - admin-granted capability to certify a G3 or G5 content review. '
  'Default off. Orthogonal to `role` by design (Art. V.3, ADR-0005): a reviewer is '
  'normally already a teacher or an admin. Grants no authoring, granting or editing '
  'right - see specs/017-reviewer-role/spec.md "Enforcement posture".';

-- FR-002: the single point at which suspension is checked.
--
-- The status and deleted_at tests live HERE, not in each caller, for the reason
-- 0004_is_admin.sql gives for is_admin: a suspension then takes effect
-- everywhere at once, and a caller written later cannot forget it.
create or replace function public.is_reviewer(uid uuid default auth.uid())
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
      and p.reviewer = true
      and p.status = 'active'
      and p.deleted_at is null
  );
$$;

comment on function public.is_reviewer(uuid) is
  'SECURITY DEFINER capability check (Spec 017 FR-002). Mirrors is_admin, including '
  'the status test, so a suspended reviewer loses the capability immediately. Called '
  'over RPC by the review surface; no policy predicates on it, because this feature '
  'creates no policy - certifying produces a Git artefact, not a row.';

revoke all on function public.is_reviewer(uuid) from public;
grant execute on function public.is_reviewer(uuid) to authenticated;

-- FR-001: guard_privileged_columns() must learn the column's name.
--
-- ⚠️ THE REASON THIS BLOCK EXISTS. The 0008 guard enumerates protected columns
-- BY NAME. A column added without a matching branch is not protected by
-- default - it is freely writable by the account holder under the 0005 own-row
-- update policy. The spec originally asserted "guard_privileged_columns blocks
-- self-grant" as an existing fact; it was not one. Everything below is 0008
-- reproduced verbatim, plus the `reviewer` branch.
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
    -- Carve-out (2026-07-18, found during T031 implementation): the OAuth
    -- one-time role prompt (research.md R3 - Google has no pre-consent
    -- metadata hook) needs exactly one non-admin role change, from the
    -- trigger-assigned default into the account holder's choice. Allowed
    -- ONLY while role_chosen_at is still unset, ONLY into {student, teacher}
    -- (never 'admin' - FR-009), and ONLY in the same statement that stamps
    -- role_chosen_at (ties the two together; the write-once check below then
    -- blocks any further attempt, since old.role_chosen_at is no longer null).
    --
    -- Spec 017 note: this carve-out is written around the three-value enum and
    -- is one of the reasons `reviewer` is a column rather than a fourth role.
    if old.role_chosen_at is null
       and new.role in ('student', 'teacher')
       and new.role_chosen_at is not null then
      null; -- falls through - allowed
    else
      raise exception 'privileged column change requires admin: role'
        using errcode = '42501';  -- insufficient_privilege
    end if;
  end if;

  if new.verified_teacher is distinct from old.verified_teacher and not caller_is_admin then
    raise exception 'privileged column change requires admin: verified_teacher'
      using errcode = '42501';
  end if;

  -- Spec 017 FR-001 - the new branch. Without it the capability is self-grantable.
  if new.reviewer is distinct from old.reviewer and not caller_is_admin then
    raise exception 'privileged column change requires admin: reviewer'
      using errcode = '42501';
  end if;

  if new.status is distinct from old.status and not caller_is_admin then
    raise exception 'privileged column change requires admin: status'
      using errcode = '42501';
  end if;

  -- FR-021 - tombstoning is the delete-account Edge Function's job (service
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
  'FR-006/FR-010a, extended by Spec 017 FR-001 - rejects non-admin changes to role, '
  'verified_teacher, reviewer, status, deleted_at, and auth_user_id, with a single '
  'carved-out exception: a non-admin may set role once (student/teacher only) in the '
  'same statement that stamps role_chosen_at from null (research.md R3, the OAuth '
  'one-time role prompt). Complements RLS, which cannot express column-level rules. '
  'A new privileged column is NOT protected until it is named here.';

-- FR-001: write_privilege_audit() enumerates by name too, so a grant would
-- otherwise be unrecorded. 0009 reproduced verbatim, plus the reviewer branch.
create or replace function public.write_privilege_audit()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  actor uuid := public.current_profile_id();  -- null for service-role callers
begin
  if new.role is distinct from old.role then
    insert into public.privilege_audit (subject_id, actor_id, change_type, old_value, new_value)
    values (new.id, actor, 'role', old.role::text, new.role::text);
  end if;

  if new.verified_teacher is distinct from old.verified_teacher then
    insert into public.privilege_audit (subject_id, actor_id, change_type, old_value, new_value)
    values (new.id, actor, 'verified_teacher', old.verified_teacher::text, new.verified_teacher::text);
  end if;

  -- Spec 017 FR-001 - both directions. "Who made this person a reviewer, and
  -- when" must always have an answer, and so must "who took it away".
  if new.reviewer is distinct from old.reviewer then
    insert into public.privilege_audit (subject_id, actor_id, change_type, old_value, new_value)
    values (new.id, actor, 'reviewer', old.reviewer::text, new.reviewer::text);
  end if;

  if new.status is distinct from old.status then
    insert into public.privilege_audit (subject_id, actor_id, change_type, old_value, new_value)
    values (new.id, actor, 'status', old.status::text, new.status::text);
  end if;

  return null;  -- AFTER trigger: return value is ignored
end;
$$;

comment on function public.write_privilege_audit() is
  'FR-018, extended by Spec 017 FR-001 - writes one privilege_audit row per changed '
  'privileged column (role, verified_teacher, reviewer, status). actor_id is derived '
  'from auth.uid() server-side and is not client-supplied. Sole writer of '
  'privilege_audit (no client INSERT policy exists).';
