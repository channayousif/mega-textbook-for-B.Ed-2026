---
id: 20261274
title: GICP-400 Urdu teaser script
stage: green
date: 2026-11-25
surface: agent
model: claude-opus-5-5
feature: 030-media-studio
branch: crew/gicp-400-u00-teaser_script
user: M Yousif Channa
command: none
labels: [claude_crew, media-studio, studio-teaser]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - specs/studio/teasers/gicp-400.json
  - specs/studio/teasers/media-teasers.json
tests:
  - node scripts/notebook-studio/teaser.mjs check gicp-400 (QG0 pass)
  - npm run check:content (pass)
---

## Prompt

Read .crew/brief.md in the current directory and carry it out completely. It is your whole task.

## Response snapshot

Wrote the Urdu teaser script for GICP-400 Ideology and Constitution of Pakistan on recipe
teaser@3: a woman presenter in a navy blue shalwar kameez and white dupatta speaks to camera in
shots 1 and 5 (secondary classroom, school corridor), an unseen woman narrator voices shots 2-4
(dolly, tracking, crane) over a teacher-training seminar room, student-teacher group work and a
verandah class taking fair turns. Every Urdu line is 13-17 words. Facts come only from the course
overview and catalog/courses.json: founding ideas and ideological basis, the history of
constitutional development, salient features of the 1973 Constitution (spoken as words so Veo
reads it cleanly), government, citizens' fundamental rights and duties, and fair treatment, civic
responsibility and national integration in school life. No unit count is claimed. Because the
course's topic invites them, the visual style bans maps, globes, flags, emblems, monuments,
portraits, banners and readable text explicitly (the older GPKS-402 script shows a flag; this one
does not). Added end card, YouTube title, keywords and an Urdu course_summary. QG0 passed;
planned `gicp-400-ur` and advanced it to `scripted` with the file's sha256 and the QG0 gate. No
generator was called and no approval was recorded.

## Outcome

- ✅ Impact: gicp-400-ur waits at `scripted` for the owner's `crew approve-script gicp-400-ur`.
- 🧪 Tests: QG0 pass; check:content pass (14 gates).
- 📁 Files: the script and its one ledger item.
- 🔁 Next prompts: owner approval, then the teaser_clips stage.
- 🧠 Reflection: the GICP-400 overview lists its five objectives under "## Course objectives", which `parseOverview` does not read, so QG0 counts 0 outcomes and rejected the `objectives` list; omitted, as for EFPG-401 and EFMP-406/407.

## Handoff (for CEO and agents)

- Shipped / changed: specs/studio/teasers/gicp-400.json (teaser@3, ur only) and the gicp-400-ur ledger item at `scripted`.
- Decisions the team must respect: no credits before the owner approves the script; editing the script after approval reopens it; no flags, emblems or maps in any GICP-400 shot.
- Pending / next owner: owner reviews the Urdu lines and approves; `objectives` (five in the overview) are omitted until `parseOverview` (scripts/notebook-studio/describe.mjs) accepts the "Course objectives" heading (metadata only; adding them later does not reopen approval).
- Issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: overview heading variant breaks the objectives count in QG0 (fourth course).
- Graders run and results (PASS/FAIL): QG0 PASS, check:content PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): let parseOverview accept "Learning outcomes" and "Course objectives" headings.
