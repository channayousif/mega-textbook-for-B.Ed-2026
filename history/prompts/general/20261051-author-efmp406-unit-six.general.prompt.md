---
id: 20261051
title: Author EFMP406 Unit Six
stage: general
date: 2026-11-02
surface: agent
model: GPT-6 Codex
feature: content EFMP-406 Unit 6
branch: crew/efmp-406-u06-author
user: crew owner
command: Read .crew/brief.md and carry it out
labels: ["codex", "efmp-406-u06-author", "content"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/efmp-406/unit-06/index.mdx
  - docs/semester-3/efmp-406/unit-06/topic-01.mdx
  - docs/semester-3/efmp-406/unit-06/topic-02.mdx
  - docs/semester-3/efmp-406/unit-06/unit-assessment.mdx
  - docs/semester-3/efmp-406/unit-06/unit-teacher-notes.mdx
  - history/prompts/general/20261051-author-efmp406-unit-six.general.prompt.md
  - specs/content/efmp-406/concepts/unit-06.md
  - specs/content/efmp-406/coverage/unit-06.md
  - specs/content/efmp-406/figures/unit-06.md
  - specs/content/efmp-406/sources/texts/ahmad-2011-efa.md
  - specs/content/efmp-406/sources/texts/gop-2018-nep-framework.md
  - specs/content/efmp-406/sources/texts/rehman-2016-literacy-rate.md
  - specs/content/efmp-406/sources/texts/un-goal4.md
  - specs/content/efmp-406/sources/texts/unesco-2017-inclusion.md
  - specs/content/efmp-406/sources/texts/unesco-ai-education.md
  - specs/content/efmp-406/sources/unit-06.md
  - specs/content/efmp-406/tasks.md
  - static/img/figures/efmp-406/unit-06/fig-U6-1.dark.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-1.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-2.dark.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-2.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-3.dark.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-3.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-4.dark.svg
  - static/img/figures/efmp-406/unit-06/fig-U6-4.svg
tests:
  - npm run check:content (baseline all 13 passed; final run pending G2 evidence)
  - npm run check:depth-gate (PASS)
  - npm run check:source-floor (PASS)
  - npm run check:figures (PASS)
  - npm run figures:variants:check (PASS)
  - scripts/heavy.sh npm test -- tests/unit/figure-palette.test.mjs (46 passed)
  - Non-browser Sharp render inspection of four schematics in both themes
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Authored the approved two-topic English unit, 10/10/5 assessment, teacher notes and four governance records. Added bound source notes, registry verification, four placed SVG schematics and generated dark variants. G2 evidence will be generated from committed inputs; G3/G5 remain open.

## Outcome

- ✅ Impact: Unit 6 English draft and assets ready for deterministic evidence and independent review.
- 🧪 Tests: Baseline at origin/main passed all content gates. Scoped depth, figures and source floor pass; palette tests 46/46. Final content check follows G2 evidence generation.
- 📁 Files: Five MDX pages; coverage, sources, figures and concepts; six source notes; eight SVG files; tracker and PHR.
- 🔁 Next prompts: Independent G3 review; Urdu translation and G5; authorised browser geometry check.
- 🧠 Reflection: Current rendered-figure and bound-source gates are stricter than the author-unit skill stopping point, so complete those prerequisites rather than weaken gates.

## Handoff (for CEO and agents)

- Shipped / changed: English learning cycles, public self-study bank, teaching notes, source evidence, concept graph and light/dark figures.
- Decisions the team must respect: Approved spec unchanged. English only. No G3/G5 certification, global glossary edit, deployment, push or PR. All invented cases explicitly labelled. Reader translation banner retained.
- Pending / next owner: Independent G3 reviewer owns academic review. Urdu job owns translation, concept labels and RTL SVGs. Next browser-authorised session owns measure-figure-text.mjs, skipped because the crew brief forbids Playwright. G2 evidence is being prepared after the content commit.
- Paperclip issues affected: No issue number supplied; crew job efmp-406-u06-author.

## Evaluation notes (flywheel)

- Failure modes observed: First gate run exposed missing G2 evidence, rendered figures, bound source notes, registry verification and stale ignored content-status output. Fixed within authorised scope. Browser-based geometry is prohibited by the brief.
- Graders run and results (PASS/FAIL): Scoped content prerequisites PASS; figure palette PASS 46/46; final 13-gate run pending G2 record.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run permitted content gates after recorded G2 evidence, then hand the committed unit to an independent reviewer.
