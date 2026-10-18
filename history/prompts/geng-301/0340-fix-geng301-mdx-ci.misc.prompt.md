---
id: 0340
title: Fix GENG-301 MDX CI compilation
stage: misc
date: 2026-10-18
surface: agent
model: GPT-6
feature: geng-301
branch: crew/geng-301-u00-salvage
user: crew
command: carry out .crew/brief.md
labels: [board-direct, crew, ci-fix]
links:
  spec: specs/content/geng-301/content-spec.md
  ticket: null
  adr: null
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/164
files:
  - docs/semester-2/geng-301/unit-01/topic-02.mdx
  - docs/semester-2/geng-301/unit-04/topic-02.mdx
  - docs/semester-2/geng-301/unit-05/topic-04.mdx
  - specs/content/geng-301/tasks.md
  - specs/content/geng-301/reviews/
  - history/prompts/geng-301/0340-fix-geng301-mdx-ci.misc.prompt.md
tests:
  - Compile all 41 GENG-301 MDX files with @mdx-js/mdx
  - npm run check:content
  - npm run gates:evidence for affected units 1, 4 and 5
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Read PR #164 checks and failed run 39064893267. Repair mismatched glossary closing tags,
wrap Tone in the existing Glossary component, and escape literal classification-list braces.
Validate all course MDX and deterministic content gates; refresh affected G2 evidence.
Commit locally without pushing or opening a PR.

## Outcome

- Impact: Fix the three MDX compilation errors reported by CI with syntax-only edits.
- Tests: Course-wide MDX compilation and content gates, with results recorded below.
- Files: Three topic files, affected G2 records and tracker references, and this PHR.
- Next prompts: CI build verification after the owner pushes.
- Reflection: Content validation alone does not catch MDX parser errors.

## Handoff (for CEO and agents)

- Shipped / changed: MDX syntax repairs and refreshed deterministic evidence.
- Decisions the team must respect: No G3/G5 certification or publication changes; no local build.
- Pending / next owner: Owner pushes the local commits and monitors CI.
- Paperclip issues affected: None identified; ticket null.

## Evaluation notes (flywheel)

- Failure modes observed: Invalid JSX closing tags, unclosed JSX, and literal braces parsed as expressions.
- Graders run and results (PASS/FAIL): Pending final validation below.
- Prompt variant (if applicable): None.
- Next experiment (smallest change to try): Run the CI build after pushing.
