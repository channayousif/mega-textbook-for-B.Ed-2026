---
id: 20261143
title: Author EFMP407 Unit Four
stage: general
date: 2026-11-07
surface: agent
model: GPT-6 Codex
feature: content-efmp-407
branch: crew/efmp-407-u04-author
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["codex", "crew", "efmp-407", "unit-04"]
links:
  spec: specs/content/efmp-407/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/efmp-407/unit-04/index.mdx
  - docs/semester-3/efmp-407/unit-04/topic-01.mdx
  - docs/semester-3/efmp-407/unit-04/topic-02.mdx
  - docs/semester-3/efmp-407/unit-04/topic-03.mdx
  - docs/semester-3/efmp-407/unit-04/unit-assessment.mdx
  - docs/semester-3/efmp-407/unit-04/unit-teacher-notes.mdx
  - specs/content/efmp-407/concepts/unit-04.md
  - specs/content/efmp-407/coverage/unit-04.md
  - specs/content/efmp-407/figures/unit-04.banner.md
  - specs/content/efmp-407/figures/unit-04.md
  - specs/content/efmp-407/sources/texts/boeve-de-pauw-2015.md
  - specs/content/efmp-407/sources/texts/lim-allan-2016-futures.md
  - specs/content/efmp-407/sources/texts/unesco-2017-esd-objectives.md
  - specs/content/efmp-407/sources/unit-04.md
  - static/img/figures/efmp-407/unit-04/fig-U4-1.dark.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-1.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-2.dark.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-2.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-3.dark.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-3.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-4.dark.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-4.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-5.dark.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-5.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-6.dark.svg
  - static/img/figures/efmp-407/unit-04/fig-U4-6.svg
  - specs/content/efmp-407/tasks.md
  - history/prompts/general/20261143-author-efmp407-unit-four.general.prompt.md
tests:
  - Baseline npm run check:content at origin/main b3042833d: all 14 pass
  - Initial npm run check:content: source binding and G2 evidence findings; repaired before final run
  - npm run check:depth-gate: pass after bound source notes added
  - MDX compile of all six pages: pass
  - SVG optimisation and style gates; Sharp contact-sheet visual inspection
  - G2 deterministic evidence and final content gate results recorded in unit tracker and evidence logs
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The referenced brief:

# Crew job efmp-407-u04-author

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-407-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author EFMP-407 Unit 4 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

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

## Response snapshot

Authored the English Unit 4 learning cycles, worked examples, inclusive lesson planning, 10/10/5 assessment bank, teacher notes, governance tables and six rendered schematics. Record G2 only through actual deterministic evidence; G3/G5 remain open.

## Outcome

- ✅ Impact: An English-only draft aligned with the approved Unit 4 topic partition and 35-55 minute depth band.
- 🧪 Tests: Baseline content gates passed. Scoped source-binding defects repaired; final results live in committed G2 logs and the final response. No build, dev server or Playwright was run.
- 📁 Files: Six MDX pages, coverage, sources and bound notes, concepts, figure manifests, twelve SVG assets, unit tracker and this PHR.
- 🔁 Next prompts: Independent G3 review, Urdu translation and G5 review, banner illustration and CI geometry verification.
- 🧠 Reflection: Current gates require placed figures and bound source notes beyond older author-unit prose. Followed current gates without changing shared policy or tooling.

## Handoff (for CEO and agents)

- Shipped / changed: English Unit 4 with three learning cycles, full self-study assessment, teacher notes, source evidence and six light/dark schematic pairs. All classroom cases and counts are labelled invented.
- Decisions the team must respect: Preserve topic labels 4.1-4.3 and figure IDs fig-U4-1 through fig-U4-6. No review certification or publication authority claimed. Urdu is a separate job.
- Pending / next owner: Independent reviewers own G3/G5. Translation job owns six pages and six RTL SVGs. Illustration job owns banner fig-U4-7. CI or a permitted follow-up owns browser text geometry because the crew brief prohibits Playwright. Shared glossary maintainer should consider the listed inline-defined terms; Lesson planning uses the existing glossary entry.
- Paperclip issues affected: No ticket supplied; EFMP-407 Unit 4 authoring crew job only.

## Evaluation notes (flywheel)

- Failure modes observed: First depth run required bound source notes and explicit enumeration of every supported sub-topic. Sharp does not resolve SVG CSS variables here, so preview buffers substitute the published palette; committed SVGs keep tokens.
- Graders run and results (PASS/FAIL): Baseline all 14 PASS; MDX syntax PASS; depth gate PASS after fixes. Final complete gate outcome and G2 evidence are recorded in the final commit. Browser geometry was not run.
- Prompt variant (if applicable): crew brief efmp-407-u04-author
- Next experiment (smallest change to try): Fresh independent reviewer checks source relevance, assessment alignment and causal-loop meaning against the frozen committed bundle.
