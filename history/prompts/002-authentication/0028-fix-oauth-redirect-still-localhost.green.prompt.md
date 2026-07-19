---
id: 0028
title: Fix Google OAuth redirect landing on localhost
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 002-authentication
branch: main
user: channayousif@gmail.com
command: null
labels: ["oauth", "gotrue", "infra", "production-bug"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - /home/a2ahs/supabase-project/.env (SITE_URL, ADDITIONAL_REDIRECT_URLS — outside the git repo)
tests:
 - "PASS: curl GET /auth/v1/authorize?provider=google&redirect_to=https://www.a2ahs.com/... returns 302 to Google with redirect_to preserved (previously would have been rejected/silently substituted)"
 - "supabase-auth container recreated (docker compose up -d auth, not restart) and confirmed healthy"
---

## Prompt

http://localhost:3000/?code=bbece6ba-2f10-49d1-b82e-d8869a024657 this link is not redirecting in live after ckicking on create with google

## Response snapshot

Checked the client code first (`login.tsx`/`signup.tsx`'s `signInWithOAuth` call, `authRedirect.ts`)
— confirmed it already builds `redirectTo` dynamically from `window.location.origin`, not a
hardcoded value, so the bug had to be server-side (GoTrue), not app code.

Checked the self-hosted stack's `.env` (`/home/a2ahs/supabase-project/.env`, outside this git
repo): `SITE_URL=http://localhost:3000` (still the dev default) and
`ADDITIONAL_REDIRECT_URLS=` (empty — the `GOTRUE_URI_ALLOW_LIST` docker-compose maps this to).
This is the same class of gap as an earlier session's `SUPABASE_PUBLIC_URL`/`API_EXTERNAL_URL`
fix — those two got corrected then, but `SITE_URL`/`ADDITIONAL_REDIRECT_URLS` were a separate
pair of variables that never got updated, despite `quickstart.md` already documenting the
intended values. GoTrue's allow-list rejects any `redirect_to` that isn't in
`GOTRUE_URI_ALLOW_LIST` and silently falls back to `SITE_URL` instead — exactly producing
`http://localhost:3000/?code=...` (bare origin, no path, no `next` param) rather than an error.

Verified the format via Context7 (`/supabase/auth`) rather than assuming: comma-separated,
glob-pattern support, confirming the `http://localhost:3000/**,https://www.a2ahs.com/**` format
already used elsewhere in this project's docs is correct.

Fixed: `SITE_URL=https://www.a2ahs.com`, `ADDITIONAL_REDIRECT_URLS=http://localhost:3000/**,https://www.a2ahs.com/**`.
Recreated (not restarted) the `auth` container — env vars are substituted at container creation,
a plain restart reuses old values (same fact documented in `quickstart.md` from the original
stand-up). Verified live: a real `GET /auth/v1/authorize?provider=google&redirect_to=https://www.a2ahs.com/...`
now returns a clean `302` to Google with the production `redirect_to` threaded straight through
in the URL, rather than being rejected.

## Outcome

- ✅ Impact: Google sign-in/sign-up on the live site will now land the user back on
  `www.a2ahs.com`, not `localhost:3000` — closes a completely broken OAuth flow on production.
- 🧪 Tests: live `curl` check against the real `authorize` endpoint confirms the allow-list now
  accepts the production redirect target; `supabase-auth` container confirmed healthy after
  recreation.
- 📁 Files: `/home/a2ahs/supabase-project/.env` only — infrastructure config outside this git
  repo, no code change, no PR.
- 🔁 Next prompts: none required; this closes the report. Worth a mental note that any future
  fresh self-hosted stand-up should double check `SITE_URL`/`ADDITIONAL_REDIRECT_URLS` against
  `quickstart.md`'s documented values before going live — this is the second variable pair in
  this category to have been missed once already.
- 🧠 Reflection: same pattern as the dotenv gap from immediately before this — a config value
  that was *documented* as needed (quickstart.md already said to set this) but never actually
  *applied* to the live `.env`. Documentation existing is not the same as verifying the live
  system matches it.

## Evaluation notes (flywheel)

- Failure modes observed: a previously-fixed class of bug (stale localhost default in
  self-hosted config) recurred in a sibling variable pair that wasn't touched during the earlier
  fix — fixing one instance of a pattern doesn't guarantee the whole category was checked.
- Graders run and results (PASS/FAIL): live `authorize` endpoint check PASS; container health
  check PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when a self-hosted config value is fixed once
  (e.g. `API_EXTERNAL_URL`), grep the same `.env` file for every other `localhost`/dev-default
  value in one pass, rather than fixing only the specific variable that was reported broken.
