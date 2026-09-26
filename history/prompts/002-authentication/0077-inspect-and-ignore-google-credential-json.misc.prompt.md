---
id: 0077
title: Inspect and ignore Google credential JSON
stage: misc
date: 2026-09-26
surface: agent
model: gpt-6
feature: 002-authentication
branch: 024-licence-topic-design
user: channayousif@gmail.com
command: inspect-oauth-credential-file
labels: ["security", "google-oauth", "gitignore"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: history/adr/0006-self-hosted-supabase-backend.md
  pr: null
files:
 - history/prompts/002-authentication/0077-inspect-and-ignore-google-credential-json.misc.prompt.md
 - client_secret_2_166784146133-hs1q359dkahcl9nerrprs0o2kj1qrihv.apps.googleusercontent.com.json
tests:
 - "PASS: JSON parses and client ID matches filename"
 - "PASS: deployed GoTrue client ID and secret match the JSON without revealing values"
 - "PASS: git check-ignore confirms the exact JSON is ignored and git ls-files confirms it is untracked"
 - "PASS: JSON file permissions are owner-only"
---

## Prompt

@/home/a2ahs/mega_book_for_B.Ed/client_secret_2_166784146133-hs1q359dkahcl9nerrprs0o2kj1qrihv.apps.googleusercontent.com.json check it, list the variables in the .env.local, and git ignore it

## Response snapshot

Validated the downloaded Google OAuth JSON by parsing its field names, matching its client ID to the filename, and comparing its secret and client ID with the deployed GoTrue environment without revealing values. Listed only the variable names in `.env.local`. Confirmed that the user's existing uncommitted `.gitignore` rule already ignores this exact untracked file. Restricted the JSON file permissions from 664 to 600.

## Outcome

- ✅ Impact: The credential JSON is ignored by Git and readable only by its owner.
- 🧪 Tests: JSON, deployment match, ignore status, and permissions checks passed.
- 📁 Files: The ignored JSON's permissions changed; this prompt history record was created. The existing `.gitignore` edit was preserved.
- 🔁 Next prompts: If a local Supabase CLI instance is needed, add `GOOGLE_CLOUD_OAUTH_SECRET` to the ignored `.env.local` without printing or committing it.
- 🧠 Reflection: A downloaded OAuth JSON may have broad file permissions even when Git ignores it.

## Evaluation notes (flywheel)

- Failure modes observed: The replacement secret variable is absent from `.env.local`, though the deployed GoTrue secret matches the JSON.
- Graders run and results (PASS/FAIL): PASS: JSON validation, deployed credential match, Git ignore, owner-only permissions.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): Keep downloaded credential JSON files owner-readable by default.
