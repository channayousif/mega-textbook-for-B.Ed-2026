---
id: 20261231
title: Fix PR691 GUHQ-301 Unit 7 Topic 1 MDX acorn syntax error
stage: general
date: 2026-11-22
surface: agy
model: gemini-3.8-flash
feature: guhq-301
branch: crew/batch-20261122-0130
user: crew
command: Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.
labels: [agy, crew, ci-fix, guhq-301]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/691
files:
  - docs/semester-3/guhq-301/unit-07/topic-01.mdx
  - specs/content/guhq-301/reviews/unit-07/G2/20261122T015145236Z-gates.json
  - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T015145236Z/check-bloom-bands.txt
  - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T015145236Z/check-concept-graph.txt
  - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T015145236Z/check-depth-gate.txt
  - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T015145236Z/check-docs-sync.txt
  - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T015145236Z/check-figures.txt
  - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T015145236Z/check-no-answer-keys.txt
  - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T015145236Z/check-no-em-dash.txt
  - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T015145236Z/validate-content.txt
  - specs/content/guhq-301/tasks.md
  - history/prompts/general/20261231-fix-pr691-mdx-acorn-syntax.general.prompt.md
tests:
  - npm run check:content (14/14 gates PASS)
  - node scripts/prepare-gate-evidence.mjs GUHQ-301 7 (8/8 draft gates PASS)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Read PR #691 checks and failed CI run 44971818943 (build). The build failed during Docusaurus MDX compilation for `docs/semester-3/guhq-301/unit-07/topic-01.mdx` due to an acorn parse error:
`Could not parse expression with acorn` at line 52.
The file used KaTeX math syntax `$$\text{...}$$` around Arabic verses (lines 52, 86, and 200). Because Docusaurus does not enable KaTeX / remark-math, MDX interpreted the unescaped `{...}` as JavaScript JSX expressions and failed parsing Arabic text inside. Replaced `$$\text{...}$$` with standard Markdown blockquotes (`> ...`). Generated fresh G2 gate evidence for GUHQ-301 Unit 7, repointed the tracker row in `tasks.md`, and validated with `npm run check:content` (all 14 gates pass).

## Outcome

- Impact: Fixed MDX compilation error in GUHQ-301 Unit 7 Topic 1 by replacing unsupported math wrapper syntax with blockquotes.
- Tests: All 14 content gates PASS; Unit 7 G2 gate evidence generated and verified cleanly.
- Files: One MDX file, Unit 7 G2 evidence and logs, tasks.md tracker row, and this PHR.
- Next prompts: CI build on PR #691 will verify the fix.
- Reflection: MDX v3 treats curly braces as JS expressions outside code blocks unless math plugins are configured; Quranic Arabic excerpts should use standard markdown blockquotes.

## Handoff (for CEO and agents)

- Shipped / changed: Replaced `$$\text{...}$$` with `> ...` in `docs/semester-3/guhq-301/unit-07/topic-01.mdx` (verses for Surah al-Asr, Ayat al-Kursi, and Surah al-Ma'un). Re-ran G2 evidence for GUHQ-301 Unit 7 and updated `tasks.md`.
- Decisions the team must respect: No G3/G5 status, publication state, reviewer registry or evidence self-certification. No push and no PR opened. Zero em dashes used.
- Pending / next owner: CI on PR #691.
- Notes for the next job on this unit: None.
- Paperclip issues affected: PR #691; crew job batch-20261122-0130-cifix1.

## Evaluation notes (flywheel)

- Failure modes observed: KaTeX syntax `$$\text{...}$$` in MDX caused acorn parser failure.
- Graders run and results (PASS/FAIL): check:content PASS (14/14); prepare-gate-evidence PASS (8/8).
- Prompt variant (if applicable): crew brief v1.
- Next experiment (smallest change to try): Confirm PR #691 CI build passes.
