---
description: Align captions, render the final short, run audits and reviewers (stops at the render gate)
argument-hint: <episode_id>
---
Episode: $ARGUMENTS (status must be `assets_approved`, or `render_review` for a re-render).
Use the remotion-urdu-shorts skill: `npm run align`, `npm run render`, `npm run audit` for the episode.
Run urdu-language-reviewer (render stage) and brand-qa-reviewer. Fix code/template issues and re-render if a reviewer blocks; content issues go back to the owner.
Set `render_review` and give the owner the file path, duration, and reviewer verdicts. Never set approvals yourself - the owner approves via the Studio or `npm run approve -- <episode_id> render`.
