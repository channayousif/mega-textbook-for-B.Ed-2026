-- 0006_audit_policies.sql — Spec 002 (Authentication & Roles)
-- Row-Level Security for public.privilege_audit (FR-019).
--
-- The immutability guarantee here is structural, not a rule someone must
-- remember to follow: with RLS enabled, a command with NO permissive policy is
-- refused. We create exactly one policy — SELECT for admins — and therefore
-- INSERT, UPDATE, and DELETE are denied to every client role, permanently.
--
-- Writing "deny" policies would be weaker and easy to accidentally override.

alter table public.privilege_audit enable row level security;

-- FR-019 — admins may read the audit history. Nobody else can see it at all
-- (a non-admin SELECT returns zero rows rather than an error).
create policy privilege_audit_select_admin
  on public.privilege_audit
  for select
  to authenticated
  using (public.is_admin());

-- Intentionally absent:
--   * INSERT — rows come only from the 0009 SECURITY DEFINER trigger, so a
--     privilege change can never occur without its audit row, and an audit row
--     can never be forged without a corresponding change.
--   * UPDATE — an audit trail that can be edited is not an audit trail.
--   * DELETE — likewise.
--
-- Do NOT add these later without amending the spec: FR-019 states the entries
-- "MUST NOT be edited or deleted through the application".

grant select on public.privilege_audit to authenticated;
revoke insert, update, delete on public.privilege_audit from authenticated, anon;
