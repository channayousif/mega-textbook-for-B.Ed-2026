---
id: crew-efmp-301-u11-repair_en-conflict1
title: crew fix EFMP-301 unit 11
stage: misc
date: 2026-11-03
surface: agent
model: codex
feature: efmp-301
branch: crew/efmp-301-u11-repair_en
user: crew
command: crew fix
labels: ["crew", "codex", "fix"]
links:
  spec: specs/content/efmp-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/efmp-301/unit-11/topic-01.mdx
 - docs/semester-1/efmp-301/unit-11/topic-02.mdx
 - docs/semester-1/efmp-301/unit-11/unit-assessment.mdx
 - docs/semester-1/efmp-301/unit-11/unit-teacher-notes.mdx
 - history/prompts/efmp-301/20261116-resolve-unit-eleven-merge.misc.prompt.md
 - history/prompts/efmp-301/crew-efmp-301-u11-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-11/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-11/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-11/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-301/unit-11/unit-teacher-notes.mdx
 - specs/content/efmp-301/coverage/unit-11.md
 - specs/content/efmp-301/figures/unit-11.md
 - specs/content/efmp-301/reviews/unit-11/G2/20261103T055535383Z-gates.json
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261103T055535383Z/check-bloom-bands.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261103T055535383Z/check-concept-graph.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261103T055535383Z/check-depth-gate.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261103T055535383Z/check-docs-sync.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261103T055535383Z/check-figures.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261103T055535383Z/check-no-answer-keys.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261103T055535383Z/check-no-em-dash.txt
 - specs/content/efmp-301/reviews/unit-11/G2/logs-20261103T055535383Z/validate-content.txt
 - specs/content/efmp-301/sources/texts/who2000.md
 - specs/content/efmp-301/sources/unit-11.md
 - specs/content/efmp-301/tasks.md
 - static/img/figures/efmp-301/unit-11/fig-U11-2.dark.svg
 - static/img/figures/efmp-301/unit-11/fig-U11-2.svg
 - static/img/figures/efmp-301/unit-11/fig-U11-2.ur.dark.svg
 - static/img/figures/efmp-301/unit-11/fig-U11-2.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-301-u11-repair_en-conflict1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-301-u11-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
crew/efmp-301-u11-repair_en conflicts with main (specs/content/efmp-301/tasks.md). Run `git fetch origin && git merge origin/main` on this branch and resolve every conflict. Shared registries (glossary.json, specs/decisions/log.md, specs/gaps.md, specs/content/terminology.csv) are append-only: keep BOTH sides' entries, in main's order then this branch's, and drop exact duplicates. If an ID this branch added (D-YYYY-NNNN, G-YYYY-NN, a glossary key) is already used on main for something else, give this branch's entry the next free ID and update every reference to it in this branch's files. Never change or remove an entry that main already has. Commit the merge, then make `npm run check:content` pass.

## Scope
EFMP-301 Unit 11 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-301/`, and `static/img/figures/efmp-301/unit-11/`.

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
- (efmp-301-u11-repair_en, repair_en, claude) Owner escalation is still needed for a qualified subject review of the WHO-bound clinical, urgency and referral wording, for render inspection, and for review provenance; a fresh G3 run needs owner authorisation under ADR-0019.
- (efmp-301-u11-repair_en, repair_en, claude) `sources/texts/who2026.md`'s "Used for" note still lists U11-2 signs; I didn't edit it because the file is shared with Unit 12 and changing it makes Unit 12's G2 evidence stale.
- (efmp-301-u11-repair_en, repair_en, claude) The Urdu wording is new and hasn't had a G5 review; check the added WHO quotations and the "اچانک، نمایاں تبدیلی" sign wording.
- (efmp-301-u11-review_en-conflict1, fix, agy) Owner escalation required for clinical source support, render evidence and review provenance; no automatic third review cycle under ADR-0019.
- (efmp-301-u11-review_en-conflict1, fix, agy) Untracked gitignored static/content-status.json to align with origin/main maintenance 2026-W43.


## Response snapshot

Resolved the EFMP-301 tracker conflict, preserved Unit 11 repairs, and verified all content gates pass.

## Outcome

- Impact: fix for EFMP-301 Unit 11 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 28 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Resolved the EFMP-301 tracker conflict, preserved Unit 11 repairs, and verified all content gates pass.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
