---
id: 0898
title: Crew efmp-305-u02-review_en independent G3 review
stage: misc
date: 2026-10-28
surface: agent
model: Gemini 3.8 Flash (High)
feature: efmp-305
branch: crew/efmp-305-u02-review_en
user: Reviewer
command: crew-job
labels: ["crew", "reviewer", "efmp-305", "g3-review", "adr-0019"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: history/adr/0019-agent-review-governance.md
  pr: null
files:
  - specs/content/efmp-305/reviews/unit-02/G3/agent-g3-efmp-305-u2-runfd523bce.json
  - specs/content/efmp-305/reviews/unit-02/G3/agent-g3-efmp-305-u2-runfd523bce.summary.md
  - specs/content/efmp-305/reviews/unit-02/G3/manifest.json
  - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/check-depth-gate.log
  - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/check-docs-sync.log
  - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/check-figures.log
  - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/check-no-answer-keys.log
  - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/check-no-em-dash.log
  - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/fig-U2-1-render.png
  - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/fig-U2-2-render.png
  - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/fig-U2-3-render.png
  - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/fig-U2-4-render.png
  - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/independent-assessment-derivation.md
  - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/measure-figure-text.log
  - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/render-review.log
  - specs/content/efmp-305/reviews/unit-02/logs-fd523bce/validate-content.log
  - specs/content/efmp-305/tasks.md
  - static/content-status.json
  - history/prompts/efmp-305/0898-crew-efmp-305-u02-review-en.misc.prompt.md
tests:
  - node scripts/review-evidence.mjs validate specs/content/efmp-305/reviews/unit-02/G3/agent-g3-efmp-305-u2-runfd523bce.json
  - npm run check:no-em-dash
  - npm run validate:content
  - npm run check:no-answer-keys
  - npm run check:docs-sync
  - npm run check:depth-gate
  - npm run check:figures
  - npm run check:content-status
  - npm run check:content
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Brief:
- Task: Act as the INDEPENDENT G3 English reviewer of EFMP-305 Unit 2 (review-unit skill, .claude/agents/g3-reviewer.md). You did not write this unit. Produce the evidence report the skill specifies and the advisory tracker row. Never tick G3, never add reviewer initials, never self-sign. This is the second and last review cycle (ADR-0019): repairs were applied for the latest report under the unit's reviews/.../G3/ folder. Verify each of its findings against the current files, carry any that remain unresolved, and give a new name to your report.
- Follow `.claude/skills/review-unit/SKILL.md` exactly.
- Scope: EFMP-305 Unit 2 only: its docs/licence and i18n files, its rows and folders under `specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-02/`.
- Done when: `npm run check:content` reports no finding that origin/main does not also report. All work committed on this branch with a conventional commit message. Final output ends with `CREW-SUMMARY: <what you changed, in one sentence>`.

## Material
- Branch: crew/efmp-305-u02-review_en
- Repaired baseline commit: commit:7e9ffa9e
- Prior cycle 1 report: specs/content/efmp-305/reviews/unit-02/G3/agent-g3-efmp-305-u2-run5873b2cc.json (disposition: revise)
- Manifest: specs/content/efmp-305/reviews/unit-02/G3/manifest.json (94 bound inputs)
- Course guide: Scheme-and-Course-guides/extracted-text/2nd 2026.txt (EFMP-305 outline)

## Procedure
1. Read AGENTS.md, CLAUDE.md, .claude/skills/review-unit/SKILL.md, references/g3.md, and specs/014-agent-review-governance/contracts/review-evidence.md
2. Verified all 94 bound input paths and digests against fresh manifest prepared via `review-evidence.mjs prepare`
3. Evaluated all 7 criteria in G3 rubric: authority, sources, coverage, assessment, accessibility, readability, pedagogy
4. Verified all 5 cycle 1 findings resolved: Florian (2014) citation corrected in topic-02.mdx:185-187; repo gate failures on sibling units resolved on origin/main; bare Hornby DOI URL given markdown link text; Hornby (2014) added to sources/unit-02.md under Further reading only
5. Blind-solved all 10 MCQs independently (10/10 agreement with key); evaluated 10 RRQs (26 marks total) and 5 ERQs (0-5 analytic rubrics)
6. Measured figure text geometry across all 16 SVG variants with `scripts/measure-figure-text.mjs` (0 collisions, 0 overflows). Rasterized 4 SVG figures to PNG via sharp
7. Executed and logged all mandatory commands (validate:content, check:depth-gate, check:figures, check:no-em-dash, check:no-answer-keys, check:docs-sync, render-review)
8. Generated review report `agent-g3-efmp-305-u2-runfd523bce.json` and summary `agent-g3-efmp-305-u2-runfd523bce.summary.md` with disposition `pass`
9. Validated report via `node scripts/review-evidence.mjs validate` and verified provisional acceptance via `acceptProvisionalReport()`
10. Recorded advisory tracker row in `specs/content/efmp-305/tasks.md` and updated `static/content-status.json`

## Independence
- Fresh session. You did not author this content.
- Do not edit unit prose, translation_status, or reviewer registry.
- Do not mark the gate done, self-sign, or add reviewer initials.
- Produced advisory tracker row with unchecked status `▢` and no reviewer initials.

## Response snapshot

Executed cycle 2 independent G3 review of EFMP-305 Unit 2 (Understanding Learner Diversity) as Antigravity reviewer:
1. Recomputed and verified all 94 bound inputs against `specs/content/efmp-305/reviews/unit-02/G3/manifest.json`.
2. Evaluated all 7 criteria in G3 rubric: Authority (pass), Sources (pass), Coverage (pass), Assessment (pass), Accessibility (pass), Readability (pass), Pedagogy (pass).
3. Verified all 5 cycle 1 findings resolved: Florian (2014) citation defect in topic-02.mdx:185-187; check:depth-gate failure; check:figures failure; bare DOI link text in topic-01.mdx; Hornby 2014 listing in sources/unit-02.md.
4. Blind-solved all 10 MCQs independently (10/10 agreement); evaluated 10 RRQs and 5 ERQs with rubrics.
5. Measured text geometry across all 16 SVG variants (0 collisions, 0 overflows) and generated PNG raster renders for all 4 placed figures.
6. All mandatory review commands exited with code 0.
7. Emitted review report `agent-g3-efmp-305-u2-runfd523bce.json` and summary `agent-g3-efmp-305-u2-runfd523bce.summary.md` with disposition `pass`.
8. Validated report via `scripts/review-evidence.mjs validate` and verified via `acceptProvisionalReport()`.
9. Appended advisory tracker row in `tasks.md` and rebuilt `static/content-status.json`.

## Outcome

- Impact: Independent G3 review report (cycle 2) and evidence bundle delivered for EFMP-305 Unit 2. All cycle 1 findings verified resolved. Disposition: `pass`.
- Tests: `scripts/review-evidence.mjs validate` passed; `check:no-em-dash` clean (0 em dashes); `validate:content` passed; `check:no-answer-keys` passed; `check:docs-sync` passed; `check:depth-gate` passed; `check:figures` passed; `check:content-status` passed; full `npm run check:content` (all 13 gates) passed.
- Files: Review report JSON, summary markdown, manifest JSON, 7 command logs, 4 rasterized figure PNGs, 1 derivation markdown, updated tasks.md, updated content-status.json, this PHR.

## Handoff (for CEO and agents)

- Shipped / changed: G3 cycle 2 review bundle for EFMP-305 Unit 2 under `specs/content/efmp-305/reviews/unit-02/`. Disposition: `pass`.
- Decisions the team must respect:
  1. EFMP-305 Unit 2 content satisfies all G3 English criteria and quality gates.
  2. All cycle 1 findings are verified resolved in current content bytes.
  3. Advisory tracker row recorded for provisional acceptance under Constitution Art. VII.7; no certification claimed, no gate ticked, no reviewer initials added.
- Pending / next owner: CurriculumOwner / gate writer to record provisional acceptance tracker row.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none; all content gates and review tests passed cleanly.
- Graders run and results: `review-evidence.mjs validate` -> PASS (structurally valid: pass); `acceptProvisionalReport()` -> PASS; `check:content` (all 13 gates) -> PASS.
