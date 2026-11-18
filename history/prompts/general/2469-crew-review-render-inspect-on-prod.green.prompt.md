---
id: 2469
title: Crew reviews inspect the production build for render evidence
stage: green
date: 2026-11-09
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/crew-render-inspect
user: M Yousif Channa
command: investigate (plan mode, then implement)
labels: [board-direct, crew, review, render-inspect]
links:
  spec: null
  ticket: null
  adr: history/adr/0019-*
  pr: null
files:
  - scripts/crew/crew.mjs
  - scripts/crew/brief.mjs
  - tests/crew/brief.test.mjs
tests:
  - npm run test:crew (116/116 pass)
  - manual: scripts/heavy.sh node scripts/render-inspect.mjs EFMP-407 2 --base https://textbook.com.pk (exit 0, 0 defects, desktop/360px/A4 artifacts)
---

## Prompt

investigate why crew is producing : Visual browser and print inspection (360px viewport, keyboard table scrolling, desktop layout, and A4 print view) could not be executed because the crew job brief explicitly prohibits running npm run build, a dev server, or Playwright (render-review command unperformed, exit code 1). Structural accessibility checks (alt text, heading hierarchy, link text, SVG role/title/desc, figure text measurement) pass from source, but visual accessibility remains unverified until a permitted browser/print inspection can be run on a live build.

## Response snapshot

Root cause: two contradicting rules. `scripts/crew/brief.mjs` (every job) forbids `npm run build`, a dev server and Playwright, while the G3/G5 contract (`scripts/lib/review-criteria.mjs` COMMANDS includes `render-review`; `validateReport` refuses a pass without it and a PNG) requires a real rendered and print inspection. `scripts/render-inspect.mjs` starts `npm run serve` unless given `--base`, and the review prompts never said how to reconcile the two. Result: 90 review files carry the limitation; every agent escalate has render-review exit 1; the intel distiller flagged it on 2026-10-21, 10-26, 11-01 and 11-06 without action.

Fix: the review_en / review_ur prompts now tell the reviewer to inspect the CI-built production deploy (`~/deploy/deployed-sha`) with `render-inspect.mjs --base https://textbook.com.pk --no-pdf` through `scripts/heavy.sh`, only when `git diff --quiet <deployed-sha> HEAD` over the unit's dirs and figures is empty; otherwise record render-review as unavailable naming both SHAs. Evidence stays in the sparse-excluded `renders-*` folder and is staged with `git add --sparse`. The brief's ban carries a narrow exception for that one command. Verified live on EFMP-407 U2.

## Outcome

- ✅ Impact: crew G3/G5 reviews can now produce real render-review evidence (exit 0 + PNGs), so a crew report can validate as `pass` instead of escalating on a missing render.
- 🧪 Tests: test:crew 116/116; manual render-inspect against production exit 0.
- 📁 Files: scripts/crew/crew.mjs, scripts/crew/brief.mjs, tests/crew/brief.test.mjs
- 🔁 Next prompts: watch the next review_en report for render-review exit 0 and PNGs in evidence_manifest.
- 🧠 Reflection: a recurring intel cluster seen four times is a signal to fix the brief, not to keep recording the limitation.

## Handoff (for CEO and agents)

- Shipped / changed: review jobs inspect the production build with `scripts/render-inspect.mjs --base https://textbook.com.pk --no-pdf` (heavy.sh) when the unit matches the deployed SHA.
- Decisions the team must respect: never run render-inspect without `--base` in a crew job (that path starts `npm run serve`); never build or serve the site; a unit that differs from the deployed SHA gets render-review "unavailable", not a guessed result. Gate scripts, review-criteria and the review-unit skill were deliberately not changed (hashed review inputs).
- Pending / next owner: owner merges this PR (protected scripts). Existing 90 reports remain history; the G3 desk `rendered_inspected` attestation still applies to them. Each review commits about 24 MB of PNGs under `renders-*`; if repo growth matters, a later change could screenshot viewport-only.
- Paperclip issues affected: none (crew intel cluster "visual browser and print inspection ... could not be executed because the crew job brief" is addressed).

## Evaluation notes (flywheel)

- Failure modes observed: contradictory standing instructions across brief and skill; intel candidates not promoted.
- Graders run and results (PASS/FAIL): test:crew PASS; live render-inspect PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): if reviews still escalate on render, check the deployed-SHA diff step (main may be ahead of deploy for ~5 min after merge).
