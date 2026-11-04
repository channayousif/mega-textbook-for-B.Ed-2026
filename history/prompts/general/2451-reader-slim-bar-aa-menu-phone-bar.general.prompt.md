---
id: 2451
title: Reader slim bar, Aa menu, phone bar and section icons; carousel on landing only
stage: general
date: 2026-11-04
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/reader-chrome
user: M Yousif Channa
command: none
labels: [board-direct, ui, ux, redesign, reader]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/443
files:
  - src/components/ReadingTools.tsx
  - src/components/ReaderBottomBar.tsx
  - src/components/CourseNavBar/index.tsx
  - src/theme/DocItem/Content.tsx
  - src/css/tokens.css
  - tests/e2e/reader-chrome.spec.ts
tests:
  - tests/e2e/reader-chrome.spec.ts
  - npm run check:all
---

## Prompt

remove REEC logo for now, i'll add later, carousel on only first page, continue

## Response snapshot

Removed REEC and limited the carousel to the landing page on PR #442. Then rebuilt the reader's top area: one slim course bar, an Aa menu for reading tools and print, a phone bottom bar and section icons.

## Outcome

- ✅ Impact: the desktop title moved from about y=312 to y=146, and phone readers get controls within thumb reach.
- 🧪 Tests: check:all passes 20 of 20; 29 e2e tests pass.
- 📁 Files: reading menu, bottom bar, course bar, tokens, print tests.
- 🔁 Next prompts: course catalogue and the /intro page.
- 🧠 Reflection: the course bar also renders on generated category pages with no doc context, which only a full build reveals. A shell echo also hid one failed build, so exit codes must be read directly.

## Handoff (for CEO and agents)

- Shipped / changed: print moved into the Aa menu; `<PrintHandout />` in MDX stays in the files but is hidden on screen. Bar labels are short and carry the full name as the accessible label.
- Decisions the team must respect (owner, 2026-11-04): the logo carousel is on the landing page only. REEC stays out until the owner supplies a better logo; `static/img/logos/reec.png` stays in the repo.
- Pending / next owner: owner to merge #442, then this PR. Claude: catalogue PR. The nine-step topic map from the plan was left out, because the page contents list and progress bar already cover it and its labels would be long.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: useDoc throws on generated index pages; a fixed-width panel overflowed a phone.
- Graders run and results (PASS/FAIL): check:all PASS; Playwright six specs PASS. Not run: full e2e suite, real device, Lighthouse.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): add the new reader and landing specs to any smoke subset.
