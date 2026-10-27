---
id: 0888
title: Round 6 bilingual terms and respelling
stage: misc
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "vs-003", "kaggle", "pronunciation"]
links:
  spec: video-studio/specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: video-studio/history/adr/0011-kaggle-media-runner.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/336
files:
 - video-studio/specs/003-urdu-voice-benchmark/eval-set.json (round 6: 9 lines x 4 variants)
 - video-studio/specs/003-urdu-voice-benchmark/eval-set-round5.json (renamed from eval-set.json)
 - video-studio/specs/003-urdu-voice-benchmark/results-round6-summary.json (new)
 - video-studio/specs/003-urdu-voice-benchmark/results-round6-review.csv (new)
 - video-studio/specs/003-urdu-voice-benchmark/spec.md
 - video-studio/kaggle/voice_bench.py (ECAPA custom.py 404 fix; docstring)
 - video-studio/scripts/voice-bench.ts (usage comment)
tests:
 - voice:bench all --eval (22.0 min, eval 1180 s): 110 clips hash-verified; Whisper screen OK; ECAPA failed (custom.py 404)
 - ECAPA wrapper verified locally (speechbrain 1.0.3, huggingface_hub 2.3.0, torch 2.6 CPU, under flock): model loads, 192-dim embedding
---

## Prompt

i have listened all clips, there are few problems with pronounciations: we should say the terms in english as well as translated in urdu, in this way we can reinforce the comprehension of the trickey terms as well as improving the pronounciation by modifying the spellings. 
2. you are right about Expressiveness, similar.

## Response snapshot

Round 6 on the 9 round 5 problem lines, each in 4 variants (respelled; Urdu then یعنی English in
Devanagari; the same in Latin script; English first), 3 seeds. Joined izafat removes the separate
"اے" (12/27 to 0/27); spaced अली गढ़ fixes علی گڑھ; English glosses are always clear (script makes
no difference); z-in-cluster and q sounds are not fixable by spelling, so the gloss carries them.
Listening folder `$MEDIA_ROOT/voice-benchmark/eval/listen/<line>/` (round 5 take plus 4 variants).
Round 5 media moved to `$MEDIA_ROOT/voice-benchmark/eval-round5/`.

## Outcome

- Impact: owner direction recorded: tricky terms are voiced in Urdu and English; joined-izafat spelling is the default for Devanagari scripts.
- Tests: see `tests`.
- Files: see `files`. No media in git.
- Next prompts: owner picks the gloss order (Urdu first or English first) by ear; then a pronunciation lexicon (Urdu term, Devanagari spelling, English gloss) for the script writer.
- Reflection: check Whisper's Latin output before trusting coverage flags on mixed-language lines.

## Handoff (for CEO and agents)

- Shipped / changed: round 6 eval set and results; ECAPA fix for the next Kaggle eval. PR #336.
- Decisions to respect: owner direction 2026-10-27: Urdu voice scripts say tricky terms in Urdu and English (یعنی); Devanagari for Chatterbox joins izafat (तालिबे इल्म, not तालिब-ए-इल्म). Owner voices remain test-only (PI-08); V005 lock is owner-only.
- Pending: owner chooses gloss order and gloss script; lexicon file; Chatterbox lock decision. Owner owns all three.
- Paperclip issues affected: none (Paperclip retired; crew drives corpus work).
