---
id: 2447
title: Reader shared column width and site redesign plan
stage: general
date: 2026-11-04
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/reader-shared-width
user: M Yousif Channa
command: none
labels: [board-direct, ui, ux, redesign]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/css/custom.css
  - tests/e2e/reader-width.spec.ts
tests:
  - tests/e2e/reader-width.spec.ts
  - tests/e2e/navigation.spec.ts
  - tests/e2e/handout-print.spec.ts
  - tests/e2e/search.spec.ts
  - npm run check:all
---

## Prompt

i want to redesign the website ui and ux what is the best way to do it, the content will remain the same, may change design, grafix, style, typograpy, icons logos, banners, backgrounds, light animations and other elements, proper research is needed. design ideas

i am inspired by the elements on https://alea.alevasquez.dev/

the main landing page should educate the new visitor about features of the project, opportunities for the visitor, clear intended audience, and prominent path for returning visitor. Just like a saas project landing page.

currently text on the desktop pages is not full width aligned which needs to be fixed

## Response snapshot

Audited the live site and source, researched references, and wrote an approved phased redesign plan.
Implemented its first step, PR 0: desktop reader text, headings, cards, tables and figures now share
one 860px column, and English list items are justified like paragraphs.

## Outcome

- ✅ Impact: right edges line up on desktop reader pages; previously text stopped about 224px short of the 1048px column at 1920px.
- 🧪 Tests: 20 full gates pass; 19 e2e tests pass; browser measurement at 1280, 1440 and 1920px on 7 EN and UR pages shows text within 1px of the column edge and no page overflow.
- 📁 Files: one CSS file, one new e2e spec, this PHR.
- 🔁 Next prompts: Phase 0 baseline, then the Phase 1 design canvas.
- 🧠 Reflection: the first check passed while skipping topic-page body text and hid a hydration jump; a measurement that returns null must fail, not pass.

## Handoff (for CEO and agents)

- Shipped / changed: shared `--reading-column` (53.75rem) on the doc container; removed `--reading-measure`; figures fill the column above 768px; tables fill it from 997px; justification extended to list items, on screens from 997px.
- Decisions the team must respect (owner rulings, 2026-11-04): one shared reader width of about 860px with justified lists. Redesign direction is a friendly learning app polished in the style of Alea, used as inspiration and not installed. Release 1 covers public pages and the reader; /app inherits colours and fonts only. Keep the name "Mega Textbook" with a new logo and Urdu wordmark. The landing page follows a SaaS structure and describes only what exists today. Keep brand green `#1f6f5c`, because it is figure token `--a1`.
- Pending / next owner: owner to merge this PR. Owner to confirm the facts landing copy depends on: footer organisation relationships, whether reviewer applications are public, whether the site may say it follows the official scheme and HEC guides, and whether signed-in accounts are free. Urdu lines run about 117 to 130 characters at this width, so the owner should review them on a real page.
- Paperclip issues affected: none (Paperclip retired; crew unaffected).

## Evaluation notes (flywheel)

- Failure modes observed: `html.docs-doc-page` drops briefly during hydration, so it is unsafe as a layout hook. A worktree symlinked to a stale `node_modules` failed the build on `qrcode-generator`.
- Graders run and results (PASS/FAIL): check:all PASS; Playwright reader-width, navigation, handout-print, search PASS. Not run: full e2e suite, axe, real-device test.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): use a CSS-module prefix selector or a wrapped component for any later reader layout hook.
