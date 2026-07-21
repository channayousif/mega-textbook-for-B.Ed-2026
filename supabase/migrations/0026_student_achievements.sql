-- 0026_student_achievements.sql — Spec 004 (Student Dashboard)
-- student_achievements table + RLS + grant_achievement() helper
-- (FR-008, SC-004).
--
-- The "Achievement (catalog)" entity is NOT a table — the four fixed,
-- bilingual milestone definitions live as static code in
-- src/lib/achievements.ts (research.md R4). Only earned achievements are
-- persisted here.

create table public.student_achievements (
  id               uuid primary key default gen_random_uuid(),
  student_id       uuid not null references public.profiles(id),
  achievement_key  text not null check (achievement_key in (
    'first_submission', 'study_streak', 'full_course_coverage', 'on_time_class_completion'
  )),
  earned_at        timestamptz not null default now(),
  context          jsonb,
  unique (student_id, achievement_key)
);

comment on table public.student_achievements is
  'FR-008 — the record of which achievements a student has earned. The '
  'unique constraint is what guarantees SC-004''s "at most once per '
  'achievement per student" at the database layer, regardless of what '
  'triggers a grant attempt.';

alter table public.student_achievements enable row level security;

-- SELECT: the owning student, or admin (read-only support).
create policy student_achievements_select
  on public.student_achievements
  for select
  to authenticated
  using (
    public.is_admin()
    or student_id = public.current_profile_id()
  );

-- No INSERT/UPDATE/DELETE policy for any authenticated role, including
-- admin — the only write path is grant_achievement() below, called
-- exclusively from inside the trigger/RPC functions in 0027, never directly
-- by a client. Mirrors Spec 003's quiz_attempts precedent.

grant select on public.student_achievements to authenticated;

create or replace function public.grant_achievement(p_student_id uuid, p_key text, p_context jsonb default null)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.student_achievements (student_id, achievement_key, context)
  values (p_student_id, p_key, p_context)
  on conflict (student_id, achievement_key) do nothing;
end;
$$;

comment on function public.grant_achievement(uuid, text, jsonb) is
  'FR-008 — the single idempotent insert path for every achievement grant. '
  'Called only from inside the trigger/RPC functions in 0027, never '
  'directly by a client.';

revoke all on function public.grant_achievement(uuid, text, jsonb) from public;
