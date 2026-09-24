---
id: "0006"
title: "Phase 3 authoring: all six units"
stage: green
date: 2026-09-24
surface: agent
model: LongCat-2.0
feature: 021-author-gqur-300
branch: 021-author-gqur-300
user: M Yousif Channa
command: author-unit + generate-figures (per-unit loop)
labels: ["gqur-300", "authoring", "units-1-6", "figures", "g2-evidence"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-1/gqur-300/unit-01/ (6 files)
  - docs/semester-1/gqur-300/unit-02/ (6 files)
  - docs/semester-1/gqur-300/unit-03/ (6 files)
  - docs/semester-1/gqur-300/unit-04/ (6 files)
  - docs/semester-1/gqur-300/unit-05/ (6 files)
  - docs/semester-1/gqur-300/unit-06/ (6 files)
  - docs/semester-1/gqur-300/course-overview.mdx
  - specs/content/gqur-300/ (governance, all units)
  - static/img/figures/gqur-300/ (144 SVG files)
  - glossary.json
tests:
  - check:content (all 11 gates PASS, per unit)
  - measure-figure-text (all 36 figures clean)
  - production build (npm run build) compiles
---

## Prompt

(Full verbatim orchestrator brief recorded in 0001; stage-relevant core below.)

Phase 3 per-unit loop for all 6 units: author-unit (Spec 008 per-topic layout), generate-figures
(Codex-primary, Claude fallback), check:content fix loop, commit, prepare-gate-evidence, tracker
G2 row, glossary appends.

## Response snapshot

Authored all 6 units of GQUR-300 (36 MDX files), each with index + 3 nine-part topic cycles +
10/10/5 assessment with bounded answers + teacher notes; governance tables (coverage v2, sources
with bound excerpts, figures manifest, concepts v4) per unit. 36 figures rendered as SVG with
light/dark/en/ur variants (144 files) - Codex was unavailable (usage limit exhausted), so Claude
fallback authoring was used throughout, logged per the generate-figures skill. Unit 5 and 6
anchored on verified PBS Sindh census figures (population 55,696,147; literacy 10+ 57.54 percent;
out-of-school 5-16 46.29 percent). All 11 content gates pass per unit; G2 evidence bound and
rebound after repairs. Legacy placeholder tree replaced; course-overview.mdx rewritten from the
coming-soon placeholder.

## Outcome

- Impact: full English course authored with green gates
- Tests: check:content 11/11 per unit; production build compiles
- Files: 36 content files + governance + 144 SVGs + glossary
- Next prompts: G3 reviews, G4 Urdu mirrors, G5 reviews, check:all, PR
- Reflection: the MDX `<=` compile blocker (raw `<` starts a JSX parse) was caught only by the
  production build, not by check:content; the fix is `&lt;=` everywhere in MDX prose.

## Evaluation notes (flywheel)

- Failure modes observed: raw `<=` in MDX fails the production build silently to check:content;
  SVG label lengths overflow the 780 viewBox and only measure-figure-text catches them.
- Graders run and results: PASS (all 11 gates, all units).
- Prompt variant (if applicable): null
- Next experiment: run measure-figure-text on every unit before the first G3 review.
