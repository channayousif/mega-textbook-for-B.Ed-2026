---
id: 0076
title: Activate rotated Google OAuth secret
stage: green
date: 2026-09-26
surface: agent
model: gpt-5
feature: 002-authentication
branch: 024-licence-topic-design
user: channayousif@gmail.com
command: oauth-secret-rotation
labels: ["security", "google-oauth", "secret-rotation"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: history/adr/0006-self-hosted-supabase-backend.md
  pr: null
files:
 - .env.example
 - supabase/config.toml
 - history/prompts/002-authentication/0076-activate-rotated-google-oauth-secret.green.prompt.md
tests:
 - "PASS: replacement secret is present in ignored .env.local"
 - "PASS: self-hosted GOOGLE_SECRET exactly matches the replacement without outputting either value"
 - "PASS: GoTrue auth container is healthy and Google provider is enabled"
 - "PASS: Google OAuth authorization endpoint redirects to accounts.google.com"
---

## Prompt

use new secret in place of old exposed one as GOOGLE_CLOUD_OAUTH_SECRET set in env.local

## Response snapshot

Used the existing ignored `GOOGLE_CLOUD_OAUTH_SECRET` value without printing it. Updated the local Supabase configuration to reference that variable, copied it into the self-hosted GoTrue `GOOGLE_SECRET` runtime variable, and recreated only the auth service.

## Outcome

- ✅ Impact: The running Google OAuth provider uses the replacement secret.
- 🧪 Tests: The replacement matched the deployed GoTrue value; auth was healthy; settings reported Google enabled; authorize returned a Google redirect.
- 📁 Files: Updated the tracked local-environment variable reference and its example, plus this remediation record. The ignored `.env.local` and external self-hosted runtime environment were updated without being committed.
- 🔁 Next prompts: Revoke the compromised credential in Google Cloud Console, if it has not already been revoked, and complete one real Google sign-in smoke test.
- 🧠 Reflection: Keep OAuth secrets in ignored runtime environments only, never in source files or prompt-history records.

## Evaluation notes (flywheel)

- Failure modes observed: The original GoTrue configuration referenced a differently named environment variable.
- Graders run and results (PASS/FAIL): PASS: replacement match; PASS: health; PASS: provider enabled; PASS: authorization redirect.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Add secret scanning before commits and in CI.

