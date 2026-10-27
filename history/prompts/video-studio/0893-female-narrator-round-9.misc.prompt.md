---
id: 0893
title: Female narrator recording, round 9
stage: misc
date: 2026-10-28
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "vs-003", "round-9", "consent", "pi-08"]
links:
  spec: video-studio/specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: video-studio/history/adr/0012-bilal-voice-owner-recording.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/336
files:
 - video-studio/specs/003-urdu-voice-benchmark/candidates.json (ref ustani-rec1)
 - video-studio/specs/003-urdu-voice-benchmark/eval-set.json (round 9), eval-set-round8.json (renamed)
 - video-studio/specs/003-urdu-voice-benchmark/results-round9-summary.json, results-round9-review.csv (new)
 - video-studio/specs/003-urdu-voice-benchmark/spec.md
 - $MEDIA_ROOT/consents/2026-10-narrator-02.md (not in git; SHA-256 47d2ea357c823eb447f1e4e66f748cb4c171dfdd5d820771fb21b708da3d4d0d)
tests:
 - local: format, loudness, noise floor, pitch, ECAPA against the owner and the locked Ustani
 - voice:bench all --eval on Kaggle: 120 clips, ok in 1160 s
---

## Prompt

added female voice /home/a2ahs/video-studio-media/voice-benchmark/owner-recordings/anna.wav it is self recorded and i have consent for use

(follow-ups in the same exchange: "i have uploaded the correct file /home/a2ahs/video-studio-media/voice-benchmark/owner-recordings/Anna_ok.wav"; "ok, tell me when round 9 is done")

## Response snapshot

The first file was byte-identical to the owner's male take bilal-rec-3.wav, so evaluation stopped
until the correct file arrived (the duplicate was later deleted). Anna_ok.wav is clean, female and
a different speaker from the owner. Asked the consent scope (Kaggle agreed, all platforms, promo
yes, published videos stay up on withdrawal, verbal only) and recorded `narrator-02`. Round 9
cloned 20 Ustani explanations with her voice and the locked ElevenLabs voice: equal consistency
(0.918 vs 0.922), equal CER, fewer term flags for her voice.

## Outcome

- Impact: a publishable Ustani voice candidate with consent, matching the locked voice's quality.
- Tests: see `tests`.
- Files: see `files`. No media, names or consent records in git.
- Next prompts: owner listens to the two reels and decides on the switch (VS-ADR-0013 and card change); a written note from the narrator.
- Reflection: hash every incoming file against the existing ones before evaluating; the first upload was a duplicate.

## Handoff (for CEO and agents)

- Shipped / changed: round 9 results. PR #336.
- Decisions to respect: the narrator is cited only as `narrator-02`, never by name; her consent is verbal and owner-attested; Ustani's card stays on the ElevenLabs reference until the owner decides.
- Pending: owner decision on Ustani; written consent from the narrator (owner); V006, V007.
- Paperclip issues affected: none.
