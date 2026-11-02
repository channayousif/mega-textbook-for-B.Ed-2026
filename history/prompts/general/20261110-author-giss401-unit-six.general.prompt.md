---
id: 20261110
title: Author GISS-401 Unit Six
stage: general
date: 2026-11-03
surface: agent
model: GPT-6 Codex
feature: none
branch: crew/giss-401-u06-author
user: crew owner
command: crew brief execution
labels: ["codex", "crew", "giss-401", "unit-06"]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/giss-401/unit-06/index.mdx
  - docs/semester-3/giss-401/unit-06/topic-01.mdx
  - docs/semester-3/giss-401/unit-06/topic-02.mdx
  - docs/semester-3/giss-401/unit-06/topic-03.mdx
  - docs/semester-3/giss-401/unit-06/unit-assessment.mdx
  - specs/content/giss-401/concepts/unit-06.md
  - specs/content/giss-401/coverage/unit-06.md
  - specs/content/giss-401/figures/unit-06.md
  - specs/content/giss-401/sources/texts/bhat-2019-education.md
  - specs/content/giss-401/sources/texts/met-science-education.md
  - specs/content/giss-401/sources/texts/quran-translation.md
  - specs/content/giss-401/sources/texts/sahih-muslim-1218a.md
  - specs/content/giss-401/sources/texts/sardar-2011-astronomy.md
  - specs/content/giss-401/sources/texts/unesco-samarkand.md
  - specs/content/giss-401/sources/unit-06.md
  - specs/content/giss-401/tasks.md
  - static/img/figures/giss-401/unit-06/fig-U6-1.dark.svg
  - static/img/figures/giss-401/unit-06/fig-U6-1.svg
  - static/img/figures/giss-401/unit-06/fig-U6-2.dark.svg
  - static/img/figures/giss-401/unit-06/fig-U6-2.svg
  - static/img/figures/giss-401/unit-06/fig-U6-3.dark.svg
  - static/img/figures/giss-401/unit-06/fig-U6-3.svg
  - static/img/figures/giss-401/unit-06/fig-U6-4.dark.svg
  - static/img/figures/giss-401/unit-06/fig-U6-4.svg
  - static/img/figures/giss-401/unit-06/fig-U6-5.dark.svg
  - static/img/figures/giss-401/unit-06/fig-U6-5.svg
  - static/img/figures/giss-401/unit-06/fig-U6-6.dark.svg
  - static/img/figures/giss-401/unit-06/fig-U6-6.svg
tests:
  - npm run check:content (baseline passed; final run after G2 evidence)
  - npm run check:depth-gate (passed)
  - npm run check:figures (passed)
  - npm run check:concept-graph (passed)
  - FIGURE_ROOT=static/img/figures/giss-401/unit-06 npm run figures:variants:check (passed)
  - scripts/heavy.sh npm test -- tests/unit/figure-palette.test.mjs (46 passed)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Delegated brief, verbatim:

# Crew job giss-401-u06-author

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u06-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GISS-401 Unit 6 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-06/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.


## Response snapshot

Authored the English Unit 6 opening, three topic cycles, 10/10/5 assessment with bounded self-study answers, four governance artefacts and six English schematics with dark variants. G3/G5 remain open. G2 evidence and final checks are recorded in the final validation update below.

## Outcome

- ✅ Impact: All nine approved guide leaves taught and assessed within the 55-75 minute depth band (64 minutes).
- 🧪 Tests: Baseline content suite passed. Scoped depth, figures, concept graph, dark freshness and 46 palette tests pass; final suite recorded after G2 evidence.
- 📁 Files: Five MDX pages; coverage, sources, figures, concepts and Unit 6 tracker; six bound source-support files; twelve SVG assets.
- 🔁 Next prompts: Independent Islamic Studies G3 review; Urdu mirror and RTL figure localisation; browser geometry when permitted.
- 🧠 Reflection: Live gates require rendered figures and source support files beyond the older author-unit handoff wording. Complete those requirements without changing gate policy.

## Handoff (for CEO and agents)

- Shipped / changed: English draft, assessment, governance and six placed schematics in both themes.
- Decisions the team must respect: No certification or human initials. Keep the rights comparison partial; Bhat is a book review, not empirical research. Preserve approved figure IDs and prompts.
- Pending / next owner: G3 subject reviewer must independently retrieve the full UDHR text; official fetches returned 403, so the source is explicitly declared unverifiable. Browser geometry was prohibited by this crew brief; next permitted validation session owns measure-figure-text. Separate translation job owns Urdu and glossary banking.
- Paperclip issues affected: No issue supplied; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: Prompt-only figures failed current rendered density requirements; missing bound source notes failed depth; a restricted-response item was mapped across topics. Repaired in scope. G2 requires a committed draft before evidence preparation.
- Graders run and results (PASS/FAIL): Scoped gates PASS; palette 46/46 PASS; final content result recorded below. Browser-based geometry NOT RUN because brief prohibits Playwright.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Independent reviewer checks scriptural inference, partial rights comparison and all assessment reasoning without author self-certification.
