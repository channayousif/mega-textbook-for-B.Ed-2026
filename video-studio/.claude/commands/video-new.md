---
description: Create a new episode from a topic and draft its Urdu script (stops at the script gate)
argument-hint: <topic_id> [idea or series key]
---
Topic: $ARGUMENTS
1. If no topic id is given, suggest 3 from the queue and stop.
2. `npm run new -- <topic_id>` to create the episode.
3. Use the urdu-script-writer skill to write and validate `script.json`.
4. Run the pedagogy-reviewer and urdu-language-reviewer subagents; fix blocking issues once.
5. Set status `script_review` and present the script for approval. Do NOT continue to assets.
Never set approvals yourself. Tell the owner to approve with the Studio button or by running `npm run approve -- <episode_id> script` in their own terminal.
