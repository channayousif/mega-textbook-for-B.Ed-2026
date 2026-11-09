<!-- Feature 029 pilot review log, copied from the local .studio/ working folder. Artifact IDs refer to notebook 65df3479-3f23-44c2-9f27-2e3a233d7530. -->
# Pilot review - EFMP-301 4.1 EN (2026-11-09, Claude; owner spot-check pending for audio/video)

| Artifact | Prompt | Verdict | Notes |
|---|---|---|---|
| mind map | mindmap v1 | pass | 40 nodes, mirrors topic structure, nothing outside source |
| report (practicum brief) | report v1 | pass after fix | accurate, no answers; contains em dashes -> ingest must replace |
| infographic v1 | infographic v1 | reject | mislabelled cell diagram ("Cell plant", "Cell Wall" x2); Western classrooms, laptops |
| infographic v2 | infographic v2 | pass with notes | Pakistani classroom correct; typo "Listen to to"; duplicated bubble text; filler board text; watermark |
| slides (14, presenter) | slides v1 | pass with notes | every claim grounded (gorilla study, head teacher, chess all in source); em dashes in image text; odd axis labels slide 7; watermark |
| audio (deep dive, ~15 min) | audio v1 | owner spot-check | cannot be reviewed by Claude |
| video (explainer, classic, 36.8 MB MP4) | video v1 | owner spot-check | no ffmpeg on host; Claude cannot review frames |

Cost: full six-format set settled at ~28.5% of 5-h window (38% shown while queued), 1.4% weekly; one infographic regen = ~1%.

# Urdu attempt - EFMP-301 4.1 UR (2026-11-09, Claude; Urdu-reader review required before placing)

| Artifact | Prompt | Verdict | Notes |
|---|---|---|---|
| mind map | mindmap v1 | translate ourselves | tool has no language option; output English even from UR source; structure correct -> translate labels with terminology bank |
| report (practicum brief) | report v1 + UR suffix | pass with notes | source Urdu terms used; ریسیپٹر, ادراکی تفاوت not in source; no em dashes |
| infographic | infographic v2 + UR suffix | pass with notes, Urdu reviewer required | legible Nastaliq; intro paragraph truncated ("تھک۔", repeated "کی"); sensation box word order jumbled; best classroom fit so far |
| slides (14) | slides v1 + UR suffix | revise -> slides v2 | Urdu text clean and grounded; slide 2 Western smart-board classroom, slide 4 Western pupil |

Cost: UR set of 4 (no audio/video) ~ 12% of 5-h window, ~0.5% weekly.

# Round 2 - quiz trial, EFMP-301 4.1 EN (2026-11-09, Claude)

10 items generated (quiz v1). Accuracy 10/10, one correct option each, scenario-led, Pakistani context.
Usable after filtering: **6/10** (Q1, Q2, Q5, Q8, Q9, Q10).
- Dropped as bank/self-check duplicates: Q3 (= MCQ 2 "copy while I explain"; also CYU 3), Q4 (= RR "it's obvious, look"; CYU 5),
  Q6 (= MCQ gorilla), Q7 (= ERQ 1 Miss Hina timetable). Cause: Gemini cannot see unit-assessment.mdx.
- Fix on import: correct option is ALWAYS option 1 -> shuffle; correct options are longer than distractors -> length cue, flag for teacher edit;
  Q2 hint has an em dash -> replace.
- Prompt fix (quiz v2): pass the unit's MCQ/RR/ERQ stems and the topic's check-your-understanding stems (never answers) as an explicit
  "do not ask about these" list in the focus.
Verdict: quizzes are viable as **teacher-reviewed draft items** in quiz_items; not auto-publish.

# Round 2 - Study Guide, EFMP-301 4.1 EN (2026-11-09, Claude)
- 2368 words; sections 1, 2, 5 (concepts, Miss Hina case, factors table, audit protocol, glossary) accurate and grounded.
- **Sections 3-4 contain "Answer Key & Explanations" and essay rubrics -> forbidden in public pages (answer-key rule).**
  Post-processor must strip any H2/H3 matching /practice question|answer key|essay|rubric|quiz/i (and everything under it);
  check-studio-manifest must fail a placed report that still matches. 2 em dashes -> replace.

# Round 2 - decks and audio (2026-11-09)

Owner rulings: posters = option A (brand template); decks = option B (Gemini, brand-steered); audio model =
"Winning Student Attention Through Lesson Structure" = Part 1 brief (audio v2, 85dfd5a1); Urdu audio to explore.

| Deck | Typos | Em dashes | Other | Verdict |
|---|---|---|---|---|
| v3-brand (96c6f831) | 0 / 10 slides | slides 2, 6 | slide 7 placeholder labels "NAME TAG 1/2/3" | good, needs revise |
| v4-brand + exact script (e340e7c5) | **0 / 10** | **none** | slide 6 dropped the source's قل example for generic squiggles | **clean; use v4 approach** |

Typo control that worked: feed Gemini the Claude-checked content JSON as an exact script (slides v4), then proofread every
slide image against it; `nlm slides revise <id> --slide 'N <instruction>'` regenerates only flagged slides (max two rounds).
PPTX export is one flat image per slide (no editable text), so text fixes must go through revise. No OCR on host
(tesseract absent; installing needs sudo) -> proofreading is a vision pass by Claude/crew agent.

Urdu audio brief (e2d116b3, ~3.6 MB, ur, new register, mnemonics in English): **owner: "excellent" (2026-11-09)** -> Urdu audio briefs approved.
