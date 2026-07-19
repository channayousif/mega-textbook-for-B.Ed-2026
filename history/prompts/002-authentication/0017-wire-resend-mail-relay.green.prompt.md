---
id: 0017
title: Wire Resend mail relay into GoTrue
stage: green
date: 2026-07-18
surface: agent
model: claude-sonnet-5
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: null
labels: ["resend", "smtp", "gotrue", "mail-relay", "dns", "adr-0006"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: history/adr/0006-self-hosted-supabase-backend.md
  pr: null
files:
 - history/adr/0006-self-hosted-supabase-backend.md
 - specs/002-authentication/tasks.md
 - "/home/a2ahs/supabase-project/.env (outside repo — SMTP_* vars, API key)"
tests:
 - "PASS: direct Resend API send (noreply@edu.a2ahs.com -> delivered@resend.dev) returned a message ID"
 - "PASS: real signUp() through GoTrue -> 200, ~650ms SMTP round-trip, no error in auth logs"
---

## Prompt

set up the Resend account and give me the API key steps

[account-creation itself declined — no browser/identity capability — steps given instead,
recommending a dedicated subdomain over the apex to avoid an SPF/DKIM collision with the
existing mail.a2ahs.com inbox]

re_gvmyD79t_HuWC1FMv5WfQM67615iWk142
[a live API key, pasted directly — not echoed back in any response]

it's showing verified now
[in response to a first verification attempt that 403'd]

the domain i created was edu.a2ahs.com, check for that again
[correcting my suggested subdomain name — user chose their own]

## Response snapshot

Declined to create the Resend account myself (needs the user's email/identity and ToS
agreement), but verified Resend's actual SMTP integration shape via Context7 before giving
instructions — host, port, username literally `resend`, password = API key — rather than
assuming a REST-API-key pattern that wouldn't match GoTrue's SMTP-based self-hosted config.
Checked `a2ahs.com`'s existing DNS first (`dig TXT/MX`) and found no existing SPF record, so no
collision risk today, but recommended a dedicated subdomain anyway as standard practice, keeping
transactional auth mail isolated from the real `mail.a2ahs.com` inbox regardless of what that
side's DNS ever needs later.

When the pasted key first failed domain-verification checks (`403: not authorized to send from
send.a2ahs.com`), diagnosed rather than assumed: the initial `401 restricted_api_key` on
`/domains` actually *confirmed* the key was correctly least-privilege-scoped (sending-access
only, can't list domains) — a good sign, not a problem. The subsequent `403` on an actual send
attempt was the real signal. After the user reported "verified now," re-tested directly rather
than trusting the label (same discipline as the earlier nginx "done that, it works" gap) — still
403'd. Diagnosed via Context7 (Resend's own docs on domain-scoped API keys) that a
`sending_access` key can be locked to a specific `domain_id` at creation time; this key had
almost certainly been created before `send.a2ahs.com` existed/verified, so it was pinned to the
wrong domain (or none). Also caught mid-diagnosis that the user had actually verified a
*different* subdomain (`edu.a2ahs.com`) than the one recommended — adjusted immediately rather
than insisting on the original suggestion.

Verified the corrected combination directly against Resend's API (not GoTrue) first — a real
send from `noreply@edu.a2ahs.com` returned a message ID — before touching any config, so the
domain+key pairing was proven independently of the self-hosted stack. Wrote the SMTP_* vars into
`~/supabase-project/.env` via a small Python script (avoids the key ever appearing in a shell
history line or being echoed to a terminal), confirmed presence without printing the value, then
recreated (not just restarted) the `auth` container — noted explicitly that `docker compose
restart` reuses already-substituted env values from container creation time, so a config-only
`.env` change requires `up -d` to actually take effect, a mistake worth flagging since it would
otherwise look like nothing changed.

Verified the real path twice, independently: a live `signUp()` through GoTrue itself (not the
admin-API bypass that let the earlier `supabase-mail` bug hide) returned `200` with a ~650ms
duration — consistent with a genuine synchronous SMTP handshake, not the near-instant response a
broken/local path would give — and GoTrue's own audit log showed no error. Attempted a third
cross-check via Resend's own send-log API and confirmed it correctly refused (`401`, sending-only
key), which is itself further confirmation the key's scope is exactly as intended. Cleaned up all
throwaway test users created during verification via the admin API afterward.

## Outcome

- ✅ Impact: ADR-0006's mail relay requirement — flagged as a binding requirement since the ADR was first written, then "confirmed severe" by the T025 signup bug — is now genuinely satisfied. Real users signing up will receive real confirmation email, not a local test-catcher artifact.
- 🧪 Tests: direct Resend send PASS (message ID returned); live GoTrue signup PASS (200, realistic SMTP timing, no error). Not independently confirmed by reading an actual received inbox — the two checks above are the strongest verification available without one.
- 📁 Files: 2 repo docs updated (ADR-0006, tasks.md); 1 secret written outside the repo (`~/supabase-project/.env`, never committed, never echoed in any response).
- 🔁 Next prompts: T063 remains the last open item — Google Cloud OAuth credentials, which only the user can create, the same category of blocker as this one was.
- 🧠 Reflection: the domain-scoped-API-key trap (a key created before its domain finishes verifying stays pinned to whatever domain it saw at creation) is the kind of platform-specific gotcha that "the domain shows verified in the dashboard" gives no signal about — only re-testing the actual send operation surfaced it. Consistent with this session's repeated pattern: a status label and a working system are different claims, and only the latter is worth trusting.

## Evaluation notes (flywheel)

- Failure modes observed: (a) recommending a specific subdomain name (`send.a2ahs.com`) that the user didn't actually use, requiring one round-trip to correct rather than deriving the answer from the user's own name choice on the first pass — a minor real-world planning/execution mismatch, not a system bug; (b) once again, a "success" report from the user (domain "verified") wasn't sufficient to act on without independent re-verification, the same lesson as PHR 0015's nginx gap.
- Graders run and results (PASS/FAIL): direct Resend API send PASS; live GoTrue signup PASS (200, no error, realistic latency).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when giving setup instructions that involve the user naming a resource (a subdomain, a project name, a key name), explicitly ask them to report back the exact name they used rather than assuming they'll follow the suggested one verbatim — would have saved the one extra round-trip here.
