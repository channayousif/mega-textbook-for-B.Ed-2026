-- 0056_quiz_item_drafts.sql
--
-- Spec 029 (Gemini Notebook Studio): "Quiz items go only to the RLS-protected quiz_items
-- table as teacher-review drafts." quiz_items had no notion of a draft, so an imported item
-- would have been live in every quiz the moment it was written. This adds a status, and
-- every reader a student can reach now sees published items only.
--
-- Behaviour today is unchanged: every existing row, and every item a verified teacher
-- creates in the authoring UI, defaults to 'published'. Only the owner-run importer
-- (scripts/studio/import-quiz-drafts.mjs) writes 'draft'. A verified teacher reviews a
-- draft on /app/teacher/quiz-authoring and publishes it (an UPDATE, already gated on
-- is_verified_teacher() by quiz_items_update in 0040).
--
-- Readers covered:
--   * quiz_items (full row)        verified teacher / admin only (0022 select policy):
--                                  they see drafts, which is how they review them.
--   * quiz_items_public (view)     every authenticated user, runs as the view owner:
--                                  now filtered to status = 'published'.
--   * submit_quiz_attempt()        SECURITY DEFINER scorer: counts and scores published
--                                  items only, so a draft can never change a mark.
--   * self_check_* (0055)          separate table, untouched.

alter table public.quiz_items
  add column if not exists status text not null default 'published'
    check (status in ('draft', 'published'));

comment on column public.quiz_items.status is
  'Spec 029 - draft items are visible to verified teachers for review only; students, the '
  'quiz picker and the scorer see published items. Defaults to published.';

create index if not exists quiz_items_unit_status_idx
  on public.quiz_items (course_code, unit_no, status);

-- Same columns, same owner, same (deliberately non-invoker) security as 0022; only the
-- filter is new. CREATE OR REPLACE keeps the owner and the grant.
create or replace view public.quiz_items_public as
  select id, course_code, unit_no, question_text, options, created_by, created_at
  from public.quiz_items
  where status = 'published';

comment on view public.quiz_items_public is
  'FR-017 - the quiz-taking UI''s read path: every quiz_items column except '
  'correct_option, PUBLISHED items only (0056), readable by any authenticated user '
  'regardless of verified_teacher (relies on the view owner''s rolbypassrls - see 0022).';

-- Body identical to 0023 except the two quiz_items reads, which now skip drafts.
create or replace function public.submit_quiz_attempt(p_assignment_id uuid, p_answers jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  target_assignment public.assignments;
  caller_id         uuid := public.current_profile_id();
  total_items       integer;
  correct_count     integer;
  computed_score    numeric(6,2);
  new_attempt       public.quiz_attempts;
begin
  if caller_id is null then
    raise exception 'not_signed_in' using errcode = 'P0001';
  end if;

  select * into target_assignment from public.assignments where id = p_assignment_id;
  if not found or target_assignment.source_kind <> 'quiz' then
    raise exception 'not_a_quiz_assignment' using errcode = 'P0001';
  end if;

  if not exists (
    select 1 from public.classes c where c.id = target_assignment.class_id and c.status = 'active'
  ) then
    raise exception 'class_archived' using errcode = 'P0001';
  end if;

  if target_assignment.published = false then
    raise exception 'not_published' using errcode = 'P0001';
  end if;

  if not exists (
    select 1 from public.enrollments e
    where e.class_id = target_assignment.class_id
      and e.student_id = caller_id
      and e.status = 'active'
  ) then
    raise exception 'not_enrolled' using errcode = 'P0001';
  end if;

  if now() > target_assignment.due_at then
    raise exception 'past_due' using errcode = 'P0001';
  end if;

  select count(*) into total_items
  from public.quiz_items
  where course_code = target_assignment.course_code
    and unit_no = target_assignment.unit_no
    and status = 'published';

  if total_items = 0 then
    raise exception 'no_quiz_items' using errcode = 'P0001';
  end if;

  select count(*) into correct_count
  from public.quiz_items qi
  where qi.course_code = target_assignment.course_code
    and qi.unit_no = target_assignment.unit_no
    and qi.status = 'published'
    and (p_answers ->> qi.id::text) = qi.correct_option;

  computed_score := round((correct_count::numeric / total_items::numeric) * target_assignment.max_mark, 2);

  insert into public.quiz_attempts (assignment_id, student_id, answers, score)
  values (p_assignment_id, caller_id, p_answers, computed_score)
  returning * into new_attempt;

  return jsonb_build_object(
    'id', new_attempt.id,
    'score', new_attempt.score,
    'attempted_at', new_attempt.attempted_at,
    'total_items', total_items,
    'correct_count', correct_count
  );
end;
$$;

comment on function public.submit_quiz_attempt(uuid, jsonb) is
  'FR-017 - computes the score server-side from PUBLISHED quiz_items.correct_option (0056; '
  'never exposed to the client) and inserts one quiz_attempts row. Unlimited retakes before '
  'due_at (2026-07-19 clarification, raises past_due after); quiz_best_scores keeps the '
  'highest as the record.';

revoke all on function public.submit_quiz_attempt(uuid, jsonb) from public;
grant execute on function public.submit_quiz_attempt(uuid, jsonb) to authenticated;
