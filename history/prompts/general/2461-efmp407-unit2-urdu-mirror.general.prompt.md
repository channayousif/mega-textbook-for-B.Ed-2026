---
id: 2461
title: Translate EFMP-407 Unit 2 Urdu
stage: general
date: 2026-11-07
surface: agent
model: GPT-6 Codex
feature: 006-content-pipeline
branch: crew/efmp-407-u02-translate
user: crew
command: Read .crew/brief.md
labels: ["codex", "crew", "translation", "efmp-407"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - history/prompts/general/2461-efmp407-unit2-urdu-mirror.general.prompt.md
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-02/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-02/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-02/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-02/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-02/unit-assessment.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-02/unit-teacher-notes.mdx
  - specs/content/efmp-407/reviews/unit-02/G4/translation-handoff.md
  - static/img/figures/efmp-407/unit-02/fig-U2-1.ur.dark.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-1.ur.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-2.ur.dark.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-2.ur.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-3.ur.dark.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-3.ur.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-4.ur.dark.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-4.ur.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-5.ur.dark.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-5.ur.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-6.ur.dark.svg
  - static/img/figures/efmp-407/unit-02/fig-U2-6.ur.svg
tests:
  - "npm run check:content: all 14 gates pass in final draft state and on origin/main"
  - "Temporary reviewed parity: only expected open G4/G5 rows; all other gates pass"
  - "Source parity assertions and standalone MDX compilation across six files: PASS"
  - "Six SVG optimizations and figures:variants:check: PASS"
  - "Static Sharp previews: inspected; browser and print checks barred by brief"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Crew brief read for this prompt:

# Crew job efmp-407-u02-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u02-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-407 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-02/`.

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
- (efmp-407-u02-review_en, review_en, agy) G3 remains open under an advisory escalate disposition because live browser and print inspection are barred by brief constraints.
- (efmp-407-u02-review_en, review_en, agy) Live browser rendering (360px viewport, keyboard table scrolling, A4 print view) should be verified on an authorized host.
- (efmp-407-u02-review_en, review_en, agy) In tasks.md lines 24-28 under backward-design alignment, 5 duplicated Unit 1 tracker rows from author copy-paste can be cleaned up during maintenance.
- (efmp-407-u02-author, author, claude) Figure text geometry for `fig-U2-1` to `fig-U2-6` has never been browser-measured, so check the CI `figure-geometry` result first.
- (efmp-407-u02-author, author, claude) `tasks.md` is shared with the Unit 3 and Unit 4 jobs and will conflict again when they merge; keep every unit's rows, and rerun `npm run build:content-status` after the tracker changes because `static/content-status.json` is gitignored.


## Response snapshot

Translated the complete six-page Urdu mirror and six schematic figures with derived dark twins. Left translation_status draft and review gates open. Recorded terminology proposals and the remaining rendered-check handoff. Committed locally without push or PR.

## Outcome

- ✅ Impact: Complete draft Urdu mirror preserves English structure, quantities, qualifications, tasks and assessment scoring.
- 🧪 Tests: Final draft and main content suites pass; temporarily enabled parity yields only the two expected open stage findings.
- 📁 Files: Six MDX translations, twelve Urdu SVG assets, G4 translation handoff and this PHR.
- 🔁 Next prompts: Authorized host runs browser geometry and Urdu desktop/narrow/print checks; independent G3 acceptance precedes G5.
- 🧠 Reflection: Draft gates are conditional. The temporary reviewed probe exposed the expected stage findings without claiming review acceptance.

## Handoff (for CEO and agents)

- Shipped / changed: Complete Unit 2 Urdu draft and RTL schematic mirrors, with terminology proposals in the G4 work record.
- Decisions the team must respect: The translate-unit skill explicitly forbids appending or flipping a G4 tracker row; existing open rows remain. Both locale flags are draft. English bound inputs remain unchanged.
- Pending / next owner: Curriculum owner resolves proposed ESD terms. Authorized rendering host measures Urdu SVGs and checks 360px/A4. Fresh reviewers own G3 and G5; translator provides no certification.
- Paperclip issues affected: Crew job efmp-407-u02-translate; no issue ID supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Archive-only baseline inherited the parent Git index and produced invalid manifest context; a separate scratch Git index corrected the comparison. Temporary reviewed status required regenerated content status. Editing the English manifest narrative would stale G2, so that edit was reverted and the outcome recorded under reviews instead.
- Graders run and results (PASS/FAIL): PASS: final draft content suite, main baseline, source parity, variants and SVG budgets. EXPECTED FAIL: G4/G5 completion assertions while temporarily reviewed. NOT RUN: build, browser geometry, rendered pages, narrow view and print per brief.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run the barred rendered Urdu checks on an authorized host before independent acceptance.
