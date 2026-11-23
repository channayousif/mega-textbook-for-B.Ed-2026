---
id: 20261194
title: Add a dismissible sign-up banner to the homepage
stage: general
date: 2026-11-24
surface: agent
model: longcat/LongCat-2.5-Preview
feature: none
branch: feat/home-cta-banner
user: M Yousif Channa
command: (chat, plan mode)
labels: ["board-direct", "landing", "cta", "auth", "localStorage"]
links:
  spec: null
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/747
files:
  - src/lib/homeCta.ts
  - src/components/landing/HomeCtaBanner.tsx
  - src/components/landing/HomeCtaBanner.module.css
  - src/components/landing/copy.ts
  - src/pages/index.tsx
  - src/components/landing/landing.module.css
  - tests/unit/home-cta.test.mjs
  - tests/e2e/home-cta.spec.ts
  - history/prompts/general/20261194-home-cta-banner.general.prompt.md
tests:
  - npx tsc --noEmit
  - npm run check:content
  - npm run check:all
  - npm test
  - npm run test:e2e -- tests/e2e/home-cta.spec.ts
  - npm run test:e2e -- tests/e2e/read-bilingual.spec.ts
---

## Prompt

i want to add a popup banner on my homepage for CTA asking for signup/signin for enjoying free benefits with small close button.

Follow-up answers to the clarifying questions: a slim fixed bottom banner rather than a modal; signed-out visitors only; remember the dismissal on the device in localStorage; appear after a short delay of about 1.5 seconds.

## Response snapshot

Added a homepage-only sign-up invitation. A signed-out visitor sees a slim fixed bottom banner after about 1.5 seconds, with a "Sign up free" button, a "Sign in" link and a small close button. The buttons use the same `loginUrlWithReturnTo` helper and plain anchors as the navbar auth widget, so the visitor returns to the homepage after authenticating. Closing the banner stores a versioned dismissal flag in localStorage, and the banner stays away on that device. Signed-in visitors never see it. The banner is client-only, so it is absent from the static HTML, and it carries the homepage's bilingual copy in both locales.

## Outcome

- ✅ Impact: the homepage now invites signed-out visitors to create a free account or sign in, without blocking the reading, and the choice is remembered on the device.
- 🧪 Tests: `npm run test:e2e -- tests/e2e/home-cta.spec.ts` 7/7 pass; `npm run test:e2e -- tests/e2e/read-bilingual.spec.ts` 4/4 pass; `npm test` 570/570 pass; `npm run check:content` 14/14 pass; `npm run build` passes with `NODE_OPTIONS=--max-old-space-size=4096`. `npm run check:all` passed every gate it reached (18 of 20, including `test` and `test:review`); the `build` gate was interrupted by two session restarts but was verified separately, and `check:no-service-key` passes.
- 📁 Files: `src/lib/homeCta.ts`, `src/components/landing/HomeCtaBanner.tsx`, `src/components/landing/HomeCtaBanner.module.css`, `src/components/landing/copy.ts`, `src/pages/index.tsx`, `src/components/landing/landing.module.css`, `tests/unit/home-cta.test.mjs`, `tests/e2e/home-cta.spec.ts`, and this PHR.
- 🔁 Next prompts: owner review of the banner on a phone and in Urdu, and a ruling on whether a sign-up or sign-in click should also suppress future shows.
- 🧠 Reflection: the banner needed plain anchors rather than Docusaurus `Link`, because `Link` prefixes the locale baseUrl and adds a trailing slash to the auth URLs. Reading the Supabase env at test time, not module load, was also necessary because dotenv populates `process.env` after Playwright imports the spec.

## Handoff (for CEO and agents)

- Shipped / changed: a dismissible homepage sign-up banner (EN and UR), a versioned localStorage dismissal helper, six bilingual copy keys, a focus move to `main` on dismiss, and unit plus e2e coverage.
- Decisions the team must respect: fixed bottom banner with no backdrop; signed-out visitors only; versioned key `home-cta.dismissed.v1`; client-only render; dismissal is device-level across locales; only the close button remembers dismissal. Do not replace the plain anchors with Docusaurus `Link` for these auth URLs without re-checking the hrefs.
- Pending / next owner: owner review of the rendered banner on 360 px and in the Urdu RTL layout, and the Urdu copy. The pre-existing `landing.spec.ts` partner-logos failure is unrelated (the NewsTicker's `.track` shadows the logo carousel's track in the spec's locator) and was not addressed here.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: Docusaurus `Link` normalises auth hrefs; Playwright specs that read `process.env` at module load see an empty value because dotenv runs later in the worker; the local build needs `NODE_OPTIONS=--max-old-space-size=4096`; `static/content-status.json` is stale on a fresh checkout and blocks the Docusaurus config until `npm run build:content-status` is run.
- Graders run and results (PASS/FAIL): `npm test` PASS (570/570); `npm run check:content` PASS (14/14); focused homepage CTA e2e PASS (7/7); bilingual e2e PASS (4/4); `npm run build` PASS; `npm run check:all` PASS on 18 gates reached, `build` verified separately, `check:no-service-key` PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): seed the dismissal flag in `landing.spec.ts` before it clicks the logo pause button, so the fixed banner cannot intercept the click on a loaded host.
