---
id: 20261262
title: Media pacing - office hours, gaps with jitter, hourly and daily caps, Veo budget
stage: green
date: 2026-11-24
surface: agent
model: claude-opus-5-5
feature: 030-media-studio
branch: feat/030-media-pacing
user: M Yousif Channa
command: none
labels: [board-direct, media, crew, safety]
links:
  spec: specs/030-media-studio/spec.md
  ticket: null
  adr: history/adr/0037-unified-media-studio.md
  pr: null
files:
  - scripts/media/pacing.mjs
  - scripts/media/producers/image.mjs
  - scripts/media/producers/gflow-video.mjs
  - scripts/media/producers/nlm.mjs
  - scripts/media/producers/index.mjs
  - scripts/notebook-studio/social-post.mjs
  - scripts/crew/crew.mjs
  - scripts/crew/workers.mjs
  - scripts/crew/media.mjs
  - scripts/crew/social.mjs
  - tests/crew/media-pacing.test.mjs
  - tests/crew/social-stage.test.mjs
  - .claude/skills/media-studio/SKILL.md
  - .claude/skills/studio-media/SKILL.md
  - .claude/skills/studio-teaser/SKILL.md
  - .claude/skills/social-updates/SKILL.md
  - specs/decisions/log.md
tests:
  - node --test tests/crew/*.test.mjs (186 pass, 0 fail; 12 new in media-pacing)
---

## Prompt

finish the 011 tests and open the PR, impose safe and realistic limits on madia creation to avoid the accounts being flagged as misuse

(Plan mode. Owner answers: "200 a day and 50/day when 1000 credits spent until reset"; "9 to 3
office hours". The Spec 011 half is recorded in its own PHR.)

## Response snapshot

Every media guard was reactive (a quota recorded after a provider refused; a credit floor; retake
caps). Nothing spaced requests, and Flow is now reachable 24/7 from davinci.

- `scripts/media/pacing.mjs`: pure `decide()` (media hours 09:00-15:00 PKT, minimum gap plus random
  jitter, hourly and daily caps, Veo credits with a 1,000-credit monthly pool then 50/day until the
  cycle day), a ledger `~/.cache/mega-book/media-pacing.json` (35 days), `pace()` that sleeps a
  short gap or throws `PaceHold`, owner overrides in `~/.config/mega-book/media-limits.json`, and a
  `status | check | record` CLI.
- Hooks: image producers wrapped once in `PRODUCER_FNS` (`paced()`; a hold becomes `QuotaError`
  with its reset); `gflow-video` paces and records credits at submission; `nlm` paces artifact
  creation; `social-post` paces `post` and `postImage` per platform; `produce()` never falls back
  on a `paced` hold (clips would otherwise go to manual.flow); crew launches media stages that
  call outside services only in media hours (`OUTSIDE_SERVICE_STAGES` in workers.mjs); the social
  roundup moves from 18:00 to 13:00 PKT and publishing respects the window; YouTube uploads (MCP)
  are paced by the agent via the CLI, written into the crew briefs and the skills.
- A test caught a real bug: an hourly-cap hold reported a reset earlier than the gap allowed; the
  hold now reports the later of the two.
- D-2026-0100 appended to the decisions log.

## Outcome

- ✅ Impact: automated media use now looks like one person's working day; no burst or overnight traffic to Flow, Gemini, NotebookLM, YouTube or Meta.
- 🧪 Tests: crew suite 186/186 (12 new).
- 📁 Files: pacing module, five producer/poster hooks, crew launch gate and social timing, four skills, decision log.
- 🔁 Next prompts: tune limits from real use (`pacing.mjs status`); set `cycleDay` once the Google AI Pro renewal day is known.
- 🧠 Reflection: putting the pacing inside the producers (not only the crew) means owner-run scripts are paced too.

## Handoff (for CEO and agents)

- Shipped / changed: `scripts/media/pacing.mjs` and its hooks; media stages launch only 09:00-15:00 PKT; social roundup at 13:00 PKT.
- Decisions the team must respect: D-2026-0100. Never bypass `pace()` in a producer; every new media producer or poster must call it. YouTube uploads need `pacing.mjs check` before and `record` after.
- Pending / next owner: owner may set `cycleDay` (Google AI Pro renewal day) and any limit in `~/.config/mega-book/media-limits.json`; defaults assume the 1st.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: hourly hold reset earlier than the gap (fixed); worktree without node_modules made unrelated crew tests fail (environment only).
- Graders run and results (PASS/FAIL): crew node tests PASS.
- Prompt variant (if applicable): none.
- Next experiment (smallest change to try): show `pacing.mjs status` in BOARD.md so held media jobs explain themselves.
