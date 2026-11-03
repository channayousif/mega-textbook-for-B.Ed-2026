---
id: 549
title: Translate GISS401 Unit Four Urdu
stage: general
date: 2026-11-03
surface: agent
model: GPT-6 Codex
feature: content-pipeline
branch: crew/giss-401-u04-translate
user: crew
command: Read .crew/brief.md and carry it out
labels: [codex, crew, giss-401, urdu, G4]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/giss-401/unit-04/*.mdx
  - static/img/figures/giss-401/unit-04/*.ur.svg
  - static/img/figures/giss-401/unit-04/*.ur.dark.svg
  - specs/content/giss-401/reviews/unit-04/G4/translation-handoff.md
  - history/prompts/general/549-translate-giss401-unit-four-urdu.general.prompt.md
tests:
  - npm run check:content (draft and temporarily reviewed)
  - origin/main content-gate baseline
  - npm run figures:variants:check
  - Repository SVG optimiser for four Urdu source assets
  - MDX compilation, structural parity, component counts, URLs and alt/desc identity
  - Serial Sharp static figure previews and visual inspection
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The delegated brief, preserved verbatim:

# Crew job giss-401-u04-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u04-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GISS-401 Unit 4 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GISS-401 Unit 4 only: its docs/licence and i18n files, its rows and folders under
`specs/content/giss-401/`, and `static/img/figures/giss-401/unit-04/`.

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
- (giss-401-u04-review_en, review_en, agy) GISS-401 Unit 4 English draft passes independent G3 evaluation with advisory report at specs/content/giss-401/reviews/unit-04/G3/a5031c12-2079-4b0e-b718-bb161d2381bc.json.
- (giss-401-u04-review_en, review_en, agy) G3 tracker row remains open ▢ per ADR-0019 pending trusted qualification and the specialized Islamic Studies reviewer sign-off noted in the course spec.
- (giss-401-u04-review_en, review_en, agy) Unit 4 is ready for the subsequent Urdu translation job (G4 ur-translation) and mirrored figures.
- (giss-401-u04-author-conflict1, fix, opencode) The four Unit 4 SVGs (and Unit 1's) have never been measured by measure-figure-text; CI figure-geometry may flag them, so G6 stays in progress.
- (giss-401-u04-author-conflict1, fix, opencode) The shared course-overview available-units sentence is a bound input, so updating it required refreshing the G2 evidence for Units 1 and 4 (now 20261103T002225035Z and 20261103T002225277Z).


## Response snapshot

Translated all four Unit 4 pages, the full assessment bank and public marking guidance; localised four RTL figures with derived dark variants. Left translation_status draft and review gates open. Recorded terminology proposals and validation limits for the next reviewer.

## Outcome

- ✅ Impact: Complete Urdu source mirror available for subsequent independent G5 review.
- 🧪 Tests: Draft content gates pass. Conditional parity finds only expected unfinished G4/G5 tracker rows after regenerating local status. Main baseline passes after local status generation. MDX compilation and figure variants pass; static previews inspected.
- 📁 Files: Four Urdu MDX files, four Urdu light SVGs, four derived dark SVGs, unit handoff and this PHR.
- 🔁 Next prompts: Permitted Chromium geometry and Urdu desktop, narrow and A4 inspection; independent qualified G5 following accepted G3.
- 🧠 Reflection: Static previews caught overlong Nastaliq labels; wrapping fixed the visible defects without reducing font sizes. Draft status alone leaves parity gates silent, so a temporary reviewed pass was necessary.

## Handoff (for CEO and agents)

- Shipped / changed: Complete Unit 4 Urdu draft and mirrored figure assets based on English commit ee21e1a43a5fcc61ed6a96ce0b43b8020a6af12a.
- Decisions the team must respect: Terminology bank and English baseline unchanged. The brief asks for G4 recording as the skill says; Step 7 explicitly forbids appending a tracker row, so a separate handoff records the draft and tracker remains unchanged. Both indexes restored to draft. No G3/G5 certification, publication, push or PR.
- Pending / next owner: Next permitted validation session owns measure-figure-text and actual Urdu browser/A4 inspection; independent reviewer owns G5 and curriculum owner owns proposed terminology decisions.
- Paperclip issues affected: No issue identifier supplied; crew job giss-401-u04-translate.

## Evaluation notes (flywheel)

- Failure modes observed: Conditional status flip initially made ignored content-status output stale. Regenerating it removed that finding; only expected G4/G5 findings remain while flipped. Static previews exposed overlong figure labels. A staged handoff under general course metadata staled G2 because that directory is bound; moving the lifecycle handoff to reviews/unit-04/G4 preserved the existing English input manifest.
- Graders run and results (PASS/FAIL): PASS draft check:content and origin/main baseline; PASS MDX and structural/figure checks; conditional check:content has only expected G4/G5 failures; browser geometry and rendered locale inspection not run because brief forbids Playwright/builds/servers.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run permitted measure-figure-text and actual Urdu render inspection before independent review.
