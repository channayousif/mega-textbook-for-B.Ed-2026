-- 0023_quiz_attempts.sql — Spec 003 (Virtual Classes, Assignments & Assessments)
-- quiz_attempts table + quiz_best_scores view + submit_quiz_attempt() RPC
-- (FR-017, SC-004, 2026-07-19 clarification — unlimited retakes, best score of record).

create table public.quiz_attempts (
  id           uuid primary key default gen_random_uuid(),
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  student_id   uuid not null references public.profiles(id),
  answers      jsonb not null,
  score        numeric(6,2) not null,
  attempted_at timestamptz not null default now()
);

comment on table public.quiz_attempts is
  'FR-017 — one row per quiz-taking attempt. No direct client INSERT/UPDATE '
  'policy anywhere in this file: the ONLY write path is submit_quiz_attempt() '
  'below, which computes score server-side so a client can never forge one. '
  'Unlimited attempts before the assignment''s due_at (2026-07-19 '
  'clarification); quiz_best_scores (below) keeps the highest as the record.';

alter table public.quiz_attempts enable row level security;

-- SELECT: the attempting student (own rows only); the owning teacher (all
-- attempts for their own class's assignments, via owns_class() — 0015); admin.
create policy quiz_attempts_select
  on public.quiz_attempts
  for select
  to authenticated
  using (
    public.is_admin()
    or student_id = public.current_profile_id()
    or exists (
      select 1 from public.assignments a
      where a.id = quiz_attempts.assignment_id and public.owns_class(a.class_id)
    )
  );

-- No INSERT/UPDATE/DELETE policy for any authenticated role — see table
-- comment. submit_quiz_attempt() below is SECURITY DEFINER and writes
-- directly, bypassing RLS for that one insert, same pattern as
-- join_class_by_code() (0016).

grant select on public.quiz_attempts to authenticated;

-- quiz_best_scores: max(score) per (assignment_id, student_id) — R7's
-- deliberately uncached choice (a plain indexed aggregate is well within the
-- <5s p95 budget at this feature's 200-student scale; no trigger-maintained
-- column). Column named `best_score`, matching data-model.md exactly.
--
-- security_invoker = true — the OPPOSITE choice from quiz_items_public
-- (0022): this view MUST run as the querying user, not the (rolbypassrls)
-- owner, so quiz_attempts_select above still applies per row before the
-- aggregation — a student's MAX() only ever sees their own rows, a teacher's
-- only their own class's. Without this, every authenticated user would see
-- every student's best score across every class, a real security bug the
-- default view-owner-runs-it behavior would silently produce.
create view public.quiz_best_scores
  with (security_invoker = true)
  as
  select assignment_id, student_id, max(score) as best_score
  from public.quiz_attempts
  group by assignment_id, student_id;

comment on view public.quiz_best_scores is
  'FR-017, R7 — max(score) per (assignment_id, student_id), read by the '
  'teacher''s results view and the gradebook export (T051) as the score of '
  'record. security_invoker = true is load-bearing — see inline comment '
  'above the CREATE VIEW statement.';

grant select on public.quiz_best_scores to authenticated;

-- submit_quiz_attempt(): the only write path onto quiz_attempts. Mirrors
-- join_class_by_code()'s (0016) SECURITY DEFINER + short machine-parseable
-- errcode P0001 error-string convention.
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
    and unit_no = target_assignment.unit_no;

  if total_items = 0 then
    raise exception 'no_quiz_items' using errcode = 'P0001';
  end if;

  select count(*) into correct_count
  from public.quiz_items qi
  where qi.course_code = target_assignment.course_code
    and qi.unit_no = target_assignment.unit_no
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
  'FR-017 — computes the score server-side from quiz_items.correct_option '
  '(never exposed to the client) and inserts one quiz_attempts row. Unlimited '
  'retakes before due_at (2026-07-19 clarification, raises past_due after); '
  'quiz_best_scores keeps the highest as the record.';

revoke all on function public.submit_quiz_attempt(uuid, jsonb) from public;
grant execute on function public.submit_quiz_attempt(uuid, jsonb) to authenticated;
