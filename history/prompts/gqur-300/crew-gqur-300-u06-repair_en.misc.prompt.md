---
id: crew-gqur-300-u06-repair_en
title: crew repair_en GQUR-300 unit 6
stage: misc
date: 2026-11-05
surface: agent
model: agy
feature: gqur-300
branch: crew/gqur-300-u06-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-1/gqur-300/unit-06/topic-01.mdx
 - docs/semester-1/gqur-300/unit-06/topic-02.mdx
 - docs/semester-1/gqur-300/unit-06/topic-03.mdx
 - docs/semester-1/gqur-300/unit-06/unit-assessment.mdx
 - docs/semester-1/gqur-300/unit-06/unit-teacher-notes.mdx
 - history/prompts/gqur-300/crew-gqur-300-u06-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-06/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-06/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-06/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-06/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-06/unit-teacher-notes.mdx
 - specs/content/gqur-300/concepts/unit-06.md
 - specs/content/gqur-300/coverage/unit-06.md
 - specs/content/gqur-300/reviews/unit-06/G2/20261105T125412430Z-gates.json
 - specs/content/gqur-300/reviews/unit-06/G2/logs-20261105T125412430Z/check-bloom-bands.txt
 - specs/content/gqur-300/reviews/unit-06/G2/logs-20261105T125412430Z/check-concept-graph.txt
 - specs/content/gqur-300/reviews/unit-06/G2/logs-20261105T125412430Z/check-depth-gate.txt
 - specs/content/gqur-300/reviews/unit-06/G2/logs-20261105T125412430Z/check-docs-sync.txt
 - specs/content/gqur-300/reviews/unit-06/G2/logs-20261105T125412430Z/check-figures.txt
 - specs/content/gqur-300/reviews/unit-06/G2/logs-20261105T125412430Z/check-no-answer-keys.txt
 - specs/content/gqur-300/reviews/unit-06/G2/logs-20261105T125412430Z/check-no-em-dash.txt
 - specs/content/gqur-300/reviews/unit-06/G2/logs-20261105T125412430Z/validate-content.txt
 - specs/content/gqur-300/sources/texts/mcclure2020.md
 - specs/content/gqur-300/sources/unit-06.md
 - specs/content/gqur-300/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-300-u06-repair_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u06-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gqur-300/reviews/unit-06/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 6 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-300 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-06/`.

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

Repaired all open blocking and advisory findings from G3 review report `20261102T212207Z-g3-desk-48a77ab7.json` for GQUR-300 Unit 6 across English docs, Urdu mirrors, coverage matrix, concept graph, sources, and task tracker.

## Outcome

- ✅ Impact: repair_en for GQUR-300 Unit 6 by agy.
- 🧪 Tests: npm run check:content passed cleanly with no scope findings.
- 📁 Files: 25 file(s), listed above.
- 🔁 Next prompts: the crew planner derives the unit's next stage from main after merge.
- 🧠 Reflection: All blocking (S2, S4, A2, S5) and advisory (S3, A3, R1, AU1, P1, C1) findings were resolved with exact arithmetic corrections, point-of-use disclosures, and full English-Urdu parity.

## Handoff (for CEO and agents)

- Shipped / changed: GQUR-300 Unit 6 G3 review findings repaired; McClure 2020 cited in U6-05 and aligned with ERIC abstract; RRQ-9 pupil-teacher ratio arithmetic corrected; Steen 2001 bibliographic disclosures added; PBS reclassified as curated-supplementary; MCQ answer keys balanced across a-d; budget sequence corrected in summaries; markup, discount, and interest misconceptions taught; ERQ-04 mapped to concept graph; G3 tracker row appended (unticked).
- Decisions the team must respect: Content-spec remains approved and unedited; G3 remains unticked pending fresh independent review; zero em dashes maintained.
- Pending / next owner: Fresh independent G3 review run for GQUR-300 Unit 6.
- Paperclip issues affected: null

## Evaluation notes (flywheel)

- Failure modes observed: none.
- Graders run and results (PASS/FAIL): validate:content PASS, check:pipeline-gate PASS, check:depth-gate PASS, check:figures PASS, check:svg-style PASS, check:no-em-dash PASS, check:no-answer-keys PASS, check:concept-graph PASS, check:bloom-bands PASS, check:source-floor PASS, check:licence PASS, licence:map:check PASS, check:content-status PASS, check:docs-sync PASS.
- Prompt variant (if applicable): null
- Next experiment (smallest change to try): Fresh G3 review run on the repaired unit.
