---
id: crew-gqur-301-u02-review_en-conflict1
title: crew fix GQUR-301 unit 2
stage: misc
date: 2026-10-19
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u02-review_en
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/014-agent-review-governance/0004-gqur301-unit2-independent-english-review.misc.prompt.md
 - history/prompts/general/0534-gqur301-u02-merge-content-gates.general.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u02-review_en.misc.prompt.md
 - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7.json
 - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7/baseline.md
 - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7/check-content-final.log
 - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7/check-content-post-cache.log
 - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7/check-content.log
 - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7/check-depth-gate.log
 - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7/check-docs-sync.log
 - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7/check-figures.log
 - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7/check-no-answer-keys.log
 - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7/check-no-em-dash.log
 - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7/commands.json
 - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7/completion.md
 - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7/independent-solutions.md
 - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7/manifest.json
 - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7/render-limitation.log
 - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7/report-validation.log
 - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7/started-at.txt
 - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7/summary.md
 - specs/content/gqur-301/reviews/unit-02/G3/01a154ca-5b18-7000-872b-bb211ead24e7/validate-content.log
 - specs/content/gqur-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u02-review_en-conflict1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u02-review_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Merged onto main's latest state, crew/gqur-301-u02-review_en fails npm run check:content (it could not join the hourly batch):
✗ static/content-status.json is missing. Run: npm run build:content-status Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GQUR-301 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-02/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (gqur-301-u02-review_en, review_en, codex) Separate author must repair assessment, statistical claims and figure alt defects; host must supply provenance and current render evidence.
- (gqur-301-u02-review_en, review_en, codex) Separate author must repair assessment, statistical claims and figure alt defects; host must supply provenance and current render evidence.


## Response snapshot

Merged origin/main onto crew/gqur-301-u02-review_en (clean merge, no conflicts), confirmed all 13 content gates pass, committed PHR.

## Outcome

- Impact: fix for GQUR-301 Unit 2 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 23 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Merged origin/main onto crew/gqur-301-u02-review_en (clean merge, no conflicts), confirmed all 13 content gates pass, committed PHR.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
