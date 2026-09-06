-- 0035_content_feedback_status_transitions.sql — Spec 010 (Curriculum-owner console)
-- enforce_content_feedback_status_transition() (FR-019, FR-021; data-model.md).
--
-- Narrows the already-admin-only UPDATE policy (0033) to specific columns and specific
-- transitions, since RLS alone cannot express either — same shape as Spec 005's
-- enforce_suggestion_status_transition() (0031), adapted to this table's four-state
-- lifecycle (which additionally permits a reopen, unlike Spec 005's one-directional one).
-- This trigger is the only thing preventing a crafted admin API call from skipping a
-- triage step or editing already-filed content (comment/quoted_passage/etc. stay frozen
-- even for an admin) — do not relax it to "trust the triage UI" later.

create or replace function public.enforce_content_feedback_status_transition()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if new.author_id is distinct from old.author_id
    or new.author_role is distinct from old.author_role
    or new.page_kind is distinct from old.page_kind
    or new.course_code is distinct from old.course_code
    or new.unit_no is distinct from old.unit_no
    or new.topic_no is distinct from old.topic_no
    or new.locale is distinct from old.locale
    or new.section_anchor is distinct from old.section_anchor
    or new.scope is distinct from old.scope
    or new.quoted_passage is distinct from old.quoted_passage
    or new.passage_context is distinct from old.passage_context
    or new.comment is distinct from old.comment
    or new.created_at is distinct from old.created_at
  then
    raise exception 'only status, owner_note, and resolution_ref may be updated on a content_feedback row'
      using errcode = '42501';
  end if;

  if new.status is distinct from old.status then
    if not (
      (old.status = 'open' and new.status = 'planned')
      or (old.status = 'open' and new.status = 'resolved')
      or (old.status = 'open' and new.status = 'declined')
      or (old.status = 'planned' and new.status = 'resolved')
      or (old.status = 'planned' and new.status = 'declined')
      or (old.status = 'resolved' and new.status = 'open')
      or (old.status = 'declined' and new.status = 'open')
    ) then
      raise exception 'illegal content_feedback status transition: % -> %', old.status, new.status
        using errcode = '22023';
    end if;
  end if;

  return new;
end;
$$;

comment on function public.enforce_content_feedback_status_transition() is
  'FR-019, FR-021 — restricts an admin UPDATE to status/owner_note/resolution_ref only, '
  'and allows exclusively open->{planned,resolved,declined}, planned->{resolved,'
  'declined}, and a reopen from resolved/declined back to open (same status, i.e. a '
  'note-only edit, is also permitted). Any other pair, including a two-hop jump, raises.';

create trigger content_feedback_enforce_transition
  before update on public.content_feedback
  for each row
  execute function public.enforce_content_feedback_status_transition();

-- Reuses assignments' touch_updated_at() stamper (0017) — bumps updated_at on every
-- legal transition (fires alphabetically after enforce_transition, same ordering
-- convention as Spec 005's 0030/0031 pair).
create trigger content_feedback_touch_updated_at
  before update on public.content_feedback
  for each row
  execute function public.touch_updated_at();
