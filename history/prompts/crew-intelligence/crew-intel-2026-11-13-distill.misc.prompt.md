---
id: crew-intel-2026-11-13-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-12
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-13-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - history/prompts/crew-intelligence/crew-intel-2026-11-13-distill.misc.prompt.md
 - specs/intelligence/daily/2026-11-13.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-13-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-13-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-13.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [log-error] x1 recent, 5 total, since 2026-10-21: agy_error: {"short_error":"resource_exhausted (code n): individual quota reached. please upgrade your subscription to increase your limits. resets in nhnmns.","
  example: AGY_ERROR: {"short_error":"RESOURCE_EXHAUSTED (code 429): Individual quota reached. Please upgrade your subscription to increase your limits. Resets in 63h26m50s.","status":"RESOURCE_EXHAUSTED","error
  evidence: log:gqur-301-u06-review_en.1.log, log:gsos-301-u04-review_en.1.log, log:efmp-301-u02-plan_illustrations.1.log
- [handoff] x1 recent, 1 total, since 2026-11-11: cn documents n authoring jobs (<course> un, un) permanently aborted at n merge fixes due to unkeyed <code> summary table conflicts in course <code>.
  example: C1 documents 2 authoring jobs (EFPG-401 U3, U5) permanently aborted at 5 merge fixes due to unkeyed `## Units` summary table conflicts in course `tasks.md`.
  evidence: job:intel-2026-11-12-distill
- [handoff] x1 recent, 1 total, since 2026-11-11: cn highlights local playwright font advances resolving narrower than ci fallback fonts, causing false-positive local geometry passes on urdu svgs.
  example: C2 highlights local Playwright font advances resolving narrower than CI fallback fonts, causing false-positive local geometry passes on Urdu SVGs.
  evidence: job:intel-2026-11-12-distill
- [handoff] x1 recent, 1 total, since 2026-11-11: cn details n desk review carry-forwards repeating stale findings against post-repair file hashes, producing zero-edit repair loops.
  example: C3 details 7 desk review carry-forwards repeating stale findings against post-repair file hashes, producing zero-edit repair loops.
  evidence: job:intel-2026-11-12-distill
- [log-error] x1 recent, 1 total, since 2026-11-12: error: individual quota reached. please upgrade your subscription to increase your limits. resets in nhnmns. (response may be truncated)
  example: error: Individual quota reached. Please upgrade your subscription to increase your limits. Resets in 161h27m31s. (response may be truncated)
  evidence: log:efmp-301-u02-plan_illustrations.1.log

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-13.md` only.

## Continue, do not restart
Earlier attempts may have left work on this branch. Check `git log origin/main..HEAD` and `git status` and build on it.

## Done when
1. The acceptance checks in your task pass; `npm run check:content` reports nothing new against origin/main;
   any `node --test tests/crew/*.test.mjs` or unit tests covering what you changed pass.
2. All work is committed on this branch with a conventional commit message. Do not push and do not open a PR.
3. Your final output ends with one line: `CREW-SUMMARY: <what you changed, in one sentence>`.
4. Optional, just before it: up to 3 lines `CREW-HANDOFF: <note>` for facts the next job needs
   (known leftovers, risky spots it should check). Not a summary; omit them when there is nothing.

## Notes from earlier jobs on this unit
- (intel-2026-11-12-distill, intel_distill, agy) C1 documents 2 authoring jobs (EFPG-401 U3, U5) permanently aborted at 5 merge fixes due to unkeyed `## Units` summary table conflicts in course `tasks.md`.
- (intel-2026-11-12-distill, intel_distill, agy) C2 highlights local Playwright font advances resolving narrower than CI fallback fonts, causing false-positive local geometry passes on Urdu SVGs.
- (intel-2026-11-12-distill, intel_distill, agy) C3 details 7 desk review carry-forwards repeating stale findings against post-repair file hashes, producing zero-edit repair loops.
- (intel-2026-11-11-distill, intel_distill, agy) C1 documents 19 empty worker exits caused by opencode auto-rejecting external_directory access when attempting to read /proc/pressure/* or follow .git worktree pointer files; explicit brief guidance is needed.
- (intel-2026-11-11-distill, intel_distill, agy) C3 identifies unhandled Gemini HTTP 503 capacity errors in QUOTA_RE that burned job attempts instead of triggering worker cooldown.


## Response snapshot

Distilled 6 reusable intelligence candidates for 2026-11-13; strongest addresses CLI truncation annotations fracturing identical quota errors into duplicate clusters.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 2 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 6 reusable intelligence candidates for 2026-11-13; strongest addresses CLI truncation annotations fracturing identical quota errors into duplicate clusters.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - C1 documents CLI stream truncation annotations `(response may be truncated)` fracturing identical quota exhaustion errors into duplicate clusters in `scripts/crew/intel.mjs`.
  - C2 highlights daily distill job CREW-HANDOFF notes echoing back into the 12-hour harvest as operational handoffs, creating a self-referential feedback loop.
  - C3 details a 9,688-minute (6.7-day) worker cooldown under I-0013, confirming attempt preservation while underscoring multi-model stage redundancy.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
