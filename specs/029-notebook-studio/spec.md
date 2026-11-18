# Feature 029: Gemini Notebook Studio

**Status:** pilot (EFMP-301 Unit 4, Topic 4.1) · **Owner decisions:** 2026-11-09 (board-direct session)

## Problem
Topic pages are text and schematic figures only. Students and teacher educators asked for quicker
ways in: short audio, a revision poster, a concept map they can test themselves on, printable
briefs, and a teaching deck. Gemini Notebook (formerly NotebookLM) can generate all of these from
our own topic text.

## What ships
A **Study Studio** panel under each topic page, driven by reviewed data, never by MDX edits:

| Tab | Source | Shown to |
|---|---|---|
| Poster | Gemini writes the content from the topic; Claude checks it; our brand template draws it (real text, both themes) | everyone |
| Mind map | Gemini mind map, label-corrected by Claude; Explore mode and Recall mode (hide branches, reveal, tick) | everyone |
| Listen | Audio brief (about 2-3 min, built on memory hooks), then optional "Go deeper" parts revealed one at a time | everyone (once hosted) |
| Practicum brief | Gemini report, cleaned | everyone |
| Study guide | Gemini study guide with its answer key and rubric sections removed | everyone |
| Slides | Brand-steered Gemini deck drawn from a checked script, proofread slide by slide | verified teachers (once hosted) |

Urdu uses the owner's register v2: simple everyday Urdu that keeps English technical terms.

## Rules
- Generation is owner-run, local and serial on this host (`nlm`, community MCP), never in CI or the crew.
- Every artifact is checked against the topic before it is placed; nothing is accepted because it rendered.
- Answer keys never reach a Studio asset. Quiz items go only to the RLS-protected `quiz_items` table as teacher-review drafts.
- Studio data lives in `specs/studio/` and `static/studio/`, outside every review-bound path, so no G2/G3/G5 evidence goes stale.

## Out of scope here
The Urdu corpus register change (separate proposal), audio/video/slide hosting (owner to choose a channel), and rollout beyond the pilot topic.
