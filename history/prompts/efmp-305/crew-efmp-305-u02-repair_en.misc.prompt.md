---
id: crew-efmp-305-u02-repair_en
title: crew repair_en EFMP-305 unit 2
stage: misc
date: 2026-10-19
surface: agent
model: claude
feature: efmp-305
branch: crew/efmp-305-u02-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efmp-305/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/efmp-305/unit-02/topic-01.mdx
 - docs/semester-2/efmp-305/unit-02/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-02/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/efmp-305/unit-02/topic-02.mdx
 - specs/content/efmp-305/reviews/unit-02/G2/20261019T134925266Z-gates.json
 - specs/content/efmp-305/reviews/unit-02/G2/logs-20261019T134925266Z/check-bloom-bands.txt
 - specs/content/efmp-305/reviews/unit-02/G2/logs-20261019T134925266Z/check-concept-graph.txt
 - specs/content/efmp-305/reviews/unit-02/G2/logs-20261019T134925266Z/check-depth-gate.txt
 - specs/content/efmp-305/reviews/unit-02/G2/logs-20261019T134925266Z/check-docs-sync.txt
 - specs/content/efmp-305/reviews/unit-02/G2/logs-20261019T134925266Z/check-figures.txt
 - specs/content/efmp-305/reviews/unit-02/G2/logs-20261019T134925266Z/check-no-answer-keys.txt
 - specs/content/efmp-305/reviews/unit-02/G2/logs-20261019T134925266Z/check-no-em-dash.txt
 - specs/content/efmp-305/reviews/unit-02/G2/logs-20261019T134925266Z/validate-content.txt
 - specs/content/efmp-305/sources/unit-02.md
 - specs/content/efmp-305/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-305-u02-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-305-u02-repair_en`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-305/reviews/unit-02/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 2 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-305 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-305/`, and `static/img/figures/efmp-305/unit-02/`.

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
From `specs/content/efmp-305/reviews/unit-02/G3/agent-g3-efmp-305-u2-run5873b2cc.json` (disposition: revise). Resolve each one:
- [blocking] Bibliographic citation defect: docs/semester-2/efmp-305/unit-02/topic-02.mdx:185-187 cites "Florian, L. (2014). What counts as evidence for inclusive education? European Journal of Special Needs Education, 29(1), 33-48." in Further reading. However, specs/content/efmp-305/sources/unit-02.md:14-16, 24 explicitly notes that key florian2014 is "What counts as evidence of inclusive education? European Journal of Special Needs Education, 29(3), 286-294. DOI: 10.1080/08856257.2014.933551", verified via Crossref and OpenAlex 2026-10-10, and explicitly records that the earlier volume/issue/page met...
- [blocking] Repository gate failure (check:depth-gate): npm run check:depth-gate exits with code 1 due to EFMP-305 Unit 6 (est_reading_minutes 193 > band 140–170). EFMP-305 Unit 2 itself is fully compliant (unit total 54 reading-min within approved 40–55 band; topic-01 16 min [14–18 band]; topic-02 15 min [13–17 band]). However, the repo-wide gate exit code 1 prevents automated gate pass.
- [blocking] Repository gate failure (check:figures): npm run check:figures exits with code 1 due to figure alt-text differences in EFMP-304 Units 3–6. EFMP-305 Unit 2 itself has zero figure findings (all 4 figures fig-U2-1 through fig-U2-4 are placed in topics and manifest, and measure-figure-text.mjs reports zero text collisions or overflows). However, the repo-wide gate exit code 1 prevents automated gate pass.
- [advisory] Bare URL in Further reading: docs/semester-2/efmp-305/unit-02/topic-01.mdx:214 uses bare URL "https://doi.org/10.1007/978-1-4939-1483-8" as link text. Recommend replacing with descriptive link text for screen-reader accessibility.
- [advisory] Further reading source listing: Hornby (2014) is cited in Further reading of topic-01.mdx:213-215 but is not listed in specs/content/efmp-305/sources/unit-02.md. Recommend adding Hornby (2014) to the unit sources reference table for completeness.

## Notes from earlier jobs on this unit
- (efmp-305-u02-translate-r1, translate, agy) All 4 .ur.svg figure variants are wired in topics 1 and 2 with exact carrier alt matching SVG desc tags.
- (efmp-305-u02-translate-r1, translate, agy) All 5 key_terms in index.mdx are bound to terminology.csv; translation_status stays draft pending independent G5.
- (efmp-305-u02-translate-r1, translate, agy) Proposed terms for owner: learner diversity (متعلمین کا تنوع), impairment (خرابی), handicap (ہینڈی کیپ / ماحولیاتی رکاوٹ), labelling (لیبلنگ / منفی ٹھپا لگانا), stigma (داغ / عیب).
- (efmp-305-u02-translate, translate, agy) All 4 .ur.svg figure variants are wired in topics 1 and 2 with exact carrier alt text matching the SVG `<desc>` tags.
- (efmp-305-u02-translate, translate, agy) All 5 key_terms in `index.mdx` are bound to `terminology.csv`; `translation_status` remains `draft` pending independent G5 review.


## Response snapshot

Corrected the Florian (2014) citation in EFMP-305 Unit 2, gave the Hornby DOI link text (EN and UR), recorded Hornby in the unit sources file, refreshed the G2 evidence, and added the G3 "repairs applied" tracker row with G3 left unticked.

## Outcome

- Impact: repair_en for EFMP-305 Unit 2 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Corrected the Florian (2014) citation in EFMP-305 Unit 2, gave the Hornby DOI link text (EN and UR), recorded Hornby in the unit sources file, refreshed the G2 evidence, and added the G3 "repairs applied" tracker row with G3 left unticked.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Urdu topic 2.2 Further reading has the corrected Florian citation and DOI link, but the Urdu description line was left as it was; G5 should check it.
  - `static/content-status.json` is git-ignored and goes stale after any edit; run `npm run build:content-status` before `check:content`.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
