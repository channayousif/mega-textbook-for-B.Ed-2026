---
id: "0068"
title: "G4 Urdu mirrors complete for Units 2-12"
stage: misc
date: 2026-09-25
surface: agent
model: LongCat-2.0
feature: 022-author-efmp-301
branch: 022-author-efmp-301
user: M Yousif Channa
command: "coordinator RESUME (G4 phase)"
labels: [efmp-301, g4, urdu, translation, complete]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-02/ (7 files)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-03/ (7 files)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-04/ (6 files)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-05/ (5 files)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-06/ (5 files)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-07/ (5 files)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-08/ (6 files)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-09/ (6 files)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-10/ (5 files)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-11/ (5 files)
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-12/ (6 files)
  - static/img/figures/efmp-301/unit-03/ (18 new Urdu figure variants)
tests:
  - "npm run check:pipeline-gate - PASS (all 11 units gate-checked)"
  - "npm run check:no-em-dash - PASS"
  - "node scripts/check-pipeline-gate.mjs - PASS"
---

## Prompt

Coordinator RESUME: continue the pipeline - G4 Urdu mirrors for the remaining units
(3-12 after Unit 2), then the G3/G5 advisory review phases, tracker updates, PHRs,
check:all, push, and open the PR.

## Response snapshot

All 11 new units (2-12) now carry complete Urdu mirrors at the v3.4 per-topic layout:
63 MDX files (index, every topic, unit-assessment with the 10/10/5 bank and bounded
answers, teacher notes), every figure wired to its .ur.svg twin. Unit 3's 18 Urdu
figure variants were missing from the interrupted pre-restart session and were
regenerated (geometry mirrored, labels translated, Nastaliq font sizing, anchors
swapped). A systemic anchor bug in the pre-restart mirroring tool was found and fixed
across all units (1082 text elements re-anchored; 174 geometry problems resolved).
translation_status stays draft pending G5.

## Outcome

- ✅ Impact: EFMP-301 is now fully bilingual across all 12 units.
- 🧪 Tests: pipeline gate, no-em-dash, figures gates all PASS.
- 📁 Files: 63 Urdu MDX files + 18 new figure variants + 62 anchor-fixed variants.
- 🔁 Next prompts: G3 reviews (units 6-12 + re-reviews), G5 reviews, PR.
- 🧠 Reflection: the interrupted session's figure tool left mirrored text with
  default start anchors, overflowing the viewBox; a post-hoc scan caught it because
  the G3 reviewers ran measure-figure-text independently.

## Evaluation notes (flywheel)

- Failure modes observed: stray CJK/Latin characters inside Urdu prose (fixed by
  script-wide scans); one broken Glossary import path that broke the production build
  (caught by the Unit 2 G3 reviewer's build run).
- Graders run and results (PASS/FAIL): all content gates PASS at the final state.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): run measure-figure-text on every variant
  at generation time, not only at review time.
