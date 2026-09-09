-- 0040_quiz_authoring_rls.sql - Spec 011 (Dashboard redesign), US6 / FR-014.
--
-- DELIBERATE REVERSAL of the Spec 003 posture. 0021/0022 left quiz_items and answer_keys
-- SELECT-only for verified teachers/admin, with an explicit "curriculum-authority content
-- work (Article II), admin manages directly, not client-writable" comment. Spec 011's
-- owner decision (AskUserQuestion 2026-09-08: "a verified-teacher UI to author quiz items
-- and answer keys") makes this a client-facing capability, closing the standing Spec 003
-- backlog item ("Quiz item / answer-key authoring UI ... if manual seeding becomes a
-- bottleneck").
--
-- The gate is unchanged in kind: public.is_verified_teacher() - the SAME check that
-- already guards every READ of these tables. A student and an unverified teacher can
-- neither read nor now write them. correct_option stays out of quiz_items_public, so the
-- student quiz-taking path is untouched (SC-004).

-- quiz_items: gain updated_at for the authoring UI, then INSERT/UPDATE/DELETE for verified
-- teachers.
alter table public.quiz_items
  add column if not exists updated_at timestamptz not null default now();

create policy quiz_items_insert
  on public.quiz_items
  for insert
  to authenticated
  with check (public.is_verified_teacher());

create policy quiz_items_update
  on public.quiz_items
  for update
  to authenticated
  using (public.is_verified_teacher())
  with check (public.is_verified_teacher());

create policy quiz_items_delete
  on public.quiz_items
  for delete
  to authenticated
  using (public.is_verified_teacher());

comment on policy quiz_items_insert on public.quiz_items is
  'Spec 011 FR-014 - a verified teacher may author quiz items (reverses the Spec 003 '
  'admin-only-seeding posture); same is_verified_teacher() gate as quiz_items_select.';

grant insert, update, delete on public.quiz_items to authenticated;

create trigger quiz_items_touch_updated_at
  before update on public.quiz_items
  for each row
  execute function public.touch_updated_at();

-- answer_keys: INSERT/UPDATE/DELETE for verified teachers (updated_at column already exists).
create policy answer_keys_insert
  on public.answer_keys
  for insert
  to authenticated
  with check (public.is_verified_teacher());

create policy answer_keys_update
  on public.answer_keys
  for update
  to authenticated
  using (public.is_verified_teacher())
  with check (public.is_verified_teacher());

create policy answer_keys_delete
  on public.answer_keys
  for delete
  to authenticated
  using (public.is_verified_teacher());

comment on policy answer_keys_insert on public.answer_keys is
  'Spec 011 FR-014 - a verified teacher may author answer keys / marking guidance for a '
  'unit; same is_verified_teacher() gate as answer_keys_select.';

grant insert, update, delete on public.answer_keys to authenticated;

create trigger answer_keys_touch_updated_at
  before update on public.answer_keys
  for each row
  execute function public.touch_updated_at();
