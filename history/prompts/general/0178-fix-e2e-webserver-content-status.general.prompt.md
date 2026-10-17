---
id: 0178
title: Fix e2e webServer content status
stage: general
date: 2026-10-17
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/e2e-content-status
user: M Yousif Channa
command: none
labels: ["board-direct", "ci", "e2e", "regression"]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/187
files:
 - .github/workflows/ci.yml
tests:
 - reproduced locally: `docusaurus serve` on a fresh checkout fails "static/content-status.json is missing"; after report-content-status.mjs it serves HTTP 200
 - npm test 307/307; check:docs-sync PASS
---

## Prompt

e2e is failing : Error: Process from config.webServer was not able to start. Exit code: 1

## Response snapshot

This is a regression from #187. The e2e job stopped rebuilding and now serves the build job's artifact, but `docusaurus serve` still loads `docusaurus.config.ts`. That config refuses to load without the gitignored `static/content-status.json`, which only the build job generated. The fix adds one e2e step that runs `node scripts/report-content-status.mjs` before Playwright starts the server. Reproduced and verified locally.

## Outcome

- Impact: e2e runs again on main and on full-suite PRs; the main deploy gate can go green.
- Tests: listed above.
- Files: 1.
- Next prompts: none.
- Reflection: reusing an artifact moved the config load into a job that had never needed the generated file; the e2e path could not be tested before merge, so test it by reproducing the job's start-up locally.

## Handoff (for CEO and agents)

- Shipped / changed: e2e generates the content-status report before serving.
- Decisions the team must respect: any job that loads docusaurus.config.ts must generate static/content-status.json first.
- Pending / next owner: none.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: an untested job path after a CI refactor.
- Graders run and results (PASS/FAIL): local serve repro PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): none.
