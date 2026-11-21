---
id: crew-guhq-301-u02-author
title: crew author GUHQ-301 unit 2
stage: misc
date: 2026-11-22
surface: agent
model: opencode
feature: guhq-301
branch: crew/guhq-301-u02-author
user: crew
command: crew author
labels: ["crew", "opencode", "author"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/guhq-301/unit-02/index.mdx
 - docs/semester-3/guhq-301/unit-02/topic-01.mdx
 - docs/semester-3/guhq-301/unit-02/topic-02.mdx
 - docs/semester-3/guhq-301/unit-02/topic-03.mdx
 - docs/semester-3/guhq-301/unit-02/topic-04.mdx
 - docs/semester-3/guhq-301/unit-02/unit-assessment.mdx
 - specs/content/guhq-301/concepts/unit-02.md
 - specs/content/guhq-301/coverage/unit-02.md
 - specs/content/guhq-301/figures/unit-02.md
 - specs/content/guhq-301/reviews/unit-02/G2/20261121T204849878Z-gates.json
 - specs/content/guhq-301/reviews/unit-02/G2/logs-20261121T204849878Z/check-bloom-bands.txt
 - specs/content/guhq-301/reviews/unit-02/G2/logs-20261121T204849878Z/check-concept-graph.txt
 - specs/content/guhq-301/reviews/unit-02/G2/logs-20261121T204849878Z/check-depth-gate.txt
 - specs/content/guhq-301/reviews/unit-02/G2/logs-20261121T204849878Z/check-docs-sync.txt
 - specs/content/guhq-301/reviews/unit-02/G2/logs-20261121T204849878Z/check-figures.txt
 - specs/content/guhq-301/reviews/unit-02/G2/logs-20261121T204849878Z/check-no-answer-keys.txt
 - specs/content/guhq-301/reviews/unit-02/G2/logs-20261121T204849878Z/check-no-em-dash.txt
 - specs/content/guhq-301/reviews/unit-02/G2/logs-20261121T204849878Z/validate-content.txt
 - specs/content/guhq-301/sources/texts/dukes-2010-treebank.md
 - specs/content/guhq-301/sources/unit-02.md
 - specs/content/guhq-301/tasks.md
 - static/img/figures/guhq-301/unit-02/fig-U2-1.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-1.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-2.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-2.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-3.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-3.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-4.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-4.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-5.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-5.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-6.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-6.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-7.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-7.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-8.dark.svg
 - static/img/figures/guhq-301/unit-02/fig-U2-8.svg
tests:
 - npm run check:content
 - scripts/heavy.sh node scripts/measure-figure-text.mjs static/img/figures/guhq-301/unit-02/fig-U2-*.svg
---

## Prompt

# Crew job guhq-301-u02-author

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/guhq-301-u02-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Author GUHQ-301 Unit 2 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

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

## Response snapshot

Continued the earlier English draft of GUHQ-301 Unit 2 (Quranic Vocabulary and Grammar), placed all eight schematic figures with derived dark variants, added the bound excerpt for the LREC treebank source, repaired the concept-graph and answer-key findings, recorded G2 gate evidence, and left all 14 content gates passing.

## Outcome

- Impact: author for GUHQ-301 Unit 2 by opencode (attempt 1 on this branch).
- Tests: npm run check:content passed (14/14); measure-figure-text exited 0 on all eight EN SVGs.
- Files: 37 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: GUHQ-301 Unit 2 English draft completed, eight schematic SVGs placed (EN, with dark variants), dukes-2010-treebank bound excerpt added, concept-graph cross-topic mappings repaired, answer-key phrase removed, G2 gate evidence recorded and the tracker row pointed at it.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this branch certifies nothing. The eight figures are English only; no `.ur.svg` mirror exists yet.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the branch touches a protected path).
- Notes for the next job on this unit:
  - The Urdu job needs `.ur.svg` versions of all eight figures (several contain Arabic words) and must have the twelve authored Urdu concept labels reviewed at G5.
  - The conjugation, pronoun, negation and preposition tables are standard Arabic grammar stated from general knowledge; the sources file flags them for the G3 reviewer, who must also make the religious-content check in content-spec drafting note 7.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS; measure-figure-text PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
