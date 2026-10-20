---
id: crew-gnas-301-u03-repair_en-conflict4
title: crew fix GNAS-301 unit 3
stage: misc
date: 2026-10-20
surface: agent
model: opencode
feature: gnas-301
branch: crew/gnas-301-u03-repair_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gnas-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gnas-301/unit-03/topic-01.mdx
 - docs/semester-1/gnas-301/unit-03/topic-02.mdx
 - docs/semester-1/gnas-301/unit-03/topic-03.mdx
 - docs/semester-1/gnas-301/unit-03/topic-04.mdx
 - docs/semester-1/gnas-301/unit-03/unit-assessment.mdx
 - history/prompts/general/20261020-repair-gnas-unit-three-g3.general.prompt.md
 - history/prompts/general/534-gnas301-u03-merge-conflict3.general.prompt.md
 - history/prompts/general/535-gnas301-u03-merge-conflict4.general.prompt.md
 - history/prompts/gnas-301/20261019-sync-unit-three-main.misc.prompt.md
 - history/prompts/gnas-301/crew-gnas-301-u03-repair_en-conflict1.misc.prompt.md
 - history/prompts/gnas-301/crew-gnas-301-u03-repair_en-conflict2.misc.prompt.md
 - history/prompts/gnas-301/crew-gnas-301-u03-repair_en-conflict3.misc.prompt.md
 - history/prompts/gnas-301/crew-gnas-301-u03-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-03/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-03/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gnas-301/unit-03/unit-assessment.mdx
 - specs/content/gnas-301/concepts/unit-03.md
 - specs/content/gnas-301/coverage/unit-03.md
 - specs/content/gnas-301/reviews/unit-03/G2/20261019T143441329Z-gates.json
 - specs/content/gnas-301/reviews/unit-03/G2/logs-20261019T143441329Z/check-bloom-bands.txt
 - specs/content/gnas-301/reviews/unit-03/G2/logs-20261019T143441329Z/check-concept-graph.txt
 - specs/content/gnas-301/reviews/unit-03/G2/logs-20261019T143441329Z/check-depth-gate.txt
 - specs/content/gnas-301/reviews/unit-03/G2/logs-20261019T143441329Z/check-docs-sync.txt
 - specs/content/gnas-301/reviews/unit-03/G2/logs-20261019T143441329Z/check-figures.txt
 - specs/content/gnas-301/reviews/unit-03/G2/logs-20261019T143441329Z/check-no-answer-keys.txt
 - specs/content/gnas-301/reviews/unit-03/G2/logs-20261019T143441329Z/check-no-em-dash.txt
 - specs/content/gnas-301/reviews/unit-03/G2/logs-20261019T143441329Z/validate-content.txt
 - specs/content/gnas-301/sources/texts/anwar-unit-2026.md
 - specs/content/gnas-301/sources/texts/nidcd-noise-2025.md
 - specs/content/gnas-301/sources/texts/who-noise-2011.md
 - specs/content/gnas-301/sources/unit-03.md
 - specs/content/gnas-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gnas-301-u03-repair_en-conflict4

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gnas-301-u03-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gnas-301-u03-repair_en conflicts with main (it could not join the hourly batch). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GNAS-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gnas-301/`, and `static/img/figures/gnas-301/unit-03/`.

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

Merged origin/main into crew/gnas-301-u03-repair_en, resolved the single tasks.md conflict (kept both sides' tracker rows), regenerated content-status.json, all 13 content gates pass, PHR recorded.

## Outcome

- Impact: fix for GNAS-301 Unit 3 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 33 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main into crew/gnas-301-u03-repair_en, resolved the single tasks.md conflict (kept both sides' tracker rows), regenerated content-status.json, all 13 content gates pass, PHR recorded.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
