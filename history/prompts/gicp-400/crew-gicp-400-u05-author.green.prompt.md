---
id: crew-gicp-400-u05-author
title: crew author GICP-400 unit 5
stage: misc
date: 2026-11-06
surface: agent
model: claude
feature: gicp-400
branch: crew/gicp-400-u05-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/gicp-400/unit-05/index.mdx
 - docs/semester-3/gicp-400/unit-05/topic-01.mdx
 - docs/semester-3/gicp-400/unit-05/topic-02.mdx
 - docs/semester-3/gicp-400/unit-05/topic-03.mdx
 - docs/semester-3/gicp-400/unit-05/unit-assessment.mdx
 - history/prompts/general/2460-author-gicp400-unit-five.general.prompt.md
 - specs/content/gicp-400/concepts/unit-05.md
 - specs/content/gicp-400/coverage/unit-05.md
 - specs/content/gicp-400/figures/unit-05.banner.md
 - specs/content/gicp-400/figures/unit-05.md
 - specs/content/gicp-400/reviews/unit-05/G2/20261106T160348752Z-gates.json
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261106T160348752Z/check-bloom-bands.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261106T160348752Z/check-concept-graph.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261106T160348752Z/check-depth-gate.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261106T160348752Z/check-docs-sync.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261106T160348752Z/check-figures.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261106T160348752Z/check-no-answer-keys.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261106T160348752Z/check-no-em-dash.txt
 - specs/content/gicp-400/reviews/unit-05/G2/logs-20261106T160348752Z/validate-content.txt
 - specs/content/gicp-400/sources/texts/hussain-kokab-2012-18th.md
 - specs/content/gicp-400/sources/texts/pak-27th-amendment-2025.md
 - specs/content/gicp-400/sources/texts/sahsol-shehla-zia.md
 - specs/content/gicp-400/sources/texts/sindh-rte-act-2013.md
 - specs/content/gicp-400/sources/unit-05.md
 - specs/content/gicp-400/tasks.md
 - static/img/figures/gicp-400/unit-05/fig-U5-1.dark.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-1.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-2.dark.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-2.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-3.dark.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-3.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-4.dark.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-4.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-5.dark.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-5.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-6.dark.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u05-author

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u05-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GICP-400 Unit 5 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-05/`.

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

Authored GICP-400 Unit 5 in English (index, three topics, 10/10/5 assessment, six placed SVG figures with dark variants, governance files, G2 evidence and PHR), teaching Article 175E(3) in place of the omitted Article 184(3).

## Outcome

- Impact: author for GICP-400 Unit 5 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 37 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored GICP-400 Unit 5 in English (index, three topics, 10/10/5 assessment, six placed SVG figures with dark variants, governance files, G2 evidence and PHR), teaching Article 175E(3) in place of the omitted Article 184(3).
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - GPKS-402 Unit 4 (`topic-01`, `topic-02`, `unit-assessment`) still mentions Article 184(3), and the `glossary.json` entry "Judiciary" omits the Federal Constitutional Court; both are out of this job's scope, so check them against the Twenty-seventh Amendment, and make the same check on GICP-400 Unit 6.
  - The G3 reviewer should check the legal paraphrases of Articles 175E, 175F, 199 and 233, and the owner should decide whether to update the content-spec's figure plan and `pak-constitution-1973` reading-list note.
  - `tasks.md` is shared with sibling GICP-400 jobs (Unit 2's branch has already reshaped it), so expect a merge conflict; `sources/texts/pak-constitution-1973.md` was left unchanged because Unit 1 cites that key and its G2 evidence would go stale.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
