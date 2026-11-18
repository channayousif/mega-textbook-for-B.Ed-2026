---
id: 2480
title: EFMP-301 Unit 4 studio-media pilot through the gates
stage: green
date: 2026-11-09
surface: agent
model: claude-opus-5-5
feature: 029-notebook-studio
branch: feat/029-notebook-studio
user: M Yousif Channa
command: none
labels: [board-direct, notebook-studio, youtube, media-pipeline, pilot]
links:
  spec: specs/029-notebook-studio/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/studio/efmp-301/media-unit-04.json
  - specs/studio/efmp-301/unit-04-mnemonics.md
  - scripts/notebook-studio/media-qa.mjs
  - scripts/notebook-studio/audio-to-video.mjs
  - .claude/skills/studio-media/SKILL.md
tests:
  - QG1 source and encoded on 14 items (all pass after one limiter fix)
  - QG2 transcript checks on 14 items via QA notebook eb70657f
  - QG3 list_videos on 9 private uploads
---

## Prompt

deleted, start the pilot

(earlier in the same thread: YouTube consent, smoke test, playlist mapping
"English podcast = PLLdTwYdZvUFc, Urdu podcast = PLH7WvExVOw8U, EFMP-301 video, English = PLBPGR4jAnhh4, EFMP-301 video, Urdu = PLZVdgN09a2qs")

## Response snapshot

Ran EFMP-301 Unit 4 through the studio-media skill:
- **Re-auth.** NotebookLM cookies had expired. The owner uploaded a cURL export; I extracted its
  cookie header, imported it and deleted the files.
- **Generation.** Reused the five 4.1 files already in `.studio/`. Generated nine new items: the
  4.1 UR video, and EN/UR videos and audio briefs for 4.2 and 4.3. Before that, Gemini drafted
  4.2/4.3 mnemonics, which I checked against the source.
- **QG1.** All 14 passed.
  - The 4.3 EN brief peaked at 0 dBFS after encoding, so I added `alimiter` after `loudnorm`
    and re-encoded it.
  - The brief duration bounds were wrong for the 2-minute prompt and were fixed to 75 s–7 min.
- **QG2.** NotebookLM audio sources give usable transcripts (EN in Latin script, UR in
  Devanagari). Verdicts: 3 pass, 11 pass-with-notes. The notable note is the 4.1 part 2
  overstating the gorilla study. Two of my own notes were wrong (the head-teacher example; "costs
  no money" is in the 4.3 text) and were corrected.
- **Upload.** Nine items uploaded private with playlist, thumbnail and synthetic-media flag. The
  10th upload hit the channel's `uploadLimitExceeded` (unverified channel), so uploading stopped
  for the day as the skill requires.
- **QG3.** Passed for all 9.

## Outcome

- ✅ Impact: 9 of 14 unit 4 items private on YouTube with gates recorded; 5 queued for tomorrow.
- 🧪 Tests: gates as listed; no repo test changes.
- 📁 Files: ledger, mnemonics, qa bounds, limiter, skill note.
- 🔁 Next prompts: owner spot-check of the 7-item sheet; upload remaining 5 after the channel cap resets or verification; publish, place, browser check, commit + PR.
- 🧠 Reflection: verify my own QG2 notes against the text before writing them; two were wrong.

## Handoff (for CEO and agents)

- Shipped / changed: local only. Ledger `specs/studio/efmp-301/media-unit-04.json` holds 9 items at qa3-pass and 5 at qa2-pass (t2-ur-video, t3-en-audio-p1, t3-ur-audio-p1, t3-en-video, t3-ur-video).
- Decisions the team must respect: private first; owner spot-check before public; the channel daily cap is separate from API quota; QA transcripts live in notebook eb70657f (never a generation source).
- Pending / next owner:
  - owner: listen to the sheet, verify the channel (raises the cap, enables podcasts);
  - Claude: upload the remaining 5 and correct the t3-en-audio-p1 QG2 note to pass on upload (costs-no-money is in the text), then publish/place.
- Paperclip issues affected: none.

## Evaluation notes (flywheel)

- Failure modes observed: loudnorm peak overshoot; prompt/gate duration mismatch; channel upload cap; my own false-positive QG2 notes.
- Graders run and results (PASS/FAIL): QG1 14/14 PASS (one after fix); QG2 14 recorded; QG3 9/9 PASS.
- Prompt variant (if applicable): audio.md v2, video.md v1
- Next experiment (smallest change to try): ask Gemini for an Urdu-script transcript of UR audio to check wording, not just meaning.
