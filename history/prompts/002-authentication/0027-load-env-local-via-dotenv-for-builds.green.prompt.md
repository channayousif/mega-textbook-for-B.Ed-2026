---
id: 0027
title: Load .env.local via dotenv for builds
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 002-authentication
branch: main
user: channayousif@gmail.com
command: null
labels: ["build", "env", "dotenv", "production-deploy"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docusaurus.config.ts
 - package.json
 - package-lock.json
tests:
 - "PASS: env -i clean-shell build (no manually exported vars) — navbar Sign in widget renders"
 - "PASS: CI-simulated check — real env vars set, no .env.local present, dotenv does not override"
 - "PASS: npx tsc --noEmit — clean"
 - "PASS: npm test — 16/16"
---

## Prompt

yes, add the dotenv fix

(follows the live-site report "live site is not showing any sign in or signup buttons/links
on landing page" — root cause found: docusaurus.config.ts reads DOCUSAURUS_SUPABASE_URL /
DOCUSAURUS_SUPABASE_ANON_KEY directly from process.env with no dotenv loading anywhere in the
project, so `.env.local` was never actually read by a plain `npm run build`; every local build
this session had those vars silently empty, and NavbarAuthWidget's `if (!isConfigured) return
null` swallowed the gap with zero error output)

## Response snapshot

Added `dotenv` as a devDependency (was not present even transitively) and load `.env.local`
explicitly (`loadEnv({ path: '.env.local' })`, not the bare `dotenv/config` side-effect import,
which defaults to `.env` — this project's own convention, documented in quickstart.md and
`.gitignore`, is `.env.local`) at the top of `docusaurus.config.ts`, before anything reads
`process.env`.

Verified both directions rather than assuming: a fully clean shell (`env -i`, no manually
exported vars) now produces a working build with the navbar "Sign in" link rendering — proving
the exact failure this session hit is closed. Separately simulated CI's actual conditions (real
env vars set directly, `.env.local` absent) and confirmed dotenv's default non-override behavior
leaves those values untouched — this fix does not risk masking or overriding CI's own secrets
injection.

## Outcome

- ✅ Impact: closes the exact silent-failure path that shipped an auth-less navbar to the live
  site — `npm run build` (or `start`) now works correctly on a fresh shell with no manual
  `source .env.local`/export step required first.
- 🧪 Tests: clean-env build verified with a real browser check (navbar Sign in present);
  CI-simulated no-override check passed; `tsc --noEmit` clean; unit tests 16/16.
- 📁 Files: `docusaurus.config.ts` (the fix), `package.json`/`package-lock.json` (new
  `dotenv` devDependency).
- 🔁 Next prompts: none required — this closes the loop opened by the live-site report.
- 🧠 Reflection: the underlying defect (missing dotenv loading) had been present since Spec
  002's auth config was first added (docusaurus.config.ts's `customFields` block), silent the
  entire time because the only signal was an empty navbar item with no console error. It only
  surfaced because a real user (the owner) looked at the actual live page rather than trusting a
  green CI/local-test run — CI's own env-injection method (workflow `env:` block) never needed
  dotenv at all, so this gap was invisible to every automated check that existed.

## Evaluation notes (flywheel)

- Failure modes observed: a config-loading gap with a silent failure mode (no error, just an
  absent UI element) is much harder to catch than one that throws — worth deliberately checking
  for "renders nothing under a plausible misconfiguration" cases, not just "throws under an
  implausible one," when reviewing components gated by env-derived config.
- Graders run and results (PASS/FAIL): clean-shell build check PASS; CI-simulation check PASS;
  tsc PASS; unit 16/16 PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): consider a build-time assertion (fail loud, not
  silent) when `DOCUSAURUS_SUPABASE_URL`/`ANON_KEY` are unset in a production build specifically
  — today's fix prevents the *local* dev-build version of this gap, but a similarly silent gap
  is still possible if a future production build's env injection breaks for a different reason.
