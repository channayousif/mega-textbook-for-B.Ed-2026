---
id: crew-guhq-301-u03-translate
title: crew translate GUHQ-301 unit 3
stage: misc
date: 2026-11-22
surface: agent
model: claude
feature: guhq-301
branch: crew/guhq-301-u03-translate
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/general/20261239-lead-fix-guhq-301-u03-translate.misc.prompt.md
 - history/prompts/guhq-301/crew-guhq-301-u03-translate.green.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-03/unit-assessment.mdx
 - specs/content/guhq-301/reviews/unit-03/G2/20261122T082448568Z-gates.json
 - specs/content/guhq-301/reviews/unit-03/G2/logs-20261122T082448568Z/check-bloom-bands.txt
 - specs/content/guhq-301/reviews/unit-03/G2/logs-20261122T082448568Z/check-concept-graph.txt
 - specs/content/guhq-301/reviews/unit-03/G2/logs-20261122T082448568Z/check-depth-gate.txt
 - specs/content/guhq-301/reviews/unit-03/G2/logs-20261122T082448568Z/check-docs-sync.txt
 - specs/content/guhq-301/reviews/unit-03/G2/logs-20261122T082448568Z/check-figures.txt
 - specs/content/guhq-301/reviews/unit-03/G2/logs-20261122T082448568Z/check-no-answer-keys.txt
 - specs/content/guhq-301/reviews/unit-03/G2/logs-20261122T082448568Z/check-no-em-dash.txt
 - specs/content/guhq-301/reviews/unit-03/G2/logs-20261122T082448568Z/validate-content.txt
 - specs/content/guhq-301/tasks.md
 - specs/content/guhq-301/translations/unit-03/check-content-parity.txt
 - specs/content/guhq-301/translations/unit-03/handoff.md
 - static/img/figures/guhq-301/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-1.ur.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-2.ur.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-3.ur.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-4.ur.dark.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-4.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job guhq-301-u03-translate

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/guhq-301-u03-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GUHQ-301 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GUHQ-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/guhq-301/`, and `static/img/figures/guhq-301/unit-03/`.

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
- (guhq-301-u03-author, author, opencode) G3 and the Urdu mirror remain open; the Urdu job needs `.ur.svg` mirrors for fig-U3-1/2/3/4 and a G5 check of the eight authored concept labels. Banner fig-U3-5 is still `prompt-only` for the illustrate job.
- (guhq-301-u03-author, author, opencode) The "passive is common" claim rests on four counted examples, not a corpus frequency count, and is flagged in `sources/unit-03.md` for the G3 religious-content reviewer.

## Feedback from the previous attempt
the worker exited without committing any change


## Response snapshot

Added the complete draft Urdu mirror of GUHQ-301 Unit 3 (four pages, four mirrored .ur.svg figures with dark versions), a G4 tracker note, a translation handoff and a PHR, with all 14 content gates passing.

## Outcome

- Impact: translate for GUHQ-301 Unit 3 by claude (attempt 3).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 26 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Added the complete draft Urdu mirror of GUHQ-301 Unit 3 (four pages, four mirrored .ur.svg figures with dark versions), a G4 tracker note, a translation handoff and a PHR, with all 14 content gates passing.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - English defects for G3 or a revise-topic job: 2:284 is quoted as `فَىٓ` instead of `فِىٓ` (Topic 3.2 and MCQ 9, copied unchanged into the Urdu), and Topic 3.2 calls ءَامِنُوا۟ the result clause of إِذَا in 2:91 when it is قَالُوا۟ نُؤْمِنُ.
  - G5 must check every Urdu verse meaning (rendered from Saheeh International English, not a published Urdu translation), the eight authored concept labels, and the rendered Urdu at 360 px and A4, which was not inspected.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 2 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
