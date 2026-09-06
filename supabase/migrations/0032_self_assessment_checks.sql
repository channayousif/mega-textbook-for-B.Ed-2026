-- 0032_self_assessment_checks.sql — Spec 010 (Curriculum-owner console)
-- self_assessment_checks table + RLS + enforce_self_assessment_immutable_identity()
-- (FR-001, FR-004, FR-006, FR-007, FR-009; data-model.md).
--
-- One student's tick against one checklist item of one topic in one language. Identity
-- is POSITIONAL (research.md R3), never the item's own text, which an author may edit at
-- any time — item_text_snapshot records the wording the tick was last made against, and
-- FR-009's "material change" rule is enforced client-side by comparing that snapshot to
-- the current render, not by anything in this schema.
--
-- course_code/unit_no/topic_no are unvalidated-by-FK pointers into Git-tracked content,
-- the same convention every course-scoped table has used since Spec 003 (Art. V.1/V.4).
--
-- Deliberately the STRICTEST role boundary in this codebase so far: the SELECT policy
-- below has NO teacher branch at all — a teacher's query returns zero rows, which is how
-- FR-006 ("Teachers MUST NOT have access") is enforced at the data layer, not by omitting
-- a UI link (Art. VIII.1, plan.md's own framing).

create table public.self_assessment_checks (
  id                  uuid primary key default gen_random_uuid(),
  student_id          uuid not null references public.profiles(id),
  course_code         text not null,
  unit_no             integer not null,
  topic_no            integer not null,
  locale              text not null check (locale in ('en', 'ur')),
  item_position       integer not null check (item_position >= 1),
  item_text_snapshot  text not null,
  checked             boolean not null default true,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now(),
  unique (student_id, course_code, unit_no, topic_no, locale, item_position)
);

comment on table public.self_assessment_checks is
  'FR-001, FR-004, FR-009 — one row per student per checklist item position per topic '
  'per language. checked toggles false<->true freely (un-ticking is an UPDATE, never a '
  'DELETE); item_text_snapshot is the normalized item text as of the last write to that '
  'position, used client-side to detect a wording change (research.md R3).';

alter table public.self_assessment_checks enable row level security;

-- SELECT: the owning student, or admin (aggregate support access). No teacher branch
-- exists at all — this is intentionally stricter than the Art. VIII.1 baseline (FR-006).
create policy self_assessment_checks_select
  on public.self_assessment_checks
  for select
  to authenticated
  using (
    student_id = public.current_profile_id()
    or public.is_admin()
  );

-- INSERT: only the owning student, own row only (FR-001).
create policy self_assessment_checks_insert
  on public.self_assessment_checks
  for insert
  to authenticated
  with check (
    student_id = public.current_profile_id()
  );

-- UPDATE: only the owning student, own row only. The guard trigger below narrows which
-- columns an already-permitted update may actually touch (identity columns are frozen).
create policy self_assessment_checks_update
  on public.self_assessment_checks
  for update
  to authenticated
  using (student_id = public.current_profile_id())
  with check (student_id = public.current_profile_id());

-- No DELETE policy — un-ticking is an UPDATE to checked = false.

grant select, insert, update on public.self_assessment_checks to authenticated;

-- Freezes the row's identity after insert (FR-009) — only checked, item_text_snapshot,
-- and updated_at may move. Same shape as Spec 005's enforce_suggestion_status_transition
-- (0031) minus the transition-graph half: there is no status machine here, just "the
-- identity columns never change once written".
create or replace function public.enforce_self_assessment_immutable_identity()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if new.student_id is distinct from old.student_id
    or new.course_code is distinct from old.course_code
    or new.unit_no is distinct from old.unit_no
    or new.topic_no is distinct from old.topic_no
    or new.locale is distinct from old.locale
    or new.item_position is distinct from old.item_position
    or new.created_at is distinct from old.created_at
  then
    raise exception 'self_assessment_checks identity columns are immutable after insert'
      using errcode = '42501';
  end if;

  return new;
end;
$$;

comment on function public.enforce_self_assessment_immutable_identity() is
  'FR-009 — rejects any UPDATE that changes student_id/course_code/unit_no/topic_no/'
  'locale/item_position/created_at; only checked, item_text_snapshot, and updated_at '
  'may move on an existing row.';

create trigger self_assessment_checks_enforce_identity
  before update on public.self_assessment_checks
  for each row
  execute function public.enforce_self_assessment_immutable_identity();

-- Reuses assignments' touch_updated_at() stamper (0017) — bumps updated_at on every
-- re-tick/untick (fires alphabetically after the identity-enforcement trigger above,
-- same ordering convention as Spec 005's 0030/0031 pair).
create trigger self_assessment_checks_touch_updated_at
  before update on public.self_assessment_checks
  for each row
  execute function public.touch_updated_at();
