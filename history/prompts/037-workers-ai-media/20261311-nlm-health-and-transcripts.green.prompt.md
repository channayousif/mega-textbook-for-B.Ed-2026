---
id: 20261311
title: NotebookLM login health and Workers AI Study Studio transcripts
stage: green
date: 2026-11-28
surface: agent
model: claude-opus-5-5
feature: 037-workers-ai-media
branch: feat/nlm-health-and-drafts
user: M Yousif Channa
command: board-direct session
labels: ["board-direct", "media-studio", "crew"]
links:
  spec: specs/037-workers-ai-media/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - scripts/media/nlm-health.mjs
 - scripts/media/transcribe.mjs
 - scripts/crew/crew.mjs
 - scripts/crew/media.mjs
 - scripts/crew/tick.sh
 - tests/unit/media-health-transcribe.test.mjs
 - .claude/skills/media-studio/SKILL.md
 - .claude/skills/studio-media/SKILL.md
 - specs/035-owner-decisions/tasks.md
tests:
 - node --test tests/crew/*.test.mjs (227 pass)
 - scripts/heavy.sh npm test (650 pass)
 - live: both nlm profiles found expired and refreshed in 16 s; 7.5-minute Urdu brief transcribed on Workers AI in 60 s
---

## Prompt

what next

ok with 3 also

## Response snapshot

Recommended G3 sign-offs (owner), an nlm login health check, Workers AI drafts in the pipeline and
housekeeping. The stale pr949 review job was already retired; #934 is met (7 web decisions applied).
Item 3 was aimed where it pays: Study Studio QG2 transcripts (NotebookLM uploads or YouTube captions
before, Devanagari for Urdu once) now come from `scripts/media/transcribe.mjs` (Workers AI whisper in
2-minute chunks, local whisper fallback); YouTube descriptions are already deterministic and captions
are written by LLM workers, so drafts there add little. `scripts/media/nlm-health.mjs` checks both nlm
profiles every two hours from 14:00 PKT through media hours, refreshes them from the davinci Chromes,
keeps a failing profile's notebook lane idle and notifies the owner only when a refresh fails. A first
check-only run sent the owner two notifications before that rule existed.

## Outcome

- ✅ Impact: Study Studio jobs no longer fail on silently expired NotebookLM logins (they last about 5 hours); Urdu transcripts in Urdu script without NotebookLM.
- 🧪 Tests: crew 227, vitest 650 (6 new).
- 📁 Files: listed above.
- 🔁 Next prompts: owner G3 sign-offs; watch nlm-health.json after the first media night.
- 🧠 Reflection: test a notifier with a fake before a live check-only run.

## Handoff (for CEO and agents)

- Shipped / changed: nlm-health.mjs in tick.sh; notebook lanes honour it; transcribe.mjs as the first QG2 transcript route; #934 closed.
- Decisions the team must respect: NotebookLM sessions are short-lived; refresh from davinci, not by asking the owner, unless the refresh fails.
- Pending / next owner: owner G3 sign-offs (54 units).
- Paperclip issues affected: none; GitHub #934.

## Evaluation notes (flywheel)

- Failure modes observed: unescaped backticks in a brief template broke media.mjs (caught by crew tests); nlm exits 0 on an auth error.
- Graders run and results (PASS/FAIL): crew PASS, vitest PASS.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): refresh nlm just before each studio_media launch instead of on a timer.
