---
id: crew-gcce-400-u05-translate
title: crew translate GCCE-400 unit 5
stage: misc
date: 2026-11-22
surface: agent
model: claude_crew
feature: gcce-400
branch: crew/gcce-400-u05-translate
user: crew
command: crew translate
labels: ["crew", "claude_crew", "translate"]
links:
  spec: specs/content/gcce-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/gcce-400/crew-gcce-400-u05-translate.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-05/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-05/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-05/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-05/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-05/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-05/unit-teacher-notes.mdx
 - specs/content/gcce-400/figures/unit-05.md
 - specs/content/gcce-400/reviews/unit-05/G2/20261122T152925023Z-gates.json
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T152925023Z/check-bloom-bands.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T152925023Z/check-concept-graph.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T152925023Z/check-depth-gate.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T152925023Z/check-docs-sync.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T152925023Z/check-figures.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T152925023Z/check-no-answer-keys.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T152925023Z/check-no-em-dash.txt
 - specs/content/gcce-400/reviews/unit-05/G2/logs-20261122T152925023Z/validate-content.txt
 - specs/content/gcce-400/tasks.md
 - specs/content/gcce-400/translations/unit-05/check-content-parity.txt
 - specs/content/gcce-400/translations/unit-05/handoff.md
 - static/img/figures/gcce-400/unit-05/fig-U5-1.ur.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-1.ur.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-2.ur.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-2.ur.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-3.ur.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-3.ur.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-4.ur.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-4.ur.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-5.ur.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-5.ur.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-6.ur.dark.svg
 - static/img/figures/gcce-400/unit-05/fig-U5-6.ur.svg
tests:
 - npm run check:content
 - npm run figures:variants:check
 - scripts/heavy.sh node scripts/measure-figure-text.mjs <six .ur.svg> exits 0
 - Temporary reviewed flip of both index.mdx: all gates pass except the two expected G4/G5 tracker findings, then both files reverted to draft
 - Supplemental parity self-check: file set, heading vectors, component counts, numbered items, MCQ key and option order
---

## Prompt

# Crew job gcce-400-u05-translate

You are the claude_crew worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gcce-400-u05-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec. After changing any English unit file or its figures manifest, sources, coverage or concepts, the job commits, runs `node scripts/prepare-gate-evidence.mjs <course> <unit>`, commits the JSON and every `logs-*` directory it writes, and points the unit's G2 en-draft tracker row at the new file before `npm run check:content`.

## Task
Translate GCCE-400 Unit 5 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

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

## Notes from earlier jobs on this unit
- (gcce-400-u05-author, author, agy) G3 English review and G4 Urdu translation remain open as separate jobs; banner fig-U5-7 is prompt-only for the illustrate pass.
- (gcce-400-u05-author, author, agy) Reviewers should confirm the Lawyers' Movement timeline against Batool et al. (2019) and the cited constitutional provisions against the latest text.

## Response snapshot

Translated GCCE-400 Unit 5 into a complete six-file Urdu mirror with six RTL-mirrored `.ur.svg` figures and derived dark twins, bank-bound `key_terms`, a G4 tracker note and handoff, and refreshed G2 gate evidence, all committed with `translation_status` left at `draft`.

## Outcome

- Impact: complete draft Urdu mirror of GCCE-400 Unit 5 (Advocacy and Activism) with six localized schematic figure pairs.
- Tests: `npm run check:content` all 14 gates PASS at draft; the reviewed flip passed every gate except the two expected G4/G5 pipeline findings and both indexes were reverted; `figures:variants:check` PASS; `measure-figure-text` exit 0 on all six `.ur.svg`.
- Files: 33 file(s), listed above.
- Next prompts: independent G5 Urdu review; rendered Urdu inspection at 360px and A4 print.
- Reflection: the unit's six key concepts are absent from `terminology.csv`, so `key_terms` binds only the six banked terms that occur and the concepts are recorded as owner proposals rather than silently banked. A caption in `fig-U5-2.ur.svg` and `fig-U5-6.ur.svg` needed its x pulled left to clear the wordmark.

## Handoff (for CEO and agents)

- Shipped / changed: the six-file Urdu mirror under `i18n/ur/docusaurus-plugin-content-docs/current/semester-4/gcce-400/unit-05/`, six `.ur.svg` plus six derived `.ur.dark.svg` under `static/img/figures/gcce-400/unit-05/`, the G4 and G6 tracker notes, the figure-manifest note, the translator handoff at `specs/content/gcce-400/translations/unit-05/handoff.md`, and refreshed G2 gate evidence.
- Decisions the team must respect: `translation_status` is `draft` on both index files and G4/G5 tracker rows stay ▢; the frozen `terminology.csv` and `glossary.json` were not edited; no G3/G5 certification, reviewer identity or publication authority was fabricated; no em dash anywhere; no `npm run build`, dev server or Playwright run.
- Pending / next owner: G5 belongs to a fresh independent session and must inspect actual rendered Urdu at narrow width and in A4 print, plus the RTL table reading order in `fig-U5-2` and `fig-U5-4`. `scripts/render-inspect.mjs --locale ur` and `scripts/measure-figure-text.mjs` under CI fonts were not run here. G3 en-review stays open (Lawyers' Movement timeline against Batool et al. (2019), constitutional currency). Banner `fig-U5-7` remains `prompt-only` for the illustrate job.
- Notes for the next job on this unit:
  - Editing `specs/content/gcce-400/figures/unit-05.md` or `translations/unit-05/*` invalidates the unit's G2 evidence by construction, so any later job touching those files must re-run `prepare-gate-evidence.mjs` and repoint the G2 row.
  - The English unit carries no `<Glossary>` components, so the Urdu mirror correctly carries none.
  - The six authored concept labels in `concepts/unit-05.md` and the proposed terms in the handoff need an owner decision.

## Evaluation notes (flywheel)

- Failure modes observed: Nastaliq-first labels are narrower than the Latin at 13-14px, so a naive coordinate mirror left several table cells overflowing their panel; hand re-laying each table with end-anchored cells fixed it. A bottom caption overprinted the wordmark in two figures until its x was pulled left of the wordmark.
- Graders run and results (PASS/FAIL): `npm run check:content` PASS at draft (14/14). Reviewed flip: PASS except the two expected G4/G5 findings. `figures:variants:check` PASS. `measure-figure-text` PASS on all six `.ur.svg` with zero clipping, collisions and wordmark collisions. Structural self-check PASS. Build, dev server and Playwright intentionally not run under the brief.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): run `scripts/render-inspect.mjs --locale ur` in an authorized review session to confirm Nastaliq shaping, bidi punctuation and A4 clipping, and run `measure-figure-text` with `--ci-fonts` so the CI fallback face is measured too.
