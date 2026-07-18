-- 0005_profiles_policies.sql — Spec 002 (Authentication & Roles)
-- Row-Level Security for public.profiles.
--
-- Authorization lives here, not in the UI (Constitution Art. IX.2). The client
-- ships the anon key; these policies are the only thing standing between a
-- crafted request and someone else's data.
--
-- Denial shapes are deliberately different (contracts/auth-operations.md §B):
--   * READS of other users' rows return ZERO ROWS (silent filter, no existence disclosure)
--   * WRITES to privileged columns RAISE (0008 trigger) so the caller cannot
--     believe a change succeeded when it did not

alter table public.profiles enable row level security;

-- FR-016 — a user may read their own row. Tombstones are unreadable.
create policy profiles_select_own
  on public.profiles
  for select
  to authenticated
  using (
    auth_user_id = auth.uid()
    and deleted_at is null
  );

-- FR-007 / FR-015 — an active admin may read every row, including tombstones
-- (needed for the audit trail to remain interpretable after deletion).
create policy profiles_select_admin
  on public.profiles
  for select
  to authenticated
  using (public.is_admin());

-- FR-010 — a user may update their OWN row. Which COLUMNS they may change is
-- NOT expressible here: RLS gates rows, not columns. The 0008 BEFORE UPDATE
-- trigger rejects any change to role / verified_teacher / status from a
-- non-admin. Policy + trigger together implement FR-006 and FR-010a.
create policy profiles_update_own
  on public.profiles
  for update
  to authenticated
  using (
    auth_user_id = auth.uid()
    and status = 'active'          -- FR-020: suspended users cannot write
    and deleted_at is null
  )
  with check (
    auth_user_id = auth.uid()
    and deleted_at is null
  );

-- FR-007 — an admin may update any row (role, verified_teacher, status).
-- Every such change is audited by the 0009 trigger.
create policy profiles_update_admin
  on public.profiles
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- No INSERT policy: rows are created solely by the 0007 SECURITY DEFINER trigger
-- on auth.users. A client cannot fabricate a profile.
--
-- No DELETE policy: deletion is performed by the delete-account Edge Function
-- using the service role, which strips identity and leaves a tombstone (FR-021).
-- A client DELETE would destroy the row Spec 003 depends on, so it is denied.

grant select, update on public.profiles to authenticated;
