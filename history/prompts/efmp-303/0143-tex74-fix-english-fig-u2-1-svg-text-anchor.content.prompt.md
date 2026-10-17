---
id: 0143
title: Fix English fig-U2-1.svg text-anchor in EFMP-303 Unit 2
stage: content
date: 2026-10-15
surface: agent
model: gemini-3.8-flash
feature: efmp-303
branch: agent/TEX-74
user: M Yousif Channa
command: /paperclip-weblead
labels: ["weblead", "paperclip", "tex-74", "efmp-303", "figures"]
links:
  spec: specs/content/efmp-303/content-spec.md
  ticket: TEX-74
  adr: null
  pr: null
files:
  - static/img/figures/efmp-303/unit-02/fig-U2-1.svg
  - static/img/figures/efmp-303/unit-02/fig-U2-1.dark.svg
  - history/prompts/efmp-303/0143-tex74-fix-english-fig-u2-1-svg-text-anchor.content.prompt.md
tests:
  - npm run figures:variants
  - node scripts/check-figures.mjs
  - node scripts/measure-figure-text.mjs
  - scripts/heavy.sh npm run build
---

## Prompt

Fix English fig-U2-1.svg text-anchor (EFMP-303 Unit 2).
Defect: static/img/figures/efmp-303/unit-02/fig-U2-1.svg sets text-anchor="major" on its title element. "major" is not a valid SVG attribute value, so the title renders start-anchored at x=390 and runs off to the right instead of centring.
Fix: In static/img/figures/efmp-303/unit-02/fig-U2-1.svg, change text-anchor="major" to text-anchor="middle". The Urdu mirror (fig-U2-1.ur.svg) already uses middle correctly; match it.
Do not:
- Do not touch any Urdu file (i18n/ur/...).
- Do not touch English content under docs/ (schematic asset only).
- Do not change id, kind, width, height, or alt on any figure reference.
Verify:
npm run check:content
npm run check:figures
scripts/heavy.sh npm run build
Commit on a new branch (not agent/TEX-40), open a draft PR.

## Response snapshot

Executed the figure defect fix on branch `agent/TEX-74`:
1. Updated `static/img/figures/efmp-303/unit-02/fig-U2-1.svg`, replacing invalid attribute `text-anchor="major"` with `text-anchor="middle"`.
2. Ran `npm run figures:variants` to regenerate `static/img/figures/efmp-303/unit-02/fig-U2-1.dark.svg` from the updated light SVG source, maintaining token and variant consistency.
3. Verified figure text geometry and bounds using `node scripts/measure-figure-text.mjs` on both light and dark variants.
4. Verified `check-figures.mjs` reports 0 findings for EFMP-303.
5. Ran full site build via `scripts/heavy.sh npm run build` which succeeded cleanly for both `en` and `ur` locales.

## Outcome

- ✅ Impact: Title element in EFMP-303 Unit 2 English schematic `fig-U2-1.svg` (and derived dark variant) is properly centred at x=390 with valid SVG attribute `text-anchor="middle"`.
- 🧪 Tests: `measure-figure-text.mjs` PASS, `check-figures.mjs` (0 EFMP-303 findings), `scripts/heavy.sh npm run build` PASS (both locales).
- 📁 Files: `static/img/figures/efmp-303/unit-02/fig-U2-1.svg`, `static/img/figures/efmp-303/unit-02/fig-U2-1.dark.svg`, and this PHR.
- 🔁 Next prompts: Open draft PR against `agent/TEX-40`, update Paperclip issue TEX-74 to `in_review`.
- 🧠 Reflection: Validating both light and dark variants with automated build-figure-variants ensures dark mode never drifts from light source edits.

## Handoff (for CEO and agents)

- Shipped / changed: `fig-U2-1.svg` and `fig-U2-1.dark.svg` title `text-anchor="middle"`.
- Decisions the team must respect: English schematic title is now centred matching Urdu mirror.
- Pending / next owner: Board / PR review for merge into `agent/TEX-40`.
- Paperclip issues affected: [TEX-74](/TEX/issues/TEX-74), parent [TEX-63](/TEX/issues/TEX-63).

## Evaluation notes (flywheel)

- Failure modes observed: None.
- Graders run and results (PASS/FAIL): check-figures PASS for EFMP-303; build PASS en+ur.
- Prompt variant (if applicable): None.
- Next experiment: None.
