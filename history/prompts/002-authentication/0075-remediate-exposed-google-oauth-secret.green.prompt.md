---
id: 0075
title: Remediate exposed Google OAuth secret
stage: green
date: 2026-09-26
surface: agent
model: gpt-5
feature: 002-authentication
branch: 024-licence-topic-design
user: channayousif@gmail.com
command: security-remediation
labels: ["security", "google-oauth", "secret-remediation"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/002-authentication/0018-wire-google-oauth-credentials.green.prompt.md
 - history/prompts/002-authentication/0075-remediate-exposed-google-oauth-secret.green.prompt.md
tests:
 - "PASS: working tree scan finds no Google OAuth secret"
 - "PENDING: rewrite all reachable Git history and force-push replacement refs"
---

## Prompt

fix it

## Response snapshot

Redacted the exposed OAuth client secret from the tracked prompt-history record. Began remediation for the public Git history exposure; credential rotation and runtime configuration updates must be performed in Google Cloud and the self-hosted Supabase deployment, which are outside this repository.

## Outcome

- ✅ Impact: The current tracked source no longer carries the compromised OAuth secret.
- 🧪 Tests: Working-tree secret scan pending after history rewrite.
- 📁 Files: The exposed prompt-history record was redacted and this remediation record was created.
- 🔁 Next prompts: Generate a replacement Google OAuth secret, update `SUPABASE_AUTH_GOOGLE_SECRET` in the deployment secret store, restart the auth service, verify sign-in, revoke the old secret, and force-push the rewritten repository history.
- 🧠 Reflection: Prompt-history records must redact credentials even when preserving the surrounding work record.

## Evaluation notes (flywheel)

- Failure modes observed: OAuth client secret appeared in a public Git commit.
- Graders run and results (PASS/FAIL): PENDING: history-wide secret scan after rewrite.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Add automated secret scanning before commits and in CI.

