---
id: 0887
title: Round 5 Chatterbox stress test
stage: misc
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "vs-003", "kaggle", "evaluation"]
links:
  spec: video-studio/specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: video-studio/history/adr/0011-kaggle-media-runner.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/336
files:
 - video-studio/specs/003-urdu-voice-benchmark/eval-set.json (new)
 - video-studio/kaggle/voice_bench.py (eval mode: seeds x segments, style arm, Whisper and ECAPA screen, reels, review.csv)
 - video-studio/scripts/voice-bench.ts (--eval flag; eval fetch)
 - video-studio/specs/003-urdu-voice-benchmark/results-round5-summary.json (new)
 - video-studio/specs/003-urdu-voice-benchmark/results-round5-review.csv (new)
 - video-studio/specs/003-urdu-voice-benchmark/spec.md
tests:
 - voice:bench all --eval run 1 (13.9 min): clips generated, then speechbrain failed (use_auth_token rejected by huggingface_hub 1.x); no output kept
 - run 2 (17.5 min, eval 926 s): 102 clips hash-verified; Whisper screen OK; ECAPA failed again (fallback kept the run), computed afterwards on the server CPU under flock with huggingface_hub<0.26
 - local helper test (norm_ur, term_heard, pauses); tsc --noEmit; npm test 12/12; check:no-media
---

## Prompt

explore chatterbox:

The next evaluation should focus on four things:
1. Voice consistency: Can the same teacher or animated character maintain its voice across 20–30 audio segments?
2. Urdu pronunciation: How well does it pronounce educational terminology, including Arabic, Persian, and English-derived words?
3. Expressiveness: Can you distinguish a teacher's explanatory tone from a student's curious or questioning tone?
4. Generation reliability: How often must you regenerate audio due to mispronunciation, skipped words, or unnatural pauses?

## Response snapshot

Built an eval mode for the Kaggle job: 30 lines (20 Ustani, 10 Bilal) carrying term-bank vocabulary
(Arabic, Persian izafat, English loans), each voiced with 3 seeds by chatterbox-hi with the owner's two
voices; a style arm (Ustani default vs emphatic, Bilal default vs curious); a screen per clip (Whisper
large-v3 round trip: CER, coverage, missed terms; longest pause; pace; ECAPA similarity); reels per
character and a review CSV. Findings recorded in spec.md round 5. Listening folder for the owner at
`$MEDIA_ROOT/voice-benchmark/eval/listen/` (2 reels, 10 pronunciation suspects, 10 style pairs).

## Outcome

- Impact: Chatterbox holds the voice across 30 segments and never skipped words; pronunciation problems are systematic and fixable in the Devanagari spelling.
- Tests: see `tests`.
- Files: see `files`. No media in git.
- Next prompts: owner listens to `listen/`; then a spelling-fix round (joined izafat, nuqta reinforcement, علی گڑھ) re-tested on the same lines.
- Reflection: one dependency mismatch (speechbrain vs huggingface_hub 1.x) cost a full GPU run; optional measures must never sink a run.

## Handoff (for CEO and agents)

- Shipped / changed: voice:bench --eval, eval-set.json, round 5 results. PR #336.
- Decisions the team must respect: pronunciation fixes go into the Devanagari spelling (a lexicon), not into regenerating takes; screen flags are for listening, not verdicts. Owner voices remain test-only; no voice is locked.
- Pending / next owner: owner listening verdict on reels, suspects and style pairs; agent: spelling-fix round.
- Paperclip issues affected: none (Paperclip retired).

## Evaluation notes (flywheel)

- Failure modes observed: speechbrain 1.0.3 passes use_auth_token, rejected by huggingface_hub 1.x even for a local source; patched by wrapping hf_hub_download.
- Graders run and results (PASS/FAIL): Kaggle hash verification PASS; screen ran.
- Prompt variant (if applicable): none
- Next experiment (smallest change to try): re-voice the flagged lines with joined izafat (तालिबे इल्म) and compare Whisper term hits.
