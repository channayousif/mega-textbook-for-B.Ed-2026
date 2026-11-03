---
id: crew-efmp-304-u03-repair_en
title: crew repair_en EFMP-304 unit 3
stage: misc
date: 2026-11-03
surface: agent
model: agy
feature: efmp-304
branch: crew/efmp-304-u03-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/efmp-304/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-304/unit-03/topic-01.mdx
 - docs/semester-2/efmp-304/unit-03/topic-02.mdx
 - docs/semester-2/efmp-304/unit-03/topic-03.mdx
 - docs/semester-2/efmp-304/unit-03/topic-04.mdx
 - history/prompts/efmp-304/crew-efmp-304-u03-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-03/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-304/unit-03/topic-04.mdx
 - specs/content/efmp-304/coverage/unit-03.md
 - specs/content/efmp-304/reviews/unit-03/G2/20261103T083114356Z-gates.json
 - specs/content/efmp-304/reviews/unit-03/G2/logs-20261103T083114356Z/check-bloom-bands.txt
 - specs/content/efmp-304/reviews/unit-03/G2/logs-20261103T083114356Z/check-concept-graph.txt
 - specs/content/efmp-304/reviews/unit-03/G2/logs-20261103T083114356Z/check-depth-gate.txt
 - specs/content/efmp-304/reviews/unit-03/G2/logs-20261103T083114356Z/check-docs-sync.txt
 - specs/content/efmp-304/reviews/unit-03/G2/logs-20261103T083114356Z/check-figures.txt
 - specs/content/efmp-304/reviews/unit-03/G2/logs-20261103T083114356Z/check-no-answer-keys.txt
 - specs/content/efmp-304/reviews/unit-03/G2/logs-20261103T083114356Z/check-no-em-dash.txt
 - specs/content/efmp-304/reviews/unit-03/G2/logs-20261103T083114356Z/validate-content.txt
 - specs/content/efmp-304/reviews/unit-03/repair-handoff-20261103.md
 - specs/content/efmp-304/sources/unit-03.md
 - specs/content/efmp-304/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-304-u03-repair_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-304-u03-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-304/reviews/unit-03/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 3 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-304 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-304/`, and `static/img/figures/efmp-304/unit-03/`.

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
From `specs/content/efmp-304/reviews/unit-03/G3/20261102T212207Z-g3-desk-fc9b67f2.json` (disposition: revise). Resolve each one:
- [blocking] Render inspection (visual accessibility) cannot be performed because the crew job constraint prohibits running npm run build or a dev server. A render-review requires a built/serving site. All other G3 criteria pass or are advisory. The unit needs a separate render inspection before it can be certified at G3.
- [advisory] bassham2010 is a declared-unverifiable print monograph. The prose attributes specific claims to it (e.g., 'Bassham et al. (2010) treat these four patterns as the core of introductory deductive reasoning' in topic-02.mdx:125-127). The sources file correctly limits it to title-level support. A reviewer with access to the book should confirm the four patterns and their near-miss fallacies match its treatment. This is honest but the attribution is slightly stronger than title-level support alone carries.
- [advisory] Render inspection (visual accessibility: small-screen layout, A4 print views, table scrollability) was not performed. The crew job constraint prohibits running npm run build or a dev server. Structural accessibility checks (alt text, heading hierarchy, link text) were verified from source. A separate render inspection is recommended before publication.

## Notes from earlier jobs on this unit
- (efmp-304-u03-translate-r1, translate, codex) Translation remains draft pending independent G5; full-page RTL/print inspection and English G3 follow-up remain open.
- (efmp-304-u03-translate-r1, translate, codex) Translation remains draft pending independent G5; full-page RTL/print inspection and English G3 follow-up remain open.
- (efmp-304-u03-translate, translate, agy) English G3 for EFMP-304 Unit 3 remains open with an advisory escalate, so any future English prose repair may require updating this Urdu mirror.
- (efmp-304-u03-translate, translate, agy) Full-page desktop, 360 px, and A4 print rendering inspection via `render-inspect.mjs` was deferred under the crew build/server restriction and remains to be verified by independent G5.


## Response snapshot

Repaired EFMP-304 Unit 3 G3 findings by withdrawing specific claims attributed to unverifiable monograph bassham2010 in topic prose, disclosing bibliographic-only limits at point of use in Further reading in EN and UR, recording publisher retrieval in sources, appending an unticked G3 advisory repair row, and refreshing G2 evidence.

## Outcome

- Impact: repair_en for EFMP-304 Unit 3 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired EFMP-304 Unit 3 G3 findings by withdrawing specific claims attributed to unverifiable monograph bassham2010 in topic prose, disclosing bibliographic-only limits at point of use in Further reading in EN and UR, recording publisher retrieval in sources, appending an unticked G3 advisory repair row, and refreshing G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Visual browser and print inspection (360px viewport, table scrollability, A4 print) remains unexecuted because crew job constraints prohibit build/server/Playwright; full G3 certification needs permitted browser tooling on a live build.
  - Fresh independent G3 and dependent G5 review remain pending; stage stays open without certification.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
