-- 0053_licence_mock_tests.sql
-- Decouple quiz_attempts from assignments for entitlement-gated mock tests.
-- Adds mock test tracking and a server-side scoring RPC.

ALTER TABLE public.quiz_attempts ALTER COLUMN assignment_id DROP NOT NULL;
ALTER TABLE public.quiz_attempts ADD COLUMN mock_test_course text;
ALTER TABLE public.quiz_attempts ADD COLUMN score_breakdown jsonb;

ALTER TABLE public.quiz_attempts ADD CONSTRAINT quiz_attempts_context_check 
  CHECK (
    (assignment_id IS NOT NULL AND mock_test_course IS NULL) OR 
    (assignment_id IS NULL AND mock_test_course IS NOT NULL)
  );

-- Allow students to read their own mock test attempts
CREATE POLICY quiz_attempts_mock_select
  ON public.quiz_attempts
  FOR SELECT
  TO authenticated
  USING (
    student_id = public.current_profile_id() AND mock_test_course IS NOT NULL
  );

-- Update quiz_items_public view to allow entitled users to read licence items
DROP VIEW IF EXISTS public.quiz_items_public;
CREATE VIEW public.quiz_items_public AS
SELECT id, course_code, unit_no, question_text, options, created_by, created_at
FROM public.quiz_items
WHERE course_code != 'licence' 
   OR (course_code = 'licence' AND EXISTS (
      SELECT 1 FROM public.entitlements e
      WHERE e.buyer_id = (current_setting('request.jwt.claim.sub', true))::uuid
        AND e.entitlement_type = 'licence_practice_pass'
        AND e.revoked_at IS NULL
   ));
GRANT SELECT ON public.quiz_items_public TO authenticated;

-- Allow entitled users to read answer keys for licence course
CREATE POLICY answer_keys_licence_select
  ON public.answer_keys
  FOR SELECT
  TO authenticated
  USING (
    course_code = 'licence' AND EXISTS (
      SELECT 1 FROM public.entitlements e
      WHERE e.buyer_id = auth.uid()
        AND e.entitlement_type = 'licence_practice_pass'
        AND e.revoked_at IS NULL
    )
  );

CREATE OR REPLACE FUNCTION public.submit_licence_mock_attempt(p_answers jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
declare
  caller_id         uuid := public.current_profile_id();
  total_items       integer;
  correct_count     integer;
  computed_score    numeric(6,2);
  new_attempt       public.quiz_attempts;
  breakdown         jsonb;
begin
  if caller_id is null then
    raise exception 'not_signed_in' using errcode = 'P0001';
  end if;

  if not exists (
    select 1 from public.entitlements e
    where e.buyer_id = caller_id
      and e.entitlement_type = 'licence_practice_pass'
      and e.revoked_at is null
  ) then
    raise exception 'not_entitled' using errcode = 'P0001';
  end if;

  select count(*) into total_items
  from public.quiz_items
  where course_code = 'licence';

  if total_items = 0 then
    raise exception 'no_quiz_items' using errcode = 'P0001';
  end if;

  select count(*) into correct_count
  from public.quiz_items qi
  where qi.course_code = 'licence'
    and (p_answers ->> qi.id::text) = qi.correct_option;

  computed_score := round((correct_count::numeric / total_items::numeric) * 100, 2);

  select jsonb_object_agg(
    unit_no::text,
    jsonb_build_object(
      'total', obj_total,
      'correct', obj_correct
    )
  ) into breakdown
  from (
    select unit_no,
           count(*) as obj_total,
           count(*) filter (where (p_answers ->> id::text) = correct_option) as obj_correct
    from public.quiz_items
    where course_code = 'licence'
    group by unit_no
  ) sub;

  insert into public.quiz_attempts (student_id, answers, score, mock_test_course, score_breakdown)
  values (caller_id, p_answers, computed_score, 'licence', breakdown)
  returning * into new_attempt;

  return jsonb_build_object(
    'id', new_attempt.id,
    'score', new_attempt.score,
    'attempted_at', new_attempt.attempted_at,
    'total_items', total_items,
    'correct_count', correct_count,
    'score_breakdown', breakdown
  );
end;
$$;

GRANT EXECUTE ON FUNCTION public.submit_licence_mock_attempt(jsonb) TO authenticated;
