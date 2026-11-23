---
id: crew-gcce-400-u07-translate
title: crew translate GCCE-400 unit 7
stage: misc
date: 2026-11-23
surface: agent
model: claude_crew
feature: gcce-400
branch: crew/gcce-400-u07-translate
user: crew
command: crew translate
labels: ["crew", "claude_crew", "translate"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gcce-400/crew-gcce-400-u07-translate-r2.misc.prompt.md
 - history/prompts/gcce-400/crew-gcce-400-u07-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-07/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-07/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-07/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-07/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-07/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-07/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-07/unit-teacher-notes.mdx
 - specs/content/gcce-400/reviews/unit-07/G2/20261123T210701829Z-gates.json
 - specs/content/gcce-400/reviews/unit-07/G2/20261123T211446361Z-gates.json
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261123T210701829Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261123T210701829Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261123T210701829Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261123T210701829Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261123T210701829Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261123T210701829Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261123T210701829Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261123T210701829Z/validate-content.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261123T211446361Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261123T211446361Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261123T211446361Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261123T211446361Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261123T211446361Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261123T211446361Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261123T211446361Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-07/G2/logs-20261123T211446361Z/validate-content.txt
 - specs/content/gcce-400/tasks.md
 - specs/content/gcce-400/translations/unit-07/check-content-parity.txt
 - specs/content/gcce-400/translations/unit-07/handoff.md
 - static/img/figures/gcce-400/unit-07/fig-U7-1.ur.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-1.ur.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-2.ur.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-2.ur.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-3.ur.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-3.ur.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-4.ur.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-4.ur.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-5.ur.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-5.ur.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-6.ur.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-6.ur.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-7.ur.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-7.ur.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-8.ur.dark.svg
 - static/img/figures/gcce-400/unit-07/fig-U7-8.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gcce-400-u07-translate

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u07-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GCCE-400 Unit 7 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-07/`.

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
- (gcce-400-u07-author-conflict1, fix, claude_crew) Unit 7's English draft, `sources/unit-07.md`, coverage, concepts and G2 evidence are unchanged by the merge; G3 stays open (census Table 11/4.21, constitutional currency, and the declared-unverifiable kymlicka-norman-2000 and youniss-levine-2009 attributions).
- (gcce-400-u07-author-conflict1, fix, claude_crew) `openstax-sociology-3e` does not match the `citedKeysFor` key pattern, so its shared source-text file is not bound in Unit 7's G2/G3 input manifests; the next evidence job should know the file changed without invalidating them.
- (gcce-400-u07-author-conflict1, fix, claude_crew) Banner `fig-U7-9` is still prompt-only and no `.ur.svg` exists yet.
- (gcce-400-u07-author, author, claude_crew) The 2023 census narrative states a national male-female literacy gap of 16.16 percentage points while its own summary table shows 68.00 and 52.84; the unit quotes the table values and the discrepancy is recorded in sources/unit-07.md.
- (gcce-400-u07-author, author, claude_crew) kymlicka-norman-2000 and youniss-levine-2009 are print-only and declared under `## Unverifiable sources`; G3 should confirm the framing attributed to them, as Units 1 and 2 were asked to.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- GCCE-400 Unit 7 (docs/semester-4/gcce-400/unit-07): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Fixed GCCE-400 Unit 7's stale G2 gate evidence, translated the Urdu teacher-notes front matter, and confirmed all 14 content gates pass with `translation_status` still `draft`.

## Outcome

- Impact: translate for GCCE-400 Unit 7 by claude_crew (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 46 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Fixed GCCE-400 Unit 7's stale G2 gate evidence, translated the Urdu teacher-notes front matter, and confirmed all 14 content gates pass with `translation_status` still `draft`.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Editing `specs/content/gcce-400/translations/unit-07/*` re-invalidates Unit 7's G2 evidence; re-run `node scripts/prepare-gate-evidence.mjs gcce-400 7` and repoint the row if it changes.
  - Rendered Urdu (Nastaliq shaping, 360px, A4 print) was not inspected; this brief forbids a local build or dev server, so render-inspect belongs to a G5 review job against `https://textbook.com.pk`.
  - Banner `fig-U7-9` is still `prompt-only` with no `.ur.svg`; G3 also stays open on the census Table 11/4.21 discrepancy and the declared-unverifiable kymlicka-norman-2000 and youniss-levine-2009 attributions.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
