---
id: crew-gcce-400-u01-translate
title: crew translate GCCE-400 unit 1
stage: misc
date: 2026-11-22
surface: agent
model: claude
feature: gcce-400
branch: crew/gcce-400-u01-translate
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gcce-400/crew-gcce-400-u01-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-01/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-01/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-01/unit-teacher-notes.mdx
 - specs/content/gcce-400/tasks.md
 - specs/content/gcce-400/translations/unit-01/check-content-parity.txt
 - specs/content/gcce-400/translations/unit-01/handoff.md
 - static/img/figures/gcce-400/unit-01/fig-U1-1.ur.dark.svg
 - static/img/figures/gcce-400/unit-01/fig-U1-1.ur.svg
 - static/img/figures/gcce-400/unit-01/fig-U1-2.ur.dark.svg
 - static/img/figures/gcce-400/unit-01/fig-U1-2.ur.svg
 - static/img/figures/gcce-400/unit-01/fig-U1-3.ur.dark.svg
 - static/img/figures/gcce-400/unit-01/fig-U1-3.ur.svg
 - static/img/figures/gcce-400/unit-01/fig-U1-4.ur.dark.svg
 - static/img/figures/gcce-400/unit-01/fig-U1-4.ur.svg
 - static/img/figures/gcce-400/unit-01/fig-U1-5.ur.dark.svg
 - static/img/figures/gcce-400/unit-01/fig-U1-5.ur.svg
 - static/img/figures/gcce-400/unit-01/fig-U1-6.ur.dark.svg
 - static/img/figures/gcce-400/unit-01/fig-U1-6.ur.svg
tests:
 - npm run check:content
 - node scripts/measure-figure-text.mjs static/img/figures/gcce-400/unit-01/*.ur.svg
 - npm run figures:variants:check
---

## Prompt

# Crew job gcce-400-u01-translate

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u01-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GCCE-400 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-01/`.

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
- (gcce-400-u01-author, author, claude) The Semester 4 guide source PDF is committed at `static/guides/sources/4th-semester.pdf`, not under `Scheme-and-Course-guides/`, because that tree is a whole-corpus review-input root and adding there staled every accepted G2/G3 manifest (verified by staging it); the other six Semester 4 courses still have no `catalog/course-guides.json` entry, so their course overviews will hit the same `validate:content` finding until the owner adds them.
- (gcce-400-u01-author, author, claude) G3 en-review stays open; the tracker note asks the reviewer to confirm the kymlicka-norman-2000 attribution and constitutional currency in `sources/unit-01.md`.
- (gcce-400-u01-author, author, claude) Banner `fig-U1-7` remains prompt-only for the illustrate job, and no `.ur.svg` figures exist yet because the Urdu mirror is a separate job.

## Response snapshot

Translated GCCE-400 Unit 1 into a six-file Urdu mirror at G4 with six localized RTL figure pairs, a bank-bound `key_terms` block, the G4 tracker note and the translation handoff. `translation_status` stays `draft` pending independent G5.

## Outcome

- Impact: translate for GCCE-400 Unit 1 by claude (attempt 1).
- Tests: `npm run check:content` passed 14/14 at `draft`; the temporary `reviewed` flip passed parity, figure and `key_terms` checks with only the two expected G4/G5 tracker findings; `measure-figure-text.mjs` exited 0 on all six `.ur.svg`; `figures:variants:check` clean.
- Files: 25 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GCCE-400 Unit 1 into a six-file Urdu mirror at G4 with six localized RTL figure pairs (with derived dark twins), a bank-bound `key_terms` block, the G4 tracker note and `specs/content/gcce-400/translations/unit-01/handoff.md`.
- Decisions the team must respect: `translation_status` stays `draft`; no G4/G5 row was appended and no completion is claimed. The frozen `terminology.csv` and `glossary.json` were not edited; the course's own civic terms are proposed in the handoff, not banked.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path). Independent G5 review is the next content stage.
- Notes for the next job on this unit:
  - `scripts/render-inspect.mjs --locale ur` was not run: this brief forbids a dev server, `npm run build` and any local render-inspect run. Rendered Urdu at 360px and A4 print, and the RTL table reading order in `fig-U1-4`/`fig-U1-5`, are unverified and belong to G5.
  - The eight authored concept labels in `specs/content/gcce-400/concepts/unit-01.md` and the proposed terms table in the handoff need owner/G5 decisions.
  - G3 en-review of the English draft remains open (kymlicka-norman-2000 attribution and constitutional currency).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 0 earlier attempt(s); the branch started clean at origin/main.
- Graders run and results (PASS/FAIL): check:content PASS (14/14 at draft; reviewed flip shows only the two expected tracker findings).
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
