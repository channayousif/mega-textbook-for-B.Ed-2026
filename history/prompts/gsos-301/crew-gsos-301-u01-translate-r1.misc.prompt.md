---
id: crew-gsos-301-u01-translate-r1
title: crew translate GSOS-301 unit 1
stage: misc
date: 2026-10-19
surface: agent
model: agy
feature: gsos-301
branch: crew/gsos-301-u01-translate-r1
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gsos-301/crew-gsos-301-u01-translate-r1.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-01/unit-teacher-notes.mdx
 - specs/content/gsos-301/reviews/unit-01/G4/translation-handoff.md
 - specs/content/gsos-301/tasks.md
 - static/img/figures/gsos-301/unit-01/fig-U1-1.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-1.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-2.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-2.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-3.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-3.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-4.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-4.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-5.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-5.ur.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-6.ur.dark.svg
 - static/img/figures/gsos-301/unit-01/fig-U1-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gsos-301-u01-translate-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u01-translate-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GSOS-301 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-01/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (gsos-301-u01-translate, translate, opencode) ** Six `.ur.svg` figure variants are still missing (generate-figures scope); they are not required while `translation_status: draft` but will be needed before `reviewed`. The 10 `key_terms` entries use sociology terms not present in `terminology.csv`; they pass the gate now (bank check is dormant at `draft`) but must be owner-approved before `reviewed`. The G3 advisory report flagged figure text-geometry overflows on all 6 SVGs and two citation mismatches in the English source  -  translate f...
- (gsos-301-u01-translate, translate, opencode) ** The `key_terms` Urdu values (عمرانیات, فعالاتیت, تنازعہ نظریہ, علامتی باہم فعل, etc.) are proposed additions to `terminology.csv`  -  no sociology terms currently exist in the bank.
- (gsos-301-u01-review_en, review_en, agy) Figure text geometry overflows right edge on all 6 SVGs and dark variants; fix by adding text-anchor: end; to .wm class and re-wrapping long cell lines in fig-U1-4 and fig-U1-6.
- (gsos-301-u01-review_en, review_en, agy) In topic-01..03 prose and Further reading, replace phantom citations to Henson (2022) with Hammond & Cheney (n.d.) and Givens & White (2023) with Conerly et al. (2021).
- (gsos-301-u01-review_en, review_en, agy) Unit 1 G3 review disposition is revise; tasks.md advisory row references the validated report at specs/content/gsos-301/reviews/unit-01/G3/7725a4f0-f3eb-4a48-aed1-23a2605c30d8.json.


## Response snapshot

Translated GSOS-301 Unit 1 into its complete Urdu mirror across 6 MDX files and authored 6 localized RTL figure variants with dark twins, passing all 13 content gates.

## Outcome

- Impact: translate for GSOS-301 Unit 1 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 21 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GSOS-301 Unit 1 into its complete Urdu mirror across 6 MDX files and authored 6 localized RTL figure variants with dark twins, passing all 13 content gates.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - When English G3 citation revisions land (Henson 2022 -> Hammond & Cheney, Givens & White 2023 -> Conerly et al.), sync the citation keys in Urdu topic prose and Further reading.
  - Proposed sociology terms (عمرانیات، مثبتیت، فعلیت، وغیرہ) are documented in reviews/unit-01/G4/translation-handoff.md for CurriculumOwner banking in terminology.csv.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
