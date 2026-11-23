-- 0055_self_check.sql - Feature 032 phase C (owner, 2026-11-23: "Terms + server marking").
--
-- A self-check on each unit's assessment page: the unit's ten multiple-choice questions, marked on
-- the server. The answer key never reaches the browser (Constitution: answer keys live only in the
-- bounded answers section of an assessment page and in RLS-protected tables).
--
-- Items live in their own table, not quiz_items: a teacher's quiz assignment draws every quiz_items
-- row of its unit, so importing the assessment bank there would change existing quizzes.
-- Rows are written only by scripts/quiz/import-assessment-mcq.mjs with the service role.
--
-- Reading: self_check_questions() returns questions and options without the key, to anyone.
-- Marking: check_self_quiz() needs a signed-in learner, marks the whole set, returns the score and
-- the numbers of the wrong items (never the right option), and allows a few attempts per unit per
-- day, so the key cannot be read off by trying each option.

create table public.self_check_attempts (
  id           uuid primary key default gen_random_uuid(),
  profile_id   uuid not null references public.profiles(id) on delete cascade,
  course_code  text not null,
  unit_no      integer not null,
  locale       text not null,
  score        integer not null,
  total        integer not null,
  attempted_at timestamptz not null default now()
);

comment on table public.self_check_attempts is
  'Feature 032: one row per self-check submission; written only by check_self_quiz(). A learner reads their own rows.';

alter table public.self_check_attempts enable row level security;
revoke all on public.self_check_attempts from anon, authenticated;
create policy self_check_attempts_own on public.self_check_attempts for select to authenticated
  using (profile_id = public.current_profile_id());
grant select on public.self_check_attempts to authenticated;
create index self_check_attempts_daily on public.self_check_attempts (profile_id, course_code, unit_no, attempted_at);

create table public.self_check_items (
  id             uuid primary key default gen_random_uuid(),
  course_code    text not null check (course_code ~ '^[A-Z]{4}-[0-9]{3}$'),
  unit_no        integer not null check (unit_no between 1 and 40),
  locale         text not null check (locale in ('en', 'ur')),
  item_no        integer not null check (item_no between 1 and 50),
  question_text  text not null,
  options        jsonb not null check (jsonb_typeof(options) = 'object'),
  correct_option text not null check (correct_option ~ '^[a-f]$'),
  bloom          text,
  source_sha     text,
  imported_at    timestamptz not null default now(),
  unique (course_code, unit_no, locale, item_no)
);

comment on table public.self_check_items is
  'Feature 032: the multiple-choice bank of each unit assessment, imported from the assessment pages. '
  'No client policy: read only through self_check_questions() (no key) and check_self_quiz() (marking).';

alter table public.self_check_items enable row level security;
revoke all on public.self_check_items from anon, authenticated;

-- Questions without the key, in item order.
create or replace function public.self_check_questions(p_course text, p_unit integer, p_locale text)
returns table (item_no integer, question_text text, options jsonb, bloom text)
language sql stable security definer set search_path = public as $$
  select i.item_no, i.question_text, i.options, i.bloom
  from public.self_check_items i
  where i.course_code = p_course and i.unit_no = p_unit and i.locale = p_locale
  order by i.item_no;
$$;
revoke all on function public.self_check_questions(text, integer, text) from public;
grant execute on function public.self_check_questions(text, integer, text) to anon, authenticated;

-- Mark a whole set. p_answers: {"1": "a", "2": "c", ...}. Unanswered items count as wrong.
create or replace function public.check_self_quiz(p_course text, p_unit integer, p_locale text, p_answers jsonb)
returns jsonb
language plpgsql volatile security definer set search_path = public as $$
declare
  v_profile uuid := public.current_profile_id();
  v_limit   constant integer := 5;
  v_used    integer;
  v_total   integer := 0;
  v_score   integer := 0;
  v_wrong   integer[] := '{}';
  r         record;
begin
  if v_profile is null then
    raise exception 'sign in to check your answers' using errcode = '28000';
  end if;
  if p_answers is null or jsonb_typeof(p_answers) <> 'object' then
    raise exception 'answers must be an object of item number to option' using errcode = '22023';
  end if;
  select count(*) into v_used from public.self_check_attempts a
   where a.profile_id = v_profile and a.course_code = p_course and a.unit_no = p_unit
     and a.attempted_at > now() - interval '1 day';
  if v_used >= v_limit then
    raise exception 'daily limit of % checks for this unit reached; try again tomorrow', v_limit using errcode = 'P0001';
  end if;
  for r in select i.item_no, i.correct_option from public.self_check_items i
            where i.course_code = p_course and i.unit_no = p_unit and i.locale = p_locale order by i.item_no loop
    v_total := v_total + 1;
    if lower(coalesce(p_answers ->> r.item_no::text, '')) = r.correct_option then
      v_score := v_score + 1;
    else
      v_wrong := v_wrong || r.item_no;
    end if;
  end loop;
  if v_total = 0 then
    raise exception 'no self-check for this unit yet' using errcode = 'P0002';
  end if;
  insert into public.self_check_attempts (profile_id, course_code, unit_no, locale, score, total)
  values (v_profile, p_course, p_unit, p_locale, v_score, v_total);
  return jsonb_build_object('score', v_score, 'total', v_total, 'wrong', to_jsonb(v_wrong), 'attempts_left', v_limit - v_used - 1);
end;
$$;
revoke all on function public.check_self_quiz(text, integer, text, jsonb) from public;
grant execute on function public.check_self_quiz(text, integer, text, jsonb) to authenticated;
