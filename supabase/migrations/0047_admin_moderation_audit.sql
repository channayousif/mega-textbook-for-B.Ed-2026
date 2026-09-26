-- Preserve admin moderation decisions as append-only actions as well as current row state.
create function public.audit_suggestion_moderation()
returns trigger language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if auth.uid() is not null and (new.status is distinct from old.status or new.admin_note is distinct from old.admin_note) then
    insert into public.admin_action_history(actor_id,action,target_type,target_id,detail)
    values(public.current_profile_id(),'suggestion_moderated','improvement_suggestion',new.id,
      jsonb_build_object('from',old.status,'to',new.status,'note',new.admin_note));
  end if;
  return null;
end; $$;
create trigger suggestion_moderation_audit after update on public.improvement_suggestions
  for each row execute function public.audit_suggestion_moderation();

create function public.audit_content_feedback_moderation()
returns trigger language plpgsql security definer set search_path = public, pg_temp as $$
begin
  if auth.uid() is not null and (new.status is distinct from old.status or new.owner_note is distinct from old.owner_note
    or new.resolution_ref is distinct from old.resolution_ref) then
    insert into public.admin_action_history(actor_id,action,target_type,target_id,detail)
    values(public.current_profile_id(),'reader_feedback_moderated','content_feedback',new.id,
      jsonb_build_object('from',old.status,'to',new.status,'note',new.owner_note,'resolution_ref',new.resolution_ref));
  end if;
  return null;
end; $$;
create trigger content_feedback_moderation_audit after update on public.content_feedback
  for each row execute function public.audit_content_feedback_moderation();
