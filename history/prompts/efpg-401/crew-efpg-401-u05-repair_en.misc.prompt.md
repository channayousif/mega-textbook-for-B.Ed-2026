---
id: crew-efpg-401-u05-repair_en
title: crew repair_en EFPG-401 unit 5
stage: misc
date: 2026-11-18
surface: agent
model: claude
feature: efpg-401
branch: crew/efpg-401-u05-repair_en
user: crew
command: crew repair_en
labels: ["crew", "claude", "repair_en"]
links:
  spec: specs/content/efpg-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efpg-401/unit-05/topic-01.mdx
 - docs/semester-3/efpg-401/unit-05/topic-02.mdx
 - docs/semester-3/efpg-401/unit-05/topic-03.mdx
 - docs/semester-3/efpg-401/unit-05/topic-04.mdx
 - docs/semester-3/efpg-401/unit-05/topic-05.mdx
 - docs/semester-3/efpg-401/unit-05/topic-06.mdx
 - docs/semester-3/efpg-401/unit-05/topic-07.mdx
 - docs/semester-3/efpg-401/unit-05/unit-assessment.mdx
 - history/prompts/efpg-401/20261219-efpg-401-unit-05-g3-repair.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-05/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-05/topic-04.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-05/topic-05.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-05/topic-06.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-05/topic-07.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efpg-401/unit-05/unit-assessment.mdx
 - specs/content/efpg-401/figures/unit-05.md
 - specs/content/efpg-401/reviews/unit-05/G2/20261118T223523116Z-gates.json
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T223523116Z/check-bloom-bands.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T223523116Z/check-concept-graph.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T223523116Z/check-depth-gate.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T223523116Z/check-docs-sync.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T223523116Z/check-figures.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T223523116Z/check-no-answer-keys.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T223523116Z/check-no-em-dash.txt
 - specs/content/efpg-401/reviews/unit-05/G2/logs-20261118T223523116Z/validate-content.txt
 - specs/content/efpg-401/sources/unit-05.md
 - specs/content/efpg-401/tasks.md
 - static/img/figures/efpg-401/unit-05/fig-U5-1.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-1.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-1.ur.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-1.ur.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-14.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-14.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-14.ur.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-14.ur.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-2.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-2.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-2.ur.dark.svg
 - static/img/figures/efpg-401/unit-05/fig-U5-2.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job efpg-401-u05-repair_en

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efpg-401-u05-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Apply the findings of the latest G3 report under specs/content/efpg-401/reviews/unit-05/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 5 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFPG-401 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efpg-401/`, and `static/img/figures/efpg-401/unit-05/`.

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
From `specs/content/efpg-401/reviews/unit-05/G3/crew-job-efpg-401-u05-review_en.json` (disposition: revise). Resolve each one:
- [blocking] docs/semester-3/efpg-401/unit-05/topic-02.mdx:71-73 (Activity: The missing step) claims one step is missing, but the quoted Grade 4 plan lists outcome, warm-up, presentation, practice, production, assessment and homework. The task has no determinate answer. Remove one step from the quoted plan or reword the task (for example, diagnose the weakest step).
- [blocking] Prose attributes specific claims to sources that sources/unit-05.md declares as title-level only, without disclosing them as uncorroborated: Sheikh (1998) at topic-01.mdx:47 and topic-03.mdx:71 (declared only for U5-10); Celce-Murcia (1991) at topic-01.mdx:67, topic-04.mdx:62, topic-05.mdx:65, topic-06.mdx:59 and topic-07.mdx:55. Topic 5.7 credits its grammar claim to Celce-Murcia while coverage maps U5-10 to Sheikh. Recast as the unit's own guidance, disclose the limit, or bind supporting source text, and align coverage and declaration scope.
- [advisory] static/img/figures/efpg-401/unit-05/fig-U5-2.svg:39,41 prints "180 units" under both the teacher-talk and pupil-activity bars, a leaked geometry value with no instructional meaning. Remove or replace with a meaningful label.
- [advisory] Alt text drift: fig-U5-1 (topic-01.mdx:29) says "from a warm-up game to a review quiz" but the figure shows naming objects and writing three sentences; fig-U5-14 (topic-07.mdx:51) says form, meaning and use are labelled at each step, but the figure labels meaning, use, use.
- [advisory] unit-assessment.mdx MCQ key: 8 of 10 items are keyed B (only MCQ 3 = C and MCQ 6 = A), so the answer position is predictable. Rebalance option order.
- [advisory] unit-assessment.mdx:107 RRQ 7 contrasts a "comprehension question" with an "inferential question", while Topic 5.5 frames both as comprehension questions moving from literal to inferential. Use "literal question" to match the teaching and the model answer.
- [advisory] topic-06.mdx:59 cites process writing (drafting and feedback), but the guided writing sequence the topic teaches (model, analyse, plan together, write, share) has no drafting or feedback step. Align the claim with the taught sequence or add the step.
- [uncertain] The bound Paulsrud and Gheitasi (2024) record is an abstract-level paraphrase (language-as-resource stance; materials outweigh policy). topic-01.mdx:43 ("reading the class in front of them ... the outcomes they must reach, not a fixed recipe") and topic-03.mdx:37 (resource-stance teachers choose activities that bring in home languages) state more than the bound notes support; support is unverified.
- [uncertain] render-review unavailable: production is built from 331c3fc1720593a1b53c129fc71ec144d44f4f35, and index.mdx, topic-01/03/04/06.mdx plus fig-U5-15 to fig-U5-19.webp differ from reviewed HEAD 0763fd82f89122bb83f1e488a22a0de21016a154. Per the crew brief no browser, 360px, keyboard or A4 print inspection was run, so accessibility is unverified.
- [uncertain] This independent report is advisory only. No protected signing host or qualified registry entry was used, so it does not certify G3 or support a tracker done state.

## Notes from earlier jobs on this unit
- (efpg-401-u05-review_en, review_en, claude) The repair job must fix `topic-02.mdx:71-73` (the missing-step activity lists all seven steps) and either rewrite or flag as unchecked the Celce-Murcia and Sheikh claims listed in the report; Topic 5.7's grammar claim is credited to Celce-Murcia while the coverage file maps it to Sheikh.
- (efpg-401-u05-review_en, review_en, claude) Minor fixes worth doing at the same time: the "180 units" labels at `fig-U5-2.svg:39,41`, the fig-U5-1 and fig-U5-14 alt text, the multiple-choice answer order (8 of 10 are B), and the RRQ 7 wording.
- (efpg-401-u05-review_en, review_en, claude) The next G3 attempt can capture render evidence only after production is deployed from a main that includes the Unit 5 changes (it is currently at 331c3fc1).
- (efpg-401-u05-illustrate, illustrate, agy) Topics 5.2, 5.5 and 5.7 intentionally omit raster illustrations because their pedagogy turns on a written plan, text emotions, or tense choices where text-free images would only decorate.
- (efpg-401-u05-illustrate, illustrate, agy) Rendered Urdu pages (Nastaliq at 360px and A4 print) were not inspected locally due to host limits; G5 review must verify deployed /ur/ pages.


## Response snapshot

Applied every finding of the advisory G3 report to EFPG-401 Unit 5 in English and Urdu (fixed the Topic 5.2 missing-step activity, removed claims credited to books checked only by title, narrowed the Paulsrud claims, fixed figure alt text and labels, rebalanced the MCQ key, reworded RRQ 7), regenerated G2 evidence and added an unticked advisory G3 repair row.

## Outcome

- Impact: repair_en for EFPG-401 Unit 5 by claude (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 41 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Applied every finding of the advisory G3 report to EFPG-401 Unit 5 in English and Urdu (fixed the Topic 5.2 missing-step activity, removed claims credited to books checked only by title, narrowed the Paulsrud claims, fixed figure alt text and labels, rebalanced the MCQ key, reworded RRQ 7), regenerated G2 evidence and added an unticked advisory G3 repair row.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - fig-U5-1, fig-U5-2 and fig-U5-14 were edited without renaming, so visitors may see the old versions for up to 30 days; verify the live images after deployment.
  - The MCQ options were reordered (new key B D C A C A D C B D); the backend quiz bank for Unit 5, if seeded from this page, has the old order.
  - Celce-Murcia and Sheikh are now cited only under Further reading, with no specific in-text claims; keep it that way until a bound excerpt exists.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
