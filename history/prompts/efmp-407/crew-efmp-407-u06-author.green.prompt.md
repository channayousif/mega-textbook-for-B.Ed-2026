---
id: crew-efmp-407-u06-author
title: crew author EFMP-407 unit 6
stage: misc
date: 2026-11-07
surface: agent
model: claude
feature: efmp-407
branch: crew/efmp-407-u06-author
user: crew
command: crew author
labels: ["crew", "claude", "author"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/unit-06/index.mdx
 - docs/semester-3/efmp-407/unit-06/topic-01.mdx
 - docs/semester-3/efmp-407/unit-06/topic-02.mdx
 - docs/semester-3/efmp-407/unit-06/topic-03.mdx
 - docs/semester-3/efmp-407/unit-06/unit-assessment.mdx
 - docs/semester-3/efmp-407/unit-06/unit-teacher-notes.mdx
 - history/prompts/efmp-407/20261156-author-efmp407-unit06-english.general.prompt.md
 - specs/content/efmp-407/authoring/unit-06.md
 - specs/content/efmp-407/concepts/unit-06.md
 - specs/content/efmp-407/coverage/unit-06.md
 - specs/content/efmp-407/figures/unit-06.banner.md
 - specs/content/efmp-407/figures/unit-06.md
 - specs/content/efmp-407/reviews/unit-06/G2/20261107T081746587Z-gates.json
 - specs/content/efmp-407/reviews/unit-06/G2/logs-20261107T081746587Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-06/G2/logs-20261107T081746587Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-06/G2/logs-20261107T081746587Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-06/G2/logs-20261107T081746587Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-06/G2/logs-20261107T081746587Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-06/G2/logs-20261107T081746587Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-06/G2/logs-20261107T081746587Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-06/G2/logs-20261107T081746587Z/validate-content.txt
 - specs/content/efmp-407/sources/texts/al-nuaimi-2022-consumption.md
 - specs/content/efmp-407/sources/texts/app-2026-senate.md
 - specs/content/efmp-407/sources/texts/arabnews-2025-solar.md
 - specs/content/efmp-407/sources/texts/baloch-2019-plastic.md
 - specs/content/efmp-407/sources/texts/delmas-burbano-2011.md
 - specs/content/efmp-407/sources/texts/ecchr-2020-rina.md
 - specs/content/efmp-407/sources/texts/emf-circular-economy.md
 - specs/content/efmp-407/sources/texts/fafen-2026-csr.md
 - specs/content/efmp-407/sources/texts/fairtrade-minimum-price.md
 - specs/content/efmp-407/sources/texts/ilo-2018-greening.md
 - specs/content/efmp-407/sources/texts/mahmood-2019-labeling.md
 - specs/content/efmp-407/sources/texts/neeca-fan-label.md
 - specs/content/efmp-407/sources/texts/pakistan-halal-act-2016.md
 - specs/content/efmp-407/sources/texts/psqca-compulsory-list.md
 - specs/content/efmp-407/sources/texts/rina-statement.md
 - specs/content/efmp-407/sources/texts/secp-2009-csr.md
 - specs/content/efmp-407/sources/texts/szmigin-2009-conscious.md
 - specs/content/efmp-407/sources/texts/un-sdg12.md
 - specs/content/efmp-407/sources/texts/unep-green-economy.md
 - specs/content/efmp-407/sources/texts/zulfiqar-2019-csr.md
 - specs/content/efmp-407/sources/unit-06.md
 - specs/content/efmp-407/tasks.md
 - static/img/figures/efmp-407/unit-06/fig-U6-1.dark.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-1.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-2.dark.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-2.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-3.dark.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-3.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-4.dark.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-4.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-5.dark.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-5.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-6.dark.svg
 - static/img/figures/efmp-407/unit-06/fig-U6-6.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u06-author

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u06-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author EFMP-407 Unit 6 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-06/`.

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

Authored EFMP-407 Unit 6 in English with six placed figures, governance files, G2 gate evidence and a PHR, passing all 14 content gates with G3, G4 and G5 still open.

## Outcome

- Impact: author for EFMP-407 Unit 6 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 55 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Authored EFMP-407 Unit 6 in English with six placed figures, governance files, G2 gate evidence and a PHR, passing all 14 content gates with G3, G4 and G5 still open.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The CSR Bill 2026 was reported passed by the Senate on 11 May 2026 but assent is unconfirmed, so recheck its status in Topic 6.2 before publication or translation.
  - Topic 6.2 reports the disputed Ali Enterprises audit from both parties and leaves it undecided, so keep that balance in the Urdu mirror and check the two search-excerpt sources (`rina-statement`, `pakistan-halal-act-2016`).
  - `tasks.md` gains Unit 6 rows and a retitled header, so expect the usual tracker conflict with sibling EFMP-407 branches at merge.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
