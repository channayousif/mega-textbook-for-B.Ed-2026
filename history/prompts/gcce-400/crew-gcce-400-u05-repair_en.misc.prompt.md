---
id: crew-gcce-400-u05-repair_en
title: crew repair_en GCCE-400 unit 5
stage: misc
date: 2026-11-28
surface: agent
model: claude
feature: gcce-400
branch: crew/gcce-400-u05-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gcce-400/unit-05/topic-01.mdx
 - docs/semester-4/gcce-400/unit-05/topic-02.mdx
 - docs/semester-4/gcce-400/unit-05/topic-03.mdx
 - docs/semester-4/gcce-400/unit-05/unit-assessment.mdx
 - docs/semester-4/gcce-400/unit-05/unit-teacher-notes.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-05/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-05/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-05/unit-teacher-notes.mdx
 - specs/content/gcce-400/coverage/unit-05.md
 - specs/content/gcce-400/figures/unit-05.md
 - specs/content/gcce-400/reviews/unit-05/G2/20261128T033405984Z-gates.json
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261128T033405984Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261128T033405984Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261128T033405984Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261128T033405984Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261128T033405984Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261128T033405984Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261128T033405984Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261128T033405984Z/validate-content.txt
 - specs/content/gcce-400/sources/unit-05.md
 - specs/content/gcce-400/tasks.md
 - static/img/figures/gcce-400/unit-05/fig-U5-2-r2.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-2-r2.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-2-r2.ur.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-2-r2.ur.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-2.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-2.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-5-r2.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-5-r2.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-5-r2.ur.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-5-r2.ur.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-6-r2.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-6-r2.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-6-r2.ur.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-6-r2.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gcce-400-u05-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/gcce-400/reviews/unit-05/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 5 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-05/`.

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
From `specs/content/gcce-400/reviews/unit-05/G3/20261127T192818Z-g3-desk-fd20070f.json` (disposition: revise). Resolve each one:
- [blocking] F1: docs/semester-4/gcce-400/unit-05/topic-03.mdx:71,75-79,81, the fig-U5-6 alt text (topic-03.mdx:67) and unit-assessment.mdx:113,201,234 attribute the Lawyers' Movement (2007-2009) case study, its dated milestones and its "three fundamental pillars" to Batool, Mahmood & Ullah (2019). The open-access article at the cited DOI (full PDF read 2026-11-24, source-checks/batool-2019-lawyers-movement.md and batool-2019-article.txt) is about civil society in Pakistan and Turkey and contains no Lawyers' Movement material; its conclusion says civil society "failed to produce desired results". The bo...
- [blocking] F2: docs/semester-4/gcce-400/unit-05/topic-01.mdx:65 states "As studies of Pakistan's digital landscape demonstrate, millions of citizens, particularly women in rural districts, low-income daily-wage earners, and elderly residents, have limited or no access ..." but names no source; sources/unit-05.md lists no digital-divide key and coverage/unit-05.md maps U5-01 only to youniss-levine-2009 and constitution-pakistan. The course's digital-divide notes (shair-2022, iftikhar-2023) belong to Unit 6 and are outside this bundle. Repair: cite a bound source or remove the implied citation; adding a...
- [advisory] F5: docs/semester-4/gcce-400/unit-05/topic-03.mdx:99 contains the duplicated word "sanitation sanitation" in the activity prompt.
- [advisory] F6: MCQ key distribution is A1/B6/C3/D0 (unit-assessment.mdx:131-140); no item is keyed D and B is the key for 6 of 10 items. MCQ 2 (unit-assessment.mdx:39) is tagged Understand but is recall-level (Remember would be more accurate).
- [advisory] F7: the fig-U5-5 SVG panel is labelled "3. Bureaucracy / Formal stage" while the topic-03 heading, the figure alt text and the content-spec use "Bureaucratisation". Align the figure label or the prose.
- [advisory] F9: the Further reading entries in topic-01.mdx, topic-02.mdx and topic-03.mdx use bare URLs as link text; give them descriptive link text.
- [advisory] F10: the approved figure plan for fig-U5-2 (content-spec.md:316) names "family, school, media, religious and community leaders"; the unit's figure folds community leaders into "Family and local community" and omits religious leaders.
- [advisory] F11: unit-teacher-notes.mdx calls Community Event Planning "a core practical activity"; the guide lists the practical activities as optional (4TH SEMESTER.txt:170-176).
- [uncertain] F3: the youniss-levine-2009 declaration in sources/unit-05.md describes a title-level use for U5-01 and U5-02, but topic-01.mdx:52 attributes a specific finding ("demonstrate that civic attitudes are formed through multiple agents of socialization") and topic-02.mdx never cites the book in prose; the declaration does not name owner ruling D-2026-0001. The declaration is not complete for the use made of it.
- [uncertain] F4: docs/semester-4/gcce-400/unit-05/unit-assessment.mdx:105 RRQ 6 asks the learner to "explaining why gathering evidence must precede taking coordinated action", but the mark scheme (unit-assessment.mdx:174-178) awards 3 marks for naming the six steps and nothing for the explanation. A learner who names all six steps without explaining earns full marks.
- [uncertain] F8: render-review is unavailable. The deployed SHA ac3d5e2fcd1818492dd11bc9b72d8cfed9a25e8d is not the review input because index.mdx and fig-U5-7.webp differ from HEAD 175a90b7a644bd366cf3d1d2592090a93f912bcb. No rendered page, narrow view or A4 print view was inspected, so the accessibility criterion is unverified. This is a missing-evidence limitation, not an observed content defect; changed images can be served stale for up to 30 days, so a missing or mismatched live asset would be unverified, not a defect.

## Notes from earlier jobs on this unit
- (gcce-400-u05-review_en, review_en, claude_crew) F1 needs an owner ruling or a newly bound source because the approved content-spec maps batool-2019-civil-society to Unit 5 and the article does not document the Lawyers' Movement; the full PDF and extracted text are in `source-checks/` for verification.
- (gcce-400-u05-review_en, review_en, claude_crew) A fresh G3 run needs a deployed build matching HEAD (the current deploy lacks the fig-U5-7 banner) before the accessibility criterion can move off unverified.
- (gcce-400-u05-review_en, review_en, claude_crew) G3 remains open and advisory; the report supports no certification, tracker done state or publication.
- (gcce-400-u05-illustrate, illustrate, agy) G3 en-review remains open; reviewer should confirm the Lawyers' Movement timeline against Batool et al. (2019) and constitutional articles against the current text.
- (gcce-400-u05-illustrate, illustrate, agy) G5 ur-review remains open; translation_status is draft across English and Urdu indices, and G5 owns Nastaliq shaping, 360px and A4 print layout inspection.


## Response snapshot

Applied the Unit 5 G3 findings in English and Urdu (F1 only partly, pending an owner ruling; F8 awaits deploy), refreshed G2 evidence and added an advisory G3 repair row with G3 left unticked.

## Outcome

- Impact: repair_en for GCCE-400 Unit 5 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 37 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied the Unit 5 G3 findings in English and Urdu (F1 only partly, pending an owner ruling; F8 awaits deploy), refreshed G2 evidence and added an advisory G3 repair row with G3 left unticked.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - F1 still open: the Lawyers' Movement (Topic 5.3, fig-U5-6, RRQ 10, ERQ 3) has no bound source and needs an owner ruling or a new source; `sources/texts/batool-2019-civil-society.md` bullet 4 is false and also bound to Unit 2.
  - The next G3 run needs owner authorisation and a deploy matching HEAD; check the new Urdu sentences and the `-r2` figures at G5 and in the rendered page.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
