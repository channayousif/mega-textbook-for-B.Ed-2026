# Contract: a human certification

A certification is a Git artefact, deliberately in the same shape the agent path writes, so that
human and agent review produce **comparable evidence**. That comparability is not cosmetic: agent
qualification for G5 is blocked on a comparator base, and every human certification in this format
is one comparator.

## File

`specs/content/<course-lowercase>/reviews/unit-NN/<G3|G5>/<run-id>.json`

Same directory the agent path uses. `run-id` is unique per attempt; earlier attempts are never
overwritten.

## Fields

Matching `scripts/lib/review-evidence.mjs`'s report shape where they correspond:

| Field | Rule |
|---|---|
| `schema_version` | `1` |
| `course_code`, `unit_no`, `stage` | the reviewed unit and `G3` or `G5` |
| `reviewer_id` | the reviewer's initials, matching `/^[A-Z]{1,5}$/`. **Never** `agent:`-prefixed - Art. VII §3 forbids agent identity impersonating human initials, and the converse would be just as misleading |
| `input_manifest` | path to SHA-256 map of the exact bytes reviewed, from `review:evidence prepare` |
| `criteria` | one entry per stage criterion, each `{id, status, evidence}` |
| `findings` | `{severity, message, resolved}` with severity `blocking`, `uncertain` or `advisory` |
| `disposition` | `pass`, `revise` or `escalate` |
| `started_at`, `completed_at` | ISO timestamps |
| `supersedes` | the `run-id` of a prior attempt, or absent |

**No signature.** The agent path signs because an agent identity is forgeable; a named person's
commit in Git history is the equivalent assurance, and demanding a key of a GCET faculty member
would make the path unusable by the people it exists for.

## Tracker row

```
| Unit N | G5 ur-review | ✅ | AB | review:specs/content/efmp-302/reviews/unit-01/G5/<run-id>.json |
```

`Reviewer` is the certifying person's initials, not the curriculum owner's. `validateAgentTrackerRow`
accepts this today with no change: a non-`agent:` reviewer needs only to match `/^[A-Z]{1,5}$/`.

**Existing rows are never relabelled.** Art. VII §3 forbids rewriting historical reviews, so a
past owner-signed row stays as it is.

## What the app does and does not do

The app **produces** both artefacts and offers them for download, following ADR-0015's flow. It
does **not** write to Git, change a `translation_status`, or mark a gate done. Applying a
certification is a commit a person makes, deliberately, through the ordinary PR flow.
