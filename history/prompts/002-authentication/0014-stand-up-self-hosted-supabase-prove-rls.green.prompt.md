---
id: 0014
title: Stand up self-hosted Supabase, prove RLS
stage: green
date: 2026-07-18
surface: agent
model: claude-sonnet-5
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: null
labels: ["supabase", "docker", "self-hosted", "rls", "migrations", "infrastructure"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: history/adr/0006-self-hosted-supabase-backend.md
  pr: null
files:
 - tests/rls/oauth-role-prompt.test.mjs
 - specs/002-authentication/tasks.md
 - "/home/a2ahs/supabase-project/docker-compose.yml (outside repo — running infra, ADR-0006)"
 - "/home/a2ahs/supabase-project/.env (outside repo, gitignored equivalent — generated secrets)"
 - .env.local (gitignored — not committed)
tests:
 - "PASS: all 9 migrations applied cleanly to a live self-hosted Postgres (first real execution ever)"
 - "PASS: npm run test:rls — 13/13 passing, 1 skipped (identity-linking, deferred to T063) — against the live instance, not skipped-for-lack-of-config"
 - "PASS: npx tsc --noEmit (clean, re-verified after adding the new test)"
---

## Prompt

why supabase is outside of my project directory

(a question, not an instruction — asked after I'd cloned the self-hosted Supabase source into
`~/supabase-project`. Answered inline: it's running infrastructure with generated secrets, not
versioned application code, parallel to `node_modules/` or an installed Postgres binary. Offered
to relocate it under the repo if preferred.)

it ok there

(confirmation to continue in place, not asking me to relocate anything)

## Response snapshot

Stood up the self-hosted Supabase stack end-to-end and, for the first time in this feature, ran
its migrations and RLS suite against a real database instead of describing what should happen.

**Infrastructure** (in `~/supabase-project`, outside the repo, per the conversation above):
cloned `supabase/supabase`'s `docker/` subtree, ran `utils/generate-keys.sh --update-env` (JWT
secret, anon key, service-role key, Postgres password — never printed to output, only existence
verified via `grep -c`). Found a second discrepancy against my own ADR-0006 while inspecting the
actual `docker-compose.yml` (ground truth, not a docs summary this time): Kong publishes **both**
`8000` and `8443` by default in this version, not just `8000` as the earlier Context7/WebFetch
summary implied — `8443` collides with apache2's existing public listener. Fixed by binding both
Kong ports, plus Supavisor's `5432`/`6543`, to `127.0.0.1` only — satisfies ADR-0006's "never
expose Postgres publicly" requirement and sidesteps the collision in one change, since apache2's
`8443` is bound to `10.0.0.150`, not loopback. `docker compose up -d` brought up all 11
containers; confirmed healthy (not just started) after a 20s settle.

**Migrations**: applied all 9 files in order via `docker compose exec db psql`, piped from the
repo's `supabase/migrations/*.sql`. All succeeded cleanly on the first attempt — the 526 lines of
SQL flagged as "entirely unproven" in PHR 0011 and "not executed" in PHR 0012 are now live.

**RLS suite**: wrote `.env.local` from the stack's generated keys (`DOCUSAURUS_SUPABASE_URL=
http://127.0.0.1:8000`, chmod 600), ran `npm run test:rls`. All 10 pre-existing tests passed
against the real instance — not skipped, actually executed.

**Gap found while proving this, closed the same session**: none of those 10 tests touched the
T031 carve-out (the guard-trigger fix from PHR 0012 that makes the one-time OAuth role prompt
possible) — every test signs up with an explicit role, so `role_chosen_at` is always non-null at
insert and the carve-out's `old.role_chosen_at is null` branch never fires. Wrote
`tests/rls/oauth-role-prompt.test.mjs` to close it, and hit a second, smaller bug immediately:
`_helpers.mjs`'s `createUser({role: undefined})` silently becomes `role: 'student'` because JS
destructuring defaults fire on `undefined`, not just on an omitted key — `role: null` is required
to actually simulate "no role metadata" (the real OAuth shape). Confirmed this against the live
trigger with a throwaway `node -e` script before writing the real test, then wrote and ran four
assertions: the OAuth-shaped profile lands with `role_chosen_at=null`; the one-time choice
succeeds; `role='admin'` is rejected even while still null (FR-009 holds under the carve-out,
not just in the general case); a second attempt after the first is rejected (write-once holds).
All four pass.

**tasks.md updated** to reflect reality rather than "written, not run": the Phase 3 checkpoint now
says MVP reached, 13/13 RLS tests passing, and lists what's still actually outstanding —
T025's E2E spec (not yet run against a served site), T063's live Google OAuth check (disabled in
this instance — no Google Cloud credentials configured), and the mail relay ADR-0006 requires
before production (currently on self-hosted Supabase's default local SMTP, which is fine for
service-role-bypassed test fixtures and not for a real user's confirmation email).

## Outcome

- ✅ Impact: User Story 1 (P1 MVP) crossed from "code-complete, unproven" to "code-complete, proven against a live database." This is the first working self-hosted Supabase instance for this project.
- 🧪 Tests: 9/9 migrations applied clean; RLS suite 13/13 passing + 1 documented skip; tsc clean.
- 📁 Files: 1 new test file, 1 spec doc updated in the repo; running infrastructure + secrets live outside the repo by design (`~/supabase-project`), never committed.
- 🔁 Next prompts: run T025's e2e spec against `npm start` + this instance; configure Google Cloud OAuth credentials to unblock T063; set up the Resend/SES mail relay before any real signup; wire nginx → `127.0.0.1:8000` for `api.a2ahs.com` (not done this session — everything above ran over loopback, sufficient for RLS testing but not for the browser-facing app yet).
- 🧠 Reflection: two more findings today came from doing the thing rather than describing it — the 8443 port collision (caught by reading the actual compose file after a docs-summary tool call gave an incomplete answer) and the carve-out coverage gap (caught only by actually trying to write a passing test for it, not by re-reading the trigger SQL, which reads correct in isolation). Both close the same loop as the CASCADE and GoTrue-linking findings from earlier PHRs: this feature's genuine risks live at the seams between independently-reasonable pieces, and only execution finds them.

## Evaluation notes (flywheel)

- Failure modes observed: (a) trusted a WebFetch summary of Kong's self-hosted defaults over inspecting the actual compose file — the summary was incomplete, not fabricated, but still wrong in a way that mattered; (b) wrote a JS destructuring pattern (`role: undefined` intending "omit this") that silently hit a default-parameter trap — an easy mistake to make once, worth remembering the fix (`null`, not `undefined`) if this pattern recurs elsewhere in the harness.
- Graders run and results (PASS/FAIL): migrations 9/9 PASS; RLS suite 13/13 PASS + 1 SKIP (intentional); tsc PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when a docs-fetch tool (WebFetch/Context7) answers a config-default question and the config file is one you're about to write anyway, read the actual file before committing the docs summary to a decision record — the summary is a hint for where to look, not the source of truth itself.
