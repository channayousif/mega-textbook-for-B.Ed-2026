---
id: crew-intel-2026-11-17-distill
title: crew intel_distill INTEL unit 0
stage: misc
date: 2026-11-16
surface: agent
model: agy
feature: crew-intelligence
branch: crew/intel-2026-11-17-distill
user: crew
command: crew intel_distill
labels: ["crew", "agy", "intel_distill"]
links:
  spec: specs/intelligence/registry.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/intelligence/daily/2026-11-17.md
tests:
 - npm run check:content
---

## Prompt

# Crew job intel-2026-11-17-distill

You are the agy worker on the B.Ed bilingual textbook repo, working in this checkout on branch `crew/intel-2026-11-17-distill`.
Read AGENTS.md first and obey it (CLAUDE.md only imports it): no em dash (U+2014) anywhere, heavy commands only through `scripts/heavy.sh`, never run `npm run build`, a dev server or the Playwright e2e suite (a review job may run `scripts/render-inspect.mjs` only with `--base https://textbook.com.pk`, never against a local server), keep all scratch files inside your worktree (for example `.crew/`), never use `/tmp`. Run `scripts/heavy.sh node scripts/measure-figure-text.mjs <svgs>` on every added or edited SVG until it exits 0. `static/content-status.json` is git-ignored: run `npm run build:content-status` right before `npm run check:content` and never look it up through git, and never touch course content (`docs/`, `licence/`, the Urdu docs trees,
`specs/content/`, `static/img/figures/`, `glossary.json`): the dispatcher rejects any such change. Never change
what an ADR decided, never self-sign, never mark G3/G5 done. Protected paths (scripts, ADRs, skills, CLAUDE.md,
AGENTS.md, catalog, CI) may change only inside your task; those PRs go to the owner.

## Task
Distil today's reusable intelligence (intel-distill skill) into `specs/intelligence/daily/2026-11-17.md`. These clusters grew in the last 24 hours (kind, recent count, total, signature, an example, evidence):

- [handoff] x8 recent, 8 total, since 2026-11-16: when quota resets, rerun <path> node <path> <course> n (scenes and --banner), inspect and place images, then run prepare-gate-evidence and repoint tasks.md.
  example: When quota resets, rerun scripts/heavy.sh node scripts/generate-illustration.mjs GISS-401 2 (scenes and --banner), inspect and place images, then run prepare-gate-evidence and repoint tasks.md.
  evidence: job:giss-401-u04-illustrate-r1, job:giss-401-u05-illustrate, job:giss-401-u05-illustrate-r1
- [handoff] x7 recent, 7 total, since 2026-11-15: upstream image generation quota on gemini-n.n-flash-image remains exhausted until n-n-ntn:n:nz; unit n illustration manifests remain preserved at prompt-only.
  example: Upstream image generation quota on gemini-3.1-flash-image remains exhausted until 2026-11-17T11:00:06Z; Unit 3 illustration manifests remain preserved at prompt-only.
  evidence: job:giss-401-u03-illustrate-r1, job:giss-401-u04-illustrate, job:giss-401-u04-illustrate-r1
- [handoff] x5 recent, 6 total, since 2026-11-15: when quota resets, rerun <path> for <course> n (scenes and --banner), inspect and place images, then run prepare-gate-evidence and repoint tasks.md.
  example: When quota resets, rerun scripts/generate-illustration.mjs for GICT-300 3 (scenes and --banner), inspect and place images, then run prepare-gate-evidence and repoint tasks.md.
  evidence: job:gict-300-u04-illustrate-r1, job:giss-401-u01-illustrate, job:giss-401-u01-illustrate-r1
- [handoff] x4 recent, 5 total, since 2026-11-15: upstream image generation quota on gemini-n.n-flash-image is exhausted until n-n-ntn:n:nz; unit n illustration manifests remain preserved at prompt-only.
  example: Upstream image generation quota on gemini-3.1-flash-image is exhausted until 2026-11-17T11:00:06Z; Unit 3 illustration manifests remain preserved at prompt-only.
  evidence: job:giss-401-u01-illustrate, job:giss-401-u02-illustrate, job:giss-401-u03-illustrate
- [handoff] x3 recent, 3 total, since 2026-11-16: upstream image generation quota on gemini-n.n-flash-image remains exhausted until n-n-ntn:n:nz; <course> unit n illustration manifests remain preserved at promp
  example: Upstream image generation quota on gemini-3.1-flash-image remains exhausted until 2026-11-17T11:00:06Z; GISS-401 Unit 5 illustration manifests remain preserved at prompt-only.
  evidence: job:giss-401-u05-illustrate-r1, job:giss-401-u06-illustrate-r1, job:giss-401-u07-illustrate
