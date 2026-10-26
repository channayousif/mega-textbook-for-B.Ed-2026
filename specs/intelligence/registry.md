# Intelligence registry

Lessons the crew has turned into lasting changes: a skill, a gate or check, a crew brief or planner
fix, an AGENTS.md or CLAUDE.md rule, or a decision. Each row says what changed, where it lives, and
which recurring signal it targets, so the 12-hourly harvest can measure whether it worked
(`crew intel status`, the daily digest). How the pipeline works: `ops/crew/README.md`,
"Intelligence"; candidates come from `specs/intelligence/daily/`, promotion happens in the weekly
maintenance survey (`.claude/skills/weekly-maintenance/`).

Columns:

- **Status**: `adopted` (merged and live), `proposed` (open PR or owner decision), `candidate`
  (seen, not yet acted on), `retired` (no longer needed, kept for history).
- **Signature**: the cluster signature the item targets, exactly as `crew intel status` prints it
  (numbers become `n`, paths `<path>`, inline code `<code>`). Leave it empty when no signal can show
  the effect, or when success makes the signal rise (a new detector).
- **Adopted**: the harvest slot (`YYYY-MM-DD-HH`, Asia/Karachi, `00` or `12`) from which the change
  was live. The harvest compares the signal's rate before and after it.

| ID | Title | Kind | Home | Status | Signature | Adopted | Evidence |
|---|---|---|---|---|---|---|---|
| I-0001 | One failing `git add` must not stall every reap; reap each job alone | crew fix | `scripts/crew/crew.mjs` (`finishSuccess`, `reap`) | adopted | `reap: error: git add -a --sparse :!.crew :!node_modules: the following paths are ignored by one of your .gitignore files:` | 2026-10-19-00 | #200; 93 cron errors in 13 h before it |
| I-0002 | A fix job must commit something new since launch (`startHead`) | crew fix | `scripts/crew/crew.mjs` (`launch`, `finishSuccess`) | adopted |  | 2026-10-19-12 | #201; a detector, so its signal "the worker exited without committing any change" rises when it works |
| I-0003 | Judge a PR only on checks that started after the crew's push | crew fix | `scripts/crew/checks.mjs`, `managePrs` | adopted |  | 2026-10-19-12 | #201; #164 got a duplicate fix job from a day-old red build |
| I-0004 | Plan from real report verdicts and file-level Urdu mirrors | planner fix | `scripts/crew/planner.mjs` | adopted |  | 2026-10-19-12 | #278; 36 units looped on translate, 65 revise verdicts never planned |
| I-0005 | Regenerate `content-status.json` before the batch gate | crew fix | `scripts/crew/crew.mjs` (`gateFindings`) | adopted | `left out of the batch: merged onto main's latest state, <path> fails npm run check:content (it could not join the hourly batch):; merge fix queued` | 2026-10-20-00 | #281; every ready job was left out of every batch |
| I-0006 | Guard the shared registries on every job and batch | gate | `scripts/crew/registries.mjs` | adopted |  | 2026-10-20-00 | #280; #162 deleted two GSOS-301 decisions from main (repaired in #279) |
| I-0007 | Generate untracked `content-status.json` for every new or reused worktree | crew fix | `scripts/crew/crew.mjs` (`prepareWorktree`, `resolveSharedConflicts`) | proposed | `✗ <path> is missing. run: npm run build:content-status` |  | 42 log errors and 6 handoff notes ("fresh checkouts need `npm run build:content-status`") in the first harvest |
| I-0008 | Workers stay inside their worktree so tool permissions are not rejected | brief / skill | `scripts/crew/crew.mjs` (`briefRules`) | proposed | `error: the user rejected permission to use this specific tool call.` |  | 21 log errors; opencode mistyped the home path on #164's first fix |
| I-0009 | Keep generated content-status untracked and regenerate before worker gates | crew fix | `scripts/crew/crew.mjs` (`prepareWorktree`, `resolveSharedConflicts`) | proposed | `✗ <path> is stale - it no longer describes the working tree.` |  | 2026-10-24 C1: 25 stale errors, 51 content-status signals in 24 h; maintenance 2026-W43 M1 |
| I-0010 | Hold translate while the latest G3 report is an unrepaired revise | planner fix | `scripts/crew/planner.mjs` (`stagesFor`) | proposed | `separate english author must resolve gn fn-fn before translation resumes.` |  | 2026-W43 M2; digests 2026-10-21 C4 (6 handoffs), 2026-10-23 C6 (12), 2026-10-24 C8; GSOS-301 U3 Urdu mirror copied G3-flagged English defects (2026-10-25) |
| I-0011 | Workers regenerate `content-status.json` before running the gates in a fresh worktree | brief / skill | crew brief or `AGENTS.md` | candidate | `✗ <path> is missing. run: npm run build:content-status` |  | 42 log errors and 6 handoff notes ("fresh checkouts need `npm run build:content-status`") in the first harvest |
| I-0012 | Workers stay inside their worktree so tool permissions are not rejected | brief / skill | crew brief | candidate | `error: the user rejected permission to use this specific tool call.` |  | 21 log errors; opencode mistyped the home path on #164's first fix |
| I-0013 | Cool workers until the provider reset when it exceeds strike backoff | crew fix | `scripts/crew/workers.mjs` (`resetMinutes`), `scripts/crew/crew.mjs` (`cool`) | proposed | `error: individual quota reached. please upgrade your subscription to increase your limits. resets in nhnmns.` |  | 2026-10-22 C5; 2026-10-23 C3; maint-2026-w43-m3; two agy attempts reported resets more than 62 hours away |
| I-0014 | Name the conflicting files when a ready job is left out of the batch | crew fix | `scripts/crew/batch.mjs`, `scripts/crew/crew.mjs` | proposed | | | F5: the exclusion reason now names the unmerged paths so the lead and digests can tell glossary, tracker and content-status conflicts apart |
