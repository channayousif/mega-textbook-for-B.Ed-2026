---
id: "0526"
title: "E2E stops sending real auth email"
stage: general
date: 2026-10-19
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/e2e-no-real-email
user: M Yousif Channa
command: resend quota exhausted by CI
labels: ["board-direct", "ci", "e2e", "email", "ops"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
 - tests/e2e/_authEmail.ts
 - tests/e2e/auth-signup.spec.ts
 - tests/e2e/auth-reset.spec.ts
 - history/prompts/general/0526-e2e-stop-real-auth-email.general.prompt.md
tests:
 - stubbed sign-up and reset-request flows run against the live site with Playwright (both UI messages shown, 2 auth requests answered in the browser, none sent)
---

## Prompt

resend quota of 100 emails have been exhausted. it looks like ci is using it too fast

## Response snapshot

Cause: two e2e tests send real auth email through the production Resend relay on every run:
auth-signup.spec.ts (sign-up confirmation) and auth-reset.spec.ts (reset link for a registered test user),
about 2 emails per e2e run plus retries, all to undeliverable @example.test addresses (bounces). CI runs
e2e on every push to main (75 main pushes since 2026-10-17), so CI alone exceeds the 100/day plan. Every
other test creates users with admin.createUser(email_confirm: true) or admin.generateLink, which send
nothing. Fix: tests/e2e/_authEmail.ts answers the browser's /auth/v1/signup and /auth/v1/recover calls with
GoTrue's accepted-request shape by default; E2E_REAL_EMAIL=1 restores the real send for a manual check.

## Outcome

- Impact: CI sends no auth email; real readers keep the quota.
- Tests: listed above.
- Files: listed above.
- Reflection: runs already queued on older commits still contain the sending tests.

## Handoff (for CEO and agents)

- Shipped: e2e auth-email stub (default on).
- Decisions to respect: CI must not send real email; use E2E_REAL_EMAIL=1 only for a deliberate manual check.
- Pending: owner merge; queued CI runs on older SHAs still send when they reach e2e (owner may cancel them).
- Paperclip issues affected: none.
