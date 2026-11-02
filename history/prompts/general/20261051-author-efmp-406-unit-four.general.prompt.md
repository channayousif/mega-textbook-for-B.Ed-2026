---
id: 20261051
title: Author EFMP-406 Unit Four
stage: general
date: 2026-11-02
surface: agent
model: GPT-6
feature: content-efmp-406
branch: crew/efmp-406-u04-author
user: crew-owner
command: crew brief execution
labels: [codex, crew, efmp-406, unit-04, english-authoring]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/efmp-406/unit-04/index.mdx
  - docs/semester-3/efmp-406/unit-04/topic-01.mdx
  - docs/semester-3/efmp-406/unit-04/topic-02.mdx
  - docs/semester-3/efmp-406/unit-04/unit-assessment.mdx
  - docs/semester-3/efmp-406/unit-04/unit-teacher-notes.mdx
  - specs/content/efmp-406/authoring/unit-04.md
  - specs/content/efmp-406/concepts/unit-04.md
  - specs/content/efmp-406/coverage/unit-04.md
  - specs/content/efmp-406/figures/unit-04.md
  - specs/content/efmp-406/glossary/unit-04.json
  - specs/content/efmp-406/sources/texts/alcolea-2020-mil.md
  - specs/content/efmp-406/sources/texts/cc-licenses.md
  - specs/content/efmp-406/sources/texts/furenes-2021-screen.md
  - specs/content/efmp-406/sources/texts/greenhow-2009-sns.md
  - specs/content/efmp-406/sources/unit-04.md
  - static/img/figures/efmp-406/unit-04/fig-U4-1.dark.svg
  - static/img/figures/efmp-406/unit-04/fig-U4-1.svg
  - static/img/figures/efmp-406/unit-04/fig-U4-2.dark.svg
  - static/img/figures/efmp-406/unit-04/fig-U4-2.svg
  - static/img/figures/efmp-406/unit-04/fig-U4-3.dark.svg
  - static/img/figures/efmp-406/unit-04/fig-U4-3.svg
  - static/img/figures/efmp-406/unit-04/fig-U4-4.dark.svg
  - static/img/figures/efmp-406/unit-04/fig-U4-4.svg
  - specs/content/efmp-406/tasks.md
  - history/prompts/general/20261051-author-efmp-406-unit-four.general.prompt.md
tests:
  - npm run check:content (baseline and final)
  - direct checkTopic structural validation
  - scoped figures:variants:check
  - MDX compilation of five bodies
  - staged glossary JSON schema
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

### Referenced crew brief (verbatim)

# Crew job efmp-406-u04-author

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author EFMP-406 Unit 4 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-04/`.

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

Authored five English files, the 10/10/5 self-study bank, four English light/dark schematic pairs, coverage, sources with bounded extracts, concept graph, staged vocabulary and an author handoff. All 13 content gates passed, as did direct depth validation, MDX syntax and scoped variant freshness. No push, PR, build, server, independent review or publication performed.

## Outcome

- Impact: EFMP-406 Unit 4 has a complete unpublished English draft for the next pipeline stages.
- Tests: All content gates pass relative to the clean origin/main baseline. Direct depth validation avoids relying on coming_soon skips.
- Files: Five English MDX files, eight SVGs, governance records, five staged vocabulary entries and this PHR.
- Next prompts: Integration owner handles catalog/shared vocabulary; a permitted validation run handles browser geometry; independent reviewers and Urdu worker own later stages.
- Reflection: Installed gates supersede stale skill descriptions of prompt-only figure sufficiency. Explicitly record limitations rather than certify a skipped check.

## Handoff (for CEO and agents)

- Shipped / changed: English Unit 4 draft and four placed schematics with generated dark twins, plus source/coverage/concept records.
- Decisions the team must respect: D-2026-0075 approves the spec and defers catalog registration. Keep coming_soon and draft translation status until the authorised downstream process clears them. No G3/G5 status was completed.
- Pending / next owner: Shared glossary integration for staged additions; Playwright-based SVG text measurement by a run allowed to use browsers; Urdu mirror and RTL figures by the separate Urdu job; independent G3/G5 and publication by their owners.
- Paperclip issues affected: efmp-406-u04-author crew job; no numbered issue supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Current rendered-figure and source-verifiability gates are stricter than author-unit's documented prompt-only path; generated status report becomes stale when a course directory appears. First figure pass used nested wordmark text, repaired to the gate's required direct text node.
- Graders run and results (PASS/FAIL): Final 13 content gates PASS; direct depth PASS; MDX syntax PASS; scoped dark freshness PASS; glossary schema PASS; whitespace PASS. SVG browser geometry NOT RUN because the brief prohibits Playwright; non-browser visual previews inspected.
- Prompt variant (if applicable): Crew brief efmp-406-u04-author.
- Next experiment (smallest change to try): Run only SVG geometry measurement in an authorised browser validation job, then integrate the staged vocabulary without changing the frozen style guide.
