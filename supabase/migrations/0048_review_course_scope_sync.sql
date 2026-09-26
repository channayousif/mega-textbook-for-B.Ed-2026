-- Keep the authorization mirror in sync with Git catalog metadata without a migration per course.
create function public.sync_review_course_scopes(p_codes text[])
returns void language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if auth.role() <> 'service_role' then raise exception 'service role required' using errcode = '42501'; end if;
  if p_codes is null or cardinality(p_codes) = 0 or exists(
    select 1 from unnest(p_codes) c where c is null or c !~ '^[A-Z][A-Z0-9]*-[0-9]{3}$') then
    raise exception 'valid B.Ed course codes required' using errcode = '22023'; end if;
  delete from public.review_course_scopes where course_code is not null;
  insert into public.review_course_scopes(course_code,track)
    select distinct c,'bed' from unnest(p_codes) c;
end; $$;
revoke all on function public.sync_review_course_scopes(text[]) from public, anon, authenticated;
grant execute on function public.sync_review_course_scopes(text[]) to service_role;
