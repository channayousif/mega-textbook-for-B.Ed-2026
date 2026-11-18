---
id: 20261157
title: Complete EFMP407 Unit Four Urdu Mirror
stage: general
date: 2026-11-07
surface: agent
model: GPT-6 Codex
feature: 006-content-pipeline
branch: crew/efmp-407-u04-translate
user: crew
command: Execute .crew/brief.md
labels: [codex, crew, efmp-407, unit-04, translation]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/general/20261157-efmp407-unit-four-urdu-mirror.general.prompt.md
  - specs/content/efmp-407/tasks.md
  - specs/content/efmp-407/translation/unit-04.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-04/unit-teacher-notes.mdx
  - static/img/figures/efmp-407/unit-04/fig-U4-1.ur.dark.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-1.ur.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-2.ur.dark.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-2.ur.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-3.ur.dark.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-3.ur.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-4.ur.dark.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-4.ur.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-5.ur.dark.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-5.ur.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-6.ur.dark.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-6.ur.svg
tests:
  - npm run check:content (draft and temporary reviewed parity)
  - npm run figures:variants:check
  - SVG optimiser on six Urdu sources
  - Direct metadata, heading, component, alt/desc and assessment audit
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Execution brief read verbatim:

# Crew job efmp-407-u04-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u04-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-407 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-04/`.

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
- (efmp-407-u04-review_en, review_en, agy) Excerpt files lim-allan-2016-futures and unesco-2017-esd-objectives exist on disk but were omitted from input_manifest due to citedKeysFor regex; engineering owner should bind them before final qualification.
- (efmp-407-u04-review_en, review_en, agy) Live browser rendering, 360px viewport table scrollability, and A4 print handout inspection remain uninspected under brief execution constraints.
- (efmp-407-u04-review_en, review_en, agy) Candidate English content files in docs/semester-3/efmp-407/unit-04/ remain unchanged and clean across all 14 gates.
- (efmp-407-u04-author-conflict1, fix, opencode) `static/content-status.json` is git-ignored and was regenerated locally only; a root-scope job must regenerate it before publication.
- (efmp-407-u04-author-conflict1, fix, opencode) `fig-U4-1` to `fig-U4-6` browser text geometry is unmeasured until CI `figure-geometry` runs; banner `fig-U4-7` remains prompt-only.


## Response snapshot

Continued the existing untracked translation into a six-page Urdu mirror with six RTL SVGs and six generated dark twins. Corrected uncollected-waste meaning, trade-offs, sustained project inquiry and collaborative-learning terminology. Recorded a draft handoff and an in-progress G4 row; no G3/G5 or publication certification.

## Outcome

- ✅ Impact: Complete source translation bundle prepared for independent review.
- 🧪 Tests: Draft gate results and temporary parity findings are recorded in the translation handoff. Browser checks barred by the brief remain pending.
- 📁 Files: Six Urdu MDX pages, twelve Urdu SVG assets, Unit 4 G4 tracker note, translation handoff and this PHR.
- 🔁 Next prompts: Permitted geometry/render inspection and independent G5 after accepted G3.
- 🧠 Reflection: Conditional draft gates hide parity problems; temporary reviewed checks were restored automatically. Regenerating the ignored status report removed the temporary flag-change artefact.

## Handoff (for CEO and agents)

- Shipped / changed: Urdu Unit 4 source mirror, localised figures, derived dark variants, terminology proposals and English baseline digests.
- Decisions the team must respect: English stays unchanged; translation_status stays draft; G4 in progress and G3/G5 open. The skill forbids appending a completion row. No build, server, Playwright, push or PR.
- Pending / next owner: Independent reviewer and engineering owner handle accepted G3 dependency, excerpt binding, browser geometry, narrow/A4 rendering and G5. Terminology owner assesses proposals.
- Paperclip issues affected: Crew job efmp-407-u04-translate; no ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Inherited uncollected-waste mistranslation and trade-offs calque corrected. Temporary reviewed run initially found a stale ignored status report; regenerated it for the repeated parity check and restored draft after the run.
- Graders run and results (PASS/FAIL): Temporary reviewed parity: 13 of 14 gates PASS; pipeline FAIL only for unfinished G4/G5 as expected. Variant freshness, SVG budgets and direct parity audit PASS. Final draft check: all 14 gates PASS, exit 0, no findings.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Inspect the frozen Urdu bundle in a permitted browser session without changing certification metadata.
