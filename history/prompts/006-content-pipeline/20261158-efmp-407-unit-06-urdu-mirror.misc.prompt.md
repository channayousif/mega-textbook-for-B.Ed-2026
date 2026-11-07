---
id: 20261158
title: Translate EFMP-407 Unit 6 into a complete Urdu draft
stage: misc
date: 2026-11-07
surface: agent
model: GPT-6 Codex
feature: 006-content-pipeline
branch: crew/efmp-407-u06-translate
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["codex", "crew", "translation", "efmp-407", "unit-06"]
links:
  spec: specs/006-content-pipeline/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/006-content-pipeline/20261158-efmp-407-unit-06-urdu-mirror.misc.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-06/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-06/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-06/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-06/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-06/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-06/unit-teacher-notes.mdx
  - specs/content/efmp-407/reviews/unit-06/G4/check-content-baseline.txt
  - specs/content/efmp-407/reviews/unit-06/G4/check-content-final.txt
  - specs/content/efmp-407/reviews/unit-06/G4/check-content-reviewed.txt
  - specs/content/efmp-407/reviews/unit-06/G4/figure-variants.txt
  - specs/content/efmp-407/reviews/unit-06/G4/structural-parity.txt
  - specs/content/efmp-407/reviews/unit-06/G4/translation-handoff.md
  - static/img/figures/efmp-407/unit-06/fig-U6-1.ur.dark.svg
  - static/img/figures/efmp-407/unit-06/fig-U6-1.ur.svg
  - static/img/figures/efmp-407/unit-06/fig-U6-2.ur.dark.svg
  - static/img/figures/efmp-407/unit-06/fig-U6-2.ur.svg
  - static/img/figures/efmp-407/unit-06/fig-U6-3.ur.dark.svg
  - static/img/figures/efmp-407/unit-06/fig-U6-3.ur.svg
  - static/img/figures/efmp-407/unit-06/fig-U6-4.ur.dark.svg
  - static/img/figures/efmp-407/unit-06/fig-U6-4.ur.svg
  - static/img/figures/efmp-407/unit-06/fig-U6-5.ur.dark.svg
  - static/img/figures/efmp-407/unit-06/fig-U6-5.ur.svg
  - static/img/figures/efmp-407/unit-06/fig-U6-6.ur.dark.svg
  - static/img/figures/efmp-407/unit-06/fig-U6-6.ur.svg
tests:
  - npm run check:content (baseline and final draft, all 14 gates pass)
  - Temporary reviewed check (13 gates pass; expected G4/G5 open-row findings only)
  - npm run figures:variants:check
  - Six SVG optimization budget checks
  - Source parity and bank-conformance assertions
  - Standalone Sharp light and dark figure previews inspected
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The delegated brief, verbatim:

# Crew job efmp-407-u06-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u06-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-407 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-06/`.

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
- (efmp-407-u06-review_en, review_en, agy) Multiple excerpt files exist on disk under specs/content/efmp-407/sources/texts/ but were omitted from input_manifest due to citedKeysFor regex; engineering owner should update regex or keys before qualification.
- (efmp-407-u06-review_en, review_en, agy) Live browser rendering (360px viewport, table scrolling, A4 print) was barred under brief constraints and remains to be inspected on an authorized host.
- (efmp-407-u06-review_en, review_en, agy) Candidate English content in docs/semester-3/efmp-407/unit-06/ remains clean and passed all 14 content gates.
- (efmp-407-u06-author-conflict2, fix, opencode) main's Unit 2 backward-design table still carries five erroneous Unit 1 tracker rows (pre-existing on main, left untouched per the merge rule).
- (efmp-407-u06-author-conflict2, fix, opencode) the stale content-status finding is a local cache artifact; a clean main checkout also lacks the git-ignored `static/content-status.json`.


## Response snapshot

Translated all six Unit 6 pages and six schematics, generated dark twins, preserved the 10/10/5 assessment and draft status, recorded vocabulary proposals and inspection limitations, and saved passing content/parity checks. Work committed locally without push or PR.

## Outcome

- ✅ Impact: Complete Urdu source mirror ready for independent review and authorized rendered inspection; no G3/G5 certification claimed.
- 🧪 Tests: Baseline and final content gates pass. Temporary reviewed run has exactly the expected G4/G5 open-row findings; both flags restored. Bank pairs, heading vectors, metadata, component and item counts match. SVG budgets and derived variants pass.
- 📁 Files: Six Urdu MDX pages, six Urdu SVG sources and six derived dark twins, G4 handoff and logs, and this PHR.
- 🔁 Next prompts: Authorized browser/print/geometry inspection, English review dependency resolution, terminology-owner decisions and independent G5.
- 🧠 Reflection: Draft gates alone do not exercise parity. The temporary status flip also needs a refreshed ignored content-status report. A text-only first figure pass needed more vertical space for Nastaliq.

## Handoff (for CEO and agents)

- Shipped / changed: Complete six-page Urdu mirror with matching assessment, six localized RTL schematics, dark variants and recorded checks.
- Decisions the team must respect: Keep translation_status draft. Follow translate-unit Step 7: do not append G4 tracker rows or self-review. The brief bans builds, servers and Chromium, so rendered page and browser geometry checks remain unclaimed. The frozen bank and all English inputs are unchanged.
- Pending / next owner: Terminology owner decides proposed vocabulary. Authorized host/CI measures SVG text and inspects normal, narrow and A4 pages. Independent reviewers resolve G3 dependency and perform G5. Earlier source-binding/provenance limitations remain with engineering and review owners.
- Paperclip issues affected: Crew job efmp-407-u06-translate; no issue identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Initial Nastaliq previews showed tight line spacing, corrected by expanding vertical geometry. The first temporary reviewed run also found stale ignored content-status data, corrected by regeneration for each state. An interrupted repeat required restoring both draft flags before rerunning successfully.
- Graders run and results (PASS/FAIL): PASS: all 14 final draft gates, source parity assertions, bank terms, SVG budgets, derived variants and whitespace checks. EXPECTED: temporary reviewed G4/G5 open-row findings. NOT RUN: prohibited build, Chromium SVG measurement and rendered page/print inspection.
- Prompt variant (if applicable): crew efmp-407-u06-translate brief; repository translate-unit skill
- Next experiment (smallest change to try): Use an authorized inspection host for exact-commit Urdu pages and all new SVG geometry; do not infer rendered usability from green source gates.
