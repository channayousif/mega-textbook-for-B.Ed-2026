-- 0045_loggable_per_topic_kinds.sql - widen source_kind to the per-topic layout
--
-- WHY. Spec 008 replaced the legacy activities/formative/summative page trio
-- with a per-topic layout that emits `topic` and `assessment` instead. The
-- three tables below still CHECK against only the legacy trio, so as each
-- course migrated it silently lost the ability to be logged, assigned or rated.
--
-- Measured on the content index at the time of writing:
--
--   EFMP-301   0 loggable of  5 indexed
--   EFMP-302   0 loggable of 31 indexed
--   GENG-300   3 loggable of  3   (coming_soon scaffold)
--   GICT-300   3 loggable of  3   (coming_soon scaffold)
--   GNAS-301   3 loggable of  3   (coming_soon scaffold)
--   GQUR-300   3 loggable of  3   (coming_soon scaffold)
--
-- Every course with real authored content offered a teacher NOTHING; the only
-- loggable items left in the corpus were placeholder scaffolds. Three teacher
-- features - the teaching log, assignments and activity feedback - were dead
-- for all real content. Found by running the e2e suite locally while GitHub
-- Actions minutes were exhausted; the picker returned zero options.
--
-- WHAT CHANGED IN THE REASONING. src/lib/assignments.ts argued that topics
-- "are whole lessons, not activity kinds". That was defensible when most
-- content was legacy. The corpus has since moved, and a constraint that admits
-- only placeholder content is not protecting a distinction - it is disabling a
-- feature. The narrower reading loses; the kinds are widened to match what the
-- content index actually emits.
--
-- WHAT IS NOT WIDENED. `course-review` stays out. It is a whole-course page,
-- not a unit item, and both tables key on (course_code, unit_no) with unit_no
-- NOT NULL - there is no unit for it to belong to. Adding it would admit rows
-- that cannot be addressed.
--
-- Widening a CHECK is backward compatible: every row that satisfied the old
-- constraint satisfies the new one, so no data migration and no backfill.

alter table public.assignments
  drop constraint if exists assignments_source_kind_check;
alter table public.assignments
  add constraint assignments_source_kind_check
  check (source_kind in ('activity', 'formative', 'summative', 'topic', 'assessment', 'custom', 'quiz'));

alter table public.teaching_log_entries
  drop constraint if exists teaching_log_entries_source_kind_check;
alter table public.teaching_log_entries
  add constraint teaching_log_entries_source_kind_check
  check (source_kind in ('activity', 'formative', 'summative', 'topic', 'assessment'));

alter table public.activity_feedback
  drop constraint if exists activity_feedback_source_kind_check;
alter table public.activity_feedback
  add constraint activity_feedback_source_kind_check
  check (source_kind in ('activity', 'formative', 'summative', 'topic', 'assessment'));
