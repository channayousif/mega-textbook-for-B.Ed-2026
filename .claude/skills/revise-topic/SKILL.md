---
name: revise-topic
description: >-
  Turn a curriculum-owner console feedback export (Spec 010, Story 5) into a minimal,
  traceable revision of the named topic/unit files and their Urdu translations. Use when
  asked to "revise this unit from feedback", "propose a revision from the export", "apply
  the feedback queue export", or "action the curriculum-owner feedback for <course> unit
  N". Reads each named file, locates the quoted passage verbatim, proposes the smallest
  edit that addresses the comment, mirrors it into the file's translation, then runs the
  full content-check set before presenting the change set for review. Never changes
  content_feedback status itself - that stays an explicit, separate owner action.
---

## Independent review handoff

For G3/G5, hand a frozen bundle to a fresh `g3-reviewer` or `g5-reviewer` session using
`.claude/skills/review-unit/SKILL.md`. Do not provide the author's private reasoning or ask
for approval. Apply findings in a separate author pass and request fresh review after edits.
Review reports are advisory until the reviewer has signed qualification and scope activation
under ADR-0019. Agent tracker rows require accepted signed evidence; never reuse YM initials
for agent work. Existing human review remains available. See the Feature 014 evidence contract.


# revise-topic

Closes the loop `admin/feedback-queue.tsx`'s "Export unit feedback" control opens (Spec 010
Story 5, FR-022-025): read the export -> locate each quoted passage verbatim in its named
file -> propose a minimal edit addressing the comment -> mirror the edit into the file's
translation -> run the full content-check set -> present the change set for review.

**One skill, no sub-agent.** Each item needs the harness's own file read/edit tools and the
"run a gate, read the failure, fix, re-run" cycle in the main loop - the same posture
`author-unit` takes.

## Inputs you need before starting

- The export document itself (pasted, or a path to a saved `.md` file) - the Markdown the
  owner downloaded/copied from the triage queue's "Export unit feedback" control. Its exact
  shape is `references/export-format.md`.
- Nothing else. The export is self-contained: repo-relative paths, quoted passages, and
  comments - no page body text (FR-022), no database access, no course_code/unit_no beyond
  what the export's own headings already state.

## What this skill does NOT do

- It never reads or writes `content_feedback` - it has no database access at all. Closing
  the loop (moving an item to `resolved`/`declined`, optionally citing the merge commit/PR
  as `resolution_ref`) is the owner's own, separate, explicit action back in
  `feedback-queue.tsx` after they review and merge the change set (FR-024).
- It never touches a file the export doesn't name.
- It never edits `## Self-assessment checklist` items' *positions* or *count* - if the
  addressed comment happens to fall in that section, edit wording only, never reorder or
  add/remove `- [ ]` lines, or T013's position-keyed hydration (contract:
  self-assessment-hydration.md) breaks for every student who already ticked something in
  that unit.

## Procedure

1. **Parse the export.** Each `## <repo-relative-path>` heading names one file; each
   blockquote beneath it is a quoted passage (passage-scoped feedback), each following
   paragraph is that item's comment. An item with no blockquote is whole-page feedback -
   propose an edit anywhere reasonable in that file addressing the comment, since there is
   no anchor passage to locate.

2. **For each passage-scoped item, locate the quote verbatim** in its named file (exact
   string search, not a fuzzy match). If found, that is your edit anchor. If **not** found -
   read `references/stale-passage-handling.md` before doing anything else with that item;
   never guess at a "close enough" replacement location.

3. **Propose the smallest edit** that addresses the comment: reword the sentence,
   add/correct a citation, fix a factual error, clarify a confusing passage - whatever the
   comment actually asks for. Preserve:
   - the file's own topic-cycle structure (nine `##` headings, in order, contract:
     `topic-cycle.md`) - never add, remove, or reorder a heading;
   - the reading level and register (Constitution Art. III.1/III.2 - simple, academic-plain
     English; a corresponding Urdu register for the translation);
   - `## Self-assessment checklist` item positions/count, per the note above;
   - any figure marker/`<Figure>` element already in the file, untouched, unless the
     comment is specifically about that figure.

4. **Mirror the edit into the file's translation** (`i18n/ur/docusaurus-plugin-content-docs/
   current/<same-relative-path>`). If no Urdu file exists yet for this path, or the passage
   cannot be located there either (a translation lagging the English source), note this
   explicitly in the change-set summary rather than silently skipping it or inventing a
   translation ad hoc.

5. **Run the full content-check set** before presenting anything:

   ```bash
   npm run validate:content && npm run check:depth-gate && npm run check:figures \
     && npm run check:no-answer-keys && npm run check:no-em-dash && npm test
   ```

   Every one of these must pass. A failure means the edit broke something structural (a
   required section, the heading order, a figure/manifest pairing, an em dash, an answer-key
   leak) - fix it and re-run before moving on; never present a change set with a red gate.

6. **Present the change set for review**: one paragraph per addressed item naming which
   `content_feedback` row it answers (by its quoted passage or comment text, since this
   skill never sees the row's id), what changed and why, and the file(s) touched (EN +
   UR pair). Explicitly list any item skipped as stale (step 2) or untranslated (step 4).
   Do not commit, push, or open a PR - that is the owner's own review-and-merge step
   (quickstart.md step 5), same as `author-unit`'s posture.

## References

- `references/export-format.md` - the exact export document shape to parse.
- `references/stale-passage-handling.md` - the "report and skip, never guess" rule for a
  quote no longer found verbatim (FR-025, edge case).
