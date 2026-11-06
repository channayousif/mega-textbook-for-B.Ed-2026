---
id: 20261137
title: Translate GICP-400 Unit 1 into a complete draft Urdu mirror
stage: general
date: 2026-11-06
surface: agent
model: GPT-6 Codex
feature: none
branch: crew/gicp-400-u01-translate
user: crew
command: Read .crew/brief.md and carry it out completely
labels: ["codex", "crew", "translation", "gicp-400"]
links:
  spec: specs/content/gicp-400/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-01/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-01/topic-01.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-01/topic-02.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-3/gicp-400/unit-01/unit-assessment.mdx
  - static/img/figures/gicp-400/unit-01/fig-U1-1.ur.dark.svg
  - static/img/figures/gicp-400/unit-01/fig-U1-1.ur.svg
  - static/img/figures/gicp-400/unit-01/fig-U1-2.ur.dark.svg
  - static/img/figures/gicp-400/unit-01/fig-U1-2.ur.svg
  - static/img/figures/gicp-400/unit-01/fig-U1-3.ur.dark.svg
  - static/img/figures/gicp-400/unit-01/fig-U1-3.ur.svg
  - static/img/figures/gicp-400/unit-01/fig-U1-4.ur.dark.svg
  - static/img/figures/gicp-400/unit-01/fig-U1-4.ur.svg
  - specs/content/gicp-400/tasks.md
  - specs/content/gicp-400/reviews/unit-01/G4/translation-handoff.md
tests:
  - npm run check:content (draft and temporary reviewed parity runs)
  - npm run figures:variants:check
  - supplemental MDX mirror assertions and Pango Nastaliq metrics
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

The delegated brief was:

# Crew job gicp-400-u01-translate

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/gicp-400-u01-translate`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or Playwright, keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate GICP-400 Unit 1 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft. Topic titles read "موضوع N.M - ...", matching the English numbering.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

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

## Notes from earlier jobs on this unit
- (gicp-400-u01-review_en, review_en, opencode) G3 is escalated, not failed: sources and accessibility are unverified because the Hassan full text is not bound and the brief prohibits the build/browser render needed for the accessibility and SVG-geometry checks.
- (gicp-400-u01-review_en, review_en, opencode) The unit's main claims are supported; four secondary Hassan attributions (Jinnah's unity work, Congress rule 1937-1939, the "could not be united peacefully" narrative, East Pakistan 1971) are not established by the bound notes.
- (gicp-400-u01-review_en, review_en, opencode) G4 Urdu translation and the prompt-only banner remain open; a fresh reviewer must recheck after the parent supplies provenance and the missing evidence.
- (gicp-400-u01-author, author, codex) G3/G5, Urdu translation and banner production remain open.
- (gicp-400-u01-author, author, codex) SVG browser geometry inspection remains pending because the brief prohibits browser runs.


## Response snapshot

Translated all four Unit 1 pages, including the complete 10/10/5 assessment and marking guidance, and localised all four schematic SVGs with dark variants. Kept translation_status draft and all review gates open. Recorded a translator handoff and updated only the existing G4 delivery note.

## Outcome

- ✅ Impact: Complete draft Urdu mirror ready for independent bilingual review once the English G3 dependency is resolved.
- 🧪 Tests: All 14 content gates pass in draft. Reviewed-only parity leaves exactly the expected unfinished G4/G5 findings. Figure variants and supplemental structure/font metrics pass.
- 📁 Files: Four Urdu MDX pages, eight localised SVG variants, translator handoff, existing G4 note and this PHR.
- 🔁 Next prompts: Resolve English G3 source/provenance escalation, then perform authorised browser geometry, Urdu narrow/A4 rendering and fresh independent G5.
- 🧠 Reflection: Temporary reviewed flags also invalidate the ignored content-status report; regenerate for the test and again after restoring draft and changing tracker notes.

## Handoff (for CEO and agents)

- Shipped / changed: Complete Urdu pages, full assessment equivalence, four Urdu schematic SVGs and derived dark twins.
- Decisions the team must respect: Frozen terminology unchanged, including پاکستان کے نظریے; G4/G5 remain open under translate-unit Step 7; no self-certification.
- Pending / next owner: Parent/owner resolves G3 dependencies and authorises rendering; fresh independent G5 reviewer checks meaning, proposed terms and rendered Urdu. Banner belongs to illustration job.
- Paperclip issues affected: Crew job gicp-400-u01-translate; no external ticket supplied.

## Evaluation notes (flywheel)

- Failure modes observed: Initial temporary parity run also reported stale content status. Regeneration removed it. Final tracker-note edit required another regeneration. Browser-based geometry and rendering were prohibited by the brief.
- Graders run and results (PASS/FAIL): PASS: all draft content gates, global dark-variant freshness, file/heading/component/numbered-item parity, identical Urdu alt and desc, supplemental Pango geometry. Expected temporary reviewed-only pipeline FAIL: unfinished G4 and G5 only.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): Run the mandatory Chromium SVG geometry and rendered Urdu checks in an authorised follow-up session.
