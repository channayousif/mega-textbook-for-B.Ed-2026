# Crew: the multi-agent workforce that replaced the Paperclip CEO

The crew finishes the B.Ed corpus with four separately-billed agent CLIs working in parallel, one
unit-stage job each, in their own git worktrees. The existing content gates and CI are the only
definition of done. Paperclip is paused (its data is kept); nothing here depends on it.

## Who does what

| Worker | CLI | Family | Rank-1 stages |
|---|---|---|---|
| claude | `claude -p` | anthropic | author, repair_en, review_ur, salvage |
| codex | `codex exec` | openai | figures (SVG), translate (G4) |
| agy | `agy -p` | google | review_en (G3), illustrate (ADR-0029) |
| opencode | `opencode run -m longcat/LongCat-2.0` | longcat | fix (mechanical gate repairs) |

openclaw is not a worker. It is the owner channel: Discord `#etextbook-platform` for everything,
WhatsApp as well for urgent items and decisions.

Every stage has a ranked chain over all four workers (`scripts/crew/workers.mjs`). A worker that
hits a quota, rate or session limit is put on cooldown (30 min, 2 h, 6 h) and its job moves to the
next worker in the chain at once, continuing from the work already committed on the branch. A
review job never goes to the model family that produced what it reviews; if no eligible reviewer
is healthy, the review waits while every other kind of job keeps flowing.

## The loop (`scripts/crew/tick.sh`, cron every 15 min)

1. **sync**: the control checkout fast-forwards to `origin/main`.
2. **plan**: `crew.mjs plan` derives each unit's next stage from main (`report-content-status.mjs`,
   the course tracker, the review reports) and queues missing jobs. Nothing is hand-typed.
3. **inbox**: owner replies and `crew ...` commands from Discord/WhatsApp are applied.
4. **reap**: finished workers are checked. The job passes if `npm run check:content` shows no
   finding that main does not already have. Then the dispatcher writes the job's PHR, pushes the
   branch and opens a PR. A failed attempt is retried with the gate output as feedback, and the
   third attempt goes to a different worker; after that the job is `gate_red` for the lead.
5. **PRs**: green CI leads to auto-merge (main auto-deploys). The merge uses `gh pr merge --admin`
   because every PR comes from the owner account, which cannot approve its own PR. The owner ruled
   "auto-merge when CI green" on 2026-10-17, so CI is the review gate. The merge uses `gh pr merge --admin`, because
   every PR comes from the owner account, which cannot approve its own PR; the owner ruled
   "auto-merge when CI green" on 2026-10-17, so CI is the review gate. Red CI queues a fix job on the same
   branch. A PR that touches a protected path (style guide, constitution, ADRs, scripts, catalog,
   `.github/`, an approved content-spec or intake) is never auto-merged: the owner is asked.
6. **launch**: up to 3 jobs run at once, one per unit, and none start while the host has under
   3 GB of free memory or under 8 GB of free disk (`CREW_MIN_FREE_DISK_MB`). The crew never builds
   locally; CI builds every PR on GitHub's runners. Job worktrees are sparse: they leave out the
   `reviews/**/renders-*/` evidence folders (1.7 of a checkout's 2.3 GB, read by no gate), and the
   crew's leftover auto-commit uses `git add --sparse` so new renders are still committed. A
   launch that fails is logged on the job and retried next tick (`gate_red` after 3 failures);
   it never aborts the tick, and the board is saved even when a phase throws.

After a salvage PR merges, the tick deletes the Paperclip branches it replaced (its
`supersedes` PRs' head branches and its `base`), unless an open PR still uses one
(owner ruling, 2026-10-17). Each job does this once and logs `retired superseded branches`.

## Owner commands (Discord or WhatsApp, only from the owner's own ID)

- `C-007 merge` / `C-007 hold` / `C-007 yes ...`: answer a decision (free text after it is kept).
- `crew status`, `crew pause`, `crew resume`, `crew prioritise EFMP-305`, `crew stop <job>`,
  `crew retry <job>`, `crew note <directions>`, `crew help`. A leading `/` is accepted.

Two paths deliver them, and each command is applied once:

1. **Instant**: openclaw's `crew` skill (`~/.openclaw/workspace/skills/crew/SKILL.md`) runs
   `crew.mjs cmd '<message>' --via whatsapp|discord` and replies with what it prints. A
   state-changing command waits for a running tick (same `tick.lock`). The command is recorded
   in `handled.json` so the tick does not apply it again.
2. **Fallback** (openclaw's model unavailable): the tick reads the same messages from Discord and
   openclaw's session logs and replies in the place each one came from (DM, WhatsApp or channel).

`crew note` appends to `~/.crew/mega-book/OWNER-NOTES.md`; the lead reads it before planning.
Any other message is ignored by the crew. Textbook was removed from openclaw's Paperclip relay
and digest (`~/bin/paperclip-board.sh`, `~/bin/paperclip-digest.sh`, backups `*.bak-20261017`);
Da Vinci still uses them.

## Lead commands

```bash
node scripts/crew/crew.mjs status                      # BOARD.md in ~/.crew/mega-book
node scripts/crew/crew.mjs cmd 'crew status'           # what the owner sees
node scripts/crew/crew.mjs plan --dry-run
node scripts/crew/crew.mjs tick --dry-run
node scripts/crew/crew.mjs add EFMP-305 0 salvage --branch agent/TEX-39 --pr 119 --task "..."
node scripts/crew/crew.mjs adopt 145 EFMP-301            # track an existing PR
node scripts/crew/crew.mjs health codex cooling 2026-10-18T06:00:00Z
node scripts/crew/crew.mjs ask "Approve X?" --options "yes|no"
node scripts/crew/crew.mjs digest
```

## State (host-local, never committed)

`~/.crew/mega-book/`: `board.json`, `health.json`, `decisions.json`, `control.json`, `inbox.json`,
`owner.json` (the owner's WhatsApp number, Discord user ID and channel ID), `BOARD.md`, `logs/`.
Job worktrees are under `~/crew-wt/<job>`. Any stand-in lead (cron, Codex, agy) reads the same files,
so a lead running out of quota does not stop the crew.

## Rules the crew does not change

G3/G5 reviews stay advisory under ADR-0019: no worker ticks G3/G5, signs, or uses human initials.
Owner-only governance stays with the owner and is asked over the channel. Heavy commands inside a
job go through `scripts/heavy.sh`.
