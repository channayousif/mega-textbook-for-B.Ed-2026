---
id: crew-gqur-301-u11-translate-conflict5
title: crew fix GQUR-301 unit 11
stage: misc
date: 2026-10-23
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u11-translate
user: crew
command: crew fix
labels: ["crew", "opencode", "fix"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gqur-301/20261023-u11-merge-main.misc.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u11-translate-conflict1.misc.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u11-translate-conflict2.misc.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u11-translate-conflict3.misc.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u11-translate-conflict4.misc.prompt.md
 - history/prompts/gqur-301/crew-gqur-301-u11-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-11/_category_.json
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-11/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-11/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-11/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-11/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-11/unit-teacher-notes.mdx
 - static/content-status.json
 - static/img/figures/gqur-301/unit-11/fig-U11-1.ur.dark.svg
 - static/img/figures/gqur-301/unit-11/fig-U11-1.ur.svg
 - static/img/figures/gqur-301/unit-11/fig-U11-2.ur.dark.svg
 - static/img/figures/gqur-301/unit-11/fig-U11-2.ur.svg
 - static/img/figures/gqur-301/unit-11/fig-U11-3.ur.dark.svg
 - static/img/figures/gqur-301/unit-11/fig-U11-3.ur.svg
 - static/img/figures/gqur-301/unit-11/fig-U11-4.ur.dark.svg
 - static/img/figures/gqur-301/unit-11/fig-U11-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u11-translate-conflict5

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u11-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/gqur-301-u11-translate conflicts with main (it could not join the hourly batch). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
GQUR-301 Unit 11 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-11/`.

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
- (gqur-301-u11-translate-conflict4, fix, opencode) Pre-existing stash `crew-existing-generated-status` (timestamp/commit-only content-status bytes from conflict3) remains unpopped  -  the regenerated merged file supersedes it; no action needed.
- (gqur-301-u11-translate-conflict4, fix, opencode) Earlier notes' RRQ 10 (5.0 vs 2.75) and missing statistics terms remain out of scope here  -  separate author-repair and owner-advisory jobs still pending.
- (gqur-301-u11-translate-conflict3, fix, opencode) Statistics terms (ماڈل, دو حدی, etc.) still absent from frozen terminology bank  -  propose to owner at G5, out of scope here.
- (gqur-301-u11-translate-conflict3, fix, opencode) G3 F1 defect (RRQ 10 model answer says 5.0, correct is 2.75) still in English source  -  Urdu mirrors uncorrected text; re-check after author repair.
- (gqur-301-u11-translate-conflict3, fix, opencode) No render-inspect.mjs run on Urdu Nastaliq shaping or A4 print  -  G5 should verify before certification.


## Response snapshot

fix for GQUR-301 Unit 11

## Outcome

- Impact: fix for GQUR-301 Unit 11 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 21 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: fix for GQUR-301 Unit 11
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
