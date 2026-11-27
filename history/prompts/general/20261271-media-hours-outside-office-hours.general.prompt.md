---
id: 20261271
title: Media hours corrected to every hour except 09:00-15:00 PKT
stage: general
date: 2026-11-25
surface: agent
model: claude-opus-5-5
feature: none
branch: fix/media-hours-outside-office
user: M Yousif Channa
command: none
labels: [board-direct, crew, media-studio, pacing]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0038-crew-media-producer-lanes-and-per-producer-parallel-generation.md
  pr: null
files:
  - scripts/media/pacing.mjs
  - scripts/crew/social.mjs
  - scripts/crew/crew.mjs
  - scripts/media/producers/image.mjs
  - scripts/notebook-studio/social-post.mjs
  - tests/crew/media-pacing.test.mjs
  - tests/crew/social-stage.test.mjs
  - .claude/skills/media-studio/SKILL.md
  - .claude/skills/social-updates/SKILL.md
  - history/adr/0038-crew-media-producer-lanes-and-per-producer-parallel-generation.md
  - specs/decisions/log.md (new D-2026-0101; D-2026-0100 status marked amended)
  - history/prompts/general/20261271-media-hours-outside-office-hours.general.prompt.md
tests:
  - node --test tests/crew/*.test.mjs (200 pass)
  - vitest tests/unit/media-producers, social-updates, media-isolation (35 pass, under scripts/heavy.sh)
  - npm run check:docs-sync (in sync)
---

## Prompt

what are the media hours, I asked to set allthe hours except 9am to 3pm.

Correct D-2026-0100 in the decisions log

## Response snapshot

The media hours were 09:00-15:00 PKT only: PHR 20261262 recorded the owner's answer as "9 to 3 office hours" and D-2026-0100 built it as the media window. Corrected to the owner's meaning: every hour except 09:00-15:00 (15:00-09:00 PKT, across midnight). `withinHours` now supports a window that wraps midnight (start > end; start == end is 24 hours); `nextOpen` already returns today's or tomorrow's start; daily caps reset at 00:00 PKT, which is inside the window. The social roundup is due from 15:00 PKT. Skills, comments, tests and ADR-0038's context updated. On the follow-up, appended D-2026-0101 to the decisions log (the correction) and marked D-2026-0100's status as amended; safe for review evidence because the log is not in any input manifest (reports bind only the rulings they cite) and no report cites D-2026-0100.

## Outcome

- ✅ Impact: media jobs (images, clips, NotebookLM, uploads, social posts) run afternoons, evenings and nights, never in the owner's office hours; 18 hours a day instead of 6.
- 🧪 Tests: 200 crew tests and 35 media unit tests pass; docs-sync passes.
- 📁 Files: see files.
- 🔁 Next prompts: merge PR #793; watch the first media launches after 15:00 PKT.
- 🧠 Reflection: "9 to 3 office hours" was ambiguous (work in, or keep out of, office hours); the plan should have restated it as "media runs only 09:00-15:00" for the owner to confirm.

## Handoff (for CEO and agents)

- Shipped / changed: media window 15:00-09:00 PKT (pacing DEFAULTS and wrap-around support); social roundup from 15:00. Deploys when merged.
- Decisions the team must respect: D-2026-0101: no automated media call between 09:00 and 15:00 PKT (owner, 2026-11-25); the D-2026-0100 caps and gaps are unchanged.
- Pending / next owner: owner merges PR #793 (code and D-2026-0101 together).
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: an owner answer recorded in an ambiguous form was built the opposite way.
- Graders run and results (PASS/FAIL): crew tests PASS; media unit tests PASS; docs-sync PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): restate any time window as "runs from X to Y" in the plan before building.
