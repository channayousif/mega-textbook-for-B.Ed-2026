---
id: crew-gcce-400-u07-translate
title: crew translate GCCE-400 unit 7
stage: misc
date: 2026-11-24
surface: agent
model: agy
feature: gcce-400
branch: crew/gcce-400-u07-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/gcce-400/crew-gcce-400-u07-translate.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-07/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-07/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-07/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-07/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-07/topic-04.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-07/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-07/unit-teacher-notes.mdx
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

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u07-translate`.
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

## Response snapshot

Translated GCCE-400 Unit 7 into its complete seven-file Urdu mirror at G4, produced 8 localized `.ur.svg` figures with derived `.ur.dark.svg` twins, verified parity and terminology conformance under temporary flip, recorded the G4 tracker note, and verified all 14 content gates pass.

## Outcome

- Impact: translate for GCCE-400 Unit 7 by agy.
- Tests: npm run check:content passed cleanly across all 14 content gates in the worktree.
- Files: 27 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Draft Urdu mirror for GCCE-400 Unit 7 (7 MDX files, 8 localized SVGs with derived dark twins, handoff and parity documentation), tracker updated.
- Decisions the team must respect: `translation_status` remains `draft` pending independent G5 review. No G5 completion is claimed.
- Pending / next owner: independent G5 reviewer (g5-reviewer) under Feature 014 / ADR-0019.
- Notes for the next job on this unit:
  - `translation_status` remains `draft` across English and Urdu indices pending independent G5 review.
  - Rendered Urdu inspection (Nastaliq shaping, 360px and A4 print) was omitted per brief host restrictions and is reserved for G5 review.
  - Proposed terms and glossary mappings are documented in `specs/content/gcce-400/translations/unit-07/handoff.md`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
