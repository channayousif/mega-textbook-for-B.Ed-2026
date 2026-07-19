-- 0003_privilege_audit.sql — Spec 002 (Authentication & Roles)
-- Append-only record of privileged changes (FR-018, FR-019).
--
-- This table is the compensating control for removing the teacher-approval
-- workflow (ADR-0005): the answer-key gate is only as trustworthy as our ability
-- to answer "who granted this, and when?" after the fact.
--
-- Integrity model:
--   * rows are written ONLY by the 0009 trigger, never by a client
--   * actor_id comes from auth.uid() inside that trigger, so attribution
--     cannot be spoofed by client-supplied input
--   * no UPDATE/DELETE policy is ever created, so RLS denies both by default

create table public.privilege_audit (
  id bigint primary key generated always as identity,

  -- References profiles, NOT auth.users, so audit history survives account
  -- deletion (the profile tombstone persists) — FR-021 interaction.
  subject_id uuid not null references public.profiles (id) on delete cascade,

  -- The admin who made the change. Nullable only for system/seed actions
  -- where there is no authenticated caller (e.g. the initial admin seed).
  actor_id uuid references public.profiles (id) on delete set null,

  change_type public.audit_change not null,
  old_value text,
  new_value text not null,
  created_at timestamptz not null default now()
);

comment on table public.privilege_audit is
  'FR-018/FR-019 — append-only audit of role, verified_teacher, and status changes. '
  'Written exclusively by the write_privilege_audit trigger; no client INSERT/UPDATE/DELETE policy exists.';

comment on column public.privilege_audit.actor_id is
  'Set from auth.uid() server-side in the trigger. Never accepted from client input (FR-018).';

-- SC-008: "an administrator can reconstruct who granted answer-key access to any
-- given account and when" — this index serves exactly that query.
create index privilege_audit_subject_created_idx
  on public.privilege_audit (subject_id, created_at desc);

-- Secondary: "what has this admin changed?" for reviewing a specific actor.
create index privilege_audit_actor_created_idx
  on public.privilege_audit (actor_id, created_at desc);
