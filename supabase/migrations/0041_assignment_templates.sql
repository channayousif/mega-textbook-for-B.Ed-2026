-- 0041_assignment_templates.sql - Spec 011 (Dashboard redesign), US7 / FR-016.
--
-- A teacher-owned, reusable assignment configuration. Chosen as a server table (over
-- localStorage) so a template follows the teacher across devices, consistent with the
-- Spec 011 notes decision. No FK into classes or assignments - a template is not tied to
-- any one class; it just pre-fills the create-assignment form.

create table public.assignment_templates (
  id            uuid primary key default gen_random_uuid(),
  teacher_id    uuid not null references public.profiles(id) on delete cascade,
  name          text not null check (char_length(name) between 1 and 120),
  title_pattern text not null check (char_length(title_pattern) between 1 and 200),
  instructions  text not null default '',
  max_mark      integer not null check (max_mark between 1 and 1000),
  allow_late    boolean not null default false,
  created_at    timestamptz not null default now()
);

comment on table public.assignment_templates is
  'Spec 011 FR-016 - a teacher-owned saved assignment configuration, reused to pre-fill '
  'the create-assignment form. Not linked to any class or assignment.';

alter table public.assignment_templates enable row level security;

create policy assignment_templates_all
  on public.assignment_templates
  for all
  to authenticated
  using (teacher_id = public.current_profile_id())
  with check (teacher_id = public.current_profile_id());

comment on policy assignment_templates_all on public.assignment_templates is
  'FR-016 - a teacher reaches only their own templates (SELECT/INSERT/UPDATE/DELETE).';

grant select, insert, update, delete on public.assignment_templates to authenticated;

create index assignment_templates_teacher_idx
  on public.assignment_templates (teacher_id, created_at desc);
