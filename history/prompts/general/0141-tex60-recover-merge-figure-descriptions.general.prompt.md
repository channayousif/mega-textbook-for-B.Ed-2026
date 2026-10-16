---
id: 0141
title: Recover GENG branch and figure descriptions
stage: general
date: 2026-10-16
surface: agent
model: gpt-6.1-sol
feature: none
branch: agent/TEX-42
user: Paperclip board
command: Paperclip TEX-60 heartbeat
labels: ["BilingualAuthor", "paperclip", "geng-301"]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: TEX-60
  adr: history/adr/0024-capability-based-claude-codex-visual-authoring.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/122
files:
  - specs/decisions/log.md
  - history/prompts/general/0141-tex60-recover-merge-figure-descriptions.general.prompt.md
  - static/img/figures/geng-301/unit-01/fig-U1-1.dark.svg
  - static/img/figures/geng-301/unit-01/fig-U1-1.svg
  - static/img/figures/geng-301/unit-02/fig-U2-1.dark.svg
  - static/img/figures/geng-301/unit-02/fig-U2-1.svg
  - static/img/figures/geng-301/unit-03/fig-U3-3.dark.svg
  - static/img/figures/geng-301/unit-03/fig-U3-3.svg
  - static/img/figures/geng-301/unit-03/fig-U3-4.dark.svg
  - static/img/figures/geng-301/unit-03/fig-U3-4.svg
  - static/img/figures/geng-301/unit-04/fig-U4-2.dark.svg
  - static/img/figures/geng-301/unit-04/fig-U4-2.svg
  - static/img/figures/geng-301/unit-04/fig-U4-3.dark.svg
  - static/img/figures/geng-301/unit-04/fig-U4-3.svg
  - static/img/figures/geng-301/unit-04/fig-U4-4.dark.svg
  - static/img/figures/geng-301/unit-04/fig-U4-4.svg
  - static/img/figures/geng-301/unit-04/fig-U4-6.dark.svg
  - static/img/figures/geng-301/unit-04/fig-U4-6.svg
  - static/img/figures/geng-301/unit-05/fig-U5-1.dark.svg
  - static/img/figures/geng-301/unit-05/fig-U5-1.svg
  - static/img/figures/geng-301/unit-05/fig-U5-3.dark.svg
  - static/img/figures/geng-301/unit-05/fig-U5-3.svg
  - static/img/figures/geng-301/unit-05/fig-U5-4.dark.svg
  - static/img/figures/geng-301/unit-05/fig-U5-4.svg
  - static/img/figures/geng-301/unit-05/fig-U5-5.dark.svg
  - static/img/figures/geng-301/unit-05/fig-U5-5.svg
  - static/img/figures/geng-301/unit-05/fig-U5-8.dark.svg
  - static/img/figures/geng-301/unit-05/fig-U5-8.svg
  - static/img/figures/geng-301/unit-06/fig-U6-5.dark.svg
  - static/img/figures/geng-301/unit-06/fig-U6-5.svg
  - static/img/figures/geng-301/unit-06/fig-U6-7.dark.svg
  - static/img/figures/geng-301/unit-06/fig-U6-7.svg
  - static/img/figures/geng-301/unit-06/fig-U6-8.dark.svg
  - static/img/figures/geng-301/unit-06/fig-U6-8.svg
tests:
  - npm run check:content (9 pass, 4 fail)
  - node scripts/check-figures.mjs (no GENG-301 findings; corpus still fails)
  - node scripts/check-source-floor.mjs (all six GENG-301 units fail)
  - node scripts/check-pipeline-gate.mjs (all six GENG-301 G2 files missing)
  - git diff --check
---

## Prompt

Board wake: stale Claude provider-quota monitor (15 Oct) no longer applies; agent now runs on codex_local. Resume TEX-60.

The assigned issue description, preserved verbatim:

Board, 2026-10-15. **Replaces TEX-42**, which Paperclip has locked (legacy_execution_requires_reconciliation from failed runs on 2026-10-10) and cannot wake. Keep using branch `agent/TEX-42` and its existing PR; do not open a new branch or PR. Post progress here, not on TEX-42.

Do not cancel, close or deprioritise without a written board ruling.

## Objective
Author complete GENG-301 Expository Writing (Semester 2) with all units, QC checks, figures, and Urdu mirror.

