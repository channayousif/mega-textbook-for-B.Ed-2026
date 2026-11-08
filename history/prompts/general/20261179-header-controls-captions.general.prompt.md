---
id: 20261179
title: Language toggle, Text and display button, and gallery captions
stage: general
date: 2026-11-08
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/header-controls
user: M Yousif Channa
command: none
labels: [board-direct, redesign, accessibility]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/components/LanguageToggle.tsx
  - src/components/LanguageToggle.module.css
  - src/components/LanguageToggleNavbarItem.tsx
  - src/theme/NavbarItem/ComponentTypes.tsx
  - src/components/MobileTopBarWidgets.tsx
  - docusaurus.config.ts
  - src/components/ReadingTools.tsx
  - src/components/ReadingTools.module.css
  - src/pages/index.tsx
  - src/components/landing/copy.ts
tests:
  - npx tsc --noEmit
  - npm run build
  - npx playwright test reader-chrome handout-print landing navigation read-bilingual
  - npm run check:all
---

## Prompt

1. ok
2 yes
3. yes
4. All dashboards need proper redesign, optimized for user accessibility and smooth operations (UI/UX) (inspired by https://demos.themeselection.com/materio-mui-nextjs-admin-template-free/demo), the language selector icon and reading tools icon "Aa" need a fresh self explainatory looks
5. udu looks fine

## Response snapshot

Owner chose (2026-11-08) a segmented EN | اردو toggle and an icon plus "Text & display" for the reading button. The toggle replaces the stock locale dropdown on wide screens and the text pill in the phone bar: both languages always visible, the current one a teal span with aria-current, the other a link to the same page in that language; the drawer keeps a plain menu link. The reading button shows the text-size icon and "Text & display" ("متن اور ڈسپلے") on a tinted pill, turning teal when open, stacked icon over label in the phone bottom bar; its accessible name starts with the visible words and keeps "Reading options" for the e2e specs; the panel markup is unchanged. Gallery captions now say "Inspired by EFMP-301" ("EFMP-301 سے ماخوذ") for the seven site scenes; the two published textbook figures keep plain course captions.

## Outcome

- ✅ Impact: the two most used reader controls say what they do; the gallery no longer implies site art is in the textbooks.
- 🧪 Tests: tsc clean; build PASS; 29 e2e tests in five affected specs PASS locally; screenshots of the bar EN light and UR dark, the open panel, phone bars EN and UR, and the gallery; check:all see PR.
- 📁 Files: toggle component and navbar item, phone bar, reading menu, landing captions.
- 🔁 Next prompts: PR C, the app foundation for the dashboard rebuild.
- 🧠 Reflection: a first screenshot caught "اردو" mid font swap with unjoined letters; a second after document.fonts.ready showed it correct.

## Handoff (for CEO and agents)

- Shipped / changed: `custom-languageToggle` navbar item; `LanguageToggle` (compact on phones); ReadingMenu button label "Text & display".
- Decisions the team must respect: keep "Reading options" in the reading button's accessible name (e2e); keep the visible label first in it (WCAG label in name); the current language is never a link.
- Pending / next owner: none.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none in the product.
- Graders run and results (PASS/FAIL): e2e PASS; build PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): none.
