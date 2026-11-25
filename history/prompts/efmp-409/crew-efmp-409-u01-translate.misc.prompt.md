---
id: crew-efmp-409-u01-translate
title: crew translate EFMP-409 unit 1
stage: misc
date: 2026-11-25
surface: agent
model: agy
feature: efmp-409
branch: crew/efmp-409-u01-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/efmp-409/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-409/crew-efmp-409-u01-translate.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-01/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-01/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/efmp-409/unit-01/unit-teacher-notes.mdx
 - specs/content/efmp-409/reviews/unit-01/G4/translation-handoff.md
 - specs/content/efmp-409/tasks.md
 - static/img/figures/efmp-409/unit-01/fig-U1-1.ur.dark.svg
 - static/img/figures/efmp-409/unit-01/fig-U1-1.ur.svg
 - static/img/figures/efmp-409/unit-01/fig-U1-2.ur.dark.svg
 - static/img/figures/efmp-409/unit-01/fig-U1-2.ur.svg
 - static/img/figures/efmp-409/unit-01/fig-U1-3.ur.dark.svg
 - static/img/figures/efmp-409/unit-01/fig-U1-3.ur.svg
 - static/img/figures/efmp-409/unit-01/fig-U1-4.ur.dark.svg
 - static/img/figures/efmp-409/unit-01/fig-U1-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-409-u01-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-409-u01-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate EFMP-409 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-409 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-409/`, and `static/img/figures/efmp-409/unit-01/`.

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
- (efmp-409-u01-author, author, claude) The G3 reviewer should have a qualified scholar check the Islamic material in Topic 1.1 (Qur'an 96:1-5 and 39:9; tarbiyah, ta'lim, ta'dib with the al-Attas attribution), per content-spec drafting note 8.
- (efmp-409-u01-author, author, claude) The Jinnah 1947 wording comes from the official QMMB quotes page, because the PIE scan of the conference proceedings has no text layer. The banner fig-U1-5 is still prompt-only, and the concept labels in Urdu are authored and need G5 review.


## Response snapshot

Translated EFMP-409 Unit 1 into a complete 5-file Urdu mirror with 4 RTL-mirrored schematic SVGs and derived dark variants, bound key terms to terminology.csv with zero em dashes, and passed all 14 content gates.

## Outcome

- Impact: translate for EFMP-409 Unit 1 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 16 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated EFMP-409 Unit 1 into a complete 5-file Urdu mirror with 4 RTL-mirrored schematic SVGs and derived dark variants, bound key terms to terminology.csv with zero em dashes, and passed all 14 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G5 reviewer should verify the authored concept labels and proposed terms documented in specs/content/efmp-409/reviews/unit-01/G4/translation-handoff.md against the Urdu mirror.
  - The Islamic material in Topic 1.1 (Qur'an 96:1-5, 39:9, and tarbiyah/ta'lim/ta'dib with al-Attas attribution) carries forward from English drafting note 8 and requires scholar checking during review.
  - translation_status remains draft across both locales pending independent G5 review; conditional parity probe passed clean with 0 defects.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
