# Stale-passage handling

FR-021 keeps a filed item's `quoted_passage` immutable and visible in the queue exactly as
originally quoted, even after the underlying topic text has since changed (edited by another
author, folded into a rewrite, or simply typo-fixed out of existence). That is correct and
intentional at the database layer - it is what lets the owner see what a reader was actually
reacting to, regardless of later edits. It also means this skill will sometimes be handed a
quote that **no longer exists verbatim** in the named file.

## The rule

**Report and skip. Never guess.**

When step 2 of `SKILL.md`'s procedure (exact string search for the quoted passage in its
named file) comes back empty:

1. Do **not** search for a "close enough" match (fuzzy text match, same sentence reworded,
   a paragraph that seems to cover the same idea). A wrong anchor produces an edit in the
   wrong place, addressing a comment about text that is no longer there - worse than doing
   nothing.
2. Do **not** silently drop the item from the change-set summary. List it explicitly under
   a "Stale - skipped" heading, quoting the passage that could not be located and the file
   it was filed against.
3. If the comment is still clearly actionable **without** the original anchor (e.g. "add a
   citation for this claim" and the claim itself is still findable, just reworded), you may
   propose an edit against the *current* text - but say so explicitly in the change-set
   summary ("the original quote was stale; this edit targets the equivalent passage as it
   reads today, not the originally quoted text") so the owner can judge whether that is
   still the right target before merging.
4. When in doubt between (2) and (3), prefer (2) - reporting a stale item for the owner's
   own judgement costs one line in the summary; guessing wrong costs a bad edit that has to
   be caught in review anyway.

## Why this can't be automated away

The export format (`export-format.md`) deliberately carries no line/heading anchor beyond
the quoted text itself - passage capture is best-effort, in-house re-location
(`window.getSelection()`, research.md R7), not a real annotation library with stable range
anchors. That trade-off (recorded as one of this feature's `/sp.adr` candidates) is what
makes "the exact string is gone" a normal, expected outcome for an old export against a
file that has since moved on - not a bug to route around, a case to handle explicitly.
