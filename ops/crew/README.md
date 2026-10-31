# Crew: the multi-agent workforce that replaced the Paperclip CEO

The crew finishes the B.Ed corpus with five separately-billed agent CLI workers working in parallel,
one unit-stage job each, in their own git worktrees. The existing content gates and CI are the only
definition of done. Paperclip is paused (its data is kept); nothing here depends on it.

## Who does what

| Worker | CLI | Family | Rank-1 stages |
|---|---|---|---|
| claude | `claude -p` | anthropic | author, repair_en, review_ur, salvage |
| codex | `codex exec` | openai | figures (SVG), translate (G4) |
| agy | `agy -p` | google | review_en (G3), illustrate (ADR-0029) |
| agy_claude | `agy -p --model claude-opus-4-6-thinking` | anthropic | none: next after claude in every chain that has claude (agy's separate Claude/GPT quota) |
| opencode | `opencode run -m longcat/LongCat-2.0` | longcat | fix (mechanical gate repairs) |

openclaw is not a worker. It is the owner channel: Discord `#etextbook-platform` for everything,
WhatsApp as well for urgent items and decisions.

Every stage has a ranked chain over the five workers (`scripts/crew/workers.mjs`; a few stages,
such as `illustrate`, use only some of them). A worker that
hits a quota, rate or session limit is put on cooldown (30 min, 2 h, 6 h) and its job moves to the
next worker in the chain at once, continuing from the work already committed on the branch. A
review job never goes to the model family that produced what it reviews; if no eligible reviewer
is healthy, the review waits while every other kind of job keeps flowing.

## The loop (`scripts/crew/tick.sh`, cron every 15 min)

1. **sync**: the control checkout fast-forwards to `origin/main`.
2. **plan**: `crew.mjs plan` derives each unit's next stage from main (`report-content-status.mjs`,
   the course tracker, the review reports) and queues missing jobs. Nothing is hand-typed.
   **One course at a time** (owner ruling 2026-10-28, `focusCourse` in `scripts/crew/planner.mjs`):
   a course is started once it has an authored unit or crew work in flight on the board. The focus
   is the started course with crew work left and the fewest jobs remaining (ties in catalog order);
   when no started course has crew work left, the first approved but unstarted course in catalog
   order becomes the focus. The planner withholds `author` jobs for every other unstarted course
   and logs them as `held n author job(s)`, so missing author jobs for a new course are the rule
   working, not a planner bug. The choice is saved as `board.focus` and shown as the **Focus** line
   of `BOARD.md`; launch order puts the focus course right after the owner's `crew prioritise` list.
3. **inbox**: owner replies and `crew ...` commands from Discord/WhatsApp are applied.
4. **reap**: finished workers are checked. The job passes if `npm run check:content` shows no
   finding that main does not already have. Then the dispatcher writes the job's PHR, pushes the
   branch and marks the job `ready` (a job that touches a protected path opens its own PR at once
   instead, so its owner question never holds up a batch). A failed attempt is retried with the gate output as feedback, and the
   third attempt goes to a different worker; after that the job is `gate_red` for the lead.
   Workers never talk to each other; the brief carries what one job leaves for the next
   (`scripts/crew/handoff.mjs`). A worker may end with up to 3 `CREW-HANDOFF: <note>` lines (known
   leftovers, spots to check); the dispatcher keeps them on the job and in its PHR, and later
   non-review jobs on the same unit (and a CI-fix job, from its parent) see the 5 newest. A
   `repair_en` brief also lists the open findings of the latest G3 report, most severe first.
   Review jobs never get handoff notes, so a G3/G5 reviewer is not primed by the producer.
5. **batch** (`scripts/crew/batch.mjs`, owner ruling 2026-10-19): at most once an hour, and only
   when no batch PR is open, the dispatcher merges every `ready` job onto main's head in a fresh
   `crew/batch-<UTC time>` worktree, runs `npm run check:content` on the result and opens ONE PR for
   all of them (its jobs become `batched`). A job that conflicts, or fails the gate only in
   combination, is left out and gets a merge fix on its own branch; the rest go on. Why: one PR per
   job pushed to main every few minutes, each push queued a full CI run (rls and e2e share one
   database and run one at a time), and `scripts/deploy-prod.sh` deploys only main's head once its
   own run passes, so main moved on before any run finished and production stopped deploying.
   `CREW_BATCH_EVERY_MIN` changes the interval. A batch PR closed by hand holds its jobs
   (`blocked`); a batch still red after two CI fixes stops batching until the lead acts.
