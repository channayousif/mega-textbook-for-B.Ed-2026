---
id: crew-gqur-301-u12-translate-r1
title: crew translate GQUR-301 unit 12
stage: misc
date: 2026-10-22
surface: agent
model: opencode
feature: gqur-301
branch: crew/gqur-301-u12-translate-r1
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gqur-301/0552-translate-gqur-301-unit-twelve-urdu.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-12/unit-assessment.mdx
tests:
 - npm run check:content
---

## Prompt

# Crew job gqur-301-u12-translate-r1

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u12-translate-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-301 Unit 12 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 12 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-12/`.

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
- (gqur-301-u12-translate, translate, codex) A separate author must repair F1-F6 before translation resumes; draft status and G3/G5 remain unchanged.
- (gqur-301-u12-translate, translate, codex) A separate author must repair F1-F6 before translation resumes; draft status and G3/G5 remain unchanged.
- (gqur-301-u12-review_en, review_en, codex) A separate author must resolve F1-F6, followed by a fresh independent review with provenance and browser/print evidence; G3 remains open.
- (gqur-301-u12-review_en, review_en, codex) A separate author must resolve F1-F6, followed by a fresh independent review with provenance and browser/print evidence; G3 remains open.
- (gqur-301-u12-author-conflict1, fix, opencode) G3 independent review still pending for Unit 12 (separate run); G4 Urdu mirror needs `.ur.svg` variants for all 4 figures.


## Response snapshot

Translated GQUR-301 Unit 12 (Bivariate Analysis) into its complete Urdu G4 mirror  -  4 files (index, topic-01, topic-02, assessment) with key_terms block, transliterated MCQ options, and bounded answers section; translation_status stays draft per skill.

## Outcome

- Impact: translate for GQUR-301 Unit 12 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 5 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GQUR-301 Unit 12 (Bivariate Analysis) into its complete Urdu G4 mirror  -  4 files (index, topic-01, topic-02, assessment) with key_terms block, transliterated MCQ options, and bounded answers section; translation_status stays draft per skill.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - `.ur.svg` figure variants for all 4 figures (fig-U12-1 concept-map, fig-U12-2 table, fig-U12-3 diagram, fig-U12-4 table) need a `generate-figures` Step 5 run before the unit can be flipped to `reviewed`  -  `<Figure src>` already points at the `.ur.svg` paths.
  - G3 English review remains open (advisory escalation F1-F6); translation proceeded on the existing English baseline.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
