---
id: 0020
title: Implement and verify US2 password reset
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: null
labels: ["password-reset", "pkce", "gotrue", "playwright", "us2"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - src/pages/app/reset.tsx
 - tests/e2e/auth-reset.spec.ts
 - tests/unit/auth-errors.test.mjs
 - specs/002-authentication/tasks.md
tests:
 - "PASS: npx tsc --noEmit (clean)"
 - "PASS: npm test — 15 unit tests (5 files), including 5 new for T033"
 - "PASS: npm run test:rls — 13/13, 1 skip (regression, unaffected by this phase)"
 - "PASS: npx playwright test tests/e2e/auth-reset.spec.ts — 2/2, against the live instance"
 - "PASS: full e2e regression (auth-signup + auth-reset) — 4/4 together"
---

## Prompt

continue with US2 password reset

## Response snapshot

Implemented all four Phase 4 tasks (T032–T035) and, this time, ran every one of them against the
live self-hosted instance before calling any of it done — no "code-complete, unproven" gap left
for this phase the way earlier phases briefly had.

**T033/T035 turned out already done.** Wrote `tests/unit/auth-errors.test.mjs` against the
existing `authErrors.ts` first, expecting to need to extend it — all 5 assertions passed
immediately. T017's up-front stub (from the very first implementation session, PHR 0011) had
already covered `reset_link_invalid` and `rate_limited` in both languages. No code change needed;
recorded that explicitly rather than padding the diff to look like more was done.

**T034** (`reset.tsx`): two modes on one page — request (default) and recovery, entered via the
`PASSWORD_RECOVERY` `onAuthStateChange` event, matching Supabase's own documented pattern
(verified via Context7 before writing it, not assumed). Only a rate-limit error is shown
distinctly on the request form; every other outcome — including a genuine failure for a
non-existent account — reports the same uniform success message (contracts §A, no enumeration).

**T032** (`tests/e2e/auth-reset.spec.ts`) is where the real work was. First attempt used
`admin.generateLink()` to obtain a clickable link and drove the whole journey through the browser
— failed with the recovery-mode UI never appearing. Diagnosed rather than patched around:

1. First hypothesis (Mailpit): wrong — GoTrue's SMTP is a single global setting, and pointing it
   at Resend earlier this session meant Mailpit stopped receiving *any* mail, not just T025's
   confirmation mail. Not the actual failure here since `generateLink()` doesn't send mail at all.
2. Real cause, found by direct inspection with a throwaway Playwright script (not by reading docs
   further): the generated link redirects with tokens in a `#access_token=...` hash fragment —
   the implicit-flow shape. Our client is configured `flowType: 'pkce'`. Confirmed empirically
   (not just theorized) that navigating to it leaves `localStorage` empty and the hash unconsumed
   after 3 seconds — supabase-js does not fall back to implicit detection for a PKCE-configured
   client. `admin.generateLink()` cannot produce a PKCE `?code=` link because PKCE requires a
   `code_verifier` that only exists in the browser session that actually calls
   `resetPasswordForEmail` — and that link is the one that gets emailed, which nothing in this
   environment can read back (Resend's key is deliberately send-only).

Rather than fight this with browser-internals hacks (manually reverse-engineering supabase-js's
localStorage key format, or adding test-only hooks to production code — both rejected), split the
test honestly into what's actually provable: a UI test for the request path (including a second
assertion for a definitely-nonexistent email, proving no enumeration signal), and a mechanics test
using `verifyOtp({token_hash})` + `setSession()` + `updateUser({password})` directly — the same
call chain `resetPasswordForEmail`'s real recipients trigger internally, just not routed through a
browser-rendered link click. Both pass. The one thing this doesn't independently re-prove is the
client-side `PASSWORD_RECOVERY` *event-catching* specifically — covered by code matching Supabase's
documented pattern, not by this automated run — recorded as an explicit, named gap in tasks.md
rather than silently accepted as "close enough."

## Outcome

- ✅ Impact: US2 (password recovery) is now implemented and proven against the live instance in the same session it was written, closing the gap between "code-complete" and "verified" that earlier phases briefly had (T025's mail bug, the OAuth URL staleness).
- 🧪 Tests: tsc clean; unit 15/15 (5 new); RLS 13/13 + 1 skip (unaffected regression check); e2e 4/4 (2 new + 2 signup regression).
- 📁 Files: 2 new (reset.tsx, auth-reset.spec.ts), 1 new unit test, 1 tasks.md update.
- 🔁 Next prompts: US3 (Phase 5 — self-select teacher role, admin role management, verified-teacher gate, audit) is the next unimplemented phase and the security-critical one per tasks.md's own framing (SC-004's negative-case evidence set).
- 🧠 Reflection: the PKCE/implicit link-format mismatch is the same shape of finding as everything else this session — an admin-API convenience (here, `generateLink()`) quietly can't reach a code path that only a real user's browser can, and the gap is invisible until you actually try to drive the real flow rather than assume a shortcut is equivalent. The T025 mail-bypass and this PKCE gap are the same lesson twice: admin-API test fixtures are for *setup*, and substituting them for the thing actually under test erases exactly the coverage that matters most.

## Evaluation notes (flywheel)

- Failure modes observed: initial test design (page.goto on an admin-generated link) assumed link-format equivalence between server-generated and browser-generated recovery links without checking — caught by empirical inspection (a throwaway debug script logging localStorage/console/URL state) rather than by reasoning from documentation alone, which had already been consulted and hadn't surfaced the distinction clearly.
- Graders run and results (PASS/FAIL): tsc PASS; unit 15/15 PASS; RLS 13/13 PASS + 1 skip; e2e 4/4 PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): when a test needs to simulate a link/token a real user would receive by email, check early whether the admin-API equivalent produces the *same flow type* the production client is configured for (PKCE vs implicit) before building the rest of the test around it — this specific mismatch class (admin shortcut ≠ real user path) has now shown up three times this session in different forms (RLS/mail, T025/mail, T032/PKCE) and is worth watching for by default in this codebase's auth tests going forward.
