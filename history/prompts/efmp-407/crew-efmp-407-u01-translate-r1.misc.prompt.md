---
id: crew-efmp-407-u01-translate-r1
title: crew translate EFMP-407 unit 1
stage: misc
date: 2026-11-10
surface: agent
model: opencode
feature: efmp-407
branch: crew/efmp-407-u01-translate-r1
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-01/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-01/topic-01.mdx
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u01-translate-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u01-translate-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-407 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-01/`.

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
- (efmp-407-u01-repair_en, repair_en, agy) English author repairs for Orr disclosure and RRQ-09 uncertainty are resolved; Unit 1 is unblocked for Urdu translation (G4).
- (efmp-407-u01-repair_en, repair_en, agy) Browser, narrow-screen, and A4 print rendering remain host-prohibited under the crew brief and are left as owner handoffs.
- (efmp-407-u01-repair_en, repair_en, agy) Unit 1 G3 remains unticked pending fresh independent review and owner disposition under ADR-0019.
- (efmp-407-u01-illustrate, illustrate, codex) No topic illustration prompts exist; the topic generation command had no matching rows.
- (efmp-407-u01-illustrate, illustrate, codex) Urdu mirror is absent; a translated Figure snippet is recorded for the translation job.


## Response snapshot

translate for EFMP-407 Unit 1

## Outcome

- Impact: translate for EFMP-407 Unit 1 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: translate for EFMP-407 Unit 1
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
