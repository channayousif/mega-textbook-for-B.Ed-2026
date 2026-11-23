---
id: crew-gcce-400-u03-repair_en
title: crew repair_en GCCE-400 unit 3
stage: misc
date: 2026-11-23
surface: agent
model: claude
feature: gcce-400
branch: crew/gcce-400-u03-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-4/gcce-400/unit-03/topic-01.mdx
 - docs/semester-4/gcce-400/unit-03/topic-02.mdx
 - docs/semester-4/gcce-400/unit-03/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-03/unit-assessment.mdx
 - specs/content/gcce-400/reviews/unit-03/G2/20261123T091838969Z-gates.json
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261123T091838969Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261123T091838969Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261123T091838969Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261123T091838969Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261123T091838969Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261123T091838969Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261123T091838969Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-03/G2/logs-20261123T091838969Z/validate-content.txt
 - specs/content/gcce-400/sources/unit-03.md
 - specs/content/gcce-400/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job gcce-400-u03-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u03-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/gcce-400/reviews/unit-03/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 3 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GCCE-400 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gcce-400/`, and `static/img/figures/gcce-400/unit-03/`.

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
From `specs/content/gcce-400/reviews/unit-03/G3/52caad24-9ea1-412b-918e-0ec74d99f5d0.json` (disposition: revise). Resolve each one:
- [blocking] Constitutional currency: Chapter 1 of Part II now has 25 fundamental rights, not 24. Article 9A (clean and healthy environment) was inserted by the Twenty-sixth Amendment Act, 2024 (Section 2), and is omitted; the four-category grouping at topic-01.mdx:82-105 also omits Articles 23 and 24, yet MCQ 10 relies on Article 24 (unit-assessment.mdx:77). sources/unit-03.md:18 states that subsequent amendments "do not alter these substantive fundamental rights and duties", which is false for Article 9A and for Article 17(2) (forum now the Federal Constitutional Court, Twenty-seventh Amendment 2025)....
- [blocking] MCQ 4 answer key (unit-assessment.mdx:131) states Article 25(2) prohibits discrimination "on the basis of sex alone". The word "alone" was omitted by the Eighteenth Amendment Act, 2010 (Section 8); the current text reads "on the basis of sex". The key contradicts the current Constitution and the unit's own prose at topic-01.mdx:103. Repair: delete "alone" from the key.
- [advisory] topic-01.mdx:105 gives Article 26 examples "such as parks, roads, and transport"; the constitutional text covers access to "places of public entertainment or resort". Roads and transport are not obviously within that wording. Consider narrowing the examples.
- [advisory] The glencoe-civics-today declaration (sources/unit-03.md:14) does not name owner decision D-2026-0001, and the unit attributes a specific explanation to the book (topic-01.mdx:43, topic-02.mdx:45). The declaration is honest that no page or wording is claimed; consider citing D-2026-0001 and presenting the idea as general civics knowledge.
- [uncertain] MCQ 4 (unit-assessment.mdx:47-51) is ambiguous: the scenario (women banned from local public parks) is directly governed by Article 26 (non-discrimination in access to public places), which the topic text itself cites for parks (topic-01.mdx:105), but Article 26 is not an option and the key selects Article 25. Repair: add Article 26 as an option or reword the stem to a scenario that only Article 25 governs.
- [uncertain] topic-01.mdx:52 describes Article 184(3) as the Supreme Court being able to "take notice of questions of public importance involving fundamental rights". The Twenty-sixth Amendment Act, 2024 (Section 10) added a proviso barring an order or declaration on its own or suo motu beyond the contents of an application. The plain-language phrasing no longer discloses that restriction. Repair: state that the Supreme Court may act on an application raising a question of public importance.
- [uncertain] The approved Unit 3 assessment blueprint (content-spec.md:196) requires the summative assessment to include one Analyze item asking the learner to identify which constitutional right is at stake in each of four short school and community scenarios and the duty that balances it. No summative item does this; the four-scenario right/duty exercise exists only as the formative Topic 3.2 activity (topic-02.mdx:113-132). Repair: add the item to the summative bank or record an owner ruling that the formative activity satisfies the blueprint.
- [uncertain] render-review unavailable: the production build (deployed SHA e7e1130220816c9d83316cd40336060adcaf9ad2) is not the review input because index.mdx, topic-01.mdx, topic-02.mdx and fig-U3-5/6/7.webp differ from HEAD 3ea8c670e552cbafd99c59d3e36eb35cb4788f25. No rendered page or print view was inspected, so accessibility remains unverified. See logs/render-review.txt.

## Notes from earlier jobs on this unit
- (gcce-400-u03-review_en, review_en, claude_crew) Deployed SHA `e7e113022` differs from reviewed HEAD `3ea8c670e` on `index.mdx`, `topic-01.mdx`, `topic-02.mdx` and `fig-U3-5/6/7.webp`; production render inspection was unavailable, so a re-review after repair must re-check accessibility.
- (gcce-400-u03-review_en, review_en, claude_crew) The repair owner should re-read Articles 8-28 in the current transcription before editing: Article 9A (2024), Articles 23-24, Article 17(2)'s new forum, and the Article 184(3) proviso all postdate the 2012 edition the unit cites.
- (gcce-400-u03-review_en, review_en, claude_crew) Report and evidence are at `specs/content/gcce-400/reviews/unit-03/G3/52caad24-9ea1-412b-918e-0ec74d99f5d0.json`; the report is advisory and does not certify G3.
- (gcce-400-u03-illustrate, illustrate, agy) G3 en-review remains open for Unit 3 (currency of cited constitutional provisions under the 1973 Constitution, Articles 8-28 and Article 5).
- (gcce-400-u03-illustrate, illustrate, agy) G5 ur-review remains open (owns 360px and A4 print inspection, and RTL reading order of schematic figures fig-U3-1 and fig-U3-2).


## Response snapshot

Applied all G3 findings for GCCE-400 Unit 3 in English and Urdu (Article 9A and Articles 23-24 added, Article 184(3) proviso, Article 25(2) key, MCQ 4 rewording, four-scenario Analyze item as RRQ 10, Article 26 examples, sources currency and D-2026-0001 notes), regenerated G2 evidence and appended the advisory G3 repair row.

## Outcome

- Impact: repair_en for GCCE-400 Unit 3 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 17 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied all G3 findings for GCCE-400 Unit 3 in English and Urdu (Article 9A and Articles 23-24 added, Article 184(3) proviso, Article 25(2) key, MCQ 4 rewording, four-scenario Analyze item as RRQ 10, Article 26 examples, sources currency and D-2026-0001 notes), regenerated G2 evidence and appended the advisory G3 repair row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - A fresh independent G3 is needed. The production site still runs the pre-repair commit, so check whether it has redeployed before the render and accessibility inspection (F6).
  - RRQ 10 and MCQ 4 were rewritten in both locales, so the G5 Urdu review should check the new Urdu wording in `unit-assessment.mdx` and the new Topic 3.1 bullets for Article 9A and Articles 23-24.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
