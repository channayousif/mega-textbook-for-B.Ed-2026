---
id: 0174
title: EFMP-302 U6 G4 reverify and term rebind
stage: misc
date: 2026-10-17
surface: agent
model: claude-opus-5-5
feature: efmp-302
branch: crew/efmp-302-u06-translate
user: crew
command: crew job efmp-302-u06-translate (translate-unit skill)
labels: ["crew", "claude", "translate", "G4", "terminology"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-06/index.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-06/topic-03.mdx
  - i18n/ur/docusaurus-plugin-content-docs/current/semester-1/efmp-302/unit-06/unit-teacher-notes.mdx
  - specs/content/efmp-302/concepts/unit-06.md
  - specs/content/efmp-302/reviews/unit-06/G2/20261017T162033794Z-gates.json
  - specs/content/efmp-302/reviews/unit-06/G2/logs-20261017T162033794Z/
  - specs/content/efmp-302/tasks.md
  - history/prompts/efmp-302/0174-efmp302-u6-g4-reverify-reflective-practice-term.misc.prompt.md
tests:
  - npm run check:content with both index files temporarily set to reviewed - parity, figures and key_terms pass; only the expected G4/G5-not-done rows and the G2 stale manifest fail (then fixed)
  - node scripts/prepare-gate-evidence.mjs EFMP-302 6 - all draft gates PASS
  - npm run check:content (draft, final) - 13/13 PASS
---

## Prompt

# Crew job efmp-302-u06-translate

You are the claude worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/efmp-302-u06-translate`.
Read AGENTS.md and CLAUDE.md first and obey them: no em dash (U+2014) anywhere, heavy commands only through
`scripts/heavy.sh`, never run `npm run build` or a dev server, never mark G3/G5 done, never self-sign or use
human initials, never edit the style guide, constitution, ADRs, gate scripts, catalog or an approved content-spec.

## Task
Translate EFMP-302 Unit 6 into its complete Urdu mirror at G4 (translate-unit skill), bound to specs/content/terminology.csv. Record the G4 tracker row as the skill says; translation_status stays draft.

Follow `.claude/skills/translate-unit/SKILL.md` exactly; read it and every file it references before starting.

## Scope
EFMP-302 Unit 6 only: its docs/licence and i18n files, its rows and folders under
`specs/content/efmp-302/`, and `static/img/figures/efmp-302/unit-06/`.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. `npm run check:content` reports no finding that origin/main does not also report (run it, read every
   failure, fix those in your scope, rerun). Findings that already exist on main belong to other jobs.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.

## Response snapshot

The EFMP-302 Unit 6 Urdu mirror already existed (G4 2026-09-24, G5 cycle-1 repairs 2026-09-25) and is
current with the English: the only later English change (a1638d91, unit banner and topic opening
illustrations) was applied to both locales. Not retranslated. One binding defect was found: the owner
banked `Reflective Practice` = `تاملی مشق` on 2026-10-11 (D-2026-0067), after this mirror was written,
and the mirror used `غور و فکر` / `غور و فکر بطور طریقہ کار`. Re-bound the six term uses (index
objectives, topic-03 heading, Glossary carrier, misconception line, summary; teacher-notes
misconception) and concept label CON:EFMP-302-6-12. "Reflection" alone became `تامل`, after the
banked `... تامل` compounds. Removed a translator-added parenthetical in topic-03 (contrasting with Unit
2's Reflective Decision Making) that has no English counterpart; the banked term now carries that
distinction. "Reflective tools" (not banked) and the fig-U6-5 label were left unchanged. Because the
concept table is a bound input, G2 gate evidence was regenerated and the tracker G2 row repointed. A
re-verification note was added to the G4 row, which stays ▣. translation_status stays draft.

## Outcome

- ✅ Impact: Unit 6 Urdu mirror conforms to the current terminology bank; all 13 content gates pass.
- 🧪 Tests: check:content 13/13 PASS (draft); reviewed-flip run showed parity/figure/key_terms clean.
- 📁 Files: 3 Urdu MDX, concept table, tracker, new G2 evidence, this PHR.
- 🔁 Next prompts: fresh G3 and G5 reviews of Unit 6 (both bound evidence sets predate f88521e9).
- 🧠 Reflection: a bank entry added after a translation silently de-binds that translation; no gate catches it while the unit is draft.

## Handoff (for CEO and agents)

- Shipped / changed: Unit 6 Urdu "Reflective Practice" re-bound to the banked تاملی مشق (commit f88521e9), CON:EFMP-302-6-12 relabelled, G2 evidence regenerated, G4 row note added.
- Decisions the team must respect: G4 row stays ▣ and translation_status stays draft (translate-unit Step 7; only an accepted G5 earns reviewed). No G3/G5 status changed.
- Pending / next owner: (1) fresh G3 and G5 reviews for Unit 6, crew lead to schedule, because the concept table and three Urdu files changed; (2) owner: confirm that bank `Development` = نشوونما (growth sense) is not meant for "professional development", which Unit 6 renders ترقی as in the banked CPD compound; (3) owner: the `بطور طریقہ کار` qualifier on CON:EFMP-302-6-12 is still authored and flagged; (4) open G-2026-64/65/68 escalations are unchanged. PHR number 0174 may collide at merge.
- Paperclip issues affected: none (Paperclip paused; crew board tracks this job).

## Evaluation notes (flywheel)

- Failure modes observed: draft-mode gates do not check terminology, so a post-translation bank change went unnoticed until a manual scan.
- Graders run and results (PASS/FAIL): check:content PASS; prepare-gate-evidence PASS.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): have the crew translate job diff every banked term_en in the English unit against the Urdu mirror, even in draft.
