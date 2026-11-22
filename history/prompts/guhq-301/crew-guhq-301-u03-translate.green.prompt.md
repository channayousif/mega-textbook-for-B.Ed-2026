---
id: crew-guhq-301-u03-translate
title: crew translate GUHQ-301 unit 3
stage: green
date: 2026-11-22
surface: agent
model: claude-opus-5-5
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
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/guhq-301/unit-03/unit-assessment.mdx
 - static/img/figures/guhq-301/unit-03/fig-U3-1.ur.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-1.ur.dark.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-2.ur.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-2.ur.dark.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-3.ur.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-3.ur.dark.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-4.ur.svg
 - static/img/figures/guhq-301/unit-03/fig-U3-4.ur.dark.svg
 - specs/content/guhq-301/tasks.md
 - specs/content/guhq-301/translations/unit-03/handoff.md
 - specs/content/guhq-301/translations/unit-03/check-content-parity.txt
 - history/prompts/guhq-301/crew-guhq-301-u03-translate.green.prompt.md
tests:
 - npm run check:content (14/14 PASS; flipped-to-reviewed run 13/14 with only the expected G4/G5 row findings)
 - scripts/heavy.sh node scripts/measure-figure-text.mjs (8 Urdu SVGs, exit 0)
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

Translated GUHQ-301 Unit 3 (Quranic Syntax and Sentence Structure) into a complete draft Urdu mirror (index, two topics, 10/10/5 assessment), authored four RTL-mirrored `.ur.svg` figures with derived dark twins, recorded a factual G4 tracker note (status unchanged), and wrote a translation handoff listing proposed terms and five English defects.

## Outcome

- Impact: G4 draft Urdu mirror for GUHQ-301 Unit 3 by claude (attempt 2; attempt 1 exited without committing).
- Tests: npm run check:content passed 14/14 with translation_status draft; with both index files temporarily at reviewed, only the expected G4/G5 row findings remained.
- Files: 16 file(s), listed above.
- Next prompts: independent G5 review; G3 should look at the English defects in the handoff.
- Reflection: the parity flip caught an undefined `.ar` class in an inherited SVG style that the draft run would have missed.

## Handoff (for CEO and agents)

- Shipped / changed: complete draft Urdu mirror of GUHQ-301 Unit 3 plus four `.ur.svg` / `.ur.dark.svg` pairs, translated from English a653d2b03; see `specs/content/guhq-301/translations/unit-03/handoff.md`.
- Decisions the team must respect: translation_status stays draft in both index files; G4 row stays ▢ (no appended row, no G5 claim); terminology.csv and glossary.json unchanged, unbanked grammar terms are proposals only.
- Pending / next owner: G5 independent reviewer (verse meanings, concept labels, rendered Urdu at 360 px and A4); G3 or a revise-topic job for the English defects (2:284 spelling فَىٓ for فِىٓ, 2:91 jawāb misidentified, جبملة typo, 2:148 rendering, "miss" for a male trainee).
- Issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: previous attempt exited without committing.
- Graders run and results (PASS/FAIL): check:content PASS; measure-figure-text PASS; figures:variants:check PASS.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
