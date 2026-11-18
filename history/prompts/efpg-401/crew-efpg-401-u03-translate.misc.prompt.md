---
id: crew-efpg-401-u03-translate
title: crew translate EFPG-401 unit 3
stage: misc
date: 2026-11-18
surface: agent
model: claude
feature: efpg-401
branch: crew/efpg-401-u03-translate
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-03/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-03/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-03/topic-05.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-03/topic-06.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-03/unit-assessment.mdx
 - specs/content/efpg-401/reviews/unit-03/G4/translation-handoff.md
 - specs/content/efpg-401/tasks.md
 - static/img/figures/efpg-401/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-1.ur.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-10.ur.dark.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-10.ur.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-11.ur.dark.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-11.ur.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-12.ur.dark.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-12.ur.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-2.ur.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-3.ur.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-4.ur.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-5.ur.dark.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-5.ur.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-6.ur.dark.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-6.ur.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-7.ur.dark.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-7.ur.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-8.ur.dark.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-8.ur.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-9.ur.dark.svg
 - static/img/figures/efpg-401/unit-03/fig-U3-9.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-401-u03-translate

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u03-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate EFPG-401 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-401 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-401/`, and `static/img/figures/efpg-401/unit-03/`.

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
- (efpg-401-u03-author-conflict5, fix, opencode) Unit 3 Urdu G4 mirror and independent G3/G5 remain the downstream jobs; branch is 0 behind origin/main and 16 ahead, no push and no PR.
- (efpg-401-u03-author-conflict5, fix, opencode) tasks.md status line still reads main's "Units 1, 2 and 7 authored; Unit 6 English draft complete"; left unchanged under the never-change-main's-entry rule.
- (efpg-401-u03-author-conflict4, fix, opencode) tasks.md status line still reads main's "Units 1, 2 and 7 authored; Unit 6 English draft complete"; left unchanged under the never-change-main's-entry rule.
- (efpg-401-u03-author-conflict4, fix, opencode) Unit 3 Urdu G4 mirror and independent G3/G5 remain the downstream jobs; branch is 0 behind origin/main and 22 ahead, no push and no PR.
- (efpg-401-u03-author-conflict3, fix, opencode) tasks.md status line still reads main's "Units 1 and 2 authored; Unit 6 English draft complete"; left unchanged under the never-change-main's-entry rule.

## Feedback from the previous attempt
worker exited 1:
Reading additional input from stdin...
OpenAI Codex v0.166.0
--------
workdir: /home/a2ahs/crew-wt/efpg-401-u03-translate
model: gpt-6.1-sol
provider: openai
approval: never
sandbox: danger-full-access
reasoning effort: none
reasoning summaries: none
session id: 01a1ecdd-bca9-7662-b682-69fa27e81b0b
--------
user
Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.
warning: Model metadata for `gpt-6.1-sol` not found. Defaulting to fallback metadata; this can degrade performance and cause issues.
hook: UserPromptSubmit
hook: UserPromptSubmit Completed
ERROR: The 'gpt-6.1-sol' model is not supported when using Codex with a ChatGPT account.
ERROR: The 'gpt-6.1-sol' model is not supported when using Codex with a ChatGPT account.



## Response snapshot

Translated EFPG-401 Unit 3 into its complete Urdu mirror (8 MDX files, 12 RTL .ur.svg figures plus dark variants) and recorded the G4 tracker row and handoff, with translation_status kept at draft.

## Outcome

- Impact: translate for EFPG-401 Unit 3 by claude (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 34 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated EFPG-401 Unit 3 into its complete Urdu mirror (8 MDX files, 12 RTL .ur.svg figures plus dark variants) and recorded the G4 tracker row and handoff, with translation_status kept at draft.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Urdu names for the methods differ from Unit 4's Urdu pages (قواعد و ترجمہ vs گرائمر-ترجمہ, ترسیلی vs ابلاغی); the owner should pick one form for the course.
  - English topic-04.mdx shows raw LaTeX (`$4 \times 4 \times 4 \times 4$`) because the site has no maths plugin; the Urdu uses plain text.
  - Rendered Urdu pages were not inspected (no build allowed); G5 must check the deployed /ur/ pages, especially the bidi in fig-U3-6 and fig-U3-10.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
