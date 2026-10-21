---
id: crew-gqur-301-u09-translate
title: crew translate GQUR-301 unit 9
stage: misc
date: 2026-10-21
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u09-translate
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/0854-gqur301-u09-urdu-translate.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-09/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-09/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-09/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-09/unit-assessment.mdx
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u09-translate

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u09-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-301 Unit 9 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 9 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-09/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (gqur-301-u09-review_en, review_en, opencode) The four render PNGs in renders-g3/ are identical placeholder files (same hash) from the previous attempt; they are not meaningful per-figure visual inspections and the next job should regenerate them if render quality matters.
- (gqur-301-u09-author, author, codex) Independent G3 review, Urdu translation and figure localisation remain pending.
- (gqur-301-u09-author, author, codex) Independent G3 review, Urdu translation and figure localisation remain pending.


## Response snapshot

Translated GQUR-301 Unit 9 (Introduction to Probability) into a complete Urdu draft mirror at G4 (index, topic-01, topic-02, unit-assessment with 10/10/5 bank and translated answers), with all figure .ur.svg references wired, PrintHandout parity preserved, academic-plain Urdu bound to the concept graph's labels, and 12/13 content gates passing (only pre-existing content-status failure remains).

## Outcome

- Impact: translate for GQUR-301 Unit 9 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 5 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GQUR-301 Unit 9 (Introduction to Probability) into a complete Urdu draft mirror at G4 (index, topic-01, topic-02, unit-assessment with 10/10/5 bank and translated answers), with all figure .ur.svg references wired, PrintHandout parity preserved, academic-plain Urdu bound to the concept graph's labels, and 12/13 content gates passing (only pre-existing content-status failure remains).
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - 4 .ur.svg figure variants (fig-U9-1 concept-map, fig-U9-2 diagram, fig-U9-3 diagram, fig-U9-4 table) are referenced but not yet on disk  -  figure localisation is the next job.
  - Probability terms (احتمال، واقعہ، نمونہ فضاء، تکملہ، اتحاد، تقاطع، باہمی اخراج، آزاد) are used from the concept graph's author-supplied labels and are NOT in the frozen terminology.csv bank  -  if a terminology bank expansion is planned, these are the proposed entries.
  - An independent G5 Urdu review (separate session) is required before this unit can be marked reviewed; translation_status is deliberately left as draft.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
