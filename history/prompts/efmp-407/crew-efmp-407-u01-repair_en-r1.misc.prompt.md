---
id: crew-efmp-407-u01-repair_en-r1
title: crew repair_en EFMP-407 unit 1
stage: misc
date: 2026-11-23
surface: agent
model: agy
feature: efmp-407
branch: crew/efmp-407-u01-repair_en-r1
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/efmp-407/crew-efmp-407-u01-repair_en-r1.misc.prompt.md
 - specs/content/efmp-407/reviews/unit-01/G3/20261123-repair-notes.md
 - specs/content/efmp-407/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u01-repair_en-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u01-repair_en-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-407/reviews/unit-01/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 1 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

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

## Open findings from the latest G3 report
From `specs/content/efmp-407/reviews/unit-01/G3/20261122T175629Z-g3-desk-3d3228c6.json` (disposition: revise). Resolve each one:
- [blocking] Orr attribution lacks learner-facing disclosure of unverified primary text; topic-01.mdx:61.
- [blocking] RRQ-09 guidance loses IUCN 2003 causal uncertainty; unit-assessment.mdx:148.
- [advisory] RRQ-03 Analyze label exceeds minimum demand of reproducing taught reasons.
- [advisory] Topic 1.3 activity requests affordability without budget; state assumptions or constraints.
- [uncertain] No actual browser, narrow-screen or A4 print inspection; prohibited by brief.
- [uncertain] Exact author conversation identity, parent frozen handoff and model build unavailable.
- [uncertain] Purvis, Ilyas and World Bank excerpts absent from prepared input_manifest; external retrieval attempts failed.
- [uncertain] Supplied answers exposed before independent solving; fresh withheld-guidance assessment solve required.

## Notes from earlier jobs on this unit
- (efmp-407-u01-repair_en, repair_en, agy) English author repairs for Orr disclosure and RRQ-09 uncertainty are resolved; Unit 1 is unblocked for Urdu translation (G4).
- (efmp-407-u01-repair_en, repair_en, agy) Browser, narrow-screen, and A4 print rendering remain host-prohibited under the crew brief and are left as owner handoffs.
- (efmp-407-u01-repair_en, repair_en, agy) Unit 1 G3 remains unticked pending fresh independent review and owner disposition under ADR-0019.
- (efmp-407-u01-illustrate, illustrate, codex) No topic illustration prompts exist; the topic generation command had no matching rows.
- (efmp-407-u01-illustrate, illustrate, codex) Urdu mirror is absent; a translated Figure snippet is recorded for the translation job.


## Response snapshot

Verified all G3 report findings from 20261122T175629Z-g3-desk-3d3228c6.json against existing repairs, documented repair handoff notes, and appended the unticked Unit 1 G3 advisory-repair tracker row with all 14 content gates passing.

## Outcome

- Impact: repair_en for EFMP-407 Unit 1 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 3 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Verified all G3 report findings from 20261122T175629Z-g3-desk-3d3228c6.json against existing repairs, documented repair handoff notes, and appended the unticked Unit 1 G3 advisory-repair tracker row with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Browser, narrow-screen, and A4 print rendering remain host-prohibited under the crew brief and are left as owner handoffs.
  - Unit 1 G3 remains unticked pending fresh independent review and owner disposition under ADR-0019.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