- [handoff] x3 recent, 3 total, since 2026-11-16: when quota resets, rerun <path> node <path> <course> n (topic scenes and --banner), inspect and place images, then run node <path> <course> n and repoint tasks.
  example: When quota resets, rerun scripts/heavy.sh node scripts/generate-illustration.mjs GISS-401 6 (topic scenes and --banner), inspect and place images, then run node scripts/prepare-gate-evidence.mjs GISS-
  evidence: job:giss-401-u06-illustrate, job:giss-401-u06-illustrate-r1, job:giss-401-u07-illustrate
- [handoff] x2 recent, 3 total, since 2026-10-19: <course> unit n still has an curriculum-owner reconciliation and an review-tooling repair pending per earlier notes; gn independent review remains unticked.
  example: GICT-300 Unit 4 still has A3 curriculum-owner reconciliation and A6 review-tooling repair pending per earlier notes; G3 independent review remains unticked.
  evidence: job:gict-300-u04-repair_en-conflict1, job:gict-300-u04-illustrate, job:gict-300-u04-illustrate-r1
- [handoff] x2 recent, 3 total, since 2026-11-14: check that the generated packets, wall chart and planning cards show no readable text, and that the sari is plain with no religious symbols on it.
  example: Check that the generated packets, wall chart and planning cards show no readable text, and that the sari is plain with no religious symbols on it.
  evidence: job:giss-401-u05-plan_illustrations, job:giss-401-u05-illustrate, job:giss-401-u05-illustrate-r1
- [handoff] x2 recent, 2 total, since 2026-11-15: the urdu topic files carry english figure markers for <path>; when placing, mirror the <figure> into the urdu files and translate the alt text.
  example: The Urdu topic files carry English FIGURE markers for fig-U1-6/7; when placing, mirror the <Figure> into the Urdu files and translate the alt text.
  evidence: job:giss-401-u01-illustrate, job:giss-401-u01-illustrate-r1
- [handoff] x2 recent, 2 total, since 2026-11-16: note from plan_illustrations: fig-un-n prompt mentions an "islamiat textbook" held open; check the generated image for any calligraphy or qur'anic script on pag
  example: Note from plan_illustrations: fig-U2-8 prompt mentions an "Islamiat textbook" held open; check the generated image for any calligraphy or Qur'anic script on pages before marking placed.
  evidence: job:giss-401-u02-illustrate, job:giss-401-u02-illustrate-r1
- [handoff] x2 recent, 2 total, since 2026-11-16: check that no readable text appears on folded notices, book parcels or picture books in fig-un-n and fig-un-n, and that no calligraphy appears anywhere.
  example: Check that no readable text appears on folded notices, book parcels or picture books in fig-U4-6 and fig-U4-7, and that no calligraphy appears anywhere.
  evidence: job:giss-401-u04-illustrate, job:giss-401-u04-illustrate-r1
- [handoff] x2 recent, 2 total, since 2026-11-16: upstream image generation quota on gemini-n.n-flash-image is exhausted until n-n-ntn:n:nz; <course> unit n illustration manifests remain preserved at prompt-onl
  example: Upstream image generation quota on gemini-3.1-flash-image is exhausted until 2026-11-17T11:00:06Z; GISS-401 Unit 5 illustration manifests remain preserved at prompt-only.
  evidence: job:giss-401-u05-illustrate, job:giss-401-u06-illustrate
- [handoff] x2 recent, 2 total, since 2026-11-16: verify fig-un-n has no readable text or historical portrait on <path> model, and fig-un-n has no readable phone screen or religious symbol on the minority famil
  example: Verify fig-U6-9 has no readable text or historical portrait on cards/instrument model, and fig-U6-10 has no readable phone screen or religious symbol on the minority family.
  evidence: job:giss-401-u06-illustrate, job:giss-401-u06-illustrate-r1
- [handoff] x1 recent, 1 total, since 2026-11-16: note from plan_illustrations: fig-un-n shows a prayer hall; check generated image for qur'anic script, calligraphy or patterned mats before marking placed.
  example: Note from plan_illustrations: fig-U3-6 shows a prayer hall; check generated image for Qur'anic script, calligraphy or patterned mats before marking placed.
  evidence: job:giss-401-u03-illustrate
