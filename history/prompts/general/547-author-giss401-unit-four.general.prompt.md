---
id: 547
title: Author GISS401 unit four
stage: general
date: 2026-11-03
surface: agent
model: GPT-6
feature: 008-rich-unit-pedagogy
branch: crew/giss-401-u04-author
user: owner
command: carry out .crew/brief.md
labels: [codex, giss-401-u04-author]
links:
  spec: specs/content/giss-401/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - docs/semester-3/giss-401/unit-04/index.mdx
  - docs/semester-3/giss-401/unit-04/topic-01.mdx
  - docs/semester-3/giss-401/unit-04/topic-02.mdx
  - docs/semester-3/giss-401/unit-04/unit-assessment.mdx
  - specs/content/giss-401/coverage/unit-04.md
  - specs/content/giss-401/sources/unit-04.md
  - specs/content/giss-401/sources/texts/quran-translation.md
  - specs/content/giss-401/sources/texts/abdel-salam-2015-democracy.md
  - specs/content/giss-401/figures/unit-04.md
  - specs/content/giss-401/concepts/unit-04.md
  - specs/content/giss-401/tasks.md
  - static/img/figures/giss-401/unit-04/
tests:
  - Baseline npm run check:content: all 13 gates pass at origin/main 24ce186d
  - Four English pages compiled with @mdx-js/mdx
  - Draft gate runs and repairs recorded during authoring
  - Final G2 evidence and content-gate result recorded in completion update below
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

### Referenced brief, verbatim

# Crew job giss-401-u04-author

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/giss-401-u04-author`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Author GISS-401 Unit 4 from its approved content-spec, following the author-unit skill end to end (English only; the Urdu mirror is a separate job).

Follow `.claude/skills/author-unit/SKILL.md` exactly; read it and every file it references before starting.

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

## Response snapshot

Authored the English Unit 4 opening, two complete topic cycles and the 10/10/5 assessment
with bounded self-study guidance, grounded in verified primary passages and the mapped article.
Added the coverage, concepts, source notes, figure manifest and Unit 4 tracker. The current gates
require rendered figures and bound source notes even though the author-unit reference still
permits markers, so rendered the four approved schematics and derived dark variants. The
approved specification, shared rules, catalog and gate scripts remain unchanged.

## Outcome

- ✅ Impact: English Unit 4 provides source-based social and governance teaching with local school applications.
- 🧪 Tests: Origin/main baseline clean; MDX syntax clean; final deterministic gate evidence pending at initial commit.
- 📁 Files: Four English pages, four governance records, two source-text notes, tracker, eight SVG variants and this PHR.
- 🔁 Next prompts: Independent G3 with religious-content expertise; separate Urdu translation and G5; geometry validation if browser restriction is lifted.
- 🧠 Reflection: Gate implementation is newer than the skill's prompt-only figure and source-binding descriptions.

## Handoff (for CEO and agents)

- Shipped / changed: English Unit 4 authoring and four placed schematics; reading estimates are 2 + 14 + 15 + 16 = 47 minutes at 190 words/minute, excluding comments, import lines and markup.
- Decisions the team must respect: No G3/G5 certification, publication authorisation or Urdu parity is claimed. English-only scope overrides the figure skill's suggestion to create Urdu assets now. All figure IDs, prompts and alt text are preserved through placement.
- Pending / next owner: Independent religious-content review, G4/G5 and Urdu SVG localisation belong to downstream jobs. Mandatory geometry checker imports Playwright, prohibited by the crew brief; asked whether a narrow exception is allowed. No browser checker runs without that response. Browser-free previews inspected using sharp/librsvg under scripts/heavy.sh.
- Paperclip issues affected: None named in brief; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: The coverage parser reads every pipe table, so the backward-design table was converted to a list. Source-binding and rendered-figure checks exceed the skill reference. G2 requires committed inputs before evidence generation.
- Graders run and results (PASS/FAIL): Baseline 13/13 PASS; MDX compiler PASS; draft run identified expected G2 and generated-status failures plus repaired source-binding, coverage and figure findings.
- Prompt variant (if applicable): Crew brief giss-401-u04-author.
- Next experiment (smallest change to try): Freeze this baseline for independent review; retain bounded conclusions about doctrine and democratic procedures.
