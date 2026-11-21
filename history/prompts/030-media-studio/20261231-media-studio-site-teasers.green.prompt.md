---
id: 20261231
title: Media Studio public teasers on the site
stage: green
date: 2026-11-21
surface: agent
model: claude-opus-5-5
feature: 030-media-studio
branch: 030-media-studio-us5
user: M Yousif Channa
command: none
labels: [board-direct, media-studio, site]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - scripts/build-studio-index.mjs
  - docusaurus.config.ts
  - src/components/Studio/TeaserPlayer.tsx
  - src/components/Studio/teaser.module.css
  - src/components/Studio/StudioPanel.tsx
  - src/theme/DocItem/Content.tsx
  - src/components/CourseCatalog/index.tsx
  - src/components/CourseCatalog/styles.module.css
  - tests/unit/studio-index-teasers.test.mjs
  - tests/e2e/course-teaser.spec.ts
  - specs/030-media-studio/tasks.md
tests:
  - scripts/heavy.sh npm run build (pass; 7 public teasers in the studio index)
  - npx playwright test tests/e2e/course-teaser.spec.ts against the served build (4 pass)
  - npx vitest run (49 files, 532 tests pass)
  - tsc: no errors in the changed files
  - screenshots checked: overview desktop, phone and Urdu; catalogue cards; dialog
---

## Prompt

will merge on green #676, continue with stage 5

## Response snapshot

Finished Feature 030 US5 (T038-T043). build-studio-index.mjs adds `teasers` by course code, only for
ledger items in state `public` with a valid video id, Urdu first. docusaurus.config.ts reads them at
build time into customFields.courseTeasers, so the overview block and catalogue button are in the
static HTML. TeaserPlayer is a 9:16 facade (YouTube poster and play button) that loads the
youtube-nocookie iframe only after a tap, with no layout shift; CourseTeaser renders on course
overview pages (Urdu teaser on both locales); TeaserButton opens it in a native dialog on catalogue
cards (Escape and the close button close it). Build passed with a 4 GB heap after the default heap
ran out; the Playwright spec passes 4/4 and the screenshots look right.

## Outcome

- ✅ Impact: the seven public teasers play on their course overview pages and from the catalogue cards; private Shorts never appear.
- 🧪 Tests: vitest 532/532 (2 new), Playwright 4/4, build pass.
- 📁 Files: studio index builder, config field, TeaserPlayer + CSS, overview and catalogue wiring, tests.
- 🔁 Next prompts: Polish (T044-T047): merged media-studio skill, docs pointers, social-post on the shared ledger, closing verification.
- 🧠 Reflection: `pkill -f` with the server's command line also matched the calling shell; kill by PID next time.

## Handoff (for CEO and agents)

- Shipped / changed: course teaser on overview pages and a Teaser button on catalogue cards, driven by the teaser ledger at build time.
- Decisions the team must respect: only ledger state `public` reaches the site; the iframe loads only after a tap (no YouTube request on page load); teasers are Urdu on both locales (D-2026-0083).
- Pending / next owner: owner merges #674, #675 and this PR in order; Claude continues with Polish.
- Paperclip issues affected: none (crew era).

## Evaluation notes (flywheel)

- Failure modes observed: local build heap OOM at the default limit (about 2 GB); headless YouTube embed shows a bot check from the server IP (not a site defect).
- Graders run and results (PASS/FAIL): build PASS; Playwright PASS; vitest PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): add the teaser to the course card's cover image as the poster for courses with one.
