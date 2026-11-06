---
id: 20261136
title: Finish GICP-400 Unit 3 draft
stage: green
date: 2026-11-06
surface: agent
model: GPT-6 Codex
feature: 008-rich-unit-pedagogy
branch: crew/gicp-400-u03-author
user: crew owner
command: Read .crew/brief.md and carry it out
labels: ["codex", "gicp-400-u03-author"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/gicp-400/unit-03/
  - specs/content/gicp-400/authoring/unit-03.md
  - specs/content/gicp-400/coverage/unit-03.md
  - specs/content/gicp-400/sources/unit-03.md
  - specs/content/gicp-400/sources/texts/goi-act-1935.md
  - specs/content/gicp-400/sources/texts/shah-2026-objectives-resolution.md
  - specs/content/gicp-400/concepts/unit-03.md
  - specs/content/gicp-400/figures/unit-03.md
  - specs/content/gicp-400/figures/unit-03.banner.md
  - static/img/figures/gicp-400/unit-03/
  - specs/content/gicp-400/tasks.md
  - specs/content/gicp-400/reviews/unit-03/G2/
tests:
  - npm run check:content
  - node scripts/prepare-gate-evidence.mjs GICP-400 3
  - origin/main content gate baseline
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Crew brief read verbatim:

# Crew job gicp-400-u03-author

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u03-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GICP-400 Unit 3 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-03/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Feedback from the previous attempt
worker exited 124 (timeout):
The content check suite is running to validate the new unit files against all repository gates. I will review the results as soon as it completes.
The status check is running to inspect the current working tree. I will review the file list as soon as it completes.
error: interrupted



## Response snapshot

Continued the inherited English draft, corrected unsupported quotations and historical conflations, completed governance and figure handoffs, and checked content gates.

## Outcome

- ✅ Impact: Unit 3 English draft and downstream handoffs prepared.
- 🧪 Tests: All 14 content gates passed on the final draft and on origin/main after generating the ignored content-status report. All eight G2 evidence commands passed. Figure variant freshness, SVG optimisation, font-metric bounds and non-browser light/dark previews passed. No build, dev server or browser run.
- 📁 Files: Four MDX pages, unit governance, authoring notes, source notes, tracker and draft evidence.
- 🔁 Next prompts: Independent G3 review, Urdu translation and schematic/banner production.
- 🧠 Reflection: A structurally passing inherited draft still required historical and assessment corrections.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 3 English learning cycles and public self-study assessment, source and concept records, four placed English schematics with dark variants and a prompt-only banner.
- Decisions the team must respect: No G3/G5 certification or publication; approved content spec unchanged; reading estimates total 53 at 190 wpm.
- Pending / next owner: Independent reviewers own G3/G5; translation job owns Urdu; assets job owns browser geometry validation and banner production.
- Paperclip issues affected: No issue identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Earlier timeout left uncommitted content; unsupported quotations, a court-case conflation and uninspected SVGs required correction.
- Graders run and results (PASS/FAIL): PASS all 14 content gates; PASS all eight recorded G2 commands; PASS figure variant freshness and SVG style. Canonical Chromium geometry validation remains unrun under the brief prohibition.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Have independent review verify source accessibility and exact statutory claims.
