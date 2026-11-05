---
id: 20261131
title: EFMP-406 Unit 2 complete draft Urdu mirror
stage: general
date: 2026-11-05
surface: agent
model: GPT-6 (Codex)
feature: none
branch: crew/efmp-406-u02-translate-r1
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["codex", "translation", "efmp-406", "unit-02"]
links:
  spec: specs/content/efmp-406/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - "i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-02/index.mdx"
  - "i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-02/topic-02.mdx"
  - "i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-02/unit-teacher-notes.mdx"
  - "i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-02/topic-01.mdx"
  - "i18n/ur/docusaurus-plugin-content-docs/current/semester-3/efmp-406/unit-02/unit-assessment.mdx"
  - "static/img/figures/efmp-406/unit-02/fig-U2-2.ur.dark.svg"
  - "static/img/figures/efmp-406/unit-02/fig-U2-1.ur.svg"
  - "static/img/figures/efmp-406/unit-02/fig-U2-4.ur.svg"
  - "static/img/figures/efmp-406/unit-02/fig-U2-1.ur.dark.svg"
  - "static/img/figures/efmp-406/unit-02/fig-U2-3.ur.dark.svg"
  - "static/img/figures/efmp-406/unit-02/fig-U2-2.ur.svg"
  - "static/img/figures/efmp-406/unit-02/fig-U2-3.ur.svg"
  - "static/img/figures/efmp-406/unit-02/fig-U2-4.ur.dark.svg"
  - "specs/content/efmp-406/reviews/unit-02/G4/translation-handoff.md"
  - "specs/content/efmp-406/reviews/unit-02/G4/logs/"
tests:
  - "npm run check:content (draft and origin/main comparison)"
  - "temporary reviewed parity gate run"
  - "MDX compilation and source parity self-check"
  - "npm run figures:variants:check"
  - "static Urdu light/dark figure inspection"
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Referenced brief, verbatim:

# Crew job efmp-406-u02-translate-r1

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-406-u02-translate-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-406 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-406 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-406/`, and `static/img/figures/efmp-406/unit-02/`.

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
- (efmp-406-u02-repair_en, repair_en, claude) The source-excerpt bundle, author run provenance and the screen, print and SVG geometry checks are still open and need the coordinator and a host that can run a browser.
- (efmp-406-u02-repair_en, repair_en, claude) The questions and model answers changed in RRQ 2/3/9, MCQ 4/8 and Topic 2.2 check item 2, so the Urdu translation job should start from the repaired English, and a fresh independent G3 review must look at these new versions.
- (efmp-406-u02-translate, translate, codex) English author must repair RRQ 2/3/9 before translation resumes; draft status and G3/G5 remain unchanged.
- (efmp-406-u02-translate, translate, codex) English author must repair RRQ 2/3/9 before translation resumes; draft status and G3/G5 remain unchanged.
- (efmp-406-u02-review_en, review_en, codex) G3 remains open: repair RRQ 2/3/9 marking alignment and supply source, run-provenance and browser/print evidence.


## Response snapshot

Translated all five Urdu pages and four Urdu light/dark SVG pairs from repaired baseline 322e0c7a6. Kept draft status, recorded terminology proposals and pending independent review/browser work, and committed locally without pushing.

## Outcome

- ✅ Impact: Delivered complete draft Urdu mirror of EFMP-406 Unit 2.
- 🧪 Tests: Full 14-gate draft and main comparison PASS; parity and MDX checks PASS; dark freshness PASS; static light/dark inspection performed. Browser-based checks prohibited by brief.
- 📁 Files: Five MDX pages, eight SVGs, translation handoff, validation logs and this PHR.
- 🔁 Next prompts: Coordinator: settle remaining G3 evidence; authorised browser host: SVG geometry, narrow-screen and A4 checks; independent G5 reviewer: bilingual review.
- 🧠 Reflection: The RTL mirror helper overrides inherited centred tspan anchors; explicit middle anchors fix the visibly displaced labels. Static Sharp rendering requires palette substitution in a scratch buffer.

## Handoff (for CEO and agents)

- Shipped / changed: Complete draft mirror, full assessment, teacher notes, mirrored Urdu figures and actual validation logs.
- Decisions the team must respect: Do not claim G4/G5 acceptance or reviewed status. translate-unit Step 7 forbids appending the G4 row. Keep English and the frozen bank unchanged.
- Pending / next owner: Coordinator owns source passages and author provenance; authorised browser host owns geometry/build/render checks; independent G5 owns semantic and register review after accepted English dependency.
- Paperclip issues affected: No issue ID supplied; crew job efmp-406-u02-translate-r1.

## Evaluation notes (flywheel)

- Failure modes observed: Temporary reviewed index bytes invalidate G2 evidence and derived status cache. Baseline checkout needs its ignored content-status cache generated before comparison.
- Graders run and results (PASS/FAIL): Source parity/MDX and bank checks PASS; figure freshness PASS. All 14 content gates PASS in both final draft and origin/main; temporary reviewed diagnostics preserve open G4/G5 and status-induced stale evidence.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run authorised browser geometry and actual Urdu narrow-screen/A4 inspection on this exact translation.
