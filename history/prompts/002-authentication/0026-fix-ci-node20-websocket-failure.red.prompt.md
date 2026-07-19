---
id: 0026
title: Fix CI Node 20 native WebSocket failure
stage: red
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: null
labels: ["ci", "bugfix", "node"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/2
files:
 - .github/workflows/ci.yml
 - .github/workflows/deploy.yml
 - package.json
tests:
 - "FAIL (before fix): npm run test:rls in CI — 34/35 tests, Error: Node.js detected but native WebSocket not found"
 - "Root cause: @supabase/supabase-js v2.110.7 requires Node's native WebSocket global, added in Node 22; CI pinned node-version: 20"
---

## Prompt

check CI status on the PR

## Response snapshot

First check (`gh pr checks 2`) caught the `build` job mid-run and scheduled a wakeup to
re-check. Second check found `build` failed after ~2m18s with all 14 RLS test suites (34/35
tests) throwing `Error: Node.js detected but native WebSocket not found` — `e2e` was skipped as
a dependent job.

This was a real, previously-invisible gap: `npm run test:rls` was wired into CI for the first
time this session (T062/PHR 0025) and had never actually run in CI before this PR. Locally it
always passed because the dev environment runs Node 22.22.1 (Node's native `WebSocket` global
was added in Node ~21/22); CI's `setup-node` step pins `node-version: 20` in both jobs of
`ci.yml`, which has no native `WebSocket`, and `@supabase/supabase-js` v2.110.7's
`@supabase/realtime-js` dependency now requires it rather than falling back to a `ws` polyfill.

Fixed by bumping `node-version` to `22` in both `ci.yml` jobs (`build`, whose new RLS step needs
it, and `e2e`, whose Playwright specs construct the same client for test setup) and in
`deploy.yml` for consistency, then corrected `package.json`'s `engines.node` from `>=20` to
`>=22` since that constraint is no longer accurate.

## Outcome

- ✅ Impact: PR #2's CI build job was failing on every RLS test; fix un-blocks the merge gate without touching any test or application code — the tests themselves were already correct.
- 🧪 Tests: pushed the fix; awaiting re-run to confirm the `build` and `e2e` jobs go green.
- 📁 Files: `.github/workflows/ci.yml`, `.github/workflows/deploy.yml`, `package.json`.
- 🔁 Next prompts: re-check CI once the new run completes.
- 🧠 Reflection: same pattern as several bugs found earlier in this feature (T025 mail, T032 PKCE, T054 signOut) — a thing that "worked" locally because the local environment silently differed from the one that actually gates the PR. Wiring a new CI step is exactly the moment to ask "does CI's own environment satisfy what this step needs," not just "does the command work on my machine."

## Evaluation notes (flywheel)

- Failure modes observed: a new CI step (test:rls) was added without checking CI's pinned Node version against the dependency's actual runtime requirement; the mismatch was invisible until the step actually ran in CI for the first time.
- Graders run and results (PASS/FAIL): CI `build` job — FAIL before fix (Node 20); re-check pending after fix (Node 22).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when adding a new CI step that exercises a library also used only locally, diff the CI runner's toolchain version against the local one before trusting a local pass.