- [handoff] x1 recent, 1 total, since 2026-11-16: fig-un-n shows a prayer hall; check generated image for qur'anic script, calligraphy or patterned mats before marking placed.
  example: fig-U3-6 shows a prayer hall; check generated image for Qur'anic script, calligraphy or patterned mats before marking placed.
  evidence: job:giss-401-u03-illustrate-r1
- [handoff] x1 recent, 1 total, since 2026-11-16: inspect fig-un-n for blank roster sheet with no text, and fig-un-n for no text on envelope, sweets box, notebook or blackboard and no visible money.
  example: Inspect fig-U7-4 for blank roster sheet with no text, and fig-U7-5 for no text on envelope, sweets box, notebook or blackboard and no visible money.
  evidence: job:giss-401-u07-illustrate
- [phr] x1 recent, 1 total, since 2026-11-16: failure modes observed: success detection counted a worker-written phr as output; text-quota detection
  example: failure modes observed: success detection counted a worker-written PHR as output; text-quota detection
  evidence: phr:history/prompts/general/20261201-crew-illustrate-image-quota-handling.general.prompt.md
- [phr] x1 recent, 1 total, since 2026-11-16: next experiment (smallest change to try): surface the image-quota hold in the daily digest.
  example: next experiment (smallest change to try): surface the image-quota hold in the daily digest.
  evidence: phr:history/prompts/general/20261201-crew-illustrate-image-quota-handling.general.prompt.md

Follow `.claude/skills/intel-distill/SKILL.md` exactly; read it and every file it references before starting.

## Scope
`specs/intelligence/daily/2026-11-17.md` only.

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
- (intel-2026-11-16-distill, intel_distill, agy) Production deployed SHA lags behind HEAD commits containing new raster illustrations, causing G3 reviews to record render-review as unavailable and escalate otherwise clean units.
- (intel-2026-11-16-distill, intel_distill, agy) Gemini 3.1 flash image quota remains exhausted until 2026-11-17T11:00:06Z; illustrate launches should be held or cooled until reset.
- (intel-2026-11-15-distill, intel_distill, agy) Upstream image generation model gemini-3.1-flash-image quota remains exhausted until 2026-11-17T11:00:06Z, causing repetitive illustrate job churn (C1).
- (intel-2026-11-15-distill, intel_distill, agy) G2 evidence manifests are invalidated when raster illustrations are placed in topic files, requiring mandatory G2 regeneration in illustrate briefs (C2, matching proposed I-0029).
- (intel-2026-11-15-distill, intel_distill, agy) Duplicate G2 rows in gict-300/tasks.md and giss-401/tasks.md split evidence pointers and warrant table deduplication (C4).


## Response snapshot

Distilled 4 reusable intelligence candidates for 2026-11-17 focusing on G2 evidence refreshes after raster placement (I-0029), surfacing image-quota holds in the daily digest, rejecting PHR-only commits, and course tracker row deduplication.

## Outcome

- Impact: intel_distill for INTEL Unit 0 by agy (attempt 1).
- Tests: npm run check:content passed in the job worktree before the PR was opened.
- Files: 1 file(s), listed above.
- Next prompts: the crew planner derives the unit's next stage from main after merge.
- Reflection: none recorded by the dispatcher.

## Handoff (for CEO and agents)

- Shipped / changed: Distilled 4 reusable intelligence candidates for 2026-11-17 focusing on G2 evidence refreshes after raster placement (I-0029), surfacing image-quota holds in the daily digest, rejecting PHR-only commits, and course tracker row deduplication.
- Decisions the team must respect: G3/G5 stay advisory until a qualified sign-off; this PR does not certify anything.
- Pending / next owner: crew lead (auto-merge when CI is green, unless the PR touches a protected path).
- Notes for the next job on this unit:
  - Gemini 3.1 flash image quota remains exhausted until 2026-11-17T11:00:06Z; illustrate launches are held in queue via PR #629's image-quota check.
  - GISS-401 Units 1-7 and GICT-300 Unit 4 prompt-only illustration manifests are preserved and await rerun and G2 refresh once the quota resets.
- Paperclip issues affected: none (Paperclip paused; work tracked by the crew board).

## Evaluation notes (flywheel)

- Failure modes observed: none
- Graders run and results (PASS/FAIL): check:content PASS
- Prompt variant (if applicable): crew brief v1
- Next experiment (smallest change to try): none