6. **PRs**: green CI leads to auto-merge (main auto-deploys). The merge uses `gh pr merge --admin`
   because every PR comes from the owner account, which cannot approve its own PR. The owner ruled
   "auto-merge when CI green" on 2026-10-17, so CI is the review gate. Red CI queues a fix job on the
   same branch. A PR that touches a protected path (style guide, constitution, ADRs, scripts, catalog,
   `.github/`, an approved content-spec or intake) is never auto-merged: the owner is asked.
7. **launch**: up to 3 jobs run at once, one per unit (a unit with `ready` or `batched` work waits for it to merge), and none start while the host has under
   3 GB of free memory or under 8 GB of free disk (`CREW_MIN_FREE_DISK_MB`). The crew never builds
   locally; CI builds every PR on GitHub's runners. Job worktrees are sparse: they leave out the
   `reviews/**/renders-*/` evidence folders (1.7 of a checkout's 2.3 GB, read by no gate), and the
   crew's leftover auto-commit uses `git add --sparse` so new renders are still committed. A
   launch that fails is logged on the job and retried next tick (`gate_red` after 3 failures);
   it never aborts the tick, and the board is saved even when a phase throws. A hold below either
   floor is tracked as `control.launchStall` (`scripts/crew/stall.mjs`): the owner is alerted at
   once for disk and after an hour for memory, again every 6 hours, and told when launches
   resume; the board, `crew status` and the digest show how long launches have been held.

`BOARD.md` opens with a **Resume here** block (`scripts/crew/resume.mjs`): whether launches are
flowing, what needs the owner (open decisions, held jobs, G3 sign-offs), what needs the lead
(red jobs), what is running, which PRs wait, and which jobs start next. A fresh lead session
reads that block first.

**G3 sign-off sync** (`scripts/crew/signoff-sync.mjs`, ADR-0032). After plan, tick and status,
`tick.sh` runs the sync only when `~/.crew/mega-book/signoff.env` exists; the service key lives in
that file and only the sync's subshell loads it, so workers never inherit it, and a failed sync
does not fail the tick. The sync reads the owner's `queued` rows from the `g3_signoffs` ledger
(decisions made on the sign-off desk, `/app/admin/g3-signoff`) and, in a fresh
`crew/g3-signoff-<UTC time>` worktree of `origin/main`, refuses a row as `stale` when the unit is
already G3-certified or its review inputs changed since the decision; otherwise it writes the
Spec 017 certification JSON under `reviews/unit-NN/G3/` and appends the tracker row (certify done,
revise or escalate pending). It then runs `check:pipeline-gate`, commits with a PHR, opens one PR
and marks the rows `synced` (rows it refused become `stale` or `failed`). The crew never merges
that PR: merging it is the owner's sign-off. `node scripts/crew/signoff-sync.mjs --dry-run` writes
the files and prints the commit without pushing or touching the ledger.

After a salvage PR merges, the tick deletes the Paperclip branches it replaced (its
`supersedes` PRs' head branches and its `base`), unless an open PR still uses one
(owner ruling, 2026-10-17). Each job does this once and logs `retired superseded branches`.

## Weekly maintenance (Sunday 02:00 PKT)

The crew also tends the project itself (owner, 2026-10-19), spec-driven with reusable intelligence.
Schedules come from the tick in Asia/Karachi time (`scripts/crew/maintenance.mjs`), so no crontab
or daylight-saving change is needed; each slot runs once.

1. **Survey** (`maint_survey`, claude first): writes `specs/maintenance/<YYYY-Www>/spec.md`,
   `plan.md`, `tasks.md` (at most six rows) and `intelligence.md`, from what changed since the last
   run, the standing checks and the week's intelligence candidates. It ships in the hourly batch.
2. **Fan-out**: each `tasks.md` row becomes a job (`scripts/crew/maintjobs.mjs`): area `code` runs
   as `maint_refactor` (codex first), `docs` and `artifacts` as `maint_docs`, `adr` as `maint_adr`
   (the decision register `history/adr/README.md`), `skill` as `maint_skill`.
3. **Own PR + independent review**: a maintenance job opens its own PR
   (`crew(maint <week>): <task>`), never the content batch, and a `maint_review` job from another
   model family reviews it (`CREW-VERDICT: pass|revise`). A revise queues one fix with the
   reviewer's words; three review rounds without a pass go to the lead.
4. **Merge**: CI green AND review pass AND no protected file (the list above plus `.claude/`)
   merges automatically; otherwise the owner gets the usual C-### question.

A self-maintenance diff that touches course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`) fails: content is the corpus crew's.
Skill: `.claude/skills/weekly-maintenance/`.

## Intelligence (12-hourly harvest, daily distill, weekly promote)

The crew forgets what it learns unless it is written where every worker reads it. On 2026-10-19
one failure recurred 25 times before a person found it.

- **Harvest, 00:00 and 12:00 PKT, no model** (`scripts/crew/intel.mjs`): everything new since the
  cursor (board failures and handoff notes, worker logs, `cron.log`, PHR reflections, G3/G5
  findings) becomes signals, folded into clusters by normalised signature in
  `~/.crew/<project>/intel/`. A crew failure that turns hot (3 in one harvest or 5 in total) is
  announced at once, at most five per harvest.
- **Distill, 03:00 PKT, one model job** (`intel_distill`, agy first): the clusters that grew in 24 h
  become typed candidates with evidence in `specs/intelligence/daily/<date>.md` (skill, gate,
  brief or planner fix, AGENTS.md/CLAUDE.md rule, memory note, ADR suggestion, style-guide
  proposal). Skill: `.claude/skills/intel-distill/`.
- **Promote, weekly**: the survey turns the strongest candidates into tasks, and accepted items
  get a row in `specs/intelligence/registry.md` naming the signature they target.
- **Measure**: each harvest keeps per-slot counts, so the digest reports for every adopted item
  whether its signal fell ("worked"), stayed ("no change") or rose ("worse").

## Owner commands (Discord or WhatsApp, only from the owner's own ID)

- `C-007 merge` / `C-007 hold` / `C-007 yes ...`: answer a decision (free text after it is kept).
- `crew status`, `crew pause`, `crew resume`, `crew prioritise EFMP-305`, `crew stop <job>`,
  `crew retry <job>`, `crew note <directions>`, `crew help`. A leading `/` is accepted.
- `crew maintenance now` (an extra survey now; Sunday's still runs), `crew maintenance skip`
  (skip this week), `crew maintenance status`; `crew intel now` (harvest and queue a distill now),
  `crew intel status` (the week's top clusters).

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
node scripts/crew/crew.mjs cmd 'crew intel status'     # hot clusters this week
npm run test:crew                                       # the crew's own tests (node --test tests/crew/*.test.mjs)
CREW_STATE_DIR=/tmp/state-copy node scripts/crew/crew.mjs tick --dry-run   # safe trial on a copy
```

## State (host-local, never committed)

`~/.crew/mega-book/`: `board.json`, `health.json`, `decisions.json`, `control.json`, `inbox.json`,
`owner.json` (the owner's WhatsApp number, Discord user ID and channel ID), `BOARD.md`, `logs/`,
`intel/` (`clusters.json`, the append-only `ledger.jsonl` of raw signals), and the optional
`signoff.env` (the service key for the G3 sign-off sync).
Job worktrees are under `~/crew-wt/<job>`. Any stand-in lead (cron, Codex, agy) reads the same files,
so a lead running out of quota does not stop the crew.

## Rules the crew does not change

G3/G5 reviews stay advisory under ADR-0019: no worker ticks G3/G5, signs, or uses human initials.
Owner-only governance stays with the owner and is asked over the channel. Heavy commands inside a
job go through `scripts/heavy.sh`.
