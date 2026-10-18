---
id: 0147
title: TEX-97 EFMP-305 Unit 6 G3 independent review
stage: misc
date: 2026-10-16
surface: agent
model: Gemini 3.1 Pro (High)
feature: efmp-305
branch: agent/TEX-97
user: board
command: paperclip
labels: ["reviewer", "Antigravity", "efmp-305", "unit-06", "g3-review", "tex-97"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: TEX-97
  adr: history/adr/0019-independent-agents-for-g3-g5-review.md
  pr: null
files:
  - history/prompts/efmp-305/0147-tex97-efmp305-u6-g3-review.misc.prompt.md
  - specs/content/efmp-305/reviews/unit-06/G3/agent-g3-efmp-305-u6-run4d766bf0.json
  - specs/content/efmp-305/reviews/unit-06/G3/agent-g3-efmp-305-u6-run4d766bf0.summary.md
  - specs/content/efmp-305/reviews/unit-06/logs-4d766bf0/check-depth-gate.log
  - specs/content/efmp-305/reviews/unit-06/logs-4d766bf0/check-docs-sync.log
  - specs/content/efmp-305/reviews/unit-06/logs-4d766bf0/check-figures.log
  - specs/content/efmp-305/reviews/unit-06/logs-4d766bf0/check-no-answer-keys.log
  - specs/content/efmp-305/reviews/unit-06/logs-4d766bf0/check-no-em-dash.log
  - specs/content/efmp-305/reviews/unit-06/logs-4d766bf0/render-review.log
  - specs/content/efmp-305/reviews/unit-06/logs-4d766bf0/validate-content.log
  - specs/content/efmp-305/reviews/unit-06/renders-4d766bf0/render-inspect.json
  - specs/content/efmp-305/reviews/unit-06/renders-4d766bf0/render-inspect.log
tests:
  - npm run check:content (PASS)
  - npm run check:no-em-dash (PASS)
  - npm run check:no-answer-keys (PASS)
  - npm run check:docs-sync (PASS)
  - npm run check:depth-gate (FAIL: 193 min vs 140-170 min budget band, escalated)
  - npm run check:figures (FAIL: 6 prompt-only figures, 0 placed figures, escalated)
  - node scripts/review-evidence.mjs validate (PASS: valid escalate disposition)
---

## Prompt

Run the independent G3 review of EFMP-305 Unit 6 (Inclusive Education: Collaboration and Parental Involvement) under ADR-0019, the review-unit skill and the G3 rubric.

Baseline: commit 411f5b76 on authoring branch agent/TEX-39 (draft PR #119). All three corrections from the TEX-78 editorial approval are landed at this commit:
1. Reading minutes recomputed honestly from word counts at the ~150 WPM dense-content convention: topic-01 46 min (planning band 40-50 min), topic-02 53 min (band 45-55 min), topic-03 48 min (band 45-55 min). Unit total is 193 min against the 140-170 min depth budget. Verify whether the depth-budget gate (scripts/check-depth-gate.mjs) passes or flags an exceedance, and evaluate whether the depth serves the unit's practical role.
2. Teacher-notes heading renamed to "Assessment answers are in the unit assessment file" at unit-teacher-notes.mdx:155.
3. Sindh Act 2018 sub-clause grounding corrected at topic-02.mdx:402-405: sanctioned post and sign-language/Braille specialist teacher are systemic measures under s. 9(2); individual pupil's assistive device request is reasonable accommodation under s. 9(1). Cross-check topic-03 and unit assessment.

Figure readiness note: Unit 6 figures are prompt-only scaffolding in specs/content/efmp-305/figures/unit-06.md (TEX-79 is producing SVGs in parallel on agent/TEX-39). The figures check may report prompt-only status; this is expected at this milestone and should be noted in the report rather than treated as an authoring defect, provided the briefs and alt texts meet spec.

Assessment: blind-solve all 10 MCQs before viewing the key; verify distractor plausibility, single-correctness, and alignment with course concepts. Check RRQ and ERQ rubrics.

Produce the G3 report, summary and evidence bundle under specs/content/efmp-305/reviews/unit-06/G3/. Do not author or revise content. Commit to agent/TEX-97 and open a draft PR against agent/TEX-39.

## Response snapshot

Conducted independent G3 English review of EFMP-305 Unit 6 adhering strictly to ADR-0019 and the repository reviewer constraints.
1. Verified 89 input files against `manifest.json`. All SHA-256 hashes matched.
2. Verified all 3 TEX-78 editorial corrections landed at commit `411f5b76`:
   - Reading minutes declared honestly: topic-01 (46 min), topic-02 (53 min), topic-03 (48 min). Unit total is 193 min, which triggers depth gate exit code 1 (budget band 140-170 min).
   - Teacher-notes heading renamed at line 155 to prevent confusion with answers key repository.
   - Sindh Act 2018 grounding verified: topic-02:402-405 correctly maps individual device request to s. 9(1) and sanctioned specialist posts to s. 9(2). Cross-checked with topic-03 and unit assessment.
3. Blind-solved all 10 MCQs without inspecting the answer key:
   - MCQ 1: B (Consultative model)
   - MCQ 2: B (Sindh Act 2018 s. 9(1))
   - MCQ 3: C (Sindh Act 2018 s. 9(2))
   - MCQ 4: C (Interdisciplinary team)
   - MCQ 5: B (Tier 2 targeted small-group intervention)
   - MCQ 6: B (Two-way dialogic parent-teacher conference)
   - MCQ 7: C (Community-based resource mapping)
   - MCQ 8: B (Transdisciplinary role release)
   - MCQ 9: C (Co-teaching team teaching model)
   - MCQ 10: C (Deficit-model assumption vs structural barrier)
   Unblinded comparison yielded 10/10 exact match with author key. Distractors are strong, unambiguous, and plausible. RRQ and ERQ rubrics verified.
4. Render inspection at 1280px, 360px, and 794px print view verified 0 horizontal overflows and clean heading hierarchies across all 6 pages.
5. Report compiled with disposition `escalate` due to:
   - Depth gate exceedance (193 min vs 140-170 min budget band, +23 min).
   - Figures prompt-only status (6 prompt-only figures awaiting SVG generation by TEX-79).
6. Evidence report verified with `scripts/review-evidence.mjs validate`.
7. Zero em dashes maintained across all authored documents.

## Outcome

- Impact: Independent G3 review report generated and validated with disposition `escalate`.
- Tests: Content validation, em dash checks, answer key checks, docs sync checks, and evidence report validation passed. Depth gate and figures check logged expected milestone exceedance / prompt-only states.
- Files: Report JSON, summary Markdown, 7 CLI execution logs, and 2 render inspection files in `specs/content/efmp-305/reviews/unit-06/`.
- Next prompts: None for reviewer. Editorial / CurriculumOwner evaluation of depth budget band and figure integration by TEX-79.
- Reflection: The depth exceedance is justified by authentic case studies and legal excerpts, but formally requires curriculum owner acceptance or guidance.

## Handoff (for CEO and agents)

- Shipped / changed: Generated independent G3 review bundle for EFMP-305 Unit 6 under `specs/content/efmp-305/reviews/unit-06/G3/` and supporting logs/renders.
- Decisions the team must respect: Review disposition is `escalate`. Two items require action by other roles: (1) CurriculumOwner / Board must decide whether to expand the depth budget from 140-170 to 140-200 min or request targeted pruning; (2) TEX-79 owns figure rendering and placement before final sign-off. Do not edit `tasks.md` or mark gates complete in review runs.
- Pending / next owner: CurriculumOwner and Board for depth band decision and PR review; TEX-79 for figure generation.
- Paperclip issues affected: TEX-97 (this review), TEX-39, TEX-78, TEX-79, TEX-80, TEX-86.

## Evaluation notes (flywheel)

- Failure modes observed: None in prose or pedagogy; technical gates flagged expected budget and figure milestone states.
- Graders run and results (PASS/FAIL): PASS (review report schema and validation).
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): null
