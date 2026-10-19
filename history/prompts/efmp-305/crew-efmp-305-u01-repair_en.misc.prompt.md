---
id: crew-efmp-305-u01-repair_en
title: crew repair_en EFMP-305 unit 1
stage: misc
date: 2026-10-19
surface: agent
model: agy
feature: efmp-305
branch: crew/efmp-305-u01-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-305/unit-01/topic-01.mdx
 - docs/semester-2/efmp-305/unit-01/topic-02.mdx
 - docs/semester-2/efmp-305/unit-01/unit-assessment.mdx
 - history/prompts/efmp-305/crew-efmp-305-u01-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-01/unit-assessment.mdx
 - specs/content/efmp-305/reviews/unit-01/G2/20261019T122651184Z-gates.json
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261019T122651184Z/check-bloom-bands.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261019T122651184Z/check-concept-graph.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261019T122651184Z/check-depth-gate.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261019T122651184Z/check-docs-sync.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261019T122651184Z/check-figures.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261019T122651184Z/check-no-answer-keys.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261019T122651184Z/check-no-em-dash.txt
 - specs/content/efmp-305/reviews/unit-01/G2/logs-20261019T122651184Z/validate-content.txt
 - specs/content/efmp-305/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u01-repair_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u01-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-305/reviews/unit-01/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 1 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Open findings from the latest G3 report
From `specs/content/efmp-305/reviews/unit-01/G3/agent-g3-efmp-305-u1-run2f195870.json` (disposition: revise). Resolve each one:
- [blocking] Statutory citation discrepancy: docs/semester-2/efmp-305/unit-01/topic-02.mdx:88 describes Pakistan passing "the Rights of Persons with Disabilities Act in 2018" as a national statutory enactment, and docs/semester-2/efmp-305/unit-01/unit-assessment.mdx:223, 287, 298 cites "RPwD Act 2018". However, specs/content/efmp-305/sources/unit-01.md:28-30 explicitly instructs under D-2026-0053 item 7 that key rpwd2018 records the Sindh Empowerment of 'Persons with Disabilities' Act, 2018 (Sindh Act No. XLVIII of 2018), and that "Prose that describes a national 2018 Act must be corrected to the Sindh ...
- [blocking] Repository gate failure (check:depth-gate): npm run check:depth-gate exits with code 1 due to EFMP-305 Unit 6 (est_reading_minutes 193 > band 140–170). EFMP-305 Unit 1 itself is fully compliant (unit total 58 reading-min within approved 55–70 band; topic-01 18 min [15–20 band]; topic-02 16 min [13–18 band]). However, the repo-wide gate exit code 1 prevents automated gate pass.
- [blocking] Repository gate failure (check:figures): npm run check:figures exits with code 1 due to figure alt-text differences in EFMP-304 Units 3–6. EFMP-305 Unit 1 itself has zero figure findings (all 4 figures fig-U1-1 through fig-U1-4 are placed in topics and manifest, and measure-figure-text.mjs reports zero text collisions or overflows). However, the repo-wide gate exit code 1 prevents automated gate pass.
- [advisory] Bare URL in Further reading: docs/semester-2/efmp-305/unit-01/topic-01.mdx:183 uses bare URL "https://unesdoc.unesco.org" as link text. Recommend replacing with descriptive link text for improved screen-reader accessibility.

## Notes from earlier jobs on this unit
- (efmp-305-u01-translate-r1, translate, agy) G5 Urdu review by an independent reviewer is the next step; translation_status stays draft across all 5 files.
- (efmp-305-u01-translate-r1, translate, agy) Bank term 'شمولیتی تعلیم' is strictly adhered to in all files; 8 unbanked concept labels are recorded in specs/content/efmp-305/reviews/unit-01/G4/translation-handoff.md for curriculum owner review.
- (efmp-305-u01-translate-r1, translate, agy) The concept graph file (concepts/unit-01.md) still carries 'شامل تعلیم' for Inclusive Education and should be reconciled by the curriculum owner before G5 review.
- (efmp-305-u01-translate, translate, opencode) Proposed terminology pending owner ratification - Segregation → علیحدگی, Integration → یکجائی, Equality → مساوات, Equity → انصاف (not in the frozen bank, drawn from glossery.json). The concept graph file uses "شامل تعلیم" for "Inclusive education" while the bank mandates "شمولیتی تعلیم" - owner should reconcile before G5 review.
- (efmp-305-u01-translate, translate, opencode) G5 Urdu review by an independent reviewer is the next step. translation_status stays draft. The bounded answers section in the assessment is translated; no English answer-key prose remains.


## Response snapshot

Repaired EFMP-305 Unit 1 statutory citations to the Sindh 2018 Act, replaced bare UNESCO URL with descriptive link text, mirrored changes to Urdu, and recorded the advisory revision tracker row with refreshed G2 evidence.

## Outcome

- Impact: repair_en for EFMP-305 Unit 1 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired EFMP-305 Unit 1 statutory citations to the Sindh 2018 Act, replaced bare UNESCO URL with descriptive link text, mirrored changes to Urdu, and recorded the advisory revision tracker row with refreshed G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Fresh independent G3 review should be scheduled for EFMP-305 Unit 1 to evaluate the repaired English text.
  - Independent G5 Urdu review remains pending; translation_status stays draft across all five files.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
