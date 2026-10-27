---
id: 0896
title: Page feedback hardening migration
stage: general
date: 2026-10-28
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/page-feedback-hardening
user: M Yousif Channa
command: (board-direct) add the page_feedback follow-up migration
labels: ["board-direct", "supabase", "migration", "security", "feedback"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - supabase/migrations/0051_page_feedback_hardening.sql
 - tests/rls/page-feedback.test.mjs
tests:
 - 0051 dry run on the production DB inside a rolled-back transaction (valid anon insert ok; 501-char comment rejected; anon SELECT and UPDATE denied; nothing left behind)
 - tests/rls/page-feedback.test.mjs (runs in CI once 0051 is applied)
---

## Prompt

add the page_feedback follow-up migration

## Response snapshot

Migration `0051_page_feedback_hardening.sql` hardens 0049:
- **Check constraints:** `page_path` must start with `/` and be at most 300 characters; `comment` must be 1 to 500 characters or null (the widget caps it at 250); `locale` must be `en` or `ur`.
- **Index:** on `created_at`.
- **Flood brake:** a trigger that refuses inserts beyond 60 per minute across the whole table. This needs no per-client key, so no IP is stored.
- **Admin read:** a SELECT policy using `is_admin()`.
- **Grants:** all default grants are revoked. `anon` and `authenticated` keep INSERT; `authenticated` keeps SELECT, which RLS limits to admins. No client role can UPDATE, DELETE or TRUNCATE.

The widget needs no change: it does a plain insert with no read-back. The RLS test covers bounded inserts, admin-only reads, and that no client can update or delete.

## Outcome

- ✅ Impact: anonymous feedback can no longer be used to dump unbounded text, and admins can read feedback through the app.
- 🧪 Tests: the dry run passed; the RLS test needs 0051 applied before CI's `rls` job passes.
- 📁 Files: listed above.
- 🔁 Next prompts: the owner approves applying 0051 to production, then merges the PR.
- 🧠 Reflection: a table-wide brake is crude. Per-client limits would need a hashed client key, which is a privacy trade-off.

## Handoff (for CEO and agents)

- Shipped / changed: migration 0051 and its RLS test, in a PR.
- Decisions the team must respect:
  - `page_feedback` holds no IP or client identifier.
  - Rate limiting is table-wide by design.
- Pending / next owner: Owner: apply 0051 on production before CI's `rls` job can pass on this PR.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: 0049 shipped with unbounded public inserts and no read path.
- Graders run and results (PASS/FAIL): rolled-back dry run PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): a CI check that each new public table revokes Supabase's default grants.
