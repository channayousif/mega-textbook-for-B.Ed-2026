---
id: 0889
title: Pronunciation lexicon, Urdu first
stage: misc
date: 2026-10-27
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "vs-003", "t015", "pronunciation"]
links:
  spec: video-studio/specs/003-urdu-voice-benchmark/spec.md
  ticket: null
  adr: video-studio/history/adr/0011-kaggle-media-runner.md
  pr: https://github.com/channayousif/mega-textbook-for-B.Ed-2026/pull/336
files:
 - video-studio/brand/brand-bible.yaml (pronunciation_lexicon: 32 entries)
 - video-studio/.claude/skills/urdu-script-writer/SKILL.md (gloss rule, Devanagari handoff)
 - video-studio/.claude/agents/urdu-language-reviewer.md (gloss check)
 - video-studio/specs/001-urdu-shorts-pipeline/tasks.md (T015 done)
 - video-studio/specs/003-urdu-voice-benchmark/eval-set.json (round 7), eval-set-round6.json (renamed)
 - video-studio/specs/003-urdu-voice-benchmark/results-round7-summary.json, results-round7-review.csv (new)
 - video-studio/specs/003-urdu-voice-benchmark/spec.md
 - video-studio/kaggle/voice_bench.py (eval summary and reel skip a character with no clips)
tests:
 - voice:bench all --eval run 1: clips made, summary crashed (no Bilal lines, empty array); fixed
 - run 2: 87 clips hash-verified; Whisper and ECAPA both OK on Kaggle (centroid 0.94 mean, 0.89 min)
 - every lexicon term_ur/en checked against specs/content/terminology.csv
 - npm test 12/12; tsc --noEmit; check:no-media; zero em dashes
---

## Prompt

urdu first, yes build

## Response snapshot

Built `pronunciation_lexicon` in the brand bible from the term bank: 29 glossed entries (Urdu term,
English, Devanagari, English in Devanagari, risk, test evidence) plus طالب علم, تحریکِ علی گڑھ and
STEDA. Verified each glossed entry in a Kaggle round (Ustani carrier sentence, 3 seeds): 21 low,
6 medium, 2 high risk; every English gloss heard clearly. Script-writer and Urdu reviewer now apply
the owner's rule: first use says "<Urdu>، یعنی <English>،".

## Outcome

- Impact: T015 done; scripts now gloss tricky terms Urdu first, and the TTS handoff has a tested Devanagari spelling per term.
- Tests: see `tests`.
- Files: see `files`. No media in git.
- Next prompts: owner listens to `eval/reel-ustani.wav` (29 terms in order); Chatterbox lock (V005) with the lexicon.
- Reflection: English glosses must follow the term bank (Self-Regulation, Code of Ethical Conduct), not ad hoc translations.

## Handoff (for CEO and agents)

- Shipped / changed: brand pronunciation lexicon; script-writer and reviewer gloss rule. PR #336.
- Decisions to respect: owner rule 2026-10-27: glossed terms are spoken Urdu first, then یعنی and the English, on first use per episode; captions keep the English in Latin letters; Devanagari joins izafat. Lexicon `term`/`en` must match `specs/content/terminology.csv`.
- Pending: owner listening check of the lexicon reel; V005 voice lock (owner only); corpus owner to check the term-bank spelling تحریکِ الی گڑھ (likely علی).
- Paperclip issues affected: none.
