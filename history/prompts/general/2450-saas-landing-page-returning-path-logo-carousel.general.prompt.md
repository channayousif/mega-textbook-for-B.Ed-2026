---
id: 2450
title: SaaS landing page, returning-visitor path and logo carousel
stage: general
date: 2026-11-04
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/landing-page
user: M Yousif Channa
command: none
labels: [board-direct, ui, ux, redesign, landing]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/442
files:
  - src/pages/index.tsx
  - src/components/landing/
  - src/components/LogoCarousel/
  - src/lib/lastRead.ts
  - src/theme/DocItem/Content.tsx
  - src/theme/Footer/index.tsx
  - docusaurus.config.ts
tests:
  - tests/e2e/landing.spec.ts
  - npm run check:all
---

## Prompt

ok move on.

## Response snapshot

Built the approved canvas as the real landing page in English and Urdu, with the returning-visitor strip, new navbar and footer, and an auto-revolving partner logo carousel at the end of every page.

## Outcome

- ✅ Impact: the home page now explains the features, audiences and opportunities, and gives returning visitors a direct path.
- 🧪 Tests: 5 new landing e2e tests pass; check:all passed before the last two carousel fixes, then build, unit tests and landing e2e were rerun on the final code.
- 📁 Files: landing page, carousel, last-read helper, config, Urdu strings.
- 🔁 Next prompts: catalogue and reader PRs.
- 🧠 Reflection: measuring the loop at its last frame found two carousel bugs a screenshot would have missed.

## Handoff (for CEO and agents)

- Shipped / changed: new home page; welcome strip by role or last-read page; navbar with Features, Teachers, Institutions and Start reading; footer columns; "Supporting:" logo carousel with pause. Landing counts come from the build, never by hand.
- Decisions the team must respect: describe only what exists today. Say "free to read today", not "free forever". Last-read stays in localStorage only. About and Contact moved from the navbar to the footer.
- Pending / next owner: owner to merge #441 first, then this PR. Later: mega menu, real product-tour screenshots, new hero art, audience links that open the right tab.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: the logo band was narrower than its loop, and unloaded lazy images collapsed its width. self-assessment-checklist failed once under load against live Supabase, then passed alone.
- Graders run and results (PASS/FAIL): landing e2e PASS; unit tests PASS; axe clear on the landing page. Not run: full e2e suite, Lighthouse under slow 4G, a signed-in strip in a browser.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): add signed-in student and teacher strip tests with seeded accounts.
