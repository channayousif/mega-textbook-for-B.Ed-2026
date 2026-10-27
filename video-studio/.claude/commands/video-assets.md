---
description: Write the subscription-UI asset handoff for an episode, or ingest and check dropped files (stops at the asset gate)
argument-hint: <episode_id>
---
Episode: $ARGUMENTS
Use the asset-handoff skill.
- If status is `script_approved`: write `handoff.md`, set `awaiting_assets`, and tell the owner the handoff is ready (tools and count of items per tool).
- If status is `awaiting_assets` and inbox has files: run ingest, report received/missing, and once complete set `asset_review` and ask the owner to confirm voices and clips.
Never set approvals yourself - the owner approves via the Studio or `npm run approve -- <episode_id> assets`.
