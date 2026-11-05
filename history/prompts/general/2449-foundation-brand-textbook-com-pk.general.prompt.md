---
id: 2449
title: Foundation PR with logo kit, fonts, colours and textbook.com.pk rename
stage: general
date: 2026-11-04
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/foundation-brand
user: M Yousif Channa
command: none
labels: [board-direct, ui, ux, redesign, brand]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/441
files:
  - src/css/tokens.css
  - src/css/custom.css
  - src/theme/Navbar/Logo/index.tsx
  - src/lib/brand.ts
  - docusaurus.config.ts
  - static/img/brand/
  - static/fonts/
tests:
  - npm run check:all
  - tests/e2e/navigation.spec.ts
  - tests/e2e/handout-print.spec.ts
  - tests/e2e/reader-width.spec.ts
  - tests/e2e/search.spec.ts
  - tests/e2e/self-assessment-checklist.spec.ts
---

## Prompt

use Logo i have made /home/a2ahs/mega_book_for_B.Ed/docs/textbook-logo-kit.zip, Nunito: rounded and friendliest, dots is ok for now, change "Working with" to "supporting:"

Use textbook.com.pk , need Noto Naskh Arabic: small text, small text is low contrast, increase contrast or make it adjustable, Make a carousel of logos at the end of page auto revolving

ok move on.

## Response snapshot

Updated the private design canvas with the owner's choices, then built the foundation PR: logo kit, favicons, social card, kit colours, Nunito, Noto Naskh Arabic for Urdu small text, stronger small-text contrast, motion tokens, and the site rename to textbook.com.pk.

## Outcome

- ✅ Impact: every page takes the new brand. Urdu headings now render in Nastaliq instead of a system fallback. Remaining axe contrast and link findings on the scanned pages are cleared.
- 🧪 Tests: 20 full gates pass; 20 e2e tests pass; axe on 7 pages in light and dark leaves 3 older rule types (listed below).
- 📁 Files: CSS tokens, navbar logo, brand assets, two fonts, rename across config, pages, guides and Urdu chrome.
- 🔁 Next prompts: PR 4a landing page, including the logo carousel.
- 🧠 Reflection: Infima draws headings through its own font variables, so setting font-family on html never reached them.

## Handoff (for CEO and agents)

- Shipped / changed: site chrome uses deep ink #102B35, jade #087C6B and mint #77E2C1 on a warm ground. English headings use Nunito. Urdu headings and reading text use Noto Nastaliq Urdu Regular; Urdu small text uses Noto Naskh Arabic. Links in running text are underlined. Print button and Sign in are translated.
- Decisions the team must respect (owner, 2026-11-04): the site is textbook.com.pk, and درسی کتابیں in Urdu page titles. The logo comes from the owner's kit. Partner logos are labelled "Supporting:" and will revolve in a carousel at the end of the landing page, with a pause control. Figures keep token --a1 #1f6f5c; do not edit scripts/lib/figure-palette.mjs to follow site colours.
- Pending / next owner: owner to merge. Claude: PR 4a landing page. Owner: the guest-feedback email in supabase/functions/guest-feedback-submit still says "B.Ed Mega Textbook"; it needs a separate function deploy. Older axe findings left for PR 7: self-assessment checkbox labels and the footer-logos landmark. The home heading-order finding goes with the old homepage in PR 4a.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: white text on the mint primary in dark mode failed at 1.56:1; caught by axe and by eye.
- Graders run and results (PASS/FAIL): check:all PASS; Playwright five specs PASS; axe partial, see above. Not run: full e2e suite, real device, Windows fonts.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): add an axe contrast check for public pages in both themes to CI.
