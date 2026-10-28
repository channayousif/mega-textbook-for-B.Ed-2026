---
id: 20261037
title: Author GPKS-402 Unit Five
stage: general
date: 2026-10-28
surface: agent
model: GPT-6 (Codex)
feature: 008-rich-unit-pedagogy
branch: crew/gpks-402-u05-author
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["codex", "crew", "gpks-402-u05-author"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-2/gpks-402/unit-05/index.mdx
  - docs/semester-2/gpks-402/unit-05/topic-01.mdx
  - docs/semester-2/gpks-402/unit-05/topic-02.mdx
  - docs/semester-2/gpks-402/unit-05/unit-assessment.mdx
  - specs/content/gpks-402/authoring/unit-05.md
  - specs/content/gpks-402/coverage/unit-05.md
  - specs/content/gpks-402/sources/unit-05.md
  - specs/content/gpks-402/sources/texts/
  - specs/content/gpks-402/concepts/unit-05.md
  - specs/content/gpks-402/figures/unit-05.md
  - specs/content/gpks-402/tasks.md
  - static/img/figures/gpks-402/unit-05/
tests:
  - "Baseline npm run check:content: 13/13 pass on unchanged origin/main"
  - "Authoring fix loop: read and repair all findings"
  - "Figure palette test and final content gates: results recorded in completion update"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Delegated brief (verbatim):

# Crew job gpks-402-u05-author

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GPKS-402 Unit 5 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GPKS-402 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gpks-402/`, and `static/img/figures/gpks-402/unit-05/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Response snapshot

Authored the English Unit 5 opening, two nine-part topic cycles and the 10/10/5 assessment with bounded self-study guidance. Added coverage, source evidence, concepts and approved figures. Baseline was fully green; the first authoring checks exposed current rendered-figure and source-excerpt requirements missing from the skill prose. Fixed those within scope. G2 evidence preparation and final gate results are recorded in the completion update.

## Outcome

- ✅ Impact: Adds the approved Economy and Society learning sequence without changing the approved specification.
- 🧪 Tests: Baseline 13/13; scoped fixes underway, with final results appended before completion.
- 📁 Files: Four learner pages, governance tables, source evidence, four English SVGs and dark twins, unit tracker, and this PHR.
- 🔁 Next prompts: Fresh independent G3 review; separate Urdu translation and G5 review.
- 🧠 Reflection: Read current gate failures rather than assuming the skill documentation fully describes enforcement.

## Handoff (for CEO and agents)

- Shipped / changed: English per-topic unit, assessment bank and governance evidence. Figures use the approved IDs, prompts, archetypes and alt text.
- Decisions the team must respect: No G3/G5 completion or signature; no publication/deployment. GDP shares are dated provisional FY2024-25 figures. Tribal relationships overlap rural/urban settings. No root glossary, constitution, catalog, style guide, ADR or gate edits.
- Pending / next owner: Independent G3 reviewer owns English review; translation job owns Urdu prose and SVG localisation. Mandatory geometry check needs clarification because the brief forbids Playwright and the repository checker uses it.
- Paperclip issues affected: No ticket supplied; GPKS-402 Unit 5 only.

## Evaluation notes (flywheel)

- Failure modes observed: Skill instructions still allow prompt-only figures, but the current gate requires rendered figures. Source scope strings using “to” were not expanded by the parser; use explicit IDs. The SVG wordmark required explicit aria-hidden.
- Graders run and results (PASS/FAIL): Baseline content gates PASS; first run identified four failing gates; second run narrowed to G2 evidence and wordmark aria-hidden. Final results appended below.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Use the same approved unit and source bundle for a fresh independent review, without author self-certification.
