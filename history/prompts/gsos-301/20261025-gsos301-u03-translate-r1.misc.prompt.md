---
id: 20261025-gsos301-u03-translate-r1
title: GSOS-301 Unit 3 Urdu mirror at G4 (translate r1)
stage: misc
date: 2026-10-25
surface: agent
model: claude-opus-5-5
feature: gsos-301
branch: crew/gsos-301-u03-translate-r1
user: crew
command: crew translate
labels: ["crew", "claude", "translate"]
links:
  spec: specs/content/gsos-301/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/index.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/topic-01.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/topic-02.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/unit-assessment.mdx
 - i18n/ur/docusaurus-plugin-content-docs/current/semester-2/gsos-301/unit-03/unit-teacher-notes.mdx
 - static/img/figures/gsos-301/unit-03/fig-U3-{1,2,3,4}.ur.svg
 - static/img/figures/gsos-301/unit-03/fig-U3-{1,2,3,4}.ur.dark.svg
 - specs/content/gsos-301/tasks.md
 - specs/content/gsos-301/reviews/unit-03/G4/translation-handoff.md
 - static/content-status.json
tests:
 - npm run check:content (draft) 13/13 PASS
 - npm run check:content with temporary reviewed flip (only expected G4/G5 rows and derived status staleness)
 - npm run figures:variants:check OK
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

Brief (.crew/brief.md, verbatim):

# Crew job gsos-301-u03-translate-r1

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gsos-301-u03-translate-r1`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GSOS-301 Unit 3 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
GSOS-301 Unit 3 only: its docs/licence and i18n files, its rows and folders under
`specs/content/gsos-301/`, and `static/img/figures/gsos-301/unit-03/`.

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
- (gsos-301-u03-figures, figures, codex) Urdu Unit 3 pages are absent; the translation job must wire the prepared Urdu SVGs.
- (gsos-301-u03-figures, figures, codex) Urdu Unit 3 pages are absent; the translation job must wire the prepared Urdu SVGs.
- (gsos-301-u03-translate, translate, codex) A separate English author must resolve the existing G3 findings before G4 resumes.
- (gsos-301-u03-translate, translate, codex) A separate English author must resolve the existing G3 findings before G4 resumes.
- (gsos-301-u03-review_en, review_en, codex) Repair role terminology, missing figures, assessments and source mappings; fresh review needs author provenance and browser/print evidence.

## Response snapshot

Translated all five GSOS-301 Unit 3 files into Urdu with structural parity (headings, items, options,
tables, components, locked front matter), wired the four prepared `.ur.svg` figures with full Urdu alt
text, synced each `.ur.svg` title/desc to the carrier alt and regenerated dark variants, added a
bank-conformant UR `key_terms` block, updated the G4 tracker note (status stays ▢), and rewrote the G4
handoff. The English still carries the G3 role conflict/strain and RRQ defects; the translation follows
it faithfully and the handoff lists the passages to re-translate after the English repair.

## Outcome

- ✅ Impact: Unit 3 now has a complete draft Urdu mirror ready for independent G5 once the English is repaired.
- 🧪 Tests: check:content 13/13 at draft; reviewed flip probe clean apart from expected G4/G5 rows.
- 📁 Files: 5 new Urdu MDX, 8 Urdu SVG variants, tracker, G4 handoff, content-status.
- 🔁 Next prompts: English author repairs G3 findings; then re-translate changed passages; then render-inspect --locale ur and G5.
- 🧠 Reflection: The earlier job stopped on the stop rule, and the crew rescheduled translation anyway. Translating the unaffected 95% now and flagging the defective passages avoids a deadlock without silently fixing the English.

## Handoff (for CEO and agents)

- Shipped / changed: GSOS-301 U3 Urdu mirror (draft), .ur.svg desc parity, G4 note and handoff.
- Decisions the team must respect: translation_status stays draft; G4 row stays ▢; English defects were not fixed in the Urdu.
- Pending / next owner: English author (MCQ 3, topic 3.1, teacher notes role conflict/strain, RRQ 3 guidance, RRQ 1-2 Bloom level); owner (proposed Urdu terms, concept label مواصلات vs ابلاغ); permitted host (render-inspect --locale ur); independent G5 reviewer.
- Paperclip issues affected: none (crew job gsos-301-u03-translate-r1).

## Evaluation notes (flywheel)

- Failure modes observed: .ur.svg desc prepared by the figures job was a shorter alt than any full translation, so check:figures fails under reviewed until desc and alt are synced.
- Graders run and results (PASS/FAIL): check:content PASS; figures:variants:check PASS.
- Prompt variant (if applicable): crew translate r1
- Next experiment (smallest change to try): have the figures job write .ur.svg desc only after the Urdu carrier alt exists, or have translate-unit own the desc sync.
