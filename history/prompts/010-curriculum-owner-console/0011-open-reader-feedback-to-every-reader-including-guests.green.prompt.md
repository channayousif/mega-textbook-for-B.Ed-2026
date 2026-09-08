---
id: 0011
title: Open reader feedback to every reader including guests
stage: green
date: 2026-09-07
surface: agent
model: claude-sonnet-5
feature: 010-curriculum-owner-console
branch: feat/guest-content-feedback
user: channayousif@gmail.com
command: "i have noticed that only student can give feedback once per page/topic and there is no any guidance on text selection feature. it should be open for all even for the guest with email address. proper guidance should be there for student, teacher, guest. admin dashboard should handle it gracefully."
labels: ["content-feedback", "guest-access", "edge-function", "rls", "guidance"]
links:
  spec: specs/010-curriculum-owner-console/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/23
files:
 - src/theme/DocItem/Footer.tsx
 - src/lib/contentFeedback.ts
 - src/lib/types.ts
 - src/pages/app/confirm-feedback.tsx
 - src/pages/app/admin/feedback-queue.tsx
 - supabase/migrations/0037_content_feedback_guest_access.sql
 - supabase/functions/guest-feedback-submit/index.ts
 - tests/rls/content-feedback-guest-access.test.mjs
 - tests/e2e/content-feedback-submission.spec.ts
 - tests/e2e/guest-feedback-submission.spec.ts
 - specs/010-curriculum-owner-console/spec.md
 - specs/010-curriculum-owner-console/plan.md
 - specs/010-curriculum-owner-console/data-model.md
 - specs/010-curriculum-owner-console/contracts/console-operations.md
 - specs/010-curriculum-owner-console/quickstart.md
 - guides/student-guide/self-assessment-and-feedback.mdx (+ ur translation)
 - guides/teacher-guide/give-feedback-and-suggest-improvements.mdx (+ ur translation)
tests:
 - TypeScript compile: clean
 - unit suite: 136/136 passing
 - production build: both locales (en + ur), exit 0
 - RLS suite: 156/156 (full run) + 25/25 (targeted re-run on the 4 content-feedback files)
 - guest-feedback-submit Edge Function: verified manually via curl (insert, author_role='guest' stamped, honeypot no-op, every validation-rejection shape, confirm_guest_feedback idempotency, real Resend acceptance)
 - direct (non-Playwright) browser diagnostic script: confirmed guest hint/button/control render correctly against the production build
 - e2e (guest-feedback-submission.spec.ts, content-feedback-submission.spec.ts): not confirmed locally (severe sandbox memory exhaustion mid-session broke even plain page loads); deferred to PR #23's CI run
---

## Prompt

i have noticed that only student can give feedback once per page/topic and there is no any guidance on text selection feature. it should be open for all even for the guest with email address. proper guidance should be there for student, teacher, guest. admin dashboard should handle it gracefully.

## Response snapshot

Investigated the actual code before assuming the report was fully accurate: found the "give feedback" control was gated to `role === 'student' || role === 'teacher'` in Footer.tsx (excluding every signed-out visitor entirely, not "once per page" - that part was a UI dead-end after one submission, never a real server-side limit), and that the only selection-mechanism hint appeared *inside* the already-opened form, never before.

Before writing any guest-facing schema, asked one targeted question: since a guest submission is this database's first-ever unauthenticated write path, what level of anti-spam protection should it have. The answer (email confirmation required) shaped the whole design - a guest row now carries a nullable `author_id` alternative (`guest_email` + `guest_confirmation_token`, migration `0037`) and is inserted only via a new Edge Function (`guest-feedback-submit`, service-role, mirroring Spec 002's `admin-suspend`/`admin-list-users` precedent) that validates everything server-side and sends a real confirmation email through the *already-verified* Resend credential (reused, not a new secret) before the item is treated as real. Confirmation itself is a `SECURITY DEFINER` RPC (`confirm_guest_feedback`) anon can call directly - the token is the sole credential, no Edge Function needed for that half.

Rewrote `ContentFeedbackControl` (Footer.tsx) to: show for any reader including a resolved-signed-out guest (loading-gated to avoid a flash); show the selection tip before the form opens, not after; offer "Give more feedback" after a submission instead of a dead end; add an email field + an invisible honeypot when signed out. Added a new `confirm-feedback.tsx` page (outside every auth guard) for the emailed link to land on. Updated the admin queue with an Author column showing role or a guest's email + confirmation status, so an unconfirmed item is still visible and triageable, never silently hidden.

