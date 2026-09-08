-- 0037_content_feedback_guest_access.sql — Spec 010 follow-up (2026-09-07)
--
-- Curriculum-owner report: reader feedback was silently restricted to
-- role='student'/'teacher' (a UI gate in Footer.tsx, not this table) and
-- carried no guidance about the text-selection-triggers-passage-feedback
-- mechanism. This migration is the database half of opening it to EVERY
-- reader, including a signed-out guest who supplies only an email address —
-- the UI half (Footer.tsx) and the actual guest submission path (a new Edge
-- Function, since an unauthenticated insert needs its own server-side
-- validation and an email-confirmation step) are separate commits.
--
-- Guest identity model: `author_id` becomes nullable; a guest row instead
-- carries `guest_email` + a random `guest_confirmation_token`. The row is
-- inserted immediately (so nothing is lost if the confirmation email never
-- arrives) but `guest_confirmed_at` stays null until the reader clicks the
-- emailed link — confirmation happens via `confirm_guest_feedback()` below,
-- callable by `anon` directly (the token itself is the credential, exactly
-- like every "click this link to confirm" flow; nobody without the emailed
-- token can call this usefully). No new anon INSERT policy is needed on this
-- table at all: the guest submission path goes through a service-role Edge
-- Function (bypassing RLS the same way admin-suspend/admin-list-users
-- already do for a privileged action this table's own RLS can't express),
-- never a direct client insert.

alter table public.content_feedback
  alter column author_id drop not null,
  add column guest_email text,
  add column guest_confirmation_token uuid,
  add column guest_confirmed_at timestamptz;

alter table public.content_feedback
  add constraint content_feedback_guest_email_length
    check (guest_email is null or char_length(guest_email) <= 320),
  add constraint content_feedback_guest_email_format
    check (guest_email is null or guest_email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  -- Exactly one identity per row — a signed-in author never also carries a
  -- guest email, and a guest row never carries a profile id.
  add constraint content_feedback_author_identity_pairing
    check ((author_id is not null) <> (guest_email is not null)),
  -- A guest row always gets a token to confirm with; a non-guest row never
  -- has one lying around unused.
  add constraint content_feedback_guest_token_pairing
    check ((guest_email is not null) = (guest_confirmation_token is not null)),
  -- Confirmation only ever applies to a guest row.
  add constraint content_feedback_guest_confirmed_requires_guest
    check (guest_confirmed_at is null or guest_email is not null);

-- Tokens are looked up by exact value on every confirm click; also doubles as
-- the uniqueness guarantee a random per-row token is supposed to have.
create unique index content_feedback_guest_confirmation_token_key
  on public.content_feedback (guest_confirmation_token)
  where guest_confirmation_token is not null;

comment on column public.content_feedback.guest_email is
  'Set only when author_id is null — a signed-out reader''s self-reported email, captured '
  'so the curriculum owner can follow up. Never verified beyond format + the confirmation '
  'click below; this is a "leave your email so we can reach you", not an identity check.';
comment on column public.content_feedback.guest_confirmed_at is
  'Null until the guest clicks the emailed confirmation link (confirm_guest_feedback() '
  'below). The row is visible to the admin queue either way (is_admin() SELECT policy, '
  'unchanged) — this column is a triage signal, not a visibility gate, so nothing a guest '
  'wrote is ever silently lost to a missed or undelivered email.';

-- Extends 0034's stamp_content_feedback_author_role() (create-or-replace, the same function
-- — editing an already-applied migration file is never done, but re-defining the function it
-- created is exactly what create-or-replace is for) to cover the one case it didn't: no
-- profile at all. A guest insert has no auth.uid() to look up, so the original SELECT would
-- have left author_role null, violating its NOT NULL constraint — this is a supersede, not a
-- narrowing: every case the previous version handled is still handled identically.
create or replace function public.stamp_content_feedback_author_role()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  caller_role public.user_role;
begin
  if new.author_id is null then
    new.author_role := 'guest';
    return new;
  end if;

  select p.role
    into caller_role
  from public.profiles p
  where p.auth_user_id = auth.uid()
  limit 1;

  new.author_role := caller_role::text;

  return new;
end;
$$;

-- SECURITY DEFINER so an anonymous caller (who cannot otherwise write to this table at all —
-- see the file-level comment) can flip exactly one column, on exactly one row, and only when
-- they present the token that row's own confirmation email carried. Returns false rather than
-- raising for "wrong/already-used token" — an confirm page distinguishing "invalid link" from
-- "already confirmed" needs the caller to tell those apart itself (it can't, from a boolean —
-- documented as a known simplification in the confirm page's own comment, not a gap here).
create or replace function public.confirm_guest_feedback(p_token uuid)
returns boolean
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  updated_count int;
begin
  update public.content_feedback
  set guest_confirmed_at = now()
  where guest_confirmation_token = p_token
    and guest_confirmed_at is null;
  get diagnostics updated_count = row_count;
  return updated_count > 0;
end;
$$;

comment on function public.confirm_guest_feedback(uuid) is
  'Anon-callable (see grant below). The token is the sole credential — anyone who did not '
  'receive the confirmation email cannot guess a random uuid, and this only ever confirms '
  'the one row that token belongs to, never any other. Idempotent-safe: a second call with '
  'the same token returns false (guest_confirmed_at is already non-null) rather than erroring.';

grant execute on function public.confirm_guest_feedback(uuid) to anon, authenticated;
