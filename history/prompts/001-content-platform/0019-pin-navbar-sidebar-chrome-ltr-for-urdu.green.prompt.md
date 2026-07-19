---
id: 0019
title: Pin navbar/sidebar chrome LTR for Urdu locale
stage: green
date: 2026-07-19
surface: agent
model: claude-sonnet-5
feature: 001-content-platform
branch: main
user: channayousif@gmail.com
command: null
labels: ["rtl", "css", "i18n", "rtlcss", "production-deploy"]
links:
  spec: specs/001-content-platform/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - src/css/custom.css
tests:
 - "PASS: npx playwright test (against production build) — 12/12 non-skipped, including read-bilingual.spec.ts's RTL + parity checks"
 - "Verified live: docRoot/navbar computed direction=ltr on www.a2ahs.com/ur/; article computed direction=rtl on a real translated content page"
---

## Prompt

ur site has menu on right side. keep it on the left side as in eng site left aligned

## Response snapshot

Screenshotted both locales' homepages first rather than guessing which "menu" was meant —
confirmed the Urdu site fully mirrors the English layout: sidebar and brand move to the visual
right, navbar controls (locale dropdown, search, sign-in) move to the visual left. This is
Docusaurus/Infima's standard RTL behavior (flexbox `row` direction is direction-aware under
`dir="rtl"`), not a bug — but the owner wants the navigation chrome pinned to the same physical
position as English regardless of locale, with only the Urdu prose itself reading RTL.

First attempt (`direction: ltr` on `.navbar__inner` and the sidebar's flex parent, re-asserting
`direction: rtl` on `<main>` to protect the actual content) produced the *opposite* of the
intended result when verified: `docRoot` came back `rtl`, `main` came back `ltr` — inverted.
Root cause: Docusaurus builds the `ur` locale by running the *entire* compiled stylesheet
through `rtlcss`, which auto-mirrors every directional value in the CSS — including custom rules
written here, silently flipping `ltr`↔`rtl` and canceling out the fix in the actual `ur` build
output (confirmed by diffing `build/assets/css/*.css` against the separate `build/ur/assets/css/*.css`
— two entirely different compiled stylesheets, one per locale).

Fixed by adding rtlcss's own `/*rtl:ignore*/` escape-hatch comment (verified via Context7 against
rtlcss's actual docs, not assumed) immediately before each of the three rules, so they pass
through the mirroring step unflipped and apply exactly as authored in the built `ur` CSS.
Verified computed `direction` in a real browser this time before redeploying: `docRoot`/`navbar`
= `ltr`, `main`/`article` = `rtl` — both directions correct simultaneously.

## Outcome

- ✅ Impact: the Urdu site's navigation chrome (sidebar, navbar item order) now matches the
  English site's fixed left/right arrangement, while real Urdu prose (headings, paragraphs,
  bullet lists, TOC) continues to render correctly right-to-left — verified both in a local
  build and live on `www.a2ahs.com/ur/`.
- 🧪 Tests: full e2e suite against the actual production build, 12/12 non-skipped passing,
  including the RTL-specific test (`read-bilingual.spec.ts`, 990ms, under the 2s SC-001 budget)
  and the EN/UR heading-parity check.
- 📁 Files: `src/css/custom.css` only.
- 🔁 Next prompts: none required.
- 🧠 Reflection: the first fix attempt looked correct by inspection (the CSS rules said what I
  intended) but was verified wrong the moment a real computed-style check ran — a reminder that
  "the CSS I wrote is in the stylesheet" is not the same claim as "the CSS applies as intended in
  the specific build that ships," especially in a codebase with a per-locale build step that
  transforms the entire stylesheet. Caught before deploying by checking computed values in an
  actual browser rather than trusting the source CSS.

## Evaluation notes (flywheel)

- Failure modes observed: first implementation was inverted by an automatic build-time CSS
  transform (rtlcss) that wasn't previously in view — a class of bug specific to any build
  pipeline with a locale-aware post-processing step. Caught immediately by verifying computed
  styles rather than assuming the authored CSS took effect.
- Graders run and results (PASS/FAIL): e2e suite (production build) 12/12 non-skipped PASS.
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): whenever adding a directional (`direction`,
  `left`/`right`, `margin-left`/`margin-right`, etc.) override in this codebase going forward,
  check the *built* `ur` locale CSS output directly rather than assuming the `en` build's
  compiled CSS represents both locales — they are two separate compiled stylesheets here.
