---
id: 0025
title: Complete Phase 8 polish — feature done
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 002-authentication
branch: 002-authentication
user: channayousif@gmail.com
command: null
labels: ["polish", "accessibility", "lighthouse", "ci", "documentation", "feature-complete"]
links:
  spec: specs/002-authentication/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - src/css/custom.css
 - src/pages/app/login.tsx
 - src/pages/app/signup.tsx
 - src/pages/app/reset.tsx
 - src/pages/app/profile.tsx
 - src/pages/app/admin/users.tsx
 - src/pages/app/admin/audit.tsx
 - .github/workflows/ci.yml
 - .github/workflows/deploy.yml
 - specs/002-authentication/rls-matrix-results.md
 - specs/002-authentication/lighthouse-results.md
 - specs/002-authentication/quickstart.md
 - specs/002-authentication/tasks.md
tests:
 - "PASS: npx tsc --noEmit (clean)"
 - "PASS: npm test — 15 unit tests"
 - "PASS: npm run test:rls — 34/35, 1 skip"
 - "PASS: npx playwright test — 11/11 across all auth specs"
 - "Lighthouse: Performance 99-100, Accessibility 100/100 on both docs and auth pages"
---

## Prompt

continue with Phase 8 polish

(this PHR covers T059, T060a, T061, T062, T064, T065 — T060 already recorded separately in PHR
0024)

## Response snapshot

Closed out the last 6 Phase 8 tasks, and with them, every task in `tasks.md` — all 72 across 8
phases now marked `[X]`.

**T061 (accessibility)** found the largest surprise: Infima ships no `.input` class at all —
`className="input"` had been a silent no-op across every text field built this entire session,
rendering bare browser defaults. Added real CSS keyed to Infima's own theme variables (tracks
light/dark automatically), plus a `.auth-tap-target` pattern for checkbox/radio labels and a
scoped `.auth-page .button` rule (Infima's default button renders ~36px, under the 44px target,
but scoped to auth pages only — Feature 001 also uses `.button` and this fix isn't its concern).
Verified with a live screenshot and `boundingBox()` measurements, not just CSS math: email input,
submit button, and radio label all render at exactly 44px.

**T059 (Urdu)** surfaced something bigger than the task assumed: *no* UI chrome anywhere in this
codebase — not just Spec 002's auth pages, Feature 001's own components either — has ever used
Docusaurus's `<Translate>` API; `i18n/ur/` holds only translated book content, no `code.json`
exists. Asked rather than assumed the scope; the owner's answer settled it: only book content is
bilingual, all other UI stays English by design. Verified (not just declared) that this is already
correctly true: Docusaurus auto-generates a `/ur/app/*` mirror route with `dir="rtl"` wrapping the
same English text, but every real navigation link into the auth flow uses a plain, non-locale-
prefixed `href` rather than Docusaurus's locale-aware `Link`, so no actual user flow ever reaches
it.

**T060a (Lighthouse)** — no public preview deployment exists, so ran against a real
`npm run build && npm run serve` instead of dev mode. Both gated categories pass with wide margin:
Performance 99-100, Accessibility 100/100 on both a docs page and `/app/login`. The clean
accessibility score corroborates T061's fix independently — Lighthouse's own accessibility audit
checks much of what T061 targeted by hand.

**T062 (CI)** added a `check:no-service-key` step that had been entirely absent from CI despite
being a release-blocking guard, and an `npm run test:rls` step — plus threaded the same three
secrets through the e2e job so `auth-*.spec.ts` actually run instead of silently `test.skip`ping.
Setting the actual repo secrets (`gh secret set`, pushing the service-role key into GitHub's
remote store) was confirmed with the owner first rather than done because the access happened to
be available.

**T064/T065 (documentation)** — `rls-matrix-results.md` maps all 17 contracts §D checklist items
to the actual test file proving each one (34/35 automated, 1 documented skip with independent
live evidence), plus the extra coverage found during implementation. The `quickstart.md`
verification pass found and fixed a real syntax bug in its own example SQL (an unescaped
apostrophe in a placeholder that would break the string literal if copy-pasted) and, more
significantly, **an unnecessary instruction**: verified directly that the self-hosted edge-runtime
picks up new/changed Edge Functions per-request with no container restart — all three functions
this feature built worked immediately against a `functions` container that had been running for
hours before any of them existed.

## Outcome

- ✅ Impact: **Spec 002 (Authentication & Roles) is fully complete** — all 72 tasks across 8 phases, every user story implemented and proven against a live self-hosted instance, every constitutional gate (bundle budget, accessibility, engineering review) passing with evidence, not assertion.
- 🧪 Tests: tsc clean; unit 15/15; RLS 34/35 + 1 documented skip; e2e 11/11; Lighthouse Performance 99-100 / Accessibility 100/100 on both page types.
- 📁 Files: CSS + 6 page files (accessibility), 2 CI workflow files, 3 spec documents (new matrix/lighthouse docs, quickstart corrections).
- 🔁 Next prompts: none required by this spec — the feature is done. Natural next steps belong to other specs: Spec 003 (classes/submissions/grades, which is what the `_verified_teacher_gate_demo` fixture and `is_verified_teacher()` helper were built to eventually support), or deploying this feature's build to the real `www.a2ahs.com` (T060a and T063's "real preview deployment" and "real mobile device" caveats both point at the same open item).
- 🧠 Reflection: this phase's pattern differed from the rest of the session — fewer "the code is wrong" bugs, more "the task's assumed context doesn't match this codebase's actual state" findings (no `.input` class, no i18n pipeline, an unneeded restart instruction). Both are the same underlying discipline this whole session was built on: check before acting, whether the code, the API, or the task description itself is the thing that might not match reality.

## Evaluation notes (flywheel)

- Failure modes observed: none new this phase — all findings were caught by verification (screenshot measurement, Lighthouse, direct testing of the restart claim) before being written down, not discovered by something failing downstream.
- Graders run and results (PASS/FAIL): tsc PASS; unit 15/15 PASS; RLS 34/35 PASS + 1 skip; e2e 11/11 PASS; Lighthouse PASS (both gates, both pages).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): for a future feature's Phase-8-equivalent polish pass, budget time specifically for "does the codebase actually have the infrastructure this task assumes" checks before starting each task — three of this session's Phase 8 tasks (T059, T061, T065's restart claim) turned out to be exactly that question, not the literal instruction as written.
