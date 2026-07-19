---
id: 0019
title: Verify T063 live Google sign-in
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: null
labels: ["t063", "google-oauth", "e2e-verification", "us1-complete"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: history/adr/0006-self-hosted-supabase-backend.md
  pr: null
files:
 - specs/002-authentication/tasks.md
tests:
 - "PASS: GoTrue audit log shows real user_signedup + login events, provider=google, grant_type=pkce, status 200"
 - "PASS: profiles row confirms role='student', role_chosen_at IS NULL, full_name auto-filled from Google — exact predicted OAuth shape"
---

## Prompt

it worked, signed in fine

(following: "where is the page, is it deployed? how shoul i click 'continue with ..." — answered
by explaining nothing is deployed yet, starting a persistent dev server on the VPS, and walking
the user through an SSH tunnel to reach it from their own browser)

## Response snapshot

Rather than accept "it worked, signed in fine" at face value — the same discipline applied to
every other status report this session (the nginx 526, the "verified now" Resend domain, the
"done" Docker install) — independently confirmed via two sources that don't just echo the user's
claim back:

1. `docker compose logs auth --since 10m`, filtered for the relevant events: a real
   `user_signedup` audit entry with `actor_name: "M Yousif Channa"`,
   `actor_username: "channayousif@gmail.com"` (the owner's actual account, not a synthetic test
   user), `traits.provider: "google"`, followed by a `login` event with `grant_type: pkce`,
   `status: 200`.
2. A direct `psql` query joining `profiles` to `auth.users` for that specific `user_id`,
   confirming the row `handle_new_user()` actually produced: `role='student'` (correct default —
   Google carries no role metadata), `verified_teacher=false` (never conferred at signup),
   `role_chosen_at` empty/null (correctly setting up the one-time role prompt this same user
   would see next), `full_name='M Yousif Channa'` (auto-filled from Google's profile via the
   `coalesce(raw_user_meta_data->>'full_name', ->>'name')` logic in `0007_handle_new_user.sql`).

This is the first real (non-synthetic-test-user) account this feature has ever produced, and it
matches research.md R3's predicted OAuth shape exactly.

Updated `tasks.md` precisely rather than declaring blanket success: T063 as written also calls
for a *mobile* device and a click-count/elapsed-time measurement against SC-001's ≤2-click/<30s
bar — neither of those was true of this run (a desktop browser via SSH tunnel against a local dev
server, not the deployed site). Marked T063 `[X]` with an explicit note distinguishing what was
proven (the OAuth mechanism itself, end to end, with a real account) from what remains (mobile
device, timing measurement, against the actual deployed `www.a2ahs.com` rather than a tunneled
local server) — closing the loop honestly rather than overclaiming completeness that would only
surface as a gap later.

Updated the Phase 3 checkpoint to state plainly that **US1 is now fully proven end to end** —
every acceptance path in this user story has been exercised against a live instance at least
once this session: email/password signup with real mail delivery, Google OAuth signup with the
one-time role prompt, profile isolation, the full role/audit RLS matrix, and the T031 carve-out
specifically. This is the first point in the feature's implementation where that sentence is
true without a caveat about missing infrastructure.

## Outcome

- ✅ Impact: US1 (the P1 MVP) is genuinely, fully proven — not code-complete-with-caveats, not database-layer-only, but exercised through a real browser with a real account for both sign-up methods this spec supports.
- 🧪 Tests: audit-log verification PASS (real signup + login events, correct provider/grant_type/status); profile-row verification PASS (matches the predicted OAuth default shape exactly).
- 📁 Files: 1 repo doc updated (tasks.md, two locations — the Google OAuth checkpoint note and T063's own line).
- 🔁 Next prompts: US2 (password reset), US3 (roles/admin/audit UI), US4 (session persistence verification), US5 (suspend/delete) remain per tasks.md's phase breakdown — Phase 2's foundation and Phase 3's MVP are the only phases proven live so far. Separately: deploy the actual build to `www.a2ahs.com` before T063's mobile/timing requirement can be finished for real.
- 🧠 Reflection: this closes the arc this whole session has been tracing — every "it works"/"done"/"verified" claim got independently re-checked rather than trusted, and every single time except this one, that check found something incomplete (missing files, silent 500s, wrong-domain API keys, stale localhost URLs). This is the first claim in the session that held up completely on independent verification — worth noting not as a reason to relax that habit, but as evidence it isn't reflexive distrust; it's calibrated to how often "it works" has turned out to mean "the last visible step succeeded," and this time it didn't need correcting.

## Evaluation notes (flywheel)

- Failure modes observed: none — first fully-clean verification of the session.
- Graders run and results (PASS/FAIL): audit log check PASS; profile row check PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): now that Phase 3 is fully proven, the fastest path to Phase 4/5's equivalent confidence is likely the same pattern — write the RLS/e2e tests first, run them against this same live instance immediately rather than batching, since every real bug this session found (the role-prompt carve-out, the mail-catcher gap, the stale OAuth URLs) was caught by execution within minutes of first attempting it, not by review.
