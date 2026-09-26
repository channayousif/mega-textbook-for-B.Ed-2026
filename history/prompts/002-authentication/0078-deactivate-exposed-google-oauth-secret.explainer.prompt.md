---
id: 0078
title: Deactivate exposed Google OAuth secret
stage: explainer
date: 2026-09-26
surface: agent
model: gpt-6
feature: 002-authentication
branch: 024-licence-topic-design
user: channayousif@gmail.com
command: oauth-secret-rotation-guidance
labels: ["security", "google-oauth", "secret-rotation"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: history/adr/0006-self-hosted-supabase-backend.md
  pr: null
files:
 - history/prompts/002-authentication/0078-deactivate-exposed-google-oauth-secret.explainer.prompt.md
tests:
 - "Google's current OAuth secret rotation instructions checked"
 - "Earlier session verified the new secret matches the running GoTrue configuration"
---

## Prompt

should i deactivate the old secret in google cloud console?

## Response snapshot

Yes. Disable the exposed old secret under the existing OAuth client in Google Cloud Console, test a real Google sign-in with the replacement already deployed, and delete the disabled old secret once sign-in succeeds. Do not delete the OAuth client itself. Google's rotation guidance permits a new secret and an old secret on the same client, then directs disabling and deleting the old secret. Source: https://support.google.com/googleapi/answer/6158849?hl=en

## Outcome

- ✅ Impact: Gave a concrete sequence for retiring the compromised secret.
- 🧪 Tests: Verified Google's current rotation steps from the official API Console Help page.
- 📁 Files: This prompt-history record only.
- 🔁 Next prompts: Owner disables the old secret in Google Cloud Console, tests a real login, then deletes the disabled secret.
- 🧠 Reflection: A protocol redirect does not prove a completed sign-in; test the callback after disabling the old secret.

## Evaluation notes (flywheel)

- Failure modes observed: The exposed old secret may remain usable until disabled.
- Graders run and results (PASS/FAIL): PASS: official Google source supports disable then delete.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Complete one real Google sign-in after old-secret deactivation.
