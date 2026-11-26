---
id: 20261285
title: EFMP-302 course review page
stage: green
date: 2026-11-27
surface: agent
model: claude
feature: 034-backlog-tracking
branch: crew/efmp-302-u00-salvage
user: crew
command: crew efmp-302-u00-salvage
labels: [crew, claude, content]
links:
  spec: specs/008-rich-unit-pedagogy/contracts/end-of-course-review.md
  ticket: "#820"
  adr: null
  pr: null
files:
  - docs/semester-1/efmp-302/course-review.mdx
  - specs/034-backlog-tracking/tasks.md
  - history/prompts/034-backlog-tracking/20261285-efmp302-course-review.green.prompt.md
tests:
  - npm run build:content-status
  - npm run check:content (14 of 14 gates pass)
---

## Prompt

# Crew job efmp-302-u00-salvage

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u00-salvage`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
This branch carries earlier, unfinished work from an earlier branch (undefined). Run `git fetch origin && git rebase origin/main`, resolve every conflict (keep this unit's content; take main's version of shared files such as the style guide, gates and catalog), then make every content gate pass. Extra instructions: GitHub issue #820 (Feature 034 T033): author the English course review page docs/semester-1/efmp-302/course-review.mdx. Follow the contract specs/008-rich-unit-pedagogy/contracts/end-of-course-review.md exactly (front matter: title, course_code EFMP-302, sidebar_position 900, translation_status draft; body: <PrintHandout />, H1, ## Course summary, ## Practice questions with ### Multiple-choice questions (MCQs) ~15 spread over all six units Remember to Apply, ### Restricted-response questions (RRQs) ~10 Understand to Analyze with at least one per unit, ### Extended-response questions (ERQs) ~5 Analyze to Evaluate/Create each integrating two or more units, ## Project ideas for your practicum school with 3-6 briefs (purpose, rough method, evidence to bring back), and ## Answers and marking guidance as the FINAL ## section with ### MCQ answer key, ### RRQ model answers and mark schemes, ### ERQ rubrics). Take the through-lines, question mix and project ideas from the ## Course review plan section of specs/content/efmp-302/content-spec.md, and ground every question in what EFMP-302 Units 1-6 actually teach (read their topic files; no new facts, no invented statistics). Bloom levels as *(Level)* like the unit assessments. Zero em dashes. English only (the Urdu mirror is a later job; the untranslated banner covers it). Do not edit specs/content/, unit files or gate scripts. Run npm run check:content and fix findings. Write a PHR. PR title: feat(efmp-302): course review page; PR body must contain: Closes #820.

## Scope
The whole EFMP-302 course: its docs and i18n trees, `specs/content/efmp-302/`, its figures, and the shared files its PR already touches.

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

The branch carried no earlier work: `git log origin/main..HEAD` was empty, the tree was clean, and
`git rebase origin/main` was a no-op, so there were no conflicts to resolve. I read all six units'
topic files and the course review plan, then authored the course-level review page from the
contract. The page carries the five through-lines as the course summary, a 15/10/5 practice bank
(each unit covered, ERQs each integrating two or more units), six practicum project briefs, and the
bounded final answers section with an MCQ key, RRQ models with mark schemes, and ERQ rubrics.

## Outcome

- ✅ Impact: the optional EFMP-302 `course-review.mdx` end-of-course page now exists and closes #820.
- 🧪 Tests: `npm run build:content-status` then `npm run check:content` - 14 of 14 gates pass.
- 📁 Files: `docs/semester-1/efmp-302/course-review.mdx`; `specs/034-backlog-tracking/tasks.md` (T033 ticked); this PHR.
- 🔁 Next prompts: Urdu mirror of the course-review page; any G2/G3 evidence if the course-level page is ever treated as a bound review input.
- 🧠 Reflection: the branch was already at main, so the "salvage" was authoring from scratch; grounding every item in the topic files rather than the spec summary is what kept the bank honest.

## Handoff (for CEO and agents)

- Shipped / changed: `docs/semester-1/efmp-302/course-review.mdx` (English, `translation_status: draft`, `sidebar_position: 900`), T033 ticked.
- Decisions the team must respect: the page follows `contracts/end-of-course-review.md`; English only, so the UR mirror is a later job and the untranslated banner covers it; no unit files, `specs/content/` or gate scripts were touched, so no G2 evidence was regenerated.
- Pending / next owner: the brief forbids pushing and opening a PR. When the branch is pushed, the PR title must be `feat(efmp-302): course review page` and the body must contain `Closes #820`.
- Paperclip issues affected: #820.

## Evaluation notes (flywheel)

- Failure modes observed: none on the gates; the only risk was drifting from the contract's exact headings, checked by reading the contract and the answer-key gate.
- Graders run and results (PASS/FAIL): `check:content` PASS (14/14).
- Prompt variant (if applicable): n/a
- Next experiment (smallest change to try): n/a
