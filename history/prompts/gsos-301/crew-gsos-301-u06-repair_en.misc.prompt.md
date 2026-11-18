---
id: crew-gsos-301-u06-repair_en
title: crew repair_en GSOS-301 unit 6
stage: misc
date: 2026-11-05
surface: agent
model: codex
feature: gsos-301
branch: crew/gsos-301-u06-repair_en
user: crew
command: crew repair_en
labels: ["crew", "codex", "repair_en"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-2/gsos-301/unit-06/topic-01.mdx
 - docs/semester-2/gsos-301/unit-06/topic-02.mdx
 - history/prompts/general/20261131-repair-gsos-unit-six-findings.general.prompt.md
 - specs/content/gsos-301/concepts/unit-06.md
 - specs/content/gsos-301/coverage/unit-06.md
 - specs/content/gsos-301/reviews/unit-06/G2/20261105T181031722Z-gates.json
 - specs/content/gsos-301/reviews/unit-06/G2/logs-20261105T181031722Z/check-bloom-bands.txt
 - specs/content/gsos-301/reviews/unit-06/G2/logs-20261105T181031722Z/check-concept-graph.txt
 - specs/content/gsos-301/reviews/unit-06/G2/logs-20261105T181031722Z/check-depth-gate.txt
 - specs/content/gsos-301/reviews/unit-06/G2/logs-20261105T181031722Z/check-docs-sync.txt
 - specs/content/gsos-301/reviews/unit-06/G2/logs-20261105T181031722Z/check-figures.txt
 - specs/content/gsos-301/reviews/unit-06/G2/logs-20261105T181031722Z/check-no-answer-keys.txt
 - specs/content/gsos-301/reviews/unit-06/G2/logs-20261105T181031722Z/check-no-em-dash.txt
 - specs/content/gsos-301/reviews/unit-06/G2/logs-20261105T181031722Z/validate-content.txt
 - specs/content/gsos-301/reviews/unit-06/repair-20261105.md
 - specs/content/gsos-301/reviews/unit-06/repair-checks-20261105/content-final.log
 - specs/content/gsos-301/reviews/unit-06/repair-checks-20261105/content-origin-main.log
 - specs/content/gsos-301/sources/unit-06.md
 - specs/content/gsos-301/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u06-repair_en

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u06-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/gsos-301/reviews/unit-06/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 6 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-06/`.

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
From `specs/content/gsos-301/reviews/unit-06/G3/20261102T212740Z-g3-desk-c2180039.json` (disposition: revise). Resolve each one:
- [advisory] In docs/semester-2/gsos-301/unit-06/topic-02.mdx line 58, the factual claim that television and social media reach the majority of the population in Pakistan is cited as (Hammond & Cheney, n.d.). Hammond & Cheney is a US college introductory sociology text on LibreTexts and does not contain empirical findings on Pakistani media demographics. The citation should be replaced with a Pakistani empirical source (e.g. PEMRA, PBS, Gallup Pakistan) or stated as a general observation without attributing Pakistani demographics to an American textbook.
- [advisory] In docs/semester-2/gsos-301/unit-06/topic-01.mdx line 60, "a factory in Sialkit supplies garments to a store in Berlin" contains a typographical error in the Pakistani city name ("Sialkit" instead of "Sialkot").
- [advisory] In specs/content/gsos-301/coverage/unit-06.md line 26, Sub-topic U6-07 (Media and society) is mapped to RRQ items 7 and 8, but RRQ item 7 tests environmental issues (U6-09). U6-07 should map to RRQ item 8 only. In line 21, U6-02 (Modernization and globalization) maps to ERQ item 3 but omits ERQ item 2, which directly assesses globalization.
- [advisory] In specs/content/gsos-301/concepts/unit-06.md line 14, CON:GSOS-301-6-10 (Media and society) is mapped to MCQ-06 and RRQ-07 (an environmental item) instead of RRQ-08 (digital divide in media). In line 10, the Urdu label for CON:GSOS-301-6-6 contains a typographical error (ڈیجیتقل تقسیم instead of ڈیجیٹل تقسیم).
- [advisory] specs/content/gsos-301/sources/unit-06.md lists conerly2021 and hammondnd under ## Unverifiable sources, but omits retrieval attempt dates and explicit reference to Constitution Art. VII / decision D-2026-0001 for complete governance traceability.
- [uncertain] Visual browser and print inspection (360px viewport, keyboard table scrolling, desktop layout, and A4 print view) could not be executed because the crew job brief explicitly prohibits running npm run build, a dev server, or Playwright (render-review command unperformed, exit code 1). Structural accessibility checks (alt text, heading hierarchy, link text, SVG role/title/desc, figure text measurement) pass from source, but visual accessibility remains unverified until a permitted browser/print inspection can be run on a live build.

## Notes from earlier jobs on this unit
- (gsos-301-u06-translate-r1, translate, codex) English author must repair the citation, Sialkot typo and assessment mappings before G4 resumes.
- (gsos-301-u06-translate-r1, translate, codex) English author must repair the citation, Sialkot typo and assessment mappings before G4 resumes.
- (gsos-301-u06-translate, translate, codex) English author must repair the citation, Sialkot typo and coverage/concept mappings before translation resumes.
- (gsos-301-u06-translate, translate, codex) English author must repair the citation, Sialkot typo and coverage/concept mappings before translation resumes.
- (gsos-301-u06-review_en, review_en, agy) Replace (Hammond & Cheney, n.d.) citation in topic-02.mdx:58 for Pakistani media reach with an empirical Pakistani source, and fix the "Sialkit" typo in topic-01.mdx:60.


## Response snapshot

Repaired Unit 6’s media claim, Sialkot typo, assessment mappings and source-governance notes, and refreshed G2 evidence.

## Outcome

- Impact: repair_en for GSOS-301 Unit 6 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 19 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Repaired Unit 6’s media claim, Sialkot typo, assessment mappings and source-governance notes, and refreshed G2 evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - G3 remains unticked; permitted browser/print inspection and fresh independent review are pending.
  - G3 remains unticked; permitted browser/print inspection and fresh independent review are pending.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
