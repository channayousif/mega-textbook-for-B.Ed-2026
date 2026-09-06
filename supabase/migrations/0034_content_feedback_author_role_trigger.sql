-- 0034_content_feedback_author_role_trigger.sql — Spec 010 (Curriculum-owner console)
-- stamp_content_feedback_author_role() (FR-014).
--
-- ⚠️ SECURITY BOUNDARY (same posture as 0007_handle_new_user.sql's raw_user_meta_data
-- note): a client payload's author_role field is UNTRUSTED. This trigger overwrites it
-- unconditionally from the inserting caller's own profiles.role, looked up via auth.uid()
-- rather than trusting new.author_id, so a forged author_role — or a forged author_id
-- naming someone else's row — can never survive the insert.

create or replace function public.stamp_content_feedback_author_role()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  caller_role public.user_role;
begin
  select p.role
    into caller_role
  from public.profiles p
  where p.auth_user_id = auth.uid()
  limit 1;

  new.author_role := caller_role::text;

  return new;
end;
$$;

comment on function public.stamp_content_feedback_author_role() is
  'FR-014 — overwrites new.author_role from the inserting user''s own profiles.role, '
  'unconditionally. A client-supplied author_role value is always discarded, regardless '
  'of what was sent.';

create trigger content_feedback_stamp_author_role
  before insert on public.content_feedback
  for each row
  execute function public.stamp_content_feedback_author_role();
