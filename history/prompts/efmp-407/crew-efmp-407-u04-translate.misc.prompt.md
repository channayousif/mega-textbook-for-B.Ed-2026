---
id: crew-efmp-407-u04-translate
title: crew translate EFMP-407 unit 4
stage: misc
date: 2026-11-07
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u04-translate
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261157-efmp407-unit-four-urdu-mirror.general.prompt.md
 - history/prompts/general/20261158-efmp407-unit-four-g2-refresh.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/unit-teacher-notes.mdx
 - specs/content/efmp-407/reviews/unit-04/G2/20261107T111834578Z-gates.json
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T111834578Z/check-bloom-bands.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T111834578Z/check-concept-graph.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T111834578Z/check-depth-gate.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T111834578Z/check-docs-sync.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T111834578Z/check-figures.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T111834578Z/check-no-answer-keys.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T111834578Z/check-no-em-dash.txt
 - specs/content/efmp-407/reviews/unit-04/G2/logs-20261107T111834578Z/validate-content.txt
 - specs/content/efmp-407/tasks.md
 - specs/content/efmp-407/translation/unit-04.md
 - static/img/figures/efmp-407/unit-04/fig-U4-1.ur.dark.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-1.ur.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-2.ur.dark.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-2.ur.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-3.ur.dark.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-3.ur.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-4.ur.dark.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-4.ur.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-5.ur.dark.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-5.ur.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-6.ur.dark.svg
 - static/img/figures/efmp-407/unit-04/fig-U4-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u04-translate

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u04-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-407 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-04/`.

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
- (efmp-407-u04-review_en, review_en, agy) Excerpt files lim-allan-2016-futures and unesco-2017-esd-objectives exist on disk but were omitted from input_manifest due to citedKeysFor regex; engineering owner should bind them before final qualification.
- (efmp-407-u04-review_en, review_en, agy) Live browser rendering, 360px viewport table scrollability, and A4 print handout inspection remain uninspected under brief execution constraints.
- (efmp-407-u04-review_en, review_en, agy) Candidate English content files in docs/semester-3/efmp-407/unit-04/ remain unchanged and clean across all 14 gates.
- (efmp-407-u04-author-conflict1, fix, opencode) `static/content-status.json` is git-ignored and was regenerated locally only; a root-scope job must regenerate it before publication.
- (efmp-407-u04-author-conflict1, fix, opencode) `fig-U4-1` to `fig-U4-6` browser text geometry is unmeasured until CI `figure-geometry` runs; banner `fig-U4-7` remains prompt-only.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- EFMP-407 Unit 4 (docs/semester-3/efmp-407/unit-04): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Committed the fresh EFMP-407 Unit 4 G2 gate evidence and tracker repoint that the Urdu mirror commit had invalidated, leaving the branch at 14/14 content gates.

## Outcome

- Impact: translate for EFMP-407 Unit 4 by opencode (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 31 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Committed the fresh EFMP-407 Unit 4 G2 gate evidence and tracker repoint that the Urdu mirror commit had invalidated, leaving the branch at 14/14 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Urdu mirror is unchanged from commit 0418d1b87; translation_status stays draft, G3/G5 open, and no G4 completion row was added.
  - Urdu prose uses "کوڑے دان" for "bin" in topic-01/02, unit-assessment and fig-U4-3.ur.svg; a reviewer may prefer "کوڑا دان", but editing SVG text needs a Playwright geometry run this brief prohibits.
  - CI figure-geometry and a permitted render-inspect session remain the pending visual checks; static/content-status.json is git-ignored and must be regenerated before publication.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
