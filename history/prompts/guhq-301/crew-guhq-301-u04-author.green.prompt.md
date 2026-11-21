---
id: crew-guhq-301-u04-author
title: crew author GUHQ-301 unit 4
stage: misc
date: 2026-11-22
surface: agent
model: opencode
feature: guhq-301
branch: crew/guhq-301-u04-author
user: crew
command: crew author
labels: ["crew", "opencode", "author"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/guhq-301/unit-04/index.mdx
 - docs/semester-3/guhq-301/unit-04/topic-01.mdx
 - docs/semester-3/guhq-301/unit-04/topic-02.mdx
 - docs/semester-3/guhq-301/unit-04/topic-03.mdx
 - docs/semester-3/guhq-301/unit-04/unit-assessment.mdx
 - specs/content/guhq-301/concepts/unit-04.md
 - specs/content/guhq-301/coverage/unit-04.md
 - specs/content/guhq-301/figures/unit-04.md
 - specs/content/guhq-301/reviews/unit-04/G2/20261121T211640815Z-gates.json
 - specs/content/guhq-301/reviews/unit-04/G2/logs-20261121T211640815Z/check-bloom-bands.txt
 - specs/content/guhq-301/reviews/unit-04/G2/logs-20261121T211640815Z/check-concept-graph.txt
 - specs/content/guhq-301/reviews/unit-04/G2/logs-20261121T211640815Z/check-depth-gate.txt
 - specs/content/guhq-301/reviews/unit-04/G2/logs-20261121T211640815Z/check-docs-sync.txt
 - specs/content/guhq-301/reviews/unit-04/G2/logs-20261121T211640815Z/check-figures.txt
 - specs/content/guhq-301/reviews/unit-04/G2/logs-20261121T211640815Z/check-no-answer-keys.txt
 - specs/content/guhq-301/reviews/unit-04/G2/logs-20261121T211640815Z/check-no-em-dash.txt
 - specs/content/guhq-301/reviews/unit-04/G2/logs-20261121T211640815Z/validate-content.txt
 - specs/content/guhq-301/sources/texts/al-hilali-2026-literal-interpretive.md
 - specs/content/guhq-301/sources/texts/rafei-2024-ruqu.md
 - specs/content/guhq-301/sources/unit-04.md
 - specs/content/guhq-301/tasks.md
 - static/img/figures/guhq-301/unit-04/fig-U4-1.dark.svg
 - static/img/figures/guhq-301/unit-04/fig-U4-1.svg
 - static/img/figures/guhq-301/unit-04/fig-U4-2.dark.svg
 - static/img/figures/guhq-301/unit-04/fig-U4-2.svg
 - static/img/figures/guhq-301/unit-04/fig-U4-3.dark.svg
 - static/img/figures/guhq-301/unit-04/fig-U4-3.svg
 - static/img/figures/guhq-301/unit-04/fig-U4-4.dark.svg
 - static/img/figures/guhq-301/unit-04/fig-U4-4.svg
 - static/img/figures/guhq-301/unit-04/fig-U4-5.dark.svg
 - static/img/figures/guhq-301/unit-04/fig-U4-5.svg
 - static/img/figures/guhq-301/unit-04/fig-U4-6.dark.svg
 - static/img/figures/guhq-301/unit-04/fig-U4-6.svg
tests:
 - npm run check:content
 - node scripts/measure-figure-text.mjs static/img/figures/guhq-301/unit-04/fig-U4-1.svg static/img/figures/guhq-301/unit-04/fig-U4-2.svg static/img/figures/guhq-301/unit-04/fig-U4-3.svg static/img/figures/guhq-301/unit-04/fig-U4-4.svg static/img/figures/guhq-301/unit-04/fig-U4-5.svg static/img/figures/guhq-301/unit-04/fig-U4-6.svg
---

## Prompt

# Crew job guhq-301-u04-author

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/guhq-301-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author GUHQ-301 Unit 4 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GUHQ-301 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/guhq-301/`, and `static/img/figures/guhq-301/unit-04/`.

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

Authored GUHQ-301 Unit 4 (Reading and Understanding Quranic Text) in English: three per-topic cycles, a 10/10/5 unit assessment, six placed schematic SVGs with derived dark variants, and the coverage, sources, texts, figures and concept-graph artefacts. Recorded G2 gate evidence and pointed the tracker row at it. All 14 content gates pass.

## Outcome

- Impact: author for GUHQ-301 Unit 4 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree; measure-figure-text exited 0 on all six SVGs.
- Files: 32 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored GUHQ-301 Unit 4 (Reading and Understanding Quranic Text) in English with three per-topic cycles (4.1 reading accurately and word by word, 4.2 translating for meaning, 4.3 passages and themes), a 10/10/5 assessment, six placed schematic SVGs with dark variants, coverage/sources/texts/figures/concepts artefacts, G2 gate evidence and the tracker row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this branch certifies nothing. The ruku' numbers (549-558) come from the Quran.com API, while the ruku'-as-semantic-unit interpretation rests on Rafei and colleagues (2024).
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - The Urdu job needs `.ur.svg` versions of all six figures (four contain Arabic words) and must have the nine authored Urdu concept labels reviewed at G5.
  - The classroom routines (word-by-word relay, two-translations comparison, one-surah-one-theme task) have no bound source and are flagged in the sources file for the G3 reviewer, who must also make the religious-content check in content-spec drafting note 7.
  - The publisher PDF host for `rafei-2024-ruqu` did not respond during consultation, so that bound excerpt rests on the abstract and metadata; a reviewer with access should read the full article.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS; measure-figure-text PASS (6/6)
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
