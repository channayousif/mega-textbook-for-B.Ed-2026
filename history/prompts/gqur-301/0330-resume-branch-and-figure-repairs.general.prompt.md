---
id: 0330
title: Resume branch and figure repairs
stage: general
date: 2026-10-16
surface: agent
model: gpt-6
feature: gqur-301
branch: agent/tex-41
user: Paperclip board
command: paperclip heartbeat
labels: ["BilingualAuthor", "recovery", "gqur-301"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: TEX-70
  adr: history/adr/0024-capability-based-claude-codex-visual-authoring.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/121
files:
  - specs/content/gqur-301/tasks.md
  - static/img/figures/gqur-301/unit-01/
  - static/img/figures/gqur-301/unit-02/
  - history/prompts/gqur-301/0330-resume-branch-and-figure-repairs.general.prompt.md
tests:
  - npm run check:content
  - npm run build:content-status
  - npm run check:figures
  - FIGURE_ROOT=static/img/figures/gqur-301 npm run figures:variants
  - Python XML and alt-description assertions for 32 light/dark SVGs
  - git diff --check
---

## Prompt

Board: stale Claude provider-quota monitor (15 Oct) no longer applies; agent now runs on codex_local. Resume GQUR-301 authoring.

Board, 2026-10-15. **Replaces TEX-41**, which Paperclip has locked (legacy_execution_requires_reconciliation from failed runs on 2026-10-10) and cannot wake. Keep using branch `agent/TEX-41` and PR #121; do not open a new branch or PR. Post progress here, not on TEX-41.

Do not cancel, close or deprioritise without a written board ruling.

## Objective
Author complete GQUR-301 Quantitative Reasoning-II (Statistics) (Semester 2) with all units, QC checks, figures, and Urdu mirror.

## Current state (TEX-58 resume)
- **Branch**: `agent/tex-41` (lowercase), PR #121 open
- **EN units 1-2**: authored
- **EN units 3-6**: not yet authored
- **UR mirror**: none
- **Figures**: none
- **Gates**: not yet run
- Content spec at `specs/content/gqur-301/content-spec.md` (approved)

## Required work
1. Rebase `agent/tex-41` on origin/main (style guide v4.6).
2. Verify units 1-2 meet v4.6; author units 3-6.
3. Generate figures per generate-figures skill.
4. Urdu mirror (G4) for all 6 units.
5. Run `npm run check:content` gates.
6. Hand to Reviewer for G3/G5.

## Standards
- Spec 008 per-topic structure, author-unit / translate-unit / generate-figures skills
- HSC-register English, academic-plain Urdu (درسی مگر عام فہم)
- Use your own worktree under `.claude/worktrees/`
- Heavy jobs via `scripts/heavy.sh` (two slots max)
- PHR with Handoff for every acting run

## Course details
- Course: GQUR-301, Semester 2, Gen Ed, 3 (3-0) credits
- Source: Scheme-and-Course-guides/extracted-text/2nd 2026.txt

## Response snapshot

Recovered stale local branch from remote (remote contains owner-approved spec,
English Units 1–2 and 16 placed SVG figures). Rebased onto origin/main v4.6.
Resolved glossary conflicts by preserving current terms and adding course terms;
preserved current decision log and replayed historical intake entries. Course
content and approved spec match the pre-rebase remote before repairs.

Synced 12 light SVG descriptions to the page alt, repaired undefined HTML arrow
entities and unescaped less-than signs in existing SVG text, regenerated 12 dark
variants. No teaching prose, figure prompts, alt strings, review evidence or gate
status changed. Updated stale tracker narrative only.

Created bounded child TEX-87 assigned to BilingualAuthor for Unit 3 bilingual
content and figures on the same branch/PR. Parent waits on this first-class
blocker, rather than using a stale quota or timer monitor.

## Outcome

- Impact: existing work recovered and rebased; accessibility provenance and XML repaired.
- Tests: full content suite 11/13 gates pass after ignored content-status generation;
  pipeline and figures fail on corpus baseline. GQUR-301 G2 remains unfinished.
  Final figure gate has no GQUR-301 findings. XML assertions pass for 32 SVGs.
- Files: 24 SVGs, tracker narrative and this PHR.
- Next: TEX-87 authors Unit 3; TEX-70 resumes the remaining course work after that handoff.

## Handoff (for CEO and agents)

- Shipped / changed: branch recovery/rebase and existing Unit 1–2 SVG repairs on PR #121.
- Decisions the team must respect: existing branch agent/tex-41 and PR #121 only;
  approved spec untouched; no self-certification, publication or quota-monitor reuse.
- Pending / next owner: BilingualAuthor in TEX-87 on Unit 3 bilingual content;
  BilingualAuthor in TEX-70 owns Units 4–6, Units 1–2 Urdu, remaining figures,
  honest G2 evidence and later independent G3/G5 handoff. Full v4.6 pedagogical audit
  remains outstanding beyond the figure provenance repairs.
- Paperclip issues affected: TEX-70, TEX-87, parent TEX-58. TEX-41 unchanged.

## Evaluation notes (flywheel)

- Failure modes observed: local branch stale; standalone SVGs contained HTML entities
  and unescaped less-than signs; first repair stopped on invalid XML before saving
  that file, then corrected it and reran verification.
- Graders run and results: content gates 11/13; final figure gate still corpus-red,
  zero GQUR-301 findings; XML/alt and diff assertions pass.
- Prompt variant: none.
- Next experiment: complete one bilingual unit per bounded sequential assignment.
