---
id: crew-efmp-409-u04-author
title: crew author EFMP-409 unit 4
stage: misc
date: 2026-11-25
surface: agent
model: claude_crew
feature: efmp-409
branch: crew/efmp-409-u04-author
user: crew
command: crew author
labels: ["crew", "claude_crew", "author"]
links:
  spec: specs/content/efmp-409/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/efmp-409/unit-04/index.mdx
 - docs/semester-4/efmp-409/unit-04/topic-01.mdx
 - docs/semester-4/efmp-409/unit-04/topic-02.mdx
 - docs/semester-4/efmp-409/unit-04/topic-03.mdx
 - docs/semester-4/efmp-409/unit-04/unit-assessment.mdx
 - docs/semester-4/efmp-409/unit-04/unit-teacher-notes.mdx
 - history/prompts/efmp-409/crew-efmp-409-u04-author.green.prompt.md
 - specs/content/efmp-409/concepts/unit-04.md
 - specs/content/efmp-409/coverage/unit-04.md
 - specs/content/efmp-409/figures/unit-04.banner.md
 - specs/content/efmp-409/figures/unit-04.md
 - specs/content/efmp-409/reviews/unit-04/G2/20261125T072435069Z-gates.json
 - specs/content/efmp-409/reviews/unit-04/G2/logs-20261125T072435069Z/check-bloom-bands.txt
 - specs/content/efmp-409/reviews/unit-04/G2/logs-20261125T072435069Z/check-concept-graph.txt
 - specs/content/efmp-409/reviews/unit-04/G2/logs-20261125T072435069Z/check-depth-gate.txt
 - specs/content/efmp-409/reviews/unit-04/G2/logs-20261125T072435069Z/check-docs-sync.txt
 - specs/content/efmp-409/reviews/unit-04/G2/logs-20261125T072435069Z/check-figures.txt
 - specs/content/efmp-409/reviews/unit-04/G2/logs-20261125T072435069Z/check-no-answer-keys.txt
 - specs/content/efmp-409/reviews/unit-04/G2/logs-20261125T072435069Z/check-no-em-dash.txt
 - specs/content/efmp-409/reviews/unit-04/G2/logs-20261125T072435069Z/validate-content.txt
 - specs/content/efmp-409/sources/texts/anwer-2024-charter-magna-carta.md
 - specs/content/efmp-409/sources/texts/besari-2023-knowledge-ethics.md
 - specs/content/efmp-409/sources/texts/farooq-2018-farewell-sermon.md
 - specs/content/efmp-409/sources/texts/hec-2013-foundations.md
 - specs/content/efmp-409/sources/texts/quran-translation.md
 - specs/content/efmp-409/sources/texts/sani-2019-suffa.md
 - specs/content/efmp-409/sources/texts/sep-curren-education.md
 - specs/content/efmp-409/sources/texts/tobroni-2020-medina-charter.md
 - specs/content/efmp-409/sources/unit-04.md
 - specs/content/efmp-409/tasks.md
 - static/img/figures/efmp-409/unit-04/fig-U4-1.dark.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-1.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-2.dark.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-2.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-3.dark.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-3.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-4.dark.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-4.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-5.dark.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-5.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-6.dark.svg
 - static/img/figures/efmp-409/unit-04/fig-U4-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-409-u04-author

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-409-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author EFMP-409 Unit 4 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-409 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-409/`, and `static/img/figures/efmp-409/unit-04/`.

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

Authored EFMP-409 Unit 4 (Islamic perspectives on education) end to end - three per-topic cycles, a 10/10/5 assessment, teacher notes, six placed figures with dark variants, all governance artefacts, G2 evidence and tracker rows - with all 14 content gates green.

## Outcome

- Impact: author for EFMP-409 Unit 4 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 42 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored EFMP-409 Unit 4 (Islamic perspectives on education) end to end - three per-topic cycles, a 10/10/5 assessment, teacher notes, six placed figures with dark variants, all governance artefacts, G2 evidence and tracker rows - with all 14 content gates green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 should have a qualified scholar check the Islamic material (Surah Al-Alaq, the hadith on knowledge, the Charter of Medina, the Last Sermon, As-Suffa) per content-spec drafting note 8.
  - `besari-2023-knowledge-ethics`, `farooq-2018-farewell-sermon` and `sani-2019-suffa` were verified only through Crossref metadata and abstracts (full texts not read); their `sources/texts` notes say so, and the Topic 4.1 hadith citations are paraphrased by collection and number.
  - banner `fig-U4-7` is still prompt-only; the Urdu mirror is a separate job; the authored Urdu concept labels need G5 review.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
