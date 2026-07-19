---
id: 0014
title: Drive CI to green
stage: green
date: 2026-07-17
surface: agent
model: claude-opus-4-8
feature: 001-content-platform
command: /sp.implement (CI follow-up)
branch: 001-content-platform
user: channayousif@gmail.com
labels: ["ci", "github-actions", "docusaurus-build", "e2e", "bugfix"]
links:
  spec: specs/001-content-platform/spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/1
files:
 - package.json (removed type:module)
 - scripts/scaffold-catalog.mjs (unique labels + in-content noindex)
 - vitest.config.ts (new)
 - tests/e2e/search.spec.ts (rewritten)
 - specs/001-content-platform/tasks.md, research.md
tests:
 - "CI run #5 (709ef37): SUCCESS — build (en+ur) + Lighthouse + full Playwright e2e"
---

## Prompt

wait for CI and fix anything it flags  (opened PR #1 to trigger CI, then iterated)

## Response snapshot

Opened PR #1 via the GitHub API (the workflow triggers on pull_request), then polled Actions and fixed each failure across five runs until green:

1. **Unit tests failed** — vitest's default include collected the Playwright `tests/e2e/*.spec.ts` and errored. Added `vitest.config.ts` scoping vitest to `tests/unit/**/*.test.mjs`.
2. **`docusaurus build` failed** with `require.resolveWeak is not a function` — on CI ubuntu too, so NOT the sandbox. Root cause: **`"type": "module"` in package.json** broke Docusaurus's CommonJS server bundle during SSG. Removed it (scripts stay ESM via `.mjs`).
3. **`ur` build failed** — every scaffolded course had the same `Unit 1 (coming soon)` sidebar label → duplicate i18n translation keys. Made labels course-code-prefixed (unique).
4. **e2e: 10 passed / 2 failed** (read-bilingual, navigation, handout-print all green). The 2 search failures were my spec matching sidebar links; also discovered the T026 noindex swizzle never emitted the meta. Replaced the swizzle with an explicit in-content `<Head><meta robots noindex></Head>` in scaffolded placeholders (verified: coming_soon pages dropped from `build/search-index.json`, golden unit still indexed) and rewrote search.spec.ts against the stable `/search` page.

**CI run #5 (709ef37): SUCCESS** — build both locales + Lighthouse + full Playwright e2e all green. Marked T012/T022/T023/T027/T042 done → **41/42**; only T041 (human review gates) remains. Corrected research.md (the SSG failure was a real bug, not an environment limit).

## Outcome

- ✅ Impact: Full CI pipeline green on GitHub Actions — the static SSG build, Lighthouse budgets, and browser e2e (all sandbox-blocked before) now verified. Feature 001 is effectively complete pending human review.
- 🧪 Tests: build (en+ur) ✓, Lighthouse ✓, 10 vitest ✓, Playwright suite ✓, content/answer-key/add-course gates ✓.
- 📁 Files: package.json, scaffold, vitest.config, search spec, tasks/research docs.
- 🔁 Next prompts: merge PR #1; T041 human Content/Engineering/Teacher gates; then author more units / next spec.
- 🧠 Reflection: My "sandbox-only SSG limitation" call was wrong — pushing to real CI exposed it as a `type:module` bug. Lesson: verify build assumptions in a clean env before declaring them environmental.

## Evaluation notes (flywheel)

- Failure modes observed: vitest collecting e2e specs; `type:module` breaking SSG; duplicate i18n sidebar keys; ineffective swizzle for noindex; e2e selectors matching sidebar not search results.
- Graders run and results (PASS/FAIL): CI #5 PASS (both jobs).
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): merge to main and confirm the deploy workflow (GitHub Pages) builds after setting url/baseUrl.
