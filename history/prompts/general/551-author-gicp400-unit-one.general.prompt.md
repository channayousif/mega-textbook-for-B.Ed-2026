---
id: 551
title: Author GICP400 Unit One
stage: general
date: 2026-11-06
surface: agent
model: GPT-6 Codex
feature: gicp-400-unit-01
branch: crew/gicp-400-u01-author
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["codex", "crew", "gicp-400"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/gicp-400/course-overview.mdx
  - docs/semester-3/gicp-400/_category_.json
  - docs/semester-3/gicp-400/unit-01/index.mdx
  - docs/semester-3/gicp-400/unit-01/topic-02.mdx
  - docs/semester-3/gicp-400/unit-01/topic-01.mdx
  - docs/semester-3/gicp-400/unit-01/unit-assessment.mdx
  - specs/content/gicp-400/concepts/unit-01.md
  - specs/content/gicp-400/coverage/unit-01.md
  - specs/content/gicp-400/figures/unit-01.md
  - specs/content/gicp-400/figures/unit-01.banner.md
  - specs/content/gicp-400/sources/unit-01.md
  - specs/content/gicp-400/sources/texts/jinnah-1947-assembly.md
  - specs/content/gicp-400/sources/texts/hassan-2020-two-nation.md
  - specs/content/gicp-400/sources/texts/pak-constitution-1973.md
  - specs/content/gicp-400/sources/texts/iqbal-1930-address.md
  - specs/content/gicp-400/sources/texts/roberts-2025-ideology.md
  - specs/content/gicp-400/sources/texts/iqbal-reconstruction.md
  - specs/content/gicp-400/sources/texts/jinnah-1940-lahore.md
  - specs/content/gicp-400/sources/texts/quran-public-ethics.md
  - specs/content/gicp-400/sources/texts/waluchow-kyritsis-2023.md
  - static/img/figures/gicp-400/unit-01/fig-U1-1.dark.svg
  - static/img/figures/gicp-400/unit-01/fig-U1-2.dark.svg
  - static/img/figures/gicp-400/unit-01/fig-U1-1.svg
  - static/img/figures/gicp-400/unit-01/fig-U1-3.dark.svg
  - static/img/figures/gicp-400/unit-01/fig-U1-3.svg
  - static/img/figures/gicp-400/unit-01/fig-U1-4.svg
  - static/img/figures/gicp-400/unit-01/fig-U1-4.dark.svg
  - static/img/figures/gicp-400/unit-01/fig-U1-2.svg
  - specs/content/gicp-400/tasks.md
  - history/prompts/general/551-author-gicp400-unit-one.general.prompt.md
tests:
  - npm run check:content (iterative; final run after G2 evidence)
  - origin/main baseline check:content in isolated .crew/baseline checkout
  - FIGURE_ROOT=static/img/figures/gicp-400/unit-01 node scripts/build-figure-variants.mjs --check
  - node scripts/prepare-gate-evidence.mjs GICP-400 1
  - git diff --check
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The delegated brief read for this task:

# Crew job gicp-400-u01-author

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u01-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GICP-400 Unit 1 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job). Topic titles read "Topic N.M - Title" (validate:content checks it).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 1 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-01/`.

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

Continued inherited untracked Unit 1 content, verified sources, completed governance, restored four schematic SVGs and derived dark variants, and prepared the English-only draft for deterministic G2 evidence. G3/G5 remain open. No push or PR.

## Outcome

- ✅ Impact: English Unit 1 covers all six approved leaves with two topic cycles, 10/10/5 assessment, worked examples, local contexts, and concept-to-assessment traceability.
- 🧪 Tests: Content gate loop found and repaired missing tracker, coverage, source evidence, figure records and rendered figure floor. G2 evidence preparation also required the missing course-overview.mdx input. Added minimal course navigation and approved course metadata as the required dependency; final G2 and gate results recorded in the follow-up commit.
- 📁 Files: Four MDX pages, minimal course overview and its category link, tracker, coverage, nine source-evidence files, concept graph, figure and banner manifests, and eight schematic variants.
- 🔁 Next prompts: Independent G3 review; Urdu translation and G5; browser geometry and visual inspection; banner production.
- 🧠 Reflection: The author-unit checklist still permits prompt-only figures, but the current gates require rendered figures and bound source excerpts. Followed the brief's explicit gate-fix requirement using inherited SVGs and transparent source notes; no policy or gate edits.

## Handoff (for CEO and agents)

- Shipped / changed: English-only Unit 1 draft and governance, four placed schematic pairs and a prompt-only banner handoff.
- Decisions the team must respect: Approved spec unchanged. Urdu is a separate job. No G3/G5 certification, reviewer identity or publication authority fabricated. Source text uses a dated constitutional study edition with an accessible transcription because the official PDF timed out.
- Pending / next owner: Independent reviewer owns G3; translator and independent reviewer own G4/G5. Later visual job must run SVG browser geometry and inspect the figures, which this crew brief prohibits; original inherited SVG copies remain ignored under .crew/inherited-figures/. Banner remains prompt-only.
- Paperclip issues affected: Crew job gicp-400-u01-author; no issue identifier supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Missing governance and obsolete prompt-only figure assumptions; coverage parser reads every pipe table, so assessment design trace uses prose bullets; isolated baseline required its own Git index to validate committed manifests correctly.
- Graders run and results (PASS/FAIL): Depth, figure consistency, source floor, concept and Bloom gates repaired. Browser geometry, build, dev server and Playwright intentionally not run under the brief. Final deterministic evidence follows.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run independent source and assessment review on the frozen English draft, including the historical edition limits and figure text geometry.
