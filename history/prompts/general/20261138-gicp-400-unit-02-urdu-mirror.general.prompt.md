---
id: 20261138
title: Translate GICP-400 Unit 2 into a complete draft Urdu mirror
stage: general
date: 2026-11-07
surface: agent
model: opencode
feature: gicp-400
branch: crew/gicp-400-u02-translate
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["opencode", "crew", "translation", "gicp-400"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-02/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-02/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-02/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-02/unit-assessment.mdx
  - static/img/figures/gicp-400/unit-02/fig-U2-1.ur.dark.svg
  - static/img/figures/gicp-400/unit-02/fig-U2-1.ur.svg
  - static/img/figures/gicp-400/unit-02/fig-U2-2.ur.dark.svg
  - static/img/figures/gicp-400/unit-02/fig-U2-2.ur.svg
  - static/img/figures/gicp-400/unit-02/fig-U2-3.ur.dark.svg
  - static/img/figures/gicp-400/unit-02/fig-U2-3.ur.svg
  - static/img/figures/gicp-400/unit-02/fig-U2-4.ur.dark.svg
  - static/img/figures/gicp-400/unit-02/fig-U2-4.ur.svg
  - specs/content/gicp-400/reviews/unit-02/G4/translation-handoff.md
tests:
  - npm run check:content (draft and temporary reviewed parity runs)
  - npm run figures:variants:check
  - supplemental MDX mirror assertions (file set, metadata, heading vectors, component counts, item counts, alt/desc identity)
  - all ten MCQs solved independently from the Urdu and compared with the translated key
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The delegated brief, preserved verbatim:

# Crew job gicp-400-u02-translate

You are the opencode worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u02-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GICP-400 Unit 2 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GICP-400 Unit 2 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gicp-400/`, and `static/img/figures/gicp-400/unit-02/`.

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
- (gicp-400-u02-review_en, review_en, codex) G3 remains open pending source verification, run provenance and browser/A4 inspection.
- (gicp-400-u02-review_en, review_en, codex) G3 remains open pending source verification, run provenance and browser/A4 inspection.
- (gicp-400-u02-author-conflict1, fix, opencode) The orphaned pre-merge Unit 2 G2 evidence (20261106T152644075Z-gates.json) is left in place per the repo's refresh convention.
- (gicp-400-u02-author-conflict1, fix, opencode) G3/G5 remain open (no independent review or signing), and the banner figure stays prompt-only under the crew browser prohibition.
- (gicp-400-u02-author, author, opencode) The G2 evidence path requires a course-level `course-overview.mdx`; I added it and the course `_category_.json` as a prerequisite, which is just outside the strict Unit 2 scope.

## Response snapshot

Translated all four Unit 2 pages, the full 10/10/5 assessment bank with its bounded public marking guidance, and localised four RTL schematic SVGs with derived dark variants. Left `translation_status` draft and every review gate open. Recorded terminology proposals and validation limits for the next reviewer.

## Outcome

- Impact: Complete Urdu source mirror available for subsequent independent G5 review.
- Tests: All 14 content gates pass in draft state. The temporary `reviewed` flip produced only the two expected pipeline findings (Unit 2 `G4 ur-translation` and `G5 ur-review` rows not done) and no terminology, parity or figure findings; both indexes were restored to `draft` and the derived content-status report regenerated. `figures:variants:check` passes. Component counts (Figure 4/4, Glossary 1/1, PrintHandout 3/3), numbered-item counts (50/50) and all four alt/desc pairs match. All ten MCQs were solved from the Urdu alone and matched the translated key.
- Files: Four Urdu MDX files, four Urdu light SVGs, four derived dark SVGs, the G4 handoff and this PHR.
- Next prompts: Permitted Chromium geometry (`measure-figure-text.mjs`) and Urdu desktop, narrow and A4 inspection; independent qualified G5 following accepted G3.
- Reflection: The parity gates are silent at `draft`, so the temporary flip was necessary to prove structural, figure and terminology parity. The brief's `Record the G4 tracker row as the skill says` was read with translate-unit Step 7, which forbids appending a tracker row; the handoff records the delivery and the existing row is unchanged.

## Handoff (for CEO and agents)

- Shipped / changed: Complete Unit 2 Urdu draft and mirrored figure assets based on English commit `fa7d7fa89ec3e27127534c9dde467a0c30f13b0a`.
- Decisions the team must respect: Terminology bank and English baseline unchanged. `translation_status` stays `draft` on every page; no G3/G5 certification, publication, push or PR. The Unit 2 G4 tracker row is unchanged, matching the GISS-401 Unit 4 precedent and translate-unit Step 7.
- Pending / next owner: Next permitted validation session owns `measure-figure-text.mjs` and actual Urdu browser/A4 inspection; an independent reviewer owns G5; the curriculum owner owns the proposed terminology decisions.
- Paperclip issues affected: No issue identifier supplied; crew job gicp-400-u02-translate.

## Evaluation notes (flywheel)

- Failure modes observed: The write tool truncated two long MDX bodies mid-file; both were repaired by appending the remaining text from a scratch file under `.crew/`. The conditional status flip made the ignored `static/content-status.json` stale until regenerated. Urdu labels were checked by hand against each viewBox because Chromium measurement is prohibited.
- Graders run and results (PASS/FAIL): PASS `npm run check:content` draft and after revert; PASS temporary reviewed flip (only the two expected G4/G5 findings); PASS `npm run figures:variants:check`; PASS `validate:content`, `check:no-em-dash`, `check:figures`, `check:svg-style`, `check:no-answer-keys`. Browser geometry and rendered locale inspection not run because the brief forbids Playwright, builds and dev servers.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run permitted `measure-figure-text.mjs` and actual Urdu render inspection before independent review.
