---
id: crew-gpks-402-u05-translate
title: crew translate GPKS-402 unit 5
stage: misc
date: 2026-10-28
surface: agent
model: agy
feature: gpks-402
branch: crew/gpks-402-u05-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/gpks-402/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/gpks-402/crew-gpks-402-u05-translate.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-05/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-05/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-05/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gpks-402/unit-05/unit-assessment.mdx
  - specs/content/gpks-402/tasks.md
  - specs/content/gpks-402/reviews/unit-05/G4/handoff.md
  - static/img/figures/gpks-402/unit-05/fig-U5-1.ur.dark.svg
  - static/img/figures/gpks-402/unit-05/fig-U5-1.ur.svg
  - static/img/figures/gpks-402/unit-05/fig-U5-2.ur.dark.svg
  - static/img/figures/gpks-402/unit-05/fig-U5-2.ur.svg
  - static/img/figures/gpks-402/unit-05/fig-U5-3.ur.dark.svg
  - static/img/figures/gpks-402/unit-05/fig-U5-3.ur.svg
  - static/img/figures/gpks-402/unit-05/fig-U5-4.ur.dark.svg
  - static/img/figures/gpks-402/unit-05/fig-U5-4.ur.svg
tests:
  - npm run check:content
---

## Prompt

# Crew job gpks-402-u05-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gpks-402-u05-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GPKS-402 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

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

## Notes from earlier jobs on this unit
- (gpks-402-u05-review_en, review_en, agy) All seven G3 evaluation criteria pass with concrete evidence locators; 25 assessment items independently solved; all 8 SVG variants pass measure-figure-text.mjs.
- (gpks-402-u05-review_en, review_en, agy) Advisory G3 tracker row recorded in specs/content/gpks-402/tasks.md with status open ▢ and unsigned per ADR-0019; G3 remains open for trusted sign-off.
- (gpks-402-u05-review_en, review_en, agy) Next lifecycle stages for Unit 5 are Urdu translation (G4 ur-translation) and independent Urdu review (G5 ur-review).
- (gpks-402-u05-author, author, codex) Independent G3 review, Urdu translation and G5 review remain open.
- (gpks-402-u05-author, author, codex) Geometry validation remains pending: the [figure skill](/home/a2ahs/.codex/skills/generate-figures/SKILL.md) requires "Validate source and derived variants," but its checker uses Playwright, forbidden by the brief.

## Feedback from the previous attempt
worker exited 1:
Permission deny rule (.claude/settings.json): Write(video-studio/episodes/**/approvals.jsonl) is not matched by file permission checks - only Edit(path) rules are. Use Edit(video-studio/episodes/**/approvals.jsonl) instead (Edit rules cover all file-editing tools).
You've hit your 5-hour limit · resets 7:10pm (Etc/GMT-5)

## Response snapshot

Authored complete four-file Urdu mirror for GPKS-402 Unit 5 at G4 (translate-unit skill) in academic-plain Urdu, created four localized `.ur.svg` figures and derived four `.ur.dark.svg` variants passing geometry checks, bound key_terms to terminology.csv, wrote handoff documentation, and updated tasks.md G4 tracker note with status remaining open draft.

## Outcome

- Impact: Complete draft Urdu mirror for GPKS-402 Unit 5 with full figure localization.
- Tests: `npm run check:content` passed with 13/13 gates clean.
- Files: 15 files created or modified.
- Next prompts: Independent G5 Urdu review (`g5-reviewer`).

## Handoff (for CEO and agents)

- Shipped / changed: Complete Urdu mirror for GPKS-402 Unit 5 (index.mdx, topic-01.mdx, topic-02.mdx, unit-assessment.mdx), 4 localized .ur.svg figures + 4 derived dark variants, translation handoff note, and tasks.md open G4 note.
- Decisions the team must respect: translation_status stays draft pending independent G5 review; no self-signing or certification.
- Pending / next owner: Independent G5 Urdu review.
- Notes for the next job on this unit:
  - All four Urdu MDX files match English heading vectors (5, 14, 13, 10), component counts (4 Figure, 9 Glossary, 3 PrintHandout), and 50 numbered assessment items.
  - All 8 SVG variants (4 light, 4 dark) pass measure-figure-text.mjs cleanly.
  - Bounded answers section in unit-assessment.mdx starts with `## جوابات اور نمبر دہی کی رہنمائی` and contains zero English answer key patterns.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS (13/13 gates)
- Prompt variant: crew brief