## Current state (TEX-58 resume)
- **Branch**: `agent/TEX-42`, PR #122 open
- **EN units 1-6**: already authored (all index, topics, assessment, teacher notes present)
- **UR mirror**: none yet
- **Figures**: none yet
- **Gates**: not yet run
- Content spec at `specs/content/geng-301/content-spec.md` (approved D-2026-0064)

## Required remaining work
1. Rebase `agent/TEX-42` on origin/main (style guide v4.6).
2. Verify all 6 EN units still meet v4.6 standard; fix any drift.
3. Generate figures per the generate-figures skill.
4. Urdu mirror (G4) — translate every EN unit file to `i18n/ur/docusaurus-plugin-content-docs/current/semester-2/geng-301/`.
5. Run `npm run check:content` gates; fix failures.
6. Hand to Reviewer for G3/G5.

## Standards
- Spec 008 per-topic structure, author-unit / translate-unit / generate-figures skills
- HSC-register English, academic-plain Urdu (درسی مگر عام فہم)
- Use your own worktree under `.claude/worktrees/`
- Heavy jobs via `scripts/heavy.sh` (two slots max)
- PHR with Handoff for every acting run

## Course details
- Course: GENG-301, Semester 2, Gen Ed, 3 (3-0) credits
- Source: Scheme-and-Course-guides/extracted-text/2nd 2026.txt
- 6 units covering: expository modes, essay structure, coherence, argumentation, research writing, revision/editing

## Response snapshot

Read Paperclip skill, project workflow, constitution, recent PHR handoffs 0136/0138/0139/0140, ADR-0024, author/translate/revise/figure skill procedures. Reused the existing worktree and branch. Found an unfinished historical merge with one decision-log conflict. Preserved both sides, committed the merge as 00164deb, then confirmed origin/main is already included. This continues existing merge history rather than rewriting the published branch with a rebase.

Inspected existing work rather than trusting stale task counts: 41 English MDX files, existing placed SVG figures and old G2 records exist. Synchronized 16 SVG desc elements to their unchanged carrier alt strings, escaping XML correctly, and regenerated their 16 dark variants. No prose, prompts, labels, source claims, banner, tracker status or publication state was changed.

Content gates: validate, depth, no-em-dash, no-answer-keys, concept graph, Bloom bands, licence, licence map and docs sync pass. Pipeline, figures, source floor and content-status fail across the corpus. Focused rerun finds zero GENG-301 figure findings. All six GENG-301 units have zero registry-verified sources against floor one; all six canonical G2 paths referenced by their tracker are absent. D-2026-0062 also records unrepaired Unit 1 four-modes drift.

Created TEX-96, assigned to BilingualAuthor, for a bounded English-baseline repair before G4. Its acceptance requires approved-spec drift repairs, real verified sources and fresh canonical G2 evidence, on the same branch and PR. This is a queued follow-up, not review certification.

## Outcome

- Impact: recovered interrupted merge and repaired 32 SVG accessibility assets.
- Tests: 9/13 content gates pass; course figure findings reduced to zero.
- Files: decision-log merge plus SVG sources/derived variants and this PHR.
- Next: TEX-96 repairs the English baseline; TEX-60 resumes Urdu and independent review afterwards.
- Reflection: the wake snapshot understated existing figures and did not reveal the interrupted merge.

## Handoff (for CEO and agents)

- Shipped / changed: interrupted main merge completed on agent/TEX-42; 16 SVG desc mismatches and 16 dark variants corrected; existing draft PR #122 retained.
- Decisions the team must respect: no source verification claimed, no authoring/review gate certified, no banners removed. Preserve both intake history and EFMP-304 terminology decision. Source-floor and English-spec drift are real blockers to a settled translation baseline; stale provider quota is not.
- Pending / next owner: BilingualAuthor owns queued TEX-96 baseline repair. TEX-60 waits on that child, then completes Urdu, applicable gates and separate G3/G5 handoff. Unrelated corpus failures remain with their existing owners.
- Paperclip issues affected: TEX-60, TEX-96, TEX-58. TEX-42 is historical branch identity only; progress is posted on TEX-60.

## Evaluation notes (flywheel)

- Failure modes observed: interrupted merge, stale task snapshot, SVG apostrophe/quote desc mismatches, missing canonical evidence and unverified source floor.
- Graders run and results: figure gate has zero course findings; source-floor and pipeline course failures persist.
- Prompt variant: none.
- Next experiment: establish a gate-checked baseline before translating to avoid invalidating a new Urdu mirror.
