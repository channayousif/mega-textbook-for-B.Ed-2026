---
id: 0174
title: Crew efmp-305-u04-review_en independent G3 review
stage: misc
date: 2026-10-17
surface: agent
model: Gemini 3.8 Flash (High)
feature: efmp-305
branch: crew/efmp-305-u04-review_en
user: Reviewer
command: crew-job
labels: ["crew", "reviewer", "efmp-305", "g3-review", "adr-0019"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: ADR-0019
  pr: null
files:
  - specs/content/efmp-305/reviews/unit-04/G3/agent-g3-efmp-305-u4-run750d5970.json
  - specs/content/efmp-305/reviews/unit-04/G3/agent-g3-efmp-305-u4-run750d5970.summary.md
  - specs/content/efmp-305/reviews/unit-04/G3/manifest.json
  - specs/content/efmp-305/reviews/unit-04/logs-750d5970/check-depth-gate.log
  - specs/content/efmp-305/reviews/unit-04/logs-750d5970/check-docs-sync.log
  - specs/content/efmp-305/reviews/unit-04/logs-750d5970/check-figures.log
  - specs/content/efmp-305/reviews/unit-04/logs-750d5970/check-no-answer-keys.log
  - specs/content/efmp-305/reviews/unit-04/logs-750d5970/check-no-em-dash.log
  - specs/content/efmp-305/reviews/unit-04/logs-750d5970/render-review.log
  - specs/content/efmp-305/reviews/unit-04/logs-750d5970/validate-content.log
  - specs/content/efmp-305/reviews/unit-04/renders-750d5970/fig-U4-1.webp
  - specs/content/efmp-305/reviews/unit-04/renders-750d5970/render-inspect.json
  - specs/content/efmp-305/reviews/unit-04/renders-750d5970/render-inspect.log
  - history/prompts/efmp-305/0174-crew-efmp-305-u04-review-en.misc.prompt.md
tests:
  - node scripts/review-evidence.mjs validate specs/content/efmp-305/reviews/unit-04/G3/agent-g3-efmp-305-u4-run750d5970.json
  - npm run check:no-em-dash
  - npm run validate:content
  - npm run check:no-answer-keys
  - npm run check:docs-sync
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Brief:
- Task: Act as the INDEPENDENT G3 English reviewer of EFMP-305 Unit 4 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign.
- Follow `.claude/skills/review-unit/SKILL.md` exactly.
- Scope: EFMP-305 Unit 4 only: its docs/licence and i18n files, its rows and folders under `specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-04/`.
- Done when: `npm run check:content` reports no finding that origin/main does not also report. All work committed on this branch with a conventional commit message. Final output ends with `CREW-SUMMARY: <what you changed, in one sentence>`.

## Material
- Branch: crew/efmp-305-u04-review_en
- Author commit: c31cad8f (TEX-76 / TEX-118)
- Manifest: specs/content/efmp-305/reviews/unit-04/G3/manifest.json (94 bound inputs)
- Course guide: Scheme-and-Course-guides/ (EFMP-305 = Second Semester, B.Ed 4-Year)

## Procedure
1. Read AGENTS.md, CLAUDE.md, .claude/skills/review-unit/SKILL.md, references/g3.md, and specs/014-agent-review-governance/contracts/review-evidence.md
2. Verified all 94 bound input paths and digests against prepared manifest
3. Evaluated all 7 criteria in G3 rubric: authority, sources, coverage, assessment, accessibility, readability, pedagogy
4. Blind-solved all 10 MCQs independently (10/10 agreement with key); evaluated 10 RRQs and 5 ERQs with rubrics
5. Measured figure glyph geometry across all 16 SVG variants with `scripts/measure-figure-text.mjs` (0 collisions, 0 overflows). Rendered `fig-U4-1.webp`
6. Executed and logged all mandatory commands (validate:content, check:depth-gate, check:figures, check:no-em-dash, check:no-answer-keys, check:docs-sync, render-review)
7. Generated review report `agent-g3-efmp-305-u4-run750d5970.json` and summary `agent-g3-efmp-305-u4-run750d5970.summary.md` with disposition `pass`
8. Validated report via `node scripts/review-evidence.mjs validate` and verified provisional acceptance via `acceptProvisionalReport()`

## Independence
- Fresh session. You did not author this content.
- Do not edit unit prose, tracker rows, or translation_status.
- Do not mark the gate done or sign evidence.
- Produce advisory tracker row.

## Response snapshot

Executed independent G3 review of EFMP-305 Unit 4 (Creating an Inclusive Classroom Environment) as Antigravity reviewer:
1. Recomputed and verified all 94 bound inputs against `specs/content/efmp-305/reviews/unit-04/G3/manifest.json`.
2. Evaluated all 7 criteria in G3 rubric: Authority (pass), Sources (pass), Coverage (pass), Assessment (pass), Accessibility (pass), Readability (pass), Pedagogy (pass).
3. Blind-solved all 10 MCQs (10/10 agreement); evaluated 10 RRQs (46 marks) and 5 ERQs (Bands 1-4 rubrics).
4. Verified all 16 SVG variants of 4 placed unit figures (fig-U4-1 through fig-U4-4) via `measure-figure-text.mjs` (0 collisions, 0 overflows). Rendered `fig-U4-1.webp` under lock.
5. All mandatory review commands exited with code 0.
6. Emitted review report `agent-g3-efmp-305-u4-run750d5970.json` and summary `agent-g3-efmp-305-u4-run750d5970.summary.md` with disposition `pass`.
7. Validated report via `scripts/review-evidence.mjs validate` and verified via `acceptProvisionalReport()`.

## Handoff (for CEO and agents)

- Shipped / changed: G3 review bundle for EFMP-305 Unit 4 under `specs/content/efmp-305/reviews/unit-04/`. Disposition: `pass`.
- Decisions the team must respect:
  1. EFMP-305 Unit 4 content satisfies all G3 English criteria and quality gates.
  2. Advisory tracker row produced for provisional acceptance under Constitution Art. VII.7.
  3. No tracker rows modified; no gates marked; no self-certification.
- Pending / next owner: CurriculumOwner / gate writer to record provisional acceptance tracker row.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none; all content gates and review tests passed cleanly.
- Graders run and results: `review-evidence.mjs validate` -> PASS (structurally valid: pass); `acceptProvisionalReport()` -> PASS; `check:content` -> PASS.
