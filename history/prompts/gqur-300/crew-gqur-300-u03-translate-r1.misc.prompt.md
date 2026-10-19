---
id: crew-gqur-300-u03-translate-r1
title: crew translate GQUR-300 unit 3
stage: misc
date: 2026-10-19
surface: agent
model: agy
feature: gqur-300
branch: crew/gqur-300-u03-translate-r1
user: crew
command: crew translate
labels: ["crew", "agy", "translate"]
links:
  spec: specs/content/gqur-300/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-03/topic-03.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-03/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/gqur-300/unit-03/unit-teacher-notes.mdx
 - specs/content/gqur-300/reviews/unit-03/G4/handoff.md
 - specs/content/gqur-300/tasks.md
 - history/prompts/gqur-300/crew-gqur-300-u03-translate-r1.misc.prompt.md
tests:
 - npm run check:content
 - npm run figures:variants:check
 - npm run check:no-em-dash
 - npm run check:no-answer-keys
---

## Prompt

# Crew job gqur-300-u03-translate-r1

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gqur-300-u03-translate-r1`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GQUR-300 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GQUR-300 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gqur-300/`, and `static/img/figures/gqur-300/unit-03/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job on this unit
   needs (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (gqur-300-u03-translate, translate, agy) All 8 key_terms in Unit 3 index.mdx remain unbanked in terminology.csv (flagged in concepts/unit-03.md) and await curriculum owner banking.
- (gqur-300-u03-translate, translate, agy) G4 tracker row in specs/content/gqur-300/tasks.md is set to in-progress (▣) and translation_status remains draft pending fresh independent G5 review.
- (gqur-300-u03-translate, translate, agy) Structural and figure parity verified with temporary reviewed flip, with all 13 content gates passing cleanly.


## Response snapshot

Translated Latin MCQ option letters (a/b/c/d to الف/ب/ج/د), MCQ answer keys, and Bloom tags across all Unit 3 Urdu files; localized brainstorming in teacher notes; created durable G4 translation handoff and updated task tracker; verified all 13 content gates pass.

## Outcome

- Impact: completed G4 translation refinement and verification for GQUR-300 Unit 3.
- Tests: all 13 content gates passed cleanly in check:content; figure variants check clean (810 figures); zero em dashes; zero answer key leaks.
- Files: 8 files (5 Urdu content files, G4 handoff, tasks.md, PHR).
- Next prompts: curriculum owner terminology banking for 8 unbanked key terms and fresh independent G5 review.
- Reflection: Latin MCQ letters and untranslated Bloom tags in assessment and topics remained from initial draft; transliteration and translation completed academic-plain parity.

## Handoff (for CEO and agents)

- Shipped / changed: Transliterated Latin MCQ options to Urdu letters, synced answer keys, translated Bloom tags in topic and assessment files, localized brainstorming in teacher notes, authored G4 translation handoff, and updated tasks.md tracker note.
- Decisions the team must respect: translation_status stays draft; G4 row stays in-progress (▣); no G3/G5 certification claimed.
- Pending / next owner: curriculum owner resolves 8 unbanked terms in terminology.csv; independent G5 reviewer performs bilingual passage-level review and visual inspection.
- Notes for the next job on this unit:
  - All 8 key_terms in Unit 3 index.mdx remain unbanked in terminology.csv (flagged in concepts/unit-03.md) and await curriculum owner banking.
  - G4 tracker row in specs/content/gqur-300/tasks.md is set to in-progress (▣) and translation_status remains draft pending fresh independent G5 review.
  - Reviews G4 handoff created at specs/content/gqur-300/reviews/unit-03/G4/handoff.md.
- Paperclip issues affected: none; links.ticket is null.

## Evaluation notes (flywheel)

- Failure modes observed: initially missing static/content-status.json in fresh checkout resolved with npm run build:content-status.
- Graders run and results (PASS/FAIL): check:content PASS, figures:variants:check PASS, check:no-em-dash PASS, check:no-answer-keys PASS.
- Prompt variant: crew continuation brief.
- Next experiment: none.
