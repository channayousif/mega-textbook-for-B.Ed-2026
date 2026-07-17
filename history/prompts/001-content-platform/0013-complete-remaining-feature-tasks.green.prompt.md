---
id: 0013
title: Complete remaining feature tasks
stage: green
date: 2026-07-17
surface: agent
model: claude-opus-4-8
feature: 001-content-platform
command: /sp.implement (continuation)
branch: 001-content-platform
user: channayousif@gmail.com
labels: ["implement", "font", "search", "a11y", "deploy", "e2e", "ci"]
links:
  spec: specs/001-content-platform/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - static/fonts/NotoNastaliqUrdu-Regular.woff2 (+ README)
 - src/theme/DocItem/Metadata/index.tsx
 - src/components/Glossary.tsx, src/components/PrintHandout.tsx
 - vercel.json, .github/workflows/deploy.yml, .lighthouserc.json, .github/workflows/ci.yml
 - scripts/check-no-answer-keys.mjs, scripts/check-add-course.mjs
 - tests/e2e/{read-bilingual,navigation,search,handout-print}.spec.ts, playwright.config.ts
tests:
 - "validate:content, check:no-answer-keys, check:add-course: all PASS"
 - "vitest: 10/10 PASS"
 - "dev server: compiles + serves EN/UR + coming_soon routes (200); swizzle compiles"
 - "playwright e2e: authored + CI-wired; cannot run in sandbox (missing browser host libs)"
---

## Prompt

recreate the feature branch and continue with remaining tasks

## Response snapshot

Recreated `001-content-platform` from `main` and worked the completable remaining tasks (6 committed changes across two commits, feature branch now 2 ahead of main):

- **T005** (font): downloaded the real Noto Nastaliq Urdu Arabic-range woff2 subset (159 KB) from Google Fonts into static/fonts/, updated README; already wired via @font-face.
- **T026** (search exclusion): `src/theme/DocItem/Metadata` swizzle emits `<meta robots noindex>` only for `coming_soon` units (confirmed the plugin's parse.js drops noindex pages) — they stay in the sidebar, leave the search index. Dev server compiles; coming_soon route still 200.
- **T039** (a11y): aria-labels on Glossary `<abbr>` and PrintHandout button; sweep of headings/color-only/alt.
- **T040** (deploy): vercel.json (primary) + GitHub Pages deploy workflow (fallback).
- **T038** (Lighthouse): .lighthouserc.json + CI step (a11y ≥ 0.9, FCP, weight budgets).
- **T028** (no answer keys): scripts/check-no-answer-keys.mjs — runs green on sources; wired in CI for sources + built output.
- **T034** (add-course content-only): scripts/check-add-course.mjs (browser-free) — adds a throwaway course, asserts validator passes + zero src/config change; verified green (SC-006). Also surfaced/confirmed the validator's path-agreement check when the fixture folder≠code.
- **e2e** (T012/T022/T023/T027): authored all four Playwright specs + a CI e2e job (build → serve → `playwright install --with-deps` → test). Attempted locally: chromium downloads but **can't launch in the sandbox** (missing libatk/libxdamage/libasound/libatspi; needs sudo). So browser e2e is CI-only; the specs are the deliverable.

**Status: 36/42 tasks done.** Remaining: T012/T022/T023/T027 (browser e2e — CI-only), T041 (human review gates), T042 (full quickstart run — needs the static build, still env-blocked at SSG).

## Outcome

- ✅ Impact: Feature is substantially complete and verifiable — every automatable, browser-free gate passes locally (validate, no-answer-keys, add-course, 10 fixtures); font is real; search-exclusion, deploy, Lighthouse, and the full e2e suite are implemented and CI-wired.
- 🧪 Tests: 4 local gates + 10 vitest PASS; dev server compiles/serves all routes; browser e2e pending CI.
- 📁 Files: font, DocItem swizzle, 2 check scripts, 4 e2e specs, vercel/deploy/lighthouse/ci configs, a11y edits.
- 🔁 Next prompts: push the feature branch (needs your GitHub auth); open a PR to main; let GitHub Actions run the SSG build + browser e2e (the sandbox-blocked parts should pass there); then T041 human gates.
- 🧠 Reflection: Leaned into browser-free verifiability (add-course + no-answer-keys as real scripts) and was explicit that browser e2e and SSG are CI-only in this sandbox rather than marking them done unverified.

## Evaluation notes (flywheel)

- Failure modes observed: Playwright browsers unusable in-sandbox (missing host libs, sudo required); a self-inflicted fixture bug (folder≠code) that usefully re-proved the validator's path-agreement rule.
- Graders run and results (PASS/FAIL): validate:content, check:no-answer-keys, check:add-course, vitest — all PASS; browser e2e + SSG build — deferred to CI.
- Prompt variant (if applicable): N/A.
- Next experiment (smallest change to try): open a PR so CI runs `docusaurus build` + the e2e job on ubuntu; confirm SSG succeeds and the four e2e specs pass outside the sandbox.
