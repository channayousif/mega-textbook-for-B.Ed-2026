# Slide deck (v4-brand, owner choice 2026-11-09: option B wins for decks)
Options: --format presenter_slides --length default

v3 -> v4: v3 (brand-steered) won the bake-off but still risks image-baked typos and contains em
dashes. v4 gives Gemini the verified slide script ({SCRIPT}, from the Claude-checked content JSON)
and asks it to render that text exactly, so it draws rather than writes. After generation every
slide is proofread against the script and flagged slides are fixed with `nlm slides revise`
(max two rounds).

```focus
Render exactly this 10-slide script for a teacher educator teaching B.Ed students in Pakistan; use the headings and text exactly as written, word for word, with no added sentences: {SCRIPT} Spelling must match the script exactly. Use plain hyphens, never long dashes. Visual design: warm paper #f8f5ef background, deep teal #123e43 headings, amber #e5a333 accents only for the key idea on each slide, clean rounded sans-serif type, generous white space, few words on screen. Every drawing or icon must explain the slide's idea; no decoration, no stock photos, no dark backgrounds. Classrooms shown are Pakistani government schools: benches, about sixty pupils in uniform, one blackboard, ceiling fans.
```
