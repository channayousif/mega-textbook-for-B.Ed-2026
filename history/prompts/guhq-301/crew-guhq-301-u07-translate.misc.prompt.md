---
id: crew-guhq-301-u07-translate
title: crew translate GUHQ-301 unit 7
stage: misc
date: 2026-11-22
surface: agent
model: agy
feature: guhq-301
branch: crew/guhq-301-u07-translate
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/guhq-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/guhq-301/crew-guhq-301-u07-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-07/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-07/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-07/unit-assessment.mdx
 - specs/content/guhq-301/reviews/unit-07/G2/20261122T040849203Z-gates.json
 - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T040849203Z/check-bloom-bands.txt
 - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T040849203Z/check-concept-graph.txt
 - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T040849203Z/check-depth-gate.txt
 - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T040849203Z/check-docs-sync.txt
 - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T040849203Z/check-figures.txt
 - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T040849203Z/check-no-answer-keys.txt
 - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T040849203Z/check-no-em-dash.txt
 - specs/content/guhq-301/reviews/unit-07/G2/logs-20261122T040849203Z/validate-content.txt
 - specs/content/guhq-301/tasks.md
 - specs/content/guhq-301/translations/unit-07/check-content-parity.txt
 - specs/content/guhq-301/translations/unit-07/handoff.md
 - static/img/figures/guhq-301/unit-07/fig-U7-1.ur.dark.svg
 - static/img/figures/guhq-301/unit-07/fig-U7-1.ur.svg
 - static/img/figures/guhq-301/unit-07/fig-U7-2.ur.dark.svg
 - static/img/figures/guhq-301/unit-07/fig-U7-2.ur.svg
 - static/img/figures/guhq-301/unit-07/fig-U7-3.ur.dark.svg
 - static/img/figures/guhq-301/unit-07/fig-U7-3.ur.svg
tests:
 - npm run check:content
---

## Prompt

# Crew job guhq-301-u07-translate

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/guhq-301-u07-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GUHQ-301 Unit 7 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GUHQ-301 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/guhq-301/`, and `static/img/figures/guhq-301/unit-07/`.

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
- (guhq-301-u07-author, author, agy) Urdu mirror job needs .ur.svg files for all three placed figures (fig-U7-1, fig-U7-2, fig-U7-3) and G5 review of five authored Urdu concept labels.
- (guhq-301-u07-author, author, agy) Independent qualified G3 review is required (including religious-content check per content-spec drafting note 7); original classroom study routines are noted in sources/unit-07.md as having no bound empirical source.
- (guhq-301-u07-author, author, agy) Mapped reading muallim-ul-quran remains unidentifiable; open-access sources (quranic-arabic-corpus, al-hilali-2026-literal-interpretive, abdelfattah-2025-tajweed, kadir-2022-asbab) carry linguistic, translation, recitation, and interpretive claims.

## Feedback from the previous attempt
npm run check:content has 2 finding(s) that main does not have:
✗ Pipeline gate failed with 1 finding(s):
- GUHQ-301 Unit 7 (docs/semester-3/guhq-301/unit-07): G2 en-draft: stale or incomplete input manifest


## Response snapshot

Translated GUHQ-301 Unit 7 into a 3-page Urdu mirror at G4 with 3 localized RTL figure pairs and refreshed G2 gate evidence.

## Outcome

- Impact: translate for GUHQ-301 Unit 7 by agy (attempt 2).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 22 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Translated GUHQ-301 Unit 7 into a 3-page Urdu mirror at G4 with 3 localized RTL figure pairs and refreshed G2 gate evidence.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Independent qualified G5 review must verify the five authored Urdu concept labels in `specs/content/guhq-301/concepts/unit-07.md` and check every rendered verse meaning against trusted translations.
  - Independent qualified G3 review remains required for the English draft, including the religious-content check per content-spec drafting note 7.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: 1 earlier attempt(s); see the board history
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
