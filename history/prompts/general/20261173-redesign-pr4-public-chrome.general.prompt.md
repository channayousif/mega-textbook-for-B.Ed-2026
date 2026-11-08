---
id: 20261173
title: Redesign PR 4 covers, header logo, footer and public pages; merge PRs 1 to 3
stage: general
date: 2026-11-08
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/redesign-public
user: M Yousif Channa
command: none
labels: [board-direct, redesign, catalogue, navbar]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - scripts/design/course-covers.mjs
  - package.json
  - .gitignore
  - src/components/CourseCatalog/index.tsx
  - src/components/CourseCatalog/styles.module.css
  - src/theme/Navbar/Logo/index.tsx
  - src/css/tokens.css
  - docusaurus.config.ts
  - static/img/patterns/steps-divider.svg
tests:
  - npx tsc --noEmit
  - npm run build
  - npm run check:all
---

## Prompt

Change the video mark, continue merge  PR 1 2 3, move to next

merge on gree, move on

## Response snapshot

Video mark: video-studio/brand/brand-bible.yaml now points at the kit v2 square mark (static/img/brand/favicon.svg) and the v2 horizontal logo (its old full-logo target, static/img/logo.svg, no longer existed); the v1 static/img/favicon.svg is removed. Added to PR #485 before merge. Merged #485 and #486 with admin rights (the owner's instruction covers the merge; branch protection requires a review the owner's own account cannot give; all CI checks passed, and the combined PR 1 plus PR 2 result had passed CI and 20/20 local gates inside #487). #487 needed main merged in after the stacked branches; CI re-running before its merge. Then PR 4: per-course covers drawn from real titles for all 21 catalogue courses by a script that runs before every build and start (six new motifs: GICP-400, EFMP-407, EFPG-401, GUHQ-301, EFMP-408, EFPG-607; family fallback for future courses), the catalogue cards using them, the header showing the bilingual logo at 90px at the top of wide pages and the horizontal logo once scrolled or on phones, a deeper teal footer with an amber top edge and the bilingual logo at 96px, and the amber step and step divider on the About, Contact and Privacy headings.

## Outcome

- ✅ Impact: PRs 1 and 2 live; catalogue and chrome take the v2 look.
- 🧪 Tests: tsc clean for changed files; npm run check:all 19/20 first run, check:content-status failed on the stale git-ignored status file and passed after regenerating it (no tracked change); screenshots of header at top and scrolled, phone, catalogue EN and UR dark, About, Contact UR and footer checked by eye.
- 📁 Files: cover script, catalogue, header logo, footer, Markdown page headings.
- 🔁 Next prompts: PR 5 reader chrome.
- 🧠 Reflection: ThemedImage's own display rule beat a class on the img, so the logo swap toggles wrapper spans; the RTL build flips left and right positions itself, so no explicit Urdu position rules.

## Handoff (for CEO and agents)

- Shipped / changed: static/img/covers/ is generated (git-ignored) by scripts/design/course-covers.mjs from catalog/courses.json in prebuild and prestart; a new course gets a family fallback cover until someone draws its motif in that script. Header: html[data-nav-scrolled] marks the shrunk state; course pages always use the compact logo so topic titles stay near the top.
- Decisions the team must respect: covers carry no maps, flags or script (ADR-0033); the bilingual logo is never shown under 360px wide (90px tall); do not add explicit html[dir='rtl'] rules that mirror positions or rotations, because the RTL build already does.
- Pending / next owner: owner review and merge of PR 4; Urdu wording on PR 3 still awaits review.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: CI e2e (reader-chrome.spec.ts) caught topic titles pushed below 190px by the tall header; course pages (html.plugin-docs) now keep the compact logo, and 17 affected e2e tests pass locally. GitHub reported the stacked PR 3 as conflicting after PRs 1 and 2 merged although git merged it cleanly; merging main into the branch fixed it.
- Graders run and results (PASS/FAIL): build PASS; screenshots checked.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): stack fewer PRs, or merge main into stacked branches right after each parent merges.
