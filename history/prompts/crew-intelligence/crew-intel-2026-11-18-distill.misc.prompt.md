---
id: crew-intel-2026-11-18-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-18
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-18-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-18.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-18-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-18-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-18.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [cron] x2 recent, 3 total, since 2026-10-22: notify whatsapp failed: gatewaytransporterror: gateway timeout after nms
  example: notify whatsapp failed: GatewayTransportError: gateway timeout after 10000ms
  evidence: cron.log
- [phr] x1 recent, 1 total, since 2026-11-16: failure modes observed: success detection counted a worker-written phr as output; text-quota detection
  example: failure modes observed: success detection counted a worker-written PHR as output; text-quota detection
  evidence: phr:history/prompts/general/20261201-crew-illustrate-image-quota-handling.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-16: next experiment (smallest change to try): surface the image-quota hold in the daily digest.
  example: next experiment (smallest change to try): surface the image-quota hold in the daily digest.
  evidence: phr:history/prompts/general/20261201-crew-illustrate-image-quota-handling.general.prompt.md
- [handoff] x1 recent, 1 total, since 2026-11-17: both raster illustrations (fig-un-n unit banner and fig-un-n topic n.n scene) are generated, inspected for absence of text and authentic pakistani setting, and 
  example: Both raster illustrations (fig-U7-4 unit banner and fig-U7-5 Topic 7.1 scene) are generated, inspected for absence of text and authentic Pakistani setting, and placed in English and Urdu.
  evidence: job:giss-401-u07-illustrate-r1
- [handoff] x1 recent, 1 total, since 2026-11-17: <course> unit n gn gate evidence refreshed and repointed in tasks.md with all n content gates passing.
  example: GISS-401 Unit 7 G2 gate evidence refreshed and repointed in tasks.md with all 14 content gates passing.
  evidence: job:giss-401-u07-illustrate-r1
- [handoff] x1 recent, 1 total, since 2026-11-17: unit n gn en-review remains open and unsigned pending independent academic review and qualified islamic studies scholar review.
  example: Unit 7 G3 en-review remains open and unsigned pending independent academic review and qualified Islamic Studies scholar review.
  evidence: job:giss-401-u07-illustrate-r1

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-18.md` only.

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
- (intel-2026-11-17-distill, intel_distill, agy) Gemini 3.1 flash image quota remains exhausted until 2026-11-17T11:00:06Z; illustrate launches are held in queue via PR #629's image-quota check.
- (intel-2026-11-17-distill, intel_distill, agy) GISS-401 Units 1-7 and GICT-300 Unit 4 prompt-only illustration manifests are preserved and await rerun and G2 refresh once the quota resets.
- (intel-2026-11-16-distill, intel_distill, agy) Production deployed SHA lags behind HEAD commits containing new raster illustrations, causing G3 reviews to record render-review as unavailable and escalate otherwise clean units.
- (intel-2026-11-16-distill, intel_distill, agy) Gemini 3.1 flash image quota remains exhausted until 2026-11-17T11:00:06Z; illustrate launches should be held or cooled until reset.
- (intel-2026-11-15-distill, intel_distill, agy) Upstream image generation model gemini-3.1-flash-image quota remains exhausted until 2026-11-17T11:00:06Z, causing repetitive illustrate job churn (C1).


## Response snapshot

3 candidates; OpenClaw gateway transport timeout on WhatsApp notifications floods cron log.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: 3 candidates; OpenClaw gateway transport timeout on WhatsApp notifications floods cron log.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - GISS-401 Unit 7 raster illustrations are landed on main (PR #633) with G2 evidence refreshed; Unit 7 G3 review remains open pending independent academic and scholar review.
  - OpenClaw loopback transport timeout on WhatsApp notifications (10000ms) recurs during high host memory pressure and needs graceful handling in scripts/crew/notify.mjs.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
