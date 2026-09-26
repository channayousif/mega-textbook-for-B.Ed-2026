---
id: 0079
title: Explain admin login
stage: explainer
date: 2026-09-26
surface: agent
model: gpt-6
feature: 002-authentication
branch: 024-licence-topic-design
user: channayousif@gmail.com
command: admin-login-guidance
labels: ["authentication", "admin", "login"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/002-authentication/0079-explain-admin-login.explainer.prompt.md
tests:
 - "PASS: live database reports owner's profile as active admin"
 - "PASS: public login and admin overview routes return HTTP 200"
---

## Prompt

how can i login as admin

## Response snapshot

The owner account associated with channayousif@gmail.com is already active and has the admin role in the live database. Use the regular sign-in page at https://textbook.com.pk/app/login and choose Continue with Google using that account, or its email/password credentials if established. Then open https://textbook.com.pk/app/admin/overview. There is no separate admin login. The admin role cannot be self-selected at sign-up.

## Outcome

- ✅ Impact: Gave the direct login path for the already active admin account.
- 🧪 Tests: Read-only live database role check and HTTP route checks passed.
- 📁 Files: This prompt-history record only.
- 🔁 Next prompts: If login fails, inspect the displayed error and confirm Google OAuth callback after the old secret is disabled.
- 🧠 Reflection: Checking the live role avoids unnecessary instructions to seed an already existing admin.

## Evaluation notes (flywheel)

- Failure modes observed: None in read-only checks.
- Graders run and results (PASS/FAIL): PASS: owner role and public route checks.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Perform an interactive sign-in smoke test after old-secret deactivation.
