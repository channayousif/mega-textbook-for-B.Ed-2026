---
id: 0171
title: EFMP-302 Unit 4 G4 mirror re-verification
stage: misc
date: 2026-10-17
surface: agent
model: claude-opus-5-5
feature: efmp-302
branch: crew/efmp-302-u04-translate
user: M Yousif Channa
command: crew job efmp-302-u04-translate (translate-unit skill)
labels: ["crew", "efmp-302", "g4", "urdu", "translate-unit"]
links:
  spec: specs/content/efmp-302/content-spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/content/efmp-302/tasks.md
 - history/prompts/efmp-302/0171-efmp302-u4-g4-mirror-reverify.misc.prompt.md
tests:
 - npm run check:content (draft, 13/13 PASS)
 - npm run check:content with temporary translation_status reviewed flip (parity, figures, key_terms PASS; only open G4/G5 rows reported; reverted)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

(Brief: translate EFMP-302 Unit 4 into its complete Urdu mirror at G4 with the translate-unit skill, bound to specs/content/terminology.csv; record the G4 tracker row as the skill says; translation_status stays draft; `npm run check:content` must report nothing origin/main does not; commit, no push, no PR.)

## Response snapshot

The Urdu mirror for Unit 4 already exists on main (G4 at 75b50d22, G5 repairs at 97278986 and 95015e51, raster carriers at 08ac3ff1 and a1638d91). Since the G4 commit, the only change to the English is the five raster `<Figure>` carriers (fig-U4-9 to fig-U4-13), and both locales got them in the same commits. Parity checks: 7/7 files; identical heading-level vectors in every file; 13 figure IDs on each side, with every SVG `src` on `.ur.svg`; Glossary 4/4 with the English `term` attribute kept; PrintHandout 6/6; 35/35 numbered assessment items; MCQ key letters correspond (b/d/a/c/b/d/c/a/b/c to ب/د/الف/ج/ب/د/ج/الف/ب/ج); no English answer-key prose and no em dash in the Urdu. All four `key_terms` match bank rows exactly. No retranslation was needed. Added a re-verification note to the existing G4 tracker row; its status stays ▣ and no new row was appended (the skill forbids it). translation_status stays draft on both sides.

## Outcome

- ✅ Impact: Confirmed that the EFMP-302 U4 Urdu mirror matches the current English; tracker note recorded.
- 🧪 Tests: check:content 13/13 PASS (draft). With the temporary reviewed flip, the only findings were the open G4/G5 rows; the flip was then reverted.
- 📁 Files: specs/content/efmp-302/tasks.md (G4 row note), this PHR.
- 🔁 Next prompts: Owner or qualified reviewer to resolve the G5 escalation G-2026-66 and close G4/G5 under ADR-0019.
- 🧠 Reflection: The crew queued a translate job for a unit whose mirror already existed. The planner should check for an existing UR mirror and an open G4 row before queuing a translate job.

## Handoff (for CEO and agents)

- Shipped / changed: G4 re-verification note on the EFMP-302 Unit 4 tracker row. No content files changed.
- Decisions the team must respect: translation_status stays draft. The G4/G5 rows stay ▣ until signed evidence exists (ADR-0019). The bank was not edited.
- Pending / next owner: G5 escalation G-2026-66 (four post-report residual repairs, unverified) needs a fresh independent g5-reviewer or the owner. The bank row "National Professional Standards for Teachers" is still marked "draft phrase, needs human review at G5". Rendered Urdu inspection was not re-run in this job because crew workers may not build.
- Paperclip issues affected: none (Paperclip paused; crew job efmp-302-u04-translate).

## Evaluation notes (flywheel)

- Failure modes observed: translate job queued for an already-translated unit; fresh worktree lacks git-ignored static/content-status.json (regenerated with build:content-status).
- Graders run and results (PASS/FAIL): check:content PASS 13/13.
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): crew planner skips translate jobs whose G4 row is already ▣ or ✅ and queues a G5 job instead.
