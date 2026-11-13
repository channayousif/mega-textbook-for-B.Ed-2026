---
id: crew-intel-2026-11-14-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-13
surface: agent
model: codex
feature: crew-intelligence
branch: crew/intel-2026-11-14-distill
user: crew
command: crew intel_distill
labels: ["crew", "codex", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-14.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-14-distill

You are the codex worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-14-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-14.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [failure] x2 recent, 59 total, since 2026-10-19: the worker exited without committing any change
  example: the worker exited without committing any change
  evidence: job:giss-401-u05-translate-r1, job:batch-20261110-1201-cifix1, job:efpg-401-u01-plan_illustrations
- [handoff] x2 recent, 4 total, since 2026-11-09: unit n gn remains open and unticked pending owner authorisation for a subsequent review cycle under adr-n.
  example: Unit 11 G3 remains open and unticked pending owner authorisation for a subsequent review cycle under ADR-0019.
  evidence: job:efmp-301-u12-repair_en-r1, job:efmp-301-u11-illustrate, job:efmp-301-u12-illustrate
- [handoff] x2 recent, 2 total, since 2026-11-13: unit n gn evidence now points to ntnz-gates.json; any later edit to unit n inputs makes it stale, so rerun <code> after committing and commit the logs folder wi
  example: Unit 9 G2 evidence now points to 20261113T001804900Z-gates.json; any later edit to Unit 9 inputs makes it stale, so rerun `npm run gates:evidence -- EFMP-301 9` after committing and commit the logs fo
  evidence: job:efmp-301-u09-plan_illustrations, job:efmp-301-u12-plan_illustrations
- [handoff] x2 recent, 2 total, since 2026-11-13: the banner row is in <code>; generate it with <code>.
  example: The banner row is in `specs/content/geng-300/figures/unit-03.banner.md`; generate it with `scripts/generate-illustration.mjs geng-300 3 --banner`.
  evidence: job:geng-300-u03-plan_illustrations, job:geng-300-u04-plan_illustrations
- [log-error] x2 recent, 2 total, since 2026-11-13: failed to authenticate. api error: n attention required! | cloudflare
  example: Failed to authenticate. API Error: 403 Attention Required! | Cloudflare
  evidence: log:efpg-401-u01-plan_illustrations.1.log, log:efpg-401-u02-plan_illustrations.1.log
- [failure] x1 recent, 83 total, since 2026-10-17: ✗ pipeline gate failed with n finding(s):
  example: ✗ Pipeline gate failed with 1 finding(s):
  evidence: job:gict-300-u03-translate, job:efmp-304-u06-translate-r1, job:efmp-301-u02-plan_illustrations
- [failure] x1 recent, 48 total, since 2026-10-19: worker exited n:
  example: worker exited 1:
  evidence: job:gicp-400-u07-illustrate, job:efpg-401-u05-author-conflict1, job:efpg-401-u02-plan_illustrations
- [handoff] x1 recent, 2 total, since 2026-11-03: unit n gn stays unticked; owner must arrange current <path> rendering and authenticated independent review provenance.
  example: Unit 9 G3 stays unticked; owner must arrange current mobile/A4 rendering and authenticated independent review provenance.
  evidence: job:efmp-301-u09-repair_en-conflict1, job:efmp-301-u09-illustrate
- [handoff] x1 recent, 2 total, since 2026-11-09: owner must resolve <path> accessibility and model provenance evidence before final acceptance.
  example: Owner must resolve render/glyph accessibility and model provenance evidence before final acceptance.
  evidence: job:efmp-301-u03-repair_en-r1, job:efmp-301-u03-illustrate
- [handoff] x1 recent, 2 total, since 2026-11-09: unit n gn remains open and unticked pending a fresh independent review cycle.
  example: Unit 3 G3 remains open and unticked pending a fresh independent review cycle.
  evidence: job:efmp-301-u03-repair_en-r1, job:efmp-301-u03-illustrate
- [handoff] x1 recent, 2 total, since 2026-11-09: qualified subject review of who-bound clinical interpretation, urgency, and local referral procedure remains an owner escalation item prior to certification.
  example: Qualified subject review of WHO-bound clinical interpretation, urgency, and local referral procedure remains an owner escalation item prior to certification.
  evidence: job:efmp-301-u11-repair_en-r1, job:efmp-301-u11-illustrate
- [handoff] x1 recent, 2 total, since 2026-11-09: visual render (<path>) and author session provenance evidence remain unverified under host resource controls.
  example: Visual render (360px/print) and author session provenance evidence remain unverified under host resource controls.
  evidence: job:efmp-301-u11-repair_en-r1, job:efmp-301-u11-illustrate
- [handoff] x1 recent, 2 total, since 2026-11-10: owner must arrange authorised visual inspection (desktop, narrow-screen, an print) for fig-un-n and fig-un-n.
  example: Owner must arrange authorised visual inspection (desktop, narrow-screen, A4 print) for fig-U12-1 and fig-U12-3.
  evidence: job:efmp-301-u12-repair_en-r1, job:efmp-301-u12-illustrate
- [handoff] x1 recent, 2 total, since 2026-11-10: review provenance and historical author run metadata remain documented limitations.
  example: Review provenance and historical author run metadata remain documented limitations.
  evidence: job:efmp-301-u12-repair_en-r1, job:efmp-301-u12-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-12: the gn evidence now points to <code>, and its logs are committed. any later edit to unit n inputs makes it out of date again, so rerun gates:evidence and commit
  example: The G2 evidence now points to `20261112T220233129Z-gates.json`, and its logs are committed. Any later edit to Unit 2 inputs makes it out of date again, so rerun gates:evidence and commit the `logs-*` 
  evidence: job:efmp-301-u02-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-12: the banner and the four topic illustration rows are still prompt-only. the illustrate job has to generate, check and place them.
  example: The banner and the four topic illustration rows are still prompt-only. The illustrate job has to generate, check and place them.
  evidence: job:efmp-301-u02-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-12: topic n.n's scene (<code>) has a home-courtyard right panel because the story happens at home; its left panel is the classroom.
  example: Topic 3.2's scene (`fig-U3-12`) has a home-courtyard right panel because the story happens at home; its left panel is the classroom.
  evidence: job:efmp-301-u03-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-12: topic n.n's prompt allows plain digits on the worksheet; check the generated image has no words.
  example: Topic 3.4's prompt allows plain digits on the worksheet; check the generated image has no words.
  evidence: job:efmp-301-u03-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-12: cn documents cli stream truncation annotations <code> fracturing identical quota exhaustion errors into duplicate clusters in <code>.
  example: C1 documents CLI stream truncation annotations `(response may be truncated)` fracturing identical quota exhaustion errors into duplicate clusters in `scripts/crew/intel.mjs`.
  evidence: job:intel-2026-11-13-distill
- [handoff] x1 recent, 1 total, since 2026-11-12: cn highlights daily distill job crew-handoff notes echoing back into the n-hour harvest as operational handoffs, creating a self-referential feedback loop.
  example: C2 highlights daily distill job CREW-HANDOFF notes echoing back into the 12-hour harvest as operational handoffs, creating a self-referential feedback loop.
  evidence: job:intel-2026-11-13-distill
- [handoff] x1 recent, 1 total, since 2026-11-12: cn details a n,n-minute (n.n-day) worker cooldown under i-n, confirming attempt preservation while underscoring multi-model stage redundancy.
  example: C3 details a 9,688-minute (6.7-day) worker cooldown under I-0013, confirming attempt preservation while underscoring multi-model stage redundancy.
  evidence: job:intel-2026-11-13-distill
- [handoff] x1 recent, 1 total, since 2026-11-13: gn gate evidence points to <code> with logs committed.
  example: G2 gate evidence points to `20261112T234531569Z-gates.json` with logs committed.
  evidence: job:efmp-301-u02-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-13: checking the unit at a npx-wide screen and in an print remains open and requires a browser run.
  example: Checking the unit at a 360px-wide screen and in A4 print remains open and requires a browser run.
  evidence: job:efmp-301-u02-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-13: unit n has used both adr-n review cycles, so a fresh gn review requires owner authorisation.
  example: Unit 2 has used both ADR-0019 review cycles, so a fresh G3 review requires owner authorisation.
  evidence: job:efmp-301-u02-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-12: the banner (<code>) and topic rows (<code>, <code>) are prompt-only; the illustrate job must generate, inspect and place them, then replace the topic markers in
  example: The banner (`fig-U5-5`) and topic rows (`fig-U5-6`, `fig-U5-7`) are prompt-only; the illustrate job must generate, inspect and place them, then replace the topic markers in both EN and UR files.
  evidence: job:efmp-301-u05-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-12: the unit n gn evidence now points to <code>; any later edit to unit n inputs makes it stale again, so rerun <code> and commit the <code> folder with the json.
  example: The Unit 5 G2 evidence now points to `20261112T224845001Z-gates.json`; any later edit to Unit 5 inputs makes it stale again, so rerun `gates:evidence -- EFMP-301 5` and commit the `logs-*` folder with
  evidence: job:efmp-301-u05-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-13: the illustrate job should produce <code> (banner, <code>) and <code>..<code> (topics n.n, n.n, n.n); the urdu topic files already carry the same markers.
  example: The illustrate job should produce `fig-U8-7` (banner, `--banner`) and `fig-U8-8`..`fig-U8-10` (topics 8.1, 8.2, 8.3); the Urdu topic files already carry the same markers.
  evidence: job:efmp-301-u08-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-13: <code> has two unit n gn rows (lines n and n). the gate reads only the last one, now pointing to <code>; any further unit n edit makes it stale again (rerun <co
  example: `tasks.md` has two Unit 8 G2 rows (lines 75 and 149). The gate reads only the last one, now pointing to `20261113T000300821Z`; any further Unit 8 edit makes it stale again (rerun `npm run gates:eviden
  evidence: job:efmp-301-u08-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-13: fig-un-n (banner) and fig-un-n..n are prompt-only; the illustrate job must generate, inspect and place them, then replace the topic markers in both the en and u
  example: fig-U9-7 (banner) and fig-U9-8..10 are prompt-only; the illustrate job must generate, inspect and place them, then replace the topic markers in both the EN and UR topic files.
  evidence: job:efmp-301-u09-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-13: gn gate evidence refreshed and committed at <code>.
  example: G2 gate evidence refreshed and committed at `specs/content/efmp-301/reviews/unit-03/G2/20261113T015843872Z-gates.json`.
  evidence: job:efmp-301-u03-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-13: the illustrate job still has to generate, inspect and place <code> (banner, <code>), <code> and <code>, and swap the en and ur markers for <code> elements.
  example: The illustrate job still has to generate, inspect and place `fig-U11-5` (banner, `--banner`), `fig-U11-6` and `fig-U11-7`, and swap the EN and UR markers for `<Figure>` elements.
  evidence: job:efmp-301-u11-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-13: these scenes show pupil distress in a mental-health unit, so check that the images stay calm and non-dramatic, with no self-harm cues and no readable marks on p
  example: These scenes show pupil distress in a mental-health unit, so check that the images stay calm and non-dramatic, with no self-harm cues and no readable marks on papers.
  evidence: job:efmp-301-u11-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-13: the illustrate job must generate, inspect and place fig-un-n (banner) and fig-un-n..n, then replace the topic markers in both the en and ur topic files.
  example: The illustrate job must generate, inspect and place fig-U12-7 (banner) and fig-U12-8..10, then replace the topic markers in both the EN and UR topic files.
  evidence: job:efmp-301-u12-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-13: topic n.n's prose sets the classroom in lahore (and has a pupil call the female teacher "sir"), so <code> names no city instead of sindh. check whether the pros
  example: Topic 1.3's prose sets the classroom in Lahore (and has a pupil call the female teacher "Sir"), so `fig-U1-12` names no city instead of Sindh. Check whether the prose should change.
  evidence: job:efmp-303-u01-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-13: the illustrate job needs to generate, inspect and place <code> to <code>, then swap the <path> markers for <code> elements.
  example: The illustrate job needs to generate, inspect and place `fig-U1-9` to `fig-U1-13`, then swap the EN/UR markers for `<Figure>` elements.
  evidence: job:efmp-303-u01-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-13: the prose sets fig-un-n..n in lahore, peshawar and rural balochistan, so their prompts say "in pakistan" with no sindh-specific details; check this against the 
  example: The prose sets fig-U2-8..10 in Lahore, Peshawar and rural Balochistan, so their prompts say "in Pakistan" with no Sindh-specific details; check this against the owner's Sindh-setting rule before gener
  evidence: job:efmp-303-u02-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-13: the illustrate job still has to generate, inspect and place fig-un-n (banner) and fig-un-n..n, then replace the en and ur markers with <code> elements.
  example: The illustrate job still has to generate, inspect and place fig-U2-7 (banner) and fig-U2-8..10, then replace the EN and UR markers with `<Figure>` elements.
  evidence: job:efmp-303-u02-plan_illustrations
- [handoff] x1 recent, 1 total, since 2026-11-13: gn gate evidence refreshed and committed at [ntnz-gates.json](file:<path>).
  example: G2 gate evidence refreshed and committed at [20261113T040454961Z-gates.json](file:///home/a2ahs/crew-wt/efmp-301-u05-illustrate/specs/content/efmp-301/reviews/unit-05/G2/20261113T040454961Z-gates.json
  evidence: job:efmp-301-u05-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-13: unit n gn review remains open pending an authorised fresh independent review cycle.
  example: Unit 5 G3 review remains open pending an authorised fresh independent review cycle.
  evidence: job:efmp-301-u05-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-13: the prose places topic n.n in swabi and topic n.n in khyber pakhtunkhwa, but <code> and <code> follow the brief's sindh-setting rule and name no city. check tha
  example: The prose places Topic 3.2 in Swabi and Topic 3.3 in Khyber Pakhtunkhwa, but `fig-U3-9` and `fig-U3-10` follow the brief's Sindh-setting rule and name no city. Check that this mismatch is acceptable b
  evidence: job:efmp-303-u03-plan_illustrations

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-14.md` only.

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
- (intel-2026-11-13-distill, intel_distill, agy) C1 documents CLI stream truncation annotations `(response may be truncated)` fracturing identical quota exhaustion errors into duplicate clusters in `scripts/crew/intel.mjs`.
- (intel-2026-11-13-distill, intel_distill, agy) C2 highlights daily distill job CREW-HANDOFF notes echoing back into the 12-hour harvest as operational handoffs, creating a self-referential feedback loop.
- (intel-2026-11-13-distill, intel_distill, agy) C3 details a 9,688-minute (6.7-day) worker cooldown under I-0013, confirming attempt preservation while underscoring multi-model stage redundancy.
- (intel-2026-11-12-distill, intel_distill, agy) C1 documents 2 authoring jobs (EFPG-401 U3, U5) permanently aborted at 5 merge fixes due to unkeyed `## Units` summary table conflicts in course `tasks.md`.
- (intel-2026-11-12-distill, intel_distill, agy) C2 highlights local Playwright font advances resolving narrower than CI fallback fonts, causing false-positive local geometry passes on Urdu SVGs.


## Response snapshot

Recorded four candidates, led by authentication failure handling, with evidence, recurrence and adopted-fix effects.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by codex (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Recorded four candidates, led by authentication failure handling, with evidence, recurrence and adopted-fix effects.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - The four topic markers were also copied into the Urdu topic files, so when placing, update the markers there as well as in the English files.
  - Topic 2.5's story is set in Peshawar, so its scene `fig-U2-16` names no city. The owner may want the story moved to Sindh or the prompt changed.
  - The six new rows (`fig-U2-11` banner, `fig-U2-12` to `fig-U2-16` scenes) are prompt-only, and their markers are also in the Urdu topic files. The illustrate job needs to generate, inspect and place them, then refresh the G2 evidence again.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
