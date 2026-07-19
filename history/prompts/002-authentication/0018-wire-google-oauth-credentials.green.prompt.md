---
id: 0018
title: Wire Google OAuth credentials into GoTrue
stage: green
date: 2026-07-18
surface: agent
model: claude-sonnet-5
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: null
labels: ["google-oauth", "gotrue", "docker-compose", "t063"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: history/adr/0006-self-hosted-supabase-backend.md
  pr: null
files:
 - specs/002-authentication/tasks.md
 - "/home/a2ahs/supabase-project/.env (outside repo — GOOGLE_*, SUPABASE_PUBLIC_URL, API_EXTERNAL_URL)"
 - "/home/a2ahs/supabase-project/docker-compose.yml (outside repo — uncommented GOTRUE_EXTERNAL_GOOGLE_* block)"
tests:
 - "PASS: GET /auth/v1/settings -> external.google: true"
 - "PASS: GET /auth/v1/authorize?provider=google -> 302 to accounts.google.com carrying the exact registered client_id and redirect_uri (decoded and checked, not assumed from the settings flag alone)"
---

## Prompt

set up Google Cloud OAuth credentials

[account-creation declined again — no browser/identity capability; verified the exact redirect
URI shape via Context7 against both Supabase's self-hosting docs and the actual
`docker-compose.yml` before giving instructions, rather than assuming the pattern]

Client ID 166784146133-hs1q359dkahcl9nerrprs0o2kj1qrihv.apps.googleusercontent.com
Client secret [REDACTED: compromised OAuth credential rotated outside this repository]

## Response snapshot

Before writing instructions, checked `docker-compose.yml`'s commented-out Google block directly
(`GOTRUE_EXTERNAL_GOOGLE_REDIRECT_URI: ${API_EXTERNAL_URL}/callback`) and cross-verified against
Supabase's self-hosting OAuth docs via Context7 — both agreed, so the redirect URI given to the
user (`https://api.a2ahs.com/auth/v1/callback`) was derived from two independent sources, not
assumed from memory of a generic OAuth pattern.

On receiving the real credentials: uncommented the four `GOTRUE_EXTERNAL_GOOGLE_*` lines in
`docker-compose.yml` (they ship commented out by default), then discovered while updating `.env`
that `SUPABASE_PUBLIC_URL` and `API_EXTERNAL_URL` were still their initial `localhost` defaults
from PHR 0014's stack setup — meaning `${API_EXTERNAL_URL}/callback` would have computed to a
`localhost` redirect URI, silently mismatching what was just registered in Google Cloud Console.
Updated both to the real `https://api.a2ahs.com` values as part of the same change, rather than
leaving that latent mismatch to surface later as a confusing OAuth failure.

Wrote the client ID/secret into `.env` via the same not-echoed-to-terminal Python-script pattern
used for the Resend key (PHR 0017), then ran `docker compose up -d` for the whole stack rather
than targeting `auth` alone — reasoning that `SUPABASE_PUBLIC_URL`/`API_EXTERNAL_URL` are plausibly
read by more than one service (studio, storage), and compose's own diffing would only recreate
what actually changed. It recreated `auth`, `storage`, `studio`, and `edge-functions` — confirming
the broader-scope command was the right call, not overcautious.

Verified two ways, not one: GoTrue's `/settings` endpoint reporting `external.google: true` proves
the config loaded, but doesn't prove the *specific* client_id/redirect_uri are correct — a typo in
either would still show `true`. So also hit `/authorize?provider=google` directly, captured the
actual `302 Location` header, and decoded it to confirm the literal `client_id` and `redirect_uri`
query params match what's registered in Google Cloud Console, character for character. Explicitly
did not claim T063 (the full consent-screen click-through) as done — that step requires a real
browser and the user's own Google account, which cannot be scripted or verified without a human
in the loop, unlike everything else in this wiring.

## Outcome

- ✅ Impact: Google OAuth is fully configured and provably correct at the protocol level — GoTrue advertises it, and the exact redirect Google would receive matches the registered app. Only the interactive consent click-through remains.
- 🧪 Tests: `/settings` PASS (provider enabled); `/authorize` redirect PASS (client_id + redirect_uri decoded and matched exactly, not inferred).
- 📁 Files: 1 repo doc updated (tasks.md); 2 files updated outside the repo (`.env` secrets, `docker-compose.yml` uncommented block).
- 🔁 Next prompts: T063 — the user (or a teammate) actually clicking "Continue with Google" once, on a real device, to close the loop this session's automation cannot reach. After that, US1's full acceptance criteria (all of tasks.md Phase 3) would be genuinely, fully proven.
- 🧠 Reflection: catching the stale `localhost` `API_EXTERNAL_URL`/`SUPABASE_PUBLIC_URL` before it caused a silent redirect_uri mismatch is the same category of find as the Kong-port and mail-catcher issues earlier — a config value that was correct *when set* (during initial stack bring-up, before any public domain existed) but became wrong once circumstances changed, and nothing would have errored loudly; it would have just made Google's OAuth screen reject the request with a redirect_uri_mismatch that doesn't obviously point back to this env var.

## Evaluation notes (flywheel)

- Failure modes observed: none this turn — the stale-URL catch happened before it caused a failure, unlike several earlier findings in this session that were caught by symptom (526, 500, 403) rather than by inspection first. Worth noting as the more expensive lesson from those earlier incidents actually generalizing: check env values for staleness before wiring in something new that depends on them, rather than waiting for the failure.
- Graders run and results (PASS/FAIL): `/settings` PASS; `/authorize` redirect decode PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when any `.env`-driven public URL is set during initial infrastructure bring-up (before a real domain/cert exists), flag it explicitly as "will need updating once DNS/TLS is live" at the time it's set, rather than discovering the staleness incidentally days or steps later while wiring in something unrelated.
