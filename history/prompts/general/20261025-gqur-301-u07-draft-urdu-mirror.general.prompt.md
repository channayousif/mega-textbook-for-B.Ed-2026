---
id: 20261025
title: Complete GQUR-301 Unit 7 draft Urdu mirror
stage: general
date: 2026-10-25
surface: agent
model: GPT-6 (Codex)
feature: none
branch: crew/gqur-301-u07-translate-r1
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["codex", "gqur-301-u07-translate-r1", "translation"]
links:
  spec: specs/content/gqur-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-07/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-07/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-07/unit-teacher-notes.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-07/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gqur-301/unit-07/unit-assessment.mdx
  - static/img/figures/gqur-301/unit-07/*.ur.svg
  - static/img/figures/gqur-301/unit-07/*.ur.dark.svg
  - specs/content/gqur-301/tasks.md
  - specs/content/gqur-301/translations/unit-07/
  - static/content-status.json
tests:
  - npm run check:content (origin/main baseline and final draft)
  - temporary reviewed parity probe
  - direct metadata/component/assessment parity and MDX compilation
  - FIGURE_ROOT scoped figures:variants:check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Crew brief (verbatim):

# Crew job gqur-301-u07-translate-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-301-u07-translate-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-301 Unit 7 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-301 Unit 7 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-301/`, and `static/img/figures/gqur-301/unit-07/`.

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
- (gqur-301-u07-repair_en, repair_en, claude) ERQ 4 is now a collected real-school-data task; a fresh G3 reviewer should judge whether this meets the course-spec real-Pakistan-data requirement.
- (gqur-301-u07-repair_en, repair_en, claude) P1-P4 (author-run provenance, open G1 under D-2026-0070, rendered/A4 inspection, answer-blind verification) were not repairable by the author and remain open.
- (gqur-301-u07-repair_en, repair_en, claude) There is no Urdu mirror yet; G4 must translate the repaired ERQ 2/4, RRQ 9/10 and topic-02 Worked example 2.
- (gqur-301-u07-review_en, review_en, codex) Repair assessment findings F1-F3 and resolve G1, provenance and rendered-review gaps before fresh review.
- (gqur-301-u07-review_en, review_en, codex) Repair assessment findings F1-F3 and resolve G1, provenance and rendered-review gaps before fresh review.


## Response snapshot

Completed five Urdu pages, localized four SVG pairs, preserved draft status, recorded the existing open G4 row note and handoff. Content and parity checks run. No build, browser, signing, push or PR.

## Outcome

- ✅ Impact: Complete draft Urdu mirror bound to the repaired English baseline.
- 🧪 Tests: All 13 baseline gates pass. All 13 final draft gates also pass, recorded in translation logs; temporary reviewed probe detects only open review rows and content-status freshness.
- 📁 Files: Five MDX pages, eight SVG variants, tracker note, derived status artifact, validation logs, input digests and handoff.
- 🔁 Next prompts: Authorized rendered Urdu inspection; fresh independent G3/G5 review.
- 🧠 Reflection: Draft gates do not establish semantic or rendered acceptance.

## Handoff (for CEO and agents)

- Shipped / changed: Complete draft mirror including repaired ID example and RRQ/ERQ items.
- Decisions the team must respect: Bank unchanged, translation_status draft, G3/G5 open. Step 7 forbids appending a G4 completion row; existing row note updated. Brief prohibits build/browser inspection.
- Pending / next owner: Curriculum owner and independent reviewers resolve G1/G3 dependencies and conduct rendered G5 inspection.
- Paperclip issues affected: gqur-301-u07-translate-r1; no external ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Early figure run overlapped incomplete SVG generation; regenerated dark variants resolved it. Archive without Git metadata could not validate committed inputs; reran with baseline Git metadata. G4 tracker note required content-status regeneration.
- Graders run and results (PASS/FAIL): PASS structure, terminology, MDX compilation, SVG budgets and variant freshness; review certification and rendered checks pending.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Inspect the frozen Urdu bundle in desktop, 360px and A4 views in an authorized session.
