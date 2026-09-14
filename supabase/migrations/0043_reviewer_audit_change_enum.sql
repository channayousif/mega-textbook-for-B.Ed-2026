-- 0043_reviewer_audit_change_enum.sql - Spec 017 (The reviewer role)
-- The `audit_change` enum gains 'reviewer' (FR-001), and nothing else.
--
-- WHY THIS IS ALONE IN ITS OWN FILE, and must stay that way:
-- PostgreSQL permits `alter type ... add value` inside a transaction but
-- forbids USING the new value in that same transaction. The Supabase CLI runs
-- each migration file in one transaction. 0044 defines write_privilege_audit()
-- with a body that inserts 'reviewer', and its tests exercise that path
-- immediately afterwards, so this value has to land and commit first.
--
-- Merging this statement into 0044 will appear to work until the first grant,
-- which is the worst possible time to discover it (research.md R6).

alter type public.audit_change add value 'reviewer';
