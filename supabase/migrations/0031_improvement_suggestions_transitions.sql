-- 0031_improvement_suggestions_transitions.sql — Spec 005 (Teacher Dashboard,
-- Feedback & Book Improvement Loop) — enforce_suggestion_status_transition()
-- (FR-005, research.md R5).
--
-- Narrows the already-admin-only UPDATE policy (0030) to specific columns
-- and specific transitions, since RLS alone cannot express either. Trigger
-- name is prefixed so it fires (alphabetically, same as
-- improvement_suggestions_touch_updated_at's ordering convention) BEFORE the
-- updated_at stamper on the same table.

create or replace function public.enforce_suggestion_status_transition()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if new.teacher_id is distinct from old.teacher_id
    or new.page_slug is distinct from old.page_slug
    or new.section_anchor is distinct from old.section_anchor
    or new.locale is distinct from old.locale
    or new.course_code is distinct from old.course_code
    or new.unit_no is distinct from old.unit_no
    or new.category is distinct from old.category
    or new.body is distinct from old.body
    or new.created_at is distinct from old.created_at
  then
    raise exception 'only status and admin_note may be updated on an improvement_suggestions row'
      using errcode = '42501';
  end if;

  if new.status is distinct from old.status then
    if not (
      (old.status = 'submitted' and new.status = 'under_review')
      or (old.status = 'under_review' and new.status = 'accepted')
      or (old.status = 'under_review' and new.status = 'rejected')
      or (old.status = 'accepted' and new.status = 'published')
    ) then
      raise exception 'illegal suggestion status transition: % -> %', old.status, new.status
        using errcode = '22023';
    end if;
  end if;

  return new;
end;
$$;

comment on function public.enforce_suggestion_status_transition() is
  'FR-005, research.md R5 — restricts an admin UPDATE to status/admin_note '
  'only, and allows exclusively submitted->under_review, '
  'under_review->accepted, under_review->rejected, accepted->published '
  '(same status, i.e. a note-only edit, is also permitted).';

create trigger improvement_suggestions_enforce_transition
  before update on public.improvement_suggestions
  for each row
  execute function public.enforce_suggestion_status_transition();
