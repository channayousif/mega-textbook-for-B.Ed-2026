---
id: crew-guhq-301-u05-translate
title: crew translate GUHQ-301 unit 5
stage: misc
date: 2026-11-22
surface: agent
model: claude
feature: guhq-301
branch: crew/guhq-301-u05-translate
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-05/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-05/unit-assessment.mdx
 - specs/content/guhq-301/reviews/unit-05/G2/20261122T010249289Z-gates.json
 - specs/content/guhq-301/reviews/unit-05/G2/logs-20261122T010249289Z/check-bloom-bands.txt
 - specs/content/guhq-301/reviews/unit-05/G2/logs-20261122T010249289Z/check-concept-graph.txt
 - specs/content/guhq-301/reviews/unit-05/G2/logs-20261122T010249289Z/check-depth-gate.txt
 - specs/content/guhq-301/reviews/unit-05/G2/logs-20261122T010249289Z/check-docs-sync.txt
 - specs/content/guhq-301/reviews/unit-05/G2/logs-20261122T010249289Z/check-figures.txt
 - specs/content/guhq-301/reviews/unit-05/G2/logs-20261122T010249289Z/check-no-answer-keys.txt
 - specs/content/guhq-301/reviews/unit-05/G2/logs-20261122T010249289Z/check-no-em-dash.txt
 - specs/content/guhq-301/reviews/unit-05/G2/logs-20261122T010249289Z/validate-content.txt
 - specs/content/guhq-301/tasks.md
 - specs/content/guhq-301/translations/unit-05/check-content-parity.txt
 - specs/content/guhq-301/translations/unit-05/handoff.md
 - static/img/figures/guhq-301/unit-05/fig-U5-1.ur.dark.svg
 - static/img/figures/guhq-301/unit-05/fig-U5-1.ur.svg
 - static/img/figures/guhq-301/unit-05/fig-U5-2.ur.dark.svg
 - static/img/figures/guhq-301/unit-05/fig-U5-2.ur.svg
 - static/img/figures/guhq-301/unit-05/fig-U5-3.ur.dark.svg
 - static/img/figures/guhq-301/unit-05/fig-U5-3.ur.svg
 - static/img/figures/guhq-301/unit-05/fig-U5-4.ur.dark.svg
 - static/img/figures/guhq-301/unit-05/fig-U5-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job guhq-301-u05-translate

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/guhq-301-u05-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GUHQ-301 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GUHQ-301 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/guhq-301/`, and `static/img/figures/guhq-301/unit-05/`.

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
- (guhq-301-u05-author-conflict1, fix, agy) Urdu translation job will need .ur.svg localized figures for all four Unit 5 figures and G5 review of 7 authored Urdu concept labels.
- (guhq-301-u05-author-conflict1, fix, agy) G3 review must make the religious-content check (drafting note 7); classroom routines and ordering of sources of tafsir are flagged without bound sources in sources/unit-05.md.
- (guhq-301-u05-author-conflict1, fix, agy) tafseer-talim-ul-quran could not be identified and remains uncited; kadir-2022-asbab carries rules-of-interpretation claims.
- (guhq-301-u05-author, author, opencode) Urdu job needs `.ur.svg` for all four figures and G5 review of the seven authored Urdu concept labels.
- (guhq-301-u05-author, author, opencode) G3 must make the religious-content check (content-spec drafting note 7); the classroom routines and the ordering of the sources of tafsir are flagged in `sources/unit-05.md` as having no bound source.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- GUHQ-301 Unit 5 (docs/semester-3/guhq-301/unit-05): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Drafted the full Urdu mirror of GUHQ-301 Unit 5 (four pages, four right-to-left figures, G4 tracker note) and refreshed the unit's out-of-date G2 evidence so `check:content` passes.

## Outcome

- Impact: translate for GUHQ-301 Unit 5 by claude (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 24 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Drafted the full Urdu mirror of GUHQ-301 Unit 5 (four pages, four right-to-left figures, G4 tracker note) and refreshed the unit's out-of-date G2 evidence so `check:content` passes.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G5 needs to check verse meanings, honorifics and the seven Urdu concept labels the author wrote; the rendered pages and figures have not been looked at.
  - The G3 reviewer should check the occasion-of-revelation claim for verses 22:3 and 22:4 in the English; the Urdu copies the English as written.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
