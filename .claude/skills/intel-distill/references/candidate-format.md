# Daily candidates format (`specs/intelligence/daily/<date>.md`)

```markdown
# Intelligence candidates, 2026-10-20

Harvest slots: 2026-10-19-12, 2026-10-20-00. Clusters read: 14 (of 40 that grew).

## C1: Workers run the gates before content-status.json exists
- **Kind:** brief / skill
- **Cause:** a fresh worktree has no `static/content-status.json` (git-ignored, generated), so
  `check:content-status` fails before any real check; workers then "fix" nothing.
- **Recurrence:** 42 log errors and 6 handoff notes in 24 h; 3rd day running.
- **Evidence:** log:efmp-302-u02-repair_en-conflict4.1.log, job:efmp-305-u01-repair_en,
  history/prompts/efmp-303/crew-efmp-303-u02-translate-r1.misc.prompt.md
- **Proposed home:** crew brief "Done when" step: run `npm run build:content-status` first; or the
  dispatcher runs it in `prepareWorktree`.
- **Signature:** `✗ <path> is missing. run: npm run build:content-status`
- **Registry:** matches candidate I-0007 (raises its recurrence).

## Effects
- I-0001 (reap git add): signal at 0 since adoption; worked.
```

- One `##` section per candidate, `C1`, `C2`, ... strongest first, at most ten.
- **Kind**: skill, gate, brief / planner fix, rule, memory note, ADR suggestion, style-guide
  proposal.
- **Signature**: copy it exactly from the brief, so a promoted item can be measured.
- **Registry**: `new`, or the registry ID it repeats or provides evidence for.
- Keep each candidate under about 12 lines; the evidence links carry the detail.