Verified the Edge Function thoroughly by hand (curl): happy path, every validation-rejection shape, honeypot silently no-op, confirm-RPC idempotency, and confirmed Resend actually accepted the send (status 200, not the all-or-nothing 502 fallback) - deliberately NOT added to the automated suite, since a real call sends a real email through the production relay every run, which would turn repeated CI runs into a bounce pattern that damages sending-domain reputation (a real concern this project's own ADR-0006 already treats seriously). Wrote `content-feedback-guest-access.test.mjs` instead, covering everything the schema/RLS/RPC layer can be tested for without touching the function or Resend at all - caught one real test-authoring mistake along the way (a "both fields set" constraint test using the service role, which can't resolve a caller role for the author_role-stamping trigger, producing the wrong error message; fixed by using a real signed-in session instead, the same class of pitfall this repo's other fixtures already document).

Updated spec.md's Clarifications with a dated Q&A entry, reversed FR-013's original "signed-out visitor MUST NOT see/submit" text, narrowed FR-017's "MUST NOT solicit personal information" for the one exception a guest email is, and added FR-010a/FR-012a/FR-018a for the guidance/reset/admin-display gaps - plus matching updates to plan.md (the "no new Edge Function" line was no longer true), data-model.md, contracts/console-operations.md, and quickstart.md (a new §6 covering the Edge Function's deploy/env/verify steps). Mirrored the new guidance into both the student and teacher guides, EN and UR.

Hit the branching mistake again from the mobile-navbar session and self-corrected the same way: confirmed the base branch's PR (mobile-navbar, #22) was already merged, then branched cleanly off fresh `main` for this unrelated feature rather than committing onto the old branch.

Local e2e verification failed for infrastructure reasons partway through (this session's sandbox had drifted into severe memory exhaustion - plain `page.goto()` timing out at 60s, a browser "Not supported" protocol error on the first attempt) - rather than keep retrying against a resource-starved environment, used a direct, Playwright-overhead-free script to confirm the actual rendered behavior was correct (it was: the hint and button appear for a signed-out visitor within ~2 real seconds), then deferred full e2e confirmation to this PR's CI run, matching the exact split that already worked cleanly for the mobile-navbar fix earlier in the session (CI caught a real bug there; here, independent evidence - RLS suite, manual curl, and the direct diagnostic - all agree the code is correct, so CI is expected to confirm rather than surprise).

## Outcome

- ✅ Impact: reader feedback is open to every visitor, signed in or not, with real (if lightweight) protection against anonymous spam; the previously-invisible text-selection mechanism now has upfront guidance for everyone; a reader can leave more than one feedback item per page-visit without reloading; the admin queue no longer silently omits author information for any submission type.
- 🧪 Tests: TypeScript clean; 136/136 unit; both-locale build; RLS 156/156 (+ 25/25 targeted); Edge Function manually verified end-to-end via curl; e2e deferred to CI due to local sandbox memory exhaustion, with independent non-Playwright confirmation of the actual UI behavior in the interim.
- 📁 Files: 19 files (14 modified, 5 new), 1050 insertions / 61 deletions.
- 🔁 Next prompts: watch PR #23's CI run to confirm the e2e suite passes in a clean environment (the actual, authoritative confirmation this session's own sandbox couldn't provide); merge once green.
- 🧠 Reflection: asking one focused, high-leverage question (anti-spam approach) before writing any guest-facing schema avoided building the wrong shape entirely - the "no verification" default would have been a much smaller diff but wasn't what was actually wanted, and the "magic-link sign-in" alternative I considered and rejected myself would have silently turned every guest into a real account, which the user's own phrasing ("guest with email address") explicitly ruled out. Reusing the existing Resend credential rather than treating "send an email" as requiring new external provisioning kept a materially large feature from stalling on an approval I couldn't get myself (a new API key). When local infrastructure genuinely can't answer a question a test is meant to answer, saying so plainly and using the next available clean environment (CI) beats retrying the same failing command against a resource-starved sandbox.

## Evaluation notes (flywheel)

- Failure modes observed: repeated the "committed on the wrong branch" near-miss pattern from earlier in the session, self-caught before pushing by checking whether the current branch's PR was already merged; local e2e runs were unreliable due to session-accumulated memory pressure unrelated to the code under test.
- Graders run and results (PASS/FAIL): N/A (implementation session, not a code-review stage).
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): once CI confirms green, consider whether `guest-feedback-submit` warrants a lightweight synthetic-monitor-style manual re-verification on a cadence, since it's the one write path with zero automated coverage of its actual email-sending behavior.
