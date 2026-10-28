-- Harden page_feedback (0049): bounded anonymous inserts, admin-only reads.
--
-- 0049 let anyone insert any text of any length and gave no role a way to read
-- the rows except the service key. The widget (src/components/FeedbackWidget.tsx)
-- does a plain insert with no read-back, caps comments at 250 characters, and
-- sends the Docusaurus locale, so these limits never reject a real submission.

alter table public.page_feedback
  add constraint page_feedback_path check (page_path ~ '^/' and length(page_path) <= 300),
  add constraint page_feedback_comment check (comment is null or length(comment) between 1 and 500),
  add constraint page_feedback_locale check (locale in ('en', 'ur'));

create index if not exists page_feedback_created on public.page_feedback(created_at desc);

-- Flood brake. PostgREST gives no trustworthy per-client key without storing IPs,
-- so this caps the whole table instead: feedback is non-critical and a burst over
-- 60 a minute is abuse, not readers.
create function public.page_feedback_flood_brake()
returns trigger language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if (select count(*) from public.page_feedback where created_at > now() - interval '1 minute') >= 60 then
    raise exception 'too much feedback right now, try again shortly' using errcode = '54000';
  end if;
  return new;
end; $$;
create trigger page_feedback_flood_brake before insert on public.page_feedback
  for each row execute function public.page_feedback_flood_brake();
revoke all on function public.page_feedback_flood_brake() from public, anon, authenticated;

-- Admins read feedback in the app; nobody else reads it.
create policy page_feedback_admin_read on public.page_feedback
  for select to authenticated using (public.is_admin());

-- Supabase default privileges grant ALL (including UPDATE, DELETE and TRUNCATE)
-- to anon and authenticated; keep only what the widget and the admin read need.
revoke all on public.page_feedback from anon, authenticated;
grant insert on public.page_feedback to anon, authenticated;
grant select on public.page_feedback to authenticated;
