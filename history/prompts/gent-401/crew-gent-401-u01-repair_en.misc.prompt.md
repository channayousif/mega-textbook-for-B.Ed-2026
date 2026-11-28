---
id: crew-gent-401-u01-repair_en
title: crew repair_en GENT-401 unit 1
stage: misc
date: 2026-11-28
surface: agent
model: claude_crew
feature: gent-401
branch: crew/gent-401-u01-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude_crew", "repair_en"]
links:
  spec: specs/content/gent-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gent-401/unit-01/topic-01.mdx
 - docs/semester-4/gent-401/unit-01/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gent-401/unit-01/unit-assessment.mdx
 - specs/content/gent-401/reviews/unit-01/G2/20261128T033548875Z-gates.json
 - specs/content/gent-401/reviews/unit-01/G2/logs-20261128T033548875Z/check-bloom-bands.txt
 - specs/content/gent-401/reviews/unit-01/G2/logs-20261128T033548875Z/check-concept-graph.txt
 - specs/content/gent-401/reviews/unit-01/G2/logs-20261128T033548875Z/check-depth-gate.txt
 - specs/content/gent-401/reviews/unit-01/G2/logs-20261128T033548875Z/check-docs-sync.txt
 - specs/content/gent-401/reviews/unit-01/G2/logs-20261128T033548875Z/check-figures.txt
 - specs/content/gent-401/reviews/unit-01/G2/logs-20261128T033548875Z/check-no-answer-keys.txt
 - specs/content/gent-401/reviews/unit-01/G2/logs-20261128T033548875Z/check-no-em-dash.txt
 - specs/content/gent-401/reviews/unit-01/G2/logs-20261128T033548875Z/validate-content.txt
 - specs/content/gent-401/tasks.md
 - history/prompts/gent-401/crew-gent-401-u01-repair_en.misc.prompt.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gent-401-u01-repair_en

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gent-401-u01-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/gent-401/reviews/unit-01/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 1 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GENT-401 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gent-401/`, and `static/img/figures/gent-401/unit-01/`.

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
From `specs/content/gent-401/reviews/unit-01/G3/20261127T192818Z-g3-desk-688055d1.json` (disposition: revise). Resolve each one:
- [blocking] MCQ key and option-length giveaway (unit-assessment.mdx:32-81, key 108-119). Key distribution A1/B7/C2/D0, so an all-B answer scores 7/10 and no item keys D; the keyed option is the longest option in 7 of 10 items (1,2,3,5,6,7,8). Item-writing rule requires parallel similar-length options with no longest-option giveaway. REPAIR: rebalance correct letters across A-D and vary option length so the keyed option is not disproportionately longest.
- [blocking] topic-01.mdx:91 says the seven characteristics in fig-U1-2 "appear in both sources". The bound OpenStax 1.3 list and Butler p. 23 list do not both contain confidence, problem-solving, openness to learning, persistence or curiosity as stated; at most three rows are in both. REPAIR: reword to say the seven are drawn from the two sources, or common to the two accounts, and keep the table.
- [advisory] butler-iea edition year 2020 is the content-spec value and still needs IEA confirmation (sources/unit-01.md:17-19); the unit cites Butler (2020) throughout. The author discloses this.
- [advisory] GENT-401 is not yet in catalog/courses.json (content-spec.md:14); an owner ruling is pending. Course-level, outside Unit 1 content.
- [uncertain] Render and print inspection unavailable. Deployed SHA 366019f8ace647e892523e553b81ab6d1832ec68 differs from reviewed HEAD 6a810e62c7b9d4ff7643b56a17f75cb9db2ce98e on docs/semester-4/gent-401/unit-01/index.mdx and static/img/figures/gent-401/unit-01/fig-U1-5.webp, so the CI-built production site is not the reviewed input and the brief forbids a build or server. accessibility is unverified. The missing or mismatched banner asset is treated as unverified, not as a content defect.

## Notes from earlier jobs on this unit
- (gent-401-u01-review_en, review_en, claude_crew) A repair job must fix F1 (rebalance MCQ key and option lengths) and F2 (reword the "both sources" sentence); a fresh G3 attempt is only meaningful after the repaired commit is deployed, since the production build is the required render input.
- (gent-401-u01-review_en, review_en, claude_crew) Advisory A-1 remains: the `butler-iea` edition year 2020 needs IEA confirmation (`sources/unit-01.md:17-19`).
- (gent-401-u01-review_en, review_en, claude_crew) The Urdu mirror and `.ur.svg` variants are G5 scope and were not evaluated here.
- (gent-401-u01-illustrate, illustrate, agy) Unit banner fig-U1-5 is placed in English and Urdu index pages; Unit 1 G3 review and G5 review remain open.
- (gent-401-u01-illustrate, illustrate, agy) Proposed unbanked terms remain for owner/G5 review: "Entrepreneurship" -> "کاروباری صلاحیت", "Innovation" -> "جدت", "Calculated risk" -> "سوچا سمجھا خطرہ", "Managerial thinking" -> "انتظامی سوچ".

## Response snapshot

Applied the two blocking G3 findings in English and Urdu: the unit 1 MCQ options were reordered and reworded so the key distribution is A3/B2/C2/D3 and no item keys its longest option (verified by a character count on both locales), and the topic-01 sentence now says the seven characteristics are drawn from the two sources. Refreshed the G2 gate evidence, repointed the G2 row, appended the advisory repair tracker row, and left G3 unticked.

## Outcome

- Impact: repair_en for GENT-401 Unit 1 by claude_crew (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 15 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied the two blocking G3 findings in English and Urdu (MCQ key/length rebalance; the "both sources" reword), refreshed the G2 evidence, repointed the G2 row and appended the advisory repair row, with `npm run check:content` green.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Render and print inspection stays unverified; it needs this commit deployed (or an owner-run build) and a permitted render job.
  - Advisory A-1 remains: the `butler-iea` edition year 2020 needs IEA confirmation (`sources/unit-01.md:17-19`).
  - GENT-401 is still absent from `catalog/courses.json`; the owner ruling is pending and is course-level, not Unit 1 content.
  - The Urdu MCQ options and key were reordered to mirror the English; G5 should check the Urdu option register and lengths.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
