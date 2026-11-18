---
id: crew-gicp-400-u05-translate
title: crew translate GICP-400 unit 5
stage: misc
date: 2026-11-06
surface: agent
model: opencode
feature: gicp-400
branch: crew/gicp-400-u05-translate
user: crew
command: crew translate
labels: ["crew", "opencode", "translate"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/552-translate-gicp400-unit-five-urdu.general.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-05/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-05/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-05/unit-assessment.mdx
 - specs/content/gicp-400/reviews/unit-05/G4/translation-handoff.md
 - specs/content/gicp-400/tasks.md
 - static/img/figures/gicp-400/unit-05/fig-U5-1.ur.dark.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-1.ur.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-2.ur.dark.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-2.ur.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-3.ur.dark.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-3.ur.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-4.ur.dark.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-4.ur.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-5.ur.dark.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-5.ur.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-6.ur.dark.svg
 - static/img/figures/gicp-400/unit-05/fig-U5-6.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job gicp-400-u05-translate

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u05-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GICP-400 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 5 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-05/`.

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
- (gicp-400-u05-review_en-conflict1, fix, opencode) `static/content-status.json` is gitignored and must be regenerated before `check:content` in a fresh worktree.
- (gicp-400-u05-review_en-conflict1, fix, opencode) G3 stays `▢` advisory; Figure 5.6 alt-text repair, source/provenance checks, rendered review and a fresh blind assessment solve remain open.
- (gicp-400-u05-review_en, review_en, codex) Author should correct Figure 5.6’s resource-condition alt text.
- (gicp-400-u05-review_en, review_en, codex) G3 remains escalated pending source/provenance checks, rendered review and a fresh blind assessment solve.
- (gicp-400-u05-review_en, review_en, codex) Author should correct Figure 5.6’s resource-condition alt text.


## Response snapshot

Translated GICP-400 Unit 5 into its complete draft Urdu mirror (index, three topics, the 10/10/5 assessment, six RTL-mirrored Nastaliq SVG variants with dark twins), updated the open G4 tracker note, and committed everything on `crew/gicp-400-u05-translate` with all 14 content gates passing.

## Outcome

- Impact: translate for GICP-400 Unit 5 by opencode (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 20 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GICP-400 Unit 5 into its complete draft Urdu mirror (index, three topics, the 10/10/5 assessment, six RTL-mirrored Nastaliq SVG variants with dark twins), updated the open G4 tracker note, and committed everything on `crew/gicp-400-u05-translate` with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Chromium `measure-figure-text.mjs` and `render-inspect.mjs --locale ur` were not run (crew brief prohibits Playwright); a Pillow + Raqm approximation of the gate’s geometry checks passed on all six `.ur.svg`, so the next authorised session should run the real browser geometry and A4/narrow-width render inspection.
  - The UR index declares `key_terms: []` because none of the unit’s key concepts is in `terminology.csv`; the handoff at `specs/content/gicp-400/reviews/unit-05/G4/translation-handoff.md` lists every unbanked term used, as owner proposals.
  - English G3 stays escalated (`specs/content/gicp-400/reviews/unit-05/G3/`): Figure 5.6 resource-condition alt text, source/provenance checks and a fresh blind assessment solve remain open; any English repair needs matching Urdu repairs.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
