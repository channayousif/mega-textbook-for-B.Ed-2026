---
id: crew-efmp-407-u08-repair_en
title: crew repair_en EFMP-407 unit 8
stage: misc
date: 2026-11-10
surface: agent
model: agy
feature: efmp-407
branch: crew/efmp-407-u08-repair_en
user: crew
command: crew repair_en
labels: ["crew", "agy", "repair_en"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - docs/semester-3/efmp-407/unit-08/topic-01.mdx
 - docs/semester-3/efmp-407/unit-08/topic-02.mdx
 - docs/semester-3/efmp-407/unit-08/unit-assessment.mdx
 - history/prompts/efmp-407/crew-efmp-407-u08-repair_en.misc.prompt.md
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-08/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-08/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-407/unit-08/unit-assessment.mdx
 - specs/content/efmp-407/coverage/unit-08.md
 - specs/content/efmp-407/sources/texts/sindh-rte-act-2013.md
 - specs/content/efmp-407/sources/texts/wals-2024-whole-school.md
 - specs/content/efmp-407/sources/unit-08.md
 - specs/content/efmp-407/tasks.md
tests:
 - npm run check:content
---

## Prompt

# Crew job efmp-407-u08-repair_en

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u08-repair_en`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Apply the findings of the latest G3 report under specs/content/efmp-407/reviews/unit-08/G3/. Make the smallest edits that resolve each finding, then append a new tracker row for Unit 8 G3 whose Suggestion begins "advisory: revise; repairs applied" and names the report. Leave G3 unticked.

Follow `.claude/skills/revise-topic/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-407 Unit 8 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-407/`, and `static/img/figures/efmp-407/unit-08/`.

## Response snapshot

Applied repairs addressing all open findings from the latest G3 report (`specs/content/efmp-407/reviews/unit-08/G3/20261108T203238Z-g3-desk-04abd597.json`) across English and Urdu mirror files: removed unsupported Jumani and Abbasi (2015) citations from topic-01, sources and coverage (F1); formatted Wals et al. (2024) bound excerpts as paraphrased principles (F2); updated dead Sindh Act URL to official sja.gos.pk copy (F3); softened Tilbury & Wortman (2004) causal claim (F4); separated community mobilization purpose from Wals attribution (F5); documented six-stage project cycle as an elaboration of Wals et al. (F6); added school management to MCQ 6 stem alongside teachers and government officials (F7); reworded topic-02 formative check item 3 to the approved Apply band (F8); refreshed G2 gate evidence and appended the advisory revise tracker row to tasks.md.

## Outcome

- Impact: repair_en for EFMP-407 Unit 8 addressing findings F1-F8 from G3 review report 20261108T203238Z-g3-desk-04abd597.json.
- Tests: `validate:content`, `check:depth-gate`, `check:figures`, `check:no-answer-keys`, `check:no-em-dash`, `check:pipeline-gate`, `npm run check:content` pass clean.
- Files: 12 file(s) modified.
- Next prompts: fresh G3 English review when reviewer capacity is scheduled.

## Handoff (for CEO and agents)

- Shipped / changed:
  - F1 (blocking): Removed Jumani and Abbasi (2015) attributions and Further reading entries from `docs/semester-3/efmp-407/unit-08/topic-01.mdx` and its Urdu mirror `i18n/ur/.../topic-01.mdx`. Removed `jumani-abbasi-2015` row from `specs/content/efmp-407/sources/unit-08.md` and `specs/content/efmp-407/coverage/unit-08.md`.
  - F2 (advisory): Formatted bound excerpts in `specs/content/efmp-407/sources/texts/wals-2024-whole-school.md` as paraphrased principles, removing quotation marks.
  - F3 (advisory): Updated dead Sindh RTE Act URL to official verified copy at `https://sja.gos.pk/assets/Updated_Laws/Sindh%20Right%20of%20Children%20to%20Free%20and%20Compulsory%20Education%20Act,%202013.pdf` in `specs/content/efmp-407/sources/unit-08.md`, `specs/content/efmp-407/sources/texts/sindh-rte-act-2013.md`, `docs/.../topic-02.mdx` and `i18n/.../topic-02.mdx`.
  - F4 (uncertain): Softened causal demonstration claim for Tilbury and Wortman (2004) in `topic-02.mdx:61` (EN and UR) to reflect title-level support.
  - F5 (advisory): Disentangled community mobilization purpose from Wals et al. (2024) attribution in `topic-02.mdx:75` (EN and UR).
  - F6 (advisory): Explicitly noted in `topic-01.mdx:48` (EN and UR), `sources/unit-08.md` and `coverage/unit-08.md` that the six-stage project cycle elaborates the five phases in Wals et al. (2024).
  - F7 (advisory): Updated MCQ 6 stem in `unit-assessment.mdx:59` (EN and UR) to specify equal representation alongside teachers, school management, and government officials.
  - F8 (uncertain): Reworded `topic-02.mdx:138` Check your understanding item 3 to the approved Apply formative band and tagged `*(Apply)*` / `*(اطلاق)*` (EN and UR).
  - G2 evidence refreshed and new advisory G3 tracker row appended to `specs/content/efmp-407/tasks.md` leaving G3 unticked.
- Decisions the team must respect: G3 remains open and uncertified pending independent review.
- Pending / next owner: independent G3 reviewer session.
- Notes for the next job on this unit:
  - F1-F8 findings from 20261108T203238Z-g3-desk-04abd597.json are fully repaired in EN and UR mirrors.
  - Figures and content status are clean; all content gates pass.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): validate:content PASS, check:depth-gate PASS, check:figures PASS, check:no-em-dash PASS, check:no-answer-keys PASS, check:pipeline-gate PASS, npm run check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
