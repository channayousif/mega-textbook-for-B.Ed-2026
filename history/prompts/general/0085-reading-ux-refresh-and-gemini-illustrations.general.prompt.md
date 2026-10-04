---
id: 0085
title: Reading UX refresh and Gemini illustrations
stage: general
date: 2026-10-04
surface: agent
model: claude-opus-5-5
feature: none
branch: ux/gemini-illustrations
user: M Yousif Channa
command: free-form request, then plan mode
labels: ["ux", "reading-experience", "illustrations", "gemini", "agy", "paywall-deferral", "adr-0029"]
links:
  spec: null
  ticket: null
  adr: history/adr/0029-gemini-agy-raster-illustration-producer.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/89, https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/90
files:
 - src/pages/index.tsx (PR #89)
 - src/pages/contact.mdx (PR #89)
 - i18n/ur/code.json (PR #89)
 - src/rehype/topic-enhance.mjs (PR #90)
 - src/css/custom.css (PR #90)
 - docusaurus.config.ts (PR #90)
 - history/adr/0029-gemini-agy-raster-illustration-producer.md
 - history/adr/0024-capability-based-claude-and-codex-visual-authoring.md
 - CLAUDE.md
 - scripts/generate-illustration.mjs
 - .claude/skills/generate-figures/references/raster-codex-handoff.md
 - specs/content/efmp-302/figures/unit-01.md
 - specs/content/efmp-302/figures/unit-01-banner.md
 - docs/semester-1/efmp-302/unit-01/{index,topic-01..04}.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-01/{index,topic-01..04}.mdx
 - static/img/figures/efmp-302/unit-01/fig-U1-{9..13}.webp
tests:
 - agy headless generate_image spike (PASS, 1376x768 PNG, ~56s)
 - rehype plugin dry run over 145 EN + 128 UR topic files (0 failures, 0 unmatched headings)
 - npm run check:content (figures, pipeline-gate, no-em-dash, no-answer-keys and others PASS; content-status needs a build artefact)
 - local npm run build + Playwright screenshots (EN, UR RTL, dark, 400px mobile)
 - CI build + e2e on PRs #89 and #90 (PASS, merged)
---

## Prompt

deffer the paywall for now, and focus on refining the ui/ux, reading the text alone feels dry experience, find ways to generate images with my gemini pro account, i dont know either agy (already authenticated on my pro account) can generate images.

(Follow-up answers: hide paywall entry points only; illustrations as both unit banners and topic opening scenes; all four UX areas - typography and layout, callout boxes, interactive checks, progress and navigation - following the TU Delft interactive textbooks (https://books.open.tudelft.nl/home/catalog/category/interactive-textbooks, https://interactivetextbooks.tudelft.nl/open-textbooks-demonstration/, https://interactivetextbooks.tudelft.nl/linear-algebra/, repo https://gitlab.tudelft.nl/opentextbooks/open-textbooks-demonstration/) and check whether the tech stack needs an upgrade. Then: yes, create the image ADR; merge each PR when CI is green.)

## Response snapshot

Verified that `agy` 1.2.16 has a built-in `generate_image` tool and that a headless call on the owner's Google Pro account returns a culturally accurate classroom PNG. Stack verdict: Docusaurus 3.10 + MDX covers every TU Delft feature; no migration or major upgrade. Shipped PR #89 (paywall entry points hidden; also fixed a 404 on the landing CTA) and PR #90 (rehype plugin that styles the nine-part topic cycle - section cards, misconception/worked-example/rubric callouts, Bloom chips - plus reading typography, with no content-file edits). Created ADR-0029 (Gemini via agy as raster producer, amends ADR-0024) with owner consent, `scripts/generate-illustration.mjs`, and piloted EFMP-302 Unit 1: one banner and four topic scenes, two of which were rejected on inspection for India-shaped wall maps and regenerated after adding a no-maps rule to the house style. Banners live in a sidecar manifest because editing `check-figures.mjs` would invalidate every unit's validator-bound review evidence.

## Outcome

- ✅ Impact: topic pages gain visual structure site-wide; first five AI illustrations live in the pilot unit; repeatable Gemini pipeline in place.
- 🧪 Tests: gates and CI listed above; visual checks by screenshot.
- 📁 Files: see list above.
- 🔁 Next prompts: roll illustrations out unit by unit; Phase 2c (interactive answer notes, reading progress, next-topic cards, dyslexia and high-contrast toggles).
- 🧠 Reflection: generated images must be inspected for political and cultural details (maps, flags) that a prompt does not mention; validator scripts are hashed into review evidence, so gate changes have a repository-wide blast radius.

## Evaluation notes (flywheel)

- Failure modes observed: one optimiser budget overrun (fixed with a 1200 px retry); two images with India-shaped maps (fixed with a house-style exclusion); first gate change invalidated 39 units' review evidence (reverted in favour of a sidecar manifest).
- Graders run and results (PASS/FAIL): check:figures PASS, check:pipeline-gate PASS, check:no-em-dash PASS, CI PASS.
- Prompt variant (if applicable): house style v2 with no maps, flags or emblems.
- Next experiment (smallest change to try): batch one more unit and measure the rejection rate before scaling.
