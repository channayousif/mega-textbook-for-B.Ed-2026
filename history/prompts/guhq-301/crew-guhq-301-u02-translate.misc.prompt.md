---
id: crew-guhq-301-u02-translate
title: crew translate GUHQ-301 unit 2
stage: misc
date: 2026-11-22
surface: agent
model: agy
feature: guhq-301
branch: crew/guhq-301-u02-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/guhq-301/crew-guhq-301-u02-translate.green.prompt.md
 - history/prompts/guhq-301/crew-guhq-301-u02-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-02/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-02/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-02/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-02/unit-assessment.mdx
 - specs/content/guhq-301/reviews/unit-02/G4/check-content-parity.txt
 - specs/content/guhq-301/reviews/unit-02/G4/translation-handoff.md
 - specs/content/guhq-301/tasks.md
 - static/img/figures/guhq-301/unit-02/fig-U2-1.ur.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-1.ur.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-2.ur.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-2.ur.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-3.ur.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-3.ur.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-4.ur.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-4.ur.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-5.ur.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-5.ur.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-6.ur.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-6.ur.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-7.ur.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-7.ur.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-8.ur.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-8.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job guhq-301-u02-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/guhq-301-u02-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GUHQ-301 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GUHQ-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/guhq-301/`, and `static/img/figures/guhq-301/unit-02/`.

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
- (guhq-301-u02-author-conflict1, fix, opencode) Unit 2 Urdu mirror still needs `.ur.svg` files for all eight figures and G5 review of the twelve authored Urdu concept labels.
- (guhq-301-u02-author-conflict1, fix, opencode) G3 reviewer must make the religious-content check (content-spec drafting note 7) and confirm the general-knowledge conjugation/pronoun/negation/preposition tables flagged in `specs/content/guhq-301/sources/unit-02.md`.
- (guhq-301-u02-author-conflict1, fix, opencode) The merged `dukes-2010-treebank.md` excerpt sits outside both units' G2 input manifests (`citedKeysFor` derives `dukes-2010`), so editing it does not refresh G2 evidence.
- (guhq-301-u02-author, author, opencode) Urdu job needs `.ur.svg` mirrors for all eight figures (several contain Arabic) and G5 review of the twelve authored Urdu concept labels.
- (guhq-301-u02-author, author, opencode) Conjugation/pronoun/negation/preposition tables are general-knowledge grammar flagged in sources/unit-02.md for the G3 reviewer, who must also make the religious-content check in content-spec drafting note 7.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- GUHQ-301 Unit 2 (docs/semester-3/guhq-301/unit-02): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Moved Unit 2 translation handoff to reviews/unit-02/G4 to resolve the stale G2 manifest finding and verified all content gates pass cleanly.

## Outcome

- Impact: translate for GUHQ-301 Unit 2 by agy (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 27 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Moved Unit 2 translation handoff to reviews/unit-02/G4 to resolve the stale G2 manifest finding and verified all content gates pass cleanly.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Unit 2 draft Urdu mirror is complete across all six MDX files and eight localized SVGs with bank-bound key_terms; translation_status remains draft.
  - Translation handoff and parity checks are stored at specs/content/guhq-301/reviews/unit-02/G4/translation-handoff.md so they do not alter the English G2/G3 input manifest.
  - Independent G5 review must verify verse meanings, the religious-content check (content-spec drafting note 7), and the twelve authored Urdu concept labels.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
