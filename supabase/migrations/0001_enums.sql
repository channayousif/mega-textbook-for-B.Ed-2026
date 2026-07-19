-- 0001_enums.sql — Spec 002 (Authentication & Roles)
-- Enum types backing profiles.role, profiles.status, and privilege_audit.change_type.
-- See specs/002-authentication/data-model.md.
--
-- Migration order matters: enums must exist before the tables that use them.

-- Roles (Constitution Art. V.3). `student` and `teacher` are self-selectable at
-- SIGN-UP ONLY; `admin` is never self-selectable and is seeded or granted by an
-- existing admin. Enforcement lives in 0007 (allowlist) and 0008 (guard trigger),
-- not here — an enum constrains the value space, not who may write it.
create type public.user_role as enum ('student', 'teacher', 'admin');

-- Account lifecycle (FR-020). A suspended account retains all data and can be
-- reinstated; deletion is represented by profiles.deleted_at, not by this enum.
create type public.account_status as enum ('active', 'suspended');

-- What a privilege_audit row records (FR-018).
create type public.audit_change as enum ('role', 'verified_teacher', 'status');
