---
id: 0898
title: Bilal energy round and cast asset prompts
stage: misc
date: 2026-10-29
surface: agent
model: claude-opus-5-5
feature: 027-video-studio
branch: feature/video-studio-cast
user: M Yousif Channa
command: none
labels: ["board-direct", "video-studio", "voice", "vs-003", "round-10", "cast", "t004b", "t012", "remotion-licence"]
links:
  spec: video-studio/specs/001-urdu-shorts-pipeline/tasks.md
  ticket: null
  adr: null
  pr: null
files:
 - video-studio/brand/handoff-cast.md (new)
 - video-studio/brand/characters/ustani-farzana.md, brand/characters/shagird-bilal.md (prompt colours fixed, pointer to the handoff)
 - video-studio/specs/001-urdu-shorts-pipeline/tasks.md (T004b, T012, T013b, T014 done)
 - video-studio/specs/003-urdu-voice-benchmark/eval-set.json (round 10), eval-set-v007.json (renamed)
 - video-studio/specs/003-urdu-voice-benchmark/results-round10-summary.json, results-round10-review.csv (new)
 - video-studio/specs/003-urdu-voice-benchmark/spec.md
tests:
 - Kaggle voice:bench --eval round 10: 24 clips, transcript and speaker checks
 - local pYIN pitch movement per style; four reels levelled to -20 LUFS, peaks below 0 dBFS
---

## Prompt

1. Male voice feels shallow and dull, it needs to be enhanced and energised. 
2. confirmed it.
3. ok, you can write prompts for me to generate the required assets with google flow, nonobanana or veo 3, i have access to them.

## Response snapshot

1. Round 10 on Kaggle tried three livelier Chatterbox styles for Bilal; "max" drifts, the others are
accurate but lift pitch movement only modestly (3.34 to 3.81 semitones SD), because Chatterbox copies
the reference's delivery. Built four equal-loudness reels (current; lively; lively with tone shaping
for body and presence; the same 6% faster) for the owner to choose, and recommended a livelier
re-recorded reference as the stronger fix.
2. Recorded T004b: the owner confirmed the organisation qualifies for Remotion's free licence.
3. Wrote `brand/handoff-cast.md`: Nano Banana prompts for one master per character and edits of it
(blink, four mouth shapes, four gestures, reference sheet) on a magenta background so Claude can cut
aligned parts by pixel difference; three sets; optional Veo 3 / Flow B-roll; file names and rights
notes. Fixed the old sheet prompts that said deep blue and amber.

## Outcome

- Impact: the owner can generate the cast and sets now; the Bilal voice fix is ready for a listen.
- Tests: see `tests`.
- Files: see `files`. No media in git.
- Next prompts: owner picks a Bilal reel (or records a livelier reference); owner generates the cast images; Claude cuts layers (T013) and builds the puppet (T041).
- Reflection: exaggeration alone barely moves this clone; test the reference recording first next time.

## Handoff (for CEO and agents)

- Shipped / changed: cast handoff prompts; Bilal round 10 results; T004b, T012, T013b, T014 closed.
- Decisions to respect: the owner confirmed Remotion free-licence eligibility (2026-10-29); puppet parts come from edits of one master image on magenta #FF00FF; generated media go to `$MEDIA_ROOT/brand-assets/inbox/`, never the repo.
- Pending: owner's Bilal choice, then an ADR for the card's settings (Claude); owner generates images; T013 layer cutting (Claude).
- Paperclip issues affected: none.
