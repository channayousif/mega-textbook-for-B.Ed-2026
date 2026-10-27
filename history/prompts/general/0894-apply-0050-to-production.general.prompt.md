---
id: 0894
title: Apply migration 0050 to production
stage: general
date: 2026-10-28
surface: agent
model: claude-opus-5-5
feature: none
branch: feat/g3-signoff-desk
user: M Yousif Channa
command: (board-direct) apply supabase/migrations/0050_g3_signoffs.sql to the self-hosted production Supabase
labels: ["board-direct", "production", "supabase", "migration", "g3"]
links:
  spec: specs/017-reviewer-role/spec.md
  ticket: null
  adr: history/adr/0032-g3-signoff-intent-ledger.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/345
files:
 - supabase/migrations/0050_g3_signoffs.sql (anon revoke added to match production)
tests:
 - dependency check (is_admin(uuid default auth.uid()), current_profile_id(), admin_action_history, profiles)
 - post-apply catalogue check (RLS on, one admin SELECT policy, grants, function privileges, trigger, 0 rows)
---

## Prompt

Apply 0050 to production.

## Response snapshot

- **Apply:** I confirmed that the local `0050_g3_signoffs.sql` matched PR #345, then applied it to `supabase-db` with `psql --single-transaction -v ON_ERROR_STOP=1`. It exited 0. This host has no migration-tracking table; migrations are applied by hand.
- **Live check:**
  - RLS is on, and the only policy is `g3_signoff_read` (SELECT).
  - `authenticated` has SELECT only.
  - `mark_g3_signoff_synced` can be executed by `service_role` only.
  - The trigger `g3_signoff_validate` is present, and the table has 0 rows.
- **Gap found and closed:** Supabase's default privileges had also given `anon` EXECUTE on `record_g3_signoff` and `withdraw_g3_signoff`. Both refuse non-admins, so this was never exploitable. I revoked it on production and added `anon` to the migration's revoke lines so the file and the live database agree.
- **PostgREST:** I sent `NOTIFY pgrst, 'reload schema'` so the new table and functions are served.

## Outcome

- ✅ Impact: the G3 sign-off ledger exists on production; #345's `rls` and `e2e` jobs can now pass.
- 🧪 Tests: listed above. CI re-runs on the push.
- 📁 Files: the migration file (two revoke lines).
- 🔁 Next prompts: the owner merges #345 and creates `~/.crew/mega-book/signoff.env` to enable the crew sync.
- 🧠 Reflection: Supabase default privileges grant function EXECUTE to `anon` as well as table rights; `revoke ... from public` alone does not remove it.

## Handoff (for CEO and agents)

- Shipped / changed: `g3_signoffs` plus 3 RPCs and 1 trigger on production. The table is empty.
- Decisions the team must respect:
  - Rollback is `drop table public.g3_signoffs cascade; drop function public.record_g3_signoff(jsonb), public.withdraw_g3_signoff(uuid), public.mark_g3_signoff_synced(uuid,text,text,text), public.validate_g3_signoff();`
  - Do not run it once decisions exist without exporting them first.
- Pending / next owner:
  - Owner: merge #345.
  - Owner: add `signoff.env`.
  - Migration 0049 (`page_feedback`) is also unapplied on production, which I found in passing. I did not touch it.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: `anon` EXECUTE leaked through default privileges, and the rolled-back test did not check it.
- Graders run and results (PASS/FAIL): post-apply catalogue check PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): an RLS test asserting that `anon` cannot call any `security definer` RPC.
