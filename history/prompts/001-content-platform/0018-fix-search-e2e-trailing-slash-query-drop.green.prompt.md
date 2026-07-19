---
id: 0018
title: Fix search e2e trailing-slash query drop
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 001-content-platform
branch: fix/ci-node22-and-english-only-courses
user: channayousif@gmail.com
command: null
labels: ["e2e", "search", "trailingSlash", "ci"]
links:
  spec: specs/001-content-platform/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/3
files:
 - tests/e2e/search.spec.ts
 - playwright.config.ts
 - .github/workflows/ci.yml
tests:
 - "PASS: npx playwright test tests/e2e/search.spec.ts — 2/2 (was: 1 failing, 15s timeout)"
 - "PASS: npx playwright test (full suite) — 12/12 non-skipped"
---

## Prompt

(continuation of "check e2e results" — investigating a search.spec.ts failure blocking PR #3's CI)

## Response snapshot

`tests/e2e/search.spec.ts`'s first test failed consistently in CI (3/3 runs) but never
reproduced locally despite a fresh build, network throttling, and combined CPU+network
throttling. An initial local repro (Urdu 404 page appearing after ~4s) turned out to be a
self-inflicted red herring: the primary working directory's `.docusaurus`/webpack cache was
hours stale from an earlier session; clearing it made the symptom disappear, but that symptom
was never actually present in CI's failure screenshot.

Added temporary Playwright trace capture (`trace: 'retain-on-failure'`, `screenshot:
'only-on-failure'`) plus a CI artifact-upload step, pushed, and downloaded the real CI trace.
The screenshot showed something entirely different from the local red herring: a correctly
English-rendered `/search` page with an **empty** search input — the `?q=psychology` query
never reached the search box at all.

`curl -I 'http://localhost:3000/search?q=psychology'` confirmed the root cause directly: a
`301` to `Location: /search/` — `docusaurus serve`'s static-file server redirects the
no-trailing-slash path to match the `trailingSlash: true` build output, and the redirect drops
the query string entirely. `tests/e2e/search.spec.ts` navigated to `/search?q=...` (no trailing
slash before the `?`), so every request silently lost its query on the redirect hop. Requesting
`/search/?q=psychology` directly (correct trailing slash) confirmed the fix: search input
populated, results rendered.

Also discovered, while isolating this: the local repo's `main` branch carries 17 commits never
pushed to `origin/main`, including one titled "fix(001): make coming_soon search-exclusion
actually work + fix search e2e" (co-authored by a prior Claude Opus 4.8 session) that had
already rewritten this exact test to use the `/search?q=...` form — meaning that local,
unpushed fix itself carried the same trailing-slash bug, unverified against `trailingSlash: true`
built output. Flagged to the owner separately; not merged into this PR without their say-so.

## Outcome

- ✅ Impact: unblocks PR #3's `e2e` CI job — the only thing left failing after the Node 22 fix.
  Fix is two-character-equivalent (`/search` → `/search/` in two `page.goto()` calls) once the
  actual cause was found, but reaching it required ruling out an unrelated local artifact and
  pulling a real CI trace rather than continuing to guess from local reproduction attempts that
  kept not matching.
- 🧪 Tests: `search.spec.ts` 2/2 passing (fast — under 1s and 2.4s, vs. the old test's 15s
  timeout-then-fail); full e2e suite 12/12 non-skipped passing.
- 📁 Files: `tests/e2e/search.spec.ts` (the fix); `playwright.config.ts` and `.github/workflows/ci.yml`
  reverted back to their pre-diagnostic state after the trace confirmed the cause.
- 🔁 Next prompts: report the unpushed local-`main` discovery to the owner and ask what to do
  with it — it's out of scope for this fix to decide unilaterally.
- 🧠 Reflection: the local-repro chase (stale cache → Urdu 404) was a costly detour that could
  have been avoided by checking the CI failure's own screenshot/trace *first*, before spending
  effort trying to reproduce blind. Once a CI-only failure resists a few honest local repro
  attempts, pulling the real artifact is higher-leverage than more local guessing — this is the
  same "verify against the actual system, not an assumption about it" discipline as the rest of
  this project's session history, just applied one step later than it should have been.

## Evaluation notes (flywheel)

- Failure modes observed: chased a local symptom (stale-cache-induced Urdu 404) that resembled
  a real bug but was unrelated to the actual CI failure; the two were only linked by both
  occurring on `/search`. Cost real time before pivoting to trace-based diagnosis.
- Graders run and results (PASS/FAIL): search.spec.ts 2/2 PASS; full e2e suite 12/12 non-skipped
  PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): for any CI-only failure that doesn't reproduce
  locally within 1-2 honest attempts, reach for trace/artifact capture immediately rather than
  continuing to vary local conditions (cache, network, CPU) hoping to stumble onto the same
  path CI takes.
