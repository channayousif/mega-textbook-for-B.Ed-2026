-- 0007_handle_new_user.sql — Spec 002 (Authentication & Roles)
-- Auto-create a profile when an auth identity is created (FR-003, FR-003a, FR-009).
--
-- ⚠️ SECURITY BOUNDARY (research.md R3):
-- raw_user_meta_data is CLIENT-CONTROLLED. A caller can send
--   signUp({ ..., options: { data: { role: 'admin' } } })
-- and it lands here verbatim. Trusting it would hand out admin on request,
-- defeating FR-006 and FR-009. The allowlist below is therefore not defensive
-- decoration — it is the control. Anything outside {student, teacher} becomes
-- 'student'; 'admin' is NEVER self-assignable.
--
-- SECURITY DEFINER is required because the inserting role is supabase_auth_admin,
-- which has no rights on public.profiles.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  requested_role text;
  resolved_role  public.user_role;
  existing_id    uuid;
begin
  -- FR-003a — identity linking. If a profile already exists for this email
  -- (e.g. the user registered with a password and is now arriving via Google),
  -- attach the new auth identity to that profile instead of creating a second
  -- one. One email = one account.
  select p.id
    into existing_id
  from public.profiles p
  join auth.users u on u.id = p.auth_user_id
  where lower(u.email) = lower(new.email)
    and p.deleted_at is null
  limit 1;

  if existing_id is not null then
    update public.profiles
       set auth_user_id = new.id
     where id = existing_id;
    return new;
  end if;

  -- Untrusted input — read, then constrain.
  requested_role := nullif(new.raw_user_meta_data ->> 'role', '');

  resolved_role := case
    when requested_role = 'teacher' then 'teacher'::public.user_role
    -- 'admin', 'ADMIN', 'superuser', NULL, garbage → all become student.
    else 'student'::public.user_role
  end;

  insert into public.profiles (
    auth_user_id,
    full_name,
    role,
    -- FR-005a — never conferred at sign-up under any circumstances.
    verified_teacher,
    status,
    -- research.md R3 — Google OAuth cannot carry a pre-consent role choice, so
    -- OAuth users land with the default and are prompted once. An explicit
    -- email/password choice is recorded immediately.
    role_chosen_at
  ) values (
    new.id,
    -- FR-010b — auto-fill the display name from the Google profile when present;
    -- otherwise leave null and let the UI fall back to the email address.
    coalesce(
      nullif(new.raw_user_meta_data ->> 'full_name', ''),
      nullif(new.raw_user_meta_data ->> 'name', '')
    ),
    resolved_role,
    false,
    'active',
    case when requested_role is not null then now() else null end
  );

  return new;
end;
$$;

comment on function public.handle_new_user() is
  'FR-003/FR-003a/FR-009 — creates the profile for a new auth identity. Treats '
  'raw_user_meta_data.role as UNTRUSTED and coerces it through a {student,teacher} '
  'allowlist; admin is never self-assignable. Links to an existing profile when the '
  'email already has one (one email = one account).';

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
